import{R as s,c as e}from"./vidstack-EIUG4XP7-sXSBqrmX.js";import{a as r}from"./app-BmIOdE9I.js";var p=class extends s{constructor(i,t){super(i,t),this.$$PROVIDER_TYPE="AUDIO",r(()=>{this.airPlay=new e(this.media,t)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}};export{p as AudioProvider};