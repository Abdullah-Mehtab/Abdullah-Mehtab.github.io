(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const vl="modulepreload",Ml=function(i,t){return new URL(i,t).href},po={},Sl=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let c=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(e.map(u=>{if(u=Ml(u,n),u in po)return;po[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(n)for(let g=a.length-1;g>=0;g--){const S=a[g];if(S.href===u&&(!d||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":vl,d||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((g,S)=>{p.addEventListener("load",g),p.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};const Oa="183",yl=0,mo=1,El=2,es=1,bl=2,Qi=3,Vn=0,Be=1,Oe=2,En=0,Ri=1,go=2,_o=3,xo=4,wl=5,Qn=100,Tl=101,Al=102,Rl=103,Cl=104,Pl=200,Il=201,Dl=202,Ll=203,Hr=204,Wr=205,Ul=206,Nl=207,Fl=208,Ol=209,Bl=210,zl=211,kl=212,Vl=213,Gl=214,Xr=0,qr=1,Yr=2,Pi=3,jr=4,$r=5,Zr=6,Kr=7,Cc=0,Hl=1,Wl=2,hn=0,Pc=1,Ic=2,Dc=3,Ba=4,Lc=5,Uc=6,Nc=7,Fc=300,ii=301,Ii=302,or=303,cr=304,er=306,Sn=1e3,yn=1001,Jr=1002,Te=1003,Xl=1004,fs=1005,Le=1006,lr=1007,Bn=1008,We=1009,Oc=1010,Bc=1011,os=1012,za=1013,dn=1014,tn=1015,Tn=1016,ka=1017,Va=1018,cs=1020,zc=35902,kc=35899,Vc=1021,Gc=1022,en=1023,An=1026,ei=1027,Ga=1028,Ha=1029,Di=1030,Wa=1031,Xa=1033,Ws=33776,Xs=33777,qs=33778,Ys=33779,Qr=35840,ta=35841,ea=35842,na=35843,ia=36196,sa=37492,ra=37496,aa=37488,oa=37489,ca=37490,la=37491,ha=37808,ua=37809,da=37810,fa=37811,pa=37812,ma=37813,ga=37814,_a=37815,xa=37816,va=37817,Ma=37818,Sa=37819,ya=37820,Ea=37821,ba=36492,wa=36494,Ta=36495,Aa=36283,Ra=36284,Ca=36285,Pa=36286,ql=3200,Hc=0,Yl=1,On="",Me="srgb",Li="srgb-linear",Zs="linear",te="srgb",li=7680,vo=519,jl=512,$l=513,Zl=514,qa=515,Kl=516,Jl=517,Ya=518,Ql=519,Ia=35044,Mo="300 es",ln=2e3,ls=2001;function th(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ks(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function eh(){const i=Ks("canvas");return i.style.display="block",i}const So={};function Js(...i){const t="THREE."+i.shift();console.log(t,...i)}function Wc(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=Wc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function jt(...i){i=Wc(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Qs(...i){const t=i.join(" ");t in So||(So[t]=!0,It(...i))}function nh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ih={[Xr]:qr,[Yr]:Zr,[jr]:Kr,[Pi]:$r,[qr]:Xr,[Zr]:Yr,[Kr]:jr,[$r]:Pi};class Oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yo=1234567;const ns=Math.PI/180,Ui=180/Math.PI;function bn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Ht(i,t,e){return Math.max(t,Math.min(e,i))}function ja(i,t){return(i%t+t)%t}function sh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function rh(i,t,e){return i!==t?(e-i)/(t-i):0}function is(i,t,e){return(1-e)*i+e*t}function ah(i,t,e,n){return is(i,t,1-Math.exp(-e*n))}function oh(i,t=1){return t-Math.abs(ja(i,t*2)-t)}function ch(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function lh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function hh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function uh(i,t){return i+Math.random()*(t-i)}function dh(i){return i*(.5-Math.random())}function fh(i){i!==void 0&&(yo=i);let t=yo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ph(i){return i*ns}function mh(i){return i*Ui}function gh(i){return(i&i-1)===0&&i!==0}function _h(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vh(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),d=r((t-n)/2),h=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*d,l*h,o*c);break;case"YZY":i.set(l*h,o*u,l*d,o*c);break;case"ZXZ":i.set(l*d,l*h,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const js={DEG2RAD:ns,RAD2DEG:Ui,generateUUID:bn,clamp:Ht,euclideanModulo:ja,mapLinear:sh,inverseLerp:rh,lerp:is,damp:ah,pingpong:oh,smoothstep:ch,smootherstep:lh,randInt:hh,randFloat:uh,randFloatSpread:dh,seededRandom:fh,degToRad:ph,radToDeg:mh,isPowerOfTwo:gh,ceilPowerOfTwo:_h,floorPowerOfTwo:xh,setQuaternionFromProperEuler:vh,normalize:ee,denormalize:Qe};class Lt{constructor(t=0,e=0){Lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3],h=r[a+0],p=r[a+1],g=r[a+2],S=r[a+3];if(d!==S||l!==h||c!==p||u!==g){let m=l*h+c*p+u*g+d*S;m<0&&(h=-h,p=-p,g=-g,S=-S,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),E=Math.sin(v);f=Math.sin(f*v)/E,o=Math.sin(o*v)/E,l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+S*o}else{l=l*f+h*o,c=c*f+p*o,u=u*f+g*o,d=d*f+S*o;const v=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=v,c*=v,u*=v,d*=v}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+u*d+l*p-c*h,t[e+1]=l*g+u*h+c*d-o*p,t[e+2]=c*g+u*p+o*h-l*d,t[e+3]=u*g-o*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),h=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Eo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Eo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return hr.copy(this).projectOnVector(t),this.sub(hr)}reflect(t){return this.sub(hr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hr=new I,Eo=new nn;class Ft{constructor(t,e,n,s,r,a,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],S=s[0],m=s[3],f=s[6],v=s[1],E=s[4],y=s[7],A=s[2],T=s[5],C=s[8];return r[0]=a*S+o*v+l*A,r[3]=a*m+o*E+l*T,r[6]=a*f+o*y+l*C,r[1]=c*S+u*v+d*A,r[4]=c*m+u*E+d*T,r[7]=c*f+u*y+d*C,r[2]=h*S+p*v+g*A,r[5]=h*m+p*E+g*T,r[8]=h*f+p*y+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,p=c*r-a*l,g=e*d+n*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return t[0]=d*S,t[1]=(s*c-u*n)*S,t[2]=(o*n-s*a)*S,t[3]=h*S,t[4]=(u*e-s*l)*S,t[5]=(s*r-o*e)*S,t[6]=p*S,t[7]=(n*l-c*e)*S,t[8]=(a*e-n*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ur.makeScale(t,e)),this}rotate(t){return this.premultiply(ur.makeRotation(-t)),this}translate(t,e){return this.premultiply(ur.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ur=new Ft,bo=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wo=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mh(){const i={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===te&&(s.r=wn(s.r),s.g=wn(s.g),s.b=wn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===te&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===On?Zs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Qs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Qs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Li]:{primaries:t,whitePoint:n,transfer:Zs,toXYZ:bo,fromXYZ:wo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Me},outputColorSpaceConfig:{drawingBufferColorSpace:Me}},[Me]:{primaries:t,whitePoint:n,transfer:te,toXYZ:bo,fromXYZ:wo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Me}}}),i}const $t=Mh();function wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ci(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hi;class Sh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{hi===void 0&&(hi=Ks("canvas")),hi.width=t.width,hi.height=t.height;const s=hi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=hi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ks("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wn(e[n]/255)*255):e[n]=wn(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let yh=0;class $a{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=bn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(dr(s[a].image)):r.push(dr(s[a]))}else r=dr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function dr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}let Eh=0;const fr=new I;class Ue extends Oi{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=yn,s=yn,r=Le,a=Bn,o=en,l=We,c=Ue.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=bn(),this.name="",this.source=new $a(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fr).x}get height(){return this.source.getSize(fr).y}get depth(){return this.source.getSize(fr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Fc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sn:t.x=t.x-Math.floor(t.x);break;case yn:t.x=t.x<0?0:1;break;case Jr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sn:t.y=t.y-Math.floor(t.y);break;case yn:t.y=t.y<0?0:1;break;case Jr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=Fc;Ue.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,n=0,s=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],S=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,y=(p+1)/2,A=(f+1)/2,T=(u+h)/4,C=(d+S)/4,x=(g+m)/4;return E>y&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=C/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=x/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=x/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(d-S)*(d-S)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-S)/v,this.z=(h-u)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bh extends Oi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Ue(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new $a(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends bh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Xc extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class wh extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class se{constructor(t,e,n,s,r,a,o,l,c,u,d,h,p,g,S,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,d,h,p,g,S,m)}set(t,e,n,s,r,a,o,l,c,u,d,h,p,g,S,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,s=1/ui.setFromMatrixColumn(t,0).length(),r=1/ui.setFromMatrixColumn(t,1).length(),a=1/ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=a*u,p=a*d,g=o*u,S=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=h-S*c,e[9]=-o*l,e[2]=S-h*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,p=l*d,g=c*u,S=c*d;e[0]=h+S*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=S+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,p=l*d,g=c*u,S=c*d;e[0]=h-S*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=S-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,p=a*d,g=o*u,S=o*d;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+S,e[1]=l*d,e[5]=S*c+h,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,p=a*c,g=o*l,S=o*c;e[0]=l*u,e[4]=S-h*d,e[8]=g*d+p,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*d+g,e[10]=h-S*d}else if(t.order==="XZY"){const h=a*l,p=a*c,g=o*l,S=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+S,e[5]=a*u,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*u,e[10]=S*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Th,t,Ah)}lookAt(t,e,n){const s=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Pn.crossVectors(n,ke),Pn.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Pn.crossVectors(n,ke)),Pn.normalize(),ps.crossVectors(ke,Pn),s[0]=Pn.x,s[4]=ps.x,s[8]=ke.x,s[1]=Pn.y,s[5]=ps.y,s[9]=ke.y,s[2]=Pn.z,s[6]=ps.z,s[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],S=n[6],m=n[10],f=n[14],v=n[3],E=n[7],y=n[11],A=n[15],T=s[0],C=s[4],x=s[8],b=s[12],k=s[1],R=s[5],N=s[9],O=s[13],H=s[2],V=s[6],z=s[10],G=s[14],Q=s[3],Z=s[7],lt=s[11],mt=s[15];return r[0]=a*T+o*k+l*H+c*Q,r[4]=a*C+o*R+l*V+c*Z,r[8]=a*x+o*N+l*z+c*lt,r[12]=a*b+o*O+l*G+c*mt,r[1]=u*T+d*k+h*H+p*Q,r[5]=u*C+d*R+h*V+p*Z,r[9]=u*x+d*N+h*z+p*lt,r[13]=u*b+d*O+h*G+p*mt,r[2]=g*T+S*k+m*H+f*Q,r[6]=g*C+S*R+m*V+f*Z,r[10]=g*x+S*N+m*z+f*lt,r[14]=g*b+S*O+m*G+f*mt,r[3]=v*T+E*k+y*H+A*Q,r[7]=v*C+E*R+y*V+A*Z,r[11]=v*x+E*N+y*z+A*lt,r[15]=v*b+E*O+y*G+A*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],g=t[3],S=t[7],m=t[11],f=t[15],v=l*p-c*h,E=o*p-c*d,y=o*h-l*d,A=a*p-c*u,T=a*h-l*u,C=a*d-o*u;return e*(S*v-m*E+f*y)-n*(g*v-m*A+f*T)+s*(g*E-S*A+f*C)-r*(g*y-S*T+m*C)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],g=t[12],S=t[13],m=t[14],f=t[15],v=e*o-n*a,E=e*l-s*a,y=e*c-r*a,A=n*l-s*o,T=n*c-r*o,C=s*c-r*l,x=u*S-d*g,b=u*m-h*g,k=u*f-p*g,R=d*m-h*S,N=d*f-p*S,O=h*f-p*m,H=v*O-E*N+y*R+A*k-T*b+C*x;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/H;return t[0]=(o*O-l*N+c*R)*V,t[1]=(s*N-n*O-r*R)*V,t[2]=(S*C-m*T+f*A)*V,t[3]=(h*T-d*C-p*A)*V,t[4]=(l*k-a*O-c*b)*V,t[5]=(e*O-s*k+r*b)*V,t[6]=(m*y-g*C-f*E)*V,t[7]=(u*C-h*y+p*E)*V,t[8]=(a*N-o*k+c*x)*V,t[9]=(n*k-e*N-r*x)*V,t[10]=(g*T-S*y+f*v)*V,t[11]=(d*y-u*T-p*v)*V,t[12]=(o*b-a*R-l*x)*V,t[13]=(e*R-n*b+s*x)*V,t[14]=(S*E-g*A-m*v)*V,t[15]=(u*A-d*E+h*v)*V,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,h=r*c,p=r*u,g=r*d,S=a*u,m=a*d,f=o*d,v=l*c,E=l*u,y=l*d,A=n.x,T=n.y,C=n.z;return s[0]=(1-(S+f))*A,s[1]=(p+y)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(h+f))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+E)*C,s[9]=(m-v)*C,s[10]=(1-(h+S))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),e.identity(),this;let a=ui.set(s[0],s[1],s[2]).length();const o=ui.set(s[4],s[5],s[6]).length(),l=ui.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ze.copy(this);const c=1/a,u=1/o,d=1/l;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=u,Ze.elements[5]*=u,Ze.elements[6]*=u,Ze.elements[8]*=d,Ze.elements[9]*=d,Ze.elements[10]*=d,e.setFromRotationMatrix(Ze),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=ln,l=!1){const c=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s);let g,S;if(l)g=r/(a-r),S=a*r/(a-r);else if(o===ln)g=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===ls)g=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=ln,l=!1){const c=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s);let g,S;if(l)g=1/(a-r),S=a/(a-r);else if(o===ln)g=-2/(a-r),S=-(a+r)/(a-r);else if(o===ls)g=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ui=new I,Ze=new se,Th=new I(0,0,0),Ah=new I(1,1,1),Pn=new I,ps=new I,ke=new I,To=new se,Ao=new nn;class qe{constructor(t=0,e=0,n=0,s=qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return To.makeRotationFromQuaternion(t),this.setFromRotationMatrix(To,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ao.setFromEuler(this),this.setFromQuaternion(Ao,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qe.DEFAULT_ORDER="XYZ";class qc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rh=0;const Ro=new I,di=new nn,mn=new se,ms=new I,ki=new I,Ch=new I,Ph=new nn,Co=new I(1,0,0),Po=new I(0,1,0),Io=new I(0,0,1),Do={type:"added"},Ih={type:"removed"},fi={type:"childadded",child:null},pr={type:"childremoved",child:null};class _e extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new I,e=new qe,n=new nn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Ft}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.multiply(di),this}rotateOnWorldAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.premultiply(di),this}rotateX(t){return this.rotateOnAxis(Co,t)}rotateY(t){return this.rotateOnAxis(Po,t)}rotateZ(t){return this.rotateOnAxis(Io,t)}translateOnAxis(t,e){return Ro.copy(t).applyQuaternion(this.quaternion),this.position.add(Ro.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Co,t)}translateY(t){return this.translateOnAxis(Po,t)}translateZ(t){return this.translateOnAxis(Io,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ms.copy(t):ms.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(ki,ms,this.up):mn.lookAt(ms,ki,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),di.setFromRotationMatrix(mn),this.quaternion.premultiply(di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Do),fi.child=t,this.dispatchEvent(fi),fi.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ih),pr.child=t,this.dispatchEvent(pr),pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(mn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Do),fi.child=t,this.dispatchEvent(fi),fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,t,Ch),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ki,Ph,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}_e.DEFAULT_UP=new I(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ge extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dh={type:"move"};class mr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const S of t.hand.values()){const m=e.getJointPose(S,n),f=this._getHandJoint(c,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ge;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},gs={h:0,s:0,l:0};function gr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ct{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=ja(t,1),e=Ht(e,0,1),n=Ht(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=gr(a,r,t+1/3),this.g=gr(a,r,t),this.b=gr(a,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=Me){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Me){const n=Yc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wn(t.r),this.g=wn(t.g),this.b=wn(t.b),this}copyLinearToSRGB(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Me){return $t.workingToColorSpace(Ie.copy(this),t),Math.round(Ht(Ie.r*255,0,255))*65536+Math.round(Ht(Ie.g*255,0,255))*256+Math.round(Ht(Ie.b*255,0,255))}getHexString(t=Me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ie.copy(this),e);const n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Me){$t.workingToColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,s=Ie.b;return t!==Me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(In),this.setHSL(In.h+t,In.s+e,In.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(In),t.getHSL(gs);const n=is(In.h,gs.h,e),s=is(In.s,gs.s,e),r=is(In.l,gs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Ct;Ct.NAMES=Yc;class Za{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ct(t),this.near=e,this.far=n}clone(){return new Za(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lh extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qe,this.environmentIntensity=1,this.environmentRotation=new qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ke=new I,gn=new I,_r=new I,_n=new I,pi=new I,mi=new I,Lo=new I,xr=new I,vr=new I,Mr=new I,Sr=new pe,yr=new pe,Er=new pe;class je{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ke.subVectors(t,e),s.cross(Ke);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Ke.subVectors(s,e),gn.subVectors(n,e),_r.subVectors(t,e);const a=Ke.dot(Ke),o=Ke.dot(gn),l=Ke.dot(_r),c=gn.dot(gn),u=gn.dot(_r),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_n.x),l.addScaledVector(a,_n.y),l.addScaledVector(o,_n.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Sr.setScalar(0),yr.setScalar(0),Er.setScalar(0),Sr.fromBufferAttribute(t,e),yr.fromBufferAttribute(t,n),Er.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Sr,r.x),a.addScaledVector(yr,r.y),a.addScaledVector(Er,r.z),a}static isFrontFacing(t,e,n,s){return Ke.subVectors(n,e),gn.subVectors(t,e),Ke.cross(gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ke.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Ke.cross(gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;pi.subVectors(s,n),mi.subVectors(r,n),xr.subVectors(t,n);const l=pi.dot(xr),c=mi.dot(xr);if(l<=0&&c<=0)return e.copy(n);vr.subVectors(t,s);const u=pi.dot(vr),d=mi.dot(vr);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(pi,a);Mr.subVectors(t,r);const p=pi.dot(Mr),g=mi.dot(Mr);if(g>=0&&p<=g)return e.copy(r);const S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(mi,o);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Lo.subVectors(r,s),o=(d-u)/(d-u+(p-g)),e.copy(s).addScaledVector(Lo,o);const f=1/(m+S+h);return a=S*f,o=h*f,e.copy(n).addScaledVector(pi,a).addScaledVector(mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class si{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(r,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(t.matrixWorld),this.union(_s)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vi),xs.subVectors(this.max,Vi),gi.subVectors(t.a,Vi),_i.subVectors(t.b,Vi),xi.subVectors(t.c,Vi),Dn.subVectors(_i,gi),Ln.subVectors(xi,_i),Wn.subVectors(gi,xi);let e=[0,-Dn.z,Dn.y,0,-Ln.z,Ln.y,0,-Wn.z,Wn.y,Dn.z,0,-Dn.x,Ln.z,0,-Ln.x,Wn.z,0,-Wn.x,-Dn.y,Dn.x,0,-Ln.y,Ln.x,0,-Wn.y,Wn.x,0];return!br(e,gi,_i,xi,xs)||(e=[1,0,0,0,1,0,0,0,1],!br(e,gi,_i,xi,xs))?!1:(vs.crossVectors(Dn,Ln),e=[vs.x,vs.y,vs.z],br(e,gi,_i,xi,xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const xn=[new I,new I,new I,new I,new I,new I,new I,new I],Je=new I,_s=new si,gi=new I,_i=new I,xi=new I,Dn=new I,Ln=new I,Wn=new I,Vi=new I,xs=new I,vs=new I,Xn=new I;function br(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Xn.fromArray(i,r);const o=s.x*Math.abs(Xn.x)+s.y*Math.abs(Xn.y)+s.z*Math.abs(Xn.z),l=t.dot(Xn),c=e.dot(Xn),u=n.dot(Xn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ve=new I,Ms=new Lt;let Uh=0;class Xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Uh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ia,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ms.fromBufferAttribute(this,e),Ms.applyMatrix3(t),this.setXY(e,Ms.x,Ms.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qe(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qe(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qe(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qe(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ia&&(t.usage=this.usage),t}}class jc extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class $c extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Nh=new si,Gi=new I,wr=new I;class Bi{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Nh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);const e=Gi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add(wr)),this.expandByPoint(Gi.copy(t.center).sub(wr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Fh=0;const Ye=new se,Tr=new _e,vi=new I,Ve=new si,Hi=new si,we=new I;class Ae extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(th(t)?$c:jc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Tr.lookAt(t),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ue(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Hi.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(Ve.min,Hi.min),Ve.expandByPoint(we),we.addVectors(Ve.max,Hi.max),Ve.expandByPoint(we)):(Ve.expandByPoint(Hi.min),Ve.expandByPoint(Hi.max))}Ve.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)we.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(t,c),we.add(vi)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new I,l[x]=new I;const c=new I,u=new I,d=new I,h=new Lt,p=new Lt,g=new Lt,S=new I,m=new I;function f(x,b,k){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,k),h.fromBufferAttribute(r,x),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,k),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(S.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[x].add(S),o[b].add(S),o[k].add(S),l[x].add(m),l[b].add(m),l[k].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,b=v.length;x<b;++x){const k=v[x],R=k.start,N=k.count;for(let O=R,H=R+N;O<H;O+=3)f(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const E=new I,y=new I,A=new I,T=new I;function C(x){A.fromBufferAttribute(s,x),T.copy(A);const b=o[x];E.copy(b),E.sub(A.multiplyScalar(A.dot(b))).normalize(),y.crossVectors(T,b);const R=y.dot(l[x])<0?-1:1;a.setXYZW(x,E.x,E.y,E.z,R)}for(let x=0,b=v.length;x<b;++x){const k=v[x],R=k.start,N=k.count;for(let O=R,H=R+N;O<H;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(t)for(let h=0,p=t.count;h<p;h+=3){const g=t.getX(h+0),S=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new Xe(h,u,d)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=t(h,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Oh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ia,this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ne=new I;class tr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Qe(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Qe(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Qe(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Qe(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Qe(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Js("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new tr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Js("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Bh=0;class ri extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=bn(),this.name="",this.type="Material",this.blending=Ri,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Wr,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==Wr&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Da extends ri{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Mi;const Wi=new I,Si=new I,yi=new I,Ei=new Lt,Xi=new Lt,Zc=new se,Ss=new I,qi=new I,ys=new I,Uo=new Lt,Ar=new Lt,No=new Lt;class Fo extends _e{constructor(t=new Da){if(super(),this.isSprite=!0,this.type="Sprite",Mi===void 0){Mi=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Oh(e,5);Mi.setIndex([0,1,2,0,2,3]),Mi.setAttribute("position",new tr(n,3,0,!1)),Mi.setAttribute("uv",new tr(n,2,3,!1))}this.geometry=Mi,this.material=t,this.center=new Lt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&jt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Si.setFromMatrixScale(this.matrixWorld),Zc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),yi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Si.multiplyScalar(-yi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Es(Ss.set(-.5,-.5,0),yi,a,Si,s,r),Es(qi.set(.5,-.5,0),yi,a,Si,s,r),Es(ys.set(.5,.5,0),yi,a,Si,s,r),Uo.set(0,0),Ar.set(1,0),No.set(1,1);let o=t.ray.intersectTriangle(Ss,qi,ys,!1,Wi);if(o===null&&(Es(qi.set(-.5,.5,0),yi,a,Si,s,r),Ar.set(0,1),o=t.ray.intersectTriangle(Ss,ys,qi,!1,Wi),o===null))return;const l=t.ray.origin.distanceTo(Wi);l<t.near||l>t.far||e.push({distance:l,point:Wi.clone(),uv:je.getInterpolation(Wi,Ss,qi,ys,Uo,Ar,No,new Lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Es(i,t,e,n,s,r){Ei.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Xi.x=r*Ei.x-s*Ei.y,Xi.y=s*Ei.x+r*Ei.y):Xi.copy(Ei),i.copy(t),i.x+=Xi.x,i.y+=Xi.y,i.applyMatrix4(Zc)}const vn=new I,Rr=new I,bs=new I,Un=new I,Cr=new I,ws=new I,Pr=new I;class Kc{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Rr.copy(t).add(e).multiplyScalar(.5),bs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(Rr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(bs),o=Un.dot(this.direction),l=-Un.dot(bs),c=Un.lengthSq(),u=Math.abs(1-a*a);let d,h,p,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const S=1/u;d*=S,h*=S,p=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Rr).addScaledVector(bs,h),p}intersectSphere(t,e){vn.subVectors(t.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,s,r){Cr.subVectors(e,t),ws.subVectors(n,t),Pr.crossVectors(Cr,ws);let a=this.direction.dot(Pr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Un.subVectors(this.origin,t);const l=o*this.direction.dot(ws.crossVectors(Un,ws));if(l<0)return null;const c=o*this.direction.dot(Cr.cross(Un));if(c<0||l+c>a)return null;const u=-o*Un.dot(Pr);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qt extends ri{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Oo=new se,qn=new Kc,Ts=new Bi,Bo=new I,As=new I,Rs=new I,Cs=new I,Ir=new I,Ps=new I,zo=new I,Is=new I;class Tt extends _e{constructor(t=new Ae,e=new qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(Ir.fromBufferAttribute(d,t),a?Ps.addScaledVector(Ir,u):Ps.addScaledVector(Ir.sub(e),u))}e.add(Ps)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),qn.copy(t.ray).recast(t.near),!(Ts.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Ts,Bo)===null||qn.origin.distanceToSquared(Bo)>(t.far-t.near)**2))&&(Oo.copy(r).invert(),qn.copy(t.ray).applyMatrix4(Oo),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,S=h.length;g<S;g++){const m=h[g],f=a[m.materialIndex],v=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=E;y<A;y+=3){const T=o.getX(y),C=o.getX(y+1),x=o.getX(y+2);s=Ds(this,f,t,n,c,u,d,T,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const v=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);s=Ds(this,a,t,n,c,u,d,v,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,S=h.length;g<S;g++){const m=h[g],f=a[m.materialIndex],v=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=E;y<A;y+=3){const T=y,C=y+1,x=y+2;s=Ds(this,f,t,n,c,u,d,T,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const v=m,E=m+1,y=m+2;s=Ds(this,a,t,n,c,u,d,v,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function zh(i,t,e,n,s,r,a,o){let l;if(t.side===Be?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Vn,o),l===null)return null;Is.copy(o),Is.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Is);return c<e.near||c>e.far?null:{distance:c,point:Is.clone(),object:i}}function Ds(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,As),i.getVertexPosition(l,Rs),i.getVertexPosition(c,Cs);const u=zh(i,t,e,n,As,Rs,Cs,zo);if(u){const d=new I;je.getBarycoord(zo,As,Rs,Cs,d),s&&(u.uv=je.getInterpolatedAttribute(s,o,l,c,d,new Lt)),r&&(u.uv1=je.getInterpolatedAttribute(r,o,l,c,d,new Lt)),a&&(u.normal=je.getInterpolatedAttribute(a,o,l,c,d,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};je.getNormal(As,Rs,Cs,h.normal),u.face=h,u.barycoord=d}return u}class Jc extends Ue{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Te,u=Te,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ko extends Xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const bi=new se,Vo=new se,Ls=[],Go=new si,kh=new se,Yi=new Tt,ji=new Bi;class Vh extends Tt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ko(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,kh)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),Go.copy(t.boundingBox).applyMatrix4(bi),this.boundingBox.union(Go)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),ji.copy(t.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(ji)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=t.previousInstanceMatrix.clone()),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Yi.geometry=this.geometry,Yi.material=this.material,Yi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ji.copy(this.boundingSphere),ji.applyMatrix4(n),t.ray.intersectsSphere(ji)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,bi),Vo.multiplyMatrices(n,bi),Yi.matrixWorld=Vo,Yi.raycast(t,Ls);for(let a=0,o=Ls.length;a<o;a++){const l=Ls[a];l.instanceId=r,l.object=this,e.push(l)}Ls.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ko(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Jc(new Float32Array(s*this.count),s,this.count,Ga,tn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Dr=new I,Gh=new I,Hh=new Ft;class Jn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Dr.subVectors(n,e).cross(Gh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Dr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Hh.getNormalMatrix(t),s=this.coplanarPoint(Dr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new Bi,Wh=new Lt(.5,.5),Us=new I;class Ka{constructor(t=new Jn,e=new Jn,n=new Jn,s=new Jn,r=new Jn,a=new Jn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],p=r[7],g=r[8],S=r[9],m=r[10],f=r[11],v=r[12],E=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,p-u,f-g,A-v).normalize(),s[1].setComponents(c+a,p+u,f+g,A+v).normalize(),s[2].setComponents(c+o,p+d,f+S,A+E).normalize(),s[3].setComponents(c-o,p-d,f-S,A-E).normalize(),n)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,p-h,f-m,A-y).normalize();else if(s[4].setComponents(c-l,p-h,f-m,A-y).normalize(),e===ln)s[5].setComponents(c+l,p+h,f+m,A+y).normalize();else if(e===ls)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(t){Yn.center.set(0,0,0);const e=Wh.distanceTo(t.center);return Yn.radius=.7071067811865476+e,Yn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Us.x=s.normal.x>0?t.max.x:t.min.x,Us.y=s.normal.y>0?t.max.y:t.min.y,Us.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qc extends ri{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ho=new se,La=new Kc,Ns=new Bi,Fs=new I;class Xh extends _e{constructor(t=new Ae,e=new Qc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(s),Ns.radius+=r,t.ray.intersectsSphere(Ns)===!1)return;Ho.copy(s).invert(),La.copy(t.ray).applyMatrix4(Ho);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=h,S=p;g<S;g++){const m=c.getX(g);Fs.fromBufferAttribute(d,m),Wo(Fs,m,l,s,t,e,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=h,S=p;g<S;g++)Fs.fromBufferAttribute(d,g),Wo(Fs,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Wo(i,t,e,n,s,r,a){const o=La.distanceSqToPoint(i);if(o<e){const l=new I;La.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class tl extends Ue{constructor(t=[],e=ii,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zn extends Ue{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hs extends Ue{constructor(t,e,n=dn,s,r,a,o=Te,l=Te,c,u=An,d=1){if(u!==An&&u!==ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:d};super(h,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new $a(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class qh extends hs{constructor(t,e=dn,n=ii,s,r,a=Te,o=Te,l,c=An){const u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class el extends Ue{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class pt extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(d,2));function g(S,m,f,v,E,y,A,T,C,x,b){const k=y/C,R=A/x,N=y/2,O=A/2,H=T/2,V=C+1,z=x+1;let G=0,Q=0;const Z=new I;for(let lt=0;lt<z;lt++){const mt=lt*R-O;for(let ut=0;ut<V;ut++){const Ot=ut*k-N;Z[S]=Ot*v,Z[m]=mt*E,Z[f]=H,c.push(Z.x,Z.y,Z.z),Z[S]=0,Z[m]=0,Z[f]=T>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(ut/C),d.push(1-lt/x),G+=1}}for(let lt=0;lt<x;lt++)for(let mt=0;mt<C;mt++){const ut=h+mt+V*lt,Ot=h+mt+V*(lt+1),de=h+(mt+1)+V*(lt+1),le=h+(mt+1)+V*lt;l.push(ut,Ot,le),l.push(Ot,de,le),Q+=6}o.addGroup(p,Q,b),p+=Q,h+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Ni extends Ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new I,u=new Lt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const p=n+d/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wt extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],p=[];let g=0;const S=[],m=n/2;let f=0;v(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new ue(d,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(p,2));function v(){const y=new I,A=new I;let T=0;const C=(e-t)/n;for(let x=0;x<=r;x++){const b=[],k=x/r,R=k*(e-t)+t;for(let N=0;N<=s;N++){const O=N/s,H=O*l+o,V=Math.sin(H),z=Math.cos(H);A.x=R*V,A.y=-k*n+m,A.z=R*z,d.push(A.x,A.y,A.z),y.set(V,C,z).normalize(),h.push(y.x,y.y,y.z),p.push(O,1-k),b.push(g++)}S.push(b)}for(let x=0;x<s;x++)for(let b=0;b<r;b++){const k=S[b][x],R=S[b+1][x],N=S[b+1][x+1],O=S[b][x+1];(t>0||b!==0)&&(u.push(k,R,O),T+=3),(e>0||b!==r-1)&&(u.push(R,N,O),T+=3)}c.addGroup(f,T,0),f+=T}function E(y){const A=g,T=new Lt,C=new I;let x=0;const b=y===!0?t:e,k=y===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*k,0),h.push(0,k,0),p.push(.5,.5),g++;const R=g;for(let N=0;N<=s;N++){const H=N/s*l+o,V=Math.cos(H),z=Math.sin(H);C.x=b*z,C.y=m*k,C.z=b*V,d.push(C.x,C.y,C.z),h.push(0,k,0),T.x=V*.5+.5,T.y=z*.5*k+.5,p.push(T.x,T.y),g++}for(let N=0;N<s;N++){const O=A+N,H=R+N;y===!0?u.push(H,H+1,O):u.push(H+1,H,O),x+=3}c.addGroup(f,x,y===!0?1:2),f+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fn extends Wt{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Fn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nr extends Ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(r.slice(),3)),this.setAttribute("uv",new ue(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const E=new I,y=new I,A=new I;for(let T=0;T<e.length;T+=3)p(e[T+0],E),p(e[T+1],y),p(e[T+2],A),l(E,y,A,v)}function l(v,E,y,A){const T=A+1,C=[];for(let x=0;x<=T;x++){C[x]=[];const b=v.clone().lerp(y,x/T),k=E.clone().lerp(y,x/T),R=T-x;for(let N=0;N<=R;N++)N===0&&x===T?C[x][N]=b:C[x][N]=b.clone().lerp(k,N/R)}for(let x=0;x<T;x++)for(let b=0;b<2*(T-x)-1;b++){const k=Math.floor(b/2);b%2===0?(h(C[x][k+1]),h(C[x+1][k]),h(C[x][k])):(h(C[x][k+1]),h(C[x+1][k+1]),h(C[x+1][k]))}}function c(v){const E=new I;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(v),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function u(){const v=new I;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];const y=m(v)/2/Math.PI+.5,A=f(v)/Math.PI+.5;a.push(y,1-A)}g(),d()}function d(){for(let v=0;v<a.length;v+=6){const E=a[v+0],y=a[v+2],A=a[v+4],T=Math.max(E,y,A),C=Math.min(E,y,A);T>.9&&C<.1&&(E<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),A<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function p(v,E){const y=v*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function g(){const v=new I,E=new I,y=new I,A=new I,T=new Lt,C=new Lt,x=new Lt;for(let b=0,k=0;b<r.length;b+=9,k+=6){v.set(r[b+0],r[b+1],r[b+2]),E.set(r[b+3],r[b+4],r[b+5]),y.set(r[b+6],r[b+7],r[b+8]),T.set(a[k+0],a[k+1]),C.set(a[k+2],a[k+3]),x.set(a[k+4],a[k+5]),A.copy(v).add(E).add(y).divideScalar(3);const R=m(A);S(T,k+0,v,R),S(C,k+2,E,R),S(x,k+4,y,R)}}function S(v,E,y,A){A<0&&v.x===1&&(a[E]=v.x-1),y.x===0&&y.z===0&&(a[E]=A/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.vertices,t.indices,t.radius,t.detail)}}class Ja extends nr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ja(t.radius,t.detail)}}class ss extends nr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ss(t.radius,t.detail)}}class De extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=e/l,p=[],g=[],S=[],m=[];for(let f=0;f<u;f++){const v=f*h-a;for(let E=0;E<c;E++){const y=E*d-r;g.push(y,-v,0),S.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){const E=v+c*f,y=v+c*(f+1),A=v+1+c*(f+1),T=v+1+c*f;p.push(E,y,T),p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(S,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new De(t.width,t.height,t.widthSegments,t.heightSegments)}}class ni extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new I,h=new I,p=[],g=[],S=[],m=[];for(let f=0;f<=n;f++){const v=[],E=f/n;let y=0;f===0&&a===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const T=A/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+E*o),d.y=t*Math.cos(a+E*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),S.push(h.x,h.y,h.z),m.push(T+y,1-E),v.push(c++)}u.push(v)}for(let f=0;f<n;f++)for(let v=0;v<e;v++){const E=u[f][v+1],y=u[f][v],A=u[f+1][v],T=u[f+1][v+1];(f!==0||a>0)&&p.push(E,y,T),(f!==n-1||l<Math.PI)&&p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(S,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ni(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class he extends Ae{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],d=[],h=new I,p=new I,g=new I;for(let S=0;S<=n;S++){const m=a+S/n*o;for(let f=0;f<=s;f++){const v=f/s*r;p.x=(t+e*Math.cos(m))*Math.cos(v),p.y=(t+e*Math.cos(m))*Math.sin(v),p.z=e*Math.sin(m),c.push(p.x,p.y,p.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),g.subVectors(p,h).normalize(),u.push(g.x,g.y,g.z),d.push(f/s),d.push(S/n)}}for(let S=1;S<=n;S++)for(let m=1;m<=s;m++){const f=(s+1)*S+m-1,v=(s+1)*(S-1)+m-1,E=(s+1)*(S-1)+m,y=(s+1)*S+m;l.push(f,v,y),l.push(v,E,y)}this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function Fi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Fi(i[e]);for(const s in n)t[s]=n[s]}return t}function Yh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const jh={clone:Fi,merge:Fe};var $h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sn extends ri{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$h,this.fragmentShader=Zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fi(t.uniforms),this.uniformsGroups=Yh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Kh extends sn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gt extends ri{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class rs extends Gt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Lt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ct(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ct(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ct(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Jh extends ri{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ql,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qh extends ri{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qa extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class tu extends Qa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Lr=new se,Xo=new I,qo=new I;class il{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.mapType=We,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Xo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xo),qo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qo),e.updateMatrixWorld(),Lr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lr,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===ls||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Os=new I,Bs=new nn,an=new I;class sl extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Os,Bs,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Os,Bs,an.set(1,1,1)).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorld.decompose(Os,Bs,an),an.x===1&&an.y===1&&an.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Os,Bs,an.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new I,Yo=new Lt,jo=new Lt;class He extends sl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ui*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ns*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z)}getViewSize(t,e){return this.getViewBounds(t,Yo,jo),e.subVectors(jo,Yo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ns*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class eu extends il{constructor(){super(new He(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Ui*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class nu extends Qa{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new eu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class to extends sl{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class iu extends il{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $o extends Qa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new iu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const wi=-90,Ti=1;class su extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new He(wi,Ti,t,e);s.layers=this.layers,this.add(s);const r=new He(wi,Ti,t,e);r.layers=this.layers,this.add(r);const a=new He(wi,Ti,t,e);a.layers=this.layers,this.add(a);const o=new He(wi,Ti,t,e);o.layers=this.layers,this.add(o);const l=new He(wi,Ti,t,e);l.layers=this.layers,this.add(l);const c=new He(wi,Ti,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=S,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ru extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Zo(i,t,e,n){const s=au(n);switch(e){case Vc:return i*t;case Ga:return i*t/s.components*s.byteLength;case Ha:return i*t/s.components*s.byteLength;case Di:return i*t*2/s.components*s.byteLength;case Wa:return i*t*2/s.components*s.byteLength;case Gc:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case Xa:return i*t*4/s.components*s.byteLength;case Ws:case Xs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:case na:return Math.max(i,16)*Math.max(t,8)/4;case Qr:case ea:return Math.max(i,8)*Math.max(t,8)/2;case ia:case sa:case aa:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ra:case ca:case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ga:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case va:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ea:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ba:case wa:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Aa:case Ra:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ca:case Pa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function au(i){switch(i){case We:case Oc:return{byteLength:1,components:1};case os:case Bc:case Tn:return{byteLength:2,components:1};case ka:case Va:return{byteLength:2,components:4};case dn:case za:case tn:return{byteLength:4,components:1};case zc:case kc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);function rl(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ou(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],S=d[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++h,d[h]=S)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const S=d[p];i.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lu=`#ifdef USE_ALPHAHASH
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
#endif`,hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,du=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pu=`#ifdef USE_AOMAP
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
#endif`,mu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gu=`#ifdef USE_BATCHING
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
#endif`,_u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Su=`#ifdef USE_IRIDESCENCE
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
#endif`,yu=`#ifdef USE_BUMPMAP
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
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Au=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ru=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Iu=`#define PI 3.141592653589793
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
} // validated`,Du=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lu=`vec3 transformedNormal = objectNormal;
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
#endif`,Uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ou=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bu="gl_FragColor = linearToOutputTexel( gl_FragColor );",zu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ku=`#ifdef USE_ENVMAP
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
#endif`,Vu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
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
#endif`,Hu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wu=`#ifdef USE_ENVMAP
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
#endif`,Xu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ju=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$u=`#ifdef USE_GRADIENTMAP
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
}`,Zu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ku=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ju=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qu=`uniform bool receiveShadow;
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
#endif`,td=`#ifdef USE_ENVMAP
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
#endif`,ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rd=`PhysicalMaterial material;
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
#endif`,ad=`uniform sampler2D dfgLUT;
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
}`,od=`
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
#endif`,cd=`#if defined( RE_IndirectDiffuse )
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
#endif`,ld=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ud=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_d=`#if defined( USE_POINTS_UV )
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
#endif`,xd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ed=`#ifdef USE_MORPHTARGETS
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
#endif`,bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Td=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ad=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pd=`#ifdef USE_NORMALMAP
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
#endif`,Id=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ld=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qd=`float getShadowMask() {
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
}`,Yd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jd=`#ifdef USE_SKINNING
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
#endif`,$d=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zd=`#ifdef USE_SKINNING
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
#endif`,Kd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ef=`#ifdef USE_TRANSMISSION
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
#endif`,nf=`#ifdef USE_TRANSMISSION
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
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lf=`uniform sampler2D t2D;
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
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`#include <common>
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
}`,mf=`#if DEPTH_PACKING == 3200
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
}`,gf=`#define DISTANCE
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
}`,_f=`#define DISTANCE
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
}`,xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mf=`uniform float scale;
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
}`,Sf=`uniform vec3 diffuse;
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
}`,yf=`#include <common>
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
}`,Ef=`uniform vec3 diffuse;
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
}`,bf=`#define LAMBERT
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
}`,wf=`#define LAMBERT
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
}`,Tf=`#define MATCAP
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
}`,Af=`#define MATCAP
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
}`,Rf=`#define NORMAL
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
}`,Cf=`#define NORMAL
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
}`,Pf=`#define PHONG
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
}`,If=`#define PHONG
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
}`,Df=`#define STANDARD
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
}`,Lf=`#define STANDARD
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
}`,Uf=`#define TOON
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
}`,Nf=`#define TOON
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
}`,Ff=`uniform float size;
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
}`,Of=`uniform vec3 diffuse;
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
}`,Bf=`#include <common>
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
}`,zf=`uniform vec3 color;
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
}`,kf=`uniform float rotation;
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
}`,Vf=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:cu,alphahash_pars_fragment:lu,alphamap_fragment:hu,alphamap_pars_fragment:uu,alphatest_fragment:du,alphatest_pars_fragment:fu,aomap_fragment:pu,aomap_pars_fragment:mu,batching_pars_vertex:gu,batching_vertex:_u,begin_vertex:xu,beginnormal_vertex:vu,bsdfs:Mu,iridescence_fragment:Su,bumpmap_pars_fragment:yu,clipping_planes_fragment:Eu,clipping_planes_pars_fragment:bu,clipping_planes_pars_vertex:wu,clipping_planes_vertex:Tu,color_fragment:Au,color_pars_fragment:Ru,color_pars_vertex:Cu,color_vertex:Pu,common:Iu,cube_uv_reflection_fragment:Du,defaultnormal_vertex:Lu,displacementmap_pars_vertex:Uu,displacementmap_vertex:Nu,emissivemap_fragment:Fu,emissivemap_pars_fragment:Ou,colorspace_fragment:Bu,colorspace_pars_fragment:zu,envmap_fragment:ku,envmap_common_pars_fragment:Vu,envmap_pars_fragment:Gu,envmap_pars_vertex:Hu,envmap_physical_pars_fragment:td,envmap_vertex:Wu,fog_vertex:Xu,fog_pars_vertex:qu,fog_fragment:Yu,fog_pars_fragment:ju,gradientmap_pars_fragment:$u,lightmap_pars_fragment:Zu,lights_lambert_fragment:Ku,lights_lambert_pars_fragment:Ju,lights_pars_begin:Qu,lights_toon_fragment:ed,lights_toon_pars_fragment:nd,lights_phong_fragment:id,lights_phong_pars_fragment:sd,lights_physical_fragment:rd,lights_physical_pars_fragment:ad,lights_fragment_begin:od,lights_fragment_maps:cd,lights_fragment_end:ld,logdepthbuf_fragment:hd,logdepthbuf_pars_fragment:ud,logdepthbuf_pars_vertex:dd,logdepthbuf_vertex:fd,map_fragment:pd,map_pars_fragment:md,map_particle_fragment:gd,map_particle_pars_fragment:_d,metalnessmap_fragment:xd,metalnessmap_pars_fragment:vd,morphinstance_vertex:Md,morphcolor_vertex:Sd,morphnormal_vertex:yd,morphtarget_pars_vertex:Ed,morphtarget_vertex:bd,normal_fragment_begin:wd,normal_fragment_maps:Td,normal_pars_fragment:Ad,normal_pars_vertex:Rd,normal_vertex:Cd,normalmap_pars_fragment:Pd,clearcoat_normal_fragment_begin:Id,clearcoat_normal_fragment_maps:Dd,clearcoat_pars_fragment:Ld,iridescence_pars_fragment:Ud,opaque_fragment:Nd,packing:Fd,premultiplied_alpha_fragment:Od,project_vertex:Bd,dithering_fragment:zd,dithering_pars_fragment:kd,roughnessmap_fragment:Vd,roughnessmap_pars_fragment:Gd,shadowmap_pars_fragment:Hd,shadowmap_pars_vertex:Wd,shadowmap_vertex:Xd,shadowmask_pars_fragment:qd,skinbase_vertex:Yd,skinning_pars_vertex:jd,skinning_vertex:$d,skinnormal_vertex:Zd,specularmap_fragment:Kd,specularmap_pars_fragment:Jd,tonemapping_fragment:Qd,tonemapping_pars_fragment:tf,transmission_fragment:ef,transmission_pars_fragment:nf,uv_pars_fragment:sf,uv_pars_vertex:rf,uv_vertex:af,worldpos_vertex:of,background_vert:cf,background_frag:lf,backgroundCube_vert:hf,backgroundCube_frag:uf,cube_vert:df,cube_frag:ff,depth_vert:pf,depth_frag:mf,distance_vert:gf,distance_frag:_f,equirect_vert:xf,equirect_frag:vf,linedashed_vert:Mf,linedashed_frag:Sf,meshbasic_vert:yf,meshbasic_frag:Ef,meshlambert_vert:bf,meshlambert_frag:wf,meshmatcap_vert:Tf,meshmatcap_frag:Af,meshnormal_vert:Rf,meshnormal_frag:Cf,meshphong_vert:Pf,meshphong_frag:If,meshphysical_vert:Df,meshphysical_frag:Lf,meshtoon_vert:Uf,meshtoon_frag:Nf,points_vert:Ff,points_frag:Of,shadow_vert:Bf,shadow_frag:zf,sprite_vert:kf,sprite_frag:Vf},at={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},cn={basic:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Fe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Fe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Fe([at.points,at.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Fe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Fe([at.common,at.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Fe([at.sprite,at.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:Fe([at.common,at.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:Fe([at.lights,at.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};cn.physical={uniforms:Fe([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const zs={r:0,b:0,g:0},jn=new qe,Gf=new se;function Hf(i,t,e,n,s,r){const a=new Ct(0);let o=s===!0?0:1,l,c,u=null,d=0,h=null;function p(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const y=v.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(v){let E=!1;const y=p(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(v,E){const y=p(E);y&&(y.isCubeTexture||y.mapping===er)?(c===void 0&&(c=new Tt(new pt(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:Fi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),jn.copy(E.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Gf.makeRotationFromEuler(jn)),c.material.toneMapped=$t.getTransfer(y.colorSpace)!==te,(u!==y||d!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Tt(new De(2,2),new sn({name:"BackgroundMaterial",uniforms:Fi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$t.getTransfer(y.colorSpace)!==te,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,E){v.getRGB(zs,nl(i)),e.buffers.color.setClear(zs.r,zs.g,zs.b,E,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:S,dispose:f}}function Wf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(R,N,O,H,V){let z=!1;const G=d(R,H,O,N);r!==G&&(r=G,c(r.object)),z=p(R,H,O,V),z&&g(R,H,O,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,y(R,N,O,H),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,N,O,H){const V=H.wireframe===!0;let z=n[N.id];z===void 0&&(z={},n[N.id]=z);const G=R.isInstancedMesh===!0?R.id:0;let Q=z[G];Q===void 0&&(Q={},z[G]=Q);let Z=Q[O.id];Z===void 0&&(Z={},Q[O.id]=Z);let lt=Z[V];return lt===void 0&&(lt=h(l()),Z[V]=lt),lt}function h(R){const N=[],O=[],H=[];for(let V=0;V<e;V++)N[V]=0,O[V]=0,H[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:H,object:R,attributes:{},index:null}}function p(R,N,O,H){const V=r.attributes,z=N.attributes;let G=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const mt=V[Z];let ut=z[Z];if(ut===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(ut=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(ut=R.instanceColor)),mt===void 0||mt.attribute!==ut||ut&&mt.data!==ut.data)return!0;G++}return r.attributesNum!==G||r.index!==H}function g(R,N,O,H){const V={},z=N.attributes;let G=0;const Q=O.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let mt=z[Z];mt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(mt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(mt=R.instanceColor));const ut={};ut.attribute=mt,mt&&mt.data&&(ut.data=mt.data),V[Z]=ut,G++}r.attributes=V,r.attributesNum=G,r.index=H}function S(){const R=r.newAttributes;for(let N=0,O=R.length;N<O;N++)R[N]=0}function m(R){f(R,0)}function f(R,N){const O=r.newAttributes,H=r.enabledAttributes,V=r.attributeDivisors;O[R]=1,H[R]===0&&(i.enableVertexAttribArray(R),H[R]=1),V[R]!==N&&(i.vertexAttribDivisor(R,N),V[R]=N)}function v(){const R=r.newAttributes,N=r.enabledAttributes;for(let O=0,H=N.length;O<H;O++)N[O]!==R[O]&&(i.disableVertexAttribArray(O),N[O]=0)}function E(R,N,O,H,V,z,G){G===!0?i.vertexAttribIPointer(R,N,O,V,z):i.vertexAttribPointer(R,N,O,H,V,z)}function y(R,N,O,H){S();const V=H.attributes,z=O.getAttributes(),G=N.defaultAttributeValues;for(const Q in z){const Z=z[Q];if(Z.location>=0){let lt=V[Q];if(lt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),lt!==void 0){const mt=lt.normalized,ut=lt.itemSize,Ot=t.get(lt);if(Ot===void 0)continue;const de=Ot.buffer,le=Ot.type,j=Ot.bytesPerElement,nt=le===i.INT||le===i.UNSIGNED_INT||lt.gpuType===za;if(lt.isInterleavedBufferAttribute){const rt=lt.data,Nt=rt.stride,At=lt.offset;if(rt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<Z.locationSize;Pt++)f(Z.location+Pt,rt.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Pt=0;Pt<Z.locationSize;Pt++)m(Z.location+Pt);i.bindBuffer(i.ARRAY_BUFFER,de);for(let Pt=0;Pt<Z.locationSize;Pt++)E(Z.location+Pt,ut/Z.locationSize,le,mt,Nt*j,(At+ut/Z.locationSize*Pt)*j,nt)}else{if(lt.isInstancedBufferAttribute){for(let rt=0;rt<Z.locationSize;rt++)f(Z.location+rt,lt.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let rt=0;rt<Z.locationSize;rt++)m(Z.location+rt);i.bindBuffer(i.ARRAY_BUFFER,de);for(let rt=0;rt<Z.locationSize;rt++)E(Z.location+rt,ut/Z.locationSize,le,mt,ut*j,ut/Z.locationSize*rt*j,nt)}}else if(G!==void 0){const mt=G[Q];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(Z.location,mt);break;case 3:i.vertexAttrib3fv(Z.location,mt);break;case 4:i.vertexAttrib4fv(Z.location,mt);break;default:i.vertexAttrib1fv(Z.location,mt)}}}}v()}function A(){b();for(const R in n){const N=n[R];for(const O in N){const H=N[O];for(const V in H){const z=H[V];for(const G in z)u(z[G].object),delete z[G];delete H[V]}}delete n[R]}}function T(R){if(n[R.id]===void 0)return;const N=n[R.id];for(const O in N){const H=N[O];for(const V in H){const z=H[V];for(const G in z)u(z[G].object),delete z[G];delete H[V]}}delete n[R.id]}function C(R){for(const N in n){const O=n[N];for(const H in O){const V=O[H];if(V[R.id]===void 0)continue;const z=V[R.id];for(const G in z)u(z[G].object),delete z[G];delete V[R.id]}}}function x(R){for(const N in n){const O=n[N],H=R.isInstancedMesh===!0?R.id:0,V=O[H];if(V!==void 0){for(const z in V){const G=V[z];for(const Q in G)u(G[Q].object),delete G[Q];delete V[z]}delete O[H],Object.keys(O).length===0&&delete n[N]}}}function b(){k(),a=!0,r!==s&&(r=s,c(r.object))}function k(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:k,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:v}}function Xf(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];e.update(p,n,1)}function l(c,u,d,h){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let g=0;for(let S=0;S<d;S++)g+=u[S]*h[S];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==en&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===Tn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==We&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==tn&&!x)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(It("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:A,samples:T}}function Yf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Jn,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||s;return s=h,n=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const v=r?0:n,E=v*4;let y=f.clippingState||null;l.value=y,y=u(g,h,E,p);for(let A=0;A!==E;++A)y[A]=e[A];f.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,p,g){const S=d!==null?d.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const f=p+S*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,y=p;E!==S;++E,y+=4)a.copy(d[E]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}const kn=4,Ko=[.125,.215,.35,.446,.526,.582],ti=20,jf=256,$i=new to,Jo=new Ct;let Ur=null,Nr=0,Fr=0,Or=!1;const $f=new I;class Qo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=$f}=r;Ur=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ur,Nr,Fr),this._renderer.xr.enabled=Or,t.scissorTest=!1,Ai(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ii||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ur=this._renderer.getRenderTarget(),Nr=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),Or=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:Tn,format:en,colorSpace:Li,depthBuffer:!1},s=tc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Zf(r)),this._blurMaterial=Jf(r,t,e),this._ggxMaterial=Kf(r,t,e)}return s}_compileMaterial(t){const e=new Tt(new Ae,t);this._renderer.compile(e,$i)}_sceneToCubeUV(t,e,n,s,r){const l=new He(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Jo),d.toneMapping=hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Tt(new pt,new qt({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let f=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,f=!0):(m.color.copy(Jo),f=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));const A=this._cubeSize;Ai(s,y*A,E>2?A:0,A,A),d.setRenderTarget(s),f&&d.render(S,l),d.render(t,l)}d.toneMapping=p,d.autoClear=h,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ii||t.mapping===Ii;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ec());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ai(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,$i)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,p=d*h,{_lodMax:g}=this,S=this._sizeLods[n],m=3*S*(n>g-kn?n-g+kn:0),f=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,Ai(r,m,f,3*S,2*S),s.setRenderTarget(r),s.render(o,$i),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ai(t,m,f,3*S,2*S),s.setRenderTarget(t),s.render(o,$i)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&jt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=c;const h=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ti-1),S=r/g,m=isFinite(r)?1+Math.floor(u*S):ti;m>ti&&It(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ti}`);const f=[];let v=0;for(let C=0;C<ti;++C){const x=C/S,b=Math.exp(-x*x/2);f.push(b),C===0?v+=b:C<m&&(v+=2*b)}for(let C=0;C<f.length;C++)f[C]=f[C]/v;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const y=this._sizeLods[s],A=3*y*(s>E-kn?s-E+kn:0),T=4*(this._cubeSize-y);Ai(e,A,T,3*y,2*y),l.setRenderTarget(e),l.render(d,$i)}}function Zf(i){const t=[],e=[],n=[];let s=i;const r=i-kn+1+Ko.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-kn?l=Ko[a-i+kn-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,S=3,m=2,f=1,v=new Float32Array(S*g*p),E=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let T=0;T<p;T++){const C=T%3*2/3-1,x=T>2?0:-1,b=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];v.set(b,S*g*T),E.set(h,m*g*T);const k=[T,T,T,T,T,T];y.set(k,f*g*T)}const A=new Ae;A.setAttribute("position",new Xe(v,S)),A.setAttribute("uv",new Xe(E,m)),A.setAttribute("faceIndex",new Xe(y,f)),n.push(new Tt(A,null)),s>kn&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function tc(i,t,e){const n=new un(i,t,e);return n.texture.mapping=er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ai(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Kf(i,t,e){return new sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:jf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ir(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function Jf(i,t,e){const n=new Float32Array(ti),s=new I(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ir(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function ec(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ir(),fragmentShader:`

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
		`,blending:En,depthTest:!1,depthWrite:!1})}function nc(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ir(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function ir(){return`

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
	`}class al extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new tl(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pt(5,5,5),r=new sn({name:"CubemapFromEquirect",uniforms:Fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:En});r.uniforms.tEquirect.value=e;const a=new Tt(s,r),o=e.minFilter;return e.minFilter===Bn&&(e.minFilter=Le),new su(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function Qf(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===or||p===cr)if(t.has(h)){const g=t.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const S=new al(g.height);return S.fromEquirectangularTexture(i,h),t.set(h,S),h.addEventListener("dispose",c),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===or||p===cr,S=p===ii||p===Ii;if(g||S){let m=e.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Qo(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{const v=h.image;return g&&v&&v.height>0||S&&v&&l(v)?(n===null&&(n=new Qo(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,p){return p===or?h.mapping=ii:p===cr&&(h.mapping=Ii),h}function l(h){let p=0;const g=6;for(let S=0;S<g;S++)h[S]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function tp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Qs("WebGLRenderer: "+n+" extension not supported."),s}}}function ep(i,t,e,n){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)t.update(h[p],i.ARRAY_BUFFER)}function c(d){const h=[],p=d.index,g=d.attributes.position;let S=0;if(g===void 0)return;if(p!==null){const v=p.array;S=p.version;for(let E=0,y=v.length;E<y;E+=3){const A=v[E+0],T=v[E+1],C=v[E+2];h.push(A,T,T,C,C,A)}}else{const v=g.array;S=g.version;for(let E=0,y=v.length/3-1;E<y;E+=3){const A=E+0,T=E+1,C=E+2;h.push(A,T,T,C,C,A)}}const m=new(g.count>=65535?$c:jc)(h,1);m.version=S;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function u(d){const h=r.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function np(i,t,e){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,p){i.drawElements(n,p,r,h*a),e.update(p,n,1)}function c(h,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,h*a,g),e.update(p,n,g))}function u(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(h,p,g,S){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/a,p[f],S[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,h,0,S,0,g);let f=0;for(let v=0;v<g;v++)f+=p[v]*S[v];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function ip(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function sp(i,t,e){const n=new WeakMap,s=new pe;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),g===!0&&(E=2),S===!0&&(E=3);let y=o.attributes.position.count*E,A=1;y>t.maxTextureSize&&(A=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const T=new Float32Array(y*A*4*d),C=new Xc(T,y,A,d);C.type=tn,C.needsUpdate=!0;const x=E*4;for(let k=0;k<d;k++){const R=m[k],N=f[k],O=v[k],H=y*A*4*k;for(let V=0;V<R.count;V++){const z=V*x;p===!0&&(s.fromBufferAttribute(R,V),T[H+z+0]=s.x,T[H+z+1]=s.y,T[H+z+2]=s.z,T[H+z+3]=0),g===!0&&(s.fromBufferAttribute(N,V),T[H+z+4]=s.x,T[H+z+5]=s.y,T[H+z+6]=s.z,T[H+z+7]=0),S===!0&&(s.fromBufferAttribute(O,V),T[H+z+8]=s.x,T[H+z+9]=s.y,T[H+z+10]=s.z,T[H+z+11]=O.itemSize===4?s.w:1)}}h={count:d,texture:C,size:new Lt(y,A)},n.set(o,h),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let S=0;S<c.length;S++)p+=c[S];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function rp(i,t,e,n,s){let r=new WeakMap;function a(c){const u=s.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const ap={[Pc]:"LINEAR_TONE_MAPPING",[Ic]:"REINHARD_TONE_MAPPING",[Dc]:"CINEON_TONE_MAPPING",[Ba]:"ACES_FILMIC_TONE_MAPPING",[Uc]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Lc]:"CUSTOM_TONE_MAPPING"};function op(i,t,e,n,s){const r=new un(t,e,{type:i,depthBuffer:n,stencilBuffer:s}),a=new un(t,e,{type:Tn,depthBuffer:!1,stencilBuffer:!1}),o=new Ae;o.setAttribute("position",new ue([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new ue([0,2,0,0,2,0],2));const l=new Kh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Tt(o,l),u=new to(-1,1,1,-1,0,1);let d=null,h=null,p=!1,g,S=null,m=[],f=!1;this.setSize=function(v,E){r.setSize(v,E),a.setSize(v,E);for(let y=0;y<m.length;y++){const A=m[y];A.setSize&&A.setSize(v,E)}},this.setEffects=function(v){m=v,f=m.length>0&&m[0].isRenderPass===!0;const E=r.width,y=r.height;for(let A=0;A<m.length;A++){const T=m[A];T.setSize&&T.setSize(E,y)}},this.begin=function(v,E){if(p||v.toneMapping===hn&&m.length===0)return!1;if(S=E,E!==null){const y=E.width,A=E.height;(r.width!==y||r.height!==A)&&this.setSize(y,A)}return f===!1&&v.setRenderTarget(r),g=v.toneMapping,v.toneMapping=hn,!0},this.hasRenderPass=function(){return f},this.end=function(v,E){v.toneMapping=g,p=!0;let y=r,A=a;for(let T=0;T<m.length;T++){const C=m[T];if(C.enabled!==!1&&(C.render(v,A,y,E),C.needsSwap!==!1)){const x=y;y=A,A=x}}if(d!==v.outputColorSpace||h!==v.toneMapping){d=v.outputColorSpace,h=v.toneMapping,l.defines={},$t.getTransfer(d)===te&&(l.defines.SRGB_TRANSFER="");const T=ap[h];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,v.setRenderTarget(S),v.render(c,u),S=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const ol=new Ue,Ua=new hs(1,1),cl=new Xc,ll=new wh,hl=new tl,ic=[],sc=[],rc=new Float32Array(16),ac=new Float32Array(9),oc=new Float32Array(4);function zi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ic[s];if(r===void 0&&(r=new Float32Array(s),ic[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function sr(i,t){let e=sc[t];e===void 0&&(e=new Int32Array(t),sc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function cp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function lp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function dp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;oc.set(n),i.uniformMatrix2fv(this.addr,!1,oc),ye(e,n)}}function fp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;ac.set(n),i.uniformMatrix3fv(this.addr,!1,ac),ye(e,n)}}function pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;rc.set(n),i.uniformMatrix4fv(this.addr,!1,rc),ye(e,n)}}function mp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function _p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function vp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function Sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function Ep(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ua.compareFunction=e.isReversedDepthBuffer()?Ya:qa,r=Ua):r=ol,e.setTexture2D(t||r,s)}function bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ll,s)}function wp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||hl,s)}function Tp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||cl,s)}function Ap(i){switch(i){case 5126:return cp;case 35664:return lp;case 35665:return hp;case 35666:return up;case 35674:return dp;case 35675:return fp;case 35676:return pp;case 5124:case 35670:return mp;case 35667:case 35671:return gp;case 35668:case 35672:return _p;case 35669:case 35673:return xp;case 5125:return vp;case 36294:return Mp;case 36295:return Sp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ep;case 35679:case 36299:case 36307:return bp;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Tp}}function Rp(i,t){i.uniform1fv(this.addr,t)}function Cp(i,t){const e=zi(t,this.size,2);i.uniform2fv(this.addr,e)}function Pp(i,t){const e=zi(t,this.size,3);i.uniform3fv(this.addr,e)}function Ip(i,t){const e=zi(t,this.size,4);i.uniform4fv(this.addr,e)}function Dp(i,t){const e=zi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Lp(i,t){const e=zi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Up(i,t){const e=zi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Np(i,t){i.uniform1iv(this.addr,t)}function Fp(i,t){i.uniform2iv(this.addr,t)}function Op(i,t){i.uniform3iv(this.addr,t)}function Bp(i,t){i.uniform4iv(this.addr,t)}function zp(i,t){i.uniform1uiv(this.addr,t)}function kp(i,t){i.uniform2uiv(this.addr,t)}function Vp(i,t){i.uniform3uiv(this.addr,t)}function Gp(i,t){i.uniform4uiv(this.addr,t)}function Hp(i,t,e){const n=this.cache,s=t.length,r=sr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ua:a=ol;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Wp(i,t,e){const n=this.cache,s=t.length,r=sr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ll,r[a])}function Xp(i,t,e){const n=this.cache,s=t.length,r=sr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||hl,r[a])}function qp(i,t,e){const n=this.cache,s=t.length,r=sr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||cl,r[a])}function Yp(i){switch(i){case 5126:return Rp;case 35664:return Cp;case 35665:return Pp;case 35666:return Ip;case 35674:return Dp;case 35675:return Lp;case 35676:return Up;case 5124:case 35670:return Np;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return Bp;case 5125:return zp;case 36294:return kp;case 36295:return Vp;case 36296:return Gp;case 35678:case 36198:case 36298:case 36306:case 35682:return Hp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return qp}}class jp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ap(e.type)}}class $p{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yp(e.type)}}class Zp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Br=/(\w+)(\])?(\[|\.)?/g;function cc(i,t){i.seq.push(t),i.map[t.id]=t}function Kp(i,t,e){const n=i.name,s=n.length;for(Br.lastIndex=0;;){const r=Br.exec(n),a=Br.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){cc(e,c===void 0?new jp(o,i,t):new $p(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Zp(o),cc(e,d)),e=d}}}class $s{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Kp(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function lc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Jp=37297;let Qp=0;function tm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const hc=new Ft;function em(i){$t._getMatrix(hc,$t.workingColorSpace,i);const t=`mat3( ${hc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case Zs:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function uc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+tm(i.getShaderSource(t),o)}else return r}function nm(i,t){const e=em(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const im={[Pc]:"Linear",[Ic]:"Reinhard",[Dc]:"Cineon",[Ba]:"ACESFilmic",[Uc]:"AgX",[Nc]:"Neutral",[Lc]:"Custom"};function sm(i,t){const e=im[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ks=new I;function rm(){$t.getLuminanceCoefficients(ks);const i=ks.x.toFixed(4),t=ks.y.toFixed(4),e=ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function om(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ts(i){return i!==""}function dc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Na(i){return i.replace(lm,um)}const hm=new Map;function um(i,t){let e=Bt[t];if(e===void 0){const n=hm.get(t);if(n!==void 0)e=Bt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Na(e)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pc(i){return i.replace(dm,fm)}function fm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mc(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const pm={[es]:"SHADOWMAP_TYPE_PCF",[Qi]:"SHADOWMAP_TYPE_VSM"};function mm(i){return pm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const gm={[ii]:"ENVMAP_TYPE_CUBE",[Ii]:"ENVMAP_TYPE_CUBE",[er]:"ENVMAP_TYPE_CUBE_UV"};function _m(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":gm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const xm={[Ii]:"ENVMAP_MODE_REFRACTION"};function vm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":xm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Mm={[Cc]:"ENVMAP_BLENDING_MULTIPLY",[Hl]:"ENVMAP_BLENDING_MIX",[Wl]:"ENVMAP_BLENDING_ADD"};function Sm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Mm[i.combine]||"ENVMAP_BLENDING_NONE"}function ym(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Em(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=mm(e),c=_m(e),u=vm(e),d=Sm(e),h=ym(e),p=am(e),g=om(r),S=s.createProgram();let m,f,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ts).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ts).join(`
`),f.length>0&&(f+=`
`)):(m=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),f=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hn?"#define TONE_MAPPING":"",e.toneMapping!==hn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==hn?sm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,nm("linearToOutputTexel",e.outputColorSpace),rm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),a=Na(a),a=dc(a,e),a=fc(a,e),o=Na(o),o=dc(o,e),o=fc(o,e),a=pc(a),o=pc(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=v+m+a,y=v+f+o,A=lc(s,s.VERTEX_SHADER,E),T=lc(s,s.FRAGMENT_SHADER,y);s.attachShader(S,A),s.attachShader(S,T),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(R){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(S)||"",O=s.getShaderInfoLog(A)||"",H=s.getShaderInfoLog(T)||"",V=N.trim(),z=O.trim(),G=H.trim();let Q=!0,Z=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,A,T);else{const lt=uc(s,A,"vertex"),mt=uc(s,T,"fragment");jt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+lt+`
`+mt)}else V!==""?It("WebGLProgram: Program Info Log:",V):(z===""||G==="")&&(Z=!1);Z&&(R.diagnostics={runnable:Q,programLog:V,vertexShader:{log:z,prefix:m},fragmentShader:{log:G,prefix:f}})}s.deleteShader(A),s.deleteShader(T),x=new $s(s,S),b=cm(s,S)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let k=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(S,Jp)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qp++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=A,this.fragmentShader=T,this}let bm=0;class wm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Tm(t),e.set(t,n)),n}}class Tm{constructor(t){this.id=bm++,this.code=t,this.usedTimes=0}}function Am(i,t,e,n,s,r){const a=new qc,o=new wm,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,b,k,R,N){const O=R.fog,H=N.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||V,z),Q=G&&G.mapping===er?G.image.height:null,Z=p[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&It("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const lt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,mt=lt!==void 0?lt.length:0;let ut=0;H.morphAttributes.position!==void 0&&(ut=1),H.morphAttributes.normal!==void 0&&(ut=2),H.morphAttributes.color!==void 0&&(ut=3);let Ot,de,le,j;if(Z){const Qt=cn[Z];Ot=Qt.vertexShader,de=Qt.fragmentShader}else Ot=x.vertexShader,de=x.fragmentShader,o.update(x),le=o.getVertexShaderID(x),j=o.getFragmentShaderID(x);const nt=i.getRenderTarget(),rt=i.state.buffers.depth.getReversed(),Nt=N.isInstancedMesh===!0,At=N.isBatchedMesh===!0,Pt=!!x.map,Ee=!!x.matcap,Yt=!!G,Jt=!!x.aoMap,re=!!x.lightMap,zt=!!x.bumpMap,me=!!x.normalMap,P=!!x.displacementMap,xe=!!x.emissiveMap,Kt=!!x.metalnessMap,oe=!!x.roughnessMap,St=x.anisotropy>0,w=x.clearcoat>0,_=x.dispersion>0,L=x.iridescence>0,Y=x.sheen>0,$=x.transmission>0,q=St&&!!x.anisotropyMap,gt=w&&!!x.clearcoatMap,it=w&&!!x.clearcoatNormalMap,wt=w&&!!x.clearcoatRoughnessMap,Rt=L&&!!x.iridescenceMap,K=L&&!!x.iridescenceThicknessMap,tt=Y&&!!x.sheenColorMap,_t=Y&&!!x.sheenRoughnessMap,vt=!!x.specularMap,ht=!!x.specularColorMap,kt=!!x.specularIntensityMap,D=$&&!!x.transmissionMap,st=$&&!!x.thicknessMap,et=!!x.gradientMap,ft=!!x.alphaMap,J=x.alphaTest>0,X=!!x.alphaHash,xt=!!x.extensions;let Dt=hn;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Dt=i.toneMapping);const ce={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:Ot,fragmentShader:de,defines:x.defines,customVertexShaderID:le,customFragmentShaderID:j,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:At,batchingColor:At&&N._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&N.instanceColor!==null,instancingMorph:Nt&&N.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Li,alphaToCoverage:!!x.alphaToCoverage,map:Pt,matcap:Ee,envMap:Yt,envMapMode:Yt&&G.mapping,envMapCubeUVHeight:Q,aoMap:Jt,lightMap:re,bumpMap:zt,normalMap:me,displacementMap:P,emissiveMap:xe,normalMapObjectSpace:me&&x.normalMapType===Yl,normalMapTangentSpace:me&&x.normalMapType===Hc,metalnessMap:Kt,roughnessMap:oe,anisotropy:St,anisotropyMap:q,clearcoat:w,clearcoatMap:gt,clearcoatNormalMap:it,clearcoatRoughnessMap:wt,dispersion:_,iridescence:L,iridescenceMap:Rt,iridescenceThicknessMap:K,sheen:Y,sheenColorMap:tt,sheenRoughnessMap:_t,specularMap:vt,specularColorMap:ht,specularIntensityMap:kt,transmission:$,transmissionMap:D,thicknessMap:st,gradientMap:et,opaque:x.transparent===!1&&x.blending===Ri&&x.alphaToCoverage===!1,alphaMap:ft,alphaTest:J,alphaHash:X,combine:x.combine,mapUv:Pt&&g(x.map.channel),aoMapUv:Jt&&g(x.aoMap.channel),lightMapUv:re&&g(x.lightMap.channel),bumpMapUv:zt&&g(x.bumpMap.channel),normalMapUv:me&&g(x.normalMap.channel),displacementMapUv:P&&g(x.displacementMap.channel),emissiveMapUv:xe&&g(x.emissiveMap.channel),metalnessMapUv:Kt&&g(x.metalnessMap.channel),roughnessMapUv:oe&&g(x.roughnessMap.channel),anisotropyMapUv:q&&g(x.anisotropyMap.channel),clearcoatMapUv:gt&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:_t&&g(x.sheenRoughnessMap.channel),specularMapUv:vt&&g(x.specularMap.channel),specularColorMapUv:ht&&g(x.specularColorMap.channel),specularIntensityMapUv:kt&&g(x.specularIntensityMap.channel),transmissionMapUv:D&&g(x.transmissionMap.channel),thicknessMapUv:st&&g(x.thicknessMap.channel),alphaMapUv:ft&&g(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(me||St),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!H.attributes.uv&&(Pt||ft),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:N.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:ut,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Pt&&x.map.isVideoTexture===!0&&$t.getTransfer(x.map.colorSpace)===te,decodeVideoTextureEmissive:xe&&x.emissiveMap.isVideoTexture===!0&&$t.getTransfer(x.emissiveMap.colorSpace)===te,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Oe,flipSided:x.side===Be,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&x.extensions.multiDraw===!0||At)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ce.vertexUv1s=l.has(1),ce.vertexUv2s=l.has(2),ce.vertexUv3s=l.has(3),l.clear(),ce}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const k in x.defines)b.push(k),b.push(x.defines[k]);return x.isRawShaderMaterial===!1&&(f(b,x),v(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function f(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function v(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),x.push(a.mask)}function E(x){const b=p[x.type];let k;if(b){const R=cn[b];k=jh.clone(R.uniforms)}else k=x.uniforms;return k}function y(x,b){let k=u.get(b);return k!==void 0?++k.usedTimes:(k=new Em(i,b,x,s),c.push(k),u.set(b,k)),k}function A(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function C(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:C}}function Rm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Cm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function gc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function _c(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,S,m,f){let v=i[t];return v===void 0?(v={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:f},i[t]=v):(v.id=h.id,v.object=h,v.geometry=p,v.material=g,v.materialVariant=a(h),v.groupOrder=S,v.renderOrder=h.renderOrder,v.z=m,v.group=f),t++,v}function l(h,p,g,S,m,f){const v=o(h,p,g,S,m,f);g.transmission>0?n.push(v):g.transparent===!0?s.push(v):e.push(v)}function c(h,p,g,S,m,f){const v=o(h,p,g,S,m,f);g.transmission>0?n.unshift(v):g.transparent===!0?s.unshift(v):e.unshift(v)}function u(h,p){e.length>1&&e.sort(h||Cm),n.length>1&&n.sort(p||gc),s.length>1&&s.sort(p||gc)}function d(){for(let h=t,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function Pm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new _c,i.set(n,[a])):s>=r.length?(a=new _c,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Im(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ct};break;case"SpotLight":e={position:new I,direction:new I,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Dm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Lm=0;function Um(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Nm(i){const t=new Im,e=Dm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new se,a=new se;function o(c){let u=0,d=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,S=0,m=0,f=0,v=0,E=0,y=0,A=0,T=0,C=0;c.sort(Um);for(let b=0,k=c.length;b<k;b++){const R=c[b],N=R.color,O=R.intensity,H=R.distance;let V=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Di?V=R.shadow.map.texture:V=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=N.r*O,d+=N.g*O,h+=N.b*O;else if(R.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(R.sh.coefficients[z],O);C++}else if(R.isDirectionalLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const G=R.shadow,Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.directionalShadow[p]=Q,n.directionalShadowMap[p]=V,n.directionalShadowMatrix[p]=R.shadow.matrix,v++}n.directional[p]=z,p++}else if(R.isSpotLight){const z=t.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(N).multiplyScalar(O),z.distance=H,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,n.spot[S]=z;const G=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,G.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[S]=G.matrix,R.castShadow){const Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,n.spotShadow[S]=Q,n.spotShadowMap[S]=V,y++}S++}else if(R.isRectAreaLight){const z=t.get(R);z.color.copy(N).multiplyScalar(O),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=z,m++}else if(R.isPointLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const G=R.shadow,Q=e.get(R);Q.shadowIntensity=G.intensity,Q.shadowBias=G.bias,Q.shadowNormalBias=G.normalBias,Q.shadowRadius=G.radius,Q.shadowMapSize=G.mapSize,Q.shadowCameraNear=G.camera.near,Q.shadowCameraFar=G.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=z,g++}else if(R.isHemisphereLight){const z=t.get(R);z.skyColor.copy(R.color).multiplyScalar(O),z.groundColor.copy(R.groundColor).multiplyScalar(O),n.hemi[f]=z,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const x=n.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==S||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==v||x.numPointShadows!==E||x.numSpotShadows!==y||x.numSpotMaps!==A||x.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=S,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,x.directionalLength=p,x.pointLength=g,x.spotLength=S,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=v,x.numPointShadows=E,x.numSpotShadows=y,x.numSpotMaps=A,x.numLightProbes=C,n.version=Lm++)}function l(c,u){let d=0,h=0,p=0,g=0,S=0;const m=u.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const E=c[f];if(E.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(E.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const y=n.hemi[S];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:n}}function xc(i){const t=new Nm(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Fm(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new xc(i),t.set(s,[o])):r>=a.length?(o=new xc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bm=`uniform sampler2D shadow_pass;
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
}`,zm=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],km=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],vc=new se,Zi=new I,zr=new I;function Vm(i,t,e){let n=new Ka;const s=new Lt,r=new Lt,a=new pe,o=new Jh,l=new Qh,c={},u=e.maxTextureSize,d={[Vn]:Be,[Be]:Vn,[Oe]:Oe},h=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:Om,fragmentShader:Bm}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ae;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Tt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=es;let f=this.type;this.render=function(T,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===bl&&(It("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=es);const b=i.getRenderTarget(),k=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),N=i.state;N.setBlending(En),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=f!==this.type;O&&C.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(V=>V.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,V=T.length;H<V;H++){const z=T[H],G=z.shadow;if(G===void 0){It("WebGLShadowMap:",z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const Q=G.getFrameExtents();s.multiply(Q),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,G.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Z,G.map===null||O===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Qi){if(z.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new un(s.x,s.y,{format:Di,type:Tn,minFilter:Le,magFilter:Le,generateMipmaps:!1}),G.map.texture.name=z.name+".shadowMap",G.map.depthTexture=new hs(s.x,s.y,tn),G.map.depthTexture.name=z.name+".shadowMapDepth",G.map.depthTexture.format=An,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Te,G.map.depthTexture.magFilter=Te}else z.isPointLight?(G.map=new al(s.x),G.map.depthTexture=new qh(s.x,dn)):(G.map=new un(s.x,s.y),G.map.depthTexture=new hs(s.x,s.y,dn)),G.map.depthTexture.name=z.name+".shadowMap",G.map.depthTexture.format=An,this.type===es?(G.map.depthTexture.compareFunction=Z?Ya:qa,G.map.depthTexture.minFilter=Le,G.map.depthTexture.magFilter=Le):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Te,G.map.depthTexture.magFilter=Te);G.camera.updateProjectionMatrix()}const lt=G.map.isWebGLCubeRenderTarget?6:1;for(let mt=0;mt<lt;mt++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,mt),i.clear();else{mt===0&&(i.setRenderTarget(G.map),i.clear());const ut=G.getViewport(mt);a.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),N.viewport(a)}if(z.isPointLight){const ut=G.camera,Ot=G.matrix,de=z.distance||ut.far;de!==ut.far&&(ut.far=de,ut.updateProjectionMatrix()),Zi.setFromMatrixPosition(z.matrixWorld),ut.position.copy(Zi),zr.copy(ut.position),zr.add(zm[mt]),ut.up.copy(km[mt]),ut.lookAt(zr),ut.updateMatrixWorld(),Ot.makeTranslation(-Zi.x,-Zi.y,-Zi.z),vc.multiplyMatrices(ut.projectionMatrix,ut.matrixWorldInverse),G._frustum.setFromProjectionMatrix(vc,ut.coordinateSystem,ut.reversedDepth)}else G.updateMatrices(z);n=G.getFrustum(),y(C,x,G.camera,z,this.type)}G.isPointLightShadow!==!0&&this.type===Qi&&v(G,x),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,k,R)};function v(T,C){const x=t.update(S);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new un(s.x,s.y,{format:Di,type:Tn})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,x,h,S,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,x,p,S,null)}function E(T,C,x,b){let k=null;const R=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)k=R;else if(k=x.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=k.uuid,O=C.uuid;let H=c[N];H===void 0&&(H={},c[N]=H);let V=H[O];V===void 0&&(V=k.clone(),H[O]=V,C.addEventListener("dispose",A)),k=V}if(k.visible=C.visible,k.wireframe=C.wireframe,b===Qi?k.side=C.shadowSide!==null?C.shadowSide:C.side:k.side=C.shadowSide!==null?C.shadowSide:d[C.side],k.alphaMap=C.alphaMap,k.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,k.map=C.map,k.clipShadows=C.clipShadows,k.clippingPlanes=C.clippingPlanes,k.clipIntersection=C.clipIntersection,k.displacementMap=C.displacementMap,k.displacementScale=C.displacementScale,k.displacementBias=C.displacementBias,k.wireframeLinewidth=C.wireframeLinewidth,k.linewidth=C.linewidth,x.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const N=i.properties.get(k);N.light=x}return k}function y(T,C,x,b,k){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&k===Qi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const O=t.update(T),H=T.material;if(Array.isArray(H)){const V=O.groups;for(let z=0,G=V.length;z<G;z++){const Q=V[z],Z=H[Q.materialIndex];if(Z&&Z.visible){const lt=E(T,Z,b,k);T.onBeforeShadow(i,T,C,x,O,lt,Q),i.renderBufferDirect(x,null,O,lt,T,Q),T.onAfterShadow(i,T,C,x,O,lt,Q)}}}else if(H.visible){const V=E(T,H,b,k);T.onBeforeShadow(i,T,C,x,O,V,null),i.renderBufferDirect(x,null,O,V,T,null),T.onAfterShadow(i,T,C,x,O,V,null)}}const N=T.children;for(let O=0,H=N.length;O<H;O++)y(N[O],C,x,b,k)}function A(T){T.target.removeEventListener("dispose",A);for(const x in c){const b=c[x],k=T.target.uuid;k in b&&(b[k].dispose(),delete b[k])}}}function Gm(i,t){function e(){let D=!1;const st=new pe;let et=null;const ft=new pe(0,0,0,0);return{setMask:function(J){et!==J&&!D&&(i.colorMask(J,J,J,J),et=J)},setLocked:function(J){D=J},setClear:function(J,X,xt,Dt,ce){ce===!0&&(J*=Dt,X*=Dt,xt*=Dt),st.set(J,X,xt,Dt),ft.equals(st)===!1&&(i.clearColor(J,X,xt,Dt),ft.copy(st))},reset:function(){D=!1,et=null,ft.set(-1,0,0,0)}}}function n(){let D=!1,st=!1,et=null,ft=null,J=null;return{setReversed:function(X){if(st!==X){const xt=t.get("EXT_clip_control");X?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),st=X;const Dt=J;J=null,this.setClear(Dt)}},getReversed:function(){return st},setTest:function(X){X?nt(i.DEPTH_TEST):rt(i.DEPTH_TEST)},setMask:function(X){et!==X&&!D&&(i.depthMask(X),et=X)},setFunc:function(X){if(st&&(X=ih[X]),ft!==X){switch(X){case Xr:i.depthFunc(i.NEVER);break;case qr:i.depthFunc(i.ALWAYS);break;case Yr:i.depthFunc(i.LESS);break;case Pi:i.depthFunc(i.LEQUAL);break;case jr:i.depthFunc(i.EQUAL);break;case $r:i.depthFunc(i.GEQUAL);break;case Zr:i.depthFunc(i.GREATER);break;case Kr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=X}},setLocked:function(X){D=X},setClear:function(X){J!==X&&(J=X,st&&(X=1-X),i.clearDepth(X))},reset:function(){D=!1,et=null,ft=null,J=null,st=!1}}}function s(){let D=!1,st=null,et=null,ft=null,J=null,X=null,xt=null,Dt=null,ce=null;return{setTest:function(Qt){D||(Qt?nt(i.STENCIL_TEST):rt(i.STENCIL_TEST))},setMask:function(Qt){st!==Qt&&!D&&(i.stencilMask(Qt),st=Qt)},setFunc:function(Qt,fn,pn){(et!==Qt||ft!==fn||J!==pn)&&(i.stencilFunc(Qt,fn,pn),et=Qt,ft=fn,J=pn)},setOp:function(Qt,fn,pn){(X!==Qt||xt!==fn||Dt!==pn)&&(i.stencilOp(Qt,fn,pn),X=Qt,xt=fn,Dt=pn)},setLocked:function(Qt){D=Qt},setClear:function(Qt){ce!==Qt&&(i.clearStencil(Qt),ce=Qt)},reset:function(){D=!1,st=null,et=null,ft=null,J=null,X=null,xt=null,Dt=null,ce=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,S=!1,m=null,f=null,v=null,E=null,y=null,A=null,T=null,C=new Ct(0,0,0),x=0,b=!1,k=null,R=null,N=null,O=null,H=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,G=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=G>=1):Q.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=G>=2);let Z=null,lt={};const mt=i.getParameter(i.SCISSOR_BOX),ut=i.getParameter(i.VIEWPORT),Ot=new pe().fromArray(mt),de=new pe().fromArray(ut);function le(D,st,et,ft){const J=new Uint8Array(4),X=i.createTexture();i.bindTexture(D,X),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<et;xt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(st+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return X}const j={};j[i.TEXTURE_2D]=le(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(Pi),zt(!1),me(mo),nt(i.CULL_FACE),Jt(En);function nt(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function rt(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Nt(D,st){return d[D]!==st?(i.bindFramebuffer(D,st),d[D]=st,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function At(D,st){let et=p,ft=!1;if(D){et=h.get(st),et===void 0&&(et=[],h.set(st,et));const J=D.textures;if(et.length!==J.length||et[0]!==i.COLOR_ATTACHMENT0){for(let X=0,xt=J.length;X<xt;X++)et[X]=i.COLOR_ATTACHMENT0+X;et.length=J.length,ft=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,ft=!0);ft&&i.drawBuffers(et)}function Pt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const Ee={[Qn]:i.FUNC_ADD,[Tl]:i.FUNC_SUBTRACT,[Al]:i.FUNC_REVERSE_SUBTRACT};Ee[Rl]=i.MIN,Ee[Cl]=i.MAX;const Yt={[Pl]:i.ZERO,[Il]:i.ONE,[Dl]:i.SRC_COLOR,[Hr]:i.SRC_ALPHA,[Bl]:i.SRC_ALPHA_SATURATE,[Fl]:i.DST_COLOR,[Ul]:i.DST_ALPHA,[Ll]:i.ONE_MINUS_SRC_COLOR,[Wr]:i.ONE_MINUS_SRC_ALPHA,[Ol]:i.ONE_MINUS_DST_COLOR,[Nl]:i.ONE_MINUS_DST_ALPHA,[zl]:i.CONSTANT_COLOR,[kl]:i.ONE_MINUS_CONSTANT_COLOR,[Vl]:i.CONSTANT_ALPHA,[Gl]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(D,st,et,ft,J,X,xt,Dt,ce,Qt){if(D===En){S===!0&&(rt(i.BLEND),S=!1);return}if(S===!1&&(nt(i.BLEND),S=!0),D!==wl){if(D!==m||Qt!==b){if((f!==Qn||y!==Qn)&&(i.blendEquation(i.FUNC_ADD),f=Qn,y=Qn),Qt)switch(D){case Ri:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case go:i.blendFunc(i.ONE,i.ONE);break;case _o:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:jt("WebGLState: Invalid blending: ",D);break}else switch(D){case Ri:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case go:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _o:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xo:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",D);break}v=null,E=null,A=null,T=null,C.set(0,0,0),x=0,m=D,b=Qt}return}J=J||st,X=X||et,xt=xt||ft,(st!==f||J!==y)&&(i.blendEquationSeparate(Ee[st],Ee[J]),f=st,y=J),(et!==v||ft!==E||X!==A||xt!==T)&&(i.blendFuncSeparate(Yt[et],Yt[ft],Yt[X],Yt[xt]),v=et,E=ft,A=X,T=xt),(Dt.equals(C)===!1||ce!==x)&&(i.blendColor(Dt.r,Dt.g,Dt.b,ce),C.copy(Dt),x=ce),m=D,b=!1}function re(D,st){D.side===Oe?rt(i.CULL_FACE):nt(i.CULL_FACE);let et=D.side===Be;st&&(et=!et),zt(et),D.blending===Ri&&D.transparent===!1?Jt(En):Jt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const ft=D.stencilWrite;o.setTest(ft),ft&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),xe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(D){k!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),k=D)}function me(D){D!==yl?(nt(i.CULL_FACE),D!==R&&(D===mo?i.cullFace(i.BACK):D===El?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):rt(i.CULL_FACE),R=D}function P(D){D!==N&&(z&&i.lineWidth(D),N=D)}function xe(D,st,et){D?(nt(i.POLYGON_OFFSET_FILL),(O!==st||H!==et)&&(O=st,H=et,a.getReversed()&&(st=-st),i.polygonOffset(st,et))):rt(i.POLYGON_OFFSET_FILL)}function Kt(D){D?nt(i.SCISSOR_TEST):rt(i.SCISSOR_TEST)}function oe(D){D===void 0&&(D=i.TEXTURE0+V-1),Z!==D&&(i.activeTexture(D),Z=D)}function St(D,st,et){et===void 0&&(Z===null?et=i.TEXTURE0+V-1:et=Z);let ft=lt[et];ft===void 0&&(ft={type:void 0,texture:void 0},lt[et]=ft),(ft.type!==D||ft.texture!==st)&&(Z!==et&&(i.activeTexture(et),Z=et),i.bindTexture(D,st||j[D]),ft.type=D,ft.texture=st)}function w(){const D=lt[Z];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(D){jt("WebGLState:",D)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(D){jt("WebGLState:",D)}}function Y(){try{i.texSubImage2D(...arguments)}catch(D){jt("WebGLState:",D)}}function $(){try{i.texSubImage3D(...arguments)}catch(D){jt("WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){jt("WebGLState:",D)}}function gt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){jt("WebGLState:",D)}}function it(){try{i.texStorage2D(...arguments)}catch(D){jt("WebGLState:",D)}}function wt(){try{i.texStorage3D(...arguments)}catch(D){jt("WebGLState:",D)}}function Rt(){try{i.texImage2D(...arguments)}catch(D){jt("WebGLState:",D)}}function K(){try{i.texImage3D(...arguments)}catch(D){jt("WebGLState:",D)}}function tt(D){Ot.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Ot.copy(D))}function _t(D){de.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),de.copy(D))}function vt(D,st){let et=c.get(st);et===void 0&&(et=new WeakMap,c.set(st,et));let ft=et.get(D);ft===void 0&&(ft=i.getUniformBlockIndex(st,D.name),et.set(D,ft))}function ht(D,st){const ft=c.get(st).get(D);l.get(st)!==ft&&(i.uniformBlockBinding(st,ft,D.__bindingPointIndex),l.set(st,ft))}function kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Z=null,lt={},d={},h=new WeakMap,p=[],g=null,S=!1,m=null,f=null,v=null,E=null,y=null,A=null,T=null,C=new Ct(0,0,0),x=0,b=!1,k=null,R=null,N=null,O=null,H=null,Ot.set(0,0,i.canvas.width,i.canvas.height),de.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Nt,drawBuffers:At,useProgram:Pt,setBlending:Jt,setMaterial:re,setFlipSided:zt,setCullFace:me,setLineWidth:P,setPolygonOffset:xe,setScissorTest:Kt,activeTexture:oe,bindTexture:St,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:L,texImage2D:Rt,texImage3D:K,updateUBOMapping:vt,uniformBlockBinding:ht,texStorage2D:it,texStorage3D:wt,texSubImage2D:Y,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:gt,scissor:tt,viewport:_t,reset:kt}}function Hm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Lt,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return p?new OffscreenCanvas(w,_):Ks("canvas")}function S(w,_,L){let Y=1;const $=St(w);if(($.width>L||$.height>L)&&(Y=L/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const q=Math.floor(Y*$.width),gt=Math.floor(Y*$.height);d===void 0&&(d=g(q,gt));const it=_?g(q,gt):d;return it.width=q,it.height=gt,it.getContext("2d").drawImage(w,0,0,q,gt),It("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+gt+")."),it}else return"data"in w&&It("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){i.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,L,Y,$=!1){if(w!==null){if(i[w]!==void 0)return i[w];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=_;if(_===i.RED&&(L===i.FLOAT&&(q=i.R32F),L===i.HALF_FLOAT&&(q=i.R16F),L===i.UNSIGNED_BYTE&&(q=i.R8)),_===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.R8UI),L===i.UNSIGNED_SHORT&&(q=i.R16UI),L===i.UNSIGNED_INT&&(q=i.R32UI),L===i.BYTE&&(q=i.R8I),L===i.SHORT&&(q=i.R16I),L===i.INT&&(q=i.R32I)),_===i.RG&&(L===i.FLOAT&&(q=i.RG32F),L===i.HALF_FLOAT&&(q=i.RG16F),L===i.UNSIGNED_BYTE&&(q=i.RG8)),_===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RG8UI),L===i.UNSIGNED_SHORT&&(q=i.RG16UI),L===i.UNSIGNED_INT&&(q=i.RG32UI),L===i.BYTE&&(q=i.RG8I),L===i.SHORT&&(q=i.RG16I),L===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGB8UI),L===i.UNSIGNED_SHORT&&(q=i.RGB16UI),L===i.UNSIGNED_INT&&(q=i.RGB32UI),L===i.BYTE&&(q=i.RGB8I),L===i.SHORT&&(q=i.RGB16I),L===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),L===i.UNSIGNED_INT&&(q=i.RGBA32UI),L===i.BYTE&&(q=i.RGBA8I),L===i.SHORT&&(q=i.RGBA16I),L===i.INT&&(q=i.RGBA32I)),_===i.RGB&&(L===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),_===i.RGBA){const gt=$?Zs:$t.getTransfer(Y);L===i.FLOAT&&(q=i.RGBA32F),L===i.HALF_FLOAT&&(q=i.RGBA16F),L===i.UNSIGNED_BYTE&&(q=gt===te?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function y(w,_){let L;return w?_===null||_===dn||_===cs?L=i.DEPTH24_STENCIL8:_===tn?L=i.DEPTH32F_STENCIL8:_===os&&(L=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===dn||_===cs?L=i.DEPTH_COMPONENT24:_===tn?L=i.DEPTH_COMPONENT32F:_===os&&(L=i.DEPTH_COMPONENT16),L}function A(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Te&&w.minFilter!==Le?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),x(_),_.isVideoTexture&&u.delete(_)}function C(w){const _=w.target;_.removeEventListener("dispose",C),k(_)}function x(w){const _=n.get(w);if(_.__webglInit===void 0)return;const L=w.source,Y=h.get(L);if(Y){const $=Y[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(w),Object.keys(Y).length===0&&h.delete(L)}n.remove(w)}function b(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const L=w.source,Y=h.get(L);delete Y[_.__cacheKey],a.memory.textures--}function k(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let $=0;$<_.__webglFramebuffer[Y].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[Y][$]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const L=w.textures;for(let Y=0,$=L.length;Y<$;Y++){const q=n.get(L[Y]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(L[Y])}n.remove(w)}let R=0;function N(){R=0}function O(){const w=R;return w>=s.maxTextures&&It("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),R+=1,w}function H(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function V(w,_){const L=n.get(w);if(w.isVideoTexture&&Kt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&L.__version!==w.version){const Y=w.image;if(Y===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{j(L,w,_);return}}else w.isExternalTexture&&(L.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+_)}function z(w,_){const L=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&L.__version!==w.version){j(L,w,_);return}else w.isExternalTexture&&(L.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+_)}function G(w,_){const L=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&L.__version!==w.version){j(L,w,_);return}e.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+_)}function Q(w,_){const L=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&L.__version!==w.version){nt(L,w,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+_)}const Z={[Sn]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[Jr]:i.MIRRORED_REPEAT},lt={[Te]:i.NEAREST,[Xl]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[Le]:i.LINEAR,[lr]:i.LINEAR_MIPMAP_NEAREST,[Bn]:i.LINEAR_MIPMAP_LINEAR},mt={[jl]:i.NEVER,[Ql]:i.ALWAYS,[$l]:i.LESS,[qa]:i.LEQUAL,[Zl]:i.EQUAL,[Ya]:i.GEQUAL,[Kl]:i.GREATER,[Jl]:i.NOTEQUAL};function ut(w,_){if(_.type===tn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Le||_.magFilter===lr||_.magFilter===fs||_.magFilter===Bn||_.minFilter===Le||_.minFilter===lr||_.minFilter===fs||_.minFilter===Bn)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Z[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Z[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Z[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,lt[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,mt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Te||_.minFilter!==fs&&_.minFilter!==Bn||_.type===tn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const L=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ot(w,_){let L=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const Y=_.source;let $=h.get(Y);$===void 0&&($={},h.set(Y,$));const q=H(_);if(q!==w.__cacheKey){$[q]===void 0&&($[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),$[q].usedTimes++;const gt=$[w.__cacheKey];gt!==void 0&&($[w.__cacheKey].usedTimes--,gt.usedTimes===0&&b(_)),w.__cacheKey=q,w.__webglTexture=$[q].texture}return L}function de(w,_,L){return Math.floor(Math.floor(w/L)/_)}function le(w,_,L,Y){const q=w.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,L,Y,_.data);else{q.sort((K,tt)=>K.start-tt.start);let gt=0;for(let K=1;K<q.length;K++){const tt=q[gt],_t=q[K],vt=tt.start+tt.count,ht=de(_t.start,_.width,4),kt=de(tt.start,_.width,4);_t.start<=vt+1&&ht===kt&&de(_t.start+_t.count-1,_.width,4)===ht?tt.count=Math.max(tt.count,_t.start+_t.count-tt.start):(++gt,q[gt]=_t)}q.length=gt+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),wt=i.getParameter(i.UNPACK_SKIP_PIXELS),Rt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let K=0,tt=q.length;K<tt;K++){const _t=q[K],vt=Math.floor(_t.start/4),ht=Math.ceil(_t.count/4),kt=vt%_.width,D=Math.floor(vt/_.width),st=ht,et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,kt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,kt,D,st,et,L,Y,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Rt)}}function j(w,_,L){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const $=Ot(w,_),q=_.source;e.bindTexture(Y,w.__webglTexture,i.TEXTURE0+L);const gt=n.get(q);if(q.version!==gt.__version||$===!0){e.activeTexture(i.TEXTURE0+L);const it=$t.getPrimaries($t.workingColorSpace),wt=_.colorSpace===On?null:$t.getPrimaries(_.colorSpace),Rt=_.colorSpace===On||it===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let K=S(_.image,!1,s.maxTextureSize);K=oe(_,K);const tt=r.convert(_.format,_.colorSpace),_t=r.convert(_.type);let vt=E(_.internalFormat,tt,_t,_.colorSpace,_.isVideoTexture);ut(Y,_);let ht;const kt=_.mipmaps,D=_.isVideoTexture!==!0,st=gt.__version===void 0||$===!0,et=q.dataReady,ft=A(_,K);if(_.isDepthTexture)vt=y(_.format===ei,_.type),st&&(D?e.texStorage2D(i.TEXTURE_2D,1,vt,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,vt,K.width,K.height,0,tt,_t,null));else if(_.isDataTexture)if(kt.length>0){D&&st&&e.texStorage2D(i.TEXTURE_2D,ft,vt,kt[0].width,kt[0].height);for(let J=0,X=kt.length;J<X;J++)ht=kt[J],D?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,_t,ht.data):e.texImage2D(i.TEXTURE_2D,J,vt,ht.width,ht.height,0,tt,_t,ht.data);_.generateMipmaps=!1}else D?(st&&e.texStorage2D(i.TEXTURE_2D,ft,vt,K.width,K.height),et&&le(_,K,tt,_t)):e.texImage2D(i.TEXTURE_2D,0,vt,K.width,K.height,0,tt,_t,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,vt,kt[0].width,kt[0].height,K.depth);for(let J=0,X=kt.length;J<X;J++)if(ht=kt[J],_.format!==en)if(tt!==null)if(D){if(et)if(_.layerUpdates.size>0){const xt=Zo(ht.width,ht.height,_.format,_.type);for(const Dt of _.layerUpdates){const ce=ht.data.subarray(Dt*xt/ht.data.BYTES_PER_ELEMENT,(Dt+1)*xt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Dt,ht.width,ht.height,1,tt,ce)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,K.depth,tt,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,vt,ht.width,ht.height,K.depth,0,ht.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,K.depth,tt,_t,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,vt,ht.width,ht.height,K.depth,0,tt,_t,ht.data)}else{D&&st&&e.texStorage2D(i.TEXTURE_2D,ft,vt,kt[0].width,kt[0].height);for(let J=0,X=kt.length;J<X;J++)ht=kt[J],_.format!==en?tt!==null?D?et&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,J,vt,ht.width,ht.height,0,ht.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,_t,ht.data):e.texImage2D(i.TEXTURE_2D,J,vt,ht.width,ht.height,0,tt,_t,ht.data)}else if(_.isDataArrayTexture)if(D){if(st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,vt,K.width,K.height,K.depth),et)if(_.layerUpdates.size>0){const J=Zo(K.width,K.height,_.format,_.type);for(const X of _.layerUpdates){const xt=K.data.subarray(X*J/K.data.BYTES_PER_ELEMENT,(X+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,K.width,K.height,1,tt,_t,xt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,tt,_t,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,K.width,K.height,K.depth,0,tt,_t,K.data);else if(_.isData3DTexture)D?(st&&e.texStorage3D(i.TEXTURE_3D,ft,vt,K.width,K.height,K.depth),et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,tt,_t,K.data)):e.texImage3D(i.TEXTURE_3D,0,vt,K.width,K.height,K.depth,0,tt,_t,K.data);else if(_.isFramebufferTexture){if(st)if(D)e.texStorage2D(i.TEXTURE_2D,ft,vt,K.width,K.height);else{let J=K.width,X=K.height;for(let xt=0;xt<ft;xt++)e.texImage2D(i.TEXTURE_2D,xt,vt,J,X,0,tt,_t,null),J>>=1,X>>=1}}else if(kt.length>0){if(D&&st){const J=St(kt[0]);e.texStorage2D(i.TEXTURE_2D,ft,vt,J.width,J.height)}for(let J=0,X=kt.length;J<X;J++)ht=kt[J],D?et&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,tt,_t,ht):e.texImage2D(i.TEXTURE_2D,J,vt,tt,_t,ht);_.generateMipmaps=!1}else if(D){if(st){const J=St(K);e.texStorage2D(i.TEXTURE_2D,ft,vt,J.width,J.height)}et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt,_t,K)}else e.texImage2D(i.TEXTURE_2D,0,vt,tt,_t,K);m(_)&&f(Y),gt.__version=q.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function nt(w,_,L){if(_.image.length!==6)return;const Y=Ot(w,_),$=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+L);const q=n.get($);if($.version!==q.__version||Y===!0){e.activeTexture(i.TEXTURE0+L);const gt=$t.getPrimaries($t.workingColorSpace),it=_.colorSpace===On?null:$t.getPrimaries(_.colorSpace),wt=_.colorSpace===On||gt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Rt=_.isCompressedTexture||_.image[0].isCompressedTexture,K=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let X=0;X<6;X++)!Rt&&!K?tt[X]=S(_.image[X],!0,s.maxCubemapSize):tt[X]=K?_.image[X].image:_.image[X],tt[X]=oe(_,tt[X]);const _t=tt[0],vt=r.convert(_.format,_.colorSpace),ht=r.convert(_.type),kt=E(_.internalFormat,vt,ht,_.colorSpace),D=_.isVideoTexture!==!0,st=q.__version===void 0||Y===!0,et=$.dataReady;let ft=A(_,_t);ut(i.TEXTURE_CUBE_MAP,_);let J;if(Rt){D&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,kt,_t.width,_t.height);for(let X=0;X<6;X++){J=tt[X].mipmaps;for(let xt=0;xt<J.length;xt++){const Dt=J[xt];_.format!==en?vt!==null?D?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,0,0,Dt.width,Dt.height,vt,Dt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,kt,Dt.width,Dt.height,0,Dt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,0,0,Dt.width,Dt.height,vt,ht,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,kt,Dt.width,Dt.height,0,vt,ht,Dt.data)}}}else{if(J=_.mipmaps,D&&st){J.length>0&&ft++;const X=St(tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,kt,X.width,X.height)}for(let X=0;X<6;X++)if(K){D?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,tt[X].width,tt[X].height,vt,ht,tt[X].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,kt,tt[X].width,tt[X].height,0,vt,ht,tt[X].data);for(let xt=0;xt<J.length;xt++){const ce=J[xt].image[X].image;D?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,0,0,ce.width,ce.height,vt,ht,ce.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,kt,ce.width,ce.height,0,vt,ht,ce.data)}}else{D?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,vt,ht,tt[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,kt,vt,ht,tt[X]);for(let xt=0;xt<J.length;xt++){const Dt=J[xt];D?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,0,0,vt,ht,Dt.image[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,kt,vt,ht,Dt.image[X])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),q.__version=$.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function rt(w,_,L,Y,$,q){const gt=r.convert(L.format,L.colorSpace),it=r.convert(L.type),wt=E(L.internalFormat,gt,it,L.colorSpace),Rt=n.get(_),K=n.get(L);if(K.__renderTarget=_,!Rt.__hasExternalTextures){const tt=Math.max(1,_.width>>q),_t=Math.max(1,_.height>>q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,q,wt,tt,_t,_.depth,0,gt,it,null):e.texImage2D($,q,wt,tt,_t,0,gt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,$,K.__webglTexture,0,P(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,$,K.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(w,_,L){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const Y=_.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,q=y(_.stencilBuffer,$),gt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,P(_),q,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,P(_),q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,w)}else{const Y=_.textures;for(let $=0;$<Y.length;$++){const q=Y[$],gt=r.convert(q.format,q.colorSpace),it=r.convert(q.type),wt=E(q.internalFormat,gt,it,q.colorSpace);xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,P(_),wt,_.width,_.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,P(_),wt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,wt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(w,_,L){const Y=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),ut(i.TEXTURE_CUBE_MAP,_.depthTexture);const Rt=r.convert(_.depthTexture.format),K=r.convert(_.depthTexture.type);let tt;_.depthTexture.format===An?tt=i.DEPTH_COMPONENT24:_.depthTexture.format===ei&&(tt=i.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,tt,_.width,_.height,0,Rt,K,null)}}else V(_.depthTexture,0);const q=$.__webglTexture,gt=P(_),it=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,wt=_.depthTexture.format===ei?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===An)xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,wt,it,q,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,wt,it,q,0);else if(_.depthTexture.format===ei)xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,wt,it,q,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,wt,it,q,0);else throw new Error("Unknown depthTexture format")}function Pt(w){const _=n.get(w),L=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=Y}if(w.depthTexture&&!_.__autoAllocateDepthBuffer)if(L)for(let Y=0;Y<6;Y++)At(_.__webglFramebuffer[Y],w,Y);else{const Y=w.texture.mipmaps;Y&&Y.length>0?At(_.__webglFramebuffer[0],w,0):At(_.__webglFramebuffer,w,0)}else if(L){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),Nt(_.__webglDepthbuffer[Y],w,!1);else{const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}else{const Y=w.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Nt(_.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(w,_,L){const Y=n.get(w);_!==void 0&&rt(Y.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&Pt(w)}function Yt(w){const _=w.texture,L=n.get(w),Y=n.get(_);w.addEventListener("dispose",C);const $=w.textures,q=w.isWebGLCubeRenderTarget===!0,gt=$.length>1;if(gt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),q){L.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer[it]=[];for(let wt=0;wt<_.mipmaps.length;wt++)L.__webglFramebuffer[it][wt]=i.createFramebuffer()}else L.__webglFramebuffer[it]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)L.__webglFramebuffer[it]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(gt)for(let it=0,wt=$.length;it<wt;it++){const Rt=n.get($[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xe(w)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let it=0;it<$.length;it++){const wt=$[it];L.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[it]);const Rt=r.convert(wt.format,wt.colorSpace),K=r.convert(wt.type),tt=E(wt.internalFormat,Rt,K,wt.colorSpace,w.isXRRenderTarget===!0),_t=P(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,tt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,L.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(L.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),ut(i.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)rt(L.__webglFramebuffer[it][wt],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt);else rt(L.__webglFramebuffer[it],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(_)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let it=0,wt=$.length;it<wt;it++){const Rt=$[it],K=n.get(Rt);let tt=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(tt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,K.__webglTexture),ut(tt,Rt),rt(L.__webglFramebuffer,w,Rt,i.COLOR_ATTACHMENT0+it,tt,0),m(Rt)&&f(tt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(it=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),ut(it,_),_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)rt(L.__webglFramebuffer[wt],w,_,i.COLOR_ATTACHMENT0,it,wt);else rt(L.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,it,0);m(_)&&f(it),e.unbindTexture()}w.depthBuffer&&Pt(w)}function Jt(w){const _=w.textures;for(let L=0,Y=_.length;L<Y;L++){const $=_[L];if(m($)){const q=v(w),gt=n.get($).__webglTexture;e.bindTexture(q,gt),f(q),e.unbindTexture()}}}const re=[],zt=[];function me(w){if(w.samples>0){if(xe(w)===!1){const _=w.textures,L=w.width,Y=w.height;let $=i.COLOR_BUFFER_BIT;const q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(w),it=_.length>1;if(it)for(let Rt=0;Rt<_.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const wt=w.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Rt=0;Rt<_.length;Rt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const K=n.get(_[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,L,Y,0,0,L,Y,$,i.NEAREST),l===!0&&(re.length=0,zt.length=0,re.push(i.COLOR_ATTACHMENT0+Rt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(re.push(q),zt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,zt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,re))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let Rt=0;Rt<_.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[Rt]);const K=n.get(_[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,K,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function P(w){return Math.min(s.maxSamples,w.samples)}function xe(w){const _=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Kt(w){const _=a.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function oe(w,_){const L=w.colorSpace,Y=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||L!==Li&&L!==On&&($t.getTransfer(L)===te?(Y!==en||$!==We)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",L)),_}function St(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.setTexture2D=V,this.setTexture2DArray=z,this.setTexture3D=G,this.setTextureCube=Q,this.rebindTextures=Ee,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Wm(i,t){function e(n,s=On){let r;const a=$t.getTransfer(s);if(n===We)return i.UNSIGNED_BYTE;if(n===ka)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Va)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Oc)return i.BYTE;if(n===Bc)return i.SHORT;if(n===os)return i.UNSIGNED_SHORT;if(n===za)return i.INT;if(n===dn)return i.UNSIGNED_INT;if(n===tn)return i.FLOAT;if(n===Tn)return i.HALF_FLOAT;if(n===Vc)return i.ALPHA;if(n===Gc)return i.RGB;if(n===en)return i.RGBA;if(n===An)return i.DEPTH_COMPONENT;if(n===ei)return i.DEPTH_STENCIL;if(n===Ga)return i.RED;if(n===Ha)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===Wa)return i.RG_INTEGER;if(n===Xa)return i.RGBA_INTEGER;if(n===Ws||n===Xs||n===qs||n===Ys)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qr||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra||n===aa||n===oa||n===ca||n===la)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===aa)return r.COMPRESSED_R11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ca)return r.COMPRESSED_RG11_EAC;if(n===la)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va||n===Ma||n===Sa||n===ya||n===Ea)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ha)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ua)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===da)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ma)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ga)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_a)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===va)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ma)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sa)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ea)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===wa||n===Ta)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Aa||n===Ra||n===Ca||n===Pa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Aa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qm=`
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

}`;class Ym{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new el(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new sn({vertexShader:Xm,fragmentShader:qm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new De(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jm extends Oi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const S=typeof XRWebGLBinding<"u",m=new Ym,f={},v=e.getContextAttributes();let E=null,y=null;const A=[],T=[],C=new Lt;let x=null;const b=new He;b.viewport=new pe;const k=new He;k.viewport=new pe;const R=[b,k],N=new ru;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let nt=A[j];return nt===void 0&&(nt=new mr,A[j]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(j){let nt=A[j];return nt===void 0&&(nt=new mr,A[j]=nt),nt.getGripSpace()},this.getHand=function(j){let nt=A[j];return nt===void 0&&(nt=new mr,A[j]=nt),nt.getHandSpace()};function V(j){const nt=T.indexOf(j.inputSource);if(nt===-1)return;const rt=A[nt];rt!==void 0&&(rt.update(j.inputSource,j.frame,c||a),rt.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",G);for(let j=0;j<A.length;j++){const nt=T[j];nt!==null&&(T[j]=null,A[j].disconnect(nt))}O=null,H=null,m.reset();for(const j in f)delete f[j];t.setRenderTarget(E),p=null,h=null,d=null,s=null,y=null,le.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",z),s.addEventListener("inputsourceschange",G),v.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Nt=null,At=null;v.depth&&(At=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=v.stencil?ei:An,Nt=v.stencil?cs:dn);const Pt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Pt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new un(h.textureWidth,h.textureHeight,{format:en,type:We,depthTexture:new hs(h.textureWidth,h.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const rt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new un(p.framebufferWidth,p.framebufferHeight,{format:en,type:We,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(j){for(let nt=0;nt<j.removed.length;nt++){const rt=j.removed[nt],Nt=T.indexOf(rt);Nt>=0&&(T[Nt]=null,A[Nt].disconnect(rt))}for(let nt=0;nt<j.added.length;nt++){const rt=j.added[nt];let Nt=T.indexOf(rt);if(Nt===-1){for(let Pt=0;Pt<A.length;Pt++)if(Pt>=T.length){T.push(rt),Nt=Pt;break}else if(T[Pt]===null){T[Pt]=rt,Nt=Pt;break}if(Nt===-1)break}const At=A[Nt];At&&At.connect(rt)}}const Q=new I,Z=new I;function lt(j,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(rt.matrixWorld);const Nt=Q.distanceTo(Z),At=nt.projectionMatrix.elements,Pt=rt.projectionMatrix.elements,Ee=At[14]/(At[10]-1),Yt=At[14]/(At[10]+1),Jt=(At[9]+1)/At[5],re=(At[9]-1)/At[5],zt=(At[8]-1)/At[0],me=(Pt[8]+1)/Pt[0],P=Ee*zt,xe=Ee*me,Kt=Nt/(-zt+me),oe=Kt*-zt;if(nt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(oe),j.translateZ(Kt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),At[10]===-1)j.projectionMatrix.copy(nt.projectionMatrix),j.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const St=Ee+Kt,w=Yt+Kt,_=P-oe,L=xe+(Nt-oe),Y=Jt*Yt/w*St,$=re*Yt/w*St;j.projectionMatrix.makePerspective(_,L,Y,$,St,w),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function mt(j,nt){nt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(nt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let nt=j.near,rt=j.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),N.near=k.near=b.near=nt,N.far=k.far=b.far=rt,(O!==N.near||H!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),O=N.near,H=N.far),N.layers.mask=j.layers.mask|6,b.layers.mask=N.layers.mask&-5,k.layers.mask=N.layers.mask&-3;const Nt=j.parent,At=N.cameras;mt(N,Nt);for(let Pt=0;Pt<At.length;Pt++)mt(At[Pt],Nt);At.length===2?lt(N,b,k):N.projectionMatrix.copy(b.projectionMatrix),ut(j,N,Nt)};function ut(j,nt,rt){rt===null?j.matrix.copy(nt.matrixWorld):(j.matrix.copy(rt.matrixWorld),j.matrix.invert(),j.matrix.multiply(nt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(nt.projectionMatrix),j.projectionMatrixInverse.copy(nt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ui*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(j){return f[j]};let Ot=null;function de(j,nt){if(u=nt.getViewerPose(c||a),g=nt,u!==null){const rt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Nt=!1;rt.length!==N.cameras.length&&(N.cameras.length=0,Nt=!0);for(let Yt=0;Yt<rt.length;Yt++){const Jt=rt[Yt];let re=null;if(p!==null)re=p.getViewport(Jt);else{const me=d.getViewSubImage(h,Jt);re=me.viewport,Yt===0&&(t.setRenderTargetTextures(y,me.colorTexture,me.depthStencilTexture),t.setRenderTarget(y))}let zt=R[Yt];zt===void 0&&(zt=new He,zt.layers.enable(Yt),zt.viewport=new pe,R[Yt]=zt),zt.matrix.fromArray(Jt.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(Jt.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(re.x,re.y,re.width,re.height),Yt===0&&(N.matrix.copy(zt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Nt===!0&&N.cameras.push(zt)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=n.getBinding();const Yt=d.getDepthInformation(rt[0]);Yt&&Yt.isValid&&Yt.texture&&m.init(Yt,s.renderState)}if(At&&At.includes("camera-access")&&S){t.state.unbindTexture(),d=n.getBinding();for(let Yt=0;Yt<rt.length;Yt++){const Jt=rt[Yt].camera;if(Jt){let re=f[Jt];re||(re=new el,f[Jt]=re);const zt=d.getCameraImage(Jt);re.sourceTexture=zt}}}}for(let rt=0;rt<A.length;rt++){const Nt=T[rt],At=A[rt];Nt!==null&&At!==void 0&&At.update(Nt,nt,c||a)}Ot&&Ot(j,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const le=new rl;le.setAnimationLoop(de),this.setAnimationLoop=function(j){Ot=j},this.dispose=function(){}}}const $n=new qe,$m=new se;function Zm(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,v,E,y){f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),S(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Be&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Be&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=t.get(f),E=v.envMap,y=v.envMapRotation;E&&(m.envMap.value=E,$n.copy(y),$n.x*=-1,$n.y*=-1,$n.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),m.envMapRotation.value.setFromMatrix4($m.makeRotationFromEuler($n)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=E*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Be&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){const v=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Km(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){const y=E.program;n.uniformBlockBinding(v,y)}function c(v,E){let y=s[v.id];y===void 0&&(g(v),y=u(v),s[v.id]=y,v.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(v,A);const T=t.render.frame;r[v.id]!==T&&(h(v),r[v.id]=T)}function u(v){const E=d();v.__bindingPointIndex=E;const y=i.createBuffer(),A=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,y),y}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const E=s[v.id],y=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,C=y.length;T<C;T++){const x=Array.isArray(y[T])?y[T]:[y[T]];for(let b=0,k=x.length;b<k;b++){const R=x[b];if(p(R,T,b,A)===!0){const N=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let V=0;V<O.length;V++){const z=O[V],G=S(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,N+H,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,H),H+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,E,y,A){const T=v.value,C=E+"_"+y;if(A[C]===void 0)return typeof T=="number"||typeof T=="boolean"?A[C]=T:A[C]=T.clone(),!0;{const x=A[C];if(typeof T=="number"||typeof T=="boolean"){if(x!==T)return A[C]=T,!0}else if(x.equals(T)===!1)return x.copy(T),!0}return!1}function g(v){const E=v.uniforms;let y=0;const A=16;for(let C=0,x=E.length;C<x;C++){const b=Array.isArray(E[C])?E[C]:[E[C]];for(let k=0,R=b.length;k<R;k++){const N=b[k],O=Array.isArray(N.value)?N.value:[N.value];for(let H=0,V=O.length;H<V;H++){const z=O[H],G=S(z),Q=y%A,Z=Q%G.boundary,lt=Q+Z;y+=Z,lt!==0&&A-lt<G.storage&&(y+=A-lt),N.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=G.storage}}}const T=y%A;return T>0&&(y+=A-T),v.__size=y,v.__cache={},this}function S(v){const E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):It("WebGLRenderer: Unsupported uniform value type.",v),E}function m(v){const E=v.target;E.removeEventListener("dispose",m);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}const Jm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let on=null;function Qm(){return on===null&&(on=new Jc(Jm,16,16,Di,Tn),on.name="DFG_LUT",on.minFilter=Le,on.magFilter=Le,on.wrapS=yn,on.wrapT=yn,on.generateMipmaps=!1,on.needsUpdate=!0),on}class t0{constructor(t={}){const{canvas:e=eh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=We}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const S=p,m=new Set([Xa,Wa,Ha]),f=new Set([We,dn,os,cs,ka,Va]),v=new Uint32Array(4),E=new Int32Array(4);let y=null,A=null;const T=[],C=[];let x=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let k=!1;this._outputColorSpace=Me;let R=0,N=0,O=null,H=-1,V=null;const z=new pe,G=new pe;let Q=null;const Z=new Ct(0);let lt=0,mt=e.width,ut=e.height,Ot=1,de=null,le=null;const j=new pe(0,0,mt,ut),nt=new pe(0,0,mt,ut);let rt=!1;const Nt=new Ka;let At=!1,Pt=!1;const Ee=new se,Yt=new I,Jt=new pe,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function me(){return O===null?Ot:1}let P=n;function xe(M,U){return e.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oa}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",Dt,!1),e.addEventListener("webglcontextcreationerror",ce,!1),P===null){const U="webgl2";if(P=xe(U,M),P===null)throw xe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw jt("WebGLRenderer: "+M.message),M}let Kt,oe,St,w,_,L,Y,$,q,gt,it,wt,Rt,K,tt,_t,vt,ht,kt,D,st,et,ft;function J(){Kt=new tp(P),Kt.init(),st=new Wm(P,Kt),oe=new qf(P,Kt,t,st),St=new Gm(P,Kt),oe.reversedDepthBuffer&&h&&St.buffers.depth.setReversed(!0),w=new ip(P),_=new Rm,L=new Hm(P,Kt,St,_,oe,st,w),Y=new Qf(b),$=new ou(P),et=new Wf(P,$),q=new ep(P,$,w,et),gt=new rp(P,q,$,et,w),ht=new sp(P,oe,L),tt=new Yf(_),it=new Am(b,Y,Kt,oe,et,tt),wt=new Zm(b,_),Rt=new Pm,K=new Fm(Kt),vt=new Hf(b,Y,St,gt,g,l),_t=new Vm(b,gt,oe),ft=new Km(P,w,oe,St),kt=new Xf(P,Kt,w),D=new np(P,Kt,w),w.programs=it.programs,b.capabilities=oe,b.extensions=Kt,b.properties=_,b.renderLists=Rt,b.shadowMap=_t,b.state=St,b.info=w}J(),S!==We&&(x=new op(S,e.width,e.height,s,r));const X=new jm(b,P);this.xr=X,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=Kt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Kt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ot},this.setPixelRatio=function(M){M!==void 0&&(Ot=M,this.setSize(mt,ut,!1))},this.getSize=function(M){return M.set(mt,ut)},this.setSize=function(M,U,W=!0){if(X.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}mt=M,ut=U,e.width=Math.floor(M*Ot),e.height=Math.floor(U*Ot),W===!0&&(e.style.width=M+"px",e.style.height=U+"px"),x!==null&&x.setSize(e.width,e.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(mt*Ot,ut*Ot).floor()},this.setDrawingBufferSize=function(M,U,W){mt=M,ut=U,Ot=W,e.width=Math.floor(M*W),e.height=Math.floor(U*W),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(S===We){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,U,W,B){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,U,W,B),St.viewport(z.copy(j).multiplyScalar(Ot).round())},this.getScissor=function(M){return M.copy(nt)},this.setScissor=function(M,U,W,B){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,U,W,B),St.scissor(G.copy(nt).multiplyScalar(Ot).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){St.setScissorTest(rt=M)},this.setOpaqueSort=function(M){de=M},this.setTransparentSort=function(M){le=M},this.getClearColor=function(M){return M.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,W=!0){let B=0;if(M){let F=!1;if(O!==null){const ot=O.texture.format;F=m.has(ot)}if(F){const ot=O.texture.type,dt=f.has(ot),ct=vt.getClearColor(),Mt=vt.getClearAlpha(),Et=ct.r,Ut=ct.g,Vt=ct.b;dt?(v[0]=Et,v[1]=Ut,v[2]=Vt,v[3]=Mt,P.clearBufferuiv(P.COLOR,0,v)):(E[0]=Et,E[1]=Ut,E[2]=Vt,E[3]=Mt,P.clearBufferiv(P.COLOR,0,E))}else B|=P.COLOR_BUFFER_BIT}U&&(B|=P.DEPTH_BUFFER_BIT),W&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",Dt,!1),e.removeEventListener("webglcontextcreationerror",ce,!1),vt.dispose(),Rt.dispose(),K.dispose(),_.dispose(),Y.dispose(),gt.dispose(),et.dispose(),ft.dispose(),it.dispose(),X.dispose(),X.removeEventListener("sessionstart",ro),X.removeEventListener("sessionend",ao),Gn.stop()};function xt(M){M.preventDefault(),Js("WebGLRenderer: Context Lost."),k=!0}function Dt(){Js("WebGLRenderer: Context Restored."),k=!1;const M=w.autoReset,U=_t.enabled,W=_t.autoUpdate,B=_t.needsUpdate,F=_t.type;J(),w.autoReset=M,_t.enabled=U,_t.autoUpdate=W,_t.needsUpdate=B,_t.type=F}function ce(M){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Qt(M){const U=M.target;U.removeEventListener("dispose",Qt),fn(U)}function fn(M){pn(M),_.remove(M)}function pn(M){const U=_.get(M).programs;U!==void 0&&(U.forEach(function(W){it.releaseProgram(W)}),M.isShaderMaterial&&it.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,W,B,F,ot){U===null&&(U=re);const dt=F.isMesh&&F.matrixWorld.determinant()<0,ct=fl(M,U,W,B,F);St.setMaterial(B,dt);let Mt=W.index,Et=1;if(B.wireframe===!0){if(Mt=q.getWireframeAttribute(W),Mt===void 0)return;Et=2}const Ut=W.drawRange,Vt=W.attributes.position;let bt=Ut.start*Et,ne=(Ut.start+Ut.count)*Et;ot!==null&&(bt=Math.max(bt,ot.start*Et),ne=Math.min(ne,(ot.start+ot.count)*Et)),Mt!==null?(bt=Math.max(bt,0),ne=Math.min(ne,Mt.count)):Vt!=null&&(bt=Math.max(bt,0),ne=Math.min(ne,Vt.count));const ge=ne-bt;if(ge<0||ge===1/0)return;et.setup(F,B,ct,W,Mt);let fe,ie=kt;if(Mt!==null&&(fe=$.get(Mt),ie=D,ie.setIndex(fe)),F.isMesh)B.wireframe===!0?(St.setLineWidth(B.wireframeLinewidth*me()),ie.setMode(P.LINES)):ie.setMode(P.TRIANGLES);else if(F.isLine){let Ce=B.linewidth;Ce===void 0&&(Ce=1),St.setLineWidth(Ce*me()),F.isLineSegments?ie.setMode(P.LINES):F.isLineLoop?ie.setMode(P.LINE_LOOP):ie.setMode(P.LINE_STRIP)}else F.isPoints?ie.setMode(P.POINTS):F.isSprite&&ie.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ie.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Kt.get("WEBGL_multi_draw"))ie.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ce=F._multiDrawStarts,yt=F._multiDrawCounts,ze=F._multiDrawCount,Zt=Mt?$.get(Mt).bytesPerElement:1,$e=_.get(B).currentProgram.getUniforms();for(let rn=0;rn<ze;rn++)$e.setValue(P,"_gl_DrawID",rn),ie.render(Ce[rn]/Zt,yt[rn])}else if(F.isInstancedMesh)ie.renderInstances(bt,ge,F.count);else if(W.isInstancedBufferGeometry){const Ce=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,yt=Math.min(W.instanceCount,Ce);ie.renderInstances(bt,ge,yt)}else ie.render(bt,ge)};function so(M,U,W){M.transparent===!0&&M.side===Oe&&M.forceSinglePass===!1?(M.side=Be,M.needsUpdate=!0,ds(M,U,W),M.side=Vn,M.needsUpdate=!0,ds(M,U,W),M.side=Oe):ds(M,U,W)}this.compile=function(M,U,W=null){W===null&&(W=M),A=K.get(W),A.init(U),C.push(A),W.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(A.pushLight(F),F.castShadow&&A.pushShadow(F))}),M!==W&&M.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(A.pushLight(F),F.castShadow&&A.pushShadow(F))}),A.setupLights();const B=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ot=F.material;if(ot)if(Array.isArray(ot))for(let dt=0;dt<ot.length;dt++){const ct=ot[dt];so(ct,W,F),B.add(ct)}else so(ot,W,F),B.add(ot)}),A=C.pop(),B},this.compileAsync=function(M,U,W=null){const B=this.compile(M,U,W);return new Promise(F=>{function ot(){if(B.forEach(function(dt){_.get(dt).currentProgram.isReady()&&B.delete(dt)}),B.size===0){F(M);return}setTimeout(ot,10)}Kt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let rr=null;function dl(M){rr&&rr(M)}function ro(){Gn.stop()}function ao(){Gn.start()}const Gn=new rl;Gn.setAnimationLoop(dl),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(M){rr=M,X.setAnimationLoop(M),M===null?Gn.stop():Gn.start()},X.addEventListener("sessionstart",ro),X.addEventListener("sessionend",ao),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;const W=X.enabled===!0&&X.isPresenting===!0,B=x!==null&&(O===null||W)&&x.begin(b,O);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),M.isScene===!0&&M.onBeforeRender(b,M,U,O),A=K.get(M,C.length),A.init(U),C.push(A),Ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Nt.setFromProjectionMatrix(Ee,ln,U.reversedDepth),Pt=this.localClippingEnabled,At=tt.init(this.clippingPlanes,Pt),y=Rt.get(M,T.length),y.init(),T.push(y),X.enabled===!0&&X.isPresenting===!0){const dt=b.xr.getDepthSensingMesh();dt!==null&&ar(dt,U,-1/0,b.sortObjects)}ar(M,U,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(de,le),zt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,zt&&vt.addToRenderList(y,M),this.info.render.frame++,At===!0&&tt.beginShadows();const F=A.state.shadowsArray;if(_t.render(F,M,U),At===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B&&x.hasRenderPass())===!1){const dt=y.opaque,ct=y.transmissive;if(A.setupLights(),U.isArrayCamera){const Mt=U.cameras;if(ct.length>0)for(let Et=0,Ut=Mt.length;Et<Ut;Et++){const Vt=Mt[Et];co(dt,ct,M,Vt)}zt&&vt.render(M);for(let Et=0,Ut=Mt.length;Et<Ut;Et++){const Vt=Mt[Et];oo(y,M,Vt,Vt.viewport)}}else ct.length>0&&co(dt,ct,M,U),zt&&vt.render(M),oo(y,M,U)}O!==null&&N===0&&(L.updateMultisampleRenderTarget(O),L.updateRenderTargetMipmap(O)),B&&x.end(b),M.isScene===!0&&M.onAfterRender(b,M,U),et.resetDefaultState(),H=-1,V=null,C.pop(),C.length>0?(A=C[C.length-1],At===!0&&tt.setGlobalState(b.clippingPlanes,A.state.camera)):A=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function ar(M,U,W,B){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Nt.intersectsSprite(M)){B&&Jt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ee);const dt=gt.update(M),ct=M.material;ct.visible&&y.push(M,dt,ct,W,Jt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Nt.intersectsObject(M))){const dt=gt.update(M),ct=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Jt.copy(M.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Jt.copy(dt.boundingSphere.center)),Jt.applyMatrix4(M.matrixWorld).applyMatrix4(Ee)),Array.isArray(ct)){const Mt=dt.groups;for(let Et=0,Ut=Mt.length;Et<Ut;Et++){const Vt=Mt[Et],bt=ct[Vt.materialIndex];bt&&bt.visible&&y.push(M,dt,bt,W,Jt.z,Vt)}}else ct.visible&&y.push(M,dt,ct,W,Jt.z,null)}}const ot=M.children;for(let dt=0,ct=ot.length;dt<ct;dt++)ar(ot[dt],U,W,B)}function oo(M,U,W,B){const{opaque:F,transmissive:ot,transparent:dt}=M;A.setupLightsView(W),At===!0&&tt.setGlobalState(b.clippingPlanes,W),B&&St.viewport(z.copy(B)),F.length>0&&us(F,U,W),ot.length>0&&us(ot,U,W),dt.length>0&&us(dt,U,W),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function co(M,U,W,B){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[B.id]===void 0){const bt=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[B.id]=new un(1,1,{generateMipmaps:!0,type:bt?Tn:We,minFilter:Bn,samples:Math.max(4,oe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}const ot=A.state.transmissionRenderTarget[B.id],dt=B.viewport||z;ot.setSize(dt.z*b.transmissionResolutionScale,dt.w*b.transmissionResolutionScale);const ct=b.getRenderTarget(),Mt=b.getActiveCubeFace(),Et=b.getActiveMipmapLevel();b.setRenderTarget(ot),b.getClearColor(Z),lt=b.getClearAlpha(),lt<1&&b.setClearColor(16777215,.5),b.clear(),zt&&vt.render(W);const Ut=b.toneMapping;b.toneMapping=hn;const Vt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),A.setupLightsView(B),At===!0&&tt.setGlobalState(b.clippingPlanes,B),us(M,W,B),L.updateMultisampleRenderTarget(ot),L.updateRenderTargetMipmap(ot),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let ne=0,ge=U.length;ne<ge;ne++){const fe=U[ne],{object:ie,geometry:Ce,material:yt,group:ze}=fe;if(yt.side===Oe&&ie.layers.test(B.layers)){const Zt=yt.side;yt.side=Be,yt.needsUpdate=!0,lo(ie,W,B,Ce,yt,ze),yt.side=Zt,yt.needsUpdate=!0,bt=!0}}bt===!0&&(L.updateMultisampleRenderTarget(ot),L.updateRenderTargetMipmap(ot))}b.setRenderTarget(ct,Mt,Et),b.setClearColor(Z,lt),Vt!==void 0&&(B.viewport=Vt),b.toneMapping=Ut}function us(M,U,W){const B=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ot=M.length;F<ot;F++){const dt=M[F],{object:ct,geometry:Mt,group:Et}=dt;let Ut=dt.material;Ut.allowOverride===!0&&B!==null&&(Ut=B),ct.layers.test(W.layers)&&lo(ct,U,W,Mt,Ut,Et)}}function lo(M,U,W,B,F,ot){M.onBeforeRender(b,U,W,B,F,ot),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(b,U,W,B,M,ot),F.transparent===!0&&F.side===Oe&&F.forceSinglePass===!1?(F.side=Be,F.needsUpdate=!0,b.renderBufferDirect(W,U,B,F,M,ot),F.side=Vn,F.needsUpdate=!0,b.renderBufferDirect(W,U,B,F,M,ot),F.side=Oe):b.renderBufferDirect(W,U,B,F,M,ot),M.onAfterRender(b,U,W,B,F,ot)}function ds(M,U,W){U.isScene!==!0&&(U=re);const B=_.get(M),F=A.state.lights,ot=A.state.shadowsArray,dt=F.state.version,ct=it.getParameters(M,F.state,ot,U,W),Mt=it.getProgramCacheKey(ct);let Et=B.programs;B.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,B.fog=U.fog;const Ut=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;B.envMap=Y.get(M.envMap||B.environment,Ut),B.envMapRotation=B.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Et===void 0&&(M.addEventListener("dispose",Qt),Et=new Map,B.programs=Et);let Vt=Et.get(Mt);if(Vt!==void 0){if(B.currentProgram===Vt&&B.lightsStateVersion===dt)return uo(M,ct),Vt}else ct.uniforms=it.getUniforms(M),M.onBeforeCompile(ct,b),Vt=it.acquireProgram(ct,Mt),Et.set(Mt,Vt),B.uniforms=ct.uniforms;const bt=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(bt.clippingPlanes=tt.uniform),uo(M,ct),B.needsLights=ml(M),B.lightsStateVersion=dt,B.needsLights&&(bt.ambientLightColor.value=F.state.ambient,bt.lightProbe.value=F.state.probe,bt.directionalLights.value=F.state.directional,bt.directionalLightShadows.value=F.state.directionalShadow,bt.spotLights.value=F.state.spot,bt.spotLightShadows.value=F.state.spotShadow,bt.rectAreaLights.value=F.state.rectArea,bt.ltc_1.value=F.state.rectAreaLTC1,bt.ltc_2.value=F.state.rectAreaLTC2,bt.pointLights.value=F.state.point,bt.pointLightShadows.value=F.state.pointShadow,bt.hemisphereLights.value=F.state.hemi,bt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,bt.spotLightMatrix.value=F.state.spotLightMatrix,bt.spotLightMap.value=F.state.spotLightMap,bt.pointShadowMatrix.value=F.state.pointShadowMatrix),B.currentProgram=Vt,B.uniformsList=null,Vt}function ho(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=$s.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function uo(M,U){const W=_.get(M);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function fl(M,U,W,B,F){U.isScene!==!0&&(U=re),L.resetTextureUnits();const ot=U.fog,dt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?U.environment:null,ct=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Li,Mt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Et=Y.get(B.envMap||dt,Mt),Ut=B.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),bt=!!W.morphAttributes.position,ne=!!W.morphAttributes.normal,ge=!!W.morphAttributes.color;let fe=hn;B.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(fe=b.toneMapping);const ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ce=ie!==void 0?ie.length:0,yt=_.get(B),ze=A.state.lights;if(At===!0&&(Pt===!0||M!==V)){const be=M===V&&B.id===H;tt.setState(B,M,be)}let Zt=!1;B.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==ze.state.version||yt.outputColorSpace!==ct||F.isBatchedMesh&&yt.batching===!1||!F.isBatchedMesh&&yt.batching===!0||F.isBatchedMesh&&yt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&yt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&yt.instancing===!1||!F.isInstancedMesh&&yt.instancing===!0||F.isSkinnedMesh&&yt.skinning===!1||!F.isSkinnedMesh&&yt.skinning===!0||F.isInstancedMesh&&yt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&yt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&yt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&yt.instancingMorph===!1&&F.morphTexture!==null||yt.envMap!==Et||B.fog===!0&&yt.fog!==ot||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==tt.numPlanes||yt.numIntersection!==tt.numIntersection)||yt.vertexAlphas!==Ut||yt.vertexTangents!==Vt||yt.morphTargets!==bt||yt.morphNormals!==ne||yt.morphColors!==ge||yt.toneMapping!==fe||yt.morphTargetsCount!==Ce)&&(Zt=!0):(Zt=!0,yt.__version=B.version);let $e=yt.currentProgram;Zt===!0&&($e=ds(B,U,F));let rn=!1,Hn=!1,oi=!1;const ae=$e.getUniforms(),Re=yt.uniforms;if(St.useProgram($e.program)&&(rn=!0,Hn=!0,oi=!0),B.id!==H&&(H=B.id,Hn=!0),rn||V!==M){St.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ae.setValue(P,"projectionMatrix",M.projectionMatrix),ae.setValue(P,"viewMatrix",M.matrixWorldInverse);const Cn=ae.map.cameraPosition;Cn!==void 0&&Cn.setValue(P,Yt.setFromMatrixPosition(M.matrixWorld)),oe.logarithmicDepthBuffer&&ae.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ae.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,Hn=!0,oi=!0)}if(yt.needsLights&&(ze.state.directionalShadowMap.length>0&&ae.setValue(P,"directionalShadowMap",ze.state.directionalShadowMap,L),ze.state.spotShadowMap.length>0&&ae.setValue(P,"spotShadowMap",ze.state.spotShadowMap,L),ze.state.pointShadowMap.length>0&&ae.setValue(P,"pointShadowMap",ze.state.pointShadowMap,L)),F.isSkinnedMesh){ae.setOptional(P,F,"bindMatrix"),ae.setOptional(P,F,"bindMatrixInverse");const be=F.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),ae.setValue(P,"boneTexture",be.boneTexture,L))}F.isBatchedMesh&&(ae.setOptional(P,F,"batchingTexture"),ae.setValue(P,"batchingTexture",F._matricesTexture,L),ae.setOptional(P,F,"batchingIdTexture"),ae.setValue(P,"batchingIdTexture",F._indirectTexture,L),ae.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&ae.setValue(P,"batchingColorTexture",F._colorsTexture,L));const Rn=W.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&ht.update(F,W,$e),(Hn||yt.receiveShadow!==F.receiveShadow)&&(yt.receiveShadow=F.receiveShadow,ae.setValue(P,"receiveShadow",F.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&U.environment!==null&&(Re.envMapIntensity.value=U.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=Qm()),Hn&&(ae.setValue(P,"toneMappingExposure",b.toneMappingExposure),yt.needsLights&&pl(Re,oi),ot&&B.fog===!0&&wt.refreshFogUniforms(Re,ot),wt.refreshMaterialUniforms(Re,B,Ot,ut,A.state.transmissionRenderTarget[M.id]),$s.upload(P,ho(yt),Re,L)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&($s.upload(P,ho(yt),Re,L),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ae.setValue(P,"center",F.center),ae.setValue(P,"modelViewMatrix",F.modelViewMatrix),ae.setValue(P,"normalMatrix",F.normalMatrix),ae.setValue(P,"modelMatrix",F.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const be=B.uniformsGroups;for(let Cn=0,ci=be.length;Cn<ci;Cn++){const fo=be[Cn];ft.update(fo,$e),ft.bind(fo,$e)}}return $e}function pl(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function ml(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(M,U,W){const B=_.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_.get(M.texture).__webglTexture=U,_.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:W,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const W=_.get(M);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0};const gl=P.createFramebuffer();this.setRenderTarget=function(M,U=0,W=0){O=M,R=U,N=W;let B=null,F=!1,ot=!1;if(M){const ct=_.get(M);if(ct.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(P.FRAMEBUFFER,ct.__webglFramebuffer),z.copy(M.viewport),G.copy(M.scissor),Q=M.scissorTest,St.viewport(z),St.scissor(G),St.setScissorTest(Q),H=-1;return}else if(ct.__webglFramebuffer===void 0)L.setupRenderTarget(M);else if(ct.__hasExternalTextures)L.rebindTextures(M,_.get(M.texture).__webglTexture,_.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ut=M.depthTexture;if(ct.__boundDepthTexture!==Ut){if(Ut!==null&&_.has(Ut)&&(M.width!==Ut.image.width||M.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(M)}}const Mt=M.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(ot=!0);const Et=_.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Et[U])?B=Et[U][W]:B=Et[U],F=!0):M.samples>0&&L.useMultisampledRTT(M)===!1?B=_.get(M).__webglMultisampledFramebuffer:Array.isArray(Et)?B=Et[W]:B=Et,z.copy(M.viewport),G.copy(M.scissor),Q=M.scissorTest}else z.copy(j).multiplyScalar(Ot).floor(),G.copy(nt).multiplyScalar(Ot).floor(),Q=rt;if(W!==0&&(B=gl),St.bindFramebuffer(P.FRAMEBUFFER,B)&&St.drawBuffers(M,B),St.viewport(z),St.scissor(G),St.setScissorTest(Q),F){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,ct.__webglTexture,W)}else if(ot){const ct=U;for(let Mt=0;Mt<M.textures.length;Mt++){const Et=_.get(M.textures[Mt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Mt,Et.__webglTexture,W,ct)}}else if(M!==null&&W!==0){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ct.__webglTexture,W)}H=-1},this.readRenderTargetPixels=function(M,U,W,B,F,ot,dt,ct=0){if(!(M&&M.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&dt!==void 0&&(Mt=Mt[dt]),Mt){St.bindFramebuffer(P.FRAMEBUFFER,Mt);try{const Et=M.textures[ct],Ut=Et.format,Vt=Et.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!oe.textureFormatReadable(Ut)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(Vt)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-B&&W>=0&&W<=M.height-F&&P.readPixels(U,W,B,F,st.convert(Ut),st.convert(Vt),ot)}finally{const Et=O!==null?_.get(O).__webglFramebuffer:null;St.bindFramebuffer(P.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(M,U,W,B,F,ot,dt,ct=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&dt!==void 0&&(Mt=Mt[dt]),Mt)if(U>=0&&U<=M.width-B&&W>=0&&W<=M.height-F){St.bindFramebuffer(P.FRAMEBUFFER,Mt);const Et=M.textures[ct],Ut=Et.format,Vt=Et.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!oe.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const bt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,bt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(U,W,B,F,st.convert(Ut),st.convert(Vt),0);const ne=O!==null?_.get(O).__webglFramebuffer:null;St.bindFramebuffer(P.FRAMEBUFFER,ne);const ge=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await nh(P,ge,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,bt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(bt),P.deleteSync(ge),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,W=0){const B=Math.pow(2,-W),F=Math.floor(M.image.width*B),ot=Math.floor(M.image.height*B),dt=U!==null?U.x:0,ct=U!==null?U.y:0;L.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,dt,ct,F,ot),St.unbindTexture()};const _l=P.createFramebuffer(),xl=P.createFramebuffer();this.copyTextureToTexture=function(M,U,W=null,B=null,F=0,ot=0){let dt,ct,Mt,Et,Ut,Vt,bt,ne,ge;const fe=M.isCompressedTexture?M.mipmaps[ot]:M.image;if(W!==null)dt=W.max.x-W.min.x,ct=W.max.y-W.min.y,Mt=W.isBox3?W.max.z-W.min.z:1,Et=W.min.x,Ut=W.min.y,Vt=W.isBox3?W.min.z:0;else{const Re=Math.pow(2,-F);dt=Math.floor(fe.width*Re),ct=Math.floor(fe.height*Re),M.isDataArrayTexture?Mt=fe.depth:M.isData3DTexture?Mt=Math.floor(fe.depth*Re):Mt=1,Et=0,Ut=0,Vt=0}B!==null?(bt=B.x,ne=B.y,ge=B.z):(bt=0,ne=0,ge=0);const ie=st.convert(U.format),Ce=st.convert(U.type);let yt;U.isData3DTexture?(L.setTexture3D(U,0),yt=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(L.setTexture2DArray(U,0),yt=P.TEXTURE_2D_ARRAY):(L.setTexture2D(U,0),yt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const ze=P.getParameter(P.UNPACK_ROW_LENGTH),Zt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),$e=P.getParameter(P.UNPACK_SKIP_PIXELS),rn=P.getParameter(P.UNPACK_SKIP_ROWS),Hn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Et),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ut),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Vt);const oi=M.isDataArrayTexture||M.isData3DTexture,ae=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Re=_.get(M),Rn=_.get(U),be=_.get(Re.__renderTarget),Cn=_.get(Rn.__renderTarget);St.bindFramebuffer(P.READ_FRAMEBUFFER,be.__webglFramebuffer),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,Cn.__webglFramebuffer);for(let ci=0;ci<Mt;ci++)oi&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(M).__webglTexture,F,Vt+ci),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(U).__webglTexture,ot,ge+ci)),P.blitFramebuffer(Et,Ut,dt,ct,bt,ne,dt,ct,P.DEPTH_BUFFER_BIT,P.NEAREST);St.bindFramebuffer(P.READ_FRAMEBUFFER,null),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||_.has(M)){const Re=_.get(M),Rn=_.get(U);St.bindFramebuffer(P.READ_FRAMEBUFFER,_l),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,xl);for(let be=0;be<Mt;be++)oi?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Re.__webglTexture,F,Vt+be):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Re.__webglTexture,F),ae?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rn.__webglTexture,ot,ge+be):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Rn.__webglTexture,ot),F!==0?P.blitFramebuffer(Et,Ut,dt,ct,bt,ne,dt,ct,P.COLOR_BUFFER_BIT,P.NEAREST):ae?P.copyTexSubImage3D(yt,ot,bt,ne,ge+be,Et,Ut,dt,ct):P.copyTexSubImage2D(yt,ot,bt,ne,Et,Ut,dt,ct);St.bindFramebuffer(P.READ_FRAMEBUFFER,null),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ae?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(yt,ot,bt,ne,ge,dt,ct,Mt,ie,Ce,fe.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(yt,ot,bt,ne,ge,dt,ct,Mt,ie,fe.data):P.texSubImage3D(yt,ot,bt,ne,ge,dt,ct,Mt,ie,Ce,fe):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ot,bt,ne,dt,ct,ie,Ce,fe.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ot,bt,ne,fe.width,fe.height,ie,fe.data):P.texSubImage2D(P.TEXTURE_2D,ot,bt,ne,dt,ct,ie,Ce,fe);P.pixelStorei(P.UNPACK_ROW_LENGTH,ze),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Zt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,$e),P.pixelStorei(P.UNPACK_SKIP_ROWS,rn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Hn),ot===0&&U.generateMipmaps&&P.generateMipmap(yt),St.unbindTexture()},this.initRenderTarget=function(M){_.get(M).__webglFramebuffer===void 0&&L.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?L.setTextureCube(M,0):M.isData3DTexture?L.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?L.setTexture2DArray(M,0):L.setTexture2D(M,0),St.unbindTexture()},this.resetState=function(){R=0,N=0,O=null,St.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class e0{constructor(){this.items=[],this.elapsed=0,this.delta=0,this.last=performance.now()}add(t,e,n){this.items.push({name:t,priority:e,fn:n}),this.items.sort((s,r)=>s.priority-r.priority)}tick(t=performance.now()){const e=(t-this.last)/1e3;this.last=t,this.delta=Math.min(e,.05),this.elapsed+=this.delta;for(const n of this.items)n.fn(this.delta,this.elapsed)}}const Mc={KeyW:"forward",ArrowUp:"forward",KeyS:"backward",ArrowDown:"backward",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",ShiftLeft:"boost",ShiftRight:"boost",ControlLeft:"brake",ControlRight:"brake",KeyB:"brake",Space:"jump",KeyE:"interact",Enter:"interact",KeyR:"respawn",KeyM:"map",Escape:"menu",KeyH:"honk",KeyP:"potato"};class n0{constructor(t){this.canvas=t,this.actions={forward:!1,backward:!1,left:!1,right:!1,boost:!1,brake:!1,jump:!1,interact:!1,respawn:!1,map:!1,menu:!1,honk:!1,potato:!1},this.pressed=new Set,this.pointer={dragging:!1,lastX:0,lastY:0,orbitX:0,orbitY:0,zoom:1},this.joystick={x:0,y:0},this.mode="keyboard",this.enabled=!0,this.setupKeyboard(),this.setupPointer(),this.setupTouch()}setupKeyboard(){window.addEventListener("keydown",t=>{const e=Mc[t.code];e&&(t.preventDefault(),this.actions[e]||this.pressed.add(e),this.actions[e]=!0,this.mode="keyboard")}),window.addEventListener("keyup",t=>{const e=Mc[t.code];e&&(t.preventDefault(),this.actions[e]=!1)})}setupPointer(){this.canvas.addEventListener("pointerdown",e=>{this.pointer.dragging=!0,this.pointer.lastX=e.clientX,this.pointer.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId)}),this.canvas.addEventListener("pointermove",e=>{if(!this.pointer.dragging)return;const n=e.clientX-this.pointer.lastX,s=e.clientY-this.pointer.lastY;this.pointer.lastX=e.clientX,this.pointer.lastY=e.clientY,this.pointer.orbitX+=n*.006,this.pointer.orbitY=Math.max(-.52,Math.min(.42,this.pointer.orbitY+s*.004)),this.mode=e.pointerType==="touch"?"touch":"pointer"});const t=e=>{this.pointer.dragging=!1,this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId)};this.canvas.addEventListener("pointerup",t),this.canvas.addEventListener("pointercancel",t),window.addEventListener("wheel",e=>{this.pointer.zoom=Math.max(.7,Math.min(1.55,this.pointer.zoom+Math.sign(e.deltaY)*.08))},{passive:!0})}setupTouch(){const t=document.getElementById("touch-stick"),e=document.getElementById("touch-knob"),n=document.getElementById("touch-boost"),s=document.getElementById("touch-jump"),r=document.getElementById("touch-action");if(!t||!e||!n||!s||!r)return;let a=null,o={x:0,y:0};const l=(d,h)=>{const p=d-o.x,g=h-o.y,S=54,m=Math.max(1,Math.hypot(p,g)),f=Math.min(1,S/m),v=p*f,E=g*f;this.joystick.x=v/S,this.joystick.y=E/S,e.style.transform=`translate(calc(-50% + ${v}px), calc(-50% + ${E}px))`,this.mode="touch"};t.addEventListener("pointerdown",d=>{d.preventDefault(),a=d.pointerId,t.setPointerCapture(a);const h=t.getBoundingClientRect();o={x:h.left+h.width/2,y:h.top+h.height/2},l(d.clientX,d.clientY)}),t.addEventListener("pointermove",d=>{d.pointerId===a&&(d.preventDefault(),l(d.clientX,d.clientY))});const c=d=>{d.pointerId===a&&(a=null,this.joystick.x=0,this.joystick.y=0,e.style.transform="translate(-50%, -50%)")};t.addEventListener("pointerup",c),t.addEventListener("pointercancel",c);const u=(d,h)=>{d.addEventListener("pointerdown",g=>{g.preventDefault(),this.actions[h]=!0,this.pressed.add(h),this.mode="touch"});const p=()=>{this.actions[h]=!1};d.addEventListener("pointerup",p),d.addEventListener("pointercancel",p),d.addEventListener("pointerleave",p)};u(n,"boost"),u(s,"jump"),r.addEventListener("click",()=>{this.pressed.add("interact"),this.actions.interact=!0,requestAnimationFrame(()=>{this.actions.interact=!1})})}updateGamepad(){const t=navigator.getGamepads?.()[0];if(!t)return;const e=Math.abs(t.axes[0])>.15?t.axes[0]:0,n=Math.abs(t.axes[1])>.15?t.axes[1]:0;this.joystick.x=e,this.joystick.y=n,this.actions.forward=n<-.25||t.buttons[7]?.pressed,this.actions.backward=n>.25||t.buttons[6]?.pressed,this.actions.left=e<-.25,this.actions.right=e>.25,this.actions.boost=!!t.buttons[1]?.pressed,this.actions.jump=!!t.buttons[3]?.pressed,this.actions.brake=!!t.buttons[2]?.pressed,t.buttons[0]?.pressed&&this.pressed.add("interact"),t.buttons[9]?.pressed&&this.pressed.add("menu"),t.buttons[8]?.pressed&&this.pressed.add("respawn"),t.buttons[4]?.pressed&&this.pressed.add("potato"),this.mode="gamepad"}update(){this.updateGamepad()}consume(t){const e=this.pressed.has(t);return this.pressed.delete(t),e}clearTransient(){this.pressed.clear()}}class i0{constructor(){this.context=null,this.master=null,this.engineOsc=null,this.engineSubOsc=null,this.engineGain=null,this.engineSubGain=null,this.windOsc=null,this.windGain=null,this.muted=localStorage.getItem("portfolio-drive-muted")==="1"}async init(){if(this.context)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.context=new t,this.master=this.context.createGain(),this.master.gain.value=this.muted?0:.35,this.master.connect(this.context.destination),this.engineOsc=this.context.createOscillator(),this.engineOsc.type="sawtooth",this.engineSubOsc=this.context.createOscillator(),this.engineSubOsc.type="square",this.engineGain=this.context.createGain(),this.engineSubGain=this.context.createGain(),this.engineGain.gain.value=1e-4,this.engineSubGain.gain.value=1e-4;const e=this.context.createBiquadFilter();e.type="lowpass",e.frequency.value=300;const n=this.context.createBiquadFilter();n.type="lowpass",n.frequency.value=130,this.engineOsc.connect(e),e.connect(this.engineGain),this.engineGain.connect(this.master),this.engineSubOsc.connect(n),n.connect(this.engineSubGain),this.engineSubGain.connect(this.master),this.engineOsc.start(),this.engineSubOsc.start(),this.windOsc=this.context.createOscillator(),this.windOsc.type="triangle",this.windGain=this.context.createGain(),this.windGain.gain.value=.012;const s=this.context.createBiquadFilter();s.type="highpass",s.frequency.value=180,this.windOsc.connect(s),s.connect(this.windGain),this.windGain.connect(this.master),this.windOsc.frequency.value=84,this.windOsc.start()}resume(){this.init(),this.context?.state==="suspended"&&this.context.resume()}toggleMute(){return this.muted=!this.muted,localStorage.setItem("portfolio-drive-muted",this.muted?"1":"0"),this.master&&this.master.gain.setTargetAtTime(this.muted?0:.35,this.context.currentTime,.04),this.muted}click(t=520){if(!this.context||this.muted)return;const e=this.context.createOscillator(),n=this.context.createGain();e.type="triangle",e.frequency.value=t,n.gain.value=.001,e.connect(n),n.connect(this.master),n.gain.setValueAtTime(.001,this.context.currentTime),n.gain.exponentialRampToValueAtTime(.08,this.context.currentTime+.01),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.15),e.start(),e.stop(this.context.currentTime+.17)}impact(t=1){if(!this.context||this.muted)return;const e=this.context.createOscillator(),n=this.context.createGain();e.type="square",e.frequency.value=90+Math.random()*30,n.gain.value=Math.min(.1,.03*t),e.connect(n),n.connect(this.master),n.gain.exponentialRampToValueAtTime(.001,this.context.currentTime+.12),e.start(),e.stop(this.context.currentTime+.14)}update(t){if(!this.context||!this.engineOsc||!this.engineGain)return;const e=Math.min(1,Math.abs(t)/42);this.engineOsc.frequency.setTargetAtTime(42+e*128,this.context.currentTime,.06),this.engineGain.gain.setTargetAtTime(this.muted?0:.024+e*.06,this.context.currentTime,.08),this.engineSubOsc&&this.engineSubGain&&(this.engineSubOsc.frequency.setTargetAtTime(24+e*52,this.context.currentTime,.08),this.engineSubGain.gain.setTargetAtTime(this.muted?0:.018+e*.035,this.context.currentTime,.12)),this.windGain&&this.windGain.gain.setTargetAtTime(this.muted?0:.008+e*.025,this.context.currentTime,.2)}}const Xt=170,as=18,ul=[{id:"outer-loop",width:13,closed:!0,points:[[-138,124],[-156,58],[-145,-38],[-108,-120],[-24,-158],[74,-146],[146,-96],[156,-8],[132,88],[82,142],[-18,154],[-104,142]]},{id:"inner-loop",width:11,closed:!0,points:[[2,-8],[-70,18],[-72,76],[-10,104],[48,82],[100,34],[82,-78],[18,-28]]},{id:"campus-loop",width:10,closed:!0,points:[[-105,-52],[-24,-132],[82,-78],[18,-28]]},{id:"north-loop",width:10,closed:!0,points:[[-138,128],[-70,76],[-10,104],[45,82],[129,118],[82,142],[22,149]]},{id:"dock-loop",width:10,closed:!0,points:[[-144,-130],[-108,-120],[-105,-52],[-145,-38]]}],eo=ul.flatMap(i=>o0(i)),s0=[{id:"north-run",position:[6,0,58],rotation:-.04,color:"#7cffb2"},{id:"south-run",position:[2,0,-82],rotation:Math.PI-.04,color:"#68d8ff"},{id:"east-run",position:[78,0,29],rotation:Math.PI/2-.12,color:"#ffdf8a"},{id:"west-run",position:[-82,0,17],rotation:-Math.PI/2+.08,color:"#ff6d8d"},{id:"pier-shot",position:[128,0,-116],rotation:.2,color:"#a8a6ff"}],Fa=[{id:"landing",name:"Start Hub",kind:"Home",position:[2,0,-4],radius:9,color:"#7cffb2",shape:"hub",dialogueId:"0",achievement:"first_stop",actions:[{label:"Main Portfolio",href:"../index.html"},{label:"Projects",href:"../projects.html"}]},{id:"security",name:"Security Lab",kind:"Offensive Security",position:[-118,0,18],radius:10,color:"#68d8ff",shape:"lab",dialogueId:"1",achievement:"security_lab",actions:[{label:"CV",href:"../cv.html"},{label:"Cyber Sentinel",href:"../cyber-sentinel.html"}]},{id:"projects",name:"Projects Foundry",kind:"Project Gallery",position:[98,0,34],radius:10,color:"#ffcc66",shape:"foundry",achievement:"projects_foundry",projectGallery:!0,actions:[{label:"Projects Page",href:"../projects.html"}]},{id:"sentinel",name:"Cyber Sentinel Tower",kind:"Final Year Project",position:[-10,0,103],radius:11,color:"#ff6d8d",shape:"tower",dialogueId:"3",achievement:"cyber_sentinel",actions:[{label:"Read Blog",href:"../cyber-sentinel.html"}]},{id:"career",name:"Career Office",kind:"Experience",position:[-105,0,-52],radius:9,color:"#b6a0ff",shape:"office",dialogueId:"5",achievement:"career_office",actions:[{label:"CV",href:"../cv.html"}]},{id:"skills",name:"Skills Terminal",kind:"Stack",position:[82,0,-78],radius:9,color:"#92ffea",shape:"terminal",dialogueId:"2",achievement:"skills_terminal",actions:[{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"}]},{id:"education",name:"Education Library",kind:"Academics",position:[-24,0,-132],radius:9,color:"#9ccfff",shape:"library",dialogueId:"6",achievement:"education_library",actions:[{label:"CV",href:"../cv.html"}]},{id:"awards",name:"Awards Tower",kind:"Certificates",position:[-70,0,76],radius:8,color:"#ffdf8a",shape:"trophy",dialogueId:"7",achievement:"awards_tower",actions:[{label:"CV",href:"../cv.html"}]},{id:"cv",name:"CV Vault",kind:"Resume",position:[45,0,82],radius:8,color:"#e6f3ff",shape:"vault",achievement:"cv_vault",lines:["Resume archive, project record, certificates, skills, awards, and downloadable PDFs.","The formal version lives here when the drive becomes a document."],actions:[{label:"Open CV Page",href:"../cv.html"},{label:"Resume PDF",href:"../Abdullah-Mehtab-Resume-v5.pdf"},{label:"Cyber CV PDF",href:"../Abdullah-Mehtab-CV-Cyber-v2.pdf"}]},{id:"todo",name:"Todo Board",kind:"Blog / List",position:[-138,0,128],radius:8,color:"#d8ff92",shape:"board",achievement:"todo_board",lines:["The never-ending list keeps the unfinished, ongoing, and occasionally strange parts visible.","Tasks, experiments, reminders, and ideas still moving live there."],actions:[{label:"Open Todo",href:"../todo.html"}]},{id:"circuit",name:"Circuit Gate",kind:"Time Trial",position:[129,0,118],radius:8,color:"#ff9b6d",shape:"gate",achievement:"circuit_gate",lines:["This gate marks the driving circuit.","Follow the outer loop through the checkpoint rings and bring the car back clean."],startsCircuit:!0},{id:"contact",name:"Contact Port",kind:"Links",position:[18,0,-28],radius:8,color:"#78b7ff",shape:"post",dialogueId:"8",achievement:"contact_port",actions:[{label:"GitHub",href:"https://github.com/Abdullah-Mehtab"},{label:"LinkedIn",href:"https://linkedin.com/in/abdullah-mehtab"},{label:"Email",href:"mailto:abdullahmehtab666@gmail.com"}]},{id:"behind",name:"Behind The Build",kind:"Stack",position:[22,0,149],radius:8,color:"#a8a6ff",shape:"portal",achievement:"behind_build",lines:["Engine room: Three.js visuals, Rapier physics, local resume data, and Supabase-backed counters.","The repository link opens the source behind the drive world."],actions:[{label:"Repository",href:"https://github.com/Abdullah-Mehtab/Abdullah-Mehtab"}]},{id:"drift",name:"Ramp Yard",kind:"Driving",position:[136,0,-126],radius:9,color:"#ff9b6d",shape:"rampyard",achievement:"ramp_yard",lines:["Ramps, boost pads, loose crates, and a bit of room to throw the car around."]},{id:"data-pier",name:"Data Pier",kind:"Visitor Trail",position:[-144,0,-130],radius:9,color:"#79ffc5",shape:"pier",achievement:"data_pier",lines:["Signal pier for page views, zone visits, and interaction counts.","Visitor signals are stored as hashed analytics events."]},{id:"potato",name:"Potato Farm",kind:"Farm Counter",position:[105,0,154],radius:9,color:"#c79b56",shape:"farm",achievement:"potato_farm",lines:["Minecraft-style potato patch.","Press P nearby, or use the summon button, to grow one temporary potato and increment the farm counter."],potatoFarm:!0}],r0=[["first_stop","First Stop","Interact with the Start Hub."],["security_lab","Security Pass","Open the Security Lab."],["projects_foundry","Project Heat","Open the Projects Foundry."],["cyber_sentinel","Sentinel Signal","Visit Cyber Sentinel Tower."],["career_office","Work Log","Open the Career Office."],["skills_terminal","Stack Trace","Open the Skills Terminal."],["education_library","Academic Archive","Open the Education Library."],["awards_tower","Trophy Case","Open the Awards Tower."],["cv_vault","Formal Mode","Open the CV Vault."],["todo_board","Still Building","Open the Todo Board."],["circuit_gate","Track Curious","Start the circuit gate."],["contact_port","Signal Sent","Open the Contact Port."],["behind_build","Look Under The Hood","Open Behind The Build."],["ramp_yard","Ramp Yard","Visit the driving yard."],["data_pier","Data Pier","Visit the data pier."],["potato_farm","Potato Patch","Visit the potato farm."],["potato_summon","Potato Summoner","Summon a blocky potato."],["boost","Boosted","Use boost while driving."],["boost_pad","Pad Launched","Hit a boost pad."],["jump","Suspension Check","Jump the car."],["ramp_jump","Clean Air","Launch from a ramp."],["data_shards","Signal Collector","Collect every floating data shard."],["distance_1km","One Kilometer","Drive at least 1 km."],["all_zones","Full Tour","Interact with every portfolio zone."]],a0=[[-138,0,128],[-158,0,-130],[-24,0,-158],[152,0,-126],[129,0,118],[22,0,149]];function o0(i){const t=i.points,e=[],n=i.closed?t.length:t.length-1;for(let s=0;s<n;s+=1){const r=t[s],a=t[(s+1)%t.length],o=a[0]-r[0],l=a[1]-r[1],c=Math.hypot(o,l);e.push([(r[0]+a[0])/2,(r[1]+a[1])/2,i.width,c+i.width*.64,Math.atan2(o,l)])}return e}const Sc="portfolio-drive-achievements";class c0{constructor(){this.definitions=r0.map(([t,e,n])=>({id:t,title:e,description:n})),this.unlocked=new Set(this.read()),this.zoneUnlocks=new Set,this.distance=Number(localStorage.getItem("portfolio-drive-distance")||0),this.onUnlock=null}read(){try{const t=JSON.parse(localStorage.getItem(Sc)||"[]");return Array.isArray(t)?t:[]}catch{return[]}}save(){localStorage.setItem(Sc,JSON.stringify([...this.unlocked])),localStorage.setItem("portfolio-drive-distance",String(Math.round(this.distance)))}unlock(t){if(this.unlocked.has(t))return!1;this.unlocked.add(t),this.save();const e=this.definitions.find(n=>n.id===t);return this.onUnlock?.(e||{id:t,title:t,description:""}),!0}visitZone(t){if(!t?.achievement)return;this.zoneUnlocks.add(t.achievement),this.unlock(t.achievement),this.definitions.map(s=>s.id).filter(s=>!["boost","boost_pad","jump","ramp_jump","data_shards","potato_summon","distance_1km","all_zones"].includes(s)).every(s=>this.unlocked.has(s)||this.zoneUnlocks.has(s))&&this.unlock("all_zones")}addDistance(t){!Number.isFinite(t)||t<=0||(this.distance+=t,this.distance>=1e3&&this.unlock("distance_1km"),this.save())}reset(){this.unlocked.clear(),this.zoneUnlocks.clear(),this.distance=0,this.save()}getProgress(){return{unlocked:this.unlocked.size,total:this.definitions.length,distance:this.distance}}}const yc="https://zvuklviflletxyhniwdm.supabase.co/functions/v1/visitor-proof",Ki="sb_publishable_almN_FPps-MxiLAF0Uypmw_jaCZ6VrI",Ec="portfolio-drive-visitor-id",l0=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;class h0{constructor(){this.isEnabled=!!Ki,this.visitorId=u0(),this.fingerprintHash="",this.potatoCount=null,this.zoneVisits=new Set}get potatoCountLabel(){return Number.isFinite(this.potatoCount)?String(this.potatoCount):"--"}async init(){if(!this.isEnabled)return;this.fingerprintHash=await d0(),this.record("page_view",{sourceToken:"drive_world"});const t=await this.fetchPotatoCount();Number.isFinite(t)&&(this.potatoCount=t)}recordZone(t){!t||this.zoneVisits.has(t)||(this.zoneVisits.add(t),this.record("play_zone_visit",{sourceToken:t}))}async recordPotatoSummon(){const t=await this.record("potato_summon",{sourceToken:"potato_farm",wantsCount:!0});return Number.isFinite(t?.potato_count)?this.potatoCount=t.potato_count:Number.isFinite(this.potatoCount)&&(this.potatoCount+=1),this.potatoCount}async fetchPotatoCount(){if(!this.isEnabled)return null;try{const t=new URL(yc);t.searchParams.set("page_slug","play"),t.searchParams.set("event_type","potato_summon_count");const e=await fetch(t,{headers:{apikey:Ki,authorization:`Bearer ${Ki}`}});if(!e.ok)return null;const n=await e.json();return Number(n.potato_count)}catch{return null}}async record(t,e={}){if(!this.isEnabled)return null;try{const n={page_slug:"play",event_type:t,theme:"drive_world",cursor:"vehicle",motion:"full",referrer:document.referrer||"",source_token:e.sourceToken||"",visitor_id:this.visitorId,session_id:l0,fingerprint_hash:this.fingerprintHash,fingerprint_version:"play-v1",screen_size:`${screen.width}x${screen.height}x${window.devicePixelRatio||1}`,viewport_size:`${window.innerWidth}x${window.innerHeight}`,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",language:navigator.language||"",platform:navigator.platform||""},s=await fetch(yc,{method:"POST",headers:{"content-type":"application/json",apikey:Ki,authorization:`Bearer ${Ki}`},body:JSON.stringify(n),keepalive:t==="page_view"});return s.ok?s.json().catch(()=>null):null}catch{return null}}}function u0(){try{const i=localStorage.getItem(Ec);if(i)return i;const t=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;return localStorage.setItem(Ec,t),t}catch{return`${Date.now()}-${Math.random().toString(16).slice(2)}`}}async function d0(){const i=[navigator.userAgent||"",navigator.language||"",navigator.platform||"",screen.width,screen.height,screen.colorDepth,window.devicePixelRatio||1,Intl.DateTimeFormat().resolvedOptions().timeZone||""].join("|");if(!crypto.subtle)return"";const t=new TextEncoder().encode(i),e=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(e)).map(n=>n.toString(16).padStart(2,"0")).join("")}class f0{constructor(t){this.RAPIER=t,this.world=new this.RAPIER.World({x:0,y:-18.5,z:0}),this.accumulator=0,this.fixedStep=1/60,this.dynamicVisuals=[]}createFixedBox(t,e,n={}){const s=this.RAPIER.RigidBodyDesc.fixed().setTranslation(t[0],t[1],t[2]);n.rotation&&s.setRotation(p0(n.rotation));const r=this.world.createRigidBody(s),a=this.RAPIER.ColliderDesc.cuboid(e[0]/2,e[1]/2,e[2]/2).setFriction(n.friction??.85).setRestitution(n.restitution??.05);return this.world.createCollider(a,r),r}createDynamicBox(t,e,n={}){const s=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(t[0],t[1],t[2]).setLinearDamping(n.linearDamping??.35).setAngularDamping(n.angularDamping??.45),r=this.world.createRigidBody(s),a=this.RAPIER.ColliderDesc.cuboid(e[0]/2,e[1]/2,e[2]/2).setDensity(n.density??.55).setFriction(n.friction??.75).setRestitution(n.restitution??.2);return this.world.createCollider(a,r),r}bindVisual(t,e){const n=t.translation(),s=t.rotation();this.dynamicVisuals.push({body:t,object:e,initial:{translation:{x:n.x,y:n.y,z:n.z},rotation:{x:s.x,y:s.y,z:s.z,w:s.w}}})}resetDynamicVisuals(){for(const t of this.dynamicVisuals)t.body.setTranslation(t.initial.translation,!0),t.body.setRotation(t.initial.rotation,!0),t.body.setLinvel({x:0,y:0,z:0},!0),t.body.setAngvel({x:0,y:0,z:0},!0);this.syncVisuals()}step(t,e){this.accumulator+=Math.min(t,.05);let n=!1;for(;this.accumulator>=this.fixedStep;)e?.(this.fixedStep),this.world.step(),this.accumulator-=this.fixedStep,n=!0;n&&this.syncVisuals()}syncVisuals(){for(const t of this.dynamicVisuals){const e=t.body.translation(),n=t.body.rotation();t.object.position.set(e.x,e.y,e.z),t.object.quaternion.set(n.x,n.y,n.z,n.w)}}}function p0(i){const t=new nn().setFromEuler(new qe(i[0],i[1],i[2]));return{x:t.x,y:t.y,z:t.z,w:t.w}}const Ji=new I(2,1.45,5.5);class m0{constructor({scene:t,physics:e,achievements:n,audio:s}){this.scene=t,this.physics=e,this.achievements=n,this.audio=s,this.RAPIER=e.RAPIER,this.group=new Ge,this.wheels=[],this.frontWheels=[],this.speed=0,this.driveSpeed=0,this.heading=0,this.airTime=0,this.lastBoostPad=null,this.trails=[],this.trailGeometry=new ni(.16,8,6),this.distanceAccumulator=0,this.lastPosition=Ji.clone(),this.steerVisual=0,this.groundedFrames=0,this.createBody(),this.createModel(),this.respawn()}createBody(){const t=this.RAPIER.RigidBodyDesc.dynamic().setTranslation(Ji.x,Ji.y,Ji.z).setLinearDamping(.38).setAngularDamping(1.15);this.body=this.physics.world.createRigidBody(t);const e=this.RAPIER.ColliderDesc.cuboid(1.14,.42,2.28).setDensity(1.4).setFriction(.92).setRestitution(.12);this.physics.world.createCollider(e,this.body)}createModel(){const t=new rs({color:9318167,roughness:.26,metalness:.5,clearcoat:.58,clearcoatRoughness:.18,emissive:1442818,emissiveIntensity:.1,flatShading:!0}),e=new rs({color:6233104,roughness:.34,metalness:.42,clearcoat:.42,clearcoatRoughness:.22,flatShading:!0}),n=new Gt({color:15261642,roughness:.28,metalness:.22,side:Oe}),s=new Gt({color:462872,roughness:.42,metalness:.38}),r=new Gt({color:13160144,roughness:.2,metalness:.82}),a=new Gt({color:1382685,roughness:.42,metalness:.64}),o=new rs({color:1253941,roughness:.08,metalness:.1,transmission:.12,transparent:!0,opacity:.66,side:Oe}),l=new qt({color:16774095}),c=new Gt({color:132103,roughness:.74,metalness:.12,flatShading:!0}),u=new Gt({color:11449528,roughness:.18,metalness:.82}),d=new qt({color:9410715}),h=(f,v,E,y=[0,0,0])=>{const A=new Tt(f,v);return A.position.set(...E),A.rotation.set(...y),A.castShadow=!0,A.receiveShadow=!0,this.group.add(A),A};h(v0(),t,[0,.28,0]),h(M0(),t,[0,.94,1.35]),h(S0(),t,[0,.91,-1.55]),h(y0(),t,[0,1.03,-.32]),Vr(.46,2.72,[0,1.14,1.46],-.045,n,this.group),Vr(.42,1.06,[0,1.77,-.36],0,n,this.group),Vr(.46,1.82,[0,1.075,-1.72],.035,n,this.group);for(const f of[-1,1]){const v=g0(f),E=h(new De(5.72,1.34),new qt({map:v,transparent:!0,side:Oe,depthWrite:!1}),[f*1.255,.96,0],[0,f>0?Math.PI/2:-Math.PI/2,0]);E.renderOrder=3}const p=h(new De(2.42,.68),new qt({map:_0(),transparent:!0,side:Oe,depthWrite:!1}),[0,.78,2.965]);p.renderOrder=4;const g=h(new De(2.28,.62),new qt({map:x0(),transparent:!0,side:Oe,depthWrite:!1}),[0,.76,-2.965],[0,Math.PI,0]);g.renderOrder=4,h(E0(),o,[0,1.52,.43]),h(b0(),o,[0,1.45,-1.14]);for(const f of[-1,1]){const v=h(w0(f),o,[0,1.48,-.35]);v.renderOrder=2,h(new pt(.05,.42,1.62),e,[f*.86,1.52,-.4],[0,.03*f,0]),h(new pt(.07,.07,.38),r,[f*1.28,1.14,.48],[0,f*.16,0]),h(new pt(.09,.07,.32),r,[f*1.26,.98,-.52]),h(new pt(.06,.36,.04),s,[f*1.19,1.05,-.2]),h(new pt(.05,.04,4.58),r,[f*1.2,.72,.02])}h(new pt(2.1,.42,.16),a,[0,.82,2.76]),h(new pt(2.45,.18,.22),r,[0,.55,2.9]),h(new pt(2.24,.16,.18),r,[0,.54,-2.86]),h(new pt(1.95,.06,.08),r,[0,.98,2.84]),h(new pt(1.75,.05,.06),r,[0,1.02,-2.78]);for(const f of[-.72,-.44,.44,.72]){const v=h(new Ni(.12,18),l,[f,.86,2.972]);v.castShadow=!1,v.renderOrder=6}for(const f of[-.64,.64]){const v=new nu(16773316,12,36,Math.PI/9,.42,1.45);v.position.set(f,.86,2.96),v.target.position.set(f,.35,10),this.group.add(v),this.group.add(v.target)}for(const f of[-.62,.62])h(new pt(.34,.15,.055),new qt({color:16722742}),[f,.78,-2.92]),h(new pt(.14,.15,.055),new qt({color:16752717}),[f*1.42,.78,-2.92]);for(const f of[-1.22,1.22])for(const v of[1.64,-1.68])h(new he(.56,.055,8,32,Math.PI),e,[f,.52,v],[0,Math.PI/2,f>0?Math.PI:0]),h(new he(.54,.035,8,32,Math.PI),r,[f*1.006,.5,v],[0,Math.PI/2,f>0?Math.PI:0]);const S=new Wt(.52,.52,.42,36),m=[[-1.24,.35,1.62],[1.24,.35,1.62],[-1.24,.35,-1.68],[1.24,.35,-1.68]];for(let f=0;f<m.length;f+=1){const v=new Ge;v.position.set(...m[f]);const E=new Tt(S,c);E.rotation.z=Math.PI/2,E.castShadow=!0,v.add(E);const y=new Tt(new Wt(.31,.31,.04,32),u);y.position.x=m[f][0]>0?.235:-.235,y.rotation.z=Math.PI/2,v.add(y);const A=new Tt(new he(.42,.018,8,32),d);A.position.x=m[f][0]>0?.238:-.238,A.rotation.y=Math.PI/2,v.add(A),this.group.add(v),this.wheels.push(E),f<2&&this.frontWheels.push(v)}this.scene.add(this.group)}update(t,e){const n=this.body.translation();if(n.y<-12||Math.abs(n.x)>Xt+16||Math.abs(n.z)>Xt+16){this.respawn();return}const s=new I(Math.sin(this.heading),0,Math.cos(this.heading)).normalize(),r=new I(Math.cos(this.heading),0,-Math.sin(this.heading)).normalize(),a=this.body.linvel(),o=new I(a.x,a.y,a.z),l=o.dot(s),c=o.dot(r),u=t.joystick,d=t.actions.forward||u.y<-.22,h=t.actions.backward||u.y>.22,p=t.actions.left||u.x<-.22,g=t.actions.right||u.x>.22,S=(p?1:0)+(g?-1:0)+js.clamp(-u.x,-1,1),m=t.actions.boost,f=t.actions.brake;m&&Math.abs(l)>2&&this.achievements.unlock("boost");const v=m?66:44,E=28;d&&(this.driveSpeed+=v*e),h&&(this.driveSpeed-=E*e),!d&&!h&&(this.driveSpeed*=Math.max(0,1-e*1.35)),this.driveSpeed+=(l-this.driveSpeed)*Math.min(1,e*.55),this.driveSpeed=js.clamp(this.driveSpeed,-15,m?48:34),this.speed=this.driveSpeed;const y=js.clamp(Math.abs(this.driveSpeed)/18,.28,1.35);if(Math.abs(S)>.03){const b=Math.sign(this.driveSpeed||1);this.heading+=S*b*y*2.15*e}this.body.setRotation(kr(this.heading),!0),f&&(this.driveSpeed*=Math.max(0,1-e*8.5));const A=s.clone().multiplyScalar(this.driveSpeed).add(r.clone().multiplyScalar(c*(f?.22:.1)));this.body.setLinvel({x:A.x,y:a.y,z:A.z},!0);const T=n.y<.92||n.y<1.75&&Math.abs(a.y)<.32;this.groundedFrames=T?Math.min(18,this.groundedFrames+1):0,this.airTime=T?0:this.airTime+e,t.consume("jump")&&this.groundedFrames>2&&(this.body.setLinvel({x:A.x,y:10.4,z:A.z},!0),this.achievements.unlock("jump"),this.audio.click(760)),t.consume("honk")&&(this.audio.click(320),this.body.applyImpulse({x:0,y:2.2,z:0},!0)),t.consume("respawn")&&this.respawn(),Math.abs(this.driveSpeed)>12&&this.spawnTrail(s,m);const C=new I(n.x,n.y,n.z),x=C.distanceTo(this.lastPosition);x<5&&(this.distanceAccumulator+=x,this.achievements.addDistance(x)),this.lastPosition.copy(C),this.syncModel(),this.updateWheels(e,S,this.driveSpeed),this.updateTrails(e)}syncModel(){const t=this.body.translation(),e=this.body.rotation();this.group.position.set(t.x,t.y,t.z),this.group.quaternion.set(e.x,e.y,e.z,e.w)}updateWheels(t,e,n){this.steerVisual+=(e*.42-this.steerVisual)*Math.min(1,t*12);for(const s of this.frontWheels)s.rotation.y=this.steerVisual;for(const s of this.wheels)s.rotation.x+=n*t*2.4}respawn(t=Ji,e=0){this.body.setTranslation({x:t.x,y:t.y,z:t.z},!0),this.heading=e,this.body.setRotation(kr(this.heading),!0),this.body.setLinvel({x:0,y:0,z:0},!0),this.body.setAngvel({x:0,y:0,z:0},!0),this.driveSpeed=0,this.speed=0,this.airTime=0,this.lastPosition.copy(t),this.syncModel()}spawnTrail(t,e){if(this.trails.length>90)return;const n=this.position.addScaledVector(t,-2.25),s=new Tt(this.trailGeometry,new qt({color:e?8191922:6871295,transparent:!0,opacity:e?.38:.22}));s.position.set(n.x+(Math.random()-.5)*.7,Math.max(.22,n.y-.1),n.z+(Math.random()-.5)*.7),this.scene.add(s),this.trails.push({mesh:s,life:e?.55:.38,velocity:new I((Math.random()-.5)*.5,.45+Math.random()*.28,(Math.random()-.5)*.5)})}updateTrails(t){for(let e=this.trails.length-1;e>=0;e-=1){const n=this.trails[e];n.life-=t,n.mesh.position.addScaledVector(n.velocity,t),n.mesh.scale.multiplyScalar(1+t*1.8),n.mesh.material.opacity=Math.max(0,n.life)*.7,n.life<=0&&(this.scene.remove(n.mesh),n.mesh.material.dispose(),this.trails.splice(e,1))}}boostFromPad(t){!t||this.lastBoostPad===t.id||(this.lastBoostPad=t.id,this.heading=Math.atan2(t.direction.x,t.direction.z),this.driveSpeed=Math.max(this.driveSpeed,50),this.body.setRotation(kr(this.heading),!0),this.body.setLinvel({x:t.direction.x*52,y:Math.max(2.4,this.body.linvel().y+2.6),z:t.direction.z*52},!0),this.achievements.unlock("boost_pad"),this.audio.click(940),window.setTimeout(()=>{this.lastBoostPad===t.id&&(this.lastBoostPad=null)},550))}get position(){const t=this.body.translation();return new I(t.x,t.y,t.z)}}function kr(i){const t=new nn().setFromEuler(new qe(0,i,0));return{x:t.x,y:t.y,z:t.z,w:t.w}}function Vr(i,t,e,n,s,r){const a=new Tt(new De(i,t),s);return a.position.set(...e),a.rotation.x=-Math.PI/2+n,a.renderOrder=5,r.add(a),a}function no(i){const t=new zn(i);return t.colorSpace=Me,t.magFilter=Te,t.minFilter=Bn,t.generateMipmaps=!0,t}function g0(i=1){const t=document.createElement("canvas");t.width=384,t.height=128;const e=t.getContext("2d");e.imageSmoothingEnabled=!1,e.clearRect(0,0,t.width,t.height),i<0&&(e.translate(t.width,0),e.scale(-1,1)),e.fillStyle="rgba(34, 7, 4, 0.42)",bc(e,[[24,94],[72,82],[324,83],[366,97],[350,111],[42,112]]),e.fill(),e.fillStyle="rgba(6, 13, 22, 0.9)",bc(e,[[148,47],[214,45],[264,60],[287,79],[276,88],[136,86],[122,72]]),e.fill(),e.strokeStyle="#aeb8bc",e.lineWidth=3,e.stroke(),e.strokeStyle="#1c2a31",e.lineWidth=3,e.beginPath(),e.moveTo(212,49),e.lineTo(214,89),e.stroke(),e.strokeStyle="#161b1e",e.lineWidth=2,e.beginPath(),e.moveTo(258,88),e.lineTo(266,113),e.moveTo(119,86),e.lineTo(110,112),e.stroke(),e.strokeStyle="#c4c9ca",e.lineWidth=3,e.beginPath(),e.moveTo(50,96),e.lineTo(340,94),e.stroke(),e.fillStyle="#d0d5d6",e.fillRect(238,88,22,6),e.fillStyle="#0a0e10",e.fillRect(229,82,4,30),e.strokeStyle="rgba(8, 11, 12, 0.95)",e.lineWidth=7;for(const n of[86,304])e.beginPath(),e.arc(n,112,33,Math.PI,Math.PI*2),e.stroke();return e.fillStyle="#c9cdd0",e.fillRect(15,98,28,10),e.fillRect(348,100,27,10),e.fillStyle="#f3d591",e.fillRect(25,83,9,8),e.fillStyle="#ff443e",e.fillRect(356,87,12,9),no(t)}function _0(){const i=document.createElement("canvas");i.width=256,i.height=96;const t=i.getContext("2d");t.imageSmoothingEnabled=!1,t.clearRect(0,0,i.width,i.height),t.fillStyle="#822511",t.fillRect(30,8,196,56),t.fillStyle="#e8dfca",t.fillRect(112,8,32,58),t.fillStyle="#0b1014",t.fillRect(46,30,164,34),t.strokeStyle="#bfc7c9",t.lineWidth=4,t.strokeRect(44,28,168,38),t.strokeStyle="#647075",t.lineWidth=2;for(let e=66;e<=190;e+=16)t.beginPath(),t.moveTo(e,31),t.lineTo(e,63),t.stroke();for(const e of[34,58,198,222])t.fillStyle="#fff1c2",t.beginPath(),t.arc(e,46,13,0,Math.PI*2),t.fill(),t.strokeStyle="#d1d6d8",t.lineWidth=3,t.stroke();return t.fillStyle="#c6c9ca",t.fillRect(22,68,212,16),t.fillStyle="#6b7072",t.fillRect(36,80,184,6),no(i)}function x0(){const i=document.createElement("canvas");i.width=256,i.height=96;const t=i.getContext("2d");t.imageSmoothingEnabled=!1,t.clearRect(0,0,i.width,i.height),t.fillStyle="#72200f",t.fillRect(30,12,196,55),t.fillStyle="#e8dfca",t.fillRect(113,10,30,58),t.fillStyle="#11171b",t.fillRect(72,34,112,24);for(const e of[52,79,177,204])t.fillStyle=e<100||e>170?"#ff3d36":"#f18f42",t.fillRect(e,40,20,12);return t.fillStyle="#c6c9ca",t.fillRect(24,68,208,16),t.fillStyle="#24282a",t.fillRect(111,72,34,9),no(i)}function bc(i,t){i.beginPath(),i.moveTo(t[0][0],t[0][1]);for(let e=1;e<t.length;e+=1)i.lineTo(t[e][0],t[e][1]);i.closePath()}function v0(){const i=new Float32Array([-1.08,0,-2.55,1.08,0,-2.55,1.18,0,2.56,-1.18,0,2.56,-1.02,.78,-2.42,1.02,.78,-2.42,1.04,.66,2.48,-1.04,.66,2.48,-1.22,.18,-1.7,-1.22,.18,1.65,1.22,.18,-1.7,1.22,.18,1.65]);return ai(i,[0,1,2,0,2,3,4,6,5,4,7,6,0,4,5,0,5,1,1,5,10,1,10,2,10,5,6,10,6,2,2,6,7,2,7,3,3,7,8,3,8,0,8,7,4,8,4,0,8,9,7,7,9,3,10,5,11,11,5,6])}function M0(){const i=new Float32Array([-1.02,0,-1.18,1.02,0,-1.18,1.08,0,1.36,-1.08,0,1.36,-.94,.2,-1.08,.94,.2,-1.08,.98,.08,1.28,-.98,.08,1.28]);return ai(i,io())}function S0(){const i=new Float32Array([-1.02,0,-.92,1.02,0,-.92,1.06,0,.92,-1.06,0,.92,-.96,.16,-.84,.96,.16,-.84,.98,.08,.86,-.98,.08,.86]);return ai(i,io())}function y0(){const i=new Float32Array([-.82,0,-1.25,.82,0,-1.25,.9,0,.82,-.9,0,.82,-.64,.72,-.72,.64,.72,-.72,.68,.58,.28,-.68,.58,.28]);return ai(i,io())}function E0(){const i=new Float32Array([-.72,-.28,.22,.72,-.28,.22,.62,.24,-.2,-.62,.24,-.2]);return ai(i,[0,1,2,0,2,3])}function b0(){const i=new Float32Array([-.66,-.22,-.08,.66,-.22,-.08,.55,.18,.44,-.55,.18,.44]);return ai(i,[0,1,2,0,2,3])}function w0(i){const t=i*.9,e=new Float32Array([t,-.18,.62,t,.24,.18,t,.28,-.78,t,-.16,-1.12]);return ai(e,[0,1,2,0,2,3])}function io(){return[0,1,2,0,2,3,4,6,5,4,7,6,0,4,5,0,5,1,1,5,6,1,6,2,2,6,7,2,7,3,3,7,4,3,4,0]}function ai(i,t){const e=new Ae;return e.setAttribute("position",new Xe(i,3)),e.setIndex(t),e.computeVertexNormals(),e}class T0{constructor(t,e,n){this.camera=t,this.vehicle=e,this.input=n,this.focus=new I,this.smoothedTarget=new I,this.mode="follow",this.cinematicTarget=null,this.cinematicPosition=null}setCinematic(t,e){this.mode="cinematic",this.cinematicPosition=t.clone(),this.cinematicTarget=e.clone()}clearCinematic(){this.mode="follow",this.cinematicPosition=null,this.cinematicTarget=null}update(t){if(this.mode==="cinematic"&&this.cinematicPosition&&this.cinematicTarget){this.camera.position.lerp(this.cinematicPosition,1-Math.pow(.002,t)),this.smoothedTarget.lerp(this.cinematicTarget,1-Math.pow(.004,t)),this.camera.lookAt(this.smoothedTarget);return}const e=this.vehicle.position,n=this.vehicle.body.rotation(),s=new nn(n.x,n.y,n.z,n.w),r=new I(0,0,1).applyQuaternion(s).setY(0).normalize(),a=this.input.pointer.orbitX,o=new nn().setFromAxisAngle(new I(0,1,0),a),l=r.clone().applyQuaternion(o),c=js.clamp(Math.abs(this.vehicle.speed)*.16,0,4),u=this.input.pointer.zoom,d=this.input.pointer.orbitY,h=e.clone().add(new I(0,1.35,0)).addScaledVector(l,4.2),p=e.clone().addScaledVector(l,(-13.5-c)*u).add(new I(0,7.2+c*.18+d*4.5,0)),g=1-Math.pow(.001,t),S=1-Math.pow(5e-4,t);this.camera.position.lerp(p,g*.62),this.smoothedTarget.lerp(h,S*.7),this.camera.lookAt(this.smoothedTarget)}}const wc=520,Tc=-2.25,A0=6871295,R0=new Ct;class C0{constructor({scene:t,physics:e,resumeData:n}){this.scene=t,this.physics=e,this.resumeData=n,this.zones=[],this.decor=[],this.particles=[],this.boostPads=[],this.ramps=[],this.collectibles=[],this.potatoes=[],this.materials={},this.circuit={active:!1,startedAt:0,checkpoint:0,best:Number(localStorage.getItem("portfolio-drive-best-lap")||0)},this.build()}build(){this.createMaterials(),this.createSky(),this.createGround(),this.createIslandEdges(),this.createRoads(),this.createCircuit(),this.createZones(),this.createRampsAndPads(),this.createProps(),this.createCollectibles(),this.createAtmosphere()}createMaterials(){const t=Rc(["#285c2f","#31723a","#1f4a29","#3d8243"],256,4600);t.wrapS=Sn,t.wrapT=Sn,t.repeat.set(28,28);const e=D0();e.wrapS=Sn,e.wrapT=Sn,e.repeat.set(1,18);const n=Rc(["#a98b61","#bd9f70","#8d724f","#d0b17c"],192,1200);n.wrapS=Sn,n.wrapT=Sn,n.repeat.set(10,10);const s=I0();this.materials.ground=new Gt({color:5217093,map:t,roughness:.94,metalness:.01}),this.materials.road=new Gt({color:4015944,map:e,roughness:.86,metalness:.03}),this.materials.roadLine=new qt({color:A0,transparent:!0,opacity:.46}),this.materials.dark=new Gt({color:594461,roughness:.55,metalness:.25}),this.materials.edge=new Gt({color:726818,roughness:.7,metalness:.18}),this.materials.sand=new Gt({color:11637091,map:n,roughness:.96,metalness:.01}),this.materials.grass=new Gt({color:2384439,roughness:.88,metalness:.02}),this.materials.leaf=new Gt({color:3111492,roughness:.82,metalness:.01}),this.materials.leafLight=new Gt({color:4954709,roughness:.84,metalness:.01}),this.materials.trunk=new Gt({color:4928296,roughness:.9,metalness:.02}),this.materials.brick=new Gt({color:8079927,roughness:.74,metalness:.04}),this.materials.cream=new Gt({color:13154705,roughness:.72,metalness:.02}),this.materials.limestone=new Gt({color:14209209,roughness:.68,metalness:.03}),this.materials.roof=new Gt({color:2439245,roughness:.55,metalness:.18}),this.materials.gold=new Gt({color:16766315,roughness:.3,metalness:.55,emissive:3350528,emissiveIntensity:.18}),this.materials.potato=new Gt({color:12749634,roughness:.86,metalness:.01}),this.materials.farmSoil=new Gt({color:5912614,roughness:.96,metalness:.01}),this.materials.wood=new Gt({color:8083257,roughness:.82,metalness:.03}),this.materials.woodDark=new Gt({color:5454376,roughness:.88,metalness:.02}),this.materials.concrete=new Gt({color:8884633,roughness:.72,metalness:.06}),this.materials.neonBlue=new qt({color:6871295,transparent:!0,opacity:.82}),this.materials.neonGreen=new qt({color:8191922,transparent:!0,opacity:.82}),this.materials.neonRed=new qt({color:16729190,transparent:!0,opacity:.82}),this.materials.water=L0(),this.materials.patchAlpha=s,this.materials.glass=new rs({color:9431295,roughness:.05,metalness:.05,transmission:.28,transparent:!0,opacity:.48}),this.materials.darkGlass=new rs({color:2308687,roughness:.08,metalness:.12,transmission:.12,transparent:!0,opacity:.7})}createSky(){const t=document.createElement("canvas");t.width=32,t.height=512;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,t.height);n.addColorStop(0,"#5ab8ff"),n.addColorStop(.32,"#83d2ff"),n.addColorStop(.66,"#bfefff"),n.addColorStop(1,"#f6d49a"),e.fillStyle=n,e.fillRect(0,0,t.width,t.height);const s=new zn(t);s.colorSpace=Me;const r=new Tt(new ni(620,48,24),new qt({map:s,side:Be,depthWrite:!1}));r.position.y=40,this.scene.add(r);const a=new Tt(new Ni(15,48),new qt({color:16773551,transparent:!0,opacity:.86,depthWrite:!1}));a.position.set(-145,118,-245),a.lookAt(0,20,0),this.scene.add(a),this.decor.push({type:"sunDisc",mesh:a,phase:0});const o=new qt({color:16777215,transparent:!0,opacity:.38,depthWrite:!1});for(let l=0;l<14;l+=1){const c=new Ge,u=-270+l*47%540,d=-260+l*73%520;c.position.set(u,82+l%5*7,d);for(let h=0;h<5;h+=1){const p=new Tt(new ni(5.5+h*1.1,16,10),o.clone());p.scale.set(2.9,.34,.96),p.position.set((h-2)*8.2,Math.sin(h)*.8,h%2*3.2),c.add(p)}this.scene.add(c),this.decor.push({type:"cloud",mesh:c,phase:l*.37})}}createGround(){const t=new Tt(new De(wc*2,wc*2,48,48),this.materials.water);t.rotation.x=-Math.PI/2,t.position.y=Tc,this.scene.add(t),this.decor.push({type:"ocean",mesh:t,phase:0});const e=new De(Xt*2,Xt*2,96,96),n=e.attributes.position;for(let a=0;a<n.count;a+=1){const o=n.getX(a),l=n.getY(a),c=Math.sin(o*.045)*.055+Math.cos(l*.035)*.045+Math.sin((o+l)*.018)*.06;n.setZ(a,c)}e.computeVertexNormals();const s=new Tt(e,this.materials.ground);s.rotation.x=-Math.PI/2,s.position.y=-.02,s.receiveShadow=!0,this.scene.add(s),this.physics.createFixedBox([0,-.16,0],[Xt*2,.24,Xt*2],{friction:1});const r=[[-118,0,118,52,34,-.18,this.materials.leafLight],[96,0,126,60,32,.14,this.materials.leafLight],[-118,0,-102,54,28,.2,this.materials.sand],[122,0,-128,44,24,-.12,this.materials.sand],[-18,0,-138,68,22,.06,this.materials.leafLight],[132,0,58,38,24,-.28,this.materials.leafLight],[18,0,18,56,34,.04,this.materials.leafLight],[56,0,30,34,18,-.22,this.materials.leafLight],[105,0,154,44,26,-.08,this.materials.leafLight]];for(const[a,o,l,c,u,d,h]of r){const p=h.clone();p.transparent=!0,p.opacity=h===this.materials.sand?.72:.42,p.alphaMap=this.materials.patchAlpha,p.depthWrite=!1,p.needsUpdate=!0;const g=new Tt(P0(c,u,a*.17+l*.31),p);g.position.set(a,o+.04,l),g.rotation.x=-Math.PI/2,g.rotation.z=d,g.receiveShadow=!0,this.scene.add(g)}}createIslandEdges(){const t=this.materials.edge,e=1.8,n=3.4,s=new qt({color:6871295,transparent:!0,opacity:.38}),r=[[0,Xt+n/2,Xt*2,n],[0,-Xt-n/2,Xt*2,n],[Xt+n/2,0,n,Xt*2],[-Xt-n/2,0,n,Xt*2]];for(const[o,l,c,u]of r){const d=new Tt(new pt(c,e,u),t);d.position.set(o,e/2-.08,l),d.castShadow=!0,d.receiveShadow=!0,this.scene.add(d),this.physics.createFixedBox([o,e/2-.08,l],[c,e,u],{friction:.7,restitution:.08});const h=new Tt(new pt(c||n,.08,u||n),s.clone());h.position.set(o,e+.12,l),this.scene.add(h),this.decor.push({type:"rail",mesh:h,phase:Math.random()*6})}for(let o=0;o<28;o+=1){const l=o%4,c=-Xt+12+Math.floor(o/4)*48,u=l===0?c:l===1?Xt+7:l===2?c:-Xt-7,d=l===0?Xt+7:l===1?c:l===2?-Xt-7:c,h=new Tt(new Wt(.52,.7,1.5,9),new qt({color:o%2?16768906:16739725,transparent:!0,opacity:.78}));h.position.set(u,.38,d),h.castShadow=!0,this.scene.add(h),this.decor.push({type:"buoy",mesh:h,phase:o*.5})}const a=new Gt({color:5398895,roughness:.84,metalness:.04});for(let o=0;o<64;o+=1){const l=Math.floor(o/16),c=-Xt+10+o%16*21.5+Math.sin(o*2.1)*4,u=2+Math.abs(Math.sin(o*1.7))*4,d=l===0?c:l===1?Xt-u:l===2?c:-Xt+u,h=l===0?Xt-u:l===1?c:l===2?-Xt+u:c,p=new Tt(new Ja(.75+o%5*.22,0),a);p.position.set(d,.4,h),p.rotation.set(Math.random()*.6,Math.random()*6,Math.random()*.6),p.scale.y=.55+Math.random()*.45,p.castShadow=!0,p.receiveShadow=!0,this.scene.add(p)}}createRoads(){for(const e of eo)this.addRoad(...e);const t=this.materials.road.clone();for(const e of ul)for(const n of e.points){const s=new Tt(new Wt(e.width*.56,e.width*.56,.1,32),t);s.position.set(n[0],.155,n[1]),s.receiveShadow=!0,this.scene.add(s)}}addRoad(t,e,n,s,r=0){const a=new Ge;a.position.set(t,.15,e),a.rotation.y=r;const o=new Tt(new pt(n+1.35,.05,s+1.35),this.materials.edge);o.position.y=-.035,o.receiveShadow=!0,a.add(o);const l=new Tt(new pt(n,.09,s),this.materials.road);l.receiveShadow=!0,a.add(l),this.scene.add(a);const c=s>n,u=Math.max(2,Math.floor(c?s/8:n/8));for(let d=0;d<u;d+=1){const h=new Tt(new pt(c?.14:2.3,.09,c?2.3:.14),this.materials.roadLine.clone()),p=u<=1?0:d/(u-1)-.5;h.position.set(c?0:p*n,.08,c?p*s:0),a.add(h),this.decor.push({type:"dash",mesh:h,phase:Math.random()*6})}}createCircuit(){this.checkpoints=a0.map((t,e)=>{const n=new Ge;n.position.set(t[0],.08,t[2]);const s=new Tt(new he(3.2,.06,8,48),new qt({color:e===0?16751469:6871295,transparent:!0,opacity:.34}));s.rotation.x=Math.PI/2,n.add(s);const r=new Tt(new Wt(.08,.08,3.4,8),new qt({color:16751469,transparent:!0,opacity:.6}));return r.position.y=1.7,n.add(r),this.scene.add(n),this.decor.push({type:"checkpoint",mesh:s,phase:e*.7}),{position:new I(t[0],0,t[2]),group:n,ring:s}})}createZones(){for(const t of Fa){const e=this.createZone(t);this.zones.push(e)}}createRampsAndPads(){const t=new Gt({color:2504777,roughness:.58,metalness:.22,emissive:1059391,emissiveIntensity:.15}),e=[{position:[0,.46,68],rotation:[-.34,0,0],size:[12,.72,18],color:8191922},{position:[132,.46,-112],rotation:[-.42,0,0],size:[13,.8,19],color:16751469},{position:[112,.46,-132],rotation:[-.34,Math.PI/2,0],size:[11,.72,18],color:11052799},{position:[-132,.46,-112],rotation:[-.28,0,0],size:[10,.65,16],color:7995333}];for(const n of e){const s=new Tt(new pt(...n.size),t.clone());s.position.set(...n.position),s.rotation.set(...n.rotation),s.castShadow=!0,s.receiveShadow=!0,this.scene.add(s),this.physics.createFixedBox(n.position,n.size,{rotation:n.rotation,friction:.9,restitution:.04});const r=new Tt(new pt(n.size[0]*.7,.05,.35),new qt({color:n.color,transparent:!0,opacity:.72}));r.position.copy(s.position),r.position.y+=.52,r.rotation.copy(s.rotation),this.scene.add(r),this.ramps.push({position:new I(...n.position),radius:10}),this.decor.push({type:"rampStripe",mesh:r,phase:Math.random()*6})}for(const n of s0){const s=new Tt(new pt(7.4,.12,4.6),new qt({color:n.color,transparent:!0,opacity:.38}));s.position.set(...n.position),s.position.y=.12,s.rotation.y=n.rotation,this.scene.add(s);const r=new Tt(new Fn(1.1,2.8,3),new qt({color:n.color,transparent:!0,opacity:.78}));r.rotation.x=Math.PI/2,r.rotation.z=-n.rotation,r.position.copy(s.position),r.position.y+=.18,this.scene.add(r),this.boostPads.push({...n,mesh:s,arrow:r,position:new I(...n.position),direction:new I(Math.sin(n.rotation),0,Math.cos(n.rotation)).normalize(),cooldown:0}),this.decor.push({type:"boostPad",mesh:s,arrow:r,phase:Math.random()*6})}}createZone(t){const e=new Ge,n=new I(...t.position);e.position.copy(n);const s=new Ct(t.color),r=new Gt({color:R0.copy(s).lerp(new Ct(2371899),.68),roughness:.48,metalness:.3,emissive:s,emissiveIntensity:.12}),a=new qt({color:s,transparent:!0,opacity:.86}),o=this.addZoneModel(e,t,r,a),l=new Tt(new he(t.radius,.08,8,72),new qt({color:s,transparent:!0,opacity:.22}));l.rotation.x=Math.PI/2,l.position.y=.12,e.add(l);const c=new Tt(new Wt(.1,.1,Math.max(1.2,o[1])+1.4,16),new qt({color:s,transparent:!0,opacity:.18,depthWrite:!1}));return c.position.y=Math.max(1,o[1]/2)+.65,c.visible=!t.potatoFarm,e.add(c),this.scene.add(e),o[0]>0&&this.physics.createFixedBox([n.x,o[1]/2,n.z],o,{friction:.88,restitution:.08}),this.decor.push({type:"zone",mesh:e,marker:c,ring:l,phase:Math.random()*6}),{...t,position:n,group:e,marker:c,ring:l,colliderSize:o}}addZoneModel(t,e,n,s){const r=e.shape,a=new Ct(e.color),o=(u,d,h=[0,0,0],p=[0,0,0],g=[1,1,1])=>{const S=new Tt(u,d);return S.position.set(...h),S.rotation.set(...p),S.scale.set(...g),S.castShadow=!0,S.receiveShadow=!0,t.add(S),S},l=new qt({color:a,transparent:!0,opacity:.82});let c=[6,5,6];if(r==="hub")o(new Wt(5.2,5.9,.7,48),this.materials.concrete,[0,.35,0]),o(new he(4.15,.08,10,72),l,[0,.82,0],[Math.PI/2,0,0]),o(new Wt(1.05,1.25,2.2,32),n,[0,1.55,0]),o(new ss(1.25,1),l,[0,3.4,0]),this.addSignalRings(t,0,3.4,0,a,3),c=[8.8,3.4,8.8];else if(r==="lab"){o(new Wt(4.4,4.9,1.2,6),n,[0,.6,0]),o(new pt(7.4,2.4,4.6),this.materials.darkGlass,[0,2,0]),o(new Wt(3.2,3.2,2.8,6),this.materials.darkGlass,[0,3.2,0],[0,Math.PI/6,0]);for(const u of[-2.8,-1.4,0,1.4,2.8])o(new pt(.12,2.2,4.9),l,[u,2.4,-.04]);o(new Wt(.18,.24,5.5,16),this.materials.concrete,[0,5.5,0]),o(new he(1.35,.08,12,48),l,[0,7.4,0],[Math.PI/2.8,0,0]),c=[8.2,5.2,5.2]}else if(r==="foundry")o(new Wt(4.8,5.4,1,32),this.materials.concrete,[0,.5,0]),o(new he(3.2,.5,16,96),n,[0,2.7,0],[Math.PI/2,0,0],[1,1.4,1]),o(new Wt(3.2,3.2,3.3,32,1,!0),this.materials.darkGlass,[0,2.55,0]),o(new pt(7.4,.28,.34),this.materials.gold,[0,4.5,-2.9]),o(new Wt(.34,.48,5.6,18),this.materials.roof,[3.25,3.4,1.4]),o(new he(1.15,.12,8,32),this.materials.gold,[-2.8,3,.2],[Math.PI/2,0,0]),c=[8.4,4.8,6.4];else if(r==="tower"){o(new Wt(3,4,1,8),n,[0,.5,0]);for(let u=0;u<5;u+=1){const d=2.45-u*.16;o(new Wt(d,d+.18,1.55,8),u%2?this.materials.darkGlass:n,[0,1.35+u*1.42,0],[0,Math.PI/8,0]),o(new he(d+.08,.045,8,64),l,[0,2.12+u*1.42,0],[Math.PI/2,0,0])}o(new Fn(1.55,2.2,8),this.materials.neonRed,[0,9.1,0]),o(new he(3.2,.06,8,80),this.materials.neonRed,[0,6.4,0],[Math.PI/2,0,0]),o(new he(4,.04,8,80),this.materials.neonRed,[0,7.2,0],[Math.PI/2,0,0]),c=[7,8.8,7]}else if(r==="office"){o(new pt(8.6,1.6,6),this.materials.concrete,[0,.8,0]),o(new pt(5,10.8,3.8),this.materials.darkGlass,[.4,6.2,.15]),o(new pt(2.8,8.2,3.5),n,[-3,4.9,.2]),o(new pt(1.3,6.2,3.2),this.materials.glass,[3.3,4.1,-.1]);for(let u=2.1;u<11.2;u+=1.05)o(new pt(5.25,.045,.08),l,[.4,u,-1.86]);for(const u of[-1.7,-.65,.4,1.45,2.5])o(new pt(.055,10.6,3.95),this.materials.concrete,[u,6.15,.15]);o(new pt(4.7,.18,1.1),this.materials.gold,[0,1.8,-3.25]),c=[8.8,11,6.2]}else if(r==="terminal"){o(new Wt(3.9,4.2,.7,32),n,[0,.35,0]),o(new Wt(2.7,3.2,2,24),this.materials.darkGlass,[0,1.7,0]);for(let u=0;u<6;u+=1){const d=u*Math.PI/3;o(new De(1.4,.86),l,[Math.sin(d)*2.76,2.1,Math.cos(d)*2.76],[0,d,0])}o(new he(2.95,.05,8,64),this.materials.neonGreen,[0,2.85,0],[Math.PI/2,0,0]),c=[6.2,3.2,6.2]}else if(r==="library"){o(new pt(9.6,1,6.2),this.materials.limestone,[0,.5,0]),o(new pt(8.7,3.4,5.1),this.materials.brick,[0,2.2,.2]),o(new pt(4.6,4.4,5.6),this.materials.limestone,[0,2.8,-.1]),o(new pt(10.2,.55,6.4),this.materials.roof,[0,5.05,.05]);for(let u=-3;u<=3;u+=1)o(new Wt(.18,.24,3.7,18),this.materials.limestone,[u*.86,2.35,-3.12]);for(const u of[-3.25,-2.05,2.05,3.25])this.addWindowStack(t,u,2.7,-2.85,3,this.materials.darkGlass);o(new he(1.05,.08,10,48,Math.PI),this.materials.limestone,[0,3,-3.2],[0,0,Math.PI]),o(new Wt(.92,1.05,1.9,20),this.materials.limestone,[0,6.05,-.1]),o(new Fn(1.1,1.05,4),this.materials.roof,[0,7.5,-.1],[0,Math.PI/4,0]),o(new Ni(.42,32),this.materials.gold,[0,6.25,-1.08]),c=[10.4,6.2,6.6]}else if(r==="trophy"){o(new Wt(3.4,4,.9,32),this.materials.concrete,[0,.45,0]),o(new Wt(.55,.78,2.2,28),this.materials.gold,[0,1.9,0]),o(new ni(1.65,32,16,0,Math.PI*2,0,Math.PI*.64),this.materials.gold,[0,3.5,0],[Math.PI,0,0]);for(const u of[-1,1])o(new he(.95,.11,12,48),this.materials.gold,[u*1.55,3.55,0],[0,Math.PI/2,0]);o(new ss(.75,0),l,[0,5.15,0]),c=[5.6,4.9,5.6]}else if(r==="vault"){o(new Wt(3.4,3.8,4.4,18,1,!1,0,Math.PI),n,[0,2.2,0],[0,Math.PI/2,0]),o(new pt(6.8,3.9,3.2),n,[0,1.95,.8]),o(new he(1.65,.18,16,64),this.materials.gold,[0,2.15,-2.05]),o(new Wt(.22,.22,.42,20),this.materials.gold,[0,2.15,-2.28],[Math.PI/2,0,0]);for(const u of[-1.8,1.8])o(new pt(.8,1.05,.08),this.materials.neonBlue,[u,2.65,-2.15]);c=[7.2,4.5,4.8]}else if(r==="board"){o(new pt(7.4,.42,1.2),this.materials.woodDark,[0,.21,0]),o(new pt(7.8,3.1,.28),this.materials.wood,[0,2.35,-.2]);for(let u=0;u<12;u+=1){const d=o(new De(.72,.52),new qt({color:[16768906,14221202,9633770,16751469][u%4]}),[-3+u%6*1.18,2+Math.floor(u/6)*.72,-.36]);d.rotation.z=(u%3-1)*.08}c=[8.2,3.4,1.6]}else if(r==="gate"){for(const u of[-2.6,2.6])o(new Wt(.38,.54,5.6,16),n,[u,2.8,0]);o(new he(2.7,.16,12,64,Math.PI),l,[0,5.45,0],[0,0,Math.PI]),o(new pt(5.5,.34,.5),this.materials.gold,[0,5.38,0]),c=[0,0,0]}else if(r==="post"){o(new Wt(1.45,1.9,5.6,20),n,[0,2.8,0]),o(new Wt(.18,.24,7.4,16),this.materials.concrete,[0,6.5,0]);for(const u of[4.3,6,7.4])o(new he(1.85,.055,8,64),l,[0,u,0],[Math.PI/2,0,0]);o(new he(1.05,.08,8,32),l,[1.6,6.1,0],[Math.PI/3,.4,0]),c=[4.4,6.4,4.4]}else if(r==="rampyard"){o(new pt(7.2,3.2,4.6),n,[0,1.6,0]),o(new Wt(3.7,3.7,4.8,24,1,!0,0,Math.PI),this.materials.roof,[0,3.4,0],[0,Math.PI/2,0]),o(new pt(4.7,1.8,.18),this.materials.darkGlass,[0,1.35,-2.42]);for(const u of[-2.7,0,2.7])o(new Fn(.34,1,12),new Gt({color:16742957,roughness:.65}),[u,.5,3.2]);c=[7.8,3.8,5]}else if(r==="pier"){o(new pt(9.8,.48,6.2),this.materials.wood,[0,.34,0]);for(const u of[-4.2,-1.4,1.4,4.2])o(new Wt(.18,.22,2,10),this.materials.woodDark,[u,1,2.55]),o(new Wt(.18,.22,2,10),this.materials.woodDark,[u,1,-2.55]);o(new Wt(.65,.85,4.2,16),n,[0,2.35,.1]),o(new Fn(1.05,1.4,16),this.materials.neonGreen,[0,5.15,.1]),o(new he(2.1,.05,8,64),this.materials.neonGreen,[0,3.8,.1],[Math.PI/2,0,0]),c=[9.8,1,6.2]}else r==="farm"?(this.createMinecraftFarm(t,o),c=[0,0,0]):r==="portal"&&(o(new Wt(3.4,3.8,.55,28),this.materials.concrete,[0,.28,0]),o(new he(2.5,.28,16,96),l,[0,3.2,0],[0,Math.PI/2,0]),o(new he(1.65,.08,10,72),this.materials.neonBlue,[0,3.2,0],[0,Math.PI/2,0]),c=[6.2,1,2.4]);return c}addWindowGrid(t,e,n){for(let s=0;s<e;s+=1)for(let r=-1;r<=1;r+=1){const a=new Tt(new De(.55,.36),n);a.position.set(r*1.1,1.7+s*.9,-2.62),t.add(a)}}addWindowStack(t,e,n,s,r,a){for(let o=0;o<r;o+=1){const l=new Tt(new De(.58,.48),a);l.position.set(e,n+o*.82,s),t.add(l)}}addSignalRings(t,e,n,s,r,a=2){for(let o=0;o<a;o+=1){const l=new Tt(new he(1.25+o*.68,.035,8,56),new qt({color:r,transparent:!0,opacity:.3-o*.055,depthWrite:!1}));l.position.set(e,n+o*.18,s),l.rotation.x=Math.PI/2,t.add(l),this.decor.push({type:"signalRing",mesh:l,phase:o*.4})}}createMinecraftFarm(t,e){const n=new Gt({color:5216837,roughness:.82}),s=new Gt({color:7950639,roughness:.9}),r=new qt({color:3974911,transparent:!0,opacity:.74}),a=new Gt({color:4827470,roughness:.85}),o=new Gt({color:10185277,roughness:.82});for(let h=-5;h<=5;h+=1)for(let p=-4;p<=4;p+=1){const g=Math.abs(p)===1?r:Math.abs(h)===5||Math.abs(p)===4?n:s;if(e(new pt(.98,.5,.98),g,[h,.25,p]),g===s&&(h+p)%2===0){const S=e(new pt(.2,.42,.2),a,[h-.18,.72,p-.14]),m=e(new pt(.62,.22,.62),a,[h+.08,.94,p+.08]);S.castShadow=!1,m.castShadow=!1}}for(const h of[-4.8,4.8])e(new pt(11.8,.22,.22),o,[0,1.12,h]),e(new pt(11.8,.22,.22),o,[0,1.68,h]);for(const h of[-5.8,5.8])e(new pt(.22,.22,9.8),o,[h,1.12,0]),e(new pt(.22,.22,9.8),o,[h,1.68,0]);for(const h of[-5.8,-2.8,0,2.8,5.8])for(const p of[-4.8,4.8])e(new pt(.34,2,.34),o,[h,1,p]);const l=e(new pt(4.8,2.2,.22),this.materials.woodDark,[0,2.25,-6]);l.castShadow=!0;for(const h of[-1.9,1.9])e(new pt(.22,2.5,.22),o,[h,1.2,-6.05]);const c=document.createElement("canvas");c.width=512,c.height=256;const u=new zn(c);u.colorSpace=Me;const d=new Tt(new De(4.15,1.45),new qt({map:u,transparent:!0}));d.position.set(0,2.35,-6.13),d.rotation.y=Math.PI,t.add(d),this.potatoCounter={canvas:c,texture:u,ctx:c.getContext("2d")},this.setPotatoCount("--")}setPotatoCount(t){if(!this.potatoCounter)return;const{canvas:e,ctx:n,texture:s}=this.potatoCounter;n.clearRect(0,0,e.width,e.height),n.fillStyle="#1f1308",n.fillRect(0,0,e.width,e.height),n.fillStyle="#5f3b1f";for(let r=0;r<e.width;r+=32)n.fillRect(r,0,16,e.height);n.strokeStyle="#d8aa5d",n.lineWidth=16,n.strokeRect(12,12,e.width-24,e.height-24),n.fillStyle="#f8e2a7",n.textAlign="center",n.font="900 42px Inter, Arial, sans-serif",n.fillText("POTATOES",e.width/2,78),n.font="900 96px Inter, Arial, sans-serif",n.fillText(String(t),e.width/2,180),s.needsUpdate=!0}makeSmallLabel(t,e,n=384,s=128){const r=document.createElement("canvas");r.width=n,r.height=s;const a=r.getContext("2d");a.clearRect(0,0,n,s),a.fillStyle="rgba(3, 9, 15, 0.84)",Vs(a,8,18,n-16,s-36,14),a.fill(),a.strokeStyle=e,a.lineWidth=4,Vs(a,8,18,n-16,s-36,14),a.stroke(),a.fillStyle="#f2f8ff",a.font=`900 ${Math.round(s*.23)}px Inter, Arial, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(t,n/2,s/2,n-44);const o=new zn(r);return o.colorSpace=Me,new Fo(new Da({map:o,transparent:!0,depthWrite:!1}))}makeLabel(t,e,n){const s=document.createElement("canvas");s.width=768,s.height=192;const r=s.getContext("2d");r.clearRect(0,0,s.width,s.height),r.fillStyle="rgba(4, 9, 15, 0.78)",Vs(r,18,34,732,124,18),r.fill(),r.strokeStyle=`#${n.getHexString()}`,r.lineWidth=5,Vs(r,18,34,732,124,18),r.stroke(),r.fillStyle="#9fb6ca",r.font="800 26px Inter, Arial, sans-serif",r.textAlign="center",r.fillText(e.toUpperCase(),384,75),r.fillStyle="#f2f8ff",r.font="900 46px Inter, Arial, sans-serif",r.fillText(t,384,123,660);const a=new zn(s);a.colorSpace=Me;const o=new Fo(new Da({map:a,transparent:!0,depthWrite:!1}));return o.scale.set(9.5,2.38,1),o}createProps(){const t=new Gt({color:8215104,roughness:.78,metalness:.05}),e=new Gt({color:4016983,roughness:.42,metalness:.55});[[-92,.8,46],[-98,.8,50],[98,.8,46],[116,.8,-12],[12,.8,36],[-13,.8,-46],[136,.8,-126],[142,.8,-136],[5,.8,-132],[-7,.8,-135],[-118,.8,-124],[-142,.8,-132],[74,.8,86],[-74,.8,86],[44,.8,-84],[-44,.8,-84],[0,.8,122],[0,.8,-148]].forEach((d,h)=>{const p=h%3===0?[1.4,1.4,1.4]:[1.1,1.1,1.1],g=new Tt(new pt(...p),h%2?e:t);g.position.set(...d),g.castShadow=!0,g.receiveShadow=!0,this.scene.add(g);const S=this.physics.createDynamicBox(d,p,{density:.35,restitution:.24});this.physics.bindVisual(S,g)});const s=[[-140,112,.15,8079927],[-112,142,-.25,5398895],[75,126,.35,8085325],[128,82,-.2,5992319],[-92,-102,.42,8079927],[116,-98,-.32,5398895]];for(const[d,h,p,g]of s){const S=new Ge;S.position.set(d,0,h),S.rotation.y=p;const m=new Tt(new pt(4.6,2.6,4.1),new Gt({color:g,roughness:.78,metalness:.04}));m.position.y=1.3,m.castShadow=!0,S.add(m);const f=new Tt(new Fn(3.35,1.55,4),this.materials.roof);f.position.y=3.35,f.rotation.y=Math.PI/4,f.castShadow=!0,S.add(f);const v=new Tt(new pt(.8,1.2,.08),this.materials.dark);v.position.set(0,.9,-2.1),S.add(v),this.scene.add(S),this.physics.createFixedBox([d,1.35,h],[4.7,2.7,4.2],{rotation:[0,p,0],friction:.82,restitution:.08})}const r=[[-142,120,38,42],[142,58,30,44],[-128,-96,42,56],[134,-84,34,52],[10,-142,72,28],[-20,122,62,34],[-150,18,24,92],[148,20,28,88],[-42,42,58,36],[48,-38,62,38],[-66,-4,44,44],[20,132,48,20]];let a=0;for(let d=0;d<700&&a<78;d+=1){const h=d<360,p=r[d%r.length],g=h?p[0]+(Mn(d*11)-.5)*p[2]:(Mn(d*23)-.5)*(Xt*1.76),S=h?p[1]+(Mn(d*17)-.5)*p[3]:(Mn(d*29)-.5)*(Xt*1.76);if(Math.abs(g)>Xt-7||Math.abs(S)>Xt-7)continue;const m=new I(g,0,S);if(Ac(g,S,10.5)||this.zones.some(E=>Zn(m,E.position)<E.radius+15))continue;const f=new Ge;f.position.set(g,0,S);const v=new Tt(new Wt(.2,.34,2.8,8),this.materials.trunk);v.position.y=1.4,v.castShadow=!0,f.add(v);for(let E=0;E<4;E+=1){const y=new Tt(new ni(1.05+E%2*.24,12,8),E%2?this.materials.leafLight:this.materials.leaf);y.position.set((E-1.5)*.56,3+E*.42,(E%2-.5)*.58),y.scale.set(1.15,.86,1.1),y.castShadow=!0,f.add(y)}this.scene.add(f),this.decor.push({type:"tree",mesh:f,phase:a*.37}),a+=1}const o=new De(.08,.75);o.translate(0,.37,0);const l=new qt({color:6666333,side:Oe,transparent:!0,opacity:.62}),c=new Vh(o,l,850),u=new se;for(let d=0;d<850;d+=1){const h=(Mn(d*19)-.5)*300,p=(Mn(d*31)-.5)*300;Ac(h,p,3.25)||(u.compose(new I(h,.05,p),new nn().setFromEuler(new qe(0,Mn(d*7)*Math.PI,0)),new I(.7+Mn(d*13)*.8,.7+Mn(d*23)*.9,1)),c.setMatrixAt(d,u))}c.instanceMatrix.needsUpdate=!0,this.scene.add(c),this.decor.push({type:"grassBlades",mesh:c,phase:0})}createCollectibles(){const t=[[-72,1.4,82],[-118,1.4,76],[86,1.4,86],[136,1.4,72],[-146,1.4,-88],[-92,1.4,-142],[92,1.4,-142],[146,1.4,-88],[-26,1.4,-152],[26,1.4,-152],[-18,1.4,126],[18,1.4,126]],e=new qt({color:8191922,transparent:!0,opacity:.86});t.forEach((n,s)=>{const r=new Tt(new ss(.72,0),e.clone());r.position.set(...n),this.scene.add(r),this.collectibles.push({id:`shard-${s}`,mesh:r,position:new I(...n),collected:localStorage.getItem(`portfolio-drive-shard-${s}`)==="1",phase:s*.44}),this.collectibles[s].collected&&(r.visible=!1)})}createAtmosphere(){const t=[];for(let n=0;n<450;n+=1)t.push((Math.random()-.5)*320,1.2+Math.random()*8,(Math.random()-.5)*320);const e=new Ae;e.setAttribute("position",new ue(t,3)),this.dust=new Xh(e,new Qc({color:16769188,size:.08,transparent:!0,opacity:.22,depthWrite:!1})),this.scene.add(this.dust)}checkBoostPad(t){for(const e of this.boostPads)if(e.cooldown<=0&&Zn(t,e.position)<5.6)return e.cooldown=1.2,e;return null}checkRampAir(t,e){return e<3.4?!1:this.ramps.some(n=>Zn(t,n.position)<n.radius)}checkCollectibles(t){const e=[];for(const n of this.collectibles)!n.collected&&Zn(t,n.position)<4.2&&(n.collected=!0,n.mesh.visible=!1,localStorage.setItem(`portfolio-drive-${n.id}`,"1"),e.push(n));return e}getCollectedCount(){return this.collectibles.filter(t=>t.collected).length}spawnPotato(){const e=this.zones.find(u=>u.id==="potato")?.position||new I(95,0,142),n=e.x+(Math.random()-.5)*7,s=e.z+(Math.random()-.5)*5,r=new Ge;r.position.set(n,.9,s),r.rotation.set(Math.random()*.2,Math.random()*Math.PI,Math.random()*.2);const a=new Tt(new pt(.78,.52,.92),this.materials.potato);a.castShadow=!0,r.add(a);const o=new Gt({color:9396011,roughness:.9,metalness:.01});for(let u=0;u<4;u+=1){const d=new Tt(new pt(.16,.12,.16),o);d.position.set((Math.random()-.5)*.55,.08+Math.random()*.2,(Math.random()-.5)*.7),r.add(d)}const l=new Tt(new pt(.18,.46,.18),new Gt({color:5217102,roughness:.9}));l.position.set(.12,.45,-.1),r.add(l),this.scene.add(r);const c=this.physics.createDynamicBox([n,.9,s],[.82,.58,.96],{density:.16,restitution:.28,friction:.82,angularDamping:.35});if(c.applyImpulse({x:(Math.random()-.5)*1.6,y:1.2+Math.random()*1.8,z:(Math.random()-.5)*1.6},!0),this.physics.bindVisual(c,r),this.potatoes.push({group:r,body:c}),this.potatoes.length>70){const u=this.potatoes.shift();this.scene.remove(u.group),this.physics.dynamicVisuals=this.physics.dynamicVisuals.filter(d=>d.object!==u.group);try{this.physics.world.removeRigidBody(u.body)}catch{}}return r}nearestZone(t){let e=null,n=1/0;for(const s of this.zones){const r=Zn(t,s.position);r<n&&(e=s,n=r)}return e&&n<=e.radius?{zone:e,distance:n}:null}getRespawnPose(t="landing"){const e=this.zones.find(u=>u.id===t)||this.zones[0],n=e.colliderSize?.[2]||0,s=e.colliderSize?.[0]||0,r=Math.max(e.radius+4,n/2+5.5),a=Math.max(e.radius+4,s/2+5.5),o=Xt-12,l=[{offset:new I(0,1.45,r),heading:0},{offset:new I(0,1.45,-r),heading:Math.PI},{offset:new I(a,1.45,0),heading:Math.PI/2},{offset:new I(-a,1.45,0),heading:-Math.PI/2}],c=l.find(({offset:u})=>{const d=e.position.x+u.x,h=e.position.z+u.z;return Math.abs(d)<o&&Math.abs(h)<o})||l[0];return{position:e.position.clone().add(c.offset),heading:c.heading}}getRespawnPosition(t="landing"){return this.getRespawnPose(t).position}startCircuit(t){this.circuit.active=!0,this.circuit.startedAt=t,this.circuit.checkpoint=1;for(let e=0;e<this.checkpoints.length;e+=1)this.checkpoints[e].ring.material.opacity=e===1?.85:.18}updateCircuit(t,e){if(!this.circuit.active)return null;const n=this.checkpoints[this.circuit.checkpoint];if(!n)return null;if(Zn(t,n.position)<6.5){if(this.circuit.checkpoint+=1,this.circuit.checkpoint>=this.checkpoints.length){const s=e-this.circuit.startedAt;this.circuit.active=!1,(!this.circuit.best||s<this.circuit.best)&&(this.circuit.best=s,localStorage.setItem("portfolio-drive-best-lap",String(s)));for(const r of this.checkpoints)r.ring.material.opacity=.34;return{finished:!0,lap:s}}for(let s=0;s<this.checkpoints.length;s+=1)this.checkpoints[s].ring.material.opacity=s===this.circuit.checkpoint?.85:.18;return{checkpoint:this.circuit.checkpoint}}return null}update(t,e,n){this.dust&&(this.dust.rotation.y+=t*.012);for(const s of this.decor)if(s.type==="dash")s.mesh.material.opacity=.28+Math.sin(e*2+s.phase)*.12;else if(s.type==="zone"){s.marker?.visible&&(s.marker.rotation.y+=t*1.8,s.marker.position.y+=Math.sin(e*2.4+s.phase)*.004),s.ring.material.opacity=.18+Math.sin(e*1.7+s.phase)*.05;const r=n?Zn(n,s.mesh.position):100;s.ring.scale.setScalar(r<13?1.05+Math.sin(e*7)*.04:1)}else s.type==="tree"?s.mesh.rotation.z=Math.sin(e*.7+s.phase)*.018:s.type==="ribbon"?s.mesh.material.opacity=.09+Math.sin(e+s.phase)*.04:s.type==="cloud"?(s.mesh.position.x+=t*(.7+s.phase%.4),s.mesh.position.x>285&&(s.mesh.position.x=-285)):s.type==="sunDisc"?s.mesh.material.opacity=.74+Math.sin(e*.35)*.08:s.type==="checkpoint"?s.mesh.rotation.z+=t*.8:s.type==="ocean"?(s.mesh.material.uniforms?.uTime&&(s.mesh.material.uniforms.uTime.value=e),s.mesh.position.y=Tc+Math.sin(e*.45)*.025):s.type==="buoy"?(s.mesh.position.y=.38+Math.sin(e*1.4+s.phase)*.18,s.mesh.rotation.y+=t*.45):s.type==="boostPad"?(s.mesh.material.opacity=.28+Math.sin(e*5+s.phase)*.14,s.arrow.rotation.y+=t*1.8):s.type==="rampStripe"||s.type==="rail"?s.mesh.material.opacity=.34+Math.sin(e*2+s.phase)*.14:s.type==="signalRing"?(s.mesh.rotation.z+=t*.55,s.mesh.scale.setScalar(1+Math.sin(e*1.6+s.phase)*.06)):s.type==="grassBlades"&&(s.mesh.material.opacity=.52+Math.sin(e*.9)*.08);for(const s of this.boostPads)s.cooldown=Math.max(0,s.cooldown-t);for(const s of this.collectibles)s.collected||(s.mesh.rotation.y+=t*1.4,s.mesh.position.y=s.position.y+Math.sin(e*2.2+s.phase)*.26,s.mesh.material.opacity=.62+Math.sin(e*3+s.phase)*.22)}}function Zn(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function Ac(i,t,e=0){return eo.some(([n,s,r,a,o=0])=>{const l=i-n,c=t-s,u=Math.cos(o),d=Math.sin(o),h=l*u-c*d,p=l*d+c*u;return Math.abs(h)<=r*.5+e&&Math.abs(p)<=a*.5+e})}function P0(i,t,e=1){const n=new Ni(1,64),s=n.attributes.position;for(let r=1;r<s.count;r+=1){const a=s.getX(r),o=s.getY(r),l=Math.atan2(o,a),u=1+(Math.sin(l*3.1+e)*.075+Math.cos(l*5.3+e*.7)*.055+Math.sin(l*9+e*1.4)*.025);s.setXY(r,a*i*.5*u,o*t*.5*u)}return s.needsUpdate=!0,n.computeVertexNormals(),n}function I0(){const i=document.createElement("canvas");i.width=256,i.height=256;const t=i.getContext("2d"),e=t.createRadialGradient(128,128,22,128,128,128);e.addColorStop(0,"rgb(255,255,255)"),e.addColorStop(.58,"rgb(230,230,230)"),e.addColorStop(.82,"rgb(108,108,108)"),e.addColorStop(1,"rgb(0,0,0)"),t.fillStyle=e,t.fillRect(0,0,i.width,i.height);for(let n=0;n<900;n+=1){const s=170+Math.random()*85;t.fillStyle=`rgb(${s},${s},${s})`,t.globalAlpha=.04+Math.random()*.08,t.beginPath(),t.arc(Math.random()*i.width,Math.random()*i.height,1+Math.random()*4,0,Math.PI*2),t.fill()}return t.globalAlpha=1,new zn(i)}function Rc(i,t=256,e=1200){const n=document.createElement("canvas");n.width=t,n.height=t;const s=n.getContext("2d");s.fillStyle=i[0],s.fillRect(0,0,t,t);for(let a=0;a<e;a+=1){s.fillStyle=i[a%i.length];const o=.6+Math.random()*2.4;s.globalAlpha=.18+Math.random()*.42,s.beginPath(),s.arc(Math.random()*t,Math.random()*t,o,0,Math.PI*2),s.fill()}s.globalAlpha=1;const r=new zn(n);return r.colorSpace=Me,r}function D0(){const i=document.createElement("canvas");i.width=96,i.height=256;const t=i.getContext("2d");t.fillStyle="#252b2f",t.fillRect(0,0,i.width,i.height);for(let n=0;n<900;n+=1){const s=28+Math.random()*30;t.fillStyle=`rgba(${s}, ${s+4}, ${s+8}, ${.16+Math.random()*.18})`,t.fillRect(Math.random()*i.width,Math.random()*i.height,1+Math.random()*2,1+Math.random()*2)}const e=new zn(i);return e.colorSpace=Me,e}function L0(){return new sn({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uDeep:{value:new Ct(482186)},uShallow:{value:new Ct(3717080)}},vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vUv = uv;
        vec3 p = position;
        float wave = sin(p.x * 0.035 + uTime * 0.9) * 0.055 + cos(p.y * 0.04 + uTime * 0.7) * 0.04;
        p.z += wave;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        float foam = smoothstep(0.38, 0.52, sin((vUv.x + vUv.y) * 80.0 + uTime * 1.4) * 0.5 + 0.5);
        vec3 color = mix(uDeep, uShallow, 0.42 + vWave * 0.35);
        color += foam * 0.08;
        gl_FragColor = vec4(color, 0.82);
      }
    `})}function Mn(i){const t=Math.sin(i*999.91)*43758.5453;return t-Math.floor(t)}function Vs(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.lineTo(t+n-r,e),i.quadraticCurveTo(t+n,e,t+n,e+r),i.lineTo(t+n,e+s-r),i.quadraticCurveTo(t+n,e+s,t+n-r,e+s),i.lineTo(t+r,e+s),i.quadraticCurveTo(t,e+s,t,e+s-r),i.lineTo(t,e+r),i.quadraticCurveTo(t,e,t+r,e),i.closePath()}class U0{constructor({game:t,achievements:e,audio:n}){this.game=t,this.achievements=e,this.audio=n,this.projectIndex=0,this.activeTab="options",this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.refs={loading:document.getElementById("loading"),titleScreen:document.getElementById("title-screen"),startButton:document.getElementById("start-button"),zoneReadout:document.getElementById("zone-readout"),speedReadout:document.getElementById("speed-readout"),prompt:document.getElementById("interaction-prompt"),promptKind:document.getElementById("prompt-kind"),promptTitle:document.getElementById("prompt-title"),promptAction:document.getElementById("prompt-action"),panel:document.getElementById("panel"),panelKind:document.getElementById("panel-kind"),panelTitle:document.getElementById("panel-title"),panelBody:document.getElementById("panel-body"),panelActions:document.getElementById("panel-actions"),panelClose:document.getElementById("panel-close"),menu:document.getElementById("menu"),menuButton:document.getElementById("menu-button"),menuClose:document.getElementById("menu-close"),menuContent:document.getElementById("menu-content"),mapModal:document.getElementById("map-modal"),mapButton:document.getElementById("map-button"),mapClose:document.getElementById("map-close"),worldMap:document.getElementById("world-map"),worldMapLayer:document.getElementById("world-map-layer"),mapZoomIn:document.getElementById("map-zoom-in"),mapZoomOut:document.getElementById("map-zoom-out"),mapReset:document.getElementById("map-reset"),mapStatus:document.getElementById("map-status"),minimap:document.getElementById("minimap"),minimapWorld:document.getElementById("minimap-world"),notifications:document.getElementById("notifications"),soundButton:document.getElementById("sound-button")},this.setup()}setup(){this.refs.startButton.addEventListener("click",()=>this.game.startDriving()),this.refs.panelClose.addEventListener("click",()=>this.closePanel()),this.refs.menuButton.addEventListener("click",()=>this.toggleMenu()),this.refs.menuClose.addEventListener("click",()=>this.closeMenu()),this.refs.mapButton.addEventListener("click",()=>this.toggleMap()),this.refs.mapClose.addEventListener("click",()=>this.closeMap()),this.refs.mapZoomIn.addEventListener("click",()=>this.zoomMap(.22)),this.refs.mapZoomOut.addEventListener("click",()=>this.zoomMap(-.22)),this.refs.mapReset.addEventListener("click",()=>this.resetMapView()),this.setupMapDrag(),this.refs.soundButton.addEventListener("click",()=>{this.audio.resume();const t=this.audio.toggleMute();this.refs.soundButton.textContent=t?"Muted":"Sound",this.notify(t?"Sound muted":"Sound enabled")}),document.querySelectorAll(".menu-tabs button").forEach(t=>{t.addEventListener("click",()=>{this.activeTab=t.dataset.tab,this.renderMenu()})}),this.achievements.onUnlock=t=>{this.notify(`Achievement unlocked: ${t.title}`)},this.renderMap(),this.renderMinimap(),this.renderMenu()}markLoaded(){this.refs.loading.classList.add("is-hidden")}hideTitle(){this.refs.titleScreen.hidden=!0,document.body.classList.add("is-driving")}showPrompt(t){if(!t||this.isPanelOpen()){this.refs.prompt.hidden=!0;return}this.refs.promptKind.textContent=t.kind,this.refs.promptTitle.textContent=t.name,t.potatoFarm?this.refs.promptAction.textContent="Press P to summon. Press E for farm log":this.refs.promptAction.textContent=t.startsCircuit?"Press E to start circuit":"Press E to interact",this.refs.prompt.hidden=!1}hidePrompt(){this.refs.prompt.hidden=!0}openZone(t){if(this.audio.click(),this.achievements.visitZone(t),this.game.recordZoneVisit(t),t.startsCircuit&&this.game.startCircuit(),t.projectGallery){this.openProjectGallery(t);return}const e=this.game.getZoneLines(t);this.refs.panelKind.textContent=t.kind,this.refs.panelTitle.textContent=t.name,Kn(this.refs.panelBody),Kn(this.refs.panelActions);for(const n of e){const s=document.createElement("p");s.textContent=n,this.refs.panelBody.append(s)}if(t.potatoFarm){const n=document.createElement("p");n.className="panel-muted",n.textContent=`Farm counter: ${this.game.analytics?.potatoCountLabel||"--"}`,this.refs.panelBody.append(n);const s=Gr("Summon Potato",()=>this.game.summonPotato());this.refs.panelActions.append(s)}if(t.id==="data-pier"){const n=document.createElement("p");n.className="panel-muted",n.textContent=this.game.analytics?.isEnabled?"Signal collection is active.":"Signal collection is offline.",this.refs.panelBody.append(n)}this.addActions(t.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(t)}openProjectGallery(t){this.refs.panelKind.textContent=t.kind,this.refs.panelTitle.textContent=t.name,Kn(this.refs.panelBody),Kn(this.refs.panelActions);const e=this.game.resumeData.projects||[],n=e[this.projectIndex%e.length]||"Project data unavailable.",s=document.createElement("span");s.className="project-counter",s.textContent=`${this.projectIndex+1} / ${e.length}`;const r=document.createElement("h3"),[a,o=""]=n.split(": ");r.textContent=a;const l=document.createElement("p");l.textContent=o||n;const c=document.createElement("p");c.className="panel-muted",c.textContent="Use Previous and Next to browse the project record from the resume data.",this.refs.panelBody.append(s,r,l,c);const u=Gr("Previous",()=>{this.projectIndex=(this.projectIndex-1+e.length)%e.length,this.openProjectGallery(t)}),d=Gr("Next",()=>{this.projectIndex=(this.projectIndex+1)%e.length,this.openProjectGallery(t)});this.refs.panelActions.append(u,d),this.addActions(t.actions||[]),this.refs.panel.hidden=!1,this.game.focusZone(t)}addActions(t){for(const e of t){const n=document.createElement("a");n.href=e.href,n.textContent=e.label,n.target="_blank",n.rel="noopener noreferrer",this.refs.panelActions.append(n)}}closePanel(){this.refs.panel.hidden=!0,this.game.clearFocus()}isPanelOpen(){return!this.refs.panel.hidden||!this.refs.menu.hidden||!this.refs.mapModal.hidden}toggleMenu(){this.refs.menu.hidden?this.openMenu():this.closeMenu()}openMenu(){this.audio.click(),this.refs.menu.hidden=!1,this.renderMenu()}closeMenu(){this.refs.menu.hidden=!0}toggleMap(){this.refs.mapModal.hidden?this.openMap():this.closeMap()}openMap(){this.audio.click(620),this.refs.mapModal.hidden=!1,this.renderMap()}closeMap(){this.refs.mapModal.hidden=!0}setupMapDrag(){const t=this.refs.worldMap;t.addEventListener("pointerdown",n=>{n.target.closest(".map-pin")||(this.mapState.dragging=!0,this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,t.setPointerCapture(n.pointerId))}),t.addEventListener("pointermove",n=>{if(!this.mapState.dragging)return;const s=n.clientX-this.mapState.lastX,r=n.clientY-this.mapState.lastY;this.mapState.lastX=n.clientX,this.mapState.lastY=n.clientY,this.mapState.x+=s,this.mapState.y+=r,this.applyMapTransform()});const e=n=>{this.mapState.dragging=!1,t.hasPointerCapture(n.pointerId)&&t.releasePointerCapture(n.pointerId)};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("wheel",n=>{n.preventDefault(),this.zoomMap(n.deltaY>0?-.12:.12)},{passive:!1})}zoomMap(t){this.mapState.scale=Math.max(.8,Math.min(2.4,this.mapState.scale+t)),this.applyMapTransform()}resetMapView(){this.mapState={scale:1,x:0,y:0,dragging:!1,lastX:0,lastY:0},this.applyMapTransform()}applyMapTransform(){this.refs.worldMapLayer.style.transform=`translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`,this.refs.mapStatus.textContent=`Zoom ${Math.round(this.mapState.scale*100)}%`}renderMenu(){document.querySelectorAll(".menu-tabs button").forEach(t=>{t.classList.toggle("is-active",t.dataset.tab===this.activeTab)}),Kn(this.refs.menuContent),this.activeTab==="options"?this.renderOptions():this.activeTab==="controls"?this.renderControls():this.activeTab==="achievements"?this.renderAchievements():this.renderAbout()}renderOptions(){const t=document.createElement("div");t.className="menu-grid",t.append(Hs("Respawn","Move the car back to the Start Hub.",()=>{this.game.respawn(),this.closeMenu()}),Hs("Reset Props","Put loose objects back near their starting positions.",()=>{this.game.resetWorld(),this.notify("World props reset")}),Hs("Sound",this.audio.muted?"Currently muted.":"Currently enabled.",()=>{const e=this.audio.toggleMute();this.refs.soundButton.textContent=e?"Muted":"Sound",this.renderMenu()}),Hs("Reset Achievements","Clear local achievement progress for this browser.",()=>{this.achievements.reset(),this.renderMenu(),this.notify("Achievements reset")})),this.refs.menuContent.append(t)}renderControls(){const t=[["WASD / Arrows","Drive"],["Shift","Boost"],["Ctrl / B","Brake"],["Space","Jump"],["E / Enter","Interact"],["P","Summon potato at the farm"],["M","Map"],["R","Respawn"],["Mouse drag","Move camera"],["Gamepad","Left stick, A interact, B boost, Y jump"]],e=document.createElement("div");e.className="control-grid";for(const[n,s]of t){const r=document.createElement("span");r.textContent=n;const a=document.createElement("strong");a.textContent=s,e.append(r,a)}this.refs.menuContent.append(e)}renderAchievements(){const t=this.achievements.getProgress(),e=document.createElement("p");e.className="panel-muted",e.textContent=`${t.unlocked}/${t.total} unlocked. Distance driven: ${Math.round(t.distance)} m.`;const n=document.createElement("div");n.className="achievement-list";for(const s of this.achievements.definitions){const r=document.createElement("div");r.className="achievement",r.classList.toggle("is-unlocked",this.achievements.unlocked.has(s.id));const a=document.createElement("strong");a.textContent=s.title;const o=document.createElement("span");o.textContent=s.description,r.append(a,o),n.append(r)}this.refs.menuContent.append(e,n)}renderAbout(){const t=["Three.js renders the island. Rapier handles the driving physics.","Resume content, project stops, contact links, and counters are connected directly to the portfolio."];for(const e of t){const n=document.createElement("p");n.textContent=e,this.refs.menuContent.append(n)}}renderMap(){Kn(this.refs.worldMapLayer),this.renderMapBase(this.refs.worldMapLayer,"map");for(const t of Fa){const e=document.createElement("button");e.type="button",e.className="map-pin";const n=Gs(t.position[0],t.position[2]);e.style.left=`${n.x}%`,e.style.top=`${n.y}%`,e.style.setProperty("--pin-color",t.color),e.textContent=t.name,e.title=`${t.name} - ${t.kind}`,e.addEventListener("click",()=>{this.game.respawn(t.id),this.closeMap()}),this.refs.worldMapLayer.append(e)}this.mapPlayer=document.createElement("span"),this.mapPlayer.className="map-player",this.refs.worldMapLayer.append(this.mapPlayer),this.applyMapTransform()}renderMinimap(){Kn(this.refs.minimapWorld),this.renderMapBase(this.refs.minimapWorld,"minimap");for(const t of Fa){const e=document.createElement("span");e.className="minimap-pin";const n=Gs(t.position[0],t.position[2]);e.style.left=`${n.x}%`,e.style.top=`${n.y}%`,e.style.setProperty("--pin-color",t.color),this.refs.minimapWorld.append(e)}this.minimapPlayer=document.createElement("span"),this.minimapPlayer.className="minimap-player",this.refs.minimapWorld.append(this.minimapPlayer)}renderMapBase(t,e){const n=document.createElement("div");n.className=`${e}-island`,t.append(n);for(const[s,r,a,o,l=0]of eo){const c=document.createElement("span");c.className=`${e}-road`;const u=Gs(s,r);c.style.left=`${u.x}%`,c.style.top=`${u.y}%`,c.style.width=`${a/(Xt*2+as*2)*100}%`,c.style.height=`${o/(Xt*2+as*2)*100}%`,c.style.transform=`translate(-50%, -50%) rotate(${l}rad)`,t.append(c)}}update({speed:t,activeZone:e,circuit:n}){this.refs.speedReadout.textContent=`${Math.round(Math.abs(t)*3.6)} km/h`,this.refs.zoneReadout.textContent=e?e.name:"Road",this.refs.soundButton.textContent=this.audio.muted?"Muted":"Sound",this.showPrompt(e),n?.active&&(this.refs.zoneReadout.textContent=`Circuit ${n.checkpoint}/${this.game.world.checkpoints.length-1}`),this.updateMapMarkers(e)}updateMapMarkers(t){const e=this.game.vehicle.position,n=Gs(e.x,e.z),s=this.game.vehicle.heading||0;this.mapPlayer&&(this.mapPlayer.style.left=`${n.x}%`,this.mapPlayer.style.top=`${n.y}%`,this.mapPlayer.style.transform=`translate(-50%, -50%) rotate(${s}rad)`),this.minimapPlayer&&(this.minimapPlayer.style.left=`${n.x}%`,this.minimapPlayer.style.top=`${n.y}%`,this.minimapPlayer.style.transform=`translate(-50%, -50%) rotate(${s}rad)`),document.querySelectorAll(".map-pin").forEach(r=>{r.classList.toggle("is-active",t&&r.textContent===t.name)})}notify(t){const e=document.createElement("div");e.className="notification",e.textContent=t,this.refs.notifications.append(e),setTimeout(()=>e.classList.add("is-visible"),20),setTimeout(()=>{e.classList.remove("is-visible"),setTimeout(()=>e.remove(),260)},3600)}setPotatoCount(t){this.game.world?.setPotatoCount?.(t)}}function Gs(i,t){const e=Xt*2+as*2;return{x:(i+Xt+as)/e*100,y:(t+Xt+as)/e*100}}function Kn(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Gr(i,t){const e=document.createElement("button");return e.type="button",e.textContent=i,e.addEventListener("click",t),e}function Hs(i,t,e){const n=document.createElement("button");n.type="button",n.className="option-tile";const s=document.createElement("strong");s.textContent=i;const r=document.createElement("span");return r.textContent=t,n.append(s,r),n.addEventListener("click",e),n}class N0{constructor(t){this.RAPIER=t,this.canvas=document.getElementById("play-canvas"),this.scene=new Lh,this.camera=new He(58,window.innerWidth/window.innerHeight,.1,900),this.renderer=new t0({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.ticker=new e0,this.started=!1,this.activeZone=null,this.resumeData=null,this.lights={}}async init(){this.resumeData=await this.fetchResumeData(),this.setupRenderer(),this.setupScene(),this.input=new n0(this.canvas),this.audio=new i0,this.achievements=new c0,this.physics=new f0(this.RAPIER),this.world=new C0({scene:this.scene,physics:this.physics,resumeData:this.resumeData}),this.vehicle=new m0({scene:this.scene,physics:this.physics,achievements:this.achievements,audio:this.audio}),this.cameraRig=new T0(this.camera,this.vehicle,this.input),this.analytics=new h0,this.ui=new U0({game:this,achievements:this.achievements,audio:this.audio}),this.analytics.init().then(()=>{Number.isFinite(this.analytics.potatoCount)&&this.ui.setPotatoCount(this.analytics.potatoCount)}).catch(()=>{}),this.setupEvents(),this.setupDebug(),this.ui.markLoaded(),this.renderer.setAnimationLoop(t=>this.loop(t))}async fetchResumeData(){const t=await fetch("resume_data.json",{cache:"no-store"});if(!t.ok)throw new Error(`Unable to load resume_data.json: ${t.status}`);return t.json()}setupRenderer(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=es,this.renderer.outputColorSpace=Me,this.renderer.toneMapping=Ba,this.renderer.toneMappingExposure=1.08}setupScene(){this.scene.background=new Ct(9427455),this.scene.fog=new Za(12185087,110,430),this.camera.position.set(0,9,-18);const t=new tu(16777215,2910773,2.45);this.scene.add(t);const e=new $o(16774351,3.25);e.position.set(-52,72,-46),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=-190,e.shadow.camera.right=190,e.shadow.camera.top=190,e.shadow.camera.bottom=-190,e.shadow.camera.near=1,e.shadow.camera.far=360,this.scene.add(e);const n=new $o(9361919,.85);n.position.set(38,26,42),this.scene.add(n),this.lights={hemi:t,sun:e,rim:n}}setupEvents(){window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>{document.hidden?this.audio?.context?.suspend?.():this.audio?.resume()})}setupDebug(){window.__portfolioDrive={game:this,sampleCanvas:()=>{const t=this.renderer.getContext(),e=Math.max(1,Math.min(16,this.renderer.domElement.width)),n=Math.max(1,Math.min(16,this.renderer.domElement.height)),s=new Uint8Array(e*n*4);return t.readPixels(0,0,e,n,t.RGBA,t.UNSIGNED_BYTE,s),Array.from(s).reduce((r,a)=>r+a,0)},ready:()=>!!(this.world&&this.vehicle&&this.renderer),start:()=>this.startDriving(),respawn:t=>this.respawn(t),summonPotato:()=>this.summonPotato(),nearest:()=>this.activeZone?.name||null}}startDriving(){this.started=!0,this.audio.resume(),this.ui.hideTitle(),this.ui.notify("Drive started")}loop(t){this.ticker.tick(t);const e=this.ticker.delta,n=this.ticker.elapsed;this.input.update(),this.handleGlobalInput();const s=this.vehicle.position,r=this.world.nearestZone(s);this.activeZone=r?.zone||null;const a=this.started&&!this.ui.isPanelOpen();this.physics.step(e,l=>{if(a){this.vehicle.update(this.input,l);const c=this.world.checkBoostPad(this.vehicle.position);if(c&&(this.vehicle.boostFromPad(c),this.ui?.notify?.("Boost pad launched")),this.world.checkCollectibles(this.vehicle.position).length){const d=this.world.getCollectedCount();this.ui?.notify?.(`Data shard ${d}/${this.world.collectibles.length}`),d===this.world.collectibles.length&&this.achievements.unlock("data_shards")}}}),a||(this.vehicle.body.setLinvel({x:this.vehicle.body.linvel().x*.94,y:this.vehicle.body.linvel().y,z:this.vehicle.body.linvel().z*.94},!0),this.vehicle.syncModel()),this.world.update(e,n,this.vehicle.position),this.world.checkRampAir(this.vehicle.position,this.vehicle.body.linvel().y)&&this.achievements.unlock("ramp_jump"),this.updateLighting(n),this.cameraRig.update(e),this.audio.update(this.vehicle.speed),this.ui.update({speed:this.vehicle.speed,activeZone:this.activeZone,circuit:this.world.circuit});const o=this.world.updateCircuit(this.vehicle.position,n);o?.finished?this.ui.notify(`Circuit finished: ${F0(o.lap)}`):o?.checkpoint&&(this.audio.click(700),this.ui.notify(`Checkpoint ${o.checkpoint}`)),this.renderer.render(this.scene,this.camera),this.input.clearTransient()}handleGlobalInput(){if(!this.started&&this.input.consume("interact")){this.startDriving();return}this.input.consume("menu")&&this.ui.toggleMenu(),this.input.consume("map")&&this.ui.toggleMap(),this.input.consume("potato")&&!this.ui.isPanelOpen()&&this.summonPotato(),this.input.consume("interact")&&this.activeZone&&!this.ui.isPanelOpen()&&this.ui.openZone(this.activeZone)}recordZoneVisit(t){this.analytics?.recordZone(t?.id)}async summonPotato(){const t=this.world.zones.find(r=>r.id==="potato");if(!t)return;const e=this.vehicle.position;if(!(Math.hypot(e.x-t.position.x,e.z-t.position.z)<=t.radius+6)){this.ui?.notify?.("Drive to the Potato Farm to summon one");return}this.world.spawnPotato(),this.achievements.unlock("potato_summon"),this.audio.click(190),this.ui?.notify?.("Potato summoned");const s=await this.analytics?.recordPotatoSummon?.();Number.isFinite(s)&&(this.ui.setPotatoCount(s),this.ui.notify(`Potato counter: ${s}`))}updateLighting(t){const e=Math.sin(t*.035)*.5+.5;this.lights.sun.intensity=2.7+e*.65,this.lights.rim.intensity=.55+(1-e)*.5,this.scene.fog.color.lerpColors(new Ct(12185087),new Ct(15202559),e*.32)}getZoneLines(t){return t.lines?t.lines:t.dialogueId&&this.resumeData.dialogues?.[t.dialogueId]?this.resumeData.dialogues[t.dialogueId].lines||[]:["Information for this area is being prepared."]}focusZone(t){const e=t.position.clone().add(new I(7.5,7.2,9.5)),n=t.position.clone().add(new I(0,2.4,0));this.cameraRig.setCinematic(e,n)}clearFocus(){this.cameraRig.clearCinematic()}respawn(t="landing"){const e=this.world.getRespawnPose(t);this.vehicle.respawn(e.position,e.heading),this.audio.click(420)}resetWorld(){this.physics.resetDynamicVisuals()}startCircuit(){this.world.startCircuit(this.ticker.elapsed),this.achievements.unlock("circuit_gate"),this.ui.notify("Circuit started")}resize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1)}}function F0(i){const t=Math.floor(i/60),e=i-t*60;return`${t}:${e.toFixed(2).padStart(5,"0")}`}async function O0(){const{default:i}=await Sl(async()=>{const{default:e}=await import("./rapier.es-DJpruFyo.js");return{default:e}},[],import.meta.url);await i.init({}),await new N0(i).init()}O0().catch(i=>{console.error("Portfolio Drive failed to boot:",i);const t=document.getElementById("loading");t&&(t.innerHTML='<span class="boot-error">World failed to load. Check the console.</span>')});
