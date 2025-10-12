import{r as l,j as e}from"./index-DypoEZZ9.js";const v="TechQuanta",C=async()=>{const t=`https://raw.githubusercontent.com/${v}/github-avatar-frame-api/main/.all-contributorsrc`,s=3;let a=null;for(let r=0;r<s;r++)try{const n=await fetch(t);if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const i=await n.json();if(i&&Array.isArray(i.contributors))return i.contributors.map(o=>({login:o.login,name:o.name||o.login,avatar:o.avatar_url||`https://github.com/${o.login}.png`,contributions:o.contributions||[],profileLink:`https://github.com/${o.login}`}));throw new Error("Invalid contributor data structure in response.")}catch(n){if(a=n,console.error(`Attempt ${r+1} failed during initial fetch:`,n.message),r<s-1){const i=Math.pow(2,r)*1e3;await new Promise(o=>setTimeout(o,i))}}return console.error("Failed to fetch base contributor data after all retries.",a),[]},L=t=>e.jsxs("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"18",cy:"18",r:"3"}),e.jsx("circle",{cx:"6",cy:"6",r:"3"}),e.jsx("path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}),e.jsx("path",{d:"M18 11v5"}),e.jsx("path",{d:"m15 14-3 3-3-3"})]}),P=t=>e.jsxs("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"18",r:"3"}),e.jsx("circle",{cx:"6",cy:"6",r:"3"}),e.jsx("circle",{cx:"18",cy:"6",r:"3"}),e.jsx("path",{d:"M18 9v2c0 .66-.3 1-1 1H7c-.7 0-1-.34-1-1V9"}),e.jsx("path",{d:"m14 15-2 2-2-2"})]}),I=t=>e.jsx("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})}),k=t=>e.jsxs("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]}),E=t=>e.jsxs("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"16 18 22 12 16 6"}),e.jsx("polyline",{points:"8 6 2 12 8 18"})]}),B=t=>e.jsx("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),$=t=>e.jsx("svg",{...t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})}),S=({project:t,onPrev:s,onNext:a,current:r,total:n})=>{const i=`https://github.com/${t.repoOwner}/${t.repoName}`;return e.jsxs("div",{className:`flex flex-col max-w-lg w-full scale-[0.95]

            bg-white shadow-2xl dark:shadow-indigo-500/20

            dark:bg-gray-800 

            rounded-2xl overflow-hidden transition-colors duration-300 relative`,children:[e.jsxs("div",{className:`flex items-center justify-between 

                bg-gray-100/80 dark:bg-gray-700/80 border-b border-gray-300 dark:border-gray-700 

                p-3 backdrop-blur-sm`,children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{onClick:s,className:`p-1 rounded-md 

                                       text-gray-600 dark:text-gray-400 

                                       hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition`,title:"Previous Project",children:e.jsx(B,{className:"w-4 h-4"})}),e.jsxs("span",{className:"text-xs font-semibold text-gray-700 dark:text-gray-300",children:[r+1," / ",n]}),e.jsx("button",{onClick:a,className:`p-1 rounded-md 

                                       text-gray-600 dark:text-gray-400 

                                       hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition`,title:"Next Project",children:e.jsx($,{className:"w-4 h-4"})})]})]}),e.jsx("div",{className:"flex-grow min-w-0 text-right",children:e.jsxs("div",{className:`text-xs 

                        text-gray-600 dark:text-gray-400 

                        font-mono truncate`,children:[t.repoOwner,"/",e.jsx("span",{className:"font-bold text-indigo-500",children:t.repoName})]})})]}),e.jsxs("div",{className:`p-6 space-y-6 font-mono 

                bg-white dark:bg-gray-800 

                text-gray-900 dark:text-white`,children:[e.jsx("h1",{className:"text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight break-words",children:e.jsx("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"hover:text-indigo-500 dark:hover:text-indigo-300 transition",children:t.repoName})}),e.jsx("p",{className:"text-base text-gray-700 dark:text-gray-300 pt-4",children:t.description}),e.jsxs("div",{className:"flex flex-wrap gap-x-6 gap-y-3 text-sm pt-4",children:[e.jsxs("div",{className:"flex items-center text-green-600 dark:text-green-400",children:[e.jsx(L,{className:"w-5 h-5 mr-2"}),e.jsxs("span",{className:"font-semibold",children:[t.pulls," Pulls"]})]}),e.jsxs("div",{className:"flex items-center text-yellow-600 dark:text-yellow-400",children:[e.jsx(P,{className:"w-5 h-5 mr-2"}),e.jsxs("span",{className:"font-semibold",children:[t.forks," Forks"]})]}),e.jsxs("div",{className:"flex items-center text-red-600 dark:text-red-400",children:[e.jsx(k,{className:"w-5 h-5 mr-2"}),e.jsxs("span",{className:"font-semibold",children:[t.openIssues," Issues"]})]}),e.jsxs("div",{className:"flex items-center text-orange-600 dark:text-orange-400",children:[e.jsx(I,{className:"w-5 h-5 mr-2"}),e.jsxs("span",{className:"font-semibold",children:[t.stars," Stars"]})]})]})]}),e.jsx("div",{className:`flex justify-end items-center 

                bg-gray-100/80 dark:bg-gray-700/80 

                p-1 text-xs backdrop-blur-sm`,children:e.jsxs("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:`flex items-center space-x-1 

                        text-gray-600 dark:text-gray-400 

                        hover:text-indigo-600 dark:hover:text-indigo-400 

                        transition px-2 py-1 rounded-lg 

                        hover:bg-gray-400/50 dark:hover:bg-gray-700/50`,children:[e.jsx(E,{className:"w-4 h-4"}),e.jsx("span",{children:"Explore Repo..."})]})})]})},T=({contributor:t})=>e.jsx("a",{href:t.profileLink,target:"_blank",rel:"noopener noreferrer",className:"block group bg-white/70 backdrop-blur-sm p-4 rounded-3xl hover:shadow-xl transition duration-300 transform hover:scale-[1.03] border-4 border-transparent hover:border-indigo-500 dark:bg-gray-900/70 dark:hover:border-indigo-400 overflow-hidden",children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"w-20 h-20 mb-3 relative overflow-hidden rounded-[2rem] shadow-inner border-4 border-white dark:border-gray-900",children:e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover transition duration-500 group-hover:scale-105",onError:s=>{s.target.onerror=null,s.target.src=`https://placehold.co/80x80/2563EB/ffffff?text=${t.name[0]}`}})}),e.jsx("h3",{className:"text-md font-bold text-gray-900 dark:text-white truncate w-full text-center",children:t.name}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400 font-mono mt-1",children:["@",t.login]})]})}),A=({contributors:t,projectKey:s})=>{const a=l.useMemo(()=>t.length===0?[]:[...t,...t],[t]);if(t.length===0)return null;const r=3,n=[];for(let c=0;c<a.length;c+=r)n.push(a.slice(c,c+r));const o=Math.ceil(t.length/r)*4.5;return e.jsxs("div",{children:[e.jsx("style",{jsx:"true",children:`

                @keyframes continuous-scroll {

                    0% { transform: translateY(0%); }

                    100% { transform: translateY(-50%); } 

                }

                .auto-scroll-list {

                    display: flex;

                    flex-direction: column;

                    animation: continuous-scroll ${o}s linear infinite; 

                }

            `}),e.jsx("div",{className:"h-full absolute inset-0 auto-scroll-list",children:n.map((c,m)=>e.jsxs("div",{className:"grid grid-cols-3 gap-x-8 mb-8",children:[c.map((h,d)=>e.jsx("div",{className:"col-span-1",children:e.jsx(T,{contributor:h})},`${h.login}-${m}-${d}`)),Array(r-c.length).fill(0).map((h,d)=>e.jsx("div",{className:"col-span-1"},`spacer-${m}-${d}`))]},m))})]},s)},F=({project:t,loadingRightPanel:s})=>{const a=s,r=!s&&t.contributors.length===0;return a?e.jsx("div",{className:`p-4 md:p-8 h-full flex items-center justify-center 

                text-gray-900 dark:text-white/70`,children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("svg",{className:"animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),e.jsxs("span",{children:["Fetching contributors for **",t.repoName,"**..."]})]})}):r?e.jsx("div",{className:"p-4 md:p-8 h-full flex items-center justify-center",children:e.jsxs("div",{className:"text-center text-gray-700 dark:text-gray-400",children:[e.jsx(k,{className:"w-8 h-8 mx-auto mb-3 text-red-500"}),e.jsx("p",{className:"font-semibold text-lg",children:"No Contributor Data Found"}),e.jsxs("p",{className:"text-sm",children:["The `.all-contributorsrc` file was not found in the **",t.repoName,"** repository."]})]})}):e.jsx("div",{className:"h-full flex flex-col overflow-hidden",children:e.jsx("div",{className:"flex-grow relative overflow-hidden p-6 md:p-8",children:e.jsx(A,{contributors:t.contributors,projectKey:t.repoName})})})},z=()=>{const[t,s]=l.useState([]),[a,r]=l.useState(0),[n,i]=l.useState([]),[o,c]=l.useState(!0),[m,h]=l.useState(!1),[d,R]=l.useState(()=>localStorage.getItem("theme")==="dark"||!1),f=l.useMemo(()=>[{repoOwner:v,repoName:"github-avatar-frame-api",description:"A dedicated microservice for generating custom, framed GitHub profile avatars using modern image processing libraries.",forks:42,pulls:18,stars:256,openIssues:7,language:"TypeScript"}],[]);l.useEffect(()=>{localStorage.setItem("theme",d?"dark":"light"),d?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[d]),l.useEffect(()=>{(async()=>{c(!0);const p=await C();i(p);const g=f.map(u=>({...u,contributors:[]}));s(g),c(!1)})()},[f]),l.useEffect(()=>{if(t.length>0&&n.length>0){h(!0);let x;return x=setTimeout(()=>{s(p=>{const g=[...p],u=a,j=g[u];let w=[];return j.repoName==="github-avatar-frame-api"?w=n:w=[],g[u]={...j,contributors:w},g}),h(!1)},500),()=>clearTimeout(x)}},[a,n,t.length]);const b=t[a]||f[0],y=()=>{t.length!==0&&r(x=>(x-1+t.length)%t.length)},N=()=>{t.length!==0&&r(x=>(x+1)%t.length)};return o?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900",children:e.jsxs("div",{className:"flex items-center space-x-3 text-indigo-600 dark:text-indigo-400",children:[e.jsxs("svg",{className:"animate-spin h-8 w-8",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),e.jsx("span",{className:"text-xl font-semibold",children:"Initializing Dashboard..."})]})}):e.jsxs("div",{className:`min-h-screen mt-[60px] font-sans relative overflow-hidden 

            bg-gray-100 dark:bg-gray-900 transition-colors duration-500 

            ${d?"dark":""}`,children:[e.jsx("style",{jsx:"true",children:`

                @keyframes gradient-shift {

                    0% { background-position: 0% 50%; }

                    50% { background-position: 100% 50%; }

                    100% { background-position: 0% 50%; }

                }

                @keyframes slow-wander {

                    0% { transform: translate(0vw, 0vh) scale(1); }

                    33% { transform: translate(30vw, 20vh) scale(1.1); }

                    66% { transform: translate(-20vw, 50vh) scale(0.9); }

                    100% { transform: translate(0vw, 0vh) scale(1); }

                }

                .rainbow-blob {

                    position: absolute;

                    width: 300px; 

                    height: 300px; 

                    /* Updated colors for more distinction */

                    background: linear-gradient(135deg, #FF33A1, #33FFF6, #FFE033, #7E1E97);

                    background-size: 400% 400%;

                    border-radius: 50%;

                    opacity: 1.0; /* Increased opacity to 1.0 */

                    filter: blur(180px); 

                    z-index: -1;

                }

                .blob-top-left {

                    top: -100px;

                    left: -100px;

                    animation: gradient-shift 12s ease infinite alternate, slow-wander 25s ease-in-out infinite alternate;

                }

                .blob-bottom-right {

                    bottom: -150px;

                    right: -150px;

                    width: 350px;

                    height: 350px;

                    animation: gradient-shift 15s ease infinite reverse, slow-wander 30s ease-in-out infinite reverse;

                }

                .blob-center {

                    top: 50%;

                    left: 50%;

                    transform: translate(-50%, -50%) scale(0.7);

                    animation: gradient-shift 18s linear infinite, slow-wander 35s ease-in-out infinite;

                    width: 400px;

                    height: 400px;

                    opacity: 1.0; /* Increased opacity to 1.0 */

                    filter: blur(200px); 

                }

            `}),e.jsx("div",{className:"rainbow-blob blob-top-left"}),e.jsx("div",{className:"rainbow-blob blob-bottom-right"}),e.jsx("div",{className:"rainbow-blob blob-center"}),e.jsxs("div",{className:"relative w-full h-screen flex flex-col md:flex-row pt-12 md:pt-0",children:[e.jsx("div",{className:`flex flex-col items-center justify-center 

                    w-full h-full p-6 md:p-12 z-10 md:w-1/2 pt-20 md:pt-0`,children:e.jsx(S,{project:b,onPrev:y,onNext:N,current:a,total:t.length})}),e.jsx("div",{className:`absolute inset-0 w-full h-full bg-transparent z-0 

                    md:relative md:w-1/2 md:h-full p-6`,children:e.jsx(F,{project:b,loadingRightPanel:m})})]})]})};export{z as default};
