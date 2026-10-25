(()=>{
const C=window.MP||{};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const BASE=location.origin+location.pathname.replace(/\/[^/]*$/,"")+"/";
const app=$("#app"),qs=new URLSearchParams(location.search),P=document.body.dataset.page;
if(!C.SUPABASE_URL||C.SUPABASE_URL.includes("PASTE")){app.innerHTML='<div class="box"><h2>Setup incomplete</h2><p>Paste your Supabase URL and key into config.js.</p></div>';return}
const sb=supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
const D={site_name:"Muhafiz Playz",tagline:"Urdu Subtitled Dramas, Series and Movies",home_title:"Watch the Latest Dramas with Urdu Subtitles",
home_content:`## Welcome to Muhafiz Playz Official
Muhafiz Playz Official is a home for viewers who love historical dramas, epic series and powerful stories told with clear Urdu subtitles. Every series has its own page with the full story, episode list and quick links, so you never have to search through scattered posts to find the next episode.

## How to watch and download
Open any series, choose your season and tap the episode you want. On the episode page you can switch between the available servers to play the video right on the page. If one server is slow, another usually works. Download buttons for different qualities are listed below the player whenever they are available.

## Why viewers choose Muhafiz Playz
- Urdu subtitles that make the story, dialogue and politics easy to follow
- A full episode guide for every season on one page
- Several playback servers for every episode
- Download links in different qualities
- New episodes added regularly, with detailed notes for each one

## Stay updated
Bookmark this site and share it with friends and family on WhatsApp, Facebook and Telegram. New seasons and episodes appear in the Latest Episodes list on the home page as soon as they are published.`,
faq:[["How can I watch an episode?","Open the series, pick the episode, and choose a server to play it on the page."],["Can I download episodes?","Yes. Where available, each episode page has download buttons for different qualities."],["The video does not play. What should I do?","Switch to another server. If all fail, refresh the page or try again later."],["Are Urdu subtitles included?","Yes. Episodes are listed with Urdu subtitles."]]};
let S={...D},SER=[],EPS=[],CATS=[];
const T=k=>S[k]!=="0";
const sfx=()=>S.title_suffix||" | "+S.site_name+" Official";
const md=t=>{let o="",p=[],l=[];const f=()=>{if(p.length)o+=`<p>${p.join(" ")}</p>`;if(l.length)o+=`<ul>${l.join("")}</ul>`;p=[];l=[]};
const inl=x=>x.replace(/!\[([^\]]*)\]\((https?:[^)\s]+)\)/g,'<img src="$2" alt="$1" loading="lazy">').replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener nofollow">$1</a>').replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
for(const r of esc(t||"").split("\n")){const s=r.trim();
if(!s)f();else if(/^\[(episodes|player|download|dramas|trailer|season\s*\d+)\]$/i.test(s))f();else if(s.startsWith("### ")){f();o+=`<h3>${inl(s.slice(4))}</h3>`}else if(s.startsWith("## ")){f();o+=`<h2>${inl(s.slice(3))}</h2>`}else if(s.startsWith("- ")){if(p.length){o+=`<p>${p.join(" ")}</p>`;p=[]}l.push(`<li>${inl(s.slice(2))}</li>`)}else if(/^!\[[^\]]*\]\(https?:[^)\s]+\)$/.test(s)){f();o+=`<p>${inl(s)}</p>`}else{if(l.length){o+=`<ul>${l.join("")}</ul>`;l=[]}p.push(inl(s))}}
f();return o};
const plain=(t,n=170)=>{const s=String(t||"").replace(/!?\[[^\]]*\]\([^)]*\)/g,"").replace(/\[(episodes|player|download|dramas|trailer|season\s*\d+)\]/gi,"").replace(/^#+ .*$/gm,"").replace(/[*\-]/g," ").replace(/\s+/g," ").trim();return s.length>n?s.slice(0,n-1)+"…":s};
const withMarker=(t,mk)=>{const h=t.search(/^##\s/m);if(h>0)return t.slice(0,h)+`\n[${mk}]\n\n`+t.slice(h);const p=t.search(/\n\s*\n/);return p>0?t.slice(0,p)+`\n\n[${mk}]\n`+t.slice(p):t+`\n\n[${mk}]\n`};
const compose=(t,fn)=>{t=t||"";const re=/^[ \t]*\[([a-z]+(?:\s*\d+)?)\][ \t]*$/gim;let out="",last=0,m;while((m=re.exec(t))){const b=fn(m[1].toLowerCase().replace(/\s+/g,""));if(b==null)continue;out+=md(t.slice(last,m.index))+b;last=m.index+m[0].length}return out+md(t.slice(last))};
const intro=s=>String(s.description||"").split(/\n\s*##/)[0];
const abs=u=>!u?BASE+"og-default.jpg":/^https?:/.test(u)?u:new URL(u,location.href).href;
const ago=d=>{const m=(Date.now()-new Date(d))/6e4;if(m<60)return Math.max(1,Math.floor(m))+" min ago";if(m<1440)return Math.floor(m/60)+" hours ago";if(m<43200)return Math.floor(m/1440)+" days ago";return new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})};
const pic=(u,alt,cls="")=>u?`<img class="pic ${cls}" src="${esc(u)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.opacity=0">`:`<div class="pic ph ${cls}">${esc(alt)}</div>`;
const sOf=id=>SER.find(s=>s.id===id),eOf=sid=>EPS.filter(e=>e.series_id===sid).sort((a,b)=>(a.season-b.season)||(a.number-b.number));
const sUrl=s=>`series.html?s=${encodeURIComponent(s.slug)}`,eUrl=e=>`watch.html?id=${e.id}`,cUrl=n=>`category.html?c=${slug(n)}`;
const eTitle=(e,s)=>e.title||`${s.title} Episode ${e.number}`;
const soon=e=>e&&e.release_at&&new Date(e.release_at)>new Date();
const yt=u=>{const m=String(u||"").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?`https://www.youtube.com/embed/${m[1]}`:u};
const trailerBox=u=>u?`<div class="inner"><h2>Watch Trailer</h2><iframe class="player" src="${esc(yt(u))}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`:"";
const pad=n=>String(n).padStart(2,"0");
const frag=h=>document.createRange().createContextualFragment(h);
const meta=(k,v,p)=>{let e=$(`meta[${p?"property":"name"}="${k}"]`);if(!e){e=document.createElement("meta");e.setAttribute(p?"property":"name",k);document.head.appendChild(e)}e.content=v};
function seo(t,d,img,ld){const u=location.origin+location.pathname+location.search;document.title=t;d=d||S.default_meta_desc||"";meta("description",d);meta("og:title",t,1);meta("og:description",d,1);meta("og:image",abs(img||S.og_image),1);meta("og:url",u,1);meta("og:type","website",1);meta("twitter:card","summary_large_image");
let l=$("link[rel=canonical]");if(!l){l=document.createElement("link");l.rel="canonical";document.head.appendChild(l)}l.href=u;
if(ld){const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(ld);document.head.appendChild(s)}}
const ad=(k="content")=>{if(S["ads_"+P]==="0")return"";if(S["ad_html_"+k])return`<div class="ad adraw" data-r="${k}"></div>`;const slot=S["ad_slot_"+k]||S.ad_slot;return S.adsense_client&&slot?`<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(S.adsense_client)}" data-ad-slot="${esc(slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`:""};
const addScript=(src,a={})=>{const s=document.createElement("script");s.src=src;s.async=true;Object.entries(a).forEach(([k,v])=>s.setAttribute(k,v));document.head.appendChild(s)};
const views=sid=>eOf(sid).reduce((n,e)=>n+(e.views||0),0);
const popular=()=>[...SER].sort((a,b)=>(b.popular-a.popular)||(views(b.id)-views(a.id)));
const catList=()=>{const n={};SER.forEach(s=>{if(s.category)n[s.category]=(n[s.category]||0)+1});const o=CATS.map(c=>c.name);Object.keys(n).forEach(k=>{if(!o.includes(k))o.push(k)});return o.filter(k=>n[k]).map(k=>[k,n[k]])};
const grid=l=>`<div class="grid">${l.map(s=>`<a class="pc" href="${sUrl(s)}">${pic(s.poster||s.banner,s.title)}<h3>${esc(s.title)}</h3><p>${esc(s.category||"")}${s.year?", "+esc(s.year):""}</p></a>`).join("")}</div>`;
const rows=l=>`<div class="rows">${l.map(e=>{const s=sOf(e.series_id);return s?`<a class="rc" href="${eUrl(e)}">${pic(e.thumb||s.banner||s.poster,s.title)}<div><h3>${esc(eTitle(e,s))} with Urdu Subtitles</h3><small>${soon(e)?"Coming soon":ago(e.created_at)}</small></div></a>`:""}).join("")}</div>`;
const faq=l=>l.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
const faqLd=l=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:l.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))});
const ld=o=>{const l=document.createElement("script");l.type="application/ld+json";l.textContent=JSON.stringify(o);document.head.appendChild(l)};
const missing=()=>{seo("Page not found"+sfx(),"This page could not be found.");app.innerHTML=`<div class="box"><h1>Page not found</h1><p>Sorry, this page does not exist.</p><a class="btn" href="index.html">Back to home</a></div>`};
const links=[["about","About Us"],["contact","Contact Us"],["disclaimer","Disclaimer"],["dmca","DMCA"],["privacy","Privacy Policy"],["terms","Terms and Conditions"]];

