import React, { useState, useEffect, useMemo, useRef } from 'react';
import teamdetails from './teamdetails';  // your array of volunteers
import './landing.css';

const CoreTeam = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [theme, setTheme] = useState(() => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const isMobile = containerSize.width <= 768;

  // Load team data once
  const teamData = useMemo(() => teamdetails, []);

  // Listen to dark mode changes once
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Throttled window resize handler (updates max once every 150ms)
  useEffect(() => {
    let timeoutId = null;
    const updateSize = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setContainerSize({ width: window.innerWidth, height: window.innerHeight });
        timeoutId = null;
      }, 150);
    };
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const getBubbleSize = (width) => {
    if (width <= 480) return 80;
    if (width <= 768) return 90;
    if (width <= 1024) return 110;
    if (width <= 1400) return 120;
    return 130;
  };

  const bubbleSize = useMemo(() => getBubbleSize(containerSize.width), [containerSize.width]);

  const adjustedPattern = useMemo(() => {
    const pattern = [3, 2, 5, 2, 3];
    let adjusted = [];
    let total = 0;
    for (let i = 0; i < pattern.length && total < teamData.length; i++) {
      const remaining = teamData.length - total;
      adjusted.push(Math.min(pattern[i], remaining));
      total += pattern[i];
    }
    return adjusted;
  }, [teamData.length]);

  const verticalSpacing = bubbleSize * 2.3;
  const rows = adjustedPattern.length;
  const totalHeight = (rows - 1) * verticalSpacing + 70;
  const requiredHeight = totalHeight + bubbleSize * 2 + 100;

  // Calculate fixed offsets to avoid layout jitter from random numbers
  const positions = useMemo(() => {
    const horizontalSpacing = Math.min(160, containerSize.width * 0.12);
    const startY = (requiredHeight - totalHeight) / 2 + 80;
    const positions = [];
    let volunteerIndex = 0;

    adjustedPattern.forEach((rowCount, rowIndex) => {
      const rowWidth = (rowCount - 1) * horizontalSpacing;
      const startX = (containerSize.width - rowWidth) / 2;

      // Determine direction for animation or class usage
      let direction;
      if (rowIndex === 0) direction = 'from-top';
      else if (rowIndex === adjustedPattern.length - 1) direction = 'from-bottom';
      else if (rowIndex < adjustedPattern.length / 2) direction = rowIndex % 2 === 1 ? 'from-left' : 'from-right';
      else direction = rowIndex % 2 === 1 ? 'from-right' : 'from-left';

      for (let colIndex = 0; colIndex < rowCount && volunteerIndex < teamData.length; colIndex++) {
        const baseX = startX + colIndex * horizontalSpacing - 46;
        const baseY = startY + rowIndex * verticalSpacing - 60;

        // Stable offset based on index to avoid layout jitter on re-render
        const offsetX = ((volunteerIndex * 13) % 11) - 5; // -5 to +5 px
        const offsetY = ((volunteerIndex * 17) % 13) - 6; // -6 to +6 px

        positions.push({
          x: Math.max(bubbleSize / 2, Math.min(baseX + offsetX, containerSize.width - bubbleSize / 2)),
          y: Math.max(bubbleSize / 2, Math.min(baseY + offsetY, requiredHeight - bubbleSize / 2)),
          direction,
          row: rowIndex,
          col: colIndex,
        });
        volunteerIndex++;
      }
    });
    return positions;
  }, [containerSize.width, requiredHeight, bubbleSize, adjustedPattern, teamData.length]);

  return (
    <div
      ref={containerRef}
      className={`coreteam-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      style={{ height: isMobile ? 'auto' : `${requiredHeight}px` }}
    >
      <div className="coreteam-heading-container">
        <h2 className={`coreteam-heading ${theme === 'dark' ? 'dark' : 'light'}`}>
          Community Team
        </h2>
        <hr className="coreteam-separator" />
      </div>

      {isMobile ? (
        <div className="coreteam-mobile-grid">
          {teamData.map((v) => (
            <div key={v.id} className="coreteam-mobile-card">
              <div className="volunteer-avatar" style={{ width: bubbleSize, height: bubbleSize }}>
                <img src={v.image} alt={v.name} className="volunteer-image" loading="lazy" />
              </div>
              <div className="volunteer-name">{v.name}</div>
              <div className="volunteer-role">{v.role}</div>
            </div>
          ))}
        </div>
      ) : (
        teamData.map((v, i) => {
          const p = positions[i];
          return (
            <div
              key={v.id}
              className="volunteer-item"
              style={{
                top: p?.y,
                left: p?.x,
                position: 'absolute',
              }}
              data-direction={p?.direction}
            >
              <div className="volunteer-avatar" style={{ width: bubbleSize, height: bubbleSize }}>
                <img src={v.image} alt={v.name} className="volunteer-image" loading="lazy" />
              </div>
              <div className="volunteer-name">{v.name}</div>
              <div className="volunteer-role">{v.role}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CoreTeam;
