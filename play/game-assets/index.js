(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const rd="modulepreload",od=function(r,e){return new URL(r,e).href},uc={},ad=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let h=function(f){return Promise.all(f.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=h(t.map(f=>{if(f=od(f,n),f in uc)return;uc[f]=!0;const l=f.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(n)for(let p=o.length-1;p>=0;p--){const _=o[p];if(_.href===f&&(!l||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${u}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":rd,l||(d.as="script"),d.crossOrigin="",d.href=f,c&&d.setAttribute("nonce",c),document.head.appendChild(d),l)return new Promise((p,_)=>{d.addEventListener("load",p),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${f}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};const yl="183",ld=0,dc=1,cd=2,Os=1,hd=2,Ds=3,jt=0,$t=1,Ot=2,Nn=0,ji=1,_a=2,fc=3,pc=4,ud=5,wi=100,dd=101,fd=102,pd=103,md=104,gd=200,_d=201,xd=202,vd=203,xa=204,va=205,yd=206,Sd=207,Md=208,bd=209,wd=210,Td=211,Ed=212,Ad=213,Cd=214,ya=0,Sa=1,Ma=2,ts=3,ba=4,wa=5,Ta=6,Ea=7,eu=0,Rd=1,Pd=2,Fn=0,Sl=1,Ml=2,bl=3,so=4,wl=5,Tl=6,El=7,mc="attached",Id="detached",tu=300,Ci=301,ns=302,go=303,_o=304,ro=306,hn=1e3,In=1001,jr=1002,Rt=1003,nu=1004,Ns=1005,Ct=1006,Hr=1007,Ln=1008,sn=1009,iu=1010,su=1011,Xs=1012,Al=1013,On=1014,un=1015,rn=1016,Cl=1017,Rl=1018,qs=1020,ru=35902,ou=35899,au=1021,lu=1022,dn=1023,Jn=1026,Ei=1027,Pl=1028,Il=1029,is=1030,Ll=1031,Dl=1033,Wr=33776,Xr=33777,qr=33778,Yr=33779,Aa=35840,Ca=35841,Ra=35842,Pa=35843,Ia=36196,La=37492,Da=37496,Na=37488,Fa=37489,Ua=37490,Oa=37491,Ba=37808,ka=37809,za=37810,Ga=37811,Va=37812,Ha=37813,Wa=37814,Xa=37815,qa=37816,Ya=37817,$a=37818,Ka=37819,Za=37820,ja=37821,Ja=36492,Qa=36494,el=36495,tl=36283,nl=36284,il=36285,sl=36286,Ys=2300,$s=2301,xo=2302,gc=2303,_c=2400,xc=2401,vc=2402,Ld=2500,Dd=0,cu=1,rl=2,Nd=3200,hu=0,Fd=1,ci="",Et="srgb",Kt="srgb-linear",Jr="linear",tt="srgb",Li=7680,yc=519,Ud=512,Od=513,Bd=514,Nl=515,kd=516,zd=517,Fl=518,Gd=519,ol=35044,Ji=35048,Sc="300 es",Dn=2e3,Ks=2001;function Vd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Hd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Zs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Wd(){const r=Zs("canvas");return r.style.display="block",r}const Mc={};function Qr(...r){const e="THREE."+r.shift();console.log(e,...r)}function uu(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ee(...r){r=uu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Fe(...r){r=uu(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function eo(...r){const e=r.join(" ");e in Mc||(Mc[e]=!0,Ee(...r))}function Xd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const qd={[ya]:Sa,[Ma]:Ta,[ba]:Ea,[ts]:wa,[Sa]:ya,[Ta]:Ma,[Ea]:ba,[wa]:ts};class us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bc=1234567;const Bs=Math.PI/180,ss=180/Math.PI;function fn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]).toLowerCase()}function Ye(r,e,t){return Math.max(e,Math.min(t,r))}function Ul(r,e){return(r%e+e)%e}function Yd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function $d(r,e,t){return r!==e?(t-r)/(e-r):0}function ks(r,e,t){return(1-t)*r+t*e}function Kd(r,e,t,n){return ks(r,e,1-Math.exp(-t*n))}function Zd(r,e=1){return e-Math.abs(Ul(r,e*2)-e)}function jd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Jd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Qd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ef(r,e){return r+Math.random()*(e-r)}function tf(r){return r*(.5-Math.random())}function nf(r){r!==void 0&&(bc=r);let e=bc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sf(r){return r*Bs}function rf(r){return r*ss}function of(r){return(r&r-1)===0&&r!==0}function af(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function lf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cf(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),h=s((e+n)/2),f=o((e+n)/2),l=s((e-n)/2),u=o((e-n)/2),d=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(a*f,c*l,c*u,a*h);break;case"YZY":r.set(c*u,a*f,c*l,a*h);break;case"ZXZ":r.set(c*l,c*u,a*f,a*h);break;case"XZX":r.set(a*f,c*p,c*d,a*h);break;case"YXY":r.set(c*d,a*f,c*p,a*h);break;case"ZYZ":r.set(c*p,c*d,a*f,a*h);break;default:Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function rt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Xt={DEG2RAD:Bs,RAD2DEG:ss,generateUUID:fn,clamp:Ye,euclideanModulo:Ul,mapLinear:Yd,inverseLerp:$d,lerp:ks,damp:Kd,pingpong:Zd,smoothstep:jd,smootherstep:Jd,randInt:Qd,randFloat:ef,randFloatSpread:tf,seededRandom:nf,degToRad:sf,radToDeg:rf,isPowerOfTwo:of,ceilPowerOfTwo:af,floorPowerOfTwo:lf,setQuaternionFromProperEuler:cf,normalize:rt,denormalize:vn};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class At{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],h=n[i+1],f=n[i+2],l=n[i+3],u=s[o+0],d=s[o+1],p=s[o+2],_=s[o+3];if(l!==_||c!==u||h!==d||f!==p){let g=c*u+h*d+f*p+l*_;g<0&&(u=-u,d=-d,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){const x=Math.acos(g),v=Math.sin(x);m=Math.sin(m*x)/v,a=Math.sin(a*x)/v,c=c*m+u*a,h=h*m+d*a,f=f*m+p*a,l=l*m+_*a}else{c=c*m+u*a,h=h*m+d*a,f=f*m+p*a,l=l*m+_*a;const x=1/Math.sqrt(c*c+h*h+f*f+l*l);c*=x,h*=x,f*=x,l*=x}}e[t]=c,e[t+1]=h,e[t+2]=f,e[t+3]=l}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],h=n[i+2],f=n[i+3],l=s[o],u=s[o+1],d=s[o+2],p=s[o+3];return e[t]=a*p+f*l+c*d-h*u,e[t+1]=c*p+f*u+h*l-a*d,e[t+2]=h*p+f*d+a*u-c*l,e[t+3]=f*p-a*l-c*u-h*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,h=a(n/2),f=a(i/2),l=a(s/2),u=c(n/2),d=c(i/2),p=c(s/2);switch(o){case"XYZ":this._x=u*f*l+h*d*p,this._y=h*d*l-u*f*p,this._z=h*f*p+u*d*l,this._w=h*f*l-u*d*p;break;case"YXZ":this._x=u*f*l+h*d*p,this._y=h*d*l-u*f*p,this._z=h*f*p-u*d*l,this._w=h*f*l+u*d*p;break;case"ZXY":this._x=u*f*l-h*d*p,this._y=h*d*l+u*f*p,this._z=h*f*p+u*d*l,this._w=h*f*l-u*d*p;break;case"ZYX":this._x=u*f*l-h*d*p,this._y=h*d*l+u*f*p,this._z=h*f*p-u*d*l,this._w=h*f*l+u*d*p;break;case"YZX":this._x=u*f*l+h*d*p,this._y=h*d*l+u*f*p,this._z=h*f*p-u*d*l,this._w=h*f*l-u*d*p;break;case"XZY":this._x=u*f*l-h*d*p,this._y=h*d*l-u*f*p,this._z=h*f*p+u*d*l,this._w=h*f*l+u*d*p;break;default:Ee("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],h=t[2],f=t[6],l=t[10],u=n+a+l;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(f-c)*d,this._y=(s-h)*d,this._z=(o-i)*d}else if(n>a&&n>l){const d=2*Math.sqrt(1+n-a-l);this._w=(f-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+h)/d}else if(a>l){const d=2*Math.sqrt(1+a-n-l);this._w=(s-h)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+f)/d}else{const d=2*Math.sqrt(1+l-n-a);this._w=(o-i)/d,this._x=(s+h)/d,this._y=(c+f)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,h=t._z,f=t._w;return this._x=n*f+o*a+i*h-s*c,this._y=i*f+o*c+s*a-n*h,this._z=s*f+o*h+n*c-i*a,this._w=o*f-n*a-i*c-s*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){const h=Math.acos(a),f=Math.sin(h);c=Math.sin(c*h)/f,t=Math.sin(t*h)/f,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,h=2*(o*i-a*n),f=2*(a*t-s*i),l=2*(s*n-o*t);return this.x=t+c*h+o*l-a*f,this.y=n+c*f+a*h-s*l,this.z=i+c*l+s*f-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vo.copy(this).projectOnVector(e),this.sub(vo)}reflect(e){return this.sub(vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vo=new C,wc=new At;class Ve{constructor(e,t,n,i,s,o,a,c,h){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,h)}set(e,t,n,i,s,o,a,c,h){const f=this.elements;return f[0]=e,f[1]=i,f[2]=a,f[3]=t,f[4]=s,f[5]=c,f[6]=n,f[7]=o,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],h=n[1],f=n[4],l=n[7],u=n[2],d=n[5],p=n[8],_=i[0],g=i[3],m=i[6],x=i[1],v=i[4],y=i[7],E=i[2],T=i[5],R=i[8];return s[0]=o*_+a*x+c*E,s[3]=o*g+a*v+c*T,s[6]=o*m+a*y+c*R,s[1]=h*_+f*x+l*E,s[4]=h*g+f*v+l*T,s[7]=h*m+f*y+l*R,s[2]=u*_+d*x+p*E,s[5]=u*g+d*v+p*T,s[8]=u*m+d*y+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],h=e[7],f=e[8];return t*o*f-t*a*h-n*s*f+n*a*c+i*s*h-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],h=e[7],f=e[8],l=f*o-a*h,u=a*c-f*s,d=h*s-o*c,p=t*l+n*u+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=l*_,e[1]=(i*h-f*n)*_,e[2]=(a*n-i*o)*_,e[3]=u*_,e[4]=(f*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*c-h*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),h=Math.sin(s);return this.set(n*c,n*h,-n*(c*o+h*a)+o+e,-i*h,i*c,-i*(-h*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(yo.makeScale(e,t)),this}rotate(e){return this.premultiply(yo.makeRotation(-e)),this}translate(e,t){return this.premultiply(yo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yo=new Ve,Tc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ec=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){const r={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(i.r=jn(i.r),i.g=jn(i.g),i.b=jn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(i.r=Qi(i.r),i.g=Qi(i.g),i.b=Qi(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ci?Jr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return eo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return eo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Kt]:{primaries:e,whitePoint:n,transfer:Jr,toXYZ:Tc,fromXYZ:Ec,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:Tc,fromXYZ:Ec,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),r}const Ze=hf();function jn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Di;class uf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Di===void 0&&(Di=Zs("canvas")),Di.width=e.width,Di.height=e.height;const i=Di.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=jn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(jn(t[n]/255)*255):t[n]=jn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let df=0;class Ol{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=fn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(So(i[o].image)):s.push(So(i[o]))}else s=So(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function So(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?uf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ee("Texture: Unable to serialize Texture."),{})}let ff=0;const Mo=new C;class It extends us{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=In,i=In,s=Ct,o=Ln,a=dn,c=sn,h=It.DEFAULT_ANISOTROPY,f=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=fn(),this.name="",this.source=new Ol(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Mo).x}get height(){return this.source.getSize(Mo).y}get depth(){return this.source.getSize(Mo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hn:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case jr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hn:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case jr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=tu;It.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,i=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,h=c[0],f=c[4],l=c[8],u=c[1],d=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(f-u)<.01&&Math.abs(l-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(f+u)<.1&&Math.abs(l+_)<.1&&Math.abs(p+g)<.1&&Math.abs(h+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(h+1)/2,y=(d+1)/2,E=(m+1)/2,T=(f+u)/4,R=(l+_)/4,S=(p+g)/4;return v>y&&v>E?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=T/n,s=R/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=T/i,s=S/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=R/s,i=S/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-p)*(g-p)+(l-_)*(l-_)+(u-f)*(u-f));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(l-_)/x,this.z=(u-f)/x,this.w=Math.acos((h+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pf extends us{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new It(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ol(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zt extends pf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class du extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mf extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Be{constructor(e,t,n,i,s,o,a,c,h,f,l,u,d,p,_,g){Be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,h,f,l,u,d,p,_,g)}set(e,t,n,i,s,o,a,c,h,f,l,u,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=h,m[6]=f,m[10]=l,m[14]=u,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Be().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),o=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),h=Math.sin(i),f=Math.cos(s),l=Math.sin(s);if(e.order==="XYZ"){const u=o*f,d=o*l,p=a*f,_=a*l;t[0]=c*f,t[4]=-c*l,t[8]=h,t[1]=d+p*h,t[5]=u-_*h,t[9]=-a*c,t[2]=_-u*h,t[6]=p+d*h,t[10]=o*c}else if(e.order==="YXZ"){const u=c*f,d=c*l,p=h*f,_=h*l;t[0]=u+_*a,t[4]=p*a-d,t[8]=o*h,t[1]=o*l,t[5]=o*f,t[9]=-a,t[2]=d*a-p,t[6]=_+u*a,t[10]=o*c}else if(e.order==="ZXY"){const u=c*f,d=c*l,p=h*f,_=h*l;t[0]=u-_*a,t[4]=-o*l,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*f,t[9]=_-u*a,t[2]=-o*h,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const u=o*f,d=o*l,p=a*f,_=a*l;t[0]=c*f,t[4]=p*h-d,t[8]=u*h+_,t[1]=c*l,t[5]=_*h+u,t[9]=d*h-p,t[2]=-h,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const u=o*c,d=o*h,p=a*c,_=a*h;t[0]=c*f,t[4]=_-u*l,t[8]=p*l+d,t[1]=l,t[5]=o*f,t[9]=-a*f,t[2]=-h*f,t[6]=d*l+p,t[10]=u-_*l}else if(e.order==="XZY"){const u=o*c,d=o*h,p=a*c,_=a*h;t[0]=c*f,t[4]=-l,t[8]=h*f,t[1]=u*l+_,t[5]=o*f,t[9]=d*l-p,t[2]=p*l-d,t[6]=a*f,t[10]=_*l+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gf,e,_f)}lookAt(e,t,n){const i=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ni.crossVectors(n,en),ni.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ni.crossVectors(n,en)),ni.normalize(),lr.crossVectors(en,ni),i[0]=ni.x,i[4]=lr.x,i[8]=en.x,i[1]=ni.y,i[5]=lr.y,i[9]=en.y,i[2]=ni.z,i[6]=lr.z,i[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],h=n[12],f=n[1],l=n[5],u=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],x=n[3],v=n[7],y=n[11],E=n[15],T=i[0],R=i[4],S=i[8],b=i[12],U=i[1],P=i[5],F=i[9],O=i[13],B=i[2],H=i[6],k=i[10],G=i[14],j=i[3],Z=i[7],ae=i[11],he=i[15];return s[0]=o*T+a*U+c*B+h*j,s[4]=o*R+a*P+c*H+h*Z,s[8]=o*S+a*F+c*k+h*ae,s[12]=o*b+a*O+c*G+h*he,s[1]=f*T+l*U+u*B+d*j,s[5]=f*R+l*P+u*H+d*Z,s[9]=f*S+l*F+u*k+d*ae,s[13]=f*b+l*O+u*G+d*he,s[2]=p*T+_*U+g*B+m*j,s[6]=p*R+_*P+g*H+m*Z,s[10]=p*S+_*F+g*k+m*ae,s[14]=p*b+_*O+g*G+m*he,s[3]=x*T+v*U+y*B+E*j,s[7]=x*R+v*P+y*H+E*Z,s[11]=x*S+v*F+y*k+E*ae,s[15]=x*b+v*O+y*G+E*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],h=e[13],f=e[2],l=e[6],u=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15],x=c*d-h*u,v=a*d-h*l,y=a*u-c*l,E=o*d-h*f,T=o*u-c*f,R=o*l-a*f;return t*(_*x-g*v+m*y)-n*(p*x-g*E+m*T)+i*(p*v-_*E+m*R)-s*(p*y-_*T+g*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],h=e[7],f=e[8],l=e[9],u=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],x=t*a-n*o,v=t*c-i*o,y=t*h-s*o,E=n*c-i*a,T=n*h-s*a,R=i*h-s*c,S=f*_-l*p,b=f*g-u*p,U=f*m-d*p,P=l*g-u*_,F=l*m-d*_,O=u*m-d*g,B=x*O-v*F+y*P+E*U-T*b+R*S;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/B;return e[0]=(a*O-c*F+h*P)*H,e[1]=(i*F-n*O-s*P)*H,e[2]=(_*R-g*T+m*E)*H,e[3]=(u*T-l*R-d*E)*H,e[4]=(c*U-o*O-h*b)*H,e[5]=(t*O-i*U+s*b)*H,e[6]=(g*y-p*R-m*v)*H,e[7]=(f*R-u*y+d*v)*H,e[8]=(o*F-a*U+h*S)*H,e[9]=(n*U-t*F-s*S)*H,e[10]=(p*T-_*y+m*x)*H,e[11]=(l*y-f*T-d*x)*H,e[12]=(a*b-o*P-c*S)*H,e[13]=(t*P-n*b+i*S)*H,e[14]=(_*v-p*E-g*x)*H,e[15]=(f*E-l*v+u*x)*H,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,h=s*o,f=s*a;return this.set(h*o+n,h*a-i*c,h*c+i*a,0,h*a+i*c,f*a+n,f*c-i*o,0,h*c-i*a,f*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,h=s+s,f=o+o,l=a+a,u=s*h,d=s*f,p=s*l,_=o*f,g=o*l,m=a*l,x=c*h,v=c*f,y=c*l,E=n.x,T=n.y,R=n.z;return i[0]=(1-(_+m))*E,i[1]=(d+y)*E,i[2]=(p-v)*E,i[3]=0,i[4]=(d-y)*T,i[5]=(1-(u+m))*T,i[6]=(g+x)*T,i[7]=0,i[8]=(p+v)*R,i[9]=(g-x)*R,i[10]=(1-(u+_))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ni.set(i[0],i[1],i[2]).length();const a=Ni.set(i[4],i[5],i[6]).length(),c=Ni.set(i[8],i[9],i[10]).length();s<0&&(o=-o),gn.copy(this);const h=1/o,f=1/a,l=1/c;return gn.elements[0]*=h,gn.elements[1]*=h,gn.elements[2]*=h,gn.elements[4]*=f,gn.elements[5]*=f,gn.elements[6]*=f,gn.elements[8]*=l,gn.elements[9]*=l,gn.elements[10]*=l,t.setFromRotationMatrix(gn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,i,s,o,a=Dn,c=!1){const h=this.elements,f=2*s/(t-e),l=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let p,_;if(c)p=s/(o-s),_=o*s/(o-s);else if(a===Dn)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Ks)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=f,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=l,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=p,h[14]=_,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Dn,c=!1){const h=this.elements,f=2/(t-e),l=2/(n-i),u=-(t+e)/(t-e),d=-(n+i)/(n-i);let p,_;if(c)p=1/(o-s),_=o/(o-s);else if(a===Dn)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===Ks)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=f,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=l,h[9]=0,h[13]=d,h[2]=0,h[6]=0,h[10]=p,h[14]=_,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ni=new C,gn=new Be,gf=new C(0,0,0),_f=new C(1,1,1),ni=new C,lr=new C,en=new C,Ac=new Be,Cc=new At;class pn{constructor(e=0,t=0,n=0,i=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],h=i[5],f=i[9],l=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-l,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-l,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-l,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,d),this._y=0);break;default:Ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ac.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ac,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cc.setFromEuler(this),this.setFromQuaternion(Cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class fu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xf=0;const Rc=new C,Fi=new At,Wn=new Be,cr=new C,vs=new C,vf=new C,yf=new At,Pc=new C(1,0,0),Ic=new C(0,1,0),Lc=new C(0,0,1),Dc={type:"added"},Sf={type:"removed"},Ui={type:"childadded",child:null},bo={type:"childremoved",child:null};class Qe extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qe.DEFAULT_UP.clone();const e=new C,t=new pn,n=new At,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new Ve}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=Qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Pc,e)}rotateY(e){return this.rotateOnAxis(Ic,e)}rotateZ(e){return this.rotateOnAxis(Lc,e)}translateOnAxis(e,t){return Rc.copy(e).applyQuaternion(this.quaternion),this.position.add(Rc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pc,e)}translateY(e){return this.translateOnAxis(Ic,e)}translateZ(e){return this.translateOnAxis(Lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cr.copy(e):cr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(vs,cr,this.up):Wn.lookAt(cr,vs,this.up),this.quaternion.setFromRotationMatrix(Wn),i&&(Wn.extractRotation(i.matrixWorld),Fi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),bo.child=e,this.dispatchEvent(bo),bo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,e,vf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let h=0,f=c.length;h<f;h++){const l=c[h];s(e.shapes,l)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),h=o(e.textures),f=o(e.images),l=o(e.shapes),u=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),l.length>0&&(n.shapes=l),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const h in a){const f=a[h];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Qe.DEFAULT_UP=new C(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pe extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mf={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(h,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const f=h.joints["index-finger-tip"],l=h.joints["thumb-tip"],u=f.position.distanceTo(l.position),d=.02,p=.005;h.inputState.pinching&&u>d+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&u<=d-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Pe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},hr={h:0,s:0,l:0};function To(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=Ul(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=To(o,s,e+1/3),this.g=To(o,s,e),this.b=To(o,s,e-1/3)}return Ze.colorSpaceToWorking(this,i),this}setStyle(e,t=Et){function n(s){s!==void 0&&parseFloat(s)<1&&Ee("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ee("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const n=pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=jn(e.r),this.g=jn(e.g),this.b=jn(e.b),this}copyLinearToSRGB(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Ze.workingToColorSpace(Gt.copy(this),e),Math.round(Ye(Gt.r*255,0,255))*65536+Math.round(Ye(Gt.g*255,0,255))*256+Math.round(Ye(Gt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Gt.copy(this),t);const n=Gt.r,i=Gt.g,s=Gt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,h;const f=(a+o)/2;if(a===o)c=0,h=0;else{const l=o-a;switch(h=f<=.5?l/(o+a):l/(2-o-a),o){case n:c=(i-s)/l+(i<s?6:0);break;case i:c=(s-n)/l+2;break;case s:c=(n-i)/l+4;break}c/=6}return e.h=c,e.s=h,e.l=f,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Et){Ze.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,n=Gt.g,i=Gt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(hr);const n=ks(ii.h,hr.h,t),i=ks(ii.s,hr.s,t),s=ks(ii.l,hr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new fe;fe.NAMES=pu;class Bl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new fe(e),this.near=t,this.far=n}clone(){return new Bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bf extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const _n=new C,Xn=new C,Eo=new C,qn=new C,Oi=new C,Bi=new C,Nc=new C,Ao=new C,Co=new C,Ro=new C,Po=new _t,Io=new _t,Lo=new _t;class yn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),_n.subVectors(e,t),i.cross(_n);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){_n.subVectors(i,t),Xn.subVectors(n,t),Eo.subVectors(e,t);const o=_n.dot(_n),a=_n.dot(Xn),c=_n.dot(Eo),h=Xn.dot(Xn),f=Xn.dot(Eo),l=o*h-a*a;if(l===0)return s.set(0,0,0),null;const u=1/l,d=(h*c-a*f)*u,p=(o*f-a*c)*u;return s.set(1-d-p,p,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qn.x),c.addScaledVector(o,qn.y),c.addScaledVector(a,qn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,o){return Po.setScalar(0),Io.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,n),Lo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Po,s.x),o.addScaledVector(Io,s.y),o.addScaledVector(Lo,s.z),o}static isFrontFacing(e,t,n,i){return _n.subVectors(n,t),Xn.subVectors(e,t),_n.cross(Xn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),_n.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Oi.subVectors(i,n),Bi.subVectors(s,n),Ao.subVectors(e,n);const c=Oi.dot(Ao),h=Bi.dot(Ao);if(c<=0&&h<=0)return t.copy(n);Co.subVectors(e,i);const f=Oi.dot(Co),l=Bi.dot(Co);if(f>=0&&l<=f)return t.copy(i);const u=c*l-f*h;if(u<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(Oi,o);Ro.subVectors(e,s);const d=Oi.dot(Ro),p=Bi.dot(Ro);if(p>=0&&d<=p)return t.copy(s);const _=d*h-c*p;if(_<=0&&h>=0&&p<=0)return a=h/(h-p),t.copy(n).addScaledVector(Bi,a);const g=f*p-d*l;if(g<=0&&l-f>=0&&d-p>=0)return Nc.subVectors(s,i),a=(l-f)/(l-f+(d-p)),t.copy(i).addScaledVector(Nc,a);const m=1/(g+_+u);return o=_*m,a=u*m,t.copy(n).addScaledVector(Oi,o).addScaledVector(Bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class kn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xn):xn.fromBufferAttribute(s,o),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ur.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ur.copy(n.boundingBox)),ur.applyMatrix4(e.matrixWorld),this.union(ur)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ys),dr.subVectors(this.max,ys),ki.subVectors(e.a,ys),zi.subVectors(e.b,ys),Gi.subVectors(e.c,ys),si.subVectors(zi,ki),ri.subVectors(Gi,zi),pi.subVectors(ki,Gi);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-pi.z,pi.y,si.z,0,-si.x,ri.z,0,-ri.x,pi.z,0,-pi.x,-si.y,si.x,0,-ri.y,ri.x,0,-pi.y,pi.x,0];return!Do(t,ki,zi,Gi,dr)||(t=[1,0,0,0,1,0,0,0,1],!Do(t,ki,zi,Gi,dr))?!1:(fr.crossVectors(si,ri),t=[fr.x,fr.y,fr.z],Do(t,ki,zi,Gi,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new C,new C,new C,new C,new C,new C,new C,new C],xn=new C,ur=new kn,ki=new C,zi=new C,Gi=new C,si=new C,ri=new C,pi=new C,ys=new C,dr=new C,fr=new C,mi=new C;function Do(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){mi.fromArray(r,s);const a=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),c=e.dot(mi),h=t.dot(mi),f=n.dot(mi);if(Math.max(-Math.max(c,h,f),Math.min(c,h,f))>a)return!1}return!0}const Tt=new C,pr=new le;let wf=0;class gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ol,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXY(t,pr.x,pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ol&&(e.usage=this.usage),e}}class mu extends gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gu extends gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ke extends gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Tf=new kn,Ss=new C,No=new C;class zn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Tf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);const t=Ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ss,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(No.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(No)),this.expandByPoint(Ss.copy(e.center).sub(No))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Ef=0;const an=new Be,Fo=new Qe,Vi=new C,tn=new kn,Ms=new kn,Ut=new C;class ut extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vd(e)?gu:mu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return Fo.lookAt(e),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ke(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(tn.min,Ms.min),tn.expandByPoint(Ut),Ut.addVectors(tn.max,Ms.max),tn.expandByPoint(Ut)):(tn.expandByPoint(Ms.min),tn.expandByPoint(Ms.max))}tn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Ut.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ut));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let h=0,f=a.count;h<f;h++)Ut.fromBufferAttribute(a,h),c&&(Vi.fromBufferAttribute(e,h),Ut.add(Vi)),i=Math.max(i,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let S=0;S<n.count;S++)a[S]=new C,c[S]=new C;const h=new C,f=new C,l=new C,u=new le,d=new le,p=new le,_=new C,g=new C;function m(S,b,U){h.fromBufferAttribute(n,S),f.fromBufferAttribute(n,b),l.fromBufferAttribute(n,U),u.fromBufferAttribute(s,S),d.fromBufferAttribute(s,b),p.fromBufferAttribute(s,U),f.sub(h),l.sub(h),d.sub(u),p.sub(u);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(f).multiplyScalar(p.y).addScaledVector(l,-d.y).multiplyScalar(P),g.copy(l).multiplyScalar(d.x).addScaledVector(f,-p.x).multiplyScalar(P),a[S].add(_),a[b].add(_),a[U].add(_),c[S].add(g),c[b].add(g),c[U].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let S=0,b=x.length;S<b;++S){const U=x[S],P=U.start,F=U.count;for(let O=P,B=P+F;O<B;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const v=new C,y=new C,E=new C,T=new C;function R(S){E.fromBufferAttribute(i,S),T.copy(E);const b=a[S];v.copy(b),v.sub(E.multiplyScalar(E.dot(b))).normalize(),y.crossVectors(T,b);const P=y.dot(c[S])<0?-1:1;o.setXYZW(S,v.x,v.y,v.z,P)}for(let S=0,b=x.length;S<b;++S){const U=x[S],P=U.start,F=U.count;for(let O=P,B=P+F;O<B;O+=3)R(e.getX(O+0)),R(e.getX(O+1)),R(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const i=new C,s=new C,o=new C,a=new C,c=new C,h=new C,f=new C,l=new C;if(e)for(let u=0,d=e.count;u<d;u+=3){const p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),f.subVectors(o,s),l.subVectors(i,s),f.cross(l),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,g),a.add(f),c.add(f),h.add(f),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),f.subVectors(o,s),l.subVectors(i,s),f.cross(l),n.setXYZ(u+0,f.x,f.y,f.z),n.setXYZ(u+1,f.x,f.y,f.z),n.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,c){const h=a.array,f=a.itemSize,l=a.normalized,u=new h.constructor(c.length*f);let d=0,p=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*f;for(let m=0;m<f;m++)u[p++]=h[d++]}return new gt(u,f,l)}if(this.index===null)return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ut,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],h=e(c,n);t.setAttribute(a,h)}const s=this.morphAttributes;for(const a in s){const c=[],h=s[a];for(let f=0,l=h.length;f<l;f++){const u=h[f],d=e(u,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const h=o[a];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const h=n[c];e.data.attributes[c]=h.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],f=[];for(let l=0,u=h.length;l<u;l++){const d=h[l];f.push(d.toJSON(e.data))}f.length>0&&(i[c]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const h in i){const f=i[h];this.setAttribute(h,f.clone(t))}const s=e.morphAttributes;for(const h in s){const f=[],l=s[h];for(let u=0,d=l.length;u<d;u++)f.push(l[u].clone(t));this.morphAttributes[h]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let h=0,f=o.length;h<f;h++){const l=o[h];this.addGroup(l.start,l.count,l.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Af{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ol,this.updateRanges=[],this.version=0,this.uuid=fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ht=new C;class kl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Qr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new kl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Qr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Cf=0;class Un extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=fn(),this.name="",this.type="Material",this.blending=ji,this.side=jt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=va,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ee(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==jt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xa&&(n.blendSrc=this.blendSrc),this.blendDst!==va&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const $n=new C,Uo=new C,mr=new C,oi=new C,Oo=new C,gr=new C,Bo=new C;class oo{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Uo.copy(e).add(t).multiplyScalar(.5),mr.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(Uo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(mr),a=oi.dot(this.direction),c=-oi.dot(mr),h=oi.lengthSq(),f=Math.abs(1-o*o);let l,u,d,p;if(f>0)if(l=o*c-a,u=o*a-c,p=s*f,l>=0)if(u>=-p)if(u<=p){const _=1/f;l*=_,u*=_,d=l*(l+o*u+2*a)+u*(o*l+u+2*c)+h}else u=s,l=Math.max(0,-(o*u+a)),d=-l*l+u*(u+2*c)+h;else u=-s,l=Math.max(0,-(o*u+a)),d=-l*l+u*(u+2*c)+h;else u<=-p?(l=Math.max(0,-(-o*s+a)),u=l>0?-s:Math.min(Math.max(-s,-c),s),d=-l*l+u*(u+2*c)+h):u<=p?(l=0,u=Math.min(Math.max(-s,-c),s),d=u*(u+2*c)+h):(l=Math.max(0,-(o*s+a)),u=l>0?s:Math.min(Math.max(-s,-c),s),d=-l*l+u*(u+2*c)+h);else u=o>0?-s:s,l=Math.max(0,-(o*u+a)),d=-l*l+u*(u+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,l),i&&i.copy(Uo).addScaledVector(mr,u),d}intersectSphere(e,t){$n.subVectors(e.center,this.origin);const n=$n.dot(this.direction),i=$n.dot($n)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const h=1/this.direction.x,f=1/this.direction.y,l=1/this.direction.z,u=this.origin;return h>=0?(n=(e.min.x-u.x)*h,i=(e.max.x-u.x)*h):(n=(e.max.x-u.x)*h,i=(e.min.x-u.x)*h),f>=0?(s=(e.min.y-u.y)*f,o=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,o=(e.min.y-u.y)*f),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),l>=0?(a=(e.min.z-u.z)*l,c=(e.max.z-u.z)*l):(a=(e.max.z-u.z)*l,c=(e.min.z-u.z)*l),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,i,s){Oo.subVectors(t,e),gr.subVectors(n,e),Bo.crossVectors(Oo,gr);let o=this.direction.dot(Bo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,e);const c=a*this.direction.dot(gr.crossVectors(oi,gr));if(c<0)return null;const h=a*this.direction.dot(Oo.cross(oi));if(h<0||c+h>o)return null;const f=-a*oi.dot(Bo);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class De extends Un{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Fc=new Be,gi=new oo,_r=new zn,Uc=new C,xr=new C,vr=new C,yr=new C,ko=new C,Sr=new C,Oc=new C,Mr=new C;class ne extends Qe{constructor(e=new ut,t=new De){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Sr.set(0,0,0);for(let c=0,h=s.length;c<h;c++){const f=a[c],l=s[c];f!==0&&(ko.fromBufferAttribute(l,e),o?Sr.addScaledVector(ko,f):Sr.addScaledVector(ko.sub(t),f))}t.add(Sr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),gi.copy(e.ray).recast(e.near),!(_r.containsPoint(gi.origin)===!1&&(gi.intersectSphere(_r,Uc)===null||gi.origin.distanceToSquared(Uc)>(e.far-e.near)**2))&&(Fc.copy(s).invert(),gi.copy(e.ray).applyMatrix4(Fc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,h=s.attributes.uv,f=s.attributes.uv1,l=s.attributes.normal,u=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),v=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,E=v;y<E;y+=3){const T=a.getX(y),R=a.getX(y+1),S=a.getX(y+2);i=br(this,m,e,n,h,f,l,T,R,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const x=a.getX(g),v=a.getX(g+1),y=a.getX(g+2);i=br(this,o,e,n,h,f,l,x,v,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),v=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let y=x,E=v;y<E;y+=3){const T=y,R=y+1,S=y+2;i=br(this,m,e,n,h,f,l,T,R,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const x=g,v=g+1,y=g+2;i=br(this,o,e,n,h,f,l,x,v,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Rf(r,e,t,n,i,s,o,a){let c;if(e.side===$t?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===jt,a),c===null)return null;Mr.copy(a),Mr.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Mr);return h<t.near||h>t.far?null:{distance:h,point:Mr.clone(),object:r}}function br(r,e,t,n,i,s,o,a,c,h){r.getVertexPosition(a,xr),r.getVertexPosition(c,vr),r.getVertexPosition(h,yr);const f=Rf(r,e,t,n,xr,vr,yr,Oc);if(f){const l=new C;yn.getBarycoord(Oc,xr,vr,yr,l),i&&(f.uv=yn.getInterpolatedAttribute(i,a,c,h,l,new le)),s&&(f.uv1=yn.getInterpolatedAttribute(s,a,c,h,l,new le)),o&&(f.normal=yn.getInterpolatedAttribute(o,a,c,h,l,new C),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const u={a,b:c,c:h,normal:new C,materialIndex:0};yn.getNormal(xr,vr,yr,u.normal),f.face=u,f.barycoord=l}return f}const Bc=new C,kc=new _t,zc=new _t,Pf=new C,Gc=new Be,wr=new C,zo=new zn,Vc=new Be,Go=new oo;class If extends ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=mc,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new kn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wr),this.boundingBox.expandByPoint(wr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,wr),this.boundingSphere.expandByPoint(wr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zo.copy(this.boundingSphere),zo.applyMatrix4(i),e.ray.intersectsSphere(zo)!==!1&&(Vc.copy(i).invert(),Go.copy(e.ray).applyMatrix4(Vc),!(this.boundingBox!==null&&Go.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Go)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new _t,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===mc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Id?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;kc.fromBufferAttribute(i.attributes.skinIndex,e),zc.fromBufferAttribute(i.attributes.skinWeight,e),Bc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=zc.getComponent(s);if(o!==0){const a=kc.getComponent(s);Gc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Pf.copy(Bc).applyMatrix4(Gc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class _u extends Qe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class zl extends It{constructor(e=null,t=1,n=1,i,s,o,a,c,h=Rt,f=Rt,l,u){super(null,o,a,c,h,f,i,s,l,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hc=new Be,Lf=new Be;class Gl{constructor(e=[],t=[]){this.uuid=fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Lf;Hc.multiplyMatrices(a,t[s]),Hc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new zl(t,e,e,dn,un);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Ee("Skeleton: No bone found with UUID:",s),o=new _u),this.bones.push(o),this.boneInverses.push(new Be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class al extends gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hi=new Be,Wc=new Be,Tr=[],Xc=new kn,Df=new Be,bs=new ne,ws=new zn;class nn extends ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new al(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Df)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),Xc.copy(e.boundingBox).applyMatrix4(Hi),this.boundingBox.union(Xc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Hi),ws.copy(e.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(ws)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(n),e.ray.intersectsSphere(ws)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Hi),Wc.multiplyMatrices(n,Hi),bs.matrixWorld=Wc,bs.raycast(e,Tr);for(let o=0,a=Tr.length;o<a;o++){const c=Tr[o];c.instanceId=s,c.object=this,t.push(c)}Tr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new al(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new zl(new Float32Array(i*this.count),i,this.count,Pl,un));const s=this.morphTexture.source.data.data;let o=0;for(let h=0;h<n.length;h++)o+=n[h];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Vo=new C,Nf=new C,Ff=new Ve;class bi{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Vo.subVectors(n,t).cross(Nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ff.getNormalMatrix(e),i=this.coplanarPoint(Vo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new zn,Uf=new le(.5,.5),Er=new C;class Vl{constructor(e=new bi,t=new bi,n=new bi,i=new bi,s=new bi,o=new bi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],h=s[3],f=s[4],l=s[5],u=s[6],d=s[7],p=s[8],_=s[9],g=s[10],m=s[11],x=s[12],v=s[13],y=s[14],E=s[15];if(i[0].setComponents(h-o,d-f,m-p,E-x).normalize(),i[1].setComponents(h+o,d+f,m+p,E+x).normalize(),i[2].setComponents(h+a,d+l,m+_,E+v).normalize(),i[3].setComponents(h-a,d-l,m-_,E-v).normalize(),n)i[4].setComponents(c,u,g,y).normalize(),i[5].setComponents(h-c,d-u,m-g,E-y).normalize();else if(i[4].setComponents(h-c,d-u,m-g,E-y).normalize(),t===Dn)i[5].setComponents(h+c,d+u,m+g,E+y).normalize();else if(t===Ks)i[5].setComponents(c,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=Uf.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Er.x=i.normal.x>0?e.max.x:e.min.x,Er.y=i.normal.y>0?e.max.y:e.min.y,Er.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xu extends Un{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const to=new C,no=new C,qc=new Be,Ts=new oo,Ar=new zn,Ho=new C,Yc=new C;class Hl extends Qe{constructor(e=new ut,t=new xu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)to.fromBufferAttribute(t,i-1),no.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=to.distanceTo(no);e.setAttribute("lineDistance",new Ke(n,1))}else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(i),Ar.radius+=s,e.ray.intersectsSphere(Ar)===!1)return;qc.copy(i).invert(),Ts.copy(e.ray).applyMatrix4(qc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=this.isLineSegments?2:1,f=n.index,u=n.attributes.position;if(f!==null){const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=h){const m=f.getX(_),x=f.getX(_+1),v=Cr(this,e,Ts,c,m,x,_);v&&t.push(v)}if(this.isLineLoop){const _=f.getX(p-1),g=f.getX(d),m=Cr(this,e,Ts,c,_,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=h){const m=Cr(this,e,Ts,c,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Cr(this,e,Ts,c,p-1,d,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Cr(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(to.fromBufferAttribute(a,i),no.fromBufferAttribute(a,s),t.distanceSqToSegment(to,no,Ho,Yc)>n)return;Ho.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(Ho);if(!(h<e.near||h>e.far))return{distance:h,point:Yc.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const $c=new C,Kc=new C;class Of extends Hl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)$c.fromBufferAttribute(t,i),Kc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+$c.distanceTo(Kc);e.setAttribute("lineDistance",new Ke(n,1))}else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bf extends Hl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class io extends Un{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zc=new Be,ll=new oo,Rr=new zn,Pr=new C;class cl extends Qe{constructor(e=new ut,t=new io){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(i),Rr.radius+=s,e.ray.intersectsSphere(Rr)===!1)return;Zc.copy(i).invert(),ll.copy(e.ray).applyMatrix4(Zc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=n.index,l=n.attributes.position;if(h!==null){const u=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let p=u,_=d;p<_;p++){const g=h.getX(p);Pr.fromBufferAttribute(l,g),jc(Pr,g,c,i,e,t,this)}}else{const u=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=u,_=d;p<_;p++)Pr.fromBufferAttribute(l,p),jc(Pr,p,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function jc(r,e,t,n,i,s,o){const a=ll.distanceSqToPoint(r);if(a<t){const c=new C;ll.closestPointToPoint(r,c),c.applyMatrix4(n);const h=i.ray.origin.distanceTo(c);if(h<i.near||h>i.far)return;s.push({distance:h,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class vu extends It{constructor(e=[],t=Ci,n,i,s,o,a,c,h,f){super(e,t,n,i,s,o,a,c,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ds extends It{constructor(e,t,n,i,s,o,a,c,h){super(e,t,n,i,s,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class js extends It{constructor(e,t,n=On,i,s,o,a=Rt,c=Rt,h,f=Jn,l=1){if(f!==Jn&&f!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:l};super(u,i,s,o,a,c,f,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ol(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kf extends js{constructor(e,t=On,n=Ci,i,s,o=Rt,a=Rt,c,h=Jn){const f={width:e,height:e,depth:1},l=[f,f,f,f,f,f];super(e,e,t,n,i,s,o,a,c,h),this.image=l,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yu extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ht extends ut{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],h=[],f=[],l=[];let u=0,d=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ke(h,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(l,2));function p(_,g,m,x,v,y,E,T,R,S,b){const U=y/R,P=E/S,F=y/2,O=E/2,B=T/2,H=R+1,k=S+1;let G=0,j=0;const Z=new C;for(let ae=0;ae<k;ae++){const he=ae*P-O;for(let pe=0;pe<H;pe++){const Ie=pe*U-F;Z[_]=Ie*x,Z[g]=he*v,Z[m]=B,h.push(Z.x,Z.y,Z.z),Z[_]=0,Z[g]=0,Z[m]=T>0?1:-1,f.push(Z.x,Z.y,Z.z),l.push(pe/R),l.push(1-ae/S),G+=1}}for(let ae=0;ae<S;ae++)for(let he=0;he<R;he++){const pe=u+he+H*ae,Ie=u+he+H*(ae+1),nt=u+(he+1)+H*(ae+1),at=u+(he+1)+H*ae;c.push(pe,Ie,at),c.push(Ie,nt,at),j+=6}a.addGroup(d,j,b),d+=j,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ao extends ut{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],c=[],h=new C,f=new le;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let l=0,u=3;l<=t;l++,u+=3){const d=n+l/t*i;h.x=e*Math.cos(d),h.y=e*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),f.x=(o[u]/e+1)/2,f.y=(o[u+1]/e+1)/2,c.push(f.x,f.y)}for(let l=1;l<=t;l++)s.push(l,l+1,0);this.setIndex(s),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(a,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jt extends ut{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const h=this;i=Math.floor(i),s=Math.floor(s);const f=[],l=[],u=[],d=[];let p=0;const _=[],g=n/2;let m=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(f),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(d,2));function x(){const y=new C,E=new C;let T=0;const R=(t-e)/n;for(let S=0;S<=s;S++){const b=[],U=S/s,P=U*(t-e)+e;for(let F=0;F<=i;F++){const O=F/i,B=O*c+a,H=Math.sin(B),k=Math.cos(B);E.x=P*H,E.y=-U*n+g,E.z=P*k,l.push(E.x,E.y,E.z),y.set(H,R,k).normalize(),u.push(y.x,y.y,y.z),d.push(O,1-U),b.push(p++)}_.push(b)}for(let S=0;S<i;S++)for(let b=0;b<s;b++){const U=_[b][S],P=_[b+1][S],F=_[b+1][S+1],O=_[b][S+1];(e>0||b!==0)&&(f.push(U,P,O),T+=3),(t>0||b!==s-1)&&(f.push(P,F,O),T+=3)}h.addGroup(m,T,0),m+=T}function v(y){const E=p,T=new le,R=new C;let S=0;const b=y===!0?e:t,U=y===!0?1:-1;for(let F=1;F<=i;F++)l.push(0,g*U,0),u.push(0,U,0),d.push(.5,.5),p++;const P=p;for(let F=0;F<=i;F++){const B=F/i*c+a,H=Math.cos(B),k=Math.sin(B);R.x=b*k,R.y=g*U,R.z=b*H,l.push(R.x,R.y,R.z),u.push(0,U,0),T.x=H*.5+.5,T.y=k*.5*U+.5,d.push(T.x,T.y),p++}for(let F=0;F<i;F++){const O=E+F,B=P+F;y===!0?f.push(B,B+1,O):f.push(B+1,B,O),S+=3}h.addGroup(m,S,y===!0?1:2),m+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sn extends Jt{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Sn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lo extends ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),h(n),f(),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(s.slice(),3)),this.setAttribute("uv",new Ke(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new C,y=new C,E=new C;for(let T=0;T<t.length;T+=3)d(t[T+0],v),d(t[T+1],y),d(t[T+2],E),c(v,y,E,x)}function c(x,v,y,E){const T=E+1,R=[];for(let S=0;S<=T;S++){R[S]=[];const b=x.clone().lerp(y,S/T),U=v.clone().lerp(y,S/T),P=T-S;for(let F=0;F<=P;F++)F===0&&S===T?R[S][F]=b:R[S][F]=b.clone().lerp(U,F/P)}for(let S=0;S<T;S++)for(let b=0;b<2*(T-S)-1;b++){const U=Math.floor(b/2);b%2===0?(u(R[S][U+1]),u(R[S+1][U]),u(R[S][U])):(u(R[S][U+1]),u(R[S+1][U+1]),u(R[S+1][U]))}}function h(x){const v=new C;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(x),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function f(){const x=new C;for(let v=0;v<s.length;v+=3){x.x=s[v+0],x.y=s[v+1],x.z=s[v+2];const y=g(x)/2/Math.PI+.5,E=m(x)/Math.PI+.5;o.push(y,1-E)}p(),l()}function l(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],E=o[x+4],T=Math.max(v,y,E),R=Math.min(v,y,E);T>.9&&R<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),E<.2&&(o[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function d(x,v){const y=x*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function p(){const x=new C,v=new C,y=new C,E=new C,T=new le,R=new le,S=new le;for(let b=0,U=0;b<s.length;b+=9,U+=6){x.set(s[b+0],s[b+1],s[b+2]),v.set(s[b+3],s[b+4],s[b+5]),y.set(s[b+6],s[b+7],s[b+8]),T.set(o[U+0],o[U+1]),R.set(o[U+2],o[U+3]),S.set(o[U+4],o[U+5]),E.copy(x).add(v).add(y).divideScalar(3);const P=g(E);_(T,U+0,x,P),_(R,U+2,v,P),_(S,U+4,y,P)}}function _(x,v,y,E){E<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=E/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.vertices,e.indices,e.radius,e.detail)}}class Gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ee("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,h;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),h=n[i]-o,h<0)a=i+1;else if(h>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const f=n[i],u=n[i+1]-f,d=(o-f)/u;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=t||(o.isVector2?new le:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,i=[],s=[],o=[],a=new C,c=new Be;for(let d=0;d<=e;d++){const p=d/e;i[d]=this.getTangentAt(p,new C)}s[0]=new C,o[0]=new C;let h=Number.MAX_VALUE;const f=Math.abs(i[0].x),l=Math.abs(i[0].y),u=Math.abs(i[0].z);f<=h&&(h=f,n.set(1,0,0)),l<=h&&(h=l,n.set(0,1,0)),u<=h&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ye(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(Ye(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],d*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wl extends Gn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new le){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const f=Math.cos(this.aRotation),l=Math.sin(this.aRotation),u=c-this.aX,d=h-this.aY;c=u*f-d*l+this.aX,h=u*l+d*f+this.aY}return n.set(c,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class zf extends Wl{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Xl(){let r=0,e=0,t=0,n=0;function i(s,o,a,c){r=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,h){i(o,a,h*(a-s),h*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,h,f,l){let u=(o-s)/h-(a-s)/(h+f)+(a-o)/f,d=(a-o)/f-(c-o)/(f+l)+(c-a)/l;u*=f,d*=f,i(o,a,u,d)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const Ir=new C,Wo=new Xl,Xo=new Xl,qo=new Xl;class ql extends Gn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let h,f;this.closed||a>0?h=i[(a-1)%s]:(Ir.subVectors(i[0],i[1]).add(i[0]),h=Ir);const l=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s?f=i[(a+2)%s]:(Ir.subVectors(i[s-1],i[s-2]).add(i[s-1]),f=Ir),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(h.distanceToSquared(l),d),_=Math.pow(l.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(f),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Wo.initNonuniformCatmullRom(h.x,l.x,u.x,f.x,p,_,g),Xo.initNonuniformCatmullRom(h.y,l.y,u.y,f.y,p,_,g),qo.initNonuniformCatmullRom(h.z,l.z,u.z,f.z,p,_,g)}else this.curveType==="catmullrom"&&(Wo.initCatmullRom(h.x,l.x,u.x,f.x,this.tension),Xo.initCatmullRom(h.y,l.y,u.y,f.y,this.tension),qo.initCatmullRom(h.z,l.z,u.z,f.z,this.tension));return n.set(Wo.calc(c),Xo.calc(c),qo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Jc(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,c=r*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*r+t}function Gf(r,e){const t=1-r;return t*t*e}function Vf(r,e){return 2*(1-r)*r*e}function Hf(r,e){return r*r*e}function zs(r,e,t,n){return Gf(r,e)+Vf(r,t)+Hf(r,n)}function Wf(r,e){const t=1-r;return t*t*t*e}function Xf(r,e){const t=1-r;return 3*t*t*r*e}function qf(r,e){return 3*(1-r)*r*r*e}function Yf(r,e){return r*r*r*e}function Gs(r,e,t,n,i){return Wf(r,e)+Xf(r,t)+qf(r,n)+Yf(r,i)}class Su extends Gn{constructor(e=new le,t=new le,n=new le,i=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new le){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Gs(e,i.x,s.x,o.x,a.x),Gs(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $f extends Gn{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Gs(e,i.x,s.x,o.x,a.x),Gs(e,i.y,s.y,o.y,a.y),Gs(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mu extends Gn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kf extends Gn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bu extends Gn{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(zs(e,i.x,s.x,o.x),zs(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wu extends Gn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(zs(e,i.x,s.x,o.x),zs(e,i.y,s.y,o.y),zs(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tu extends Gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],h=i[o],f=i[o>i.length-2?i.length-1:o+1],l=i[o>i.length-3?i.length-1:o+2];return n.set(Jc(a,c.x,h.x,f.x,l.x),Jc(a,c.y,h.y,f.y,l.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new le().fromArray(i))}return this}}var hl=Object.freeze({__proto__:null,ArcCurve:zf,CatmullRomCurve3:ql,CubicBezierCurve:Su,CubicBezierCurve3:$f,EllipseCurve:Wl,LineCurve:Mu,LineCurve3:Kf,QuadraticBezierCurve:bu,QuadraticBezierCurve3:wu,SplineCurve:Tu});class Zf extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),h=c===0?0:1-o/c;return a.getPointAt(h,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let h=0;h<c.length;h++){const f=c[h];n&&n.equals(f)||(t.push(f),n=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new hl[i.type]().fromJSON(i))}return this}}class ul extends Zf{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Mu(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new bu(this.currentPoint.clone(),new le(e,t),new le(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new Su(this.currentPoint.clone(),new le(e,t),new le(n,i),new le(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Tu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,c){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+h,t+f,n,i,s,o,a,c),this}absellipse(e,t,n,i,s,o,a,c){const h=new Wl(e,t,n,i,s,o,a,c);if(this.curves.length>0){const l=h.getPoint(0);l.equals(this.currentPoint)||this.lineTo(l.x,l.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yl extends ul{constructor(e){super(e),this.uuid=fn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new ul().fromJSON(i))}return this}}function jf(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Eu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,h;if(n&&(s=np(r,e,s,t)),r.length>80*t){a=r[0],c=r[1];let f=a,l=c;for(let u=t;u<i;u+=t){const d=r[u],p=r[u+1];d<a&&(a=d),p<c&&(c=p),d>f&&(f=d),p>l&&(l=p)}h=Math.max(f-a,l-c),h=h!==0?32767/h:0}return Js(s,o,t,a,c,h,0),o}function Eu(r,e,t,n,i){let s;if(i===fp(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=Qc(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Qc(o/n|0,r[o],r[o+1],s);return s&&rs(s,s.next)&&(er(s),s=s.next),s}function Ri(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(rs(t,t.next)||vt(t.prev,t,t.next)===0)){if(er(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Js(r,e,t,n,i,s,o){if(!r)return;!o&&s&&ap(r,n,i,s);let a=r;for(;r.prev!==r.next;){const c=r.prev,h=r.next;if(s?Qf(r,n,i,s):Jf(r)){e.push(c.i,r.i,h.i),er(r),r=h.next,a=h.next;continue}if(r=h,r===a){o?o===1?(r=ep(Ri(r),e),Js(r,e,t,n,i,s,2)):o===2&&tp(r,e,t,n,i,s):Js(Ri(r),e,t,n,i,s,1);break}}}function Jf(r){const e=r.prev,t=r,n=r.next;if(vt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,c=t.y,h=n.y,f=Math.min(i,s,o),l=Math.min(a,c,h),u=Math.max(i,s,o),d=Math.max(a,c,h);let p=n.next;for(;p!==e;){if(p.x>=f&&p.x<=u&&p.y>=l&&p.y<=d&&Fs(i,a,s,c,o,h,p.x,p.y)&&vt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Qf(r,e,t,n){const i=r.prev,s=r,o=r.next;if(vt(i,s,o)>=0)return!1;const a=i.x,c=s.x,h=o.x,f=i.y,l=s.y,u=o.y,d=Math.min(a,c,h),p=Math.min(f,l,u),_=Math.max(a,c,h),g=Math.max(f,l,u),m=dl(d,p,e,t,n),x=dl(_,g,e,t,n);let v=r.prevZ,y=r.nextZ;for(;v&&v.z>=m&&y&&y.z<=x;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Fs(a,f,c,l,h,u,v.x,v.y)&&vt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=d&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Fs(a,f,c,l,h,u,y.x,y.y)&&vt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&Fs(a,f,c,l,h,u,v.x,v.y)&&vt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=x;){if(y.x>=d&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Fs(a,f,c,l,h,u,y.x,y.y)&&vt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ep(r,e){let t=r;do{const n=t.prev,i=t.next.next;!rs(n,i)&&Cu(n,t,t.next,i)&&Qs(n,i)&&Qs(i,n)&&(e.push(n.i,t.i,i.i),er(t),er(t.next),t=r=i),t=t.next}while(t!==r);return Ri(t)}function tp(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&hp(o,a)){let c=Ru(o,a);o=Ri(o,o.next),c=Ri(c,c.next),Js(o,e,t,n,i,s,0),Js(c,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function np(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*n,c=s<o-1?e[s+1]*n:r.length,h=Eu(r,a,c,n,!1);h===h.next&&(h.steiner=!0),i.push(cp(h))}i.sort(ip);for(let s=0;s<i.length;s++)t=sp(i[s],t);return t}function ip(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function sp(r,e){const t=rp(r,e);if(!t)return e;const n=Ru(t,r);return Ri(n,n.next),Ri(t,t.next)}function rp(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(rs(r,t))return t;do{if(rs(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const l=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(l<=n&&l>s&&(s=l,o=t.x<t.next.x?t:t.next,l===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,h=o.y;let f=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Au(i<h?n:s,i,c,h,i<h?s:n,i,t.x,t.y)){const l=Math.abs(i-t.y)/(n-t.x);Qs(t,r)&&(l<f||l===f&&(t.x>o.x||t.x===o.x&&op(o,t)))&&(o=t,f=l)}t=t.next}while(t!==a);return o}function op(r,e){return vt(r.prev,r,e.prev)<0&&vt(e.next,r,r.next)<0}function ap(r,e,t,n){let i=r;do i.z===0&&(i.z=dl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,lp(i)}function lp(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let h=0;h<t&&(a++,o=o.nextZ,!!o);h++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function dl(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function cp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Au(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function Fs(r,e,t,n,i,s,o,a){return!(r===o&&e===a)&&Au(r,e,t,n,i,s,o,a)}function hp(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!up(r,e)&&(Qs(r,e)&&Qs(e,r)&&dp(r,e)&&(vt(r.prev,r,e.prev)||vt(r,e.prev,e))||rs(r,e)&&vt(r.prev,r,r.next)>0&&vt(e.prev,e,e.next)>0)}function vt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function rs(r,e){return r.x===e.x&&r.y===e.y}function Cu(r,e,t,n){const i=Dr(vt(r,e,t)),s=Dr(vt(r,e,n)),o=Dr(vt(t,n,r)),a=Dr(vt(t,n,e));return!!(i!==s&&o!==a||i===0&&Lr(r,t,e)||s===0&&Lr(r,n,e)||o===0&&Lr(t,r,n)||a===0&&Lr(t,e,n))}function Lr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Dr(r){return r>0?1:r<0?-1:0}function up(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Cu(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Qs(r,e){return vt(r.prev,r,r.next)<0?vt(r,e,r.next)>=0&&vt(r,r.prev,e)>=0:vt(r,e,r.prev)<0||vt(r,r.next,e)<0}function dp(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Ru(r,e){const t=fl(r.i,r.x,r.y),n=fl(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Qc(r,e,t,n){const i=fl(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function er(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function fl(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fp(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class pp{static triangulate(e,t,n=2){return jf(e,t,n)}}class Vs{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return Vs.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];eh(e),th(n,e);let o=e.length;t.forEach(eh);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,th(n,t[c]);const a=pp.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function eh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function th(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Ai extends lo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ai(e.radius,e.detail)}}class tr extends lo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new tr(e.radius,e.detail)}}class ui extends ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),h=a+1,f=c+1,l=e/a,u=t/c,d=[],p=[],_=[],g=[];for(let m=0;m<f;m++){const x=m*u-o;for(let v=0;v<h;v++){const y=v*l-s;p.push(y,-x,0),_.push(0,0,1),g.push(v/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const v=x+h*m,y=x+h*(m+1),E=x+1+h*(m+1),T=x+1+h*m;d.push(v,y,T),d.push(y,E,T)}this.setIndex(d),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(_,3)),this.setAttribute("uv",new Ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.width,e.height,e.widthSegments,e.heightSegments)}}class nr extends ut{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],h=[],f=[];let l=e;const u=(t-e)/i,d=new C,p=new le;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){const m=s+g/n*o;d.x=l*Math.cos(m),d.y=l*Math.sin(m),c.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/t+1)/2,p.y=(d.y/t+1)/2,f.push(p.x,p.y)}l+=u}for(let _=0;_<i;_++){const g=_*(n+1);for(let m=0;m<n;m++){const x=m+g,v=x,y=x+n+1,E=x+n+2,T=x+1;a.push(v,y,T),a.push(y,E,T)}}this.setIndex(a),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class sr extends ut{constructor(e=new Yl([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)h(e);else for(let f=0;f<e.length;f++)h(e[f]),this.addGroup(a,c,f),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ke(i,3)),this.setAttribute("normal",new Ke(s,3)),this.setAttribute("uv",new Ke(o,2));function h(f){const l=i.length/3,u=f.extractPoints(t);let d=u.shape;const p=u.holes;Vs.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const x=p[g];Vs.isClockWise(x)===!0&&(p[g]=x.reverse())}const _=Vs.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const x=p[g];d=d.concat(x)}for(let g=0,m=d.length;g<m;g++){const x=d[g];i.push(x.x,x.y,0),s.push(0,0,1),o.push(x.x,x.y)}for(let g=0,m=_.length;g<m;g++){const x=_[g],v=x[0]+l,y=x[1]+l,E=x[2]+l;n.push(v,y,E),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return mp(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new sr(n,e.curveSegments)}}function mp(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class Bn extends ut{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let h=0;const f=[],l=new C,u=new C,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let E=0;E<=t;E++){const T=E/t;l.x=-e*Math.cos(i+T*s)*Math.sin(o+v*a),l.y=e*Math.cos(o+v*a),l.z=e*Math.sin(i+T*s)*Math.sin(o+v*a),p.push(l.x,l.y,l.z),u.copy(l).normalize(),_.push(u.x,u.y,u.z),g.push(T+y,1-v),x.push(h++)}f.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=f[m][x+1],y=f[m][x],E=f[m+1][x],T=f[m+1][x+1];(m!==0||o>0)&&d.push(v,y,T),(m!==n-1||c<Math.PI)&&d.push(y,E,T)}this.setIndex(d),this.setAttribute("position",new Ke(p,3)),this.setAttribute("normal",new Ke(_,3)),this.setAttribute("uv",new Ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class $l extends ut{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);const c=[],h=[],f=[],l=[],u=new C,d=new C,p=new C;for(let _=0;_<=n;_++){const g=o+_/n*a;for(let m=0;m<=i;m++){const x=m/i*s;d.x=(e+t*Math.cos(g))*Math.cos(x),d.y=(e+t*Math.cos(g))*Math.sin(x),d.z=t*Math.sin(g),h.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),p.subVectors(d,u).normalize(),f.push(p.x,p.y,p.z),l.push(m/i),l.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){const m=(i+1)*_+g-1,x=(i+1)*(_-1)+g-1,v=(i+1)*(_-1)+g,y=(i+1)*_+g;c.push(m,x,y),c.push(x,v,y)}this.setIndex(c),this.setAttribute("position",new Ke(h,3)),this.setAttribute("normal",new Ke(f,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Kl extends ut{constructor(e=new wu(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new C,c=new C,h=new le;let f=new C;const l=[],u=[],d=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(d,2));function _(){for(let v=0;v<t;v++)g(v);g(s===!1?t:0),x(),m()}function g(v){f=e.getPointAt(v/t,f);const y=o.normals[v],E=o.binormals[v];for(let T=0;T<=i;T++){const R=T/i*Math.PI*2,S=Math.sin(R),b=-Math.cos(R);c.x=b*y.x+S*E.x,c.y=b*y.y+S*E.y,c.z=b*y.z+S*E.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=f.x+n*c.x,a.y=f.y+n*c.y,a.z=f.z+n*c.z,l.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=t;v++)for(let y=1;y<=i;y++){const E=(i+1)*(v-1)+(y-1),T=(i+1)*v+(y-1),R=(i+1)*v+y,S=(i+1)*(v-1)+y;p.push(E,T,S),p.push(T,R,S)}}function x(){for(let v=0;v<=t;v++)for(let y=0;y<=i;y++)h.x=v/t,h.y=y/i,d.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Kl(new hl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function os(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Wt(r){const e={};for(let t=0;t<r.length;t++){const n=os(r[t]);for(const i in n)e[i]=n[i]}return e}function gp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Pu(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const ir={clone:os,merge:Wt};var _p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pt extends Un{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=gp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Iu extends Pt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ze extends Un{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class on extends ze{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ye(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class vp extends Un{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yp extends Un{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Nr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Sp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function nh(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function Lu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class fs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Mp extends fs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_c,endingEnd:_c}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case xc:s=e,a=2*t-n;break;case vc:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case xc:o=e,c=2*n-t;break;case vc:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const h=(n-t)*.5,f=this.valueSize;this._weightPrev=h/(t-a),this._weightNext=h/(c-n),this._offsetPrev=s*f,this._offsetNext=o*f}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,f=this._offsetPrev,l=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,x=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,v=(-1-d)*g+(1.5+d)*_+.5*p,y=d*g-d*_;for(let E=0;E!==a;++E)s[E]=m*o[f+E]+x*o[h+E]+v*o[c+E]+y*o[l+E];return s}}class bp extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,f=(n-t)/(i-t),l=1-f;for(let u=0;u!==a;++u)s[u]=o[h+u]*l+o[c+u]*f;return s}}class wp extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Tp extends fs{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,h=c-a,f=this.settings||this.DefaultSettings_,l=f.inTangents,u=f.outTangents;if(!l||!u){const _=(n-t)/(i-t),g=1-_;for(let m=0;m!==a;++m)s[m]=o[h+m]*g+o[c+m]*_;return s}const d=a*2,p=e-1;for(let _=0;_!==a;++_){const g=o[h+_],m=o[c+_],x=p*d+_*2,v=u[x],y=u[x+1],E=e*d+_*2,T=l[E],R=l[E+1];let S=(n-t)/(i-t),b,U,P,F,O;for(let B=0;B<8;B++){b=S*S,U=b*S,P=1-S,F=P*P,O=F*P;const k=O*t+3*F*S*v+3*P*b*T+U*i-n;if(Math.abs(k)<1e-10)break;const G=3*F*(v-t)+6*P*S*(T-v)+3*b*(i-T);if(Math.abs(G)<1e-10)break;S=S-k/G,S=Math.max(0,Math.min(1,S))}s[_]=O*g+3*F*S*y+3*P*b*R+U*m}return s}}class Mn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Nr(t,this.TimeBufferType),this.values=Nr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Nr(e.times,Array),values:Nr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new wp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Tp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ys:t=this.InterpolantFactoryMethodDiscrete;break;case $s:t=this.InterpolantFactoryMethodLinear;break;case xo:t=this.InterpolantFactoryMethodSmooth;break;case gc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ys;case this.InterpolantFactoryMethodLinear:return $s;case this.InterpolantFactoryMethodSmooth:return xo;case this.InterpolantFactoryMethodBezier:return gc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Fe("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&Hd(i))for(let a=0,c=i.length;a!==c;++a){const h=i[a];if(isNaN(h)){Fe("KeyframeTrack: Value is not a valid number.",this,a,h),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===xo,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const h=e[a],f=e[a+1];if(h!==f&&(a!==1||h!==e[0]))if(i)c=!0;else{const l=a*n,u=l-n,d=l+n;for(let p=0;p!==n;++p){const _=t[l+p];if(_!==t[u+p]||_!==t[d+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const l=a*n,u=o*n;for(let d=0;d!==n;++d)t[u+d]=t[l+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,h=0;h!==n;++h)t[c+h]=t[a+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=$s;class ps extends Mn{constructor(e,t,n){super(e,t,n)}}ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Ys;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Du extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}Du.prototype.ValueTypeName="color";class as extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}as.prototype.ValueTypeName="number";class Ep extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let h=e*a;for(let f=h+a;h!==f;h+=4)At.slerpFlat(s,0,o,h-a,o,h,c);return s}}class ls extends Mn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ep(this.times,this.values,this.getValueSize(),e)}}ls.prototype.ValueTypeName="quaternion";ls.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends Mn{constructor(e,t,n){super(e,t,n)}}ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=Ys;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class cs extends Mn{constructor(e,t,n,i){super(e,t,n,i)}}cs.prototype.ValueTypeName="vector";class Ap{constructor(e="",t=-1,n=[],i=Ld){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=fn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Rp(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Mn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],h=[];c.push((a+s-1)%s,a,(a+1)%s),h.push(0,1,0);const f=Sp(c);c=nh(c,1,f),h=nh(h,1,f),!i&&c[0]===0&&(c.push(s),h.push(h[0])),o.push(new as(".morphTargetInfluences["+t[a].name+"]",c,h).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const h=e[a],f=h.name.match(s);if(f&&f.length>1){const l=f[1];let u=i[l];u||(i[l]=u=[]),u.push(h)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(Ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Fe("AnimationClip: No animation in JSONLoader data."),null;const n=function(l,u,d,p,_){if(d.length!==0){const g=[],m=[];Lu(d,g,m,p),g.length!==0&&_.push(new l(u,g,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const h=e.hierarchy||[];for(let l=0;l<h.length;l++){const u=h[l].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const d={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let _=0;_<u[p].morphTargets.length;_++)d[u[p].morphTargets[_]]=-1;for(const _ in d){const g=[],m=[];for(let x=0;x!==u[p].morphTargets.length;++x){const v=u[p];g.push(v.time),m.push(v.morphTarget===_?1:0)}i.push(new as(".morphTargetInfluence["+_+"]",g,m))}c=d.length*o}else{const d=".bones["+t[l].name+"]";n(cs,d+".position",u,"pos",i),n(ls,d+".quaternion",u,"rot",i),n(cs,d+".scale",u,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Cp(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return as;case"vector":case"vector2":case"vector3":case"vector4":return cs;case"color":return Du;case"quaternion":return ls;case"bool":case"boolean":return ps;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Rp(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Cp(r.type);if(r.times===void 0){const t=[],n=[];Lu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Zn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(ih(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!ih(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function ih(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Pp{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(f){a++,s===!1&&i.onStart!==void 0&&i.onStart(f,o,a),s=!0},this.itemEnd=function(f){o++,i.onProgress!==void 0&&i.onProgress(f,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(f){i.onError!==void 0&&i.onError(f)},this.resolveURL=function(f){return c?c(f):f},this.setURLModifier=function(f){return c=f,this},this.addHandler=function(f,l){return h.push(f,l),this},this.removeHandler=function(f){const l=h.indexOf(f);return l!==-1&&h.splice(l,2),this},this.getHandler=function(f){for(let l=0,u=h.length;l<u;l+=2){const d=h[l],p=h[l+1];if(d.global&&(d.lastIndex=0),d.test(f))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ip=new Pp;class gs{constructor(e){this.manager=e!==void 0?e:Ip,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}gs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Kn={};class Lp extends Error{constructor(e,t){super(e),this.response=t}}class Nu extends gs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Zn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Kn[e]!==void 0){Kn[e].push({onLoad:t,onProgress:n,onError:i});return}Kn[e]=[],Kn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&Ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;const f=Kn[e],l=h.body.getReader(),u=h.headers.get("X-File-Size")||h.headers.get("Content-Length"),d=u?parseInt(u):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){x();function x(){l.read().then(({done:v,value:y})=>{if(v)m.close();else{_+=y.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let T=0,R=f.length;T<R;T++){const S=f[T];S.onProgress&&S.onProgress(E)}m.enqueue(y),x()}},v=>{m.error(v)})}}});return new Response(g)}else throw new Lp(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(c){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(f=>new DOMParser().parseFromString(f,a));case"json":return h.json();default:if(a==="")return h.text();{const l=/charset="?([^;"\s]*)"?/i.exec(a),u=l&&l[1]?l[1].toLowerCase():void 0,d=new TextDecoder(u);return h.arrayBuffer().then(p=>d.decode(p))}}}).then(h=>{Zn.add(`file:${e}`,h);const f=Kn[e];delete Kn[e];for(let l=0,u=f.length;l<u;l++){const d=f[l];d.onLoad&&d.onLoad(h)}}).catch(h=>{const f=Kn[e];if(f===void 0)throw this.manager.itemError(e),h;delete Kn[e];for(let l=0,u=f.length;l<u;l++){const d=f[l];d.onError&&d.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Wi=new WeakMap;class Dp extends gs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Zn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let l=Wi.get(o);l===void 0&&(l=[],Wi.set(o,l)),l.push({onLoad:t,onError:i})}return o}const a=Zs("img");function c(){f(),t&&t(this);const l=Wi.get(this)||[];for(let u=0;u<l.length;u++){const d=l[u];d.onLoad&&d.onLoad(this)}Wi.delete(this),s.manager.itemEnd(e)}function h(l){f(),i&&i(l),Zn.remove(`image:${e}`);const u=Wi.get(this)||[];for(let d=0;d<u.length;d++){const p=u[d];p.onError&&p.onError(l)}Wi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){a.removeEventListener("load",c,!1),a.removeEventListener("error",h,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",h,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Zn.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class Np extends gs{constructor(e){super(e)}load(e,t,n,i){const s=new It,o=new Dp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class co extends Qe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Fp extends co{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Yo=new Be,sh=new C,rh=new C;class Zl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vl,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;sh.setFromMatrixPosition(e.matrixWorld),t.position.copy(sh),rh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rh),t.updateMatrixWorld(),Yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ks||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Fr=new C,Ur=new At,wn=new C;class Fu extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fr,Ur,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,Ur,wn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Fr,Ur,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,Ur,wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ai=new C,oh=new le,ah=new le;class qt extends Fu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ai.x,ai.y).multiplyScalar(-e/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ai.x,ai.y).multiplyScalar(-e/ai.z)}getViewSize(e,t){return this.getViewBounds(e,oh,ah),t.subVectors(ah,oh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,h=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/h,i*=o.width/c,n*=o.height/h}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Up extends Zl{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ss*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Uu extends co{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Up}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Op extends Zl{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}}class $r extends co{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Op}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class rr extends Fu{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,a-=f*this.view.offsetY,c=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Bp extends Zl{constructor(){super(new rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pl extends co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new Bp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Hs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const $o=new WeakMap;class kp extends gs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ee("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ee("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Zn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(h=>{if($o.has(o)===!0)i&&i($o.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(h),s.manager.itemEnd(e),h});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(h){return h.blob()}).then(function(h){return createImageBitmap(h,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(h){return Zn.add(`image-bitmap:${e}`,h),t&&t(h),s.manager.itemEnd(e),h}).catch(function(h){i&&i(h),$o.set(c,h),Zn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Zn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Xi=-90,qi=1;class zp extends Qe{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qt(Xi,qi,e,t);i.layers=this.layers,this.add(i);const s=new qt(Xi,qi,e,t);s.layers=this.layers,this.add(s);const o=new qt(Xi,qi,e,t);o.layers=this.layers,this.add(o);const a=new qt(Xi,qi,e,t);a.layers=this.layers,this.add(a);const c=new qt(Xi,qi,e,t);c.layers=this.layers,this.add(c);const h=new qt(Xi,qi,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const h of t)this.remove(h);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,h,f]=this.children,l=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(l,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Gp extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Vp{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Hp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Hp(){this._document.hidden===!1&&this.reset()}const jl="\\[\\]\\.:\\/",Wp=new RegExp("["+jl+"]","g"),Jl="[^"+jl+"]",Xp="[^"+jl.replace("\\.","")+"]",qp=/((?:WC+[\/:])*)/.source.replace("WC",Jl),Yp=/(WCOD+)?/.source.replace("WCOD",Xp),$p=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jl),Kp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jl),Zp=new RegExp("^"+qp+Yp+$p+Kp+"$"),jp=["material","materials","bones","map"];class Jp{constructor(e,t,n){const i=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ot{constructor(e,t,n){this.path=t,this.parsedPath=n||ot.parseTrackName(t),this.node=ot.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ot.Composite(e,t,n):new ot(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Wp,"")}static parseTrackName(e){const t=Zp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);jp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=ot.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===h){h=f;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}const o=e[i];if(o===void 0){const h=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+h+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ot.Composite=Jp;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function lh(r,e,t,n){const i=Qp(n);switch(t){case au:return r*e;case Pl:return r*e/i.components*i.byteLength;case Il:return r*e/i.components*i.byteLength;case is:return r*e*2/i.components*i.byteLength;case Ll:return r*e*2/i.components*i.byteLength;case lu:return r*e*3/i.components*i.byteLength;case dn:return r*e*4/i.components*i.byteLength;case Dl:return r*e*4/i.components*i.byteLength;case Wr:case Xr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case qr:case Yr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ca:case Pa:return Math.max(r,16)*Math.max(e,8)/4;case Aa:case Ra:return Math.max(r,8)*Math.max(e,8)/2;case Ia:case La:case Na:case Fa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Da:case Ua:case Oa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case za:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Va:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case qa:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Za:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case ja:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ja:case Qa:case el:return Math.ceil(r/4)*Math.ceil(e/4)*16;case tl:case nl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case il:case sl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qp(r){switch(r){case sn:case iu:return{byteLength:1,components:1};case Xs:case su:case rn:return{byteLength:2,components:1};case Cl:case Rl:return{byteLength:2,components:4};case On:case Al:case un:return{byteLength:4,components:1};case ru:case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yl}}));typeof window<"u"&&(window.__THREE__?Ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yl);function Ou(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function em(r){const e=new WeakMap;function t(a,c){const h=a.array,f=a.usage,l=h.byteLength,u=r.createBuffer();r.bindBuffer(c,u),r.bufferData(c,h,f),a.onUploadCallback();let d;if(h instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)d=r.HALF_FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=r.SHORT;else if(h instanceof Uint32Array)d=r.UNSIGNED_INT;else if(h instanceof Int32Array)d=r.INT;else if(h instanceof Int8Array)d=r.BYTE;else if(h instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:l}}function n(a,c,h){const f=c.array,l=c.updateRanges;if(r.bindBuffer(h,a),l.length===0)r.bufferSubData(h,0,f);else{l.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<l.length;d++){const p=l[u],_=l[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,l[u]=_)}l.length=u+1;for(let d=0,p=l.length;d<p;d++){const _=l[d];r.bufferSubData(h,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(r.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const h=e.get(a);if(h===void 0)e.set(a,t(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,c),h.version=a.version}}return{get:i,remove:s,update:o}}var tm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nm=`#ifdef USE_ALPHAHASH
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
#endif`,im=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,om=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,am=`#ifdef USE_AOMAP
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
#endif`,lm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cm=`#ifdef USE_BATCHING
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
#endif`,hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,um=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pm=`#ifdef USE_IRIDESCENCE
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
#endif`,mm=`#ifdef USE_BUMPMAP
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
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ym=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wm=`#define PI 3.141592653589793
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
} // validated`,Tm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Em=`vec3 transformedNormal = objectNormal;
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
#endif`,Am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Im="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dm=`#ifdef USE_ENVMAP
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
#endif`,Nm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
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
#endif`,Um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
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
#endif`,Bm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vm=`#ifdef USE_GRADIENTMAP
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
}`,Hm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qm=`uniform bool receiveShadow;
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
#endif`,Ym=`#ifdef USE_ENVMAP
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
#endif`,$m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jm=`PhysicalMaterial material;
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
#endif`,Qm=`uniform sampler2D dfgLUT;
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
}`,e0=`
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
#endif`,t0=`#if defined( RE_IndirectDiffuse )
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
#endif`,n0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,i0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,s0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,h0=`#if defined( USE_POINTS_UV )
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
#endif`,u0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,d0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,f0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g0=`#ifdef USE_MORPHTARGETS
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
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,v0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,b0=`#ifdef USE_NORMALMAP
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
#endif`,w0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,E0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,P0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,D0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,N0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,F0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,B0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,k0=`float getShadowMask() {
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
}`,z0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G0=`#ifdef USE_SKINNING
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
#endif`,V0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,H0=`#ifdef USE_SKINNING
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
#endif`,W0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$0=`#ifdef USE_TRANSMISSION
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
#endif`,K0=`#ifdef USE_TRANSMISSION
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
#endif`,Z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tg=`uniform sampler2D t2D;
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
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ig=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`#include <common>
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
}`,ag=`#if DEPTH_PACKING == 3200
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
}`,lg=`#define DISTANCE
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
}`,cg=`#define DISTANCE
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
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ug=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`uniform float scale;
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
}`,fg=`uniform vec3 diffuse;
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
}`,pg=`#include <common>
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
}`,mg=`uniform vec3 diffuse;
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
}`,gg=`#define LAMBERT
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
}`,_g=`#define LAMBERT
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
}`,xg=`#define MATCAP
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
}`,vg=`#define MATCAP
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
}`,yg=`#define NORMAL
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
}`,Sg=`#define NORMAL
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
}`,Mg=`#define PHONG
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
}`,bg=`#define PHONG
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
}`,wg=`#define STANDARD
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
}`,Tg=`#define STANDARD
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
}`,Eg=`#define TOON
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
}`,Ag=`#define TOON
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
}`,Cg=`uniform float size;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Pg=`#include <common>
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
}`,Ig=`uniform vec3 color;
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
}`,Lg=`uniform float rotation;
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
}`,Dg=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:tm,alphahash_pars_fragment:nm,alphamap_fragment:im,alphamap_pars_fragment:sm,alphatest_fragment:rm,alphatest_pars_fragment:om,aomap_fragment:am,aomap_pars_fragment:lm,batching_pars_vertex:cm,batching_vertex:hm,begin_vertex:um,beginnormal_vertex:dm,bsdfs:fm,iridescence_fragment:pm,bumpmap_pars_fragment:mm,clipping_planes_fragment:gm,clipping_planes_pars_fragment:_m,clipping_planes_pars_vertex:xm,clipping_planes_vertex:vm,color_fragment:ym,color_pars_fragment:Sm,color_pars_vertex:Mm,color_vertex:bm,common:wm,cube_uv_reflection_fragment:Tm,defaultnormal_vertex:Em,displacementmap_pars_vertex:Am,displacementmap_vertex:Cm,emissivemap_fragment:Rm,emissivemap_pars_fragment:Pm,colorspace_fragment:Im,colorspace_pars_fragment:Lm,envmap_fragment:Dm,envmap_common_pars_fragment:Nm,envmap_pars_fragment:Fm,envmap_pars_vertex:Um,envmap_physical_pars_fragment:Ym,envmap_vertex:Om,fog_vertex:Bm,fog_pars_vertex:km,fog_fragment:zm,fog_pars_fragment:Gm,gradientmap_pars_fragment:Vm,lightmap_pars_fragment:Hm,lights_lambert_fragment:Wm,lights_lambert_pars_fragment:Xm,lights_pars_begin:qm,lights_toon_fragment:$m,lights_toon_pars_fragment:Km,lights_phong_fragment:Zm,lights_phong_pars_fragment:jm,lights_physical_fragment:Jm,lights_physical_pars_fragment:Qm,lights_fragment_begin:e0,lights_fragment_maps:t0,lights_fragment_end:n0,logdepthbuf_fragment:i0,logdepthbuf_pars_fragment:s0,logdepthbuf_pars_vertex:r0,logdepthbuf_vertex:o0,map_fragment:a0,map_pars_fragment:l0,map_particle_fragment:c0,map_particle_pars_fragment:h0,metalnessmap_fragment:u0,metalnessmap_pars_fragment:d0,morphinstance_vertex:f0,morphcolor_vertex:p0,morphnormal_vertex:m0,morphtarget_pars_vertex:g0,morphtarget_vertex:_0,normal_fragment_begin:x0,normal_fragment_maps:v0,normal_pars_fragment:y0,normal_pars_vertex:S0,normal_vertex:M0,normalmap_pars_fragment:b0,clearcoat_normal_fragment_begin:w0,clearcoat_normal_fragment_maps:T0,clearcoat_pars_fragment:E0,iridescence_pars_fragment:A0,opaque_fragment:C0,packing:R0,premultiplied_alpha_fragment:P0,project_vertex:I0,dithering_fragment:L0,dithering_pars_fragment:D0,roughnessmap_fragment:N0,roughnessmap_pars_fragment:F0,shadowmap_pars_fragment:U0,shadowmap_pars_vertex:O0,shadowmap_vertex:B0,shadowmask_pars_fragment:k0,skinbase_vertex:z0,skinning_pars_vertex:G0,skinning_vertex:V0,skinnormal_vertex:H0,specularmap_fragment:W0,specularmap_pars_fragment:X0,tonemapping_fragment:q0,tonemapping_pars_fragment:Y0,transmission_fragment:$0,transmission_pars_fragment:K0,uv_pars_fragment:Z0,uv_pars_vertex:j0,uv_vertex:J0,worldpos_vertex:Q0,background_vert:eg,background_frag:tg,backgroundCube_vert:ng,backgroundCube_frag:ig,cube_vert:sg,cube_frag:rg,depth_vert:og,depth_frag:ag,distance_vert:lg,distance_frag:cg,equirect_vert:hg,equirect_frag:ug,linedashed_vert:dg,linedashed_frag:fg,meshbasic_vert:pg,meshbasic_frag:mg,meshlambert_vert:gg,meshlambert_frag:_g,meshmatcap_vert:xg,meshmatcap_frag:vg,meshnormal_vert:yg,meshnormal_frag:Sg,meshphong_vert:Mg,meshphong_frag:bg,meshphysical_vert:wg,meshphysical_frag:Tg,meshtoon_vert:Eg,meshtoon_frag:Ag,points_vert:Cg,points_frag:Rg,shadow_vert:Pg,shadow_frag:Ig,sprite_vert:Lg,sprite_frag:Dg},ce={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Cn={basic:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Wt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Wt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new fe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Wt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Wt([ce.points,ce.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Wt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Wt([ce.common,ce.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Wt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Wt([ce.sprite,ce.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Wt([ce.common,ce.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Wt([ce.lights,ce.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Cn.physical={uniforms:Wt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Or={r:0,b:0,g:0},xi=new pn,Ng=new Be;function Fg(r,e,t,n,i,s){const o=new fe(0);let a=i===!0?0:1,c,h,f=null,l=0,u=null;function d(x){let v=x.isScene===!0?x.background:null;if(v&&v.isTexture){const y=x.backgroundBlurriness>0;v=e.get(v,y)}return v}function p(x){let v=!1;const y=d(x);y===null?g(o,a):y&&y.isColor&&(g(y,1),v=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(x,v){const y=d(v);y&&(y.isCubeTexture||y.mapping===ro)?(h===void 0&&(h=new ne(new ht(1,1,1),new Pt({name:"BackgroundCubeMaterial",uniforms:os(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),xi.copy(v.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ng.makeRotationFromEuler(xi)),h.material.toneMapped=Ze.getTransfer(y.colorSpace)!==tt,(f!==y||l!==y.version||u!==r.toneMapping)&&(h.material.needsUpdate=!0,f=y,l=y.version,u=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ne(new ui(2,2),new Pt({name:"BackgroundMaterial",uniforms:os(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(y.colorSpace)!==tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||l!==y.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,f=y,l=y.version,u=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function g(x,v){x.getRGB(Or,Pu(r)),t.buffers.color.setClear(Or.r,Or.g,Or.b,v,s)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,v=1){o.set(x),a=v,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:p,addToRenderList:_,dispose:m}}function Ug(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,o=!1;function a(P,F,O,B,H){let k=!1;const G=l(P,B,O,F);s!==G&&(s=G,h(s.object)),k=d(P,B,O,H),k&&p(P,B,O,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,y(P,F,O,B),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return r.createVertexArray()}function h(P){return r.bindVertexArray(P)}function f(P){return r.deleteVertexArray(P)}function l(P,F,O,B){const H=B.wireframe===!0;let k=n[F.id];k===void 0&&(k={},n[F.id]=k);const G=P.isInstancedMesh===!0?P.id:0;let j=k[G];j===void 0&&(j={},k[G]=j);let Z=j[O.id];Z===void 0&&(Z={},j[O.id]=Z);let ae=Z[H];return ae===void 0&&(ae=u(c()),Z[H]=ae),ae}function u(P){const F=[],O=[],B=[];for(let H=0;H<t;H++)F[H]=0,O[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:O,attributeDivisors:B,object:P,attributes:{},index:null}}function d(P,F,O,B){const H=s.attributes,k=F.attributes;let G=0;const j=O.getAttributes();for(const Z in j)if(j[Z].location>=0){const he=H[Z];let pe=k[Z];if(pe===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(pe=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(pe=P.instanceColor)),he===void 0||he.attribute!==pe||pe&&he.data!==pe.data)return!0;G++}return s.attributesNum!==G||s.index!==B}function p(P,F,O,B){const H={},k=F.attributes;let G=0;const j=O.getAttributes();for(const Z in j)if(j[Z].location>=0){let he=k[Z];he===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(he=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(he=P.instanceColor));const pe={};pe.attribute=he,he&&he.data&&(pe.data=he.data),H[Z]=pe,G++}s.attributes=H,s.attributesNum=G,s.index=B}function _(){const P=s.newAttributes;for(let F=0,O=P.length;F<O;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const O=s.newAttributes,B=s.enabledAttributes,H=s.attributeDivisors;O[P]=1,B[P]===0&&(r.enableVertexAttribArray(P),B[P]=1),H[P]!==F&&(r.vertexAttribDivisor(P,F),H[P]=F)}function x(){const P=s.newAttributes,F=s.enabledAttributes;for(let O=0,B=F.length;O<B;O++)F[O]!==P[O]&&(r.disableVertexAttribArray(O),F[O]=0)}function v(P,F,O,B,H,k,G){G===!0?r.vertexAttribIPointer(P,F,O,H,k):r.vertexAttribPointer(P,F,O,B,H,k)}function y(P,F,O,B){_();const H=B.attributes,k=O.getAttributes(),G=F.defaultAttributeValues;for(const j in k){const Z=k[j];if(Z.location>=0){let ae=H[j];if(ae===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor)),ae!==void 0){const he=ae.normalized,pe=ae.itemSize,Ie=e.get(ae);if(Ie===void 0)continue;const nt=Ie.buffer,at=Ie.type,$=Ie.bytesPerElement,ie=at===r.INT||at===r.UNSIGNED_INT||ae.gpuType===Al;if(ae.isInterleavedBufferAttribute){const oe=ae.data,Ge=oe.stride,Le=ae.offset;if(oe.isInstancedInterleavedBuffer){for(let Ue=0;Ue<Z.locationSize;Ue++)m(Z.location+Ue,oe.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ue=0;Ue<Z.locationSize;Ue++)g(Z.location+Ue);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let Ue=0;Ue<Z.locationSize;Ue++)v(Z.location+Ue,pe/Z.locationSize,at,he,Ge*$,(Le+pe/Z.locationSize*Ue)*$,ie)}else{if(ae.isInstancedBufferAttribute){for(let oe=0;oe<Z.locationSize;oe++)m(Z.location+oe,ae.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let oe=0;oe<Z.locationSize;oe++)g(Z.location+oe);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let oe=0;oe<Z.locationSize;oe++)v(Z.location+oe,pe/Z.locationSize,at,he,pe*$,pe/Z.locationSize*oe*$,ie)}}else if(G!==void 0){const he=G[j];if(he!==void 0)switch(he.length){case 2:r.vertexAttrib2fv(Z.location,he);break;case 3:r.vertexAttrib3fv(Z.location,he);break;case 4:r.vertexAttrib4fv(Z.location,he);break;default:r.vertexAttrib1fv(Z.location,he)}}}}x()}function E(){b();for(const P in n){const F=n[P];for(const O in F){const B=F[O];for(const H in B){const k=B[H];for(const G in k)f(k[G].object),delete k[G];delete B[H]}}delete n[P]}}function T(P){if(n[P.id]===void 0)return;const F=n[P.id];for(const O in F){const B=F[O];for(const H in B){const k=B[H];for(const G in k)f(k[G].object),delete k[G];delete B[H]}}delete n[P.id]}function R(P){for(const F in n){const O=n[F];for(const B in O){const H=O[B];if(H[P.id]===void 0)continue;const k=H[P.id];for(const G in k)f(k[G].object),delete k[G];delete H[P.id]}}}function S(P){for(const F in n){const O=n[F],B=P.isInstancedMesh===!0?P.id:0,H=O[B];if(H!==void 0){for(const k in H){const G=H[k];for(const j in G)f(G[j].object),delete G[j];delete H[k]}delete O[B],Object.keys(O).length===0&&delete n[F]}}}function b(){U(),o=!0,s!==i&&(s=i,h(s.object))}function U(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:b,resetDefaultState:U,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function Og(r,e,t){let n;function i(h){n=h}function s(h,f){r.drawArrays(n,h,f),t.update(f,n,1)}function o(h,f,l){l!==0&&(r.drawArraysInstanced(n,h,f,l),t.update(f,n,l))}function a(h,f,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,f,0,l);let d=0;for(let p=0;p<l;p++)d+=f[p];t.update(d,n,1)}function c(h,f,l,u){if(l===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<h.length;p++)o(h[p],f[p],u[p]);else{d.multiDrawArraysInstancedWEBGL(n,h,0,f,0,u,0,l);let p=0;for(let _=0;_<l;_++)p+=f[_]*u[_];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Bg(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==dn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const S=R===rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==sn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==un&&!S)}function c(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const f=c(h);f!==h&&(Ee("WebGLRenderer:",h,"not supported, using",f,"instead."),h=f);const l=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),T=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:l,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,maxSamples:E,samples:T}}function kg(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new bi,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(l,u){const d=l.length!==0||u||n!==0||i;return i=u,n=l.length,d},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(l,u){t=f(l,u,0)},this.setState=function(l,u,d){const p=l.clippingPlanes,_=l.clipIntersection,g=l.clipShadows,m=r.get(l);if(!i||p===null||p.length===0||s&&!g)s?f(null):h();else{const x=s?0:n,v=x*4;let y=m.clippingState||null;c.value=y,y=f(p,u,v,d);for(let E=0;E!==v;++E)y[E]=t[E];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(l,u,d,p){const _=l!==null?l.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=d+_*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let v=0,y=d;v!==_;++v,y+=4)o.copy(l[v]).applyMatrix4(x,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const hi=4,ch=[.125,.215,.35,.446,.526,.582],Ti=20,zg=256,Es=new rr,hh=new fe;let Ko=null,Zo=0,jo=0,Jo=!1;const Gg=new C;class uh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Gg}=s;Ko=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ph(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ko,Zo,jo),this._renderer.xr.enabled=Jo,e.scissorTest=!1,Yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ko=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),jo=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:rn,format:dn,colorSpace:Kt,depthBuffer:!1},i=dh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dh(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Vg(s)),this._blurMaterial=Wg(s,e,t),this._ggxMaterial=Hg(s,e,t)}return i}_compileMaterial(e){const t=new ne(new ut,e);this._renderer.compile(t,Es)}_sceneToCubeUV(e,t,n,i,s){const c=new qt(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,d=l.toneMapping;l.getClearColor(hh),l.toneMapping=Fn,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ne(new ht,new De({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,m=!0):(g.color.copy(hh),m=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(c.up.set(0,h[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+f[v],s.y,s.z)):y===1?(c.up.set(0,0,h[v]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+f[v],s.z)):(c.up.set(0,h[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+f[v]));const E=this._cubeSize;Yi(i,y*E,v>2?E:0,E,E),l.setRenderTarget(i),m&&l.render(_,c),l.render(e,c)}l.toneMapping=d,l.autoClear=u,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ci||e.mapping===ns;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ph()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Yi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Es)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,h=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),l=Math.sqrt(h*h-f*f),u=0+h*1.25,d=l*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-hi?n-p+hi:0),m=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=p-t,Yi(s,g,m,3*_,2*_),i.setRenderTarget(s),i.render(a,Es),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=p-n,Yi(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(a,Es)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Fe("blur direction must be either latitudinal or longitudinal!");const f=3,l=this._lodMeshes[i];l.material=h;const u=h.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ti-1),_=s/p,g=isFinite(s)?1+Math.floor(f*_):Ti;g>Ti&&Ee(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ti}`);const m=[];let x=0;for(let R=0;R<Ti;++R){const S=R/_,b=Math.exp(-S*S/2);m.push(b),R===0?x+=b:R<g&&(x+=2*b)}for(let R=0;R<m.length;R++)m[R]=m[R]/x;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=p,u.mipInt.value=v-n;const y=this._sizeLods[i],E=3*y*(i>v-hi?i-v+hi:0),T=4*(this._cubeSize-y);Yi(t,E,T,3*y,2*y),c.setRenderTarget(t),c.render(l,Es)}}function Vg(r){const e=[],t=[],n=[];let i=r;const s=r-hi+1+ch.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-hi?c=ch[o-r+hi-1]:o===0&&(c=0),t.push(c);const h=1/(a-2),f=-h,l=1+h,u=[f,f,l,f,l,l,f,f,l,l,f,l],d=6,p=6,_=3,g=2,m=1,x=new Float32Array(_*p*d),v=new Float32Array(g*p*d),y=new Float32Array(m*p*d);for(let T=0;T<d;T++){const R=T%3*2/3-1,S=T>2?0:-1,b=[R,S,0,R+2/3,S,0,R+2/3,S+1,0,R,S,0,R+2/3,S+1,0,R,S+1,0];x.set(b,_*p*T),v.set(u,g*p*T);const U=[T,T,T,T,T,T];y.set(U,m*p*T)}const E=new ut;E.setAttribute("position",new gt(x,_)),E.setAttribute("uv",new gt(v,g)),E.setAttribute("faceIndex",new gt(y,m)),n.push(new ne(E,null)),i>hi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function dh(r,e,t){const n=new Zt(r,e,t);return n.texture.mapping=ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Hg(r,e,t){return new Pt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Wg(r,e,t){const n=new Float32Array(Ti),i=new C(0,1,0);return new Pt({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function fh(){return new Pt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ho(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ph(){return new Pt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ho(){return`

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
	`}class Bu extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new vu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ht(5,5,5),s=new Pt({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Nn});s.uniforms.tEquirect.value=t;const o=new ne(i,s),a=t.minFilter;return t.minFilter===Ln&&(t.minFilter=Ct),new zp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function Xg(r){let e=new WeakMap,t=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?o(u):s(u)}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===go||d===_o)if(e.has(u)){const p=e.get(u).texture;return a(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const _=new Bu(p.height);return _.fromEquirectangularTexture(r,u),e.set(u,_),u.addEventListener("dispose",h),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const d=u.mapping,p=d===go||d===_o,_=d===Ci||d===ns;if(p||_){let g=t.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new uh(r)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const x=u.image;return p&&x&&x.height>0||_&&x&&c(x)?(n===null&&(n=new uh(r)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",f),g.texture):null}}}return u}function a(u,d){return d===go?u.mapping=Ci:d===_o&&(u.mapping=ns),u}function c(u){let d=0;const p=6;for(let _=0;_<p;_++)u[_]!==void 0&&d++;return d===p}function h(u){const d=u.target;d.removeEventListener("dispose",h);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(u){const d=u.target;d.removeEventListener("dispose",f);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function l(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:l}}function qg(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&eo("WebGLRenderer: "+n+" extension not supported."),i}}}function Yg(r,e,t,n){const i={},s=new WeakMap;function o(l){const u=l.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(l,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function c(l){const u=l.attributes;for(const d in u)e.update(u[d],r.ARRAY_BUFFER)}function h(l){const u=[],d=l.index,p=l.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const x=d.array;_=d.version;for(let v=0,y=x.length;v<y;v+=3){const E=x[v+0],T=x[v+1],R=x[v+2];u.push(E,T,T,R,R,E)}}else{const x=p.array;_=p.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const E=v+0,T=v+1,R=v+2;u.push(E,T,T,R,R,E)}}const g=new(p.count>=65535?gu:mu)(u,1);g.version=_;const m=s.get(l);m&&e.remove(m),s.set(l,g)}function f(l){const u=s.get(l);if(u){const d=l.index;d!==null&&u.version<d.version&&h(l)}else h(l);return s.get(l)}return{get:a,update:c,getWireframeAttribute:f}}function $g(r,e,t){let n;function i(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function c(u,d){r.drawElements(n,d,s,u*o),t.update(d,n,1)}function h(u,d,p){p!==0&&(r.drawElementsInstanced(n,d,s,u*o,p),t.update(d,n,p))}function f(u,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function l(u,d,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)h(u[m]/o,d[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,u,0,_,0,p);let m=0;for(let x=0;x<p;x++)m+=d[x]*_[x];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=f,this.renderMultiDrawInstances=l}function Kg(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Fe("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Zg(r,e,t){const n=new WeakMap,i=new _t;function s(o,a,c){const h=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,l=f!==void 0?f.length:0;let u=n.get(a);if(u===void 0||u.count!==l){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;d===!0&&(v=1),p===!0&&(v=2),_===!0&&(v=3);let y=a.attributes.position.count*v,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const T=new Float32Array(y*E*4*l),R=new du(T,y,E,l);R.type=un,R.needsUpdate=!0;const S=v*4;for(let U=0;U<l;U++){const P=g[U],F=m[U],O=x[U],B=y*E*4*U;for(let H=0;H<P.count;H++){const k=H*S;d===!0&&(i.fromBufferAttribute(P,H),T[B+k+0]=i.x,T[B+k+1]=i.y,T[B+k+2]=i.z,T[B+k+3]=0),p===!0&&(i.fromBufferAttribute(F,H),T[B+k+4]=i.x,T[B+k+5]=i.y,T[B+k+6]=i.z,T[B+k+7]=0),_===!0&&(i.fromBufferAttribute(O,H),T[B+k+8]=i.x,T[B+k+9]=i.y,T[B+k+10]=i.z,T[B+k+11]=O.itemSize===4?i.w:1)}}u={count:l,texture:R,size:new le(y,E)},n.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<h.length;_++)d+=h[_];const p=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(r,"morphTargetBaseInfluence",p),c.getUniforms().setValue(r,"morphTargetInfluences",h)}c.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function jg(r,e,t,n,i){let s=new WeakMap;function o(h){const f=i.render.frame,l=h.geometry,u=e.get(h,l);if(s.get(u)!==f&&(e.update(u),s.set(u,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),s.get(h)!==f&&(t.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,r.ARRAY_BUFFER),s.set(h,f))),h.isSkinnedMesh){const d=h.skeleton;s.get(d)!==f&&(d.update(),s.set(d,f))}return u}function a(){s=new WeakMap}function c(h){const f=h.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:a}}const Jg={[Sl]:"LINEAR_TONE_MAPPING",[Ml]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[so]:"ACES_FILMIC_TONE_MAPPING",[Tl]:"AGX_TONE_MAPPING",[El]:"NEUTRAL_TONE_MAPPING",[wl]:"CUSTOM_TONE_MAPPING"};function Qg(r,e,t,n,i){const s=new Zt(e,t,{type:r,depthBuffer:n,stencilBuffer:i}),o=new Zt(e,t,{type:rn,depthBuffer:!1,stencilBuffer:!1}),a=new ut;a.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ke([0,2,0,0,2,0],2));const c=new Iu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new ne(a,c),f=new rr(-1,1,1,-1,0,1);let l=null,u=null,d=!1,p,_=null,g=[],m=!1;this.setSize=function(x,v){s.setSize(x,v),o.setSize(x,v);for(let y=0;y<g.length;y++){const E=g[y];E.setSize&&E.setSize(x,v)}},this.setEffects=function(x){g=x,m=g.length>0&&g[0].isRenderPass===!0;const v=s.width,y=s.height;for(let E=0;E<g.length;E++){const T=g[E];T.setSize&&T.setSize(v,y)}},this.begin=function(x,v){if(d||x.toneMapping===Fn&&g.length===0)return!1;if(_=v,v!==null){const y=v.width,E=v.height;(s.width!==y||s.height!==E)&&this.setSize(y,E)}return m===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Fn,!0},this.hasRenderPass=function(){return m},this.end=function(x,v){x.toneMapping=p,d=!0;let y=s,E=o;for(let T=0;T<g.length;T++){const R=g[T];if(R.enabled!==!1&&(R.render(x,E,y,v),R.needsSwap!==!1)){const S=y;y=E,E=S}}if(l!==x.outputColorSpace||u!==x.toneMapping){l=x.outputColorSpace,u=x.toneMapping,c.defines={},Ze.getTransfer(l)===tt&&(c.defines.SRGB_TRANSFER="");const T=Jg[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(_),x.render(h,f),_=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}const ku=new It,ml=new js(1,1),zu=new du,Gu=new mf,Vu=new vu,mh=[],gh=[],_h=new Float32Array(16),xh=new Float32Array(9),vh=new Float32Array(4);function _s(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=mh[i];if(s===void 0&&(s=new Float32Array(i),mh[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Lt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Dt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function uo(r,e){let t=gh[e];t===void 0&&(t=new Int32Array(e),gh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function e_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function t_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2fv(this.addr,e),Dt(t,e)}}function n_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;r.uniform3fv(this.addr,e),Dt(t,e)}}function i_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4fv(this.addr,e),Dt(t,e)}}function s_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;vh.set(n),r.uniformMatrix2fv(this.addr,!1,vh),Dt(t,n)}}function r_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;xh.set(n),r.uniformMatrix3fv(this.addr,!1,xh),Dt(t,n)}}function o_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;_h.set(n),r.uniformMatrix4fv(this.addr,!1,_h),Dt(t,n)}}function a_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function l_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2iv(this.addr,e),Dt(t,e)}}function c_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3iv(this.addr,e),Dt(t,e)}}function h_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4iv(this.addr,e),Dt(t,e)}}function u_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function d_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2uiv(this.addr,e),Dt(t,e)}}function f_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3uiv(this.addr,e),Dt(t,e)}}function p_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4uiv(this.addr,e),Dt(t,e)}}function m_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(ml.compareFunction=t.isReversedDepthBuffer()?Fl:Nl,s=ml):s=ku,t.setTexture2D(e||s,i)}function g_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Gu,i)}function __(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Vu,i)}function x_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||zu,i)}function v_(r){switch(r){case 5126:return e_;case 35664:return t_;case 35665:return n_;case 35666:return i_;case 35674:return s_;case 35675:return r_;case 35676:return o_;case 5124:case 35670:return a_;case 35667:case 35671:return l_;case 35668:case 35672:return c_;case 35669:case 35673:return h_;case 5125:return u_;case 36294:return d_;case 36295:return f_;case 36296:return p_;case 35678:case 36198:case 36298:case 36306:case 35682:return m_;case 35679:case 36299:case 36307:return g_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return x_}}function y_(r,e){r.uniform1fv(this.addr,e)}function S_(r,e){const t=_s(e,this.size,2);r.uniform2fv(this.addr,t)}function M_(r,e){const t=_s(e,this.size,3);r.uniform3fv(this.addr,t)}function b_(r,e){const t=_s(e,this.size,4);r.uniform4fv(this.addr,t)}function w_(r,e){const t=_s(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function T_(r,e){const t=_s(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function E_(r,e){const t=_s(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function A_(r,e){r.uniform1iv(this.addr,e)}function C_(r,e){r.uniform2iv(this.addr,e)}function R_(r,e){r.uniform3iv(this.addr,e)}function P_(r,e){r.uniform4iv(this.addr,e)}function I_(r,e){r.uniform1uiv(this.addr,e)}function L_(r,e){r.uniform2uiv(this.addr,e)}function D_(r,e){r.uniform3uiv(this.addr,e)}function N_(r,e){r.uniform4uiv(this.addr,e)}function F_(r,e,t){const n=this.cache,i=e.length,s=uo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=ml:o=ku;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,s[a])}function U_(r,e,t){const n=this.cache,i=e.length,s=uo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Gu,s[o])}function O_(r,e,t){const n=this.cache,i=e.length,s=uo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Vu,s[o])}function B_(r,e,t){const n=this.cache,i=e.length,s=uo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||zu,s[o])}function k_(r){switch(r){case 5126:return y_;case 35664:return S_;case 35665:return M_;case 35666:return b_;case 35674:return w_;case 35675:return T_;case 35676:return E_;case 5124:case 35670:return A_;case 35667:case 35671:return C_;case 35668:case 35672:return R_;case 35669:case 35673:return P_;case 5125:return I_;case 36294:return L_;case 36295:return D_;case 36296:return N_;case 35678:case 36198:case 36298:case 36306:case 35682:return F_;case 35679:case 36299:case 36307:return U_;case 35680:case 36300:case 36308:case 36293:return O_;case 36289:case 36303:case 36311:case 36292:return B_}}class z_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=v_(t.type)}}class G_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=k_(t.type)}}class V_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Qo=/(\w+)(\])?(\[|\.)?/g;function yh(r,e){r.seq.push(e),r.map[e.id]=e}function H_(r,e,t){const n=r.name,i=n.length;for(Qo.lastIndex=0;;){const s=Qo.exec(n),o=Qo.lastIndex;let a=s[1];const c=s[2]==="]",h=s[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===i){yh(t,h===void 0?new z_(a,r,e):new G_(a,r,e));break}else{let l=t.map[a];l===void 0&&(l=new V_(a),yh(t,l)),t=l}}}class Kr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);H_(a,c,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Sh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const W_=37297;let X_=0;function q_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Mh=new Ve;function Y_(r){Ze._getMatrix(Mh,Ze.workingColorSpace,r);const e=`mat3( ${Mh.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(r)){case Jr:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Ee("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function bh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+q_(r.getShaderSource(e),a)}else return s}function $_(r,e){const t=Y_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const K_={[Sl]:"Linear",[Ml]:"Reinhard",[bl]:"Cineon",[so]:"ACESFilmic",[Tl]:"AgX",[El]:"Neutral",[wl]:"Custom"};function Z_(r,e){const t=K_[e];return t===void 0?(Ee("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Br=new C;function j_(){Ze.getLuminanceCoefficients(Br);const r=Br.x.toFixed(4),e=Br.y.toFixed(4),t=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J_(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Us).join(`
`)}function Q_(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ex(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Us(r){return r!==""}function wh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Th(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function gl(r){return r.replace(tx,ix)}const nx=new Map;function ix(r,e){let t=He[e];if(t===void 0){const n=nx.get(e);if(n!==void 0)t=He[n],Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return gl(t)}const sx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eh(r){return r.replace(sx,rx)}function rx(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ah(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const ox={[Os]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function ax(r){return ox[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lx={[Ci]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE_UV"};function cx(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":lx[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const hx={[ns]:"ENVMAP_MODE_REFRACTION"};function ux(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":hx[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dx={[eu]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};function fx(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":dx[r.combine]||"ENVMAP_BLENDING_NONE"}function px(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function mx(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=ax(t),h=cx(t),f=ux(t),l=fx(t),u=px(t),d=J_(t),p=Q_(s),_=i.createProgram();let g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Us).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Us).join(`
`),m.length>0&&(m+=`
`)):(g=[Ah(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Us).join(`
`),m=[Ah(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMap?"#define "+l:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fn?"#define TONE_MAPPING":"",t.toneMapping!==Fn?He.tonemapping_pars_fragment:"",t.toneMapping!==Fn?Z_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,$_("linearToOutputTexel",t.outputColorSpace),j_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Us).join(`
`)),o=gl(o),o=wh(o,t),o=Th(o,t),a=gl(a),a=wh(a,t),a=Th(a,t),o=Eh(o),a=Eh(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+g+o,y=x+m+a,E=Sh(i,i.VERTEX_SHADER,v),T=Sh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,E),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(P){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(_)||"",O=i.getShaderInfoLog(E)||"",B=i.getShaderInfoLog(T)||"",H=F.trim(),k=O.trim(),G=B.trim();let j=!0,Z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,E,T);else{const ae=bh(i,E,"vertex"),he=bh(i,T,"fragment");Fe("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+ae+`
`+he)}else H!==""?Ee("WebGLProgram: Program Info Log:",H):(k===""||G==="")&&(Z=!1);Z&&(P.diagnostics={runnable:j,programLog:H,vertexShader:{log:k,prefix:g},fragmentShader:{log:G,prefix:m}})}i.deleteShader(E),i.deleteShader(T),S=new Kr(i,_),b=ex(i,_)}let S;this.getUniforms=function(){return S===void 0&&R(this),S};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(_,W_)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let gx=0;class _x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new xx(e),t.set(e,n)),n}}class xx{constructor(e){this.id=gx++,this.code=e,this.usedTimes=0}}function vx(r,e,t,n,i,s){const o=new fu,a=new _x,c=new Set,h=[],f=new Map,l=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function _(S,b,U,P,F){const O=P.fog,B=F.geometry,H=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?P.environment:null,k=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,G=e.get(S.envMap||H,k),j=G&&G.mapping===ro?G.image.height:null,Z=d[S.type];S.precision!==null&&(u=n.getMaxPrecision(S.precision),u!==S.precision&&Ee("WebGLProgram.getParameters:",S.precision,"not supported, using",u,"instead."));const ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,he=ae!==void 0?ae.length:0;let pe=0;B.morphAttributes.position!==void 0&&(pe=1),B.morphAttributes.normal!==void 0&&(pe=2),B.morphAttributes.color!==void 0&&(pe=3);let Ie,nt,at,$;if(Z){const st=Cn[Z];Ie=st.vertexShader,nt=st.fragmentShader}else Ie=S.vertexShader,nt=S.fragmentShader,a.update(S),at=a.getVertexShaderID(S),$=a.getFragmentShaderID(S);const ie=r.getRenderTarget(),oe=r.state.buffers.depth.getReversed(),Ge=F.isInstancedMesh===!0,Le=F.isBatchedMesh===!0,Ue=!!S.map,Nt=!!S.matcap,je=!!G,it=!!S.aoMap,dt=!!S.lightMap,We=!!S.bumpMap,St=!!S.normalMap,I=!!S.displacementMap,wt=!!S.emissiveMap,et=!!S.metalnessMap,pt=!!S.roughnessMap,be=S.anisotropy>0,A=S.clearcoat>0,M=S.dispersion>0,D=S.iridescence>0,Y=S.sheen>0,K=S.transmission>0,q=be&&!!S.anisotropyMap,xe=A&&!!S.clearcoatMap,se=A&&!!S.clearcoatNormalMap,Re=A&&!!S.clearcoatRoughnessMap,Ne=D&&!!S.iridescenceMap,J=D&&!!S.iridescenceThicknessMap,ee=Y&&!!S.sheenColorMap,ve=Y&&!!S.sheenRoughnessMap,Se=!!S.specularMap,me=!!S.specularColorMap,Xe=!!S.specularIntensityMap,L=K&&!!S.transmissionMap,re=K&&!!S.thicknessMap,te=!!S.gradientMap,_e=!!S.alphaMap,Q=S.alphaTest>0,X=!!S.alphaHash,ye=!!S.extensions;let Oe=Fn;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Oe=r.toneMapping);const mt={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Ie,fragmentShader:nt,defines:S.defines,customVertexShaderID:at,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:u,batching:Le,batchingColor:Le&&F._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&F.instanceColor!==null,instancingMorph:Ge&&F.morphTexture!==null,outputColorSpace:ie===null?r.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Kt,alphaToCoverage:!!S.alphaToCoverage,map:Ue,matcap:Nt,envMap:je,envMapMode:je&&G.mapping,envMapCubeUVHeight:j,aoMap:it,lightMap:dt,bumpMap:We,normalMap:St,displacementMap:I,emissiveMap:wt,normalMapObjectSpace:St&&S.normalMapType===Fd,normalMapTangentSpace:St&&S.normalMapType===hu,metalnessMap:et,roughnessMap:pt,anisotropy:be,anisotropyMap:q,clearcoat:A,clearcoatMap:xe,clearcoatNormalMap:se,clearcoatRoughnessMap:Re,dispersion:M,iridescence:D,iridescenceMap:Ne,iridescenceThicknessMap:J,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:Se,specularColorMap:me,specularIntensityMap:Xe,transmission:K,transmissionMap:L,thicknessMap:re,gradientMap:te,opaque:S.transparent===!1&&S.blending===ji&&S.alphaToCoverage===!1,alphaMap:_e,alphaTest:Q,alphaHash:X,combine:S.combine,mapUv:Ue&&p(S.map.channel),aoMapUv:it&&p(S.aoMap.channel),lightMapUv:dt&&p(S.lightMap.channel),bumpMapUv:We&&p(S.bumpMap.channel),normalMapUv:St&&p(S.normalMap.channel),displacementMapUv:I&&p(S.displacementMap.channel),emissiveMapUv:wt&&p(S.emissiveMap.channel),metalnessMapUv:et&&p(S.metalnessMap.channel),roughnessMapUv:pt&&p(S.roughnessMap.channel),anisotropyMapUv:q&&p(S.anisotropyMap.channel),clearcoatMapUv:xe&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:se&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:J&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&p(S.sheenRoughnessMap.channel),specularMapUv:Se&&p(S.specularMap.channel),specularColorMapUv:me&&p(S.specularColorMap.channel),specularIntensityMapUv:Xe&&p(S.specularIntensityMap.channel),transmissionMapUv:L&&p(S.transmissionMap.channel),thicknessMapUv:re&&p(S.thicknessMap.channel),alphaMapUv:_e&&p(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(St||be),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Ue||_e),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&St===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:l,reversedDepthBuffer:oe,skinning:F.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:pe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ue&&S.map.isVideoTexture===!0&&Ze.getTransfer(S.map.colorSpace)===tt,decodeVideoTextureEmissive:wt&&S.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(S.emissiveMap.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ot,flipSided:S.side===$t,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ye&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&S.extensions.multiDraw===!0||Le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function g(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(m(b,S),x(b,S),b.push(r.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function m(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const b=d[S.type];let U;if(b){const P=Cn[b];U=ir.clone(P.uniforms)}else U=S.uniforms;return U}function y(S,b){let U=f.get(b);return U!==void 0?++U.usedTimes:(U=new mx(r,b,S,i),h.push(U),f.set(b,U)),U}function E(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),f.delete(S.cacheKey),S.destroy()}}function T(S){a.remove(S)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:v,acquireProgram:y,releaseProgram:E,releaseShaderCache:T,programs:h,dispose:R}}function yx(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Sx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Ch(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Rh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,p,_,g,m){let x=r[e];return x===void 0?(x={id:u.id,object:u,geometry:d,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},r[e]=x):(x.id=u.id,x.object=u,x.geometry=d,x.material=p,x.materialVariant=o(u),x.groupOrder=_,x.renderOrder=u.renderOrder,x.z=g,x.group=m),e++,x}function c(u,d,p,_,g,m){const x=a(u,d,p,_,g,m);p.transmission>0?n.push(x):p.transparent===!0?i.push(x):t.push(x)}function h(u,d,p,_,g,m){const x=a(u,d,p,_,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?i.unshift(x):t.unshift(x)}function f(u,d){t.length>1&&t.sort(u||Sx),n.length>1&&n.sort(d||Ch),i.length>1&&i.sort(d||Ch)}function l(){for(let u=e,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:c,unshift:h,finish:l,sort:f}}function Mx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Rh,r.set(n,[o])):i>=s.length?(o=new Rh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function bx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new fe};break;case"SpotLight":t={position:new C,direction:new C,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function wx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Tx=0;function Ex(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Ax(r){const e=new bx,t=wx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new C);const i=new C,s=new Be,o=new Be;function a(h){let f=0,l=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,x=0,v=0,y=0,E=0,T=0,R=0;h.sort(Ex);for(let b=0,U=h.length;b<U;b++){const P=h[b],F=P.color,O=P.intensity,B=P.distance;let H=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===is?H=P.shadow.map.texture:H=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)f+=F.r*O,l+=F.g*O,u+=F.b*O;else if(P.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(P.sh.coefficients[k],O);R++}else if(P.isDirectionalLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const G=P.shadow,j=t.get(P);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=H,n.directionalShadowMatrix[d]=P.shadow.matrix,x++}n.directional[d]=k,d++}else if(P.isSpotLight){const k=e.get(P);k.position.setFromMatrixPosition(P.matrixWorld),k.color.copy(F).multiplyScalar(O),k.distance=B,k.coneCos=Math.cos(P.angle),k.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),k.decay=P.decay,n.spot[_]=k;const G=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,G.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=G.matrix,P.castShadow){const j=t.get(P);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=H,y++}_++}else if(P.isRectAreaLight){const k=e.get(P);k.color.copy(F).multiplyScalar(O),k.halfWidth.set(P.width*.5,0,0),k.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=k,g++}else if(P.isPointLight){const k=e.get(P);if(k.color.copy(P.color).multiplyScalar(P.intensity),k.distance=P.distance,k.decay=P.decay,P.castShadow){const G=P.shadow,j=t.get(P);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,j.shadowCameraNear=G.camera.near,j.shadowCameraFar=G.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=P.shadow.matrix,v++}n.point[p]=k,p++}else if(P.isHemisphereLight){const k=e.get(P);k.skyColor.copy(P.color).multiplyScalar(O),k.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[m]=k,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=l,n.ambient[2]=u;const S=n.hash;(S.directionalLength!==d||S.pointLength!==p||S.spotLength!==_||S.rectAreaLength!==g||S.hemiLength!==m||S.numDirectionalShadows!==x||S.numPointShadows!==v||S.numSpotShadows!==y||S.numSpotMaps!==E||S.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,S.directionalLength=d,S.pointLength=p,S.spotLength=_,S.rectAreaLength=g,S.hemiLength=m,S.numDirectionalShadows=x,S.numPointShadows=v,S.numSpotShadows=y,S.numSpotMaps=E,S.numLightProbes=R,n.version=Tx++)}function c(h,f){let l=0,u=0,d=0,p=0,_=0;const g=f.matrixWorldInverse;for(let m=0,x=h.length;m<x;m++){const v=h[m];if(v.isDirectionalLight){const y=n.directional[l];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),l++}else if(v.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),d++}else if(v.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(v.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),u++}else if(v.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Ph(r){const e=new Ax(r),t=[],n=[];function i(f){h.camera=f,t.length=0,n.length=0}function s(f){t.push(f)}function o(f){n.push(f)}function a(){e.setup(t)}function c(f){e.setupView(t,f)}const h={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:h,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Cx(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Ph(r),e.set(i,[a])):s>=o.length?(a=new Ph(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Px=`uniform sampler2D shadow_pass;
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
}`,Ix=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Lx=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Ih=new Be,As=new C,ea=new C;function Dx(r,e,t){let n=new Vl;const i=new le,s=new le,o=new _t,a=new vp,c=new yp,h={},f=t.maxTextureSize,l={[jt]:$t,[$t]:jt,[Ot]:Ot},u=new Pt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:Rx,fragmentShader:Px}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new ut;p.setAttribute("position",new gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ne(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Os;let m=this.type;this.render=function(T,R,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===hd&&(Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Os);const b=r.getRenderTarget(),U=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Nn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==this.type;O&&R.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(H=>H.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,H=T.length;B<H;B++){const k=T[B],G=k.shadow;if(G===void 0){Ee("WebGLShadowMap:",k,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const j=G.getFrameExtents();i.multiply(j),s.copy(G.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/j.x),i.x=s.x*j.x,G.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/j.y),i.y=s.y*j.y,G.mapSize.y=s.y));const Z=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Z,G.map===null||O===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ds){if(k.isPointLight){Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Zt(i.x,i.y,{format:is,type:rn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),G.map.texture.name=k.name+".shadowMap",G.map.depthTexture=new js(i.x,i.y,un),G.map.depthTexture.name=k.name+".shadowMapDepth",G.map.depthTexture.format=Jn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt}else k.isPointLight?(G.map=new Bu(i.x),G.map.depthTexture=new kf(i.x,On)):(G.map=new Zt(i.x,i.y),G.map.depthTexture=new js(i.x,i.y,On)),G.map.depthTexture.name=k.name+".shadowMap",G.map.depthTexture.format=Jn,this.type===Os?(G.map.depthTexture.compareFunction=Z?Fl:Nl,G.map.depthTexture.minFilter=Ct,G.map.depthTexture.magFilter=Ct):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt);G.camera.updateProjectionMatrix()}const ae=G.map.isWebGLCubeRenderTarget?6:1;for(let he=0;he<ae;he++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,he),r.clear();else{he===0&&(r.setRenderTarget(G.map),r.clear());const pe=G.getViewport(he);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),F.viewport(o)}if(k.isPointLight){const pe=G.camera,Ie=G.matrix,nt=k.distance||pe.far;nt!==pe.far&&(pe.far=nt,pe.updateProjectionMatrix()),As.setFromMatrixPosition(k.matrixWorld),pe.position.copy(As),ea.copy(pe.position),ea.add(Ix[he]),pe.up.copy(Lx[he]),pe.lookAt(ea),pe.updateMatrixWorld(),Ie.makeTranslation(-As.x,-As.y,-As.z),Ih.multiplyMatrices(pe.projectionMatrix,pe.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Ih,pe.coordinateSystem,pe.reversedDepth)}else G.updateMatrices(k);n=G.getFrustum(),y(R,S,G.camera,k,this.type)}G.isPointLightShadow!==!0&&this.type===Ds&&x(G,S),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(b,U,P)};function x(T,R){const S=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Zt(i.x,i.y,{format:is,type:rn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(R,null,S,u,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(R,null,S,d,_,null)}function v(T,R,S,b){let U=null;const P=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)U=P;else if(U=S.isPointLight===!0?c:a,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=U.uuid,O=R.uuid;let B=h[F];B===void 0&&(B={},h[F]=B);let H=B[O];H===void 0&&(H=U.clone(),B[O]=H,R.addEventListener("dispose",E)),U=H}if(U.visible=R.visible,U.wireframe=R.wireframe,b===Ds?U.side=R.shadowSide!==null?R.shadowSide:R.side:U.side=R.shadowSide!==null?R.shadowSide:l[R.side],U.alphaMap=R.alphaMap,U.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,U.map=R.map,U.clipShadows=R.clipShadows,U.clippingPlanes=R.clippingPlanes,U.clipIntersection=R.clipIntersection,U.displacementMap=R.displacementMap,U.displacementScale=R.displacementScale,U.displacementBias=R.displacementBias,U.wireframeLinewidth=R.wireframeLinewidth,U.linewidth=R.linewidth,S.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const F=r.properties.get(U);F.light=S}return U}function y(T,R,S,b,U){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===Ds)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);const O=e.update(T),B=T.material;if(Array.isArray(B)){const H=O.groups;for(let k=0,G=H.length;k<G;k++){const j=H[k],Z=B[j.materialIndex];if(Z&&Z.visible){const ae=v(T,Z,b,U);T.onBeforeShadow(r,T,R,S,O,ae,j),r.renderBufferDirect(S,null,O,ae,T,j),T.onAfterShadow(r,T,R,S,O,ae,j)}}}else if(B.visible){const H=v(T,B,b,U);T.onBeforeShadow(r,T,R,S,O,H,null),r.renderBufferDirect(S,null,O,H,T,null),T.onAfterShadow(r,T,R,S,O,H,null)}}const F=T.children;for(let O=0,B=F.length;O<B;O++)y(F[O],R,S,b,U)}function E(T){T.target.removeEventListener("dispose",E);for(const S in h){const b=h[S],U=T.target.uuid;U in b&&(b[U].dispose(),delete b[U])}}}function Nx(r,e){function t(){let L=!1;const re=new _t;let te=null;const _e=new _t(0,0,0,0);return{setMask:function(Q){te!==Q&&!L&&(r.colorMask(Q,Q,Q,Q),te=Q)},setLocked:function(Q){L=Q},setClear:function(Q,X,ye,Oe,mt){mt===!0&&(Q*=Oe,X*=Oe,ye*=Oe),re.set(Q,X,ye,Oe),_e.equals(re)===!1&&(r.clearColor(Q,X,ye,Oe),_e.copy(re))},reset:function(){L=!1,te=null,_e.set(-1,0,0,0)}}}function n(){let L=!1,re=!1,te=null,_e=null,Q=null;return{setReversed:function(X){if(re!==X){const ye=e.get("EXT_clip_control");X?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),re=X;const Oe=Q;Q=null,this.setClear(Oe)}},getReversed:function(){return re},setTest:function(X){X?ie(r.DEPTH_TEST):oe(r.DEPTH_TEST)},setMask:function(X){te!==X&&!L&&(r.depthMask(X),te=X)},setFunc:function(X){if(re&&(X=qd[X]),_e!==X){switch(X){case ya:r.depthFunc(r.NEVER);break;case Sa:r.depthFunc(r.ALWAYS);break;case Ma:r.depthFunc(r.LESS);break;case ts:r.depthFunc(r.LEQUAL);break;case ba:r.depthFunc(r.EQUAL);break;case wa:r.depthFunc(r.GEQUAL);break;case Ta:r.depthFunc(r.GREATER);break;case Ea:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}_e=X}},setLocked:function(X){L=X},setClear:function(X){Q!==X&&(Q=X,re&&(X=1-X),r.clearDepth(X))},reset:function(){L=!1,te=null,_e=null,Q=null,re=!1}}}function i(){let L=!1,re=null,te=null,_e=null,Q=null,X=null,ye=null,Oe=null,mt=null;return{setTest:function(st){L||(st?ie(r.STENCIL_TEST):oe(r.STENCIL_TEST))},setMask:function(st){re!==st&&!L&&(r.stencilMask(st),re=st)},setFunc:function(st,Vn,Hn){(te!==st||_e!==Vn||Q!==Hn)&&(r.stencilFunc(st,Vn,Hn),te=st,_e=Vn,Q=Hn)},setOp:function(st,Vn,Hn){(X!==st||ye!==Vn||Oe!==Hn)&&(r.stencilOp(st,Vn,Hn),X=st,ye=Vn,Oe=Hn)},setLocked:function(st){L=st},setClear:function(st){mt!==st&&(r.clearStencil(st),mt=st)},reset:function(){L=!1,re=null,te=null,_e=null,Q=null,X=null,ye=null,Oe=null,mt=null}}}const s=new t,o=new n,a=new i,c=new WeakMap,h=new WeakMap;let f={},l={},u=new WeakMap,d=[],p=null,_=!1,g=null,m=null,x=null,v=null,y=null,E=null,T=null,R=new fe(0,0,0),S=0,b=!1,U=null,P=null,F=null,O=null,B=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,G=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=G>=2);let Z=null,ae={};const he=r.getParameter(r.SCISSOR_BOX),pe=r.getParameter(r.VIEWPORT),Ie=new _t().fromArray(he),nt=new _t().fromArray(pe);function at(L,re,te,_e){const Q=new Uint8Array(4),X=r.createTexture();r.bindTexture(L,X),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ye=0;ye<te;ye++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(re,0,r.RGBA,1,1,_e,0,r.RGBA,r.UNSIGNED_BYTE,Q):r.texImage2D(re+ye,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Q);return X}const $={};$[r.TEXTURE_2D]=at(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=at(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=at(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=at(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(r.DEPTH_TEST),o.setFunc(ts),We(!1),St(dc),ie(r.CULL_FACE),it(Nn);function ie(L){f[L]!==!0&&(r.enable(L),f[L]=!0)}function oe(L){f[L]!==!1&&(r.disable(L),f[L]=!1)}function Ge(L,re){return l[L]!==re?(r.bindFramebuffer(L,re),l[L]=re,L===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=re),L===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=re),!0):!1}function Le(L,re){let te=d,_e=!1;if(L){te=u.get(re),te===void 0&&(te=[],u.set(re,te));const Q=L.textures;if(te.length!==Q.length||te[0]!==r.COLOR_ATTACHMENT0){for(let X=0,ye=Q.length;X<ye;X++)te[X]=r.COLOR_ATTACHMENT0+X;te.length=Q.length,_e=!0}}else te[0]!==r.BACK&&(te[0]=r.BACK,_e=!0);_e&&r.drawBuffers(te)}function Ue(L){return p!==L?(r.useProgram(L),p=L,!0):!1}const Nt={[wi]:r.FUNC_ADD,[dd]:r.FUNC_SUBTRACT,[fd]:r.FUNC_REVERSE_SUBTRACT};Nt[pd]=r.MIN,Nt[md]=r.MAX;const je={[gd]:r.ZERO,[_d]:r.ONE,[xd]:r.SRC_COLOR,[xa]:r.SRC_ALPHA,[wd]:r.SRC_ALPHA_SATURATE,[Md]:r.DST_COLOR,[yd]:r.DST_ALPHA,[vd]:r.ONE_MINUS_SRC_COLOR,[va]:r.ONE_MINUS_SRC_ALPHA,[bd]:r.ONE_MINUS_DST_COLOR,[Sd]:r.ONE_MINUS_DST_ALPHA,[Td]:r.CONSTANT_COLOR,[Ed]:r.ONE_MINUS_CONSTANT_COLOR,[Ad]:r.CONSTANT_ALPHA,[Cd]:r.ONE_MINUS_CONSTANT_ALPHA};function it(L,re,te,_e,Q,X,ye,Oe,mt,st){if(L===Nn){_===!0&&(oe(r.BLEND),_=!1);return}if(_===!1&&(ie(r.BLEND),_=!0),L!==ud){if(L!==g||st!==b){if((m!==wi||y!==wi)&&(r.blendEquation(r.FUNC_ADD),m=wi,y=wi),st)switch(L){case ji:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _a:r.blendFunc(r.ONE,r.ONE);break;case fc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case pc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Fe("WebGLState: Invalid blending: ",L);break}else switch(L){case ji:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _a:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case fc:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pc:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",L);break}x=null,v=null,E=null,T=null,R.set(0,0,0),S=0,g=L,b=st}return}Q=Q||re,X=X||te,ye=ye||_e,(re!==m||Q!==y)&&(r.blendEquationSeparate(Nt[re],Nt[Q]),m=re,y=Q),(te!==x||_e!==v||X!==E||ye!==T)&&(r.blendFuncSeparate(je[te],je[_e],je[X],je[ye]),x=te,v=_e,E=X,T=ye),(Oe.equals(R)===!1||mt!==S)&&(r.blendColor(Oe.r,Oe.g,Oe.b,mt),R.copy(Oe),S=mt),g=L,b=!1}function dt(L,re){L.side===Ot?oe(r.CULL_FACE):ie(r.CULL_FACE);let te=L.side===$t;re&&(te=!te),We(te),L.blending===ji&&L.transparent===!1?it(Nn):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;a.setTest(_e),_e&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),wt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(r.SAMPLE_ALPHA_TO_COVERAGE):oe(r.SAMPLE_ALPHA_TO_COVERAGE)}function We(L){U!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),U=L)}function St(L){L!==ld?(ie(r.CULL_FACE),L!==P&&(L===dc?r.cullFace(r.BACK):L===cd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):oe(r.CULL_FACE),P=L}function I(L){L!==F&&(k&&r.lineWidth(L),F=L)}function wt(L,re,te){L?(ie(r.POLYGON_OFFSET_FILL),(O!==re||B!==te)&&(O=re,B=te,o.getReversed()&&(re=-re),r.polygonOffset(re,te))):oe(r.POLYGON_OFFSET_FILL)}function et(L){L?ie(r.SCISSOR_TEST):oe(r.SCISSOR_TEST)}function pt(L){L===void 0&&(L=r.TEXTURE0+H-1),Z!==L&&(r.activeTexture(L),Z=L)}function be(L,re,te){te===void 0&&(Z===null?te=r.TEXTURE0+H-1:te=Z);let _e=ae[te];_e===void 0&&(_e={type:void 0,texture:void 0},ae[te]=_e),(_e.type!==L||_e.texture!==re)&&(Z!==te&&(r.activeTexture(te),Z=te),r.bindTexture(L,re||$[L]),_e.type=L,_e.texture=re)}function A(){const L=ae[Z];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function M(){try{r.compressedTexImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function Y(){try{r.texSubImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function K(){try{r.texSubImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function xe(){try{r.compressedTexSubImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function se(){try{r.texStorage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function Re(){try{r.texStorage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function Ne(){try{r.texImage2D(...arguments)}catch(L){Fe("WebGLState:",L)}}function J(){try{r.texImage3D(...arguments)}catch(L){Fe("WebGLState:",L)}}function ee(L){Ie.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Ie.copy(L))}function ve(L){nt.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),nt.copy(L))}function Se(L,re){let te=h.get(re);te===void 0&&(te=new WeakMap,h.set(re,te));let _e=te.get(L);_e===void 0&&(_e=r.getUniformBlockIndex(re,L.name),te.set(L,_e))}function me(L,re){const _e=h.get(re).get(L);c.get(re)!==_e&&(r.uniformBlockBinding(re,_e,L.__bindingPointIndex),c.set(re,_e))}function Xe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},Z=null,ae={},l={},u=new WeakMap,d=[],p=null,_=!1,g=null,m=null,x=null,v=null,y=null,E=null,T=null,R=new fe(0,0,0),S=0,b=!1,U=null,P=null,F=null,O=null,B=null,Ie.set(0,0,r.canvas.width,r.canvas.height),nt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:oe,bindFramebuffer:Ge,drawBuffers:Le,useProgram:Ue,setBlending:it,setMaterial:dt,setFlipSided:We,setCullFace:St,setLineWidth:I,setPolygonOffset:wt,setScissorTest:et,activeTexture:pt,bindTexture:be,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:D,texImage2D:Ne,texImage3D:J,updateUBOMapping:Se,uniformBlockBinding:me,texStorage2D:se,texStorage3D:Re,texSubImage2D:Y,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:xe,scissor:ee,viewport:ve,reset:Xe}}function Fx(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new le,f=new WeakMap;let l;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,M){return d?new OffscreenCanvas(A,M):Zs("canvas")}function _(A,M,D){let Y=1;const K=be(A);if((K.width>D||K.height>D)&&(Y=D/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(Y*K.width),xe=Math.floor(Y*K.height);l===void 0&&(l=p(q,xe));const se=M?p(q,xe):l;return se.width=q,se.height=xe,se.getContext("2d").drawImage(A,0,0,q,xe),Ee("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+xe+")."),se}else return"data"in A&&Ee("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){r.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(A,M,D,Y,K=!1){if(A!==null){if(r[A]!==void 0)return r[A];Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=M;if(M===r.RED&&(D===r.FLOAT&&(q=r.R32F),D===r.HALF_FLOAT&&(q=r.R16F),D===r.UNSIGNED_BYTE&&(q=r.R8)),M===r.RED_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.R8UI),D===r.UNSIGNED_SHORT&&(q=r.R16UI),D===r.UNSIGNED_INT&&(q=r.R32UI),D===r.BYTE&&(q=r.R8I),D===r.SHORT&&(q=r.R16I),D===r.INT&&(q=r.R32I)),M===r.RG&&(D===r.FLOAT&&(q=r.RG32F),D===r.HALF_FLOAT&&(q=r.RG16F),D===r.UNSIGNED_BYTE&&(q=r.RG8)),M===r.RG_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RG8UI),D===r.UNSIGNED_SHORT&&(q=r.RG16UI),D===r.UNSIGNED_INT&&(q=r.RG32UI),D===r.BYTE&&(q=r.RG8I),D===r.SHORT&&(q=r.RG16I),D===r.INT&&(q=r.RG32I)),M===r.RGB_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGB8UI),D===r.UNSIGNED_SHORT&&(q=r.RGB16UI),D===r.UNSIGNED_INT&&(q=r.RGB32UI),D===r.BYTE&&(q=r.RGB8I),D===r.SHORT&&(q=r.RGB16I),D===r.INT&&(q=r.RGB32I)),M===r.RGBA_INTEGER&&(D===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),D===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),D===r.UNSIGNED_INT&&(q=r.RGBA32UI),D===r.BYTE&&(q=r.RGBA8I),D===r.SHORT&&(q=r.RGBA16I),D===r.INT&&(q=r.RGBA32I)),M===r.RGB&&(D===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),D===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),M===r.RGBA){const xe=K?Jr:Ze.getTransfer(Y);D===r.FLOAT&&(q=r.RGBA32F),D===r.HALF_FLOAT&&(q=r.RGBA16F),D===r.UNSIGNED_BYTE&&(q=xe===tt?r.SRGB8_ALPHA8:r.RGBA8),D===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),D===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(A,M){let D;return A?M===null||M===On||M===qs?D=r.DEPTH24_STENCIL8:M===un?D=r.DEPTH32F_STENCIL8:M===Xs&&(D=r.DEPTH24_STENCIL8,Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===On||M===qs?D=r.DEPTH_COMPONENT24:M===un?D=r.DEPTH_COMPONENT32F:M===Xs&&(D=r.DEPTH_COMPONENT16),D}function E(A,M){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Rt&&A.minFilter!==Ct?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function T(A){const M=A.target;M.removeEventListener("dispose",T),S(M),M.isVideoTexture&&f.delete(M)}function R(A){const M=A.target;M.removeEventListener("dispose",R),U(M)}function S(A){const M=n.get(A);if(M.__webglInit===void 0)return;const D=A.source,Y=u.get(D);if(Y){const K=Y[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(A),Object.keys(Y).length===0&&u.delete(D)}n.remove(A)}function b(A){const M=n.get(A);r.deleteTexture(M.__webglTexture);const D=A.source,Y=u.get(D);delete Y[M.__cacheKey],o.memory.textures--}function U(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let K=0;K<M.__webglFramebuffer[Y].length;K++)r.deleteFramebuffer(M.__webglFramebuffer[Y][K]);else r.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)r.deleteFramebuffer(M.__webglFramebuffer[Y]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const D=A.textures;for(let Y=0,K=D.length;Y<K;Y++){const q=n.get(D[Y]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(D[Y])}n.remove(A)}let P=0;function F(){P=0}function O(){const A=P;return A>=i.maxTextures&&Ee("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function B(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function H(A,M){const D=n.get(A);if(A.isVideoTexture&&et(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&D.__version!==A.version){const Y=A.image;if(Y===null)Ee("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ee("WebGLRenderer: Texture marked for update but image is incomplete");else{$(D,A,M);return}}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,D.__webglTexture,r.TEXTURE0+M)}function k(A,M){const D=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){$(D,A,M);return}else A.isExternalTexture&&(D.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,D.__webglTexture,r.TEXTURE0+M)}function G(A,M){const D=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&D.__version!==A.version){$(D,A,M);return}t.bindTexture(r.TEXTURE_3D,D.__webglTexture,r.TEXTURE0+M)}function j(A,M){const D=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&D.__version!==A.version){ie(D,A,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+M)}const Z={[hn]:r.REPEAT,[In]:r.CLAMP_TO_EDGE,[jr]:r.MIRRORED_REPEAT},ae={[Rt]:r.NEAREST,[nu]:r.NEAREST_MIPMAP_NEAREST,[Ns]:r.NEAREST_MIPMAP_LINEAR,[Ct]:r.LINEAR,[Hr]:r.LINEAR_MIPMAP_NEAREST,[Ln]:r.LINEAR_MIPMAP_LINEAR},he={[Ud]:r.NEVER,[Gd]:r.ALWAYS,[Od]:r.LESS,[Nl]:r.LEQUAL,[Bd]:r.EQUAL,[Fl]:r.GEQUAL,[kd]:r.GREATER,[zd]:r.NOTEQUAL};function pe(A,M){if(M.type===un&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Ct||M.magFilter===Hr||M.magFilter===Ns||M.magFilter===Ln||M.minFilter===Ct||M.minFilter===Hr||M.minFilter===Ns||M.minFilter===Ln)&&Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,Z[M.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,Z[M.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,Z[M.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,ae[M.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,ae[M.minFilter]),M.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,he[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Rt||M.minFilter!==Ns&&M.minFilter!==Ln||M.type===un&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");r.texParameterf(A,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ie(A,M){let D=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",T));const Y=M.source;let K=u.get(Y);K===void 0&&(K={},u.set(Y,K));const q=B(M);if(q!==A.__cacheKey){K[q]===void 0&&(K[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,D=!0),K[q].usedTimes++;const xe=K[A.__cacheKey];xe!==void 0&&(K[A.__cacheKey].usedTimes--,xe.usedTimes===0&&b(M)),A.__cacheKey=q,A.__webglTexture=K[q].texture}return D}function nt(A,M,D){return Math.floor(Math.floor(A/D)/M)}function at(A,M,D,Y){const q=A.updateRanges;if(q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,D,Y,M.data);else{q.sort((J,ee)=>J.start-ee.start);let xe=0;for(let J=1;J<q.length;J++){const ee=q[xe],ve=q[J],Se=ee.start+ee.count,me=nt(ve.start,M.width,4),Xe=nt(ee.start,M.width,4);ve.start<=Se+1&&me===Xe&&nt(ve.start+ve.count-1,M.width,4)===me?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++xe,q[xe]=ve)}q.length=xe+1;const se=r.getParameter(r.UNPACK_ROW_LENGTH),Re=r.getParameter(r.UNPACK_SKIP_PIXELS),Ne=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let J=0,ee=q.length;J<ee;J++){const ve=q[J],Se=Math.floor(ve.start/4),me=Math.ceil(ve.count/4),Xe=Se%M.width,L=Math.floor(Se/M.width),re=me,te=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Xe),r.pixelStorei(r.UNPACK_SKIP_ROWS,L),t.texSubImage2D(r.TEXTURE_2D,0,Xe,L,re,te,D,Y,M.data)}A.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,se),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Re),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ne)}}function $(A,M,D){let Y=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=r.TEXTURE_3D);const K=Ie(A,M),q=M.source;t.bindTexture(Y,A.__webglTexture,r.TEXTURE0+D);const xe=n.get(q);if(q.version!==xe.__version||K===!0){t.activeTexture(r.TEXTURE0+D);const se=Ze.getPrimaries(Ze.workingColorSpace),Re=M.colorSpace===ci?null:Ze.getPrimaries(M.colorSpace),Ne=M.colorSpace===ci||se===Re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let J=_(M.image,!1,i.maxTextureSize);J=pt(M,J);const ee=s.convert(M.format,M.colorSpace),ve=s.convert(M.type);let Se=v(M.internalFormat,ee,ve,M.colorSpace,M.isVideoTexture);pe(Y,M);let me;const Xe=M.mipmaps,L=M.isVideoTexture!==!0,re=xe.__version===void 0||K===!0,te=q.dataReady,_e=E(M,J);if(M.isDepthTexture)Se=y(M.format===Ei,M.type),re&&(L?t.texStorage2D(r.TEXTURE_2D,1,Se,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,Se,J.width,J.height,0,ee,ve,null));else if(M.isDataTexture)if(Xe.length>0){L&&re&&t.texStorage2D(r.TEXTURE_2D,_e,Se,Xe[0].width,Xe[0].height);for(let Q=0,X=Xe.length;Q<X;Q++)me=Xe[Q],L?te&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,me.width,me.height,ee,ve,me.data):t.texImage2D(r.TEXTURE_2D,Q,Se,me.width,me.height,0,ee,ve,me.data);M.generateMipmaps=!1}else L?(re&&t.texStorage2D(r.TEXTURE_2D,_e,Se,J.width,J.height),te&&at(M,J,ee,ve)):t.texImage2D(r.TEXTURE_2D,0,Se,J.width,J.height,0,ee,ve,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){L&&re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Se,Xe[0].width,Xe[0].height,J.depth);for(let Q=0,X=Xe.length;Q<X;Q++)if(me=Xe[Q],M.format!==dn)if(ee!==null)if(L){if(te)if(M.layerUpdates.size>0){const ye=lh(me.width,me.height,M.format,M.type);for(const Oe of M.layerUpdates){const mt=me.data.subarray(Oe*ye/me.data.BYTES_PER_ELEMENT,(Oe+1)*ye/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,Oe,me.width,me.height,1,ee,mt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,me.width,me.height,J.depth,ee,me.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,Se,me.width,me.height,J.depth,0,me.data,0,0);else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,me.width,me.height,J.depth,ee,ve,me.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Q,Se,me.width,me.height,J.depth,0,ee,ve,me.data)}else{L&&re&&t.texStorage2D(r.TEXTURE_2D,_e,Se,Xe[0].width,Xe[0].height);for(let Q=0,X=Xe.length;Q<X;Q++)me=Xe[Q],M.format!==dn?ee!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,me.width,me.height,ee,me.data):t.compressedTexImage2D(r.TEXTURE_2D,Q,Se,me.width,me.height,0,me.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,me.width,me.height,ee,ve,me.data):t.texImage2D(r.TEXTURE_2D,Q,Se,me.width,me.height,0,ee,ve,me.data)}else if(M.isDataArrayTexture)if(L){if(re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Se,J.width,J.height,J.depth),te)if(M.layerUpdates.size>0){const Q=lh(J.width,J.height,M.format,M.type);for(const X of M.layerUpdates){const ye=J.data.subarray(X*Q/J.data.BYTES_PER_ELEMENT,(X+1)*Q/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,X,J.width,J.height,1,ee,ve,ye)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ee,ve,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Se,J.width,J.height,J.depth,0,ee,ve,J.data);else if(M.isData3DTexture)L?(re&&t.texStorage3D(r.TEXTURE_3D,_e,Se,J.width,J.height,J.depth),te&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ee,ve,J.data)):t.texImage3D(r.TEXTURE_3D,0,Se,J.width,J.height,J.depth,0,ee,ve,J.data);else if(M.isFramebufferTexture){if(re)if(L)t.texStorage2D(r.TEXTURE_2D,_e,Se,J.width,J.height);else{let Q=J.width,X=J.height;for(let ye=0;ye<_e;ye++)t.texImage2D(r.TEXTURE_2D,ye,Se,Q,X,0,ee,ve,null),Q>>=1,X>>=1}}else if(Xe.length>0){if(L&&re){const Q=be(Xe[0]);t.texStorage2D(r.TEXTURE_2D,_e,Se,Q.width,Q.height)}for(let Q=0,X=Xe.length;Q<X;Q++)me=Xe[Q],L?te&&t.texSubImage2D(r.TEXTURE_2D,Q,0,0,ee,ve,me):t.texImage2D(r.TEXTURE_2D,Q,Se,ee,ve,me);M.generateMipmaps=!1}else if(L){if(re){const Q=be(J);t.texStorage2D(r.TEXTURE_2D,_e,Se,Q.width,Q.height)}te&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ee,ve,J)}else t.texImage2D(r.TEXTURE_2D,0,Se,ee,ve,J);g(M)&&m(Y),xe.__version=q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ie(A,M,D){if(M.image.length!==6)return;const Y=Ie(A,M),K=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+D);const q=n.get(K);if(K.version!==q.__version||Y===!0){t.activeTexture(r.TEXTURE0+D);const xe=Ze.getPrimaries(Ze.workingColorSpace),se=M.colorSpace===ci?null:Ze.getPrimaries(M.colorSpace),Re=M.colorSpace===ci||xe===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ne=M.isCompressedTexture||M.image[0].isCompressedTexture,J=M.image[0]&&M.image[0].isDataTexture,ee=[];for(let X=0;X<6;X++)!Ne&&!J?ee[X]=_(M.image[X],!0,i.maxCubemapSize):ee[X]=J?M.image[X].image:M.image[X],ee[X]=pt(M,ee[X]);const ve=ee[0],Se=s.convert(M.format,M.colorSpace),me=s.convert(M.type),Xe=v(M.internalFormat,Se,me,M.colorSpace),L=M.isVideoTexture!==!0,re=q.__version===void 0||Y===!0,te=K.dataReady;let _e=E(M,ve);pe(r.TEXTURE_CUBE_MAP,M);let Q;if(Ne){L&&re&&t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,Xe,ve.width,ve.height);for(let X=0;X<6;X++){Q=ee[X].mipmaps;for(let ye=0;ye<Q.length;ye++){const Oe=Q[ye];M.format!==dn?Se!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye,0,0,Oe.width,Oe.height,Se,Oe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye,Xe,Oe.width,Oe.height,0,Oe.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye,0,0,Oe.width,Oe.height,Se,me,Oe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye,Xe,Oe.width,Oe.height,0,Se,me,Oe.data)}}}else{if(Q=M.mipmaps,L&&re){Q.length>0&&_e++;const X=be(ee[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,Xe,X.width,X.height)}for(let X=0;X<6;X++)if(J){L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ee[X].width,ee[X].height,Se,me,ee[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Xe,ee[X].width,ee[X].height,0,Se,me,ee[X].data);for(let ye=0;ye<Q.length;ye++){const mt=Q[ye].image[X].image;L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye+1,0,0,mt.width,mt.height,Se,me,mt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye+1,Xe,mt.width,mt.height,0,Se,me,mt.data)}}else{L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Se,me,ee[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Xe,Se,me,ee[X]);for(let ye=0;ye<Q.length;ye++){const Oe=Q[ye];L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye+1,0,0,Se,me,Oe.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,ye+1,Xe,Se,me,Oe.image[X])}}}g(M)&&m(r.TEXTURE_CUBE_MAP),q.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function oe(A,M,D,Y,K,q){const xe=s.convert(D.format,D.colorSpace),se=s.convert(D.type),Re=v(D.internalFormat,xe,se,D.colorSpace),Ne=n.get(M),J=n.get(D);if(J.__renderTarget=M,!Ne.__hasExternalTextures){const ee=Math.max(1,M.width>>q),ve=Math.max(1,M.height>>q);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?t.texImage3D(K,q,Re,ee,ve,M.depth,0,xe,se,null):t.texImage2D(K,q,Re,ee,ve,0,xe,se,null)}t.bindFramebuffer(r.FRAMEBUFFER,A),wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,K,J.__webglTexture,0,I(M)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,K,J.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(A,M,D){if(r.bindRenderbuffer(r.RENDERBUFFER,A),M.depthBuffer){const Y=M.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,q=y(M.stencilBuffer,K),xe=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(M),q,M.width,M.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(M),q,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,q,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,A)}else{const Y=M.textures;for(let K=0;K<Y.length;K++){const q=Y[K],xe=s.convert(q.format,q.colorSpace),se=s.convert(q.type),Re=v(q.internalFormat,xe,se,q.colorSpace);wt(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,I(M),Re,M.width,M.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,I(M),Re,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Re,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Le(A,M,D){const Y=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(M.depthTexture);if(K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y){if(K.__webglInit===void 0&&(K.__webglInit=!0,M.depthTexture.addEventListener("dispose",T)),K.__webglTexture===void 0){K.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),pe(r.TEXTURE_CUBE_MAP,M.depthTexture);const Ne=s.convert(M.depthTexture.format),J=s.convert(M.depthTexture.type);let ee;M.depthTexture.format===Jn?ee=r.DEPTH_COMPONENT24:M.depthTexture.format===Ei&&(ee=r.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,M.width,M.height,0,Ne,J,null)}}else H(M.depthTexture,0);const q=K.__webglTexture,xe=I(M),se=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+D:r.TEXTURE_2D,Re=M.depthTexture.format===Ei?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===Jn)wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Re,se,q,0,xe):r.framebufferTexture2D(r.FRAMEBUFFER,Re,se,q,0);else if(M.depthTexture.format===Ei)wt(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Re,se,q,0,xe):r.framebufferTexture2D(r.FRAMEBUFFER,Re,se,q,0);else throw new Error("Unknown depthTexture format")}function Ue(A){const M=n.get(A),D=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=Y}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(D)for(let Y=0;Y<6;Y++)Le(M.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?Le(M.__webglFramebuffer[0],A,0):Le(M.__webglFramebuffer,A,0)}else if(D){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=r.createRenderbuffer(),Ge(M.__webglDepthbuffer[Y],A,!1);else{const K=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,q)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),Ge(M.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Nt(A,M,D){const Y=n.get(A);M!==void 0&&oe(Y.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),D!==void 0&&Ue(A)}function je(A){const M=A.texture,D=n.get(A),Y=n.get(M);A.addEventListener("dispose",R);const K=A.textures,q=A.isWebGLCubeRenderTarget===!0,xe=K.length>1;if(xe||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=M.version,o.memory.textures++),q){D.__webglFramebuffer=[];for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0){D.__webglFramebuffer[se]=[];for(let Re=0;Re<M.mipmaps.length;Re++)D.__webglFramebuffer[se][Re]=r.createFramebuffer()}else D.__webglFramebuffer[se]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){D.__webglFramebuffer=[];for(let se=0;se<M.mipmaps.length;se++)D.__webglFramebuffer[se]=r.createFramebuffer()}else D.__webglFramebuffer=r.createFramebuffer();if(xe)for(let se=0,Re=K.length;se<Re;se++){const Ne=n.get(K[se]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&wt(A)===!1){D.__webglMultisampledFramebuffer=r.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let se=0;se<K.length;se++){const Re=K[se];D.__webglColorRenderbuffer[se]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,D.__webglColorRenderbuffer[se]);const Ne=s.convert(Re.format,Re.colorSpace),J=s.convert(Re.type),ee=v(Re.internalFormat,Ne,J,Re.colorSpace,A.isXRRenderTarget===!0),ve=I(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,ee,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,D.__webglColorRenderbuffer[se])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(D.__webglDepthRenderbuffer=r.createRenderbuffer(),Ge(D.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),pe(r.TEXTURE_CUBE_MAP,M);for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0)for(let Re=0;Re<M.mipmaps.length;Re++)oe(D.__webglFramebuffer[se][Re],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,Re);else oe(D.__webglFramebuffer[se],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(M)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let se=0,Re=K.length;se<Re;se++){const Ne=K[se],J=n.get(Ne);let ee=r.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ee,J.__webglTexture),pe(ee,Ne),oe(D.__webglFramebuffer,A,Ne,r.COLOR_ATTACHMENT0+se,ee,0),g(Ne)&&m(ee)}t.unbindTexture()}else{let se=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,Y.__webglTexture),pe(se,M),M.mipmaps&&M.mipmaps.length>0)for(let Re=0;Re<M.mipmaps.length;Re++)oe(D.__webglFramebuffer[Re],A,M,r.COLOR_ATTACHMENT0,se,Re);else oe(D.__webglFramebuffer,A,M,r.COLOR_ATTACHMENT0,se,0);g(M)&&m(se),t.unbindTexture()}A.depthBuffer&&Ue(A)}function it(A){const M=A.textures;for(let D=0,Y=M.length;D<Y;D++){const K=M[D];if(g(K)){const q=x(A),xe=n.get(K).__webglTexture;t.bindTexture(q,xe),m(q),t.unbindTexture()}}}const dt=[],We=[];function St(A){if(A.samples>0){if(wt(A)===!1){const M=A.textures,D=A.width,Y=A.height;let K=r.COLOR_BUFFER_BIT;const q=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(A),se=M.length>1;if(se)for(let Ne=0;Ne<M.length;Ne++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ne,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ne,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const Re=A.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ne=0;Ne<M.length;Ne++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),se){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[Ne]);const J=n.get(M[Ne]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,D,Y,0,0,D,Y,K,r.NEAREST),c===!0&&(dt.length=0,We.length=0,dt.push(r.COLOR_ATTACHMENT0+Ne),A.depthBuffer&&A.resolveDepthBuffer===!1&&(dt.push(q),We.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,We)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),se)for(let Ne=0;Ne<M.length;Ne++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ne,r.RENDERBUFFER,xe.__webglColorRenderbuffer[Ne]);const J=n.get(M[Ne]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ne,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const M=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function I(A){return Math.min(i.maxSamples,A.samples)}function wt(A){const M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function et(A){const M=o.render.frame;f.get(A)!==M&&(f.set(A,M),A.update())}function pt(A,M){const D=A.colorSpace,Y=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||D!==Kt&&D!==ci&&(Ze.getTransfer(D)===tt?(Y!==dn||K!==sn)&&Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",D)),M}function be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(h.width=A.naturalWidth||A.width,h.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(h.width=A.displayWidth,h.height=A.displayHeight):(h.width=A.width,h.height=A.height),h}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=H,this.setTexture2DArray=k,this.setTexture3D=G,this.setTextureCube=j,this.rebindTextures=Nt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ux(r,e){function t(n,i=ci){let s;const o=Ze.getTransfer(i);if(n===sn)return r.UNSIGNED_BYTE;if(n===Cl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===ru)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===ou)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===iu)return r.BYTE;if(n===su)return r.SHORT;if(n===Xs)return r.UNSIGNED_SHORT;if(n===Al)return r.INT;if(n===On)return r.UNSIGNED_INT;if(n===un)return r.FLOAT;if(n===rn)return r.HALF_FLOAT;if(n===au)return r.ALPHA;if(n===lu)return r.RGB;if(n===dn)return r.RGBA;if(n===Jn)return r.DEPTH_COMPONENT;if(n===Ei)return r.DEPTH_STENCIL;if(n===Pl)return r.RED;if(n===Il)return r.RED_INTEGER;if(n===is)return r.RG;if(n===Ll)return r.RG_INTEGER;if(n===Dl)return r.RGBA_INTEGER;if(n===Wr||n===Xr||n===qr||n===Yr)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Wr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Wr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ca||n===Ra||n===Pa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Aa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ca)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ra)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ia||n===La||n===Da||n===Na||n===Fa||n===Ua||n===Oa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ia||n===La)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Da)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Na)return s.COMPRESSED_R11_EAC;if(n===Fa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ua)return s.COMPRESSED_RG11_EAC;if(n===Oa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ba||n===ka||n===za||n===Ga||n===Va||n===Ha||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===Za||n===ja)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ba)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ga)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$a)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===Qa||n===el)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ja)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===el)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tl||n===nl||n===il||n===sl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===tl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===nl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===il)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const Ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bx=`
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

}`;class kx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new yu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pt({vertexShader:Ox,fragmentShader:Bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ne(new ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zx extends us{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,h=null,f=null,l=null,u=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new kx,m={},x=t.getContextAttributes();let v=null,y=null;const E=[],T=[],R=new le;let S=null;const b=new qt;b.viewport=new _t;const U=new qt;U.viewport=new _t;const P=[b,U],F=new Gp;let O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ie=E[$];return ie===void 0&&(ie=new wo,E[$]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function($){let ie=E[$];return ie===void 0&&(ie=new wo,E[$]=ie),ie.getGripSpace()},this.getHand=function($){let ie=E[$];return ie===void 0&&(ie=new wo,E[$]=ie),ie.getHandSpace()};function H($){const ie=T.indexOf($.inputSource);if(ie===-1)return;const oe=E[ie];oe!==void 0&&(oe.update($.inputSource,$.frame,h||o),oe.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let $=0;$<E.length;$++){const ie=T[$];ie!==null&&(T[$]=null,E[$].disconnect(ie))}O=null,B=null,g.reset();for(const $ in m)delete m[$];e.setRenderTarget(v),d=null,u=null,l=null,i=null,y=null,at.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&Ee("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&Ee("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return l===null&&_&&(l=new XRWebGLBinding(i,t)),l},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),x.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,Ge=null,Le=null;x.depth&&(Le=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=x.stencil?Ei:Jn,Ge=x.stencil?qs:On);const Ue={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};l=this.getBinding(),u=l.createProjectionLayer(Ue),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Zt(u.textureWidth,u.textureHeight,{format:dn,type:sn,depthTexture:new js(u.textureWidth,u.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const oe={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Zt(d.framebufferWidth,d.framebufferHeight,{format:dn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await i.requestReferenceSpace(a),at.setContext(i),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G($){for(let ie=0;ie<$.removed.length;ie++){const oe=$.removed[ie],Ge=T.indexOf(oe);Ge>=0&&(T[Ge]=null,E[Ge].disconnect(oe))}for(let ie=0;ie<$.added.length;ie++){const oe=$.added[ie];let Ge=T.indexOf(oe);if(Ge===-1){for(let Ue=0;Ue<E.length;Ue++)if(Ue>=T.length){T.push(oe),Ge=Ue;break}else if(T[Ue]===null){T[Ue]=oe,Ge=Ue;break}if(Ge===-1)break}const Le=E[Ge];Le&&Le.connect(oe)}}const j=new C,Z=new C;function ae($,ie,oe){j.setFromMatrixPosition(ie.matrixWorld),Z.setFromMatrixPosition(oe.matrixWorld);const Ge=j.distanceTo(Z),Le=ie.projectionMatrix.elements,Ue=oe.projectionMatrix.elements,Nt=Le[14]/(Le[10]-1),je=Le[14]/(Le[10]+1),it=(Le[9]+1)/Le[5],dt=(Le[9]-1)/Le[5],We=(Le[8]-1)/Le[0],St=(Ue[8]+1)/Ue[0],I=Nt*We,wt=Nt*St,et=Ge/(-We+St),pt=et*-We;if(ie.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(pt),$.translateZ(et),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Le[10]===-1)$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const be=Nt+et,A=je+et,M=I-pt,D=wt+(Ge-pt),Y=it*je/A*be,K=dt*je/A*be;$.projectionMatrix.makePerspective(M,D,Y,K,be,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function he($,ie){ie===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ie.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ie=$.near,oe=$.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),F.near=U.near=b.near=ie,F.far=U.far=b.far=oe,(O!==F.near||B!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,B=F.far),F.layers.mask=$.layers.mask|6,b.layers.mask=F.layers.mask&-5,U.layers.mask=F.layers.mask&-3;const Ge=$.parent,Le=F.cameras;he(F,Ge);for(let Ue=0;Ue<Le.length;Ue++)he(Le[Ue],Ge);Le.length===2?ae(F,b,U):F.projectionMatrix.copy(b.projectionMatrix),pe($,F,Ge)};function pe($,ie,oe){oe===null?$.matrix.copy(ie.matrixWorld):($.matrix.copy(oe.matrixWorld),$.matrix.invert(),$.matrix.multiply(ie.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ss*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function($){return m[$]};let Ie=null;function nt($,ie){if(f=ie.getViewerPose(h||o),p=ie,f!==null){const oe=f.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Ge=!1;oe.length!==F.cameras.length&&(F.cameras.length=0,Ge=!0);for(let je=0;je<oe.length;je++){const it=oe[je];let dt=null;if(d!==null)dt=d.getViewport(it);else{const St=l.getViewSubImage(u,it);dt=St.viewport,je===0&&(e.setRenderTargetTextures(y,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(y))}let We=P[je];We===void 0&&(We=new qt,We.layers.enable(je),We.viewport=new _t,P[je]=We),We.matrix.fromArray(it.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(it.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(dt.x,dt.y,dt.width,dt.height),je===0&&(F.matrix.copy(We.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ge===!0&&F.cameras.push(We)}const Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){l=n.getBinding();const je=l.getDepthInformation(oe[0]);je&&je.isValid&&je.texture&&g.init(je,i.renderState)}if(Le&&Le.includes("camera-access")&&_){e.state.unbindTexture(),l=n.getBinding();for(let je=0;je<oe.length;je++){const it=oe[je].camera;if(it){let dt=m[it];dt||(dt=new yu,m[it]=dt);const We=l.getCameraImage(it);dt.sourceTexture=We}}}}for(let oe=0;oe<E.length;oe++){const Ge=T[oe],Le=E[oe];Ge!==null&&Le!==void 0&&Le.update(Ge,ie,h||o)}Ie&&Ie($,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),p=null}const at=new Ou;at.setAnimationLoop(nt),this.setAnimationLoop=function($){Ie=$},this.dispose=function(){}}}const vi=new pn,Gx=new Be;function Vx(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Pu(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,v,y){m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),l(g,m)):m.isMeshPhongMaterial?(s(g,m),f(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,v):m.isSpriteMaterial?h(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$t&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$t&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=e.get(m),v=x.envMap,y=x.envMapRotation;v&&(g.envMap.value=v,vi.copy(y),vi.x*=-1,vi.y*=-1,vi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),g.envMapRotation.value.setFromMatrix4(Gx.makeRotationFromEuler(vi)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,v){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=v*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function f(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function l(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$t&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Hx(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function h(x,v){let y=i[x.id];y===void 0&&(p(x),y=f(x),i[x.id]=y,x.addEventListener("dispose",g));const E=v.program;n.updateUBOMapping(x,E);const T=e.render.frame;s[x.id]!==T&&(u(x),s[x.id]=T)}function f(x){const v=l();x.__bindingPointIndex=v;const y=r.createBuffer(),E=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,y),y}function l(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const v=i[x.id],y=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let T=0,R=y.length;T<R;T++){const S=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,U=S.length;b<U;b++){const P=S[b];if(d(P,T,b,E)===!0){const F=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let H=0;H<O.length;H++){const k=O[H],G=_(k);typeof k=="number"||typeof k=="boolean"?(P.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,F+B,P.__data)):k.isMatrix3?(P.__data[0]=k.elements[0],P.__data[1]=k.elements[1],P.__data[2]=k.elements[2],P.__data[3]=0,P.__data[4]=k.elements[3],P.__data[5]=k.elements[4],P.__data[6]=k.elements[5],P.__data[7]=0,P.__data[8]=k.elements[6],P.__data[9]=k.elements[7],P.__data[10]=k.elements[8],P.__data[11]=0):(k.toArray(P.__data,B),B+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(x,v,y,E){const T=x.value,R=v+"_"+y;if(E[R]===void 0)return typeof T=="number"||typeof T=="boolean"?E[R]=T:E[R]=T.clone(),!0;{const S=E[R];if(typeof T=="number"||typeof T=="boolean"){if(S!==T)return E[R]=T,!0}else if(S.equals(T)===!1)return S.copy(T),!0}return!1}function p(x){const v=x.uniforms;let y=0;const E=16;for(let R=0,S=v.length;R<S;R++){const b=Array.isArray(v[R])?v[R]:[v[R]];for(let U=0,P=b.length;U<P;U++){const F=b[U],O=Array.isArray(F.value)?F.value:[F.value];for(let B=0,H=O.length;B<H;B++){const k=O[B],G=_(k),j=y%E,Z=j%G.boundary,ae=j+Z;y+=Z,ae!==0&&E-ae<G.storage&&(y+=E-ae),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=G.storage}}}const T=y%E;return T>0&&(y+=E-T),x.__size=y,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ee("WebGLRenderer: Unsupported uniform value type.",x),v}function g(x){const v=x.target;v.removeEventListener("dispose",g);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:c,update:h,dispose:m}}const Wx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Tn=null;function Xx(){return Tn===null&&(Tn=new zl(Wx,16,16,is,rn),Tn.name="DFG_LUT",Tn.minFilter=Ct,Tn.magFilter=Ct,Tn.wrapS=In,Tn.wrapT=In,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}class qx{constructor(e={}){const{canvas:t=Wd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:l=!1,reversedDepthBuffer:u=!1,outputBufferType:d=sn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=d,g=new Set([Dl,Ll,Il]),m=new Set([sn,On,Xs,qs,Cl,Rl]),x=new Uint32Array(4),v=new Int32Array(4);let y=null,E=null;const T=[],R=[];let S=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let U=!1;this._outputColorSpace=Et;let P=0,F=0,O=null,B=-1,H=null;const k=new _t,G=new _t;let j=null;const Z=new fe(0);let ae=0,he=t.width,pe=t.height,Ie=1,nt=null,at=null;const $=new _t(0,0,he,pe),ie=new _t(0,0,he,pe);let oe=!1;const Ge=new Vl;let Le=!1,Ue=!1;const Nt=new Be,je=new C,it=new _t,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function St(){return O===null?Ie:1}let I=n;function wt(w,N){return t.getContext(w,N)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:l};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yl}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",Oe,!1),t.addEventListener("webglcontextcreationerror",mt,!1),I===null){const N="webgl2";if(I=wt(N,w),I===null)throw wt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw Fe("WebGLRenderer: "+w.message),w}let et,pt,be,A,M,D,Y,K,q,xe,se,Re,Ne,J,ee,ve,Se,me,Xe,L,re,te,_e;function Q(){et=new qg(I),et.init(),re=new Ux(I,et),pt=new Bg(I,et,e,re),be=new Nx(I,et),pt.reversedDepthBuffer&&u&&be.buffers.depth.setReversed(!0),A=new Kg(I),M=new yx,D=new Fx(I,et,be,M,pt,re,A),Y=new Xg(b),K=new em(I),te=new Ug(I,K),q=new Yg(I,K,A,te),xe=new jg(I,q,K,te,A),me=new Zg(I,pt,D),ee=new kg(M),se=new vx(b,Y,et,pt,te,ee),Re=new Vx(b,M),Ne=new Mx,J=new Cx(et),Se=new Fg(b,Y,be,xe,p,c),ve=new Dx(b,xe,pt),_e=new Hx(I,A,pt,be),Xe=new Og(I,et,A),L=new $g(I,et,A),A.programs=se.programs,b.capabilities=pt,b.extensions=et,b.properties=M,b.renderLists=Ne,b.shadowMap=ve,b.state=be,b.info=A}Q(),_!==sn&&(S=new Qg(_,t.width,t.height,i,s));const X=new zx(b,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=et.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=et.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(w){w!==void 0&&(Ie=w,this.setSize(he,pe,!1))},this.getSize=function(w){return w.set(he,pe)},this.setSize=function(w,N,W=!0){if(X.isPresenting){Ee("WebGLRenderer: Can't change size while VR device is presenting.");return}he=w,pe=N,t.width=Math.floor(w*Ie),t.height=Math.floor(N*Ie),W===!0&&(t.style.width=w+"px",t.style.height=N+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(he*Ie,pe*Ie).floor()},this.setDrawingBufferSize=function(w,N,W){he=w,pe=N,Ie=W,t.width=Math.floor(w*W),t.height=Math.floor(N*W),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(_===sn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(k)},this.getViewport=function(w){return w.copy($)},this.setViewport=function(w,N,W,V){w.isVector4?$.set(w.x,w.y,w.z,w.w):$.set(w,N,W,V),be.viewport(k.copy($).multiplyScalar(Ie).round())},this.getScissor=function(w){return w.copy(ie)},this.setScissor=function(w,N,W,V){w.isVector4?ie.set(w.x,w.y,w.z,w.w):ie.set(w,N,W,V),be.scissor(G.copy(ie).multiplyScalar(Ie).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(w){be.setScissorTest(oe=w)},this.setOpaqueSort=function(w){nt=w},this.setTransparentSort=function(w){at=w},this.getClearColor=function(w){return w.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,W=!0){let V=0;if(w){let z=!1;if(O!==null){const ue=O.texture.format;z=g.has(ue)}if(z){const ue=O.texture.type,ge=m.has(ue),de=Se.getClearColor(),Me=Se.getClearAlpha(),Te=de.r,ke=de.g,qe=de.b;ge?(x[0]=Te,x[1]=ke,x[2]=qe,x[3]=Me,I.clearBufferuiv(I.COLOR,0,x)):(v[0]=Te,v[1]=ke,v[2]=qe,v[3]=Me,I.clearBufferiv(I.COLOR,0,v))}else V|=I.COLOR_BUFFER_BIT}N&&(V|=I.DEPTH_BUFFER_BIT),W&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",Oe,!1),t.removeEventListener("webglcontextcreationerror",mt,!1),Se.dispose(),Ne.dispose(),J.dispose(),M.dispose(),Y.dispose(),xe.dispose(),te.dispose(),_e.dispose(),se.dispose(),X.dispose(),X.removeEventListener("sessionstart",ic),X.removeEventListener("sessionend",sc),di.stop()};function ye(w){w.preventDefault(),Qr("WebGLRenderer: Context Lost."),U=!0}function Oe(){Qr("WebGLRenderer: Context Restored."),U=!1;const w=A.autoReset,N=ve.enabled,W=ve.autoUpdate,V=ve.needsUpdate,z=ve.type;Q(),A.autoReset=w,ve.enabled=N,ve.autoUpdate=W,ve.needsUpdate=V,ve.type=z}function mt(w){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function st(w){const N=w.target;N.removeEventListener("dispose",st),Vn(N)}function Vn(w){Hn(w),M.remove(w)}function Hn(w){const N=M.get(w).programs;N!==void 0&&(N.forEach(function(W){se.releaseProgram(W)}),w.isShaderMaterial&&se.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,W,V,z,ue){N===null&&(N=dt);const ge=z.isMesh&&z.matrixWorld.determinant()<0,de=Qu(w,N,W,V,z);be.setMaterial(V,ge);let Me=W.index,Te=1;if(V.wireframe===!0){if(Me=q.getWireframeAttribute(W),Me===void 0)return;Te=2}const ke=W.drawRange,qe=W.attributes.position;let Ae=ke.start*Te,lt=(ke.start+ke.count)*Te;ue!==null&&(Ae=Math.max(Ae,ue.start*Te),lt=Math.min(lt,(ue.start+ue.count)*Te)),Me!==null?(Ae=Math.max(Ae,0),lt=Math.min(lt,Me.count)):qe!=null&&(Ae=Math.max(Ae,0),lt=Math.min(lt,qe.count));const Mt=lt-Ae;if(Mt<0||Mt===1/0)return;te.setup(z,V,de,W,Me);let yt,ct=Xe;if(Me!==null&&(yt=K.get(Me),ct=L,ct.setIndex(yt)),z.isMesh)V.wireframe===!0?(be.setLineWidth(V.wireframeLinewidth*St()),ct.setMode(I.LINES)):ct.setMode(I.TRIANGLES);else if(z.isLine){let kt=V.linewidth;kt===void 0&&(kt=1),be.setLineWidth(kt*St()),z.isLineSegments?ct.setMode(I.LINES):z.isLineLoop?ct.setMode(I.LINE_LOOP):ct.setMode(I.LINE_STRIP)}else z.isPoints?ct.setMode(I.POINTS):z.isSprite&&ct.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)eo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))ct.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const kt=z._multiDrawStarts,we=z._multiDrawCounts,Qt=z._multiDrawCount,Je=Me?K.get(Me).bytesPerElement:1,mn=M.get(V).currentProgram.getUniforms();for(let bn=0;bn<Qt;bn++)mn.setValue(I,"_gl_DrawID",bn),ct.render(kt[bn]/Je,we[bn])}else if(z.isInstancedMesh)ct.renderInstances(Ae,Mt,z.count);else if(W.isInstancedBufferGeometry){const kt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,we=Math.min(W.instanceCount,kt);ct.renderInstances(Ae,Mt,we)}else ct.render(Ae,Mt)};function nc(w,N,W){w.transparent===!0&&w.side===Ot&&w.forceSinglePass===!1?(w.side=$t,w.needsUpdate=!0,ar(w,N,W),w.side=jt,w.needsUpdate=!0,ar(w,N,W),w.side=Ot):ar(w,N,W)}this.compile=function(w,N,W=null){W===null&&(W=w),E=J.get(W),E.init(N),R.push(E),W.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),w!==W&&w.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),E.setupLights();const V=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ue=z.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){const de=ue[ge];nc(de,W,z),V.add(de)}else nc(ue,W,z),V.add(ue)}),E=R.pop(),V},this.compileAsync=function(w,N,W=null){const V=this.compile(w,N,W);return new Promise(z=>{function ue(){if(V.forEach(function(ge){M.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){z(w);return}setTimeout(ue,10)}et.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let po=null;function Ju(w){po&&po(w)}function ic(){di.stop()}function sc(){di.start()}const di=new Ou;di.setAnimationLoop(Ju),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(w){po=w,X.setAnimationLoop(w),w===null?di.stop():di.start()},X.addEventListener("sessionstart",ic),X.addEventListener("sessionend",sc),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;const W=X.enabled===!0&&X.isPresenting===!0,V=S!==null&&(O===null||W)&&S.begin(b,O);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),w.isScene===!0&&w.onBeforeRender(b,w,N,O),E=J.get(w,R.length),E.init(N),R.push(E),Nt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ge.setFromProjectionMatrix(Nt,Dn,N.reversedDepth),Ue=this.localClippingEnabled,Le=ee.init(this.clippingPlanes,Ue),y=Ne.get(w,T.length),y.init(),T.push(y),X.enabled===!0&&X.isPresenting===!0){const ge=b.xr.getDepthSensingMesh();ge!==null&&mo(ge,N,-1/0,b.sortObjects)}mo(w,N,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(nt,at),We=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,We&&Se.addToRenderList(y,w),this.info.render.frame++,Le===!0&&ee.beginShadows();const z=E.state.shadowsArray;if(ve.render(z,w,N),Le===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&S.hasRenderPass())===!1){const ge=y.opaque,de=y.transmissive;if(E.setupLights(),N.isArrayCamera){const Me=N.cameras;if(de.length>0)for(let Te=0,ke=Me.length;Te<ke;Te++){const qe=Me[Te];oc(ge,de,w,qe)}We&&Se.render(w);for(let Te=0,ke=Me.length;Te<ke;Te++){const qe=Me[Te];rc(y,w,qe,qe.viewport)}}else de.length>0&&oc(ge,de,w,N),We&&Se.render(w),rc(y,w,N)}O!==null&&F===0&&(D.updateMultisampleRenderTarget(O),D.updateRenderTargetMipmap(O)),V&&S.end(b),w.isScene===!0&&w.onAfterRender(b,w,N),te.resetDefaultState(),B=-1,H=null,R.pop(),R.length>0?(E=R[R.length-1],Le===!0&&ee.setGlobalState(b.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function mo(w,N,W,V){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ge.intersectsSprite(w)){V&&it.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Nt);const ge=xe.update(w),de=w.material;de.visible&&y.push(w,ge,de,W,it.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ge.intersectsObject(w))){const ge=xe.update(w),de=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),it.copy(w.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),it.copy(ge.boundingSphere.center)),it.applyMatrix4(w.matrixWorld).applyMatrix4(Nt)),Array.isArray(de)){const Me=ge.groups;for(let Te=0,ke=Me.length;Te<ke;Te++){const qe=Me[Te],Ae=de[qe.materialIndex];Ae&&Ae.visible&&y.push(w,ge,Ae,W,it.z,qe)}}else de.visible&&y.push(w,ge,de,W,it.z,null)}}const ue=w.children;for(let ge=0,de=ue.length;ge<de;ge++)mo(ue[ge],N,W,V)}function rc(w,N,W,V){const{opaque:z,transmissive:ue,transparent:ge}=w;E.setupLightsView(W),Le===!0&&ee.setGlobalState(b.clippingPlanes,W),V&&be.viewport(k.copy(V)),z.length>0&&or(z,N,W),ue.length>0&&or(ue,N,W),ge.length>0&&or(ge,N,W),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function oc(w,N,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[V.id]===void 0){const Ae=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[V.id]=new Zt(1,1,{generateMipmaps:!0,type:Ae?rn:sn,minFilter:Ln,samples:Math.max(4,pt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const ue=E.state.transmissionRenderTarget[V.id],ge=V.viewport||k;ue.setSize(ge.z*b.transmissionResolutionScale,ge.w*b.transmissionResolutionScale);const de=b.getRenderTarget(),Me=b.getActiveCubeFace(),Te=b.getActiveMipmapLevel();b.setRenderTarget(ue),b.getClearColor(Z),ae=b.getClearAlpha(),ae<1&&b.setClearColor(16777215,.5),b.clear(),We&&Se.render(W);const ke=b.toneMapping;b.toneMapping=Fn;const qe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),Le===!0&&ee.setGlobalState(b.clippingPlanes,V),or(w,W,V),D.updateMultisampleRenderTarget(ue),D.updateRenderTargetMipmap(ue),et.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let lt=0,Mt=N.length;lt<Mt;lt++){const yt=N[lt],{object:ct,geometry:kt,material:we,group:Qt}=yt;if(we.side===Ot&&ct.layers.test(V.layers)){const Je=we.side;we.side=$t,we.needsUpdate=!0,ac(ct,W,V,kt,we,Qt),we.side=Je,we.needsUpdate=!0,Ae=!0}}Ae===!0&&(D.updateMultisampleRenderTarget(ue),D.updateRenderTargetMipmap(ue))}b.setRenderTarget(de,Me,Te),b.setClearColor(Z,ae),qe!==void 0&&(V.viewport=qe),b.toneMapping=ke}function or(w,N,W){const V=N.isScene===!0?N.overrideMaterial:null;for(let z=0,ue=w.length;z<ue;z++){const ge=w[z],{object:de,geometry:Me,group:Te}=ge;let ke=ge.material;ke.allowOverride===!0&&V!==null&&(ke=V),de.layers.test(W.layers)&&ac(de,N,W,Me,ke,Te)}}function ac(w,N,W,V,z,ue){w.onBeforeRender(b,N,W,V,z,ue),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(b,N,W,V,w,ue),z.transparent===!0&&z.side===Ot&&z.forceSinglePass===!1?(z.side=$t,z.needsUpdate=!0,b.renderBufferDirect(W,N,V,z,w,ue),z.side=jt,z.needsUpdate=!0,b.renderBufferDirect(W,N,V,z,w,ue),z.side=Ot):b.renderBufferDirect(W,N,V,z,w,ue),w.onAfterRender(b,N,W,V,z,ue)}function ar(w,N,W){N.isScene!==!0&&(N=dt);const V=M.get(w),z=E.state.lights,ue=E.state.shadowsArray,ge=z.state.version,de=se.getParameters(w,z.state,ue,N,W),Me=se.getProgramCacheKey(de);let Te=V.programs;V.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,V.fog=N.fog;const ke=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;V.envMap=Y.get(w.envMap||V.environment,ke),V.envMapRotation=V.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Te===void 0&&(w.addEventListener("dispose",st),Te=new Map,V.programs=Te);let qe=Te.get(Me);if(qe!==void 0){if(V.currentProgram===qe&&V.lightsStateVersion===ge)return cc(w,de),qe}else de.uniforms=se.getUniforms(w),w.onBeforeCompile(de,b),qe=se.acquireProgram(de,Me),Te.set(Me,qe),V.uniforms=de.uniforms;const Ae=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ae.clippingPlanes=ee.uniform),cc(w,de),V.needsLights=td(w),V.lightsStateVersion=ge,V.needsLights&&(Ae.ambientLightColor.value=z.state.ambient,Ae.lightProbe.value=z.state.probe,Ae.directionalLights.value=z.state.directional,Ae.directionalLightShadows.value=z.state.directionalShadow,Ae.spotLights.value=z.state.spot,Ae.spotLightShadows.value=z.state.spotShadow,Ae.rectAreaLights.value=z.state.rectArea,Ae.ltc_1.value=z.state.rectAreaLTC1,Ae.ltc_2.value=z.state.rectAreaLTC2,Ae.pointLights.value=z.state.point,Ae.pointLightShadows.value=z.state.pointShadow,Ae.hemisphereLights.value=z.state.hemi,Ae.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ae.spotLightMatrix.value=z.state.spotLightMatrix,Ae.spotLightMap.value=z.state.spotLightMap,Ae.pointShadowMatrix.value=z.state.pointShadowMatrix),V.currentProgram=qe,V.uniformsList=null,qe}function lc(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=Kr.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function cc(w,N){const W=M.get(w);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function Qu(w,N,W,V,z){N.isScene!==!0&&(N=dt),D.resetTextureUnits();const ue=N.fog,ge=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?N.environment:null,de=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Kt,Me=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Te=Y.get(V.envMap||ge,Me),ke=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,qe=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!W.morphAttributes.position,lt=!!W.morphAttributes.normal,Mt=!!W.morphAttributes.color;let yt=Fn;V.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(yt=b.toneMapping);const ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,kt=ct!==void 0?ct.length:0,we=M.get(V),Qt=E.state.lights;if(Le===!0&&(Ue===!0||w!==H)){const Ft=w===H&&V.id===B;ee.setState(V,w,Ft)}let Je=!1;V.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Qt.state.version||we.outputColorSpace!==de||z.isBatchedMesh&&we.batching===!1||!z.isBatchedMesh&&we.batching===!0||z.isBatchedMesh&&we.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&we.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&we.instancing===!1||!z.isInstancedMesh&&we.instancing===!0||z.isSkinnedMesh&&we.skinning===!1||!z.isSkinnedMesh&&we.skinning===!0||z.isInstancedMesh&&we.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&we.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&we.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&we.instancingMorph===!1&&z.morphTexture!==null||we.envMap!==Te||V.fog===!0&&we.fog!==ue||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ee.numPlanes||we.numIntersection!==ee.numIntersection)||we.vertexAlphas!==ke||we.vertexTangents!==qe||we.morphTargets!==Ae||we.morphNormals!==lt||we.morphColors!==Mt||we.toneMapping!==yt||we.morphTargetsCount!==kt)&&(Je=!0):(Je=!0,we.__version=V.version);let mn=we.currentProgram;Je===!0&&(mn=ar(V,N,z));let bn=!1,fi=!1,Pi=!1;const ft=mn.getUniforms(),Bt=we.uniforms;if(be.useProgram(mn.program)&&(bn=!0,fi=!0,Pi=!0),V.id!==B&&(B=V.id,fi=!0),bn||H!==w){be.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ft.setValue(I,"projectionMatrix",w.projectionMatrix),ft.setValue(I,"viewMatrix",w.matrixWorldInverse);const ti=ft.map.cameraPosition;ti!==void 0&&ti.setValue(I,je.setFromMatrixPosition(w.matrixWorld)),pt.logarithmicDepthBuffer&&ft.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ft.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),H!==w&&(H=w,fi=!0,Pi=!0)}if(we.needsLights&&(Qt.state.directionalShadowMap.length>0&&ft.setValue(I,"directionalShadowMap",Qt.state.directionalShadowMap,D),Qt.state.spotShadowMap.length>0&&ft.setValue(I,"spotShadowMap",Qt.state.spotShadowMap,D),Qt.state.pointShadowMap.length>0&&ft.setValue(I,"pointShadowMap",Qt.state.pointShadowMap,D)),z.isSkinnedMesh){ft.setOptional(I,z,"bindMatrix"),ft.setOptional(I,z,"bindMatrixInverse");const Ft=z.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),ft.setValue(I,"boneTexture",Ft.boneTexture,D))}z.isBatchedMesh&&(ft.setOptional(I,z,"batchingTexture"),ft.setValue(I,"batchingTexture",z._matricesTexture,D),ft.setOptional(I,z,"batchingIdTexture"),ft.setValue(I,"batchingIdTexture",z._indirectTexture,D),ft.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&ft.setValue(I,"batchingColorTexture",z._colorsTexture,D));const ei=W.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&me.update(z,W,mn),(fi||we.receiveShadow!==z.receiveShadow)&&(we.receiveShadow=z.receiveShadow,ft.setValue(I,"receiveShadow",z.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&N.environment!==null&&(Bt.envMapIntensity.value=N.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=Xx()),fi&&(ft.setValue(I,"toneMappingExposure",b.toneMappingExposure),we.needsLights&&ed(Bt,Pi),ue&&V.fog===!0&&Re.refreshFogUniforms(Bt,ue),Re.refreshMaterialUniforms(Bt,V,Ie,pe,E.state.transmissionRenderTarget[w.id]),Kr.upload(I,lc(we),Bt,D)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Kr.upload(I,lc(we),Bt,D),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ft.setValue(I,"center",z.center),ft.setValue(I,"modelViewMatrix",z.modelViewMatrix),ft.setValue(I,"normalMatrix",z.normalMatrix),ft.setValue(I,"modelMatrix",z.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ft=V.uniformsGroups;for(let ti=0,Ii=Ft.length;ti<Ii;ti++){const hc=Ft[ti];_e.update(hc,mn),_e.bind(hc,mn)}}return mn}function ed(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function td(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(w,N,W){const V=M.get(w);V.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),M.get(w.texture).__webglTexture=N,M.get(w.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){const W=M.get(w);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const nd=I.createFramebuffer();this.setRenderTarget=function(w,N=0,W=0){O=w,P=N,F=W;let V=null,z=!1,ue=!1;if(w){const de=M.get(w);if(de.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(I.FRAMEBUFFER,de.__webglFramebuffer),k.copy(w.viewport),G.copy(w.scissor),j=w.scissorTest,be.viewport(k),be.scissor(G),be.setScissorTest(j),B=-1;return}else if(de.__webglFramebuffer===void 0)D.setupRenderTarget(w);else if(de.__hasExternalTextures)D.rebindTextures(w,M.get(w.texture).__webglTexture,M.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ke=w.depthTexture;if(de.__boundDepthTexture!==ke){if(ke!==null&&M.has(ke)&&(w.width!==ke.image.width||w.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(w)}}const Me=w.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(ue=!0);const Te=M.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Te[N])?V=Te[N][W]:V=Te[N],z=!0):w.samples>0&&D.useMultisampledRTT(w)===!1?V=M.get(w).__webglMultisampledFramebuffer:Array.isArray(Te)?V=Te[W]:V=Te,k.copy(w.viewport),G.copy(w.scissor),j=w.scissorTest}else k.copy($).multiplyScalar(Ie).floor(),G.copy(ie).multiplyScalar(Ie).floor(),j=oe;if(W!==0&&(V=nd),be.bindFramebuffer(I.FRAMEBUFFER,V)&&be.drawBuffers(w,V),be.viewport(k),be.scissor(G),be.setScissorTest(j),z){const de=M.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,de.__webglTexture,W)}else if(ue){const de=N;for(let Me=0;Me<w.textures.length;Me++){const Te=M.get(w.textures[Me]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Me,Te.__webglTexture,W,de)}}else if(w!==null&&W!==0){const de=M.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,de.__webglTexture,W)}B=-1},this.readRenderTargetPixels=function(w,N,W,V,z,ue,ge,de=0){if(!(w&&w.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=M.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){be.bindFramebuffer(I.FRAMEBUFFER,Me);try{const Te=w.textures[de],ke=Te.format,qe=Te.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+de),!pt.textureFormatReadable(ke)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable(qe)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-V&&W>=0&&W<=w.height-z&&I.readPixels(N,W,V,z,re.convert(ke),re.convert(qe),ue)}finally{const Te=O!==null?M.get(O).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(w,N,W,V,z,ue,ge,de=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=M.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me)if(N>=0&&N<=w.width-V&&W>=0&&W<=w.height-z){be.bindFramebuffer(I.FRAMEBUFFER,Me);const Te=w.textures[de],ke=Te.format,qe=Te.type;if(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+de),!pt.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),I.readPixels(N,W,V,z,re.convert(ke),re.convert(qe),0);const lt=O!==null?M.get(O).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,lt);const Mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Xd(I,Mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(Ae),I.deleteSync(Mt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,W=0){const V=Math.pow(2,-W),z=Math.floor(w.image.width*V),ue=Math.floor(w.image.height*V),ge=N!==null?N.x:0,de=N!==null?N.y:0;D.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,ge,de,z,ue),be.unbindTexture()};const id=I.createFramebuffer(),sd=I.createFramebuffer();this.copyTextureToTexture=function(w,N,W=null,V=null,z=0,ue=0){let ge,de,Me,Te,ke,qe,Ae,lt,Mt;const yt=w.isCompressedTexture?w.mipmaps[ue]:w.image;if(W!==null)ge=W.max.x-W.min.x,de=W.max.y-W.min.y,Me=W.isBox3?W.max.z-W.min.z:1,Te=W.min.x,ke=W.min.y,qe=W.isBox3?W.min.z:0;else{const Bt=Math.pow(2,-z);ge=Math.floor(yt.width*Bt),de=Math.floor(yt.height*Bt),w.isDataArrayTexture?Me=yt.depth:w.isData3DTexture?Me=Math.floor(yt.depth*Bt):Me=1,Te=0,ke=0,qe=0}V!==null?(Ae=V.x,lt=V.y,Mt=V.z):(Ae=0,lt=0,Mt=0);const ct=re.convert(N.format),kt=re.convert(N.type);let we;N.isData3DTexture?(D.setTexture3D(N,0),we=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(D.setTexture2DArray(N,0),we=I.TEXTURE_2D_ARRAY):(D.setTexture2D(N,0),we=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const Qt=I.getParameter(I.UNPACK_ROW_LENGTH),Je=I.getParameter(I.UNPACK_IMAGE_HEIGHT),mn=I.getParameter(I.UNPACK_SKIP_PIXELS),bn=I.getParameter(I.UNPACK_SKIP_ROWS),fi=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Te),I.pixelStorei(I.UNPACK_SKIP_ROWS,ke),I.pixelStorei(I.UNPACK_SKIP_IMAGES,qe);const Pi=w.isDataArrayTexture||w.isData3DTexture,ft=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){const Bt=M.get(w),ei=M.get(N),Ft=M.get(Bt.__renderTarget),ti=M.get(ei.__renderTarget);be.bindFramebuffer(I.READ_FRAMEBUFFER,Ft.__webglFramebuffer),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let Ii=0;Ii<Me;Ii++)Pi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,M.get(w).__webglTexture,z,qe+Ii),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,M.get(N).__webglTexture,ue,Mt+Ii)),I.blitFramebuffer(Te,ke,ge,de,Ae,lt,ge,de,I.DEPTH_BUFFER_BIT,I.NEAREST);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||M.has(w)){const Bt=M.get(w),ei=M.get(N);be.bindFramebuffer(I.READ_FRAMEBUFFER,id),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,sd);for(let Ft=0;Ft<Me;Ft++)Pi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Bt.__webglTexture,z,qe+Ft):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Bt.__webglTexture,z),ft?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ei.__webglTexture,ue,Mt+Ft):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ei.__webglTexture,ue),z!==0?I.blitFramebuffer(Te,ke,ge,de,Ae,lt,ge,de,I.COLOR_BUFFER_BIT,I.NEAREST):ft?I.copyTexSubImage3D(we,ue,Ae,lt,Mt+Ft,Te,ke,ge,de):I.copyTexSubImage2D(we,ue,Ae,lt,Te,ke,ge,de);be.bindFramebuffer(I.READ_FRAMEBUFFER,null),be.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ft?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(we,ue,Ae,lt,Mt,ge,de,Me,ct,kt,yt.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(we,ue,Ae,lt,Mt,ge,de,Me,ct,yt.data):I.texSubImage3D(we,ue,Ae,lt,Mt,ge,de,Me,ct,kt,yt):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ue,Ae,lt,ge,de,ct,kt,yt.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ue,Ae,lt,yt.width,yt.height,ct,yt.data):I.texSubImage2D(I.TEXTURE_2D,ue,Ae,lt,ge,de,ct,kt,yt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Qt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Je),I.pixelStorei(I.UNPACK_SKIP_PIXELS,mn),I.pixelStorei(I.UNPACK_SKIP_ROWS,bn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,fi),ue===0&&N.generateMipmaps&&I.generateMipmap(we),be.unbindTexture()},this.initRenderTarget=function(w){M.get(w).__webglFramebuffer===void 0&&D.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?D.setTextureCube(w,0):w.isData3DTexture?D.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?D.setTexture2DArray(w,0):D.setTexture2D(w,0),be.unbindTexture()},this.resetState=function(){P=0,F=0,O=null,be.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class Yx{constructor(){this.items=[],this.elapsed=0,this.delta=0,this.last=performance.now()}add(e,t,n){this.items.push({name:e,priority:t,fn:n}),this.items.sort((i,s)=>i.priority-s.priority)}tick(e=performance.now()){const t=(e-this.last)/1e3;this.last=e,this.delta=Math.min(t,.05),this.elapsed+=this.delta;for(const n of this.items)n.fn(this.delta,this.elapsed)}}const Lh={KeyW:"forward",ArrowUp:"forward",KeyS:"backward",ArrowDown:"backward",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",ShiftLeft:"boost",ShiftRight:"boost",ControlLeft:"brake",ControlRight:"brake",KeyB:"brake",KeyC:"handbrake",Space:"jump",KeyE:"interact",Enter:"interact",KeyR:"respawn",KeyM:"map",Escape:"menu",KeyH:"honk",KeyP:"potato"};class $x{constructor(e){this.canvas=e,this.actions={forward:!1,backward:!1,left:!1,right:!1,boost:!1,handbrake:!1,brake:!1,jump:!1,interact:!1,respawn:!1,map:!1,menu:!1,honk:!1,potato:!1},this.pressed=new Set,this.pointer={dragging:!1,lastX:0,lastY:0,orbitX:0,orbitY:0,zoom:1},this.joystick={x:0,y:0},this.mode="keyboard",this.enabled=!0,this.setupKeyboard(),this.setupPointer(),this.setupTouch()}setupKeyboard(){window.addEventListener("keydown",e=>{const t=Lh[e.code];t&&(e.preventDefault(),e.stopPropagation(),this.actions[t]||this.pressed.add(t),this.actions[t]=!0,this.mode="keyboard")}),window.addEventListener("keyup",e=>{const t=Lh[e.code];t&&(e.preventDefault(),e.stopPropagation(),this.actions[t]=!1)})}setupPointer(){this.canvas.addEventListener("pointerdown",t=>{this.pointer.dragging=!0,this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.canvas.setPointerCapture(t.pointerId)}),this.canvas.addEventListener("pointermove",t=>{if(!this.pointer.dragging)return;const n=t.clientX-this.pointer.lastX,i=t.clientY-this.pointer.lastY;this.pointer.lastX=t.clientX,this.pointer.lastY=t.clientY,this.pointer.orbitX+=n*.006,this.pointer.orbitY=Math.max(-.52,Math.min(.42,this.pointer.orbitY+i*.004)),this.mode=t.pointerType==="touch"?"touch":"pointer"});const e=t=>{this.pointer.dragging=!1,this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)};this.canvas.addEventListener("pointerup",e),this.canvas.addEventListener("pointercancel",e),window.addEventListener("wheel",t=>{this.pointer.zoom=Math.max(.7,Math.min(1.55,this.pointer.zoom+Math.sign(t.deltaY)*.08))},{passive:!0})}setupTouch(){const e=document.getElementById("touch-stick"),t=document.getElementById("touch-knob"),n=document.getElementById("touch-boost"),i=document.getElementById("touch-jump"),s=document.getElementById("touch-action");if(!e||!t||!n||!i||!s)return;let o=null,a={x:0,y:0};const c=(l,u)=>{const d=l-a.x,p=u-a.y,_=54,g=Math.max(1,Math.hypot(d,p)),m=Math.min(1,_/g),x=d*m,v=p*m;this.joystick.x=x/_,this.joystick.y=v/_,t.style.transform=`translate(calc(-50% + ${x}px), calc(-50% + ${v}px))`,this.mode="touch"};e.addEventListener("pointerdown",l=>{l.preventDefault(),o=l.pointerId,e.setPointerCapture(o);const u=e.getBoundingClientRect();a={x:u.left+u.width/2,y:u.top+u.height/2},c(l.clientX,l.clientY)}),e.addEventListener("pointermove",l=>{l.pointerId===o&&(l.preventDefault(),c(l.clientX,l.clientY))});const h=l=>{l.pointerId===o&&(o=null,this.joystick.x=0,this.joystick.y=0,t.style.transform="translate(-50%, -50%)")};e.addEventListener("pointerup",h),e.addEventListener("pointercancel",h);const f=(l,u)=>{l.addEventListener("pointerdown",p=>{p.preventDefault(),this.actions[u]=!0,this.pressed.add(u),this.mode="touch"});const d=()=>{this.actions[u]=!1};l.addEventListener("pointerup",d),l.addEventListener("pointercancel",d),l.addEventListener("pointerleave",d)};f(n,"boost"),f(i,"jump"),s.addEventListener("click",()=>{this.pressed.add("interact"),this.actions.interact=!0,requestAnimationFrame(()=>{this.actions.interact=!1})})}updateGamepad(){const e=navigator.getGamepads?.()[0];if(!e)return;const t=Math.abs(e.axes[0])>.15?e.axes[0]:0,n=Math.abs(e.axes[1])>.15?e.axes[1]:0;this.joystick.x=t,this.joystick.y=n,this.actions.forward=n<-.25||e.buttons[7]?.pressed,this.actions.backward=n>.25||e.buttons[6]?.pressed,this.actions.left=t<-.25,this.actions.right=t>.25,this.actions.boost=!!e.buttons[1]?.pressed,this.actions.handbrake=!!e.buttons[5]?.pressed,this.actions.jump=!!e.buttons[3]?.pressed,this.actions.brake=!!e.buttons[2]?.pressed,e.buttons[0]?.pressed&&this.pressed.add("interact"),e.buttons[9]?.pressed&&this.pressed.add("menu"),e.buttons[8]?.pressed&&this.pressed.add("respawn"),e.buttons[4]?.pressed&&this.pressed.add("potato"),this.mode="gamepad"}update(){this.updateGamepad()}consume(e){const t=this.pressed.has(e);return this.pressed.delete(e),t}clearTransient(){this.pressed.clear()}}var Cs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ta={};var Dh;function Kx(){return Dh||(Dh=1,(function(r){(function(){var e=function(){this.init()};e.prototype={init:function(){var l=this||t;return l._counter=1e3,l._html5AudioPool=[],l.html5PoolSize=10,l._codecs={},l._howls=[],l._muted=!1,l._volume=1,l._canPlayEvent="canplaythrough",l._navigator=typeof window<"u"&&window.navigator?window.navigator:null,l.masterGain=null,l.noAudio=!1,l.usingWebAudio=!0,l.autoSuspend=!0,l.ctx=null,l.autoUnlock=!0,l._setup(),l},volume:function(l){var u=this||t;if(l=parseFloat(l),u.ctx||f(),typeof l<"u"&&l>=0&&l<=1){if(u._volume=l,u._muted)return u;u.usingWebAudio&&u.masterGain.gain.setValueAtTime(l,t.ctx.currentTime);for(var d=0;d<u._howls.length;d++)if(!u._howls[d]._webAudio)for(var p=u._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=u._howls[d]._soundById(p[_]);g&&g._node&&(g._node.volume=g._volume*l)}return u}return u._volume},mute:function(l){var u=this||t;u.ctx||f(),u._muted=l,u.usingWebAudio&&u.masterGain.gain.setValueAtTime(l?0:u._volume,t.ctx.currentTime);for(var d=0;d<u._howls.length;d++)if(!u._howls[d]._webAudio)for(var p=u._howls[d]._getSoundIds(),_=0;_<p.length;_++){var g=u._howls[d]._soundById(p[_]);g&&g._node&&(g._node.muted=l?!0:g._muted)}return u},stop:function(){for(var l=this||t,u=0;u<l._howls.length;u++)l._howls[u].stop();return l},unload:function(){for(var l=this||t,u=l._howls.length-1;u>=0;u--)l._howls[u].unload();return l.usingWebAudio&&l.ctx&&typeof l.ctx.close<"u"&&(l.ctx.close(),l.ctx=null,f()),l},codecs:function(l){return(this||t)._codecs[l.replace(/^x-/,"")]},_setup:function(){var l=this||t;if(l.state=l.ctx&&l.ctx.state||"suspended",l._autoSuspend(),!l.usingWebAudio)if(typeof Audio<"u")try{var u=new Audio;typeof u.oncanplaythrough>"u"&&(l._canPlayEvent="canplay")}catch{l.noAudio=!0}else l.noAudio=!0;try{var u=new Audio;u.muted&&(l.noAudio=!0)}catch{}return l.noAudio||l._setupCodecs(),l},_setupCodecs:function(){var l=this||t,u=null;try{u=typeof Audio<"u"?new Audio:null}catch{return l}if(!u||typeof u.canPlayType!="function")return l;var d=u.canPlayType("audio/mpeg;").replace(/^no$/,""),p=l._navigator?l._navigator.userAgent:"",_=p.match(/OPR\/(\d+)/g),g=_&&parseInt(_[0].split("/")[1],10)<33,m=p.indexOf("Safari")!==-1&&p.indexOf("Chrome")===-1,x=p.match(/Version\/(.*?) /),v=m&&x&&parseInt(x[1],10)<15;return l._codecs={mp3:!!(!g&&(d||u.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(u.canPlayType('audio/wav; codecs="1"')||u.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!u.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(u.canPlayType("audio/x-m4b;")||u.canPlayType("audio/m4b;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!v&&u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!v&&u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!u.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(u.canPlayType("audio/x-flac;")||u.canPlayType("audio/flac;")).replace(/^no$/,"")},l},_unlockAudio:function(){var l=this||t;if(!(l._audioUnlocked||!l.ctx)){l._audioUnlocked=!1,l.autoUnlock=!1,!l._mobileUnloaded&&l.ctx.sampleRate!==44100&&(l._mobileUnloaded=!0,l.unload()),l._scratchBuffer=l.ctx.createBuffer(1,1,22050);var u=function(d){for(;l._html5AudioPool.length<l.html5PoolSize;)try{var p=new Audio;p._unlocked=!0,l._releaseHtml5Audio(p)}catch{l.noAudio=!0;break}for(var _=0;_<l._howls.length;_++)if(!l._howls[_]._webAudio)for(var g=l._howls[_]._getSoundIds(),m=0;m<g.length;m++){var x=l._howls[_]._soundById(g[m]);x&&x._node&&!x._node._unlocked&&(x._node._unlocked=!0,x._node.load())}l._autoResume();var v=l.ctx.createBufferSource();v.buffer=l._scratchBuffer,v.connect(l.ctx.destination),typeof v.start>"u"?v.noteOn(0):v.start(0),typeof l.ctx.resume=="function"&&l.ctx.resume(),v.onended=function(){v.disconnect(0),l._audioUnlocked=!0,document.removeEventListener("touchstart",u,!0),document.removeEventListener("touchend",u,!0),document.removeEventListener("click",u,!0),document.removeEventListener("keydown",u,!0);for(var y=0;y<l._howls.length;y++)l._howls[y]._emit("unlock")}};return document.addEventListener("touchstart",u,!0),document.addEventListener("touchend",u,!0),document.addEventListener("click",u,!0),document.addEventListener("keydown",u,!0),l}},_obtainHtml5Audio:function(){var l=this||t;if(l._html5AudioPool.length)return l._html5AudioPool.pop();var u=new Audio().play();return u&&typeof Promise<"u"&&(u instanceof Promise||typeof u.then=="function")&&u.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(l){var u=this||t;return l._unlocked&&u._html5AudioPool.push(l),u},_autoSuspend:function(){var l=this;if(!(!l.autoSuspend||!l.ctx||typeof l.ctx.suspend>"u"||!t.usingWebAudio)){for(var u=0;u<l._howls.length;u++)if(l._howls[u]._webAudio){for(var d=0;d<l._howls[u]._sounds.length;d++)if(!l._howls[u]._sounds[d]._paused)return l}return l._suspendTimer&&clearTimeout(l._suspendTimer),l._suspendTimer=setTimeout(function(){if(l.autoSuspend){l._suspendTimer=null,l.state="suspending";var p=function(){l.state="suspended",l._resumeAfterSuspend&&(delete l._resumeAfterSuspend,l._autoResume())};l.ctx.suspend().then(p,p)}},3e4),l}},_autoResume:function(){var l=this;if(!(!l.ctx||typeof l.ctx.resume>"u"||!t.usingWebAudio))return l.state==="running"&&l.ctx.state!=="interrupted"&&l._suspendTimer?(clearTimeout(l._suspendTimer),l._suspendTimer=null):l.state==="suspended"||l.state==="running"&&l.ctx.state==="interrupted"?(l.ctx.resume().then(function(){l.state="running";for(var u=0;u<l._howls.length;u++)l._howls[u]._emit("resume")}),l._suspendTimer&&(clearTimeout(l._suspendTimer),l._suspendTimer=null)):l.state==="suspending"&&(l._resumeAfterSuspend=!0),l}};var t=new e,n=function(l){var u=this;if(!l.src||l.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}u.init(l)};n.prototype={init:function(l){var u=this;return t.ctx||f(),u._autoplay=l.autoplay||!1,u._format=typeof l.format!="string"?l.format:[l.format],u._html5=l.html5||!1,u._muted=l.mute||!1,u._loop=l.loop||!1,u._pool=l.pool||5,u._preload=typeof l.preload=="boolean"||l.preload==="metadata"?l.preload:!0,u._rate=l.rate||1,u._sprite=l.sprite||{},u._src=typeof l.src!="string"?l.src:[l.src],u._volume=l.volume!==void 0?l.volume:1,u._xhr={method:l.xhr&&l.xhr.method?l.xhr.method:"GET",headers:l.xhr&&l.xhr.headers?l.xhr.headers:null,withCredentials:l.xhr&&l.xhr.withCredentials?l.xhr.withCredentials:!1},u._duration=0,u._state="unloaded",u._sounds=[],u._endTimers={},u._queue=[],u._playLock=!1,u._onend=l.onend?[{fn:l.onend}]:[],u._onfade=l.onfade?[{fn:l.onfade}]:[],u._onload=l.onload?[{fn:l.onload}]:[],u._onloaderror=l.onloaderror?[{fn:l.onloaderror}]:[],u._onplayerror=l.onplayerror?[{fn:l.onplayerror}]:[],u._onpause=l.onpause?[{fn:l.onpause}]:[],u._onplay=l.onplay?[{fn:l.onplay}]:[],u._onstop=l.onstop?[{fn:l.onstop}]:[],u._onmute=l.onmute?[{fn:l.onmute}]:[],u._onvolume=l.onvolume?[{fn:l.onvolume}]:[],u._onrate=l.onrate?[{fn:l.onrate}]:[],u._onseek=l.onseek?[{fn:l.onseek}]:[],u._onunlock=l.onunlock?[{fn:l.onunlock}]:[],u._onresume=[],u._webAudio=t.usingWebAudio&&!u._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(u),u._autoplay&&u._queue.push({event:"play",action:function(){u.play()}}),u._preload&&u._preload!=="none"&&u.load(),u},load:function(){var l=this,u=null;if(t.noAudio){l._emit("loaderror",null,"No audio support.");return}typeof l._src=="string"&&(l._src=[l._src]);for(var d=0;d<l._src.length;d++){var p,_;if(l._format&&l._format[d])p=l._format[d];else{if(_=l._src[d],typeof _!="string"){l._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}p=/^data:audio\/([^;,]+);/i.exec(_),p||(p=/\.([^.]+)$/.exec(_.split("?",1)[0])),p&&(p=p[1].toLowerCase())}if(p||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),p&&t.codecs(p)){u=l._src[d];break}}if(!u){l._emit("loaderror",null,"No codec support for selected audio sources.");return}return l._src=u,l._state="loading",window.location.protocol==="https:"&&u.slice(0,5)==="http:"&&(l._html5=!0,l._webAudio=!1),new i(l),l._webAudio&&o(l),l},play:function(l,u){var d=this,p=null;if(typeof l=="number")p=l,l=null;else{if(typeof l=="string"&&d._state==="loaded"&&!d._sprite[l])return null;if(typeof l>"u"&&(l="__default",!d._playLock)){for(var _=0,g=0;g<d._sounds.length;g++)d._sounds[g]._paused&&!d._sounds[g]._ended&&(_++,p=d._sounds[g]._id);_===1?l=null:p=null}}var m=p?d._soundById(p):d._inactiveSound();if(!m)return null;if(p&&!l&&(l=m._sprite||"__default"),d._state!=="loaded"){m._sprite=l,m._ended=!1;var x=m._id;return d._queue.push({event:"play",action:function(){d.play(x)}}),x}if(p&&!m._paused)return u||d._loadQueue("play"),m._id;d._webAudio&&t._autoResume();var v=Math.max(0,m._seek>0?m._seek:d._sprite[l][0]/1e3),y=Math.max(0,(d._sprite[l][0]+d._sprite[l][1])/1e3-v),E=y*1e3/Math.abs(m._rate),T=d._sprite[l][0]/1e3,R=(d._sprite[l][0]+d._sprite[l][1])/1e3;m._sprite=l,m._ended=!1;var S=function(){m._paused=!1,m._seek=v,m._start=T,m._stop=R,m._loop=!!(m._loop||d._sprite[l][2])};if(v>=R){d._ended(m);return}var b=m._node;if(d._webAudio){var U=function(){d._playLock=!1,S(),d._refreshBuffer(m);var B=m._muted||d._muted?0:m._volume;b.gain.setValueAtTime(B,t.ctx.currentTime),m._playStart=t.ctx.currentTime,typeof b.bufferSource.start>"u"?m._loop?b.bufferSource.noteGrainOn(0,v,86400):b.bufferSource.noteGrainOn(0,v,y):m._loop?b.bufferSource.start(0,v,86400):b.bufferSource.start(0,v,y),E!==1/0&&(d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),E)),u||setTimeout(function(){d._emit("play",m._id),d._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?U():(d._playLock=!0,d.once("resume",U),d._clearTimer(m._id))}else{var P=function(){b.currentTime=v,b.muted=m._muted||d._muted||t._muted||b.muted,b.volume=m._volume*t.volume(),b.playbackRate=m._rate;try{var B=b.play();if(B&&typeof Promise<"u"&&(B instanceof Promise||typeof B.then=="function")?(d._playLock=!0,S(),B.then(function(){d._playLock=!1,b._unlocked=!0,u?d._loadQueue():d._emit("play",m._id)}).catch(function(){d._playLock=!1,d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):u||(d._playLock=!1,S(),d._emit("play",m._id)),b.playbackRate=m._rate,b.paused){d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}l!=="__default"||m._loop?d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),E):(d._endTimers[m._id]=function(){d._ended(m),b.removeEventListener("ended",d._endTimers[m._id],!1)},b.addEventListener("ended",d._endTimers[m._id],!1))}catch(H){d._emit("playerror",m._id,H)}};b.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(b.src=d._src,b.load());var F=window&&window.ejecta||!b.readyState&&t._navigator.isCocoonJS;if(b.readyState>=3||F)P();else{d._playLock=!0,d._state="loading";var O=function(){d._state="loaded",P(),b.removeEventListener(t._canPlayEvent,O,!1)};b.addEventListener(t._canPlayEvent,O,!1),d._clearTimer(m._id)}}return m._id},pause:function(l){var u=this;if(u._state!=="loaded"||u._playLock)return u._queue.push({event:"pause",action:function(){u.pause(l)}}),u;for(var d=u._getSoundIds(l),p=0;p<d.length;p++){u._clearTimer(d[p]);var _=u._soundById(d[p]);if(_&&!_._paused&&(_._seek=u.seek(d[p]),_._rateSeek=0,_._paused=!0,u._stopFade(d[p]),_._node))if(u._webAudio){if(!_._node.bufferSource)continue;typeof _._node.bufferSource.stop>"u"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),u._cleanBuffer(_._node)}else(!isNaN(_._node.duration)||_._node.duration===1/0)&&_._node.pause();arguments[1]||u._emit("pause",_?_._id:null)}return u},stop:function(l,u){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(l)}}),d;for(var p=d._getSoundIds(l),_=0;_<p.length;_++){d._clearTimer(p[_]);var g=d._soundById(p[_]);g&&(g._seek=g._start||0,g._rateSeek=0,g._paused=!0,g._ended=!0,d._stopFade(p[_]),g._node&&(d._webAudio?g._node.bufferSource&&(typeof g._node.bufferSource.stop>"u"?g._node.bufferSource.noteOff(0):g._node.bufferSource.stop(0),d._cleanBuffer(g._node)):(!isNaN(g._node.duration)||g._node.duration===1/0)&&(g._node.currentTime=g._start||0,g._node.pause(),g._node.duration===1/0&&d._clearSound(g._node))),u||d._emit("stop",g._id))}return d},mute:function(l,u){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(l,u)}}),d;if(typeof u>"u")if(typeof l=="boolean")d._muted=l;else return d._muted;for(var p=d._getSoundIds(u),_=0;_<p.length;_++){var g=d._soundById(p[_]);g&&(g._muted=l,g._interval&&d._stopFade(g._id),d._webAudio&&g._node?g._node.gain.setValueAtTime(l?0:g._volume,t.ctx.currentTime):g._node&&(g._node.muted=t._muted?!0:l),d._emit("mute",g._id))}return d},volume:function(){var l=this,u=arguments,d,p;if(u.length===0)return l._volume;if(u.length===1||u.length===2&&typeof u[1]>"u"){var _=l._getSoundIds(),g=_.indexOf(u[0]);g>=0?p=parseInt(u[0],10):d=parseFloat(u[0])}else u.length>=2&&(d=parseFloat(u[0]),p=parseInt(u[1],10));var m;if(typeof d<"u"&&d>=0&&d<=1){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"volume",action:function(){l.volume.apply(l,u)}}),l;typeof p>"u"&&(l._volume=d),p=l._getSoundIds(p);for(var x=0;x<p.length;x++)m=l._soundById(p[x]),m&&(m._volume=d,u[2]||l._stopFade(p[x]),l._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(d,t.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=d*t.volume()),l._emit("volume",m._id))}else return m=p?l._soundById(p):l._sounds[0],m?m._volume:0;return l},fade:function(l,u,d,p){var _=this;if(_._state!=="loaded"||_._playLock)return _._queue.push({event:"fade",action:function(){_.fade(l,u,d,p)}}),_;l=Math.min(Math.max(0,parseFloat(l)),1),u=Math.min(Math.max(0,parseFloat(u)),1),d=parseFloat(d),_.volume(l,p);for(var g=_._getSoundIds(p),m=0;m<g.length;m++){var x=_._soundById(g[m]);if(x){if(p||_._stopFade(g[m]),_._webAudio&&!x._muted){var v=t.ctx.currentTime,y=v+d/1e3;x._volume=l,x._node.gain.setValueAtTime(l,v),x._node.gain.linearRampToValueAtTime(u,y)}_._startFadeInterval(x,l,u,d,g[m],typeof p>"u")}}return _},_startFadeInterval:function(l,u,d,p,_,g){var m=this,x=u,v=d-u,y=Math.abs(v/.01),E=Math.max(4,y>0?p/y:p),T=Date.now();l._fadeTo=d,l._interval=setInterval(function(){var R=(Date.now()-T)/p;T=Date.now(),x+=v*R,x=Math.round(x*100)/100,v<0?x=Math.max(d,x):x=Math.min(d,x),m._webAudio?l._volume=x:m.volume(x,l._id,!0),g&&(m._volume=x),(d<u&&x<=d||d>u&&x>=d)&&(clearInterval(l._interval),l._interval=null,l._fadeTo=null,m.volume(d,l._id),m._emit("fade",l._id))},E)},_stopFade:function(l){var u=this,d=u._soundById(l);return d&&d._interval&&(u._webAudio&&d._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(d._interval),d._interval=null,u.volume(d._fadeTo,l),d._fadeTo=null,u._emit("fade",l)),u},loop:function(){var l=this,u=arguments,d,p,_;if(u.length===0)return l._loop;if(u.length===1)if(typeof u[0]=="boolean")d=u[0],l._loop=d;else return _=l._soundById(parseInt(u[0],10)),_?_._loop:!1;else u.length===2&&(d=u[0],p=parseInt(u[1],10));for(var g=l._getSoundIds(p),m=0;m<g.length;m++)_=l._soundById(g[m]),_&&(_._loop=d,l._webAudio&&_._node&&_._node.bufferSource&&(_._node.bufferSource.loop=d,d&&(_._node.bufferSource.loopStart=_._start||0,_._node.bufferSource.loopEnd=_._stop,l.playing(g[m])&&(l.pause(g[m],!0),l.play(g[m],!0)))));return l},rate:function(){var l=this,u=arguments,d,p;if(u.length===0)p=l._sounds[0]._id;else if(u.length===1){var _=l._getSoundIds(),g=_.indexOf(u[0]);g>=0?p=parseInt(u[0],10):d=parseFloat(u[0])}else u.length===2&&(d=parseFloat(u[0]),p=parseInt(u[1],10));var m;if(typeof d=="number"){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"rate",action:function(){l.rate.apply(l,u)}}),l;typeof p>"u"&&(l._rate=d),p=l._getSoundIds(p);for(var x=0;x<p.length;x++)if(m=l._soundById(p[x]),m){l.playing(p[x])&&(m._rateSeek=l.seek(p[x]),m._playStart=l._webAudio?t.ctx.currentTime:m._playStart),m._rate=d,l._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(d,t.ctx.currentTime):m._node&&(m._node.playbackRate=d);var v=l.seek(p[x]),y=(l._sprite[m._sprite][0]+l._sprite[m._sprite][1])/1e3-v,E=y*1e3/Math.abs(m._rate);(l._endTimers[p[x]]||!m._paused)&&(l._clearTimer(p[x]),l._endTimers[p[x]]=setTimeout(l._ended.bind(l,m),E)),l._emit("rate",m._id)}}else return m=l._soundById(p),m?m._rate:l._rate;return l},seek:function(){var l=this,u=arguments,d,p;if(u.length===0)l._sounds.length&&(p=l._sounds[0]._id);else if(u.length===1){var _=l._getSoundIds(),g=_.indexOf(u[0]);g>=0?p=parseInt(u[0],10):l._sounds.length&&(p=l._sounds[0]._id,d=parseFloat(u[0]))}else u.length===2&&(d=parseFloat(u[0]),p=parseInt(u[1],10));if(typeof p>"u")return 0;if(typeof d=="number"&&(l._state!=="loaded"||l._playLock))return l._queue.push({event:"seek",action:function(){l.seek.apply(l,u)}}),l;var m=l._soundById(p);if(m)if(typeof d=="number"&&d>=0){var x=l.playing(p);x&&l.pause(p,!0),m._seek=d,m._ended=!1,l._clearTimer(p),!l._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=d);var v=function(){x&&l.play(p,!0),l._emit("seek",p)};if(x&&!l._webAudio){var y=function(){l._playLock?setTimeout(y,0):v()};setTimeout(y,0)}else v()}else if(l._webAudio){var E=l.playing(p)?t.ctx.currentTime-m._playStart:0,T=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(T+E*Math.abs(m._rate))}else return m._node.currentTime;return l},playing:function(l){var u=this;if(typeof l=="number"){var d=u._soundById(l);return d?!d._paused:!1}for(var p=0;p<u._sounds.length;p++)if(!u._sounds[p]._paused)return!0;return!1},duration:function(l){var u=this,d=u._duration,p=u._soundById(l);return p&&(d=u._sprite[p._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var l=this,u=l._sounds,d=0;d<u.length;d++)u[d]._paused||l.stop(u[d]._id),l._webAudio||(l._clearSound(u[d]._node),u[d]._node.removeEventListener("error",u[d]._errorFn,!1),u[d]._node.removeEventListener(t._canPlayEvent,u[d]._loadFn,!1),u[d]._node.removeEventListener("ended",u[d]._endFn,!1),t._releaseHtml5Audio(u[d]._node)),delete u[d]._node,l._clearTimer(u[d]._id);var p=t._howls.indexOf(l);p>=0&&t._howls.splice(p,1);var _=!0;for(d=0;d<t._howls.length;d++)if(t._howls[d]._src===l._src||l._src.indexOf(t._howls[d]._src)>=0){_=!1;break}return s&&_&&delete s[l._src],t.noAudio=!1,l._state="unloaded",l._sounds=[],l=null,null},on:function(l,u,d,p){var _=this,g=_["_on"+l];return typeof u=="function"&&g.push(p?{id:d,fn:u,once:p}:{id:d,fn:u}),_},off:function(l,u,d){var p=this,_=p["_on"+l],g=0;if(typeof u=="number"&&(d=u,u=null),u||d)for(g=0;g<_.length;g++){var m=d===_[g].id;if(u===_[g].fn&&m||!u&&m){_.splice(g,1);break}}else if(l)p["_on"+l]=[];else{var x=Object.keys(p);for(g=0;g<x.length;g++)x[g].indexOf("_on")===0&&Array.isArray(p[x[g]])&&(p[x[g]]=[])}return p},once:function(l,u,d){var p=this;return p.on(l,u,d,1),p},_emit:function(l,u,d){for(var p=this,_=p["_on"+l],g=_.length-1;g>=0;g--)(!_[g].id||_[g].id===u||l==="load")&&(setTimeout((function(m){m.call(this,u,d)}).bind(p,_[g].fn),0),_[g].once&&p.off(l,_[g].fn,_[g].id));return p._loadQueue(l),p},_loadQueue:function(l){var u=this;if(u._queue.length>0){var d=u._queue[0];d.event===l&&(u._queue.shift(),u._loadQueue()),l||d.action()}return u},_ended:function(l){var u=this,d=l._sprite;if(!u._webAudio&&l._node&&!l._node.paused&&!l._node.ended&&l._node.currentTime<l._stop)return setTimeout(u._ended.bind(u,l),100),u;var p=!!(l._loop||u._sprite[d][2]);if(u._emit("end",l._id),!u._webAudio&&p&&u.stop(l._id,!0).play(l._id),u._webAudio&&p){u._emit("play",l._id),l._seek=l._start||0,l._rateSeek=0,l._playStart=t.ctx.currentTime;var _=(l._stop-l._start)*1e3/Math.abs(l._rate);u._endTimers[l._id]=setTimeout(u._ended.bind(u,l),_)}return u._webAudio&&!p&&(l._paused=!0,l._ended=!0,l._seek=l._start||0,l._rateSeek=0,u._clearTimer(l._id),u._cleanBuffer(l._node),t._autoSuspend()),!u._webAudio&&!p&&u.stop(l._id,!0),u},_clearTimer:function(l){var u=this;if(u._endTimers[l]){if(typeof u._endTimers[l]!="function")clearTimeout(u._endTimers[l]);else{var d=u._soundById(l);d&&d._node&&d._node.removeEventListener("ended",u._endTimers[l],!1)}delete u._endTimers[l]}return u},_soundById:function(l){for(var u=this,d=0;d<u._sounds.length;d++)if(l===u._sounds[d]._id)return u._sounds[d];return null},_inactiveSound:function(){var l=this;l._drain();for(var u=0;u<l._sounds.length;u++)if(l._sounds[u]._ended)return l._sounds[u].reset();return new i(l)},_drain:function(){var l=this,u=l._pool,d=0,p=0;if(!(l._sounds.length<u)){for(p=0;p<l._sounds.length;p++)l._sounds[p]._ended&&d++;for(p=l._sounds.length-1;p>=0;p--){if(d<=u)return;l._sounds[p]._ended&&(l._webAudio&&l._sounds[p]._node&&l._sounds[p]._node.disconnect(0),l._sounds.splice(p,1),d--)}}},_getSoundIds:function(l){var u=this;if(typeof l>"u"){for(var d=[],p=0;p<u._sounds.length;p++)d.push(u._sounds[p]._id);return d}else return[l]},_refreshBuffer:function(l){var u=this;return l._node.bufferSource=t.ctx.createBufferSource(),l._node.bufferSource.buffer=s[u._src],l._panner?l._node.bufferSource.connect(l._panner):l._node.bufferSource.connect(l._node),l._node.bufferSource.loop=l._loop,l._loop&&(l._node.bufferSource.loopStart=l._start||0,l._node.bufferSource.loopEnd=l._stop||0),l._node.bufferSource.playbackRate.setValueAtTime(l._rate,t.ctx.currentTime),u},_cleanBuffer:function(l){var u=this,d=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!l.bufferSource)return u;if(t._scratchBuffer&&l.bufferSource&&(l.bufferSource.onended=null,l.bufferSource.disconnect(0),d))try{l.bufferSource.buffer=t._scratchBuffer}catch{}return l.bufferSource=null,u},_clearSound:function(l){var u=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);u||(l.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(l){this._parent=l,this.init()};i.prototype={init:function(){var l=this,u=l._parent;return l._muted=u._muted,l._loop=u._loop,l._volume=u._volume,l._rate=u._rate,l._seek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++t._counter,u._sounds.push(l),l.create(),l},create:function(){var l=this,u=l._parent,d=t._muted||l._muted||l._parent._muted?0:l._volume;return u._webAudio?(l._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),l._node.gain.setValueAtTime(d,t.ctx.currentTime),l._node.paused=!0,l._node.connect(t.masterGain)):t.noAudio||(l._node=t._obtainHtml5Audio(),l._errorFn=l._errorListener.bind(l),l._node.addEventListener("error",l._errorFn,!1),l._loadFn=l._loadListener.bind(l),l._node.addEventListener(t._canPlayEvent,l._loadFn,!1),l._endFn=l._endListener.bind(l),l._node.addEventListener("ended",l._endFn,!1),l._node.src=u._src,l._node.preload=u._preload===!0?"auto":u._preload,l._node.volume=d*t.volume(),l._node.load()),l},reset:function(){var l=this,u=l._parent;return l._muted=u._muted,l._loop=u._loop,l._volume=u._volume,l._rate=u._rate,l._seek=0,l._rateSeek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++t._counter,l},_errorListener:function(){var l=this;l._parent._emit("loaderror",l._id,l._node.error?l._node.error.code:0),l._node.removeEventListener("error",l._errorFn,!1)},_loadListener:function(){var l=this,u=l._parent;u._duration=Math.ceil(l._node.duration*10)/10,Object.keys(u._sprite).length===0&&(u._sprite={__default:[0,u._duration*1e3]}),u._state!=="loaded"&&(u._state="loaded",u._emit("load"),u._loadQueue()),l._node.removeEventListener(t._canPlayEvent,l._loadFn,!1)},_endListener:function(){var l=this,u=l._parent;u._duration===1/0&&(u._duration=Math.ceil(l._node.duration*10)/10,u._sprite.__default[1]===1/0&&(u._sprite.__default[1]=u._duration*1e3),u._ended(l)),l._node.removeEventListener("ended",l._endFn,!1)}};var s={},o=function(l){var u=l._src;if(s[u]){l._duration=s[u].duration,h(l);return}if(/^data:[^;]+;base64,/.test(u)){for(var d=atob(u.split(",")[1]),p=new Uint8Array(d.length),_=0;_<d.length;++_)p[_]=d.charCodeAt(_);c(p.buffer,l)}else{var g=new XMLHttpRequest;g.open(l._xhr.method,u,!0),g.withCredentials=l._xhr.withCredentials,g.responseType="arraybuffer",l._xhr.headers&&Object.keys(l._xhr.headers).forEach(function(m){g.setRequestHeader(m,l._xhr.headers[m])}),g.onload=function(){var m=(g.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){l._emit("loaderror",null,"Failed loading audio file with status: "+g.status+".");return}c(g.response,l)},g.onerror=function(){l._webAudio&&(l._html5=!0,l._webAudio=!1,l._sounds=[],delete s[u],l.load())},a(g)}},a=function(l){try{l.send()}catch{l.onerror()}},c=function(l,u){var d=function(){u._emit("loaderror",null,"Decoding audio data failed.")},p=function(_){_&&u._sounds.length>0?(s[u._src]=_,h(u,_)):d()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(l).then(p).catch(d):t.ctx.decodeAudioData(l,p,d)},h=function(l,u){u&&!l._duration&&(l._duration=u.duration),Object.keys(l._sprite).length===0&&(l._sprite={__default:[0,l._duration*1e3]}),l._state!=="loaded"&&(l._state="loaded",l._emit("load"),l._loadQueue())},f=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var l=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),u=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=u?parseInt(u[1],10):null;if(l&&d&&d<9){var p=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!p&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};r.Howler=t,r.Howl=n,typeof Cs<"u"?(Cs.HowlerGlobal=e,Cs.Howler=t,Cs.Howl=n,Cs.Sound=i):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=n,window.Sound=i)})();(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(t);return n},HowlerGlobal.prototype.pos=function(t,n,i){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(n=typeof n!="number"?s._pos[1]:n,i=typeof i!="number"?s._pos[2]:i,typeof t=="number")s._pos=[t,n,i],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,n,i,s,o,a){var c=this;if(!c.ctx||!c.ctx.listener)return c;var h=c._orientation;if(n=typeof n!="number"?h[1]:n,i=typeof i!="number"?h[2]:i,s=typeof s!="number"?h[3]:s,o=typeof o!="number"?h[4]:o,a=typeof a!="number"?h[5]:a,typeof t=="number")c._orientation=[t,n,i,s,o,a],typeof c.ctx.listener.forwardX<"u"?(c.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),c.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),c.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),c.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),c.ctx.listener.upY.setTargetAtTime(o,Howler.ctx.currentTime,.1),c.ctx.listener.upZ.setTargetAtTime(a,Howler.ctx.currentTime,.1)):c.ctx.listener.setOrientation(t,n,i,s,o,a);else return h;return c},Howl.prototype.init=(function(t){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle<"u"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle<"u"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain<"u"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel<"u"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance<"u"?n.maxDistance:1e4,panningModel:typeof n.panningModel<"u"?n.panningModel:"HRTF",refDistance:typeof n.refDistance<"u"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor<"u"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],t.call(this,n)}})(Howl.prototype.init),Howl.prototype.stereo=function(t,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(t,n)}}),i;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof n>"u")if(typeof t=="number")i._stereo=t,i._pos=[t,0,0];else return i._stereo;for(var o=i._getSoundIds(n),a=0;a<o.length;a++){var c=i._soundById(o[a]);if(c)if(typeof t=="number")c._stereo=t,c._pos=[t,0,0],c._node&&(c._pannerAttr.panningModel="equalpower",(!c._panner||!c._panner.pan)&&e(c,s),s==="spatial"?typeof c._panner.positionX<"u"?(c._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),c._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),c._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):c._panner.setPosition(t,0,0):c._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),i._emit("stereo",c._id);else return c._stereo}return i},Howl.prototype.pos=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"pos",action:function(){o.pos(t,n,i,s)}}),o;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof s>"u")if(typeof t=="number")o._pos=[t,n,i];else return o._pos;for(var a=o._getSoundIds(s),c=0;c<a.length;c++){var h=o._soundById(a[c]);if(h)if(typeof t=="number")h._pos=[t,n,i],h._node&&((!h._panner||h._panner.pan)&&e(h,"spatial"),typeof h._panner.positionX<"u"?(h._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),h._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):h._panner.setPosition(t,n,i)),o._emit("pos",h._id);else return h._pos}return o},Howl.prototype.orientation=function(t,n,i,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"orientation",action:function(){o.orientation(t,n,i,s)}}),o;if(n=typeof n!="number"?o._orientation[1]:n,i=typeof i!="number"?o._orientation[2]:i,typeof s>"u")if(typeof t=="number")o._orientation=[t,n,i];else return o._orientation;for(var a=o._getSoundIds(s),c=0;c<a.length;c++){var h=o._soundById(a[c]);if(h)if(typeof t=="number")h._orientation=[t,n,i],h._node&&(h._panner||(h._pos||(h._pos=o._pos||[0,0,-.5]),e(h,"spatial")),typeof h._panner.orientationX<"u"?(h._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),h._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),h._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):h._panner.setOrientation(t,n,i)),o._emit("orientation",h._id);else return h._orientation}return o},Howl.prototype.pannerAttr=function(){var t=this,n=arguments,i,s,o;if(!t._webAudio)return t;if(n.length===0)return t._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof s>"u"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),t._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle<"u"?i.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle<"u"?i.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain<"u"?i.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel<"u"?i.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance<"u"?i.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof i.pannerAttr.refDistance<"u"?i.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor<"u"?i.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel<"u"?i.pannerAttr.panningModel:t._panningModel});else return o=t._soundById(parseInt(n[0],10)),o?o._pannerAttr:t._pannerAttr;else n.length===2&&(i=n[0],s=parseInt(n[1],10));for(var a=t._getSoundIds(s),c=0;c<a.length;c++)if(o=t._soundById(a[c]),o){var h=o._pannerAttr;h={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:h.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:h.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:h.coneOuterGain,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:h.distanceModel,maxDistance:typeof i.maxDistance<"u"?i.maxDistance:h.maxDistance,refDistance:typeof i.refDistance<"u"?i.refDistance:h.refDistance,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:h.rolloffFactor,panningModel:typeof i.panningModel<"u"?i.panningModel:h.panningModel};var f=o._panner;f||(o._pos||(o._pos=t._pos||[0,0,-.5]),e(o,"spatial"),f=o._panner),f.coneInnerAngle=h.coneInnerAngle,f.coneOuterAngle=h.coneOuterAngle,f.coneOuterGain=h.coneOuterGain,f.distanceModel=h.distanceModel,f.maxDistance=h.maxDistance,f.refDistance=h.refDistance,f.rolloffFactor=h.rolloffFactor,f.panningModel=h.panningModel}return t},Sound.prototype.init=(function(t){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,t.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}})(Sound.prototype.init),Sound.prototype.reset=(function(t){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),t.call(this)}})(Sound.prototype.reset);var e=function(t,n){n=n||"spatial",n==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(ta)),ta}var Nh=Kx();class Zx{constructor(){this.context=null,this.master=null,this.engineOsc=null,this.engineSubOsc=null,this.enginePulseOsc=null,this.engineGain=null,this.engineSubGain=null,this.enginePulseGain=null,this.engineNoise=null,this.engineNoiseGain=null,this.engineFilter=null,this.engineSubFilter=null,this.windOsc=null,this.windGain=null,this.muted=localStorage.getItem("portfolio-drive-muted")==="1",this.impactsPlayed=0,this.zoneStingersPlayed=0}async init(){if(this.context)return;const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.context=new e,this.master=this.context.createGain(),this.master.gain.value=this.muted?0:.35,this.master.connect(this.context.destination),this.engineOsc=this.context.createOscillator(),this.engineOsc.type="sawtooth",this.engineSubOsc=this.context.createOscillator(),this.engineSubOsc.type="square",this.enginePulseOsc=this.context.createOscillator(),this.enginePulseOsc.type="triangle",this.engineGain=this.context.createGain(),this.engineSubGain=this.context.createGain(),this.enginePulseGain=this.context.createGain(),this.engineNoiseGain=this.context.createGain(),this.engineGain.gain.value=1e-4,this.engineSubGain.gain.value=1e-4,this.enginePulseGain.gain.value=1e-4,this.engineNoiseGain.gain.value=1e-4,this.engineFilter=this.context.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=340,this.engineFilter.Q.value=.85,this.engineSubFilter=this.context.createBiquadFilter(),this.engineSubFilter.type="lowpass",this.engineSubFilter.frequency.value=96;const t=this.context.createBiquadFilter();t.type="bandpass",t.frequency.value=68,t.Q.value=1.4;const n=this.context.createWaveShaper();n.curve=Jx(58),n.oversample="2x",this.engineOsc.connect(this.engineFilter),this.engineFilter.connect(n),n.connect(this.engineGain),this.engineGain.connect(this.master),this.engineSubOsc.connect(this.engineSubFilter),this.engineSubFilter.connect(this.engineSubGain),this.engineSubGain.connect(this.master),this.enginePulseOsc.connect(t),t.connect(this.enginePulseGain),this.enginePulseGain.connect(this.master),this.engineNoise=this.context.createBufferSource(),this.engineNoise.buffer=Qx(this.context),this.engineNoise.loop=!0;const i=this.context.createBiquadFilter();i.type="bandpass",i.frequency.value=290,i.Q.value=.85,this.engineNoise.connect(i),i.connect(this.engineNoiseGain),this.engineNoiseGain.connect(this.master),this.engineOsc.start(),this.engineSubOsc.start(),this.enginePulseOsc.start(),this.engineNoise.start(),this.windOsc=this.context.createOscillator(),this.windOsc.type="triangle",this.windGain=this.context.createGain(),this.windGain.gain.value=.012;const s=this.context.createBiquadFilter();s.type="highpass",s.frequency.value=180,this.windOsc.connect(s),s.connect(this.windGain),this.windGain.connect(this.master),this.windOsc.frequency.value=84,this.windOsc.start()}resume(){this.init(),Nh.Howler.mute(this.muted),this.context?.state==="suspended"&&this.context.resume()}toggleMute(){return this.muted=!this.muted,localStorage.setItem("portfolio-drive-muted",this.muted?"1":"0"),Nh.Howler.mute(this.muted),this.master&&this.master.gain.setTargetAtTime(this.muted?0:.35,this.context.currentTime,.04),this.muted}click(e=520){if(!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="triangle",t.frequency.value=e,n.gain.value=.001,t.connect(n),n.connect(this.master),n.gain.setValueAtTime(.001,this.context.currentTime),n.gain.exponentialRampToValueAtTime(.08,this.context.currentTime+.01),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.15),t.start(),t.stop(this.context.currentTime+.17)}impact(e=1){if(this.impactsPlayed+=1,!this.context||this.muted)return;const t=this.context.createOscillator(),n=this.context.createGain();t.type="square",t.frequency.value=90+Math.random()*30,n.gain.value=Math.min(.1,.03*e),t.connect(n),n.connect(this.master),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.12),t.start(),t.stop(this.context.currentTime+.14)}zoneStinger(e={}){if(this.zoneStingersPlayed+=1,!this.context||this.muted)return;const t=jx(e.id||e.name||"zone");this.sweep(t*.62,t*1.34,.26,.032);const n=this.context.createOscillator(),i=this.context.createGain(),s=this.context.createBiquadFilter();n.type="triangle",s.type="lowpass",s.frequency.value=t*2.4,n.frequency.setValueAtTime(t*1.5,this.context.currentTime),n.frequency.exponentialRampToValueAtTime(t*.92,this.context.currentTime+.18),i.gain.setValueAtTime(.001,this.context.currentTime),i.gain.exponentialRampToValueAtTime(.048,this.context.currentTime+.025),i.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.2),n.connect(s),s.connect(i),i.connect(this.master),n.start(),n.stop(this.context.currentTime+.22)}sweep(e=220,t=880,n=.32,i=.06){if(!this.context||this.muted)return;const s=this.context.createOscillator(),o=this.context.createGain(),a=this.context.createBiquadFilter();s.type="sawtooth",a.type="bandpass",a.frequency.value=Math.max(e,t),a.Q.value=2.2,s.frequency.setValueAtTime(e,this.context.currentTime),s.frequency.exponentialRampToValueAtTime(Math.max(1,t),this.context.currentTime+n),o.gain.setValueAtTime(.001,this.context.currentTime),o.gain.exponentialRampToValueAtTime(i,this.context.currentTime+.035),o.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+n),s.connect(a),a.connect(o),o.connect(this.master),s.start(),s.stop(this.context.currentTime+n+.02)}update(e,t={}){if(!this.context||!this.engineOsc||!this.engineGain)return;const n=Math.min(1,Math.abs(e)/70),i=Math.min(1,Math.abs(t.throttle??0)),s=t.boost?1:0,o=t.burnout?1:0,a=t.wheelie?1:0,c=t.slip??0,h=t.surface||"road",f=["grass","sand","shore"].includes(h)?1:0,l=h==="water"?1:0,u=Math.sin(this.context.currentTime*(18+n*28))*(2+n*5);this.engineOsc.frequency.setTargetAtTime(38+n*176+i*56+s*38+o*58+a*18+u,this.context.currentTime,.055),this.engineGain.gain.setTargetAtTime(this.muted?0:.04+n*.095+i*.034+s*.026+o*.04,this.context.currentTime,.075),this.engineFilter?.frequency.setTargetAtTime(220+n*760+i*230+s*280+o*240,this.context.currentTime,.12),this.engineSubOsc&&this.engineSubGain&&(this.engineSubOsc.frequency.setTargetAtTime(23+n*52+i*10+o*7,this.context.currentTime,.08),this.engineSubGain.gain.setTargetAtTime(this.muted?0:.027+n*.05+i*.018+o*.022,this.context.currentTime,.12)),this.enginePulseOsc&&this.enginePulseGain&&(this.enginePulseOsc.frequency.setTargetAtTime(15+n*35+s*16+o*12,this.context.currentTime,.1),this.enginePulseGain.gain.setTargetAtTime(this.muted?0:.013+n*.028+s*.018+o*.018,this.context.currentTime,.1)),this.engineNoiseGain&&this.engineNoiseGain.gain.setTargetAtTime(this.muted?0:.006+n*.019+c*.09+s*.026+o*.07+f*n*.026+l*.035,this.context.currentTime,.08),this.windGain&&this.windGain.gain.setTargetAtTime(this.muted?0:.008+n*.025,this.context.currentTime,.2)}}function jx(r){let e=0;for(let t=0;t<r.length;t+=1)e=(e*31+r.charCodeAt(t))%997;return 260+e%8*48}function Jx(r){const t=new Float32Array(44100),n=Math.PI/180;for(let i=0;i<44100;i+=1){const s=i*2/44100-1;t[i]=(3+r)*s*20*n/(Math.PI+r*Math.abs(s))}return t}function Qx(r){const e=r.sampleRate*2,t=r.createBuffer(1,e,r.sampleRate),n=t.getChannelData(0);let i=0;for(let s=0;s<e;s+=1){const o=Math.random()*2-1;i=i*.92+o*.08,n[s]=i*.55}return t}const Yt=190,Rn=24,xt=158,ev=[],Hu=[{id:"start-plaza",label:"Launch Plaza",center:[0,28],size:[50,38],color:"#7cffb2",kind:"plaza"},{id:"fcc-campus",label:"FCC Education Grove",center:[-78,82],size:[58,48],color:"#9ccfff",kind:"campus"},{id:"security-campus",label:"Security Lab",center:[-94,-66],size:[56,44],color:"#68d8ff",kind:"security"},{id:"project-yard",label:"Projects Yard",center:[62,56],size:[44,36],color:"#ffcc66",kind:"workshop"},{id:"ridge",label:"Sentinel Ridge",center:[16,112],size:[46,34],color:"#ff6d8d",kind:"tower"},{id:"archive",label:"Archive Steps",center:[-44,72],size:[36,30],color:"#ffdf8a",kind:"archive"},{id:"south-loop",label:"Stunt And CV Run",center:[58,-82],size:[82,46],color:"#ff9b6d",kind:"driving"},{id:"west-trail",label:"Skills And Farm Trail",center:[-58,-104],size:[62,46],color:"#92ffea",kind:"trail"},{id:"harbor",label:"Signal Harbor",center:[126,46],size:[36,38],color:"#78b7ff",kind:"harbor"},{id:"data-pier",label:"Data Pier",center:[-126,66],size:[32,34],color:"#79ffc5",kind:"pier"}],na=[{id:"start-gardens",center:[0,28],size:[68,52],kind:"garden"},{id:"fcc-tree-walk",center:[-78,82],size:[72,56],kind:"campus"},{id:"security-pines",center:[-94,-66],size:[62,50],kind:"security"},{id:"project-grove",center:[62,56],size:[54,42],kind:"garden"},{id:"north-ridge",center:[16,112],size:[58,34],kind:"grove"},{id:"archive-sakura",center:[-44,72],size:[38,34],kind:"grove"},{id:"harbor-palms",center:[126,46],size:[34,44],kind:"coast"},{id:"south-oaks",center:[48,-96],size:[82,44],kind:"meadow"},{id:"farm-pocket",center:[-48,-132],size:[44,26],kind:"farm"},{id:"skills-cypress",center:[-62,-84],size:[44,38],kind:"security"},{id:"west-beach",center:[-136,-12],size:[34,72],kind:"coast"}],tv=[{id:"start-meadow-light",center:[-12,34],size:[72,46],rotation:-.12,material:"meadowLight"},{id:"start-shadow-pocket",center:[32,26],size:[40,22],rotation:.18,material:"meadowDark"},{id:"fcc-lawn",center:[-78,73],size:[78,34],rotation:-.08,material:"meadowLight"},{id:"fcc-flower-walk",center:[-58,94],size:[38,16],rotation:.35,material:"flowerField"},{id:"security-dark-pad",center:[-96,-58],size:[66,40],rotation:-.2,material:"meadowDark"},{id:"security-blue-grit",center:[-112,-34],size:[30,18],rotation:.48,material:"wildflowerBlue"},{id:"project-yard-dust",center:[62,48],size:[52,34],rotation:-.36,material:"warmStone"},{id:"sentinel-ridge-grass",center:[18,108],size:[54,22],rotation:.24,material:"meadowLight"},{id:"south-stunt-rubber",center:[86,-86],size:[78,36],rotation:.08,material:"meadowDark"},{id:"farm-gold-field",center:[-50,-126],size:[54,30],rotation:-.16,material:"warmStone"},{id:"harbor-sand-apron",center:[126,52],size:[42,34],rotation:-.18,material:"sand"},{id:"west-data-beach",center:[-132,60],size:[36,32],rotation:.42,material:"sand"}],Ql=[{id:"gallery-spine",name:"Gallery Spine",width:7.4,hierarchy:"avenue",closed:!1,points:[[-118,42],[-78,40],[-36,30],[0,24],[42,34],[84,48],[126,34]]},{id:"fcc-walk",name:"FCC Walk",width:5.4,hierarchy:"plaza",closed:!1,points:[[-36,30],[-52,52],[-64,74],[-54,94]]},{id:"security-run",name:"Scanner Run",width:5.8,hierarchy:"security",closed:!1,points:[[0,24],[-28,4],[-64,-12],[-96,-34],[-120,-58]]},{id:"cv-run",name:"Document Run",width:5.8,hierarchy:"street",closed:!1,points:[[0,24],[18,-10],[34,-42],[52,-72],[76,-96]]},{id:"stunt-causeway",name:"Stunt Causeway",width:6.6,hierarchy:"stunt",closed:!1,points:[[76,-96],[104,-94],[132,-70]]},{id:"farm-track",name:"Farm Track",width:5.2,hierarchy:"dirt",closed:!1,points:[[18,-118],[-22,-128],[-62,-118],[-98,-92],[-120,-58]]},{id:"sentinel-ridge",name:"Sentinel Ridge",width:5.2,hierarchy:"street",closed:!1,points:[[-36,30],[-18,66],[10,94],[38,116]]},{id:"career-link",name:"Career Link",width:5.2,hierarchy:"street",closed:!1,points:[[42,34],[68,8],[92,-18],[116,-22],[126,34]]},{id:"harbor-link",name:"Harbor Link",width:5,hierarchy:"street",closed:!1,points:[[84,48],[112,66],[130,76]]},{id:"data-pier",name:"Data Pier",width:4.8,hierarchy:"bridge",closed:!1,points:[[-118,42],[-132,50],[-138,62]]},{id:"behind-spur",name:"Build Spur",width:5.2,hierarchy:"street",closed:!1,points:[[34,-42],[10,-76],[-4,-104],[18,-118]]},{id:"awards-link",name:"Archive Steps",width:4.8,hierarchy:"plaza",closed:!1,points:[[-36,30],[-28,58],[-24,82]]}],_l=Ql.flatMap(r=>rv(r)),nv=[{id:"scanner-boost",position:[-64,0,-12],rotation:-2.17,color:"#68d8ff",district:"security"},{id:"document-run-boost",position:[22,0,-18],rotation:2.68,color:"#7cffb2",district:"cv"},{id:"stunt-yard-boost",position:[72,0,-96],rotation:Math.PI/2,color:"#ff9b6d",district:"stunt"}],Qn=[{id:"landing",name:"Launch Plaza",kind:"Home",position:[0,0,42],rotation:.18,radius:10,color:"#7cffb2",shape:"hub",dialogueId:"0",achievement:"first_stop",actions:[{label:"Main Portfolio",href:"../index.html"},{label:"Projects",href:"../projects.html"}]},{id:"security",name:"Security Lab Gate",kind:"Offensive Security",position:[-94,0,-66],rotation:-.28,radius:10,color:"#68d8ff",shape:"lab",dialogueId:"1",achievement:"security_lab",scanRequired:!0,actions:[{label:"CV",href:"../cv.html"},{label:"Cyber Sentinel",href:"../cyber-sentinel.html"}]},{id:"projects",name:"Projects Yard",kind:"Project Gallery",position:[62,0,56],rotation:-.44,radius:10,color:"#ffcc66",shape:"foundry",achievement:"projects_foundry",projectGallery:!0,actions:[{label:"Projects Page",href:"../projects.html"}]},{id:"sentinel",name:"Cyber Sentinel Ridge",kind:"Final Year Project",position:[16,0,112],rotation:-.12,radius:12,color:"#ff6d8d",shape:"tower",dialogueId:"3",achievement:"cyber_sentinel",actions:[{label:"Read Blog",href:"../cyber-sentinel.html"}]},{id:"career",name:"Career Signal Office",kind:"Experience",position:[96,0,-40],rotation:-.24,radius:10,color:"#b6a0ff",shape:"office",dialogueId:"5",achievement:"career_office",actions:[{label:"CV",href:"../cv.html"}]},{id:"skills",name:"Skills Terminal",kind:"Stack",position:[-62,0,-84],rotation:.24,radius:9,color:"#92ffea",shape:"terminal",dialogueId:"2",achievement:"skills_terminal",actions:[{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"}]},{id:"education",name:"FCC Education Grove",kind:"Academics",position:[-78,0,82],rotation:-.08,radius:11,color:"#9ccfff",shape:"library",dialogueId:"6",achievement:"education_library",actions:[{label:"CV",href:"../cv.html"}]},{id:"awards",name:"Archive Steps",kind:"Certificates",position:[-44,0,72],rotation:-.18,radius:8,color:"#ffdf8a",shape:"trophy",dialogueId:"7",achievement:"awards_tower",actions:[{label:"CV",href:"../cv.html"}]},{id:"cv",name:"CV Vault",kind:"Resume",position:[8,0,-58],rotation:.12,radius:8,color:"#e6f3ff",shape:"vault",achievement:"cv_vault",lines:["Resume archive, project record, certificates, skills, awards, and downloadable PDFs.","Open the document-first version for the full professional profile."],actions:[{label:"Open CV Page",href:"../cv.html"},{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"},{label:"Cyber CV PDF",href:"../Abdullah-Mehtab-CV-Cyber-v2.pdf"}]},{id:"todo",name:"Todo Board",kind:"Blog / List",position:[-82,0,14],rotation:.34,radius:8,color:"#d8ff92",shape:"board",achievement:"todo_board",lines:["The never-ending list keeps active tasks, experiments, reminders, and ideas visible.","A lightweight log for work that is being tested, refined, or revisited."],actions:[{label:"Open Todo",href:"../todo.html"}]},{id:"circuit",name:"Circuit Gate",kind:"Time Trial",position:[56,0,100],rotation:-.28,radius:9,color:"#ff9b6d",shape:"gate",achievement:"circuit_gate",lines:["This gate starts the island loop circuit.","Follow the checkpoints around the coast and return clean."],startsCircuit:!0},{id:"contact",name:"Signal Harbor",kind:"Links",position:[128,0,56],rotation:-.34,radius:8,color:"#78b7ff",shape:"post",dialogueId:"8",achievement:"contact_port",actions:[{label:"GitHub",href:"https://github.com/Abdullah-Mehtab"},{label:"LinkedIn",href:"https://linkedin.com/in/abdullah-mehtab"},{label:"Email",href:"mailto:abdullahmehtab666@gmail.com"}]},{id:"behind",name:"Behind The Build",kind:"Stack",position:[-18,0,-96],rotation:.08,radius:8,color:"#a8a6ff",shape:"portal",achievement:"behind_build",lines:["Engine room: Three.js visuals, Rapier physics, local resume data, and Supabase-backed counters.","The repository link opens the source behind the drive world."],actions:[{label:"Repository",href:"https://github.com/Abdullah-Mehtab/Abdullah-Mehtab"}]},{id:"drift",name:"Stunt Yard",kind:"Driving",position:[106,0,-72],rotation:-.48,radius:11,color:"#ff9b6d",shape:"rampyard",achievement:"ramp_yard",lines:["A dedicated driving yard for ramps, boosters, handbrake turns, and clean landings."]},{id:"data-pier",name:"Data Pier",kind:"Visitor Trail",position:[-126,0,66],rotation:.68,radius:9,color:"#79ffc5",shape:"pier",achievement:"data_pier",lines:["Signal pier for page views, zone visits, and interaction counts.","Visitor signals are stored as hashed analytics events."]},{id:"potato",name:"Potato Farm",kind:"Farm Counter",position:[-48,0,-132],rotation:.18,radius:10,color:"#c79b56",shape:"farm",achievement:"potato_farm",lines:["Voxel potato patch beside the farm track.","Press P nearby, or use the summon button, to grow one temporary potato and increment the farm counter."],potatoFarm:!0}],iv=[["first_stop","First Stop","Interact with the Start Hub."],["security_lab","Security Pass","Open the Security Lab."],["security_scan","Security Scan","Complete the scanner gate sequence."],["projects_foundry","Project Heat","Open the Projects Foundry."],["cyber_sentinel","Sentinel Signal","Visit Cyber Sentinel Tower."],["career_office","Work Log","Open the Career Office."],["skills_terminal","Stack Trace","Open the Skills Terminal."],["education_library","Academic Archive","Open the Education Library."],["awards_tower","Trophy Case","Open the Awards Tower."],["cv_vault","Formal Mode","Open the CV Vault."],["todo_board","Still Building","Open the Todo Board."],["circuit_gate","Track Curious","Start the circuit gate."],["contact_port","Signal Sent","Open the Contact Port."],["behind_build","Look Under The Hood","Open Behind The Build."],["ramp_yard","Ramp Yard","Visit the driving yard."],["data_pier","Data Pier","Visit the data pier."],["potato_farm","Potato Patch","Visit the potato farm."],["potato_summon","Potato Summoner","Summon a blocky potato."],["boost","Boosted","Use boost while driving."],["boost_pad","Pad Launched","Hit a boost pad."],["jump","Suspension Check","Jump the car."],["ramp_jump","Clean Air","Launch from a ramp."],["data_shards","Signal Collector","Collect every floating data shard."],["distance_1km","One Kilometer","Drive at least 1 km."],["all_zones","Full Tour","Interact with every portfolio zone."]],sv=[[56,0,100],[16,0,112],[-24,0,82],[-78,0,82],[-118,0,42],[-120,0,-58],[-62,0,-118],[18,0,-118],[76,0,-96],[132,0,-70],[126,0,34],[84,0,48],[56,0,100]];function rv(r){const e=r.points,t=[],n=r.closed?e.length:e.length-1;for(let i=0;i<n;i+=1){const s=e[i],o=e[(i+1)%e.length],a=o[0]-s[0],c=o[1]-s[1],h=Math.hypot(a,c);t.push([(s[0]+o[0])/2,(s[1]+o[1])/2,r.width,h+r.width*.64,Math.atan2(a,c)])}return t}const Fh="portfolio-drive-achievements";class ov{constructor(){this.definitions=iv.map(([e,t,n])=>({id:e,title:t,description:n})),this.unlocked=new Set(this.read()),this.zoneUnlocks=new Set,this.distance=Number(localStorage.getItem("portfolio-drive-distance")||0),this.onUnlock=null}read(){try{const e=JSON.parse(localStorage.getItem(Fh)||"[]");return Array.isArray(e)?e:[]}catch{return[]}}save(){localStorage.setItem(Fh,JSON.stringify([...this.unlocked])),localStorage.setItem("portfolio-drive-distance",String(Math.round(this.distance)))}unlock(e){if(this.unlocked.has(e))return!1;this.unlocked.add(e),this.save();const t=this.definitions.find(n=>n.id===e);return this.onUnlock?.(t||{id:e,title:e,description:""}),!0}visitZone(e){if(!e?.achievement)return;this.zoneUnlocks.add(e.achievement),this.unlock(e.achievement),this.definitions.map(i=>i.id).filter(i=>!["boost","boost_pad","jump","ramp_jump","data_shards","potato_summon","distance_1km","all_zones"].includes(i)).every(i=>this.unlocked.has(i)||this.zoneUnlocks.has(i))&&this.unlock("all_zones")}addDistance(e){!Number.isFinite(e)||e<=0||(this.distance+=e,this.distance>=1e3&&this.unlock("distance_1km"),this.save())}reset(){this.unlocked.clear(),this.zoneUnlocks.clear(),this.distance=0,this.save()}getProgress(){return{unlocked:this.unlocked.size,total:this.definitions.length,distance:this.distance}}}const Uh="portfolio-drive-visitor-id",av=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;class lv{constructor(){this.isEnabled=!!(ia()&&sa()),this.visitorId=cv(),this.fingerprintHash="",this.potatoCount=null,this.zoneVisits=new Set}get potatoCountLabel(){return Number.isFinite(this.potatoCount)?String(this.potatoCount):"--"}async init(){if(!this.isEnabled)return;this.fingerprintHash=await hv(),this.record("page_view",{sourceToken:"drive_world"});const e=await this.fetchPotatoCount();Number.isFinite(e)&&(this.potatoCount=e)}recordZone(e){!e||this.zoneVisits.has(e)||(this.zoneVisits.add(e),this.record("play_zone_visit",{sourceToken:e}))}async recordPotatoSummon(){const e=await this.record("potato_summon",{sourceToken:"potato_farm",wantsCount:!0});return Number.isFinite(e?.potato_count)?this.potatoCount=e.potato_count:Number.isFinite(this.potatoCount)&&(this.potatoCount+=1),this.potatoCount}async fetchPotatoCount(){if(!this.isEnabled)return null;const e=ia(),t=sa();if(!e||!t)return null;try{const n=new URL(e);n.searchParams.set("page_slug","play"),n.searchParams.set("event_type","potato_summon_count");const i=await fetch(n,{headers:{apikey:t,authorization:`Bearer ${t}`}});if(!i.ok)return null;const s=await i.json();return Number(s.potato_count)}catch{return null}}async record(e,t={}){if(!this.isEnabled)return null;const n=ia(),i=sa();if(!n||!i)return null;try{const s={page_slug:"play",event_type:e,theme:"drive_world",cursor:"vehicle",motion:"full",referrer:document.referrer||"",source_token:t.sourceToken||"",visitor_id:this.visitorId,session_id:av,fingerprint_hash:this.fingerprintHash,fingerprint_version:"play-v1",screen_size:`${screen.width}x${screen.height}x${window.devicePixelRatio||1}`,viewport_size:`${window.innerWidth}x${window.innerHeight}`,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",language:navigator.language||"",platform:navigator.platform||""},o=await fetch(n,{method:"POST",headers:{"content-type":"application/json",apikey:i,authorization:`Bearer ${i}`},body:JSON.stringify(s),keepalive:e==="page_view"});return o.ok?o.json().catch(()=>null):null}catch{return null}}}function Wu(){return globalThis.PORTFOLIO_CONFIG||{}}function ia(){const r=Wu();return r.visitorProofEndpoint||(r.supabaseUrl?`${r.supabaseUrl.replace(/\/$/,"")}/functions/v1/visitor-proof`:"")}function sa(){return Wu().supabaseAnonKey||""}function cv(){try{const r=localStorage.getItem(Uh);if(r)return r;const e=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;return localStorage.setItem(Uh,e),e}catch{return`${Date.now()}-${Math.random().toString(16).slice(2)}`}}async function hv(){const r=[navigator.userAgent||"",navigator.language||"",navigator.platform||"",screen.width,screen.height,screen.colorDepth,window.devicePixelRatio||1,Intl.DateTimeFormat().resolvedOptions().timeZone||""].join("|");if(!crypto.subtle)return"";const e=new TextEncoder().encode(r),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(n=>n.toString(16).padStart(2,"0")).join("")}class uv{constructor(e){this.RAPIER=e,this.world=new this.RAPIER.World({x:0,y:-18.5,z:0}),this.accumulator=0,this.fixedStep=1/60,this.dynamicVisuals=[],this.staticColliders=[]}createFixedBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);n.rotation&&i.setRotation(ra(n.rotation));const s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setFriction(n.friction??.85).setRestitution(n.restitution??.05);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),this.recordStaticCollider("box",e,{name:n.debugName||"FixedBox",visualName:n.visualName||null,size:t,rotation:n.rotation||[0,0,0],sensor:!!n.sensor}),s}createFixedCylinder(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(ra(i.rotation));const o=this.world.createRigidBody(s),a=this.RAPIER.ColliderDesc.cylinder(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&a.setSensor(!0),this.world.createCollider(a,o),this.recordStaticCollider("cylinder",e,{name:i.debugName||"FixedCylinder",visualName:i.visualName||null,halfHeight:t,radius:n,rotation:i.rotation||[0,0,0],sensor:!!i.sensor}),o}createFixedBall(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.ball(t).setFriction(n.friction??.85).setRestitution(n.restitution??.04);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),this.recordStaticCollider("ball",e,{name:n.debugName||"FixedBall",visualName:n.visualName||null,radius:t,sensor:!!n.sensor}),s}createFixedTrimesh(e,t,n,i={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(e[0],e[1],e[2]);i.rotation&&s.setRotation(ra(i.rotation));const o=this.world.createRigidBody(s),a=this.RAPIER.ColliderDesc.trimesh(t,n).setFriction(i.friction??.85).setRestitution(i.restitution??.04);return i.sensor&&a.setSensor(!0),this.world.createCollider(a,o),this.recordStaticCollider("trimesh",e,{name:i.debugName||"FixedTrimesh",visualName:i.visualName||null,vertices:Float32Array.from(t),indices:Uint32Array.from(n),rotation:i.rotation||[0,0,0],sensor:!!i.sensor}),o}createDynamicBox(e,t,n={}){const i=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(e[0],e[1],e[2]).setLinearDamping(n.linearDamping??.35).setAngularDamping(n.angularDamping??.45),s=this.world.createRigidBody(i),o=this.RAPIER.ColliderDesc.cuboid(t[0]/2,t[1]/2,t[2]/2).setDensity(n.density??.55).setFriction(n.friction??.75).setRestitution(n.restitution??.2);return n.sensor&&o.setSensor(!0),this.world.createCollider(o,s),s}bindVisual(e,t){const n=e.translation(),i=e.rotation();this.dynamicVisuals.push({body:e,object:t,initial:{translation:{x:n.x,y:n.y,z:n.z},rotation:{x:i.x,y:i.y,z:i.z,w:i.w}}})}resetDynamicVisuals(){for(const e of this.dynamicVisuals)e.body.setTranslation(e.initial.translation,!0),e.body.setRotation(e.initial.rotation,!0),e.body.setLinvel({x:0,y:0,z:0},!0),e.body.setAngvel({x:0,y:0,z:0},!0);this.syncVisuals()}step(e,t){this.accumulator+=Math.min(e,.05);let n=!1;for(;this.accumulator>=this.fixedStep;)t?.(this.fixedStep),this.world.step(),this.accumulator-=this.fixedStep,n=!0;n&&this.syncVisuals()}syncVisuals(){for(const e of this.dynamicVisuals){const t=e.body.translation(),n=e.body.rotation();e.object.position.set(t.x,t.y,t.z),e.object.quaternion.set(n.x,n.y,n.z,n.w)}}recordStaticCollider(e,t,n){this.staticColliders.push({type:e,position:[...t],...n})}getColliderDebugData(){return this.staticColliders.map(e=>({...e}))}}function ra(r){const e=new At().setFromEuler(new pn(r[0],r[1],r[2]));return{x:e.x,y:e.y,z:e.z,w:e.w}}function ec(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,c=new ut;let h=0;for(let f=0;f<r.length;++f){const l=r[f];let u=0;if(t!==(l.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in l.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(l.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(a!==l.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in l.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(l.morphAttributes[d])}if(e){let d;if(t)d=l.index.count;else if(l.attributes.position!==void 0)d=l.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,d,f),h+=d}}if(t){let f=0;const l=[];for(let u=0;u<r.length;++u){const d=r[u].index;for(let p=0;p<d.count;++p)l.push(d.getX(p)+f);f+=r[u].attributes.position.count}c.setIndex(l)}for(const f in s){const l=Oh(s[f]);if(!l)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,l)}for(const f in o){const l=o[f][0].length;if(l===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let u=0;u<l;++u){const d=[];for(let _=0;_<o[f].length;++_)d.push(o[f][_][u]);const p=Oh(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(p)}}return c}function Oh(r){let e,t,n,i=-1,s=0;for(let h=0;h<r.length;++h){const f=r[h];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=f.gpuType),i!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=f.count*t}const o=new e(s),a=new gt(o,t,n);let c=0;for(let h=0;h<r.length;++h){const f=r[h];if(f.isInterleavedBufferAttribute){const l=c/t;for(let u=0,d=f.count;u<d;u++)for(let p=0;p<t;p++){const _=f.getComponent(u,p);a.setComponent(u+l,p,_)}}else o.set(f.array,c);c+=f.count*t}return i!==void 0&&(a.gpuType=i),a}function Bh(r,e){if(e===Dd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===rl||e===cu){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===rl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function dv(r){const e=new Map,t=new Map,n=r.clone();return Xu(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Xu(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Xu(r.children[n],e.children[n],t)}class qu extends gs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new _v(t)}),this.register(function(t){return new xv(t)}),this.register(function(t){return new Av(t)}),this.register(function(t){return new Cv(t)}),this.register(function(t){return new Rv(t)}),this.register(function(t){return new yv(t)}),this.register(function(t){return new Sv(t)}),this.register(function(t){return new Mv(t)}),this.register(function(t){return new bv(t)}),this.register(function(t){return new gv(t)}),this.register(function(t){return new wv(t)}),this.register(function(t){return new vv(t)}),this.register(function(t){return new Ev(t)}),this.register(function(t){return new Tv(t)}),this.register(function(t){return new pv(t)}),this.register(function(t){return new kh(t,$e.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new kh(t,$e.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Pv(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const h=Hs.extractUrlBase(e);o=Hs.resolveURL(h,this.path)}else o=Hs.extractUrlBase(e);this.manager.itemStart(e);const a=function(h){i?i(h):console.error(h),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Nu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(h){try{s.parse(h,o,function(f){t(f),s.manager.itemEnd(e)},a)}catch(f){a(f)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Yu){try{o[$e.KHR_BINARY_GLTF]=new Iv(e)}catch(l){i&&i(l);return}s=JSON.parse(o[$e.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const h=new Wv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});h.fileLoader.setRequestHeader(this.requestHeader);for(let f=0;f<this.pluginCallbacks.length;f++){const l=this.pluginCallbacks[f](h);l.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[l.name]=l,o[l.name]=!0}if(s.extensionsUsed)for(let f=0;f<s.extensionsUsed.length;++f){const l=s.extensionsUsed[f],u=s.extensionsRequired||[];switch(l){case $e.KHR_MATERIALS_UNLIT:o[l]=new mv;break;case $e.KHR_DRACO_MESH_COMPRESSION:o[l]=new Lv(s,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:o[l]=new Dv;break;case $e.KHR_MESH_QUANTIZATION:o[l]=new Nv;break;default:u.indexOf(l)>=0&&a[l]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+l+'".')}}h.setExtensions(o),h.setPlugins(a),h.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function fv(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function bt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class pv{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let h;const f=new fe(16777215);c.color!==void 0&&f.setRGB(c.color[0],c.color[1],c.color[2],Kt);const l=c.range!==void 0?c.range:0;switch(c.type){case"directional":h=new pl(f),h.target.position.set(0,0,-1),h.add(h.target);break;case"point":h=new $r(f),h.distance=l;break;case"spot":h=new Uu(f),h.distance=l,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,h.angle=c.spot.outerConeAngle,h.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,h.target.position.set(0,0,-1),h.add(h.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return h.position.set(0,0,0),En(h,c),c.intensity!==void 0&&(h.intensity=c.intensity),h.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(h),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class mv{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return De}extendParams(e,t,n){const i=[];e.color=new fe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Et))}return Promise.all(i)}}class gv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class _v{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new le(s,s)}return Promise.all(i)}}class xv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class vv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class yv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new fe(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Kt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Et)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Sv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class Mv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new fe().setRGB(s[0],s[1],s[2],Kt),Promise.all(i)}}class bv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5),Promise.resolve()}}class wv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new fe().setRGB(s[0],s[1],s[2],Kt),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Et)),Promise.all(i)}}class Tv{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Ev{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return bt(this.parser,e,this.name)!==null?on:null}extendMaterialParams(e,t){const n=bt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Av{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Cv{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const h=n.options.manager.getHandler(a.uri);h!==null&&(c=h)}return n.loadTextureImage(e,o.source,c)}}class Rv{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const h=n.options.manager.getHandler(a.uri);h!==null&&(c=h)}return n.loadTextureImage(e,o.source,c)}}class kh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,h=i.byteLength||0,f=i.count,l=i.byteStride,u=new Uint8Array(a,c,h);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(f,l,u,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(f*l);return o.decodeGltfBuffer(new Uint8Array(d),f,l,u,i.mode,i.filter),d})})}else return null}}class Pv{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const h of i.primitives)if(h.mode!==ln.TRIANGLES&&h.mode!==ln.TRIANGLE_STRIP&&h.mode!==ln.TRIANGLE_FAN&&h.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const h in o)a.push(this.parser.getDependency("accessor",o[h]).then(f=>(c[h]=f,c[h])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(h=>{const f=h.pop(),l=f.isGroup?f.children:[f],u=h[0].count,d=[];for(const p of l){const _=new Be,g=new C,m=new At,x=new C(1,1,1),v=new nn(p.geometry,p.material,u);for(let y=0;y<u;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,y),c.SCALE&&x.fromBufferAttribute(c.SCALE,y),v.setMatrixAt(y,_.compose(g,m,x));for(const y in c)if(y==="_COLOR_0"){const E=c[y];v.instanceColor=new al(E.array,E.itemSize,E.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,c[y]);Qe.prototype.copy.call(v,p),this.parser.assignFinalMaterial(v),d.push(v)}return f.isGroup?(f.clear(),f.add(...d),f):d[0]}))}}const Yu="glTF",Rs=12,zh={JSON:1313821514,BIN:5130562};class Iv{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Rs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Rs,s=new DataView(e,Rs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===zh.JSON){const h=new Uint8Array(e,Rs+o,a);this.content=n.decode(h)}else if(c===zh.BIN){const h=Rs+o;this.body=e.slice(h,h+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Lv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},h={};for(const f in o){const l=xl[f]||f.toLowerCase();a[l]=o[f]}for(const f in e.attributes){const l=xl[f]||f.toLowerCase();if(o[f]!==void 0){const u=n.accessors[e.attributes[f]],d=es[u.componentType];h[l]=d.name,c[l]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(f){return new Promise(function(l,u){i.decodeDracoFile(f,function(d){for(const p in d.attributes){const _=d.attributes[p],g=c[p];g!==void 0&&(_.normalized=g)}l(d)},a,h,Kt,u)})})}}class Dv{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Nv{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class $u extends fs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,h=a*3,f=i-t,l=(n-t)/f,u=l*l,d=u*l,p=e*h,_=p-h,g=-2*d+3*u,m=d-u,x=1-g,v=m-u+l;for(let y=0;y!==a;y++){const E=o[_+y+a],T=o[_+y+c]*f,R=o[p+y+a],S=o[p+y]*f;s[y]=x*E+v*T+g*R+m*S}return s}}const Fv=new At;class Uv extends $u{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Fv.fromArray(s).normalize().toArray(s),s}}const ln={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},es={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gh={9728:Rt,9729:Ct,9984:nu,9985:Hr,9986:Ns,9987:Ln},Vh={33071:In,33648:jr,10497:hn},oa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},xl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},li={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ov={CUBICSPLINE:void 0,LINEAR:$s,STEP:Ys},aa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Bv(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ze({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:jt})),r.DefaultMaterial}function yi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function En(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function kv(r,e,t){let n=!1,i=!1,s=!1;for(let h=0,f=e.length;h<f;h++){const l=e[h];if(l.POSITION!==void 0&&(n=!0),l.NORMAL!==void 0&&(i=!0),l.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let h=0,f=e.length;h<f;h++){const l=e[h];if(n){const u=l.POSITION!==void 0?t.getDependency("accessor",l.POSITION):r.attributes.position;o.push(u)}if(i){const u=l.NORMAL!==void 0?t.getDependency("accessor",l.NORMAL):r.attributes.normal;a.push(u)}if(s){const u=l.COLOR_0!==void 0?t.getDependency("accessor",l.COLOR_0):r.attributes.color;c.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(h){const f=h[0],l=h[1],u=h[2];return n&&(r.morphAttributes.position=f),i&&(r.morphAttributes.normal=l),s&&(r.morphAttributes.color=u),r.morphTargetsRelative=!0,r})}function zv(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Gv(r){let e;const t=r.extensions&&r.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+la(t.attributes):e=r.indices+":"+la(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+la(r.targets[n]);return e}function la(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function vl(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Vv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Hv=new Be;class Wv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new fv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Np(this.options.manager):this.textureLoader=new kp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return yi(s,a,i),En(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[h,f]of o.children.entries())s(f,a.children[h])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Hs.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=oa[i.type],a=es[i.componentType],c=i.normalized===!0,h=new a(i.count*o);return Promise.resolve(new gt(h,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=oa[i.type],h=es[i.componentType],f=h.BYTES_PER_ELEMENT,l=f*c,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let _,g;if(d&&d!==l){const m=Math.floor(u/d),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(x);v||(_=new h(a,m*d,i.count*d/f),v=new Af(_,d/f),t.cache.add(x,v)),g=new kl(v,c,u%d/f,p)}else a===null?_=new h(i.count*c):_=new h(a,u,i.count*c),g=new gt(_,c,p);if(i.sparse!==void 0){const m=oa.SCALAR,x=es[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,E=new x(o[1],v,i.sparse.count*m),T=new h(o[2],y,i.sparse.count*c);a!==null&&(g=new gt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,S=E.length;R<S;R++){const b=E[R];if(g.setX(b,T[R*c]),c>=2&&g.setY(b,T[R*c+1]),c>=3&&g.setZ(b,T[R*c+2]),c>=4&&g.setW(b,T[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const h=this.loadImageSource(t,n).then(function(f){f.flipY=!1,f.name=o.name||a.name||"",f.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(f.name=a.uri);const u=(s.samplers||{})[o.sampler]||{};return f.magFilter=Gh[u.magFilter]||Ct,f.minFilter=Gh[u.minFilter]||Ln,f.wrapS=Vh[u.wrapS]||hn,f.wrapT=Vh[u.wrapT]||hn,f.generateMipmaps=!f.isCompressedTexture&&f.minFilter!==Rt&&f.minFilter!==Ct,i.associations.set(f,{textures:e}),f}).catch(function(){return null});return this.textureCache[c]=h,h}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(l=>l.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",h=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(l){h=!0;const u=new Blob([l],{type:o.mimeType});return c=a.createObjectURL(u),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const f=Promise.resolve(c).then(function(l){return new Promise(function(u,d){let p=u;t.isImageBitmapLoader===!0&&(p=function(_){const g=new It(_);g.needsUpdate=!0,u(g)}),t.load(Hs.resolveURL(l,s.path),p,void 0,d)})}).then(function(l){return h===!0&&a.revokeObjectURL(c),En(l,o),l.userData.mimeType=o.mimeType||Vv(o.uri),l}).catch(function(l){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),l});return this.sourceCache[e]=f,f}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[$e.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new io,Un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new xu,Un.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ze}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},h=[];if(c[$e.KHR_MATERIALS_UNLIT]){const l=i[$e.KHR_MATERIALS_UNLIT];o=l.getMaterialType(),h.push(l.extendParams(a,s,t))}else{const l=s.pbrMetallicRoughness||{};if(a.color=new fe(1,1,1),a.opacity=1,Array.isArray(l.baseColorFactor)){const u=l.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],Kt),a.opacity=u[3]}l.baseColorTexture!==void 0&&h.push(t.assignTexture(a,"map",l.baseColorTexture,Et)),a.metalness=l.metallicFactor!==void 0?l.metallicFactor:1,a.roughness=l.roughnessFactor!==void 0?l.roughnessFactor:1,l.metallicRoughnessTexture!==void 0&&(h.push(t.assignTexture(a,"metalnessMap",l.metallicRoughnessTexture)),h.push(t.assignTexture(a,"roughnessMap",l.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),h.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Ot);const f=s.alphaMode||aa.OPAQUE;if(f===aa.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,f===aa.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==De&&(h.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new le(1,1),s.normalTexture.scale!==void 0)){const l=s.normalTexture.scale;a.normalScale.set(l,l)}if(s.occlusionTexture!==void 0&&o!==De&&(h.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==De){const l=s.emissiveFactor;a.emissive=new fe().setRGB(l[0],l[1],l[2],Kt)}return s.emissiveTexture!==void 0&&o!==De&&h.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Et)),Promise.all(h).then(function(){const l=new o(a);return s.name&&(l.name=s.name),En(l,s),t.associations.set(l,{materials:e}),s.extensions&&yi(i,l,s),l})}createUniqueName(e){const t=ot.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Hh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const h=e[a],f=Gv(h),l=i[f];if(l)o.push(l.promise);else{let u;h.extensions&&h.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?u=s(h):u=Hh(new ut,h,t),i[f]={primitive:h,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,h=o.length;c<h;c++){const f=o[c].material===void 0?Bv(this.cache):this.getDependency("material",o[c].material);a.push(f)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const h=c.slice(0,c.length-1),f=c[c.length-1],l=[];for(let d=0,p=f.length;d<p;d++){const _=f[d],g=o[d];let m;const x=h[d];if(g.mode===ln.TRIANGLES||g.mode===ln.TRIANGLE_STRIP||g.mode===ln.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new If(_,x):new ne(_,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===ln.TRIANGLE_STRIP?m.geometry=Bh(m.geometry,cu):g.mode===ln.TRIANGLE_FAN&&(m.geometry=Bh(m.geometry,rl));else if(g.mode===ln.LINES)m=new Of(_,x);else if(g.mode===ln.LINE_STRIP)m=new Hl(_,x);else if(g.mode===ln.LINE_LOOP)m=new Bf(_,x);else if(g.mode===ln.POINTS)m=new cl(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&zv(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),En(m,s),g.extensions&&yi(i,m,g),t.assignFinalMaterial(m),l.push(m)}for(let d=0,p=l.length;d<p;d++)t.associations.set(l[d],{meshes:e,primitives:d});if(l.length===1)return s.extensions&&yi(i,l[0],s),l[0];const u=new Pe;s.extensions&&yi(i,u,s),t.associations.set(u,{meshes:e});for(let d=0,p=l.length;d<p;d++)u.add(l[d]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(Xt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new rr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),En(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let h=0,f=o.length;h<f;h++){const l=o[h];if(l){a.push(l);const u=new Be;s!==null&&u.fromArray(s.array,h*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[h])}return new Gl(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],h=[],f=[];for(let l=0,u=i.channels.length;l<u;l++){const d=i.channels[l],p=i.samplers[d.sampler],_=d.target,g=_.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,x=i.parameters!==void 0?i.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",x)),h.push(p),f.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(h),Promise.all(f)]).then(function(l){const u=l[0],d=l[1],p=l[2],_=l[3],g=l[4],m=[];for(let v=0,y=u.length;v<y;v++){const E=u[v],T=d[v],R=p[v],S=_[v],b=g[v];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const U=n._createAnimationTracks(E,T,R,S,b);if(U)for(let P=0;P<U.length;P++)m.push(U[P])}const x=new Ap(s,void 0,m);return En(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,h=i.weights.length;c<h;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let h=0,f=a.length;h<f;h++)o.push(n.getDependency("node",a[h]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(h){const f=h[0],l=h[1],u=h[2];u!==null&&f.traverse(function(d){d.isSkinnedMesh&&d.bind(u,Hv)});for(let d=0,p=l.length;d<p;d++)f.add(l[d]);if(f.userData.pivot!==void 0&&l.length>0){const d=f.userData.pivot,p=l[0];f.pivot=new C().fromArray(d),f.position.x-=d[0],f.position.y-=d[1],f.position.z-=d[2],p.position.set(0,0,0),delete f.userData.pivot}return f})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(h){return h.createNodeMesh&&h.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(h){return i._getNodeRef(i.cameraCache,s.camera,h)})),i._invokeAll(function(h){return h.createNodeAttachment&&h.createNodeAttachment(e)}).forEach(function(h){a.push(h)}),this.nodeCache[e]=Promise.all(a).then(function(h){let f;if(s.isBone===!0?f=new _u:h.length>1?f=new Pe:h.length===1?f=h[0]:f=new Qe,f!==h[0])for(let l=0,u=h.length;l<u;l++)f.add(h[l]);if(s.name&&(f.userData.name=s.name,f.name=o),En(f,s),s.extensions&&yi(n,f,s),s.matrix!==void 0){const l=new Be;l.fromArray(s.matrix),f.applyMatrix4(l)}else s.translation!==void 0&&f.position.fromArray(s.translation),s.rotation!==void 0&&f.quaternion.fromArray(s.rotation),s.scale!==void 0&&f.scale.fromArray(s.scale);if(!i.associations.has(f))i.associations.set(f,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const l=i.associations.get(f);i.associations.set(f,{...l})}return i.associations.get(f).nodes=e,f}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Pe;n.name&&(s.name=i.createUniqueName(n.name)),En(s,n),n.extensions&&yi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let f=0,l=c.length;f<l;f++){const u=c[f];u.parent!==null?s.add(dv(u)):s.add(u)}const h=f=>{const l=new Map;for(const[u,d]of i.associations)(u instanceof Un||u instanceof It)&&l.set(u,d);return f.traverse(u=>{const d=i.associations.get(u);d!=null&&l.set(u,d)}),l};return i.associations=h(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];li[s.path]===li.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(a);let h;switch(li[s.path]){case li.weights:h=as;break;case li.rotation:h=ls;break;case li.translation:case li.scale:h=cs;break;default:n.itemSize===1?h=as:h=cs;break}const f=i.interpolation!==void 0?Ov[i.interpolation]:$s,l=this._getArrayFromAccessor(n);for(let u=0,d=c.length;u<d;u++){const p=new h(c[u]+"."+li[s.path],t.array,l,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=vl(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ls?Uv:$u;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Xv(r,e,t){const n=e.attributes,i=new kn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,h=a.max;if(c!==void 0&&h!==void 0){if(i.set(new C(c[0],c[1],c[2]),new C(h[0],h[1],h[2])),a.normalized){const f=vl(es[a.componentType]);i.min.multiplyScalar(f),i.max.multiplyScalar(f)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,c=new C;for(let h=0,f=s.length;h<f;h++){const l=s[h];if(l.POSITION!==void 0){const u=t.json.accessors[l.POSITION],d=u.min,p=u.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),u.normalized){const _=vl(es[u.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new zn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Hh(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=xl[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ze.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),En(r,e),Xv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?kv(r,e.targets,t):r})}const Ps=[{x:-.88,y:-.36,z:1.58,front:!0},{x:.88,y:-.36,z:1.58,front:!0},{x:-.88,y:-.36,z:-1.64,front:!1},{x:.88,y:-.36,z:-1.64,front:!1}],qv=.43,ca=2.6,$i={id:"road",forwardGrip:1,sideGrip:1,engineFactor:1,topSpeedFactor:1};class Yv{constructor({physics:e,body:t}){this.physics=e,this.RAPIER=e.RAPIER,this.body=t,this.controller=e.world.createVehicleController(t),this.steering=0,this.throttle=0,this.speed=0,this.localSpeed=0,this.groundedWheels=0,this.boostCooldown=0,this.burnoutCharge=0,this.wasBurnout=!1,this.burnoutBlocked=!1,this.forwardHoldTime=0,this.wheelieTimer=0,this.wheelieCooldown=0,this.stuckTimer=0,this.lastCollisionSpeed=0,this.surface=$i,this.driveState={boost:!1,handbrake:!1,throttle:0,slip:0,burnout:!1,wheelie:!1,surface:"road"},this.setupWheels()}setSurface(e){this.surface=e?{...$i,...e}:$i}setupWheels(){this.radius=qv;for(const e of Ps)this.controller.addWheel({x:e.x,y:e.y,z:e.z},{x:0,y:-1,z:0},{x:-1,y:0,z:0},.28,this.radius);for(let e=0;e<Ps.length;e+=1)this.controller.setWheelFrictionSlip(e,1.82),this.controller.setWheelSideFrictionStiffness(e,9.8),this.controller.setWheelSuspensionStiffness(e,34),this.controller.setWheelSuspensionCompression(e,12.8),this.controller.setWheelSuspensionRelaxation(e,14.2),this.controller.setWheelMaxSuspensionTravel(e,.18),this.controller.setWheelMaxSuspensionForce(e,430)}update(e,t){const n=e.joystick,i=e.actions.forward||n.y<-.22,s=e.actions.backward||n.y>.22,o=e.actions.left||n.x<-.22,a=e.actions.right||n.x>.22,c=e.actions.handbrake,h=e.actions.brake,f=this.surface||$i,l=this.body.linvel(),u=this.getLocalVelocity(l);this.speed=Math.hypot(l.x,l.y*.12,l.z),this.localSpeed=u.z;const d=Math.hypot(l.x,l.z);this.forwardHoldTime=i?this.forwardHoldTime+t:0;const p=i&&(s||h),_=p&&this.forwardHoldTime<.32&&d<8;p?!this.wasBurnout&&!_&&d>=ca&&(this.burnoutBlocked=!0):this.burnoutBlocked=!1;const g=p&&!this.burnoutBlocked&&(_||d<ca&&Math.abs(this.localSpeed)<ca),m=this.wasBurnout&&d<4.2,x=p&&(g||m),v=e.actions.boost&&!x&&!e.actions.handbrake,y=!x&&i&&(h||s&&this.localSpeed>.8),E=Xt.clamp(d/52,0,1),T=Xt.clamp((o?1:0)+(a?-1:0)+Xt.clamp(-n.x,-1,1),-1,1),R=Xt.lerp(.56,.22,E)*(c?1.22:1),S=T*R;this.steering+=(S-this.steering)*Math.min(1,t*(c?10.5:7.8));const b=x?1:y?0:i?1:s?-.58:0,U=b===0?4.4:6.6;this.throttle+=(b-this.throttle)*Math.min(1,t*U);const P=(v?102:68)*(f.topSpeedFactor??1),O=this.throttle>=0?P:18,B=Math.max(0,Math.abs(this.localSpeed)-O),H=Xt.clamp(Math.abs(this.localSpeed)/O,0,1.25),k=this.throttle>0&&this.localSpeed<8?1.62:1;let G=this.throttle>=0?x?920:v?1080:650:178;G*=f.engineFactor??1;let j=this.throttle*G*k*(1-Math.min(.82,H*.72));j/=1+B*.36,v&&i&&d>3&&this.groundedWheels>1&&this.applyHeldBoost(t,l);const Z=!x&&(i&&this.localSpeed<-1.4||s&&this.localSpeed>1.4);let ae=h?42:.08,he=h?42:.08;Z&&(ae=Math.max(ae,30),he=Math.max(he,30)),y&&(ae=Math.max(ae,44),he=Math.max(he,44),j=0),c&&(he=Math.max(he,38),ae=Math.max(ae,2.5),j*=.64),x&&(ae=Math.max(ae,58),he=Math.max(he,5.5),j*=1.2,this.burnoutCharge=Math.min(1.35,this.burnoutCharge+t),this.applyBurnoutHold(t));const pe=this.wasBurnout&&!x&&i&&this.burnoutCharge>.22&&this.wheelieCooldown<=0;!i&&!s&&this.speed<1.8&&(ae=4.2,he=4.2);for(let Ie=0;Ie<Ps.length;Ie+=1){const nt=Ps[Ie].front,at=!nt;this.controller.setWheelSteering(Ie,nt?this.steering:0),this.controller.setWheelBrake(Ie,at?he:ae),this.controller.setWheelEngineForce(Ie,at?j:0),this.controller.setWheelFrictionSlip(Ie,this.getWheelSlip(nt,c,v,x,f)),this.controller.setWheelSideFrictionStiffness(Ie,this.getWheelSideFriction(nt,c,x,f))}return this.controller.updateVehicle(Math.min(t,1/45)),this.updateContactState(),pe&&this.launchWheelie(),this.applyDriftAssist(T,c,t),this.stabilizeOnGround(c,T),this.applyAeroGrip(t,c),this.settleDriveNoise(T,i||s,t),this.applyStuckRecovery({forward:i,reverse:s,rawSteer:T},t),this.limitChaos(),this.lastCollisionSpeed=d,this.boostCooldown=Math.max(0,this.boostCooldown-t),this.wheelieCooldown=Math.max(0,this.wheelieCooldown-t),this.wheelieTimer=Math.max(0,this.wheelieTimer-t),!x&&!pe&&(this.burnoutCharge=Math.max(0,this.burnoutCharge-t*1.6)),this.driveState={boost:v,handbrake:c,throttle:this.throttle,burnout:x,wheelie:this.wheelieTimer>0,wheelieLaunch:pe,burnoutCharge:this.burnoutCharge,surface:f.id||"road",slip:x?1:c&&this.speed>5?Xt.clamp(this.speed/24,0,1):0},this.wasBurnout=x,{boost:v,handbrake:c,burnout:x,wheelie:this.wheelieTimer>0,wheelieLaunch:pe,grounded:this.groundedWheels>1}}updateContactState(){this.groundedWheels=0;for(let e=0;e<Ps.length;e+=1)this.controller.wheelIsInContact(e)&&(this.groundedWheels+=1)}jump(e=6.2){return this.groundedWheels<2?!1:(this.body.applyImpulse({x:0,y:e*this.body.mass(),z:0},!0),this.body.applyTorqueImpulse({x:.08*this.body.mass(),y:0,z:0},!0),!0)}boost(e,t=18){if(this.boostCooldown>0)return!1;const n=this.body.mass();return this.body.applyImpulse({x:e.x*t*n,y:.08*n,z:e.z*t*n},!0),this.boostCooldown=.62,!0}flipRecovery(){const e=this.body.rotation();if(new C(0,1,0).applyQuaternion(new At(e.x,e.y,e.z,e.w)).y>.22)return!1;const n=this.body.mass();return this.body.applyImpulse({x:0,y:4.8*n,z:0},!0),this.body.applyTorqueImpulse({x:2.8*n,y:0,z:1.6*n},!0),!0}limitChaos(){const e=this.body.linvel(),t=this.groundedWheels>1?this.wheelieTimer>0?6.8:5.4:10;e.y>t&&this.body.setLinvel({x:e.x,y:t,z:e.z},!0);const n=this.body.angvel(),i=this.wheelieTimer>0?4.8:2.4;this.body.setAngvel({x:Xt.clamp(n.x,-i,i),y:Xt.clamp(n.y,-4.2,4.2),z:Xt.clamp(n.z,-2.4,2.4)},!0)}stabilizeOnGround(e=!1,t=0){if(this.groundedWheels<2)return;const n=this.body.angvel(),i=this.body.rotation(),s=new C(0,1,0).applyQuaternion(new At(i.x,i.y,i.z,i.w)),o=this.wheelieTimer>0,a=this.body.mass()*(o?.16:e?.5:.76);this.body.applyTorqueImpulse({x:(-n.x*(o?.18:.68)-s.z*(o?.12:.96))*a,y:-n.y*this.body.mass()*(e?.006:Math.abs(t)<.08?.035:.016),z:(-n.z*.68+s.x*.96)*a},!0),!o&&this.speed>5&&this.body.applyImpulse({x:0,y:-Math.min(.92,this.speed*.02)*this.body.mass(),z:0},!0)}applyAeroGrip(e,t=!1){if(this.groundedWheels<2||this.wheelieTimer>0)return;const n=this.body.mass(),i=Math.min(2.45,.48+this.speed*.032)*n*(t?.78:1);this.body.applyImpulse({x:0,y:-i*Math.min(1,e*60)*.022,z:0},!0)}getWheelSlip(e,t,n,i,s=$i){const o=s.forwardGrip??1;return i?(e?1.55:.58)*o:t?(e?1.7:.86)*o:(n?2.18:1.94)*o}getWheelSideFriction(e,t,n,i=$i){const s=i.sideGrip??1;return n?(e?11.2:1.45)*s:t?(e?8.4:2.35)*s:(e?10.2:9.4)*s}getLocalVelocity(e){const t=this.body.rotation(),n=new At(t.x,t.y,t.z,t.w).invert();return new C(e.x,e.y,e.z).applyQuaternion(n)}getForwardVector(){const e=this.body.rotation(),t=new C(0,0,1).applyQuaternion(new At(e.x,e.y,e.z,e.w));return t.y=0,t.lengthSq()<1e-4?new C(0,0,1):t.normalize()}applyHeldBoost(e,t){const n=this.body.mass(),i=new C(t.x,0,t.z),s=i.lengthSq()>5?i.normalize():this.getForwardVector(),o=n*.46*Math.min(1,e*60);this.body.applyImpulse({x:s.x*o,y:-.01*n,z:s.z*o},!0)}applyBurnoutHold(e){if(this.groundedWheels<2)return;const t=this.body.linvel(),n=Math.pow(.18,Math.min(1,e*9));this.body.setLinvel({x:t.x*n,y:t.y,z:t.z*n},!0);const i=this.body.angvel();this.body.setAngvel({x:i.x*.76,y:i.y*.74,z:i.z*.76},!0)}launchWheelie(){if(this.groundedWheels<2)return!1;const e=Xt.clamp(this.burnoutCharge/1.2,.24,1),t=this.body.mass(),n=this.getForwardVector(),i=this.body.rotation(),s=new C(1,0,0).applyQuaternion(new At(i.x,i.y,i.z,i.w)).normalize();return this.body.applyImpulse({x:n.x*t*(4.4+e*8.8),y:t*(.34+e*.34),z:n.z*t*(4.4+e*8.8)},!0),this.body.applyTorqueImpulse({x:s.x*-t*(1.55+e*2.75),y:s.y*-t*(1.55+e*2.75),z:s.z*-t*(1.55+e*2.75)},!0),this.wheelieTimer=.92+e*.42,this.wheelieCooldown=.85,this.burnoutCharge=0,!0}applyDriftAssist(e,t,n){if(!t||this.groundedWheels<2||Math.abs(e)<.12||this.speed<5)return;const i=this.body.mass(),s=Math.min(1,n*60);this.body.applyTorqueImpulse({x:0,y:-e*i*.34*s,z:0},!0)}settleDriveNoise(e,t,n){if(this.groundedWheels<3||this.wheelieTimer>0)return;const i=this.body.angvel(),s=t&&Math.abs(e)<.08,o=s?Math.pow(.18,Math.min(1,n*5.2)):Math.pow(.42,Math.min(1,n*2.4)),a=Math.pow(.28,Math.min(1,n*4.5)),c={x:Math.abs(i.x)<.045?0:i.x*a,y:s&&Math.abs(i.y)<.75?0:i.y*o,z:Math.abs(i.z)<.045?0:i.z*a};this.body.setAngvel(c,!0)}applyStuckRecovery(e,t){if(!(e.forward||e.reverse)||this.groundedWheels<2||this.speed>1.15){this.stuckTimer=0;return}if(this.stuckTimer+=t,this.stuckTimer<.48)return;const i=this.body.mass(),s=this.getForwardVector().multiplyScalar(e.forward?1:-1);this.body.applyImpulse({x:s.x*i*.7,y:i*.06,z:s.z*i*.7},!0),Math.abs(e.rawSteer)>.12&&this.body.applyTorqueImpulse({x:0,y:-e.rawSteer*i*.42,z:0},!0),this.stuckTimer=.24}resetTransientState(){this.burnoutCharge=0,this.wasBurnout=!1,this.burnoutBlocked=!1,this.wheelieTimer=0,this.wheelieCooldown=0,this.stuckTimer=0,this.boostCooldown=0,this.forwardHoldTime=0,this.driveState={boost:!1,handbrake:!1,throttle:this.throttle,slip:0,burnout:!1,wheelie:!1,surface:this.surface?.id||"road"}}}function Pn(r,{namePrefix:e="StaticBatch",shouldSkip:t=()=>!1}={}){r.updateMatrixWorld(!0);const n=new Be().copy(r.matrixWorld).invert(),i=new Map,s=[];r.traverse(a=>{if(a===r||!a.isMesh||!a.geometry||Array.isArray(a.material)||t(a))return;const c=a.geometry.clone();c.applyMatrix4(a.matrixWorld),c.applyMatrix4(n);const h=`${Kv(a.material)}:${$v(c)}:${a.renderOrder||0}`;i.has(h)||i.set(h,{material:a.material,renderOrder:a.renderOrder||0,geometries:[]}),i.get(h).geometries.push(c),s.push(a)});for(const a of s)a.parent?.remove(a);let o=0;for(const a of i.values()){const c=a.geometries.length===1?a.geometries[0]:ec(a.geometries,!1);if(!c)continue;const h=new ne(c,a.material);h.name=`${e}_${o}`,h.renderOrder=a.renderOrder,h.castShadow=!1,h.receiveShadow=!0,r.add(h),o+=1}return o}function $v(r){const e=Object.entries(r.attributes).map(([t,n])=>`${t}:${n.itemSize}:${n.normalized?1:0}:${n.array?.constructor?.name||"array"}`).sort().join("|");return`${r.index?"indexed":"plain"}:${e}`}function Kv(r){return[r.type,r.color?.getHexString?.()||"",r.emissive?.getHexString?.()||"",r.emissiveIntensity??"",r.roughness??"",r.metalness??"",r.opacity??1,r.transparent?1:0,r.depthWrite?1:0,r.side??jt,r.vertexColors?1:0,r.alphaTest??0,r.polygonOffset?1:0,r.polygonOffsetFactor??0,r.polygonOffsetUnits??0,Zv(r.map)].join(":")}function Zv(r){return r?r.source?.uuid||r.image?.src||r.uuid:""}const jv=""+new URL("sabre-turbo.glb",import.meta.url).href,Is=new C(10,1.08,27),Si=-.88,kr={id:"road",drag:1,dustColor:7299664,skidColor:1446928,skidMarks:!0};class Jv{constructor({scene:e,physics:t,achievements:n,audio:i}){this.scene=e,this.physics=t,this.achievements=n,this.audio=i,this.RAPIER=t.RAPIER,this.group=new Pe,this.group.name="Vehicle",this.modelRoot=new Pe,this.modelRoot.position.y=Si,this.group.add(this.modelRoot),this.wheels=[],this.frontWheels=[],this.speed=0,this.airTime=0,this.lastBoostPad=null,this.distanceAccumulator=0,this.lastPosition=Is.clone(),this.visualRumbleTime=0,this.surface=kr,this.airborneTime=0,this.wasAirborne=!1,this.lastAirborneVerticalSpeed=0,this.landingEvents=0,this.lastLandingAt=-1/0,this.lastLandingIntensity=0,this.trails=[],this.skidMarks=[],this.trailGeometry=new Bn(.08,8,5),this.smokeGeometry=new Bn(.16,10,6),this.skidGeometry=new ht(.26,.012,2.2),this.boostGeometry=new Sn(.18,.9,8),this.createBody(),this.createContactShadow(),this.createLights(),this.loadVehicleModel(),this.scene.add(this.group),this.respawn()}setSurface(e){this.surface=e?{...kr,...e}:kr,this.controller?.setSurface(this.surface)}createBody(){const e=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(Is.x,Is.y,Is.z).setCanSleep(!1).setLinearDamping(.34).setAngularDamping(1.85);this.body=this.physics.world.createRigidBody(e);const t=this.RAPIER.ColliderDesc.cuboid(1.12,.25,2.42).setDensity(1.42).setFriction(1).setRestitution(.01);t.setTranslation(0,-.2,-.02),this.physics.world.createCollider(t,this.body);const n=this.RAPIER.ColliderDesc.cuboid(.96,.16,1.78).setDensity(3.35).setFriction(1.05).setRestitution(0);n.setTranslation(0,-.58,-.12),this.physics.world.createCollider(n,this.body);const i=this.RAPIER.ColliderDesc.cuboid(.64,.18,.62).setDensity(.12).setFriction(.72).setRestitution(.02);i.setTranslation(0,.3,-.1),this.physics.world.createCollider(i,this.body),this.body.setAdditionalMassProperties(6.4,{x:0,y:-.66,z:-.14},{x:5,y:4.6,z:5.9},{x:0,y:0,z:0,w:1},!0),this.controller=new Yv({physics:this.physics,body:this.body})}createContactShadow(){const e=new ne(new ao(1.9,28),new De({color:461580,transparent:!0,opacity:.28,depthWrite:!1}));e.name="VehicleContactShadow",e.rotation.x=-Math.PI/2,e.position.set(0,-.82,-.15),e.scale.set(.82,1.55,1),e.renderOrder=5,this.group.add(e)}createLights(){this.brakeLights=[],this.reverseLights=[],this.boostLights=[];for(const e of[-.62,.62]){const t=new Uu(16773316,4.8,26,Math.PI/10,.45,1.6);t.position.set(e,.78+Si,2.86),t.target.position.set(e,.32+Si,10),this.group.add(t,t.target)}for(const e of[-.64,.64]){const t=new $r(16722720,.35,7,2);t.position.set(e,.58+Si,-2.62);const n=new $r(14678015,0,5,2);n.position.set(e*.72,.5+Si,-2.66);const i=new $r(16747578,0,10,2);i.position.set(e*.55,.3+Si,-2.9),this.brakeLights.push(t),this.reverseLights.push(n),this.boostLights.push(i),this.group.add(t,n,i)}}loadVehicleModel(){new qu().load(jv,t=>this.installVehicleModel(t.scene),void 0,t=>{console.error("Vehicle model failed to load",t),this.createFallbackModel()})}installVehicleModel(e){this.modelRoot.clear(),e.name="VehicleModel_SabreTurboGLB";const t=new Map;e.traverse(n=>{n.isMesh&&(n.castShadow=!0,n.receiveShadow=!1,n.material=Ku(n.material,t,n.name),n.material?.transparent&&(n.renderOrder=7))}),Pn(e,{namePrefix:"VehicleBody_batch",shouldSkip:ey}),e.traverse(n=>{n.isMesh&&n.name.startsWith("VehicleBody_batch")&&(n.castShadow=!0,n.receiveShadow=!1)}),this.modelRoot.add(e),this.wheels=[],this.frontWheels=[],e.traverse(n=>{n.name.startsWith("WheelSpin")&&this.wheels.push(n),n.name.startsWith("WheelFront")&&this.frontWheels.push(n)})}createFallbackModel(){const e=new ne(new ht(2.2,.72,5),new ze({color:10304534,roughness:.38,metalness:.35}));e.position.y=.45,e.castShadow=!0,e.receiveShadow=!0,this.modelRoot.add(e)}update(e,t){const n=this.body.translation(),i=Math.hypot(n.x,n.z);if(n.y<-12||i>xt+8||Math.abs(n.x)>Yt+18||Math.abs(n.z)>Yt+18){this.respawn();return}const s=this.controller.update(e,t),o=this.surface||kr;this.speed=this.controller.speed,this.updateLandingFeedback(t,o),s.boost&&this.controller.speed>3&&this.achievements.unlock("boost"),e.consume("jump")&&(this.controller.jump()?(this.achievements.unlock("jump"),this.audio.click(760)):this.controller.flipRecovery()&&this.audio.click(480)),e.consume("honk")&&(this.audio.click(320),this.body.applyImpulse({x:0,y:1.8*this.body.mass(),z:0},!0)),e.consume("respawn")&&this.respawn(),this.applySurfaceDrag(o,t),this.trackDistance(),this.syncModel(),this.updateVehicleLights(e,s),this.updateVisualRumble(t),this.updateWheelVisuals(t),this.updateTrails(t),s.burnout&&this.spawnRearSmoke(!0),s.wheelie&&this.controller.speed>4&&this.spawnRearSmoke(!1),s.boost&&this.controller.speed>8&&this.spawnBoostFlame(),s.handbrake&&this.controller.speed>6&&this.spawnSkidMark(),(this.controller.speed>10||s.handbrake&&this.controller.speed>4)&&this.spawnTrail(s.boost,s.handbrake,o)}postPhysics(){this.syncModel(),this.updateVisualRumble(0)}idleDampen(){const e=this.body.linvel();this.body.setLinvel({x:e.x*.94,y:e.y,z:e.z*.94},!0),this.syncModel()}trackDistance(){const e=this.position,t=e.distanceTo(this.lastPosition);t<6&&(this.distanceAccumulator+=t,this.achievements.addDistance(t)),this.lastPosition.copy(e)}applySurfaceDrag(e,t){if(!e||e.drag>=1||this.controller.groundedWheels<2)return;const n=Math.pow(e.drag,Math.min(2,t*60)),i=this.body.linvel();this.body.setLinvel({x:i.x*n,y:i.y,z:i.z*n},!0)}updateLandingFeedback(e,t){const n=this.controller.groundedWheels>=2,i=this.body.linvel();if(!n){this.airborneTime+=e,this.wasAirborne=!0,this.lastAirborneVerticalSpeed=i.y;return}if(this.wasAirborne&&this.airborneTime>.08){const s=Math.abs(Math.min(0,this.lastAirborneVerticalSpeed)),o=Xt.clamp(this.airborneTime*1.7+s*.14+this.speed*.004,.22,1.35);this.landingEvents+=1,this.lastLandingAt=performance.now()*.001,this.lastLandingIntensity=o,this.spawnLandingDust(o,t),this.audio?.impact?.(o)}this.airborneTime=0,this.wasAirborne=!1,this.lastAirborneVerticalSpeed=i.y}syncModel(){const e=this.body.translation(),t=this.body.rotation();this.group.position.set(e.x,e.y,e.z),this.group.quaternion.set(t.x,t.y,t.z,t.w)}updateVisualRumble(e){this.visualRumbleTime+=e*(1+Math.min(3.2,this.speed*.035));const t=this.controller?.driveState||{},n=["grass","sand","shore"].includes(this.surface?.id)&&this.controller.groundedWheels>1?Math.min(.006,this.speed*18e-5):0,i=t.burnout?.022:t.wheelie?.012:Math.min(.008,this.speed*12e-5),s=this.speed<1?.003:0,o=i+s+n,a=performance.now()*.001-this.lastLandingAt,c=a<.28?(1-a/.28)*this.lastLandingIntensity*.012:0,h=o+c;this.modelRoot.position.set(0,Si+Math.sin(this.visualRumbleTime*35)*h,0),this.modelRoot.rotation.set(Math.sin(this.visualRumbleTime*22)*h*.18,0,Math.sin(this.visualRumbleTime*29)*h*.12)}updateWheelVisuals(e){for(const t of this.wheels)t.rotation.x+=this.controller.speed*e*4.2;for(const t of this.frontWheels)t.rotation.y=this.controller.steering}updateVehicleLights(e,t){const n=e.actions.brake||e.actions.handbrake||e.actions.backward&&this.controller.localSpeed>1,i=e.actions.backward&&this.controller.localSpeed<-.5;for(const s of this.brakeLights)s.intensity=n?2.2:t.burnout?1.1:.35,s.distance=n?10:6;for(const s of this.reverseLights)s.intensity=i?1.4:0;for(const s of this.boostLights)s.intensity=t.boost?2.4:t.wheelie?.8:0}spawnTrail(e,t=!1,n=this.surface){if(this.trails.length>45)return;const i=new C(0,.2,-2.6).applyQuaternion(this.group.quaternion).add(this.group.position),s=new ne(this.trailGeometry,new De({color:e?16751180:t?n?.skidColor??13620431:n?.dustColor??7299664,transparent:!0,opacity:e?.18:t?.17:["sand","shore","grass"].includes(n?.id)?.14:.09,depthWrite:!1}));s.position.set(i.x+(Math.random()-.5)*.7,Math.max(.25,i.y),i.z+(Math.random()-.5)*.7),this.scene.add(s),this.trails.push({mesh:s,life:e?.46:t?.38:.28,velocity:new C((Math.random()-.5)*.28,.16+Math.random()*.18,(Math.random()-.5)*.28)})}spawnRearSmoke(e=!1){if(this.trails.length>82)return;const t=[-.88,.88];for(const n of t){const s=new C(n,-.42,-1.78).applyQuaternion(this.group.quaternion).add(this.group.position),o=new ne(this.smokeGeometry,new De({color:e?14604491:13222581,transparent:!0,opacity:e?.28:.16,depthWrite:!1}));o.position.set(s.x+(Math.random()-.5)*.36,Math.max(.2,s.y),s.z+(Math.random()-.5)*.36),this.scene.add(o),this.trails.push({mesh:o,life:e?.72:.42,velocity:new C((Math.random()-.5)*.38,.22+Math.random()*.22,(Math.random()-.5)*.38)})}}spawnBoostFlame(){if(!(this.trails.length>96))for(const e of[-.48,.48]){const n=new C(e,-.35,-2.74).applyQuaternion(this.group.quaternion).add(this.group.position),i=new ne(this.boostGeometry,new De({color:16751180,transparent:!0,opacity:.48,depthWrite:!1}));i.position.copy(n),i.quaternion.copy(this.group.quaternion),i.rotateX(Math.PI/2),this.scene.add(i),this.trails.push({mesh:i,life:.18,velocity:new C((Math.random()-.5)*.12,.06,(Math.random()-.5)*.12)})}}spawnLandingDust(e,t=this.surface){if(this.trails.length>90)return;const n=Math.min(8,Math.max(3,Math.round(3+e*4)));for(let i=0;i<n;i+=1){const s=i/n*Math.PI*2+Math.random()*.25,o=.55+Math.random()*1.2,a=new ne(this.smokeGeometry,new De({color:t?.dustColor??13945014,transparent:!0,opacity:.16+e*.08,depthWrite:!1}));a.name="VehicleLandingDust",a.position.set(this.group.position.x+Math.cos(s)*o,Math.max(.22,this.group.position.y-.72),this.group.position.z+Math.sin(s)*o),a.scale.setScalar(.8+e*.45+Math.random()*.35),this.scene.add(a),this.trails.push({mesh:a,life:.34+e*.16,velocity:new C(Math.cos(s)*(.34+e*.24),.18+Math.random()*.22,Math.sin(s)*(.34+e*.24))})}}spawnSkidMark(){if(this.surface?.skidMarks!==!1){if(this.skidMarks.length>64){const e=this.skidMarks.shift();this.scene.remove(e.mesh),e.mesh.material.dispose()}for(const e of[-.82,.82]){const n=new C(e,-.84,-1.56).applyQuaternion(this.group.quaternion).add(this.group.position),i=new ne(this.skidGeometry,new De({color:1446928,transparent:!0,opacity:.22,depthWrite:!1}));i.name="VehicleSkidMark",i.position.set(n.x,.17,n.z),i.rotation.y=this.heading,this.scene.add(i),this.skidMarks.push({mesh:i,life:4.5})}}}updateTrails(e){for(let t=this.trails.length-1;t>=0;t-=1){const n=this.trails[t];n.life-=e,n.mesh.position.addScaledVector(n.velocity,e),n.mesh.scale.multiplyScalar(1+e*.9),n.mesh.material.opacity=Math.max(0,n.life)*.42,n.life<=0&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.trails.splice(t,1))}for(let t=this.skidMarks.length-1;t>=0;t-=1){const n=this.skidMarks[t];n.life-=e,n.mesh.material.opacity=Math.max(0,n.life/4.5)*.22,n.life<=0&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.skidMarks.splice(t,1))}}boostFromPad(e){if(!e||this.lastBoostPad===e.id)return!1;const t=this.body.linvel(),n=new C(t.x,0,t.z);let i=n.lengthSq()>1?n.normalize():new C(0,0,1).applyQuaternion(this.group.quaternion).normalize();return this.controller.boost(i,26)?(this.lastBoostPad=e.id,this.achievements.unlock("boost_pad"),this.audio.click(940),this.audio.sweep?.(140,720,.2,.04),window.setTimeout(()=>{this.lastBoostPad===e.id&&(this.lastBoostPad=null)},900),!0):!1}respawn(e=Is,t=0){this.body.setTranslation({x:e.x,y:e.y,z:e.z},!0),this.body.setRotation(Qv(t),!0),this.body.setLinvel({x:0,y:0,z:0},!0),this.body.setAngvel({x:0,y:0,z:0},!0),this.controller?.resetTransientState(),this.speed=0,this.airborneTime=0,this.wasAirborne=!1,this.lastAirborneVerticalSpeed=0,this.lastLandingIntensity=0,this.lastPosition.copy(e),this.syncModel()}get position(){const e=this.body.translation();return new C(e.x,e.y,e.z)}get heading(){const e=this.body.rotation(),t=new At(e.x,e.y,e.z,e.w),n=new C(0,0,1).applyQuaternion(t);return Math.atan2(n.x,n.z)}}function Qv(r){const e=new At().setFromEuler(new pn(0,r,0));return{x:e.x,y:e.y,z:e.z,w:e.w}}function ey(r){if(Wh(r,"WheelSpin")||Wh(r,"WheelFront"))return!0;const e=Array.isArray(r.material)?r.material.map(n=>n?.name||"").join(" "):r.material?.name||"",t=r.name||"";return r.material?.transparent||/glass|windshield|window|wiper/i.test(`${t} ${e}`)}function Wh(r,e){let t=r;for(;t;){if((t.name||"").startsWith(e))return!0;t=t.parent}return!1}function Ku(r,e,t=""){if(Array.isArray(r))return r.map(a=>Ku(a,e,t));if(!r)return r;const n=r.name||"",i=t.includes("Windshield")&&!t.includes("Reflection")&&!t.includes("Wiper"),s=`${n}:${i?"windshield":"standard"}`;if(e.has(s))return e.get(s);let o=r;if(n.includes("metallic_paint")||n.includes("cabin_paint")){const a=n.includes("cabin");o=new on({name:n,color:a?10823954:12530964,metalness:a?.62:.72,roughness:a?.33:.27,clearcoat:.78,clearcoatRoughness:.2}),ty(o,a)}else(n.includes("reflective_glass")||n.includes("smoked")||n.includes("glass"))&&(o=i?new on({name:n,color:1583921,metalness:0,roughness:.045,clearcoat:.96,clearcoatRoughness:.04,transparent:!1,opacity:1,depthWrite:!0,side:Ot}):new on({name:n,color:2705743,metalness:0,roughness:.06,clearcoat:.82,clearcoatRoughness:.06,transparent:!0,opacity:.78,depthWrite:!1,side:Ot}));return e.set(s,o),o}function ty(r,e=!1){r.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb += vec3(0.055, 0.018, 0.004) * sabreFine;`)},r.customProgramCacheKey=()=>`sabre-object-paint-grain-${e?"dark":"red"}`}class ny{constructor(e,t,n){this.camera=e,this.vehicle=t,this.input=n,this.focus=new C,this.smoothedTarget=new C,this.mode="follow",this.cinematicTarget=null,this.cinematicPosition=null,this.baseFov=e.fov}setCinematic(e,t){this.mode="cinematic",this.cinematicPosition=e.clone(),this.cinematicTarget=t.clone()}clearCinematic(){this.mode="follow",this.cinematicPosition=null,this.cinematicTarget=null}update(e){if(this.mode==="cinematic"&&this.cinematicPosition&&this.cinematicTarget){this.camera.position.lerp(this.cinematicPosition,1-Math.pow(.002,e)),this.smoothedTarget.lerp(this.cinematicTarget,1-Math.pow(.004,e)),this.camera.lookAt(this.smoothedTarget);return}const t=this.vehicle.position,n=this.vehicle.body.rotation(),i=new At(n.x,n.y,n.z,n.w),s=new C(0,0,1).applyQuaternion(i).setY(0).normalize(),o=new C(1,0,0).applyQuaternion(i).setY(0).normalize(),a=this.vehicle.body.linvel(),c=new C(a.x,0,a.z).dot(o),h=Xt.clamp(c/12,-1.8,1.8),f=this.vehicle.controller?.driveState||{},l=this.input.pointer.orbitX,u=new At().setFromAxisAngle(new C(0,1,0),l),d=s.clone().applyQuaternion(u),p=Xt.clamp(Math.abs(this.vehicle.speed)*.16,0,4),_=this.input.pointer.zoom,g=this.input.pointer.orbitY,m=t.clone().add(new C(0,1.35,0)).addScaledVector(d,4.2).addScaledVector(o,h*.22),x=t.clone().addScaledVector(d,(-13.5-p)*_).addScaledVector(o,-h*(f.handbrake?1.05:.58)).add(new C(0,7.2+p*.18+g*4.5,0)),v=performance.now()*.001,y=v-(this.vehicle.lastLandingAt??-1/0),E=y<.34?(1-y/.34)*(this.vehicle.lastLandingIntensity||0)*.34:0,T=(f.boost?.18:0)+(f.handbrake?.08:0)+(f.burnout?.14:0)+(f.wheelie?.1:0)+E;if(T>0){const U=v;x.add(new C(Math.sin(U*31)*T,Math.sin(U*43)*T*.42,Math.cos(U*29)*T))}const R=1-Math.pow(.001,e),S=1-Math.pow(5e-4,e);this.camera.position.lerp(x,R*.62),this.smoothedTarget.lerp(m,S*.7);const b=this.baseFov+Math.min(6.5,Math.abs(this.vehicle.speed)*.12)+(f.boost?2.4:0)+(f.handbrake?1.2:0)+E*1.4;this.camera.fov+=(b-this.camera.fov)*Math.min(1,e*4.2),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.smoothedTarget)}}const iy=""+new URL("medieval-props.glb",import.meta.url).href,sy=""+new URL("polish-props.glb",import.meta.url).href;async function ry(){const r=new qu,e=new Map,t=new Map;return await Xh(r,"medievalProps",iy,e,t),await Xh(r,"polishProps",sy,e,t),{has(n){return t.has(n)},clone(n){const i=t.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),s},cloneScene(n){const i=e.get(n);if(!i)return null;const s=i.clone(!0);return s.visible=!0,s.traverse(o=>{o.visible=!0,o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0)}),s}}}async function Xh(r,e,t,n,i){try{const o=(await r.loadAsync(t)).scene;o.name=e,o.visible=!1,n.set(e,o);const a=o.children.filter(c=>c.name.startsWith("Env")||c.name.startsWith("VIS_")||c.name.startsWith("PHY_")||c.name.startsWith("SPAWN_")||c.name.startsWith("ZONE_"));for(const c of a)c.name.startsWith("EnvPolish")&&Pn(c,{namePrefix:`TEMPLATE_${c.name}`}),c.visible=!1,i.set(c.name,c);o.traverse(c=>{c.isMesh&&(Array.isArray(c.material)?c.material.forEach(h=>{h.side=jt}):c.material.side=jt,c.castShadow=!0,c.receiveShadow=!0)})}catch(s){console.error(`Environment asset pack failed to load: ${e}`,s)}}const An=-.55,cn={low:{trees:42,grassTufts:220,leaves:42,clouds:5,props:18,fireflies:14,lifeSignals:{zonePulses:8,windBanners:4,whisperBeacons:4,terminalPulses:2},windCadence:6,particleCadence:3,shadows:!1,water:"low",post:!1,pixelRatio:1},medium:{trees:92,grassTufts:620,leaves:96,clouds:9,props:34,fireflies:32,lifeSignals:{zonePulses:16,windBanners:8,whisperBeacons:8,terminalPulses:5},windCadence:3,particleCadence:2,shadows:!1,water:"medium",post:!1,pixelRatio:1.15},high:{trees:132,grassTufts:900,leaves:150,clouds:12,props:48,fireflies:56,lifeSignals:{zonePulses:16,windBanners:10,whisperBeacons:10,terminalPulses:6},windCadence:2,particleCadence:1,shadows:!0,water:"high",post:!0,pixelRatio:1.35}},ha=["low","medium","high"];function oy(){const r=dy(1024);r.wrapS=hn,r.wrapT=hn,r.repeat.set(58,58),r.magFilter=Ct,r.minFilter=Ln,r.anisotropy=12;const e=hy(["#555f5d","#65706a","#4b5350","#74746b"],256,720);e.wrapS=hn,e.wrapT=hn,e.repeat.set(2,18);const t=uy(512);return t.wrapS=hn,t.wrapT=hn,t.repeat.set(18,18),t.anisotropy=12,{ground:new ze({color:6203482,map:r,roughness:.96,metalness:.01,vertexColors:!1,side:Ot}),meadowLight:new ze({color:7911519,roughness:.98,metalness:0}),meadowDark:new ze({color:3108675,roughness:.98,metalness:0}),flowerField:new De({color:15971518,transparent:!0,opacity:.26,depthWrite:!1}),wildflowerBlue:new De({color:8837119,transparent:!0,opacity:.22,depthWrite:!1}),stoneRoad:new ze({color:6449505,map:e,roughness:.92,metalness:.02}),plazaRoad:new ze({color:12694160,map:e,roughness:.9,metalness:.02}),securityRoad:new ze({color:1452852,roughness:.7,metalness:.14,emissive:399651,emissiveIntensity:.36}),roadEdge:new ze({color:3422776,roughness:.94,metalness:.02}),roadShoulder:new ze({color:7304287,roughness:.96,metalness:0}),roadCurb:new ze({color:14141855,roughness:.86,metalness:.02}),roadLine:new De({color:16047537,transparent:!0,opacity:.58}),roadLineBright:new De({color:10352639,transparent:!0,opacity:.58}),stuntRamp:new ze({color:9332042,roughness:.86,metalness:.02}),dirtRoad:new ze({color:10186557,roughness:.98,metalness:0}),sand:new ze({color:15907970,map:t,roughness:.98,metalness:0}),grassSandBlend:da({inner:136,outer:151,colorA:2382630,colorB:15255943,opacity:.58,noise:.28}),wetSandBlend:da({inner:151,outer:166,colorA:13741422,colorB:7327184,opacity:.48,noise:.2}),shoreWash:da({inner:158,outer:190,colorA:9298141,colorB:682132,opacity:.36,noise:.32,animated:!0}),cliff:new ze({color:6050118,roughness:.92,metalness:.01}),shallow:new De({color:7984848,transparent:!0,opacity:.16,depthWrite:!1}),foam:new De({color:15859702,transparent:!0,opacity:.26,depthWrite:!1}),wood:new ze({color:9065516,roughness:.86,metalness:.02}),darkWood:new ze({color:2365201,roughness:.88,metalness:.03}),stone:new ze({color:8550760,roughness:.86,metalness:.04}),paleStone:new ze({color:13944477,roughness:.82,metalness:.03}),warmStone:new ze({color:14795906,roughness:.84,metalness:.02}),roof:new ze({color:2701381,roughness:.78,metalness:.08}),bannerRed:new ze({color:10760496,roughness:.78,metalness:.03}),bannerBlue:new ze({color:2973574,roughness:.78,metalness:.03}),gold:new ze({color:14727503,roughness:.42,metalness:.45}),glass:new ze({color:7985151,roughness:.22,metalness:.08,transparent:!0,opacity:.62}),glow:new De({color:9437136,transparent:!0,opacity:.72}),glowBlue:new De({color:6871295,transparent:!0,opacity:.78}),glowPink:new De({color:16739725,transparent:!0,opacity:.74}),warmGlow:new De({color:16761706,transparent:!0,opacity:.78}),screen:new ze({color:404021,emissive:2742271,emissiveIntensity:.92,roughness:.36,metalness:.08}),cable:new ze({color:1055007,roughness:.74,metalness:.14}),campusBrick:new ze({color:10436391,roughness:.82,metalness:.02}),potato:new ze({color:11891755,roughness:.94,metalness:0}),crop:new ze({color:7845978,roughness:.9,metalness:0}),softShadow:new De({color:462861,transparent:!0,opacity:.16,depthWrite:!1}),water:cy(),leaf:new io({color:16757436,map:$h("petal"),size:.12,transparent:!0,opacity:.62,alphaTest:.08,depthWrite:!1,sizeAttenuation:!0}),firefly:new io({color:13107082,map:$h("round"),size:.1,transparent:!0,opacity:.8,alphaTest:.05,depthWrite:!1,sizeAttenuation:!0})}}function qh(r,e=144,t=1){const n=Zu(r,e,t),i=new sr(n),s=i.attributes.position,o=[],a=new fe(2382648),c=new fe(6924375),h=new fe(10860635),f=new fe(13804911),l=new fe;for(let u=0;u<s.count;u+=1){const d=s.getX(u),p=s.getY(u),_=Math.hypot(d,p)/(r*t),g=Ce(u*13.71)*.18,m=Xt.smoothstep(_,.66,1);l.copy(a).lerp(c,Math.min(1,_*.72+g)),l.lerp(h,Math.max(0,.5-_)*.34),l.lerp(f,m*.24),o.push(l.r,l.g,l.b)}return i.setAttribute("color",new Ke(o,3)),i.rotateX(-Math.PI/2),i.computeVertexNormals(),i}function Ws(r,e,t,n=144){const i=Zu(r,n,t),s=ay(r,n,e,!0);i.holes.push(s);const o=new sr(i);return o.rotateX(-Math.PI/2),o.computeVertexNormals(),o}function fo(r,e=1,t=144){const n=[];for(let i=0;i<t;i+=1){const s=i/t*Math.PI*2,o=ly(s,r)*e;n.push([Math.cos(s)*o,Math.sin(s)*o])}return n}function Zu(r,e,t){const n=new Yl;return fo(r,t,e).forEach(([s,o],a)=>{a===0?n.moveTo(s,o):n.lineTo(s,o)}),n.closePath(),n}function ay(r,e,t,n=!1){const i=fo(r,t,e),s=n?i.reverse():i,o=new ul;return s.forEach(([a,c],h)=>{h===0?o.moveTo(a,c):o.lineTo(a,c)}),o.closePath(),o}function ly(r,e){const t=Math.sin(r*3+.4)*.052,n=Math.cos(r*5-.8)*.038,i=Math.sin(r*9+1.7)*.018,s=Math.exp(-Math.pow(ua(r,Math.PI*.5),2)/.28)*.09,o=Math.exp(-Math.pow(ua(r,Math.PI*.96),2)/.18)*-.08,a=Math.exp(-Math.pow(ua(r,Math.PI*1.48),2)/.22)*.045;return e*(.92+t+n+i+s+o+a)}function ua(r,e){return Math.atan2(Math.sin(r-e),Math.cos(r-e))}function Yh(r,e,t=1){const n=new Yl,i=28;for(let o=0;o<i;o+=1){const a=o/i*Math.PI*2,c=Math.cos(a)*r*.5,h=Math.sin(a)*e*.5,f=.88+Ce(t*71+o*3.19)*.22,l=c*f,u=h*f;o===0?n.moveTo(l,u):n.lineTo(l,u)}n.closePath();const s=new sr(n);return s.rotateX(-Math.PI/2),s.computeVertexNormals(),s}function cy(){return new Pt({transparent:!0,depthWrite:!1,uniforms:{time:{value:0},deep:{value:new fe(409190)},shallow:{value:new fe(3721171)},sun:{value:new fe(16773560)}},vertexShader:`
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
    `})}function $h(r="round"){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");if(t.clearRect(0,0,64,64),r==="petal"){t.translate(32,32),t.rotate(-.55);const i=t.createRadialGradient(-5,-3,3,0,0,24);i.addColorStop(0,"rgba(255, 244, 247, 1)"),i.addColorStop(.55,"rgba(255, 178, 188, 0.88)"),i.addColorStop(1,"rgba(255, 178, 188, 0)"),t.fillStyle=i,t.beginPath(),t.ellipse(0,0,22,10,0,0,Math.PI*2),t.fill()}else{const i=t.createRadialGradient(32,32,2,32,32,30);i.addColorStop(0,"rgba(255, 255, 220, 1)"),i.addColorStop(.42,"rgba(199, 255, 138, 0.85)"),i.addColorStop(1,"rgba(199, 255, 138, 0)"),t.fillStyle=i,t.fillRect(0,0,64,64)}const n=new ds(e);return n.colorSpace=Et,n.needsUpdate=!0,n}function da({inner:r,outer:e,colorA:t,colorB:n,opacity:i=.5,noise:s=.2,animated:o=!1}){return new Pt({transparent:!0,depthWrite:!1,uniforms:{inner:{value:r},outer:{value:e},colorA:{value:new fe(t)},colorB:{value:new fe(n)},opacity:{value:i},noiseAmount:{value:s},time:{value:0},animated:{value:o?1:0}},vertexShader:`
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
    `})}function hy(r,e=256,t=800){const n=document.createElement("canvas");n.width=e,n.height=e;const i=n.getContext("2d");i.fillStyle=r[0],i.fillRect(0,0,e,e);for(let s=0;s<t;s+=1){i.fillStyle=r[Math.floor(Ce(s*11.3)*r.length)];const o=Ce(s*17.1)*e,a=Ce(s*23.7)*e,c=.7+Ce(s*31.1)*2.5;i.globalAlpha=.08+Ce(s*7.5)*.12,i.beginPath(),i.arc(o,a,c,0,Math.PI*2),i.fill()}return i.globalAlpha=1,new ds(n)}function uy(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,r,r);n.addColorStop(0,"#d1a869"),n.addColorStop(.45,"#f0d392"),n.addColorStop(1,"#b9894e"),t.fillStyle=n,t.fillRect(0,0,r,r);for(let i=0;i<9e3;i+=1){const s=Ce(i*2.13)*r,o=Ce(i*3.79)*r,a=.45+Ce(i*5.11)*1.4,c=Ce(i*7.71);t.globalAlpha=.08+Ce(i*11.17)*.14,t.fillStyle=c>.54?"#fff1be":"#8f6538",t.beginPath(),t.arc(s,o,a,0,Math.PI*2),t.fill()}for(let i=0;i<90;i+=1){const s=Ce(i*17.3)*r,o=Ce(i*19.9)*r;t.globalAlpha=.05,t.strokeStyle="#7d5a35",t.lineWidth=1+Ce(i*23.5)*2,t.beginPath(),t.ellipse(s,o,14+Ce(i*29.1)*38,2+Ce(i*31.7)*6,Ce(i*37.1)*Math.PI,0,Math.PI*2),t.stroke()}return t.globalAlpha=1,new ds(e)}function dy(r){const e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d");t.fillStyle="#1e4d21",t.fillRect(0,0,r,r);for(let n=0;n<24e3;n+=1){const i=Ce(n*2.37)*r,s=Ce(n*5.81)*r,o=2+Ce(n*7.61)*9,a=-Math.PI/2+(Ce(n*11.43)-.5)*.9,c=Ce(n*13.17);t.globalAlpha=.06+Ce(n*17.77)*.16,t.strokeStyle=c>.68?"#76a84b":c>.32?"#2e6d2b":"#102f18",t.lineWidth=.55+Ce(n*19.21)*1.1,t.beginPath(),t.moveTo(i,s),t.lineTo(i+Math.cos(a)*o,s+Math.sin(a)*o),t.stroke()}for(let n=0;n<520;n+=1){const i=Ce(n*23.31)*r,s=Ce(n*31.27)*r,o=6+Ce(n*41.13)*22;t.globalAlpha=.035,t.fillStyle=Ce(n*47.4)>.55?"#669c46":"#0d2815",t.beginPath(),t.ellipse(i,s,o,o*(.25+Ce(n*53.3)*.4),Ce(n*59.7)*Math.PI,0,Math.PI*2),t.fill()}return t.globalAlpha=1,new ds(e)}function Ce(r){return Math.sin(r*999.91)*43758.5453%1+(Math.sin(r*999.91)*43758.5453<0?1:0)}class fy{constructor(e){this.world=e,this.clouds=[],this.sunDisk=null}build(){this.createSkyDome(),this.createClouds()}createSkyDome(){const e=new Bn(Yt*3.2,48,24),t=new Pt({side:$t,uniforms:{zenith:{value:new fe(5148391)},upper:{value:new fe(9427967)},horizon:{value:new fe(16760963)},low:{value:new fe(10743778)}},vertexShader:`
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
      `}),n=new ne(e,t);n.name="MedievalIslandSkyDome",this.world.scene.add(n);const i=new De({color:16758127,transparent:!0,opacity:.78,depthWrite:!1});this.sunDisk=new ne(new ao(18,48),i),this.sunDisk.name="CinematicSunDisk",this.sunDisk.position.set(-162,58,-138),this.sunDisk.lookAt(0,22,0),this.world.scene.add(this.sunDisk)}createClouds(){const e=cn.high.clouds;for(let t=0;t<e;t+=1){const n=new Pe;n.name=`Cloud_${t}`;const i=new De({color:t%4===0?16767426:16777215,transparent:!0,opacity:.58,depthWrite:!1}),s=6+t%4,o=[];for(let l=0;l<s;l+=1){const u=new Ai(3.2+l%3*.55,2),d=new Be().compose(new C((l-s/2)*3.1,Math.sin(l*1.8)*.7,Math.cos(l*2.1)*1.65),new At,new C(1.55+l%2*.28,.46,.84+l%3*.12));u.applyMatrix4(d),o.push(u)}const a=ec(o,!1),c=new ne(a,i);c.name=`Cloud_${t}_merged_lobes`,n.add(c);const h=t/e*Math.PI*2,f=132+t%5*26;n.position.set(Math.cos(h)*f,58+t%4*6,Math.sin(h)*f),n.rotation.y=h,n.scale.setScalar(.9+t%5*.12),this.world.scene.add(n),this.clouds.push(n)}this.applyQuality()}applyQuality(){const e=this.world.getQualityProfile();for(let t=0;t<this.clouds.length;t+=1)this.clouds[t].visible=t<e.clouds}update(e,t){this.sunDisk&&(this.sunDisk.material.opacity=.68+Math.sin(t*.18)*.06);for(let n=0;n<this.clouds.length;n+=1){const i=this.clouds[n];i.rotation.y+=e*(.01+n*35e-5),i.position.x+=Math.sin(t*.035+n)*e*.1,i.position.z+=Math.cos(t*.025+n*.7)*e*.06}}}const py=["oak","blossom","cypress"];class my{constructor(e){this.world=e,this.treeEntries=[],this.grassEntries=[],this.treeMeshes={},this.grassMesh=null,this.flowerMeshes={},this.leafCloud=null,this.fireflies=null,this.dummy=new Qe,this.windFrame=0,this.particleFrame=0,this.windSamples={grassUpdates:0,treeUpdates:0,windCadence:2,particleCadence:1}}build(){this.prepareTreeEntries(),this.prepareGrassEntries(),this.createTreeInstances(),this.createGrassInstances(),this.createFlowerInstances(),this.createFallingLeaves(),this.createFireflies(),this.applyQuality()}applyQuality(){const e=this.world.getQualityProfile();this.writeTreeInstances(e.trees),this.writeGrassInstances(e.grassTufts),this.writeFlowerInstances(Math.floor(e.grassTufts*.42)),this.leafCloud?.geometry.setDrawRange(0,e.leaves),this.fireflies?.geometry.setDrawRange(0,e.fireflies)}prepareTreeEntries(){const e=cn.high.trees,t=Math.ceil(e/na.length);for(let n=0;n<na.length&&this.treeEntries.length<e;n+=1){const i=na[n],s=Math.min(e-this.treeEntries.length,t+(i.kind==="campus"?6:i.kind==="security"?5:i.kind==="grove"?3:0));let o=0;for(let a=0;a<180&&o<s;a+=1){const c=n*1e3+a,h=i.center[0]+(Ce(c*7.13)-.5)*i.size[0],f=i.center[1]+(Ce(c*9.41)-.5)*i.size[1],l=Math.hypot(h,f);l>xt*.88||l<18||this.world.isClearForProp(h,f,3.4)&&(this.treeEntries.push({x:h,z:f,rotation:Ce(c*13.3)*Math.PI*2,scale:.8+Ce(c*17.1)*.58,variant:gy(i,c)}),o+=1)}}}prepareGrassEntries(){const e=cn.high.grassTufts;for(let t=0;t<e*4&&this.grassEntries.length<e;t+=1){const n=Math.sqrt(Ce(t*8.1))*xt*.78,i=Ce(t*5.3)*Math.PI*2,s=Math.cos(i)*n,o=Math.sin(i)*n;this.world.isClearForProp(s,o,1.1)&&this.grassEntries.push({x:s,z:o,rotation:Ce(t*19.4)*Math.PI*2,scale:.55+Ce(t*22.9)*.9})}}createTreeInstances(){const e=cn.high.trees,t=new Jt(.22,.34,2.8,7),n=new Ai(1.35,1),i=new Ai(1.46,1),s=new Sn(1.08,3.2,7);this.treeMeshes.trunk=new nn(t,this.world.materials.wood,e),this.treeMeshes.oak=new nn(n,new ze({color:6262594,roughness:.88}),e),this.treeMeshes.blossom=new nn(i,new ze({color:15775165,roughness:.82}),e),this.treeMeshes.cypress=new nn(s,new ze({color:2976068,roughness:.9}),e);for(const[o,a]of Object.entries(this.treeMeshes))a.name=`FOLIAGE_${o}_instances`,a.castShadow=!1,a.receiveShadow=o==="trunk",a.instanceMatrix.setUsage(Ji),this.world.scene.add(a),this.world.decor.push({type:"foliageInstances",mesh:a})}createGrassInstances(){const e=new Sn(.08,.7,4),t=new ze({color:8825164,roughness:.92,metalness:0});this.grassMesh=new nn(e,t,cn.high.grassTufts),this.grassMesh.name="FOLIAGE_grass_instances",this.grassMesh.castShadow=!1,this.grassMesh.receiveShadow=!1,this.grassMesh.instanceMatrix.setUsage(Ji),this.world.scene.add(this.grassMesh),this.world.decor.push({type:"grassInstances",mesh:this.grassMesh})}createFlowerInstances(){const e=Math.floor(cn.high.grassTufts*.42),t=new Sn(.045,.42,4),n=new Ai(.12,0);this.flowerMeshes.stem=new nn(t,new ze({color:5213509,roughness:.92}),e),this.flowerMeshes.pink=new nn(n,new De({color:15901876}),e),this.flowerMeshes.blue=new nn(n,new De({color:8444159}),e);for(const[i,s]of Object.entries(this.flowerMeshes))s.name=`FOLIAGE_flower_${i}_instances`,s.castShadow=!1,s.receiveShadow=!1,s.instanceMatrix.setUsage(Ji),this.world.scene.add(s),this.world.decor.push({type:"flowerInstances",mesh:s})}writeTreeInstances(e,t=0){const n={trunk:0,oak:0,blossom:0,cypress:0},i=Math.min(e,this.treeEntries.length);for(let s=0;s<i;s+=1){const o=this.treeEntries[s];this.writeTrunk(o,n.trunk++,t),this.writeCrown(o,n[o.variant]++,o.variant,t)}for(const s of["trunk",...py])this.treeMeshes[s].count=n[s],this.treeMeshes[s].instanceMatrix.needsUpdate=!0}writeTrunk(e,t,n=0){const i=Math.sin(n*.9+e.x*.035+e.z*.02)*.018;this.dummy.position.set(e.x,1.32*e.scale,e.z),this.dummy.rotation.set(i,e.rotation,i*.65),this.dummy.scale.set(e.scale*.78,e.scale*.96,e.scale*.78),this.dummy.updateMatrix(),this.treeMeshes.trunk.setMatrixAt(t,this.dummy.matrix)}writeCrown(e,t,n,i=0){const s=Math.sin(i*1.1+e.x*.04+e.z*.03)*.05;this.dummy.position.set(e.x,n==="cypress"?3*e.scale:3.08*e.scale,e.z),this.dummy.rotation.set(s*.42,e.rotation+s*.18,s),n==="cypress"?this.dummy.scale.set(e.scale*.95,e.scale*1.05,e.scale*.95):this.dummy.scale.set(e.scale*1.16,e.scale*.92,e.scale*1.16),this.dummy.updateMatrix(),this.treeMeshes[n].setMatrixAt(t,this.dummy.matrix)}writeGrassInstances(e,t=0){const n=Math.min(e,this.grassEntries.length);for(let i=0;i<n;i+=1){const s=this.grassEntries[i],o=Math.sin(t*1.7+s.x*.11+s.z*.07)*.16;this.dummy.position.set(s.x,.34*s.scale,s.z),this.dummy.rotation.set(o*.32,s.rotation,o),this.dummy.scale.set(s.scale,s.scale,s.scale),this.dummy.updateMatrix(),this.grassMesh.setMatrixAt(i,this.dummy.matrix)}this.grassMesh.count=n,this.grassMesh.instanceMatrix.needsUpdate=!0}writeFlowerInstances(e){const t=Math.min(e,this.grassEntries.length);let n=0,i=0,s=0;for(let o=0;o<t;o+=1){if(o%3===0)continue;const a=this.grassEntries[o],c=.4*a.scale;this.dummy.position.set(a.x,c*.5,a.z),this.dummy.rotation.set(0,a.rotation,0),this.dummy.scale.set(a.scale*.82,a.scale,a.scale*.82),this.dummy.updateMatrix(),this.flowerMeshes.stem.setMatrixAt(n++,this.dummy.matrix);const h=o%2===0?this.flowerMeshes.pink:this.flowerMeshes.blue,f=o%2===0?i++:s++;this.dummy.position.set(a.x,c+.18,a.z),this.dummy.rotation.set(0,a.rotation,0),this.dummy.scale.set(a.scale,a.scale,a.scale),this.dummy.updateMatrix(),h.setMatrixAt(f,this.dummy.matrix)}this.flowerMeshes.stem.count=n,this.flowerMeshes.pink.count=i,this.flowerMeshes.blue.count=s;for(const o of Object.values(this.flowerMeshes))o.instanceMatrix.needsUpdate=!0}createFallingLeaves(){const e=cn.high.leaves,t=new ut,n=new Float32Array(e*3),i=[];for(let o=0;o<e;o+=1){const a=Math.sqrt(Ce(o*1.7))*xt*.72,c=Ce(o*2.3)*Math.PI*2;n[o*3]=Math.cos(c)*a,n[o*3+1]=4+Ce(o*3.1)*14,n[o*3+2]=Math.sin(c)*a,i.push(Ce(o*4.4)*Math.PI*2)}t.setAttribute("position",new gt(n,3));const s=new cl(t,this.world.materials.leaf);s.name="FOLIAGE_falling_leaves",this.world.scene.add(s),this.leafCloud={mesh:s,geometry:t,phases:i}}createFireflies(){const e=cn.high.fireflies,t=new ut,n=new Float32Array(e*3),i=[];for(let o=0;o<e;o+=1){const a=Math.sqrt(Ce(o*4.9))*xt*.56,c=Ce(o*6.1)*Math.PI*2;n[o*3]=Math.cos(c)*a,n[o*3+1]=1.1+Ce(o*7.2)*3.2,n[o*3+2]=Math.sin(c)*a,i.push(Ce(o*8.3)*Math.PI*2)}t.setAttribute("position",new gt(n,3));const s=new cl(t,this.world.materials.firefly);s.name="FOLIAGE_fireflies",this.world.scene.add(s),this.fireflies={mesh:s,geometry:t,phases:i}}update(e,t){const n=this.world.getQualityProfile();if(this.updateWind(t),this.particleFrame=(this.particleFrame+1)%(n.particleCadence||1),this.particleFrame===0&&this.updateLeaves(e*(n.particleCadence||1)),this.fireflies){if(this.particleFrame!==0)return;const i=this.fireflies.geometry.attributes.position,s=Math.min(n.fireflies,i.count);for(let o=0;o<s;o+=1){const a=this.fireflies.phases[o];i.setY(o,i.getY(o)+Math.sin(t*1.4+a)*.002*(n.particleCadence||1))}i.needsUpdate=!0,this.fireflies.mesh.material.opacity=.5+Math.sin(t*1.6)*.18}}updateWind(e){const t=this.world.getQualityProfile(),n=t.windCadence||2;this.windSamples.windCadence=n,this.windSamples.particleCadence=t.particleCadence||1,this.windFrame=(this.windFrame+1)%n,this.windFrame===0&&(this.writeTreeInstances(t.trees,e),this.writeGrassInstances(t.grassTufts,e),this.windSamples.treeUpdates+=1,this.windSamples.grassUpdates+=1)}updateLeaves(e){if(!this.leafCloud)return;const t=this.leafCloud.geometry.attributes.position,n=this.world.getQualityProfile(),i=Math.min(n.leaves,t.count);for(let s=0;s<i;s+=1){const o=this.leafCloud.phases[s];t.setX(s,t.getX(s)+Math.sin(o)*e*.18),t.setY(s,t.getY(s)-e*(.42+Ce(s*3.6)*.36)),t.getY(s)<.35&&t.setY(s,7+Ce(s*5.2)*10)}t.needsUpdate=!0}}function gy(r,e){const t=Ce(e*11.31);return r.kind==="security"||r.kind==="coast"?t>.34?"cypress":"oak":r.kind==="campus"||r.kind==="grove"?t>.2?"blossom":"oak":t>.3?"oak":"blossom"}class _y{constructor(e){this.world=e,this.group=null,this.counterTexture=null,this.counterMaterial=null,this.count=0}build(){const e=this.world.zones.find(t=>t.id==="potato");e&&(this.group=new Pe,this.group.name="ZONE_potato_voxel_farm",this.group.position.copy(e.position),this.group.rotation.y=e.rotation||0,this.world.scene.add(this.group),this.addField(),this.addCounter(),this.addSummonPad())}addField(){const e=new Qe,t=[],n=[],i=[];for(let s=-3;s<=3;s+=1)for(let o=-4;o<=4;o+=1){const a=o===0;(a?n:t).push({x:o*1.34,y:.16,z:s*1.34,rotation:0,scale:[1,1,1]}),!a&&(s+o)%2===0&&i.push({x:o*1.34,y:.68,z:s*1.34,rotation:Ce((s+8)*(o+10))*Math.PI*2,scale:[1,1,1]})}this.addInstances("PotatoSoilBlocks",new ht(1.25,.34,1.25),this.world.materials.darkWood,t,e),this.addInstances("PotatoWaterBlocks",new ht(1.25,.2,1.25),this.world.materials.shallow,n,e),this.addInstances("PotatoCropBlocks",new ht(.42,.62,.42),this.world.materials.crop,i,e),this.addFence()}addFence(){const e=new Qe,t=[],n=[];for(let i=-6;i<=6;i+=1.5)t.push({x:i,y:.8,z:-5.5,rotation:0,scale:[1,1,1]}),t.push({x:i,y:.8,z:5.5,rotation:0,scale:[1,1,1]}),i<6&&(n.push({x:i+.75,y:1.05,z:-5.5,rotation:Math.PI/2,scale:[1,1,1]}),n.push({x:i+.75,y:1.05,z:5.5,rotation:Math.PI/2,scale:[1,1,1]}));for(let i=-4.5;i<=4.5;i+=1.5)t.push({x:-6.4,y:.8,z:i,rotation:Math.PI/2,scale:[1,1,1]}),t.push({x:6.4,y:.8,z:i,rotation:Math.PI/2,scale:[1,1,1]}),i<4.5&&(n.push({x:-6.4,y:1.05,z:i+.75,rotation:0,scale:[1,1,1]}),n.push({x:6.4,y:1.05,z:i+.75,rotation:0,scale:[1,1,1]}));this.addInstances("PotatoFencePosts",new ht(.22,1.35,.22),this.world.materials.wood,t,e),this.addInstances("PotatoFenceRails",new ht(.14,.16,1.45),this.world.materials.wood,n,e)}addInstances(e,t,n,i,s){if(!i.length)return;const o=new nn(t,n,i.length);o.name=e,o.castShadow=!1,o.receiveShadow=!0,i.forEach((a,c)=>{s.position.set(a.x,a.y,a.z),s.rotation.set(0,a.rotation||0,0),s.scale.set(a.scale[0],a.scale[1],a.scale[2]),s.updateMatrix(),o.setMatrixAt(c,s.matrix)}),o.instanceMatrix.needsUpdate=!0,this.group.add(o)}addCounter(){this.counterTexture=Kh(this.count),this.counterMaterial=new De({map:this.counterTexture,transparent:!0,side:Ot});const e=new ne(new ui(5.35,1.72),this.counterMaterial);e.name="PotatoCounterRoadFacing",e.position.set(0,2.25,7.2),this.group.add(e);const t=new ne(new ht(5.7,2.05,.2),this.world.materials.darkWood);t.position.set(0,2.25,7.08);const n=new ne(new ht(.18,2.7,.18),this.world.materials.wood);n.position.set(-2.95,1.45,7.02);const i=n.clone();i.position.x=2.95,this.group.add(t,n,i)}addSummonPad(){const e=new ne(new Jt(1.6,1.8,.2,6),new ze({color:8191922,emissive:1456166,roughness:.62,metalness:.08}));e.name="PotatoSummonPad",e.position.set(0,.28,9.45),this.group.add(e)}setPotatoCount(e){if(this.count=e,!this.counterTexture)return;const t=Kh(e);this.counterMaterial.map=t,this.counterMaterial.needsUpdate=!0,this.counterTexture.dispose(),this.counterTexture=t}spawnPotato(){const e=this.world.zones.find(i=>i.id==="potato");if(!e)return null;const t=new ne(new ht(.75,.55,.55),this.world.materials.potato),n=new C((Math.random()-.5)*7.2,2.5,(Math.random()-.5)*5.8).applyAxisAngle(new C(0,1,0),e.rotation||0);return t.position.copy(e.position).add(n),t.rotation.set(Math.random()*.4,Math.random()*Math.PI*2,Math.random()*.4),t.scale.setScalar(.8+Math.random()*.35),this.world.scene.add(t),this.world.potatoes.push({mesh:t,life:22}),t}update(e){for(let t=this.world.potatoes.length-1;t>=0;t-=1){const n=this.world.potatoes[t];n.life-=e,n.mesh.rotation.y+=e*1.2,n.mesh.position.y+=Math.sin(n.life*6)*e*.2,n.life<=0&&(this.world.scene.remove(n.mesh),this.world.potatoes.splice(t,1))}}}function Kh(r){const e=document.createElement("canvas");e.width=512,e.height=192;const t=e.getContext("2d");t.fillStyle="#2a160c",t.fillRect(0,0,e.width,e.height);for(let i=0;i<e.width;i+=32)t.fillStyle=i%64===0?"#4b2a15":"#3a1f11",t.fillRect(i,0,28,e.height);t.strokeStyle="#d7a357",t.lineWidth=10,t.strokeRect(18,18,e.width-36,e.height-36),t.fillStyle="#f7e1a3",t.textAlign="center",t.font="800 34px Arial",t.fillText("POTATOES",e.width/2,75),t.font="900 64px Arial",t.fillText(String(r),e.width/2,145);const n=new ds(e);return n.anisotropy=6,n}class xy{constructor(e){this.world=e,this.group=new Pe,this.group.name="PROP_Static_Decor",this.items=[]}build(){this.world.scene.add(this.group),this.placeRoadLanterns(),this.placeScenicProps(),this.placeShoreRocks(),Pn(this.group,{namePrefix:"PROP_batch"}),this.items=[...this.group.children]}placeRoadLanterns(){let e=0;const t=Math.floor(this.world.getQualityProfile().props*.28);for(const n of this.world.roadSegments){if(e>=t)break;const[i,s,o,a,c]=n;if(a<18)continue;const h=Math.max(1,Math.floor(a/22));for(let f=0;f<h&&e<t;f+=1){const l=(f+.5)/h-.5,u=Ce(e*4.1)>.5?1:-1,d=i+Math.sin(c)*a*l+Math.cos(c)*(o*.92)*u,p=s+Math.cos(c)*a*l-Math.sin(c)*(o*.92)*u;if(!this.world.terrain.containsPoint(d,p,12))continue;const _=this.createLantern();_.position.set(d,.2,p),_.rotation.y=c+Math.PI*(u>0?.5:-.5),this.group.add(_),this.items.push(_),e+=1}}}placeScenicProps(){const e=u=>Qn.find(d=>d.id===u)?.position||[0,0,0],t=e("landing"),n=e("education"),i=e("security"),s=e("projects"),o=e("contact"),a=e("cv"),c=e("drift"),h=e("data-pier"),f=e("potato"),l=[["EnvBench",t[0]-16,t[2]+7,-.35,.92],["EnvBench",t[0]+18,t[2]+10,.42,.92],["EnvCrate",t[0]+10,t[2]-13,.4,.82],["EnvBarrel",t[0]-20,t[2]-8,-.6,.78],["EnvBench",n[0]-24,n[2]-4,.98,.9],["EnvBench",n[0]+20,n[2]-16,.36,.86],["EnvBench",n[0]+16,n[2]+20,-.8,.86],["EnvCrate",n[0]-29,n[2]+12,.2,.78],["EnvBarrel",n[0]+27,n[2]+18,-.2,.78],["EnvCrate",i[0]-18,i[2]+2,.2,.9],["EnvCrate",i[0]+14,i[2]-7,-.4,.86],["EnvBarrel",i[0]-10,i[2]-16,.32,.8],["EnvBarrel",i[0]+22,i[2]+10,-.18,.8],["EnvCrate",s[0]+16,s[2]-10,.38,.88],["EnvBarrel",s[0]+22,s[2]-4,-.4,.82],["EnvCrate",s[0]-18,s[2]+12,.12,.82],["EnvBarrel",s[0]-13,s[2]+18,-.34,.78],["EnvCrate",o[0]-12,o[2]+20,.2,.92],["EnvBarrel",o[0]-5,o[2]+25,-.2,.86],["EnvBench",o[0]-19,o[2]-8,-.85,.86],["EnvBench",a[0]-16,a[2]+10,.18,.84],["EnvCrate",c[0]-20,c[2]+14,.34,.84],["EnvBarrel",c[0]+18,c[2]-8,-.22,.8],["EnvCrate",h[0]-10,h[2]+8,.34,.84],["EnvBarrel",h[0]+4,h[2]-10,-.22,.8],["EnvCrate",f[0]+16,f[2]+6,.34,.84],["EnvBarrel",f[0]-15,f[2]+8,-.22,.8]];for(const[u,d,p,_,g]of l)this.world.isClearForProp(d,p,u.includes("Bench")?2.1:1.5)&&this.addPlacedProp({name:u,x:d,z:p,rotation:_,scale:g})}placeShoreRocks(){const e=this.world.landscapeQuality==="low"?22:this.world.landscapeQuality==="medium"?30:38;for(let t=0;t<e;t+=1){const n=t/e*Math.PI*2+(Ce(t*6.4)-.5)*.18,i=xt*(.88+Ce(t*11.2)*.1),s=Math.cos(n)*i,o=Math.sin(n)*i;if(this.world.roads.isNear(s,o,6.5))continue;const a=this.createRock();a.position.set(s,0,o),a.rotation.y=Ce(t*3.7)*Math.PI*2,a.scale.setScalar(.72+Ce(t*7.3)*1.25),this.group.add(a),this.groundObject(a,-.045),this.items.push(a)}}addPlacedProp({name:e,x:t,z:n,rotation:i,scale:s}){if(e.includes("Bench")){const a=new ne(new ht(2.85*s,.035,1.1*s),this.world.materials.paleStone);a.name="PROP_BenchStonePad",a.position.set(t,.085,n),a.rotation.y=i,a.receiveShadow=!0,this.group.add(a),this.items.push(a)}const o=this.createFallbackProp(e);o.position.set(t,.12,n),o.rotation.y=i,o.scale.setScalar(s),this.group.add(o),this.groundObject(o,.035),this.items.push(o)}groundObject(e,t=.04){e.updateMatrixWorld(!0);const n=new kn().setFromObject(e);Number.isFinite(n.min.y)&&(e.position.y+=t-n.min.y)}createLantern(){const e=new Pe,t=new ne(new Jt(.08,.12,3.2,8),this.world.materials.darkWood);t.position.y=1.6;const n=new ne(new ht(.9,.08,.08),this.world.materials.darkWood);n.position.set(.34,3,0);const i=new ne(new Bn(.22,8,6),this.world.materials.warmGlow);return i.position.set(.82,2.75,0),t.castShadow=!1,n.castShadow=!1,i.castShadow=!1,e.add(t,n,i),e}createFallbackProp(e){if(e.includes("Barrel"))return new ne(new Jt(.45,.5,1.05,10),this.world.materials.wood);if(e.includes("Crate"))return new ne(new ht(1,1,1),this.world.materials.darkWood);if(e.includes("Bench")){const t=new Pe,n=new ne(new ht(1.9,.18,.45),this.world.materials.wood);return n.position.y=.55,t.add(n),t}return this.createRock()}createRock(){return new ne(new Ai(.9,1),this.world.materials.stone)}}const zr={ring:{shoulder:1.6,curb:.28,line:15783031},avenue:{shoulder:1.3,curb:.26,line:15653286},street:{shoulder:1.1,curb:.22,line:14276295},plaza:{shoulder:1.05,curb:.3,line:15984573},security:{shoulder:1.25,line:6871295},stunt:{shoulder:1.4,curb:.28,line:16751469},dirt:{shoulder:1.8,line:9265976},bridge:{shoulder:1.4,curb:.22,line:15265264}},Zh={ring:0,avenue:1,street:2,plaza:3,security:3,dirt:2,stunt:3,bridge:4};class vy{constructor(e){this.world=e,this.segments=_l,this.materialCache=new Map,this.roadGroup=new Pe,this.roadGroup.name="ROAD_Network"}build(){this.world.scene.add(this.roadGroup);for(const e of Ql)this.addPath(e);Pn(this.roadGroup,{namePrefix:"ROAD_batch"})}addPath(e){this.addPathRibbon(e);for(const t of e.points)this.addNode(t,e)}addPathRibbon(e){const t=zr[e.hierarchy]||zr.street,n=e.width,i=Zh[e.hierarchy]??1,s=.068+i*.001,o=.104+i*.006,a=e.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadShoulder,c=e.hierarchy==="dirt"?this.world.materials.dirtRoad:e.hierarchy==="security"?this.world.materials.securityRoad:e.hierarchy==="plaza"?this.world.materials.plazaRoad:this.world.materials.stoneRoad,h=new ne(fa(e.points,n+t.shoulder*2,e.closed,s,9),this.offsetMaterial(a,1+i));h.name=`ROAD_${e.id}_shoulder`,h.renderOrder=1+i,h.receiveShadow=!0,this.roadGroup.add(h);const f=new ne(fa(e.points,n,e.closed,o,9),this.offsetMaterial(c,3+i));if(f.name=`ROAD_${e.id}_surface`,f.renderOrder=3+i,f.receiveShadow=!0,this.roadGroup.add(f),e.hierarchy!=="dirt")for(const _ of[-1,1]){const g=new ne(fa(e.points,t.curb||.22,e.closed,o+.046,9,(n/2+(t.curb||.22)*.66)*_),this.offsetMaterial(this.world.materials.roadCurb,6+i));g.name=`ROAD_${e.id}_curb`,g.renderOrder=6+i,this.roadGroup.add(g)}const l=this.cachedLineMaterial(t.line),u=ju(e.points,e.closed),d=u.getLength(),p=e.hierarchy==="stunt"?8.5:12;for(let _=n*1.35;_<d-n*1.35;_+=p){const g=_/d,m=u.getPointAt(g),x=u.getTangentAt(g),v=Math.atan2(x.x,x.z),y=this.createRoadPlane(.38,3.2,l,8+i,v);y.position.set(m.x,o+.034,m.z),this.roadGroup.add(y)}}addNode(e,t){const n=zr[t.hierarchy]||zr.street,i=t.width*.78+n.shoulder*.42,s=Zh[t.hierarchy]??1,o=.086+s*.003,a=.142+s*.007,c=t.hierarchy==="dirt"?this.world.materials.sand:this.world.materials.roadShoulder,h=t.hierarchy==="dirt"?this.world.materials.dirtRoad:t.hierarchy==="security"?this.world.materials.securityRoad:t.hierarchy==="plaza"?this.world.materials.plazaRoad:this.world.materials.stoneRoad,f=this.cleanCapMaterial(c),l=this.cleanCapMaterial(h),u=new ne(new Jt((i+n.shoulder*.9)/2,(i+n.shoulder*.9)/2,.035,18),f);u.name=`ROAD_${t.id}_junction`,u.position.set(e[0],o,e[1]),u.receiveShadow=!1,u.renderOrder=10+s,this.roadGroup.add(u);const d=new ne(new Jt(i/2,i/2,.035,18),l);d.name=`ROAD_${t.id}_junction_cap`,d.position.set(e[0],a+.034,e[1]),d.receiveShadow=!1,d.renderOrder=12+s,this.roadGroup.add(d)}createRoadPlane(e,t,n,i=1,s=0){const o=this.offsetMaterial(n,i),a=new ne(yy(e,t,s),o);return a.renderOrder=i,a}offsetMaterial(e,t){const n=`offset:${e.uuid}:${t}`;if(this.materialCache.has(n))return this.materialCache.get(n);const i=e.clone();return i.polygonOffset=!0,i.polygonOffsetFactor=-t,i.polygonOffsetUnits=-t,this.materialCache.set(n,i),i}cleanCapMaterial(e){const t=`cap:${e.uuid}`;if(this.materialCache.has(t))return this.materialCache.get(t);const n=new De({color:e.color?e.color.clone():new fe(6248525),map:e.map||null,transparent:e.transparent,opacity:e.opacity??1,depthWrite:e.depthWrite??!0});return n.polygonOffset=!0,n.polygonOffsetFactor=-14,n.polygonOffsetUnits=-14,this.materialCache.set(t,n),n}cachedLineMaterial(e){const t=`line:${e}`;if(this.materialCache.has(t))return this.materialCache.get(t);const n=this.world.materials.roadLine.clone();return n.color.setHex(e),this.materialCache.set(t,n),n}isNear(e,t,n=0){return _l.some(([i,s,o,a,c])=>{const h=e-i,f=t-s,l=Math.cos(c)*h-Math.sin(c)*f,u=Math.sin(c)*h+Math.cos(c)*f;return Math.abs(l)<=o/2+n&&Math.abs(u)<=a/2+n})}}function yy(r,e,t){const n=r/2,i=e/2,s=Math.cos(t),o=-Math.sin(t),a=Math.sin(t),c=Math.cos(t),h=[[-n,-i],[n,-i],[n,i],[-n,i]],f=new Float32Array(h.flatMap(([u,d])=>[s*u+a*d,0,o*u+c*d])),l=new ut;return l.setAttribute("position",new gt(f,3)),l.setAttribute("uv",new gt(new Float32Array([0,0,1,0,1,1,0,1]),2)),l.setIndex([0,2,1,0,3,2]),l.computeVertexNormals(),l}function ju(r,e){const t=r.map(([i,s])=>new C(i,0,s)),n=new ql(t,e,"centripetal",.35);return n.arcLengthDivisions=Math.max(64,r.length*18),n.updateArcLengths(),n}function fa(r,e,t,n,i=8,s=0){const o=ju(r,t),a=Math.max(12,(t?r.length:r.length-1)*i),c=(a+1)*2,h=new Float32Array(c*3),f=new Float32Array(c*2),l=[];let u=null,d=0;for(let _=0;_<=a;_+=1){const g=_/a,m=o.getPointAt(g),x=o.getTangentAt(g).normalize(),v=x.z,y=-x.x,E=m.x+v*s,T=m.z+y*s;u&&(d+=Math.hypot(E-u.x,T-u.z)),u={x:E,z:T};const R=_*2,S=R+1;jh(h,R,E-v*e*.5,n,T-y*e*.5),jh(h,S,E+v*e*.5,n,T+y*e*.5),f[R*2]=d/9,f[R*2+1]=0,f[S*2]=d/9,f[S*2+1]=1,_<a&&l.push(R,R+2,S,S,R+2,S+2)}const p=new ut;return p.setAttribute("position",new gt(h,3)),p.setAttribute("uv",new gt(f,2)),p.setIndex(l),p.computeVertexNormals(),p}function jh(r,e,t,n,i){const s=e*3;r[s]=t,r[s+1]=n,r[s+2]=i}class Sy{constructor(e){this.world=e,this.animated=[],this.securityScanObjects=[],this.securityScanMaterials=[],this.lifeDummy=new Qe,this.lifeInstanceMeshes=[],this.lifeInstanceDirty=new Set,this.signAtlas=null,this.lifeItems={zonePulses:[],windBanners:[],whisperBeacons:[],terminalPulses:[]},this.lifeStats={zonePulses:0,windBanners:0,whisperBeacons:0,terminalPulses:0,visibleZonePulses:0,visibleWindBanners:0,visibleWhisperBeacons:0,visibleTerminalPulses:0,visibleTotal:0,motionSamples:0}}build(){this.createStartDiorama(),this.createEducationPlaza(),this.createSecurityLab(),this.createDistrictDressing(),this.createRouteGuidance(),this.createLivingSignals(),this.applyQuality()}update(e,t){for(const s of this.animated){if(s.instanceMesh){this.writeLifeInstance(s,t),this.lifeInstanceDirty.add(s.instanceMesh);continue}if(s.active!==!1)if(s.kind==="ring")s.mesh.rotation.z+=e*s.speed,s.mesh.material.opacity=s.baseOpacity+Math.sin(t*s.pulse+s.phase)*s.opacityRange;else if(s.kind==="float")s.mesh.position.y=s.baseY+Math.sin(t*s.speed+s.phase)*s.range,s.mesh.rotation.y+=e*s.rotationSpeed;else if(s.kind==="light")s.light.intensity=s.base+Math.sin(t*s.speed+s.phase)*s.range;else if(s.kind==="pulse"){const o=s.baseScale+Math.sin(t*s.speed+s.phase)*s.range;s.mesh.scale.setScalar(o),s.mesh.rotation.z+=e*s.rotationSpeed,s.mesh.material.opacity=s.baseOpacity+Math.sin(t*s.speed+s.phase)*s.opacityRange,this.lifeStats.motionSamples+=1}else s.kind==="banner"?(s.mesh.rotation.z=Math.sin(t*s.speed+s.phase)*s.range,s.mesh.scale.x=s.baseScale+Math.sin(t*s.speed*1.31+s.phase)*.08,this.lifeStats.motionSamples+=1):s.kind==="beacon"&&(s.mesh.position.y=s.baseY+Math.sin(t*s.speed+s.phase)*s.range,s.mesh.rotation.y+=e*s.rotationSpeed,s.mesh.material.opacity=s.baseOpacity+Math.sin(t*s.speed+s.phase)*s.opacityRange,this.lifeStats.motionSamples+=1)}for(const s of this.lifeInstanceDirty)s.instanceMatrix.needsUpdate=!0;this.lifeInstanceDirty.clear();const n=this.world.securityScan,i=n.active?1:n.complete?.55:0;for(const s of this.securityScanMaterials)s.opacity=.32+i*.42+Math.sin(t*8)*i*.12;for(const s of this.securityScanObjects)s.isLight?s.intensity=s.userData.baseIntensity+i*s.userData.boost+Math.sin(t*12)*i*.55:s.material&&(s.material.opacity=.48+i*.34,s.scale.setScalar(1+i*.24))}applyQuality(){const e=this.world.getQualityProfile().lifeSignals||{};this.applyLifeLimit("zonePulses",e.zonePulses),this.applyLifeLimit("windBanners",e.windBanners),this.applyLifeLimit("whisperBeacons",e.whisperBeacons),this.applyLifeLimit("terminalPulses",e.terminalPulses),this.lifeStats.visibleTotal=this.lifeStats.visibleZonePulses+this.lifeStats.visibleWindBanners+this.lifeStats.visibleWhisperBeacons+this.lifeStats.visibleTerminalPulses}applyLifeLimit(e,t){const n=this.lifeItems[e],i=Math.min(n.length,Number.isFinite(t)?t:n.length);let s=0;for(let a=0;a<n.length;a+=1){const c=n[a],h=a<i;c.entry.active=h,c.root&&(c.root.visible=h),c.entry.instanceMesh&&(this.writeLifeInstance(c.entry,0),c.entry.instanceMesh.instanceMatrix.needsUpdate=!0),h&&(s+=1)}const o=`visible${e[0].toUpperCase()}${e.slice(1)}`;this.lifeStats[o]=s}getLifeStats(){return{...this.lifeStats}}createStartDiorama(){const e=Vt("landing"),t=new Pe;t.name="SETPIECE_Start_Diorama",this.groundRect(t,e.position[0]+2,e.position[2]-4,27,18,this.world.materials.plazaRoad,.118,"StartLaunchPad"),this.box(t,e.position[0]+2,.18,e.position[2]-12.9,24,.04,.36,this.world.materials.glowBlue,0,"StartPadFrontGlow"),this.box(t,e.position[0]-11.4,.18,e.position[2]-4,.36,.04,15,this.world.materials.glow,0,"StartPadLeftGlow");const n=[[-7.5,-9.5,3.2,1.5,-.48],[-3.2,-11.2,3.1,1.5,-.22],[1.3,-11.8,3,1.5,.04],[5.8,-10.8,3.4,1.5,.26],[9.1,-7.8,3.5,1.5,.6],[-10.8,1.8,2.7,1.2,1.1],[11.2,4.5,2.9,1.2,-.9]];for(const[i,s,o,a,c]of n)this.box(t,e.position[0]+i,.13,e.position[2]+s,o,.08,a,this.world.materials.paleStone,c,"StartPaver");this.addLamp(t,e.position[0]-11.4,e.position[2]-10.5,16761706,3.1,"StartLampLeft"),this.addLamp(t,e.position[0]+14.2,e.position[2]-9.4,8191922,3,"StartLampRight"),this.addLamp(t,e.position[0]-8.5,e.position[2]+7.4,6871295,2.8,"StartLampRear"),this.addSign(t,"CLICK TO DRIVE","Portfolio Drive",e.position[0]+14.4,e.position[2]+5.8,-.88,8191922,3.4,"StartClickSign"),this.addSign(t,"FCCU","Education Grove",e.position[0]-20.5,e.position[2]+14,.74,10276863,2.6,"StartFccSign"),this.addSign(t,"SECURITY","Scanner Route",e.position[0]-24,e.position[2]-12,1.12,6871295,2.6,"StartSecuritySign"),this.addBench(t,e.position[0]-11.8,e.position[2]+4.5,.42,.92),this.addBench(t,e.position[0]+8.4,e.position[2]+11.2,-.72,.88),this.addPolishAsset(t,"EnvPolishInfoKiosk",e.position[0]+13,e.position[2]-2.2,-.72,.82),this.addPolishAsset(t,"EnvPolishSignalTotem",e.position[0]-13.2,e.position[2]-8.6,.22,.92),this.addPolishAsset(t,"EnvPolishBenchPlanter",e.position[0]-5.2,e.position[2]+10.8,.18,.8),this.addPlanterCluster(t,e.position[0]-15.2,e.position[2]-.4,8191922),this.addPlanterCluster(t,e.position[0]+16.2,e.position[2]+.8,6871295),this.checkerStripe(t,e.position[0]+2,e.position[2]-13.8,24,0),this.campusArch(t,e.position[0]-15.8,e.position[2]-12.8,-.18);for(let i=0;i<7;i+=1){const s=e.position[0]-7+i*4.2,o=e.position[2]-18-Math.sin(i*.8)*1.4;this.arrowMarker(t,s,o,-.1+i*.04,i%2?6871295:8191922,"StartRouteArrow")}Pn(t,{namePrefix:"SETPIECE_start"}),this.world.scene.add(t)}createEducationPlaza(){const e=Vt("education"),t=new Pe;t.name="SETPIECE_FCC_Education_Grove",this.groundRect(t,e.position[0],e.position[2]-8.6,35,18,this.world.materials.plazaRoad,.12,"FCCFrontQuad"),this.groundRect(t,e.position[0],e.position[2]+12.2,30,11,this.world.materials.paleStone,.118,"FCCRearWalk"),this.addSign(t,"FCCU S BLOCK","Forman Christian College",e.position[0]-18.5,e.position[2]-16.2,.2,10276863,3.7,"FCCIdentitySign");for(const n of[-18,-7,7,18])this.addLamp(t,e.position[0]+n,e.position[2]-19,10276863,3.2,"FCCFrontLamp");for(const[n,i,s]of[[e.position[0]-23,e.position[2]-9,.84],[e.position[0]-14,e.position[2]+21,-.62],[e.position[0]+14,e.position[2]-12,-.38],[e.position[0]+25,e.position[2]+14,.48]])this.addBench(t,n,i,s,.96);for(const[n,i]of[[e.position[0]-27,e.position[2]-14],[e.position[0]-22,e.position[2]+15],[e.position[0]+25,e.position[2]-12],[e.position[0]+22,e.position[2]+16],[e.position[0]-2,e.position[2]+27]])this.addPlanterCluster(t,n,i,10276863);this.addPolishAsset(t,"EnvPolishInfoKiosk",e.position[0]+20.4,e.position[2]-16.5,-.34,.82),this.addPolishAsset(t,"EnvPolishBenchPlanter",e.position[0]-20.8,e.position[2]+5.2,.64,.9),this.addPolishAsset(t,"EnvPolishBenchPlanter",e.position[0]+20.2,e.position[2]+6.4,-.62,.9),this.campusArch(t,e.position[0]-15.5,e.position[2]-18.8,.08),this.hedgeLine(t,e.position[0]-23,e.position[2]-20,45,0),this.hedgeLine(t,e.position[0]+23,e.position[2]-20,45,0);for(const n of[-9,0,9])this.flagPole(t,e.position[0]+n,e.position[2]-23.5,10276863);Pn(t,{namePrefix:"SETPIECE_fcc"}),this.world.scene.add(t)}createSecurityLab(){const e=Vt("security"),t=new Pe;t.name="SETPIECE_Security_Lab",this.groundRect(t,e.position[0],e.position[2],32,28,this.world.materials.securityRoad,.13,"SecurityScannerPad"),this.box(t,e.position[0],.18,e.position[2]-14.2,26,.04,.32,this.world.materials.glowBlue,0,"SecurityPadFrontTrace"),this.box(t,e.position[0]-16.2,.18,e.position[2],.32,.04,24,this.world.materials.glowBlue,0,"SecurityPadLeftTrace"),this.box(t,e.position[0]+16.2,.18,e.position[2],.32,.04,24,this.world.materials.glowPink,0,"SecurityPadRightTrace"),this.securityGate(t,e.position[0]-2.8,e.position[2]-11.2,.18),this.addPolishAsset(t,"EnvPolishSecurityScanner",e.position[0]+4.8,e.position[2]+3,-.28,.92),this.addPolishAsset(t,"EnvPolishTerminalPillar",e.position[0]-12.2,e.position[2]+9.5,.34,1.05),this.addPolishAsset(t,"EnvPolishSignalTotem",e.position[0]+13.8,e.position[2]+8.2,-.44,1.05),this.addSign(t,"SECURITY SCAN","Authorized Assessments",e.position[0]+12.8,e.position[2]-11.8,-.55,6871295,3,"SecurityScanSign");for(const[n,i,s]of[[-140,-48,.4],[-136,-31,1.2],[-114,-56,-.18],[-108,-35,-.72]])this.serverRack(t,n,i,s);this.cable(t,[-139,.3,-49],[-132,.25,-44],[-124,.32,-45],1055007),this.cable(t,[-111,.3,-56],[-122,.25,-50],[-130,.32,-55],1055007),this.cable(t,[-136,.3,-31],[-128,.26,-36],[-119,.3,-34],1055007);for(const[n,i,s]of[[-143,-25,6871295],[-103,-42,16739725],[-116,-64,8191922],[-145,-58,6871295]]){const o=this.beacon(t,n,i,s);this.securityScanObjects.push(o)}for(let n=0;n<8;n+=1){const i=new ne(new tr(.52,0),this.world.materials.glowBlue.clone());i.name="SecurityPacketShard",i.position.set(e.position[0]-12+n*3.4,1.2+n%3*.2,e.position[2]+8+Math.sin(n)*2.2),t.add(i),this.animated.push({kind:"float",mesh:i,baseY:i.position.y,speed:1.2,phase:n*.7,range:.34,rotationSpeed:1.1+n*.05})}Pn(t,{namePrefix:"SETPIECE_security",shouldSkip:n=>n.name==="SecurityPacketShard"||n.name==="SetPieceBeaconGlow"}),this.world.scene.add(t)}createDistrictDressing(){const e=new Pe;e.name="SETPIECE_District_Dressing";const t=Vt("projects");this.addSign(e,"PROJECTS","Build Yard",t.position[0]-12,t.position[2]+13,-.35,16764006,2.7,"ProjectsFoundrySign"),this.addLamp(e,t.position[0]+10,t.position[2]+12,16751469,3,"FoundryLampA"),this.addLamp(e,t.position[0]-16,t.position[2]-7,16764006,2.7,"FoundryLampB"),this.addPolishAsset(e,"EnvPolishProjectForge",t.position[0]+4.6,t.position[2]+1.8,-.52,1.04),this.addPolishAsset(e,"EnvPolishInfoKiosk",t.position[0]-8.4,t.position[2]-8.8,.34,.78),this.addPolishAsset(e,"EnvPolishRoadBarrier",t.position[0]+14.2,t.position[2]+1.2,-.46,.82);for(const[_,g]of[[t.position[0]+8,t.position[2]-4],[t.position[0]+13,t.position[2]-7],[t.position[0]-4,t.position[2]+8],[t.position[0]+2,t.position[2]+11]])this.box(e,_,.6,g,1.25,1.1,1.25,this.world.materials.darkWood,.3,"FoundryCrateStack");const n=Vt("cv");this.addSign(e,"CV VAULT","Documents",n.position[0]-10,n.position[2]-12,.25,15135743,2.5,"CvVaultSign"),this.addLamp(e,n.position[0]+8,n.position[2]+9,15135743,2.8,"CvLamp"),this.addPolishAsset(e,"EnvPolishCvVault",n.position[0]-.4,n.position[2]+1.2,.12,1.05),this.addPolishAsset(e,"EnvPolishTerminalPillar",n.position[0]+8.8,n.position[2]-3.6,-.22,.88),this.groundRect(e,n.position[0],n.position[2],13,9,this.world.materials.plazaRoad,.13,"CvVaultDocumentPad"),this.box(e,n.position[0],.19,n.position[2]-4.8,10.6,.04,.28,this.world.materials.glowBlue,0,"CvVaultFrontTrace");const i=Vt("contact");this.addSign(e,"CONTACT","Harbor Signal",i.position[0]-8,i.position[2]+15,-.65,7911423,2.5,"HarborSign"),this.addPolishAsset(e,"EnvPolishHarborSignal",i.position[0]+1.6,i.position[2]+3.8,-.32,1.18),this.addPolishAsset(e,"EnvPolishPalm",i.position[0]-13.2,i.position[2]+5.8,.28,1.08),this.addPolishAsset(e,"EnvPolishPalm",i.position[0]+13.4,i.position[2]+2.2,-.18,.98);for(const[_,g]of[[i.position[0],i.position[2]+2],[i.position[0]+7,i.position[2]+11],[i.position[0]-9,i.position[2]+8]])this.beacon(e,_,g,7911423);const s=Vt("drift");this.addSign(e,"STUNT","Boost Yard",s.position[0]-9,s.position[2]+16,-.55,16751469,2.6,"StuntSign"),this.addPolishAsset(e,"EnvPolishCircuitGate",s.position[0]+5.2,s.position[2]+8.8,-.18,.86),this.groundRect(e,s.position[0],s.position[2],25,17,this.world.materials.stuntRamp,.12,"StuntYardRunoffPad"),this.box(e,s.position[0],.18,s.position[2]+9.2,20,.04,.28,this.world.materials.warmGlow,0,"StuntYardStartTrace"),this.addPolishAsset(e,"EnvPolishRoadBarrier",s.position[0]-12.6,s.position[2]-6.2,.42,.9),this.addPolishAsset(e,"EnvPolishRoadBarrier",s.position[0]+12.2,s.position[2]-5.8,-.36,.9);const o=Vt("data-pier");this.addSign(e,"DATA","Visitor Trail",o.position[0]-8,o.position[2]-13,.75,7995333,2.5,"DataPierSign"),this.addPolishAsset(e,"EnvPolishInfoKiosk",o.position[0]+9.8,o.position[2]-5.4,.72,.72);for(let _=0;_<7;_+=1)this.box(e,o.position[0]+_*1.6-4.8,.26,o.position[2]+2.6,1.3,.14,7.2,this.world.materials.wood,.1,"DataPierPlank");this.addLamp(e,o.position[0]-7,o.position[2]+7,7995333,2.6,"DataPierLampA"),this.addLamp(e,o.position[0]+7,o.position[2]+7,7995333,2.6,"DataPierLampB");const a=Vt("sentinel");this.addSign(e,"SENTINEL","Cyber Ridge",a.position[0]-12,a.position[2]-12,.22,16739725,2.7,"SentinelRidgeSign"),this.addPolishAsset(e,"EnvPolishSkillsArray",a.position[0]-4.4,a.position[2]+2.8,-.12,.78),this.addPolishAsset(e,"EnvPolishSignalTotem",a.position[0]+2.4,a.position[2]+11.8,-.18,1.05),this.antennaCluster(e,a.position[0]+10,a.position[2]-4,16739725),this.antennaCluster(e,a.position[0]-8,a.position[2]+8,6871295);const c=Vt("skills");this.addSign(e,"STACK","Skills Terminal",c.position[0]-11,c.position[2]+10,-.62,9633770,2.4,"SkillsTerminalSign"),this.addPolishAsset(e,"EnvPolishSkillsArray",c.position[0]-.6,c.position[2]-1.4,-.62,1.02),this.addPolishAsset(e,"EnvPolishTerminalPillar",c.position[0]+10.8,c.position[2]+5.6,-.62,.9);for(let _=0;_<5;_+=1)this.box(e,c.position[0]-7+_*3.5,.95,c.position[2]-8,1.5,1.5,.22,this.world.materials.screen,-.2,"SkillsScreen"),this.cylinder(e,c.position[0]-7+_*3.5,.5,c.position[2]-7.75,.08,1,this.world.materials.cable,8,"SkillsScreenPost");const h=Vt("awards");this.addSign(e,"AWARDS","Archive Steps",h.position[0]-9,h.position[2]+8,-.2,16768906,2.3,"AwardsSign"),this.addPolishAsset(e,"EnvPolishAwardsMonument",h.position[0]+.2,h.position[2]+1.4,-.18,1.05),this.addPolishAsset(e,"EnvPolishBenchPlanter",h.position[0]+7.5,h.position[2]+6.2,-.34,.78);for(let _=0;_<4;_+=1)this.box(e,h.position[0],.22+_*.16,h.position[2]-2+_*1.25,10-_*1.2,.22,1,this.world.materials.warmStone,0,"AwardsStep");const f=Vt("todo");this.addSign(e,"TODO","Build Queue",f.position[0]-8,f.position[2]-7,.68,11968767,2.2,"TodoSign"),this.addPolishAsset(e,"EnvPolishTodoBoard",f.position[0]+.6,f.position[2]+1,.34,1.02),this.addPolishAsset(e,"EnvPolishInfoKiosk",f.position[0]+6.8,f.position[2]-5.2,-.24,.72);for(let _=0;_<4;_+=1)this.box(e,f.position[0]+_*2-3,1.1,f.position[2]+6,1.35,1.4,.18,_%2?this.world.materials.glowPink:this.world.materials.glowBlue,.1,"TodoCards");const l=Vt("career");this.addSign(e,"CAREER","Signal Office",l.position[0]-10,l.position[2]+9,-.35,11968767,2.4,"CareerSign"),this.addPolishAsset(e,"EnvPolishCareerOffice",l.position[0]+1.2,l.position[2]+.8,-.24,1.08),this.box(e,l.position[0]+7,.22,l.position[2]-6,9,.16,5.5,this.world.materials.plazaRoad,.12,"CareerOfficeDeck"),this.flagPole(e,l.position[0]+13,l.position[2]-6,11968767),this.addPolishAsset(e,"EnvPolishSignalTotem",l.position[0]+1.4,l.position[2]-10.8,-.18,.88);const u=Vt("circuit");this.addSign(e,"CIRCUIT","Checkpoint Run",u.position[0]-10,u.position[2]-10,.4,16751469,2.4,"CircuitSign"),this.addPolishAsset(e,"EnvPolishCircuitGate",u.position[0]+1,u.position[2]+7.4,-.22,1.04),this.checkerStripe(e,u.position[0]+1,u.position[2]+8,18,-.22),this.addPolishAsset(e,"EnvPolishRoadBarrier",u.position[0]-7.8,u.position[2]+3.6,.44,.84);const d=Vt("behind");this.addSign(e,"BEHIND","Process Yard",d.position[0]-10,d.position[2]+8,-.2,9425919,2.3,"BehindSign"),this.addPolishAsset(e,"EnvPolishBuildWorkbench",d.position[0]+.6,d.position[2]-1.2,.08,1.08),this.addPolishAsset(e,"EnvPolishTerminalPillar",d.position[0]+8.4,d.position[2]+3.6,.3,.82);for(const[_,g,m,x]of[[-6,-5,5,2.2],[1,-7,3.5,2.2],[7,-3,4,2.2]])this.box(e,d.position[0]+_,.56,d.position[2]+g,m,1,x,this.world.materials.darkWood,.25,"BehindWorkshopCrate");const p=Vt("potato");this.addSign(e,"FARM","Potato Counter",p.position[0]-11,p.position[2]+9,.32,13081430,2.3,"PotatoFarmSign"),this.addPolishAsset(e,"EnvPolishFarmIrrigator",p.position[0]+4.4,p.position[2]-1.8,.18,1.04),this.addPolishAsset(e,"EnvPolishBenchPlanter",p.position[0]-8.6,p.position[2]+1.4,.22,.78),Pn(e,{namePrefix:"SETPIECE_district"}),this.world.scene.add(e)}createRouteGuidance(){const e=new Pe;e.name="SETPIECE_Route_Guidance";const t=[[-28,36,.24,10276863],[-54,58,.42,10276863],[-64,86,.68,10276863],[-28,6,-.76,6871295],[-72,-20,-.56,6871295],[-104,-54,-.3,6871295],[22,-20,.2,15135743],[76,-92,1.2,16751469],[84,50,.95,7911423],[-132,54,.8,7995333]];for(const[n,i,s,o]of t)this.arrowMarker(e,n,i,s,o,"RouteArrow");Pn(e,{namePrefix:"SETPIECE_route"}),this.world.scene.add(e)}createLivingSignals(){const e=new Pe;e.name="SETPIECE_Living_Signals";const t=Qn;this.createZonePulseInstances(e,t),[[-24,28,.18,8191922],[-52,54,.52,10276863],[-86,-28,-.48,6871295],[18,-18,.34,15135743],[58,-78,-.72,16751469],[102,50,.86,7911423],[-112,54,.68,7995333],[-42,-116,-.2,13081430],[26,96,.18,16739725],[78,18,-.62,11968767]].forEach(([o,a,c,h],f)=>this.addWindBanner(e,o,a,c,h,f));const i=[[-40,42,10276863],[-68,78,10276863],[-36,2,6871295],[-92,-42,6871295],[22,-34,15135743],[78,-92,16751469],[84,48,16764006],[116,60,7911423],[-126,58,7995333],[-28,-94,11052799]];this.createWhisperBeaconInstances(e,i);const s=[[-94,-66,6871295],[62,56,16764006],[-62,-84,9633770],[8,-58,15135743],[-18,-96,11052799],[128,56,7911423]];this.createTerminalPulseInstances(e,s),this.world.scene.add(e)}createZonePulseInstances(e,t){const n=new nr(.965,1,4),i=new De({color:16777215,vertexColors:!0,transparent:!0,opacity:.13,depthWrite:!1,side:Ot}),s=new nn(n,i,t.length);s.name="Life_ZonePulse_instances",s.instanceMatrix.setUsage(Ji),e.add(s),this.lifeInstanceMeshes.push(s);for(const o of t){const a=this.lifeStats.zonePulses;s.setColorAt(a,new fe(o.color));const c=new Qe;c.name=`Life_ZonePulse_${o.id}`,c.position.set(o.position[0],.245,o.position[2]),c.rotation.x=-Math.PI/2,c.rotation.z=Math.PI/4,e.add(c);const h={kind:"pulse",instanceKind:"zonePulse",instanceMesh:s,instanceIndex:a,proxy:c,position:c.position.clone(),scale:o.radius+2.05,baseScale:1,baseRotation:Math.PI/4,range:.055,speed:.9+a%5*.08,phase:a*.73,rotationSpeed:.18};this.writeLifeInstance(h,0),this.animated.push(h),this.lifeItems.zonePulses.push({root:c,entry:h}),this.lifeStats.zonePulses+=1}s.instanceColor&&(s.instanceColor.needsUpdate=!0),s.instanceMatrix.needsUpdate=!0}createWhisperBeaconInstances(e,t){const n=new tr(.42,0),i=new De({color:16777215,vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1}),s=new nn(n,i,t.length);s.name="Life_WhisperBeacon_instances",s.instanceMatrix.setUsage(Ji),e.add(s),this.lifeInstanceMeshes.push(s),t.forEach(([o,a,c],h)=>{s.setColorAt(h,new fe(c));const f=new Qe;f.name=`Life_WhisperBeacon_${h}`,f.position.set(o,1.45+h%3*.12,a),e.add(f);const l={kind:"beacon",instanceKind:"beacon",instanceMesh:s,instanceIndex:h,proxy:f,position:f.position.clone(),baseY:f.position.y,scale:1,range:.34,speed:1.2+h*.05,phase:h*.7,rotationSpeed:.7+h*.03};this.writeLifeInstance(l,0),this.animated.push(l),this.lifeItems.whisperBeacons.push({root:f,entry:l}),this.lifeStats.whisperBeacons+=1}),s.instanceColor&&(s.instanceColor.needsUpdate=!0),s.instanceMatrix.needsUpdate=!0}createTerminalPulseInstances(e,t){const n=new nr(1.1,1.34,5),i=new De({color:16777215,vertexColors:!0,transparent:!0,opacity:.2,depthWrite:!1,side:Ot}),s=new nn(n,i,t.length);s.name="Life_TerminalPulse_instances",s.instanceMatrix.setUsage(Ji),e.add(s),this.lifeInstanceMeshes.push(s),t.forEach(([o,a,c],h)=>{s.setColorAt(h,new fe(c));const f=new Qe;f.name=`Life_TerminalPulse_${h}`,f.position.set(o,1.15+h%2*.18,a),f.rotation.x=-Math.PI/2,e.add(f);const l={kind:"pulse",instanceKind:"terminalPulse",instanceMesh:s,instanceIndex:h,proxy:f,position:f.position.clone(),scale:1,baseScale:1,baseRotation:0,range:.18,speed:1.35+h*.11,phase:h*.44,rotationSpeed:.65};this.writeLifeInstance(l,0),this.animated.push(l),this.lifeItems.terminalPulses.push({root:f,entry:l}),this.lifeStats.terminalPulses+=1}),s.instanceColor&&(s.instanceColor.needsUpdate=!0),s.instanceMatrix.needsUpdate=!0}writeLifeInstance(e,t){if(e.active===!1)this.lifeDummy.position.set(0,-1e3,0),this.lifeDummy.rotation.set(0,0,0),this.lifeDummy.scale.setScalar(.001),e.proxy&&(e.proxy.visible=!1);else if(e.instanceKind==="beacon"){const n=e.baseY+Math.sin(t*e.speed+e.phase)*e.range;this.lifeDummy.position.set(e.position.x,n,e.position.z),this.lifeDummy.rotation.set(0,t*e.rotationSpeed+e.phase,0),this.lifeDummy.scale.setScalar(e.scale),e.proxy&&(e.proxy.visible=!0,e.proxy.position.copy(this.lifeDummy.position),e.proxy.rotation.copy(this.lifeDummy.rotation)),this.lifeStats.motionSamples+=1}else{const n=e.baseScale+Math.sin(t*e.speed+e.phase)*e.range,i=e.scale*n,s=e.baseRotation+t*e.rotationSpeed;this.lifeDummy.position.copy(e.position),this.lifeDummy.rotation.set(-Math.PI/2,0,s),this.lifeDummy.scale.set(i,i,i),e.proxy&&(e.proxy.visible=!0,e.proxy.position.copy(e.position),e.proxy.rotation.copy(this.lifeDummy.rotation),e.proxy.scale.setScalar(n)),this.lifeStats.motionSamples+=1}this.lifeDummy.updateMatrix(),e.instanceMesh.setMatrixAt(e.instanceIndex,this.lifeDummy.matrix)}groundRect(e,t,n,i,s,o,a,c){const h=new ne(new ht(i,.05,s),o);h.name=c,h.position.set(t,a,n),h.receiveShadow=!0,e.add(h)}box(e,t,n,i,s,o,a,c,h=0,f="SetPieceBox"){const l=new ne(new ht(s,o,a),c);return l.name=f,l.position.set(t,n,i),l.rotation.y=h,l.castShadow=!1,l.receiveShadow=!0,e.add(l),l}cylinder(e,t,n,i,s,o,a,c=16,h="SetPieceCylinder"){const f=new ne(new Jt(s,s,o,c),a);return f.name=h,f.position.set(t,n,i),f.castShadow=!1,f.receiveShadow=!0,e.add(f),f}addLamp(e,t,n,i,s,o){const a=new Pe;a.name=o,this.cylinder(a,0,s/2,0,.08,s,this.world.materials.darkWood,8,`${o}_Post`),this.box(a,.34,s-.08,0,.82,.08,.08,this.world.materials.darkWood,0,`${o}_Arm`);const c=new De({color:i,transparent:!0,opacity:.9}),h=new ne(new Bn(.26,12,8),c);h.name=`${o}_Glow`,h.position.set(.78,s-.34,0),a.add(h),a.position.set(t,.16,n),a.rotation.y=Math.sin(t*.2+n*.1)*.35,e.add(a)}addSign(e,t,n,i,s,o,a,c,h){const f=new Pe;f.name=h,this.cylinder(f,-1.12*c,1,0,.06,2,this.world.materials.darkWood,8,`${h}_PostLeft`),this.cylinder(f,1.12*c,1,0,.06,2,this.world.materials.darkWood,8,`${h}_PostRight`);const{material:l,rect:u}=this.allocateSignPanel(t,n,a),d=wy(2.65*c,1.1*c,u),p=new ne(d,l);p.name=`${h}_BoardFront`,p.position.y=1.9,p.position.z=.025;const _=new ne(d,l);_.name=`${h}_BoardBack`,_.position.y=1.9,_.position.z=-.025,_.rotation.y=Math.PI,f.add(p,_),f.position.set(i,.16,s),f.rotation.y=o,e.add(f)}allocateSignPanel(e,t,n){this.signAtlas||(this.signAtlas=My());const i=this.signAtlas,s=i.cursor;i.cursor+=1;const o=s%i.columns,a=Math.floor(s/i.columns);if(a>=i.rows)throw new Error("Sign atlas capacity exceeded");const c=o*i.tileWidth,h=a*i.tileHeight;return by(i.context,c,h+18,e,t,n),i.texture.needsUpdate=!0,{material:i.material,rect:{u0:c/i.canvas.width,u1:(c+i.tileWidth)/i.canvas.width,v0:1-(h+i.tileHeight)/i.canvas.height,v1:1-h/i.canvas.height}}}addBench(e,t,n,i,s){const o=this.world.cloneEnvironmentAsset("EnvBench")||this.createBenchFallback();o.name="SetPieceBench",o.position.set(t,.18,n),o.rotation.y=i,o.scale.setScalar(s),e.add(o)}addPolishAsset(e,t,n,i,s,o){const a=this.world.cloneEnvironmentAsset(t);return a?(a.name=`SetPiece_${t}`,a.position.set(n,.16,i),a.rotation.y=s,a.scale.setScalar(o),e.add(a),!0):!1}checkerStripe(e,t,n,i,s){const a=Math.floor(i/1.45);for(let c=0;c<a;c+=1){const h=c%2===0?this.world.materials.paleStone:this.world.materials.cable;this.box(e,t-i/2+c*1.45+1.45/2,.215,n,1.45,.035,1.4,h,s,"CheckerStartTile")}}hedgeLine(e,t,n,i,s){const o=Math.max(3,Math.floor(i/4));for(let a=0;a<o;a+=1){const c=-i/2+a*4+2,h=Math.cos(s)*c,f=Math.sin(s)*c;this.box(e,t+h,.55,n+f,3.4,.72,.68,this.world.materials.meadowDark,s,"CampusHedge")}}flagPole(e,t,n,i){this.cylinder(e,t,1.75,n,.055,3.5,this.world.materials.cable,8,"FlagPole");const s=new De({color:i,transparent:!0,opacity:.88});this.box(e,t+.55,2.85,n,1.05,.56,.035,s,0,"FlagBanner")}addWindBanner(e,t,n,i,s,o){const a=new Pe;a.name=`Life_WindBannerGroup_${o}`,this.cylinder(a,0,1.25,0,.045,2.5,this.world.materials.darkWood,7,`Life_WindBanner_${o}_Post`);const c=new De({color:s,transparent:!0,opacity:.72,side:Ot}),h=new ne(new ui(1.05,.56,1,1),c);h.name=`Life_WindBanner_${o}`,h.position.set(.57,2.1,0),a.add(h),a.position.set(t,.15,n),a.rotation.y=i,e.add(a);const f={kind:"banner",mesh:h,baseScale:1,range:.16,speed:1.1+o*.07,phase:o*.61};this.animated.push(f),this.lifeItems.windBanners.push({root:a,entry:f}),this.lifeStats.windBanners+=1}antennaCluster(e,t,n,i){const s=new De({color:i,transparent:!0,opacity:.78});for(let o=0;o<3;o+=1){const a=o*1.4-1.4;this.cylinder(e,t+a,1.75+o*.25,n,.08,3.5+o*.5,this.world.materials.cable,8,"AntennaMast"),this.box(e,t+a,3+o*.45,n+.22,1.4,.08,.08,s,0,"AntennaGlowBar")}}createBenchFallback(){const e=new Pe;return this.box(e,0,.55,0,2.1,.18,.48,this.world.materials.wood,0,"BenchSeat"),this.box(e,0,.98,-.22,2.1,.22,.22,this.world.materials.wood,0,"BenchBack"),e}addPlanterCluster(e,t,n,i){const s=new ze({color:i,roughness:.72,metalness:.04});this.box(e,t,.22,n,3.2,.34,1.25,this.world.materials.paleStone,.14,"PlanterStone");for(let o=0;o<5;o+=1){const a=new ne(new Sn(.18,.9+o*.05,5),s);a.name="PlanterGrass",a.position.set(t-1.1+o*.55,.78,n+Math.sin(o)*.32),a.rotation.y=o*.9,e.add(a)}}arrowMarker(e,t,n,i,s,o){const a=new Pe;a.name=o;const c=new De({color:s,transparent:!0,opacity:.66,depthWrite:!1}),h=new ne(new ht(.34,.035,2.6),c),f=new ne(new Sn(.72,1.32,3),c);h.position.z=-.34,f.position.z=1.08,f.rotation.x=Math.PI/2,a.add(h,f),a.position.set(t,.22,n),a.rotation.y=i,e.add(a)}campusArch(e,t,n,i){const s=new Pe;s.name="FCCCampusArch",this.cylinder(s,-2.4,1.55,0,.18,3.1,this.world.materials.campusBrick,10,"FCCArchLeft"),this.cylinder(s,2.4,1.55,0,.18,3.1,this.world.materials.campusBrick,10,"FCCArchRight"),this.box(s,0,3.08,0,5.3,.42,.42,this.world.materials.campusBrick,0,"FCCArchTop"),this.box(s,0,2.62,-.06,2.8,.12,.12,this.world.materials.paleStone,0,"FCCArchLintel"),s.position.set(t,.14,n),s.rotation.y=i,e.add(s)}securityGate(e,t,n,i){const s=new Pe;s.name="SecurityScannerGate",this.box(s,-3.2,2.1,0,.38,4.2,.48,this.world.materials.cable,0,"ScannerLeftPillar"),this.box(s,3.2,2.1,0,.38,4.2,.48,this.world.materials.cable,0,"ScannerRightPillar"),this.box(s,0,4.2,0,6.8,.34,.52,this.world.materials.cable,0,"ScannerTopBeam");const o=this.world.materials.glowBlue.clone();o.opacity=.24,this.securityScanMaterials.push(o);for(let a=0;a<5;a+=1){const c=new ne(new ht(.06,3.3,.08),o);c.name="ScannerLightCurtain",c.position.set(-2+a,2.2,.04),s.add(c)}s.position.set(t,.16,n),s.rotation.y=i,e.add(s)}serverRack(e,t,n,i){const s=new Pe;s.name="SecurityServerRack",this.box(s,0,1.25,0,1.2,2.5,.75,this.world.materials.cable,0,"ServerBody");for(let o=0;o<5;o+=1)this.box(s,0,.42+o*.38,-.39,.88,.08,.04,this.world.materials.screen,0,"ServerGlowLine");s.position.set(t,.16,n),s.rotation.y=i,e.add(s)}cable(e,t,n,i,s){const o=new ql([new C(...t),new C(...n),new C(...i)]),a=new ne(new Kl(o,18,.055,8,!1),new ze({color:s,roughness:.8,metalness:.08}));a.name="SecurityGroundCable",a.castShadow=!1,a.receiveShadow=!0,e.add(a)}beacon(e,t,n,i){const s=new Pe;s.name="SetPieceBeacon",this.cylinder(s,0,.62,0,.16,1.24,this.world.materials.cable,10,"BeaconPost");const o=new ne(new Bn(.34,12,8),new De({color:i,transparent:!0,opacity:.88}));return o.name="SetPieceBeaconGlow",o.position.y=1.34,s.add(o),s.position.set(t,.16,n),e.add(s),o}}function Vt(r){return Qn.find(t=>t.id===r)||{position:[0,0,0],radius:10}}function My(){const r=document.createElement("canvas");r.width=2048,r.height=2048;const e=new ds(r);return e.colorSpace=Et,e.needsUpdate=!0,{canvas:r,context:r.getContext("2d"),texture:e,material:new De({map:e,transparent:!0,depthWrite:!1,side:jt}),tileWidth:512,tileHeight:256,columns:4,rows:8,cursor:0}}function by(r,e,t,n,i,s){r.clearRect(e,t-18,512,256),r.fillStyle="rgba(4, 11, 18, 0.86)",Ty(r,e+18,t+18,476,184,18),r.fill(),r.strokeStyle=new fe(s).getStyle(),r.lineWidth=6,r.stroke(),r.fillStyle="#f4fbff",r.font="900 44px Arial",r.textAlign="center",r.fillText(n,e+256,t+94),r.fillStyle=new fe(s).getStyle(),r.font="700 24px Arial",r.fillText(i,e+256,t+142),r.beginPath(),r.moveTo(e+224,t+166),r.lineTo(e+288,t+166),r.lineTo(e+256,t+190),r.closePath(),r.fill()}function wy(r,e,t){const n=new ui(r,e),i=n.attributes.uv;for(let s=0;s<i.count;s+=1){const o=i.getX(s),a=i.getY(s);i.setXY(s,t.u0+(t.u1-t.u0)*o,t.v0+(t.v1-t.v0)*a)}return i.needsUpdate=!0,n}function Ty(r,e,t,n,i,s){r.beginPath(),r.moveTo(e+s,t),r.arcTo(e+n,t,e+n,t+i,s),r.arcTo(e+n,t+i,e,t+i,s),r.arcTo(e,t+i,e,t,s),r.arcTo(e,t,e+n,t,s),r.closePath()}class Ey{constructor(e){this.world=e}build(){this.createYardDressing(),this.createRamps(),this.createBoostPads()}createYardDressing(){const e=Qn.find(s=>s.id==="drift");if(!e)return;const t=new Pe;t.name="STUNT_Yard_Dressing";const n=e.position[0],i=e.position[2];this.addRunwayStripe(t,n-10,i-18,24,Math.PI/2,16751469),this.addRunwayStripe(t,n+9,i-2,18,-Math.PI/2.6,16761706),this.addRunwayStripe(t,n-2,i+16,14,.1,6871295);for(let s=0;s<12;s+=1){const o=s%2===0?-1:1,a=new ne(new Sn(.34,.9,5),this.world.materials.warmGlow);a.name="STUNT_slalom_cone",a.position.set(n-6+s*2.6,.6,i+o*4.2),a.rotation.y=s*.7,t.add(a)}for(const[s,o,a]of[[-21,-8,.2],[-18,10,-.4],[18,-16,.6],[23,7,-.2],[4,22,.1]]){const c=new Pe;c.name="STUNT_tire_stack";for(let h=0;h<3;h+=1){const f=new ne(new $l(.55,.16,8,16),this.world.materials.cable);f.position.y=.28+h*.24,f.rotation.x=Math.PI/2,c.add(f)}c.position.set(n+s,.18,i+o),c.rotation.y=a,t.add(c)}Pn(t,{namePrefix:"STUNT_yard"}),this.world.scene.add(t)}addRunwayStripe(e,t,n,i,s,o){const a=new De({color:o,transparent:!0,opacity:.52,depthWrite:!1}),c=new ne(new ht(.46,.035,i),a);c.name="STUNT_runway_glow",c.position.set(t,.22,n),c.rotation.y=s,e.add(c)}createRamps(){const e=Qn.find(s=>s.id==="drift");if(!e)return;const t=e.position[0],n=e.position[2],i=[{id:"cove-main-ramp",x:t-14,z:n-18,y:.12,rot:Math.PI/2,width:8.8,length:22,height:2.1},{id:"cove-return-ramp",x:t+12,z:n-2,y:.12,rot:-Math.PI/2.6,width:6.4,length:16,height:1.55},{id:"cove-short-hop",x:t-2,z:n+16,y:.12,rot:.1,width:5.4,length:12,height:1.15}];for(const s of i){const o=Ay(s.width,s.length,s.height),a=new ne(o.geometry,this.world.materials.stuntRamp);a.name=`STUNT_${s.id}`,a.position.set(s.x,s.y,s.z),a.rotation.y=s.rot,a.castShadow=!0,a.receiveShadow=!0,this.world.scene.add(a),this.world.ramps.push({id:s.id,position:new C(s.x,0,s.z),radius:11,triggered:!1}),this.world.physics.createFixedTrimesh([s.x,s.y,s.z],o.vertices,o.indices,{debugName:`STUNT_${s.id}_ramp_collider`,visualName:`STUNT_${s.id}`,rotation:[0,s.rot,0],friction:.92,restitution:.02}),this.addGuardrails(s),this.addLandingMarkers(s)}}addGuardrails(e){for(const t of[-1,1]){const n=new ne(new ht(.22,.36,e.length*.92),this.world.materials.wood);n.name=`STUNT_${e.id}_wood_guardrail`,n.position.set(e.x+Math.cos(e.rot)*e.width*.56*t,.78,e.z-Math.sin(e.rot)*e.width*.56*t),n.rotation.y=e.rot,n.castShadow=!0,n.receiveShadow=!0,this.world.scene.add(n)}}addLandingMarkers(e){const t=e.length*.72,n=e.x+Math.sin(e.rot)*t,i=e.z+Math.cos(e.rot)*t;for(const s of[-1,1]){const o=new Pe;o.name=`STUNT_${e.id}_landing_marker`,o.position.set(n+Math.cos(e.rot)*s*(e.width*.62),.18,i-Math.sin(e.rot)*s*(e.width*.62)),o.rotation.y=e.rot;const a=new ne(new Jt(.06,.08,1.6,8),this.world.materials.darkWood);a.position.y=.8;const c=new ne(new ht(.9,.45,.04),this.world.materials.warmGlow);c.position.set(.48,1.32,0),o.add(a,c),this.world.scene.add(o)}}createBoostPads(){for(const e of nv){const t=new Pe;t.name=`BOOST_${e.id}`,t.position.set(e.position[0],.35,e.position[2]),t.rotation.y=e.rotation||0;const n=new ne(new Jt(2.2,2.4,.22,6),new ze({color:e.color,emissive:new fe(e.color).multiplyScalar(.22),roughness:.42})),i=new ne(new Sn(.9,2.4,3),this.world.materials.glow);i.position.z=.5,i.rotation.x=Math.PI/2,t.add(n,i),this.world.scene.add(t),this.world.boostPads.push({...e,position:new C(e.position[0],0,e.position[2])})}}}function Ay(r,e,t){const n=r/2,i=e/2,s=-.18,o=-.82,a=new Float32Array([-n,s,-i,n,s,-i,n,t,i,-n,t,i,-n,o,-i,n,o,-i,n,o,i,-n,o,i]),c=new Uint32Array([0,2,1,0,3,2,4,7,6,4,6,5,0,4,5,0,5,1,3,2,6,3,6,7,0,3,7,0,7,4,1,5,6,1,6,2]),h=new ut;return h.setAttribute("position",new gt(a,3)),h.setIndex(new gt(c,1)),h.computeVertexNormals(),{geometry:h,vertices:a,indices:c}}class Cy{constructor(e){this.world=e,this.authoredIslandLoaded=!1}build(){this.addBeachBase(),this.addGrassPlateau(),this.addTerrainBrushes(),this.addDistrictGrounding(),this.addCoastalEdges(),this.addPhysicsFloor()}addBeachBase(){const e=new ne(qh(xt,156,1.02),this.world.materials.sand);e.name="ToyIslandBeachBase",e.position.y=.025,e.receiveShadow=!0,this.world.scene.add(e);const t=new ne(Ws(xt,.985,1.055,156),this.world.materials.wetSandBlend);t.name="ToyIslandWetEdge",t.position.y=.042,t.renderOrder=2,this.world.scene.add(t)}addGrassPlateau(){const e=new ne(qh(xt,156,.93),this.world.materials.ground);e.name="ToyIslandGrassPlateau",e.position.y=.062,e.receiveShadow=!0,this.world.scene.add(e),this.world.decor.push({type:"ground",mesh:e});const t=new ne(Ws(xt,.865,.955,156),this.world.materials.grassSandBlend);t.name="ToyIslandGrassToBeachFeather",t.position.y=.078,t.renderOrder=3,this.world.scene.add(t)}addDistrictGrounding(){const e={plaza:this.world.materials.plazaRoad,campus:this.world.materials.paleStone,security:this.world.materials.securityRoad,workshop:this.world.materials.stoneRoad,tower:this.world.materials.stone,archive:this.world.materials.paleStone,driving:this.world.materials.stuntRamp,trail:this.world.materials.wood,harbor:this.world.materials.sand,pier:this.world.materials.wood};Hu.forEach((t,n)=>{const i=new ne(Yh(t.size[0],t.size[1],n+4),e[t.kind]||this.world.materials.plazaRoad);i.name=`ToyIslandDistrictPatch_${t.id}`,i.position.set(t.center[0],.075+n*8e-4,t.center[1]),i.rotation.y=(n%3-1)*.08,i.receiveShadow=!0,i.renderOrder=4+n,this.world.scene.add(i)})}addTerrainBrushes(){tv.forEach((e,t)=>{const n=this.world.materials[e.material];if(!n)return;const i=new ne(Yh(e.size[0],e.size[1],t+43),n);i.name=`ToyIslandTerrainBrush_${e.id}`,i.position.set(e.center[0],.066+t*5e-4,e.center[1]),i.rotation.y=e.rotation||0,i.receiveShadow=!1,i.renderOrder=4+t,this.world.scene.add(i)})}addCoastalEdges(){const e=new ne(Ws(xt,1.025,1.075,156),this.world.materials.cliff);e.name="ToyIslandLowCliffEdge",e.position.y=An+.42,e.receiveShadow=!0,this.world.scene.add(e)}addPhysicsFloor(){const{vertices:e,indices:t}=Ry(xt,1.01,112,.04,-.95);this.world.physics.createFixedTrimesh([0,0,0],e,t,{debugName:"ToyIslandTerrainCollider",visualName:"ToyIslandGrassPlateau",friction:1.08,restitution:.01})}containsPoint(e,t,n=0){return Math.hypot(e,t)<=xt-n}}function Ry(r,e,t,n,i){const s=fo(r,e,t),o=new Float32Array((2+s.length*2)*3);Gr(o,0,0,n,0),Gr(o,1,0,i,0);for(let h=0;h<s.length;h+=1){const[f,l]=s[h];Gr(o,2+h,f,n,l),Gr(o,2+s.length+h,f,i,l)}const a=new Uint32Array(s.length*12);let c=0;for(let h=0;h<s.length;h+=1){const f=(h+1)%s.length,l=2+h,u=2+f,d=2+s.length+h,p=2+s.length+f;a[c++]=0,a[c++]=u,a[c++]=l,a[c++]=1,a[c++]=d,a[c++]=p,a[c++]=l,a[c++]=u,a[c++]=p,a[c++]=l,a[c++]=p,a[c++]=d}return{vertices:o,indices:a}}function Gr(r,e,t,n,i){const s=e*3;r[s]=t,r[s+1]=n,r[s+2]=i}const pa={low:12,medium:24,high:40},ma={low:5,medium:10,high:16},Py=xt*.94,Iy=xt*1.012,Ly=xt*1.04;class Dy{constructor(e){this.world=e,this.waterMeshes=[],this.foamMeshes=[],this.bobbingProps=[],this.splashes=[],this.maxSplashes=pa.medium,this.maxBobbingProps=ma.medium,this.lastSplashAt=-1/0,this.lastSplashAudioAt=-1/0,this.submergeTime=0,this.splashGeometry=new Bn(.18,8,5),this.splashMaterial=new De({color:15400951,transparent:!0,opacity:.42,depthWrite:!1})}build(){const e=new ne(new ui(Yt*5.5,Yt*5.5,80,80),this.world.materials.water);e.name="ToyIslandOcean",e.rotation.x=-Math.PI/2,e.position.y=An,e.renderOrder=-5,this.world.scene.add(e),this.waterMeshes.push(e),this.createShallowShelf(),this.createShoreFoam(),this.createBobbingProps(),this.applyQuality()}createShallowShelf(){const e=new ne(Ws(xt,1,1.22,156),this.world.materials.shoreWash);e.name="ToyIslandShallowShelf",e.position.y=An+.08,e.renderOrder=-3,this.world.scene.add(e),this.waterMeshes.push(e)}createShoreFoam(){const e=[{inner:1.01,outer:1.024,opacity:.22,speed:.006},{inner:1.035,outer:1.052,opacity:.14,speed:-.004},{inner:1.065,outer:1.084,opacity:.08,speed:.003}];for(let t=0;t<e.length;t+=1){const n=e[t],i=this.world.materials.foam.clone();i.opacity=n.opacity;const s=new ne(Ws(xt,n.inner,n.outer,156),i);s.name=`ToyIslandFoam_${t}`,s.position.y=An+.06+t*.006,s.userData.foamSpeed=n.speed,s.renderOrder=-4+t,this.world.scene.add(s),this.waterMeshes.push(s),this.foamMeshes.push(s)}}createBobbingProps(){const e=fo(xt,1.055,156),t=[{template:"EnvPolishShoreBuoy",angle:-2.76,scale:.84,offset:1.02,phase:.1},{template:"EnvPolishWaveMarker",angle:-2.33,scale:1.05,offset:1.1,phase:.7},{template:"EnvPolishDockFloat",angle:-1.86,scale:1,offset:1.08,phase:1.3},{template:"EnvPolishShoreBuoy",angle:-1.42,scale:.9,offset:1.06,phase:2},{template:"EnvPolishWaveMarker",angle:-1.04,scale:.92,offset:1.04,phase:2.6},{template:"EnvPolishShoreBuoy",angle:-.62,scale:.82,offset:1.08,phase:3.1},{template:"EnvPolishDockFloat",angle:-.18,scale:.94,offset:1.07,phase:3.7},{template:"EnvPolishShoreBuoy",angle:.28,scale:.84,offset:1.03,phase:4.2},{template:"EnvPolishWaveMarker",angle:.74,scale:1.06,offset:1.09,phase:4.9},{template:"EnvPolishShoreBuoy",angle:1.08,scale:.88,offset:1.06,phase:5.4},{template:"EnvPolishDockFloat",angle:1.44,scale:.98,offset:1.08,phase:6},{template:"EnvPolishShoreBuoy",angle:1.86,scale:.86,offset:1.05,phase:6.6},{template:"EnvPolishWaveMarker",angle:2.22,scale:.96,offset:1.08,phase:7.1},{template:"EnvPolishShoreBuoy",angle:2.62,scale:.82,offset:1.04,phase:7.8},{template:"EnvPolishDockFloat",angle:3.02,scale:1.04,offset:1.08,phase:8.3},{template:"EnvPolishShoreBuoy",angle:3.44,scale:.84,offset:1.05,phase:8.9}];for(let n=0;n<t.length;n+=1){const i=t[n],s=this.world.cloneEnvironmentAsset(i.template);if(!s)continue;const[o,a]=Ny(e,i.angle,i.offset);s.name=`Shoreline_${i.template}_${n}`,s.position.set(o,An+.2,a),s.rotation.y=-i.angle+Math.PI*.5,s.rotation.z=Math.sin(i.phase)*.035,s.scale.setScalar(i.scale),s.traverse(c=>{c.isMesh&&(c.castShadow=!1,c.receiveShadow=!1)}),this.world.scene.add(s),this.bobbingProps.push({group:s,baseY:An+.12+n%3*.035,phase:i.phase,amplitude:.08+n%4*.018,speed:.82+n%5*.11,roll:.018+n%3*.009})}}applyQuality(){const t=this.world.getQualityProfile().water||"medium";for(this.maxSplashes=pa[t]||pa.medium,this.maxBobbingProps=ma[t]||ma.medium,this.foamMeshes.forEach((n,i)=>{n.visible=t==="high"||t==="medium"&&i<2||i===0}),this.bobbingProps.forEach((n,i)=>{n.group.visible=i<this.maxBobbingProps});this.splashes.length>this.maxSplashes;)this.removeSplash(0)}update(e,t,n,i){this.world.materials.water.uniforms?.time&&(this.world.materials.water.uniforms.time.value=t);for(const s of[this.world.materials.shoreWash,this.world.materials.wetSandBlend])s?.uniforms?.time&&(s.uniforms.time.value=t);for(const s of this.waterMeshes)if(s.name.includes("Foam")){s.rotation.z+=e*(s.userData.foamSpeed||.004);const o=s.name.endsWith("_0")?.2:s.name.endsWith("_1")?.12:.07;s.material.opacity=o+Math.sin(t*.7+s.position.y*80)*.035}this.updateBobbingProps(t),this.updateVehicleWaterInteraction(e,t,n,i),this.updateSplashes(e)}updateBobbingProps(e){for(const t of this.bobbingProps){if(!t.group.visible)continue;const n=Math.sin(e*t.speed+t.phase),i=Math.cos(e*t.speed*.72+t.phase);t.group.position.y=t.baseY+n*t.amplitude,t.group.rotation.x=i*t.roll,t.group.rotation.z=n*t.roll}}updateVehicleWaterInteraction(e,t,n,i){if(!n||!i?.body)return;const s=Math.hypot(n.x,n.z),o=Math.abs(i.speed||0),a=s>Py,c=s>Iy||n.y<An+.24,h=this.world.surfaceState||{};if(this.world.surfaceState={label:c?"water":a&&h.label!=="road"?"shore":h.label||"land",inWater:c,nearShore:a||h.nearShore||!1,onRoad:h.onRoad||!1},(a||c)&&o>7&&t-this.lastSplashAt>.08&&this.spawnSplashBurst(i,c,t),c){const f=Math.pow(.82,Math.min(2,e*60)),l=Math.pow(.88,Math.min(2,e*60)),u=i.body.linvel(),d=i.body.angvel();i.body.setLinvel({x:u.x*f,y:Math.min(u.y,1.2),z:u.z*f},!0),i.body.setAngvel({x:d.x*l,y:d.y*l,z:d.z*l},!0)}if(s>Ly||n.y<An-1.2?this.submergeTime+=e:this.submergeTime=Math.max(0,this.submergeTime-e*2.5),this.submergeTime>.9){const f=this.world.getRespawnPose("landing");i.respawn(f.position,f.heading),i.audio?.impact?.(.65),i.audio?.sweep?.(260,110,.18,.025),this.submergeTime=0}}spawnSplashBurst(e,t,n){this.lastSplashAt=n;const i=t?1:.62;for(const s of[-.92,.92]){const a=new C(s,-.35,1.25).applyQuaternion(e.group.quaternion).add(e.group.position);a.y=An+.25+Math.random()*.14;const c=new ne(this.splashGeometry,this.splashMaterial.clone());c.name="WaterWheelSplash",c.position.copy(a),c.scale.setScalar(.7+Math.random()*.55*i),this.world.scene.add(c),this.splashes.push({mesh:c,life:.48+Math.random()*.2,maxLife:.62,velocity:new C((Math.random()-.5)*1.7,.8+Math.random()*1.25,(Math.random()-.5)*1.7)})}for(;this.splashes.length>this.maxSplashes;)this.removeSplash(0);n-this.lastSplashAudioAt>.36&&(e.audio?.sweep?.(180,430,.12,.018),this.lastSplashAudioAt=n)}updateSplashes(e){for(let t=this.splashes.length-1;t>=0;t-=1){const n=this.splashes[t];n.life-=e,n.velocity.y-=e*2.1,n.mesh.position.addScaledVector(n.velocity,e),n.mesh.scale.multiplyScalar(1+e*1.35),n.mesh.material.opacity=Math.max(0,n.life/n.maxLife)*.42,n.life<=0&&this.removeSplash(t)}}removeSplash(e){const[t]=this.splashes.splice(e,1);t&&(this.world.scene.remove(t.mesh),t.mesh.material.dispose())}}function Ny(r,e,t=1){const n=(e+Math.PI*2)%(Math.PI*2),i=Math.round(n/(Math.PI*2)*r.length)%r.length,[s,o]=r[i];return[s*t,o*t]}class Fy{constructor(e){this.world=e}build(){for(const e of Qn)this.createZone(e)}createZone(e){const t={...e,position:new C(e.position[0],e.position[1],e.position[2]),visited:!1};this.world.zones.push(t);const n=new Pe;n.name=`ZONE_${e.id}_${e.name.replace(/\s+/g,"_")}`,n.position.copy(t.position),n.rotation.y=e.rotation||0,this.addInteractionRing(n,t),this.addLandmark(n,t),this.world.scene.add(n)}addInteractionRing(e,t){const n=new ne(new nr(1.7,2.05,4),new De({color:t.color,transparent:!0,opacity:.18,depthWrite:!1,side:Ot}));n.name=`ZONE_${t.id}_interaction_ring`,n.rotation.x=-Math.PI/2,n.rotation.z=Math.PI/4,n.position.y=.19,e.add(n)}addLandmark(e,t){const i=(t.id==="education"?this.world.cloneEnvironmentAsset(`EnvLandmark_${t.shape}`):null)||this.createFallbackLandmark(t),s=this.mergeStaticMeshes(i,t.id);s.name=`VIS_Landmark_${t.id}`,s.traverse?.(a=>{a.isMesh&&(a.castShadow=!1,a.receiveShadow=!0)}),e.add(s);const o=t.id==="education"?Uy(t.shape):null;if(o){if(o.type==="cylinder"){this.world.physics.createFixedCylinder([t.position.x,o.height/2,t.position.z],o.height/2,o.radius,{debugName:`ZONE_${t.id}_protected_landmark_collider`,visualName:`VIS_Landmark_${t.id}`,friction:.85,restitution:.02});return}this.world.physics.createFixedBox([t.position.x,o.size[1]/2,t.position.z],o.size,{debugName:`ZONE_${t.id}_protected_landmark_collider`,visualName:`VIS_Landmark_${t.id}`,rotation:[0,t.rotation||0,0],friction:.85,restitution:.02})}}mergeStaticMeshes(e,t){e.updateMatrixWorld(!0);const n=new Map,i=[];e.traverse(o=>{if(!o.isMesh||!o.geometry||Array.isArray(o.material)){o.isMesh&&i.push(o.clone());return}const a=o.material,c=o.geometry.clone();c.applyMatrix4(o.matrixWorld);const h=`${By(a)}:${Oy(c)}`;n.has(h)||n.set(h,{material:a,geometries:[]}),n.get(h).geometries.push(c)});const s=new Pe;s.name=`VIS_Landmark_${t}_merged`;for(const[o,a]of Array.from(n.values()).entries()){const c=a.geometries.length===1?a.geometries[0]:ec(a.geometries,!1);if(!c){for(const f of a.geometries)f.dispose();continue}const h=new ne(c,a.material);h.name=`FCCStaticMaterial_${o}`,h.castShadow=!1,h.receiveShadow=!0,s.add(h)}for(const o of i)s.add(o);return s.children.length?s:e}createFallbackLandmark(e){switch(e.shape){case"hub":return this.makeCourtyard(e);case"lab":return this.makeKeep(e);case"foundry":return this.makeFoundry(e);case"tower":return this.makeWatchtower(e);case"office":return this.makeGuildHall(e);case"terminal":return this.makeOracle(e);case"library":return this.makeLibrary(e);case"trophy":return this.makeShrine(e);case"vault":return this.makeVault(e);case"board":return this.makeNoticeBoard(e);case"gate":return this.makeCircuitGate(e);case"post":return this.makeLighthouse(e);case"portal":return this.makePortal(e);case"rampyard":return this.makeStuntMarker(e);case"pier":return this.makePier(e);case"farm":return new Pe;default:return this.makeCourtyard(e)}}makeCourtyard(e){const t=new Pe;return this.box(t,0,.22,0,5.8,.38,2.4,this.world.materials.paleStone),this.box(t,0,1.28,-.38,4.2,1.72,.42,this.world.materials.cable),this.box(t,0,1.32,-.62,3.5,1.12,.08,this.world.materials.glow),this.box(t,-2.46,.92,.78,.28,1.4,.28,this.world.materials.darkWood),this.box(t,2.46,.92,.78,.28,1.4,.28,this.world.materials.darkWood),t}makeKeep(e){const t=new Pe;this.box(t,0,.18,0,7.4,.36,5.8,this.world.materials.securityRoad),this.box(t,-2.2,1.85,-.2,1.15,3.7,1.2,this.world.materials.cable),this.box(t,0,2.35,-.2,1.15,4.7,1.2,this.world.materials.cable),this.box(t,2.2,1.55,-.2,1.15,3.1,1.2,this.world.materials.cable);for(const n of[-2.2,0,2.2])for(let i=0;i<4;i+=1)this.box(t,n,.85+i*.62,.44,.72,.08,.06,this.world.materials.screen);return this.box(t,0,3.05,1.7,5.8,.22,.28,this.world.materials.glowBlue),this.box(t,0,1.4,2.35,4.8,2.8,.18,this.world.materials.glowBlue),t}makeFoundry(e){const t=new Pe;return this.box(t,0,1.35,0,6.8,2.7,4.8,this.world.materials.darkWood),this.box(t,0,3,0,7.4,.5,5.2,this.world.materials.roof,[.18,0,0]),this.cylinder(t,2.3,3.2,-1.5,.45,4.2,this.world.materials.stone,12),this.box(t,-1.8,1.4,1.8,1.2,.18,.18,this.world.materials.warmGlow),t}makeWatchtower(e){const t=new Pe;return this.cylinder(t,0,2.8,0,1.65,5.6,this.world.materials.stone,18),this.cylinder(t,0,5.7,0,2.15,.72,this.world.materials.paleStone,18),this.cone(t,0,6.65,0,2.15,0,1.55,this.world.materials.roof,18),this.cylinder(t,0,6.25,0,.42,.3,this.world.materials.glowPink,12),t}makeGuildHall(e){const t=new Pe;this.box(t,0,1.6,0,7,3.2,5.4,this.world.materials.paleStone),this.box(t,0,3.5,0,7.7,.48,6,this.world.materials.roof,[.12,0,0]);for(const n of[-2.4,0,2.4])this.box(t,n,1.85,2.75,.72,1,.08,this.world.materials.glass);return t}makeOracle(e){const t=new Pe;return this.cylinder(t,0,.65,0,2.5,1.3,this.world.materials.stone,20),this.box(t,0,2.1,0,4.2,1.8,.45,this.world.materials.glow),this.cylinder(t,0,3.35,0,1.2,.2,this.world.materials.gold,24),t}makeLibrary(e){const t=new Pe;this.box(t,0,1.45,0,7.2,2.9,5.2,this.world.materials.paleStone);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,1.65,2.78,.18,3.3,this.world.materials.stone,10);return this.cone(t,0,3.55,0,4.4,.8,1.2,this.world.materials.roof,4,[0,Math.PI/4,0]),t}makeShrine(e){const t=new Pe;return this.cylinder(t,0,.45,0,2.4,.9,this.world.materials.paleStone,24),this.cylinder(t,0,1.8,0,.72,2.2,this.world.materials.gold,20),this.cone(t,0,3.22,0,1.15,.28,.9,this.world.materials.gold,20),t}makeVault(e){const t=new Pe;return this.box(t,0,1.25,0,5.4,2.5,4,this.world.materials.stone),this.cylinder(t,0,1.35,2.08,1.1,.28,this.world.materials.gold,24,[Math.PI/2,0,0]),this.box(t,0,2.85,0,5.8,.45,4.4,this.world.materials.roof),t}makeNoticeBoard(e){const t=new Pe;return this.box(t,-2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,2.3,1.25,0,.28,2.5,.28,this.world.materials.darkWood),this.box(t,0,2.05,0,5.4,2.4,.28,this.world.materials.wood),this.box(t,0,3.45,0,5.9,.35,.45,this.world.materials.roof),t}makeCircuitGate(e){const t=new Pe;for(const n of[-2.6,2.6])this.cylinder(t,n,2.1,0,.32,4.2,this.world.materials.stone,12);return this.box(t,0,4.1,0,5.8,.5,.6,this.world.materials.gold),t}makeLighthouse(e){const t=new Pe;return this.cylinder(t,0,2.4,0,1.25,4.8,this.world.materials.paleStone,18),this.cylinder(t,0,5,0,1.6,.7,this.world.materials.glass,18),this.cone(t,0,5.8,0,1.7,0,1.1,this.world.materials.roof,18),this.cylinder(t,0,5.1,0,1.1,.32,this.world.materials.glowBlue,18),t}makePortal(e){const t=new Pe;return this.cylinder(t,-1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.cylinder(t,1.35,2.2,0,.28,4.4,this.world.materials.stone,12),this.box(t,0,4.2,0,3.1,.45,.6,this.world.materials.stone),this.box(t,0,2.35,.02,2.1,2.8,.08,this.world.materials.glow),t}makeStuntMarker(e){return new Pe}makePier(e){const t=new Pe;this.box(t,0,.35,0,7,.7,2.3,this.world.materials.wood);for(const n of[-2.8,-1.4,0,1.4,2.8])this.cylinder(t,n,-.35,.85,.16,1.7,this.world.materials.darkWood,8);return t}box(e,t,n,i,s,o,a,c,h=[0,0,0]){const f=new ne(new ht(s,o,a),c);return f.position.set(t,n,i),f.rotation.set(h[0],h[1],h[2]),f.castShadow=!1,f.receiveShadow=!0,e.add(f),f}cylinder(e,t,n,i,s,o,a,c=16,h=[0,0,0]){const f=new ne(new Jt(s,s,o,c),a);return f.position.set(t,n,i),f.rotation.set(h[0],h[1],h[2]),f.castShadow=!1,f.receiveShadow=!0,e.add(f),f}cone(e,t,n,i,s,o,a,c,h=16,f=[0,0,0]){const l=new ne(new Sn(s,a,h,1,!1,0,Math.PI*2),c);return l.position.set(t,n,i),l.rotation.set(f[0],f[1],f[2]),l.castShadow=!1,l.receiveShadow=!0,e.add(l),l}}function Uy(r){switch(r){case"hub":return{type:"cylinder",radius:2.45,height:2.4};case"tower":return{type:"cylinder",radius:1.95,height:7.2};case"post":return{type:"cylinder",radius:1.45,height:6.2};case"lab":return{type:"box",size:[5.9,3.6,4.9]};case"foundry":return{type:"box",size:[6.8,3.1,5]};case"office":return{type:"box",size:[7.2,3.4,5.6]};case"library":return{type:"box",size:[17.2,12.4,11.6]};case"terminal":return{type:"box",size:[4.4,2.2,1.2]};case"trophy":return{type:"cylinder",radius:1.35,height:3.3};case"vault":return{type:"box",size:[5.4,2.9,4.1]};case"board":return{type:"box",size:[5.8,3.2,.42]};case"pier":return{type:"box",size:[7.1,.8,2.4]};case"gate":case"portal":case"farm":case"rampyard":return null;default:return{type:"box",size:[4.8,3,4]}}}function Oy(r){const e=Object.entries(r.attributes).map(([t,n])=>`${t}:${n.itemSize}:${n.normalized?1:0}:${n.array?.constructor?.name||"array"}`).sort().join("|");return`${r.index?"indexed":"plain"}:${e}`}function By(r){return[r.type,r.color?.getHexString?.()||"",r.emissive?.getHexString?.()||"",r.emissiveIntensity??"",r.roughness??"",r.metalness??"",r.opacity??1,r.transparent?1:0,r.side??jt,r.vertexColors?1:0,r.alphaTest??0,ky(r.map)].join(":")}function ky(r){return r?r.source?.uuid||r.image?.src||r.uuid:""}const Ki={road:{id:"road",label:"road",forwardGrip:1,sideGrip:1,engineFactor:1,topSpeedFactor:1,drag:1,dustColor:7299664,skidColor:1446928,skidMarks:!0},grass:{id:"grass",label:"grass",forwardGrip:.86,sideGrip:.72,engineFactor:.92,topSpeedFactor:.86,drag:.988,dustColor:7244866,skidColor:2504733,skidMarks:!1},sand:{id:"sand",label:"sand",forwardGrip:.72,sideGrip:.56,engineFactor:.76,topSpeedFactor:.68,drag:.965,dustColor:13804911,skidColor:9265976,skidMarks:!1},shore:{id:"shore",label:"shore",forwardGrip:.68,sideGrip:.48,engineFactor:.7,topSpeedFactor:.58,drag:.948,dustColor:10213071,skidColor:7315872,skidMarks:!1},water:{id:"water",label:"water",forwardGrip:.38,sideGrip:.28,engineFactor:.42,topSpeedFactor:.36,drag:1,dustColor:12124144,skidColor:8313812,skidMarks:!1}};class zy{constructor({scene:e,physics:t,resumeData:n,environmentAssets:i}){this.scene=e,this.physics=t,this.resumeData=n,this.environmentAssets=i,this.materials=oy(),this.zones=[],this.decor=[],this.boostPads=[],this.ramps=[],this.collectibles=[],this.potatoes=[],this.surfaceState={label:"land",inWater:!1,nearShore:!1},this.roadSegments=_l,this.checkpoints=sv.map(([s,o,a])=>new C(s,o,a)),this.landscapeQuality=this.readLandscapeQuality(),this.circuit={active:!1,startedAt:0,checkpoint:0,best:Number(localStorage.getItem("portfolio-drive-best-lap")||0)},this.securityScan={active:!1,complete:!1,startedAt:0},this.build()}build(){this.terrain=new Cy(this),this.water=new Dy(this),this.roads=new vy(this),this.zonesSystem=new Fy(this),this.stuntPark=new Ey(this),this.setPieces=new Sy(this),this.props=new xy(this),this.foliage=new my(this),this.potatoFarm=new _y(this),this.atmosphere=new fy(this),this.terrain.build(),this.water.build(),this.roads.build(),this.zonesSystem.build(),this.stuntPark.build(),this.setPieces.build(),this.potatoFarm.build(),this.props.build(),this.foliage.build(),this.createCollectibles(),this.atmosphere.build()}cloneEnvironmentAsset(e){return this.environmentAssets?.clone?.(e)||null}readLandscapeQuality(){const e=localStorage.getItem("portfolio-drive-landscape-quality");return cn[e]?e:Gy()?"low":"medium"}getQualityProfile(){return cn[this.landscapeQuality]||cn.medium}setLandscapeQuality(e){return cn[e]?(this.landscapeQuality=e,localStorage.setItem("portfolio-drive-landscape-quality",e),this.water?.applyQuality?.(),this.foliage?.applyQuality(),this.setPieces?.applyQuality(),this.atmosphere?.applyQuality?.(),this.onQualityChange?.(e),this.landscapeQuality):this.landscapeQuality}cycleLandscapeQuality(){const e=ha.indexOf(this.landscapeQuality);return this.setLandscapeQuality(ha[(e+1)%ha.length])}isClearForProp(e,t,n=2){if(!this.terrain?.containsPoint(e,t,n+6)||this.roads?.isNear(e,t,n+2.8))return!1;for(const i of Qn){const s=e-i.position[0],o=t-i.position[2];if(Math.hypot(s,o)<i.radius+n+5)return!1}return!0}createCollectibles(){const e=[[-62,0,68],[28,0,96],[96,0,-18],[-84,0,-54],[18,0,-112],[120,0,58],[-24,0,34]];for(let t=0;t<e.length;t+=1){const n=new ne(new tr(1.15,0),new ze({color:7995333,emissive:879951,roughness:.24,metalness:.12}));n.name=`Collectible_DataShard_${t}`,n.position.set(e[t][0],2.2,e[t][2]),this.scene.add(n),this.collectibles.push({mesh:n,collected:localStorage.getItem(`portfolio-drive-shard-${t}`)==="1",index:t}),n.visible=!this.collectibles[t].collected}}checkBoostPad(e){return this.boostPads.find(t=>e.distanceTo(t.position)<4.2)||null}checkRampAir(e,t){if(t<3.2)return!1;for(const n of this.ramps)if(e.distanceTo(n.position)<n.radius&&!n.triggered)return n.triggered=!0,window.setTimeout(()=>{n.triggered=!1},1e3),!0;return!1}checkCollectibles(e){const t=[];for(const n of this.collectibles)n.collected||e.distanceTo(n.mesh.position)>3.4||(n.collected=!0,n.mesh.visible=!1,localStorage.setItem(`portfolio-drive-shard-${n.index}`,"1"),t.push(n));return t}getCollectedCount(){return this.collectibles.filter(e=>e.collected).length}setPotatoCount(e){this.potatoFarm?.setPotatoCount(e)}spawnPotato(){return this.potatoFarm?.spawnPotato()}nearestZone(e){let t=null;for(const n of this.zones){const i=e.distanceTo(n.position);i<=n.radius+4&&(!t||i<t.distance)&&(t={zone:n,distance:i})}return t}getRespawnPose(e="landing"){const t=this.zones.find(s=>s.id===e)||this.zones.find(s=>s.id==="landing");if(!t)return{position:new C(4,1.45,26),heading:0};if(t.id==="landing")return{position:t.position.clone().add(new C(4,1.08,-16)),heading:.15};if(t.id==="drift")return{position:t.position.clone().add(new C(-18,1.08,-30)),heading:.18};const n=t.id==="education"?18:t.id==="security"?15:10,i=new C(Math.sin(t.rotation||0)*-n,1.08,Math.cos(t.rotation||0)*-n);return{position:t.position.clone().add(i),heading:t.rotation||0}}getRespawnPosition(e="landing"){return this.getRespawnPose(e).position}getSurfaceInfo(e){if(!e)return Ki.road;const t=Math.hypot(e.x,e.z),n=t>xt*1.012||e.y<An+.24,i=this.roads?.isNear(e.x,e.z,.9);let s=Ki.grass;return n?s=Ki.water:i?s=Ki.road:t>xt*.965?s=Ki.shore:t>xt*.88&&(s=Ki.sand),this.surfaceState={label:s.label,inWater:s.id==="water",nearShore:s.id==="shore"||s.id==="sand",onRoad:i},s}startCircuit(e){this.circuit.active=!0,this.circuit.startedAt=e,this.circuit.checkpoint=0}startSecurityScan(e){return this.securityScan.active?!1:(this.securityScan.active=!0,this.securityScan.startedAt=e,!0)}completeSecurityScan(){this.securityScan.active=!1,this.securityScan.complete=!0}updateCircuit(e,t){if(!this.circuit.active)return null;const n=this.checkpoints[this.circuit.checkpoint+1];if(!n||e.distanceTo(n)>10)return null;if(this.circuit.checkpoint+=1,this.circuit.checkpoint>=this.checkpoints.length-1){const i=t-this.circuit.startedAt;return this.circuit.active=!1,this.circuit.checkpoint=0,(!this.circuit.best||i<this.circuit.best)&&(this.circuit.best=i,localStorage.setItem("portfolio-drive-best-lap",String(i))),{finished:!0,lap:i}}return{checkpoint:this.circuit.checkpoint}}update(e,t,n,i){this.water.update(e,t,n,i),this.foliage.update(e,t,n),this.potatoFarm.update(e),this.setPieces.update(e,t),this.atmosphere.update(e,t);for(const s of this.collectibles)s.collected||(s.mesh.rotation.y+=e*1.1,s.mesh.position.y=2.2+Math.sin(t*1.6+s.index)*.28)}}function Gy(){const r=window.innerWidth<=760,e=window.matchMedia?.("(pointer: coarse)")?.matches===!0,t=navigator.maxTouchPoints>1;return r||e||t}class Vy{constructor({game:e,achievements:t,audio:n}){this.game=e,this.achievements=t,this.audio=n,this.projectIndex=0,this.activeTab="options",this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.lastNotification={message:"",time:0},this.refs={loading:document.getElementById("loading"),titleScreen:document.getElementById("title-screen"),startButton:document.getElementById("start-button"),zoneReadout:document.getElementById("zone-readout"),speedReadout:document.getElementById("speed-readout"),prompt:document.getElementById("interaction-prompt"),promptKind:document.getElementById("prompt-kind"),promptTitle:document.getElementById("prompt-title"),promptAction:document.getElementById("prompt-action"),panel:document.getElementById("panel"),panelKind:document.getElementById("panel-kind"),panelTitle:document.getElementById("panel-title"),panelBody:document.getElementById("panel-body"),panelActions:document.getElementById("panel-actions"),panelClose:document.getElementById("panel-close"),menu:document.getElementById("menu"),menuButton:document.getElementById("menu-button"),menuClose:document.getElementById("menu-close"),menuContent:document.getElementById("menu-content"),mapModal:document.getElementById("map-modal"),mapButton:document.getElementById("map-button"),mapClose:document.getElementById("map-close"),worldMap:document.getElementById("world-map"),worldMapLayer:document.getElementById("world-map-layer"),mapZoomIn:document.getElementById("map-zoom-in"),mapZoomOut:document.getElementById("map-zoom-out"),mapReset:document.getElementById("map-reset"),mapStatus:document.getElementById("map-status"),minimap:document.getElementById("minimap"),minimapWorld:document.getElementById("minimap-world"),notifications:document.getElementById("notifications"),soundButton:document.getElementById("sound-button")},this.setup()}setup(){this.refs.startButton.addEventListener("click",()=>this.game.startDriving()),this.refs.panelClose.addEventListener("click",()=>this.closePanel()),this.refs.menuButton.addEventListener("click",()=>this.toggleMenu()),this.refs.menuClose.addEventListener("click",()=>this.closeMenu()),this.refs.mapButton.addEventListener("click",()=>this.toggleMap()),this.refs.mapClose.addEventListener("click",()=>this.closeMap()),this.refs.mapZoomIn.addEventListener("click",()=>this.zoomMap(.22)),this.refs.mapZoomOut.addEventListener("click",()=>this.zoomMap(-.22)),this.refs.mapReset.addEventListener("click",()=>this.resetMapView()),this.setupMapDrag(),this.refs.soundButton.addEventListener("click",()=>{this.audio.resume();const e=this.audio.toggleMute();this.refs.soundButton.textContent=e?"Muted":"Sound",this.notify(e?"Sound muted":"Sound enabled")}),document.querySelectorAll(".menu-tabs button").forEach(e=>{e.addEventListener("click",()=>{this.activeTab=e.dataset.tab,this.renderMenu()})}),this.achievements.onUnlock=e=>{this.notify(`Achievement unlocked: ${e.title}`)},this.renderMap(),this.renderMinimap(),this.renderMenu()}markLoaded(){this.refs.loading.classList.add("is-hidden")}hideTitle(){this.refs.titleScreen.hidden=!0,document.body.classList.add("is-driving")}showPrompt(e){if(!e||this.isPanelOpen()){this.refs.prompt.hidden=!0;return}this.refs.promptKind.textContent=e.kind,this.refs.promptTitle.textContent=e.name,e.potatoFarm?this.refs.promptAction.textContent="Press P to summon. Press E for farm log":e.scanRequired&&!this.game.world.securityScan.complete?this.refs.promptAction.textContent="Press E to run scanner":this.refs.promptAction.textContent=e.startsCircuit?"Press E to start circuit":"Press E to interact",this.refs.prompt.hidden=!1}hidePrompt(){this.refs.prompt.hidden=!0}openZone(e,t={}){if(this.audio.click(),e.scanRequired&&!t.skipScan&&!this.game.world.securityScan.complete){this.game.runSecurityScan(e);return}if(this.achievements.visitZone(e),this.game.recordZoneVisit(e),e.startsCircuit&&this.game.startCircuit(),e.projectGallery){this.openProjectGallery(e);return}const n=this.game.getZoneLines(e);this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,Mi(this.refs.panelBody),Mi(this.refs.panelActions);for(const i of n){const s=document.createElement("p");s.textContent=i,this.refs.panelBody.append(s)}if(e.potatoFarm){const i=document.createElement("p");i.className="panel-muted",i.textContent=`Farm counter: ${this.game.analytics?.potatoCountLabel||"--"}`,this.refs.panelBody.append(i);const s=ga("Summon Potato",()=>this.game.summonPotato());this.refs.panelActions.append(s)}if(e.id==="data-pier"){const i=document.createElement("p");i.className="panel-muted",i.textContent=this.game.analytics?.isEnabled?"Signal collection is active.":"Signal collection is offline.",this.refs.panelBody.append(i)}this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}openProjectGallery(e){this.refs.panelKind.textContent=e.kind,this.refs.panelTitle.textContent=e.name,Mi(this.refs.panelBody),Mi(this.refs.panelActions);const t=this.game.resumeData.projects||[],n=t[this.projectIndex%t.length]||"Project data unavailable.",i=document.createElement("span");i.className="project-counter",i.textContent=`${this.projectIndex+1} / ${t.length}`;const s=document.createElement("h3"),[o,a=""]=n.split(": ");s.textContent=o;const c=document.createElement("p");c.textContent=a||n;const h=document.createElement("p");h.className="panel-muted",h.textContent="Use Previous and Next to browse the project record from the resume data.",this.refs.panelBody.append(i,s,c,h);const f=ga("Previous",()=>{this.projectIndex=(this.projectIndex-1+t.length)%t.length,this.openProjectGallery(e)}),l=ga("Next",()=>{this.projectIndex=(this.projectIndex+1)%t.length,this.openProjectGallery(e)});this.refs.panelActions.append(f,l),this.addActions(e.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(e)}addActions(e){for(const t of e){const n=document.createElement("a");n.href=t.href,n.textContent=t.label,n.target="_blank",n.rel="noopener noreferrer",this.refs.panelActions.append(n)}}closePanel(){this.refs.panel.hidden=!0,this.game.clearFocus()}isPanelOpen(){return!this.refs.panel.hidden||!this.refs.menu.hidden||!this.refs.mapModal.hidden}toggleMenu(){this.refs.menu.hidden?this.openMenu():this.closeMenu()}openMenu(){this.audio.click(),this.refs.menu.hidden=!1,this.renderMenu()}closeMenu(){this.refs.menu.hidden=!0}toggleMap(){this.refs.mapModal.hidden?this.openMap():this.closeMap()}openMap(){this.audio.click(620),this.refs.mapModal.hidden=!1,this.renderMap()}closeMap(){this.refs.mapModal.hidden=!0}setupMapDrag(){const e=this.refs.worldMap;e.addEventListener("pointerdown",n=>{n.target.closest(".map-pin")||(this.mapState.dragging=!0,this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,e.setPointerCapture(n.pointerId))}),e.addEventListener("pointermove",n=>{if(!this.mapState.dragging)return;const i=n.clientX-this.mapState.lastX,s=n.clientY-this.mapState.lastY;this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,this.mapState.x+=i,this.mapState.y+=s,this.applyMapTransform()});const t=n=>{this.mapState.dragging=!1,e.hasPointerCapture(n.pointerId)&&e.releasePointerCapture(n.pointerId)};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("wheel",n=>{n.preventDefault(),this.zoomMap(n.deltaY>0?-.12:.12)},{passive:!1})}zoomMap(e){this.mapState.scale=Math.max(.8,Math.min(2.4,this.mapState.scale+e)),this.applyMapTransform()}resetMapView(){this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.applyMapTransform()}applyMapTransform(){this.refs.worldMapLayer.style.transform=`translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`,this.refs.mapStatus.textContent=`Zoom ${Math.round(this.mapState.scale*100)}%`}renderMenu(){document.querySelectorAll(".menu-tabs button").forEach(e=>{e.classList.toggle("is-active",e.dataset.tab===this.activeTab)}),Mi(this.refs.menuContent),this.activeTab==="options"?this.renderOptions():this.activeTab==="controls"?this.renderControls():this.activeTab==="achievements"?this.renderAchievements():this.renderAbout()}renderOptions(){const e=document.createElement("div");e.className="menu-grid",e.append(Ls("Respawn","Move the car back to the Start Hub.",()=>{this.game.respawn(),this.closeMenu()}),Ls("Reset Props","Put loose objects back near their starting positions.",()=>{this.game.resetWorld(),this.notify("World props reset")}),Ls("Sound",this.audio.muted?"Currently muted.":"Currently enabled.",()=>{const t=this.audio.toggleMute();this.refs.soundButton.textContent=t?"Muted":"Sound",this.renderMenu()}),Ls("Landscape Quality",`Currently ${Jh(this.game.world.landscapeQuality)}. Controls foliage, particles, animated signals, water detail, and render cost.`,()=>{const t=this.game.world.cycleLandscapeQuality();this.renderMenu(),this.notify(`Landscape quality: ${Jh(t)}`)}),Ls("Reset Achievements","Clear local achievement progress for this browser.",()=>{this.achievements.reset(),this.renderMenu(),this.notify("Achievements reset")})),this.refs.menuContent.append(e)}renderControls(){const e=[["WASD / Arrows","Drive"],["Shift","Boost"],["C","Handbrake drift"],["Ctrl / B","Brake"],["W + S from rest","Charge burnout, release S for wheelie"],["Space","Jump"],["E / Enter","Interact"],["P","Summon potato at the farm"],["M","Map"],["R","Respawn"],["Mouse drag","Move camera"],["Gamepad","Left stick, A interact, B boost, LT brake, Y jump"]],t=document.createElement("div");t.className="control-grid";for(const[n,i]of e){const s=document.createElement("span");s.textContent=n;const o=document.createElement("strong");o.textContent=i,t.append(s,o)}this.refs.menuContent.append(t)}renderAchievements(){const e=this.achievements.getProgress(),t=document.createElement("p");t.className="panel-muted",t.textContent=`${e.unlocked}/${e.total} unlocked. Distance driven: ${Math.round(e.distance)} m.`;const n=document.createElement("div");n.className="achievement-list";for(const i of this.achievements.definitions){const s=document.createElement("div");s.className="achievement",s.classList.toggle("is-unlocked",this.achievements.unlocked.has(i.id));const o=document.createElement("strong");o.textContent=i.title;const a=document.createElement("span");a.textContent=i.description,s.append(o,a),n.append(s)}this.refs.menuContent.append(t,n)}renderAbout(){const e=["Three.js renders the island drive-world. Rapier handles the driving physics.","Resume content, project stops, contact links, and counters are connected directly to the portfolio."];for(const t of e){const n=document.createElement("p");n.textContent=t,this.refs.menuContent.append(n)}}renderMap(){Mi(this.refs.worldMapLayer),this.renderMapBase(this.refs.worldMapLayer,"map");for(const e of Qn){const t=document.createElement("button");t.type="button",t.className="map-pin";const n=Zi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),t.textContent=e.name,t.title=`${e.name} - ${e.kind}`,t.addEventListener("click",()=>{this.game.respawn(e.id),this.closeMap()}),this.refs.worldMapLayer.append(t)}this.mapPlayer=document.createElement("span"),this.mapPlayer.className="map-player",this.refs.worldMapLayer.append(this.mapPlayer),this.applyMapTransform()}renderMinimap(){Mi(this.refs.minimapWorld),this.renderMapBase(this.refs.minimapWorld,"minimap");for(const e of Qn){const t=document.createElement("span");t.className="minimap-pin";const n=Zi(e.position[0],e.position[2]);t.style.left=`${n.x}%`,t.style.top=`${n.y}%`,t.style.setProperty("--pin-color",e.color),this.refs.minimapWorld.append(t)}this.minimapPlayer=document.createElement("span"),this.minimapPlayer.className="minimap-player",this.refs.minimapWorld.append(this.minimapPlayer)}renderMapBase(e,t){const n=document.createElement("div");n.className=`${t}-island`;const i=Yt*2+Rn*2;n.style.inset=`${(Yt+Rn-xt)/i*100}%`,e.append(n);for(const s of Hu){const o=document.createElement("span");o.className=`${t}-district`;const a=Zi(s.center[0],s.center[1]);o.style.left=`${a.x}%`,o.style.top=`${a.y}%`,o.style.width=`${s.size[0]/(Yt*2+Rn*2)*100}%`,o.style.height=`${s.size[1]/(Yt*2+Rn*2)*100}%`,o.style.setProperty("--district-color",s.color),e.append(o)}for(const s of ev)for(const[o,a,c,h,f=0]of Wy(s.points,!1,s.width)){const l=document.createElement("span");l.className=`${t}-canal`;const u=Zi(o,a);l.style.left=`${u.x}%`,l.style.top=`${u.y}%`,l.style.width=`${c/(Yt*2+Rn*2)*100}%`,l.style.height=`${h/(Yt*2+Rn*2)*100}%`,l.style.transform=`translate(-50%, -50%) rotate(${f}rad)`,e.append(l)}e.append(Hy(t))}update({speed:e,activeZone:t,circuit:n}){this.refs.speedReadout.textContent=`${Math.round(Math.abs(e)*3.6)} km/h`,this.refs.zoneReadout.textContent=t?t.name:"Road",this.refs.soundButton.textContent=this.audio.muted?"Muted":"Sound",this.showPrompt(t),n?.active&&(this.refs.zoneReadout.textContent=`Circuit ${n.checkpoint}/${this.game.world.checkpoints.length-1}`),this.updateMapMarkers(t)}updateMapMarkers(e){const t=this.game.vehicle.position,n=Zi(t.x,t.z),i=this.game.vehicle.heading||0;this.mapPlayer&&(this.mapPlayer.style.left=`${n.x}%`,this.mapPlayer.style.top=`${n.y}%`,this.mapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),this.minimapPlayer&&(this.minimapPlayer.style.left=`${n.x}%`,this.minimapPlayer.style.top=`${n.y}%`,this.minimapPlayer.style.transform=`translate(-50%, -50%) rotate(${i}rad)`),document.querySelectorAll(".map-pin").forEach(s=>{s.classList.toggle("is-active",e&&s.textContent===e.name)})}notify(e){const t=performance.now();if(e===this.lastNotification.message&&t-this.lastNotification.time<950)return;this.lastNotification={message:e,time:t};const n=document.createElement("div");n.className="notification",n.textContent=e,this.refs.notifications.append(n),setTimeout(()=>n.classList.add("is-visible"),20),setTimeout(()=>{n.classList.remove("is-visible"),setTimeout(()=>n.remove(),260)},3600)}setPotatoCount(e){this.game.world?.setPotatoCount?.(e)}}function Zi(r,e){const t=Yt*2+Rn*2;return{x:(r+Yt+Rn)/t*100,y:(e+Yt+Rn)/t*100}}function Hy(r){const e=Yt*2+Rn*2,t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("class",`${r}-roads-svg`),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("aria-hidden","true");for(const n of Ql){const i=n.closed?[...n.points,n.points[0]]:n.points,s=document.createElementNS("http://www.w3.org/2000/svg","polyline");s.setAttribute("class",`${r}-road-line ${r}-road-${n.hierarchy}`),s.setAttribute("points",i.map(([o,a])=>{const c=Zi(o,a);return`${c.x.toFixed(2)},${c.y.toFixed(2)}`}).join(" ")),s.setAttribute("stroke-width",`${(n.width+3.4)/e*100}`),t.append(s)}return t}function Wy(r,e,t){const n=[],i=r.length-1;for(let s=0;s<i;s+=1){const o=r[s],a=r[(s+1)%r.length],c=a[0]-o[0],h=a[1]-o[1],f=Math.hypot(c,h);n.push([(o[0]+a[0])/2,(o[1]+a[1])/2,t,f+t*.64,Math.atan2(c,h)])}return n}function Mi(r){for(;r.firstChild;)r.removeChild(r.firstChild)}function ga(r,e){const t=document.createElement("button");return t.type="button",t.textContent=r,t.addEventListener("click",e),t}function Ls(r,e,t){const n=document.createElement("button");n.type="button",n.className="option-tile";const i=document.createElement("strong");i.textContent=r;const s=document.createElement("span");return s.textContent=e,n.append(i,s),n.addEventListener("click",t),n}function Jh(r){return`${r.charAt(0).toUpperCase()}${r.slice(1)}`}const Zr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class xs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Xy=new rr(-1,1,1,-1,0,1);class qy extends ut{constructor(){super(),this.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ke([0,2,0,0,2,0],2))}}const Yy=new qy;class tc{constructor(e){this._mesh=new ne(Yy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Xy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class $y extends xs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Pt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ir.clone(e.uniforms),this.material=new Pt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new tc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Qh extends xs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Ky extends xs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Zy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new le);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:rn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new $y(Zr),this.copyPass.material.blending=Nn,this.timer=new Vp}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Qh!==void 0&&(o instanceof Qh?n=!0:o instanceof Ky&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new le);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class jy extends xs{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new fe}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Jy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class hs extends xs{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new le(e.x,e.y):new le(256,256),this.clearColor=new fe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(s,o,{type:rn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const l=new Zt(s,o,{type:rn});l.texture.name="UnrealBloomPass.h"+f,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new Zt(s,o,{type:rn});u.texture.name="UnrealBloomPass.v"+f,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),o=Math.round(o/2)}const a=Jy;this.highPassUniforms=ir.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new le(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ir.clone(Zr.uniforms),this.blendMaterial=new Pt({uniforms:this.copyUniforms,vertexShader:Zr.vertexShader,fragmentShader:Zr.fragmentShader,premultipliedAlpha:!0,blending:_a,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new fe,this._oldClearAlpha=1,this._basic=new De,this._fsQuad=new tc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new le(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=hs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=hs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Pt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new le(.5,.5)},direction:{value:new le(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Pt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}hs.BlurDirectionX=new le(1,0);hs.BlurDirectionY=new le(0,1);const Vr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Qy extends xs{constructor(){super(),this.isOutputPass=!0,this.uniforms=ir.clone(Vr.uniforms),this.material=new Iu({name:Vr.name,uniforms:this.uniforms,vertexShader:Vr.vertexShader,fragmentShader:Vr.fragmentShader}),this._fsQuad=new tc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Sl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ml?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===so?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Tl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===El?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===wl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class eS{constructor({canvas:e,scene:t,camera:n}){this.canvas=e,this.scene=t,this.camera=n,this.renderer=new qx({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.composer=null,this.bloom=null,this.postprocessingEnabled=!1,this.maxPixelRatio=1.15}setup(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.maxPixelRatio)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.type=Os,this.renderer.outputColorSpace=Et,this.renderer.toneMapping=so,this.renderer.toneMappingExposure=1.04,this.composer=new Zy(this.renderer),this.composer.addPass(new jy(this.scene,this.camera)),this.bloom=new hs(new le(window.innerWidth,window.innerHeight),.18,.58,.92),this.composer.addPass(this.bloom),this.composer.addPass(new Qy)}setQuality(e){const t={low:{pixelRatio:1,shadows:!1,post:!1,bloom:.04},medium:{pixelRatio:1.15,shadows:!1,post:!1,bloom:.08},high:{pixelRatio:1.35,shadows:!0,post:!0,bloom:.18}}[e]||{pixelRatio:1.15,shadows:!1,post:!1,bloom:.08};this.maxPixelRatio=t.pixelRatio,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.maxPixelRatio)),this.renderer.shadowMap.enabled=t.shadows,this.postprocessingEnabled=t.post,this.bloom&&(this.bloom.strength=t.bloom,e==="low"?this.bloom.radius=.32:e==="high"?this.bloom.radius=.52:this.bloom.radius=.4)}render(){this.composer&&this.postprocessingEnabled?this.composer.render():this.renderer.render(this.scene,this.camera)}resize(){const e=Math.min(window.devicePixelRatio||1,this.maxPixelRatio);this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.composer?.setSize(window.innerWidth,window.innerHeight),this.bloom?.resolution.set(window.innerWidth,window.innerHeight)}}class tS{constructor(e){this.RAPIER=e,this.canvas=document.getElementById("play-canvas"),this.scene=new bf,this.camera=new qt(58,window.innerWidth/window.innerHeight,.1,900),this.rendererSystem=new eS({canvas:this.canvas,scene:this.scene,camera:this.camera}),this.renderer=this.rendererSystem.renderer,this.ticker=new Yx,this.started=!1,this.activeZone=null,this.resumeData=null,this.lights={},this.fogDay=new fe(12052718),this.fogWarm=new fe(16760710),this.debugReadout=null,this.debugEnabled=!1,this.debugFrame=0,this.debugColliderOverlay=null,this.lastAudioZoneId=null}async init(){this.resumeData=await this.fetchResumeData(),this.setupRenderer(),this.setupScene(),this.input=new $x(this.canvas),this.audio=new Zx,this.achievements=new ov,this.physics=new uv(this.RAPIER),this.environmentAssets=await ry(),this.world=new zy({scene:this.scene,physics:this.physics,resumeData:this.resumeData,environmentAssets:this.environmentAssets}),this.world.onQualityChange=e=>this.rendererSystem.setQuality(e),this.rendererSystem.setQuality(this.world.landscapeQuality),this.vehicle=new Jv({scene:this.scene,physics:this.physics,achievements:this.achievements,audio:this.audio}),this.cameraRig=new ny(this.camera,this.vehicle,this.input),this.analytics=new lv,this.ui=new Vy({game:this,achievements:this.achievements,audio:this.audio}),this.analytics.init().then(()=>{Number.isFinite(this.analytics.potatoCount)&&this.ui.setPotatoCount(this.analytics.potatoCount)}).catch(()=>{}),this.setupEvents(),this.setupDebug(),this.ui.markLoaded(),this.renderer.setAnimationLoop(e=>this.loop(e))}async fetchResumeData(){const e=await fetch("resume_data.json",{cache:"no-store"});if(!e.ok)throw new Error(`Unable to load resume_data.json: ${e.status}`);return e.json()}setupRenderer(){this.rendererSystem.setup()}setupScene(){this.scene.background=new fe(9426675),this.scene.fog=new Bl(12052718,132,520),this.camera.position.set(0,9,-18);const e=new Fp(16769983,2112572,1.22);this.scene.add(e);const t=new pl(16757615,3.85);t.position.set(-132,58,-102),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-96,t.shadow.camera.right=96,t.shadow.camera.top=96,t.shadow.camera.bottom=-96,t.shadow.camera.near=1,t.shadow.camera.far=360,t.shadow.bias=-15e-5,t.shadow.normalBias=.08,this.scene.add(t);const n=new pl(7661823,1.68);n.position.set(72,34,92),this.scene.add(n),this.lights={hemi:e,sun:t,rim:n}}setupEvents(){window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>{document.hidden?this.audio?.context?.suspend?.():this.audio?.resume()})}setupDebug(){this.debugReadout=document.getElementById("debug-readout");const e=new URLSearchParams(window.location.search);this.debugEnabled=e.has("debugDrive")||localStorage.getItem("portfolio-drive-debug")==="1",this.debugReadout&&this.debugEnabled&&(this.debugReadout.hidden=!1),window.__portfolioDrive={game:this,sampleCanvas:()=>{this.rendererSystem.render();const t=this.renderer.getContext(),n=Math.max(1,Math.min(16,this.renderer.domElement.width)),i=Math.max(1,Math.min(16,this.renderer.domElement.height)),s=new Uint8Array(n*i*4);return t.readPixels(0,0,n,i,t.RGBA,t.UNSIGNED_BYTE,s),Array.from(s).reduce((o,a)=>o+a,0)},ready:()=>!!(this.world&&this.vehicle&&this.renderer),start:()=>this.startDriving(),respawn:t=>this.respawn(t),summonPotato:()=>this.summonPotato(),nearest:()=>this.activeZone?.name||null,colliders:()=>this.physics.getColliderDebugData(),showColliders:()=>this.createColliderDebugOverlay(),debug:(t=!0)=>{this.debugEnabled=!!t,localStorage.setItem("portfolio-drive-debug",this.debugEnabled?"1":"0"),this.debugReadout&&(this.debugReadout.hidden=!this.debugEnabled)}},e.has("debugColliders")&&this.createColliderDebugOverlay()}startDriving(){this.started=!0,this.audio.resume(),this.ui.hideTitle(),this.ui.notify("Drive started")}loop(e){this.ticker.tick(e);const t=this.ticker.delta,n=this.ticker.elapsed;this.input.update(),this.handleGlobalInput();const i=this.vehicle.position,s=this.world.nearestZone(i);this.activeZone=s?.zone||null,this.updateZoneStinger(this.activeZone),this.vehicle.setSurface(this.world.getSurfaceInfo(i));const o=this.started&&!this.ui.isPanelOpen();this.physics.step(t,c=>{if(o){this.vehicle.update(this.input,c);const h=this.world.checkBoostPad(this.vehicle.position);if(h&&this.vehicle.boostFromPad(h)&&this.ui?.notify?.("Boost pad launched"),this.world.checkCollectibles(this.vehicle.position).length){const l=this.world.getCollectedCount();this.ui?.notify?.(`Data shard ${l}/${this.world.collectibles.length}`),l===this.world.collectibles.length&&this.achievements.unlock("data_shards")}}}),this.vehicle.postPhysics(),o||this.vehicle.idleDampen(),this.world.update(t,n,this.vehicle.position,this.vehicle),this.world.checkRampAir(this.vehicle.position,this.vehicle.body.linvel().y)&&this.achievements.unlock("ramp_jump"),this.updateLighting(n),this.cameraRig.update(t),this.audio.update(this.vehicle.speed,this.vehicle.controller?.driveState),this.ui.update({speed:this.vehicle.speed,activeZone:this.activeZone,circuit:this.world.circuit}),this.updateDebugReadout(t);const a=this.world.updateCircuit(this.vehicle.position,n);a?.finished?this.ui.notify(`Circuit finished: ${nS(a.lap)}`):a?.checkpoint&&(this.audio.click(700),this.ui.notify(`Checkpoint ${a.checkpoint}`)),this.rendererSystem.render(),this.input.clearTransient()}handleGlobalInput(){if(!this.started&&this.input.consume("interact")){this.startDriving();return}this.input.consume("menu")&&this.ui.toggleMenu(),this.input.consume("map")&&this.ui.toggleMap(),this.input.consume("potato")&&!this.ui.isPanelOpen()&&this.summonPotato(),this.input.consume("interact")&&this.activeZone&&!this.ui.isPanelOpen()&&this.ui.openZone(this.activeZone)}recordZoneVisit(e){this.analytics?.recordZone(e?.id)}async summonPotato(){const e=this.world.zones.find(s=>s.id==="potato");if(!e)return;const t=this.vehicle.position;if(!(Math.hypot(t.x-e.position.x,t.z-e.position.z)<=e.radius+6)){this.ui?.notify?.("Drive to the Potato Farm to summon one");return}this.world.spawnPotato(),this.achievements.unlock("potato_summon"),this.audio.click(190),this.ui?.notify?.("Potato summoned");const i=await this.analytics?.recordPotatoSummon?.();Number.isFinite(i)&&(this.ui.setPotatoCount(i),this.ui.notify(`Potato counter: ${i}`))}runSecurityScan(e){if(!this.world.startSecurityScan(this.ticker.elapsed)){this.ui.notify("Scanner already running");return}this.ui.notify("Security scanner warming up"),this.audio.click(880),this.audio.sweep(180,920,.42,.045),window.setTimeout(()=>{this.world.completeSecurityScan(),this.achievements.unlock("security_scan"),this.audio.click(1180),this.audio.sweep(520,1280,.24,.035),this.ui.notify("Security scan complete"),this.ui.openZone(e,{skipScan:!0})},1250)}updateLighting(e){const t=Math.sin(e*.035)*.5+.5;this.lights.sun.intensity=3.05+t*.72,this.lights.rim.intensity=1.18+(1-t)*.5,this.scene.fog.color.lerpColors(this.fogDay,this.fogWarm,t*.38)}updateZoneStinger(e){!this.started||!e||this.ui?.isPanelOpen?.()||e.id!==this.lastAudioZoneId&&(this.lastAudioZoneId=e.id,this.audio?.zoneStinger?.(e))}updateDebugReadout(e){if(!this.debugEnabled||!this.debugReadout||(this.debugFrame=(this.debugFrame+1)%8,this.debugFrame!==0))return;const t=this.vehicle.controller?.driveState||{},n=this.renderer.info;this.debugReadout.textContent=[`fps ${Math.round(1/Math.max(e,.001))}`,`speed ${Math.round(this.vehicle.speed)} km/h`,`wheels ${this.vehicle.controller?.groundedWheels??0}`,`slip ${Number(t.slip||0).toFixed(2)}`,`surface ${this.world.surfaceState?.label||"land"}`,`zone ${this.activeZone?.id||"none"}`,`colliders ${this.physics.getColliderDebugData().length}`,`calls ${n.render.calls}`,`tris ${n.render.triangles}`].join(" | ")}createColliderDebugOverlay(){if(this.debugColliderOverlay)return this.debugColliderOverlay.visible=!0,this.debugColliderOverlay;const e=new Pe;e.name="DEBUG_ColliderOverlay";const t={box:new De({color:16761706,wireframe:!0,transparent:!0,opacity:.42,depthTest:!1}),cylinder:new De({color:10276863,wireframe:!0,transparent:!0,opacity:.42,depthTest:!1}),ball:new De({color:16739725,wireframe:!0,transparent:!0,opacity:.42,depthTest:!1}),trimesh:new De({color:8191922,wireframe:!0,transparent:!0,opacity:.32,depthTest:!1}),sensor:new De({color:11968767,wireframe:!0,transparent:!0,opacity:.38,depthTest:!1})};for(const n of this.physics.getColliderDebugData()){const i=n.sensor?t.sensor:t[n.type]||t.box;let s=null;if(n.type==="box"?s=new ht(n.size[0],n.size[1],n.size[2]):n.type==="cylinder"?s=new Jt(n.radius,n.radius,n.halfHeight*2,16,1):n.type==="ball"?s=new Bn(n.radius,16,10):n.type==="trimesh"&&(s=new ut,s.setAttribute("position",new gt(n.vertices,3)),s.setIndex(new gt(n.indices,1)),s.computeBoundingSphere()),!s)continue;const o=new ne(s,i);o.name=`DEBUG_Collider_${n.name||n.type}`,o.position.set(n.position[0],n.position[1],n.position[2]),n.rotation&&o.rotation.set(n.rotation[0],n.rotation[1],n.rotation[2]),o.renderOrder=999,e.add(o)}return this.debugColliderOverlay=e,this.scene.add(e),e}getZoneLines(e){return e.lines?e.lines:e.dialogueId&&this.resumeData.dialogues?.[e.dialogueId]?this.resumeData.dialogues[e.dialogueId].lines||[]:["Information for this area is being prepared."]}focusZone(e){const t=e.position.clone().add(new C(7.5,7.2,9.5)),n=e.position.clone().add(new C(0,2.4,0));this.cameraRig.setCinematic(t,n)}clearFocus(){this.cameraRig.clearCinematic()}respawn(e="landing"){const t=this.world.getRespawnPose(e);this.vehicle.respawn(t.position,t.heading),this.audio.click(420)}resetWorld(){this.physics.resetDynamicVisuals()}startCircuit(){this.world.startCircuit(this.ticker.elapsed),this.achievements.unlock("circuit_gate"),this.ui.notify("Circuit started")}resize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.rendererSystem.resize()}}function nS(r){const e=Math.floor(r/60),t=r-e*60;return`${e}:${t.toFixed(2).padStart(5,"0")}`}async function iS(){const r=await ad(()=>import("./rapier.es.js"),[],import.meta.url),e=console.warn;console.warn=(...n)=>{String(n[0]).includes("using deprecated parameters for the initialization function")||e(...n)};try{await r.init({})}finally{console.warn=e}await new tS(r).init()}iS().catch(r=>{console.error("Portfolio Drive failed to boot:",r);const e=document.getElementById("loading");e&&(e.innerHTML='<span class="boot-error">World failed to load. Refresh or try again in a moment.</span>')});
