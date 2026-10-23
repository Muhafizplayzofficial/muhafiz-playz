(()=>{
const C=window.MP||{};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const app=$("#app"),qs=new URLSearchParams(location.search),P=document.body.dataset.page;
if(!C.SUPABASE_URL||C.SUPABASE_URL.includes("PASTE")){app.innerHTML='<div class="box"><h2>Setup baaki hai</h2><p>config.js mein Supabase URL aur key paste karein.</p></div>';return}
const sb=supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
const D={site_name:"Muhafiz Playz",tagline:"Urdu Subtitled Dramas, Series and Movies",email:"",whatsapp:"",facebook:"",telegram:"",youtube:"",instagram:"",adsense_client:"",ad_slot:"",ga_id:"",announcement:"",
home_title:"Watch the Latest Dramas with Urdu Subtitles",
home_content:`## Welcome to Muhafiz Playz Official
Muhafiz Playz Official is a home for viewers who love historical dramas, epic series and powerful stories told with clear Urdu subtitles. Every series has its own page with the full story, episode list, cast notes and quick links, so you never have to search through scattered posts to find the next episode.

## How to watch and download
Open any series, choose your season and tap the episode you want. On the episode page you can switch between Server 1 and Server 2 to play the video right on the page. If one server is slow, the other usually works. Download buttons for 720p, 1080p and Bluray quality are listed below the player whenever they are available.

## Why viewers choose Muhafiz Playz
- Urdu subtitles that make the story, dialogue and politics easy to follow
- A full episode guide for every season on one page
- Two playback servers for every episode
- Download links in several qualities
- New episodes added regularly, with detailed notes for each one

## Stay updated
Bookmark this site and share it with friends and family on WhatsApp, Facebook and Telegram. New seasons and episodes appear in the Latest Episodes list on the home page as soon as they are published.`,
faq:[["How can I watch an episode?","Open the series, pick the episode, and press Server 1 or Server 2 to play it on the page."],["Can I download episodes?","Yes. Where available, each episode page has Download buttons for 720p, 1080p and Bluray."],["The video does not play. What should I do?","Switch to the other server. If both fail, refresh the page or try again later."],["Are Urdu subtitles included?","Yes. Episodes are listed with Urdu subtitles."]]};
let S={...D},SER=[],EPS=[],CATS=[];
const md=t=>{let o="",p=[],l=[];const f=()=>{if(p.length)o+=`<p>${p.join(" ")}</p>`;if(l.length)o+=`<ul>${l.join("")}</ul>`;p=[];l=[]};
for(const r of esc(t||"").split("\n")){const s=r.trim();
if(!s)f();else if(s.startsWith("### ")){f();o+=`<h3>${s.slice(4)}</h3>`}else if(s.startsWith("## ")){f();o+=`<h2>${s.slice(3)}</h2>`}else if(s.startsWith("- ")){if(p.length){o+=`<p>${p.join(" ")}</p>`;p=[]}l.push(`<li>${s.slice(2)}</li>`)}else{if(l.length){o+=`<ul>${l.join("")}</ul>`;l=[]}p.push(s)}}
f();return o.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")};
const plain=(t,n=170)=>{const s=String(t||"").replace(/^#+ .*$/gm,"").replace(/[*\-]/g," ").replace(/\s+/g," ").trim();return s.length>n?s.slice(0,n-1)+"…":s};
const intro=s=>String(s.description||"").split(/\n\s*##/)[0];
const abs=u=>!u?location.origin+"/og-default.jpg":/^https?:/.test(u)?u:new URL(u,location.href).href;
const ago=d=>{const m=(Date.now()-new Date(d))/6e4;if(m<60)return Math.max(1,Math.floor(m))+" min ago";if(m<1440)return Math.floor(m/60)+" hours ago";if(m<43200)return Math.floor(m/1440)+" days ago";return new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})};
const pic=(u,alt,cls="")=>u?`<img class="pic ${cls}" src="${esc(u)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.opacity=0">`:`<div class="pic ph ${cls}">${esc(alt)}</div>`;
const sOf=id=>SER.find(s=>s.id===id),eOf=sid=>EPS.filter(e=>e.series_id===sid).sort((a,b)=>(a.season-b.season)||(a.number-b.number));
const sUrl=s=>`series.html?s=${encodeURIComponent(s.slug)}`,eUrl=e=>`watch.html?id=${e.id}`,cUrl=n=>`category.html?c=${slug(n)}`;
const eTitle=(e,s)=>e.title||`${s.title} Episode ${e.number}`;
const pad=n=>String(n).padStart(2,"0");
const meta=(k,v,p)=>{let e=$(`meta[${p?"property":"name"}="${k}"]`);if(!e){e=document.createElement("meta");e.setAttribute(p?"property":"name",k);document.head.appendChild(e)}e.content=v};
function seo(t,d,img,ld){const u=location.origin+location.pathname+location.search;document.title=t;meta("description",d);meta("og:title",t,1);meta("og:description",d,1);meta("og:image",abs(img),1);meta("og:url",u,1);meta("og:type","website",1);meta("twitter:card","summary_large_image");
let l=$("link[rel=canonical]");if(!l){l=document.createElement("link");l.rel="canonical";document.head.appendChild(l)}l.href=u;
if(ld){const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(ld);document.head.appendChild(s)}}
const ad=()=>S.adsense_client&&S.ad_slot?`<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(S.adsense_client)}" data-ad-slot="${esc(S.ad_slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`:"";
const addScript=(src,attrs={})=>{const s=document.createElement("script");s.src=src;s.async=true;Object.entries(attrs).forEach(([k,v])=>s.setAttribute(k,v));document.head.appendChild(s)};
const catList=()=>{const n={};SER.forEach(s=>{if(s.category)n[s.category]=(n[s.category]||0)+1});const o=CATS.map(c=>c.name);Object.keys(n).forEach(k=>{if(!o.includes(k))o.push(k)});return o.filter(k=>n[k]).map(k=>[k,n[k]])};
const grid=l=>`<div class="grid">${l.map(s=>`<a class="pc" href="${sUrl(s)}">${pic(s.poster||s.banner,s.title)}<h3>${esc(s.title)}</h3><p>${esc(s.category||"")}${s.year?", "+esc(s.year):""}</p></a>`).join("")}</div>`;
const rows=l=>`<div class="rows">${l.map(e=>{const s=sOf(e.series_id);return s?`<a class="rc" href="${eUrl(e)}">${pic(e.thumb||s.banner||s.poster,s.title)}<div><h3>${esc(eTitle(e,s))} with Urdu Subtitles</h3><small>${ago(e.created_at)}</small></div></a>`:""}).join("")}</div>`;
const faq=l=>l.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
const faqLd=l=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:l.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))});
const missing=()=>{seo("Page not found | "+S.site_name+" Official","This page could not be found.");app.innerHTML=`<div class="box"><h1>Page not found</h1><p>Ye page maujood nahi hai.</p><a class="btn" href="index.html">Home par jayein</a></div>`};

