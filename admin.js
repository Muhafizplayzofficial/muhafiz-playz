(()=>{
const C=window.MP||{};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const root=$("#root");
if(!C.SUPABASE_URL||C.SUPABASE_URL.includes("PASTE")){root.innerHTML='<div class="lg"><h1>Setup incomplete</h1><p>Paste your Supabase URL and key into config.js.</p></div>';return}
const sb=supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
let CATS=[],SER=[],S={},view="dash",sel=null,keep={};
const md=t=>{let o="",p=[],l=[];const f=()=>{if(p.length)o+=`<p>${p.join(" ")}</p>`;if(l.length)o+=`<ul>${l.join("")}</ul>`;p=[];l=[]};
const inl=x=>x.replace(/!\[([^\]]*)\]\((https?:[^)\s]+)\)/g,'<img src="$2" alt="$1" style="max-width:100%">').replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,'<a href="$2">$1</a>').replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
for(const r of esc(t||"").split("\n")){const s=r.trim();
if(!s)f();else if(/^\[(episodes|player|download|dramas|season\s*\d+)\]$/i.test(s)){f();o+=`<p class="mk">[ ${s.slice(1,-1)} block appears here ]</p>`}else if(s.startsWith("### ")){f();o+=`<h3>${inl(s.slice(4))}</h3>`}else if(s.startsWith("## ")){f();o+=`<h2>${inl(s.slice(3))}</h2>`}else if(s.startsWith("- ")){if(p.length){o+=`<p>${p.join(" ")}</p>`;p=[]}l.push(`<li>${inl(s.slice(2))}</li>`)}else{if(l.length){o+=`<ul>${l.join("")}</ul>`;l=[]}p.push(inl(s))}}
f();return o};
const TOG=[["1","Yes (on)"],["0","No (off)"]];
const G={
general:["General",[["site_name","Site name","text","Muhafiz Playz"],["tagline","Tagline","text"],["announcement","Announcement bar at the very top (empty = hidden)","text"],["logo_url","Header logo URL (empty = built-in logo)","text"],["favicon_url","Favicon URL (empty = built-in icon)","text"],["footer_text","Extra footer line","text"],["email","Contact email","text"],["whatsapp","WhatsApp number","text"],["whatsapp_group","WhatsApp channel or group link","text"],["maintenance","Maintenance mode (site hidden, message only)","chk"],["maintenance_msg","Maintenance message","text"]]],
home:["Home & Layout",[["home_title","Home page main heading (H1)","text"],["home_content","Home page long text. Use ## for headings, - for lists, **bold**. Write [dramas] on its own line where the drama images should appear.","area",12],["show_sidebar","Sidebar (categories and popular)","tog"],["show_popular","Popular Series in sidebar","tog"],["show_articles","Long section for each drama on home","tog"],["show_faq","Show FAQ","tog"],["show_share","Bottom share bar","tog"],["latest_count","Latest episodes to show","num","12"],["popular_count","Popular series to show","num","6"],["articles_count","Drama sections on home","num","6"]]],
look:["Appearance",[["c_accent","Primary color (gold)","color","#ffc400"],["c_accent2","Secondary color (orange)","color","#ff7a00"],["c_bg","Background","color","#0f0d12"],["c_card","Card and box color","color","#1a171f"],["c_text","Text color","color","#f4efe6"]]],
players:["Players & Downloads",[["server1_label","Server 1 name","text","Server 1"],["server2_label","Server 2 name","text","Server 2"],["server3_label","Server 3 name","text","Server 3"],["server4_label","Server 4 name","text","Server 4"],["player_note","Note under the player","text","If the video does not play, try another server."],["show_newtab","Show the Open in new tab link","tog"],["dl_title","Download box heading","text","Download"]]],
ads:["Ads",[["adsense_client","AdSense publisher ID (ca-pub-...)","text"],["ad_slot","Default ad unit (slot) ID","text"],["ad_slot_header","Top ad slot ID","text"],["ad_slot_content","In-content ad slot ID","text"],["ad_slot_sidebar","Sidebar ad slot ID","text"],["ads_home","Ads on the home page","tog"],["ads_series","Ads on drama pages","tog"],["ads_watch","Ads on episode pages","tog"],["ad_html_header","Top custom ad code (other networks, HTML)","area",4],["ad_html_content","In-content custom ad code","area",4],["ad_html_sidebar","Sidebar custom ad code","area",4]]],
seo:["SEO & Analytics",[["title_suffix","Text added to the end of every page title","text"," | Muhafiz Playz Official"],["default_meta_desc","Default meta description","area",3],["og_image","Share image URL (empty = built-in image)","text"],["noindex","Hide site from search engines (noindex)","chk"],["ga_id","Google Analytics ID (G-XXXXXXX)","text"],["clarity_id","Microsoft Clarity ID","text"],["head_code","Custom code (inside head)","area",4],["body_code","Custom code (end of page)","area",4]]],
social:["Social",[["facebook","Facebook link","text"],["telegram","Telegram link","text"],["youtube","YouTube link","text"],["instagram","Instagram link","text"],["twitter","X (Twitter) link","text"],["tiktok","TikTok link","text"]]],
pages:["Pages",[["page_about","About Us (empty = default text)","area",10],["page_contact","Contact Us","area",8],["page_disclaimer","Disclaimer","area",8],["page_dmca","DMCA","area",8],["page_privacy","Privacy Policy","area",10],["page_terms","Terms and Conditions","area",8]]]};
const SPEC={
series:{t:"mp_series",l:"Drama",f:[["title","Drama name","text"],["slug","Slug (empty = created automatically)","text"],["category","Category","cat"],["year","Year","text"],["status","Status (Ongoing or Completed)","text"],["poster","Poster (portrait): upload or link","img"],["banner","Banner (wide, large): upload or link","img"],["description","Write the full story and details here. Place [episodes] where all seasons should appear, or [season 1], [season 2] to place each season separately.","ed",18],["tags","Tags (comma separated)","text"],["meta_title","SEO title (optional)","text"],["meta_desc","SEO description (optional)","area",2],["popular","Show in sidebar Popular Series","chk"],["published","Visible on the site","chk",1]],n:r=>r.title},
episodes:{t:"mp_episodes",l:"Episode",f:[["series_id","Drama","ser"],["season","Season","num",1],["number","Episode number","num"],["title","Title (optional)","text"],["thumb","Thumbnail (optional): upload or link","img"],["details","Write the episode details here. Place [player] where the video should appear and [download] where the download buttons should appear.","ed",14],["server1","Server 1 link","text"],["server2","Server 2 link","text"],["server3","Server 3 link (optional)","text"],["server4","Server 4 link (optional)","text"],["dl480","Download 480p link","text"],["dl720","Download 720p link","text"],["dl1080","Download 1080p link","text"],["dlbluray","Download Bluray link","text"],["meta_desc","SEO description (optional)","area",2],["published","Visible on the site","chk",1]],n:r=>`${(SER.find(s=>s.id===r.series_id)||{}).title||"?"}, S${r.season} E${r.number}`},
categories:{t:"mp_categories",l:"Category",f:[["name","Category name","text"],["sort","Order (number)","num",0]],n:r=>r.name}};
const BASE=[["H2","\n## ","\n","Big heading"],["H3","\n### ","\n","Small heading"],["Bold","**","**","text"],["List","\n- ","","item"],["Link","L"],["Photo","I"]];
const TB={series:[...BASE,["[episodes]","\n[episodes]\n","",""],["Season block","S"]],episodes:[...BASE,["[player]","\n[player]\n","",""],["[download]","\n[download]\n","",""]]};
const NAV=[["dash","Dashboard"],["h","Content"],["series","Dramas"],["episodes","Episodes"],["categories","Categories"],["h","Settings"],...Object.entries(G).map(([k,v])=>["s:"+k,v[0]]),["h","System"],["tools","Tools & Backup"]];