function theme(){const r=document.documentElement.style,m={c_accent:"--gold",c_accent2:"--org",c_bg:"--bg",c_card:"--card",c_text:"--txt"};for(const k in m)if(S[k])r.setProperty(m[k],S[k]);r.setProperty("--grad",`linear-gradient(135deg,${S.c_accent||"#ffd60a"},${S.c_accent2||"#ff7a00"})`);
if(S.favicon_url){let l=$("link[rel=icon]");if(l)l.href=S.favicon_url}}
function chrome(){
const lg=esc(S.logo_url||"logo.png");
$("#hdr").innerHTML=(S.announcement?`<div class="ann">${esc(S.announcement)}</div>`:"")+`<div class="hd"><button id="mb" aria-label="Menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><a class="brand" href="index.html" aria-label="${esc(S.site_name)} Official home"><span class="bt"><b>${esc(S.site_name.toUpperCase())}</b><i>OFFICIAL</i></span><img src="${lg}" alt="${esc(S.site_name)} logo" width="44" height="44"></a><button id="sb" aria-label="Search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button></div><form id="sf" class="sf" action="search.html"><input name="q" placeholder="Search dramas or episodes" aria-label="Search" value="${esc(qs.get("q")||"")}"></form>
<div class="dim" id="dim"></div><aside class="dr" id="dr"><a class="brand" href="index.html"><img src="${lg}" alt="" width="44" height="44"><span class="bt" style="align-items:flex-start"><b>${esc(S.site_name.toUpperCase())}</b><i>OFFICIAL</i></span></a>
<h3>Menu</h3><div class="cats"><a href="index.html">Home</a><a href="category.html?c=all">All Series</a></div><h3>Categories</h3><div class="cats">${catList().map(([n,c])=>`<a href="${cUrl(n)}">${esc(n)}<b>${c}</b></a>`).join("")||'<p class="muted">No categories yet.</p>'}</div>
<h3>Pages</h3><div class="cats">${links.map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</div></aside>`;
const dr=$("#dr"),dim=$("#dim"),tg=o=>{dr.classList.toggle("on",o);dim.classList.toggle("on",o)};
$("#mb").onclick=()=>tg(true);dim.onclick=()=>tg(false);
$("#sb").onclick=()=>{$("#sf").classList.toggle("on");$("#sf input").focus()};
if(qs.get("q"))$("#sf").classList.add("on");
const soc=[["facebook","Facebook"],["telegram","Telegram"],["youtube","YouTube"],["instagram","Instagram"],["twitter","X"],["tiktok","TikTok"]].filter(([k])=>S[k]).map(([k,v])=>`<a href="${esc(S[k])}" target="_blank" rel="noopener">${v}</a>`).join("");
$("#ftr").innerHTML=`<footer>${soc?`<p>${soc}</p>`:""}<p>${links.map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</p>${S.footer_text?`<p>${esc(S.footer_text)}</p>`:""}<p>© ${new Date().getFullYear()} ${esc(S.site_name)} Official. All rights reserved.</p><p style="font-size:.7rem;opacity:.5">Build 6</p></footer>`;
}
const share=()=>{if(!T("show_share"))return"";const u=encodeURIComponent(location.href),t=encodeURIComponent(document.title);return`<div class="share"><a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">Facebook</a><a href="https://twitter.com/intent/tweet?url=${u}&text=${t}" target="_blank" rel="noopener">X</a><a href="https://wa.me/?text=${t}%20${u}" target="_blank" rel="noopener">WhatsApp</a><a href="https://t.me/share/url?url=${u}&text=${t}" target="_blank" rel="noopener">Telegram</a></div>`};