function chrome(){
$("#hdr").innerHTML=(S.announcement?`<div class="ann">${esc(S.announcement)}</div>`:"")+`<div class="hd"><button id="mb" aria-label="Menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><a class="brand" href="index.html" aria-label="${esc(S.site_name)} Official home"><span class="bt"><b>${esc(S.site_name.toUpperCase())}</b><i>OFFICIAL</i></span><img src="logo.png" alt="${esc(S.site_name)} logo" width="44" height="44"></a><button id="sb" aria-label="Search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button></div><form id="sf" class="sf" action="search.html"><input name="q" placeholder="Drama ya episode dhoondhein" aria-label="Search" value="${esc(qs.get("q")||"")}"></form>
<div class="dim" id="dim"></div><aside class="dr" id="dr"><a class="brand" href="index.html"><img src="logo.png" alt="" width="44" height="44"><span class="bt" style="align-items:flex-start"><b>${esc(S.site_name.toUpperCase())}</b><i>OFFICIAL</i></span></a>
<h3>Menu</h3><div class="cats"><a href="index.html">Home</a><a href="category.html?c=all">All Series</a></div><h3>Categories</h3><div class="cats">${catList().map(([n,c])=>`<a href="${cUrl(n)}">${esc(n)}<b>${c}</b></a>`).join("")||'<p class="muted">Abhi koi category nahi.</p>'}</div>
<h3>Pages</h3><div class="cats">${[["about","About Us"],["contact","Contact Us"],["disclaimer","Disclaimer"],["dmca","DMCA"],["privacy","Privacy Policy"],["terms","Terms and Conditions"]].map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</div></aside>`;
const dr=$("#dr"),dim=$("#dim"),tg=o=>{dr.classList.toggle("on",o);dim.classList.toggle("on",o)};
$("#mb").onclick=()=>tg(true);dim.onclick=()=>tg(false);
$("#sb").onclick=()=>{$("#sf").classList.toggle("on");$("#sf input").focus()};
if(qs.get("q"))$("#sf").classList.add("on");
const soc=[["facebook","Facebook"],["telegram","Telegram"],["youtube","YouTube"],["instagram","Instagram"]].filter(([k])=>S[k]).map(([k,v])=>`<a href="${esc(S[k])}" target="_blank" rel="noopener">${v}</a>`).join("");
$("#ftr").innerHTML=`<footer>${soc?`<p>${soc}</p>`:""}<p>${[["about","About Us"],["contact","Contact Us"],["disclaimer","Disclaimer"],["dmca","DMCA"],["privacy","Privacy Policy"],["terms","Terms and Conditions"]].map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</p><p>© ${new Date().getFullYear()} ${esc(S.site_name)} Official. All rights reserved.</p></footer>`;
}
const share=()=>{const u=encodeURIComponent(location.href),t=encodeURIComponent(document.title);return`<div class="share"><a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">Facebook</a><a href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener">X</a><a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">WhatsApp</a><a href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" rel="noopener">Telegram</a></div>`};