function login(m=""){root.innerHTML=`<div class="lg"><img src="logo.png" alt="" width="64" height="64"><h1>Admin login</h1><div class="f"><div><label>Email</label><input id="em" type="email" autocomplete="username"></div><div><label>Password</label><input id="pw" type="password" autocomplete="current-password"></div><p class="msg">${esc(m)}</p><button class="btn" id="go">Log in</button></div></div>`;
const go=async()=>{const{error}=await sb.auth.signInWithPassword({email:$("#em").value.trim(),password:$("#pw").value});error?login(error.message):start()};$("#go").onclick=go;$("#pw").onkeydown=e=>{if(e.key==="Enter")go()}}
async function start(){
const{data:{session}}=await sb.auth.getSession();if(!session)return login();
const{data:a}=await sb.from("mp_admins").select("user_id");
if(!a||!a.length){root.innerHTML=`<div class="lg"><img src="logo.png" alt="" width="64" height="64"><h1>Access denied</h1><p>This account does not have admin access.</p><button class="btn o" id="lo">Log out</button></div>`;$("#lo").onclick=async()=>{await sb.auth.signOut();login()};return}
await refs();draw();}
async function refs(){const[c,s,t]=await Promise.all([sb.from("mp_categories").select("*").order("sort"),sb.from("mp_series").select("*").order("created_at",{ascending:false}),sb.from("mp_settings").select("*")]);CATS=c.data||[];SER=s.data||[];S=Object.fromEntries((t.data||[]).map(r=>[r.key,r.value]))}
function draw(m=""){
const cur=NAV.find(n=>n[0]===view)||NAV[0];
root.innerHTML=`<div class="shell"><aside class="side" id="side"><div class="sl"><img src="logo.png" alt="" width="40" height="40"><div><b>MUHAFIZ PLAYZ</b><i>ADMIN</i></div></div><nav>${NAV.map(([k,v])=>k==="h"?`<h4>${v}</h4>`:`<a data-v="${k}" class="${k===view?"on":""}">${v}</a>`).join("")}</nav><div class="sf2"><a class="btn o sm" href="index.html" target="_blank">View site</a><button class="btn o sm" id="lo">Log out</button></div></aside><div class="dim" id="dim"></div>
<section class="mn"><div class="top"><button id="mb" aria-label="Menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><h1>${esc(cur[1])}</h1></div><p class="msg">${esc(m)}</p><div id="body"></div></section></div>`;
const tg=o=>{$("#side").classList.toggle("on",o);$("#dim").classList.toggle("on",o)};
$("#mb").onclick=()=>tg(true);$("#dim").onclick=()=>tg(false);
$("#lo").onclick=async()=>{await sb.auth.signOut();login()};
$$("[data-v]").forEach(a=>a.onclick=()=>go(a.dataset.v));
if(view==="dash")dash();else if(view==="tools")tools();else if(view.startsWith("s:"))settings(view.slice(2));else crud();}
const go=(v,id=null)=>{view=v;sel=id;draw();scrollTo(0,0)};

