/* Hides the removed Views feature from the admin dashboard */
(()=>{const root=document.getElementById("root");if(!root)return;
const hide=()=>{
document.querySelectorAll(".box h2").forEach(h=>{if(/^(Views,|Views by|Most viewed)/i.test(h.textContent.trim())){const b=h.closest(".box");if(b)b.style.display="none"}});
document.querySelectorAll(".stat").forEach(s=>{if(/Total views/i.test(s.textContent))s.style.display="none"});
document.querySelectorAll(".li span").forEach(sp=>{if(/ \u00b7 \d+ views/.test(sp.textContent))sp.innerHTML=sp.innerHTML.replace(/ \u00b7 \d+ views/,"")})};
new MutationObserver(hide).observe(root,{childList:true,subtree:true});hide()})();
