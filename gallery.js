const images=[
 {file:"foundation-support.png",title:"Foundation support",width:1523,height:681},
 {file:"foundation-logo.png",title:"Foundation logo",width:300,height:102,logo:true},
 {file:"mitch-rush-of-love.png",title:"Rush of Love",width:494,height:500,mitch:true},
 {file:"amy-illustration.png",title:"Amy illustration",width:1000,height:1000},
 {file:"foundation-window.png",title:"Foundation portrait",width:180,height:365},
 {file:"mitch-and-amy.png",title:"Mitch & Amy",width:700,height:875},
 {file:"mitch-and-amy-black-white.png",title:"Mitch & Amy, black and white",width:2447,height:1948},
 {file:"mitch-portrait.png",title:"Mitch portrait",width:2048,height:1536,mitch:true},
 {file:"mitch-microphone.png",title:"Mitch at the microphone",width:350,height:350,mitch:true},
 {file:"mitch-event.png",title:"Mitch at an event",width:620,height:349,mitch:true}
];
const mitch=location.pathname.endsWith("/mitch.html");
document.querySelector(`[data-nav="${mitch?"mitch":"all"}"]`).setAttribute("aria-current","page");
if(mitch){
 document.title="Mitch Winehouse | Amy Winehouse Foundation event";
 document.querySelector("#headline").innerHTML="Mitch<br>Winehouse.";
 document.querySelector("#intro").textContent="The four solo images. Original files, ready to copy or download.";
 document.querySelector("#zip").href="downloads/mitch-images.zip";
 document.querySelector("#zip").innerHTML='Download Mitch images <span aria-hidden="true">↓</span>';
 document.querySelector("#collection-title").textContent="Mitch, in focus.";
 document.querySelector("#count").textContent="4 original files";
}
const selected=mitch?images.filter(i=>i.mitch):images;
document.querySelector("#gallery").innerHTML=selected.map(i=>`<article class="card">
 <a class="image-wrap ${i.logo?"logo":""}" href="assets/${i.file}" target="_blank" rel="noopener" aria-label="Open ${i.title} full size"><img src="assets/${i.file}" alt="${i.title}" loading="lazy" width="${i.width}" height="${i.height}"></a>
 <h3>${i.title}</h3><p class="meta">${i.width} × ${i.height} px · PNG</p>
 <div class="actions"><button type="button" data-copy="${i.file}">Copy image</button><a href="assets/${i.file}" download>Download</a><a href="assets/${i.file}" target="_blank" rel="noopener">Full size ↗</a></div></article>`).join("");
let timer;
function notify(message){const status=document.querySelector("#status");status.textContent=message;status.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>status.classList.remove("show"),4200)}
document.querySelectorAll("[data-copy]").forEach(button=>button.addEventListener("click",async()=>{
 const original=button.textContent;
 try{
  if(!navigator.clipboard?.write||typeof ClipboardItem==="undefined")throw new Error("Clipboard unavailable");
  const blob=fetch(`assets/${button.dataset.copy}`).then(r=>{if(!r.ok)throw new Error("Image unavailable");return r.blob()}).then(b=>new Blob([b],{type:"image/png"}));
  await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);
  button.textContent="Copied";notify("Image copied. Ready to paste.");setTimeout(()=>button.textContent=original,2200);
 }catch(error){notify("Your browser blocked copying. Use Download to save the original image.")}
}));