async function dash(){
const{data,error}=await sb.from("mp_episodes").select("id,series_id,season,number,views,created_at").order("created_at",{ascending:false});
if(error)return $("#body").innerHTML=`<div class="box"><p class="msg">${esc(error.message)}</p><p>Please run supabase-update.sql in Supabase first.</p></div>`;
const nm=r=>`${(SER.find(s=>s.id===r.series_id)||{}).title||"?"}, S${r.season} E${r.number}`,tv=data.reduce((n,e)=>n+(e.views||0),0);
const ck=[["AdSense publisher ID",S.adsense_client],["Google Analytics ID",S.ga_id],["Contact email",S.email],["WhatsApp channel link",S.whatsapp_group],["Facebook or Telegram link",S.facebook||S.telegram],["Home page long text",S.home_content]];
$("#body").innerHTML=`<div class="stats"><div class="stat"><b>${SER.length}</b>Dramas</div><div class="stat"><b>${data.length}</b>Episodes</div><div class="stat"><b>${CATS.length}</b>Categories</div><div class="stat"><b>${tv}</b>Total views</div></div>
<div class="box"><h2>Quick actions</h2><button class="btn" data-g="series">Add drama</button><button class="btn" data-g="episodes">Add episode</button><button class="btn o" data-g="s:general">Settings</button></div>
<div class="box"><h2>Most viewed episodes</h2>${[...data].sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,5).map(r=>`<div class="li"><span>${esc(nm(r))}</span><b>${r.views||0}</b></div>`).join("")||'<p class="muted">No episodes yet.</p>'}</div>
<div class="box"><h2>Latest episodes</h2>${data.slice(0,5).map(r=>`<div class="li"><span>${esc(nm(r))}</span><button class="btn o sm" data-ed="${r.id}">Edit</button></div>`).join("")||'<p class="muted">No episodes yet.</p>'}</div>
<div class="box"><h2>Setup checklist</h2>${ck.map(([l,v])=>`<div class="ck"><span>${l}</span><span class="${v?"ok":"no"}">${v?"Done":"Pending"}</span></div>`).join("")}</div>`;
$$("[data-g]").forEach(b=>b.onclick=()=>go(b.dataset.g));$$("[data-ed]").forEach(b=>b.onclick=()=>go("episodes",+b.dataset.ed))}