function home(){
const f=SER.find(s=>s.featured)||SER[0],n=S.site_name;
seo(`${n} Official | ${S.home_title}`,`Watch and download the latest dramas and series with Urdu subtitles on ${n} Official. Full episode lists, Server 1, Server 2, 720p, 1080p and Bluray links.`,null,{"@context":"https://schema.org","@type":"WebSite",name:n+" Official",url:location.origin+"/",potentialAction:{"@type":"SearchAction",target:location.origin+"/search.html?q={q}","query-input":"required name=q"}});
const cl=catList();
app.innerHTML=(f?`<section class="hero" style="${f.banner||f.poster?`background-image:url('${esc(f.banner||f.poster)}')`:""}"><div><span class="chip">${esc(f.category||"Featured")}</span><h1>${esc(f.title)} with Urdu Subtitles</h1><p>${esc(plain(intro(f),200))}</p><a class="btn" href="${sUrl(f)}">Watch All Episodes</a></div></section>`:`<div class="box"><h1>${esc(S.home_title)}</h1><p>Abhi koi drama add nahi hua. Admin dashboard se pehla drama add karein.</p></div>`)+
ad()+(EPS.length?`<section class="sec"><h2>Latest Episodes</h2>${rows(EPS.slice(0,12))}</section>`:"")+
(SER.length?`<section class="sec"><h2>Popular Series</h2>${grid(SER.slice(0,12))}</section>`:"")+ad()+
`<div class="two"><div><section class="box prose"><h1>${esc(S.home_title)}</h1>${md(S.home_content)}</section>`+
SER.slice(0,6).map(s=>`<article class="art"><h2>${esc(s.title)} with Urdu Subtitles</h2>${pic(s.banner||s.poster,s.title)}<div class="prose">${md(intro(s))}</div><a class="btn" href="${sUrl(s)}">All ${esc(s.title)} Episodes</a></article>`).join("")+
`<section class="sec"><h2>Frequently Asked Questions</h2>${faq(D.faq)}</section></div>
<aside><div class="box"><h2>Categories</h2><div class="cats">${cl.map(([c,k])=>`<a href="${cUrl(c)}">${esc(c)}<b>${k}</b></a>`).join("")||'<p class="muted">Jald aa rahi hain.</p>'}</div></div></aside></div>`;
{const l=document.createElement("script");l.type="application/ld+json";l.textContent=JSON.stringify(faqLd(D.faq));document.head.appendChild(l)}
}

