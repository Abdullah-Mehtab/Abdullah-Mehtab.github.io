(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Ru="modulepreload",Cu=function(r,e){return new URL(r,e).href},Hl={},Pu=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let u=function(f){return Promise.all(f.map(a=>Promise.resolve(a).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),h=l?.nonce||l?.getAttribute("nonce");i=u(t.map(f=>{if(f=Cu(f,n),f in Hl)return;Hl[f]=!0;const a=f.endsWith(".css"),c=a?'[rel="stylesheet"]':"";if(n)for(let p=o.length-1;p>=0;p--){const _=o[p];if(_.href===f&&(!a||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${c}`))return;const d=document.createElement("link");if(d.rel=a?"stylesheet":Ru,a||(d.as="script"),d.crossOrigin="",d.href=f,h&&d.setAttribute("nonce",h),document.head.appendChild(d),a)return new Promise((p,_)=>{d.addEventListener("load",p),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};const el="183",Iu=0,Wl=1,Lu=2,Pr=1,Eh=2,Ms=3,Wn=0,Xt=1,Jt=2,En=0,ki=1,jo=2,Xl=3,ql=4,Du=5,mi=100,Nu=101,Fu=102,Uu=103,Ou=104,Bu=200,ku=201,zu=202,Vu=203,Jo=204,Qo=205,Gu=206,Hu=207,Wu=208,Xu=209,qu=210,Yu=211,Ku=212,$u=213,Zu=214,ea=0,ta=1,na=2,Gi=3,ia=4,sa=5,ra=6,oa=7,Ah=0,ju=1,Ju=2,An=0,tl=1,nl=2,il=3,Xr=4,sl=5,rl=6,ol=7,Yl="attached",Qu="detached",Rh=300,vi=301,Hi=302,to=303,no=304,qr=306,sn=1e3,bn=1001,kr=1002,wt=1003,Ch=1004,Ss=1005,bt=1006,Ir=1007,Tn=1008,Qt=1009,Ph=1010,Ih=1011,Ls=1012,al=1013,Cn=1014,rn=1015,en=1016,ll=1017,cl=1018,Ds=1020,Lh=35902,Dh=35899,Nh=1021,Fh=1022,on=1023,Xn=1026,_i=1027,hl=1028,ul=1029,Wi=1030,dl=1031,fl=1033,Lr=33776,Dr=33777,Nr=33778,Fr=33779,aa=35840,la=35841,ca=35842,ha=35843,ua=36196,da=37492,fa=37496,pa=37488,ma=37489,ga=37490,_a=37491,va=37808,xa=37809,ya=37810,Ma=37811,Sa=37812,ba=37813,Ta=37814,wa=37815,Ea=37816,Aa=37817,Ra=37818,Ca=37819,Pa=37820,Ia=37821,La=36492,Da=36494,Na=36495,Fa=36283,Ua=36284,Oa=36285,Ba=36286,Ns=2300,Fs=2301,io=2302,Kl=2303,$l=2400,Zl=2401,jl=2402,ed=2500,td=0,Uh=1,ka=2,nd=3200,Oh=0,id=1,ti="",Nt="srgb",qt="srgb-linear",zr="linear",Je="srgb",Si=7680,Jl=519,sd=512,rd=513,od=514,pl=515,ad=516,ld=517,ml=518,cd=519,za=35044,Ql="300 es",wn=2e3,Us=2001;function hd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ud(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Os(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function dd(){const r=Os("canvas");return r.style.display="block",r}const ec={};function Vr(...r){const e="THREE."+r.shift();console.log(e,...r)}function Bh(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ae(...r){r=Bh(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Le(...r){r=Bh(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Gr(...r){const e=r.join(" ");e in ec||(ec[e]=!0,Ae(...r))}function fd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const pd={[ea]:ta,[na]:ra,[ia]:oa,[Gi]:sa,[ta]:ea,[ra]:na,[oa]:ia,[sa]:Gi};class Ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const ws=Math.PI/180,Xi=180/Math.PI;function an(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]).toLowerCase()}function We(r,e,t){return Math.max(e,Math.min(t,r))}function gl(r,e){return(r%e+e)%e}function md(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function gd(r,e,t){return r!==e?(t-r)/(e-r):0}function Es(r,e,t){return(1-t)*r+t*e}function _d(r,e,t,n){return Es(r,e,1-Math.exp(-t*n))}function vd(r,e=1){return e-Math.abs(gl(r,e*2)-e)}function xd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function yd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Md(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Sd(r,e){return r+Math.random()*(e-r)}function bd(r){return r*(.5-Math.random())}function Td(r){r!==void 0&&(tc=r);let e=tc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wd(r){return r*ws}function Ed(r){return r*Xi}function Ad(r){return(r&r-1)===0&&r!==0}function Rd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Cd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Pd(r,e,t,n,i){const s=Math.cos,o=Math.sin,l=s(t/2),h=o(t/2),u=s((e+n)/2),f=o((e+n)/2),a=s((e-n)/2),c=o((e-n)/2),d=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(l*f,h*a,h*c,l*u);break;case"YZY":r.set(h*c,l*f,h*a,l*u);break;case"ZXZ":r.set(h*a,h*c,l*f,l*u);break;case"XZX":r.set(l*f,h*p,h*d,l*u);break;case"YXY":r.set(h*d,l*f,h*p,l*u);break;case"ZYZ":r.set(h*p,h*d,l*f,l*u);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function fn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const jt={DEG2RAD:ws,RAD2DEG:Xi,generateUUID:an,clamp:We,euclideanModulo:gl,mapLinear:md,inverseLerp:gd,lerp:Es,damp:_d,pingpong:vd,smoothstep:xd,smootherstep:yd,randInt:Md,randFloat:Sd,randFloatSpread:bd,seededRandom:Td,degToRad:wd,radToDeg:Ed,isPowerOfTwo:Ad,ceilPowerOfTwo:Rd,floorPowerOfTwo:Cd,setQuaternionFromProperEuler:Pd,normalize:tt,denormalize:fn};class oe{constructor(e=0,t=0){oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,l){let h=n[i+0],u=n[i+1],f=n[i+2],a=n[i+3],c=s[o+0],d=s[o+1],p=s[o+2],_=s[o+3];if(a!==_||h!==c||u!==d||f!==p){let g=h*c+u*d+f*p+a*_;g<0&&(c=-c,d=-d,p=-p,_=-_,g=-g);let m=1-l;if(g<.9995){const v=Math.acos(g),M=Math.sin(v);m=Math.sin(m*v)/M,l=Math.sin(l*v)/M,h=h*m+c*l,u=u*m+d*l,f=f*m+p*l,a=a*m+_*l}else{h=h*m+c*l,u=u*m+d*l,f=f*m+p*l,a=a*m+_*l;const v=1/Math.sqrt(h*h+u*u+f*f+a*a);h*=v,u*=v,f*=v,a*=v}}e[t]=h,e[t+1]=u,e[t+2]=f,e[t+3]=a}static multiplyQuaternionsFlat(e,t,n,i,s,o){const l=n[i],h=n[i+1],u=n[i+2],f=n[i+3],a=s[o],c=s[o+1],d=s[o+2],p=s[o+3];return e[t]=l*p+f*a+h*d-u*c,e[t+1]=h*p+f*c+u*a-l*d,e[t+2]=u*p+f*d+l*c-h*a,e[t+3]=f*p-l*a-h*c-u*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,l=Math.cos,h=Math.sin,u=l(n/2),f=l(i/2),a=l(s/2),c=h(n/2),d=h(i/2),p=h(s/2);switch(o){case"XYZ":this._x=c*f*a+u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a-c*d*p;break;case"YXZ":this._x=c*f*a+u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a+c*d*p;break;case"ZXY":this._x=c*f*a-u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a-c*d*p;break;case"ZYX":this._x=c*f*a-u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a+c*d*p;break;case"YZX":this._x=c*f*a+u*d*p,this._y=u*d*a+c*f*p,this._z=u*f*p-c*d*a,this._w=u*f*a-c*d*p;break;case"XZY":this._x=c*f*a-u*d*p,this._y=u*d*a-c*f*p,this._z=u*f*p+c*d*a,this._w=u*f*a+c*d*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],l=t[5],h=t[9],u=t[2],f=t[6],a=t[10],c=n+l+a;if(c>0){const d=.5/Math.sqrt(c+1);this._w=.25/d,this._x=(f-h)*d,this._y=(s-u)*d,this._z=(o-i)*d}else if(n>l&&n>a){const d=2*Math.sqrt(1+n-l-a);this._w=(f-h)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+u)/d}else if(l>a){const d=2*Math.sqrt(1+l-n-a);this._w=(s-u)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(h+f)/d}else{const d=2*Math.sqrt(1+a-n-l);this._w=(o-i)/d,this._x=(s+u)/d,this._y=(h+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,l=t._x,h=t._y,u=t._z,f=t._w;return this._x=n*f+o*l+i*u-s*h,this._y=i*f+o*h+s*l-n*u,this._z=s*f+o*u+n*h-i*l,this._w=o*f-n*l-i*h-s*u,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,l=this.dot(e);l<0&&(n=-n,i=-i,s=-s,o=-o,l=-l);let h=1-t;if(l<.9995){const u=Math.acos(l),f=Math.sin(u);h=Math.sin(h*u)/f,t=Math.sin(t*u)/f,this._x=this._x*h+n*t,this._y=this._y*h+i*t,this._z=this._z*h+s*t,this._w=this._w*h+o*t,this._onChangeCallback()}else this._x=this._x*h+n*t,this._y=this._y*h+i*t,this._z=this._z*h+s*t,this._w=this._w*h+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,l=e.z,h=e.w,u=2*(o*i-l*n),f=2*(l*t-s*i),a=2*(s*n-o*t);return this.x=t+h*u+o*a-l*f,this.y=n+h*f+l*u-s*a,this.z=i+h*a+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,l=t.y,h=t.z;return this.x=i*h-s*l,this.y=s*o-n*h,this.z=n*l-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return so.copy(this).projectOnVector(e),this.sub(so)}reflect(e){return this.sub(so.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const so=new R,nc=new Ut;class Oe{constructor(e,t,n,i,s,o,l,h,u){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,l,h,u)}set(e,t,n,i,s,o,l,h,u){const f=this.elements;return f[0]=e,f[1]=i,f[2]=l,f[3]=t,f[4]=s,f[5]=h,f[6]=n,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],l=n[3],h=n[6],u=n[1],f=n[4],a=n[7],c=n[2],d=n[5],p=n[8],_=i[0],g=i[3],m=i[6],v=i[1],M=i[4],S=i[7],A=i[2],w=i[5],P=i[8];return s[0]=o*_+l*v+h*A,s[3]=o*g+l*M+h*w,s[6]=o*m+l*S+h*P,s[1]=u*_+f*v+a*A,s[4]=u*g+f*M+a*w,s[7]=u*m+f*S+a*P,s[2]=c*_+d*v+p*A,s[5]=c*g+d*M+p*w,s[8]=c*m+d*S+p*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8];return t*o*f-t*l*u-n*s*f+n*l*h+i*s*u-i*o*h}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8],a=f*o-l*u,c=l*h-f*s,d=u*s-o*h,p=t*a+n*c+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=a*_,e[1]=(i*u-f*n)*_,e[2]=(l*n-i*o)*_,e[3]=c*_,e[4]=(f*t-i*h)*_,e[5]=(i*s-l*t)*_,e[6]=d*_,e[7]=(n*h-u*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,l){const h=Math.cos(s),u=Math.sin(s);return this.set(n*h,n*u,-n*(h*o+u*l)+o+e,-i*u,i*h,-i*(-u*o+h*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(ro.makeScale(e,t)),this}rotate(e){return this.premultiply(ro.makeRotation(-e)),this}translate(e,t){return this.premultiply(ro.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ro=new Oe,ic=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sc=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Id(){const r={enabled:!0,workingColorSpace:qt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Je&&(i.r=Hn(i.r),i.g=Hn(i.g),i.b=Hn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Je&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ti?zr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Gr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Gr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[qt]:{primaries:e,whitePoint:n,transfer:zr,toXYZ:ic,fromXYZ:sc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:ic,fromXYZ:sc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),r}const qe=Id();function Hn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let bi;class Ld{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bi===void 0&&(bi=Os("canvas")),bi.width=e.width,bi.height=e.height;const i=bi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=bi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Os("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Hn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dd=0;class _l{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=an(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,l=i.length;o<l;o++)i[o].isDataTexture?s.push(oo(i[o].image)):s.push(oo(i[o]))}else s=oo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function oo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ld.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let Nd=0;const ao=new R;class Et extends Ji{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=bn,i=bn,s=bt,o=Tn,l=on,h=Qt,u=Et.DEFAULT_ANISOTROPY,f=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=an(),this.name="",this.source=new _l(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=h,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ao).x}get height(){return this.source.getSize(ao).y}get depth(){return this.source.getSize(ao).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sn:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case kr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sn:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case kr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=Rh;Et.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,i=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const h=e.elements,u=h[0],f=h[4],a=h[8],c=h[1],d=h[5],p=h[9],_=h[2],g=h[6],m=h[10];if(Math.abs(f-c)<.01&&Math.abs(a-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(f+c)<.1&&Math.abs(a+_)<.1&&Math.abs(p+g)<.1&&Math.abs(u+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(u+1)/2,S=(d+1)/2,A=(m+1)/2,w=(f+c)/4,P=(a+_)/4,x=(p+g)/4;return M>S&&M>A?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=w/n,s=P/n):S>A?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=w/i,s=x/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=P/s,i=x/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(a-_)*(a-_)+(c-f)*(c-f));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(a-_)/v,this.z=(c-f)/v,this.w=Math.acos((u+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fd extends Ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new Et(i),o=n.count;for(let l=0;l<o;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new _l(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yt extends Fd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kh extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ud extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Be{constructor(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g){Be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g)}set(e,t,n,i,s,o,l,h,u,f,a,c,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=l,m[13]=h,m[2]=u,m[6]=f,m[10]=a,m[14]=c,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Be().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ti.setFromMatrixColumn(e,0).length(),s=1/Ti.setFromMatrixColumn(e,1).length(),o=1/Ti.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),l=Math.sin(n),h=Math.cos(i),u=Math.sin(i),f=Math.cos(s),a=Math.sin(s);if(e.order==="XYZ"){const c=o*f,d=o*a,p=l*f,_=l*a;t[0]=h*f,t[4]=-h*a,t[8]=u,t[1]=d+p*u,t[5]=c-_*u,t[9]=-l*h,t[2]=_-c*u,t[6]=p+d*u,t[10]=o*h}else if(e.order==="YXZ"){const c=h*f,d=h*a,p=u*f,_=u*a;t[0]=c+_*l,t[4]=p*l-d,t[8]=o*u,t[1]=o*a,t[5]=o*f,t[9]=-l,t[2]=d*l-p,t[6]=_+c*l,t[10]=o*h}else if(e.order==="ZXY"){const c=h*f,d=h*a,p=u*f,_=u*a;t[0]=c-_*l,t[4]=-o*a,t[8]=p+d*l,t[1]=d+p*l,t[5]=o*f,t[9]=_-c*l,t[2]=-o*u,t[6]=l,t[10]=o*h}else if(e.order==="ZYX"){const c=o*f,d=o*a,p=l*f,_=l*a;t[0]=h*f,t[4]=p*u-d,t[8]=c*u+_,t[1]=h*a,t[5]=_*u+c,t[9]=d*u-p,t[2]=-u,t[6]=l*h,t[10]=o*h}else if(e.order==="YZX"){const c=o*h,d=o*u,p=l*h,_=l*u;t[0]=h*f,t[4]=_-c*a,t[8]=p*a+d,t[1]=a,t[5]=o*f,t[9]=-l*f,t[2]=-u*f,t[6]=d*a+p,t[10]=c-_*a}else if(e.order==="XZY"){const c=o*h,d=o*u,p=l*h,_=l*u;t[0]=h*f,t[4]=-a,t[8]=u*f,t[1]=c*a+_,t[5]=o*f,t[9]=d*a-p,t[2]=p*a-d,t[6]=l*f,t[10]=_*a+c}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Od,e,Bd)}lookAt(e,t,n){const i=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Kn.crossVectors(n,$t),Kn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Kn.crossVectors(n,$t)),Kn.normalize(),js.crossVectors($t,Kn),i[0]=Kn.x,i[4]=js.x,i[8]=$t.x,i[1]=Kn.y,i[5]=js.y,i[9]=$t.y,i[2]=Kn.z,i[6]=js.z,i[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],l=n[4],h=n[8],u=n[12],f=n[1],a=n[5],c=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],M=n[7],S=n[11],A=n[15],w=i[0],P=i[4],x=i[8],b=i[12],O=i[1],C=i[5],F=i[9],U=i[13],B=i[2],k=i[6],z=i[10],G=i[14],Q=i[3],Z=i[7],he=i[11],ge=i[15];return s[0]=o*w+l*O+h*B+u*Q,s[4]=o*P+l*C+h*k+u*Z,s[8]=o*x+l*F+h*z+u*he,s[12]=o*b+l*U+h*G+u*ge,s[1]=f*w+a*O+c*B+d*Q,s[5]=f*P+a*C+c*k+d*Z,s[9]=f*x+a*F+c*z+d*he,s[13]=f*b+a*U+c*G+d*ge,s[2]=p*w+_*O+g*B+m*Q,s[6]=p*P+_*C+g*k+m*Z,s[10]=p*x+_*F+g*z+m*he,s[14]=p*b+_*U+g*G+m*ge,s[3]=v*w+M*O+S*B+A*Q,s[7]=v*P+M*C+S*k+A*Z,s[11]=v*x+M*F+S*z+A*he,s[15]=v*b+M*U+S*G+A*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],l=e[5],h=e[9],u=e[13],f=e[2],a=e[6],c=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15],v=h*d-u*c,M=l*d-u*a,S=l*c-h*a,A=o*d-u*f,w=o*c-h*f,P=o*a-l*f;return t*(_*v-g*M+m*S)-n*(p*v-g*A+m*w)+i*(p*M-_*A+m*P)-s*(p*S-_*w+g*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],l=e[5],h=e[6],u=e[7],f=e[8],a=e[9],c=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=t*l-n*o,M=t*h-i*o,S=t*u-s*o,A=n*h-i*l,w=n*u-s*l,P=i*u-s*h,x=f*_-a*p,b=f*g-c*p,O=f*m-d*p,C=a*g-c*_,F=a*m-d*_,U=c*m-d*g,B=v*U-M*F+S*C+A*O-w*b+P*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/B;return e[0]=(l*U-h*F+u*C)*k,e[1]=(i*F-n*U-s*C)*k,e[2]=(_*P-g*w+m*A)*k,e[3]=(c*w-a*P-d*A)*k,e[4]=(h*O-o*U-u*b)*k,e[5]=(t*U-i*O+s*b)*k,e[6]=(g*S-p*P-m*M)*k,e[7]=(f*P-c*S+d*M)*k,e[8]=(o*F-l*O+u*x)*k,e[9]=(n*O-t*F-s*x)*k,e[10]=(p*w-_*S+m*v)*k,e[11]=(a*S-f*w-d*v)*k,e[12]=(l*b-o*C-h*x)*k,e[13]=(t*C-n*b+i*x)*k,e[14]=(_*M-p*A-g*v)*k,e[15]=(f*A-a*M+c*v)*k,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,l=e.y,h=e.z,u=s*o,f=s*l;return this.set(u*o+n,u*l-i*h,u*h+i*l,0,u*l+i*h,f*l+n,f*h-i*o,0,u*h-i*l,f*h+i*o,s*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,l=t._z,h=t._w,u=s+s,f=o+o,a=l+l,c=s*u,d=s*f,p=s*a,_=o*f,g=o*a,m=l*a,v=h*u,M=h*f,S=h*a,A=n.x,w=n.y,P=n.z;return i[0]=(1-(_+m))*A,i[1]=(d+S)*A,i[2]=(p-M)*A,i[3]=0,i[4]=(d-S)*w,i[5]=(1-(c+m))*w,i[6]=(g+v)*w,i[7]=0,i[8]=(p+M)*P,i[9]=(g-v)*P,i[10]=(1-(c+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ti.set(i[0],i[1],i[2]).length();const l=Ti.set(i[4],i[5],i[6]).length(),h=Ti.set(i[8],i[9],i[10]).length();s<0&&(o=-o),hn.copy(this);const u=1/o,f=1/l,a=1/h;return hn.elements[0]*=u,hn.elements[1]*=u,hn.elements[2]*=u,hn.elements[4]*=f,hn.elements[5]*=f,hn.elements[6]*=f,hn.elements[8]*=a,hn.elements[9]*=a,hn.elements[10]*=a,t.setFromRotationMatrix(hn),n.x=o,n.y=l,n.z=h,this}makePerspective(e,t,n,i,s,o,l=wn,h=!1){const u=this.elements,f=2*s/(t-e),a=2*s/(n-i),c=(t+e)/(t-e),d=(n+i)/(n-i);let p,_;if(h)p=s/(o-s),_=o*s/(o-s);else if(l===wn)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(l===Us)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=f,u[4]=0,u[8]=c,u[12]=0,u[1]=0,u[5]=a,u[9]=d,u[13]=0,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,i,s,o,l=wn,h=!1){const u=this.elements,f=2/(t-e),a=2/(n-i),c=-(t+e)/(t-e),d=-(n+i)/(n-i);let p,_;if(h)p=1/(o-s),_=o/(o-s);else if(l===wn)p=-2/(o-s),_=-(o+s)/(o-s);else if(l===Us)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=f,u[4]=0,u[8]=0,u[12]=c,u[1]=0,u[5]=a,u[9]=0,u[13]=d,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ti=new R,hn=new Be,Od=new R(0,0,0),Bd=new R(1,1,1),Kn=new R,js=new R,$t=new R,rc=new Be,oc=new Ut;class ln{constructor(e=0,t=0,n=0,i=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],l=i[8],h=i[1],u=i[5],f=i[9],a=i[2],c=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,d),this._z=Math.atan2(h,u)):(this._y=Math.atan2(-a,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-a,d),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,d),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-a,s)):(this._x=0,this._y=Math.atan2(l,d));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oc.setFromEuler(this),this.setFromQuaternion(oc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class zh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kd=0;const ac=new R,wi=new Ut,Un=new Be,Js=new R,os=new R,zd=new R,Vd=new Ut,lc=new R(1,0,0),cc=new R(0,1,0),hc=new R(0,0,1),uc={type:"added"},Gd={type:"removed"},Ei={type:"childadded",child:null},lo={type:"childremoved",child:null};class dt extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new R,t=new ln,n=new Ut,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new Oe}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(lc,e)}rotateY(e){return this.rotateOnAxis(cc,e)}rotateZ(e){return this.rotateOnAxis(hc,e)}translateOnAxis(e,t){return ac.copy(e).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lc,e)}translateY(e){return this.translateOnAxis(cc,e)}translateZ(e){return this.translateOnAxis(hc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(os,Js,this.up):Un.lookAt(Js,os,this.up),this.quaternion.setFromRotationMatrix(Un),i&&(Un.extractRotation(i.matrixWorld),wi.setFromRotationMatrix(Un),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Le("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uc),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):Le("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gd),lo.child=e,this.dispatchEvent(lo),lo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uc),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,e,zd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,Vd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(l=>({...l})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(l,h){return l[h.uuid]===void 0&&(l[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const h=l.shapes;if(Array.isArray(h))for(let u=0,f=h.length;u<f;u++){const a=h[u];s(e.shapes,a)}else s(e.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let h=0,u=this.material.length;h<u;h++)l.push(s(e.materials,this.material[h]));i.material=l}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){const h=this.animations[l];i.animations.push(s(e.animations,h))}}if(t){const l=o(e.geometries),h=o(e.materials),u=o(e.textures),f=o(e.images),a=o(e.shapes),c=o(e.skeletons),d=o(e.animations),p=o(e.nodes);l.length>0&&(n.geometries=l),h.length>0&&(n.materials=h),u.length>0&&(n.textures=u),f.length>0&&(n.images=f),a.length>0&&(n.shapes=a),c.length>0&&(n.skeletons=c),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(l){const h=[];for(const u in l){const f=l[u];delete f.metadata,h.push(f)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dt.DEFAULT_UP=new R(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $e extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hd={type:"move"};class co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const l=this._targetRay,h=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(u,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const f=u.joints["index-finger-tip"],a=u.joints["thumb-tip"],c=f.position.distanceTo(a.position),d=.02,p=.005;u.inputState.pinching&&c>d+p?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&c<=d-p&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));l!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Hd)))}return l!==null&&(l.visible=i!==null),h!==null&&(h.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function ho(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class me{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=gl(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ho(o,s,e+1/3),this.g=ho(o,s,e),this.b=ho(o,s,e-1/3)}return qe.colorSpaceToWorking(this,i),this}setStyle(e,t=Nt){function n(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],l=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const n=Vh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return qe.workingToColorSpace(Vt.copy(this),e),Math.round(We(Vt.r*255,0,255))*65536+Math.round(We(Vt.g*255,0,255))*256+Math.round(We(Vt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Vt.copy(this),t);const n=Vt.r,i=Vt.g,s=Vt.b,o=Math.max(n,i,s),l=Math.min(n,i,s);let h,u;const f=(l+o)/2;if(l===o)h=0,u=0;else{const a=o-l;switch(u=f<=.5?a/(o+l):a/(2-o-l),o){case n:h=(i-s)/a+(i<s?6:0);break;case i:h=(s-n)/a+2;break;case s:h=(n-i)/a+4;break}h/=6}return e.h=h,e.s=u,e.l=f,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Nt){qe.workingToColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,i=Vt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL($n),this.setHSL($n.h+e,$n.s+t,$n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($n),e.getHSL(Qs);const n=Es($n.h,Qs.h,t),i=Es($n.s,Qs.s,t),s=Es($n.l,Qs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new me;me.NAMES=Vh;class vl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new me(e),this.near=t,this.far=n}clone(){return new vl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wd extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const un=new R,On=new R,uo=new R,Bn=new R,Ai=new R,Ri=new R,dc=new R,fo=new R,po=new R,mo=new R,go=new ht,_o=new ht,vo=new ht;class pn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),un.subVectors(e,t),i.cross(un);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){un.subVectors(i,t),On.subVectors(n,t),uo.subVectors(e,t);const o=un.dot(un),l=un.dot(On),h=un.dot(uo),u=On.dot(On),f=On.dot(uo),a=o*u-l*l;if(a===0)return s.set(0,0,0),null;const c=1/a,d=(u*h-l*f)*c,p=(o*f-l*h)*c;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,i,s,o,l,h){return this.getBarycoord(e,t,n,i,Bn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,Bn.x),h.addScaledVector(o,Bn.y),h.addScaledVector(l,Bn.z),h)}static getInterpolatedAttribute(e,t,n,i,s,o){return go.setScalar(0),_o.setScalar(0),vo.setScalar(0),go.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),vo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(go,s.x),o.addScaledVector(_o,s.y),o.addScaledVector(vo,s.z),o}static isFrontFacing(e,t,n,i){return un.subVectors(n,t),On.subVectors(e,t),un.cross(On).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return un.subVectors(this.c,this.b),On.subVectors(this.a,this.b),un.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,l;Ai.subVectors(i,n),Ri.subVectors(s,n),fo.subVectors(e,n);const h=Ai.dot(fo),u=Ri.dot(fo);if(h<=0&&u<=0)return t.copy(n);po.subVectors(e,i);const f=Ai.dot(po),a=Ri.dot(po);if(f>=0&&a<=f)return t.copy(i);const c=h*a-f*u;if(c<=0&&h>=0&&f<=0)return o=h/(h-f),t.copy(n).addScaledVector(Ai,o);mo.subVectors(e,s);const d=Ai.dot(mo),p=Ri.dot(mo);if(p>=0&&d<=p)return t.copy(s);const _=d*u-h*p;if(_<=0&&u>=0&&p<=0)return l=u/(u-p),t.copy(n).addScaledVector(Ri,l);const g=f*p-d*a;if(g<=0&&a-f>=0&&d-p>=0)return dc.subVectors(s,i),l=(a-f)/(a-f+(d-p)),t.copy(i).addScaledVector(dc,l);const m=1/(g+_+c);return o=_*m,l=c*m,t.copy(n).addScaledVector(Ai,o).addScaledVector(Ri,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Pn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,dn):dn.fromBufferAttribute(s,o),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(as),tr.subVectors(this.max,as),Ci.subVectors(e.a,as),Pi.subVectors(e.b,as),Ii.subVectors(e.c,as),Zn.subVectors(Pi,Ci),jn.subVectors(Ii,Pi),oi.subVectors(Ci,Ii);let t=[0,-Zn.z,Zn.y,0,-jn.z,jn.y,0,-oi.z,oi.y,Zn.z,0,-Zn.x,jn.z,0,-jn.x,oi.z,0,-oi.x,-Zn.y,Zn.x,0,-jn.y,jn.x,0,-oi.y,oi.x,0];return!xo(t,Ci,Pi,Ii,tr)||(t=[1,0,0,0,1,0,0,0,1],!xo(t,Ci,Pi,Ii,tr))?!1:(nr.crossVectors(Zn,jn),t=[nr.x,nr.y,nr.z],xo(t,Ci,Pi,Ii,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const kn=[new R,new R,new R,new R,new R,new R,new R,new R],dn=new R,er=new Pn,Ci=new R,Pi=new R,Ii=new R,Zn=new R,jn=new R,oi=new R,as=new R,tr=new R,nr=new R,ai=new R;function xo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ai.fromArray(r,s);const l=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),h=e.dot(ai),u=t.dot(ai),f=n.dot(ai);if(Math.max(-Math.max(h,u,f),Math.min(h,u,f))>l)return!1}return!0}const St=new R,ir=new oe;let Xd=0;class At{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=za,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ir.fromBufferAttribute(this,t),ir.applyMatrix3(e),this.setXY(t,ir.x,ir.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==za&&(e.usage=this.usage),e}}class Gh extends At{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Hh extends At{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ze extends At{constructor(e,t,n){super(new Float32Array(e),t,n)}}const qd=new Pn,ls=new R,yo=new R;class In{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ls.subVectors(e,this.center);const t=ls.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ls,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ls.copy(e.center).add(yo)),this.expandByPoint(ls.copy(e.center).sub(yo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Yd=0;const tn=new Be,Mo=new dt,Li=new R,Zt=new Pn,cs=new Pn,Lt=new R;class gt extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hd(e)?Hh:Gh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,n){return tn.makeTranslation(e,t,n),this.applyMatrix4(tn),this}scale(e,t,n){return tn.makeScale(e,t,n),this.applyMatrix4(tn),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ze(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];cs.setFromBufferAttribute(l),this.morphTargetsRelative?(Lt.addVectors(Zt.min,cs.min),Zt.expandByPoint(Lt),Lt.addVectors(Zt.max,cs.max),Zt.expandByPoint(Lt)):(Zt.expandByPoint(cs.min),Zt.expandByPoint(cs.max))}Zt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Lt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Lt));if(t)for(let s=0,o=t.length;s<o;s++){const l=t[s],h=this.morphTargetsRelative;for(let u=0,f=l.count;u<f;u++)Lt.fromBufferAttribute(l,u),h&&(Li.fromBufferAttribute(e,u),Lt.add(Li)),i=Math.max(i,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),l=[],h=[];for(let x=0;x<n.count;x++)l[x]=new R,h[x]=new R;const u=new R,f=new R,a=new R,c=new oe,d=new oe,p=new oe,_=new R,g=new R;function m(x,b,O){u.fromBufferAttribute(n,x),f.fromBufferAttribute(n,b),a.fromBufferAttribute(n,O),c.fromBufferAttribute(s,x),d.fromBufferAttribute(s,b),p.fromBufferAttribute(s,O),f.sub(u),a.sub(u),d.sub(c),p.sub(c);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(_.copy(f).multiplyScalar(p.y).addScaledVector(a,-d.y).multiplyScalar(C),g.copy(a).multiplyScalar(d.x).addScaledVector(f,-p.x).multiplyScalar(C),l[x].add(_),l[b].add(_),l[O].add(_),h[x].add(g),h[b].add(g),h[O].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,b=v.length;x<b;++x){const O=v[x],C=O.start,F=O.count;for(let U=C,B=C+F;U<B;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const M=new R,S=new R,A=new R,w=new R;function P(x){A.fromBufferAttribute(i,x),w.copy(A);const b=l[x];M.copy(b),M.sub(A.multiplyScalar(A.dot(b))).normalize(),S.crossVectors(w,b);const C=S.dot(h[x])<0?-1:1;o.setXYZW(x,M.x,M.y,M.z,C)}for(let x=0,b=v.length;x<b;++x){const O=v[x],C=O.start,F=O.count;for(let U=C,B=C+F;U<B;U+=3)P(e.getX(U+0)),P(e.getX(U+1)),P(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let c=0,d=n.count;c<d;c++)n.setXYZ(c,0,0,0);const i=new R,s=new R,o=new R,l=new R,h=new R,u=new R,f=new R,a=new R;if(e)for(let c=0,d=e.count;c<d;c+=3){const p=e.getX(c+0),_=e.getX(c+1),g=e.getX(c+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),f.subVectors(o,s),a.subVectors(i,s),f.cross(a),l.fromBufferAttribute(n,p),h.fromBufferAttribute(n,_),u.fromBufferAttribute(n,g),l.add(f),h.add(f),u.add(f),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(_,h.x,h.y,h.z),n.setXYZ(g,u.x,u.y,u.z)}else for(let c=0,d=t.count;c<d;c+=3)i.fromBufferAttribute(t,c+0),s.fromBufferAttribute(t,c+1),o.fromBufferAttribute(t,c+2),f.subVectors(o,s),a.subVectors(i,s),f.cross(a),n.setXYZ(c+0,f.x,f.y,f.z),n.setXYZ(c+1,f.x,f.y,f.z),n.setXYZ(c+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(l,h){const u=l.array,f=l.itemSize,a=l.normalized,c=new u.constructor(h.length*f);let d=0,p=0;for(let _=0,g=h.length;_<g;_++){l.isInterleavedBufferAttribute?d=h[_]*l.data.stride+l.offset:d=h[_]*f;for(let m=0;m<f;m++)c[p++]=u[d++]}return new At(c,f,a)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,n=this.index.array,i=this.attributes;for(const l in i){const h=i[l],u=e(h,n);t.setAttribute(l,u)}const s=this.morphAttributes;for(const l in s){const h=[],u=s[l];for(let f=0,a=u.length;f<a;f++){const c=u[f],d=e(c,n);h.push(d)}t.morphAttributes[l]=h}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const u in h)h[u]!==void 0&&(e[u]=h[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const u=n[h];e.data.attributes[h]=u.toJSON(e.data)}const i={};let s=!1;for(const h in this.morphAttributes){const u=this.morphAttributes[h],f=[];for(let a=0,c=u.length;a<c;a++){const d=u[a];f.push(d.toJSON(e.data))}f.length>0&&(i[h]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const u in i){const f=i[u];this.setAttribute(u,f.clone(t))}const s=e.morphAttributes;for(const u in s){const f=[],a=s[u];for(let c=0,d=a.length;c<d;c++)f.push(a[c].clone(t));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const a=o[u];this.addGroup(a.start,a.count,a.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=za,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new R;class xl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Vr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new At(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new xl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let $d=0;class Rn extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=an(),this.name="",this.type="Material",this.blending=ki,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jo,this.blendDst=Qo,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new me(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jo&&(n.blendSrc=this.blendSrc),this.blendDst!==Qo&&(n.blendDst=this.blendDst),this.blendEquation!==mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const l in s){const h=s[l];delete h.metadata,o.push(h)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const zn=new R,So=new R,sr=new R,Jn=new R,bo=new R,rr=new R,To=new R;class Yr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){So.copy(e).add(t).multiplyScalar(.5),sr.copy(t).sub(e).normalize(),Jn.copy(this.origin).sub(So);const s=e.distanceTo(t)*.5,o=-this.direction.dot(sr),l=Jn.dot(this.direction),h=-Jn.dot(sr),u=Jn.lengthSq(),f=Math.abs(1-o*o);let a,c,d,p;if(f>0)if(a=o*h-l,c=o*l-h,p=s*f,a>=0)if(c>=-p)if(c<=p){const _=1/f;a*=_,c*=_,d=a*(a+o*c+2*l)+c*(o*a+c+2*h)+u}else c=s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;else c=-s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;else c<=-p?(a=Math.max(0,-(-o*s+l)),c=a>0?-s:Math.min(Math.max(-s,-h),s),d=-a*a+c*(c+2*h)+u):c<=p?(a=0,c=Math.min(Math.max(-s,-h),s),d=c*(c+2*h)+u):(a=Math.max(0,-(o*s+l)),c=a>0?s:Math.min(Math.max(-s,-h),s),d=-a*a+c*(c+2*h)+u);else c=o>0?-s:s,a=Math.max(0,-(o*c+l)),d=-a*a+c*(c+2*h)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,a),i&&i.copy(So).addScaledVector(sr,c),d}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),i=zn.dot(zn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),l=n-o,h=n+o;return h<0?null:l<0?this.at(h,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,l,h;const u=1/this.direction.x,f=1/this.direction.y,a=1/this.direction.z,c=this.origin;return u>=0?(n=(e.min.x-c.x)*u,i=(e.max.x-c.x)*u):(n=(e.max.x-c.x)*u,i=(e.min.x-c.x)*u),f>=0?(s=(e.min.y-c.y)*f,o=(e.max.y-c.y)*f):(s=(e.max.y-c.y)*f,o=(e.min.y-c.y)*f),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),a>=0?(l=(e.min.z-c.z)*a,h=(e.max.z-c.z)*a):(l=(e.max.z-c.z)*a,h=(e.min.z-c.z)*a),n>h||l>i)||((l>n||n!==n)&&(n=l),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,i,s){bo.subVectors(t,e),rr.subVectors(n,e),To.crossVectors(bo,rr);let o=this.direction.dot(To),l;if(o>0){if(i)return null;l=1}else if(o<0)l=-1,o=-o;else return null;Jn.subVectors(this.origin,e);const h=l*this.direction.dot(rr.crossVectors(Jn,rr));if(h<0)return null;const u=l*this.direction.dot(bo.cross(Jn));if(u<0||h+u>o)return null;const f=-l*Jn.dot(To);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Tt extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fc=new Be,li=new Yr,or=new In,pc=new R,ar=new R,lr=new R,cr=new R,wo=new R,hr=new R,mc=new R,ur=new R;class Te extends dt{constructor(e=new gt,t=new Tt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const l=this.morphTargetInfluences;if(s&&l){hr.set(0,0,0);for(let h=0,u=s.length;h<u;h++){const f=l[h],a=s[h];f!==0&&(wo.fromBufferAttribute(a,e),o?hr.addScaledVector(wo,f):hr.addScaledVector(wo.sub(t),f))}t.add(hr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(s),li.copy(e.ray).recast(e.near),!(or.containsPoint(li.origin)===!1&&(li.intersectSphere(or,pc)===null||li.origin.distanceToSquared(pc)>(e.far-e.near)**2))&&(fc.copy(s).invert(),li.copy(e.ray).applyMatrix4(fc),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,li)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,l=s.index,h=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,a=s.attributes.normal,c=s.groups,d=s.drawRange;if(l!==null)if(Array.isArray(o))for(let p=0,_=c.length;p<_;p++){const g=c[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let S=v,A=M;S<A;S+=3){const w=l.getX(S),P=l.getX(S+1),x=l.getX(S+2);i=dr(this,m,e,n,u,f,a,w,P,x),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=l.getX(g),M=l.getX(g+1),S=l.getX(g+2);i=dr(this,o,e,n,u,f,a,v,M,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(h!==void 0)if(Array.isArray(o))for(let p=0,_=c.length;p<_;p++){const g=c[p],m=o[g.materialIndex],v=Math.max(g.start,d.start),M=Math.min(h.count,Math.min(g.start+g.count,d.start+d.count));for(let S=v,A=M;S<A;S+=3){const w=S,P=S+1,x=S+2;i=dr(this,m,e,n,u,f,a,w,P,x),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(h.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const v=g,M=g+1,S=g+2;i=dr(this,o,e,n,u,f,a,v,M,S),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Zd(r,e,t,n,i,s,o,l){let h;if(e.side===Xt?h=n.intersectTriangle(o,s,i,!0,l):h=n.intersectTriangle(i,s,o,e.side===Wn,l),h===null)return null;ur.copy(l),ur.applyMatrix4(r.matrixWorld);const u=t.ray.origin.distanceTo(ur);return u<t.near||u>t.far?null:{distance:u,point:ur.clone(),object:r}}function dr(r,e,t,n,i,s,o,l,h,u){r.getVertexPosition(l,ar),r.getVertexPosition(h,lr),r.getVertexPosition(u,cr);const f=Zd(r,e,t,n,ar,lr,cr,mc);if(f){const a=new R;pn.getBarycoord(mc,ar,lr,cr,a),i&&(f.uv=pn.getInterpolatedAttribute(i,l,h,u,a,new oe)),s&&(f.uv1=pn.getInterpolatedAttribute(s,l,h,u,a,new oe)),o&&(f.normal=pn.getInterpolatedAttribute(o,l,h,u,a,new R),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const c={a:l,b:h,c:u,normal:new R,materialIndex:0};pn.getNormal(ar,lr,cr,c.normal),f.face=c,f.barycoord=a}return f}const gc=new R,_c=new ht,vc=new ht,jd=new R,xc=new Be,fr=new R,Eo=new In,yc=new Be,Ao=new Yr;class Jd extends Te{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yl,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingBox.expandByPoint(fr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingSphere.expandByPoint(fr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Eo.copy(this.boundingSphere),Eo.applyMatrix4(i),e.ray.intersectsSphere(Eo)!==!1&&(yc.copy(i).invert(),Ao.copy(e.ray).applyMatrix4(yc),!(this.boundingBox!==null&&Ao.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ao)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Qu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;_c.fromBufferAttribute(i.attributes.skinIndex,e),vc.fromBufferAttribute(i.attributes.skinWeight,e),gc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=vc.getComponent(s);if(o!==0){const l=_c.getComponent(s);xc.multiplyMatrices(n.bones[l].matrixWorld,n.boneInverses[l]),t.addScaledVector(jd.copy(gc).applyMatrix4(xc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Wh extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yl extends Et{constructor(e=null,t=1,n=1,i,s,o,l,h,u=wt,f=wt,a,c){super(null,o,l,h,u,f,i,s,a,c),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Mc=new Be,Qd=new Be;class Ml{constructor(e=[],t=[]){this.uuid=an(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const l=e[s]?e[s].matrixWorld:Qd;Mc.multiplyMatrices(l,t[s]),Mc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Ml(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new yl(t,e,e,on,rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Ae("Skeleton: No bone found with UUID:",s),o=new Wh),this.bones.push(o),this.boneInverses.push(new Be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const l=n[i];e.boneInverses.push(l.toArray())}return e}}class Va extends At{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Di=new Be,Sc=new Be,pr=[],bc=new Pn,ef=new Be,hs=new Te,us=new In;class tf extends Te{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Va(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ef)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Di),bc.copy(e.boundingBox).applyMatrix4(Di),this.boundingBox.union(bc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Di),us.copy(e.boundingSphere).applyMatrix4(Di),this.boundingSphere.union(us)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let l=0;l<n.length;l++)n[l]=i[o+l]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(n),e.ray.intersectsSphere(us)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Di),Sc.multiplyMatrices(n,Di),hs.matrixWorld=Sc,hs.raycast(e,pr);for(let o=0,l=pr.length;o<l;o++){const h=pr[o];h.instanceId=s,h.object=this,t.push(h)}pr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Va(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yl(new Float32Array(i*this.count),i,this.count,hl,rn));const s=this.morphTexture.source.data.data;let o=0;for(let u=0;u<n.length;u++)o+=n[u];const l=this.geometry.morphTargetsRelative?1:1-o,h=i*e;s[h]=l,s.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ro=new R,nf=new R,sf=new Oe;class pi{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ro.subVectors(n,t).cross(nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ro),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sf.getNormalMatrix(e),i=this.coplanarPoint(Ro).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new In,rf=new oe(.5,.5),mr=new R;class Sl{constructor(e=new pi,t=new pi,n=new pi,i=new pi,s=new pi,o=new pi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(i),l[4].copy(s),l[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){const i=this.planes,s=e.elements,o=s[0],l=s[1],h=s[2],u=s[3],f=s[4],a=s[5],c=s[6],d=s[7],p=s[8],_=s[9],g=s[10],m=s[11],v=s[12],M=s[13],S=s[14],A=s[15];if(i[0].setComponents(u-o,d-f,m-p,A-v).normalize(),i[1].setComponents(u+o,d+f,m+p,A+v).normalize(),i[2].setComponents(u+l,d+a,m+_,A+M).normalize(),i[3].setComponents(u-l,d-a,m-_,A-M).normalize(),n)i[4].setComponents(h,c,g,S).normalize(),i[5].setComponents(u-h,d-c,m-g,A-S).normalize();else if(i[4].setComponents(u-h,d-c,m-g,A-S).normalize(),t===wn)i[5].setComponents(u+h,d+c,m+g,A+S).normalize();else if(t===Us)i[5].setComponents(h,c,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){ci.center.set(0,0,0);const t=rf.distanceTo(e.center);return ci.radius=.7071067811865476+t,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mr.x=i.normal.x>0?e.max.x:e.min.x,mr.y=i.normal.y>0?e.max.y:e.min.y,mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xh extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hr=new R,Wr=new R,Tc=new Be,ds=new Yr,gr=new In,Co=new R,wc=new R;class bl extends dt{constructor(e=new gt,t=new Xh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Hr.fromBufferAttribute(t,i-1),Wr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Hr.distanceTo(Wr);e.setAttribute("lineDistance",new Ze(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;Tc.copy(i).invert(),ds.copy(e.ray).applyMatrix4(Tc);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,u=this.isLineSegments?2:1,f=n.index,c=n.attributes.position;if(f!==null){const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=u){const m=f.getX(_),v=f.getX(_+1),M=_r(this,e,ds,h,m,v,_);M&&t.push(M)}if(this.isLineLoop){const _=f.getX(p-1),g=f.getX(d),m=_r(this,e,ds,h,_,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=u){const m=_r(this,e,ds,h,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=_r(this,e,ds,h,p-1,d,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function _r(r,e,t,n,i,s,o){const l=r.geometry.attributes.position;if(Hr.fromBufferAttribute(l,i),Wr.fromBufferAttribute(l,s),t.distanceSqToSegment(Hr,Wr,Co,wc)>n)return;Co.applyMatrix4(r.matrixWorld);const u=e.ray.origin.distanceTo(Co);if(!(u<e.near||u>e.far))return{distance:u,point:wc.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Ec=new R,Ac=new R;class of extends bl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Ec.fromBufferAttribute(t,i),Ac.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ec.distanceTo(Ac);e.setAttribute("lineDistance",new Ze(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class af extends bl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class qh extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Rc=new Be,Ga=new Yr,vr=new In,xr=new R;class Ha extends dt{constructor(e=new gt,t=new qh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(i),vr.radius+=s,e.ray.intersectsSphere(vr)===!1)return;Rc.copy(i).invert(),Ga.copy(e.ray).applyMatrix4(Rc);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=l*l,u=n.index,a=n.attributes.position;if(u!==null){const c=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=c,_=d;p<_;p++){const g=u.getX(p);xr.fromBufferAttribute(a,g),Cc(xr,g,h,i,e,t,this)}}else{const c=Math.max(0,o.start),d=Math.min(a.count,o.start+o.count);for(let p=c,_=d;p<_;p++)xr.fromBufferAttribute(a,p),Cc(xr,p,h,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function Cc(r,e,t,n,i,s,o){const l=Ga.distanceSqToPoint(r);if(l<t){const h=new R;Ga.closestPointToPoint(r,h),h.applyMatrix4(n);const u=i.ray.origin.distanceTo(h);if(u<i.near||u>i.far)return;s.push({distance:u,distanceToRay:Math.sqrt(l),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Yh extends Et{constructor(e=[],t=vi,n,i,s,o,l,h,u,f){super(e,t,n,i,s,o,l,h,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Kr extends Et{constructor(e,t,n,i,s,o,l,h,u){super(e,t,n,i,s,o,l,h,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Bs extends Et{constructor(e,t,n=Cn,i,s,o,l=wt,h=wt,u,f=Xn,a=1){if(f!==Xn&&f!==_i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const c={width:e,height:t,depth:a};super(c,i,s,o,l,h,f,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _l(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class lf extends Bs{constructor(e,t=Cn,n=vi,i,s,o=wt,l=wt,h,u=Xn){const f={width:e,height:e,depth:1},a=[f,f,f,f,f,f];super(e,e,t,n,i,s,o,l,h,u),this.image=a,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kh extends Et{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xt extends gt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const l=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const h=[],u=[],f=[],a=[];let c=0,d=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(h),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(f,3)),this.setAttribute("uv",new Ze(a,2));function p(_,g,m,v,M,S,A,w,P,x,b){const O=S/P,C=A/x,F=S/2,U=A/2,B=w/2,k=P+1,z=x+1;let G=0,Q=0;const Z=new R;for(let he=0;he<z;he++){const ge=he*C-U;for(let de=0;de<k;de++){const ke=de*O-F;Z[_]=ke*v,Z[g]=ge*M,Z[m]=B,u.push(Z.x,Z.y,Z.z),Z[_]=0,Z[g]=0,Z[m]=w>0?1:-1,f.push(Z.x,Z.y,Z.z),a.push(de/P),a.push(1-he/x),G+=1}}for(let he=0;he<x;he++)for(let ge=0;ge<P;ge++){const de=c+ge+k*he,ke=c+ge+k*(he+1),ut=c+(ge+1)+k*(he+1),ct=c+(ge+1)+k*he;h.push(de,ke,ct),h.push(ke,ut,ct),Q+=6}l.addGroup(d,Q,b),d+=Q,c+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ws extends gt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],l=[],h=[],u=new R,f=new oe;o.push(0,0,0),l.push(0,0,1),h.push(.5,.5);for(let a=0,c=3;a<=t;a++,c+=3){const d=n+a/t*i;u.x=e*Math.cos(d),u.y=e*Math.sin(d),o.push(u.x,u.y,u.z),l.push(0,0,1),f.x=(o[c]/e+1)/2,f.y=(o[c+1]/e+1)/2,h.push(f.x,f.y)}for(let a=1;a<=t;a++)s.push(a,a+1,0);this.setIndex(s),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class mn extends gt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,l=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:h};const u=this;i=Math.floor(i),s=Math.floor(s);const f=[],a=[],c=[],d=[];let p=0;const _=[],g=n/2;let m=0;v(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(d,2));function v(){const S=new R,A=new R;let w=0;const P=(t-e)/n;for(let x=0;x<=s;x++){const b=[],O=x/s,C=O*(t-e)+e;for(let F=0;F<=i;F++){const U=F/i,B=U*h+l,k=Math.sin(B),z=Math.cos(B);A.x=C*k,A.y=-O*n+g,A.z=C*z,a.push(A.x,A.y,A.z),S.set(k,P,z).normalize(),c.push(S.x,S.y,S.z),d.push(U,1-O),b.push(p++)}_.push(b)}for(let x=0;x<i;x++)for(let b=0;b<s;b++){const O=_[b][x],C=_[b+1][x],F=_[b+1][x+1],U=_[b][x+1];(e>0||b!==0)&&(f.push(O,C,U),w+=3),(t>0||b!==s-1)&&(f.push(C,F,U),w+=3)}u.addGroup(m,w,0),m+=w}function M(S){const A=p,w=new oe,P=new R;let x=0;const b=S===!0?e:t,O=S===!0?1:-1;for(let F=1;F<=i;F++)a.push(0,g*O,0),c.push(0,O,0),d.push(.5,.5),p++;const C=p;for(let F=0;F<=i;F++){const B=F/i*h+l,k=Math.cos(B),z=Math.sin(B);P.x=b*z,P.y=g*O,P.z=b*k,a.push(P.x,P.y,P.z),c.push(0,O,0),w.x=k*.5+.5,w.y=z*.5*O+.5,d.push(w.x,w.y),p++}for(let F=0;F<i;F++){const U=A+F,B=C+F;S===!0?f.push(B,B+1,U):f.push(B+1,B,U),x+=3}u.addGroup(m,x,S===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xs extends mn{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,l=Math.PI*2){super(0,e,t,n,i,s,o,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:l}}static fromJSON(e){return new Xs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $r extends gt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];l(i),u(n),f(),this.setAttribute("position",new Ze(s,3)),this.setAttribute("normal",new Ze(s.slice(),3)),this.setAttribute("uv",new Ze(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function l(v){const M=new R,S=new R,A=new R;for(let w=0;w<t.length;w+=3)d(t[w+0],M),d(t[w+1],S),d(t[w+2],A),h(M,S,A,v)}function h(v,M,S,A){const w=A+1,P=[];for(let x=0;x<=w;x++){P[x]=[];const b=v.clone().lerp(S,x/w),O=M.clone().lerp(S,x/w),C=w-x;for(let F=0;F<=C;F++)F===0&&x===w?P[x][F]=b:P[x][F]=b.clone().lerp(O,F/C)}for(let x=0;x<w;x++)for(let b=0;b<2*(w-x)-1;b++){const O=Math.floor(b/2);b%2===0?(c(P[x][O+1]),c(P[x+1][O]),c(P[x][O])):(c(P[x][O+1]),c(P[x+1][O+1]),c(P[x+1][O]))}}function u(v){const M=new R;for(let S=0;S<s.length;S+=3)M.x=s[S+0],M.y=s[S+1],M.z=s[S+2],M.normalize().multiplyScalar(v),s[S+0]=M.x,s[S+1]=M.y,s[S+2]=M.z}function f(){const v=new R;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const S=g(v)/2/Math.PI+.5,A=m(v)/Math.PI+.5;o.push(S,1-A)}p(),a()}function a(){for(let v=0;v<o.length;v+=6){const M=o[v+0],S=o[v+2],A=o[v+4],w=Math.max(M,S,A),P=Math.min(M,S,A);w>.9&&P<.1&&(M<.2&&(o[v+0]+=1),S<.2&&(o[v+2]+=1),A<.2&&(o[v+4]+=1))}}function c(v){s.push(v.x,v.y,v.z)}function d(v,M){const S=v*3;M.x=e[S+0],M.y=e[S+1],M.z=e[S+2]}function p(){const v=new R,M=new R,S=new R,A=new R,w=new oe,P=new oe,x=new oe;for(let b=0,O=0;b<s.length;b+=9,O+=6){v.set(s[b+0],s[b+1],s[b+2]),M.set(s[b+3],s[b+4],s[b+5]),S.set(s[b+6],s[b+7],s[b+8]),w.set(o[O+0],o[O+1]),P.set(o[O+2],o[O+3]),x.set(o[O+4],o[O+5]),A.copy(v).add(M).add(S).divideScalar(3);const C=g(A);_(w,O+0,v,C),_(P,O+2,M,C),_(x,O+4,S,C)}}function _(v,M,S,A){A<0&&v.x===1&&(o[M]=v.x-1),S.x===0&&S.z===0&&(o[M]=A/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $r(e.vertices,e.indices,e.radius,e.detail)}}class Ln{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let l=0,h=s-1,u;for(;l<=h;)if(i=Math.floor(l+(h-l)/2),u=n[i]-o,u<0)l=i+1;else if(u>0)h=i-1;else{h=i;break}if(i=h,n[i]===o)return i/(s-1);const f=n[i],c=n[i+1]-f,d=(o-f)/c;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),l=this.getPoint(s),h=t||(o.isVector2?new oe:new R);return h.copy(l).sub(o).normalize(),h}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],o=[],l=new R,h=new Be;for(let d=0;d<=e;d++){const p=d/e;i[d]=this.getTangentAt(p,new R)}s[0]=new R,o[0]=new R;let u=Number.MAX_VALUE;const f=Math.abs(i[0].x),a=Math.abs(i[0].y),c=Math.abs(i[0].z);f<=u&&(u=f,n.set(1,0,0)),a<=u&&(u=a,n.set(0,1,0)),c<=u&&n.set(0,0,1),l.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],l),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),l.crossVectors(i[d-1],i[d]),l.length()>Number.EPSILON){l.normalize();const p=Math.acos(We(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(h.makeRotationAxis(l,p))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(We(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(l.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(h.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Tl extends Ln{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,l=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=l,this.aRotation=h}getPoint(e,t=new oe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const l=this.aStartAngle+e*s;let h=this.aX+this.xRadius*Math.cos(l),u=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const f=Math.cos(this.aRotation),a=Math.sin(this.aRotation),c=h-this.aX,d=u-this.aY;h=c*f-d*a+this.aX,u=c*a+d*f+this.aY}return n.set(h,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class cf extends Tl{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function wl(){let r=0,e=0,t=0,n=0;function i(s,o,l,h){r=s,e=l,t=-3*s+3*o-2*l-h,n=2*s-2*o+l+h}return{initCatmullRom:function(s,o,l,h,u){i(o,l,u*(l-s),u*(h-o))},initNonuniformCatmullRom:function(s,o,l,h,u,f,a){let c=(o-s)/u-(l-s)/(u+f)+(l-o)/f,d=(l-o)/f-(h-o)/(f+a)+(h-l)/a;c*=f,d*=f,i(o,l,c,d)},calc:function(s){const o=s*s,l=o*s;return r+e*s+t*o+n*l}}}const yr=new R,Po=new wl,Io=new wl,Lo=new wl;class hf extends Ln{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let l=Math.floor(o),h=o-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/s)+1)*s:h===0&&l===s-1&&(l=s-2,h=1);let u,f;this.closed||l>0?u=i[(l-1)%s]:(yr.subVectors(i[0],i[1]).add(i[0]),u=yr);const a=i[l%s],c=i[(l+1)%s];if(this.closed||l+2<s?f=i[(l+2)%s]:(yr.subVectors(i[s-1],i[s-2]).add(i[s-1]),f=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(u.distanceToSquared(a),d),_=Math.pow(a.distanceToSquared(c),d),g=Math.pow(c.distanceToSquared(f),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Po.initNonuniformCatmullRom(u.x,a.x,c.x,f.x,p,_,g),Io.initNonuniformCatmullRom(u.y,a.y,c.y,f.y,p,_,g),Lo.initNonuniformCatmullRom(u.z,a.z,c.z,f.z,p,_,g)}else this.curveType==="catmullrom"&&(Po.initCatmullRom(u.x,a.x,c.x,f.x,this.tension),Io.initCatmullRom(u.y,a.y,c.y,f.y,this.tension),Lo.initCatmullRom(u.z,a.z,c.z,f.z,this.tension));return n.set(Po.calc(h),Io.calc(h),Lo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Pc(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,l=r*r,h=r*l;return(2*t-2*n+s+o)*h+(-3*t+3*n-2*s-o)*l+s*r+t}function uf(r,e){const t=1-r;return t*t*e}function df(r,e){return 2*(1-r)*r*e}function ff(r,e){return r*r*e}function As(r,e,t,n){return uf(r,e)+df(r,t)+ff(r,n)}function pf(r,e){const t=1-r;return t*t*t*e}function mf(r,e){const t=1-r;return 3*t*t*r*e}function gf(r,e){return 3*(1-r)*r*r*e}function _f(r,e){return r*r*r*e}function Rs(r,e,t,n,i){return pf(r,e)+mf(r,t)+gf(r,n)+_f(r,i)}class $h extends Ln{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){const n=t,i=this.v0,s=this.v1,o=this.v2,l=this.v3;return n.set(Rs(e,i.x,s.x,o.x,l.x),Rs(e,i.y,s.y,o.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class vf extends Ln{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2,l=this.v3;return n.set(Rs(e,i.x,s.x,o.x,l.x),Rs(e,i.y,s.y,o.y,l.y),Rs(e,i.z,s.z,o.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Zh extends Ln{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xf extends Ln{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jh extends Ln{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(As(e,i.x,s.x,o.x),As(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yf extends Ln{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(As(e,i.x,s.x,o.x),As(e,i.y,s.y,o.y),As(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jh extends Ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),l=s-o,h=i[o===0?o:o-1],u=i[o],f=i[o>i.length-2?i.length-1:o+1],a=i[o>i.length-3?i.length-1:o+2];return n.set(Pc(l,h.x,u.x,f.x,a.x),Pc(l,h.y,u.y,f.y,a.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new oe().fromArray(i))}return this}}var Ic=Object.freeze({__proto__:null,ArcCurve:cf,CatmullRomCurve3:hf,CubicBezierCurve:$h,CubicBezierCurve3:vf,EllipseCurve:Tl,LineCurve:Zh,LineCurve3:xf,QuadraticBezierCurve:jh,QuadraticBezierCurve3:yf,SplineCurve:Jh});class Mf extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ic[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,l=this.curves[s],h=l.getLength(),u=h===0?0:1-o/h;return l.getPointAt(u,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],l=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,h=o.getPoints(l);for(let u=0;u<h.length;u++){const f=h[u];n&&n.equals(f)||(t.push(f),n=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ic[i.type]().fromJSON(i))}return this}}class Wa extends Mf{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Zh(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new jh(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const l=new $h(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(s,o));return this.curves.push(l),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Jh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(e+l,t+h,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,l,h){const u=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+u,t+f,n,i,s,o,l,h),this}absellipse(e,t,n,i,s,o,l,h){const u=new Tl(e,t,n,i,s,o,l,h);if(this.curves.length>0){const a=u.getPoint(0);a.equals(this.currentPoint)||this.lineTo(a.x,a.y)}this.curves.push(u);const f=u.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Qh extends Wa{constructor(e){super(e),this.uuid=an(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Wa().fromJSON(i))}return this}}function Sf(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=eu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let l,h,u;if(n&&(s=Af(r,e,s,t)),r.length>80*t){l=r[0],h=r[1];let f=l,a=h;for(let c=t;c<i;c+=t){const d=r[c],p=r[c+1];d<l&&(l=d),p<h&&(h=p),d>f&&(f=d),p>a&&(a=p)}u=Math.max(f-l,a-h),u=u!==0?32767/u:0}return ks(s,o,t,l,h,u,0),o}function eu(r,e,t,n,i){let s;if(i===Bf(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=Lc(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Lc(o/n|0,r[o],r[o+1],s);return s&&qi(s,s.next)&&(Vs(s),s=s.next),s}function xi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(qi(t,t.next)||pt(t.prev,t,t.next)===0)){if(Vs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ks(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Lf(r,n,i,s);let l=r;for(;r.prev!==r.next;){const h=r.prev,u=r.next;if(s?Tf(r,n,i,s):bf(r)){e.push(h.i,r.i,u.i),Vs(r),r=u.next,l=u.next;continue}if(r=u,r===l){o?o===1?(r=wf(xi(r),e),ks(r,e,t,n,i,s,2)):o===2&&Ef(r,e,t,n,i,s):ks(xi(r),e,t,n,i,s,1);break}}}function bf(r){const e=r.prev,t=r,n=r.next;if(pt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,l=e.y,h=t.y,u=n.y,f=Math.min(i,s,o),a=Math.min(l,h,u),c=Math.max(i,s,o),d=Math.max(l,h,u);let p=n.next;for(;p!==e;){if(p.x>=f&&p.x<=c&&p.y>=a&&p.y<=d&&bs(i,l,s,h,o,u,p.x,p.y)&&pt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Tf(r,e,t,n){const i=r.prev,s=r,o=r.next;if(pt(i,s,o)>=0)return!1;const l=i.x,h=s.x,u=o.x,f=i.y,a=s.y,c=o.y,d=Math.min(l,h,u),p=Math.min(f,a,c),_=Math.max(l,h,u),g=Math.max(f,a,c),m=Xa(d,p,e,t,n),v=Xa(_,g,e,t,n);let M=r.prevZ,S=r.nextZ;for(;M&&M.z>=m&&S&&S.z<=v;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&bs(l,f,h,a,u,c,M.x,M.y)&&pt(M.prev,M,M.next)>=0||(M=M.prevZ,S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==i&&S!==o&&bs(l,f,h,a,u,c,S.x,S.y)&&pt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&bs(l,f,h,a,u,c,M.x,M.y)&&pt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;S&&S.z<=v;){if(S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==i&&S!==o&&bs(l,f,h,a,u,c,S.x,S.y)&&pt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function wf(r,e){let t=r;do{const n=t.prev,i=t.next.next;!qi(n,i)&&nu(n,t,t.next,i)&&zs(n,i)&&zs(i,n)&&(e.push(n.i,t.i,i.i),Vs(t),Vs(t.next),t=r=i),t=t.next}while(t!==r);return xi(t)}function Ef(r,e,t,n,i,s){let o=r;do{let l=o.next.next;for(;l!==o.prev;){if(o.i!==l.i&&Ff(o,l)){let h=iu(o,l);o=xi(o,o.next),h=xi(h,h.next),ks(o,e,t,n,i,s,0),ks(h,e,t,n,i,s,0);return}l=l.next}o=o.next}while(o!==r)}function Af(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const l=e[s]*n,h=s<o-1?e[s+1]*n:r.length,u=eu(r,l,h,n,!1);u===u.next&&(u.steiner=!0),i.push(Nf(u))}i.sort(Rf);for(let s=0;s<i.length;s++)t=Cf(i[s],t);return t}function Rf(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Cf(r,e){const t=Pf(r,e);if(!t)return e;const n=iu(t,r);return xi(n,n.next),xi(t,t.next)}function Pf(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(qi(r,t))return t;do{if(qi(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;const l=o,h=o.x,u=o.y;let f=1/0;t=o;do{if(n>=t.x&&t.x>=h&&n!==t.x&&tu(i<u?n:s,i,h,u,i<u?s:n,i,t.x,t.y)){const a=Math.abs(i-t.y)/(n-t.x);zs(t,r)&&(a<f||a===f&&(t.x>o.x||t.x===o.x&&If(o,t)))&&(o=t,f=a)}t=t.next}while(t!==l);return o}function If(r,e){return pt(r.prev,r,e.prev)<0&&pt(e.next,r,r.next)<0}function Lf(r,e,t,n){let i=r;do i.z===0&&(i.z=Xa(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Df(i)}function Df(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,l=0;for(let u=0;u<t&&(l++,o=o.nextZ,!!o);u++);let h=t;for(;l>0||h>0&&o;)l!==0&&(h===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,l--):(i=o,o=o.nextZ,h--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function Xa(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Nf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function tu(r,e,t,n,i,s,o,l){return(i-o)*(e-l)>=(r-o)*(s-l)&&(r-o)*(n-l)>=(t-o)*(e-l)&&(t-o)*(s-l)>=(i-o)*(n-l)}function bs(r,e,t,n,i,s,o,l){return!(r===o&&e===l)&&tu(r,e,t,n,i,s,o,l)}function Ff(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Uf(r,e)&&(zs(r,e)&&zs(e,r)&&Of(r,e)&&(pt(r.prev,r,e.prev)||pt(r,e.prev,e))||qi(r,e)&&pt(r.prev,r,r.next)>0&&pt(e.prev,e,e.next)>0)}function pt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function qi(r,e){return r.x===e.x&&r.y===e.y}function nu(r,e,t,n){const i=Sr(pt(r,e,t)),s=Sr(pt(r,e,n)),o=Sr(pt(t,n,r)),l=Sr(pt(t,n,e));return!!(i!==s&&o!==l||i===0&&Mr(r,t,e)||s===0&&Mr(r,n,e)||o===0&&Mr(t,r,n)||l===0&&Mr(t,e,n))}function Mr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Sr(r){return r>0?1:r<0?-1:0}function Uf(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&nu(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function zs(r,e){return pt(r.prev,r,r.next)<0?pt(r,e,r.next)>=0&&pt(r,r.prev,e)>=0:pt(r,e,r.prev)<0||pt(r,r.next,e)<0}function Of(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function iu(r,e){const t=qa(r.i,r.x,r.y),n=qa(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Lc(r,e,t,n){const i=qa(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Vs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function qa(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Bf(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class kf{static triangulate(e,t,n=2){return Sf(e,t,n)}}class Cs{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Cs.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Dc(e),Nc(n,e);let o=e.length;t.forEach(Dc);for(let h=0;h<t.length;h++)i.push(o),o+=t[h].length,Nc(n,t[h]);const l=kf.triangulate(n,i);for(let h=0;h<l.length;h+=3)s.push(l.slice(h,h+3));return s}}function Dc(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Nc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class qs extends $r{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new qs(e.radius,e.detail)}}class El extends $r{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new El(e.radius,e.detail)}}class Qi extends gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,l=Math.floor(n),h=Math.floor(i),u=l+1,f=h+1,a=e/l,c=t/h,d=[],p=[],_=[],g=[];for(let m=0;m<f;m++){const v=m*c-o;for(let M=0;M<u;M++){const S=M*a-s;p.push(S,-v,0),_.push(0,0,1),g.push(M/l),g.push(1-m/h)}}for(let m=0;m<h;m++)for(let v=0;v<l;v++){const M=v+u*m,S=v+u*(m+1),A=v+1+u*(m+1),w=v+1+u*m;d.push(M,S,w),d.push(S,A,w)}this.setIndex(d),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Al extends gt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const l=[],h=[],u=[],f=[];let a=e;const c=(t-e)/i,d=new R,p=new oe;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*o;d.x=a*Math.cos(m),d.y=a*Math.sin(m),h.push(d.x,d.y,d.z),u.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,f.push(p.x,p.y)}a+=c}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const v=m+g,M=v,S=v+n+1,A=v+n+2,w=v+1;l.push(M,S,w),l.push(S,A,w)}}this.setIndex(l),this.setAttribute("position",new Ze(h,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Al(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Rl extends gt{constructor(e=new Qh([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let l=0,h=0;if(Array.isArray(e)===!1)u(e);else for(let f=0;f<e.length;f++)u(e[f]),this.addGroup(l,h,f),l+=h,h=0;this.setIndex(n),this.setAttribute("position",new Ze(i,3)),this.setAttribute("normal",new Ze(s,3)),this.setAttribute("uv",new Ze(o,2));function u(f){const a=i.length/3,c=f.extractPoints(t);let d=c.shape;const p=c.holes;Cs.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const v=p[g];Cs.isClockWise(v)===!0&&(p[g]=v.reverse())}const _=Cs.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const v=p[g];d=d.concat(v)}for(let g=0,m=d.length;g<m;g++){const v=d[g];i.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){const v=_[g],M=v[0]+a,S=v[1]+a,A=v[2]+a;n.push(M,S,A),h+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return zf(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new Rl(n,e.curveSegments)}}function zf(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class Ys extends gt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(o+l,Math.PI);let u=0;const f=[],a=new R,c=new R,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],M=m/n;let S=0;m===0&&o===0?S=.5/t:m===n&&h===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const w=A/t;a.x=-e*Math.cos(i+w*s)*Math.sin(o+M*l),a.y=e*Math.cos(o+M*l),a.z=e*Math.sin(i+w*s)*Math.sin(o+M*l),p.push(a.x,a.y,a.z),c.copy(a).normalize(),_.push(c.x,c.y,c.z),g.push(w+S,1-M),v.push(u++)}f.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const M=f[m][v+1],S=f[m][v],A=f[m+1][v],w=f[m+1][v+1];(m!==0||o>0)&&d.push(M,S,w),(m!==n-1||h<Math.PI)&&d.push(S,A,w)}this.setIndex(d),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Yi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ht(r){const e={};for(let t=0;t<r.length;t++){const n=Yi(r[t]);for(const i in n)e[i]=n[i]}return e}function Vf(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function su(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Gs={clone:Yi,merge:Ht};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ot extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=Vf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ru extends Ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ft extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oh,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Dn extends ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wf extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xf extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function br(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function qf(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Fc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const l=t[s]*e;for(let h=0;h!==e;++h)i[o++]=r[l+h]}return i}function ou(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class es{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let l=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const l=t[1];e<l&&(n=2,s=l);for(let h=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const l=n+o>>>1;e<t[l]?o=l:n=l+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Yf extends es{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$l,endingEnd:$l}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,l=i[s],h=i[o];if(l===void 0)switch(this.getSettings_().endingStart){case Zl:s=e,l=2*t-n;break;case jl:s=i.length-2,l=t+i[s]-i[s+1];break;default:s=e,l=n}if(h===void 0)switch(this.getSettings_().endingEnd){case Zl:o=e,h=2*n-t;break;case jl:o=1,h=n+i[1]-i[0];break;default:o=e-1,h=t}const u=(n-t)*.5,f=this.valueSize;this._weightPrev=u/(t-l),this._weightNext=u/(h-n),this._offsetPrev=s*f,this._offsetNext=o*f}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=this._offsetPrev,a=this._offsetNext,c=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-c*g+2*c*_-c*p,v=(1+c)*g+(-1.5-2*c)*_+(-.5+c)*p+1,M=(-1-d)*g+(1.5+d)*_+.5*p,S=d*g-d*_;for(let A=0;A!==l;++A)s[A]=m*o[f+A]+v*o[u+A]+M*o[h+A]+S*o[a+A];return s}}class Kf extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=(n-t)/(i-t),a=1-f;for(let c=0;c!==l;++c)s[c]=o[u+c]*a+o[h+c]*f;return s}}class $f extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zf extends es{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=e*l,u=h-l,f=this.settings||this.DefaultSettings_,a=f.inTangents,c=f.outTangents;if(!a||!c){const _=(n-t)/(i-t),g=1-_;for(let m=0;m!==l;++m)s[m]=o[u+m]*g+o[h+m]*_;return s}const d=l*2,p=e-1;for(let _=0;_!==l;++_){const g=o[u+_],m=o[h+_],v=p*d+_*2,M=c[v],S=c[v+1],A=e*d+_*2,w=a[A],P=a[A+1];let x=(n-t)/(i-t),b,O,C,F,U;for(let B=0;B<8;B++){b=x*x,O=b*x,C=1-x,F=C*C,U=F*C;const z=U*t+3*F*x*M+3*C*b*w+O*i-n;if(Math.abs(z)<1e-10)break;const G=3*F*(M-t)+6*C*x*(w-M)+3*b*(i-w);if(Math.abs(G)<1e-10)break;x=x-z/G,x=Math.max(0,Math.min(1,x))}s[_]=U*g+3*F*x*S+3*C*b*P+O*m}return s}}class gn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=br(t,this.TimeBufferType),this.values=br(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:br(e.times,Array),values:br(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $f(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Zf(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case Fs:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break;case Kl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return Fs;case this.InterpolantFactoryMethodSmooth:return io;case this.InterpolantFactoryMethodBezier:return Kl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const l=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*l,o*l)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Le("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Le("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==s;l++){const h=n[l];if(typeof h=="number"&&isNaN(h)){Le("KeyframeTrack: Time is not a valid number.",this,l,h),e=!1;break}if(o!==null&&o>h){Le("KeyframeTrack: Out of order keys.",this,l,h,o),e=!1;break}o=h}if(i!==void 0&&ud(i))for(let l=0,h=i.length;l!==h;++l){const u=i[l];if(isNaN(u)){Le("KeyframeTrack: Value is not a valid number.",this,l,u),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===io,s=e.length-1;let o=1;for(let l=1;l<s;++l){let h=!1;const u=e[l],f=e[l+1];if(u!==f&&(l!==1||u!==e[0]))if(i)h=!0;else{const a=l*n,c=a-n,d=a+n;for(let p=0;p!==n;++p){const _=t[a+p];if(_!==t[c+p]||_!==t[d+p]){h=!0;break}}}if(h){if(l!==o){e[o]=e[l];const a=l*n,c=o*n;for(let d=0;d!==n;++d)t[c+d]=t[a+d]}++o}}if(s>0){e[o]=e[s];for(let l=s*n,h=o*n,u=0;u!==n;++u)t[h+u]=t[l+u];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Fs;class ts extends gn{constructor(e,t,n){super(e,t,n)}}ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Ns;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;class au extends gn{constructor(e,t,n,i){super(e,t,n,i)}}au.prototype.ValueTypeName="color";class Ki extends gn{constructor(e,t,n,i){super(e,t,n,i)}}Ki.prototype.ValueTypeName="number";class jf extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=(n-t)/(i-t);let u=e*l;for(let f=u+l;u!==f;u+=4)Ut.slerpFlat(s,0,o,u-l,o,u,h);return s}}class $i extends gn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new jf(this.times,this.values,this.getValueSize(),e)}}$i.prototype.ValueTypeName="quaternion";$i.prototype.InterpolantFactoryMethodSmooth=void 0;class ns extends gn{constructor(e,t,n){super(e,t,n)}}ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Ns;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;class Zi extends gn{constructor(e,t,n,i){super(e,t,n,i)}}Zi.prototype.ValueTypeName="vector";class Jf{constructor(e="",t=-1,n=[],i=ed){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=an(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,l=n.length;o!==l;++o)t.push(ep(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(gn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let l=0;l<s;l++){let h=[],u=[];h.push((l+s-1)%s,l,(l+1)%s),u.push(0,1,0);const f=qf(h);h=Fc(h,1,f),u=Fc(u,1,f),!i&&h[0]===0&&(h.push(s),u.push(u[0])),o.push(new Ki(".morphTargetInfluences["+t[l].name+"]",h,u).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let l=0,h=e.length;l<h;l++){const u=e[l],f=u.name.match(s);if(f&&f.length>1){const a=f[1];let c=i[a];c||(i[a]=c=[]),c.push(u)}}const o=[];for(const l in i)o.push(this.CreateFromMorphTargetSequence(l,i[l],t,n));return o}static parseAnimation(e,t){if(Ae("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Le("AnimationClip: No animation in JSONLoader data."),null;const n=function(a,c,d,p,_){if(d.length!==0){const g=[],m=[];ou(d,g,m,p),g.length!==0&&_.push(new a(c,g,m))}},i=[],s=e.name||"default",o=e.fps||30,l=e.blendMode;let h=e.length||-1;const u=e.hierarchy||[];for(let a=0;a<u.length;a++){const c=u[a].keys;if(!(!c||c.length===0))if(c[0].morphTargets){const d={};let p;for(p=0;p<c.length;p++)if(c[p].morphTargets)for(let _=0;_<c[p].morphTargets.length;_++)d[c[p].morphTargets[_]]=-1;for(const _ in d){const g=[],m=[];for(let v=0;v!==c[p].morphTargets.length;++v){const M=c[p];g.push(M.time),m.push(M.morphTarget===_?1:0)}i.push(new Ki(".morphTargetInfluence["+_+"]",g,m))}h=d.length*o}else{const d=".bones["+t[a].name+"]";n(Zi,d+".position",c,"pos",i),n($i,d+".quaternion",c,"rot",i),n(Zi,d+".scale",c,"scl",i)}}return i.length===0?null:new this(s,h,i,l)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Qf(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ki;case"vector":case"vector2":case"vector3":case"vector4":return Zi;case"color":return au;case"quaternion":return $i;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function ep(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Qf(r.type);if(r.times===void 0){const t=[],n=[];ou(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Gn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(Uc(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!Uc(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Uc(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class tp{constructor(e,t,n){const i=this;let s=!1,o=0,l=0,h;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(f){l++,s===!1&&i.onStart!==void 0&&i.onStart(f,o,l),s=!0},this.itemEnd=function(f){o++,i.onProgress!==void 0&&i.onProgress(f,o,l),o===l&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(f){i.onError!==void 0&&i.onError(f)},this.resolveURL=function(f){return h?h(f):f},this.setURLModifier=function(f){return h=f,this},this.addHandler=function(f,a){return u.push(f,a),this},this.removeHandler=function(f){const a=u.indexOf(f);return a!==-1&&u.splice(a,2),this},this.getHandler=function(f){for(let a=0,c=u.length;a<c;a+=2){const d=u[a],p=u[a+1];if(d.global&&(d.lastIndex=0),d.test(f))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const np=new tp;class is{constructor(e){this.manager=e!==void 0?e:np,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class ip extends Error{constructor(e,t){super(e),this.response=t}}class lu extends is{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Gn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:n,onError:i});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),l=this.mimeType,h=this.responseType;fetch(o).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const f=Vn[e],a=u.body.getReader(),c=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),d=c?parseInt(c):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){a.read().then(({done:M,value:S})=>{if(M)m.close();else{_+=S.byteLength;const A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let w=0,P=f.length;w<P;w++){const x=f[w];x.onProgress&&x.onProgress(A)}m.enqueue(S),v()}},M=>{m.error(M)})}}});return new Response(g)}else throw new ip(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(h){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(f=>new DOMParser().parseFromString(f,l));case"json":return u.json();default:if(l==="")return u.text();{const a=/charset="?([^;"\s]*)"?/i.exec(l),c=a&&a[1]?a[1].toLowerCase():void 0,d=new TextDecoder(c);return u.arrayBuffer().then(p=>d.decode(p))}}}).then(u=>{Gn.add(`file:${e}`,u);const f=Vn[e];delete Vn[e];for(let a=0,c=f.length;a<c;a++){const d=f[a];d.onLoad&&d.onLoad(u)}}).catch(u=>{const f=Vn[e];if(f===void 0)throw this.manager.itemError(e),u;delete Vn[e];for(let a=0,c=f.length;a<c;a++){const d=f[a];d.onError&&d.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ni=new WeakMap;class sp extends is{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Gn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let a=Ni.get(o);a===void 0&&(a=[],Ni.set(o,a)),a.push({onLoad:t,onError:i})}return o}const l=Os("img");function h(){f(),t&&t(this);const a=Ni.get(this)||[];for(let c=0;c<a.length;c++){const d=a[c];d.onLoad&&d.onLoad(this)}Ni.delete(this),s.manager.itemEnd(e)}function u(a){f(),i&&i(a),Gn.remove(`image:${e}`);const c=Ni.get(this)||[];for(let d=0;d<c.length;d++){const p=c[d];p.onError&&p.onError(a)}Ni.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){l.removeEventListener("load",h,!1),l.removeEventListener("error",u,!1)}return l.addEventListener("load",h,!1),l.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),Gn.add(`image:${e}`,l),s.manager.itemStart(e),l.src=e,l}}class rp extends is{constructor(e){super(e)}load(e,t,n,i){const s=new Et,o=new sp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(l){s.image=l,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Zr extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new me(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class op extends Zr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new me(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Do=new Be,Oc=new R,Bc=new R;class Cl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sl,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oc),Bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bc),t.updateMatrixWorld(),Do.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Do,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Us||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Do)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tr=new R,wr=new Ut,vn=new R;class cu extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tr,wr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,wr,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Tr,wr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,wr,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new R,kc=new oe,zc=new oe;class Wt extends cu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Xi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xi*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-e/Qn.z)}getViewSize(e,t){return this.getViewBounds(e,kc,zc),t.subVectors(zc,kc)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ws*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const h=o.fullWidth,u=o.fullHeight;s+=o.offsetX*i/h,t-=o.offsetY*n/u,i*=o.width/h,n*=o.height/u}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ap extends Cl{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Xi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class hu extends Zr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new ap}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class lp extends Cl{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}}class Ps extends Zr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new lp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ks extends cu{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,l=i+t,h=i-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,l-=f*this.view.offsetY,h=l-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,l,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cp extends Cl{constructor(){super(new Ks(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ya extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new cp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Is{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const No=new WeakMap;class hp extends is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Gn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(u=>{if(No.has(o)===!0)i&&i(No.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(u),s.manager.itemEnd(e),u});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader,l.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const h=fetch(e,l).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(u){return Gn.add(`image-bitmap:${e}`,u),t&&t(u),s.manager.itemEnd(e),u}).catch(function(u){i&&i(u),No.set(h,u),Gn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Gn.add(`image-bitmap:${e}`,h),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Fi=-90,Ui=1;class up extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wt(Fi,Ui,e,t);i.layers=this.layers,this.add(i);const s=new Wt(Fi,Ui,e,t);s.layers=this.layers,this.add(s);const o=new Wt(Fi,Ui,e,t);o.layers=this.layers,this.add(o);const l=new Wt(Fi,Ui,e,t);l.layers=this.layers,this.add(l);const h=new Wt(Fi,Ui,e,t);h.layers=this.layers,this.add(h);const u=new Wt(Fi,Ui,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,l,h]=t;for(const u of t)this.remove(u);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,l,h,u,f]=this.children,a=e.getRenderTarget(),c=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(a,c,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class dp extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class fp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=pp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function pp(){this._document.hidden===!1&&this.reset()}const Pl="\\[\\]\\.:\\/",mp=new RegExp("["+Pl+"]","g"),Il="[^"+Pl+"]",gp="[^"+Pl.replace("\\.","")+"]",_p=/((?:WC+[\/:])*)/.source.replace("WC",Il),vp=/(WCOD+)?/.source.replace("WCOD",gp),xp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Il),yp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Il),Mp=new RegExp("^"+_p+vp+xp+yp+"$"),Sp=["material","materials","bones","map"];class bp{constructor(e,t,n){const i=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mp,"")}static parseTrackName(e){const t=Mp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Sp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const l=s[o];if(l.name===t||l.uuid===t)return l;const h=n(l.children);if(h)return h}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=t.objectIndex;switch(n){case"materials":if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===u){u=f;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Le("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Le("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(u!==void 0){if(e[u]===void 0){Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}const o=e[i];if(o===void 0){const u=t.nodeName;Le("PropertyBinding: Trying to update property for track: "+u+"."+i+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}h=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(h=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=bp;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Vc(r,e,t,n){const i=Tp(n);switch(t){case Nh:return r*e;case hl:return r*e/i.components*i.byteLength;case ul:return r*e/i.components*i.byteLength;case Wi:return r*e*2/i.components*i.byteLength;case dl:return r*e*2/i.components*i.byteLength;case Fh:return r*e*3/i.components*i.byteLength;case on:return r*e*4/i.components*i.byteLength;case fl:return r*e*4/i.components*i.byteLength;case Lr:case Dr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Nr:case Fr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case la:case ha:return Math.max(r,16)*Math.max(e,8)/4;case aa:case ca:return Math.max(r,8)*Math.max(e,8)/2;case ua:case da:case pa:case ma:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case fa:case ga:case _a:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case va:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case xa:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ya:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ba:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case wa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ea:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case La:case Da:case Na:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Fa:case Ua:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Oa:case Ba:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tp(r){switch(r){case Qt:case Ph:return{byteLength:1,components:1};case Ls:case Ih:case en:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case Cn:case al:case rn:return{byteLength:4,components:1};case Lh:case Dh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);function uu(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function wp(r){const e=new WeakMap;function t(l,h){const u=l.array,f=l.usage,a=u.byteLength,c=r.createBuffer();r.bindBuffer(h,c),r.bufferData(h,u,f),l.onUploadCallback();let d;if(u instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)d=r.HALF_FLOAT;else if(u instanceof Uint16Array)l.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)d=r.SHORT;else if(u instanceof Uint32Array)d=r.UNSIGNED_INT;else if(u instanceof Int32Array)d=r.INT;else if(u instanceof Int8Array)d=r.BYTE;else if(u instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:c,type:d,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:a}}function n(l,h,u){const f=h.array,a=h.updateRanges;if(r.bindBuffer(u,l),a.length===0)r.bufferSubData(u,0,f);else{a.sort((d,p)=>d.start-p.start);let c=0;for(let d=1;d<a.length;d++){const p=a[c],_=a[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++c,a[c]=_)}a.length=c+1;for(let d=0,p=a.length;d<p;d++){const _=a[d];r.bufferSubData(u,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}h.clearUpdateRanges()}h.onUploadCallback()}function i(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=e.get(l);h&&(r.deleteBuffer(h.buffer),e.delete(l))}function o(l,h){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const f=e.get(l);(!f||f.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const u=e.get(l);if(u===void 0)e.set(l,t(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,l,h),u.version=l.version}}return{get:i,remove:s,update:o}}var Ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
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
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lp=`#ifdef USE_AOMAP
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
#endif`,Dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Np=`#ifdef USE_BATCHING
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
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kp=`#ifdef USE_IRIDESCENCE
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
#endif`,zp=`#ifdef USE_BUMPMAP
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
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$p=`#define PI 3.141592653589793
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
} // validated`,Zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jp=`vec3 transformedNormal = objectNormal;
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
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
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
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
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
#endif`,am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,um=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
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
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_m=`uniform bool receiveShadow;
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
#endif`,vm=`#ifdef USE_ENVMAP
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
#endif`,xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
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
#endif`,Tm=`uniform sampler2D dfgLUT;
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
}`,wm=`
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
#endif`,Em=`#if defined( RE_IndirectDiffuse )
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
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fm=`#if defined( USE_POINTS_UV )
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
#endif`,Um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,km=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vm=`#ifdef USE_MORPHTARGETS
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
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Km=`#ifdef USE_NORMALMAP
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
#endif`,$m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ng=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ig=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,og=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hg=`float getShadowMask() {
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
}`,ug=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dg=`#ifdef USE_SKINNING
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
#endif`,fg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pg=`#ifdef USE_SKINNING
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
#endif`,mg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xg=`#ifdef USE_TRANSMISSION
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
#endif`,yg=`#ifdef USE_TRANSMISSION
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Eg=`uniform sampler2D t2D;
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`#include <common>
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
}`,Lg=`#if DEPTH_PACKING == 3200
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
}`,Dg=`#define DISTANCE
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
}`,Ng=`#define DISTANCE
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ug=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`uniform float scale;
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
}`,Bg=`uniform vec3 diffuse;
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
}`,kg=`#include <common>
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
}`,zg=`uniform vec3 diffuse;
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
}`,Vg=`#define LAMBERT
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
}`,Gg=`#define LAMBERT
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
}`,Hg=`#define MATCAP
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
}`,Wg=`#define MATCAP
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
}`,Xg=`#define NORMAL
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
}`,qg=`#define NORMAL
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
}`,Yg=`#define PHONG
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
}`,Kg=`#define PHONG
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
}`,$g=`#define STANDARD
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
}`,Zg=`#define STANDARD
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
}`,jg=`#define TOON
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
}`,Jg=`#define TOON
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
}`,Qg=`uniform float size;
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
}`,e0=`uniform vec3 diffuse;
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
}`,t0=`#include <common>
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
}`,n0=`uniform vec3 color;
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
}`,i0=`uniform float rotation;
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
}`,s0=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Ep,alphahash_pars_fragment:Ap,alphamap_fragment:Rp,alphamap_pars_fragment:Cp,alphatest_fragment:Pp,alphatest_pars_fragment:Ip,aomap_fragment:Lp,aomap_pars_fragment:Dp,batching_pars_vertex:Np,batching_vertex:Fp,begin_vertex:Up,beginnormal_vertex:Op,bsdfs:Bp,iridescence_fragment:kp,bumpmap_pars_fragment:zp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Gp,clipping_planes_pars_vertex:Hp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:Kp,common:$p,cube_uv_reflection_fragment:Zp,defaultnormal_vertex:jp,displacementmap_pars_vertex:Jp,displacementmap_vertex:Qp,emissivemap_fragment:em,emissivemap_pars_fragment:tm,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:sm,envmap_common_pars_fragment:rm,envmap_pars_fragment:om,envmap_pars_vertex:am,envmap_physical_pars_fragment:vm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:hm,fog_fragment:um,fog_pars_fragment:dm,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:_m,lights_toon_fragment:xm,lights_toon_pars_fragment:ym,lights_phong_fragment:Mm,lights_phong_pars_fragment:Sm,lights_physical_fragment:bm,lights_physical_pars_fragment:Tm,lights_fragment_begin:wm,lights_fragment_maps:Em,lights_fragment_end:Am,logdepthbuf_fragment:Rm,logdepthbuf_pars_fragment:Cm,logdepthbuf_pars_vertex:Pm,logdepthbuf_vertex:Im,map_fragment:Lm,map_pars_fragment:Dm,map_particle_fragment:Nm,map_particle_pars_fragment:Fm,metalnessmap_fragment:Um,metalnessmap_pars_fragment:Om,morphinstance_vertex:Bm,morphcolor_vertex:km,morphnormal_vertex:zm,morphtarget_pars_vertex:Vm,morphtarget_vertex:Gm,normal_fragment_begin:Hm,normal_fragment_maps:Wm,normal_pars_fragment:Xm,normal_pars_vertex:qm,normal_vertex:Ym,normalmap_pars_fragment:Km,clearcoat_normal_fragment_begin:$m,clearcoat_normal_fragment_maps:Zm,clearcoat_pars_fragment:jm,iridescence_pars_fragment:Jm,opaque_fragment:Qm,packing:eg,premultiplied_alpha_fragment:tg,project_vertex:ng,dithering_fragment:ig,dithering_pars_fragment:sg,roughnessmap_fragment:rg,roughnessmap_pars_fragment:og,shadowmap_pars_fragment:ag,shadowmap_pars_vertex:lg,shadowmap_vertex:cg,shadowmask_pars_fragment:hg,skinbase_vertex:ug,skinning_pars_vertex:dg,skinning_vertex:fg,skinnormal_vertex:pg,specularmap_fragment:mg,specularmap_pars_fragment:gg,tonemapping_fragment:_g,tonemapping_pars_fragment:vg,transmission_fragment:xg,transmission_pars_fragment:yg,uv_pars_fragment:Mg,uv_pars_vertex:Sg,uv_vertex:bg,worldpos_vertex:Tg,background_vert:wg,background_frag:Eg,backgroundCube_vert:Ag,backgroundCube_frag:Rg,cube_vert:Cg,cube_frag:Pg,depth_vert:Ig,depth_frag:Lg,distance_vert:Dg,distance_frag:Ng,equirect_vert:Fg,equirect_frag:Ug,linedashed_vert:Og,linedashed_frag:Bg,meshbasic_vert:kg,meshbasic_frag:zg,meshlambert_vert:Vg,meshlambert_frag:Gg,meshmatcap_vert:Hg,meshmatcap_frag:Wg,meshnormal_vert:Xg,meshnormal_frag:qg,meshphong_vert:Yg,meshphong_frag:Kg,meshphysical_vert:$g,meshphysical_frag:Zg,meshtoon_vert:jg,meshtoon_frag:Jg,points_vert:Qg,points_frag:e0,shadow_vert:t0,shadow_frag:n0,sprite_vert:i0,sprite_frag:s0},ae={common:{diffuse:{value:new me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new me(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Mn={basic:{uniforms:Ht([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Ht([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new me(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Ht([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new me(0)},specular:{value:new me(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Ht([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Ht([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new me(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Ht([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Ht([ae.points,ae.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Ht([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Ht([ae.common,ae.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Ht([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Ht([ae.sprite,ae.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Ht([ae.common,ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Ht([ae.lights,ae.fog,{color:{value:new me(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Mn.physical={uniforms:Ht([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new me(0)},specularColor:{value:new me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Er={r:0,b:0,g:0},hi=new ln,r0=new Be;function o0(r,e,t,n,i,s){const o=new me(0);let l=i===!0?0:1,h,u,f=null,a=0,c=null;function d(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const S=v.backgroundBlurriness>0;M=e.get(M,S)}return M}function p(v){let M=!1;const S=d(v);S===null?g(o,l):S&&S.isColor&&(g(S,1),M=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(v,M){const S=d(M);S&&(S.isCubeTexture||S.mapping===qr)?(u===void 0&&(u=new Te(new xt(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:Yi(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(u)),hi.copy(M.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(r0.makeRotationFromEuler(hi)),u.material.toneMapped=qe.getTransfer(S.colorSpace)!==Je,(f!==S||a!==S.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,f=S,a=S.version,c=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Te(new Qi(2,2),new Ot({name:"BackgroundMaterial",uniforms:Yi(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=qe.getTransfer(S.colorSpace)!==Je,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||a!==S.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,f=S,a=S.version,c=r.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function g(v,M){v.getRGB(Er,su(r)),t.buffers.color.setClear(Er.r,Er.g,Er.b,M,s)}function m(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,g(o,l)},render:p,addToRenderList:_,dispose:m}}function a0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null);let s=i,o=!1;function l(C,F,U,B,k){let z=!1;const G=a(C,B,U,F);s!==G&&(s=G,u(s.object)),z=d(C,B,U,k),z&&p(C,B,U,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,S(C,F,U,B),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function h(){return r.createVertexArray()}function u(C){return r.bindVertexArray(C)}function f(C){return r.deleteVertexArray(C)}function a(C,F,U,B){const k=B.wireframe===!0;let z=n[F.id];z===void 0&&(z={},n[F.id]=z);const G=C.isInstancedMesh===!0?C.id:0;let Q=z[G];Q===void 0&&(Q={},z[G]=Q);let Z=Q[U.id];Z===void 0&&(Z={},Q[U.id]=Z);let he=Z[k];return he===void 0&&(he=c(h()),Z[k]=he),he}function c(C){const F=[],U=[],B=[];for(let k=0;k<t;k++)F[k]=0,U[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:U,attributeDivisors:B,object:C,attributes:{},index:null}}function d(C,F,U,B){const k=s.attributes,z=F.attributes;let G=0;const Q=U.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const ge=k[Z];let de=z[Z];if(de===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(de=C.instanceColor)),ge===void 0||ge.attribute!==de||de&&ge.data!==de.data)return!0;G++}return s.attributesNum!==G||s.index!==B}function p(C,F,U,B){const k={},z=F.attributes;let G=0;const Q=U.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let ge=z[Z];ge===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(ge=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(ge=C.instanceColor));const de={};de.attribute=ge,ge&&ge.data&&(de.data=ge.data),k[Z]=de,G++}s.attributes=k,s.attributesNum=G,s.index=B}function _(){const C=s.newAttributes;for(let F=0,U=C.length;F<U;F++)C[F]=0}function g(C){m(C,0)}function m(C,F){const U=s.newAttributes,B=s.enabledAttributes,k=s.attributeDivisors;U[C]=1,B[C]===0&&(r.enableVertexAttribArray(C),B[C]=1),k[C]!==F&&(r.vertexAttribDivisor(C,F),k[C]=F)}function v(){const C=s.newAttributes,F=s.enabledAttributes;for(let U=0,B=F.length;U<B;U++)F[U]!==C[U]&&(r.disableVertexAttribArray(U),F[U]=0)}function M(C,F,U,B,k,z,G){G===!0?r.vertexAttribIPointer(C,F,U,k,z):r.vertexAttribPointer(C,F,U,B,k,z)}function S(C,F,U,B){_();const k=B.attributes,z=U.getAttributes(),G=F.defaultAttributeValues;for(const Q in z){const Z=z[Q];if(Z.location>=0){let he=k[Q];if(he===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),he!==void 0){const ge=he.normalized,de=he.itemSize,ke=e.get(he);if(ke===void 0)continue;const ut=ke.buffer,ct=ke.type,K=ke.bytesPerElement,ne=ct===r.INT||ct===r.UNSIGNED_INT||he.gpuType===al;if(he.isInterleavedBufferAttribute){const re=he.data,Ue=re.stride,Pe=he.offset;if(re.isInstancedInterleavedBuffer){for(let De=0;De<Z.locationSize;De++)m(Z.location+De,re.meshPerAttribute);C.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<Z.locationSize;De++)g(Z.location+De);r.bindBuffer(r.ARRAY_BUFFER,ut);for(let De=0;De<Z.locationSize;De++)M(Z.location+De,de/Z.locationSize,ct,ge,Ue*K,(Pe+de/Z.locationSize*De)*K,ne)}else{if(he.isInstancedBufferAttribute){for(let re=0;re<Z.locationSize;re++)m(Z.location+re,he.meshPerAttribute);C.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let re=0;re<Z.locationSize;re++)g(Z.location+re);r.bindBuffer(r.ARRAY_BUFFER,ut);for(let re=0;re<Z.locationSize;re++)M(Z.location+re,de/Z.locationSize,ct,ge,de*K,de/Z.locationSize*re*K,ne)}}else if(G!==void 0){const ge=G[Q];if(ge!==void 0)switch(ge.length){case 2:r.vertexAttrib2fv(Z.location,ge);break;case 3:r.vertexAttrib3fv(Z.location,ge);break;case 4:r.vertexAttrib4fv(Z.location,ge);break;default:r.vertexAttrib1fv(Z.location,ge)}}}}v()}function A(){b();for(const C in n){const F=n[C];for(const U in F){const B=F[U];for(const k in B){const z=B[k];for(const G in z)f(z[G].object),delete z[G];delete B[k]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;const F=n[C.id];for(const U in F){const B=F[U];for(const k in B){const z=B[k];for(const G in z)f(z[G].object),delete z[G];delete B[k]}}delete n[C.id]}function P(C){for(const F in n){const U=n[F];for(const B in U){const k=U[B];if(k[C.id]===void 0)continue;const z=k[C.id];for(const G in z)f(z[G].object),delete z[G];delete k[C.id]}}}function x(C){for(const F in n){const U=n[F],B=C.isInstancedMesh===!0?C.id:0,k=U[B];if(k!==void 0){for(const z in k){const G=k[z];for(const Q in G)f(G[Q].object),delete G[Q];delete k[z]}delete U[B],Object.keys(U).length===0&&delete n[F]}}}function b(){O(),o=!0,s!==i&&(s=i,u(s.object))}function O(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:l,reset:b,resetDefaultState:O,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function l0(r,e,t){let n;function i(u){n=u}function s(u,f){r.drawArrays(n,u,f),t.update(f,n,1)}function o(u,f,a){a!==0&&(r.drawArraysInstanced(n,u,f,a),t.update(f,n,a))}function l(u,f,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,f,0,a);let d=0;for(let p=0;p<a;p++)d+=f[p];t.update(d,n,1)}function h(u,f,a,c){if(a===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<u.length;p++)o(u[p],f[p],c[p]);else{d.multiDrawArraysInstancedWEBGL(n,u,0,f,0,c,0,a);let p=0;for(let _=0;_<a;_++)p+=f[_]*c[_];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=h}function c0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){return!(P!==on&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(P){const x=P===en&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Qt&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==rn&&!x)}function h(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const f=h(u);f!==u&&(Ae("WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const a=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:h,textureFormatReadable:o,textureTypeReadable:l,precision:u,logarithmicDepthBuffer:a,reversedDepthBuffer:c,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:S,maxSamples:A,samples:w}}function h0(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new pi,l=new Oe,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(a,c){const d=a.length!==0||c||n!==0||i;return i=c,n=a.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(a,c){t=f(a,c,0)},this.setState=function(a,c,d){const p=a.clippingPlanes,_=a.clipIntersection,g=a.clipShadows,m=r.get(a);if(!i||p===null||p.length===0||s&&!g)s?f(null):u();else{const v=s?0:n,M=v*4;let S=m.clippingState||null;h.value=S,S=f(p,c,M,d);for(let A=0;A!==M;++A)S[A]=t[A];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function u(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(a,c,d,p){const _=a!==null?a.length:0;let g=null;if(_!==0){if(g=h.value,p!==!0||g===null){const m=d+_*4,v=c.matrixWorldInverse;l.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,S=d;M!==_;++M,S+=4)o.copy(a[M]).applyMatrix4(v,l),o.normal.toArray(g,S),g[S+3]=o.constant}h.value=g,h.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const ni=4,Gc=[.125,.215,.35,.446,.526,.582],gi=20,u0=256,fs=new Ks,Hc=new me;let Fo=null,Uo=0,Oo=0,Bo=!1;const d0=new R;class Wc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:l=d0}=s;Fo=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,i,h,l),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fo,Uo,Oo),this._renderer.xr.enabled=Bo,e.scissorTest=!1,Oi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vi||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fo=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:en,format:on,colorSpace:qt,depthBuffer:!1},i=Xc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=f0(s)),this._blurMaterial=m0(s,e,t),this._ggxMaterial=p0(s,e,t)}return i}_compileMaterial(e){const t=new Te(new gt,e);this._renderer.compile(t,fs)}_sceneToCubeUV(e,t,n,i,s){const h=new Wt(90,1,t,n),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],a=this._renderer,c=a.autoClear,d=a.toneMapping;a.getClearColor(Hc),a.toneMapping=An,a.autoClear=!1,a.state.buffers.depth.getReversed()&&(a.setRenderTarget(i),a.clearDepth(),a.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Te(new xt,new Tt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(Hc),m=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(h.up.set(0,u[M],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x+f[M],s.y,s.z)):S===1?(h.up.set(0,0,u[M]),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y+f[M],s.z)):(h.up.set(0,u[M],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y,s.z+f[M]));const A=this._cubeSize;Oi(i,S*A,M>2?A:0,A,A),a.setRenderTarget(i),m&&a.render(_,h),a.render(e,h)}a.toneMapping=d,a.autoClear=c,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===vi||e.mapping===Hi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const l=s.uniforms;l.envMap.value=e;const h=this._cubeSize;Oi(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(o,fs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[n];l.material=o;const h=o.uniforms,u=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),a=Math.sqrt(u*u-f*f),c=0+u*1.25,d=a*c,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-ni?n-p+ni:0),m=4*(this._cubeSize-_);h.envMap.value=e.texture,h.roughness.value=d,h.mipInt.value=p-t,Oi(s,g,m,3*_,2*_),i.setRenderTarget(s),i.render(l,fs),h.envMap.value=s.texture,h.roughness.value=0,h.mipInt.value=p-n,Oi(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(l,fs)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,l){const h=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Le("blur direction must be either latitudinal or longitudinal!");const f=3,a=this._lodMeshes[i];a.material=u;const c=u.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*gi-1),_=s/p,g=isFinite(s)?1+Math.floor(f*_):gi;g>gi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const m=[];let v=0;for(let P=0;P<gi;++P){const x=P/_,b=Math.exp(-x*x/2);m.push(b),P===0?v+=b:P<g&&(v+=2*b)}for(let P=0;P<m.length;P++)m[P]=m[P]/v;c.envMap.value=e.texture,c.samples.value=g,c.weights.value=m,c.latitudinal.value=o==="latitudinal",l&&(c.poleAxis.value=l);const{_lodMax:M}=this;c.dTheta.value=p,c.mipInt.value=M-n;const S=this._sizeLods[i],A=3*S*(i>M-ni?i-M+ni:0),w=4*(this._cubeSize-S);Oi(t,A,w,3*S,2*S),h.setRenderTarget(t),h.render(a,fs)}}function f0(r){const e=[],t=[],n=[];let i=r;const s=r-ni+1+Gc.length;for(let o=0;o<s;o++){const l=Math.pow(2,i);e.push(l);let h=1/l;o>r-ni?h=Gc[o-r+ni-1]:o===0&&(h=0),t.push(h);const u=1/(l-2),f=-u,a=1+u,c=[f,f,a,f,a,a,f,f,a,a,f,a],d=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*d),M=new Float32Array(g*p*d),S=new Float32Array(m*p*d);for(let w=0;w<d;w++){const P=w%3*2/3-1,x=w>2?0:-1,b=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];v.set(b,_*p*w),M.set(c,g*p*w);const O=[w,w,w,w,w,w];S.set(O,m*p*w)}const A=new gt;A.setAttribute("position",new At(v,_)),A.setAttribute("uv",new At(M,g)),A.setAttribute("faceIndex",new At(S,m)),n.push(new Te(A,null)),i>ni&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Xc(r,e,t){const n=new Yt(r,e,t);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function p0(r,e,t){return new Ot({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:u0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jr(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function m0(r,e,t){const n=new Float32Array(gi),i=new R(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:jr(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function qc(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jr(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Yc(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function jr(){return`

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
	`}class du extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Yh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new xt(5,5,5),s=new Ot({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:En});s.uniforms.tEquirect.value=t;const o=new Te(i,s),l=t.minFilter;return t.minFilter===Tn&&(t.minFilter=bt),new up(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function g0(r){let e=new WeakMap,t=new WeakMap,n=null;function i(c,d=!1){return c==null?null:d?o(c):s(c)}function s(c){if(c&&c.isTexture){const d=c.mapping;if(d===to||d===no)if(e.has(c)){const p=e.get(c).texture;return l(p,c.mapping)}else{const p=c.image;if(p&&p.height>0){const _=new du(p.height);return _.fromEquirectangularTexture(r,c),e.set(c,_),c.addEventListener("dispose",u),l(_.texture,c.mapping)}else return null}}return c}function o(c){if(c&&c.isTexture){const d=c.mapping,p=d===to||d===no,_=d===vi||d===Hi;if(p||_){let g=t.get(c);const m=g!==void 0?g.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new Wc(r)),g=p?n.fromEquirectangular(c,g):n.fromCubemap(c,g),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),g.texture;if(g!==void 0)return g.texture;{const v=c.image;return p&&v&&v.height>0||_&&v&&h(v)?(n===null&&(n=new Wc(r)),g=p?n.fromEquirectangular(c):n.fromCubemap(c),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),c.addEventListener("dispose",f),g.texture):null}}}return c}function l(c,d){return d===to?c.mapping=vi:d===no&&(c.mapping=Hi),c}function h(c){let d=0;const p=6;for(let _=0;_<p;_++)c[_]!==void 0&&d++;return d===p}function u(c){const d=c.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(c){const d=c.target;d.removeEventListener("dispose",f);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function a(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function _0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Gr("WebGLRenderer: "+n+" extension not supported."),i}}}function v0(r,e,t,n){const i={},s=new WeakMap;function o(a){const c=a.target;c.index!==null&&e.remove(c.index);for(const p in c.attributes)e.remove(c.attributes[p]);c.removeEventListener("dispose",o),delete i[c.id];const d=s.get(c);d&&(e.remove(d),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(a,c){return i[c.id]===!0||(c.addEventListener("dispose",o),i[c.id]=!0,t.memory.geometries++),c}function h(a){const c=a.attributes;for(const d in c)e.update(c[d],r.ARRAY_BUFFER)}function u(a){const c=[],d=a.index,p=a.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const v=d.array;_=d.version;for(let M=0,S=v.length;M<S;M+=3){const A=v[M+0],w=v[M+1],P=v[M+2];c.push(A,w,w,P,P,A)}}else{const v=p.array;_=p.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const A=M+0,w=M+1,P=M+2;c.push(A,w,w,P,P,A)}}const g=new(p.count>=65535?Hh:Gh)(c,1);g.version=_;const m=s.get(a);m&&e.remove(m),s.set(a,g)}function f(a){const c=s.get(a);if(c){const d=a.index;d!==null&&c.version<d.version&&u(a)}else u(a);return s.get(a)}return{get:l,update:h,getWireframeAttribute:f}}function x0(r,e,t){let n;function i(c){n=c}let s,o;function l(c){s=c.type,o=c.bytesPerElement}function h(c,d){r.drawElements(n,d,s,c*o),t.update(d,n,1)}function u(c,d,p){p!==0&&(r.drawElementsInstanced(n,d,s,c*o,p),t.update(d,n,p))}function f(c,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,c,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function a(c,d,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<c.length;m++)u(c[m]/o,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,c,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=d[v]*_[v];t.update(m,n,1)}}this.setMode=i,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=a}function y0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,l){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=l*(s/3);break;case r.LINES:t.lines+=l*(s/2);break;case r.LINE_STRIP:t.lines+=l*(s-1);break;case r.LINE_LOOP:t.lines+=l*s;break;case r.POINTS:t.points+=l*s;break;default:Le("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function M0(r,e,t){const n=new WeakMap,i=new ht;function s(o,l,h){const u=o.morphTargetInfluences,f=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,a=f!==void 0?f.length:0;let c=n.get(l);if(c===void 0||c.count!==a){let b=function(){P.dispose(),n.delete(l),l.removeEventListener("dispose",b)};c!==void 0&&c.texture.dispose();const d=l.morphAttributes.position!==void 0,p=l.morphAttributes.normal!==void 0,_=l.morphAttributes.color!==void 0,g=l.morphAttributes.position||[],m=l.morphAttributes.normal||[],v=l.morphAttributes.color||[];let M=0;d===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let S=l.attributes.position.count*M,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const w=new Float32Array(S*A*4*a),P=new kh(w,S,A,a);P.type=rn,P.needsUpdate=!0;const x=M*4;for(let O=0;O<a;O++){const C=g[O],F=m[O],U=v[O],B=S*A*4*O;for(let k=0;k<C.count;k++){const z=k*x;d===!0&&(i.fromBufferAttribute(C,k),w[B+z+0]=i.x,w[B+z+1]=i.y,w[B+z+2]=i.z,w[B+z+3]=0),p===!0&&(i.fromBufferAttribute(F,k),w[B+z+4]=i.x,w[B+z+5]=i.y,w[B+z+6]=i.z,w[B+z+7]=0),_===!0&&(i.fromBufferAttribute(U,k),w[B+z+8]=i.x,w[B+z+9]=i.y,w[B+z+10]=i.z,w[B+z+11]=U.itemSize===4?i.w:1)}}c={count:a,texture:P,size:new oe(S,A)},n.set(l,c),l.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<u.length;_++)d+=u[_];const p=l.morphTargetsRelative?1:1-d;h.getUniforms().setValue(r,"morphTargetBaseInfluence",p),h.getUniforms().setValue(r,"morphTargetInfluences",u)}h.getUniforms().setValue(r,"morphTargetsTexture",c.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",c.size)}return{update:s}}function S0(r,e,t,n,i){let s=new WeakMap;function o(u){const f=i.render.frame,a=u.geometry,c=e.get(u,a);if(s.get(c)!==f&&(e.update(c),s.set(c,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",h)===!1&&u.addEventListener("dispose",h),s.get(u)!==f&&(t.update(u.instanceMatrix,r.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,r.ARRAY_BUFFER),s.set(u,f))),u.isSkinnedMesh){const d=u.skeleton;s.get(d)!==f&&(d.update(),s.set(d,f))}return c}function l(){s=new WeakMap}function h(u){const f=u.target;f.removeEventListener("dispose",h),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:l}}const b0={[tl]:"LINEAR_TONE_MAPPING",[nl]:"REINHARD_TONE_MAPPING",[il]:"CINEON_TONE_MAPPING",[Xr]:"ACES_FILMIC_TONE_MAPPING",[rl]:"AGX_TONE_MAPPING",[ol]:"NEUTRAL_TONE_MAPPING",[sl]:"CUSTOM_TONE_MAPPING"};function T0(r,e,t,n,i){const s=new Yt(e,t,{type:r,depthBuffer:n,stencilBuffer:i}),o=new Yt(e,t,{type:en,depthBuffer:!1,stencilBuffer:!1}),l=new gt;l.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ze([0,2,0,0,2,0],2));const h=new ru({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Te(l,h),f=new Ks(-1,1,1,-1,0,1);let a=null,c=null,d=!1,p,_=null,g=[],m=!1;this.setSize=function(v,M){s.setSize(v,M),o.setSize(v,M);for(let S=0;S<g.length;S++){const A=g[S];A.setSize&&A.setSize(v,M)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const M=s.width,S=s.height;for(let A=0;A<g.length;A++){const w=g[A];w.setSize&&w.setSize(M,S)}},this.begin=function(v,M){if(d||v.toneMapping===An&&g.length===0)return!1;if(_=M,M!==null){const S=M.width,A=M.height;(s.width!==S||s.height!==A)&&this.setSize(S,A)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=An,!0},this.hasRenderPass=function(){return m},this.end=function(v,M){v.toneMapping=p,d=!0;let S=s,A=o;for(let w=0;w<g.length;w++){const P=g[w];if(P.enabled!==!1&&(P.render(v,A,S,M),P.needsSwap!==!1)){const x=S;S=A,A=x}}if(a!==v.outputColorSpace||c!==v.toneMapping){a=v.outputColorSpace,c=v.toneMapping,h.defines={},qe.getTransfer(a)===Je&&(h.defines.SRGB_TRANSFER="");const w=b0[c];w&&(h.defines[w]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(_),v.render(u,f),_=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),o.dispose(),l.dispose(),h.dispose()}}const fu=new Et,Ka=new Bs(1,1),pu=new kh,mu=new Ud,gu=new Yh,Kc=[],$c=[],Zc=new Float32Array(16),jc=new Float32Array(9),Jc=new Float32Array(4);function ss(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Kc[i];if(s===void 0&&(s=new Float32Array(i),Kc[i]=s),e!==0){n.toArray(s,0);for(let o=1,l=0;o!==e;++o)l+=t,r[o].toArray(s,l)}return s}function Rt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ct(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Jr(r,e){let t=$c[e];t===void 0&&(t=new Int32Array(e),$c[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function w0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function E0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2fv(this.addr,e),Ct(t,e)}}function A0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;r.uniform3fv(this.addr,e),Ct(t,e)}}function R0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4fv(this.addr,e),Ct(t,e)}}function C0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Jc.set(n),r.uniformMatrix2fv(this.addr,!1,Jc),Ct(t,n)}}function P0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;jc.set(n),r.uniformMatrix3fv(this.addr,!1,jc),Ct(t,n)}}function I0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;Zc.set(n),r.uniformMatrix4fv(this.addr,!1,Zc),Ct(t,n)}}function L0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function D0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2iv(this.addr,e),Ct(t,e)}}function N0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3iv(this.addr,e),Ct(t,e)}}function F0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4iv(this.addr,e),Ct(t,e)}}function U0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function O0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2uiv(this.addr,e),Ct(t,e)}}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3uiv(this.addr,e),Ct(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4uiv(this.addr,e),Ct(t,e)}}function z0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ka.compareFunction=t.isReversedDepthBuffer()?ml:pl,s=Ka):s=fu,t.setTexture2D(e||s,i)}function V0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||mu,i)}function G0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gu,i)}function H0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||pu,i)}function W0(r){switch(r){case 5126:return w0;case 35664:return E0;case 35665:return A0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return I0;case 5124:case 35670:return L0;case 35667:case 35671:return D0;case 35668:case 35672:return N0;case 35669:case 35673:return F0;case 5125:return U0;case 36294:return O0;case 36295:return B0;case 36296:return k0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return H0}}function X0(r,e){r.uniform1fv(this.addr,e)}function q0(r,e){const t=ss(e,this.size,2);r.uniform2fv(this.addr,t)}function Y0(r,e){const t=ss(e,this.size,3);r.uniform3fv(this.addr,t)}function K0(r,e){const t=ss(e,this.size,4);r.uniform4fv(this.addr,t)}function $0(r,e){const t=ss(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Z0(r,e){const t=ss(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function j0(r,e){const t=ss(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function J0(r,e){r.uniform1iv(this.addr,e)}function Q0(r,e){r.uniform2iv(this.addr,e)}function e_(r,e){r.uniform3iv(this.addr,e)}function t_(r,e){r.uniform4iv(this.addr,e)}function n_(r,e){r.uniform1uiv(this.addr,e)}function i_(r,e){r.uniform2uiv(this.addr,e)}function s_(r,e){r.uniform3uiv(this.addr,e)}function r_(r,e){r.uniform4uiv(this.addr,e)}function o_(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=Ka:o=fu;for(let l=0;l!==i;++l)t.setTexture2D(e[l]||o,s[l])}function a_(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||mu,s[o])}function l_(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||gu,s[o])}function c_(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||pu,s[o])}function h_(r){switch(r){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return K0;case 35674:return $0;case 35675:return Z0;case 35676:return j0;case 5124:case 35670:return J0;case 35667:case 35671:return Q0;case 35668:case 35672:return e_;case 35669:case 35673:return t_;case 5125:return n_;case 36294:return i_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return a_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return c_}}class u_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=W0(t.type)}}class d_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=h_(t.type)}}class f_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const l=i[s];l.setValue(e,t[l.id],n)}}}const ko=/(\w+)(\])?(\[|\.)?/g;function Qc(r,e){r.seq.push(e),r.map[e.id]=e}function p_(r,e,t){const n=r.name,i=n.length;for(ko.lastIndex=0;;){const s=ko.exec(n),o=ko.lastIndex;let l=s[1];const h=s[2]==="]",u=s[3];if(h&&(l=l|0),u===void 0||u==="["&&o+2===i){Qc(t,u===void 0?new u_(l,r,e):new d_(l,r,e));break}else{let a=t.map[l];a===void 0&&(a=new f_(l),Qc(t,a)),t=a}}}class Ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const l=e.getActiveUniform(t,o),h=e.getUniformLocation(t,l.name);p_(l,h,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const l=t[s],h=n[l.id];h.needsUpdate!==!1&&l.setValue(e,h.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function eh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const m_=37297;let g_=0;function __(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const l=o+1;n.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return n.join(`
`)}const th=new Oe;function v_(r){qe._getMatrix(th,qe.workingColorSpace,r);const e=`mat3( ${th.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(r)){case zr:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function nh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+__(r.getShaderSource(e),l)}else return s}function x_(r,e){const t=v_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const y_={[tl]:"Linear",[nl]:"Reinhard",[il]:"Cineon",[Xr]:"ACESFilmic",[rl]:"AgX",[ol]:"Neutral",[sl]:"Custom"};function M_(r,e){const t=y_[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ar=new R;function S_(){qe.getLuminanceCoefficients(Ar);const r=Ar.x.toFixed(4),e=Ar.y.toFixed(4),t=Ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ts).join(`
`)}function T_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function w_(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let l=1;s.type===r.FLOAT_MAT2&&(l=2),s.type===r.FLOAT_MAT3&&(l=3),s.type===r.FLOAT_MAT4&&(l=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:l}}return t}function Ts(r){return r!==""}function ih(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const E_=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(r){return r.replace(E_,R_)}const A_=new Map;function R_(r,e){let t=ze[e];if(t===void 0){const n=A_.get(e);if(n!==void 0)t=ze[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return $a(t)}const C_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rh(r){return r.replace(C_,P_)}function P_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function oh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const I_={[Pr]:"SHADOWMAP_TYPE_PCF",[Ms]:"SHADOWMAP_TYPE_VSM"};function L_(r){return I_[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const D_={[vi]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function N_(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":D_[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const F_={[Hi]:"ENVMAP_MODE_REFRACTION"};function U_(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const O_={[Ah]:"ENVMAP_BLENDING_MULTIPLY",[ju]:"ENVMAP_BLENDING_MIX",[Ju]:"ENVMAP_BLENDING_ADD"};function B_(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":O_[r.combine]||"ENVMAP_BLENDING_NONE"}function k_(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function z_(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,l=t.fragmentShader;const h=L_(t),u=N_(t),f=U_(t),a=B_(t),c=k_(t),d=b_(t),p=T_(s),_=i.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ts).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ts).join(`
`),m.length>0&&(m+=`
`)):(g=[oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ts).join(`
`),m=[oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMap?"#define "+a:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?ze.tonemapping_pars_fragment:"",t.toneMapping!==An?M_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,x_("linearToOutputTexel",t.outputColorSpace),S_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ts).join(`
`)),o=$a(o),o=ih(o,t),o=sh(o,t),l=$a(l),l=ih(l,t),l=sh(l,t),o=rh(o),l=rh(l),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=v+g+o,S=v+m+l,A=eh(i,i.VERTEX_SHADER,M),w=eh(i,i.FRAGMENT_SHADER,S);i.attachShader(_,A),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(C){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(_)||"",U=i.getShaderInfoLog(A)||"",B=i.getShaderInfoLog(w)||"",k=F.trim(),z=U.trim(),G=B.trim();let Q=!0,Z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,w);else{const he=nh(i,A,"vertex"),ge=nh(i,w,"fragment");Le("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+he+`
`+ge)}else k!==""?Ae("WebGLProgram: Program Info Log:",k):(z===""||G==="")&&(Z=!1);Z&&(C.diagnostics={runnable:Q,programLog:k,vertexShader:{log:z,prefix:g},fragmentShader:{log:G,prefix:m}})}i.deleteShader(A),i.deleteShader(w),x=new Ur(i,_),b=w_(i,_)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(_,m_)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=g_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=w,this}let V_=0;class G_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new H_(e),t.set(e,n)),n}}class H_{constructor(e){this.id=V_++,this.code=e,this.usedTimes=0}}function W_(r,e,t,n,i,s){const o=new zh,l=new G_,h=new Set,u=[],f=new Map,a=n.logarithmicDepthBuffer;let c=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return h.add(x),x===0?"uv":`uv${x}`}function _(x,b,O,C,F){const U=C.fog,B=F.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=e.get(x.envMap||k,z),Q=G&&G.mapping===qr?G.image.height:null,Z=d[x.type];x.precision!==null&&(c=n.getMaxPrecision(x.precision),c!==x.precision&&Ae("WebGLProgram.getParameters:",x.precision,"not supported, using",c,"instead."));const he=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ge=he!==void 0?he.length:0;let de=0;B.morphAttributes.position!==void 0&&(de=1),B.morphAttributes.normal!==void 0&&(de=2),B.morphAttributes.color!==void 0&&(de=3);let ke,ut,ct,K;if(Z){const et=Mn[Z];ke=et.vertexShader,ut=et.fragmentShader}else ke=x.vertexShader,ut=x.fragmentShader,l.update(x),ct=l.getVertexShaderID(x),K=l.getFragmentShaderID(x);const ne=r.getRenderTarget(),re=r.state.buffers.depth.getReversed(),Ue=F.isInstancedMesh===!0,Pe=F.isBatchedMesh===!0,De=!!x.map,Pt=!!x.matcap,Ye=!!G,Qe=!!x.aoMap,rt=!!x.lightMap,Ve=!!x.bumpMap,_t=!!x.normalMap,I=!!x.displacementMap,Mt=!!x.emissiveMap,je=!!x.metalnessMap,at=!!x.roughnessMap,Se=x.anisotropy>0,E=x.clearcoat>0,y=x.dispersion>0,D=x.iridescence>0,Y=x.sheen>0,$=x.transmission>0,q=Se&&!!x.anisotropyMap,_e=E&&!!x.clearcoatMap,ie=E&&!!x.clearcoatNormalMap,Ce=E&&!!x.clearcoatRoughnessMap,Ie=D&&!!x.iridescenceMap,j=D&&!!x.iridescenceThicknessMap,ee=Y&&!!x.sheenColorMap,ve=Y&&!!x.sheenRoughnessMap,ye=!!x.specularMap,ue=!!x.specularColorMap,Ge=!!x.specularIntensityMap,L=$&&!!x.transmissionMap,se=$&&!!x.thicknessMap,te=!!x.gradientMap,pe=!!x.alphaMap,J=x.alphaTest>0,X=!!x.alphaHash,xe=!!x.extensions;let Ne=An;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ne=r.toneMapping);const lt={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:ke,fragmentShader:ut,defines:x.defines,customVertexShaderID:ct,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:c,batching:Pe,batchingColor:Pe&&F._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&F.instanceColor!==null,instancingMorph:Ue&&F.morphTexture!==null,outputColorSpace:ne===null?r.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:qt,alphaToCoverage:!!x.alphaToCoverage,map:De,matcap:Pt,envMap:Ye,envMapMode:Ye&&G.mapping,envMapCubeUVHeight:Q,aoMap:Qe,lightMap:rt,bumpMap:Ve,normalMap:_t,displacementMap:I,emissiveMap:Mt,normalMapObjectSpace:_t&&x.normalMapType===id,normalMapTangentSpace:_t&&x.normalMapType===Oh,metalnessMap:je,roughnessMap:at,anisotropy:Se,anisotropyMap:q,clearcoat:E,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:Ce,dispersion:y,iridescence:D,iridescenceMap:Ie,iridescenceThicknessMap:j,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:ue,specularIntensityMap:Ge,transmission:$,transmissionMap:L,thicknessMap:se,gradientMap:te,opaque:x.transparent===!1&&x.blending===ki&&x.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:X,combine:x.combine,mapUv:De&&p(x.map.channel),aoMapUv:Qe&&p(x.aoMap.channel),lightMapUv:rt&&p(x.lightMap.channel),bumpMapUv:Ve&&p(x.bumpMap.channel),normalMapUv:_t&&p(x.normalMap.channel),displacementMapUv:I&&p(x.displacementMap.channel),emissiveMapUv:Mt&&p(x.emissiveMap.channel),metalnessMapUv:je&&p(x.metalnessMap.channel),roughnessMapUv:at&&p(x.roughnessMap.channel),anisotropyMapUv:q&&p(x.anisotropyMap.channel),clearcoatMapUv:_e&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(x.sheenRoughnessMap.channel),specularMapUv:ye&&p(x.specularMap.channel),specularColorMapUv:ue&&p(x.specularColorMap.channel),specularIntensityMapUv:Ge&&p(x.specularIntensityMap.channel),transmissionMapUv:L&&p(x.transmissionMap.channel),thicknessMapUv:se&&p(x.thicknessMap.channel),alphaMapUv:pe&&p(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_t||Se),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(De||pe),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:a,reversedDepthBuffer:re,skinning:F.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:de,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&O.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ne,decodeVideoTexture:De&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===Je,decodeVideoTextureEmissive:Mt&&x.emissiveMap.isVideoTexture===!0&&qe.getTransfer(x.emissiveMap.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Jt,flipSided:x.side===Xt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&x.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return lt.vertexUv1s=h.has(1),lt.vertexUv2s=h.has(2),lt.vertexUv3s=h.has(3),h.clear(),lt}function g(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const O in x.defines)b.push(O),b.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(m(b,x),v(b,x),b.push(r.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function m(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function v(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const b=d[x.type];let O;if(b){const C=Mn[b];O=Gs.clone(C.uniforms)}else O=x.uniforms;return O}function S(x,b){let O=f.get(b);return O!==void 0?++O.usedTimes:(O=new z_(r,b,x,i),u.push(O),f.set(b,O)),O}function A(x){if(--x.usedTimes===0){const b=u.indexOf(x);u[b]=u[u.length-1],u.pop(),f.delete(x.cacheKey),x.destroy()}}function w(x){l.remove(x)}function P(){l.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:M,acquireProgram:S,releaseProgram:A,releaseShaderCache:w,programs:u,dispose:P}}function X_(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function n(o){r.delete(o)}function i(o,l,h){r.get(o)[l]=h}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function q_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function ah(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function lh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(c){let d=0;return c.isInstancedMesh&&(d+=2),c.isSkinnedMesh&&(d+=1),d}function l(c,d,p,_,g,m){let v=r[e];return v===void 0?(v={id:c.id,object:c,geometry:d,material:p,materialVariant:o(c),groupOrder:_,renderOrder:c.renderOrder,z:g,group:m},r[e]=v):(v.id=c.id,v.object=c,v.geometry=d,v.material=p,v.materialVariant=o(c),v.groupOrder=_,v.renderOrder=c.renderOrder,v.z=g,v.group=m),e++,v}function h(c,d,p,_,g,m){const v=l(c,d,p,_,g,m);p.transmission>0?n.push(v):p.transparent===!0?i.push(v):t.push(v)}function u(c,d,p,_,g,m){const v=l(c,d,p,_,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?i.unshift(v):t.unshift(v)}function f(c,d){t.length>1&&t.sort(c||q_),n.length>1&&n.sort(d||ah),i.length>1&&i.sort(d||ah)}function a(){for(let c=e,d=r.length;c<d;c++){const p=r[c];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:h,unshift:u,finish:a,sort:f}}function Y_(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new lh,r.set(n,[o])):i>=s.length?(o=new lh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function K_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new me};break;case"SpotLight":t={position:new R,direction:new R,color:new me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new me,groundColor:new me};break;case"RectAreaLight":t={color:new me,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function $_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Z_=0;function j_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function J_(r){const e=new K_,t=$_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new R);const i=new R,s=new Be,o=new Be;function l(u){let f=0,a=0,c=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,v=0,M=0,S=0,A=0,w=0,P=0;u.sort(j_);for(let b=0,O=u.length;b<O;b++){const C=u[b],F=C.color,U=C.intensity,B=C.distance;let k=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Wi?k=C.shadow.map.texture:k=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)f+=F.r*U,a+=F.g*U,c+=F.b*U;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],U);P++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const G=C.shadow,Q=t.get(C);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.directionalShadow[d]=Q,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=C.shadow.matrix,v++}n.directional[d]=z,d++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(F).multiplyScalar(U),z.distance=B,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[_]=z;const G=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,G.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=G.matrix,C.castShadow){const Q=t.get(C);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.spotShadow[_]=Q,n.spotShadowMap[_]=k,S++}_++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(F).multiplyScalar(U),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=z,g++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const G=C.shadow,Q=t.get(C);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,Q.shadowCameraNear=G.camera.near,Q.shadowCameraFar=G.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=k,n.pointShadowMatrix[p]=C.shadow.matrix,M++}n.point[p]=z,p++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(U),z.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[m]=z,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=a,n.ambient[2]=c;const x=n.hash;(x.directionalLength!==d||x.pointLength!==p||x.spotLength!==_||x.rectAreaLength!==g||x.hemiLength!==m||x.numDirectionalShadows!==v||x.numPointShadows!==M||x.numSpotShadows!==S||x.numSpotMaps!==A||x.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,x.directionalLength=d,x.pointLength=p,x.spotLength=_,x.rectAreaLength=g,x.hemiLength=m,x.numDirectionalShadows=v,x.numPointShadows=M,x.numSpotShadows=S,x.numSpotMaps=A,x.numLightProbes=P,n.version=Z_++)}function h(u,f){let a=0,c=0,d=0,p=0,_=0;const g=f.matrixWorldInverse;for(let m=0,v=u.length;m<v;m++){const M=u[m];if(M.isDirectionalLight){const S=n.directional[a];S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),a++}else if(M.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),d++}else if(M.isRectAreaLight){const S=n.rectArea[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(M.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),p++}else if(M.isPointLight){const S=n.point[c];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(g),c++}else if(M.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(g),_++}}}return{setup:l,setupView:h,state:n}}function ch(r){const e=new J_(r),t=[],n=[];function i(f){u.camera=f,t.length=0,n.length=0}function s(f){t.push(f)}function o(f){n.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:u,setupLights:l,setupLightsView:h,pushLight:s,pushShadow:o}}function Q_(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let l;return o===void 0?(l=new ch(r),e.set(i,[l])):s>=o.length?(l=new ch(r),o.push(l)):l=o[s],l}function n(){e=new WeakMap}return{get:t,dispose:n}}const ev=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tv=`uniform sampler2D shadow_pass;
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
}`,nv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],iv=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],hh=new Be,ps=new R,zo=new R;function sv(r,e,t){let n=new Sl;const i=new oe,s=new oe,o=new ht,l=new Wf,h=new Xf,u={},f=t.maxTextureSize,a={[Wn]:Xt,[Xt]:Wn,[Jt]:Jt},c=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:ev,fragmentShader:tv}),d=c.clone();d.defines.HORIZONTAL_PASS=1;const p=new gt;p.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Te(p,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pr;let m=this.type;this.render=function(w,P,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Eh&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Pr);const b=r.getRenderTarget(),O=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),F=r.state;F.setBlending(En),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const U=m!==this.type;U&&P.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(k=>k.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,k=w.length;B<k;B++){const z=w[B],G=z.shadow;if(G===void 0){Ae("WebGLShadowMap:",z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const Q=G.getFrameExtents();i.multiply(Q),s.copy(G.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/Q.x),i.x=s.x*Q.x,G.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/Q.y),i.y=s.y*Q.y,G.mapSize.y=s.y));const Z=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Z,G.map===null||U===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ms){if(z.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Yt(i.x,i.y,{format:Wi,type:en,minFilter:bt,magFilter:bt,generateMipmaps:!1}),G.map.texture.name=z.name+".shadowMap",G.map.depthTexture=new Bs(i.x,i.y,rn),G.map.depthTexture.name=z.name+".shadowMapDepth",G.map.depthTexture.format=Xn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=wt,G.map.depthTexture.magFilter=wt}else z.isPointLight?(G.map=new du(i.x),G.map.depthTexture=new lf(i.x,Cn)):(G.map=new Yt(i.x,i.y),G.map.depthTexture=new Bs(i.x,i.y,Cn)),G.map.depthTexture.name=z.name+".shadowMap",G.map.depthTexture.format=Xn,this.type===Pr?(G.map.depthTexture.compareFunction=Z?ml:pl,G.map.depthTexture.minFilter=bt,G.map.depthTexture.magFilter=bt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=wt,G.map.depthTexture.magFilter=wt);G.camera.updateProjectionMatrix()}const he=G.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<he;ge++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,ge),r.clear();else{ge===0&&(r.setRenderTarget(G.map),r.clear());const de=G.getViewport(ge);o.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),F.viewport(o)}if(z.isPointLight){const de=G.camera,ke=G.matrix,ut=z.distance||de.far;ut!==de.far&&(de.far=ut,de.updateProjectionMatrix()),ps.setFromMatrixPosition(z.matrixWorld),de.position.copy(ps),zo.copy(de.position),zo.add(nv[ge]),de.up.copy(iv[ge]),de.lookAt(zo),de.updateMatrixWorld(),ke.makeTranslation(-ps.x,-ps.y,-ps.z),hh.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),G._frustum.setFromProjectionMatrix(hh,de.coordinateSystem,de.reversedDepth)}else G.updateMatrices(z);n=G.getFrustum(),S(P,x,G.camera,z,this.type)}G.isPointLightShadow!==!0&&this.type===Ms&&v(G,x),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(b,O,C)};function v(w,P){const x=e.update(_);c.defines.VSM_SAMPLES!==w.blurSamples&&(c.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,c.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Yt(i.x,i.y,{format:Wi,type:en})),c.uniforms.shadow_pass.value=w.map.depthTexture,c.uniforms.resolution.value=w.mapSize,c.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(P,null,x,c,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(P,null,x,d,_,null)}function M(w,P,x,b){let O=null;const C=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)O=C;else if(O=x.isPointLight===!0?h:l,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=O.uuid,U=P.uuid;let B=u[F];B===void 0&&(B={},u[F]=B);let k=B[U];k===void 0&&(k=O.clone(),B[U]=k,P.addEventListener("dispose",A)),O=k}if(O.visible=P.visible,O.wireframe=P.wireframe,b===Ms?O.side=P.shadowSide!==null?P.shadowSide:P.side:O.side=P.shadowSide!==null?P.shadowSide:a[P.side],O.alphaMap=P.alphaMap,O.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,O.map=P.map,O.clipShadows=P.clipShadows,O.clippingPlanes=P.clippingPlanes,O.clipIntersection=P.clipIntersection,O.displacementMap=P.displacementMap,O.displacementScale=P.displacementScale,O.displacementBias=P.displacementBias,O.wireframeLinewidth=P.wireframeLinewidth,O.linewidth=P.linewidth,x.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const F=r.properties.get(O);F.light=x}return O}function S(w,P,x,b,O){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&O===Ms)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const U=e.update(w),B=w.material;if(Array.isArray(B)){const k=U.groups;for(let z=0,G=k.length;z<G;z++){const Q=k[z],Z=B[Q.materialIndex];if(Z&&Z.visible){const he=M(w,Z,b,O);w.onBeforeShadow(r,w,P,x,U,he,Q),r.renderBufferDirect(x,null,U,he,w,Q),w.onAfterShadow(r,w,P,x,U,he,Q)}}}else if(B.visible){const k=M(w,B,b,O);w.onBeforeShadow(r,w,P,x,U,k,null),r.renderBufferDirect(x,null,U,k,w,null),w.onAfterShadow(r,w,P,x,U,k,null)}}const F=w.children;for(let U=0,B=F.length;U<B;U++)S(F[U],P,x,b,O)}function A(w){w.target.removeEventListener("dispose",A);for(const x in u){const b=u[x],O=w.target.uuid;O in b&&(b[O].dispose(),delete b[O])}}}function rv(r,e){function t(){let L=!1;const se=new ht;let te=null;const pe=new ht(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(r.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,X,xe,Ne,lt){lt===!0&&(J*=Ne,X*=Ne,xe*=Ne),se.set(J,X,xe,Ne),pe.equals(se)===!1&&(r.clearColor(J,X,xe,Ne),pe.copy(se))},reset:function(){L=!1,te=null,pe.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,te=null,pe=null,J=null;return{setReversed:function(X){if(se!==X){const xe=e.get("EXT_clip_control");X?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),se=X;const Ne=J;J=null,this.setClear(Ne)}},getReversed:function(){return se},setTest:function(X){X?ne(r.DEPTH_TEST):re(r.DEPTH_TEST)},setMask:function(X){te!==X&&!L&&(r.depthMask(X),te=X)},setFunc:function(X){if(se&&(X=pd[X]),pe!==X){switch(X){case ea:r.depthFunc(r.NEVER);break;case ta:r.depthFunc(r.ALWAYS);break;case na:r.depthFunc(r.LESS);break;case Gi:r.depthFunc(r.LEQUAL);break;case ia:r.depthFunc(r.EQUAL);break;case sa:r.depthFunc(r.GEQUAL);break;case ra:r.depthFunc(r.GREATER);break;case oa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}pe=X}},setLocked:function(X){L=X},setClear:function(X){J!==X&&(J=X,se&&(X=1-X),r.clearDepth(X))},reset:function(){L=!1,te=null,pe=null,J=null,se=!1}}}function i(){let L=!1,se=null,te=null,pe=null,J=null,X=null,xe=null,Ne=null,lt=null;return{setTest:function(et){L||(et?ne(r.STENCIL_TEST):re(r.STENCIL_TEST))},setMask:function(et){se!==et&&!L&&(r.stencilMask(et),se=et)},setFunc:function(et,Nn,Fn){(te!==et||pe!==Nn||J!==Fn)&&(r.stencilFunc(et,Nn,Fn),te=et,pe=Nn,J=Fn)},setOp:function(et,Nn,Fn){(X!==et||xe!==Nn||Ne!==Fn)&&(r.stencilOp(et,Nn,Fn),X=et,xe=Nn,Ne=Fn)},setLocked:function(et){L=et},setClear:function(et){lt!==et&&(r.clearStencil(et),lt=et)},reset:function(){L=!1,se=null,te=null,pe=null,J=null,X=null,xe=null,Ne=null,lt=null}}}const s=new t,o=new n,l=new i,h=new WeakMap,u=new WeakMap;let f={},a={},c=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,M=null,S=null,A=null,w=null,P=new me(0,0,0),x=0,b=!1,O=null,C=null,F=null,U=null,B=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,G=0;const Q=r.getParameter(r.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=G>=2);let Z=null,he={};const ge=r.getParameter(r.SCISSOR_BOX),de=r.getParameter(r.VIEWPORT),ke=new ht().fromArray(ge),ut=new ht().fromArray(de);function ct(L,se,te,pe){const J=new Uint8Array(4),X=r.createTexture();r.bindTexture(L,X),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let xe=0;xe<te;xe++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(se,0,r.RGBA,1,1,pe,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(se+xe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return X}const K={};K[r.TEXTURE_2D]=ct(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=ct(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=ct(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=ct(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),ne(r.DEPTH_TEST),o.setFunc(Gi),Ve(!1),_t(Wl),ne(r.CULL_FACE),Qe(En);function ne(L){f[L]!==!0&&(r.enable(L),f[L]=!0)}function re(L){f[L]!==!1&&(r.disable(L),f[L]=!1)}function Ue(L,se){return a[L]!==se?(r.bindFramebuffer(L,se),a[L]=se,L===r.DRAW_FRAMEBUFFER&&(a[r.FRAMEBUFFER]=se),L===r.FRAMEBUFFER&&(a[r.DRAW_FRAMEBUFFER]=se),!0):!1}function Pe(L,se){let te=d,pe=!1;if(L){te=c.get(se),te===void 0&&(te=[],c.set(se,te));const J=L.textures;if(te.length!==J.length||te[0]!==r.COLOR_ATTACHMENT0){for(let X=0,xe=J.length;X<xe;X++)te[X]=r.COLOR_ATTACHMENT0+X;te.length=J.length,pe=!0}}else te[0]!==r.BACK&&(te[0]=r.BACK,pe=!0);pe&&r.drawBuffers(te)}function De(L){return p!==L?(r.useProgram(L),p=L,!0):!1}const Pt={[mi]:r.FUNC_ADD,[Nu]:r.FUNC_SUBTRACT,[Fu]:r.FUNC_REVERSE_SUBTRACT};Pt[Uu]=r.MIN,Pt[Ou]=r.MAX;const Ye={[Bu]:r.ZERO,[ku]:r.ONE,[zu]:r.SRC_COLOR,[Jo]:r.SRC_ALPHA,[qu]:r.SRC_ALPHA_SATURATE,[Wu]:r.DST_COLOR,[Gu]:r.DST_ALPHA,[Vu]:r.ONE_MINUS_SRC_COLOR,[Qo]:r.ONE_MINUS_SRC_ALPHA,[Xu]:r.ONE_MINUS_DST_COLOR,[Hu]:r.ONE_MINUS_DST_ALPHA,[Yu]:r.CONSTANT_COLOR,[Ku]:r.ONE_MINUS_CONSTANT_COLOR,[$u]:r.CONSTANT_ALPHA,[Zu]:r.ONE_MINUS_CONSTANT_ALPHA};function Qe(L,se,te,pe,J,X,xe,Ne,lt,et){if(L===En){_===!0&&(re(r.BLEND),_=!1);return}if(_===!1&&(ne(r.BLEND),_=!0),L!==Du){if(L!==g||et!==b){if((m!==mi||S!==mi)&&(r.blendEquation(r.FUNC_ADD),m=mi,S=mi),et)switch(L){case ki:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jo:r.blendFunc(r.ONE,r.ONE);break;case Xl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ql:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Le("WebGLState: Invalid blending: ",L);break}else switch(L){case ki:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Xl:Le("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:Le("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Le("WebGLState: Invalid blending: ",L);break}v=null,M=null,A=null,w=null,P.set(0,0,0),x=0,g=L,b=et}return}J=J||se,X=X||te,xe=xe||pe,(se!==m||J!==S)&&(r.blendEquationSeparate(Pt[se],Pt[J]),m=se,S=J),(te!==v||pe!==M||X!==A||xe!==w)&&(r.blendFuncSeparate(Ye[te],Ye[pe],Ye[X],Ye[xe]),v=te,M=pe,A=X,w=xe),(Ne.equals(P)===!1||lt!==x)&&(r.blendColor(Ne.r,Ne.g,Ne.b,lt),P.copy(Ne),x=lt),g=L,b=!1}function rt(L,se){L.side===Jt?re(r.CULL_FACE):ne(r.CULL_FACE);let te=L.side===Xt;se&&(te=!te),Ve(te),L.blending===ki&&L.transparent===!1?Qe(En):Qe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const pe=L.stencilWrite;l.setTest(pe),pe&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Mt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(r.SAMPLE_ALPHA_TO_COVERAGE):re(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){O!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),O=L)}function _t(L){L!==Iu?(ne(r.CULL_FACE),L!==C&&(L===Wl?r.cullFace(r.BACK):L===Lu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):re(r.CULL_FACE),C=L}function I(L){L!==F&&(z&&r.lineWidth(L),F=L)}function Mt(L,se,te){L?(ne(r.POLYGON_OFFSET_FILL),(U!==se||B!==te)&&(U=se,B=te,o.getReversed()&&(se=-se),r.polygonOffset(se,te))):re(r.POLYGON_OFFSET_FILL)}function je(L){L?ne(r.SCISSOR_TEST):re(r.SCISSOR_TEST)}function at(L){L===void 0&&(L=r.TEXTURE0+k-1),Z!==L&&(r.activeTexture(L),Z=L)}function Se(L,se,te){te===void 0&&(Z===null?te=r.TEXTURE0+k-1:te=Z);let pe=he[te];pe===void 0&&(pe={type:void 0,texture:void 0},he[te]=pe),(pe.type!==L||pe.texture!==se)&&(Z!==te&&(r.activeTexture(te),Z=te),r.bindTexture(L,se||K[L]),pe.type=L,pe.texture=se)}function E(){const L=he[Z];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function y(){try{r.compressedTexImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function Y(){try{r.texSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function $(){try{r.texSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function _e(){try{r.compressedTexSubImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function ie(){try{r.texStorage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function Ce(){try{r.texStorage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function Ie(){try{r.texImage2D(...arguments)}catch(L){Le("WebGLState:",L)}}function j(){try{r.texImage3D(...arguments)}catch(L){Le("WebGLState:",L)}}function ee(L){ke.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),ke.copy(L))}function ve(L){ut.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),ut.copy(L))}function ye(L,se){let te=u.get(se);te===void 0&&(te=new WeakMap,u.set(se,te));let pe=te.get(L);pe===void 0&&(pe=r.getUniformBlockIndex(se,L.name),te.set(L,pe))}function ue(L,se){const pe=u.get(se).get(L);h.get(se)!==pe&&(r.uniformBlockBinding(se,pe,L.__bindingPointIndex),h.set(se,pe))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},Z=null,he={},a={},c=new WeakMap,d=[],p=null,_=!1,g=null,m=null,v=null,M=null,S=null,A=null,w=null,P=new me(0,0,0),x=0,b=!1,O=null,C=null,F=null,U=null,B=null,ke.set(0,0,r.canvas.width,r.canvas.height),ut.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:ne,disable:re,bindFramebuffer:Ue,drawBuffers:Pe,useProgram:De,setBlending:Qe,setMaterial:rt,setFlipSided:Ve,setCullFace:_t,setLineWidth:I,setPolygonOffset:Mt,setScissorTest:je,activeTexture:at,bindTexture:Se,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:D,texImage2D:Ie,texImage3D:j,updateUBOMapping:ye,uniformBlockBinding:ue,texStorage2D:ie,texStorage3D:Ce,texSubImage2D:Y,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:_e,scissor:ee,viewport:ve,reset:Ge}}function ov(r,e,t,n,i,s,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new oe,f=new WeakMap;let a;const c=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(E,y){return d?new OffscreenCanvas(E,y):Os("canvas")}function _(E,y,D){let Y=1;const $=Se(E);if(($.width>D||$.height>D)&&(Y=D/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const q=Math.floor(Y*$.width),_e=Math.floor(Y*$.height);a===void 0&&(a=p(q,_e));const ie=y?p(q,_e):a;return ie.width=q,ie.height=_e,ie.getContext("2d").drawImage(E,0,0,q,_e),Ae("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+_e+")."),ie}else return"data"in E&&Ae("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function g(E){return E.generateMipmaps}function m(E){r.generateMipmap(E)}function v(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(E,y,D,Y,$=!1){if(E!==null){if(r[E]!==void 0)return r[E];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=y;if(y===r.RED&&(D===r.FLOAT&&(q=r.R32F),D===r.HALF_FLOAT&&(q=r.R16F),D===r.UNSIGNED_BYTE&&(q=r.R8)),y===r.RED_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.R8UI),D===r.UNSIGNED_SHORT&&(q=r.R16UI),D===r.UNSIGNED_INT&&(q=r.R32UI),D===r.BYTE&&(q=r.R8I),D===r.SHORT&&(q=r.R16I),D===r.INT&&(q=r.R32I)),y===r.RG&&(D===r.FLOAT&&(q=r.RG32F),D===r.HALF_FLOAT&&(q=r.RG16F),D===r.UNSIGNED_BYTE&&(q=r.RG8)),y===r.RG_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RG8UI),D===r.UNSIGNED_SHORT&&(q=r.RG16UI),D===r.UNSIGNED_INT&&(q=r.RG32UI),D===r.BYTE&&(q=r.RG8I),D===r.SHORT&&(q=r.RG16I),D===r.INT&&(q=r.RG32I)),y===r.RGB_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGB8UI),D===r.UNSIGNED_SHORT&&(q=r.RGB16UI),D===r.UNSIGNED_INT&&(q=r.RGB32UI),D===r.BYTE&&(q=r.RGB8I),D===r.SHORT&&(q=r.RGB16I),D===r.INT&&(q=r.RGB32I)),y===r.RGBA_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),D===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),D===r.UNSIGNED_INT&&(q=r.RGBA32UI),D===r.BYTE&&(q=r.RGBA8I),D===r.SHORT&&(q=r.RGBA16I),D===r.INT&&(q=r.RGBA32I)),y===r.RGB&&(D===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),D===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),y===r.RGBA){const _e=$?zr:qe.getTransfer(Y);D===r.FLOAT&&(q=r.RGBA32F),D===r.HALF_FLOAT&&(q=r.RGBA16F),D===r.UNSIGNED_BYTE&&(q=_e===Je?r.SRGB8_ALPHA8:r.RGBA8),D===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),D===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function S(E,y){let D;return E?y===null||y===Cn||y===Ds?D=r.DEPTH24_STENCIL8:y===rn?D=r.DEPTH32F_STENCIL8:y===Ls&&(D=r.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Cn||y===Ds?D=r.DEPTH_COMPONENT24:y===rn?D=r.DEPTH_COMPONENT32F:y===Ls&&(D=r.DEPTH_COMPONENT16),D}function A(E,y){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==wt&&E.minFilter!==bt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function w(E){const y=E.target;y.removeEventListener("dispose",w),x(y),y.isVideoTexture&&f.delete(y)}function P(E){const y=E.target;y.removeEventListener("dispose",P),O(y)}function x(E){const y=n.get(E);if(y.__webglInit===void 0)return;const D=E.source,Y=c.get(D);if(Y){const $=Y[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(E),Object.keys(Y).length===0&&c.delete(D)}n.remove(E)}function b(E){const y=n.get(E);r.deleteTexture(y.__webglTexture);const D=E.source,Y=c.get(D);delete Y[y.__cacheKey],o.memory.textures--}function O(E){const y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let $=0;$<y.__webglFramebuffer[Y].length;$++)r.deleteFramebuffer(y.__webglFramebuffer[Y][$]);else r.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)r.deleteFramebuffer(y.__webglFramebuffer[Y]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const D=E.textures;for(let Y=0,$=D.length;Y<$;Y++){const q=n.get(D[Y]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(D[Y])}n.remove(E)}let C=0;function F(){C=0}function U(){const E=C;return E>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),C+=1,E}function B(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function k(E,y){const D=n.get(E);if(E.isVideoTexture&&je(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&D.__version!==E.version){const Y=E.image;if(Y===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{K(D,E,y);return}}else E.isExternalTexture&&(D.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,D.__webglTexture,r.TEXTURE0+y)}function z(E,y){const D=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){K(D,E,y);return}else E.isExternalTexture&&(D.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,D.__webglTexture,r.TEXTURE0+y)}function G(E,y){const D=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){K(D,E,y);return}t.bindTexture(r.TEXTURE_3D,D.__webglTexture,r.TEXTURE0+y)}function Q(E,y){const D=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&D.__version!==E.version){ne(D,E,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+y)}const Z={[sn]:r.REPEAT,[bn]:r.CLAMP_TO_EDGE,[kr]:r.MIRRORED_REPEAT},he={[wt]:r.NEAREST,[Ch]:r.NEAREST_MIPMAP_NEAREST,[Ss]:r.NEAREST_MIPMAP_LINEAR,[bt]:r.LINEAR,[Ir]:r.LINEAR_MIPMAP_NEAREST,[Tn]:r.LINEAR_MIPMAP_LINEAR},ge={[sd]:r.NEVER,[cd]:r.ALWAYS,[rd]:r.LESS,[pl]:r.LEQUAL,[od]:r.EQUAL,[ml]:r.GEQUAL,[ad]:r.GREATER,[ld]:r.NOTEQUAL};function de(E,y){if(y.type===rn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===bt||y.magFilter===Ir||y.magFilter===Ss||y.magFilter===Tn||y.minFilter===bt||y.minFilter===Ir||y.minFilter===Ss||y.minFilter===Tn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,Z[y.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,Z[y.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,Z[y.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,he[y.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,he[y.minFilter]),y.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,ge[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===wt||y.minFilter!==Ss&&y.minFilter!==Tn||y.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ke(E,y){let D=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",w));const Y=y.source;let $=c.get(Y);$===void 0&&($={},c.set(Y,$));const q=B(y);if(q!==E.__cacheKey){$[q]===void 0&&($[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,D=!0),$[q].usedTimes++;const _e=$[E.__cacheKey];_e!==void 0&&($[E.__cacheKey].usedTimes--,_e.usedTimes===0&&b(y)),E.__cacheKey=q,E.__webglTexture=$[q].texture}return D}function ut(E,y,D){return Math.floor(Math.floor(E/D)/y)}function ct(E,y,D,Y){const q=E.updateRanges;if(q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,D,Y,y.data);else{q.sort((j,ee)=>j.start-ee.start);let _e=0;for(let j=1;j<q.length;j++){const ee=q[_e],ve=q[j],ye=ee.start+ee.count,ue=ut(ve.start,y.width,4),Ge=ut(ee.start,y.width,4);ve.start<=ye+1&&ue===Ge&&ut(ve.start+ve.count-1,y.width,4)===ue?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++_e,q[_e]=ve)}q.length=_e+1;const ie=r.getParameter(r.UNPACK_ROW_LENGTH),Ce=r.getParameter(r.UNPACK_SKIP_PIXELS),Ie=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let j=0,ee=q.length;j<ee;j++){const ve=q[j],ye=Math.floor(ve.start/4),ue=Math.ceil(ve.count/4),Ge=ye%y.width,L=Math.floor(ye/y.width),se=ue,te=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,L),t.texSubImage2D(r.TEXTURE_2D,0,Ge,L,se,te,D,Y,y.data)}E.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ie),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ce),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ie)}}function K(E,y,D){let Y=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=r.TEXTURE_3D);const $=ke(E,y),q=y.source;t.bindTexture(Y,E.__webglTexture,r.TEXTURE0+D);const _e=n.get(q);if(q.version!==_e.__version||$===!0){t.activeTexture(r.TEXTURE0+D);const ie=qe.getPrimaries(qe.workingColorSpace),Ce=y.colorSpace===ti?null:qe.getPrimaries(y.colorSpace),Ie=y.colorSpace===ti||ie===Ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let j=_(y.image,!1,i.maxTextureSize);j=at(y,j);const ee=s.convert(y.format,y.colorSpace),ve=s.convert(y.type);let ye=M(y.internalFormat,ee,ve,y.colorSpace,y.isVideoTexture);de(Y,y);let ue;const Ge=y.mipmaps,L=y.isVideoTexture!==!0,se=_e.__version===void 0||$===!0,te=q.dataReady,pe=A(y,j);if(y.isDepthTexture)ye=S(y.format===_i,y.type),se&&(L?t.texStorage2D(r.TEXTURE_2D,1,ye,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,ee,ve,null));else if(y.isDataTexture)if(Ge.length>0){L&&se&&t.texStorage2D(r.TEXTURE_2D,pe,ye,Ge[0].width,Ge[0].height);for(let J=0,X=Ge.length;J<X;J++)ue=Ge[J],L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ve,ue.data):t.texImage2D(r.TEXTURE_2D,J,ye,ue.width,ue.height,0,ee,ve,ue.data);y.generateMipmaps=!1}else L?(se&&t.texStorage2D(r.TEXTURE_2D,pe,ye,j.width,j.height),te&&ct(y,j,ee,ve)):t.texImage2D(r.TEXTURE_2D,0,ye,j.width,j.height,0,ee,ve,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){L&&se&&t.texStorage3D(r.TEXTURE_2D_ARRAY,pe,ye,Ge[0].width,Ge[0].height,j.depth);for(let J=0,X=Ge.length;J<X;J++)if(ue=Ge[J],y.format!==on)if(ee!==null)if(L){if(te)if(y.layerUpdates.size>0){const xe=Vc(ue.width,ue.height,y.format,y.type);for(const Ne of y.layerUpdates){const lt=ue.data.subarray(Ne*xe/ue.data.BYTES_PER_ELEMENT,(Ne+1)*xe/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Ne,ue.width,ue.height,1,ee,lt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,j.depth,ee,ue.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,ye,ue.width,ue.height,j.depth,0,ue.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,j.depth,ee,ve,ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,ye,ue.width,ue.height,j.depth,0,ee,ve,ue.data)}else{L&&se&&t.texStorage2D(r.TEXTURE_2D,pe,ye,Ge[0].width,Ge[0].height);for(let J=0,X=Ge.length;J<X;J++)ue=Ge[J],y.format!==on?ee!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ue.data):t.compressedTexImage2D(r.TEXTURE_2D,J,ye,ue.width,ue.height,0,ue.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ve,ue.data):t.texImage2D(r.TEXTURE_2D,J,ye,ue.width,ue.height,0,ee,ve,ue.data)}else if(y.isDataArrayTexture)if(L){if(se&&t.texStorage3D(r.TEXTURE_2D_ARRAY,pe,ye,j.width,j.height,j.depth),te)if(y.layerUpdates.size>0){const J=Vc(j.width,j.height,y.format,y.type);for(const X of y.layerUpdates){const xe=j.data.subarray(X*J/j.data.BYTES_PER_ELEMENT,(X+1)*J/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,X,j.width,j.height,1,ee,ve,xe)}y.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ee,ve,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ye,j.width,j.height,j.depth,0,ee,ve,j.data);else if(y.isData3DTexture)L?(se&&t.texStorage3D(r.TEXTURE_3D,pe,ye,j.width,j.height,j.depth),te&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ee,ve,j.data)):t.texImage3D(r.TEXTURE_3D,0,ye,j.width,j.height,j.depth,0,ee,ve,j.data);else if(y.isFramebufferTexture){if(se)if(L)t.texStorage2D(r.TEXTURE_2D,pe,ye,j.width,j.height);else{let J=j.width,X=j.height;for(let xe=0;xe<pe;xe++)t.texImage2D(r.TEXTURE_2D,xe,ye,J,X,0,ee,ve,null),J>>=1,X>>=1}}else if(Ge.length>0){if(L&&se){const J=Se(Ge[0]);t.texStorage2D(r.TEXTURE_2D,pe,ye,J.width,J.height)}for(let J=0,X=Ge.length;J<X;J++)ue=Ge[J],L?te&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ee,ve,ue):t.texImage2D(r.TEXTURE_2D,J,ye,ee,ve,ue);y.generateMipmaps=!1}else if(L){if(se){const J=Se(j);t.texStorage2D(r.TEXTURE_2D,pe,ye,J.width,J.height)}te&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee,ve,j)}else t.texImage2D(r.TEXTURE_2D,0,ye,ee,ve,j);g(y)&&m(Y),_e.__version=q.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ne(E,y,D){if(y.image.length!==6)return;const Y=ke(E,y),$=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+D);const q=n.get($);if($.version!==q.__version||Y===!0){t.activeTexture(r.TEXTURE0+D);const _e=qe.getPrimaries(qe.workingColorSpace),ie=y.colorSpace===ti?null:qe.getPrimaries(y.colorSpace),Ce=y.colorSpace===ti||_e===ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,j=y.image[0]&&y.image[0].isDataTexture,ee=[];for(let X=0;X<6;X++)!Ie&&!j?ee[X]=_(y.image[X],!0,i.maxCubemapSize):ee[X]=j?y.image[X].image:y.image[X],ee[X]=at(y,ee[X]);const ve=ee[0],ye=s.convert(y.format,y.colorSpace),ue=s.convert(y.type),Ge=M(y.internalFormat,ye,ue,y.colorSpace),L=y.isVideoTexture!==!0,se=q.__version===void 0||Y===!0,te=$.dataReady;let pe=A(y,ve);de(r.TEXTURE_CUBE_MAP,y);let J;if(Ie){L&&se&&t.texStorage2D(r.TEXTURE_CUBE_MAP,pe,Ge,ve.width,ve.height);for(let X=0;X<6;X++){J=ee[X].mipmaps;for(let xe=0;xe<J.length;xe++){const Ne=J[xe];y.format!==on?ye!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Ne.width,Ne.height,ye,Ne.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ge,Ne.width,Ne.height,0,Ne.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Ne.width,Ne.height,ye,ue,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ge,Ne.width,Ne.height,0,ye,ue,Ne.data)}}}else{if(J=y.mipmaps,L&&se){J.length>0&&pe++;const X=Se(ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,pe,Ge,X.width,X.height)}for(let X=0;X<6;X++)if(j){L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ee[X].width,ee[X].height,ye,ue,ee[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,ee[X].width,ee[X].height,0,ye,ue,ee[X].data);for(let xe=0;xe<J.length;xe++){const lt=J[xe].image[X].image;L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,lt.width,lt.height,ye,ue,lt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ge,lt.width,lt.height,0,ye,ue,lt.data)}}else{L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ye,ue,ee[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,ye,ue,ee[X]);for(let xe=0;xe<J.length;xe++){const Ne=J[xe];L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,ye,ue,Ne.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ge,ye,ue,Ne.image[X])}}}g(y)&&m(r.TEXTURE_CUBE_MAP),q.__version=$.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function re(E,y,D,Y,$,q){const _e=s.convert(D.format,D.colorSpace),ie=s.convert(D.type),Ce=M(D.internalFormat,_e,ie,D.colorSpace),Ie=n.get(y),j=n.get(D);if(j.__renderTarget=y,!Ie.__hasExternalTextures){const ee=Math.max(1,y.width>>q),ve=Math.max(1,y.height>>q);$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?t.texImage3D($,q,Ce,ee,ve,y.depth,0,_e,ie,null):t.texImage2D($,q,Ce,ee,ve,0,_e,ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),Mt(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,$,j.__webglTexture,0,I(y)):($===r.TEXTURE_2D||$>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,$,j.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ue(E,y,D){if(r.bindRenderbuffer(r.RENDERBUFFER,E),y.depthBuffer){const Y=y.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,q=S(y.stencilBuffer,$),_e=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Mt(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(y),q,y.width,y.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(y),q,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,q,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,_e,r.RENDERBUFFER,E)}else{const Y=y.textures;for(let $=0;$<Y.length;$++){const q=Y[$],_e=s.convert(q.format,q.colorSpace),ie=s.convert(q.type),Ce=M(q.internalFormat,_e,ie,q.colorSpace);Mt(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(y),Ce,y.width,y.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(y),Ce,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,Ce,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(E,y,D){const Y=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(y.depthTexture);if($.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,y.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),de(r.TEXTURE_CUBE_MAP,y.depthTexture);const Ie=s.convert(y.depthTexture.format),j=s.convert(y.depthTexture.type);let ee;y.depthTexture.format===Xn?ee=r.DEPTH_COMPONENT24:y.depthTexture.format===_i&&(ee=r.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,y.width,y.height,0,Ie,j,null)}}else k(y.depthTexture,0);const q=$.__webglTexture,_e=I(y),ie=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+D:r.TEXTURE_2D,Ce=y.depthTexture.format===_i?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(y.depthTexture.format===Xn)Mt(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ce,ie,q,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,Ce,ie,q,0);else if(y.depthTexture.format===_i)Mt(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Ce,ie,q,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,Ce,ie,q,0);else throw new Error("Unknown depthTexture format")}function De(E){const y=n.get(E),D=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){const $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=Y}if(E.depthTexture&&!y.__autoAllocateDepthBuffer)if(D)for(let Y=0;Y<6;Y++)Pe(y.__webglFramebuffer[Y],E,Y);else{const Y=E.texture.mipmaps;Y&&Y.length>0?Pe(y.__webglFramebuffer[0],E,0):Pe(y.__webglFramebuffer,E,0)}else if(D){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=r.createRenderbuffer(),Ue(y.__webglDepthbuffer[Y],E,!1);else{const $=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}else{const Y=E.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Ue(y.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(E,y,D){const Y=n.get(E);y!==void 0&&re(Y.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),D!==void 0&&De(E)}function Ye(E){const y=E.texture,D=n.get(E),Y=n.get(y);E.addEventListener("dispose",P);const $=E.textures,q=E.isWebGLCubeRenderTarget===!0,_e=$.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=y.version,o.memory.textures++),q){D.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer[ie]=[];for(let Ce=0;Ce<y.mipmaps.length;Ce++)D.__webglFramebuffer[ie][Ce]=r.createFramebuffer()}else D.__webglFramebuffer[ie]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer=[];for(let ie=0;ie<y.mipmaps.length;ie++)D.__webglFramebuffer[ie]=r.createFramebuffer()}else D.__webglFramebuffer=r.createFramebuffer();if(_e)for(let ie=0,Ce=$.length;ie<Ce;ie++){const Ie=n.get($[ie]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=r.createTexture(),o.memory.textures++)}if(E.samples>0&&Mt(E)===!1){D.__webglMultisampledFramebuffer=r.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ie=0;ie<$.length;ie++){const Ce=$[ie];D.__webglColorRenderbuffer[ie]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,D.__webglColorRenderbuffer[ie]);const Ie=s.convert(Ce.format,Ce.colorSpace),j=s.convert(Ce.type),ee=M(Ce.internalFormat,Ie,j,Ce.colorSpace,E.isXRRenderTarget===!0),ve=I(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,ee,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ie,r.RENDERBUFFER,D.__webglColorRenderbuffer[ie])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(D.__webglDepthRenderbuffer=r.createRenderbuffer(),Ue(D.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),de(r.TEXTURE_CUBE_MAP,y);for(let ie=0;ie<6;ie++)if(y.mipmaps&&y.mipmaps.length>0)for(let Ce=0;Ce<y.mipmaps.length;Ce++)re(D.__webglFramebuffer[ie][Ce],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ce);else re(D.__webglFramebuffer[ie],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);g(y)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ie=0,Ce=$.length;ie<Ce;ie++){const Ie=$[ie],j=n.get(Ie);let ee=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ee=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,j.__webglTexture),de(ee,Ie),re(D.__webglFramebuffer,E,Ie,r.COLOR_ATTACHMENT0+ie,ee,0),g(Ie)&&m(ee)}t.unbindTexture()}else{let ie=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ie,Y.__webglTexture),de(ie,y),y.mipmaps&&y.mipmaps.length>0)for(let Ce=0;Ce<y.mipmaps.length;Ce++)re(D.__webglFramebuffer[Ce],E,y,r.COLOR_ATTACHMENT0,ie,Ce);else re(D.__webglFramebuffer,E,y,r.COLOR_ATTACHMENT0,ie,0);g(y)&&m(ie),t.unbindTexture()}E.depthBuffer&&De(E)}function Qe(E){const y=E.textures;for(let D=0,Y=y.length;D<Y;D++){const $=y[D];if(g($)){const q=v(E),_e=n.get($).__webglTexture;t.bindTexture(q,_e),m(q),t.unbindTexture()}}}const rt=[],Ve=[];function _t(E){if(E.samples>0){if(Mt(E)===!1){const y=E.textures,D=E.width,Y=E.height;let $=r.COLOR_BUFFER_BIT;const q=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=n.get(E),ie=y.length>1;if(ie)for(let Ie=0;Ie<y.length;Ie++)t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Ce=E.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ie=0;Ie<y.length;Ie++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=r.STENCIL_BUFFER_BIT)),ie){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const j=n.get(y[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,j,0)}r.blitFramebuffer(0,0,D,Y,0,0,D,Y,$,r.NEAREST),h===!0&&(rt.length=0,Ve.length=0,rt.push(r.COLOR_ATTACHMENT0+Ie),E.depthBuffer&&E.resolveDepthBuffer===!1&&(rt.push(q),Ve.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ve)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,rt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ie)for(let Ie=0;Ie<y.length;Ie++){t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,_e.__webglColorRenderbuffer[Ie]);const j=n.get(y[Ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,_e.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,j,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&h){const y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function I(E){return Math.min(i.maxSamples,E.samples)}function Mt(E){const y=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function je(E){const y=o.render.frame;f.get(E)!==y&&(f.set(E,y),E.update())}function at(E,y){const D=E.colorSpace,Y=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||D!==qt&&D!==ti&&(qe.getTransfer(D)===Je?(Y!==on||$!==Qt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Le("WebGLTextures: Unsupported texture color space:",D)),y}function Se(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(u.width=E.naturalWidth||E.width,u.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(u.width=E.displayWidth,u.height=E.displayHeight):(u.width=E.width,u.height=E.height),u}this.allocateTextureUnit=U,this.resetTextureUnits=F,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=Pt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function av(r,e){function t(n,i=ti){let s;const o=qe.getTransfer(i);if(n===Qt)return r.UNSIGNED_BYTE;if(n===ll)return r.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Lh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Dh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ph)return r.BYTE;if(n===Ih)return r.SHORT;if(n===Ls)return r.UNSIGNED_SHORT;if(n===al)return r.INT;if(n===Cn)return r.UNSIGNED_INT;if(n===rn)return r.FLOAT;if(n===en)return r.HALF_FLOAT;if(n===Nh)return r.ALPHA;if(n===Fh)return r.RGB;if(n===on)return r.RGBA;if(n===Xn)return r.DEPTH_COMPONENT;if(n===_i)return r.DEPTH_STENCIL;if(n===hl)return r.RED;if(n===ul)return r.RED_INTEGER;if(n===Wi)return r.RG;if(n===dl)return r.RG_INTEGER;if(n===fl)return r.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Fr)if(o===Je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===aa||n===la||n===ca||n===ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===aa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===la)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ca)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ua||n===da)return o===Je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===fa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===pa)return s.COMPRESSED_R11_EAC;if(n===ma)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ga)return s.COMPRESSED_RG11_EAC;if(n===_a)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===va||n===xa||n===ya||n===Ma||n===Sa||n===ba||n===Ta||n===wa||n===Ea||n===Aa||n===Ra||n===Ca||n===Pa||n===Ia)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===va)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ya)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ma)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ba)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ea)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ra)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ca)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ia)return o===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Da||n===Na)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===La)return o===Je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===Ua||n===Oa||n===Ba)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ba)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ds?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cv=`
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

}`;class hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Kh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ot({vertexShader:lv,fragmentShader:cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Te(new Qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uv extends Ji{constructor(e,t){super();const n=this;let i=null,s=1,o=null,l="local-floor",h=1,u=null,f=null,a=null,c=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new hv,m={},v=t.getContextAttributes();let M=null,S=null;const A=[],w=[],P=new oe;let x=null;const b=new Wt;b.viewport=new ht;const O=new Wt;O.viewport=new ht;const C=[b,O],F=new dp;let U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ne=A[K];return ne===void 0&&(ne=new co,A[K]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(K){let ne=A[K];return ne===void 0&&(ne=new co,A[K]=ne),ne.getGripSpace()},this.getHand=function(K){let ne=A[K];return ne===void 0&&(ne=new co,A[K]=ne),ne.getHandSpace()};function k(K){const ne=w.indexOf(K.inputSource);if(ne===-1)return;const re=A[ne];re!==void 0&&(re.update(K.inputSource,K.frame,u||o),re.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",G);for(let K=0;K<A.length;K++){const ne=w[K];ne!==null&&(w[K]=null,A[K].disconnect(ne))}U=null,B=null,g.reset();for(const K in m)delete m[K];e.setRenderTarget(M),d=null,c=null,a=null,i=null,S=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){l=K,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(K){u=K},this.getBaseLayer=function(){return c!==null?c:d},this.getBinding=function(){return a===null&&_&&(a=new XRWebGLBinding(i,t)),a},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",z),i.addEventListener("inputsourceschange",G),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ue=null,Pe=null;v.depth&&(Pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=v.stencil?_i:Xn,Ue=v.stencil?Ds:Cn);const De={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};a=this.getBinding(),c=a.createProjectionLayer(De),i.updateRenderState({layers:[c]}),e.setPixelRatio(1),e.setSize(c.textureWidth,c.textureHeight,!1),S=new Yt(c.textureWidth,c.textureHeight,{format:on,type:Qt,depthTexture:new Bs(c.textureWidth,c.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}else{const re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Yt(d.framebufferWidth,d.framebufferHeight,{format:on,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(h),u=null,o=await i.requestReferenceSpace(l),ct.setContext(i),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(K){for(let ne=0;ne<K.removed.length;ne++){const re=K.removed[ne],Ue=w.indexOf(re);Ue>=0&&(w[Ue]=null,A[Ue].disconnect(re))}for(let ne=0;ne<K.added.length;ne++){const re=K.added[ne];let Ue=w.indexOf(re);if(Ue===-1){for(let De=0;De<A.length;De++)if(De>=w.length){w.push(re),Ue=De;break}else if(w[De]===null){w[De]=re,Ue=De;break}if(Ue===-1)break}const Pe=A[Ue];Pe&&Pe.connect(re)}}const Q=new R,Z=new R;function he(K,ne,re){Q.setFromMatrixPosition(ne.matrixWorld),Z.setFromMatrixPosition(re.matrixWorld);const Ue=Q.distanceTo(Z),Pe=ne.projectionMatrix.elements,De=re.projectionMatrix.elements,Pt=Pe[14]/(Pe[10]-1),Ye=Pe[14]/(Pe[10]+1),Qe=(Pe[9]+1)/Pe[5],rt=(Pe[9]-1)/Pe[5],Ve=(Pe[8]-1)/Pe[0],_t=(De[8]+1)/De[0],I=Pt*Ve,Mt=Pt*_t,je=Ue/(-Ve+_t),at=je*-Ve;if(ne.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(at),K.translateZ(je),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Pe[10]===-1)K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Se=Pt+je,E=Ye+je,y=I-at,D=Mt+(Ue-at),Y=Qe*Ye/E*Se,$=rt*Ye/E*Se;K.projectionMatrix.makePerspective(y,D,Y,$,Se,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ge(K,ne){ne===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ne.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let ne=K.near,re=K.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(re=g.depthFar)),F.near=O.near=b.near=ne,F.far=O.far=b.far=re,(U!==F.near||B!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),U=F.near,B=F.far),F.layers.mask=K.layers.mask|6,b.layers.mask=F.layers.mask&-5,O.layers.mask=F.layers.mask&-3;const Ue=K.parent,Pe=F.cameras;ge(F,Ue);for(let De=0;De<Pe.length;De++)ge(Pe[De],Ue);Pe.length===2?he(F,b,O):F.projectionMatrix.copy(b.projectionMatrix),de(K,F,Ue)};function de(K,ne,re){re===null?K.matrix.copy(ne.matrixWorld):(K.matrix.copy(re.matrixWorld),K.matrix.invert(),K.matrix.multiply(ne.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ne.projectionMatrix),K.projectionMatrixInverse.copy(ne.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Xi*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(c===null&&d===null))return h},this.setFoveation=function(K){h=K,c!==null&&(c.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return m[K]};let ke=null;function ut(K,ne){if(f=ne.getViewerPose(u||o),p=ne,f!==null){const re=f.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let Ue=!1;re.length!==F.cameras.length&&(F.cameras.length=0,Ue=!0);for(let Ye=0;Ye<re.length;Ye++){const Qe=re[Ye];let rt=null;if(d!==null)rt=d.getViewport(Qe);else{const _t=a.getViewSubImage(c,Qe);rt=_t.viewport,Ye===0&&(e.setRenderTargetTextures(S,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(S))}let Ve=C[Ye];Ve===void 0&&(Ve=new Wt,Ve.layers.enable(Ye),Ve.viewport=new ht,C[Ye]=Ve),Ve.matrix.fromArray(Qe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Qe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(rt.x,rt.y,rt.width,rt.height),Ye===0&&(F.matrix.copy(Ve.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ue===!0&&F.cameras.push(Ve)}const Pe=i.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){a=n.getBinding();const Ye=a.getDepthInformation(re[0]);Ye&&Ye.isValid&&Ye.texture&&g.init(Ye,i.renderState)}if(Pe&&Pe.includes("camera-access")&&_){e.state.unbindTexture(),a=n.getBinding();for(let Ye=0;Ye<re.length;Ye++){const Qe=re[Ye].camera;if(Qe){let rt=m[Qe];rt||(rt=new Kh,m[Qe]=rt);const Ve=a.getCameraImage(Qe);rt.sourceTexture=Ve}}}}for(let re=0;re<A.length;re++){const Ue=w[re],Pe=A[re];Ue!==null&&Pe!==void 0&&Pe.update(Ue,ne,u||o)}ke&&ke(K,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}const ct=new uu;ct.setAnimationLoop(ut),this.setAnimationLoop=function(K){ke=K},this.dispose=function(){}}}const ui=new ln,dv=new Be;function fv(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,su(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,v,M,S){m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),a(g,m)):m.isMeshPhongMaterial?(s(g,m),f(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),c(g,m),m.isMeshPhysicalMaterial&&d(g,m,S)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&l(g,m)):m.isPointsMaterial?h(g,m,v,M):m.isSpriteMaterial?u(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Xt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Xt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),M=v.envMap,S=v.envMapRotation;M&&(g.envMap.value=M,ui.copy(S),ui.x*=-1,ui.y*=-1,ui.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),g.envMapRotation.value.setFromMatrix4(dv.makeRotationFromEuler(ui)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function l(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function h(g,m,v,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=M*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function f(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function a(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function c(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function pv(r,e,t,n){let i={},s={},o=[];const l=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function h(v,M){const S=M.program;n.uniformBlockBinding(v,S)}function u(v,M){let S=i[v.id];S===void 0&&(p(v),S=f(v),i[v.id]=S,v.addEventListener("dispose",g));const A=M.program;n.updateUBOMapping(v,A);const w=e.render.frame;s[v.id]!==w&&(c(v),s[v.id]=w)}function f(v){const M=a();v.__bindingPointIndex=M;const S=r.createBuffer(),A=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,S),S}function a(){for(let v=0;v<l;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Le("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(v){const M=i[v.id],S=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let w=0,P=S.length;w<P;w++){const x=Array.isArray(S[w])?S[w]:[S[w]];for(let b=0,O=x.length;b<O;b++){const C=x[b];if(d(C,w,b,A)===!0){const F=C.__offset,U=Array.isArray(C.value)?C.value:[C.value];let B=0;for(let k=0;k<U.length;k++){const z=U[k],G=_(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,F+B,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,B),B+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,M,S,A){const w=v.value,P=M+"_"+S;if(A[P]===void 0)return typeof w=="number"||typeof w=="boolean"?A[P]=w:A[P]=w.clone(),!0;{const x=A[P];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return A[P]=w,!0}else if(x.equals(w)===!1)return x.copy(w),!0}return!1}function p(v){const M=v.uniforms;let S=0;const A=16;for(let P=0,x=M.length;P<x;P++){const b=Array.isArray(M[P])?M[P]:[M[P]];for(let O=0,C=b.length;O<C;O++){const F=b[O],U=Array.isArray(F.value)?F.value:[F.value];for(let B=0,k=U.length;B<k;B++){const z=U[B],G=_(z),Q=S%A,Z=Q%G.boundary,he=Q+Z;S+=Z,he!==0&&A-he<G.storage&&(S+=A-he),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=G.storage}}}const w=S%A;return w>0&&(S+=A-w),v.__size=S,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ae("WebGLRenderer: Unsupported uniform value type.",v),M}function g(v){const M=v.target;M.removeEventListener("dispose",g);const S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function m(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:h,update:u,dispose:m}}const mv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let xn=null;function gv(){return xn===null&&(xn=new yl(mv,16,16,Wi,en),xn.name="DFG_LUT",xn.minFilter=bt,xn.magFilter=bt,xn.wrapS=bn,xn.wrapT=bn,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}class _v{constructor(e={}){const{canvas:t=dd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:a=!1,reversedDepthBuffer:c=!1,outputBufferType:d=Qt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=d,g=new Set([fl,dl,ul]),m=new Set([Qt,Cn,Ls,Ds,ll,cl]),v=new Uint32Array(4),M=new Int32Array(4);let S=null,A=null;const w=[],P=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let O=!1;this._outputColorSpace=Nt;let C=0,F=0,U=null,B=-1,k=null;const z=new ht,G=new ht;let Q=null;const Z=new me(0);let he=0,ge=t.width,de=t.height,ke=1,ut=null,ct=null;const K=new ht(0,0,ge,de),ne=new ht(0,0,ge,de);let re=!1;const Ue=new Sl;let Pe=!1,De=!1;const Pt=new Be,Ye=new R,Qe=new ht,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function _t(){return U===null?ke:1}let I=n;function Mt(T,N){return t.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:s,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:a};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${el}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ne,!1),t.addEventListener("webglcontextcreationerror",lt,!1),I===null){const N="webgl2";if(I=Mt(N,T),I===null)throw Mt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Le("WebGLRenderer: "+T.message),T}let je,at,Se,E,y,D,Y,$,q,_e,ie,Ce,Ie,j,ee,ve,ye,ue,Ge,L,se,te,pe;function J(){je=new _0(I),je.init(),se=new av(I,je),at=new c0(I,je,e,se),Se=new rv(I,je),at.reversedDepthBuffer&&c&&Se.buffers.depth.setReversed(!0),E=new y0(I),y=new X_,D=new ov(I,je,Se,y,at,se,E),Y=new g0(b),$=new wp(I),te=new a0(I,$),q=new v0(I,$,E,te),_e=new S0(I,q,$,te,E),ue=new M0(I,at,D),ee=new h0(y),ie=new W_(b,Y,je,at,te,ee),Ce=new fv(b,y),Ie=new Y_,j=new Q_(je),ye=new o0(b,Y,Se,_e,p,h),ve=new sv(b,_e,at),pe=new pv(I,E,at,Se),Ge=new l0(I,je,E),L=new x0(I,je,E),E.programs=ie.programs,b.capabilities=at,b.extensions=je,b.properties=y,b.renderLists=Ie,b.shadowMap=ve,b.state=Se,b.info=E}J(),_!==Qt&&(x=new T0(_,t.width,t.height,i,s));const X=new uv(b,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=je.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=je.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ke},this.setPixelRatio=function(T){T!==void 0&&(ke=T,this.setSize(ge,de,!1))},this.getSize=function(T){return T.set(ge,de)},this.setSize=function(T,N,W=!0){if(X.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}ge=T,de=N,t.width=Math.floor(T*ke),t.height=Math.floor(N*ke),W===!0&&(t.style.width=T+"px",t.style.height=N+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(ge*ke,de*ke).floor()},this.setDrawingBufferSize=function(T,N,W){ge=T,de=N,ke=W,t.width=Math.floor(T*W),t.height=Math.floor(N*W),this.setViewport(0,0,T,N)},this.setEffects=function(T){if(_===Qt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let N=0;N<T.length;N++)if(T[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(z)},this.getViewport=function(T){return T.copy(K)},this.setViewport=function(T,N,W,H){T.isVector4?K.set(T.x,T.y,T.z,T.w):K.set(T,N,W,H),Se.viewport(z.copy(K).multiplyScalar(ke).round())},this.getScissor=function(T){return T.copy(ne)},this.setScissor=function(T,N,W,H){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,N,W,H),Se.scissor(G.copy(ne).multiplyScalar(ke).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(T){Se.setScissorTest(re=T)},this.setOpaqueSort=function(T){ut=T},this.setTransparentSort=function(T){ct=T},this.getClearColor=function(T){return T.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,W=!0){let H=0;if(T){let V=!1;if(U!==null){const le=U.texture.format;V=g.has(le)}if(V){const le=U.texture.type,fe=m.has(le),ce=ye.getClearColor(),Me=ye.getClearAlpha(),Ee=ce.r,Fe=ce.g,He=ce.b;fe?(v[0]=Ee,v[1]=Fe,v[2]=He,v[3]=Me,I.clearBufferuiv(I.COLOR,0,v)):(M[0]=Ee,M[1]=Fe,M[2]=He,M[3]=Me,I.clearBufferiv(I.COLOR,0,M))}else H|=I.COLOR_BUFFER_BIT}N&&(H|=I.DEPTH_BUFFER_BIT),W&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",lt,!1),ye.dispose(),Ie.dispose(),j.dispose(),y.dispose(),Y.dispose(),_e.dispose(),te.dispose(),pe.dispose(),ie.dispose(),X.dispose(),X.removeEventListener("sessionstart",Fl),X.removeEventListener("sessionend",Ul),si.stop()};function xe(T){T.preventDefault(),Vr("WebGLRenderer: Context Lost."),O=!0}function Ne(){Vr("WebGLRenderer: Context Restored."),O=!1;const T=E.autoReset,N=ve.enabled,W=ve.autoUpdate,H=ve.needsUpdate,V=ve.type;J(),E.autoReset=T,ve.enabled=N,ve.autoUpdate=W,ve.needsUpdate=H,ve.type=V}function lt(T){Le("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const N=T.target;N.removeEventListener("dispose",et),Nn(N)}function Nn(T){Fn(T),y.remove(T)}function Fn(T){const N=y.get(T).programs;N!==void 0&&(N.forEach(function(W){ie.releaseProgram(W)}),T.isShaderMaterial&&ie.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,W,H,V,le){N===null&&(N=rt);const fe=V.isMesh&&V.matrixWorld.determinant()<0,ce=Su(T,N,W,H,V);Se.setMaterial(H,fe);let Me=W.index,Ee=1;if(H.wireframe===!0){if(Me=q.getWireframeAttribute(W),Me===void 0)return;Ee=2}const Fe=W.drawRange,He=W.attributes.position;let Re=Fe.start*Ee,it=(Fe.start+Fe.count)*Ee;le!==null&&(Re=Math.max(Re,le.start*Ee),it=Math.min(it,(le.start+le.count)*Ee)),Me!==null?(Re=Math.max(Re,0),it=Math.min(it,Me.count)):He!=null&&(Re=Math.max(Re,0),it=Math.min(it,He.count));const vt=it-Re;if(vt<0||vt===1/0)return;te.setup(V,H,ce,W,Me);let mt,st=Ge;if(Me!==null&&(mt=$.get(Me),st=L,st.setIndex(mt)),V.isMesh)H.wireframe===!0?(Se.setLineWidth(H.wireframeLinewidth*_t()),st.setMode(I.LINES)):st.setMode(I.TRIANGLES);else if(V.isLine){let kt=H.linewidth;kt===void 0&&(kt=1),Se.setLineWidth(kt*_t()),V.isLineSegments?st.setMode(I.LINES):V.isLineLoop?st.setMode(I.LINE_LOOP):st.setMode(I.LINE_STRIP)}else V.isPoints?st.setMode(I.POINTS):V.isSprite&&st.setMode(I.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Gr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))st.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const kt=V._multiDrawStarts,be=V._multiDrawCounts,Kt=V._multiDrawCount,Ke=Me?$.get(Me).bytesPerElement:1,cn=y.get(H).currentProgram.getUniforms();for(let _n=0;_n<Kt;_n++)cn.setValue(I,"_gl_DrawID",_n),st.render(kt[_n]/Ke,be[_n])}else if(V.isInstancedMesh)st.renderInstances(Re,vt,V.count);else if(W.isInstancedBufferGeometry){const kt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,be=Math.min(W.instanceCount,kt);st.renderInstances(Re,vt,be)}else st.render(Re,vt)};function Nl(T,N,W){T.transparent===!0&&T.side===Jt&&T.forceSinglePass===!1?(T.side=Xt,T.needsUpdate=!0,Zs(T,N,W),T.side=Wn,T.needsUpdate=!0,Zs(T,N,W),T.side=Jt):Zs(T,N,W)}this.compile=function(T,N,W=null){W===null&&(W=T),A=j.get(W),A.init(N),P.push(A),W.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),T!==W&&T.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights();const H=new Set;return T.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const le=V.material;if(le)if(Array.isArray(le))for(let fe=0;fe<le.length;fe++){const ce=le[fe];Nl(ce,W,V),H.add(ce)}else Nl(le,W,V),H.add(le)}),A=P.pop(),H},this.compileAsync=function(T,N,W=null){const H=this.compile(T,N,W);return new Promise(V=>{function le(){if(H.forEach(function(fe){y.get(fe).currentProgram.isReady()&&H.delete(fe)}),H.size===0){V(T);return}setTimeout(le,10)}je.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Qr=null;function Mu(T){Qr&&Qr(T)}function Fl(){si.stop()}function Ul(){si.start()}const si=new uu;si.setAnimationLoop(Mu),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(T){Qr=T,X.setAnimationLoop(T),T===null?si.stop():si.start()},X.addEventListener("sessionstart",Fl),X.addEventListener("sessionend",Ul),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){Le("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;const W=X.enabled===!0&&X.isPresenting===!0,H=x!==null&&(U===null||W)&&x.begin(b,U);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,N,U),A=j.get(T,P.length),A.init(N),P.push(A),Pt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ue.setFromProjectionMatrix(Pt,wn,N.reversedDepth),De=this.localClippingEnabled,Pe=ee.init(this.clippingPlanes,De),S=Ie.get(T,w.length),S.init(),w.push(S),X.enabled===!0&&X.isPresenting===!0){const fe=b.xr.getDepthSensingMesh();fe!==null&&eo(fe,N,-1/0,b.sortObjects)}eo(T,N,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(ut,ct),Ve=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Ve&&ye.addToRenderList(S,T),this.info.render.frame++,Pe===!0&&ee.beginShadows();const V=A.state.shadowsArray;if(ve.render(V,T,N),Pe===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&x.hasRenderPass())===!1){const fe=S.opaque,ce=S.transmissive;if(A.setupLights(),N.isArrayCamera){const Me=N.cameras;if(ce.length>0)for(let Ee=0,Fe=Me.length;Ee<Fe;Ee++){const He=Me[Ee];Bl(fe,ce,T,He)}Ve&&ye.render(T);for(let Ee=0,Fe=Me.length;Ee<Fe;Ee++){const He=Me[Ee];Ol(S,T,He,He.viewport)}}else ce.length>0&&Bl(fe,ce,T,N),Ve&&ye.render(T),Ol(S,T,N)}U!==null&&F===0&&(D.updateMultisampleRenderTarget(U),D.updateRenderTargetMipmap(U)),H&&x.end(b),T.isScene===!0&&T.onAfterRender(b,T,N),te.resetDefaultState(),B=-1,k=null,P.pop(),P.length>0?(A=P[P.length-1],Pe===!0&&ee.setGlobalState(b.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?S=w[w.length-1]:S=null};function eo(T,N,W,H){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ue.intersectsSprite(T)){H&&Qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Pt);const fe=_e.update(T),ce=T.material;ce.visible&&S.push(T,fe,ce,W,Qe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ue.intersectsObject(T))){const fe=_e.update(T),ce=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Qe.copy(T.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Qe.copy(fe.boundingSphere.center)),Qe.applyMatrix4(T.matrixWorld).applyMatrix4(Pt)),Array.isArray(ce)){const Me=fe.groups;for(let Ee=0,Fe=Me.length;Ee<Fe;Ee++){const He=Me[Ee],Re=ce[He.materialIndex];Re&&Re.visible&&S.push(T,fe,Re,W,Qe.z,He)}}else ce.visible&&S.push(T,fe,ce,W,Qe.z,null)}}const le=T.children;for(let fe=0,ce=le.length;fe<ce;fe++)eo(le[fe],N,W,H)}function Ol(T,N,W,H){const{opaque:V,transmissive:le,transparent:fe}=T;A.setupLightsView(W),Pe===!0&&ee.setGlobalState(b.clippingPlanes,W),H&&Se.viewport(z.copy(H)),V.length>0&&$s(V,N,W),le.length>0&&$s(le,N,W),fe.length>0&&$s(fe,N,W),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Bl(T,N,W,H){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[H.id]===void 0){const Re=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[H.id]=new Yt(1,1,{generateMipmaps:!0,type:Re?en:Qt,minFilter:Tn,samples:Math.max(4,at.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const le=A.state.transmissionRenderTarget[H.id],fe=H.viewport||z;le.setSize(fe.z*b.transmissionResolutionScale,fe.w*b.transmissionResolutionScale);const ce=b.getRenderTarget(),Me=b.getActiveCubeFace(),Ee=b.getActiveMipmapLevel();b.setRenderTarget(le),b.getClearColor(Z),he=b.getClearAlpha(),he<1&&b.setClearColor(16777215,.5),b.clear(),Ve&&ye.render(W);const Fe=b.toneMapping;b.toneMapping=An;const He=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),A.setupLightsView(H),Pe===!0&&ee.setGlobalState(b.clippingPlanes,H),$s(T,W,H),D.updateMultisampleRenderTarget(le),D.updateRenderTargetMipmap(le),je.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let it=0,vt=N.length;it<vt;it++){const mt=N[it],{object:st,geometry:kt,material:be,group:Kt}=mt;if(be.side===Jt&&st.layers.test(H.layers)){const Ke=be.side;be.side=Xt,be.needsUpdate=!0,kl(st,W,H,kt,be,Kt),be.side=Ke,be.needsUpdate=!0,Re=!0}}Re===!0&&(D.updateMultisampleRenderTarget(le),D.updateRenderTargetMipmap(le))}b.setRenderTarget(ce,Me,Ee),b.setClearColor(Z,he),He!==void 0&&(H.viewport=He),b.toneMapping=Fe}function $s(T,N,W){const H=N.isScene===!0?N.overrideMaterial:null;for(let V=0,le=T.length;V<le;V++){const fe=T[V],{object:ce,geometry:Me,group:Ee}=fe;let Fe=fe.material;Fe.allowOverride===!0&&H!==null&&(Fe=H),ce.layers.test(W.layers)&&kl(ce,N,W,Me,Fe,Ee)}}function kl(T,N,W,H,V,le){T.onBeforeRender(b,N,W,H,V,le),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(b,N,W,H,T,le),V.transparent===!0&&V.side===Jt&&V.forceSinglePass===!1?(V.side=Xt,V.needsUpdate=!0,b.renderBufferDirect(W,N,H,V,T,le),V.side=Wn,V.needsUpdate=!0,b.renderBufferDirect(W,N,H,V,T,le),V.side=Jt):b.renderBufferDirect(W,N,H,V,T,le),T.onAfterRender(b,N,W,H,V,le)}function Zs(T,N,W){N.isScene!==!0&&(N=rt);const H=y.get(T),V=A.state.lights,le=A.state.shadowsArray,fe=V.state.version,ce=ie.getParameters(T,V.state,le,N,W),Me=ie.getProgramCacheKey(ce);let Ee=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?N.environment:null,H.fog=N.fog;const Fe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=Y.get(T.envMap||H.environment,Fe),H.envMapRotation=H.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ee===void 0&&(T.addEventListener("dispose",et),Ee=new Map,H.programs=Ee);let He=Ee.get(Me);if(He!==void 0){if(H.currentProgram===He&&H.lightsStateVersion===fe)return Vl(T,ce),He}else ce.uniforms=ie.getUniforms(T),T.onBeforeCompile(ce,b),He=ie.acquireProgram(ce,Me),Ee.set(Me,He),H.uniforms=ce.uniforms;const Re=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=ee.uniform),Vl(T,ce),H.needsLights=Tu(T),H.lightsStateVersion=fe,H.needsLights&&(Re.ambientLightColor.value=V.state.ambient,Re.lightProbe.value=V.state.probe,Re.directionalLights.value=V.state.directional,Re.directionalLightShadows.value=V.state.directionalShadow,Re.spotLights.value=V.state.spot,Re.spotLightShadows.value=V.state.spotShadow,Re.rectAreaLights.value=V.state.rectArea,Re.ltc_1.value=V.state.rectAreaLTC1,Re.ltc_2.value=V.state.rectAreaLTC2,Re.pointLights.value=V.state.point,Re.pointLightShadows.value=V.state.pointShadow,Re.hemisphereLights.value=V.state.hemi,Re.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Re.spotLightMatrix.value=V.state.spotLightMatrix,Re.spotLightMap.value=V.state.spotLightMap,Re.pointShadowMatrix.value=V.state.pointShadowMatrix),H.currentProgram=He,H.uniformsList=null,He}function zl(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Ur.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function Vl(T,N){const W=y.get(T);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function Su(T,N,W,H,V){N.isScene!==!0&&(N=rt),D.resetTextureUnits();const le=N.fog,fe=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?N.environment:null,ce=U===null?b.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:qt,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ee=Y.get(H.envMap||fe,Me),Fe=H.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,He=!!W.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Re=!!W.morphAttributes.position,it=!!W.morphAttributes.normal,vt=!!W.morphAttributes.color;let mt=An;H.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(mt=b.toneMapping);const st=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,kt=st!==void 0?st.length:0,be=y.get(H),Kt=A.state.lights;if(Pe===!0&&(De===!0||T!==k)){const It=T===k&&H.id===B;ee.setState(H,T,It)}let Ke=!1;H.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Kt.state.version||be.outputColorSpace!==ce||V.isBatchedMesh&&be.batching===!1||!V.isBatchedMesh&&be.batching===!0||V.isBatchedMesh&&be.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&be.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&be.instancing===!1||!V.isInstancedMesh&&be.instancing===!0||V.isSkinnedMesh&&be.skinning===!1||!V.isSkinnedMesh&&be.skinning===!0||V.isInstancedMesh&&be.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&be.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&be.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&be.instancingMorph===!1&&V.morphTexture!==null||be.envMap!==Ee||H.fog===!0&&be.fog!==le||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ee.numPlanes||be.numIntersection!==ee.numIntersection)||be.vertexAlphas!==Fe||be.vertexTangents!==He||be.morphTargets!==Re||be.morphNormals!==it||be.morphColors!==vt||be.toneMapping!==mt||be.morphTargetsCount!==kt)&&(Ke=!0):(Ke=!0,be.__version=H.version);let cn=be.currentProgram;Ke===!0&&(cn=Zs(H,N,V));let _n=!1,ri=!1,yi=!1;const ot=cn.getUniforms(),Bt=be.uniforms;if(Se.useProgram(cn.program)&&(_n=!0,ri=!0,yi=!0),H.id!==B&&(B=H.id,ri=!0),_n||k!==T){Se.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ot.setValue(I,"projectionMatrix",T.projectionMatrix),ot.setValue(I,"viewMatrix",T.matrixWorldInverse);const Yn=ot.map.cameraPosition;Yn!==void 0&&Yn.setValue(I,Ye.setFromMatrixPosition(T.matrixWorld)),at.logarithmicDepthBuffer&&ot.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ot.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),k!==T&&(k=T,ri=!0,yi=!0)}if(be.needsLights&&(Kt.state.directionalShadowMap.length>0&&ot.setValue(I,"directionalShadowMap",Kt.state.directionalShadowMap,D),Kt.state.spotShadowMap.length>0&&ot.setValue(I,"spotShadowMap",Kt.state.spotShadowMap,D),Kt.state.pointShadowMap.length>0&&ot.setValue(I,"pointShadowMap",Kt.state.pointShadowMap,D)),V.isSkinnedMesh){ot.setOptional(I,V,"bindMatrix"),ot.setOptional(I,V,"bindMatrixInverse");const It=V.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ot.setValue(I,"boneTexture",It.boneTexture,D))}V.isBatchedMesh&&(ot.setOptional(I,V,"batchingTexture"),ot.setValue(I,"batchingTexture",V._matricesTexture,D),ot.setOptional(I,V,"batchingIdTexture"),ot.setValue(I,"batchingIdTexture",V._indirectTexture,D),ot.setOptional(I,V,"batchingColorTexture"),V._colorsTexture!==null&&ot.setValue(I,"batchingColorTexture",V._colorsTexture,D));const qn=W.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&ue.update(V,W,cn),(ri||be.receiveShadow!==V.receiveShadow)&&(be.receiveShadow=V.receiveShadow,ot.setValue(I,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&N.environment!==null&&(Bt.envMapIntensity.value=N.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=gv()),ri&&(ot.setValue(I,"toneMappingExposure",b.toneMappingExposure),be.needsLights&&bu(Bt,yi),le&&H.fog===!0&&Ce.refreshFogUniforms(Bt,le),Ce.refreshMaterialUniforms(Bt,H,ke,de,A.state.transmissionRenderTarget[T.id]),Ur.upload(I,zl(be),Bt,D)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ur.upload(I,zl(be),Bt,D),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ot.setValue(I,"center",V.center),ot.setValue(I,"modelViewMatrix",V.modelViewMatrix),ot.setValue(I,"normalMatrix",V.normalMatrix),ot.setValue(I,"modelMatrix",V.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const It=H.uniformsGroups;for(let Yn=0,Mi=It.length;Yn<Mi;Yn++){const Gl=It[Yn];pe.update(Gl,cn),pe.bind(Gl,cn)}}return cn}function bu(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Tu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(T,N,W){const H=y.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),y.get(T.texture).__webglTexture=N,y.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:W,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){const W=y.get(T);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const wu=I.createFramebuffer();this.setRenderTarget=function(T,N=0,W=0){U=T,C=N,F=W;let H=null,V=!1,le=!1;if(T){const ce=y.get(T);if(ce.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(I.FRAMEBUFFER,ce.__webglFramebuffer),z.copy(T.viewport),G.copy(T.scissor),Q=T.scissorTest,Se.viewport(z),Se.scissor(G),Se.setScissorTest(Q),B=-1;return}else if(ce.__webglFramebuffer===void 0)D.setupRenderTarget(T);else if(ce.__hasExternalTextures)D.rebindTextures(T,y.get(T.texture).__webglTexture,y.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(ce.__boundDepthTexture!==Fe){if(Fe!==null&&y.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(T)}}const Me=T.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(le=!0);const Ee=y.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ee[N])?H=Ee[N][W]:H=Ee[N],V=!0):T.samples>0&&D.useMultisampledRTT(T)===!1?H=y.get(T).__webglMultisampledFramebuffer:Array.isArray(Ee)?H=Ee[W]:H=Ee,z.copy(T.viewport),G.copy(T.scissor),Q=T.scissorTest}else z.copy(K).multiplyScalar(ke).floor(),G.copy(ne).multiplyScalar(ke).floor(),Q=re;if(W!==0&&(H=wu),Se.bindFramebuffer(I.FRAMEBUFFER,H)&&Se.drawBuffers(T,H),Se.viewport(z),Se.scissor(G),Se.setScissorTest(Q),V){const ce=y.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,ce.__webglTexture,W)}else if(le){const ce=N;for(let Me=0;Me<T.textures.length;Me++){const Ee=y.get(T.textures[Me]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Me,Ee.__webglTexture,W,ce)}}else if(T!==null&&W!==0){const ce=y.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ce.__webglTexture,W)}B=-1},this.readRenderTargetPixels=function(T,N,W,H,V,le,fe,ce=0){if(!(T&&T.isWebGLRenderTarget)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=y.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){Se.bindFramebuffer(I.FRAMEBUFFER,Me);try{const Ee=T.textures[ce],Fe=Ee.format,He=Ee.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ce),!at.textureFormatReadable(Fe)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(He)){Le("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-H&&W>=0&&W<=T.height-V&&I.readPixels(N,W,H,V,se.convert(Fe),se.convert(He),le)}finally{const Ee=U!==null?y.get(U).__webglFramebuffer:null;Se.bindFramebuffer(I.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(T,N,W,H,V,le,fe,ce=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=y.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me)if(N>=0&&N<=T.width-H&&W>=0&&W<=T.height-V){Se.bindFramebuffer(I.FRAMEBUFFER,Me);const Ee=T.textures[ce],Fe=Ee.format,He=Ee.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ce),!at.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,le.byteLength,I.STREAM_READ),I.readPixels(N,W,H,V,se.convert(Fe),se.convert(He),0);const it=U!==null?y.get(U).__webglFramebuffer:null;Se.bindFramebuffer(I.FRAMEBUFFER,it);const vt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await fd(I,vt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,le),I.deleteBuffer(Re),I.deleteSync(vt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,W=0){const H=Math.pow(2,-W),V=Math.floor(T.image.width*H),le=Math.floor(T.image.height*H),fe=N!==null?N.x:0,ce=N!==null?N.y:0;D.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,fe,ce,V,le),Se.unbindTexture()};const Eu=I.createFramebuffer(),Au=I.createFramebuffer();this.copyTextureToTexture=function(T,N,W=null,H=null,V=0,le=0){let fe,ce,Me,Ee,Fe,He,Re,it,vt;const mt=T.isCompressedTexture?T.mipmaps[le]:T.image;if(W!==null)fe=W.max.x-W.min.x,ce=W.max.y-W.min.y,Me=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,Fe=W.min.y,He=W.isBox3?W.min.z:0;else{const Bt=Math.pow(2,-V);fe=Math.floor(mt.width*Bt),ce=Math.floor(mt.height*Bt),T.isDataArrayTexture?Me=mt.depth:T.isData3DTexture?Me=Math.floor(mt.depth*Bt):Me=1,Ee=0,Fe=0,He=0}H!==null?(Re=H.x,it=H.y,vt=H.z):(Re=0,it=0,vt=0);const st=se.convert(N.format),kt=se.convert(N.type);let be;N.isData3DTexture?(D.setTexture3D(N,0),be=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(D.setTexture2DArray(N,0),be=I.TEXTURE_2D_ARRAY):(D.setTexture2D(N,0),be=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const Kt=I.getParameter(I.UNPACK_ROW_LENGTH),Ke=I.getParameter(I.UNPACK_IMAGE_HEIGHT),cn=I.getParameter(I.UNPACK_SKIP_PIXELS),_n=I.getParameter(I.UNPACK_SKIP_ROWS),ri=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,mt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,mt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ee),I.pixelStorei(I.UNPACK_SKIP_ROWS,Fe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,He);const yi=T.isDataArrayTexture||T.isData3DTexture,ot=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){const Bt=y.get(T),qn=y.get(N),It=y.get(Bt.__renderTarget),Yn=y.get(qn.__renderTarget);Se.bindFramebuffer(I.READ_FRAMEBUFFER,It.__webglFramebuffer),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let Mi=0;Mi<Me;Mi++)yi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(T).__webglTexture,V,He+Mi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,y.get(N).__webglTexture,le,vt+Mi)),I.blitFramebuffer(Ee,Fe,fe,ce,Re,it,fe,ce,I.DEPTH_BUFFER_BIT,I.NEAREST);Se.bindFramebuffer(I.READ_FRAMEBUFFER,null),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(V!==0||T.isRenderTargetTexture||y.has(T)){const Bt=y.get(T),qn=y.get(N);Se.bindFramebuffer(I.READ_FRAMEBUFFER,Eu),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,Au);for(let It=0;It<Me;It++)yi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Bt.__webglTexture,V,He+It):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Bt.__webglTexture,V),ot?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,qn.__webglTexture,le,vt+It):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,qn.__webglTexture,le),V!==0?I.blitFramebuffer(Ee,Fe,fe,ce,Re,it,fe,ce,I.COLOR_BUFFER_BIT,I.NEAREST):ot?I.copyTexSubImage3D(be,le,Re,it,vt+It,Ee,Fe,fe,ce):I.copyTexSubImage2D(be,le,Re,it,Ee,Fe,fe,ce);Se.bindFramebuffer(I.READ_FRAMEBUFFER,null),Se.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ot?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(be,le,Re,it,vt,fe,ce,Me,st,kt,mt.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(be,le,Re,it,vt,fe,ce,Me,st,mt.data):I.texSubImage3D(be,le,Re,it,vt,fe,ce,Me,st,kt,mt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,le,Re,it,fe,ce,st,kt,mt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,le,Re,it,mt.width,mt.height,st,mt.data):I.texSubImage2D(I.TEXTURE_2D,le,Re,it,fe,ce,st,kt,mt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Kt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ke),I.pixelStorei(I.UNPACK_SKIP_PIXELS,cn),I.pixelStorei(I.UNPACK_SKIP_ROWS,_n),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ri),le===0&&N.generateMipmaps&&I.generateMipmap(be),Se.unbindTexture()},this.initRenderTarget=function(T){y.get(T).__webglFramebuffer===void 0&&D.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?D.setTextureCube(T,0):T.isData3DTexture?D.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?D.setTexture2DArray(T,0):D.setTexture2D(T,0),Se.unbindTexture()},this.resetState=function(){C=0,F=0,U=null,Se.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class vv{constructor(){this.items=[],this.elapsed=0,this.delta=0,this.last=performance.now()}add(e,t,n){this.items.push({name:e,priority:t,fn:n}),this.items.sort((i,s)=>i.priority-s.priority)}tick(e=performance.now()){const t=(e-this.last)/1e3;this.last=e,this.delta=Math.min(t,.05),this.elapsed+=this.delta;for(const n of this.items)n.fn(this.delta,this.elapsed)}}const uh={KeyW:"forward",ArrowUp:"forward",KeyS:"backward",ArrowDown:"backward",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",ShiftLeft:"handbrake",ShiftRight:"handbrake",KeyX:"boost",ControlLeft:"brake",ControlRight:"brake",KeyB:"brake",Space:"jump",KeyE:"interact",Enter:"interact",KeyR:"respawn",KeyM:"map",Escape:"menu",KeyH:"honk",KeyP:"potato"};class xv{constructor(e){this.canvas=e,this.actions={forward:!1,backward:!1,left:!1,right:!1,boost:!1,handbrake:!1,brake:!1,jump:!1,interact:!1,respawn:!1,map:!1,menu:!1,honk:!1,potato:!1},this.pressed=new Set,this.pointer={dragging:!1,lastX:0,lastY:0,orbitX:0,orbitY:0,zoom:1},this.joystick={x:0,y:0},this.mode="keyboard",this.enabled=!0,this.setupKeyboard(),this.setupPointer(),this.setupTouch()}setupKeyboard(){window.addEventListener("keydown",e=>{const t=uh[e.code];t&&(e.preventDefault(),this.actions[t]||this.pressed.add(t),this.actions[t]=!0,this.mode="keyboard")}),window.addEventListener("keyup",e=>{const t=uh[e.code];t&&(e.preventDefault(),this.actions[t]=!1)})}setupPointer(){this.canvas.addEventListener("pointerdown",t=>{this.pointer.dragging=!0,this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.canvas.setPointerCapture(t.pointerId)}),this.canvas.addEventListener("pointermove",t=>{if(!this.pointer.dragging)return;const n=t.clientX-this.pointer.lastX,i=t.clientY-this.pointer.lastY;this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.pointer.orbitX+=n*.006,this.pointer.orbitY=Math.max(-.52,Math.min(.42,this.pointer.orbitY+i*.004)),this.mode=t.pointerType==="touch"?"touch":"pointer"});const e=t=>{this.pointer.dragging=!1,this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)};this.canvas.addEventListener("pointerup",e),this.canvas.addEventListener("pointercancel",e),window.addEventListener("wheel",t=>{this.pointer.zoom=Math.max(.7,Math.min(1.55,this.pointer.zoom+Math.sign(t.deltaY)*.08))},{passive:!0})}setupTouch(){const e=document.getElementById("touch-stick"),t=document.getElementById("touch-knob"),n=document.getElementById("touch-boost"),i=document.getElementById("touch-jump"),s=document.getElementById("touch-action");if(!e||!t||!n||!i||!s)return;let o=null,l={x:0,y:0};const h=(a,c)=>{const d=a-l.x,p=c-l.y,_=54,g=Math.max(1,Math.hypot(d,p)),m=Math.min(1,_/g),v=d*m,M=p*m;this.joystick.x=v/_,this.joystick.y=M/_,t.style.transform=`translate(calc(-50% + ${v}px), calc(-50% + ${M}px))`,this.mode="touch"};e.addEventListener("pointerdown",a=>{a.preventDefault(),o=a.pointerId,e.setPointerCapture(o);const c=e.getBoundingClientRect();l={x:c.left+c.width/2,y:c.top+c.height/2},h(a.clientX,a.clientY)}),e.addEventListener("pointermove",a=>{a.pointerId===o&&(a.preventDefault(),h(a.clientX,a.clientY))});const u=a=>{a.pointerId===o&&(o=null,this.joystick.x=0,this.joystick.y=0,t.style.transform="translate(-50%, -50%)")};e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u);const f=(a,c)=>{a.addEventListener("pointerdown",p=>{p.preventDefault(),this.actions[c]=!0,this.pressed.add(c),this.mode="touch"});const d=()=>{this.actions[c]=!1};a.addEventListener("pointerup",d),a.addEventListener("pointercancel",d),a.addEventListener("pointerleave",d)};f(n,"boost"),f(i,"jump"),s.addEventListener("click",()=>{this.pressed.add("interact"),this.actions.interact=!0,requestAnimationFrame(()=>{this.actions.interact=!1})})}updateGamepad(){const e=navigator.getGamepads?.()[0];if(!e)return;const t=Math.abs(e.axes[0])>.15?e.axes[0]:0,n=Math.abs(e.axes[1])>.15?e.axes[1]:0;this.joystick.x=t,this.joystick.y=n,this.actions.forward=n<-.25||e.buttons[7]?.pressed,this.actions.backward=n>.25||e.buttons[6]?.pressed,this.actions.left=t<-.25,this.actions.right=t>.25,this.actions.boost=!!e.buttons[1]?.pressed,this.actions.handbrake=!!e.buttons[5]?.pressed,this.actions.jump=!!e.buttons[3]?.pressed,this.actions.brake=!!e.buttons[2]?.pressed,e.buttons[0]?.pressed&&this.pressed.add("interact"),e.buttons[9]?.pressed&&this.pressed.add("menu"),e.buttons[8]?.pressed&&this.pressed.add("respawn"),e.buttons[4]?.pressed&&this.pressed.add("potato"),this.mode="gamepad"}update(){this.updateGamepad()}consume(e){const t=this.pressed.has(e);return this.pressed.delete(e),t}clearTransient(){this.pressed.clear()}}var ms=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Vo={};var dh;function yv(){return dh||(dh=1,(function(r){(function(){var e=function(){this.init()};e.prototype={init:function(){var a=this||t;return a._counter=1e3,a._html5AudioPool=[],a.html5PoolSize=10,a._codecs={},a._howls=[],a._muted=!1,a._volume=1,a._canPlayEvent="canplaythrough",a._navigator=typeof window<"u"&&window.navigator?window.navigator:null,a.masterGain=null,a.noAudio=!1,a.usingWebAudio=!0,a.autoSuspend=!0,a.ctx=null,a.autoUnlock=!0,a._setup(),a},volume:function(a){var c=this||t;if(a=parseFloat(a),c.ctx||f(),typeof a<"u"&&a>=0&&a<=1){if(c._volume=a,c._muted)return c;c.usingWebAudio&&c.masterGain.gain.setValueAtTime(a,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var p=c._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=c._howls[d]._soundById(p[_]);g&&g._node&&(g._node.volume=g._volume*a)}return c}return c._volume},mute:function(a){var c=this||t;c.ctx||f(),c._muted=a,c.usingWebAudio&&c.masterGain.gain.setValueAtTime(a?0:c._volume,t.ctx.currentTime);for(var d=0;d<c._howls.length;d++)if(!c._howls[d]._webAudio)for(var p=c._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=c._howls[d]._soundById(p[_]);g&&g._node&&(g._node.muted=a?!0:g._muted)}return c},stop:function(){for(var a=this||t,c=0;c<a._howls.length;c++)a._howls[c].stop();return a},unload:function(){for(var a=this||t,c=a._howls.length-1;c>=0;c--)a._howls[c].unload();return a.usingWebAudio&&a.ctx&&typeof a.ctx.close<"u"&&(a.ctx.close(),a.ctx=null,f()),a},codecs:function(a){return(this||t)._codecs[a.replace(/^x-/,"")]},_setup:function(){var a=this||t;if(a.state=a.ctx&&a.ctx.state||"suspended",a._autoSuspend(),!a.usingWebAudio)if(typeof Audio<"u")try{var c=new Audio;typeof c.oncanplaythrough>"u"&&(a._canPlayEvent="canplay")}catch{a.noAudio=!0}else a.noAudio=!0;try{var c=new Audio;c.muted&&(a.noAudio=!0)}catch{}return a.noAudio||a._setupCodecs(),a},_setupCodecs:function(){var a=this||t,c=null;try{c=typeof Audio<"u"?new Audio:null}catch{return a}if(!c||typeof c.canPlayType!="function")return a;var d=c.canPlayType("audio/mpeg;").replace(/^no$/,""),p=a._navigator?a._navigator.userAgent:"",_=p.match(/OPR\/(\d+)/g),g=_&&parseInt(_[0].split("/")[1],10)<33,m=p.indexOf("Safari")!==-1&&p.indexOf("Chrome")===-1,v=p.match(/Version\/(.*?) /),M=m&&v&&parseInt(v[1],10)<15;return a._codecs={mp3:!!(!g&&(d||c.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(c.canPlayType('audio/wav; codecs="1"')||c.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!c.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!c.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(c.canPlayType("audio/x-m4a;")||c.canPlayType("audio/m4a;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(c.canPlayType("audio/x-m4b;")||c.canPlayType("audio/m4b;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(c.canPlayType("audio/x-mp4;")||c.canPlayType("audio/mp4;")||c.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!M&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!M&&c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!c.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(c.canPlayType("audio/x-flac;")||c.canPlayType("audio/flac;")).replace(/^no$/,"")},a},_unlockAudio:function(){var a=this||t;if(!(a._audioUnlocked||!a.ctx)){a._audioUnlocked=!1,a.autoUnlock=!1,!a._mobileUnloaded&&a.ctx.sampleRate!==44100&&(a._mobileUnloaded=!0,a.unload()),a._scratchBuffer=a.ctx.createBuffer(1,1,22050);var c=function(d){for(;a._html5AudioPool.length<a.html5PoolSize;)try{var p=new Audio;p._unlocked=!0,a._releaseHtml5Audio(p)}catch{a.noAudio=!0;break}for(var _=0;_<a._howls.length;_++)if(!a._howls[_]._webAudio)for(var g=a._howls[_]._getSoundIds(),m=0;m<g.length;m++){var v=a._howls[_]._soundById(g[m]);v&&v._node&&!v._node._unlocked&&(v._node._unlocked=!0,v._node.load())}a._autoResume();var M=a.ctx.createBufferSource();M.buffer=a._scratchBuffer,M.connect(a.ctx.destination),typeof M.start>"u"?M.noteOn(0):M.start(0),typeof a.ctx.resume=="function"&&a.ctx.resume(),M.onended=function(){M.disconnect(0),a._audioUnlocked=!0,document.removeEventListener("touchstart",c,!0),document.removeEventListener("touchend",c,!0),document.removeEventListener("click",c,!0),document.removeEventListener("keydown",c,!0);for(var S=0;S<a._howls.length;S++)a._howls[S]._emit("unlock")}};return document.addEventListener("touchstart",c,!0),document.addEventListener("touchend",c,!0),document.addEventListener("click",c,!0),document.addEventListener("keydown",c,!0),a}},_obtainHtml5Audio:function(){var a=this||t;if(a._html5AudioPool.length)return a._html5AudioPool.pop();var c=new Audio().play();return c&&typeof Promise<"u"&&(c instanceof Promise||typeof c.then=="function")&&c.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(a){var c=this||t;return a._unlocked&&c._html5AudioPool.push(a),c},_autoSuspend:function(){var a=this;if(!(!a.autoSuspend||!a.ctx||typeof a.ctx.suspend>"u"||!t.usingWebAudio)){for(var c=0;c<a._howls.length;c++)if(a._howls[c]._webAudio){for(var d=0;d<a._howls[c]._sounds.length;d++)if(!a._howls[c]._sounds[d]._paused)return a}return a._suspendTimer&&clearTimeout(a._suspendTimer),a._suspendTimer=setTimeout(function(){if(a.autoSuspend){a._suspendTimer=null,a.state="suspending";var p=function(){a.state="suspended",a._resumeAfterSuspend&&(delete a._resumeAfterSuspend,a._autoResume())};a.ctx.suspend().then(p,p)}},3e4),a}},_autoResume:function(){var a=this;if(!(!a.ctx||typeof a.ctx.resume>"u"||!t.usingWebAudio))return a.state==="running"&&a.ctx.state!=="interrupted"&&a._suspendTimer?(clearTimeout(a._suspendTimer),a._suspendTimer=null):a.state==="suspended"||a.state==="running"&&a.ctx.state==="interrupted"?(a.ctx.resume().then(function(){a.state="running";for(var c=0;c<a._howls.length;c++)a._howls[c]._emit("resume")}),a._suspendTimer&&(clearTimeout(a._suspendTimer),a._suspendTimer=null)):a.state==="suspending"&&(a._resumeAfterSuspend=!0),a}};var t=new e,n=function(a){var c=this;if(!a.src||a.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}c.init(a)};n.prototype={init:function(a){var c=this;return t.ctx||f(),c._autoplay=a.autoplay||!1,c._format=typeof a.format!="string"?a.format:[a.format],c._html5=a.html5||!1,c._muted=a.mute||!1,c._loop=a.loop||!1,c._pool=a.pool||5,c._preload=typeof a.preload=="boolean"||a.preload==="metadata"?a.preload:!0,c._rate=a.rate||1,c._sprite=a.sprite||{},c._src=typeof a.src!="string"?a.src:[a.src],c._volume=a.volume!==void 0?a.volume:1,c._xhr={method:a.xhr&&a.xhr.method?a.xhr.method:"GET",headers:a.xhr&&a.xhr.headers?a.xhr.headers:null,withCredentials:a.xhr&&a.xhr.withCredentials?a.xhr.withCredentials:!1},c._duration=0,c._state="unloaded",c._sounds=[],c._endTimers={},c._queue=[],c._playLock=!1,c._onend=a.onend?[{fn:a.onend}]:[],c._onfade=a.onfade?[{fn:a.onfade}]:[],c._onload=a.onload?[{fn:a.onload}]:[],c._onloaderror=a.onloaderror?[{fn:a.onloaderror}]:[],c._onplayerror=a.onplayerror?[{fn:a.onplayerror}]:[],c._onpause=a.onpause?[{fn:a.onpause}]:[],c._onplay=a.onplay?[{fn:a.onplay}]:[],c._onstop=a.onstop?[{fn:a.onstop}]:[],c._onmute=a.onmute?[{fn:a.onmute}]:[],c._onvolume=a.onvolume?[{fn:a.onvolume}]:[],c._onrate=a.onrate?[{fn:a.onrate}]:[],c._onseek=a.onseek?[{fn:a.onseek}]:[],c._onunlock=a.onunlock?[{fn:a.onunlock}]:[],c._onresume=[],c._webAudio=t.usingWebAudio&&!c._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(c),c._autoplay&&c._queue.push({event:"play",action:function(){c.play()}}),c._preload&&c._preload!=="none"&&c.load(),c},load:function(){var a=this,c=null;if(t.noAudio){a._emit("loaderror",null,"No audio support.");return}typeof a._src=="string"&&(a._src=[a._src]);for(var d=0;d<a._src.length;d++){var p,_;if(a._format&&a._format[d])p=a._format[d];else{if(_=a._src[d],typeof _!="string"){a._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}p=/^data:audio\/([^;,]+);/i.exec(_),p||(p=/\.([^.]+)$/.exec(_.split("?",1)[0])),p&&(p=p[1].toLowerCase())}if(p||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),p&&t.codecs(p)){c=a._src[d];break}}if(!c){a._emit("loaderror",null,"No codec support for selected audio sources.");return}return a._src=c,a._state="loading",window.location.protocol==="https:"&&c.slice(0,5)==="http:"&&(a._html5=!0,a._webAudio=!1),new i(a),a._webAudio&&o(a),a},play:function(a,c){var d=this,p=null;if(typeof a=="number")p=a,a=null;else{if(typeof a=="string"&&d._state==="loaded"&&!d._sprite[a])return null;if(typeof a>"u"&&(a="__default",!d._playLock)){for(var _=0,g=0;g<d._sounds.length;g++)d._sounds[g]._paused&&!d._sounds[g]._ended&&(_++,p=d._sounds[g]._id);_===1?a=null:p=null}}var m=p?d._soundById(p):d._inactiveSound();if(!m)return null;if(p&&!a&&(a=m._sprite||"__default"),d._state!=="loaded"){m._sprite=a,m._ended=!1;var v=m._id;return d._queue.push({event:"play",action:function(){d.play(v)}}),v}if(p&&!m._paused)return c||d._loadQueue("play"),m._id;d._webAudio&&t._autoResume();var M=Math.max(0,m._seek>0?m._seek:d._sprite[a][0]/1e3),S=Math.max(0,(d._sprite[a][0]+d._sprite[a][1])/1e3-M),A=S*1e3/Math.abs(m._rate),w=d._sprite[a][0]/1e3,P=(d._sprite[a][0]+d._sprite[a][1])/1e3;m._sprite=a,m._ended=!1;var x=function(){m._paused=!1,m._seek=M,m._start=w,m._stop=P,m._loop=!!(m._loop||d._sprite[a][2])};if(M>=P){d._ended(m);return}var b=m._node;if(d._webAudio){var O=function(){d._playLock=!1,x(),d._refreshBuffer(m);var B=m._muted||d._muted?0:m._volume;b.gain.setValueAtTime(B,t.ctx.currentTime),m._playStart=t.ctx.currentTime,typeof b.bufferSource.start>"u"?m._loop?b.bufferSource.noteGrainOn(0,M,86400):b.bufferSource.noteGrainOn(0,M,S):m._loop?b.bufferSource.start(0,M,86400):b.bufferSource.start(0,M,S),A!==1/0&&(d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),A)),c||setTimeout(function(){d._emit("play",m._id),d._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?O():(d._playLock=!0,d.once("resume",O),d._clearTimer(m._id))}else{var C=function(){b.currentTime=M,b.muted=m._muted||d._muted||t._muted||b.muted,b.volume=m._volume*t.volume(),b.playbackRate=m._rate;try{var B=b.play();if(B&&typeof Promise<"u"&&(B instanceof Promise||typeof B.then=="function")?(d._playLock=!0,x(),B.then(function(){d._playLock=!1,b._unlocked=!0,c?d._loadQueue():d._emit("play",m._id)}).catch(function(){d._playLock=!1,d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):c||(d._playLock=!1,x(),d._emit("play",m._id)),b.playbackRate=m._rate,b.paused){d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}a!=="__default"||m._loop?d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),A):(d._endTimers[m._id]=function(){d._ended(m),b.removeEventListener("ended",d._endTimers[m._id],!1)},b.addEventListener("ended",d._endTimers[m._id],!1))}catch(k){d._emit("playerror",m._id,k)}};b.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(b.src=d._src,b.load());var F=window&&window.ejecta||!b.readyState&&t._navigator.isCocoonJS;if(b.readyState>=3||F)C();else{d._playLock=!0,d._state="loading";var U=function(){d._state="loaded",C(),b.removeEventListener(t._canPlayEvent,U,!1)};b.addEventListener(t._canPlayEvent,U,!1),d._clearTimer(m._id)}}return m._id},pause:function(a){var c=this;if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"pause",action:function(){c.pause(a)}}),c;for(var d=c._getSoundIds(a),p=0;p<d.length;p++){c._clearTimer(d[p]);var _=c._soundById(d[p]);if(_&&!_._paused&&(_._seek=c.seek(d[p]),_._rateSeek=0,_._paused=!0,c._stopFade(d[p]),_._node))if(c._webAudio){if(!_._node.bufferSource)continue;typeof _._node.bufferSource.stop>"u"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),c._cleanBuffer(_._node)}else(!isNaN(_._node.duration)||_._node.duration===1/0)&&_._node.pause();arguments[1]||c._emit("pause",_?_._id:null)}return c},stop:function(a,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(a)}}),d;for(var p=d._getSoundIds(a),_=0;_<p.length;_++){d._clearTimer(p[_]);var g=d._soundById(p[_]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,d._stopFade(p[_]),g._node&&(d._webAudio?g._node.bufferSource&&(typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),d._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&d._clearSound(g._node))),c||d._emit("stop",g._id))}return d},mute:function(a,c){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(a,c)}}),d;if(typeof c>"u")if(typeof a=="boolean")d._muted=a;else return d._muted;for(var p=d._getSoundIds(c),_=0;_<p.length;_++){var g=d._soundById(p[_]);g&&(g._muted=a,g._interval&&d._stopFade(g._id),d._webAudio&&g._node?g._node.gain.setValueAtTime(a?0:g._volume,t.ctx.currentTime):g._node&&(g._node.muted=t._muted?!0:a),d._emit("mute",g._id))}return d},volume:function(){var a=this,c=arguments,d,p;if(c.length===0)return a._volume;if(c.length===1||c.length===2&&typeof c[1]>"u"){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):d=parseFloat(c[0])}else c.length>=2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));var m;if(typeof d<"u"&&d>=0&&d<=1){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"volume",action:function(){a.volume.apply(a,c)}}),a;typeof p>"u"&&(a._volume=d),p=a._getSoundIds(p);for(var v=0;v<p.length;v++)m=a._soundById(p[v]),m&&(m._volume=d,c[2]||a._stopFade(p[v]),a._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(d,t.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=d*t.volume()),a._emit("volume",m._id))}else return m=p?a._soundById(p):a._sounds[0],m?m._volume:0;return a},fade:function(a,c,d,p){var _=this;if(_._state!=="loaded"||_._playLock)return _._queue.push({event:"fade",action:function(){_.fade(a,c,d,p)}}),_;a=Math.min(Math.max(0,parseFloat(a)),1),c=Math.min(Math.max(0,parseFloat(c)),1),d=parseFloat(d),_.volume(a,p);for(var g=_._getSoundIds(p),m=0;m<g.length;m++){var v=_._soundById(g[m]);if(v){if(p||_._stopFade(g[m]),_._webAudio&&!v._muted){var M=t.ctx.currentTime,S=M+d/1e3;v._volume=a,v._node.gain.setValueAtTime(a,M),v._node.gain.linearRampToValueAtTime(c,S)}_._startFadeInterval(v,a,c,d,g[m],typeof p>"u")}}return _},_startFadeInterval:function(a,c,d,p,_,g){var m=this,v=c,M=d-c,S=Math.abs(M/.01),A=Math.max(4,S>0?p/S:p),w=Date.now();a._fadeTo=d,a._interval=setInterval(function(){var P=(Date.now()-w)/p;w=Date.now(),v+=M*P,v=Math.round(v*100)/100,M<0?v=Math.max(d,v):v=Math.min(d,v),m._webAudio?a._volume=v:m.volume(v,a._id,!0),g&&(m._volume=v),(d<c&&v<=d||d>c&&v>=d)&&(clearInterval(a._interval),a._interval=null,a._fadeTo=null,m.volume(d,a._id),m._emit("fade",a._id))},A)},_stopFade:function(a){var c=this,d=c._soundById(a);return d&&d._interval&&(c._webAudio&&d._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(d._interval),d._interval=null,c.volume(d._fadeTo,a),d._fadeTo=null,c._emit("fade",a)),c},loop:function(){var a=this,c=arguments,d,p,_;if(c.length===0)return a._loop;if(c.length===1)if(typeof c[0]=="boolean")d=c[0],a._loop=d;else return _=a._soundById(parseInt(c[0],10)),_?_._loop:!1;else c.length===2&&(d=c[0],p=parseInt(c[1],10));for(var g=a._getSoundIds(p),m=0;m<g.length;m++)_=a._soundById(g[m]),_&&(_._loop=d,a._webAudio&&_._node&&_._node.bufferSource&&(_._node.bufferSource.loop=d,d&&(_._node.bufferSource.loopStart=_._start||0,_._node.bufferSource.loopEnd=_._stop,a.playing(g[m])&&(a.pause(g[m],!0),a.play(g[m],!0)))));return a},rate:function(){var a=this,c=arguments,d,p;if(c.length===0)p=a._sounds[0]._id;else if(c.length===1){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):d=parseFloat(c[0])}else c.length===2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));var m;if(typeof d=="number"){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"rate",action:function(){a.rate.apply(a,c)}}),a;typeof p>"u"&&(a._rate=d),p=a._getSoundIds(p);for(var v=0;v<p.length;v++)if(m=a._soundById(p[v]),m){a.playing(p[v])&&(m._rateSeek=a.seek(p[v]),m._playStart=a._webAudio?t.ctx.currentTime:m._playStart),m._rate=d,a._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(d,t.ctx.currentTime):m._node&&(m._node.playbackRate=d);var M=a.seek(p[v]),S=(a._sprite[m._sprite][0]+a._sprite[m._sprite][1])/1e3-M,A=S*1e3/Math.abs(m._rate);(a._endTimers[p[v]]||!m._paused)&&(a._clearTimer(p[v]),a._endTimers[p[v]]=setTimeout(a._ended.bind(a,m),A)),a._emit("rate",m._id)}}else return m=a._soundById(p),m?m._rate:a._rate;return a},seek:function(){var a=this,c=arguments,d,p;if(c.length===0)a._sounds.length&&(p=a._sounds[0]._id);else if(c.length===1){var _=a._getSoundIds(),g=_.indexOf(c[0]);g>=0?p=parseInt(c[0],10):a._sounds.length&&(p=a._sounds[0]._id,d=parseFloat(c[0]))}else c.length===2&&(d=parseFloat(c[0]),p=parseInt(c[1],10));if(typeof p>"u")return 0;if(typeof d=="number"&&(a._state!=="loaded"||a._playLock))return a._queue.push({event:"seek",action:function(){a.seek.apply(a,c)}}),a;var m=a._soundById(p);if(m)if(typeof d=="number"&&d>=0){var v=a.playing(p);v&&a.pause(p,!0),m._seek=d,m._ended=!1,a._clearTimer(p),!a._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=d);var M=function(){v&&a.play(p,!0),a._emit("seek",p)};if(v&&!a._webAudio){var S=function(){a._playLock?setTimeout(S,0):M()};setTimeout(S,0)}else M()}else if(a._webAudio){var A=a.playing(p)?t.ctx.currentTime-m._playStart:0,w=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(w+A*Math.abs(m._rate))}else return m._node.currentTime;return a},playing:function(a){var c=this;if(typeof a=="number"){var d=c._soundById(a);return d?!d._paused:!1}for(var p=0;p<c._sounds.length;p++)if(!c._sounds[p]._paused)return!0;return!1},duration:function(a){var c=this,d=c._duration,p=c._soundById(a);return p&&(d=c._sprite[p._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var a=this,c=a._sounds,d=0;d<c.length;d++)c[d]._paused||a.stop(c[d]._id),a._webAudio||(a._clearSound(c[d]._node),c[d]._node.removeEventListener("error",c[d]._errorFn,!1),c[d]._node.removeEventListener(t._canPlayEvent,c[d]._loadFn,!1),c[d]._node.removeEventListener("ended",c[d]._endFn,!1),t._releaseHtml5Audio(c[d]._node)),delete c[d]._node,a._clearTimer(c[d]._id);var p=t._howls.indexOf(a);p>=0&&t._howls.splice(p,1);var _=!0;for(d=0;d<t._howls.length;d++)if(t._howls[d]._src===a._src||a._src.indexOf(t._howls[d]._src)>=0){_=!1;break}return s&&_&&delete s[a._src],t.noAudio=!1,a._state="unloaded",a._sounds=[],a=null,null},on:function(a,c,d,p){var _=this,g=_["_on"+a];return typeof c=="function"&&g.push(p?{id:d,fn:c,once:p}:{id:d,fn:c}),_},off:function(a,c,d){var p=this,_=p["_on"+a],g=0;if(typeof c=="number"&&(d=c,c=null),c||d)for(g=0;g<_.length;g++){var m=d===_[g].id;if(c===_[g].fn&&m||!c&&m){_.splice(g,1);break}}else if(a)p["_on"+a]=[];else{var v=Object.keys(p);for(g=0;g<v.length;g++)v[g].indexOf("_on")===0&&Array.isArray(p[v[g]])&&(p[v[g]]=[])}return p},once:function(a,c,d){var p=this;return p.on(a,c,d,1),p},_emit:function(a,c,d){for(var p=this,_=p["_on"+a],g=_.length-1;g>=0;g--)(!_[g].id||_[g].id===c||a==="load")&&(setTimeout((function(m){m.call(this,c,d)}).bind(p,_[g].fn),0),_[g].once&&p.off(a,_[g].fn,_[g].id));return p._loadQueue(a),p},_loadQueue:function(a){var c=this;if(c._queue.length>0){var d=c._queue[0];d.event===a&&(c._queue.shift(),c._loadQueue()),a||d.action()}return c},_ended:function(a){var c=this,d=a._sprite;if(!c._webAudio&&a._node&&!a._node.paused&&!a._node.ended&&a._node.currentTime<a._stop)return setTimeout(c._ended.bind(c,a),100),c;var p=!!(a._loop||c._sprite[d][2]);if(c._emit("end",a._id),!c._webAudio&&p&&c.stop(a._id,!0).play(a._id),c._webAudio&&p){c._emit("play",a._id),a._seek=a._start||0,a._rateSeek=0,a._playStart=t.ctx.currentTime;var _=(a._stop-a._start)*1e3/Math.abs(a._rate);c._endTimers[a._id]=setTimeout(c._ended.bind(c,a),_)}return c._webAudio&&!p&&(a._paused=!0,a._ended=!0,a._seek=a._start||0,a._rateSeek=0,c._clearTimer(a._id),c._cleanBuffer(a._node),t._autoSuspend()),!c._webAudio&&!p&&c.stop(a._id,!0),c},_clearTimer:function(a){var c=this;if(c._endTimers[a]){if(typeof c._endTimers[a]!="function")clearTimeout(c._endTimers[a]);else{var d=c._soundById(a);d&&d._node&&d._node.removeEventListener("ended",c._endTimers[a],!1)}delete c._endTimers[a]}return c},_soundById:function(a){for(var c=this,d=0;d<c._sounds.length;d++)if(a===c._sounds[d]._id)return c._sounds[d];return null},_inactiveSound:function(){var a=this;a._drain();for(var c=0;c<a._sounds.length;c++)if(a._sounds[c]._ended)return a._sounds[c].reset();return new i(a)},_drain:function(){var a=this,c=a._pool,d=0,p=0;if(!(a._sounds.length<c)){for(p=0;p<a._sounds.length;p++)a._sounds[p]._ended&&d++;for(p=a._sounds.length-1;p>=0;p--){if(d<=c)return;a._sounds[p]._ended&&(a._webAudio&&a._sounds[p]._node&&a._sounds[p]._node.disconnect(0),a._sounds.splice(p,1),d--)}}},_getSoundIds:function(a){var c=this;if(typeof a>"u"){for(var d=[],p=0;p<c._sounds.length;p++)d.push(c._sounds[p]._id);return d}else return[a]},_refreshBuffer:function(a){var c=this;return a._node.bufferSource=t.ctx.createBufferSource(),a._node.bufferSource.buffer=s[c._src],a._panner?a._node.bufferSource.connect(a._panner):a._node.bufferSource.connect(a._node),a._node.bufferSource.loop=a._loop,a._loop&&(a._node.bufferSource.loopStart=a._start||0,a._node.bufferSource.loopEnd=a._stop||0),a._node.bufferSource.playbackRate.setValueAtTime(a._rate,t.ctx.currentTime),c},_cleanBuffer:function(a){var c=this,d=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!a.bufferSource)return c;if(t._scratchBuffer&&a.bufferSource&&(a.bufferSource.onended=null,a.bufferSource.disconnect(0),d))try{a.bufferSource.buffer=t._scratchBuffer}catch{}return a.bufferSource=null,c},_clearSound:function(a){var c=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);c||(a.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(a){this._parent=a,this.init()};i.prototype={init:function(){var a=this,c=a._parent;return a._muted=c._muted,a._loop=c._loop,a._volume=c._volume,a._rate=c._rate,a._seek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,c._sounds.push(a),a.create(),a},create:function(){var a=this,c=a._parent,d=t._muted||a._muted||a._parent._muted?0:a._volume;return c._webAudio?(a._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),a._node.gain.setValueAtTime(d,t.ctx.currentTime),a._node.paused=!0,a._node.connect(t.masterGain)):t.noAudio||(a._node=t._obtainHtml5Audio(),a._errorFn=a._errorListener.bind(a),a._node.addEventListener("error",a._errorFn,!1),a._loadFn=a._loadListener.bind(a),a._node.addEventListener(t._canPlayEvent,a._loadFn,!1),a._endFn=a._endListener.bind(a),a._node.addEventListener("ended",a._endFn,!1),a._node.src=c._src,a._node.preload=c._preload===!0?"auto":c._preload,a._node.volume=d*t.volume(),a._node.load()),a},reset:function(){var a=this,c=a._parent;return a._muted=c._muted,a._loop=c._loop,a._volume=c._volume,a._rate=c._rate,a._seek=0,a._rateSeek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,a},_errorListener:function(){var a=this;a._parent._emit("loaderror",a._id,a._node.error?a._node.error.code:0),a._node.removeEventListener("error",a._errorFn,!1)},_loadListener:function(){var a=this,c=a._parent;c._duration=Math.ceil(a._node.duration*10)/10,Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue()),a._node.removeEventListener(t._canPlayEvent,a._loadFn,!1)},_endListener:function(){var a=this,c=a._parent;c._duration===1/0&&(c._duration=Math.ceil(a._node.duration*10)/10,c._sprite.__default[1]===1/0&&(c._sprite.__default[1]=c._duration*1e3),c._ended(a)),a._node.removeEventListener("ended",a._endFn,!1)}};var s={},o=function(a){var c=a._src;if(s[c]){a._duration=s[c].duration,u(a);return}if(/^data:[^;]+;base64,/.test(c)){for(var d=atob(c.split(",")[1]),p=new Uint8Array(d.length),_=0;_<d.length;++_)p[_]=d.charCodeAt(_);h(p.buffer,a)}else{var g=new XMLHttpRequest;g.open(a._xhr.method,c,!0),g.withCredentials=a._xhr.withCredentials,g.responseType="arraybuffer",a._xhr.headers&&Object.keys(a._xhr.headers).forEach(function(m){g.setRequestHeader(m,a._xhr.headers[m])}),g.onload=function(){var m=(g.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){a._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}h(g.response,a)},g.onerror=function(){a._webAudio&&(a._html5=!0,a._webAudio=!1,a._sounds=[],delete s[c],a.load())},l(g)}},l=function(a){try{a.send()}catch{a.onerror()}},h=function(a,c){var d=function(){c._emit("loaderror",null,"Decoding audio data failed.")},p=function(_){_&&c._sounds.length>0?(s[c._src]=_,u(c,_)):d()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(a).then(p).catch(d):t.ctx.decodeAudioData(a,p,d)},u=function(a,c){c&&!a._duration&&(a._duration=c.duration),Object.keys(a._sprite).length===0&&(a._sprite={__default:[0,a._duration*1e3]}),a._state!=="loaded"&&(a._state="loaded",a._emit("load"),a._loadQueue())},f=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var a=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),c=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=c?parseInt(c[1],10):null;if(a&&d&&d<9){var p=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!p&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};r.Howler=t,r.Howl=n,typeof ms<"u"?(ms.HowlerGlobal=e,ms.Howler=t,ms.Howl=n,ms.Sound=i):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=n,window.Sound=i)})();(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(t);return n},HowlerGlobal.prototype.pos=function(t,n,i){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(n=typeof n!="number"?s._pos[1]:n,i=typeof i!="number"?s._pos[2]:i,typeof t=="number")s._pos=[t,n,i],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,n,i,s,o,l){var h=this;if(!h.ctx||!h.ctx.listener)return h;var u=h._orientation;if(n=typeof n!="number"?u[1]:n,i=typeof i!="number"?u[2]:i,s=typeof s!="number"?u[3]:s,o=typeof o!="number"?u[4]:o,l=typeof l!="number"?u[5]:l,typeof t=="number")h._orientation=[t,n,i,s,o,l],typeof h.ctx.listener.forwardX<"u"?(h.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),h.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),h.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),h.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),h.ctx.listener.upY.setTargetAtTime(o,Howler.ctx.currentTime,.1),h.ctx.listener.upZ.setTargetAtTime(l,Howler.ctx.currentTime,.1)):h.ctx.listener.setOrientation(t,n,i,s,o,l);else return u;return h},Howl.prototype.init=(function(t){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance<"u"?n.maxDistance:1e4,panningModel:typeof n.panningModel<"u"?n.panningModel:"HRTF",refDistance:typeof n.refDistance<"u"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],t.call(this,n)}})(Howl.prototype.init),Howl.prototype.stereo=function(t,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(t,n)}}),i;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof n>"u")if(typeof t=="number")i._stereo=t,i._pos=[t,0,0];else return i._stereo;for(var o=i._getSoundIds(n),l=0;l<o.length;l++){var h=i._soundById(o[l]);if(h)if(typeof t=="number")h._stereo=t,h._pos=[t,0,0],h._node&&(h._pannerAttr.panningModel="equalpower",(!h._panner||!h._panner.pan)&&e(h,s),s==="spatial"?typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):h._panner.setPosition(t,0,0):h._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),i._emit("stereo",h._id);else return h._stereo}return i},Howl.prototype.pos=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"pos",action:function(){o.pos(t,n,i,s)}}),o;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof s>"u")if(typeof t=="number")o._pos=[t,n,i];else return o._pos;for(var l=o._getSoundIds(s),h=0;h<l.length;h++){var u=o._soundById(l[h]);if(u)if(typeof t=="number")u._pos=[t,n,i],u._node&&((!u._panner||u._panner.pan)&&e(u,"spatial"),typeof u._panner.positionX<"u"?(u._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setPosition(t,n,i)),o._emit("pos",u._id);else return u._pos}return o},Howl.prototype.orientation=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"orientation",action:function(){o.orientation(t,n,i,s)}}),o;if(n=typeof n!="number"?o._orientation[1]:n,i=typeof i!="number"?o._orientation[2]:i,typeof s>"u")if(typeof t=="number")o._orientation=[t,n,i];else return o._orientation;for(var l=o._getSoundIds(s),h=0;h<l.length;h++){var u=o._soundById(l[h]);if(u)if(typeof t=="number")u._orientation=[t,n,i],u._node&&(u._panner||(u._pos||(u._pos=o._pos||[0,0,-.5]),e(u,"spatial")),typeof u._panner.orientationX<"u"?(u._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setOrientation(t,n,i)),o._emit("orientation",u._id);else return u._orientation}return o},Howl.prototype.pannerAttr=function(){var t=this,n=arguments,i,s,o;if(!t._webAudio)return t;if(n.length===0)return t._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof s>"u"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),t._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle<"u"?i.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle<"u"?i.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain<"u"?i.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel<"u"?i.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance<"u"?i.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof i.pannerAttr.refDistance<"u"?i.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor<"u"?i.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel<"u"?i.pannerAttr.panningModel:t._panningModel});else return o=t._soundById(parseInt(n[0],10)),o?o._pannerAttr:t._pannerAttr;else n.length===2&&(i=n[0],s=parseInt(n[1],10));for(var l=t._getSoundIds(s),h=0;h<l.length;h++)if(o=t._soundById(l[h]),o){var u=o._pannerAttr;u={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:u.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:u.coneOuterGain,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:u.distanceModel,maxDistance:typeof i.maxDistance<"u"?i.maxDistance:u.maxDistance,refDistance:typeof i.refDistance<"u"?i.refDistance:u.refDistance,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:u.rolloffFactor,panningModel:typeof i.panningModel<"u"?i.panningModel:u.panningModel};var f=o._panner;f||(o._pos||(o._pos=t._pos||[0,0,-.5]),e(o,"spatial"),f=o._panner),f.coneInnerAngle=u.coneInnerAngle,f.coneOuterAngle=u.coneOuterAngle,f.coneOuterGain=u.coneOuterGain,f.distanceModel=u.distanceModel,f.maxDistance=u.maxDistance,f.refDistance=u.refDistance,f.rolloffFactor=u.rolloffFactor,f.panningModel=u.panningModel}return t},Sound.prototype.init=(function(t){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,t.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}})(Sound.prototype.init),Sound.prototype.reset=(function(t){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),t.call(this)}})(Sound.prototype.reset);var e=function(t,n){n=n||"spatial",n==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(Vo)),Vo}var fh=yv();class Mv{constructor(){this.context=null,this.master=null,this.engineOsc=null,this.engineSubOsc=null,this.enginePulseOsc=null,this.engineGain=null,this.engineSubGain=null,this.enginePulseGain=null,this.engineNoise=null,this.engineNoiseGain=null,this.engineFilter=null,this.engineSubFilter=null,this.windOsc=null,this.windGain=null,this.muted=localStorage.getItem("portfolio-drive-muted")==="1"}async init(){if(this.context)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.context=new e,this.master=this.context.createGain(),this.master.gain.value=this.muted?0:.35,this.master.connect(this.context.destination),this.engineOsc=this.context.createOscillator(),this.engineOsc.type="sawtooth",this.engineSubOsc=this.context.createOscillator(),this.engineSubOsc.type="square",this.enginePulseOsc=this.context.createOscillator(),this.enginePulseOsc.type="triangle",this.engineGain=this.context.createGain(),this.engineSubGain=this.context.createGain(),this.enginePulseGain=this.context.createGain(),this.engineNoiseGain=this.context.createGain(),this.engineGain.gain.value=1e-4,this.engineSubGain.gain.value=1e-4,this.enginePulseGain.gain.value=1e-4,this.engineNoiseGain.gain.value=1e-4,this.engineFilter=this.context.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=340,this.engineFilter.Q.value=.85,this.engineSubFilter=this.context.createBiquadFilter(),this.engineSubFilter.type="lowpass",this.engineSubFilter.frequency.value=96;const t=this.context.createBiquadFilter();t.type="bandpass",t.frequency.value=68,t.Q.value=1.4;const n=this.context.createWaveShaper();n.curve=Sv(58),n.oversample="2x",this.engineOsc.connect(this.engineFilter),this.engineFilter.connect(n),n.connect(this.engineGain),this.engineGain.connect(this.master),this.engineSubOsc.connect(this.engineSubFilter),this.engineSubFilter.connect(this.engineSubGain),this.engineSubGain.connect(this.master),this.enginePulseOsc.connect(t),t.connect(this.enginePulseGain),this.enginePulseGain.connect(this.master),this.engineNoise=this.context.createBufferSource(),this.engineNoise.buffer=bv(this.context),this.engineNoise.loop=!0;const i=this.context.createBiquadFilter();i.type="bandpass",i.frequency.value=290,i.Q.value=.85,this.engineNoise.connect(i),i.connect(this.engineNoiseGain),this.engineNoiseGain.connect(this.master),this.engineOsc.start(),this.engineSubOsc.start(),this.enginePulseOsc.start(),this.engineNoise.start(),this.windOsc=this.context.createOscillator(),this.windOsc.type="triangle",this.windGain=this.context.createGain(),this.windGain.gain.value=.012;const s=this.context.createBiquadFilter();s.type="highpass",s.frequency.value=180,this.windOsc.connect(s),s.connect(this.windGain),this.windGain.connect(this.master),this.windOsc.frequency.value=84,this.windOsc.start()}resume(){this.init(),fh.Howler.mute(this.muted),this.context?.state==="suspended"&&this.context.resume()}toggleMute(){return this.muted=!this.muted,localStorage.setItem("portfolio-drive-muted",this.muted?"1":"0"),fh.Howler.mute(this.muted),this.master&&this.master.gain.setTargetAtTime(this.muted?0:.35,this.context.currentTime,.04),this.muted}click(e=520){if(!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="triangle",t.frequency.value=e,n.gain.value=.001,t.connect(n),n.connect(this.master),n.gain.setValueAtTime(.001,this.context.currentTime),n.gain.exponentialRampToValueAtTime(.08,this.context.currentTime+.01),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.15),t.start(),t.stop(this.context.currentTime+.17)}impact(e=1){if(!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="square",t.frequency.value=90+Math.random()*30,n.gain.value=Math.min(.1,.03*e),t.connect(n),n.connect(this.master),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.12),t.start(),t.stop(this.context.currentTime+.14)}update(e,t={}){if(!this.context||!this.engineOsc||!this.engineGain)return;const n=Math.min(1,Math.abs(e)/42),i=Math.min(1,Math.abs(t.throttle??0)),s=t.boost?1:0,o=t.slip??0,l=Math.sin(this.context.currentTime*(18+n*28))*(2+n*5);this.engineOsc.frequency.setTargetAtTime(42+n*148+i*42+s*30+l,this.context.currentTime,.055),this.engineGain.gain.setTargetAtTime(this.muted?0:.034+n*.084+i*.025+s*.02,this.context.currentTime,.075),this.engineFilter?.frequency.setTargetAtTime(240+n*650+i*180+s*240,this.context.currentTime,.12),this.engineSubOsc&&this.engineSubGain&&(this.engineSubOsc.frequency.setTargetAtTime(23+n*52+i*10,this.context.currentTime,.08),this.engineSubGain.gain.setTargetAtTime(this.muted?0:.027+n*.05+i*.018,this.context.currentTime,.12)),this.enginePulseOsc&&this.enginePulseGain&&(this.enginePulseOsc.frequency.setTargetAtTime(15+n*35+s*16,this.context.currentTime,.1),this.enginePulseGain.gain.setTargetAtTime(this.muted?0:.013+n*.028+s*.018,this.context.currentTime,.1)),this.engineNoiseGain&&this.engineNoiseGain.gain.setTargetAtTime(this.muted?0:.004+n*.017+o*.065+s*.018,this.context.currentTime,.08),this.windGain&&this.windGain.gain.setTargetAtTime(this.muted?0:.008+n*.025,this.context.currentTime,.2)}}function Sv(r){const t=new Float32Array(44100),n=Math.PI/180;for(let i=0;i<44100;i+=1){const s=i*2/44100-1;t[i]=(3+r)*s*20*n/(Math.PI+r*Math.abs(s))}return t}function bv(r){const e=r.sampleRate*2,t=r.createBuffer(1,e,r.sampleRate),n=t.getChannelData(0);let i=0;for(let s=0;s<e;s+=1){const o=Math.random()*2-1;i=i*.92+o*.08,n[s]=i*.55}return t}const Ft=190,Sn=24,Dt=158,Tv=[],wv=[{id:"courtyard",label:"Portfolio Courtyard",center:[16,40],size:[44,36],color:"#7cffb2",kind:"plaza"},{id:"watchtower",label:"Sentinel Watchtower",center:[38,104],size:[46,34],color:"#ff6d8d",kind:"keep"},{id:"library-grove",label:"Education Grove",center:[-112,72],size:[48,38],color:"#9ccfff",kind:"library"},{id:"forge",label:"Projects Foundry",center:[62,42],size:[48,36],color:"#ffcc66",kind:"forge"},{id:"harbor",label:"Contact Harbor",center:[130,64],size:[34,30],color:"#78b7ff",kind:"waterfront"},{id:"archive",label:"Archive Garden",center:[-20,72],size:[36,28],color:"#ffdf8a",kind:"civic"},{id:"cove",label:"Stunt Courtyard",center:[112,-78],size:[40,28],color:"#ff9b6d",kind:"stunt"},{id:"farm",label:"Voxel Farm Pocket",center:[50,74],size:[34,28],color:"#c79b56",kind:"farm"}],Go=[{id:"western-sakura",center:[-124,28],size:[34,48],kind:"grove"},{id:"library-sakura",center:[-122,112],size:[30,28],kind:"grove"},{id:"north-meadow",center:[-12,110],size:[54,28],kind:"meadow"},{id:"harbor-cypress",center:[128,76],size:[24,32],kind:"coast"},{id:"southern-oaks",center:[-22,-116],size:[58,26],kind:"meadow"},{id:"farm-orchard",center:[34,76],size:[28,26],kind:"farm"},{id:"east-park",center:[114,-12],size:[26,34],kind:"garden"},{id:"west-cove",center:[-118,-60],size:[30,34],kind:"coast"}],Ll=[{id:"island-loop",name:"Stone Coast Loop",width:8.8,hierarchy:"ring",closed:!0,points:[[-88,78],[-122,12],[-96,-74],[-28,-120],[56,-112],[118,-56],[130,34],[84,100],[16,126],[-60,112]]},{id:"agora-way",name:"Courtyard Way",width:7.2,hierarchy:"avenue",closed:!1,points:[[-122,12],[-62,18],[0,26],[62,18],[130,34]]},{id:"acropolis-climb",name:"Watchtower Climb",width:6.2,hierarchy:"street",closed:!1,points:[[0,26],[6,66],[22,104],[16,126]]},{id:"academy-lane",name:"Library Lane",width:6,hierarchy:"street",closed:!1,points:[[-62,18],[-92,54],[-104,86],[-88,78]]},{id:"vault-run",name:"Vault Run",width:5.8,hierarchy:"street",closed:!1,points:[[0,26],[24,-36],[44,-86],[56,-112]]},{id:"stunt-cove-loop",name:"Stunt Courtyard Approach",width:7,hierarchy:"stunt",closed:!1,points:[[56,-112],[84,-96],[104,-96]]},{id:"farm-track",name:"Farm Track",width:5.2,hierarchy:"dirt",closed:!1,turnaround:!0,points:[[84,100],[76,86]]}],Za=Ll.flatMap(r=>Cv(r)),Ev=[{id:"southern-curve-boost",position:[0,0,-123],rotation:Math.PI/2-.2,color:"#68d8ff",district:"loop"},{id:"east-loop-boost",position:[122,0,-18],rotation:.1,color:"#7cffb2",district:"loop"},{id:"stunt-cove-boost",position:[78,0,-106],rotation:-.6,color:"#ff9b6d",district:"stunt"}],Hs=[{id:"landing",name:"Portfolio Courtyard",kind:"Home",position:[16,0,40],rotation:0,radius:11,color:"#7cffb2",shape:"hub",dialogueId:"0",achievement:"first_stop",actions:[{label:"Main Portfolio",href:"../index.html"},{label:"Projects",href:"../projects.html"}]},{id:"security",name:"Security Keep",kind:"Offensive Security",position:[-126,0,-42],rotation:.18,radius:10,color:"#68d8ff",shape:"lab",dialogueId:"1",achievement:"security_lab",actions:[{label:"CV",href:"../cv.html"},{label:"Cyber Sentinel",href:"../cyber-sentinel.html"}]},{id:"projects",name:"Projects Foundry",kind:"Project Gallery",position:[64,0,42],rotation:-.34,radius:10,color:"#ffcc66",shape:"foundry",achievement:"projects_foundry",projectGallery:!0,actions:[{label:"Projects Page",href:"../projects.html"}]},{id:"sentinel",name:"Cyber Sentinel Watchtower",kind:"Final Year Project",position:[38,0,104],rotation:0,radius:12,color:"#ff6d8d",shape:"tower",dialogueId:"3",achievement:"cyber_sentinel",actions:[{label:"Read Blog",href:"../cyber-sentinel.html"}]},{id:"career",name:"Career Guild Hall",kind:"Experience",position:[90,0,-28],rotation:-.15,radius:10,color:"#b6a0ff",shape:"office",dialogueId:"5",achievement:"career_office",actions:[{label:"CV",href:"../cv.html"}]},{id:"skills",name:"Skills Oracle",kind:"Stack",position:[-86,0,-102],rotation:.28,radius:9,color:"#92ffea",shape:"terminal",dialogueId:"2",achievement:"skills_terminal",actions:[{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"}]},{id:"education",name:"Education Library",kind:"Academics",position:[-112,0,72],rotation:.18,radius:10,color:"#9ccfff",shape:"library",dialogueId:"6",achievement:"education_library",actions:[{label:"CV",href:"../cv.html"}]},{id:"awards",name:"Awards Shrine",kind:"Certificates",position:[-20,0,72],rotation:-.18,radius:8,color:"#ffdf8a",shape:"trophy",dialogueId:"7",achievement:"awards_tower",actions:[{label:"CV",href:"../cv.html"}]},{id:"cv",name:"CV Vault",kind:"Resume",position:[32,0,-78],rotation:.28,radius:8,color:"#e6f3ff",shape:"vault",achievement:"cv_vault",lines:["Resume archive, project record, certificates, skills, awards, and downloadable PDFs.","The formal version lives here when the drive becomes a document."],actions:[{label:"Open CV Page",href:"../cv.html"},{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"},{label:"Cyber CV PDF",href:"../Abdullah-Mehtab-CV-Cyber-v2.pdf"}]},{id:"todo",name:"Todo Board",kind:"Blog / List",position:[-62,0,86],rotation:-.28,radius:8,color:"#d8ff92",shape:"board",achievement:"todo_board",lines:["The never-ending list keeps the unfinished, ongoing, and occasionally strange parts visible.","Tasks, experiments, reminders, and ideas still moving live there."],actions:[{label:"Open Todo",href:"../todo.html"}]},{id:"circuit",name:"Circuit Gate",kind:"Time Trial",position:[84,0,100],rotation:-.22,radius:9,color:"#ff9b6d",shape:"gate",achievement:"circuit_gate",lines:["This gate starts the island loop circuit.","Follow the checkpoints around the coast and return clean."],startsCircuit:!0},{id:"contact",name:"Contact Harbor Lighthouse",kind:"Links",position:[130,0,64],rotation:-.18,radius:8,color:"#78b7ff",shape:"post",dialogueId:"8",achievement:"contact_port",actions:[{label:"GitHub",href:"https://github.com/Abdullah-Mehtab"},{label:"LinkedIn",href:"https://linkedin.com/in/abdullah-mehtab"},{label:"Email",href:"mailto:abdullahmehtab666@gmail.com"}]},{id:"behind",name:"Behind The Build",kind:"Stack",position:[36,0,-104],rotation:.08,radius:8,color:"#a8a6ff",shape:"portal",achievement:"behind_build",lines:["Engine room: Three.js visuals, Rapier physics, local resume data, and Supabase-backed counters.","The repository link opens the source behind the drive world."],actions:[{label:"Repository",href:"https://github.com/Abdullah-Mehtab/Abdullah-Mehtab"}]},{id:"drift",name:"Stunt Courtyard",kind:"Driving",position:[112,0,-78],rotation:-.45,radius:11,color:"#ff9b6d",shape:"rampyard",achievement:"ramp_yard",lines:["A separate courtyard for ramps, boosters, and messy driving away from the formal portfolio landmarks."]},{id:"data-pier",name:"Data Pier",kind:"Visitor Trail",position:[-138,0,20],rotation:.42,radius:9,color:"#79ffc5",shape:"pier",achievement:"data_pier",lines:["Signal pier for page views, zone visits, and interaction counts.","Visitor signals are stored as hashed analytics events."]},{id:"potato",name:"Potato Farm",kind:"Farm Counter",position:[50,0,74],rotation:0,radius:10,color:"#c79b56",shape:"farm",achievement:"potato_farm",lines:["Voxel potato patch beside the farm track.","Press P nearby, or use the summon button, to grow one temporary potato and increment the farm counter."],potatoFarm:!0}],Av=[["first_stop","First Stop","Interact with the Start Hub."],["security_lab","Security Pass","Open the Security Lab."],["projects_foundry","Project Heat","Open the Projects Foundry."],["cyber_sentinel","Sentinel Signal","Visit Cyber Sentinel Tower."],["career_office","Work Log","Open the Career Office."],["skills_terminal","Stack Trace","Open the Skills Terminal."],["education_library","Academic Archive","Open the Education Library."],["awards_tower","Trophy Case","Open the Awards Tower."],["cv_vault","Formal Mode","Open the CV Vault."],["todo_board","Still Building","Open the Todo Board."],["circuit_gate","Track Curious","Start the circuit gate."],["contact_port","Signal Sent","Open the Contact Port."],["behind_build","Look Under The Hood","Open Behind The Build."],["ramp_yard","Ramp Yard","Visit the driving yard."],["data_pier","Data Pier","Visit the data pier."],["potato_farm","Potato Patch","Visit the potato farm."],["potato_summon","Potato Summoner","Summon a blocky potato."],["boost","Boosted","Use boost while driving."],["boost_pad","Pad Launched","Hit a boost pad."],["jump","Suspension Check","Jump the car."],["ramp_jump","Clean Air","Launch from a ramp."],["data_shards","Signal Collector","Collect every floating data shard."],["distance_1km","One Kilometer","Drive at least 1 km."],["all_zones","Full Tour","Interact with every portfolio zone."]],Rv=[[84,0,100],[16,0,126],[-60,0,112],[-88,0,78],[-122,0,12],[-96,0,-74],[-28,0,-120],[56,0,-112],[118,0,-56],[130,0,34],[84,0,100]];function Cv(r){const e=r.points,t=[],n=r.closed?e.length:e.length-1;for(let i=0;i<n;i+=1){const s=e[i],o=e[(i+1)%e.length],l=o[0]-s[0],h=o[1]-s[1],u=Math.hypot(l,h);t.push([(s[0]+o[0])/2,(s[1]+o[1])/2,r.width,u+r.width*.64,Math.atan2(l,h)])}return t}const ph="portfolio-drive-achievements";class Pv{constructor(){this.definitions=Av.map(([e,t,n])=>({id:e,title:t,description:n})),this.unlocked=new Set(this.read()),this.zoneUnlocks=new Set,this.distance=Number(localStorage.getItem("portfolio-drive-distance")||0),this.onUnlock=null}read(){try{const e=JSON.parse(localStorage.getItem(ph)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}save(){localStorage.setItem(ph,JSON.stringify([...this.unlocked])),localStorage.setItem("portfolio-drive-distance",String(Math.round(this.distance)))}unlock(e){if(this.unlocked.has(e))return!1;this.unlocked.add(e),this.save();const t=this.definitions.find(n=>n.id===e);return this.onUnlock?.(t||{id:e,title:e,description:""}),!0}visitZone(e){if(!e?.achievement)return;this.zoneUnlocks.add(e.achievement),this.unlock(e.achievement),this.definitions.map(i=>i.id).filter(i=>!["boost","boost_pad","jump","ramp_jump","data_shards","potato_summon","distance_1km","all_zones"].includes(i)).every(i=>this.unlocked.has(i)||this.zoneUnlocks.has(i))&&this.unlock("all_zones")}addDistance(e){!Number.isFinite(e)||e<=0||(this.distance+=e,this.distance>=1e3&&this.unlock("distance_1km"),this.save())}reset(){this.unlocked.clear(),this.zoneUnlocks.clear(),this.distance=0,this.save()}getProgress(){return{unlocked:this.unlocked.size,total:this.definitions.length,distance:this.distance}}}const mh="https://zvuklviflletxyhniwdm.supabase.co/functions/v1/visitor-proof",gs="sb_publishable_almN_FPps-MxiLAF0Uypmw_jaCZ6VrI",gh="portfolio-drive-visitor-id",Iv=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;class Lv{constructor(){this.isEnabled=!!gs,this.visitorId=Dv(),this.fingerprintHash="",this.potatoCount=null,this.zoneVisits=new Set}get potatoCountLabel(){return Number.isFinite(this.potatoCount)?String(this.potatoCount):"--"}async init(){if(!this.isEnabled)return;this.fingerprintHash=await Nv(),this.record("page_view",{sourceToken:"drive_world"});const e=await this.fetchPotatoCount();Number.isFinite(e)&&(this.potatoCount=e)}recordZone(e){!e||this.zoneVisits.has(e)||(this.zoneVisits.add(e),this.record("play_zone_visit",{sourceToken:e}))}async recordPotatoSummon(){const e=await this.record("potato_summon",{sourceToken:"potato_farm",wantsCount:!0});return Number.isFinite(e?.potato_count)?this.potatoCount=e.potato_count:Number.isFinite(this.potatoCount)&&(this.potatoCount+=1),this.potatoCount}async fetchPotatoCount(){if(!this.isEnabled)return null;try{const e=new URL(mh);e.searchParams.set("page_slug","play"),e.searchParams.set("event_type","potato_summon_count");const t=await fetch(e,{headers:{apikey:gs,authorization:`Bearer ${gs}`}});if(!t.ok)return null;const n=await t.json();return Number(n.potato_count)}catch{return null}}async record(e,t={}){if(!this.isEnabled)return null;try{const n={page_slug:"play",event_type:e,theme:"drive_world",cursor:"vehicle",motion:"full",referrer:document.referrer||"",source_token:t.sourceToken||"",visitor_id:this.visitorId,session_id:Iv,fingerprint_hash:this.fingerprintHash,fingerprint_version:"play-v1",screen_size:`${screen.width}x${screen.height}x${window.devicePixelRatio||1}`,viewport_size:`${window.innerWidth}x${window.innerHeight}`,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",language:navigator.language||"",platform:navigator.platform||""},i=await fetch(mh,{method:"POST",headers:{"content-type":"application/json",apikey:gs,authorization:`Bearer ${gs}`},body:JSON.stringify(n),keepalive:e==="page_view"});return i.ok?i.json().catch(()=>null):null}catch{return null}}}function Dv(){try{const r=localStorage.getItem(gh);if(r)return r;const e=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;return localStorage.setItem(gh,e),e}catch{return`${Date.now()}-${Math.random().toString(16).slice(2)}`}}async function Nv(){const r=[navigator.userAgent||"",navigator.language||"",navigator.platform||"",screen.width,screen.height,screen.colorDepth,window.devicePixelRatio||1,Intl.DateTimeFormat().resolvedOptions().timeZone||""].join("|");if(!crypto.subtle)return"";const e=new TextEncoder().encode(r),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(n=>n.toString(16).padStart(2,"0")).join("")}class Fv{constructor(e){this.RAPIER=e,this.world=new this.RAPIER.World({x:0,y:-18.5,z:0}),this.accumulator=0,this.fixedStep=1/60,this.dynamicVisuals=[]}createFixedBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);n.rotation&&i.setRotation(Ho(n.rotation));const s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setFriction(n.friction??.85).setRestitution(n.restitution??.05);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}createFixedCylinder(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(Ho(i.rotation));const o=this.world.createRigidBody(s),l=this.RAPIER.ColliderDesc.cylinder(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&l.setSensor(!0),this.world.createCollider(l,o),o}createFixedBall(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.ball(t).setFriction(n.friction??.85).setRestitution(n.restitution??.04);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}createFixedTrimesh(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(Ho(i.rotation));const o=this.world.createRigidBody(s),l=this.RAPIER.ColliderDesc.trimesh(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&l.setSensor(!0),this.world.createCollider(l,o),o}createDynamicBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(e[0],e[1],e[2]).setLinearDamping(n.linearDamping??.35).setAngularDamping(n.angularDamping??.45),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setDensity(n.density??.55).setFriction(n.friction??.75).setRestitution(n.restitution??.2);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}bindVisual(e,t){const n=e.translation(),i=e.rotation();this.dynamicVisuals.push({body:e,object:t,initial:{translation:{x:n.x,y:n.y,z:n.z},rotation:{x:i.x,y:i.y,z:i.z,w:i.w}}})}resetDynamicVisuals(){for(const e of this.dynamicVisuals)e.body.setTranslation(e.initial.translation,!0),e.body.setRotation(e.initial.rotation,!0),e.body.setLinvel({x:0,y:0,z:0},!0),e.body.setAngvel({x:0,y:0,z:0},!0);this.syncVisuals()}step(e,t){this.accumulator+=Math.min(e,.05);let n=!1;for(;this.accumulator>=this.fixedStep;)t?.(this.fixedStep),this.world.step(),this.accumulator-=this.fixedStep,n=!0;n&&this.syncVisuals()}syncVisuals(){for(const e of this.dynamicVisuals){const t=e.body.translation(),n=e.body.rotation();e.object.position.set(t.x,t.y,t.z),e.object.quaternion.set(n.x,n.y,n.z,n.w)}}}function Ho(r){const e=new Ut().setFromEuler(new ln(r[0],r[1],r[2]));return{x:e.x,y:e.y,z:e.z,w:e.w}}function _h(r,e){if(e===td)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ka||e===Uh){let t=r.getIndex();if(t===null){const o=[],l=r.getAttribute("position");if(l!==void 0){for(let h=0;h<l.count;h++)o.push(h);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ka)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function Uv(r){const e=new Map,t=new Map,n=r.clone();return _u(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),l=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=l.map(function(h){return t.get(h)}),s.bind(s.skeleton,s.bindMatrix)}),n}function _u(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)_u(r.children[n],e.children[n],t)}class vu extends is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Vv(t)}),this.register(function(t){return new Gv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new Wv(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new zv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new Hv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new Bv(t)}),this.register(function(t){return new vh(t,Xe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new vh(t,Xe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new ex(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const u=Is.extractUrlBase(e);o=Is.resolveURL(u,this.path)}else o=Is.extractUrlBase(e);this.manager.itemStart(e);const l=function(u){i?i(u):console.error(u),s.manager.itemError(e),s.manager.itemEnd(e)},h=new lu(this.manager);h.setPath(this.path),h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setWithCredentials(this.withCredentials),h.load(e,function(u){try{s.parse(u,o,function(f){t(f),s.manager.itemEnd(e)},l)}catch(f){l(f)}},n,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},l={},h=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(h.decode(new Uint8Array(e,0,4))===xu){try{o[Xe.KHR_BINARY_GLTF]=new tx(e)}catch(a){i&&i(a);return}s=JSON.parse(o[Xe.KHR_BINARY_GLTF].content)}else s=JSON.parse(h.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new px(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let f=0;f<this.pluginCallbacks.length;f++){const a=this.pluginCallbacks[f](u);a.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[a.name]=a,o[a.name]=!0}if(s.extensionsUsed)for(let f=0;f<s.extensionsUsed.length;++f){const a=s.extensionsUsed[f],c=s.extensionsRequired||[];switch(a){case Xe.KHR_MATERIALS_UNLIT:o[a]=new kv;break;case Xe.KHR_DRACO_MESH_COMPRESSION:o[a]=new nx(s,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:o[a]=new ix;break;case Xe.KHR_MESH_QUANTIZATION:o[a]=new sx;break;default:c.indexOf(a)>=0&&l[a]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+a+'".')}}u.setExtensions(o),u.setPlugins(l),u.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Ov(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function yt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Bv{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,h=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let u;const f=new me(16777215);h.color!==void 0&&f.setRGB(h.color[0],h.color[1],h.color[2],qt);const a=h.range!==void 0?h.range:0;switch(h.type){case"directional":u=new Ya(f),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new Ps(f),u.distance=a;break;case"spot":u=new hu(f),u.distance=a,h.spot=h.spot||{},h.spot.innerConeAngle=h.spot.innerConeAngle!==void 0?h.spot.innerConeAngle:0,h.spot.outerConeAngle=h.spot.outerConeAngle!==void 0?h.spot.outerConeAngle:Math.PI/4,u.angle=h.spot.outerConeAngle,u.penumbra=1-h.spot.innerConeAngle/h.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+h.type)}return u.position.set(0,0,0),yn(u,h),h.intensity!==void 0&&(u.intensity=h.intensity),u.name=t.createUniqueName(h.name||"light_"+e),i=Promise.resolve(u),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],l=(s.extensions&&s.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(h){return n._getNodeRef(t.cache,l,h)})}}class kv{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return Tt}extendParams(e,t,n){const i=[];e.color=new me(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],qt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Nt))}return Promise.all(i)}}class zv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Vv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(s,s)}return Promise.all(i)}}class Gv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Hv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Wv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new me(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],qt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Xv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class qv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new me().setRGB(s[0],s[1],s[2],qt),Promise.all(i)}}class Yv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5),Promise.resolve()}}class Kv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new me().setRGB(s[0],s[1],s[2],qt),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(i)}}class $v{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Zv{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Dn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class jv{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Jv{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],l=i.images[o.source];let h=n.textureLoader;if(l.uri){const u=n.options.manager.getHandler(l.uri);u!==null&&(h=u)}return n.loadTextureImage(e,o.source,h)}}class Qv{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],l=i.images[o.source];let h=n.textureLoader;if(l.uri){const u=n.options.manager.getHandler(l.uri);u!==null&&(h=u)}return n.loadTextureImage(e,o.source,h)}}class vh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(l){const h=i.byteOffset||0,u=i.byteLength||0,f=i.count,a=i.byteStride,c=new Uint8Array(l,h,u);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(f,a,c,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(f*a);return o.decodeGltfBuffer(new Uint8Array(d),f,a,c,i.mode,i.filter),d})})}else return null}}class ex{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const u of i.primitives)if(u.mode!==nn.TRIANGLES&&u.mode!==nn.TRIANGLE_STRIP&&u.mode!==nn.TRIANGLE_FAN&&u.mode!==void 0)return null;const o=n.extensions[this.name].attributes,l=[],h={};for(const u in o)l.push(this.parser.getDependency("accessor",o[u]).then(f=>(h[u]=f,h[u])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(u=>{const f=u.pop(),a=f.isGroup?f.children:[f],c=u[0].count,d=[];for(const p of a){const _=new Be,g=new R,m=new Ut,v=new R(1,1,1),M=new tf(p.geometry,p.material,c);for(let S=0;S<c;S++)h.TRANSLATION&&g.fromBufferAttribute(h.TRANSLATION,S),h.ROTATION&&m.fromBufferAttribute(h.ROTATION,S),h.SCALE&&v.fromBufferAttribute(h.SCALE,S),M.setMatrixAt(S,_.compose(g,m,v));for(const S in h)if(S==="_COLOR_0"){const A=h[S];M.instanceColor=new Va(A.array,A.itemSize,A.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&p.geometry.setAttribute(S,h[S]);dt.prototype.copy.call(M,p),this.parser.assignFinalMaterial(M),d.push(M)}return f.isGroup?(f.clear(),f.add(...d),f):d[0]}))}}const xu="glTF",_s=12,xh={JSON:1313821514,BIN:5130562};class tx{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,_s),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==xu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-_s,s=new DataView(e,_s);let o=0;for(;o<i;){const l=s.getUint32(o,!0);o+=4;const h=s.getUint32(o,!0);if(o+=4,h===xh.JSON){const u=new Uint8Array(e,_s+o,l);this.content=n.decode(u)}else if(h===xh.BIN){const u=_s+o;this.body=e.slice(u,u+l)}o+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class nx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,l={},h={},u={};for(const f in o){const a=ja[f]||f.toLowerCase();l[a]=o[f]}for(const f in e.attributes){const a=ja[f]||f.toLowerCase();if(o[f]!==void 0){const c=n.accessors[e.attributes[f]],d=Vi[c.componentType];u[a]=d.name,h[a]=c.normalized===!0}}return t.getDependency("bufferView",s).then(function(f){return new Promise(function(a,c){i.decodeDracoFile(f,function(d){for(const p in d.attributes){const _=d.attributes[p],g=h[p];g!==void 0&&(_.normalized=g)}a(d)},l,u,qt,c)})})}}class ix{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class sx{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}}class yu extends es{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,h=l*2,u=l*3,f=i-t,a=(n-t)/f,c=a*a,d=c*a,p=e*u,_=p-u,g=-2*d+3*c,m=d-c,v=1-g,M=m-c+a;for(let S=0;S!==l;S++){const A=o[_+S+l],w=o[_+S+h]*f,P=o[p+S+l],x=o[p+S]*f;s[S]=v*A+M*w+g*P+m*x}return s}}const rx=new Ut;class ox extends yu{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return rx.fromArray(s).normalize().toArray(s),s}}const nn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Vi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},yh={9728:wt,9729:bt,9984:Ch,9985:Ir,9986:Ss,9987:Tn},Mh={33071:bn,33648:kr,10497:sn},Wo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ja={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ei={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ax={CUBICSPLINE:void 0,LINEAR:Fs,STEP:Ns},Xo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function lx(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ft({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Wn})),r.DefaultMaterial}function di(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cx(r,e,t){let n=!1,i=!1,s=!1;for(let u=0,f=e.length;u<f;u++){const a=e[u];if(a.POSITION!==void 0&&(n=!0),a.NORMAL!==void 0&&(i=!0),a.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],l=[],h=[];for(let u=0,f=e.length;u<f;u++){const a=e[u];if(n){const c=a.POSITION!==void 0?t.getDependency("accessor",a.POSITION):r.attributes.position;o.push(c)}if(i){const c=a.NORMAL!==void 0?t.getDependency("accessor",a.NORMAL):r.attributes.normal;l.push(c)}if(s){const c=a.COLOR_0!==void 0?t.getDependency("accessor",a.COLOR_0):r.attributes.color;h.push(c)}}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(h)]).then(function(u){const f=u[0],a=u[1],c=u[2];return n&&(r.morphAttributes.position=f),i&&(r.morphAttributes.normal=a),s&&(r.morphAttributes.color=c),r.morphTargetsRelative=!0,r})}function hx(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ux(r){let e;const t=r.extensions&&r.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qo(t.attributes):e=r.indices+":"+qo(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qo(r.targets[n]);return e}function qo(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ja(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const fx=new Be;class px{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ov,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const l=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(l)===!0;const h=l.match(/Version\/(\d+)/);i=n&&h?parseInt(h[1],10):-1,s=l.indexOf("Firefox")>-1,o=s?l.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new rp(this.options.manager):this.textureLoader=new hp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new lu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const l={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return di(s,l,i),yn(l,i),Promise.all(n._invokeAll(function(h){return h.afterRoot&&h.afterRoot(l)})).then(function(){for(const h of l.scenes)h.updateMatrixWorld();e(l)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let l=0,h=o.length;l<h;l++)e[o[l]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,l)=>{const h=this.associations.get(o);h!=null&&this.associations.set(l,h);for(const[u,f]of o.children.entries())s(f,l.children[u])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Is.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Wo[i.type],l=Vi[i.componentType],h=i.normalized===!0,u=new l(i.count*o);return Promise.resolve(new At(u,o,h))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const l=o[0],h=Wo[i.type],u=Vi[i.componentType],f=u.BYTES_PER_ELEMENT,a=f*h,c=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(d&&d!==a){const m=Math.floor(c/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let M=t.cache.get(v);M||(_=new u(l,m*d,i.count*d/f),M=new Kd(_,d/f),t.cache.add(v,M)),g=new xl(M,h,c%d/f,p)}else l===null?_=new u(i.count*h):_=new u(l,c,i.count*h),g=new At(_,h,p);if(i.sparse!==void 0){const m=Wo.SCALAR,v=Vi[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,S=i.sparse.values.byteOffset||0,A=new v(o[1],M,i.sparse.count*m),w=new u(o[2],S,i.sparse.count*h);l!==null&&(g=new At(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,x=A.length;P<x;P++){const b=A[P];if(g.setX(b,w[P*h]),h>=2&&g.setY(b,w[P*h+1]),h>=3&&g.setZ(b,w[P*h+2]),h>=4&&g.setW(b,w[P*h+3]),h>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let l=this.textureLoader;if(o.uri){const h=n.manager.getHandler(o.uri);h!==null&&(l=h)}return this.loadTextureImage(e,s,l)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],l=s.images[t],h=(l.uri||l.bufferView)+":"+o.sampler;if(this.textureCache[h])return this.textureCache[h];const u=this.loadImageSource(t,n).then(function(f){f.flipY=!1,f.name=o.name||l.name||"",f.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(f.name=l.uri);const c=(s.samplers||{})[o.sampler]||{};return f.magFilter=yh[c.magFilter]||bt,f.minFilter=yh[c.minFilter]||Tn,f.wrapS=Mh[c.wrapS]||sn,f.wrapT=Mh[c.wrapT]||sn,f.generateMipmaps=!f.isCompressedTexture&&f.minFilter!==wt&&f.minFilter!==bt,i.associations.set(f,{textures:e}),f}).catch(function(){return null});return this.textureCache[h]=u,u}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(a=>a.clone());const o=i.images[e],l=self.URL||self.webkitURL;let h=o.uri||"",u=!1;if(o.bufferView!==void 0)h=n.getDependency("bufferView",o.bufferView).then(function(a){u=!0;const c=new Blob([a],{type:o.mimeType});return h=l.createObjectURL(c),h});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const f=Promise.resolve(h).then(function(a){return new Promise(function(c,d){let p=c;t.isImageBitmapLoader===!0&&(p=function(_){const g=new Et(_);g.needsUpdate=!0,c(g)}),t.load(Is.resolveURL(a,s.path),p,void 0,d)})}).then(function(a){return u===!0&&l.revokeObjectURL(h),yn(a,o),a.userData.mimeType=o.mimeType||dx(o.uri),a}).catch(function(a){throw console.error("THREE.GLTFLoader: Couldn't load texture",h),a});return this.sourceCache[e]=f,f}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Xe.KHR_TEXTURE_TRANSFORM]){const l=n.extensions!==void 0?n.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(l){const h=s.associations.get(o);o=s.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(o,l),s.associations.set(o,h)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const l="PointsMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new qh,Rn.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,h.sizeAttenuation=!1,this.cache.add(l,h)),n=h}else if(e.isLine){const l="LineBasicMaterial:"+n.uuid;let h=this.cache.get(l);h||(h=new Xh,Rn.prototype.copy.call(h,n),h.color.copy(n.color),h.map=n.map,this.cache.add(l,h)),n=h}if(i||s||o){let l="ClonedMaterial:"+n.uuid+":";i&&(l+="derivative-tangents:"),s&&(l+="vertex-colors:"),o&&(l+="flat-shading:");let h=this.cache.get(l);h||(h=n.clone(),s&&(h.vertexColors=!0),o&&(h.flatShading=!0),i&&(h.normalScale&&(h.normalScale.y*=-1),h.clearcoatNormalScale&&(h.clearcoatNormalScale.y*=-1)),this.cache.add(l,h),this.associations.set(h,this.associations.get(n))),n=h}e.material=n}getMaterialType(){return ft}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const l={},h=s.extensions||{},u=[];if(h[Xe.KHR_MATERIALS_UNLIT]){const a=i[Xe.KHR_MATERIALS_UNLIT];o=a.getMaterialType(),u.push(a.extendParams(l,s,t))}else{const a=s.pbrMetallicRoughness||{};if(l.color=new me(1,1,1),l.opacity=1,Array.isArray(a.baseColorFactor)){const c=a.baseColorFactor;l.color.setRGB(c[0],c[1],c[2],qt),l.opacity=c[3]}a.baseColorTexture!==void 0&&u.push(t.assignTexture(l,"map",a.baseColorTexture,Nt)),l.metalness=a.metallicFactor!==void 0?a.metallicFactor:1,l.roughness=a.roughnessFactor!==void 0?a.roughnessFactor:1,a.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(l,"metalnessMap",a.metallicRoughnessTexture)),u.push(t.assignTexture(l,"roughnessMap",a.metallicRoughnessTexture))),o=this._invokeOne(function(c){return c.getMaterialType&&c.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(c){return c.extendMaterialParams&&c.extendMaterialParams(e,l)})))}s.doubleSided===!0&&(l.side=Jt);const f=s.alphaMode||Xo.OPAQUE;if(f===Xo.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,f===Xo.MASK&&(l.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Tt&&(u.push(t.assignTexture(l,"normalMap",s.normalTexture)),l.normalScale=new oe(1,1),s.normalTexture.scale!==void 0)){const a=s.normalTexture.scale;l.normalScale.set(a,a)}if(s.occlusionTexture!==void 0&&o!==Tt&&(u.push(t.assignTexture(l,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Tt){const a=s.emissiveFactor;l.emissive=new me().setRGB(a[0],a[1],a[2],qt)}return s.emissiveTexture!==void 0&&o!==Tt&&u.push(t.assignTexture(l,"emissiveMap",s.emissiveTexture,Nt)),Promise.all(u).then(function(){const a=new o(l);return s.name&&(a.name=s.name),yn(a,s),t.associations.set(a,{materials:e}),s.extensions&&di(i,a,s),a})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(l){return n[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,t).then(function(h){return Sh(h,l,t)})}const o=[];for(let l=0,h=e.length;l<h;l++){const u=e[l],f=ux(u),a=i[f];if(a)o.push(a.promise);else{let c;u.extensions&&u.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?c=s(u):c=Sh(new gt,u,t),i[f]={primitive:u,promise:c},o.push(c)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,l=[];for(let h=0,u=o.length;h<u;h++){const f=o[h].material===void 0?lx(this.cache):this.getDependency("material",o[h].material);l.push(f)}return l.push(t.loadGeometries(o)),Promise.all(l).then(function(h){const u=h.slice(0,h.length-1),f=h[h.length-1],a=[];for(let d=0,p=f.length;d<p;d++){const _=f[d],g=o[d];let m;const v=u[d];if(g.mode===nn.TRIANGLES||g.mode===nn.TRIANGLE_STRIP||g.mode===nn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Jd(_,v):new Te(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===nn.TRIANGLE_STRIP?m.geometry=_h(m.geometry,Uh):g.mode===nn.TRIANGLE_FAN&&(m.geometry=_h(m.geometry,ka));else if(g.mode===nn.LINES)m=new of(_,v);else if(g.mode===nn.LINE_STRIP)m=new bl(_,v);else if(g.mode===nn.LINE_LOOP)m=new af(_,v);else if(g.mode===nn.POINTS)m=new Ha(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&hx(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),yn(m,s),g.extensions&&di(i,m,g),t.assignFinalMaterial(m),a.push(m)}for(let d=0,p=a.length;d<p;d++)t.associations.set(a[d],{meshes:e,primitives:d});if(a.length===1)return s.extensions&&di(i,a[0],s),a[0];const c=new $e;s.extensions&&di(i,c,s),t.associations.set(c,{meshes:e});for(let d=0,p=a.length;d<p;d++)c.add(a[d]);return c})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(jt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ks(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,l=[],h=[];for(let u=0,f=o.length;u<f;u++){const a=o[u];if(a){l.push(a);const c=new Be;s!==null&&c.fromArray(s.array,u*16),h.push(c)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new Ml(l,h)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],l=[],h=[],u=[],f=[];for(let a=0,c=i.channels.length;a<c;a++){const d=i.channels[a],p=i.samplers[d.sampler],_=d.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,v=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),l.push(this.getDependency("accessor",m)),h.push(this.getDependency("accessor",v)),u.push(p),f.push(_))}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(h),Promise.all(u),Promise.all(f)]).then(function(a){const c=a[0],d=a[1],p=a[2],_=a[3],g=a[4],m=[];for(let M=0,S=c.length;M<S;M++){const A=c[M],w=d[M],P=p[M],x=_[M],b=g[M];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const O=n._createAnimationTracks(A,w,P,x,b);if(O)for(let C=0;C<O.length;C++)m.push(O[C])}const v=new Jf(s,void 0,m);return yn(v,i),v})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(l){if(l.isMesh)for(let h=0,u=i.weights.length;h<u;h++)l.morphTargetInfluences[h]=i.weights[h]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],l=i.children||[];for(let u=0,f=l.length;u<f;u++)o.push(n.getDependency("node",l[u]));const h=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),h]).then(function(u){const f=u[0],a=u[1],c=u[2];c!==null&&f.traverse(function(d){d.isSkinnedMesh&&d.bind(c,fx)});for(let d=0,p=a.length;d<p;d++)f.add(a[d]);if(f.userData.pivot!==void 0&&a.length>0){const d=f.userData.pivot,p=a[0];f.pivot=new R().fromArray(d),f.position.x-=d[0],f.position.y-=d[1],f.position.z-=d[2],p.position.set(0,0,0),delete f.userData.pivot}return f})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",l=[],h=i._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(e)});return h&&l.push(h),s.camera!==void 0&&l.push(i.getDependency("camera",s.camera).then(function(u){return i._getNodeRef(i.cameraCache,s.camera,u)})),i._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(e)}).forEach(function(u){l.push(u)}),this.nodeCache[e]=Promise.all(l).then(function(u){let f;if(s.isBone===!0?f=new Wh:u.length>1?f=new $e:u.length===1?f=u[0]:f=new dt,f!==u[0])for(let a=0,c=u.length;a<c;a++)f.add(u[a]);if(s.name&&(f.userData.name=s.name,f.name=o),yn(f,s),s.extensions&&di(n,f,s),s.matrix!==void 0){const a=new Be;a.fromArray(s.matrix),f.applyMatrix4(a)}else s.translation!==void 0&&f.position.fromArray(s.translation),s.rotation!==void 0&&f.quaternion.fromArray(s.rotation),s.scale!==void 0&&f.scale.fromArray(s.scale);if(!i.associations.has(f))i.associations.set(f,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const a=i.associations.get(f);i.associations.set(f,{...a})}return i.associations.get(f).nodes=e,f}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new $e;n.name&&(s.name=i.createUniqueName(n.name)),yn(s,n),n.extensions&&di(t,s,n);const o=n.nodes||[],l=[];for(let h=0,u=o.length;h<u;h++)l.push(i.getDependency("node",o[h]));return Promise.all(l).then(function(h){for(let f=0,a=h.length;f<a;f++){const c=h[f];c.parent!==null?s.add(Uv(c)):s.add(c)}const u=f=>{const a=new Map;for(const[c,d]of i.associations)(c instanceof Rn||c instanceof Et)&&a.set(c,d);return f.traverse(c=>{const d=i.associations.get(c);d!=null&&a.set(c,d)}),a};return i.associations=u(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],l=e.name?e.name:e.uuid,h=[];ei[s.path]===ei.weights?e.traverse(function(c){c.morphTargetInfluences&&h.push(c.name?c.name:c.uuid)}):h.push(l);let u;switch(ei[s.path]){case ei.weights:u=Ki;break;case ei.rotation:u=$i;break;case ei.translation:case ei.scale:u=Zi;break;default:n.itemSize===1?u=Ki:u=Zi;break}const f=i.interpolation!==void 0?ax[i.interpolation]:Fs,a=this._getArrayFromAccessor(n);for(let c=0,d=h.length;c<d;c++){const p=new u(h[c]+"."+ei[s.path],t.array,a,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ja(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof $i?ox:yu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function mx(r,e,t){const n=e.attributes,i=new Pn;if(n.POSITION!==void 0){const l=t.json.accessors[n.POSITION],h=l.min,u=l.max;if(h!==void 0&&u!==void 0){if(i.set(new R(h[0],h[1],h[2]),new R(u[0],u[1],u[2])),l.normalized){const f=Ja(Vi[l.componentType]);i.min.multiplyScalar(f),i.max.multiplyScalar(f)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const l=new R,h=new R;for(let u=0,f=s.length;u<f;u++){const a=s[u];if(a.POSITION!==void 0){const c=t.json.accessors[a.POSITION],d=c.min,p=c.max;if(d!==void 0&&p!==void 0){if(h.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),h.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),h.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),c.normalized){const _=Ja(Vi[c.componentType]);h.multiplyScalar(_)}l.max(h)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(l)}r.boundingBox=i;const o=new In;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Sh(r,e,t){const n=e.attributes,i=[];function s(o,l){return t.getDependency("accessor",o).then(function(h){r.setAttribute(l,h)})}for(const o in n){const l=ja[o]||o.toLowerCase();l in r.attributes||i.push(s(n[o],l))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(l){r.setIndex(l)});i.push(o)}return qe.workingColorSpace!==qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),yn(r,e),mx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?cx(r,e.targets,t):r})}const vs=[{x:-.88,y:-.42,z:1.58,front:!0},{x:.88,y:-.42,z:1.58,front:!0},{x:-.88,y:-.42,z:-1.64,front:!1},{x:.88,y:-.42,z:-1.64,front:!1}];class gx{constructor({physics:e,body:t}){this.physics=e,this.RAPIER=e.RAPIER,this.body=t,this.controller=e.world.createVehicleController(t),this.steering=0,this.throttle=0,this.speed=0,this.localSpeed=0,this.groundedWheels=0,this.boostCooldown=0,this.stuckTimer=0,this.lastCollisionSpeed=0,this.driveState={boost:!1,handbrake:!1,throttle:0,slip:0},this.setupWheels()}setupWheels(){this.radius=.39;for(const e of vs)this.controller.addWheel({x:e.x,y:e.y,z:e.z},{x:0,y:-1,z:0},{x:-1,y:0,z:0},.3,this.radius);for(let e=0;e<vs.length;e+=1)this.controller.setWheelFrictionSlip(e,1.82),this.controller.setWheelSideFrictionStiffness(e,9.8),this.controller.setWheelSuspensionStiffness(e,42),this.controller.setWheelSuspensionCompression(e,9.4),this.controller.setWheelSuspensionRelaxation(e,10.8),this.controller.setWheelMaxSuspensionTravel(e,.21),this.controller.setWheelMaxSuspensionForce(e,360)}update(e,t){const n=e.joystick,i=e.actions.forward||n.y<-.22,s=e.actions.backward||n.y>.22,o=e.actions.left||n.x<-.22,l=e.actions.right||n.x>.22,h=e.actions.boost&&!e.actions.handbrake,u=e.actions.handbrake,f=e.actions.brake,a=this.body.linvel(),c=this.getLocalVelocity(a);this.speed=Math.hypot(a.x,a.y*.12,a.z),this.localSpeed=c.z;const d=Math.hypot(a.x,a.z),p=jt.clamp(d/31,0,1),_=jt.clamp((o?1:0)+(l?-1:0)+jt.clamp(-n.x,-1,1),-1,1),g=jt.lerp(.54,.24,p)*(u?1.22:1),m=_*g;this.steering+=(m-this.steering)*Math.min(1,t*(u?10.5:7.8));const v=i?1:s?-.58:0,M=v===0?4.4:6.6;this.throttle+=(v-this.throttle)*Math.min(1,t*M);const S=h?38:26,w=this.throttle>=0?S:10.5,P=Math.max(0,Math.abs(this.localSpeed)-w),x=jt.clamp(Math.abs(this.localSpeed)/w,0,1.25),b=this.throttle>0&&this.localSpeed<4?1.22:1,O=this.throttle>=0?h?318:176:98;let C=this.throttle*O*b*(1-Math.min(.82,x*.72));C/=1+P*.36,h&&i&&d>3&&this.groundedWheels>1&&this.applyHeldBoost(t,a);const F=i&&this.localSpeed<-1.4||s&&this.localSpeed>1.4;let U=f?42:.08,B=f?42:.08;F&&(U=Math.max(U,30),B=Math.max(B,30)),u&&(B=Math.max(B,38),U=Math.max(U,2.5),C*=.64),!i&&!s&&this.speed<1.8&&(U=4.2,B=4.2);for(let k=0;k<vs.length;k+=1){const z=vs[k].front,G=!z;this.controller.setWheelSteering(k,z?this.steering:0),this.controller.setWheelBrake(k,G?B:U),this.controller.setWheelEngineForce(k,G?C:0),this.controller.setWheelFrictionSlip(k,this.getWheelSlip(z,u,h)),this.controller.setWheelSideFrictionStiffness(k,this.getWheelSideFriction(z,u))}return this.controller.updateVehicle(Math.min(t,1/45)),this.updateContactState(),this.applyDriftAssist(_,u,t),this.stabilizeOnGround(u),this.applyAeroGrip(t,u),this.applyStuckRecovery({forward:i,reverse:s,rawSteer:_},t),this.limitChaos(),this.lastCollisionSpeed=d,this.boostCooldown=Math.max(0,this.boostCooldown-t),this.driveState={boost:h,handbrake:u,throttle:this.throttle,slip:u&&this.speed>5?jt.clamp(this.speed/24,0,1):0},{boost:h,handbrake:u,grounded:this.groundedWheels>1}}updateContactState(){this.groundedWheels=0;for(let e=0;e<vs.length;e+=1)this.controller.wheelIsInContact(e)&&(this.groundedWheels+=1)}jump(e=6.2){return this.groundedWheels<2?!1:(this.body.applyImpulse({x:0,y:e*this.body.mass(),z:0},!0),this.body.applyTorqueImpulse({x:.08*this.body.mass(),y:0,z:0},!0),!0)}boost(e,t=18){if(this.boostCooldown>0)return;const n=this.body.mass();this.body.applyImpulse({x:e.x*t*n,y:.08*n,z:e.z*t*n},!0),this.boostCooldown=.5}flipRecovery(){const e=this.body.rotation();if(new R(0,1,0).applyQuaternion(new Ut(e.x,e.y,e.z,e.w)).y>.22)return!1;const n=this.body.mass();return this.body.applyImpulse({x:0,y:4.8*n,z:0},!0),this.body.applyTorqueImpulse({x:2.8*n,y:0,z:1.6*n},!0),!0}limitChaos(){const e=this.body.linvel(),t=this.groundedWheels>1?5.4:10;e.y>t&&this.body.setLinvel({x:e.x,y:t,z:e.z},!0);const n=this.body.angvel();this.body.setAngvel({x:jt.clamp(n.x,-2.4,2.4),y:jt.clamp(n.y,-4.2,4.2),z:jt.clamp(n.z,-2.4,2.4)},!0)}stabilizeOnGround(e=!1){if(this.groundedWheels<2)return;const t=this.body.angvel(),n=this.body.rotation(),i=new R(0,1,0).applyQuaternion(new Ut(n.x,n.y,n.z,n.w)),s=this.body.mass()*(e?.5:.76);this.body.applyTorqueImpulse({x:(-t.x*.68-i.z*.96)*s,y:-t.y*this.body.mass()*(e?.006:.016),z:(-t.z*.68+i.x*.96)*s},!0),this.speed>5&&this.body.applyImpulse({x:0,y:-Math.min(.92,this.speed*.02)*this.body.mass(),z:0},!0)}applyAeroGrip(e,t=!1){if(this.groundedWheels<2)return;const n=this.body.mass(),i=Math.min(1.85,.42+this.speed*.028)*n*(t?.82:1);this.body.applyImpulse({x:0,y:-i*Math.min(1,e*60)*.022,z:0},!0)}getWheelSlip(e,t,n){return t?e?1.7:.86:n?2.08:1.86}getWheelSideFriction(e,t){return t?e?8.4:2.35:e?10.2:9.4}getLocalVelocity(e){const t=this.body.rotation(),n=new Ut(t.x,t.y,t.z,t.w).invert();return new R(e.x,e.y,e.z).applyQuaternion(n)}getForwardVector(){const e=this.body.rotation(),t=new R(0,0,1).applyQuaternion(new Ut(e.x,e.y,e.z,e.w));return t.y=0,t.lengthSq()<1e-4?new R(0,0,1):t.normalize()}applyHeldBoost(e,t){const n=this.body.mass(),i=new R(t.x,0,t.z),s=i.lengthSq()>5?i.normalize():this.getForwardVector(),o=n*.12*Math.min(1,e*60);this.body.applyImpulse({x:s.x*o,y:-.01*n,z:s.z*o},!0)}applyDriftAssist(e,t,n){if(!t||this.groundedWheels<2||Math.abs(e)<.12||this.speed<5)return;const i=this.body.mass(),s=Math.min(1,n*60);this.body.applyTorqueImpulse({x:0,y:-e*i*.34*s,z:0},!0)}applyStuckRecovery(e,t){if(!(e.forward||e.reverse)||this.groundedWheels<2||this.speed>1.15){this.stuckTimer=0;return}if(this.stuckTimer+=t,this.stuckTimer<.48)return;const i=this.body.mass(),s=this.getForwardVector().multiplyScalar(e.forward?1:-1);this.body.applyImpulse({x:s.x*i*.7,y:i*.06,z:s.z*i*.7},!0),Math.abs(e.rawSteer)>.12&&this.body.applyTorqueImpulse({x:0,y:-e.rawSteer*i*.42,z:0},!0),this.stuckTimer=.24}}const _x=""+new URL("sabre-turbo.glb",import.meta.url).href,xs=new R(2,1.08,5.5),Yo=-.88;class vx{constructor({scene:e,physics:t,achievements:n,audio:i}){this.scene=e,this.physics=t,this.achievements=n,this.audio=i,this.RAPIER=t.RAPIER,this.group=new $e,this.group.name="Vehicle",this.modelRoot=new $e,this.modelRoot.position.y=Yo,this.group.add(this.modelRoot),this.wheels=[],this.frontWheels=[],this.speed=0,this.airTime=0,this.lastBoostPad=null,this.distanceAccumulator=0,this.lastPosition=xs.clone(),this.trails=[],this.trailGeometry=new Ys(.08,8,5),this.createBody(),this.createLights(),this.loadVehicleModel(),this.scene.add(this.group),this.respawn()}createBody(){const e=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(xs.x,xs.y,xs.z).setCanSleep(!1).setLinearDamping(.34).setAngularDamping(1.85);this.body=this.physics.world.createRigidBody(e);const t=this.RAPIER.ColliderDesc.cuboid(1.12,.25,2.42).setDensity(1.42).setFriction(1).setRestitution(.01);t.setTranslation(0,-.2,-.02),this.physics.world.createCollider(t,this.body);const n=this.RAPIER.ColliderDesc.cuboid(.96,.16,1.78).setDensity(3.35).setFriction(1.05).setRestitution(0);n.setTranslation(0,-.58,-.12),this.physics.world.createCollider(n,this.body);const i=this.RAPIER.ColliderDesc.cuboid(.64,.18,.62).setDensity(.12).setFriction(.72).setRestitution(.02);i.setTranslation(0,.3,-.1),this.physics.world.createCollider(i,this.body),this.body.setAdditionalMassProperties(6.4,{x:0,y:-.66,z:-.14},{x:5,y:4.6,z:5.9},{x:0,y:0,z:0,w:1},!0),this.controller=new gx({physics:this.physics,body:this.body})}createLights(){for(const e of[-.62,.62]){const t=new hu(16773316,4.8,26,Math.PI/10,.45,1.6);t.position.set(e,.78+Yo,2.86),t.target.position.set(e,.32+Yo,10),this.group.add(t,t.target)}}loadVehicleModel(){new vu().load(_x,t=>this.installVehicleModel(t.scene),void 0,t=>{console.error("Vehicle model failed to load",t),this.createFallbackModel()})}installVehicleModel(e){this.modelRoot.clear(),e.name="VehicleModel_SabreTurboGLB",e.traverse(t=>{t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.material?.transparent&&(t.renderOrder=7))}),this.modelRoot.add(e),this.wheels=[],this.frontWheels=[],e.traverse(t=>{t.name.startsWith("WheelMesh_")&&this.wheels.push(t),t.name.startsWith("WheelFront")&&this.frontWheels.push(t)})}createFallbackModel(){const e=new Te(new xt(2.2,.72,5),new ft({color:10304534,roughness:.38,metalness:.35}));e.position.y=.45,e.castShadow=!0,e.receiveShadow=!0,this.modelRoot.add(e)}update(e,t){const n=this.body.translation(),i=Math.hypot(n.x,n.z);if(n.y<-12||i>Dt+8||Math.abs(n.x)>Ft+18||Math.abs(n.z)>Ft+18){this.respawn();return}const s=this.controller.update(e,t);this.speed=this.controller.speed,s.boost&&this.controller.speed>3&&this.achievements.unlock("boost"),e.consume("jump")&&(this.controller.jump()?(this.achievements.unlock("jump"),this.audio.click(760)):this.controller.flipRecovery()&&this.audio.click(480)),e.consume("honk")&&(this.audio.click(320),this.body.applyImpulse({x:0,y:1.8*this.body.mass(),z:0},!0)),e.consume("respawn")&&this.respawn(),this.trackDistance(),this.syncModel(),this.updateWheelVisuals(t),this.updateTrails(t),(this.controller.speed>10||s.handbrake&&this.controller.speed>4)&&this.spawnTrail(s.boost,s.handbrake)}postPhysics(){this.syncModel()}idleDampen(){const e=this.body.linvel();this.body.setLinvel({x:e.x*.94,y:e.y,z:e.z*.94},!0),this.syncModel()}trackDistance(){const e=this.position,t=e.distanceTo(this.lastPosition);t<6&&(this.distanceAccumulator+=t,this.achievements.addDistance(t)),this.lastPosition.copy(e)}syncModel(){const e=this.body.translation(),t=this.body.rotation();this.group.position.set(e.x,e.y,e.z),this.group.quaternion.set(t.x,t.y,t.z,t.w)}updateWheelVisuals(e){for(const t of this.wheels)t.rotation.x+=this.controller.speed*e*4.2;for(const t of this.frontWheels)t.rotation.y=this.controller.steering}spawnTrail(e,t=!1){if(this.trails.length>45)return;const n=new R(0,.2,-2.6).applyQuaternion(this.group.quaternion).add(this.group.position),i=new Te(this.trailGeometry,new Tt({color:e?16751180:t?13620431:7299664,transparent:!0,opacity:e?.18:t?.16:.09,depthWrite:!1}));i.position.set(n.x+(Math.random()-.5)*.7,Math.max(.25,n.y),n.z+(Math.random()-.5)*.7),this.scene.add(i),this.trails.push({mesh:i,life:e?.46:t?.38:.28,velocity:new R((Math.random()-.5)*.28,.16+Math.random()*.18,(Math.random()-.5)*.28)})}updateTrails(e){for(let t=this.trails.length-1;t>=0;t-=1){const n=this.trails[t];n.life-=e,n.mesh.position.addScaledVector(n.velocity,e),n.mesh.scale.multiplyScalar(1+e*.9),n.mesh.material.opacity=Math.max(0,n.life)*.42,n.life<=0&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.trails.splice(t,1))}}boostFromPad(e){if(!e||this.lastBoostPad===e.id)return;this.lastBoostPad=e.id;const t=this.body.linvel(),n=new R(t.x,0,t.z);let i=n.lengthSq()>1?n.normalize():new R(0,0,1).applyQuaternion(this.group.quaternion).normalize();this.controller.boost(i,20),this.achievements.unlock("boost_pad"),this.audio.click(940),window.setTimeout(()=>{this.lastBoostPad===e.id&&(this.lastBoostPad=null)},550)}respawn(e=xs,t=0){this.body.setTranslation({x:e.x,y:e.y,z:e.z},!0),this.body.setRotation(xx(t),!0),this.body.setLinvel({x:0,y:0,z:0},!0),this.body.setAngvel({x:0,y:0,z:0},!0),this.speed=0,this.lastPosition.copy(e),this.syncModel()}get position(){const e=this.body.translation();return new R(e.x,e.y,e.z)}get heading(){const e=this.body.rotation(),t=new Ut(e.x,e.y,e.z,e.w),n=new R(0,0,1).applyQuaternion(t);return Math.atan2(n.x,n.z)}}function xx(r){const e=new Ut().setFromEuler(new ln(0,r,0));return{x:e.x,y:e.y,z:e.z,w:e.w}}class yx{constructor(e,t,n){this.camera=e,this.vehicle=t,this.input=n,this.focus=new R,this.smoothedTarget=new R,this.mode="follow",this.cinematicTarget=null,this.cinematicPosition=null,this.baseFov=e.fov}setCinematic(e,t){this.mode="cinematic",this.cinematicPosition=e.clone(),this.cinematicTarget=t.clone()}clearCinematic(){this.mode="follow",this.cinematicPosition=null,this.cinematicTarget=null}update(e){if(this.mode==="cinematic"&&this.cinematicPosition&&this.cinematicTarget){this.camera.position.lerp(this.cinematicPosition,1-Math.pow(.002,e)),this.smoothedTarget.lerp(this.cinematicTarget,1-Math.pow(.004,e)),this.camera.lookAt(this.smoothedTarget);return}const t=this.vehicle.position,n=this.vehicle.body.rotation(),i=new Ut(n.x,n.y,n.z,n.w),s=new R(0,0,1).applyQuaternion(i).setY(0).normalize(),o=new R(1,0,0).applyQuaternion(i).setY(0).normalize(),l=this.vehicle.body.linvel(),h=new R(l.x,0,l.z).dot(o),u=jt.clamp(h/12,-1.8,1.8),f=this.vehicle.controller?.driveState||{},a=this.input.pointer.orbitX,c=new Ut().setFromAxisAngle(new R(0,1,0),a),d=s.clone().applyQuaternion(c),p=jt.clamp(Math.abs(this.vehicle.speed)*.16,0,4),_=this.input.pointer.zoom,g=this.input.pointer.orbitY,m=t.clone().add(new R(0,1.35,0)).addScaledVector(d,4.2).addScaledVector(o,u*.22),v=t.clone().addScaledVector(d,(-13.5-p)*_).addScaledVector(o,-u*(f.handbrake?1.05:.58)).add(new R(0,7.2+p*.18+g*4.5,0)),M=1-Math.pow(.001,e),S=1-Math.pow(5e-4,e);this.camera.position.lerp(v,M*.62),this.smoothedTarget.lerp(m,S*.7);const A=this.baseFov+Math.min(6.5,Math.abs(this.vehicle.speed)*.12)+(f.boost?2.4:0)+(f.handbrake?1.2:0);this.camera.fov+=(A-this.camera.fov)*Math.min(1,e*4.2),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.smoothedTarget)}}const Mx=""+new URL("island-visual.glb",import.meta.url).href,Sx=""+new URL("island-physics.glb",import.meta.url).href,bx=""+new URL("medieval-props.glb",import.meta.url).href;async function Tx(){const r=new vu,e=new Map,t=new Map;return await Promise.all([Ko(r,"islandVisual",Mx,e,t),Ko(r,"islandPhysics",Sx,e,t),Ko(r,"medievalProps",bx,e,t)]),{has(n){return t.has(n)},clone(n){const i=t.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0,o.material&&(o.material=o.material.clone()))}),s},cloneScene(n){const i=e.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.visible=!0,o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0,o.material&&(o.material=o.material.clone()))}),s}}}async function Ko(r,e,t,n,i){try{const o=(await r.loadAsync(t)).scene;o.name=e,o.visible=!1,n.set(e,o),o.traverse(l=>{l.parent===o&&(l.name.startsWith("Env")||l.name.startsWith("VIS_")||l.name.startsWith("PHY_")||l.name.startsWith("SPAWN_")||l.name.startsWith("ZONE_"))&&(l.visible=!1,i.set(l.name,l)),l.isMesh&&(l.castShadow=!0,l.receiveShadow=!0)})}catch(s){console.error(`Environment asset pack failed to load: ${e}`,s)}}class wx{constructor(e){this.world=e,this.clouds=[],this.sunDisk=null}build(){this.createSkyDome(),this.createClouds()}createSkyDome(){const e=new Ys(Ft*3.2,48,24),t=new Ot({side:Xt,uniforms:{zenith:{value:new me(3055337)},upper:{value:new me(7787007)},horizon:{value:new me(15914666)},low:{value:new me(11135220)}},vertexShader:`
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
      `}),n=new Te(e,t);n.name="MedievalIslandSkyDome",this.world.scene.add(n);const i=new Tt({color:16770213,transparent:!0,opacity:.78,depthWrite:!1});this.sunDisk=new Te(new Ws(18,48),i),this.sunDisk.name="CinematicSunDisk",this.sunDisk.position.set(-155,84,-125),this.sunDisk.lookAt(0,22,0),this.world.scene.add(this.sunDisk)}createClouds(){const e=this.world.getQualityProfile();for(let t=0;t<e.clouds;t+=1){const n=new $e;n.name=`Cloud_${t}`;const i=new Tt({color:t%4===0?16773853:16777215,transparent:!0,opacity:.64,depthWrite:!1}),s=6+t%4;for(let h=0;h<s;h+=1){const u=new Te(new qs(3.2+h%3*.55,2),i);u.position.set((h-s/2)*3.1,Math.sin(h*1.8)*.7,Math.cos(h*2.1)*1.65),u.scale.set(1.55+h%2*.28,.46,.84+h%3*.12),n.add(u)}const o=t/e.clouds*Math.PI*2,l=132+t%5*26;n.position.set(Math.cos(o)*l,58+t%4*6,Math.sin(o)*l),n.rotation.y=o,n.scale.setScalar(.9+t%5*.12),this.world.scene.add(n),this.clouds.push(n)}}update(e,t){this.sunDisk&&(this.sunDisk.material.opacity=.68+Math.sin(t*.18)*.06);for(let n=0;n<this.clouds.length;n+=1){const i=this.clouds[n];i.rotation.y+=e*(.01+n*35e-5),i.position.x+=Math.sin(t*.035+n)*e*.1,i.position.z+=Math.cos(t*.025+n*.7)*e*.06}}}const Qa=-.55,ii={low:{trees:30,grassTufts:110,leaves:50,clouds:8,props:22,fireflies:18,shadows:!1,water:"low"},medium:{trees:58,grassTufts:300,leaves:135,clouds:16,props:44,fireflies:46,shadows:!0,water:"medium"},high:{trees:86,grassTufts:640,leaves:260,clouds:28,props:72,fireflies:90,shadows:!0,water:"high"}},$o=["low","medium","high"];function Ex(){const r=Ix(1024);r.wrapS=sn,r.wrapT=sn,r.repeat.set(58,58),r.magFilter=bt,r.minFilter=Tn,r.anisotropy=12;const e=Cx(["#605c50","#756f61","#8b8472","#46443e"],256,1400);e.wrapS=sn,e.wrapT=sn,e.repeat.set(2,18);const t=Px(512);return t.wrapS=sn,t.wrapT=sn,t.repeat.set(18,18),t.anisotropy=12,{ground:new ft({color:3501871,map:r,roughness:.96,metalness:.01,vertexColors:!1,side:Jt}),stoneRoad:new ft({color:6117453,map:e,roughness:.94,metalness:.02}),roadEdge:new ft({color:3092523,roughness:.9,metalness:.04}),roadLine:new Tt({color:14206090,transparent:!0,opacity:.36}),sand:new ft({color:16045466,map:t,roughness:.98,metalness:0}),cliff:new ft({color:6050118,roughness:.92,metalness:.01}),shallow:new Tt({color:7984848,transparent:!0,opacity:.16,depthWrite:!1}),foam:new Tt({color:15859702,transparent:!0,opacity:.26,depthWrite:!1}),wood:new ft({color:7029797,roughness:.86,metalness:.02}),darkWood:new ft({color:2890257,roughness:.88,metalness:.03}),stone:new ft({color:8550760,roughness:.86,metalness:.04}),paleStone:new ft({color:12892573,roughness:.82,metalness:.03}),roof:new ft({color:2701381,roughness:.78,metalness:.08}),bannerRed:new ft({color:10760496,roughness:.78,metalness:.03}),bannerBlue:new ft({color:2973574,roughness:.78,metalness:.03}),gold:new ft({color:14727503,roughness:.42,metalness:.45}),glass:new ft({color:7985151,roughness:.22,metalness:.08,transparent:!0,opacity:.62}),glow:new Tt({color:9437136,transparent:!0,opacity:.72}),potato:new ft({color:11891755,roughness:.94,metalness:0}),crop:new ft({color:6531408,roughness:.9,metalness:0}),water:Rx(),leaf:new Tt({color:16757436,transparent:!0,opacity:.62,depthWrite:!1}),firefly:new Tt({color:13107082,transparent:!0,opacity:.8,depthWrite:!1})}}function Ax(r,e=160){const t=new Ws(r,e),n=t.attributes.position,i=[],s=new me(2050597),o=new me(3501871),l=new me(6262594),h=new me(9008717),u=new me;for(let f=0;f<n.count;f+=1){const a=n.getX(f),c=n.getY(f),d=Math.hypot(a,c)/r,p=we(f*13.71)*.18,_=jt.smoothstep(d,.74,1);u.copy(s).lerp(o,Math.min(1,d*.85+p)),u.lerp(l,Math.max(0,.55-d)*.45),u.lerp(h,_*.45),i.push(u.r,u.g,u.b),n.setZ(f,(we(f*9.17)-.5)*.12)}return t.setAttribute("color",new Ze(i,3)),t.rotateX(-Math.PI/2),t.computeVertexNormals(),t}function Or(r,e,t=160,n=3.4){const i=new Qh;for(let l=0;l<=t;l+=1){const h=l/t*Math.PI*2,u=e+(we(l*4.11)-.5)*n,f=Math.cos(h)*u,a=Math.sin(h)*u;l===0?i.moveTo(f,a):i.lineTo(f,a)}const s=new Wa;for(let l=t;l>=0;l-=1){const h=l/t*Math.PI*2,u=r+(we(l*5.77)-.5)*n*.45,f=Math.cos(h)*u,a=Math.sin(h)*u;l===t?s.moveTo(f,a):s.lineTo(f,a)}i.holes.push(s);const o=new Rl(i);return o.rotateX(-Math.PI/2),o.computeVertexNormals(),o}function Rx(){return new Ot({transparent:!0,depthWrite:!1,uniforms:{time:{value:0},deep:{value:new me(409190)},shallow:{value:new me(3721171)},sun:{value:new me(16773560)}},vertexShader:`
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
    `})}function Cx(r,e=256,t=800){const n=document.createElement("canvas");n.width=e,n.height=e;const i=n.getContext("2d");i.fillStyle=r[0],i.fillRect(0,0,e,e);for(let s=0;s<t;s+=1){i.fillStyle=r[Math.floor(we(s*11.3)*r.length)];const o=we(s*17.1)*e,l=we(s*23.7)*e,h=1+we(s*31.1)*4;i.globalAlpha=.16+we(s*7.5)*.24,i.beginPath(),i.arc(o,l,h,0,Math.PI*2),i.fill()}return i.globalAlpha=1,new Kr(n)}function Px(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,r,r);n.addColorStop(0,"#d1a869"),n.addColorStop(.45,"#f0d392"),n.addColorStop(1,"#b9894e"),t.fillStyle=n,t.fillRect(0,0,r,r);for(let i=0;i<9e3;i+=1){const s=we(i*2.13)*r,o=we(i*3.79)*r,l=.45+we(i*5.11)*1.4,h=we(i*7.71);t.globalAlpha=.08+we(i*11.17)*.14,t.fillStyle=h>.54?"#fff1be":"#8f6538",t.beginPath(),t.arc(s,o,l,0,Math.PI*2),t.fill()}for(let i=0;i<90;i+=1){const s=we(i*17.3)*r,o=we(i*19.9)*r;t.globalAlpha=.05,t.strokeStyle="#7d5a35",t.lineWidth=1+we(i*23.5)*2,t.beginPath(),t.ellipse(s,o,14+we(i*29.1)*38,2+we(i*31.7)*6,we(i*37.1)*Math.PI,0,Math.PI*2),t.stroke()}return t.globalAlpha=1,new Kr(e)}function Ix(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d");t.fillStyle="#1e4d21",t.fillRect(0,0,r,r);for(let n=0;n<24e3;n+=1){const i=we(n*2.37)*r,s=we(n*5.81)*r,o=2+we(n*7.61)*9,l=-Math.PI/2+(we(n*11.43)-.5)*.9,h=we(n*13.17);t.globalAlpha=.06+we(n*17.77)*.16,t.strokeStyle=h>.68?"#76a84b":h>.32?"#2e6d2b":"#102f18",t.lineWidth=.55+we(n*19.21)*1.1,t.beginPath(),t.moveTo(i,s),t.lineTo(i+Math.cos(l)*o,s+Math.sin(l)*o),t.stroke()}for(let n=0;n<520;n+=1){const i=we(n*23.31)*r,s=we(n*31.27)*r,o=6+we(n*41.13)*22;t.globalAlpha=.035,t.fillStyle=we(n*47.4)>.55?"#669c46":"#0d2815",t.beginPath(),t.ellipse(i,s,o,o*(.25+we(n*53.3)*.4),we(n*59.7)*Math.PI,0,Math.PI*2),t.fill()}return t.globalAlpha=1,new Kr(e)}function we(r){return Math.sin(r*999.91)*43758.5453%1+(Math.sin(r*999.91)*43758.5453<0?1:0)}class Lx{constructor(e){this.world=e,this.trees=[],this.grassTufts=[],this.leafCloud=null,this.fireflies=null}build(){this.placeTrees(),this.placeGrass(),this.createFallingLeaves(),this.createFireflies(),this.applyQuality()}applyQuality(){const e=this.world.getQualityProfile();for(let t=0;t<this.trees.length;t+=1)this.trees[t].visible=t<e.trees;for(let t=0;t<this.grassTufts.length;t+=1)this.grassTufts[t].mesh.visible=t<e.grassTufts;this.leafCloud?.geometry.setDrawRange(0,e.leaves),this.fireflies?.geometry.setDrawRange(0,e.fireflies)}placeTrees(){const e=ii.high.trees,t=Math.ceil(e/Go.length);let n=0;for(let i=0;i<Go.length&&n<e;i+=1){const s=Go[i],o=Math.min(e-n,t+(s.kind==="grove"?4:s.kind==="meadow"?-2:0));let l=0;for(let h=0;h<360&&l<o;h+=1){const u=i*1e3+h,f=s.center[0]+(we(u*7.13)-.5)*s.size[0],a=s.center[1]+(we(u*9.41)-.5)*s.size[1],c=Math.hypot(f,a);if(c>Dt*.86||c<18||!this.world.isClearForProp(f,a,4.6))continue;const d=Dx(s,u),p=this.world.cloneEnvironmentAsset(d)||this.createFallbackTree();p.position.set(f,.04,a),p.rotation.y=we(u*13.3)*Math.PI*2;const _=.82+we(u*17.1)*.55;p.scale.setScalar(_),this.world.scene.add(p),this.world.decor.push({type:"tree",mesh:p}),this.trees.push(p),this.addTreeCollider(f,a,_),n+=1,l+=1}}}placeGrass(){const e=this.world.cloneEnvironmentAsset("EnvGrassTuft"),t=new Xs(.12,1,5);for(let n=0;n<ii.high.grassTufts;n+=1){const i=Math.sqrt(we(n*8.1))*Dt*.78,s=we(n*5.3)*Math.PI*2,o=Math.cos(s)*i,l=Math.sin(s)*i;if(!this.world.isClearForProp(o,l,1.3))continue;const h=e?e.clone(!0):new Te(t,this.world.materials.crop);h.position.set(o,.05,l),h.rotation.y=we(n*19.4)*Math.PI*2;const u=.45+we(n*22.9)*.78;h.scale.set(u,u,u),this.world.scene.add(h),this.grassTufts.push({mesh:h,baseRotationY:h.rotation.y,baseScale:u,x:o,z:l})}}createFallingLeaves(){const e=ii.high.leaves,t=new gt,n=new Float32Array(e*3),i=[];for(let l=0;l<e;l+=1){const h=Math.sqrt(we(l*1.7))*Dt*.78,u=we(l*2.3)*Math.PI*2;n[l*3]=Math.cos(u)*h,n[l*3+1]=4+we(l*3.1)*18,n[l*3+2]=Math.sin(u)*h,i.push(we(l*4.4)*Math.PI*2)}t.setAttribute("position",new At(n,3));const s=this.world.materials.leaf,o=new Ha(t,s);o.name="MedievalIslandFallingLeaves",this.world.scene.add(o),this.leafCloud={mesh:o,geometry:t,phases:i}}createFireflies(){const e=ii.high.fireflies,t=new gt,n=new Float32Array(e*3),i=[];for(let o=0;o<e;o+=1){const l=Math.sqrt(we(o*4.9))*Dt*.62,h=we(o*6.1)*Math.PI*2;n[o*3]=Math.cos(h)*l,n[o*3+1]=1.1+we(o*7.2)*3.2,n[o*3+2]=Math.sin(h)*l,i.push(we(o*8.3)*Math.PI*2)}t.setAttribute("position",new At(n,3));const s=new Ha(t,this.world.materials.firefly);s.name="MedievalIslandFireflies",this.world.scene.add(s),this.fireflies={mesh:s,geometry:t,phases:i}}update(e,t,n){if(this.updateLeaves(e,t),this.updateGrass(n,t),this.fireflies){const i=this.fireflies.geometry.attributes.position;for(let s=0;s<i.count;s+=1){const o=this.fireflies.phases[s];i.setY(s,i.getY(s)+Math.sin(t*1.4+o)*.0025)}i.needsUpdate=!0,this.fireflies.mesh.material.opacity=.5+Math.sin(t*1.6)*.18}}updateLeaves(e,t){if(!this.leafCloud)return;const n=this.leafCloud.geometry.attributes.position,i=this.world.getQualityProfile(),s=Math.min(i.leaves,n.count);for(let o=0;o<s;o+=1){const l=this.leafCloud.phases[o];n.setX(o,n.getX(o)+Math.sin(t*.8+l)*e*.4),n.setY(o,n.getY(o)-e*(.55+we(o*3.6)*.55)),n.setZ(o,n.getZ(o)+Math.cos(t*.7+l)*e*.35),n.getY(o)<.35&&n.setY(o,8+we(o*5.2)*14)}n.needsUpdate=!0}updateGrass(e,t){if(!e)return;const n=this.world.getQualityProfile(),i=Math.min(n.grassTufts,this.grassTufts.length);for(let s=0;s<i;s+=1){const o=this.grassTufts[s],l=e.x-o.x,h=e.z-o.z,u=Math.hypot(l,h),f=Math.max(0,1-u/5),a=Math.sin(t*1.5+o.x*.07+o.z*.04)*.08;o.mesh.rotation.z=a+f*.34,o.mesh.scale.y=o.baseScale*(1-f*.28+Math.sin(t*1.2+s)*.02)}}createFallbackTree(){const e=new $e,t=new Te(new mn(.28,.38,3,8),this.world.materials.wood);t.position.y=1.5;const n=new Te(new qs(1.6,1),this.world.materials.crop);return n.position.y=3.35,e.add(t,n),e}addTreeCollider(e,t,n){const i=.82*n,s=.2*n;this.world.physics.createFixedCylinder([e,i,t],i,s,{friction:.88,restitution:.01})}}function Dx(r,e){const t=we(e*11.31);return r.kind==="coast"?t>.35?"EnvCypressTree":"EnvBlossomTree":r.kind==="meadow"?t>.58?"EnvBlossomTree":"EnvOakTree":r.kind==="farm"?t>.42?"EnvBlossomTree":"EnvOakTree":t>.22?"EnvBlossomTree":"EnvOakTree"}class Nx{constructor(e){this.world=e,this.group=null,this.counterTexture=null,this.counterMaterial=null,this.count=0}build(){const e=this.world.zones.find(t=>t.id==="potato");e&&(this.group=new $e,this.group.name="ZONE_potato_voxel_farm",this.group.position.copy(e.position),this.group.rotation.y=e.rotation||0,this.world.scene.add(this.group),this.addField(),this.addCounter(),this.addSummonPad(),this.addFenceColliders(e))}addField(){const e=this.world.cloneEnvironmentAsset("EnvPotatoFarm");if(e){e.name="EnvPotatoFarm_BlockyVoxelField",e.position.set(0,0,0),e.rotation.y=0,this.group.add(e);return}for(let t=-3;t<=3;t+=1)for(let n=-4;n<=4;n+=1){const i=n===0,s=new Te(new xt(1.25,.34,1.25),i?this.world.materials.water:this.world.materials.darkWood);if(s.position.set(n*1.34,.16,t*1.34),this.group.add(s),!i&&(t+n)%2===0){const o=this.world.cloneEnvironmentAsset("EnvPotatoCrop")||new Te(new xt(.42,.62,.42),this.world.materials.crop);o.position.set(n*1.34,.68,t*1.34),o.rotation.y=we((t+8)*(n+10))*Math.PI*2,this.group.add(o)}}this.addFence()}addFence(){const e=this.world.cloneEnvironmentAsset("EnvFencePost");for(let t=-6;t<=6;t+=1.5)this.addFencePiece(e,t,.8,-5.5,0),this.addFencePiece(e,t,.8,5.5,0);for(let t=-4.5;t<=4.5;t+=1.5)this.addFencePiece(e,-6.4,.8,t,Math.PI/2),this.addFencePiece(e,6.4,.8,t,Math.PI/2)}addFencePiece(e,t,n,i,s){const o=e?e.clone(!0):new Te(new xt(.22,1.35,.22),this.world.materials.wood);o.position.set(t,n,i),o.rotation.y=s,this.group.add(o)}addCounter(){this.counterTexture=bh(this.count),this.counterMaterial=new Tt({map:this.counterTexture,transparent:!0,side:Jt});const e=new Te(new Qi(5.35,1.72),this.counterMaterial);e.name="PotatoCounterRoadFacing",e.position.set(0,2.25,7.2),this.group.add(e);const t=new Te(new xt(5.7,2.05,.2),this.world.materials.darkWood);t.position.set(0,2.25,7.08);const n=new Te(new xt(.18,2.7,.18),this.world.materials.wood);n.position.set(-2.95,1.45,7.02);const i=n.clone();i.position.x=2.95,this.group.add(t,n,i)}addSummonPad(){const e=new Te(new mn(1.6,1.8,.2,6),new ft({color:8191922,emissive:1456166,roughness:.62,metalness:.08}));e.name="PotatoSummonPad",e.position.set(0,.28,9.45),this.group.add(e)}addFenceColliders(e){const t=e.rotation||0;for(const n of[{local:[0,.84,-6.25],size:[15.8,1.7,.34]},{local:[0,.84,6.25],size:[15.8,1.7,.34]},{local:[-7.75,.84,0],size:[.34,1.7,12.5]},{local:[7.75,.84,0],size:[.34,1.7,12.5]}]){const i=new R(n.local[0],n.local[1],n.local[2]).applyAxisAngle(new R(0,1,0),t);this.world.physics.createFixedBox([e.position.x+i.x,i.y,e.position.z+i.z],n.size,{rotation:[0,t,0],friction:.92,restitution:.02})}}setPotatoCount(e){if(this.count=e,!this.counterTexture)return;const t=bh(e);this.counterMaterial.map=t,this.counterMaterial.needsUpdate=!0,this.counterTexture.dispose(),this.counterTexture=t}spawnPotato(){const e=this.world.zones.find(i=>i.id==="potato");if(!e)return null;const t=this.world.cloneEnvironmentAsset("EnvMinecraftPotato")||new Te(new xt(.75,.55,.55),this.world.materials.potato),n=new R((Math.random()-.5)*7.2,2.5,(Math.random()-.5)*5.8).applyAxisAngle(new R(0,1,0),e.rotation||0);return t.position.copy(e.position).add(n),t.rotation.set(Math.random()*.4,Math.random()*Math.PI*2,Math.random()*.4),t.scale.setScalar(.8+Math.random()*.35),this.world.scene.add(t),this.world.potatoes.push({mesh:t,life:22}),t}update(e){for(let t=this.world.potatoes.length-1;t>=0;t-=1){const n=this.world.potatoes[t];n.life-=e,n.mesh.rotation.y+=e*1.2,n.mesh.position.y+=Math.sin(n.life*6)*e*.2,n.life<=0&&(this.world.scene.remove(n.mesh),this.world.potatoes.splice(t,1))}}}function bh(r){const e=document.createElement("canvas");e.width=512,e.height=192;const t=e.getContext("2d");t.fillStyle="#2a160c",t.fillRect(0,0,e.width,e.height);for(let i=0;i<e.width;i+=32)t.fillStyle=i%64===0?"#4b2a15":"#3a1f11",t.fillRect(i,0,28,e.height);t.strokeStyle="#d7a357",t.lineWidth=10,t.strokeRect(18,18,e.width-36,e.height-36),t.fillStyle="#f7e1a3",t.textAlign="center",t.font="800 34px Arial",t.fillText("POTATOES",e.width/2,75),t.font="900 64px Arial",t.fillText(String(r),e.width/2,145);const n=new Kr(e);return n.anisotropy=6,n}class Fx{constructor(e){this.world=e,this.items=[]}build(){this.placeRoadLanterns(),this.placeScenicProps(),this.placeShoreRocks()}placeRoadLanterns(){let e=0;for(const t of this.world.roadSegments){if(e>=this.world.getQualityProfile().props*.32)break;const[n,i,s,o,l]=t;if(o<18)continue;const h=Math.max(1,Math.floor(o/28));for(let u=0;u<h&&e<24;u+=1){const f=(u+.5)/h-.5,a=we(e*4.1)>.5?1:-1,c=n+Math.sin(l)*o*f+Math.cos(l)*(s*.92)*a,d=i+Math.cos(l)*o*f-Math.sin(l)*(s*.92)*a;if(!this.world.terrain.containsPoint(c,d,12))continue;const p=this.world.cloneEnvironmentAsset("EnvMedievalLantern")||this.createLantern();p.position.set(c,.2,d),p.rotation.y=l+Math.PI*(a>0?.5:-.5),this.world.scene.add(p),this.items.push(p),e+=1}}}placeScenicProps(){const e=[["EnvBench",-8,48,-.35,.92],["EnvBench",34,55,.42,.92],["EnvBench",38,23,2.86,.88],["EnvBench",-34,40,-.2,.86],["EnvBench",-133,69,.98,.9],["EnvBench",-121,50,.36,.86],["EnvBench",-86,96,-.8,.86],["EnvCrate",145,78,.2,.92],["EnvBarrel",141,84,-.2,.86],["EnvCrate",78,57,.38,.88],["EnvBarrel",84,51,-.4,.82],["EnvCrate",31,93,.12,.82],["EnvBarrel",36,92,-.34,.78],["EnvBench",-138,-12,1.34,.86],["EnvBench",-111,-88,.7,.86],["EnvBench",104,-34,-.85,.86],["EnvBench",-20,-102,.18,.84],["EnvCrate",-145,34,.34,.84],["EnvBarrel",-135,39,-.22,.8]];for(const[t,n,i,s,o]of e)this.world.isClearForProp(n,i,t.includes("Bench")?2.1:1.5)&&this.addPlacedProp({name:t,x:n,z:i,rotation:s,scale:o})}placeShoreRocks(){const e=this.world.landscapeQuality==="low"?22:this.world.landscapeQuality==="medium"?30:38;for(let t=0;t<e;t+=1){const n=t/e*Math.PI*2+(we(t*6.4)-.5)*.18,i=Dt*(.88+we(t*11.2)*.1),s=Math.cos(n)*i,o=Math.sin(n)*i;if(this.world.roads.isNear(s,o,6.5))continue;const l=this.world.cloneEnvironmentAsset("EnvShoreRock")||this.createRock();l.position.set(s,.08,o),l.rotation.y=we(t*3.7)*Math.PI*2,l.scale.setScalar(.72+we(t*7.3)*1.25),this.world.scene.add(l),this.groundObject(l,.03),this.items.push(l),this.world.physics.createFixedBall([s,.34*l.scale.x,o],.42*l.scale.x,{friction:.95,restitution:.01})}}addPlacedProp({name:e,x:t,z:n,rotation:i,scale:s}){if(e.includes("Bench")){const l=new Te(new xt(2.85*s,.035,1.1*s),this.world.materials.paleStone);l.name="PROP_BenchStonePad",l.position.set(t,.085,n),l.rotation.y=i,l.receiveShadow=!0,this.world.scene.add(l),this.items.push(l)}const o=this.world.cloneEnvironmentAsset(e)||this.createFallbackProp(e);o.position.set(t,.12,n),o.rotation.y=i,o.scale.setScalar(s),this.world.scene.add(o),this.groundObject(o,.035),this.items.push(o)}groundObject(e,t=.04){e.updateMatrixWorld(!0);const n=new Pn().setFromObject(e);Number.isFinite(n.min.y)&&(e.position.y+=t-n.min.y)}createLantern(){const e=new $e,t=new Te(new mn(.08,.12,3.2,8),this.world.materials.darkWood);t.position.y=1.6;const n=new Te(new xt(.9,.08,.08),this.world.materials.darkWood);n.position.set(.34,3,0);const i=new Te(new Ys(.22,12,8),this.world.materials.glow);i.position.set(.82,2.75,0);const s=new Ps(16761706,1.6,18,2.2);return s.position.copy(i.position),e.add(t,n,i,s),e}createFallbackProp(e){if(e.includes("Barrel"))return new Te(new mn(.45,.5,1.05,10),this.world.materials.wood);if(e.includes("Crate"))return new Te(new xt(1,1,1),this.world.materials.darkWood);if(e.includes("Bench")){const t=new $e,n=new Te(new xt(1.9,.18,.45),this.world.materials.wood);return n.position.y=.55,t.add(n),t}return this.createRock()}createRock(){return new Te(new qs(.9,1),this.world.materials.stone)}}const Rr={ring:{shoulder:1.6,line:14730347},avenue:{shoulder:1.3,line:14075042},street:{shoulder:1.1,line:13153162},stunt:{shoulder:1.4,line:16751469},dirt:{shoulder:1.8,line:9265976},bridge:{shoulder:1.4,line:15265264}};class Ux{constructor(e){this.world=e,this.segments=Za}build(){for(const e of Ll)this.addPath(e)}addPath(e){const t=e.closed?e.points.length:e.points.length-1;for(let n=0;n<t;n+=1){const i=e.points[n],s=e.points[(n+1)%e.points.length];this.addSegment(i,s,e)}for(const n of e.points)this.addNode(n,e)}addSegment(e,t,n){const i=t[0]-e[0],s=t[1]-e[1],o=Math.hypot(i,s),l=(e[0]+t[0])/2,h=(e[1]+t[1])/2,u=Math.atan2(i,s),f=Rr[n.hierarchy]||Rr.street,a=n.width,c=n.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadEdge,d=n.hierarchy==="dirt"?this.world.materials.wood:this.world.materials.stoneRoad,p=new Te(new xt(a+f.shoulder*2,.026,o+a*.45),c);p.name=`ROAD_${n.id}_shoulder`,p.position.set(l,.072,h),p.rotation.y=u,p.receiveShadow=!0,this.world.scene.add(p);const _=new Te(new xt(a,.032,o+a*.28),d);_.name=`ROAD_${n.id}_stone`,_.position.set(l,.102,h),_.rotation.y=u,_.receiveShadow=!0,this.world.scene.add(_);const g=this.world.materials.roadLine.clone();g.color.setHex(f.line);const m=Math.max(1,Math.floor(o/12));for(let v=0;v<m;v+=1){const M=new Te(new xt(.38,.035,3.2),g),S=(v+.5)/m-.5;M.position.set(l+Math.sin(u)*o*S,.132,h+Math.cos(u)*o*S),M.rotation.y=u,this.world.scene.add(M)}this.world.physics.createFixedBox([l,.025,h],[a+f.shoulder*2,.05,o+a*.45],{rotation:[0,u,0],friction:n.hierarchy==="dirt"?.82:1.15,restitution:.01})}addNode(e,t){const n=Rr[t.hierarchy]||Rr.street,i=t.width*.42+n.shoulder*.62,s=t.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadEdge,o=t.hierarchy==="dirt"?this.world.materials.wood:this.world.materials.stoneRoad,l=new Te(new mn(i,i,.03,34),s);l.name=`ROAD_${t.id}_node`,l.position.set(e[0],.077,e[1]),l.receiveShadow=!0,this.world.scene.add(l);const h=new Te(new mn(i-n.shoulder*.55,i-n.shoulder*.55,.034,34),o);h.position.set(e[0],.106,e[1]),h.receiveShadow=!0,this.world.scene.add(h)}isNear(e,t,n=0){return Za.some(([i,s,o,l,h])=>{const u=e-i,f=t-s,a=Math.cos(h)*u-Math.sin(h)*f,c=Math.sin(h)*u+Math.cos(h)*f;return Math.abs(a)<=o/2+n&&Math.abs(c)<=l/2+n})}}class Ox{constructor(e){this.world=e}build(){this.createRamps(),this.createBoostPads()}createRamps(){const e=Hs.find(s=>s.id==="drift");if(!e)return;const t=e.position[0],n=e.position[2],i=[{id:"cove-main-ramp",x:t-14,z:n-18,y:.12,rot:Math.PI/2,width:8.8,length:22,height:2.1}];for(const s of i){const o=Bx(s.width,s.length,s.height),l=new Te(o.geometry,this.world.materials.roadEdge);l.name=`STUNT_${s.id}`,l.position.set(s.x,s.y,s.z),l.rotation.y=s.rot,l.castShadow=!0,l.receiveShadow=!0,this.world.scene.add(l),this.world.ramps.push({id:s.id,position:new R(s.x,0,s.z),radius:11,triggered:!1}),this.world.physics.createFixedTrimesh([s.x,s.y,s.z],o.vertices,o.indices,{rotation:[0,s.rot,0],friction:.92,restitution:.02}),this.addGuardrails(s)}}addGuardrails(e){for(const t of[-1,1]){const n=new Te(new xt(.25,.55,e.length),this.world.materials.paleStone);n.position.set(e.x+Math.cos(e.rot)*e.width*.55*t,1.1,e.z-Math.sin(e.rot)*e.width*.55*t),n.rotation.y=e.rot,this.world.scene.add(n)}}createBoostPads(){for(const e of Ev){const t=new $e;t.name=`BOOST_${e.id}`,t.position.set(e.position[0],.35,e.position[2]),t.rotation.y=e.rotation||0;const n=new Te(new mn(2.2,2.4,.22,6),new ft({color:e.color,emissive:new me(e.color).multiplyScalar(.22),roughness:.42})),i=new Te(new Xs(.9,2.4,3),this.world.materials.glow);i.position.z=.5,i.rotation.x=Math.PI/2,t.add(n,i),this.world.scene.add(t),this.world.boostPads.push({...e,position:new R(e.position[0],0,e.position[2])})}}}function Bx(r,e,t){const n=r/2,i=e/2,s=-.18,o=-.82,l=new Float32Array([-n,s,-i,n,s,-i,n,t,i,-n,t,i,-n,o,-i,n,o,-i,n,o,i,-n,o,i]),h=new Uint32Array([0,1,2,0,2,3,4,7,6,4,6,5,0,4,5,0,5,1,3,2,6,3,6,7,0,3,7,0,7,4,1,5,6,1,6,2]),u=new gt;return u.setAttribute("position",new At(l,3)),u.setIndex(new At(h,1)),u.computeVertexNormals(),{geometry:u,vertices:l,indices:h}}class kx{constructor(e){this.world=e,this.authoredIslandLoaded=!1}build(){this.authoredIslandLoaded=this.addAuthoredIsland(),this.authoredIslandLoaded||(this.addFallbackGround(),this.addBeachAndCliffs()),this.addPhysicsFloor()}addAuthoredIsland(){const e=this.world.environmentAssets?.cloneScene?.("islandVisual");return e?(e.name="MedievalIslandVisual",e.traverse(t=>{if(/^(SPAWN_|ZONE_|WATER_)/.test(t.name)){t.visible=!1;return}t.isMesh&&(t.geometry?.computeVertexNormals?.(),t.name.includes("IslandTerrain")?t.material=this.world.materials.ground:t.name.includes("Beach")?t.material=this.world.materials.sand:t.name.includes("Cliff")&&(t.material=this.world.materials.cliff),t.receiveShadow=!0,t.castShadow=!1)}),this.world.scene.add(e),this.world.decor.push({type:"authoredIsland",mesh:e}),this.addInteriorGrassCap(),this.addCleanShoreBand(),!0):!1}addInteriorGrassCap(){const e=new Te(new Ws(Dt*1.025,260),this.world.materials.ground);e.name="MedievalIslandInteriorGrassCap",e.rotation.x=-Math.PI/2,e.position.y=.066,e.receiveShadow=!0,this.world.scene.add(e),this.world.decor.push({type:"grassCap",mesh:e})}addCleanShoreBand(){const e=new Te(Or(Dt*.94,Dt*1.045,220,1.8),this.world.materials.sand);e.name="MedievalIslandCleanBeachBand",e.position.y=.074,e.receiveShadow=!0,this.world.scene.add(e),this.world.decor.push({type:"shoreBand",mesh:e})}addFallbackGround(){const e=Ax(Dt,180),t=new Te(e,this.world.materials.ground);t.name="FallbackMedievalIslandGrass",t.receiveShadow=!0,t.position.y=0,this.world.scene.add(t),this.world.decor.push({type:"ground",mesh:t})}addBeachAndCliffs(){const e=new Te(Or(Dt*.92,Dt*1.01,180,2.4),this.world.materials.sand);e.name="MedievalIslandBeachBlend",e.position.y=.028,e.receiveShadow=!0,this.world.scene.add(e);const t=new Te(Or(Dt*.985,Dt*1.06,160,2.8),this.world.materials.cliff);t.name="MedievalIslandCliffEdge",t.position.y=Qa+.12,t.receiveShadow=!0,this.world.scene.add(t),this.world.decor.push({type:"beach",mesh:e},{type:"cliff",mesh:t})}addPhysicsFloor(){this.world.physics.createFixedBox([0,-.47,0],[Ft*2.1,1,Ft*2.1],{friction:1.08,restitution:.01})}containsPoint(e,t,n=0){return Math.hypot(e,t)<=Dt-n}}class zx{constructor(e){this.world=e,this.waterMeshes=[]}build(){const e=new Te(new Qi(Ft*5.5,Ft*5.5,96,96),this.world.materials.water);e.name="MedievalIslandOcean",e.rotation.x=-Math.PI/2,e.position.y=Qa,e.renderOrder=-5,this.world.scene.add(e),this.waterMeshes.push(e),this.createShoreFoam()}createShoreFoam(){const e=[{inner:1.01,outer:1.022,opacity:.2,wobble:1.2,speed:.006},{inner:1.027,outer:1.041,opacity:.14,wobble:2,speed:-.004},{inner:1.049,outer:1.066,opacity:.08,wobble:2.8,speed:.003}];for(let t=0;t<e.length;t+=1){const n=e[t],i=this.world.materials.foam.clone();i.opacity=n.opacity;const s=new Te(Or(Dt*n.inner,Dt*n.outer,240,n.wobble),i);s.name=`MedievalIslandShoreFoam_${t}`,s.position.y=Qa+.054+t*.005,s.userData.foamSpeed=n.speed,s.renderOrder=-4+t,this.world.scene.add(s),this.waterMeshes.push(s)}}update(e,t){this.world.materials.water.uniforms?.time&&(this.world.materials.water.uniforms.time.value=t);for(const n of this.waterMeshes)if(n.name.includes("Foam")){n.rotation.z+=e*(n.userData.foamSpeed||.004);const i=n.name.endsWith("_0")?.18:n.name.endsWith("_1")?.12:.07;n.material.opacity=i+Math.sin(t*.7+n.position.y*80)*.035}}}class Vx{constructor(e){this.world=e}build(){for(const e of Hs)this.createZone(e)}createZone(e){const t={...e,position:new R(e.position[0],e.position[1],e.position[2]),visited:!1};this.world.zones.push(t);const n=new $e;n.name=`ZONE_${e.id}_${e.name.replace(/\s+/g,"_")}`,n.position.copy(t.position),n.rotation.y=e.rotation||0,this.addInteractionRing(n,t),this.addLandmark(n,t),this.world.scene.add(n)}addInteractionRing(e,t){const n=new Te(new Al(t.radius*.94,t.radius,48),new Tt({color:t.color,transparent:!0,opacity:.1,depthWrite:!1,side:Jt}));n.name=`ZONE_${t.id}_interaction_ring`,n.rotation.x=-Math.PI/2,n.position.y=.19,e.add(n)}addLandmark(e,t){const n=this.world.cloneEnvironmentAsset(`EnvLandmark_${t.shape}`)||this.createFallbackLandmark(t);n.name=`VIS_Landmark_${t.id}`,n.traverse?.(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),e.add(n);const i=Gx(t.shape);if(i){if(i.type==="cylinder"){this.world.physics.createFixedCylinder([t.position.x,i.height/2,t.position.z],i.height/2,i.radius,{friction:.85,restitution:.02});return}this.world.physics.createFixedBox([t.position.x,i.size[1]/2,t.position.z],i.size,{rotation:[0,t.rotation||0,0],friction:.85,restitution:.02})}}createFallbackLandmark(e){switch(e.shape){case"hub":return this.makeCourtyard(e);case"lab":return this.makeKeep(e);case"foundry":return this.makeFoundry(e);case"tower":return this.makeWatchtower(e);case"office":return this.makeGuildHall(e);case"terminal":return this.makeOracle(e);case"library":return this.makeLibrary(e);case"trophy":return this.makeShrine(e);case"vault":return this.makeVault(e);case"board":return this.makeNoticeBoard(e);case"gate":return this.makeCircuitGate(e);case"post":return this.makeLighthouse(e);case"portal":return this.makePortal(e);case"rampyard":return this.makeStuntMarker(e);case"pier":return this.makePier(e);case"farm":return new $e;default:return this.makeCourtyard(e)}}makeCourtyard(e){const t=new $e;return this.cylinder(t,0,.18,0,5.6,.32,this.world.materials.paleStone,36),this.cylinder(t,0,1.1,0,2.2,1.6,this.world.materials.stone,22),this.cone(t,0,2.05,0,1.25,0,1.2,this.world.materials.roof,22),t}makeKeep(e){const t=new $e;this.box(t,0,1.75,0,5.8,3.5,4.8,this.world.materials.stone),this.box(t,0,3.75,0,6.2,.42,5.2,this.world.materials.paleStone);for(const n of[-2.7,2.7])for(const i of[-2.2,2.2])this.cylinder(t,n,2.4,i,.8,4.6,this.world.materials.stone,16),this.cone(t,n,5.05,i,1,0,1.4,this.world.materials.roof,16);return this.box(t,0,1.05,2.46,1.25,1.75,.08,this.world.materials.darkWood),t}makeFoundry(e){const t=new $e;this.box(t,0,1.35,0,6.8,2.7,4.8,this.world.materials.darkWood),this.box(t,0,3,0,7.4,.5,5.2,this.world.materials.roof,[.18,0,0]),this.cylinder(t,2.3,3.2,-1.5,.45,4.2,this.world.materials.stone,12);const n=new Ps(16742962,2.5,22);return n.position.set(-1.8,1.4,1.8),t.add(n),t}makeWatchtower(e){const t=new $e;this.cylinder(t,0,2.8,0,1.65,5.6,this.world.materials.stone,18),this.cylinder(t,0,5.7,0,2.15,.72,this.world.materials.paleStone,18),this.cone(t,0,6.65,0,2.15,0,1.55,this.world.materials.roof,18);const n=new Ps(16739725,2.3,36);return n.position.set(0,6.25,0),t.add(n),t}makeGuildHall(e){const t=new $e;this.box(t,0,1.6,0,7,3.2,5.4,this.world.materials.paleStone),this.box(t,0,3.5,0,7.7,.48,6,this.world.materials.roof,[.12,0,0]);for(const n of[-2.4,0,2.4])this.box(t,n,1.85,2.75,.72,1,.08,this.world.materials.glass);return t}makeOracle(e){const t=new $e;return this.cylinder(t,0,.65,0,2.5,1.3,this.world.materials.stone,20),this.box(t,0,2.1,0,4.2,1.8,.45,this.world.materials.glow),this.cylinder(t,0,3.35,0,1.2,.2,this.world.materials.gold,24),t}makeLibrary(e){const t=new $e;this.box(t,0,1.45,0,7.2,2.9,5.2,this.world.materials.paleStone);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,1.65,2.78,.18,3.3,this.world.materials.stone,10);return this.cone(t,0,3.55,0,4.4,.8,1.2,this.world.materials.roof,4,[0,Math.PI/4,0]),t}makeShrine(e){const t=new $e;return this.cylinder(t,0,.45,0,2.4,.9,this.world.materials.paleStone,24),this.cylinder(t,0,1.8,0,.72,2.2,this.world.materials.gold,20),this.cone(t,0,3.22,0,1.15,.28,.9,this.world.materials.gold,20),t}makeVault(e){const t=new $e;return this.box(t,0,1.25,0,5.4,2.5,4,this.world.materials.stone),this.cylinder(t,0,1.35,2.08,1.1,.28,this.world.materials.gold,24,[Math.PI/2,0,0]),this.box(t,0,2.85,0,5.8,.45,4.4,this.world.materials.roof),t}makeNoticeBoard(e){const t=new $e;return this.box(t,-2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,0,2.05,0,5.4,2.4,.28,this.world.materials.wood),this.box(t,0,3.45,0,5.9,.35,.45,this.world.materials.roof),t}makeCircuitGate(e){const t=new $e;for(const n of[-2.6,2.6])this.cylinder(t,n,2.1,0,.32,4.2,this.world.materials.stone,12);return this.box(t,0,4.1,0,5.8,.5,.6,this.world.materials.gold),t}makeLighthouse(e){const t=new $e;this.cylinder(t,0,2.4,0,1.25,4.8,this.world.materials.paleStone,18),this.cylinder(t,0,5,0,1.6,.7,this.world.materials.glass,18),this.cone(t,0,5.8,0,1.7,0,1.1,this.world.materials.roof,18);const n=new Ps(7911423,2.2,44);return n.position.set(0,5.1,0),t.add(n),t}makePortal(e){const t=new $e;return this.cylinder(t,-1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.cylinder(t,1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.box(t,0,4.2,0,3.1,.45,.6,this.world.materials.stone),this.box(t,0,2.35,.02,2.1,2.8,.08,this.world.materials.glow),t}makeStuntMarker(e){return new $e}makePier(e){const t=new $e;this.box(t,0,.35,0,7,.7,2.3,this.world.materials.wood);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,-.35,.85,.16,1.7,this.world.materials.darkWood,8);return t}box(e,t,n,i,s,o,l,h,u=[0,0,0]){const f=new Te(new xt(s,o,l),h);return f.position.set(t,n,i),f.rotation.set(u[0],u[1],u[2]),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}cylinder(e,t,n,i,s,o,l,h=16,u=[0,0,0]){const f=new Te(new mn(s,s,o,h),l);return f.position.set(t,n,i),f.rotation.set(u[0],u[1],u[2]),f.castShadow=!0,f.receiveShadow=!0,e.add(f),f}cone(e,t,n,i,s,o,l,h,u=16,f=[0,0,0]){const a=new Te(new Xs(s,l,u,1,!1,0,Math.PI*2),h);return a.position.set(t,n,i),a.rotation.set(f[0],f[1],f[2]),a.castShadow=!0,a.receiveShadow=!0,e.add(a),a}}function Gx(r){switch(r){case"hub":return{type:"cylinder",radius:2.45,height:2.4};case"tower":return{type:"cylinder",radius:1.95,height:7.2};case"post":return{type:"cylinder",radius:1.45,height:6.2};case"lab":return{type:"box",size:[5.9,3.6,4.9]};case"foundry":return{type:"box",size:[6.8,3.1,5]};case"office":return{type:"box",size:[7,3.4,5.4]};case"library":return{type:"box",size:[7.2,3.2,5.4]};case"terminal":return{type:"box",size:[4.4,2.2,1.2]};case"trophy":return{type:"cylinder",radius:1.35,height:3.3};case"vault":return{type:"box",size:[5.4,2.9,4.1]};case"board":return{type:"box",size:[5.8,3.2,.42]};case"pier":return{type:"box",size:[7.1,.8,2.4]};case"gate":case"portal":case"farm":case"rampyard":return null;default:return{type:"box",size:[4.8,3,4]}}}class Hx{constructor({scene:e,physics:t,resumeData:n,environmentAssets:i}){this.scene=e,this.physics=t,this.resumeData=n,this.environmentAssets=i,this.materials=Ex(),this.zones=[],this.decor=[],this.boostPads=[],this.ramps=[],this.collectibles=[],this.potatoes=[],this.roadSegments=Za,this.checkpoints=Rv.map(([s,o,l])=>new R(s,o,l)),this.landscapeQuality=this.readLandscapeQuality(),this.circuit={active:!1,startedAt:0,checkpoint:0,best:Number(localStorage.getItem("portfolio-drive-best-lap")||0)},this.build()}build(){this.terrain=new kx(this),this.water=new zx(this),this.roads=new Ux(this),this.zonesSystem=new Vx(this),this.stuntPark=new Ox(this),this.props=new Fx(this),this.foliage=new Lx(this),this.potatoFarm=new Nx(this),this.atmosphere=new wx(this),this.terrain.build(),this.water.build(),this.roads.build(),this.zonesSystem.build(),this.stuntPark.build(),this.potatoFarm.build(),this.props.build(),this.foliage.build(),this.createCollectibles(),this.atmosphere.build()}cloneEnvironmentAsset(e){return this.environmentAssets?.clone?.(e)||null}readLandscapeQuality(){const e=localStorage.getItem("portfolio-drive-landscape-quality");return ii[e]?e:"medium"}getQualityProfile(){return ii[this.landscapeQuality]||ii.medium}setLandscapeQuality(e){return ii[e]?(this.landscapeQuality=e,localStorage.setItem("portfolio-drive-landscape-quality",e),this.foliage?.applyQuality(),this.landscapeQuality):this.landscapeQuality}cycleLandscapeQuality(){const e=$o.indexOf(this.landscapeQuality);return this.setLandscapeQuality($o[(e+1)%$o.length])}isClearForProp(e,t,n=2){if(!this.terrain?.containsPoint(e,t,n+6)||this.roads?.isNear(e,t,n+2.8))return!1;for(const i of Hs){const s=e-i.position[0],o=t-i.position[2];if(Math.hypot(s,o)<i.radius+n+5)return!1}return!0}createCollectibles(){const e=[[-88,0,68],[44,0,92],[118,0,-20],[-92,0,-84],[18,0,-116],[124,0,58],[-18,0,34]];for(let t=0;t<e.length;t+=1){const n=new Te(new El(1.15,0),new ft({color:7995333,emissive:879951,roughness:.24,metalness:.12}));n.name=`Collectible_DataShard_${t}`,n.position.set(e[t][0],2.2,e[t][2]),this.scene.add(n),this.collectibles.push({mesh:n,collected:localStorage.getItem(`portfolio-drive-shard-${t}`)==="1",index:t}),n.visible=!this.collectibles[t].collected}}checkBoostPad(e){return this.boostPads.find(t=>e.distanceTo(t.position)<4.2)||null}checkRampAir(e,t){if(t<3.2)return!1;for(const n of this.ramps)if(e.distanceTo(n.position)<n.radius&&!n.triggered)return n.triggered=!0,window.setTimeout(()=>{n.triggered=!1},1e3),!0;return!1}checkCollectibles(e){const t=[];for(const n of this.collectibles)n.collected||e.distanceTo(n.mesh.position)>3.4||(n.collected=!0,n.mesh.visible=!1,localStorage.setItem(`portfolio-drive-shard-${n.index}`,"1"),t.push(n));return t}getCollectedCount(){return this.collectibles.filter(e=>e.collected).length}setPotatoCount(e){this.potatoFarm?.setPotatoCount(e)}spawnPotato(){return this.potatoFarm?.spawnPotato()}nearestZone(e){let t=null;for(const n of this.zones){const i=e.distanceTo(n.position);i<=n.radius+4&&(!t||i<t.distance)&&(t={zone:n,distance:i})}return t}getRespawnPose(e="landing"){const t=this.zones.find(i=>i.id===e)||this.zones.find(i=>i.id==="landing");if(!t)return{position:new R(2,1.45,5.5),heading:0};const n=new R(Math.sin(t.rotation||0)*-9,1.08,Math.cos(t.rotation||0)*-9);return{position:t.position.clone().add(n),heading:t.rotation||0}}getRespawnPosition(e="landing"){return this.getRespawnPose(e).position}startCircuit(e){this.circuit.active=!0,this.circuit.startedAt=e,this.circuit.checkpoint=0}updateCircuit(e,t){if(!this.circuit.active)return null;const n=this.checkpoints[this.circuit.checkpoint+1];if(!n||e.distanceTo(n)>10)return null;if(this.circuit.checkpoint+=1,this.circuit.checkpoint>=this.checkpoints.length-1){const i=t-this.circuit.startedAt;return this.circuit.active=!1,this.circuit.checkpoint=0,(!this.circuit.best||i<this.circuit.best)&&(this.circuit.best=i,localStorage.setItem("portfolio-drive-best-lap",String(i))),{finished:!0,lap:i}}return{checkpoint:this.circuit.checkpoint}}update(e,t,n){n&&(n.y<-8||Math.hypot(n.x,n.z)>Ft+18),this.water.update(e,t),this.foliage.update(e,t,n),this.potatoFarm.update(e),this.atmosphere.update(e,t);for(const i of this.collectibles)i.collected||(i.mesh.rotation.y+=e*1.1,i.mesh.position.y=2.2+Math.sin(t*1.6+i.index)*.28)}}class Wx{constructor({game:e,achievements:t,audio:n}){this.game=e,this.achievements=t,this.audio=n,this.projectIndex=0,this.activeTab="options",this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.refs={loading:document.getElementById("loading"),titleScreen:document.getElementById("title-screen"),startButton:document.getElementById("start-button"),zoneReadout:document.getElementById("zone-readout"),speedReadout:document.getElementById("speed-readout"),prompt:document.getElementById("interaction-prompt"),promptKind:document.getElementById("prompt-kind"),promptTitle:document.getElementById("prompt-title"),promptAction:document.getElementById("prompt-action"),panel:document.getElementById("panel"),panelKind:document.getElementById("panel-kind"),panelTitle:document.getElementById("panel-title"),panelBody:document.getElementById("panel-body"),panelActions:document.getElementById("panel-actions"),panelClose:document.getElementById("panel-close"),menu:document.getElementById("menu"),menuButton:document.getElementById("menu-button"),menuClose:document.getElementById("menu-close"),menuContent:document.getElementById("menu-content"),mapModal:document.getElementById("map-modal"),mapButton:document.getElementById("map-button"),mapClose:document.getElementById("map-close"),worldMap:document.getElementById("world-map"),worldMapLayer:document.getElementById("world-map-layer"),mapZoomIn:document.getElementById("map-zoom-in"),mapZoomOut:document.getElementById("map-zoom-out"),mapReset:document.getElementById("map-reset"),mapStatus:document.getElementById("map-status"),minimap:document.getElementById("minimap"),minimapWorld:document.getElementById("minimap-world"),notifications:document.getElementById("notifications"),soundButton:document.getElementById("sound-button")},this.setup()}setup(){this.refs.startButton.addEventListener("click",()=>this.game.startDriving()),this.refs.panelClose.addEventListener("click",()=>this.closePanel()),this.refs.menuButton.addEventListener("click",()=>this.toggleMenu()),this.refs.menuClose.addEventListener("click",()=>this.closeMenu()),this.refs.mapButton.addEventListener("click",()=>this.toggleMap()),this.refs.mapClose.addEventListener("click",()=>this.closeMap()),this.refs.mapZoomIn.addEventListener("click",()=>this.zoomMap(.22)),this.refs.mapZoomOut.addEventListener("click",()=>this.zoomMap(-.22)),this.refs.mapReset.addEventListener("click",()=>this.resetMapView()),this.setupMapDrag(),this.refs.soundButton.addEventListener("click",()=>{this.audio.resume();const e=this.audio.toggleMute();this.refs.soundButton.textContent=e?"Muted":"Sound",this.notify(e?"Sound muted":"Sound enabled")}),document.querySelectorAll(".menu-tabs button").forEach(e=>{e.addEventListener("click",()=>{this.activeTab=e.dataset.tab,this.renderMenu()})}),this.achievements.onUnlock=e=>{this.notify(`Achievement unlocked: ${e.title}`)},this.renderMap(),this.renderMinimap(),this.renderMenu()}markLoaded(){this.refs.loading.classList.add("is-hidden")}hideTitle(){this.refs.titleScreen.hidden=!0,document.body.classList.add("is-driving")}showPrompt(e){if(!e||this.isPanelOpen()){this.refs.prompt.hidden=!0;return}this.refs.promptKind.textContent=e.kind,this.refs.promptTitle.textContent=e.name,e.potatoFarm?this.refs.promptAction.textContent="Press P to summon. Press E for farm log":this.refs.promptAction.textContent=e.startsCircuit?"Press E to start circuit":"Press E to interact",this.refs.prompt.hidden=!1}hidePrompt(){this.refs.prompt.hidden=!0}openZone(e){if(this.audio.click(),this.achievements.visitZone(e),this.game.recordZoneVisit(e),e.startsCircuit&&this.game.startCircuit(),e.projectGallery){this.openProjectGallery(e);return}const t=this.game.getZoneLines(e);this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,fi(this.refs.panelBody),fi(this.refs.panelActions);for(const n of t){const i=document.createElement("p");i.textContent=n,this.refs.panelBody.append(i)}if(e.potatoFarm){const n=document.createElement("p");n.className="panel-muted",n.textContent=`Farm counter: ${this.game.analytics?.potatoCountLabel||"--"}`,this.refs.panelBody.append(n);const i=Zo("Summon Potato",()=>this.game.summonPotato());this.refs.panelActions.append(i)}if(e.id==="data-pier"){const n=document.createElement("p");n.className="panel-muted",n.textContent=this.game.analytics?.isEnabled?"Signal collection is active.":"Signal collection is offline.",this.refs.panelBody.append(n)}this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}openProjectGallery(e){this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,fi(this.refs.panelBody),fi(this.refs.panelActions);const t=this.game.resumeData.projects||[],n=t[this.projectIndex%t.length]||"Project data unavailable.",i=document.createElement("span");i.className="project-counter",i.textContent=`${this.projectIndex+1} / ${t.length}`;const s=document.createElement("h3"),[o,l=""]=n.split(": ");s.textContent=o;const h=document.createElement("p");h.textContent=l||n;const u=document.createElement("p");u.className="panel-muted",u.textContent="Use Previous and Next to browse the project record from the resume data.",this.refs.panelBody.append(i,s,h,u);const f=Zo("Previous",()=>{this.projectIndex=(this.projectIndex-1+t.length)%t.length,this.openProjectGallery(e)}),a=Zo("Next",()=>{this.projectIndex=(this.projectIndex+1)%t.length,this.openProjectGallery(e)});this.refs.panelActions.append(f,a),this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}addActions(e){for(const t of e){const n=document.createElement("a");n.href=t.href,n.textContent=t.label,n.target="_blank",n.rel="noopener noreferrer",this.refs.panelActions.append(n)}}closePanel(){this.refs.panel.hidden=!0,this.game.clearFocus()}isPanelOpen(){return!this.refs.panel.hidden||!this.refs.menu.hidden||!this.refs.mapModal.hidden}toggleMenu(){this.refs.menu.hidden?this.openMenu():this.closeMenu()}openMenu(){this.audio.click(),this.refs.menu.hidden=!1,this.renderMenu()}closeMenu(){this.refs.menu.hidden=!0}toggleMap(){this.refs.mapModal.hidden?this.openMap():this.closeMap()}openMap(){this.audio.click(620),this.refs.mapModal.hidden=!1,this.renderMap()}closeMap(){this.refs.mapModal.hidden=!0}setupMapDrag(){const e=this.refs.worldMap;e.addEventListener("pointerdown",n=>{n.target.closest(".map-pin")||(this.mapState.dragging=!0,this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,e.setPointerCapture(n.pointerId))}),e.addEventListener("pointermove",n=>{if(!this.mapState.dragging)return;const i=n.clientX-this.mapState.lastX,s=n.clientY-this.mapState.lastY;this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,this.mapState.x+=i,this.mapState.y+=s,this.applyMapTransform()});const t=n=>{this.mapState.dragging=!1,e.hasPointerCapture(n.pointerId)&&e.releasePointerCapture(n.pointerId)};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",n=>{n.preventDefault(),this.zoomMap(n.deltaY>0?-.12:.12)},{passive:!1})}zoomMap(e){this.mapState.scale=Math.max(.8,Math.min(2.4,this.mapState.scale+e)),this.applyMapTransform()}resetMapView(){this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.applyMapTransform()}applyMapTransform(){this.refs.worldMapLayer.style.transform=`translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`,this.refs.mapStatus.textContent=`Zoom ${Math.round(this.mapState.scale*100)}%`}renderMenu(){document.querySelectorAll(".menu-tabs button").forEach(e=>{e.classList.toggle("is-active",e.dataset.tab===this.activeTab)}),fi(this.refs.menuContent),this.activeTab==="options"?this.renderOptions():this.activeTab==="controls"?this.renderControls():this.activeTab==="achievements"?this.renderAchievements():this.renderAbout()}renderOptions(){const e=document.createElement("div");e.className="menu-grid",e.append(ys("Respawn","Move the car back to the Start Hub.",()=>{this.game.respawn(),this.closeMenu()}),ys("Reset Props","Put loose objects back near their starting positions.",()=>{this.game.resetWorld(),this.notify("World props reset")}),ys("Sound",this.audio.muted?"Currently muted.":"Currently enabled.",()=>{const t=this.audio.toggleMute();this.refs.soundButton.textContent=t?"Muted":"Sound",this.renderMenu()}),ys("Landscape Quality",`Currently ${Th(this.game.world.landscapeQuality)}. Controls sakura petals and grass density.`,()=>{const t=this.game.world.cycleLandscapeQuality();this.renderMenu(),this.notify(`Landscape quality: ${Th(t)}`)}),ys("Reset Achievements","Clear local achievement progress for this browser.",()=>{this.achievements.reset(),this.renderMenu(),this.notify("Achievements reset")})),this.refs.menuContent.append(e)}renderControls(){const e=[["WASD / Arrows","Drive"],["X","Boost"],["Shift","Handbrake / drift"],["Ctrl / B","Brake"],["Space","Jump"],["E / Enter","Interact"],["P","Summon potato at the farm"],["M","Map"],["R","Respawn"],["Mouse drag","Move camera"],["Gamepad","Left stick, A interact, B boost, RB handbrake, Y jump"]],t=document.createElement("div");t.className="control-grid";for(const[n,i]of e){const s=document.createElement("span");s.textContent=n;const o=document.createElement("strong");o.textContent=i,t.append(s,o)}this.refs.menuContent.append(t)}renderAchievements(){const e=this.achievements.getProgress(),t=document.createElement("p");t.className="panel-muted",t.textContent=`${e.unlocked}/${e.total} unlocked. Distance driven: ${Math.round(e.distance)} m.`;const n=document.createElement("div");n.className="achievement-list";for(const i of this.achievements.definitions){const s=document.createElement("div");s.className="achievement",s.classList.toggle("is-unlocked",this.achievements.unlocked.has(i.id));const o=document.createElement("strong");o.textContent=i.title;const l=document.createElement("span");l.textContent=i.description,s.append(o,l),n.append(s)}this.refs.menuContent.append(t,n)}renderAbout(){const e=["Three.js renders the island drive-world. Rapier handles the driving physics.","Resume content, project stops, contact links, and counters are connected directly to the portfolio."];for(const t of e){const n=document.createElement("p");n.textContent=t,this.refs.menuContent.append(n)}}renderMap(){fi(this.refs.worldMapLayer),this.renderMapBase(this.refs.worldMapLayer,"map");for(const e of Hs){const t=document.createElement("button");t.type="button",t.className="map-pin";const n=Bi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),t.textContent=e.name,t.title=`${e.name} - ${e.kind}`,t.addEventListener("click",()=>{this.game.respawn(e.id),this.closeMap()}),this.refs.worldMapLayer.append(t)}this.mapPlayer=document.createElement("span"),this.mapPlayer.className="map-player",this.refs.worldMapLayer.append(this.mapPlayer),this.applyMapTransform()}renderMinimap(){fi(this.refs.minimapWorld),this.renderMapBase(this.refs.minimapWorld,"minimap");for(const e of Hs){const t=document.createElement("span");t.className="minimap-pin";const n=Bi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),this.refs.minimapWorld.append(t)}this.minimapPlayer=document.createElement("span"),this.minimapPlayer.className="minimap-player",this.refs.minimapWorld.append(this.minimapPlayer)}renderMapBase(e,t){const n=document.createElement("div");n.className=`${t}-island`;const i=Ft*2+Sn*2;n.style.inset=`${(Ft+Sn-Dt)/i*100}%`,e.append(n);for(const s of wv){const o=document.createElement("span");o.className=`${t}-district`;const l=Bi(s.center[0],s.center[1]);o.style.left=`${l.x}%`,o.style.top=`${l.y}%`,o.style.width=`${s.size[0]/(Ft*2+Sn*2)*100}%`,o.style.height=`${s.size[1]/(Ft*2+Sn*2)*100}%`,o.style.setProperty("--district-color",s.color),e.append(o)}for(const s of Tv)for(const[o,l,h,u,f=0]of qx(s.points,!1,s.width)){const a=document.createElement("span");a.className=`${t}-canal`;const c=Bi(o,l);a.style.left=`${c.x}%`,a.style.top=`${c.y}%`,a.style.width=`${h/(Ft*2+Sn*2)*100}%`,a.style.height=`${u/(Ft*2+Sn*2)*100}%`,a.style.transform=`translate(-50%, -50%) rotate(${f}rad)`,e.append(a)}e.append(Xx(t))}update({speed:e,activeZone:t,circuit:n}){this.refs.speedReadout.textContent=`${Math.round(Math.abs(e)*3.6)} km/h`,this.refs.zoneReadout.textContent=t?t.name:"Road",this.refs.soundButton.textContent=this.audio.muted?"Muted":"Sound",this.showPrompt(t),n?.active&&(this.refs.zoneReadout.textContent=`Circuit ${n.checkpoint}/${this.game.world.checkpoints.length-1}`),this.updateMapMarkers(t)}updateMapMarkers(e){const t=this.game.vehicle.position,n=Bi(t.x,t.z),i=this.game.vehicle.heading||0;this.mapPlayer&&(this.mapPlayer.style.left=`${n.x}%`,this.mapPlayer.style.top=`${n.y}%`,this.mapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),this.minimapPlayer&&(this.minimapPlayer.style.left=`${n.x}%`,this.minimapPlayer.style.top=`${n.y}%`,this.minimapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),document.querySelectorAll(".map-pin").forEach(s=>{s.classList.toggle("is-active",e&&s.textContent===e.name)})}notify(e){const t=document.createElement("div");t.className="notification",t.textContent=e,this.refs.notifications.append(t),setTimeout(()=>t.classList.add("is-visible"),20),setTimeout(()=>{t.classList.remove("is-visible"),setTimeout(()=>t.remove(),260)},3600)}setPotatoCount(e){this.game.world?.setPotatoCount?.(e)}}function Bi(r,e){const t=Ft*2+Sn*2;return{x:(r+Ft+Sn)/t*100,y:(e+Ft+Sn)/t*100}}function Xx(r){const e=Ft*2+Sn*2,t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("class",`${r}-roads-svg`),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("aria-hidden","true");for(const n of Ll){const i=n.closed?[...n.points,n.points[0]]:n.points,s=document.createElementNS("http://www.w3.org/2000/svg","polyline");s.setAttribute("class",`${r}-road-line ${r}-road-${n.hierarchy}`),s.setAttribute("points",i.map(([o,l])=>{const h=Bi(o,l);return`${h.x.toFixed(2)},${h.y.toFixed(2)}`}).join(" ")),s.setAttribute("stroke-width",`${(n.width+3.4)/e*100}`),t.append(s)}return t}function qx(r,e,t){const n=[],i=r.length-1;for(let s=0;s<i;s+=1){const o=r[s],l=r[(s+1)%r.length],h=l[0]-o[0],u=l[1]-o[1],f=Math.hypot(h,u);n.push([(o[0]+l[0])/2,(o[1]+l[1])/2,t,f+t*.64,Math.atan2(h,u)])}return n}function fi(r){for(;r.firstChild;)r.removeChild(r.firstChild)}function Zo(r,e){const t=document.createElement("button");return t.type="button",t.textContent=r,t.addEventListener("click",e),t}function ys(r,e,t){const n=document.createElement("button");n.type="button",n.className="option-tile";const i=document.createElement("strong");i.textContent=r;const s=document.createElement("span");return s.textContent=e,n.append(i,s),n.addEventListener("click",t),n}function Th(r){return`${r.charAt(0).toUpperCase()}${r.slice(1)}`}const Br={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class rs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Yx=new Ks(-1,1,1,-1,0,1);class Kx extends gt{constructor(){super(),this.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ze([0,2,0,0,2,0],2))}}const $x=new Kx;class Dl{constructor(e){this._mesh=new Te($x,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Yx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Zx extends rs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ot?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gs.clone(e.uniforms),this.material=new Ot({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Dl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class wh extends rs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,l;this.inverse?(o=0,l=1):(o=1,l=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(l),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class jx extends rs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Jx{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new oe);this._width=n.width,this._height=n.height,t=new Yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:en}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zx(Br),this.copyPass.material.blending=En,this.timer=new fp}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const l=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}wh!==void 0&&(o instanceof wh?n=!0:o instanceof jx&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Qx extends rs{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new me}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const ey={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new me(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ji extends rs{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new oe(e.x,e.y):new oe(256,256),this.clearColor=new me(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Yt(s,o,{type:en}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const a=new Yt(s,o,{type:en});a.texture.name="UnrealBloomPass.h"+f,a.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(a);const c=new Yt(s,o,{type:en});c.texture.name="UnrealBloomPass.v"+f,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),s=Math.round(s/2),o=Math.round(o/2)}const l=ey;this.highPassUniforms=Gs.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ot({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const h=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new oe(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Gs.clone(Br.uniforms),this.blendMaterial=new Ot({uniforms:this.copyUniforms,vertexShader:Br.vertexShader,fragmentShader:Br.fragmentShader,premultipliedAlpha:!0,blending:jo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new me,this._oldClearAlpha=1,this._basic=new Tt,this._fsQuad=new Dl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new oe(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let l=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[h].uniforms.direction.value=ji.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=ji.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this._fsQuad.render(e),l=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Ot({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new oe(.5,.5)},direction:{value:new oe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Ot({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}ji.BlurDirectionX=new oe(1,0);ji.BlurDirectionY=new oe(0,1);const Cr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ty extends rs{constructor(){super(),this.isOutputPass=!0,this.uniforms=Gs.clone(Cr.uniforms),this.material=new ru({name:Cr.name,uniforms:this.uniforms,vertexShader:Cr.vertexShader,fragmentShader:Cr.fragmentShader}),this._fsQuad=new Dl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},qe.getTransfer(this._outputColorSpace)===Je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===tl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===il?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Xr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ol?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===sl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ny{constructor({canvas:e,scene:t,camera:n}){this.canvas=e,this.scene=t,this.camera=n,this.renderer=new _v({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.composer=null,this.bloom=null}setup(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Eh,this.renderer.outputColorSpace=Nt,this.renderer.toneMapping=Xr,this.renderer.toneMappingExposure=.96,this.composer=new Jx(this.renderer),this.composer.addPass(new Qx(this.scene,this.camera)),this.bloom=new ji(new oe(window.innerWidth,window.innerHeight),.12,.46,1.04),this.composer.addPass(this.bloom),this.composer.addPass(new ty)}setQuality(e){this.bloom&&(e==="low"?(this.bloom.strength=.04,this.renderer.shadowMap.enabled=!1):e==="high"?(this.bloom.strength=.2,this.renderer.shadowMap.enabled=!0):(this.bloom.strength=.12,this.renderer.shadowMap.enabled=!0))}render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}resize(){const e=Math.min(window.devicePixelRatio||1,1.8);this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer?.setSize(window.innerWidth,window.innerHeight),this.bloom?.resolution.set(window.innerWidth,window.innerHeight)}}class iy{constructor(e){this.RAPIER=e,this.canvas=document.getElementById("play-canvas"),this.scene=new Wd,this.camera=new Wt(58,window.innerWidth/window.innerHeight,.1,900),this.rendererSystem=new ny({canvas:this.canvas,scene:this.scene,camera:this.camera}),this.renderer=this.rendererSystem.renderer,this.ticker=new vv,this.started=!1,this.activeZone=null,this.resumeData=null,this.lights={}}async init(){this.resumeData=await this.fetchResumeData(),this.setupRenderer(),this.setupScene(),this.input=new xv(this.canvas),this.audio=new Mv,this.achievements=new Pv,this.physics=new Fv(this.RAPIER),this.environmentAssets=await Tx(),this.world=new Hx({scene:this.scene,physics:this.physics,resumeData:this.resumeData,environmentAssets:this.environmentAssets}),this.vehicle=new vx({scene:this.scene,physics:this.physics,achievements:this.achievements,audio:this.audio}),this.cameraRig=new yx(this.camera,this.vehicle,this.input),this.analytics=new Lv,this.ui=new Wx({game:this,achievements:this.achievements,audio:this.audio}),this.analytics.init().then(()=>{Number.isFinite(this.analytics.potatoCount)&&this.ui.setPotatoCount(this.analytics.potatoCount)}).catch(()=>{}),this.setupEvents(),this.setupDebug(),this.ui.markLoaded(),this.renderer.setAnimationLoop(e=>this.loop(e))}async fetchResumeData(){const e=await fetch("resume_data.json",{cache:"no-store"});if(!e.ok)throw new Error(`Unable to load resume_data.json: ${e.status}`);return e.json()}setupRenderer(){this.rendererSystem.setup()}setupScene(){this.scene.background=new me(9755899),this.scene.fog=new vl(13496055,230,720),this.camera.position.set(0,9,-18);const e=new op(16775144,1522208,1.58);this.scene.add(e);const t=new Ya(16766090,3.35);t.position.set(-112,96,-88),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-190,t.shadow.camera.right=190,t.shadow.camera.top=190,t.shadow.camera.bottom=-190,t.shadow.camera.near=1,t.shadow.camera.far=360,t.shadow.bias=-15e-5,t.shadow.normalBias=.08,this.scene.add(t);const n=new Ya(12054783,.76);n.position.set(62,35,70),this.scene.add(n),this.lights={hemi:e,sun:t,rim:n}}setupEvents(){window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>{document.hidden?this.audio?.context?.suspend?.():this.audio?.resume()})}setupDebug(){window.__portfolioDrive={game:this,sampleCanvas:()=>{const e=this.renderer.getContext(),t=Math.max(1,Math.min(16,this.renderer.domElement.width)),n=Math.max(1,Math.min(16,this.renderer.domElement.height)),i=new Uint8Array(t*n*4);return e.readPixels(0,0,t,n,e.RGBA,e.UNSIGNED_BYTE,i),Array.from(i).reduce((s,o)=>s+o,0)},ready:()=>!!(this.world&&this.vehicle&&this.renderer),start:()=>this.startDriving(),respawn:e=>this.respawn(e),summonPotato:()=>this.summonPotato(),nearest:()=>this.activeZone?.name||null}}startDriving(){this.started=!0,this.audio.resume(),this.ui.hideTitle(),this.ui.notify("Drive started")}loop(e){this.ticker.tick(e);const t=this.ticker.delta,n=this.ticker.elapsed;this.input.update(),this.handleGlobalInput();const i=this.vehicle.position,s=this.world.nearestZone(i);this.activeZone=s?.zone||null;const o=this.started&&!this.ui.isPanelOpen();this.physics.step(t,h=>{if(o){this.vehicle.update(this.input,h);const u=this.world.checkBoostPad(this.vehicle.position);if(u&&(this.vehicle.boostFromPad(u),this.ui?.notify?.("Boost pad launched")),this.world.checkCollectibles(this.vehicle.position).length){const a=this.world.getCollectedCount();this.ui?.notify?.(`Data shard ${a}/${this.world.collectibles.length}`),a===this.world.collectibles.length&&this.achievements.unlock("data_shards")}}}),this.vehicle.postPhysics(),o||this.vehicle.idleDampen(),this.world.update(t,n,this.vehicle.position),this.world.checkRampAir(this.vehicle.position,this.vehicle.body.linvel().y)&&this.achievements.unlock("ramp_jump"),this.updateLighting(n),this.cameraRig.update(t),this.audio.update(this.vehicle.speed,this.vehicle.controller?.driveState),this.ui.update({speed:this.vehicle.speed,activeZone:this.activeZone,circuit:this.world.circuit});const l=this.world.updateCircuit(this.vehicle.position,n);l?.finished?this.ui.notify(`Circuit finished: ${sy(l.lap)}`):l?.checkpoint&&(this.audio.click(700),this.ui.notify(`Checkpoint ${l.checkpoint}`)),this.rendererSystem.render(),this.input.clearTransient()}handleGlobalInput(){if(!this.started&&this.input.consume("interact")){this.startDriving();return}this.input.consume("menu")&&this.ui.toggleMenu(),this.input.consume("map")&&this.ui.toggleMap(),this.input.consume("potato")&&!this.ui.isPanelOpen()&&this.summonPotato(),this.input.consume("interact")&&this.activeZone&&!this.ui.isPanelOpen()&&this.ui.openZone(this.activeZone)}recordZoneVisit(e){this.analytics?.recordZone(e?.id)}async summonPotato(){const e=this.world.zones.find(s=>s.id==="potato");if(!e)return;const t=this.vehicle.position;if(!(Math.hypot(t.x-e.position.x,t.z-e.position.z)<=e.radius+6)){this.ui?.notify?.("Drive to the Potato Farm to summon one");return}this.world.spawnPotato(),this.achievements.unlock("potato_summon"),this.audio.click(190),this.ui?.notify?.("Potato summoned");const i=await this.analytics?.recordPotatoSummon?.();Number.isFinite(i)&&(this.ui.setPotatoCount(i),this.ui.notify(`Potato counter: ${i}`))}updateLighting(e){const t=Math.sin(e*.035)*.5+.5;this.lights.sun.intensity=3.05+t*.62,this.lights.rim.intensity=.7+(1-t)*.44,this.scene.fog.color.lerpColors(new me(13496055),new me(16049597),t*.2)}getZoneLines(e){return e.lines?e.lines:e.dialogueId&&this.resumeData.dialogues?.[e.dialogueId]?this.resumeData.dialogues[e.dialogueId].lines||[]:["Information for this area is being prepared."]}focusZone(e){const t=e.position.clone().add(new R(7.5,7.2,9.5)),n=e.position.clone().add(new R(0,2.4,0));this.cameraRig.setCinematic(t,n)}clearFocus(){this.cameraRig.clearCinematic()}respawn(e="landing"){const t=this.world.getRespawnPose(e);this.vehicle.respawn(t.position,t.heading),this.audio.click(420)}resetWorld(){this.physics.resetDynamicVisuals()}startCircuit(){this.world.startCircuit(this.ticker.elapsed),this.achievements.unlock("circuit_gate"),this.ui.notify("Circuit started")}resize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.rendererSystem.resize()}}function sy(r){const e=Math.floor(r/60),t=r-e*60;return`${e}:${t.toFixed(2).padStart(5,"0")}`}async function ry(){const r=await Pu(()=>import("./rapier.es.js"),[],import.meta.url);await r.init(),await new iy(r).init()}ry().catch(r=>{console.error("Portfolio Drive failed to boot:",r);const e=document.getElementById("loading");e&&(e.innerHTML='<span class="boot-error">World failed to load. Check the console.</span>')});
