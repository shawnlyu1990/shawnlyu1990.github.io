import{_}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,c as d,e as i,a as e,F as b,h as v,d as s,b as r,n as C,g as P,i as m,j as t,k as g,f as x,o as h,t as w}from"./app-DHY57aMg.js";const T={__name:"page.html",setup(u,{expose:l}){l();const a={MyComponent:m({setup(){const n=g("Hello world!"),p=o=>{n.value=o.target.value};return()=>[t("p",[t("span","Input: "),t("input",{value:n.value,onInput:p})]),t("p",[t("span","Output: "),n.value])]}}),defineComponent:m,h:t,ref:g};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}},M=e("p",null,[r("Content before "),e("code",null,"more"),r(" comment is regarded as page excerpt.")],-1),A=x(`<h2 id="page-title" tabindex="-1"><a class="header-anchor" href="#page-title"><span>Page Title</span></a></h2><p>The first H1 title in Markdown will be regarded as page title.</p><p>You can also set title in Markdown&#39;s Frontmatter:</p><div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" data-title="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Page Title</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="page-information" tabindex="-1"><a class="header-anchor" href="#page-information"><span>Page Information</span></a></h2><p>You can set page information in Markdown&#39;s Frontmatter.</p><ul><li>The author is Ms.Hope.</li><li>The writing date is January 1, 2020</li><li>Category is &quot;Guide&quot;</li><li>Tags are &quot;Page Config&quot; and &quot;Guide&quot;</li></ul><h2 id="page-content" tabindex="-1"><a class="header-anchor" href="#page-content"><span>Page Content</span></a></h2><p>You are free to write your Markdown here.</p><div class="hint-container tip"><p class="hint-container-title">Assets</p><ul><li>You can place images besides your Markdown files nd use <strong>relative links</strong>.</li><li>For images in <code>.vuepress/public</code> directory, please use absolute links (i.e.: starting with <code>/</code>).</li></ul></div><h2 id="components" tabindex="-1"><a class="header-anchor" href="#components"><span>Components</span></a></h2><p>Each markdown page is converted into a Vue component, which means you can use Vue syntax in Markdown:</p><p>2</p>`,13),B=e("p",null,"You can also create and import your own components.",-1),F=e("hr",null,null,-1),N=e("p",null,"The theme contains some useful components. Here are some examples:",-1),V=e("p",null,"A card:",-1);function H(u,l,f,a,n,p){const o=c("Badge"),k=c("VPCard");return h(),d("div",null,[M,i(" more "),A,i(" markdownlint-disable MD033 "),e("ul",null,[(h(),d(b,null,v(3,y=>e("li",null,w(y),1)),64))]),i(" markdownlint-enable MD033 "),B,s(a.MyComponent),F,N,e("ul",null,[e("li",null,[e("p",null,[r("A dark blue badge text badge at the end of line. "),s(o,{text:"Badge text",color:"#242378"})])]),e("li",null,[V,s(k,C(P({title:"Mr.Hope",desc:"Where there is light, there is hope",logo:"https://mister-hope.com/logo.svg",link:"https://mister-hope.com",background:"rgba(253, 230, 138, 0.15)"})),null,16)])])])}const Z=_(T,[["render",H],["__file","page.html.vue"]]),D=JSON.parse('{"path":"/demo/page.html","title":"Page Config","lang":"zh-CN","frontmatter":{"title":"Page Config","icon":"file","order":3,"author":"Ms.Hope","date":"2020-01-01T00:00:00.000Z","category":["Guide"],"tag":["Page config","Guide"],"sticky":true,"star":true,"footer":"Footer content for test","copyright":"No Copyright","description":"Content before more comment is regarded as page excerpt.","head":[["meta",{"property":"og:url","content":"https://shawnlyu1990.github.io/demo/page.html"}],["meta",{"property":"og:site_name","content":"博客演示"}],["meta",{"property":"og:title","content":"Page Config"}],["meta",{"property":"og:description","content":"Content before more comment is regarded as page excerpt."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-06T05:48:27.000Z"}],["meta",{"property":"article:author","content":"Ms.Hope"}],["meta",{"property":"article:tag","content":"Page config"}],["meta",{"property":"article:tag","content":"Guide"}],["meta",{"property":"article:published_time","content":"2020-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-06T05:48:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Page Config\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-06T05:48:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ms.Hope\\"}]}"]]},"headers":[{"level":2,"title":"Page Title","slug":"page-title","link":"#page-title","children":[]},{"level":2,"title":"Page Information","slug":"page-information","link":"#page-information","children":[]},{"level":2,"title":"Page Content","slug":"page-content","link":"#page-content","children":[]},{"level":2,"title":"Components","slug":"components","link":"#components","children":[]}],"git":{"createdTime":1722923307000,"updatedTime":1722923307000,"contributors":[{"name":"Shawn Lyu","email":"shawnlyu1990@gmail.com","commits":1}]},"readingTime":{"minutes":1.14,"words":341},"filePathRelative":"demo/page.md","localizedDate":"2020年1月1日","excerpt":"<p>Content before <code>more</code> comment is regarded as page excerpt.</p>\\n","autoDesc":true}');export{Z as comp,D as data};