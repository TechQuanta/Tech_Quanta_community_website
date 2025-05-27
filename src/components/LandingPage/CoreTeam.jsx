import React, { useState, useEffect, useMemo, useRef } from 'react';
import teamdetails from './teamdetails';  // default import (your array of volunteers)
import './landing.css';

const CoreTeam = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef(null);
  const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const isMobile = containerSize.width <= 768;
  const [teamData, setTeamData] = useState([]);

  // Load team data on mount (simulate async import if you want)
  useEffect(() => {
    // Since teamdetails is an array, just set it directly.
    // If teamdetails was a Promise, you can await or .then()
    setTeamData(teamdetails);
  }, []);

  // Listen to dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // Track window resize
  useEffect(() => {
    const updateSize = () => {
      setContainerSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Intersection observer to trigger animation or load effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Bubble size logic
  const getBubbleSize = (width) => {
    if (width <= 480) return 80;
    if (width <= 768) return 90;
    if (width <= 1024) return 110;
    if (width <= 1400) return 120;
    return 130;
  };

  const bubbleSize = useMemo(() => getBubbleSize(containerSize.width), [containerSize.width]);

  // Adjust pattern for rows based on number of team members
  const adjustedPattern = useMemo(() => {
    const pattern = [3, 2, 5, 2, 3];
    let adjusted = [];
    let total = 0;
    for (let i = 0; i < pattern.length && total < teamData.length; i++) {
      const remaining = teamData.length - total;
      const current = Math.min(pattern[i], remaining);
      adjusted.push(current);
      total += current;
    }
    return adjusted;
  }, [teamData.length]);

  const verticalSpacing = bubbleSize * 2.3;
  const rows = adjustedPattern.length;
  const totalHeight = (rows - 1) * verticalSpacing + 70;
  const requiredHeight = totalHeight + bubbleSize * 2 + 100;

  // Calculate positions for each volunteer
  const positions = useMemo(() => {
    const horizontalSpacing = Math.min(160, containerSize.width * 0.12);
    const startY = (requiredHeight - totalHeight) / 2 + 80;
    const positions = [];
    let volunteerIndex = 0;

    adjustedPattern.forEach((rowCount, rowIndex) => {
      const rowWidth = (rowCount - 1) * horizontalSpacing;
      const startX = (containerSize.width - rowWidth) / 2;

      let direction;
      if (rowIndex === 0) direction = 'from-top';
      else if (rowIndex === adjustedPattern.length - 1) direction = 'from-bottom';
      else if (rowIndex < adjustedPattern.length / 2) direction = rowIndex % 2 === 1 ? 'from-left' : 'from-right';
      else direction = rowIndex % 2 === 1 ? 'from-right' : 'from-left';

      for (let colIndex = 0; colIndex < rowCount && volunteerIndex < teamData.length; colIndex++) {
        const x = startX + colIndex * horizontalSpacing - 46;
        const y = startY + rowIndex * verticalSpacing - 60;
        const randomX = x + (Math.random() - 0.5) * 10;
        const randomY = y + (Math.random() - 0.5) * 15;
        positions.push({
          x: Math.max(bubbleSize / 2, Math.min(randomX, containerSize.width - bubbleSize / 2)),
          y: Math.max(bubbleSize / 2, Math.min(randomY, requiredHeight - bubbleSize / 2)),
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
                <img src={v.image} className="volunteer-image" alt={v.name} />
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
            >
              <div className="volunteer-avatar" style={{ width: bubbleSize, height: bubbleSize }}>
                <img src={v.image} className="volunteer-image" alt={v.name} />
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