function home(){
const n=S.site_name,cl=catList(),pop=popular().slice(0,+S.popular_count||6),side=T("show_sidebar");
seo(`${n} Official | ${S.home_title}`,`Watch and download the latest dramas and series with Urdu subtitles on ${n} Official. Full episode lists, multiple servers and download links.`,null,{"@context":"https://schema.org","@type":"WebSite",name:n+" Official",url:BASE,potentialAction:{"@type":"SearchAction",target:BASE+"search.html?q={q}","query-input":"required name=q"}});
const latest=EPS.length?`<section class="sec"><h2>Latest Episodes</h2>${rows(EPS.slice(0,+S.latest_count||12))}</section>`:`<div class="box"><p>No dramas have been added yet.</p></div>`;
const dr=SER.slice(0,+S.dramas_count||20).map(s=>`<a class="dc" href="${sUrl(s)}">${pic(s.banner||s.poster,s.title)}<span>${esc(s.title)}</span></a><hr class="dsep">`).join("");
let hc=S.home_content;if(!/^[ \t]*\[dramas\][ \t]*$/mi.test(hc))hc=withMarker(hc,"dramas");
const main=`<section class="box prose" style="margin-top:0"><h1>${esc(S.home_title)}</h1>${compose(hc,m=>m==="dramas"?`<hr class="dsep">${dr}`:null)}</section>`+ad("content")+
latest+ad("content")+(T("show_faq")?`<section class="sec"><h2>Frequently Asked Questions</h2>${faq(D.faq)}</section>`:"");
const aside=`<aside>${ad("sidebar")}<div class="box"><h2>Categories</h2><div class="cats">${cl.map(([c,k])=>`<a href="${cUrl(c)}">${esc(c)}<b>${k}</b></a>`).join("")||'<p class="muted">Coming soon.</p>'}</div></div>${T("show_popular")&&pop.length?`<div class="box"><h2>Popular Series</h2>${pop.map(s=>`<a class="pr" href="${sUrl(s)}">${pic(s.poster||s.banner,s.title)}<div><h3>${esc(s.title)}</h3><small>${eOf(s.id).length} episodes</small></div></a>`).join("")}</div>`:""}</aside>`;
app.innerHTML=ad("header")+`<div class="${side?"two":""}"><div>${main}</div>${side?aside:""}</div>`;
ld(faqLd(D.faq));
}

