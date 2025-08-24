import{r as n,j as e,p as P,q as z,e as B,s as F,H as A}from"./index-dkuqY0n6.js";import{L as M}from"./loader-Bonuxvtx.js";/* empty css             */const D=600,R=8e3,T=800,$=(r,s)=>{if(!r)return console.warn("parseDateTime: dateString is empty."),null;const a=r.split("-");if(a.length!==3)return console.warn(`parseDateTime: Invalid dateString format: ${r}. Expected DD-MM-YYYY.`),null;const c=parseInt(a[0],10),i=parseInt(a[1],10)-1,x=parseInt(a[2],10);let d=0,o=0;if(s)if(s.includes("T")&&s.includes("Z")){const m=new Date(s);isNaN(m.getTime())?console.warn(`parseDateTime: Failed to parse timeString as ISO 8601: ${s}`):(d=m.getUTCHours(),o=m.getUTCMinutes())}else{const m=s.split(":");m.length===2?(d=parseInt(m[0],10),o=parseInt(m[1],10)):console.warn(`parseDateTime: Invalid timeString format (not H:MM or ISO): ${s}`)}const l=new Date(x,i,c,d,o,0);return isNaN(l.getTime())?(console.error(`parseDateTime: Resulting Date object is invalid for date: ${r}, time: ${s}`),null):l},I=({value:r})=>{const[s,a]=n.useState(r),[c,i]=n.useState(!1);n.useEffect(()=>{if(r!==s){i(!0);const d=setTimeout(()=>{a(r),i(!1)},T);return()=>clearTimeout(d)}},[r,s]);const x=r.toString().padStart(2,"0");return e.jsxs("span",{className:`relative w-8 h-10 text-tech-green dark:text-green-400 font-bold text-4xl font-mono inline-flex items-center justify-center
                          drop-shadow-md glow-text`,children:[e.jsx("span",{className:`absolute inset-0 flex items-center justify-center
                             transition-transform duration-[var(--flip-duration)] ease-in-out
                             ${c?"animate-[flipOut_var(--flip-duration)_ease-in-out_forwards]":"translate-y-0 opacity-100"}`,style:{"--flip-duration":`${T}ms`},children:s.toString().padStart(2,"0")}),e.jsx("span",{className:`absolute inset-0 flex items-center justify-center
                             transition-transform duration-[var(--flip-duration)] ease-in-out
                             ${c?"animate-[flipIn_var(--flip-duration)_ease-in-out_forwards]":"translate-y-0 opacity-100"}`,style:{"--flip-duration":`${T}ms`},children:x})]})},Y=({eventDateString:r,eventTimeString:s})=>{const[a,c]=n.useState(null),[i,x]=n.useState(null);return n.useEffect(()=>{const d=$(r,s);d?x(d.getTime()):(x(null),c(null))},[r,s]),n.useEffect(()=>{if(i===null){c(null);return}const d=()=>{const l=i-Date.now();if(l<=0){c(null);return}c({days:Math.floor(l/(1e3*60*60*24)),hours:Math.floor(l/(1e3*60*60)%24),minutes:Math.floor(l/1e3/60%60),seconds:Math.floor(l/1e3%60)})};d();const o=setInterval(d,1e3);return()=>clearInterval(o)},[i]),i===null?null:a?e.jsxs("div",{className:"mt-4 flex items-baseline gap-4 text-tech-green dark:text-green-400 font-mono text-xl tracking-widest select-none",children:[e.jsx("span",{className:"text-xl sm:text-yxl md:text-xl font-extrabold glow-text mr-4",children:"Starts in:"}),e.jsx(I,{value:a.days}),e.jsx("span",{className:"opacity-70 text-base sm:text-lg mr-2",children:"d"}),e.jsx(I,{value:a.hours}),e.jsx("span",{className:"opacity-70 text-base sm:text-lg mr-2",children:"h"}),e.jsx(I,{value:a.minutes}),e.jsx("span",{className:"opacity-70 text-base sm:text-lg mr-2",children:"m"}),e.jsx(I,{value:a.seconds}),e.jsx("span",{className:"opacity-70 text-base sm:text-lg",children:"s"})]}):i<=Date.now()?e.jsx("p",{className:"mt-6 text-tech-green dark:text-green-400 font-mono text-2xl tracking-widest select-none font-bold glow-text",children:"Event has started!"}):null};function O(){const[r,s]=n.useState([]),[a,c]=n.useState(0),[i,x]=n.useState(!1),[d,o]=n.useState(!1),[l,m]=n.useState(!1),[b,g]=n.useState(!0),y=n.useRef(null);n.useEffect(()=>{(async()=>{var f;g(!0);try{const u=(((f=(await P.get("https://script.google.com/macros/s/AKfycbyrf82D6QQvQADaR2VePsiMsb_Y-nJwmqznX16y4iLHjLOyBUkdGEsGUzVbv-iU5ffcqg/exec")).data)==null?void 0:f.events)||[]).map(v=>({image:v.post_link||"https://images.unsplash.com/photo-1517420790278-f7b768b556f0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",title:v.event_heading||"Exciting Event Coming Soon!",description:v.event_description||"Join us for an unforgettable experience filled with learning, networking, and innovation. Stay tuned for more details!",link:v.event_registration_link||"#",date:v.event_date||"",time:v.event_time||""}));u.length===0?(console.warn("API returned no events or all events had invalid data after formatting."),m(!0),s([])):(s(u),sessionStorage.setItem("eventSlides",JSON.stringify(u)),m(!1))}catch(L){console.error("Failed to fetch event slides from API or process data:",L);const C=sessionStorage.getItem("eventSlides");if(C)try{const u=JSON.parse(C);u.length>0?(s(u),m(!1),console.log("Loaded slides from session storage.")):(m(!0),s([]),console.error("Cached slides were empty. Showing error."))}catch(u){console.error("Failed to parse cached slides:",u),m(!0),s([])}else m(!0),s([]),console.error("No cached slides available. Showing error.")}finally{g(!1)}})()},[]);const h=n.useCallback(j=>{i||r.length===0||(x(!0),o(!1),setTimeout(()=>{c(j),o(!0),x(!1)},D))},[i,r.length]),t=n.useCallback(()=>{h((a+1)%r.length)},[a,r.length,h]),p=n.useCallback(()=>{h((a-1+r.length)%r.length)},[a,r.length,h]);if(n.useEffect(()=>{if(r.length)return o(!0),clearTimeout(y.current),y.current=setTimeout(t,R),()=>clearTimeout(y.current)},[a,r,t]),n.useEffect(()=>{const j=f=>{f.key==="ArrowRight"?t():f.key==="ArrowLeft"&&p()};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[t,p]),b)return e.jsxs("div",{className:"flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white font-rajdhani",children:[e.jsx("div",{className:"loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"}),e.jsx("p",{className:"text-xl sm:text-2xl md:text-3xl animate-pulse tracking-wide drop-shadow-lg",children:"Loading amazing events..."})]});if(l||r.length===0)return e.jsxs("div",{className:"flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-red-900 to-orange-900 text-white font-rajdhani text-center px-4",children:[e.jsx("p",{className:"text-xl sm:text-2xl md:text-3xl drop-shadow-lg mb-4",children:"Oops! Couldn't load events."}),e.jsx("p",{className:"text-lg sm:text-xl text-gray-200",children:"Please check your connection or try again later."})]});const{image:k,title:w,description:N,link:E,date:_,time:S}=r[a];return e.jsxs("section",{className:"relative w-full min-h-[70vh] flex justify-center items-center font-space-grotesk overflow-hidden select-none shadow-inner-lg","aria-live":"polite","aria-roledescription":"carousel",children:[e.jsx("div",{className:"absolute inset-0 bg-cover bg-center animate-panZoom",style:{backgroundImage:`url(${k})`},role:"img","aria-label":`Background image for ${w}`}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent dark:from-gray-950/80 dark:via-gray-900/70"}),e.jsx("div",{className:"relative z-10 flex items-center justify-start h-full w-full px-6 sm:px-10 lg:px-20 py-24",children:e.jsxs("article",{className:`rounded-3xl p-8 sm:p-10 max-w-2xl bg-white/10 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700
                                 backdrop-blur-xl shadow-2xl transition-all duration-${D}ms ease-in-out
                                 ${d?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}
                                 hover:scale-[1.01] hover:shadow-3xl transition-transform duration-300 ease-out cursor-pointer`,role:"group","aria-label":`Slide ${a+1} of ${r.length}`,children:[e.jsx("h1",{className:"text-2xl sm:text-3xl lg:text-4xl font-exo2 font-extrabold text-white drop-shadow-xl text-shadow-md leading-tight mb-4",children:w}),e.jsx("p",{className:"mt-4 text-base sm:text-lg text-gray-200 dark:text-gray-300 leading-relaxed max-h-[6em] overflow-hidden text-ellipsis line-clamp-3",children:N}),(_||S)&&e.jsxs("div",{className:"mt-4 text-lg text-white font-rajdhani flex items-center gap-2 drop-shadow-md",children:[_&&e.jsxs("span",{className:"flex items-center",children:[e.jsx("svg",{className:"w-5 h-5 mr-1 text-tech-green dark:text-green-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",d:"M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",clipRule:"evenodd"})}),_]}),_&&S&&e.jsx("span",{className:"text-gray-400",children:"|"}),S&&e.jsxs("span",{className:"flex items-center",children:[e.jsx("svg",{className:"w-5 h-5 mr-1 text-tech-green dark:text-green-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z",clipRule:"evenodd"})}),S]})]}),e.jsx(Y,{eventDateString:_,eventTimeString:S}),E&&e.jsx("a",{href:E,target:"_blank",rel:"noopener noreferrer",className:`inline-block mt-8 px-8 py-4 bg-blue-600 text-white shadow-lg transition-all duration-300 ease-out
                                         hover:bg-green-500 hover:text-white
                                         focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-70
                                         font-semibold text-lg animate-buttonPop`,children:"🚀 Register Now"})]})}),e.jsx("button",{onClick:p,disabled:i,className:`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white text-5xl bg-white/10 hover:bg-white/30 p-4 rounded-full shadow-lg backdrop-blur-md transition duration-300 ease-in-out
                                 dark:bg-gray-700/40 dark:hover:bg-gray-600/60 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 border border-white/20 dark:border-gray-600`,"aria-label":"Previous Slide",children:"‹"}),e.jsx("button",{onClick:t,disabled:i,className:`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white text-5xl bg-white/10 hover:bg-white/30 p-4 rounded-full shadow-lg backdrop-blur-md transition duration-300 ease-in-out
                                 dark:bg-gray-700/40 dark:hover:bg-gray-600/60 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 border border-white/20 dark:border-gray-600`,"aria-label":"Next Slide",children:"›"}),e.jsx("div",{className:"absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3",children:r.map((j,f)=>e.jsx("button",{onClick:()=>h(f),disabled:i,className:`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${a===f?"bg-tech-green dark:bg-green-400 w-8 animate-pulseDot":"bg-gray-400/70 hover:bg-white/60 dark:hover:bg-gray-500/80"} disabled:opacity-50 disabled:cursor-not-allowed ring-2 ring-transparent focus:ring-tech-green dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent`,"aria-label":`Go to slide ${f+1}`,"aria-current":a===f?"true":"false"},f))}),e.jsx("style",{children:`
                /* Digit Flip Animations */
                @keyframes flipOut {
                    0% { transform: translateY(0) rotateX(0deg); opacity: 1; }
                    100% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
                }

                @keyframes flipIn {
                    0% { transform: translateY(100%) rotateX(-90deg); opacity: 0; }
                    100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
                }

                /* Background Pan-Zoom Animation */
                @keyframes panZoom {
                    0% { background-position: 0% 0%; transform: scale(1.05); }
                    50% { background-position: 100% 100%; transform: scale(1.1); }
                    100% { background-position: 0% 0%; transform: scale(1.05); }
                }
                .animate-panZoom {
                    animation: panZoom 40s linear infinite alternate;
                }

                /* Button Pop Animation */
                @keyframes buttonPop {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .animate-buttonPop {
                    animation: buttonPop 2s ease-in-out infinite;
                }

                /* Text Glow for Countdown */
                .glow-text {
                    text-shadow:
                        0 0 5px rgba(34, 197, 94, 0.5),
                        0 0 10px rgba(34, 197, 94, 0.4),
                        0 0 15px rgba(34, 197, 94, 0.3);
                }

                /* Pulse for active dot */
                @keyframes pulseDot {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.8;
                    }
                }
                .animate-pulseDot {
                    animation: pulseDot 2s ease-in-out infinite;
                }

                /* Custom text shadow for title */
                .text-shadow-md {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                .text-shadow-lg {
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
                }
                /* Deeper inner shadow for the section */
                .shadow-inner-lg {
                    box-shadow: inset 0px 0px 50px -15px rgba(0, 0, 0, 0.8) !important;
                }

                /* Loader animation */
                .loader {
                    border-top-color: #3498db;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

            `})]})}const G="/assets/BecomeSpeakerBanner-CzRMeQ0i.png",H=()=>{const[r,s]=n.useState(!1),a=n.useRef(null);return n.useEffect(()=>{const c=new IntersectionObserver(([i])=>{i.isIntersecting&&(s(!0),c.disconnect())},{threshold:.3});return a.current&&c.observe(a.current),()=>c.disconnect()},[]),e.jsxs("section",{ref:a,className:`
        relative overflow-hidden
        w-full
        uniform-background-gradient
        py-24 px-6 sm:px-12 md:px-24
        font-rajdhani
        ${r?"opacity-100 translate-y-0":"opacity-0 translate-y-12"}
        ease-out transform transition-opacity transition-transform duration-1000
      `,"aria-label":"Become a Speaker Section",children:[e.jsxs("svg",{className:"absolute top-[-100px] left-[-100px] w-[320px] h-[320px] opacity-20 animate-blobFloat",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",fill:"url(#gradBlob1)","aria-hidden":"true",style:{zIndex:0,filter:"blur(20px)"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"gradBlob1",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#3b82f6"}),e.jsx("stop",{offset:"100%",stopColor:"#06b6d4"})]})}),e.jsx("path",{d:"M40.2,-64.8C53.1,-55,59.3,-39.5,65.6,-23.6C72,-7.7,78.4,7.9,76.4,23.3C74.4,38.7,64,53.8,50.2,61.5C36.3,69.1,18.2,69.3,3.7,62.7C-10.8,56.1,-21.6,42.7,-34.5,34.7C-47.5,26.7,-62.6,24.1,-69.3,14.3C-76,4.4,-74.3,-14.9,-66.8,-30.7C-59.4,-46.5,-46.3,-58.7,-32.1,-66.3C-17.9,-73.9,-8.9,-77.8,5.6,-84.2C20,-90.7,40.1,-99.5,40.2,-64.8Z",transform:"translate(100 100)"})]}),e.jsxs("svg",{className:"absolute top-1/2 -translate-y-1/2 right-[-50px] md:right-[-80px] w-[380px] h-[380px] opacity-15 animate-blobFloat delay-4000",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",fill:"url(#gradBlob2)","aria-hidden":"true",style:{zIndex:0,filter:"blur(20px)"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"gradBlob2",x1:"100%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#10b981"}),e.jsx("stop",{offset:"100%",stopColor:"#22c55e"})]})}),e.jsx("path",{d:"M41.7,-62.1C54.4,-52.8,63.8,-41.8,68.7,-29.7C73.7,-17.6,74.3,-4.4,71.1,7.9C67.9,20.2,60.9,31.6,53.2,41.8C45.4,52,37,61,26.2,65.6C15.3,70.2,2.1,70.4,-9.8,74.3C-21.6,78.2,-32.4,85.7,-39.1,83.1C-45.7,80.5,-48.3,67.8,-52.7,55.2C-57.1,42.5,-63.4,30,-63.3,18.8C-63.2,7.5,-56.6,-2.4,-53,-11.4C-49.3,-20.4,-48.7,-28.5,-44.1,-37.3C-39.5,-46,-30.9,-55.3,-21,-62.5C-11.2,-69.6,-5.6,-74.6,3.1,-78.3C11.8,-82,23.7,-84.1,41.7,-62.1Z",transform:"translate(100 100)"})]}),e.jsxs("div",{className:"relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 z-10 items-center",children:[e.jsxs("div",{className:"flex flex-col justify-center",children:[e.jsx("h2",{className:`
              text-5xl sm:text-6xl font-space-grotesk font-extrabold tracking-tight
              bg-gradient-to-r from-primary to-tech-green
              bg-clip-text text-transparent
              animate-textShimmer
              drop-shadow-lg
              mb-8
            `,children:"Become a Speaker"}),e.jsx("p",{className:`
              text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300
              font-space-grotesk max-w-lg
            `,children:"Share your expertise and passion with a vibrant community by hosting workshops, sessions, or talks. Whether you're an industry professional, educator, or enthusiast, this is your opportunity to inspire others, expand your network, and showcase your unique insights. Join us to empower minds and drive meaningful conversations that spark innovation and growth."}),e.jsx("button",{onClick:()=>window.open("https://docs.google.com/forms/d/e/1FAIpQLSevjGT1Nh8mNyc8MBovZn3EX1X_9P85OmozpJTe6edUkRpPDw/viewform?usp=header","_blank"),"aria-label":"Host a Workshop or Session",className:`
              mt-10
              w-max
              px-8 py-4
              bg-gradient-to-r from-primary to-tech-green
              hover:from-tech-green hover:to-primary
              text-white font-semibold tracking-wide rounded-3xl
              shadow-md
              transition-all duration-300 ease-in-out
              transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60
              animate-pulseGlow
            `,children:"🎤 Host a Workshop or Session"})]}),e.jsx("div",{className:`
            relative
            w-full
            max-w-lg
            mx-auto
            md:mx-0
            cursor-pointer
            perspective-800
            shadow-lg
            overflow-hidden
          `,onMouseMove:c=>{const i=c.currentTarget,x=i.getBoundingClientRect(),d=c.clientX-x.left,o=c.clientY-x.top,l=x.width/2,m=x.height/2,b=(o-m)/m*10,g=(d-l)/l*10;i.style.transform=`rotateX(${-b}deg) rotateY(${g}deg) scale(1.05)`},onMouseLeave:c=>{c.currentTarget.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"},children:e.jsx("img",{src:G,alt:"Become a Speaker Banner",className:"w-full h-auto  object-cover select-none",loading:"lazy",draggable:!1})})]}),e.jsx("style",{children:`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 15s ease-in-out infinite;
        }

        @keyframes textShimmer {
          0% {
            background-position: -400%;
          }
          100% {
            background-position: 400%;
          }
        }
        .animate-textShimmer {
          background-size: 400% 100%;
          animation: textShimmer 4s linear infinite;
        }

        .perspective-800 {
          perspective: 800px;
          transition: transform 0.2s ease-out;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(52, 211, 153, 0.7);
          }
          50% {
            box-shadow: 0 0 14px 4px rgba(52, 211, 153, 1);
          }
        }
        .animate-pulseGlow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `})]})},Q=()=>{const[r,s]=n.useState([]),[a,c]=n.useState(0),[i,x]=n.useState(!0),d=n.useRef(null);if(n.useEffect(()=>{fetch("https://script.google.com/macros/s/AKfycbw-wqfKt5i6bZQkEEp2EI_iajddjB2m-_a6vxHLpCeB32ooFQYaJiUaMXVlgEgZgpzK/exec").then(t=>t.json()).then(t=>{s(Array.isArray(t)?t:[t]),x(!1)}).catch(t=>{console.error("Error fetching projects:",t),x(!1)})},[]),n.useEffect(()=>(d.current&&clearTimeout(d.current),r.length&&(d.current=setTimeout(()=>{c(t=>(t+1)%r.length)},8e3)),()=>{d.current&&clearTimeout(d.current)}),[r,a]),i)return e.jsx("div",{className:"min-h-screen flex items-center justify-center text-center font-space-grotesk font-semibold animate-pulse text-gray-600 dark:text-gray-400 px-4",children:"Loading featured projects..."});if(!r.length&&!i)return e.jsx("div",{className:"min-h-screen flex items-center justify-center text-center font-space-grotesk font-semibold text-gray-600 dark:text-gray-400 px-4",children:"No featured projects available."});const o=r[a],l=t=>t&&typeof t=="string"&&t.trim().length>0,m=l(o.project_developer_name)?o.project_developer_name.split(",").map(t=>t.trim()):[],b=l(o.project_owner_profile_pic)?o.project_owner_profile_pic.split(",").map(t=>t.trim()):[],g=l(o.project_owner_linkedin_id)?o.project_owner_linkedin_id.split(",").map(t=>t.trim()):[],y=Array.from({length:Math.max(m.length,b.length,g.length)}).map((t,p)=>{const k=m[p],w=b[p],N=g[p];return!l(k)&&!l(w)&&!l(N)?null:{name:l(k)?k:"Developer",profilePic:l(w)?w:null,LinkedIn:l(N)?`https://www.linkedin.com/in/${N}`:null}}).filter(Boolean),h=Array.from({length:3});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"min-h-screen flex items-center justify-center uniform-background-gradient p-6 md:p-8 relative overflow-visible select-none",children:[e.jsx("div",{className:"hidden md:block rounded-full bg-gradient-to-tr from-pink-400 to-purple-700 opacity-25 animate-blobFloat mix-blend-multiply filter blur-3xl",style:{position:"absolute",top:50,left:40,width:280,height:280,zIndex:0}}),e.jsx("div",{className:"hidden md:block bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-500 rounded-[55%_20%_60%_25%/25%_60%_20%_55%] opacity-30 animate-blobFloat delay-3000 mix-blend-screen filter blur-2xl",style:{position:"absolute",bottom:100,left:10,width:320,height:320,zIndex:0}}),e.jsxs("svg",{className:"hidden md:block opacity-30 animate-pulseSlow",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",fill:"url(#grad1)",style:{position:"absolute",top:80,right:30,width:280,height:280,zIndex:0,mixBlendMode:"screen",filter:"blur(14px)"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"grad1",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#22d3ee"}),e.jsx("stop",{offset:"100%",stopColor:"#4ade80"})]})}),e.jsx("polygon",{points:"100,15 190,190 10,190"})]}),e.jsxs("svg",{className:"hidden md:block opacity-25 animate-blobFloat delay-1500",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",fill:"url(#grad2)",style:{position:"absolute",bottom:70,right:50,width:350,height:350,zIndex:0,mixBlendMode:"screen",filter:"blur(22px)"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"grad2",x1:"100%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#f472b6"}),e.jsx("stop",{offset:"100%",stopColor:"#a78bfa"})]})}),e.jsx("circle",{cx:"100",cy:"100",r:"90"})]}),e.jsxs("div",{className:"relative z-10 flex flex-col md:flex-row max-w-7xl w-full gap-8 md:gap-12 items-start overflow-hidden",children:[e.jsxs("div",{className:"flex-1 p-6 md:p-12 rounded-xl bg-transparent transition-transform duration-500 ease-in-out hover:scale-[1.02] animate-fadeIn flex flex-col min-h-[480px]",children:[e.jsx("h3",{className:"text-3xl sm:text-4xl font-exo2 font-extrabold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent tracking-wide select-text transition-all duration-700",children:o.project_name}),e.jsx("p",{className:"font-space-grotesk text-base sm:text-lg leading-relaxed mb-6 md:mb-8 text-gray-800 dark:text-gray-300 select-text flex-grow",children:o.project_description}),Array.isArray(o.project_stack)&&e.jsx("div",{className:"flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-8",children:o.project_stack.map(t=>e.jsx("span",{className:"bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold hover:scale-110 transform transition-transform duration-300 cursor-default select-none",children:t},t))}),e.jsx("div",{className:"mt-8 md:mt-10",children:e.jsxs("div",{className:"flex flex-row overflow-x-auto pb-2 gap-2 scrollbar-hide p-2 rounded-[10px] bg-[#343541] dark:bg-white  shadow-inner max-w-full md:max-w-xl lg:max-w-[400px] xl:max-w-xl justify-center items-center",children:[" ",i?h.map((t,p)=>e.jsxs("div",{className:"flex-shrink-0 flex flex-col items-center gap-1 animate-pulse",style:{minWidth:"80px"},children:[e.jsx("div",{className:"w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700"}),e.jsx("div",{className:"h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"})]},`skeleton-${p}`)):y.length>0?y.map((t,p)=>e.jsxs("div",{className:"flex-shrink-0 flex flex-col items-center gap-1 relative group",style:{minWidth:"80px"},children:[t.profilePic?e.jsx("img",{src:t.profilePic,alt:`Profile of ${t.name}`,className:"w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105",loading:"lazy"}):e.jsx("div",{className:"w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm",children:"No Pic"}),t.name&&e.jsxs("div",{className:"relative mt-2",children:[" ",t.LinkedIn?e.jsx("a",{href:t.LinkedIn,target:"_blank",rel:"noopener noreferrer","aria-label":`LinkedIn profile of ${t.name}`,className:"text-gray-100 dark:text-gray-800 text-sm font-medium hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200",children:t.name}):e.jsx("span",{className:"text-gray-100 dark:text-gray-600 text-sm font-medium",children:t.name}),t.LinkedIn&&e.jsxs("div",{className:"absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-700/90 dark:bg-white/90 text-gray-100 dark:text-gray-800 text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 whitespace-nowrap z-50 font-semibold flex items-center gap-1",style:{marginBottom:"8px"},children:[e.jsx(z,{size:12,className:"flex-shrink-0 text-blue-500 dark:text-blue-300"}),e.jsx("span",{children:"LinkedIn"})]})]})]},`developer-${p}`)):e.jsx("p",{className:"text-gray-500 dark:text-gray-400 text-sm w-full text-center py-4",children:"No developers listed for this project."})]})}),l(o.project_promo_link)&&e.jsx("div",{className:"mt-10 md:mt-12 aspect-video rounded-xl overflow-hidden ring-1 ring-white/20 dark:ring-gray-700 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]",children:e.jsx("iframe",{src:o.project_promo_link.replace("watch?v=","embed/"),title:"Project Promo Video",frameBorder:"0",allow:"autoplay; encrypted-media; picture-in-picture",allowFullScreen:!0,className:"w-full h-full",loading:"lazy"})})]},o.project_name),e.jsxs("div",{className:"flex md:flex-col flex-row gap-4 md:gap-6 sticky md:top-24 top-auto md:min-w-[160px] w-full md:w-auto","aria-label":"Project links",children:[l(o.project_repo_link)&&e.jsxs("a",{href:o.project_repo_link,target:"_blank",rel:"noopener noreferrer",className:`\r
                  flex items-center justify-center gap-2 px-4 py-3\r
                  bg-blue-700 text-white font-semibold\r
                  rounded-md\r
                  transition-colors duration-300\r
                  hover:bg-black\r
                  hover:text-white\r
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1\r
                  flex-1 md:flex-none\r
                  text-sm sm:text-base\r
                `,"aria-label":"GitHub Repository",children:[e.jsx(B,{size:18}),"Repo"]}),l(o.project_live_link)&&e.jsxs("a",{href:o.project_live_link,target:"_blank",rel:"noopener noreferrer",className:`\r
                  flex items-center justify-center gap-2 px-4 py-3\r
                  bg-green-700 text-white font-semibold\r
                  rounded-md\r
                  transition-colors duration-300\r
                  hover:bg-white\r
                  hover:text-green-700\r
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1\r
                  flex-1 md:flex-none\r
                  text-sm sm:text-base\r
                `,"aria-label":"Live Demo",children:[e.jsx(F,{size:16}),"Live"]})]})]})]}),e.jsx("style",{children:`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(6deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 12s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(8px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        /* Custom scrollbar styles for a cleaner look (optional, can be adjusted) */
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
          scrollbar-width: none; /* For Firefox */
        }
      `})]})},V=(r,...s)=>r.reduce((a,c,i)=>`${a}${c}${i in s?String(s[i]):""}`,"");V`
  query GetPinnedRepositories {
    organization(login: "techquanta") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            forkCount
            url
            updatedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;const U=()=>{const[r,s]=n.useState(!0);return n.useEffect(()=>{const a=setTimeout(()=>{s(!1)},1500);return()=>clearTimeout(a)},[]),e.jsxs("div",{className:"communitywork-container",children:[e.jsxs(A,{children:[e.jsx("title",{children:"TechQuanta Community Work - Events, Projects & Speakers"}),e.jsx("meta",{name:"description",content:"Explore TechQuanta's community initiatives: upcoming events, featured open-source projects, repositories, and opportunities to become a speaker."}),e.jsx("meta",{property:"og:title",content:"TechQuanta Community Initiatives"}),e.jsx("meta",{property:"og:description",content:"Discover TechQuanta's vibrant open-source community: events, projects, and ways to contribute."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://yourwebsite.com/community-work"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"TechQuanta Community Work"}),e.jsx("meta",{name:"twitter:description",content:"Engage with TechQuanta's open-source community: events, projects, and speaker opportunities."}),e.jsx("link",{rel:"canonical",href:"https://yourwebsite.com/community-work"})," "]}),r?e.jsxs("div",{className:"communitywork-loader",children:[e.jsx(M,{message:"Running Quantum Scripts..."})," "]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{}),e.jsx(H,{}),e.jsx(Q,{})]})]})};export{U as default};
