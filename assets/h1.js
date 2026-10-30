/* Lesson 1: storage. Content for every stage, and the three animations. */
(function(){
const L=window.Lesson, $=L.$, $$=L.$$;

/* ---------- 1 Do Now ---------- */
const dn=[
 {t:"The start-up instructions",a:"ROM",why:"Needed every time it switches on and must never be lost or changed, so ROM."},
 {t:"The song playing right now",a:"RAM",why:"In use right now, so it is in RAM."},
 {t:"The saved Wi-Fi password",a:"Secondary",why:"Must survive the power going off and can be changed, so secondary storage (flash). Not RAM, which loses it at power off."},
 {t:"Downloaded podcasts",a:"Secondary",why:"Saved to keep for later, so secondary storage."},
 {t:"The voice command you just spoke, being worked out",a:"RAM",why:"Only needed for a moment while the speaker is working, so RAM."},
 {t:"The list of paired phones",a:"Secondary",why:"Kept between uses and can change, so secondary storage."}];
L.sort($("#donow"),{bins:["RAM","ROM","Secondary"],items:dn,onProgress:(r,n)=>{$("#donowScore").textContent=r+" of "+n+" correct."+(r===n?" Primary memory is RAM and ROM: the CPU accesses it directly. Secondary storage keeps data when the power is off.":"")}});

/* ---------- 2 Key words ---------- */
const kw=[
 ["Primary memory","Memory the CPU accesses directly: RAM and ROM."],
 ["Secondary storage","Storage the CPU does not access directly. It keeps programs and data when the power is off."],
 ["Removable storage","Secondary storage you can take out and move: a USB flash drive, an SD card, an optical disc."],
 ["Volatile","Loses its contents when the power is off.","From Latin volare, to fly: the data flies away."],
 ["Platter","A disk inside a hard drive whose surface can be magnetised.","From an old word for a flat plate."],
 ["Track and sector","A track is a ring on a platter. A sector is a wedge. One track in one sector is a block."],
 ["Floating gate","The part of a flash memory cell that traps electrons and keeps them without power."],
 ["Principal operation","How a device works, step by step. Questions use this phrase."]];
$("#kw1").innerHTML=kw.map(k=>`<div class="kwi"><b><button class="say" data-say="${k[0]}. ${k[1]}" aria-label="Hear ${k[0]}">🔊</button>${k[0]}</b>${k[1]}${k[2]?`<span class="root">${k[2]}</span>`:""}</div>`).join("");

/* ---------- 3 Fast pass ---------- */
const FP=[
 {a:"Storage",s:"Which statement about primary memory is correct?",o:["It is accessed directly by the CPU","It keeps its contents when the power is off","It includes the solid state drive","It is slower than secondary storage"],c:0,
  fix:"<b>A.</b> Primary memory is accessed directly by the CPU: that means RAM and ROM. Secondary storage (hard disk, SSD) is not accessed directly by the CPU, and it keeps programs and data when the power is off."},
 {a:"Storage",s:"Why does a computer need both RAM and ROM?",o:["RAM holds the start-up instructions; ROM holds the programs in use","RAM holds the data and programs in use and can be changed; ROM holds the start-up instructions, which must not be lost at power off","Both are volatile, so two copies are kept","ROM is faster, so it holds the programs in use"],c:1,
  fix:"<b>B.</b> RAM holds the data and programs in use; it can be read and written, and it is volatile. ROM holds the start-up instructions; it can only be read, and it is non-volatile, so they are still there when the power comes back. <i>Writing \"Random Access Memory\" gets no marks if the question already says RAM.</i>"},
 {a:"Storage",s:"How does a magnetic hard disk store data?",o:["As pits and lands read by a laser","As magnetic patterns on platters divided into tracks and sectors","As electrons trapped in floating gates","As charge in capacitors that must be refreshed"],c:1,
  fix:"<b>B.</b> Magnetic patterns on platters, organised into tracks and sectors. Stage 6 adds the AS detail."},
 {a:"Storage",s:"How does solid state (flash) memory store data?",o:["On magnetised platters that spin","By trapping electrons in the floating gates of transistors (NAND or NOR technology)","By burning pits into a dye layer","On a tape that is wound past a head"],c:1,
  fix:"<b>B.</b> Electrons are trapped in floating gates, in cells built with NAND or NOR technology. Stage 7 shows it happening."},
 {a:"Storage",s:"How does an optical disc reader read data?",o:["A laser is shone at the spinning disc; light reflects differently from pits and lands","A read/write head detects changes in the magnetic field","The controller checks whether current flows through each cell","A sensor measures the electrical charge on the disc"],c:0,
  fix:"<b>A.</b> A laser is shone at the spinning disc and the light reflects differently from pits and lands. Stage 8 shows it."},
 {a:"Devices and sensors",s:"Which of these is an output device?",o:["Microphone","3D scanner","Actuator","Keyboard"],c:2,
  fix:"<b>C.</b> An actuator is an output device. Input devices bring data in (microphone, keyboard, touchscreen, scanners). Output devices send results out (speaker, screen, printers, actuators)."},
 {a:"Devices and sensors",s:"Which sensor is most suitable for detecting a person walking past a house at night?",o:["pH sensor","Humidity sensor","Infra-red sensor","Flow sensor"],c:2,
  fix:"<b>C.</b> Infra-red detects a warm body moving, even in the dark. Choose a sensor by what it measures: temperature, pressure, light, sound, moisture, humidity, proximity, gas, pH."},
 {a:"Devices and sensors",s:"What does an actuator do?",o:["Measures a physical quantity such as temperature","Converts an analogue signal into digital","Converts a signal from the processor into movement or a physical action","Stores the readings from a sensor"],c:2,
  fix:"<b>C.</b> An actuator turns a signal from the processor into movement or a physical action: a motor that opens a window, a valve, a pump, a door lock. A sensor measures; an actuator acts."},
 {a:"Embedded systems",s:"Which of these is an embedded system?",o:["A laptop","A desktop PC","The microprocessor that runs the programs in a washing machine","A server in a data centre"],c:2,
  fix:"<b>C.</b> The washing machine's microprocessor does one job inside a larger device. A laptop, a PC and a server are general purpose: they run many different programs."},
 {a:"Embedded systems",s:"Which statement describes an embedded system?",o:["A general-purpose computer that runs many applications","A computer system that performs a dedicated function within a larger device","Any computer connected to the internet","A computer that has no screen"],c:1,
  fix:"<b>B.</b> Hardware and software built into a larger device to perform one specific function: a washing machine, a car's engine control, a burglar alarm. Lesson 2 adds the drawbacks."},
 {a:"Logic",s:"Which gate outputs 1 only when both inputs are 1?",o:["OR","AND","XOR","NOR"],c:1,fix:"<b>B. AND</b> gives 1 only if both inputs are 1."},
 {a:"Logic",s:"What is the output of a NAND gate when both inputs are 1?",o:["0","1","It depends on the previous output","NAND gates have only one input"],c:0,fix:"<b>A. 0.</b> NAND means NOT AND. 1 AND 1 = 1, so NAND gives NOT 1 = 0."},
 {a:"Logic",s:"Which gate outputs 1 only when its two inputs are different?",o:["XOR","NAND","OR","AND"],c:0,fix:"<b>A. XOR</b> (exclusive OR) gives 1 only when the inputs are different."},
 {a:"Logic",s:"X = (A AND B) OR NOT C. What is X when A = 0, B = 1, C = 0?",o:["0","1","It cannot be worked out","2"],c:1,fix:"<b>B. 1.</b> Work from the inside out: A AND B = 0 AND 1 = 0. NOT C = NOT 0 = 1. Then 0 OR 1 = 1."},
 {a:"Logic",s:"X = NOT (A OR B) AND C. What is X when A = 0, B = 0, C = 1?",o:["0","1","It cannot be worked out","2"],c:1,fix:"<b>B. 1.</b> A OR B = 0. NOT 0 = 1. Then 1 AND C = 1 AND 1 = 1."},
 {a:"Logic",s:"An alarm sounds (X = 1) if the door is open (D = 1) and the system is armed (A = 1). Which expression is correct?",o:["X = D OR A","X = D AND A","X = NOT D AND A","X = D NAND A"],c:1,fix:"<b>B. X = D AND A.</b> The word \"and\" in the statement becomes the AND gate. In exams, logic expressions use the words AND, OR and NOT, as here."}];
const AREAS=["Storage","Devices and sensors","Embedded systems","Logic"];
const fpBox=$("#fastpass"), picks=L.store.get("h1:fp",{});
fpBox.innerHTML=FP.map((q,i)=>`<div class="card q" data-i="${i}"><div class="stem">${i+1}. ${q.s}</div><div class="opts">${q.o.concat(["I do not know yet"]).map((o,j)=>`<button class="opt${picks[i]===j?" sel":""}" data-j="${j}"><span class="k">${"ABCDE"[j]}</span><span>${o}</span></button>`).join("")}</div></div>`).join("");
function left(){const n=FP.length-Object.keys(picks).length;$("#fpLeft").textContent=n?n+" question"+(n>1?"s":"")+" still to answer.":"All answered."}
fpBox.addEventListener("click",e=>{const b=e.target.closest(".opt");if(!b||fpBox.dataset.locked)return;const c=b.closest(".q"),i=+c.dataset.i;
  $$(".opt",c).forEach(x=>x.classList.remove("sel"));b.classList.add("sel");picks[i]=+b.dataset.j;L.store.set("h1:fp",picks);left()});
left();
function markFP(){
  if(Object.keys(picks).length<FP.length){L.toast("Answer every question first. Choose \"I do not know yet\" if you are not sure.");left();return}
  fpBox.dataset.locked=1;const score={},wrong=[];AREAS.forEach(a=>score[a]=[0,0]);
  FP.forEach((q,i)=>{const c=$(`.q[data-i="${i}"]`,fpBox);score[q.a][1]++;
    $$(".opt",c).forEach(b=>{const j=+b.dataset.j;b.classList.remove("sel");if(j===q.c)b.classList.add("right");else if(j===picks[i])b.classList.add("wrong")});
    if(picks[i]===q.c)score[q.a][0]++;else wrong.push(i)});
  $("#fpTiles").innerHTML=AREAS.map(a=>`<div><span class="small">${a}</span><b>${score[a][0]} / ${score[a][1]}</b></div>`).join("");
  $("#fpCopy").textContent=AREAS.map(a=>a+" "+score[a][0]+"/"+score[a][1]).join(" · ")+(wrong.length?" · Wrong: Q"+wrong.map(i=>i+1).join(", Q"):" · Wrong: none");
  $("#fpResult").style.display="block";$("#fpMark").disabled=true;$("#fpMark").textContent="Marked";
  L.store.set("h1:fpDone",1);
  /* stage 4 */
  const fx=$("#fixups");
  fx.innerHTML=wrong.length?wrong.map(i=>`<div class="card fix"><h3>Question ${i+1} <span class="chip">${FP[i].a}</span></h3><p class="small muted">${FP[i].s}</p><p>${FP[i].fix}</p></div>`).join("")
    :`<div class="card fix"><h3>Full marks on the fast pass</h3><p>Nothing to fix. Read the card below, then move on to stage 5.</p></div>`;
  if(wrong.some(i=>FP[i].a==="Logic"))$("#gateCard").style.display="block";
  $("#fpResult").scrollIntoView({behavior:"smooth"});
}
$("#fpMark").onclick=markFP;
if(L.store.get("h1:fpDone",0)&&Object.keys(picks).length===FP.length)markFP();
if(L.PRINT){$("#fixups").innerHTML=FP.map((q,i)=>`<div class="card fix"><h3>Question ${i+1} <span class="chip">${q.a}</span></h3><p class="small muted">${q.s}</p><p>${q.fix}</p></div>`).join("");$("#gateCard").style.display="none";$("#fpMark").style.display="none"}

/* gate tryer */
const G={AND:[(a,b)=>a&b,"1 only if both inputs are 1"],OR:[(a,b)=>a|b,"1 if either input is 1"],NAND:[(a,b)=>1-(a&b),"0 only if both inputs are 1"],NOR:[(a,b)=>1-(a|b),"1 only if both inputs are 0"],XOR:[(a,b)=>a^b,"1 only if the inputs are different"],NOT:[(a)=>1-a,"flips the input (one input only)"]};
let gate="AND",ga=0,gb=0;
$("#gatePick").innerHTML=Object.keys(G).map(g=>`<button class="btn${g===gate?" primary":""}" data-g="${g}">${g}</button>`).join("");
function gUpd(){const x=G[gate][0](ga,gb);$("#gA").textContent="A = "+ga;$("#gA").className="bit"+(ga?" one":"");$("#gB").textContent="B = "+gb;$("#gB").className="bit"+(gb?" one":"");$("#gB").style.visibility=gate==="NOT"?"hidden":"visible";
  $("#gX").textContent=x;$("#gX").className="out"+(x?" one":"");$("#gRule").textContent=gate+": "+G[gate][1];
  $$("#gatePick button").forEach(b=>b.className="btn"+(b.dataset.g===gate?" primary":""))}
$("#gatePick").onclick=e=>{const b=e.target.closest("button");if(b){gate=b.dataset.g;gUpd()}};
$("#gA").onclick=()=>{ga^=1;gUpd()};$("#gB").onclick=()=>{gb^=1;gUpd()};gUpd();

/* ---------- 5 Be the marker ---------- */
L.ticks($("#marker"),{points:[
 {t:"The hard disk has one or more platters.",earned:false,why:"No. The answer never mentions platters (or disks inside the drive)."},
 {t:"Each surface of the platter can be magnetised.",earned:false,why:"No. \"Using magnetism\" is too vague: it does not say the surface is magnetised."},
 {t:"The platters are mounted on a spindle.",earned:false,why:"No spindle in the answer."},
 {t:"The whole mechanism is inside a sealed box.",earned:false,why:"Not mentioned."},
 {t:"The platters are rotated at high speed.",earned:true,why:"Yes. \"It spins round\" gets this one."},
 {t:"Each surface has a read/write head mounted on an arm, just above the surface.",earned:false,why:"No. It says read/write head but not the arm, so it does not get the point."},
 {t:"Electronic circuits control the movement of the arm.",earned:false,why:"Not mentioned."},
 {t:"The surface is divided into concentric tracks.",earned:false,why:"No. It says tracks but not <b>concentric</b> (rings inside each other), and that word is needed for the mark."},
 {t:"The surface is divided into sectors.",earned:true,why:"Yes. \"Sectors\" is there."},
 {t:"One track in one sector is a block.",earned:false,why:"Not mentioned."},
 {t:"The data is stored as a magnetic pattern.",earned:false,why:"No. It does not say how the bits are stored."},
 {t:"Writing: a change in current in the head changes the magnetic field on the disk.",earned:false,why:"Not mentioned."},
 {t:"Reading: a change in magnetic field produces a change in current in the head.",earned:false,why:"No. \"Reads the data\" does not say how."}],
 after:(agree,n)=>`<b>This answer scores 2 out of 5.</b> It gets: rotated, sectors. "Tracks" on its own is not enough: it needs <b>concentric</b> tracks. It is missing <b>the parts and their jobs</b>: platters that can be magnetised, the spindle, the head on an arm, the magnetic pattern, the change in current. You agreed with the marking on ${agree} of ${n} points. Now watch how a 5-mark answer is built in stage 6.`});

/* ---------- helpers for SVG ---------- */
const P=(cx,cy,r,a)=>[cx+r*Math.cos(a*Math.PI/180),cy+r*Math.sin(a*Math.PI/180)];
function sector(cx,cy,r1,r2,a1,a2){const [x1,y1]=P(cx,cy,r2,a1),[x2,y2]=P(cx,cy,r2,a2),[x3,y3]=P(cx,cy,r1,a2),[x4,y4]=P(cx,cy,r1,a1);
  return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`}
const lab=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.fs||15}" font-weight="${o.fw||700}" fill="${o.c||"#16232e"}" ${o.anchor?`text-anchor="${o.anchor}"`:""}>${t}</text>`;

/* ---------- 6 Hard disk animation ---------- */
(function(){
 const cx=230,cy=210,R=170;
 let tracks="",tracksHi="",sectors="";
 for(let r=50;r<=160;r+=20){tracks+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#a9b6c1" stroke-width="1"/>`;tracksHi+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#087e8b" stroke-width="2"/>`}
 for(let a=0;a<360;a+=45){const [x1,y1]=P(cx,cy,30,a),[x2,y2]=P(cx,cy,170,a);sectors+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#087e8b" stroke-width="2"/>`}
 /* close-up strip */
 const d=[1,1,0,1,0,0,1,0,1,1,0,1]; let cells="",wave="",bits=""; const W=30,x0=528,yS=304;
 for(let copy=0;copy<2;copy++)d.forEach((v,i)=>{const x=x0+(copy*d.length+i)*W, prev=i?d[i-1]:d[d.length-1], tr=prev!==v;
   cells+=`<rect x="${x}" y="${yS}" width="${W}" height="30" fill="${v?"#d1495b":"#3d5a80"}" stroke="#fff" stroke-width="1"/><text x="${x+W/2}" y="${yS+21}" text-anchor="middle" font-size="16" fill="#fff" font-weight="700">${v?"→":"←"}</text>`;
   if(tr)wave+=`L${x} 378 L${x+3} ${v?356:400} L${x+6} 378 `;
   bits+=`<text x="${x+W/2}" y="424" text-anchor="middle" font-size="15" font-weight="800" fill="${tr?"#b86400":"#566573"}">${tr?1:0}</text>`});
 const svg=`<svg viewBox="0 0 760 440" role="img" aria-label="Animated hard disk: a spinning platter, the spindle, an arm with a read/write head, tracks and sectors, and a close-up of the magnetic pattern being written and read.">
 <defs><radialGradient id="hPl"><stop offset="0" stop-color="#f1f4f6"/><stop offset=".75" stop-color="#cdd6dd"/><stop offset="1" stop-color="#a7b4bf"/></radialGradient>
 <clipPath id="hClip"><rect x="528" y="270" width="210" height="166"/></clipPath>
 <style>#hSpin{transform-box:view-box;transform-origin:${cx}px ${cy}px}.s2 #hSpin{animation:spin 2.2s linear infinite}
 #hArm{transform-box:view-box;transform-origin:470px 70px;transform:rotate(-25deg);transition:transform 1.8s ease-in-out}.s4 #hArm{transform:rotate(0deg)}
 #hStrip{animation:hS 7s linear infinite;animation-play-state:paused}.s6 #hStrip{animation-play-state:running}@keyframes hS{to{transform:translateX(-360px)}}</style></defs>
 <g data-from="1">
  <g id="hSpin"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#hPl)" stroke="#7f909d" stroke-width="2"/>${tracks}
   <g data-from="5">${tracksHi}${sectors}<path d="${sector(cx,cy,110,130,2,43)}" fill="#b86400" opacity=".85"/></g>
   <path d="${sector(cx,cy,150,160,100,140)}" fill="#8193a0" opacity=".35"/></g>
  <circle cx="${cx}" cy="${cy}" r="24" fill="#56646f"/><circle cx="${cx}" cy="${cy}" r="8" fill="#cdd6dd"/>
  <line x1="130" y1="112" x2="70" y2="40" stroke="#16232e" stroke-width="1.5"/>${lab(14,30,"Platter: surface can be magnetised")}
  <g transform="translate(0,6)"><rect x="80" y="384" width="10" height="46" fill="#56646f"/>${[396,410,424].map(y=>`<ellipse cx="85" cy="${y}" rx="55" ry="6" fill="#cdd6dd" stroke="#7f909d"/>`).join("")}${lab(150,414,"one or more platters",{fs:14,fw:600,c:"#566573"})}</g>
 </g>
 <g data-from="2"><line x1="212" y1="226" x2="80" y2="360" stroke="#16232e" stroke-width="1.5"/>${lab(14,374,"Spindle: rotates at high speed")}</g>
 <g data-from="3"><g id="hArm"><line x1="470" y1="70" x2="330" y2="290" stroke="#6e7f8c" stroke-width="13" stroke-linecap="round"/><line x1="470" y1="70" x2="330" y2="290" stroke="#9aa9b4" stroke-width="5" stroke-linecap="round"/><circle cx="330" cy="290" r="11" fill="#b86400" stroke="#7a4200" stroke-width="2"/></g>
  <circle cx="470" cy="70" r="20" fill="#56646f"/><circle cx="470" cy="70" r="7" fill="#cdd6dd"/>
  ${lab(500,112,"Read/write head",{c:"#b86400"})}${lab(500,130,"on an arm, just above",{fs:14,fw:600})}${lab(500,147,"the surface (never touching)",{fs:14,fw:600})}</g>
 <g data-from="4">${lab(500,48,"Arm moved by")}${lab(500,66,"electronic circuits")}</g>
 <g data-from="5">${lab(500,186,"Concentric tracks (rings)",{c:"#087e8b",fs:14})}${lab(500,204,"Sectors (wedges)",{c:"#087e8b",fs:14})}${lab(500,222,"1 track in 1 sector = a block",{c:"#b86400",fs:14})}</g>
 <g data-from="6"><rect x="520" y="244" width="226" height="194" rx="10" fill="#fff" stroke="#0b3954" stroke-width="2"/>${lab(530,264,"Close-up under the head",{fs:14,c:"#0b3954"})}
  <g clip-path="url(#hClip)"><g id="hStrip">${cells}<g data-from="7"><path d="M${x0} 378 ${wave}L${x0+720} 378" fill="none" stroke="#1f8a4c" stroke-width="2.5"/>${bits}</g></g></g>
  <rect x="612" y="276" width="30" height="24" rx="4" fill="#b86400" stroke="#7a4200" stroke-width="2"/><path d="M617 283h20M617 289h20M617 295h20" stroke="#fff" stroke-width="1.5"/>
  <line x1="627" y1="300" x2="627" y2="336" stroke="#b86400" stroke-width="2" stroke-dasharray="3 3"/>
  <g data-only="6">${lab(648,292,"writing",{fs:14,c:"#d1495b"})}</g><g data-only="7">${lab(648,292,"reading",{fs:14,c:"#1f8a4c"})}${lab(530,350,"current",{fs:12,fw:600,c:"#1f8a4c"})}</g>
 </g>
 </svg>`;
 L.anim($("#animHDD"),{title:"Animation: how a hard disk works",svg,steps:[
  "A hard disk has one or more <b>platters</b>. Each surface can be <b>magnetised</b>. The whole mechanism is inside a <b>sealed box</b>.",
  "The platters are mounted on a <b>spindle</b> and <b>rotated at high speed</b> (often 5400 or 7200 times a minute).",
  "Each surface has a <b>read/write head</b> on an <b>arm</b>. The head sits just above the surface and never touches it.",
  "<b>Electronic circuits</b> control the arm, so the head moves across the surface to the right place.",
  "The surface is divided into <b>concentric tracks</b> and <b>sectors</b>. One track in one sector is a <b>block</b>.",
  "Writing: a change in the <b>current</b> in the head changes the <b>magnetic field</b> on the disk. The data is stored as a <b>magnetic pattern</b>.",
  "Reading: a change in the magnetic field under the head produces a <b>change in current</b> in the head. These changes are read as 1s and 0s."]});
})();
L.order($("#orderHDD"),{items:["Platters with a surface that can be magnetised","Mounted on a spindle and rotated at high speed","A read/write head on an arm, moved by electronic circuits","The surface divided into concentric tracks and sectors (one track in one sector is a block)","Data stored as a magnetic pattern; reading turns a change in field into a change in current"],done:"That order is a full 5-mark answer. Learn it in this order."});

/* ---------- 7 SSD animation ---------- */
(function(){
 const ex=[415,450,485,520,555,590];
 let grid="";for(let b=0;b<2;b++)for(let r=0;r<4;r++)for(let c=0;c<5;c++){const x=28+b*118+c*20,y=262+r*24;grid+=`<rect class="${b?"blk2":""}" x="${x}" y="${y}" width="16" height="18" rx="2" fill="${(r*5+c+b)%3?"#0b3954":"#9fc5cf"}"/>`}
 const svg=`<svg viewBox="0 0 760 440" role="img" aria-label="Animated flash memory cell: electrons are pulled onto the floating gate, trapped there with the power off, and read by checking whether current flows. Cells are grouped into pages and blocks.">
 <defs><style>#eGrp{transition:transform 1.8s ease-in-out}.s3 #eGrp{transform:translateY(-54px)}
 .s6 .blk2{animation:erase 2.4s ease-in-out infinite}@keyframes erase{0%,30%{fill:#0b3954}55%,100%{fill:#e3e8ec}}
 #flow{stroke-dasharray:12 10;animation:flow .9s linear infinite}@keyframes flow{to{stroke-dashoffset:-22}}
 #trapGlow{animation:pulse 1.6s ease-in-out infinite}</style>
 <marker id="arR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#c0392b"/></marker>
 <marker id="arG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1f8a4c"/></marker></defs>
 <g data-from="1">
  <rect x="20" y="44" width="220" height="134" rx="12" fill="#2e6b4f" stroke="#1d4a36" stroke-width="2"/>
  ${[0,1,2].map(i=>`<rect x="${36+i*62}" y="64" width="50" height="50" rx="4" fill="#1b1f24"/><text x="${61+i*62}" y="94" text-anchor="middle" font-size="11" fill="#9fb0bd">flash</text>`).join("")}
  <rect x="36" y="124" width="70" height="40" rx="4" fill="#1b1f24"/><text x="71" y="148" text-anchor="middle" font-size="11" fill="#9fb0bd">controller</text>
  <rect x="226" y="88" width="14" height="46" fill="#d4af37"/>
  ${lab(20,30,"SSD: no moving parts")}${lab(20,198,"chips use NAND or NOR",{fs:13,fw:600,c:"#566573"})}
 </g>
 <g data-from="2">
  <path d="M210 64 L270 140 M210 114 L270 200" stroke="#566573" stroke-width="1.5" stroke-dasharray="5 4" fill="none"/>
  <rect x="270" y="140" width="476" height="290" rx="12" fill="#fff" stroke="#0b3954" stroke-width="2"/>
  ${lab(282,162,"One flash memory cell (side view)",{fs:14,c:"#0b3954"})}
  <rect x="290" y="330" width="440" height="88" fill="#dfe5e9"/>${lab(300,410,"silicon",{fs:13,fw:600,c:"#566573"})}
  <rect x="300" y="330" width="86" height="30" fill="#9fc5cf"/><text x="343" y="351" text-anchor="middle" font-size="13" font-weight="700">source</text>
  <rect x="614" y="330" width="86" height="30" fill="#9fc5cf"/><text x="657" y="351" text-anchor="middle" font-size="13" font-weight="700">drain</text>
  <rect x="390" y="312" width="220" height="18" fill="#f6e7b9" stroke="#d6c38a"/>
  <rect x="390" y="250" width="220" height="62" fill="#f2b179" stroke="#b86400" stroke-width="3"/>
  <rect x="390" y="232" width="220" height="18" fill="#f6e7b9" stroke="#d6c38a"/>
  <rect x="390" y="174" width="220" height="58" fill="#3d5a80"/>
  <text x="500" y="208" text-anchor="middle" font-size="15" font-weight="700" fill="#fff">control gate</text>
  <text x="500" y="267" text-anchor="middle" font-size="13" font-weight="700" fill="#7a4200">floating gate</text>
  ${lab(618,246,"insulation",{fs:12,fw:600,c:"#8a6d1f"})}${lab(618,326,"insulation",{fs:12,fw:600,c:"#8a6d1f"})}
  ${lab(282,190,"1 or 2",{fs:13,fw:600,c:"#566573"})}${lab(282,206,"transistors",{fs:13,fw:600,c:"#566573"})}${lab(282,222,"per cell",{fs:13,fw:600,c:"#566573"})}
  <g id="eGrp">${ex.map(x=>`<circle cx="${x}" cy="342" r="9" fill="#0b3954"/><text x="${x}" y="347" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">−</text>`).join("")}</g>
  <g data-only="2">${lab(410,384,"electrons in the silicon",{fs:13,fw:600,c:"#0b3954"})}</g>
 </g>
 <g data-only="3"><rect x="614" y="180" width="128" height="24" rx="6" fill="#fff3e0" stroke="#b86400"/><text x="678" y="197" text-anchor="middle" font-size="13" font-weight="800" fill="#7a4200">+ voltage applied</text>
  <path d="M500 314 V 300" stroke="#b86400" stroke-width="3"/></g>
 <g data-from="4"><rect id="trapGlow" x="386" y="246" width="228" height="70" rx="4" fill="none" stroke="#b86400" stroke-width="3" stroke-dasharray="7 5"/></g>
 <g data-only="4"><rect x="282" y="236" width="98" height="46" rx="8" fill="#fdecea" stroke="#c0392b"/><text x="331" y="256" text-anchor="middle" font-size="13" font-weight="800" fill="#c0392b">POWER OFF</text><text x="331" y="273" text-anchor="middle" font-size="12" fill="#c0392b">still trapped</text></g>
 <g data-only="5"><line x1="350" y1="372" x2="650" y2="372" stroke="#c0392b" stroke-width="4" marker-end="url(#arR)"/>
  <path d="M488 360 l24 24 M512 360 l-24 24" stroke="#c0392b" stroke-width="5"/>${lab(530,398,"no current flows → read as 0",{fs:13,c:"#c0392b"})}
  <rect x="20" y="214" width="236" height="110" rx="10" fill="#fff" stroke="#1f8a4c" stroke-width="2"/>${lab(30,236,"A cell with no trapped electrons",{fs:13,c:"#1f8a4c"})}
  <rect x="70" y="250" width="130" height="18" fill="#3d5a80"/><rect x="70" y="268" width="130" height="18" fill="#f2b179"/><rect x="30" y="292" width="210" height="16" fill="#dfe5e9"/>
  <line id="flow" x1="36" y1="300" x2="232" y2="300" stroke="#1f8a4c" stroke-width="5" marker-end="url(#arG)"/>${lab(30,320,"current flows → read as 1",{fs:12,c:"#1f8a4c"})}</g>
 <g data-from="6"><rect x="20" y="236" width="236" height="194" rx="10" fill="#fff" stroke="#0b3954" stroke-width="2"/>${lab(30,254,"Cells → pages → blocks",{fs:13,c:"#0b3954"})}${grid}
  ${lab(30,380,"each row = a page",{fs:12,fw:600,c:"#566573"})}${lab(30,398,"each group = a block",{fs:12,fw:600,c:"#566573"})}${lab(30,418,"a whole block is erased at once",{fs:12,c:"#b86400"})}</g>
 </svg>`;
 L.anim($("#animSSD"),{title:"Animation: how flash memory stores a bit",svg,steps:[
  "An SSD has <b>no moving parts</b>. Data is stored in <b>flash memory</b> chips built with <b>NAND or NOR</b> technology.",
  "Each cell is made of <b>1 or 2 transistors</b>. A cell has a <b>control gate</b> and a <b>floating gate</b>, separated by thin layers of insulation.",
  "Writing: a voltage on the control gate pulls <b>electrons</b> through the insulation onto the <b>floating gate</b>.",
  "The floating gate is surrounded by insulation, so the electrons are <b>trapped</b>. They stay there even when the <b>power is off</b>: flash memory is non-volatile.",
  "Reading: the <b>control gate</b> allows or stops current passing through, depending on the trapped charge. The controller checks <b>whether current flows</b>: flowing is read as 1, not flowing as 0.",
  "Cells are grouped into <b>pages</b>, and pages into <b>blocks</b>. Data is erased a whole block at a time."]});
})();
L.gaps($("#gapsSSD"),{lines:[
 "An SSD has no [[moving|electrical|metal]] parts.",
 "Data is stored in flash memory built with [[NAND|AND|XOR]] or NOR technology.",
 "Each cell has 1 or 2 [[transistors|capacitors|platters]].",
 "The [[floating|control|silicon]] gate traps electrons, so the data is kept without [[power|light|electrons]].",
 "The [[control|floating|silicon]] gate allows or stops current passing through.",
 "To read, the controller checks whether [[current|light|magnetism]] flows through the cell."]});

/* ---------- 8 Optical animation ---------- */
(function(){
 const cx=200,cy=228;
 let sp="";const turns=7,r0=34,r1=156;for(let k=0;k<=turns*72;k++){const t=k/72,a=t*2*Math.PI,r=r0+(r1-r0)*t/turns;sp+=(k?"L":"M")+(cx+r*Math.cos(a)).toFixed(1)+" "+(cy+r*Math.sin(a)).toFixed(1)}
 const seg=[["L",40],["P",30],["L",20],["P",50],["L",30],["P",20],["L",60],["P",50]];
 let prof="",pits="",bits="",x=432;
 for(let c=0;c<2;c++)seg.forEach(([k,w])=>{ if(k==="L"&&w>=30)pits+=`<text x="${x+w/2}" y="144" text-anchor="middle" font-size="11" font-weight="700" fill="#566573">land</text>`; if(k==="P")pits+=`<text x="${x+w/2}" y="186" text-anchor="middle" font-size="11" font-weight="700" fill="#b86400">pit</text>`+`<rect x="${x}" y="150" width="${w}" height="20" fill="#cfd8df"/><line x1="${x}" y1="170" x2="${x+w}" y2="170" stroke="#8a99a6" stroke-width="3"/><line x1="${x}" y1="150" x2="${x}" y2="170" stroke="#8a99a6" stroke-width="3"/><line x1="${x+w}" y1="150" x2="${x+w}" y2="170" stroke="#8a99a6" stroke-width="3"/>`;
   bits+=`<text x="${x}" y="214" text-anchor="middle" font-size="14" font-weight="800" fill="#b86400">1</text>`;
   for(let z=x+15;z<x+w-6;z+=20)bits+=`<text x="${z}" y="214" text-anchor="middle" font-size="13" font-weight="700" fill="#566573">0</text>`;
   x+=w});
 const svg=`<svg viewBox="0 0 760 440" role="img" aria-label="Animated optical disc: the disc spins, a laser on an optical head follows a spiral track from the centre outwards, burns pits when writing, and a sensor reads the different reflections from pits and lands as 1s and 0s.">
 <defs><radialGradient id="oD"><stop offset=".12" stop-color="#f5f7f9"/><stop offset=".6" stop-color="#d8e2ea"/><stop offset=".8" stop-color="#e9dff2"/><stop offset="1" stop-color="#cfe0e6"/></radialGradient>
 <clipPath id="oClip"><rect x="428" y="96" width="310" height="140"/></clipPath>
 <style>#oSpin{transform-box:view-box;transform-origin:${cx}px ${cy}px}.s1 #oSpin{animation:spin 1.6s linear infinite}
 #oHead{transition:transform 2s ease-in-out;transform:translateX(150px)}.s2 #oHead{transform:translateX(0)}.s3 #oHead{transform:translateX(95px);transition:transform 5s linear}
 #oHi{stroke-dasharray:1000;stroke-dashoffset:1000}.s3 #oHi{animation:dash 5s linear forwards}
 #oStrip{animation:oS 6s linear infinite}@keyframes oS{to{transform:translateX(-300px)}}
 #oRef{animation:pulse .7s ease-in-out infinite}#oSpot{animation:pulse .5s ease-in-out infinite}</style></defs>
 <g data-from="1"><g id="oSpin"><circle cx="${cx}" cy="${cy}" r="166" fill="url(#oD)" stroke="#8a99a6" stroke-width="2"/>
  <path d="${sp}" fill="none" stroke="#b9c6d0" stroke-width="1.2"/>
  <path d="M${cx} ${cy-156}L${cx} ${cy-40}M${cx+108} ${cy+108}L${cx+28} ${cy+28}" stroke="#ffffff" stroke-width="6" opacity=".7"/></g>
  <circle cx="${cx}" cy="${cy}" r="22" fill="#f5f7f9" stroke="#8a99a6"/>${lab(14,24,"Disc spun at high speed")}</g>
 <g data-from="3"><path id="oHi" d="${sp}" pathLength="1000" fill="none" stroke="#b86400" stroke-width="2.5"/>${lab(14,44,"One spiral track, centre outwards",{c:"#b86400"})}</g>
 <g data-from="2"><line x1="${cx+30}" y1="${cy}" x2="395" y2="${cy}" stroke="#566573" stroke-width="3" stroke-dasharray="6 4"/>
  <g id="oHead"><rect x="${cx+44}" y="${cy-14}" width="34" height="28" rx="5" fill="#3d5a80" stroke="#0b3954" stroke-width="2"/><circle id="oSpot" cx="${cx+61}" cy="${cy}" r="6" fill="#e74c3c"/></g>
  ${lab(14,420,"Optical head moves the laser into position",{fs:14})}</g>
 <g data-from="4"><rect x="420" y="40" width="326" height="390" rx="12" fill="#fff" stroke="#0b3954" stroke-width="2"/>${lab(432,62,"Close-up: side view of the track",{fs:14,c:"#0b3954"})}
  <g clip-path="url(#oClip)"><g id="oStrip"><rect x="428" y="110" width="700" height="40" fill="#e8f1f6"/><line x1="428" y1="150" x2="1128" y2="150" stroke="#8a99a6" stroke-width="3"/>${pits}<g data-from="6">${bits}</g></g></g>
  ${lab(432,108,"disc surface",{fs:12,fw:600,c:"#566573"})}
  <rect x="560" y="370" width="44" height="28" rx="5" fill="#3d5a80"/>${lab(546,416,"laser",{fs:13})}
  <g data-only="4"><line x1="582" y1="370" x2="582" y2="162" stroke="#e74c3c" stroke-width="9" opacity=".85"/>${lab(432,262,"Writing: high-power laser",{fs:13,c:"#c0392b"})}${lab(432,279,"burns pits into the surface",{fs:13,c:"#c0392b"})}</g>
  <g data-from="5"><line x1="582" y1="370" x2="582" y2="160" stroke="#e74c3c" stroke-width="3"/><line id="oRef" x1="582" y1="160" x2="672" y2="370" stroke="#e74c3c" stroke-width="3"/>
   <rect x="652" y="370" width="44" height="28" rx="5" fill="#1f8a4c"/>${lab(642,416,"sensor",{fs:13})}
   ${lab(432,262,"pit and land reflect",{fs:13,c:"#0b3954"})}${lab(432,279,"the light differently",{fs:13,c:"#0b3954"})}</g>
  <g data-from="6">${lab(432,312,"sensor detects the changes",{fs:13,c:"#1f8a4c"})}${lab(432,329,"→ read as 1s and 0s",{fs:13,c:"#1f8a4c"})}</g>
 </g>
 </svg>`;
 L.anim($("#animOPT"),{title:"Animation: how an optical disc is read and written",svg,steps:[
  "The disc is <b>spun at high speed</b>.",
  "A <b>laser</b> is shone onto the disc. An <b>optical head</b> moves it into position.",
  "The laser follows a single <b>spiral track</b> from the centre outwards.",
  "Writing: the laser <b>burns pits</b> into the surface to represent the data. The flat parts between the pits are <b>lands</b>.",
  "Reading: the laser <b>reflects</b> from the pits and lands. The <b>reflection from a pit is different</b> from the reflection from a land.",
  "A <b>sensor</b> detects the reflected light. The <b>differences</b> are interpreted as <b>1s and 0s</b>."]});
})();
L.order($("#orderOPT"),{items:["The disc is spun at high speed","A laser is shone onto the disc, moved into position by the optical head","It follows a spiral track from the centre outwards","Writing: the laser burns pits to represent the data","Reading: the reflection from a pit is different from a land","A sensor detects the reflected light; the differences are read as 1s and 0s"],done:"That is a full optical disc answer."});

/* ---------- 11 Hinge ---------- */
L.mcq($("#hinge1"),{noPrintReveal:true,stem:"A video streaming company stores millions of films. Why does it store most of them on magnetic hard disks?",shuffle:false,retry:true,options:[
 {t:"Hard disks have faster access times than SSDs",ok:false,fb:"This is the wrong way round. SSDs have faster access, because they have no moving parts."},
 {t:"Hard disks cost less per gigabyte, so very large capacity is affordable",ok:true,fb:"Hard disks cost less per unit of storage, and millions of films need a very large capacity."},
 {t:"Hard disks have no moving parts, so they are more reliable",ok:false,fb:"Also reversed. SSDs have no moving parts. Hard disks have spinning platters and a moving arm."},
 {t:"Hard disks are volatile, so old films are deleted automatically",ok:false,fb:"Hard disks are non-volatile: a film stays there when the power is off. Look back at the key word \"volatile\" in stage 2."}]});
L.init("h1");
})();
