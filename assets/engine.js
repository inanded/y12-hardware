/* Year 12 Hardware: shared lesson engine.
   Stages, progress, help buttons, read-aloud, checks and the step-by-step animation player.
   No libraries, no network calls. Browser storage is a convenience only. */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={
  get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const PRINT=/[?&]print/.test(location.search);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function toast(msg){let t=$(".toast");if(!t){t=document.createElement("div");t.className="toast";t.setAttribute("role","status");document.body.appendChild(t)}
  t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),3200)}

/* ---------- read aloud ---------- */
function say(text){
  if(!("speechSynthesis" in window)){toast("Read-aloud is not available on this device.");return}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-GB";u.rate=.9;
  const v=speechSynthesis.getVoices().find(v=>/en-GB/i.test(v.lang));if(v)u.voice=v;speechSynthesis.speak(u)}
document.addEventListener("click",e=>{const b=e.target.closest(".say");if(b){say(b.dataset.say||b.parentElement.textContent)}});

/* ---------- stages ---------- */
const Lesson={};
Lesson.init=function(id){
  Lesson.id=id;
  const stages=$$(".stage"), bar=$(".steps"), where=$(".where");
  if(PRINT){stages.forEach(s=>s.classList.add("on"));document.body.classList.add("print");return}
  stages.forEach((s,i)=>{const b=document.createElement("button");b.title=(i+1)+". "+s.dataset.title;b.setAttribute("aria-label","Go to stage "+(i+1)+": "+s.dataset.title);b.onclick=()=>go(i);bar.appendChild(b)});
  let cur=Math.min(store.get(id+":stage",0),stages.length-1);
  const back=$("#back"), next=$("#next");
  function go(i){
    cur=Math.max(0,Math.min(stages.length-1,i));
    stages.forEach((s,j)=>s.classList.toggle("on",j===cur));
    $$("button",bar).forEach((b,j)=>{b.className=j<cur?"done":j===cur?"now":""});
    const s=stages[cur];
    where.innerHTML=`<span>Stage ${cur+1} of ${stages.length}: <b>${esc(s.dataset.title)}</b></span><span>${s.dataset.by?("Be here by minute "+esc(s.dataset.by)):""}</span>`;
    back.disabled=cur===0;
    next.textContent=cur===stages.length-1?"Finished":"Next stage →";
    next.disabled=cur===stages.length-1;
    store.set(id+":stage",cur);
    window.scrollTo({top:0,behavior:"instant"in window?"instant":"auto"});
    document.dispatchEvent(new CustomEvent("stage",{detail:{index:cur,el:s}}));
  }
  back.onclick=()=>go(cur-1); next.onclick=()=>go(cur+1);
  $$("[data-goto]").forEach(b=>b.addEventListener("click",()=>go(+b.dataset.goto-1)));
  /* stuck */
  $(".stuckbtn").onclick=()=>{
    const s=stages[cur].dataset.title, list=store.get(id+":stuck",[]);
    if(!list.includes(s))list.push(s);store.set(id+":stuck",list);renderStuck();
    toast("Noted: \""+s+"\". It will be listed at the end for your workbook. Open the purple help box, then keep going.");
    const h=$("details.help",stages[cur]);if(h)h.open=true;
  };
  function renderStuck(){const list=store.get(id+":stuck",[]);
    $$(".stuck-list").forEach(el=>{el.innerHTML=list.length?list.map(x=>`<span class="chip">${esc(x)}</span>`).join(" "):"<span class=\"muted\">Nothing yet. If something felt hard, add it here in your own words.</span>"})}
  renderStuck();
  go(cur);
};

