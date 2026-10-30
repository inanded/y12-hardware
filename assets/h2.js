/* Lesson 2: memory chips and embedded systems. */
(function(){
const L=window.Lesson, $=L.$, $$=L.$$;
const lab=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.fs||15}" font-weight="${o.fw||700}" fill="${o.c||"#16232e"}" ${o.anchor?`text-anchor="${o.anchor}"`:""}>${t}</text>`;

/* ---------- 1 Do Now ---------- */
L.mcq($("#dn1"),{noPrintReveal:true,stem:"1. Which of these is a difference between RAM and ROM?",options:[
 {t:"RAM can be read from and written to; ROM can only be read",ok:true,fb:"Also: RAM is volatile, ROM is non-volatile."},
 {t:"RAM is non-volatile; ROM is volatile",ok:false,fb:"The wrong way round. RAM loses its contents at power off; ROM keeps them."},
 {t:"ROM holds the programs and data in use right now",ok:false,fb:"That is RAM. ROM holds the start-up instructions."},
 {t:"RAM stands for Random Access Memory; ROM stands for Read Only Memory",ok:false,fb:"True, but it gets no marks: when a question already says RAM and ROM, writing out the names is not a difference."}]});
L.mcq($("#dn2"),{noPrintReveal:true,stem:"2. (Lesson 1) Why does a CCTV system store its recordings on a magnetic hard disk rather than an SSD?",options:[
 {t:"Magnetic storage costs less per unit of storage, and video needs a very large capacity",ok:true,fb:"Another good reason: it is writing all the time, and magnetic storage lasts longer under a very large number of read/write operations."},
 {t:"A hard disk has no moving parts",ok:false,fb:"Reversed. The SSD has no moving parts."},
 {t:"A hard disk has faster access times",ok:false,fb:"Reversed. SSDs are faster."},
 {t:"A hard disk is volatile",ok:false,fb:"Hard disks are non-volatile. That is why recordings survive a power cut."}]});
L.mcq($("#dn3"),{noPrintReveal:true,stem:"3. (Unit 1) How many bytes are in 1 MiB?",options:[
 {t:"1 048 576, which is 2 to the power 20",ok:true,fb:"1 MiB = 1024 × 1024 bytes."},
 {t:"1 000 000",ok:false,fb:"That is 1 MB (megabyte). MiB counts in 1024s."},
 {t:"1024",ok:false,fb:"That is 1 KiB."},
 {t:"1 000 000 000",ok:false,fb:"That is 1 GB."}]});
L.mcq($("#dn4"),{noPrintReveal:true,stem:"4. (Lesson 1 fast pass) What is an embedded system?",options:[
 {t:"Hardware and software built into a larger device to perform one specific function",ok:true,fb:"For example a washing machine, a car's engine control, a burglar alarm. Today adds the drawbacks."},
 {t:"Any computer without a screen",ok:false,fb:"Having no screen does not make it embedded. It is about doing one job inside a larger device."},
 {t:"A general-purpose computer that runs many applications",ok:false,fb:"That is the opposite: a laptop or a PC."},
 {t:"Any computer connected to the internet",ok:false,fb:"Some embedded systems are connected, many are not. That is not what makes them embedded."}]});

/* ---------- 2 Key words ---------- */
const kw=[
 ["Static RAM (SRAM)","Each bit is held in a flip-flop. It keeps the bit with no refresh while it has power.","Greek statikos: standing still."],
 ["Dynamic RAM (DRAM)","Each bit is stored as charge in a capacitor that leaks, so it must be refreshed.","Greek dynamikos: powerful. In English, dynamic means always changing: the charge keeps leaking and must be topped up."],
 ["Refresh","Reading each row and writing it back at full charge, many times a second."],
 ["Flip-flop","A loop of gates that holds one bit."],
 ["Bit density","How many bits fit on one chip. Higher density means more data per chip and a lower cost per bit."],
 ["Firmware","The program stored in a device's ROM: the BIOS of a laptop, the software in a printer."],
 ["In situ","In place: erased and rewritten without removing the chip.","Latin: in its place."],
 ["PROM, EPROM, EEPROM","Programmable ROM; Erasable PROM (UV light); Electrically Erasable PROM."]];
$("#kw2").innerHTML=kw.map(k=>`<div class="kwi"><b><button class="say" data-say="${k[0]}. ${k[1]}" aria-label="Hear ${k[0]}">🔊</button>${k[0]}</b>${k[1]}${k[2]?`<span class="root">${k[2]}</span>`:""}</div>`).join("");

/* ---------- 3 Calculator ---------- */
function calc(){const mb=+$("#cMB").value,gb=+$("#cGB").value;$("#cOut").textContent=mb>0&&gb>0?Math.round(gb*1024/mb).toLocaleString("en-GB")+" times bigger":"…"}
$("#cMB").oninput=calc;$("#cGB").oninput=calc;calc();

/* ---------- 4 DRAM animation ---------- */
L.anim($("#animDRAM"),{title:"Animation: one DRAM cell",svg:`<svg viewBox="0 0 760 400" role="img" aria-label="Animated DRAM cell: a transistor switch connects a capacitor, drawn as a bucket of charge, to the bit line. The charge leaks, refresh tops it up, and with the power off it drains completely.">
 <defs><clipPath id="bk"><path d="M392 120 L540 120 L528 330 L404 330 Z"/></clipPath>
 <marker id="aO" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b86400"/></marker>
 <style>#lev{transform-box:view-box;transform-origin:182px 200px;transform:rotate(-22deg);transition:transform .6s}
 svg[data-step="1"] #lev,svg[data-step="2"] #lev,svg[data-step="4"] #lev{transform:rotate(0)}
 #wtr{transform-box:view-box;transform-origin:466px 330px;transform:scaleY(.95);transition:transform 3.5s ease-in}
 .s3 #wtr{transform:scaleY(.6)} .s4 #wtr{animation:saw 2.6s ease-in-out infinite} .s5 #wtr{animation:none;transform:scaleY(0);transition:transform 2.5s ease-in}
 @keyframes saw{0%{transform:scaleY(.95)}78%{transform:scaleY(.6)}86%,100%{transform:scaleY(.95)}}
 .drip{animation:drip 1.4s ease-in infinite}@keyframes drip{from{transform:translateY(0);opacity:1}to{transform:translateY(40px);opacity:0}}</style></defs>
 <line x1="40" y1="56" x2="560" y2="56" stroke="#566573" stroke-width="5"/>${lab(40,40,"Word line (selects this row)",{fs:15})}
 <line x1="80" y1="56" x2="80" y2="384" stroke="#566573" stroke-width="5"/>${lab(96,384,"Bit line (data in and out)",{fs:15})}
 <line x1="80" y1="200" x2="170" y2="200" stroke="#16232e" stroke-width="4"/>
 <rect x="160" y="150" width="140" height="100" rx="12" fill="#fff" stroke="#0b3954" stroke-width="3"/><circle cx="182" cy="200" r="7" fill="#0b3954"/><circle cx="278" cy="200" r="7" fill="#0b3954"/>
 <line id="lev" x1="182" y1="200" x2="278" y2="200" stroke="#0b3954" stroke-width="6" stroke-linecap="round"/>
 <line x1="230" y1="56" x2="230" y2="150" stroke="#566573" stroke-width="4"/>
 ${lab(230,276,"Transistor",{anchor:"middle",c:"#0b3954"})}${lab(230,296,"(a switch)",{anchor:"middle",fs:14,fw:600,c:"#566573"})}
 <line x1="285" y1="200" x2="404" y2="200" stroke="#16232e" stroke-width="4"/>
 <path d="M392 120 L540 120 L528 330 L404 330 Z" fill="#fff"/>
 <rect id="wtr" x="380" y="120" width="170" height="210" fill="#3d7ec9" clip-path="url(#bk)"/>
 <line x1="388" y1="225" x2="548" y2="225" stroke="#c0392b" stroke-width="3" stroke-dasharray="9 6"/>${lab(556,222,"half full",{fs:14,c:"#c0392b"})}${lab(556,240,"below this it reads 0",{fs:13,fw:600,c:"#c0392b"})}
 <path d="M392 120 L540 120 L528 330 L404 330 Z" fill="none" stroke="#0b3954" stroke-width="4"/>
 ${lab(466,92,"Capacitor",{anchor:"middle",c:"#0b3954"})}${lab(466,110,"(a tiny bucket of charge)",{anchor:"middle",fs:14,fw:600,c:"#566573"})}
 <g data-from="3" data-to="4"><circle class="drip" cx="520" cy="336" r="5" fill="#3d7ec9"/><circle class="drip" cx="512" cy="336" r="4" fill="#3d7ec9" style="animation-delay:.7s"/>${lab(540,360,"charge leaks out",{fs:14,c:"#3d7ec9"})}</g>
 <g data-only="1 2">${lab(466,300,"1",{anchor:"middle",fs:34,c:"#fff",fw:800})}</g>
 <g data-only="2"><line x1="120" y1="226" x2="380" y2="226" stroke="#b86400" stroke-width="5" marker-end="url(#aO)"/>${lab(100,140,"row selected: switch closes",{fs:14,c:"#b86400"})}</g>
 <g data-only="3">${lab(466,316,"fading…",{anchor:"middle",fs:20,c:"#0b3954",fw:800})}</g>
 <g data-only="4"><line x1="300" y1="186" x2="390" y2="186" stroke="#b86400" stroke-width="8" marker-end="url(#aO)"/><rect x="560" y="70" width="190" height="96" rx="10" fill="#fff3e0" stroke="#b86400"/>${lab(572,94,"REFRESH",{fs:15,c:"#7a4200"})}${lab(572,114,"read the bit, write it",{fs:13,fw:600})}${lab(572,131,"back at full charge",{fs:13,fw:600})}${lab(572,152,"every row, at least every 64 ms",{fs:12,fw:600,c:"#566573"})}</g>
 <g data-only="5"><rect x="560" y="70" width="170" height="60" rx="10" fill="#fdecea" stroke="#c0392b"/>${lab(645,96,"POWER OFF",{anchor:"middle",c:"#c0392b"})}${lab(645,116,"every bit lost",{anchor:"middle",fs:13,fw:600,c:"#c0392b"})}${lab(466,316,"0",{anchor:"middle",fs:34,c:"#c0392b",fw:800})}</g>
 </svg>`,steps:[
 "In DRAM, each bit is stored as <b>charge in a capacitor</b>. Charged is 1, empty is 0. Each cell is just <b>one transistor and one capacitor</b>.",
 "The <b>transistor</b> is a switch. When the row is selected, it connects the capacitor to the bit line so the bit can be written or read.",
 "The capacitor <b>leaks</b>. Its charge drains away, so a 1 slowly falls towards 0.",
 "So DRAM <b>must be refreshed</b>: each row is read and written back at full charge, at least every <b>64 ms</b> (about 16 times a second).",
 "Switch the power off and nothing refreshes: every capacitor drains. DRAM is <b>volatile</b>."]});

/* refresh grid */
(function(){
 const smile=["00111100","01000010","10100101","10000001","10100101","10011001","01000010","00111100"];
 const svg=$("#rGrid"),C=38,O=13; let q=[],refresh=true,row=0,lost=0,t=0;
 function reset(){q=smile.map(r=>[...r].map(c=>c==="1"?1:0));lost=0;$("#rLost").textContent=0}
 function draw(){let h=`<rect x="0" y="0" width="330" height="330" rx="10" fill="#fff"/>`;
  if(refresh)h+=`<rect x="6" y="${O+row*C-3}" width="318" height="${C}" rx="6" fill="#fff3e0" stroke="#b86400"/>`;
  q.forEach((r,y)=>r.forEach((v,x)=>{h+=`<rect x="${O+x*C}" y="${O+y*C}" width="${C-6}" height="${C-6}" rx="5" fill="#0b3954" fill-opacity="${(.08+v*.92).toFixed(2)}" stroke="#d6dde3"/>`}));svg.innerHTML=h}
 reset();
 setInterval(()=>{ if(document.hidden)return; t++;
  q.forEach(r=>r.forEach((v,x)=>{if(v>0){const nv=v-.012;if(nv<.5&&v>=.5){lost++;r[x]=0}else r[x]=nv}}));
  if(refresh&&t%4===0){q[row]=q[row].map(v=>v>=.5?1:0);row=(row+1)%8}
  $("#rLost").textContent=lost;draw()},60);
 function setR(on){refresh=on;$("#rOn").className="btn"+(on?" primary":"");$("#rOff").className="btn"+(on?"":" primary")}
 $("#rOn").onclick=()=>setR(true);$("#rOff").onclick=()=>setR(false);$("#rReset").onclick=()=>{reset();draw()};draw();
})();

/* ---------- 5 SRAM animation ---------- */
(function(){
 const loop="M70 110 H300 V210 H70 Z";
 let sg="",dg="";for(let r=0;r<4;r++)for(let c=0;c<4;c++)sg+=`<rect x="${412+c*36}" y="${78+r*36}" width="32" height="32" rx="3" fill="#b86400" opacity=".85"/>`;
 for(let r=0;r<10;r++)for(let c=0;c<10;c++)dg+=`<rect x="${592+c*14.4}" y="${78+r*14.4}" width="12" height="12" rx="2" fill="#3d7ec9"/>`;
 const tri=(x,y,dir)=>dir>0?`<path d="M${x} ${y-18} L${x+40} ${y} L${x} ${y+18} Z" fill="#fff" stroke="#0b3954" stroke-width="3"/><circle cx="${x+46}" cy="${y}" r="6" fill="#fff" stroke="#0b3954" stroke-width="3"/>`
                          :`<path d="M${x} ${y-18} L${x-40} ${y} L${x} ${y+18} Z" fill="#fff" stroke="#0b3954" stroke-width="3"/><circle cx="${x-46}" cy="${y}" r="6" fill="#fff" stroke="#0b3954" stroke-width="3"/>`;
 const svg=`<svg viewBox="0 0 760 420" role="img" aria-label="Animated SRAM cell: a loop of two gates keeps a bit circulating with no refresh. Drawn to size, the SRAM cell is much bigger than a DRAM cell, so the same chip area holds far more DRAM bits.">
 <defs><style>#dot{offset-path:path("${loop}");animation:loopmv 1.8s linear infinite}@keyframes loopmv{from{offset-distance:0%}to{offset-distance:100%}}</style></defs>
 <g data-from="1">${lab(40,40,"SRAM cell: a flip-flop",{c:"#b86400"})}
  <path d="${loop}" fill="none" stroke="#566573" stroke-width="4" stroke-linejoin="round"/>
  ${tri(150,110,1)}${tri(230,210,-1)}
  <g data-to="2" data-from="1"><circle id="dot" r="9" fill="#b86400"/></g>
  ${lab(185,160,"the bit goes round",{anchor:"middle",fs:13,fw:600,c:"#566573"})}${lab(185,177,"and round the loop",{anchor:"middle",fs:13,fw:600,c:"#566573"})}</g>
 <g data-from="2">${lab(40,246,"No refresh needed while powered",{fs:14,c:"#1f8a4c"})}${lab(40,264,"Faster access",{fs:14,c:"#1f8a4c"})}</g>
 <g data-only="3"><rect x="120" y="130" width="130" height="60" rx="10" fill="#fdecea" stroke="#c0392b"/>${lab(185,156,"POWER OFF",{anchor:"middle",fs:14,c:"#c0392b"})}${lab(185,175,"bit lost: volatile",{anchor:"middle",fs:13,fw:600,c:"#c0392b"})}</g>
 <g data-from="4"><line x1="20" y1="282" x2="370" y2="282" stroke="#d6dde3"/>${lab(40,306,"Size compared (not to scale)",{fs:14,c:"#0b3954"})}
  <rect x="40" y="318" width="132" height="90" rx="8" fill="#fff3e0" stroke="#b86400" stroke-width="2"/>${[0,1,2].map(c=>[0,1].map(r=>`<rect x="${52+c*40}" y="${328+r*38}" width="30" height="30" rx="3" fill="#b86400" opacity=".85"/>`).join("")).join("")}
  ${lab(186,340,"SRAM: 6 transistors",{fs:13,c:"#b86400"})}
  <rect x="186" y="352" width="56" height="56" rx="8" fill="#eaf2fb" stroke="#3d7ec9" stroke-width="2"/><rect x="194" y="360" width="20" height="20" rx="3" fill="#3d7ec9"/><rect x="218" y="364" width="16" height="36" rx="3" fill="#9cc2ea" stroke="#3d7ec9"/>
  ${lab(250,374,"DRAM: 1 transistor",{fs:13,c:"#3d7ec9"})}${lab(250,392,"+ 1 capacitor",{fs:13,c:"#3d7ec9"})}</g>
 <g data-from="5"><rect x="400" y="40" width="346" height="232" rx="12" fill="#fff" stroke="#0b3954" stroke-width="2"/>${lab(412,64,"The same chip area holds…",{fs:14,c:"#0b3954"})}
  <rect x="408" y="74" width="148" height="148" fill="none" stroke="#b86400" stroke-dasharray="4 3"/>${sg}<rect x="588" y="74" width="148" height="148" fill="none" stroke="#3d7ec9" stroke-dasharray="4 3"/>${dg}
  ${lab(482,244,"SRAM: 16 bits",{anchor:"middle",fs:14,c:"#b86400"})}${lab(662,244,"DRAM: 100 bits",{anchor:"middle",fs:14,c:"#3d7ec9"})}${lab(573,264,"(picture, not exact numbers)",{anchor:"middle",fs:11,fw:600,c:"#566573"})}</g>
 <g data-from="6"><g transform="translate(0,4)">
  <path d="M573 288 L633 288 L653 318 L493 318 L513 288 Z" fill="#0b3954"/>${lab(573,309,"registers",{anchor:"middle",fs:12,c:"#fff"})}
  <path d="M493 320 L653 320 L673 350 L473 350 Z" fill="#b86400"/>${lab(573,341,"cache = SRAM",{anchor:"middle",fs:13,c:"#fff"})}
  <path d="M473 352 L673 352 L693 382 L453 382 Z" fill="#3d7ec9"/>${lab(573,373,"main memory = DRAM",{anchor:"middle",fs:13,c:"#fff"})}
  <path d="M453 384 L693 384 L713 414 L433 414 Z" fill="#8a99a6"/>${lab(573,405,"secondary storage",{anchor:"middle",fs:13,c:"#fff"})}
  ${lab(400,300,"faster,",{fs:12,c:"#566573"})}${lab(400,314,"smaller",{fs:12,c:"#566573"})}${lab(718,396,"bigger,",{fs:12,c:"#566573"})}${lab(718,410,"cheaper",{fs:12,c:"#566573"})}</g></g>
 </svg>`;
 L.anim($("#animSRAM"),{title:"Animation: SRAM, and why size matters",svg,steps:[
  "In SRAM, each bit is held in a <b>flip-flop</b>: a loop of gates (usually 6 transistors) that keeps feeding the bit back to itself.",
  "Because the loop holds the bit, SRAM <b>does not need refreshing</b> while it has power. It also has <b>faster access</b> than DRAM.",
  "Switch the power off and the loop stops. SRAM is <b>volatile</b>, just like DRAM.",
  "Compared side by side, an SRAM cell (6 transistors) is much <b>bigger</b> than a DRAM cell (1 transistor and 1 capacitor).",
  "So the same chip area holds far more DRAM bits. DRAM has a <b>higher bit density</b> and is <b>less expensive to manufacture</b>.",
  "That is why <b>SRAM is used for cache</b> (small and fast) and <b>DRAM is used for main memory</b> (big and cheaper)."]});
})();
L.sort($("#sortRAM"),{bins:["SRAM","DRAM","Both"],items:[
 {t:"Stores each bit as charge in a capacitor",a:"DRAM",why:"DRAM: one transistor and one capacitor per bit."},
 {t:"Holds each bit in a flip-flop",a:"SRAM",why:"SRAM: a loop of gates."},
 {t:"Must be refreshed",a:"DRAM",why:"The capacitors leak."},
 {t:"Does not need refreshing",a:"SRAM",why:"The loop holds the bit while powered."},
 {t:"Faster access",a:"SRAM",why:"That is why it is used for cache."},
 {t:"Less expensive to manufacture",a:"DRAM",why:"Smaller cells, so cheaper per bit."},
 {t:"Higher bit density (more data per chip)",a:"DRAM",why:"Smaller cells fit more bits in the same area."},
 {t:"Used for cache",a:"SRAM"},
 {t:"Used for main memory",a:"DRAM"},
 {t:"Volatile: loses its data when the power is off",a:"Both",why:"Both are RAM, and both are volatile.",hint:"Think about what happens to each one at power off."}]});

/* ---------- 6 ROM animation ---------- */
(function(){
 const bits=(x,y,cls,pat)=>pat.map((b,i)=>`<rect class="${cls}" data-b="${b}" x="${x+(i%4)*24}" y="${y+Math.floor(i/4)*22}" width="18" height="16" rx="2" fill="${b?"#0b3954":"#e3e8ec"}" stroke="#8a99a6"/>`).join("");
 const board=(cx)=>`<rect x="${cx-100}" y="330" width="200" height="26" rx="4" fill="#2e6b4f"/>${[...Array(8)].map((_,i)=>`<rect x="${cx-52+i*14}" y="318" width="6" height="12" fill="#a9b6c1"/>`).join("")}`;
 const chip=(cx,inner)=>`<rect x="${cx-60}" y="258" width="120" height="62" rx="6" fill="#1b1f24"/>${inner}`;
 const pat=[1,0,1,1,0,1,0,0];
 const svg=`<svg viewBox="0 0 760 420" role="img" aria-label="Animated ROM family. PROM: fuses blown once. EPROM: chip removed and erased under ultraviolet light, whole chip wiped. EEPROM: erased electrically in the circuit, only part rewritten.">
 <defs><style>
 #epChip{transition:transform 1.6s ease-in-out}.s3 #epChip{transform:translateY(-150px)}.s5 #epChip{transform:translateY(0)}
 .ebit{transition:fill 1.6s}.s4 .ebit{fill:#e3e8ec}.s5 .ebit.eb1{fill:#0b3954}
 .eebit2{transition:fill .6s}.s6 .eebit2{animation:flipb 1.6s steps(1) infinite}@keyframes flipb{50%{fill:#b86400}}
 .ray{animation:pulse .8s ease-in-out infinite}
 .spark{animation:pulse .5s ease-in-out 4}
 </style></defs>
 <line x1="253" y1="20" x2="253" y2="410" stroke="#d6dde3" stroke-width="2"/><line x1="506" y1="20" x2="506" y2="410" stroke="#d6dde3" stroke-width="2"/>
 ${lab(126,34,"PROM",{anchor:"middle",fs:18,c:"#0b3954"})}${lab(380,34,"EPROM",{anchor:"middle",fs:18,c:"#0b3954"})}${lab(633,34,"EEPROM",{anchor:"middle",fs:18,c:"#0b3954"})}
 ${board(126)}${chip(126,bits(84,270,"pbit",pat))}
 <g data-from="1">${[1,4,6,7].map(i=>`<path class="spark" d="M${84+(i%4)*24+9} ${270+Math.floor(i/4)*22-6} l4 6 l-6 2 l6 6" stroke="#e74c3c" stroke-width="2" fill="none"/>`).join("")}
  ${lab(126,380,"fuses blown once",{anchor:"middle",fs:14,c:"#b86400"})}${lab(126,398,"set once: cannot be changed",{anchor:"middle",fs:13,fw:600})}
  <g transform="translate(110,190)"><rect x="0" y="14" width="32" height="24" rx="4" fill="#566573"/><path d="M6 14 v-6 a10 10 0 0 1 20 0 v6" stroke="#566573" stroke-width="4" fill="none"/></g></g>
 ${board(380)}
 <g id="epChip">${chip(380,`<circle cx="380" cy="289" r="12" fill="#c9b6f2" stroke="#7a5bc7" stroke-width="3"/>`+pat.map((v,i)=>`<rect class="ebit${[0,1,1,0,1,0,1,1][i]?" eb1":""}" x="${[324,346,396,418][i%4]}" y="${270+Math.floor(i/4)*22}" width="18" height="16" rx="2" fill="${v?"#0b3954":"#e3e8ec"}" stroke="#8a99a6"/>`).join(""))}</g>
 <g data-only="2">${lab(380,236,"quartz window",{anchor:"middle",fs:13,c:"#7a5bc7"})}</g>
 <g data-from="3" data-to="4"><rect x="320" y="50" width="120" height="22" rx="6" fill="#7a5bc7"/>${lab(380,66,"UV lamp",{anchor:"middle",fs:13,c:"#fff"})}
  ${[0,1,2,3,4].map(i=>`<line class="ray" x1="${336+i*22}" y1="74" x2="${336+i*22}" y2="104" stroke="#9b7be0" stroke-width="4" style="animation-delay:${i*.12}s"/>`).join("")}</g>
 <g data-from="3">${lab(380,380,"removed from the device",{anchor:"middle",fs:14,c:"#7a5bc7"})}</g>
 <g data-from="4">${lab(380,398,"whole chip erased, then",{anchor:"middle",fs:13,fw:600})}${lab(380,414,"reprogrammed and put back",{anchor:"middle",fs:13,fw:600})}</g>
 ${board(633)}${chip(633,bits(591,270,"eebit",pat).replace(/class="eebit" data-b="(\d)" x="(\d+)" y="270"/g,(m,b,x)=>(+x===615||+x===639)?`class="eebit2" data-b="${b}" x="${x}" y="270"`:m))}
 <g data-from="5"><path d="M640 150 L620 200 L638 200 L624 246 L662 188 L642 188 L656 150 Z" fill="#f2c200" stroke="#b86400" stroke-width="2"/>
  ${lab(633,138,"voltage",{anchor:"middle",fs:14,c:"#b86400"})}${lab(633,380,"stays in the circuit (in situ)",{anchor:"middle",fs:14,c:"#b86400"})}</g>
 <g data-from="6">${lab(633,398,"only part is rewritten",{anchor:"middle",fs:13,fw:600})}${lab(633,414,"flash is a type of EEPROM",{anchor:"middle",fs:13,fw:600})}</g>
 </svg>`;
 L.anim($("#animROM"),{title:"Animation: how each ROM chip is written and erased",svg,steps:[
  "<b>PROM</b> is programmed <b>once</b>. Tiny fuses are blown to set the bits. After that it <b>cannot be changed</b>.",
  "<b>EPROM</b> can be erased and reprogrammed. It has a small <b>quartz window</b> on top.",
  "To change it, the chip must be <b>removed from the device</b> and put under <b>ultraviolet (UV) light</b>.",
  "The UV light erases <b>the whole chip</b>. Then it is reprogrammed and put back.",
  "<b>EEPROM</b> is erased <b>electrically</b>, with a voltage, while it stays <b>in the circuit</b> (in situ).",
  "EEPROM can erase and rewrite <b>part of the data</b>. <b>Flash memory</b> is a type of EEPROM."]});
})();
L.sort($("#sortROM"),{bins:["PROM","EPROM","EEPROM"],items:[
 {t:"Can be written once only",a:"PROM"},
 {t:"Erased using ultraviolet light",a:"EPROM"},
 {t:"Erased electrically, with a voltage",a:"EEPROM"},
 {t:"Must be removed from the device to be changed",a:"EPROM"},
 {t:"Can be changed while it stays in the circuit",a:"EEPROM",why:"In situ: in place."},
 {t:"The whole chip is erased before rewriting",a:"EPROM"},
 {t:"Part of the data can be erased and rewritten",a:"EEPROM"},
 {t:"Flash memory is a type of this",a:"EEPROM"}]});

/* ---------- 7 Firmware game ---------- */
const FW=[
 {n:"An old calculator",chip:"PROM",steps:["Checking the firmware chip…","PROM: it can only be set once.","✗ Cannot be updated. The only way is to replace the chip."],bad:true},
 {n:"A 1980s arcade machine",chip:"EPROM",steps:["Switch off and open the case","Remove the EPROM chip from the board","Put it in a UV eraser for about 15 minutes: the whole chip is wiped","Program the new game onto the chip","Put the chip back on the board","✓ Updated, but only by taking the chip out"]},
 {n:"A smart TV",chip:"EEPROM / flash",steps:["Download the update over Wi-Fi","Erase part of the chip electrically, in place","Write the new firmware","✓ Updated without opening the TV"],power:true}];
$("#fwGame").innerHTML=FW.map((d,i)=>`<div class="card"><h3>${d.n}</h3><p class="small muted">Firmware chip: <b>${d.chip}</b></p><div class="row"><button class="btn primary" data-fw="${i}">Update</button>${d.power?`<button class="btn" data-fwp="${i}">Update, then lose power halfway</button>`:""}</div><ol class="small" id="fwLog${i}" style="margin:10px 0 0;padding-left:1.2em"></ol></div>`).join("");
$("#fwGame").addEventListener("click",e=>{const b=e.target.closest("[data-fw],[data-fwp]");if(!b)return;const p=b.hasAttribute("data-fwp"),i=+(b.dataset.fw||b.dataset.fwp),d=FW[i],log=$("#fwLog"+i);
  log.innerHTML="";const st=p?[d.steps[0],d.steps[1],"⚡ Power lost halfway through writing","✗ The firmware is half old, half new. The TV may not start. That is why devices warn you not to switch off during an update."]:d.steps;
  st.forEach((s,k)=>setTimeout(()=>{const li=document.createElement("li");li.innerHTML=s;if(/^✗/.test(s))li.style.color="var(--bad)";if(/^✓/.test(s))li.style.color="var(--good)";log.appendChild(li)},k*(L.PRINT?0:650)))});

/* ---------- 8 Embedded animation ---------- */
L.anim($("#animEMB"),{title:"Animation: the embedded system inside a washing machine",svg:`<svg viewBox="0 0 760 440" role="img" aria-label="Animated washing machine with its embedded control board: processor, firmware and RAM, sensors feeding in and actuators acting. Then four drawbacks appear one at a time, ending with the machine thrown away as e-waste.">
 <defs><marker id="aT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#087e8b"/></marker>
 <style>.flow{stroke-dasharray:8 8;animation:fl 1s linear infinite}@keyframes fl{to{stroke-dashoffset:-16}}
 #wm{transition:opacity 1.2s,transform 1.4s}.s7 #wm{opacity:.35;transform:translateY(16px)}</style></defs>
 <g id="wm"><rect x="30" y="40" width="250" height="370" rx="18" fill="#f5f7f9" stroke="#566573" stroke-width="3"/>
  <rect x="30" y="40" width="250" height="70" rx="18" fill="#e3e8ec" stroke="#566573" stroke-width="3"/><circle cx="235" cy="75" r="20" fill="#fff" stroke="#566573" stroke-width="3"/><rect x="52" y="64" width="90" height="22" rx="4" fill="#0b3954"/>
  <circle cx="155" cy="260" r="100" fill="#d6dde3" stroke="#566573" stroke-width="4"/><circle cx="155" cy="260" r="76" fill="#bcd3e3" stroke="#8a99a6" stroke-width="3"/></g>
 <g data-from="1"><rect x="52" y="64" width="90" height="22" rx="4" fill="none" stroke="#b86400" stroke-width="3"/><path d="M142 75 C 220 40, 280 40, 330 70" stroke="#b86400" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>
  <rect x="330" y="40" width="230" height="150" rx="12" fill="#2e6b4f" stroke="#1d4a36" stroke-width="2"/>${lab(342,62,"control board",{fs:13,c:"#e5f5ec"})}
  <rect x="345" y="74" width="88" height="56" rx="5" fill="#1b1f24"/>${lab(389,106,"processor",{anchor:"middle",fs:12,c:"#fff"})}</g>
 <g data-from="2"><rect x="445" y="74" width="100" height="44" rx="5" fill="#1b1f24"/>${lab(495,92,"firmware",{anchor:"middle",fs:12,c:"#fff"})}${lab(495,108,"flash / EEPROM",{anchor:"middle",fs:11,fw:600,c:"#9fb0bd"})}
  <rect x="445" y="126" width="100" height="44" rx="5" fill="#1b1f24"/>${lab(495,144,"RAM",{anchor:"middle",fs:12,c:"#fff"})}${lab(495,160,"working memory",{anchor:"middle",fs:11,fw:600,c:"#9fb0bd"})}
  <rect x="345" y="140" width="88" height="30" rx="5" fill="#1b1f24"/>${lab(389,160,"input/output",{anchor:"middle",fs:11,c:"#fff"})}</g>
 <g data-from="3" data-to="3">
  <rect x="330" y="214" width="110" height="32" rx="6" fill="#e8f6f7" stroke="#087e8b"/>${lab(385,235,"water level",{anchor:"middle",fs:12})}
  <rect x="330" y="254" width="110" height="32" rx="6" fill="#e8f6f7" stroke="#087e8b"/>${lab(385,275,"temperature",{anchor:"middle",fs:12})}
  ${lab(330,306,"SENSORS (in)",{fs:12,c:"#087e8b"})}
  <rect x="460" y="214" width="100" height="26" rx="6" fill="#fff3e0" stroke="#b86400"/>${lab(510,232,"motor",{anchor:"middle",fs:12})}
  <rect x="460" y="246" width="100" height="26" rx="6" fill="#fff3e0" stroke="#b86400"/>${lab(510,264,"heater",{anchor:"middle",fs:12})}
  <rect x="460" y="278" width="100" height="26" rx="6" fill="#fff3e0" stroke="#b86400"/>${lab(510,296,"water valve",{anchor:"middle",fs:12})}
  ${lab(460,322,"ACTUATORS (out)",{fs:12,c:"#b86400"})}
  <path class="flow" d="M385 214 V176" stroke="#087e8b" stroke-width="3" marker-end="url(#aT)"/><path class="flow" d="M510 192 V212" stroke="#b86400" stroke-width="3" marker-end="url(#aT)"/></g>
 ${[["Hard for the user to","change or update","the firmware"],["Faults are hard to fix:","repair is specialist","and expensive"],["Cannot easily be","changed or adapted","for another task"],["Thrown away rather","than repaired, leading","to e-waste"]].map((c,i)=>`<g data-from="${i+4}"><rect x="${i<2?330:545}" y="${i%2?330:214}" width="${i<2?205:205}" height="96" rx="10" fill="#fdecea" stroke="#c0392b" stroke-width="2"/>${lab((i<2?342:557),(i%2?354:238),"DRAWBACK "+(i+1),{fs:12,c:"#c0392b"})}${c.map((l,k)=>lab((i<2?342:557),(i%2?374:258)+k*18,l,{fs:13,fw:600})).join("")}</g>`).join("")}
 <g data-from="7">${lab(155,436,"e-waste",{anchor:"middle",fs:16,c:"#c0392b"})}</g>
 </svg>`,steps:[
 "An <b>embedded system</b> is built into a larger device to perform <b>one specific function</b>. Here it is the control board inside a washing machine.",
 "It is a combination of <b>hardware and software</b>: a <b>processor</b>, <b>memory</b> and <b>input/output</b>. The program (firmware) is in ROM, EEPROM or flash. The working memory is <b>RAM</b>: SRAM in a small device, DRAM when it needs a lot (cheaper, more data per chip).",
 "<b>Sensors</b> send readings in (water level, temperature). The firmware decides what to do. <b>Actuators</b> act (motor, heater, water valve).",
 "Drawback: it is <b>difficult for the user to change or update the firmware</b>.",
 "Drawback: errors <b>cannot be fixed easily</b>. Finding and repairing faults is a <b>specialist and expensive</b> job.",
 "Drawback: its <b>functionality cannot easily be changed</b> or adapted for another task.",
 "Drawback: faulty or outdated devices are often <b>thrown away rather than repaired</b>, leading to <b>e-waste</b>."]});
L.sort($("#sortEMB"),{bins:["Drawback","Benefit"],items:[
 {t:"Difficult for the user to change or update the firmware",a:"Drawback"},
 {t:"Small and uses little power",a:"Benefit",why:"It fits inside the device and can run on a battery."},
 {t:"Faults are hard to find and expensive to repair",a:"Drawback"},
 {t:"Cheap to mass-produce",a:"Benefit"},
 {t:"Cannot easily be adapted for another task",a:"Drawback"},
 {t:"Reliable, because it does one job",a:"Benefit"},
 {t:"Faulty devices are often thrown away, causing e-waste",a:"Drawback"},
 {t:"Starts instantly and responds in real time",a:"Benefit"}]});

/* ---------- 9 Chip choice ---------- */
const CH=["SRAM","DRAM","PROM","EPROM","EEPROM"];
const devices=[
 {n:"Laptop cache",d:"Memory inside the processor that holds the data and instructions in use right now.",a:"SRAM",
  why:"<b>SRAM</b>: faster access; does not need refreshing; this is what cache is made of.",
  no:{DRAM:"DRAM is cheaper but slower. Cache needs the fastest memory.",PROM:"ROM chips hold firmware. Cache holds data that changes every moment, so it must be RAM.",EPROM:"ROM chips hold firmware. Cache holds data that changes every moment, so it must be RAM.",EEPROM:"Far too slow to rewrite. Cache must be RAM."}},
 {n:"3D printer",d:"Holds 1 GB of print data while it prints.",a:"DRAM",
  why:"<b>DRAM</b>: less expensive to manufacture; higher bit density, so 1 GB fits on fewer, cheaper chips; a fast access speed is not needed for print data.",
  no:{SRAM:"SRAM would work, but 1 GB of SRAM would cost far more and take far more space.",PROM:"The print data changes with every job, so it must be RAM.",EPROM:"The print data changes with every job, so it must be RAM.",EEPROM:"The print data changes with every job, so it needs RAM."}},
 {n:"VR headset firmware",d:"The program in the headset. The company will send updates.",a:"EEPROM",
  why:"<b>EEPROM</b>: can be rewritten many times, electrically, while it stays in the headset (in situ), without erasing everything.",
  no:{SRAM:"SRAM is volatile: the firmware would vanish when the headset is switched off.",DRAM:"DRAM is volatile: the firmware would vanish at power off.",PROM:"PROM can be set only once, so no updates.",EPROM:"EPROM must be removed and erased with UV light. Nobody can do that with a headset at home."}},
 {n:"A smartphone's main memory",d:"8 GB of working memory for the apps that are open.",a:"DRAM",
  why:"<b>DRAM</b>: less expensive to manufacture than SRAM; higher bit density, so 8 GB fits on one small chip.",
  no:{SRAM:"SRAM is faster, but 8 GB of SRAM would cost far more and need far more space.",PROM:"Working memory changes all the time, so it must be RAM.",EPROM:"Working memory changes all the time, so it must be RAM.",EEPROM:"Working memory changes all the time, so it must be RAM."}},
 {n:"A 1980s arcade machine",d:"The game must stay when the machine is off. A few times a year the operator takes the chip out and loads a new game.",a:"EPROM",
  why:"<b>EPROM</b>: non-volatile, so the game stays; it can be erased with UV light and reprogrammed. The chip has to be removed, which the operator can do.",
  no:{SRAM:"Volatile: the game would be gone every time the machine is switched off.",DRAM:"Volatile: the game would be gone at power off.",PROM:"PROM is set once, so no new games.",EEPROM:"It would work today, but the clue is that the operator takes the chip out to change it: that is EPROM."}},
 {n:"A games console's anti-rollback record",d:"A tiny record, set during each update, that can never be undone, so the console can never go back to older firmware. (The firmware itself is in flash.)",a:"PROM",
  why:"<b>PROM</b>: once a bit is set it cannot be changed. Real consoles burn tiny one-time fuses during updates for exactly this reason.",
  no:{SRAM:"Volatile: the record would vanish at power off.",DRAM:"Volatile: the record would vanish at power off.",EPROM:"EPROM can be erased, so the record could be undone.",EEPROM:"EEPROM can be rewritten, so someone could undo the record."}}];
$("#chips").innerHTML=devices.map((d,i)=>`<div class="card" id="chip${i}"></div>`).join("");
devices.forEach((d,i)=>L.mcq($("#chip"+i),{stem:`<span class="chip">${i+1}</span> <b>${d.n}</b><br><span class="muted" style="font-weight:400">${d.d}</span>`,shuffle:false,retry:true,
  options:CH.map(c=>({t:c,ok:c===d.a,fb:c===d.a?d.why:d.no[c]}))}));

/* ---------- 11 Hinge ---------- */
L.mcq($("#hinge2"),{noPrintReveal:true,stem:"A smart TV maker wants to fix a bug in every TV already sold, over the internet. Which chip should hold the firmware?",shuffle:false,retry:true,options:[
 {t:"PROM, because it is cheapest and cannot be changed by mistake",ok:false,fb:"PROM can be set only once. Every TV would need a new chip."},
 {t:"EPROM, because it can be erased and rewritten",ok:false,fb:"EPROM has to be removed from the circuit and erased with UV light. Nobody can do that over the internet."},
 {t:"EEPROM, because it can be rewritten electrically in situ",ok:true,fb:"EEPROM can be erased and rewritten electrically while it stays in the TV."},
 {t:"SRAM, because it is fast",ok:false,fb:"SRAM is volatile. The firmware would be lost every time the TV is switched off."}]});

if(L.PRINT)FW.forEach((d,i)=>{$("#fwLog"+i).innerHTML=d.steps.map(x=>`<li>${x}</li>`).join("")+(d.power?"<li>If the power is lost halfway: the firmware is half old, half new, and the TV may not start.</li>":"")});
L.init("h2");
})();
