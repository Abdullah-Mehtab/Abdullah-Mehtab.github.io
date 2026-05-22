(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Lu="modulepreload",Du=function(r,e){return new URL(r,e).href},ql={},Nu=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let u=function(f){return Promise.all(f.map(a=>Promise.resolve(a).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=l?.nonce||l?.getAttribute("nonce");i=u(t.map(f=>{if(f=Du(f,n),f in ql)return;ql[f]=!0;const a=f.endsWith(".css"),c=a?'[rel="stylesheet"]':"";if(n)for(let p=o.length-1;p>=0;p--){const _=o[p];if(_.href===f&&(!a||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${c}`))return;const d=document.createElement("link");if(d.rel=a?"stylesheet":Lu,a||(d.as="script"),d.crossOrigin="",d.href=f,h&&d.setAttribute("nonce",h),document.head.appendChild(d),a)return new Promise((p,_)=>{d.addEventListener("load",p),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};const il="183",Fu=0,Yl=1,Uu=2,Rs=1,Ou=2,ws=3,Wn=0,qt=1,Xt=2,En=0,Vi=1,ta=2,Kl=3,$l=4,Bu=5,mi=100,ku=101,zu=102,Vu=103,Gu=104,Hu=200,Wu=201,Xu=202,qu=203,na=204,ia=205,Yu=206,Ku=207,$u=208,Zu=209,ju=210,Ju=211,Qu=212,ed=213,td=214,sa=0,ra=1,oa=2,Wi=3,aa=4,la=5,ca=6,ha=7,Ih=0,nd=1,id=2,An=0,sl=1,rl=2,ol=3,$r=4,al=5,ll=6,cl=7,Zl="attached",sd="detached",Lh=300,xi=301,Xi=302,so=303,ro=304,Zr=306,rn=1e3,bn=1001,Gr=1002,At=1003,Dh=1004,Ts=1005,wt=1006,Nr=1007,wn=1008,Qt=1009,Nh=1010,Fh=1011,Us=1012,hl=1013,Cn=1014,on=1015,en=1016,ul=1017,dl=1018,Os=1020,Uh=35902,Oh=35899,Bh=1021,kh=1022,an=1023,Xn=1026,vi=1027,fl=1028,pl=1029,qi=1030,ml=1031,gl=1033,Fr=33776,Ur=33777,Or=33778,Br=33779,ua=35840,da=35841,fa=35842,pa=35843,ma=36196,ga=37492,_a=37496,va=37488,xa=37489,ya=37490,Ma=37491,Sa=37808,ba=37809,wa=37810,Ta=37811,Ea=37812,Aa=37813,Ra=37814,Ca=37815,Pa=37816,Ia=37817,La=37818,Da=37819,Na=37820,Fa=37821,Ua=36492,Oa=36494,Ba=36495,ka=36283,za=36284,Va=36285,Ga=36286,Bs=2300,ks=2301,oo=2302,jl=2303,Jl=2400,Ql=2401,ec=2402,rd=2500,od=0,zh=1,Ha=2,ad=3200,Vh=0,ld=1,ni="",Tt="srgb",Yt="srgb-linear",Hr="linear",Je="srgb",wi=7680,tc=519,cd=512,hd=513,ud=514,_l=515,dd=516,fd=517,vl=518,pd=519,Wa=35044,nc="300 es",Tn=2e3,zs=2001;function md(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function gd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Vs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _d(){const r=Vs("canvas");return r.style.display="block",r}const ic={};function Wr(...r){const e="THREE."+r.shift();console.log(e,...r)}function Gh(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ae(...r){r=Gh(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Le(...r){r=Gh(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Xr(...r){const e=r.join(" ");e in ic||(ic[e]=!0,Ae(...r))}function vd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const xd={[sa]:ra,[oa]:ca,[aa]:ha,[Wi]:la,[ra]:sa,[ca]:oa,[ha]:aa,[la]:Wi};class ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sc=1234567;const Cs=Math.PI/180,Yi=180/Math.PI;function ln(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]).toLowerCase()}function We(r,e,t){return Math.max(e,Math.min(t,r))}function xl(r,e){return(r%e+e)%e}function yd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Md(r,e,t){return r!==e?(t-r)/(e-r):0}function Ps(r,e,t){return(1-t)*r+t*e}function Sd(r,e,t,n){return Ps(r,e,1-Math.exp(-t*n))}function bd(r,e=1){return e-Math.abs(xl(r,e*2)-e)}function wd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Td(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ed(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ad(r,e){return r+Math.random()*(e-r)}function Rd(r){return r*(.5-Math.random())}function Cd(r){r!==void 0&&(sc=r);let e=sc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pd(r){return r*Cs}function Id(r){return r*Yi}function Ld(r){return(r&r-1)===0&&r!==0}function Dd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Nd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fd(r,e,t,n,i){const s=Math.cos,o=Math.sin,l=s(t/2),h=o(t/2),u=s((e+n)/2),f=o((e+n)/2),a=s((e-n)/2),c=o((e-n)/2),d=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(l*f,h*a,h*c,l*u);break;case"YZY":r.set(h*c,l*f,h*a,l*u);break;case"ZXZ":r.set(h*a,h*c,l*f,l*u);break;case"XZX":r.set(l*f,h*p,h*d,l*u);break;case"YXY":r.set(h*d,l*f,h*p,l*u);break;case"ZYZ":r.set(h*p,h*d,l*f,l*u);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Kt={DEG2RAD:Cs,RAD2DEG:Yi,generateUUID:ln,clamp:We,euclideanModulo:xl,mapLinear:yd,inverseLerp:Md,lerp:Ps,damp:Sd,pingpong:bd,smoothstep:wd,smootherstep:Td,randInt:Ed,randFloat:Ad,randFloatSpread:Rd,seededRandom:Cd,degToRad:Pd,radToDeg:Id,isPowerOfTwo:Ld,ceilPowerOfTwo:Dd,floorPowerOfTwo:Nd,setQuaternionFromProperEuler:Fd,normalize:tt,denormalize:pn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Et{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,l){let h=n[i+0],u=n[i+1],f=n[i+2],a=n[i+3],c=s[o+0],d=s[o+1],p=s[o+2],_=s[o+3];if(a!==_||h!==c||u!==d||f!==p){let g=h*c+u*d+f*p+a*_;g<0&&(c=-c,d=-d,p=-p,_=-_,g=-g);let m=1-l;if(g<.9995){const v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,l=Math.sin(l*v)/M,h=h*m+c*l,u=u*m+d*l,f=f*m+p*l,a=a*m+_*l}else{h=h*m+c*l,u=u*m+d*l,f=f*m+p*l,a=a*m+_*l;const v=1/Math.sqrt(h*h+u*u+f*f+a*a);h*=v,u*=v,f*=v,a*=v}}e[t]=h,e[t+1]=u,e[t+2]=f,e[t+3]=a}static multiplyQuaternionsFlat(e,t,n,i,s,o){const l=n[i],h=n[i+1],u=n[i+2],f=n[i+3],a=s[o],c=s[o+1],d=s[o+2],p=s[o+3];return e[t]=l*p+f*a+h*d-u*c,e[t+1]=h*p+f*c+u*a-l*d,e[t+2]=u*p+f*d+l*c-h*a,e[t+3]=f*p-l*a-h*c-u*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,l=Math.cos,h=Math.sin,u=l(n/2),f=l(i/2),a=l(s/2),c=h(n/2),d=h(i/2),p=h(s/2);switch(o){case"XYZ":this._x=c*f*a+u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a-c*d*p;break;case"YXZ":this._x=c*f*a+u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a+c*d*p;break;case"ZXY":this._x=c*f*a-u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a-c*d*p;break;case"ZYX":this._x=c*f*a-u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a+c*d*p;break;case"YZX":this._x=c*f*a+u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a-c*d*p;break;case"XZY":this._x=c*f*a-u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a+c*d*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],l=t[5],h=t[9],u=t[2],f=t[6],a=t[10],c=n+l+a;if(c>0){const d=.5/Math.sqrt(c+1);this._w=.25/d,this._x=(f-h)*d,this._y=(s-u)*d,this._z=(o-i)*d}else if(n>l&&n>a){const d=2*Math.sqrt(1+n-l-a);this._w=(f-h)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+u)/d}else if(l>a){const d=2*Math.sqrt(1+l-n-a);this._w=(s-u)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(h+f)/d}else{const d=2*Math.sqrt(1+a-n-l);this._w=(o-i)/d,this._x=(s+u)/d,this._y=(h+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,l=t._x,h=t._y,u=t._z,f=t._w;return this._x=n*f+o*l+i*u-s*h,this._y=i*f+o*h+s*l-n*u,this._z=s*f+o*u+n*h-i*l,this._w=o*f-n*l-i*h-s*u,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,l=this.dot(e);l<0&&(n=-n,i=-i,s=-s,o=-o,l=-l);let h=1-t;if(l<.9995){const u=Math.acos(l),f=Math.sin(u);h=Math.sin(h*u)/f,t=Math.sin(t*u)/f,this._x=this._x*h+n*t,this._y=this._y*h+i*t,this._z=this._z*h+s*t,this._w=this._w*h+o*t,this._onChangeCallback()}else this._x=this._x*h+n*t,this._y=this._y*h+i*t,this._z=this._z*h+s*t,this._w=this._w*h+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,l=e.z,h=e.w,u=2*(o*i-l*n),f=2*(l*t-s*i),a=2*(s*n-o*t);return this.x=t+h*u+o*a-l*f,this.y=n+h*f+l*u-s*a,this.z=i+h*a+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,l=t.y,h=t.z;return this.x=i*h-s*l,this.y=s*o-n*h,this.z=n*l-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ao.copy(this).projectOnVector(e),this.sub(ao)}reflect(e){return this.sub(ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ao=new R,rc=new Et;class Be{constructor(e,t,n,i,s,o,l,h,u){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,l,h,u)}set(e,t,n,i,s,o,l,h,u){const f=this.elements;return f[0]=e,f[1]=i,f[2]=l,f[3]=t,f[4]=s,f[5]=h,f[6]=n,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],l=n[3],h=n[6],u=n[1],f=n[4],a=n[7],c=n[2],d=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],M=i[4],S=i[7],E=i[2],T=i[5],C=i[8];return s[0]=o*_+l*v+h*E,s[3]=o*g+l*M+h*T,s[6]=o*m+l*S+h*C,s[1]=u*_+f*v+a*E,s[4]=u*g+f*M+a*T,s[7]=u*m+f*S+a*C,s[2]=c*_+d*v+p*E,s[5]=c*g+d*M+p*T,s[8]=c*m+d*S+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8];return t*o*f-t*l*u-n*s*f+n*l*h+i*s*u-i*o*h}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8],a=f*o-l*u,c=l*h-f*s,d=u*s-o*h,p=t*a+n*c+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=a*_,e[1]=(i*u-f*n)*_,e[2]=(l*n-i*o)*_,e[3]=c*_,e[4]=(f*t-i*h)*_,e[5]=(i*s-l*t)*_,e[6]=d*_,e[7]=(n*h-u*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,l){const h=Math.cos(s),u=Math.sin(s);return this.set(n*h,n*u,-n*(h*o+u*l)+o+e,-i*u,i*h,-i*(-u*o+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(lo.makeScale(e,t)),this}rotate(e){return this.premultiply(lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lo=new Be,oc=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ac=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ud(){const r={enabled:!0,workingColorSpace:Yt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Je&&(i.r=Hn(i.r),i.g=Hn(i.g),i.b=Hn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Je&&(i.r=Gi(i.r),i.g=Gi(i.g),i.b=Gi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ni?Hr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Yt]:{primaries:e,whitePoint:n,transfer:Hr,toXYZ:oc,fromXYZ:ac,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:oc,fromXYZ:ac,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}}),r}const qe=Ud();function Hn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ti;class Od{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ti===void 0&&(Ti=Vs("canvas")),Ti.width=e.width,Ti.height=e.height;const i=Ti.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ti}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Hn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Bd=0;class yl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,l=i.length;o<l;o++)i[o].isDataTexture?s.push(co(i[o].image)):s.push(co(i[o]))}else s=co(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function co(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Od.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let kd=0;const ho=new R;class Pt extends ts{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=bn,i=bn,s=wt,o=wn,l=an,h=Qt,u=Pt.DEFAULT_ANISOTROPY,f=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=ln(),this.name="",this.source=new yl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=h,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ho).x}get height(){return this.source.getSize(ho).y}get depth(){return this.source.getSize(ho).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rn:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rn:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Lh;Pt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,i=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const h=e.elements,u=h[0],f=h[4],a=h[8],c=h[1],d=h[5],p=h[9],_=h[2],g=h[6],m=h[10];if(Math.abs(f-c)<.01&&Math.abs(a-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(f+c)<.1&&Math.abs(a+_)<.1&&Math.abs(p+g)<.1&&Math.abs(u+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(u+1)/2,S=(d+1)/2,E=(m+1)/2,T=(f+c)/4,C=(a+_)/4,x=(p+g)/4;return M>S&&M>E?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=T/n,s=C/n):S>E?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=T/i,s=x/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=C/s,i=x/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(a-_)*(a-_)+(c-f)*(c-f));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(a-_)/v,this.z=(c-f)/v,this.w=Math.acos((u+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zd extends ts{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Pt(i),o=n.count;for(let l=0;l<o;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new yl(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $t extends zd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hh extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vd extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ke{constructor(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g)}set(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=l,m[13]=h,m[2]=u,m[6]=f,m[10]=a,m[14]=c,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ei.setFromMatrixColumn(e,0).length(),s=1/Ei.setFromMatrixColumn(e,1).length(),o=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),l=Math.sin(n),h=Math.cos(i),u=Math.sin(i),f=Math.cos(s),a=Math.sin(s);if(e.order==="XYZ"){const c=o*f,d=o*a,p=l*f,_=l*a;t[0]=h*f,t[4]=-h*a,t[8]=u,t[1]=d+p*u,t[5]=c-_*u,t[9]=-l*h,t[2]=_-c*u,t[6]=p+d*u,t[10]=o*h}else if(e.order==="YXZ"){const c=h*f,d=h*a,p=u*f,_=u*a;t[0]=c+_*l,t[4]=p*l-d,t[8]=o*u,t[1]=o*a,t[5]=o*f,t[9]=-l,t[2]=d*l-p,t[6]=_+c*l,t[10]=o*h}else if(e.order==="ZXY"){const c=h*f,d=h*a,p=u*f,_=u*a;t[0]=c-_*l,t[4]=-o*a,t[8]=p+d*l,t[1]=d+p*l,t[5]=o*f,t[9]=_-c*l,t[2]=-o*u,t[6]=l,t[10]=o*h}else if(e.order==="ZYX"){const c=o*f,d=o*a,p=l*f,_=l*a;t[0]=h*f,t[4]=p*u-d,t[8]=c*u+_,t[1]=h*a,t[5]=_*u+c,t[9]=d*u-p,t[2]=-u,t[6]=l*h,t[10]=o*h}else if(e.order==="YZX"){const c=o*h,d=o*u,p=l*h,_=l*u;t[0]=h*f,t[4]=_-c*a,t[8]=p*a+d,t[1]=a,t[5]=o*f,t[9]=-l*f,t[2]=-u*f,t[6]=d*a+p,t[10]=c-_*a}else if(e.order==="XZY"){const c=o*h,d=o*u,p=l*h,_=l*u;t[0]=h*f,t[4]=-a,t[8]=u*f,t[1]=c*a+_,t[5]=o*f,t[9]=d*a-p,t[2]=p*a-d,t[6]=l*f,t[10]=_*a+c}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gd,e,Hd)}lookAt(e,t,n){const i=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),$n.crossVectors(n,jt),$n.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),$n.crossVectors(n,jt)),$n.normalize(),er.crossVectors(jt,$n),i[0]=$n.x,i[4]=er.x,i[8]=jt.x,i[1]=$n.y,i[5]=er.y,i[9]=jt.y,i[2]=$n.z,i[6]=er.z,i[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],l=n[4],h=n[8],u=n[12],f=n[1],a=n[5],c=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],M=n[7],S=n[11],E=n[15],T=i[0],C=i[4],x=i[8],b=i[12],U=i[1],P=i[5],F=i[9],O=i[13],B=i[2],H=i[6],k=i[10],z=i[14],Q=i[3],Z=i[7],oe=i[11],pe=i[15];return s[0]=o*T+l*U+h*B+u*Q,s[4]=o*C+l*P+h*H+u*Z,s[8]=o*x+l*F+h*k+u*oe,s[12]=o*b+l*O+h*z+u*pe,s[1]=f*T+a*U+c*B+d*Q,s[5]=f*C+a*P+c*H+d*Z,s[9]=f*x+a*F+c*k+d*oe,s[13]=f*b+a*O+c*z+d*pe,s[2]=p*T+_*U+g*B+m*Q,s[6]=p*C+_*P+g*H+m*Z,s[10]=p*x+_*F+g*k+m*oe,s[14]=p*b+_*O+g*z+m*pe,s[3]=v*T+M*U+S*B+E*Q,s[7]=v*C+M*P+S*H+E*Z,s[11]=v*x+M*F+S*k+E*oe,s[15]=v*b+M*O+S*z+E*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],l=e[5],h=e[9],u=e[13],f=e[2],a=e[6],c=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15],v=h*d-u*c,M=l*d-u*a,S=l*c-h*a,E=o*d-u*f,T=o*c-h*f,C=o*a-l*f;return t*(_*v-g*M+m*S)-n*(p*v-g*E+m*T)+i*(p*M-_*E+m*C)-s*(p*S-_*T+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8],a=e[9],c=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=t*l-n*o,M=t*h-i*o,S=t*u-s*o,E=n*h-i*l,T=n*u-s*l,C=i*u-s*h,x=f*_-a*p,b=f*g-c*p,U=f*m-d*p,P=a*g-c*_,F=a*m-d*_,O=c*m-d*g,B=v*O-M*F+S*P+E*U-T*b+C*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/B;return e[0]=(l*O-h*F+u*P)*H,e[1]=(i*F-n*O-s*P)*H,e[2]=(_*C-g*T+m*E)*H,e[3]=(c*T-a*C-d*E)*H,e[4]=(h*U-o*O-u*b)*H,e[5]=(t*O-i*U+s*b)*H,e[6]=(g*S-p*C-m*M)*H,e[7]=(f*C-c*S+d*M)*H,e[8]=(o*F-l*U+u*x)*H,e[9]=(n*U-t*F-s*x)*H,e[10]=(p*T-_*S+m*v)*H,e[11]=(a*S-f*T-d*v)*H,e[12]=(l*b-o*P-h*x)*H,e[13]=(t*P-n*b+i*x)*H,e[14]=(_*M-p*E-g*v)*H,e[15]=(f*E-a*M+c*v)*H,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,l=e.y,h=e.z,u=s*o,f=s*l;return this.set(u*o+n,u*l-i*h,u*h+i*l,0,u*l+i*h,f*l+n,f*h-i*o,0,u*h-i*l,f*h+i*o,s*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,l=t._z,h=t._w,u=s+s,f=o+o,a=l+l,c=s*u,d=s*f,p=s*a,_=o*f,g=o*a,m=l*a,v=h*u,M=h*f,S=h*a,E=n.x,T=n.y,C=n.z;return i[0]=(1-(_+m))*E,i[1]=(d+S)*E,i[2]=(p-M)*E,i[3]=0,i[4]=(d-S)*T,i[5]=(1-(c+m))*T,i[6]=(g+v)*T,i[7]=0,i[8]=(p+M)*C,i[9]=(g-v)*C,i[10]=(1-(c+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ei.set(i[0],i[1],i[2]).length();const l=Ei.set(i[4],i[5],i[6]).length(),h=Ei.set(i[8],i[9],i[10]).length();s<0&&(o=-o),un.copy(this);const u=1/o,f=1/l,a=1/h;return un.elements[0]*=u,un.elements[1]*=u,un.elements[2]*=u,un.elements[4]*=f,un.elements[5]*=f,un.elements[6]*=f,un.elements[8]*=a,un.elements[9]*=a,un.elements[10]*=a,t.setFromRotationMatrix(un),n.x=o,n.y=l,n.z=h,this}makePerspective(e,t,n,i,s,o,l=Tn,h=!1){const u=this.elements,f=2*s/(t-e),a=2*s/(n-i),c=(t+e)/(t-e),d=(n+i)/(n-i);let p,_;if(h)p=s/(o-s),_=o*s/(o-s);else if(l===Tn)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(l===zs)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=f,u[4]=0,u[8]=c,u[12]=0,u[1]=0,u[5]=a,u[9]=d,u[13]=0,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,i,s,o,l=Tn,h=!1){const u=this.elements,f=2/(t-e),a=2/(n-i),c=-(t+e)/(t-e),d=-(n+i)/(n-i);let p,_;if(h)p=1/(o-s),_=o/(o-s);else if(l===Tn)p=-2/(o-s),_=-(o+s)/(o-s);else if(l===zs)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=f,u[4]=0,u[8]=0,u[12]=c,u[1]=0,u[5]=a,u[9]=0,u[13]=d,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ei=new R,un=new ke,Gd=new R(0,0,0),Hd=new R(1,1,1),$n=new R,er=new R,jt=new R,lc=new ke,cc=new Et;class cn{constructor(e=0,t=0,n=0,i=cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],l=i[8],h=i[1],u=i[5],f=i[9],a=i[2],c=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,d),this._z=Math.atan2(h,u)):(this._y=Math.atan2(-a,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-a,d),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,d),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-a,s)):(this._x=0,this._y=Math.atan2(l,d));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return lc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cc.setFromEuler(this),this.setFromQuaternion(cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cn.DEFAULT_ORDER="XYZ";class Wh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wd=0;const hc=new R,Ai=new Et,Fn=new ke,tr=new R,cs=new R,Xd=new R,qd=new Et,uc=new R(1,0,0),dc=new R(0,1,0),fc=new R(0,0,1),pc={type:"added"},Yd={type:"removed"},Ri={type:"childadded",child:null},uo={type:"childremoved",child:null};class pt extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new R,t=new cn,n=new Et,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new Be}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis(uc,e)}rotateY(e){return this.rotateOnAxis(dc,e)}rotateZ(e){return this.rotateOnAxis(fc,e)}translateOnAxis(e,t){return hc.copy(e).applyQuaternion(this.quaternion),this.position.add(hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uc,e)}translateY(e){return this.translateOnAxis(dc,e)}translateZ(e){return this.translateOnAxis(fc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?tr.copy(e):tr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(cs,tr,this.up):Fn.lookAt(tr,cs,this.up),this.quaternion.setFromRotationMatrix(Fn),i&&(Fn.extractRotation(i.matrixWorld),Ai.setFromRotationMatrix(Fn),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yd),uo.child=e,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,e,Xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,qd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(l=>({...l})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let u=0,f=h.length;u<f;u++){const a=h[u];s(e.shapes,a)}else s(e.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,u=this.material.length;h<u;h++)l.push(s(e.materials,this.material[h]));i.material=l}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];i.animations.push(s(e.animations,h))}}if(t){const l=o(e.geometries),h=o(e.materials),u=o(e.textures),f=o(e.images),a=o(e.shapes),c=o(e.skeletons),d=o(e.animations),p=o(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),u.length>0&&(n.textures=u),f.length>0&&(n.images=f),a.length>0&&(n.shapes=a),c.length>0&&(n.skeletons=c),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(l){const h=[];for(const u in l){const f=l[u];delete f.metadata,h.push(f)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}pt.DEFAULT_UP=new R(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $e extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kd={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const l=this._targetRay,h=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(u,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const f=u.joints["index-finger-tip"],a=u.joints["thumb-tip"],c=f.position.distanceTo(a.position),d=.02,p=.005;u.inputState.pinching&&c>d+p?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&c<=d-p&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Kd)))}return l!==null&&(l.visible=i!==null),h!==null&&(h.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},nr={h:0,s:0,l:0};function po(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=xl(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=po(o,s,e+1/3),this.g=po(o,s,e),this.b=po(o,s,e-1/3)}return qe.colorSpaceToWorking(this,i),this}setStyle(e,t=Tt){function n(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],l=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=Xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return qe.workingToColorSpace(Vt.copy(this),e),Math.round(We(Vt.r*255,0,255))*65536+Math.round(We(Vt.g*255,0,255))*256+Math.round(We(Vt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Vt.copy(this),t);const n=Vt.r,i=Vt.g,s=Vt.b,o=Math.max(n,i,s),l=Math.min(n,i,s);let h,u;const f=(l+o)/2;if(l===o)h=0,u=0;else{const a=o-l;switch(u=f<=.5?a/(o+l):a/(2-o-l),o){case n:h=(i-s)/a+(i<s?6:0);break;case i:h=(s-n)/a+2;break;case s:h=(n-i)/a+4;break}h/=6}return e.h=h,e.s=u,e.l=f,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Tt){qe.workingToColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,i=Vt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(nr);const n=Ps(Zn.h,nr.h,t),i=Ps(Zn.s,nr.s,t),s=Ps(Zn.l,nr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new fe;fe.NAMES=Xh;class Ml{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new fe(e),this.near=t,this.far=n}clone(){return new Ml(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class $d extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const dn=new R,Un=new R,mo=new R,On=new R,Ci=new R,Pi=new R,mc=new R,go=new R,_o=new R,vo=new R,xo=new ut,yo=new ut,Mo=new ut;class mn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),dn.subVectors(e,t),i.cross(dn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){dn.subVectors(i,t),Un.subVectors(n,t),mo.subVectors(e,t);const o=dn.dot(dn),l=dn.dot(Un),h=dn.dot(mo),u=Un.dot(Un),f=Un.dot(mo),a=o*u-l*l;if(a===0)return s.set(0,0,0),null;const c=1/a,d=(u*h-l*f)*c,p=(o*f-l*h)*c;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,n,i,s,o,l,h){return this.getBarycoord(e,t,n,i,On)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,On.x),h.addScaledVector(o,On.y),h.addScaledVector(l,On.z),h)}static getInterpolatedAttribute(e,t,n,i,s,o){return xo.setScalar(0),yo.setScalar(0),Mo.setScalar(0),xo.fromBufferAttribute(e,t),yo.fromBufferAttribute(e,n),Mo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(xo,s.x),o.addScaledVector(yo,s.y),o.addScaledVector(Mo,s.z),o}static isFrontFacing(e,t,n,i){return dn.subVectors(n,t),Un.subVectors(e,t),dn.cross(Un).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),dn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,l;Ci.subVectors(i,n),Pi.subVectors(s,n),go.subVectors(e,n);const h=Ci.dot(go),u=Pi.dot(go);if(h<=0&&u<=0)return t.copy(n);_o.subVectors(e,i);const f=Ci.dot(_o),a=Pi.dot(_o);if(f>=0&&a<=f)return t.copy(i);const c=h*a-f*u;if(c<=0&&h>=0&&f<=0)return o=h/(h-f),t.copy(n).addScaledVector(Ci,o);vo.subVectors(e,s);const d=Ci.dot(vo),p=Pi.dot(vo);if(p>=0&&d<=p)return t.copy(s);const _=d*u-h*p;if(_<=0&&u>=0&&p<=0)return l=u/(u-p),t.copy(n).addScaledVector(Pi,l);const g=f*p-d*a;if(g<=0&&a-f>=0&&d-p>=0)return mc.subVectors(s,i),l=(a-f)/(a-f+(d-p)),t.copy(i).addScaledVector(mc,l);const m=1/(g+_+c);return o=_*m,l=c*m,t.copy(n).addScaledVector(Ci,o).addScaledVector(Pi,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Pn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,fn):fn.fromBufferAttribute(s,o),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)),ir.applyMatrix4(e.matrixWorld),this.union(ir)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hs),sr.subVectors(this.max,hs),Ii.subVectors(e.a,hs),Li.subVectors(e.b,hs),Di.subVectors(e.c,hs),jn.subVectors(Li,Ii),Jn.subVectors(Di,Li),oi.subVectors(Ii,Di);let t=[0,-jn.z,jn.y,0,-Jn.z,Jn.y,0,-oi.z,oi.y,jn.z,0,-jn.x,Jn.z,0,-Jn.x,oi.z,0,-oi.x,-jn.y,jn.x,0,-Jn.y,Jn.x,0,-oi.y,oi.x,0];return!So(t,Ii,Li,Di,sr)||(t=[1,0,0,0,1,0,0,0,1],!So(t,Ii,Li,Di,sr))?!1:(rr.crossVectors(jn,Jn),t=[rr.x,rr.y,rr.z],So(t,Ii,Li,Di,sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Bn=[new R,new R,new R,new R,new R,new R,new R,new R],fn=new R,ir=new Pn,Ii=new R,Li=new R,Di=new R,jn=new R,Jn=new R,oi=new R,hs=new R,sr=new R,rr=new R,ai=new R;function So(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ai.fromArray(r,s);const l=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),h=e.dot(ai),u=t.dot(ai),f=n.dot(ai);if(Math.max(-Math.max(h,u,f),Math.min(h,u,f))>l)return!1}return!0}const bt=new R,or=new ae;let Zd=0;class yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Wa,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wa&&(e.usage=this.usage),e}}class qh extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yh extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ze extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const jd=new Pn,us=new R,bo=new R;class In{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;us.subVectors(e,this.center);const t=us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(us,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(us.copy(e.center).add(bo)),this.expandByPoint(us.copy(e.center).sub(bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Jd=0;const nn=new ke,wo=new pt,Ni=new R,Jt=new Pn,ds=new Pn,Ft=new R;class gt extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(md(e)?Yh:qh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return wo.lookAt(e),wo.updateMatrix(),this.applyMatrix4(wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ze(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];ds.setFromBufferAttribute(l),this.morphTargetsRelative?(Ft.addVectors(Jt.min,ds.min),Jt.expandByPoint(Ft),Ft.addVectors(Jt.max,ds.max),Jt.expandByPoint(Ft)):(Jt.expandByPoint(ds.min),Jt.expandByPoint(ds.max))}Jt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ft.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ft));if(t)for(let s=0,o=t.length;s<o;s++){const l=t[s],h=this.morphTargetsRelative;for(let u=0,f=l.count;u<f;u++)Ft.fromBufferAttribute(l,u),h&&(Ni.fromBufferAttribute(e,u),Ft.add(Ni)),i=Math.max(i,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),l=[],h=[];for(let x=0;x<n.count;x++)l[x]=new R,h[x]=new R;const u=new R,f=new R,a=new R,c=new ae,d=new ae,p=new ae,_=new R,g=new R;function m(x,b,U){u.fromBufferAttribute(n,x),f.fromBufferAttribute(n,b),a.fromBufferAttribute(n,U),c.fromBufferAttribute(s,x),d.fromBufferAttribute(s,b),p.fromBufferAttribute(s,U),f.sub(u),a.sub(u),d.sub(c),p.sub(c);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(f).multiplyScalar(p.y).addScaledVector(a,-d.y).multiplyScalar(P),g.copy(a).multiplyScalar(d.x).addScaledVector(f,-p.x).multiplyScalar(P),l[x].add(_),l[b].add(_),l[U].add(_),h[x].add(g),h[b].add(g),h[U].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,b=v.length;x<b;++x){const U=v[x],P=U.start,F=U.count;for(let O=P,B=P+F;O<B;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const M=new R,S=new R,E=new R,T=new R;function C(x){E.fromBufferAttribute(i,x),T.copy(E);const b=l[x];M.copy(b),M.sub(E.multiplyScalar(E.dot(b))).normalize(),S.crossVectors(T,b);const P=S.dot(h[x])<0?-1:1;o.setXYZW(x,M.x,M.y,M.z,P)}for(let x=0,b=v.length;x<b;++x){const U=v[x],P=U.start,F=U.count;for(let O=P,B=P+F;O<B;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let c=0,d=n.count;c<d;c++)n.setXYZ(c,0,0,0);const i=new R,s=new R,o=new R,l=new R,h=new R,u=new R,f=new R,a=new R;if(e)for(let c=0,d=e.count;c<d;c+=3){const p=e.getX(c+0),_=e.getX(c+1),g=e.getX(c+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),f.subVectors(o,s),a.subVectors(i,s),f.cross(a),l.fromBufferAttribute(n,p),h.fromBufferAttribute(n,_),u.fromBufferAttribute(n,g),l.add(f),h.add(f),u.add(f),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(_,h.x,h.y,h.z),n.setXYZ(g,u.x,u.y,u.z)}else for(let c=0,d=t.count;c<d;c+=3)i.fromBufferAttribute(t,c+0),s.fromBufferAttribute(t,c+1),o.fromBufferAttribute(t,c+2),f.subVectors(o,s),a.subVectors(i,s),f.cross(a),n.setXYZ(c+0,f.x,f.y,f.z),n.setXYZ(c+1,f.x,f.y,f.z),n.setXYZ(c+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(l,h){const u=l.array,f=l.itemSize,a=l.normalized,c=new u.constructor(h.length*f);let d=0,p=0;for(let _=0,g=h.length;_<g;_++){l.isInterleavedBufferAttribute?d=h[_]*l.data.stride+l.offset:d=h[_]*f;for(let m=0;m<f;m++)c[p++]=u[d++]}return new yt(c,f,a)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,n=this.index.array,i=this.attributes;for(const l in i){const h=i[l],u=e(h,n);t.setAttribute(l,u)}const s=this.morphAttributes;for(const l in s){const h=[],u=s[l];for(let f=0,a=u.length;f<a;f++){const c=u[f],d=e(c,n);h.push(d)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const u in h)h[u]!==void 0&&(e[u]=h[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const u=n[h];e.data.attributes[h]=u.toJSON(e.data)}const i={};let s=!1;for(const h in this.morphAttributes){const u=this.morphAttributes[h],f=[];for(let a=0,c=u.length;a<c;a++){const d=u[a];f.push(d.toJSON(e.data))}f.length>0&&(i[h]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const u in i){const f=i[u];this.setAttribute(u,f.clone(t))}const s=e.morphAttributes;for(const u in s){const f=[],a=s[u];for(let c=0,d=a.length;c<d;c++)f.push(a[c].clone(t));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const a=o[u];this.addGroup(a.start,a.count,a.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wa,this.updateRanges=[],this.version=0,this.uuid=ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new R;class Sl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Wr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Sl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Wr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ef=0;class Rn extends ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=ln(),this.name="",this.type="Material",this.blending=Vi,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==na&&(n.blendSrc=this.blendSrc),this.blendDst!==ia&&(n.blendDst=this.blendDst),this.blendEquation!==mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const l in s){const h=s[l];delete h.metadata,o.push(h)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const kn=new R,To=new R,ar=new R,Qn=new R,Eo=new R,lr=new R,Ao=new R;class jr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){To.copy(e).add(t).multiplyScalar(.5),ar.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(To);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ar),l=Qn.dot(this.direction),h=-Qn.dot(ar),u=Qn.lengthSq(),f=Math.abs(1-o*o);let a,c,d,p;if(f>0)if(a=o*h-l,c=o*l-h,p=s*f,a>=0)if(c>=-p)if(c<=p){const _=1/f;a*=_,c*=_,d=a*(a+o*c+2*l)+c*(o*a+c+2*h)+u}else c=s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;else c=-s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;else c<=-p?(a=Math.max(0,-(-o*s+l)),c=a>0?-s:Math.min(Math.max(-s,-h),s),d=-a*a+c*(c+2*h)+u):c<=p?(a=0,c=Math.min(Math.max(-s,-h),s),d=c*(c+2*h)+u):(a=Math.max(0,-(o*s+l)),c=a>0?s:Math.min(Math.max(-s,-h),s),d=-a*a+c*(c+2*h)+u);else c=o>0?-s:s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,a),i&&i.copy(To).addScaledVector(ar,c),d}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const n=kn.dot(this.direction),i=kn.dot(kn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),l=n-o,h=n+o;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,l,h;const u=1/this.direction.x,f=1/this.direction.y,a=1/this.direction.z,c=this.origin;return u>=0?(n=(e.min.x-c.x)*u,i=(e.max.x-c.x)*u):(n=(e.max.x-c.x)*u,i=(e.min.x-c.x)*u),f>=0?(s=(e.min.y-c.y)*f,o=(e.max.y-c.y)*f):(s=(e.max.y-c.y)*f,o=(e.min.y-c.y)*f),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),a>=0?(l=(e.min.z-c.z)*a,h=(e.max.z-c.z)*a):(l=(e.max.z-c.z)*a,h=(e.min.z-c.z)*a),n>h||l>i)||((l>n||n!==n)&&(n=l),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,n,i,s){Eo.subVectors(t,e),lr.subVectors(n,e),Ao.crossVectors(Eo,lr);let o=this.direction.dot(Ao),l;if(o>0){if(i)return null;l=1}else if(o<0)l=-1,o=-o;else return null;Qn.subVectors(this.origin,e);const h=l*this.direction.dot(lr.crossVectors(Qn,lr));if(h<0)return null;const u=l*this.direction.dot(Eo.cross(Qn));if(u<0||h+u>o)return null;const f=-l*Qn.dot(Ao);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gc=new ke,li=new jr,cr=new In,_c=new R,hr=new R,ur=new R,dr=new R,Ro=new R,fr=new R,vc=new R,pr=new R;class ye extends pt{constructor(e=new gt,t=new Rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const l=this.morphTargetInfluences;if(s&&l){fr.set(0,0,0);for(let h=0,u=s.length;h<u;h++){const f=l[h],a=s[h];f!==0&&(Ro.fromBufferAttribute(a,e),o?fr.addScaledVector(Ro,f):fr.addScaledVector(Ro.sub(t),f))}t.add(fr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(s),li.copy(e.ray).recast(e.near),!(cr.containsPoint(li.origin)===!1&&(li.intersectSphere(cr,_c)===null||li.origin.distanceToSquared(_c)>(e.far-e.near)**2))&&(gc.copy(s).invert(),li.copy(e.ray).applyMatrix4(gc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,li)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,l=s.index,h=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,a=s.attributes.normal,c=s.groups,d=s.drawRange;if(l!==null)if(Array.isArray(o))for(let p=0,_=c.length;p<_;p++){const g=c[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let S=v,E=M;S<E;S+=3){const T=l.getX(S),C=l.getX(S+1),x=l.getX(S+2);i=mr(this,m,e,n,u,f,a,T,C,x),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=l.getX(g),M=l.getX(g+1),S=l.getX(g+2);i=mr(this,o,e,n,u,f,a,v,M,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(h!==void 0)if(Array.isArray(o))for(let p=0,_=c.length;p<_;p++){const g=c[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(h.count,Math.min(g.start+g.count,d.start+d.count));for(let S=v,E=M;S<E;S+=3){const T=S,C=S+1,x=S+2;i=mr(this,m,e,n,u,f,a,T,C,x),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(h.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=g,M=g+1,S=g+2;i=mr(this,o,e,n,u,f,a,v,M,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function tf(r,e,t,n,i,s,o,l){let h;if(e.side===qt?h=n.intersectTriangle(o,s,i,!0,l):h=n.intersectTriangle(i,s,o,e.side===Wn,l),h===null)return null;pr.copy(l),pr.applyMatrix4(r.matrixWorld);const u=t.ray.origin.distanceTo(pr);return u<t.near||u>t.far?null:{distance:u,point:pr.clone(),object:r}}function mr(r,e,t,n,i,s,o,l,h,u){r.getVertexPosition(l,hr),r.getVertexPosition(h,ur),r.getVertexPosition(u,dr);const f=tf(r,e,t,n,hr,ur,dr,vc);if(f){const a=new R;mn.getBarycoord(vc,hr,ur,dr,a),i&&(f.uv=mn.getInterpolatedAttribute(i,l,h,u,a,new ae)),s&&(f.uv1=mn.getInterpolatedAttribute(s,l,h,u,a,new ae)),o&&(f.normal=mn.getInterpolatedAttribute(o,l,h,u,a,new R),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const c={a:l,b:h,c:u,normal:new R,materialIndex:0};mn.getNormal(hr,ur,dr,c.normal),f.face=c,f.barycoord=a}return f}const xc=new R,yc=new ut,Mc=new ut,nf=new R,Sc=new ke,gr=new R,Co=new In,bc=new ke,Po=new jr;class sf extends ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Zl,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gr),this.boundingBox.expandByPoint(gr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gr),this.boundingSphere.expandByPoint(gr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Co.copy(this.boundingSphere),Co.applyMatrix4(i),e.ray.intersectsSphere(Co)!==!1&&(bc.copy(i).invert(),Po.copy(e.ray).applyMatrix4(bc),!(this.boundingBox!==null&&Po.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Po)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Zl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===sd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;yc.fromBufferAttribute(i.attributes.skinIndex,e),Mc.fromBufferAttribute(i.attributes.skinWeight,e),xc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Mc.getComponent(s);if(o!==0){const l=yc.getComponent(s);Sc.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(nf.copy(xc).applyMatrix4(Sc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Kh extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class bl extends Pt{constructor(e=null,t=1,n=1,i,s,o,l,h,u=At,f=At,a,c){super(null,o,l,h,u,f,i,s,a,c),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wc=new ke,rf=new ke;class wl{constructor(e=[],t=[]){this.uuid=ln(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const l=e[s]?e[s].matrixWorld:rf;wc.multiplyMatrices(l,t[s]),wc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new wl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new bl(t,e,e,an,on);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Ae("Skeleton: No bone found with UUID:",s),o=new Kh),this.bones.push(o),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const l=n[i];e.boneInverses.push(l.toArray())}return e}}class Xa extends yt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Fi=new ke,Tc=new ke,_r=[],Ec=new Pn,of=new ke,fs=new ye,ps=new In;class af extends ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xa(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,of)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fi),Ec.copy(e.boundingBox).applyMatrix4(Fi),this.boundingBox.union(Ec)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fi),ps.copy(e.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(ps)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let l=0;l<n.length;l++)n[l]=i[o+l]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ps.copy(this.boundingSphere),ps.applyMatrix4(n),e.ray.intersectsSphere(ps)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Fi),Tc.multiplyMatrices(n,Fi),fs.matrixWorld=Tc,fs.raycast(e,_r);for(let o=0,l=_r.length;o<l;o++){const h=_r[o];h.instanceId=s,h.object=this,t.push(h)}_r.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new bl(new Float32Array(i*this.count),i,this.count,fl,on));const s=this.morphTexture.source.data.data;let o=0;for(let u=0;u<n.length;u++)o+=n[u];const l=this.geometry.morphTargetsRelative?1:1-o,h=i*e;s[h]=l,s.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Io=new R,lf=new R,cf=new Be;class pi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Io.subVectors(n,t).cross(lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Io),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||cf.getNormalMatrix(e),i=this.coplanarPoint(Io).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new In,hf=new ae(.5,.5),vr=new R;class Tl{constructor(e=new pi,t=new pi,n=new pi,i=new pi,s=new pi,o=new pi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(i),l[4].copy(s),l[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){const i=this.planes,s=e.elements,o=s[0],l=s[1],h=s[2],u=s[3],f=s[4],a=s[5],c=s[6],d=s[7],p=s[8],_=s[9],g=s[10],m=s[11],v=s[12],M=s[13],S=s[14],E=s[15];if(i[0].setComponents(u-o,d-f,m-p,E-v).normalize(),i[1].setComponents(u+o,d+f,m+p,E+v).normalize(),i[2].setComponents(u+l,d+a,m+_,E+M).normalize(),i[3].setComponents(u-l,d-a,m-_,E-M).normalize(),n)i[4].setComponents(h,c,g,S).normalize(),i[5].setComponents(u-h,d-c,m-g,E-S).normalize();else if(i[4].setComponents(u-h,d-c,m-g,E-S).normalize(),t===Tn)i[5].setComponents(u+h,d+c,m+g,E+S).normalize();else if(t===zs)i[5].setComponents(h,c,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){ci.center.set(0,0,0);const t=hf.distanceTo(e.center);return ci.radius=.7071067811865476+t,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(vr.x=i.normal.x>0?e.max.x:e.min.x,vr.y=i.normal.y>0?e.max.y:e.min.y,vr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(vr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $h extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qr=new R,Yr=new R,Ac=new ke,ms=new jr,xr=new In,Lo=new R,Rc=new R;class El extends pt{constructor(e=new gt,t=new $h){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)qr.fromBufferAttribute(t,i-1),Yr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=qr.distanceTo(Yr);e.setAttribute("lineDistance",new Ze(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=s,e.ray.intersectsSphere(xr)===!1)return;Ac.copy(i).invert(),ms.copy(e.ray).applyMatrix4(Ac);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,u=this.isLineSegments?2:1,f=n.index,c=n.attributes.position;if(f!==null){const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=u){const m=f.getX(_),v=f.getX(_+1),M=yr(this,e,ms,h,m,v,_);M&&t.push(M)}if(this.isLineLoop){const _=f.getX(p-1),g=f.getX(d),m=yr(this,e,ms,h,_,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=u){const m=yr(this,e,ms,h,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=yr(this,e,ms,h,p-1,d,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function yr(r,e,t,n,i,s,o){const l=r.geometry.attributes.position;if(qr.fromBufferAttribute(l,i),Yr.fromBufferAttribute(l,s),t.distanceSqToSegment(qr,Yr,Lo,Rc)>n)return;Lo.applyMatrix4(r.matrixWorld);const u=e.ray.origin.distanceTo(Lo);if(!(u<e.near||u>e.far))return{distance:u,point:Rc.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Cc=new R,Pc=new R;class uf extends El{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Cc.fromBufferAttribute(t,i),Pc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Cc.distanceTo(Pc);e.setAttribute("lineDistance",new Ze(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class df extends El{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Kr extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ic=new ke,qa=new jr,Mr=new In,Sr=new R;class Ya extends pt{constructor(e=new gt,t=new Kr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(i),Mr.radius+=s,e.ray.intersectsSphere(Mr)===!1)return;Ic.copy(i).invert(),qa.copy(e.ray).applyMatrix4(Ic);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,u=n.index,a=n.attributes.position;if(u!==null){const c=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=c,_=d;p<_;p++){const g=u.getX(p);Sr.fromBufferAttribute(a,g),Lc(Sr,g,h,i,e,t,this)}}else{const c=Math.max(0,o.start),d=Math.min(a.count,o.start+o.count);for(let p=c,_=d;p<_;p++)Sr.fromBufferAttribute(a,p),Lc(Sr,p,h,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function Lc(r,e,t,n,i,s,o){const l=qa.distanceSqToPoint(r);if(l<t){const h=new R;qa.closestPointToPoint(r,h),h.applyMatrix4(n);const u=i.ray.origin.distanceTo(h);if(u<i.near||u>i.far)return;s.push({distance:u,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Zh extends Pt{constructor(e=[],t=xi,n,i,s,o,l,h,u,f){super(e,t,n,i,s,o,l,h,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ks extends Pt{constructor(e,t,n,i,s,o,l,h,u){super(e,t,n,i,s,o,l,h,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gs extends Pt{constructor(e,t,n=Cn,i,s,o,l=At,h=At,u,f=Xn,a=1){if(f!==Xn&&f!==vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const c={width:e,height:t,depth:a};super(c,i,s,o,l,h,f,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ff extends Gs{constructor(e,t=Cn,n=xi,i,s,o=At,l=At,h,u=Xn){const f={width:e,height:e,depth:1},a=[f,f,f,f,f,f];super(e,e,t,n,i,s,o,l,h,u),this.image=a,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class jh extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ut extends gt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const l=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const h=[],u=[],f=[],a=[];let c=0,d=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(h),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(f,3)),this.setAttribute("uv",new Ze(a,2));function p(_,g,m,v,M,S,E,T,C,x,b){const U=S/C,P=E/x,F=S/2,O=E/2,B=T/2,H=C+1,k=x+1;let z=0,Q=0;const Z=new R;for(let oe=0;oe<k;oe++){const pe=oe*P-O;for(let le=0;le<H;le++){const De=le*U-F;Z[_]=De*v,Z[g]=pe*M,Z[m]=B,u.push(Z.x,Z.y,Z.z),Z[_]=0,Z[g]=0,Z[m]=T>0?1:-1,f.push(Z.x,Z.y,Z.z),a.push(le/C),a.push(1-oe/x),z+=1}}for(let oe=0;oe<x;oe++)for(let pe=0;pe<C;pe++){const le=c+pe+H*oe,De=c+pe+H*(oe+1),rt=c+(pe+1)+H*(oe+1),ht=c+(pe+1)+H*oe;h.push(le,De,ht),h.push(De,rt,ht),Q+=6}l.addGroup(d,Q,b),d+=Q,c+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yi extends gt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],l=[],h=[],u=new R,f=new ae;o.push(0,0,0),l.push(0,0,1),h.push(.5,.5);for(let a=0,c=3;a<=t;a++,c+=3){const d=n+a/t*i;u.x=e*Math.cos(d),u.y=e*Math.sin(d),o.push(u.x,u.y,u.z),l.push(0,0,1),f.x=(o[c]/e+1)/2,f.y=(o[c+1]/e+1)/2,h.push(f.x,f.y)}for(let a=1;a<=t;a++)s.push(a,a+1,0);this.setIndex(s),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class qn extends gt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:h};const u=this;i=Math.floor(i),s=Math.floor(s);const f=[],a=[],c=[],d=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(d,2));function v(){const S=new R,E=new R;let T=0;const C=(t-e)/n;for(let x=0;x<=s;x++){const b=[],U=x/s,P=U*(t-e)+e;for(let F=0;F<=i;F++){const O=F/i,B=O*h+l,H=Math.sin(B),k=Math.cos(B);E.x=P*H,E.y=-U*n+g,E.z=P*k,a.push(E.x,E.y,E.z),S.set(H,C,k).normalize(),c.push(S.x,S.y,S.z),d.push(O,1-U),b.push(p++)}_.push(b)}for(let x=0;x<i;x++)for(let b=0;b<s;b++){const U=_[b][x],P=_[b+1][x],F=_[b+1][x+1],O=_[b][x+1];(e>0||b!==0)&&(f.push(U,P,O),T+=3),(t>0||b!==s-1)&&(f.push(P,F,O),T+=3)}u.addGroup(m,T,0),m+=T}function M(S){const E=p,T=new ae,C=new R;let x=0;const b=S===!0?e:t,U=S===!0?1:-1;for(let F=1;F<=i;F++)a.push(0,g*U,0),c.push(0,U,0),d.push(.5,.5),p++;const P=p;for(let F=0;F<=i;F++){const B=F/i*h+l,H=Math.cos(B),k=Math.sin(B);C.x=b*k,C.y=g*U,C.z=b*H,a.push(C.x,C.y,C.z),c.push(0,U,0),T.x=H*.5+.5,T.y=k*.5*U+.5,d.push(T.x,T.y),p++}for(let F=0;F<i;F++){const O=E+F,B=P+F;S===!0?f.push(B,B+1,O):f.push(B+1,B,O),x+=3}u.addGroup(m,x,S===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $s extends qn{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,l=Math.PI*2){super(0,e,t,n,i,s,o,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:l}}static fromJSON(e){return new $s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jr extends gt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];l(i),u(n),f(),this.setAttribute("position",new Ze(s,3)),this.setAttribute("normal",new Ze(s.slice(),3)),this.setAttribute("uv",new Ze(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function l(v){const M=new R,S=new R,E=new R;for(let T=0;T<t.length;T+=3)d(t[T+0],M),d(t[T+1],S),d(t[T+2],E),h(M,S,E,v)}function h(v,M,S,E){const T=E+1,C=[];for(let x=0;x<=T;x++){C[x]=[];const b=v.clone().lerp(S,x/T),U=M.clone().lerp(S,x/T),P=T-x;for(let F=0;F<=P;F++)F===0&&x===T?C[x][F]=b:C[x][F]=b.clone().lerp(U,F/P)}for(let x=0;x<T;x++)for(let b=0;b<2*(T-x)-1;b++){const U=Math.floor(b/2);b%2===0?(c(C[x][U+1]),c(C[x+1][U]),c(C[x][U])):(c(C[x][U+1]),c(C[x+1][U+1]),c(C[x+1][U]))}}function u(v){const M=new R;for(let S=0;S<s.length;S+=3)M.x=s[S+0],M.y=s[S+1],M.z=s[S+2],M.normalize().multiplyScalar(v),s[S+0]=M.x,s[S+1]=M.y,s[S+2]=M.z}function f(){const v=new R;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const S=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;o.push(S,1-E)}p(),a()}function a(){for(let v=0;v<o.length;v+=6){const M=o[v+0],S=o[v+2],E=o[v+4],T=Math.max(M,S,E),C=Math.min(M,S,E);T>.9&&C<.1&&(M<.2&&(o[v+0]+=1),S<.2&&(o[v+2]+=1),E<.2&&(o[v+4]+=1))}}function c(v){s.push(v.x,v.y,v.z)}function d(v,M){const S=v*3;M.x=e[S+0],M.y=e[S+1],M.z=e[S+2]}function p(){const v=new R,M=new R,S=new R,E=new R,T=new ae,C=new ae,x=new ae;for(let b=0,U=0;b<s.length;b+=9,U+=6){v.set(s[b+0],s[b+1],s[b+2]),M.set(s[b+3],s[b+4],s[b+5]),S.set(s[b+6],s[b+7],s[b+8]),T.set(o[U+0],o[U+1]),C.set(o[U+2],o[U+3]),x.set(o[U+4],o[U+5]),E.copy(v).add(M).add(S).divideScalar(3);const P=g(E);_(T,U+0,v,P),_(C,U+2,M,P),_(x,U+4,S,P)}}function _(v,M,S,E){E<0&&v.x===1&&(o[M]=v.x-1),S.x===0&&S.z===0&&(o[M]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.vertices,e.indices,e.radius,e.detail)}}class Ln{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let l=0,h=s-1,u;for(;l<=h;)if(i=Math.floor(l+(h-l)/2),u=n[i]-o,u<0)l=i+1;else if(u>0)h=i-1;else{h=i;break}if(i=h,n[i]===o)return i/(s-1);const f=n[i],c=n[i+1]-f,d=(o-f)/c;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),l=this.getPoint(s),h=t||(o.isVector2?new ae:new R);return h.copy(l).sub(o).normalize(),h}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],o=[],l=new R,h=new ke;for(let d=0;d<=e;d++){const p=d/e;i[d]=this.getTangentAt(p,new R)}s[0]=new R,o[0]=new R;let u=Number.MAX_VALUE;const f=Math.abs(i[0].x),a=Math.abs(i[0].y),c=Math.abs(i[0].z);f<=u&&(u=f,n.set(1,0,0)),a<=u&&(u=a,n.set(0,1,0)),c<=u&&n.set(0,0,1),l.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],l),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),l.crossVectors(i[d-1],i[d]),l.length()>Number.EPSILON){l.normalize();const p=Math.acos(We(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(h.makeRotationAxis(l,p))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(We(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(l.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(h.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Al extends Ln{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,l=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=l,this.aRotation=h}getPoint(e,t=new ae){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const l=this.aStartAngle+e*s;let h=this.aX+this.xRadius*Math.cos(l),u=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const f=Math.cos(this.aRotation),a=Math.sin(this.aRotation),c=h-this.aX,d=u-this.aY;h=c*f-d*a+this.aX,u=c*a+d*f+this.aY}return n.set(h,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pf extends Al{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Rl(){let r=0,e=0,t=0,n=0;function i(s,o,l,h){r=s,e=l,t=-3*s+3*o-2*l-h,n=2*s-2*o+l+h}return{initCatmullRom:function(s,o,l,h,u){i(o,l,u*(l-s),u*(h-o))},initNonuniformCatmullRom:function(s,o,l,h,u,f,a){let c=(o-s)/u-(l-s)/(u+f)+(l-o)/f,d=(l-o)/f-(h-o)/(f+a)+(h-l)/a;c*=f,d*=f,i(o,l,c,d)},calc:function(s){const o=s*s,l=o*s;return r+e*s+t*o+n*l}}}const br=new R,Do=new Rl,No=new Rl,Fo=new Rl;class mf extends Ln{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let l=Math.floor(o),h=o-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1);let u,f;this.closed||l>0?u=i[(l-1)%s]:(br.subVectors(i[0],i[1]).add(i[0]),u=br);const a=i[l%s],c=i[(l+1)%s];if(this.closed||l+2<s?f=i[(l+2)%s]:(br.subVectors(i[s-1],i[s-2]).add(i[s-1]),f=br),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(u.distanceToSquared(a),d),_=Math.pow(a.distanceToSquared(c),d),g=Math.pow(c.distanceToSquared(f),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Do.initNonuniformCatmullRom(u.x,a.x,c.x,f.x,p,_,g),No.initNonuniformCatmullRom(u.y,a.y,c.y,f.y,p,_,g),Fo.initNonuniformCatmullRom(u.z,a.z,c.z,f.z,p,_,g)}else this.curveType==="catmullrom"&&(Do.initCatmullRom(u.x,a.x,c.x,f.x,this.tension),No.initCatmullRom(u.y,a.y,c.y,f.y,this.tension),Fo.initCatmullRom(u.z,a.z,c.z,f.z,this.tension));return n.set(Do.calc(h),No.calc(h),Fo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Dc(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,l=r*r,h=r*l;return(2*t-2*n+s+o)*h+(-3*t+3*n-2*s-o)*l+s*r+t}function gf(r,e){const t=1-r;return t*t*e}function _f(r,e){return 2*(1-r)*r*e}function vf(r,e){return r*r*e}function Is(r,e,t,n){return gf(r,e)+_f(r,t)+vf(r,n)}function xf(r,e){const t=1-r;return t*t*t*e}function yf(r,e){const t=1-r;return 3*t*t*r*e}function Mf(r,e){return 3*(1-r)*r*r*e}function Sf(r,e){return r*r*r*e}function Ls(r,e,t,n,i){return xf(r,e)+yf(r,t)+Mf(r,n)+Sf(r,i)}class Jh extends Ln{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,o=this.v2,l=this.v3;return n.set(Ls(e,i.x,s.x,o.x,l.x),Ls(e,i.y,s.y,o.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bf extends Ln{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2,l=this.v3;return n.set(Ls(e,i.x,s.x,o.x,l.x),Ls(e,i.y,s.y,o.y,l.y),Ls(e,i.z,s.z,o.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qh extends Ln{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wf extends Ln{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class eu extends Ln{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Is(e,i.x,s.x,o.x),Is(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tf extends Ln{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Is(e,i.x,s.x,o.x),Is(e,i.y,s.y,o.y),Is(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tu extends Ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),l=s-o,h=i[o===0?o:o-1],u=i[o],f=i[o>i.length-2?i.length-1:o+1],a=i[o>i.length-3?i.length-1:o+2];return n.set(Dc(l,h.x,u.x,f.x,a.x),Dc(l,h.y,u.y,f.y,a.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ae().fromArray(i))}return this}}var Nc=Object.freeze({__proto__:null,ArcCurve:pf,CatmullRomCurve3:mf,CubicBezierCurve:Jh,CubicBezierCurve3:bf,EllipseCurve:Al,LineCurve:Qh,LineCurve3:wf,QuadraticBezierCurve:eu,QuadraticBezierCurve3:Tf,SplineCurve:tu});class Ef extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,l=this.curves[s],h=l.getLength(),u=h===0?0:1-o/h;return l.getPointAt(u,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],l=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,h=o.getPoints(l);for(let u=0;u<h.length;u++){const f=h[u];n&&n.equals(f)||(t.push(f),n=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Nc[i.type]().fromJSON(i))}return this}}class Ka extends Ef{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Qh(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new eu(this.currentPoint.clone(),new ae(e,t),new ae(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const l=new Jh(this.currentPoint.clone(),new ae(e,t),new ae(n,i),new ae(s,o));return this.curves.push(l),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new tu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(e+l,t+h,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,l,h){const u=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+u,t+f,n,i,s,o,l,h),this}absellipse(e,t,n,i,s,o,l,h){const u=new Al(e,t,n,i,s,o,l,h);if(this.curves.length>0){const a=u.getPoint(0);a.equals(this.currentPoint)||this.lineTo(a.x,a.y)}this.curves.push(u);const f=u.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class nu extends Ka{constructor(e){super(e),this.uuid=ln(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ka().fromJSON(i))}return this}}function Af(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=iu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let l,h,u;if(n&&(s=Lf(r,e,s,t)),r.length>80*t){l=r[0],h=r[1];let f=l,a=h;for(let c=t;c<i;c+=t){const d=r[c],p=r[c+1];d<l&&(l=d),p<h&&(h=p),d>f&&(f=d),p>a&&(a=p)}u=Math.max(f-l,a-h),u=u!==0?32767/u:0}return Hs(s,o,t,l,h,u,0),o}function iu(r,e,t,n,i){let s;if(i===Hf(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=Fc(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Fc(o/n|0,r[o],r[o+1],s);return s&&Ki(s,s.next)&&(Xs(s),s=s.next),s}function Mi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Ki(t,t.next)||mt(t.prev,t,t.next)===0)){if(Xs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Hs(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Of(r,n,i,s);let l=r;for(;r.prev!==r.next;){const h=r.prev,u=r.next;if(s?Cf(r,n,i,s):Rf(r)){e.push(h.i,r.i,u.i),Xs(r),r=u.next,l=u.next;continue}if(r=u,r===l){o?o===1?(r=Pf(Mi(r),e),Hs(r,e,t,n,i,s,2)):o===2&&If(r,e,t,n,i,s):Hs(Mi(r),e,t,n,i,s,1);break}}}function Rf(r){const e=r.prev,t=r,n=r.next;if(mt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,l=e.y,h=t.y,u=n.y,f=Math.min(i,s,o),a=Math.min(l,h,u),c=Math.max(i,s,o),d=Math.max(l,h,u);let p=n.next;for(;p!==e;){if(p.x>=f&&p.x<=c&&p.y>=a&&p.y<=d&&Es(i,l,s,h,o,u,p.x,p.y)&&mt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Cf(r,e,t,n){const i=r.prev,s=r,o=r.next;if(mt(i,s,o)>=0)return!1;const l=i.x,h=s.x,u=o.x,f=i.y,a=s.y,c=o.y,d=Math.min(l,h,u),p=Math.min(f,a,c),_=Math.max(l,h,u),g=Math.max(f,a,c),m=$a(d,p,e,t,n),v=$a(_,g,e,t,n);let M=r.prevZ,S=r.nextZ;for(;M&&M.z>=m&&S&&S.z<=v;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&Es(l,f,h,a,u,c,M.x,M.y)&&mt(M.prev,M,M.next)>=0||(M=M.prevZ,S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==i&&S!==o&&Es(l,f,h,a,u,c,S.x,S.y)&&mt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&Es(l,f,h,a,u,c,M.x,M.y)&&mt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;S&&S.z<=v;){if(S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==i&&S!==o&&Es(l,f,h,a,u,c,S.x,S.y)&&mt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Pf(r,e){let t=r;do{const n=t.prev,i=t.next.next;!Ki(n,i)&&ru(n,t,t.next,i)&&Ws(n,i)&&Ws(i,n)&&(e.push(n.i,t.i,i.i),Xs(t),Xs(t.next),t=r=i),t=t.next}while(t!==r);return Mi(t)}function If(r,e,t,n,i,s){let o=r;do{let l=o.next.next;for(;l!==o.prev;){if(o.i!==l.i&&zf(o,l)){let h=ou(o,l);o=Mi(o,o.next),h=Mi(h,h.next),Hs(o,e,t,n,i,s,0),Hs(h,e,t,n,i,s,0);return}l=l.next}o=o.next}while(o!==r)}function Lf(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const l=e[s]*n,h=s<o-1?e[s+1]*n:r.length,u=iu(r,l,h,n,!1);u===u.next&&(u.steiner=!0),i.push(kf(u))}i.sort(Df);for(let s=0;s<i.length;s++)t=Nf(i[s],t);return t}function Df(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Nf(r,e){const t=Ff(r,e);if(!t)return e;const n=ou(t,r);return Mi(n,n.next),Mi(t,t.next)}function Ff(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(Ki(r,t))return t;do{if(Ki(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;const l=o,h=o.x,u=o.y;let f=1/0;t=o;do{if(n>=t.x&&t.x>=h&&n!==t.x&&su(i<u?n:s,i,h,u,i<u?s:n,i,t.x,t.y)){const a=Math.abs(i-t.y)/(n-t.x);Ws(t,r)&&(a<f||a===f&&(t.x>o.x||t.x===o.x&&Uf(o,t)))&&(o=t,f=a)}t=t.next}while(t!==l);return o}function Uf(r,e){return mt(r.prev,r,e.prev)<0&&mt(e.next,r,r.next)<0}function Of(r,e,t,n){let i=r;do i.z===0&&(i.z=$a(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Bf(i)}function Bf(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,l=0;for(let u=0;u<t&&(l++,o=o.nextZ,!!o);u++);let h=t;for(;l>0||h>0&&o;)l!==0&&(h===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,l--):(i=o,o=o.nextZ,h--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function $a(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function kf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function su(r,e,t,n,i,s,o,l){return(i-o)*(e-l)>=(r-o)*(s-l)&&(r-o)*(n-l)>=(t-o)*(e-l)&&(t-o)*(s-l)>=(i-o)*(n-l)}function Es(r,e,t,n,i,s,o,l){return!(r===o&&e===l)&&su(r,e,t,n,i,s,o,l)}function zf(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Vf(r,e)&&(Ws(r,e)&&Ws(e,r)&&Gf(r,e)&&(mt(r.prev,r,e.prev)||mt(r,e.prev,e))||Ki(r,e)&&mt(r.prev,r,r.next)>0&&mt(e.prev,e,e.next)>0)}function mt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ki(r,e){return r.x===e.x&&r.y===e.y}function ru(r,e,t,n){const i=Tr(mt(r,e,t)),s=Tr(mt(r,e,n)),o=Tr(mt(t,n,r)),l=Tr(mt(t,n,e));return!!(i!==s&&o!==l||i===0&&wr(r,t,e)||s===0&&wr(r,n,e)||o===0&&wr(t,r,n)||l===0&&wr(t,e,n))}function wr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Tr(r){return r>0?1:r<0?-1:0}function Vf(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&ru(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Ws(r,e){return mt(r.prev,r,r.next)<0?mt(r,e,r.next)>=0&&mt(r,r.prev,e)>=0:mt(r,e,r.prev)<0||mt(r,r.next,e)<0}function Gf(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function ou(r,e){const t=Za(r.i,r.x,r.y),n=Za(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Fc(r,e,t,n){const i=Za(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Xs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Za(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Hf(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Wf{static triangulate(e,t,n=2){return Af(e,t,n)}}class Ds{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Ds.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Uc(e),Oc(n,e);let o=e.length;t.forEach(Uc);for(let h=0;h<t.length;h++)i.push(o),o+=t[h].length,Oc(n,t[h]);const l=Wf.triangulate(n,i);for(let h=0;h<l.length;h+=3)s.push(l.slice(h,h+3));return s}}function Uc(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Oc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Zs extends Jr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Zs(e.radius,e.detail)}}class Cl extends Jr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Cl(e.radius,e.detail)}}class ns extends gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,l=Math.floor(n),h=Math.floor(i),u=l+1,f=h+1,a=e/l,c=t/h,d=[],p=[],_=[],g=[];for(let m=0;m<f;m++){const v=m*c-o;for(let M=0;M<u;M++){const S=M*a-s;p.push(S,-v,0),_.push(0,0,1),g.push(M/l),g.push(1-m/h)}}for(let m=0;m<h;m++)for(let v=0;v<l;v++){const M=v+u*m,S=v+u*(m+1),E=v+1+u*(m+1),T=v+1+u*m;d.push(M,S,T),d.push(S,E,T)}this.setIndex(d),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.width,e.height,e.widthSegments,e.heightSegments)}}class Pl extends gt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const l=[],h=[],u=[],f=[];let a=e;const c=(t-e)/i,d=new R,p=new ae;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*o;d.x=a*Math.cos(m),d.y=a*Math.sin(m),h.push(d.x,d.y,d.z),u.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,f.push(p.x,p.y)}a+=c}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,M=v,S=v+n+1,E=v+n+2,T=v+1;l.push(M,S,T),l.push(S,E,T)}}this.setIndex(l),this.setAttribute("position",new Ze(h,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Il extends gt{constructor(e=new nu([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let l=0,h=0;if(Array.isArray(e)===!1)u(e);else for(let f=0;f<e.length;f++)u(e[f]),this.addGroup(l,h,f),l+=h,h=0;this.setIndex(n),this.setAttribute("position",new Ze(i,3)),this.setAttribute("normal",new Ze(s,3)),this.setAttribute("uv",new Ze(o,2));function u(f){const a=i.length/3,c=f.extractPoints(t);let d=c.shape;const p=c.holes;Ds.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];Ds.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=Ds.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];d=d.concat(v)}for(let g=0,m=d.length;g<m;g++){const v=d[g];i.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],M=v[0]+a,S=v[1]+a,E=v[2]+a;n.push(M,S,E),h+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Xf(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new Il(n,e.curveSegments)}}function Xf(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class $i extends gt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(o+l,Math.PI);let u=0;const f=[],a=new R,c=new R,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],M=m/n;let S=0;m===0&&o===0?S=.5/t:m===n&&h===Math.PI&&(S=-.5/t);for(let E=0;E<=t;E++){const T=E/t;a.x=-e*Math.cos(i+T*s)*Math.sin(o+M*l),a.y=e*Math.cos(o+M*l),a.z=e*Math.sin(i+T*s)*Math.sin(o+M*l),p.push(a.x,a.y,a.z),c.copy(a).normalize(),_.push(c.x,c.y,c.z),g.push(T+S,1-M),v.push(u++)}f.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const M=f[m][v+1],S=f[m][v],E=f[m+1][v],T=f[m+1][v+1];(m!==0||o>0)&&d.push(M,S,T),(m!==n-1||h<Math.PI)&&d.push(S,E,T)}this.setIndex(d),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Zi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ht(r){const e={};for(let t=0;t<r.length;t++){const n=Zi(r[t]);for(const i in n)e[i]=n[i]}return e}function qf(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function au(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const qs={clone:Zi,merge:Ht};var Yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ct extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yf,this.fragmentShader=Kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zi(e.uniforms),this.uniformsGroups=qf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class lu extends Ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class dt extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class tn extends dt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class $f extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zf extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Er(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function jf(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Bc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const l=t[s]*e;for(let h=0;h!==e;++h)i[o++]=r[l+h]}return i}function cu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class is{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let l=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const l=t[1];e<l&&(n=2,s=l);for(let h=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const l=n+o>>>1;e<t[l]?o=l:n=l+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Jf extends is{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jl,endingEnd:Jl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,l=i[s],h=i[o];if(l===void 0)switch(this.getSettings_().endingStart){case Ql:s=e,l=2*t-n;break;case ec:s=i.length-2,l=t+i[s]-i[s+1];break;default:s=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case Ql:o=e,h=2*n-t;break;case ec:o=1,h=n+i[1]-i[0];break;default:o=e-1,h=t}const u=(n-t)*.5,f=this.valueSize;this._weightPrev=u/(t-l),this._weightNext=u/(h-n),this._offsetPrev=s*f,this._offsetNext=o*f}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=this._offsetPrev,a=this._offsetNext,c=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-c*g+2*c*_-c*p,v=(1+c)*g+(-1.5-2*c)*_+(-.5+c)*p+1,M=(-1-d)*g+(1.5+d)*_+.5*p,S=d*g-d*_;for(let E=0;E!==l;++E)s[E]=m*o[f+E]+v*o[u+E]+M*o[h+E]+S*o[a+E];return s}}class Qf extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=(n-t)/(i-t),a=1-f;for(let c=0;c!==l;++c)s[c]=o[u+c]*a+o[h+c]*f;return s}}class ep extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class tp extends is{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=this.settings||this.DefaultSettings_,a=f.inTangents,c=f.outTangents;if(!a||!c){const _=(n-t)/(i-t),g=1-_;for(let m=0;m!==l;++m)s[m]=o[u+m]*g+o[h+m]*_;return s}const d=l*2,p=e-1;for(let _=0;_!==l;++_){const g=o[u+_],m=o[h+_],v=p*d+_*2,M=c[v],S=c[v+1],E=e*d+_*2,T=a[E],C=a[E+1];let x=(n-t)/(i-t),b,U,P,F,O;for(let B=0;B<8;B++){b=x*x,U=b*x,P=1-x,F=P*P,O=F*P;const k=O*t+3*F*x*M+3*P*b*T+U*i-n;if(Math.abs(k)<1e-10)break;const z=3*F*(M-t)+6*P*x*(T-M)+3*b*(i-T);if(Math.abs(z)<1e-10)break;x=x-k/z,x=Math.max(0,Math.min(1,x))}s[_]=O*g+3*F*x*S+3*P*b*C+U*m}return s}}class gn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Er(t,this.TimeBufferType),this.values=Er(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Er(e.times,Array),values:Er(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ep(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new tp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Bs:t=this.InterpolantFactoryMethodDiscrete;break;case ks:t=this.InterpolantFactoryMethodLinear;break;case oo:t=this.InterpolantFactoryMethodSmooth;break;case jl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return ks;case this.InterpolantFactoryMethodSmooth:return oo;case this.InterpolantFactoryMethodBezier:return jl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const l=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*l,o*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==s;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){Le("KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(o!==null&&o>h){Le("KeyframeTrack: Out of order keys.",this,l,h,o),e=!1;break}o=h}if(i!==void 0&&gd(i))for(let l=0,h=i.length;l!==h;++l){const u=i[l];if(isNaN(u)){Le("KeyframeTrack: Value is not a valid number.",this,l,u),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===oo,s=e.length-1;let o=1;for(let l=1;l<s;++l){let h=!1;const u=e[l],f=e[l+1];if(u!==f&&(l!==1||u!==e[0]))if(i)h=!0;else{const a=l*n,c=a-n,d=a+n;for(let p=0;p!==n;++p){const _=t[a+p];if(_!==t[c+p]||_!==t[d+p]){h=!0;break}}}if(h){if(l!==o){e[o]=e[l];const a=l*n,c=o*n;for(let d=0;d!==n;++d)t[c+d]=t[a+d]}++o}}if(s>0){e[o]=e[s];for(let l=s*n,h=o*n,u=0;u!==n;++u)t[h+u]=t[l+u];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=ks;class ss extends gn{constructor(e,t,n){super(e,t,n)}}ss.prototype.ValueTypeName="bool";ss.prototype.ValueBufferType=Array;ss.prototype.DefaultInterpolation=Bs;ss.prototype.InterpolantFactoryMethodLinear=void 0;ss.prototype.InterpolantFactoryMethodSmooth=void 0;class hu extends gn{constructor(e,t,n,i){super(e,t,n,i)}}hu.prototype.ValueTypeName="color";class ji extends gn{constructor(e,t,n,i){super(e,t,n,i)}}ji.prototype.ValueTypeName="number";class np extends is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=(n-t)/(i-t);let u=e*l;for(let f=u+l;u!==f;u+=4)Et.slerpFlat(s,0,o,u-l,o,u,h);return s}}class Ji extends gn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new np(this.times,this.values,this.getValueSize(),e)}}Ji.prototype.ValueTypeName="quaternion";Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class rs extends gn{constructor(e,t,n){super(e,t,n)}}rs.prototype.ValueTypeName="string";rs.prototype.ValueBufferType=Array;rs.prototype.DefaultInterpolation=Bs;rs.prototype.InterpolantFactoryMethodLinear=void 0;rs.prototype.InterpolantFactoryMethodSmooth=void 0;class Qi extends gn{constructor(e,t,n,i){super(e,t,n,i)}}Qi.prototype.ValueTypeName="vector";class ip{constructor(e="",t=-1,n=[],i=rd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ln(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,l=n.length;o!==l;++o)t.push(rp(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(gn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let l=0;l<s;l++){let h=[],u=[];h.push((l+s-1)%s,l,(l+1)%s),u.push(0,1,0);const f=jf(h);h=Bc(h,1,f),u=Bc(u,1,f),!i&&h[0]===0&&(h.push(s),u.push(u[0])),o.push(new ji(".morphTargetInfluences["+t[l].name+"]",h,u).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const u=e[l],f=u.name.match(s);if(f&&f.length>1){const a=f[1];let c=i[a];c||(i[a]=c=[]),c.push(u)}}const o=[];for(const l in i)o.push(this.CreateFromMorphTargetSequence(l,i[l],t,n));return o}static parseAnimation(e,t){if(Ae("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Le("AnimationClip: No animation in JSONLoader data."),null;const n=function(a,c,d,p,_){if(d.length!==0){const g=[],m=[];cu(d,g,m,p),g.length!==0&&_.push(new a(c,g,m))}},i=[],s=e.name||"default",o=e.fps||30,l=e.blendMode;let h=e.length||-1;const u=e.hierarchy||[];for(let a=0;a<u.length;a++){const c=u[a].keys;if(!(!c||c.length===0))if(c[0].morphTargets){const d={};let p;for(p=0;p<c.length;p++)if(c[p].morphTargets)for(let _=0;_<c[p].morphTargets.length;_++)d[c[p].morphTargets[_]]=-1;for(const _ in d){const g=[],m=[];for(let v=0;v!==c[p].morphTargets.length;++v){const M=c[p];g.push(M.time),m.push(M.morphTarget===_?1:0)}i.push(new ji(".morphTargetInfluence["+_+"]",g,m))}h=d.length*o}else{const d=".bones["+t[a].name+"]";n(Qi,d+".position",c,"pos",i),n(Ji,d+".quaternion",c,"rot",i),n(Qi,d+".scale",c,"scl",i)}}return i.length===0?null:new this(s,h,i,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function sp(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ji;case"vector":case"vector2":case"vector3":case"vector4":return Qi;case"color":return hu;case"quaternion":return Ji;case"bool":case"boolean":return ss;case"string":return rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function rp(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=sp(r.type);if(r.times===void 0){const t=[],n=[];cu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Vn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(kc(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!kc(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function kc(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class op{constructor(e,t,n){const i=this;let s=!1,o=0,l=0,h;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(f){l++,s===!1&&i.onStart!==void 0&&i.onStart(f,o,l),s=!0},this.itemEnd=function(f){o++,i.onProgress!==void 0&&i.onProgress(f,o,l),o===l&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(f){i.onError!==void 0&&i.onError(f)},this.resolveURL=function(f){return h?h(f):f},this.setURLModifier=function(f){return h=f,this},this.addHandler=function(f,a){return u.push(f,a),this},this.removeHandler=function(f){const a=u.indexOf(f);return a!==-1&&u.splice(a,2),this},this.getHandler=function(f){for(let a=0,c=u.length;a<c;a+=2){const d=u[a],p=u[a+1];if(d.global&&(d.lastIndex=0),d.test(f))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ap=new op;class os{constructor(e){this.manager=e!==void 0?e:ap,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}os.DEFAULT_MATERIAL_NAME="__DEFAULT";const zn={};class lp extends Error{constructor(e,t){super(e),this.response=t}}class uu extends os{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Vn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(zn[e]!==void 0){zn[e].push({onLoad:t,onProgress:n,onError:i});return}zn[e]=[],zn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),l=this.mimeType,h=this.responseType;fetch(o).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const f=zn[e],a=u.body.getReader(),c=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),d=c?parseInt(c):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){a.read().then(({done:M,value:S})=>{if(M)m.close();else{_+=S.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let T=0,C=f.length;T<C;T++){const x=f[T];x.onProgress&&x.onProgress(E)}m.enqueue(S),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new lp(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(h){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(f=>new DOMParser().parseFromString(f,l));case"json":return u.json();default:if(l==="")return u.text();{const a=/charset="?([^;"\s]*)"?/i.exec(l),c=a&&a[1]?a[1].toLowerCase():void 0,d=new TextDecoder(c);return u.arrayBuffer().then(p=>d.decode(p))}}}).then(u=>{Vn.add(`file:${e}`,u);const f=zn[e];delete zn[e];for(let a=0,c=f.length;a<c;a++){const d=f[a];d.onLoad&&d.onLoad(u)}}).catch(u=>{const f=zn[e];if(f===void 0)throw this.manager.itemError(e),u;delete zn[e];for(let a=0,c=f.length;a<c;a++){const d=f[a];d.onError&&d.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ui=new WeakMap;class cp extends os{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Vn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let a=Ui.get(o);a===void 0&&(a=[],Ui.set(o,a)),a.push({onLoad:t,onError:i})}return o}const l=Vs("img");function h(){f(),t&&t(this);const a=Ui.get(this)||[];for(let c=0;c<a.length;c++){const d=a[c];d.onLoad&&d.onLoad(this)}Ui.delete(this),s.manager.itemEnd(e)}function u(a){f(),i&&i(a),Vn.remove(`image:${e}`);const c=Ui.get(this)||[];for(let d=0;d<c.length;d++){const p=c[d];p.onError&&p.onError(a)}Ui.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){l.removeEventListener("load",h,!1),l.removeEventListener("error",u,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),Vn.add(`image:${e}`,l),s.manager.itemStart(e),l.src=e,l}}class hp extends os{constructor(e){super(e)}load(e,t,n,i){const s=new Pt,o=new cp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(l){s.image=l,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Qr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class up extends Qr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Uo=new ke,zc=new R,Vc=new R;class Ll{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tl,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;zc.setFromMatrixPosition(e.matrixWorld),t.position.copy(zc),Vc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vc),t.updateMatrixWorld(),Uo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===zs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ar=new R,Rr=new Et,vn=new R;class du extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ar,Rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,Rr,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ar,Rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,Rr,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ei=new R,Gc=new ae,Hc=new ae;class Wt extends du{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yi*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,Gc,Hc),t.subVectors(Hc,Gc)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Cs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const h=o.fullWidth,u=o.fullHeight;s+=o.offsetX*i/h,t-=o.offsetY*n/u,i*=o.width/h,n*=o.height/u}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class dp extends Ll{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Yi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class fu extends Qr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new dp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class fp extends Ll{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}}class Ns extends Qr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new fp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class js extends du{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,l=i+t,h=i-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,l-=f*this.view.offsetY,h=l-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,l,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pp extends Ll{constructor(){super(new js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ja extends Qr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new pp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Fs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Oo=new WeakMap;class mp extends os{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Vn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(u=>{if(Oo.has(o)===!0)i&&i(Oo.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(u),s.manager.itemEnd(e),u});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader,l.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const h=fetch(e,l).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(u){return Vn.add(`image-bitmap:${e}`,u),t&&t(u),s.manager.itemEnd(e),u}).catch(function(u){i&&i(u),Oo.set(h,u),Vn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Vn.add(`image-bitmap:${e}`,h),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Oi=-90,Bi=1;class gp extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wt(Oi,Bi,e,t);i.layers=this.layers,this.add(i);const s=new Wt(Oi,Bi,e,t);s.layers=this.layers,this.add(s);const o=new Wt(Oi,Bi,e,t);o.layers=this.layers,this.add(o);const l=new Wt(Oi,Bi,e,t);l.layers=this.layers,this.add(l);const h=new Wt(Oi,Bi,e,t);h.layers=this.layers,this.add(h);const u=new Wt(Oi,Bi,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,l,h]=t;for(const u of t)this.remove(u);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,l,h,u,f]=this.children,a=e.getRenderTarget(),c=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(a,c,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class _p extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class vp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=xp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function xp(){this._document.hidden===!1&&this.reset()}const Dl="\\[\\]\\.:\\/",yp=new RegExp("["+Dl+"]","g"),Nl="[^"+Dl+"]",Mp="[^"+Dl.replace("\\.","")+"]",Sp=/((?:WC+[\/:])*)/.source.replace("WC",Nl),bp=/(WCOD+)?/.source.replace("WCOD",Mp),wp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nl),Tp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nl),Ep=new RegExp("^"+Sp+bp+wp+Tp+"$"),Ap=["material","materials","bones","map"];class Rp{constructor(e,t,n){const i=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(yp,"")}static parseTrackName(e){const t=Ep.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Ap.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const l=s[o];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===u){u=f;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}const o=e[i];if(o===void 0){const u=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+u+"."+i+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}h=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(h=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=Rp;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Wc(r,e,t,n){const i=Cp(n);switch(t){case Bh:return r*e;case fl:return r*e/i.components*i.byteLength;case pl:return r*e/i.components*i.byteLength;case qi:return r*e*2/i.components*i.byteLength;case ml:return r*e*2/i.components*i.byteLength;case kh:return r*e*3/i.components*i.byteLength;case an:return r*e*4/i.components*i.byteLength;case gl:return r*e*4/i.components*i.byteLength;case Fr:case Ur:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Or:case Br:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case da:case pa:return Math.max(r,16)*Math.max(e,8)/4;case ua:case fa:return Math.max(r,8)*Math.max(e,8)/2;case ma:case ga:case va:case xa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case _a:case ya:case Ma:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case wa:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case La:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Da:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Na:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ua:case Oa:case Ba:return Math.ceil(r/4)*Math.ceil(e/4)*16;case ka:case za:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Va:case Ga:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cp(r){switch(r){case Qt:case Nh:return{byteLength:1,components:1};case Us:case Fh:case en:return{byteLength:2,components:1};case ul:case dl:return{byteLength:2,components:4};case Cn:case hl:case on:return{byteLength:4,components:1};case Uh:case Oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:il}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=il);function pu(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Pp(r){const e=new WeakMap;function t(l,h){const u=l.array,f=l.usage,a=u.byteLength,c=r.createBuffer();r.bindBuffer(h,c),r.bufferData(h,u,f),l.onUploadCallback();let d;if(u instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)d=r.HALF_FLOAT;else if(u instanceof Uint16Array)l.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)d=r.SHORT;else if(u instanceof Uint32Array)d=r.UNSIGNED_INT;else if(u instanceof Int32Array)d=r.INT;else if(u instanceof Int8Array)d=r.BYTE;else if(u instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:c,type:d,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:a}}function n(l,h,u){const f=h.array,a=h.updateRanges;if(r.bindBuffer(u,l),a.length===0)r.bufferSubData(u,0,f);else{a.sort((d,p)=>d.start-p.start);let c=0;for(let d=1;d<a.length;d++){const p=a[c],_=a[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++c,a[c]=_)}a.length=c+1;for(let d=0,p=a.length;d<p;d++){const _=a[d];r.bufferSubData(u,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}h.clearUpdateRanges()}h.onUploadCallback()}function i(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(r.deleteBuffer(h.buffer),e.delete(l))}function o(l,h){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const f=e.get(l);(!f||f.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const u=e.get(l);if(u===void 0)e.set(l,t(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,l,h),u.version=l.version}}return{get:i,remove:s,update:o}}var Ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lp=`#ifdef USE_ALPHAHASH
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
#endif`,Dp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Op=`#ifdef USE_AOMAP
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
#endif`,Bp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Xp=`#ifdef USE_BUMPMAP
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
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,em=`#define PI 3.141592653589793
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
} // validated`,tm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nm=`vec3 transformedNormal = objectNormal;
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
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,am="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cm=`#ifdef USE_ENVMAP
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
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
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
#endif`,dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_m=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vm=`#ifdef USE_GRADIENTMAP
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
}`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sm=`uniform bool receiveShadow;
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
#endif`,bm=`#ifdef USE_ENVMAP
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
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rm=`PhysicalMaterial material;
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
#endif`,Cm=`uniform sampler2D dfgLUT;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
}`,Pm=`
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
#endif`,Im=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zm=`#if defined( USE_POINTS_UV )
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
#endif`,Vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
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
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
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
#endif`,eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ng=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ag=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ug=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
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
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
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
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
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
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,fg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,mg=`float getShadowMask() {
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
}`,gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_g=`#ifdef USE_SKINNING
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
#endif`,vg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xg=`#ifdef USE_SKINNING
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
#endif`,yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wg=`#ifdef USE_TRANSMISSION
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
#endif`,Tg=`#ifdef USE_TRANSMISSION
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
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ig=`uniform sampler2D t2D;
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
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`#include <common>
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
}`,Og=`#if DEPTH_PACKING == 3200
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
}`,Bg=`#define DISTANCE
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
}`,kg=`#define DISTANCE
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`uniform float scale;
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
}`,Hg=`uniform vec3 diffuse;
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
}`,Wg=`#include <common>
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
}`,Xg=`uniform vec3 diffuse;
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
}`,qg=`#define LAMBERT
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
}`,Yg=`#define LAMBERT
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
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Kg=`#define MATCAP
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
}`,$g=`#define MATCAP
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
}`,Zg=`#define NORMAL
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
}`,jg=`#define NORMAL
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
}`,Jg=`#define PHONG
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
}`,Qg=`#define PHONG
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
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,e0=`#define STANDARD
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
}`,t0=`#define STANDARD
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
}`,n0=`#define TOON
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
}`,i0=`#define TOON
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
}`,s0=`uniform float size;
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
}`,r0=`uniform vec3 diffuse;
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
}`,o0=`#include <common>
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
}`,a0=`uniform vec3 color;
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
	#include <premultiplied_alpha_fragment>
}`,l0=`uniform float rotation;
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
}`,c0=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Ip,alphahash_pars_fragment:Lp,alphamap_fragment:Dp,alphamap_pars_fragment:Np,alphatest_fragment:Fp,alphatest_pars_fragment:Up,aomap_fragment:Op,aomap_pars_fragment:Bp,batching_pars_vertex:kp,batching_vertex:zp,begin_vertex:Vp,beginnormal_vertex:Gp,bsdfs:Hp,iridescence_fragment:Wp,bumpmap_pars_fragment:Xp,clipping_planes_fragment:qp,clipping_planes_pars_fragment:Yp,clipping_planes_pars_vertex:Kp,clipping_planes_vertex:$p,color_fragment:Zp,color_pars_fragment:jp,color_pars_vertex:Jp,color_vertex:Qp,common:em,cube_uv_reflection_fragment:tm,defaultnormal_vertex:nm,displacementmap_pars_vertex:im,displacementmap_vertex:sm,emissivemap_fragment:rm,emissivemap_pars_fragment:om,colorspace_fragment:am,colorspace_pars_fragment:lm,envmap_fragment:cm,envmap_common_pars_fragment:hm,envmap_pars_fragment:um,envmap_pars_vertex:dm,envmap_physical_pars_fragment:bm,envmap_vertex:fm,fog_vertex:pm,fog_pars_vertex:mm,fog_fragment:gm,fog_pars_fragment:_m,gradientmap_pars_fragment:vm,lightmap_pars_fragment:xm,lights_lambert_fragment:ym,lights_lambert_pars_fragment:Mm,lights_pars_begin:Sm,lights_toon_fragment:wm,lights_toon_pars_fragment:Tm,lights_phong_fragment:Em,lights_phong_pars_fragment:Am,lights_physical_fragment:Rm,lights_physical_pars_fragment:Cm,lights_fragment_begin:Pm,lights_fragment_maps:Im,lights_fragment_end:Lm,logdepthbuf_fragment:Dm,logdepthbuf_pars_fragment:Nm,logdepthbuf_pars_vertex:Fm,logdepthbuf_vertex:Um,map_fragment:Om,map_pars_fragment:Bm,map_particle_fragment:km,map_particle_pars_fragment:zm,metalnessmap_fragment:Vm,metalnessmap_pars_fragment:Gm,morphinstance_vertex:Hm,morphcolor_vertex:Wm,morphnormal_vertex:Xm,morphtarget_pars_vertex:qm,morphtarget_vertex:Ym,normal_fragment_begin:Km,normal_fragment_maps:$m,normal_pars_fragment:Zm,normal_pars_vertex:jm,normal_vertex:Jm,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:eg,clearcoat_normal_fragment_maps:tg,clearcoat_pars_fragment:ng,iridescence_pars_fragment:ig,opaque_fragment:sg,packing:rg,premultiplied_alpha_fragment:og,project_vertex:ag,dithering_fragment:lg,dithering_pars_fragment:cg,roughnessmap_fragment:hg,roughnessmap_pars_fragment:ug,shadowmap_pars_fragment:dg,shadowmap_pars_vertex:fg,shadowmap_vertex:pg,shadowmask_pars_fragment:mg,skinbase_vertex:gg,skinning_pars_vertex:_g,skinning_vertex:vg,skinnormal_vertex:xg,specularmap_fragment:yg,specularmap_pars_fragment:Mg,tonemapping_fragment:Sg,tonemapping_pars_fragment:bg,transmission_fragment:wg,transmission_pars_fragment:Tg,uv_pars_fragment:Eg,uv_pars_vertex:Ag,uv_vertex:Rg,worldpos_vertex:Cg,background_vert:Pg,background_frag:Ig,backgroundCube_vert:Lg,backgroundCube_frag:Dg,cube_vert:Ng,cube_frag:Fg,depth_vert:Ug,depth_frag:Og,distance_vert:Bg,distance_frag:kg,equirect_vert:zg,equirect_frag:Vg,linedashed_vert:Gg,linedashed_frag:Hg,meshbasic_vert:Wg,meshbasic_frag:Xg,meshlambert_vert:qg,meshlambert_frag:Yg,meshmatcap_vert:Kg,meshmatcap_frag:$g,meshnormal_vert:Zg,meshnormal_frag:jg,meshphong_vert:Jg,meshphong_frag:Qg,meshphysical_vert:e0,meshphysical_frag:t0,meshtoon_vert:n0,meshtoon_frag:i0,points_vert:s0,points_frag:r0,shadow_vert:o0,shadow_frag:a0,sprite_vert:l0,sprite_frag:c0},ce={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Mn={basic:{uniforms:Ht([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Ht([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Ht([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Ht([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Ht([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Ht([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Ht([ce.points,ce.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Ht([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Ht([ce.common,ce.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Ht([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Ht([ce.sprite,ce.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Ht([ce.common,ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Ht([ce.lights,ce.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Mn.physical={uniforms:Ht([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Cr={r:0,b:0,g:0},hi=new cn,h0=new ke;function u0(r,e,t,n,i,s){const o=new fe(0);let l=i===!0?0:1,h,u,f=null,a=0,c=null;function d(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const S=v.backgroundBlurriness>0;M=e.get(M,S)}return M}function p(v){let M=!1;const S=d(v);S===null?g(o,l):S&&S.isColor&&(g(S,1),M=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(v,M){const S=d(M);S&&(S.isCubeTexture||S.mapping===Zr)?(u===void 0&&(u=new ye(new Ut(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:Zi(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),hi.copy(M.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(h0.makeRotationFromEuler(hi)),u.material.toneMapped=qe.getTransfer(S.colorSpace)!==Je,(f!==S||a!==S.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,f=S,a=S.version,c=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new ye(new ns(2,2),new Ct({name:"BackgroundMaterial",uniforms:Zi(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=qe.getTransfer(S.colorSpace)!==Je,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||a!==S.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,f=S,a=S.version,c=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function g(v,M){v.getRGB(Cr,au(r)),t.buffers.color.setClear(Cr.r,Cr.g,Cr.b,M,s)}function m(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,g(o,l)},render:p,addToRenderList:_,dispose:m}}function d0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null);let s=i,o=!1;function l(P,F,O,B,H){let k=!1;const z=a(P,B,O,F);s!==z&&(s=z,u(s.object)),k=d(P,B,O,H),k&&p(P,B,O,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,S(P,F,O,B),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function h(){return r.createVertexArray()}function u(P){return r.bindVertexArray(P)}function f(P){return r.deleteVertexArray(P)}function a(P,F,O,B){const H=B.wireframe===!0;let k=n[F.id];k===void 0&&(k={},n[F.id]=k);const z=P.isInstancedMesh===!0?P.id:0;let Q=k[z];Q===void 0&&(Q={},k[z]=Q);let Z=Q[O.id];Z===void 0&&(Z={},Q[O.id]=Z);let oe=Z[H];return oe===void 0&&(oe=c(h()),Z[H]=oe),oe}function c(P){const F=[],O=[],B=[];for(let H=0;H<t;H++)F[H]=0,O[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:O,attributeDivisors:B,object:P,attributes:{},index:null}}function d(P,F,O,B){const H=s.attributes,k=F.attributes;let z=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const pe=H[Z];let le=k[Z];if(le===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),pe===void 0||pe.attribute!==le||le&&pe.data!==le.data)return!0;z++}return s.attributesNum!==z||s.index!==B}function p(P,F,O,B){const H={},k=F.attributes;let z=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let pe=k[Z];pe===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(pe=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(pe=P.instanceColor));const le={};le.attribute=pe,pe&&pe.data&&(le.data=pe.data),H[Z]=le,z++}s.attributes=H,s.attributesNum=z,s.index=B}function _(){const P=s.newAttributes;for(let F=0,O=P.length;F<O;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const O=s.newAttributes,B=s.enabledAttributes,H=s.attributeDivisors;O[P]=1,B[P]===0&&(r.enableVertexAttribArray(P),B[P]=1),H[P]!==F&&(r.vertexAttribDivisor(P,F),H[P]=F)}function v(){const P=s.newAttributes,F=s.enabledAttributes;for(let O=0,B=F.length;O<B;O++)F[O]!==P[O]&&(r.disableVertexAttribArray(O),F[O]=0)}function M(P,F,O,B,H,k,z){z===!0?r.vertexAttribIPointer(P,F,O,H,k):r.vertexAttribPointer(P,F,O,B,H,k)}function S(P,F,O,B){_();const H=B.attributes,k=O.getAttributes(),z=F.defaultAttributeValues;for(const Q in k){const Z=k[Q];if(Z.location>=0){let oe=H[Q];if(oe===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(oe=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(oe=P.instanceColor)),oe!==void 0){const pe=oe.normalized,le=oe.itemSize,De=e.get(oe);if(De===void 0)continue;const rt=De.buffer,ht=De.type,K=De.bytesPerElement,ne=ht===r.INT||ht===r.UNSIGNED_INT||oe.gpuType===hl;if(oe.isInterleavedBufferAttribute){const re=oe.data,Oe=re.stride,Pe=oe.offset;if(re.isInstancedInterleavedBuffer){for(let Ne=0;Ne<Z.locationSize;Ne++)m(Z.location+Ne,re.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ne=0;Ne<Z.locationSize;Ne++)g(Z.location+Ne);r.bindBuffer(r.ARRAY_BUFFER,rt);for(let Ne=0;Ne<Z.locationSize;Ne++)M(Z.location+Ne,le/Z.locationSize,ht,pe,Oe*K,(Pe+le/Z.locationSize*Ne)*K,ne)}else{if(oe.isInstancedBufferAttribute){for(let re=0;re<Z.locationSize;re++)m(Z.location+re,oe.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let re=0;re<Z.locationSize;re++)g(Z.location+re);r.bindBuffer(r.ARRAY_BUFFER,rt);for(let re=0;re<Z.locationSize;re++)M(Z.location+re,le/Z.locationSize,ht,pe,le*K,le/Z.locationSize*re*K,ne)}}else if(z!==void 0){const pe=z[Q];if(pe!==void 0)switch(pe.length){case 2:r.vertexAttrib2fv(Z.location,pe);break;case 3:r.vertexAttrib3fv(Z.location,pe);break;case 4:r.vertexAttrib4fv(Z.location,pe);break;default:r.vertexAttrib1fv(Z.location,pe)}}}}v()}function E(){b();for(const P in n){const F=n[P];for(const O in F){const B=F[O];for(const H in B){const k=B[H];for(const z in k)f(k[z].object),delete k[z];delete B[H]}}delete n[P]}}function T(P){if(n[P.id]===void 0)return;const F=n[P.id];for(const O in F){const B=F[O];for(const H in B){const k=B[H];for(const z in k)f(k[z].object),delete k[z];delete B[H]}}delete n[P.id]}function C(P){for(const F in n){const O=n[F];for(const B in O){const H=O[B];if(H[P.id]===void 0)continue;const k=H[P.id];for(const z in k)f(k[z].object),delete k[z];delete H[P.id]}}}function x(P){for(const F in n){const O=n[F],B=P.isInstancedMesh===!0?P.id:0,H=O[B];if(H!==void 0){for(const k in H){const z=H[k];for(const Q in z)f(z[Q].object),delete z[Q];delete H[k]}delete O[B],Object.keys(O).length===0&&delete n[F]}}}function b(){U(),o=!0,s!==i&&(s=i,u(s.object))}function U(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:l,reset:b,resetDefaultState:U,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function f0(r,e,t){let n;function i(u){n=u}function s(u,f){r.drawArrays(n,u,f),t.update(f,n,1)}function o(u,f,a){a!==0&&(r.drawArraysInstanced(n,u,f,a),t.update(f,n,a))}function l(u,f,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,f,0,a);let d=0;for(let p=0;p<a;p++)d+=f[p];t.update(d,n,1)}function h(u,f,a,c){if(a===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<u.length;p++)o(u[p],f[p],c[p]);else{d.multiDrawArraysInstancedWEBGL(n,u,0,f,0,c,0,a);let p=0;for(let _=0;_<a;_++)p+=f[_]*c[_];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=h}function p0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==an&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(C){const x=C===en&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Qt&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==on&&!x)}function h(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const f=h(u);f!==u&&(Ae("WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const a=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),T=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:h,textureFormatReadable:o,textureTypeReadable:l,precision:u,logarithmicDepthBuffer:a,reversedDepthBuffer:c,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:S,maxSamples:E,samples:T}}function m0(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new pi,l=new Be,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(a,c){const d=a.length!==0||c||n!==0||i;return i=c,n=a.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(a,c){t=f(a,c,0)},this.setState=function(a,c,d){const p=a.clippingPlanes,_=a.clipIntersection,g=a.clipShadows,m=r.get(a);if(!i||p===null||p.length===0||s&&!g)s?f(null):u();else{const v=s?0:n,M=v*4;let S=m.clippingState||null;h.value=S,S=f(p,c,M,d);for(let E=0;E!==M;++E)S[E]=t[E];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function u(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(a,c,d,p){const _=a!==null?a.length:0;let g=null;if(_!==0){if(g=h.value,p!==!0||g===null){const m=d+_*4,v=c.matrixWorldInverse;l.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,S=d;M!==_;++M,S+=4)o.copy(a[M]).applyMatrix4(v,l),o.normal.toArray(g,S),g[S+3]=o.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const ii=4,Xc=[.125,.215,.35,.446,.526,.582],gi=20,g0=256,gs=new js,qc=new fe;let Bo=null,ko=0,zo=0,Vo=!1;const _0=new R;class Yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:l=_0}=s;Bo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,i,h,l),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bo,ko,zo),this._renderer.xr.enabled=Vo,e.scissorTest=!1,ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xi||e.mapping===Xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:en,format:an,colorSpace:Yt,depthBuffer:!1},i=Kc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=v0(s)),this._blurMaterial=y0(s,e,t),this._ggxMaterial=x0(s,e,t)}return i}_compileMaterial(e){const t=new ye(new gt,e);this._renderer.compile(t,gs)}_sceneToCubeUV(e,t,n,i,s){const h=new Wt(90,1,t,n),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],a=this._renderer,c=a.autoClear,d=a.toneMapping;a.getClearColor(qc),a.toneMapping=An,a.autoClear=!1,a.state.buffers.depth.getReversed()&&(a.setRenderTarget(i),a.clearDepth(),a.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ye(new Ut,new Rt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(qc),m=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(h.up.set(0,u[M],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x+f[M],s.y,s.z)):S===1?(h.up.set(0,0,u[M]),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y+f[M],s.z)):(h.up.set(0,u[M],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y,s.z+f[M]));const E=this._cubeSize;ki(i,S*E,M>2?E:0,E,E),a.setRenderTarget(i),m&&a.render(_,h),a.render(e,h)}a.toneMapping=d,a.autoClear=c,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===xi||e.mapping===Xi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$c());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const l=s.uniforms;l.envMap.value=e;const h=this._cubeSize;ki(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(o,gs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[n];l.material=o;const h=o.uniforms,u=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),a=Math.sqrt(u*u-f*f),c=0+u*1.25,d=a*c,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-ii?n-p+ii:0),m=4*(this._cubeSize-_);h.envMap.value=e.texture,h.roughness.value=d,h.mipInt.value=p-t,ki(s,g,m,3*_,2*_),i.setRenderTarget(s),i.render(l,gs),h.envMap.value=s.texture,h.roughness.value=0,h.mipInt.value=p-n,ki(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(l,gs)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,l){const h=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");const f=3,a=this._lodMeshes[i];a.material=u;const c=u.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*gi-1),_=s/p,g=isFinite(s)?1+Math.floor(f*_):gi;g>gi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const m=[];let v=0;for(let C=0;C<gi;++C){const x=C/_,b=Math.exp(-x*x/2);m.push(b),C===0?v+=b:C<g&&(v+=2*b)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;c.envMap.value=e.texture,c.samples.value=g,c.weights.value=m,c.latitudinal.value=o==="latitudinal",l&&(c.poleAxis.value=l);const{_lodMax:M}=this;c.dTheta.value=p,c.mipInt.value=M-n;const S=this._sizeLods[i],E=3*S*(i>M-ii?i-M+ii:0),T=4*(this._cubeSize-S);ki(t,E,T,3*S,2*S),h.setRenderTarget(t),h.render(a,gs)}}function v0(r){const e=[],t=[],n=[];let i=r;const s=r-ii+1+Xc.length;for(let o=0;o<s;o++){const l=Math.pow(2,i);e.push(l);let h=1/l;o>r-ii?h=Xc[o-r+ii-1]:o===0&&(h=0),t.push(h);const u=1/(l-2),f=-u,a=1+u,c=[f,f,a,f,a,a,f,f,a,a,f,a],d=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*d),M=new Float32Array(g*p*d),S=new Float32Array(m*p*d);for(let T=0;T<d;T++){const C=T%3*2/3-1,x=T>2?0:-1,b=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];v.set(b,_*p*T),M.set(c,g*p*T);const U=[T,T,T,T,T,T];S.set(U,m*p*T)}const E=new gt;E.setAttribute("position",new yt(v,_)),E.setAttribute("uv",new yt(M,g)),E.setAttribute("faceIndex",new yt(S,m)),n.push(new ye(E,null)),i>ii&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Kc(r,e,t){const n=new $t(r,e,t);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ki(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function x0(r,e,t){return new Ct({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:eo(),fragmentShader:`

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

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function y0(r,e,t){const n=new Float32Array(gi),i=new R(0,1,0);return new Ct({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:eo(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function $c(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Zc(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function eo(){return`

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
	`}class mu extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Zh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ut(5,5,5),s=new Ct({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:En});s.uniforms.tEquirect.value=t;const o=new ye(i,s),l=t.minFilter;return t.minFilter===wn&&(t.minFilter=wt),new gp(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function M0(r){let e=new WeakMap,t=new WeakMap,n=null;function i(c,d=!1){return c==null?null:d?o(c):s(c)}function s(c){if(c&&c.isTexture){const d=c.mapping;if(d===so||d===ro)if(e.has(c)){const p=e.get(c).texture;return l(p,c.mapping)}else{const p=c.image;if(p&&p.height>0){const _=new mu(p.height);return _.fromEquirectangularTexture(r,c),e.set(c,_),c.addEventListener("dispose",u),l(_.texture,c.mapping)}else return null}}return c}function o(c){if(c&&c.isTexture){const d=c.mapping,p=d===so||d===ro,_=d===xi||d===Xi;if(p||_){let g=t.get(c);const m=g!==void 0?g.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new Yc(r)),g=p?n.fromEquirectangular(c,g):n.fromCubemap(c,g),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),g.texture;if(g!==void 0)return g.texture;{const v=c.image;return p&&v&&v.height>0||_&&v&&h(v)?(n===null&&(n=new Yc(r)),g=p?n.fromEquirectangular(c):n.fromCubemap(c),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),c.addEventListener("dispose",f),g.texture):null}}}return c}function l(c,d){return d===so?c.mapping=xi:d===ro&&(c.mapping=Xi),c}function h(c){let d=0;const p=6;for(let _=0;_<p;_++)c[_]!==void 0&&d++;return d===p}function u(c){const d=c.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(c){const d=c.target;d.removeEventListener("dispose",f);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function a(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function S0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xr("WebGLRenderer: "+n+" extension not supported."),i}}}function b0(r,e,t,n){const i={},s=new WeakMap;function o(a){const c=a.target;c.index!==null&&e.remove(c.index);for(const p in c.attributes)e.remove(c.attributes[p]);c.removeEventListener("dispose",o),delete i[c.id];const d=s.get(c);d&&(e.remove(d),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(a,c){return i[c.id]===!0||(c.addEventListener("dispose",o),i[c.id]=!0,t.memory.geometries++),c}function h(a){const c=a.attributes;for(const d in c)e.update(c[d],r.ARRAY_BUFFER)}function u(a){const c=[],d=a.index,p=a.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const v=d.array;_=d.version;for(let M=0,S=v.length;M<S;M+=3){const E=v[M+0],T=v[M+1],C=v[M+2];c.push(E,T,T,C,C,E)}}else{const v=p.array;_=p.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const E=M+0,T=M+1,C=M+2;c.push(E,T,T,C,C,E)}}const g=new(p.count>=65535?Yh:qh)(c,1);g.version=_;const m=s.get(a);m&&e.remove(m),s.set(a,g)}function f(a){const c=s.get(a);if(c){const d=a.index;d!==null&&c.version<d.version&&u(a)}else u(a);return s.get(a)}return{get:l,update:h,getWireframeAttribute:f}}function w0(r,e,t){let n;function i(c){n=c}let s,o;function l(c){s=c.type,o=c.bytesPerElement}function h(c,d){r.drawElements(n,d,s,c*o),t.update(d,n,1)}function u(c,d,p){p!==0&&(r.drawElementsInstanced(n,d,s,c*o,p),t.update(d,n,p))}function f(c,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,c,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function a(c,d,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<c.length;m++)u(c[m]/o,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,c,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=d[v]*_[v];t.update(m,n,1)}}this.setMode=i,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=a}function T0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,l){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=l*(s/3);break;case r.LINES:t.lines+=l*(s/2);break;case r.LINE_STRIP:t.lines+=l*(s-1);break;case r.LINE_LOOP:t.lines+=l*s;break;case r.POINTS:t.points+=l*s;break;default:Le("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function E0(r,e,t){const n=new WeakMap,i=new ut;function s(o,l,h){const u=o.morphTargetInfluences,f=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,a=f!==void 0?f.length:0;let c=n.get(l);if(c===void 0||c.count!==a){let b=function(){C.dispose(),n.delete(l),l.removeEventListener("dispose",b)};c!==void 0&&c.texture.dispose();const d=l.morphAttributes.position!==void 0,p=l.morphAttributes.normal!==void 0,_=l.morphAttributes.color!==void 0,g=l.morphAttributes.position||[],m=l.morphAttributes.normal||[],v=l.morphAttributes.color||[];let M=0;d===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let S=l.attributes.position.count*M,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const T=new Float32Array(S*E*4*a),C=new Hh(T,S,E,a);C.type=on,C.needsUpdate=!0;const x=M*4;for(let U=0;U<a;U++){const P=g[U],F=m[U],O=v[U],B=S*E*4*U;for(let H=0;H<P.count;H++){const k=H*x;d===!0&&(i.fromBufferAttribute(P,H),T[B+k+0]=i.x,T[B+k+1]=i.y,T[B+k+2]=i.z,T[B+k+3]=0),p===!0&&(i.fromBufferAttribute(F,H),T[B+k+4]=i.x,T[B+k+5]=i.y,T[B+k+6]=i.z,T[B+k+7]=0),_===!0&&(i.fromBufferAttribute(O,H),T[B+k+8]=i.x,T[B+k+9]=i.y,T[B+k+10]=i.z,T[B+k+11]=O.itemSize===4?i.w:1)}}c={count:a,texture:C,size:new ae(S,E)},n.set(l,c),l.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<u.length;_++)d+=u[_];const p=l.morphTargetsRelative?1:1-d;h.getUniforms().setValue(r,"morphTargetBaseInfluence",p),h.getUniforms().setValue(r,"morphTargetInfluences",u)}h.getUniforms().setValue(r,"morphTargetsTexture",c.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",c.size)}return{update:s}}function A0(r,e,t,n,i){let s=new WeakMap;function o(u){const f=i.render.frame,a=u.geometry,c=e.get(u,a);if(s.get(c)!==f&&(e.update(c),s.set(c,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",h)===!1&&u.addEventListener("dispose",h),s.get(u)!==f&&(t.update(u.instanceMatrix,r.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,r.ARRAY_BUFFER),s.set(u,f))),u.isSkinnedMesh){const d=u.skeleton;s.get(d)!==f&&(d.update(),s.set(d,f))}return c}function l(){s=new WeakMap}function h(u){const f=u.target;f.removeEventListener("dispose",h),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:l}}const R0={[sl]:"LINEAR_TONE_MAPPING",[rl]:"REINHARD_TONE_MAPPING",[ol]:"CINEON_TONE_MAPPING",[$r]:"ACES_FILMIC_TONE_MAPPING",[ll]:"AGX_TONE_MAPPING",[cl]:"NEUTRAL_TONE_MAPPING",[al]:"CUSTOM_TONE_MAPPING"};function C0(r,e,t,n,i){const s=new $t(e,t,{type:r,depthBuffer:n,stencilBuffer:i}),o=new $t(e,t,{type:en,depthBuffer:!1,stencilBuffer:!1}),l=new gt;l.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ze([0,2,0,0,2,0],2));const h=new lu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ye(l,h),f=new js(-1,1,1,-1,0,1);let a=null,c=null,d=!1,p,_=null,g=[],m=!1;this.setSize=function(v,M){s.setSize(v,M),o.setSize(v,M);for(let S=0;S<g.length;S++){const E=g[S];E.setSize&&E.setSize(v,M)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const M=s.width,S=s.height;for(let E=0;E<g.length;E++){const T=g[E];T.setSize&&T.setSize(M,S)}},this.begin=function(v,M){if(d||v.toneMapping===An&&g.length===0)return!1;if(_=M,M!==null){const S=M.width,E=M.height;(s.width!==S||s.height!==E)&&this.setSize(S,E)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=An,!0},this.hasRenderPass=function(){return m},this.end=function(v,M){v.toneMapping=p,d=!0;let S=s,E=o;for(let T=0;T<g.length;T++){const C=g[T];if(C.enabled!==!1&&(C.render(v,E,S,M),C.needsSwap!==!1)){const x=S;S=E,E=x}}if(a!==v.outputColorSpace||c!==v.toneMapping){a=v.outputColorSpace,c=v.toneMapping,h.defines={},qe.getTransfer(a)===Je&&(h.defines.SRGB_TRANSFER="");const T=R0[c];T&&(h.defines[T]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(_),v.render(u,f),_=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),o.dispose(),l.dispose(),h.dispose()}}const gu=new Pt,Ja=new Gs(1,1),_u=new Hh,vu=new Vd,xu=new Zh,jc=[],Jc=[],Qc=new Float32Array(16),eh=new Float32Array(9),th=new Float32Array(4);function as(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=jc[i];if(s===void 0&&(s=new Float32Array(i),jc[i]=s),e!==0){n.toArray(s,0);for(let o=1,l=0;o!==e;++o)l+=t,r[o].toArray(s,l)}return s}function It(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Lt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function to(r,e){let t=Jc[e];t===void 0&&(t=new Int32Array(e),Jc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function P0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function I0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2fv(this.addr,e),Lt(t,e)}}function L0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;r.uniform3fv(this.addr,e),Lt(t,e)}}function D0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4fv(this.addr,e),Lt(t,e)}}function N0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;th.set(n),r.uniformMatrix2fv(this.addr,!1,th),Lt(t,n)}}function F0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;eh.set(n),r.uniformMatrix3fv(this.addr,!1,eh),Lt(t,n)}}function U0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;Qc.set(n),r.uniformMatrix4fv(this.addr,!1,Qc),Lt(t,n)}}function O0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2iv(this.addr,e),Lt(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3iv(this.addr,e),Lt(t,e)}}function z0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4iv(this.addr,e),Lt(t,e)}}function V0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function G0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;r.uniform2uiv(this.addr,e),Lt(t,e)}}function H0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;r.uniform3uiv(this.addr,e),Lt(t,e)}}function W0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;r.uniform4uiv(this.addr,e),Lt(t,e)}}function X0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ja.compareFunction=t.isReversedDepthBuffer()?vl:_l,s=Ja):s=gu,t.setTexture2D(e||s,i)}function q0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||vu,i)}function Y0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||xu,i)}function K0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||_u,i)}function $0(r){switch(r){case 5126:return P0;case 35664:return I0;case 35665:return L0;case 35666:return D0;case 35674:return N0;case 35675:return F0;case 35676:return U0;case 5124:case 35670:return O0;case 35667:case 35671:return B0;case 35668:case 35672:return k0;case 35669:case 35673:return z0;case 5125:return V0;case 36294:return G0;case 36295:return H0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return X0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return Y0;case 36289:case 36303:case 36311:case 36292:return K0}}function Z0(r,e){r.uniform1fv(this.addr,e)}function j0(r,e){const t=as(e,this.size,2);r.uniform2fv(this.addr,t)}function J0(r,e){const t=as(e,this.size,3);r.uniform3fv(this.addr,t)}function Q0(r,e){const t=as(e,this.size,4);r.uniform4fv(this.addr,t)}function e_(r,e){const t=as(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function t_(r,e){const t=as(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function n_(r,e){const t=as(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function i_(r,e){r.uniform1iv(this.addr,e)}function s_(r,e){r.uniform2iv(this.addr,e)}function r_(r,e){r.uniform3iv(this.addr,e)}function o_(r,e){r.uniform4iv(this.addr,e)}function a_(r,e){r.uniform1uiv(this.addr,e)}function l_(r,e){r.uniform2uiv(this.addr,e)}function c_(r,e){r.uniform3uiv(this.addr,e)}function h_(r,e){r.uniform4uiv(this.addr,e)}function u_(r,e,t){const n=this.cache,i=e.length,s=to(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=Ja:o=gu;for(let l=0;l!==i;++l)t.setTexture2D(e[l]||o,s[l])}function d_(r,e,t){const n=this.cache,i=e.length,s=to(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||vu,s[o])}function f_(r,e,t){const n=this.cache,i=e.length,s=to(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||xu,s[o])}function p_(r,e,t){const n=this.cache,i=e.length,s=to(t,i);It(n,s)||(r.uniform1iv(this.addr,s),Lt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||_u,s[o])}function m_(r){switch(r){case 5126:return Z0;case 35664:return j0;case 35665:return J0;case 35666:return Q0;case 35674:return e_;case 35675:return t_;case 35676:return n_;case 5124:case 35670:return i_;case 35667:case 35671:return s_;case 35668:case 35672:return r_;case 35669:case 35673:return o_;case 5125:return a_;case 36294:return l_;case 36295:return c_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return u_;case 35679:case 36299:case 36307:return d_;case 35680:case 36300:case 36308:case 36293:return f_;case 36289:case 36303:case 36311:case 36292:return p_}}class g_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$0(t.type)}}class __{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m_(t.type)}}class v_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const l=i[s];l.setValue(e,t[l.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function nh(r,e){r.seq.push(e),r.map[e.id]=e}function x_(r,e,t){const n=r.name,i=n.length;for(Go.lastIndex=0;;){const s=Go.exec(n),o=Go.lastIndex;let l=s[1];const h=s[2]==="]",u=s[3];if(h&&(l=l|0),u===void 0||u==="["&&o+2===i){nh(t,u===void 0?new g_(l,r,e):new __(l,r,e));break}else{let a=t.map[l];a===void 0&&(a=new v_(l),nh(t,a)),t=a}}}class kr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const l=e.getActiveUniform(t,o),h=e.getUniformLocation(t,l.name);x_(l,h,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const l=t[s],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function ih(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const y_=37297;let M_=0;function S_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const l=o+1;n.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return n.join(`
`)}const sh=new Be;function b_(r){qe._getMatrix(sh,qe.workingColorSpace,r);const e=`mat3( ${sh.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(r)){case Hr:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function rh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+S_(r.getShaderSource(e),l)}else return s}function w_(r,e){const t=b_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const T_={[sl]:"Linear",[rl]:"Reinhard",[ol]:"Cineon",[$r]:"ACESFilmic",[ll]:"AgX",[cl]:"Neutral",[al]:"Custom"};function E_(r,e){const t=T_[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Pr=new R;function A_(){qe.getLuminanceCoefficients(Pr);const r=Pr.x.toFixed(4),e=Pr.y.toFixed(4),t=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function R_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function C_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function P_(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let l=1;s.type===r.FLOAT_MAT2&&(l=2),s.type===r.FLOAT_MAT3&&(l=3),s.type===r.FLOAT_MAT4&&(l=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:l}}return t}function As(r){return r!==""}function oh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ah(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const I_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(r){return r.replace(I_,D_)}const L_=new Map;function D_(r,e){let t=ze[e];if(t===void 0){const n=L_.get(e);if(n!==void 0)t=ze[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Qa(t)}const N_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lh(r){return r.replace(N_,F_)}function F_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ch(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const U_={[Rs]:"SHADOWMAP_TYPE_PCF",[ws]:"SHADOWMAP_TYPE_VSM"};function O_(r){return U_[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const B_={[xi]:"ENVMAP_TYPE_CUBE",[Xi]:"ENVMAP_TYPE_CUBE",[Zr]:"ENVMAP_TYPE_CUBE_UV"};function k_(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":B_[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const z_={[Xi]:"ENVMAP_MODE_REFRACTION"};function V_(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":z_[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const G_={[Ih]:"ENVMAP_BLENDING_MULTIPLY",[nd]:"ENVMAP_BLENDING_MIX",[id]:"ENVMAP_BLENDING_ADD"};function H_(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":G_[r.combine]||"ENVMAP_BLENDING_NONE"}function W_(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function X_(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,l=t.fragmentShader;const h=O_(t),u=k_(t),f=V_(t),a=H_(t),c=W_(t),d=R_(t),p=C_(s),_=i.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(As).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(As).join(`
`),m.length>0&&(m+=`
`)):(g=[ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),m=[ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMap?"#define "+a:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?ze.tonemapping_pars_fragment:"",t.toneMapping!==An?E_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,w_("linearToOutputTexel",t.outputColorSpace),A_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(As).join(`
`)),o=Qa(o),o=oh(o,t),o=ah(o,t),l=Qa(l),l=oh(l,t),l=ah(l,t),o=lh(o),l=lh(l),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=v+g+o,S=v+m+l,E=ih(i,i.VERTEX_SHADER,M),T=ih(i,i.FRAGMENT_SHADER,S);i.attachShader(_,E),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(_)||"",O=i.getShaderInfoLog(E)||"",B=i.getShaderInfoLog(T)||"",H=F.trim(),k=O.trim(),z=B.trim();let Q=!0,Z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,E,T);else{const oe=rh(i,E,"vertex"),pe=rh(i,T,"fragment");Le("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+oe+`
`+pe)}else H!==""?Ae("WebGLProgram: Program Info Log:",H):(k===""||z==="")&&(Z=!1);Z&&(P.diagnostics={runnable:Q,programLog:H,vertexShader:{log:k,prefix:g},fragmentShader:{log:z,prefix:m}})}i.deleteShader(E),i.deleteShader(T),x=new kr(i,_),b=P_(i,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(_,y_)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let q_=0;class Y_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new K_(e),t.set(e,n)),n}}class K_{constructor(e){this.id=q_++,this.code=e,this.usedTimes=0}}function $_(r,e,t,n,i,s){const o=new Wh,l=new Y_,h=new Set,u=[],f=new Map,a=n.logarithmicDepthBuffer;let c=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return h.add(x),x===0?"uv":`uv${x}`}function _(x,b,U,P,F){const O=P.fog,B=F.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,z=e.get(x.envMap||H,k),Q=z&&z.mapping===Zr?z.image.height:null,Z=d[x.type];x.precision!==null&&(c=n.getMaxPrecision(x.precision),c!==x.precision&&Ae("WebGLProgram.getParameters:",x.precision,"not supported, using",c,"instead."));const oe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,pe=oe!==void 0?oe.length:0;let le=0;B.morphAttributes.position!==void 0&&(le=1),B.morphAttributes.normal!==void 0&&(le=2),B.morphAttributes.color!==void 0&&(le=3);let De,rt,ht,K;if(Z){const et=Mn[Z];De=et.vertexShader,rt=et.fragmentShader}else De=x.vertexShader,rt=x.fragmentShader,l.update(x),ht=l.getVertexShaderID(x),K=l.getFragmentShaderID(x);const ne=r.getRenderTarget(),re=r.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,Pe=F.isBatchedMesh===!0,Ne=!!x.map,Dt=!!x.matcap,Ye=!!z,Qe=!!x.aoMap,ot=!!x.lightMap,Ve=!!x.bumpMap,vt=!!x.normalMap,I=!!x.displacementMap,St=!!x.emissiveMap,je=!!x.metalnessMap,lt=!!x.roughnessMap,be=x.anisotropy>0,A=x.clearcoat>0,y=x.dispersion>0,D=x.iridescence>0,Y=x.sheen>0,$=x.transmission>0,q=be&&!!x.anisotropyMap,_e=A&&!!x.clearcoatMap,ie=A&&!!x.clearcoatNormalMap,Ce=A&&!!x.clearcoatRoughnessMap,Ie=D&&!!x.iridescenceMap,j=D&&!!x.iridescenceThicknessMap,ee=Y&&!!x.sheenColorMap,ve=Y&&!!x.sheenRoughnessMap,Me=!!x.specularMap,de=!!x.specularColorMap,Ge=!!x.specularIntensityMap,L=$&&!!x.transmissionMap,se=$&&!!x.thicknessMap,te=!!x.gradientMap,ge=!!x.alphaMap,J=x.alphaTest>0,X=!!x.alphaHash,xe=!!x.extensions;let Fe=An;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Fe=r.toneMapping);const ct={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:De,fragmentShader:rt,defines:x.defines,customVertexShaderID:ht,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:c,batching:Pe,batchingColor:Pe&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ne===null?r.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Yt,alphaToCoverage:!!x.alphaToCoverage,map:Ne,matcap:Dt,envMap:Ye,envMapMode:Ye&&z.mapping,envMapCubeUVHeight:Q,aoMap:Qe,lightMap:ot,bumpMap:Ve,normalMap:vt,displacementMap:I,emissiveMap:St,normalMapObjectSpace:vt&&x.normalMapType===ld,normalMapTangentSpace:vt&&x.normalMapType===Vh,metalnessMap:je,roughnessMap:lt,anisotropy:be,anisotropyMap:q,clearcoat:A,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:Ce,dispersion:y,iridescence:D,iridescenceMap:Ie,iridescenceThicknessMap:j,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:de,specularIntensityMap:Ge,transmission:$,transmissionMap:L,thicknessMap:se,gradientMap:te,opaque:x.transparent===!1&&x.blending===Vi&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:J,alphaHash:X,combine:x.combine,mapUv:Ne&&p(x.map.channel),aoMapUv:Qe&&p(x.aoMap.channel),lightMapUv:ot&&p(x.lightMap.channel),bumpMapUv:Ve&&p(x.bumpMap.channel),normalMapUv:vt&&p(x.normalMap.channel),displacementMapUv:I&&p(x.displacementMap.channel),emissiveMapUv:St&&p(x.emissiveMap.channel),metalnessMapUv:je&&p(x.metalnessMap.channel),roughnessMapUv:lt&&p(x.roughnessMap.channel),anisotropyMapUv:q&&p(x.anisotropyMap.channel),clearcoatMapUv:_e&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(x.sheenRoughnessMap.channel),specularMapUv:Me&&p(x.specularMap.channel),specularColorMapUv:de&&p(x.specularColorMap.channel),specularIntensityMapUv:Ge&&p(x.specularIntensityMap.channel),transmissionMapUv:L&&p(x.transmissionMap.channel),thicknessMapUv:se&&p(x.thicknessMap.channel),alphaMapUv:ge&&p(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(vt||be),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Ne||ge),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&vt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:a,reversedDepthBuffer:re,skinning:F.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Ne&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===Je,decodeVideoTextureEmissive:St&&x.emissiveMap.isVideoTexture===!0&&qe.getTransfer(x.emissiveMap.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Xt,flipSided:x.side===qt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&x.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ct.vertexUv1s=h.has(1),ct.vertexUv2s=h.has(2),ct.vertexUv3s=h.has(3),h.clear(),ct}function g(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const U in x.defines)b.push(U),b.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(m(b,x),v(b,x),b.push(r.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function m(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function v(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const b=d[x.type];let U;if(b){const P=Mn[b];U=qs.clone(P.uniforms)}else U=x.uniforms;return U}function S(x,b){let U=f.get(b);return U!==void 0?++U.usedTimes:(U=new X_(r,b,x,i),u.push(U),f.set(b,U)),U}function E(x){if(--x.usedTimes===0){const b=u.indexOf(x);u[b]=u[u.length-1],u.pop(),f.delete(x.cacheKey),x.destroy()}}function T(x){l.remove(x)}function C(){l.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:S,releaseProgram:E,releaseShaderCache:T,programs:u,dispose:C}}function Z_(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function n(o){r.delete(o)}function i(o,l,h){r.get(o)[l]=h}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function j_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function hh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function uh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(c){let d=0;return c.isInstancedMesh&&(d+=2),c.isSkinnedMesh&&(d+=1),d}function l(c,d,p,_,g,m){let v=r[e];return v===void 0?(v={id:c.id,object:c,geometry:d,material:p,materialVariant:o(c),groupOrder:_,renderOrder:c.renderOrder,z:g,group:m},r[e]=v):(v.id=c.id,v.object=c,v.geometry=d,v.material=p,v.materialVariant=o(c),v.groupOrder=_,v.renderOrder=c.renderOrder,v.z=g,v.group=m),e++,v}function h(c,d,p,_,g,m){const v=l(c,d,p,_,g,m);p.transmission>0?n.push(v):p.transparent===!0?i.push(v):t.push(v)}function u(c,d,p,_,g,m){const v=l(c,d,p,_,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):t.unshift(v)}function f(c,d){t.length>1&&t.sort(c||j_),n.length>1&&n.sort(d||hh),i.length>1&&i.sort(d||hh)}function a(){for(let c=e,d=r.length;c<d;c++){const p=r[c];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:h,unshift:u,finish:a,sort:f}}function J_(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new uh,r.set(n,[o])):i>=s.length?(o=new uh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Q_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new fe};break;case"SpotLight":t={position:new R,direction:new R,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function ev(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let tv=0;function nv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function iv(r){const e=new Q_,t=ev(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new R);const i=new R,s=new ke,o=new ke;function l(u){let f=0,a=0,c=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,v=0,M=0,S=0,E=0,T=0,C=0;u.sort(nv);for(let b=0,U=u.length;b<U;b++){const P=u[b],F=P.color,O=P.intensity,B=P.distance;let H=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===qi?H=P.shadow.map.texture:H=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)f+=F.r*O,a+=F.g*O,c+=F.b*O;else if(P.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(P.sh.coefficients[k],O);C++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,n.directionalShadow[d]=Q,n.directionalShadowMap[d]=H,n.directionalShadowMatrix[d]=P.shadow.matrix,v++}n.directional[d]=k,d++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(F).multiplyScalar(O),k.distance=B,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,n.spot[_]=k;const z=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,z.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=z.matrix,P.castShadow){const Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,n.spotShadow[_]=Q,n.spotShadowMap[_]=H,S++}_++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(F).multiplyScalar(O),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=k,g++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const z=P.shadow,Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,Q.shadowCameraNear=z.camera.near,Q.shadowCameraFar=z.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=P.shadow.matrix,M++}n.point[p]=k,p++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(O),k.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[m]=k,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=a,n.ambient[2]=c;const x=n.hash;(x.directionalLength!==d||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==g||x.hemiLength!==m||x.numDirectionalShadows!==v||x.numPointShadows!==M||x.numSpotShadows!==S||x.numSpotMaps!==E||x.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,x.directionalLength=d,x.pointLength=p,x.spotLength=_,x.rectAreaLength=g,x.hemiLength=m,x.numDirectionalShadows=v,x.numPointShadows=M,x.numSpotShadows=S,x.numSpotMaps=E,x.numLightProbes=C,n.version=tv++)}function h(u,f){let a=0,c=0,d=0,p=0,_=0;const g=f.matrixWorldInverse;for(let m=0,v=u.length;m<v;m++){const M=u[m];if(M.isDirectionalLight){const S=n.directional[a];S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),a++}else if(M.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),d++}else if(M.isRectAreaLight){const S=n.rectArea[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(M.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),p++}else if(M.isPointLight){const S=n.point[c];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),c++}else if(M.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(g),_++}}}return{setup:l,setupView:h,state:n}}function dh(r){const e=new iv(r),t=[],n=[];function i(f){u.camera=f,t.length=0,n.length=0}function s(f){t.push(f)}function o(f){n.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:u,setupLights:l,setupLightsView:h,pushLight:s,pushShadow:o}}function sv(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let l;return o===void 0?(l=new dh(r),e.set(i,[l])):s>=o.length?(l=new dh(r),o.push(l)):l=o[s],l}function n(){e=new WeakMap}return{get:t,dispose:n}}const rv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ov=`uniform sampler2D shadow_pass;
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
}`,av=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],lv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],fh=new ke,_s=new R,Ho=new R;function cv(r,e,t){let n=new Tl;const i=new ae,s=new ae,o=new ut,l=new $f,h=new Zf,u={},f=t.maxTextureSize,a={[Wn]:qt,[qt]:Wn,[Xt]:Xt},c=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:rv,fragmentShader:ov}),d=c.clone();d.defines.HORIZONTAL_PASS=1;const p=new gt;p.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ye(p,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rs;let m=this.type;this.render=function(T,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Ou&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Rs);const b=r.getRenderTarget(),U=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),F=r.state;F.setBlending(En),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==this.type;O&&C.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(H=>H.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,H=T.length;B<H;B++){const k=T[B],z=k.shadow;if(z===void 0){Ae("WebGLShadowMap:",k,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const Q=z.getFrameExtents();i.multiply(Q),s.copy(z.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/Q.x),i.x=s.x*Q.x,z.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/Q.y),i.y=s.y*Q.y,z.mapSize.y=s.y));const Z=r.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Z,z.map===null||O===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===ws){if(k.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new $t(i.x,i.y,{format:qi,type:en,minFilter:wt,magFilter:wt,generateMipmaps:!1}),z.map.texture.name=k.name+".shadowMap",z.map.depthTexture=new Gs(i.x,i.y,on),z.map.depthTexture.name=k.name+".shadowMapDepth",z.map.depthTexture.format=Xn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=At,z.map.depthTexture.magFilter=At}else k.isPointLight?(z.map=new mu(i.x),z.map.depthTexture=new ff(i.x,Cn)):(z.map=new $t(i.x,i.y),z.map.depthTexture=new Gs(i.x,i.y,Cn)),z.map.depthTexture.name=k.name+".shadowMap",z.map.depthTexture.format=Xn,this.type===Rs?(z.map.depthTexture.compareFunction=Z?vl:_l,z.map.depthTexture.minFilter=wt,z.map.depthTexture.magFilter=wt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=At,z.map.depthTexture.magFilter=At);z.camera.updateProjectionMatrix()}const oe=z.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<oe;pe++){if(z.map.isWebGLCubeRenderTarget)r.setRenderTarget(z.map,pe),r.clear();else{pe===0&&(r.setRenderTarget(z.map),r.clear());const le=z.getViewport(pe);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),F.viewport(o)}if(k.isPointLight){const le=z.camera,De=z.matrix,rt=k.distance||le.far;rt!==le.far&&(le.far=rt,le.updateProjectionMatrix()),_s.setFromMatrixPosition(k.matrixWorld),le.position.copy(_s),Ho.copy(le.position),Ho.add(av[pe]),le.up.copy(lv[pe]),le.lookAt(Ho),le.updateMatrixWorld(),De.makeTranslation(-_s.x,-_s.y,-_s.z),fh.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),z._frustum.setFromProjectionMatrix(fh,le.coordinateSystem,le.reversedDepth)}else z.updateMatrices(k);n=z.getFrustum(),S(C,x,z.camera,k,this.type)}z.isPointLightShadow!==!0&&this.type===ws&&v(z,x),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(b,U,P)};function v(T,C){const x=e.update(_);c.defines.VSM_SAMPLES!==T.blurSamples&&(c.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,c.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new $t(i.x,i.y,{format:qi,type:en})),c.uniforms.shadow_pass.value=T.map.depthTexture,c.uniforms.resolution.value=T.mapSize,c.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(C,null,x,c,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(C,null,x,d,_,null)}function M(T,C,x,b){let U=null;const P=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)U=P;else if(U=x.isPointLight===!0?h:l,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=U.uuid,O=C.uuid;let B=u[F];B===void 0&&(B={},u[F]=B);let H=B[O];H===void 0&&(H=U.clone(),B[O]=H,C.addEventListener("dispose",E)),U=H}if(U.visible=C.visible,U.wireframe=C.wireframe,b===ws?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:a[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,x.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const F=r.properties.get(U);F.light=x}return U}function S(T,C,x,b,U){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===ws)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const O=e.update(T),B=T.material;if(Array.isArray(B)){const H=O.groups;for(let k=0,z=H.length;k<z;k++){const Q=H[k],Z=B[Q.materialIndex];if(Z&&Z.visible){const oe=M(T,Z,b,U);T.onBeforeShadow(r,T,C,x,O,oe,Q),r.renderBufferDirect(x,null,O,oe,T,Q),T.onAfterShadow(r,T,C,x,O,oe,Q)}}}else if(B.visible){const H=M(T,B,b,U);T.onBeforeShadow(r,T,C,x,O,H,null),r.renderBufferDirect(x,null,O,H,T,null),T.onAfterShadow(r,T,C,x,O,H,null)}}const F=T.children;for(let O=0,B=F.length;O<B;O++)S(F[O],C,x,b,U)}function E(T){T.target.removeEventListener("dispose",E);for(const x in u){const b=u[x],U=T.target.uuid;U in b&&(b[U].dispose(),delete b[U])}}}function hv(r,e){function t(){let L=!1;const se=new ut;let te=null;const ge=new ut(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(r.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,X,xe,Fe,ct){ct===!0&&(J*=Fe,X*=Fe,xe*=Fe),se.set(J,X,xe,Fe),ge.equals(se)===!1&&(r.clearColor(J,X,xe,Fe),ge.copy(se))},reset:function(){L=!1,te=null,ge.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,te=null,ge=null,J=null;return{setReversed:function(X){if(se!==X){const xe=e.get("EXT_clip_control");X?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),se=X;const Fe=J;J=null,this.setClear(Fe)}},getReversed:function(){return se},setTest:function(X){X?ne(r.DEPTH_TEST):re(r.DEPTH_TEST)},setMask:function(X){te!==X&&!L&&(r.depthMask(X),te=X)},setFunc:function(X){if(se&&(X=xd[X]),ge!==X){switch(X){case sa:r.depthFunc(r.NEVER);break;case ra:r.depthFunc(r.ALWAYS);break;case oa:r.depthFunc(r.LESS);break;case Wi:r.depthFunc(r.LEQUAL);break;case aa:r.depthFunc(r.EQUAL);break;case la:r.depthFunc(r.GEQUAL);break;case ca:r.depthFunc(r.GREATER);break;case ha:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ge=X}},setLocked:function(X){L=X},setClear:function(X){J!==X&&(J=X,se&&(X=1-X),r.clearDepth(X))},reset:function(){L=!1,te=null,ge=null,J=null,se=!1}}}function i(){let L=!1,se=null,te=null,ge=null,J=null,X=null,xe=null,Fe=null,ct=null;return{setTest:function(et){L||(et?ne(r.STENCIL_TEST):re(r.STENCIL_TEST))},setMask:function(et){se!==et&&!L&&(r.stencilMask(et),se=et)},setFunc:function(et,Dn,Nn){(te!==et||ge!==Dn||J!==Nn)&&(r.stencilFunc(et,Dn,Nn),te=et,ge=Dn,J=Nn)},setOp:function(et,Dn,Nn){(X!==et||xe!==Dn||Fe!==Nn)&&(r.stencilOp(et,Dn,Nn),X=et,xe=Dn,Fe=Nn)},setLocked:function(et){L=et},setClear:function(et){ct!==et&&(r.clearStencil(et),ct=et)},reset:function(){L=!1,se=null,te=null,ge=null,J=null,X=null,xe=null,Fe=null,ct=null}}}const s=new t,o=new n,l=new i,h=new WeakMap,u=new WeakMap;let f={},a={},c=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,M=null,S=null,E=null,T=null,C=new fe(0,0,0),x=0,b=!1,U=null,P=null,F=null,O=null,B=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,z=0;const Q=r.getParameter(r.VERSION);Q.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(Q)[1]),k=z>=1):Q.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),k=z>=2);let Z=null,oe={};const pe=r.getParameter(r.SCISSOR_BOX),le=r.getParameter(r.VIEWPORT),De=new ut().fromArray(pe),rt=new ut().fromArray(le);function ht(L,se,te,ge){const J=new Uint8Array(4),X=r.createTexture();r.bindTexture(L,X),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let xe=0;xe<te;xe++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(se,0,r.RGBA,1,1,ge,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(se+xe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return X}const K={};K[r.TEXTURE_2D]=ht(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=ht(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=ht(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=ht(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),ne(r.DEPTH_TEST),o.setFunc(Wi),Ve(!1),vt(Yl),ne(r.CULL_FACE),Qe(En);function ne(L){f[L]!==!0&&(r.enable(L),f[L]=!0)}function re(L){f[L]!==!1&&(r.disable(L),f[L]=!1)}function Oe(L,se){return a[L]!==se?(r.bindFramebuffer(L,se),a[L]=se,L===r.DRAW_FRAMEBUFFER&&(a[r.FRAMEBUFFER]=se),L===r.FRAMEBUFFER&&(a[r.DRAW_FRAMEBUFFER]=se),!0):!1}function Pe(L,se){let te=d,ge=!1;if(L){te=c.get(se),te===void 0&&(te=[],c.set(se,te));const J=L.textures;if(te.length!==J.length||te[0]!==r.COLOR_ATTACHMENT0){for(let X=0,xe=J.length;X<xe;X++)te[X]=r.COLOR_ATTACHMENT0+X;te.length=J.length,ge=!0}}else te[0]!==r.BACK&&(te[0]=r.BACK,ge=!0);ge&&r.drawBuffers(te)}function Ne(L){return p!==L?(r.useProgram(L),p=L,!0):!1}const Dt={[mi]:r.FUNC_ADD,[ku]:r.FUNC_SUBTRACT,[zu]:r.FUNC_REVERSE_SUBTRACT};Dt[Vu]=r.MIN,Dt[Gu]=r.MAX;const Ye={[Hu]:r.ZERO,[Wu]:r.ONE,[Xu]:r.SRC_COLOR,[na]:r.SRC_ALPHA,[ju]:r.SRC_ALPHA_SATURATE,[$u]:r.DST_COLOR,[Yu]:r.DST_ALPHA,[qu]:r.ONE_MINUS_SRC_COLOR,[ia]:r.ONE_MINUS_SRC_ALPHA,[Zu]:r.ONE_MINUS_DST_COLOR,[Ku]:r.ONE_MINUS_DST_ALPHA,[Ju]:r.CONSTANT_COLOR,[Qu]:r.ONE_MINUS_CONSTANT_COLOR,[ed]:r.CONSTANT_ALPHA,[td]:r.ONE_MINUS_CONSTANT_ALPHA};function Qe(L,se,te,ge,J,X,xe,Fe,ct,et){if(L===En){_===!0&&(re(r.BLEND),_=!1);return}if(_===!1&&(ne(r.BLEND),_=!0),L!==Bu){if(L!==g||et!==b){if((m!==mi||S!==mi)&&(r.blendEquation(r.FUNC_ADD),m=mi,S=mi),et)switch(L){case Vi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ta:r.blendFunc(r.ONE,r.ONE);break;case Kl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case $l:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Le("WebGLState: Invalid blending: ",L);break}else switch(L){case Vi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ta:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Kl:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $l:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",L);break}v=null,M=null,E=null,T=null,C.set(0,0,0),x=0,g=L,b=et}return}J=J||se,X=X||te,xe=xe||ge,(se!==m||J!==S)&&(r.blendEquationSeparate(Dt[se],Dt[J]),m=se,S=J),(te!==v||ge!==M||X!==E||xe!==T)&&(r.blendFuncSeparate(Ye[te],Ye[ge],Ye[X],Ye[xe]),v=te,M=ge,E=X,T=xe),(Fe.equals(C)===!1||ct!==x)&&(r.blendColor(Fe.r,Fe.g,Fe.b,ct),C.copy(Fe),x=ct),g=L,b=!1}function ot(L,se){L.side===Xt?re(r.CULL_FACE):ne(r.CULL_FACE);let te=L.side===qt;se&&(te=!te),Ve(te),L.blending===Vi&&L.transparent===!1?Qe(En):Qe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const ge=L.stencilWrite;l.setTest(ge),ge&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),St(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(r.SAMPLE_ALPHA_TO_COVERAGE):re(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){U!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),U=L)}function vt(L){L!==Fu?(ne(r.CULL_FACE),L!==P&&(L===Yl?r.cullFace(r.BACK):L===Uu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):re(r.CULL_FACE),P=L}function I(L){L!==F&&(k&&r.lineWidth(L),F=L)}function St(L,se,te){L?(ne(r.POLYGON_OFFSET_FILL),(O!==se||B!==te)&&(O=se,B=te,o.getReversed()&&(se=-se),r.polygonOffset(se,te))):re(r.POLYGON_OFFSET_FILL)}function je(L){L?ne(r.SCISSOR_TEST):re(r.SCISSOR_TEST)}function lt(L){L===void 0&&(L=r.TEXTURE0+H-1),Z!==L&&(r.activeTexture(L),Z=L)}function be(L,se,te){te===void 0&&(Z===null?te=r.TEXTURE0+H-1:te=Z);let ge=oe[te];ge===void 0&&(ge={type:void 0,texture:void 0},oe[te]=ge),(ge.type!==L||ge.texture!==se)&&(Z!==te&&(r.activeTexture(te),Z=te),r.bindTexture(L,se||K[L]),ge.type=L,ge.texture=se)}function A(){const L=oe[Z];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function y(){try{r.compressedTexImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function Y(){try{r.texSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function $(){try{r.texSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function ie(){try{r.texStorage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function Ce(){try{r.texStorage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function Ie(){try{r.texImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function j(){try{r.texImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function ee(L){De.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),De.copy(L))}function ve(L){rt.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),rt.copy(L))}function Me(L,se){let te=u.get(se);te===void 0&&(te=new WeakMap,u.set(se,te));let ge=te.get(L);ge===void 0&&(ge=r.getUniformBlockIndex(se,L.name),te.set(L,ge))}function de(L,se){const ge=u.get(se).get(L);h.get(se)!==ge&&(r.uniformBlockBinding(se,ge,L.__bindingPointIndex),h.set(se,ge))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},Z=null,oe={},a={},c=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,M=null,S=null,E=null,T=null,C=new fe(0,0,0),x=0,b=!1,U=null,P=null,F=null,O=null,B=null,De.set(0,0,r.canvas.width,r.canvas.height),rt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:ne,disable:re,bindFramebuffer:Oe,drawBuffers:Pe,useProgram:Ne,setBlending:Qe,setMaterial:ot,setFlipSided:Ve,setCullFace:vt,setLineWidth:I,setPolygonOffset:St,setScissorTest:je,activeTexture:lt,bindTexture:be,unbindTexture:A,compressedTexImage2D:y,compressedTexImage3D:D,texImage2D:Ie,texImage3D:j,updateUBOMapping:Me,uniformBlockBinding:de,texStorage2D:ie,texStorage3D:Ce,texSubImage2D:Y,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:_e,scissor:ee,viewport:ve,reset:Ge}}function uv(r,e,t,n,i,s,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ae,f=new WeakMap;let a;const c=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,y){return d?new OffscreenCanvas(A,y):Vs("canvas")}function _(A,y,D){let Y=1;const $=be(A);if(($.width>D||$.height>D)&&(Y=D/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(Y*$.width),_e=Math.floor(Y*$.height);a===void 0&&(a=p(q,_e));const ie=y?p(q,_e):a;return ie.width=q,ie.height=_e,ie.getContext("2d").drawImage(A,0,0,q,_e),Ae("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+_e+")."),ie}else return"data"in A&&Ae("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){r.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(A,y,D,Y,$=!1){if(A!==null){if(r[A]!==void 0)return r[A];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=y;if(y===r.RED&&(D===r.FLOAT&&(q=r.R32F),D===r.HALF_FLOAT&&(q=r.R16F),D===r.UNSIGNED_BYTE&&(q=r.R8)),y===r.RED_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.R8UI),D===r.UNSIGNED_SHORT&&(q=r.R16UI),D===r.UNSIGNED_INT&&(q=r.R32UI),D===r.BYTE&&(q=r.R8I),D===r.SHORT&&(q=r.R16I),D===r.INT&&(q=r.R32I)),y===r.RG&&(D===r.FLOAT&&(q=r.RG32F),D===r.HALF_FLOAT&&(q=r.RG16F),D===r.UNSIGNED_BYTE&&(q=r.RG8)),y===r.RG_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RG8UI),D===r.UNSIGNED_SHORT&&(q=r.RG16UI),D===r.UNSIGNED_INT&&(q=r.RG32UI),D===r.BYTE&&(q=r.RG8I),D===r.SHORT&&(q=r.RG16I),D===r.INT&&(q=r.RG32I)),y===r.RGB_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGB8UI),D===r.UNSIGNED_SHORT&&(q=r.RGB16UI),D===r.UNSIGNED_INT&&(q=r.RGB32UI),D===r.BYTE&&(q=r.RGB8I),D===r.SHORT&&(q=r.RGB16I),D===r.INT&&(q=r.RGB32I)),y===r.RGBA_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),D===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),D===r.UNSIGNED_INT&&(q=r.RGBA32UI),D===r.BYTE&&(q=r.RGBA8I),D===r.SHORT&&(q=r.RGBA16I),D===r.INT&&(q=r.RGBA32I)),y===r.RGB&&(D===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),D===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),y===r.RGBA){const _e=$?Hr:qe.getTransfer(Y);D===r.FLOAT&&(q=r.RGBA32F),D===r.HALF_FLOAT&&(q=r.RGBA16F),D===r.UNSIGNED_BYTE&&(q=_e===Je?r.SRGB8_ALPHA8:r.RGBA8),D===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),D===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function S(A,y){let D;return A?y===null||y===Cn||y===Os?D=r.DEPTH24_STENCIL8:y===on?D=r.DEPTH32F_STENCIL8:y===Us&&(D=r.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Cn||y===Os?D=r.DEPTH_COMPONENT24:y===on?D=r.DEPTH_COMPONENT32F:y===Us&&(D=r.DEPTH_COMPONENT16),D}function E(A,y){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==At&&A.minFilter!==wt?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function T(A){const y=A.target;y.removeEventListener("dispose",T),x(y),y.isVideoTexture&&f.delete(y)}function C(A){const y=A.target;y.removeEventListener("dispose",C),U(y)}function x(A){const y=n.get(A);if(y.__webglInit===void 0)return;const D=A.source,Y=c.get(D);if(Y){const $=Y[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(A),Object.keys(Y).length===0&&c.delete(D)}n.remove(A)}function b(A){const y=n.get(A);r.deleteTexture(y.__webglTexture);const D=A.source,Y=c.get(D);delete Y[y.__cacheKey],o.memory.textures--}function U(A){const y=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let $=0;$<y.__webglFramebuffer[Y].length;$++)r.deleteFramebuffer(y.__webglFramebuffer[Y][$]);else r.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)r.deleteFramebuffer(y.__webglFramebuffer[Y]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const D=A.textures;for(let Y=0,$=D.length;Y<$;Y++){const q=n.get(D[Y]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(D[Y])}n.remove(A)}let P=0;function F(){P=0}function O(){const A=P;return A>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function B(A){const y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function H(A,y){const D=n.get(A);if(A.isVideoTexture&&je(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&D.__version!==A.version){const Y=A.image;if(Y===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{K(D,A,y);return}}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,D.__webglTexture,r.TEXTURE0+y)}function k(A,y){const D=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){K(D,A,y);return}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,D.__webglTexture,r.TEXTURE0+y)}function z(A,y){const D=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){K(D,A,y);return}t.bindTexture(r.TEXTURE_3D,D.__webglTexture,r.TEXTURE0+y)}function Q(A,y){const D=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&D.__version!==A.version){ne(D,A,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+y)}const Z={[rn]:r.REPEAT,[bn]:r.CLAMP_TO_EDGE,[Gr]:r.MIRRORED_REPEAT},oe={[At]:r.NEAREST,[Dh]:r.NEAREST_MIPMAP_NEAREST,[Ts]:r.NEAREST_MIPMAP_LINEAR,[wt]:r.LINEAR,[Nr]:r.LINEAR_MIPMAP_NEAREST,[wn]:r.LINEAR_MIPMAP_LINEAR},pe={[cd]:r.NEVER,[pd]:r.ALWAYS,[hd]:r.LESS,[_l]:r.LEQUAL,[ud]:r.EQUAL,[vl]:r.GEQUAL,[dd]:r.GREATER,[fd]:r.NOTEQUAL};function le(A,y){if(y.type===on&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===wt||y.magFilter===Nr||y.magFilter===Ts||y.magFilter===wn||y.minFilter===wt||y.minFilter===Nr||y.minFilter===Ts||y.minFilter===wn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,Z[y.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,Z[y.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,Z[y.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,oe[y.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,oe[y.minFilter]),y.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,pe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===At||y.minFilter!==Ts&&y.minFilter!==wn||y.type===on&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function De(A,y){let D=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",T));const Y=y.source;let $=c.get(Y);$===void 0&&($={},c.set(Y,$));const q=B(y);if(q!==A.__cacheKey){$[q]===void 0&&($[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,D=!0),$[q].usedTimes++;const _e=$[A.__cacheKey];_e!==void 0&&($[A.__cacheKey].usedTimes--,_e.usedTimes===0&&b(y)),A.__cacheKey=q,A.__webglTexture=$[q].texture}return D}function rt(A,y,D){return Math.floor(Math.floor(A/D)/y)}function ht(A,y,D,Y){const q=A.updateRanges;if(q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,D,Y,y.data);else{q.sort((j,ee)=>j.start-ee.start);let _e=0;for(let j=1;j<q.length;j++){const ee=q[_e],ve=q[j],Me=ee.start+ee.count,de=rt(ve.start,y.width,4),Ge=rt(ee.start,y.width,4);ve.start<=Me+1&&de===Ge&&rt(ve.start+ve.count-1,y.width,4)===de?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++_e,q[_e]=ve)}q.length=_e+1;const ie=r.getParameter(r.UNPACK_ROW_LENGTH),Ce=r.getParameter(r.UNPACK_SKIP_PIXELS),Ie=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let j=0,ee=q.length;j<ee;j++){const ve=q[j],Me=Math.floor(ve.start/4),de=Math.ceil(ve.count/4),Ge=Me%y.width,L=Math.floor(Me/y.width),se=de,te=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,L),t.texSubImage2D(r.TEXTURE_2D,0,Ge,L,se,te,D,Y,y.data)}A.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ie),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ce),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ie)}}function K(A,y,D){let Y=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=r.TEXTURE_3D);const $=De(A,y),q=y.source;t.bindTexture(Y,A.__webglTexture,r.TEXTURE0+D);const _e=n.get(q);if(q.version!==_e.__version||$===!0){t.activeTexture(r.TEXTURE0+D);const ie=qe.getPrimaries(qe.workingColorSpace),Ce=y.colorSpace===ni?null:qe.getPrimaries(y.colorSpace),Ie=y.colorSpace===ni||ie===Ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let j=_(y.image,!1,i.maxTextureSize);j=lt(y,j);const ee=s.convert(y.format,y.colorSpace),ve=s.convert(y.type);let Me=M(y.internalFormat,ee,ve,y.colorSpace,y.isVideoTexture);le(Y,y);let de;const Ge=y.mipmaps,L=y.isVideoTexture!==!0,se=_e.__version===void 0||$===!0,te=q.dataReady,ge=E(y,j);if(y.isDepthTexture)Me=S(y.format===vi,y.type),se&&(L?t.texStorage2D(r.TEXTURE_2D,1,Me,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,Me,j.width,j.height,0,ee,ve,null));else if(y.isDataTexture)if(Ge.length>0){L&&se&&t.texStorage2D(r.TEXTURE_2D,ge,Me,Ge[0].width,Ge[0].height);for(let J=0,X=Ge.length;J<X;J++)de=Ge[J],L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,de.width,de.height,ee,ve,de.data):t.texImage2D(r.TEXTURE_2D,J,Me,de.width,de.height,0,ee,ve,de.data);y.generateMipmaps=!1}else L?(se&&t.texStorage2D(r.TEXTURE_2D,ge,Me,j.width,j.height),te&&ht(y,j,ee,ve)):t.texImage2D(r.TEXTURE_2D,0,Me,j.width,j.height,0,ee,ve,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){L&&se&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,Me,Ge[0].width,Ge[0].height,j.depth);for(let J=0,X=Ge.length;J<X;J++)if(de=Ge[J],y.format!==an)if(ee!==null)if(L){if(te)if(y.layerUpdates.size>0){const xe=Wc(de.width,de.height,y.format,y.type);for(const Fe of y.layerUpdates){const ct=de.data.subarray(Fe*xe/de.data.BYTES_PER_ELEMENT,(Fe+1)*xe/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Fe,de.width,de.height,1,ee,ct)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,de.width,de.height,j.depth,ee,de.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,Me,de.width,de.height,j.depth,0,de.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,de.width,de.height,j.depth,ee,ve,de.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,Me,de.width,de.height,j.depth,0,ee,ve,de.data)}else{L&&se&&t.texStorage2D(r.TEXTURE_2D,ge,Me,Ge[0].width,Ge[0].height);for(let J=0,X=Ge.length;J<X;J++)de=Ge[J],y.format!==an?ee!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,de.width,de.height,ee,de.data):t.compressedTexImage2D(r.TEXTURE_2D,J,Me,de.width,de.height,0,de.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,de.width,de.height,ee,ve,de.data):t.texImage2D(r.TEXTURE_2D,J,Me,de.width,de.height,0,ee,ve,de.data)}else if(y.isDataArrayTexture)if(L){if(se&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,Me,j.width,j.height,j.depth),te)if(y.layerUpdates.size>0){const J=Wc(j.width,j.height,y.format,y.type);for(const X of y.layerUpdates){const xe=j.data.subarray(X*J/j.data.BYTES_PER_ELEMENT,(X+1)*J/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,X,j.width,j.height,1,ee,ve,xe)}y.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ee,ve,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Me,j.width,j.height,j.depth,0,ee,ve,j.data);else if(y.isData3DTexture)L?(se&&t.texStorage3D(r.TEXTURE_3D,ge,Me,j.width,j.height,j.depth),te&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ee,ve,j.data)):t.texImage3D(r.TEXTURE_3D,0,Me,j.width,j.height,j.depth,0,ee,ve,j.data);else if(y.isFramebufferTexture){if(se)if(L)t.texStorage2D(r.TEXTURE_2D,ge,Me,j.width,j.height);else{let J=j.width,X=j.height;for(let xe=0;xe<ge;xe++)t.texImage2D(r.TEXTURE_2D,xe,Me,J,X,0,ee,ve,null),J>>=1,X>>=1}}else if(Ge.length>0){if(L&&se){const J=be(Ge[0]);t.texStorage2D(r.TEXTURE_2D,ge,Me,J.width,J.height)}for(let J=0,X=Ge.length;J<X;J++)de=Ge[J],L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ee,ve,de):t.texImage2D(r.TEXTURE_2D,J,Me,ee,ve,de);y.generateMipmaps=!1}else if(L){if(se){const J=be(j);t.texStorage2D(r.TEXTURE_2D,ge,Me,J.width,J.height)}te&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee,ve,j)}else t.texImage2D(r.TEXTURE_2D,0,Me,ee,ve,j);g(y)&&m(Y),_e.__version=q.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function ne(A,y,D){if(y.image.length!==6)return;const Y=De(A,y),$=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+D);const q=n.get($);if($.version!==q.__version||Y===!0){t.activeTexture(r.TEXTURE0+D);const _e=qe.getPrimaries(qe.workingColorSpace),ie=y.colorSpace===ni?null:qe.getPrimaries(y.colorSpace),Ce=y.colorSpace===ni||_e===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,j=y.image[0]&&y.image[0].isDataTexture,ee=[];for(let X=0;X<6;X++)!Ie&&!j?ee[X]=_(y.image[X],!0,i.maxCubemapSize):ee[X]=j?y.image[X].image:y.image[X],ee[X]=lt(y,ee[X]);const ve=ee[0],Me=s.convert(y.format,y.colorSpace),de=s.convert(y.type),Ge=M(y.internalFormat,Me,de,y.colorSpace),L=y.isVideoTexture!==!0,se=q.__version===void 0||Y===!0,te=$.dataReady;let ge=E(y,ve);le(r.TEXTURE_CUBE_MAP,y);let J;if(Ie){L&&se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ge,ve.width,ve.height);for(let X=0;X<6;X++){J=ee[X].mipmaps;for(let xe=0;xe<J.length;xe++){const Fe=J[xe];y.format!==an?Me!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Fe.width,Fe.height,Me,Fe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ge,Fe.width,Fe.height,0,Fe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Fe.width,Fe.height,Me,de,Fe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ge,Fe.width,Fe.height,0,Me,de,Fe.data)}}}else{if(J=y.mipmaps,L&&se){J.length>0&&ge++;const X=be(ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ge,X.width,X.height)}for(let X=0;X<6;X++)if(j){L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ee[X].width,ee[X].height,Me,de,ee[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,ee[X].width,ee[X].height,0,Me,de,ee[X].data);for(let xe=0;xe<J.length;xe++){const ct=J[xe].image[X].image;L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,ct.width,ct.height,Me,de,ct.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ge,ct.width,ct.height,0,Me,de,ct.data)}}else{L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Me,de,ee[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,Me,de,ee[X]);for(let xe=0;xe<J.length;xe++){const Fe=J[xe];L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,Me,de,Fe.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ge,Me,de,Fe.image[X])}}}g(y)&&m(r.TEXTURE_CUBE_MAP),q.__version=$.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function re(A,y,D,Y,$,q){const _e=s.convert(D.format,D.colorSpace),ie=s.convert(D.type),Ce=M(D.internalFormat,_e,ie,D.colorSpace),Ie=n.get(y),j=n.get(D);if(j.__renderTarget=y,!Ie.__hasExternalTextures){const ee=Math.max(1,y.width>>q),ve=Math.max(1,y.height>>q);$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?t.texImage3D($,q,Ce,ee,ve,y.depth,0,_e,ie,null):t.texImage2D($,q,Ce,ee,ve,0,_e,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),St(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,$,j.__webglTexture,0,I(y)):($===r.TEXTURE_2D||$>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,$,j.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Oe(A,y,D){if(r.bindRenderbuffer(r.RENDERBUFFER,A),y.depthBuffer){const Y=y.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,q=S(y.stencilBuffer,$),_e=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;St(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(y),q,y.width,y.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(y),q,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,q,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,A)}else{const Y=y.textures;for(let $=0;$<Y.length;$++){const q=Y[$],_e=s.convert(q.format,q.colorSpace),ie=s.convert(q.type),Ce=M(q.internalFormat,_e,ie,q.colorSpace);St(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(y),Ce,y.width,y.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(y),Ce,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,Ce,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(A,y,D){const Y=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(y.depthTexture);if($.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),le(r.TEXTURE_CUBE_MAP,y.depthTexture);const Ie=s.convert(y.depthTexture.format),j=s.convert(y.depthTexture.type);let ee;y.depthTexture.format===Xn?ee=r.DEPTH_COMPONENT24:y.depthTexture.format===vi&&(ee=r.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,y.width,y.height,0,Ie,j,null)}}else H(y.depthTexture,0);const q=$.__webglTexture,_e=I(y),ie=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+D:r.TEXTURE_2D,Ce=y.depthTexture.format===vi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(y.depthTexture.format===Xn)St(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ce,ie,q,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,Ce,ie,q,0);else if(y.depthTexture.format===vi)St(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ce,ie,q,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,Ce,ie,q,0);else throw new Error("Unknown depthTexture format")}function Ne(A){const y=n.get(A),D=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){const $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=Y}if(A.depthTexture&&!y.__autoAllocateDepthBuffer)if(D)for(let Y=0;Y<6;Y++)Pe(y.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?Pe(y.__webglFramebuffer[0],A,0):Pe(y.__webglFramebuffer,A,0)}else if(D){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=r.createRenderbuffer(),Oe(y.__webglDepthbuffer[Y],A,!1);else{const $=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Oe(y.__webglDepthbuffer,A,!1);else{const $=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Dt(A,y,D){const Y=n.get(A);y!==void 0&&re(Y.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),D!==void 0&&Ne(A)}function Ye(A){const y=A.texture,D=n.get(A),Y=n.get(y);A.addEventListener("dispose",C);const $=A.textures,q=A.isWebGLCubeRenderTarget===!0,_e=$.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=y.version,o.memory.textures++),q){D.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer[ie]=[];for(let Ce=0;Ce<y.mipmaps.length;Ce++)D.__webglFramebuffer[ie][Ce]=r.createFramebuffer()}else D.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer=[];for(let ie=0;ie<y.mipmaps.length;ie++)D.__webglFramebuffer[ie]=r.createFramebuffer()}else D.__webglFramebuffer=r.createFramebuffer();if(_e)for(let ie=0,Ce=$.length;ie<Ce;ie++){const Ie=n.get($[ie]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&St(A)===!1){D.__webglMultisampledFramebuffer=r.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ie=0;ie<$.length;ie++){const Ce=$[ie];D.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,D.__webglColorRenderbuffer[ie]);const Ie=s.convert(Ce.format,Ce.colorSpace),j=s.convert(Ce.type),ee=M(Ce.internalFormat,Ie,j,Ce.colorSpace,A.isXRRenderTarget===!0),ve=I(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,D.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(D.__webglDepthRenderbuffer=r.createRenderbuffer(),Oe(D.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),le(r.TEXTURE_CUBE_MAP,y);for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0)for(let Ce=0;Ce<y.mipmaps.length;Ce++)re(D.__webglFramebuffer[ie][Ce],A,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ce);else re(D.__webglFramebuffer[ie],A,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);g(y)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ie=0,Ce=$.length;ie<Ce;ie++){const Ie=$[ie],j=n.get(Ie);let ee=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,j.__webglTexture),le(ee,Ie),re(D.__webglFramebuffer,A,Ie,r.COLOR_ATTACHMENT0+ie,ee,0),g(Ie)&&m(ee)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ie=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,Y.__webglTexture),le(ie,y),y.mipmaps&&y.mipmaps.length>0)for(let Ce=0;Ce<y.mipmaps.length;Ce++)re(D.__webglFramebuffer[Ce],A,y,r.COLOR_ATTACHMENT0,ie,Ce);else re(D.__webglFramebuffer,A,y,r.COLOR_ATTACHMENT0,ie,0);g(y)&&m(ie),t.unbindTexture()}A.depthBuffer&&Ne(A)}function Qe(A){const y=A.textures;for(let D=0,Y=y.length;D<Y;D++){const $=y[D];if(g($)){const q=v(A),_e=n.get($).__webglTexture;t.bindTexture(q,_e),m(q),t.unbindTexture()}}}const ot=[],Ve=[];function vt(A){if(A.samples>0){if(St(A)===!1){const y=A.textures,D=A.width,Y=A.height;let $=r.COLOR_BUFFER_BIT;const q=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=n.get(A),ie=y.length>1;if(ie)for(let Ie=0;Ie<y.length;Ie++)t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Ce=A.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ie=0;Ie<y.length;Ie++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const j=n.get(y[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,j,0)}r.blitFramebuffer(0,0,D,Y,0,0,D,Y,$,r.NEAREST),h===!0&&(ot.length=0,Ve.length=0,ot.push(r.COLOR_ATTACHMENT0+Ie),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ot.push(q),Ve.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ve)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let Ie=0;Ie<y.length;Ie++){t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const j=n.get(y[Ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,j,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&h){const y=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function I(A){return Math.min(i.maxSamples,A.samples)}function St(A){const y=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function je(A){const y=o.render.frame;f.get(A)!==y&&(f.set(A,y),A.update())}function lt(A,y){const D=A.colorSpace,Y=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||D!==Yt&&D!==ni&&(qe.getTransfer(D)===Je?(Y!==an||$!==Qt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",D)),y}function be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=H,this.setTexture2DArray=k,this.setTexture3D=z,this.setTextureCube=Q,this.rebindTextures=Dt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=re,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dv(r,e){function t(n,i=ni){let s;const o=qe.getTransfer(i);if(n===Qt)return r.UNSIGNED_BYTE;if(n===ul)return r.UNSIGNED_SHORT_4_4_4_4;if(n===dl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Oh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nh)return r.BYTE;if(n===Fh)return r.SHORT;if(n===Us)return r.UNSIGNED_SHORT;if(n===hl)return r.INT;if(n===Cn)return r.UNSIGNED_INT;if(n===on)return r.FLOAT;if(n===en)return r.HALF_FLOAT;if(n===Bh)return r.ALPHA;if(n===kh)return r.RGB;if(n===an)return r.RGBA;if(n===Xn)return r.DEPTH_COMPONENT;if(n===vi)return r.DEPTH_STENCIL;if(n===fl)return r.RED;if(n===pl)return r.RED_INTEGER;if(n===qi)return r.RG;if(n===ml)return r.RG_INTEGER;if(n===gl)return r.RGBA_INTEGER;if(n===Fr||n===Ur||n===Or||n===Br)if(o===Je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Fr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Fr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===da||n===fa||n===pa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ua)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===da)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===_a||n===va||n===xa||n===ya||n===Ma)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ma||n===ga)return o===Je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===_a)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===va)return s.COMPRESSED_R11_EAC;if(n===xa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ya)return s.COMPRESSED_RG11_EAC;if(n===Ma)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Sa||n===ba||n===wa||n===Ta||n===Ea||n===Aa||n===Ra||n===Ca||n===Pa||n===Ia||n===La||n===Da||n===Na||n===Fa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Sa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ba)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ca)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ia)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Na)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===Oa||n===Ba)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ua)return o===Je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ba)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ka||n===za||n===Va||n===Ga)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ka)return s.COMPRESSED_RED_RGTC1_EXT;if(n===za)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const fv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pv=`
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

}`;class mv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new jh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ct({vertexShader:fv,fragmentShader:pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ye(new ns(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gv extends ts{constructor(e,t){super();const n=this;let i=null,s=1,o=null,l="local-floor",h=1,u=null,f=null,a=null,c=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new mv,m={},v=t.getContextAttributes();let M=null,S=null;const E=[],T=[],C=new ae;let x=null;const b=new Wt;b.viewport=new ut;const U=new Wt;U.viewport=new ut;const P=[b,U],F=new _p;let O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ne=E[K];return ne===void 0&&(ne=new fo,E[K]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(K){let ne=E[K];return ne===void 0&&(ne=new fo,E[K]=ne),ne.getGripSpace()},this.getHand=function(K){let ne=E[K];return ne===void 0&&(ne=new fo,E[K]=ne),ne.getHandSpace()};function H(K){const ne=T.indexOf(K.inputSource);if(ne===-1)return;const re=E[ne];re!==void 0&&(re.update(K.inputSource,K.frame,u||o),re.dispatchEvent({type:K.type,data:K.inputSource}))}function k(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",z);for(let K=0;K<E.length;K++){const ne=T[K];ne!==null&&(T[K]=null,E[K].disconnect(ne))}O=null,B=null,g.reset();for(const K in m)delete m[K];e.setRenderTarget(M),d=null,c=null,a=null,i=null,S=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){l=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(K){u=K},this.getBaseLayer=function(){return c!==null?c:d},this.getBinding=function(){return a===null&&_&&(a=new XRWebGLBinding(i,t)),a},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",k),i.addEventListener("inputsourceschange",z),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Oe=null,Pe=null;v.depth&&(Pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=v.stencil?vi:Xn,Oe=v.stencil?Os:Cn);const Ne={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};a=this.getBinding(),c=a.createProjectionLayer(Ne),i.updateRenderState({layers:[c]}),e.setPixelRatio(1),e.setSize(c.textureWidth,c.textureHeight,!1),S=new $t(c.textureWidth,c.textureHeight,{format:an,type:Qt,depthTexture:new Gs(c.textureWidth,c.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}else{const re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new $t(d.framebufferWidth,d.framebufferHeight,{format:an,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(h),u=null,o=await i.requestReferenceSpace(l),ht.setContext(i),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(K){for(let ne=0;ne<K.removed.length;ne++){const re=K.removed[ne],Oe=T.indexOf(re);Oe>=0&&(T[Oe]=null,E[Oe].disconnect(re))}for(let ne=0;ne<K.added.length;ne++){const re=K.added[ne];let Oe=T.indexOf(re);if(Oe===-1){for(let Ne=0;Ne<E.length;Ne++)if(Ne>=T.length){T.push(re),Oe=Ne;break}else if(T[Ne]===null){T[Ne]=re,Oe=Ne;break}if(Oe===-1)break}const Pe=E[Oe];Pe&&Pe.connect(re)}}const Q=new R,Z=new R;function oe(K,ne,re){Q.setFromMatrixPosition(ne.matrixWorld),Z.setFromMatrixPosition(re.matrixWorld);const Oe=Q.distanceTo(Z),Pe=ne.projectionMatrix.elements,Ne=re.projectionMatrix.elements,Dt=Pe[14]/(Pe[10]-1),Ye=Pe[14]/(Pe[10]+1),Qe=(Pe[9]+1)/Pe[5],ot=(Pe[9]-1)/Pe[5],Ve=(Pe[8]-1)/Pe[0],vt=(Ne[8]+1)/Ne[0],I=Dt*Ve,St=Dt*vt,je=Oe/(-Ve+vt),lt=je*-Ve;if(ne.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(lt),K.translateZ(je),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Pe[10]===-1)K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const be=Dt+je,A=Ye+je,y=I-lt,D=St+(Oe-lt),Y=Qe*Ye/A*be,$=ot*Ye/A*be;K.projectionMatrix.makePerspective(y,D,Y,$,be,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function pe(K,ne){ne===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ne.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let ne=K.near,re=K.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(re=g.depthFar)),F.near=U.near=b.near=ne,F.far=U.far=b.far=re,(O!==F.near||B!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,B=F.far),F.layers.mask=K.layers.mask|6,b.layers.mask=F.layers.mask&-5,U.layers.mask=F.layers.mask&-3;const Oe=K.parent,Pe=F.cameras;pe(F,Oe);for(let Ne=0;Ne<Pe.length;Ne++)pe(Pe[Ne],Oe);Pe.length===2?oe(F,b,U):F.projectionMatrix.copy(b.projectionMatrix),le(K,F,Oe)};function le(K,ne,re){re===null?K.matrix.copy(ne.matrixWorld):(K.matrix.copy(re.matrixWorld),K.matrix.invert(),K.matrix.multiply(ne.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Yi*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(c===null&&d===null))return h},this.setFoveation=function(K){h=K,c!==null&&(c.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return m[K]};let De=null;function rt(K,ne){if(f=ne.getViewerPose(u||o),p=ne,f!==null){const re=f.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let Oe=!1;re.length!==F.cameras.length&&(F.cameras.length=0,Oe=!0);for(let Ye=0;Ye<re.length;Ye++){const Qe=re[Ye];let ot=null;if(d!==null)ot=d.getViewport(Qe);else{const vt=a.getViewSubImage(c,Qe);ot=vt.viewport,Ye===0&&(e.setRenderTargetTextures(S,vt.colorTexture,vt.depthStencilTexture),e.setRenderTarget(S))}let Ve=P[Ye];Ve===void 0&&(Ve=new Wt,Ve.layers.enable(Ye),Ve.viewport=new ut,P[Ye]=Ve),Ve.matrix.fromArray(Qe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Qe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ot.x,ot.y,ot.width,ot.height),Ye===0&&(F.matrix.copy(Ve.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Oe===!0&&F.cameras.push(Ve)}const Pe=i.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){a=n.getBinding();const Ye=a.getDepthInformation(re[0]);Ye&&Ye.isValid&&Ye.texture&&g.init(Ye,i.renderState)}if(Pe&&Pe.includes("camera-access")&&_){e.state.unbindTexture(),a=n.getBinding();for(let Ye=0;Ye<re.length;Ye++){const Qe=re[Ye].camera;if(Qe){let ot=m[Qe];ot||(ot=new jh,m[Qe]=ot);const Ve=a.getCameraImage(Qe);ot.sourceTexture=Ve}}}}for(let re=0;re<E.length;re++){const Oe=T[re],Pe=E[re];Oe!==null&&Pe!==void 0&&Pe.update(Oe,ne,u||o)}De&&De(K,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}const ht=new pu;ht.setAnimationLoop(rt),this.setAnimationLoop=function(K){De=K},this.dispose=function(){}}}const ui=new cn,_v=new ke;function vv(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,au(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,M,S){m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),a(g,m)):m.isMeshPhongMaterial?(s(g,m),f(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),c(g,m),m.isMeshPhysicalMaterial&&d(g,m,S)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&l(g,m)):m.isPointsMaterial?h(g,m,v,M):m.isSpriteMaterial?u(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===qt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===qt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),M=v.envMap,S=v.envMapRotation;M&&(g.envMap.value=M,ui.copy(S),ui.x*=-1,ui.y*=-1,ui.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),g.envMapRotation.value.setFromMatrix4(_v.makeRotationFromEuler(ui)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function l(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function h(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function f(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function a(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function c(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xv(r,e,t,n){let i={},s={},o=[];const l=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function h(v,M){const S=M.program;n.uniformBlockBinding(v,S)}function u(v,M){let S=i[v.id];S===void 0&&(p(v),S=f(v),i[v.id]=S,v.addEventListener("dispose",g));const E=M.program;n.updateUBOMapping(v,E);const T=e.render.frame;s[v.id]!==T&&(c(v),s[v.id]=T)}function f(v){const M=a();v.__bindingPointIndex=M;const S=r.createBuffer(),E=v.__size,T=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,E,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,S),S}function a(){for(let v=0;v<l;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(v){const M=i[v.id],S=v.uniforms,E=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let T=0,C=S.length;T<C;T++){const x=Array.isArray(S[T])?S[T]:[S[T]];for(let b=0,U=x.length;b<U;b++){const P=x[b];if(d(P,T,b,E)===!0){const F=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let H=0;H<O.length;H++){const k=O[H],z=_(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,F+B,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):(k.toArray(P.__data,B),B+=z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,M,S,E){const T=v.value,C=M+"_"+S;if(E[C]===void 0)return typeof T=="number"||typeof T=="boolean"?E[C]=T:E[C]=T.clone(),!0;{const x=E[C];if(typeof T=="number"||typeof T=="boolean"){if(x!==T)return E[C]=T,!0}else if(x.equals(T)===!1)return x.copy(T),!0}return!1}function p(v){const M=v.uniforms;let S=0;const E=16;for(let C=0,x=M.length;C<x;C++){const b=Array.isArray(M[C])?M[C]:[M[C]];for(let U=0,P=b.length;U<P;U++){const F=b[U],O=Array.isArray(F.value)?F.value:[F.value];for(let B=0,H=O.length;B<H;B++){const k=O[B],z=_(k),Q=S%E,Z=Q%z.boundary,oe=Q+Z;S+=Z,oe!==0&&E-oe<z.storage&&(S+=E-oe),F.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=z.storage}}}const T=S%E;return T>0&&(S+=E-T),v.__size=S,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ae("WebGLRenderer: Unsupported uniform value type.",v),M}function g(v){const M=v.target;M.removeEventListener("dispose",g);const S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:h,update:u,dispose:m}}const yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let xn=null;function Mv(){return xn===null&&(xn=new bl(yv,16,16,qi,en),xn.name="DFG_LUT",xn.minFilter=wt,xn.magFilter=wt,xn.wrapS=bn,xn.wrapT=bn,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}class Sv{constructor(e={}){const{canvas:t=_d(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:a=!1,reversedDepthBuffer:c=!1,outputBufferType:d=Qt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=d,g=new Set([gl,ml,pl]),m=new Set([Qt,Cn,Us,Os,ul,dl]),v=new Uint32Array(4),M=new Int32Array(4);let S=null,E=null;const T=[],C=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let U=!1;this._outputColorSpace=Tt;let P=0,F=0,O=null,B=-1,H=null;const k=new ut,z=new ut;let Q=null;const Z=new fe(0);let oe=0,pe=t.width,le=t.height,De=1,rt=null,ht=null;const K=new ut(0,0,pe,le),ne=new ut(0,0,pe,le);let re=!1;const Oe=new Tl;let Pe=!1,Ne=!1;const Dt=new ke,Ye=new R,Qe=new ut,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function vt(){return O===null?De:1}let I=n;function St(w,N){return t.getContext(w,N)}try{const w={alpha:!0,depth:i,stencil:s,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:a};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${il}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Fe,!1),t.addEventListener("webglcontextcreationerror",ct,!1),I===null){const N="webgl2";if(I=St(N,w),I===null)throw St(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw Le("WebGLRenderer: "+w.message),w}let je,lt,be,A,y,D,Y,$,q,_e,ie,Ce,Ie,j,ee,ve,Me,de,Ge,L,se,te,ge;function J(){je=new S0(I),je.init(),se=new dv(I,je),lt=new p0(I,je,e,se),be=new hv(I,je),lt.reversedDepthBuffer&&c&&be.buffers.depth.setReversed(!0),A=new T0(I),y=new Z_,D=new uv(I,je,be,y,lt,se,A),Y=new M0(b),$=new Pp(I),te=new d0(I,$),q=new b0(I,$,A,te),_e=new A0(I,q,$,te,A),de=new E0(I,lt,D),ee=new m0(y),ie=new $_(b,Y,je,lt,te,ee),Ce=new vv(b,y),Ie=new J_,j=new sv(je),Me=new u0(b,Y,be,_e,p,h),ve=new cv(b,_e,lt),ge=new xv(I,A,lt,be),Ge=new f0(I,je,A),L=new w0(I,je,A),A.programs=ie.programs,b.capabilities=lt,b.extensions=je,b.properties=y,b.renderLists=Ie,b.shadowMap=ve,b.state=be,b.info=A}J(),_!==Qt&&(x=new C0(_,t.width,t.height,i,s));const X=new gv(b,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=je.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=je.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(w){w!==void 0&&(De=w,this.setSize(pe,le,!1))},this.getSize=function(w){return w.set(pe,le)},this.setSize=function(w,N,W=!0){if(X.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=w,le=N,t.width=Math.floor(w*De),t.height=Math.floor(N*De),W===!0&&(t.style.width=w+"px",t.style.height=N+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(pe*De,le*De).floor()},this.setDrawingBufferSize=function(w,N,W){pe=w,le=N,De=W,t.width=Math.floor(w*W),t.height=Math.floor(N*W),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(_===Qt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(k)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,N,W,G){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,N,W,G),be.viewport(k.copy(K).multiplyScalar(De).round())},this.getScissor=function(w){return w.copy(ne)},this.setScissor=function(w,N,W,G){w.isVector4?ne.set(w.x,w.y,w.z,w.w):ne.set(w,N,W,G),be.scissor(z.copy(ne).multiplyScalar(De).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(w){be.setScissorTest(re=w)},this.setOpaqueSort=function(w){rt=w},this.setTransparentSort=function(w){ht=w},this.getClearColor=function(w){return w.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,W=!0){let G=0;if(w){let V=!1;if(O!==null){const he=O.texture.format;V=g.has(he)}if(V){const he=O.texture.type,me=m.has(he),ue=Me.getClearColor(),Se=Me.getClearAlpha(),Ee=ue.r,Ue=ue.g,He=ue.b;me?(v[0]=Ee,v[1]=Ue,v[2]=He,v[3]=Se,I.clearBufferuiv(I.COLOR,0,v)):(M[0]=Ee,M[1]=Ue,M[2]=He,M[3]=Se,I.clearBufferiv(I.COLOR,0,M))}else G|=I.COLOR_BUFFER_BIT}N&&(G|=I.DEPTH_BUFFER_BIT),W&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Fe,!1),t.removeEventListener("webglcontextcreationerror",ct,!1),Me.dispose(),Ie.dispose(),j.dispose(),y.dispose(),Y.dispose(),_e.dispose(),te.dispose(),ge.dispose(),ie.dispose(),X.dispose(),X.removeEventListener("sessionstart",Bl),X.removeEventListener("sessionend",kl),si.stop()};function xe(w){w.preventDefault(),Wr("WebGLRenderer: Context Lost."),U=!0}function Fe(){Wr("WebGLRenderer: Context Restored."),U=!1;const w=A.autoReset,N=ve.enabled,W=ve.autoUpdate,G=ve.needsUpdate,V=ve.type;J(),A.autoReset=w,ve.enabled=N,ve.autoUpdate=W,ve.needsUpdate=G,ve.type=V}function ct(w){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function et(w){const N=w.target;N.removeEventListener("dispose",et),Dn(N)}function Dn(w){Nn(w),y.remove(w)}function Nn(w){const N=y.get(w).programs;N!==void 0&&(N.forEach(function(W){ie.releaseProgram(W)}),w.isShaderMaterial&&ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,W,G,V,he){N===null&&(N=ot);const me=V.isMesh&&V.matrixWorld.determinant()<0,ue=Eu(w,N,W,G,V);be.setMaterial(G,me);let Se=W.index,Ee=1;if(G.wireframe===!0){if(Se=q.getWireframeAttribute(W),Se===void 0)return;Ee=2}const Ue=W.drawRange,He=W.attributes.position;let Re=Ue.start*Ee,it=(Ue.start+Ue.count)*Ee;he!==null&&(Re=Math.max(Re,he.start*Ee),it=Math.min(it,(he.start+he.count)*Ee)),Se!==null?(Re=Math.max(Re,0),it=Math.min(it,Se.count)):He!=null&&(Re=Math.max(Re,0),it=Math.min(it,He.count));const xt=it-Re;if(xt<0||xt===1/0)return;te.setup(V,G,ue,W,Se);let _t,st=Ge;if(Se!==null&&(_t=$.get(Se),st=L,st.setIndex(_t)),V.isMesh)G.wireframe===!0?(be.setLineWidth(G.wireframeLinewidth*vt()),st.setMode(I.LINES)):st.setMode(I.TRIANGLES);else if(V.isLine){let kt=G.linewidth;kt===void 0&&(kt=1),be.setLineWidth(kt*vt()),V.isLineSegments?st.setMode(I.LINES):V.isLineLoop?st.setMode(I.LINE_LOOP):st.setMode(I.LINE_STRIP)}else V.isPoints?st.setMode(I.POINTS):V.isSprite&&st.setMode(I.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Xr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))st.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const kt=V._multiDrawStarts,we=V._multiDrawCounts,Zt=V._multiDrawCount,Ke=Se?$.get(Se).bytesPerElement:1,hn=y.get(G).currentProgram.getUniforms();for(let _n=0;_n<Zt;_n++)hn.setValue(I,"_gl_DrawID",_n),st.render(kt[_n]/Ke,we[_n])}else if(V.isInstancedMesh)st.renderInstances(Re,xt,V.count);else if(W.isInstancedBufferGeometry){const kt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,we=Math.min(W.instanceCount,kt);st.renderInstances(Re,xt,we)}else st.render(Re,xt)};function Ol(w,N,W){w.transparent===!0&&w.side===Xt&&w.forceSinglePass===!1?(w.side=qt,w.needsUpdate=!0,Qs(w,N,W),w.side=Wn,w.needsUpdate=!0,Qs(w,N,W),w.side=Xt):Qs(w,N,W)}this.compile=function(w,N,W=null){W===null&&(W=w),E=j.get(W),E.init(N),C.push(E),W.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),w!==W&&w.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights();const G=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const he=V.material;if(he)if(Array.isArray(he))for(let me=0;me<he.length;me++){const ue=he[me];Ol(ue,W,V),G.add(ue)}else Ol(he,W,V),G.add(he)}),E=C.pop(),G},this.compileAsync=function(w,N,W=null){const G=this.compile(w,N,W);return new Promise(V=>{function he(){if(G.forEach(function(me){y.get(me).currentProgram.isReady()&&G.delete(me)}),G.size===0){V(w);return}setTimeout(he,10)}je.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let no=null;function Tu(w){no&&no(w)}function Bl(){si.stop()}function kl(){si.start()}const si=new pu;si.setAnimationLoop(Tu),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(w){no=w,X.setAnimationLoop(w),w===null?si.stop():si.start()},X.addEventListener("sessionstart",Bl),X.addEventListener("sessionend",kl),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;const W=X.enabled===!0&&X.isPresenting===!0,G=x!==null&&(O===null||W)&&x.begin(b,O);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),w.isScene===!0&&w.onBeforeRender(b,w,N,O),E=j.get(w,C.length),E.init(N),C.push(E),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Oe.setFromProjectionMatrix(Dt,Tn,N.reversedDepth),Ne=this.localClippingEnabled,Pe=ee.init(this.clippingPlanes,Ne),S=Ie.get(w,T.length),S.init(),T.push(S),X.enabled===!0&&X.isPresenting===!0){const me=b.xr.getDepthSensingMesh();me!==null&&io(me,N,-1/0,b.sortObjects)}io(w,N,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(rt,ht),Ve=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Ve&&Me.addToRenderList(S,w),this.info.render.frame++,Pe===!0&&ee.beginShadows();const V=E.state.shadowsArray;if(ve.render(V,w,N),Pe===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&x.hasRenderPass())===!1){const me=S.opaque,ue=S.transmissive;if(E.setupLights(),N.isArrayCamera){const Se=N.cameras;if(ue.length>0)for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const He=Se[Ee];Vl(me,ue,w,He)}Ve&&Me.render(w);for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const He=Se[Ee];zl(S,w,He,He.viewport)}}else ue.length>0&&Vl(me,ue,w,N),Ve&&Me.render(w),zl(S,w,N)}O!==null&&F===0&&(D.updateMultisampleRenderTarget(O),D.updateRenderTargetMipmap(O)),G&&x.end(b),w.isScene===!0&&w.onAfterRender(b,w,N),te.resetDefaultState(),B=-1,H=null,C.pop(),C.length>0?(E=C[C.length-1],Pe===!0&&ee.setGlobalState(b.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?S=T[T.length-1]:S=null};function io(w,N,W,G){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Oe.intersectsSprite(w)){G&&Qe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Dt);const me=_e.update(w),ue=w.material;ue.visible&&S.push(w,me,ue,W,Qe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Oe.intersectsObject(w))){const me=_e.update(w),ue=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Qe.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Qe.copy(me.boundingSphere.center)),Qe.applyMatrix4(w.matrixWorld).applyMatrix4(Dt)),Array.isArray(ue)){const Se=me.groups;for(let Ee=0,Ue=Se.length;Ee<Ue;Ee++){const He=Se[Ee],Re=ue[He.materialIndex];Re&&Re.visible&&S.push(w,me,Re,W,Qe.z,He)}}else ue.visible&&S.push(w,me,ue,W,Qe.z,null)}}const he=w.children;for(let me=0,ue=he.length;me<ue;me++)io(he[me],N,W,G)}function zl(w,N,W,G){const{opaque:V,transmissive:he,transparent:me}=w;E.setupLightsView(W),Pe===!0&&ee.setGlobalState(b.clippingPlanes,W),G&&be.viewport(k.copy(G)),V.length>0&&Js(V,N,W),he.length>0&&Js(he,N,W),me.length>0&&Js(me,N,W),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Vl(w,N,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const Re=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new $t(1,1,{generateMipmaps:!0,type:Re?en:Qt,minFilter:wn,samples:Math.max(4,lt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const he=E.state.transmissionRenderTarget[G.id],me=G.viewport||k;he.setSize(me.z*b.transmissionResolutionScale,me.w*b.transmissionResolutionScale);const ue=b.getRenderTarget(),Se=b.getActiveCubeFace(),Ee=b.getActiveMipmapLevel();b.setRenderTarget(he),b.getClearColor(Z),oe=b.getClearAlpha(),oe<1&&b.setClearColor(16777215,.5),b.clear(),Ve&&Me.render(W);const Ue=b.toneMapping;b.toneMapping=An;const He=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),Pe===!0&&ee.setGlobalState(b.clippingPlanes,G),Js(w,W,G),D.updateMultisampleRenderTarget(he),D.updateRenderTargetMipmap(he),je.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let it=0,xt=N.length;it<xt;it++){const _t=N[it],{object:st,geometry:kt,material:we,group:Zt}=_t;if(we.side===Xt&&st.layers.test(G.layers)){const Ke=we.side;we.side=qt,we.needsUpdate=!0,Gl(st,W,G,kt,we,Zt),we.side=Ke,we.needsUpdate=!0,Re=!0}}Re===!0&&(D.updateMultisampleRenderTarget(he),D.updateRenderTargetMipmap(he))}b.setRenderTarget(ue,Se,Ee),b.setClearColor(Z,oe),He!==void 0&&(G.viewport=He),b.toneMapping=Ue}function Js(w,N,W){const G=N.isScene===!0?N.overrideMaterial:null;for(let V=0,he=w.length;V<he;V++){const me=w[V],{object:ue,geometry:Se,group:Ee}=me;let Ue=me.material;Ue.allowOverride===!0&&G!==null&&(Ue=G),ue.layers.test(W.layers)&&Gl(ue,N,W,Se,Ue,Ee)}}function Gl(w,N,W,G,V,he){w.onBeforeRender(b,N,W,G,V,he),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(b,N,W,G,w,he),V.transparent===!0&&V.side===Xt&&V.forceSinglePass===!1?(V.side=qt,V.needsUpdate=!0,b.renderBufferDirect(W,N,G,V,w,he),V.side=Wn,V.needsUpdate=!0,b.renderBufferDirect(W,N,G,V,w,he),V.side=Xt):b.renderBufferDirect(W,N,G,V,w,he),w.onAfterRender(b,N,W,G,V,he)}function Qs(w,N,W){N.isScene!==!0&&(N=ot);const G=y.get(w),V=E.state.lights,he=E.state.shadowsArray,me=V.state.version,ue=ie.getParameters(w,V.state,he,N,W),Se=ie.getProgramCacheKey(ue);let Ee=G.programs;G.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;const Ue=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;G.envMap=Y.get(w.envMap||G.environment,Ue),G.envMapRotation=G.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Ee===void 0&&(w.addEventListener("dispose",et),Ee=new Map,G.programs=Ee);let He=Ee.get(Se);if(He!==void 0){if(G.currentProgram===He&&G.lightsStateVersion===me)return Wl(w,ue),He}else ue.uniforms=ie.getUniforms(w),w.onBeforeCompile(ue,b),He=ie.acquireProgram(ue,Se),Ee.set(Se,He),G.uniforms=ue.uniforms;const Re=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Re.clippingPlanes=ee.uniform),Wl(w,ue),G.needsLights=Ru(w),G.lightsStateVersion=me,G.needsLights&&(Re.ambientLightColor.value=V.state.ambient,Re.lightProbe.value=V.state.probe,Re.directionalLights.value=V.state.directional,Re.directionalLightShadows.value=V.state.directionalShadow,Re.spotLights.value=V.state.spot,Re.spotLightShadows.value=V.state.spotShadow,Re.rectAreaLights.value=V.state.rectArea,Re.ltc_1.value=V.state.rectAreaLTC1,Re.ltc_2.value=V.state.rectAreaLTC2,Re.pointLights.value=V.state.point,Re.pointLightShadows.value=V.state.pointShadow,Re.hemisphereLights.value=V.state.hemi,Re.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Re.spotLightMatrix.value=V.state.spotLightMatrix,Re.spotLightMap.value=V.state.spotLightMap,Re.pointShadowMatrix.value=V.state.pointShadowMatrix),G.currentProgram=He,G.uniformsList=null,He}function Hl(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=kr.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Wl(w,N){const W=y.get(w);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function Eu(w,N,W,G,V){N.isScene!==!0&&(N=ot),D.resetTextureUnits();const he=N.fog,me=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,ue=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Yt,Se=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ee=Y.get(G.envMap||me,Se),Ue=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,He=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Re=!!W.morphAttributes.position,it=!!W.morphAttributes.normal,xt=!!W.morphAttributes.color;let _t=An;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(_t=b.toneMapping);const st=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,kt=st!==void 0?st.length:0,we=y.get(G),Zt=E.state.lights;if(Pe===!0&&(Ne===!0||w!==H)){const Nt=w===H&&G.id===B;ee.setState(G,w,Nt)}let Ke=!1;G.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Zt.state.version||we.outputColorSpace!==ue||V.isBatchedMesh&&we.batching===!1||!V.isBatchedMesh&&we.batching===!0||V.isBatchedMesh&&we.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&we.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&we.instancing===!1||!V.isInstancedMesh&&we.instancing===!0||V.isSkinnedMesh&&we.skinning===!1||!V.isSkinnedMesh&&we.skinning===!0||V.isInstancedMesh&&we.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&we.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&we.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&we.instancingMorph===!1&&V.morphTexture!==null||we.envMap!==Ee||G.fog===!0&&we.fog!==he||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ee.numPlanes||we.numIntersection!==ee.numIntersection)||we.vertexAlphas!==Ue||we.vertexTangents!==He||we.morphTargets!==Re||we.morphNormals!==it||we.morphColors!==xt||we.toneMapping!==_t||we.morphTargetsCount!==kt)&&(Ke=!0):(Ke=!0,we.__version=G.version);let hn=we.currentProgram;Ke===!0&&(hn=Qs(G,N,V));let _n=!1,ri=!1,Si=!1;const at=hn.getUniforms(),Ot=we.uniforms;if(be.useProgram(hn.program)&&(_n=!0,ri=!0,Si=!0),G.id!==B&&(B=G.id,ri=!0),_n||H!==w){be.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),at.setValue(I,"projectionMatrix",w.projectionMatrix),at.setValue(I,"viewMatrix",w.matrixWorldInverse);const Kn=at.map.cameraPosition;Kn!==void 0&&Kn.setValue(I,Ye.setFromMatrixPosition(w.matrixWorld)),lt.logarithmicDepthBuffer&&at.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&at.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),H!==w&&(H=w,ri=!0,Si=!0)}if(we.needsLights&&(Zt.state.directionalShadowMap.length>0&&at.setValue(I,"directionalShadowMap",Zt.state.directionalShadowMap,D),Zt.state.spotShadowMap.length>0&&at.setValue(I,"spotShadowMap",Zt.state.spotShadowMap,D),Zt.state.pointShadowMap.length>0&&at.setValue(I,"pointShadowMap",Zt.state.pointShadowMap,D)),V.isSkinnedMesh){at.setOptional(I,V,"bindMatrix"),at.setOptional(I,V,"bindMatrixInverse");const Nt=V.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),at.setValue(I,"boneTexture",Nt.boneTexture,D))}V.isBatchedMesh&&(at.setOptional(I,V,"batchingTexture"),at.setValue(I,"batchingTexture",V._matricesTexture,D),at.setOptional(I,V,"batchingIdTexture"),at.setValue(I,"batchingIdTexture",V._indirectTexture,D),at.setOptional(I,V,"batchingColorTexture"),V._colorsTexture!==null&&at.setValue(I,"batchingColorTexture",V._colorsTexture,D));const Yn=W.morphAttributes;if((Yn.position!==void 0||Yn.normal!==void 0||Yn.color!==void 0)&&de.update(V,W,hn),(ri||we.receiveShadow!==V.receiveShadow)&&(we.receiveShadow=V.receiveShadow,at.setValue(I,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(Ot.envMapIntensity.value=N.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=Mv()),ri&&(at.setValue(I,"toneMappingExposure",b.toneMappingExposure),we.needsLights&&Au(Ot,Si),he&&G.fog===!0&&Ce.refreshFogUniforms(Ot,he),Ce.refreshMaterialUniforms(Ot,G,De,le,E.state.transmissionRenderTarget[w.id]),kr.upload(I,Hl(we),Ot,D)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(kr.upload(I,Hl(we),Ot,D),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&at.setValue(I,"center",V.center),at.setValue(I,"modelViewMatrix",V.modelViewMatrix),at.setValue(I,"normalMatrix",V.normalMatrix),at.setValue(I,"modelMatrix",V.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Nt=G.uniformsGroups;for(let Kn=0,bi=Nt.length;Kn<bi;Kn++){const Xl=Nt[Kn];ge.update(Xl,hn),ge.bind(Xl,hn)}}return hn}function Au(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function Ru(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,N,W){const G=y.get(w);G.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),y.get(w.texture).__webglTexture=N,y.get(w.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){const W=y.get(w);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const Cu=I.createFramebuffer();this.setRenderTarget=function(w,N=0,W=0){O=w,P=N,F=W;let G=null,V=!1,he=!1;if(w){const ue=y.get(w);if(ue.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(I.FRAMEBUFFER,ue.__webglFramebuffer),k.copy(w.viewport),z.copy(w.scissor),Q=w.scissorTest,be.viewport(k),be.scissor(z),be.setScissorTest(Q),B=-1;return}else if(ue.__webglFramebuffer===void 0)D.setupRenderTarget(w);else if(ue.__hasExternalTextures)D.rebindTextures(w,y.get(w.texture).__webglTexture,y.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ue=w.depthTexture;if(ue.__boundDepthTexture!==Ue){if(Ue!==null&&y.has(Ue)&&(w.width!==Ue.image.width||w.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(w)}}const Se=w.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(he=!0);const Ee=y.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ee[N])?G=Ee[N][W]:G=Ee[N],V=!0):w.samples>0&&D.useMultisampledRTT(w)===!1?G=y.get(w).__webglMultisampledFramebuffer:Array.isArray(Ee)?G=Ee[W]:G=Ee,k.copy(w.viewport),z.copy(w.scissor),Q=w.scissorTest}else k.copy(K).multiplyScalar(De).floor(),z.copy(ne).multiplyScalar(De).floor(),Q=re;if(W!==0&&(G=Cu),be.bindFramebuffer(I.FRAMEBUFFER,G)&&be.drawBuffers(w,G),be.viewport(k),be.scissor(z),be.setScissorTest(Q),V){const ue=y.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,ue.__webglTexture,W)}else if(he){const ue=N;for(let Se=0;Se<w.textures.length;Se++){const Ee=y.get(w.textures[Se]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,W,ue)}}else if(w!==null&&W!==0){const ue=y.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ue.__webglTexture,W)}B=-1},this.readRenderTargetPixels=function(w,N,W,G,V,he,me,ue=0){if(!(w&&w.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){be.bindFramebuffer(I.FRAMEBUFFER,Se);try{const Ee=w.textures[ue],Ue=Ee.format,He=Ee.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!lt.textureFormatReadable(Ue)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!lt.textureTypeReadable(He)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-G&&W>=0&&W<=w.height-V&&I.readPixels(N,W,G,V,se.convert(Ue),se.convert(He),he)}finally{const Ee=O!==null?y.get(O).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(w,N,W,G,V,he,me,ue=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se)if(N>=0&&N<=w.width-G&&W>=0&&W<=w.height-V){be.bindFramebuffer(I.FRAMEBUFFER,Se);const Ee=w.textures[ue],Ue=Ee.format,He=Ee.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ue),!lt.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!lt.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,he.byteLength,I.STREAM_READ),I.readPixels(N,W,G,V,se.convert(Ue),se.convert(He),0);const it=O!==null?y.get(O).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,it);const xt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await vd(I,xt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,he),I.deleteBuffer(Re),I.deleteSync(xt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,W=0){const G=Math.pow(2,-W),V=Math.floor(w.image.width*G),he=Math.floor(w.image.height*G),me=N!==null?N.x:0,ue=N!==null?N.y:0;D.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,me,ue,V,he),be.unbindTexture()};const Pu=I.createFramebuffer(),Iu=I.createFramebuffer();this.copyTextureToTexture=function(w,N,W=null,G=null,V=0,he=0){let me,ue,Se,Ee,Ue,He,Re,it,xt;const _t=w.isCompressedTexture?w.mipmaps[he]:w.image;if(W!==null)me=W.max.x-W.min.x,ue=W.max.y-W.min.y,Se=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,Ue=W.min.y,He=W.isBox3?W.min.z:0;else{const Ot=Math.pow(2,-V);me=Math.floor(_t.width*Ot),ue=Math.floor(_t.height*Ot),w.isDataArrayTexture?Se=_t.depth:w.isData3DTexture?Se=Math.floor(_t.depth*Ot):Se=1,Ee=0,Ue=0,He=0}G!==null?(Re=G.x,it=G.y,xt=G.z):(Re=0,it=0,xt=0);const st=se.convert(N.format),kt=se.convert(N.type);let we;N.isData3DTexture?(D.setTexture3D(N,0),we=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(D.setTexture2DArray(N,0),we=I.TEXTURE_2D_ARRAY):(D.setTexture2D(N,0),we=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const Zt=I.getParameter(I.UNPACK_ROW_LENGTH),Ke=I.getParameter(I.UNPACK_IMAGE_HEIGHT),hn=I.getParameter(I.UNPACK_SKIP_PIXELS),_n=I.getParameter(I.UNPACK_SKIP_ROWS),ri=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,_t.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_t.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ee),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),I.pixelStorei(I.UNPACK_SKIP_IMAGES,He);const Si=w.isDataArrayTexture||w.isData3DTexture,at=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){const Ot=y.get(w),Yn=y.get(N),Nt=y.get(Ot.__renderTarget),Kn=y.get(Yn.__renderTarget);be.bindFramebuffer(I.READ_FRAMEBUFFER,Nt.__webglFramebuffer),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let bi=0;bi<Se;bi++)Si&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(w).__webglTexture,V,He+bi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(N).__webglTexture,he,xt+bi)),I.blitFramebuffer(Ee,Ue,me,ue,Re,it,me,ue,I.DEPTH_BUFFER_BIT,I.NEAREST);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(V!==0||w.isRenderTargetTexture||y.has(w)){const Ot=y.get(w),Yn=y.get(N);be.bindFramebuffer(I.READ_FRAMEBUFFER,Pu),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,Iu);for(let Nt=0;Nt<Se;Nt++)Si?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ot.__webglTexture,V,He+Nt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ot.__webglTexture,V),at?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Yn.__webglTexture,he,xt+Nt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Yn.__webglTexture,he),V!==0?I.blitFramebuffer(Ee,Ue,me,ue,Re,it,me,ue,I.COLOR_BUFFER_BIT,I.NEAREST):at?I.copyTexSubImage3D(we,he,Re,it,xt+Nt,Ee,Ue,me,ue):I.copyTexSubImage2D(we,he,Re,it,Ee,Ue,me,ue);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else at?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(we,he,Re,it,xt,me,ue,Se,st,kt,_t.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(we,he,Re,it,xt,me,ue,Se,st,_t.data):I.texSubImage3D(we,he,Re,it,xt,me,ue,Se,st,kt,_t):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,he,Re,it,me,ue,st,kt,_t.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,he,Re,it,_t.width,_t.height,st,_t.data):I.texSubImage2D(I.TEXTURE_2D,he,Re,it,me,ue,st,kt,_t);I.pixelStorei(I.UNPACK_ROW_LENGTH,Zt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ke),I.pixelStorei(I.UNPACK_SKIP_PIXELS,hn),I.pixelStorei(I.UNPACK_SKIP_ROWS,_n),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ri),he===0&&N.generateMipmaps&&I.generateMipmap(we),be.unbindTexture()},this.initRenderTarget=function(w){y.get(w).__webglFramebuffer===void 0&&D.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?D.setTextureCube(w,0):w.isData3DTexture?D.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?D.setTexture2DArray(w,0):D.setTexture2D(w,0),be.unbindTexture()},this.resetState=function(){P=0,F=0,O=null,be.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class bv{constructor(){this.items=[],this.elapsed=0,this.delta=0,this.last=performance.now()}add(e,t,n){this.items.push({name:e,priority:t,fn:n}),this.items.sort((i,s)=>i.priority-s.priority)}tick(e=performance.now()){const t=(e-this.last)/1e3;this.last=e,this.delta=Math.min(t,.05),this.elapsed+=this.delta;for(const n of this.items)n.fn(this.delta,this.elapsed)}}const ph={KeyW:"forward",ArrowUp:"forward",KeyS:"backward",ArrowDown:"backward",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",ShiftLeft:"boost",ShiftRight:"boost",ControlLeft:"brake",ControlRight:"brake",KeyB:"brake",Space:"jump",KeyE:"interact",Enter:"interact",KeyR:"respawn",KeyM:"map",Escape:"menu",KeyH:"honk",KeyP:"potato"};class wv{constructor(e){this.canvas=e,this.actions={forward:!1,backward:!1,left:!1,right:!1,boost:!1,handbrake:!1,brake:!1,jump:!1,interact:!1,respawn:!1,map:!1,menu:!1,honk:!1,potato:!1},this.pressed=new Set,this.pointer={dragging:!1,lastX:0,lastY:0,orbitX:0,orbitY:0,zoom:1},this.joystick={x:0,y:0},this.mode="keyboard",this.enabled=!0,this.setupKeyboard(),this.setupPointer(),this.setupTouch()}setupKeyboard(){window.addEventListener("keydown",e=>{const t=ph[e.code];t&&(e.preventDefault(),e.stopPropagation(),this.actions[t]||this.pressed.add(t),this.actions[t]=!0,this.mode="keyboard")}),window.addEventListener("keyup",e=>{const t=ph[e.code];t&&(e.preventDefault(),e.stopPropagation(),this.actions[t]=!1)})}setupPointer(){this.canvas.addEventListener("pointerdown",t=>{this.pointer.dragging=!0,this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.canvas.setPointerCapture(t.pointerId)}),this.canvas.addEventListener("pointermove",t=>{if(!this.pointer.dragging)return;const n=t.clientX-this.pointer.lastX,i=t.clientY-this.pointer.lastY;this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.pointer.orbitX+=n*.006,this.pointer.orbitY=Math.max(-.52,Math.min(.42,this.pointer.orbitY+i*.004)),this.mode=t.pointerType==="touch"?"touch":"pointer"});const e=t=>{this.pointer.dragging=!1,this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)};this.canvas.addEventListener("pointerup",e),this.canvas.addEventListener("pointercancel",e),window.addEventListener("wheel",t=>{this.pointer.zoom=Math.max(.7,Math.min(1.55,this.pointer.zoom+Math.sign(t.deltaY)*.08))},{passive:!0})}setupTouch(){const e=document.getElementById("touch-stick"),t=document.getElementById("touch-knob"),n=document.getElementById("touch-boost"),i=document.getElementById("touch-jump"),s=document.getElementById("touch-action");if(!e||!t||!n||!i||!s)return;let o=null,l={x:0,y:0};const h=(a,c)=>{const d=a-l.x,p=c-l.y,_=54,g=Math.max(1,Math.hypot(d,p)),m=Math.min(1,_/g),v=d*m,M=p*m;this.joystick.x=v/_,this.joystick.y=M/_,t.style.transform=`translate(calc(-50% + ${v}px), calc(-50% + ${M}px))`,this.mode="touch"};e.addEventListener("pointerdown",a=>{a.preventDefault(),o=a.pointerId,e.setPointerCapture(o);const c=e.getBoundingClientRect();l={x:c.left+c.width/2,y:c.top+c.height/2},h(a.clientX,a.clientY)}),e.addEventListener("pointermove",a=>{a.pointerId===o&&(a.preventDefault(),h(a.clientX,a.clientY))});const u=a=>{a.pointerId===o&&(o=null,this.joystick.x=0,this.joystick.y=0,t.style.transform="translate(-50%, -50%)")};e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u);const f=(a,c)=>{a.addEventListener("pointerdown",p=>{p.preventDefault(),this.actions[c]=!0,this.pressed.add(c),this.mode="touch"});const d=()=>{this.actions[c]=!1};a.addEventListener("pointerup",d),a.addEventListener("pointercancel",d),a.addEventListener("pointerleave",d)};f(n,"boost"),f(i,"jump"),s.addEventListener("click",()=>{this.pressed.add("interact"),this.actions.interact=!0,requestAnimationFrame(()=>{this.actions.interact=!1})})}updateGamepad(){const e=navigator.getGamepads?.()[0];if(!e)return;const t=Math.abs(e.axes[0])>.15?e.axes[0]:0,n=Math.abs(e.axes[1])>.15?e.axes[1]:0;this.joystick.x=t,this.joystick.y=n,this.actions.forward=n<-.25||e.buttons[7]?.pressed,this.actions.backward=n>.25||e.buttons[6]?.pressed,this.actions.left=t<-.25,this.actions.right=t>.25,this.actions.boost=!!e.buttons[1]?.pressed,this.actions.handbrake=!!e.buttons[5]?.pressed,this.actions.jump=!!e.buttons[3]?.pressed,this.actions.brake=!!e.buttons[2]?.pressed,e.buttons[0]?.pressed&&this.pressed.add("interact"),e.buttons[9]?.pressed&&this.pressed.add("menu"),e.buttons[8]?.pressed&&this.pressed.add("respawn"),e.buttons[4]?.pressed&&this.pressed.add("potato"),this.mode="gamepad"}update(){this.updateGamepad()}consume(e){const t=this.pressed.has(e);return this.pressed.delete(e),t}clearTransient(){this.pressed.clear()}}var vs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Wo={};var mh;function Tv(){return mh||(mh=1,(function(r){(function(){var e=function(){this.init()};e.prototype={init:function(){var a=this||t;return a._counter=1e3,a._html5AudioPool=[],a.html5PoolSize=10,a._codecs={},a._howls=[],a._muted=!1,a._volume=1,a._canPlayEvent="canplaythrough",a._navigator=typeof window<"u"&&window.navigator?window.navigator:null,a.masterGain=null,a.noAudio=!1,a.usingWebAudio=!0,a.autoSuspend=!0,a.ctx=null,a.autoUnlock=!0,a._setup(),a},volume:function(a){var c=this||t;if(a=parseFloat(a),c.ctx||f(),typeof a<"u"&&a>=0&&a<=1){if(c._volume=a,c._muted)return c;c.usingWebAudio&&c.masterGain.gain.setValueAtTime(a,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var p=c._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=c._howls[d]._soundById(p[_]);g&&g._node&&(g._node.volume=g._volume*a)}return c}return c._volume},mute:function(a){var c=this||t;c.ctx||f(),c._muted=a,c.usingWebAudio&&c.masterGain.gain.setValueAtTime(a?0:c._volume,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var p=c._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=c._howls[d]._soundById(p[_]);g&&g._node&&(g._node.muted=a?!0:g._muted)}return c},stop:function(){for(var a=this||t,c=0;c<a._howls.length;c++)a._howls[c].stop();return a},unload:function(){for(var a=this||t,c=a._howls.length-1;c>=0;c--)a._howls[c].unload();return a.usingWebAudio&&a.ctx&&typeof a.ctx.close<"u"&&(a.ctx.close(),a.ctx=null,f()),a},codecs:function(a){return(this||t)._codecs[a.replace(/^x-/,"")]},_setup:function(){var a=this||t;if(a.state=a.ctx&&a.ctx.state||"suspended",a._autoSuspend(),!a.usingWebAudio)if(typeof Audio<"u")try{var c=new Audio;typeof c.oncanplaythrough>"u"&&(a._canPlayEvent="canplay")}catch{a.noAudio=!0}else a.noAudio=!0;try{var c=new Audio;c.muted&&(a.noAudio=!0)}catch{}return a.noAudio||a._setupCodecs(),a},_setupCodecs:function(){var a=this||t,c=null;try{c=typeof Audio<"u"?new Audio:null}catch{return a}if(!c||typeof c.canPlayType!="function")return a;var d=c.canPlayType("audio/mpeg;").replace(/^no$/,""),p=a._navigator?a._navigator.userAgent:"",_=p.match(/OPR\/(\d+)/g),g=_&&parseInt(_[0].split("/")[1],10)<33,m=p.indexOf("Safari")!==-1&&p.indexOf("Chrome")===-1,v=p.match(/Version\/(.*?) /),M=m&&v&&parseInt(v[1],10)<15;return a._codecs={mp3:!!(!g&&(d||c.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(c.canPlayType('audio/wav; codecs="1"')||c.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!c.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!c.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(c.canPlayType("audio/x-m4a;")||c.canPlayType("audio/m4a;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(c.canPlayType("audio/x-m4b;")||c.canPlayType("audio/m4b;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(c.canPlayType("audio/x-mp4;")||c.canPlayType("audio/mp4;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!M&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!M&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(c.canPlayType("audio/x-flac;")||c.canPlayType("audio/flac;")).replace(/^no$/,"")},a},_unlockAudio:function(){var a=this||t;if(!(a._audioUnlocked||!a.ctx)){a._audioUnlocked=!1,a.autoUnlock=!1,!a._mobileUnloaded&&a.ctx.sampleRate!==44100&&(a._mobileUnloaded=!0,a.unload()),a._scratchBuffer=a.ctx.createBuffer(1,1,22050);var c=function(d){for(;a._html5AudioPool.length<a.html5PoolSize;)try{var p=new Audio;p._unlocked=!0,a._releaseHtml5Audio(p)}catch{a.noAudio=!0;break}for(var _=0;_<a._howls.length;_++)if(!a._howls[_]._webAudio)for(var g=a._howls[_]._getSoundIds(),m=0;m<g.length;m++){var v=a._howls[_]._soundById(g[m]);v&&v._node&&!v._node._unlocked&&(v._node._unlocked=!0,v._node.load())}a._autoResume();var M=a.ctx.createBufferSource();M.buffer=a._scratchBuffer,M.connect(a.ctx.destination),typeof M.start>"u"?M.noteOn(0):M.start(0),typeof a.ctx.resume=="function"&&a.ctx.resume(),M.onended=function(){M.disconnect(0),a._audioUnlocked=!0,document.removeEventListener("touchstart",c,!0),document.removeEventListener("touchend",c,!0),document.removeEventListener("click",c,!0),document.removeEventListener("keydown",c,!0);for(var S=0;S<a._howls.length;S++)a._howls[S]._emit("unlock")}};return document.addEventListener("touchstart",c,!0),document.addEventListener("touchend",c,!0),document.addEventListener("click",c,!0),document.addEventListener("keydown",c,!0),a}},_obtainHtml5Audio:function(){var a=this||t;if(a._html5AudioPool.length)return a._html5AudioPool.pop();var c=new Audio().play();return c&&typeof Promise<"u"&&(c instanceof Promise||typeof c.then=="function")&&c.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(a){var c=this||t;return a._unlocked&&c._html5AudioPool.push(a),c},_autoSuspend:function(){var a=this;if(!(!a.autoSuspend||!a.ctx||typeof a.ctx.suspend>"u"||!t.usingWebAudio)){for(var c=0;c<a._howls.length;c++)if(a._howls[c]._webAudio){for(var d=0;d<a._howls[c]._sounds.length;d++)if(!a._howls[c]._sounds[d]._paused)return a}return a._suspendTimer&&clearTimeout(a._suspendTimer),a._suspendTimer=setTimeout(function(){if(a.autoSuspend){a._suspendTimer=null,a.state="suspending";var p=function(){a.state="suspended",a._resumeAfterSuspend&&(delete a._resumeAfterSuspend,a._autoResume())};a.ctx.suspend().then(p,p)}},3e4),a}},_autoResume:function(){var a=this;if(!(!a.ctx||typeof a.ctx.resume>"u"||!t.usingWebAudio))return a.state==="running"&&a.ctx.state!=="interrupted"&&a._suspendTimer?(clearTimeout(a._suspendTimer),a._suspendTimer=null):a.state==="suspended"||a.state==="running"&&a.ctx.state==="interrupted"?(a.ctx.resume().then(function(){a.state="running";for(var c=0;c<a._howls.length;c++)a._howls[c]._emit("resume")}),a._suspendTimer&&(clearTimeout(a._suspendTimer),a._suspendTimer=null)):a.state==="suspending"&&(a._resumeAfterSuspend=!0),a}};var t=new e,n=function(a){var c=this;if(!a.src||a.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}c.init(a)};n.prototype={init:function(a){var c=this;return t.ctx||f(),c._autoplay=a.autoplay||!1,c._format=typeof a.format!="string"?a.format:[a.format],c._html5=a.html5||!1,c._muted=a.mute||!1,c._loop=a.loop||!1,c._pool=a.pool||5,c._preload=typeof a.preload=="boolean"||a.preload==="metadata"?a.preload:!0,c._rate=a.rate||1,c._sprite=a.sprite||{},c._src=typeof a.src!="string"?a.src:[a.src],c._volume=a.volume!==void 0?a.volume:1,c._xhr={method:a.xhr&&a.xhr.method?a.xhr.method:"GET",headers:a.xhr&&a.xhr.headers?a.xhr.headers:null,withCredentials:a.xhr&&a.xhr.withCredentials?a.xhr.withCredentials:!1},c._duration=0,c._state="unloaded",c._sounds=[],c._endTimers={},c._queue=[],c._playLock=!1,c._onend=a.onend?[{fn:a.onend}]:[],c._onfade=a.onfade?[{fn:a.onfade}]:[],c._onload=a.onload?[{fn:a.onload}]:[],c._onloaderror=a.onloaderror?[{fn:a.onloaderror}]:[],c._onplayerror=a.onplayerror?[{fn:a.onplayerror}]:[],c._onpause=a.onpause?[{fn:a.onpause}]:[],c._onplay=a.onplay?[{fn:a.onplay}]:[],c._onstop=a.onstop?[{fn:a.onstop}]:[],c._onmute=a.onmute?[{fn:a.onmute}]:[],c._onvolume=a.onvolume?[{fn:a.onvolume}]:[],c._onrate=a.onrate?[{fn:a.onrate}]:[],c._onseek=a.onseek?[{fn:a.onseek}]:[],c._onunlock=a.onunlock?[{fn:a.onunlock}]:[],c._onresume=[],c._webAudio=t.usingWebAudio&&!c._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(c),c._autoplay&&c._queue.push({event:"play",action:function(){c.play()}}),c._preload&&c._preload!=="none"&&c.load(),c},load:function(){var a=this,c=null;if(t.noAudio){a._emit("loaderror",null,"No audio support.");return}typeof a._src=="string"&&(a._src=[a._src]);for(var d=0;d<a._src.length;d++){var p,_;if(a._format&&a._format[d])p=a._format[d];else{if(_=a._src[d],typeof _!="string"){a._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}p=/^data:audio\/([^;,]+);/i.exec(_),p||(p=/\.([^.]+)$/.exec(_.split("?",1)[0])),p&&(p=p[1].toLowerCase())}if(p||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),p&&t.codecs(p)){c=a._src[d];break}}if(!c){a._emit("loaderror",null,"No codec support for selected audio sources.");return}return a._src=c,a._state="loading",window.location.protocol==="https:"&&c.slice(0,5)==="http:"&&(a._html5=!0,a._webAudio=!1),new i(a),a._webAudio&&o(a),a},play:function(a,c){var d=this,p=null;if(typeof a=="number")p=a,a=null;else{if(typeof a=="string"&&d._state==="loaded"&&!d._sprite[a])return null;if(typeof a>"u"&&(a="__default",!d._playLock)){for(var _=0,g=0;g<d._sounds.length;g++)d._sounds[g]._paused&&!d._sounds[g]._ended&&(_++,p=d._sounds[g]._id);_===1?a=null:p=null}}var m=p?d._soundById(p):d._inactiveSound();if(!m)return null;if(p&&!a&&(a=m._sprite||"__default"),d._state!=="loaded"){m._sprite=a,m._ended=!1;var v=m._id;return d._queue.push({event:"play",action:function(){d.play(v)}}),v}if(p&&!m._paused)return c||d._loadQueue("play"),m._id;d._webAudio&&t._autoResume();var M=Math.max(0,m._seek>0?m._seek:d._sprite[a][0]/1e3),S=Math.max(0,(d._sprite[a][0]+d._sprite[a][1])/1e3-M),E=S*1e3/Math.abs(m._rate),T=d._sprite[a][0]/1e3,C=(d._sprite[a][0]+d._sprite[a][1])/1e3;m._sprite=a,m._ended=!1;var x=function(){m._paused=!1,m._seek=M,m._start=T,m._stop=C,m._loop=!!(m._loop||d._sprite[a][2])};if(M>=C){d._ended(m);return}var b=m._node;if(d._webAudio){var U=function(){d._playLock=!1,x(),d._refreshBuffer(m);var B=m._muted||d._muted?0:m._volume;b.gain.setValueAtTime(B,t.ctx.currentTime),m._playStart=t.ctx.currentTime,typeof b.bufferSource.start>"u"?m._loop?b.bufferSource.noteGrainOn(0,M,86400):b.bufferSource.noteGrainOn(0,M,S):m._loop?b.bufferSource.start(0,M,86400):b.bufferSource.start(0,M,S),E!==1/0&&(d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),E)),c||setTimeout(function(){d._emit("play",m._id),d._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?U():(d._playLock=!0,d.once("resume",U),d._clearTimer(m._id))}else{var P=function(){b.currentTime=M,b.muted=m._muted||d._muted||t._muted||b.muted,b.volume=m._volume*t.volume(),b.playbackRate=m._rate;try{var B=b.play();if(B&&typeof Promise<"u"&&(B instanceof Promise||typeof B.then=="function")?(d._playLock=!0,x(),B.then(function(){d._playLock=!1,b._unlocked=!0,c?d._loadQueue():d._emit("play",m._id)}).catch(function(){d._playLock=!1,d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):c||(d._playLock=!1,x(),d._emit("play",m._id)),b.playbackRate=m._rate,b.paused){d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}a!=="__default"||m._loop?d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),E):(d._endTimers[m._id]=function(){d._ended(m),b.removeEventListener("ended",d._endTimers[m._id],!1)},b.addEventListener("ended",d._endTimers[m._id],!1))}catch(H){d._emit("playerror",m._id,H)}};b.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(b.src=d._src,b.load());var F=window&&window.ejecta||!b.readyState&&t._navigator.isCocoonJS;if(b.readyState>=3||F)P();else{d._playLock=!0,d._state="loading";var O=function(){d._state="loaded",P(),b.removeEventListener(t._canPlayEvent,O,!1)};b.addEventListener(t._canPlayEvent,O,!1),d._clearTimer(m._id)}}return m._id},pause:function(a){var c=this;if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"pause",action:function(){c.pause(a)}}),c;for(var d=c._getSoundIds(a),p=0;p<d.length;p++){c._clearTimer(d[p]);var _=c._soundById(d[p]);if(_&&!_._paused&&(_._seek=c.seek(d[p]),_._rateSeek=0,_._paused=!0,c._stopFade(d[p]),_._node))if(c._webAudio){if(!_._node.bufferSource)continue;typeof _._node.bufferSource.stop>"u"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),c._cleanBuffer(_._node)}else(!isNaN(_._node.duration)||_._node.duration===1/0)&&_._node.pause();arguments[1]||c._emit("pause",_?_._id:null)}return c},stop:function(a,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(a)}}),d;for(var p=d._getSoundIds(a),_=0;_<p.length;_++){d._clearTimer(p[_]);var g=d._soundById(p[_]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,d._stopFade(p[_]),g._node&&(d._webAudio?g._node.bufferSource&&(typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),d._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&d._clearSound(g._node))),c||d._emit("stop",g._id))}return d},mute:function(a,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(a,c)}}),d;if(typeof c>"u")if(typeof a=="boolean")d._muted=a;else return d._muted;for(var p=d._getSoundIds(c),_=0;_<p.length;_++){var g=d._soundById(p[_]);g&&(g._muted=a,g._interval&&d._stopFade(g._id),d._webAudio&&g._node?g._node.gain.setValueAtTime(a?0:g._volume,t.ctx.currentTime):g._node&&(g._node.muted=t._muted?!0:a),d._emit("mute",g._id))}return d},volume:function(){var a=this,c=arguments,d,p;if(c.length===0)return a._volume;if(c.length===1||c.length===2&&typeof c[1]>"u"){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):d=parseFloat(c[0])}else c.length>=2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));var m;if(typeof d<"u"&&d>=0&&d<=1){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"volume",action:function(){a.volume.apply(a,c)}}),a;typeof p>"u"&&(a._volume=d),p=a._getSoundIds(p);for(var v=0;v<p.length;v++)m=a._soundById(p[v]),m&&(m._volume=d,c[2]||a._stopFade(p[v]),a._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(d,t.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=d*t.volume()),a._emit("volume",m._id))}else return m=p?a._soundById(p):a._sounds[0],m?m._volume:0;return a},fade:function(a,c,d,p){var _=this;if(_._state!=="loaded"||_._playLock)return _._queue.push({event:"fade",action:function(){_.fade(a,c,d,p)}}),_;a=Math.min(Math.max(0,parseFloat(a)),1),c=Math.min(Math.max(0,parseFloat(c)),1),d=parseFloat(d),_.volume(a,p);for(var g=_._getSoundIds(p),m=0;m<g.length;m++){var v=_._soundById(g[m]);if(v){if(p||_._stopFade(g[m]),_._webAudio&&!v._muted){var M=t.ctx.currentTime,S=M+d/1e3;v._volume=a,v._node.gain.setValueAtTime(a,M),v._node.gain.linearRampToValueAtTime(c,S)}_._startFadeInterval(v,a,c,d,g[m],typeof p>"u")}}return _},_startFadeInterval:function(a,c,d,p,_,g){var m=this,v=c,M=d-c,S=Math.abs(M/.01),E=Math.max(4,S>0?p/S:p),T=Date.now();a._fadeTo=d,a._interval=setInterval(function(){var C=(Date.now()-T)/p;T=Date.now(),v+=M*C,v=Math.round(v*100)/100,M<0?v=Math.max(d,v):v=Math.min(d,v),m._webAudio?a._volume=v:m.volume(v,a._id,!0),g&&(m._volume=v),(d<c&&v<=d||d>c&&v>=d)&&(clearInterval(a._interval),a._interval=null,a._fadeTo=null,m.volume(d,a._id),m._emit("fade",a._id))},E)},_stopFade:function(a){var c=this,d=c._soundById(a);return d&&d._interval&&(c._webAudio&&d._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(d._interval),d._interval=null,c.volume(d._fadeTo,a),d._fadeTo=null,c._emit("fade",a)),c},loop:function(){var a=this,c=arguments,d,p,_;if(c.length===0)return a._loop;if(c.length===1)if(typeof c[0]=="boolean")d=c[0],a._loop=d;else return _=a._soundById(parseInt(c[0],10)),_?_._loop:!1;else c.length===2&&(d=c[0],p=parseInt(c[1],10));for(var g=a._getSoundIds(p),m=0;m<g.length;m++)_=a._soundById(g[m]),_&&(_._loop=d,a._webAudio&&_._node&&_._node.bufferSource&&(_._node.bufferSource.loop=d,d&&(_._node.bufferSource.loopStart=_._start||0,_._node.bufferSource.loopEnd=_._stop,a.playing(g[m])&&(a.pause(g[m],!0),a.play(g[m],!0)))));return a},rate:function(){var a=this,c=arguments,d,p;if(c.length===0)p=a._sounds[0]._id;else if(c.length===1){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):d=parseFloat(c[0])}else c.length===2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));var m;if(typeof d=="number"){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"rate",action:function(){a.rate.apply(a,c)}}),a;typeof p>"u"&&(a._rate=d),p=a._getSoundIds(p);for(var v=0;v<p.length;v++)if(m=a._soundById(p[v]),m){a.playing(p[v])&&(m._rateSeek=a.seek(p[v]),m._playStart=a._webAudio?t.ctx.currentTime:m._playStart),m._rate=d,a._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(d,t.ctx.currentTime):m._node&&(m._node.playbackRate=d);var M=a.seek(p[v]),S=(a._sprite[m._sprite][0]+a._sprite[m._sprite][1])/1e3-M,E=S*1e3/Math.abs(m._rate);(a._endTimers[p[v]]||!m._paused)&&(a._clearTimer(p[v]),a._endTimers[p[v]]=setTimeout(a._ended.bind(a,m),E)),a._emit("rate",m._id)}}else return m=a._soundById(p),m?m._rate:a._rate;return a},seek:function(){var a=this,c=arguments,d,p;if(c.length===0)a._sounds.length&&(p=a._sounds[0]._id);else if(c.length===1){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):a._sounds.length&&(p=a._sounds[0]._id,d=parseFloat(c[0]))}else c.length===2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));if(typeof p>"u")return 0;if(typeof d=="number"&&(a._state!=="loaded"||a._playLock))return a._queue.push({event:"seek",action:function(){a.seek.apply(a,c)}}),a;var m=a._soundById(p);if(m)if(typeof d=="number"&&d>=0){var v=a.playing(p);v&&a.pause(p,!0),m._seek=d,m._ended=!1,a._clearTimer(p),!a._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=d);var M=function(){v&&a.play(p,!0),a._emit("seek",p)};if(v&&!a._webAudio){var S=function(){a._playLock?setTimeout(S,0):M()};setTimeout(S,0)}else M()}else if(a._webAudio){var E=a.playing(p)?t.ctx.currentTime-m._playStart:0,T=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(T+E*Math.abs(m._rate))}else return m._node.currentTime;return a},playing:function(a){var c=this;if(typeof a=="number"){var d=c._soundById(a);return d?!d._paused:!1}for(var p=0;p<c._sounds.length;p++)if(!c._sounds[p]._paused)return!0;return!1},duration:function(a){var c=this,d=c._duration,p=c._soundById(a);return p&&(d=c._sprite[p._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var a=this,c=a._sounds,d=0;d<c.length;d++)c[d]._paused||a.stop(c[d]._id),a._webAudio||(a._clearSound(c[d]._node),c[d]._node.removeEventListener("error",c[d]._errorFn,!1),c[d]._node.removeEventListener(t._canPlayEvent,c[d]._loadFn,!1),c[d]._node.removeEventListener("ended",c[d]._endFn,!1),t._releaseHtml5Audio(c[d]._node)),delete c[d]._node,a._clearTimer(c[d]._id);var p=t._howls.indexOf(a);p>=0&&t._howls.splice(p,1);var _=!0;for(d=0;d<t._howls.length;d++)if(t._howls[d]._src===a._src||a._src.indexOf(t._howls[d]._src)>=0){_=!1;break}return s&&_&&delete s[a._src],t.noAudio=!1,a._state="unloaded",a._sounds=[],a=null,null},on:function(a,c,d,p){var _=this,g=_["_on"+a];return typeof c=="function"&&g.push(p?{id:d,fn:c,once:p}:{id:d,fn:c}),_},off:function(a,c,d){var p=this,_=p["_on"+a],g=0;if(typeof c=="number"&&(d=c,c=null),c||d)for(g=0;g<_.length;g++){var m=d===_[g].id;if(c===_[g].fn&&m||!c&&m){_.splice(g,1);break}}else if(a)p["_on"+a]=[];else{var v=Object.keys(p);for(g=0;g<v.length;g++)v[g].indexOf("_on")===0&&Array.isArray(p[v[g]])&&(p[v[g]]=[])}return p},once:function(a,c,d){var p=this;return p.on(a,c,d,1),p},_emit:function(a,c,d){for(var p=this,_=p["_on"+a],g=_.length-1;g>=0;g--)(!_[g].id||_[g].id===c||a==="load")&&(setTimeout((function(m){m.call(this,c,d)}).bind(p,_[g].fn),0),_[g].once&&p.off(a,_[g].fn,_[g].id));return p._loadQueue(a),p},_loadQueue:function(a){var c=this;if(c._queue.length>0){var d=c._queue[0];d.event===a&&(c._queue.shift(),c._loadQueue()),a||d.action()}return c},_ended:function(a){var c=this,d=a._sprite;if(!c._webAudio&&a._node&&!a._node.paused&&!a._node.ended&&a._node.currentTime<a._stop)return setTimeout(c._ended.bind(c,a),100),c;var p=!!(a._loop||c._sprite[d][2]);if(c._emit("end",a._id),!c._webAudio&&p&&c.stop(a._id,!0).play(a._id),c._webAudio&&p){c._emit("play",a._id),a._seek=a._start||0,a._rateSeek=0,a._playStart=t.ctx.currentTime;var _=(a._stop-a._start)*1e3/Math.abs(a._rate);c._endTimers[a._id]=setTimeout(c._ended.bind(c,a),_)}return c._webAudio&&!p&&(a._paused=!0,a._ended=!0,a._seek=a._start||0,a._rateSeek=0,c._clearTimer(a._id),c._cleanBuffer(a._node),t._autoSuspend()),!c._webAudio&&!p&&c.stop(a._id,!0),c},_clearTimer:function(a){var c=this;if(c._endTimers[a]){if(typeof c._endTimers[a]!="function")clearTimeout(c._endTimers[a]);else{var d=c._soundById(a);d&&d._node&&d._node.removeEventListener("ended",c._endTimers[a],!1)}delete c._endTimers[a]}return c},_soundById:function(a){for(var c=this,d=0;d<c._sounds.length;d++)if(a===c._sounds[d]._id)return c._sounds[d];return null},_inactiveSound:function(){var a=this;a._drain();for(var c=0;c<a._sounds.length;c++)if(a._sounds[c]._ended)return a._sounds[c].reset();return new i(a)},_drain:function(){var a=this,c=a._pool,d=0,p=0;if(!(a._sounds.length<c)){for(p=0;p<a._sounds.length;p++)a._sounds[p]._ended&&d++;for(p=a._sounds.length-1;p>=0;p--){if(d<=c)return;a._sounds[p]._ended&&(a._webAudio&&a._sounds[p]._node&&a._sounds[p]._node.disconnect(0),a._sounds.splice(p,1),d--)}}},_getSoundIds:function(a){var c=this;if(typeof a>"u"){for(var d=[],p=0;p<c._sounds.length;p++)d.push(c._sounds[p]._id);return d}else return[a]},_refreshBuffer:function(a){var c=this;return a._node.bufferSource=t.ctx.createBufferSource(),a._node.bufferSource.buffer=s[c._src],a._panner?a._node.bufferSource.connect(a._panner):a._node.bufferSource.connect(a._node),a._node.bufferSource.loop=a._loop,a._loop&&(a._node.bufferSource.loopStart=a._start||0,a._node.bufferSource.loopEnd=a._stop||0),a._node.bufferSource.playbackRate.setValueAtTime(a._rate,t.ctx.currentTime),c},_cleanBuffer:function(a){var c=this,d=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!a.bufferSource)return c;if(t._scratchBuffer&&a.bufferSource&&(a.bufferSource.onended=null,a.bufferSource.disconnect(0),d))try{a.bufferSource.buffer=t._scratchBuffer}catch{}return a.bufferSource=null,c},_clearSound:function(a){var c=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);c||(a.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(a){this._parent=a,this.init()};i.prototype={init:function(){var a=this,c=a._parent;return a._muted=c._muted,a._loop=c._loop,a._volume=c._volume,a._rate=c._rate,a._seek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,c._sounds.push(a),a.create(),a},create:function(){var a=this,c=a._parent,d=t._muted||a._muted||a._parent._muted?0:a._volume;return c._webAudio?(a._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),a._node.gain.setValueAtTime(d,t.ctx.currentTime),a._node.paused=!0,a._node.connect(t.masterGain)):t.noAudio||(a._node=t._obtainHtml5Audio(),a._errorFn=a._errorListener.bind(a),a._node.addEventListener("error",a._errorFn,!1),a._loadFn=a._loadListener.bind(a),a._node.addEventListener(t._canPlayEvent,a._loadFn,!1),a._endFn=a._endListener.bind(a),a._node.addEventListener("ended",a._endFn,!1),a._node.src=c._src,a._node.preload=c._preload===!0?"auto":c._preload,a._node.volume=d*t.volume(),a._node.load()),a},reset:function(){var a=this,c=a._parent;return a._muted=c._muted,a._loop=c._loop,a._volume=c._volume,a._rate=c._rate,a._seek=0,a._rateSeek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,a},_errorListener:function(){var a=this;a._parent._emit("loaderror",a._id,a._node.error?a._node.error.code:0),a._node.removeEventListener("error",a._errorFn,!1)},_loadListener:function(){var a=this,c=a._parent;c._duration=Math.ceil(a._node.duration*10)/10,Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue()),a._node.removeEventListener(t._canPlayEvent,a._loadFn,!1)},_endListener:function(){var a=this,c=a._parent;c._duration===1/0&&(c._duration=Math.ceil(a._node.duration*10)/10,c._sprite.__default[1]===1/0&&(c._sprite.__default[1]=c._duration*1e3),c._ended(a)),a._node.removeEventListener("ended",a._endFn,!1)}};var s={},o=function(a){var c=a._src;if(s[c]){a._duration=s[c].duration,u(a);return}if(/^data:[^;]+;base64,/.test(c)){for(var d=atob(c.split(",")[1]),p=new Uint8Array(d.length),_=0;_<d.length;++_)p[_]=d.charCodeAt(_);h(p.buffer,a)}else{var g=new XMLHttpRequest;g.open(a._xhr.method,c,!0),g.withCredentials=a._xhr.withCredentials,g.responseType="arraybuffer",a._xhr.headers&&Object.keys(a._xhr.headers).forEach(function(m){g.setRequestHeader(m,a._xhr.headers[m])}),g.onload=function(){var m=(g.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){a._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}h(g.response,a)},g.onerror=function(){a._webAudio&&(a._html5=!0,a._webAudio=!1,a._sounds=[],delete s[c],a.load())},l(g)}},l=function(a){try{a.send()}catch{a.onerror()}},h=function(a,c){var d=function(){c._emit("loaderror",null,"Decoding audio data failed.")},p=function(_){_&&c._sounds.length>0?(s[c._src]=_,u(c,_)):d()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(a).then(p).catch(d):t.ctx.decodeAudioData(a,p,d)},u=function(a,c){c&&!a._duration&&(a._duration=c.duration),Object.keys(a._sprite).length===0&&(a._sprite={__default:[0,a._duration*1e3]}),a._state!=="loaded"&&(a._state="loaded",a._emit("load"),a._loadQueue())},f=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var a=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),c=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=c?parseInt(c[1],10):null;if(a&&d&&d<9){var p=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!p&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};r.Howler=t,r.Howl=n,typeof vs<"u"?(vs.HowlerGlobal=e,vs.Howler=t,vs.Howl=n,vs.Sound=i):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=n,window.Sound=i)})();(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(t);return n},HowlerGlobal.prototype.pos=function(t,n,i){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(n=typeof n!="number"?s._pos[1]:n,i=typeof i!="number"?s._pos[2]:i,typeof t=="number")s._pos=[t,n,i],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,n,i,s,o,l){var h=this;if(!h.ctx||!h.ctx.listener)return h;var u=h._orientation;if(n=typeof n!="number"?u[1]:n,i=typeof i!="number"?u[2]:i,s=typeof s!="number"?u[3]:s,o=typeof o!="number"?u[4]:o,l=typeof l!="number"?u[5]:l,typeof t=="number")h._orientation=[t,n,i,s,o,l],typeof h.ctx.listener.forwardX<"u"?(h.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),h.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),h.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),h.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),h.ctx.listener.upY.setTargetAtTime(o,Howler.ctx.currentTime,.1),h.ctx.listener.upZ.setTargetAtTime(l,Howler.ctx.currentTime,.1)):h.ctx.listener.setOrientation(t,n,i,s,o,l);else return u;return h},Howl.prototype.init=(function(t){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance<"u"?n.maxDistance:1e4,panningModel:typeof n.panningModel<"u"?n.panningModel:"HRTF",refDistance:typeof n.refDistance<"u"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],t.call(this,n)}})(Howl.prototype.init),Howl.prototype.stereo=function(t,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(t,n)}}),i;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof n>"u")if(typeof t=="number")i._stereo=t,i._pos=[t,0,0];else return i._stereo;for(var o=i._getSoundIds(n),l=0;l<o.length;l++){var h=i._soundById(o[l]);if(h)if(typeof t=="number")h._stereo=t,h._pos=[t,0,0],h._node&&(h._pannerAttr.panningModel="equalpower",(!h._panner||!h._panner.pan)&&e(h,s),s==="spatial"?typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):h._panner.setPosition(t,0,0):h._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),i._emit("stereo",h._id);else return h._stereo}return i},Howl.prototype.pos=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"pos",action:function(){o.pos(t,n,i,s)}}),o;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof s>"u")if(typeof t=="number")o._pos=[t,n,i];else return o._pos;for(var l=o._getSoundIds(s),h=0;h<l.length;h++){var u=o._soundById(l[h]);if(u)if(typeof t=="number")u._pos=[t,n,i],u._node&&((!u._panner||u._panner.pan)&&e(u,"spatial"),typeof u._panner.positionX<"u"?(u._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setPosition(t,n,i)),o._emit("pos",u._id);else return u._pos}return o},Howl.prototype.orientation=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"orientation",action:function(){o.orientation(t,n,i,s)}}),o;if(n=typeof n!="number"?o._orientation[1]:n,i=typeof i!="number"?o._orientation[2]:i,typeof s>"u")if(typeof t=="number")o._orientation=[t,n,i];else return o._orientation;for(var l=o._getSoundIds(s),h=0;h<l.length;h++){var u=o._soundById(l[h]);if(u)if(typeof t=="number")u._orientation=[t,n,i],u._node&&(u._panner||(u._pos||(u._pos=o._pos||[0,0,-.5]),e(u,"spatial")),typeof u._panner.orientationX<"u"?(u._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setOrientation(t,n,i)),o._emit("orientation",u._id);else return u._orientation}return o},Howl.prototype.pannerAttr=function(){var t=this,n=arguments,i,s,o;if(!t._webAudio)return t;if(n.length===0)return t._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof s>"u"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),t._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle<"u"?i.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle<"u"?i.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain<"u"?i.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel<"u"?i.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance<"u"?i.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof i.pannerAttr.refDistance<"u"?i.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor<"u"?i.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel<"u"?i.pannerAttr.panningModel:t._panningModel});else return o=t._soundById(parseInt(n[0],10)),o?o._pannerAttr:t._pannerAttr;else n.length===2&&(i=n[0],s=parseInt(n[1],10));for(var l=t._getSoundIds(s),h=0;h<l.length;h++)if(o=t._soundById(l[h]),o){var u=o._pannerAttr;u={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:u.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:u.coneOuterGain,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:u.distanceModel,maxDistance:typeof i.maxDistance<"u"?i.maxDistance:u.maxDistance,refDistance:typeof i.refDistance<"u"?i.refDistance:u.refDistance,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:u.rolloffFactor,panningModel:typeof i.panningModel<"u"?i.panningModel:u.panningModel};var f=o._panner;f||(o._pos||(o._pos=t._pos||[0,0,-.5]),e(o,"spatial"),f=o._panner),f.coneInnerAngle=u.coneInnerAngle,f.coneOuterAngle=u.coneOuterAngle,f.coneOuterGain=u.coneOuterGain,f.distanceModel=u.distanceModel,f.maxDistance=u.maxDistance,f.refDistance=u.refDistance,f.rolloffFactor=u.rolloffFactor,f.panningModel=u.panningModel}return t},Sound.prototype.init=(function(t){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,t.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}})(Sound.prototype.init),Sound.prototype.reset=(function(t){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),t.call(this)}})(Sound.prototype.reset);var e=function(t,n){n=n||"spatial",n==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(Wo)),Wo}var gh=Tv();class Ev{constructor(){this.context=null,this.master=null,this.engineOsc=null,this.engineSubOsc=null,this.enginePulseOsc=null,this.engineGain=null,this.engineSubGain=null,this.enginePulseGain=null,this.engineNoise=null,this.engineNoiseGain=null,this.engineFilter=null,this.engineSubFilter=null,this.windOsc=null,this.windGain=null,this.muted=localStorage.getItem("portfolio-drive-muted")==="1"}async init(){if(this.context)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.context=new e,this.master=this.context.createGain(),this.master.gain.value=this.muted?0:.35,this.master.connect(this.context.destination),this.engineOsc=this.context.createOscillator(),this.engineOsc.type="sawtooth",this.engineSubOsc=this.context.createOscillator(),this.engineSubOsc.type="square",this.enginePulseOsc=this.context.createOscillator(),this.enginePulseOsc.type="triangle",this.engineGain=this.context.createGain(),this.engineSubGain=this.context.createGain(),this.enginePulseGain=this.context.createGain(),this.engineNoiseGain=this.context.createGain(),this.engineGain.gain.value=1e-4,this.engineSubGain.gain.value=1e-4,this.enginePulseGain.gain.value=1e-4,this.engineNoiseGain.gain.value=1e-4,this.engineFilter=this.context.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=340,this.engineFilter.Q.value=.85,this.engineSubFilter=this.context.createBiquadFilter(),this.engineSubFilter.type="lowpass",this.engineSubFilter.frequency.value=96;const t=this.context.createBiquadFilter();t.type="bandpass",t.frequency.value=68,t.Q.value=1.4;const n=this.context.createWaveShaper();n.curve=Av(58),n.oversample="2x",this.engineOsc.connect(this.engineFilter),this.engineFilter.connect(n),n.connect(this.engineGain),this.engineGain.connect(this.master),this.engineSubOsc.connect(this.engineSubFilter),this.engineSubFilter.connect(this.engineSubGain),this.engineSubGain.connect(this.master),this.enginePulseOsc.connect(t),t.connect(this.enginePulseGain),this.enginePulseGain.connect(this.master),this.engineNoise=this.context.createBufferSource(),this.engineNoise.buffer=Rv(this.context),this.engineNoise.loop=!0;const i=this.context.createBiquadFilter();i.type="bandpass",i.frequency.value=290,i.Q.value=.85,this.engineNoise.connect(i),i.connect(this.engineNoiseGain),this.engineNoiseGain.connect(this.master),this.engineOsc.start(),this.engineSubOsc.start(),this.enginePulseOsc.start(),this.engineNoise.start(),this.windOsc=this.context.createOscillator(),this.windOsc.type="triangle",this.windGain=this.context.createGain(),this.windGain.gain.value=.012;const s=this.context.createBiquadFilter();s.type="highpass",s.frequency.value=180,this.windOsc.connect(s),s.connect(this.windGain),this.windGain.connect(this.master),this.windOsc.frequency.value=84,this.windOsc.start()}resume(){this.init(),gh.Howler.mute(this.muted),this.context?.state==="suspended"&&this.context.resume()}toggleMute(){return this.muted=!this.muted,localStorage.setItem("portfolio-drive-muted",this.muted?"1":"0"),gh.Howler.mute(this.muted),this.master&&this.master.gain.setTargetAtTime(this.muted?0:.35,this.context.currentTime,.04),this.muted}click(e=520){if(!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="triangle",t.frequency.value=e,n.gain.value=.001,t.connect(n),n.connect(this.master),n.gain.setValueAtTime(.001,this.context.currentTime),n.gain.exponentialRampToValueAtTime(.08,this.context.currentTime+.01),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.15),t.start(),t.stop(this.context.currentTime+.17)}impact(e=1){if(!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="square",t.frequency.value=90+Math.random()*30,n.gain.value=Math.min(.1,.03*e),t.connect(n),n.connect(this.master),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.12),t.start(),t.stop(this.context.currentTime+.14)}update(e,t={}){if(!this.context||!this.engineOsc||!this.engineGain)return;const n=Math.min(1,Math.abs(e)/70),i=Math.min(1,Math.abs(t.throttle??0)),s=t.boost?1:0,o=t.burnout?1:0,l=t.wheelie?1:0,h=t.slip??0,u=Math.sin(this.context.currentTime*(18+n*28))*(2+n*5);this.engineOsc.frequency.setTargetAtTime(38+n*176+i*56+s*38+o*58+l*18+u,this.context.currentTime,.055),this.engineGain.gain.setTargetAtTime(this.muted?0:.04+n*.095+i*.034+s*.026+o*.04,this.context.currentTime,.075),this.engineFilter?.frequency.setTargetAtTime(220+n*760+i*230+s*280+o*240,this.context.currentTime,.12),this.engineSubOsc&&this.engineSubGain&&(this.engineSubOsc.frequency.setTargetAtTime(23+n*52+i*10+o*7,this.context.currentTime,.08),this.engineSubGain.gain.setTargetAtTime(this.muted?0:.027+n*.05+i*.018+o*.022,this.context.currentTime,.12)),this.enginePulseOsc&&this.enginePulseGain&&(this.enginePulseOsc.frequency.setTargetAtTime(15+n*35+s*16+o*12,this.context.currentTime,.1),this.enginePulseGain.gain.setTargetAtTime(this.muted?0:.013+n*.028+s*.018+o*.018,this.context.currentTime,.1)),this.engineNoiseGain&&this.engineNoiseGain.gain.setTargetAtTime(this.muted?0:.004+n*.017+h*.065+s*.018+o*.055,this.context.currentTime,.08),this.windGain&&this.windGain.gain.setTargetAtTime(this.muted?0:.008+n*.025,this.context.currentTime,.2)}}function Av(r){const t=new Float32Array(44100),n=Math.PI/180;for(let i=0;i<44100;i+=1){const s=i*2/44100-1;t[i]=(3+r)*s*20*n/(Math.PI+r*Math.abs(s))}return t}function Rv(r){const e=r.sampleRate*2,t=r.createBuffer(1,e,r.sampleRate),n=t.getChannelData(0);let i=0;for(let s=0;s<e;s+=1){const o=Math.random()*2-1;i=i*.92+o*.08,n[s]=i*.55}return t}const Bt=190,Sn=24,ft=158,Cv=[],Pv=[{id:"courtyard",label:"Portfolio Courtyard",center:[16,40],size:[44,36],color:"#7cffb2",kind:"plaza"},{id:"watchtower",label:"Sentinel Watchtower",center:[38,104],size:[46,34],color:"#ff6d8d",kind:"keep"},{id:"library-grove",label:"Education Grove",center:[-112,72],size:[48,38],color:"#9ccfff",kind:"library"},{id:"forge",label:"Projects Foundry",center:[62,42],size:[48,36],color:"#ffcc66",kind:"forge"},{id:"harbor",label:"Contact Harbor",center:[130,64],size:[34,30],color:"#78b7ff",kind:"waterfront"},{id:"archive",label:"Archive Garden",center:[-24,60],size:[36,28],color:"#ffdf8a",kind:"civic"},{id:"cove",label:"Stunt Courtyard",center:[112,-78],size:[40,28],color:"#ff9b6d",kind:"stunt"},{id:"farm",label:"Voxel Farm Pocket",center:[-56,-126],size:[34,28],color:"#c79b56",kind:"farm"}],Xo=[{id:"western-sakura",center:[-124,28],size:[34,48],kind:"grove"},{id:"library-sakura",center:[-122,112],size:[30,28],kind:"grove"},{id:"north-meadow",center:[-12,110],size:[54,28],kind:"meadow"},{id:"harbor-cypress",center:[128,76],size:[24,32],kind:"coast"},{id:"southern-oaks",center:[-22,-116],size:[58,26],kind:"meadow"},{id:"farm-orchard",center:[-60,-126],size:[30,24],kind:"farm"},{id:"east-park",center:[114,-12],size:[26,34],kind:"garden"},{id:"west-cove",center:[-118,-60],size:[30,34],kind:"coast"}],Fl=[{id:"island-loop",name:"Stone Coast Loop",width:8.8,hierarchy:"ring",closed:!0,points:[[-88,78],[-122,12],[-96,-74],[-28,-120],[56,-112],[118,-56],[130,34],[84,100],[16,126],[-60,112]]},{id:"agora-way",name:"Courtyard Way",width:7.2,hierarchy:"avenue",closed:!1,points:[[-122,12],[-62,18],[0,26],[62,18],[130,34]]},{id:"acropolis-climb",name:"Watchtower Climb",width:6.2,hierarchy:"street",closed:!1,points:[[0,26],[6,66],[22,104],[16,126]]},{id:"academy-lane",name:"Library Lane",width:6,hierarchy:"street",closed:!1,points:[[-62,18],[-92,54],[-104,86],[-88,78]]},{id:"vault-run",name:"Vault Run",width:5.8,hierarchy:"street",closed:!1,points:[[0,26],[24,-36],[44,-86],[56,-112]]},{id:"stunt-cove-loop",name:"Stunt Courtyard Approach",width:7,hierarchy:"stunt",closed:!1,points:[[56,-112],[84,-96],[104,-96]]},{id:"farm-track",name:"Farm Track",width:5.2,hierarchy:"dirt",closed:!1,turnaround:!0,points:[[-28,-120],[-44,-124]]}],el=Fl.flatMap(r=>Nv(r)),Iv=[{id:"southern-curve-boost",position:[0,0,-123],rotation:Math.PI/2-.2,color:"#68d8ff",district:"loop"},{id:"east-loop-boost",position:[122,0,-18],rotation:.1,color:"#7cffb2",district:"loop"},{id:"stunt-cove-boost",position:[78,0,-106],rotation:-.6,color:"#ff9b6d",district:"stunt"}],Ys=[{id:"landing",name:"Portfolio Courtyard",kind:"Home",position:[16,0,40],rotation:0,radius:11,color:"#7cffb2",shape:"hub",dialogueId:"0",achievement:"first_stop",actions:[{label:"Main Portfolio",href:"../index.html"},{label:"Projects",href:"../projects.html"}]},{id:"security",name:"Security Keep",kind:"Offensive Security",position:[-126,0,-42],rotation:.18,radius:10,color:"#68d8ff",shape:"lab",dialogueId:"1",achievement:"security_lab",actions:[{label:"CV",href:"../cv.html"},{label:"Cyber Sentinel",href:"../cyber-sentinel.html"}]},{id:"projects",name:"Projects Foundry",kind:"Project Gallery",position:[64,0,42],rotation:-.34,radius:10,color:"#ffcc66",shape:"foundry",achievement:"projects_foundry",projectGallery:!0,actions:[{label:"Projects Page",href:"../projects.html"}]},{id:"sentinel",name:"Cyber Sentinel Watchtower",kind:"Final Year Project",position:[38,0,104],rotation:0,radius:12,color:"#ff6d8d",shape:"tower",dialogueId:"3",achievement:"cyber_sentinel",actions:[{label:"Read Blog",href:"../cyber-sentinel.html"}]},{id:"career",name:"Career Guild Hall",kind:"Experience",position:[90,0,-28],rotation:-.15,radius:10,color:"#b6a0ff",shape:"office",dialogueId:"5",achievement:"career_office",actions:[{label:"CV",href:"../cv.html"}]},{id:"skills",name:"Skills Oracle",kind:"Stack",position:[-86,0,-102],rotation:.28,radius:9,color:"#92ffea",shape:"terminal",dialogueId:"2",achievement:"skills_terminal",actions:[{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"}]},{id:"education",name:"Education Library",kind:"Academics",position:[-112,0,72],rotation:.18,radius:10,color:"#9ccfff",shape:"library",dialogueId:"6",achievement:"education_library",actions:[{label:"CV",href:"../cv.html"}]},{id:"awards",name:"Awards Shrine",kind:"Certificates",position:[-24,0,60],rotation:-.18,radius:8,color:"#ffdf8a",shape:"trophy",dialogueId:"7",achievement:"awards_tower",actions:[{label:"CV",href:"../cv.html"}]},{id:"cv",name:"CV Vault",kind:"Resume",position:[32,0,-78],rotation:.28,radius:8,color:"#e6f3ff",shape:"vault",achievement:"cv_vault",lines:["Resume archive, project record, certificates, skills, awards, and downloadable PDFs.","Open the document-first version for the full professional profile."],actions:[{label:"Open CV Page",href:"../cv.html"},{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"},{label:"Cyber CV PDF",href:"../Abdullah-Mehtab-CV-Cyber-v2.pdf"}]},{id:"todo",name:"Todo Board",kind:"Blog / List",position:[-88,0,0],rotation:.18,radius:8,color:"#d8ff92",shape:"board",achievement:"todo_board",lines:["The never-ending list keeps active tasks, experiments, reminders, and ideas visible.","A lightweight log for work that is being tested, refined, or revisited."],actions:[{label:"Open Todo",href:"../todo.html"}]},{id:"circuit",name:"Circuit Gate",kind:"Time Trial",position:[84,0,100],rotation:-.22,radius:9,color:"#ff9b6d",shape:"gate",achievement:"circuit_gate",lines:["This gate starts the island loop circuit.","Follow the checkpoints around the coast and return clean."],startsCircuit:!0},{id:"contact",name:"Contact Harbor Lighthouse",kind:"Links",position:[130,0,64],rotation:-.18,radius:8,color:"#78b7ff",shape:"post",dialogueId:"8",achievement:"contact_port",actions:[{label:"GitHub",href:"https://github.com/Abdullah-Mehtab"},{label:"LinkedIn",href:"https://linkedin.com/in/abdullah-mehtab"},{label:"Email",href:"mailto:abdullahmehtab666@gmail.com"}]},{id:"behind",name:"Behind The Build",kind:"Stack",position:[36,0,-104],rotation:.08,radius:8,color:"#a8a6ff",shape:"portal",achievement:"behind_build",lines:["Engine room: Three.js visuals, Rapier physics, local resume data, and Supabase-backed counters.","The repository link opens the source behind the drive world."],actions:[{label:"Repository",href:"https://github.com/Abdullah-Mehtab/Abdullah-Mehtab"}]},{id:"drift",name:"Stunt Courtyard",kind:"Driving",position:[112,0,-78],rotation:-.45,radius:11,color:"#ff9b6d",shape:"rampyard",achievement:"ramp_yard",lines:["A dedicated driving yard for ramps, boosters, handbrake turns, and clean landings."]},{id:"data-pier",name:"Data Pier",kind:"Visitor Trail",position:[-138,0,20],rotation:.42,radius:9,color:"#79ffc5",shape:"pier",achievement:"data_pier",lines:["Signal pier for page views, zone visits, and interaction counts.","Visitor signals are stored as hashed analytics events."]},{id:"potato",name:"Potato Farm",kind:"Farm Counter",position:[-56,0,-126],rotation:1.15,radius:10,color:"#c79b56",shape:"farm",achievement:"potato_farm",lines:["Voxel potato patch beside the farm track.","Press P nearby, or use the summon button, to grow one temporary potato and increment the farm counter."],potatoFarm:!0}],Lv=[["first_stop","First Stop","Interact with the Start Hub."],["security_lab","Security Pass","Open the Security Lab."],["projects_foundry","Project Heat","Open the Projects Foundry."],["cyber_sentinel","Sentinel Signal","Visit Cyber Sentinel Tower."],["career_office","Work Log","Open the Career Office."],["skills_terminal","Stack Trace","Open the Skills Terminal."],["education_library","Academic Archive","Open the Education Library."],["awards_tower","Trophy Case","Open the Awards Tower."],["cv_vault","Formal Mode","Open the CV Vault."],["todo_board","Still Building","Open the Todo Board."],["circuit_gate","Track Curious","Start the circuit gate."],["contact_port","Signal Sent","Open the Contact Port."],["behind_build","Look Under The Hood","Open Behind The Build."],["ramp_yard","Ramp Yard","Visit the driving yard."],["data_pier","Data Pier","Visit the data pier."],["potato_farm","Potato Patch","Visit the potato farm."],["potato_summon","Potato Summoner","Summon a blocky potato."],["boost","Boosted","Use boost while driving."],["boost_pad","Pad Launched","Hit a boost pad."],["jump","Suspension Check","Jump the car."],["ramp_jump","Clean Air","Launch from a ramp."],["data_shards","Signal Collector","Collect every floating data shard."],["distance_1km","One Kilometer","Drive at least 1 km."],["all_zones","Full Tour","Interact with every portfolio zone."]],Dv=[[84,0,100],[16,0,126],[-60,0,112],[-88,0,78],[-122,0,12],[-96,0,-74],[-28,0,-120],[56,0,-112],[118,0,-56],[130,0,34],[84,0,100]];function Nv(r){const e=r.points,t=[],n=r.closed?e.length:e.length-1;for(let i=0;i<n;i+=1){const s=e[i],o=e[(i+1)%e.length],l=o[0]-s[0],h=o[1]-s[1],u=Math.hypot(l,h);t.push([(s[0]+o[0])/2,(s[1]+o[1])/2,r.width,u+r.width*.64,Math.atan2(l,h)])}return t}const _h="portfolio-drive-achievements";class Fv{constructor(){this.definitions=Lv.map(([e,t,n])=>({id:e,title:t,description:n})),this.unlocked=new Set(this.read()),this.zoneUnlocks=new Set,this.distance=Number(localStorage.getItem("portfolio-drive-distance")||0),this.onUnlock=null}read(){try{const e=JSON.parse(localStorage.getItem(_h)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}save(){localStorage.setItem(_h,JSON.stringify([...this.unlocked])),localStorage.setItem("portfolio-drive-distance",String(Math.round(this.distance)))}unlock(e){if(this.unlocked.has(e))return!1;this.unlocked.add(e),this.save();const t=this.definitions.find(n=>n.id===e);return this.onUnlock?.(t||{id:e,title:e,description:""}),!0}visitZone(e){if(!e?.achievement)return;this.zoneUnlocks.add(e.achievement),this.unlock(e.achievement),this.definitions.map(i=>i.id).filter(i=>!["boost","boost_pad","jump","ramp_jump","data_shards","potato_summon","distance_1km","all_zones"].includes(i)).every(i=>this.unlocked.has(i)||this.zoneUnlocks.has(i))&&this.unlock("all_zones")}addDistance(e){!Number.isFinite(e)||e<=0||(this.distance+=e,this.distance>=1e3&&this.unlock("distance_1km"),this.save())}reset(){this.unlocked.clear(),this.zoneUnlocks.clear(),this.distance=0,this.save()}getProgress(){return{unlocked:this.unlocked.size,total:this.definitions.length,distance:this.distance}}}const vh="https://zvuklviflletxyhniwdm.supabase.co/functions/v1/visitor-proof",xs="sb_publishable_almN_FPps-MxiLAF0Uypmw_jaCZ6VrI",xh="portfolio-drive-visitor-id",Uv=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;class Ov{constructor(){this.isEnabled=!!xs,this.visitorId=Bv(),this.fingerprintHash="",this.potatoCount=null,this.zoneVisits=new Set}get potatoCountLabel(){return Number.isFinite(this.potatoCount)?String(this.potatoCount):"--"}async init(){if(!this.isEnabled)return;this.fingerprintHash=await kv(),this.record("page_view",{sourceToken:"drive_world"});const e=await this.fetchPotatoCount();Number.isFinite(e)&&(this.potatoCount=e)}recordZone(e){!e||this.zoneVisits.has(e)||(this.zoneVisits.add(e),this.record("play_zone_visit",{sourceToken:e}))}async recordPotatoSummon(){const e=await this.record("potato_summon",{sourceToken:"potato_farm",wantsCount:!0});return Number.isFinite(e?.potato_count)?this.potatoCount=e.potato_count:Number.isFinite(this.potatoCount)&&(this.potatoCount+=1),this.potatoCount}async fetchPotatoCount(){if(!this.isEnabled)return null;try{const e=new URL(vh);e.searchParams.set("page_slug","play"),e.searchParams.set("event_type","potato_summon_count");const t=await fetch(e,{headers:{apikey:xs,authorization:`Bearer ${xs}`}});if(!t.ok)return null;const n=await t.json();return Number(n.potato_count)}catch{return null}}async record(e,t={}){if(!this.isEnabled)return null;try{const n={page_slug:"play",event_type:e,theme:"drive_world",cursor:"vehicle",motion:"full",referrer:document.referrer||"",source_token:t.sourceToken||"",visitor_id:this.visitorId,session_id:Uv,fingerprint_hash:this.fingerprintHash,fingerprint_version:"play-v1",screen_size:`${screen.width}x${screen.height}x${window.devicePixelRatio||1}`,viewport_size:`${window.innerWidth}x${window.innerHeight}`,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",language:navigator.language||"",platform:navigator.platform||""},i=await fetch(vh,{method:"POST",headers:{"content-type":"application/json",apikey:xs,authorization:`Bearer ${xs}`},body:JSON.stringify(n),keepalive:e==="page_view"});return i.ok?i.json().catch(()=>null):null}catch{return null}}}function Bv(){try{const r=localStorage.getItem(xh);if(r)return r;const e=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;return localStorage.setItem(xh,e),e}catch{return`${Date.now()}-${Math.random().toString(16).slice(2)}`}}async function kv(){const r=[navigator.userAgent||"",navigator.language||"",navigator.platform||"",screen.width,screen.height,screen.colorDepth,window.devicePixelRatio||1,Intl.DateTimeFormat().resolvedOptions().timeZone||""].join("|");if(!crypto.subtle)return"";const e=new TextEncoder().encode(r),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(n=>n.toString(16).padStart(2,"0")).join("")}class zv{constructor(e){this.RAPIER=e,this.world=new this.RAPIER.World({x:0,y:-18.5,z:0}),this.accumulator=0,this.fixedStep=1/60,this.dynamicVisuals=[]}createFixedBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);n.rotation&&i.setRotation(qo(n.rotation));const s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setFriction(n.friction??.85).setRestitution(n.restitution??.05);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}createFixedCylinder(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(qo(i.rotation));const o=this.world.createRigidBody(s),l=this.RAPIER.ColliderDesc.cylinder(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&l.setSensor(!0),this.world.createCollider(l,o),o}createFixedBall(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.ball(t).setFriction(n.friction??.85).setRestitution(n.restitution??.04);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}createFixedTrimesh(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(qo(i.rotation));const o=this.world.createRigidBody(s),l=this.RAPIER.ColliderDesc.trimesh(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&l.setSensor(!0),this.world.createCollider(l,o),o}createDynamicBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(e[0],e[1],e[2]).setLinearDamping(n.linearDamping??.35).setAngularDamping(n.angularDamping??.45),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setDensity(n.density??.55).setFriction(n.friction??.75).setRestitution(n.restitution??.2);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}bindVisual(e,t){const n=e.translation(),i=e.rotation();this.dynamicVisuals.push({body:e,object:t,initial:{translation:{x:n.x,y:n.y,z:n.z},rotation:{x:i.x,y:i.y,z:i.z,w:i.w}}})}resetDynamicVisuals(){for(const e of this.dynamicVisuals)e.body.setTranslation(e.initial.translation,!0),e.body.setRotation(e.initial.rotation,!0),e.body.setLinvel({x:0,y:0,z:0},!0),e.body.setAngvel({x:0,y:0,z:0},!0);this.syncVisuals()}step(e,t){this.accumulator+=Math.min(e,.05);let n=!1;for(;this.accumulator>=this.fixedStep;)t?.(this.fixedStep),this.world.step(),this.accumulator-=this.fixedStep,n=!0;n&&this.syncVisuals()}syncVisuals(){for(const e of this.dynamicVisuals){const t=e.body.translation(),n=e.body.rotation();e.object.position.set(t.x,t.y,t.z),e.object.quaternion.set(n.x,n.y,n.z,n.w)}}}function qo(r){const e=new Et().setFromEuler(new cn(r[0],r[1],r[2]));return{x:e.x,y:e.y,z:e.z,w:e.w}}function yh(r,e){if(e===od)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ha||e===zh){let t=r.getIndex();if(t===null){const o=[],l=r.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)o.push(h);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Ha)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function Vv(r){const e=new Map,t=new Map,n=r.clone();return yu(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),l=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=l.map(function(h){return t.get(h)}),s.bind(s.skeleton,s.bindMatrix)}),n}function yu(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)yu(r.children[n],e.children[n],t)}class Mu extends os{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new ix(t)}),this.register(function(t){return new sx(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new tx(t)}),this.register(function(t){return new ex(t)}),this.register(function(t){return new Hv(t)}),this.register(function(t){return new Mh(t,Xe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Mh(t,Xe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new rx(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const u=Fs.extractUrlBase(e);o=Fs.resolveURL(u,this.path)}else o=Fs.extractUrlBase(e);this.manager.itemStart(e);const l=function(u){i?i(u):console.error(u),s.manager.itemError(e),s.manager.itemEnd(e)},h=new uu(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(u){try{s.parse(u,o,function(f){t(f),s.manager.itemEnd(e)},l)}catch(f){l(f)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},l={},h=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===Su){try{o[Xe.KHR_BINARY_GLTF]=new ox(e)}catch(a){i&&i(a);return}s=JSON.parse(o[Xe.KHR_BINARY_GLTF].content)}else s=JSON.parse(h.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new xx(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let f=0;f<this.pluginCallbacks.length;f++){const a=this.pluginCallbacks[f](u);a.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[a.name]=a,o[a.name]=!0}if(s.extensionsUsed)for(let f=0;f<s.extensionsUsed.length;++f){const a=s.extensionsUsed[f],c=s.extensionsRequired||[];switch(a){case Xe.KHR_MATERIALS_UNLIT:o[a]=new Wv;break;case Xe.KHR_DRACO_MESH_COMPRESSION:o[a]=new ax(s,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:o[a]=new lx;break;case Xe.KHR_MESH_QUANTIZATION:o[a]=new cx;break;default:c.indexOf(a)>=0&&l[a]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+a+'".')}}u.setExtensions(o),u.setPlugins(l),u.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Gv(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Mt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Hv{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,h=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let u;const f=new fe(16777215);h.color!==void 0&&f.setRGB(h.color[0],h.color[1],h.color[2],Yt);const a=h.range!==void 0?h.range:0;switch(h.type){case"directional":u=new ja(f),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new Ns(f),u.distance=a;break;case"spot":u=new fu(f),u.distance=a,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,u.angle=h.spot.outerConeAngle,u.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return u.position.set(0,0,0),yn(u,h),h.intensity!==void 0&&(u.intensity=h.intensity),u.name=t.createUniqueName(h.name||"light_"+e),i=Promise.resolve(u),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],l=(s.extensions&&s.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class Wv{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return Rt}extendParams(e,t,n){const i=[];e.color=new fe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Yt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Tt))}return Promise.all(i)}}class Xv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class qv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ae(s,s)}return Promise.all(i)}}class Yv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Kv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class $v{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Yt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Tt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Zv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class jv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(s[0],s[1],s[2],Yt),Promise.all(i)}}class Jv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5),Promise.resolve()}}class Qv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(s[0],s[1],s[2],Yt),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Tt)),Promise.all(i)}}class ex{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class tx{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Mt(this.parser,e,this.name)!==null?tn:null}extendMaterialParams(e,t){const n=Mt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class nx{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class ix{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],l=i.images[o.source];let h=n.textureLoader;if(l.uri){const u=n.options.manager.getHandler(l.uri);u!==null&&(h=u)}return n.loadTextureImage(e,o.source,h)}}class sx{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],l=i.images[o.source];let h=n.textureLoader;if(l.uri){const u=n.options.manager.getHandler(l.uri);u!==null&&(h=u)}return n.loadTextureImage(e,o.source,h)}}class Mh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(l){const h=i.byteOffset||0,u=i.byteLength||0,f=i.count,a=i.byteStride,c=new Uint8Array(l,h,u);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(f,a,c,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(f*a);return o.decodeGltfBuffer(new Uint8Array(d),f,a,c,i.mode,i.filter),d})})}else return null}}class rx{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const u of i.primitives)if(u.mode!==sn.TRIANGLES&&u.mode!==sn.TRIANGLE_STRIP&&u.mode!==sn.TRIANGLE_FAN&&u.mode!==void 0)return null;const o=n.extensions[this.name].attributes,l=[],h={};for(const u in o)l.push(this.parser.getDependency("accessor",o[u]).then(f=>(h[u]=f,h[u])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(u=>{const f=u.pop(),a=f.isGroup?f.children:[f],c=u[0].count,d=[];for(const p of a){const _=new ke,g=new R,m=new Et,v=new R(1,1,1),M=new af(p.geometry,p.material,c);for(let S=0;S<c;S++)h.TRANSLATION&&g.fromBufferAttribute(h.TRANSLATION,S),h.ROTATION&&m.fromBufferAttribute(h.ROTATION,S),h.SCALE&&v.fromBufferAttribute(h.SCALE,S),M.setMatrixAt(S,_.compose(g,m,v));for(const S in h)if(S==="_COLOR_0"){const E=h[S];M.instanceColor=new Xa(E.array,E.itemSize,E.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&p.geometry.setAttribute(S,h[S]);pt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),d.push(M)}return f.isGroup?(f.clear(),f.add(...d),f):d[0]}))}}const Su="glTF",ys=12,Sh={JSON:1313821514,BIN:5130562};class ox{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ys),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Su)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ys,s=new DataView(e,ys);let o=0;for(;o<i;){const l=s.getUint32(o,!0);o+=4;const h=s.getUint32(o,!0);if(o+=4,h===Sh.JSON){const u=new Uint8Array(e,ys+o,l);this.content=n.decode(u)}else if(h===Sh.BIN){const u=ys+o;this.body=e.slice(u,u+l)}o+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ax{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,l={},h={},u={};for(const f in o){const a=tl[f]||f.toLowerCase();l[a]=o[f]}for(const f in e.attributes){const a=tl[f]||f.toLowerCase();if(o[f]!==void 0){const c=n.accessors[e.attributes[f]],d=Hi[c.componentType];u[a]=d.name,h[a]=c.normalized===!0}}return t.getDependency("bufferView",s).then(function(f){return new Promise(function(a,c){i.decodeDracoFile(f,function(d){for(const p in d.attributes){const _=d.attributes[p],g=h[p];g!==void 0&&(_.normalized=g)}a(d)},l,u,Yt,c)})})}}class lx{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class cx{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}}class bu extends is{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=l*2,u=l*3,f=i-t,a=(n-t)/f,c=a*a,d=c*a,p=e*u,_=p-u,g=-2*d+3*c,m=d-c,v=1-g,M=m-c+a;for(let S=0;S!==l;S++){const E=o[_+S+l],T=o[_+S+h]*f,C=o[p+S+l],x=o[p+S]*f;s[S]=v*E+M*T+g*C+m*x}return s}}const hx=new Et;class ux extends bu{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return hx.fromArray(s).normalize().toArray(s),s}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Hi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bh={9728:At,9729:wt,9984:Dh,9985:Nr,9986:Ts,9987:wn},wh={33071:bn,33648:Gr,10497:rn},Yo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},tl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ti={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dx={CUBICSPLINE:void 0,LINEAR:ks,STEP:Bs},Ko={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function fx(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new dt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Wn})),r.DefaultMaterial}function di(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function px(r,e,t){let n=!1,i=!1,s=!1;for(let u=0,f=e.length;u<f;u++){const a=e[u];if(a.POSITION!==void 0&&(n=!0),a.NORMAL!==void 0&&(i=!0),a.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],l=[],h=[];for(let u=0,f=e.length;u<f;u++){const a=e[u];if(n){const c=a.POSITION!==void 0?t.getDependency("accessor",a.POSITION):r.attributes.position;o.push(c)}if(i){const c=a.NORMAL!==void 0?t.getDependency("accessor",a.NORMAL):r.attributes.normal;l.push(c)}if(s){const c=a.COLOR_0!==void 0?t.getDependency("accessor",a.COLOR_0):r.attributes.color;h.push(c)}}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(h)]).then(function(u){const f=u[0],a=u[1],c=u[2];return n&&(r.morphAttributes.position=f),i&&(r.morphAttributes.normal=a),s&&(r.morphAttributes.color=c),r.morphTargetsRelative=!0,r})}function mx(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gx(r){let e;const t=r.extensions&&r.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+$o(t.attributes):e=r.indices+":"+$o(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+$o(r.targets[n]);return e}function $o(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function nl(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _x(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const vx=new ke;class xx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Gv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const l=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(l)===!0;const h=l.match(/Version\/(\d+)/);i=n&&h?parseInt(h[1],10):-1,s=l.indexOf("Firefox")>-1,o=s?l.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new hp(this.options.manager):this.textureLoader=new mp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new uu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const l={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return di(s,l,i),yn(l,i),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let l=0,h=o.length;l<h;l++)e[o[l]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,l)=>{const h=this.associations.get(o);h!=null&&this.associations.set(l,h);for(const[u,f]of o.children.entries())s(f,l.children[u])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Fs.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Yo[i.type],l=Hi[i.componentType],h=i.normalized===!0,u=new l(i.count*o);return Promise.resolve(new yt(u,o,h))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const l=o[0],h=Yo[i.type],u=Hi[i.componentType],f=u.BYTES_PER_ELEMENT,a=f*h,c=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(d&&d!==a){const m=Math.floor(c/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let M=t.cache.get(v);M||(_=new u(l,m*d,i.count*d/f),M=new Qd(_,d/f),t.cache.add(v,M)),g=new Sl(M,h,c%d/f,p)}else l===null?_=new u(i.count*h):_=new u(l,c,i.count*h),g=new yt(_,h,p);if(i.sparse!==void 0){const m=Yo.SCALAR,v=Hi[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,E=new v(o[1],M,i.sparse.count*m),T=new u(o[2],S,i.sparse.count*h);l!==null&&(g=new yt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,x=E.length;C<x;C++){const b=E[C];if(g.setX(b,T[C*h]),h>=2&&g.setY(b,T[C*h+1]),h>=3&&g.setZ(b,T[C*h+2]),h>=4&&g.setW(b,T[C*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let l=this.textureLoader;if(o.uri){const h=n.manager.getHandler(o.uri);h!==null&&(l=h)}return this.loadTextureImage(e,s,l)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],l=s.images[t],h=(l.uri||l.bufferView)+":"+o.sampler;if(this.textureCache[h])return this.textureCache[h];const u=this.loadImageSource(t,n).then(function(f){f.flipY=!1,f.name=o.name||l.name||"",f.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(f.name=l.uri);const c=(s.samplers||{})[o.sampler]||{};return f.magFilter=bh[c.magFilter]||wt,f.minFilter=bh[c.minFilter]||wn,f.wrapS=wh[c.wrapS]||rn,f.wrapT=wh[c.wrapT]||rn,f.generateMipmaps=!f.isCompressedTexture&&f.minFilter!==At&&f.minFilter!==wt,i.associations.set(f,{textures:e}),f}).catch(function(){return null});return this.textureCache[h]=u,u}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(a=>a.clone());const o=i.images[e],l=self.URL||self.webkitURL;let h=o.uri||"",u=!1;if(o.bufferView!==void 0)h=n.getDependency("bufferView",o.bufferView).then(function(a){u=!0;const c=new Blob([a],{type:o.mimeType});return h=l.createObjectURL(c),h});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const f=Promise.resolve(h).then(function(a){return new Promise(function(c,d){let p=c;t.isImageBitmapLoader===!0&&(p=function(_){const g=new Pt(_);g.needsUpdate=!0,c(g)}),t.load(Fs.resolveURL(a,s.path),p,void 0,d)})}).then(function(a){return u===!0&&l.revokeObjectURL(h),yn(a,o),a.userData.mimeType=o.mimeType||_x(o.uri),a}).catch(function(a){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),a});return this.sourceCache[e]=f,f}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Xe.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=s.associations.get(o);o=s.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(o,l),s.associations.set(o,h)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new Kr,Rn.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new $h,Rn.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(i||s||o){let l="ClonedMaterial:"+n.uuid+":";i&&(l+="derivative-tangents:"),s&&(l+="vertex-colors:"),o&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),s&&(h.vertexColors=!0),o&&(h.flatShading=!0),i&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return dt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const l={},h=s.extensions||{},u=[];if(h[Xe.KHR_MATERIALS_UNLIT]){const a=i[Xe.KHR_MATERIALS_UNLIT];o=a.getMaterialType(),u.push(a.extendParams(l,s,t))}else{const a=s.pbrMetallicRoughness||{};if(l.color=new fe(1,1,1),l.opacity=1,Array.isArray(a.baseColorFactor)){const c=a.baseColorFactor;l.color.setRGB(c[0],c[1],c[2],Yt),l.opacity=c[3]}a.baseColorTexture!==void 0&&u.push(t.assignTexture(l,"map",a.baseColorTexture,Tt)),l.metalness=a.metallicFactor!==void 0?a.metallicFactor:1,l.roughness=a.roughnessFactor!==void 0?a.roughnessFactor:1,a.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(l,"metalnessMap",a.metallicRoughnessTexture)),u.push(t.assignTexture(l,"roughnessMap",a.metallicRoughnessTexture))),o=this._invokeOne(function(c){return c.getMaterialType&&c.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(c){return c.extendMaterialParams&&c.extendMaterialParams(e,l)})))}s.doubleSided===!0&&(l.side=Xt);const f=s.alphaMode||Ko.OPAQUE;if(f===Ko.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,f===Ko.MASK&&(l.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Rt&&(u.push(t.assignTexture(l,"normalMap",s.normalTexture)),l.normalScale=new ae(1,1),s.normalTexture.scale!==void 0)){const a=s.normalTexture.scale;l.normalScale.set(a,a)}if(s.occlusionTexture!==void 0&&o!==Rt&&(u.push(t.assignTexture(l,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Rt){const a=s.emissiveFactor;l.emissive=new fe().setRGB(a[0],a[1],a[2],Yt)}return s.emissiveTexture!==void 0&&o!==Rt&&u.push(t.assignTexture(l,"emissiveMap",s.emissiveTexture,Tt)),Promise.all(u).then(function(){const a=new o(l);return s.name&&(a.name=s.name),yn(a,s),t.associations.set(a,{materials:e}),s.extensions&&di(i,a,s),a})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(l){return n[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return Th(h,l,t)})}const o=[];for(let l=0,h=e.length;l<h;l++){const u=e[l],f=gx(u),a=i[f];if(a)o.push(a.promise);else{let c;u.extensions&&u.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?c=s(u):c=Th(new gt,u,t),i[f]={primitive:u,promise:c},o.push(c)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,l=[];for(let h=0,u=o.length;h<u;h++){const f=o[h].material===void 0?fx(this.cache):this.getDependency("material",o[h].material);l.push(f)}return l.push(t.loadGeometries(o)),Promise.all(l).then(function(h){const u=h.slice(0,h.length-1),f=h[h.length-1],a=[];for(let d=0,p=f.length;d<p;d++){const _=f[d],g=o[d];let m;const v=u[d];if(g.mode===sn.TRIANGLES||g.mode===sn.TRIANGLE_STRIP||g.mode===sn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new sf(_,v):new ye(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===sn.TRIANGLE_STRIP?m.geometry=yh(m.geometry,zh):g.mode===sn.TRIANGLE_FAN&&(m.geometry=yh(m.geometry,Ha));else if(g.mode===sn.LINES)m=new uf(_,v);else if(g.mode===sn.LINE_STRIP)m=new El(_,v);else if(g.mode===sn.LINE_LOOP)m=new df(_,v);else if(g.mode===sn.POINTS)m=new Ya(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&mx(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),yn(m,s),g.extensions&&di(i,m,g),t.assignFinalMaterial(m),a.push(m)}for(let d=0,p=a.length;d<p;d++)t.associations.set(a[d],{meshes:e,primitives:d});if(a.length===1)return s.extensions&&di(i,a[0],s),a[0];const c=new $e;s.extensions&&di(i,c,s),t.associations.set(c,{meshes:e});for(let d=0,p=a.length;d<p;d++)c.add(a[d]);return c})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(Kt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new js(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,l=[],h=[];for(let u=0,f=o.length;u<f;u++){const a=o[u];if(a){l.push(a);const c=new ke;s!==null&&c.fromArray(s.array,u*16),h.push(c)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new wl(l,h)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],l=[],h=[],u=[],f=[];for(let a=0,c=i.channels.length;a<c;a++){const d=i.channels[a],p=i.samplers[d.sampler],_=d.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),l.push(this.getDependency("accessor",m)),h.push(this.getDependency("accessor",v)),u.push(p),f.push(_))}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(h),Promise.all(u),Promise.all(f)]).then(function(a){const c=a[0],d=a[1],p=a[2],_=a[3],g=a[4],m=[];for(let M=0,S=c.length;M<S;M++){const E=c[M],T=d[M],C=p[M],x=_[M],b=g[M];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const U=n._createAnimationTracks(E,T,C,x,b);if(U)for(let P=0;P<U.length;P++)m.push(U[P])}const v=new ip(s,void 0,m);return yn(v,i),v})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(l){if(l.isMesh)for(let h=0,u=i.weights.length;h<u;h++)l.morphTargetInfluences[h]=i.weights[h]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],l=i.children||[];for(let u=0,f=l.length;u<f;u++)o.push(n.getDependency("node",l[u]));const h=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),h]).then(function(u){const f=u[0],a=u[1],c=u[2];c!==null&&f.traverse(function(d){d.isSkinnedMesh&&d.bind(c,vx)});for(let d=0,p=a.length;d<p;d++)f.add(a[d]);if(f.userData.pivot!==void 0&&a.length>0){const d=f.userData.pivot,p=a[0];f.pivot=new R().fromArray(d),f.position.x-=d[0],f.position.y-=d[1],f.position.z-=d[2],p.position.set(0,0,0),delete f.userData.pivot}return f})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",l=[],h=i._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return h&&l.push(h),s.camera!==void 0&&l.push(i.getDependency("camera",s.camera).then(function(u){return i._getNodeRef(i.cameraCache,s.camera,u)})),i._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){l.push(u)}),this.nodeCache[e]=Promise.all(l).then(function(u){let f;if(s.isBone===!0?f=new Kh:u.length>1?f=new $e:u.length===1?f=u[0]:f=new pt,f!==u[0])for(let a=0,c=u.length;a<c;a++)f.add(u[a]);if(s.name&&(f.userData.name=s.name,f.name=o),yn(f,s),s.extensions&&di(n,f,s),s.matrix!==void 0){const a=new ke;a.fromArray(s.matrix),f.applyMatrix4(a)}else s.translation!==void 0&&f.position.fromArray(s.translation),s.rotation!==void 0&&f.quaternion.fromArray(s.rotation),s.scale!==void 0&&f.scale.fromArray(s.scale);if(!i.associations.has(f))i.associations.set(f,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const a=i.associations.get(f);i.associations.set(f,{...a})}return i.associations.get(f).nodes=e,f}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new $e;n.name&&(s.name=i.createUniqueName(n.name)),yn(s,n),n.extensions&&di(t,s,n);const o=n.nodes||[],l=[];for(let h=0,u=o.length;h<u;h++)l.push(i.getDependency("node",o[h]));return Promise.all(l).then(function(h){for(let f=0,a=h.length;f<a;f++){const c=h[f];c.parent!==null?s.add(Vv(c)):s.add(c)}const u=f=>{const a=new Map;for(const[c,d]of i.associations)(c instanceof Rn||c instanceof Pt)&&a.set(c,d);return f.traverse(c=>{const d=i.associations.get(c);d!=null&&a.set(c,d)}),a};return i.associations=u(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],l=e.name?e.name:e.uuid,h=[];ti[s.path]===ti.weights?e.traverse(function(c){c.morphTargetInfluences&&h.push(c.name?c.name:c.uuid)}):h.push(l);let u;switch(ti[s.path]){case ti.weights:u=ji;break;case ti.rotation:u=Ji;break;case ti.translation:case ti.scale:u=Qi;break;default:n.itemSize===1?u=ji:u=Qi;break}const f=i.interpolation!==void 0?dx[i.interpolation]:ks,a=this._getArrayFromAccessor(n);for(let c=0,d=h.length;c<d;c++){const p=new u(h[c]+"."+ti[s.path],t.array,a,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=nl(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ji?ux:bu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yx(r,e,t){const n=e.attributes,i=new Pn;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,u=l.max;if(h!==void 0&&u!==void 0){if(i.set(new R(h[0],h[1],h[2]),new R(u[0],u[1],u[2])),l.normalized){const f=nl(Hi[l.componentType]);i.min.multiplyScalar(f),i.max.multiplyScalar(f)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const l=new R,h=new R;for(let u=0,f=s.length;u<f;u++){const a=s[u];if(a.POSITION!==void 0){const c=t.json.accessors[a.POSITION],d=c.min,p=c.max;if(d!==void 0&&p!==void 0){if(h.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),h.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),h.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),c.normalized){const _=nl(Hi[c.componentType]);h.multiplyScalar(_)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(l)}r.boundingBox=i;const o=new In;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Th(r,e,t){const n=e.attributes,i=[];function s(o,l){return t.getDependency("accessor",o).then(function(h){r.setAttribute(l,h)})}for(const o in n){const l=tl[o]||o.toLowerCase();l in r.attributes||i.push(s(n[o],l))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(l){r.setIndex(l)});i.push(o)}return qe.workingColorSpace!==Yt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),yn(r,e),yx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?px(r,e.targets,t):r})}const Ms=[{x:-.88,y:-.36,z:1.58,front:!0},{x:.88,y:-.36,z:1.58,front:!0},{x:-.88,y:-.36,z:-1.64,front:!1},{x:.88,y:-.36,z:-1.64,front:!1}],Mx=.43,Zo=2.6;class Sx{constructor({physics:e,body:t}){this.physics=e,this.RAPIER=e.RAPIER,this.body=t,this.controller=e.world.createVehicleController(t),this.steering=0,this.throttle=0,this.speed=0,this.localSpeed=0,this.groundedWheels=0,this.boostCooldown=0,this.burnoutCharge=0,this.wasBurnout=!1,this.burnoutBlocked=!1,this.forwardHoldTime=0,this.wheelieTimer=0,this.wheelieCooldown=0,this.stuckTimer=0,this.lastCollisionSpeed=0,this.driveState={boost:!1,handbrake:!1,throttle:0,slip:0,burnout:!1,wheelie:!1},this.setupWheels()}setupWheels(){this.radius=Mx;for(const e of Ms)this.controller.addWheel({x:e.x,y:e.y,z:e.z},{x:0,y:-1,z:0},{x:-1,y:0,z:0},.28,this.radius);for(let e=0;e<Ms.length;e+=1)this.controller.setWheelFrictionSlip(e,1.82),this.controller.setWheelSideFrictionStiffness(e,9.8),this.controller.setWheelSuspensionStiffness(e,34),this.controller.setWheelSuspensionCompression(e,12.8),this.controller.setWheelSuspensionRelaxation(e,14.2),this.controller.setWheelMaxSuspensionTravel(e,.18),this.controller.setWheelMaxSuspensionForce(e,430)}update(e,t){const n=e.joystick,i=e.actions.forward||n.y<-.22,s=e.actions.backward||n.y>.22,o=e.actions.left||n.x<-.22,l=e.actions.right||n.x>.22,h=e.actions.handbrake,u=e.actions.brake,f=this.body.linvel(),a=this.getLocalVelocity(f);this.speed=Math.hypot(f.x,f.y*.12,f.z),this.localSpeed=a.z;const c=Math.hypot(f.x,f.z);this.forwardHoldTime=i?this.forwardHoldTime+t:0;const d=i&&(s||u),p=d&&this.forwardHoldTime<.32&&c<8;d?!this.wasBurnout&&!p&&c>=Zo&&(this.burnoutBlocked=!0):this.burnoutBlocked=!1;const _=d&&!this.burnoutBlocked&&(p||c<Zo&&Math.abs(this.localSpeed)<Zo),g=this.wasBurnout&&c<4.2,m=d&&(_||g),v=e.actions.boost&&!m&&!e.actions.handbrake,M=!m&&i&&(u||s&&this.localSpeed>.8),S=Kt.clamp(c/52,0,1),E=Kt.clamp((o?1:0)+(l?-1:0)+Kt.clamp(-n.x,-1,1),-1,1),T=Kt.lerp(.56,.22,S)*(h?1.22:1),C=E*T;this.steering+=(C-this.steering)*Math.min(1,t*(h?10.5:7.8));const x=m?1:M?0:i?1:s?-.58:0,b=x===0?4.4:6.6;this.throttle+=(x-this.throttle)*Math.min(1,t*b);const U=v?102:68,F=this.throttle>=0?U:18,O=Math.max(0,Math.abs(this.localSpeed)-F),B=Kt.clamp(Math.abs(this.localSpeed)/F,0,1.25),H=this.throttle>0&&this.localSpeed<8?1.62:1,k=this.throttle>=0?m?920:v?1080:650:178;let z=this.throttle*k*H*(1-Math.min(.82,B*.72));z/=1+O*.36,v&&i&&c>3&&this.groundedWheels>1&&this.applyHeldBoost(t,f);const Q=!m&&(i&&this.localSpeed<-1.4||s&&this.localSpeed>1.4);let Z=u?42:.08,oe=u?42:.08;Q&&(Z=Math.max(Z,30),oe=Math.max(oe,30)),M&&(Z=Math.max(Z,44),oe=Math.max(oe,44),z=0),h&&(oe=Math.max(oe,38),Z=Math.max(Z,2.5),z*=.64),m&&(Z=Math.max(Z,58),oe=Math.max(oe,5.5),z*=1.2,this.burnoutCharge=Math.min(1.35,this.burnoutCharge+t),this.applyBurnoutHold(t));const pe=this.wasBurnout&&!m&&i&&this.burnoutCharge>.22&&this.wheelieCooldown<=0;!i&&!s&&this.speed<1.8&&(Z=4.2,oe=4.2);for(let le=0;le<Ms.length;le+=1){const De=Ms[le].front,rt=!De;this.controller.setWheelSteering(le,De?this.steering:0),this.controller.setWheelBrake(le,rt?oe:Z),this.controller.setWheelEngineForce(le,rt?z:0),this.controller.setWheelFrictionSlip(le,this.getWheelSlip(De,h,v,m)),this.controller.setWheelSideFrictionStiffness(le,this.getWheelSideFriction(De,h,m))}return this.controller.updateVehicle(Math.min(t,1/45)),this.updateContactState(),pe&&this.launchWheelie(),this.applyDriftAssist(E,h,t),this.stabilizeOnGround(h,E),this.applyAeroGrip(t,h),this.settleDriveNoise(E,i||s,t),this.applyStuckRecovery({forward:i,reverse:s,rawSteer:E},t),this.limitChaos(),this.lastCollisionSpeed=c,this.boostCooldown=Math.max(0,this.boostCooldown-t),this.wheelieCooldown=Math.max(0,this.wheelieCooldown-t),this.wheelieTimer=Math.max(0,this.wheelieTimer-t),!m&&!pe&&(this.burnoutCharge=Math.max(0,this.burnoutCharge-t*1.6)),this.driveState={boost:v,handbrake:h,throttle:this.throttle,burnout:m,wheelie:this.wheelieTimer>0,wheelieLaunch:pe,burnoutCharge:this.burnoutCharge,slip:m?1:h&&this.speed>5?Kt.clamp(this.speed/24,0,1):0},this.wasBurnout=m,{boost:v,handbrake:h,burnout:m,wheelie:this.wheelieTimer>0,wheelieLaunch:pe,grounded:this.groundedWheels>1}}updateContactState(){this.groundedWheels=0;for(let e=0;e<Ms.length;e+=1)this.controller.wheelIsInContact(e)&&(this.groundedWheels+=1)}jump(e=6.2){return this.groundedWheels<2?!1:(this.body.applyImpulse({x:0,y:e*this.body.mass(),z:0},!0),this.body.applyTorqueImpulse({x:.08*this.body.mass(),y:0,z:0},!0),!0)}boost(e,t=18){if(this.boostCooldown>0)return!1;const n=this.body.mass();return this.body.applyImpulse({x:e.x*t*n,y:.08*n,z:e.z*t*n},!0),this.boostCooldown=.62,!0}flipRecovery(){const e=this.body.rotation();if(new R(0,1,0).applyQuaternion(new Et(e.x,e.y,e.z,e.w)).y>.22)return!1;const n=this.body.mass();return this.body.applyImpulse({x:0,y:4.8*n,z:0},!0),this.body.applyTorqueImpulse({x:2.8*n,y:0,z:1.6*n},!0),!0}limitChaos(){const e=this.body.linvel(),t=this.groundedWheels>1?this.wheelieTimer>0?6.8:5.4:10;e.y>t&&this.body.setLinvel({x:e.x,y:t,z:e.z},!0);const n=this.body.angvel(),i=this.wheelieTimer>0?4.8:2.4;this.body.setAngvel({x:Kt.clamp(n.x,-i,i),y:Kt.clamp(n.y,-4.2,4.2),z:Kt.clamp(n.z,-2.4,2.4)},!0)}stabilizeOnGround(e=!1,t=0){if(this.groundedWheels<2)return;const n=this.body.angvel(),i=this.body.rotation(),s=new R(0,1,0).applyQuaternion(new Et(i.x,i.y,i.z,i.w)),o=this.wheelieTimer>0,l=this.body.mass()*(o?.16:e?.5:.76);this.body.applyTorqueImpulse({x:(-n.x*(o?.18:.68)-s.z*(o?.12:.96))*l,y:-n.y*this.body.mass()*(e?.006:Math.abs(t)<.08?.035:.016),z:(-n.z*.68+s.x*.96)*l},!0),!o&&this.speed>5&&this.body.applyImpulse({x:0,y:-Math.min(.92,this.speed*.02)*this.body.mass(),z:0},!0)}applyAeroGrip(e,t=!1){if(this.groundedWheels<2||this.wheelieTimer>0)return;const n=this.body.mass(),i=Math.min(2.45,.48+this.speed*.032)*n*(t?.78:1);this.body.applyImpulse({x:0,y:-i*Math.min(1,e*60)*.022,z:0},!0)}getWheelSlip(e,t,n,i){return i?e?1.55:.58:t?e?1.7:.86:n?2.18:1.94}getWheelSideFriction(e,t,n){return n?e?11.2:1.45:t?e?8.4:2.35:e?10.2:9.4}getLocalVelocity(e){const t=this.body.rotation(),n=new Et(t.x,t.y,t.z,t.w).invert();return new R(e.x,e.y,e.z).applyQuaternion(n)}getForwardVector(){const e=this.body.rotation(),t=new R(0,0,1).applyQuaternion(new Et(e.x,e.y,e.z,e.w));return t.y=0,t.lengthSq()<1e-4?new R(0,0,1):t.normalize()}applyHeldBoost(e,t){const n=this.body.mass(),i=new R(t.x,0,t.z),s=i.lengthSq()>5?i.normalize():this.getForwardVector(),o=n*.46*Math.min(1,e*60);this.body.applyImpulse({x:s.x*o,y:-.01*n,z:s.z*o},!0)}applyBurnoutHold(e){if(this.groundedWheels<2)return;const t=this.body.linvel(),n=Math.pow(.18,Math.min(1,e*9));this.body.setLinvel({x:t.x*n,y:t.y,z:t.z*n},!0);const i=this.body.angvel();this.body.setAngvel({x:i.x*.76,y:i.y*.74,z:i.z*.76},!0)}launchWheelie(){if(this.groundedWheels<2)return!1;const e=Kt.clamp(this.burnoutCharge/1.2,.24,1),t=this.body.mass(),n=this.getForwardVector(),i=this.body.rotation(),s=new R(1,0,0).applyQuaternion(new Et(i.x,i.y,i.z,i.w)).normalize();return this.body.applyImpulse({x:n.x*t*(4.4+e*8.8),y:t*(.34+e*.34),z:n.z*t*(4.4+e*8.8)},!0),this.body.applyTorqueImpulse({x:s.x*-t*(1.55+e*2.75),y:s.y*-t*(1.55+e*2.75),z:s.z*-t*(1.55+e*2.75)},!0),this.wheelieTimer=.92+e*.42,this.wheelieCooldown=.85,this.burnoutCharge=0,!0}applyDriftAssist(e,t,n){if(!t||this.groundedWheels<2||Math.abs(e)<.12||this.speed<5)return;const i=this.body.mass(),s=Math.min(1,n*60);this.body.applyTorqueImpulse({x:0,y:-e*i*.34*s,z:0},!0)}settleDriveNoise(e,t,n){if(this.groundedWheels<3||this.wheelieTimer>0)return;const i=this.body.angvel(),s=t&&Math.abs(e)<.08,o=s?Math.pow(.18,Math.min(1,n*5.2)):Math.pow(.42,Math.min(1,n*2.4)),l=Math.pow(.28,Math.min(1,n*4.5)),h={x:Math.abs(i.x)<.045?0:i.x*l,y:s&&Math.abs(i.y)<.75?0:i.y*o,z:Math.abs(i.z)<.045?0:i.z*l};this.body.setAngvel(h,!0)}applyStuckRecovery(e,t){if(!(e.forward||e.reverse)||this.groundedWheels<2||this.speed>1.15){this.stuckTimer=0;return}if(this.stuckTimer+=t,this.stuckTimer<.48)return;const i=this.body.mass(),s=this.getForwardVector().multiplyScalar(e.forward?1:-1);this.body.applyImpulse({x:s.x*i*.7,y:i*.06,z:s.z*i*.7},!0),Math.abs(e.rawSteer)>.12&&this.body.applyTorqueImpulse({x:0,y:-e.rawSteer*i*.42,z:0},!0),this.stuckTimer=.24}resetTransientState(){this.burnoutCharge=0,this.wasBurnout=!1,this.burnoutBlocked=!1,this.wheelieTimer=0,this.wheelieCooldown=0,this.stuckTimer=0,this.boostCooldown=0,this.forwardHoldTime=0,this.driveState={boost:!1,handbrake:!1,throttle:this.throttle,slip:0,burnout:!1,wheelie:!1}}}const bx=""+new URL("sabre-turbo.glb",import.meta.url).href,Ss=new R(10,1.08,27),Ir=-.88;class wx{constructor({scene:e,physics:t,achievements:n,audio:i}){this.scene=e,this.physics=t,this.achievements=n,this.audio=i,this.RAPIER=t.RAPIER,this.group=new $e,this.group.name="Vehicle",this.modelRoot=new $e,this.modelRoot.position.y=Ir,this.group.add(this.modelRoot),this.wheels=[],this.frontWheels=[],this.speed=0,this.airTime=0,this.lastBoostPad=null,this.distanceAccumulator=0,this.lastPosition=Ss.clone(),this.visualRumbleTime=0,this.trails=[],this.trailGeometry=new $i(.08,8,5),this.smokeGeometry=new $i(.16,10,6),this.createBody(),this.createLights(),this.loadVehicleModel(),this.scene.add(this.group),this.respawn()}createBody(){const e=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(Ss.x,Ss.y,Ss.z).setCanSleep(!1).setLinearDamping(.34).setAngularDamping(1.85);this.body=this.physics.world.createRigidBody(e);const t=this.RAPIER.ColliderDesc.cuboid(1.12,.25,2.42).setDensity(1.42).setFriction(1).setRestitution(.01);t.setTranslation(0,-.2,-.02),this.physics.world.createCollider(t,this.body);const n=this.RAPIER.ColliderDesc.cuboid(.96,.16,1.78).setDensity(3.35).setFriction(1.05).setRestitution(0);n.setTranslation(0,-.58,-.12),this.physics.world.createCollider(n,this.body);const i=this.RAPIER.ColliderDesc.cuboid(.64,.18,.62).setDensity(.12).setFriction(.72).setRestitution(.02);i.setTranslation(0,.3,-.1),this.physics.world.createCollider(i,this.body),this.body.setAdditionalMassProperties(6.4,{x:0,y:-.66,z:-.14},{x:5,y:4.6,z:5.9},{x:0,y:0,z:0,w:1},!0),this.controller=new Sx({physics:this.physics,body:this.body})}createLights(){for(const e of[-.62,.62]){const t=new fu(16773316,4.8,26,Math.PI/10,.45,1.6);t.position.set(e,.78+Ir,2.86),t.target.position.set(e,.32+Ir,10),this.group.add(t,t.target)}}loadVehicleModel(){new Mu().load(bx,t=>this.installVehicleModel(t.scene),void 0,t=>{console.error("Vehicle model failed to load",t),this.createFallbackModel()})}installVehicleModel(e){this.modelRoot.clear(),e.name="VehicleModel_SabreTurboGLB";const t=new Map;e.traverse(n=>{n.isMesh&&(n.castShadow=!0,n.receiveShadow=!1,n.material=wu(n.material,t,n.name),n.material?.transparent&&(n.renderOrder=7))}),this.modelRoot.add(e),this.wheels=[],this.frontWheels=[],e.traverse(n=>{n.name.startsWith("WheelSpin")&&this.wheels.push(n),n.name.startsWith("WheelFront")&&this.frontWheels.push(n)})}createFallbackModel(){const e=new ye(new Ut(2.2,.72,5),new dt({color:10304534,roughness:.38,metalness:.35}));e.position.y=.45,e.castShadow=!0,e.receiveShadow=!0,this.modelRoot.add(e)}update(e,t){const n=this.body.translation(),i=Math.hypot(n.x,n.z);if(n.y<-12||i>ft+8||Math.abs(n.x)>Bt+18||Math.abs(n.z)>Bt+18){this.respawn();return}const s=this.controller.update(e,t);this.speed=this.controller.speed,s.boost&&this.controller.speed>3&&this.achievements.unlock("boost"),e.consume("jump")&&(this.controller.jump()?(this.achievements.unlock("jump"),this.audio.click(760)):this.controller.flipRecovery()&&this.audio.click(480)),e.consume("honk")&&(this.audio.click(320),this.body.applyImpulse({x:0,y:1.8*this.body.mass(),z:0},!0)),e.consume("respawn")&&this.respawn(),this.trackDistance(),this.syncModel(),this.updateVisualRumble(t),this.updateWheelVisuals(t),this.updateTrails(t),s.burnout&&this.spawnRearSmoke(!0),s.wheelie&&this.controller.speed>4&&this.spawnRearSmoke(!1),(this.controller.speed>10||s.handbrake&&this.controller.speed>4)&&this.spawnTrail(s.boost,s.handbrake)}postPhysics(){this.syncModel(),this.updateVisualRumble(0)}idleDampen(){const e=this.body.linvel();this.body.setLinvel({x:e.x*.94,y:e.y,z:e.z*.94},!0),this.syncModel()}trackDistance(){const e=this.position,t=e.distanceTo(this.lastPosition);t<6&&(this.distanceAccumulator+=t,this.achievements.addDistance(t)),this.lastPosition.copy(e)}syncModel(){const e=this.body.translation(),t=this.body.rotation();this.group.position.set(e.x,e.y,e.z),this.group.quaternion.set(t.x,t.y,t.z,t.w)}updateVisualRumble(e){this.visualRumbleTime+=e*(1+Math.min(3.2,this.speed*.035));const t=this.controller?.driveState||{},n=t.burnout?.022:t.wheelie?.012:Math.min(.008,this.speed*12e-5),i=this.speed<1?.003:0,s=n+i;this.modelRoot.position.set(0,Ir+Math.sin(this.visualRumbleTime*35)*s,0),this.modelRoot.rotation.set(Math.sin(this.visualRumbleTime*22)*s*.18,0,Math.sin(this.visualRumbleTime*29)*s*.12)}updateWheelVisuals(e){for(const t of this.wheels)t.rotation.x+=this.controller.speed*e*4.2;for(const t of this.frontWheels)t.rotation.y=this.controller.steering}spawnTrail(e,t=!1){if(this.trails.length>45)return;const n=new R(0,.2,-2.6).applyQuaternion(this.group.quaternion).add(this.group.position),i=new ye(this.trailGeometry,new Rt({color:e?16751180:t?13620431:7299664,transparent:!0,opacity:e?.18:t?.16:.09,depthWrite:!1}));i.position.set(n.x+(Math.random()-.5)*.7,Math.max(.25,n.y),n.z+(Math.random()-.5)*.7),this.scene.add(i),this.trails.push({mesh:i,life:e?.46:t?.38:.28,velocity:new R((Math.random()-.5)*.28,.16+Math.random()*.18,(Math.random()-.5)*.28)})}spawnRearSmoke(e=!1){if(this.trails.length>82)return;const t=[-.88,.88];for(const n of t){const s=new R(n,-.42,-1.78).applyQuaternion(this.group.quaternion).add(this.group.position),o=new ye(this.smokeGeometry,new Rt({color:e?14604491:13222581,transparent:!0,opacity:e?.28:.16,depthWrite:!1}));o.position.set(s.x+(Math.random()-.5)*.36,Math.max(.2,s.y),s.z+(Math.random()-.5)*.36),this.scene.add(o),this.trails.push({mesh:o,life:e?.72:.42,velocity:new R((Math.random()-.5)*.38,.22+Math.random()*.22,(Math.random()-.5)*.38)})}}updateTrails(e){for(let t=this.trails.length-1;t>=0;t-=1){const n=this.trails[t];n.life-=e,n.mesh.position.addScaledVector(n.velocity,e),n.mesh.scale.multiplyScalar(1+e*.9),n.mesh.material.opacity=Math.max(0,n.life)*.42,n.life<=0&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.trails.splice(t,1))}}boostFromPad(e){if(!e||this.lastBoostPad===e.id)return!1;const t=this.body.linvel(),n=new R(t.x,0,t.z);let i=n.lengthSq()>1?n.normalize():new R(0,0,1).applyQuaternion(this.group.quaternion).normalize();return this.controller.boost(i,26)?(this.lastBoostPad=e.id,this.achievements.unlock("boost_pad"),this.audio.click(940),window.setTimeout(()=>{this.lastBoostPad===e.id&&(this.lastBoostPad=null)},900),!0):!1}respawn(e=Ss,t=0){this.body.setTranslation({x:e.x,y:e.y,z:e.z},!0),this.body.setRotation(Tx(t),!0),this.body.setLinvel({x:0,y:0,z:0},!0),this.body.setAngvel({x:0,y:0,z:0},!0),this.controller?.resetTransientState(),this.speed=0,this.lastPosition.copy(e),this.syncModel()}get position(){const e=this.body.translation();return new R(e.x,e.y,e.z)}get heading(){const e=this.body.rotation(),t=new Et(e.x,e.y,e.z,e.w),n=new R(0,0,1).applyQuaternion(t);return Math.atan2(n.x,n.z)}}function Tx(r){const e=new Et().setFromEuler(new cn(0,r,0));return{x:e.x,y:e.y,z:e.z,w:e.w}}function wu(r,e,t=""){if(Array.isArray(r))return r.map(l=>wu(l,e,t));if(!r)return r;const n=r.name||"",i=t.includes("Windshield")&&!t.includes("Reflection")&&!t.includes("Wiper"),s=`${n}:${i?"windshield":"standard"}`;if(e.has(s))return e.get(s);let o=r;if(n.includes("metallic_paint")||n.includes("cabin_paint")){const l=n.includes("cabin");o=new tn({name:n,color:l?10823954:12530964,metalness:l?.62:.72,roughness:l?.33:.27,clearcoat:.78,clearcoatRoughness:.2}),Ex(o,l)}else(n.includes("reflective_glass")||n.includes("smoked")||n.includes("glass"))&&(o=i?new tn({name:n,color:1583921,metalness:0,roughness:.045,clearcoat:.96,clearcoatRoughness:.04,transparent:!1,opacity:1,depthWrite:!0,side:Xt}):new tn({name:n,color:2705743,metalness:0,roughness:.06,clearcoat:.82,clearcoatRoughness:.06,transparent:!0,opacity:.78,depthWrite:!1,side:Xt}));return e.set(s,o),o}function Ex(r,e=!1){r.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vSabrePaintPosition;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vSabrePaintPosition = position;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vSabrePaintPosition;
float sabreHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float sabreNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = sabreHash(i);
  float b = sabreHash(i + vec2(1.0, 0.0));
  float c = sabreHash(i + vec2(0.0, 1.0));
  float d = sabreHash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}`).replace("#include <color_fragment>",`#include <color_fragment>
float sabreFleck = sabreNoise(vSabrePaintPosition.xz * 21.0 + vSabrePaintPosition.yy * 5.0);
float sabreFine = sabreNoise(vSabrePaintPosition.xy * 58.0 + vSabrePaintPosition.zz * 4.0);
float sabreBrush = sin((vSabrePaintPosition.z + vSabrePaintPosition.y * 0.18) * 42.0) * 0.5 + 0.5;
float sabreShade = ${e?"0.995":"1.02"} + sabreFleck * 0.045 + sabreFine * 0.018 + sabreBrush * 0.012;
diffuseColor.rgb *= sabreShade;
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.20, 0.055), ${e?"0.08":"0.14"});
diffuseColor.rgb += vec3(0.055, 0.018, 0.004) * sabreFine;`)},r.customProgramCacheKey=()=>`sabre-object-paint-grain-${e?"dark":"red"}`}class Ax{constructor(e,t,n){this.camera=e,this.vehicle=t,this.input=n,this.focus=new R,this.smoothedTarget=new R,this.mode="follow",this.cinematicTarget=null,this.cinematicPosition=null,this.baseFov=e.fov}setCinematic(e,t){this.mode="cinematic",this.cinematicPosition=e.clone(),this.cinematicTarget=t.clone()}clearCinematic(){this.mode="follow",this.cinematicPosition=null,this.cinematicTarget=null}update(e){if(this.mode==="cinematic"&&this.cinematicPosition&&this.cinematicTarget){this.camera.position.lerp(this.cinematicPosition,1-Math.pow(.002,e)),this.smoothedTarget.lerp(this.cinematicTarget,1-Math.pow(.004,e)),this.camera.lookAt(this.smoothedTarget);return}const t=this.vehicle.position,n=this.vehicle.body.rotation(),i=new Et(n.x,n.y,n.z,n.w),s=new R(0,0,1).applyQuaternion(i).setY(0).normalize(),o=new R(1,0,0).applyQuaternion(i).setY(0).normalize(),l=this.vehicle.body.linvel(),h=new R(l.x,0,l.z).dot(o),u=Kt.clamp(h/12,-1.8,1.8),f=this.vehicle.controller?.driveState||{},a=this.input.pointer.orbitX,c=new Et().setFromAxisAngle(new R(0,1,0),a),d=s.clone().applyQuaternion(c),p=Kt.clamp(Math.abs(this.vehicle.speed)*.16,0,4),_=this.input.pointer.zoom,g=this.input.pointer.orbitY,m=t.clone().add(new R(0,1.35,0)).addScaledVector(d,4.2).addScaledVector(o,u*.22),v=t.clone().addScaledVector(d,(-13.5-p)*_).addScaledVector(o,-u*(f.handbrake?1.05:.58)).add(new R(0,7.2+p*.18+g*4.5,0)),M=1-Math.pow(.001,e),S=1-Math.pow(5e-4,e);this.camera.position.lerp(v,M*.62),this.smoothedTarget.lerp(m,S*.7);const E=this.baseFov+Math.min(6.5,Math.abs(this.vehicle.speed)*.12)+(f.boost?2.4:0)+(f.handbrake?1.2:0);this.camera.fov+=(E-this.camera.fov)*Math.min(1,e*4.2),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.smoothedTarget)}}const Rx=""+new URL("island-visual.glb",import.meta.url).href,Cx=""+new URL("island-physics.glb",import.meta.url).href,Px=""+new URL("medieval-props.glb",import.meta.url).href;async function Ix(){const r=new Mu,e=new Map,t=new Map;return await Promise.all([jo(r,"islandVisual",Rx,e,t),jo(r,"islandPhysics",Cx,e,t),jo(r,"medievalProps",Px,e,t)]),{has(n){return t.has(n)},clone(n){const i=t.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0,o.material&&(o.material=o.material.clone()))}),s},cloneScene(n){const i=e.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.visible=!0,o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0,o.material&&(o.material=o.material.clone()))}),s}}}async function jo(r,e,t,n,i){try{const o=(await r.loadAsync(t)).scene;o.name=e,o.visible=!1,n.set(e,o),o.traverse(l=>{l.parent===o&&(l.name.startsWith("Env")||l.name.startsWith("VIS_")||l.name.startsWith("PHY_")||l.name.startsWith("SPAWN_")||l.name.startsWith("ZONE_"))&&(l.visible=!1,i.set(l.name,l)),l.isMesh&&(l.castShadow=!0,l.receiveShadow=!0)})}catch(s){console.error(`Environment asset pack failed to load: ${e}`,s)}}const zr=-.55,Gn={low:{trees:30,grassTufts:110,leaves:50,clouds:8,props:22,fireflies:18,shadows:!1,water:"low"},medium:{trees:58,grassTufts:300,leaves:135,clouds:16,props:44,fireflies:46,shadows:!0,water:"medium"},high:{trees:86,grassTufts:640,leaves:260,clouds:28,props:72,fireflies:90,shadows:!0,water:"high"}},Jo=["low","medium","high"];function Lx(){const r=Ox(1024);r.wrapS=rn,r.wrapT=rn,r.repeat.set(58,58),r.magFilter=wt,r.minFilter=wn,r.anisotropy=12;const e=Fx(["#625d50","#6c6556","#786f5d","#575247"],256,720);e.wrapS=rn,e.wrapT=rn,e.repeat.set(2,18);const t=Ux(512);return t.wrapS=rn,t.wrapT=rn,t.repeat.set(18,18),t.anisotropy=12,{ground:new dt({color:3501871,map:r,roughness:.96,metalness:.01,vertexColors:!1,side:Xt}),stoneRoad:new dt({color:6314573,map:e,roughness:.94,metalness:.02}),roadEdge:new dt({color:4670009,roughness:.92,metalness:.02}),roadLine:new Rt({color:14206090,transparent:!0,opacity:.36}),stuntRamp:new dt({color:8413770,roughness:.88,metalness:.02}),sand:new dt({color:16045466,map:t,roughness:.98,metalness:0}),grassSandBlend:Qo({inner:136,outer:151,colorA:2382630,colorB:15255943,opacity:.58,noise:.28}),wetSandBlend:Qo({inner:151,outer:166,colorA:13741422,colorB:7327184,opacity:.48,noise:.2}),shoreWash:Qo({inner:158,outer:190,colorA:9298141,colorB:682132,opacity:.36,noise:.32,animated:!0}),cliff:new dt({color:6050118,roughness:.92,metalness:.01}),shallow:new Rt({color:7984848,transparent:!0,opacity:.16,depthWrite:!1}),foam:new Rt({color:15859702,transparent:!0,opacity:.26,depthWrite:!1}),wood:new dt({color:7029797,roughness:.86,metalness:.02}),darkWood:new dt({color:2890257,roughness:.88,metalness:.03}),stone:new dt({color:8550760,roughness:.86,metalness:.04}),paleStone:new dt({color:12892573,roughness:.82,metalness:.03}),roof:new dt({color:2701381,roughness:.78,metalness:.08}),bannerRed:new dt({color:10760496,roughness:.78,metalness:.03}),bannerBlue:new dt({color:2973574,roughness:.78,metalness:.03}),gold:new dt({color:14727503,roughness:.42,metalness:.45}),glass:new dt({color:7985151,roughness:.22,metalness:.08,transparent:!0,opacity:.62}),glow:new Rt({color:9437136,transparent:!0,opacity:.72}),potato:new dt({color:11891755,roughness:.94,metalness:0}),crop:new dt({color:6531408,roughness:.9,metalness:0}),water:Nx(),leaf:new Kr({color:16757436,map:Eh("petal"),size:.12,transparent:!0,opacity:.62,alphaTest:.08,depthWrite:!1,sizeAttenuation:!0}),firefly:new Kr({color:13107082,map:Eh("round"),size:.1,transparent:!0,opacity:.8,alphaTest:.05,depthWrite:!1,sizeAttenuation:!0})}}function Dx(r,e=160){const t=new yi(r,e),n=t.attributes.position,i=[],s=new fe(2050597),o=new fe(3501871),l=new fe(6262594),h=new fe(9008717),u=new fe;for(let f=0;f<n.count;f+=1){const a=n.getX(f),c=n.getY(f),d=Math.hypot(a,c)/r,p=Te(f*13.71)*.18,_=Kt.smoothstep(d,.74,1);u.copy(s).lerp(o,Math.min(1,d*.85+p)),u.lerp(l,Math.max(0,.55-d)*.45),u.lerp(h,_*.45),i.push(u.r,u.g,u.b),n.setZ(f,(Te(f*9.17)-.5)*.12)}return t.setAttribute("color",new Ze(i,3)),t.rotateX(-Math.PI/2),t.computeVertexNormals(),t}function _i(r,e,t=160,n=3.4){const i=new nu;for(let l=0;l<=t;l+=1){const h=l/t*Math.PI*2,u=e+(Te(l*4.11)-.5)*n,f=Math.cos(h)*u,a=Math.sin(h)*u;l===0?i.moveTo(f,a):i.lineTo(f,a)}const s=new Ka;for(let l=t;l>=0;l-=1){const h=l/t*Math.PI*2,u=r+(Te(l*5.77)-.5)*n*.45,f=Math.cos(h)*u,a=Math.sin(h)*u;l===t?s.moveTo(f,a):s.lineTo(f,a)}i.holes.push(s);const o=new Il(i);return o.rotateX(-Math.PI/2),o.computeVertexNormals(),o}function Nx(){return new Ct({transparent:!0,depthWrite:!1,uniforms:{time:{value:0},deep:{value:new fe(409190)},shallow:{value:new fe(3721171)},sun:{value:new fe(16773560)}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vWave;
      uniform float time;
      void main() {
        vUv = uv;
        vec3 transformed = position;
        float waveA = sin(position.x * 0.04 + time * 0.72) * 0.22;
        float waveB = cos(position.y * 0.055 - time * 0.48) * 0.15;
        float chop = sin((position.x + position.y) * 0.12 + time * 1.2) * 0.035;
        float wave = waveA + waveB + chop;
        transformed.z += wave;
        vWave = wave;
        vWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vWave;
      uniform vec3 deep;
      uniform vec3 shallow;
      uniform vec3 sun;
      uniform float time;
      void main() {
        float longBands = sin((vUv.x * 32.0 + vUv.y * 19.0) + time * 0.75) * 0.5 + 0.5;
        float fineBands = sin((vUv.x - vUv.y) * 145.0 - time * 1.15) * 0.5 + 0.5;
        float depthFade = smoothstep(-180.0, 150.0, vWorld.z + vWorld.x * 0.12);
        float sparkle = pow(max(0.0, fineBands * longBands), 8.0) * 0.24;
        vec3 color = mix(deep, shallow, smoothstep(0.12, 0.95, depthFade + vWave * 0.25));
        color += longBands * 0.035 + sparkle * sun;
        color = mix(color, vec3(0.72, 0.94, 0.98), 0.08);
        gl_FragColor = vec4(color, 0.84);
      }
    `})}function Eh(r="round"){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t.clearRect(0,0,64,64),r==="petal"){t.translate(32,32),t.rotate(-.55);const i=t.createRadialGradient(-5,-3,3,0,0,24);i.addColorStop(0,"rgba(255, 244, 247, 1)"),i.addColorStop(.55,"rgba(255, 178, 188, 0.88)"),i.addColorStop(1,"rgba(255, 178, 188, 0)"),t.fillStyle=i,t.beginPath(),t.ellipse(0,0,22,10,0,0,Math.PI*2),t.fill()}else{const i=t.createRadialGradient(32,32,2,32,32,30);i.addColorStop(0,"rgba(255, 255, 220, 1)"),i.addColorStop(.42,"rgba(199, 255, 138, 0.85)"),i.addColorStop(1,"rgba(199, 255, 138, 0)"),t.fillStyle=i,t.fillRect(0,0,64,64)}const n=new Ks(e);return n.colorSpace=Tt,n.needsUpdate=!0,n}function Qo({inner:r,outer:e,colorA:t,colorB:n,opacity:i=.5,noise:s=.2,animated:o=!1}){return new Ct({transparent:!0,depthWrite:!1,uniforms:{inner:{value:r},outer:{value:e},colorA:{value:new fe(t)},colorB:{value:new fe(n)},opacity:{value:i},noiseAmount:{value:s},time:{value:0},animated:{value:o?1:0}},vertexShader:`
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        vPos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vPos;
      varying vec2 vUv;
      uniform float inner;
      uniform float outer;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float opacity;
      uniform float noiseAmount;
      uniform float time;
      uniform int animated;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      void main() {
        float radius = length(vPos.xz);
        float t = smoothstep(inner, outer, radius);
        float featherIn = smoothstep(inner, inner + (outer - inner) * 0.32, radius);
        float featherOut = 1.0 - smoothstep(outer - (outer - inner) * 0.34, outer, radius);
        float n = noise(vPos.xz * 0.075 + vec2(time * 0.045 * float(animated), -time * 0.025 * float(animated)));
        float brokenEdge = 1.0 + (n - 0.5) * noiseAmount;
        float alpha = featherIn * featherOut * opacity * brokenEdge;
        vec3 color = mix(colorA, colorB, clamp(t + (n - 0.5) * 0.18, 0.0, 1.0));
        gl_FragColor = vec4(color, clamp(alpha, 0.0, opacity));
      }
    `})}function Fx(r,e=256,t=800){const n=document.createElement("canvas");n.width=e,n.height=e;const i=n.getContext("2d");i.fillStyle=r[0],i.fillRect(0,0,e,e);for(let s=0;s<t;s+=1){i.fillStyle=r[Math.floor(Te(s*11.3)*r.length)];const o=Te(s*17.1)*e,l=Te(s*23.7)*e,h=.7+Te(s*31.1)*2.5;i.globalAlpha=.08+Te(s*7.5)*.12,i.beginPath(),i.arc(o,l,h,0,Math.PI*2),i.fill()}return i.globalAlpha=1,new Ks(n)}function Ux(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,r,r);n.addColorStop(0,"#d1a869"),n.addColorStop(.45,"#f0d392"),n.addColorStop(1,"#b9894e"),t.fillStyle=n,t.fillRect(0,0,r,r);for(let i=0;i<9e3;i+=1){const s=Te(i*2.13)*r,o=Te(i*3.79)*r,l=.45+Te(i*5.11)*1.4,h=Te(i*7.71);t.globalAlpha=.08+Te(i*11.17)*.14,t.fillStyle=h>.54?"#fff1be":"#8f6538",t.beginPath(),t.arc(s,o,l,0,Math.PI*2),t.fill()}for(let i=0;i<90;i+=1){const s=Te(i*17.3)*r,o=Te(i*19.9)*r;t.globalAlpha=.05,t.strokeStyle="#7d5a35",t.lineWidth=1+Te(i*23.5)*2,t.beginPath(),t.ellipse(s,o,14+Te(i*29.1)*38,2+Te(i*31.7)*6,Te(i*37.1)*Math.PI,0,Math.PI*2),t.stroke()}return t.globalAlpha=1,new Ks(e)}function Ox(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d");t.fillStyle="#1e4d21",t.fillRect(0,0,r,r);for(let n=0;n<24e3;n+=1){const i=Te(n*2.37)*r,s=Te(n*5.81)*r,o=2+Te(n*7.61)*9,l=-Math.PI/2+(Te(n*11.43)-.5)*.9,h=Te(n*13.17);t.globalAlpha=.06+Te(n*17.77)*.16,t.strokeStyle=h>.68?"#76a84b":h>.32?"#2e6d2b":"#102f18",t.lineWidth=.55+Te(n*19.21)*1.1,t.beginPath(),t.moveTo(i,s),t.lineTo(i+Math.cos(l)*o,s+Math.sin(l)*o),t.stroke()}for(let n=0;n<520;n+=1){const i=Te(n*23.31)*r,s=Te(n*31.27)*r,o=6+Te(n*41.13)*22;t.globalAlpha=.035,t.fillStyle=Te(n*47.4)>.55?"#669c46":"#0d2815",t.beginPath(),t.ellipse(i,s,o,o*(.25+Te(n*53.3)*.4),Te(n*59.7)*Math.PI,0,Math.PI*2),t.fill()}return t.globalAlpha=1,new Ks(e)}function Te(r){return Math.sin(r*999.91)*43758.5453%1+(Math.sin(r*999.91)*43758.5453<0?1:0)}class Bx{constructor(e){this.world=e,this.clouds=[],this.sunDisk=null}build(){this.createSkyDome(),this.createClouds()}createSkyDome(){const e=new $i(Bt*3.2,48,24),t=new Ct({side:qt,uniforms:{zenith:{value:new fe(3055337)},upper:{value:new fe(7787007)},horizon:{value:new fe(15914666)},low:{value:new fe(11135220)}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vWorldPosition;
        uniform vec3 zenith;
        uniform vec3 upper;
        uniform vec3 horizon;
        uniform vec3 low;
        void main() {
          float h = normalize(vWorldPosition).y * 0.5 + 0.5;
          vec3 color = mix(low, horizon, smoothstep(0.02, 0.2, h));
          color = mix(color, upper, smoothstep(0.18, 0.62, h));
          color = mix(color, zenith, smoothstep(0.58, 1.0, h));
          float glow = pow(max(0.0, h), 5.0);
          color += glow * vec3(0.02, 0.04, 0.08);
          gl_FragColor = vec4(color, 1.0);
        }
      `}),n=new ye(e,t);n.name="MedievalIslandSkyDome",this.world.scene.add(n);const i=new Rt({color:16770213,transparent:!0,opacity:.78,depthWrite:!1});this.sunDisk=new ye(new yi(18,48),i),this.sunDisk.name="CinematicSunDisk",this.sunDisk.position.set(-155,84,-125),this.sunDisk.lookAt(0,22,0),this.world.scene.add(this.sunDisk)}createClouds(){const e=Gn.high.clouds;for(let t=0;t<e;t+=1){const n=new $e;n.name=`Cloud_${t}`;const i=new Rt({color:t%4===0?16773853:16777215,transparent:!0,opacity:.64,depthWrite:!1}),s=6+t%4;for(let h=0;h<s;h+=1){const u=new ye(new Zs(3.2+h%3*.55,2),i);u.position.set((h-s/2)*3.1,Math.sin(h*1.8)*.7,Math.cos(h*2.1)*1.65),u.scale.set(1.55+h%2*.28,.46,.84+h%3*.12),n.add(u)}const o=t/e*Math.PI*2,l=132+t%5*26;n.position.set(Math.cos(o)*l,58+t%4*6,Math.sin(o)*l),n.rotation.y=o,n.scale.setScalar(.9+t%5*.12),this.world.scene.add(n),this.clouds.push(n)}this.applyQuality()}applyQuality(){const e=this.world.getQualityProfile();for(let t=0;t<this.clouds.length;t+=1)this.clouds[t].visible=t<e.clouds}update(e,t){this.sunDisk&&(this.sunDisk.material.opacity=.68+Math.sin(t*.18)*.06);for(let n=0;n<this.clouds.length;n+=1){const i=this.clouds[n];i.rotation.y+=e*(.01+n*35e-5),i.position.x+=Math.sin(t*.035+n)*e*.1,i.position.z+=Math.cos(t*.025+n*.7)*e*.06}}}class kx{constructor(e){this.world=e,this.trees=[],this.grassTufts=[],this.leafCloud=null,this.fireflies=null}build(){this.placeTrees(),this.placeGrass(),this.createFallingLeaves(),this.createFireflies(),this.applyQuality()}applyQuality(){const e=this.world.getQualityProfile();for(let t=0;t<this.trees.length;t+=1)this.trees[t].visible=t<e.trees;for(let t=0;t<this.grassTufts.length;t+=1)this.grassTufts[t].mesh.visible=t<e.grassTufts;this.leafCloud?.geometry.setDrawRange(0,e.leaves),this.fireflies?.geometry.setDrawRange(0,e.fireflies)}placeTrees(){const e=Gn.high.trees,t=Math.ceil(e/Xo.length);let n=0;for(let i=0;i<Xo.length&&n<e;i+=1){const s=Xo[i],o=Math.min(e-n,t+(s.kind==="grove"?4:s.kind==="meadow"?-2:0));let l=0;for(let h=0;h<360&&l<o;h+=1){const u=i*1e3+h,f=s.center[0]+(Te(u*7.13)-.5)*s.size[0],a=s.center[1]+(Te(u*9.41)-.5)*s.size[1],c=Math.hypot(f,a);if(c>ft*.86||c<18||!this.world.isClearForProp(f,a,4.6))continue;const d=zx(s,u),p=this.world.cloneEnvironmentAsset(d)||this.createFallbackTree();p.position.set(f,.04,a),p.rotation.y=Te(u*13.3)*Math.PI*2;const _=.82+Te(u*17.1)*.55;p.scale.setScalar(_),this.world.scene.add(p),this.world.decor.push({type:"tree",mesh:p}),this.trees.push(p),this.addTreeCollider(f,a,_),n+=1,l+=1}}}placeGrass(){const e=this.world.cloneEnvironmentAsset("EnvGrassTuft"),t=new $s(.12,1,5);for(let n=0;n<Gn.high.grassTufts;n+=1){const i=Math.sqrt(Te(n*8.1))*ft*.78,s=Te(n*5.3)*Math.PI*2,o=Math.cos(s)*i,l=Math.sin(s)*i;if(!this.world.isClearForProp(o,l,1.3))continue;const h=e?e.clone(!0):new ye(t,this.world.materials.crop);h.position.set(o,.05,l),h.rotation.y=Te(n*19.4)*Math.PI*2;const u=.45+Te(n*22.9)*.78;h.scale.set(u,u,u),this.world.scene.add(h),this.grassTufts.push({mesh:h,baseRotationY:h.rotation.y,baseScale:u,x:o,z:l})}}createFallingLeaves(){const e=Gn.high.leaves,t=new gt,n=new Float32Array(e*3),i=[];for(let l=0;l<e;l+=1){const h=Math.sqrt(Te(l*1.7))*ft*.78,u=Te(l*2.3)*Math.PI*2;n[l*3]=Math.cos(u)*h,n[l*3+1]=4+Te(l*3.1)*18,n[l*3+2]=Math.sin(u)*h,i.push(Te(l*4.4)*Math.PI*2)}t.setAttribute("position",new yt(n,3));const s=this.world.materials.leaf,o=new Ya(t,s);o.name="MedievalIslandFallingLeaves",this.world.scene.add(o),this.leafCloud={mesh:o,geometry:t,phases:i}}createFireflies(){const e=Gn.high.fireflies,t=new gt,n=new Float32Array(e*3),i=[];for(let o=0;o<e;o+=1){const l=Math.sqrt(Te(o*4.9))*ft*.62,h=Te(o*6.1)*Math.PI*2;n[o*3]=Math.cos(h)*l,n[o*3+1]=1.1+Te(o*7.2)*3.2,n[o*3+2]=Math.sin(h)*l,i.push(Te(o*8.3)*Math.PI*2)}t.setAttribute("position",new yt(n,3));const s=new Ya(t,this.world.materials.firefly);s.name="MedievalIslandFireflies",this.world.scene.add(s),this.fireflies={mesh:s,geometry:t,phases:i}}update(e,t,n){if(this.updateLeaves(e,t),this.updateGrass(n,t),this.fireflies){const i=this.fireflies.geometry.attributes.position;for(let s=0;s<i.count;s+=1){const o=this.fireflies.phases[s];i.setY(s,i.getY(s)+Math.sin(t*1.4+o)*.0025)}i.needsUpdate=!0,this.fireflies.mesh.material.opacity=.5+Math.sin(t*1.6)*.18}}updateLeaves(e,t){if(!this.leafCloud)return;const n=this.leafCloud.geometry.attributes.position,i=this.world.getQualityProfile(),s=Math.min(i.leaves,n.count);for(let o=0;o<s;o+=1){const l=this.leafCloud.phases[o];n.setX(o,n.getX(o)+Math.sin(t*.8+l)*e*.4),n.setY(o,n.getY(o)-e*(.55+Te(o*3.6)*.55)),n.setZ(o,n.getZ(o)+Math.cos(t*.7+l)*e*.35),n.getY(o)<.35&&n.setY(o,8+Te(o*5.2)*14)}n.needsUpdate=!0}updateGrass(e,t){if(!e)return;const n=this.world.getQualityProfile(),i=Math.min(n.grassTufts,this.grassTufts.length);for(let s=0;s<i;s+=1){const o=this.grassTufts[s],l=e.x-o.x,h=e.z-o.z,u=Math.hypot(l,h),f=Math.max(0,1-u/5),a=Math.sin(t*1.5+o.x*.07+o.z*.04)*.08;o.mesh.rotation.z=a+f*.34,o.mesh.scale.y=o.baseScale*(1-f*.28+Math.sin(t*1.2+s)*.02)}}createFallbackTree(){const e=new $e,t=new ye(new qn(.28,.38,3,8),this.world.materials.wood);t.position.y=1.5;const n=new ye(new Zs(1.6,1),this.world.materials.crop);return n.position.y=3.35,e.add(t,n),e}addTreeCollider(e,t,n){const i=.82*n,s=.2*n;this.world.physics.createFixedCylinder([e,i,t],i,s,{friction:.88,restitution:.01})}}function zx(r,e){const t=Te(e*11.31);return r.kind==="coast"?t>.35?"EnvCypressTree":"EnvBlossomTree":r.kind==="meadow"?t>.58?"EnvBlossomTree":"EnvOakTree":r.kind==="farm"?t>.42?"EnvBlossomTree":"EnvOakTree":t>.22?"EnvBlossomTree":"EnvOakTree"}class Vx{constructor(e){this.world=e,this.group=null,this.counterTexture=null,this.counterMaterial=null,this.count=0}build(){const e=this.world.zones.find(t=>t.id==="potato");e&&(this.group=new $e,this.group.name="ZONE_potato_voxel_farm",this.group.position.copy(e.position),this.group.rotation.y=e.rotation||0,this.world.scene.add(this.group),this.addField(),this.addCounter(),this.addSummonPad(),this.addFenceColliders(e))}addField(){const e=this.world.cloneEnvironmentAsset("EnvPotatoFarm");if(e){e.name="EnvPotatoFarm_BlockyVoxelField",e.position.set(0,0,0),e.rotation.y=0,this.group.add(e);return}for(let t=-3;t<=3;t+=1)for(let n=-4;n<=4;n+=1){const i=n===0,s=new ye(new Ut(1.25,.34,1.25),i?this.world.materials.water:this.world.materials.darkWood);if(s.position.set(n*1.34,.16,t*1.34),this.group.add(s),!i&&(t+n)%2===0){const o=this.world.cloneEnvironmentAsset("EnvPotatoCrop")||new ye(new Ut(.42,.62,.42),this.world.materials.crop);o.position.set(n*1.34,.68,t*1.34),o.rotation.y=Te((t+8)*(n+10))*Math.PI*2,this.group.add(o)}}this.addFence()}addFence(){const e=this.world.cloneEnvironmentAsset("EnvFencePost");for(let t=-6;t<=6;t+=1.5)this.addFencePiece(e,t,.8,-5.5,0),this.addFencePiece(e,t,.8,5.5,0);for(let t=-4.5;t<=4.5;t+=1.5)this.addFencePiece(e,-6.4,.8,t,Math.PI/2),this.addFencePiece(e,6.4,.8,t,Math.PI/2)}addFencePiece(e,t,n,i,s){const o=e?e.clone(!0):new ye(new Ut(.22,1.35,.22),this.world.materials.wood);o.position.set(t,n,i),o.rotation.y=s,this.group.add(o)}addCounter(){this.counterTexture=Ah(this.count),this.counterMaterial=new Rt({map:this.counterTexture,transparent:!0,side:Xt});const e=new ye(new ns(5.35,1.72),this.counterMaterial);e.name="PotatoCounterRoadFacing",e.position.set(0,2.25,7.2),this.group.add(e);const t=new ye(new Ut(5.7,2.05,.2),this.world.materials.darkWood);t.position.set(0,2.25,7.08);const n=new ye(new Ut(.18,2.7,.18),this.world.materials.wood);n.position.set(-2.95,1.45,7.02);const i=n.clone();i.position.x=2.95,this.group.add(t,n,i)}addSummonPad(){const e=new ye(new qn(1.6,1.8,.2,6),new dt({color:8191922,emissive:1456166,roughness:.62,metalness:.08}));e.name="PotatoSummonPad",e.position.set(0,.28,9.45),this.group.add(e)}addFenceColliders(e){const t=e.rotation||0;for(const n of[{local:[0,.84,-6.25],size:[15.8,1.7,.34]},{local:[0,.84,6.25],size:[15.8,1.7,.34]},{local:[-7.75,.84,0],size:[.34,1.7,12.5]},{local:[7.75,.84,0],size:[.34,1.7,12.5]}]){const i=new R(n.local[0],n.local[1],n.local[2]).applyAxisAngle(new R(0,1,0),t);this.world.physics.createFixedBox([e.position.x+i.x,i.y,e.position.z+i.z],n.size,{rotation:[0,t,0],friction:.92,restitution:.02})}}setPotatoCount(e){if(this.count=e,!this.counterTexture)return;const t=Ah(e);this.counterMaterial.map=t,this.counterMaterial.needsUpdate=!0,this.counterTexture.dispose(),this.counterTexture=t}spawnPotato(){const e=this.world.zones.find(i=>i.id==="potato");if(!e)return null;const t=this.world.cloneEnvironmentAsset("EnvMinecraftPotato")||new ye(new Ut(.75,.55,.55),this.world.materials.potato),n=new R((Math.random()-.5)*7.2,2.5,(Math.random()-.5)*5.8).applyAxisAngle(new R(0,1,0),e.rotation||0);return t.position.copy(e.position).add(n),t.rotation.set(Math.random()*.4,Math.random()*Math.PI*2,Math.random()*.4),t.scale.setScalar(.8+Math.random()*.35),this.world.scene.add(t),this.world.potatoes.push({mesh:t,life:22}),t}update(e){for(let t=this.world.potatoes.length-1;t>=0;t-=1){const n=this.world.potatoes[t];n.life-=e,n.mesh.rotation.y+=e*1.2,n.mesh.position.y+=Math.sin(n.life*6)*e*.2,n.life<=0&&(this.world.scene.remove(n.mesh),this.world.potatoes.splice(t,1))}}}function Ah(r){const e=document.createElement("canvas");e.width=512,e.height=192;const t=e.getContext("2d");t.fillStyle="#2a160c",t.fillRect(0,0,e.width,e.height);for(let i=0;i<e.width;i+=32)t.fillStyle=i%64===0?"#4b2a15":"#3a1f11",t.fillRect(i,0,28,e.height);t.strokeStyle="#d7a357",t.lineWidth=10,t.strokeRect(18,18,e.width-36,e.height-36),t.fillStyle="#f7e1a3",t.textAlign="center",t.font="800 34px Arial",t.fillText("POTATOES",e.width/2,75),t.font="900 64px Arial",t.fillText(String(r),e.width/2,145);const n=new Ks(e);return n.anisotropy=6,n}class Gx{constructor(e){this.world=e,this.items=[]}build(){this.placeRoadLanterns(),this.placeScenicProps(),this.placeShoreRocks()}placeRoadLanterns(){let e=0;for(const t of this.world.roadSegments){if(e>=this.world.getQualityProfile().props*.32)break;const[n,i,s,o,l]=t;if(o<18)continue;const h=Math.max(1,Math.floor(o/28));for(let u=0;u<h&&e<24;u+=1){const f=(u+.5)/h-.5,a=Te(e*4.1)>.5?1:-1,c=n+Math.sin(l)*o*f+Math.cos(l)*(s*.92)*a,d=i+Math.cos(l)*o*f-Math.sin(l)*(s*.92)*a;if(!this.world.terrain.containsPoint(c,d,12))continue;const p=this.world.cloneEnvironmentAsset("EnvMedievalLantern")||this.createLantern();p.position.set(c,.2,d),p.rotation.y=l+Math.PI*(a>0?.5:-.5),this.world.scene.add(p),this.items.push(p),e+=1}}}placeScenicProps(){const e=[["EnvBench",-8,48,-.35,.92],["EnvBench",34,55,.42,.92],["EnvBench",42,34,2.86,.88],["EnvBench",-34,40,-.2,.86],["EnvBench",-133,69,.98,.9],["EnvBench",-121,50,.36,.86],["EnvBench",-86,96,-.8,.86],["EnvCrate",116,82,.2,.92],["EnvBarrel",120,88,-.2,.86],["EnvCrate",78,57,.38,.88],["EnvBarrel",84,51,-.4,.82],["EnvCrate",54,82,.12,.82],["EnvBarrel",56,89,-.34,.78],["EnvBench",-138,-12,1.34,.86],["EnvBench",-111,-88,.7,.86],["EnvBench",104,-34,-.85,.86],["EnvBench",-20,-102,.18,.84],["EnvCrate",-145,34,.34,.84],["EnvBarrel",-135,39,-.22,.8]];for(const[t,n,i,s,o]of e)this.world.isClearForProp(n,i,t.includes("Bench")?2.1:1.5)&&this.addPlacedProp({name:t,x:n,z:i,rotation:s,scale:o})}placeShoreRocks(){const e=this.world.landscapeQuality==="low"?22:this.world.landscapeQuality==="medium"?30:38;for(let t=0;t<e;t+=1){const n=t/e*Math.PI*2+(Te(t*6.4)-.5)*.18,i=ft*(.88+Te(t*11.2)*.1),s=Math.cos(n)*i,o=Math.sin(n)*i;if(this.world.roads.isNear(s,o,6.5))continue;const l=this.world.cloneEnvironmentAsset("EnvShoreRock")||this.createRock();l.position.set(s,0,o),l.rotation.y=Te(t*3.7)*Math.PI*2,l.scale.setScalar(.72+Te(t*7.3)*1.25),this.world.scene.add(l),this.groundObject(l,-.045),this.items.push(l),this.world.physics.createFixedBall([s,.28*l.scale.x,o],.32*l.scale.x,{friction:.95,restitution:.01})}}addPlacedProp({name:e,x:t,z:n,rotation:i,scale:s}){if(e.includes("Bench")){const l=new ye(new Ut(2.85*s,.035,1.1*s),this.world.materials.paleStone);l.name="PROP_BenchStonePad",l.position.set(t,.085,n),l.rotation.y=i,l.receiveShadow=!0,this.world.scene.add(l),this.items.push(l)}const o=this.world.cloneEnvironmentAsset(e)||this.createFallbackProp(e);o.position.set(t,.12,n),o.rotation.y=i,o.scale.setScalar(s),this.world.scene.add(o),this.groundObject(o,.035),this.items.push(o)}groundObject(e,t=.04){e.updateMatrixWorld(!0);const n=new Pn().setFromObject(e);Number.isFinite(n.min.y)&&(e.position.y+=t-n.min.y)}createLantern(){const e=new $e,t=new ye(new qn(.08,.12,3.2,8),this.world.materials.darkWood);t.position.y=1.6;const n=new ye(new Ut(.9,.08,.08),this.world.materials.darkWood);n.position.set(.34,3,0);const i=new ye(new $i(.22,12,8),this.world.materials.glow);i.position.set(.82,2.75,0);const s=new Ns(16761706,1.6,18,2.2);return s.position.copy(i.position),e.add(t,n,i,s),e}createFallbackProp(e){if(e.includes("Barrel"))return new ye(new qn(.45,.5,1.05,10),this.world.materials.wood);if(e.includes("Crate"))return new ye(new Ut(1,1,1),this.world.materials.darkWood);if(e.includes("Bench")){const t=new $e,n=new ye(new Ut(1.9,.18,.45),this.world.materials.wood);return n.position.y=.55,t.add(n),t}return this.createRock()}createRock(){return new ye(new Zs(.9,1),this.world.materials.stone)}}const Lr={ring:{shoulder:1.6,line:14730347},avenue:{shoulder:1.3,line:14075042},street:{shoulder:1.1,line:13153162},stunt:{shoulder:1.4,line:16751469},dirt:{shoulder:1.8,line:9265976},bridge:{shoulder:1.4,line:15265264}},Rh={ring:0,avenue:1,street:2,dirt:2,stunt:3,bridge:4};class Hx{constructor(e){this.world=e,this.segments=el}build(){for(const e of Fl)this.addPath(e)}addPath(e){const t=e.closed?e.points.length:e.points.length-1;for(let n=0;n<t;n+=1){const i=e.points[n],s=e.points[(n+1)%e.points.length];this.addSegment(i,s,e)}for(const n of e.points)this.addNode(n,e)}addSegment(e,t,n){const i=t[0]-e[0],s=t[1]-e[1],o=Math.hypot(i,s),l=(e[0]+t[0])/2,h=(e[1]+t[1])/2,u=Math.atan2(i,s),f=Lr[n.hierarchy]||Lr.street,a=n.width,c=Rh[n.hierarchy]??1,d=.068+c*.001,p=.104+c*.006,_=n.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadEdge,g=n.hierarchy==="dirt"?this.world.materials.wood:this.world.materials.stoneRoad,m=this.createRoadPlane(a+f.shoulder*2,o+a*.45,_,1+c,u);m.name=`ROAD_${n.id}_shoulder`,m.position.set(l,d,h),m.receiveShadow=!0,this.world.scene.add(m);const v=this.createRoadPlane(a,o+a*.28,g,3+c,u);v.name=`ROAD_${n.id}_stone`,v.position.set(l,p,h),v.receiveShadow=!0,this.world.scene.add(v);const M=this.world.materials.roadLine.clone();M.color.setHex(f.line);const S=Math.max(0,o-a*2.4),E=Math.max(0,Math.floor(S/12));for(let T=0;T<E;T+=1){const C=this.createRoadPlane(.38,3.2,M,8+c,u),x=(T+.5)/E-.5;C.position.set(l+Math.sin(u)*S*x,p+.034,h+Math.cos(u)*S*x),this.world.scene.add(C)}this.world.physics.createFixedBox([l,.025,h],[a+f.shoulder*2,.05,o+a*.45],{rotation:[0,u,0],friction:n.hierarchy==="dirt"?.82:1.15,restitution:.01})}addNode(e,t){const n=Lr[t.hierarchy]||Lr.street,i=t.width*.54+n.shoulder*.52,s=Rh[t.hierarchy]??1,o=.086+s*.003,l=.142+s*.007,h=t.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadEdge,u=t.hierarchy==="dirt"?this.world.materials.wood:this.world.materials.stoneRoad,f=this.cleanCapMaterial(h),a=this.cleanCapMaterial(u),c=new ye(new yi(i,72),f);c.name=`ROAD_${t.id}_node`,c.position.set(e[0],o,e[1]),c.rotation.x=-Math.PI/2,c.receiveShadow=!1,c.renderOrder=10+s,this.world.scene.add(c);const d=new ye(new yi(i-n.shoulder*.42,72),a);d.name=`ROAD_${t.id}_node_cap`,d.position.set(e[0],l+.034,e[1]),d.rotation.x=-Math.PI/2,d.receiveShadow=!1,d.renderOrder=12+s,this.world.scene.add(d)}createRoadPlane(e,t,n,i=1,s=0){const o=this.offsetMaterial(n,i),l=new ye(Wx(e,t,s),o);return l.renderOrder=i,l}offsetMaterial(e,t){const n=e.clone();return n.polygonOffset=!0,n.polygonOffsetFactor=-t,n.polygonOffsetUnits=-t,n}cleanCapMaterial(e){const t=new Rt({color:e.color?e.color.clone():new fe(6248525),map:e.map||null,transparent:e.transparent,opacity:e.opacity??1,depthWrite:e.depthWrite??!0});return t.polygonOffset=!0,t.polygonOffsetFactor=-14,t.polygonOffsetUnits=-14,t}isNear(e,t,n=0){return el.some(([i,s,o,l,h])=>{const u=e-i,f=t-s,a=Math.cos(h)*u-Math.sin(h)*f,c=Math.sin(h)*u+Math.cos(h)*f;return Math.abs(a)<=o/2+n&&Math.abs(c)<=l/2+n})}}function Wx(r,e,t){const n=r/2,i=e/2,s=Math.cos(t),o=-Math.sin(t),l=Math.sin(t),h=Math.cos(t),u=[[-n,-i],[n,-i],[n,i],[-n,i]],f=new Float32Array(u.flatMap(([c,d])=>[s*c+l*d,0,o*c+h*d])),a=new gt;return a.setAttribute("position",new yt(f,3)),a.setAttribute("uv",new yt(new Float32Array([0,0,1,0,1,1,0,1]),2)),a.setIndex([0,2,1,0,3,2]),a.computeVertexNormals(),a}class Xx{constructor(e){this.world=e}build(){this.createRamps(),this.createBoostPads()}createRamps(){const e=Ys.find(s=>s.id==="drift");if(!e)return;const t=e.position[0],n=e.position[2],i=[{id:"cove-main-ramp",x:t-14,z:n-18,y:.12,rot:Math.PI/2,width:8.8,length:22,height:2.1}];for(const s of i){const o=qx(s.width,s.length,s.height),l=new ye(o.geometry,this.world.materials.stuntRamp);l.name=`STUNT_${s.id}`,l.position.set(s.x,s.y,s.z),l.rotation.y=s.rot,l.castShadow=!0,l.receiveShadow=!0,this.world.scene.add(l),this.world.ramps.push({id:s.id,position:new R(s.x,0,s.z),radius:11,triggered:!1}),this.world.physics.createFixedTrimesh([s.x,s.y,s.z],o.vertices,o.indices,{rotation:[0,s.rot,0],friction:.92,restitution:.02}),this.addGuardrails(s)}}addGuardrails(e){for(const t of[-1,1]){const n=new ye(new Ut(.22,.36,e.length*.92),this.world.materials.wood);n.name=`STUNT_${e.id}_wood_guardrail`,n.position.set(e.x+Math.cos(e.rot)*e.width*.56*t,.78,e.z-Math.sin(e.rot)*e.width*.56*t),n.rotation.y=e.rot,n.castShadow=!0,n.receiveShadow=!0,this.world.scene.add(n)}}createBoostPads(){for(const e of Iv){const t=new $e;t.name=`BOOST_${e.id}`,t.position.set(e.position[0],.35,e.position[2]),t.rotation.y=e.rotation||0;const n=new ye(new qn(2.2,2.4,.22,6),new dt({color:e.color,emissive:new fe(e.color).multiplyScalar(.22),roughness:.42})),i=new ye(new $s(.9,2.4,3),this.world.materials.glow);i.position.z=.5,i.rotation.x=Math.PI/2,t.add(n,i),this.world.scene.add(t),this.world.boostPads.push({...e,position:new R(e.position[0],0,e.position[2])})}}}function qx(r,e,t){const n=r/2,i=e/2,s=-.18,o=-.82,l=new Float32Array([-n,s,-i,n,s,-i,n,t,i,-n,t,i,-n,o,-i,n,o,-i,n,o,i,-n,o,i]),h=new Uint32Array([0,1,2,0,2,3,4,7,6,4,6,5,0,4,5,0,5,1,3,2,6,3,6,7,0,3,7,0,7,4,1,5,6,1,6,2]),u=new gt;return u.setAttribute("position",new yt(l,3)),u.setIndex(new yt(h,1)),u.computeVertexNormals(),{geometry:u,vertices:l,indices:h}}class Yx{constructor(e){this.world=e,this.authoredIslandLoaded=!1}build(){this.authoredIslandLoaded=this.addAuthoredIsland(),this.authoredIslandLoaded||(this.addFallbackGround(),this.addBeachAndCliffs()),this.addPhysicsFloor()}addAuthoredIsland(){const e=this.world.environmentAssets?.cloneScene?.("islandVisual");return e?(e.name="MedievalIslandVisual",e.traverse(t=>{if(/^(SPAWN_|ZONE_|WATER_)/.test(t.name)){t.visible=!1;return}t.isMesh&&(t.geometry?.computeVertexNormals?.(),t.name.includes("IslandTerrain")?t.material=this.world.materials.ground:t.name.includes("Beach")?t.material=this.world.materials.sand:t.name.includes("Cliff")&&(t.material=this.world.materials.cliff),t.receiveShadow=!0,t.castShadow=!1)}),this.world.scene.add(e),this.world.decor.push({type:"authoredIsland",mesh:e}),this.addInteriorGrassCap(),this.addCleanShoreBand(),!0):!1}addInteriorGrassCap(){const e=new ye(new yi(ft*.925,260),this.world.materials.ground);e.name="MedievalIslandInteriorGrassCap",e.rotation.x=-Math.PI/2,e.position.y=.066,e.receiveShadow=!0,this.world.scene.add(e),this.world.decor.push({type:"grassCap",mesh:e})}addCleanShoreBand(){const e=new ye(_i(ft*.895,ft*1.055,240,2.6),this.world.materials.sand);e.name="MedievalIslandCleanBeachBand",e.position.y=.074,e.receiveShadow=!0,this.world.scene.add(e);const t=new ye(_i(ft*.86,ft*.965,240,3.2),this.world.materials.grassSandBlend);t.name="MedievalIslandGrassToSandFeather",t.position.y=.086,t.renderOrder=2,this.world.scene.add(t);const n=new ye(_i(ft*.965,ft*1.065,260,2.8),this.world.materials.wetSandBlend);n.name="MedievalIslandWetSandFeather",n.position.y=.092,n.renderOrder=3,this.world.scene.add(n),this.world.decor.push({type:"shoreBand",mesh:e},{type:"shoreBlend",mesh:t},{type:"wetSandBlend",mesh:n})}addFallbackGround(){const e=Dx(ft,180),t=new ye(e,this.world.materials.ground);t.name="FallbackMedievalIslandGrass",t.receiveShadow=!0,t.position.y=0,this.world.scene.add(t),this.world.decor.push({type:"ground",mesh:t})}addBeachAndCliffs(){const e=new ye(_i(ft*.92,ft*1.01,180,2.4),this.world.materials.sand);e.name="MedievalIslandBeachBlend",e.position.y=.028,e.receiveShadow=!0,this.world.scene.add(e);const t=new ye(_i(ft*.985,ft*1.06,160,2.8),this.world.materials.cliff);t.name="MedievalIslandCliffEdge",t.position.y=zr+.12,t.receiveShadow=!0,this.world.scene.add(t),this.world.decor.push({type:"beach",mesh:e},{type:"cliff",mesh:t})}addPhysicsFloor(){this.world.physics.createFixedBox([0,-.47,0],[Bt*2.1,1,Bt*2.1],{friction:1.08,restitution:.01})}containsPoint(e,t,n=0){return Math.hypot(e,t)<=ft-n}}class Kx{constructor(e){this.world=e,this.waterMeshes=[]}build(){const e=new ye(new ns(Bt*5.5,Bt*5.5,96,96),this.world.materials.water);e.name="MedievalIslandOcean",e.rotation.x=-Math.PI/2,e.position.y=zr,e.renderOrder=-5,this.world.scene.add(e),this.waterMeshes.push(e),this.createShallowShelf(),this.createShoreFoam()}createShallowShelf(){const e=new ye(_i(ft*.998,ft*1.2,260,4.2),this.world.materials.shoreWash);e.name="MedievalIslandShallowWaterShelf",e.position.y=zr+.075,e.renderOrder=-3,this.world.scene.add(e),this.waterMeshes.push(e)}createShoreFoam(){const e=[{inner:1.01,outer:1.022,opacity:.2,wobble:1.2,speed:.006},{inner:1.027,outer:1.041,opacity:.14,wobble:2,speed:-.004},{inner:1.049,outer:1.066,opacity:.08,wobble:2.8,speed:.003}];for(let t=0;t<e.length;t+=1){const n=e[t],i=this.world.materials.foam.clone();i.opacity=n.opacity;const s=new ye(_i(ft*n.inner,ft*n.outer,240,n.wobble),i);s.name=`MedievalIslandShoreFoam_${t}`,s.position.y=zr+.054+t*.005,s.userData.foamSpeed=n.speed,s.renderOrder=-4+t,this.world.scene.add(s),this.waterMeshes.push(s)}}update(e,t){this.world.materials.water.uniforms?.time&&(this.world.materials.water.uniforms.time.value=t);for(const n of[this.world.materials.shoreWash,this.world.materials.wetSandBlend])n?.uniforms?.time&&(n.uniforms.time.value=t);for(const n of this.waterMeshes)if(n.name.includes("Foam")){n.rotation.z+=e*(n.userData.foamSpeed||.004);const i=n.name.endsWith("_0")?.18:n.name.endsWith("_1")?.12:.07;n.material.opacity=i+Math.sin(t*.7+n.position.y*80)*.035}}}class $x{constructor(e){this.world=e}build(){for(const e of Ys)this.createZone(e)}createZone(e){const t={...e,position:new R(e.position[0],e.position[1],e.position[2]),visited:!1};this.world.zones.push(t);const n=new $e;n.name=`ZONE_${e.id}_${e.name.replace(/\s+/g,"_")}`,n.position.copy(t.position),n.rotation.y=e.rotation||0,this.addInteractionRing(n,t),this.addLandmark(n,t),this.world.scene.add(n)}addInteractionRing(e,t){const n=new ye(new Pl(t.radius*.94,t.radius,48),new Rt({color:t.color,transparent:!0,opacity:.1,depthWrite:!1,side:Xt}));n.name=`ZONE_${t.id}_interaction_ring`,n.rotation.x=-Math.PI/2,n.position.y=.19,e.add(n)}addLandmark(e,t){const n=this.world.cloneEnvironmentAsset(`EnvLandmark_${t.shape}`)||this.createFallbackLandmark(t);n.name=`VIS_Landmark_${t.id}`,n.traverse?.(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),e.add(n);const i=Zx(t.shape);if(i){if(i.type==="cylinder"){this.world.physics.createFixedCylinder([t.position.x,i.height/2,t.position.z],i.height/2,i.radius,{friction:.85,restitution:.02});return}this.world.physics.createFixedBox([t.position.x,i.size[1]/2,t.position.z],i.size,{rotation:[0,t.rotation||0,0],friction:.85,restitution:.02})}}createFallbackLandmark(e){switch(e.shape){case"hub":return this.makeCourtyard(e);case"lab":return this.makeKeep(e);case"foundry":return this.makeFoundry(e);case"tower":return this.makeWatchtower(e);case"office":return this.makeGuildHall(e);case"terminal":return this.makeOracle(e);case"library":return this.makeLibrary(e);case"trophy":return this.makeShrine(e);case"vault":return this.makeVault(e);case"board":return this.makeNoticeBoard(e);case"gate":return this.makeCircuitGate(e);case"post":return this.makeLighthouse(e);case"portal":return this.makePortal(e);case"rampyard":return this.makeStuntMarker(e);case"pier":return this.makePier(e);case"farm":return new $e;default:return this.makeCourtyard(e)}}makeCourtyard(e){const t=new $e;return this.cylinder(t,0,.18,0,5.6,.32,this.world.materials.paleStone,36),this.cylinder(t,0,1.1,0,2.2,1.6,this.world.materials.stone,22),this.cone(t,0,2.05,0,1.25,0,1.2,this.world.materials.roof,22),t}makeKeep(e){const t=new $e;this.box(t,0,1.75,0,5.8,3.5,4.8,this.world.materials.stone),this.box(t,0,3.75,0,6.2,.42,5.2,this.world.materials.paleStone);for(const n of[-2.7,2.7])for(const i of[-2.2,2.2])this.cylinder(t,n,2.4,i,.8,4.6,this.world.materials.stone,16),this.cone(t,n,5.05,i,1,0,1.4,this.world.materials.roof,16);return this.box(t,0,1.05,2.46,1.25,1.75,.08,this.world.materials.darkWood),t}makeFoundry(e){const t=new $e;this.box(t,0,1.35,0,6.8,2.7,4.8,this.world.materials.darkWood),this.box(t,0,3,0,7.4,.5,5.2,this.world.materials.roof,[.18,0,0]),this.cylinder(t,2.3,3.2,-1.5,.45,4.2,this.world.materials.stone,12);const n=new Ns(16742962,2.5,22);return n.position.set(-1.8,1.4,1.8),t.add(n),t}makeWatchtower(e){const t=new $e;this.cylinder(t,0,2.8,0,1.65,5.6,this.world.materials.stone,18),this.cylinder(t,0,5.7,0,2.15,.72,this.world.materials.paleStone,18),this.cone(t,0,6.65,0,2.15,0,1.55,this.world.materials.roof,18);const n=new Ns(16739725,2.3,36);return n.position.set(0,6.25,0),t.add(n),t}makeGuildHall(e){const t=new $e;this.box(t,0,1.6,0,7,3.2,5.4,this.world.materials.paleStone),this.box(t,0,3.5,0,7.7,.48,6,this.world.materials.roof,[.12,0,0]);for(const n of[-2.4,0,2.4])this.box(t,n,1.85,2.75,.72,1,.08,this.world.materials.glass);return t}makeOracle(e){const t=new $e;return this.cylinder(t,0,.65,0,2.5,1.3,this.world.materials.stone,20),this.box(t,0,2.1,0,4.2,1.8,.45,this.world.materials.glow),this.cylinder(t,0,3.35,0,1.2,.2,this.world.materials.gold,24),t}makeLibrary(e){const t=new $e;this.box(t,0,1.45,0,7.2,2.9,5.2,this.world.materials.paleStone);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,1.65,2.78,.18,3.3,this.world.materials.stone,10);return this.cone(t,0,3.55,0,4.4,.8,1.2,this.world.materials.roof,4,[0,Math.PI/4,0]),t}makeShrine(e){const t=new $e;return this.cylinder(t,0,.45,0,2.4,.9,this.world.materials.paleStone,24),this.cylinder(t,0,1.8,0,.72,2.2,this.world.materials.gold,20),this.cone(t,0,3.22,0,1.15,.28,.9,this.world.materials.gold,20),t}makeVault(e){const t=new $e;return this.box(t,0,1.25,0,5.4,2.5,4,this.world.materials.stone),this.cylinder(t,0,1.35,2.08,1.1,.28,this.world.materials.gold,24,[Math.PI/2,0,0]),this.box(t,0,2.85,0,5.8,.45,4.4,this.world.materials.roof),t}makeNoticeBoard(e){const t=new $e;return this.box(t,-2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,0,2.05,0,5.4,2.4,.28,this.world.materials.wood),this.box(t,0,3.45,0,5.9,.35,.45,this.world.materials.roof),t}makeCircuitGate(e){const t=new $e;for(const n of[-2.6,2.6])this.cylinder(t,n,2.1,0,.32,4.2,this.world.materials.stone,12);return this.box(t,0,4.1,0,5.8,.5,.6,this.world.materials.gold),t}makeLighthouse(e){const t=new $e;this.cylinder(t,0,2.4,0,1.25,4.8,this.world.materials.paleStone,18),this.cylinder(t,0,5,0,1.6,.7,this.world.materials.glass,18),this.cone(t,0,5.8,0,1.7,0,1.1,this.world.materials.roof,18);const n=new Ns(7911423,2.2,44);return n.position.set(0,5.1,0),t.add(n),t}makePortal(e){const t=new $e;return this.cylinder(t,-1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.cylinder(t,1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.box(t,0,4.2,0,3.1,.45,.6,this.world.materials.stone),this.box(t,0,2.35,.02,2.1,2.8,.08,this.world.materials.glow),t}makeStuntMarker(e){return new $e}makePier(e){const t=new $e;this.box(t,0,.35,0,7,.7,2.3,this.world.materials.wood);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,-.35,.85,.16,1.7,this.world.materials.darkWood,8);return t}box(e,t,n,i,s,o,l,h,u=[0,0,0]){const f=new ye(new Ut(s,o,l),h);return f.position.set(t,n,i),f.rotation.set(u[0],u[1],u[2]),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}cylinder(e,t,n,i,s,o,l,h=16,u=[0,0,0]){const f=new ye(new qn(s,s,o,h),l);return f.position.set(t,n,i),f.rotation.set(u[0],u[1],u[2]),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}cone(e,t,n,i,s,o,l,h,u=16,f=[0,0,0]){const a=new ye(new $s(s,l,u,1,!1,0,Math.PI*2),h);return a.position.set(t,n,i),a.rotation.set(f[0],f[1],f[2]),a.castShadow=!0,a.receiveShadow=!0,e.add(a),a}}function Zx(r){switch(r){case"hub":return{type:"cylinder",radius:2.45,height:2.4};case"tower":return{type:"cylinder",radius:1.95,height:7.2};case"post":return{type:"cylinder",radius:1.45,height:6.2};case"lab":return{type:"box",size:[5.9,3.6,4.9]};case"foundry":return{type:"box",size:[6.8,3.1,5]};case"office":return{type:"box",size:[10.4,17.2,9.2]};case"library":return{type:"box",size:[17.2,12.4,11.6]};case"terminal":return{type:"box",size:[4.4,2.2,1.2]};case"trophy":return{type:"cylinder",radius:1.35,height:3.3};case"vault":return{type:"box",size:[5.4,2.9,4.1]};case"board":return{type:"box",size:[5.8,3.2,.42]};case"pier":return{type:"box",size:[7.1,.8,2.4]};case"gate":case"portal":case"farm":case"rampyard":return null;default:return{type:"box",size:[4.8,3,4]}}}class jx{constructor({scene:e,physics:t,resumeData:n,environmentAssets:i}){this.scene=e,this.physics=t,this.resumeData=n,this.environmentAssets=i,this.materials=Lx(),this.zones=[],this.decor=[],this.boostPads=[],this.ramps=[],this.collectibles=[],this.potatoes=[],this.roadSegments=el,this.checkpoints=Dv.map(([s,o,l])=>new R(s,o,l)),this.landscapeQuality=this.readLandscapeQuality(),this.circuit={active:!1,startedAt:0,checkpoint:0,best:Number(localStorage.getItem("portfolio-drive-best-lap")||0)},this.build()}build(){this.terrain=new Yx(this),this.water=new Kx(this),this.roads=new Hx(this),this.zonesSystem=new $x(this),this.stuntPark=new Xx(this),this.props=new Gx(this),this.foliage=new kx(this),this.potatoFarm=new Vx(this),this.atmosphere=new Bx(this),this.terrain.build(),this.water.build(),this.roads.build(),this.zonesSystem.build(),this.stuntPark.build(),this.potatoFarm.build(),this.props.build(),this.foliage.build(),this.createCollectibles(),this.atmosphere.build()}cloneEnvironmentAsset(e){return this.environmentAssets?.clone?.(e)||null}readLandscapeQuality(){const e=localStorage.getItem("portfolio-drive-landscape-quality");return Gn[e]?e:"medium"}getQualityProfile(){return Gn[this.landscapeQuality]||Gn.medium}setLandscapeQuality(e){return Gn[e]?(this.landscapeQuality=e,localStorage.setItem("portfolio-drive-landscape-quality",e),this.foliage?.applyQuality(),this.atmosphere?.applyQuality?.(),this.onQualityChange?.(e),this.landscapeQuality):this.landscapeQuality}cycleLandscapeQuality(){const e=Jo.indexOf(this.landscapeQuality);return this.setLandscapeQuality(Jo[(e+1)%Jo.length])}isClearForProp(e,t,n=2){if(!this.terrain?.containsPoint(e,t,n+6)||this.roads?.isNear(e,t,n+2.8))return!1;for(const i of Ys){const s=e-i.position[0],o=t-i.position[2];if(Math.hypot(s,o)<i.radius+n+5)return!1}return!0}createCollectibles(){const e=[[-88,0,68],[44,0,92],[118,0,-20],[-92,0,-84],[18,0,-116],[124,0,58],[-18,0,34]];for(let t=0;t<e.length;t+=1){const n=new ye(new Cl(1.15,0),new dt({color:7995333,emissive:879951,roughness:.24,metalness:.12}));n.name=`Collectible_DataShard_${t}`,n.position.set(e[t][0],2.2,e[t][2]),this.scene.add(n),this.collectibles.push({mesh:n,collected:localStorage.getItem(`portfolio-drive-shard-${t}`)==="1",index:t}),n.visible=!this.collectibles[t].collected}}checkBoostPad(e){return this.boostPads.find(t=>e.distanceTo(t.position)<4.2)||null}checkRampAir(e,t){if(t<3.2)return!1;for(const n of this.ramps)if(e.distanceTo(n.position)<n.radius&&!n.triggered)return n.triggered=!0,window.setTimeout(()=>{n.triggered=!1},1e3),!0;return!1}checkCollectibles(e){const t=[];for(const n of this.collectibles)n.collected||e.distanceTo(n.mesh.position)>3.4||(n.collected=!0,n.mesh.visible=!1,localStorage.setItem(`portfolio-drive-shard-${n.index}`,"1"),t.push(n));return t}getCollectedCount(){return this.collectibles.filter(e=>e.collected).length}setPotatoCount(e){this.potatoFarm?.setPotatoCount(e)}spawnPotato(){return this.potatoFarm?.spawnPotato()}nearestZone(e){let t=null;for(const n of this.zones){const i=e.distanceTo(n.position);i<=n.radius+4&&(!t||i<t.distance)&&(t={zone:n,distance:i})}return t}getRespawnPose(e="landing"){const t=this.zones.find(i=>i.id===e)||this.zones.find(i=>i.id==="landing");if(!t)return{position:new R(10,1.45,27),heading:0};if(t.id==="landing")return{position:new R(10,1.08,27),heading:.15};const n=new R(Math.sin(t.rotation||0)*-9,1.08,Math.cos(t.rotation||0)*-9);return{position:t.position.clone().add(n),heading:t.rotation||0}}getRespawnPosition(e="landing"){return this.getRespawnPose(e).position}startCircuit(e){this.circuit.active=!0,this.circuit.startedAt=e,this.circuit.checkpoint=0}updateCircuit(e,t){if(!this.circuit.active)return null;const n=this.checkpoints[this.circuit.checkpoint+1];if(!n||e.distanceTo(n)>10)return null;if(this.circuit.checkpoint+=1,this.circuit.checkpoint>=this.checkpoints.length-1){const i=t-this.circuit.startedAt;return this.circuit.active=!1,this.circuit.checkpoint=0,(!this.circuit.best||i<this.circuit.best)&&(this.circuit.best=i,localStorage.setItem("portfolio-drive-best-lap",String(i))),{finished:!0,lap:i}}return{checkpoint:this.circuit.checkpoint}}update(e,t,n){this.water.update(e,t),this.foliage.update(e,t,n),this.potatoFarm.update(e),this.atmosphere.update(e,t);for(const i of this.collectibles)i.collected||(i.mesh.rotation.y+=e*1.1,i.mesh.position.y=2.2+Math.sin(t*1.6+i.index)*.28)}}class Jx{constructor({game:e,achievements:t,audio:n}){this.game=e,this.achievements=t,this.audio=n,this.projectIndex=0,this.activeTab="options",this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.lastNotification={message:"",time:0},this.refs={loading:document.getElementById("loading"),titleScreen:document.getElementById("title-screen"),startButton:document.getElementById("start-button"),zoneReadout:document.getElementById("zone-readout"),speedReadout:document.getElementById("speed-readout"),prompt:document.getElementById("interaction-prompt"),promptKind:document.getElementById("prompt-kind"),promptTitle:document.getElementById("prompt-title"),promptAction:document.getElementById("prompt-action"),panel:document.getElementById("panel"),panelKind:document.getElementById("panel-kind"),panelTitle:document.getElementById("panel-title"),panelBody:document.getElementById("panel-body"),panelActions:document.getElementById("panel-actions"),panelClose:document.getElementById("panel-close"),menu:document.getElementById("menu"),menuButton:document.getElementById("menu-button"),menuClose:document.getElementById("menu-close"),menuContent:document.getElementById("menu-content"),mapModal:document.getElementById("map-modal"),mapButton:document.getElementById("map-button"),mapClose:document.getElementById("map-close"),worldMap:document.getElementById("world-map"),worldMapLayer:document.getElementById("world-map-layer"),mapZoomIn:document.getElementById("map-zoom-in"),mapZoomOut:document.getElementById("map-zoom-out"),mapReset:document.getElementById("map-reset"),mapStatus:document.getElementById("map-status"),minimap:document.getElementById("minimap"),minimapWorld:document.getElementById("minimap-world"),notifications:document.getElementById("notifications"),soundButton:document.getElementById("sound-button")},this.setup()}setup(){this.refs.startButton.addEventListener("click",()=>this.game.startDriving()),this.refs.panelClose.addEventListener("click",()=>this.closePanel()),this.refs.menuButton.addEventListener("click",()=>this.toggleMenu()),this.refs.menuClose.addEventListener("click",()=>this.closeMenu()),this.refs.mapButton.addEventListener("click",()=>this.toggleMap()),this.refs.mapClose.addEventListener("click",()=>this.closeMap()),this.refs.mapZoomIn.addEventListener("click",()=>this.zoomMap(.22)),this.refs.mapZoomOut.addEventListener("click",()=>this.zoomMap(-.22)),this.refs.mapReset.addEventListener("click",()=>this.resetMapView()),this.setupMapDrag(),this.refs.soundButton.addEventListener("click",()=>{this.audio.resume();const e=this.audio.toggleMute();this.refs.soundButton.textContent=e?"Muted":"Sound",this.notify(e?"Sound muted":"Sound enabled")}),document.querySelectorAll(".menu-tabs button").forEach(e=>{e.addEventListener("click",()=>{this.activeTab=e.dataset.tab,this.renderMenu()})}),this.achievements.onUnlock=e=>{this.notify(`Achievement unlocked: ${e.title}`)},this.renderMap(),this.renderMinimap(),this.renderMenu()}markLoaded(){this.refs.loading.classList.add("is-hidden")}hideTitle(){this.refs.titleScreen.hidden=!0,document.body.classList.add("is-driving")}showPrompt(e){if(!e||this.isPanelOpen()){this.refs.prompt.hidden=!0;return}this.refs.promptKind.textContent=e.kind,this.refs.promptTitle.textContent=e.name,e.potatoFarm?this.refs.promptAction.textContent="Press P to summon. Press E for farm log":this.refs.promptAction.textContent=e.startsCircuit?"Press E to start circuit":"Press E to interact",this.refs.prompt.hidden=!1}hidePrompt(){this.refs.prompt.hidden=!0}openZone(e){if(this.audio.click(),this.achievements.visitZone(e),this.game.recordZoneVisit(e),e.startsCircuit&&this.game.startCircuit(),e.projectGallery){this.openProjectGallery(e);return}const t=this.game.getZoneLines(e);this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,fi(this.refs.panelBody),fi(this.refs.panelActions);for(const n of t){const i=document.createElement("p");i.textContent=n,this.refs.panelBody.append(i)}if(e.potatoFarm){const n=document.createElement("p");n.className="panel-muted",n.textContent=`Farm counter: ${this.game.analytics?.potatoCountLabel||"--"}`,this.refs.panelBody.append(n);const i=ea("Summon Potato",()=>this.game.summonPotato());this.refs.panelActions.append(i)}if(e.id==="data-pier"){const n=document.createElement("p");n.className="panel-muted",n.textContent=this.game.analytics?.isEnabled?"Signal collection is active.":"Signal collection is offline.",this.refs.panelBody.append(n)}this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}openProjectGallery(e){this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,fi(this.refs.panelBody),fi(this.refs.panelActions);const t=this.game.resumeData.projects||[],n=t[this.projectIndex%t.length]||"Project data unavailable.",i=document.createElement("span");i.className="project-counter",i.textContent=`${this.projectIndex+1} / ${t.length}`;const s=document.createElement("h3"),[o,l=""]=n.split(": ");s.textContent=o;const h=document.createElement("p");h.textContent=l||n;const u=document.createElement("p");u.className="panel-muted",u.textContent="Use Previous and Next to browse the project record from the resume data.",this.refs.panelBody.append(i,s,h,u);const f=ea("Previous",()=>{this.projectIndex=(this.projectIndex-1+t.length)%t.length,this.openProjectGallery(e)}),a=ea("Next",()=>{this.projectIndex=(this.projectIndex+1)%t.length,this.openProjectGallery(e)});this.refs.panelActions.append(f,a),this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}addActions(e){for(const t of e){const n=document.createElement("a");n.href=t.href,n.textContent=t.label,n.target="_blank",n.rel="noopener noreferrer",this.refs.panelActions.append(n)}}closePanel(){this.refs.panel.hidden=!0,this.game.clearFocus()}isPanelOpen(){return!this.refs.panel.hidden||!this.refs.menu.hidden||!this.refs.mapModal.hidden}toggleMenu(){this.refs.menu.hidden?this.openMenu():this.closeMenu()}openMenu(){this.audio.click(),this.refs.menu.hidden=!1,this.renderMenu()}closeMenu(){this.refs.menu.hidden=!0}toggleMap(){this.refs.mapModal.hidden?this.openMap():this.closeMap()}openMap(){this.audio.click(620),this.refs.mapModal.hidden=!1,this.renderMap()}closeMap(){this.refs.mapModal.hidden=!0}setupMapDrag(){const e=this.refs.worldMap;e.addEventListener("pointerdown",n=>{n.target.closest(".map-pin")||(this.mapState.dragging=!0,this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,e.setPointerCapture(n.pointerId))}),e.addEventListener("pointermove",n=>{if(!this.mapState.dragging)return;const i=n.clientX-this.mapState.lastX,s=n.clientY-this.mapState.lastY;this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,this.mapState.x+=i,this.mapState.y+=s,this.applyMapTransform()});const t=n=>{this.mapState.dragging=!1,e.hasPointerCapture(n.pointerId)&&e.releasePointerCapture(n.pointerId)};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",n=>{n.preventDefault(),this.zoomMap(n.deltaY>0?-.12:.12)},{passive:!1})}zoomMap(e){this.mapState.scale=Math.max(.8,Math.min(2.4,this.mapState.scale+e)),this.applyMapTransform()}resetMapView(){this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.applyMapTransform()}applyMapTransform(){this.refs.worldMapLayer.style.transform=`translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`,this.refs.mapStatus.textContent=`Zoom ${Math.round(this.mapState.scale*100)}%`}renderMenu(){document.querySelectorAll(".menu-tabs button").forEach(e=>{e.classList.toggle("is-active",e.dataset.tab===this.activeTab)}),fi(this.refs.menuContent),this.activeTab==="options"?this.renderOptions():this.activeTab==="controls"?this.renderControls():this.activeTab==="achievements"?this.renderAchievements():this.renderAbout()}renderOptions(){const e=document.createElement("div");e.className="menu-grid",e.append(bs("Respawn","Move the car back to the Start Hub.",()=>{this.game.respawn(),this.closeMenu()}),bs("Reset Props","Put loose objects back near their starting positions.",()=>{this.game.resetWorld(),this.notify("World props reset")}),bs("Sound",this.audio.muted?"Currently muted.":"Currently enabled.",()=>{const t=this.audio.toggleMute();this.refs.soundButton.textContent=t?"Muted":"Sound",this.renderMenu()}),bs("Landscape Quality",`Currently ${Ch(this.game.world.landscapeQuality)}. Controls sakura petals and grass density.`,()=>{const t=this.game.world.cycleLandscapeQuality();this.renderMenu(),this.notify(`Landscape quality: ${Ch(t)}`)}),bs("Reset Achievements","Clear local achievement progress for this browser.",()=>{this.achievements.reset(),this.renderMenu(),this.notify("Achievements reset")})),this.refs.menuContent.append(e)}renderControls(){const e=[["WASD / Arrows","Drive"],["Shift","Boost"],["Ctrl / B","Brake"],["W + S from rest","Charge burnout, release S for wheelie"],["Space","Jump"],["E / Enter","Interact"],["P","Summon potato at the farm"],["M","Map"],["R","Respawn"],["Mouse drag","Move camera"],["Gamepad","Left stick, A interact, B boost, LT brake, Y jump"]],t=document.createElement("div");t.className="control-grid";for(const[n,i]of e){const s=document.createElement("span");s.textContent=n;const o=document.createElement("strong");o.textContent=i,t.append(s,o)}this.refs.menuContent.append(t)}renderAchievements(){const e=this.achievements.getProgress(),t=document.createElement("p");t.className="panel-muted",t.textContent=`${e.unlocked}/${e.total} unlocked. Distance driven: ${Math.round(e.distance)} m.`;const n=document.createElement("div");n.className="achievement-list";for(const i of this.achievements.definitions){const s=document.createElement("div");s.className="achievement",s.classList.toggle("is-unlocked",this.achievements.unlocked.has(i.id));const o=document.createElement("strong");o.textContent=i.title;const l=document.createElement("span");l.textContent=i.description,s.append(o,l),n.append(s)}this.refs.menuContent.append(t,n)}renderAbout(){const e=["Three.js renders the island drive-world. Rapier handles the driving physics.","Resume content, project stops, contact links, and counters are connected directly to the portfolio."];for(const t of e){const n=document.createElement("p");n.textContent=t,this.refs.menuContent.append(n)}}renderMap(){fi(this.refs.worldMapLayer),this.renderMapBase(this.refs.worldMapLayer,"map");for(const e of Ys){const t=document.createElement("button");t.type="button",t.className="map-pin";const n=zi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),t.textContent=e.name,t.title=`${e.name} - ${e.kind}`,t.addEventListener("click",()=>{this.game.respawn(e.id),this.closeMap()}),this.refs.worldMapLayer.append(t)}this.mapPlayer=document.createElement("span"),this.mapPlayer.className="map-player",this.refs.worldMapLayer.append(this.mapPlayer),this.applyMapTransform()}renderMinimap(){fi(this.refs.minimapWorld),this.renderMapBase(this.refs.minimapWorld,"minimap");for(const e of Ys){const t=document.createElement("span");t.className="minimap-pin";const n=zi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),this.refs.minimapWorld.append(t)}this.minimapPlayer=document.createElement("span"),this.minimapPlayer.className="minimap-player",this.refs.minimapWorld.append(this.minimapPlayer)}renderMapBase(e,t){const n=document.createElement("div");n.className=`${t}-island`;const i=Bt*2+Sn*2;n.style.inset=`${(Bt+Sn-ft)/i*100}%`,e.append(n);for(const s of Pv){const o=document.createElement("span");o.className=`${t}-district`;const l=zi(s.center[0],s.center[1]);o.style.left=`${l.x}%`,o.style.top=`${l.y}%`,o.style.width=`${s.size[0]/(Bt*2+Sn*2)*100}%`,o.style.height=`${s.size[1]/(Bt*2+Sn*2)*100}%`,o.style.setProperty("--district-color",s.color),e.append(o)}for(const s of Cv)for(const[o,l,h,u,f=0]of ey(s.points,!1,s.width)){const a=document.createElement("span");a.className=`${t}-canal`;const c=zi(o,l);a.style.left=`${c.x}%`,a.style.top=`${c.y}%`,a.style.width=`${h/(Bt*2+Sn*2)*100}%`,a.style.height=`${u/(Bt*2+Sn*2)*100}%`,a.style.transform=`translate(-50%, -50%) rotate(${f}rad)`,e.append(a)}e.append(Qx(t))}update({speed:e,activeZone:t,circuit:n}){this.refs.speedReadout.textContent=`${Math.round(Math.abs(e)*3.6)} km/h`,this.refs.zoneReadout.textContent=t?t.name:"Road",this.refs.soundButton.textContent=this.audio.muted?"Muted":"Sound",this.showPrompt(t),n?.active&&(this.refs.zoneReadout.textContent=`Circuit ${n.checkpoint}/${this.game.world.checkpoints.length-1}`),this.updateMapMarkers(t)}updateMapMarkers(e){const t=this.game.vehicle.position,n=zi(t.x,t.z),i=this.game.vehicle.heading||0;this.mapPlayer&&(this.mapPlayer.style.left=`${n.x}%`,this.mapPlayer.style.top=`${n.y}%`,this.mapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),this.minimapPlayer&&(this.minimapPlayer.style.left=`${n.x}%`,this.minimapPlayer.style.top=`${n.y}%`,this.minimapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),document.querySelectorAll(".map-pin").forEach(s=>{s.classList.toggle("is-active",e&&s.textContent===e.name)})}notify(e){const t=performance.now();if(e===this.lastNotification.message&&t-this.lastNotification.time<950)return;this.lastNotification={message:e,time:t};const n=document.createElement("div");n.className="notification",n.textContent=e,this.refs.notifications.append(n),setTimeout(()=>n.classList.add("is-visible"),20),setTimeout(()=>{n.classList.remove("is-visible"),setTimeout(()=>n.remove(),260)},3600)}setPotatoCount(e){this.game.world?.setPotatoCount?.(e)}}function zi(r,e){const t=Bt*2+Sn*2;return{x:(r+Bt+Sn)/t*100,y:(e+Bt+Sn)/t*100}}function Qx(r){const e=Bt*2+Sn*2,t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("class",`${r}-roads-svg`),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("aria-hidden","true");for(const n of Fl){const i=n.closed?[...n.points,n.points[0]]:n.points,s=document.createElementNS("http://www.w3.org/2000/svg","polyline");s.setAttribute("class",`${r}-road-line ${r}-road-${n.hierarchy}`),s.setAttribute("points",i.map(([o,l])=>{const h=zi(o,l);return`${h.x.toFixed(2)},${h.y.toFixed(2)}`}).join(" ")),s.setAttribute("stroke-width",`${(n.width+3.4)/e*100}`),t.append(s)}return t}function ey(r,e,t){const n=[],i=r.length-1;for(let s=0;s<i;s+=1){const o=r[s],l=r[(s+1)%r.length],h=l[0]-o[0],u=l[1]-o[1],f=Math.hypot(h,u);n.push([(o[0]+l[0])/2,(o[1]+l[1])/2,t,f+t*.64,Math.atan2(h,u)])}return n}function fi(r){for(;r.firstChild;)r.removeChild(r.firstChild)}function ea(r,e){const t=document.createElement("button");return t.type="button",t.textContent=r,t.addEventListener("click",e),t}function bs(r,e,t){const n=document.createElement("button");n.type="button",n.className="option-tile";const i=document.createElement("strong");i.textContent=r;const s=document.createElement("span");return s.textContent=e,n.append(i,s),n.addEventListener("click",t),n}function Ch(r){return`${r.charAt(0).toUpperCase()}${r.slice(1)}`}const Vr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ls{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ty=new js(-1,1,1,-1,0,1);class ny extends gt{constructor(){super(),this.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ze([0,2,0,0,2,0],2))}}const iy=new ny;class Ul{constructor(e){this._mesh=new ye(iy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ty)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class sy extends ls{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qs.clone(e.uniforms),this.material=new Ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ul(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ph extends ls{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,l;this.inverse?(o=0,l=1):(o=1,l=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(l),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class ry extends ls{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class oy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ae);this._width=n.width,this._height=n.height,t=new $t(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:en}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new sy(Vr),this.copyPass.material.blending=En,this.timer=new vp}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const l=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}Ph!==void 0&&(o instanceof Ph?n=!0:o instanceof ry&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ay extends ls{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new fe}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const ly={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class es extends ls{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ae(e.x,e.y):new ae(256,256),this.clearColor=new fe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new $t(s,o,{type:en}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const a=new $t(s,o,{type:en});a.texture.name="UnrealBloomPass.h"+f,a.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(a);const c=new $t(s,o,{type:en});c.texture.name="UnrealBloomPass.v"+f,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),s=Math.round(s/2),o=Math.round(o/2)}const l=ly;this.highPassUniforms=qs.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ct({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const h=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new ae(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qs.clone(Vr.uniforms),this.blendMaterial=new Ct({uniforms:this.copyUniforms,vertexShader:Vr.vertexShader,fragmentShader:Vr.fragmentShader,premultipliedAlpha:!0,blending:ta,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new fe,this._oldClearAlpha=1,this._basic=new Rt,this._fsQuad=new Ul(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ae(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let l=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[h].uniforms.direction.value=es.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=es.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this._fsQuad.render(e),l=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Ct({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ae(.5,.5)},direction:{value:new ae(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}es.BlurDirectionX=new ae(1,0);es.BlurDirectionY=new ae(0,1);const Dr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class cy extends ls{constructor(){super(),this.isOutputPass=!0,this.uniforms=qs.clone(Dr.uniforms),this.material=new lu({name:Dr.name,uniforms:this.uniforms,vertexShader:Dr.vertexShader,fragmentShader:Dr.fragmentShader}),this._fsQuad=new Ul(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===rl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ol?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===$r?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ll?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===cl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===al&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class hy{constructor({canvas:e,scene:t,camera:n}){this.canvas=e,this.scene=t,this.camera=n,this.renderer=new Sv({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.composer=null,this.bloom=null}setup(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Rs,this.renderer.outputColorSpace=Tt,this.renderer.toneMapping=$r,this.renderer.toneMappingExposure=.96,this.composer=new oy(this.renderer),this.composer.addPass(new ay(this.scene,this.camera)),this.bloom=new es(new ae(window.innerWidth,window.innerHeight),.12,.46,1.04),this.composer.addPass(this.bloom),this.composer.addPass(new cy)}setQuality(e){this.bloom&&(e==="low"?(this.bloom.strength=.04,this.renderer.shadowMap.enabled=!1):e==="high"?(this.bloom.strength=.2,this.renderer.shadowMap.enabled=!0):(this.bloom.strength=.12,this.renderer.shadowMap.enabled=!0))}render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}resize(){const e=Math.min(window.devicePixelRatio||1,1.8);this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer?.setSize(window.innerWidth,window.innerHeight),this.bloom?.resolution.set(window.innerWidth,window.innerHeight)}}class uy{constructor(e){this.RAPIER=e,this.canvas=document.getElementById("play-canvas"),this.scene=new $d,this.camera=new Wt(58,window.innerWidth/window.innerHeight,.1,900),this.rendererSystem=new hy({canvas:this.canvas,scene:this.scene,camera:this.camera}),this.renderer=this.rendererSystem.renderer,this.ticker=new bv,this.started=!1,this.activeZone=null,this.resumeData=null,this.lights={},this.fogDay=new fe(13496055),this.fogWarm=new fe(16049597)}async init(){this.resumeData=await this.fetchResumeData(),this.setupRenderer(),this.setupScene(),this.input=new wv(this.canvas),this.audio=new Ev,this.achievements=new Fv,this.physics=new zv(this.RAPIER),this.environmentAssets=await Ix(),this.world=new jx({scene:this.scene,physics:this.physics,resumeData:this.resumeData,environmentAssets:this.environmentAssets}),this.world.onQualityChange=e=>this.rendererSystem.setQuality(e),this.rendererSystem.setQuality(this.world.landscapeQuality),this.vehicle=new wx({scene:this.scene,physics:this.physics,achievements:this.achievements,audio:this.audio}),this.cameraRig=new Ax(this.camera,this.vehicle,this.input),this.analytics=new Ov,this.ui=new Jx({game:this,achievements:this.achievements,audio:this.audio}),this.analytics.init().then(()=>{Number.isFinite(this.analytics.potatoCount)&&this.ui.setPotatoCount(this.analytics.potatoCount)}).catch(()=>{}),this.setupEvents(),this.setupDebug(),this.ui.markLoaded(),this.renderer.setAnimationLoop(e=>this.loop(e))}async fetchResumeData(){const e=await fetch("resume_data.json",{cache:"no-store"});if(!e.ok)throw new Error(`Unable to load resume_data.json: ${e.status}`);return e.json()}setupRenderer(){this.rendererSystem.setup()}setupScene(){this.scene.background=new fe(9755899),this.scene.fog=new Ml(13496055,230,720),this.camera.position.set(0,9,-18);const e=new up(16775144,1522208,1.58);this.scene.add(e);const t=new ja(16766090,3.35);t.position.set(-112,96,-88),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-190,t.shadow.camera.right=190,t.shadow.camera.top=190,t.shadow.camera.bottom=-190,t.shadow.camera.near=1,t.shadow.camera.far=360,t.shadow.bias=-15e-5,t.shadow.normalBias=.08,this.scene.add(t);const n=new ja(12054783,.76);n.position.set(62,35,70),this.scene.add(n),this.lights={hemi:e,sun:t,rim:n}}setupEvents(){window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>{document.hidden?this.audio?.context?.suspend?.():this.audio?.resume()})}setupDebug(){window.__portfolioDrive={game:this,sampleCanvas:()=>{const e=this.renderer.getContext(),t=Math.max(1,Math.min(16,this.renderer.domElement.width)),n=Math.max(1,Math.min(16,this.renderer.domElement.height)),i=new Uint8Array(t*n*4);return e.readPixels(0,0,t,n,e.RGBA,e.UNSIGNED_BYTE,i),Array.from(i).reduce((s,o)=>s+o,0)},ready:()=>!!(this.world&&this.vehicle&&this.renderer),start:()=>this.startDriving(),respawn:e=>this.respawn(e),summonPotato:()=>this.summonPotato(),nearest:()=>this.activeZone?.name||null}}startDriving(){this.started=!0,this.audio.resume(),this.ui.hideTitle(),this.ui.notify("Drive started")}loop(e){this.ticker.tick(e);const t=this.ticker.delta,n=this.ticker.elapsed;this.input.update(),this.handleGlobalInput();const i=this.vehicle.position,s=this.world.nearestZone(i);this.activeZone=s?.zone||null;const o=this.started&&!this.ui.isPanelOpen();this.physics.step(t,h=>{if(o){this.vehicle.update(this.input,h);const u=this.world.checkBoostPad(this.vehicle.position);if(u&&this.vehicle.boostFromPad(u)&&this.ui?.notify?.("Boost pad launched"),this.world.checkCollectibles(this.vehicle.position).length){const a=this.world.getCollectedCount();this.ui?.notify?.(`Data shard ${a}/${this.world.collectibles.length}`),a===this.world.collectibles.length&&this.achievements.unlock("data_shards")}}}),this.vehicle.postPhysics(),o||this.vehicle.idleDampen(),this.world.update(t,n,this.vehicle.position),this.world.checkRampAir(this.vehicle.position,this.vehicle.body.linvel().y)&&this.achievements.unlock("ramp_jump"),this.updateLighting(n),this.cameraRig.update(t),this.audio.update(this.vehicle.speed,this.vehicle.controller?.driveState),this.ui.update({speed:this.vehicle.speed,activeZone:this.activeZone,circuit:this.world.circuit});const l=this.world.updateCircuit(this.vehicle.position,n);l?.finished?this.ui.notify(`Circuit finished: ${dy(l.lap)}`):l?.checkpoint&&(this.audio.click(700),this.ui.notify(`Checkpoint ${l.checkpoint}`)),this.rendererSystem.render(),this.input.clearTransient()}handleGlobalInput(){if(!this.started&&this.input.consume("interact")){this.startDriving();return}this.input.consume("menu")&&this.ui.toggleMenu(),this.input.consume("map")&&this.ui.toggleMap(),this.input.consume("potato")&&!this.ui.isPanelOpen()&&this.summonPotato(),this.input.consume("interact")&&this.activeZone&&!this.ui.isPanelOpen()&&this.ui.openZone(this.activeZone)}recordZoneVisit(e){this.analytics?.recordZone(e?.id)}async summonPotato(){const e=this.world.zones.find(s=>s.id==="potato");if(!e)return;const t=this.vehicle.position;if(!(Math.hypot(t.x-e.position.x,t.z-e.position.z)<=e.radius+6)){this.ui?.notify?.("Drive to the Potato Farm to summon one");return}this.world.spawnPotato(),this.achievements.unlock("potato_summon"),this.audio.click(190),this.ui?.notify?.("Potato summoned");const i=await this.analytics?.recordPotatoSummon?.();Number.isFinite(i)&&(this.ui.setPotatoCount(i),this.ui.notify(`Potato counter: ${i}`))}updateLighting(e){const t=Math.sin(e*.035)*.5+.5;this.lights.sun.intensity=3.05+t*.62,this.lights.rim.intensity=.7+(1-t)*.44,this.scene.fog.color.lerpColors(this.fogDay,this.fogWarm,t*.2)}getZoneLines(e){return e.lines?e.lines:e.dialogueId&&this.resumeData.dialogues?.[e.dialogueId]?this.resumeData.dialogues[e.dialogueId].lines||[]:["Information for this area is being prepared."]}focusZone(e){const t=e.position.clone().add(new R(7.5,7.2,9.5)),n=e.position.clone().add(new R(0,2.4,0));this.cameraRig.setCinematic(t,n)}clearFocus(){this.cameraRig.clearCinematic()}respawn(e="landing"){const t=this.world.getRespawnPose(e);this.vehicle.respawn(t.position,t.heading),this.audio.click(420)}resetWorld(){this.physics.resetDynamicVisuals()}startCircuit(){this.world.startCircuit(this.ticker.elapsed),this.achievements.unlock("circuit_gate"),this.ui.notify("Circuit started")}resize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.rendererSystem.resize()}}function dy(r){const e=Math.floor(r/60),t=r-e*60;return`${e}:${t.toFixed(2).padStart(5,"0")}`}async function fy(){const r=await Nu(()=>import("./rapier.es.js"),[],import.meta.url),e=console.warn;console.warn=(...n)=>{String(n[0]).includes("using deprecated parameters for the initialization function")||e(...n)};try{await r.init({})}finally{console.warn=e}await new uy(r).init()}fy().catch(r=>{console.error("Portfolio Drive failed to boot:",r);const e=document.getElementById("loading");e&&(e.innerHTML='<span class="boot-error">World failed to load. Refresh or try again in a moment.</span>')});