/* ---------- checks ---------- */
/* Multiple choice: {stem, options:[{t,ok,fb}], shuffle} */
Lesson.mcq=function(el,q){
  const opts=q.shuffle===false?q.options:shuffle(q.options);
  el.classList.add("q");
  el.innerHTML=`<div class="stem">${q.stem}</div><div class="opts"></div><div class="fb" aria-live="polite"></div>`;
  const box=$(".opts",el), fb=$(".fb",el); let done=false;
  opts.forEach((o,i)=>{const b=document.createElement("button");b.className="opt";
    b.innerHTML=`<span class="k">${"ABCDE"[i]}</span><span>${o.t}</span>`;
    b.onclick=()=>{if(done&&!q.retry)return;
      $$(".opt",box).forEach(x=>x.classList.remove("right","wrong","sel"));
      b.classList.add(o.ok?"right":"wrong");
      fb.className="fb show "+(o.ok?"good":"bad");
      fb.innerHTML=(o.ok?"<b>Yes.</b> ":"<b>Not quite.</b> ")+(o.fb||"");
      if(o.ok){done=true;el.dispatchEvent(new CustomEvent("solved"))}
      if(q.onAnswer)q.onAnswer(o,"ABCDE"[i]);
    };box.appendChild(b)});
  if(PRINT&&!q.noPrintReveal){const k=opts.findIndex(o=>o.ok);$$(".opt",box)[k].classList.add("right");fb.className="fb show good";fb.innerHTML="<b>Answer "+"ABCDE"[k]+".</b> "+(opts[k].fb||"")}
};
/* Sort: {bins:[...], items:[{t,a,why}]} */
Lesson.sort=function(el,cfg){
  el.classList.add("sort");
  const items=cfg.shuffle===false?cfg.items:shuffle(cfg.items);
  let right=0;
  items.forEach(it=>{const row=document.createElement("div");row.className="it";
    row.innerHTML=`<div>${it.t}</div><div class="bins"></div><div class="why"></div>`;
    cfg.bins.forEach(bn=>{const b=document.createElement("button");b.textContent=bn;
      b.onclick=()=>{ $$("button",row).forEach(x=>x.classList.remove("chosen"));b.classList.add("chosen");
        const ok=(Array.isArray(it.a)?it.a:[it.a]).includes(bn);
        const was=row.classList.contains("right");
        row.classList.toggle("right",ok);row.classList.toggle("wrong",!ok);
        $(".why",row).innerHTML=(ok?"✓ ":"✗ Try again. ")+(ok?(it.why||""):(it.hint||it.why||""));
        if(ok&&!was)right++; if(!ok&&was)right--;
        if(cfg.onProgress)cfg.onProgress(right,items.length);
      };$(".bins",row).appendChild(b)});
    el.appendChild(row);
    if(PRINT){const bn=(Array.isArray(it.a)?it.a:[it.a])[0];[...row.querySelectorAll(".bins button")].find(x=>x.textContent===bn).click()}});
};
/* Tap to order: {items:[correct order], done:"msg"} */
Lesson.order=function(el,cfg){
  el.classList.add("order");
  el.innerHTML=`<div class="msg">Tap the steps in the right order. Start with the first one.</div><div class="done"></div><div class="pool"></div>`;
  const pool=$(".pool",el), done=$(".done",el), msg=$(".msg",el); let k=0, misses=0;
  shuffle(cfg.items.map((t,i)=>({t,i}))).forEach(o=>{const b=document.createElement("button");b.innerHTML=o.t;
    b.onclick=()=>{ if(o.i===k){const d=document.createElement("div");d.innerHTML=`<b>${k+1}</b><span>${o.t}</span>`;done.appendChild(d);b.remove();k++;
        if(k===cfg.items.length){msg.innerHTML="✓ "+(cfg.done||"All in order.");msg.style.color="var(--good)";el.dispatchEvent(new CustomEvent("solved"))}
        else msg.textContent="Good. Now step "+(k+1)+"."}
      else{misses++;b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");
        msg.textContent=misses>2?("Hint: step "+(k+1)+" starts with \""+cfg.items[k].replace(/<[^>]+>/g,"").split(" ").slice(0,4).join(" ")+"…\""):"Not that one yet. Which comes next?";}
    };pool.appendChild(b)});
  if(PRINT){for(let j=0;j<cfg.items.length;j++){[...pool.children].find(b=>b.innerHTML===cfg.items[j]).click()}}
};
/* Gap fill with dropdowns. text uses [[answer|wrong1|wrong2]] */
Lesson.gaps=function(el,cfg){
  el.classList.add("gaps");
  let html=cfg.lines.map(line=>"<p>"+line.replace(/\[\[(.+?)\]\]/g,(m,g)=>{const parts=g.split("|");const ans=parts[0];
    const opts=shuffle(parts);return `<select data-a="${esc(ans)}" aria-label="Choose a word"><option value="">choose…</option>${opts.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`})+"</p>").join("");
  el.innerHTML=html+`<div class="row"><button class="btn primary chk">Check my gaps</button><span class="res" aria-live="polite"></span></div>`;
  $(".chk",el).onclick=()=>{let n=0,t=0;$$("select",el).forEach(s=>{t++;const ok=s.value===s.dataset.a;s.classList.toggle("right",ok);s.classList.toggle("wrong",!ok);if(ok)n++});
    $(".res",el).innerHTML=n===t?"<b style='color:var(--good)'>✓ All "+t+" correct.</b>":"<b>"+n+" of "+t+" correct.</b> Fix the red ones.";
    if(n===t)el.dispatchEvent(new CustomEvent("solved"))};
  if(PRINT){$$("select",el).forEach(s=>s.value=s.dataset.a);$(".chk",el).click()}
};
/* Examiner ticks: {points:[{t,earned,why}]} */
Lesson.ticks=function(el,cfg){
  el.innerHTML=`<div class="ticks"></div><div class="row" style="margin-top:10px"><button class="btn primary chk">Check my marking</button></div><div class="fb" aria-live="polite"></div>`;
  const box=$(".ticks",el);
  cfg.points.forEach((p,i)=>{const l=document.createElement("label");l.innerHTML=`<input type="checkbox"><span>${p.t}<span class="why small" style="display:none"><br>${p.why}</span></span>`;box.appendChild(l)});
  $(".chk",el).onclick=()=>{let agree=0;$$("label",box).forEach((l,i)=>{const p=cfg.points[i],c=$("input",l).checked;const ok=c===p.earned;
      l.classList.toggle("right",ok);l.classList.toggle("wrong",!ok);$(".why",l).style.display="inline";if(ok)agree++});
    const fb=$(".fb",el);fb.className="fb show info";fb.innerHTML=cfg.after(agree,cfg.points.length);el.dispatchEvent(new CustomEvent("solved"))};
  if(PRINT){$$("label",box).forEach((l,i)=>{$("input",l).checked=cfg.points[i].earned});$(".chk",el).click()}
};
/* Reveal model answer buttons: <button data-reveal="#id"> */
document.addEventListener("click",e=>{const b=e.target.closest("[data-reveal]");if(!b)return;const t=$(b.dataset.reveal);if(t){t.classList.add("show");b.disabled=true;b.textContent="Model answer shown below"}});

