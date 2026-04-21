(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1564:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>g});var i=a(5155),r=a(5135),s=a(642),n=a(2115);let l="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";function o({text:e,className:t="",delay:a=0,speed:s=30,start:o=!0}){let[c,d]=(0,n.useState)(""),[x,m]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{if(!o)return void d("");let t=0,i=setTimeout(()=>{let a=setInterval(()=>{d(e.split("").map((a,i)=>i<t?e[i]:" "===a?" ":l[Math.floor(Math.random()*l.length)]).join("")),t>=e.length&&(clearInterval(a),m(!0)),t+=1/3},s);return()=>clearInterval(a)},1e3*a);return()=>{clearTimeout(i)}},[e,a,s,o]),(0,i.jsx)(r.P.span,{className:t,initial:{opacity:0},animate:{opacity:1},children:c})}var c=a(2011),d=a(5269);let x=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,m=`
uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float angle = atan(uv.y, uv.x);
  float dist = length(uv);
  
  // --- Dreamy Swirl Logic (Original Vibes) ---
  
  float rotatedAngle = angle + uTime * 0.1;
  
  // Swirling dreamy clouds
  float swirl = sin(rotatedAngle * 8.0 + uTime * 1.5 + sin(dist * 8.0)) * 0.5 + 0.5;
  
  // Soft rays
  float rays = sin(angle * 14.0 - uTime * 0.4) * 0.5 + 0.5;
  rays *= pow(max(0.0, 1.0 - dist * 1.8), 3.0);
  
  // Outer glow
  float glow = smoothstep(0.5, 0.0, dist);
  
  // Colors - Retro Dream Palette (Enriched)
  vec3 col_crimson = vec3(0.76, 0.23, 0.13); // Mars Crimson
  vec3 col_vermillion = vec3(0.89, 0.26, 0.20); // Vermillion
  vec3 col_cream = vec3(0.92, 0.88, 0.78); // Faded Cream
  vec3 col_deep_indigo = vec3(0.1, 0.0, 0.2); // Deep Indigo for contrast
  
  // Mix colors based on swirl
  // Base: mix between deep indigo and crimson
  vec3 color = mix(col_deep_indigo, col_crimson, swirl);
  // Highlights: mix in vermillion and cream
  color = mix(color, col_vermillion, smoothstep(0.4, 0.8, swirl));
  color = mix(color, col_cream, rays * (0.3 + 0.3 * sin(uTime * 0.5))); // Shimmer
  color += glow * col_crimson * 0.2;

  // --- DARK CENTER FIX ---
  // Create a localized void in the absolute center for text visibility
  float centerVoid = smoothstep(0.0, 0.25, dist); // 0 at center, 1 at 0.25 radius
  
  // Outer fade
  float mask = smoothstep(0.5, 0.2, dist);
  
  // Final Alpha
  // Combine swirl alpha with center void
  float alpha = uIntensity * (swirl * 0.4 + rays * 0.6 + glow * 0.2) * mask * centerVoid;
  
  gl_FragColor = vec4(color, alpha);
}
`;function u({intensity:e=1,fadeOut:t=!1}){let a=(0,n.useRef)(null),r=(0,n.useRef)(null),s=(0,n.useMemo)(()=>({uTime:{value:0},uIntensity:{value:e}}),[]);return(0,c.D)(i=>{let s=i.clock.getElapsedTime();r.current&&(r.current.uniforms.uTime.value=s,r.current.uniforms.uIntensity.value=d.cj9.lerp(r.current.uniforms.uIntensity.value,t?0:e,.02)),a.current&&(a.current.rotation.z=.02*s)}),(0,i.jsxs)("mesh",{ref:a,position:[0,0,0],scale:[12,12,1],children:[(0,i.jsx)("planeGeometry",{args:[2,2]}),(0,i.jsx)("shaderMaterial",{ref:r,vertexShader:x,fragmentShader:m,uniforms:s,transparent:!0,depthTest:!1,blending:d.EZo,side:d.$EB})]})}var p=a(5123),h=a(6275),v=a(63);function f({visible:e,fadeOut:t}){return e||t?(0,i.jsxs)("group",{children:[(0,i.jsx)(v.u,{makeDefault:!0,position:[0,0,5],fov:75}),(0,i.jsx)(u,{intensity:1,fadeOut:t})]}):null}function g(){let[e,t]=(0,n.useState)("drift"),{setWarpSpeed:a,setWarpCount:l,setShowDock:c,setPhase:d}=(0,p.Y)();return(0,n.useEffect)(()=>{d(e)},[e,d]),(0,n.useEffect)(()=>{c(!1);let e=setTimeout(()=>{t("warp")},4e3),a=setTimeout(()=>{t("reality"),setTimeout(()=>c(!0),3e3)},12e3);return()=>{clearTimeout(e),clearTimeout(a)}},[c,d]),(0,n.useEffect)(()=>{"drift"===e?(a(.01),l(200)):"warp"===e?(a(1.8),l(1800)):"reality"===e&&(a(.04),l(600))},[e,a,l]),(0,i.jsxs)("main",{className:"relative w-full min-h-[300vh] bg-transparent text-white",children:[(0,i.jsx)("div",{className:"fixed inset-0 z-0 pointer-events-none",children:(0,i.jsx)(h.Hl,{gl:{alpha:!0,antialias:!0},onCreated:({gl:e})=>{e.setClearColor(0,0)},children:(0,i.jsx)(f,{visible:"warp"===e,fadeOut:"reality"===e})})}),(0,i.jsx)(r.P.div,{animate:{opacity:+("drift"===e),backdropFilter:"drift"===e?"blur(60px)":"blur(0px)"},transition:{duration:4,ease:"easeInOut"},className:"fixed inset-0 z-[60] pointer-events-none bg-gradient-to-b from-[#050505]/40 via-transparent to-[#0a0505]/30",children:(0,i.jsx)("div",{className:"pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.03]",style:{backgroundImage:"var(--noise-url)"}})}),(0,i.jsx)("div",{className:"fixed inset-x-0 top-1/3 z-[80] flex flex-col items-center justify-center font-mono text-[12px] md:text-[13px] tracking-[1em] text-white/80 uppercase",children:(0,i.jsxs)(s.N,{mode:"wait",children:["drift"===e&&(0,i.jsxs)(r.P.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,scale:1.1},transition:{duration:3},className:"flex flex-col items-center gap-16",children:[(0,i.jsxs)("div",{className:"flex flex-col items-center gap-6",children:[(0,i.jsxs)("div",{className:"relative group",children:[(0,i.jsx)("div",{className:"absolute -inset-8 bg-[#c23b22]/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"}),(0,i.jsx)(o,{text:"设计面向未来的智能产品",speed:70})]}),(0,i.jsxs)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:1.2,duration:1.5},className:"flex flex-col items-center gap-2",children:[(0,i.jsx)("div",{className:"text-[#eae0c8]/35 text-[9px] tracking-[0.5em] font-mono",children:"CHILDREN \xb7 AI \xb7 EXPLORATION"}),(0,i.jsx)("div",{className:"text-[#c23b22]/30 text-[9px] tracking-[0.3em] font-mono",children:"LIXIANG // PRODUCT DESIGNER"})]})]}),(0,i.jsxs)(r.P.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>{t("warp")},className:"group relative px-12 py-4 bg-transparent transition-all border border-white/10 hover:border-[#c23b22]/50 hover:bg-[#c23b22]/5",children:[(0,i.jsxs)("div",{className:"absolute inset-0 flex items-center justify-between px-2 -mx-1 pointer-events-none",children:[(0,i.jsx)("span",{className:"text-white/20 text-xl font-light transform group-hover:translate-x-1 transition-transform",children:"["}),(0,i.jsx)("span",{className:"text-white/20 text-xl font-light transform group-hover:-translate-x-1 transition-transform",children:"]"})]}),(0,i.jsx)("div",{className:"relative z-10 text-white tracking-[0.8em] font-mono text-xs",children:"进入宇宙"}),(0,i.jsx)("div",{className:"absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c23b22] group-hover:w-3/4 transition-all duration-500"})]})]},"t1"),"warp"===e&&(0,i.jsxs)(r.P.div,{initial:{opacity:0,scale:.9},animate:{opacity:[0,1,1,0],scale:1},transition:{duration:6,times:[0,.05,.9,1]},className:"relative",children:[(0,i.jsx)("div",{className:"absolute -inset-10 bg-[#c23b22]/5 blur-2xl rounded-full"}),(0,i.jsx)(o,{text:"正在进入星际智能设计轨道...",speed:60})]},"t2")]})}),(0,i.jsx)(s.N,{children:"reality"===e&&(0,i.jsxs)(r.P.div,{initial:{opacity:0,scale:1.05,filter:"blur(60px)"},animate:{opacity:1,scale:1,filter:"blur(0px)",x:[0,12,0],y:[0,-8,0]},transition:{opacity:{duration:3},scale:{duration:4,ease:"easeOut"},filter:{duration:4,ease:"easeOut"},x:{duration:45,repeat:1/0,ease:"linear"},y:{duration:38,repeat:1/0,ease:"linear"}},className:"fixed inset-0 w-full h-full",children:[(0,i.jsx)("div",{className:"absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]"}),(0,i.jsx)("div",{className:"relative z-20 flex flex-col items-center justify-center h-full w-full p-6",children:(0,i.jsxs)("div",{className:"relative flex flex-col items-center text-center mt-[-8vh]",children:[(0,i.jsx)("h1",{className:"chromatic-text retro-glow font-sans font-black text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] text-white opacity-95 mix-blend-screen select-none",children:(0,i.jsxs)(r.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:1.5,duration:2},children:[(0,i.jsx)("span",{className:"block",children:(0,i.jsx)(o,{text:"ASTRAL",start:!0,delay:1.5})}),(0,i.jsx)(r.P.span,{animate:{opacity:[.8,1,.8],filter:["blur(0.2px)","blur(0px)","blur(0.2px)"],scale:[1,1.01,1]},transition:{duration:8,repeat:1/0,ease:"easeInOut"},className:"block text-4xl md:text-6xl lg:text-7xl font-bold mt-6 tracking-[0.6em] text-[#eae0c8] mix-blend-screen drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]",children:(0,i.jsx)(o,{text:"DRIFT",start:!0,delay:2})})]})}),(0,i.jsxs)(r.P.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:4,duration:2},className:"mt-10 flex flex-col items-center gap-3 drop-shadow-[0_8px_30px_rgb(0,0,0,0.5)]",children:[(0,i.jsx)("div",{className:"text-[12px] md:text-[14px] font-mono tracking-[0.4em] text-white/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]",children:"Designing Human-Centered Intelligent Products for the Future"}),(0,i.jsx)("div",{className:"mt-2 text-[11px] font-mono tracking-[0.5em] text-[#eae0c8] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)]",children:"Xiang Li \xa0\xb7\xa0 Product Designer"})]}),(0,i.jsxs)(r.P.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{delay:5.5,duration:2},className:"mt-12 flex items-center gap-8",children:[(0,i.jsxs)("a",{href:"/work",className:"group relative px-12 py-3.5 border border-white/60 bg-black/60 backdrop-blur-xl hover:border-amber-400 hover:bg-white/10 transition-all rounded-[2px] shadow-2xl",children:[(0,i.jsx)("span",{className:"text-[13px] font-mono font-bold tracking-[0.5em] text-white group-hover:text-amber-200 uppercase transition-colors",children:"查看项目"}),(0,i.jsx)("div",{className:"absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-px bg-amber-400 group-hover:w-3/4 transition-all duration-500"})]}),(0,i.jsxs)("a",{href:"/about",className:"group text-[12px] font-mono font-bold tracking-[0.5em] text-white/70 hover:text-white uppercase transition-colors flex items-center gap-2 px-6 py-3.5 border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-md transition-all shadow-xl",children:["关于我",(0,i.jsx)("span",{className:"group-hover:translate-x-1 transition-transform",children:"→"})]})]})]})})]},"reality")})]})}},1795:(e,t,a)=>{Promise.resolve().then(a.bind(a,1564))},5123:(e,t,a)=>{"use strict";a.d(t,{SceneProvider:()=>n,Y:()=>l});var i=a(5155),r=a(2115);let s=(0,r.createContext)(void 0),n=({children:e})=>{let[t,a]=(0,r.useState)(.2),[n,l]=(0,r.useState)(1500),[o,c]=(0,r.useState)(!0),[d,x]=(0,r.useState)("drift");return(0,i.jsx)(s.Provider,{value:{warpSpeed:t,setWarpSpeed:a,warpCount:n,setWarpCount:l,showDock:o,setShowDock:c,phase:d,setPhase:x},children:e})},l=()=>{let e=(0,r.useContext)(s);if(!e)throw Error("useScene must be used within a SceneProvider");return e}}},e=>{e.O(0,[831,274,367,135,857,640,441,794,358],()=>e(e.s=1795)),_N_E=e.O()}]);