function series(){
const s=SER.find(x=>x.slug===qs.get("s"));if(!s)return missing();
const eps=eOf(s.id),seas=[...new Set(eps.map(e=>e.season))];
seo(`${s.title} Urdu Subtitles All Episodes | ${S.site_name} Official`,plain(intro(s),155)||`Watch all episodes of ${s.title} with Urdu subtitles.`,s.banner||s.poster,{"@context":"https://schema.org","@type":"TVSeries",name:s.title,description:plain(intro(s),300),image:abs(s.poster||s.banner),numberOfEpisodes:eps.length,inLanguage:"ur"});
const rel=SER.filter(x=>x.id!==s.id&&x.category===s.category).slice(0,6);
const qa=[[`Where can I watch ${s.title} with Urdu subtitles?`,`All available episodes of ${s.title} are listed on this page. Pick a season and tap an episode to watch it or download it.`],[`How many episodes of ${s.title} are available?`,`${eps.length} episode${eps.length==1?" is":"s are"} available right now. New episodes are added as soon as they are ready.`],[`Can I download ${s.title}?`,"Yes. Each episode page has download buttons for the qualities that are available."]];
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}${esc(s.title)}</div>
<h1>${esc(s.title)} with Urdu Subtitles</h1><p class="meta">${s.category?`<span class="chip">${esc(s.category)}</span>`:""}${s.year?esc(s.year)+" · ":""}${esc(s.status||"")}${s.status?" · ":""}${eps.length} episodes</p>
${pic(s.banner||s.poster,s.title,"hb")}${ad()}
<section class="box"><h2>Episodes of ${esc(s.title)}</h2>${seas.length>1?`<div class="tabs">${seas.map((n,i)=>`<button class="tab${i?"":" on"}" data-s="${n}">Season ${n}</button>`).join("")}</div>`:""}
${seas.map((n,i)=>`<div class="eps" data-sn="${n}" ${i?"hidden":""}>${eps.filter(e=>e.season===n).map((e,j,a)=>`<a href="${eUrl(e)}">Episode ${pad(e.number)}${j==a.length-1&&n==seas[seas.length-1]?"<small>Latest</small>":""}</a>`).join("")}</div>`).join("")||'<p class="muted">Episodes jald add honge.</p>'}</section>
<section class="box prose"><h2>About ${esc(s.title)}</h2>${md(s.description)}</section>${ad()}
<section class="sec"><h2>Frequently Asked Questions</h2>${faq(qa)}</section>
${rel.length?`<section class="sec"><h2>More ${esc(s.category)}</h2>${grid(rel)}</section>`:""}${share()}`;
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.classList.toggle("on",x===b));$$("[data-sn]").forEach(x=>x.hidden=x.dataset.sn!=b.dataset.s)});
const l=document.createElement("script");l.type="application/ld+json";l.textContent=JSON.stringify(faqLd(qa));document.head.appendChild(l);
}

function watch(){
const e=EPS.find(x=>x.id===+qs.get("id")),s=e&&sOf(e.series_id);if(!e||!s)return missing();
const sib=eOf(s.id),i=sib.findIndex(x=>x.id===e.id),pv=sib[i-1],nx=sib[i+1],t=eTitle(e,s),srv=[e.server1,e.server2];
const auto=`Watch ${t} online with Urdu subtitles on ${S.site_name} Official. Press Server 1 or Server 2 to play the episode on this page, and use the download buttons for 720p, 1080p or Bluray quality when they are available.`;
const body=e.details?md(e.details):`<p>${esc(auto)}</p>`+md(intro(s));
const words=String(e.details||auto).split(/\s+/).length;
seo(`${t} with Urdu Subtitles | ${S.site_name} Official`,plain(e.details||auto,155),e.thumb||s.banner||s.poster,{"@context":"https://schema.org","@type":"TVEpisode",name:t,episodeNumber:e.number,seasonNumber:e.season,image:abs(e.thumb||s.banner||s.poster),datePublished:e.created_at,description:plain(e.details||auto,300),inLanguage:"ur",partOfSeries:{"@type":"TVSeries",name:s.title}});
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}<a href="${sUrl(s)}">${esc(s.title)}</a> / Episode ${e.number}</div>
${s.category?`<span class="chip">${esc(s.category)}</span>`:""}<h1>${esc(t)} with Urdu Subtitles</h1><p class="meta">${esc(S.site_name)} Official · ${ago(e.created_at)} · ${Math.max(1,Math.round(words/180))} min read</p>
<section class="box"><div class="tabs"><button class="tab${e.server1||!e.server2?" on":""}" data-i="0" ${e.server1?"":"disabled"}>Server 1</button><button class="tab${!e.server1&&e.server2?" on":""}" data-i="1" ${e.server2?"":"disabled"}>Server 2</button></div>
<div id="pl">${srv[0]||srv[1]?`<iframe class="player" src="${esc(srv[0]||srv[1])}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`:'<div class="nop">Is episode ka player abhi add nahi hua.</div>'}</div><p class="muted">Video na chale to dusra server try karein.</p></section>
${ad()}<section class="box"><h2>Download ${esc(t)}</h2><div class="dl">${e.dl720?`<a href="${esc(e.dl720)}" target="_blank" rel="noopener nofollow">Download (720)</a>`:""}${e.dl1080?`<a href="${esc(e.dl1080)}" target="_blank" rel="noopener nofollow">Download (1080)</a>`:""}${e.dlbluray?`<a class="b" href="${esc(e.dlbluray)}" target="_blank" rel="noopener nofollow">Download Bluray</a>`:""}${e.dl720||e.dl1080||e.dlbluray?"":'<p class="muted">Download links jald add honge.</p>'}</div></section>
<section class="box prose pbody"><h2>${esc(t)} Details</h2>${body}</section>${ad()}
<div class="nav">${pv?`<a class="btn o" href="${eUrl(pv)}">Previous Episode</a>`:"<span></span>"}${nx?`<a class="btn" href="${eUrl(nx)}">Next Episode</a>`:""}</div>
<section class="box"><h2>All Episodes of ${esc(s.title)}</h2><div class="eps">${sib.map(x=>`<a href="${eUrl(x)}" class="${x.id===e.id?"cur":""}">${sib.some(y=>y.season!==x.season)?`S${x.season} `:""}Episode ${pad(x.number)}</a>`).join("")}</div></section>
<section class="sec"><h2>You May Also Like</h2>${grid(SER.filter(x=>x.id!==s.id).slice(0,6))}</section>${share()}`;
$$("#app .tab").forEach(b=>b.onclick=()=>{$$("#app .tab").forEach(x=>x.classList.toggle("on",x===b));$("#pl iframe").src=srv[b.dataset.i]});
}

function category(){
const c=qs.get("c")||"all",all=c==="all",l=all?SER:SER.filter(s=>slug(s.category)===c);
const name=all?"All Series":(l[0]?l[0].category:c);
if(!all&&!l.length)return missing();
seo(`${name} with Urdu Subtitles | ${S.site_name} Official`,`Watch ${name} with Urdu subtitles. Full episode lists and download links on ${S.site_name} Official.`);
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(name)}</div><h1>${esc(name)} with Urdu Subtitles</h1>${grid(l)||'<p class="muted">Abhi koi drama nahi.</p>'}${ad()}`;
}

