(()=>{
const C=window.MP||{};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const BASE=location.origin+location.pathname.replace(/\/[^/]*$/,"")+"/";
try{if(localStorage.getItem("mp_theme")==="light")document.documentElement.classList.add("lt")}catch(e){}
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();window.__ip=e});
const norm=s=>String(s||"").toLowerCase().replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const app=$("#app"),qs=new URLSearchParams(location.search),P=document.body.dataset.page;
if(document.body.dataset.s)qs.set("s",document.body.dataset.s);if(document.body.dataset.id)qs.set("id",document.body.dataset.id);
document.body.classList.add("fx");
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
if(!s)f();else if(/^\[(episodes|player|download|dramas|trailer|whatsapp|season\s*\d+)\]$/i.test(s))f();else if(s.startsWith("### ")){f();o+=`<h3>${inl(s.slice(4))}</h3>`}else if(s.startsWith("## ")){f();o+=`<h2>${inl(s.slice(3))}</h2>`}else if(s.startsWith("- ")){if(p.length){o+=`<p>${p.join(" ")}</p>`;p=[]}l.push(`<li>${inl(s.slice(2))}</li>`)}else if(/^!\[[^\]]*\]\(https?:[^)\s]+\)$/.test(s)){f();o+=`<p>${inl(s)}</p>`}else{if(l.length){o+=`<ul>${l.join("")}</ul>`;l=[]}p.push(inl(s))}}
f();return o};
const plain=(t,n=170)=>{const s=String(t||"").replace(/!?\[[^\]]*\]\([^)]*\)/g,"").replace(/\[(episodes|player|download|dramas|trailer|whatsapp|season\s*\d+)\]/gi,"").replace(/^#+ .*$/gm,"").replace(/[*\-]/g," ").replace(/\s+/g," ").trim();return s.length>n?s.slice(0,n-1)+"…":s};
const withMarker=(t,mk)=>{const h=t.search(/^##\s/m);if(h>0)return t.slice(0,h)+`\n[${mk}]\n\n`+t.slice(h);const p=t.search(/\n\s*\n/);return p>0?t.slice(0,p)+`\n\n[${mk}]\n`+t.slice(p):t+`\n\n[${mk}]\n`};
const compose=(t,fn)=>{t=t||"";const re=/^[ \t]*\[([a-z]+(?:\s*\d+)?)\][ \t]*$/gim;let out="",last=0,m;while((m=re.exec(t))){const b=fn(m[1].toLowerCase().replace(/\s+/g,""));if(b==null)continue;out+=md(t.slice(last,m.index))+b;last=m.index+m[0].length}return out+md(t.slice(last))};
const intro=s=>String(s.description||"").split(/\n\s*##/)[0];
const abs=u=>!u?BASE+"og-default.jpg":/^https?:/.test(u)?u:new URL(u,location.href).href;
const ago=d=>{const m=(Date.now()-new Date(d))/6e4;if(m<60)return Math.max(1,Math.floor(m))+" min ago";if(m<1440)return Math.floor(m/60)+" hours ago";if(m<43200)return Math.floor(m/1440)+" days ago";return new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})};
const px=(u,w)=>/^https?:/.test(u||"")&&!/wsrv\.nl/.test(u)?`https://wsrv.nl/?url=${encodeURIComponent(u.replace(/^https?:\/\//,""))}&w=${w}&output=webp&q=75`:u;
const pic=(u,alt,cls="",w=800)=>u?`<img class="pic ${cls}" src="${esc(px(u,w))}" alt="${esc(alt)}" loading="lazy" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='${esc(u)}'}else this.style.opacity=0">`:`<div class="pic ph ${cls}">${esc(alt)}</div>`;
const sOf=id=>SER.find(s=>s.id===id),eOf=sid=>EPS.filter(e=>e.series_id===sid).sort((a,b)=>(a.season-b.season)||(a.number-b.number));
const sUrl=s=>`series.html?s=${encodeURIComponent(s.slug)}`,eUrl=e=>`watch.html?id=${e.id}`,cUrl=n=>`category.html?c=${slug(n)}`;
const eTitle=(e,s)=>e.title||`${s.title} Episode ${e.number}`;
const soon=e=>e&&e.release_at&&new Date(e.release_at)>new Date();
const yt=u=>{const m=String(u||"").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?`https://www.youtube.com/embed/${m[1]}`:u};
const trailerBox=u=>{const L=String(u||"").split(/\s+/).filter(Boolean);if(!L.length)return"";const tabs=L.length>1?`<div class="trt">${L.map((x,i)=>`<button type="button" data-src="${esc(yt(x))}" class="${i?"":"on"}">Trailer ${i+1}</button>`).join("")}</div>`:"";return `<div class="inner"><h2>Watch Trailer</h2>${tabs}<iframe class="player" src="${esc(yt(L[0]))}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`};
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
const grid=l=>`<div class="grid">${l.map(s=>`<a class="pc" href="${sUrl(s)}">${pic(s.poster||s.banner,s.title,"",400)}<h3>${esc(s.title)}</h3><p>${esc(s.category||"")}${s.year?", "+esc(s.year):""}</p></a>`).join("")}</div>`;
const rows=l=>`<div class="rows">${l.map(e=>{const s=sOf(e.series_id);return s?`<a class="rc" href="${eUrl(e)}">${pic(e.thumb||s.banner||s.poster,s.title,"",320)}<div><h3>${esc(eTitle(e,s))} with Urdu Subtitles</h3><small>${soon(e)?"Coming soon":ago(e.created_at)}</small></div></a>`:""}).join("")}</div>`;
const faq=l=>l.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
const faqLd=l=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:l.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))});
const ld=o=>{const l=document.createElement("script");l.type="application/ld+json";l.textContent=JSON.stringify(o);document.head.appendChild(l)};
const missing=()=>{seo("Page not found"+sfx(),"This page could not be found.");app.innerHTML=`<div class="box"><h1>Page not found</h1><p>Sorry, this page does not exist.</p><a class="btn" href="index.html">Back to home</a></div>`};
const links=[["about","About Us"],["contact","Contact Us"],["request","Request a Drama"],["disclaimer","Disclaimer"],["dmca","DMCA"],["privacy","Privacy Policy"],["terms","Terms and Conditions"]];