function series(){
const s=SER.find(x=>x.slug===qs.get("s"));if(!s)return missing();
const eps=eOf(s.id),seas=[...new Set(eps.map(e=>e.season))];
let txt=s.description||`Watch all episodes of ${s.title} with Urdu subtitles.`;
if(!/^[ \t]*\[(episodes|season\s*\d+)\][ \t]*$/mi.test(txt))txt=withMarker(txt,"episodes");
seo(s.meta_title||`${s.title} Urdu Subtitles All Episodes${sfx()}`,s.meta_desc||plain(intro(s),155)||`Watch all episodes of ${s.title} with Urdu subtitles.`,s.banner||s.poster,{"@context":"https://schema.org","@type":"TVSeries",name:s.title,description:plain(intro(s),300),image:abs(s.poster||s.banner),numberOfEpisodes:eps.length,inLanguage:"ur"});
const rel=SER.filter(x=>x.id!==s.id&&x.category===s.category).slice(0,6),done=new Set();
const qa=[[`Where can I watch ${s.title} with Urdu subtitles?`,`All available episodes of ${s.title} are listed on this page. Scroll to your season and tap an episode to watch or download it.`],[`How many episodes of ${s.title} are available?`,`${eps.length} episode${eps.length==1?" is":"s are"} available right now. New episodes are added as soon as they are ready.`]];
const block=n=>{done.add(n);const l=eps.filter(e=>e.season===n);return`<div class="inner"><h2>${esc(s.title)} Season ${n} Episodes</h2><div class="eps">${l.map((e,j)=>`<a href="${eUrl(e)}">Episode ${pad(e.number)}${soon(e)?"<small>Coming soon</small>":n===seas[seas.length-1]&&j===l.length-1?"<small>Latest</small>":""}</a>`).join("")}</div></div>`};
let tu=0;const body0=compose(txt,m=>{if(m==="trailer"){tu=1;return trailerBox(s.trailer)}if(m==="episodes")return seas.filter(n=>!done.has(n)).map(block).join("")||'<div class="inner"><p class="muted">Episodes are coming soon.</p></div>';const x=/^season(\d+)$/.exec(m);return x?(seas.includes(+x[1])?block(+x[1]):""):null});
const body=body0+(tu?"":trailerBox(s.trailer));
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}${esc(s.title)}</div>
<h1>${esc(s.title)} with Urdu Subtitles</h1><p class="meta">${s.category?`<span class="chip">${esc(s.category)}</span>`:""}${s.year?esc(s.year)+" · ":""}${esc(s.status||"")}${s.status?" · ":""}${eps.length} episodes</p>
${pic(s.banner||s.poster,s.title,"hb")}${ad("header")}
<article class="box prose">${body}</article>${ad("content")}
${T("show_faq")?`<section class="sec"><h2>Frequently Asked Questions</h2>${faq(qa)}</section>`:""}
${rel.length?`<section class="sec"><h2>More ${esc(s.category)}</h2>${grid(rel)}</section>`:""}${share()}`;
ld(faqLd(qa));
}

function watch(){
const e=EPS.find(x=>x.id===+qs.get("id")),s=e&&sOf(e.series_id);if(!e||!s)return missing();
const sib=eOf(s.id),i=sib.findIndex(x=>x.id===e.id),pv=sib[i-1],nx=sib[i+1],t=eTitle(e,s);
const srv=[1,2,3,4].map(n=>({l:S["server"+n+"_label"]||"Server "+n,u:e["server"+n]})).filter(x=>x.u);
const auto=`Watch ${t} online with Urdu subtitles on ${S.site_name} Official. Choose a server to play the episode on this page, and use the download buttons when they are available.\n\n${intro(s)}`;
let txt=e.details||auto;if(!/^[ \t]*\[player\][ \t]*$/mi.test(txt))txt=withMarker(txt,"player");
const hasD=/^[ \t]*\[download\][ \t]*$/mi.test(txt);
const dls=[["dl480","(480)"],["dl720","(720)"],["dl1080","(1080)"],["dlbluray","Bluray"]].filter(([k])=>e[k]);
const player=`<div class="inner"><h2>Watch ${esc(t)}</h2>${srv.length>=1?`<div class="tabs srv">${srv.map((x,j)=>`<button class="tab${j?"":" on"}" data-i="${j}">${esc(x.l)}</button>`).join("")}</div>`:""}${srv.length?`<iframe id="pl" class="player" src="${esc(srv[0].u)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`:'<div class="nop">The player for this episode has not been added yet.</div>'}<p class="muted">${esc(S.player_note||"If the video does not play, try another server.")}${srv.length&&T("show_newtab")?` <a id="nt" href="${esc(srv[0].u)}" target="_blank" rel="noopener" style="color:var(--gold)">Open in new tab</a>`:""}</p></div>`;
const dl=`<div class="inner"><h2>${esc(S.dl_title||"Download")} ${esc(t)}</h2><div class="dl">${dls.map(([k,l])=>`<a class="${k==="dlbluray"?"b":""}" href="${esc(e[k])}" target="_blank" rel="noopener nofollow">Download ${l}</a>`).join("")||'<p class="muted">Download links will be added soon.</p>'}</div>${S.whatsapp_group?`<a class="btn wa" href="${esc(S.whatsapp_group)}" target="_blank" rel="noopener">Join our WhatsApp Channel</a>`:""}</div>`;
const rl=soon(e),tr=e.trailer||s.trailer;let tu=0;
const cs=`<div class="inner soon"><h2>Coming Soon</h2><p class="muted">${esc(t)} will be released on <b>${new Date(e.release_at).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"})}</b></p><div class="cd"><div><b id="cd-d">0</b>Days</div><div><b id="cd-h">0</b>Hours</div><div><b id="cd-m">0</b>Minutes</div><div><b id="cd-s">0</b>Seconds</div></div></div>`;
const body0=compose(txt,m=>m==="trailer"?(tu=1,trailerBox(tr)):m==="player"?(rl?cs:player)+(hasD||rl?"":dl+ad("content")):m==="download"?(rl?"":dl+ad("content")):null);
const body=body0+(tu?"":trailerBox(tr));
const words=txt.split(/\s+/).length;
seo(`${t} with Urdu Subtitles${sfx()}`,e.meta_desc||plain(txt,155),e.thumb||s.banner||s.poster,{"@context":"https://schema.org","@type":"TVEpisode",name:t,episodeNumber:e.number,seasonNumber:e.season,image:abs(e.thumb||s.banner||s.poster),datePublished:e.created_at,description:plain(txt,300),inLanguage:"ur",partOfSeries:{"@type":"TVSeries",name:s.title}});
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}<a href="${sUrl(s)}">${esc(s.title)}</a> / Episode ${e.number}</div>
${s.category?`<span class="chip">${esc(s.category)}</span>`:""}<h1>${esc(t)} with Urdu Subtitles</h1><p class="meta">${esc(S.site_name)} Official · ${ago(e.created_at)} · ${Math.max(1,Math.round(words/180))} min read</p>
${pic(e.thumb||s.banner||s.poster,t,"hb")}${ad("header")}
<article class="box prose pbody">${body}</article>
<div class="nav">${pv?`<a class="btn o" href="${eUrl(pv)}">Previous Episode</a>`:"<span></span>"}${nx?`<a class="btn" href="${eUrl(nx)}">Next Episode</a>`:""}</div>
<section class="box"><h2>All Episodes of ${esc(s.title)}</h2><div class="eps">${sib.map(x=>`<a href="${eUrl(x)}" class="${x.id===e.id?"cur":""}">${sib.some(y=>y.season!==x.season)?`S${x.season} `:""}Episode ${pad(x.number)}</a>`).join("")}</div></section>
<section class="sec"><h2>You May Also Like</h2>${grid(SER.filter(x=>x.id!==s.id).slice(0,6))}</section>${share()}`;
$$("#app .tab").forEach(bt=>bt.onclick=()=>{$$("#app .tab").forEach(x=>x.classList.toggle("on",x===bt));$("#pl").src=srv[bt.dataset.i].u;const nt=$("#nt");if(nt)nt.href=srv[bt.dataset.i].u});
if(rl){const T0=new Date(e.release_at).getTime(),u=()=>{const d=Math.max(0,Math.floor((T0-Date.now())/1e3));if(!d)return location.reload();const f=(i,v)=>{const x=$(i);if(x)x.textContent=v};f('#cd-d',Math.floor(d/86400));f('#cd-h',Math.floor(d%86400/3600));f('#cd-m',Math.floor(d%3600/60));f('#cd-s',d%60)};u();setInterval(u,1000)}
try{if(!rl&&!sessionStorage["h"+e.id]){sessionStorage["h"+e.id]=1;sb.rpc("mp_hit_episode",{p:e.id})}}catch(x){}
}

function category(){
const c=qs.get("c")||"all",all=c==="all",l=all?SER:SER.filter(s=>slug(s.category)===c);
const name=all?"All Series":(l[0]?l[0].category:c);
if(!all&&!l.length)return missing();
seo(`${name} with Urdu Subtitles${sfx()}`,`Watch ${name} with Urdu subtitles. Full episode lists and download links on ${S.site_name} Official.`);
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(name)}</div><h1>${esc(name)} with Urdu Subtitles</h1>${grid(l)||'<p class="muted">No dramas in this category yet.</p>'}${ad("content")}`;
}

