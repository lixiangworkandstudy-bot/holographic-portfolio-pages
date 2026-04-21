(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const mh="15.1.22",Kl=(i,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:i}),Jl=(i,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:i}),Va=(i,e)=>({startTime:e,type:"setValue",value:i}),_h=(i,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:i}),gh=(i,e,{startTime:t,target:n,timeConstant:s})=>n+(e-n)*Math.exp((t-i)/s),Ms=i=>i.type==="exponentialRampToValue",fo=i=>i.type==="linearRampToValue",Mi=i=>Ms(i)||fo(i),Xc=i=>i.type==="setValue",Qn=i=>i.type==="setValueCurve",po=(i,e,t,n)=>{const s=i[e];return s===void 0?n:Mi(s)||Xc(s)?s.value:Qn(s)?s.values[s.values.length-1]:gh(t,po(i,e-1,s.startTime,n),s)},Ql=(i,e,t,n,s)=>t===void 0?[n.insertTime,s]:Mi(t)?[t.endTime,t.value]:Xc(t)?[t.startTime,t.value]:Qn(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,po(i,e-1,t.startTime,s)],za=i=>i.type==="cancelAndHold",Ga=i=>i.type==="cancelScheduledValues",mi=i=>za(i)||Ga(i)?i.cancelTime:Ms(i)||fo(i)?i.endTime:i.startTime,eu=(i,e,t,{endTime:n,value:s})=>t===s?s:0<t&&0<s||t<0&&s<0?t*(s/t)**((i-e)/(n-e)):0,tu=(i,e,t,{endTime:n,value:s})=>t+(i-e)/(n-e)*(s-t),ff=(i,e)=>{const t=Math.floor(e),n=Math.ceil(e);return t===n?i[t]:(1-(e-t))*i[t]+(1-(n-e))*i[n]},pf=(i,{duration:e,startTime:t,values:n})=>{const s=(i-t)/e*(n.length-1);return ff(n,s)},Dr=i=>i.type==="setTarget";class mf{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=mi(e);if(za(e)||Ga(e)){const n=this._automationEvents.findIndex(r=>Ga(e)&&Qn(r)?r.startTime+r.duration>=t:mi(r)>=t),s=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),za(e)){const r=this._automationEvents[this._automationEvents.length-1];if(s!==void 0&&Mi(s)){if(r!==void 0&&Dr(r))throw new Error("The internal list is malformed.");const o=r===void 0?s.insertTime:Qn(r)?r.startTime+r.duration:mi(r),a=r===void 0?this._defaultValue:Qn(r)?r.values[r.values.length-1]:r.value,c=Ms(s)?eu(t,o,a,s):tu(t,o,a,s),l=Ms(s)?Kl(c,t,this._currenTime):Jl(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&Dr(r)&&this._automationEvents.push(Va(this.getValue(t),t)),r!==void 0&&Qn(r)&&r.startTime+r.duration>t){const o=t-r.startTime,a=(r.values.length-1)/r.duration,c=Math.max(2,1+Math.ceil(o*a)),l=o/(c-1)*a,u=r.values.slice(0,c);if(l<1)for(let h=1;h<c;h+=1){const d=l*h%1;u[h]=r.values[h-1]*(1-d)+r.values[h]*d}this._automationEvents[this._automationEvents.length-1]=_h(u,r.startTime,o)}}}else{const n=this._automationEvents.findIndex(o=>mi(o)>t),s=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(s!==void 0&&Qn(s)&&mi(s)+s.duration>t)return!1;const r=Ms(e)?Kl(e.value,e.endTime,this._currenTime):fo(e)?Jl(e.value,t,this._currenTime):e;if(n===-1)this._automationEvents.push(r);else{if(Qn(e)&&t+e.duration>mi(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(n=>mi(n)>e);if(t>1){const n=this._automationEvents.slice(t-1),s=n[0];Dr(s)&&n.unshift(Va(po(this._automationEvents,t-2,s.startTime,this._defaultValue),s.startTime)),this._automationEvents=n}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(o=>mi(o)>e),n=this._automationEvents[t],s=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[s];if(r!==void 0&&Dr(r)&&(n===void 0||!Mi(n)||n.insertTime>e))return gh(e,po(this._automationEvents,s-1,r.startTime,this._defaultValue),r);if(r!==void 0&&Xc(r)&&(n===void 0||!Mi(n)))return r.value;if(r!==void 0&&Qn(r)&&(n===void 0||!Mi(n)||r.startTime+r.duration>e))return e<r.startTime+r.duration?pf(e,r):r.values[r.values.length-1];if(r!==void 0&&Mi(r)&&(n===void 0||!Mi(n)))return r.value;if(n!==void 0&&Ms(n)){const[o,a]=Ql(this._automationEvents,s,r,n,this._defaultValue);return eu(e,o,a,n)}if(n!==void 0&&fo(n)){const[o,a]=Ql(this._automationEvents,s,r,n,this._defaultValue);return tu(e,o,a,n)}return this._defaultValue}}const _f=i=>({cancelTime:i,type:"cancelAndHold"}),gf=i=>({cancelTime:i,type:"cancelScheduledValues"}),vf=(i,e)=>({endTime:e,type:"exponentialRampToValue",value:i}),xf=(i,e)=>({endTime:e,type:"linearRampToValue",value:i}),Sf=(i,e,t)=>({startTime:e,target:i,timeConstant:t,type:"setTarget"}),yf=()=>new DOMException("","AbortError"),Mf=i=>(e,t,[n,s,r],o)=>{i(e[s],[t,n,r],a=>a[0]===t&&a[1]===n,o)},Tf=i=>(e,t,n)=>{const s=[];for(let r=0;r<n.numberOfInputs;r+=1)s.push(new Set);i.set(e,{activeInputs:s,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},bf=i=>(e,t)=>{i.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},Cs=new WeakSet,vh=new WeakMap,Yc=new WeakMap,xh=new WeakMap,jc=new WeakMap,Do=new WeakMap,Sh=new WeakMap,Ha=new WeakMap,Wa=new WeakMap,qa=new WeakMap,yh={construct(){return yh}},Ef=i=>{try{const e=new Proxy(i,yh);new e}catch{return!1}return!0},nu=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,iu=(i,e)=>{const t=[];let n=i.replace(/^[\s]+/,""),s=n.match(nu);for(;s!==null;){const r=s[1].slice(1,-1),o=s[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(o),n=n.slice(s[0].length).replace(/^[\s]+/,""),s=n.match(nu)}return[t.join(";"),n]},su=i=>{if(i!==void 0&&!Array.isArray(i))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},ru=i=>{if(!Ef(i))throw new TypeError("The given value for processorCtor should be a constructor.");if(i.prototype===null||typeof i.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},Af=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>{let p=0;return(_,g,m={credentials:"omit"})=>{const f=u.get(_);if(f!==void 0&&f.has(g))return Promise.resolve();const T=l.get(_);if(T!==void 0){const S=T.get(g);if(S!==void 0)return S}const b=r(_),w=b.audioWorklet===void 0?s(g).then(([S,M])=>{const[E,C]=iu(S,M),x=`${E};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${C}
})})(window,'_AWGS')`;return t(x)}).then(()=>{const S=d._AWGS.pop();if(S===void 0)throw new SyntaxError;n(b.currentTime,b.sampleRate,()=>S(class{},void 0,(M,E)=>{if(M.trim()==="")throw e();const C=Wa.get(b);if(C!==void 0){if(C.has(M))throw e();ru(E),su(E.parameterDescriptors),C.set(M,E)}else ru(E),su(E.parameterDescriptors),Wa.set(b,new Map([[M,E]]))},b.sampleRate,void 0,void 0))}):Promise.all([s(g),Promise.resolve(i(h,h))]).then(([[S,M],E])=>{const C=p+1;p=C;const[x,y]=iu(S,M),k=`${x};((AudioWorkletProcessor,registerProcessor)=>{${y}
})(${E?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${E?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${E?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${C}',class extends AudioWorkletProcessor{process(){return !1}})`,V=new Blob([k],{type:"application/javascript; charset=utf-8"}),U=URL.createObjectURL(V);return b.audioWorklet.addModule(U,m).then(()=>{if(a(b))return b;const L=o(b);return L.audioWorklet.addModule(U,m).then(()=>L)}).then(L=>{if(c===null)throw new SyntaxError;try{new c(L,`__sac${C}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(U))});return T===void 0?l.set(_,new Map([[g,w]])):T.set(g,w),w.then(()=>{const S=u.get(_);S===void 0?u.set(_,new Set([g])):S.add(g)}).finally(()=>{const S=l.get(_);S!==void 0&&S.delete(g)}),w}},Cn=(i,e)=>{const t=i.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},Io=(i,e)=>{const t=Array.from(i).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[n]=t;return i.delete(n),n},Mh=(i,e,t,n)=>{const s=Cn(i,e),r=Io(s,o=>o[0]===t&&o[1]===n);return s.size===0&&i.delete(e),r},dr=i=>Cn(Sh,i),Rs=i=>{if(Cs.has(i))throw new Error("The AudioNode is already stored.");Cs.add(i),dr(i).forEach(e=>e(!0))},Th=i=>"port"in i,fr=i=>{if(!Cs.has(i))throw new Error("The AudioNode is not stored.");Cs.delete(i),dr(i).forEach(e=>e(!1))},Xa=(i,e)=>{!Th(i)&&e.every(t=>t.size===0)&&fr(i)},wf=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>{const p=new WeakMap;return(_,g,m,f,T)=>{const{activeInputs:b,passiveInputs:w}=r(g),{outputs:S}=r(_),M=a(_),E=C=>{const x=c(g),y=c(_);if(C){const R=Mh(w,_,m,f);i(b,_,R,!1),!T&&!h(_)&&t(y,x,m,f),d(g)&&Rs(g)}else{const R=n(b,_,m,f);e(w,f,R,!1),!T&&!h(_)&&s(y,x,m,f);const D=o(g);if(D===0)u(g)&&Xa(g,b);else{const N=p.get(g);N!==void 0&&clearTimeout(N),p.set(g,setTimeout(()=>{u(g)&&Xa(g,b)},D*1e3))}}};return l(S,[g,m,f],C=>C[0]===g&&C[1]===m&&C[2]===f,!0)?(M.add(E),u(_)?i(b,_,[m,f,E],!0):e(w,f,[_,m,E],!0),!0):!1}},Cf=i=>(e,t,[n,s,r],o)=>{const a=e.get(n);a===void 0?e.set(n,new Set([[s,t,r]])):i(a,[s,t,r],c=>c[0]===s&&c[1]===t,o)},Rf=i=>(e,t)=>{const n=i(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(n).connect(e.destination);const s=()=>{t.removeEventListener("ended",s),t.disconnect(n),n.disconnect()};t.addEventListener("ended",s)},Pf=i=>(e,t)=>{i(e).add(t)},Df={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},If=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...Df,...c},h=n(l,u),d=r(l)?e():null;super(a,!1,h,d),this._nativeAnalyserNode=h}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(a){this._nativeAnalyserNode.fftSize=a}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(a){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=a,!(a>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(a){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=a,!(this._nativeAnalyserNode.maxDecibels>a))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(a){this._nativeAnalyserNode.smoothingTimeConstant=a}getByteFrequencyData(a){this._nativeAnalyserNode.getByteFrequencyData(a)}getByteTimeDomainData(a){this._nativeAnalyserNode.getByteTimeDomainData(a)}getFloatFrequencyData(a){this._nativeAnalyserNode.getFloatFrequencyData(a)}getFloatTimeDomainData(a){this._nativeAnalyserNode.getFloatTimeDomainData(a)}},zt=(i,e)=>i.context===e,Nf=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!zt(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,fftSize:a.fftSize,maxDecibels:a.maxDecibels,minDecibels:a.minDecibels,smoothingTimeConstant:a.smoothingTimeConstant};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},mo=i=>{try{i.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},Hn=()=>new DOMException("","IndexSizeError"),Zc=i=>{i.getChannelData=(e=>t=>{try{return e.call(i,t)}catch(n){throw n.code===12?Hn():n}})(i.getChannelData)},Lf={numberOfChannels:1},Ff=(i,e,t,n,s,r,o,a)=>{let c=null;return class bh{constructor(u){if(s===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:h,numberOfChannels:d,sampleRate:p}={...Lf,...u};c===null&&(c=new s(1,1,44100));const _=n!==null&&e(r,r)?new n({length:h,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,h,p);if(_.numberOfChannels===0)throw t();return typeof _.copyFromChannel!="function"?(o(_),Zc(_)):e(mo,()=>mo(_))||a(_),i.add(_),_}static[Symbol.hasInstance](u){return u!==null&&typeof u=="object"&&Object.getPrototypeOf(u)===bh.prototype||i.has(u)}}},Jt=-34028234663852886e22,Wt=-Jt,ni=i=>Cs.has(i),Of={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},Uf=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...Of,...u},p=s(h,d),_=o(h),g=_?e():null;super(l,!1,p,g),this._audioBufferSourceNodeRenderer=g,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,_,p.playbackRate,Wt,Jt)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const u=typeof l=="function"?a(this,l):null;this._nativeAudioBufferSourceNode.onended=u;const h=this._nativeAudioBufferSourceNode.onended;this._onended=h!==null&&h===u?l:h}get playbackRate(){return this._playbackRate}start(l=0,u=0,h){if(this._nativeAudioBufferSourceNode.start(l,u,h),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=h===void 0?[l,u]:[l,u,h]),this.context.state!=="closed"){Rs(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),ni(this)&&fr(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},kf=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=zt(h,u);if(!d){const p={buffer:h.buffer,channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,loop:h.loop,loopEnd:h.loopEnd,loopStart:h.loopStart,playbackRate:h.playbackRate.value};h=e(u,p),o!==null&&h.start(...o),a!==null&&h.stop(a)}return r.set(u,h),d?await i(u,l.playbackRate,h.playbackRate):await n(u,l.playbackRate,h.playbackRate),await s(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},Bf=i=>"playbackRate"in i,Vf=i=>"frequency"in i&&"gain"in i,zf=i=>"offset"in i,Gf=i=>!("frequency"in i)&&"gain"in i,Hf=i=>"detune"in i&&"frequency"in i&&!("gain"in i),Wf=i=>"pan"in i,qt=i=>Cn(vh,i),pr=i=>Cn(xh,i),Ya=(i,e)=>{const{activeInputs:t}=qt(i);t.forEach(s=>s.forEach(([r])=>{e.includes(i)||Ya(r,[...e,i])}));const n=Bf(i)?[i.playbackRate]:Th(i)?Array.from(i.parameters.values()):Vf(i)?[i.Q,i.detune,i.frequency,i.gain]:zf(i)?[i.offset]:Gf(i)?[i.gain]:Hf(i)?[i.detune,i.frequency]:Wf(i)?[i.pan]:[];for(const s of n){const r=pr(s);r!==void 0&&r.activeInputs.forEach(([o])=>Ya(o,e))}ni(i)&&fr(i)},Eh=i=>{Ya(i.destination,[])},qf=i=>i===void 0||typeof i=="number"||typeof i=="string"&&(i==="balanced"||i==="interactive"||i==="playback"),Xf=(i,e,t,n,s,r,o,a,c)=>class extends i{constructor(u={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let h;try{h=new c(u)}catch(_){throw _.code===12&&_.message==="sampleRate is not in range"?t():_}if(h===null)throw n();if(!qf(u.latencyHint))throw new TypeError(`The provided value '${u.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(u.sampleRate!==void 0&&h.sampleRate!==u.sampleRate)throw t();super(h,2);const{latencyHint:d}=u,{sampleRate:p}=h;if(this._baseLatency=typeof h.baseLatency=="number"?h.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=h,c.name==="webkitAudioContext"?(this._nativeGainNode=h.createGain(),this._nativeOscillatorNode=h.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,h.state==="running"){this._state="suspended";const _=()=>{this._state==="suspended"&&(this._state=null),h.removeEventListener("statechange",_)};h.addEventListener("statechange",_)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),Eh(this)}))}createMediaElementSource(u){return new s(this,{mediaElement:u})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(u){return new o(this,{mediaStream:u})}createMediaStreamTrackSource(u){return new a(this,{mediaStreamTrack:u})}resume(){return this._state==="suspended"?new Promise((u,h)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?u():this.resume().then(u,h)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(u=>{throw u===void 0||u.code===15?e():u})}suspend(){return this._nativeAudioContext.suspend().catch(u=>{throw u===void 0?e():u})}},Yf=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d=o(h),p=s(h,u,d),_=d?e(a):null;super(l,!1,p,_),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},jf=i=>{const e=new WeakMap,t=async(n,s)=>{const r=s.destination;return e.set(s,r),await i(n,s,r),r};return{render(n,s){const r=e.get(s);return r!==void 0?Promise.resolve(r):t(n,s)}}},Zf=(i,e,t,n,s,r,o,a)=>(c,l)=>{const u=l.listener,h=()=>{const S=new Float32Array(1),M=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),E=o(l);let C=!1,x=[0,0,-1,0,1,0],y=[0,0,0];const R=()=>{if(C)return;C=!0;const V=n(l,256,9,0);V.onaudioprocess=({inputBuffer:U})=>{const L=[r(U,S,0),r(U,S,1),r(U,S,2),r(U,S,3),r(U,S,4),r(U,S,5)];L.some((j,$)=>j!==x[$])&&(u.setOrientation(...L),x=L);const q=[r(U,S,6),r(U,S,7),r(U,S,8)];q.some((j,$)=>j!==y[$])&&(u.setPosition(...q),y=q)},M.connect(V)},D=V=>U=>{U!==x[V]&&(x[V]=U,u.setOrientation(...x))},N=V=>U=>{U!==y[V]&&(y[V]=U,u.setPosition(...y))},k=(V,U,L)=>{const q=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:U});q.connect(M,0,V),q.start(),Object.defineProperty(q.offset,"defaultValue",{get(){return U}});const j=i({context:c},E,q.offset,Wt,Jt);return a(j,"value",$=>()=>$.call(j),$=>Q=>{try{$.call(j,Q)}catch(ve){if(ve.code!==9)throw ve}R(),E&&L(Q)}),j.cancelAndHoldAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.cancelAndHoldAtTime),j.cancelScheduledValues=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.cancelScheduledValues),j.exponentialRampToValueAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.exponentialRampToValueAtTime),j.linearRampToValueAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.linearRampToValueAtTime),j.setTargetAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.setTargetAtTime),j.setValueAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.setValueAtTime),j.setValueCurveAtTime=($=>E?()=>{throw s()}:(...Q)=>{const ve=$.apply(j,Q);return R(),ve})(j.setValueCurveAtTime),j};return{forwardX:k(0,0,D(0)),forwardY:k(1,0,D(1)),forwardZ:k(2,-1,D(2)),positionX:k(6,0,N(0)),positionY:k(7,0,N(1)),positionZ:k(8,0,N(2)),upX:k(3,0,D(3)),upY:k(4,1,D(4)),upZ:k(5,0,D(5))}},{forwardX:d,forwardY:p,forwardZ:_,positionX:g,positionY:m,positionZ:f,upX:T,upY:b,upZ:w}=u.forwardX===void 0?h():u;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return _},get positionX(){return g},get positionY(){return m},get positionZ(){return f},get upX(){return T},get upY(){return b},get upZ(){return w}}},_o=i=>"context"in i,mr=i=>_o(i[0]),ns=(i,e,t,n)=>{for(const s of i)if(t(s)){if(n)return!1;throw Error("The set contains at least one similar element.")}return i.add(e),!0},ou=(i,e,[t,n],s)=>{ns(i,[e,t,n],r=>r[0]===e&&r[1]===t,s)},au=(i,[e,t,n],s)=>{const r=i.get(e);r===void 0?i.set(e,new Set([[t,n]])):ns(r,[t,n],o=>o[0]===t,s)},ks=i=>"inputs"in i,go=(i,e,t,n)=>{if(ks(e)){const s=e.inputs[n];return i.connect(s,t,0),[s,t,0]}return i.connect(e,t,n),[e,t,n]},Ah=(i,e,t)=>{for(const n of i)if(n[0]===e&&n[1]===t)return i.delete(n),n;return null},$f=(i,e,t)=>Io(i,n=>n[0]===e&&n[1]===t),wh=(i,e)=>{if(!dr(i).delete(e))throw new Error("Missing the expected event listener.")},Ch=(i,e,t)=>{const n=Cn(i,e),s=Io(n,r=>r[0]===t);return n.size===0&&i.delete(e),s},vo=(i,e,t,n)=>{ks(e)?i.disconnect(e.inputs[n],t,0):i.disconnect(e,t,n)},gt=i=>Cn(Yc,i),sr=i=>Cn(jc,i),$i=i=>Ha.has(i),so=i=>!Cs.has(i),cu=(i,e)=>new Promise(t=>{if(e!==null)t(!0);else{const n=i.createScriptProcessor(256,1,1),s=i.createGain(),r=i.createBuffer(1,2,44100),o=r.getChannelData(0);o[0]=1,o[1]=1;const a=i.createBufferSource();a.buffer=r,a.loop=!0,a.connect(n).connect(i.destination),a.connect(s),a.disconnect(s),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,u=>u===1)?t(!0):t(!1),a.stop(),n.onaudioprocess=null,a.disconnect(n),n.disconnect(i.destination)},a.start()}}),oa=(i,e)=>{const t=new Map;for(const n of i)for(const s of n){const r=t.get(s);t.set(s,r===void 0?1:r+1)}t.forEach((n,s)=>e(s,n))},xo=i=>"context"in i,Kf=i=>{const e=new Map;i.connect=(t=>(n,s=0,r=0)=>{const o=xo(n)?t(n,s,r):t(n,s),a=e.get(n);return a===void 0?e.set(n,[{input:r,output:s}]):a.every(c=>c.input!==r||c.output!==s)&&a.push({input:r,output:s}),o})(i.connect.bind(i)),i.disconnect=(t=>(n,s,r)=>{if(t.apply(i),n===void 0)e.clear();else if(typeof n=="number")for(const[o,a]of e){const c=a.filter(l=>l.output!==n);c.length===0?e.delete(o):e.set(o,c)}else if(e.has(n))if(s===void 0)e.delete(n);else{const o=e.get(n);if(o!==void 0){const a=o.filter(c=>c.output!==s&&(c.input!==r||r===void 0));a.length===0?e.delete(n):e.set(n,a)}}for(const[o,a]of e)a.forEach(c=>{xo(o)?i.connect(o,c.output,c.input):i.connect(o,c.output)})})(i.disconnect)},Jf=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=pr(e),{outputs:o}=qt(i),a=dr(i),c=l=>{const u=gt(i),h=sr(e);if(l){const d=Ch(r,i,t);ou(s,i,d,!1),!n&&!$i(i)&&u.connect(h,t)}else{const d=$f(s,i,t);au(r,d,!1),!n&&!$i(i)&&u.disconnect(h,t)}};return ns(o,[e,t],l=>l[0]===e&&l[1]===t,!0)?(a.add(c),ni(i)?ou(s,i,[t,c],!0):au(r,[i,t,c],!0),!0):!1},Qf=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=qt(e),o=Ah(s[n],i,t);return o===null?[Mh(r,i,t,n)[2],!1]:[o[2],!0]},ep=(i,e,t)=>{const{activeInputs:n,passiveInputs:s}=pr(e),r=Ah(n,i,t);return r===null?[Ch(s,i,t)[1],!1]:[r[2],!0]},$c=(i,e,t,n,s)=>{const[r,o]=Qf(i,t,n,s);if(r!==null&&(wh(i,r),o&&!e&&!$i(i)&&vo(gt(i),gt(t),n,s)),ni(t)){const{activeInputs:a}=qt(t);Xa(t,a)}},Kc=(i,e,t,n)=>{const[s,r]=ep(i,t,n);s!==null&&(wh(i,s),r&&!e&&!$i(i)&&gt(i).disconnect(sr(t),n))},tp=(i,e)=>{const t=qt(i),n=[];for(const s of t.outputs)mr(s)?$c(i,e,...s):Kc(i,e,...s),n.push(s[0]);return t.outputs.clear(),n},np=(i,e,t)=>{const n=qt(i),s=[];for(const r of n.outputs)r[1]===t&&(mr(r)?$c(i,e,...r):Kc(i,e,...r),s.push(r[0]),n.outputs.delete(r));return s},ip=(i,e,t,n,s)=>{const r=qt(i);return Array.from(r.outputs).filter(o=>o[0]===t&&(n===void 0||o[1]===n)&&(s===void 0||o[2]===s)).map(o=>(mr(o)?$c(i,e,...o):Kc(i,e,...o),r.outputs.delete(o),o[0]))},sp=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g)=>class extends l{constructor(f,T,b,w){super(b),this._context=f,this._nativeAudioNode=b;const S=u(f);h(S)&&t(cu,()=>cu(S,g))!==!0&&Kf(b),Yc.set(this,b),Sh.set(this,new Set),f.state!=="closed"&&T&&Rs(this),i(this,w,b)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(f){this._nativeAudioNode.channelCount=f}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(f){this._nativeAudioNode.channelCountMode=f}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(f){this._nativeAudioNode.channelInterpretation=f}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(f,T=0,b=0){if(T<0||T>=this._nativeAudioNode.numberOfOutputs)throw s();const w=u(this._context),S=_(w);if(d(f)||p(f))throw r();if(_o(f)){const C=gt(f);try{const y=go(this._nativeAudioNode,C,T,b),R=so(this);(S||R)&&this._nativeAudioNode.disconnect(...y),this.context.state!=="closed"&&!R&&so(f)&&Rs(f)}catch(y){throw y.code===12?r():y}if(e(this,f,T,b,S)){const y=c([this],f);oa(y,n(S))}return f}const M=sr(f);if(M.name==="playbackRate"&&M.maxValue===1024)throw o();try{this._nativeAudioNode.connect(M,T),(S||so(this))&&this._nativeAudioNode.disconnect(M,T)}catch(C){throw C.code===12?r():C}if(Jf(this,f,T,S)){const C=c([this],f);oa(C,n(S))}}disconnect(f,T,b){let w;const S=u(this._context),M=_(S);if(f===void 0)w=tp(this,M);else if(typeof f=="number"){if(f<0||f>=this.numberOfOutputs)throw s();w=np(this,M,f)}else{if(T!==void 0&&(T<0||T>=this.numberOfOutputs)||_o(f)&&b!==void 0&&(b<0||b>=f.numberOfInputs))throw s();if(w=ip(this,M,f,T,b),w.length===0)throw r()}for(const E of w){const C=c([this],E);oa(C,a)}}},rp=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>(p,_,g,m=null,f=null)=>{const T=g.value,b=new mf(T),w=_?n(b):null,S={get defaultValue(){return T},get maxValue(){return m===null?g.maxValue:m},get minValue(){return f===null?g.minValue:f},get value(){return g.value},set value(M){g.value=M,S.setValueAtTime(M,p.context.currentTime)},cancelAndHoldAtTime(M){if(typeof g.cancelAndHoldAtTime=="function")w===null&&b.flush(p.context.currentTime),b.add(s(M)),g.cancelAndHoldAtTime(M);else{const E=Array.from(b).pop();w===null&&b.flush(p.context.currentTime),b.add(s(M));const C=Array.from(b).pop();g.cancelScheduledValues(M),E!==C&&C!==void 0&&(C.type==="exponentialRampToValue"?g.exponentialRampToValueAtTime(C.value,C.endTime):C.type==="linearRampToValue"?g.linearRampToValueAtTime(C.value,C.endTime):C.type==="setValue"?g.setValueAtTime(C.value,C.startTime):C.type==="setValueCurve"&&g.setValueCurveAtTime(C.values,C.startTime,C.duration))}return S},cancelScheduledValues(M){return w===null&&b.flush(p.context.currentTime),b.add(r(M)),g.cancelScheduledValues(M),S},exponentialRampToValueAtTime(M,E){if(M===0)throw new RangeError;if(!Number.isFinite(E)||E<0)throw new RangeError;const C=p.context.currentTime;return w===null&&b.flush(C),Array.from(b).length===0&&(b.add(l(T,C)),g.setValueAtTime(T,C)),b.add(o(M,E)),g.exponentialRampToValueAtTime(M,E),S},linearRampToValueAtTime(M,E){const C=p.context.currentTime;return w===null&&b.flush(C),Array.from(b).length===0&&(b.add(l(T,C)),g.setValueAtTime(T,C)),b.add(a(M,E)),g.linearRampToValueAtTime(M,E),S},setTargetAtTime(M,E,C){return w===null&&b.flush(p.context.currentTime),b.add(c(M,E,C)),g.setTargetAtTime(M,E,C),S},setValueAtTime(M,E){return w===null&&b.flush(p.context.currentTime),b.add(l(M,E)),g.setValueAtTime(M,E),S},setValueCurveAtTime(M,E,C){const x=M instanceof Float32Array?M:new Float32Array(M);if(h!==null&&h.name==="webkitAudioContext"){const y=E+C,R=p.context.sampleRate,D=Math.ceil(E*R),N=Math.floor(y*R),k=N-D,V=new Float32Array(k);for(let L=0;L<k;L+=1){const q=(x.length-1)/C*((D+L)/R-E),j=Math.floor(q),$=Math.ceil(q);V[L]=j===$?x[j]:(1-(q-j))*x[j]+(1-($-q))*x[$]}w===null&&b.flush(p.context.currentTime),b.add(u(V,E,C)),g.setValueCurveAtTime(V,E,C);const U=N/R;U<y&&d(S,V[V.length-1],U),d(S,x[x.length-1],y)}else w===null&&b.flush(p.context.currentTime),b.add(u(x,E,C)),g.setValueCurveAtTime(x,E,C);return S}};return t.set(S,g),e.set(S,p),i(S,w),S},op=i=>({replay(e){for(const t of i)if(t.type==="exponentialRampToValue"){const{endTime:n,value:s}=t;e.exponentialRampToValueAtTime(s,n)}else if(t.type==="linearRampToValue"){const{endTime:n,value:s}=t;e.linearRampToValueAtTime(s,n)}else if(t.type==="setTarget"){const{startTime:n,target:s,timeConstant:r}=t;e.setTargetAtTime(s,n,r)}else if(t.type==="setValue"){const{startTime:n,value:s}=t;e.setValueAtTime(s,n)}else if(t.type==="setValueCurve"){const{duration:n,startTime:s,values:r}=t;e.setValueCurveAtTime(r,s,n)}else throw new Error("Can't apply an unknown automation.")}});class Rh{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((n,s)=>e.call(t,n,s,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const ap={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},cp=(i,e,t,n,s,r,o,a,c,l,u,h,d,p)=>class extends e{constructor(g,m,f){var T;const b=a(g),w=c(b),S=u({...ap,...f});d(S);const M=Wa.get(b),E=M?.get(m),C=w||b.state!=="closed"?b:(T=o(b))!==null&&T!==void 0?T:b,x=s(C,w?null:g.baseLatency,l,m,E,S),y=w?n(m,S,E):null;super(g,!0,x,y);const R=[];x.parameters.forEach((N,k)=>{const V=t(this,w,N);R.push([k,V])}),this._nativeAudioWorkletNode=x,this._onprocessorerror=null,this._parameters=new Rh(R),w&&i(b,this);const{activeInputs:D}=r(this);h(x,D)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(g){const m=typeof g=="function"?p(this,g):null;this._nativeAudioWorkletNode.onprocessorerror=m;const f=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=f!==null&&f===m?g:f}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function So(i,e,t,n,s){if(typeof i.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),i.copyFromChannel(e[t],n,s);else{const r=i.getChannelData(n);if(e[t].byteLength===0)e[t]=r.slice(s,s+128);else{const o=new Float32Array(r.buffer,s*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(o)}}}const Ph=(i,e,t,n,s)=>{typeof i.copyToChannel=="function"?e[t].byteLength!==0&&i.copyToChannel(e[t],n,s):e[t].byteLength!==0&&i.getChannelData(n).set(e[t],s)},yo=(i,e)=>{const t=[];for(let n=0;n<i;n+=1){const s=[],r=typeof e=="number"?e:e[n];for(let o=0;o<r;o+=1)s.push(new Float32Array(128));t.push(s)}return t},lp=(i,e)=>{const t=Cn(qa,i),n=gt(e);return Cn(t,n)},up=async(i,e,t,n,s,r,o)=>{const a=e===null?Math.ceil(i.context.length/128)*128:e.length,c=n.channelCount*n.numberOfInputs,l=s.reduce((m,f)=>m+f,0),u=l===0?null:t.createBuffer(l,a,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const h=qt(i),d=await lp(t,i),p=yo(n.numberOfInputs,n.channelCount),_=yo(n.numberOfOutputs,s),g=Array.from(i.parameters.keys()).reduce((m,f)=>({...m,[f]:new Float32Array(128)}),{});for(let m=0;m<a;m+=128){if(n.numberOfInputs>0&&e!==null)for(let f=0;f<n.numberOfInputs;f+=1)for(let T=0;T<n.channelCount;T+=1)So(e,p[f],T,T,m);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:f},T)=>{So(e,g,f,c+T,m)});for(let f=0;f<n.numberOfInputs;f+=1)for(let T=0;T<s[f];T+=1)_[f][T].byteLength===0&&(_[f][T]=new Float32Array(128));try{const f=p.map((b,w)=>h.activeInputs[w].size===0?[]:b),T=o(m/t.sampleRate,t.sampleRate,()=>d.process(f,_,g));if(u!==null)for(let b=0,w=0;b<n.numberOfOutputs;b+=1){for(let S=0;S<s[b];S+=1)Ph(u,_[b],S,w+S,m);w+=s[b]}if(!T)break}catch(f){i.dispatchEvent(new ErrorEvent("processorerror",{colno:f.colno,filename:f.filename,lineno:f.lineno,message:f.message}));break}}return u},hp=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g)=>(m,f,T)=>{const b=new WeakMap;let w=null;const S=async(M,E)=>{let C=u(M),x=null;const y=zt(C,E),R=Array.isArray(f.outputChannelCount)?f.outputChannelCount:Array.from(f.outputChannelCount);if(h===null){const D=R.reduce((U,L)=>U+L,0),N=s(E,{channelCount:Math.max(1,D),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,D)}),k=[];for(let U=0;U<M.numberOfOutputs;U+=1)k.push(n(E,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:R[U]}));const V=o(E,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1});V.connect=e.bind(null,k),V.disconnect=c.bind(null,k),x=[N,k,V]}else y||(C=new h(E,m));if(b.set(E,x===null?C:x[2]),x!==null){if(w===null){if(T===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const L=M.channelCount*M.numberOfInputs,q=T.parameterDescriptors===void 0?0:T.parameterDescriptors.length,j=L+q;w=up(M,j===0?null:await(async()=>{const Q=new d(j,Math.ceil(M.context.length/128)*128,E.sampleRate),ve=[],we=[];for(let X=0;X<f.numberOfInputs;X+=1)ve.push(o(Q,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1})),we.push(s(Q,{channelCount:f.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:f.channelCount}));const Ye=await Promise.all(Array.from(M.parameters.values()).map(async X=>{const J=r(Q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:X.value});return await p(Q,X,J.offset),J})),ye=n(Q,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,L+q)});for(let X=0;X<f.numberOfInputs;X+=1){ve[X].connect(we[X]);for(let J=0;J<f.channelCount;J+=1)we[X].connect(ye,J,X*f.channelCount+J)}for(const[X,J]of Ye.entries())J.connect(ye,0,L+X),J.start(0);return ye.connect(Q.destination),await Promise.all(ve.map(X=>_(M,Q,X))),g(Q)})(),E,f,R,T,l)}const D=await w,N=t(E,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[k,V,U]=x;D!==null&&(N.buffer=D,N.start(0)),N.connect(k);for(let L=0,q=0;L<M.numberOfOutputs;L+=1){const j=V[L];for(let $=0;$<R[L];$+=1)k.connect(j,q+$,$);q+=R[L]}return U}if(y)for(const[D,N]of M.parameters.entries())await i(E,N,C.parameters.get(D));else for(const[D,N]of M.parameters.entries())await p(E,N,C.parameters.get(D));return await _(M,E,C),C};return{render(M,E){a(E,M);const C=b.get(E);return C!==void 0?Promise.resolve(C):S(M,E)}}},dp=(i,e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m,f,T,b)=>class extends _{constructor(S,M){super(S,M),this._nativeContext=S,this._audioWorklet=i===void 0?void 0:{addModule:(E,C)=>i(this,E,C)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new s(this)}createBuffer(S,M,E){return new t({length:M,numberOfChannels:S,sampleRate:E})}createBufferSource(){return new n(this)}createChannelMerger(S=6){return new r(this,{numberOfInputs:S})}createChannelSplitter(S=6){return new o(this,{numberOfOutputs:S})}createConstantSource(){return new a(this)}createConvolver(){return new c(this)}createDelay(S=1){return new u(this,{maxDelayTime:S})}createDynamicsCompressor(){return new h(this)}createGain(){return new d(this)}createIIRFilter(S,M){return new p(this,{feedback:M,feedforward:S})}createOscillator(){return new g(this)}createPanner(){return new m(this)}createPeriodicWave(S,M,E={disableNormalization:!1}){return new f(this,{...E,imag:M,real:S})}createStereoPanner(){return new T(this)}createWaveShaper(){return new b(this)}decodeAudioData(S,M,E){return l(this._nativeContext,S).then(C=>(typeof M=="function"&&M(C),C),C=>{throw typeof E=="function"&&E(C),C})}},fp={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},pp=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...fp,...u},p=s(h,d),_=o(h),g=_?t():null;super(l,!1,p,g),this._Q=e(this,_,p.Q,Wt,Jt),this._detune=e(this,_,p.detune,1200*Math.log2(Wt),-1200*Math.log2(Wt)),this._frequency=e(this,_,p.frequency,l.sampleRate/2,0),this._gain=e(this,_,p.gain,40*Math.log10(Wt),Jt),this._nativeBiquadFilterNode=p,a(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,u,h){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,u,h)}catch(d){throw d.code===11?n():d}if(l.length!==u.length||u.length!==h.length)throw n()}},mp=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=zt(l,c);if(!u){const h={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,h)}return r.set(c,l),u?(await i(c,a.Q,l.Q),await i(c,a.detune,l.detune),await i(c,a.frequency,l.frequency),await i(c,a.gain,l.gain)):(await n(c,a.Q,l.Q),await n(c,a.detune,l.detune),await n(c,a.frequency,l.frequency),await n(c,a.gain,l.gain)),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},_p=(i,e)=>(t,n)=>{const s=e.get(t);if(s!==void 0)return s;const r=i.get(t);if(r!==void 0)return r;try{const o=n();return o instanceof Promise?(i.set(t,o),o.catch(()=>!1).then(a=>(i.delete(t),e.set(t,a),a))):(e.set(t,o),o)}catch{return e.set(t,!1),!1}},gp={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},vp=(i,e,t,n,s)=>class extends i{constructor(o,a){const c=n(o),l={...gp,...a},u=t(c,l),h=s(c)?e():null;super(o,!1,u,h)}},xp=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!zt(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfInputs:a.numberOfInputs};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},Sp={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},yp=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u=r({...Sp,...c}),h=t(l,u),d=s(l)?e():null;super(a,!1,h,d)}},Mp=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!zt(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,numberOfOutputs:a.numberOfOutputs};a=i(o,l)}return n.set(o,a),await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},Tp=i=>(e,t,n)=>i(t,e,n),bp=i=>(e,t,n=0,s=0)=>{const r=e[n];if(r===void 0)throw i();return xo(t)?r.connect(t,0,s):r.connect(t,0)},Ep=i=>(e,t)=>{const n=i(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),s=e.createBuffer(1,2,44100);return n.buffer=s,n.loop=!0,n.connect(t),n.start(),()=>{n.stop(),n.disconnect(t)}},Ap={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},wp=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...Ap,...l},d=n(u,h),p=r(u),_=p?t():null;super(c,!1,d,_),this._constantSourceNodeRenderer=_,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Wt,Jt),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeConstantSourceNode.onended=l;const u=this._nativeConstantSourceNode.onended;this._onended=u!==null&&u===l?c:u}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){Rs(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),ni(this)&&fr(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},Cp=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null;const c=async(l,u)=>{let h=t(l);const d=zt(h,u);if(!d){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,offset:h.offset.value};h=e(u,p),o!==null&&h.start(o),a!==null&&h.stop(a)}return r.set(u,h),d?await i(u,l.offset,h.offset):await n(u,l.offset,h.offset),await s(l,u,h),h};return{set start(l){o=l},set stop(l){a=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},Rp=i=>e=>(i[0]=e,i[0]),Pp={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},Dp=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u={...Pp,...c},h=t(l,u),p=s(l)?e():null;super(a,!1,h,p),this._isBufferNullified=!1,this._nativeConvolverNode=h,u.buffer!==null&&r(this,u.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(a){if(this._nativeConvolverNode.buffer=a,a===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(a){this._nativeConvolverNode.normalize=a}},Ip=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!zt(a,o)){const l={buffer:a.buffer,channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,disableNormalization:!a.normalize};a=i(o,l)}return n.set(o,a),ks(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},Np=(i,e)=>(t,n,s)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,n,s)}catch(r){throw r.name==="SyntaxError"?i():r}},Lp=()=>new DOMException("","DataCloneError"),lu=i=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(n=>{const s=()=>{t.onmessage=null,e.close(),t.close(),n()};t.onmessage=()=>s();try{e.postMessage(i,[i])}catch{}finally{s()}})},Fp=(i,e,t,n,s,r,o,a,c,l,u)=>(h,d)=>{const p=o(h)?h:r(h);if(s.has(d)){const _=t();return Promise.reject(_)}try{s.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(_=>(lu(d).catch(()=>{}),e(a,()=>a(_))||u(_),i.add(_),_)):new Promise((_,g)=>{const m=async()=>{try{await lu(d)}catch{}},f=T=>{g(T),m()};try{p.decodeAudioData(d,T=>{typeof T.copyFromChannel!="function"&&(l(T),Zc(T)),i.add(T),m().then(()=>_(T))},T=>{f(T===null?n():T)})}catch(T){f(T)}})},Op=(i,e,t,n,s,r,o,a)=>(c,l)=>{const u=e.get(c);if(u===void 0)throw new Error("Missing the expected cycle count.");const h=r(c.context),d=a(h);if(u===l){if(e.delete(c),!d&&o(c)){const p=n(c),{outputs:_}=t(c);for(const g of _)if(mr(g)){const m=n(g[0]);i(p,m,g[1],g[2])}else{const m=s(g[0]);p.connect(m,g[1])}}}else e.set(c,u-l)},Up={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},kp=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...Up,...l},d=n(u,h),p=r(u),_=p?t(h.maxDelayTime):null;super(c,!1,d,_),this._delayTime=e(this,p,d.delayTime),o(this,h.maxDelayTime)}get delayTime(){return this._delayTime}},Bp=(i,e,t,n,s)=>r=>{const o=new WeakMap,a=async(c,l)=>{let u=t(c);const h=zt(u,l);if(!h){const d={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,delayTime:u.delayTime.value,maxDelayTime:r};u=e(l,d)}return o.set(l,u),h?await i(l,c.delayTime,u.delayTime):await n(l,c.delayTime,u.delayTime),await s(c,l,u),u};return{render(c,l){const u=o.get(l);return u!==void 0?Promise.resolve(u):a(c,l)}}},Vp=i=>(e,t,n,s)=>i(e[s],r=>r[0]===t&&r[1]===n),zp=i=>(e,t)=>{i(e).delete(t)},Gp=i=>"delayTime"in i,Hp=(i,e,t)=>function n(s,r){const o=_o(r)?r:t(i,r);if(Gp(o))return[];if(s[0]===o)return[s];if(s.includes(o))return[];const{outputs:a}=e(o);return Array.from(a).map(c=>n([...s,o],c[0])).reduce((c,l)=>c.concat(l),[])},Ir=(i,e,t)=>{const n=e[t];if(n===void 0)throw i();return n},Wp=i=>(e,t=void 0,n=void 0,s=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Ir(i,e,t).disconnect():xo(t)?n===void 0?e.forEach(r=>r.disconnect(t)):s===void 0?Ir(i,e,n).disconnect(t,0):Ir(i,e,n).disconnect(t,0,s):n===void 0?e.forEach(r=>r.disconnect(t)):Ir(i,e,n).disconnect(t,0),qp={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Xp=(i,e,t,n,s,r,o,a)=>class extends i{constructor(l,u){const h=r(l),d={...qp,...u},p=n(h,d),_=o(h),g=_?t():null;super(l,!1,p,g),this._attack=e(this,_,p.attack),this._knee=e(this,_,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,_,p.ratio),this._release=e(this,_,p.release),this._threshold=e(this,_,p.threshold),a(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const u=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=u,s()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const u=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=u,s()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Yp=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=zt(l,c);if(!u){const h={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,h)}return r.set(c,l),u?(await i(c,a.attack,l.attack),await i(c,a.knee,l.knee),await i(c,a.ratio,l.ratio),await i(c,a.release,l.release),await i(c,a.threshold,l.threshold)):(await n(c,a.attack,l.attack),await n(c,a.knee,l.knee),await n(c,a.ratio,l.ratio),await n(c,a.release,l.release),await n(c,a.threshold,l.threshold)),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},jp=()=>new DOMException("","EncodingError"),Zp=i=>e=>new Promise((t,n)=>{if(i===null){n(new SyntaxError);return}const s=i.document.head;if(s===null)n(new SyntaxError);else{const r=i.document.createElement("script"),o=new Blob([e],{type:"application/javascript"}),a=URL.createObjectURL(o),c=i.onerror,l=()=>{i.onerror=c,URL.revokeObjectURL(a)};i.onerror=(u,h,d,p,_)=>{if(h===a||h===i.location.href&&d===1&&p===1)return l(),n(_),!1;if(c!==null)return c(u,h,d,p,_)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),t()},r.src=a,r.type="module",s.appendChild(r)}}),$p=i=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,n,s){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=i(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(t,r,s)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,n,s){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,s)}},Kp=i=>(e,t,n)=>{Object.defineProperties(i,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return n()}finally{i!==null&&(delete i.currentFrame,delete i.currentTime)}},Jp=i=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw i()},Qp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},em=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...Qp,...c},h=n(l,u),d=r(l),p=d?t():null;super(a,!1,h,p),this._gain=e(this,d,h.gain,Wt,Jt)}get gain(){return this._gain}},tm=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=zt(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,h)}return r.set(c,l),u?await i(c,a.gain,l.gain):await n(c,a.gain,l.gain),await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},nm=(i,e)=>t=>e(i,t),im=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},sm=i=>e=>{var t;return(t=i.get(e))!==null&&t!==void 0?t:0},rm=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},om=i=>e=>i.get(e),Ft=()=>new DOMException("","InvalidStateError"),am=i=>e=>{const t=i.get(e);if(t===void 0)throw Ft();return t},cm=(i,e)=>t=>{let n=i.get(t);if(n!==void 0)return n;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new e(1,1,44100),i.set(t,n),n},lm=i=>e=>{const t=i.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},No=()=>new DOMException("","InvalidAccessError"),um=i=>{i.getFrequencyResponse=(e=>(t,n,s)=>{if(t.length!==n.length||n.length!==s.length)throw No();return e.call(i,t,n,s)})(i.getFrequencyResponse)},hm={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},dm=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=n(a),u=s(l),h={...hm,...c},d=e(l,u?null:a.baseLatency,h),p=u?t(h.feedback,h.feedforward):null;super(a,!1,d,p),um(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(a,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(a,c,l)}},Dh=(i,e,t,n,s,r,o,a,c,l,u)=>{const h=l.length;let d=a;for(let p=0;p<h;p+=1){let _=t[0]*l[p];for(let g=1;g<s;g+=1){const m=d-g&c-1;_+=t[g]*r[m],_-=i[g]*o[m]}for(let g=s;g<n;g+=1)_+=t[g]*r[d-g&c-1];for(let g=s;g<e;g+=1)_-=i[g]*o[d-g&c-1];r[d]=l[p],o[d]=_,d=d+1&c-1,u[p]=_}return d},fm=(i,e,t,n)=>{const s=t instanceof Float64Array?t:new Float64Array(t),r=n instanceof Float64Array?n:new Float64Array(n),o=s.length,a=r.length,c=Math.min(o,a);if(s[0]!==1){for(let _=0;_<o;_+=1)r[_]/=s[0];for(let _=1;_<a;_+=1)s[_]/=s[0]}const l=32,u=new Float32Array(l),h=new Float32Array(l),d=e.createBuffer(i.numberOfChannels,i.length,i.sampleRate),p=i.numberOfChannels;for(let _=0;_<p;_+=1){const g=i.getChannelData(_),m=d.getChannelData(_);u.fill(0),h.fill(0),Dh(s,o,r,a,c,u,h,0,l,g,m)}return d},pm=(i,e,t,n,s)=>(r,o)=>{const a=new WeakMap;let c=null;const l=async(u,h)=>{let d=null,p=e(u);const _=zt(p,h);if(h.createIIRFilter===void 0?d=i(h,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):_||(p=h.createIIRFilter(o,r)),a.set(h,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const m=new t(u.context.destination.channelCount,u.context.length,h.sampleRate);c=(async()=>{await n(u,m,m.destination);const f=await s(m);return fm(f,h,r,o)})()}const g=await c;return d.buffer=g,d.start(0),d}return await n(u,h,p),p};return{render(u,h){const d=a.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},mm=(i,e,t,n,s,r)=>o=>(a,c)=>{const l=i.get(a);if(l===void 0){if(!o&&r(a)){const u=n(a),{outputs:h}=t(a);for(const d of h)if(mr(d)){const p=n(d[0]);e(u,p,d[1],d[2])}else{const p=s(d[0]);u.disconnect(p,d[1])}}i.set(a,c)}else i.set(a,l+c)},_m=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},gm=(i,e)=>t=>i.has(t)||e(t),vm=(i,e)=>t=>i.has(t)||e(t),xm=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},Sm=i=>e=>i!==null&&e instanceof i,ym=i=>e=>i!==null&&typeof i.AudioNode=="function"&&e instanceof i.AudioNode,Mm=i=>e=>i!==null&&typeof i.AudioParam=="function"&&e instanceof i.AudioParam,Tm=(i,e)=>t=>i(t)||e(t),bm=i=>e=>i!==null&&e instanceof i,Em=i=>i!==null&&i.isSecureContext,Am=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},wm={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},Cm=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r);if(n(a))throw new TypeError;const c={...wm,...o},l=e(a,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},Rm=(i,e,t,n)=>class extends i{constructor(r,o){const a=t(r),c=e(a,o);if(n(a))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},Pm=(i,e,t)=>class extends i{constructor(s,r){const o=t(s),a=e(o,r);super(s,!0,a,null)}},Dm=(i,e,t,n,s,r)=>class extends t{constructor(a,c){super(a),this._nativeContext=a,Do.set(this,a),n(a)&&s.set(a,new Set),this._destination=new i(this,c),this._listener=e(this,a),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(a){const c=typeof a=="function"?r(this,a):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?a:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},rr=i=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=i.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},Im=(i,e)=>(t,n,s)=>{const r=new Set;return t.connect=(o=>(a,c=0,l=0)=>{const u=r.size===0;if(e(a))return o.call(t,a,c,l),i(r,[a,c,l],h=>h[0]===a&&h[1]===c&&h[2]===l,!0),u&&n(),a;o.call(t,a,c),i(r,[a,c],h=>h[0]===a&&h[1]===c,!0),u&&n()})(t.connect),t.disconnect=(o=>(a,c,l)=>{const u=r.size>0;if(a===void 0)o.apply(t),r.clear();else if(typeof a=="number"){o.call(t,a);for(const d of r)d[1]===a&&r.delete(d)}else{e(a)?o.call(t,a,c,l):o.call(t,a,c);for(const d of r)d[0]===a&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const h=r.size===0;u&&h&&s()})(t.disconnect),t},xt=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t]&&(i[t]=n)},Dt=(i,e)=>{xt(i,e,"channelCount"),xt(i,e,"channelCountMode"),xt(i,e,"channelInterpretation")},uu=i=>typeof i.getFloatTimeDomainData=="function",Nm=i=>{i.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);i.getByteTimeDomainData(t);const n=Math.max(t.length,i.fftSize);for(let s=0;s<n;s+=1)e[s]=(t[s]-128)*.0078125;return e}},Lm=(i,e)=>(t,n)=>{const s=t.createAnalyser();if(Dt(s,n),!(n.maxDecibels>n.minDecibels))throw e();return xt(s,n,"fftSize"),xt(s,n,"maxDecibels"),xt(s,n,"minDecibels"),xt(s,n,"smoothingTimeConstant"),i(uu,()=>uu(s))||Nm(s),s},Fm=i=>i===null?null:i.hasOwnProperty("AudioBuffer")?i.AudioBuffer:null,Tt=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t].value&&(i[t].value=n)},Om=i=>{i.start=(e=>{let t=!1;return(n=0,s=0,r)=>{if(t)throw Ft();e.call(i,n,s,r),t=!0}})(i.start)},Jc=i=>{i.start=(e=>(t=0,n=0,s)=>{if(typeof s=="number"&&s<0||n<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(i,t,n,s)})(i.start)},Qc=i=>{i.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(i,t)})(i.stop)},Um=(i,e,t,n,s,r,o,a,c,l,u)=>(h,d)=>{const p=h.createBufferSource();return Dt(p,d),Tt(p,d,"playbackRate"),xt(p,d,"buffer"),xt(p,d,"loop"),xt(p,d,"loopEnd"),xt(p,d,"loopStart"),e(t,()=>t(h))||Om(p),e(n,()=>n(h))||c(p),e(s,()=>s(h))||l(p,h),e(r,()=>r(h))||Jc(p),e(o,()=>o(h))||u(p,h),e(a,()=>a(h))||Qc(p),i(h,p),p},km=i=>i===null?null:i.hasOwnProperty("AudioContext")?i.AudioContext:i.hasOwnProperty("webkitAudioContext")?i.webkitAudioContext:null,Bm=(i,e)=>(t,n,s)=>{const r=t.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}s&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const o=i(t,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(o,"channelCount",a=>()=>a.call(o),a=>c=>{a.call(o,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(o,"channelCountMode",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelCountMode=c}),e(o,"channelInterpretation",a=>()=>a.call(o),a=>c=>{a.call(o,c),r.channelInterpretation=c}),Object.defineProperty(o,"maxChannelCount",{get:()=>r.maxChannelCount}),o.connect(r),o},Vm=i=>i===null?null:i.hasOwnProperty("AudioWorkletNode")?i.AudioWorkletNode:null,zm=i=>{const{port1:e}=new MessageChannel;try{e.postMessage(i)}finally{e.close()}},Gm=(i,e,t,n,s)=>(r,o,a,c,l,u)=>{if(a!==null)try{const h=new a(r,c,u),d=new Map;let p=null;if(Object.defineProperties(h,{channelCount:{get:()=>u.channelCount,set:()=>{throw i()}},channelCountMode:{get:()=>"explicit",set:()=>{throw i()}},onprocessorerror:{get:()=>p,set:_=>{typeof p=="function"&&h.removeEventListener("processorerror",p),p=typeof _=="function"?_:null,typeof p=="function"&&h.addEventListener("processorerror",p)}}}),h.addEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=typeof g[1]=="function"?g[1]:typeof g[1]=="object"&&g[1]!==null&&typeof g[1].handleEvent=="function"?g[1].handleEvent:null;if(m!==null){const f=d.get(g[1]);f!==void 0?g[1]=f:(g[1]=T=>{T.type==="error"?(Object.defineProperties(T,{type:{value:"processorerror"}}),m(T)):m(new ErrorEvent(g[0],{...T}))},d.set(m,g[1]))}}return _.call(h,"error",g[1],g[2]),_.call(h,...g)})(h.addEventListener),h.removeEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=d.get(g[1]);m!==void 0&&(d.delete(g[1]),g[1]=m)}return _.call(h,"error",g[1],g[2]),_.call(h,g[0],g[1],g[2])})(h.removeEventListener),u.numberOfOutputs!==0){const _=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return h.connect(_).connect(r.destination),s(h,()=>_.disconnect(),()=>_.connect(r.destination))}return h}catch(h){throw h.code===11?n():h}if(l===void 0)throw n();return zm(u),e(r,o,l,u)},Ih=(i,e)=>i===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(i*e))))),Hm=i=>new Promise((e,t)=>{const{port1:n,port2:s}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),s.close(),e(r)},n.onmessageerror=({data:r})=>{n.close(),s.close(),t(r)},s.postMessage(i)}),Wm=async(i,e)=>{const t=await Hm(e);return new i(t)},qm=(i,e,t,n)=>{let s=qa.get(i);s===void 0&&(s=new WeakMap,qa.set(i,s));const r=Wm(t,n);return s.set(e,r),r},Xm=(i,e,t,n,s,r,o,a,c,l,u,h,d)=>(p,_,g,m)=>{if(m.numberOfInputs===0&&m.numberOfOutputs===0)throw c();const f=Array.isArray(m.outputChannelCount)?m.outputChannelCount:Array.from(m.outputChannelCount);if(f.some(ne=>ne<1))throw c();if(f.length!==m.numberOfOutputs)throw e();if(m.channelCountMode!=="explicit")throw c();const T=m.channelCount*m.numberOfInputs,b=f.reduce((ne,re)=>ne+re,0),w=g.parameterDescriptors===void 0?0:g.parameterDescriptors.length;if(T+w>6||b>6)throw c();const S=new MessageChannel,M=[],E=[];for(let ne=0;ne<m.numberOfInputs;ne+=1)M.push(o(p,{channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation,gain:1})),E.push(s(p,{channelCount:m.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:m.channelCount}));const C=[];if(g.parameterDescriptors!==void 0)for(const{defaultValue:ne,maxValue:re,minValue:ze,name:I}of g.parameterDescriptors){const Re=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:m.parameterData[I]!==void 0?m.parameterData[I]:ne===void 0?0:ne});Object.defineProperties(Re.offset,{defaultValue:{get:()=>ne===void 0?0:ne},maxValue:{get:()=>re===void 0?Wt:re},minValue:{get:()=>ze===void 0?Jt:ze}}),C.push(Re)}const x=n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,T+w)}),y=Ih(_,p.sampleRate),R=a(p,y,T+w,Math.max(1,b)),D=s(p,{channelCount:Math.max(1,b),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,b)}),N=[];for(let ne=0;ne<m.numberOfOutputs;ne+=1)N.push(n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:f[ne]}));for(let ne=0;ne<m.numberOfInputs;ne+=1){M[ne].connect(E[ne]);for(let re=0;re<m.channelCount;re+=1)E[ne].connect(x,re,ne*m.channelCount+re)}const k=new Rh(g.parameterDescriptors===void 0?[]:g.parameterDescriptors.map(({name:ne},re)=>{const ze=C[re];return ze.connect(x,0,T+re),ze.start(0),[ne,ze.offset]}));x.connect(R);let V=m.channelInterpretation,U=null;const L=m.numberOfOutputs===0?[R]:N,q={get bufferSize(){return y},get channelCount(){return m.channelCount},set channelCount(ne){throw t()},get channelCountMode(){return m.channelCountMode},set channelCountMode(ne){throw t()},get channelInterpretation(){return V},set channelInterpretation(ne){for(const re of M)re.channelInterpretation=ne;V=ne},get context(){return R.context},get inputs(){return M},get numberOfInputs(){return m.numberOfInputs},get numberOfOutputs(){return m.numberOfOutputs},get onprocessorerror(){return U},set onprocessorerror(ne){typeof U=="function"&&q.removeEventListener("processorerror",U),U=typeof ne=="function"?ne:null,typeof U=="function"&&q.addEventListener("processorerror",U)},get parameters(){return k},get port(){return S.port2},addEventListener(...ne){return R.addEventListener(ne[0],ne[1],ne[2])},connect:i.bind(null,L),disconnect:l.bind(null,L),dispatchEvent(...ne){return R.dispatchEvent(ne[0])},removeEventListener(...ne){return R.removeEventListener(ne[0],ne[1],ne[2])}},j=new Map;S.port1.addEventListener=(ne=>(...re)=>{if(re[0]==="message"){const ze=typeof re[1]=="function"?re[1]:typeof re[1]=="object"&&re[1]!==null&&typeof re[1].handleEvent=="function"?re[1].handleEvent:null;if(ze!==null){const I=j.get(re[1]);I!==void 0?re[1]=I:(re[1]=Re=>{u(p.currentTime,p.sampleRate,()=>ze(Re))},j.set(ze,re[1]))}}return ne.call(S.port1,re[0],re[1],re[2])})(S.port1.addEventListener),S.port1.removeEventListener=(ne=>(...re)=>{if(re[0]==="message"){const ze=j.get(re[1]);ze!==void 0&&(j.delete(re[1]),re[1]=ze)}return ne.call(S.port1,re[0],re[1],re[2])})(S.port1.removeEventListener);let $=null;Object.defineProperty(S.port1,"onmessage",{get:()=>$,set:ne=>{typeof $=="function"&&S.port1.removeEventListener("message",$),$=typeof ne=="function"?ne:null,typeof $=="function"&&(S.port1.addEventListener("message",$),S.port1.start())}}),g.prototype.port=S.port1;let Q=null;qm(p,q,g,m).then(ne=>Q=ne);const we=yo(m.numberOfInputs,m.channelCount),Ye=yo(m.numberOfOutputs,f),ye=g.parameterDescriptors===void 0?[]:g.parameterDescriptors.reduce((ne,{name:re})=>({...ne,[re]:new Float32Array(128)}),{});let X=!0;const J=()=>{m.numberOfOutputs>0&&R.disconnect(D);for(let ne=0,re=0;ne<m.numberOfOutputs;ne+=1){const ze=N[ne];for(let I=0;I<f[ne];I+=1)D.disconnect(ze,re+I,I);re+=f[ne]}},K=new Map;R.onaudioprocess=({inputBuffer:ne,outputBuffer:re})=>{if(Q!==null){const ze=h(q);for(let I=0;I<y;I+=128){for(let Re=0;Re<m.numberOfInputs;Re+=1)for(let Ce=0;Ce<m.channelCount;Ce+=1)So(ne,we[Re],Ce,Ce,I);g.parameterDescriptors!==void 0&&g.parameterDescriptors.forEach(({name:Re},Ce)=>{So(ne,ye,Re,T+Ce,I)});for(let Re=0;Re<m.numberOfInputs;Re+=1)for(let Ce=0;Ce<f[Re];Ce+=1)Ye[Re][Ce].byteLength===0&&(Ye[Re][Ce]=new Float32Array(128));try{const Re=we.map((We,_e)=>{if(ze[_e].size>0)return K.set(_e,y/128),We;const v=K.get(_e);return v===void 0?[]:(We.every(O=>O.every(Z=>Z===0))&&(v===1?K.delete(_e):K.set(_e,v-1)),We)});X=u(p.currentTime+I/p.sampleRate,p.sampleRate,()=>Q.process(Re,Ye,ye));for(let We=0,_e=0;We<m.numberOfOutputs;We+=1){for(let P=0;P<f[We];P+=1)Ph(re,Ye[We],P,_e+P,I);_e+=f[We]}}catch(Re){X=!1,q.dispatchEvent(new ErrorEvent("processorerror",{colno:Re.colno,filename:Re.filename,lineno:Re.lineno,message:Re.message}))}if(!X){for(let Re=0;Re<m.numberOfInputs;Re+=1){M[Re].disconnect(E[Re]);for(let Ce=0;Ce<m.channelCount;Ce+=1)E[I].disconnect(x,Ce,Re*m.channelCount+Ce)}if(g.parameterDescriptors!==void 0){const Re=g.parameterDescriptors.length;for(let Ce=0;Ce<Re;Ce+=1){const We=C[Ce];We.disconnect(x,0,T+Ce),We.stop()}}x.disconnect(R),R.onaudioprocess=null,Fe?J():_t();break}}}};let Fe=!1;const me=o(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),He=()=>R.connect(me).connect(p.destination),_t=()=>{R.disconnect(me),me.disconnect()},Ze=()=>{if(X){_t(),m.numberOfOutputs>0&&R.connect(D);for(let ne=0,re=0;ne<m.numberOfOutputs;ne+=1){const ze=N[ne];for(let I=0;I<f[ne];I+=1)D.connect(ze,re+I,I);re+=f[ne]}}Fe=!0},tt=()=>{X&&(He(),J()),Fe=!1};return He(),d(q,Ze,tt)},Nh=(i,e)=>{const t=i.createBiquadFilter();return Dt(t,e),Tt(t,e,"Q"),Tt(t,e,"detune"),Tt(t,e,"frequency"),Tt(t,e,"gain"),xt(t,e,"type"),t},Ym=(i,e)=>(t,n)=>{const s=t.createChannelMerger(n.numberOfInputs);return i!==null&&i.name==="webkitAudioContext"&&e(t,s),Dt(s,n),s},jm=i=>{const e=i.numberOfOutputs;Object.defineProperty(i,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw Ft()}}),Object.defineProperty(i,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw Ft()}}),Object.defineProperty(i,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw Ft()}})},_r=(i,e)=>{const t=i.createChannelSplitter(e.numberOfOutputs);return Dt(t,e),jm(t),t},Zm=(i,e,t,n,s)=>(r,o)=>{if(r.createConstantSource===void 0)return t(r,o);const a=r.createConstantSource();return Dt(a,o),Tt(a,o,"offset"),e(n,()=>n(r))||Jc(a),e(s,()=>s(r))||Qc(a),i(r,a),a},Bs=(i,e)=>(i.connect=e.connect.bind(e),i.disconnect=e.disconnect.bind(e),i),$m=(i,e,t,n)=>(s,{offset:r,...o})=>{const a=s.createBuffer(1,2,44100),c=e(s,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(s,{...o,gain:r}),u=a.getChannelData(0);u[0]=1,u[1]=1,c.buffer=a,c.loop=!0;const h={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(_){l.channelCount=_},get channelCountMode(){return l.channelCountMode},set channelCountMode(_){l.channelCountMode=_},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(_){l.channelInterpretation=_},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(_){c.onended=_},addEventListener(..._){return c.addEventListener(_[0],_[1],_[2])},dispatchEvent(..._){return c.dispatchEvent(_[0])},removeEventListener(..._){return c.removeEventListener(_[0],_[1],_[2])},start(_=0){c.start.call(c,_)},stop(_=0){c.stop.call(c,_)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return i(s,c),n(Bs(h,l),d,p)},Km=(i,e)=>(t,n)=>{const s=t.createConvolver();if(Dt(s,n),n.disableNormalization===s.normalize&&(s.normalize=!n.disableNormalization),xt(s,n,"buffer"),n.channelCount>2||(e(s,"channelCount",r=>()=>r.call(s),r=>o=>{if(o>2)throw i();return r.call(s,o)}),n.channelCountMode==="max"))throw i();return e(s,"channelCountMode",r=>()=>r.call(s),r=>o=>{if(o==="max")throw i();return r.call(s,o)}),s},Lh=(i,e)=>{const t=i.createDelay(e.maxDelayTime);return Dt(t,e),Tt(t,e,"delayTime"),t},Jm=i=>(e,t)=>{const n=e.createDynamicsCompressor();if(Dt(n,t),t.channelCount>2||t.channelCountMode==="max")throw i();return Tt(n,t,"attack"),Tt(n,t,"knee"),Tt(n,t,"ratio"),Tt(n,t,"release"),Tt(n,t,"threshold"),n},nn=(i,e)=>{const t=i.createGain();return Dt(t,e),Tt(t,e,"gain"),t},Qm=i=>(e,t,n)=>{if(e.createIIRFilter===void 0)return i(e,t,n);const s=e.createIIRFilter(n.feedforward,n.feedback);return Dt(s,n),s};function e_(i,e){const t=e[0]*e[0]+e[1]*e[1];return[(i[0]*e[0]+i[1]*e[1])/t,(i[1]*e[0]-i[0]*e[1])/t]}function t_(i,e){return[i[0]*e[0]-i[1]*e[1],i[0]*e[1]+i[1]*e[0]]}function hu(i,e){let t=[0,0];for(let n=i.length-1;n>=0;n-=1)t=t_(t,e),t[0]+=i[n];return t}const n_=(i,e,t,n)=>(s,r,{channelCount:o,channelCountMode:a,channelInterpretation:c,feedback:l,feedforward:u})=>{const h=Ih(r,s.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=u instanceof Float64Array?u:new Float64Array(u),_=d.length,g=p.length,m=Math.min(_,g);if(_===0||_>20)throw n();if(d[0]===0)throw e();if(g===0||g>20)throw n();if(p[0]===0)throw e();if(d[0]!==1){for(let C=0;C<g;C+=1)p[C]/=d[0];for(let C=1;C<_;C+=1)d[C]/=d[0]}const f=t(s,h,o,o);f.channelCount=o,f.channelCountMode=a,f.channelInterpretation=c;const T=32,b=[],w=[],S=[];for(let C=0;C<o;C+=1){b.push(0);const x=new Float32Array(T),y=new Float32Array(T);x.fill(0),y.fill(0),w.push(x),S.push(y)}f.onaudioprocess=C=>{const x=C.inputBuffer,y=C.outputBuffer,R=x.numberOfChannels;for(let D=0;D<R;D+=1){const N=x.getChannelData(D),k=y.getChannelData(D);b[D]=Dh(d,_,p,g,m,w[D],S[D],b[D],T,N,k)}};const M=s.sampleRate/2;return Bs({get bufferSize(){return h},get channelCount(){return f.channelCount},set channelCount(C){f.channelCount=C},get channelCountMode(){return f.channelCountMode},set channelCountMode(C){f.channelCountMode=C},get channelInterpretation(){return f.channelInterpretation},set channelInterpretation(C){f.channelInterpretation=C},get context(){return f.context},get inputs(){return[f]},get numberOfInputs(){return f.numberOfInputs},get numberOfOutputs(){return f.numberOfOutputs},addEventListener(...C){return f.addEventListener(C[0],C[1],C[2])},dispatchEvent(...C){return f.dispatchEvent(C[0])},getFrequencyResponse(C,x,y){if(C.length!==x.length||x.length!==y.length)throw i();const R=C.length;for(let D=0;D<R;D+=1){const N=-Math.PI*(C[D]/M),k=[Math.cos(N),Math.sin(N)],V=hu(p,k),U=hu(d,k),L=e_(V,U);x[D]=Math.sqrt(L[0]*L[0]+L[1]*L[1]),y[D]=Math.atan2(L[1],L[0])}},removeEventListener(...C){return f.removeEventListener(C[0],C[1],C[2])}},f)},i_=(i,e)=>i.createMediaElementSource(e.mediaElement),s_=(i,e)=>{const t=i.createMediaStreamDestination();return Dt(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},r_=(i,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,o)=>r.id<o.id?-1:r.id>o.id?1:0);const n=t.slice(0,1),s=i.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(s,"mediaStream",{value:e}),s},o_=(i,e)=>(t,{mediaStreamTrack:n})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(n);const s=new MediaStream([n]),r=t.createMediaStreamSource(s);if(n.kind!=="audio")throw i();if(e(t))throw new TypeError;return r},a_=i=>i===null?null:i.hasOwnProperty("OfflineAudioContext")?i.OfflineAudioContext:i.hasOwnProperty("webkitOfflineAudioContext")?i.webkitOfflineAudioContext:null,c_=(i,e,t,n,s,r)=>(o,a)=>{const c=o.createOscillator();return Dt(c,a),Tt(c,a,"detune"),Tt(c,a,"frequency"),a.periodicWave!==void 0?c.setPeriodicWave(a.periodicWave):xt(c,a,"type"),e(t,()=>t(o))||Jc(c),e(n,()=>n(o))||r(c,o),e(s,()=>s(o))||Qc(c),i(o,c),c},l_=i=>(e,t)=>{const n=e.createPanner();return n.orientationX===void 0?i(e,t):(Dt(n,t),Tt(n,t,"orientationX"),Tt(n,t,"orientationY"),Tt(n,t,"orientationZ"),Tt(n,t,"positionX"),Tt(n,t,"positionY"),Tt(n,t,"positionZ"),xt(n,t,"coneInnerAngle"),xt(n,t,"coneOuterAngle"),xt(n,t,"coneOuterGain"),xt(n,t,"distanceModel"),xt(n,t,"maxDistance"),xt(n,t,"panningModel"),xt(n,t,"refDistance"),xt(n,t,"rolloffFactor"),n)},u_=(i,e,t,n,s,r,o,a,c,l)=>(u,{coneInnerAngle:h,coneOuterAngle:d,coneOuterGain:p,distanceModel:_,maxDistance:g,orientationX:m,orientationY:f,orientationZ:T,panningModel:b,positionX:w,positionY:S,positionZ:M,refDistance:E,rolloffFactor:C,...x})=>{const y=u.createPanner();if(x.channelCount>2||x.channelCountMode==="max")throw o();Dt(y,x);const R={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},D=t(u,{...R,channelInterpretation:"speakers",numberOfInputs:6}),N=n(u,{...x,gain:1}),k=n(u,{...R,gain:1}),V=n(u,{...R,gain:0}),U=n(u,{...R,gain:0}),L=n(u,{...R,gain:0}),q=n(u,{...R,gain:0}),j=n(u,{...R,gain:0}),$=s(u,256,6,1),Q=r(u,{...R,curve:new Float32Array([1,1]),oversample:"none"});let ve=[m,f,T],we=[w,S,M];const Ye=new Float32Array(1);$.onaudioprocess=({inputBuffer:K})=>{const Fe=[c(K,Ye,0),c(K,Ye,1),c(K,Ye,2)];Fe.some((He,_t)=>He!==ve[_t])&&(y.setOrientation(...Fe),ve=Fe);const me=[c(K,Ye,3),c(K,Ye,4),c(K,Ye,5)];me.some((He,_t)=>He!==we[_t])&&(y.setPosition(...me),we=me)},Object.defineProperty(V.gain,"defaultValue",{get:()=>0}),Object.defineProperty(U.gain,"defaultValue",{get:()=>0}),Object.defineProperty(L.gain,"defaultValue",{get:()=>0}),Object.defineProperty(q.gain,"defaultValue",{get:()=>0}),Object.defineProperty(j.gain,"defaultValue",{get:()=>0});const ye={get bufferSize(){},get channelCount(){return y.channelCount},set channelCount(K){if(K>2)throw o();N.channelCount=K,y.channelCount=K},get channelCountMode(){return y.channelCountMode},set channelCountMode(K){if(K==="max")throw o();N.channelCountMode=K,y.channelCountMode=K},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(K){N.channelInterpretation=K,y.channelInterpretation=K},get coneInnerAngle(){return y.coneInnerAngle},set coneInnerAngle(K){y.coneInnerAngle=K},get coneOuterAngle(){return y.coneOuterAngle},set coneOuterAngle(K){y.coneOuterAngle=K},get coneOuterGain(){return y.coneOuterGain},set coneOuterGain(K){if(K<0||K>1)throw e();y.coneOuterGain=K},get context(){return y.context},get distanceModel(){return y.distanceModel},set distanceModel(K){y.distanceModel=K},get inputs(){return[N]},get maxDistance(){return y.maxDistance},set maxDistance(K){if(K<0)throw new RangeError;y.maxDistance=K},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},get orientationX(){return k.gain},get orientationY(){return V.gain},get orientationZ(){return U.gain},get panningModel(){return y.panningModel},set panningModel(K){y.panningModel=K},get positionX(){return L.gain},get positionY(){return q.gain},get positionZ(){return j.gain},get refDistance(){return y.refDistance},set refDistance(K){if(K<0)throw new RangeError;y.refDistance=K},get rolloffFactor(){return y.rolloffFactor},set rolloffFactor(K){if(K<0)throw new RangeError;y.rolloffFactor=K},addEventListener(...K){return N.addEventListener(K[0],K[1],K[2])},dispatchEvent(...K){return N.dispatchEvent(K[0])},removeEventListener(...K){return N.removeEventListener(K[0],K[1],K[2])}};h!==ye.coneInnerAngle&&(ye.coneInnerAngle=h),d!==ye.coneOuterAngle&&(ye.coneOuterAngle=d),p!==ye.coneOuterGain&&(ye.coneOuterGain=p),_!==ye.distanceModel&&(ye.distanceModel=_),g!==ye.maxDistance&&(ye.maxDistance=g),m!==ye.orientationX.value&&(ye.orientationX.value=m),f!==ye.orientationY.value&&(ye.orientationY.value=f),T!==ye.orientationZ.value&&(ye.orientationZ.value=T),b!==ye.panningModel&&(ye.panningModel=b),w!==ye.positionX.value&&(ye.positionX.value=w),S!==ye.positionY.value&&(ye.positionY.value=S),M!==ye.positionZ.value&&(ye.positionZ.value=M),E!==ye.refDistance&&(ye.refDistance=E),C!==ye.rolloffFactor&&(ye.rolloffFactor=C),(ve[0]!==1||ve[1]!==0||ve[2]!==0)&&y.setOrientation(...ve),(we[0]!==0||we[1]!==0||we[2]!==0)&&y.setPosition(...we);const X=()=>{N.connect(y),i(N,Q,0,0),Q.connect(k).connect(D,0,0),Q.connect(V).connect(D,0,1),Q.connect(U).connect(D,0,2),Q.connect(L).connect(D,0,3),Q.connect(q).connect(D,0,4),Q.connect(j).connect(D,0,5),D.connect($).connect(u.destination)},J=()=>{N.disconnect(y),a(N,Q,0,0),Q.disconnect(k),k.disconnect(D),Q.disconnect(V),V.disconnect(D),Q.disconnect(U),U.disconnect(D),Q.disconnect(L),L.disconnect(D),Q.disconnect(q),q.disconnect(D),Q.disconnect(j),j.disconnect(D),D.disconnect($),$.disconnect(u.destination)};return l(Bs(ye,y),X,J)},h_=i=>(e,{disableNormalization:t,imag:n,real:s})=>{const r=n instanceof Float32Array?n:new Float32Array(n),o=s instanceof Float32Array?s:new Float32Array(s),a=e.createPeriodicWave(o,r,{disableNormalization:t});if(Array.from(n).length<2)throw i();return a},gr=(i,e,t,n)=>i.createScriptProcessor(e,t,n),d_=(i,e)=>(t,n)=>{const s=n.channelCountMode;if(s==="clamped-max")throw e();if(t.createStereoPanner===void 0)return i(t,n);const r=t.createStereoPanner();return Dt(r,n),Tt(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>s,set:o=>{if(o!==s)throw e()}}),r},f_=(i,e,t,n,s,r)=>{const a=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},u={...l,oversample:"none"},h=(_,g,m,f)=>{const T=new Float32Array(16385),b=new Float32Array(16385);for(let x=0;x<16385;x+=1){const y=x/16384*c;T[x]=Math.cos(y),b[x]=Math.sin(y)}const w=t(_,{...l,gain:0}),S=n(_,{...u,curve:T}),M=n(_,{...u,curve:a}),E=t(_,{...l,gain:0}),C=n(_,{...u,curve:b});return{connectGraph(){g.connect(w),g.connect(M.inputs===void 0?M:M.inputs[0]),g.connect(E),M.connect(m),m.connect(S.inputs===void 0?S:S.inputs[0]),m.connect(C.inputs===void 0?C:C.inputs[0]),S.connect(w.gain),C.connect(E.gain),w.connect(f,0,0),E.connect(f,0,1)},disconnectGraph(){g.disconnect(w),g.disconnect(M.inputs===void 0?M:M.inputs[0]),g.disconnect(E),M.disconnect(m),m.disconnect(S.inputs===void 0?S:S.inputs[0]),m.disconnect(C.inputs===void 0?C:C.inputs[0]),S.disconnect(w.gain),C.disconnect(E.gain),w.disconnect(f,0,0),E.disconnect(f,0,1)}}},d=(_,g,m,f)=>{const T=new Float32Array(16385),b=new Float32Array(16385),w=new Float32Array(16385),S=new Float32Array(16385),M=Math.floor(16385/2);for(let L=0;L<16385;L+=1)if(L>M){const q=(L-M)/(16384-M)*c;T[L]=Math.cos(q),b[L]=Math.sin(q),w[L]=0,S[L]=1}else{const q=L/(16384-M)*c;T[L]=1,b[L]=0,w[L]=Math.cos(q),S[L]=Math.sin(q)}const E=e(_,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),C=t(_,{...l,gain:0}),x=n(_,{...u,curve:T}),y=t(_,{...l,gain:0}),R=n(_,{...u,curve:b}),D=n(_,{...u,curve:a}),N=t(_,{...l,gain:0}),k=n(_,{...u,curve:w}),V=t(_,{...l,gain:0}),U=n(_,{...u,curve:S});return{connectGraph(){g.connect(E),g.connect(D.inputs===void 0?D:D.inputs[0]),E.connect(C,0),E.connect(y,0),E.connect(N,1),E.connect(V,1),D.connect(m),m.connect(x.inputs===void 0?x:x.inputs[0]),m.connect(R.inputs===void 0?R:R.inputs[0]),m.connect(k.inputs===void 0?k:k.inputs[0]),m.connect(U.inputs===void 0?U:U.inputs[0]),x.connect(C.gain),R.connect(y.gain),k.connect(N.gain),U.connect(V.gain),C.connect(f,0,0),N.connect(f,0,0),y.connect(f,0,1),V.connect(f,0,1)},disconnectGraph(){g.disconnect(E),g.disconnect(D.inputs===void 0?D:D.inputs[0]),E.disconnect(C,0),E.disconnect(y,0),E.disconnect(N,1),E.disconnect(V,1),D.disconnect(m),m.disconnect(x.inputs===void 0?x:x.inputs[0]),m.disconnect(R.inputs===void 0?R:R.inputs[0]),m.disconnect(k.inputs===void 0?k:k.inputs[0]),m.disconnect(U.inputs===void 0?U:U.inputs[0]),x.disconnect(C.gain),R.disconnect(y.gain),k.disconnect(N.gain),U.disconnect(V.gain),C.disconnect(f,0,0),N.disconnect(f,0,0),y.disconnect(f,0,1),V.disconnect(f,0,1)}}},p=(_,g,m,f,T)=>{if(g===1)return h(_,m,f,T);if(g===2)return d(_,m,f,T);throw s()};return(_,{channelCount:g,channelCountMode:m,pan:f,...T})=>{if(m==="max")throw s();const b=i(_,{...T,channelCount:1,channelCountMode:m,numberOfInputs:2}),w=t(_,{...T,channelCount:g,channelCountMode:m,gain:1}),S=t(_,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:f});let{connectGraph:M,disconnectGraph:E}=p(_,g,w,S,b);Object.defineProperty(S.gain,"defaultValue",{get:()=>0}),Object.defineProperty(S.gain,"maxValue",{get:()=>1}),Object.defineProperty(S.gain,"minValue",{get:()=>-1});const C={get bufferSize(){},get channelCount(){return w.channelCount},set channelCount(D){w.channelCount!==D&&(x&&E(),{connectGraph:M,disconnectGraph:E}=p(_,D,w,S,b),x&&M()),w.channelCount=D},get channelCountMode(){return w.channelCountMode},set channelCountMode(D){if(D==="clamped-max"||D==="max")throw s();w.channelCountMode=D},get channelInterpretation(){return w.channelInterpretation},set channelInterpretation(D){w.channelInterpretation=D},get context(){return w.context},get inputs(){return[w]},get numberOfInputs(){return w.numberOfInputs},get numberOfOutputs(){return w.numberOfOutputs},get pan(){return S.gain},addEventListener(...D){return w.addEventListener(D[0],D[1],D[2])},dispatchEvent(...D){return w.dispatchEvent(D[0])},removeEventListener(...D){return w.removeEventListener(D[0],D[1],D[2])}};let x=!1;const y=()=>{M(),x=!0},R=()=>{E(),x=!1};return r(Bs(C,b),y,R)}},p_=(i,e,t,n,s,r,o)=>(a,c)=>{const l=a.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&a.createGain().gain.automationRate===void 0)return t(a,c);Dt(l,c);const u=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(u!==null&&u.length<2)throw e();xt(l,{curve:u},"curve"),xt(l,c,"oversample");let h=null,d=!1;return o(l,"curve",g=>()=>g.call(l),g=>m=>(g.call(l,m),d&&(n(m)&&h===null?h=i(a,l):!n(m)&&h!==null&&(h(),h=null)),m)),s(l,()=>{d=!0,n(l.curve)&&(h=i(a,l))},()=>{d=!1,h!==null&&(h(),h=null)})},m_=(i,e,t,n,s)=>(r,{curve:o,oversample:a,...c})=>{const l=r.createWaveShaper(),u=r.createWaveShaper();Dt(l,c),Dt(u,c);const h=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),_=t(r,{...c,gain:-1});let g=null,m=!1,f=null;const T={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(S){h.channelCount=S,d.channelCount=S,l.channelCount=S,p.channelCount=S,u.channelCount=S,_.channelCount=S},get channelCountMode(){return l.channelCountMode},set channelCountMode(S){h.channelCountMode=S,d.channelCountMode=S,l.channelCountMode=S,p.channelCountMode=S,u.channelCountMode=S,_.channelCountMode=S},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(S){h.channelInterpretation=S,d.channelInterpretation=S,l.channelInterpretation=S,p.channelInterpretation=S,u.channelInterpretation=S,_.channelInterpretation=S},get context(){return l.context},get curve(){return f},set curve(S){if(S!==null&&S.length<2)throw e();if(S===null)l.curve=S,u.curve=S;else{const M=S.length,E=new Float32Array(M+2-M%2),C=new Float32Array(M+2-M%2);E[0]=S[0],C[0]=-S[M-1];const x=Math.ceil((M+1)/2),y=(M+1)/2-1;for(let R=1;R<x;R+=1){const D=R/x*y,N=Math.floor(D),k=Math.ceil(D);E[R]=N===k?S[N]:(1-(D-N))*S[N]+(1-(k-D))*S[k],C[R]=N===k?-S[M-1-N]:-((1-(D-N))*S[M-1-N])-(1-(k-D))*S[M-1-k]}E[x]=M%2===1?S[x-1]:(S[x-2]+S[x-1])/2,l.curve=E,u.curve=C}f=S,m&&(n(f)&&g===null?g=i(r,h):g!==null&&(g(),g=null))},get inputs(){return[h]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(S){l.oversample=S,u.oversample=S},addEventListener(...S){return h.addEventListener(S[0],S[1],S[2])},dispatchEvent(...S){return h.dispatchEvent(S[0])},removeEventListener(...S){return h.removeEventListener(S[0],S[1],S[2])}};o!==null&&(T.curve=o instanceof Float32Array?o:new Float32Array(o)),a!==T.oversample&&(T.oversample=a);const b=()=>{h.connect(l).connect(p),h.connect(d).connect(u).connect(_).connect(p),m=!0,n(f)&&(g=i(r,h))},w=()=>{h.disconnect(l),l.disconnect(p),h.disconnect(d),d.disconnect(u),u.disconnect(_),_.disconnect(p),m=!1,g!==null&&(g(),g=null)};return s(Bs(T,p),b,w)},jt=()=>new DOMException("","NotSupportedError"),__={numberOfChannels:1},g_=(i,e,t,n,s)=>class extends i{constructor(o,a,c){let l;if(typeof o=="number"&&a!==void 0&&c!==void 0)l={length:a,numberOfChannels:o,sampleRate:c};else if(typeof o=="object")l=o;else throw new Error("The given parameters are not valid.");const{length:u,numberOfChannels:h,sampleRate:d}={...__,...l},p=n(h,u,d);e(rr,()=>rr(p))||p.addEventListener("statechange",(()=>{let _=0;const g=m=>{this._state==="running"&&(_>0?(p.removeEventListener("statechange",g),m.stopImmediatePropagation(),this._waitForThePromiseToSettle(m)):_+=1)};return g})()),super(p,h),this._length=u,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",s(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,Eh(this)}))}_waitForThePromiseToSettle(o){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(o):setTimeout(()=>this._waitForThePromiseToSettle(o))}},v_={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},x_=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...v_,...l},d=t(u,h),p=r(u),_=p?n():null,g=c.sampleRate/2;super(c,!1,d,_),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,g,-g),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=_,this._oscillatorNodeRenderer!==null&&h.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=h.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?o(this,c):null;this._nativeOscillatorNode.onended=l;const u=this._nativeOscillatorNode.onended;this._onended=u!==null&&u===l?c:u}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){Rs(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),ni(this)&&fr(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},S_=(i,e,t,n,s)=>()=>{const r=new WeakMap;let o=null,a=null,c=null;const l=async(u,h)=>{let d=t(u);const p=zt(d,h);if(!p){const _={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:o===null?void 0:o,type:d.type};d=e(h,_),a!==null&&d.start(a),c!==null&&d.stop(c)}return r.set(h,d),p?(await i(h,u.detune,d.detune),await i(h,u.frequency,d.frequency)):(await n(h,u.detune,d.detune),await n(h,u.frequency,d.frequency)),await s(u,h,d),d};return{set periodicWave(u){o=u},set start(u){a=u},set stop(u){c=u},render(u,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},y_={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},M_=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...y_,...l},d=t(u,h),p=r(u),_=p?n():null;super(c,!1,d,_),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Wt,Jt),this._orientationY=e(this,p,d.orientationY,Wt,Jt),this._orientationZ=e(this,p,d.orientationZ,Wt,Jt),this._positionX=e(this,p,d.positionX,Wt,Jt),this._positionY=e(this,p,d.positionY,Wt,Jt),this._positionZ=e(this,p,d.positionZ,Wt,Jt),o(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},T_=(i,e,t,n,s,r,o,a,c,l)=>()=>{const u=new WeakMap;let h=null;const d=async(p,_)=>{let g=null,m=r(p);const f={channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation},T={...f,coneInnerAngle:m.coneInnerAngle,coneOuterAngle:m.coneOuterAngle,coneOuterGain:m.coneOuterGain,distanceModel:m.distanceModel,maxDistance:m.maxDistance,panningModel:m.panningModel,refDistance:m.refDistance,rolloffFactor:m.rolloffFactor},b=zt(m,_);if("bufferSize"in m)g=n(_,{...f,gain:1});else if(!b){const w={...T,orientationX:m.orientationX.value,orientationY:m.orientationY.value,orientationZ:m.orientationZ.value,positionX:m.positionX.value,positionY:m.positionY.value,positionZ:m.positionZ.value};m=s(_,w)}if(u.set(_,g===null?m:g),g!==null){if(h===null){if(o===null)throw new Error("Missing the native OfflineAudioContext constructor.");const R=new o(6,p.context.length,_.sampleRate),D=e(R,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});D.connect(R.destination),h=(async()=>{const N=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(k,V)=>{const U=t(R,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:V===0?1:0});return await a(R,k,U.offset),U}));for(let k=0;k<6;k+=1)N[k].connect(D,0,k),N[k].start(0);return l(R)})()}const w=await h,S=n(_,{...f,gain:1});await c(p,_,S);const M=[];for(let R=0;R<w.numberOfChannels;R+=1)M.push(w.getChannelData(R));let E=[M[0][0],M[1][0],M[2][0]],C=[M[3][0],M[4][0],M[5][0]],x=n(_,{...f,gain:1}),y=s(_,{...T,orientationX:E[0],orientationY:E[1],orientationZ:E[2],positionX:C[0],positionY:C[1],positionZ:C[2]});S.connect(x).connect(y.inputs[0]),y.connect(g);for(let R=128;R<w.length;R+=128){const D=[M[0][R],M[1][R],M[2][R]],N=[M[3][R],M[4][R],M[5][R]];if(D.some((k,V)=>k!==E[V])||N.some((k,V)=>k!==C[V])){E=D,C=N;const k=R/_.sampleRate;x.gain.setValueAtTime(0,k),x=n(_,{...f,gain:0}),y=s(_,{...T,orientationX:E[0],orientationY:E[1],orientationZ:E[2],positionX:C[0],positionY:C[1],positionZ:C[2]}),x.gain.setValueAtTime(1,k),S.connect(x).connect(y.inputs[0]),y.connect(g)}}return g}return b?(await i(_,p.orientationX,m.orientationX),await i(_,p.orientationY,m.orientationY),await i(_,p.orientationZ,m.orientationZ),await i(_,p.positionX,m.positionX),await i(_,p.positionY,m.positionY),await i(_,p.positionZ,m.positionZ)):(await a(_,p.orientationX,m.orientationX),await a(_,p.orientationY,m.orientationY),await a(_,p.orientationZ,m.orientationZ),await a(_,p.positionX,m.positionX),await a(_,p.positionY,m.positionY),await a(_,p.positionZ,m.positionZ)),ks(m)?await c(p,_,m.inputs[0]):await c(p,_,m),m};return{render(p,_){const g=u.get(_);return g!==void 0?Promise.resolve(g):d(p,_)}}},b_={disableNormalization:!1},E_=(i,e,t,n)=>class Fh{constructor(r,o){const a=e(r),c=n({...b_,...o}),l=i(a,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Fh.prototype||t.has(r)}},A_=(i,e)=>(t,n,s)=>(i(n).replay(s),e(n,t,s)),w_=(i,e,t)=>async(n,s,r)=>{const o=i(n);await Promise.all(o.activeInputs.map((a,c)=>Array.from(a).map(async([l,u])=>{const d=await e(l).render(l,s),p=n.context.destination;!t(l)&&(n!==p||!t(n))&&d.connect(r,u,c)})).reduce((a,c)=>[...a,...c],[]))},C_=(i,e,t)=>async(n,s,r)=>{const o=e(n);await Promise.all(Array.from(o.activeInputs).map(async([a,c])=>{const u=await i(a).render(a,s);t(a)||u.connect(r,c)}))},R_=(i,e,t,n)=>s=>i(rr,()=>rr(s))?Promise.resolve(i(n,n)).then(r=>{if(!r){const o=t(s,512,0,1);s.oncomplete=()=>{o.onaudioprocess=null,o.disconnect()},o.onaudioprocess=()=>s.currentTime,o.connect(s.destination)}return s.startRendering()}):new Promise(r=>{const o=e(s,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});s.oncomplete=a=>{o.disconnect(),r(a.renderedBuffer)},o.connect(s.destination),s.startRendering()}),P_=i=>(e,t)=>{i.set(e,t)},D_=i=>(e,t)=>i.set(e,t),I_=(i,e,t,n,s,r,o,a)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(u=>t(u).render(u,l)))).then(()=>s(l)).then(u=>(typeof u.copyFromChannel!="function"?(o(u),Zc(u)):e(r,()=>r(u))||a(u),i.add(u),u)),N_={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},L_=(i,e,t,n,s,r)=>class extends i{constructor(a,c){const l=s(a),u={...N_,...c},h=t(l,u),d=r(l),p=d?n():null;super(a,!1,h,p),this._pan=e(this,d,h.pan)}get pan(){return this._pan}},F_=(i,e,t,n,s)=>()=>{const r=new WeakMap,o=async(a,c)=>{let l=t(a);const u=zt(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,h)}return r.set(c,l),u?await i(c,a.pan,l.pan):await n(c,a.pan,l.pan),ks(l)?await s(a,c,l.inputs[0]):await s(a,c,l),l};return{render(a,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):o(a,c)}}},O_=i=>()=>{if(i===null)return!1;try{new i({length:1,sampleRate:44100})}catch{return!1}return!0},U_=(i,e)=>async()=>{if(i===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new e(1,128,44100),s=URL.createObjectURL(t);let r=!1,o=!1;try{await n.audioWorklet.addModule(s);const a=new i(n,"a",{numberOfOutputs:0}),c=n.createOscillator();a.port.onmessage=()=>r=!0,a.onprocessorerror=()=>o=!0,c.connect(a),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(s)}return r&&!o},k_=(i,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),n=i(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(s=>{t.oncomplete=()=>{n.disconnect(),s(t.currentTime!==0)},t.startRendering()})},B_=()=>new DOMException("","UnknownError"),V_={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},z_=(i,e,t,n,s,r,o)=>class extends i{constructor(c,l){const u=s(c),h={...V_,...l},d=t(u,h),_=r(u)?n():null;super(c,!0,d,_),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,o(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},G_=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,o)=>{let a=e(r);if(!zt(a,o)){const l={channelCount:a.channelCount,channelCountMode:a.channelCountMode,channelInterpretation:a.channelInterpretation,curve:a.curve,oversample:a.oversample};a=i(o,l)}return n.set(o,a),ks(a)?await t(r,o,a.inputs[0]):await t(r,o,a),a};return{render(r,o){const a=n.get(o);return a!==void 0?Promise.resolve(a):s(r,o)}}},H_=()=>typeof window>"u"?null:window,W_=(i,e)=>t=>{t.copyFromChannel=(n,s,r=0)=>{const o=i(r),a=i(s);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=n.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)n[h]=l[h+o]},t.copyToChannel=(n,s,r=0)=>{const o=i(r),a=i(s);if(a>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(a),u=n.length;for(let h=o<0?-o:0;h+o<c&&h<u;h+=1)l[h+o]=n[h]}},q_=i=>e=>{e.copyFromChannel=(t=>(n,s,r=0)=>{const o=i(r),a=i(s);if(o<e.length)return t.call(e,n,a,o)})(e.copyFromChannel),e.copyToChannel=(t=>(n,s,r=0)=>{const o=i(r),a=i(s);if(o<e.length)return t.call(e,n,a,o)})(e.copyToChannel)},X_=i=>(e,t)=>{const n=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=n),i(e,"buffer",s=>()=>{const r=s.call(e);return r===n?null:r},s=>r=>s.call(e,r===null?n:r))},Y_=(i,e)=>(t,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw i()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw i()}});const s=t.createBufferSource();e(n,()=>{const a=n.numberOfInputs;for(let c=0;c<a;c+=1)s.connect(n,0,c)},()=>s.disconnect(n))},Oh=(i,e,t)=>i.copyFromChannel===void 0?i.getChannelData(t)[0]:(i.copyFromChannel(e,t),e[0]),Uh=i=>{if(i===null)return!1;const e=i.length;return e%2!==0?i[Math.floor(e/2)]!==0:i[e/2-1]+i[e/2]!==0},vr=(i,e,t,n)=>{let s=i;for(;!s.hasOwnProperty(e);)s=Object.getPrototypeOf(s);const{get:r,set:o}=Object.getOwnPropertyDescriptor(s,e);Object.defineProperty(i,e,{get:t(r),set:n(o)})},j_=i=>({...i,outputChannelCount:i.outputChannelCount!==void 0?i.outputChannelCount:i.numberOfInputs===1&&i.numberOfOutputs===1?[i.channelCount]:Array.from({length:i.numberOfOutputs},()=>1)}),Z_=i=>({...i,channelCount:i.numberOfOutputs}),$_=i=>{const{imag:e,real:t}=i;return e===void 0?t===void 0?{...i,imag:[0,0],real:[0,0]}:{...i,imag:Array.from(t,()=>0),real:t}:t===void 0?{...i,imag:e,real:Array.from(e,()=>0)}:{...i,imag:e,real:t}},kh=(i,e,t)=>{try{i.setValueAtTime(e,t)}catch(n){if(n.code!==9)throw n;kh(i,e,t+1e-7)}},K_=i=>{const e=i.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},J_=i=>{const e=i.createBufferSource(),t=i.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},Q_=i=>{const e=i.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},el=i=>{const e=i.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},Bh=i=>{const e=i.createBuffer(1,1,44100),t=i.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},tl=i=>{const e=i.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},eg=i=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(i)}finally{e.close(),t.close()}},tg=i=>{i.start=(e=>(t=0,n=0,s)=>{const r=i.buffer,o=r===null?n:Math.min(r.duration,n);r!==null&&o>r.duration-.5/i.context.sampleRate?e.call(i,t,0,0):e.call(i,t,o,s)})(i.start)},Vh=(i,e)=>{const t=e.createGain();i.connect(t);const n=(s=>()=>{s.call(i,t),i.removeEventListener("ended",n)})(i.disconnect);i.addEventListener("ended",n),Bs(i,t),i.stop=(s=>{let r=!1;return(o=0)=>{if(r)try{s.call(i,o)}catch{t.gain.setValueAtTime(0,o)}else s.call(i,o),r=!0}})(i.stop)},Vs=(i,e)=>t=>{const n={value:i};return Object.defineProperties(t,{currentTarget:n,target:n}),typeof e=="function"?e.call(i,t):e.handleEvent.call(i,t)},ng=Mf(ns),ig=Cf(ns),sg=Vp(Io),zh=new WeakMap,rg=sm(zh),Pn=_p(new Map,new WeakMap),zn=H_(),Gh=Lm(Pn,Hn),nl=im(qt),Ut=w_(qt,nl,$i),og=Nf(Gh,gt,Ut),mt=am(Do),di=a_(zn),lt=bm(di),Hh=new WeakMap,Wh=$p(Vs),xr=km(zn),il=Sm(xr),sl=ym(zn),qh=Mm(zn),or=Vm(zn),Ct=sp(Tf(vh),wf(ng,ig,go,sg,vo,qt,rg,dr,gt,ns,ni,$i,so),Pn,mm(Ha,vo,qt,gt,sr,ni),Hn,No,jt,Op(go,Ha,qt,gt,sr,mt,ni,lt),Hp(Hh,qt,Cn),Wh,mt,il,sl,qh,lt,or),ag=If(Ct,og,Hn,Gh,mt,lt),rl=new WeakSet,du=Fm(zn),Xh=Rp(new Uint32Array(1)),ol=W_(Xh,Hn),al=q_(Xh),Yh=Ff(rl,Pn,jt,du,di,O_(du),ol,al),Lo=Rf(nn),jh=C_(nl,pr,$i),Wn=Tp(jh),zs=Um(Lo,Pn,K_,J_,Q_,el,Bh,tl,tg,X_(vr),Vh),qn=A_(rm(pr),jh),cg=kf(Wn,zs,gt,qn,Ut),Dn=rp(bf(xh),Hh,jc,op,_f,gf,vf,xf,Sf,Va,_h,xr,kh),lg=Uf(Ct,cg,Dn,Ft,zs,mt,lt,Vs),ug=Yf(Ct,jf,Hn,Ft,Bm(nn,vr),mt,lt,Ut),hg=mp(Wn,Nh,gt,qn,Ut),is=D_(zh),dg=pp(Ct,Dn,hg,No,Nh,mt,lt,is),Pi=Im(ns,sl),fg=Y_(Ft,Pi),Di=Ym(xr,fg),pg=xp(Di,gt,Ut),mg=vp(Ct,pg,Di,mt,lt),_g=Mp(_r,gt,Ut),gg=yp(Ct,_g,_r,mt,lt,Z_),vg=$m(Lo,zs,nn,Pi),Gs=Zm(Lo,Pn,vg,el,tl),xg=Cp(Wn,Gs,gt,qn,Ut),Sg=wp(Ct,Dn,xg,Gs,mt,lt,Vs),Zh=Km(jt,vr),yg=Ip(Zh,gt,Ut),Mg=Dp(Ct,yg,Zh,mt,lt,is),Tg=Bp(Wn,Lh,gt,qn,Ut),bg=kp(Ct,Dn,Tg,Lh,mt,lt,is),$h=Jm(jt),Eg=Yp(Wn,$h,gt,qn,Ut),Ag=Xp(Ct,Dn,Eg,$h,jt,mt,lt,is),wg=tm(Wn,nn,gt,qn,Ut),Cg=em(Ct,Dn,wg,nn,mt,lt),Rg=n_(No,Ft,gr,jt),Fo=R_(Pn,nn,gr,k_(nn,di)),Pg=pm(zs,gt,di,Ut,Fo),Dg=Qm(Rg),Ig=dm(Ct,Dg,Pg,mt,lt,is),Ng=Zf(Dn,Di,Gs,gr,jt,Oh,lt,vr),Kh=new WeakMap,Lg=Dm(ug,Ng,Wh,lt,Kh,Vs),Jh=c_(Lo,Pn,el,Bh,tl,Vh),Fg=S_(Wn,Jh,gt,qn,Ut),Og=x_(Ct,Dn,Jh,Fg,mt,lt,Vs),Qh=Ep(zs),Ug=m_(Qh,Ft,nn,Uh,Pi),Oo=p_(Qh,Ft,Ug,Uh,Pi,xr,vr),kg=u_(go,Ft,Di,nn,gr,Oo,jt,vo,Oh,Pi),ed=l_(kg),Bg=T_(Wn,Di,Gs,nn,ed,gt,di,qn,Ut,Fo),Vg=M_(Ct,Dn,ed,Bg,mt,lt,is),zg=h_(Hn),Gg=E_(zg,mt,new WeakSet,$_),Hg=f_(Di,_r,nn,Oo,jt,Pi),td=d_(Hg,jt),Wg=F_(Wn,td,gt,qn,Ut),qg=L_(Ct,Dn,td,Wg,mt,lt),Xg=G_(Oo,gt,Ut),Yg=z_(Ct,Ft,Oo,Xg,mt,lt,is),nd=Em(zn),cl=Kp(zn),id=new WeakMap,jg=cm(id,di),Zg=nd?Af(Pn,jt,Zp(zn),cl,Jp(yf),mt,jg,lt,or,new WeakMap,new WeakMap,U_(or,di),zn):void 0,$g=Tm(il,lt),Kg=Fp(rl,Pn,Lp,jp,new WeakSet,mt,$g,mo,rr,ol,al),sd=dp(Zg,ag,Yh,lg,dg,mg,gg,Sg,Mg,Kg,bg,Ag,Cg,Ig,Lg,Og,Vg,Gg,qg,Yg),Jg=Am(Ct,i_,mt,lt),Qg=Cm(Ct,s_,mt,lt),e0=Rm(Ct,r_,mt,lt),t0=o_(Ft,lt),n0=Pm(Ct,t0,mt),i0=Xf(sd,Ft,jt,B_,Jg,Qg,e0,n0,xr),ll=lm(Kh),s0=Pf(ll),rd=bp(Hn),r0=zp(ll),od=Wp(Hn),ad=new WeakMap,o0=nm(ad,Cn),a0=Xm(rd,Hn,Ft,Di,_r,Gs,nn,gr,jt,od,cl,o0,Pi),c0=Gm(Ft,a0,nn,jt,Pi),l0=hp(Wn,rd,zs,Di,_r,Gs,nn,r0,od,cl,gt,or,di,qn,Ut,Fo),u0=om(id),h0=P_(ad),fu=nd?cp(s0,Ct,Dn,l0,c0,qt,u0,mt,lt,or,j_,h0,eg,Vs):void 0,d0=Np(jt,di),f0=I_(rl,Pn,nl,ll,Fo,mo,ol,al),p0=g_(sd,Pn,Ft,d0,f0),m0=_m(Do,il),_0=gm(Yc,sl),g0=vm(jc,qh),v0=xm(Do,lt);function xn(i){return i===void 0}function je(i){return i!==void 0}function x0(i){return typeof i=="function"}function oi(i){return typeof i=="number"}function ji(i){return Object.prototype.toString.call(i)==="[object Object]"&&i.constructor===Object}function S0(i){return typeof i=="boolean"}function un(i){return Array.isArray(i)}function ai(i){return typeof i=="string"}function Nr(i){return ai(i)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(i)}function Ne(i,e){if(!i)throw new Error(e)}function gn(i,e,t=1/0){if(!(e<=i&&i<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${i}`)}function cd(i){!i.isOffline&&i.state!=="running"&&Uo('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let ld=!1,pu=!1;function mu(i){ld=i}function y0(i){xn(i)&&ld&&!pu&&(pu=!0,Uo("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let ud=console;function M0(...i){ud.log(...i)}function Uo(...i){ud.warn(...i)}function T0(i){return new i0(i)}function b0(i,e,t){return new p0(i,e,t)}const cn=typeof self=="object"?self:null,E0=cn&&(cn.hasOwnProperty("AudioContext")||cn.hasOwnProperty("webkitAudioContext"));function A0(i,e,t){return Ne(je(fu),"AudioWorkletNode only works in a secure context (https or localhost)"),new(i instanceof cn?.BaseAudioContext?cn?.AudioWorkletNode:fu)(i,e,t)}function In(i,e,t,n){var s=arguments.length,r=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,t,n);else for(var a=i.length-1;a>=0;a--)(o=i[a])&&(r=(s<3?o(r):s>3?o(e,t,r):o(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r}function At(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(u){try{l(n.next(u))}catch(h){o(h)}}function c(u){try{l(n.throw(u))}catch(h){o(h)}}function l(u){u.done?r(u.value):s(u.value).then(a,c)}l((n=n.apply(i,e||[])).next())})}class w0{constructor(e,t,n,s){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(s||44100),.001),this.updateInterval=n,this._createClock()}_createWorker(){const e=new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval*1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),n=new Worker(t);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function Ki(i){return g0(i)}function Ei(i){return _0(i)}function ro(i){return v0(i)}function ys(i){return m0(i)}function C0(i){return i instanceof Yh}function R0(i,e){return i==="value"||Ki(e)||Ei(e)||C0(e)}function Zi(i,...e){if(!e.length)return i;const t=e.shift();if(ji(i)&&ji(t))for(const n in t)R0(n,t[n])?i[n]=t[n]:ji(t[n])?(i[n]||Object.assign(i,{[n]:{}}),Zi(i[n],t[n])):Object.assign(i,{[n]:t[n]});return Zi(i,...e)}function P0(i,e){return i.length===e.length&&i.every((t,n)=>e[n]===t)}function Le(i,e,t=[],n){const s={},r=Array.from(e);if(ji(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(a=>Reflect.has(i,a))||(Zi(s,{[n]:r[0]}),t.splice(t.indexOf(n),1),r.shift())),r.length===1&&ji(r[0]))Zi(s,r[0]);else for(let o=0;o<t.length;o++)je(r[o])&&(s[t[o]]=r[o]);return Zi(i,s)}function D0(i){return i.constructor.getDefaults()}function Es(i,e){return xn(i)?e:i}function ja(i,e){return e.forEach(t=>{Reflect.has(i,t)&&delete i[t]}),i}class fi{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||cn&&this.toString()===cn.TONE_DEBUG_CLASS)&&M0(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}fi.version=mh;const ul=1e-6;function Ps(i,e){return i>e+ul}function Za(i,e){return Ps(i,e)||bn(i,e)}function Mo(i,e){return i+ul<e}function bn(i,e){return Math.abs(i-e)<ul}function I0(i,e,t){return Math.max(Math.min(i,t),e)}class Sn extends fi{constructor(){super(),this.name="Timeline",this._timeline=[];const e=Le(Sn.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(Ne(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];Ne(Za(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const n=this._search(e,t);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const n=this._search(e,t);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const n=this._search(e);return n-1>=0?this._timeline[n-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(bn(this._timeline[t].time,e)){for(let n=t;n>=0&&bn(this._timeline[n].time,e);n--)t=n;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&Za(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let n=0;const s=this._timeline.length;let r=s;if(s>0&&this._timeline[s-1][t]<=e)return s-1;for(;n<r;){let o=Math.floor(n+(r-n)/2);const a=this._timeline[o],c=this._timeline[o+1];if(bn(a[t],e)){for(let l=o;l<this._timeline.length;l++){const u=this._timeline[l];if(bn(u[t],e))o=l;else break}return o}else{if(Mo(a[t],e)&&Ps(c[t],e))return o;Ps(a[t],e)?r=o:n=o+1}}return-1}_iterate(e,t=0,n=this._timeline.length-1){this._timeline.slice(t,n+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const n=this._search(e);return n!==-1&&this._iterate(t,0,n),this}forEachAfter(e,t){const n=this._search(e);return this._iterate(t,n+1),this}forEachBetween(e,t,n){let s=this._search(e),r=this._search(t);return s!==-1&&r!==-1?(this._timeline[s].time!==e&&(s+=1),this._timeline[r].time===t&&(r-=1),this._iterate(n,s,r)):s===-1&&this._iterate(n,0,r),this}forEachFrom(e,t){let n=this._search(e);for(;n>=0&&this._timeline[n].time>=e;)n--;return this._iterate(t,n+1),this}forEachAtTime(e,t){const n=this._search(e);if(n!==-1&&bn(this._timeline[n].time,e)){let s=n;for(let r=n;r>=0&&bn(this._timeline[r].time,e);r--)s=r;this._iterate(r=>{t(r)},s,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const hd=[];function ko(i){hd.push(i)}function N0(i){hd.forEach(e=>e(i))}const dd=[];function Bo(i){dd.push(i)}function L0(i){dd.forEach(e=>e(i))}class Sr extends fi{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(s=>{xn(this._events)&&(this._events={}),this._events.hasOwnProperty(s)||(this._events[s]=[]),this._events[s].push(t)}),this}once(e,t){const n=(...s)=>{t(...s),this.off(e,n)};return this.on(e,n),this}off(e,t){return e.split(/\W+/).forEach(s=>{if(xn(this._events)&&(this._events={}),this._events.hasOwnProperty(s))if(xn(t))this._events[s]=[];else{const r=this._events[s];for(let o=r.length-1;o>=0;o--)r[o]===t&&r.splice(o,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const n=this._events[e].slice(0);for(let s=0,r=n.length;s<r;s++)n[s].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const n=Object.getOwnPropertyDescriptor(Sr.prototype,t);Object.defineProperty(e.prototype,t,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class fd extends Sr{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class yr extends fd{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new Sn,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const n=Le(yr.getDefaults(),arguments,["context"]);n.context?(this._context=n.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=T0({latencyHint:n.latencyHint}),this._latencyHint=n.latencyHint),this._ticker=new w0(this.emit.bind(this,"tick"),n.clockSource,n.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=n.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(N0(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,n){return this._context.createBuffer(e,t,n)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,n){return this._context.createPeriodicWave(e,t,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return Ne(ys(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return Ne(ys(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return Ne(ys(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){Ne(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){Ne(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){Ne(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){Ne(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return A0(this.rawContext,e,t)}addAudioWorkletModule(e){return At(this,void 0,void 0,function*(){Ne(je(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return At(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return ys(this._context)?this._context.resume():Promise.resolve()}close(){return At(this,void 0,void 0,function*(){ys(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&L0(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),n=t.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=e;const s=this._context.createBufferSource();return s.channelCount=1,s.channelCountMode="explicit",s.buffer=t,s.loop=!0,s.start(0),this._constants.set(e,s),s}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();this._timeouts.forEachBefore(e,t=>{t.callback(),this._timeouts.remove(t)})}setTimeout(e,t){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:n+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const n=++this._timeoutIds,s=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),s()},id:n,time:r+t})};return s(),n}}class F0 extends fd{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,n){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return At(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function dt(i,e){un(e)?e.forEach(t=>dt(i,t)):Object.defineProperty(i,e,{enumerable:!0,writable:!1})}function hl(i,e){un(e)?e.forEach(t=>hl(i,t)):Object.defineProperty(i,e,{writable:!0})}const at=()=>{};class ht extends fi{constructor(){super(),this.name="ToneAudioBuffer",this.onload=at;const e=Le(ht.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,ai(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:at,onload:at,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:vn().sampleRate}set(e){return e instanceof ht?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return At(this,void 0,void 0,function*(){const t=ht.load(e).then(n=>{this.set(n),this.onload(this)});ht.downloads.push(t);try{yield t}finally{const n=ht.downloads.indexOf(t);ht.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=un(e)&&e[0].length>0,n=t?e.length:1,s=t?e[0].length:e.length,r=vn(),o=r.createBuffer(n,s,r.sampleRate),a=!t&&n===1?[e]:e;for(let c=0;c<n;c++)o.copyToChannel(a[c],c);return this._buffer=o,this}toMono(e){if(oi(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const n=this.numberOfChannels;for(let s=0;s<n;s++){const r=this.toArray(s);for(let o=0;o<r.length;o++)t[o]+=r[o]}t=t.map(s=>s/n),this.fromArray(t)}return this}toArray(e){if(oi(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let n=0;n<this.numberOfChannels;n++)t[n]=this.getChannelData(n);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){Ne(this.loaded,"Buffer is not loaded");const n=Math.floor(e*this.sampleRate),s=Math.floor(t*this.sampleRate);Ne(n<s,"The start time must be less than the end time");const r=s-n,o=vn().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let a=0;a<this.numberOfChannels;a++)o.copyToChannel(this.getChannelData(a).subarray(n,s),a);return new ht(o)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new ht().fromArray(e)}static fromUrl(e){return At(this,void 0,void 0,function*(){return yield new ht().load(e)})}static load(e){return At(this,void 0,void 0,function*(){const t=ht.baseUrl===""||ht.baseUrl.endsWith("/")?ht.baseUrl:ht.baseUrl+"/",n=yield fetch(t+e);if(!n.ok)throw new Error(`could not load url: ${e}`);const s=yield n.arrayBuffer();return yield vn().decodeAudioData(s)})}static supportsType(e){const t=e.split("."),n=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return At(this,void 0,void 0,function*(){for(yield Promise.resolve();ht.downloads.length;)yield ht.downloads[0]})}}ht.baseUrl="";ht.downloads=[];class Vo extends yr{constructor(){super({clockSource:"offline",context:ro(arguments[0])?arguments[0]:b0(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:ro(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=ro(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return At(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const n=Math.floor(this.sampleRate/128);e&&t%n===0&&(yield new Promise(s=>setTimeout(s,1)))}})}render(){return At(this,arguments,void 0,function*(e=!0){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new ht(t)})}close(){return Promise.resolve()}}const pd=new F0;let Wi=pd;function vn(){return Wi===pd&&E0&&O0(new yr),Wi}function O0(i,e=!1){e&&Wi.dispose(),ys(i)?Wi=new yr(i):ro(i)?Wi=new Vo(i):Wi=i}function md(){return Wi.resume()}if(cn&&!cn.TONE_SILENCE_LOGGING){const e=` * Tone.js v${mh} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function U0(i){return Math.pow(10,i/20)}function k0(i){return 20*(Math.log(i)/Math.LN10)}function _d(i){return Math.pow(2,i/12)}let zo=440;function B0(){return zo}function V0(i){zo=i}function qi(i){return Math.round(gd(i))}function gd(i){return 69+12*Math.log2(i/zo)}function vd(i){return zo*Math.pow(2,(i-69)/12)}class dl extends fi{constructor(e,t,n){super(),this.defaultUnits="s",this._val=t,this._units=n,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const n=parseInt(e,10),s=t==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*s:this._beatsToUnits(4/n)*s},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,n)=>{let s=0;return e&&e!=="0"&&(s+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s+=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s+=this._beatsToUnits(parseFloat(n)/4)),s},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof dl&&this.fromType(this._val),xn(this._val))return this._noArg();if(ai(this._val)&&xn(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(ji(this._val)){let e=0;for(const t in this._val)if(je(this._val[t])){const n=this._val[t],s=new this.constructor(this.context,t).valueOf()*n;e+=s}return e}if(je(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return ai(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class An extends dl{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new An(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const n=new this.constructor(this.context,e).valueOf(),s=this.valueOf(),a=Math.round(s/n)*n-s;return s+a*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const o=Math.pow(2,r);t.push(o+"n."),t.push(o+"n"),t.push(o+"t")}t.push("0");let n=t[0],s=new An(this.context,t[0]).toSeconds();return t.forEach(r=>{const o=new An(this.context,r).toSeconds();Math.abs(o-e)<Math.abs(s-e)&&(n=r,s=o)}),n}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const n=Math.floor(t/this._getTimeSignature());let s=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=s.toString();return r.length>3&&(s=parseFloat(parseFloat(r).toFixed(3))),[n,t,s].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return qi(this.toFrequency())}_now(){return this.context.now()}}class ln extends An{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return B0()}static set A4(e){V0(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:ln.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const s=z0[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?s:ln.mtof(s)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,n){let s=1;return e&&e!=="0"&&(s*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s*=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s*=this._beatsToUnits(parseFloat(n)/4)),s}}})}transpose(e){return new ln(this.context,this.valueOf()*_d(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return qi(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/ln.A4);let n=Math.round(12*t)+57;const s=Math.floor(n/12);return s<0&&(n+=-12*s),G0[n%12]+s.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return vd(e)}static ftom(e){return qi(e)}}const z0={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},G0=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class ir extends An{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Qt extends fi{constructor(){super();const e=Le(Qt.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:vn()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return y0(e),new An(this.context,e).toSeconds()}toFrequency(e){return new ln(this.context,e).toFrequency()}toTicks(e){return new ir(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(n=>{xn(e[n])&&delete t[n]}),t}get(){const e=D0(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const n=this[t];je(n)&&je(n.value)&&je(n.setValueAtTime)?e[t]=n.value:n instanceof Qt?e[t]=n._getPartialProperties(e[t]):un(n)||oi(n)||ai(n)||S0(n)?e[t]=n:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&je(this[t])&&(this[t]&&je(this[t].value)&&je(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof Qt?this[t].set(e[t]):this[t]=e[t])}),this}}class fl extends Sn{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,n){return gn(t,0),this.add(Object.assign({},n,{state:e,time:t})),this}getLastState(e,t){const n=this._search(t);for(let s=n;s>=0;s--){const r=this._timeline[s];if(r.state===e)return r}}getNextState(e,t){const n=this._search(t);if(n!==-1)for(let s=n;s<this._timeline.length;s++){const r=this._timeline[s];if(r.state===e)return r}}}class et extends Qt{constructor(){const e=Le(et.getDefaults(),arguments,["param","units","convert"]);for(super(e),this.name="Param",this.overridden=!1,this._minOutput=1e-7,Ne(je(e.param)&&(Ki(e.param)||e.param instanceof et),"param must be an AudioParam");!Ki(e.param);)e.param=e.param._param;this._swappable=je(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new Sn(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,je(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(Qt.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return je(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return je(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return je(this.maxValue)&&je(this.minValue)&&gn(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?U0(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?k0(e):e}setValueAtTime(e,t){const n=this.toSeconds(t),s=this._fromType(e);return Ne(isFinite(s)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this.log(this.units,"setValueAtTime",e,n),this._events.add({time:n,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,n),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),n=this._events.getAfter(t),s=this._events.get(t);let r=this._initialValue;if(s===null)r=this._initialValue;else if(s.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const o=this._events.getBefore(s.time);let a;o===null?a=this._initialValue:a=o.value,s.type==="setTargetAtTime"&&(r=this._exponentialApproach(s.time,a,s.value,s.constant,t))}else if(n===null)r=s.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let o=s.value;if(s.type==="setTargetAtTime"){const a=this._events.getBefore(s.time);a===null?o=this._initialValue:o=a.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(s.time,o,n.time,n.value,t):r=this._exponentialInterpolate(s.time,o,n.time,n.value,t)}else r=s.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const n=this._fromType(e),s=this.toSeconds(t);return Ne(isFinite(n)&&isFinite(s),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(n),this._events.add({time:s,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",e,s),this._param.linearRampToValueAtTime(n,s),this}exponentialRampToValueAtTime(e,t){let n=this._fromType(e);n=bn(n,0)?this._minOutput:n,this._assertRange(n);const s=this.toSeconds(t);return Ne(isFinite(n)&&isFinite(s),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:s,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",e,s),this._param.exponentialRampToValueAtTime(n,s),this}exponentialRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(e,n+this.toSeconds(t)),this}linearRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(e,n+this.toSeconds(t)),this}targetRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(e,n,t),this}exponentialApproachValueAtTime(e,t,n){t=this.toSeconds(t),n=this.toSeconds(n);const s=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(e,t,s),this.cancelAndHoldAtTime(t+n*.9),this.linearRampToValueAtTime(e,t+n),this}setTargetAtTime(e,t,n){const s=this._fromType(e);Ne(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(s),Ne(isFinite(s)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:s}),this.log(this.units,"setTargetAtTime",e,r,n),this._param.setTargetAtTime(s,r,n),this}setValueCurveAtTime(e,t,n,s=1){n=this.toSeconds(n),t=this.toSeconds(t);const r=this._fromType(e[0])*s;this.setValueAtTime(this._toType(r),t);const o=n/(e.length-1);for(let a=1;a<e.length;a++){const c=this._fromType(e[a])*s;this.linearRampToValueAtTime(this._toType(c),t+a*o)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return Ne(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),n=this._fromType(this.getValueAtTime(t));Ne(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+n);const s=this._events.get(t),r=this._events.getAfter(t);return s&&bn(s.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),t)),this._events.add({time:t,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,t),this}rampTo(e,t=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,n):this.linearRampTo(e,t,n),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const n=this._events.get(t);if(n&&n.type==="setTargetAtTime"){const s=this._events.getAfter(n.time),r=s?s.time:t+2,o=(r-t)/10;for(let a=t;a<r;a+=o)e.linearRampToValueAtTime(this.getValueAtTime(a),a)}return this._events.forEachAfter(this.context.currentTime,s=>{s.type==="cancelScheduledValues"?e.cancelScheduledValues(s.time):s.type==="setTargetAtTime"?e.setTargetAtTime(s.value,s.time,s.constant):e[s.type](s.value,s.time)}),this}setParam(e){Ne(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,n,s,r){return n+(t-n)*Math.exp(-(r-e)/s)}_linearInterpolate(e,t,n,s,r){return t+(s-t)*((r-e)/(n-e))}_exponentialInterpolate(e,t,n,s,r){return t*Math.pow(s/t,(r-e)/(n-e))}}class Ie extends Qt{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return je(this.input)?Ki(this.input)||this.input instanceof et?1:this.input.numberOfInputs:0}get numberOfOutputs(){return je(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return je(e)&&(e instanceof Ie||Ei(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(n=>{n.channelCount=e.channelCount,n.channelCountMode=e.channelCountMode,n.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();Ne(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,n=0){return Ai(this,e,t,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return Uo("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,n=0){return H0(this,e,t,n),this}chain(...e){return To(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),je(this.input)&&(this.input instanceof Ie?this.input.dispose():Ei(this.input)&&this.input.disconnect()),je(this.output)&&(this.output instanceof Ie?this.output.dispose():Ei(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function To(...i){const e=i.shift();i.reduce((t,n)=>(t instanceof Ie?t.connect(n):Ei(t)&&Ai(t,n),n),e)}function Ai(i,e,t=0,n=0){for(Ne(je(i),"Cannot connect from undefined node"),Ne(je(e),"Cannot connect to undefined node"),(e instanceof Ie||Ei(e))&&Ne(e.numberOfInputs>0,"Cannot connect to node with no inputs"),Ne(i.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof Ie||e instanceof et;)je(e.input)&&(e=e.input);for(;i instanceof Ie;)je(i.output)&&(i=i.output);Ki(e)?i.connect(e,t):i.connect(e,t,n)}function H0(i,e,t=0,n=0){if(je(e))for(;e instanceof Ie;)e=e.input;for(;!Ei(i);)je(i.output)&&(i=i.output);Ki(e)?i.disconnect(e,t):Ei(e)?i.disconnect(e,t,n):i.disconnect()}class vt extends Ie{constructor(){const e=Le(vt.getDefaults(),arguments,["gain","units"]);super(e),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode,this.gain=new et({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),dt(this,"gain")}static getDefaults(){return Object.assign(Ie.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class Ds extends Ie{constructor(e){super(e),this.onended=at,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new vt({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const n=this.toSeconds(t);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(Ie.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:at})}_startGain(e,t=1){Ne(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=e+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+n):this._gainNode.gain.exponentialApproachValueAtTime(t,e,n)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){Ne(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==at&&(this.onended(this),this.onended=at,!this.context.isOffline)){const e=()=>this.dispose();typeof requestIdleCallback<"u"?requestIdleCallback(e):setTimeout(e,10)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),Ne(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=at,this}}class pl extends Ds{constructor(){const e=Le(pl.getDefaults(),arguments,["offset"]);super(e),this.name="ToneConstantSource",this._source=this.context.createConstantSource(),Ai(this._source,this._gainNode),this.offset=new et({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(Ds.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class St extends Ie{constructor(){const e=Le(St.getDefaults(),arguments,["value","units"]);super(e),this.name="Signal",this.override=!0,this.output=this._constantSource=new pl({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(Ie.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,n=0){return ml(this,e,t,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,n){return this._param.exponentialRampTo(e,t,n),this}linearRampTo(e,t,n){return this._param.linearRampTo(e,t,n),this}targetRampTo(e,t,n){return this._param.targetRampTo(e,t,n),this}exponentialApproachValueAtTime(e,t,n){return this._param.exponentialApproachValueAtTime(e,t,n),this}setTargetAtTime(e,t,n){return this._param.setTargetAtTime(e,t,n),this}setValueCurveAtTime(e,t,n,s){return this._param.setValueCurveAtTime(e,t,n,s),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,n){return this._param.rampTo(e,t,n),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function ml(i,e,t,n){(e instanceof et||Ki(e)||e instanceof St&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof St&&(e.overridden=!0)),Ai(i,e,t,n)}class _l extends et{constructor(){const e=Le(_l.getDefaults(),arguments,["value"]);super(e),this.name="TickParam",this._events=new Sn(1/0),this._multiplier=1,this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(et.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,n){t=this.toSeconds(t),this.setRampPoint(t);const s=this._fromType(e),r=this._events.get(t),o=Math.round(Math.max(1/n,1));for(let a=0;a<=o;a++){const c=n*a+t,l=this._exponentialApproach(r.time,r.value,s,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const n=this.toSeconds(t);super.setValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),o=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(o,0),this}linearRampToValueAtTime(e,t){const n=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),o=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(o,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const n=this._fromType(e),s=this._events.get(t),r=Math.round(Math.max((t-s.time)*10,1)),o=(t-s.time)/r;for(let a=0;a<=r;a++){const c=o*a+s.time,l=this._exponentialInterpolate(s.time,s.value,t,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(xn(e.ticks)){const o=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(o,e.time)}const n=this._fromType(this.getValueAtTime(e.time));let s=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(s=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(n+s)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),n=this._events.get(t);return Math.max(this._getTicksUntilEvent(n,t),0)}getDurationOfTicks(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(t);return this.getTimeOfTick(s+e)-n}getTimeOfTick(e){const t=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&n&&n.type==="linearRampToValueAtTime"&&t.value!==n.value){const s=this._fromType(this.getValueAtTime(t.time)),o=(this._fromType(this.getValueAtTime(n.time))-s)/(n.time-t.time),a=Math.sqrt(Math.pow(s,2)-2*o*(t.ticks-e)),c=(-s+a)/o,l=(-s-a)/o;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const n=this.toSeconds(t),s=this.toSeconds(e),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+s)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class gl extends St{constructor(){const e=Le(gl.getDefaults(),arguments,["value"]);super(e),this.name="TickSignal",this.input=this._param=new _l({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(St.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class vl extends Qt{constructor(){const e=Le(vl.getDefaults(),arguments,["frequency"]);super(e),this.name="TickSource",this._state=new fl,this._tickOffset=new Sn,this._ticksAtTime=new Sn,this._secondsAtTime=new Sn,this.frequency=new gl({context:this.context,units:e.units,value:e.frequency}),dt(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Qt.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const n=this.toSeconds(e);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),je(t)&&this.setTicksAtTime(t,n),this._ticksAtTime.cancel(n),this._secondsAtTime.cancel(n)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const n=this._state.get(t);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),n=this._state.getLastState("stopped",t),s=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let o=s||n,a=s?s.ticks:0,c=null;return this._state.forEachBetween(o.time,t+this.sampleTime,l=>{let u=o.time;const h=this._tickOffset.get(l.time);h&&h.time>=o.time&&(a=h.ticks,u=h.time),o.state==="started"&&l.state!=="started"&&(a+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(u),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:a})),o=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),n=this.frequency.timeToTicks(e,t);this.setTicksAtTime(n,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),n={state:"paused",time:e};this._state.add(n);const s=this._secondsAtTime.get(e);let r=s||t,o=s?s.seconds:0,a=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const u=this._tickOffset.get(c.time);u&&u.time>=r.time&&(o=u.seconds,l=u.time),r.state==="started"&&c.state!=="started"&&(o+=c.time-l,c.time!==n.time&&(a={state:c.state,time:c.time,seconds:o})),r=c}),this._state.remove(n),a&&this._secondsAtTime.add(a),o}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const n=this._tickOffset.get(t),s=this._state.get(t),r=Math.max(n.time,s.time),o=this.frequency.getTicksAtTime(r)+e-n.ticks;return this.frequency.getTimeOfTick(o)}forEachTickBetween(e,t,n){let s=this._state.get(e);this._state.forEachBetween(e,t,o=>{s&&s.state==="started"&&o.state!=="started"&&this.forEachTickBetween(Math.max(s.time,e),o.time-this.sampleTime,n),s=o});let r=null;if(s&&s.state==="started"){const o=Math.max(s.time,e),a=this.frequency.getTicksAtTime(o),c=this.frequency.getTicksAtTime(s.time),l=a-c;let u=Math.ceil(l)-l;u=bn(u,1)?0:u;let h=this.frequency.getTimeOfTick(a+u);for(;h<t;){try{n(h,Math.round(this.getTicksAtTime(h)))}catch(d){r=d;break}h+=this.frequency.getDurationOfTicks(1,h)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class Go extends Qt{constructor(){const e=Le(Go.getDefaults(),arguments,["callback","frequency"]);super(e),this.name="Clock",this.callback=at,this._lastUpdate=0,this._state=new fl("stopped"),this._boundLoop=this._loop.bind(this),this.callback=e.callback,this._tickSource=new vl({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,dt(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Qt.getDefaults(),{callback:at,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){cd(this.context);const n=this.toSeconds(e);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,t),n<this._lastUpdate&&this.emit("start",n,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(s+e,n)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,n=>{switch(n.state){case"started":const s=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,s);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(e,t,(n,s)=>{this.callback(n,s)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}Sr.mixin(Go);class Hs extends Ie{constructor(){const e=Le(Hs.getDefaults(),arguments,["volume"]);super(e),this.name="Volume",this.input=this.output=new vt({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,dt(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(Ie.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class xl extends Ie{constructor(){const e=Le(xl.getDefaults(),arguments);super(e),this.name="Destination",this.input=new Hs({context:this.context}),this.output=new vt({context:this.context}),this.volume=this.input.volume,To(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(Ie.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),To(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}ko(i=>{i.destination=new xl({context:i})});Bo(i=>{i.destination.dispose()});class W0 extends Ie{constructor(){super(...arguments),this.name="Listener",this.positionX=new et({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new et({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new et({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new et({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new et({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new et({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new et({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new et({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new et({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(Ie.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}ko(i=>{i.listener=new W0({context:i})});Bo(i=>{i.listener.dispose()});class Sl extends fi{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=Le(Sl.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const n=e.urls[t];this.add(t,n,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:at,onload:at,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return Ne(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,n=at,s=at){return ai(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new ht(this.baseUrl+t,n,s))):this._buffers.set(e.toString(),new ht(t,n,s)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class bo extends ln{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return qi(super._frequencyToUnits(e))}_ticksToUnits(e){return qi(super._ticksToUnits(e))}_beatsToUnits(e){return qi(super._beatsToUnits(e))}_secondsToUnits(e){return qi(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return vd(this.toMidi())}transpose(e){return new bo(this.context,this.toMidi()+e)}}class Ts extends ir{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class q0 extends Qt{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new Sn,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;this._events.forEachBefore(e+this.anticipation,t=>{e-t.time<=this.expiration&&t.callback(),this._events.remove(t)}),this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}ko(i=>{i.draw=new q0({context:i})});Bo(i=>{i.draw.dispose()});class X0 extends fi{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){Ne(je(e.time),"Events must have a time property"),Ne(je(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new Y0(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const n of t)if(n.event===e){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let n,s=null;if(t>0)if(e.left.right===null)n=e.left,n.right=e.right,s=n;else{for(n=e.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,s=n.parent,n.left=e.left,n.right=e.right)}else if(e.right.left===null)n=e.right,n.left=e.left,s=n;else{for(n=e.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,s=n.parent,n.left=e.left,n.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=n:e.parent.right=n:this._setRoot(n),s&&this._rebalance(s)}e.dispose()}_rotateLeft(e){const t=e.parent,n=e.isLeftChild(),s=e.right;s&&(e.right=s.left,s.left=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rotateRight(e){const t=e.parent,n=e.isLeftChild(),s=e.left;s&&(e.left=s.right,s.right=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let n=t[0];for(let s=1;s<t.length;s++)t[s].low>n.low&&(n=t[s]);return n.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(n=>t.push(n)),t.forEach(n=>{n.event&&e(n.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const n=[];this._root.search(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}forEachFrom(e,t){if(this._root!==null){const n=[];this._root.searchAfter(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class Y0{constructor(e,t,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class j0 extends fi{constructor(e){super(),this.name="TimelineValue",this._timeline=new Sn({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class Ji extends Ie{constructor(){super(Le(Ji.getDefaults(),arguments,["context"]))}connect(e,t=0,n=0){return ml(this,e,t,n),this}}class Ws extends Ji{constructor(){const e=Le(Ws.getDefaults(),arguments,["mapping","length"]);super(e),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper,un(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):x0(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(St.getDefaults(),{length:1024})}setMap(e,t=1024){const n=new Float32Array(t);for(let s=0,r=t;s<r;s++){const o=s/(r-1)*2-1;n[s]=e(o,s)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(n=>n.includes(e));Ne(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class yl extends Ji{constructor(){const e=Le(yl.getDefaults(),arguments,["value"]);super(e),this.name="Pow",this._exponentScaler=this.input=this.output=new Ws({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(Ji.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class wi{constructor(e,t){this.id=wi._eventId++,this._remainderTime=0;const n=Object.assign(wi.getDefaults(),t);this.transport=e,this.callback=n.callback,this._once=n.once,this.time=Math.floor(n.time),this._remainderTime=n.time-this.time}static getDefaults(){return{callback:at,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}wi._eventId=0;class Ml extends wi{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(Ml.getDefaults(),t);this.duration=n.duration,this._interval=n.interval,this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},wi.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return Mo(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new Ts(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){Mo(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new Ts(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);Ps(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class Ho extends Qt{constructor(){const e=Le(Ho.getDefaults(),arguments);super(e),this.name="Transport",this._loop=new j0(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new Sn,this._repeatedEvents=new X0,this._syncedSignals=[],this._swingAmount=0,this._ppq=e.ppq,this._clock=new Go({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),dt(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign(Qt.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const n=t%(this._swingTicks*2)/(this._swingTicks*2),s=Math.sin(n*Math.PI)*this._swingAmount;e+=new Ts(this.context,this._swingTicks*2/3).toSeconds()*s}mu(!0),this._timeline.forEachAtTime(t,n=>n.invoke(e)),mu(!1)}schedule(e,t){const n=new wi(this,{callback:e,time:new ir(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(e,t,n,s=1/0){const r=new Ml(this,{callback:e,duration:new An(this.context,s).toTicks(),interval:new An(this.context,t).toTicks(),time:new ir(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const n=new wi(this,{callback:e,once:!0,time:new ir(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(t,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new Ts(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let n;return je(t)&&(n=this.toTicks(t)),this._clock.start(e,n),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){un(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new An(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new An(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new Ts(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new Ts(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),n=this._clock.frequency.timeToTicks(e,t);this.ticks=n}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(t),s=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,t),r=t+s;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),n=this.getTicksAtTime(t),s=e-n%e;return this._clock.nextTickTime(s,t)}}syncSignal(e,t){const n=this.now();let s=this.bpm,r=1/(60/s.getValueAtTime(n)/this.PPQ),o=[];if(e.units==="time"){const c=.015625/r,l=new vt(c),u=new yl(-1),h=new vt(c);s.chain(l,u,h),s=h,r=1/r,o=[l,u,h]}t||(e.getValueAtTime(n)!==0?t=e.getValueAtTime(n)/r:t=0);const a=new vt(t);return s.connect(a),a.connect(e._param),o.push(a),this._syncedSignals.push({initial:e.value,nodes:o,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const n=this._syncedSignals[t];n.signal===e&&(n.nodes.forEach(s=>s.dispose()),n.signal.value=n.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),hl(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}Sr.mixin(Ho);ko(i=>{i.transport=new Ho({context:i})});Bo(i=>{i.transport.dispose()});let Yt=class extends Ie{constructor(e){super(e),this.input=void 0,this._state=new fl("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=at,this._syncedStop=at,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Hs({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,dt(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(Ie.getDefaults(),{mute:!1,onstop:at,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,n){let s=xn(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(s=this._clampToCurrentTime(s),!this._synced&&this._state.getValueAtTime(s)==="started")Ne(Ps(s,this._state.get(s).time),"Start time must be strictly greater than previous start time"),this._state.cancel(s),this._state.setStateAtTime("started",s),this.log("restart",s),this.restart(s,t,n);else if(this.log("start",s),this._state.setStateAtTime("started",s),this._synced){const r=this._state.get(s);r&&(r.offset=this.toSeconds(Es(t,0)),r.duration=n?this.toSeconds(n):void 0);const o=this.context.transport.schedule(a=>{this._start(a,t,n)},s);this._scheduled.push(o),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>s&&this._syncedStart(this.now(),this.context.transport.seconds)}else cd(this.context),this._start(s,t,n);return this}stop(e){let t=xn(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||je(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const n=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(n)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,n){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(Ps(t,0)){const n=this._state.get(t);if(n&&n.state==="started"&&n.time!==t){const s=t-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-s),this._start(e,this.toSeconds(n.offset)+s,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=at,this.unsync(),this._volume.dispose(),this._state.dispose(),this}};class Mr extends Ds{constructor(){const e=Le(Mr.getDefaults(),arguments,["url","onload"]);super(e),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1,Ai(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new et({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new ht(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(Ds.getDefaults(),{url:new ht,loop:!1,loopEnd:0,loopStart:0,onload:at,onerror:at,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,n,s=1){Ne(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,s),this.loop?t=Es(t,this.loopStart):t=Es(t,0);let o=Math.max(this.toSeconds(t),0);if(this.loop){const a=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=a-c;Za(o,a)&&(o=(o-c)%l+c),bn(o,this.buffer.duration)&&(o=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,Mo(o,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,o)),je(n)){let a=this.toSeconds(n);a=Math.max(a,0),this.stop(r+a)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}class ar extends Yt{constructor(){const e=Le(ar.getDefaults(),arguments,["type"]);super(e),this.name="Noise",this._source=null,this._playbackRate=e.playbackRate,this.type=e.type,this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Yt.getDefaults(),{fadeIn:0,fadeOut:0,playbackRate:1,type:"white"})}get type(){return this._type}set type(e){if(Ne(e in _u,"Noise: invalid type: "+e),this._type!==e&&(this._type=e,this.state==="started")){const t=this.now();this._stop(t),this._start(t)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e,this._source&&(this._source.playbackRate.value=e)}_start(e){const t=_u[this._type];this._source=new Mr({url:t,context:this.context,fadeIn:this._fadeIn,fadeOut:this._fadeOut,loop:!0,onended:()=>this.onstop(this),playbackRate:this._playbackRate}).connect(this.output),this._source.start(this.toSeconds(e),Math.random()*(t.duration-.001))}_stop(e){this._source&&(this._source.stop(this.toSeconds(e)),this._source=null)}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e,this._source&&(this._source.fadeIn=this._fadeIn)}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e,this._source&&(this._source.fadeOut=this._fadeOut)}_restart(e){this._stop(e),this._start(e)}dispose(){return super.dispose(),this._source&&this._source.disconnect(),this}}const os=44100*5,aa=2,Yn={brown:null,pink:null,white:null},_u={get brown(){if(!Yn.brown){const i=[];for(let e=0;e<aa;e++){const t=new Float32Array(os);i[e]=t;let n=0;for(let s=0;s<os;s++){const r=Math.random()*2-1;t[s]=(n+.02*r)/1.02,n=t[s],t[s]*=3.5}}Yn.brown=new ht().fromArray(i)}return Yn.brown},get pink(){if(!Yn.pink){const i=[];for(let e=0;e<aa;e++){const t=new Float32Array(os);i[e]=t;let n,s,r,o,a,c,l;n=s=r=o=a=c=l=0;for(let u=0;u<os;u++){const h=Math.random()*2-1;n=.99886*n+h*.0555179,s=.99332*s+h*.0750759,r=.969*r+h*.153852,o=.8665*o+h*.3104856,a=.55*a+h*.5329522,c=-.7616*c-h*.016898,t[u]=n+s+r+o+a+c+l+h*.5362,t[u]*=.11,l=h*.115926}}Yn.pink=new ht().fromArray(i)}return Yn.pink},get white(){if(!Yn.white){const i=[];for(let e=0;e<aa;e++){const t=new Float32Array(os);i[e]=t;for(let n=0;n<os;n++)t[n]=Math.random()*2-1}Yn.white=new ht().fromArray(i)}return Yn.white}};function ss(i,e){return At(this,void 0,void 0,function*(){const t=e/i.context.sampleRate,n=new Vo(1,t,i.context.sampleRate);return new i.constructor(Object.assign(i.get(),{frequency:2/t,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class Tl extends Ds{constructor(){const e=Le(Tl.getDefaults(),arguments,["frequency","type"]);super(e),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator],Ai(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new et({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new et({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),dt(this,["frequency","detune"])}static getDefaults(){return Object.assign(Ds.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class bt extends Yt{constructor(){const e=Le(bt.getDefaults(),arguments,["frequency","type"]);super(e),this.name="Oscillator",this._oscillator=null,this.frequency=new St({context:this.context,units:"frequency",value:e.frequency}),dt(this,"frequency"),this.detune=new St({context:this.context,units:"cents",value:e.detune}),dt(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(Yt.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),n=new Tl({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return bt._periodicWaveCache.find(t=>t.phase===this._phase&&P0(t.partials,this._partials));{const e=bt._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const n=this._getCachedPeriodicWave();if(je(n)){const{partials:s,wave:r}=n;this._wave=r,this._partials=s,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[s,r]=this._getRealImaginary(e,this._phase),o=this.context.createPeriodicWave(s,r);this._wave=o,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),bt._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:s,type:this._type,wave:this._wave}),bt._periodicWaveCache.length>100&&bt._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){gn(e,0);let t=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(t=n[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const s=new Float32Array(e);this._partials.forEach((r,o)=>s[o]=r),this._partials=Array.from(s),this.type=this._type}}_getRealImaginary(e,t){let s=2048;const r=new Float32Array(s),o=new Float32Array(s);let a=1;if(e==="custom"){if(a=this._partials.length+1,this._partialCount=this._partials.length,s=a,this._partials.length===0)return[r,o]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(a=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],a=Math.max(a,2),s=a):this._partialCount=0,this._partials=[]}for(let c=1;c<s;++c){const l=2/(c*Math.PI);let u;switch(e){case"sine":u=c<=a?1:0,this._partials[c-1]=u;break;case"square":u=c&1?2*l:0,this._partials[c-1]=u;break;case"sawtooth":u=l*(c&1?1:-1),this._partials[c-1]=u;break;case"triangle":c&1?u=2*(l*l)*(c-1>>1&1?-1:1):u=0,this._partials[c-1]=u;break;case"custom":u=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}u!==0?(r[c]=-u*Math.sin(t*c),o[c]=u*Math.cos(t*c)):(r[c]=0,o[c]=0)}return[r,o]}_inverseFFT(e,t,n){let s=0;const r=e.length;for(let o=0;o<r;o++)s+=e[o]*Math.cos(o*n)+t[o]*Math.sin(o*n);return s}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let n=0;const s=Math.PI*2,r=32;for(let o=0;o<r;o++)n=Math.max(this._inverseFFT(e,t,o/r*s),n);return I0(-this._inverseFFT(e,t,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}bt._periodicWaveCache=[];class Z0 extends Ji{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new Ws({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Is extends St{constructor(){const e=Le(Is.getDefaults(),arguments,["value"]);super(e),this.name="Multiply",this.override=!1,this._mult=this.input=this.output=new vt({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(St.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class Wo extends Yt{constructor(){const e=Le(Wo.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="AMOscillator",this._modulationScale=new Z0({context:this.context}),this._modulationNode=new vt({context:this.context}),this._carrier=new bt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new bt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Is({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),dt(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(bt.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class qo extends Yt{constructor(){const e=Le(qo.getDefaults(),arguments,["frequency","type","modulationType"]);super(e),this.name="FMOscillator",this._modulationNode=new vt({context:this.context,gain:0}),this._carrier=new bt({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new St({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new bt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Is({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Is({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),dt(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(bt.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class Tr extends Yt{constructor(){const e=Le(Tr.getDefaults(),arguments,["frequency","width"]);super(e),this.name="PulseOscillator",this._widthGate=new vt({context:this.context,gain:0}),this._thresh=new Ws({context:this.context,mapping:t=>t<=0?-1:1}),this.width=new St({context:this.context,units:"audioRange",value:e.width}),this._triangle=new bt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),dt(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(Yt.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class Xo extends Yt{constructor(){const e=Le(Xo.getDefaults(),arguments,["frequency","type","spread"]);super(e),this.name="FatOscillator",this._oscillators=[],this.frequency=new St({context:this.context,units:"frequency",value:e.frequency}),this.detune=new St({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,dt(this,["frequency","detune"])}static getDefaults(){return Object.assign(bt.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,n=e/(this._oscillators.length-1);this._forEach((s,r)=>s.detune.value=t+n*r)}}get count(){return this._oscillators.length}set count(e){if(gn(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const n=new bt({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):at});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[t]=n}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,n)=>t.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class Yo extends Yt{constructor(){const e=Le(Yo.getDefaults(),arguments,["frequency","modulationFrequency"]);super(e),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Is({context:this.context,value:2}),this._pulse=new Tr({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new bt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),dt(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(Yt.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const gu={am:Wo,fat:Xo,fm:qo,oscillator:bt,pulse:Tr,pwm:Yo};class Eo extends Yt{constructor(){const e=Le(Eo.getDefaults(),arguments,["frequency","type"]);super(e),this.name="OmniOscillator",this.frequency=new St({context:this.context,units:"frequency",value:e.frequency}),this.detune=new St({context:this.context,units:"cents",value:e.detune}),dt(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(bt.getDefaults(),qo.getDefaults(),Wo.getDefaults(),Xo.getDefaults(),Tr.getDefaults(),Yo.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=gu[e],n=this.now();if(this._oscillator){const s=this._oscillator;s.stop(n),this.context.setTimeout(()=>s.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof gu[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&oi(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&oi(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&ai(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(){return At(this,arguments,void 0,function*(e=1024){return ss(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function xd(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){gn(r,i,e),t.set(this,r)}})}}function pi(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){gn(this.toSeconds(r),i,e),t.set(this,r)}})}}class jo extends Yt{constructor(){const e=Le(jo.getDefaults(),arguments,["url","onload"]);super(e),this.name="Player",this._activeSources=new Set,this._buffer=new ht({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(Yt.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:at,onerror:at,playbackRate:1,reverse:!1})}load(e){return At(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=at){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,n){return super.start(e,t,n),this}_start(e,t,n){this._loop?t=Es(t,this._loopStart):t=Es(t,0);const s=this.toSeconds(t),r=n;n=Es(n,Math.max(this._buffer.duration-s,0));let o=this.toSeconds(n);o=o/this._playbackRate,e=this.toSeconds(e);const a=new Mr({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+o),this._state.setStateAtTime("stopped",e+o,{implicitEnd:!0})),this._activeSources.add(a),this._loop&&xn(r)?a.start(e,s):a.start(e,s,o-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(n=>n.stop(t))}restart(e,t,n){return super.restart(e,t,n),this}_restart(e,t,n){var s;(s=[...this._activeSources].pop())===null||s===void 0||s.stop(e),this._start(e,t,n)}seek(e,t){const n=this.toSeconds(t);if(this._state.getValueAtTime(n)==="started"){const s=this.toSeconds(e);this._stop(n),this._start(n,s)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&gn(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&gn(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),n=this._state.getNextState("stopped",t);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(s=>s.cancelStop())),this._activeSources.forEach(s=>{s.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}In([pi(0)],jo.prototype,"fadeIn",void 0);In([pi(0)],jo.prototype,"fadeOut",void 0);class $0 extends Ji{constructor(){super(...arguments),this.name="GainToAudio",this._norm=new Ws({context:this.context,mapping:e=>Math.abs(e)*2-1}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Ii extends Ie{constructor(){const e=Le(Ii.getDefaults(),arguments,["attack","decay","sustain","release"]);super(e),this.name="Envelope",this._sig=new St({context:this.context,value:0}),this.output=this._sig,this.input=void 0,this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(Ie.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(ai(e))return e;{let n;for(n in Lr)if(Lr[n][t]===e)return n;return e}}_setCurve(e,t,n){if(ai(n)&&Reflect.has(Lr,n)){const s=Lr[n];ji(s)?e!=="_decayCurve"&&(this[e]=s[t]):this[e]=s}else if(un(n)&&e!=="_decayCurve")this[e]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let s=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),o=this.getValueAtTime(e);if(o>0){const a=1/s;s=(1-o)/a}if(s<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,s,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,s,e);else{this._sig.cancelAndHoldAtTime(e);let a=this._attackCurve;for(let c=1;c<a.length;c++)if(a[c-1]<=o&&o<=a[c]){a=this._attackCurve.slice(c),a[0]=o;break}this._sig.setValueCurveAtTime(a,e,s,t)}if(r&&this.sustain<1){const a=t*this.sustain,c=e+s;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(a,r+c):this._sig.exponentialApproachValueAtTime(a,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,e):(Ne(un(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,n,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,n=1){return t=this.toSeconds(t),this.triggerAttack(t,n),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,n=0){return ml(this,e,t,n),this}asArray(){return At(this,arguments,void 0,function*(e=1024){const t=e/this.context.sampleRate,n=new Vo(1,t,this.context.sampleRate),s=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=s+this.toSeconds(this.release),o=r*.1,a=r+o,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/a,decay:t*this.toSeconds(this.decay)/a,release:t*this.toSeconds(this.release)/a,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(t*(s+o)/a,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}In([pi(0)],Ii.prototype,"attack",void 0);In([pi(0)],Ii.prototype,"decay",void 0);In([xd(0,1)],Ii.prototype,"sustain",void 0);In([pi(0)],Ii.prototype,"release",void 0);const Lr=(()=>{let e,t;const n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));const s=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;s[e]=d/10+t*.83}s[127]=1;const o=[],a=5;for(e=0;e<128;e++)o[e]=Math.ceil(e/127*a)/a;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function u(d){const p=new Array(d.length);for(let _=0;_<d.length;_++)p[_]=1-d[_];return p}function h(d){return d.slice(0).reverse()}return{bounce:{In:u(l),Out:l},cosine:{In:n,Out:h(n)},exponential:"exponential",linear:"linear",ripple:{In:s,Out:u(s)},sine:{In:c,Out:u(c)},step:{In:o,Out:u(o)}}})();class Ci extends Ie{constructor(){const e=Le(Ci.getDefaults(),arguments);super(e),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t),this._volume=this.output=new Hs({context:this.context,volume:e.volume}),this.volume=this._volume.volume,dt(this,"volume")}static getDefaults(){return Object.assign(Ie.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const n=this["_original_"+e]=this[e];this[e]=(...s)=>{const r=s[t],o=this.context.transport.schedule(a=>{s[t]=a,n.apply(this,s)},r);this._scheduledEvents.push(o)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,n,s){const r=this.toSeconds(n),o=this.toSeconds(t);return this.triggerAttack(e,r,s),this.triggerRelease(r+o),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class Qi extends Ci{constructor(){const e=Le(Qi.getDefaults(),arguments);super(e),this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Ci.getDefaults(),{detune:0,onsilence:at,portamento:0})}triggerAttack(e,t,n=1){this.log("triggerAttack",e,t,n);const s=this.toSeconds(t);return this._triggerEnvelopeAttack(s,n),this.setNote(e,s),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const n=this.toSeconds(t),s=e instanceof ln?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(s,r,n)}else this.frequency.setValueAtTime(s,n);return this}}In([pi(0)],Qi.prototype,"portamento",void 0);class bl extends Ii{constructor(){super(Le(bl.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new vt({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class es extends Qi{constructor(){const e=Le(es.getDefaults(),arguments);super(e),this.name="Synth",this.oscillator=new Eo(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new bl(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),dt(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(Qi.getDefaults(),{envelope:Object.assign(ja(Ii.getDefaults(),Object.keys(Ie.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(ja(Eo.getDefaults(),[...Object.keys(Yt.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),s=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+n+s)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Ao extends Ie{constructor(){const e=Le(Ao.getDefaults(),arguments,["frequency","type"]);super(e),this.name="BiquadFilter",this._filter=this.context.createBiquadFilter(),this.input=this.output=this._filter,this.Q=new et({context:this.context,units:"number",value:e.Q,param:this._filter.Q}),this.frequency=new et({context:this.context,units:"frequency",value:e.frequency,param:this._filter.frequency}),this.detune=new et({context:this.context,units:"cents",value:e.detune,param:this._filter.detune}),this.gain=new et({context:this.context,units:"decibels",convert:!1,value:e.gain,param:this._filter.gain}),this.type=e.type}static getDefaults(){return Object.assign(Ie.getDefaults(),{Q:1,type:"lowpass",frequency:350,detune:0,gain:0})}get type(){return this._filter.type}set type(e){Ne(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._filter.type=e}getFrequencyResponse(e=128){const t=new Float32Array(e);for(let o=0;o<e;o++){const c=Math.pow(o/e,2)*19980+20;t[o]=c}const n=new Float32Array(e),s=new Float32Array(e),r=this.context.createBiquadFilter();return r.type=this.type,r.Q.value=this.Q.value,r.frequency.value=this.frequency.value,r.gain.value=this.gain.value,r.getFrequencyResponse(t,n,s),n}dispose(){return super.dispose(),this._filter.disconnect(),this.Q.dispose(),this.frequency.dispose(),this.gain.dispose(),this.detune.dispose(),this}}class wo extends Ie{constructor(){const e=Le(wo.getDefaults(),arguments,["frequency","type","rolloff"]);super(e),this.name="Filter",this.input=new vt({context:this.context}),this.output=new vt({context:this.context}),this._filters=[],this._filters=[],this.Q=new St({context:this.context,units:"positive",value:e.Q}),this.frequency=new St({context:this.context,units:"frequency",value:e.frequency}),this.detune=new St({context:this.context,units:"cents",value:e.detune}),this.gain=new St({context:this.context,units:"decibels",convert:!1,value:e.gain}),this._type=e.type,this.rolloff=e.rolloff,dt(this,["detune","frequency","gain","Q"])}static getDefaults(){return Object.assign(Ie.getDefaults(),{Q:1,detune:0,frequency:350,gain:0,rolloff:-12,type:"lowpass"})}get type(){return this._type}set type(e){Ne(["lowpass","highpass","bandpass","lowshelf","highshelf","notch","allpass","peaking"].indexOf(e)!==-1,`Invalid filter type: ${e}`),this._type=e,this._filters.forEach(n=>n.type=e)}get rolloff(){return this._rolloff}set rolloff(e){const t=oi(e)?e:parseInt(e,10),n=[-12,-24,-48,-96];let s=n.indexOf(t);Ne(s!==-1,`rolloff can only be ${n.join(", ")}`),s+=1,this._rolloff=t,this.input.disconnect(),this._filters.forEach(r=>r.disconnect()),this._filters=new Array(s);for(let r=0;r<s;r++){const o=new Ao({context:this.context});o.type=this._type,this.frequency.connect(o.frequency),this.detune.connect(o.detune),this.Q.connect(o.Q),this.gain.connect(o.gain),this._filters[r]=o}this._internalChannels=this._filters,To(this.input,...this._internalChannels,this.output)}getFrequencyResponse(e=128){const t=new Ao({context:this.context,frequency:this.frequency.value,gain:this.gain.value,Q:this.Q.value,type:this._type,detune:this.detune.value}),n=new Float32Array(e).map(()=>1);return this._filters.forEach(()=>{t.getFrequencyResponse(e).forEach((r,o)=>n[o]*=r)}),t.dispose(),n}dispose(){return super.dispose(),this._filters.forEach(e=>{e.dispose()}),hl(this,["detune","frequency","gain","Q"]),this.frequency.dispose(),this.Q.dispose(),this.detune.dispose(),this.gain.dispose(),this}}class Zo extends es{constructor(){const e=Le(Zo.getDefaults(),arguments);super(e),this.name="MembraneSynth",this.portamento=0,this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,dt(this,["oscillator","envelope"])}static getDefaults(){return Zi(Qi.getDefaults(),es.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const n=this.toSeconds(t),s=this.toFrequency(e instanceof ln?e.toFrequency():e),r=s*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(s,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}In([xd(0)],Zo.prototype,"octaves",void 0);In([pi(0)],Zo.prototype,"pitchDecay",void 0);const Sd=new Set;function El(i){Sd.add(i)}function yd(i,e){const t=`registerProcessor("${i}", ${e})`;Sd.add(t)}const K0=`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;El(K0);const J0=`
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;El(J0);const Q0=`
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;El(Q0);const ev="feedback-comb-filter",tv=`
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;yd(ev,tv);class Al extends Ci{constructor(){const e=Le(Al.getDefaults(),arguments,["voice","options"]);super(e),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=s=>this.releaseAll(s),Ne(!oi(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const n=this._voices.indexOf(this._dummyVoice);this._voices.splice(n,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(Ci.getDefaults(),{maxPolyphony:32,options:{},voice:es})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(n=>n.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return Ne(e instanceof Qi,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else Uo("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,n){e.forEach(s=>{const r=new bo(this.context,s).toMidi(),o=this._getNextAvailableVoice();o&&(o.triggerAttack(s,t,n),this._activeVoices.push({midi:r,voice:o,released:!1}),this.log("triggerAttack",s,t))})}_triggerRelease(e,t){e.forEach(n=>{const s=new bo(this.context,n).toMidi(),r=this._activeVoices.find(({midi:o,released:a})=>o===s&&!a);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",n,t))})}_scheduleEvent(e,t,n,s){Ne(!this.disposed,"Synth was already disposed"),n<=this.now()?e==="attack"?this._triggerAttack(t,n,s):this._triggerRelease(t,n):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,n,s)},n-this.now())}triggerAttack(e,t,n){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("attack",e,s,n),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const n=this.toSeconds(t);return this._scheduleEvent("release",e,n),this}triggerAttackRelease(e,t,n,s){const r=this.toSeconds(n);if(this.triggerAttack(e,r,s),un(t)){Ne(un(e),"If the duration is an array, the notes must also be an array"),e=e;for(let o=0;o<e.length;o++){const a=t[Math.min(o,t.length-1)],c=this.toSeconds(a);Ne(c>0,"The duration must be greater than 0"),this.triggerRelease(e[o],r+c)}}else{const o=this.toSeconds(t);Ne(o>0,"The duration must be greater than 0"),this.triggerRelease(e,r+o)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=ja(e,["onsilence","context"]);return this.options=Zi(this.options,t),this._voices.forEach(n=>n.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:n})=>{n.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class $o extends Ci{constructor(){const e=Le($o.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");super(e),this.name="Sampler",this._activeSources=new Map;const t={};Object.keys(e.urls).forEach(n=>{const s=parseInt(n,10);if(Ne(Nr(n)||oi(s)&&isFinite(s),`url key is neither a note or midi pitch: ${n}`),Nr(n)){const r=new ln(this.context,n).toMidi();t[r]=e.urls[n]}else oi(s)&&isFinite(s)&&(t[s]=e.urls[s])}),this._buffers=new Sl({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Ci.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:at,onerror:at,release:.1,urls:{}})}_findClosest(e){let n=0;for(;n<96;){if(this._buffers.has(e+n))return-n;if(this._buffers.has(e-n))return n;n++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,n=1){return this.log("triggerAttack",e,t,n),Array.isArray(e)||(e=[e]),e.forEach(s=>{const r=gd(new ln(this.context,s).toFrequency()),o=Math.round(r),a=r-o,c=this._findClosest(o),l=o-c,u=this._buffers.get(l),h=_d(c+a),d=new Mr({url:u,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:h}).connect(this.output);d.start(t,0,u.duration/h,n),un(this._activeSources.get(o))||this._activeSources.set(o,[]),this._activeSources.get(o).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(o)){const p=this._activeSources.get(o),_=p.indexOf(d);_!==-1&&p.splice(_,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(n=>{const s=new ln(this.context,n).toMidi();if(this._activeSources.has(s)&&this._activeSources.get(s).length){const r=this._activeSources.get(s);t=this.toSeconds(t),r.forEach(o=>{o.stop(t)}),this._activeSources.set(s,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,n,s=1){const r=this.toSeconds(n);return this.triggerAttack(e,r,s),un(t)?(Ne(un(e),"notes must be an array when duration is array"),e.forEach((o,a)=>{const c=t[Math.min(a,t.length-1)];this.triggerRelease(o,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,n){if(Ne(Nr(e)||isFinite(e),`note must be a pitch or midi: ${e}`),Nr(e)){const s=new ln(this.context,e).toMidi();this._buffers.add(s,t,n)}else this._buffers.add(e,t,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}In([pi(0)],$o.prototype,"attack",void 0);In([pi(0)],$o.prototype,"release",void 0);class wl extends Ie{constructor(){const e=Le(wl.getDefaults(),arguments,["fade"]);super(e),this.name="CrossFade",this._panner=this.context.createStereoPanner(),this._split=this.context.createChannelSplitter(2),this._g2a=new $0({context:this.context}),this.a=new vt({context:this.context,gain:0}),this.b=new vt({context:this.context,gain:0}),this.output=new vt({context:this.context}),this._internalChannels=[this.a,this.b],this.fade=new St({context:this.context,units:"normalRange",value:e.fade}),dt(this,"fade"),this.context.getConstant(1).connect(this._panner),this._panner.connect(this._split),this._panner.channelCount=1,this._panner.channelCountMode="explicit",Ai(this._split,this.a.gain,0),Ai(this._split,this.b.gain,1),this.fade.chain(this._g2a,this._panner.pan),this.a.connect(this.output),this.b.connect(this.output)}static getDefaults(){return Object.assign(Ie.getDefaults(),{fade:.5})}dispose(){return super.dispose(),this.a.dispose(),this.b.dispose(),this.output.dispose(),this.fade.dispose(),this._g2a.dispose(),this._panner.disconnect(),this._split.disconnect(),this}}class vu extends Ie{constructor(e){super(e),this.name="Effect",this._dryWet=new wl({context:this.context}),this.wet=this._dryWet.fade,this.effectSend=new vt({context:this.context}),this.effectReturn=new vt({context:this.context}),this.input=new vt({context:this.context}),this.output=this._dryWet,this.input.fan(this._dryWet.a,this.effectSend),this.effectReturn.connect(this._dryWet.b),this.wet.setValueAtTime(e.wet,0),this._internalChannels=[this.effectReturn,this.effectSend],dt(this,"wet")}static getDefaults(){return Object.assign(Ie.getDefaults(),{wet:1})}connectEffect(e){return this._internalChannels.push(e),this.effectSend.chain(e,this.effectReturn),this}dispose(){return super.dispose(),this._dryWet.dispose(),this.effectSend.dispose(),this.effectReturn.dispose(),this.wet.dispose(),this}}class Ko extends Ie{constructor(){const e=Le(Ko.getDefaults(),arguments,["pan"]);super(e),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner,this.pan=new et({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",dt(this,"pan")}static getDefaults(){return Object.assign(Ie.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const nv="bit-crusher",iv=`
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;yd(nv,iv);class Cl extends Ie{constructor(){const e=Le(Cl.getDefaults(),arguments,["channels"]);super(e),this.name="Merge",this._merger=this.output=this.input=this.context.createChannelMerger(e.channels)}static getDefaults(){return Object.assign(Ie.getDefaults(),{channels:2})}dispose(){return super.dispose(),this._merger.disconnect(),this}}class Rl extends vu{constructor(){const e=Le(Rl.getDefaults(),arguments,["decay"]);super(e),this.name="Reverb",this._convolver=this.context.createConvolver(),this.ready=Promise.resolve();const t=this.toSeconds(e.decay);gn(t,.001),this._decay=t;const n=this.toSeconds(e.preDelay);gn(n,0),this._preDelay=n,this.generate(),this.connectEffect(this._convolver)}static getDefaults(){return Object.assign(vu.getDefaults(),{decay:1.5,preDelay:.01})}get decay(){return this._decay}set decay(e){e=this.toSeconds(e),gn(e,.001),this._decay=e,this.generate()}get preDelay(){return this._preDelay}set preDelay(e){e=this.toSeconds(e),gn(e,0),this._preDelay=e,this.generate()}generate(){return At(this,void 0,void 0,function*(){const e=this.ready,t=new Vo(2,this._decay+this._preDelay,this.context.sampleRate),n=new ar({context:t}),s=new ar({context:t}),r=new Cl({context:t});n.connect(r,0,0),s.connect(r,0,1);const o=new vt({context:t}).toDestination();r.connect(o),n.start(0),s.start(0),o.gain.setValueAtTime(0,0),o.gain.setValueAtTime(1,this._preDelay),o.gain.exponentialApproachValueAtTime(0,this._preDelay,this.decay);const a=t.render();return this.ready=a.then(at),yield e,this._convolver.buffer=(yield a).get(),this})}dispose(){return super.dispose(),this._convolver.disconnect(),this}}class Pt extends Ie{constructor(){const e=Le(Pt.getDefaults(),arguments,["solo"]);super(e),this.name="Solo",this.input=this.output=new vt({context:this.context}),Pt._allSolos.has(this.context)||Pt._allSolos.set(this.context,new Set),Pt._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(Ie.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),Pt._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){Pt._soloed.has(this.context)||Pt._soloed.set(this.context,new Set),Pt._soloed.get(this.context).add(this)}_removeSolo(){Pt._soloed.has(this.context)&&Pt._soloed.get(this.context).delete(this)}_isSoloed(){return Pt._soloed.has(this.context)&&Pt._soloed.get(this.context).has(this)}_noSolos(){return!Pt._soloed.has(this.context)||Pt._soloed.has(this.context)&&Pt._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),Pt._allSolos.get(this.context).delete(this),this._removeSolo(),this}}Pt._allSolos=new Map;Pt._soloed=new Map;class Pl extends Ie{constructor(){const e=Le(Pl.getDefaults(),arguments,["pan","volume"]);super(e),this.name="PanVol",this._panner=this.input=new Ko({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Hs({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,dt(this,["pan","volume"])}static getDefaults(){return Object.assign(Ie.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class bs extends Ie{constructor(){const e=Le(bs.getDefaults(),arguments,["volume","pan"]);super(e),this.name="Channel",this._solo=this.input=new Pt({solo:e.solo,context:this.context}),this._panVol=this.output=new Pl({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),dt(this,["pan","volume"])}static getDefaults(){return Object.assign(Ie.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return bs.buses.has(e)||bs.buses.set(e,new vt({context:this.context})),bs.buses.get(e)}send(e,t=0){const n=this._getBus(e),s=new vt({context:this.context,units:"decibels",gain:t});return this.connect(s),s.connect(n),s}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}bs.buses=new Map;class Dl extends Ie{constructor(){const e=Le(Dl.getDefaults(),arguments,["threshold","ratio"]);super(e),this.name="Compressor",this._compressor=this.context.createDynamicsCompressor(),this.input=this._compressor,this.output=this._compressor,this.threshold=new et({minValue:this._compressor.threshold.minValue,maxValue:this._compressor.threshold.maxValue,context:this.context,convert:!1,param:this._compressor.threshold,units:"decibels",value:e.threshold}),this.attack=new et({minValue:this._compressor.attack.minValue,maxValue:this._compressor.attack.maxValue,context:this.context,param:this._compressor.attack,units:"time",value:e.attack}),this.release=new et({minValue:this._compressor.release.minValue,maxValue:this._compressor.release.maxValue,context:this.context,param:this._compressor.release,units:"time",value:e.release}),this.knee=new et({minValue:this._compressor.knee.minValue,maxValue:this._compressor.knee.maxValue,context:this.context,convert:!1,param:this._compressor.knee,units:"decibels",value:e.knee}),this.ratio=new et({minValue:this._compressor.ratio.minValue,maxValue:this._compressor.ratio.maxValue,context:this.context,convert:!1,param:this._compressor.ratio,units:"positive",value:e.ratio}),dt(this,["knee","release","attack","ratio","threshold"])}static getDefaults(){return Object.assign(Ie.getDefaults(),{attack:.003,knee:30,ratio:12,release:.25,threshold:-24})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.disconnect(),this.attack.dispose(),this.release.dispose(),this.threshold.dispose(),this.ratio.dispose(),this.knee.dispose(),this}}class Il extends Ie{constructor(){const e=Le(Il.getDefaults(),arguments,["threshold"]);super(e),this.name="Limiter",this._compressor=this.input=this.output=new Dl({context:this.context,ratio:20,attack:.003,release:.01,threshold:e.threshold}),this.threshold=this._compressor.threshold,dt(this,"threshold")}static getDefaults(){return Object.assign(Ie.getDefaults(),{threshold:-12})}get reduction(){return this._compressor.reduction}dispose(){return super.dispose(),this._compressor.dispose(),this.threshold.dispose(),this}}function sv(){return vn().now()}vn().transport;vn().destination;vn().destination;vn().listener;vn().draw;const rv=vn();const Nl="182",ov=0,xu=1,av=2,oo=1,cv=2,tr=3,Ri=0,en=1,ei=2,ii=0,As=1,$a=2,Su=3,yu=4,lv=5,Gi=100,uv=101,hv=102,dv=103,fv=104,pv=200,mv=201,_v=202,gv=203,Ka=204,Ja=205,vv=206,xv=207,Sv=208,yv=209,Mv=210,Tv=211,bv=212,Ev=213,Av=214,Qa=0,ec=1,tc=2,Ns=3,nc=4,ic=5,sc=6,rc=7,Md=0,wv=1,Cv=2,Bn=0,Td=1,bd=2,Ed=3,Ad=4,wd=5,Cd=6,Rd=7,Pd=300,ts=301,Ls=302,oc=303,ac=304,Jo=306,cc=1e3,ti=1001,lc=1002,Ot=1003,Rv=1004,Fr=1005,Vt=1006,ca=1007,Xi=1008,_n=1009,Dd=1010,Id=1011,cr=1012,Ll=1013,Gn=1014,Un=1015,ci=1016,Fl=1017,Ol=1018,lr=1020,Nd=35902,Ld=35899,Fd=1021,Od=1022,wn=1023,li=1026,Yi=1027,Ud=1028,Ul=1029,Fs=1030,kl=1031,Bl=1033,ao=33776,co=33777,lo=33778,uo=33779,uc=35840,hc=35841,dc=35842,fc=35843,pc=36196,mc=37492,_c=37496,gc=37488,vc=37489,xc=37490,Sc=37491,yc=37808,Mc=37809,Tc=37810,bc=37811,Ec=37812,Ac=37813,wc=37814,Cc=37815,Rc=37816,Pc=37817,Dc=37818,Ic=37819,Nc=37820,Lc=37821,Fc=36492,Oc=36494,Uc=36495,kc=36283,Bc=36284,Vc=36285,zc=36286,Pv=3200,Dv=0,Iv=1,Ti="",pn="srgb",Os="srgb-linear",Co="linear",rt="srgb",as=7680,Mu=519,Nv=512,Lv=513,Fv=514,Vl=515,Ov=516,Uv=517,zl=518,kv=519,Tu=35044,bu="300 es",kn=2e3,Ro=2001;function kd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Po(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bv(){const i=Po("canvas");return i.style.display="block",i}const Eu={};function Au(...i){const e="THREE."+i.shift();console.log(e,...i)}function Be(...i){const e="THREE."+i.shift();console.warn(e,...i)}function Qe(...i){const e="THREE."+i.shift();console.error(e,...i)}function ur(...i){const e=i.join(" ");e in Eu||(Eu[e]=!0,Be(...i))}function Vv(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}class qs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],la=Math.PI/180,Gc=180/Math.PI;function br(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function zv(i,e){return(i%e+e)%e}function ua(i,e,t){return(1-t)*i+t*e}function js(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class nt{constructor(e=0,t=0){nt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Er{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],p=r[o+1],_=r[o+2],g=r[o+3];if(a<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a>=1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(h!==g||c!==d||l!==p||u!==_){let m=c*d+l*p+u*_+h*g;m<0&&(d=-d,p=-p,_=-_,g=-g,m=-m);let f=1-a;if(m<.9995){const T=Math.acos(m),b=Math.sin(T);f=Math.sin(f*T)/b,a=Math.sin(a*T)/b,c=c*f+d*a,l=l*f+p*a,u=u*f+_*a,h=h*f+g*a}else{c=c*f+d*a,l=l*f+p*a,u=u*f+_*a,h=h*f+g*a;const T=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=T,l*=T,u*=T,h*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],d=r[o+1],p=r[o+2],_=r[o+3];return e[t]=a*_+u*h+c*p-l*d,e[t+1]=c*_+u*d+l*h-a*p,e[t+2]=l*_+u*p+a*d-c*h,e[t+3]=u*_-a*h-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),d=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"YXZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"ZXY":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"ZYX":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"YZX":this._x=d*u*h+l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h-d*p*_;break;case"XZY":this._x=d*u*h-l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h+d*p*_;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ha.copy(this).projectOnVector(e),this.sub(ha)}reflect(e){return this.sub(ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ha=new G,wu=new Er;class Ve{constructor(e,t,n,s,r,o,a,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],_=n[8],g=s[0],m=s[3],f=s[6],T=s[1],b=s[4],w=s[7],S=s[2],M=s[5],E=s[8];return r[0]=o*g+a*T+c*S,r[3]=o*m+a*b+c*M,r[6]=o*f+a*w+c*E,r[1]=l*g+u*T+h*S,r[4]=l*m+u*b+h*M,r[7]=l*f+u*w+h*E,r[2]=d*g+p*T+_*S,r[5]=d*m+p*b+_*M,r[8]=d*f+p*w+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,d=a*c-u*r,p=l*r-o*c,_=t*h+n*d+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(s*l-u*n)*g,e[2]=(a*n-s*o)*g,e[3]=d*g,e[4]=(u*t-s*c)*g,e[5]=(s*r-a*t)*g,e[6]=p*g,e[7]=(n*c-l*t)*g,e[8]=(o*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new Ve,Cu=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ru=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gv(){const i={enabled:!0,workingColorSpace:Os,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?Co:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ur("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ur("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Os]:{primaries:e,whitePoint:n,transfer:Co,toXYZ:Cu,fromXYZ:Ru,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Cu,fromXYZ:Ru,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),i}const Ke=Gv();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let cs;class Hv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{cs===void 0&&(cs=Po("canvas")),cs.width=e.width,cs.height=e.height;const s=cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Po("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(si(t[n]/255)*255):t[n]=si(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wv=0;class Gl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wv++}),this.uuid=br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(fa(s[o].image)):r.push(fa(s[o]))}else r=fa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function fa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hv.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let qv=0;const pa=new G;class Xt extends qs{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,n=ti,s=ti,r=Vt,o=Xi,a=wn,c=_n,l=Xt.DEFAULT_ANISOTROPY,u=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qv++}),this.uuid=br(),this.name="",this.source=new Gl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pa).x}get height(){return this.source.getSize(pa).y}get depth(){return this.source.getSize(pa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cc:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case lc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cc:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case lc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Pd;Xt.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,n=0,s=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],_=c[9],g=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,w=(p+1)/2,S=(f+1)/2,M=(u+d)/4,E=(h+g)/4,C=(_+m)/4;return b>w&&b>S?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=M/n,r=E/n):w>S?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=M/s,r=C/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=E/r,s=C/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(m-_)/T,this.y=(h-g)/T,this.z=(d-u)/T,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xv extends qs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Xt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Gl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends Xv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bd extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yv extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ar{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Or.copy(n.boundingBox)),Or.applyMatrix4(e.matrixWorld),this.union(Or)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),Ur.subVectors(this.max,Zs),ls.subVectors(e.a,Zs),us.subVectors(e.b,Zs),hs.subVectors(e.c,Zs),_i.subVectors(us,ls),gi.subVectors(hs,us),Fi.subVectors(ls,hs);let t=[0,-_i.z,_i.y,0,-gi.z,gi.y,0,-Fi.z,Fi.y,_i.z,0,-_i.x,gi.z,0,-gi.x,Fi.z,0,-Fi.x,-_i.y,_i.x,0,-gi.y,gi.x,0,-Fi.y,Fi.x,0];return!ma(t,ls,us,hs,Ur)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,ls,us,hs,Ur))?!1:(kr.crossVectors(_i,gi),t=[kr.x,kr.y,kr.z],ma(t,ls,us,hs,Ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new G,new G,new G,new G,new G,new G,new G,new G],yn=new G,Or=new Ar,ls=new G,us=new G,hs=new G,_i=new G,gi=new G,Fi=new G,Zs=new G,Ur=new G,kr=new G,Oi=new G;function ma(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Oi.fromArray(i,r);const a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),u=n.dot(Oi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const jv=new Ar,$s=new G,_a=new G;class Qo{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jv.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$s.subVectors(e,this.center);const t=$s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector($s,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_a.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($s.copy(e.center).add(_a)),this.expandByPoint($s.copy(e.center).sub(_a))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Zn=new G,ga=new G,Br=new G,vi=new G,va=new G,Vr=new G,xa=new G;class Vd{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ga.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(ga);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Br),a=vi.dot(this.direction),c=-vi.dot(Br),l=vi.lengthSq(),u=Math.abs(1-o*o);let h,d,p,_;if(u>0)if(h=o*c-a,d=o*a-c,_=r*u,h>=0)if(d>=-_)if(d<=_){const g=1/u;h*=g,d*=g,p=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-_?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=_?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ga).addScaledVector(Br,d),p}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,s,r){va.subVectors(t,e),Vr.subVectors(n,e),xa.crossVectors(va,Vr);let o=this.direction.dot(xa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,e);const c=a*this.direction.dot(Vr.crossVectors(vi,Vr));if(c<0)return null;const l=a*this.direction.dot(va.cross(vi));if(l<0||c+l>o)return null;const u=-a*vi.dot(xa);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wt{constructor(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m){wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m)}set(e,t,n,s,r,o,a,c,l,u,h,d,p,_,g,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=_,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),o=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,p=o*h,_=a*u,g=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+_*l,t[5]=d-g*l,t[9]=-a*c,t[2]=g-d*l,t[6]=_+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d+g*a,t[4]=_*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-_,t[6]=g+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d-g*a,t[4]=-o*h,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*u,t[9]=g-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*u,p=o*h,_=a*u,g=a*h;t[0]=c*u,t[4]=_*l-p,t[8]=d*l+g,t[1]=c*h,t[5]=g*l+d,t[9]=p*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,_=a*c,g=a*l;t[0]=c*u,t[4]=g-d*h,t[8]=_*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+_,t[10]=d-g*h}else if(e.order==="XZY"){const d=o*c,p=o*l,_=a*c,g=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+g,t[5]=o*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=a*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zv,e,$v)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),xi.crossVectors(n,on),xi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),xi.crossVectors(n,on)),xi.normalize(),zr.crossVectors(on,xi),s[0]=xi.x,s[4]=zr.x,s[8]=on.x,s[1]=xi.y,s[5]=zr.y,s[9]=on.y,s[2]=xi.z,s[6]=zr.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],_=n[2],g=n[6],m=n[10],f=n[14],T=n[3],b=n[7],w=n[11],S=n[15],M=s[0],E=s[4],C=s[8],x=s[12],y=s[1],R=s[5],D=s[9],N=s[13],k=s[2],V=s[6],U=s[10],L=s[14],q=s[3],j=s[7],$=s[11],Q=s[15];return r[0]=o*M+a*y+c*k+l*q,r[4]=o*E+a*R+c*V+l*j,r[8]=o*C+a*D+c*U+l*$,r[12]=o*x+a*N+c*L+l*Q,r[1]=u*M+h*y+d*k+p*q,r[5]=u*E+h*R+d*V+p*j,r[9]=u*C+h*D+d*U+p*$,r[13]=u*x+h*N+d*L+p*Q,r[2]=_*M+g*y+m*k+f*q,r[6]=_*E+g*R+m*V+f*j,r[10]=_*C+g*D+m*U+f*$,r[14]=_*x+g*N+m*L+f*Q,r[3]=T*M+b*y+w*k+S*q,r[7]=T*E+b*R+w*V+S*j,r[11]=T*C+b*D+w*U+S*$,r[15]=T*x+b*N+w*L+S*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],p=e[14],_=e[3],g=e[7],m=e[11],f=e[15],T=c*p-l*d,b=a*p-l*h,w=a*d-c*h,S=o*p-l*u,M=o*d-c*u,E=o*h-a*u;return t*(g*T-m*b+f*w)-n*(_*T-m*S+f*M)+s*(_*b-g*S+f*E)-r*(_*w-g*M+m*E)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],p=e[11],_=e[12],g=e[13],m=e[14],f=e[15],T=h*m*l-g*d*l+g*c*p-a*m*p-h*c*f+a*d*f,b=_*d*l-u*m*l-_*c*p+o*m*p+u*c*f-o*d*f,w=u*g*l-_*h*l+_*a*p-o*g*p-u*a*f+o*h*f,S=_*h*c-u*g*c-_*a*d+o*g*d+u*a*m-o*h*m,M=t*T+n*b+s*w+r*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=T*E,e[1]=(g*d*r-h*m*r-g*s*p+n*m*p+h*s*f-n*d*f)*E,e[2]=(a*m*r-g*c*r+g*s*l-n*m*l-a*s*f+n*c*f)*E,e[3]=(h*c*r-a*d*r-h*s*l+n*d*l+a*s*p-n*c*p)*E,e[4]=b*E,e[5]=(u*m*r-_*d*r+_*s*p-t*m*p-u*s*f+t*d*f)*E,e[6]=(_*c*r-o*m*r-_*s*l+t*m*l+o*s*f-t*c*f)*E,e[7]=(o*d*r-u*c*r+u*s*l-t*d*l-o*s*p+t*c*p)*E,e[8]=w*E,e[9]=(_*h*r-u*g*r-_*n*p+t*g*p+u*n*f-t*h*f)*E,e[10]=(o*g*r-_*a*r+_*n*l-t*g*l-o*n*f+t*a*f)*E,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*p-t*a*p)*E,e[12]=S*E,e[13]=(u*g*s-_*h*s+_*n*d-t*g*d-u*n*m+t*h*m)*E,e[14]=(_*a*s-o*g*s-_*n*c+t*g*c+o*n*m-t*a*m)*E,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*d+t*a*d)*E,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,d=r*l,p=r*u,_=r*h,g=o*u,m=o*h,f=a*h,T=c*l,b=c*u,w=c*h,S=n.x,M=n.y,E=n.z;return s[0]=(1-(g+f))*S,s[1]=(p+w)*S,s[2]=(_-b)*S,s[3]=0,s[4]=(p-w)*M,s[5]=(1-(d+f))*M,s[6]=(m+T)*M,s[7]=0,s[8]=(_+b)*E,s[9]=(m-T)*E,s[10]=(1-(d+g))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;if(e.x=s[12],e.y=s[13],e.z=s[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let r=ds.set(s[0],s[1],s[2]).length();const o=ds.set(s[4],s[5],s[6]).length(),a=ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),Mn.copy(this);const l=1/r,u=1/o,h=1/a;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=h,Mn.elements[9]*=h,Mn.elements[10]*=h,t.setFromRotationMatrix(Mn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=kn,c=!1){const l=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),p=(n+s)/(n-s);let _,g;if(c)_=r/(o-r),g=o*r/(o-r);else if(a===kn)_=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ro)_=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=kn,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),p=-(n+s)/(n-s);let _,g;if(c)_=1/(o-r),g=o/(o-r);else if(a===kn)_=-2/(o-r),g=-(o+r)/(o-r);else if(a===Ro)_=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ds=new G,Mn=new wt,Zv=new G(0,0,0),$v=new G(1,1,1),xi=new G,zr=new G,on=new G,Pu=new wt,Du=new Er;class ui{constructor(e=0,t=0,n=0,s=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Du.setFromEuler(this),this.setFromQuaternion(Du,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class zd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kv=0;const Iu=new G,fs=new Er,$n=new wt,Gr=new G,Ks=new G,Jv=new G,Qv=new Er,Nu=new G(1,0,0),Lu=new G(0,1,0),Fu=new G(0,0,1),Ou={type:"added"},ex={type:"removed"},ps={type:"childadded",child:null},Sa={type:"childremoved",child:null};class tn extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kv++}),this.uuid=br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new G,t=new ui,n=new Er,s=new G(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ve}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(Nu,e)}rotateY(e){return this.rotateOnAxis(Lu,e)}rotateZ(e){return this.rotateOnAxis(Fu,e)}translateOnAxis(e,t){return Iu.copy(e).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nu,e)}translateY(e){return this.translateOnAxis(Lu,e)}translateZ(e){return this.translateOnAxis(Fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gr.copy(e):Gr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Ks,Gr,this.up):$n.lookAt(Gr,Ks,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),fs.setFromRotationMatrix($n),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ou),ps.child=e,this.dispatchEvent(ps),ps.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ex),Sa.child=e,this.dispatchEvent(Sa),Sa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ou),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Jv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Qv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new G(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new G,Kn=new G,ya=new G,Jn=new G,ms=new G,_s=new G,Uu=new G,Ma=new G,Ta=new G,ba=new G,Ea=new Et,Aa=new Et,wa=new Et;class En{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Tn.subVectors(e,t),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Tn.subVectors(s,t),Kn.subVectors(n,t),ya.subVectors(e,t);const o=Tn.dot(Tn),a=Tn.dot(Kn),c=Tn.dot(ya),l=Kn.dot(Kn),u=Kn.dot(ya),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,p=(l*c-a*u)*d,_=(o*u-a*c)*d;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(o,Jn.y),c.addScaledVector(a,Jn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ea.setScalar(0),Aa.setScalar(0),wa.setScalar(0),Ea.fromBufferAttribute(e,t),Aa.fromBufferAttribute(e,n),wa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ea,r.x),o.addScaledVector(Aa,r.y),o.addScaledVector(wa,r.z),o}static isFrontFacing(e,t,n,s){return Tn.subVectors(n,t),Kn.subVectors(e,t),Tn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Tn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return En.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ms.subVectors(s,n),_s.subVectors(r,n),Ma.subVectors(e,n);const c=ms.dot(Ma),l=_s.dot(Ma);if(c<=0&&l<=0)return t.copy(n);Ta.subVectors(e,s);const u=ms.dot(Ta),h=_s.dot(Ta);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(ms,o);ba.subVectors(e,r);const p=ms.dot(ba),_=_s.dot(ba);if(_>=0&&p<=_)return t.copy(r);const g=p*l-c*_;if(g<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(_s,a);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return Uu.subVectors(r,s),a=(h-u)/(h-u+(p-_)),t.copy(s).addScaledVector(Uu,a);const f=1/(m+g+d);return o=g*f,a=d*f,t.copy(n).addScaledVector(ms,o).addScaledVector(_s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function Ca(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ot{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=zv(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ca(o,r,e+1/3),this.g=Ca(o,r,e),this.b=Ca(o,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=pn){function n(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const n=Gd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return Ke.workingToColorSpace(Bt.copy(this),e),Math.round($e(Bt.r*255,0,255))*65536+Math.round($e(Bt.g*255,0,255))*256+Math.round($e(Bt.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(Bt.copy(this),t);const n=Bt.r,s=Bt.g,r=Bt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=pn){Ke.workingToColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,s=Bt.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Hr);const n=ua(Si.h,Hr.h,t),s=ua(Si.s,Hr.s,t),r=ua(Si.l,Hr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new ot;ot.NAMES=Gd;let tx=0;class wr extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=br(),this.name="",this.type="Material",this.blending=As,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ka,this.blendDst=Ja,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Ja&&(n.blendDst=this.blendDst),this.blendEquation!==Gi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(n.stencilFail=this.stencilFail),this.stencilZFail!==as&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Hd extends wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Md,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new G,Wr=new nt;let nx=0;class hn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Tu,this.updateRanges=[],this.gpuType=Un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=js(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=js(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=js(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=js(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tu&&(e.usage=this.usage),e}}class Wd extends hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class qd extends hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ri extends hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ix=0;const fn=new wt,Ra=new tn,gs=new G,an=new Ar,Js=new Ar,Lt=new G;class Nn extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kd(e)?qd:Wd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return Ra.lookAt(e),Ra.updateMatrix(),this.applyMatrix4(Ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ri(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ar);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(Lt.addVectors(an.min,Js.min),an.expandByPoint(Lt),Lt.addVectors(an.max,Js.max),an.expandByPoint(Lt)):(an.expandByPoint(Js.min),an.expandByPoint(Js.max))}an.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Lt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Lt.fromBufferAttribute(a,l),c&&(gs.fromBufferAttribute(e,l),Lt.add(gs)),s=Math.max(s,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new G,c[C]=new G;const l=new G,u=new G,h=new G,d=new nt,p=new nt,_=new nt,g=new G,m=new G;function f(C,x,y){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,y),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,x),_.fromBufferAttribute(r,y),u.sub(l),h.sub(l),p.sub(d),_.sub(d);const R=1/(p.x*_.y-_.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(R),a[C].add(g),a[x].add(g),a[y].add(g),c[C].add(m),c[x].add(m),c[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let C=0,x=T.length;C<x;++C){const y=T[C],R=y.start,D=y.count;for(let N=R,k=R+D;N<k;N+=3)f(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const b=new G,w=new G,S=new G,M=new G;function E(C){S.fromBufferAttribute(s,C),M.copy(S);const x=a[C];b.copy(x),b.sub(S.multiplyScalar(S.dot(x))).normalize(),w.crossVectors(M,x);const R=w.dot(c[C])<0?-1:1;o.setXYZW(C,b.x,b.y,b.z,R)}for(let C=0,x=T.length;C<x;++C){const y=T[C],R=y.start,D=y.count;for(let N=R,k=R+D;N<k;N+=3)E(e.getX(N+0)),E(e.getX(N+1)),E(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new G,r=new G,o=new G,a=new G,c=new G,l=new G,u=new G,h=new G;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let g=0,m=c.length;g<m;g++){a.isInterleavedBufferAttribute?p=c[g]*a.data.stride+a.offset:p=c[g]*u;for(let f=0;f<u;f++)d[_++]=l[p++]}return new hn(d,u,h)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ku=new wt,Ui=new Vd,qr=new Qo,Bu=new G,Xr=new G,Yr=new G,jr=new G,Pa=new G,Zr=new G,Vu=new G,$r=new G;class hi extends tn{constructor(e=new Nn,t=new Hd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Zr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Pa.fromBufferAttribute(h,e),o?Zr.addScaledVector(Pa,u):Zr.addScaledVector(Pa.sub(t),u))}t.add(Zr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),Ui.copy(e.ray).recast(e.near),!(qr.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(qr,Bu)===null||Ui.origin.distanceToSquared(Bu)>(e.far-e.near)**2))&&(ku.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(ku),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ui)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=o[m.materialIndex],T=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let w=T,S=b;w<S;w+=3){const M=a.getX(w),E=a.getX(w+1),C=a.getX(w+2);s=Kr(this,f,e,n,l,u,h,M,E,C),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const T=a.getX(m),b=a.getX(m+1),w=a.getX(m+2);s=Kr(this,o,e,n,l,u,h,T,b,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=o[m.materialIndex],T=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let w=T,S=b;w<S;w+=3){const M=w,E=w+1,C=w+2;s=Kr(this,f,e,n,l,u,h,M,E,C),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const T=m,b=m+1,w=m+2;s=Kr(this,o,e,n,l,u,h,T,b,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function sx(i,e,t,n,s,r,o,a){let c;if(e.side===en?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ri,a),c===null)return null;$r.copy(a),$r.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($r);return l<t.near||l>t.far?null:{distance:l,point:$r.clone(),object:i}}function Kr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Xr),i.getVertexPosition(c,Yr),i.getVertexPosition(l,jr);const u=sx(i,e,t,n,Xr,Yr,jr,Vu);if(u){const h=new G;En.getBarycoord(Vu,Xr,Yr,jr,h),s&&(u.uv=En.getInterpolatedAttribute(s,a,c,l,h,new nt)),r&&(u.uv1=En.getInterpolatedAttribute(r,a,c,l,h,new nt)),o&&(u.normal=En.getInterpolatedAttribute(o,a,c,l,h,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new G,materialIndex:0};En.getNormal(Xr,Yr,jr,d.normal),u.face=d,u.barycoord=h}return u}class Cr extends Nn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ri(l,3)),this.setAttribute("normal",new ri(u,3)),this.setAttribute("uv",new ri(h,2));function _(g,m,f,T,b,w,S,M,E,C,x){const y=w/E,R=S/C,D=w/2,N=S/2,k=M/2,V=E+1,U=C+1;let L=0,q=0;const j=new G;for(let $=0;$<U;$++){const Q=$*R-N;for(let ve=0;ve<V;ve++){const we=ve*y-D;j[g]=we*T,j[m]=Q*b,j[f]=k,l.push(j.x,j.y,j.z),j[g]=0,j[m]=0,j[f]=M>0?1:-1,u.push(j.x,j.y,j.z),h.push(ve/E),h.push(1-$/C),L+=1}}for(let $=0;$<C;$++)for(let Q=0;Q<E;Q++){const ve=d+Q+V*$,we=d+Q+V*($+1),Ye=d+(Q+1)+V*($+1),ye=d+(Q+1)+V*$;c.push(ve,we,ye),c.push(we,Ye,ye),q+=6}a.addGroup(p,q,x),p+=q,d+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Us(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ht(i){const e={};for(let t=0;t<i.length;t++){const n=Us(i[t]);for(const s in n)e[s]=n[s]}return e}function rx(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const ox={clone:Us,merge:Ht};var ax=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ax,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=rx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Yd extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yi=new G,zu=new nt,Gu=new nt;class mn extends Yd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(la*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gc*2*Math.atan(Math.tan(la*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,zu,Gu),t.subVectors(Gu,zu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(la*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vs=-90,xs=1;class lx extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(vs,xs,e,t);s.layers=this.layers,this.add(s);const r=new mn(vs,xs,e,t);r.layers=this.layers,this.add(r);const o=new mn(vs,xs,e,t);o.layers=this.layers,this.add(o);const a=new mn(vs,xs,e,t);a.layers=this.layers,this.add(a);const c=new mn(vs,xs,e,t);c.layers=this.layers,this.add(c);const l=new mn(vs,xs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class jd extends Xt{constructor(e=[],t=ts,n,s,r,o,a,c,l,u){super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zd extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new jd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Cr(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:Us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:ii});r.uniforms.tEquirect.value=t;const o=new hi(s,r),a=t.minFilter;return t.minFilter===Xi&&(t.minFilter=Vt),new lx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class Jr extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ux={type:"move"};class Da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),f=this._getHandJoint(l,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ux)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Jr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class hx extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class dx extends Xt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Ot,u=Ot,h,d){super(null,o,a,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ia=new G,fx=new G,px=new Ve;class zi{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ia.subVectors(n,t).cross(fx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ia),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||px.getNormalMatrix(e),s=this.coplanarPoint(Ia).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new Qo,mx=new nt(.5,.5),Qr=new G;class $d{constructor(e=new zi,t=new zi,n=new zi,s=new zi,r=new zi,o=new zi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],p=r[7],_=r[8],g=r[9],m=r[10],f=r[11],T=r[12],b=r[13],w=r[14],S=r[15];if(s[0].setComponents(l-o,p-u,f-_,S-T).normalize(),s[1].setComponents(l+o,p+u,f+_,S+T).normalize(),s[2].setComponents(l+a,p+h,f+g,S+b).normalize(),s[3].setComponents(l-a,p-h,f-g,S-b).normalize(),n)s[4].setComponents(c,d,m,w).normalize(),s[5].setComponents(l-c,p-d,f-m,S-w).normalize();else if(s[4].setComponents(l-c,p-d,f-m,S-w).normalize(),t===kn)s[5].setComponents(l+c,p+d,f+m,S+w).normalize();else if(t===Ro)s[5].setComponents(c,d,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);const t=mx.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Qr.x=s.normal.x>0?e.max.x:e.min.x,Qr.y=s.normal.y>0?e.max.y:e.min.y,Qr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _x extends wr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hu=new wt,Hc=new Vd,eo=new Qo,to=new G;class gx extends tn{constructor(e=new Nn,t=new _x){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(s),eo.radius+=r,e.ray.intersectsSphere(eo)===!1)return;Hu.copy(s).invert(),Hc.copy(e.ray).applyMatrix4(Hu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let _=d,g=p;_<g;_++){const m=l.getX(_);to.fromBufferAttribute(h,m),Wu(to,m,c,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,g=p;_<g;_++)to.fromBufferAttribute(h,_),Wu(to,_,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wu(i,e,t,n,s,r,o){const a=Hc.distanceSqToPoint(i);if(a<t){const c=new G;Hc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class hr extends Xt{constructor(e,t,n=Gn,s,r,o,a=Ot,c=Ot,l,u=li,h=1){if(u!==li&&u!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vx extends hr{constructor(e,t=Gn,n=ts,s,r,o=Ot,a=Ot,c,l=li){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kd extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ea extends Nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,d=t/c,p=[],_=[],g=[],m=[];for(let f=0;f<u;f++){const T=f*d-o;for(let b=0;b<l;b++){const w=b*h-r;_.push(w,-T,0),g.push(0,0,1),m.push(b/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let T=0;T<a;T++){const b=T+l*f,w=T+l*(f+1),S=T+1+l*(f+1),M=T+1+l*f;p.push(b,w,M),p.push(w,S,M)}this.setIndex(p),this.setAttribute("position",new ri(_,3)),this.setAttribute("normal",new ri(g,3)),this.setAttribute("uv",new ri(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.width,e.height,e.widthSegments,e.heightSegments)}}class xx extends Rn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Sx extends wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yx extends wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Jd extends Yd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mx extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function qu(i,e,t,n){const s=Tx(n);switch(t){case Fd:return i*e;case Ud:return i*e/s.components*s.byteLength;case Ul:return i*e/s.components*s.byteLength;case Fs:return i*e*2/s.components*s.byteLength;case kl:return i*e*2/s.components*s.byteLength;case Od:return i*e*3/s.components*s.byteLength;case wn:return i*e*4/s.components*s.byteLength;case Bl:return i*e*4/s.components*s.byteLength;case ao:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:case fc:return Math.max(i,16)*Math.max(e,8)/4;case uc:case dc:return Math.max(i,8)*Math.max(e,8)/2;case pc:case mc:case gc:case vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _c:case xc:case Sc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case bc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case wc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Rc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ic:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Nc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Lc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Fc:case Oc:case Uc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kc:case Bc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Vc:case zc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tx(i){switch(i){case _n:case Dd:return{byteLength:1,components:1};case cr:case Id:case ci:return{byteLength:2,components:1};case Fl:case Ol:return{byteLength:2,components:4};case Gn:case Ll:case Un:return{byteLength:4,components:1};case Nd:case Ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nl}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nl);function Qd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function bx(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<h.length;p++){const _=h[d],g=h[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++d,h[d]=g)}h.length=d+1;for(let p=0,_=h.length;p<_;p++){const g=h[p];i.bufferSubData(l,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ex=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ax=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Px=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ix=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ox=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ux=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$x=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tS="gl_FragColor = linearToOutputTexel( gl_FragColor );",nS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,sS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,aS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_S=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,SS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,MS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,TS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ES=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,AS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,CS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,DS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,IS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,NS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,US=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,BS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,HS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,WS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,YS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$S=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,KS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,JS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ey=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ty=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ny=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ry=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ay=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ly=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,uy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,py=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,my=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_y=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,My=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ty=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const by=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ey=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Py=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Iy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ny=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ky=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,By=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$y=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ky=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Ex,alphahash_pars_fragment:Ax,alphamap_fragment:wx,alphamap_pars_fragment:Cx,alphatest_fragment:Rx,alphatest_pars_fragment:Px,aomap_fragment:Dx,aomap_pars_fragment:Ix,batching_pars_vertex:Nx,batching_vertex:Lx,begin_vertex:Fx,beginnormal_vertex:Ox,bsdfs:Ux,iridescence_fragment:kx,bumpmap_pars_fragment:Bx,clipping_planes_fragment:Vx,clipping_planes_pars_fragment:zx,clipping_planes_pars_vertex:Gx,clipping_planes_vertex:Hx,color_fragment:Wx,color_pars_fragment:qx,color_pars_vertex:Xx,color_vertex:Yx,common:jx,cube_uv_reflection_fragment:Zx,defaultnormal_vertex:$x,displacementmap_pars_vertex:Kx,displacementmap_vertex:Jx,emissivemap_fragment:Qx,emissivemap_pars_fragment:eS,colorspace_fragment:tS,colorspace_pars_fragment:nS,envmap_fragment:iS,envmap_common_pars_fragment:sS,envmap_pars_fragment:rS,envmap_pars_vertex:oS,envmap_physical_pars_fragment:gS,envmap_vertex:aS,fog_vertex:cS,fog_pars_vertex:lS,fog_fragment:uS,fog_pars_fragment:hS,gradientmap_pars_fragment:dS,lightmap_pars_fragment:fS,lights_lambert_fragment:pS,lights_lambert_pars_fragment:mS,lights_pars_begin:_S,lights_toon_fragment:vS,lights_toon_pars_fragment:xS,lights_phong_fragment:SS,lights_phong_pars_fragment:yS,lights_physical_fragment:MS,lights_physical_pars_fragment:TS,lights_fragment_begin:bS,lights_fragment_maps:ES,lights_fragment_end:AS,logdepthbuf_fragment:wS,logdepthbuf_pars_fragment:CS,logdepthbuf_pars_vertex:RS,logdepthbuf_vertex:PS,map_fragment:DS,map_pars_fragment:IS,map_particle_fragment:NS,map_particle_pars_fragment:LS,metalnessmap_fragment:FS,metalnessmap_pars_fragment:OS,morphinstance_vertex:US,morphcolor_vertex:kS,morphnormal_vertex:BS,morphtarget_pars_vertex:VS,morphtarget_vertex:zS,normal_fragment_begin:GS,normal_fragment_maps:HS,normal_pars_fragment:WS,normal_pars_vertex:qS,normal_vertex:XS,normalmap_pars_fragment:YS,clearcoat_normal_fragment_begin:jS,clearcoat_normal_fragment_maps:ZS,clearcoat_pars_fragment:$S,iridescence_pars_fragment:KS,opaque_fragment:JS,packing:QS,premultiplied_alpha_fragment:ey,project_vertex:ty,dithering_fragment:ny,dithering_pars_fragment:iy,roughnessmap_fragment:sy,roughnessmap_pars_fragment:ry,shadowmap_pars_fragment:oy,shadowmap_pars_vertex:ay,shadowmap_vertex:cy,shadowmask_pars_fragment:ly,skinbase_vertex:uy,skinning_pars_vertex:hy,skinning_vertex:dy,skinnormal_vertex:fy,specularmap_fragment:py,specularmap_pars_fragment:my,tonemapping_fragment:_y,tonemapping_pars_fragment:gy,transmission_fragment:vy,transmission_pars_fragment:xy,uv_pars_fragment:Sy,uv_pars_vertex:yy,uv_vertex:My,worldpos_vertex:Ty,background_vert:by,background_frag:Ey,backgroundCube_vert:Ay,backgroundCube_frag:wy,cube_vert:Cy,cube_frag:Ry,depth_vert:Py,depth_frag:Dy,distance_vert:Iy,distance_frag:Ny,equirect_vert:Ly,equirect_frag:Fy,linedashed_vert:Oy,linedashed_frag:Uy,meshbasic_vert:ky,meshbasic_frag:By,meshlambert_vert:Vy,meshlambert_frag:zy,meshmatcap_vert:Gy,meshmatcap_frag:Hy,meshnormal_vert:Wy,meshnormal_frag:qy,meshphong_vert:Xy,meshphong_frag:Yy,meshphysical_vert:jy,meshphysical_frag:Zy,meshtoon_vert:$y,meshtoon_frag:Ky,points_vert:Jy,points_frag:Qy,shadow_vert:eM,shadow_frag:tM,sprite_vert:nM,sprite_frag:iM},de={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},On={basic:{uniforms:Ht([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ht([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ht([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ht([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ht([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ot(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ht([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ht([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ht([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ht([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ht([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ht([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Ht([de.common,de.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Ht([de.lights,de.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};On.physical={uniforms:Ht([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const no={r:0,b:0,g:0},Bi=new ui,sM=new wt;function rM(i,e,t,n,s,r,o){const a=new ot(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function _(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?t:e).get(w)),w}function g(b){let w=!1;const S=_(b);S===null?f(a,c):S&&S.isColor&&(f(S,1),w=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,w){const S=_(w);S&&(S.isCubeTexture||S.mapping===Jo)?(u===void 0&&(u=new hi(new Cr(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:Us(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Bi.copy(w.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(sM.makeRotationFromEuler(Bi)),u.material.toneMapped=Ke.getTransfer(S.colorSpace)!==rt,(h!==S||d!==S.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=S,d=S.version,p=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new hi(new ea(2,2),new Rn({name:"BackgroundMaterial",uniforms:Us(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function f(b,w){b.getRGB(no,Xd(i)),n.buffers.color.setClear(no.r,no.g,no.b,w,o)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),c=w,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,f(a,c)},render:g,addToRenderList:m,dispose:T}}function oM(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,R,D,N,k){let V=!1;const U=h(N,D,R);r!==U&&(r=U,l(r.object)),V=p(y,N,D,k),V&&_(y,N,D,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,w(y,R,D,N),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,R,D){const N=D.wireframe===!0;let k=n[y.id];k===void 0&&(k={},n[y.id]=k);let V=k[R.id];V===void 0&&(V={},k[R.id]=V);let U=V[N];return U===void 0&&(U=d(c()),V[N]=U),U}function d(y){const R=[],D=[],N=[];for(let k=0;k<t;k++)R[k]=0,D[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:N,object:y,attributes:{},index:null}}function p(y,R,D,N){const k=r.attributes,V=R.attributes;let U=0;const L=D.getAttributes();for(const q in L)if(L[q].location>=0){const $=k[q];let Q=V[q];if(Q===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor)),$===void 0||$.attribute!==Q||Q&&$.data!==Q.data)return!0;U++}return r.attributesNum!==U||r.index!==N}function _(y,R,D,N){const k={},V=R.attributes;let U=0;const L=D.getAttributes();for(const q in L)if(L[q].location>=0){let $=V[q];$===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&($=y.instanceColor));const Q={};Q.attribute=$,$&&$.data&&(Q.data=$.data),k[q]=Q,U++}r.attributes=k,r.attributesNum=U,r.index=N}function g(){const y=r.newAttributes;for(let R=0,D=y.length;R<D;R++)y[R]=0}function m(y){f(y,0)}function f(y,R){const D=r.newAttributes,N=r.enabledAttributes,k=r.attributeDivisors;D[y]=1,N[y]===0&&(i.enableVertexAttribArray(y),N[y]=1),k[y]!==R&&(i.vertexAttribDivisor(y,R),k[y]=R)}function T(){const y=r.newAttributes,R=r.enabledAttributes;for(let D=0,N=R.length;D<N;D++)R[D]!==y[D]&&(i.disableVertexAttribArray(D),R[D]=0)}function b(y,R,D,N,k,V,U){U===!0?i.vertexAttribIPointer(y,R,D,k,V):i.vertexAttribPointer(y,R,D,N,k,V)}function w(y,R,D,N){g();const k=N.attributes,V=D.getAttributes(),U=R.defaultAttributeValues;for(const L in V){const q=V[L];if(q.location>=0){let j=k[L];if(j===void 0&&(L==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),L==="instanceColor"&&y.instanceColor&&(j=y.instanceColor)),j!==void 0){const $=j.normalized,Q=j.itemSize,ve=e.get(j);if(ve===void 0)continue;const we=ve.buffer,Ye=ve.type,ye=ve.bytesPerElement,X=Ye===i.INT||Ye===i.UNSIGNED_INT||j.gpuType===Ll;if(j.isInterleavedBufferAttribute){const J=j.data,K=J.stride,Fe=j.offset;if(J.isInstancedInterleavedBuffer){for(let me=0;me<q.locationSize;me++)f(q.location+me,J.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let me=0;me<q.locationSize;me++)m(q.location+me);i.bindBuffer(i.ARRAY_BUFFER,we);for(let me=0;me<q.locationSize;me++)b(q.location+me,Q/q.locationSize,Ye,$,K*ye,(Fe+Q/q.locationSize*me)*ye,X)}else{if(j.isInstancedBufferAttribute){for(let J=0;J<q.locationSize;J++)f(q.location+J,j.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let J=0;J<q.locationSize;J++)m(q.location+J);i.bindBuffer(i.ARRAY_BUFFER,we);for(let J=0;J<q.locationSize;J++)b(q.location+J,Q/q.locationSize,Ye,$,Q*ye,Q/q.locationSize*J*ye,X)}}else if(U!==void 0){const $=U[L];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(q.location,$);break;case 3:i.vertexAttrib3fv(q.location,$);break;case 4:i.vertexAttrib4fv(q.location,$);break;default:i.vertexAttrib1fv(q.location,$)}}}}T()}function S(){C();for(const y in n){const R=n[y];for(const D in R){const N=R[D];for(const k in N)u(N[k].object),delete N[k];delete R[D]}delete n[y]}}function M(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const D in R){const N=R[D];for(const k in N)u(N[k].object),delete N[k];delete R[D]}delete n[y.id]}function E(y){for(const R in n){const D=n[R];if(D[y.id]===void 0)continue;const N=D[y.id];for(const k in N)u(N[k].object),delete N[k];delete D[y.id]}}function C(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:x,dispose:S,releaseStatesOfGeometry:M,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:T}}function aM(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];t.update(p,n,1)}function c(l,u,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],u[_],d[_]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*d[g];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function cM(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==wn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===ci&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==_n&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Un&&!C)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),w=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:w,maxSamples:S,samples:M}}function lM(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new zi,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{const T=r?0:n,b=T*4;let w=f.clippingState||null;c.value=w,w=u(_,d,b,p);for(let S=0;S!==b;++S)w[S]=t[S];f.clippingState=w,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=c.value,_!==!0||m===null){const f=p+g*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,w=p;b!==g;++b,w+=4)o.copy(h[b]).applyMatrix4(T,a),o.normal.toArray(m,w),m[w+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function uM(i){let e=new WeakMap;function t(o,a){return a===oc?o.mapping=ts:a===ac&&(o.mapping=Ls),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===oc||a===ac)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Zd(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const bi=4,Xu=[.125,.215,.35,.446,.526,.582],Hi=20,hM=256,Qs=new Jd,Yu=new ot;let Na=null,La=0,Fa=0,Oa=!1;const dM=new G;class ju{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=dM}=r;Na=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Na,La,Fa),this._renderer.xr.enabled=Oa,e.scissorTest=!1,Ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Na=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:ci,format:wn,colorSpace:Os,depthBuffer:!1},s=Zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zu(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fM(r)),this._blurMaterial=mM(r,e,t),this._ggxMaterial=pM(r,e,t)}return s}_compileMaterial(e){const t=new hi(new Nn,e);this._renderer.compile(t,Qs)}_sceneToCubeUV(e,t,n,s,r){const c=new mn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Yu),h.toneMapping=Bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new hi(new Cr,new Hd({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let f=!1;const T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,f=!0):(m.color.copy(Yu),f=!0);for(let b=0;b<6;b++){const w=b%3;w===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):w===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const S=this._cubeSize;Ss(s,w*S,b>2?S:0,S,S),h.setRenderTarget(s),f&&h.render(g,c),h.render(e,c)}h.toneMapping=p,h.autoClear=d,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ts||e.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$u());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ss(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Qs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),d=0+l*1.25,p=h*d,{_lodMax:_}=this,g=this._sizeLods[n],m=3*g*(n>_-bi?n-_+bi:0),f=4*(this._cubeSize-g);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,Ss(r,m,f,3*g,2*g),s.setRenderTarget(r),s.render(a,Qs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,Ss(e,m,f,3*g,2*g),s.setRenderTarget(e),s.render(a,Qs)}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=l;const d=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),g=r/_,m=isFinite(r)?1+Math.floor(u*g):Hi;m>Hi&&Be(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const f=[];let T=0;for(let E=0;E<Hi;++E){const C=E/g,x=Math.exp(-C*C/2);f.push(x),E===0?T+=x:E<m&&(T+=2*x)}for(let E=0;E<f.length;E++)f[E]=f[E]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=_,d.mipInt.value=b-n;const w=this._sizeLods[s],S=3*w*(s>b-bi?s-b+bi:0),M=4*(this._cubeSize-w);Ss(t,S,M,3*w,2*w),c.setRenderTarget(t),c.render(h,Qs)}}function fM(i){const e=[],t=[],n=[];let s=i;const r=i-bi+1+Xu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-bi?c=Xu[o-i+bi-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,g=3,m=2,f=1,T=new Float32Array(g*_*p),b=new Float32Array(m*_*p),w=new Float32Array(f*_*p);for(let M=0;M<p;M++){const E=M%3*2/3-1,C=M>2?0:-1,x=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];T.set(x,g*_*M),b.set(d,m*_*M);const y=[M,M,M,M,M,M];w.set(y,f*_*M)}const S=new Nn;S.setAttribute("position",new hn(T,g)),S.setAttribute("uv",new hn(b,m)),S.setAttribute("faceIndex",new hn(w,f)),n.push(new hi(S,null)),s>bi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Zu(i,e,t){const n=new Vn(i,e,t);return n.texture.mapping=Jo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function pM(i,e,t){return new Rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ta(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function mM(i,e,t){const n=new Float32Array(Hi),s=new G(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function $u(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ku(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ta(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _M(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===oc||c===ac,u=c===ts||c===Ls;if(l||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new ju(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new ju(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function gM(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ur("WebGLRenderer: "+n+" extension not supported."),s}}}function vM(i,e,t,n){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const p in d)e.update(d[p],i.ARRAY_BUFFER)}function l(h){const d=[],p=h.index,_=h.attributes.position;let g=0;if(p!==null){const T=p.array;g=p.version;for(let b=0,w=T.length;b<w;b+=3){const S=T[b+0],M=T[b+1],E=T[b+2];d.push(S,M,M,E,E,S)}}else if(_!==void 0){const T=_.array;g=_.version;for(let b=0,w=T.length/3-1;b<w;b+=3){const S=b+0,M=b+1,E=b+2;d.push(S,M,M,E,E,S)}}else return;const m=new(kd(d)?qd:Wd)(d,1);m.version=g;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function xM(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,_){_!==0&&(i.drawElementsInstanced(n,p,r,d*o,_),t.update(p,n,_))}function u(d,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,_);let m=0;for(let f=0;f<_;f++)m+=p[f];t.update(m,n,1)}function h(d,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],g[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,g,0,_);let f=0;for(let T=0;T<_;T++)f+=p[T]*g[T];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function SM(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yM(i,e,t){const n=new WeakMap,s=new Et;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let y=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let w=0;_===!0&&(w=1),g===!0&&(w=2),m===!0&&(w=3);let S=a.attributes.position.count*w,M=1;S>e.maxTextureSize&&(M=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*M*4*h),C=new Bd(E,S,M,h);C.type=Un,C.needsUpdate=!0;const x=w*4;for(let R=0;R<h;R++){const D=f[R],N=T[R],k=b[R],V=S*M*4*R;for(let U=0;U<D.count;U++){const L=U*x;_===!0&&(s.fromBufferAttribute(D,U),E[V+L+0]=s.x,E[V+L+1]=s.y,E[V+L+2]=s.z,E[V+L+3]=0),g===!0&&(s.fromBufferAttribute(N,U),E[V+L+4]=s.x,E[V+L+5]=s.y,E[V+L+6]=s.z,E[V+L+7]=0),m===!0&&(s.fromBufferAttribute(k,U),E[V+L+8]=s.x,E[V+L+9]=s.y,E[V+L+10]=s.z,E[V+L+11]=k.itemSize===4?s.w:1)}}d={count:h,texture:C,size:new nt(S,M)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<l.length;m++)_+=l[m];const g=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function MM(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const TM={[Td]:"LINEAR_TONE_MAPPING",[bd]:"REINHARD_TONE_MAPPING",[Ed]:"CINEON_TONE_MAPPING",[Ad]:"ACES_FILMIC_TONE_MAPPING",[Cd]:"AGX_TONE_MAPPING",[Rd]:"NEUTRAL_TONE_MAPPING",[wd]:"CUSTOM_TONE_MAPPING"};function bM(i,e,t,n,s){const r=new Vn(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),o=new Vn(e,t,{type:ci,depthBuffer:!1,stencilBuffer:!1}),a=new Nn;a.setAttribute("position",new ri([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new ri([0,2,0,0,2,0],2));const c=new xx({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new hi(a,c),u=new Jd(-1,1,1,-1,0,1);let h=null,d=null,p=!1,_,g=null,m=[],f=!1;this.setSize=function(T,b){r.setSize(T,b),o.setSize(T,b);for(let w=0;w<m.length;w++){const S=m[w];S.setSize&&S.setSize(T,b)}},this.setEffects=function(T){m=T,f=m.length>0&&m[0].isRenderPass===!0;const b=r.width,w=r.height;for(let S=0;S<m.length;S++){const M=m[S];M.setSize&&M.setSize(b,w)}},this.begin=function(T,b){if(p||T.toneMapping===Bn&&m.length===0)return!1;if(g=b,b!==null){const w=b.width,S=b.height;(r.width!==w||r.height!==S)&&this.setSize(w,S)}return f===!1&&T.setRenderTarget(r),_=T.toneMapping,T.toneMapping=Bn,!0},this.hasRenderPass=function(){return f},this.end=function(T,b){T.toneMapping=_,p=!0;let w=r,S=o;for(let M=0;M<m.length;M++){const E=m[M];if(E.enabled!==!1&&(E.render(T,S,w,b),E.needsSwap!==!1)){const C=w;w=S,S=C}}if(h!==T.outputColorSpace||d!==T.toneMapping){h=T.outputColorSpace,d=T.toneMapping,c.defines={},Ke.getTransfer(h)===rt&&(c.defines.SRGB_TRANSFER="");const M=TM[d];M&&(c.defines[M]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,T.setRenderTarget(g),T.render(l,u),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.dispose(),o.dispose(),a.dispose(),c.dispose()}}const ef=new Xt,Wc=new hr(1,1),tf=new Bd,nf=new Yv,sf=new jd,Ju=[],Qu=[],eh=new Float32Array(16),th=new Float32Array(9),nh=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ju[s];if(r===void 0&&(r=new Float32Array(s),Ju[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function na(i,e){let t=Qu[e];t===void 0&&(t=new Int32Array(e),Qu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function EM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function AM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function wM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function CM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function RM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;nh.set(n),i.uniformMatrix2fv(this.addr,!1,nh),Nt(t,n)}}function PM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;th.set(n),i.uniformMatrix3fv(this.addr,!1,th),Nt(t,n)}}function DM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;eh.set(n),i.uniformMatrix4fv(this.addr,!1,eh),Nt(t,n)}}function IM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function NM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function LM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function FM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function OM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function UM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function kM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function BM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function VM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wc.compareFunction=t.isReversedDepthBuffer()?zl:Vl,r=Wc):r=ef,t.setTexture2D(e||r,s)}function zM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||nf,s)}function GM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sf,s)}function HM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||tf,s)}function WM(i){switch(i){case 5126:return EM;case 35664:return AM;case 35665:return wM;case 35666:return CM;case 35674:return RM;case 35675:return PM;case 35676:return DM;case 5124:case 35670:return IM;case 35667:case 35671:return NM;case 35668:case 35672:return LM;case 35669:case 35673:return FM;case 5125:return OM;case 36294:return UM;case 36295:return kM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return VM;case 35679:case 36299:case 36307:return zM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return HM}}function qM(i,e){i.uniform1fv(this.addr,e)}function XM(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function YM(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function jM(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function ZM(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $M(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function KM(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function JM(i,e){i.uniform1iv(this.addr,e)}function QM(i,e){i.uniform2iv(this.addr,e)}function eT(i,e){i.uniform3iv(this.addr,e)}function tT(i,e){i.uniform4iv(this.addr,e)}function nT(i,e){i.uniform1uiv(this.addr,e)}function iT(i,e){i.uniform2uiv(this.addr,e)}function sT(i,e){i.uniform3uiv(this.addr,e)}function rT(i,e){i.uniform4uiv(this.addr,e)}function oT(i,e,t){const n=this.cache,s=e.length,r=na(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Wc:o=ef;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function aT(i,e,t){const n=this.cache,s=e.length,r=na(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||nf,r[o])}function cT(i,e,t){const n=this.cache,s=e.length,r=na(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||sf,r[o])}function lT(i,e,t){const n=this.cache,s=e.length,r=na(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||tf,r[o])}function uT(i){switch(i){case 5126:return qM;case 35664:return XM;case 35665:return YM;case 35666:return jM;case 35674:return ZM;case 35675:return $M;case 35676:return KM;case 5124:case 35670:return JM;case 35667:case 35671:return QM;case 35668:case 35672:return eT;case 35669:case 35673:return tT;case 5125:return nT;case 36294:return iT;case 36295:return sT;case 36296:return rT;case 35678:case 36198:case 36298:case 36306:case 35682:return oT;case 35679:case 36299:case 36307:return aT;case 35680:case 36300:case 36308:case 36293:return cT;case 36289:case 36303:case 36311:case 36292:return lT}}class hT{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=WM(t.type)}}class dT{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uT(t.type)}}class fT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function ih(i,e){i.seq.push(e),i.map[e.id]=e}function pT(i,e,t){const n=i.name,s=n.length;for(Ua.lastIndex=0;;){const r=Ua.exec(n),o=Ua.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ih(t,l===void 0?new hT(a,i,e):new dT(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new fT(a),ih(t,h)),t=h}}}class ho{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);pT(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function sh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const mT=37297;let _T=0;function gT(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const rh=new Ve;function vT(i){Ke._getMatrix(rh,Ke.workingColorSpace,i);const e=`mat3( ${rh.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Co:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function oh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+gT(i.getShaderSource(e),a)}else return r}function xT(i,e){const t=vT(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ST={[Td]:"Linear",[bd]:"Reinhard",[Ed]:"Cineon",[Ad]:"ACESFilmic",[Cd]:"AgX",[Rd]:"Neutral",[wd]:"Custom"};function yT(i,e){const t=ST[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const io=new G;function MT(){Ke.getLuminanceCoefficients(io);const i=io.x.toFixed(4),e=io.y.toFixed(4),t=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function bT(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ET(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function nr(i){return i!==""}function ah(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ch(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AT=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(i){return i.replace(AT,CT)}const wT=new Map;function CT(i,e){let t=Ge[e];if(t===void 0){const n=wT.get(e);if(n!==void 0)t=Ge[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return qc(t)}const RT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lh(i){return i.replace(RT,PT)}function PT(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const DT={[oo]:"SHADOWMAP_TYPE_PCF",[tr]:"SHADOWMAP_TYPE_VSM"};function IT(i){return DT[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const NT={[ts]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[Jo]:"ENVMAP_TYPE_CUBE_UV"};function LT(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":NT[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const FT={[Ls]:"ENVMAP_MODE_REFRACTION"};function OT(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":FT[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const UT={[Md]:"ENVMAP_BLENDING_MULTIPLY",[wv]:"ENVMAP_BLENDING_MIX",[Cv]:"ENVMAP_BLENDING_ADD"};function kT(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":UT[i.combine]||"ENVMAP_BLENDING_NONE"}function BT(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function VT(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=IT(t),l=LT(t),u=OT(t),h=kT(t),d=BT(t),p=TT(t),_=bT(r),g=s.createProgram();let m,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(nr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(nr).join(`
`),f.length>0&&(f+=`
`)):(m=[uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),f=[uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Bn?yT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,xT("linearToOutputTexel",t.outputColorSpace),MT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nr).join(`
`)),o=qc(o),o=ah(o,t),o=ch(o,t),a=qc(a),a=ah(a,t),a=ch(a,t),o=lh(o),a=lh(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=T+m+o,w=T+f+a,S=sh(s,s.VERTEX_SHADER,b),M=sh(s,s.FRAGMENT_SHADER,w);s.attachShader(g,S),s.attachShader(g,M),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(R){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(g)||"",N=s.getShaderInfoLog(S)||"",k=s.getShaderInfoLog(M)||"",V=D.trim(),U=N.trim(),L=k.trim();let q=!0,j=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,S,M);else{const $=oh(s,S,"vertex"),Q=oh(s,M,"fragment");Qe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+$+`
`+Q)}else V!==""?Be("WebGLProgram: Program Info Log:",V):(U===""||L==="")&&(j=!1);j&&(R.diagnostics={runnable:q,programLog:V,vertexShader:{log:U,prefix:m},fragmentShader:{log:L,prefix:f}})}s.deleteShader(S),s.deleteShader(M),C=new ho(s,g),x=ET(s,g)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let x;this.getAttributes=function(){return x===void 0&&E(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,mT)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_T++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=M,this}let zT=0;class GT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new HT(e),t.set(e,n)),n}}class HT{constructor(e){this.id=zT++,this.code=e,this.usedTimes=0}}function WT(i,e,t,n,s,r,o){const a=new zd,c=new GT,l=new Set,u=[],h=new Map,d=s.logarithmicDepthBuffer;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,y,R,D,N){const k=D.fog,V=N.geometry,U=x.isMeshStandardMaterial?D.environment:null,L=(x.isMeshStandardMaterial?t:e).get(x.envMap||U),q=L&&L.mapping===Jo?L.image.height:null,j=_[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&Be("WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const $=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Q=$!==void 0?$.length:0;let ve=0;V.morphAttributes.position!==void 0&&(ve=1),V.morphAttributes.normal!==void 0&&(ve=2),V.morphAttributes.color!==void 0&&(ve=3);let we,Ye,ye,X;if(j){const it=On[j];we=it.vertexShader,Ye=it.fragmentShader}else we=x.vertexShader,Ye=x.fragmentShader,c.update(x),ye=c.getVertexShaderID(x),X=c.getFragmentShaderID(x);const J=i.getRenderTarget(),K=i.state.buffers.depth.getReversed(),Fe=N.isInstancedMesh===!0,me=N.isBatchedMesh===!0,He=!!x.map,_t=!!x.matcap,Ze=!!L,tt=!!x.aoMap,ne=!!x.lightMap,re=!!x.bumpMap,ze=!!x.normalMap,I=!!x.displacementMap,Re=!!x.emissiveMap,Ce=!!x.metalnessMap,We=!!x.roughnessMap,_e=x.anisotropy>0,P=x.clearcoat>0,v=x.dispersion>0,O=x.iridescence>0,Z=x.sheen>0,te=x.transmission>0,Y=_e&&!!x.anisotropyMap,Ee=P&&!!x.clearcoatMap,ce=P&&!!x.clearcoatNormalMap,Te=P&&!!x.clearcoatRoughnessMap,Ue=O&&!!x.iridescenceMap,se=O&&!!x.iridescenceThicknessMap,ue=Z&&!!x.sheenColorMap,Me=Z&&!!x.sheenRoughnessMap,be=!!x.specularMap,le=!!x.specularColorMap,qe=!!x.specularIntensityMap,F=te&&!!x.transmissionMap,pe=te&&!!x.thicknessMap,oe=!!x.gradientMap,ge=!!x.alphaMap,ie=x.alphaTest>0,ee=!!x.alphaHash,ae=!!x.extensions;let ke=Bn;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ke=i.toneMapping);const ft={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:we,fragmentShader:Ye,defines:x.defines,customVertexShaderID:ye,customFragmentShaderID:X,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:me,batchingColor:me&&N._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&N.instanceColor!==null,instancingMorph:Fe&&N.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Os,alphaToCoverage:!!x.alphaToCoverage,map:He,matcap:_t,envMap:Ze,envMapMode:Ze&&L.mapping,envMapCubeUVHeight:q,aoMap:tt,lightMap:ne,bumpMap:re,normalMap:ze,displacementMap:I,emissiveMap:Re,normalMapObjectSpace:ze&&x.normalMapType===Iv,normalMapTangentSpace:ze&&x.normalMapType===Dv,metalnessMap:Ce,roughnessMap:We,anisotropy:_e,anisotropyMap:Y,clearcoat:P,clearcoatMap:Ee,clearcoatNormalMap:ce,clearcoatRoughnessMap:Te,dispersion:v,iridescence:O,iridescenceMap:Ue,iridescenceThicknessMap:se,sheen:Z,sheenColorMap:ue,sheenRoughnessMap:Me,specularMap:be,specularColorMap:le,specularIntensityMap:qe,transmission:te,transmissionMap:F,thicknessMap:pe,gradientMap:oe,opaque:x.transparent===!1&&x.blending===As&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:ie,alphaHash:ee,combine:x.combine,mapUv:He&&g(x.map.channel),aoMapUv:tt&&g(x.aoMap.channel),lightMapUv:ne&&g(x.lightMap.channel),bumpMapUv:re&&g(x.bumpMap.channel),normalMapUv:ze&&g(x.normalMap.channel),displacementMapUv:I&&g(x.displacementMap.channel),emissiveMapUv:Re&&g(x.emissiveMap.channel),metalnessMapUv:Ce&&g(x.metalnessMap.channel),roughnessMapUv:We&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:Ee&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(x.sheenRoughnessMap.channel),specularMapUv:be&&g(x.specularMap.channel),specularColorMapUv:le&&g(x.specularColorMap.channel),specularIntensityMapUv:qe&&g(x.specularIntensityMap.channel),transmissionMapUv:F&&g(x.transmissionMap.channel),thicknessMapUv:pe&&g(x.thicknessMap.channel),alphaMapUv:ge&&g(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ze||_e),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(He||ge),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:K,skinning:N.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ve,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:He&&x.map.isVideoTexture===!0&&Ke.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:Re&&x.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ei,flipSided:x.side===en,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function f(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)y.push(R),y.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(T(y,x),b(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function T(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function b(x,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function w(x){const y=_[x.type];let R;if(y){const D=On[y];R=ox.clone(D.uniforms)}else R=x.uniforms;return R}function S(x,y){let R=h.get(y);return R!==void 0?++R.usedTimes:(R=new VT(i,y,x,r),u.push(R),h.set(y,R)),R}function M(x){if(--x.usedTimes===0){const y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){c.remove(x)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:w,acquireProgram:S,releaseProgram:M,releaseShaderCache:E,programs:u,dispose:C}}function qT(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function XT(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function dh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,p,_,g,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=h.renderOrder,f.z=g,f.group=m),e++,f}function a(h,d,p,_,g,m){const f=o(h,d,p,_,g,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(h,d,p,_,g,m){const f=o(h,d,p,_,g,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(h,d){t.length>1&&t.sort(h||XT),n.length>1&&n.sort(d||hh),s.length>1&&s.sort(d||hh)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function YT(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new dh,i.set(n,[o])):s>=r.length?(o=new dh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function jT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new ot};break;case"SpotLight":t={position:new G,direction:new G,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function ZT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let $T=0;function KT(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function JT(i){const e=new jT,t=ZT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);const s=new G,r=new wt,o=new wt;function a(l){let u=0,h=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let p=0,_=0,g=0,m=0,f=0,T=0,b=0,w=0,S=0,M=0,E=0;l.sort(KT);for(let x=0,y=l.length;x<y;x++){const R=l[x],D=R.color,N=R.intensity,k=R.distance;let V=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Fs?V=R.shadow.map.texture:V=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=D.r*N,h+=D.g*N,d+=D.b*N;else if(R.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(R.sh.coefficients[U],N);E++}else if(R.isDirectionalLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const L=R.shadow,q=t.get(R);q.shadowIntensity=L.intensity,q.shadowBias=L.bias,q.shadowNormalBias=L.normalBias,q.shadowRadius=L.radius,q.shadowMapSize=L.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=V,n.directionalShadowMatrix[p]=R.shadow.matrix,T++}n.directional[p]=U,p++}else if(R.isSpotLight){const U=e.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(D).multiplyScalar(N),U.distance=k,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,n.spot[g]=U;const L=R.shadow;if(R.map&&(n.spotLightMap[S]=R.map,S++,L.updateMatrices(R),R.castShadow&&M++),n.spotLightMatrix[g]=L.matrix,R.castShadow){const q=t.get(R);q.shadowIntensity=L.intensity,q.shadowBias=L.bias,q.shadowNormalBias=L.normalBias,q.shadowRadius=L.radius,q.shadowMapSize=L.mapSize,n.spotShadow[g]=q,n.spotShadowMap[g]=V,w++}g++}else if(R.isRectAreaLight){const U=e.get(R);U.color.copy(D).multiplyScalar(N),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=U,m++}else if(R.isPointLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const L=R.shadow,q=t.get(R);q.shadowIntensity=L.intensity,q.shadowBias=L.bias,q.shadowNormalBias=L.normalBias,q.shadowRadius=L.radius,q.shadowMapSize=L.mapSize,q.shadowCameraNear=L.camera.near,q.shadowCameraFar=L.camera.far,n.pointShadow[_]=q,n.pointShadowMap[_]=V,n.pointShadowMatrix[_]=R.shadow.matrix,b++}n.point[_]=U,_++}else if(R.isHemisphereLight){const U=e.get(R);U.skyColor.copy(R.color).multiplyScalar(N),U.groundColor.copy(R.groundColor).multiplyScalar(N),n.hemi[f]=U,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==p||C.pointLength!==_||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==T||C.numPointShadows!==b||C.numSpotShadows!==w||C.numSpotMaps!==S||C.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=w+S-M,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=E,C.directionalLength=p,C.pointLength=_,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=T,C.numPointShadows=b,C.numSpotShadows=w,C.numSpotMaps=S,C.numLightProbes=E,n.version=$T++)}function c(l,u){let h=0,d=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let f=0,T=l.length;f<T;f++){const b=l[f];if(b.isDirectionalLight){const w=n.directional[h];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),h++}else if(b.isSpotLight){const w=n.spot[p];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const w=n.rectArea[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const w=n.point[d];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const w=n.hemi[g];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:n}}function fh(i){const e=new JT(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function QT(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new fh(i),e.set(s,[a])):r>=o.length?(a=new fh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nb=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],ib=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],ph=new wt,er=new G,ka=new G;function sb(i,e,t){let n=new $d;const s=new nt,r=new nt,o=new Et,a=new Sx,c=new yx,l={},u=t.maxTextureSize,h={[Ri]:en,[en]:Ri,[ei]:ei},d=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:eb,fragmentShader:tb}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new Nn;_.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new hi(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oo;let f=this.type;this.render=function(M,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;M.type===cv&&(Be("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),M.type=oo);const x=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ii),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=f!==this.type;N&&E.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(V=>V.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,V=M.length;k<V;k++){const U=M[k],L=U.shadow;if(L===void 0){Be("WebGLShadowMap:",U,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;s.copy(L.mapSize);const q=L.getFrameExtents();if(s.multiply(q),r.copy(L.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/q.x),s.x=r.x*q.x,L.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/q.y),s.y=r.y*q.y,L.mapSize.y=r.y)),L.map===null||N===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===tr){if(U.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Vn(s.x,s.y,{format:Fs,type:ci,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),L.map.texture.name=U.name+".shadowMap",L.map.depthTexture=new hr(s.x,s.y,Un),L.map.depthTexture.name=U.name+".shadowMapDepth",L.map.depthTexture.format=li,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ot,L.map.depthTexture.magFilter=Ot}else{U.isPointLight?(L.map=new Zd(s.x),L.map.depthTexture=new vx(s.x,Gn)):(L.map=new Vn(s.x,s.y),L.map.depthTexture=new hr(s.x,s.y,Gn)),L.map.depthTexture.name=U.name+".shadowMap",L.map.depthTexture.format=li;const $=i.state.buffers.depth.getReversed();this.type===oo?(L.map.depthTexture.compareFunction=$?zl:Vl,L.map.depthTexture.minFilter=Vt,L.map.depthTexture.magFilter=Vt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ot,L.map.depthTexture.magFilter=Ot)}L.camera.updateProjectionMatrix()}const j=L.map.isWebGLCubeRenderTarget?6:1;for(let $=0;$<j;$++){if(L.map.isWebGLCubeRenderTarget)i.setRenderTarget(L.map,$),i.clear();else{$===0&&(i.setRenderTarget(L.map),i.clear());const Q=L.getViewport($);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),D.viewport(o)}if(U.isPointLight){const Q=L.camera,ve=L.matrix,we=U.distance||Q.far;we!==Q.far&&(Q.far=we,Q.updateProjectionMatrix()),er.setFromMatrixPosition(U.matrixWorld),Q.position.copy(er),ka.copy(Q.position),ka.add(nb[$]),Q.up.copy(ib[$]),Q.lookAt(ka),Q.updateMatrixWorld(),ve.makeTranslation(-er.x,-er.y,-er.z),ph.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),L._frustum.setFromProjectionMatrix(ph,Q.coordinateSystem,Q.reversedDepth)}else L.updateMatrices(U);n=L.getFrustum(),w(E,C,L.camera,U,this.type)}L.isPointLightShadow!==!0&&this.type===tr&&T(L,C),L.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(x,y,R)};function T(M,E){const C=e.update(g);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Vn(s.x,s.y,{format:Fs,type:ci})),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,g,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(E,null,C,p,g,null)}function b(M,E,C,x){let y=null;const R=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)y=R;else if(y=C.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const D=y.uuid,N=E.uuid;let k=l[D];k===void 0&&(k={},l[D]=k);let V=k[N];V===void 0&&(V=y.clone(),k[N]=V,E.addEventListener("dispose",S)),y=V}if(y.visible=E.visible,y.wireframe=E.wireframe,x===tr?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:h[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=i.properties.get(y);D.light=C}return y}function w(M,E,C,x,y){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&y===tr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);const N=e.update(M),k=M.material;if(Array.isArray(k)){const V=N.groups;for(let U=0,L=V.length;U<L;U++){const q=V[U],j=k[q.materialIndex];if(j&&j.visible){const $=b(M,j,x,y);M.onBeforeShadow(i,M,E,C,N,$,q),i.renderBufferDirect(C,null,N,$,M,q),M.onAfterShadow(i,M,E,C,N,$,q)}}}else if(k.visible){const V=b(M,k,x,y);M.onBeforeShadow(i,M,E,C,N,V,null),i.renderBufferDirect(C,null,N,V,M,null),M.onAfterShadow(i,M,E,C,N,V,null)}}const D=M.children;for(let N=0,k=D.length;N<k;N++)w(D[N],E,C,x,y)}function S(M){M.target.removeEventListener("dispose",S);for(const C in l){const x=l[C],y=M.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const rb={[Qa]:ec,[tc]:sc,[nc]:rc,[Ns]:ic,[ec]:Qa,[sc]:tc,[rc]:nc,[ic]:Ns};function ob(i,e){function t(){let F=!1;const pe=new Et;let oe=null;const ge=new Et(0,0,0,0);return{setMask:function(ie){oe!==ie&&!F&&(i.colorMask(ie,ie,ie,ie),oe=ie)},setLocked:function(ie){F=ie},setClear:function(ie,ee,ae,ke,ft){ft===!0&&(ie*=ke,ee*=ke,ae*=ke),pe.set(ie,ee,ae,ke),ge.equals(pe)===!1&&(i.clearColor(ie,ee,ae,ke),ge.copy(pe))},reset:function(){F=!1,oe=null,ge.set(-1,0,0,0)}}}function n(){let F=!1,pe=!1,oe=null,ge=null,ie=null;return{setReversed:function(ee){if(pe!==ee){const ae=e.get("EXT_clip_control");ee?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),pe=ee;const ke=ie;ie=null,this.setClear(ke)}},getReversed:function(){return pe},setTest:function(ee){ee?J(i.DEPTH_TEST):K(i.DEPTH_TEST)},setMask:function(ee){oe!==ee&&!F&&(i.depthMask(ee),oe=ee)},setFunc:function(ee){if(pe&&(ee=rb[ee]),ge!==ee){switch(ee){case Qa:i.depthFunc(i.NEVER);break;case ec:i.depthFunc(i.ALWAYS);break;case tc:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case nc:i.depthFunc(i.EQUAL);break;case ic:i.depthFunc(i.GEQUAL);break;case sc:i.depthFunc(i.GREATER);break;case rc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=ee}},setLocked:function(ee){F=ee},setClear:function(ee){ie!==ee&&(pe&&(ee=1-ee),i.clearDepth(ee),ie=ee)},reset:function(){F=!1,oe=null,ge=null,ie=null,pe=!1}}}function s(){let F=!1,pe=null,oe=null,ge=null,ie=null,ee=null,ae=null,ke=null,ft=null;return{setTest:function(it){F||(it?J(i.STENCIL_TEST):K(i.STENCIL_TEST))},setMask:function(it){pe!==it&&!F&&(i.stencilMask(it),pe=it)},setFunc:function(it,Ln,Xn){(oe!==it||ge!==Ln||ie!==Xn)&&(i.stencilFunc(it,Ln,Xn),oe=it,ge=Ln,ie=Xn)},setOp:function(it,Ln,Xn){(ee!==it||ae!==Ln||ke!==Xn)&&(i.stencilOp(it,Ln,Xn),ee=it,ae=Ln,ke=Xn)},setLocked:function(it){F=it},setClear:function(it){ft!==it&&(i.clearStencil(it),ft=it)},reset:function(){F=!1,pe=null,oe=null,ge=null,ie=null,ee=null,ae=null,ke=null,ft=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,p=[],_=null,g=!1,m=null,f=null,T=null,b=null,w=null,S=null,M=null,E=new ot(0,0,0),C=0,x=!1,y=null,R=null,D=null,N=null,k=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,L=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(q)[1]),U=L>=1):q.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),U=L>=2);let j=null,$={};const Q=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),we=new Et().fromArray(Q),Ye=new Et().fromArray(ve);function ye(F,pe,oe,ge){const ie=new Uint8Array(4),ee=i.createTexture();i.bindTexture(F,ee),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ae=0;ae<oe;ae++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(pe+ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return ee}const X={};X[i.TEXTURE_2D]=ye(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=ye(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=ye(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=ye(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(Ns),re(!1),ze(xu),J(i.CULL_FACE),tt(ii);function J(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function K(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Fe(F,pe){return h[F]!==pe?(i.bindFramebuffer(F,pe),h[F]=pe,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function me(F,pe){let oe=p,ge=!1;if(F){oe=d.get(pe),oe===void 0&&(oe=[],d.set(pe,oe));const ie=F.textures;if(oe.length!==ie.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let ee=0,ae=ie.length;ee<ae;ee++)oe[ee]=i.COLOR_ATTACHMENT0+ee;oe.length=ie.length,ge=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,ge=!0);ge&&i.drawBuffers(oe)}function He(F){return _!==F?(i.useProgram(F),_=F,!0):!1}const _t={[Gi]:i.FUNC_ADD,[uv]:i.FUNC_SUBTRACT,[hv]:i.FUNC_REVERSE_SUBTRACT};_t[dv]=i.MIN,_t[fv]=i.MAX;const Ze={[pv]:i.ZERO,[mv]:i.ONE,[_v]:i.SRC_COLOR,[Ka]:i.SRC_ALPHA,[Mv]:i.SRC_ALPHA_SATURATE,[Sv]:i.DST_COLOR,[vv]:i.DST_ALPHA,[gv]:i.ONE_MINUS_SRC_COLOR,[Ja]:i.ONE_MINUS_SRC_ALPHA,[yv]:i.ONE_MINUS_DST_COLOR,[xv]:i.ONE_MINUS_DST_ALPHA,[Tv]:i.CONSTANT_COLOR,[bv]:i.ONE_MINUS_CONSTANT_COLOR,[Ev]:i.CONSTANT_ALPHA,[Av]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(F,pe,oe,ge,ie,ee,ae,ke,ft,it){if(F===ii){g===!0&&(K(i.BLEND),g=!1);return}if(g===!1&&(J(i.BLEND),g=!0),F!==lv){if(F!==m||it!==x){if((f!==Gi||w!==Gi)&&(i.blendEquation(i.FUNC_ADD),f=Gi,w=Gi),it)switch(F){case As:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $a:i.blendFunc(i.ONE,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",F);break}else switch(F){case As:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $a:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Su:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yu:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",F);break}T=null,b=null,S=null,M=null,E.set(0,0,0),C=0,m=F,x=it}return}ie=ie||pe,ee=ee||oe,ae=ae||ge,(pe!==f||ie!==w)&&(i.blendEquationSeparate(_t[pe],_t[ie]),f=pe,w=ie),(oe!==T||ge!==b||ee!==S||ae!==M)&&(i.blendFuncSeparate(Ze[oe],Ze[ge],Ze[ee],Ze[ae]),T=oe,b=ge,S=ee,M=ae),(ke.equals(E)===!1||ft!==C)&&(i.blendColor(ke.r,ke.g,ke.b,ft),E.copy(ke),C=ft),m=F,x=!1}function ne(F,pe){F.side===ei?K(i.CULL_FACE):J(i.CULL_FACE);let oe=F.side===en;pe&&(oe=!oe),re(oe),F.blending===As&&F.transparent===!1?tt(ii):tt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const ge=F.stencilWrite;a.setTest(ge),ge&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Re(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):K(i.SAMPLE_ALPHA_TO_COVERAGE)}function re(F){y!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),y=F)}function ze(F){F!==ov?(J(i.CULL_FACE),F!==R&&(F===xu?i.cullFace(i.BACK):F===av?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):K(i.CULL_FACE),R=F}function I(F){F!==D&&(U&&i.lineWidth(F),D=F)}function Re(F,pe,oe){F?(J(i.POLYGON_OFFSET_FILL),(N!==pe||k!==oe)&&(i.polygonOffset(pe,oe),N=pe,k=oe)):K(i.POLYGON_OFFSET_FILL)}function Ce(F){F?J(i.SCISSOR_TEST):K(i.SCISSOR_TEST)}function We(F){F===void 0&&(F=i.TEXTURE0+V-1),j!==F&&(i.activeTexture(F),j=F)}function _e(F,pe,oe){oe===void 0&&(j===null?oe=i.TEXTURE0+V-1:oe=j);let ge=$[oe];ge===void 0&&(ge={type:void 0,texture:void 0},$[oe]=ge),(ge.type!==F||ge.texture!==pe)&&(j!==oe&&(i.activeTexture(oe),j=oe),i.bindTexture(F,pe||X[F]),ge.type=F,ge.texture=pe)}function P(){const F=$[j];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Z(){try{i.texSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function te(){try{i.texSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Ee(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function ce(){try{i.texStorage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Te(){try{i.texStorage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function Ue(){try{i.texImage2D(...arguments)}catch(F){Qe("WebGLState:",F)}}function se(){try{i.texImage3D(...arguments)}catch(F){Qe("WebGLState:",F)}}function ue(F){we.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),we.copy(F))}function Me(F){Ye.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Ye.copy(F))}function be(F,pe){let oe=l.get(pe);oe===void 0&&(oe=new WeakMap,l.set(pe,oe));let ge=oe.get(F);ge===void 0&&(ge=i.getUniformBlockIndex(pe,F.name),oe.set(F,ge))}function le(F,pe){const ge=l.get(pe).get(F);c.get(pe)!==ge&&(i.uniformBlockBinding(pe,ge,F.__bindingPointIndex),c.set(pe,ge))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},j=null,$={},h={},d=new WeakMap,p=[],_=null,g=!1,m=null,f=null,T=null,b=null,w=null,S=null,M=null,E=new ot(0,0,0),C=0,x=!1,y=null,R=null,D=null,N=null,k=null,we.set(0,0,i.canvas.width,i.canvas.height),Ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:K,bindFramebuffer:Fe,drawBuffers:me,useProgram:He,setBlending:tt,setMaterial:ne,setFlipSided:re,setCullFace:ze,setLineWidth:I,setPolygonOffset:Re,setScissorTest:Ce,activeTexture:We,bindTexture:_e,unbindTexture:P,compressedTexImage2D:v,compressedTexImage3D:O,texImage2D:Ue,texImage3D:se,updateUBOMapping:be,uniformBlockBinding:le,texStorage2D:ce,texStorage3D:Te,texSubImage2D:Z,texSubImage3D:te,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ee,scissor:ue,viewport:Me,reset:qe}}function ab(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,v){return p?new OffscreenCanvas(P,v):Po("canvas")}function g(P,v,O){let Z=1;const te=_e(P);if((te.width>O||te.height>O)&&(Z=O/Math.max(te.width,te.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Y=Math.floor(Z*te.width),Ee=Math.floor(Z*te.height);h===void 0&&(h=_(Y,Ee));const ce=v?_(Y,Ee):h;return ce.width=Y,ce.height=Ee,ce.getContext("2d").drawImage(P,0,0,Y,Ee),Be("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Y+"x"+Ee+")."),ce}else return"data"in P&&Be("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),P;return P}function m(P){return P.generateMipmaps}function f(P){i.generateMipmap(P)}function T(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(P,v,O,Z,te=!1){if(P!==null){if(i[P]!==void 0)return i[P];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Y=v;if(v===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),v===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),v===i.RGBA){const Ee=te?Co:Ke.getTransfer(Z);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=Ee===rt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function w(P,v){let O;return P?v===null||v===Gn||v===lr?O=i.DEPTH24_STENCIL8:v===Un?O=i.DEPTH32F_STENCIL8:v===cr&&(O=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===lr?O=i.DEPTH_COMPONENT24:v===Un?O=i.DEPTH_COMPONENT32F:v===cr&&(O=i.DEPTH_COMPONENT16),O}function S(P,v){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ot&&P.minFilter!==Vt?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function M(P){const v=P.target;v.removeEventListener("dispose",M),C(v),v.isVideoTexture&&u.delete(v)}function E(P){const v=P.target;v.removeEventListener("dispose",E),y(v)}function C(P){const v=n.get(P);if(v.__webglInit===void 0)return;const O=P.source,Z=d.get(O);if(Z){const te=Z[v.__cacheKey];te.usedTimes--,te.usedTimes===0&&x(P),Object.keys(Z).length===0&&d.delete(O)}n.remove(P)}function x(P){const v=n.get(P);i.deleteTexture(v.__webglTexture);const O=P.source,Z=d.get(O);delete Z[v.__cacheKey],o.memory.textures--}function y(P){const v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let te=0;te<v.__webglFramebuffer[Z].length;te++)i.deleteFramebuffer(v.__webglFramebuffer[Z][te]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=P.textures;for(let Z=0,te=O.length;Z<te;Z++){const Y=n.get(O[Z]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(P)}let R=0;function D(){R=0}function N(){const P=R;return P>=s.maxTextures&&Be("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),R+=1,P}function k(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function V(P,v){const O=n.get(P);if(P.isVideoTexture&&Ce(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&O.__version!==P.version){const Z=P.image;if(Z===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{X(O,P,v);return}}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function U(P,v){const O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){X(O,P,v);return}else P.isExternalTexture&&(O.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function L(P,v){const O=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&O.__version!==P.version){X(O,P,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function q(P,v){const O=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&O.__version!==P.version){J(O,P,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const j={[cc]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[lc]:i.MIRRORED_REPEAT},$={[Ot]:i.NEAREST,[Rv]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[Xi]:i.LINEAR_MIPMAP_LINEAR},Q={[Nv]:i.NEVER,[kv]:i.ALWAYS,[Lv]:i.LESS,[Vl]:i.LEQUAL,[Fv]:i.EQUAL,[zl]:i.GEQUAL,[Ov]:i.GREATER,[Uv]:i.NOTEQUAL};function ve(P,v){if(v.type===Un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Vt||v.magFilter===ca||v.magFilter===Fr||v.magFilter===Xi||v.minFilter===Vt||v.minFilter===ca||v.minFilter===Fr||v.minFilter===Xi)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,j[v.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,j[v.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,j[v.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,$[v.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,$[v.minFilter]),v.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Q[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==Fr&&v.minFilter!==Xi||v.type===Un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function we(P,v){let O=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",M));const Z=v.source;let te=d.get(Z);te===void 0&&(te={},d.set(Z,te));const Y=k(v);if(Y!==P.__cacheKey){te[Y]===void 0&&(te[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),te[Y].usedTimes++;const Ee=te[P.__cacheKey];Ee!==void 0&&(te[P.__cacheKey].usedTimes--,Ee.usedTimes===0&&x(v)),P.__cacheKey=Y,P.__webglTexture=te[Y].texture}return O}function Ye(P,v,O){return Math.floor(Math.floor(P/O)/v)}function ye(P,v,O,Z){const Y=P.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,Z,v.data);else{Y.sort((se,ue)=>se.start-ue.start);let Ee=0;for(let se=1;se<Y.length;se++){const ue=Y[Ee],Me=Y[se],be=ue.start+ue.count,le=Ye(Me.start,v.width,4),qe=Ye(ue.start,v.width,4);Me.start<=be+1&&le===qe&&Ye(Me.start+Me.count-1,v.width,4)===le?ue.count=Math.max(ue.count,Me.start+Me.count-ue.start):(++Ee,Y[Ee]=Me)}Y.length=Ee+1;const ce=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),Ue=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let se=0,ue=Y.length;se<ue;se++){const Me=Y[se],be=Math.floor(Me.start/4),le=Math.ceil(Me.count/4),qe=be%v.width,F=Math.floor(be/v.width),pe=le,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,qe,F,pe,oe,O,Z,v.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ce),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ue)}}function X(P,v,O){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);const te=we(P,v),Y=v.source;t.bindTexture(Z,P.__webglTexture,i.TEXTURE0+O);const Ee=n.get(Y);if(Y.version!==Ee.__version||te===!0){t.activeTexture(i.TEXTURE0+O);const ce=Ke.getPrimaries(Ke.workingColorSpace),Te=v.colorSpace===Ti?null:Ke.getPrimaries(v.colorSpace),Ue=v.colorSpace===Ti||ce===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let se=g(v.image,!1,s.maxTextureSize);se=We(v,se);const ue=r.convert(v.format,v.colorSpace),Me=r.convert(v.type);let be=b(v.internalFormat,ue,Me,v.colorSpace,v.isVideoTexture);ve(Z,v);let le;const qe=v.mipmaps,F=v.isVideoTexture!==!0,pe=Ee.__version===void 0||te===!0,oe=Y.dataReady,ge=S(v,se);if(v.isDepthTexture)be=w(v.format===Yi,v.type),pe&&(F?t.texStorage2D(i.TEXTURE_2D,1,be,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,be,se.width,se.height,0,ue,Me,null));else if(v.isDataTexture)if(qe.length>0){F&&pe&&t.texStorage2D(i.TEXTURE_2D,ge,be,qe[0].width,qe[0].height);for(let ie=0,ee=qe.length;ie<ee;ie++)le=qe[ie],F?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,le.width,le.height,ue,Me,le.data):t.texImage2D(i.TEXTURE_2D,ie,be,le.width,le.height,0,ue,Me,le.data);v.generateMipmaps=!1}else F?(pe&&t.texStorage2D(i.TEXTURE_2D,ge,be,se.width,se.height),oe&&ye(v,se,ue,Me)):t.texImage2D(i.TEXTURE_2D,0,be,se.width,se.height,0,ue,Me,se.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){F&&pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,be,qe[0].width,qe[0].height,se.depth);for(let ie=0,ee=qe.length;ie<ee;ie++)if(le=qe[ie],v.format!==wn)if(ue!==null)if(F){if(oe)if(v.layerUpdates.size>0){const ae=qu(le.width,le.height,v.format,v.type);for(const ke of v.layerUpdates){const ft=le.data.subarray(ke*ae/le.data.BYTES_PER_ELEMENT,(ke+1)*ae/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ke,le.width,le.height,1,ue,ft)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,le.width,le.height,se.depth,ue,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,be,le.width,le.height,se.depth,0,le.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,le.width,le.height,se.depth,ue,Me,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,be,le.width,le.height,se.depth,0,ue,Me,le.data)}else{F&&pe&&t.texStorage2D(i.TEXTURE_2D,ge,be,qe[0].width,qe[0].height);for(let ie=0,ee=qe.length;ie<ee;ie++)le=qe[ie],v.format!==wn?ue!==null?F?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,le.width,le.height,ue,le.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,be,le.width,le.height,0,le.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,le.width,le.height,ue,Me,le.data):t.texImage2D(i.TEXTURE_2D,ie,be,le.width,le.height,0,ue,Me,le.data)}else if(v.isDataArrayTexture)if(F){if(pe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,be,se.width,se.height,se.depth),oe)if(v.layerUpdates.size>0){const ie=qu(se.width,se.height,v.format,v.type);for(const ee of v.layerUpdates){const ae=se.data.subarray(ee*ie/se.data.BYTES_PER_ELEMENT,(ee+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,se.width,se.height,1,ue,Me,ae)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ue,Me,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,be,se.width,se.height,se.depth,0,ue,Me,se.data);else if(v.isData3DTexture)F?(pe&&t.texStorage3D(i.TEXTURE_3D,ge,be,se.width,se.height,se.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ue,Me,se.data)):t.texImage3D(i.TEXTURE_3D,0,be,se.width,se.height,se.depth,0,ue,Me,se.data);else if(v.isFramebufferTexture){if(pe)if(F)t.texStorage2D(i.TEXTURE_2D,ge,be,se.width,se.height);else{let ie=se.width,ee=se.height;for(let ae=0;ae<ge;ae++)t.texImage2D(i.TEXTURE_2D,ae,be,ie,ee,0,ue,Me,null),ie>>=1,ee>>=1}}else if(qe.length>0){if(F&&pe){const ie=_e(qe[0]);t.texStorage2D(i.TEXTURE_2D,ge,be,ie.width,ie.height)}for(let ie=0,ee=qe.length;ie<ee;ie++)le=qe[ie],F?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ue,Me,le):t.texImage2D(i.TEXTURE_2D,ie,be,ue,Me,le);v.generateMipmaps=!1}else if(F){if(pe){const ie=_e(se);t.texStorage2D(i.TEXTURE_2D,ge,be,ie.width,ie.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Me,se)}else t.texImage2D(i.TEXTURE_2D,0,be,ue,Me,se);m(v)&&f(Z),Ee.__version=Y.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function J(P,v,O){if(v.image.length!==6)return;const Z=we(P,v),te=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+O);const Y=n.get(te);if(te.version!==Y.__version||Z===!0){t.activeTexture(i.TEXTURE0+O);const Ee=Ke.getPrimaries(Ke.workingColorSpace),ce=v.colorSpace===Ti?null:Ke.getPrimaries(v.colorSpace),Te=v.colorSpace===Ti||Ee===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ue=v.isCompressedTexture||v.image[0].isCompressedTexture,se=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let ee=0;ee<6;ee++)!Ue&&!se?ue[ee]=g(v.image[ee],!0,s.maxCubemapSize):ue[ee]=se?v.image[ee].image:v.image[ee],ue[ee]=We(v,ue[ee]);const Me=ue[0],be=r.convert(v.format,v.colorSpace),le=r.convert(v.type),qe=b(v.internalFormat,be,le,v.colorSpace),F=v.isVideoTexture!==!0,pe=Y.__version===void 0||Z===!0,oe=te.dataReady;let ge=S(v,Me);ve(i.TEXTURE_CUBE_MAP,v);let ie;if(Ue){F&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,qe,Me.width,Me.height);for(let ee=0;ee<6;ee++){ie=ue[ee].mipmaps;for(let ae=0;ae<ie.length;ae++){const ke=ie[ae];v.format!==wn?be!==null?F?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,0,0,ke.width,ke.height,be,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,qe,ke.width,ke.height,0,ke.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,0,0,ke.width,ke.height,be,le,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,qe,ke.width,ke.height,0,be,le,ke.data)}}}else{if(ie=v.mipmaps,F&&pe){ie.length>0&&ge++;const ee=_e(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,qe,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(se){F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,ue[ee].width,ue[ee].height,be,le,ue[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,ue[ee].width,ue[ee].height,0,be,le,ue[ee].data);for(let ae=0;ae<ie.length;ae++){const ft=ie[ae].image[ee].image;F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,0,0,ft.width,ft.height,be,le,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,qe,ft.width,ft.height,0,be,le,ft.data)}}else{F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,be,le,ue[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,qe,be,le,ue[ee]);for(let ae=0;ae<ie.length;ae++){const ke=ie[ae];F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,0,0,be,le,ke.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,qe,be,le,ke.image[ee])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),Y.__version=te.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function K(P,v,O,Z,te,Y){const Ee=r.convert(O.format,O.colorSpace),ce=r.convert(O.type),Te=b(O.internalFormat,Ee,ce,O.colorSpace),Ue=n.get(v),se=n.get(O);if(se.__renderTarget=v,!Ue.__hasExternalTextures){const ue=Math.max(1,v.width>>Y),Me=Math.max(1,v.height>>Y);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Y,Te,ue,Me,v.depth,0,Ee,ce,null):t.texImage2D(te,Y,Te,ue,Me,0,Ee,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),Re(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,te,se.__webglTexture,0,I(v)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,te,se.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(P,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,P),v.depthBuffer){const Z=v.depthTexture,te=Z&&Z.isDepthTexture?Z.type:null,Y=w(v.stencilBuffer,te),Ee=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Re(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(v),Y,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(v),Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,P)}else{const Z=v.textures;for(let te=0;te<Z.length;te++){const Y=Z[te],Ee=r.convert(Y.format,Y.colorSpace),ce=r.convert(Y.type),Te=b(Y.internalFormat,Ee,ce,Y.colorSpace);Re(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,I(v),Te,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,I(v),Te,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Te,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function me(P,v,O){const Z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(v.depthTexture);if(te.__renderTarget=v,(!te.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(te.__webglInit===void 0&&(te.__webglInit=!0,v.depthTexture.addEventListener("dispose",M)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ve(i.TEXTURE_CUBE_MAP,v.depthTexture);const Ue=r.convert(v.depthTexture.format),se=r.convert(v.depthTexture.type);let ue;v.depthTexture.format===li?ue=i.DEPTH_COMPONENT24:v.depthTexture.format===Yi&&(ue=i.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ue,v.width,v.height,0,Ue,se,null)}}else V(v.depthTexture,0);const Y=te.__webglTexture,Ee=I(v),ce=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,Te=v.depthTexture.format===Yi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===li)Re(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Te,ce,Y,0,Ee):i.framebufferTexture2D(i.FRAMEBUFFER,Te,ce,Y,0);else if(v.depthTexture.format===Yi)Re(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Te,ce,Y,0,Ee):i.framebufferTexture2D(i.FRAMEBUFFER,Te,ce,Y,0);else throw new Error("Unknown depthTexture format")}function He(P){const v=n.get(P),O=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const te=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",te)};Z.addEventListener("dispose",te),v.__depthDisposeCallback=te}v.__boundDepthTexture=Z}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let Z=0;Z<6;Z++)me(v.__webglFramebuffer[Z],P,Z);else{const Z=P.texture.mipmaps;Z&&Z.length>0?me(v.__webglFramebuffer[0],P,0):me(v.__webglFramebuffer,P,0)}else if(O){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),Fe(v.__webglDepthbuffer[Z],P,!1);else{const te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Y)}}else{const Z=P.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Fe(v.__webglDepthbuffer,P,!1);else{const te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(P,v,O){const Z=n.get(P);v!==void 0&&K(Z.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&He(P)}function Ze(P){const v=P.texture,O=n.get(P),Z=n.get(v);P.addEventListener("dispose",E);const te=P.textures,Y=P.isWebGLCubeRenderTarget===!0,Ee=te.length>1;if(Ee||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,o.memory.textures++),Y){O.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ce]=[];for(let Te=0;Te<v.mipmaps.length;Te++)O.__webglFramebuffer[ce][Te]=i.createFramebuffer()}else O.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)O.__webglFramebuffer[ce]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let ce=0,Te=te.length;ce<Te;ce++){const Ue=n.get(te[ce]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Re(P)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const Te=te[ce];O.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ce]);const Ue=r.convert(Te.format,Te.colorSpace),se=r.convert(Te.type),ue=b(Te.internalFormat,Ue,se,Te.colorSpace,P.isXRRenderTarget===!0),Me=I(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ue,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,O.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(O.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),ve(i.TEXTURE_CUBE_MAP,v);for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)K(O.__webglFramebuffer[ce][Te],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Te);else K(O.__webglFramebuffer[ce],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(v)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ce=0,Te=te.length;ce<Te;ce++){const Ue=te[ce],se=n.get(Ue);let ue=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ue=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,se.__webglTexture),ve(ue,Ue),K(O.__webglFramebuffer,P,Ue,i.COLOR_ATTACHMENT0+ce,ue,0),m(Ue)&&f(ue)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ce=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,Z.__webglTexture),ve(ce,v),v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)K(O.__webglFramebuffer[Te],P,v,i.COLOR_ATTACHMENT0,ce,Te);else K(O.__webglFramebuffer,P,v,i.COLOR_ATTACHMENT0,ce,0);m(v)&&f(ce),t.unbindTexture()}P.depthBuffer&&He(P)}function tt(P){const v=P.textures;for(let O=0,Z=v.length;O<Z;O++){const te=v[O];if(m(te)){const Y=T(P),Ee=n.get(te).__webglTexture;t.bindTexture(Y,Ee),f(Y),t.unbindTexture()}}}const ne=[],re=[];function ze(P){if(P.samples>0){if(Re(P)===!1){const v=P.textures,O=P.width,Z=P.height;let te=i.COLOR_BUFFER_BIT;const Y=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(P),ce=v.length>1;if(ce)for(let Ue=0;Ue<v.length;Ue++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Te=P.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Ue=0;Ue<v.length;Ue++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ue]);const se=n.get(v[Ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,O,Z,0,0,O,Z,te,i.NEAREST),c===!0&&(ne.length=0,re.length=0,ne.push(i.COLOR_ATTACHMENT0+Ue),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ne.push(Y),re.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Ue=0;Ue<v.length;Ue++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ue]);const se=n.get(v[Ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const v=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function I(P){return Math.min(s.maxSamples,P.samples)}function Re(P){const v=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ce(P){const v=o.render.frame;u.get(P)!==v&&(u.set(P,v),P.update())}function We(P,v){const O=P.colorSpace,Z=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||O!==Os&&O!==Ti&&(Ke.getTransfer(O)===rt?(Z!==wn||te!==_n)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",O)),v}function _e(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=D,this.setTexture2D=V,this.setTexture2DArray=U,this.setTexture3D=L,this.setTextureCube=q,this.rebindTextures=_t,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=K,this.useMultisampledRTT=Re,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cb(i,e){function t(n,s=Ti){let r;const o=Ke.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ol)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ld)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dd)return i.BYTE;if(n===Id)return i.SHORT;if(n===cr)return i.UNSIGNED_SHORT;if(n===Ll)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Un)return i.FLOAT;if(n===ci)return i.HALF_FLOAT;if(n===Fd)return i.ALPHA;if(n===Od)return i.RGB;if(n===wn)return i.RGBA;if(n===li)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Ud)return i.RED;if(n===Ul)return i.RED_INTEGER;if(n===Fs)return i.RG;if(n===kl)return i.RG_INTEGER;if(n===Bl)return i.RGBA_INTEGER;if(n===ao||n===co||n===lo||n===uo)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uc||n===hc||n===dc||n===fc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pc||n===mc||n===_c||n===gc||n===vc||n===xc||n===Sc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pc||n===mc)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_c)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===gc)return r.COMPRESSED_R11_EAC;if(n===vc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===xc)return r.COMPRESSED_RG11_EAC;if(n===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===yc||n===Mc||n===Tc||n===bc||n===Ec||n===Ac||n===wc||n===Cc||n===Rc||n===Pc||n===Dc||n===Ic||n===Nc||n===Lc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ec)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Rc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ic)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lc)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fc||n===Oc||n===Uc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Fc)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kc||n===Bc||n===Vc||n===zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===lr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const lb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ub=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Kd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Rn({vertexShader:lb,fragmentShader:ub,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new hi(new ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class db extends qs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,_=null;const g=typeof XRWebGLBinding<"u",m=new hb,f={},T=t.getContextAttributes();let b=null,w=null;const S=[],M=[],E=new nt;let C=null;const x=new mn;x.viewport=new Et;const y=new mn;y.viewport=new Et;const R=[x,y],D=new Mx;let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=S[X];return J===void 0&&(J=new Da,S[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=S[X];return J===void 0&&(J=new Da,S[X]=J),J.getGripSpace()},this.getHand=function(X){let J=S[X];return J===void 0&&(J=new Da,S[X]=J),J.getHandSpace()};function V(X){const J=M.indexOf(X.inputSource);if(J===-1)return;const K=S[J];K!==void 0&&(K.update(X.inputSource,X.frame,l||o),K.dispatchEvent({type:X.type,data:X.inputSource}))}function U(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",L);for(let X=0;X<S.length;X++){const J=M[X];J!==null&&(M[X]=null,S[X].disconnect(J))}N=null,k=null,m.reset();for(const X in f)delete f[X];e.setRenderTarget(b),p=null,d=null,h=null,s=null,w=null,ye.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",U),s.addEventListener("inputsourceschange",L),T.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,Fe=null,me=null;T.depth&&(me=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=T.stencil?Yi:li,Fe=T.stencil?lr:Gn);const He={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(He),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new Vn(d.textureWidth,d.textureHeight,{format:wn,type:_n,depthTexture:new hr(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const K={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,K),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Vn(p.framebufferWidth,p.framebufferHeight,{format:wn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ye.setContext(s),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function L(X){for(let J=0;J<X.removed.length;J++){const K=X.removed[J],Fe=M.indexOf(K);Fe>=0&&(M[Fe]=null,S[Fe].disconnect(K))}for(let J=0;J<X.added.length;J++){const K=X.added[J];let Fe=M.indexOf(K);if(Fe===-1){for(let He=0;He<S.length;He++)if(He>=M.length){M.push(K),Fe=He;break}else if(M[He]===null){M[He]=K,Fe=He;break}if(Fe===-1)break}const me=S[Fe];me&&me.connect(K)}}const q=new G,j=new G;function $(X,J,K){q.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(K.matrixWorld);const Fe=q.distanceTo(j),me=J.projectionMatrix.elements,He=K.projectionMatrix.elements,_t=me[14]/(me[10]-1),Ze=me[14]/(me[10]+1),tt=(me[9]+1)/me[5],ne=(me[9]-1)/me[5],re=(me[8]-1)/me[0],ze=(He[8]+1)/He[0],I=_t*re,Re=_t*ze,Ce=Fe/(-re+ze),We=Ce*-re;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(We),X.translateZ(Ce),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),me[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const _e=_t+Ce,P=Ze+Ce,v=I-We,O=Re+(Fe-We),Z=tt*Ze/P*_e,te=ne*Ze/P*_e;X.projectionMatrix.makePerspective(v,O,Z,te,_e,P),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Q(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let J=X.near,K=X.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(K=m.depthFar)),D.near=y.near=x.near=J,D.far=y.far=x.far=K,(N!==D.near||k!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),N=D.near,k=D.far),D.layers.mask=X.layers.mask|6,x.layers.mask=D.layers.mask&3,y.layers.mask=D.layers.mask&5;const Fe=X.parent,me=D.cameras;Q(D,Fe);for(let He=0;He<me.length;He++)Q(me[He],Fe);me.length===2?$(D,x,y):D.projectionMatrix.copy(x.projectionMatrix),ve(X,D,Fe)};function ve(X,J,K){K===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(K.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Gc*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(X){return f[X]};let we=null;function Ye(X,J){if(u=J.getViewerPose(l||o),_=J,u!==null){const K=u.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let Fe=!1;K.length!==D.cameras.length&&(D.cameras.length=0,Fe=!0);for(let Ze=0;Ze<K.length;Ze++){const tt=K[Ze];let ne=null;if(p!==null)ne=p.getViewport(tt);else{const ze=h.getViewSubImage(d,tt);ne=ze.viewport,Ze===0&&(e.setRenderTargetTextures(w,ze.colorTexture,ze.depthStencilTexture),e.setRenderTarget(w))}let re=R[Ze];re===void 0&&(re=new mn,re.layers.enable(Ze),re.viewport=new Et,R[Ze]=re),re.matrix.fromArray(tt.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(tt.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ne.x,ne.y,ne.width,ne.height),Ze===0&&(D.matrix.copy(re.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Fe===!0&&D.cameras.push(re)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){h=n.getBinding();const Ze=h.getDepthInformation(K[0]);Ze&&Ze.isValid&&Ze.texture&&m.init(Ze,s.renderState)}if(me&&me.includes("camera-access")&&g){e.state.unbindTexture(),h=n.getBinding();for(let Ze=0;Ze<K.length;Ze++){const tt=K[Ze].camera;if(tt){let ne=f[tt];ne||(ne=new Kd,f[tt]=ne);const re=h.getCameraImage(tt);ne.sourceTexture=re}}}}for(let K=0;K<S.length;K++){const Fe=M[K],me=S[K];Fe!==null&&me!==void 0&&me.update(Fe,J,l||o)}we&&we(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),_=null}const ye=new Qd;ye.setAnimationLoop(Ye),this.setAnimationLoop=function(X){we=X},this.dispose=function(){}}}const Vi=new ui,fb=new wt;function pb(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Xd(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,T,b,w){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,w)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,T,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===en&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===en&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=e.get(f),b=T.envMap,w=T.envMapRotation;b&&(m.envMap.value=b,Vi.copy(w),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),m.envMapRotation.value.setFromMatrix4(fb.makeRotationFromEuler(Vi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,T,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===en&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){const T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mb(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,b){const w=b.program;n.uniformBlockBinding(T,w)}function l(T,b){let w=s[T.id];w===void 0&&(_(T),w=u(T),s[T.id]=w,T.addEventListener("dispose",m));const S=b.program;n.updateUBOMapping(T,S);const M=e.render.frame;r[T.id]!==M&&(d(T),r[T.id]=M)}function u(T){const b=h();T.__bindingPointIndex=b;const w=i.createBuffer(),S=T.__size,M=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,S,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,w),w}function h(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const b=s[T.id],w=T.uniforms,S=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let M=0,E=w.length;M<E;M++){const C=Array.isArray(w[M])?w[M]:[w[M]];for(let x=0,y=C.length;x<y;x++){const R=C[x];if(p(R,M,x,S)===!0){const D=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let k=0;for(let V=0;V<N.length;V++){const U=N[V],L=g(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,D+k,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,k),k+=L.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,b,w,S){const M=T.value,E=b+"_"+w;if(S[E]===void 0)return typeof M=="number"||typeof M=="boolean"?S[E]=M:S[E]=M.clone(),!0;{const C=S[E];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return S[E]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function _(T){const b=T.uniforms;let w=0;const S=16;for(let E=0,C=b.length;E<C;E++){const x=Array.isArray(b[E])?b[E]:[b[E]];for(let y=0,R=x.length;y<R;y++){const D=x[y],N=Array.isArray(D.value)?D.value:[D.value];for(let k=0,V=N.length;k<V;k++){const U=N[k],L=g(U),q=w%S,j=q%L.boundary,$=q+j;w+=j,$!==0&&S-$<L.storage&&(w+=S-$),D.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=L.storage}}}const M=w%S;return M>0&&(w+=S-M),T.__size=w,T.__cache={},this}function g(T){const b={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(b.boundary=4,b.storage=4):T.isVector2?(b.boundary=8,b.storage=8):T.isVector3||T.isColor?(b.boundary=16,b.storage=12):T.isVector4?(b.boundary=16,b.storage=16):T.isMatrix3?(b.boundary=48,b.storage=48):T.isMatrix4?(b.boundary=64,b.storage=64):T.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Be("WebGLRenderer: Unsupported uniform value type.",T),b}function m(T){const b=T.target;b.removeEventListener("dispose",m);const w=o.indexOf(b.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}const _b=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fn=null;function gb(){return Fn===null&&(Fn=new dx(_b,16,16,Fs,ci),Fn.name="DFG_LUT",Fn.minFilter=Vt,Fn.magFilter=Vt,Fn.wrapS=ti,Fn.wrapT=ti,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}class vb{constructor(e={}){const{canvas:t=Bv(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=_n}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=o;const g=p,m=new Set([Bl,kl,Ul]),f=new Set([_n,Gn,cr,lr,Fl,Ol]),T=new Uint32Array(4),b=new Int32Array(4);let w=null,S=null;const M=[],E=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let y=!1;this._outputColorSpace=pn;let R=0,D=0,N=null,k=-1,V=null;const U=new Et,L=new Et;let q=null;const j=new ot(0);let $=0,Q=t.width,ve=t.height,we=1,Ye=null,ye=null;const X=new Et(0,0,Q,ve),J=new Et(0,0,Q,ve);let K=!1;const Fe=new $d;let me=!1,He=!1;const _t=new wt,Ze=new G,tt=new Et,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function ze(){return N===null?we:1}let I=n;function Re(A,B){return t.getContext(A,B)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nl}`),t.addEventListener("webglcontextlost",ke,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",it,!1),I===null){const B="webgl2";if(I=Re(B,A),I===null)throw Re(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw Qe("WebGLRenderer: "+A.message),A}let Ce,We,_e,P,v,O,Z,te,Y,Ee,ce,Te,Ue,se,ue,Me,be,le,qe,F,pe,oe,ge,ie;function ee(){Ce=new gM(I),Ce.init(),oe=new cb(I,Ce),We=new cM(I,Ce,e,oe),_e=new ob(I,Ce),We.reversedDepthBuffer&&d&&_e.buffers.depth.setReversed(!0),P=new SM(I),v=new qT,O=new ab(I,Ce,_e,v,We,oe,P),Z=new uM(x),te=new _M(x),Y=new bx(I),ge=new oM(I,Y),Ee=new vM(I,Y,P,ge),ce=new MM(I,Ee,Y,P),qe=new yM(I,We,O),Me=new lM(v),Te=new WT(x,Z,te,Ce,We,ge,Me),Ue=new pb(x,v),se=new YT,ue=new QT(Ce),le=new rM(x,Z,te,_e,ce,_,c),be=new sb(x,ce,We),ie=new mb(I,P,We,_e),F=new aM(I,Ce,P),pe=new xM(I,Ce,P),P.programs=Te.programs,x.capabilities=We,x.extensions=Ce,x.properties=v,x.renderLists=se,x.shadowMap=be,x.state=_e,x.info=P}ee(),g!==_n&&(C=new bM(g,t.width,t.height,s,r));const ae=new db(x,I);this.xr=ae,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=Ce.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ce.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return we},this.setPixelRatio=function(A){A!==void 0&&(we=A,this.setSize(Q,ve,!1))},this.getSize=function(A){return A.set(Q,ve)},this.setSize=function(A,B,W=!0){if(ae.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=A,ve=B,t.width=Math.floor(A*we),t.height=Math.floor(B*we),W===!0&&(t.style.width=A+"px",t.style.height=B+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,A,B)},this.getDrawingBufferSize=function(A){return A.set(Q*we,ve*we).floor()},this.setDrawingBufferSize=function(A,B,W){Q=A,ve=B,we=W,t.width=Math.floor(A*W),t.height=Math.floor(B*W),this.setViewport(0,0,A,B)},this.setEffects=function(A){if(g===_n){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let B=0;B<A.length;B++)if(A[B].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(U)},this.getViewport=function(A){return A.copy(X)},this.setViewport=function(A,B,W,H){A.isVector4?X.set(A.x,A.y,A.z,A.w):X.set(A,B,W,H),_e.viewport(U.copy(X).multiplyScalar(we).round())},this.getScissor=function(A){return A.copy(J)},this.setScissor=function(A,B,W,H){A.isVector4?J.set(A.x,A.y,A.z,A.w):J.set(A,B,W,H),_e.scissor(L.copy(J).multiplyScalar(we).round())},this.getScissorTest=function(){return K},this.setScissorTest=function(A){_e.setScissorTest(K=A)},this.setOpaqueSort=function(A){Ye=A},this.setTransparentSort=function(A){ye=A},this.getClearColor=function(A){return A.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(A=!0,B=!0,W=!0){let H=0;if(A){let z=!1;if(N!==null){const he=N.texture.format;z=m.has(he)}if(z){const he=N.texture.type,xe=f.has(he),fe=le.getClearColor(),Se=le.getClearAlpha(),Ae=fe.r,Oe=fe.g,Pe=fe.b;xe?(T[0]=Ae,T[1]=Oe,T[2]=Pe,T[3]=Se,I.clearBufferuiv(I.COLOR,0,T)):(b[0]=Ae,b[1]=Oe,b[2]=Pe,b[3]=Se,I.clearBufferiv(I.COLOR,0,b))}else H|=I.COLOR_BUFFER_BIT}B&&(H|=I.DEPTH_BUFFER_BIT),W&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ke,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",it,!1),le.dispose(),se.dispose(),ue.dispose(),v.dispose(),Z.dispose(),te.dispose(),ce.dispose(),ge.dispose(),ie.dispose(),Te.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Wl),ae.removeEventListener("sessionend",ql),Ni.stop()};function ke(A){A.preventDefault(),Au("WebGLRenderer: Context Lost."),y=!0}function ft(){Au("WebGLRenderer: Context Restored."),y=!1;const A=P.autoReset,B=be.enabled,W=be.autoUpdate,H=be.needsUpdate,z=be.type;ee(),P.autoReset=A,be.enabled=B,be.autoUpdate=W,be.needsUpdate=H,be.type=z}function it(A){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ln(A){const B=A.target;B.removeEventListener("dispose",Ln),Xn(B)}function Xn(A){rf(A),v.remove(A)}function rf(A){const B=v.get(A).programs;B!==void 0&&(B.forEach(function(W){Te.releaseProgram(W)}),A.isShaderMaterial&&Te.releaseShaderCache(A))}this.renderBufferDirect=function(A,B,W,H,z,he){B===null&&(B=ne);const xe=z.isMesh&&z.matrixWorld.determinant()<0,fe=af(A,B,W,H,z);_e.setMaterial(H,xe);let Se=W.index,Ae=1;if(H.wireframe===!0){if(Se=Ee.getWireframeAttribute(W),Se===void 0)return;Ae=2}const Oe=W.drawRange,Pe=W.attributes.position;let Xe=Oe.start*Ae,ct=(Oe.start+Oe.count)*Ae;he!==null&&(Xe=Math.max(Xe,he.start*Ae),ct=Math.min(ct,(he.start+he.count)*Ae)),Se!==null?(Xe=Math.max(Xe,0),ct=Math.min(ct,Se.count)):Pe!=null&&(Xe=Math.max(Xe,0),ct=Math.min(ct,Pe.count));const yt=ct-Xe;if(yt<0||yt===1/0)return;ge.setup(z,H,fe,W,Se);let Mt,ut=F;if(Se!==null&&(Mt=Y.get(Se),ut=pe,ut.setIndex(Mt)),z.isMesh)H.wireframe===!0?(_e.setLineWidth(H.wireframeLinewidth*ze()),ut.setMode(I.LINES)):ut.setMode(I.TRIANGLES);else if(z.isLine){let De=H.linewidth;De===void 0&&(De=1),_e.setLineWidth(De*ze()),z.isLineSegments?ut.setMode(I.LINES):z.isLineLoop?ut.setMode(I.LINE_LOOP):ut.setMode(I.LINE_STRIP)}else z.isPoints?ut.setMode(I.POINTS):z.isSprite&&ut.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)ur("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ce.get("WEBGL_multi_draw"))ut.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const De=z._multiDrawStarts,st=z._multiDrawCounts,Je=z._multiDrawCount,sn=Se?Y.get(Se).bytesPerElement:1,rs=v.get(H).currentProgram.getUniforms();for(let rn=0;rn<Je;rn++)rs.setValue(I,"_gl_DrawID",rn),ut.render(De[rn]/sn,st[rn])}else if(z.isInstancedMesh)ut.renderInstances(Xe,yt,z.count);else if(W.isInstancedBufferGeometry){const De=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,st=Math.min(W.instanceCount,De);ut.renderInstances(Xe,yt,st)}else ut.render(Xe,yt)};function Hl(A,B,W){A.transparent===!0&&A.side===ei&&A.forceSinglePass===!1?(A.side=en,A.needsUpdate=!0,Pr(A,B,W),A.side=Ri,A.needsUpdate=!0,Pr(A,B,W),A.side=ei):Pr(A,B,W)}this.compile=function(A,B,W=null){W===null&&(W=A),S=ue.get(W),S.init(B),E.push(S),W.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),A!==W&&A.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),S.setupLights();const H=new Set;return A.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const he=z.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const fe=he[xe];Hl(fe,W,z),H.add(fe)}else Hl(he,W,z),H.add(he)}),S=E.pop(),H},this.compileAsync=function(A,B,W=null){const H=this.compile(A,B,W);return new Promise(z=>{function he(){if(H.forEach(function(xe){v.get(xe).currentProgram.isReady()&&H.delete(xe)}),H.size===0){z(A);return}setTimeout(he,10)}Ce.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ia=null;function of(A){ia&&ia(A)}function Wl(){Ni.stop()}function ql(){Ni.start()}const Ni=new Qd;Ni.setAnimationLoop(of),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(A){ia=A,ae.setAnimationLoop(A),A===null?Ni.stop():Ni.start()},ae.addEventListener("sessionstart",Wl),ae.addEventListener("sessionend",ql),this.render=function(A,B){if(B!==void 0&&B.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;const W=ae.enabled===!0&&ae.isPresenting===!0,H=C!==null&&(N===null||W)&&C.begin(x,N);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(B),B=ae.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,B,N),S=ue.get(A,E.length),S.init(B),E.push(S),_t.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Fe.setFromProjectionMatrix(_t,kn,B.reversedDepth),He=this.localClippingEnabled,me=Me.init(this.clippingPlanes,He),w=se.get(A,M.length),w.init(),M.push(w),ae.enabled===!0&&ae.isPresenting===!0){const xe=x.xr.getDepthSensingMesh();xe!==null&&sa(xe,B,-1/0,x.sortObjects)}sa(A,B,0,x.sortObjects),w.finish(),x.sortObjects===!0&&w.sort(Ye,ye),re=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,re&&le.addToRenderList(w,A),this.info.render.frame++,me===!0&&Me.beginShadows();const z=S.state.shadowsArray;if(be.render(z,A,B),me===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&C.hasRenderPass())===!1){const xe=w.opaque,fe=w.transmissive;if(S.setupLights(),B.isArrayCamera){const Se=B.cameras;if(fe.length>0)for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const Pe=Se[Ae];Yl(xe,fe,A,Pe)}re&&le.render(A);for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const Pe=Se[Ae];Xl(w,A,Pe,Pe.viewport)}}else fe.length>0&&Yl(xe,fe,A,B),re&&le.render(A),Xl(w,A,B)}N!==null&&D===0&&(O.updateMultisampleRenderTarget(N),O.updateRenderTargetMipmap(N)),H&&C.end(x),A.isScene===!0&&A.onAfterRender(x,A,B),ge.resetDefaultState(),k=-1,V=null,E.pop(),E.length>0?(S=E[E.length-1],me===!0&&Me.setGlobalState(x.clippingPlanes,S.state.camera)):S=null,M.pop(),M.length>0?w=M[M.length-1]:w=null};function sa(A,B,W,H){if(A.visible===!1)return;if(A.layers.test(B.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(B);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Fe.intersectsSprite(A)){H&&tt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(_t);const xe=ce.update(A),fe=A.material;fe.visible&&w.push(A,xe,fe,W,tt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Fe.intersectsObject(A))){const xe=ce.update(A),fe=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),tt.copy(A.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),tt.copy(xe.boundingSphere.center)),tt.applyMatrix4(A.matrixWorld).applyMatrix4(_t)),Array.isArray(fe)){const Se=xe.groups;for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const Pe=Se[Ae],Xe=fe[Pe.materialIndex];Xe&&Xe.visible&&w.push(A,xe,Xe,W,tt.z,Pe)}}else fe.visible&&w.push(A,xe,fe,W,tt.z,null)}}const he=A.children;for(let xe=0,fe=he.length;xe<fe;xe++)sa(he[xe],B,W,H)}function Xl(A,B,W,H){const{opaque:z,transmissive:he,transparent:xe}=A;S.setupLightsView(W),me===!0&&Me.setGlobalState(x.clippingPlanes,W),H&&_e.viewport(U.copy(H)),z.length>0&&Rr(z,B,W),he.length>0&&Rr(he,B,W),xe.length>0&&Rr(xe,B,W),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Yl(A,B,W,H){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){const Xe=Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new Vn(1,1,{generateMipmaps:!0,type:Xe?ci:_n,minFilter:Xi,samples:We.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const he=S.state.transmissionRenderTarget[H.id],xe=H.viewport||U;he.setSize(xe.z*x.transmissionResolutionScale,xe.w*x.transmissionResolutionScale);const fe=x.getRenderTarget(),Se=x.getActiveCubeFace(),Ae=x.getActiveMipmapLevel();x.setRenderTarget(he),x.getClearColor(j),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),re&&le.render(W);const Oe=x.toneMapping;x.toneMapping=Bn;const Pe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),me===!0&&Me.setGlobalState(x.clippingPlanes,H),Rr(A,W,H),O.updateMultisampleRenderTarget(he),O.updateRenderTargetMipmap(he),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let ct=0,yt=B.length;ct<yt;ct++){const Mt=B[ct],{object:ut,geometry:De,material:st,group:Je}=Mt;if(st.side===ei&&ut.layers.test(H.layers)){const sn=st.side;st.side=en,st.needsUpdate=!0,jl(ut,W,H,De,st,Je),st.side=sn,st.needsUpdate=!0,Xe=!0}}Xe===!0&&(O.updateMultisampleRenderTarget(he),O.updateRenderTargetMipmap(he))}x.setRenderTarget(fe,Se,Ae),x.setClearColor(j,$),Pe!==void 0&&(H.viewport=Pe),x.toneMapping=Oe}function Rr(A,B,W){const H=B.isScene===!0?B.overrideMaterial:null;for(let z=0,he=A.length;z<he;z++){const xe=A[z],{object:fe,geometry:Se,group:Ae}=xe;let Oe=xe.material;Oe.allowOverride===!0&&H!==null&&(Oe=H),fe.layers.test(W.layers)&&jl(fe,B,W,Se,Oe,Ae)}}function jl(A,B,W,H,z,he){A.onBeforeRender(x,B,W,H,z,he),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),z.onBeforeRender(x,B,W,H,A,he),z.transparent===!0&&z.side===ei&&z.forceSinglePass===!1?(z.side=en,z.needsUpdate=!0,x.renderBufferDirect(W,B,H,z,A,he),z.side=Ri,z.needsUpdate=!0,x.renderBufferDirect(W,B,H,z,A,he),z.side=ei):x.renderBufferDirect(W,B,H,z,A,he),A.onAfterRender(x,B,W,H,z,he)}function Pr(A,B,W){B.isScene!==!0&&(B=ne);const H=v.get(A),z=S.state.lights,he=S.state.shadowsArray,xe=z.state.version,fe=Te.getParameters(A,z.state,he,B,W),Se=Te.getProgramCacheKey(fe);let Ae=H.programs;H.environment=A.isMeshStandardMaterial?B.environment:null,H.fog=B.fog,H.envMap=(A.isMeshStandardMaterial?te:Z).get(A.envMap||H.environment),H.envMapRotation=H.environment!==null&&A.envMap===null?B.environmentRotation:A.envMapRotation,Ae===void 0&&(A.addEventListener("dispose",Ln),Ae=new Map,H.programs=Ae);let Oe=Ae.get(Se);if(Oe!==void 0){if(H.currentProgram===Oe&&H.lightsStateVersion===xe)return $l(A,fe),Oe}else fe.uniforms=Te.getUniforms(A),A.onBeforeCompile(fe,x),Oe=Te.acquireProgram(fe,Se),Ae.set(Se,Oe),H.uniforms=fe.uniforms;const Pe=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pe.clippingPlanes=Me.uniform),$l(A,fe),H.needsLights=lf(A),H.lightsStateVersion=xe,H.needsLights&&(Pe.ambientLightColor.value=z.state.ambient,Pe.lightProbe.value=z.state.probe,Pe.directionalLights.value=z.state.directional,Pe.directionalLightShadows.value=z.state.directionalShadow,Pe.spotLights.value=z.state.spot,Pe.spotLightShadows.value=z.state.spotShadow,Pe.rectAreaLights.value=z.state.rectArea,Pe.ltc_1.value=z.state.rectAreaLTC1,Pe.ltc_2.value=z.state.rectAreaLTC2,Pe.pointLights.value=z.state.point,Pe.pointLightShadows.value=z.state.pointShadow,Pe.hemisphereLights.value=z.state.hemi,Pe.directionalShadowMap.value=z.state.directionalShadowMap,Pe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Pe.spotShadowMap.value=z.state.spotShadowMap,Pe.spotLightMatrix.value=z.state.spotLightMatrix,Pe.spotLightMap.value=z.state.spotLightMap,Pe.pointShadowMap.value=z.state.pointShadowMap,Pe.pointShadowMatrix.value=z.state.pointShadowMatrix),H.currentProgram=Oe,H.uniformsList=null,Oe}function Zl(A){if(A.uniformsList===null){const B=A.currentProgram.getUniforms();A.uniformsList=ho.seqWithValue(B.seq,A.uniforms)}return A.uniformsList}function $l(A,B){const W=v.get(A);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function af(A,B,W,H,z){B.isScene!==!0&&(B=ne),O.resetTextureUnits();const he=B.fog,xe=H.isMeshStandardMaterial?B.environment:null,fe=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Os,Se=(H.isMeshStandardMaterial?te:Z).get(H.envMap||xe),Ae=H.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Oe=!!W.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!W.morphAttributes.position,Xe=!!W.morphAttributes.normal,ct=!!W.morphAttributes.color;let yt=Bn;H.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(yt=x.toneMapping);const Mt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ut=Mt!==void 0?Mt.length:0,De=v.get(H),st=S.state.lights;if(me===!0&&(He===!0||A!==V)){const Gt=A===V&&H.id===k;Me.setState(H,A,Gt)}let Je=!1;H.version===De.__version?(De.needsLights&&De.lightsStateVersion!==st.state.version||De.outputColorSpace!==fe||z.isBatchedMesh&&De.batching===!1||!z.isBatchedMesh&&De.batching===!0||z.isBatchedMesh&&De.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&De.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&De.instancing===!1||!z.isInstancedMesh&&De.instancing===!0||z.isSkinnedMesh&&De.skinning===!1||!z.isSkinnedMesh&&De.skinning===!0||z.isInstancedMesh&&De.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&De.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&De.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&De.instancingMorph===!1&&z.morphTexture!==null||De.envMap!==Se||H.fog===!0&&De.fog!==he||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==Me.numPlanes||De.numIntersection!==Me.numIntersection)||De.vertexAlphas!==Ae||De.vertexTangents!==Oe||De.morphTargets!==Pe||De.morphNormals!==Xe||De.morphColors!==ct||De.toneMapping!==yt||De.morphTargetsCount!==ut)&&(Je=!0):(Je=!0,De.__version=H.version);let sn=De.currentProgram;Je===!0&&(sn=Pr(H,B,z));let rs=!1,rn=!1,Ys=!1;const pt=sn.getUniforms(),Zt=De.uniforms;if(_e.useProgram(sn.program)&&(rs=!0,rn=!0,Ys=!0),H.id!==k&&(k=H.id,rn=!0),rs||V!==A){_e.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),pt.setValue(I,"projectionMatrix",A.projectionMatrix),pt.setValue(I,"viewMatrix",A.matrixWorldInverse);const $t=pt.map.cameraPosition;$t!==void 0&&$t.setValue(I,Ze.setFromMatrixPosition(A.matrixWorld)),We.logarithmicDepthBuffer&&pt.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&pt.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),V!==A&&(V=A,rn=!0,Ys=!0)}if(De.needsLights&&(st.state.directionalShadowMap.length>0&&pt.setValue(I,"directionalShadowMap",st.state.directionalShadowMap,O),st.state.spotShadowMap.length>0&&pt.setValue(I,"spotShadowMap",st.state.spotShadowMap,O),st.state.pointShadowMap.length>0&&pt.setValue(I,"pointShadowMap",st.state.pointShadowMap,O)),z.isSkinnedMesh){pt.setOptional(I,z,"bindMatrix"),pt.setOptional(I,z,"bindMatrixInverse");const Gt=z.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),pt.setValue(I,"boneTexture",Gt.boneTexture,O))}z.isBatchedMesh&&(pt.setOptional(I,z,"batchingTexture"),pt.setValue(I,"batchingTexture",z._matricesTexture,O),pt.setOptional(I,z,"batchingIdTexture"),pt.setValue(I,"batchingIdTexture",z._indirectTexture,O),pt.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&pt.setValue(I,"batchingColorTexture",z._colorsTexture,O));const dn=W.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&qe.update(z,W,sn),(rn||De.receiveShadow!==z.receiveShadow)&&(De.receiveShadow=z.receiveShadow,pt.setValue(I,"receiveShadow",z.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Zt.envMap.value=Se,Zt.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&B.environment!==null&&(Zt.envMapIntensity.value=B.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=gb()),rn&&(pt.setValue(I,"toneMappingExposure",x.toneMappingExposure),De.needsLights&&cf(Zt,Ys),he&&H.fog===!0&&Ue.refreshFogUniforms(Zt,he),Ue.refreshMaterialUniforms(Zt,H,we,ve,S.state.transmissionRenderTarget[A.id]),ho.upload(I,Zl(De),Zt,O)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ho.upload(I,Zl(De),Zt,O),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&pt.setValue(I,"center",z.center),pt.setValue(I,"modelViewMatrix",z.modelViewMatrix),pt.setValue(I,"normalMatrix",z.normalMatrix),pt.setValue(I,"modelMatrix",z.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Gt=H.uniformsGroups;for(let $t=0,ra=Gt.length;$t<ra;$t++){const Li=Gt[$t];ie.update(Li,sn),ie.bind(Li,sn)}}return sn}function cf(A,B){A.ambientLightColor.needsUpdate=B,A.lightProbe.needsUpdate=B,A.directionalLights.needsUpdate=B,A.directionalLightShadows.needsUpdate=B,A.pointLights.needsUpdate=B,A.pointLightShadows.needsUpdate=B,A.spotLights.needsUpdate=B,A.spotLightShadows.needsUpdate=B,A.rectAreaLights.needsUpdate=B,A.hemisphereLights.needsUpdate=B}function lf(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(A,B,W){const H=v.get(A);H.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),v.get(A.texture).__webglTexture=B,v.get(A.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:W,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,B){const W=v.get(A);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0};const uf=I.createFramebuffer();this.setRenderTarget=function(A,B=0,W=0){N=A,R=B,D=W;let H=null,z=!1,he=!1;if(A){const fe=v.get(A);if(fe.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(I.FRAMEBUFFER,fe.__webglFramebuffer),U.copy(A.viewport),L.copy(A.scissor),q=A.scissorTest,_e.viewport(U),_e.scissor(L),_e.setScissorTest(q),k=-1;return}else if(fe.__webglFramebuffer===void 0)O.setupRenderTarget(A);else if(fe.__hasExternalTextures)O.rebindTextures(A,v.get(A.texture).__webglTexture,v.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Oe=A.depthTexture;if(fe.__boundDepthTexture!==Oe){if(Oe!==null&&v.has(Oe)&&(A.width!==Oe.image.width||A.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(A)}}const Se=A.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(he=!0);const Ae=v.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ae[B])?H=Ae[B][W]:H=Ae[B],z=!0):A.samples>0&&O.useMultisampledRTT(A)===!1?H=v.get(A).__webglMultisampledFramebuffer:Array.isArray(Ae)?H=Ae[W]:H=Ae,U.copy(A.viewport),L.copy(A.scissor),q=A.scissorTest}else U.copy(X).multiplyScalar(we).floor(),L.copy(J).multiplyScalar(we).floor(),q=K;if(W!==0&&(H=uf),_e.bindFramebuffer(I.FRAMEBUFFER,H)&&_e.drawBuffers(A,H),_e.viewport(U),_e.scissor(L),_e.setScissorTest(q),z){const fe=v.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,fe.__webglTexture,W)}else if(he){const fe=B;for(let Se=0;Se<A.textures.length;Se++){const Ae=v.get(A.textures[Se]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,W,fe)}}else if(A!==null&&W!==0){const fe=v.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,fe.__webglTexture,W)}k=-1},this.readRenderTargetPixels=function(A,B,W,H,z,he,xe,fe=0){if(!(A&&A.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=v.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xe!==void 0&&(Se=Se[xe]),Se){_e.bindFramebuffer(I.FRAMEBUFFER,Se);try{const Ae=A.textures[fe],Oe=Ae.format,Pe=Ae.type;if(!We.textureFormatReadable(Oe)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!We.textureTypeReadable(Pe)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=A.width-H&&W>=0&&W<=A.height-z&&(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),I.readPixels(B,W,H,z,oe.convert(Oe),oe.convert(Pe),he))}finally{const Ae=N!==null?v.get(N).__webglFramebuffer:null;_e.bindFramebuffer(I.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(A,B,W,H,z,he,xe,fe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=v.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&xe!==void 0&&(Se=Se[xe]),Se)if(B>=0&&B<=A.width-H&&W>=0&&W<=A.height-z){_e.bindFramebuffer(I.FRAMEBUFFER,Se);const Ae=A.textures[fe],Oe=Ae.format,Pe=Ae.type;if(!We.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!We.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Xe),I.bufferData(I.PIXEL_PACK_BUFFER,he.byteLength,I.STREAM_READ),A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+fe),I.readPixels(B,W,H,z,oe.convert(Oe),oe.convert(Pe),0);const ct=N!==null?v.get(N).__webglFramebuffer:null;_e.bindFramebuffer(I.FRAMEBUFFER,ct);const yt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Vv(I,yt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Xe),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,he),I.deleteBuffer(Xe),I.deleteSync(yt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,B=null,W=0){const H=Math.pow(2,-W),z=Math.floor(A.image.width*H),he=Math.floor(A.image.height*H),xe=B!==null?B.x:0,fe=B!==null?B.y:0;O.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,xe,fe,z,he),_e.unbindTexture()};const hf=I.createFramebuffer(),df=I.createFramebuffer();this.copyTextureToTexture=function(A,B,W=null,H=null,z=0,he=null){he===null&&(z!==0?(ur("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=z,z=0):he=0);let xe,fe,Se,Ae,Oe,Pe,Xe,ct,yt;const Mt=A.isCompressedTexture?A.mipmaps[he]:A.image;if(W!==null)xe=W.max.x-W.min.x,fe=W.max.y-W.min.y,Se=W.isBox3?W.max.z-W.min.z:1,Ae=W.min.x,Oe=W.min.y,Pe=W.isBox3?W.min.z:0;else{const dn=Math.pow(2,-z);xe=Math.floor(Mt.width*dn),fe=Math.floor(Mt.height*dn),A.isDataArrayTexture?Se=Mt.depth:A.isData3DTexture?Se=Math.floor(Mt.depth*dn):Se=1,Ae=0,Oe=0,Pe=0}H!==null?(Xe=H.x,ct=H.y,yt=H.z):(Xe=0,ct=0,yt=0);const ut=oe.convert(B.format),De=oe.convert(B.type);let st;B.isData3DTexture?(O.setTexture3D(B,0),st=I.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(O.setTexture2DArray(B,0),st=I.TEXTURE_2D_ARRAY):(O.setTexture2D(B,0),st=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const Je=I.getParameter(I.UNPACK_ROW_LENGTH),sn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),rs=I.getParameter(I.UNPACK_SKIP_PIXELS),rn=I.getParameter(I.UNPACK_SKIP_ROWS),Ys=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Mt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Mt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ae),I.pixelStorei(I.UNPACK_SKIP_ROWS,Oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pe);const pt=A.isDataArrayTexture||A.isData3DTexture,Zt=B.isDataArrayTexture||B.isData3DTexture;if(A.isDepthTexture){const dn=v.get(A),Gt=v.get(B),$t=v.get(dn.__renderTarget),ra=v.get(Gt.__renderTarget);_e.bindFramebuffer(I.READ_FRAMEBUFFER,$t.__webglFramebuffer),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,ra.__webglFramebuffer);for(let Li=0;Li<Se;Li++)pt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(A).__webglTexture,z,Pe+Li),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(B).__webglTexture,he,yt+Li)),I.blitFramebuffer(Ae,Oe,xe,fe,Xe,ct,xe,fe,I.DEPTH_BUFFER_BIT,I.NEAREST);_e.bindFramebuffer(I.READ_FRAMEBUFFER,null),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||A.isRenderTargetTexture||v.has(A)){const dn=v.get(A),Gt=v.get(B);_e.bindFramebuffer(I.READ_FRAMEBUFFER,hf),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,df);for(let $t=0;$t<Se;$t++)pt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,z,Pe+$t):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,z),Zt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Gt.__webglTexture,he,yt+$t):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Gt.__webglTexture,he),z!==0?I.blitFramebuffer(Ae,Oe,xe,fe,Xe,ct,xe,fe,I.COLOR_BUFFER_BIT,I.NEAREST):Zt?I.copyTexSubImage3D(st,he,Xe,ct,yt+$t,Ae,Oe,xe,fe):I.copyTexSubImage2D(st,he,Xe,ct,Ae,Oe,xe,fe);_e.bindFramebuffer(I.READ_FRAMEBUFFER,null),_e.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Zt?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(st,he,Xe,ct,yt,xe,fe,Se,ut,De,Mt.data):B.isCompressedArrayTexture?I.compressedTexSubImage3D(st,he,Xe,ct,yt,xe,fe,Se,ut,Mt.data):I.texSubImage3D(st,he,Xe,ct,yt,xe,fe,Se,ut,De,Mt):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,he,Xe,ct,xe,fe,ut,De,Mt.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,he,Xe,ct,Mt.width,Mt.height,ut,Mt.data):I.texSubImage2D(I.TEXTURE_2D,he,Xe,ct,xe,fe,ut,De,Mt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Je),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,sn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,rs),I.pixelStorei(I.UNPACK_SKIP_ROWS,rn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ys),he===0&&B.generateMipmaps&&I.generateMipmap(st),_e.unbindTexture()},this.initRenderTarget=function(A){v.get(A).__webglFramebuffer===void 0&&O.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?O.setTextureCube(A,0):A.isData3DTexture?O.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?O.setTexture2DArray(A,0):O.setTexture2D(A,0),_e.unbindTexture()},this.resetState=function(){R=0,D=0,N=null,_e.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const xb=`
uniform float uTime;
uniform float uBreath; // 0.0 to 1.0 (Inhale -> Hold)
uniform vec2 uMouse;
uniform int uEnergyState;

// Multi-core (Optional, kept for future)
uniform vec2 uFocusPoints[3];
uniform float uFocusWeights[3];

attribute float aSize;
attribute vec3 aRandom;

varying vec3 vColor;
varying float vAlpha;
varying float vTwinkleRandom;

void main() {
    vec3 pos = position; // Initial random sphere position
    
    // --- 1. SHAPE LOGIC (Restored) ---
    vec3 targetPos = pos;
    
    // SHAPE 0: ESSENCE (Tesseract Hypercube 🧊)
    if (uEnergyState == 0) {
        // "Essence" - Higher Dimensional Intelligence.
        // Concept: Tesseract (Cube within a Cube).
        
        // 1. Cube Surface Mapping
        // Map 0..1 randoms to the 6 faces of a cube.
        // We do this twice: Once for Outer, once for Inner.
        
        vec3 cubePos;
        float face = floor(aRandom.x * 6.0);
        float u = fract(aRandom.x * 6.0) * 2.0 - 1.0; // -1..1
        float v = aRandom.y * 2.0 - 1.0;              // -1..1
        
        if (face < 1.0)      cubePos = vec3(1.0, u, v);   // +X
        else if (face < 2.0) cubePos = vec3(-1.0, u, v);  // -X
        else if (face < 3.0) cubePos = vec3(u, 1.0, v);   // +Y
        else if (face < 4.0) cubePos = vec3(u, -1.0, v);  // -Y
        else if (face < 5.0) cubePos = vec3(u, v, 1.0);   // +Z
        else                 cubePos = vec3(u, v, -1.0);  // -Z
        
        // 2. Nested Structure (Inner vs Outer)
        // 70% Outer, 30% Inner
        float isInner = (aRandom.z > 0.7) ? 1.0 : 0.0;
        
        float size = mix(12.0, 5.0, isInner); // Outer=12, Inner=5
        cubePos *= size;
        
        // 3. Rotation (The "4D" tumble)
        // Inner and Outer cubes rotate on different axes/speeds
        vec3 p = cubePos;
        
        float t = uTime * 0.2;
        
        if (isInner > 0.5) {
             // Inner: Fast Complex Spin
             float rotX = t * 2.0;
             float rotY = t * 1.5;
             
             // Rot X
             float y1 = p.y * cos(rotX) - p.z * sin(rotX);
             float z1 = p.y * sin(rotX) + p.z * cos(rotX);
             p.y = y1; p.z = z1;
             
             // Rot Y
             float x2 = p.x * cos(rotY) - p.z * sin(rotY);
             float z2 = p.x * sin(rotY) + p.z * cos(rotY);
             p.x = x2; p.z = z2;
             
        } else {
             // Outer: Slow Majestic Tumble
             float rotZ = t * 0.5;
             float rotY = t * 0.3;
             
             // Rot Z
             float x2 = p.x * cos(rotZ) - p.y * sin(rotZ);
             float y2 = p.x * sin(rotZ) + p.y * cos(rotZ);
             p.x = x2; p.y = y2;
             
             // Rot Y
             float x3 = p.x * cos(rotY) - p.z * sin(rotY);
             float z3 = p.x * sin(rotY) + p.z * cos(rotY);
             p.x = x3; p.z = z3;
        }
        
        targetPos = p;
    }
    // SHAPE 1: INFINITE (Crystal Infinity ♾️)
    else if (uEnergyState == 1) {
        // "Infinite" - Hollow Crystal Tube 8.
        // User found the "Stranded" logic weird (distortion).
        // Solution: Standard Figure-8, but HOLLOW TUBE surface distribution.
        // This creates sharp edges (high contrast) which looks like structure/strands.
        
        float t = aRandom.x * 6.28;
        float tubeRadius = 1.5; // Thin, defined tube
        float scale = 12.0;
        
        // 1. Centerline (Lemniscate)
        float denom = 1.0 + sin(t) * sin(t);
        float cx = scale * cos(t) / denom;
        float cy = scale * sin(t) * cos(t) / denom;
        
        // 2. Hollow Tube Logic (Surface Only)
        // We need a stable local frame.
        // Approximate Tangent vector (derivative of Lemniscate)
        // dx/dt 
        float num_x = -sin(t) * (1.0 + sin(t)*sin(t)) - cos(t) * (2.0*sin(t)*cos(t));
        // It's getting complex. 
        // Simplification: In 3D, just adding a ring in YZ plane works if curve is mostly X.
        // But curve is XY. So ring should be in Z and "Normal".
        
        // Simple stable ring:
        // Use the Z axis and the "Radial from center" axis as the basis for the tube cross-section.
        // It's an approximation but consistent enough for particles.
        vec3 centerDir = normalize(vec3(cx, cy, 0.0));
        vec3 upDir = vec3(0.0, 0.0, 1.0);
        
        float angle = aRandom.y * 6.28; // Ring angle
        
        // Tube Surface Position offset
        vec3 tubeOffset = (centerDir * cos(angle) + upDir * sin(angle)) * tubeRadius;
        
        // Add random scatter to make it "Crystal Dust" not perfectly smooth
        tubeOffset += (aRandom - 0.5) * 0.5;
        
        // 3. 3D Rotation
        float rot = uTime * 0.1;
        float px = cx + tubeOffset.x;
        float py = cy + tubeOffset.y;
        float pz = tubeOffset.z;
        
        float finalX = px * cos(rot) - pz * sin(rot);
        float finalZ = px * sin(rot) + pz * cos(rot);
        float finalY = py;
        
        targetPos = vec3(finalX, finalY, finalZ);
    }
    // SHAPE 2: UPLIFTING (DNA Double Helix)
    else if (uEnergyState == 2) {
        // "Uplifting" - Rising Life Energy (DNA)
        // Two intertwining spirals rising up the Y axis
        
        float helicalRise = aRandom.x * 20.0 - 10.0; // Y height: -10 to +10
        float angle = helicalRise * 0.5; // Twist rate
        float radius = 4.0;
        
        // Split into 2 strands based on random.z
        float strandOffset = (aRandom.z > 0.5) ? 3.14159 : 0.0;
        
        float finalAngle = angle + strandOffset + uTime * 0.2; // Slowly rotating
        
        targetPos.x = radius * cos(finalAngle);
        targetPos.y = helicalRise;
        targetPos.z = radius * sin(finalAngle);
        
        // Add some "Cloud" volume around the strands so it's not just a thin line
        targetPos += (aRandom - 0.5) * 2.0;
    }
    // SHAPE 3: UNIVERSAL (Atomic Rings)
    else if (uEnergyState == 3) {
         float ringId = floor(aRandom.z * 3.0);
         float angle = aRandom.x * 6.28;
         float r = 12.0;
         
         // Base Ring on XY plane
         vec3 ring = vec3(r * cos(angle), r * sin(angle), 0.0);
         
         // Tilt rotations for the 3 rings (Classic Atom Look)
         // Ring 1: Flat-ish (XY)
         // Ring 2: Tilted 60 deg X
         // Ring 3: Tilted 60 deg Y ? 
         // Better: Rotate around Y axis then tilt X.
         
         float tiltAngle = 0.0;
         float spinAngle = 0.0;
         
         if (ringId < 1.0) { 
             // Ring 1: Horizontal-ish diagonal
             spinAngle = 0.0;
             tiltAngle = 1.0; // ~60 deg
         } else if (ringId < 2.0) { 
             // Ring 2: Other diagonal
             spinAngle = 2.09; // 120 deg
             tiltAngle = 1.0;
         } else { 
             // Ring 3: Vertical-ish
             spinAngle = 4.18; // 240 deg
             tiltAngle = 1.0;
         }
         
         // 1. Tilt on X axis
         float y1 = ring.y * cos(tiltAngle) - ring.z * sin(tiltAngle);
         float z1 = ring.y * sin(tiltAngle) + ring.z * cos(tiltAngle);
         ring.y = y1; ring.z = z1;
         
         // 2. Spin on Z axis (to spread them out like a flower/atom)
         float x2 = ring.x * cos(spinAngle) - ring.y * sin(spinAngle);
         float y2 = ring.x * sin(spinAngle) + ring.y * cos(spinAngle);
         ring.x = x2; ring.y = y2;
         
         targetPos = ring;
         targetPos += (aRandom - 0.5) * 1.0; // Light Jitter
    }
    // SHAPE 4: VITAL (Living Cell 🦠)
    else if (uEnergyState == 4) {
        // "Vital" - A Breathing Living Cell.
        // Concept: A biological sphere with a pulsating membrane.
        
        // 1. Base Sphere (Spherical Coordinates)
        float u = aRandom.x;
        float v = aRandom.y;
        float theta = 2.0 * 3.14159 * u;
        float phi = acos(2.0 * v - 1.0);
        
        float r = 10.0; // Base radius
        
        // 2. Cellular Membrane Texture (Interference Pattern)
        // Create a "net" or "hives" pattern using high-freq sine waves
        float freq = 10.0;
        float membrane = sin(theta * freq) * sin(phi * freq);
        
        // 3. Pulsation (Breathing)
        // The membrane expands and contracts rhythmically
        // Combined with uBreath logic:
        // Hold (1.0) = Expanded/Tension. Release (0.0) = Relaxed.
        float pulse = sin(uTime * 2.0 - length(vec3(theta, phi, 0.0)) * 2.0);
        
        // Apply texture displacement
        // "Cell Walls" push out, centers dip in? Or vice versa.
        float displacement = membrane * (0.5 + 0.5 * sin(uTime)); 
        
        r += displacement * 1.5;
        
        // 4. Convert to Cartesian
        float sinPhi = sin(phi);
        vec3 p = vec3(
            r * sinPhi * cos(theta),
            r * sinPhi * sin(theta),
            r * cos(phi)
        );
        
        // 5. Rotation (Slow Drift)
        float rot = uTime * 0.1;
        float cx = p.x * cos(rot) - p.z * sin(rot);
        float cz = p.x * sin(rot) + p.z * cos(rot);
        
        targetPos = vec3(cx, p.y, cz);
    }
    // SHAPE 5: DEEP HEAL (Energy Torus 🍩)
    else {
        // "Deep Heal" - Toroidal Energy Flow.
        // Concept: Self-sustaining energy field (Cyclic).
        
        // Torus Parametric Equation:
        // x = (R + r * cos(theta)) * cos(phi)
        // y = (R + r * cos(theta)) * sin(phi)
        // z = r * sin(theta)
        
        float u = aRandom.x;
        float v = aRandom.y;
        
        float phi = u * 6.28; // Ring angle (0..2PI)
        float theta = v * 6.28; // Tube angle (0..2PI)
        
        // Flow Animation:
        // Particles flow "around" the tube (theta) 
        // to create a circulation effect.
        theta += uTime * 0.5;
        
        float R = 9.5; // Wider Ring
        float r = 2.5; // Thinner Tube = Larger Hole
        
        // HOLLOW TUBE (Surface Only)
        // Instead of filling the volume, we keep them on the surface
        // to define the shape clearly (like the Infinite Loop).
        // Add minimal scatter for "Energy Field" fuzziness
        r += (aRandom.z - 0.5) * 1.0; 
        
        float x = (R + r * cos(theta)) * cos(phi);
        float y = (R + r * cos(theta)) * sin(phi);
        float z = r * sin(theta);
        
        // 3D Rotation (Tilted to show structure)
        vec3 p = vec3(x, y, z);
        
        // Optimize Angle: Gentle "Nodding" Tilt
        // Varies between ~28 deg and ~45 deg to show both the hole and the volume.
        float tilt = 0.5 + 0.15 * sin(uTime * 0.5); 
        
        float y1 = p.y * cos(tilt) - p.z * sin(tilt);
        float z1 = p.y * sin(tilt) + p.z * cos(tilt);
        p = vec3(p.x, y1, z1);
        
        // Rotate Y (Spin)
        float spin = uTime * 0.1;
        float x2 = p.x * cos(spin) - p.z * sin(spin);
        float z2 = p.x * sin(spin) + p.z * cos(spin);
        
        targetPos = vec3(x2, p.y, z2);
    }

    // --- 2. TRANSITION LOGIC (Breath) ---
    // Breath 0.0 (Release) -> Chaos
    // Breath 1.0 (Hold) -> Order (Target Shape)
    
    // Animate Chaos
    float t = uTime * 0.1;
    vec3 chaosPos = pos;
    // Rotation
    float cx = chaosPos.x * cos(t) - chaosPos.y * sin(t);
    float cy = chaosPos.x * sin(t) + chaosPos.y * cos(t);
    chaosPos.x = cx; chaosPos.y = cy;
    chaosPos *= 1.5; // Expand a bit
    
    // Mix
    float mixFactor = smoothstep(0.0, 0.8, uBreath);
    vec3 finalPos = mix(chaosPos, targetPos, mixFactor);
    
    // --- 2.5 COSMIC RESONANCE (Ripple) ---
    // Project to Screen Space to check mouse proximity
    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    vec3 ndc = clipPos.xyz / clipPos.w; // Perspective divide
    vec2 screenPos = ndc.xy * 0.5 + 0.5; // Map -1..1 to 0..1
    
    float dist = distance(screenPos, uMouse);
    float radius = 0.2; // Slightly larger (Compromise)
    
    if (dist < radius) {
        // "Resonance" - A gentle sine wave ripple
        // Strength fades at edge of radius
        float strength = smoothstep(radius, 0.0, dist);
        
        // Ripple oscillation - Lower freq (50.0) for clearer waves
        float ripple = sin(dist * 50.0 - uTime * 10.0) * strength;
        
        // Apply to Z (Depth) -> Stronger Water Surface Effect
        // Reduced to 1.5 (Subtle/Gentle)
        finalPos.z += ripple * 1.5;
    }

    // --- 3. OUTPUT & SIZING ---
    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // DYNAMIC MOOD: Clear (Release) -> Dreamy (Hold)
    // uBreath: 0.0 (Release) -> 1.0 (Hold)
    
    // DYNAMIC MOOD: Clear (Release) -> Dreamy (Hold)
    // uBreath: 0.0 (Release) -> 1.0 (Hold)
    
    // Size: Release=Small(Sharp), Hold=Large(Dreamy Halo)
    // REDUCED MAX SIZE: 3.5 was too big for denser clustering.
    float sizeMood = mix(1.0, 2.0, uBreath); 
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * sizeMood;
    gl_PointSize = clamp(gl_PointSize, 2.0, 60.0);
    
    // --- 4. SAFE VISIBILITY ---
    // Color Logic & Density Factor
    vColor = vec3(1.0);
    float densityFactor = 0.1; // Default
    
    if (uEnergyState == 0) {
        vColor = vec3(1.0, 0.9, 0.6); // Essence: Gold
        densityFactor = 0.05;         // Boosted from 0.012 (Sphere needs more density than Galaxy core)
    } 
    else if (uEnergyState == 1) {
        vColor = vec3(1.0, 1.0, 1.0); // Infinite: White (Pure/Void)
        densityFactor = 0.03;         // Increased slightly for strands (from 0.015)
    }
    else if (uEnergyState == 2) {
        vColor = vec3(1.0, 0.6, 0.8); // Uplifting: Sakura Pink
        densityFactor = 0.035;        // Reduced from 0.08 to prevent DNA strand burnout
    }
    else if (uEnergyState == 3) {
        vColor = vec3(0.2, 0.5, 1.0); // Universal: Electric
        densityFactor = 0.04;         // Reduced from 0.2 (Was too bright at intersections)
    }
    else if (uEnergyState == 4) {
        vColor = vec3(0.2, 0.9, 0.5); // Vital: Green
        densityFactor = 0.05;         // Flattened density, reduced for volume to fix white edge
    }
    else {
        vColor = vec3(0.2, 0.3, 0.9); // Deep Blue
        densityFactor = 0.1;
    }
    
    // Alpha: Release=Opaque(Distinct), Hold=Transparent(Misty/Glow)
    // FIX OVEREXPOSURE (State Specific):
    // Use densityFactor to determine the "Hold" alpha.
    float releaseProgress = 1.0 - uBreath; 
    float curve = releaseProgress * releaseProgress * releaseProgress; // Cubic Ease-In
    
    // Low (densityFactor) -> High (0.9)
    float alphaMood = mix(densityFactor, 0.9, curve);
    
    // Safety clamp (Prevent 0)
    vAlpha = max(alphaMood, 0.01);
    
    // Twinkle: Only twinkle in the Dreamy state for magic
    vTwinkleRandom = aRandom.z;
}
`,Sb=`
varying vec3 vColor;
varying float vAlpha;
varying float vViewDepth;
varying float vStateIntensity;
varying float vSpeed;
varying float vTwinkleRandom;

uniform float uTime;

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    
    if (dist > 0.5) discard;
    
    // --- RESTORED VISIBILITY & AESTHETIC ---
    // 1. Core: Diamond-like but WIDER
    // Problem: 0.25 was too small -> invisible on screen
    // Solution: 0.45 covers almost the whole point sprite
    
    // --- BALANCED VISIBILITY (Restore Glow) ---
    // 1. Core: Defined center
    float radius = 0.45;
    float normDist = clamp(dist / radius, 0.0, 1.0);
    float core = pow(1.0 - normDist, 4.0); 
    
    // 2. Glow: Soft atmosphere (Restored & Widened)
    // Reduce decay from 5.0 to 3.5 for a wider halo (Dreamy look)
    float glow = exp(-dist * 3.5) * 0.45; 
    
    // Composite: Core + Glow
    float light = core + glow;
    
    // Color
    vec3 baseColor = vColor;
    // RESTORE WHITE CORE: Adds the "Crystal/Star" clarity back
    vec3 finalColor = mix(baseColor, vec3(1.0), core * 0.8); 
    
    // Alpha
    // Linear alpha (Safe)
    float finalAlpha = vAlpha * light;
    finalAlpha = min(finalAlpha, 1.0);
    
    // Twinkle integration
    // Twinkle integration
    // Slower, more hypnotic twinkle.
    float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + vTwinkleRandom * 20.0);
    finalAlpha *= twinkle;
    
    finalColor = aces(finalColor);
    finalColor = clamp(finalColor, 0.0, 1.0);
    finalAlpha = clamp(finalAlpha, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, finalAlpha);
}
`;class yb{constructor(){this.isInitialized=!1,this.currentState=-1,this.reverb=new Rl({decay:8,wet:.4}).toDestination(),this.limiter=new Il(-1).connect(this.reverb),this.droneL=new bt(110,"triangle").connect(this.limiter),this.droneR=new bt(111,"triangle").connect(this.limiter),this.droneL.volume.value=-1/0,this.droneR.volume.value=-1/0,this.droneFilter=new wo(200,"lowpass").connect(this.limiter),this.droneL.connect(this.droneFilter),this.droneR.connect(this.droneFilter),this.droneL.connect(this.droneFilter),this.droneR.connect(this.droneFilter),this.oceanNoise=new ar("brown").connect(this.reverb),this.oceanNoise.volume.value=-1/0,this.oceanFilter=new wo(200,"lowpass").connect(this.reverb),this.oceanNoise.disconnect().connect(this.oceanFilter),this.oceanPanner=new Ko(0).connect(this.reverb),this.oceanFilter.connect(this.oceanPanner),this.synth=new Al(es,{oscillator:{type:"triangle"},envelope:{attack:2,decay:2,sustain:.5,release:3}}).connect(this.reverb),this.synth.volume.value=-20,this.chords={0:["C3","E3","G3","B3"],1:["A2","E3","A3","C4"],2:["F3","A3","C4","E4"],3:["D3","F3","A3","C4"],4:["G2","D3","G3","B3"],5:["C3","Eb3","G3","Bb3"]}}async initialize(){this.isInitialized||(await md(),console.log("Audio Engine Started 🎵"),this.droneL.start(),this.droneR.start(),this.droneL.volume.rampTo(-20,1),this.droneR.volume.rampTo(-20,1),this.oceanNoise.start(),this.oceanNoise.volume.rampTo(-15,2),this.isInitialized=!0)}update(e,t){if(!this.isInitialized)return;const n=-25+e*10;this.droneL.volume.rampTo(n,.1),this.droneR.volume.rampTo(n,.1);const s=100+e*200;this.droneFilter.frequency.rampTo(s,.1);const r=-25+e*13;this.oceanNoise.volume.rampTo(r,.2);const o=100+e*500;this.oceanFilter.frequency.rampTo(o,.2),this.oceanPanner.pan.rampTo(Math.sin(sv()*.2),.1),this.currentState!==t&&(this.currentState=t,this.playStateChord(t))}playStateChord(e){this.synth.releaseAll();const t=this.chords[e]||this.chords[0];this.synth.triggerAttack(t)}}const Ba=[{name:"ESSENCE",color:"#FFB86C",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]},{name:"PURE",color:"#FFFFFF",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]},{name:"UPLIFTING",color:"#A020C0",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]},{name:"UNIVERSAL",color:"#448AFF",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]},{name:"VITAL",color:"#10A060",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]},{name:"DEEP HEAL",color:"#003388",cores:[[0,0],[0,0],[0,0]],weights:[1,0,0]}];class Mb{constructor(){this.container=document.querySelector("#app"),this.scene=new hx,this.camera=new mn(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.z=22,this.renderer=new vb({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(657932,1),this.container.appendChild(this.renderer.domElement),this.mouse=new nt(.5,.5),this.breath=0,this.currentState=0,this.transition=0,this.particleCount=3e4;try{this.audio=new yb}catch(e){console.warn("Audio failed to init",e),this.audio={initialize:()=>{},update:()=>{}}}this.setupUI(),this.setupBreathGuide(),this.setupParticles(),this.setupEvents(),this.setState(0),this.animate()}setupUI(){const e=document.createElement("div");e.id="energy-nav",e.style.cssText=`
      position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 40px; z-index: 100;
    `,Ba.forEach((t,n)=>{const s=document.createElement("button"),r=`<span style="display:inline-block; width:6px; height:6px; background-color:${t.color}; border-radius:50%; margin-right:10px; box-shadow:0 0 8px ${t.color};"></span>`;s.innerHTML=`${r}${t.name}`,s.style.cssText=`
        background: rgba(255, 255, 255, 0.02); 
        border: 1px solid rgba(255, 255, 255, 0.05); 
        padding: 10px 20px;
        border-radius: 30px;
        color: rgba(255,255,255,0.4); /* Softer text */
        font-family: 'Outfit', sans-serif; font-size: 10px; letter-spacing: 3px;
        cursor: pointer; transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); outline: none;
        display: flex; align-items: center;
        backdrop-filter: blur(2px);
      `,s.onmouseenter=()=>{s.style.background="rgba(255, 255, 255, 0.08)",s.style.borderColor=t.color,s.style.color="#fff",s.style.transform="translateY(-3px) scale(1.05)",s.style.boxShadow=`0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${t.color}20`},s.onmouseleave=()=>{this.currentState!==n&&(s.style.background="rgba(255, 255, 255, 0.02)",s.style.borderColor="rgba(255, 255, 255, 0.05)",s.style.color="rgba(255, 255, 255, 0.4)",s.style.transform="translateY(0) scale(1)",s.style.boxShadow="none")},s.onclick=()=>{this.setState(n),this.audio.initialize()},e.appendChild(s),t.element=s}),this.container.appendChild(e)}setState(e){this.currentState=e;const t=Ba[e];if(Ba.forEach((n,s)=>{s===e?(n.element.style.color="#fff",n.element.style.borderColor=n.color,n.element.style.background="rgba(255, 255, 255, 0.08)",n.element.style.boxShadow=`0 0 30px ${n.color}10, inset 0 0 20px ${n.color}10`,n.element.style.transform="translateY(-2px)"):(n.element.style.color="rgba(255,255,255,0.4)",n.element.style.borderColor="rgba(255, 255, 255, 0.05)",n.element.style.background="rgba(255, 255, 255, 0.02)",n.element.style.boxShadow="none",n.element.style.transform="translateY(0)")}),this.material){this.material.uniforms.uEnergyState.value=e,this.material.uniforms.uTransition.value=1;const n=new Float32Array(6);t.cores.forEach((s,r)=>{n[r*2]=s[0],n[r*2+1]=s[1]}),this.material.uniforms.uFocusPoints.value=n,this.material.uniforms.uFocusWeights.value=new Float32Array(t.weights)}}setupParticles(){const e=new Nn,t=new Float32Array(this.particleCount*3),n=new Float32Array(this.particleCount*3),s=new Float32Array(this.particleCount),r=Math.PI*(3-Math.sqrt(5));for(let o=0;o<this.particleCount;o++){const a=o/this.particleCount,c=Math.pow(a,.5)*45,l=o*r,u=c*Math.cos(l),h=c*Math.sin(l),d=20*(1-a*.8),p=(Math.random()-.5)*d;t[o*3]=u,t[o*3+1]=h*.9,t[o*3+2]=p,n[o*3]=Math.random(),n[o*3+1]=Math.random(),n[o*3+2]=Math.random(),s[o]=Math.random()*2+.5}e.setAttribute("position",new hn(t,3)),e.setAttribute("aRandom",new hn(n,3)),e.setAttribute("aSize",new hn(s,1)),this.material=new Rn({vertexShader:xb,fragmentShader:Sb,uniforms:{uTime:{value:0},uBreath:{value:0},uMouse:{value:this.mouse},uEnergyState:{value:0},uTransition:{value:0},uFocusPoints:{value:new Float32Array(6)},uFocusWeights:{value:new Float32Array(3)}},transparent:!0,blending:$a,depthWrite:!1}),this.points=new gx(e,this.material),this.scene.add(this.points)}setupEvents(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),window.addEventListener("click",async()=>{console.log("🖱️ User Clicked: Attempting to start Audio...");try{await md(),console.log("✅ Tone.start() resolved. AudioContext state:",rv.state),new es().toDestination().triggerAttackRelease("C5","8n"),console.log("🔊 Beep command sent."),await this.audio.initialize(),console.log("🎵 Audio Engine Initialized.")}catch(e){console.error("❌ Audio Init Error:",e)}},{once:!0}),this.targetMouse=new nt(.5,.5),this.currentMouse=new nt(.5,.5),window.addEventListener("mousemove",e=>{this.targetMouse.x=e.clientX/window.innerWidth,this.targetMouse.y=1-e.clientY/window.innerHeight})}setupBreathGuide(){this.breathLabel=document.createElement("div"),this.breathLabel.style.cssText=`
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      font-family: 'Outfit', sans-serif; font-size: 24px; letter-spacing: 12px;
      color: rgba(255, 255, 255, 0.9); pointer-events: none; opacity: 0;
      transition: opacity 1.5s, transform 0.1s;
      mix-blend-mode: normal; text-transform: uppercase;
      font-weight: 300;
      text-shadow: 0 0 30px rgba(255,255,255,0.6);
    `,this.container.appendChild(this.breathLabel)}updateBreath(e){const n=e%19;let s="",r=0,o=1;if(n<4)this.breath=n/4,s="Inhale",r=Math.sin(n/4*Math.PI)*.8,o=1+this.breath*.2;else if(n<11)this.breath=1,s="Hold",r=.5,o=1.2;else{const a=(n-11)/8;this.breath=1-a,s="Release",r=Math.sin(a*Math.PI)*.8,o=1.2-a*.2}this.material.uniforms.uBreath.value=this.breath,this.breathLabel.innerText!==s&&(this.breathLabel.innerText=s),this.breathLabel.style.opacity=r,this.breathLabel.style.transform=`translate(-50%, -50%) scale(${o})`}animate(){requestAnimationFrame(e=>{const t=e*.001;this.material&&(this.currentMouse.x+=(this.targetMouse.x-this.currentMouse.x)*.25,this.currentMouse.y+=(this.targetMouse.y-this.currentMouse.y)*.25,this.material.uniforms.uTime.value=t,this.material.uniforms.uMouse.value=this.currentMouse),this.updateBreath(t),this.audio.update(this.breath,this.currentState);const n=1-this.breath*.9;this.points.rotation.y+=1e-4*n,this.points.rotation.z+=5e-5*n,this.renderer.render(this.scene,this.camera),this.animate()})}}new Mb;
