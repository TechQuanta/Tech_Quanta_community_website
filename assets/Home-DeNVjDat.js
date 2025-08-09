import{u as H,r as c,M as P,m as F,a as Y,f as V,c as Q,i as $,j as e,b as N,A as G,d as M,R as W,F as X,e as J,g as K,h as Z,k as U,H as ee}from"./index-BGi4dJSQ.js";/* empty css             */function T(a){const t=H(()=>F(a)),{isStatic:s}=c.useContext(P);if(s){const[,n]=c.useState(a);c.useEffect(()=>t.on("change",n),[])}return t}function te(a,t){const s=T(t()),n=()=>s.set(t());return n(),Y(()=>{const i=()=>V.preRender(n,!1,!0),l=a.map(d=>d.on("change",i));return()=>{l.forEach(d=>d()),Q(n)}}),s}function B(a,...t){const s=a.length;function n(){let i="";for(let l=0;l<s;l++){i+=a[l];const d=t[l];d&&(i+=$(d)?d.get():d)}return i}return te(t.filter($),n)}/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ne=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,n)=>n?n.toUpperCase():s.toLowerCase()),z=a=>{const t=ne(a);return t.charAt(0).toUpperCase()+t.slice(1)},_=(...a)=>a.filter((t,s,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===s).join(" ").trim(),re=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var oe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=c.forwardRef(({color:a="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:n,className:i="",children:l,iconNode:d,...r},h)=>c.createElement("svg",{ref:h,...oe,width:t,height:t,stroke:a,strokeWidth:n?Number(s)*24/Number(t):s,className:_("lucide",i),...!l&&!re(r)&&{"aria-hidden":"true"},...r},[...d.map(([p,u])=>c.createElement(p,u)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(a,t)=>{const s=c.forwardRef(({className:n,...i},l)=>c.createElement(ie,{ref:l,iconNode:t,className:_(`lucide-${ae(z(a))}`,`lucide-${a}`,n),...i}));return s.displayName=z(a),s};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],ce=k("arrow-up-right",se);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]],de=k("brain",le);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ue=k("chevron-down",he);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]],pe=k("code",me);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]],fe=k("git-fork",ge);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]],be=k("laptop",xe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],ve=k("puzzle",we);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],ke=k("search",ye),je=[{question:"How can I join the TechQuanta community?",answer:"Connect with us on **Discord** for real-time interaction, follow our **GitHub organization** for project updates, and stay informed via our **LinkedIn page**. You'll find all the direct links on our homepage!"},{question:"What does TechQuanta offer for students and beginners?",answer:"We're dedicated to empowering new talent! We offer **beginner-friendly learning content**, host **live workshops**, provide opportunities to contribute to **real-world open-source projects**, and facilitate **community mentorship** across diverse tech domains."},{question:"Do I need to be an expert or have prior experience to join?",answer:"Absolutely not! TechQuanta is a community built on learning and collaboration. We warmly welcome individuals of all skill levels, from **complete beginners eager to learn** to seasoned learners looking to contribute."},{question:"How can I start contributing to TechQuanta’s open-source projects?",answer:"It's easy to get started! Begin by exploring our **GitHub repositories**, paying special attention to issues labeled '**Good First Issue**' for easy entry points. Remember to review our **CONTRIBUTING.md** guidelines, and feel free to jump into our **Discord server** for direct guidance and support from the community."},{question:"What types of projects does the community actively work on?",answer:"Our community engages in a wide array of innovative projects, spanning areas like **Web Development**, cutting-edge **AI/ML applications**, robust **DevOps practices**, insightful **Data Science initiatives**, and the creation of valuable **open-source educational tools**."},{question:"Are there opportunities for me to build my profile and gain recognition?",answer:"Definitely! We believe in recognizing our contributors. You can gain visibility through our **community leaderboard**, earn **Discord badges**, get featured in our **LinkedIn spotlights**, and receive **certificates of contribution** for your efforts."}],Ce={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.08}}},Ne={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}}},Se={initial:{height:0,opacity:0},animate:{height:"auto",opacity:1,transition:{duration:.35,ease:"easeInOut"}},exit:{height:0,opacity:0,transition:{duration:.3,ease:"easeInOut"}}};function Me(){const[a,t]=c.useState(null),s=n=>{t(i=>i===n?null:n)};return e.jsxs("div",{className:"max-w-2xl mx-auto p-4 sm:p-6 lg:p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white",children:"Frequently Asked Questions"}),e.jsx(N.div,{className:"space-y-4",variants:Ce,initial:"hidden",animate:"show",children:je.map((n,i)=>e.jsxs(N.div,{variants:Ne,className:"bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 ease-in-out",children:[e.jsxs("button",{onClick:()=>s(i),"aria-expanded":a===i,"aria-controls":`faq-panel-${i}`,className:"w-full flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 text-left text-purple-800 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200",children:[e.jsx("span",{className:"text-lg sm:text-xl font-semibold",children:n.question}),e.jsx(N.div,{animate:{rotate:a===i?180:0},transition:{duration:.3},className:"flex-shrink-0 ml-2",children:e.jsx(ue,{className:"h-6 w-6 text-purple-600 dark:text-purple-400"})})]}),e.jsx(G,{initial:!1,children:a===i&&e.jsx(N.div,{id:`faq-panel-${i}`,role:"region",variants:Se,initial:"initial",animate:"animate",exit:"exit",className:"px-5 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700 border-t border-purple-100 dark:border-gray-600",children:e.jsx("p",{className:"leading-relaxed",children:n.answer})})})]},i))})]})}function q({children:a,containerClassName:t,className:s,as:n="button",duration:i=1,clockwise:l=!0,...d}){const[r,h]=c.useState(!1),[p,u]=c.useState("TOP"),f=v=>{const o=["TOP","LEFT","BOTTOM","RIGHT"],g=o.indexOf(v),m=l?(g-1+o.length)%o.length:(g+1)%o.length;return o[m]},x={TOP:"radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",LEFT:"radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",BOTTOM:"radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",RIGHT:"radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)"},b="radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";return c.useEffect(()=>{if(!r){const v=setInterval(()=>{u(o=>f(o))},i*1e3);return()=>clearInterval(v)}},[r]),e.jsxs(n,{onMouseEnter:v=>{h(!0)},onMouseLeave:()=>h(!1),className:M("relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",t),...d,children:[e.jsx("div",{className:M("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",s),children:a}),e.jsx(N.div,{className:M("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"),style:{filter:"blur(2px)",position:"absolute",width:"100%",height:"100%"},initial:{background:x[p]},animate:{background:r?[x[p],b]:x[p]},transition:{ease:"linear",duration:i??1}}),e.jsx("div",{className:"bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"})]})}const Be="/assets/sahudipesh-D4FTuGG6.png",Ee="/assets/karankose-DKRHJI6w.webp",De="/assets/choudharyvishal-CLY2iyoZ.png",Ie="/assets/jainagrim-CSxVMWkW.webp",Le="/assets/choudharyarsh-BD95H4qj.webp",Te="/assets/tapadiyajayesh-DVh-ByEb.webp",Ae="/assets/sahuhimanshu-BpHjo777.webp",$e="/assets/singashmeet-D913dQiC.webp",ze="/assets/dhakadbalram-Bu2saEMP.png",qe="/assets/rathorekishan-BLF0_SlU.jpg",Re="/assets/panwarshailendra-99uExveb.png",We="/assets/ajbepratik-ar5g3U7J.png",_e="/assets/deepak-CPqiVW0u.png",Oe="/assets/ani-C11noOhK.webp",He="/assets/harpreet-CLSNxeVA.png",Pe="/assets/singhborana-vx4_YnMK.png",Fe="/assets/prerna-CMP7NDQY.png",Ye=[{id:1,name:"Dipesh Sahu",image:Be,linkedin:"https://www.linkedin.com/in/dipesh-sahu-943720215/"},{id:2,name:"Karan Kose",image:Ee,linkedin:"https://linkedin.com/in/karan-kose-a1493b27b"},{id:3,name:"Vishal Chourdhary",image:De,linkedin:"https://linkedin.com/in/vishal-choudhary-1690202b7"},{id:4,name:"Pratik Ajbe",image:We,linkedin:"https://linkedin.com/in/pratik-ajbe-710bb326a"},{id:5,name:"Arsh Choudhary",image:Le,linkedin:"https://linkedin.com/in/sync-w-arsh"},{id:6,name:"Jayesh Tapadiya",image:Te,linkedin:"linkedin.com/in/jayesh-tapdiya-01573024a"},{id:7,name:"Himanshu Sahu",image:Ae,linkedin:"https://himanshu.techquanta.tech"},{id:8,name:"Ashmeet Singh",image:$e,linkedin:"https://ashmeet.techquanta.tech"},{id:9,name:"Balram Dhakad",image:ze,linkedin:"https://balram.techquanta.tech"},{id:10,name:"Kishan Rathore",image:qe,linkedin:"https://www.linkedin.com/in/kishan-rathore-01b2a7226/"},{id:11,name:"Shailendra Singh Panwar",image:Re,linkedin:"https://linkedin.com/in/shailendrasingh189"},{id:12,name:"Agrim Jain",image:Ie,linkedin:"https://linkedin.com/in/agrim-jaindatascientist75524"},{id:13,name:"Deepak Rathore",image:_e,linkedin:"https://linkedin.com/in/deepak-6061a432a"},{id:14,name:"Anirudha Gune",image:Oe,linkedin:"https://www.linkedin.com/in/anirudha-gune-65b2a7226/"},{id:15,name:"Harpreet Singh",image:He,linkedin:"https://linkedin.com/in/harpreet-chhabra-887758225"},{id:16,name:"Yashwant Singh Borana",image:Pe,linkedin:"https://yashwant.techquanta.tech"},{id:17,name:"Prerna Parwani",image:Fe,linkedin:"https://linkedin.com/in/prerna-parwani-012296228"}],Ve=()=>{const a=c.useRef(null),[t,s]=c.useState({width:window.innerWidth,height:window.innerHeight}),[n,i]=c.useState(()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),l=t.width<=768,d=c.useMemo(()=>Ye,[]);c.useEffect(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),g=m=>i(m.matches?"dark":"light");return o.addEventListener("change",g),()=>o.removeEventListener("change",g)},[]),c.useEffect(()=>{let o=null;const g=()=>{o||(o=setTimeout(()=>{s({width:window.innerWidth,height:window.innerHeight}),o=null},150))};return window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),o&&clearTimeout(o)}},[]);const r=o=>o<=480?80:o<=768?90:o<=1024?110:o<=1400?120:130,h=c.useMemo(()=>r(t.width),[t.width]),p=c.useMemo(()=>{const o=[2,4,5,4,2];let g=[],m=0;for(let w=0;w<o.length&&m<d.length;w++){const j=d.length-m;g.push(Math.min(o[w],j)),m+=o[w]}return g},[d.length]),u=h*1.3,x=(p.length-1)*u+90,b=x+h*2+100,v=c.useMemo(()=>{const o=Math.min(200,t.width*1.12),g=(b-x)/3+80,m=[];let w=0;return p.forEach((j,y)=>{const E=(j-1)*o,D=(t.width-E)/2;let C;y===0?C="from-top":y===p.length-1?C="from-bottom":y<p.length/2?C=y%2===1?"from-left":"from-right":C=y%2===1?"from-right":"from-left";for(let S=0;S<j&&w<d.length;S++){const I=D+S*o-46,L=g+y*u-60,A=w*13%11-5,O=w*17%13-6;m.push({x:Math.max(h/2,Math.min(I+A,t.width-h/2)),y:Math.max(h/2,Math.min(L+O,b-h/2)),direction:C,row:y,col:S}),w++}}),m},[t.width,b,h,p,d.length]);return e.jsxs("div",{ref:a,className:`coreteam-container ${n==="dark"?"dark-theme":"light-theme"}`,style:{height:l?"auto":`${b}px`},children:[e.jsxs("div",{className:"coreteam-heading-container",children:[e.jsx("h2",{className:`coreteam-heading text-center w-screen ${n==="dark"?"dark":"light"} `,children:"Community Techies"}),e.jsx("hr",{className:"coreteam-separator"})]}),l?e.jsx("div",{className:"coreteam-mobile-grid",children:d.map(o=>e.jsxs("div",{className:"coreteam-mobile-card",children:[e.jsx("div",{className:"volunteer-avatar",style:{width:h,height:h},children:e.jsx("img",{src:o.image,alt:o.name,className:"volunteer-image",loading:"lazy"})}),o.linkedin&&e.jsx("a",{href:o.linkedin,target:"_blank",rel:"noopener noreferrer",className:"linkedin-button flex-wrap",children:e.jsxs("div",{className:"volunteer-name",children:[o.name,"  "]})})]},o.id))}):d.map((o,g)=>{const m=v[g];return e.jsxs("div",{className:"volunteer-item",style:{top:m==null?void 0:m.y,left:m==null?void 0:m.x,position:"absolute"},"data-direction":m==null?void 0:m.direction,children:[e.jsx("div",{className:"volunteer-avatar",style:{width:h,height:h},children:e.jsx("img",{src:o.image,alt:o.name,className:"volunteer-image",loading:"lazy"})}),o.linkedin&&e.jsx("a",{href:o.linkedin,target:"_blank",rel:"noopener noreferrer",className:"linkedin-button",children:e.jsx("div",{className:"volunteer-name",children:o.name})})]},o.id)})]})},Qe=({children:a,className:t,containerClassName:s})=>{let n=T(0),i=T(0);const l={light:{default:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,hover:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`},dark:{default:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,hover:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`}};function d({currentTarget:r,clientX:h,clientY:p}){if(!r)return;let{left:u,top:f}=r.getBoundingClientRect();n.set(h-u),i.set(p-f)}return e.jsxs("div",{className:M("group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-[#121212]",s),onMouseMove:d,children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 dark:hidden opacity-20",style:{backgroundImage:l.light.default}}),e.jsx("div",{className:"pointer-events-none absolute inset-0 hidden dark:block opacity-20",style:{backgroundImage:l.dark.default}}),e.jsx(N.div,{className:"pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden",style:{backgroundImage:l.light.hover,WebkitMaskImage:B`
            radial-gradient(
              200px circle at ${n}px ${i}px,
              black 0%,
              transparent 100%
            )
          `,maskImage:B`
            radial-gradient(
              200px circle at ${n}px ${i}px,
              black 0%,
              transparent 100%
            )
          `}}),e.jsx(N.div,{className:"pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block",style:{backgroundImage:l.dark.hover,WebkitMaskImage:B`
            radial-gradient(
              200px circle at ${n}px ${i}px,
              black 0%,
              transparent 100%
            )
          `,maskImage:B`
            radial-gradient(
              200px circle at ${n}px ${i}px,
              black 0%,
              transparent 100%
            )
          `}}),e.jsx("div",{className:M("relative z-20",t),children:a})]})},Ge=a=>{const[t,s]=c.useState(!1),n=c.useRef(!1);return c.useEffect(()=>{const i=new IntersectionObserver(([l])=>{l.isIntersecting&&!n.current&&(s(!0),n.current=!0)},{rootMargin:"0px",threshold:.2});return a.current&&i.observe(a.current),()=>{a.current&&i.unobserve(a.current)}},[a]),t},Xe=[{title:"Open Source",description:"Contributing to, and building on, projects that are openly available to everyone.",icon:e.jsx(pe,{className:"w-12 h-12 text-slate-500 dark:text-slate-400"}),link:"https://hub.docker.com/"},{title:"AI & ML",description:"Exploring the latest advancements in artificial intelligence and machine learning.",icon:e.jsx(de,{className:"w-12 h-12 text-purple-500 dark:text-purple-400"}),link:"https://www.kaggle.com/"},{title:"Research",description:"Deep diving into academic papers and conducting new experiments.",icon:e.jsx(ke,{className:"w-12 h-12 text-red-500 dark:text-red-400"}),link:"https://scholar.google.com/"},{title:"Git & Version Control",description:"Mastering Git workflows and collaborative development practices.",icon:e.jsx(fe,{className:"w-12 h-12 text-green-500 dark:text-green-400"}),link:"https://techquata.github.io/git_vc"},{title:"SDE & Web App Dev",description:"Building robust software solutions and creating stunning web applications.",icon:e.jsx(be,{className:"w-12 h-12 text-blue-500 dark:text-blue-400"}),link:"https://education.github.com/pack"},{title:"Web & App Dev",description:"Creating stunning and functional web and mobile applications.",icon:e.jsx(ve,{className:"w-12 h-12 text-orange-500 dark:text-orange-400"}),link:"https://github.com/TechQuanta"}],Je=({domain:a,index:t})=>{const s=c.useRef(null),n=Ge(s);return e.jsxs("a",{href:a.link,target:"_blank",rel:"noopener noreferrer",ref:s,className:`relative flex flex-col items-center p-8 rounded-3xl transition-all duration-700 ease-out transform
        bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-2 hover:scale-[1.03] transition-transform duration-300 group
        ${n?"translate-y-0 opacity-100":"translate-y-16 opacity-0"}
      `,style:{transitionDelay:`${t*100}ms`},children:[e.jsx("div",{className:`mb-6 p-4 rounded-full shadow-inner transition-colors duration-300
        bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600`,children:a.icon}),e.jsx("h3",{className:`text-2xl font-bold mb-2 text-center transition-colors duration-300
        text-gray-900 dark:text-gray-200`,children:a.title}),e.jsx("p",{className:`text-center text-sm transition-colors duration-300
        text-gray-600 dark:text-gray-400`,children:a.description}),e.jsx("div",{className:`mt-6 text-sm flex items-center font-semibold transition-colors duration-200
          text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200
        `,children:e.jsxs("span",{className:"flex items-center",children:["Go to Community ",e.jsx(ce,{className:"ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"})]})})]})};function Ke(){return e.jsx("div",{className:`min-h-screen transition-colors duration-500 text-gray-900 dark:text-white font-sans p-6 md:p-12
      relative overflow-hidden bg-transparent flex items-center justify-center`,children:e.jsx("div",{className:"max-w-7xl mx-auto relative z-10",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:Xe.map((a,t)=>e.jsx(Je,{domain:a,index:t},t))})})})}const Ze=[{id:"discord",title:"Engage on Discord",description:"Join real-time discussions, get support, and connect with peers.",icon:e.jsx(X,{}),url:"https://discord.com/invite/WK3aftq5vg",iconColor:"text-indigo-600",cardBgLight:"#e0e7ff",cardBgDark:"transparent",iconBoxBgLight:"#e5e7eb",iconBoxBgDark:"transparent",hoverSliceColor:"#6366f1",glowColor:"rgba(99, 102, 241, 0.2)"},{id:"github",title:"Contribute on GitHub",description:"Collaborate on open-source projects and enhance our codebases.",icon:e.jsx(J,{}),url:"https://github.com/TechQuanta",iconColor:"text-gray-900",cardBgLight:"#f3f4f6",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"#ffffff",hoverSliceColor:"#1f2937",glowColor:"rgba(31, 41, 55, 0.2)"},{id:"whatsapp",title:"Receive WhatsApp Updates",description:"Stay informed with important announcements and quick insights.",icon:e.jsx(K,{}),url:"https://chat.whatsapp.com/CjMw4xiTuNTFBaDzMKpuIC",iconColor:"text-green-500",cardBgLight:"#dcfce7",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#29da6dff",glowColor:"rgba(34, 197, 94, 0.2)"},{id:"docker",title:"Explore Container Projects",description:"Access our latest containerized applications and demos.",icon:e.jsx(Z,{}),url:"https://hub.docker.com/u/techquanta",iconColor:"text-blue-600",cardBgLight:"#dbeafe",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#4e88e4ff",glowColor:"rgba(59, 130, 246, 0.2)"},{id:"linkedin",title:"Connect on LinkedIn",description:"Network with professionals and find career opportunities.",icon:e.jsx(U,{}),url:"https://www.linkedin.com/in/techquanta-community",iconColor:"text-blue-700",cardBgLight:"#dbeafe",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#1d4ed8",glowColor:"rgba(29, 78, 216, 0.2)"}],Ue=({icon:a,iconColor:t})=>{const s=Array.from({length:200}).map((n,i)=>{const l=Math.floor(Math.random()*4+5),d={left:`${Math.random()*100}vw`,animationDelay:`${Math.random()*2}s`,animationDuration:`${2+Math.random()*2}s`,transform:`rotate(${Math.random()*360}deg)`,opacity:Math.random()*.5+.5,color:t};return e.jsxs("div",{className:"confetti-piece",style:d,children:[W.cloneElement(a,{className:`h-${l} w-${l}`})," "]},i)});return e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-50 overflow-hidden",children:[e.jsx("style",{children:`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotateZ(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          position: absolute;
          /* Size is now dynamically set by React.cloneElement */
          display: flex; /* To center the icon within the div */
          align-items: center;
          justify-content: center;
          animation: confetti-fall linear forwards;
          pointer-events: none;
          filter: drop-shadow(0 0 5px rgba(0,0,0,0.3)); /* Subtle shadow for icons */
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother animation */
        }
        `}),s]})},et=()=>{const[a,t]=c.useState(!1),[s,n]=c.useState(null),[i,l]=c.useState(""),d=(r,h,p,u)=>{r.preventDefault(),n(p),l(u),t(!0),setTimeout(()=>{t(!1),n(null),l(""),window.open(h,"_blank","noopener,noreferrer")},2e3)};return e.jsxs("div",{className:"w-full max-w-7xl mx-auto font-space-grotesk transition-colors duration-300",children:[e.jsx("style",{children:`
        .animated-button {
          position: relative;
          overflow: hidden;
          width: 112px; /* w-28 */
          height: 40px; /* h-10 */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          /* Trapezoid shape */
          clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
          border-radius: 8px; /* Rounded corners for the outer container */
          background-color: var(--card-bg-light);
          transition: transform 0.3s ease-out, background-color 0.3s ease-out, clip-path 0.3s ease-out;
          transform: scale(1); /* Default scale */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* subtle shadow */
        }
        html.dark .animated-button {
          background-color: var(--card-bg-dark); /* Now transparent from data */
          box-shadow: none; /* Remove shadow in dark mode if transparent */
        }

        .animated-button:hover {
          transform: scale(1.05); /* Scale up slightly on hover */
          /* Slight change to clip-path on hover for more dynamism */
          clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%); /* More pronounced skew on hover */
        }

        .animated-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 120%;
          background-color: var(--hover-slice-color);
          /* Triangular slice from top-left, pointing right */
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          transform: translateX(-100%); /* Start off-screen to the left */
          transition: transform 0.4s ease-out;
          z-index: 0;
        }

        .animated-button:hover::before {
          transform: translateX(0%); /* Slide in to reveal the slice */
        }

        .icon-content {
          position: relative;
          z-index: 1; /* Above the slice */
          transition: transform 0.3s ease-out;
          background-color: var(--icon-box-bg-light); /* Will be transparent from data */
          border-radius: 6px; /* Match outer button's rounded corners, but slightly smaller */
          padding: 6px; /* p-1.5 is approx 6px */
        }
        html.dark .icon-content {
          background-color: var(--icon-box-bg-dark); /* Will be transparent from data */
        }

        .animated-button:hover .icon-content {
          transform: scale(1.1); /* Scale icon on hover, no skew */
        }

        /* New: Strip Hover Glow Effect */
        .strip-hover-glow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%; /* Adjust size as needed */
          height: 100%; /* Adjust size as needed */
          background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%); /* Dynamic glow color */
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
          pointer-events: none;
          z-index: 0; /* Behind content */
        }

        .group:hover .strip-hover-glow::before {
          transform: translate(-50%, -50%) scale(1.5); /* Expand on hover */
          opacity: 1;
        }
        `}),e.jsx("div",{className:"bg-transparent rounded-xl py-0",children:e.jsx("ul",{className:"",children:Ze.map(r=>e.jsxs("li",{className:`group flex flex-col md:flex-row items-start md:items-center justify-between
                py-3 px-4
                bg-transparent dark:bg-transparent
                transition-all duration-200 ease-in-out
                border-t border-b border-gray-200 dark:border-gray-700
                hover:shadow-md /* Removed hover:scale-[1.005] to let the glow be the primary effect */
                transform origin-center
                relative strip-hover-glow`,style:{"--glow-color":r.glowColor},children:[e.jsxs("div",{className:"flex flex-col items-start mb-2 md:mb-0",children:[e.jsx("span",{className:`text-lg font-normal text-gray-900 dark:text-white font-space-grotesk
                                 relative inline-block
                                 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]
                                 after:bg-current
                                 after:transition-all after:duration-300 after:ease-in-out
                                 group-hover:after:w-full`,children:r.title}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mt-1 font-space-grotesk font-thin",children:r.description})]}),e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",onClick:h=>d(h,r.url,r.icon,r.iconColor),className:"animated-button hidden md:inline-flex",style:{"--card-bg-light":r.cardBgLight,"--card-bg-dark":r.cardBgDark,"--hover-slice-color":r.hoverSliceColor,"--icon-box-bg-light":r.iconBoxBgLight,"--icon-box-bg-dark":r.iconBoxBgDark},"aria-label":`Go to ${r.title}`,children:e.jsxs("div",{className:"icon-content",children:[" ",W.cloneElement(r.icon,{className:`h-5 w-5 ${r.iconColor}`})]})}),e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",onClick:h=>d(h,r.url,r.icon,r.iconColor),className:`md:hidden flex items-center justify-start w-full
                  text-blue-600 dark:text-blue-400 font-normal
                  hover:underline mt-2
                  transition-colors duration-200 font-space-grotesk`,children:[r.title.includes("on ")?r.title.split("on ")[1]:r.title.includes("Receive ")?r.title.split("Receive ")[1]:r.title.includes("Explore ")?r.title.split("Explore ")[1]:r.title,e.jsx("svg",{className:"ml-1 w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]},r.id))})}),a&&s&&e.jsx(Ue,{icon:s,iconColor:i})]})},R=["Innovators","Creators","Coders","Designers","Writers","Problem Solvers","Your Ideas","New Perspectives"],nt=()=>{const[a,t]=c.useState(0),[s,n]=c.useState(!1),i=c.useRef(null),l="https://www.youtube.com/embed/pQkaoaI9Ljc?si=xITc7-aGS_N6SoLT",[d,r]=c.useState(l),[h,p]=c.useState({});return c.useEffect(()=>{const u=setInterval(()=>{n(!0);const f=setTimeout(()=>{t(x=>(x+1)%R.length),n(!1)},500);return()=>clearTimeout(f)},2e3);return()=>clearInterval(u)},[]),c.useEffect(()=>{const u=i.current;if(!u)return;const f=new URL(l);f.searchParams.set("enablejsapi","1");const x=new IntersectionObserver(b=>{b.forEach(v=>{v.isIntersecting?(f.searchParams.set("autoplay","1"),f.searchParams.set("mute","1"),r(f.toString())):(f.searchParams.delete("autoplay"),r(f.toString()))})},{threshold:.5});return x.observe(u),()=>{u&&x.unobserve(u)}},[l]),c.useEffect(()=>{var b;const u=(b=i.current)==null?void 0:b.closest(".video-card-container");if(!u)return;const f=v=>{const{clientX:o,clientY:g}=v,{left:m,top:w,width:j,height:y}=u.getBoundingClientRect(),E=m+j/2,D=w+y/2,C=(o-E)/(j/2),I=-((g-D)/(y/2))*10,L=C*10;p({transform:`perspective(1000px) rotateX(${I}deg) rotateY(${L}deg) translateZ(30px)`,transition:"transform 0.1s ease-out"})},x=()=>{p({transform:"perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",transition:"transform 0.5s ease-out"})};return u.addEventListener("mousemove",f),u.addEventListener("mouseleave",x),()=>{u.removeEventListener("mousemove",f),u.removeEventListener("mouseleave",x)}},[]),e.jsxs("div",{className:"home-page",children:[e.jsxs(ee,{children:[e.jsx("title",{children:"TechQuanta - Crafting Open Source Futures | Join Our Community"}),e.jsx("meta",{name:"description",content:"TechQuanta welcomes newcomers to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!"}),e.jsx("meta",{property:"og:title",content:"TechQuanta - Crafting Open Source Futures"}),e.jsx("meta",{property:"og:description",content:"Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://yourwebsite.com/"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"TechQuanta - Crafting Open Source Futures"}),e.jsx("meta",{name:"twitter:description",content:"Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."}),e.jsx("link",{rel:"canonical",href:"https://yourwebsite.com/"})," "]}),e.jsx(Qe,{children:e.jsx("section",{className:"home-hero-section",children:e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:e.jsxs("div",{className:"home-hero-wrapper",children:[e.jsxs("h1",{className:"home-hero-title",children:["Crafting Open Source Futures. With"," ",e.jsxs("div",{className:"home-hero-animated-word-container",children:[e.jsx("span",{className:`home-hero-animated-word ${s?"home-hero-animated-word-exit":"home-hero-animated-word-enter"}`,children:R[a]}),e.jsx("span",{className:`home-hero-animated-bg ${s?"home-hero-animated-bg-exit":"home-hero-animated-bg-enter"}`,style:{borderRadius:"8px",transformOrigin:"center"}})]})]}),e.jsxs("p",{className:"home-hero-description",children:[e.jsx("strong",{children:"TechQuanta"})," welcomes ",e.jsx("strong",{children:"newcomers"})," to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!"]}),e.jsxs("div",{className:"home-hero-cta",children:[e.jsx(q,{containerClassName:"rounded-full w-full sm:w-auto font-exo2",as:"button",className:"dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full",onClick:()=>window.open("https://discord.com/invite/WK3aftq5vg"),children:e.jsx("span",{children:"Join the Community"})}),e.jsx(q,{containerClassName:"rounded-full w-full sm:w-auto",as:"button",className:"bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full",onClick:()=>window.location.href="/community-work",children:e.jsx("span",{children:"Explore Projects"})})]})]})})})}),e.jsxs("section",{className:"py-16 px-4 sm:px-8 lg:px-16 bg-trasnparent ",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-center mb-12 dark:text-blue dark:from-white text-purple-400 font-space-grotesk ",children:"Discover Our Vision"}),e.jsxs("div",{className:"video-card-container w-full max-w-6xl mx-auto relative group",style:h,children:[e.jsx("div",{className:"video-card-shadow-outer"}),e.jsx("div",{className:"video-aspect-ratio video-shadow-inset",children:e.jsx("iframe",{ref:i,src:d,title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerPolicy:"strict-origin-when-cross-origin",allowFullScreen:!0})})]})]}),e.jsx("section",{className:"py-16 px-4  max-w-7xl mx-auto",children:e.jsx(et,{})}),e.jsxs("section",{className:"home-core-team-section",children:[e.jsx("div",{className:"home-core-team-wrapper",children:e.jsx(Ve,{})}),e.jsx("div",{children:e.jsx(Me,{})}),e.jsx("div",{className:"home-partners-wrapper",children:e.jsx(Ke,{})})]})]})};export{nt as default};