function search(){
const q=(qs.get("q")||"").trim().toLowerCase();
seo(`Search${q?" “"+q+"”":""}${sfx()}`,"Search dramas and episodes.");
const sr=q?SER.filter(s=>(s.title+" "+(s.category||"")+" "+(s.tags||"")).toLowerCase().includes(q)):[];
const er=q?EPS.filter(e=>{const s=sOf(e.series_id);return s&&eTitle(e,s).toLowerCase().includes(q)}).slice(0,24):[];
app.innerHTML=`<h1>Search results</h1>${!q?'<p class="muted">Type a name in the search box above.</p>':!sr.length&&!er.length?`<div class="box"><p>No results found for “${esc(q)}”. Try another name.</p></div>`:""}${sr.length?`<section class="sec"><h2>Series</h2>${grid(sr)}</section>`:""}${er.length?`<section class="sec"><h2>Episodes</h2>${rows(er)}</section>`:""}`;
}

function pageText(k){const n=S.site_name+" Official",c=[S.email&&`Email: ${S.email}`,S.whatsapp&&`WhatsApp: ${S.whatsapp}`,S.telegram&&`Telegram: ${S.telegram}`].filter(Boolean).join("\n");
return({
about:["About Us",`## Who we are\n${n} is a drama and series website made for viewers who enjoy historical and epic stories with Urdu subtitles. Our goal is simple: keep every series organized in one place, with clear episode lists, helpful details and easy access.\n\n## What you will find here\n- Series pages with full story details\n- Episode pages with multiple servers\n- Download links in several qualities\n- Regular updates as new episodes arrive\n\n## Our promise\nWe work to keep the site fast, clean and easy to use on every phone and computer. If you have suggestions, please contact us.`],
contact:["Contact Us",`We would love to hear from you. Use the details below for suggestions, problems with a link, or content requests.\n\n${c||"Contact details will be added soon."}\n\n## Report a broken link\nTell us the series name and episode number, and we will fix it as soon as possible.`],
disclaimer:["Disclaimer",`## General information\nThe information and links on ${n} are provided for entertainment and general information only.\n\n## Third-party content\nVideos and downloads are provided by third-party services. ${n} does not own or control those services and is not responsible for their content or availability.\n\n## Copyright concerns\nIf you believe any content on this website violates your rights, please read our DMCA page and contact us.`],
dmca:["DMCA",`## Notice\n${n} respects the rights of content owners. If you are the owner of content and believe it appears on this site without permission, send us a notice and we will review it promptly.\n\n## What to include\n- Your name and contact details\n- The exact page link on this website\n- Proof that you own the content\n\n## Contact\n${c||"Please use the Contact Us page."}\n\nVerified content will be removed as soon as possible.`],
privacy:["Privacy Policy",`## Information we collect\n${n} does not ask visitors to create accounts. We may collect basic, non-personal information such as browser type, pages visited and approximate location through analytics tools.\n\n## Cookies and advertising\nThis site may use cookies and third-party advertising services, including Google AdSense. These services may use cookies to show ads based on your visits to this and other websites. You can manage ad personalization in your Google ad settings.\n\n## Third-party links\nOur pages may link to or embed third-party players and download services. We are not responsible for their privacy practices.\n\n## Your consent\nBy using this website you agree to this policy. We may update it from time to time on this page.`],
terms:["Terms and Conditions",`## Acceptance\nBy using ${n} you agree to these terms.\n\n## Use of the website\nYou may use this website for personal, non-commercial viewing. You agree not to misuse the site, disrupt its operation or attempt to access its admin areas.\n\n## Content and links\nWe do not guarantee that every link will always be available. Links and players may change or be removed without notice.\n\n## Changes\nWe may change these terms at any time. Continued use of the site means you accept the updated terms.`]})[k]}
function page(){
const k=qs.get("p")||"about",d=pageText(k);if(!d)return missing();
const t=S["page_"+k]?[d[0],S["page_"+k]]:d;
seo(`${t[0]}${sfx()}`,plain(t[1],155));
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(t[0])}</div><section class="box prose"><h1>${esc(t[0])}</h1>${md(t[1])}</section>`;
}

(async()=>{
try{
const [a,b,c,d]=await Promise.all([sb.from("mp_series").select("*").eq("published",true).order("created_at",{ascending:false}),sb.from("mp_episodes").select("*").eq("published",true).order("created_at",{ascending:false}),sb.from("mp_categories").select("*").order("sort"),sb.from("mp_settings").select("*")]);
const er=[a,b,c,d].find(x=>x.error);if(er)throw er.error;
SER=a.data;EPS=b.data;CATS=c.data;d.data.forEach(r=>{if(r.value!=="")S[r.key]=r.value});
}catch(err){app.innerHTML=`<div class="box"><h2>Could not load data</h2><p class="muted">${esc(err.message||err)}</p><p>Please check that the database setup is complete and config.js is correct.</p></div>`;return}
theme();chrome();
if(S.noindex==="1")meta("robots","noindex,nofollow");
if(S.maintenance==="1"){app.innerHTML=`<div class="mm"><h1>${esc(S.site_name)} Official</h1><p>${esc(S.maintenance_msg||"We are performing maintenance. Please check back soon.")}</p></div>`;return}
if(S.ga_id){addScript("https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(S.ga_id));window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",S.ga_id)}
if(S.clarity_id){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",S.clarity_id)}
if(S.adsense_client)addScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+encodeURIComponent(S.adsense_client),{crossorigin:"anonymous"});
if(S.head_code)document.head.append(frag(S.head_code));
({home,series,watch,category,search,page}[P]||missing)();
$$(".adraw").forEach(x=>x.append(frag(S["ad_html_"+x.dataset.r])));
if(S.body_code)document.body.append(frag(S.body_code));
if(S.adsense_client)$$(".adsbygoogle").forEach(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
})();
})();