const waBanner=()=>{const wl=S.wa_banner_link||S.whatsapp_group;if(!wl||S.show_wa==="0")return"";
if(S.wa_banner)return`<a class="wab" href="${esc(wl)}" target="_blank" rel="noopener">${pic(S.wa_banner,"Join our WhatsApp channel","",900)}</a>`;
if(!document.getElementById("nq")){const l=document.createElement("link");l.id="nq";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@600&display=swap";document.head.appendChild(l)}
return`<a class="wab wab-d" href="${esc(wl)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg><span class="ur">${esc(S.wa_text_ur||"واٹس ایپ گروپ جوائن کریں")}</span><small>${esc(S.wa_text_en||"Join our WhatsApp Channel")}</small></a>`};
function requestPage(){
seo("Request a Drama"+sfx(),"Tell us which drama you would like to see on "+S.site_name+" Official.");
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / Request a Drama</div><section class="box"><h1>Request a Drama</h1><p>Tell us which drama you would like us to add. We read every request.</p><div class="f"><div><label for="rq1">Drama name</label><input id="rq1" maxlength="120" autocomplete="off"></div><div><label for="rq2">Note (optional)</label><textarea id="rq2" rows="3" maxlength="500"></textarea></div><input id="rq0" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true"><button class="btn" id="rqs">Send request</button><p class="msg" id="rqm"></p></div></section>`;
$("#rqs").onclick=async()=>{const t=$("#rq1").value.trim(),n=$("#rq2").value.trim(),m=$("#rqm");
if($("#rq0").value)return;if(t.length<2)return m.textContent="Please enter the drama name.";
let last=0;try{last=+localStorage.getItem("mp_rq")||0}catch(x){}if(Date.now()-last<60000)return m.textContent="Please wait a minute before sending another request.";
$("#rqs").disabled=true;const r=await sb.from("mp_requests").insert({title:t.slice(0,120),note:n?n.slice(0,500):null});
if(r.error){$("#rqs").disabled=false;return m.textContent="Sorry, your request could not be sent. Please try again later."}
try{localStorage.setItem("mp_rq",Date.now())}catch(x){}$("#rq1").value="";$("#rq2").value="";m.textContent="Thank you! We received your request.";$("#rqs").disabled=false}}
let popT=null;
function joinPopup(){
if(popT||S.popup_on==="0")return;
const wa=S.whatsapp_group,tg=S.telegram;if(!wa&&!tg)return;
const hrs=+S.popup_hours||0;let last=0;try{last=+localStorage.getItem("mp_pop")||0}catch(e){}
if(hrs&&Date.now()-last<hrs*36e5)return;
popT=setTimeout(()=>{
if(document.getElementById("jp"))return;
if(!document.getElementById("nq")){const l=document.createElement("link");l.id="nq";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@600&display=swap";document.head.appendChild(l)}
const th=(S.telegram||"").match(/t\.me\/([\w_]+)/),h=th?"@"+th[1]:"Telegram";
const ti=S.popup_title_en||"Never Miss An Episode!",tu=S.popup_title_ur||"کوئی قسط مس نہ کریں!",
xe=S.popup_text_en||"Follow our Urdu subtitled drama channels on WhatsApp and Telegram for instant episode links, release alerts and HD updates.",
xu=S.popup_text_ur||"فوری ایپی سوڈ لنکس، ریلیز الرٹس اور ایچ ڈی اپ ڈیٹس کے لیے واٹس ایپ اور ٹیلیگرام چینل فالو کریں۔";
const row=(c,href,ic,n,sub,su)=>`<a class="jr ${c}" href="${esc(href)}" target="_blank" rel="noopener" data-j="1"><span class="ji">${ic}</span><span class="jt"><b>${n}</b><small>${sub}</small><small class="ur2">${su}</small></span><span class="jb">Join</span></a>`;
const waI='<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path d="M8.500 8.200c-.2 3.800 3.200 7.200 7 7" fill="none" stroke="#1faa59" stroke-width="2.600" stroke-linecap="round"/></svg>';
const tgI='<svg viewBox="0 0 24 24" fill="#fff"><path d="M21.500 3.200 2.800 10.400c-.8.300-.8 1.200 0 1.400l4.700 1.500 1.800 5.600c.2.600.9.800 1.400.4l2.600-2.200 4.800 3.500c.5.400 1.300.1 1.500-.6L22.900 4.600c.2-.8-.6-1.700-1.400-1.400zM9.400 13l8.500-5.300-6.600 6.200-.3 3.100z"/></svg>';
const el=document.createElement("div");el.id="jp";el.className="jp";el.setAttribute("role","dialog");el.setAttribute("aria-modal","true");
el.innerHTML=`<div class="jc"><button class="jx" aria-label="Close" id="jx">×</button><div class="jbadge"><i></i>JOIN OUR COMMUNITY<span class="ur2">ہماری کمیونٹی جوائن کریں</span></div><h2>${esc(ti)}</h2><p class="ur2 jh">${esc(tu)}</p><p class="jd">${esc(xe)}</p><p class="jd ur2">${esc(xu)}</p>${wa?row("jw",wa,waI,"WhatsApp Channel","Instant episode links &amp; alerts","فوری لنکس اور اطلاعات"):""}${tg?row("jg",tg,tgI,"Telegram Channel",esc(h)+" · Instant updates","فوری اپ ڈیٹس"):""}<button class="jk" id="jk">Continue Watching<span class="ur2">دیکھنا جاری رکھیں</span></button></div>`;
document.body.appendChild(el);document.body.style.overflow="hidden";
const close=(j)=>{if(hrs){try{localStorage.setItem("mp_pop",Date.now()+(j?6*864e5:0))}catch(e){}}el.classList.add("out");document.body.style.overflow="";setTimeout(()=>el.remove(),250);document.removeEventListener("keydown",ek)};
const ek=e=>{if(e.key==="Escape")close(0)};document.addEventListener("keydown",ek);
$("#jx").onclick=()=>close(0);$("#jk").onclick=()=>close(0);el.onclick=e=>{if(e.target===el)close(0)};
$$("[data-j]",el).forEach(a=>a.addEventListener("click",()=>close(1)));$("#jk").focus()
},(+S.popup_delay||35)*1000)}
function fx(){
if(!$("#sp")){const p=document.createElement("div");p.id="sp";document.body.appendChild(p);const b=document.createElement("button");b.id="bt";b.setAttribute("aria-label","Back to top");b.innerHTML="&#8593;";b.onclick=()=>scrollTo({top:0,behavior:"smooth"});document.body.appendChild(b);
addEventListener("scroll",()=>{const h=document.documentElement,t=h.scrollTop,m=h.scrollHeight-h.clientHeight;p.style.width=(m>0?t/m*100:0)+"%";b.classList.toggle("on",t>700);const hd=$("#hdr .hd");if(hd)hd.classList.toggle("sc",t>12)},{passive:true});
document.addEventListener("click",e=>{const b=e.target.closest(".trt button");if(!b)return;const w=b.closest(".inner"),f=w&&w.querySelector("iframe");if(!f)return;f.src=b.dataset.src;w.querySelectorAll(".trt button").forEach(x=>x.classList.toggle("on",x===b))});
document.addEventListener("pointerdown",e=>{const t=e.target.closest(".btn,.eps a");if(!t||!document.body.classList.contains("fx"))return;const r=t.getBoundingClientRect(),z=Math.max(r.width,r.height)*2,x=document.createElement("span");x.className="rip";x.style.cssText=`width:${z}px;height:${z}px;left:${e.clientX-r.left-z/2}px;top:${e.clientY-r.top-z/2}px`;t.appendChild(x);setTimeout(()=>x.remove(),650)},{passive:true});
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.button||e.ctrlKey||e.metaKey||e.shiftKey||a.target||a.hasAttribute("download"))return;const h=a.getAttribute("href");if(!h||h[0]==="#"||/^(mailto|tel|javascript)/i.test(h)||a.origin!==location.origin)return;e.preventDefault();document.body.classList.add("leave");setTimeout(()=>{location.href=a.href},170)});
addEventListener("pageshow",()=>document.body.classList.remove("leave"))}
if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -5% 0px",threshold:.04});
$$("#app .box,#app .sec>h2,#app .rc,#app .pc,#app .dc,#app .inner,#app .crumb,#app .meta,#app details,#app .vote,#app .nav,#app article").forEach((el,i)=>{el.classList.add("rv");el.style.animationDelay=(i%5)*55+"ms";io.observe(el)});
setTimeout(()=>$$(".rv:not(.in)").forEach(e=>e.classList.add("in")),2500)}
function theme(){const r=document.documentElement.style,m={c_accent:"--gold",c_accent2:"--org",c_bg:"--bg",c_card:"--card",c_text:"--txt"};for(const k in m)if(S[k])r.setProperty(m[k],S[k]);r.setProperty("--grad",`linear-gradient(135deg,${S.c_accent||"#ffd60a"},${S.c_accent2||"#ff7a00"})`);
if(/^https?:\/\//.test(S.favicon_url||"")){let l=$("link[rel=icon]");if(l)l.href=S.favicon_url}}
const wm=()=>{const w=String(S.site_name||"Muhafiz Playz").trim().split(/\s+/);return w.length>1?`<b>${esc(w[0].toUpperCase())}</b><b class="pz">${esc(w.slice(1).join(" ").toUpperCase())}</b>`:`<b class="pz">${esc(w[0].toUpperCase())}</b>`};
function chrome(){
const lg=esc(/^https?:\/\//.test(S.logo_url||"")?S.logo_url:"logo.png");
$("#hdr").innerHTML=(S.announcement?`<div class="ann">${esc(S.announcement)}</div>`:"")+`<div class="hd"><button id="mb" aria-label="Menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><a class="brand" href="index.html" aria-label="${esc(S.site_name)} home"><img src="${lg}" alt="${esc(S.site_name)} logo" width="44" height="44" onerror="this.onerror=null;this.src='logo.png'"><span class="bt">${wm()}</span></a><div class="hr"><button id="tm" aria-label="Switch light or dark mode"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg></button><button id="sb" aria-label="Search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button></div></div><form id="sf" class="sf" action="search.html"><input name="q" placeholder="Search dramas or episodes" aria-label="Search" value="${esc(qs.get("q")||"")}"><div id="sug" class="sug"></div></form>
<div class="dim" id="dim"></div><aside class="dr" id="dr"><button class="dcl" id="dc" aria-label="Close menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></button><a class="brand" href="index.html"><img src="${lg}" alt="" width="44" height="44" onerror="this.onerror=null;this.src='logo.png'"><span class="bt">${wm()}</span></a>
<h3>Menu</h3><div class="cats"><a href="index.html">Home</a><a href="category.html?c=all">All Series</a><a href="#" id="a2hs">Add to Home Screen</a></div><h3>Categories</h3><div class="cats">${catList().map(([n,c])=>`<a href="${cUrl(n)}">${esc(n)}<b>${c}</b></a>`).join("")||'<p class="muted">No categories yet.</p>'}</div>
<h3>Pages</h3><div class="cats">${links.map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</div></aside>`;
const dr=$("#dr"),dim=$("#dim"),tg=o=>{dr.classList.toggle("on",o);dim.classList.toggle("on",o)};
$("#mb").onclick=()=>tg(true);dim.onclick=()=>tg(false);$("#dc").onclick=()=>tg(false);
document.onkeydown=e=>{if(e.key==="Escape")tg(false)};
$("#tm").onclick=()=>{const l=document.documentElement.classList.toggle("lt");try{localStorage.setItem("mp_theme",l?"light":"dark")}catch(e){}};
$("#a2hs").onclick=e=>{e.preventDefault();if(window.__ip){window.__ip.prompt()}else alert("To install: open the browser menu (three dots) and tap Add to Home Screen. On iPhone: tap Share, then Add to Home Screen.")};
const si=$("#sf input"),sg=$("#sug");
si.oninput=()=>{const raw=si.value.trim(),q=norm(raw);if(!q){sg.innerHTML="";sg.classList.remove("on");return}
const th=(u,w)=>u?`<img src="${esc(px(u,w))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`:`<span class="no"></span>`;
const a=SER.filter(x=>norm(x.title+" "+(x.category||"")+" "+(x.tags||"")).includes(q)).slice(0,5).map(x=>`<a href="${sUrl(x)}">${th(x.poster||x.banner,96)}<span><b>${esc(x.title)}</b><small>${esc(x.category||"Drama")} · ${eOf(x.id).length} episodes</small></span></a>`);
const b=EPS.filter(e=>{const x=sOf(e.series_id);return x&&norm(eTitle(e,x)).includes(q)}).slice(0,4).map(e=>{const x=sOf(e.series_id);return`<a href="${eUrl(e)}" class="ep">${th(e.thumb||x.banner||x.poster,120)}<span><b>${esc(eTitle(e,x))}</b><small>Episode</small></span></a>`});
const all=a.concat(b);
sg.innerHTML=all.length?all.join("")+`<a class="all" href="search.html?q=${encodeURIComponent(raw)}">See all results for “${esc(raw)}”</a>`:`<p class="nr">No matching dramas yet.</p>`;
sg.classList.add("on");$$("a",sg).forEach((el,i)=>{el.style.animationDelay=i*45+"ms"})};
si.onfocus=()=>{if(sg.innerHTML)sg.classList.add("on")};si.onblur=()=>setTimeout(()=>sg.classList.remove("on"),200);
$("#sb").onclick=()=>{$("#sf").classList.toggle("on");$("#sf input").focus()};
if(qs.get("q"))$("#sf").classList.add("on");
const SO=[["whatsapp_group","WhatsApp","37,211,102","#25d366",'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path d="M8.500 8.200c-.2 3.800 3.200 7.200 7 7" fill="none" stroke="#14101a" stroke-width="2.400" stroke-linecap="round"/></svg>'],
["facebook","Facebook","24,119,242","#4c8dff",'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14 8h2V5h-2.500C10.900 5 10 6.600 10 8.500V10H8v3h2v6h3v-6h2.100l.4-3H13V8.700c0-.5.200-.7.700-.7z"/></svg>'],
["telegram","Telegram","41,168,235","#3ab4f0",'<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 4 3 11.300l5.600 2 2.100 5.700 3.100-3.700 4.900 3.500z"/></svg>'],
["youtube","YouTube","255,45,45","#ff4d4d",'<svg viewBox="0 0 24 24"><rect x="2.500" y="5.500" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10 9.300v5.400l4.700-2.700z"/></svg>'],
["instagram","Instagram","225,48,108","#f2518a",'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5.500" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.200" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.200" cy="6.800" r="1.200" fill="currentColor"/></svg>'],
["twitter","X","240,240,240","#f2f2f2",'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"/></svg>'],
["tiktok","TikTok","37,244,238","#3df5ef",'<svg viewBox="0 0 24 24"><path d="M14 4v9.500a3.500 3.500 0 1 1-3.500-3.500M14 4c.4 2.500 2 4 4.500 4.200" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round"/></svg>']];
const soc=SO.filter(x=>S[x[0]]).map(x=>`<a class="so" style="--c:${x[3]};--g:${x[2]}" href="${esc(S[x[0]])}" target="_blank" rel="noopener" aria-label="${x[1]}">${x[4]}</a>`).join("");
const wa=S.whatsapp_group||S.wa_banner_link,ar='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const cats=catList().slice(0,4).map(([n])=>`<a href="${cUrl(n)}">${esc(n)}</a>`).join("");
$("#ftr").innerHTML=`<footer class="ft"><div class="ftb"><span class="fl"><img src="${lg}" alt="" width="40" height="40"></span><span class="bt">${wm()}</span></div>
<p class="fta">${esc(S.footer_about_en||"Turkish dramas with Urdu subtitles, full episode guides, stories and release updates.")}</p><p class="fta fur">${esc(S.footer_about_ur||"اردو سب ٹائٹلز کے ساتھ ترک ڈرامے، مکمل ایپی سوڈ گائیڈ اور نئی اقساط کی اطلاعات۔")}</p>
<div class="fcols"><div><h4>Catalogue</h4><a href="category.html?c=all">All Dramas</a>${cats}<a href="page.html?p=request">Request a Drama</a></div><div><h4>Legal &amp; Support</h4>${links.filter(([k])=>k!=="request").map(([k,v])=>`<a href="page.html?p=${k}">${v}</a>`).join("")}</div></div>
${wa||S.telegram?`<div class="fcom"><h4>Community</h4><p>Follow official episode announcements in our community.</p><p class="fur">نئی اقساط کی اطلاعات کے لیے ہماری کمیونٹی جوائن کریں۔</p>${wa?`<a class="ftj" href="${esc(wa)}" target="_blank" rel="noopener"><span>Join ${esc(S.site_name)} Community</span>${ar}</a>`:""}${S.telegram?`<a class="ftj tg" href="${esc(S.telegram)}" target="_blank" rel="noopener"><span>Join on Telegram</span>${ar}</a>`:""}</div>`:""}
${soc?`<div class="fso">${soc}</div>`:""}
${S.email?`<p class="fmail">Support Email: <a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>`:""}${S.footer_text?`<p class="fmail">${esc(S.footer_text)}</p>`:""}
<p class="fcp">© ${new Date().getFullYear()} ${esc(S.site_name)} Official. All rights reserved.</p><p class="fbd">Build 29</p></footer>`;
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
const aside=`<aside>${ad("sidebar")}<div class="box"><h2>Categories</h2><div class="cats">${cl.map(([c,k])=>`<a href="${cUrl(c)}">${esc(c)}<b>${k}</b></a>`).join("")||'<p class="muted">Coming soon.</p>'}</div></div>${T("show_popular")&&pop.length?`<div class="box"><h2>Popular Series</h2>${pop.map(s=>`<a class="pr" href="${sUrl(s)}">${pic(s.poster||s.banner,s.title,"",120)}<div><h3>${esc(s.title)}</h3><small>${eOf(s.id).length} episodes</small></div></a>`).join("")}</div>`:""}</aside>`;
app.innerHTML=ad("header")+`<div class="${side?"two":""}"><div>${main}</div>${side?aside:""}</div>`;
ld(faqLd(D.faq));
}

async function series(){
const s=SER.find(x=>x.slug===qs.get("s"));if(!s)return missing();await fullSeries(s);
const eps=eOf(s.id),seas=[...new Set(eps.map(e=>e.season))];
let txt=s.description||`Watch all episodes of ${s.title} with Urdu subtitles.`;
if(!/^[ \t]*\[(episodes|season\s*\d+)\][ \t]*$/mi.test(txt))txt=withMarker(txt,"episodes");
seo(s.meta_title||`${s.title} Urdu Subtitles All Episodes${sfx()}`,s.meta_desc||plain(intro(s),155)||`Watch all episodes of ${s.title} with Urdu subtitles.`,s.banner||s.poster,{"@context":"https://schema.org","@type":"TVSeries",name:s.title,description:plain(intro(s),300),image:abs(s.poster||s.banner),numberOfEpisodes:eps.length,inLanguage:"ur"});
const rel=SER.filter(x=>x.id!==s.id&&x.category===s.category).slice(0,6),done=new Set();
const qa=[[`Where can I watch ${s.title} with Urdu subtitles?`,`All available episodes of ${s.title} are listed on this page. Scroll to your season and tap an episode to watch or download it.`],[`How many episodes of ${s.title} are available?`,`${eps.length} episode${eps.length==1?" is":"s are"} available right now. New episodes are added as soon as they are ready.`]];
const block=n=>{done.add(n);const l=eps.filter(e=>e.season===n);return`<div class="inner"><h2>${esc(s.title)} Season ${n} Episodes</h2><div class="eps">${l.map((e,j)=>`<a href="${eUrl(e)}">Episode ${pad(e.number)}${soon(e)?"<small>Coming soon</small>":n===seas[seas.length-1]&&j===l.length-1?"<small>Latest</small>":""}</a>`).join("")}</div></div>`};
const hasW=/^[ \t]*\[whatsapp\][ \t]*$/mi.test(txt);let tu=0;const body0=compose(txt,m=>{if(m==="whatsapp")return waBanner();if(m==="trailer"){tu=1;return trailerBox(s.trailer)}if(m==="episodes")return (hasW?"":waBanner())+ seas.filter(n=>!done.has(n)).map(block).join("")||'<div class="inner"><p class="muted">Episodes are coming soon.</p></div>';const x=/^season(\d+)$/.exec(m);return x?(seas.includes(+x[1])?block(+x[1]):""):null});
const body=body0+(tu?"":trailerBox(s.trailer));
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}${esc(s.title)}</div>
<h1>${esc(s.title)} with Urdu Subtitles</h1><p class="meta">${s.category?`<span class="chip">${esc(s.category)}</span>`:""}${s.year?esc(s.year)+" · ":""}${esc(s.status||"")}${s.status?" · ":""}${eps.length} episodes</p>
${pic(s.banner||s.poster,s.title,"hb",1000)}${ad("header")}
<article class="box prose">${body}</article>${ad("content")}
${T("show_faq")?`<section class="sec"><h2>Frequently Asked Questions</h2>${faq(qa)}</section>`:""}
${rel.length?`<section class="sec"><h2>More ${esc(s.category)}</h2>${grid(rel)}</section>`:""}${share()}`;
ld(faqLd(qa));
}

async function watch(){
const e=EPS.find(x=>x.id===+qs.get("id")),s=e&&sOf(e.series_id);if(!e||!s)return missing();await fullEp(e);await fullSeries(s);
const sib=eOf(s.id),i=sib.findIndex(x=>x.id===e.id),pv=sib[i-1],nx=sib[i+1],t=eTitle(e,s);
const srv=[1,2,3,4].map(n=>({l:S["server"+n+"_label"]||"Server "+n,u:e["server"+n]})).filter(x=>x.u);
const auto=`Watch ${t} online with Urdu subtitles on ${S.site_name} Official. Choose a server to play the episode on this page, and use the download buttons when they are available.\n\n${intro(s)}`;
let txt=e.details||auto;if(!/^[ \t]*\[player\][ \t]*$/mi.test(txt))txt=withMarker(txt,"player");
const hasD=/^[ \t]*\[download\][ \t]*$/mi.test(txt),hasW=/^[ \t]*\[whatsapp\][ \t]*$/mi.test(txt);
const dls=[["dl480","(480)"],["dl720","(720)"],["dl1080","(1080)"],["dlbluray","Bluray"]].filter(([k])=>e[k]);
const player=!srv.length?"":`<div class="flat">${srv.map(x=>`<h2 class="sh">${esc(x.l)}:</h2><iframe class="player" src="${esc(x.u)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${T("show_newtab")?`<p class="muted"><a href="${esc(x.u)}" target="_blank" rel="noopener" style="color:var(--gold)">Open ${esc(x.l)} in new tab</a></p>`:""}`).join("")||'<div class="nop">The player for this episode has not been added yet.</div>'}<p class="muted">${esc(S.player_note||"If the video does not play, try another server.")}</p></div>`;
const dl=!dls.length?"":`<div class="flat"><h2>${esc(S.dl_title||"Download")} ${esc(t)}</h2><div class="dl">${dls.map(([k,l])=>`<a class="${k==="dlbluray"?"b":""}" href="${esc(e[k])}" target="_blank" rel="noopener nofollow">Download ${l}</a>`).join("")||'<p class="muted">Download links will be added soon.</p>'}</div>${S.whatsapp_group?`<a class="btn wa" href="${esc(S.whatsapp_group)}" target="_blank" rel="noopener">Join our WhatsApp Channel</a>`:""}</div>`;
const rl=soon(e),tr=e.trailer||s.trailer;let tu=0;
const cs=`<div class="inner soon"><h2>Coming Soon</h2><p class="muted">${esc(t)} will be released on <b>${new Date(e.release_at).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"})}</b></p><div class="cd"><div><b id="cd-d">0</b>Days</div><div><b id="cd-h">0</b>Hours</div><div><b id="cd-m">0</b>Minutes</div><div><b id="cd-s">0</b>Seconds</div></div></div>`;
const body0=compose(txt,m=>m==="trailer"?(tu=1,trailerBox(tr)):m==="whatsapp"?waBanner():m==="player"?(hasW?"":waBanner())+(rl?cs:player)+(hasD||rl?"":dl+ad("content")):m==="download"?(rl?"":dl+ad("content")):null);
const body=body0+(tu?"":trailerBox(tr));
const words=txt.split(/\s+/).length;
seo(`${t} with Urdu Subtitles${sfx()}`,e.meta_desc||plain(txt,155),e.thumb||s.banner||s.poster,{"@context":"https://schema.org","@type":"TVEpisode",name:t,episodeNumber:e.number,seasonNumber:e.season,image:abs(e.thumb||s.banner||s.poster),datePublished:e.created_at,description:plain(txt,300),inLanguage:"ur",partOfSeries:{"@type":"TVSeries",name:s.title}});
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${s.category?`<a href="${cUrl(s.category)}">${esc(s.category)}</a> / `:""}<a href="${sUrl(s)}">${esc(s.title)}</a> / Episode ${e.number}</div>
${s.category?`<span class="chip">${esc(s.category)}</span>`:""}<h1>${esc(t)} with Urdu Subtitles</h1><p class="meta">${esc(S.site_name)} Official · ${ago(e.created_at)} · ${Math.max(1,Math.round(words/180))} min read</p>
${pic(e.thumb||s.banner||s.poster,t,"hb",1000)}${ad("header")}
<article class="box prose pbody">${body}</article>
<div class="nav">${pv?`<a class="btn o" href="${eUrl(pv)}">Previous Episode</a>`:"<span></span>"}${nx?`<a class="btn" href="${eUrl(nx)}">Next Episode</a>`:""}</div>
<section class="box"><h2>All Episodes of ${esc(s.title)}</h2><div class="eps">${sib.map(x=>`<a href="${eUrl(x)}" class="${x.id===e.id?"cur":""}">${sib.some(y=>y.season!==x.season)?`S${x.season} `:""}Episode ${pad(x.number)}</a>`).join("")}</div></section>
<section class="sec"><h2>You May Also Like</h2>${grid(SER.filter(x=>x.id!==s.id).slice(0,6))}</section>${share()}`;
if(rl){const T0=new Date(e.release_at).getTime(),u=()=>{const d=Math.max(0,Math.floor((T0-Date.now())/1e3));if(!d)return location.reload();const f=(i,v)=>{const x=$(i);if(x)x.textContent=v};f('#cd-d',Math.floor(d/86400));f('#cd-h',Math.floor(d%86400/3600));f('#cd-m',Math.floor(d%3600/60));f('#cd-s',d%60)};u();setInterval(u,1000)}
}

function category(){
const c=qs.get("c")||"all",all=c==="all",l=all?SER:SER.filter(s=>slug(s.category)===c);
const name=all?"All Series":(l[0]?l[0].category:c);
if(!all&&!l.length)return missing();
seo(`${name} with Urdu Subtitles${sfx()}`,`Watch ${name} with Urdu subtitles. Full episode lists and download links on ${S.site_name} Official.`);
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(name)}</div><h1>${esc(name)} with Urdu Subtitles</h1>${grid(l)||'<p class="muted">No dramas in this category yet.</p>'}${ad("content")}`;
}

function search(){
const raw=(qs.get("q")||"").trim(),q=norm(raw);
seo(`Search${raw?" “"+raw+"”":""}${sfx()}`,"Search dramas and episodes.");
const sr=q?SER.filter(s=>norm(s.title+" "+(s.category||"")+" "+(s.tags||"")).includes(q)):[];
const er=q?EPS.filter(e=>{const s=sOf(e.series_id);return s&&norm(eTitle(e,s)).includes(q)}).slice(0,24):[];
app.innerHTML=`<h1>Search results</h1>${!q?'<p class="muted">Type a name in the search box above.</p>':!sr.length&&!er.length?`<div class="box"><p>No results found for “${esc(raw)}”. Try another name.</p></div>`:""}${sr.length?`<section class="sec"><h2>Series</h2>${grid(sr)}</section>`:""}${er.length?`<section class="sec"><h2>Episodes</h2>${rows(er)}</section>`:""}`;
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
const k=qs.get("p")||"about";if(k==="request")return requestPage();const d=pageText(k);if(!d)return missing();
const t=S["page_"+k]?[d[0],S["page_"+k]]:d;
seo(`${t[0]}${sfx()}`,plain(t[1],155));
app.innerHTML=`<div class="crumb"><a href="index.html">Home</a> / ${esc(t[0])}</div><section class="box prose"><h1>${esc(t[0])}</h1>${md(t[1])}</section>`;
}

const SC="id,title,slug,category,year,status,poster,banner,featured,published,popular,meta_title,meta_desc,tags,trailer,created_at",EC="id,series_id,season,number,title,thumb,release_at,created_at,published",DESC={},FULL={};
async function fullSeries(s){if(s.description===undefined){if(DESC[s.id]===undefined){try{const r=await sb.from("mp_series").select("description").eq("id",s.id).maybeSingle();DESC[s.id]=(r.data&&r.data.description)||""}catch(x){DESC[s.id]=""}}s.description=DESC[s.id]}return s}
async function fullEp(e){if(!e._f){let d=FULL[e.id];if(!d){try{const r=await sb.from("mp_episodes").select("*").eq("id",e.id).maybeSingle();d=FULL[e.id]=r.data||{}}catch(x){d=FULL[e.id]={}}}Object.assign(e,d);e._f=1}return e}
const loadData=async()=>{
try{
const [a,b,c,d]=await Promise.all([sb.from("mp_series").select(SC).eq("published",true).order("created_at",{ascending:false}),sb.from("mp_episodes").select(EC).eq("published",true).order("created_at",{ascending:false}),sb.from("mp_categories").select("*").order("sort"),sb.from("mp_settings").select("*")]);
let A=a,B=b;if(a.error||b.error){[A,B]=await Promise.all([sb.from("mp_series").select("*").eq("published",true).order("created_at",{ascending:false}),sb.from("mp_episodes").select("*").eq("published",true).order("created_at",{ascending:false})])}
const er=[A,B,c,d].find(x=>x.error);if(er)throw er.error;
SER=A.data;EPS=B.data;CATS=c.data;d.data.forEach(r=>{if(r.value!=="")S[r.key]=r.value;else if(r.key in D)S[r.key]=D[r.key];else delete S[r.key]});
}catch(err){let ok=0;try{const r=await fetch("data.json?"+Date.now());if(!r.ok)throw 0;const j=await r.json(),pub=x=>x.published!==false,ds=(x,y)=>String(y.created_at).localeCompare(String(x.created_at));SER=(j.series||[]).filter(pub).sort(ds);EPS=(j.episodes||[]).filter(pub).sort(ds);CATS=(j.categories||[]).sort((x,y)=>x.sort-y.sort);(j.settings||[]).forEach(r=>{if(r.value!=="")S[r.key]=r.value});ok=1}catch(e2){}
if(!ok)throw err}
};
const render=async()=>{$$("script[type='application/ld+json']").forEach(x=>x.remove());S.site_name=String(S.site_name||"").replace(/\s*official\s*$/i,"").trim()||"Muhafiz Playz";theme();chrome();if(S.noindex==="1")meta("robots","noindex,nofollow");
if(S.maintenance==="1"){app.innerHTML=`<div class="mm"><h1>${esc(S.site_name)} Official</h1><p>${esc(S.maintenance_msg||"We are performing maintenance. Please check back soon.")}</p></div>`;return}
await ({home,series,watch,category,search,page}[P]||missing)();if(P==="watch"||P==="series")joinPopup();fx();
$$(".adraw").forEach(x=>x.append(frag(S["ad_html_"+x.dataset.r])));
if(S.adsense_client)$$(".adsbygoogle").forEach(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
};
const extras=()=>{
if(S.ga_id){addScript("https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(S.ga_id));window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",S.ga_id)}
if(S.clarity_id){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",S.clarity_id)}
if(S.adsense_client)addScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+encodeURIComponent(S.adsense_client),{crossorigin:"anonymous"});
if(S.head_code)document.head.append(frag(S.head_code));
if(S.body_code)document.body.append(frag(S.body_code));
};
(async()=>{
let c=null;try{c=JSON.parse(localStorage.getItem("mp_cache")||"null")}catch(e){}
const snap=()=>JSON.stringify({SER,EPS,CATS,S}),save=()=>{try{localStorage.setItem("mp_cache",snap())}catch(e){}};
if(c&&c.SER){SER=c.SER;EPS=c.EPS||[];CATS=c.CATS||[];S={...D,...c.S};const before=snap();render();extras();
try{await loadData();if(snap()!==before){save();render()}else save()}catch(e){}}
else{try{await loadData()}catch(err){app.innerHTML=`<div class="box"><h2>Could not load data</h2><p class="muted">${esc(err.message||err)}</p><p>Please check that the database setup is complete and config.js is correct.</p></div>`;return}
save();render();extras()}
})();
})();