/* ---------- animation player ----------
   cfg: {title, sub, svg (string), steps:[caption], onStep(svg,i), auto (ms per step)}
   Inside the svg: data-from="n" shows from step n; data-only="n m" shows only at those steps.
   The svg root gets classes s1..sN for every step reached, and data-step="n". */
Lesson.anim=function(el,cfg){
  el.classList.add("anim");
  el.innerHTML=`<div class="anim-title"><span>${cfg.title}</span><small>${cfg.sub||"Press Play, or step through"}</small></div>
  <div class="anim-stage">${cfg.svg}</div>
  <div class="anim-cap" aria-live="polite"><span class="n">1</span><span class="c"></span></div>
  <div class="anim-ctl"><button class="prev" aria-label="Previous step">◀ Back</button><button class="play">▶ Play</button><button class="nxt" aria-label="Next step">Next ▶</button><button class="say" style="width:auto;border-radius:10px;padding:0 12px;height:42px" aria-label="Read this step aloud">🔊</button><div class="dots"></div></div>
  <ol class="anim-list"></ol>`;
  const svg=$("svg",el), cap=$(".c",el), n=$(".n",el), dots=$(".dots",el), list=$(".anim-list",el), play=$(".play",el), sayb=$(".say",el);
  const N=cfg.steps.length; let i=0, timer=null, seen=0;
  cfg.steps.forEach((s,k)=>{dots.appendChild(document.createElement("span"));const li=document.createElement("li");li.innerHTML=s;list.appendChild(li)});
  function show(k){
    i=Math.max(0,Math.min(N-1,k)); seen=Math.max(seen,i);
    svg.setAttribute("data-step",i+1);
    for(let s=1;s<=N;s++)svg.classList.toggle("s"+s,s<=i+1);
    $$("[data-from]",svg).forEach(x=>x.classList.toggle("vis",i+1>=+x.dataset.from&&(!x.dataset.to||i+1<=+x.dataset.to)));
    $$("[data-only]",svg).forEach(x=>x.classList.toggle("vis",x.dataset.only.split(" ").includes(String(i+1))));
    cap.innerHTML=cfg.steps[i]; n.textContent=(i+1)+"/"+N; sayb.dataset.say=cap.textContent;
    $$("span",dots).forEach((d,k2)=>d.className=k2===i?"on":k2<=seen?"seen":"");
    $$("li",list).forEach((li,k2)=>li.className=k2===i?"on":k2<=seen?"seen":"hidden");
    if(cfg.onStep)cfg.onStep(svg,i+1);
    if(i===N-1)el.dispatchEvent(new CustomEvent("watched"));
  }
  function stop(){clearInterval(timer);timer=null;play.textContent=i===N-1?"↺ Replay":"▶ Play"}
  play.onclick=()=>{ if(timer){stop();return}
    if(i===N-1)show(0);
    play.textContent="❚❚ Pause";
    timer=setInterval(()=>{if(i>=N-1){stop();return}show(i+1);if(i===N-1)stop()},cfg.auto||5200)};
  $(".prev",el).onclick=()=>{stop();show(i-1)}; $(".nxt",el).onclick=()=>{stop();show(i+1)};
  if(PRINT){show(N-1);$$("li",list).forEach(li=>li.className="seen")} else show(0);
  return {show,el,svg};
};

Lesson.$=$;Lesson.$$=$$;Lesson.store=store;Lesson.say=say;Lesson.toast=toast;Lesson.shuffle=shuffle;Lesson.PRINT=PRINT;
window.Lesson=Lesson;

/* offline cache */
if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register(new URL("../sw.js",document.currentScript?document.currentScript.src:location.href)).catch(()=>{})}
})();
