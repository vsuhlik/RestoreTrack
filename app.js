/// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const LEVELS=[
  {ci:'CI-0',desc:'Starting point of restoration. No loose skin present.',soft:'',hard:''},
  {ci:'CI-1',desc:'',soft:'No loose skin on the shaft.',hard:'Shaft skin is very tight, may draw the scrotum up on some men.'},
  {ci:'CI-2',desc:'',soft:'Some loose skin wrinkles over the sulcus.',hard:'Shaft skin is tight.'},
  {ci:'CI-3',desc:'',soft:'Foreskin covers the sulcus and just touches the corona.',hard:'May be very slight wrinkling of shaft skin.'},
  {ci:'CI-4',desc:'',soft:'Foreskin covers the corona, leaving most of the glans exposed.',hard:'Some wrinkling of shaft skin behind the sulcus.'},
  {ci:'CI-5',desc:'',soft:'Half to two-thirds of the glans is exposed.',hard:'Foreskin wrinkles over the sulcus.'},
  {ci:'CI-6',desc:'',soft:'Foreskin covers most of the glans.',hard:'Foreskin retracts behind the corona.'},
  {ci:'CI-7',desc:'',soft:'Glans is completely covered with glans visible through the opening.',hard:'Foreskin covers the corona and some of the glans.'},
  {ci:'CI-8',desc:'',soft:'Small amount of overhanging foreskin.',hard:'Foreskin covers over half of the glans.'},
  {ci:'CI-9',desc:'',soft:'Foreskin overhangs the end of the glans.',hard:'Foreskin completely covers the glans but there is no overhang.'},
  {ci:'CI-10',desc:'',soft:'Considerable overhanging foreskin.',hard:'Foreskin still overhangs the end of the glans.'}
];
const ciDesc=(l)=>l.ci==='CI-0'?'Starting point of restoration. No loose skin present.':
  `<span style="color:var(--text3);font-weight:600">Soft:</span> ${l.soft}<br><span style="color:var(--text3);font-weight:600">Hard:</span> ${l.hard}`;
const CATS=[
  {id:'manual',label:'Manual',icon:'✋',color:'#F59E0B',
   methods:['MM1 (Manual Method 1)','MM2 (Manual Method 2)','MM3 (Manual Method 3)','MM4 (Manual Method 4)','MM5 (Manual Method 5)','Squeeze-Stretch Method',"André's Method",'O-Rings']},
   //
  {id:'device',label:'Devices',icon:'⚙',color:'#60A5FA',
   methods:['DTR','TLC Tugger','TLC-X','CAT II Q','Mantor DS','Mantor SLT','PUD','FMD','Stealth Retainer']},
   //
  {id:'tape',label:'Taping',icon:'📐',color:'#A78BFA',
   methods:['T-Tape','Cross Tape','Kraven-Tape','Reverse Tape','Canister Method']},
   //
  {id:'inflation',label:'Inflation',icon:'💨',color:'#34D399',
   methods:['HyperRestore','Foreskinned','Airforce','Priva Air',"Chris' Air Retainer (CAR-1)",'DIY Balloon Method','FIT V4','Pecker Packer']},
   //
  {id:'retaining',label:'Retaining',icon:'🔒',color:'#F472B6',
   methods:['TLC Your-Skin-Cone','O-Rings (Retaining)','Mantor Skin2Skin','ManHood','The Phoenix']},
   //
  {id:'packing',label:'Packing',icon:'📦',color:'#FB923C',
   methods:['TLC Packer','Restore In Comfort (RIC)','Stealth Extended P-Tainer','Pear Gauge','Foam Insert (DIY)']},
  {id:'custom',label:'Custom',icon:'🛠️',color:'#E879F9',methods:[]}
];
const ACHS=[
  // ── First steps
  {id:'first',   icon:'🌱',title:'First Session',      desc:'Log your very first session',                    check:c=>c.sessions>=1},
  {id:'rest1',   icon:'🛌',title:'First Rest Day',     desc:'Mark your first intentional rest day',           check:c=>(c.restDays||[]).length>=1},
  {id:'photo1',  icon:'📸',title:'First Photo',        desc:'Add your first progress photo',                  check:(_,p)=>p&&p.length>=1},

  // ── Session milestones
  {id:'s10',     icon:'📝',title:'10 Sessions',        desc:'Log 10 sessions',                                check:c=>c.sessions>=10},
  {id:'s25',     icon:'🔄',title:'25 Sessions',        desc:'Log 25 sessions — building the habit',           check:c=>c.sessions>=25},
  {id:'s50',     icon:'💪',title:'50 Sessions',        desc:'Log 50 sessions',                                check:c=>c.sessions>=50},
  {id:'s100',    icon:'🏅',title:'100 Sessions',       desc:'Log 100 sessions',                               check:c=>c.sessions>=100},
  {id:'s200',    icon:'🎖️',title:'200 Sessions',       desc:'Log 200 sessions',                               check:c=>c.sessions>=200},
  {id:'s365',    icon:'📅',title:'365 Sessions',       desc:'A full year of effort',                          check:c=>c.sessions>=365},
  {id:'s500',    icon:'🌟',title:'500 Sessions',       desc:'500 sessions — extraordinary commitment',        check:c=>c.sessions>=500},

  // ── Time milestones
  {id:'h1',      icon:'⏱',title:'1 Hour',             desc:'Accumulate your first hour of restoration time', check:c=>c.minutes>=60},
  {id:'h10',     icon:'⌛',title:'10 Hours',           desc:'Accumulate 10 total hours',                      check:c=>c.minutes>=600},
  {id:'h25',     icon:'🕐',title:'25 Hours',           desc:'25 hours — tissue is responding',                check:c=>c.minutes>=1500},
  {id:'h50',     icon:'💡',title:'50 Hours',           desc:'Accumulate 50 total hours',                      check:c=>c.minutes>=3000},
  {id:'h100',    icon:'💯',title:'100 Hours',          desc:'100 hours of dedicated restoration',             check:c=>c.minutes>=6000},
  {id:'h250',    icon:'🔥',title:'250 Hours',          desc:'250 hours — serious dedication',                 check:c=>c.minutes>=15000},
  {id:'h500',    icon:'⚡',title:'500 Hours',          desc:'500 hours logged',                               check:c=>c.minutes>=30000},
  {id:'h1000',   icon:'👑',title:'1,000 Hours',        desc:'1,000 hours — among the most dedicated restorers in existence', check:c=>c.minutes>=60000},

  // ── Streak milestones
  {id:'str3',    icon:'3️⃣',title:'3-Day Streak',      desc:'Restore 3 days in a row',                        check:c=>c.streak>=3},
  {id:'str7',    icon:'7️⃣',title:'Week Streak',        desc:'Restore 7 days in a row',                        check:c=>c.streak>=7},
  {id:'str14',   icon:'✌️',title:'2-Week Streak',      desc:'14 days in a row',                               check:c=>c.streak>=14},
  {id:'str30',   icon:'🌙',title:'Month Streak',       desc:'30 days in a row',                               check:c=>c.streak>=30},
  {id:'str60',   icon:'⭐',title:'60-Day Streak',      desc:'Two months of daily consistency',                check:c=>c.streak>=60},
  {id:'str90',   icon:'🌟',title:'90-Day Streak',      desc:'90 days in a row',                               check:c=>c.streak>=90},
  {id:'str180',  icon:'🏆',title:'180-Day Streak',     desc:'Half a year of daily restoration',               check:c=>c.streak>=180},
  {id:'str365',  icon:'💎',title:'Year Streak',        desc:'365 consecutive days — legendary',               check:c=>c.streak>=365},

  // ── Daily goal milestones
  {id:'goal5',   icon:'🎯',title:'Goal Getter',        desc:'Hit your daily goal 5 times',                    check:c=>c.goalDays>=5},
  {id:'goal30',  icon:'🏹',title:'Goal Month',         desc:'Hit your daily goal 30 times',                   check:c=>c.goalDays>=30},
  {id:'goal100', icon:'🥇',title:'100 Goal Days',      desc:'Hit your daily goal 100 times',                  check:c=>c.goalDays>=100},
  {id:'goal365', icon:'🔮',title:'365 Goal Days',      desc:'Hit your daily goal 365 times',                  check:c=>c.goalDays>=365},

  // ── Method exploration
  {id:'meth3',   icon:'🧪',title:'Method Explorer',   desc:'Try 3 different restoration methods',            check:c=>(c.methods||[]).length>=3},
  {id:'meth5',   icon:'🗺️',title:'Method Master',     desc:'Try 5 different restoration methods',            check:c=>(c.methods||[]).length>=5},

  // ── Photo milestones
  {id:'photo5',  icon:'🖼️',title:'Photo Journal',     desc:'Add 5 progress photos',                          check:(_,p)=>p&&p.length>=5},
  {id:'photo10', icon:'📷',title:'Dedicated Documenter',desc:'Add 10 progress photos',                       check:(_,p)=>p&&p.length>=10},

  // ── CI progress — all 11 levels
  {id:'ci1',     icon:'🌿',title:'CI-1 Reached',       desc:'First measurable skin coverage — the journey begins', check:c=>(c.ciLevel||0)>=1},
  {id:'ci2',     icon:'🌱',title:'CI-2 Reached',       desc:'Dekeratinisation beginning — real progress',    check:c=>(c.ciLevel||0)>=2},
  {id:'ci3',     icon:'✨',title:'CI-3 Reached',       desc:'Rollover appearing — tissue is growing',         check:c=>(c.ciLevel||0)>=3},
  {id:'ci4',     icon:'🌊',title:'CI-4 Reached',       desc:'Inner foreskin restoring — significant milestone', check:c=>(c.ciLevel||0)>=4},
  {id:'ci5',     icon:'⭐',title:'CI-5 — Halfway',     desc:'Halfway home. Most restoration benefits are felt here', check:c=>(c.ciLevel||0)>=5},
  {id:'ci6',     icon:'💫',title:'CI-6 Reached',       desc:'Full glans coverage at rest — profound change',  check:c=>(c.ciLevel||0)>=6},
  {id:'ci7',     icon:'🔮',title:'CI-7 Reached',       desc:'Rollover beyond the glans — deep restoration',   check:c=>(c.ciLevel||0)>=7},
  {id:'ci8',     icon:'🌟',title:'CI-8 Reached',       desc:'Tight coverage over the glans — near complete',  check:c=>(c.ciLevel||0)>=8},
  {id:'ci9',     icon:'👑',title:'CI-9 Reached',       desc:'Natural overhang at rest — final stretch',       check:c=>(c.ciLevel||0)>=9},
  {id:'ci10',    icon:'🏆',title:'Fully Restored',     desc:'CI-10 — the journey is complete',                check:c=>(c.ciLevel||0)>=10},
];
const THEMES=[
  {id:'ivory',  name:'Ivory',  bg:'#F0EDE6',accent:'#7A5C10',text:'#1a1710',mid:'#C8A848'},
  {id:'shadow', name:'Shadow', bg:'#0D0B14',accent:'#C9A84C',text:'#E2DDD0',mid:'#3d2a00'},
  {id:'forest', name:'Forest', bg:'#0A1409',accent:'#4CAF50',text:'#D0EDD0',mid:'#2d5c10'},
  {id:'ocean',  name:'Ocean',  bg:'#050D18',accent:'#38B4D4',text:'#C8E8F5',mid:'#0a4070'},
  {id:'neon',   name:'Neon',   bg:'#07060E',accent:'#DC00FF',text:'#F0E5FF',mid:'#6600AA'},
  {id:'crimson',name:'Crimson',bg:'#120808',accent:'#D44444',text:'#F5DDDD',mid:'#7a1515'},
  {id:'slate',  name:'Slate',  bg:'#0D1117',accent:'#7B96C8',text:'#D0DCF0',mid:'#2a3a5a'},
  {id:'amber',  name:'Amber',  bg:'#100C04',accent:'#E09020',text:'#F5E8CC',mid:'#6a4410'},
  {id:'rose',   name:'Rose',   bg:'#12090E',accent:'#D46699',text:'#F5DDEA',mid:'#7a2255'},
  {id:'void',   name:'Void',   bg:'#080809',accent:'#9898C0',text:'#E8E8F0',mid:'#303048'},
];

// ── STATE ──────────────────────────────────────────────────────────────────────
let profiles=[],currentPid=null,currentTheme='ivory';
let _repYear=new Date().getFullYear(),_repMonth=new Date().getMonth();
let char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',
  dailyGoalMin:120,goalDays:0,theme:'ivory',customMethods:[],ciLevel:0,ciHistory:[],ciGoal:10,restDays:[],
  communityEnabled:false,communityDisplayName:'',communityVisible:true,communityAvatar:'🌱',
  communityBio:'',communityShareStats:true};
let logs=[],photos=[];
let tab='today';
let activeTimer=null,timerInterval=null,timerSecs=0;
let showProfileScreen=false,showSessionSheet=false,showStopSheet=false,showCISheet=false;
let logMode='timer',manualStart='',manualEnd='',manualStillActive=false;
let manualStartDate='',manualEndDate='';
let sheetCat=null,sheetMethod='',sheetNotes='';
let currentCoachCTA=null;
let expandedCIRef=new Set();
let _editStartCI=0,_editCurrentCI=0,_editGoalCI=10;
let _activeMilestoneIdx=null;

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fmtHMS=s=>{const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return h>0?`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`};
const fmtLive=s=>{if(s<86400)return fmtHMS(s);const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60);return`${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m`;};
const fmtMin=m=>{if(m<=0)return'0m';if(m<60)return m+'m';const h=Math.floor(m/60),r=m%60;return r?`${h}h ${r}m`:`${h}h`};
const fmtDur=m=>{if(m<=0)return'0m';if(m<60)return m+'m';const h=Math.floor(m/60),r=m%60;if(h<24)return r?`${h}h ${r}m`:`${h}h`;const d=Math.floor(h/24),rh=h%24;if(rh===0)return r?`${d}d ${r}m`:`${d}d`;return r?`${d}d ${rh}h ${r}m`:`${d}d ${rh}h`;};
const fmtDate=s=>{if(!s)return'';const p=s.split('-');return`${p[1]}/${p[2]}/${p[0].slice(2)}`;};
const fmtDateLong=s=>{if(!s)return'';const p=s.split('-');return`${p[1]}/${p[2]}/${p[0]}`;};
// Convert HH:MM (24h) string to 12-hour AM/PM using device locale
const time12=t=>{if(!t)return'';try{const [h,m]=t.split(':').map(Number);return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',hour12:true}).format(new Date(2000,0,1,h,m));}catch{return t;}};
// Alias used inside setReminder toast
const fmtTime12=time12;
function fmtWallStart(ms){
  if(!ms)return'';
  const d=new Date(ms);
  const dStr=localDateStr(d);
  const tStr=d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit',hour12:true});
  return dStr===today()
    ?`Started ${tStr}`
    :`Started ${tStr} · ${new Date(dStr+'T12:00:00').toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}`;
}
const htmlEsc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

// ── LUCIDE ICONS (inline SVG — consistent, theme-colored, crisp at any size) ──
const IC={
  // size defaults to 16, stroke to currentColor
  _s:(d,s=16,w=1.75)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0">${d}</svg>`,
  stop:    (s=16)=>IC._s('<rect x="4" y="4" width="16" height="16" rx="2"/>',s),
  play:    (s=16)=>IC._s('<polygon points="5 3 19 12 5 21 5 3"/>',s),
  pause:   (s=16)=>IC._s('<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',s),
  plus:    (s=16)=>IC._s('<path d="M12 5v14M5 12h14"/>',s),
  x:       (s=14)=>IC._s('<path d="M18 6 6 18M6 6l12 12"/>',s),
  trash:   (s=14)=>IC._s('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>',s),
  refresh: (s=14)=>IC._s('<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',s),
  flag:    (s=13)=>IC._s('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',s),
  edit:    (s=15)=>IC._s('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',s),
  settings:(s=15)=>IC._s('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',s),
  user:    (s=15)=>IC._s('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',s),
  today:   (s=18)=>IC._s('<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',s,1.6),
  journey: (s=18)=>IC._s('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',s,1.6),
  photos:  (s=18)=>IC._s('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',s,1.6),
  reports: (s=18)=>IC._s('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',s,1.6),
  badges:  (s=18)=>IC._s('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',s,1.6),
  community:(s=18)=>IC._s('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',s,1.6),
};
function timeAgo(ms){
  const diff=Date.now()-ms;
  if(diff<60000)return'Just now';
  if(diff<3600000){const m=Math.floor(diff/60000);return m+'m ago';}
  if(diff<86400000){const h=Math.floor(diff/3600000);return h+'h ago';}
  if(diff<604800000){const d=Math.floor(diff/86400000);return d+'d ago';}
  const wk=Math.floor(diff/604800000);return wk+'w ago';
}
function timeAgoShort(ms){
  // Compact version for tight spaces (reply timestamps etc)
  const diff=Date.now()-ms;
  if(diff<60000)return'now';
  if(diff<3600000)return Math.floor(diff/60000)+'m';
  if(diff<86400000)return Math.floor(diff/3600000)+'h';
  if(diff<604800000)return Math.floor(diff/86400000)+'d';
  return Math.floor(diff/604800000)+'w';
}
// Always returns YYYY-MM-DD in the user's LOCAL timezone — never UTC
const localDateStr=(d)=>{const x=d||new Date();return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;};
const today=()=>localDateStr();
const todayLogs=()=>logs.filter(l=>l.date===today());

// How many minutes of the currently running session fall within today only
// Uses wallStart (real wall-clock start) if available — more accurate than timerSecs
function liveTimerTodayMins(){
  if(!activeTimer||!activeTimer.startedAt)return 0;
  const midnight=new Date();midnight.setHours(0,0,0,0);
  // Prefer wallStart (actual wall-clock start); fall back to reconstructed start
  const sessionStartMs=activeTimer.wallStart
    ?activeTimer.wallStart
    :Date.now()-(timerSecs*1000);
  // Only count elapsed time from midnight (or session start if it started today)
  const countFromMs=Math.max(sessionStartMs,midnight.getTime());
  // Subtract any paused time that occurred today (elapsedOnPause only accumulates during pauses)
  const msSinceCount=Date.now()-countFromMs;
  return Math.max(0,Math.floor(msSinceCount/60000));
}

// Returns minutes of the active session that fall within a specific YYYY-MM-DD date (local timezone)
function liveTimerMinsForDate(dateStr){
  if(!activeTimer||!activeTimer.startedAt)return 0;
  const sessionStartMs=activeTimer.wallStart
    ?activeTimer.wallStart
    :Date.now()-(timerSecs*1000);
  const p=dateStr.split('-');
  const dateStart=new Date(+p[0],+p[1]-1,+p[2],0,0,0,0).getTime();
  const dateEnd  =new Date(+p[0],+p[1]-1,+p[2],23,59,59,999).getTime();
  const overlapStart=Math.max(sessionStartMs,dateStart);
  const overlapEnd  =Math.min(Date.now(),dateEnd);
  if(overlapEnd<=overlapStart)return 0;
  return Math.max(0,Math.floor((overlapEnd-overlapStart)/60000));
}
const todayMin=()=>todayLogs().reduce((a,l)=>a+l.dur,0)+liveTimerTodayMins();
// Goal-qualifying minutes — filters retaining if user has opted out
const todayGoalMin=()=>{
  const excl=char.countRetainingInGoal===false;
  const logMins=todayLogs().filter(l=>!excl||l.cat!=='retaining').reduce((a,l)=>a+l.dur,0);
  const liveIsRetaining=!!(activeTimer&&activeTimer.cat==='retaining');
  const liveMins=(!excl||!liveIsRetaining)?liveTimerTodayMins():0;
  return logMins+liveMins;
};
// Returns Mon-Sun of the current calendar week (never a rolling 7-day window)
const thisWeekDays=()=>{
  const d=[];const now=new Date();const dow=now.getDay();
  const mondayOffset=dow===0?-6:1-dow; // days back to Monday
  for(let i=0;i<7;i++){const x=new Date(now);x.setDate(now.getDate()+mondayOffset+i);d.push(localDateStr(x));}
  return d;
};
const dayLbl=d=>['Su','Mo','Tu','We','Th','Fr','Sa'][new Date(d+'T12:00:00').getDay()];
const catFor=id=>CATS.find(c=>c.id===id)||{icon:'?',color:'#888',label:'',methods:[]};

// ── STORAGE ────────────────────────────────────────────────────────────────────
const S={
  get(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  set(k,v){
    try{localStorage.setItem(k,JSON.stringify(v));return true;}
    catch(e){
      if(e&&(e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED'||e.code===22||e.code===1014)){
        showStorageWarning();
      }
      return false;
    }
  },
  del(k){try{localStorage.removeItem(k);}catch{}},
  usage(){try{let b=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);b+=k.length+(localStorage.getItem(k)||'').length;}return Math.round(b/1024);}catch{return 0;}}
};
// ── INDEXEDDB PROFILE DATA STORE ──────────────────────────────────────────────
// Stores char, logs, profiles, and timer in IndexedDB.
// IndexedDB has no practical size cap and survives iOS storage pressure.
// Dual-write strategy: localStorage remains as sync safety net; IDB is primary read source.
const ProfileDB=(()=>{
  const DB='rst_profile_data',STORE='data',VER=1;
  let _db=null;
  function open(){
    if(_db)return Promise.resolve(_db);
    return new Promise((res,rej)=>{
      const req=indexedDB.open(DB,VER);
      req.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE))
          db.createObjectStore(STORE,{keyPath:'k'});
      };
      req.onsuccess=e=>{_db=e.target.result;res(_db);};
      req.onerror=e=>rej(e.target.error);
    });
  }
  return{
    async get(key){
      try{
        const db=await open();
        return new Promise((res,rej)=>{
          const tx=db.transaction(STORE,'readonly');
          const req=tx.objectStore(STORE).get(key);
          req.onsuccess=e=>res(e.target.result?.v??null);
          req.onerror=e=>rej(e.target.error);
        });
      }catch{return null;}
    },
    async set(key,value){
      try{
        const db=await open();
        return new Promise((res,rej)=>{
          const tx=db.transaction(STORE,'readwrite');
          tx.objectStore(STORE).put({k:key,v:value});
          tx.oncomplete=()=>res(true);
          tx.onerror=e=>rej(e.target.error);
        });
      }catch{return false;}
    },
    async del(key){
      try{
        const db=await open();
        return new Promise((res,rej)=>{
          const tx=db.transaction(STORE,'readwrite');
          tx.objectStore(STORE).delete(key);
          tx.oncomplete=()=>res(true);
          tx.onerror=e=>rej(e.target.error);
        });
      }catch{return false;}
    }
  };
})();
// ── INDEXEDDB PHOTO STORE ──────────────────────────────────────────────────────
// Photos are stored in IndexedDB (no 5 MB cap) instead of localStorage.
// One record per profile pid: { pid, photos: [...] }
const PhotoDB=(()=>{
  const DB='rst_photos',STORE='photos',VER=1;
  let _db=null;
  function open(){
    if(_db)return Promise.resolve(_db);
    return new Promise((res,rej)=>{
      const req=indexedDB.open(DB,VER);
      req.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE))
          db.createObjectStore(STORE,{keyPath:'pid'});
      };
      req.onsuccess=e=>{_db=e.target.result;res(_db);};
      req.onerror=e=>rej(e.target.error);
    });
  }
  return{
    async save(pid,arr){
      const db=await open();
      return new Promise((res,rej)=>{
        const tx=db.transaction(STORE,'readwrite');
        tx.objectStore(STORE).put({pid,photos:arr||[]});
        tx.oncomplete=()=>res(true);
        tx.onerror=e=>rej(e.target.error);
      });
    },
    async load(pid){
      const db=await open();
      return new Promise((res,rej)=>{
        const tx=db.transaction(STORE,'readonly');
        const req=tx.objectStore(STORE).get(pid);
        req.onsuccess=e=>res(e.target.result?.photos||[]);
        req.onerror=e=>rej(e.target.error);
      });
    },
    async del(pid){
      const db=await open();
      return new Promise((res,rej)=>{
        const tx=db.transaction(STORE,'readwrite');
        tx.objectStore(STORE).delete(pid);
        tx.oncomplete=()=>res(true);
        tx.onerror=e=>rej(e.target.error);
      });
    }
  };
})();
// ── PHOTO COMPRESSION ─────────────────────────────────────────────────────────
// Compresses a dataURL to JPEG at target max dimension and quality.
// Returns a Promise<string> (compressed dataURL).
async function compressPhoto(dataUrl, maxDim = 1200, quality = 0.72) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width >= height) { height = Math.round(height * maxDim / width); width = maxDim; }
        else { width = Math.round(width * maxDim / height); height = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl); // fallback: return original if decode fails
    img.src = dataUrl;
  });
}

// Estimates base64 dataURL size in KB
function dataUrlSizeKB(dataUrl) {
  return Math.round((dataUrl.length * 3) / 4 / 1024);
}
// ── COMPRESS EXISTING UNCOMPRESSED PHOTOS (one-time, runs on load) ─────────────
async function compressExistingPhotos(pid) {
  try {
    const arr = await PhotoDB.load(pid);
    if (!arr.length) return;
    let changed = false;
    const updated = await Promise.all(arr.map(async p => {
      if (!p.url || !p.url.startsWith('data:')) return p;
      const sizeKB = dataUrlSizeKB(p.url);
      if (sizeKB <= 150) return p; // already small enough
      let compressed = await compressPhoto(p.url, 1200, 0.72);
      if(dataUrlSizeKB(compressed)>150)compressed=await compressPhoto(p.url,900,0.60);
      if(dataUrlSizeKB(compressed)>150)compressed=await compressPhoto(p.url,700,0.50);
      changed = true;
      return { ...p, url: compressed };
    }));
    if (changed) await PhotoDB.save(pid, updated);
  } catch(e) { console.warn('[RT] compressExistingPhotos error', e); }
}
// ── MIGRATE PHOTOS: localStorage → IndexedDB (runs once on startup) ───────────
// ── MIGRATE PROFILE DATA: localStorage → IndexedDB (runs once on startup) ─────
async function migrateProfileDataToIDB(){
  // Collect all localStorage keys that belong to this app's profile data
  const keys=['rst-profiles'];
  try{
    const pids=(S.get('rst-profiles')||[]).map(p=>p.id);
    pids.forEach(pid=>{
      keys.push(`rst-${pid}-char`,`rst-${pid}-logs`,`rst-${pid}-timer`);
    });
  }catch{}
  for(const key of keys){
    try{
      const already=await ProfileDB.get(key);
      if(already!==null)continue; // already migrated — skip
      const val=S.get(key);
      if(val!==null)await ProfileDB.set(key,val);
    }catch(e){console.warn('[RT] migrateProfileDataToIDB error',key,e);}
  }
}
async function migratePhotosToIDB(){
  const toMigrate=[];
  try{
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&k.match(/^rst-.+-photos$/))toMigrate.push(k);
    }
  }catch{return;}
  for(const key of toMigrate){
    try{
      const raw=localStorage.getItem(key);
      if(!raw){localStorage.removeItem(key);continue;}
      const arr=JSON.parse(raw);
      if(!Array.isArray(arr)||!arr.length){localStorage.removeItem(key);continue;}
      const pid=key.replace(/^rst-/,'').replace(/-photos$/,'');
      const existing=await PhotoDB.load(pid);
      if(!existing.length)await PhotoDB.save(pid,arr); // only write if IDB is empty
      localStorage.removeItem(key); // always clean up localStorage
    }catch(e){console.warn('[RT] Photo migration error',key,e);}
  }
}

// ── STORAGE WARNING ────────────────────────────────────────────────────────────let _storageWarnShown=false;
function showStorageWarning(){
  if(_storageWarnShown)return;_storageWarnShown=true;
  const usedKB=S.usage();
  const el=document.createElement('div');
  el.id='storage-warn-banner';
  el.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#5c0f0f;border:1px solid #c0392b;color:#fff;padding:12px 16px;border-radius:10px;font-size:13px;z-index:9999;max-width:340px;width:90%;text-align:center;line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.5)';
  el.innerHTML=`⚠️ <strong>Storage almost full</strong> (${usedKB} KB used)<br><span style="font-size:11px;opacity:.85">New data may not be saved. Back up your data now.</span><br><div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button onclick="document.getElementById('storage-warn-banner')?.remove();showProfileSheet=true;render();" style="background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px;font-weight:600">Backup Now →</button><button onclick="document.getElementById('storage-warn-banner')?.remove()" style="background:transparent;border:1px solid rgba(255,255,255,.3);color:rgba(255,255,255,.7);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:DM Sans,sans-serif;font-size:12px">Dismiss</button></div>`;
  document.body.appendChild(el);
}
async function loadAll(){
  await migrateProfileDataToIDB(); // one-time: moves char/logs/profiles/timer to IDB
  await migratePhotosToIDB();      // one-time: moves photos to IDB (existing)
  if(currentPid)await compressExistingPhotos(currentPid);
  // Read from IDB first, fall back to localStorage
  profiles=(await ProfileDB.get('rst-profiles'))??S.get('rst-profiles')??[];
  currentPid=S.get('rst-active-pid'); // tiny key — localStorage is fine here

  // Single profile system — take the first (and only) profile if it exists
  if(!currentPid&&profiles.length>0){currentPid=profiles[0].id;S.set('rst-active-pid',currentPid);}
  if(currentPid&&profiles.find(p=>p.id===currentPid)){
    showProfileScreen=false;await loadProfile(currentPid);
  } else {
    showProfileScreen=true;
  }
}
async function loadProfile(pid){
  const defaults={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',dailyGoalMin:120,goalDays:0,theme:'shadow',customMethods:[],ciLevel:0,ciHistory:[]};
  char={...defaults};logs=[];photos=[];
  const c=(await ProfileDB.get(`rst-${pid}-char`))??S.get(`rst-${pid}-char`);
  if(c)char={...char,...c};
  if(!char.customMethods)char.customMethods=[];
  if(char.ciLevel===undefined)char.ciLevel=0;
  if(!char.ciHistory)char.ciHistory=[];
  if(!char.startDate)char.startDate=char.ciHistory&&char.ciHistory.length?char.ciHistory[0].date:today();
  if(!char.restDays)char.restDays=[];
  if(char.ciGoal===undefined)char.ciGoal=10;
if(char.countRetainingInGoal===undefined)char.countRetainingInGoal=true;
if(char.startCI===undefined)char.startCI=0;
  if(char.communityEnabled===undefined)char.communityEnabled=false;
  if(char.communityVisible===undefined)char.communityVisible=true;
  // communityDisplayName is always derived from char.name — kept in sync automatically
  char.communityDisplayName=char.name;
  if(!char.communityAvatar)char.communityAvatar='🌱';
  if(char.communityBio===undefined)char.communityBio='';
  if(char.communityShareStats===undefined)char.communityShareStats=true;
  if(!char.dayNotes)char.dayNotes={};
  const l=(await ProfileDB.get(`rst-${pid}-logs`))??S.get(`rst-${pid}-logs`);
  if(l)logs=l;
  photos=await PhotoDB.load(pid);
  currentTheme=char.theme||'shadow';applyTheme(currentTheme);
  const t=(await ProfileDB.get(`rst-${pid}-timer`))??S.get(`rst-${pid}-timer`);
  if(t){
    activeTimer=t;sheetMethod=t.method||'';sheetCat=t.cat||null;sheetNotes=t.notes||'';
    if(t.startedAt){timerSecs=Math.floor((Date.now()-t.startedAt)/1000)+(t.elapsedOnPause||0);startInterval();}
    else{timerSecs=t.elapsedOnPause||0;} // stopped mid-save — restore frozen time, no interval
  }
  // Silently backfill any badges earned but not yet recorded
  // (handles CI jumps, bulk past sessions, new badges added in updates)
  recalcAchievements();
}
function saveChar(){
  if(!currentPid)return;
  S.set(`rst-${currentPid}-char`,char); // sync localStorage — immediate safety net
  ProfileDB.set(`rst-${currentPid}-char`,char).catch(e=>console.warn('[RT] IDB saveChar',e));
}
function saveLogs(){
  if(!currentPid)return;
  S.set(`rst-${currentPid}-logs`,logs);
  ProfileDB.set(`rst-${currentPid}-logs`,logs).catch(e=>console.warn('[RT] IDB saveLogs',e));
}
function savePhotos(){
  if(!currentPid)return Promise.resolve(false);
  return PhotoDB.save(currentPid,photos).catch(e=>{console.warn('[RT] savePhotos error',e);return false;});
}
function saveTimer(t){
  if(!currentPid)return;
  if(t){
    S.set(`rst-${currentPid}-timer`,t);
    ProfileDB.set(`rst-${currentPid}-timer`,t).catch(e=>console.warn('[RT] IDB saveTimer',e));
  }else{
    S.del(`rst-${currentPid}-timer`);
    ProfileDB.del(`rst-${currentPid}-timer`).catch(()=>{});
  }
}
function saveProfiles(){
  S.set('rst-profiles',profiles);
  ProfileDB.set('rst-profiles',profiles).catch(e=>console.warn('[RT] IDB saveProfiles',e));
}

// ── THEME ──────────────────────────────────────────────────────────────────────
function applyTheme(id){document.documentElement.setAttribute('data-theme',id||'shadow');}
function selectTheme(id){currentTheme=id;applyTheme(id);char.theme=id;if(currentPid)saveChar();document.querySelectorAll('.theme-chip').forEach(el=>el.classList.toggle('sel',el.dataset.tid===id));}

// ── PROFILE OPS ────────────────────────────────────────────────────────────────
function createProfile(name){
  // Only ever one profile — this is called once on first launch
  const id='p'+Date.now();
  profiles=[{id,name,createdAt:today()}];
  saveProfiles();currentPid=id;
  char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name,dailyGoalMin:120,goalDays:0,theme:currentTheme,customMethods:[],ciLevel:0,ciHistory:[],startCI:0,ciGoal:10,restDays:[],startDate:today()};
  logs=[];photos=[];S.set('rst-active-pid',id);saveChar();showProfileScreen=false;tab='today';render();
}

function showRenameInline(){
  const el=document.getElementById('rename-inline');
  if(!el)return;
  el.style.display='block';
  const inp=document.getElementById('rename-val');
  if(inp){inp.focus();inp.select();}
  inp.onkeydown=e=>{if(e.key==='Enter')saveRenameInline();};
}
function saveRenameInline(){
  const inp=document.getElementById('rename-val');
  const n=inp?.value.trim();if(!n)return;
  const prev=char.name;
  if(n===prev){renderProfileScreen();return;}
  // If in community, check the new name isn't taken
  if(char.communityEnabled&&fbIsGoogle){
    checkNameAvailable(n).then(available=>{
      if(!available){
        showToast('⚠ That name is already used in the community — choose another');
        return;
      }
      // Commit
      if(currentPid)profiles=profiles.map(p=>p.id===currentPid?{...p,name:n}:p);
      saveProfiles();
      char.name=n;char.communityDisplayName=n;saveChar();
      syncPresence();
      showToast('✓ Name updated');
      renderProfileScreen();
    });
  } else {
    if(currentPid)profiles=profiles.map(p=>p.id===currentPid?{...p,name:n}:p);
    saveProfiles();
    char.name=n;char.communityDisplayName=n;saveChar();
    renderProfileScreen();
  }
}
function confirmDeleteProfile(){
  // Step 1 — first warning
  confirmDialog(
    '⚠ Delete everything?',
    'This will permanently erase all your sessions, photos, milestones, and progress data. Your community presence and posts will also be removed.\n\nThis cannot be undone.',
    'Yes, continue',
    ()=>{
      // Step 2 — second confirmation, more serious
      confirmDialog(
        'Are you absolutely sure?',
        'There is no recovery. Every session, photo, and milestone you have logged will be gone forever.',
        'Delete my profile',
        ()=>deleteProfile()
      );
    }
  );
}
function deleteProfile(){
  if(!currentPid)return;
  // Delete community doc entirely — frees the name for future use with same Google account
  if(db&&fbUID&&fbIsGoogle){
    db.collection('community_users').doc(fbUID).delete().catch(()=>{});
  }
  leaveComm();
  // Wipe all local data
  S.del(`rst-${currentPid}-char`);
  S.del(`rst-${currentPid}-logs`);
  S.del(`rst-${currentPid}-photos`); // legacy
  S.del(`rst-${currentPid}-timer`);
  PhotoDB.del(currentPid).catch(()=>{});
  // Also clean up ProfileDB entries
  ProfileDB.del(`rst-${currentPid}-char`).catch(()=>{});
  ProfileDB.del(`rst-${currentPid}-logs`).catch(()=>{});
  ProfileDB.del(`rst-${currentPid}-timer`).catch(()=>{});
  ProfileDB.del('rst-profiles').catch(()=>{});
  S.del('rst-profiles');
  S.del('rst-active-pid');
  S.del('rst-reactions');
  localStorage.removeItem('rst-comm-pending');
  // Reset all state
  profiles=[];currentPid=null;
  char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',dailyGoalMin:120,goalDays:0,theme:'ivory',customMethods:[],ciLevel:0,ciHistory:[],restDays:[],communityEnabled:false,communityDisplayName:'',communityVisible:true,communityAvatar:'🌱',communityBio:'',communityShareStats:true,dayNotes:{}};
  logs=[];photos=[];activeTimer=null;timerSecs=0;
  stopInterval();
  showProfileScreen=true;
  render();
}
let liveTickCount=0;
function startInterval(){
  stopInterval();liveTickCount=0;
  // Heartbeat: sync presence to Firestore every 5 minutes while a session is running
  if(!window._presenceHeartbeat){
    window._presenceHeartbeat=setInterval(()=>{
      if(activeTimer&&activeTimer.startedAt)syncPresence();
    },5*60*1000);
  }
  timerInterval=setInterval(()=>{
    if(!activeTimer)return;
    timerSecs=Math.floor((Date.now()-activeTimer.startedAt)/1000)+(activeTimer.elapsedOnPause||0);
    const el=document.getElementById('mc-run-time');if(el)el.textContent=fmtLive(timerSecs);
    const el2=document.getElementById('mc-run-time-2');if(el2)el2.textContent=fmtLive(timerSecs);
    const el3=document.getElementById('mc-run-time-3');if(el3)el3.textContent=fmtLive(timerSecs);
    const si=document.getElementById('sheet-timer');if(si)si.textContent=fmtLive(timerSecs);
    // Every 60 seconds — refresh live stats elements without full re-render
    liveTickCount++;
    if(liveTickCount%60===0){
      refreshLiveStats();
    }
  },1000);
}
function refreshLiveStats(){
  // Update goal bar and today stats inline if on Today tab
  const tMin=todayMin();           // all minutes — for stat tile display
  const tGoalMin=todayGoalMin();   // goal-qualifying minutes — for bar & "to go"
  const goal=char.dailyGoalMin||120;
  const goalPct=Math.min(100,Math.round((tGoalMin/goal)*100));
  // Goal bar fill
  const fill=document.querySelector('.goal-fill');
  if(fill){
    fill.style.width=goalPct+'%';
    fill.className='goal-fill '+(goalPct>=100?'goal-fill-ok':'goal-fill-warn');
  }
  // Goal text
  const goalTexts=document.querySelectorAll('[data-live="goal-text"]');
  goalTexts.forEach(el=>{el.textContent=goalPct>=100?'🎯 Goal reached!':fmtMin(Math.max(0,goal-tGoalMin))+' to go';});
  const goalDone=document.querySelector('[data-live="goal-done"]');
  if(goalDone)goalDone.textContent=fmtMin(tGoalMin)+' done';
  // Today stat tile
  const todayStat=document.querySelector('[data-live="today-min"]');
  if(todayStat)todayStat.textContent=fmtMin(tGoalMin);
}
function stopInterval(){
  clearInterval(timerInterval);timerInterval=null;
  // Only kill the heartbeat if there's no active session
  if(!activeTimer||!activeTimer.startedAt){
    clearInterval(window._presenceHeartbeat);
    window._presenceHeartbeat=null;
  }
}
function beginSession(){
  if(!sheetMethod||!sheetCat)return;
  // Guard: if a session is already running or paused, don't silently overwrite it
  if(activeTimer&&(activeTimer.startedAt||activeTimer.elapsedOnPause>0)){
    showToast('⚠ A session is already in progress');
    showSessionSheet=false;render();return;
  }
  activeTimer={startedAt:Date.now(),wallStart:Date.now(),method:sheetMethod,cat:sheetCat,notes:sheetNotes,elapsedOnPause:0};
  timerSecs=0;saveTimer(activeTimer);startInterval();showSessionSheet=false;
  if(navigator.vibrate)navigator.vibrate(60);
  syncPresence();
  render();
}
function stopSession(){
  if(!activeTimer)return;stopInterval();
  const elapsed=activeTimer.startedAt
    ?Math.floor((Date.now()-activeTimer.startedAt)/1000)+(activeTimer.elapsedOnPause||0)
    :(activeTimer.elapsedOnPause||timerSecs);
  timerSecs=elapsed;activeTimer={...activeTimer,startedAt:null,elapsedOnPause:elapsed};
  saveTimer(activeTimer);
  if(navigator.vibrate)navigator.vibrate([40,30,40]);
  // Warn if under 2 minutes — likely accidental
  if(timerSecs<120){
    shortSessionDialog(
      timerSecs,
      ()=>{if(activeTimer)activeTimer={...activeTimer,_forceSave:true};showStopSheet=true;render();}, // save anyway
      ()=>{                                 // discard
        stopInterval();activeTimer=null;timerSecs=0;
        sheetMethod='';sheetCat=null;sheetNotes='';
        saveTimer(null);syncPresence();render();
        showToast('Session discarded');
      },
      ()=>{resumeSession();}               // resume
    );
    return;
  }
  showStopSheet=true;render();
}
function resumeSession(){
  if(!activeTimer)return;
  activeTimer={...activeTimer,startedAt:Date.now(),elapsedOnPause:timerSecs};
  saveTimer(activeTimer);startInterval();showStopSheet=false;render();
}
function commitSession(notes){
  const method=activeTimer?activeTimer.method:sheetMethod;
  const catId=activeTimer?activeTimer.cat:sheetCat;
  const n=notes||sheetNotes||'';
  // If we have a real start timestamp, split across days accurately
  // wallStart survives stopSession() which nulls startedAt
  if(activeTimer&&activeTimer.wallStart&&!activeTimer._forceSave){
    awardMultiDay(method,catId,activeTimer.wallStart,Date.now(),n);
  } else {
    const finalMins=Math.max(1,Math.round(timerSecs/60));
    awardSession(method,catId,finalMins,n);
  }
  stopInterval();activeTimer=null;timerSecs=0;sheetMethod='';sheetCat=null;sheetNotes='';
  saveTimer(null);showStopSheet=false;
  syncPresence();
  render();
}
function logManual(method,catId,totalMins,notes,dateStr,startMs,endMs){
  if(totalMins<=0)return;
  // Duplicate detection: warn if same method already logged on same date
  const checkDate=dateStr||today();
  const isMultiDay=startMs&&endMs&&(endMs-startMs>86400000);
  if(!isMultiDay){
    const dup=logs.find(l=>l.date===checkDate&&l.method===method);
    if(dup){
      confirmDialog(
        'Duplicate session?',
        `You already have a ${method} session on ${checkDate} (${fmtMin(dup.dur)}). Add another anyway?`,
        'Add Anyway',
        ()=>{awardSession(method,catId,totalMins,notes||'',checkDate);showSessionSheet=false;render();}
      );
      return;
    }
  }
  if(isMultiDay){
    awardMultiDay(method,catId,startMs,endMs,notes||'');
  } else {
    awardSession(method,catId,totalMins,notes||'',checkDate);
  }
  showSessionSheet=false;render();
}
function awardMultiDay(method,catId,startMs,endMs,notes){
  // Split a long session into per-day chunks and award each day separately
  // startMs/endMs are Unix milliseconds
  const chunks=[];
  let cursor=startMs;
  while(cursor<endMs){
    // Find midnight at end of cursor's day
    const d=new Date(cursor);
    const midnight=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();
    const chunkEnd=Math.min(midnight,endMs);
    const mins=Math.round((chunkEnd-cursor)/60000);
    const dateStr=localDateStr(new Date(cursor));
    if(mins>0)chunks.push({dateStr,mins});
    cursor=chunkEnd;
  }
  if(!chunks.length)return;
  const totalMins=chunks.reduce((a,c)=>a+c.mins,0);
  // Award each day chunk — only the last one triggers toasts/badges/streak update
  // to avoid spamming. We batch-add all log entries then do one full recalc.
  const newLogs=[];
  chunks.forEach((chunk,i)=>{
    newLogs.push({id:Date.now()+i,date:chunk.dateStr,method,cat:catId,dur:chunk.mins,notes:i===0?notes:''});
  });
  // Update char stats as one combined award
  const lastDay=chunks[chunks.length-1].dateStr;
  let ns=char.streak;
  if(char.lastDate){
    const diff=Math.round((new Date(lastDay)-new Date(char.lastDate))/86400000);
    if(diff===1)ns++;
    else if(diff>1){
      let broken=false;
      // Every day in the gap that isn't a rest day and isn't covered by our new chunks breaks the streak
      const newDates=new Set(chunks.map(c=>c.dateStr));
      for(let i=1;i<diff;i++){
        const gd=new Date(char.lastDate+'T12:00:00');
        gd.setDate(gd.getDate()+i);
        const gs=localDateStr(gd);
        if(!(char.restDays||[]).includes(gs)&&!newDates.has(gs)){broken=true;break;}
      }
      ns=broken?chunks.length:ns+chunks.length;
    }
  } else ns=chunks.length;
  const nm=char.methods.includes(method)?char.methods:[...char.methods,method];
  let ngd=char.goalDays;
  // Count goal days hit across the new chunks
  const byDay={};
  const multiSessionCountsForGoal=char.countRetainingInGoal!==false||catId!=='retaining';
  if(multiSessionCountsForGoal){
    newLogs.forEach(l=>{byDay[l.date]=(byDay[l.date]||0)+l.dur;});
    Object.entries(byDay).forEach(([d,m])=>{
      const existing=logs.filter(l=>l.date===d&&(char.countRetainingInGoal!==false||l.cat!=='retaining')).reduce((a,l)=>a+l.dur,0);
      if(existing<char.dailyGoalMin&&existing+m>=char.dailyGoalMin)ngd++;
    });
  }
  char={...char,sessions:char.sessions+chunks.length,minutes:char.minutes+totalMins,streak:ns,lastDate:lastDay,methods:nm,goalDays:ngd,lastMethod:method,lastCat:catId};
  const newly=[];
  for(const a of ACHS)if(!char.achievements.includes(a.id)&&a.check(char,photos)){char.achievements=[...char.achievements,a.id];newly.push({title:a.title,icon:a.icon});}
  logs=[...newLogs.reverse(),...logs];
  saveChar();saveLogs();
  const days=chunks.length;
  showSessFlash(`✓ ${fmtDur(totalMins)}`);
  if(newly.length)showToast(`🏅 ${newly[0].title} — milestone reached!`);
  else showToast(`${fmtDur(totalMins)} logged across ${days} day${days!==1?'s':''} 🔥`);
}

function awardSession(method,catId,totalMins,notes,dateOverride){
  const td=dateOverride||today();
  let ns=char.streak;
  if(char.lastDate){
    const diff=Math.round((new Date(td)-new Date(char.lastDate))/86400000);
    if(diff===1)ns++;
    else if(diff>1){
      // Check if gap days were all rest days — if so, streak survives
      let gapBroken=false;
      for(let i=1;i<diff;i++){
        const gapDate=new Date(char.lastDate+'T12:00:00');
        gapDate.setDate(gapDate.getDate()+i);
        const gapStr=localDateStr(gapDate);
        if(!(char.restDays||[]).includes(gapStr)){gapBroken=true;break;}
      }
      ns=gapBroken?1:ns+1;
    }
  }else ns=1;
  const prevTodayMin=todayGoalMin();
  const nm=char.methods.includes(method)?char.methods:[...char.methods,method];
  let ngd=char.goalDays;
  const sessionCountsForGoal=char.countRetainingInGoal!==false||catId!=='retaining';
  if(sessionCountsForGoal&&prevTodayMin<char.dailyGoalMin&&(prevTodayMin+totalMins)>=char.dailyGoalMin)ngd++;
  char={...char,sessions:char.sessions+1,minutes:char.minutes+totalMins,streak:ns,lastDate:td,methods:nm,goalDays:ngd,lastMethod:method,lastCat:catId};
  const newly=[];
  for(const a of ACHS)if(!char.achievements.includes(a.id)&&a.check(char,photos)){char.achievements=[...char.achievements,a.id];newly.push({title:a.title,icon:a.icon});}
  logs=[{id:Date.now(),date:td,method,cat:catId,dur:totalMins,notes},...logs];
  saveChar();saveLogs();
  showSessFlash(`✓ ${fmtMin(totalMins)}`);
  if(newly.length){
    showToast(`🏅 ${newly[0].title} unlocked!`);
  }
  else if(ns>=365)showToast(`🔥 ${ns}-day streak. You are extraordinary.`);
  else if(ns>=100)showToast(`💎 ${ns}-day streak. ${fmtMin(totalMins)} added.`);
  else if(ns>=30)showToast(`🔥 ${ns} days straight. ${fmtMin(totalMins)}. Remarkable.`);
  else if(ns>1)showToast(`${fmtMin(totalMins)} · ${ns}-day streak 🔥`);
  else showToast(getSessionQuip(totalMins));
}

// ── ACHIEVEMENT RECALC ────────────────────────────────────────────────────────
// Runs on every load — silently awards any badges the user qualifies for
// but doesn't have yet. Handles: CI jumps, bulk past sessions, new badges
// added in app updates, any scenario where incremental checks were missed.
// ── SESSION EDITING ────────────────────────────────────────────────────────────
// After any edit we fully rebuild char.sessions, char.minutes, char.streak,
// char.goalDays, and char.lastDate from the logs array so nothing drifts.
function calcStreakFromLogs(){
  if(!logs.length)return{streak:0,lastDate:null};
  // Collect unique session dates, sort ascending
  const dates=[...new Set(logs.map(l=>l.date))].sort();
  let streak=1,best=1;
  for(let i=1;i<dates.length;i++){
    const prev=new Date(dates[i-1]+'T12:00:00');
    const curr=new Date(dates[i]+'T12:00:00');
    const diff=Math.round((curr-prev)/86400000);
    const gapBroken=diff>1&&![...Array(diff-1)].every((_,k)=>{
      const gd=new Date(dates[i-1]+'T12:00:00');gd.setDate(gd.getDate()+k+1);
      return(char.restDays||[]).includes(localDateStr(gd));
    });
    streak=diff===1||!gapBroken?streak+1:1;
    if(streak>best)best=streak;
  }
  return{streak,lastDate:dates[dates.length-1]};
}
function rebuildCharFromLogs(){
  // Recalculate derived counters from the ground-truth logs array
  char.sessions=logs.length;
  char.minutes=logs.reduce((a,l)=>a+l.dur,0);
  // Methods
  char.methods=[...new Set(logs.map(l=>l.method).filter(Boolean))];
  // Daily goal days — count distinct dates where cumulative goal-qualifying mins hit the goal
  const byDate={};
  logs.forEach(l=>{
    if(char.countRetainingInGoal!==false||l.cat!=='retaining')
      byDate[l.date]=(byDate[l.date]||0)+l.dur;
  });
  char.goalDays=Object.values(byDate).filter(m=>m>=(char.dailyGoalMin||120)).length;
  // lastMethod / lastCat from most recent log
  if(logs.length){char.lastMethod=logs[0].method;char.lastCat=logs[0].cat;}
  // Streak
  const {streak,lastDate}=calcStreakFromLogs();
  char.streak=streak;char.lastDate=lastDate;
  recalcAchievements();
  saveChar();saveLogs();
}

function openEditSessionSheet(id){
  const entry=logs.find(l=>l.id===id);
  if(!entry)return;
  const ex=document.getElementById('edit-sess-ov');if(ex)ex.remove();
  const cat=catFor(entry.cat);
  // Build method options for the current category
  const allMethods=[...(cat.methods||[]),...(char.customMethods||[])];
  const methOpts=allMethods.map(m=>`<option value="${htmlEsc(m)}" ${m===entry.method?'selected':''}>${htmlEsc(m)}</option>`).join('');
  // Duration helpers
  const durH=Math.floor(entry.dur/60),durM=entry.dur%60;
  const el=document.createElement('div');el.className='overlay';el.id='edit-sess-ov';
  el.innerHTML=`<div class="sheet">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:13px;color:var(--accent);margin-bottom:14px;text-align:center">Edit Session</div>
    <div class="sec-title">Date</div>
    <input type="date" id="es-date" class="gold-inp" value="${entry.date}" max="${today()}">
    <div class="sec-title">Duration</div>
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
      <input type="number" id="es-hours" class="gold-inp" style="flex:1;margin:0" min="0" max="23" value="${durH}" placeholder="h">
      <span style="color:var(--text4);font-size:13px">h</span>
      <input type="number" id="es-mins" class="gold-inp" style="flex:1;margin:0" min="0" max="59" value="${durM}" placeholder="m">
      <span style="color:var(--text4);font-size:13px">min</span>
    </div>
    <div class="sec-title">Method</div>
    <select id="es-method" class="gold-inp" style="margin-bottom:10px">
      ${methOpts}
      <option value="${htmlEsc(entry.method)}" ${!allMethods.includes(entry.method)?'selected':''} ${!allMethods.includes(entry.method)?'':'style="display:none"'}>${htmlEsc(entry.method)}</option>
    </select>
    <div class="sec-title">Notes</div>
    <textarea id="es-notes" style="margin-bottom:14px">${htmlEsc(entry.notes||'')}</textarea>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" id="es-cancel" style="flex:1">Cancel</button>
      <button class="btn-gold" id="es-save" style="flex:2">✓ Save Changes</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('es-cancel').onclick=()=>el.remove();
  document.getElementById('es-save').onclick=()=>{
    const newDate=document.getElementById('es-date').value||entry.date;
    const h=parseInt(document.getElementById('es-hours').value)||0;
    const m=parseInt(document.getElementById('es-mins').value)||0;
    const newDur=Math.max(1,h*60+m);
    const newMethod=document.getElementById('es-method').value||entry.method;
    const newNotes=document.getElementById('es-notes').value||'';
    // Detect method category
    const newCat=CATS.find(c=>c.methods.includes(newMethod))?.id||entry.cat;
    // Apply edit
    logs=logs.map(l=>l.id===id?{...l,date:newDate,dur:newDur,method:newMethod,cat:newCat,notes:newNotes}:l);
    // Re-sort logs newest first
    logs.sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
    rebuildCharFromLogs();
    el.remove();
    showToast('✓ Session updated');
    render();
  };
}

function recalcAchievements(){
  if(!char||!logs)return;
  let changed=false;
  for(const a of ACHS){
    if(!char.achievements.includes(a.id)&&a.check(char,photos)){
      char.achievements=[...char.achievements,a.id];
      changed=true;
    }
  }
  if(changed)saveChar();
}
function markRestDay(){
  const td=today();
  const restDays=char.restDays||[];
  if(restDays.includes(td)){
    // Toggle off
    char.restDays=restDays.filter(d=>d!==td);
    showToast('Rest day removed');
  } else {
    char.restDays=[...restDays,td];
    // Only claim streak protection if the user actually has an active streak
    const streakMsg=char.streak>0?'🛌 Rest day marked — your streak is protected':'🛌 Rest day marked';
    showToast(streakMsg);
  }
  saveChar();render();
}

// ── CI LEVEL ───────────────────────────────────────────────────────────────────
function setCILevel(n){
  _activeMilestoneIdx=null;
  const prev=char.ciLevel||0;
  if(n===prev){showCISheet=false;render();return;}
  // Badge revocation: if going DOWN, strip CI badges above new level
  if(n<prev){
    const revokedIds=ACHS
      .filter(a=>{
        if(!a.id.startsWith('ci'))return false;
        const lvl=parseInt(a.id.slice(2));
        return!isNaN(lvl)&&lvl>n&&char.achievements.includes(a.id);
      })
      .map(a=>a.id);
    if(revokedIds.length)char.achievements=char.achievements.filter(id=>!revokedIds.includes(id));
  }
  char.ciLevel=n;
  // Auto-correct startCI and ciGoal if they're now inconsistent
  if(n<(char.startCI||0))char.startCI=n;
  if(n>(char.ciGoal||10))char.ciGoal=Math.min(10,n+1);
  char.ciHistory=[...(char.ciHistory||[]),{ci:n,date:today()}];
  expandedCIRef.add(n);
  const newly=[];
  for(const a of ACHS)if(!char.achievements.includes(a.id)&&a.check(char,photos)){char.achievements=[...char.achievements,a.id];newly.push({title:a.title,icon:a.icon});}
  saveChar();
  if(n>prev)showToast(`🎉 ${LEVELS[n].ci} reached!`);
  else showToast(`◑ CI adjusted to ${LEVELS[n].ci}`);
  if(newly.length){setTimeout(()=>showToast(`🏅 ${newly[0].title} unlocked!`),1800);}
  showCISheet=false;render();
}

// ── PHOTOS ─────────────────────────────────────────────────────────────────────
async function addPhoto(ciLevel,dataUrl,note,dateStr){
  const photoDate=dateStr||today();
  // Compress before storing — target ≤150KB with progressive quality fallback
  let compressed=await compressPhoto(dataUrl,1200,0.72);
  if(dataUrlSizeKB(compressed)>150)compressed=await compressPhoto(dataUrl,900,0.60);
  if(dataUrlSizeKB(compressed)>150)compressed=await compressPhoto(dataUrl,700,0.50);
  if(dataUrlSizeKB(compressed)>150)compressed=await compressPhoto(dataUrl,600,0.42);
  const newPhoto={id:Date.now(),ci:ciLevel,date:photoDate,url:compressed,note:note||''};
  photos=[newPhoto,...photos];
  try{
    await PhotoDB.save(currentPid,photos);
    recalcAchievements();
    showToast('📸 Progress photo saved!');tab='photos';render();
  }catch(e){
    photos=photos.filter(p=>p.id!==newPhoto.id);
    showToast('⚠ Photo could not be saved');
    console.warn('[RT] addPhoto IDB error',e);
  }
}

function deletePhoto(id){
  photos=photos.filter(p=>p.id!==id);
  savePhotos();
  recalcAchievements();
  render();
}

// ── CONFIRM DIALOG ─────────────────────────────────────────────────────────────
function confirmDialog(title,msg,confirmLabel,onConfirm){
  const ex=document.getElementById('confirm-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='confirm-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-size:18px;text-align:center;margin-bottom:10px">⚠️</div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--text1);text-align:center;margin-bottom:8px">${title}</div>
    <div style="font-size:12px;color:var(--text3);text-align:center;line-height:1.6;margin-bottom:20px">${msg}</div>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" id="confirm-cancel" style="flex:1">Cancel</button>
      <button id="confirm-ok" style="flex:1;background:linear-gradient(135deg,#5c0f0f,#c0392b);border:none;border-radius:10px;padding:13px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;font-family:'DM Sans',sans-serif">${confirmLabel}</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('confirm-cancel').onclick=()=>el.remove();
  document.getElementById('confirm-ok').onclick=()=>{el.remove();onConfirm();};
  // Also close on backdrop tap
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}
function shortSessionDialog(elapsed,onSave,onDiscard,onResume){
  const ex=document.getElementById('confirm-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='confirm-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-size:28px;text-align:center;margin-bottom:10px">⏱</div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--text1);text-align:center;margin-bottom:8px">Session under 2 minutes</div>
    <div style="font-size:12px;color:var(--text3);text-align:center;line-height:1.6;margin-bottom:20px">Only ${fmtHMS(elapsed)} logged. This might have been accidental — what would you like to do?</div>
    <div style="display:flex;flex-direction:column;gap:7px">
      <button id="ssd-resume" style="background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:12px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif">${IC.play(14)} Resume Session</button>
      <button id="ssd-save" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px;color:var(--text2);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif">Save it anyway</button>
      <button id="ssd-discard" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:12px;color:#a03232;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif">Discard session</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('ssd-resume').onclick=()=>{el.remove();onResume();};
  document.getElementById('ssd-save').onclick=()=>{el.remove();onSave();};
  document.getElementById('ssd-discard').onclick=()=>{el.remove();onDiscard();};
}
function openPhotoViewer(photo,eraPhotos){
  // eraPhotos = array of photos in this era for swipe navigation
  // if not provided, just show the single photo
  const era=eraPhotos||[photo];
  let idx=era.findIndex(p=>p.id===photo.id);
  if(idx===-1)idx=0;

  function buildContent(p,i){
    const hasPrev=i<era.length-1;
    const hasNext=i>0;
    const isEditing=false;
    return`
      <div style="position:relative;width:100%">
        <img src="${p.url}" alt="Progress photo" style="max-width:100%;max-height:50vh;border-radius:10px;object-fit:contain;display:block;margin:0 auto">
        ${era.length>1?`
          <div style="position:absolute;top:50%;left:-8px;transform:translateY(-50%)">
            <button onclick="viewerNav(-1)" style="background:rgba(0,0,0,.5);border:none;border-radius:50%;width:32px;height:32px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;${!hasPrev?'opacity:.2;pointer-events:none':''}">‹</button>
          </div>
          <div style="position:absolute;top:50%;right:-8px;transform:translateY(-50%)">
            <button onclick="viewerNav(1)" style="background:rgba(0,0,0,.5);border:none;border-radius:50%;width:32px;height:32px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;${!hasNext?'opacity:.2;pointer-events:none':''}">›</button>
          </div>`:''}
      </div>
      ${era.length>1?`<div style="text-align:center;margin-top:8px;font-size:10px;color:var(--text5)">${era.length-i} of ${era.length}</div>`:''}
      <div id="viewer-meta" style="margin-top:10px;text-align:center;width:100%">
        <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent)">${p.ci}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">${fmtDate(p.date)}</div>
        ${p.note?`<div style="font-size:12px;color:var(--text2);margin-top:6px;font-style:italic">${p.note}</div>`:'<div style="font-size:11px;color:var(--text5);margin-top:6px">No caption</div>'}
      </div>
      <div id="viewer-edit-area"></div>
      <div style="display:flex;gap:8px;margin-top:14px;width:100%">
        <button class="btn-ghost" onclick="document.getElementById('photo-view').remove()" style="flex:1">Close</button>
        <button class="btn-outline" onclick="openViewerEdit(${p.id})" style="flex:0 0 60px;font-size:12px">✏ Edit</button>
        <button class="del-btn" onclick="document.getElementById('photo-view').remove();confirmDialog('Delete this photo?','This will permanently remove it from your timeline.','Delete',()=>deletePhoto(${p.id}))" style="padding:10px 14px;font-size:12px">Delete</button>
      </div>`;
  }

  const el=document.createElement('div');el.className='photo-viewer';el.id='photo-view';
  el.innerHTML=buildContent(era[idx],idx);
  document.getElementById('root').appendChild(el);

  // Swipe touch handling
  let touchStartX=0;
  el.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;},{passive:true});
  el.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(dx)>50){dx<0?viewerNav(1):viewerNav(-1);}
  },{passive:true});

  // Nav function scoped to this viewer instance
  window.viewerNav=(dir)=>{
    const newIdx=idx-dir; // dir=1 means right/newer, dir=-1 means left/older
    if(newIdx<0||newIdx>=era.length)return;
    idx=newIdx;
    el.innerHTML=buildContent(era[idx],idx);
    // Re-attach touch
    el.removeEventListener('touchstart',()=>{});
    el.removeEventListener('touchend',()=>{});
    el.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;},{passive:true});
    el.addEventListener('touchend',e=>{
      const dx=e.changedTouches[0].clientX-touchStartX;
      if(Math.abs(dx)>50){dx<0?viewerNav(1):viewerNav(-1);}
    },{passive:true});
  };

  // Edit function
  window.openViewerEdit=(photoId)=>{
    const p=photos.find(x=>x.id===photoId);if(!p)return;
    const editArea=document.getElementById('viewer-edit-area');
    if(!editArea)return;
    const currentCINum=parseInt((p.ci||'CI-0').replace('CI-',''))||0;
    const ciGrid=LEVELS.map((l,i)=>{
      const isSel=i===currentCINum;
      return`<button
        onclick="(function(v){document.querySelectorAll('.vw-ci-btn').forEach(b=>{const s=b.dataset.ci===v;b.style.background=s?'var(--acc12)':'var(--bg-stat)';b.style.borderColor=s?'var(--acc30)':'var(--stat-border)';b.style.color=s?'var(--accent)':'var(--text3)';});document.getElementById('edit-photo-ci').value=v;})('${l.ci}')"
        class="vw-ci-btn" data-ci="${l.ci}"
        style="padding:7px 2px;border-radius:7px;font-family:Cinzel,serif;font-size:10px;font-weight:700;cursor:pointer;text-align:center;transition:all .15s;background:${isSel?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isSel?'var(--acc30)':'var(--stat-border)'};color:${isSel?'var(--accent)':'var(--text3)'}">${l.ci}</button>`;
    }).join('');
    editArea.innerHTML=`
      <div style="margin-top:12px;background:var(--bg-stat);border:1px solid var(--acc30);border-radius:10px;padding:12px;width:100%">
        <input type="hidden" id="edit-photo-ci" value="${p.ci||'CI-0'}">
        <div style="font-size:10px;color:var(--text4);margin-bottom:7px;text-transform:uppercase;letter-spacing:.8px">CI Level</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:12px">${ciGrid}</div>
        <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Date</div>
        <input type="date" id="edit-photo-date" value="${p.date}" max="${today()}"
          style="background:var(--bg-card);border:1px solid var(--acc30);border-radius:7px;padding:7px 10px;color:var(--accent);font-size:14px;font-weight:600;width:100%;outline:none;font-family:'DM Sans',sans-serif;margin-bottom:10px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Caption</div>
        <input type="text" id="edit-photo-note" value="${htmlEsc(p.note||'')}" placeholder="Add a caption..."
          style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:7px;padding:7px 10px;color:var(--text1);font-size:12px;width:100%;outline:none;font-family:'DM Sans',sans-serif;margin-bottom:10px">
        <div style="display:flex;gap:7px">
          <button class="btn-ghost" onclick="document.getElementById('viewer-edit-area').innerHTML=''" style="flex:0 0 70px;padding:8px">Cancel</button>
          <button class="btn-gold" onclick="saveViewerEdit(${photoId})" style="flex:1;padding:8px">Save</button>
        </div>
      </div>`;
    document.getElementById('edit-photo-note').focus();
  };

  window.saveViewerEdit=(photoId)=>{
    const dateVal=document.getElementById('edit-photo-date')?.value||'';
    const noteVal=document.getElementById('edit-photo-note')?.value||'';
    const ciVal=document.getElementById('edit-photo-ci')?.value||null;
    photos=photos.map(p=>p.id===photoId?{...p,date:dateVal||p.date,note:noteVal,...(ciVal?{ci:ciVal}:{})}:p);
    savePhotos();
    // Refresh the viewer content to show updated values
    el.innerHTML=buildContent(era[idx],idx);
    showToast('✓ Photo updated');
    // Re-attach touch
    el.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;},{passive:true});
    el.addEventListener('touchend',e=>{
      const dx=e.changedTouches[0].clientX-touchStartX;
      if(Math.abs(dx)>50){dx<0?viewerNav(1):viewerNav(-1);}
    },{passive:true});
  };
}

// ── EXPORT ─────────────────────────────────────────────────────────────────────
function exportCSV(){
  const rows=[['Date','Method','Category','Duration (min)','Notes']];
  logs.forEach(l=>{const cat=catFor(l.cat);rows.push([l.date,l.method,cat.label,l.dur,(l.notes||'').replace(/,/g,' ')]);});
  const csv=rows.map(r=>r.join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`restoration-log-${today()}.csv`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  showToast('📊 CSV exported!');
}

// ── UI HELPERS ─────────────────────────────────────────────────────────────────
function showToast(msg){const el=document.getElementById('toast');el.textContent=msg;el.style.display='block';clearTimeout(el._t);el._t=setTimeout(()=>el.style.display='none',3500);}
function showSessFlash(msg){const el=document.createElement('div');el.className='sess-flash';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),950);}
function showEncourageBurst(avatar){
  const pool=[avatar||'👊','💪','✨','🌱','⚡','🔥'];
  for(let i=0;i<7;i++)setTimeout(()=>{
    const el=document.createElement('div');
    el.textContent=pool[i%pool.length];
    const l=8+Math.random()*84,fs=16+Math.random()*20,dur=.8+Math.random()*.5;
    el.style.cssText=`position:fixed;font-size:${fs}px;left:${l}%;top:${35+Math.random()*25}%;pointer-events:none;z-index:500;animation:enc-burst ${dur}s ease forwards`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),(dur*1000)+200);
  },i*95);
}
const SESSION_QUIPS=[
  m=>`${m} of mechanotransduction complete 🧬`,
  m=>`Keratinocytes: activated. ${m} locked in`,
  m=>`+${m} permanent gains 💎`,
  m=>`Biology doing its thing — ${m} in`,
  m=>`${m} your future self will notice`,
  m=>`Quiet consistency. ${m} done ✓`,
  m=>`Tension applied. Mitosis triggered. ${m}`,
  m=>`${m} in the permanent column — forever`,
  m=>`Cells heard you. ${m} done 🌱`,
  m=>`Keep showing up. ${m} today`,
  m=>`${m} — consistency beats intensity`,
  m=>`${m} closer. One session at a time`,
];
function getSessionQuip(totalMins){
  const fn=SESSION_QUIPS[char.sessions%SESSION_QUIPS.length];
  return fn(fmtMin(totalMins));
}

// ── JOURNEY ARC SVG (used on Journey tab hero card) ─────────────────────────
function journeyArcSVG(ci,startCI,ciGoal,goalPct){
  const cx=120,cy=106,r=85;
  const swTrack=20,swFill=13;
  const startDeg=148,totalDeg=244,segCount=10;
  const gapT=2.8,gapF=1.6;
  const segDeg=totalDeg/segCount;
  const toR=d=>d*Math.PI/180;
  let trackPaths='',fillPaths='';
  for(let i=0;i<segCount;i++){
    // Track arc (wider — creates the groove/slot)
    const st=startDeg+i*segDeg+gapT/2,et=startDeg+(i+1)*segDeg-gapT/2;
    // Fill arc (narrower — sits inside the groove)
    const sf=startDeg+i*segDeg+gapF/2,ef=startDeg+(i+1)*segDeg-gapF/2;
    const filled=i<ci,isLast=i===ci-1;
    trackPaths+=`<path d="${arcD(cx,cy,r,st,et)}" stroke="var(--bg-stat)" stroke-width="${swTrack}" fill="none" stroke-linecap="round" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6)) drop-shadow(0 -1px 2px rgba(255,255,255,0.05))"/>`;
    if(filled){
      fillPaths+=`<path d="${arcD(cx,cy,r,sf,ef)}" stroke="var(--accent)" stroke-width="${swFill}" fill="none" stroke-linecap="round" opacity="${isLast?'1':'0.86'}" style="filter:drop-shadow(0 0 7px var(--accent)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))"/>`;
    }
  }
  // Goal marker dot
  if(ciGoal>0&&ciGoal<=10){
    const gd=startDeg+ciGoal*segDeg;
    const gx=(cx+r*Math.cos(toR(gd))).toFixed(1);
    const gy=(cy+r*Math.sin(toR(gd))).toFixed(1);
    fillPaths+=`<circle cx="${gx}" cy="${gy}" r="6" fill="var(--bg)" stroke="${ci>=ciGoal?'var(--green)':'var(--accent)'}" stroke-width="2.5" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4))"/>`;
  }
  const subtitle=goalPct>=100?'🏆 Goal Reached!':goalPct+'% to Goal';
  return`<svg viewBox="0 0 240 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:240px;display:block;margin:0 auto">
    ${trackPaths}
    ${fillPaths}
    <text x="${cx}" y="100" text-anchor="middle" font-family="Cinzel,serif" font-size="50" font-weight="900" fill="var(--accent)">${ci}</text>
    <text x="${cx}" y="120" text-anchor="middle" font-family="Cinzel,serif" font-size="12" font-weight="600" fill="var(--text3)">${LEVELS[ci].ci}</text>
    <text x="${cx}" y="140" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="10" font-weight="600" fill="${goalPct>=100?'var(--green)':'var(--text4)'}">${subtitle}</text>
  </svg>`;
}
// ── CI RING SVG ────────────────────────────────────────────────────────────────
function arcD(cx,cy,r,startDeg,endDeg){
  const toR=d=>d*Math.PI/180;
  const sx=cx+r*Math.cos(toR(startDeg)),sy=cy+r*Math.sin(toR(startDeg));
  const ex=cx+r*Math.cos(toR(endDeg)),ey=cy+r*Math.sin(toR(endDeg));
  const sweep=((endDeg-startDeg)%360+360)%360;
  const large=sweep>180?1:0;
  return`M${sx.toFixed(2)},${sy.toFixed(2)} A${r},${r} 0 ${large},1 ${ex.toFixed(2)},${ey.toFixed(2)}`;
}
function ciRingSVG(){
  const ci=char.ciLevel||0;
  const cx=110,cy=105,r=80,sw=14;
  const startDeg=148,totalDeg=244,segCount=10,gap=1.5;
  const segDeg=totalDeg/segCount;
  let paths='';
  for(let i=0;i<segCount;i++){
    const s=startDeg+i*segDeg+gap,e=startDeg+(i+1)*segDeg-gap;
    const filled=i<ci;
    const isLast=i===ci-1;
    const op=filled?(isLast?'1':'0.8'):'0.2';
    const color=filled?'var(--accent)':'var(--stat-border,#444)';
    paths+=`<path d="${arcD(cx,cy,r,s,e)}" stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="round" opacity="${op}"/>`;
  }
  // Active dot at current position
  const dotDeg=ci>0?startDeg+ci*segDeg:startDeg;
  const toR=d=>d*Math.PI/180;
  const dotX=cx+r*Math.cos(toR(dotDeg)),dotY=cy+r*Math.sin(toR(dotDeg));
  const dotEl=ci>0?`<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="6" fill="var(--accent)"/>
    <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="3" fill="var(--bg)"/>`:
    `<circle cx="${(cx+r*Math.cos(toR(startDeg))).toFixed(1)}" cy="${(cy+r*Math.sin(toR(startDeg))).toFixed(1)}" r="5" fill="var(--stat-border,#444)" opacity="0.5"/>`;
  // Bottom labels
  const lx=cx+r*Math.cos(toR(startDeg));
  const ly=cy+r*Math.sin(toR(startDeg));
  const rx=cx+r*Math.cos(toR(startDeg+totalDeg));
  const ry=cy+r*Math.sin(toR(startDeg+totalDeg));
  return`<svg viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:220px;display:block;margin:0 auto">
    ${paths}${dotEl}
    <text x="${cx}" y="${cy-10}" text-anchor="middle" font-family="Cinzel,serif" font-size="34" font-weight="900" fill="var(--accent)">${LEVELS[ci].ci}</text>
    <text x="${cx}" y="${cy+13}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="500" fill="var(--text3)">${ci===0?'Starting point':ci===10?'Fully restored':'In progress'}</text>
    <text x="${cx}" y="${cy+30}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" fill="var(--text4)">${ci<10?`Next: CI-${ci+1}`:'🏆 Journey Complete'}</text>
    <text x="${(lx-5).toFixed(0)}" y="${(ly+16).toFixed(0)}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="var(--text5)">CI-0</text>
    <text x="${(rx+5).toFixed(0)}" y="${(ry+16).toFixed(0)}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="var(--text5)">CI-10</text>
  </svg>`;
}

// ── COACH MESSAGE ──────────────────────────────────────────────────────────────
// ── COACH BRAIN ────────────────────────────────────────────────────────────────
// A curated, growing knowledge library. Pattern-matched against user questions.
// To expand: bring user questions to Claude, add new entries, push update.

const COACH_BRAIN={

  // ── TENSION & GROWTH SCIENCE ──────────────────────────────────────────────
  tension:{
    keywords:['tension','how does','work','science','tissue','grow','biology','mechanism','skin expansion','mitosis'],
    response:(u)=>`Foreskin restoration works through mechanotransduction — your skin cells sense sustained tension and respond by dividing and producing new tissue. This is the same process behind skin expansion used in reconstructive surgery, and it's well-documented in biology.\n\nThe key word is sustained. Brief, intense pulling doesn't trigger the signal. What triggers it is hours of gentle, consistent tension across the day. Think of it less like a workout and more like orthodontics — the force is small, the time is long, and the result is permanent structural change.\n\nAt your current pace of ${u.avgDay>0?fmtMin(u.avgDay)+'/day':'getting started'}, you're ${u.avgDay>=60?'applying a meaningful tension signal — keep it up.':u.avgDay>0?'building toward the recommended range. Most restorers aim for 60–120+ minutes daily.':'not yet applying consistent tension. Even 30 minutes daily is a real start.'}`
  },

  howLong:{
    keywords:['how long','timeline','years','months','when will','how much time','take','finish','complete','done','ci-10','fully restored'],
    response:(u)=>`This is the question every restorer wants answered, and the honest answer is: nobody can tell you with certainty, including me.\n\nWhat we do know is that progression depends almost entirely on daily tension hours and your individual biology. Some people move from CI-0 to CI-5 in 2 years with consistent effort. Others take 5 years. Some move faster, some slower.\n\nWhat I can tell you is specific to you: you're currently at ${LEVELS[u.ci].ci}, you've logged ${u.sessions} sessions totalling ${Math.floor(u.minutes/60)} hours, and your 30-day average is ${fmtMin(u.avgDay)}/day. At that pace you're accumulating roughly ${Math.round(u.avgDay*30/60)} hours of tension per month.\n\nFocus on the process, not the destination. The restorers who finish are the ones who stopped asking "when" and started asking "how can I be more consistent."`
  },

  ciLevels:{
    keywords:['ci level','ci-','ci0','ci1','ci2','ci3','ci4','ci5','ci6','ci7','ci8','ci9','ci10','what is ci','coverage index','halfway','progress','what level'],
    response:(u)=>`The Coverage Index (CI) is the standard scale restorers use to measure progress, from CI-0 (starting point) to CI-10 (full restoration).\n\nYou're currently at ${LEVELS[u.ci].ci}. ${u.ci===0?'At CI-0, you\'re at the beginning — no measurable loose skin yet. The first sign of progress is usually slight wrinkling of shaft skin during erection.':u.ci<=3?'At your stage, the early visible signs are starting to appear — shaft skin loosening, slight rollover. This early phase can feel slow, but the groundwork is being laid.':u.ci<=5?'You\'re approaching or at the halfway point. At CI-5 most restorers begin experiencing functional benefits — reduced sensitivity in a good way, glans beginning to retain moisture.':u.ci<=7?'You\'re in the upper half. Glans coverage at rest is becoming consistent. Many restorers find motivation increases significantly at this stage because the results are undeniable.':'You\'re in the final stretch. The tissue is there — refinement and fullness is what remains.'}\n\nCI is self-assessed based on the standard descriptions. Update it in the Journey tab when you notice consistent progress.`
  },

  methods:{
    keywords:['method','manual','device','tape','t-tape','tugger','tlc','dtr','retaining','inflation','which method','best method','what should i use','packing','ric','restore in comfort'],
    response:(u)=>{
      const used=(u.methods||[]).length;
      return`There are five main restoration approaches, each with its own advantages:\n\n✋ Manual methods (MM1-MM5) require no equipment and can be done anywhere. Great for beginners and for applying tension in specific directions. The downside is you have to be actively doing them — no passive wear time.\n\n⚙ Devices (DTR, TLC Tugger, HyperRestore etc.) apply tension passively while you go about your day. Most restorers find devices give them their highest tension hours because wearing time is easy to accumulate.\n\n📐 Taping (T-Tape, cross tape) is one of the most popular methods — creates a custom tension setup using medical tape. T-Tape in particular is loved for long wear times and gentle consistent tension.\n\n💨 Inflation applies tension from the inside using air. Different tissue areas are targeted compared to external methods.\n\n🔒 Retaining holds coverage without active tension — good for dekeratinisation and protection between sessions.\n\nYou've used ${used} method${used!==1?'s':''} so far${used>0?': '+u.methods.slice(0,3).join(', '):''}. ${used<3?'Exploring different methods helps you find what works best for your anatomy and lifestyle.':'Good variety — different methods target different areas of the prepuce.'}`
    }
  },

  consistency:{
    keywords:['consistent','consistency','every day','daily','habit','routine','keep going','motivation','give up','quit','hard','difficult','struggle'],
    response:(u)=>`Consistency is the entire game in restoration. It's not about any single session — it's about the cumulative signal over months and years.\n\nHere's what your data says: ${u.streak>14?`You have a ${u.streak}-day streak — that's genuine consistency and it's working.`:u.streak>0?`You have a ${u.streak}-day current streak. Building on this is exactly the right focus.`:'Your streak has broken recently. That\'s normal — what matters is getting back.'}\n\nThe restorers who see the most progress tend to do one thing differently: they make restoration part of an existing habit. Put your device on when you shower. Do MM1 while watching TV. Wear T-tape during your commute. Attaching restoration to something you already do daily removes the decision entirely.\n\nYour 30-day average is ${fmtMin(u.avgDay)}/day. ${u.avgDay>=90?'That\'s excellent. Keep that foundation solid.':u.avgDay>=45?'That\'s a solid base. Finding 20 more minutes somewhere in your day would make a real difference.':'Even small increases compound over months. What\'s one existing habit you could attach restoration to?'}`
  },

  plateau:{
    keywords:['plateau','stuck','stall','no progress','not moving','same ci','months','not working','slow','nothing happening','frustrated'],
    response:(u)=>`Plateaus are one of the most common and frustrating parts of restoration — and almost every restorer experiences them. Here's what's actually happening and what to do about it.\n\nTissue growth isn't linear. Your skin cells go through cycles of growth, consolidation, and rest. What looks like a plateau on the outside is often an internal consolidation phase — the new tissue is organising itself before the next visible growth phase.\n\nThe other common cause is tension adaptation. Your skin can adapt to a specific tension level and stop responding. The fix is variation — change your method, change the direction of tension, try a different device, or adjust the force level.\n\nAt ${LEVELS[u.ci].ci} with ${Math.floor(u.minutes/60)} hours logged, ${u.minutes<3000?'you\'re still in the early phases where patience is the main tool.':'you have significant hours invested. A plateau now likely means your tissue needs a different stimulus — try a method you haven\'t used recently.'}\n\nOne more thing: dekeratinisation is happening even when CI doesn't change. The glans is softening and becoming more sensitive beneath the surface. Progress is often invisible before it becomes visible.`
  },

  dekeratinisation:{
    keywords:['dekeratinisation','dekeratinization','sensitive','sensitivity','glans','shiny','soft','moist','rough','dry','skin texture'],
    response:(u)=>`Dekeratinisation is one of the most significant — and least discussed — benefits of restoration, and it starts happening long before your CI level moves significantly.\n\nThe glans naturally has a mucosal surface that needs protection from friction and air exposure. After circumcision, constant exposure causes the surface to harden and produce a keratinised layer — essentially a callus. This reduces sensitivity significantly.\n\nAs you restore coverage, the glans begins spending more time protected. The keratinised layer gradually sheds and the mucosal surface returns. This is why many restorers report significant sensitivity changes well before reaching their target CI level.\n\nAt ${LEVELS[u.ci].ci}, ${u.ci>=3?'you should be starting to notice some changes in glans texture and sensitivity, especially on days with good coverage.':'this process is beginning. Retaining (using a retainer to maintain coverage between sessions) accelerates dekeratinisation significantly even before your CI advances.'}\n\nSigns to look for: slightly shinier appearance, increased sensitivity, occasional slight moisture retention. These are all positive indicators.`
  },

  restDays:{
    keywords:['rest day','rest','recovery','break','day off','overdo','sore','irritated','take a break','too much','hurts','pain','uncomfortable'],
    response:(u)=>`Rest days are not a failure — they're a deliberate part of the process. Your skin needs recovery time to consolidate new tissue, and pushing through soreness or irritation is one of the most common mistakes restorers make.\n\n${(u.restDays||[]).length>0?`You've marked ${u.restDays.length} rest day${u.restDays.length!==1?'s':''} — good.`:'You haven\'t marked any rest days yet. Even with good consistency, planned rest days are worth considering.'}\n\nSigns you should take a rest day:\n• Any soreness, redness, or irritation in the skin\n• The skin feels fatigued or tighter than usual\n• You've had 7 or more consecutive days without a break\n• You feel mentally burned out on the routine\n\nSigns a rest day is not needed:\n• You simply don't feel like it (push through gently)\n• You missed yesterday (just resume today)\n\nOne or two rest days per week is healthy for most restorers and doesn't meaningfully slow progress. Overtraining absolutely does.`
  },

  beginners:{
    keywords:['beginner','start','starting','new','first','where do i','how do i start','just started','just beginning','confused','what do i do','help','guide'],
    response:(u)=>`Welcome to the journey. Here's what I'd recommend focusing on as you're getting started:\n\n1. Start with manual methods first. MM1 and MM2 require no equipment, help you understand your anatomy, and can be done anywhere. Do them while watching TV or reading.\n\n2. Set a realistic daily goal. 30–60 minutes to start. You can always increase it. The goal is building a sustainable habit, not maximum output on day one.\n\n3. Update your CI level in the Journey tab. Even if you're at CI-0, setting it gives you a baseline and makes progress visible over time.\n\n4. Take a baseline photo now. In 6 months you'll be glad you did. Progress is nearly invisible day to day but dramatic across months.\n\n5. Be patient with the science. Tissue growth takes months of consistent work before it becomes visible. Many people quit right before they'd start seeing results.\n\nYou've logged ${u.sessions} session${u.sessions!==1?'s':''} so far. ${u.sessions===0?'Your first session is the most important one — even 10 minutes.':u.sessions<10?'Good start. Focus on building the daily habit before optimising anything else.':'You\'re building a real foundation. Keep it going.'}`
  },

  progress:{
    keywords:['progress','how am i doing','am i doing well','results','working','effective','am i on track','check in','update','feedback'],
    response:(u)=>{
      const hrs=Math.floor(u.minutes/60);
      const avgDay=u.avgDay;
      let assessment='';
      if(u.sessions===0)assessment='You haven\'t logged any sessions yet. Your journey starts with your first log.';
      else if(avgDay>=90)assessment=`Your ${fmtMin(avgDay)}/day average over the last 30 days is excellent. You're applying a strong, consistent tension signal.`;
      else if(avgDay>=60)assessment=`Your ${fmtMin(avgDay)}/day average is solid — above the generally recommended minimum. You're doing well.`;
      else if(avgDay>=30)assessment=`Your ${fmtMin(avgDay)}/day average is a decent base. Pushing toward 60+ minutes daily would meaningfully accelerate your results.`;
      else if(avgDay>0)assessment=`Your ${fmtMin(avgDay)}/day average is below the recommended range. Small increases compound significantly over time.`;
      else assessment='You haven\'t logged sessions in the past 30 days. Getting back on track is the priority.';
      return`Here's your honest progress snapshot:\n\n📊 ${u.sessions} sessions · ${hrs} hours total · ${char.streak}-day streak\n🎯 ${fmtMin(avgDay)}/day average (last 30 days)\n◑ Currently ${LEVELS[u.ci].ci}\n\n${assessment}\n\n${u.ci>0&&u.minutes>0?`At your current pace you're accumulating roughly ${Math.round(avgDay*30/60)} hours of tension per month. ${avgDay>=60?'That\'s meaningful progress.':'Increasing your daily average is the single most impactful thing you can do.'}`:''}`;
    }
  },

  motivation:{
    keywords:['motivat','inspired','inspire','keep going','worth it','give up','quit','not worth','why','purpose','reason','point','does it work','real'],
    response:(u)=>`Restoration works. That's not opinion — it's documented by thousands of restorers over decades and supported by the same tissue expansion science used in reconstructive medicine. The question isn't whether it works, it's whether you'll be consistent enough long enough.\n\nHere's something worth sitting with: the average restorer who reaches CI-8 or higher spent 4–7 years getting there. That sounds daunting. But those years pass regardless. The question is whether you spend them working toward something meaningful or not.\n\nYou've already put in ${Math.floor(u.minutes/60)} hours across ${u.sessions} sessions. That's real. That's tissue that exists now that didn't exist when you started. It doesn't disappear.\n\n${u.streak>7?`Your ${u.streak}-day streak shows you have the consistency to do this. Don't underestimate that.`:u.sessions>20?'You\'ve built real history here. That matters.':'Every session is a deposit into an account that only grows.'}\n\nThe restorers who finish are not the ones with the most free time or the best genetics. They're the ones who decided to stop deciding and just do it every day.`
  },

  inflation:{
    keywords:['inflation','balloon','air','hyperrestore','priva','airforce','foreskinned air','inflate','inflat'],
    response:(u)=>`Inflation methods use air pressure inside the foreskin to apply tension from the inside out. This targets the inner foreskin specifically, which is the more sensitive mucosal tissue that can't be as easily reached by external tension methods.\n\nDevices like HyperRestore's balloon method, the Airforce Direct Air, Priva Air, and DIY balloon methods all work on this principle. The skin is held forward and air is introduced to create sustained outward tension.\n\nInflation is particularly effective for: inner foreskin development, even circular tension distribution, and passive wear time since once inflated it maintains itself.\n\nThe main considerations: start with low pressure and work up gradually, never push to discomfort, and limit sessions initially to 30–60 minutes until you understand how your tissue responds. Overinflation is the main risk — more pressure does not mean faster results.\n\n${(u.methods||[]).some(m=>m.toLowerCase().includes('air')||m.toLowerCase().includes('balloon')||m.toLowerCase().includes('priva'))?'You\'ve tried inflation methods — good to see variety in your approach.':'You haven\'t tried inflation yet. It\'s worth exploring as a complement to your current methods, especially for inner foreskin development.'}`
  },

  retaining:{
    keywords:['retain','retaining','retainer','cone','manhood','si retainer','stealth','coverage','protect','between sessions','dekeratini'],
    response:(u)=>`Retaining is different from active restoration — it's not primarily about tissue growth, it's about maintaining coverage to allow dekeratinisation and protecting the glans from constant exposure.\n\nA retainer (cone, ManHood, SI Retainer, etc.) holds your existing skin forward without active tension. This means the glans spends time covered and protected even when you're not actively restoring.\n\nThe benefits: dekeratinisation accelerates significantly with consistent retaining, sensitivity improves, and there's psychological motivation from experiencing what fuller coverage feels like.\n\nRetaining is most effective at CI-3 and above when there's enough loose skin to actually maintain coverage. Below CI-3, retaining with a device can still help but the coverage is partial.\n\n${u.ci>=3?'At your current CI level, retaining between sessions is highly recommended. Even a few hours per day makes a meaningful difference to dekeratinisation.':'At your current stage, focus primarily on active restoration first. Retaining becomes increasingly beneficial as you gain more coverage.'}`
  },

  taping:{
    keywords:['tape','t-tape','tegaderm','cross tape','taping','transpore','canister','dtrt'],
    response:(u)=>`Taping is one of the most popular restoration methods for good reason — it's inexpensive, customisable, and allows long wear times throughout the day.\n\nT-Tape is the most widely used: medical tape (3M Transpore works well) applied to hold the foreskin forward with tension. The setup takes a few minutes but can then be worn for hours during normal activity.\n\nKey things to know:\n• The tape goes on clean, dry skin — oils or moisture reduce adhesion\n• Tension should be comfortable but noticeable — never painful\n• Start with 2–4 hour wear times and work up\n• Remove carefully (warm water helps) to avoid skin irritation\n• Shaving the base of the shaft helps with adhesion and removal\n• Some redness after removal is normal — raw irritation is not\n\n${(u.methods||[]).some(m=>m.toLowerCase().includes('tape'))?'You\'re already using taping methods — make sure your wear time is maximised. Many restorers get their best tension hours from tape.':'Taping might be worth trying. It has one of the highest wear-time potentials of any method and works well alongside device use.'}`
  },

  goals:{
    keywords:['goal','daily goal','target','set a goal','my goal','change goal','update goal','aim','recommended daily','enough per day'],
    response:(u)=>`Your current daily goal is ${fmtMin(u.goal)}. ${u.avgDay>=u.goal?'You\'ve been meeting or exceeding it — consider whether it\'s time to set a higher target.':u.avgDay>=u.goal*0.7?'You\'re close to your goal most days. A small push to consistently hit it would compound significantly.':'You\'re currently averaging below your goal. Either adjust the goal to be more realistic, or identify what\'s preventing you from hitting it.'}\n\nFor reference, the general guidance in the restoration community:\n• 30 min/day — minimum to see any progress (slow)\n• 60 min/day — recommended baseline for consistent progress\n• 2–4 hrs/day — what faster progressors typically report\n• 6+ hrs/day — possible with tape or device during work/sleep\n\nMore is generally better, but consistency over time matters more than occasional very long sessions. A steady 90 minutes every day beats 8 hours once a week.\n\nYou can adjust your daily goal in the goal field on the Today tab.`
  },

  photos:{
    keywords:['photo','picture','progress photo','document','compare','before after','photo journal','take photo'],
    response:(u)=>`Progress photos are one of the most important and most neglected parts of restoration. Here's why they matter so much: restoration progress is nearly invisible on a day-to-day basis. You look the same today as yesterday. But compared to 6 months ago? The difference is often dramatic — and without photos, you'll never see it.\n\nYou currently have ${photos.length} photo${photos.length!==1?'s':''} logged. ${photos.length===0?'Take a baseline photo today. Even if you\'re at CI-0, a starting point is essential for tracking progress.':photos.length<5?'Good start. The most useful comparison is when you have photos across different CI levels and time periods.':'Good photo history. The side-by-side comparison feature in the Photos tab lets you compare any two photos directly.'}\n\nBest practices:\n• Same lighting, same position, same camera distance each time\n• Take photos both flaccid and erect to see CI changes accurately\n• Once a month is a good cadence — enough to see change without being obsessive\n• Note your CI level when adding a photo so you can track correlation`
  },

  sleep:{
    keywords:['sleep','overnight','night','sleeping','nocturnal','while sleeping','bed'],
    response:(u)=>`Restoring during sleep is possible and some restorers get significant hours this way, but it requires care.\n\nWhat works during sleep: taping (T-Tape specifically), some devices at low tension, retainers for dekeratinisation without active tension.\n\nWhat to be careful of: erections during sleep create significant tension — if you're wearing a device or tape, this tension is amplified and can cause discomfort or skin irritation. Start with retaining only (no active tension device) to see how your body responds overnight.\n\nMany experienced restorers do sleep with tape or a retainer and find it's their highest-yield tension time. The key is: if you wake up uncomfortable, that device isn't right for overnight use on you specifically.\n\nIf you're going to try overnight sessions: start with just a retainer for the first few nights, then try light tape tension, then a low-tension device. Build up gradually and listen to your body.`
  },

  manual:{
    keywords:['manual method','mm1','mm2','mm3','mm4','mm5','manual stretching','hands','fingers','squeeze','pull'],
    response:(u)=>`Manual methods are the foundation of restoration — no equipment needed, can be done anywhere, completely free.\n\nThe five main manual methods (MM1–MM5) each apply tension in different directions:\n\n• MM1 — two hands pulling skin toward the body and away simultaneously. Good for general outer foreskin growth.\n• MM2 — one hand holds skin, the other pulls. Easier to do one-handed.\n• MM3 — skin is pulled over the glans and held. Inner foreskin focus.\n• MM4 — manual inflation by trapping air. Budget version of inflation methods.\n• MM5 — skin bunched and pulled in specific directions. Good for targeting specific areas.\n\nManual methods are excellent for directed tension and can reach areas devices miss. The downside is they require active attention — you have to be doing them. For passive wear time, combine with taping or devices.\n\n${(u.methods||[]).some(m=>m.toLowerCase().includes('mm')||m.toLowerCase().includes('manual'))?'You\'re already using manual methods — make sure you\'re varying between them to target different tissue areas.':'Manual methods are worth incorporating even if you primarily use devices. The directed tension they provide is unique.'}`
  },

  welcome:{
    keywords:['hello','hi','hey','what can you','who are you','what do you do','help me','coach'],
    response:(u)=>`Hey ${char.name}! I'm your Coach — I'm here to help you understand restoration, make sense of your progress, and answer questions along the way.\n\nYou can ask me anything about restoration — methods, CI levels, how tissue growth works, what to expect at your stage, how to stay consistent, or just for a check-in on how you're doing.\n\nYou're currently at ${LEVELS[u.ci].ci} with ${u.sessions} sessions and ${Math.floor(u.minutes/60)} hours logged. ${u.sessions>0?'You\'ve got real history here — let\'s make sure you\'re making the most of it.':'Ready to get started? Ask me anything.'}\n\nWhat would you like to know?`
  }
};

// ── COACH EXTENDED DATA ────────────────────────────────────────────────────────
let coachExtended=[]; // loaded from coach_data.json on GitHub
// Loads coach_data.json from GitHub — zero Firebase reads, zero cost.
// Add new knowledge entries there without ever touching index.html.
async function loadCoachData(){
  try{
    const res=await fetch('./coach_data.json');
    if(!res.ok)return;
    const data=await res.json();
    if(Array.isArray(data))coachExtended=data;
  }catch(e){
    // Silently fail — app works fine with built-in brain only
  }
}
loadCoachData();

// ── COACH BRAIN MATCHER ────────────────────────────────────────────────────────
function coachBrainMatch(question){
  const q=question.toLowerCase();
  // Build user context object
  const td=today();
  const last30=logs.filter(l=>(new Date()-new Date(l.date+'T12:00:00'))/86400000<=30);
  const avgDay=last30.length?Math.round(last30.reduce((a,l)=>a+l.dur,0)/30):0;
  const u={
    ci:char.ciLevel||0,
    sessions:char.sessions||0,
    minutes:char.minutes||0,
    streak:char.streak||0,
    avgDay,
    goal:char.dailyGoalMin||120,
    methods:char.methods||[],
    restDays:char.restDays||[],
    photos:photos||[]
  };
  // Score each topic by keyword matches
  let bestTopic=null,bestScore=0,bestExtEntry=null;
  for(const[topic,data] of Object.entries(COACH_BRAIN)){
    let score=0;
    for(const kw of data.keywords){
      if(q.includes(kw))score+=kw.split(' ').length; // multi-word keywords score higher
    }
    if(score>bestScore){bestScore=score;bestTopic=topic;bestExtEntry=null;}
  }
  // Also search extended knowledge base loaded from coach_data.json
  for(const entry of coachExtended){
    let score=0;
    for(const kw of entry.keywords){
      if(q.includes(kw))score+=kw.split(' ').length;
    }
    if(score>bestScore){bestScore=score;bestExtEntry=entry;bestTopic=null;}
  }
  if(bestScore===0){
    // No match — give a helpful fallback
    return`I'm not sure I have a perfect answer for that specific question, ${char.name}. Try asking about methods, CI levels, consistency, how restoration works, rest days, or ask for a progress check-in.\n\nYou can also send feedback via the profile menu — specific questions you ask that I can't answer well help me get smarter over time.`;
  }
  // Return from extended JSON if it won, otherwise from built-in brain
  if(bestExtEntry) return bestExtEntry.response;
  const data=COACH_BRAIN[bestTopic];
  return typeof data.response==='function'?data.response(u):data.response;
}

function coachMessage(){
  const td=today();
  const ci=char.ciLevel||0;
  const daysSinceLast=char.lastDate?Math.round((new Date(td)-new Date(char.lastDate))/86400000):-1;
  const tMin=todayMin();
  const goal=char.dailyGoalMin||120;
  const hoursTotal=char.minutes/60;
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;

  // Analyse weekly patterns
  const last30=logs.filter(l=>(new Date()-new Date(l.date+'T12:00:00'))/86400000<=30);
  const last7=logs.filter(l=>(new Date()-new Date(l.date+'T12:00:00'))/86400000<=7);
  const prev7=logs.filter(l=>{const d=(new Date()-new Date(l.date+'T12:00:00'))/86400000;return d>7&&d<=14;});
  const last7Mins=last7.reduce((a,l)=>a+l.dur,0);
  const prev7Mins=prev7.reduce((a,l)=>a+l.dur,0);
  const avgDailyMins=last30.length?Math.round(last30.reduce((a,l)=>a+l.dur,0)/30):0;

  // Day-of-week consistency analysis
  const dowCounts=[0,0,0,0,0,0,0];
  last30.forEach(l=>{const dow=new Date(l.date+'T12:00:00').getDay();dowCounts[dow]++;});
  const todayDow=new Date().getDay();
  const dowNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const bestDow=dowCounts.indexOf(Math.max(...dowCounts));
  const weakestDow=dowCounts.indexOf(Math.min(...dowCounts));

  // Time at current CI level
  const ciHistory=char.ciHistory||[];
  const lastCIChange=ciHistory.filter(h=>h.ci===ci).pop();
  const daysAtCI=lastCIChange?Math.round((new Date()-new Date(lastCIChange.date+'T12:00:00'))/86400000):null;

  // ── Priority messages — most actionable first ──
  if(char.sessions===0)
    return{icon:'👋',msg:`Welcome, ${char.name}. Your restoration journey starts with a single session. Even 15 minutes applies the tension signal your body needs. Tap Start Session below.`,cta:'log'};

  if(isRunning)
    return{icon:'⏱',msg:`Session in progress — ${fmtLive(timerSecs)}. Relax and let consistent, comfortable tension do the work. Pushing harder doesn't speed things up — patience does.`,cta:null};

  // Missed days — urgent
  if(daysSinceLast>=5)
    return{icon:'📅',msg:`It's been ${daysSinceLast} days since your last session. Restoration tissue responds to regular signals — a gap this long means starting to rebuild momentum. Even 20 minutes today counts.`,cta:'log'};

  if(daysSinceLast>=3)
    return{icon:'⏰',msg:`${daysSinceLast} days since your last session. Your ${char.streak>0?char.streak+'-day streak is at risk':'consistency is slipping'} — 15–20 minutes today keeps the momentum going.`,cta:'log'};

  // Tonight's streak at risk (after 8pm, no session today)
  const hour=new Date().getHours();
  if(hour>=20&&tMin===0&&char.streak>2)
    return{icon:'🔥',msg:`Your ${char.streak}-day streak is at risk — you haven't logged today yet and it's getting late. Even a short session protects it.`,cta:'log'};

  // Goal hit
  if(tMin>=goal){
    const trend=last7Mins>prev7Mins?`↑ ${Math.round((last7Mins-prev7Mins)/60*10)/10}h more than last week`:'';
    return{icon:'🎯',msg:`Daily goal hit — ${fmtMin(tMin)} logged today.${char.streak>=3?` ${char.streak}-day streak 🔥`:''} ${trend?trend+'.':''} Consistent tension is the only mechanism that drives growth — you're doing it right.`,cta:null};
  }

  // Weekly trend insight
  if(char.sessions>=10&&prev7Mins>0){
    const diff=last7Mins-prev7Mins;
    if(diff<-60)
      return{icon:'📉',msg:`You've logged ${fmtDur(Math.abs(diff))} less this week than last week. Restoration responds to consistent volume — a dip like this is worth noticing. What's getting in the way?`,cta:'log'};
    if(diff>60&&last7.length>=4)
      return{icon:'📈',msg:`You've logged ${fmtDur(diff)} more this week than last — solid improvement. Your average is ${fmtMin(avgDailyMins)}/day over the past month. Keep building on this.`,cta:null};
  }

  // Day-of-week weakness
  if(char.sessions>=14&&dowCounts[todayDow]===0&&bestDow!==todayDow)
    return{icon:'📆',msg:`${dowNames[todayDow]} is your least active day — you've never logged on a ${dowNames[todayDow]} in the last 30 days. ${dowNames[bestDow]} is your most consistent. Every day matters for tissue response.`,cta:'log'};

  // CI level insight
  if(daysAtCI&&daysAtCI>60&&ci<10)
    return{icon:'◑',msg:`You've been at ${LEVELS[ci].ci} for ${daysAtCI} days. CI progression is driven purely by cumulative tension hours — there's no shortcut. Your current pace of ${fmtMin(avgDailyMins)}/day is${avgDailyMins>=60?' solid.':(avgDailyMins>=30?' okay, but more is better.':' below the recommended daily amount.')}`,cta:null};

  // First photo nudge
  if(photos.length===0&&char.sessions>=3)
    return{icon:'📸',msg:`You've logged ${char.sessions} sessions — now is the time to add a baseline photo. Progress is nearly invisible day to day, but comparing photos months apart is the most motivating thing you can do.`,cta:'photos'};

  // CI not set
  if(ci===0&&hoursTotal>=5)
    return{icon:'◑',msg:`You've logged ${Math.round(hoursTotal)} hours but haven't set a CI level. Head to Journey and set your starting point — it helps track real progress over time.`,cta:'journey'};

  // Avg daily insight
  if(char.sessions>=7)
    return{icon:'📊',msg:`Your 30-day average is ${fmtMin(avgDailyMins)}/day.${avgDailyMins>=goal?` You're consistently hitting your ${fmtMin(goal)} goal — excellent.`:avgDailyMins>=60?` You're getting regular sessions in — pushing toward ${fmtMin(goal)} daily would accelerate results.`:` Aim for ${fmtMin(goal)} daily — shorter daily sessions consistently outperform occasional long ones.`}`,cta:avgDailyMins<goal?'log':null};

  // Fallback rotation
  const day=new Date().getDate();
  const msgs=[
    {icon:'🌱',msg:`${Math.round(hoursTotal)} hours logged so far. Every hour of consistent tension is a real signal to your body — there is no other mechanism for growth. Keep showing up.`},
    {icon:'💡',msg:`If your skin feels sore, tight, or irritated — rest. Recovery is part of the process, not a failure. A rest day used well is better than a session that causes setbacks.`},
    {icon:'⏳',msg:`Restoration is measured in months and years, not days. You're at ${LEVELS[ci].ci}. The progress is real even when it's invisible — consistent tension is the only variable in your control.`},
    {icon:'🔬',msg:`You've used ${(char.methods||[]).length} method${(char.methods||[]).length===1?'':'s'}. Different methods apply tension to different areas of the prepuce. Varying your approach can help development over time.`},
  ];
  return msgs[day%msgs.length];
}

// ── RENDER ─────────────────────────────────────────────────────────────────────
function render(){
  if(showProfileScreen){renderProfileScreen();return;}
  const ci=char.ciLevel||0;
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;
  document.getElementById('root').innerHTML=`<div class="app">
    <div class="hdr">
      <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:0">
        <div style="display:flex;flex-direction:column;align-items:flex-start;flex-shrink:0;line-height:1;gap:1px">
          <span id="v-tap" onclick="adminTap()"
            style="font-family:Cinzel,serif;font-size:10.5px;font-weight:700;color:var(--accent);letter-spacing:2px;cursor:default;user-select:none;line-height:1">RESTORETRACK</span>
          <span style="font-size:7.5px;color:var(--text6);font-family:'DM Sans',sans-serif;letter-spacing:.5px">v2.4.7</span>
        </div>
        <div style="width:1px;height:20px;background:var(--stat-border);flex-shrink:0"></div>
        <div class="ci-pill" onclick="tab='journey';render()" style="cursor:pointer;flex-shrink:0" title="Go to Journey">${LEVELS[ci].ci}</div>
      </div>
      <button class="profile-btn" id="pbtn"
        style="flex-shrink:0;margin-left:8px;display:flex;align-items:center;gap:5px;max-width:170px;overflow:hidden">
        ${IC.user(13)}
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0">${char.name}</span>
        <span style="flex-shrink:0">▾</span>
      </button>
    </div>
    ${isRunning?`<div class="session-strip" onclick="tab='today';render()">
      <div class="live-dot" style="flex-shrink:0"></div>
      <span style="font-size:11px;font-weight:600;color:var(--green);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${activeTimer.method||'Session'}</span>
      <span style="font-size:12px;font-weight:700;color:var(--green);font-variant-numeric:tabular-nums;flex-shrink:0;letter-spacing:.3px" id="mc-run-time">${fmtLive(timerSecs)}</span>
      <button id="stop-strip-btn" onclick="event.stopPropagation();stopSession()"
        style="background:rgba(34,168,90,.15);border:1px solid var(--green-border);border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;color:var(--green)">
        ${IC.stop(13)}
      </button>
    </div>`:''}
    <div class="content" id="content"></div>
    <div class="nav">${renderNav()}</div>
  </div>`;
  document.getElementById('pbtn').onclick=()=>{showProfileScreen=true;render();};
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});
  const c=document.getElementById('content');
  if(tab==='today')c.innerHTML=renderToday();
  else if(tab==='journey')c.innerHTML=renderJourney();
  else if(tab==='photos')c.innerHTML=renderPhotos();
  else if(tab==='reports')c.innerHTML=renderReports();
  else if(tab==='ach')c.innerHTML=renderAch();
  else if(tab==='community'){
    // Restore persisted inner tab, default live
    commTab=localStorage.getItem('rst-comm-tab')||'live';
    setLastSeen(commTab);
    if(commTab==='posts')fetchPosts(true);
    // Restart users listener if it was stopped when we left
    if(commState.ready&&!commState.unsubUsers)startCommunityListeners();
    // Always refresh our own presence when entering the community tab
    if(commState.ready)syncPresence();
    c.innerHTML=renderCommunity();
    attachCommunityEvents();
    commState.newEncouragements=[];
    const badge=document.querySelector('.enc-badge');
    if(badge)badge.remove();
    if(!commState.ready)initFirebase();
  } else {
    // Leaving community tab — stop users listener to save reads
    // Encouragement listener stays active (minimal cost, needs to work everywhere)
    if(commState.unsubUsers){commState.unsubUsers();commState.unsubUsers=null;}
  }
  attachEvents();
  if(showSessionSheet)mountSheet();
  else if(showStopSheet)mountStopSheet();
  else if(showCISheet)mountCISheet();
}
function renderNav(){
  const running=!!activeTimer&&!!activeTimer.startedAt;
  return[
    {id:'today',    icon:IC.today(),    lbl:'Today'},
    {id:'journey',  icon:IC.journey(),  lbl:'Journey'},
    {id:'photos',   icon:IC.photos(),   lbl:'Photos'},
    {id:'reports',  icon:IC.reports(),  lbl:'Reports'},
    {id:'ach',      icon:IC.badges(),   lbl:'Badges'},
    {id:'community',icon:IC.community(),lbl:'Community'},
  ].map(t=>`<button class="nav-btn${tab===t.id?' active':''}" data-tab="${t.id}">
      <span class="nav-icon" style="position:relative;display:inline-flex;align-items:center;justify-content:center">${t.icon}${running&&t.id==='today'?`<span style="position:absolute;top:-2px;right:-4px;width:6px;height:6px;border-radius:50%;background:var(--green);border:1px solid var(--bg-nav)"></span>`:''}</span>${t.lbl}
    </button>`).join('');
}

// ── WEEKLY SUMMARY ─────────────────────────────────────────────────────────────
function getMondayOf(dateStr){
  const d=new Date(dateStr+'T12:00:00');
  const day=d.getDay(); // 0=Sun
  const diff=day===0?-6:1-day;
  d.setDate(d.getDate()+diff);
  return localDateStr(d);
}
function getWeekDates(mondayStr){
  const dates=[];
  for(let i=0;i<7;i++){
    const d=new Date(mondayStr+'T12:00:00');
    d.setDate(d.getDate()+i);
    dates.push(localDateStr(d));
  }
  return dates;
}
function buildWeeklySummary(){
  const td=today();
  const thisMonday=getMondayOf(td);

  // Previous week = Monday before thisMonday
  const prevMonday=new Date(thisMonday+'T12:00:00');
  prevMonday.setDate(prevMonday.getDate()-7);
  const prevMondayStr=localDateStr(prevMonday);
  const prevWeekDates=getWeekDates(prevMondayStr);

  // Only show if prev week has any data
  const prevWeekLogs=logs.filter(l=>prevWeekDates.includes(l.date));
  if(prevWeekLogs.length===0)return'';

  // Week before that for comparison
  const prevPrevMonday=new Date(prevMondayStr+'T12:00:00');
  prevPrevMonday.setDate(prevPrevMonday.getDate()-7);
  const prevPrevDates=getWeekDates(localDateStr(prevPrevMonday));
  const prevPrevLogs=logs.filter(l=>prevPrevDates.includes(l.date));

  // Calc prev week stats
  const sessions=prevWeekLogs.length;
  const totalMins=prevWeekLogs.reduce((a,l)=>a+l.dur,0);
  const activeDays=new Set(prevWeekLogs.map(l=>l.date)).size;
  const goalDays=prevWeekDates.filter(d=>
    logs.filter(l=>l.date===d).reduce((a,l)=>a+l.dur,0)>=(char.dailyGoalMin||120)
  ).length;

  // Best day
  const dayTotals=prevWeekDates.map(d=>({date:d,mins:logs.filter(l=>l.date===d).reduce((a,l)=>a+l.dur,0)}));
  const bestDay=dayTotals.reduce((a,b)=>b.mins>a.mins?b:a,{date:'',mins:0});
  const bestDayName=bestDay.mins>0?new Date(bestDay.date+'T12:00:00').toLocaleDateString('en',{weekday:'long'}):'';

  // Comparison to week before
  const prevSessions=prevPrevLogs.length;
  const prevTotalMins=prevPrevLogs.reduce((a,l)=>a+l.dur,0);
  let compLine='';
  if(prevPrevLogs.length===0){
    compLine='First full week tracked — great start.';
  } else if(sessions>prevSessions){
    compLine=`Up from ${prevSessions} session${prevSessions!==1?'s':''} the week before. Keep building.`;
  } else if(sessions===prevSessions){
    const timeDiff=totalMins-prevTotalMins;
    compLine=timeDiff>5?`Same sessions as the previous week but ${fmtDur(timeDiff)} more time.`:
              timeDiff<-5?`Same sessions as the previous week but ${fmtDur(Math.abs(timeDiff))} less time.`:
              'Consistent with the previous week.';
  } else {
    compLine=`Down from ${prevSessions} session${prevSessions!==1?'s':''} the week before. This week is a new start.`;
  }

  // Headline — honest, based on actual data
  let headline='',headlineColor='var(--text1)';
  if(sessions===0){return'';}
  else if(sessions>=6){headline='Strong week.';headlineColor='var(--green)';}
  else if(sessions>=4){headline='Solid week.';headlineColor='var(--accent)';}
  else if(sessions>=2){headline='Getting there.';headlineColor='var(--accent)';}
  else{headline='A start is a start.';headlineColor='var(--text2)';}

  // Format the week range label
  const weekEnd=prevWeekDates[6];
  const fmtShort=d=>{const p=d.split('-');return`${parseInt(p[2])} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(p[1])-1]}`;};
  const weekLabel=`${fmtShort(prevMondayStr)} – ${fmtShort(weekEnd)}`;

  return`<div style="background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:16px;margin-bottom:12px;position:relative">
    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:6px">Weekly Recap</div>
    <div style="font-size:9px;color:var(--text5);margin-bottom:10px">${weekLabel}</div>
    <div style="font-size:20px;font-weight:700;color:${headlineColor};margin-bottom:10px">${headline}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px">
        <div style="font-size:18px;font-weight:700;color:var(--text1);line-height:1">${sessions}</div>
        <div style="font-size:9px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px;margin-top:3px">Session${sessions!==1?'s':''}</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px">
        <div style="font-size:18px;font-weight:700;color:var(--text1);line-height:1">${fmtDur(totalMins)}</div>
        <div style="font-size:9px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px;margin-top:3px">Total time</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px">
        <div style="font-size:18px;font-weight:700;color:var(--text1);line-height:1">${activeDays}<span style="font-size:12px;color:var(--text4)">/7</span></div>
        <div style="font-size:9px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px;margin-top:3px">Active days</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px">
        <div style="font-size:18px;font-weight:700;color:${goalDays>0?'var(--green)':'var(--text4)'};line-height:1">${goalDays}<span style="font-size:12px;color:var(--text4)">/7</span></div>
        <div style="font-size:9px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px;margin-top:3px">Goal days hit</div>
      </div>
    </div>
    ${bestDayName?`<div style="font-size:11px;color:var(--text3);margin-bottom:6px">Best day: <strong style="color:var(--text2)">${bestDayName}</strong> — ${fmtDur(bestDay.mins)}</div>`:''}
    <div style="font-size:11px;color:var(--text4);line-height:1.6;border-top:1px solid var(--stat-border);padding-top:8px">${compLine}</div>
  </div>`;
}
function dismissWeeklySummary(){
  char.weeklySummaryDismissed=getMondayOf(today());
  saveChar();render();
}

// ── NEXT MILESTONE ─────────────────────────────────────────────────────────────
function buildNextMilestone(){
  // Find the closest upcoming achievement that has measurable progress
  const candidates=[];
  for(const a of ACHS){
    if(char.achievements.includes(a.id))continue;
    // Only include milestones we can show a progress bar for
    let current=0,target=0,label='';
    if(a.id.startsWith('s')){
      // Session count milestones
      const n=parseInt(a.id.slice(1));if(isNaN(n))continue;
      current=char.sessions;target=n;label=`sessions`;
    } else if(a.id.startsWith('h')){
      // Hour milestones — convert minutes to hours
      const n=parseInt(a.id.slice(1));if(isNaN(n))continue;
      current=Math.floor(char.minutes/60);target=n;label=`hours`;
    } else if(a.id.startsWith('str')){
      const n=parseInt(a.id.slice(3));if(isNaN(n))continue;
      current=char.streak;target=n;label=`day streak`;
    } else if(a.id.startsWith('goal')){
      const n=parseInt(a.id.slice(4));if(isNaN(n))continue;
      current=char.goalDays;target=n;label=`goal days`;
    } else if(a.id.startsWith('ci')){
      const n=parseInt(a.id.slice(2));if(isNaN(n))continue;
      current=char.ciLevel||0;target=n;label=`CI level`;
    } else if(a.id.startsWith('photo')){
      const n=parseInt(a.id.slice(5));if(isNaN(n))continue;
      current=photos.length;target=n;label=`photo${n!==1?'s':''}`;
    } else if(a.id.startsWith('meth')){
      const n=parseInt(a.id.slice(4));if(isNaN(n))continue;
      current=(char.methods||[]).length;target=n;label=`methods tried`;
    } else continue;
    if(target<=0||current>=target)continue;
    const remaining=target-current;
    const pct=Math.round((current/target)*100);
    candidates.push({a,current,target,remaining,pct,label});
  }
  if(!candidates.length)return'';
  // Sort by closest (highest pct complete)
  candidates.sort((a,b)=>b.pct-a.pct);
  const {a,current,target,remaining,pct,label}=candidates[0];
  const remainingStr=label==='hours'?`${remaining}h`:label==='CI level'?`${remaining} CI level${remaining!==1?'s':''}`:
    `${remaining} ${label}`;
  return`<div class="card" style="margin-bottom:9px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <div style="font-size:22px">${a.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:var(--text1)">${a.title}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">${remainingStr} to go · ${a.desc}</div>
      </div>
      <div style="font-family:Cinzel,serif;font-size:13px;font-weight:700;color:var(--accent);flex-shrink:0">${pct}%</div>
    </div>
    <div style="height:6px;background:var(--bg-stat);border-radius:3px;overflow:hidden">
      <div style="height:100%;border-radius:3px;background:linear-gradient(90deg,var(--acc18),var(--accent));width:${pct}%;transition:width .6s"></div>
    </div>
    <div style="font-size:9px;color:var(--text5);margin-top:4px;text-align:right">${current} / ${target} ${label}</div>
  </div>`;
}

// ── TODAY ──────────────────────────────────────────────────────────────────────
function renderToday(){
  const td=today(),tMin=todayMin(),tGoalMin=todayGoalMin(),goal=char.dailyGoalMin||120;
  const goalPct=Math.min(100,Math.round((tGoalMin/goal)*100));
  const tSess=todayLogs();
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;
  const isPaused=!!activeTimer&&!activeTimer.startedAt;
  const msg=coachMessage();currentCoachCTA=msg.cta;
  const timerBlock=isRunning?`<div class="card" style="border-color:var(--green-border);background:var(--green-bg);margin-bottom:9px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <div class="live-dot"></div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--green)">Session Active</div>
      <div style="font-size:10px;color:var(--text4);margin-top:1px">${activeTimer.method}</div>
      <div style="font-size:9px;color:var(--text5);margin-top:2px">${fmtWallStart(activeTimer.wallStart)}</div></div>
      <div style="font-family:Cinzel,serif;font-size:20px;font-weight:700;color:var(--green)" id="mc-run-time-3">${fmtLive(timerSecs)}</div>
    </div>
    <button id="stop-btn" class="btn-red" style="margin:0;padding:10px;font-size:13px">${IC.stop(14)} Stop Session</button>
  </div>`:isPaused?`<div class="card" style="border-color:var(--acc30);margin-bottom:9px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="font-size:16px">⏸</span>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--accent)">Session Paused</div>
      <div style="font-size:10px;color:var(--text4);margin-top:1px">${activeTimer.method} · ${fmtLive(timerSecs)}</div></div>
    </div>
    <div style="display:flex;gap:7px">
      <button id="resume-btn" class="btn-green" style="margin:0;padding:10px;font-size:13px;flex:1">${IC.play(14)} Resume</button>
      <button id="stop-btn" class="btn-red" style="margin:0;padding:10px;font-size:13px;flex:1">${IC.stop(14)} Save</button>
    </div>
  </div>`:'';
  // Live session card for Today's Sessions list (shows active session alongside completed ones)
  const liveSessionCard=isRunning?`
    <div style="display:flex;gap:10px;align-items:flex-start;background:var(--green-bg);border:1px solid var(--green-border);border-radius:10px;padding:10px;margin-bottom:7px">
      <div style="width:34px;height:34px;border-radius:8px;background:var(--green-bg);border:1px solid var(--green-border);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">${catFor(activeTimer.cat).icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--green)">${activeTimer.method}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">
          <span class="live-dot" style="margin-right:4px"></span>
          Running · <span id="mc-run-time-2">${fmtLive(timerSecs)}</span>
          ${timerSecs>=86400?` · ${Math.floor(timerSecs/86400)}d ${Math.floor((timerSecs%86400)/3600)}h today: ${fmtMin(liveTimerTodayMins())}`:''}
        </div>
      </div>
    </div>`:'';

  const sessHtml=(liveSessionCard||tSess.length)?
    liveSessionCard+tSess.map(l=>{const cat=catFor(l.cat);return`
    <div style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;padding:10px;margin-bottom:7px">
      <div style="width:34px;height:34px;border-radius:8px;background:${cat.color}18;border:1px solid ${cat.color}33;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">${cat.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.method}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">${fmtMin(l.dur)}${l.notes?' · '+l.notes.slice(0,45):''}</div>
      </div>
      <div style="display:flex;gap:4px;margin-top:2px;flex-shrink:0">
        <button class="edit-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.edit(12)}</button>
        <button class="del-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.x(13)}</button>
      </div>
    </div>`}).join('')
    :`<div class="empty">No sessions today yet.<br>Tap <strong>Start Session</strong> to begin.</div>`;

  // Last session summary (shown when no active timer and no sessions today)
  const lastLog=logs.find(l=>l.date!==td);
  const lastSessHtml=!activeTimer&&tSess.length===0&&lastLog?`
    <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;margin-bottom:9px;display:flex;align-items:center;gap:10px">
      <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:1px;flex-shrink:0">Last</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:11px;font-weight:600;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${lastLog.method}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">${fmtDate(lastLog.date)} · ${fmtMin(lastLog.dur)}</div>
      </div>
    </div>`:'';
  const lastMethod=char.lastMethod||null;
  const lastCat=char.lastCat||null;
  const quickLogBtn=lastMethod&&lastCat&&!activeTimer?`
    <button id="quick-start-btn" style="width:100%;background:var(--bg-card);border:1px solid var(--acc30);border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:7px;text-align:left;transition:border-color .2s">
      <span style="font-size:18px">${catFor(lastCat).icon}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--accent)">Quick Start</div>
        <div style="font-size:10px;color:var(--text4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${lastMethod}</div>
      </div>
      <span style="font-size:11px;color:var(--accent);font-weight:700">▶</span>
    </button>`:'';
  const weeklySummary=''; // Weekly Recap moved to Reports tab
  return`
  <div class="coach-card">
    <div style="display:flex;gap:10px;align-items:flex-start">
      <div class="coach-icon">${msg.icon}</div>
      <div style="flex:1">
        <div class="coach-label">Coach</div>
        <div class="coach-msg">${msg.msg}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:9px;flex-wrap:wrap">
          ${msg.cta?`<div class="coach-cta" id="coach-cta">${msg.cta==='log'?IC.plus(11)+' Log Session':msg.cta==='photos'?'📸 Add Photo':'→ Update CI'}</div>`:''}
          <div class="coach-cta" id="coach-talk-btn" style="background:var(--acc18);border-color:var(--acc45)">💬 Ask Coach</div>
        </div>
      </div>
    </div>
  </div>
  ${weeklySummary}
  <div class="card" style="margin-bottom:9px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <div style="font-family:Cinzel,serif;font-size:22px;font-weight:900;color:var(--accent);cursor:pointer" onclick="tab='journey';render()" title="Go to Journey">${LEVELS[char.ciLevel||0].ci}</div>
        <div style="font-size:10px;color:var(--text4)">Daily Goal</div>
      </div>
      <div style="display:flex;align-items:center;gap:5px">
        <input class="goal-inp" id="goal-inp" type="number" min="5" max="1440" value="${goal}">
        <span style="font-size:10px;color:var(--text4)">min</span>
      </div>
    </div>
    <div class="goal-bar"><div class="goal-fill ${goalPct>=100?'goal-fill-ok':'goal-fill-warn'}" style="width:${goalPct}%"></div></div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text4);margin-top:4px">
      <span data-live="goal-done">${fmtMin(tGoalMin)} done</span>
      <span data-live="goal-text">${goalPct>=100?'🎯 Goal reached!':fmtMin(Math.max(0,goal-tGoalMin))+' to go'}</span>
    </div>
    <div class="stats-grid-4" style="grid-template-columns:1fr 1fr;gap:10px">
      <div style="text-align:center;background:var(--bg-stat);border-radius:10px;padding:14px 4px">
        <span class="sg-val" style="font-size:clamp(18px,5vw,26px);color:${tGoalMin>0?'var(--accent)':'var(--text3)'}" data-live="today-min">${fmtMin(tGoalMin)}</span>
        <div style="font-size:9px;color:var(--text5);margin-top:5px;text-transform:uppercase;letter-spacing:.5px">Today</div>
      </div>
      <div style="text-align:center;background:var(--bg-stat);border-radius:10px;padding:14px 4px">
        <span class="sg-val" style="font-size:clamp(18px,5vw,26px);color:${char.streak>0?'#F59E0B':'var(--text3)'}">${char.streak>0?char.streak+'🔥':'—'}</span>
        <div style="font-size:9px;color:var(--text5);margin-top:5px;text-transform:uppercase;letter-spacing:.5px">Day Streak</div>
      </div>
    </div>
    </div>
  </div>
  ${timerBlock}
  ${quickLogBtn}
  ${!activeTimer?`<button id="start-session-btn" class="btn-gold" style="margin-bottom:7px">${IC.plus(14)} Start Session</button>`:''}
  <div style="display:flex;gap:6px;margin-bottom:12px">
    <button id="log-past-btn" class="btn-ghost" style="flex:1;font-size:11px;display:flex;align-items:center;justify-content:center;gap:4px;padding:10px 8px">${IC.edit(12)} Log Past</button>
    <button onclick="markRestDay()" style="flex:0 0 auto;background:${(char.restDays||[]).includes(td)?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${(char.restDays||[]).includes(td)?'var(--acc30)':'var(--stat-border)'};border-radius:10px;padding:10px 12px;color:${(char.restDays||[]).includes(td)?'var(--accent)':'var(--text3)'};font-size:11px;font-weight:600;cursor:pointer;font-family:DM Sans,sans-serif;white-space:nowrap">🛌 Rest Day</button>
    <div onclick="char.countRetainingInGoal=!char.countRetainingInGoal;saveChar();render()"
      style="flex:0 0 auto;display:flex;align-items:center;gap:8px;cursor:pointer;padding:6px 2px">
      <div style="font-size:11px;color:${char.countRetainingInGoal!==false?'var(--text4)':'#c0392b'};white-space:nowrap;line-height:1.3">${char.countRetainingInGoal!==false?'Retaining counts<br>toward goal':'Retaining excluded<br>from goal'}</div>
      <div style="position:relative;width:38px;height:22px;flex-shrink:0">
        <div style="width:38px;height:22px;border-radius:11px;background:${char.countRetainingInGoal!==false?'#22a85a':'#c0392b'};transition:background .25s;border:1px solid ${char.countRetainingInGoal!==false?'rgba(34,168,90,.6)':'rgba(192,57,43,.6)'}"></div>
        <div style="position:absolute;top:2px;left:${char.countRetainingInGoal!==false?'18':'2'}px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:left .25s"></div>
      </div>
    </div>
  </div>
  ${lastSessHtml}
  ${buildNextMilestone()}
  ${(liveSessionCard||tSess.length)?`
  <div class="sec-title" style="display:flex;align-items:center;justify-content:space-between">
    <span>Today's Sessions</span>
    <span style="font-size:9px;color:var(--text5);font-weight:400;text-transform:none;letter-spacing:0">${tSess.length} logged${tMin>0?' · '+fmtMin(tMin):''}</span>
  </div>
  ${sessHtml}`:''}`;
}

// ── CI JOURNEY TIMELINE ────────────────────────────────────────────────────────
function fmtJourneyDuration(startDateStr){
  if(!startDateStr)return'0 Days';
  const start=new Date(startDateStr+'T12:00:00'),now=new Date();
  let yr=now.getFullYear()-start.getFullYear();
  let mo=now.getMonth()-start.getMonth();
  let d=now.getDate()-start.getDate();
  if(d<0){mo--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
  if(mo<0){yr--;mo+=12;}
  const wk=Math.floor(d/7),rd=d%7;
  const p=[];
  if(yr>0)p.push(yr+(yr===1?' Year':' Years'));
  if(mo>0)p.push(mo+(mo===1?' Month':' Months'));
  if(wk>0)p.push(wk+(wk===1?' Week':' Weeks'));
  if(rd>0||p.length===0)p.push(rd+(rd===1?' Day':' Days'));
  return p.join(', ');
}

function renderCITimeline(){
  const ci=char.ciLevel||0;
  const startCI=char.startCI!==undefined?char.startCI:0;
  const startDate=char.startDate||today();
  const ciGoal=char.ciGoal||10;
  const rawHistory=char.ciHistory||[];

  // Build forward-progress-only nodes, preserving original ciHistory index
  const raw=[{ci:startCI,date:startDate,isStart:true,histIdx:-1}];
  rawHistory.forEach((h,i)=>raw.push({ci:h.ci,date:h.date,histIdx:i}));
  const fwd=[raw[0]];
  for(let i=1;i<raw.length;i++){
    if(raw[i].ci>fwd[fwd.length-1].ci)fwd.push(raw[i]);
  }
  // Reconcile with actual current CI — pop entries above it (user corrected down)
  while(fwd.length>1&&fwd[fwd.length-1].ci>ci)fwd.pop();
  // Ensure last fwd node matches actual current ci
  if(fwd[fwd.length-1].ci<ci){
    // Find the real history entry for current ci if it exists
    const real=rawHistory.find(h=>h.ci===ci);
    fwd.push(real
      ?{ci,date:real.date,histIdx:rawHistory.indexOf(real)}
      :{ci,date:today(),histIdx:-2}
    );
  }

  // ── Summary stats ──
  const durationStr=fmtJourneyDuration(startDate);
  const ciGained=ci-startCI;
  const curEntry=fwd[fwd.length-1];
  const daysAtCur=curEntry&&curEntry.date
    ?Math.max(0,Math.round((Date.now()-new Date(curEntry.date+'T12:00:00').getTime())/86400000)):0;
  const daysAtCurStr=daysAtCur>=365
    ?(Math.round(daysAtCur/365*10)/10)+'yr'
    :daysAtCur>=60?Math.round(daysAtCur/30.4)+'mo':daysAtCur+'d';
  const milestonesCount=Math.max(0,fwd.length-1);

  const summaryHtml=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:18px">
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px">
        <div style="font-family:Cinzel,serif;font-size:20px;font-weight:700;color:var(--accent);line-height:1">${ciGained>=0?'+':''}${ciGained}</div>
        <div style="font-size:8px;color:var(--text5);text-transform:uppercase;letter-spacing:.5px;margin-top:3px">CI Gained</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--accent);line-height:1.4">${durationStr}</div>
        <div style="font-size:8px;color:var(--text5);text-transform:uppercase;letter-spacing:.5px;margin-top:3px">Journey Duration</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px">
        <div style="font-family:Cinzel,serif;font-size:20px;font-weight:700;color:var(--accent);line-height:1">${daysAtCurStr}</div>
        <div style="font-size:8px;color:var(--text5);text-transform:uppercase;letter-spacing:.5px;margin-top:3px">At ${LEVELS[Math.min(ci,10)].ci}</div>
      </div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px">
        <div style="font-family:Cinzel,serif;font-size:20px;font-weight:700;color:var(--accent);line-height:1">${milestonesCount}</div>
        <div style="font-size:8px;color:var(--text5);text-transform:uppercase;letter-spacing:.5px;margin-top:3px">Milestone${milestonesCount!==1?'s':''}</div>
      </div>
    </div>`;

  // ── Horizontal stepper ──
  const CIRC_H=44,BADGE_H=16,LINE_MT=BADGE_H+CIRC_H/2-1;
  const NODE_W=68,LINE_W=20;
  const isGoalReached=ci>=ciGoal;
  const allNodes=[...fwd,{ci:ciGoal,date:null,isGoal:true}];

  const fmtND=d=>{
    if(!d)return'';
    try{return new Date(d+'T12:00:00').toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'});}
    catch{return'';}
  };

  const stepperHtml=allNodes.map((n,i)=>{
    const isGoalNode=!!n.isGoal;
    const isStartNode=!!n.isStart;
    // Current = last node before the goal
    const isCurrent=!isGoalNode&&i===allNodes.length-2;
    // Editable = has a real histIdx, is not start, not current, not goal
    const isEditable=!isGoalNode&&!isStartNode&&!isCurrent&&n.histIdx>=0;
    const hasLine=i<allNodes.length-1;

    const sz=isCurrent?42:32;
    let cBg,cBdr,cTxt,cShadow='none';
    if(isGoalNode){
      cBg=isGoalReached?'var(--green)':'var(--bg-stat)';
      cBdr=isGoalReached?'var(--green)':'var(--acc30)';
      cTxt=isGoalReached?'#fff':'var(--accent)';
    }else if(isCurrent){
      cBg='var(--accent)';cBdr='var(--accent)';cTxt='var(--bg)';
      cShadow='0 0 0 5px var(--acc12)';
    }else{
      cBg='var(--acc12)';cBdr='var(--acc30)';cTxt='var(--accent)';
    }

    const innerTxt=isGoalNode?(isGoalReached?'🏆':String(ciGoal)):String(n.ci);
    const fSz=isGoalNode&&isGoalReached?'14':(isCurrent?'13':'10');

    const mainLabel=isGoalNode
      ?(isGoalReached?'Reached!':'Goal')
      :isStartNode?'Start':LEVELS[Math.min(n.ci,10)].ci;
    const subLabel=isGoalNode
      ?(isGoalReached?fmtND(curEntry.date||today()):`${ciGoal-ci} lvl${(ciGoal-ci)!==1?'s':''} away`)
      :fmtND(n.date);

    const nextIsGoal=i===allNodes.length-2;
    const lineClr=nextIsGoal&&!isGoalReached?'var(--stat-border)':'var(--acc30)';

    // Badge row: NOW label for current, edit button for editable progress nodes
    const editBtnStyle=`background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:1px 6px;font-size:10px;color:var(--text4);cursor:pointer;font-family:'DM Sans',sans-serif;line-height:1.4;transition:all .15s`;
    const badgeContent=isCurrent
      ?`<span style="font-size:7px;font-weight:800;letter-spacing:.4px;color:var(--bg);background:var(--accent);border-radius:6px;padding:2px 6px;white-space:nowrap">NOW</span>`
      :isGoalReached&&isGoalNode
        ?`<span style="font-size:7px;font-weight:800;letter-spacing:.4px;color:var(--bg);background:var(--green);border-radius:6px;padding:2px 6px;white-space:nowrap">DONE</span>`
        :isEditable
          ?`<button onclick="editTimelineNode(${n.histIdx})" title="Edit milestone"
              style="${editBtnStyle}"
              onmouseover="this.style.borderColor='var(--acc30)';this.style.color='var(--accent)'"
              onmouseout="this.style.borderColor='var(--stat-border)';this.style.color='var(--text4)'">✎</button>`
          :isStartNode
            ?`<button onclick="editStartDate()" title="Edit start date"
                style="${editBtnStyle}"
                onmouseover="this.style.borderColor='var(--acc30)';this.style.color='var(--accent)'"
                onmouseout="this.style.borderColor='var(--stat-border)';this.style.color='var(--text4)'">✎</button>`
            :'';

    return`<div style="flex-shrink:0;width:${NODE_W}px;display:flex;flex-direction:column;align-items:center">
        <div style="height:${BADGE_H}px;display:flex;align-items:center;justify-content:center">
          ${badgeContent}
        </div>
        <div style="height:${CIRC_H}px;display:flex;align-items:center;justify-content:center">
          <div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${cBg};border:2px solid ${cBdr};display:flex;align-items:center;justify-content:center;font-family:Cinzel,serif;font-size:${fSz}px;font-weight:700;color:${cTxt};box-shadow:${cShadow};line-height:1;transition:all .3s">${innerTxt}</div>
        </div>
        <div style="font-size:9px;font-weight:700;color:${isCurrent?'var(--accent)':isGoalNode?(isGoalReached?'var(--green)':'var(--text4)'):'var(--text3)'};margin-top:5px;text-align:center;white-space:nowrap">${mainLabel}</div>
        <div style="font-size:8px;color:var(--text5);margin-top:1px;text-align:center;white-space:nowrap">${subLabel}</div>
      </div>
      ${hasLine?`<div style="flex-shrink:0;width:${LINE_W}px;height:2px;background:${lineClr};margin-top:${LINE_MT}px;align-self:flex-start;border-radius:1px"></div>`:''}`;
  }).join('');

  // Start date — formatted nicely for the header
  const startFmt=startDate?new Date(startDate+'T12:00:00').toLocaleDateString('en',{day:'numeric',month:'short',year:'numeric'}):'—';

  return`<div class="card" style="padding:16px;margin-bottom:10px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4)">CI Journey</div>
        <div style="font-size:9px;color:var(--text5);margin-top:1px">${LEVELS[startCI].ci} → ${LEVELS[ciGoal].ci}</div>
      </div>
      <button onclick="editStartDate()" title="Edit journey start date"
        style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:5px 10px;font-size:10px;color:var(--text4);cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:4px;transition:all .2s"
        onmouseover="this.style.borderColor='var(--acc30)';this.style.color='var(--accent)'"
        onmouseout="this.style.borderColor='var(--stat-border)';this.style.color='var(--text4)'">
        <span>Since ${startFmt}</span><span>✎</span>
      </button>
    </div>
    ${summaryHtml}
    <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding:2px 0 8px">
      <div style="display:flex;align-items:flex-start;padding:0 2px;width:max-content">
        ${stepperHtml}
      </div>
    </div>
  </div>`;
}

function editTimelineNode(histIdx){
  const entry=(char.ciHistory||[])[histIdx];
  if(!entry)return;
  const ex=document.getElementById('timeline-edit-ov');if(ex)ex.remove();
  window._tlEditCI=entry.ci;
  const ciGrid=Array.from({length:10},(_,i)=>i+1).map(v=>{
    const isSel=v===entry.ci;
    return`<button onclick="window._tlEditCI=${v};document.querySelectorAll('#timeline-edit-ov .tlci-btn').forEach(b=>{const s=+b.dataset.v===${v};b.style.background=s?'var(--accent)':'var(--bg-stat)';b.style.borderColor=s?'var(--accent)':'var(--stat-border)';b.style.color=s?'var(--bg)':'var(--text3)';})"
      class="tlci-btn" data-v="${v}"
      style="padding:9px 2px;border-radius:8px;font-family:Cinzel,serif;font-size:11px;font-weight:700;cursor:pointer;text-align:center;background:${isSel?'var(--accent)':'var(--bg-stat)'};border:1px solid ${isSel?'var(--accent)':'var(--stat-border)'};color:${isSel?'var(--bg)':'var(--text3)'}">${v}</button>`;
  }).join('');
  const el=document.createElement('div');el.className='overlay';el.id='timeline-edit-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:5px">Edit Milestone</div>
    <div style="font-size:11px;color:var(--text3);line-height:1.7;margin-bottom:14px">Correct the CI level or date for this recorded milestone.</div>
    <div class="sec-title">CI Level Reached</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:16px">${ciGrid}</div>
    <div class="sec-title">Date Reached</div>
    <input type="date" id="tl-date-inp" value="${entry.date}" max="${today()}"
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 14px;color:var(--accent);font-size:15px;font-weight:700;width:100%;outline:none;font-family:'DM Sans',sans-serif;margin-bottom:16px">
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" onclick="document.getElementById('timeline-edit-ov').remove()" style="flex:0 0 76px">Cancel</button>
      <button onclick="confirmDialog('Delete milestone?','This entry will be removed from your CI history. This cannot be undone.','Delete',()=>{deleteTimelineNode(${histIdx})})"
        style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">🗑</button>
      <button class="btn-gold" onclick="saveTimelineNode(${histIdx})" style="flex:1">✓ Save</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

function saveTimelineNode(histIdx){
  const dateVal=document.getElementById('tl-date-inp')?.value;
  if(!dateVal||!char.ciHistory[histIdx])return;
  char.ciHistory[histIdx]={...char.ciHistory[histIdx],ci:window._tlEditCI||char.ciHistory[histIdx].ci,date:dateVal};
  char.ciHistory.sort((a,b)=>a.date.localeCompare(b.date));
  saveChar();
  document.getElementById('timeline-edit-ov')?.remove();
  showToast('✓ Milestone updated');
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}

function deleteTimelineNode(histIdx){
  if(histIdx<0||histIdx>=char.ciHistory.length)return;
  char.ciHistory.splice(histIdx,1);
  saveChar();
  document.getElementById('timeline-edit-ov')?.remove();
  showToast('Milestone removed');
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}

function editStartDate(){
  const ex=document.getElementById('start-date-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='start-date-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:6px">Edit Start Date</div>
    <div style="font-size:11px;color:var(--text3);line-height:1.7;margin-bottom:14px">
      The date you began your restoration journey — used as the anchor for your entire CI timeline.
    </div>
    <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Start Date</div>
    <input type="date" id="sd-inp" value="${char.startDate||today()}" max="${today()}"
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 14px;color:var(--accent);font-size:15px;font-weight:700;width:100%;outline:none;font-family:'DM Sans',sans-serif;margin-bottom:16px">
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" onclick="document.getElementById('start-date-ov').remove()" style="flex:0 0 80px">Cancel</button>
      <button class="btn-gold" onclick="saveStartDate()" style="flex:1">✓ Save</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  document.getElementById('sd-inp')?.focus();
}

function saveStartDate(){
  const val=document.getElementById('sd-inp')?.value;
  if(!val)return;
  char.startDate=val;
  saveChar();
  document.getElementById('start-date-ov')?.remove();
  showToast('✓ Start date updated');
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}

// ── MILESTONE TOOLTIP TOGGLE ───────────────────────────────────────────────
function toggleMilestoneTooltip(idx){
  _activeMilestoneIdx=_activeMilestoneIdx===idx?null:idx;
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}

// ── MASTER GAUGE (Journey Tab Hero) ────────────────────────────────────────
function renderMasterGauge(){
  const ci=char.ciLevel||0;
  const startCI=char.startCI!==undefined?char.startCI:0;
  const ciGoal=char.ciGoal||10;
  const startDate=char.startDate||today();
  const ciHistory=char.ciHistory||[];

  const CX=160,CY=148,R=112;
  const START_DEG=148,TOTAL_DEG=244;
  const toRad=d=>d*Math.PI/180;
  const ciRange=Math.max(1,ciGoal-startCI);
  const ciToAngle=lv=>START_DEG+((Math.min(Math.max(lv,startCI),ciGoal)-startCI)/ciRange)*TOTAL_DEG;
  const angleXY=deg=>({x:+(CX+R*Math.cos(toRad(deg))).toFixed(1),y:+(CY+R*Math.sin(toRad(deg))).toFixed(1)});

  const goalPct=Math.min(100,Math.max(0,Math.round(((ci-startCI)/ciRange)*100)));
  const isGoalReached=ci>=ciGoal;

  // Build milestone chain — forward progress only, up to current CI
  const rawMs=[{ci:startCI,date:startDate,isStart:true,histIdx:-1}];
  ciHistory.forEach((h,i)=>rawMs.push({ci:h.ci,date:h.date,histIdx:i}));
  const chain=[rawMs[0]];
  for(let i=1;i<rawMs.length;i++){
    if(rawMs[i].ci>chain[chain.length-1].ci&&rawMs[i].ci<=ci) chain.push(rawMs[i]);
  }
  if(chain[chain.length-1].ci<ci){
    const real=[...ciHistory].reverse().find(h=>h.ci===ci);
    chain.push({ci,date:real?real.date:today(),histIdx:-2});
  }
  if(chain.length>0){chain[0].isStart=true;chain[chain.length-1].isCurrent=true;}

  // ── Track arc ──
  const SW_TRACK=20,SW_FILL=13;
  const arcS=START_DEG+0.8,arcE=START_DEG+TOTAL_DEG-0.8;
  const trackSVG=
    `<path d="${arcD(CX,CY,R,arcS,arcE)}" stroke="rgba(0,0,0,.3)" stroke-width="${SW_TRACK+4}" fill="none" stroke-linecap="round"/>`+
    `<path d="${arcD(CX,CY,R,arcS,arcE)}" stroke="var(--bg-stat)" stroke-width="${SW_TRACK}" fill="none" stroke-linecap="round"/>`;

  // ── Progress fill ──
  const fillEnd=ciToAngle(ci);
  const fillSVG=ci>startCI
    ?`<path d="${arcD(CX,CY,R,arcS,fillEnd)}" stroke="var(--accent)" stroke-width="${SW_TRACK}" fill="none" stroke-linecap="round" opacity=".1" class="gauge-fill-anim"/>`+
     `<path d="${arcD(CX,CY,R,arcS,fillEnd)}" stroke="var(--accent)" stroke-width="${SW_FILL}" fill="none" stroke-linecap="round" class="gauge-fill-anim"/>`
    :'';

  // ── Goal node ──
  const gPos=angleXY(ciToAngle(ciGoal));
  const goalSVG=
    `<circle cx="${gPos.x}" cy="${gPos.y}" r="13" fill="${isGoalReached?'var(--green)':'var(--bg-card)'}" stroke="${isGoalReached?'var(--green)':'var(--acc30)'}" stroke-width="2.5" style="${isGoalReached?'filter:drop-shadow(0 0 10px var(--green))':''}"/>`+
    `<text x="${gPos.x}" y="${(+gPos.y+5).toFixed(1)}" text-anchor="middle" font-size="13">${isGoalReached?'🏆':'⭐'}</text>`;

  // ── Milestone dots ──
  let dotsSVG='';
  chain.forEach((m,idx)=>{
    const ang=ciToAngle(m.ci);
    const p=angleXY(ang);
    const isCurrent=!!m.isCurrent;
    const isActive=_activeMilestoneIdx===idx;
    const dotR=isCurrent?9:6;
    dotsSVG+=
      `<g onclick="toggleMilestoneTooltip(${idx})" style="cursor:pointer">`+
        `<circle cx="${p.x}" cy="${p.y}" r="${dotR+9}" fill="transparent"/>`+
        (isCurrent?`<circle cx="${p.x}" cy="${p.y}" r="${dotR+5}" fill="var(--accent)" opacity=".15" class="milestone-pulse-ring"/>`:'')+
        `<circle cx="${p.x}" cy="${p.y}" r="${dotR}" fill="${isCurrent||isActive?'var(--accent)':'var(--bg-card)'}" stroke="var(--accent)" stroke-width="${isCurrent?2.5:isActive?2.5:1.8}" style="${isCurrent?'filter:drop-shadow(0 0 8px var(--accent))':isActive?'filter:drop-shadow(0 0 5px var(--accent))':''}"/>`+
        (isCurrent
          ?`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="var(--bg)"/>`
          :`<circle cx="${p.x}" cy="${p.y}" r="2" fill="${isActive?'var(--accent)':'var(--acc30)'}"/>`)+
      `</g>`;
  });

  // ── Center labels ──
  const centerSVG=
    `<circle cx="${CX}" cy="${CY}" r="86" fill="none" stroke="var(--accent)" stroke-width="1" opacity=".04"/>`+
    `<text x="${CX}" y="${CY-16}" text-anchor="middle" font-family="Cinzel,serif" font-size="60" font-weight="900" fill="var(--accent)" style="filter:drop-shadow(0 0 20px var(--acc18))">${ci}</text>`+
    `<text x="${CX}" y="${CY+14}" text-anchor="middle" font-family="Cinzel,serif" font-size="13" font-weight="700" fill="var(--text3)">${LEVELS[ci].ci}</text>`+
    `<text x="${CX}" y="${CY+33}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" font-weight="600" fill="${isGoalReached?'var(--green)':'var(--text4)'}">${isGoalReached?'Goal Reached ✓':goalPct+'% to Goal'}</text>`;

  // ── Arc-end labels ──
  const sPos=angleXY(ciToAngle(startCI));
  const startDateFmt=startDate?new Date(startDate+'T12:00:00').toLocaleDateString('en',{month:'short',year:'numeric'}):'';
  const edgeSVG=
    `<text x="${sPos.x}" y="${(+sPos.y+20).toFixed(1)}" text-anchor="middle" font-family="Cinzel,serif" font-size="9" font-weight="700" fill="var(--text4)">CI-${startCI}</text>`+
    `<text x="${sPos.x}" y="${(+sPos.y+31).toFixed(1)}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7.5" fill="var(--text5)">${startDateFmt}</text>`+
    `<text x="${gPos.x}" y="${(+gPos.y+20).toFixed(1)}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="${isGoalReached?'var(--green)':'var(--text5)'}">Goal CI-${ciGoal}</text>`;

  // ── Active milestone info strip (HTML below SVG) ──
  let infoStrip='';
  if(_activeMilestoneIdx!==null&&chain[_activeMilestoneIdx]){
    const m=chain[_activeMilestoneIdx];
    const dateStr=m.date?new Date(m.date+'T12:00:00').toLocaleDateString('en',{weekday:'short',month:'long',day:'numeric',year:'numeric'}):'Unknown date';
    const nodeLabel=m.isStart&&_activeMilestoneIdx===0?'Journey Started':m.isCurrent?'Current Level':'Level Reached';
    const canEdit=(m.histIdx>=0)||!!m.isStart;
    const editFn=m.isStart?`editStartDate()`:`editTimelineNode(${m.histIdx})`;
    infoStrip=`
      <div style="margin:12px 0 0;display:flex;align-items:center;gap:10px;background:var(--acc6);border:1px solid var(--acc30);border-radius:10px;padding:10px 14px;animation:fadeSlideUp .2s ease">
        <div style="font-family:Cinzel,serif;font-size:16px;font-weight:700;color:var(--accent);flex-shrink:0">CI-${m.ci}</div>
        <div style="width:1px;height:28px;background:var(--acc30);flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">${nodeLabel}</div>
          <div style="font-size:11px;color:var(--text2);font-weight:600">${dateStr}</div>
        </div>
        ${canEdit?`<button onclick="${editFn}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;padding:5px 10px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;flex-shrink:0">✎ Edit</button>`:''}
        <button onclick="toggleMilestoneTooltip(${_activeMilestoneIdx})" style="background:none;border:none;font-size:16px;color:var(--text4);cursor:pointer;flex-shrink:0;line-height:1;padding:0 2px">×</button>
      </div>`;
  }

  // ── Stats cluster ──
  const durationStr=fmtJourneyDuration(startDate);
  const ciGained=Math.max(0,ci-startCI);
  const totalHours=Math.floor(char.minutes/60);
  const statsHTML=`
    <div class="gauge-stats-cluster">
      <div class="gauge-stat">
        <div class="gauge-stat-val" style="color:${ciGained>0?'var(--green)':'var(--text3)'}">${ciGained>0?'+':''}${ciGained}</div>
        <div class="gauge-stat-label">Levels Gained</div>
      </div>
      <div class="gauge-stat-div"></div>
      <div class="gauge-stat">
        <div class="gauge-stat-val">${durationStr.split(',')[0]||'—'}</div>
        <div class="gauge-stat-label">Journey</div>
      </div>
      <div class="gauge-stat-div"></div>
      <div class="gauge-stat">
        <div class="gauge-stat-val">${totalHours>0?totalHours+'h':char.sessions+'×'}</div>
        <div class="gauge-stat-label">Logged</div>
      </div>
    </div>`;

  return`
    <svg viewBox="0 0 320 265" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto;overflow:visible">
      ${trackSVG}
      ${fillSVG}
      ${goalSVG}
      ${dotsSVG}
      ${centerSVG}
      ${edgeSVG}
    </svg>
    ${infoStrip}
    ${statsHTML}`;
}

function renderJourney(){
  const ci=char.ciLevel||0;
  if(expandedCIRef.size===0)expandedCIRef.add(ci);
  const isOnboarding=!(char.ciHistory||[]).length&&char.sessions===0&&ci===0&&!char.ciSetupDone;

  const heroCard=isOnboarding
    ?`<div class="card card-gold" style="padding:32px 20px 28px;text-align:center;margin-bottom:10px">
        <div style="font-size:52px;margin-bottom:16px;opacity:.45">◉</div>
        <div style="font-family:Cinzel,serif;font-size:17px;color:var(--accent);margin-bottom:10px;letter-spacing:1px">Begin Your Journey</div>
        <div style="font-size:12px;color:var(--text3);line-height:1.9;margin-bottom:20px">Set your starting and goal CI levels to<br>activate your personal progress gauge.</div>
        <button class="ci-set-btn" id="update-ci-btn" style="font-size:13px;padding:10px 28px">Set Your CI Levels</button>
      </div>`
    :`<div class="card card-gold" style="padding:20px 14px 18px;margin-bottom:10px">
        ${renderMasterGauge()}
        <div style="text-align:center;margin-top:16px">
          <button class="ci-set-btn" id="update-ci-btn" style="font-size:12px;padding:7px 22px">✎ Update CI Level</button>
        </div>
      </div>`;

  const cumulativeLine=char.minutes>0
    ?`<div style="background:var(--acc6);border:1px solid var(--acc18);border-radius:10px;padding:9px 14px;margin-bottom:9px;font-size:11px;color:var(--text2);line-height:1.6">
        <strong style="color:var(--accent)">${fmtDur(char.minutes)}</strong> logged across <strong style="color:var(--text1)">${char.sessions}</strong> session${char.sessions!==1?'s':''}${char.streak>1?` · <strong style="color:#F59E0B">${char.streak}-day streak 🔥</strong>`:''}
      </div>`:'' ;

  const refGuide=LEVELS.map((l,i)=>{
    const isActive=i===ci;
    const isExpanded=expandedCIRef.has(i);
    return`<div style="border-bottom:1px solid var(--stat-border);${i===LEVELS.length-1?'border-bottom:none':''}">
      <button onclick="toggleCIRef(${i})" style="width:100%;display:flex;align-items:center;gap:8px;padding:9px 0;background:none;border:none;cursor:pointer;text-align:left;font-family:'DM Sans',sans-serif">
        <div style="font-family:Cinzel,serif;font-size:11px;font-weight:700;color:${isActive?'var(--accent)':'var(--text4)'};width:36px;flex-shrink:0">${l.ci}</div>
        <div style="flex:1;font-size:11px;color:${isActive?'var(--text2)':'var(--text4)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${i===0?'Starting point — no loose skin present':l.soft?l.soft.slice(0,50)+(l.soft.length>50?'…':''):''}
        </div>
        ${isActive?`<span style="font-size:9px;background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:2px 7px;color:var(--accent);flex-shrink:0">YOU</span>`:''}
        <span style="font-size:11px;color:var(--text5);flex-shrink:0;display:inline-block;transform:rotate(${isExpanded?'180':'0'}deg);transition:transform .2s">▾</span>
      </button>
      ${isExpanded?`<div style="padding:0 0 10px 44px"><div style="font-size:11px;color:var(--text2);line-height:1.7">${ciDesc(l)}</div></div>`:''}
    </div>`;
  }).join('');

  return`<div class="journey-tab">
    ${heroCard}
    ${cumulativeLine}
    <div class="sec-title">CI Reference</div>
    <div class="card" style="padding:4px 12px">${refGuide}</div>
  </div>`;
}

function toggleCIRef(i){
  if(expandedCIRef.has(i))expandedCIRef.delete(i);
  else expandedCIRef.add(i);
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}
// ── PHOTOS ─────────────────────────────────────────────────────────────────────
let compareA=null,compareB=null;
let expandedEras=new Set(); // tracks which era keys are expanded

function groupPhotosIntoEras(sortedPhotos){
  // Groups photos with ≤30 day gaps into eras, newest first
  if(!sortedPhotos.length)return[];
  const eras=[];
  let current=[sortedPhotos[0]];
  for(let i=1;i<sortedPhotos.length;i++){
    const prev=new Date(sortedPhotos[i-1].date+'T12:00:00');
    const curr=new Date(sortedPhotos[i].date+'T12:00:00');
    const dayGap=Math.round((prev-curr)/86400000);
    if(dayGap<=30){
      current.push(sortedPhotos[i]);
    } else {
      eras.push(current);
      current=[sortedPhotos[i]];
    }
  }
  eras.push(current);
  return eras;
}

function eraLabel(photos){
  // Newest and oldest date in era
  const dates=photos.map(p=>p.date).sort();
  const oldest=dates[0],newest=dates[dates.length-1];
  const oldDt=new Date(oldest+'T12:00:00');
  const newDt=new Date(newest+'T12:00:00');
  const fmt=(d,showYear)=>d.toLocaleDateString('en',{month:'short',...(showYear?{year:'numeric'}:{})});
  if(oldest===newest)return fmt(oldDt,true);
  if(oldDt.getFullYear()!==newDt.getFullYear())
    return`${fmt(oldDt,true)} – ${fmt(newDt,true)}`;
  if(oldDt.getMonth()!==newDt.getMonth())
    return`${fmt(oldDt,false)} – ${fmt(newDt,true)}`;
  return fmt(oldDt,true);
}

function eraKey(era){
  return era.map(p=>p.id).join('-');
}

function eraCI(era){
  // CI range across the era
  const cis=era.map(p=>parseInt(p.ci.replace('CI-',''))).filter(n=>!isNaN(n));
  if(!cis.length)return'';
  const mn=Math.min(...cis),mx=Math.max(...cis);
  return mn===mx?`CI-${mn}`:`CI-${mn} → CI-${mx}`;
}

function toggleEra(key){
  if(expandedEras.has(key))expandedEras.delete(key);
  else expandedEras.add(key);
  // Re-render just the photos tab content without full render
  const c=document.getElementById('content');
  if(c&&tab==='photos'){c.innerHTML=renderPhotos();attachEvents();}
}

function renderPhotos(){
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  const eras=groupPhotosIntoEras(sorted);

  const eraHtml=eras.length?eras.map(era=>{
    const key=eraKey(era);
    const isExpanded=expandedEras.has(key);
    const label=eraLabel(era);
    const ciRange=eraCI(era);
    const count=era.length;

    // Fan thumbnail — show up to 3 photos stacked/fanned
    const fanPhotos=era.slice(0,3);
    const fanHtml=`<div style="position:relative;width:72px;height:72px;flex-shrink:0">
      ${fanPhotos.map((p,i)=>{
        const rot=fanPhotos.length===1?0:i===0?-6:i===1?0:6;
        const tx=fanPhotos.length===1?0:i===0?-4:i===1?0:4;
        const z=i+1;
        return`<div style="position:absolute;inset:0;border-radius:8px;overflow:hidden;border:2px solid var(--bg-card);
          transform:rotate(${rot}deg) translateX(${tx}px);z-index:${z};box-shadow:0 2px 6px rgba(0,0,0,.3)">
          <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
        </div>`;
      }).join('')}
      ${count>3?`<div style="position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,.7);border-radius:10px;padding:1px 6px;font-size:9px;font-weight:700;color:#fff;z-index:10">+${count-3}</div>`:''}
    </div>`;

    // Expanded photo list — build era ID list for swipe context
    const eraIds=era.map(p=>p.id);
    const expandedHtml=isExpanded?`<div style="margin-top:12px;border-top:1px solid var(--stat-border);padding-top:12px;display:flex;flex-direction:column;gap:12px">
      ${era.map(p=>`
        <div style="display:flex;gap:8px;align-items:flex-start">
          <div style="width:72px;height:72px;border-radius:8px;overflow:hidden;flex-shrink:0;border:1px solid var(--stat-border);cursor:pointer"
            onclick="openPhotoViewer(photos.find(x=>x.id===${p.id}),[${eraIds.join(',')}].map(id=>photos.find(x=>x.id===id)).filter(Boolean))">
            <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
          </div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
              <span style="font-family:Cinzel,serif;font-size:10px;font-weight:700;color:var(--accent)">${p.ci}</span>
              <span style="font-size:10px;color:var(--text5)">${fmtDate(p.date)}</span>
            </div>
            ${p.note?`<div style="font-size:10px;color:var(--text4);font-style:italic;line-height:1.5">${p.note}</div>`:''}
            <button class="del-btn" onclick="confirmDialog('Delete this photo?','This photo will be permanently removed. This cannot be undone.','Delete',()=>deletePhoto(${p.id}))" style="margin-top:6px">Delete</button>
          </div>
        </div>`).join('')}
    </div>`:'' ;

    return`<div style="background:var(--bg-card);border:1px solid var(--card-border);border-radius:12px;padding:12px;margin-bottom:9px">
      <div style="display:flex;gap:12px;align-items:center;cursor:pointer" onclick="toggleEra('${key}')">
        ${fanHtml}
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--text1);margin-bottom:3px">${label}</div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            ${ciRange?`<span style="font-family:Cinzel,serif;font-size:10px;color:var(--accent)">${ciRange}</span>`:''}
            <span style="font-size:10px;color:var(--text4)">${count} photo${count!==1?'s':''}</span>
          </div>
        </div>
        <div style="font-size:18px;color:var(--text4);flex-shrink:0;transition:transform .2s;transform:rotate(${isExpanded?'90':'0'}deg)">›</div>
      </div>
      ${expandedHtml}
    </div>`;
  }).join(''):`<div class="empty">No progress photos yet.<br>Tap the button above to add your first.</div>`;

  const lastPhoto=sorted[0];
  const daysSincePhoto=lastPhoto?Math.round((new Date()-new Date(lastPhoto.date+'T12:00:00'))/86400000):-1;
  const photoNudge=daysSincePhoto>=30?`<div style="background:var(--acc6);border:1px solid var(--acc18);border-radius:10px;padding:10px 12px;margin-bottom:9px;font-size:11px;color:var(--text2);line-height:1.6">
    📅 It's been <strong>${daysSincePhoto} days</strong> since your last photo. A comparison shot now would be a great record of your progress.
  </div>`:daysSincePhoto===-1?`<div style="background:var(--acc6);border:1px solid var(--acc18);border-radius:10px;padding:10px 12px;margin-bottom:9px;font-size:11px;color:var(--text2);line-height:1.6">
    💡 A baseline photo today gives you something real to compare against months from now. It's one of the most motivating things you can do.
  </div>`:'';

  const compareBtn=photos.length>=2
    ?`<button class="btn-ghost" id="open-compare-btn" style="width:100%;margin-bottom:8px;font-size:12px">⟷ Compare Two Photos</button>`
    :'';

  return`
  ${photoNudge}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
    <button class="btn-gold" id="open-photo-guide-btn">📷 Take Photo</button>
    <button class="btn-ghost" id="open-photo-library-btn" style="font-size:13px">🖼 Choose Existing</button>
  </div>
  ${compareBtn}
  <input type="file" id="photo-file" accept="image/*" capture="environment" style="display:none">
  <input type="file" id="photo-file-library" accept="image/*" multiple style="display:none">
  <div class="sec-title">Photo Timeline</div>
  <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;margin-bottom:10px;font-size:11px;color:var(--text4);line-height:1.7">
    🔒 <strong style="color:var(--text3)">Your photos are stored only on this device.</strong> They are never uploaded, synced, or shared anywhere. Only you can see them — even we can't access them.
  </div>
  ${eraHtml}`;
}

// ── PHOTO GUIDE SHEET ──────────────────────────────────────────────────────────
let photoGuideStep=1;
let pendingPhotoData=null;
let pendingPhotoCI=null;
let photoQueue=[]; // [{data, fileName}] for multi-select batch tagging

function mountPhotoGuideSheet(){
  const ex=document.getElementById('photo-guide-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='photo-guide-ov';

  if(photoGuideStep===1){
    el.innerHTML=`<div class="sheet">
      <div class="sheet-handle"></div>
      <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:4px">Progress Photo</div>
      <div style="font-size:11px;color:var(--text4);margin-bottom:16px">Consistent photos are the clearest way to see your progress. Before you shoot:</div>

      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">
        <div style="display:flex;gap:11px;align-items:flex-start;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px">
          <span style="font-size:18px;flex-shrink:0">📏</span>
          <div><div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:2px">Same distance every time</div>
          <div style="font-size:11px;color:var(--text4)">Arm's length works well. Consistent distance makes comparisons accurate.</div></div>
        </div>
        <div style="display:flex;gap:11px;align-items:flex-start;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px">
          <span style="font-size:18px;flex-shrink:0">🎯</span>
          <div><div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:2px">Straight-on angle</div>
          <div style="font-size:11px;color:var(--text4)">Camera level, pointing straight at the subject. Avoid angles that exaggerate or hide coverage.</div></div>
        </div>
        <div style="display:flex;gap:11px;align-items:flex-start;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px">
          <span style="font-size:18px;flex-shrink:0">💡</span>
          <div><div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:2px">Good, even lighting</div>
          <div style="font-size:11px;color:var(--text4)">Natural light or a well-lit room. Avoid harsh shadows — they make coverage look different than it is.</div></div>
        </div>
        <div style="display:flex;gap:11px;align-items:flex-start;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px">
          <span style="font-size:18px;flex-shrink:0">🔁</span>
          <div><div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:2px">Flaccid state</div>
          <div style="font-size:11px;color:var(--text4)">CI levels are assessed while flaccid. Take your photo in a relaxed state for accurate comparison.</div></div>
        </div>
      </div>

      <div style="display:flex;gap:8px">
        <button class="btn-ghost" id="photo-guide-cancel" style="flex:0 0 80px">Cancel</button>
        <button class="btn-gold" id="photo-guide-shoot" style="flex:1">📷 Open Camera</button>
        <button class="btn-ghost" id="photo-guide-library" style="flex:1">🖼 Library</button>
      </div>
    </div>`;
    document.getElementById('root').appendChild(el);
    document.getElementById('photo-guide-cancel').onclick=()=>{photoGuideStep=1;el.remove();};
    document.getElementById('photo-guide-shoot').onclick=()=>{document.getElementById('photo-file').click();};
    document.getElementById('photo-guide-library').onclick=()=>{document.getElementById('photo-file-library').click();};

  } else if(photoGuideStep===2){
    if(!pendingPhotoCI)pendingPhotoCI=LEVELS[char.ciLevel||0].ci;

    // Queue state — which photo are we on?
    const queueTotal=photoQueue.length;
    const queueIdx=queueTotal>0?photoQueue.findIndex(q=>q.data===pendingPhotoData):0;
    const isQueued=queueTotal>1;
    const isLast=!isQueued||queueIdx===queueTotal-1;

    const ciCards=LEVELS.map((l,i)=>{
      const isSel=pendingPhotoCI===l.ci;
      return`<div data-pci="${l.ci}" onclick="pendingPhotoCI='${l.ci}';document.querySelectorAll('#photo-guide-ov .pci-card').forEach(c=>{const s=c.dataset.pci===pendingPhotoCI;c.style.background=s?'var(--acc12)':'var(--bg-stat)';c.style.borderColor=s?'var(--acc30)':'var(--stat-border)';c.querySelector('.pci-label').style.color=s?'var(--accent)':'var(--text3)';c.querySelector('.pci-check').textContent=s?'✓':'';c.querySelector('.pci-check').style.background=s?'var(--accent)':'transparent';c.querySelector('.pci-check').style.borderColor=s?'var(--accent)':'var(--stat-border)';})"
        class="pci-card" style="background:${isSel?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isSel?'var(--acc30)':'var(--stat-border)'};border-radius:10px;padding:9px 11px;cursor:pointer;margin-bottom:6px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
          <div class="pci-label" style="font-family:Cinzel,serif;font-size:12px;font-weight:700;color:${isSel?'var(--accent)':'var(--text3)'}">${l.ci}</div>
          <div class="pci-check" style="width:15px;height:15px;border-radius:50%;border:2px solid ${isSel?'var(--accent)':'var(--stat-border)'};background:${isSel?'var(--accent)':'transparent'};display:flex;align-items:center;justify-content:center;font-size:8px;color:var(--bg);flex-shrink:0">${isSel?'✓':''}</div>
        </div>
        <div style="font-size:10px;color:var(--text4);line-height:1.6">${ciDesc(l)}</div>
      </div>`;
    }).join('');

    el.innerHTML=`<div class="sheet" style="max-height:88vh">
      <div class="sheet-handle"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent)">Tag Your Photo</div>
        ${isQueued?`<div style="font-size:11px;color:var(--text4);background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:3px 10px">${queueIdx+1} of ${queueTotal}</div>`:''}
      </div>

      ${isQueued?`<div style="height:4px;background:var(--bg-stat);border-radius:2px;overflow:hidden;margin-bottom:12px">
        <div style="height:100%;background:var(--accent);border-radius:2px;width:${Math.round(((queueIdx+1)/queueTotal)*100)}%;transition:width .3s"></div>
      </div>`:''}

      <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:12px">
        <img src="${pendingPhotoData}" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid var(--acc30);flex-shrink:0" alt="Preview">
        <div style="font-size:10px;color:var(--text4);line-height:1.7;padding-top:2px">Select the CI level that best matches this photo. Date it correctly if it was taken in the past.</div>
      </div>

      <div style="max-height:32vh;overflow-y:auto;padding-right:2px;margin-bottom:12px">${ciCards}</div>

      <div style="margin-bottom:10px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Photo date</div>
        <input type="date" id="photo-date-inp" value="${today()}" max="${today()}"
          style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 10px;color:var(--accent);font-size:14px;font-weight:600;width:100%;outline:none;font-family:'DM Sans',sans-serif">
        <div style="font-size:9px;color:var(--text5);margin-top:4px">Change this for older photos.</div>
      </div>

      <input type="text" id="photo-note-inp" placeholder="Optional note — method, how long in, anything relevant..." style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 11px;color:var(--text1);font-size:12px;width:100%;outline:none;font-family:'DM Sans',sans-serif;margin-bottom:12px">

      <div style="display:flex;gap:8px">
        <button class="btn-ghost" id="photo-cancel-queue" style="flex:0 0 80px">${isQueued?'Cancel all':'↺ Retake'}</button>
        <button class="btn-gold" id="photo-confirm-save" style="flex:1">${isLast?'Save to Timeline':'Save & Next →'}</button>
      </div>
    </div>`;
    document.getElementById('root').appendChild(el);

    document.getElementById('photo-cancel-queue').onclick=()=>{
      // Cancel — clear queue and go back
      photoQueue=[];
      photoGuideStep=1;pendingPhotoData=null;pendingPhotoCI=null;
      el.remove();
      if(!isQueued)mountPhotoGuideSheet(); // single photo — back to guide
      // multi — just close, user can restart
    };
    document.getElementById('photo-confirm-save').onclick=async ()=>{
      const btn=document.getElementById('photo-confirm-save');
      if(btn){btn.disabled=true;btn.textContent='Saving…';}
      const note=document.getElementById('photo-note-inp')?.value||'';
      const dateVal=document.getElementById('photo-date-inp')?.value||today();
      if(!pendingPhotoData||!pendingPhotoCI){if(btn)btn.disabled=false;return;}

      // Compress this photo now (works for both single and queue)
      let comp=await compressPhoto(pendingPhotoData,1200,0.72);
      if(dataUrlSizeKB(comp)>150)comp=await compressPhoto(pendingPhotoData,900,0.60);
      if(dataUrlSizeKB(comp)>150)comp=await compressPhoto(pendingPhotoData,700,0.50);
      if(dataUrlSizeKB(comp)>150)comp=await compressPhoto(pendingPhotoData,600,0.42);

      if(isQueued&&!isLast){
        // Stage this photo in memory only — do NOT save to IDB, do NOT call render()
        // (calling render() here would destroy the guide sheet for the next photo)
        photoQueue[queueIdx].staged={ci:pendingPhotoCI,date:dateVal,url:comp,note,id:Date.now()};
        const nextIdx=queueIdx+1;
        pendingPhotoData=photoQueue[nextIdx].data;
        pendingPhotoCI=LEVELS[char.ciLevel||0].ci;
        el.remove();
        mountPhotoGuideSheet();
      } else {
        // Last photo (or single photo) — collect all staged + this one, save in one batch
        const lastPhoto={ci:pendingPhotoCI,date:dateVal,url:comp,note,id:Date.now()};
        const allNew=isQueued
          ?[...photoQueue.filter(q=>q.staged).map(q=>q.staged),lastPhoto]
          :[lastPhoto];
        photos=[...allNew,...photos];
        try{
          await PhotoDB.save(currentPid,photos);
          recalcAchievements();
          const count=allNew.length;
          showToast(`📸 ${count>1?count+' photos saved to timeline!':'Photo saved to timeline!'}`);
        }catch(e){
          const newIds=new Set(allNew.map(p=>p.id));
          photos=photos.filter(p=>!newIds.has(p.id));
          showToast('⚠ Photo(s) could not be saved');
          console.warn('[RT] batch photo save error',e);
        }
        photoQueue=[];
        photoGuideStep=1;pendingPhotoData=null;pendingPhotoCI=null;
        el.remove();
        tab='photos';render();
      }
    };
  }
}

// ── COMPARE PICKER ─────────────────────────────────────────────────────────────
function openComparePicker(){
  const ex=document.getElementById('compare-pick-ov');if(ex)ex.remove();
  compareA=null;compareB=null;
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  const el=document.createElement('div');el.className='overlay';el.id='compare-pick-ov';

  const thumbs=sorted.map(p=>`
    <div id="cpt-${p.id}" onclick="comparePickTap(${p.id})"
      style="cursor:pointer;border-radius:8px;overflow:hidden;position:relative;border:2px solid transparent;transition:border-color .15s;aspect-ratio:1">
      <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);padding:3px 5px;font-size:9px;font-family:Cinzel,serif;color:#fff;text-align:center">${p.ci}<br><span style="font-size:8px;opacity:.8;font-family:DM Sans,sans-serif">${p.date}</span></div>
      <div id="cpt-badge-${p.id}" style="display:none;position:absolute;top:4px;right:4px;background:var(--accent);color:var(--bg);border-radius:50%;width:20px;height:20px;font-size:11px;font-weight:700;display:none;align-items:center;justify-content:center;font-family:Cinzel,serif"></div>
    </div>`).join('');

  el.innerHTML=`<div class="sheet" style="max-height:85vh">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:4px">Compare Photos</div>
    <div style="font-size:11px;color:var(--text4);margin-bottom:12px" id="compare-instr">Tap to select your <strong style="color:var(--text2)">first</strong> photo (Before)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;overflow-y:auto;max-height:52vh;padding:2px">${thumbs}</div>
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn-ghost" id="compare-cancel-btn" style="flex:0 0 80px">Cancel</button>
      <button class="btn-gold" id="compare-go-btn" style="flex:1" disabled>Compare</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('compare-cancel-btn').onclick=()=>el.remove();
  document.getElementById('compare-go-btn').onclick=()=>{
    if(compareA&&compareB){el.remove();openCompareViewer();}
  };
}

function comparePickTap(id){
  const photo=photos.find(p=>p.id===id);if(!photo)return;
  if(compareA&&compareA.id===id){
    // deselect A
    compareA=null;
    updateComparePickUI();return;
  }
  if(compareB&&compareB.id===id){
    compareB=null;
    updateComparePickUI();return;
  }
  if(!compareA){compareA=photo;}
  else if(!compareB&&id!==compareA.id){compareB=photo;}
  updateComparePickUI();
}

function updateComparePickUI(){
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  sorted.forEach(p=>{
    const el=document.getElementById(`cpt-${p.id}`);
    const badge=document.getElementById(`cpt-badge-${p.id}`);
    if(!el)return;
    const isA=compareA&&compareA.id===p.id;
    const isB=compareB&&compareB.id===p.id;
    el.style.borderColor=isA?'var(--accent)':isB?'#22a85a':'transparent';
    if(badge){
      if(isA){badge.style.display='flex';badge.textContent='A';}
      else if(isB){badge.style.display='flex';badge.textContent='B';}
      else badge.style.display='none';
    }
  });
  const instr=document.getElementById('compare-instr');
  const goBtn=document.getElementById('compare-go-btn');
  if(!compareA&&!compareB&&instr)instr.innerHTML='Tap to select your <strong style="color:var(--text2)">first</strong> photo (Before)';
  else if(compareA&&!compareB&&instr)instr.innerHTML='Now select your <strong style="color:var(--text2)">second</strong> photo (After)';
  else if(compareA&&compareB&&instr)instr.innerHTML='Ready to compare — tap <strong style="color:var(--text2)">Compare</strong>';
  if(goBtn)goBtn.disabled=!(compareA&&compareB);
}

function openCompareViewer(){
  const ex=document.getElementById('compare-view-ov');if(ex)ex.remove();
  let a=compareA,b=compareB;
  // Sort so older = left by default
  if(a.date>b.date){const tmp=a;a=b;b=tmp;}

  function buildViewer(pA,pB){
    const el=document.getElementById('compare-view-ov');
    if(!el)return;
    const diffDays=Math.abs(Math.round((new Date(pB.date)-new Date(pA.date))/86400000));
    const diffMonths=Math.round(diffDays/30.4);
    const span=diffMonths>=2?`${diffMonths} months apart`:diffDays===0?'Same day':`${diffDays} days apart`;
    const ciA=parseInt(pA.ci.replace('CI-',''));
    const ciB=parseInt(pB.ci.replace('CI-',''));
    const ciChange=ciB-ciA;
    const ciNote=ciChange>0?`<span style="color:#22a85a;font-weight:600">+${ciChange} CI level${ciChange>1?'s':''}</span>`:ciChange<0?`<span style="color:#c0392b">${ciChange} CI</span>`:`<span style="color:var(--text4)">Same CI</span>`;

    el.querySelector('.compare-inner').innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 4px">
        <div style="font-family:Cinzel,serif;font-size:13px;color:var(--accent)">Progress Comparison</div>
        <button onclick="document.getElementById('compare-view-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:4px 12px;color:var(--text3);font-size:11px;cursor:pointer;font-family:DM Sans,sans-serif">Close</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div>
          <div style="background:var(--bg-stat);border-radius:10px;border:2px solid var(--acc30);overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:140px">
            <img src="${pA.url}" style="width:100%;height:auto;max-height:200px;object-fit:contain;display:block" alt="${pA.ci}">
          </div>
          <div style="text-align:center;margin-top:5px">
            <div style="font-family:Cinzel,serif;font-size:13px;font-weight:700;color:var(--accent)">${pA.ci}</div>
            <div style="font-size:10px;color:var(--text4)">${fmtDate(pA.date)}</div>
            ${pA.note?`<div style="font-size:9px;color:var(--text5);font-style:italic;margin-top:2px">${pA.note.slice(0,30)}</div>`:''}
          </div>
        </div>
        <div>
          <div style="background:var(--bg-stat);border-radius:10px;border:2px solid var(--green-border,rgba(34,168,90,.4));overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:140px">
            <img src="${pB.url}" style="width:100%;height:auto;max-height:200px;object-fit:contain;display:block" alt="${pB.ci}">
          </div>
          <div style="text-align:center;margin-top:5px">
            <div style="font-family:Cinzel,serif;font-size:13px;font-weight:700;color:var(--accent)">${pB.ci}</div>
            <div style="font-size:10px;color:var(--text4)">${fmtDate(pB.date)}</div>
            ${pB.note?`<div style="font-size:9px;color:var(--text5);font-style:italic;margin-top:2px">${pB.note.slice(0,30)}</div>`:''}
          </div>
        </div>
      </div>

      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;display:flex;justify-content:space-around;text-align:center;margin-bottom:12px">
        <div><div style="font-size:11px;color:var(--text4)">Time span</div><div style="font-size:13px;font-weight:600;color:var(--text1);margin-top:2px">${span}</div></div>
        <div style="width:1px;background:var(--stat-border)"></div>
        <div><div style="font-size:11px;color:var(--text4)">CI change</div><div style="font-size:13px;font-weight:600;margin-top:2px">${ciNote}</div></div>
      </div>

      <button onclick="swapCompare()" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px;color:var(--text3);font-size:12px;cursor:pointer;font-family:DM Sans,sans-serif">⇄ Swap Before / After</button>`;
  }

  const wrapper=document.createElement('div');
  wrapper.id='compare-view-ov';
  wrapper.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:200;display:flex;align-items:flex-end;justify-content:center;max-width:480px;margin:0 auto;';
  wrapper.innerHTML=`<div class="compare-inner" style="background:var(--bg-sheet);border:1px solid var(--card-border);border-radius:18px 18px 0 0;padding:18px 14px 28px;width:100%;max-height:92vh;overflow-y:auto"></div>`;
  document.getElementById('root').appendChild(wrapper);
  buildViewer(a,b);

  window._compareA=a;window._compareB=b;
  window.swapCompare=()=>{
    const tmp=window._compareA;window._compareA=window._compareB;window._compareB=tmp;
    buildViewer(window._compareA,window._compareB);
  };
}

// ── REPORTS ────────────────────────────────────────────────────────────────────
function repNavPrev(){
  const firstLog=logs.length?logs[logs.length-1].date.slice(0,7):'2020-01';
  const cur=`${_repYear}-${String(_repMonth+1).padStart(2,'0')}`;
  if(cur<=firstLog)return; // already at or before first log month
  _repMonth--;if(_repMonth<0){_repMonth=11;_repYear--;}
  const c=document.getElementById('content');if(c){c.innerHTML=renderReports();attachEvents();}
}
function repNavNext(){
  const now=new Date();
  if(_repYear===now.getFullYear()&&_repMonth===now.getMonth())return;
  _repMonth++;if(_repMonth>11){_repMonth=0;_repYear++;}
  const c=document.getElementById('content');if(c){c.innerHTML=renderReports();attachEvents();}
}
function renderReports(){
  const td=today();
  const liveMins=liveTimerTodayMins();
  const wDays=thisWeekDays();
  const _fmtWD=d=>{const p=d.split('-');return`${parseInt(p[2])} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(p[1])-1]}`;};
  const weekRangeLabel=`${_fmtWD(wDays[0])} – ${_fmtWD(wDays[6])}`;
  const wData=wDays.map(d=>{
    const isT=d===td;
    const dl=logs.filter(l=>l.date===d);
    const cm={};
    dl.forEach(l=>{if(l.cat)cm[l.cat]=(cm[l.cat]||0)+l.dur;});
    if(activeTimer&&activeTimer.startedAt){const _dlm=liveTimerMinsForDate(d);if(_dlm>0){const lc=activeTimer.cat||'manual';cm[lc]=(cm[lc]||0)+_dlm;}}
    const total=Object.values(cm).reduce((a,b)=>a+b,0);
    return{d,total,cm,isT};
  });
  const maxM=Math.max(...wData.map(w=>w.total),1);
  const bars=wData.map(({d,total,cm,isT})=>{
    const totalH=total>0?Math.max(2,Math.round((total/maxM)*88)):0;
    let segs='';
    if(total>0){
      const ents=Object.entries(cm).sort((a,b)=>b[1]-a[1]);
      let used=0;
      ents.forEach(([cid,mins],idx)=>{
        const c=catFor(cid);
        const last=idx===ents.length-1;
        const sh=last?(totalH-used):Math.max(1,Math.round((mins/total)*totalH));
        used+=sh;
        segs+=`<div style="height:${sh}px;background:${c.color};width:100%;flex-shrink:0" title="${c.label}: ${fmtDur(mins)}"></div>`;
      });
    }
    return`<div class="bar-col"><div class="bar-val">${total>0?fmtDur(total):''}</div><div style="display:flex;flex-direction:column-reverse;height:${totalH}px;width:100%;border-radius:3px 3px 0 0;overflow:hidden">${segs}</div><div class="bar-lbl" style="color:${isT?'var(--accent)':'var(--text4)'}">${dayLbl(d)}</div></div>`;
  }).join('');
  // Calendar month key — needed for both monthly breakdown and calendar
  const year=_repYear,month=_repMonth;
  const calMonthKeyEarly=`${year}-${String(month+1).padStart(2,'0')}`;

  // Method breakdown — ALL TIME
  const methodTotals={};
  logs.forEach(l=>{
    if(!l.method)return;
    if(!methodTotals[l.method])methodTotals[l.method]={mins:0,cat:l.cat};
    methodTotals[l.method].mins+=l.dur;
  });
  const usedMethods=Object.entries(methodTotals).sort((a,b)=>b[1].mins-a[1].mins);
  const totMethodM=usedMethods.reduce((a,[,v])=>a+v.mins,0)||1;
  const catBars=usedMethods.map(([method,{mins,cat}])=>{
    const c=catFor(cat);
    const p=Math.round((mins/totMethodM)*100);
    return`<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
        <span style="color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;margin-right:8px">${method}</span>
        <span style="color:${c.color};flex-shrink:0">${fmtDur(mins)} · ${p}%</span>
      </div>
      <div style="height:7px;background:var(--bg-stat);border-radius:4px;overflow:hidden"><div style="height:100%;border-radius:4px;background:${c.color};width:${p}%;transition:width .6s"></div></div>
    </div>`;
  }).join('');

  // Method breakdown — SELECTED MONTH
  const monthLogs=logs.filter(l=>l.date.slice(0,7)===calMonthKeyEarly);
  const monthMethodTotals={};
  monthLogs.forEach(l=>{
    if(!l.method)return;
    if(!monthMethodTotals[l.method])monthMethodTotals[l.method]={mins:0,cat:l.cat};
    monthMethodTotals[l.method].mins+=l.dur;
  });
  const usedMonthMethods=Object.entries(monthMethodTotals).sort((a,b)=>b[1].mins-a[1].mins);
  const totMonthM=usedMonthMethods.reduce((a,[,v])=>a+v.mins,0)||1;
  const catBarsMonth=usedMonthMethods.map(([method,{mins,cat}])=>{
    const c=catFor(cat);
    const p=Math.round((mins/totMonthM)*100);
    return`<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
        <span style="color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;margin-right:8px">${method}</span>
        <span style="color:${c.color};flex-shrink:0">${fmtDur(mins)} · ${p}%</span>
      </div>
      <div style="height:7px;background:var(--bg-stat);border-radius:4px;overflow:hidden"><div style="height:100%;border-radius:4px;background:${c.color};width:${p}%;transition:width .6s"></div></div>
    </div>`;
  }).join('');

  // Calendar — navigable month
  // (year and month already set above)
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDow=new Date(year,month,1).getDay(); // 0=Sun
  const calDays=[];
  // Leading empty slots for alignment
  for(let i=0;i<firstDow;i++)calDays.push(null);
  for(let d=1;d<=daysInMonth;d++){
    const ds=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    calDays.push(ds);
  }
  const activeDays=new Set(logs.map(l=>l.date));
if(activeTimer&&activeTimer.startedAt){
  const _sMs=activeTimer.wallStart||Date.now()-(timerSecs*1000);
  let _cur=new Date(_sMs);const _now=new Date();
  while(_cur<=_now){activeDays.add(localDateStr(_cur));_cur.setDate(_cur.getDate()+1);}
}  const goalDaysSet=new Set();
  calDays.filter(Boolean).forEach(d=>{
  const _logM=logs.filter(l=>l.date===d).reduce((a,l)=>a+l.dur,0);
  if(_logM+liveTimerMinsForDate(d)>=(char.dailyGoalMin||120))goalDaysSet.add(d);
});
  const restDaySet=new Set(char.restDays||[]);
  // Build per-day minutes map for mini progress bars
  const dayMinsMap={};
  logs.filter(l=>l.date.slice(0,7)===calMonthKeyEarly).forEach(l=>{
    dayMinsMap[l.date]=(dayMinsMap[l.date]||0)+l.dur;
  });
  if(activeTimer&&activeTimer.startedAt){
  calDays.filter(Boolean).forEach(d=>{
    const _dlm=liveTimerMinsForDate(d);
    if(_dlm>0)dayMinsMap[d]=(dayMinsMap[d]||0)+_dlm;
  });
}
  const calDots=calDays.map(d=>{
    if(d===null)return`<div></div>`;
    const dayNum=parseInt(d.split('-')[2]);
    const isGoal=goalDaysSet.has(d),isRest=restDaySet.has(d),isActive=activeDays.has(d),isToday=d===td;
    const dayNote=char.dayNotes&&char.dayNotes[d];
    const noteColor=dayNote?.color||null;
    const dayMins=dayMinsMap[d]||0;
    const barPct=Math.min(100,Math.round((dayMins/(char.dailyGoalMin||120))*100));
    const bg=noteColor?noteColor+'99':isGoal?'rgba(34,168,90,.55)':isRest?'rgba(100,120,200,.4)':isActive?'var(--acc45)':'var(--bg-stat)';
    const border=isToday?'1.5px solid var(--accent)':noteColor?`1px solid ${noteColor}`:'1px solid transparent';
    const textCol=noteColor||isGoal||isRest||isActive?'rgba(255,255,255,.9)':(isToday?'var(--accent)':'var(--text5)');
    const noteDot=dayNote?`<span style="position:absolute;top:2px;right:2px;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.85)"></span>`:'';
    const miniBar=dayMins>0?`<div style="position:absolute;bottom:0;left:0;right:0;height:3px;border-radius:0 0 3px 3px;background:rgba(0,0,0,.2)"><div style="height:100%;width:${barPct}%;background:${isGoal?'rgba(34,168,90,.9)':'rgba(255,255,255,.55)'};border-radius:0 0 3px 3px;transition:width .3s"></div></div>`:'';
    return`<div onclick="showDayDetail('${d}')"
      style="aspect-ratio:1;border-radius:4px;background:${bg};border:${border};display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:9px;font-weight:${isToday?700:500};color:${textCol};transition:opacity .15s;user-select:none;position:relative;overflow:hidden"
      title="${d}">${dayNum}${noteDot}${miniBar}</div>`;
  }).join('');
  
  const weekTotal=wData.reduce((a,w)=>a+w.total,0);
  const calMonthKey=`${year}-${String(month+1).padStart(2,'0')}`;
  const isCurrentMonth=(calMonthKey===td.slice(0,7));
  const monthTotal=logs.filter(l=>l.date.slice(0,7)===calMonthKey).reduce((a,l)=>a+l.dur,0)+(isCurrentMonth?liveMins:0);
  // Session History — grouped by method, expandable
  const histByMethod={};
  logs.forEach(l=>{
    if(!histByMethod[l.method])histByMethod[l.method]={cat:l.cat,sessions:[]};
    histByMethod[l.method].sessions.push(l);
  });
  const _buildHCard=([method,{cat:catId,sessions:sess}])=>{
      const cat=catFor(catId);
      const totalMins=sess.reduce((a,l)=>a+l.dur,0);
      const latest=sess[0];
      const uid=`hist-${method.replace(/[^a-z0-9]/gi,'_')}`;
      const PAGE=50;
      const renderRows=(items)=>items.map(l=>`
        <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:7px 0;border-top:1px solid var(--stat-border)">
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;color:var(--text2)">${fmtDate(l.date)} · ${fmtMin(l.dur)}</div>
            ${l.notes?`<div style="font-size:10px;color:var(--text4);margin-top:2px;font-style:italic">${htmlEsc(l.notes)}</div>`:''}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0;margin-left:8px">
            <button class="edit-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.edit(12)}</button>
            <button class="del-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.x(13)}</button>
          </div>
        </div>`).join('');
      const firstPage=renderRows(sess.slice(0,PAGE));
      const moreBtn=sess.length>PAGE?`<button onclick="(function(){var el=document.getElementById('${uid}-more');el.style.display='block';this.remove();})()" style="width:100%;padding:8px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;margin-top:4px">Show all ${sess.length} sessions ▾</button><div id="${uid}-more" style="display:none">${renderRows(sess.slice(PAGE))}</div>`:'';
      return`<div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;margin-bottom:7px;overflow:hidden">
        <button onclick="(function(){var d=document.getElementById('${uid}');d.style.display=d.style.display==='none'?'block':'none';})()"
          style="width:100%;display:flex;gap:10px;align-items:center;padding:10px;background:none;border:none;cursor:pointer;text-align:left;font-family:DM Sans,sans-serif">
          <div style="width:32px;height:32px;border-radius:7px;background:${cat.color}18;border:1px solid ${cat.color}33;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${cat.icon}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text1)">${method}</div>
            <div style="font-size:10px;color:var(--text4);margin-top:1px">${sess.length} session${sess.length!==1?'s':''} · ${fmtDur(totalMins)} total · Last: ${fmtDate(latest.date)}</div>
          </div>
          <span style="font-size:10px;color:var(--text5);flex-shrink:0">▾</span>
        </button>
        <div id="${uid}" style="display:none;padding:0 10px 8px">${firstPage}${moreBtn}</div>
      </div>`;
  };
  const _histSorted=Object.entries(histByMethod).sort((a,b)=>b[1].sessions[0].date.localeCompare(a[1].sessions[0].date)||b[1].sessions[0].id-a[1].sessions[0].id);
  const histHtml=_histSorted.length
    ?_histSorted.slice(0,3).map(_buildHCard).join('')+(_histSorted.length>3
      ?`<div id="hist-rest" style="display:none">${_histSorted.slice(3).map(_buildHCard).join('')}</div><button onclick="document.getElementById('hist-rest').style.display='block';this.remove()" style="width:100%;padding:10px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;font-size:12px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;margin-bottom:7px">Show ${_histSorted.length-3} more method${_histSorted.length-3!==1?'s':''} ▾</button>`:'')
    :`<div class="empty">No sessions logged yet.</div>`;

  // ── CI PROGRESSION CHART ──

  // Notes viewer — sessions that have notes, full text
  const _allNotes=logs.filter(l=>l.notes&&l.notes.trim().length>0);
  const _buildNote=l=>{const cat=catFor(l.cat);return`<div style="padding:9px 0;border-bottom:1px solid var(--stat-border)"><div style="display:flex;align-items:center;gap:7px;margin-bottom:4px"><span style="font-size:13px">${cat.icon}</span><span style="font-size:11px;font-weight:600;color:var(--text2)">${l.method}</span><span style="font-size:10px;color:var(--text5);margin-left:auto">${fmtDate(l.date)} · ${fmtMin(l.dur)}</span><button class="edit-btn" data-id="${l.id}" style="display:flex;align-items:center;flex-shrink:0">${IC.edit(12)}</button></div><div style="font-size:11px;color:var(--text3);line-height:1.6;font-style:italic">${htmlEsc(l.notes)}</div></div>`;};
  const notesHtml=_allNotes.length
    ?_allNotes.slice(0,3).map(_buildNote).join('')+(_allNotes.length>3
      ?`<div id="notes-rest" style="display:none">${_allNotes.slice(3).map(_buildNote).join('')}</div><button onclick="document.getElementById('notes-rest').style.display='block';this.remove()" style="width:100%;padding:9px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;margin-top:4px">View all ${_allNotes.length} notes ▾</button>`:'')
    :`<div style="color:var(--text5);font-size:11px;text-align:center;padding:12px">No session notes yet.</div>`;

  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthName=`${monthNames[month]} ${year}`;
  const nowD=new Date(),todayYear=nowD.getFullYear(),todayMonth=nowD.getMonth();
  const canGoNext=!(year===todayYear&&month===todayMonth);
  const firstLogDate=logs.length?logs[logs.length-1].date.slice(0,7):'2020-01';
  const canGoPrev=(`${year}-${String(month+1).padStart(2,'0')}`)>firstLogDate;
  return`<div class="page-title">Reports</div>
  <div class="page-sub">Your restoration journey in numbers.</div>
  ${buildWeeklySummary()}
  <div class="sg2">
    <div class="stat"><div class="sv" style="font-size:15px">${fmtDur(weekTotal)}</div><div class="sl">This Week</div></div>
    <div class="stat"><div class="sv" style="font-size:15px">${fmtDur(monthTotal)}</div><div class="sl">${isCurrentMonth?'This Month':monthName}</div></div>
    <div class="stat"><div class="sv" style="font-size:13px">${fmtDur(char.minutes)}</div><div class="sl">All Time</div></div>
    <div class="stat"><div class="sv" style="font-size:15px;color:#F59E0B">${char.streak}</div><div class="sl">Best Streak</div></div>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 6px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4)">This Week</div>
    <div style="font-size:11px;font-weight:600;color:var(--text2)">${weekRangeLabel}</div>
  </div>
  <div class="card"><div class="bar-wrap">${bars}</div></div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 6px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4)">Activity</div>
    <div style="display:flex;align-items:center;gap:8px">
      <button onclick="repNavPrev()" ${!canGoPrev?'disabled':''} style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:4px 10px;font-size:13px;color:${canGoPrev?'var(--text2)':'var(--text6)'};cursor:${canGoPrev?'pointer':'default'};font-family:DM Sans,sans-serif;opacity:${canGoPrev?1:0.35}">‹</button>
      <span style="font-size:11px;font-weight:600;color:var(--text2);min-width:100px;text-align:center">${monthName}</span>
      <button onclick="repNavNext()" ${!canGoNext?'disabled':''} style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:4px 10px;font-size:13px;color:${canGoNext?'var(--text2)':'var(--text6)'};cursor:${canGoNext?'pointer':'default'};font-family:DM Sans,sans-serif;opacity:${canGoNext?1:0.35}">›</button>
    </div>
  </div>
  <div class="card">
    <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text5);margin-bottom:4px"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
    <div class="cal-grid">${calDots}</div>
    <div style="display:flex;gap:10px;margin-top:7px;font-size:9px;color:var(--text4);flex-wrap:wrap">
      <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:var(--acc45);vertical-align:middle;margin-right:3px"></span>Active</span>
      <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:rgba(34,168,90,.55);vertical-align:middle;margin-right:3px"></span>Goal met</span>
      <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:rgba(100,120,200,.4);vertical-align:middle;margin-right:3px"></span>Rest day</span>
      <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.6);border:1px solid var(--text4);vertical-align:middle;margin-right:3px"></span>Has note</span>
    </div>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 6px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4)">Method Breakdown</div>
    <div style="font-size:10px;color:var(--accent);font-weight:600">${monthName}</div>
  </div>
  <div class="card">
    ${catBarsMonth||`<div style="color:var(--text5);font-size:11px;text-align:center;padding:10px">No sessions logged in ${monthName}.</div>`}
    ${monthLogs.length?`<div style="border-top:1px solid var(--stat-border);margin-top:6px;padding-top:6px;font-size:10px;color:var(--text5);text-align:right">${monthLogs.length} sessions · ${fmtDur(monthLogs.reduce((a,l)=>a+l.dur,0))} total</div>`:''}
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 6px">
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4)">Method Breakdown</div>
    <div style="font-size:10px;color:var(--text4);font-weight:600">All Time</div>
  </div>
  <div class="card">
    ${catBars||`<div style="color:var(--text5);font-size:11px;text-align:center;padding:10px">No sessions yet.</div>`}
    ${logs.length?`<div style="border-top:1px solid var(--stat-border);margin-top:6px;padding-top:6px;font-size:10px;color:var(--text5);text-align:right">${logs.length} sessions · ${fmtDur(logs.reduce((a,l)=>a+l.dur,0))} total</div>`:''}
  </div>
  <div class="sec-title">Export Data</div>
  <div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text1)">Session Log — CSV</div>
        <div style="font-size:10px;color:var(--text4);margin-top:2px;line-height:1.5">${logs.length} sessions · Opens in Excel or Google Sheets for your own analysis. Not a backup — use the backup in your profile for that.</div>
      </div>
      <button class="btn-outline" id="export-btn" style="flex-shrink:0">📊 Export</button>
    </div>
  </div>
  <div class="sec-title">Session Notes</div>
  <div class="card" style="padding:8px 12px">${notesHtml}</div>
  <div class="sec-title">Session History</div>${histHtml}`;
}
function showDayDetail(dateStr){
  const ex=document.getElementById('day-detail-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='day-detail-ov';

  const dayLogs=logs.filter(l=>l.date===dateStr);
  const isRest=(char.restDays||[]).includes(dateStr);
  const isToday=dateStr===today();
  const totalMins=dayLogs.reduce((a,l)=>a+l.dur,0)+(isToday?liveTimerTodayMins():0);
  const goal=char.dailyGoalMin||120;
  const goalMet=totalMins>=goal;

  // Format date nicely
  const d=new Date(dateStr+'T12:00:00');
  const dateLabel=new Date(dateStr+'T12:00:00').toLocaleDateString('en',{weekday:'long'})+', '+fmtDateLong(dateStr);

  const statusBadge=isToday
    ?`<span style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:2px 9px;font-size:10px;color:var(--accent);font-weight:600">Today</span>`
    :goalMet
      ?`<span style="background:rgba(34,168,90,.1);border:1px solid rgba(34,168,90,.3);border-radius:20px;padding:2px 9px;font-size:10px;color:var(--green);font-weight:600">🎯 Goal met</span>`
      :isRest
        ?`<span style="background:rgba(100,120,200,.1);border:1px solid rgba(100,120,200,.3);border-radius:20px;padding:2px 9px;font-size:10px;color:#8899CC;font-weight:600">🛌 Rest day</span>`
        :dayLogs.length
          ?`<span style="background:var(--acc6);border:1px solid var(--stat-border);border-radius:20px;padding:2px 9px;font-size:10px;color:var(--text3)">Active</span>`
          :`<span style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:2px 9px;font-size:10px;color:var(--text5)">No sessions</span>`;

  const sessionItems=dayLogs.length
    ?dayLogs.map(l=>{
      const cat=catFor(l.cat);
      return`<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--stat-border)">
        <div style="width:32px;height:32px;border-radius:7px;background:${cat.color}18;border:1px solid ${cat.color}33;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${cat.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:13px;color:var(--text1)">${l.method}</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">${fmtDur(l.dur)}${l.notes?`<span style="color:var(--text3)"> · ${htmlEsc(l.notes)}</span>`:''}</div>
        </div>
        <div style="display:flex;gap:4px;flex-shrink:0;margin-top:2px">
          <button onclick="document.getElementById('day-detail-ov').remove();openEditSessionSheet(${l.id})" class="edit-btn" style="display:flex;align-items:center">${IC.edit(12)}</button>
          <button onclick="deleteDaySession(${l.id})" class="del-btn" style="display:flex;align-items:center">${IC.x(13)}</button>
        </div>
      </div>`;
    }).join('')
    :isRest
      ?`<div style="text-align:center;padding:18px;color:var(--text5);font-size:12px">Rest day — no sessions logged.</div>`
      :`<div style="text-align:center;padding:18px;color:var(--text5);font-size:12px">No sessions logged on this day.</div>`;

  const dayNote=(char.dayNotes&&char.dayNotes[dateStr])||null;
  el.innerHTML=`<div class="sheet" style="max-height:80vh">
    <div class="sheet-handle"></div>
    <div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--text4);margin-bottom:4px">${dateLabel}</div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        ${totalMins>0?`<div style="font-family:Cinzel,serif;font-size:20px;font-weight:700;color:var(--accent)">${fmtDur(totalMins)}</div>`:''}
        ${statusBadge}
      </div>
      ${totalMins>0&&!goalMet?`<div style="font-size:10px;color:var(--text5);margin-top:4px">${fmtMin(goal-totalMins)} short of daily goal</div>`:''}
    </div>
    <div style="max-height:42vh;overflow-y:auto">${sessionItems}</div>
    ${dayNote?`<div style="margin-top:12px;border-radius:10px;padding:10px 12px;background:${dayNote.color}22;border-left:3px solid ${dayNote.color};border-right:1px solid ${dayNote.color}44;border-top:1px solid ${dayNote.color}44;border-bottom:1px solid ${dayNote.color}44">
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:${dayNote.color};margin-bottom:4px">Day Note</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.6">${htmlEsc(dayNote.note)}</div>
    </div>`:''}
    <div id="day-note-area" style="margin-top:12px">
      ${dayNote
        ?`<button onclick="showDayNoteEditor('${dateStr}')" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif">✏ Edit note</button>`
        :`<button onclick="showDayNoteEditor('${dateStr}')" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif">📝 Add a note for this day</button>`
      }
    </div>
    <button class="btn-ghost" onclick="document.getElementById('day-detail-ov').remove()" style="width:100%;margin-top:8px">Close</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

const NOTE_COLORS=[
  {hex:'#e74c3c',label:'Red'},
  {hex:'#e67e22',label:'Orange'},
  {hex:'#f1c40f',label:'Yellow'},
  {hex:'#2ecc71',label:'Green'},
  {hex:'#3498db',label:'Blue'},
  {hex:'#9b59b6',label:'Purple'},
  {hex:'#1abc9c',label:'Teal'},
  {hex:'#e91e8c',label:'Pink'},
];
let _noteEditorColor='#3498db'; // default color

function deleteDaySession(id){
  const entry=logs.find(l=>l.id===id);
  if(!entry)return;
  confirmDialog(
    'Delete this session?',
    `"${entry.method} · ${fmtMin(entry.dur)}" will be permanently removed. Your stats will be recalculated.`,
    'Delete',
    ()=>{
      logs=logs.filter(l=>l.id!==id);
      rebuildCharFromLogs();
      document.getElementById('day-detail-ov')?.remove();
      showToast('Session deleted');
      if(tab==='reports'){const c=document.getElementById('content');if(c){c.innerHTML=renderReports();attachEvents();}}
    }
  );
}

function showDayNoteEditor(dateStr){
  const ex=document.getElementById('note-editor-ov');if(ex)ex.remove();
  const existing=(char.dayNotes&&char.dayNotes[dateStr])||null;
  _noteEditorColor=existing?.color||'#3498db';
  const d=new Date(dateStr+'T12:00:00');
  const label=d.toLocaleDateString('en',{weekday:'long'})+', '+fmtDateLong(dateStr);
  const el=document.createElement('div');
  el.className='overlay';el.id='note-editor-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:2px">Day Note</div>
    <div style="font-size:11px;color:var(--text4);margin-bottom:14px">${label}</div>
    <div style="font-size:10px;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Colour</div>
    <div id="note-color-row" style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      ${NOTE_COLORS.map(c=>`
        <button onclick="selectNoteColor('${c.hex}')" id="ncol-${c.hex.slice(1)}"
          style="width:32px;height:32px;border-radius:50%;background:${c.hex};border:${_noteEditorColor===c.hex?'3px solid var(--text1)':'2px solid transparent'};cursor:pointer;transition:border .15s;flex-shrink:0" title="${c.label}"></button>
      `).join('')}
    </div>
    <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Note</div>
    <textarea id="day-note-inp" placeholder="How did you feel? Anything notable about today..."
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--text1);font-size:13px;width:100%;outline:none;resize:vertical;min-height:80px;font-family:'DM Sans',sans-serif;margin-bottom:14px">${existing?htmlEsc(existing.note):''}</textarea>
    <div style="display:flex;gap:8px">
      ${existing?`<button onclick="deleteDayNote('${dateStr}')" style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">Delete</button>`:''}
      <button class="btn-ghost" onclick="document.getElementById('note-editor-ov').remove()" style="flex:1">Cancel</button>
      <button class="btn-gold" onclick="saveDayNote('${dateStr}')" style="flex:2">Save Note</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  document.getElementById('day-note-inp')?.focus();
}

function selectNoteColor(hex){
  _noteEditorColor=hex;
  NOTE_COLORS.forEach(c=>{
    const btn=document.getElementById('ncol-'+c.hex.slice(1));
    if(btn)btn.style.border=c.hex===hex?'3px solid var(--text1)':'2px solid transparent';
  });
}

function saveDayNote(dateStr){
  const note=(document.getElementById('day-note-inp')?.value||'').trim();
  if(!note){showToast('Please write something first');return;}
  if(!char.dayNotes)char.dayNotes={};
  char.dayNotes[dateStr]={note,color:_noteEditorColor};
  saveChar();
  document.getElementById('note-editor-ov')?.remove();
  document.getElementById('day-detail-ov')?.remove();
  showToast('📝 Note saved');
  // Refresh calendar if on reports tab
  if(tab==='reports'){const c=document.getElementById('content');if(c){c.innerHTML=renderReports();attachEvents();}}
}

function deleteDayNote(dateStr){
  if(!char.dayNotes)return;
  delete char.dayNotes[dateStr];
  saveChar();
  document.getElementById('note-editor-ov')?.remove();
  document.getElementById('day-detail-ov')?.remove();
  showToast('Note deleted');
  if(tab==='reports'){const c=document.getElementById('content');if(c){c.innerHTML=renderReports();attachEvents();}}
}

let expandedBadgeGroups=new Set(['first']); // first-steps open by default
function toggleBadgeGroup(id){
  if(expandedBadgeGroups.has(id))expandedBadgeGroups.delete(id);
  else expandedBadgeGroups.add(id);
  // Re-render just the badges tab content
  const c=document.getElementById('content');
  if(c&&tab==='ach')c.innerHTML=renderAch();
}

function renderAch(){
  const unlocked=char.achievements.length;
  const pct=Math.round(unlocked/ACHS.length*100);

  const groups=[
    {id:'first',  label:'🌱 First Steps',   ids:['first','rest1','photo1']},
    {id:'sess',   label:'◉ Sessions',        ids:['s10','s25','s50','s100','s200','s365','s500']},
    {id:'time',   label:'⏱ Time',            ids:['h1','h10','h25','h50','h100','h250','h500','h1000']},
    {id:'streak', label:'🔥 Streaks',        ids:['str3','str7','str14','str30','str60','str90','str180','str365']},
    {id:'goal',   label:'🎯 Daily Goal',     ids:['goal5','goal30','goal100','goal365']},
    {id:'method', label:'🧪 Methods',        ids:['meth3','meth5']},
    {id:'photo',  label:'📸 Photos',         ids:['photo5','photo10']},
    {id:'ci',     label:'◑ CI Progress',     ids:['ci1','ci2','ci3','ci4','ci5','ci6','ci7','ci8','ci9','ci10']},
  ];

  const groupHtml=groups.map(g=>{
    const groupAchs=ACHS.filter(a=>g.ids.includes(a.id));
    const groupUnlocked=groupAchs.filter(a=>char.achievements.includes(a.id)).length;
    const isOpen=expandedBadgeGroups.has(g.id);
    const groupPct=Math.round(groupUnlocked/groupAchs.length*100);

    const cards=groupAchs.map(a=>{
      const u=char.achievements.includes(a.id);
      return`<div style="background:${u?'var(--acc6)':'var(--bg-stat)'};border:1px solid ${u?'var(--acc30)':'var(--stat-border)'};border-radius:10px;padding:10px 8px;text-align:center;opacity:${u?1:.4}">
        <div style="font-size:22px;margin-bottom:4px">${a.icon}</div>
        <div style="font-size:10px;font-weight:700;color:${u?'var(--accent)':'var(--text3)'};line-height:1.3">${a.title}</div>
        <div style="font-size:8px;color:var(--text5);margin-top:3px;line-height:1.4">${a.desc}</div>
      </div>`;
    }).join('');

    return`<div style="background:var(--bg-card);border:1px solid var(--card-border);border-radius:12px;margin-bottom:8px;overflow:hidden">
      <button onclick="toggleBadgeGroup('${g.id}')"
        style="width:100%;display:flex;align-items:center;gap:10px;padding:12px;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;text-align:left">
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;color:var(--text1)">${g.label}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
            <div style="flex:1;height:4px;background:var(--bg-stat);border-radius:2px;overflow:hidden">
              <div style="height:100%;background:${groupUnlocked===groupAchs.length?'var(--green)':'var(--accent)'};width:${groupPct}%;border-radius:2px;transition:width .5s"></div>
            </div>
            <span style="font-size:10px;color:${groupUnlocked===groupAchs.length?'var(--green)':'var(--text4)'};flex-shrink:0;font-weight:600">${groupUnlocked}/${groupAchs.length}</span>
          </div>
        </div>
        <span style="font-size:12px;color:var(--text4);flex-shrink:0;transform:rotate(${isOpen?'180':'0'}deg);transition:transform .2s">▾</span>
      </button>
      ${isOpen?`<div style="padding:0 12px 12px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${cards}</div>`:''}
    </div>`;
  }).join('');

  return`<div class="page-title">Badges</div>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
    <div style="flex:1;height:7px;background:var(--bg-stat);border-radius:4px;overflow:hidden">
      <div style="height:100%;background:linear-gradient(90deg,var(--acc18),var(--accent));width:${pct}%;border-radius:4px;transition:width .6s"></div>
    </div>
    <div style="font-size:11px;color:var(--text4);flex-shrink:0">${unlocked} / ${ACHS.length}</div>
  </div>
  ${groupHtml}`;
}

// ── PROFILE SCREEN ─────────────────────────────────────────────────────────────
function renderProfileScreen(){
  const isNewUser=!currentPid||profiles.length===0;
  const chips=THEMES.map(t=>`<div class="theme-chip${currentTheme===t.id?' sel':''}" data-tid="${t.id}" onclick="selectTheme('${t.id}')">
    <div class="theme-swatch" style="background:${t.bg}">
      <div style="display:flex;gap:3px"><div class="tdot" style="background:${t.accent}"></div><div class="tdot" style="background:${t.mid}"></div><div class="tdot" style="background:${t.text}"></div></div>
      <div class="theme-lbl" style="color:${t.text}">${t.name}</div>
    </div>
  </div>`).join('');

  if(isNewUser){
    // ── ONBOARDING ──────────────────────────────────────────────────────────────
    document.getElementById('root').innerHTML=`<div class="pscreen">
      <div style="text-align:center;margin-bottom:24px;margin-top:8px">
        <div style="font-family:Cinzel,serif;font-size:28px;color:var(--accent);letter-spacing:3px;margin-bottom:12px">◉ RESTORETRACK</div>
        <div style="font-size:13px;color:var(--text3);line-height:1.9;max-width:300px;margin:0 auto">Built by restorers, for restorers.<br><span style="color:var(--text5);font-size:11px">Free. Private. No account required.</span></div>
      </div>

      <div style="width:100%;background:var(--bg-stat);border-radius:12px;padding:12px 16px;margin-bottom:16px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[['📊','Track CI progress','CI-0 through CI-10'],['⏱','Precision Logging','Timer + manual logging'],['📸','Photo journal','Visual progress over time'],['👥','Community','Restore with others']].map(([icon,title,sub])=>`
          <div style="display:flex;gap:8px;align-items:flex-start">
            <span style="font-size:16px;flex-shrink:0">${icon}</span>
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--text2)">${title}</div>
              <div style="font-size:9px;color:var(--text5);margin-top:1px">${sub}</div>
            </div>
          </div>`).join('')}
      </div>

      <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:20px;margin-bottom:16px">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:12px;text-align:center">Create Your Profile</div>
        <div style="font-size:11px;color:var(--text4);margin-bottom:12px;text-align:center;line-height:1.6">One profile, one journey.</div>
        <input class="gold-inp" id="new-name" placeholder="Profile name" maxlength="20" style="text-align:center;font-size:16px;margin-bottom:12px">
        <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin-bottom:8px;text-align:center">Choose a theme</div>
        <div class="theme-row" style="margin-bottom:0">${chips}</div>
      </div>

      <button class="btn-gold" id="create-btn" style="width:100%;padding:14px;font-size:15px;letter-spacing:1px">Begin Your Journey</button>

      <div style="margin-top:18px;text-align:center">
        <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.7">Restoring from another device or browser?<br>Each browser and the Home Screen app store data separately — use a backup to transfer.</div>
        <button class="btn-ghost" id="restore-btn" style="padding:8px 20px;font-size:12px">⬆ Import Backup</button>
        <input type="file" id="restore-file" accept=".json" style="display:none">
      </div>
    </div>`;
    document.getElementById('create-btn').onclick=()=>{
      const n=document.getElementById('new-name').value.trim();
      if(!n){showToast('Please enter your name');return;}
      createProfile(n);
    };
    document.getElementById('new-name').onkeydown=e=>{if(e.key==='Enter'){const n=e.target.value.trim();if(n)createProfile(n);}};
    document.getElementById('restore-btn').addEventListener('click',()=>document.getElementById('restore-file').click());
    document.getElementById('restore-file').addEventListener('change',e=>{
      const file=e.target.files[0];if(!file)return;
      const reader=new FileReader();
      reader.onload=ev=>{importBackup(ev.target.result);};
      reader.readAsText(file);e.target.value='';
    });
    return;
  }

  // ── SETTINGS PANEL (existing user) ─────────────────────────────────────────
  const joined=profiles[0]?.createdAt||today();
  document.getElementById('root').innerHTML=`<div class="pscreen">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-family:Cinzel,serif;font-size:18px;color:var(--accent);letter-spacing:2px;margin-bottom:4px">◉ RESTORETRACK <span style="font-size:10px;opacity:.4;font-family:'DM Sans',sans-serif;font-weight:400;letter-spacing:0">v2.4.7</span></div>
    </div>

    <!-- Profile card -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:18px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
        <div class="pavatar" style="width:52px;height:52px;font-size:20px;flex-shrink:0">${char.name.charAt(0).toUpperCase()}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:16px;color:var(--text1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${char.name}</div>
          <div style="font-size:10px;color:var(--text4);margin-top:3px">${LEVELS[char.ciLevel||0].ci} · ${char.sessions} session${char.sessions!==1?'s':''} · Since ${fmtDate(joined)}</div>
        </div>
      </div>
      <div id="rename-inline" style="display:none;margin-bottom:10px">
        <div style="display:flex;gap:7px">
          <input id="rename-val" class="gold-inp" style="flex:1;margin:0;font-size:13px;padding:8px 10px" maxlength="20" placeholder="New name..." value="${char.name}">
          <button onclick="saveRenameInline()" style="background:var(--accent);border:none;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;color:var(--bg);cursor:pointer;font-family:DM Sans,sans-serif">Save</button>
          <button onclick="document.getElementById('rename-inline').style.display='none'" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px;font-size:12px;color:var(--text4);cursor:pointer;font-family:DM Sans,sans-serif">✕</button>
        </div>
      </div>
      <button onclick="showRenameInline()" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;font-size:12px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif">✏ Rename</button>
    </div>

    <!-- Appearance -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px;padding:16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin-bottom:10px">Appearance</div>
      <div class="theme-row" style="margin-bottom:0">${chips}</div>
    </div>

    <!-- Feedback -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px;padding:16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin-bottom:8px">Feedback & Bug Reports</div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:10px;line-height:1.6">Spotted a bug? Have a suggestion? Want to see something new? I read every message personally.</div>
      <button id="feedback-btn" class="btn-ghost" style="width:100%;padding:10px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:12px">
        ✉ Send Feedback
      </button>
    </div>

<!-- Cloud Backup -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px">☁ Cloud Backup</div>
      ${fbIsGoogle && fbUID ? `
        <div style="font-size:11px;color:var(--text3);margin-bottom:10px;line-height:1.7">
          Your data is backed up to your Google account — sessions, settings, and photos. Restore anytime on any device by signing in with the same Google account.
        </div>
        ${char.lastCloudBackup ? `<div style="font-size:10px;color:var(--green);margin-bottom:10px">✓ Last backup: ${new Date(char.lastCloudBackup).toLocaleDateString()}</div>` : `<div style="font-size:10px;color:var(--text5);margin-bottom:10px">No cloud backup yet — back up now.</div>`}
        <div style="background:rgba(212,102,153,.06);border:1px solid rgba(212,102,153,.2);border-radius:8px;padding:9px 12px;margin-bottom:10px;font-size:10px;color:var(--text3);line-height:1.6">
          🔒 <strong style="color:var(--text2)">Privacy note:</strong> Your photos are encrypted in transit and stored privately under your Google account. Only you can access them — not other users or the app owner.
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-gold" id="cloud-backup-btn" style="flex:1;padding:10px;font-size:12px">☁ Back Up Now</button>
          <button class="btn-ghost" id="cloud-restore-btn" style="flex:1;padding:10px;font-size:12px">☁ Restore from Cloud</button>
        </div>
      ` : `
        <div style="font-size:11px;color:var(--text3);margin-bottom:10px;line-height:1.7">
          Back up your entire profile — sessions, photos, and progress — to your Google account. Restore instantly on any device.
        </div>
        <div style="font-size:10px;color:var(--text5);background:var(--bg-stat);border-radius:8px;padding:9px 12px;margin-bottom:10px;line-height:1.6">
          Requires joining the Community (free) — this connects your Google account securely.
        </div>
        <button class="btn-ghost" onclick="tab='community';showProfileScreen=false;render()" style="width:100%;padding:10px;font-size:12px">Join Community to Enable →</button>
      `}
    </div>

    <!-- Local Backup -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px;padding:16px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin-bottom:8px">Local Backup (File)</div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:10px;line-height:1.6">Full backup saved as a file on your device. Use this for manual transfers or as an extra copy.</div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 12px;margin-bottom:10px;font-size:10px;color:var(--text4);line-height:1.6">
        💡 <strong style="color:var(--text3)">Using multiple browsers or the Home Screen app?</strong> Each one stores data separately. Export a backup in one and import it in the other to transfer your profile.
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn-outline" id="backup-btn" style="flex:1;padding:10px">⬇ Export Backup</button>
        <button class="btn-ghost" id="restore-btn" style="flex:1;padding:10px;font-size:12px">⬆ Import Backup</button>
      </div>
      <input type="file" id="restore-file" accept=".json" style="display:none">
    </div>

    <button id="cancel-p" style="background:none;border:none;color:var(--text4);font-size:13px;margin-top:4px;cursor:pointer;font-family:'DM Sans',sans-serif;padding:10px">← Back to app</button>

    <!-- Delete — buried at the bottom, intentionally low-key until needed -->
    <div style="width:100%;margin-top:8px;padding-top:16px;border-top:1px solid var(--stat-border);text-align:center">
      <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.6">This will permanently erase all your data.<br>Your community presence will also be removed.</div>
      <button onclick="confirmDeleteProfile()" style="background:none;border:1px solid rgba(200,50,50,.25);border-radius:8px;padding:9px 20px;font-size:12px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">Delete My Profile</button>
    </div>
  </div>`;

  document.getElementById('feedback-btn')?.addEventListener('click',()=>{
    const version='v2.4.7';
    const subject=encodeURIComponent(`RestoreTrack ${version} Feedback`);
    const body=encodeURIComponent(`Hi,\n\nI'm using RestoreTrack ${version} and wanted to share:\n\n[Write your feedback, bug report, or suggestion here]\n\n---\nApp info: ${version} · CI-${char.ciLevel||0} · ${char.sessions} sessions`);
    window.location.href=`mailto:restoretrack@gmail.com?subject=${subject}&body=${body}`;
  });

  document.getElementById('cancel-p')?.addEventListener('click',()=>{showProfileScreen=false;render();});
  document.getElementById('backup-btn')?.addEventListener('click',exportBackup);
  document.getElementById('cloud-backup-btn')?.addEventListener('click',cloudBackupSave);
  document.getElementById('cloud-restore-btn')?.addEventListener('click',cloudBackupRestore);
  document.getElementById('restore-btn')?.addEventListener('click',()=>document.getElementById('restore-file').click());
  document.getElementById('restore-file')?.addEventListener('change',e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{importBackup(ev.target.result);};
    reader.readAsText(file);e.target.value='';
  });
}
// ── CLOUD BACKUP (FIRESTORE) ───────────────────────────────────────────────────
// Syncs profile + logs + photos to Firestore under users/{uid}.
// Photos stored as base64 in subcollection — no Firebase Storage needed.
// Only available when signed in with Google (fbUID + fbIsGoogle).

async function cloudBackupSave() {
  if (!db || !fbUID || !fbIsGoogle) {
    showToast('⚠ Sign in with Google (via Community) to use cloud backup');
    return;
  }
  if (!currentPid) return;

  const btn = document.getElementById('cloud-backup-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Backing up…'; }

  try {
    // 1. Save profile + logs (single doc, typically <100KB)
    const charData = S.get(`rst-${currentPid}-char`) || {};
    const logsData = S.get(`rst-${currentPid}-logs`) || [];
    await db.collection('user_backups').doc(fbUID).set({
      char: charData,
      logs: logsData,
      pid: currentPid,
      backedUpAt: firebase.firestore.FieldValue.serverTimestamp(),
      appVersion: '2.5.0'
    });

    // 2. Save photos to subcollection (one doc per photo)
    const photoArr = await PhotoDB.load(currentPid);
    const photoBatch = db.batch();
    // Delete old photo docs first — get existing IDs
    const existing = await db.collection('user_backups').doc(fbUID)
      .collection('photos').get();
    existing.docs.forEach(d => photoBatch.delete(d.ref));
    // Write fresh set
    for (const p of photoArr) {
      // Ensure compressed before cloud upload
        let url = p.url;
        if (dataUrlSizeKB(url) > 150) url = await compressPhoto(url, 900, 0.60);
        if (dataUrlSizeKB(url) > 150) url = await compressPhoto(url, 700, 0.50);
      const ref = db.collection('user_backups').doc(fbUID)
        .collection('photos').doc(String(p.id));
      photoBatch.set(ref, { ci: p.ci, date: p.date, note: p.note || '', url });
    }
    await photoBatch.commit();

    char.lastCloudBackup = new Date().toISOString();
    saveChar();
    showToast(`✅ Cloud backup complete — ${photoArr.length} photos saved`);
  } catch(e) {
    console.warn('[RT] cloudBackupSave error', e);
    showToast('⚠ Cloud backup failed — check your connection');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '☁ Back Up Now'; }
    renderProfileScreen();
  }
}

async function cloudBackupRestore() {
  if (!db || !fbUID || !fbIsGoogle) {
    showToast('⚠ Sign in with Google (via Community) to restore from cloud');
    return;
  }
  try {
    const doc = await db.collection('user_backups').doc(fbUID).get();
    if (!doc.exists) { showToast('⚠ No cloud backup found for this account'); return; }
    const data = doc.data();

    confirmDialog(
      'Restore from Cloud?',
      `This will replace your current data with your cloud backup from ${data.backedUpAt?.toDate?.().toLocaleDateString() || 'unknown date'}. Your current local data will be overwritten.`,
      'Restore',
      async () => {
        const btn = document.getElementById('cloud-restore-btn');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ Restoring…'; }
        try {
          // Restore char + logs
          const pid = data.pid || currentPid;
          S.set(`rst-${pid}-char`, data.char);
          S.set(`rst-${pid}-logs`, data.logs);
          S.set('rst-active-pid', pid);
          await ProfileDB.set(`rst-${pid}-char`, data.char);
          await ProfileDB.set(`rst-${pid}-logs`, data.logs);
          await ProfileDB.set('rst-profiles', profiles);
          // Update profiles list if needed
          if (!profiles.find(p => p.id === pid)) {
            profiles = [{ id: pid, name: data.char?.name || 'Restorer', createdAt: data.char?.createdAt || today() }];
            saveProfiles();
          }
          // Restore photos from subcollection
          const photoSnap = await db.collection('user_backups').doc(fbUID)
            .collection('photos').get();
          const restoredPhotos = photoSnap.docs.map(d => ({
            id: parseInt(d.id) || Date.now(),
            ...d.data()
          })).sort((a, b) => b.id - a.id);
          await PhotoDB.save(pid, restoredPhotos);
          showToast(`✅ Restored — ${restoredPhotos.length} photos recovered`);
          setTimeout(async () => { await loadAll(); showProfileScreen = false; tab = 'today'; render(); }, 600);
        } catch(e) {
          console.warn('[RT] cloudBackupRestore error', e);
          showToast('⚠ Restore failed — check your connection');
          if (btn) { btn.disabled = false; btn.textContent = '☁ Restore from Cloud'; }
        }
      }
    );
  } catch(e) {
    showToast('⚠ Could not reach cloud backup — check your connection');
  }
}
// ── BACKUP / RESTORE ───────────────────────────────────────────────────────────
async function exportBackup(){
  const backup={
    version:1,
    exportedAt:new Date().toISOString(),
    profiles,
    data:{}
  };
  for(const p of profiles){
    backup.data[p.id]={
      char:S.get(`rst-${p.id}-char`),
      logs:S.get(`rst-${p.id}-logs`),
      photos:await PhotoDB.load(p.id) // load from IndexedDB
    };
  }
  const json=JSON.stringify(backup,null,2);
  const blob=new Blob([json],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const dateStr=today().replace(/-/g,'');
  a.href=url;a.download=`restoretrack-backup-${dateStr}.json`;
  document.body.appendChild(a);a.click();
  document.body.removeChild(a);URL.revokeObjectURL(url);
  showToast('✅ Backup saved!');
}
function importBackup(jsonText){
  let backup;
  try{backup=JSON.parse(jsonText);}
  catch{showToast('⚠ Invalid backup file');return;}
  if(!backup.profiles||!backup.data){showToast('⚠ Unrecognised backup format');return;}
  confirmDialog(
    'Import this backup?',
    `This will restore ${backup.profiles.length} profile${backup.profiles.length!==1?'s':''} from ${backup.exportedAt?.slice(0,10)||'unknown date'}. Your current data will be replaced.`,
    'Import',
    async ()=>{
      // Write char and logs to localStorage, photos to IndexedDB
      for(const p of backup.profiles){
        const d=backup.data[p.id]||{};
        if(d.char){S.set(`rst-${p.id}-char`,d.char);await ProfileDB.set(`rst-${p.id}-char`,d.char);}
        if(d.logs){S.set(`rst-${p.id}-logs`,d.logs);await ProfileDB.set(`rst-${p.id}-logs`,d.logs);}
        if(d.photos&&Array.isArray(d.photos)&&d.photos.length){
          await PhotoDB.save(p.id,d.photos);
        }
      }
      S.set('rst-profiles',backup.profiles);
      await ProfileDB.set('rst-profiles',backup.profiles);
      // Switch to first profile
      const firstPid=backup.profiles[0]?.id;
      if(firstPid)S.set('rst-active-pid',firstPid);
      showToast('✅ Backup restored!');
      // Full reload to pick up all new data
      setTimeout(async ()=>{await loadAll();showProfileScreen=false;tab='today';render();},400);
    }
  );
}

// ── CI SHEET ───────────────────────────────────────────────────────────────────
// ── CI SHEET (multi-value editor: Start / Current / Goal) ──────────────────────
function mountCISheet(){
  const ex=document.getElementById('ci-ov');if(ex)ex.remove();
  _editStartCI=char.startCI!==undefined?char.startCI:0;
  _editCurrentCI=char.ciLevel||0;
  _editGoalCI=Math.max(char.ciGoal||10,char.ciLevel||0);
  renderCISheet();
}

function renderCISheet(){
  const ex=document.getElementById('ci-ov');if(ex)ex.remove();

  // Live validation
  let error='';
  if(_editCurrentCI<_editStartCI)error=`Current CI (${_editCurrentCI}) can't be below Start CI (${_editStartCI}).`;
  else if(_editGoalCI<=_editStartCI)error=`Goal CI must be above Start CI (${_editStartCI}).`;
  else if(_editGoalCI<_editCurrentCI)error=`Goal CI can't be below Current CI (${_editCurrentCI}).`;
  const valid=!error;

  // Reusable grid builder
  const ciGrid=(section,selected,min,max)=>Array.from({length:max-min+1},(_,idx)=>{
    const val=min+idx;
    const isSel=val===selected;
    let dis=false;
    if(section==='start'&&val>_editCurrentCI)dis=true;
    if(section==='current'&&val<_editStartCI)dis=true;
    if(section==='goal'&&(val<=_editStartCI||val<_editCurrentCI))dis=true;
    return`<button onclick="${dis?'':(`editCIVal('${section}',${val})`)}"
      style="padding:9px 2px;border-radius:8px;font-family:Cinzel,serif;font-size:11px;font-weight:700;cursor:${dis?'not-allowed':'pointer'};text-align:center;
      background:${isSel?'var(--accent)':'var(--bg-stat)'};
      border:1px solid ${isSel?'var(--accent)':'var(--stat-border)'};
      color:${isSel?'var(--bg)':'var(--text3)'};
      opacity:${dis?'0.22':'1'};transition:all .15s">${val}</button>`;
  }).join('');

  const el=document.createElement('div');el.className='overlay';el.id='ci-ov';
  el.innerHTML=`<div class="sheet" style="max-height:90vh">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);text-align:center;margin-bottom:4px">Set CI Levels</div>
    <div style="font-size:11px;color:var(--text4);text-align:center;margin-bottom:16px;line-height:1.6">Start, Current, and Goal define your journey arc.</div>

    <!-- Start CI -->
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4)">Start CI</div>
        <span style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:2px 10px;font-family:Cinzel,serif;font-size:11px;font-weight:700;color:var(--text3)">CI-${_editStartCI}</span>
        <span style="font-size:10px;color:var(--text5)">Where you began</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">
        ${ciGrid('start',_editStartCI,0,9)}
      </div>
    </div>

    <!-- Current CI -->
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--accent)">Current CI</div>
        <span style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:2px 10px;font-family:Cinzel,serif;font-size:11px;font-weight:700;color:var(--accent)">CI-${_editCurrentCI}</span>
        <span style="font-size:10px;color:var(--text5)">Where you are now</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">
        ${ciGrid('current',_editCurrentCI,0,10)}
      </div>
    </div>

    <!-- Goal CI -->
    <div style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4)">Goal CI</div>
        <span style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:20px;padding:2px 10px;font-family:Cinzel,serif;font-size:11px;font-weight:700;color:var(--accent)">CI-${_editGoalCI}</span>
        <span style="font-size:10px;color:var(--text5)">Your target</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">
        ${ciGrid('goal',_editGoalCI,1,10)}
      </div>
    </div>

    ${error?`<div style="background:rgba(200,50,50,.07);border:1px solid rgba(200,50,50,.25);border-radius:8px;padding:9px 12px;margin-bottom:12px;font-size:11px;color:#c0392b;line-height:1.5">⚠ ${error}</div>`:''}
    <div style="font-size:10px;color:var(--text5);line-height:1.6;margin-bottom:14px">Honest assessment beats optimism — you'll feel better advancing than missing a target you set too high.</div>

    <div style="display:flex;gap:8px">
      <button class="btn-ghost" id="ci-cancel" style="flex:0 0 76px">Cancel</button>
      <button class="btn-gold" id="ci-save" style="flex:1" ${!valid?'disabled':''}>✓ Save</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('ci-cancel').onclick=()=>{showCISheet=false;render();};
  document.getElementById('ci-save')?.addEventListener('click',saveCILevels);
}

function editCIVal(section,val){
  if(section==='start'){
    _editStartCI=val;
    // Auto-lift current if it would fall below start
    if(_editCurrentCI<val)_editCurrentCI=val;
    // Auto-lift goal if it would become invalid
    if(_editGoalCI<=val)_editGoalCI=Math.min(10,val+1);
  } else if(section==='current'){
    _editCurrentCI=val;
    // Auto-lift goal if it would fall below current
    if(_editGoalCI<val)_editGoalCI=Math.min(10,val+1);
    if(_editGoalCI<=_editStartCI)_editGoalCI=Math.min(10,_editStartCI+1);
  } else if(section==='goal'){
    _editGoalCI=val;
  }
  renderCISheet();
}

function saveCILevels(){
  _activeMilestoneIdx=null;
  const prev=char.ciLevel||0;
  const newCI=_editCurrentCI;
  const changed=newCI!==prev||_editStartCI!==(char.startCI||0)||_editGoalCI!==(char.ciGoal||10);
  // Revoke CI badges if current is going down
  if(newCI<prev){
    const revokedIds=ACHS
      .filter(a=>{
        if(!a.id.startsWith('ci'))return false;
        const lvl=parseInt(a.id.slice(2));
        return!isNaN(lvl)&&lvl>newCI&&char.achievements.includes(a.id);
      })
      .map(a=>a.id);
    if(revokedIds.length){
      char.achievements=char.achievements.filter(id=>!revokedIds.includes(id));
    }
  }
  char.startCI=_editStartCI;
  char.ciLevel=newCI;
  char.ciGoal=_editGoalCI;
  if(newCI!==prev){
    char.ciHistory=[...(char.ciHistory||[]),{ci:newCI,date:today()}];
    expandedCIRef.add(newCI);
  }
  const newly=[];
  for(const a of ACHS)if(!char.achievements.includes(a.id)&&a.check(char,photos)){char.achievements=[...char.achievements,a.id];newly.push({title:a.title,icon:a.icon});}
char.ciSetupDone=true;
  saveChar();
  if(newCI>prev)showToast(`🎉 ${LEVELS[newCI].ci} reached!`);
  else if(newCI<prev)showToast(`◑ CI adjusted to ${LEVELS[newCI].ci}`);
  else if(changed)showToast('✓ CI levels saved');
  if(newly.length){setTimeout(()=>showToast(`🏅 ${newly[0].title} unlocked!`),1800);}
  showCISheet=false;render();
}

// ── MANUAL TIME HELPERS ────────────────────────────────────────────────────────
function calcManualMins(){
  if(!manualStart||!manualEnd)return 0;
  const sd=manualStartDate||today();
  const ed=manualEndDate||today();
  const startMs=new Date(`${sd}T${manualStart}:00`).getTime();
  const endMs=new Date(`${ed}T${manualEnd}:00`).getTime();
  if(isNaN(startMs)||isNaN(endMs))return 0;
  const diff=Math.round((endMs-startMs)/60000);
  // Sanity check — must be positive and under 14 days
  return diff>0&&diff<=20160?diff:0;
}
function calcManualPreview(){
  if(manualStillActive){
    if(!manualStart)return'Enter your start time above';
    const sd=manualStartDate||today();
    const startMs=new Date(`${sd}T${manualStart}:00`).getTime();
    if(isNaN(startMs))return'Invalid start time';
    const diff=Math.floor((Date.now()-startMs)/60000);
    if(diff<0)return'<span style="color:#c0392b">Start time is in the future</span>';
    const days=Math.floor(diff/1440),hrs=Math.floor((diff%1440)/60),mins=diff%60;
    const label=days>0?`${days}d ${hrs}h ${mins}m`:hrs>0?`${hrs}h ${mins}m`:`${mins}m`;
    return`Running since ${sd} ${manualStart} — <strong style="color:var(--green);font-size:15px">${label}</strong> so far`;
  }
  const mins=calcManualMins();
  if(!manualStart||!manualEnd)return'Enter start and end above';
  if(mins===0){
    const sd=manualStartDate||today();const ed=manualEndDate||today();
    const startMs=new Date(`${sd}T${manualStart}:00`).getTime();
    const endMs=new Date(`${ed}T${manualEnd}:00`).getTime();
    if(endMs<=startMs)return'<span style="color:#c0392b">End must be after start</span>';
    return'<span style="color:#c0392b">Duration too long — check dates</span>';
  }
  const days=Math.floor(mins/1440),hrs=Math.floor((mins%1440)/60),rem=mins%60;
  const label=days>0?`${days}d ${hrs}h ${rem}m`:hrs>0?`${hrs}h ${rem}m`:`${rem}m`;
  return`<strong style="color:var(--text1);font-size:15px">${label}</strong><span style="color:var(--text4);font-size:11px"> total</span>`;
}
function updateManualPreview(){
  const el=document.getElementById('manual-duration-preview');
  if(el)el.innerHTML=calcManualPreview();
  const logBtn=document.getElementById('s-log');
  if(logBtn)logBtn.disabled=!(sheetMethod&&sheetCat&&calcManualMins()>0);
  const startFromBtn=document.getElementById('s-start-from');
  if(startFromBtn)startFromBtn.disabled=!(sheetMethod&&sheetCat&&manualStart);
}
function beginSessionFrom(dateStr,timeStr){
  if(!sheetMethod||!sheetCat||!timeStr)return;
  const startMs=new Date(`${dateStr}T${timeStr}:00`).getTime();
  if(isNaN(startMs))return;
  const elapsedMs=Math.max(0,Date.now()-startMs);
  const elapsedSecs=Math.floor(elapsedMs/1000);
  activeTimer={startedAt:Date.now()-elapsedMs,wallStart:Date.now()-elapsedMs,method:sheetMethod,cat:sheetCat,notes:sheetNotes,elapsedOnPause:0};
  timerSecs=elapsedSecs;
  saveTimer(activeTimer);startInterval();
  showSessionSheet=false;manualStillActive=false;
  if(navigator.vibrate)navigator.vibrate(60);
  const days=Math.floor(elapsedSecs/86400),hrs=Math.floor((elapsedSecs%86400)/3600);
  const label=days>0?`${days}d ${hrs}h already logged`:`${fmtMin(Math.floor(elapsedSecs/60))} already logged`;
  showToast(`⏱ Timer started from ${dateStr} ${timeStr} — ${label}`);
  render();
}

// ── SESSION SHEET ──────────────────────────────────────────────────────────────
function mountSheet(){
  const ex=document.getElementById('sov');if(ex)ex.remove();
  const customMethods=char.customMethods||[];
  const allCats=CATS.map(c=>c.id==='custom'?{...c,methods:customMethods}:c);
  const cat=allCats.find(c=>c.id===sheetCat);
  const catPills=allCats.map(c=>`<div class="mcat-pill${sheetCat===c.id?' active':''}"
    style="${sheetCat===c.id?`border-color:${c.color};color:${c.color};background:${c.color}14`:''}"
    onclick="sheetCat='${c.id}';sheetMethod='';refreshSheet()">
    ${c.icon} ${c.label}
  </div>`).join('');
  const methPills=cat?cat.methods.map(m=>`<div class="meth-pill${sheetMethod===m?' active':''}"
    style="${sheetMethod===m&&cat?`border-color:${cat.color};background:${cat.color}14;color:${cat.color}`:''}"
    onclick="sheetMethod=this.dataset.m;refreshSheet()" data-m="${m.replace(/"/g,'&quot;')}">
    ${m}${cat.id==='custom'?`<span onclick="event.stopPropagation();deleteCustomMethod(this.closest('[data-m]').dataset.m)" style="opacity:.5;font-size:10px;cursor:pointer;margin-left:2px">✕</span>`:''}
  </div>`).join(''):'';
  const customForm=sheetCat==='custom'?`
    <div style="border-top:1px solid var(--stat-border);margin-top:10px;padding-top:10px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:7px">🛠️ Create a custom method</div>
      <div style="display:flex;gap:7px;margin-bottom:7px">
        <input class="gold-inp" id="cust-inp" placeholder="e.g. My Modified Squeeze..." style="margin:0;flex:1;font-size:12px;padding:7px 10px">
        <button class="btn-outline" id="add-cust-btn" style="white-space:nowrap;padding:7px 12px">＋ Add</button>
      </div>
      <label style="display:flex;align-items:center;gap:7px;font-size:11px;color:var(--text3);cursor:pointer">
        <input type="checkbox" id="save-cust-chk" checked style="accent-color:var(--accent);cursor:pointer">
        Save to profile for reuse
      </label>
    </div>`:'';
  const isTimer=logMode==='timer';
  const canGo=!!(sheetMethod&&sheetCat);
  const el=document.createElement('div');el.className='overlay';el.id='sov';
  el.innerHTML=`<div class="sheet">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:12px">New Session</div>
    <div class="mode-row">
      <div class="mode-pill${logMode==='timer'?' active':''}" id="mp-timer">▶ Timer</div>
      <div class="mode-pill${logMode==='manual'?' active':''}" id="mp-manual">✏ Log Past Time</div>
    </div>
    <div class="sec-title" style="margin-top:4px">Method</div>
    <div class="mcat-row">${catPills}</div>
    ${cat?`<div class="meth-grid">${methPills}</div>${customForm}`:`<div style="color:var(--text5);font-size:11px;padding:6px 2px">Pick a category above.</div>`}
    ${!isTimer?`<div class="sec-title" style="margin-top:10px">When did you start?</div>
    <div class="card" style="padding:14px">
      <div style="margin-bottom:12px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Start</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input type="date" id="m-start-date" value="${manualStartDate||today()}" max="${today()}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:'DM Sans',sans-serif">
          <input type="time" id="m-start" value="${manualStart}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:700;width:100%;outline:none;font-family:'Cinzel',serif;text-align:center">
        </div>
      </div>
      <div id="end-col" style="${manualStillActive?'opacity:.35;pointer-events:none':''}margin-bottom:12px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">End</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input type="date" id="m-end-date" value="${manualEndDate||today()}" max="${today()}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:'DM Sans',sans-serif">
          <input type="time" id="m-end" value="${manualEnd}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:700;width:100%;outline:none;font-family:'Cinzel',serif;text-align:center">
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:9px;cursor:pointer;padding:8px 0;border-top:1px solid var(--stat-border)">
        <input type="checkbox" id="m-still-active" ${manualStillActive?'checked':''} style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer;flex-shrink:0">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text2)">I'm still restoring right now</div>
          <div style="font-size:10px;color:var(--text4);margin-top:1px">Starts the timer from your start date/time and keeps running</div>
        </div>
      </label>
      <div id="manual-duration-preview" style="text-align:center;font-size:13px;color:var(--text3);min-height:20px;margin-top:10px">${calcManualPreview()}</div>
    </div>`:''}
    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn-ghost" id="s-cancel" style="flex:0 0 76px">Cancel</button>
      <div style="flex:1">${isTimer
        ?`<button class="btn-green" id="s-start" style="margin:0" ${!canGo?'disabled':''}>${IC.play(14)} Start Timer</button>`
        :manualStillActive
          ?`<button class="btn-green" id="s-start-from" style="margin:0" ${!canGo||!manualStart?'disabled':''}>${IC.play(14)} Start from here</button>`
          :`<button class="btn-gold" id="s-log" ${!canGo||!calcManualMins()?'disabled':''}>✓ Log Session</button>`
      }</div>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('mp-timer').onclick=()=>{logMode='timer';manualStillActive=false;refreshSheet();};
  document.getElementById('mp-manual').onclick=()=>{logMode='manual';refreshSheet();};
  document.getElementById('s-cancel').onclick=()=>{showSessionSheet=false;render();};
  document.getElementById('m-start-date')?.addEventListener('input',e=>{manualStartDate=e.target.value;updateManualPreview();});
  document.getElementById('m-start')?.addEventListener('input',e=>{manualStart=e.target.value;updateManualPreview();});
  document.getElementById('m-end-date')?.addEventListener('input',e=>{manualEndDate=e.target.value;updateManualPreview();});
  document.getElementById('m-end')?.addEventListener('input',e=>{manualEnd=e.target.value;updateManualPreview();});
  document.getElementById('m-still-active')?.addEventListener('change',e=>{
    manualStillActive=e.target.checked;
    refreshSheet();
  });
  document.getElementById('s-start')?.addEventListener('click',()=>{beginSession();});
  document.getElementById('s-start-from')?.addEventListener('click',()=>{
    if(!sheetMethod||!sheetCat||!manualStart)return;
    beginSessionFrom(manualStartDate||today(),manualStart);
  });
  document.getElementById('s-log')?.addEventListener('click',()=>{
    const mins=calcManualMins();
    if(mins<=0)return;
    // Pass actual timestamps so multi-day sessions get split properly
    const sd=manualStartDate||today(),ed=manualEndDate||today();
    const startMs=new Date(`${sd}T${manualStart}:00`).getTime();
    const endMs=new Date(`${ed}T${manualEnd}:00`).getTime();
    logManual(sheetMethod,sheetCat,mins,'',sd,startMs,endMs);
  });
  document.getElementById('add-cust-btn')?.addEventListener('click',()=>{
    const inp=document.getElementById('cust-inp');const save=document.getElementById('save-cust-chk')?.checked!==false;
    if(inp&&inp.value.trim())addCustomMethod(inp.value.trim(),save);
  });
  document.getElementById('cust-inp')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){const save=document.getElementById('save-cust-chk')?.checked!==false;if(e.target.value.trim())addCustomMethod(e.target.value.trim(),save);}
  });
}
function refreshSheet(){const el=document.getElementById('sov');if(el)el.remove();mountSheet();}

function addCustomMethod(name,save){
  if(!name.trim())return;sheetMethod=name.trim();
  if(save&&!(char.customMethods||[]).includes(name.trim())){char.customMethods=[...(char.customMethods||[]),name.trim()];saveChar();}
  refreshSheet();
}
function deleteCustomMethod(name){
  char.customMethods=(char.customMethods||[]).filter(m=>m!==name);
  if(sheetMethod===name)sheetMethod='';saveChar();refreshSheet();
}

// ── STOP SHEET ─────────────────────────────────────────────────────────────────
function mountStopSheet(){
  const ex=document.getElementById('stop-ov');if(ex)ex.remove();
  const mins=Math.max(1,Math.round(timerSecs/60));
  const method=activeTimer?.method||sheetMethod;
  const goalHit=todayMin()+mins>=char.dailyGoalMin;
  const el=document.createElement('div');el.className='overlay';el.id='stop-ov';
  el.innerHTML=`<div class="sheet">
    <div class="sheet-handle"></div>
    <div style="text-align:center;margin-bottom:14px">
      <div style="font-family:Cinzel,serif;font-size:12px;color:var(--text4);margin-bottom:6px">Session Complete</div>
      <div class="big-timer">${fmtLive(timerSecs)}</div>
      <div style="font-size:12px;color:var(--text3);margin-top:4px">${method}</div>
      <div style="margin-top:8px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <div class="xp-tag">Session #${char.sessions+1}</div>
        ${char.streak>1?`<div class="xp-tag">${char.streak}-day streak 🔥</div>`:''}
        ${goalHit?`<div class="xp-tag" style="border-color:rgba(34,168,90,.4);color:var(--green)">🎯 Daily goal hit!</div>`:''}
      </div>
    </div>
    <div class="sec-title">Notes (Optional)</div>
    <textarea id="stop-notes" placeholder="Comfort level, device tension, observations...">${sheetNotes}</textarea>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn-ghost" id="stop-resume">↺ Resume</button>
      <button class="btn-gold" id="stop-save" style="flex:1">✓ Save Session</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('stop-resume').onclick=resumeSession;
  document.getElementById('stop-save').onclick=()=>{commitSession(document.getElementById('stop-notes')?.value||'');};
}

// ── EVENTS ─────────────────────────────────────────────────────────────────────
function attachEvents(){
  document.getElementById('quick-start-btn')?.addEventListener('click',()=>{
    if(!char.lastMethod||!char.lastCat)return;
    sheetMethod=char.lastMethod;sheetCat=char.lastCat;sheetNotes='';
    beginSession();
  });
  document.getElementById('start-session-btn')?.addEventListener('click',()=>{showSessionSheet=true;logMode='timer';sheetCat=null;sheetMethod='';sheetNotes='';render();});
  document.getElementById('log-past-btn')?.addEventListener('click',()=>{showSessionSheet=true;logMode='manual';sheetCat=null;sheetMethod='';sheetNotes='';manualStart='';manualEnd='';manualStartDate=today();manualEndDate=today();manualStillActive=false;render();});
  document.getElementById('stop-btn')?.addEventListener('click',stopSession);
  document.getElementById('resume-btn')?.addEventListener('click',resumeSession);
  document.getElementById('goal-inp')?.addEventListener('change',e=>{char.dailyGoalMin=Math.max(5,Math.min(1440,+e.target.value||120));saveChar();render();});
  document.getElementById('export-btn')?.addEventListener('click',exportCSV);
  document.getElementById('update-ci-btn')?.addEventListener('click',()=>{showCISheet=true;render();});
  document.getElementById('update-ci-btn2')?.addEventListener('click',()=>{showCISheet=true;render();});
  document.getElementById('coach-talk-btn')?.addEventListener('click',()=>showCoachSheet());
  document.getElementById('coach-cta')?.addEventListener('click',()=>{
    if(currentCoachCTA==='log'){showSessionSheet=true;logMode='timer';sheetCat=null;sheetMethod='';sheetNotes='';render();}
    else if(currentCoachCTA==='photos'){tab='photos';render();}
    else if(currentCoachCTA==='journey'){tab='journey';render();}
  });
  document.getElementById('open-compare-btn')?.addEventListener('click',()=>openComparePicker());
  document.getElementById('open-photo-guide-btn')?.addEventListener('click',()=>{
    photoGuideStep=1;pendingPhotoData=null;pendingPhotoCI=null;mountPhotoGuideSheet();
  });
  document.getElementById('open-photo-library-btn')?.addEventListener('click',()=>{
    // Skip the tips guide for existing photos — go straight to file picker then tag step
    photoGuideStep=1;pendingPhotoData=null;pendingPhotoCI=null;
    document.getElementById('photo-file-library').click();
  });
  const pf=document.getElementById('photo-file');
  if(pf){pf.addEventListener('change',e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      pendingPhotoData=ev.target.result;
      photoGuideStep=2;
      const ex=document.getElementById('photo-guide-ov');if(ex)ex.remove();
      mountPhotoGuideSheet();
    };
    reader.readAsDataURL(file);
    pf.value='';
  });}
  const pfl=document.getElementById('photo-file-library');
  if(pfl){pfl.addEventListener('change',e=>{
    const files=Array.from(e.target.files);if(!files.length)return;
    photoQueue=[];
    let loaded=0;
    files.forEach((file,i)=>{
      const reader=new FileReader();
      reader.onload=ev=>{
        photoQueue[i]={data:ev.target.result,fileName:file.name};
        loaded++;
        if(loaded===files.length){
          // All files read — start tagging the first one
          pendingPhotoData=photoQueue[0].data;
          pendingPhotoCI=LEVELS[char.ciLevel||0].ci;
          photoGuideStep=2;
          const ex=document.getElementById('photo-guide-ov');if(ex)ex.remove();
          mountPhotoGuideSheet();
        }
      };
      reader.readAsDataURL(file);
    });
    pfl.value='';
  });}
  document.querySelectorAll('.edit-btn').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const id=+b.dataset.id;
    openEditSessionSheet(id);
  }));
  document.querySelectorAll('.del-btn').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const id=+b.dataset.id;
    const entry=logs.find(l=>l.id===id);
    if(!entry)return;
    const label=`${entry.method} · ${fmtMin(entry.dur)} · ${fmtDate(entry.date)}`;
    confirmDialog(
      'Delete this session?',
      `"${label}" will be permanently removed. Your session count and total time will be adjusted.`,
      'Delete',
      ()=>{
        char.sessions=Math.max(0,char.sessions-1);
        char.minutes=Math.max(0,char.minutes-entry.dur);
        logs=logs.filter(l=>l.id!==id);
        saveChar();saveLogs();render();
      }
    );
  }));
}

// ── COMMUNITY / FIREBASE ───────────────────────────────────────────────────────
const COMM_AVATARS=[
  '🌱','🌿','🍃','🌳','🌾','🌊','🔥','⚡','💎','✨',
  '🦅','🐉','🦁','🐺','🦊','🐻','🦋','🐬','🦉','🌙',
  '⭐','🌟','💫','☀️','🌈','❄️','🍀','🎯','🔮','⚔️',
  '🛡️','🗡️','🏹','🔑','🪬','🧬','💪','🤝','👊','🙌',
  '🎖️','🏅','🥇','🏆','🎗️','🎪','🎭','🎨','🎵','🎶',
  '🌺','🌸','🌻','🎋','🏔️','⛰️','🧗','🥊','🧘','🌌',
  '🪐','🌠','🌋','🐆','🦂','⚜️','🧿','♟️','🪄','🗺️'
];
function avatarCircle(emoji,size=38,border='var(--acc30)',bg='var(--acc12)'){
  return`<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:2px solid ${border};display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.52)}px;flex-shrink:0;line-height:1">${emoji||'🌱'}</div>`;
}
const FB_CFG={apiKey:"AIzaSyBsJCNIQmiB_zYB1EqZZLk-_gITTX8m-q8",authDomain:"restoretrack-76aae.firebaseapp.com",projectId:"restoretrack-76aae",storageBucket:"restoretrack-76aae.firebasestorage.app",messagingSenderId:"592305053944",appId:"1:592305053944:web:9bc6c3894f034c2017db0d"};
let db=null,fbAuth=null,fbUID=null,fbIsGoogle=false;
let commTab=localStorage.getItem('rst-comm-tab')||'live'; // persists last inner tab
let commState={ready:false,loading:true,users:[],posts:[],unsubUsers:null,unsubPosts:null,unsubEncourage:null,authError:null,newEncouragements:[],openReplies:new Set(),replies:{},broadcast:null};

// ── NEW-POST BADGE TRACKING ─────────────────────────────────────────────────
function getLastSeen(tabKey){return parseInt(localStorage.getItem(`rst-lastseen-${tabKey}`)||'0');}
function setLastSeen(tabKey){localStorage.setItem(`rst-lastseen-${tabKey}`,Date.now());}
function countNewPosts(){
  const cutoff=getLastSeen('posts');
  if(!cutoff)return 0;
  return commState.posts.filter(p=>{
    if(p.type==='milestone')return false;
    const ms=p.ts?.toMillis?p.ts.toMillis():0;
    return ms>cutoff;
  }).length;
}

function initFirebase(){
  if(db)return; // already initialised
  try{
    if(!firebase.apps.length)firebase.initializeApp(FB_CFG);
    db=firebase.firestore();
    fbAuth=firebase.auth();
    // Eagerly check redirect result BEFORE registering onAuthStateChanged
    // This ensures Google auth is processed first on redirect return
    fbAuth.getRedirectResult().then(result=>{
      if(result&&result.user&&localStorage.getItem('rst-comm-pending')){
        localStorage.removeItem('rst-comm-pending');
        fbUID=result.user.uid;fbIsGoogle=true;
        commState.ready=true;commState.authError=null;
        finaliseJoin();
        return;
      }
    }).catch(()=>{});
    fbAuth.onAuthStateChanged(user=>{
      if(user){
        const isGoogle=user.providerData.some(p=>p.providerId==='google.com');
        if(!isGoogle&&fbIsGoogle)return;
        fbUID=user.uid;
        fbIsGoogle=isGoogle;
        commState.ready=true;commState.authError=null;
        if(fbIsGoogle&&localStorage.getItem('rst-comm-pending')){
          localStorage.removeItem('rst-comm-pending');
          finaliseJoin();
        } else {
          startCommunityListeners();
        }
      } else {
        if(localStorage.getItem('rst-comm-pending'))return;
        fbAuth.signInAnonymously().catch(e=>{
          commState.authError='Could not connect. Check your internet connection.';
          commState.loading=false;refreshCommUI();
        });
      }
    });
  }catch(e){
    commState.authError='Firebase failed to load. Try refreshing.';
    commState.loading=false;refreshCommUI();
  }
}

function signInWithGoogle(){
  if(!fbAuth)return;
  const provider=new firebase.auth.GoogleAuthProvider();
  // Always show account picker — prevents auto-reuse of previous session
  provider.setCustomParameters({prompt:'select_account'});
  fbAuth.signInWithPopup(provider).then(result=>{
    fbUID=result.user.uid;fbIsGoogle=true;
    commState.ready=true;commState.authError=null;
    localStorage.removeItem('rst-comm-pending');
    finaliseJoin();
  }).catch(e=>{
    if(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment'){
      // Popup blocked (Safari) — fall back to redirect
      localStorage.setItem('rst-comm-pending','1');
      fbAuth.signInWithRedirect(provider);
    } else if(e.code!=='auth/popup-closed-by-user'){
      showToast('⚠ Sign-in failed. Try again.');
      console.warn('Google sign-in error:',e.code,e.message);
    }
  });
}

// Normalize a display name for uniqueness comparison:
// lowercase, strip punctuation and extra spaces
function normalizeName(n){
  return(n||'').toLowerCase().replace(/[^a-z0-9]/g,'').trim();
}

// Check if a display name is available — returns promise resolving to true/false
function checkNameAvailable(name){
  if(!db)return Promise.resolve(true);
  const normalized=normalizeName(name);
  if(!normalized)return Promise.resolve(false);
  return db.collection('community_users')
    .where('nameLower','==',normalized)
    .limit(2)
    .get()
    .then(snap=>{
      // Available if no results, or the only result is the current user
      const others=snap.docs.filter(d=>d.id!==fbUID);
      return others.length===0;
    })
    .catch(()=>true); // on error, allow — don't block the user
}

function finaliseJoin(){
  const name=char.name.trim();
  if(!name||!db||!fbUID)return;
  db.collection('bans').doc(fbUID).get().then(banDoc=>{
    if(banDoc.exists&&banDoc.data().banned){
      showToast('⚠ Your account has been suspended from the community.');
      localStorage.removeItem('rst-comm-pending');
      char.communityEnabled=false;saveChar();
      if(fbAuth)fbAuth.signOut().catch(()=>{});
      fbUID=null;fbIsGoogle=false;
      tab='community';render();
      return;
    }
    joinProceed(name);
  }).catch(()=>joinProceed(name));
}

function joinProceed(name){
  db.collection('community_users').doc(fbUID).get().then(doc=>{
    if(doc.exists&&doc.data().name){
      const existing=doc.data();
      char.communityDisplayName=existing.name;
      char.communityEnabled=true;char.communityVisible=char.communityVisible!==false;
      saveChar();tab='community';
      startCommunityListeners();
      setTimeout(()=>{syncPresence();refreshCommUI();},1200);
      render();
    } else {
      checkNameAvailable(name).then(available=>{
        if(!available){
          showToast(`⚠ The name "${name}" is already taken in the community.\nRename your profile and try again.`);
          localStorage.removeItem('rst-comm-pending');
          char.communityEnabled=false;saveChar();
          tab='community';render();
          return;
        }
        char.communityDisplayName=name;
        char.communityEnabled=true;char.communityVisible=true;saveChar();
        tab='community';
        db.collection('community_users').doc(fbUID).set({
          joinedAt:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true}).catch(()=>{});
        startCommunityListeners();
        setTimeout(()=>{syncPresence();refreshCommUI();},1200);
        render();
      });
    }
  }).catch(()=>{
    char.communityDisplayName=name;
    char.communityEnabled=true;char.communityVisible=true;saveChar();
    tab='community';
    startCommunityListeners();
    setTimeout(()=>{syncPresence();refreshCommUI();},1200);
    render();
  });
}

function startCommunityListeners(){
  if(!db||!fbUID)return;
  if(commState.unsubUsers)commState.unsubUsers();
  if(commState.unsubPosts){commState.unsubPosts();commState.unsubPosts=null;}
  if(commState.unsubEncourage)commState.unsubEncourage();

  // ── Real-time: active users only (last 7 days — keeps read count low)
  const userCutoff=firebase.firestore.Timestamp.fromDate(new Date(Date.now()-7*86400000));
  commState.unsubUsers=db.collection('community_users')
    .where('lastSeen','>',userCutoff)
    .orderBy('lastSeen','desc').limit(60)
    .onSnapshot(snap=>{
      commState.users=snap.docs.map(d=>({uid:d.id,...d.data()})).filter(u=>u.visible!==false&&!u.banned);
      // Check if current user is banned (community_users doc may have been updated)
      const myDoc=snap.docs.find(d=>d.id===fbUID);
      if(myDoc?.data()?.banned){
        // Double-check against bans collection to confirm
        db.collection('bans').doc(fbUID).get().then(banDoc=>{
          if(banDoc.exists&&banDoc.data().banned){
            commState.authError='Your account has been suspended from the community.';
            commState.loading=false;refreshCommUI();
          }
        }).catch(()=>{});
        return;
      }
      commState.loading=false;refreshCommUI();
    },e=>{
      commState.authError='Could not load community. Check Firestore rules are published.';
      commState.loading=false;refreshCommUI();
    });

  // ── Manual fetch: posts loaded on demand, not streamed
  fetchPosts(true);

  // ── Real-time: encouragements (only our own — tiny read cost)
  const encCutoff=firebase.firestore.Timestamp.now();
  commState.unsubEncourage=db.collection('community_users').doc(fbUID)
    .collection('encouragements')
    .where('ts','>',encCutoff)
    .orderBy('ts','desc').limit(10)
    .onSnapshot(snap=>{
      snap.docChanges().forEach(change=>{
        if(change.type==='added'){
          const d=change.doc.data();
          const from=d.fromName||'Someone';
          const avatar=d.fromAvatar||'👊';
          commState.newEncouragements.unshift({from,avatar,ts:Date.now()});
          if(commState.newEncouragements.length>5)commState.newEncouragements.pop();
          showToast(`${avatar} ${from} encouraged you!`);
          const navComm=document.querySelector('[data-tab="community"] .nav-icon');
          if(navComm&&tab!=='community'){
            if(!navComm.querySelector('.enc-badge')){
              const badge=document.createElement('span');
              badge.className='enc-badge';
              badge.style.cssText='position:absolute;top:-2px;right:-4px;width:8px;height:8px;border-radius:50%;background:#e74c3c;border:1.5px solid var(--bg-nav)';
              navComm.appendChild(badge);
            }
          }
          if(tab==='community')refreshCommUI();
        }
      });
    },()=>{});

  // Broadcast listener — single doc, near-zero read cost
  db.collection('broadcast').doc('active').onSnapshot(snap=>{
    commState.broadcast=snap.exists?snap.data():null;
    if(tab==='community')refreshCommUI();
  },()=>{});

  if(char.communityEnabled&&char.communityDisplayName)syncPresence();

}

let lastPostFetch=0; // timestamp of last fetch — rate limiting
function fetchPosts(force=false){
  if(!db)return;
  const now=Date.now();
  const cooldown=30000; // 30 seconds between fetches
  if(!force&&now-lastPostFetch<cooldown){
    const remaining=Math.ceil((cooldown-(now-lastPostFetch))/1000);
    showToast(`Please wait ${remaining}s before refreshing again`);
    return;
  }
  lastPostFetch=now;
  commState.postsLoading=true;
  refreshCommUI();
  const cutoff=firebase.firestore.Timestamp.fromDate(new Date(now-14*86400000));
  db.collection('posts')
    .where('ts','>',cutoff).orderBy('ts','desc').limit(40)
    .get().then(snap=>{
      commState.posts=snap.docs.map(d=>({id:d.id,...d.data()}));
      commState.postsLoading=false;
      refreshCommUI();
    }).catch(()=>{commState.postsLoading=false;refreshCommUI();});
}

function refreshCommUI(){
  if(tab!=='community')return;
  const c=document.getElementById('content');
  if(c){c.innerHTML=renderCommunity();attachCommunityEvents();}
}

function syncPresence(){
  if(!db||!fbUID||!fbIsGoogle||!char.communityEnabled||!char.communityDisplayName)return;
  const running=!!activeTimer&&!!activeTimer.startedAt;
  db.collection('community_users').doc(fbUID).set({
    name:char.communityDisplayName,
    nameLower:normalizeName(char.communityDisplayName),
    avatar:char.communityAvatar||'🌱',
    bio:char.communityBio||'',
    shareStats:char.communityShareStats!==false,
    ci:char.ciLevel||0,
    streak:char.streak||0,
    sessions:char.communityShareStats!==false?char.sessions:null,
    totalHours:char.communityShareStats!==false?Math.floor(char.minutes/60):null,
    topMethods:getTopMethods(3),
    achievements:char.communityShareStats!==false?(char.achievements||[]):[],
    active:running,
    method:running?(activeTimer.method||''):'',
    sessionStartedAt:running&&activeTimer.startedAt?new Date(activeTimer.startedAt):null,
    todayMins:todayMin(),
    lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
    // joinedAt is intentionally excluded here — it is set ONCE in the join flow and must not be overwritten
    visible:char.communityVisible!==false
  },{merge:true}).catch(()=>{});
}

function getTopMethods(n){
  // Count sessions per method from logs
  const counts={};
  logs.forEach(l=>{if(l.method)counts[l.method]=(counts[l.method]||0)+1;});
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([m])=>m);
}

function leaveComm(){
  if(db&&fbUID&&fbIsGoogle)db.collection('community_users').doc(fbUID).update({visible:false}).catch(()=>{});
  char.communityEnabled=false;char.communityDisplayName='';saveChar();
  if(commState.unsubUsers)commState.unsubUsers();
  if(commState.unsubPosts)commState.unsubPosts();
  if(commState.unsubEncourage)commState.unsubEncourage();
  commState={ready:false,loading:true,users:[],posts:[],unsubUsers:null,unsubPosts:null,unsubEncourage:null,authError:null,newEncouragements:[],openReplies:new Set(),replies:{},broadcast:null};
  // Sign out of Firebase so the account picker shows fresh on next join
  if(fbAuth)fbAuth.signOut().catch(()=>{});
  db=null;fbAuth=null;fbUID=null;fbIsGoogle=false;
  const ex=document.getElementById('comm-settings-ov');if(ex)ex.remove();
  render();
}

const _reactLocks=new Set();
let _postSubmitting=false;
function commPost(text,title){
  if(!db||!fbUID||!fbIsGoogle||!text.trim()){showToast('⚠ Sign in with Google to post');return;}
  if(_postSubmitting){showToast('⚠ Please wait, posting…');return;}
  _postSubmitting=true;
  const postData={
    title:title||'',text:text.trim().slice(0,200),uid:fbUID,
    name:char.communityDisplayName||'Anonymous',
    avatar:char.communityAvatar||'🌱',
    ci:char.ciLevel||0,
    ts:firebase.firestore.FieldValue.serverTimestamp(),
    rf:0,rm:0,rh:0,replyCount:0,type:'post'
  };
  db.collection('posts').add(postData).then(doc=>{
    _postSubmitting=false;
    // Inject into local cache immediately so it appears without a manual refresh
    const localPost={...postData,id:doc.id,ts:{toMillis:()=>Date.now()}};
    commState.posts=[localPost,...commState.posts];
    showToast('✓ Posted!');
    if(commTab==='posts')refreshCommUI();
  }).catch(()=>{_postSubmitting=false;showToast('⚠ Could not post');});
}


function commReact(postId,r){
  if(!db||!fbUID)return;
  // Per-post lock: ignore taps while a Firestore write for this post is in-flight
  if(_reactLocks.has(postId))return;
  _reactLocks.add(postId);
  const stored=JSON.parse(localStorage.getItem('rst-reactions')||'{}');
  // stored[postId] = the reaction type the user has on this post ('fire','muscle','heart') or undefined
  const current=stored[postId]; // what they've already picked
  const field=r==='fire'?'rf':r==='muscle'?'rm':'rh';
  const prevField=current==='fire'?'rf':current==='muscle'?'rm':current==='heart'?'rh':null;

  if(current===r){
    // Tapping same reaction again — remove it
    db.collection('posts').doc(postId).update({
      [field]:firebase.firestore.FieldValue.increment(-1)
    }).then(()=>_reactLocks.delete(postId)).catch(()=>_reactLocks.delete(postId));
    delete stored[postId];
    commState.posts=commState.posts.map(p=>p.id===postId?{...p,[field]:Math.max(0,(p[field]||0)-1)}:p);
  } else {
    // Switching to a different reaction (or picking for first time)
    const updates={[field]:firebase.firestore.FieldValue.increment(1)};
    if(prevField)updates[prevField]=firebase.firestore.FieldValue.increment(-1);
    db.collection('posts').doc(postId).update(updates).then(()=>_reactLocks.delete(postId)).catch(()=>_reactLocks.delete(postId));
    stored[postId]=r;
    commState.posts=commState.posts.map(p=>{
      if(p.id!==postId)return p;
      const updated={...p,[field]:(p[field]||0)+1};
      if(prevField)updated[prevField]=Math.max(0,(p[prevField]||0)-1);
      return updated;
    });
  }
  localStorage.setItem('rst-reactions',JSON.stringify(stored));
  refreshCommUI();
}

function deleteCommPost(postId){
  if(!db||!fbUID)return;
  db.collection('posts').doc(postId).delete().catch(()=>{});
}

function reportPost(postId){
  if(!db||!fbUID){showToast('Sign in to report posts');return;}
  confirmDialog(
    'Report this post?',
    'This will flag the post for review. Use this for harmful, abusive, or inappropriate content only.',
    'Report',
    ()=>{
      db.collection('reports').add({
        postId,reportedBy:fbUID,
        ts:firebase.firestore.FieldValue.serverTimestamp(),
        resolved:false
      }).then(()=>showToast('✓ Post reported — thank you'))
        .catch(()=>showToast('⚠ Could not send report'));
    }
  );
}

function toggleReplies(postId){
  if(commState.openReplies.has(postId)){
    commState.openReplies.delete(postId);
    refreshCommUI();
  } else {
    commState.openReplies.add(postId);
    loadReplies(postId);
  }
}

function loadReplies(postId){
  if(!db)return;
  db.collection('posts').doc(postId).collection('replies')
    .orderBy('ts','asc').limit(50)
    .get().then(snap=>{
      commState.replies[postId]=snap.docs.map(d=>({id:d.id,...d.data()}));
      refreshCommUI();
    }).catch(()=>{commState.replies[postId]=[];refreshCommUI();});
}

function commReply(postId){
  if(!fbIsGoogle){showToast('Join the community to reply');return;}
  const inp=document.getElementById(`reply-inp-${postId}`);
  const text=inp?.value.trim();if(!text)return;
  inp.value='';inp.disabled=true;
  // Write reply to subcollection and increment counter atomically
  const replyRef=db.collection('posts').doc(postId).collection('replies').doc();
  const batch=db.batch();
  batch.set(replyRef,{
    text:text.slice(0,200),uid:fbUID,
    name:char.communityDisplayName||'Anonymous',
    avatar:char.communityAvatar||'🌱',
    ci:char.ciLevel||0,
    ts:firebase.firestore.FieldValue.serverTimestamp()
  });
  batch.update(db.collection('posts').doc(postId),{
    replyCount:firebase.firestore.FieldValue.increment(1)
  });
  batch.commit().then(()=>{
    // Add to local cache and re-render
    if(!commState.replies[postId])commState.replies[postId]=[];
    commState.replies[postId].push({
      id:replyRef.id,text:text.slice(0,200),uid:fbUID,
      name:char.communityDisplayName,avatar:char.communityAvatar||'🌱',
      ci:char.ciLevel||0,ts:{toMillis:()=>Date.now()}
    });
    commState.posts=commState.posts.map(p=>
      p.id===postId?{...p,replyCount:(p.replyCount||0)+1}:p
    );
    inp.disabled=false;
    refreshCommUI();
  }).catch(()=>{inp.disabled=false;showToast('⚠ Could not send reply');});
}

function commEncourage(uid){
  if(!db||!fbUID||!fbIsGoogle){showToast('Sign in to send encouragement');return;}
  if(uid===fbUID){showToast('That\'s you 😄');return;}
  db.collection('community_users').doc(uid)
    .collection('encouragements').add({
      fromUID:fbUID,
      fromName:char.communityDisplayName||'Someone',
      fromAvatar:char.communityAvatar||'👊',
      ts:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>showToast('👊 Encouragement sent!'))
    .catch(()=>showToast('⚠ Could not send — try again'));
}

// ── COMMUNITY RENDER ───────────────────────────────────────────────────────────
function renderCommunity(){
  if(commState.authError){
    return`<div style="text-align:center;padding:60px 20px">
      <div style="font-size:32px;margin-bottom:12px">⚠</div>
      <div style="font-size:12px;color:var(--text4);line-height:1.7">${commState.authError}</div>
      <button class="btn-ghost" onclick="commState.authError=null;commState.loading=true;initFirebase();refreshCommUI()" style="margin-top:16px;width:100%">Try Again</button>
    </div>`;
  }
  if(!commState.ready||commState.loading){
    return`<div style="text-align:center;padding:80px 20px">
      <div class="live-dot" style="display:inline-block;margin-bottom:12px"></div>
      <div style="font-size:11px;color:var(--text4)">Loading community...</div>
    </div>`;
  }

  const isJoined=!!(char.communityEnabled&&char.communityDisplayName&&fbIsGoogle);
  const reacted=JSON.parse(localStorage.getItem('rst-reactions')||'{}');
  const now=Date.now();
  const running=!!activeTimer&&!!activeTimer.startedAt;


  // Build active list from Firestore data
  // Use lastSeen recency as the active signal — more reliable than sessionStartedAt age
  // lastSeen is kept fresh by the 5-minute heartbeat, so 2 hours is a safe window
  let active=commState.users.filter(u=>{
    if(!u.active)return false;
    if(!u.lastSeen)return false;
    const seenMs=u.lastSeen.toMillis?u.lastSeen.toMillis():new Date(u.lastSeen).getTime();
    return(now-seenMs)<7*24*60*60*1000;
  });
  const recentlyActive=commState.users.filter(u=>{
    if(u.active||!u.lastSeen)return false;
    return(now-(u.lastSeen.toMillis?u.lastSeen.toMillis():0))<30*60*1000;
  });
  const regularPosts=commState.posts.filter(p=>p.type!=='milestone');

  // ── Status bar (joined) or join banner ──
  const topBar=!isJoined
    ?`<div style="background:var(--bg-card-gold);border:1px solid var(--card-border-gold);border-radius:12px;padding:14px;margin-bottom:10px">
        <div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:6px">◈ Join the Community</div>
        <div style="font-size:11px;color:var(--text3);line-height:1.7;margin-bottom:10px">You can browse freely without signing in. To post, react, and appear as active — connect with Google. You can leave and rejoin the community at any time.</div>
        <button class="btn-gold" id="comm-join-btn" style="display:flex;align-items:center;justify-content:center;gap:7px;font-size:13px">
          <svg width="14" height="14" viewBox="0 0 24 24" style="flex-shrink:0"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.66h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Join as ${htmlEsc(char.name)}
        </button>
      </div>`
    :`<div style="background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:12px;padding:10px 14px;margin-bottom:10px;display:flex;align-items:center;gap:10px">
        <div style="position:relative;flex-shrink:0;cursor:pointer" onclick="showUserProfile('${fbUID||''}')">
          ${avatarCircle(char.communityAvatar||'🌱',36,'var(--acc30)','var(--acc12)')}
          ${running?`<div style="position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:var(--green);border:2px solid var(--bg-card)"></div>`:''}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;color:var(--text1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${char.communityDisplayName}</div>
          <div style="font-size:10px;color:var(--text4);margin-top:1px">${LEVELS[char.ciLevel||0].ci} · ${running?'<span style="color:var(--green)">● Restoring now</span>':(char.communityVisible!==false?'● Visible':'○ Hidden')}</div>
        </div>
        <button onclick="showCommSettings()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:6px 10px;font-size:12px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;flex-shrink:0">${IC.settings(14)}</button>
      </div>`;

  // ── Encouragement notification card ──
  const encCard=commState.newEncouragements.length?`
    <div style="background:var(--green-bg);border:1px solid var(--green-border);border-radius:12px;padding:11px 14px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--green);margin-bottom:7px">👊 Encouragements</div>
      ${commState.newEncouragements.map(e=>`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
          <span style="font-size:18px">${e.avatar}</span>
          <span style="font-size:12px;color:var(--text2)"><strong style="color:var(--text1)">${e.from}</strong> encouraged you!</span>
        </div>`).join('')}
    </div>`:'';

  // Broadcast banner (admin announcements)
  const broadcastBanner=commState.broadcast?.msg?`
    <div style="background:linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.06));border:1px solid var(--acc30);border-radius:12px;padding:12px 14px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
        <span style="font-size:14px">📣</span>
        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--accent)">Announcement</span>
      </div>
      <div style="font-size:12px;color:var(--text2);line-height:1.65">${htmlEsc(commState.broadcast.msg)}</div>
    </div>`:'';

  // Inner tab bar
  const newPosts=countNewPosts();
  const tabs=[
    {id:'live',   label:'🟢 Live',    badge:active.length>0?active.length:null},
    {id:'posts',  label:'💬 Posts',   badge:newPosts>0?newPosts:null},
    {id:'members',label:'👥 Members', badge:null},
  ];
  const tabBar=`<div style="display:flex;gap:5px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
    ${tabs.map(t=>`
      <button onclick="commTab='${t.id}';localStorage.setItem('rst-comm-tab','${t.id}');setLastSeen('${t.id}');${t.id==='posts'?'fetchPosts(true);':''}refreshCommUI()" style="flex:1;padding:7px 4px;border:none;border-radius:7px;cursor:pointer;font-size:11px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .15s;position:relative;
        background:${commTab===t.id?'var(--bg-card)':'transparent'};
        color:${commTab===t.id?'var(--accent)':'var(--text4)'};
        box-shadow:${commTab===t.id?'0 1px 4px rgba(0,0,0,.2)':'none'}">
        ${t.label}
        ${t.badge&&commTab!==t.id?`<span style="position:absolute;top:3px;right:3px;background:#e74c3c;color:#fff;border-radius:10px;font-size:8px;padding:0 4px;font-weight:700;min-width:14px;text-align:center">${t.badge}</span>`:''}
      </button>`).join('')}
  </div>`;

  // ── Tab content ──
  let content='';

  if(commTab==='live'){
    const activeCards=active.length
      ?active.map(u=>buildUserCard(u,now,isJoined)).join('')
      :`<div style="text-align:center;padding:28px 16px;color:var(--text5);font-size:12px;line-height:2;background:var(--bg-stat);border-radius:12px">
          <div style="font-size:28px;margin-bottom:8px">◉</div>
          No one restoring right now.<br>${isJoined?'Start a session to be first.':'Join and start a session to appear here.'}
        </div>`;
    const recentCards=recentlyActive.length
      ?`<div class="sec-title" style="margin-top:10px">Recently Active</div>${recentlyActive.map(u=>buildUserCard(u,now,isJoined)).join('')}`
      :'';
    const totalOnline=active.length+recentlyActive.length;
    content=`
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">${active.length>0?`${active.length} Restoring Right Now 🟢`:'Active Now'}</div>
        ${totalOnline>0?`<div style="font-size:10px;color:var(--text5)">${totalOnline} online</div>`:''}
      </div>
      ${activeCards}${recentCards}`;
  }

  else if(commTab==='posts'){
    const feedCards=commState.postsLoading
      ?`<div style="text-align:center;padding:28px 16px;color:var(--text5);font-size:11px">
          <div class="live-dot" style="display:inline-block;margin-bottom:8px"></div><br>Loading posts...
        </div>`
      :regularPosts.length
        ?regularPosts.map(p=>buildPostCard(p,now,reacted,isJoined)).join('')
        :`<div style="text-align:center;padding:28px 16px;color:var(--text5);font-size:12px;line-height:2;background:var(--bg-stat);border-radius:12px">
            <div style="font-size:28px;margin-bottom:8px">💬</div>
            ${isJoined?'No posts yet — be the first to share an update.':'No posts yet.'}
          </div>`;
    content=`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">Community Posts</div>
        <button onclick="fetchPosts();refreshCommUI()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif;display:flex;align-items:center;gap:5px">
          ${IC.refresh(13)} Refresh
        </button>
      </div>
      ${feedCards}
      <div style="height:68px"></div>
      ${isJoined?`<button id="comm-post-btn" style="position:fixed;bottom:80px;right:max(12px,calc(50vw - 228px));background:var(--accent);border:none;border-radius:28px;padding:0 20px 0 16px;height:48px;box-shadow:0 4px 20px rgba(0,0,0,.45);cursor:pointer;display:flex;align-items:center;gap:8px;z-index:19;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;color:var(--bg);letter-spacing:.3px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        Post Update
      </button>`:''}`;
  }


  else if(commTab==='members'){
    const allMembers=commState.users;
    const memberCards=allMembers.length
      ?allMembers.map(u=>buildUserCard(u,now,isJoined)).join('')
      :`<div style="text-align:center;padding:28px 16px;color:var(--text5);font-size:12px;background:var(--bg-stat);border-radius:12px">No members yet.</div>`;
    content=`
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">All Members</div>
        <div style="font-size:10px;color:var(--text5)">${allMembers.length} total</div>
      </div>
      ${memberCards}`;
  }

  return`${topBar}${broadcastBanner}${encCard}${tabBar}${content}`;
}

function buildUserCard(u,now,isJoined){
  const isMe=u.uid===fbUID;
  const ms=u.lastSeen?.toMillis?u.lastSeen.toMillis():0;
  let timeStr;
if(u.active){
  if(u.sessionStartedAt){
    const sessStartMs=u.sessionStartedAt.toMillis?u.sessionStartedAt.toMillis():new Date(u.sessionStartedAt).getTime();
    const elapsedMins=Math.floor((now-sessStartMs)/60000);
    timeStr=fmtDur(elapsedMins);
  } else if(u.todayMins>0){
    timeStr=fmtDur(u.todayMins)+' today';
  } else {
    timeStr='Active now';
  }
} else {
  timeStr=ms>0?timeAgo(ms):'Inactive';
}
  const encourageBtn=isMe?''
    :isJoined
      ?`<button onclick="event.stopPropagation();commEncourage('${u.uid}')" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:7px 12px;font-size:15px;cursor:pointer;flex-shrink:0" title="Encourage">👊</button>`
      :`<button onclick="event.stopPropagation();showToast('Join the community to encourage others')" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:7px 12px;font-size:15px;cursor:pointer;flex-shrink:0;opacity:.4" title="Join to encourage">👊</button>`;
  return`<div onclick="showUserProfile('${u.uid}')" style="background:var(--bg-card);border:1px solid var(--card-border);border-radius:12px;padding:12px;margin-bottom:7px;display:flex;gap:10px;align-items:center;cursor:pointer">
    <div style="position:relative;flex-shrink:0">
      ${avatarCircle(u.avatar||'🌱',38,'var(--acc30)','var(--acc12)')}
      ${u.active?`<div style="position:absolute;bottom:0;right:0;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid var(--bg-card)"></div>`:''}
    </div>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span style="font-weight:700;font-size:13px;color:var(--text1)">${u.name||'Restorer'}</span>
        <span style="font-family:Cinzel,serif;font-size:10px;color:var(--accent)">${LEVELS[Math.min(u.ci||0,10)].ci}</span>
        ${(u.streak||0)>2?`<span style="font-size:10px;color:#F59E0B">${u.streak}🔥</span>`:''}
        ${isMe?`<span style="font-size:9px;color:var(--text5)">· you</span>`:''}
      </div>
      <div style="font-size:10px;color:var(--text4);margin-top:3px">${u.active&&u.method?`${u.method} · `:''}${u.active?`<span style="color:var(--green)">${timeStr}</span>`:`<span>${timeStr}</span>`}</div>
    </div>
    ${encourageBtn}
  </div>`;
}

function buildPostCard(p,now,reacted,isJoined){
  if(!p.ts)return'';
  const ms=p.ts.toMillis?p.ts.toMillis():now;
  const ago=timeAgo(ms);
  const isMe=p.uid===fbUID;
  const isMilestone=p.type==='milestone';
  const replyCount=p.replyCount||0;
  const isOpen=commState.openReplies.has(p.id);
  const reactions=[{r:'fire',emoji:'🔥',field:'rf'},{r:'muscle',emoji:'💪',field:'rm'},{r:'heart',emoji:'❤️',field:'rh'}];

  // Build reply thread section
  let replySection='';
  if(isOpen){
    const rlist=commState.replies[p.id];
    const replyItems=rlist===undefined
      ?`<div style="font-size:11px;color:var(--text5);padding:8px 0">Loading replies...</div>`
      :rlist.length===0
        ?`<div style="font-size:11px;color:var(--text5);padding:8px 0">No replies yet — be first.</div>`
        :rlist.map(r=>{
            const rms=r.ts?.toMillis?r.ts.toMillis():now;
            const rago=timeAgoShort(rms);
            return`<div style="display:flex;gap:8px;align-items:flex-start;padding:8px 0;border-top:1px solid var(--stat-border)">
              ${avatarCircle(r.avatar||'🌱',28,'var(--acc18)','var(--acc6)')}
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:baseline;gap:5px;margin-bottom:3px">
                  <span style="font-weight:600;font-size:11px;color:var(--text1)">${r.name||'Restorer'}</span>
                  <span style="font-family:Cinzel,serif;font-size:9px;color:var(--accent)">${LEVELS[Math.min(r.ci||0,10)].ci}</span>
                  <span style="font-size:9px;color:var(--text5);margin-left:auto">${rago}</span>
                </div>
                <div style="font-size:12px;color:var(--text2);line-height:1.55">${htmlEsc(r.text||'')}</div>
              </div>
            </div>`;
          }).join('');

    const replyInput=isJoined
      ?`<div style="display:flex;gap:7px;align-items:center;padding-top:8px;border-top:1px solid var(--stat-border);margin-top:4px">
          ${avatarCircle(char.communityAvatar||'🌱',28,'var(--acc18)','var(--acc6)')}
          <input id="reply-inp-${p.id}" placeholder="Write a reply..." maxlength="200"
            style="flex:1;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:6px 12px;color:var(--text1);font-size:12px;outline:none;font-family:DM Sans,sans-serif"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();commReply('${p.id}');}">
          <button onclick="commReply('${p.id}')" style="background:var(--accent);border:none;border-radius:20px;padding:6px 12px;font-size:11px;font-weight:700;color:var(--bg);cursor:pointer;font-family:DM Sans,sans-serif;flex-shrink:0">Send</button>
        </div>`
      :`<div style="font-size:10px;color:var(--text5);padding-top:8px;border-top:1px solid var(--stat-border);text-align:center">Join the community to reply</div>`;

    replySection=`<div style="padding:0 2px;margin-top:2px">${replyItems}${replyInput}</div>`;
  }

  return`<div style="background:var(--bg-card);border:1px solid ${isMilestone?'var(--card-border-gold)':'var(--card-border)'};border-radius:12px;padding:12px;margin-bottom:7px">
    <div style="display:flex;gap:9px;align-items:flex-start;margin-bottom:9px">
      <div style="width:38px;height:38px;border-radius:50%;background:${isMilestone?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isMilestone?'var(--acc30)':'var(--stat-border)'};display:flex;align-items:center;justify-content:center;font-size:${isMilestone?'18':'20'}px;flex-shrink:0;line-height:1">${isMilestone?(p.mIcon||'🏅'):(p.avatar||'🌱')}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:4px">
          <span style="font-weight:600;font-size:12px;color:var(--text1)">${p.name||'Restorer'}</span>
          <span style="font-family:Cinzel,serif;font-size:9px;color:var(--accent)">${LEVELS[Math.min(p.ci||0,10)].ci}</span>
          <span style="font-size:9px;color:var(--text5);margin-left:auto">${ago}</span>
        </div>
        ${p.title?`<div style="font-size:13px;font-weight:700;color:var(--text1);margin-bottom:4px;line-height:1.4">${htmlEsc(p.title)}</div>`:''}
        ${isMilestone
          ?`<div style="font-size:12px;color:var(--text2)"><span style="color:var(--accent);font-weight:600">${htmlEsc(p.mTitle||p.text)}</span> unlocked 🎉</div>`
          :`<div style="font-size:12px;color:var(--text2);line-height:1.6">${htmlEsc(p.text||'')}</div>`}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:6px;padding-top:8px;border-top:1px solid var(--stat-border);flex-wrap:wrap">
      ${reactions.map(({r,emoji,field})=>{
        const count=p[field]||0;
        const myPick=isJoined?reacted[p.id]:null;
        const myR=myPick===r;
        const dimmed=isJoined&&!!myPick&&!myR;
        return`<button onclick="${isJoined?`commReact('${p.id}','${r}')`:`showToast('Join the community to react')`}"
          style="background:${myR?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${myR?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:4px 10px;font-size:12px;cursor:pointer;color:${myR?'var(--accent)':isJoined?'var(--text4)':'var(--text5)'};display:inline-flex;align-items:center;gap:3px;font-family:DM Sans,sans-serif;opacity:${!isJoined?'.55':dimmed?'.4':'1'};transition:opacity .15s">
          ${emoji}<span style="font-size:11px;font-weight:${myR?700:400}">${count||''}</span>
        </button>`;
      }).join('')}
      <button onclick="toggleReplies('${p.id}')"
        style="background:${isOpen?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isOpen?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:4px 10px;font-size:11px;cursor:pointer;color:${isOpen?'var(--accent)':'var(--text4)'};display:inline-flex;align-items:center;gap:4px;font-family:DM Sans,sans-serif">
        💬 <span>${replyCount>0?replyCount:''} ${isOpen?'Hide':'Reply'}</span>
      </button>
      ${isMe
        ?`<button onclick="confirmDialog('Delete post?','This will remove your post and all its replies.','Delete',()=>deleteCommPost('${p.id}'))" style="margin-left:auto;background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:DM Sans,sans-serif">✕</button>`
        :`<button onclick="reportPost('${p.id}')" style="margin-left:auto;background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:DM Sans,sans-serif" title="Report this post">${IC.flag(12)} Report</button>`
      }
    </div>
    ${replySection}
  </div>`;
}

function attachCommunityEvents(){
  document.getElementById('comm-join-btn')?.addEventListener('click',()=>{
    localStorage.setItem('rst-comm-pending','1');
    signInWithGoogle();
  });
  document.getElementById('comm-post-btn')?.addEventListener('click',()=>{
    if(!fbIsGoogle){showToast('Sign in with Google to post');return;}
    showPostSheet();
  });
}

function showPostSheet(){
  const ex=document.getElementById('post-ov');if(ex)ex.remove();
  if(!fbIsGoogle){showToast('Sign in with Google to post');return;}
  const el=document.createElement('div');el.className='overlay';el.id='post-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:12px">New Post</div>
    <input id="post-title" class="gold-inp" placeholder="Topic title (optional)..." maxlength="60" style="font-size:13px;margin-bottom:8px">
    <textarea id="post-text" placeholder="Share a win, a question, an observation..." style="min-height:90px;font-size:13px;margin-bottom:4px"></textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div style="font-size:10px;color:var(--text5)">Be real — honesty is appreciated over hype.</div>
      <div id="post-char" style="font-size:10px;color:var(--text5)">0 / 200</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" onclick="document.getElementById('post-ov').remove()" style="flex:0 0 76px">Cancel</button>
      <button class="btn-gold" id="post-submit" style="flex:1">Post</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  const ta=document.getElementById('post-text');
  ta.addEventListener('input',()=>{
    const n=ta.value.length;
    const cc=document.getElementById('post-char');
    if(cc){cc.textContent=`${n} / 200`;cc.style.color=n>180?'#c0392b':'var(--text5)';}
  });
  document.getElementById('post-submit').onclick=()=>{
    const text=ta.value.trim();if(!text)return;
    const title=document.getElementById('post-title').value.trim();
    commPost(text,title);el.remove();
  };
  ta.focus();
}

function showUserProfile(uid){
  const u=commState.users.find(x=>x.uid===uid);
  if(!u)return;
  const isMe=u.uid===fbUID;
  const ex=document.getElementById('user-profile-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='user-profile-ov';

  // Format joined date
  const joinedStr=u.joinedAt?.toDate?
    u.joinedAt.toDate().toLocaleDateString('en',{month:'long',year:'numeric'}):null;

  // Top methods pills
  const methods=u.topMethods||[];
  const methodsHtml=methods.length?`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Preferred Methods</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${methods.map((m,i)=>`<span style="background:${i===0?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${i===0?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:4px 11px;font-size:11px;color:${i===0?'var(--accent)':'var(--text3)'}">${m}</span>`).join('')}
      </div>
    </div>`:'';

  // Milestone badges — from achievements synced on community_users doc
  const userAchs=u.achievements||[];
  const achBadges=userAchs.length?`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Milestones Unlocked</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${ACHS.filter(a=>userAchs.includes(a.id)).map(a=>`
          <span title="${a.title}" style="background:var(--acc6);border:1px solid var(--acc18);border-radius:20px;padding:4px 10px;font-size:11px;color:var(--accent);display:inline-flex;align-items:center;gap:4px">
            ${a.icon} ${a.title}
          </span>`).join('')}
      </div>
    </div>`:'';

  const statsHtml=u.shareStats!==false&&(u.sessions||u.totalHours)?`
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px">
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${LEVELS[Math.min(u.ci||0,10)].ci}</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">CI Level</div>
      </div>
      ${u.sessions!=null?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${u.sessions}</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Sessions</div>
      </div>`:''}
      ${u.totalHours!=null?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${u.totalHours}h</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Hours</div>
      </div>`:''}
      ${(u.streak||0)>0?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:#F59E0B">${u.streak}🔥</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Streak</div>
      </div>`:''}
    </div>`:'';

  el.innerHTML=`<div class="sheet" style="max-height:88vh">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:${joinedStr?'6':'14'}px">
      <div style="position:relative">
        ${avatarCircle(u.avatar||'🌱',52,'var(--acc30)','var(--acc12)')}
        ${u.active?`<div style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:var(--green);border:2px solid var(--bg-sheet)"></div>`:''}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-family:Cinzel,serif;font-size:17px;font-weight:700;color:var(--text1)">${u.name||'Restorer'}</div>
        <div style="font-size:11px;color:var(--text4);margin-top:3px">${u.active?`<span style="color:var(--green)">● Restoring now</span>`:u.lastSeen?'Recently active':''}</div>
      </div>
      ${isMe?'':
        `<button onclick="event.stopPropagation();commEncourage('${u.uid}');document.getElementById('user-profile-ov').remove();"
          style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:9px 14px;font-size:16px;cursor:pointer;flex-shrink:0">👊</button>`
      }
    </div>
    ${joinedStr?`<div style="font-size:10px;color:var(--text5);margin-bottom:12px">Member since ${joinedStr}</div>`:''}
    ${u.bio?`<div style="font-size:12px;color:var(--text2);line-height:1.7;background:var(--bg-stat);border-radius:10px;padding:10px 12px;margin-bottom:12px;font-style:italic">"${htmlEsc(u.bio)}"</div>`:''}
    ${statsHtml}
    ${methodsHtml}
    ${achBadges}
    <button class="btn-ghost" onclick="document.getElementById('user-profile-ov').remove()" style="width:100%">Close</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

function showCommSettings(){
  const ex=document.getElementById('comm-settings-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='comm-settings-ov';
  const visible=char.communityVisible!==false;
  const shareStats=char.communityShareStats!==false;
  el.innerHTML=`<div class="sheet" style="max-height:88vh;padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent);margin-bottom:16px">Community Settings</div>

    <div style="margin-bottom:14px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Avatar</div>
      <div style="display:flex;align-items:center;gap:10px">
        ${avatarCircle(char.communityAvatar||'🌱',44,'var(--acc30)','var(--acc12)')}
        <button onclick="showAvatarPicker()" class="btn-outline" style="flex:1;padding:9px">Change Avatar</button>
      </div>
    </div>

    <div style="margin-bottom:14px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Community Name</div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px 12px;font-size:13px;color:var(--text2)">${htmlEsc(char.communityDisplayName||char.name)}</div>
      <div style="font-size:9px;color:var(--text5);margin-top:5px">Your community name matches your profile name. To change it, rename your profile first.</div>
    </div>

    <div style="margin-bottom:14px">
      <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Bio <span style="color:var(--text6);font-weight:400;letter-spacing:0;text-transform:none">— shown on your profile</span></div>
      <textarea id="comm-bio-edit" placeholder="A little about your restoration journey, your methods, your goals..." style="min-height:70px;font-size:12px;margin-bottom:4px">${char.communityBio||''}</textarea>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:9px;color:var(--text5)">Max 200 characters</div>
        <button class="btn-outline" id="comm-bio-save" style="padding:5px 12px;font-size:11px">Save Bio</button>
      </div>
    </div>

    <div style="margin-bottom:6px;font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px">Privacy</div>
    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px 12px;background:var(--bg-stat);border-radius:10px;margin-bottom:7px">
      <input type="checkbox" id="comm-vis-toggle" ${visible?'checked':''} style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer;flex-shrink:0">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text2)">Show me as active</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">Appear in the Active Now list during sessions</div>
      </div>
    </label>
    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px 12px;background:var(--bg-stat);border-radius:10px;margin-bottom:7px">
      <input type="checkbox" id="comm-stats-toggle" ${shareStats?'checked':''} style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer;flex-shrink:0">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text2)">Share stats on profile</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">Show sessions, hours, and streak when others view your profile</div>
      </div>
    </label>
    <button class="btn-ghost" id="comm-settings-done" style="width:100%;margin-bottom:8px">Done</button>
    <button onclick="confirmDialog('Leave Community?','Your presence will be removed from the active list. Your posts expire naturally after 14 days. You can rejoin anytime.','Leave',leaveComm)"
      style="width:100%;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:11px;font-size:13px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">
      Leave Community
    </button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  document.getElementById('comm-settings-done').onclick=()=>el.remove();
  document.getElementById('comm-bio-save').onclick=()=>{
    const b=(document.getElementById('comm-bio-edit')?.value||'').slice(0,200).trim();
    char.communityBio=b;saveChar();syncPresence();
    showToast('Bio saved');
  };
  document.getElementById('comm-vis-toggle').onchange=e=>{
    char.communityVisible=e.target.checked;saveChar();syncPresence();
  };
  document.getElementById('comm-stats-toggle').onchange=e=>{
    char.communityShareStats=e.target.checked;saveChar();syncPresence();
  };
}

function showAvatarPicker(){
  const ex=document.getElementById('avatar-pick-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='avatar-pick-ov';
  const current=char.communityAvatar||'🌱';
  const grid=COMM_AVATARS.map(a=>`
    <button onclick="selectAvatar('${a}')" style="width:48px;height:48px;border-radius:10px;background:${a===current?'var(--acc12)':'var(--bg-stat)'};border:2px solid ${a===current?'var(--accent)':'var(--stat-border)'};cursor:pointer;font-size:24px;display:flex;align-items:center;justify-content:center;line-height:1;transition:all .15s">${a}</button>`).join('');
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      ${avatarCircle(current,44,'var(--acc30)','var(--acc12)')}
      <div>
        <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent)">Choose Avatar</div>
        <div style="font-size:10px;color:var(--text5);margin-top:3px">Visible to the community</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;max-height:52vh;overflow-y:auto;padding:2px">${grid}</div>
    <button class="btn-ghost" onclick="document.getElementById('avatar-pick-ov').remove()" style="width:100%;margin-top:14px">Done</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}
function selectAvatar(emoji){
  char.communityAvatar=emoji;saveChar();syncPresence();
  // Refresh picker highlight
  document.querySelectorAll('#avatar-pick-ov button').forEach(b=>{
    const isSel=b.textContent===emoji;
    b.style.background=isSel?'var(--acc12)':'var(--bg-stat)';
    b.style.borderColor=isSel?'var(--accent)':'var(--stat-border)';
  });
  // Update the avatar preview in settings sheet if open
  const preview=document.querySelector('#comm-settings-ov [data-avatar-preview]');
  if(preview)preview.textContent=emoji;
  refreshCommUI();
}

// ── COACH SHEET ────────────────────────────────────────────────────────────────
let coachHistory=[]; // session conversation history

const COACH_SUGGESTIONS=[
  {label:'How am I doing?',      q:'How am I doing with my progress?'},
  {label:'How does it work?',    q:'How does foreskin restoration actually work scientifically?'},
  {label:'Should I rest today?', q:'Should I take a rest day?'},
  {label:'I\'m on a plateau',    q:'I feel like I\'m on a plateau and not making progress'},
  {label:'Best method for me?',  q:'What method should I be using at my stage?'},
  {label:'How long will it take?',q:'How long will restoration take for me?'},
  {label:'About retaining',      q:'Tell me about retaining and dekeratinisation'},
  {label:'About taping',         q:'Tell me about taping methods'},
];

function showCoachSheet(){
  const ex=document.getElementById('coach-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='coach-ov';

  const historyHtml=coachHistory.map(h=>`
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:flex-end;margin-bottom:6px">
        <div style="background:var(--acc12);border:1px solid var(--acc30);border-radius:14px 14px 4px 14px;padding:8px 12px;font-size:12px;color:var(--accent);max-width:80%;line-height:1.5">${htmlEsc(h.q)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="font-size:18px;flex-shrink:0">🧠</div>
        <div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:4px 14px 14px 14px;padding:10px 12px;font-size:12px;color:var(--text2);line-height:1.7;white-space:pre-line;flex:1">${htmlEsc(h.a)}</div>
      </div>
    </div>`).join('');

  const suggestionsHtml=COACH_SUGGESTIONS.map(s=>
    `<button onclick="coachAsk('${s.q.replace(/'/g,"\\'")}')"
      style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:6px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all .15s"
      onmouseover="this.style.borderColor='var(--acc30)';this.style.color='var(--accent)'"
      onmouseout="this.style.borderColor='var(--stat-border)';this.style.color='var(--text3)'"
    >${s.label}</button>`
  ).join('');

  el.innerHTML=`<div class="sheet" style="max-height:90vh;display:flex;flex-direction:column;padding-bottom:0">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-shrink:0">
      <div style="font-size:24px">🧠</div>
      <div style="flex:1">
        <div style="font-family:Cinzel,serif;font-size:14px;color:var(--accent)">Coach</div>
        <div style="font-size:10px;color:var(--text5)">Ask me anything about your restoration</div>
      </div>
      <button onclick="document.getElementById('coach-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 14px;font-size:12px;color:var(--text3);cursor:pointer;font-family:'DM Sans',sans-serif;flex-shrink:0">✕ Close</button>
    </div>

    <div id="coach-chat" style="flex:1;overflow-y:auto;min-height:80px;margin-bottom:12px">
      ${coachHistory.length?historyHtml:`<div style="text-align:center;padding:20px 0;color:var(--text5);font-size:12px;line-height:1.8">
        <div style="font-size:28px;margin-bottom:8px">💬</div>
        Ask me anything — or tap a suggestion below.
      </div>`}
    </div>

    <div style="flex-shrink:0">
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">${suggestionsHtml}</div>
      <div style="display:flex;gap:7px;padding-bottom:20px">
        <input id="coach-inp" placeholder="Type your question..." maxlength="200"
          style="flex:1;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:22px;padding:10px 16px;color:var(--text1);font-size:13px;outline:none;font-family:'DM Sans',sans-serif"
          onkeydown="if(event.key==='Enter'){event.preventDefault();coachSend();}">
        <button onclick="coachSend()"
          style="background:var(--accent);border:none;border-radius:22px;width:42px;height:42px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--bg)">
          ${IC.play(14)}
        </button>
      </div>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  // Scroll chat to bottom
  setTimeout(()=>{const c=document.getElementById('coach-chat');if(c)c.scrollTop=c.scrollHeight;},50);
  document.getElementById('coach-inp')?.focus();
}

function coachSend(){
  const inp=document.getElementById('coach-inp');
  const q=inp?.value.trim();
  if(!q)return;
  inp.value='';
  coachAsk(q);
}

function coachAsk(question){
  // Generate answer from brain
  const answer=coachBrainMatch(question);
  // Add to session history
  coachHistory.push({q:question,a:answer});
  if(coachHistory.length>10)coachHistory.shift(); // keep last 10 exchanges
  // Capture question for owner review (Firestore, minimal cost — owner reads weekly)
  captureCoachQuestion(question);
  // Reopen sheet with new history
  showCoachSheet();
}

function captureCoachQuestion(question){
  // Write to Firestore for owner review — no PII, just the question + basic context
  if(!db||!question.trim())return;
  db.collection('coach_questions').add({
    q:question.trim().slice(0,200),
    ci:char.ciLevel||0,
    sessions:char.sessions||0,
    ts:firebase.firestore.FieldValue.serverTimestamp()
  }).catch(()=>{}); // silent fail — non-critical
}

const ADMIN_UID='ucBxGcyLCTMxyYDKgqOnDmlq2j52';
let _adminTaps=0,_adminTimer=null,_adminTab='dashboard';

function adminTap(){
  _adminTaps++;
  clearTimeout(_adminTimer);
  _adminTimer=setTimeout(()=>{_adminTaps=0;},1500);
  if(_adminTaps>=5){_adminTaps=0;showAdminPanel();}
}

function showAdminPanel(){
  // If Firebase hasn't loaded yet (not in community), init it now for admin use
  if(!db){
    showToast('Connecting…');
    initFirebase();
    // Wait for auth to settle then retry
    setTimeout(()=>{
      if(!db||fbUID!==ADMIN_UID){showToast('Not authorised — sign in with your Google account first');return;}
      showAdminPanel();
    },2500);
    return;
  }
  if(fbUID!==ADMIN_UID){showToast('Not authorised');return;}
  const ex=document.getElementById('admin-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='admin-ov';
  el.innerHTML=`<div style="background:var(--bg-sheet);border:1px solid var(--card-border);border-radius:18px 18px 0 0;padding:16px 0 32px;width:100%;max-height:94vh;display:flex;flex-direction:column">
    <div style="padding:0 16px;flex-shrink:0">
      <div style="width:36px;height:4px;background:var(--stat-border);border-radius:2px;margin:0 auto 14px"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div style="font-family:Cinzel,serif;font-size:15px;color:#e74c3c;letter-spacing:1px">⚙ Admin</div>
        <button onclick="document.getElementById('admin-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:4px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif">Close</button>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:14px;background:var(--bg-stat);border-radius:10px;padding:3px;overflow-x:auto;scrollbar-width:none">
        ${[['dashboard','📊','Stats'],['reports','🚩','Reports'],['users','👥','Users'],['broadcast','📣','Broadcast'],['coach','🧠','Coach']].map(([id,icon,label])=>`
        <button id="admin-tab-${id}" onclick="adminSwitchTab('${id}')"
          style="flex:1;min-width:52px;padding:6px 4px;border:none;border-radius:7px;cursor:pointer;font-size:10px;font-weight:600;font-family:DM Sans,sans-serif;white-space:nowrap;transition:all .15s;
          background:${_adminTab===id?'var(--bg-card)':'transparent'};
          color:${_adminTab===id?'var(--accent)':'var(--text4)'}">
          ${icon} ${label}
        </button>`).join('')}
      </div>
    </div>
    <div id="admin-content" style="flex:1;overflow-y:auto;padding:0 16px"></div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  adminLoadTab();
}

function adminSwitchTab(t){
  _adminTab=t;
  ['dashboard','reports','users','broadcast','coach'].forEach(id=>{
    const btn=document.getElementById('admin-tab-'+id);
    if(!btn)return;
    btn.style.background=_adminTab===id?'var(--bg-card)':'transparent';
    btn.style.color=_adminTab===id?'var(--accent)':'var(--text4)';
  });
  adminLoadTab();
}

function adminLoadTab(){
  const content=document.getElementById('admin-content');
  if(!content)return;

  // ── DASHBOARD ──────────────────────────────────────────────────────────
  if(_adminTab==='dashboard'){
    content.innerHTML='<div style="font-size:11px;color:var(--text4);text-align:center;padding:20px">Loading stats…</div>';
    const cutoff7=firebase.firestore.Timestamp.fromDate(new Date(Date.now()-7*86400000));
    const cutoff30=firebase.firestore.Timestamp.fromDate(new Date(Date.now()-30*86400000));
    Promise.all([
      db.collection('community_users').get(),
      db.collection('community_users').where('lastSeen','>',cutoff7).get(),
      db.collection('community_users').where('lastSeen','>',cutoff30).get(),
      db.collection('community_users').where('active','==',true).get(),
      db.collection('posts').where('ts','>',cutoff7).get(),
      db.collection('reports').where('resolved','==',false).get(),
    ]).then(([all,w7,w30,liveSnap,posts7,openReports])=>{
      if(!document.getElementById('admin-content'))return;
      const totalMembers=all.size;
      const active7=w7.size;
      const active30=w30.size;
      const liveNow=liveSnap.size;
      const posts7Count=posts7.size;
      const openReportsCount=openReports.size;
      // avg CI across all users
      let ciSum=0,ciCount=0;
      all.docs.forEach(d=>{const ci=d.data().ci;if(ci!=null){ciSum+=ci;ciCount++;}});
      const avgCI=ciCount?Math.round((ciSum/ciCount)*10)/10:0;
      // retention: users who joined >7 days ago and were seen in last 7 days
      let retained=0,oldEnough=0;
      const now=Date.now();
      all.docs.forEach(d=>{
        const dd=d.data();
        const joined=dd.joinedAt?.toMillis?dd.joinedAt.toMillis():0;
        const seen=dd.lastSeen?.toMillis?dd.lastSeen.toMillis():0;
        if(now-joined>7*86400000){oldEnough++;if(now-seen<7*86400000)retained++;}
      });
      const retentionPct=oldEnough?Math.round(retained/oldEnough*100):null;

      const statBox=(value,label,sub='',color='var(--text1)')=>`
        <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px 10px;text-align:center">
          <div style="font-size:22px;font-weight:800;color:${color};line-height:1">${value}</div>
          <div style="font-size:9px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px;margin-top:4px">${label}</div>
          ${sub?`<div style="font-size:9px;color:var(--text5);margin-top:2px">${sub}</div>`:''}
        </div>`;

      content.innerHTML=`
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4);margin-bottom:10px">Overview</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px">
          ${statBox(totalMembers,'Total Members')}
          ${statBox(active7,'Active 7d',`${active30} in 30d`,'var(--accent)')}
          ${statBox(liveNow,'Live Now','restoring','var(--green)')}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px">
          ${statBox('CI-'+avgCI,'Avg CI Level','community avg')}
          ${statBox(posts7Count,'Posts 7d')}
          ${statBox(openReportsCount,'Open Reports','',openReportsCount>0?'#e74c3c':'var(--text1)')}
        </div>
        ${retentionPct!==null?`
        <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <div style="font-size:11px;font-weight:600;color:var(--text2)">7-Day Retention</div>
            <div style="font-family:Cinzel,serif;font-size:16px;font-weight:700;color:${retentionPct>=50?'var(--green)':retentionPct>=25?'var(--accent)':'#e74c3c'}">${retentionPct}%</div>
          </div>
          <div style="height:6px;background:var(--bg-card);border-radius:3px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:${retentionPct>=50?'var(--green)':retentionPct>=25?'var(--accent)':'#e74c3c'};width:${retentionPct}%;transition:width .6s"></div>
          </div>
          <div style="font-size:9px;color:var(--text5);margin-top:5px">${retained} of ${oldEnough} members seen in last 7 days</div>
        </div>`:''}
        <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px;margin-bottom:14px">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text4);margin-bottom:10px">CI Distribution</div>
          ${(()=>{
            const dist=Array(11).fill(0);
            all.docs.forEach(d=>{const ci=Math.min(d.data().ci||0,10);dist[ci]++;});
            const max=Math.max(...dist,1);
            return dist.map((n,i)=>`
              <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
                <div style="font-family:Cinzel,serif;font-size:9px;color:var(--accent);width:28px;flex-shrink:0">CI-${i}</div>
                <div style="flex:1;height:8px;background:var(--bg-card);border-radius:4px;overflow:hidden">
                  <div style="height:100%;border-radius:4px;background:var(--acc45);width:${Math.round(n/max*100)}%;transition:width .6s"></div>
                </div>
                <div style="font-size:9px;color:var(--text4);width:20px;text-align:right">${n}</div>
              </div>`).join('');
          })()}
        </div>`;
    }).catch(()=>{
      if(document.getElementById('admin-content'))
        document.getElementById('admin-content').innerHTML='<div style="font-size:11px;color:var(--text4)">Could not load stats — check Firestore rules.</div>';
    });

  // ── REPORTS ────────────────────────────────────────────────────────────
  } else if(_adminTab==='reports'){
    content.innerHTML='<div style="font-size:11px;color:var(--text4)">Loading reports…</div>';
    db.collection('reports').where('resolved','==',false).limit(20).get().then(snap=>{
      if(!document.getElementById('admin-content'))return;
      if(snap.empty){content.innerHTML='<div style="font-size:11px;color:var(--green);text-align:center;padding:20px">✓ No open reports — community is clean.</div>';return;}
      const sorted=snap.docs.sort((a,b)=>(b.data().ts?.toMillis?.()??0)-(a.data().ts?.toMillis?.()??0));
      const fetches=sorted.map(d=>{
        const r=d.data();
        return db.collection('posts').doc(r.postId).get()
          .then(p=>({report:d,post:p.exists?p.data():null})).catch(()=>({report:d,post:null}));
      });
      Promise.all(fetches).then(results=>{
        if(!document.getElementById('admin-content'))return;
        content.innerHTML=`<div style="font-size:10px;color:var(--text4);margin-bottom:10px;text-transform:uppercase;letter-spacing:.8px">Open Reports (${snap.size})</div>`+
          results.map(({report:d,post})=>{
            const r=d.data();
            const ts=r.ts?.toDate?r.ts.toDate().toLocaleDateString():'?';
            const preview=post
              ?`<div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:7px;padding:8px;margin:6px 0;font-size:11px;color:var(--text2);line-height:1.5">
                  ${post.title?`<div style="font-weight:700;margin-bottom:3px">${htmlEsc(post.title)}</div>`:''}
                  <div>${htmlEsc(post.text||'')}</div>
                  <div style="font-size:9px;color:var(--text5);margin-top:4px">by ${htmlEsc(post.name||'?')} · UID: ${post.uid||'?'}</div>
                </div>`
              :'<div style="font-size:10px;color:var(--text5);margin:4px 0">Post already deleted</div>';
            return`<div style="background:var(--bg-stat);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:12px;margin-bottom:8px">
              <div style="font-size:10px;color:var(--text4);margin-bottom:4px">Reported ${ts} · by <code style="font-size:9px">${r.reportedBy?.slice(0,12)}…</code></div>
              ${preview}
              <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
                ${post?`
                <button onclick="adminDeletePost('${r.postId}','${d.id}')" style="background:rgba(200,50,50,.08);border:1px solid rgba(200,50,50,.25);border-radius:6px;padding:6px 12px;font-size:11px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">🗑 Delete Post</button>
                <button onclick="adminBanUID('${post.uid||''}','${d.id}')" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:6px;padding:6px 12px;font-size:11px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">⛔ Ban User</button>`:''}
                <button onclick="adminResolve('${d.id}')" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:6px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:DM Sans,sans-serif">✓ Dismiss</button>
              </div>
            </div>`;
          }).join('');
      });
    }).catch(e=>{if(content)content.innerHTML=`<div style="font-size:11px;color:var(--text4)">Could not load reports.<br><span style="font-size:10px;color:var(--text5)">${e.code||e.message}</span></div>`;});

  // ── USERS ──────────────────────────────────────────────────────────────
  } else if(_adminTab==='users'){
    content.innerHTML=`
      <div style="font-size:10px;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Search Members</div>
      <input id="admin-search-inp" class="gold-inp" placeholder="Search by name…" style="margin-bottom:10px;font-size:12px" oninput="adminSearchUsers()">
      <div id="admin-user-results" style="font-size:11px;color:var(--text4)">Type to search…</div>`;

  // ── BROADCAST ──────────────────────────────────────────────────────────
  } else if(_adminTab==='broadcast'){
    db.collection('broadcast').doc('active').get().then(snap=>{
      if(!document.getElementById('admin-content'))return;
      const current=snap.exists?snap.data().msg:'';
      content.innerHTML=`
        <div style="font-size:10px;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:.8px">Pinned Announcement</div>
        <div style="font-size:11px;color:var(--text3);margin-bottom:12px;line-height:1.65">
          Appears at the top of the Community tab for all users. Useful for updates, welcome messages, or announcements. Leave blank to hide.
        </div>
        <textarea id="admin-broadcast-inp" placeholder="Write your announcement here… (leave blank to clear)"
          style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--text1);font-size:12px;width:100%;outline:none;resize:vertical;min-height:90px;font-family:DM Sans,sans-serif;margin-bottom:10px">${htmlEsc(current)}</textarea>
        <div style="display:flex;gap:8px">
          <button onclick="adminClearBroadcast()" style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:8px;padding:10px 16px;font-size:12px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">Clear</button>
          <button onclick="adminSaveBroadcast()" style="flex:1;background:linear-gradient(135deg,var(--acc18),var(--accent));border:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;color:var(--bg);cursor:pointer;font-family:DM Sans,sans-serif">📣 Publish</button>
        </div>
        ${current?`<div style="margin-top:12px;background:var(--acc6);border:1px solid var(--acc18);border-radius:8px;padding:10px 12px">
          <div style="font-size:9px;color:var(--accent);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px">Currently Live</div>
          <div style="font-size:11px;color:var(--text2)">${htmlEsc(current)}</div>
        </div>`:'<div style="margin-top:10px;font-size:10px;color:var(--text5)">No announcement currently set.</div>'}`;
    }).catch(()=>{if(content)content.innerHTML='<div style="font-size:11px;color:var(--text4)">Could not load broadcast data.</div>';});

  // ── COACH ──────────────────────────────────────────────────────────────
  } else if(_adminTab==='coach'){
    content.innerHTML='<div style="font-size:11px;color:var(--text4)">Loading coach questions…</div>';
    db.collection('coach_questions').orderBy('ts','desc').limit(100).get().then(snap=>{
      if(!document.getElementById('admin-content'))return;
      if(snap.empty){content.innerHTML='<div style="font-size:11px;color:var(--green);text-align:center;padding:20px">✓ No questions yet.</div>';return;}
      const qMap={};
      snap.docs.forEach(d=>{
        const q=d.data().q||'';
        if(!qMap[q])qMap[q]={count:0,ci:[],ts:d.data().ts};
        qMap[q].count++;
        qMap[q].ci.push(d.data().ci||0);
      });
      const sorted=Object.entries(qMap).sort((a,b)=>b[1].count-a[1].count);
      // Group: unanswered (count>1) vs single
      const trending=sorted.filter(([,v])=>v.count>1);
      const single=sorted.filter(([,v])=>v.count===1);
      const renderQ=([q,v])=>`
        <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px 12px;margin-bottom:6px;display:flex;align-items:flex-start;gap:8px">
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;color:var(--text2);line-height:1.5">${htmlEsc(q)}</div>
            <div style="font-size:9px;color:var(--text5);margin-top:3px">avg CI: ${Math.round(v.ci.reduce((a,b)=>a+b,0)/v.ci.length*10)/10}</div>
          </div>
          ${v.count>1?`<span style="background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:2px 8px;font-size:10px;font-weight:700;color:var(--accent);flex-shrink:0">×${v.count}</span>`:''}
        </div>`;
      window._coachSorted=sorted;
      content.innerHTML=`
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px">${snap.size} questions · ${sorted.length} unique</div>
          <div style="display:flex;gap:6px">
            <button onclick="adminEmailCoachQuestions(${JSON.stringify(sorted).replace(/"/g,'&quot;')})" style="background:var(--acc6);border:1px solid var(--acc30);border-radius:6px;padding:4px 10px;font-size:10px;color:var(--accent);cursor:pointer;font-family:DM Sans,sans-serif">📧 Email all</button>
            <button onclick="adminClearCoachQuestions()" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:6px;padding:4px 10px;font-size:10px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">Clear all</button>
          </div>
        </div>
        <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.5;background:var(--acc6);border:1px solid var(--acc18);border-radius:8px;padding:8px 10px">
          💡 Tap <strong style="color:var(--accent)">Email all</strong> to send questions to yourself, then bring them to Claude to expand the Coach brain.
        </div>
        ${trending.length?`<div style="font-size:10px;font-weight:700;color:var(--accent);margin-bottom:7px;text-transform:uppercase;letter-spacing:.8px">🔥 Trending (asked multiple times)</div>${trending.map(renderQ).join('')}`:''}
        ${single.length?`<div style="font-size:10px;font-weight:700;color:var(--text4);margin:10px 0 7px;text-transform:uppercase;letter-spacing:.8px">Single asks</div>${single.map(renderQ).join('')}`:''}`;
    }).catch(e=>{if(content)content.innerHTML=`<div style="font-size:11px;color:var(--text4)">Could not load — check Firestore rules.<br><span style="font-size:10px;color:var(--text5)">${e.code||e.message}</span></div>`;});
  }
}

function adminSearchUsers(){
  const q=(document.getElementById('admin-search-inp')?.value||'').toLowerCase().trim();
  const results=document.getElementById('admin-user-results');
  if(!results)return;
  if(!q){results.innerHTML='<div style="font-size:11px;color:var(--text4)">Type to search…</div>';return;}
  const matches=commState.users.filter(u=>(u.name||'').toLowerCase().includes(q)||(u.nameLower||'').includes(q));
  if(matches.length){results.innerHTML=matches.map(u=>adminUserCard(u.uid,u)).join('');return;}
  results.innerHTML='<div style="font-size:11px;color:var(--text4)">Searching…</div>';
  db.collection('community_users').orderBy('nameLower').startAt(q).endAt(q+'\uf8ff').limit(10).get()
    .then(snap=>{
      if(!document.getElementById('admin-user-results'))return;
      document.getElementById('admin-user-results').innerHTML=snap.empty
        ?'<div style="font-size:11px;color:var(--text4)">No members found</div>'
        :snap.docs.map(d=>adminUserCard(d.id,d.data())).join('');
    }).catch(()=>{if(document.getElementById('admin-user-results'))document.getElementById('admin-user-results').innerHTML='<div style="font-size:11px;color:var(--text4)">Search failed</div>';});
}

function adminUserCard(uid,u){
  const banned=u.banned===true;
  return`<div style="background:var(--bg-stat);border:1px solid ${banned?'rgba(200,50,50,.3)':'var(--stat-border)'};border-radius:10px;padding:12px;margin-bottom:7px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
      <div style="font-size:26px;flex-shrink:0">${u.avatar||'🌱'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">${htmlEsc(u.name||'?')}${banned?' <span style="font-size:9px;color:#e74c3c;background:rgba(200,50,50,.1);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:1px 6px">BANNED</span>':''}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:2px">${LEVELS[Math.min(u.ci||0,10)].ci} · ${u.sessions||0} sessions · ${u.streak||0}🔥</div>
        <div style="font-size:9px;color:var(--text5);margin-top:1px;word-break:break-all">${uid}</div>
      </div>
    </div>
    <div style="display:flex;gap:6px">
      ${!banned
        ?`<button onclick="adminBanUID('${uid}',null)" style="flex:1;background:rgba(200,50,50,.08);border:1px solid rgba(200,50,50,.25);border-radius:6px;padding:7px;font-size:11px;color:#a03232;cursor:pointer;font-family:DM Sans,sans-serif">⛔ Ban</button>`
        :`<button onclick="adminUnbanUID('${uid}')" style="flex:1;background:rgba(34,168,90,.06);border:1px solid rgba(34,168,90,.25);border-radius:6px;padding:7px;font-size:11px;color:var(--green);cursor:pointer;font-family:DM Sans,sans-serif">✓ Unban</button>`
      }
    </div>
  </div>`;
}

function adminSaveBroadcast(){
  const msg=(document.getElementById('admin-broadcast-inp')?.value||'').trim();
  if(!db)return;
  const ref=db.collection('broadcast').doc('active');
  (msg?ref.set({msg,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}):ref.delete())
    .then(()=>{showToast(msg?'📣 Announcement published!':'✓ Announcement cleared');adminLoadTab();})
    .catch(()=>showToast('⚠ Could not save — check Firestore rules'));
}

function adminClearBroadcast(){
  if(!db)return;
  db.collection('broadcast').doc('active').delete()
    .then(()=>{showToast('✓ Announcement cleared');adminLoadTab();})
    .catch(()=>showToast('⚠ Could not clear'));
}

function adminDeletePost(postId,reportId){
  if(!db)return;
  db.collection('posts').doc(postId).delete()
    .then(()=>{if(reportId)adminResolve(reportId);else{showToast('✓ Post deleted');adminLoadTab();}})
    .catch(()=>showToast('⚠ Could not delete post'));
}

function adminResolve(reportId){
  if(!db)return;
  db.collection('reports').doc(reportId).update({resolved:true}).catch(()=>{});
  showToast('✓ Report resolved');adminLoadTab();
}

function adminBanUID(uid,reportId){
  if(!uid||!db){showToast('No UID');return;}
  confirmDialog('Ban this user?','They will be permanently removed from the community.','Ban User',()=>{
    const batch=db.batch();
    batch.set(db.collection('bans').doc(uid),{banned:true,bannedAt:firebase.firestore.FieldValue.serverTimestamp(),bannedBy:fbUID});
    batch.set(db.collection('community_users').doc(uid),{banned:true},{merge:true});
    batch.commit()
      .then(()=>{showToast('✓ User banned');if(reportId)db.collection('reports').doc(reportId).update({resolved:true}).catch(()=>{});adminLoadTab();})
      .catch(()=>showToast('⚠ Could not ban — check Firestore rules'));
  });
}

function adminUnbanUID(uid){
  if(!uid||!db)return;
  confirmDialog('Unban this user?','They will be able to participate again.','Unban',()=>{
    const batch=db.batch();
    batch.delete(db.collection('bans').doc(uid));
    batch.update(db.collection('community_users').doc(uid),{banned:false});
    batch.commit()
      .then(()=>{showToast('✓ User unbanned');adminLoadTab();})
      .catch(()=>showToast('⚠ Could not unban'));
  });
}


function adminEmailCoachQuestions(){
  const sorted=window._coachSorted||[];
  if(!sorted.length){showToast('No questions to email');return;}
  const lines=sorted.map(([q,v])=>{
    const avgCi=Math.round(v.ci.reduce((a,b)=>a+b,0)/v.ci.length*10)/10;
    return '• '+q+(v.count>1?' (x'+v.count+', avg CI-'+avgCi+')':' (avg CI-'+avgCi+')');
  }).join('\n');
  const total=sorted.reduce((a,[,v])=>a+v.count,0);
  const subject=encodeURIComponent("User's Questions");
  const body=encodeURIComponent(
    'Coach Questions from RestoreTrack Users\n'+
    'Exported: '+new Date().toLocaleDateString()+'\n'+
    'Total: '+total+' questions ('+sorted.length+' unique)\n\n'+
    lines+'\n\n---\n'+
    'Bring these to Claude with your coach_data.json to expand the Coach brain.'
  );
  window.location.href='mailto:restoretrack@gmail.com?subject='+subject+'&body='+body;
}

function adminClearCoachQuestions(){
  if(!db)return;
  confirmDialog('Clear all coach questions?','This will delete the captured question log.','Clear All',()=>{
    db.collection('coach_questions').get().then(snap=>{
      const batch=db.batch();snap.docs.forEach(d=>batch.delete(d.ref));return batch.commit();
    }).then(()=>{showToast('✓ Cleared');adminLoadTab();}).catch(()=>showToast('⚠ Could not clear'));
  });
}

// ── INIT ───────────────────────────────────────────────────────────────────────
(async ()=>{
  await loadAll();
  render();
  // Init Firebase if already a community member, or if returning from Google redirect
  if(char.communityEnabled||localStorage.getItem('rst-comm-pending')){
    initFirebase();
    // If a session is already running, sync presence once Firebase auth settles
    if(activeTimer&&activeTimer.startedAt){setTimeout(syncPresence,2500);}
  }
})();