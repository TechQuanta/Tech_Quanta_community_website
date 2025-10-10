import{u as Y,r as d,M as F,m as G,a as Q,f as V,c as X,i as H,j as e,b as S,d as D,R as A,F as K,e as Z,g as J,h as U,k as ee,H as te}from"./index-CKzu7f49.js";/* empty css             */function z(n){const t=Y(()=>G(n)),{isStatic:i}=d.useContext(F);if(i){const[,r]=d.useState(n);d.useEffect(()=>t.on("change",r),[])}return t}function ne(n,t){const i=z(t()),r=()=>i.set(t());return r(),Q(()=>{const c=()=>V.preRender(r,!1,!0),s=n.map(l=>l.on("change",c));return()=>{s.forEach(l=>l()),X(r)}}),i}function M(n,...t){const i=n.length;function r(){let c="";for(let s=0;s<i;s++){c+=n[s];const l=t[s];l&&(c+=H(l)?l.get():l)}return c}return ne(t.filter(H),r)}/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),re=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,r)=>r?r.toUpperCase():i.toLowerCase()),R=n=>{const t=re(n);return t.charAt(0).toUpperCase()+t.slice(1)},_=(...n)=>n.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim(),oe=n=>{for(const t in n)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ie={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=d.forwardRef(({color:n="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:c="",children:s,iconNode:l,...a},h)=>d.createElement("svg",{ref:h,...ie,width:t,height:t,stroke:n,strokeWidth:r?Number(i)*24/Number(t):i,className:_("lucide",c),...!s&&!oe(a)&&{"aria-hidden":"true"},...a},[...l.map(([p,u])=>d.createElement(p,u)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(n,t)=>{const i=d.forwardRef(({className:r,...c},s)=>d.createElement(se,{ref:s,iconNode:t,className:_(`lucide-${ae(R(n))}`,`lucide-${n}`,r),...c}));return i.displayName=R(n),i};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],le=y("arrow-up-right",ce);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]],he=y("brain",de);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],me=y("chevron-down",ue);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]],ge=y("code",pe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]],be=y("git-fork",fe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]],ve=y("laptop",xe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],ke=y("puzzle",we);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],je=y("search",ye),I=[{question:"How can I join the TechQuanta community?",answer:"Connect with us on **Discord** for real-time interaction, follow our **GitHub organization** for project updates, and stay informed via our **LinkedIn page**. You'll find all the direct links on our homepage!"},{question:"What does TechQuanta offer for students and beginners?",answer:"We're dedicated to empowering new talent! We offer **beginner-friendly learning content**, host **live workshops**, provide opportunities to contribute to **real-world open-source projects**, and facilitate **community mentorship** across diverse tech domains."},{question:"Do I need to be an expert or have prior experience to join?",answer:"Absolutely not! TechQuanta is a community built on learning and collaboration. We warmly welcome individuals of all skill levels, from **complete beginners eager to learn** to seasoned learners looking to contribute."},{question:"How can I start contributing to TechQuanta’s open-source projects?",answer:"It's easy to get started! Begin by exploring our **GitHub repositories**, paying special attention to issues labeled '**Good First Issue**' for easy entry points. Remember to review our **CONTRIBUTING.md** guidelines, and feel free to jump into our **Discord server** for direct guidance and support from the community."},{question:"What types of projects does the community actively work on?",answer:"Our community engages in a wide array of innovative projects, spanning areas like **Web Development**, cutting-edge **AI/ML applications**, robust **DevOps practices**, insightful **Data Science initiatives**, and the creation of valuable **open-source educational tools**."},{question:"Are there opportunities for me to build my profile and gain recognition?",answer:"Definitely! We believe in recognizing our contributors. You can gain visibility through our **community leaderboard**, earn **Discord badges**, get featured in our **LinkedIn spotlights**, and receive **certificates of contribution** for your efforts."}],W=({faq:n,index:t,openIndex:i,toggleFAQ:r})=>{const c=i===t,s=`
        overflow-hidden transition-[max-height,padding,border] duration-500 ease-in-out
        ${c?"max-h-96 py-3 sm:py-4 border-t border-purple-100 dark:border-gray-600":"max-h-0 pt-0 pb-0 border-t-0"}
        px-5 sm:px-6 text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700
    `,l=a=>({__html:a.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")});return e.jsxs("div",{className:"bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-2xl transition-all duration-200 ease-in-out",children:[e.jsxs("button",{onClick:()=>r(t),"aria-expanded":c,"aria-controls":`faq-panel-${t}`,className:"w-full flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 text-left text-purple-800 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200",children:[e.jsx("span",{className:"text-lg sm:text-xl font-semibold",children:n.question}),e.jsx("div",{className:`flex-shrink-0 ml-2 transform transition-transform duration-300 ${c?"rotate-180":"rotate-0"}`,children:e.jsx(me,{className:"h-6 w-6 text-purple-600 dark:text-purple-400"})})]}),e.jsx("div",{id:`faq-panel-${t}`,role:"region",className:s,children:e.jsx("p",{className:"leading-relaxed",dangerouslySetInnerHTML:l(n.answer)})})]},t)};function Ne(){const[n,t]=d.useState(null),i=l=>{t(a=>a===l?null:l)},r=Math.ceil(I.length/2),c=I.slice(0,r),s=I.slice(r);return e.jsxs("div",{className:"max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-12 w-full",children:[e.jsx("h2",{className:"text-3xl font-extrabold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white",children:"Frequently Asked Questions"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8",children:[e.jsx("div",{className:"space-y-4",children:c.map((l,a)=>e.jsx(W,{faq:l,index:a,openIndex:n,toggleFAQ:i},a))}),e.jsx("div",{className:"space-y-4",children:s.map((l,a)=>e.jsx(W,{faq:l,index:a+r,openIndex:n,toggleFAQ:i},a+r))})]})]})}function q({children:n,containerClassName:t,className:i,as:r="button",duration:c=1,clockwise:s=!0,...l}){const[a,h]=d.useState(!1),[p,u]=d.useState("TOP"),f=w=>{const o=["TOP","LEFT","BOTTOM","RIGHT"],g=o.indexOf(w),m=s?(g-1+o.length)%o.length:(g+1)%o.length;return o[m]},b={TOP:"radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",LEFT:"radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",BOTTOM:"radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",RIGHT:"radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)"},x="radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";return d.useEffect(()=>{if(!a){const w=setInterval(()=>{u(o=>f(o))},c*1e3);return()=>clearInterval(w)}},[a]),e.jsxs(r,{onMouseEnter:w=>{h(!0)},onMouseLeave:()=>h(!1),className:S("relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",t),...l,children:[e.jsx("div",{className:S("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",i),children:n}),e.jsx(D.div,{className:S("flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"),style:{filter:"blur(2px)",position:"absolute",width:"100%",height:"100%"},initial:{background:b[p]},animate:{background:a?[b[p],x]:b[p]},transition:{ease:"linear",duration:c??1}}),e.jsx("div",{className:"bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]"})]})}const Ce="/assets/image-DNn3R6WW.png",Se=[{id:1,name:"Dipesh Sahu",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/DipeshSahu/sahudipesh.png",linkedin:"https://www.linkedin.com/in/dipesh-sahu-943720215/"},{id:2,name:"Karan Kose",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Karan/karankose.webp",linkedin:"https://linkedin.com/in/karan-kose-a1493b27b"},{id:3,name:"Vishal Choudhary",image:Ce,linkedin:"https://linkedin.com/in/vishal-choudhary-946b9821b"},{id:4,name:"Pratik Ajbe",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/PratikAjbe/ajbepratik.png",linkedin:"https://linkedin.com/in/pratik-ajbe-710bb326a"},{id:5,name:"Arsh Choudhary",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/ArshChoudhary/choudharyarsh.jpg",linkedin:"https://linkedin.com/in/sync-w-arsh"},{id:6,name:"Jayesh Tapadiya",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Jayesh/tapadiyajayesh.webp",linkedin:"linkedin.com/in/jayesh-tapdiya-01573024a"},{id:7,name:"Himanshu Sahu",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Himanshu/sahuhimanshu.webp",linkedin:"https://himanshusahu-07.vercel.app/"},{id:8,name:"Ashmeet Singh",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Ashmeet/singashmeet.webp",linkedin:"https://ashmeet.techquanta.tech"},{id:9,name:"Balram Dhakad",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/BalramDhakad/dhakadbalram.png",linkedin:"https://balram.techquanta.tech"},{id:10,name:"Kishan Rathore",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Kishan/rathorekishan.jpg",linkedin:"https://www.linkedin.com/in/kishan-rathore-01b2a7226/"},{id:11,name:"Shailendra Singh Panwar",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/shailandra/panwarshailendra.png",linkedin:"https://linkedin.com/in/shailendrasingh189"},{id:12,name:"Agrim Jain",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/AgrimJain/jainagrim.webp",linkedin:"https://linkedin.com/in/agrim-jaindatascientist75524"},{id:13,name:"Deepak Rathore",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Deepak/deepak.png",linkedin:"https://linkedin.com/in/deepak-6061a432a"},{id:14,name:"Anirudha Gune",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/AnirudhGune/ani.webp",linkedin:"https://www.linkedin.com/in/anirudha-gune-65b2a7226/"},{id:15,name:"Harpreet Singh",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Harpreet/harpreet.png",linkedin:"https://linkedin.com/in/harpreet-chhabra-887758225"},{id:16,name:"Yashwant Singh Borana",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/Yashwant/singhborana.png",linkedin:"https://yashwant.techquanta.tech"},{id:17,name:"Prerna Parwani",image:"https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/communitytechies/PrernaParwani/prerna.png",linkedin:"https://linkedin.com/in/prerna-parwani-012296228"}],Me=()=>{const n=d.useRef(null),[t,i]=d.useState({width:window.innerWidth,height:window.innerHeight}),[r,c]=d.useState(()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),s=t.width<=768,l=d.useMemo(()=>Se,[]);d.useEffect(()=>{const o=window.matchMedia("(prefers-color-scheme: dark)"),g=m=>c(m.matches?"dark":"light");return o.addEventListener("change",g),()=>o.removeEventListener("change",g)},[]),d.useEffect(()=>{let o=null;const g=()=>{o||(o=setTimeout(()=>{i({width:window.innerWidth,height:window.innerHeight}),o=null},150))};return window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),o&&clearTimeout(o)}},[]);const a=o=>o<=480?80:o<=768?90:o<=1024?110:o<=1400?120:130,h=d.useMemo(()=>a(t.width),[t.width]),p=d.useMemo(()=>{const o=[3,5,6,3];let g=[],m=0;for(let v=0;v<o.length&&m<l.length;v++){const j=l.length-m;g.push(Math.min(o[v],j)),m+=o[v]}return g},[l.length]),u=h*1.3,b=(p.length-1)*u+90,x=b+h*2+100,w=d.useMemo(()=>{const o=Math.min(200,t.width*1.12),g=(x-b)/3+80,m=[];let v=0;return p.forEach((j,k)=>{const E=(j-1)*o,B=(t.width-E)/2;let N;k===0?N="from-top":k===p.length-1?N="from-bottom":k<p.length/2?N=k%2===1?"from-left":"from-right":N=k%2===1?"from-right":"from-left";for(let C=0;C<j&&v<l.length;C++){const L=B+C*o-46,T=g+k*u-60,$=v*13%11-5,P=v*17%13-6;m.push({x:Math.max(h/2,Math.min(L+$,t.width-h/2)),y:Math.max(h/2,Math.min(T+P,x-h/2)),direction:N,row:k,col:C}),v++}}),m},[t.width,x,h,p,l.length]);return e.jsxs("div",{ref:n,className:`coreteam-container ${r==="dark"?"dark-theme":"light-theme"}`,style:{height:s?"auto":`${x}px`},children:[e.jsxs("div",{className:"coreteam-heading-container",children:[e.jsx("h2",{className:`coreteam-heading text-center w-screen ${r==="dark"?"dark":"light"} `,children:"Community Techies"}),e.jsx("hr",{className:"coreteam-separator"})]}),s?e.jsx("div",{className:"coreteam-mobile-grid",children:l.map(o=>e.jsxs("div",{className:"coreteam-mobile-card",children:[e.jsx("div",{className:"volunteer-avatar",style:{width:h,height:h},children:e.jsx("img",{src:o.image,alt:o.name,className:"volunteer-image",loading:"lazy"})}),o.linkedin&&e.jsx("a",{href:o.linkedin,target:"_blank",rel:"noopener noreferrer",className:"linkedin-button flex-wrap",children:e.jsxs("div",{className:"volunteer-name",children:[o.name,"  "]})})]},o.id))}):l.map((o,g)=>{const m=w[g];return e.jsxs("div",{className:"volunteer-item",style:{top:m==null?void 0:m.y,left:m==null?void 0:m.x,position:"absolute"},"data-direction":m==null?void 0:m.direction,children:[e.jsx("div",{className:"volunteer-avatar",style:{width:h,height:h},children:e.jsx("img",{src:o.image,alt:o.name,className:"volunteer-image",loading:"lazy"})}),o.linkedin&&e.jsx("a",{href:o.linkedin,target:"_blank",rel:"noopener noreferrer",className:"linkedin-button",children:e.jsx("div",{className:"volunteer-name",children:o.name})})]},o.id)})]})},Ee=({children:n,className:t,containerClassName:i})=>{let r=z(0),c=z(0);const s={light:{default:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,hover:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`},dark:{default:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,hover:`url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`}};function l({currentTarget:a,clientX:h,clientY:p}){if(!a)return;let{left:u,top:f}=a.getBoundingClientRect();r.set(h-u),c.set(p-f)}return e.jsxs("div",{className:S("group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-[#121212]",i),onMouseMove:l,children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 dark:hidden opacity-20",style:{backgroundImage:s.light.default}}),e.jsx("div",{className:"pointer-events-none absolute inset-0 hidden dark:block opacity-20",style:{backgroundImage:s.dark.default}}),e.jsx(D.div,{className:"pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden",style:{backgroundImage:s.light.hover,WebkitMaskImage:M`
            radial-gradient(
              200px circle at ${r}px ${c}px,
              black 0%,
              transparent 100%
            )
          `,maskImage:M`
            radial-gradient(
              200px circle at ${r}px ${c}px,
              black 0%,
              transparent 100%
            )
          `}}),e.jsx(D.div,{className:"pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block",style:{backgroundImage:s.dark.hover,WebkitMaskImage:M`
            radial-gradient(
              200px circle at ${r}px ${c}px,
              black 0%,
              transparent 100%
            )
          `,maskImage:M`
            radial-gradient(
              200px circle at ${r}px ${c}px,
              black 0%,
              transparent 100%
            )
          `}}),e.jsx("div",{className:S("relative z-20",t),children:n})]})},Be=n=>{const[t,i]=d.useState(!1),r=d.useRef(!1);return d.useEffect(()=>{const c=new IntersectionObserver(([s])=>{s.isIntersecting&&!r.current&&(i(!0),c.disconnect(),r.current=!0)},{rootMargin:"0px",threshold:.2});return n.current&&c.observe(n.current),()=>{n.current&&c.unobserve(n.current)}},[n]),t},Le=[{title:"Open Source",description:"Contributing to, and building on, projects that are openly available to everyone.",icon:e.jsx(ge,{className:"w-12 h-12 text-slate-400"}),link:"https://hub.docker.com/u/techquanta"},{title:"AI & ML",description:"Exploring the latest advancements in artificial intelligence and machine learning.",icon:e.jsx(he,{className:"w-12 h-12 text-purple-400"}),link:"https://www.kaggle.com/tquanta"},{title:"Research",description:"Deep diving into academic papers and conducting new experiments.",icon:e.jsx(je,{className:"w-12 h-12 text-red-400"}),link:"https://scholar.google.com/"},{title:"Git & Version Control",description:"Mastering Git workflows and collaborative development practices.",icon:e.jsx(be,{className:"w-12 h-12 text-green-400"}),link:"https://techquata.github.io/git_vc"},{title:"SDE & Web App Dev",description:"Building robust software solutions and creating stunning web applications.",icon:e.jsx(ve,{className:"w-12 h-12 text-blue-400"}),link:"https://education.github.com/pack"},{title:"Web & App Dev",description:"Creating stunning and functional web and mobile applications.",icon:e.jsx(ke,{className:"w-12 h-12 text-orange-400"}),link:"https://github.com/TechQuanta"}],Te=({domain:n,index:t})=>{const i=d.useRef(null),r=Be(i);return e.jsxs("a",{href:n.link,target:"_blank",rel:"noopener noreferrer",ref:i,className:`relative flex flex-col items-center p-8 rounded-3xl transition-all duration-700 ease-out transform
          
          /* BASE: Solid backgrounds and borders for max contrast */
          /* LIGHT THEME: Solid White background with a subtle border */
          bg-white border border-gray-100 
          /* DARK THEME: Solid Dark Gray background with a subtle border */
          dark:bg-transparent dark:border-gray-700
          
          /* HOVER STYLES: Lift, scale, and theme-aware LEFT border (New Change) */
          /* Light theme hover: Black left border (4px), borders become black 1px */
          hover:border-black hover:border-l-4 
          /* Dark theme hover: White left border (4px), borders become white 1px */
          dark:hover:border-white dark:hover:border-l-4

           transition-transform duration-300 group
        ${r?"translate-y-0 opacity-100":"translate-y-16 opacity-0"}
      `,style:{transitionDelay:`${t*100}ms`},children:[e.jsx("div",{className:`mb-6 p-4 rounded-full shadow-inner transition-colors duration-300
        /* ICON CONTAINER STYLES */
        bg-gray-100 dark:bg-transparent group-hover:bg-gray-200 dark:group-hover:bg-gray-600`,children:A.cloneElement(n.icon,{className:n.icon.props.className.replace("text-slate-400","text-slate-700 dark:text-slate-400").replace("text-purple-400","text-purple-700 dark:text-purple-400").replace("text-red-400","text-red-700 dark:text-red-400").replace("text-green-400","text-green-700 dark:text-green-400").replace("text-blue-400","text-blue-700 dark:text-blue-400").replace("text-orange-400","text-orange-700 dark:text-orange-400")})}),e.jsx("h3",{className:`text-2xl font-bold mb-2 text-center transition-colors duration-300
        /* TITLE STYLES: Black on solid light, White on solid dark (Max Contrast) */
        text-black dark:text-white`,children:n.title}),e.jsx("p",{className:`text-center text-sm transition-colors duration-300
        /* DESCRIPTION STYLES: Black on solid light, White on solid dark (Max Contrast) */
        text-black dark:text-white`,children:n.description}),e.jsx("div",{className:`mt-6 text-sm flex items-center font-semibold transition-colors duration-200
          /* LINK STYLES: Black on solid light, White on solid dark (Max Contrast) */
          text-black group-hover:text-black dark:text-white dark:group-hover:text-white
        `,children:e.jsxs("span",{className:"flex items-center",children:["Go to Community ",e.jsx(le,{className:"ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"})]})})]})};function Ie(){return e.jsx("div",{className:`min-h-screen transition-colors duration-500 font-sans p-6 md:p-12
      relative overflow-hidden bg-transparent flex items-center justify-center`,children:e.jsx("div",{className:"max-w-7xl mx-auto relative z-10",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:Le.map((n,t)=>e.jsx(Te,{domain:n,index:t},t))})})})}const De=[{id:"discord",title:"Engage on Discord",description:"Join real-time discussions, get support, and connect with peers.",icon:e.jsx(K,{}),url:"https://discord.com/invite/WK3aftq5vg",iconColor:"text-indigo-600",cardBgLight:"#e0e7ff",cardBgDark:"transparent",iconBoxBgLight:"#e5e7eb",iconBoxBgDark:"transparent",hoverSliceColor:"#6366f1",glowColor:"rgba(99, 102, 241, 0.2)"},{id:"github",title:"Contribute on GitHub",description:"Collaborate on open-source projects and enhance our codebases.",icon:e.jsx(Z,{}),url:"https://github.com/TechQuanta",iconColor:"text-gray-900",cardBgLight:"#f3f4f6",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"#ffffff",hoverSliceColor:"#1f2937",glowColor:"rgba(31, 41, 55, 0.2)"},{id:"whatsapp",title:"Receive WhatsApp Updates",description:"Stay informed with important announcements and quick insights.",icon:e.jsx(J,{}),url:"https://chat.whatsapp.com/CjMw4xiTuNTFBaDzMKpuIC",iconColor:"text-green-500",cardBgLight:"#dcfce7",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#29da6dff",glowColor:"rgba(34, 197, 94, 0.2)"},{id:"docker",title:"Explore Container Projects",description:"Access our latest containerized applications and demos.",icon:e.jsx(U,{}),url:"https://hub.docker.com/u/techquanta",iconColor:"text-blue-600",cardBgLight:"#dbeafe",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#4e88e4ff",glowColor:"rgba(59, 130, 246, 0.2)"},{id:"linkedin",title:"Connect on LinkedIn",description:"Network with professionals and find career opportunities.",icon:e.jsx(ee,{}),url:"https://www.linkedin.com/in/techquanta-community",iconColor:"text-blue-700",cardBgLight:"#dbeafe",cardBgDark:"transparent",iconBoxBgLight:"transparent",iconBoxBgDark:"transparent",hoverSliceColor:"#1d4ed8",glowColor:"rgba(29, 78, 216, 0.2)"}],ze=({icon:n,iconColor:t})=>{const i=Array.from({length:200}).map((r,c)=>{const s=Math.floor(Math.random()*4+5),l={left:`${Math.random()*100}vw`,animationDelay:`${Math.random()*2}s`,animationDuration:`${2+Math.random()*2}s`,transform:`rotate(${Math.random()*360}deg)`,opacity:Math.random()*.5+.5,color:t};return e.jsxs("div",{className:"confetti-piece",style:l,children:[A.cloneElement(n,{className:`h-${s} w-${s}`})," "]},c)});return e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-50 overflow-hidden",children:[e.jsx("style",{children:`
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
        `}),i]})},Ae=()=>{const[n,t]=d.useState(!1),[i,r]=d.useState(null),[c,s]=d.useState(""),l=(a,h,p,u)=>{a.preventDefault(),r(p),s(u),t(!0),setTimeout(()=>{t(!1),r(null),s(""),window.open(h,"_blank","noopener,noreferrer")},2e3)};return e.jsxs("div",{className:"w-full max-w-7xl mx-auto font-space-grotesk transition-colors duration-300",children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"bg-transparent rounded-xl py-0",children:e.jsx("ul",{className:"",children:De.map(a=>e.jsxs("li",{className:`group flex flex-col md:flex-row items-start md:items-center justify-between
                py-3 px-4
                bg-transparent dark:bg-transparent
                transition-all duration-200 ease-in-out
                border-t border-b border-gray-200 dark:border-gray-700
                hover:shadow-md /* Removed hover:scale-[1.005] to let the glow be the primary effect */
                transform origin-center
                relative strip-hover-glow`,style:{"--glow-color":a.glowColor},children:[e.jsxs("div",{className:"flex flex-col items-start mb-2 md:mb-0",children:[e.jsx("span",{className:`text-lg font-normal text-gray-900 dark:text-white font-space-grotesk
                                 relative inline-block
                                 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]
                                 after:bg-current
                                 after:transition-all after:duration-300 after:ease-in-out
                                 group-hover:after:w-full`,children:a.title}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mt-1 font-space-grotesk font-thin",children:a.description})]}),e.jsx("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",onClick:h=>l(h,a.url,a.icon,a.iconColor),className:"animated-button hidden md:inline-flex",style:{"--card-bg-light":a.cardBgLight,"--card-bg-dark":a.cardBgDark,"--hover-slice-color":a.hoverSliceColor,"--icon-box-bg-light":a.iconBoxBgLight,"--icon-box-bg-dark":a.iconBoxBgDark},"aria-label":`Go to ${a.title}`,children:e.jsxs("div",{className:"icon-content",children:[" ",A.cloneElement(a.icon,{className:`h-5 w-5 ${a.iconColor}`})]})}),e.jsxs("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",onClick:h=>l(h,a.url,a.icon,a.iconColor),className:`md:hidden flex items-center justify-start w-full
                  text-blue-600 dark:text-blue-400 font-normal
                  hover:underline mt-2
                  transition-colors duration-200 font-space-grotesk`,children:[a.title.includes("on ")?a.title.split("on ")[1]:a.title.includes("Receive ")?a.title.split("Receive ")[1]:a.title.includes("Explore ")?a.title.split("Explore ")[1]:a.title,e.jsx("svg",{className:"ml-1 w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]},a.id))})}),n&&i&&e.jsx(ze,{icon:i,iconColor:c})]})},O=["Innovators","Creators","Coders","Designers","Writers","Problem Solvers","Your Ideas","New Perspectives"],Re=()=>{const[n,t]=d.useState(0),[i,r]=d.useState(!1),c=d.useRef(null),s="https://www.youtube.com/embed/pQkaoaI9Ljc?si=xITc7-aGS_N6SoLT",[l,a]=d.useState(s),[h,p]=d.useState({});return d.useEffect(()=>{const u=setInterval(()=>{r(!0);const f=setTimeout(()=>{t(b=>(b+1)%O.length),r(!1)},500);return()=>clearTimeout(f)},2e3);return()=>clearInterval(u)},[]),d.useEffect(()=>{const u=c.current;if(!u)return;const f=new URL(s);f.searchParams.set("enablejsapi","1");const b=new IntersectionObserver(x=>{x.forEach(w=>{w.isIntersecting?(f.searchParams.set("autoplay","1"),f.searchParams.set("mute","1"),a(f.toString())):(f.searchParams.delete("autoplay"),a(f.toString()))})},{threshold:.5});return b.observe(u),()=>{u&&b.unobserve(u)}},[s]),d.useEffect(()=>{var x;const u=(x=c.current)==null?void 0:x.closest(".video-card-container");if(!u)return;const f=w=>{const{clientX:o,clientY:g}=w,{left:m,top:v,width:j,height:k}=u.getBoundingClientRect(),E=m+j/2,B=v+k/2,N=(o-E)/(j/2),L=-((g-B)/(k/2))*10,T=N*10;p({transform:`perspective(1000px) rotateX(${L}deg) rotateY(${T}deg) translateZ(30px)`,transition:"transform 0.1s ease-out"})},b=()=>{p({transform:"perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",transition:"transform 0.5s ease-out"})};return u.addEventListener("mousemove",f),u.addEventListener("mouseleave",b),()=>{u.removeEventListener("mousemove",f),u.removeEventListener("mouseleave",b)}},[]),e.jsxs("div",{className:"home-page",children:[e.jsxs(te,{children:[e.jsx("title",{children:"TechQuanta - Crafting Open Source Futures | Join Our Community"}),e.jsx("meta",{name:"description",content:"TechQuanta welcomes newcomers to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!"}),e.jsx("meta",{property:"og:title",content:"TechQuanta - Crafting Open Source Futures"}),e.jsx("meta",{property:"og:description",content:"Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:url",content:"https://yourwebsite.com/"}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:"TechQuanta - Crafting Open Source Futures"}),e.jsx("meta",{name:"twitter:description",content:"Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."}),e.jsx("link",{rel:"canonical",href:"https://yourwebsite.com/"})," "]}),e.jsx(Ee,{children:e.jsx("section",{className:"home-hero-section",children:e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:e.jsxs("div",{className:"home-hero-wrapper",children:[e.jsxs("h1",{className:"home-hero-title",children:["Crafting Open Source Futures. With"," ",e.jsxs("div",{className:"home-hero-animated-word-container",children:[e.jsx("span",{className:`home-hero-animated-word ${i?"home-hero-animated-word-exit":"home-hero-animated-word-enter"}`,children:O[n]}),e.jsx("span",{className:`home-hero-animated-bg ${i?"home-hero-animated-bg-exit":"home-hero-animated-bg-enter"}`,style:{borderRadius:"8px",transformOrigin:"center"}})]})]}),e.jsxs("p",{className:"home-hero-description",children:[e.jsx("strong",{children:"TechQuanta"})," welcomes ",e.jsx("strong",{children:"newcomers"})," to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!"]}),e.jsxs("div",{className:"home-hero-cta",children:[e.jsx(q,{containerClassName:"rounded-full w-full sm:w-auto font-exo2",as:"button",className:"dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full",onClick:()=>window.open("https://techquanta.github.io/community-wall"),children:e.jsx("span",{children:"Make First Contribution"})}),e.jsx(q,{containerClassName:"rounded-full w-full sm:w-auto",as:"button",className:"bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full",onClick:()=>window.location.href="/community-work",children:e.jsx("span",{children:"Explore Projects"})})]})]})})})}),e.jsxs("section",{className:"py-16 px-4 sm:px-8 lg:px-16 bg-trasnparent ",children:[e.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-center mb-12 dark:text-blue dark:from-white text-purple-400 font-space-grotesk ",children:"Discover Our Vision"}),e.jsxs("div",{className:"video-card-container w-full max-w-6xl mx-auto relative group",style:h,children:[e.jsx("div",{className:"video-card-shadow-outer"}),e.jsx("div",{className:"video-aspect-ratio video-shadow-inset",children:e.jsx("iframe",{ref:c,src:l,title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerPolicy:"strict-origin-when-cross-origin",allowFullScreen:!0})})]})]}),e.jsx("section",{className:"py-16 px-4  max-w-7xl mx-auto",children:e.jsx(Ae,{})}),e.jsxs("section",{className:"home-core-team-section",children:[e.jsx("div",{className:"home-core-team-wrapper",children:e.jsx(Me,{})}),e.jsx("div",{className:"home-partners-wrapper",children:e.jsx(Ie,{})}),e.jsx("div",{children:e.jsx(Ne,{})})]})]})};export{Re as default};