function search(){
const q=(qs.get("q")||"").trim().toLowerCase();
seo(`Search ${q?"“"+q+"” ":""}| ${S.site_name} Official`,"Search dramas and episodes.");
const sr=q?SER.filter(s=>(s.title+" "+(s.category||"")).toLowerCase().includes(q)):[];
const er=q?EPS.filter(e=>{const s=sOf(e.series_id);return s&&eTitle(e,s).toLowerCase().includes(q)}).slice(0,24):[];
app.innerHTML=`<h1>Search results</h1>${!q?'<p class="muted">Upar search box mein naam likhein.</p>':!sr.length&&!er.length?`<div class="box"><p>“${esc(q)}” ke liye kuch nahi mila. Doosra naam try karein.</p></div>`:""}${sr.length?`<section class="sec"><h2>Series</h2>${grid(sr)}</section>`:""}${er.length?`<section class="sec"><h2>Episodes</h2>${rows(er)}</section>`:""}`;
}

function pageText(k){const n=S.site_name+" Official",c=[S.email&&`Email: ${S.email}`,S.whatsapp&&`WhatsApp: ${S.whatsapp}`,S.telegram&&`Telegram: ${S.telegram}`].filter(Boolean).join("\n");
return({
about:["About Us",`## Who we are\n${n} is a drama and series website made for viewers who enjoy historical and epic stories with Urdu subtitles. Our goal is simple: keep every series organized in one place, with clear episode lists, helpful details and easy access.\n\n## What you will find here\n- Series pages with full story details\n- Episode pages with Server 1 and Server 2 players\n- Download links in several qualities\n- Regular updates as new episodes arrive\n\n## Our promise\nWe work to keep the site fast, clean and easy to use on every phone and computer. If you have suggestions, please contact us.`],
contact:["Contact Us",`We would love to hear from you. Use the details below for suggestions, problems with a link, or content requests.\n\n${c||"Contact details jald add honge."}\n\n## Report a broken link\nTell us the series name and episode number, and we will fix it as soon as possible.`],
disclaimer:["Disclaimer",`## General information\nThe information and links on ${n} are provided for entertainment and general information only.\n\n## Third-party content\nVideos and downloads are provided by third-party services. ${n} does not own or control those services and is not responsible for their content or availability.\n\n## Copyright concerns\nIf you believe any content on this website violates your rights, please read our DMCA page and contact us.`],
dmca:["DMCA",`## Notice\n${n} respects the rights of content owners. If you are the owner of content and believe it appears on this site without permission, send us a notice and we will review it promptly.\n\n## What to include\n- Your name and contact details\n- The exact page link on this website\n- Proof that you own the content\n\n## Contact\n${c||"Please use the Contact Us page."}\n\nVerified content will be removed as soon as possible.`],
privacy:["Privacy Policy",`## Information we collect\n${n} does not ask visitors to create accounts. We may collect basic, non-personal information such as browser type, pages visited and approximate location through analytics tools.\n\n## Cookies and advertising\nThis site may use cookies and third-party advertising services, including Google AdSense. These services may use cookies to show ads based on your visits to this and other websites. You can manage ad personalization in your Google ad settings.\n\n## Third-party links\nOur pages may link to or embed third-party players and download services. We are not responsible for their privacy practices.\n\n## Your consent\nBy using this website you agree to this policy. We may update it from time to time on this page.`],
terms:["Terms and Conditions",`## Acceptance\nBy using ${n} you agree to these terms.\n\n## Use of the website\nYou may use this website for personal, non-commercial viewing. You agree not to misuse the site, disrupt its operation or attempt to access its admin areas.\n\n## Content and links\nWe do not guarantee that every link will always be available. Links and players may change or be removed without notice.\n\n## Changes\nWe may change these terms at any time. Continued use of the site means you accept the updated terms.`]})[k]}
function page(){
const k=qs.get("p")||"about",d=pageText(k);if(!d)return missing();
const t=S["page_"+k]?[d[0],S["page_"+k]]:d;
seo(`${t[0]} | ${S.site_name} Official`,plain(t[1],155));
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(t[0])}</div><section class="box prose"><h1>${esc(t[0])}</h1>${md(t[1])}</section>`;
}

(async()=>{
try{
const [a,b,c,d]=await Promise.all([sb.from("mp_series").select("*").eq("published",true).order("created_at",{ascending:false}),sb.from("mp_episodes").select("*").eq("published",true).order("created_at",{ascending:false}),sb.from("mp_categories").select("*").order("sort"),sb.from("mp_settings").select("*")]);
const er=[a,b,c,d].find(x=>x.error);if(er)throw er.error;
SER=a.data;EPS=b.data;CATS=c.data;d.data.forEach(r=>{if(r.value!=="")S[r.key]=r.value});
}catch(err){app.innerHTML=`<div class="box"><h2>Data load nahi hua</h2><p class="muted">${esc(err.message||err)}</p><p>Supabase SQL (supabase-setup.sql) chalayi hai? config.js ki values sahi hain?</p></div>`;return}
chrome();
if(S.ga_id){addScript("https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(S.ga_id));window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",S.ga_id)}
if(S.adsense_client)addScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+encodeURIComponent(S.adsense_client),{crossorigin:"anonymous"});
({home,series,watch,category,search,page}[P]||missing)();
if(S.adsense_client&&S.ad_slot)$$(".adsbygoogle").forEach(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
})();
})();
