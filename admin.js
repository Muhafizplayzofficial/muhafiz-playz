(()=>{
const C=window.MP||{};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug=s=>String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const root=$("#root");
if(!C.SUPABASE_URL||C.SUPABASE_URL.includes("PASTE")){root.innerHTML='<h1>Setup baaki hai</h1><p>config.js mein Supabase URL aur key paste karein.</p>';return}
const sb=supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
let CATS=[],SER=[],tab="series",sel=null,keep={};
const SET=[["site_name","Site ka naam (Muhafiz Playz)","text"],["tagline","Tagline","text"],["announcement","Upar ki announcement (khali = band)","text"],["home_title","Home page ka bara heading","text"],["home_content","Home page ki lambi likhai (## heading, - list)","area"],["email","Contact email","text"],["whatsapp","WhatsApp number / link","text"],["facebook","Facebook link","text"],["telegram","Telegram link","text"],["youtube","YouTube link","text"],["instagram","Instagram link","text"],["adsense_client","AdSense Publisher ID (ca-pub-...)","text"],["ad_slot","AdSense Ad Unit (slot) ID","text"],["ga_id","Google Analytics ID (G-XXXX)","text"],["page_about","About page ka text (khali = default)","area"],["page_contact","Contact page ka text (khali = default)","area"],["page_disclaimer","Disclaimer text (khali = default)","area"],["page_dmca","DMCA text (khali = default)","area"],["page_privacy","Privacy text (khali = default)","area"],["page_terms","Terms text (khali = default)","area"]];
const SPEC={
series:{t:"mp_series",l:"Dramas",f:[["title","Drama ka naam","text"],["slug","Slug (khali chhodein to khud ban jayega)","text"],["category","Category","cat"],["year","Saal","text"],["status","Status (Ongoing / Completed)","text"],["poster","Poster (khara) - upload ya link","img"],["banner","Banner (chora) - upload ya link","img"],["description","Lambi description (## heading, - list)","area",14],["featured","Home par featured","chk"],["published","Site par dikhayein","chk",1]],n:r=>r.title},
episodes:{t:"mp_episodes",l:"Episodes",f:[["series_id","Drama","ser"],["season","Season","num",1],["number","Episode number","num"],["title","Title (optional)","text"],["thumb","Thumbnail (optional)","img"],["details","Episode details / story","area",10],["server1","Server 1 link (player/embed link)","text"],["server2","Server 2 link","text"],["dl720","Download 720p link","text"],["dl1080","Download 1080p link","text"],["dlbluray","Download Bluray link","text"],["published","Site par dikhayein","chk",1]],n:r=>`${(SER.find(s=>s.id===r.series_id)||{}).title||"?"} S${r.season} E${r.number}`},
categories:{t:"mp_categories",l:"Categories",f:[["name","Category ka naam","text"],["sort","Tarteeb (number)","num",0]],n:r=>r.name}};

function login(m=""){root.innerHTML=`<h1>Admin login</h1><div class="box f"><div><label>Email</label><input id="em" type="email" autocomplete="username"></div><div><label>Password</label><input id="pw" type="password" autocomplete="current-password"></div><p class="msg">${esc(m)}</p><button class="btn" id="go">Login</button></div>`;
$("#go").onclick=async()=>{const{error}=await sb.auth.signInWithPassword({email:$("#em").value.trim(),password:$("#pw").value});error?login(error.message):start()}}
async function start(){
const{data:{session}}=await sb.auth.getSession();if(!session)return login();
const{data:a}=await sb.from("mp_admins").select("user_id");
if(!a||!a.length){root.innerHTML=`<h1>Admin setup</h1><div class="box"><p>Ye account abhi admin nahi hai. Agar ye aap ka pehla login hai to neeche dabayen.</p><p class="msg" id="m"></p><button class="btn" id="cl">Mujhe admin banayein</button> <button class="btn o" id="lo">Logout</button></div>`;
$("#cl").onclick=async()=>{const{data,error}=await sb.rpc("mp_claim_admin");if(error)return $("#m").textContent=error.message;data?start():$("#m").textContent="Admin pehle se bana hua hai. Usi account se login karein."};$("#lo").onclick=async()=>{await sb.auth.signOut();login()};return}
await refs();draw();}
async function refs(){const[c,s]=await Promise.all([sb.from("mp_categories").select("*").order("sort"),sb.from("mp_series").select("*").order("created_at",{ascending:false})]);CATS=c.data||[];SER=s.data||[]}
async function draw(m=""){
root.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><h1>Admin dashboard</h1><button class="btn o sm" id="lo">Logout</button></div>
<div class="tabs">${[["series","Dramas"],["episodes","Episodes"],["categories","Categories"],["settings","Settings"],["tools","Tools"]].map(([k,v])=>`<button class="tab${k==tab?" on":""}" data-t="${k}">${v}</button>`).join("")}</div><p class="msg">${esc(m)}</p><div id="body"></div>`;
$("#lo").onclick=async()=>{await sb.auth.signOut();login()};
$$("[data-t]").forEach(b=>b.onclick=()=>{tab=b.dataset.t;sel=null;draw()});
tab==="settings"?await settings():tab==="tools"?tools():await crud();}
async function crud(){
const sp=SPEC[tab];let q=sb.from(sp.t).select("*").order(tab==="categories"?"sort":"created_at",{ascending:tab==="categories"});
const{data,error}=await q;if(error)return $("#body").innerHTML=`<p class="msg">${esc(error.message)}</p>`;
const row=sel?data.find(r=>r.id===sel):null,d={...keep,...(row||{})};keep={};
const fld=([k,l,ty,x])=>{const v=d[k]??(x!==undefined&&!row?x:"");
if(ty==="area")return`<div><label>${l}</label><textarea data-k="${k}" rows="${x||6}">${esc(v)}</textarea></div>`;
if(ty==="chk")return`<label><input type="checkbox" data-k="${k}" ${v?"checked":""}> ${l}</label>`;
if(ty==="cat")return`<div><label>${l}</label><input data-k="${k}" list="cl" value="${esc(v)}"><datalist id="cl">${CATS.map(c=>`<option value="${esc(c.name)}">`).join("")}</datalist></div>`;
if(ty==="ser")return`<div><label>${l}</label><select data-k="${k}">${SER.map(s=>`<option value="${s.id}" ${s.id==v?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div>`;
if(ty==="img")return`<div><label>${l}</label><div class="row"><input data-k="${k}" value="${esc(v)}" placeholder="https://..."><input type="file" accept="image/*" data-up="${k}" style="max-width:150px"></div></div>`;
return`<div><label>${l}</label><input data-k="${k}" ${ty==="num"?'type="number"':""} value="${esc(v)}"></div>`};
$("#body").innerHTML=`<div class="box f"><h2>${row?"Edit karein":"Naya add karein"} (${sp.l})</h2>${sp.f.map(fld).join("")}<div><button class="btn" id="sv">${row?"Changes save karein":"Save karein"}</button>${row?'<button class="btn o" id="nw">Naya banayein</button>':""}</div></div>
<div class="box"><h2>Saved ${sp.l} (${data.length})</h2>${data.map(r=>`<div class="li"><span>${esc(sp.n(r))}${r.published===false?" (hidden)":""}</span><span><button class="btn o sm" data-e="${r.id}">Edit</button><button class="btn o sm" data-d="${r.id}">Delete</button></span></div>`).join("")||'<p class="muted">Abhi kuch nahi.</p>'}</div>`;
$$("[data-up]").forEach(i=>i.onchange=async()=>{const f=i.files[0];if(!f)return;const n=Date.now()+"-"+slug(f.name.replace(/\.[^.]+$/,""))+"."+(f.name.split(".").pop()||"jpg").toLowerCase();
const{error}=await sb.storage.from("posters").upload(n,f);if(error)return alert(error.message);$(`[data-k=${i.dataset.up}]`).value=sb.storage.from("posters").getPublicUrl(n).data.publicUrl});
$("#sv").onclick=async()=>{const o={};for(const el of $$("[data-k]")){const k=el.dataset.k,ty=sp.f.find(f=>f[0]===k)[2];o[k]=ty==="chk"?el.checked:ty==="num"||ty==="ser"?(el.value===""?null:Number(el.value)):(el.value.trim()||null)}
if(tab==="series"){if(!o.title)return alert("Drama ka naam likhein.");o.slug=slug(o.slug||o.title);if(o.category&&!CATS.some(c=>c.name===o.category))await sb.from("mp_categories").insert({name:o.category,sort:CATS.length+1})}
if(tab==="episodes"&&(!o.series_id||o.number==null))return alert("Drama aur Episode number zaroori hain.");
if(tab==="categories"&&!o.name)return alert("Category ka naam likhein.");
const{error}=row?await sb.from(sp.t).update(o).eq("id",row.id):await sb.from(sp.t).insert(o);
if(error)return alert(error.message);await refs();
if(tab==="episodes"&&!row){keep={series_id:o.series_id,season:o.season,number:o.number+1,published:true};sel=null;return draw("Episode save ho gaya. Agla episode number tayyar hai.")}
sel=null;draw("Save ho gaya.")};
if(row)$("#nw").onclick=()=>{sel=null;draw()};
$$("[data-e]").forEach(b=>b.onclick=()=>{sel=+b.dataset.e;draw();scrollTo(0,0)});
$$("[data-d]").forEach(b=>b.onclick=async()=>{if(!confirm("Delete karein? Ye wapas nahi aayega."))return;const{error}=await sb.from(sp.t).delete().eq("id",+b.dataset.d);if(error)return alert(error.message);await refs();sel=null;draw("Delete ho gaya.")});}
async function settings(){
const{data}=await sb.from("mp_settings").select("*"),v=Object.fromEntries((data||[]).map(r=>[r.key,r.value]));
$("#body").innerHTML=`<div class="box f"><h2>Site settings</h2>${SET.map(([k,l,t])=>`<div><label>${l}</label>${t==="area"?`<textarea data-s="${k}" rows="6">${esc(v[k]||"")}</textarea>`:`<input data-s="${k}" value="${esc(v[k]||"")}">`}</div>`).join("")}<div><button class="btn" id="ss">Settings save karein</button></div></div>`;
$("#ss").onclick=async()=>{const rows=$$("[data-s]").map(e=>({key:e.dataset.s,value:e.value.trim()}));const{error}=await sb.from("mp_settings").upsert(rows);error?alert(error.message):draw("Settings save ho gayi.")}}
function tools(){
$("#body").innerHTML=`<div class="box"><h2>Sitemap (Google ke liye)</h2><p>Naya drama ya episode add karne ke baad ye button dabayen, sitemap.xml download hogi. Usay GitHub mein purani sitemap.xml ki jagah upload karein.</p><button class="btn" id="sm">sitemap.xml download karein</button></div>
<div class="box"><h2>ads.txt</h2><p>AdSense approve hone ke baad GitHub mein ads.txt kholen aur ye line likhein (pub-id apni daalein):</p><p><code>google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0</code></p></div>`;
$("#sm").onclick=async()=>{const[s,e]=await Promise.all([sb.from("mp_series").select("slug,created_at").eq("published",true),sb.from("mp_episodes").select("id,created_at").eq("published",true)]);const o=location.origin,u=[[o+"/",""]];
(s.data||[]).forEach(x=>u.push([`${o}/series.html?s=${encodeURIComponent(x.slug)}`,x.created_at]));(e.data||[]).forEach(x=>u.push([`${o}/watch.html?id=${x.id}`,x.created_at]));
const x='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+u.map(([l,d])=>`<url><loc>${esc(l)}</loc>${d?`<lastmod>${d.slice(0,10)}</lastmod>`:""}</url>`).join("\n")+"\n</urlset>\n";
const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([x],{type:"application/xml"}));a.download="sitemap.xml";a.click()}}
sb.auth.onAuthStateChange(()=>{});
start();
})();