function ins(ta,b,a,ph){const s=ta.selectionStart,e=ta.selectionEnd,t=ta.value.slice(s,e)||ph;ta.setRangeText(b+t+a,s,e,"end");ta.focus()}
async function crud(){
const tab=view,sp=SPEC[tab];
const{data,error}=await sb.from(sp.t).select("*").order(tab==="categories"?"sort":"created_at",{ascending:tab==="categories"});
if(error)return $("#body").innerHTML=`<p class="msg">${esc(error.message)}</p>`;
const row=sel?data.find(r=>r.id===sel):null,d={...keep,...(row||{})};keep={};
const lbl=k=>/^server\d$/.test(k)?(S[k+"_label"]||""):"";
const fld=([k,l,ty,x])=>{const v=d[k]??(x!==undefined&&!row?x:"");
if(ty==="ed")return`<div><label>${l}</label><div class="tb">${TB[tab].map((b,i)=>`<button type="button" data-tb="${i}" data-for="${k}">${b[0]}</button>`).join("")}<button type="button" data-pv="${k}">Preview</button></div><textarea data-k="${k}" rows="${x}">${esc(v)}</textarea><div class="prev prose" id="pv-${k}" hidden></div><p class="hint">Use ## for a big heading, ### for a small heading, - for lists and **bold**. Write as much as you like: more text means better search results.</p></div>`;
if(ty==="area")return`<div><label>${l}</label><textarea data-k="${k}" rows="${x||4}">${esc(v)}</textarea></div>`;
if(ty==="chk")return`<label><input type="checkbox" data-k="${k}" ${v?"checked":""}> ${l}</label>`;
if(ty==="cat")return`<div><label>${l}</label><input data-k="${k}" list="cl" value="${esc(v)}"><datalist id="cl">${CATS.map(c=>`<option value="${esc(c.name)}">`).join("")}</datalist></div>`;
if(ty==="ser")return`<div><label>${l}</label><select data-k="${k}">${SER.map(s=>`<option value="${s.id}" ${s.id==v?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div>`;
if(ty==="img")return`<div><label>${l}</label><div class="row"><input data-k="${k}" value="${esc(v)}" placeholder="https://..."><input type="file" accept="image/*" data-up="${k}" style="max-width:150px"></div></div>`;
return`<div><label>${l}${lbl(k)?` (${esc(lbl(k))})`:""}</label><input data-k="${k}" ${ty==="num"?'type="number"':""} value="${esc(v)}"></div>`};
$("#body").innerHTML=`<div class="box f"><h2>${row?"Edit":"Add new"} ${sp.l}</h2>${sp.f.map(fld).join("")}<div><button class="btn" id="sv">${row?"Save changes":"Save"}</button>${row?'<button class="btn o" id="nw">Add new</button>':""}</div></div>
<div class="box"><h2>Saved (${data.length})</h2><div class="f"><input id="flt" placeholder="Search...">${tab==="episodes"?`<select id="fs"><option value="">All dramas</option>${SER.map(s=>`<option value="${s.id}">${esc(s.title)}</option>`).join("")}</select>`:""}</div><div id="lst"></div></div>`;
const list=()=>{const q=$("#flt").value.toLowerCase(),fs=$("#fs")?$("#fs").value:"";
$("#lst").innerHTML=data.filter(r=>sp.n(r).toLowerCase().includes(q)&&(!fs||r.series_id==fs)).map(r=>`<div class="li"><span>${esc(sp.n(r))}${r.published===false?" (hidden)":""}${r.views?` · ${r.views} views`:""}</span><span><button class="btn o sm" data-e="${r.id}">Edit</button><button class="btn o sm" data-d="${r.id}">Delete</button></span></div>`).join("")||'<p class="muted">Nothing found.</p>';
$$("[data-e]").forEach(b=>b.onclick=()=>go(tab,+b.dataset.e));
$$("[data-d]").forEach(b=>b.onclick=async()=>{if(!confirm("Delete this item? This cannot be undone."))return;const{error}=await sb.from(sp.t).delete().eq("id",+b.dataset.d);if(error)return alert(error.message);await refs();sel=null;draw("Deleted.")})};
list();$("#flt").oninput=list;if($("#fs"))$("#fs").onchange=list;
$$("[data-tb]").forEach(b=>b.onclick=()=>{const ta=$(`[data-k=${b.dataset.for}]`),t=TB[tab][+b.dataset.tb];
if(t[1]==="L"){const u=prompt("Link (https://...)");if(u)ins(ta,"[","]("+u+")","link text")}else if(t[1]==="I"){const u=prompt("Photo link (https://...)");if(u)ins(ta,"\n![","]("+u+")\n","photo")}else if(t[1]==="S"){const n=prompt("Season number");if(n)ins(ta,`\n[season ${parseInt(n)||1}]\n`,"","")}else ins(ta,t[1],t[2],t[3])});
$$("[data-pv]").forEach(b=>b.onclick=()=>{const p=$("#pv-"+b.dataset.pv);p.hidden=!p.hidden;if(!p.hidden)p.innerHTML=md($(`[data-k=${b.dataset.pv}]`).value)});
$$("[data-up]").forEach(i=>i.onchange=async()=>{const f=i.files[0];if(!f)return;const n=Date.now()+"-"+slug(f.name.replace(/\.[^.]+$/,""))+"."+(f.name.split(".").pop()||"jpg").toLowerCase();
const{error}=await sb.storage.from("posters").upload(n,f);if(error)return alert(error.message);$(`[data-k=${i.dataset.up}]`).value=sb.storage.from("posters").getPublicUrl(n).data.publicUrl});
$("#sv").onclick=async()=>{const o={};for(const el of $$("[data-k]")){const k=el.dataset.k,ty=sp.f.find(f=>f[0]===k)[2];o[k]=ty==="chk"?el.checked:ty==="num"||ty==="ser"?(el.value===""?null:Number(el.value)):(el.value.trim()||null)}
if(tab==="series"){if(!o.title)return alert("Please enter the drama name.");o.slug=slug(o.slug||o.title);if(o.category&&!CATS.some(c=>c.name===o.category))await sb.from("mp_categories").insert({name:o.category,sort:CATS.length+1})}
if(tab==="episodes"&&(!o.series_id||o.number==null))return alert("Drama and episode number are required.");
if(tab==="categories"&&!o.name)return alert("Please enter the category name.");
const{error}=row?await sb.from(sp.t).update(o).eq("id",row.id):await sb.from(sp.t).insert(o);
if(error)return alert(error.message);await refs();
if(tab==="episodes"&&!row){keep={series_id:o.series_id,season:o.season,number:o.number+1,published:true};sel=null;return draw("Episode saved. The next episode number is ready.")}
sel=null;draw("Saved.")};
if(row)$("#nw").onclick=()=>go(tab);}

function settings(k){
const g=G[k];
$("#body").innerHTML=`<div class="box f"><h2>${g[0]}</h2>${g[1].map(([k,l,ty,x])=>{const v=S[k]??"";
if(ty==="area")return`<div><label>${l}</label><textarea data-s="${k}" rows="${x||4}">${esc(v)}</textarea></div>`;
if(ty==="chk")return`<label><input type="checkbox" data-s="${k}" ${v==="1"?"checked":""}> ${l}</label>`;
if(ty==="tog")return`<div><label>${l}</label><select data-s="${k}">${TOG.map(([a,b])=>`<option value="${a}" ${(v||"1")===a?"selected":""}>${b}</option>`).join("")}</select></div>`;
if(ty==="color")return`<div><label>${l}</label><div class="row"><input data-s="${k}" value="${esc(v)}" placeholder="${x}"><input type="color" value="${/^#[0-9a-f]{6}$/i.test(v)?v:x}" data-cp="${k}" style="width:56px;padding:2px"></div></div>`;
return`<div><label>${l}</label><input data-s="${k}" ${ty==="num"?'type="number"':""} value="${esc(v)}" placeholder="${esc(x||"")}"></div>`}).join("")}<div><button class="btn" id="ss">Save settings</button></div></div>`;
$$("[data-cp]").forEach(c=>c.oninput=()=>{$(`[data-s=${c.dataset.cp}]`).value=c.value});
$("#ss").onclick=async()=>{const rows=$$("[data-s]").map(e=>({key:e.dataset.s,value:e.type==="checkbox"?(e.checked?"1":""):e.value.trim()}));const{error}=await sb.from("mp_settings").upsert(rows);if(error)return alert(error.message);await refs();draw("Settings saved. Refresh the website to see the changes.")}}

function tools(){
const pub=(S.adsense_client||"ca-pub-XXXXXXXXXXXXXXXX").replace("ca-","");
$("#body").innerHTML=`<div class="box"><h2>Sitemap (for Google)</h2><p>After adding a new drama or episode, click this button to download sitemap.xml, then upload it to GitHub to replace the old sitemap.xml.</p><button class="btn" id="sm">Download sitemap.xml</button></div>
<div class="box"><h2>ads.txt</h2><p>For AdSense, open ads.txt in GitHub and write this line:</p><p><code>google.com, ${esc(pub)}, DIRECT, f08c47fec0942fa0</code></p></div>
<div class="box f"><h2>Change password</h2><input id="np" type="password" placeholder="New password (at least 8 characters)"><p class="msg" id="pm"></p><div><button class="btn" id="cp">Change password</button></div></div>
<div class="box"><h2>Backup</h2><p>Download all your data (dramas, episodes, categories and settings) as one file. Do this once a month.</p><button class="btn" id="bk">Download backup</button></div>`;
$("#sm").onclick=async()=>{const[s,e]=await Promise.all([sb.from("mp_series").select("slug,created_at").eq("published",true),sb.from("mp_episodes").select("id,created_at").eq("published",true)]);const o=location.origin,u=[[o+"/",""]];
(s.data||[]).forEach(x=>u.push([`${o}/series.html?s=${encodeURIComponent(x.slug)}`,x.created_at]));(e.data||[]).forEach(x=>u.push([`${o}/watch.html?id=${x.id}`,x.created_at]));
dl("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+u.map(([l,d])=>`<url><loc>${esc(l)}</loc>${d?`<lastmod>${d.slice(0,10)}</lastmod>`:""}</url>`).join("\n")+"\n</urlset>\n","application/xml")};
$("#cp").onclick=async()=>{const p=$("#np").value;if(p.length<8)return $("#pm").textContent="Use at least 8 characters.";const{error}=await sb.auth.updateUser({password:p});$("#pm").textContent=error?error.message:"Password changed."};
$("#bk").onclick=async()=>{const r=await Promise.all(["mp_categories","mp_series","mp_episodes","mp_settings"].map(t=>sb.from(t).select("*")));dl("muhafiz-backup-"+new Date().toISOString().slice(0,10)+".json",JSON.stringify(Object.fromEntries(["categories","series","episodes","settings"].map((k,i)=>[k,r[i].data||[]])),null,1),"application/json")}}
const dl=(n,t,m)=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:m}));a.download=n;a.click()};
start();
})();
