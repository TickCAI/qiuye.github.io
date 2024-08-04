(()=>{var o=class{constructor(t){this.box=null;this.boxSize={width:0,height:0};this.rows=0;this.dataList=[];this.indexs=[];this.idMap={};this.avatar=!1;this.speed=20;this.height=36;this.gapWidth=20;this.gapHeight=20;this.delayRange=5e3;this.align="center";this.animates=new Map;this.stageAnimates=new Map;this.timeouts=new Map;this.update(t)}_divisor(t){let i=.5;switch(t){case"half":i=.5;break;case"top":i=1/3;break;case"full":i=1;break;default:break}return i}_initBarrageList(){if(!this.box.querySelector(".barrage-list")){let t=document.createElement("div");t.className="barrage-list",t.setAttribute("style",`gap:${this.gapHeight}px;justify-content: ${this.align};display: flex;height: 100%;flex-direction: column;overflow: hidden;`);for(let i=0;i<this.rows;i++){let e=document.createElement("div");e.className=`barrage-list-${i}`,e.setAttribute("style",`height:${this.height}px;position:relative;`),t.appendChild(e),this.dataList[i]=[]}this.box.appendChild(t)}}_pushOne(t){let i=this.dataList.map(a=>a.length),e=Math.min(...i),s=i.findIndex(a=>a===e);this.dataList[s].push(t)}_pushList(t){this._sliceRowList(this.rows,t).forEach((e,s)=>{this.dataList[s]?this.dataList[s]=this.dataList[s].concat(...e):this.dataList[s]=e})}_sliceRowList(t,i){let e=[],s=Math.round(i.length/t);for(let a=0;a<t;a++){let h=[];a===t-1?h=i.slice(a*s):a===0?h=i.slice(0,s):h=i.slice(a*s,(a+1)*s),e.push(h)}return e}_dispatchItem(t,i,e){if(!t||this.idMap[t.id])return;this.idMap[t.id]=t.id;let s=this.box.querySelector(`.barrage-list-${i}`),a=document.createElement("div");a.className="danmu-item",a.setAttribute("style",` height:${this.height}px; padding: ${this.avatar?"4px 8px 4px 4px":"4px 8px"}; display:inline-flex; position: absolute; right: 0; background-color: var(--trm-danmu-bg-color,#fff); color: var(--trm-danmu-color,#000); border-radius: 32px; align-items: center; transform: translateX(100%);`),a.innerHTML=`
					${this.avatar?`<img class="danmu-avatar" style="display: inline-block;width:${this.height-8}px;height:${this.height-8}px;border-radius:50%;margin-right:6px;" src="${t.avatar}">`:""}
					<div class="danmu-text" style="text-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.text}</div>`,s.appendChild(a);let{width:h}=a.getBoundingClientRect();a.style.width=`${h}px`;let d=(this.boxSize.width+h)/this.speed*1e3,u=(h+this.gapWidth)/(this.boxSize.width+h)*d;if(e<this.dataList[i].length){let r=a.animate({transform:["translateX(100%)",`translateX(-${this.gapWidth}px)`]},{duration:u});r.onfinish=()=>{this.stageAnimates.delete(r),this.indexs[i]=e+1,this._dispatchItem(this.dataList[i][e+1],i,e+1)},this.stageAnimates.set(r,r)}let n=a.animate({transform:["translateX(100%)",`translateX(-${this.boxSize.width}px)`]},{duration:d,fill:"forwards"});n.onfinish=()=>{this.animates.delete(n),a.remove(),a=null},this.animates.set(n,n)}_run(){let t=this.dataList.length;for(let i=0;i<t;i++){let e=this.dataList[i],s=this.indexs[i];if(!s&&s!==0&&(s=this.indexs[i]=0),e[s]){let a=setTimeout(()=>{this._dispatchItem(e[s],i,s),this.timeouts.delete(a)},Math.random()*this.delayRange);this.timeouts.set(a,a)}}}pause(){return this.animates.forEach(t=>t.pause()),this.stageAnimates.forEach(t=>t.pause()),this}play(){return this.animates.forEach(t=>t.play()),this.stageAnimates.forEach(t=>t.play()),this}cancel(){return this.animates.forEach(t=>t.cancel()),this.stageAnimates.forEach(t=>t.cancel()),this.timeouts.forEach(t=>clearTimeout(t)),this.animates.clear(),this.stageAnimates.clear(),this.timeouts.clear(),this}reset(){return this.dataList=[],this.indexs=[],this.idMap={},this.cancel(),this.box.querySelector(".barrage-list")&&this.box.removeChild(this.box.querySelector(".barrage-list")),this}update(t){let i=document.querySelector(t.el);if(i){let e=i.getBoundingClientRect();this.box=i,this.boxSize=e,this.speed=t.speed??this.speed,this.gapWidth=t.gapWidth??this.gapWidth,this.gapHeight=t.gapHeight??this.gapHeight,this.avatar=t.avatar??this.avatar,this.height=t.height??this.height,this.delayRange=t.delayRange??this.delayRange,this.align=t.align??this.align,this.rows=parseInt((e.height*this._divisor(t.mode??"half")/(this.height+this.gapHeight)).toString()),this.reset()}else throw new Error(`\u672A\u627E\u5230\u5BB9\u5668 ${t.el}`);return this}pushData(t){switch(this._initBarrageList(),Object.prototype.toString.apply(t)){case"[object Object]":this._pushOne(t);break;case"[object Array]":this._pushList(t);break}return this._run(),this}},c=new o(window.ASYNC_CONFIG.danmu);window.danMu=async l=>{c.update(window.ASYNC_CONFIG.danmu).pushData(await l()),window.ASYNC_CONFIG.swup&&document.addEventListener("swup:contentReplaced",async function(){c.update(window.ASYNC_CONFIG.danmu).pushData(await l())})};})();