"use strict";(self.webpackChunkobby_xiang_github_io=self.webpackChunkobby_xiang_github_io||[]).push([[3249],{5475:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var i=n(6540),a=n(4164),o=n(5500),r=n(7559),s=n(7131),l=n(6535),c=n(1902),d=n(1312),u=n(9022),m=n(4848);function g(e){const{nextItem:t,prevItem:n}=e;return(0,m.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,d.T)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[n&&(0,m.jsx)(u.A,{...n,subLabel:(0,m.jsx)(d.A,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),t&&(0,m.jsx)(u.A,{...t,subLabel:(0,m.jsx)(d.A,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function h(){const{assets:e,metadata:t}=(0,s.e)(),{title:n,description:i,date:a,tags:r,authors:l,frontMatter:c}=t,{keywords:d}=c,u=e.image??c.image;return(0,m.jsxs)(o.be,{title:n,description:i,keywords:d,image:u,children:[(0,m.jsx)("meta",{property:"og:type",content:"article"}),(0,m.jsx)("meta",{property:"article:published_time",content:a}),l.some((e=>e.url))&&(0,m.jsx)("meta",{property:"article:author",content:l.map((e=>e.url)).filter(Boolean).join(",")}),r.length>0&&(0,m.jsx)("meta",{property:"article:tag",content:r.map((e=>e.label)).join(",")})]})}var f=n(5260),p=n(6676);function v(){const e=(0,p.J)();return(0,m.jsx)(f.A,{children:(0,m.jsx)("script",{type:"application/ld+json",children:JSON.stringify(e)})})}var b=n(6342);function x(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const i=n.slice(2,e.level);e.parentIndex=Math.max(...i),n[e.level]=t}));const i=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):i.push(a)})),i}function j(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return t.flatMap((e=>{const t=j({toc:e.children,minHeadingLevel:n,maxHeadingLevel:i});return function(e){return e.level>=n&&e.level<=i}(e)?[{...e,children:t}]:t}))}function L(e){const t=e.getBoundingClientRect();return t.top===t.bottom?L(e.parentNode):t}function y(e,t){let{anchorTopOffset:n}=t;const i=e.find((e=>L(e).top>=n));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(L(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function A(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:t}}=(0,b.p)();return(0,i.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function C(e){const t=(0,i.useRef)(void 0),n=A();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:a,minHeadingLevel:o,maxHeadingLevel:r}=e;function s(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),s=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const i=[];for(let a=t;a<=n;a+=1)i.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:o,maxHeadingLevel:r}),l=y(s,{anchorTopOffset:n.current}),c=e.find((e=>l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===c)}))}return document.addEventListener("scroll",s),document.addEventListener("resize",s),s(),()=>{document.removeEventListener("scroll",s),document.removeEventListener("resize",s)}}),[e,n])}var k=n(8774);function N(e){let{toc:t,className:n,linkClassName:i,isChild:a}=e;return t.length?(0,m.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(k.A,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(N,{isChild:!0,toc:e.children,className:n,linkClassName:i})]},e.id)))}):null}const _=i.memo(N);function H(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:a="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:r,maxHeadingLevel:s,...l}=e;const c=(0,b.p)(),d=r??c.tableOfContents.minHeadingLevel,u=s??c.tableOfContents.maxHeadingLevel,g=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,i.useMemo)((()=>j({toc:x(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:d,maxHeadingLevel:u});return C((0,i.useMemo)((()=>{if(a&&o)return{linkClassName:a,linkActiveClassName:o,minHeadingLevel:d,maxHeadingLevel:u}}),[a,o,d,u])),(0,m.jsx)(_,{toc:g,className:n,linkClassName:a,...l})}const w={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},P="table-of-contents__link toc-highlight",O="table-of-contents__link--active";function I(e){let{className:t,...n}=e;return(0,m.jsx)("div",{className:(0,a.A)(w.tableOfContents,"thin-scrollbar",t),children:(0,m.jsx)(H,{...n,linkClassName:P,linkActiveClassName:O})})}var B=n(996);function E(e){let{sidebar:t,children:n}=e;const{metadata:i,toc:a}=(0,s.e)(),{nextItem:o,prevItem:r,frontMatter:d,unlisted:u}=i,{hide_table_of_contents:h,toc_min_heading_level:f,toc_max_heading_level:p}=d;return(0,m.jsxs)(l.A,{sidebar:t,toc:!h&&a.length>0?(0,m.jsx)(I,{toc:a,minHeadingLevel:f,maxHeadingLevel:p}):void 0,children:[u&&(0,m.jsx)(B.A,{}),(0,m.jsx)(c.A,{children:n}),(o||r)&&(0,m.jsx)(g,{nextItem:o,prevItem:r})]})}function M(e){const t=e.content;return(0,m.jsx)(s.i,{content:e.content,isBlogPostPage:!0,children:(0,m.jsxs)(o.e3,{className:(0,a.A)(r.G.wrapper.blogPages,r.G.page.blogPostPage),children:[(0,m.jsx)(h,{}),(0,m.jsx)(v,{}),(0,m.jsx)(E,{sidebar:e.sidebar,children:(0,m.jsx)(t,{})})]})})}},996:(e,t,n)=>{n.d(t,{A:()=>g});n(6540);var i=n(4164),a=n(1312),o=n(5260),r=n(4848);function s(){return(0,r.jsx)(a.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,r.jsx)(a.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,r.jsx)(o.A,{children:(0,r.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(7559),u=n(7293);function m(e){let{className:t}=e;return(0,r.jsx)(u.A,{type:"caution",title:(0,r.jsx)(s,{}),className:(0,i.A)(t,d.G.common.unlistedBanner),children:(0,r.jsx)(l,{})})}function g(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c,{}),(0,r.jsx)(m,{...e})]})}},6676:(e,t,n)=>{n.d(t,{k:()=>d,J:()=>u});var i=n(6025),a=n(4586),o=n(6803);var r=n(7131);const s=e=>new Date(e).toISOString();function l(e){const t=e.map(m);return{author:1===t.length?t[0]:t}}function c(e,t,n){return e?{image:g({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${n}`})}:{}}function d(e){const{siteConfig:t}=(0,a.A)(),{withBaseUrl:n}=(0,i.h)(),{metadata:{blogDescription:o,blogTitle:r,permalink:d}}=e,u=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":u,mainEntityOfPage:u,headline:r,description:o,blogPost:e.items.map((e=>function(e,t,n){const{assets:i,frontMatter:a,metadata:o}=e,{date:r,title:d,description:u,lastUpdatedAt:m}=o,g=i.image??a.image,h=a.keywords??[],f=`${t.url}${o.permalink}`,p=m?s(m):void 0;return{"@type":"BlogPosting","@id":f,mainEntityOfPage:f,url:f,headline:d,name:d,description:u,datePublished:r,...p?{dateModified:p}:{},...l(o.authors),...c(g,n,d),...h?{keywords:h}:{}}}(e.content,t,n)))}}function u(){const e=function(){const e=(0,o.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:n}=(0,r.e)(),{siteConfig:d}=(0,a.A)(),{withBaseUrl:u}=(0,i.h)(),{date:m,title:g,description:h,frontMatter:f,lastUpdatedAt:p}=n,v=t.image??f.image,b=f.keywords??[],x=p?s(p):void 0,j=`${d.url}${n.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":j,mainEntityOfPage:j,url:j,headline:g,name:g,description:h,datePublished:m,...x?{dateModified:x}:{},...l(n.authors),...c(v,u,g),...b?{keywords:b}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function m(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function g(e){let{imageUrl:t,caption:n}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:n}}}}]);