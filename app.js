/// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const LEVELS=[
  {ci:'CI-0',desc:'Starting point of restoration. No loose skin present.',soft:'',hard:''},
  {ci:'CI-1',desc:'',soft:'There is no loose skin on the shaft of the penis.',hard:'The shaft skin is very tight and on some men draws the scrotum up.'},
  {ci:'CI-2',desc:'',soft:'There is some loose skin which wrinkles over the sulcus.',hard:'The shaft skin is tight.'},
  {ci:'CI-3',desc:'',soft:'Foreskin covers the sulcus and just touches the corona.',hard:'There may be very slight wrinkling of the shaft skin.'},
  {ci:'CI-4',desc:'',soft:'Foreskin covers the corona, leaving most of the glans exposed.',hard:'There is some wrinkling of the shaft skin behind the sulcus.'},
  {ci:'CI-5',desc:'',soft:'A half to two-thirds of the glans is exposed.',hard:'Foreskin wrinkles over the sulcus.'},
  {ci:'CI-6',desc:'',soft:'The foreskin covers most of the glans.',hard:'The foreskin retracts behind the corona.'},
  {ci:'CI-7',desc:'',soft:'The glans is completely covered with the glans visible through the opening.',hard:'Foreskin covers the corona and some of the glans.'},
  {ci:'CI-8',desc:'',soft:'There is a small amount of overhanging foreskin.',hard:'The foreskin covers over half of the glans.'},
  {ci:'CI-9',desc:'',soft:'Foreskin overhangs the end of the glans.',hard:'The foreskin completely covers the glans but there is no overhang.'},
  {ci:'CI-10',desc:'',soft:'There is a considerable amount of overhanging foreskin.',hard:'The foreskin still overhangs the end of the glans.'}
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
  {id:'first',   icon:'🌱',title:'First Session',      desc:'Log your very first session',                    check:c=>c.sessions>=1,g:'first'},
  {id:'rest1',   icon:'🛌',title:'First Rest Day',     desc:'Mark your first intentional rest day',           check:c=>(c.restDays||[]).length>=1,g:'first'},
  {id:'photo1',  icon:'📸',title:'First Photo',        desc:'Add your first progress photo',                  check:(_,p)=>p&&p.length>=1,g:'first'},

  // ── Session milestones
  {id:'s10',     icon:'📝',title:'10 Sessions',        desc:'Log 10 sessions',                                check:c=>c.sessions>=10,g:'sess'},
  {id:'s25',     icon:'🔄',title:'25 Sessions',        desc:'Log 25 sessions — building the habit',           check:c=>c.sessions>=25,g:'sess'},
  {id:'s50',     icon:'💪',title:'50 Sessions',        desc:'Log 50 sessions',                                check:c=>c.sessions>=50,g:'sess'},
  {id:'s100',    icon:'🏅',title:'100 Sessions',       desc:'Log 100 sessions',                               check:c=>c.sessions>=100,g:'sess'},
  {id:'s200',    icon:'🎖️',title:'200 Sessions',       desc:'Log 200 sessions',                               check:c=>c.sessions>=200,g:'sess'},
  {id:'s365',    icon:'📅',title:'365 Sessions',       desc:'A full year of effort',                          check:c=>c.sessions>=365,g:'sess'},
  {id:'s500',    icon:'🌟',title:'500 Sessions',       desc:'500 sessions — extraordinary commitment',        check:c=>c.sessions>=500,g:'sess'},

  // ── Time milestones
  {id:'h1',      icon:'⏱',title:'1 Hour',             desc:'Accumulate your first hour of restoration time', check:c=>c.minutes>=60,g:'time'},
  {id:'h10',     icon:'⌛',title:'10 Hours',           desc:'Accumulate 10 total hours',                      check:c=>c.minutes>=600,g:'time'},
  {id:'h25',     icon:'🕐',title:'25 Hours',           desc:'25 hours — tissue is responding',                check:c=>c.minutes>=1500,g:'time'},
  {id:'h50',     icon:'💡',title:'50 Hours',           desc:'Accumulate 50 total hours',                      check:c=>c.minutes>=3000,g:'time'},
  {id:'h100',    icon:'💯',title:'100 Hours',          desc:'100 hours of dedicated restoration',             check:c=>c.minutes>=6000,g:'time'},
  {id:'h250',    icon:'🔥',title:'250 Hours',          desc:'250 hours — serious dedication',                 check:c=>c.minutes>=15000,g:'time'},
  {id:'h500',    icon:'⚡',title:'500 Hours',          desc:'500 hours logged',                               check:c=>c.minutes>=30000,g:'time'},
  {id:'h1000',   icon:'👑',title:'1,000 Hours',        desc:'1,000 hours — among the most dedicated restorers in existence', check:c=>c.minutes>=60000,g:'time'},

  // ── Streak milestones
  {id:'str3',    icon:'3️⃣',title:'3-Day Streak',      desc:'Restore 3 days in a row',                        check:c=>c.streak>=3,g:'streak'},
  {id:'str7',    icon:'7️⃣',title:'Week Streak',        desc:'Restore 7 days in a row',                        check:c=>c.streak>=7,g:'streak'},
  {id:'str14',   icon:'✌️',title:'2-Week Streak',      desc:'14 days in a row',                               check:c=>c.streak>=14,g:'streak'},
  {id:'str30',   icon:'🌙',title:'Month Streak',       desc:'30 days in a row',                               check:c=>c.streak>=30,g:'streak'},
  {id:'str60',   icon:'⭐',title:'60-Day Streak',      desc:'Two months of daily consistency',                check:c=>c.streak>=60,g:'streak'},
  {id:'str90',   icon:'🌟',title:'90-Day Streak',      desc:'90 days in a row',                               check:c=>c.streak>=90,g:'streak'},
  {id:'str180',  icon:'🏆',title:'180-Day Streak',     desc:'Half a year of daily restoration',               check:c=>c.streak>=180,g:'streak'},
  {id:'str365',  icon:'💎',title:'Year Streak',        desc:'365 consecutive days — legendary',               check:c=>c.streak>=365,g:'streak'},

  // ── Daily goal milestones
  {id:'goal5',   icon:'🎯',title:'Goal Getter',        desc:'Hit your daily goal 5 times',                    check:c=>c.goalDays>=5,g:'goal'},
  {id:'goal30',  icon:'🏹',title:'Goal Month',         desc:'Hit your daily goal 30 times',                   check:c=>c.goalDays>=30,g:'goal'},
  {id:'goal100', icon:'🥇',title:'100 Goal Days',      desc:'Hit your daily goal 100 times',                  check:c=>c.goalDays>=100,g:'goal'},
  {id:'goal365', icon:'🔮',title:'365 Goal Days',      desc:'Hit your daily goal 365 times',                  check:c=>c.goalDays>=365,g:'goal'},

  // ── Method exploration
  {id:'meth3',   icon:'🧪',title:'Method Explorer',   desc:'Try 3 different restoration methods',            check:c=>(c.methods||[]).length>=3,g:'method'},
  {id:'meth5',   icon:'🗺️',title:'Method Master',     desc:'Try 5 different restoration methods',            check:c=>(c.methods||[]).length>=5,g:'method'},

  // ── Photo milestones
  {id:'photo5',  icon:'🖼️',title:'Photo Journal',     desc:'Add 5 progress photos',                          check:(_,p)=>p&&p.length>=5,g:'photo'},
  {id:'photo10', icon:'📷',title:'Dedicated Documenter',desc:'Add 10 progress photos',                       check:(_,p)=>p&&p.length>=10,g:'photo'},

  // ── CI progress — all 11 levels
  {id:'ci1',     icon:'🌿',title:'CI-1',              desc:'First measurable skin coverage — the journey begins', check:c=>(c.ciLevel||0)>=1,g:'ci'},
  {id:'ci2',     icon:'🌱',title:'CI-2',              desc:'Dekeratinisation beginning — real progress',    check:c=>(c.ciLevel||0)>=2,g:'ci'},
  {id:'ci3',     icon:'✨',title:'CI-3',              desc:'Rollover appearing — tissue is growing',         check:c=>(c.ciLevel||0)>=3,g:'ci'},
  {id:'ci4',     icon:'🌊',title:'CI-4',              desc:'Inner foreskin restoring — significant milestone', check:c=>(c.ciLevel||0)>=4,g:'ci'},
  {id:'ci5',     icon:'⭐',title:'CI-5 — Halfway',    desc:'Halfway home. Most restoration benefits are felt here', check:c=>(c.ciLevel||0)>=5,g:'ci'},
  {id:'ci6',     icon:'💫',title:'CI-6',              desc:'Full glans coverage at rest — profound change',  check:c=>(c.ciLevel||0)>=6,g:'ci'},
  {id:'ci7',     icon:'🔮',title:'CI-7',              desc:'Rollover beyond the glans — deep restoration',   check:c=>(c.ciLevel||0)>=7,g:'ci'},
  {id:'ci8',     icon:'🌟',title:'CI-8',              desc:'Tight coverage over the glans — near complete',  check:c=>(c.ciLevel||0)>=8,g:'ci'},
  {id:'ci9',     icon:'👑',title:'CI-9',              desc:'Natural overhang at rest — final stretch',       check:c=>(c.ciLevel||0)>=9,g:'ci'},
  {id:'ci10',    icon:'🏆',title:'Fully Restored',    desc:'CI-10 — the journey is complete',                check:c=>(c.ciLevel||0)>=10,g:'ci'},
];
// Which badges get a "hero" treatment in the community activity feed.
// Second tier of each category and above — first-photo, first-rest-day, and
// ten-session badges are early nudges, not moments worth a gold card.
const HERO_BADGE_IDS=new Set([
  's50','s100','s200','s365','s500',
  'h50','h100','h250','h500','h1000',
  'str7','str14','str30','str60','str90','str180','str365',
  'goal30','goal100','goal365',
  'meth5','photo10',
  'ci1','ci2','ci3','ci4','ci5','ci6','ci7','ci8','ci9','ci10'
]);
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
let profiles=[],currentPid=null,currentTheme='shadow';
let _repYear=new Date().getFullYear(),_repMonth=new Date().getMonth();
let _repScope='week'; // 'week' | 'month' | 'all'
let _repCalExpanded=false;
let _progressTab='overview'; // 'overview' | 'activity' | 'badges'
let _photoSelectMode=false;
let _photoSelectedIds=new Set();
let _photosUnlocked=false; // in-memory session unlock — resets on refresh
let _pinBuf='';
let _photoViewMode='month'; // 'month' | 'ci'
let char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',
  dailyGoalMin:120,goalDays:0,theme:'ivory',customMethods:[],ciLevel:0,ciHistory:[],ciGoal:10,restDays:[],
  communityEnabled:false,communityDisplayName:'',communityVisible:true,communityAvatar:'🌱',
  communityBio:'',communityShareStats:true,communityMessagesEnabled:true,communityBlockedUsers:[],communityBlockedProfiles:{},
  communityEncouragementReadAt:0,preferredMethods:[]};
let logs=[],photos=[];
let tab='today';
let activeTimer=null,timerInterval=null,timerSecs=0;
let showProfileScreen=false,showSessionSheet=false,showStopSheet=false,showCISheet=false;
let logMode='timer',manualStart='',manualEnd='',manualStillActive=false;
let manualStartDate='',manualEndDate='';
let sheetCat=null,sheetMethod='',sheetNotes='';
let expandedCIRef=new Set();
let _editStartCI=0,_editCurrentCI=0,_editGoalCI=10;
let _activeMilestoneIdx=null;
let _gaugeChain=null; // cached milestone chain — lets the strip update without re-rendering the tab
let todaySessionsExpanded=false;
let todayOptionsExpanded=false;

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fmtHMS=s=>{const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return h>0?`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`};
const fmtLive=s=>{if(s<86400)return fmtHMS(s);const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60);return`${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m`;};
// Header-only time format — compressed for the tight session pill.
// Seconds only matter right after a session starts; above an hour, hours and
// minutes read cleaner than a ticking clock. Days appear when they matter.
const fmtLiveCompact=s=>{
  if(s<60)return s+'s';
  if(s<3600){const m=Math.floor(s/60),sc=s%60;return`${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`;}
  const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60);
  if(d>0)return`${d}d ${h}h ${m}m`;
  return`${h}h ${m}m`;
};
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
// Header identity mark — always-present, always-personal. Community members
// who've picked an avatar get their emoji; everyone else gets their initial.
// One code path, two inputs, never a generic person icon.
function identityAvatar(name,size=26){
  const emoji=char.communityEnabled?(char.communityAvatar||'🌱'):null;
  const inner=emoji||(name||'R').charAt(0).toUpperCase();
  const isEmoji=!!emoji;
  return`<div style="width:${size}px;height:${size}px;border-radius:50%;background:var(--acc12);border:1px solid var(--acc30);display:flex;align-items:center;justify-content:center;font-size:${isEmoji?Math.round(size*0.55):Math.round(size*0.5)}px;flex-shrink:0;line-height:1;font-weight:${isEmoji?400:700};color:var(--accent);font-family:var(--font-display)">${inner}</div>`;
}

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
  progress:(s=18)=>IC._s('<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',s,1.6),
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
// Time-of-day greeting for the community top bar. Warmth without being
// saccharine — "Still up" is for the late-night restorer opening the app
// after 11pm, which is a genuinely common moment in this community.
function timeOfDayGreeting(name){
  const h=new Date().getHours();
  if(h>=5&&h<12)return`Good morning, ${name}`;
  if(h>=12&&h<17)return`Good afternoon, ${name}`;
  if(h>=17&&h<23)return`Good evening, ${name}`;
  return`Still up, ${name}`;
}
// Always returns YYYY-MM-DD in the user's LOCAL timezone — never UTC
const localDateStr=(d)=>{const x=d||new Date();return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;};
const today=()=>localDateStr();
const todayLogs=()=>logs.filter(l=>l.date===today());

// Active seconds of a session that fall within the window [fromMs, toMs].
// Subtracts any paused time that overlaps the window. Works whether the
// session is currently running, paused, or already stopped — it reads the
// accumulated pauseIntervals array plus the open pausedAt marker if present.
function sessionActiveSecsBetween(timer, fromMs, toMs){
  if(!timer||!timer.wallStart)return 0;
  const upperBound=Math.min(toMs, Date.now());
  const windowStart=Math.max(fromMs, timer.wallStart);
  const windowEnd=upperBound;
  if(windowEnd<=windowStart)return 0;
  let totalMs=windowEnd-windowStart;
  const intervals=(timer.pauseIntervals||[]).slice();
  if(timer.pausedAt!=null){
    intervals.push({startMs:timer.pausedAt, endMs:Date.now()});
  }
  for(const p of intervals){
    const overlapStart=Math.max(windowStart, p.startMs);
    const overlapEnd=Math.min(windowEnd, p.endMs);
    if(overlapEnd>overlapStart)totalMs-=(overlapEnd-overlapStart);
  }
  return Math.max(0, Math.floor(totalMs/1000));
}

// How many active minutes of the running/paused session fall within today.
// Correctly excludes paused time, so the goal bar doesn't overcount after resume.
function liveTimerTodayMins(){
  if(!activeTimer||!activeTimer.wallStart)return 0;
  const midnight=new Date();midnight.setHours(0,0,0,0);
  return Math.floor(sessionActiveSecsBetween(activeTimer, midnight.getTime(), Date.now())/60);
}

// Active minutes of the session that fall within a specific YYYY-MM-DD date.
// Used by the calendar, method breakdown, and multi-day splitter.
function liveTimerMinsForDate(dateStr){
  if(!activeTimer||!activeTimer.wallStart)return 0;
  const p=dateStr.split('-');
  const dateStart=new Date(+p[0],+p[1]-1,+p[2],0,0,0,0).getTime();
  const dateEnd  =new Date(+p[0],+p[1]-1,+p[2],23,59,59,999).getTime();
  return Math.floor(sessionActiveSecsBetween(activeTimer, dateStart, dateEnd)/60);
}
const todayMin=()=>todayLogs().reduce((a,l)=>a+l.dur,0)+liveTimerTodayMins();
// Display-only streak — reflects gap-breakage without mutating char.streak
function displayStreak(){
  if(!char.streak||!char.lastDate)return 0;
  const diff=Math.round((new Date(today())-new Date(char.lastDate))/86400000);
  if(diff<=1)return char.streak;
  for(let i=1;i<diff;i++){
    const gd=new Date(char.lastDate+'T12:00:00');
    gd.setDate(gd.getDate()+i);
    if(!(char.restDays||[]).includes(localDateStr(gd)))return 0;
  }
  return char.streak;
}
// Goal-qualifying minutes — filters retaining if user has opted out
const todayGoalMin=()=>{
  const excl=char.countRetainingInGoal===false;
  const logMins=todayLogs().filter(l=>!excl||l.cat!=='retaining').reduce((a,l)=>a+l.dur,0);
  const liveIsRetaining=!!(activeTimer&&activeTimer.cat==='retaining');
  const liveMins=(!excl||!liveIsRetaining)?liveTimerTodayMins():0;
  return logMins+liveMins;
};
// Goal-qualifying minutes for any specific date. Includes the live timer only
// when the target date is today. Used by awardSession so logging a past session
// doesn't incorrectly compare against today's minutes.
const goalMinsForDate=(dateStr)=>{
  const excl=char.countRetainingInGoal===false;
  const logMins=logs.filter(l=>l.date===dateStr&&(!excl||l.cat!=='retaining')).reduce((a,l)=>a+l.dur,0);
  if(dateStr===today()&&activeTimer&&activeTimer.startedAt){
    const liveIsRetaining=activeTimer.cat==='retaining';
    if(excl&&liveIsRetaining)return logMins;
    return logMins+liveTimerTodayMins();
  }
  return logMins;
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
        try{showStorageWarning();}catch{}
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

// Progressive compression based on user's quality setting.
// Every tier halts as soon as the result is ≤150KB.
async function compressForPhoto(dataUrl){
  const q=char.photoQuality||'balanced';
  let tiers;
  if(q==='high')tiers=[[1200,0.80],[1000,0.70],[800,0.60],[700,0.52]];
  else if(q==='small')tiers=[[640,0.52],[500,0.44],[420,0.36],[360,0.30]];
  else tiers=[[1000,0.72],[800,0.62],[700,0.52],[600,0.44]]; // balanced (default)
  let out=dataUrl;
  for(const [dim,qual] of tiers){
    out=await compressPhoto(dataUrl,dim,qual);
    if(dataUrlSizeKB(out)<=150)break;
  }
  return out;
}

// Total size in KB of a list of photos
function photosTotalKB(arr){
  return (arr||[]).reduce((a,p)=>a+dataUrlSizeKB(p.url||''),0);
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

// ── STORAGE WARNING ────────────────────────────────────────────────────────────
let _storageWarnShown=false;
function showStorageWarning(){
  if(_storageWarnShown)return;_storageWarnShown=true;
  const usedKB=S.usage();
  const el=document.createElement('div');
  el.id='storage-warn-banner';
  el.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#5c0f0f;border:1px solid #c0392b;color:#fff;padding:12px 16px;border-radius:10px;font-size:13px;z-index:9999;max-width:340px;width:90%;text-align:center;line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.5)';
  el.innerHTML=`⚠️ <strong>Storage almost full</strong> (${usedKB} KB used)<br><span style="font-size:11px;opacity:.85">New data may not be saved. Back up your data now.</span><br><div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button onclick="document.getElementById('storage-warn-banner')?.remove();showProfileScreen=true;render();" style="background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:var(--font-body);font-size:12px;font-weight:600">Backup Now →</button><button onclick="document.getElementById('storage-warn-banner')?.remove()" style="background:transparent;border:1px solid rgba(255,255,255,.3);color:rgba(255,255,255,.7);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);font-size:12px">Dismiss</button></div>`;
  document.body.appendChild(el);
}
async function loadAll(){
  await migrateProfileDataToIDB(); // one-time: moves char/logs/profiles/timer to IDB
  await migratePhotosToIDB();      // one-time: moves photos to IDB (existing)
  // Read from IDB first, fall back to localStorage
  profiles=(await ProfileDB.get('rst-profiles'))??S.get('rst-profiles')??[];
  currentPid=S.get('rst-active-pid'); // tiny key — localStorage is fine here
  _photosUnlocked=false;_pinBuf=''; // reset lock state on every load

  // Single profile system — take the first (and only) profile if it exists
  if(!currentPid&&profiles.length>0){currentPid=profiles[0].id;S.set('rst-active-pid',currentPid);}
  if(currentPid&&profiles.find(p=>p.id===currentPid)){
    showProfileScreen=false;
    await compressExistingPhotos(currentPid); // one-time: shrink pre-tier photos
    await loadProfile(currentPid);
  } else {
    showProfileScreen=true;
  }
}
async function loadProfile(pid){
  const defaults={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',dailyGoalMin:120,goalDays:0,theme:'shadow',customMethods:[],ciLevel:0,ciHistory:[],communityMessagesEnabled:true,communityBlockedUsers:[],communityBlockedProfiles:{},communityEncouragementReadAt:0};
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
  if(char.communityMessagesEnabled===undefined)char.communityMessagesEnabled=true;
  if(!Array.isArray(char.communityBlockedUsers))char.communityBlockedUsers=[];
  if(!char.communityBlockedProfiles||typeof char.communityBlockedProfiles!=='object')char.communityBlockedProfiles={};
  if(!char.communityEncouragementReadAt)char.communityEncouragementReadAt=0;
  if(!char.dayNotes)char.dayNotes={};
  if(!Array.isArray(char.preferredMethods))char.preferredMethods=[];
  if(!char.photoQuality)char.photoQuality='balanced';
  if(char.ghostOverlay===undefined)char.ghostOverlay=true;
  if(char.cameraGrid===undefined)char.cameraGrid=true;
  if(char.cameraTimer===undefined)char.cameraTimer=0;
  if(char.photoLockEnabled===undefined)char.photoLockEnabled=false;
  if(!char.photoLockPinHash)char.photoLockPinHash='';
  if(!char.photoLockSalt)char.photoLockSalt='';
  if(!char.photoLockCredentialId)char.photoLockCredentialId='';
  const l=(await ProfileDB.get(`rst-${pid}-logs`))??S.get(`rst-${pid}-logs`);
  if(l)logs=l;
  photos=await PhotoDB.load(pid);
  currentTheme=char.theme||'shadow';applyTheme(currentTheme);
  const t=(await ProfileDB.get(`rst-${pid}-timer`))??S.get(`rst-${pid}-timer`);
  if(t){
    // Default fields added in the pause-tracking update — keeps timers saved
    // by older versions loadable without crashing the new helpers.
    activeTimer={pauseIntervals:[],pausedAt:null,...t};
    sheetMethod=t.method||'';sheetCat=t.cat||null;sheetNotes=t.notes||'';
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
function createProfile(name,startCI=0,currentCI=null,goalCI=10,preferredMethods=[],customMethods=[],dailyGoalMin=120){
  // Only ever one profile — this is called once on first launch
  const id='p'+Date.now();
  profiles=[{id,name,createdAt:today()}];
  saveProfiles();currentPid=id;
  if(currentCI===null)currentCI=startCI;
  if(goalCI<=currentCI)goalCI=Math.min(10,currentCI+1);
  // Build history: only push entries for levels > 0
  const hist=[];
  if(currentCI>0){
    if(startCI<currentCI)hist.push({ci:startCI,date:today()});
    hist.push({ci:currentCI,date:today()});
  }
  const _dg=Math.max(5,Math.min(1440,dailyGoalMin||120));
  char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name,dailyGoalMin:_dg,goalDays:0,theme:currentTheme||'shadow',customMethods:[],ciLevel:currentCI,ciHistory:hist,startCI:startCI,ciGoal:goalCI,restDays:[],startDate:today(),ciSetupDone:true,communityMessagesEnabled:true,communityBlockedUsers:[],communityBlockedProfiles:{},communityEncouragementReadAt:0,preferredMethods:preferredMethods,countRetainingInGoal:true,photoQuality:'balanced',ghostOverlay:true,cameraGrid:true,cameraTimer:0,photoLockEnabled:false,photoLockPinHash:'',photoLockSalt:'',photoLockCredentialId:''};
  logs=[];photos=[];S.set('rst-active-pid',id);saveChar();showProfileScreen=false;tab='today';render();
}

function showRenameInline(){
  const el=document.getElementById('rename-inline');
  if(!el)return;
  el.style.display='block';
  const inp=document.getElementById('rename-val');
  if(!inp)return;
  inp.focus();inp.select();
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
        // Clear and refocus so the user can type a new name without first
        // deleting the rejected one — the input is still visible on screen.
        const inp2=document.getElementById('rename-val');
        if(inp2){inp2.value='';inp2.focus();}
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
  localStorage.removeItem('rst-coach-queue');
  localStorage.removeItem('rst-coach-feedback-queue');
  localStorage.removeItem('rst-comm-welcome-seen');
  // Reset all state
  profiles=[];currentPid=null;
  char={sessions:0,minutes:0,streak:0,lastDate:null,methods:[],achievements:[],name:'Restorer',dailyGoalMin:120,goalDays:0,theme:'ivory',customMethods:[],ciLevel:0,ciHistory:[],restDays:[],communityEnabled:false,communityDisplayName:'',communityVisible:true,communityAvatar:'🌱',communityBio:'',communityShareStats:true,communityMessagesEnabled:true,communityBlockedUsers:[],communityBlockedProfiles:{},communityEncouragementReadAt:0,dayNotes:{},preferredMethods:[]};
  logs=[];photos=[];activeTimer=null;timerSecs=0;
  _photoSelectMode=false;_photoSelectedIds=new Set();
  _photosUnlocked=false;_pinBuf='';
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
    const elHdr=document.getElementById('hdr-session-time');if(elHdr)elHdr.textContent=fmtLiveCompact(timerSecs);
    const el3=document.getElementById('mc-run-time-3');if(el3)el3.textContent=fmtLive(timerSecs);
    // Every 60 seconds — refresh live stats elements without full re-render
    liveTickCount++;
    if(liveTickCount%60===0){
      refreshLiveStats();
    }
  },1000);
}
function refreshLiveStats(){
  // Update goal bar and today stats inline if on Today tab
  const tGoalMin=todayGoalMin();   // goal-qualifying minutes — for bar & "to go"
  const goal=char.dailyGoalMin||120;
  const goalPct=Math.min(100,Math.round((tGoalMin/goal)*100));
  const isGoalMet=goalPct>=100;
  // Goal bar fill
  const fill=document.querySelector('.goal-fill');
  if(fill){
    fill.style.width=goalPct+'%';
    fill.className='goal-fill '+(isGoalMet?'goal-fill-ok':'goal-fill-warn');
    fill.style.animation=isGoalMet?'goalCelebrate 3s ease-in-out infinite':'';
  }
  // Goal text
  const goalTexts=document.querySelectorAll('[data-live="goal-text"]');
  goalTexts.forEach(el=>{
    el.textContent=isGoalMet?'🎯 Goal reached!':fmtMin(Math.max(0,goal-tGoalMin))+' to go';
    el.style.color=isGoalMet?'var(--green)':'var(--text4)';
    el.style.fontWeight=isGoalMet?'600':'400';
  });
  const goalDone=document.querySelector('[data-live="goal-done"]');
  if(goalDone)goalDone.textContent=fmtMin(tGoalMin);
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
    showSessionSheet=false;window._sheetBackdate=null;render();return;
  }
  window._sheetBackdate=null;
  activeTimer={startedAt:Date.now(),wallStart:Date.now(),method:sheetMethod,cat:sheetCat,notes:sheetNotes,elapsedOnPause:0,pauseIntervals:[],pausedAt:null};
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
  timerSecs=elapsed;
  activeTimer={...activeTimer,startedAt:null,elapsedOnPause:elapsed,pausedAt:Date.now()};
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
function pauseSession(){
  if(!activeTimer||!activeTimer.startedAt)return;
  stopInterval();
  const elapsed=Math.floor((Date.now()-activeTimer.startedAt)/1000)+(activeTimer.elapsedOnPause||0);
  timerSecs=elapsed;
  // Mark the pause start. resumeSession() closes the interval when the user
  // resumes, so paused time is subtracted from the total exactly once.
  activeTimer={...activeTimer,startedAt:null,elapsedOnPause:elapsed,pausedAt:Date.now()};
  saveTimer(activeTimer);
  // Single short pulse — deliberately different from Stop's double-pulse, so
  // the haptic alone tells you which one you hit without looking at the phone.
  if(navigator.vibrate)navigator.vibrate(30);
  showToast('⏸ Session paused');
  render();
}
function resumeSession(){
  if(!activeTimer)return;
  const now=Date.now();
  // Close the currently-open pause interval. If the pause was never marked
  // (older timer restored from storage), start the interval at "now" so the
  // array stays well-formed without inventing a fake gap.
  const pauseIntervals=(activeTimer.pauseIntervals||[]).slice();
  if(activeTimer.pausedAt!=null){
    pauseIntervals.push({startMs:activeTimer.pausedAt, endMs:now});
  }
  activeTimer={...activeTimer,startedAt:now,elapsedOnPause:timerSecs,pauseIntervals,pausedAt:null};
  saveTimer(activeTimer);startInterval();showStopSheet=false;render();
}
function commitSession(notes){
  const method=activeTimer?activeTimer.method:sheetMethod;
  const catId=activeTimer?activeTimer.cat:sheetCat;
  const n=notes||sheetNotes||'';
  // The end time defaults to "now", but stopSession() sets activeTimer.pausedAt
  // to the stop moment, and the Stop sheet's end-time picker can move it
  // earlier. Using pausedAt as the authoritative end lets a bedtime-forgot-to-
  // stop session save with the correct (shorter) duration without any special
  // casing elsewhere.
  const endMs=(activeTimer&&activeTimer.pausedAt)?activeTimer.pausedAt:Date.now();
  const completedMins=activeTimer&&activeTimer.wallStart
    ?Math.max(1,Math.round((endMs-activeTimer.wallStart)/60000))
    :Math.max(1,Math.round(timerSecs/60));
  // If we have a real start timestamp, split across days accurately
  // wallStart survives stopSession() which nulls startedAt
  if(activeTimer&&activeTimer.wallStart&&!activeTimer._forceSave){
    awardMultiDay(method,catId,activeTimer.wallStart,endMs,n,timerSecs,activeTimer);
  } else {
    const finalMins=Math.max(1,Math.round(timerSecs/60));
    awardSession(method,catId,finalMins,n);
  }
  stopInterval();activeTimer=null;timerSecs=0;sheetMethod='';sheetCat=null;sheetNotes='';
  saveTimer(null);showStopSheet=false;
  recordCommunityActivity('session_completed',{method,cat:catId,duration:completedMins});
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
        ()=>{awardSession(method,catId,totalMins,notes||'',checkDate);if(checkDate===today())recordCommunityActivity('session_completed',{method,cat:catId,duration:totalMins});showSessionSheet=false;render();}
      );
      return;
    }
  }
  if(isMultiDay){
    awardMultiDay(method,catId,startMs,endMs,notes||'');
  } else {
    awardSession(method,catId,totalMins,notes||'',checkDate);
    if(checkDate===today())recordCommunityActivity('session_completed',{method,cat:catId,duration:totalMins});
  }
  showSessionSheet=false;render();
}
function awardMultiDay(method,catId,startMs,endMs,notes,activeSecs,timer){
  // Split a long session into per-day chunks and award each day separately.
  // startMs/endMs are Unix milliseconds. `timer` is the activeTimer object
  // captured at commit — we use its pauseIntervals to compute *active* time
  // per day, so a session that was paused across a Tuesday doesn't credit
  // Tuesday with hours that never actually happened.
  if(endMs<=startMs)return;
  const prevStreak=char.streak;
  const perDaySecs={};
  let cursor=startMs;
  while(cursor<endMs){
    const d=new Date(cursor);
    const midnight=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();
    const chunkEnd=Math.min(midnight,endMs);
    const dateStr=localDateStr(new Date(cursor));
    const secs=timer
      ?sessionActiveSecsBetween(timer, cursor, chunkEnd)
      :Math.max(0, Math.floor((chunkEnd-cursor)/1000));
    if(secs>0)perDaySecs[dateStr]=(perDaySecs[dateStr]||0)+secs;
    cursor=chunkEnd;
  }
  const chunks=Object.entries(perDaySecs)
    .map(([dateStr,secs])=>({dateStr,mins:Math.max(1,Math.round(secs/60))}))
    .filter(c=>c.mins>0);
  if(!chunks.length)return;
  // If a total active-seconds figure was passed, clamp the sum to it so
  // rounding across many day chunks can't inflate the session total.
  if(activeSecs){
    const targetMins=Math.max(1,Math.round(activeSecs/60));
    const sumMins=chunks.reduce((a,c)=>a+c.mins,0);
    if(sumMins!==targetMins&&chunks.length){
      chunks[chunks.length-1].mins+=targetMins-sumMins;
      if(chunks[chunks.length-1].mins<=0)chunks.pop();
      if(!chunks.length)return;
    }
  }
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
  const prevStreak=char.streak;
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
  const prevDateMin=goalMinsForDate(td);
  const nm=char.methods.includes(method)?char.methods:[...char.methods,method];
  let ngd=char.goalDays;
  const sessionCountsForGoal=char.countRetainingInGoal!==false||catId!=='retaining';
  if(sessionCountsForGoal&&prevDateMin<char.dailyGoalMin&&(prevDateMin+totalMins)>=char.dailyGoalMin)ngd++;
  char={...char,sessions:char.sessions+1,minutes:char.minutes+totalMins,streak:ns,lastDate:td,methods:nm,goalDays:ngd,lastMethod:method,lastCat:catId};
  const newly=[];
  for(const a of ACHS)if(!char.achievements.includes(a.id)&&a.check(char,photos)){char.achievements=[...char.achievements,a.id];newly.push({id:a.id,title:a.title,icon:a.icon});}
  logs=[{id:Date.now(),date:td,method,cat:catId,dur:totalMins,notes},...logs];
  saveChar();saveLogs();
  emitAwardActivity({prevStreak,newStreak:ns,newly});
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

// ── AWARD-PATH COMMUNITY EVENTS ───────────────────────────────────────────────
// Fires streak_milestone and badge_unlocked community events after any live
// award path completes. Only called from awardSession(), awardMultiDay(), and
// saveCILevels() — never from recalcAchievements(), so a returning user
// catching up on backfilled badges never spawns a burst of hero cards on
// first launch after an update.
const STREAK_MILESTONES=[7,30,100,365];
function emitAwardActivity({prevStreak,newStreak,newly}={}){
  if(typeof prevStreak==='number'&&typeof newStreak==='number'&&newStreak>prevStreak){
    const crossed=STREAK_MILESTONES.find(m=>prevStreak<m&&newStreak>=m);
    if(crossed)recordCommunityActivity('streak_milestone',{days:crossed});
  }
  (newly||[]).forEach(b=>{
    if(HERO_BADGE_IDS.has(b.id)){
      recordCommunityActivity('badge_unlocked',{badgeId:b.id,title:b.title,icon:b.icon});
    }
  });
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
    <div style="font-family:var(--font-display);font-size:13px;color:var(--accent);margin-bottom:14px;text-align:center">Edit Session</div>
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
  if(n>prev)recordCommunityActivity('ci_reached',{ci:n});
  if(n>prev)showToast(`🎉 ${LEVELS[n].ci} reached!`);
  else showToast(`◑ CI adjusted to ${LEVELS[n].ci}`);
  if(newly.length){setTimeout(()=>showToast(`🏅 ${newly[0].title} unlocked!`),1800);}
  showCISheet=false;render();
}

// ── PHOTOS ─────────────────────────────────────────────────────────────────────
async function addPhoto(ciLevel,dataUrl,note,dateStr){
  const photoDate=dateStr||today();
  const compressed=await compressForPhoto(dataUrl);
  const newPhoto={id:Date.now(),ci:ciLevel,date:photoDate,url:compressed,note:note||'',pinned:false};
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

function togglePhotoPin(id,btn){
  photos=photos.map(p=>p.id===id?{...p,pinned:!p.pinned}:p);
  savePhotos();
  const updated=photos.find(p=>p.id===id);
  showToast(updated?.pinned?'⭐ Pinned':'Unpinned');

  // Keep the cached era array in sync so navigating away and back shows the
  // new pin state — the era holds its own object references, and photos.map()
  // above just replaced the pinned entry with a new object.
  if(Array.isArray(window._viewerEra)){
    const ei=window._viewerEra.findIndex(p=>p.id===id);
    if(ei>=0)window._viewerEra[ei]=updated;
  }

  // Prefer the button reference passed in by the viewer's onclick. Falling
  // back to a global id lookup only covers legacy callers. If we can't find
  // the button at all, we assume the viewer is closed and call render().
  const pinBtn=btn||document.getElementById('viewer-pin-btn');
  if(pinBtn){
    const isOn=!!updated?.pinned;
    pinBtn.textContent=isOn?'⭐':'☆';
    pinBtn.style.background=isOn?'var(--acc12)':'';
    pinBtn.style.borderColor=isOn?'var(--acc30)':'';
    pinBtn.style.color=isOn?'var(--accent)':'';
    return;
  }
  render();
}

function groupPhotosByMonth(sortedPhotos){
  const map={};
  sortedPhotos.forEach(p=>{
    const key=(p.date||'').slice(0,7);
    if(!key)return;
    if(!map[key])map[key]=[];
    map[key].push(p);
  });
  return Object.entries(map)
    .sort((a,b)=>b[0].localeCompare(a[0]))
    .map(([key,list])=>({
      key,
      label:new Date(key+'-15T12:00:00').toLocaleDateString('en',{month:'long',year:'numeric'}),
      photos:list,
      totalKB:photosTotalKB(list)
    }));
}

function photoPrivacyMessage(){
  const connected=!!(fbIsGoogle&&fbUID);
  const backedUp=!!char.lastCloudBackup;
  if(connected&&backedUp){
    const when=new Date(char.lastCloudBackup).toLocaleDateString();
    return{icon:'🔒',strong:'Stored locally, and backed up privately to your Google account.',rest:`Last cloud backup: ${when}. Only you can access them.`};
  }
  if(connected){
    return{icon:'🔒',strong:'Stored on this device only.',rest:'Your Google account is connected — run a Cloud Backup from your profile to protect them.'};
  }
  return{icon:'🔒',strong:'Stored on this device only.',rest:'Never uploaded, never synced, never shared. Only you can see them.'};
}

function togglePhotoSelect(id){
  if(_photoSelectedIds.has(id))_photoSelectedIds.delete(id);
  else _photoSelectedIds.add(id);
  if(!_photoSelectedIds.size)_photoSelectMode=false;
  const c=document.getElementById('content');
  if(c&&tab==='photos'){c.innerHTML=renderPhotos();attachEvents();}
}

function enterPhotoSelect(id){
  _photoSelectMode=true;
  _photoSelectedIds=new Set([id]);
  const c=document.getElementById('content');
  if(c&&tab==='photos'){c.innerHTML=renderPhotos();attachEvents();}
}

function exitPhotoSelect(){
  _photoSelectMode=false;
  _photoSelectedIds=new Set();
  const c=document.getElementById('content');
  if(c&&tab==='photos'){c.innerHTML=renderPhotos();attachEvents();}
}

function bulkDeleteSelectedPhotos(){
  const count=_photoSelectedIds.size;
  if(!count)return;
  confirmDialog(
    `Delete ${count} photo${count!==1?'s':''}?`,
    'These photos will be permanently removed from your timeline. This cannot be undone.',
    'Delete',
    ()=>{
      const ids=_photoSelectedIds;
      photos=photos.filter(p=>!ids.has(p.id));
      savePhotos();
      recalcAchievements();
      _photoSelectMode=false;
      _photoSelectedIds=new Set();
      showToast(`Deleted ${count} photo${count!==1?'s':''}`);
      render();
    }
  );
}

function mountStorageSheet(){
  const ex=document.getElementById('storage-ov');if(ex)ex.remove();
  const months=groupPhotosByMonth([...photos].sort((a,b)=>b.date.localeCompare(a.date)));
  const totalKB=photosTotalKB(photos);
  const fmtKB=kb=>kb>=1024?`${(kb/1024).toFixed(1)} MB`:`${kb} KB`;
  const currentQ=char.photoQuality||'balanced';
  const privacy=photoPrivacyMessage();
  const qOption=(id,label,desc)=>`<div onclick="setPhotoQuality('${id}')" style="display:flex;align-items:center;gap:10px;padding:11px 12px;cursor:pointer;border-bottom:1px solid var(--stat-border);${currentQ===id?'background:var(--acc6);':''}">
    <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${currentQ===id?'var(--accent)':'var(--stat-border)'};flex-shrink:0;display:flex;align-items:center;justify-content:center">${currentQ===id?'<span style="width:8px;height:8px;border-radius:50%;background:var(--accent)"></span>':''}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:12px;font-weight:600;color:var(--text1)">${label}</div>
      <div style="font-size:10px;color:var(--text4);margin-top:1px">${desc}</div>
    </div>
  </div>`;
  const el=document.createElement('div');el.className='overlay';el.id='storage-ov';
  el.innerHTML=`<div class="sheet" style="max-height:88vh;padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:14px">Storage</div>
    <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:14px;margin-bottom:14px;text-align:center">
      <div style="font-size:24px;font-weight:700;color:var(--accent);line-height:1">${fmtKB(totalKB)}</div>
      <div style="font-size:11px;color:var(--text4);margin-top:4px">${photos.length} photo${photos.length!==1?'s':''} · stored in IndexedDB</div>
    </div>

    <div style="background:var(--acc6);border:1px solid var(--acc18);border-radius:10px;padding:10px 12px;margin-bottom:16px;font-size:11px;color:var(--text3);line-height:1.65">
      ${privacy.icon} <strong style="color:var(--text2)">${privacy.strong}</strong> ${privacy.rest}
    </div>

    <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">Compression Quality</div>
    <div style="font-size:10px;color:var(--text5);margin-bottom:8px;line-height:1.55">Applies to new photos only. Higher = sharper, more space.</div>
    <div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;overflow:hidden;margin-bottom:16px">
      ${qOption('high','High quality','~1200px, sharper details, larger files')}
      ${qOption('balanced','Balanced (recommended)','~1000px, good detail and size')}
      ${qOption('small','Small','~600px, compact, faster backup')}
    </div>

    <button onclick="exportPhotosZip()" ${photos.length?'':'disabled'} style="width:100%;background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:11px;font-size:12px;font-weight:600;color:var(--accent);cursor:${photos.length?'pointer':'default'};font-family:var(--font-body);margin-bottom:16px;opacity:${photos.length?1:.5}">📦 Export All as ZIP</button>

    <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px">By Month</div>
    ${months.length?months.map(m=>`
      <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;margin-bottom:6px">
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1)">${m.label}</div>
          <div style="font-size:10px;color:var(--text4);margin-top:2px">${m.photos.length} photo${m.photos.length!==1?'s':''} · ${fmtKB(m.totalKB)}</div>
        </div>
        <button onclick="deleteMonthPhotos('${m.key}')" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:7px;padding:6px 10px;font-size:11px;color:#a03232;cursor:pointer;font-family:var(--font-body);flex-shrink:0">Delete</button>
      </div>`).join(''):'<div style="font-size:11px;color:var(--text5);text-align:center;padding:12px">No photos yet.</div>'}

    <button class="btn-ghost" onclick="document.getElementById('storage-ov').remove()" style="width:100%;margin-top:12px">Close</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

function setPhotoQuality(q){
  char.photoQuality=q;
  saveChar();
  mountStorageSheet();
  showToast(`✓ Quality set to ${q}`);
}

function deleteMonthPhotos(monthKey){
  const list=photos.filter(p=>(p.date||'').slice(0,7)===monthKey);
  if(!list.length)return;
  confirmDialog(
    `Delete ${list.length} photo${list.length!==1?'s':''}?`,
    `All photos from ${monthKey} will be permanently removed. This cannot be undone.`,
    'Delete',
    ()=>{
      const ids=new Set(list.map(p=>p.id));
      photos=photos.filter(p=>!ids.has(p.id));
      savePhotos();
      recalcAchievements();
      document.getElementById('storage-ov')?.remove();
      showToast(`Deleted ${list.length} photo${list.length!==1?'s':''}`);
      render();
    }
  );
}

// ── CONFIRM DIALOG ─────────────────────────────────────────────────────────────
function confirmDialog(title,msg,confirmLabel,onConfirm){
  const ex=document.getElementById('confirm-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='confirm-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-size:18px;text-align:center;margin-bottom:10px">⚠️</div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--text1);text-align:center;margin-bottom:8px">${title}</div>
    <div style="font-size:12px;color:var(--text3);text-align:center;line-height:1.6;margin-bottom:20px">${msg}</div>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" id="confirm-cancel" style="flex:1">Cancel</button>
      <button id="confirm-ok" style="flex:1;background:linear-gradient(135deg,#5c0f0f,#c0392b);border:none;border-radius:10px;padding:13px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;font-family:var(--font-body)">${confirmLabel}</button>
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
    <div style="font-family:var(--font-display);font-size:14px;color:var(--text1);text-align:center;margin-bottom:8px">Session under 2 minutes</div>
    <div style="font-size:12px;color:var(--text3);text-align:center;line-height:1.6;margin-bottom:20px">Only ${fmtHMS(elapsed)} logged. This might have been accidental — what would you like to do?</div>
    <div style="display:flex;flex-direction:column;gap:7px">
      <button id="ssd-resume" style="background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:12px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer;font-family:var(--font-body)">${IC.play(14)} Resume Session</button>
      <button id="ssd-save" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px;color:var(--text2);font-size:13px;cursor:pointer;font-family:var(--font-body)">Save it anyway</button>
      <button id="ssd-discard" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:12px;color:#a03232;font-size:13px;cursor:pointer;font-family:var(--font-body)">Discard session</button>
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
        <div style="font-family:var(--font-display);font-size:14px;color:var(--accent)">${p.ci}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">${fmtDate(p.date)}</div>
        ${p.note?`<div style="font-size:12px;color:var(--text2);margin-top:6px;font-style:italic">${p.note}</div>`:'<div style="font-size:11px;color:var(--text5);margin-top:6px">No caption</div>'}
        <div style="margin-top:8px">
          ${p.canonical
            ?`<span style="font-size:11px;color:var(--accent);font-weight:600">★ ${p.ci} representative</span> <button onclick="toggleCanonicalPhoto(${p.id})" style="background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:var(--font-body);text-decoration:underline;margin-left:4px">Remove</button>`
            :`<button onclick="toggleCanonicalPhoto(${p.id})" style="background:none;border:none;color:var(--text4);font-size:11px;cursor:pointer;font-family:var(--font-body);text-decoration:underline">★ Set as ${p.ci} representative</button>`
          }
        </div>
      </div>
      <div id="viewer-edit-area"></div>
      ${_isIOS()?`<div style="font-size:11px;color:var(--text5);text-align:center;margin-top:14px;line-height:1.55;display:flex;align-items:center;justify-content:center;gap:6px">
        <span style="font-size:14px">💡</span>
        <span>Long-press the photo to save it to Photos</span>
      </div>`:''}
      <div style="display:flex;gap:8px;margin-top:${_isIOS()?'10':'14'}px;width:100%">
        <button class="btn-ghost" onclick="document.getElementById('photo-view').remove()" style="flex:1">Close</button>
        ${_isIOS()?'':`<button class="btn-outline" onclick="exportPhotoSingle(${p.id})" title="Download" style="flex:0 0 auto;padding:10px 14px;font-size:12px">⬇</button>`}
        <button id="viewer-pin-btn" class="btn-outline" onclick="event.stopPropagation();togglePhotoPin(${p.id},this)" style="flex:0 0 auto;padding:10px 14px;font-size:12px;${p.pinned?'background:var(--acc12);border-color:var(--acc30);color:var(--accent);':''}">${p.pinned?'⭐':'☆'}</button>
        <button class="btn-outline" onclick="openViewerEdit(${p.id})" style="flex:0 0 60px;font-size:12px">✏ Edit</button>
        <button class="del-btn" onclick="document.getElementById('photo-view').remove();confirmDialog('Delete this photo?','This will permanently remove it from your timeline.','Delete',()=>deletePhoto(${p.id}))" style="padding:10px 14px;font-size:12px">Delete</button>
      </div>`;
  }

  const el=document.createElement('div');el.className='photo-viewer';el.id='photo-view';
  el.innerHTML=buildContent(era[idx],idx);
  document.getElementById('root').appendChild(el);
  // Remember the era this viewer was opened with, so togglePhotoPin can
  // reopen it in the same context (filmstrip or single-photo) instead of
  // silently dropping the user to a single-photo view.
  window._viewerEra=era;

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
    // Swipe listeners persist on `el` — attached once at open, no need to re-attach
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
        style="padding:7px 2px;border-radius:7px;font-family:var(--font-display);font-size:10px;font-weight:700;cursor:pointer;text-align:center;transition:all .15s;background:${isSel?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isSel?'var(--acc30)':'var(--stat-border)'};color:${isSel?'var(--accent)':'var(--text3)'}">${l.ci}</button>`;
    }).join('');
    editArea.innerHTML=`
      <div style="margin-top:12px;background:var(--bg-stat);border:1px solid var(--acc30);border-radius:10px;padding:12px;width:100%">
        <input type="hidden" id="edit-photo-ci" value="${p.ci||'CI-0'}">
        <div style="font-size:10px;color:var(--text4);margin-bottom:7px;text-transform:uppercase;letter-spacing:.8px">CI Level</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:12px">${ciGrid}</div>
        <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Date</div>
        <input type="date" id="edit-photo-date" value="${p.date}" max="${today()}"
          style="background:var(--bg-card);border:1px solid var(--acc30);border-radius:7px;padding:7px 10px;color:var(--accent);font-size:14px;font-weight:600;width:100%;outline:none;font-family:var(--font-body);margin-bottom:10px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px">Caption</div>
        <input type="text" id="edit-photo-note" value="${htmlEsc(p.note||'')}" placeholder="Add a caption..."
          style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:7px;padding:7px 10px;color:var(--text1);font-size:12px;width:100%;outline:none;font-family:var(--font-body);margin-bottom:10px">
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
    // Sync the era entry — `era` holds the original object references, so the
    // `.map()` above didn't update it. Replace before re-rendering.
    const updated=photos.find(p=>p.id===photoId);
    if(updated)era[idx]=updated;
    el.innerHTML=buildContent(era[idx],idx);
    showToast('✓ Photo updated');
    // Swipe listeners persist on `el` — no need to re-attach
  };
}

// ── PHOTO EXPORT (ZIP) ────────────────────────────────────────────────────────
const _crc32Table=(()=>{
  const t=new Uint32Array(256);
  for(let n=0;n<256;n++){
    let c=n;
    for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);
    t[n]=c>>>0;
  }
  return t;
})();
function crc32(bytes){
  let crc=0xFFFFFFFF;
  for(let i=0;i<bytes.length;i++)crc=(crc>>>8)^_crc32Table[(crc^bytes[i])&0xFF];
  return (crc^0xFFFFFFFF)>>>0;
}
function dataUrlToBytes(dataUrl){
  const b64=(dataUrl.split(',')[1])||'';
  const bin=atob(b64);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  return bytes;
}
function buildZipBlob(entries){
  const chunks=[];
  const central=[];
  let offset=0;
  for(const e of entries){
    const nameBytes=new TextEncoder().encode(e.name);
    const crc=crc32(e.bytes);
    const size=e.bytes.length;
    const lfh=new Uint8Array(30+nameBytes.length);
    const lv=new DataView(lfh.buffer);
    lv.setUint32(0,0x04034b50,true);
    lv.setUint16(4,20,true);
    lv.setUint16(6,0,true);
    lv.setUint16(8,0,true);
    lv.setUint16(10,0,true);
    lv.setUint16(12,0,true);
    lv.setUint32(14,crc,true);
    lv.setUint32(18,size,true);
    lv.setUint32(22,size,true);
    lv.setUint16(26,nameBytes.length,true);
    lv.setUint16(28,0,true);
    lfh.set(nameBytes,30);
    chunks.push(lfh);
    chunks.push(e.bytes);
    const cdh=new Uint8Array(46+nameBytes.length);
    const cv=new DataView(cdh.buffer);
    cv.setUint32(0,0x02014b50,true);
    cv.setUint16(4,20,true);
    cv.setUint16(6,20,true);
    cv.setUint16(8,0,true);
    cv.setUint16(10,0,true);
    cv.setUint16(12,0,true);
    cv.setUint16(14,0,true);
    cv.setUint32(16,crc,true);
    cv.setUint32(20,size,true);
    cv.setUint32(24,size,true);
    cv.setUint16(28,nameBytes.length,true);
    cv.setUint16(30,0,true);
    cv.setUint16(32,0,true);
    cv.setUint16(34,0,true);
    cv.setUint16(36,0,true);
    cv.setUint32(38,0,true);
    cv.setUint32(42,offset,true);
    cdh.set(nameBytes,46);
    central.push(cdh);
    offset+=lfh.length+size;
  }
  const centralStart=offset;
  let centralSize=0;
  for(const c of central){chunks.push(c);centralSize+=c.length;}
  const eocd=new Uint8Array(22);
  const ev=new DataView(eocd.buffer);
  ev.setUint32(0,0x06054b50,true);
  ev.setUint16(4,0,true);
  ev.setUint16(6,0,true);
  ev.setUint16(8,entries.length,true);
  ev.setUint16(10,entries.length,true);
  ev.setUint32(12,centralSize,true);
  ev.setUint32(16,centralStart,true);
  ev.setUint16(20,0,true);
  chunks.push(eocd);
  return new Blob(chunks,{type:'application/zip'});
}
// Detect iOS/iPadOS — the only platform where the classic <a download> link
// doesn't actually save the file from a standalone PWA. We match both the
// classic iPhone/iPad/iPod UA string and the iPadOS-on-Mac path, where the UA
// reports Macintosh but touch points > 1 (Safari's way of hiding iPad from
// sites that don't ask for the desktop layout).
function _isIOS(){
  if(/iPad|iPhone|iPod/.test(navigator.userAgent))return true;
  return navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;
}

// Detects whether the app is running installed (standalone) vs in a browser
// tab. iOS exposes a non-standard `navigator.standalone`; every other platform
// uses the display-mode media query. We check all three display modes because
// Android Chrome and desktop PWAs can report `minimal-ui` or `fullscreen`
// depending on how the manifest is configured.
function isStandalone(){
  if(navigator.standalone===true)return true;
  if(window.matchMedia){
    if(window.matchMedia('(display-mode: standalone)').matches)return true;
    if(window.matchMedia('(display-mode: fullscreen)').matches)return true;
    if(window.matchMedia('(display-mode: minimal-ui)').matches)return true;
  }
  return false;
}

// Platform-aware install instructions. The steps differ meaningfully across
// iOS / Android / desktop, and the iOS in-app-browser trap is the single most
// common failure path for users arriving from Reddit or Instagram — so it
// gets its own callout rather than being buried in a numbered step.
function mountInstallSheet(){
  const ex=document.getElementById('install-ov');if(ex)ex.remove();
  const ios=_isIOS();
  const android=/Android/.test(navigator.userAgent);

  // Platform-aware steps. Three quirks that trip people up, all addressed here:
  //  - iOS Safari can hide the Share button behind the ••• menu (Compact layout)
  //  - "Add to Home Screen" can be missing from the share sheet (needs Edit Actions)
  //  - Android Chrome labels the menu item differently across versions
  const steps=ios?[
    {
      t:'Tap the Share button',
      d:'In Safari, it\u2019s the square with an up-arrow. If you don\u2019t see it, tap the ••• menu first — your Safari layout may hide it behind there.'
    },
    {
      t:'Scroll and tap \u201cAdd to Home Screen\u201d',
      d:'It\u2019s in the list of options. If you don\u2019t see it, scroll to the very bottom, tap \u201cEdit Actions\u201d, then tap \u201cAdd to Home Screen\u201d.'
    },
    {
      t:'Tap \u201cAdd\u201d',
      d:'Make sure \u201cOpen as Web App\u201d is turned on (it should be by default). RestoreTrack appears on your Home Screen.'
    }
  ]:android?[
    {
      t:'Tap the ⋮ menu',
      d:'Top-right corner of Chrome.'
    },
    {
      t:'Tap \u201cInstall app\u201d',
      d:'The exact wording varies: \u201cInstall app\u201d, \u201cAdd to Home screen\u201d, or \u201cInstall and create shortcut\u201d. All do the same thing.'
    },
    {
      t:'Confirm',
      d:'RestoreTrack appears on your Home Screen.'
    }
  ]:[
    {
      t:'Look for the install icon',
      d:'A small ⊕ or monitor icon in your browser\u2019s address bar.'
    },
    {
      t:'Click it and confirm',
      d:'Or open the browser menu and choose \u201cInstall RestoreTrack\u201d.'
    }
  ];

  const el=document.createElement('div');el.className='overlay';el.id='install-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="text-align:center;margin-bottom:22px">
      <div style="font-size:40px;margin-bottom:10px;opacity:.85">📱</div>
      <div style="font-family:var(--font-display);font-size:16px;color:var(--accent);margin-bottom:6px">Install RestoreTrack</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.65;max-width:300px;margin:0 auto">Opens from your Home Screen like a native app — no address bar, works offline.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
      ${steps.map((s,i)=>`
        <div style="display:flex;gap:12px;align-items:flex-start;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px">
          <div style="width:24px;height:24px;border-radius:50%;background:var(--acc12);border:1px solid var(--acc30);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:12px;font-weight:700;color:var(--accent);flex-shrink:0">${i+1}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:3px">${s.t}</div>
            <div style="font-size:11px;color:var(--text4);line-height:1.55">${s.d}</div>
          </div>
        </div>`).join('')}
    </div>
    ${(ios||android)?`<div style="background:var(--acc6);border:1px solid var(--acc18);border-radius:8px;padding:10px 12px;margin-bottom:16px;font-size:11px;color:var(--text3);line-height:1.65">
      💡 <strong style="color:var(--text2)">Coming from Reddit, Instagram, or another app?</strong> You may be in an in-app browser. Tap the menu in the corner and choose <strong style="color:var(--text2)">\u201cOpen in browser\u201d</strong> or <strong style="color:var(--text2)">\u201cOpen in Safari\u201d</strong> first — the install option won\u2019t appear otherwise.
    </div>`:''}
    <button class="btn-ghost" onclick="document.getElementById('install-ov').remove()" style="width:100%">Got it</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

function exportPhotoSingle(id){
  const p=photos.find(x=>x.id===id);
  if(!p)return;

  // iOS standalone PWAs refuse <a download> (it starts a navigation, which
  // iOS blocks and shows as a flash back to the app) and silently reject
  // navigator.share() in this context. Long-pressing the image is the only
  // reliable path on iOS — it invokes the OS's own "Save Image" menu.
  // So on iOS, we skip the download entirely and guide the user to long-press.
  if(_isIOS()){
    showToast('📷 Long-press the photo to save it to Photos');
    return;
  }

  // Desktop and Android: standard download link — lands in Downloads.
  const ci=(p.ci||'CI-0').replace(/[^A-Za-z0-9-]/g,'_');
  const filename=`restoretrack-${p.date||today()}-${ci}.jpg`;
  const a=document.createElement('a');
  a.href=p.url;
  a.download=filename;
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  showToast('📷 Photo downloaded');
}
async function exportPhotosZip(){
  if(!photos.length){showToast('No photos to export');return;}
  showToast(`📦 Preparing ZIP (${photos.length} photos)…`);
  try{
    const entries=photos.map((p,i)=>{
      const ci=(p.ci||'CI-0').replace(/[^A-Za-z0-9-]/g,'_');
      const date=p.date||today();
      const name=`${date}_${ci}_${String(i+1).padStart(3,'0')}.jpg`;
      return{name,bytes:dataUrlToBytes(p.url)};
    });
    // Also include a small manifest
    const manifest=JSON.stringify({
      exportedAt:new Date().toISOString(),
      profileName:char.name||'Restorer',
      photoCount:photos.length,
      photos:photos.map(p=>({id:p.id,date:p.date,ci:p.ci,note:p.note||''}))
    },null,2);
    entries.push({name:'manifest.json',bytes:new TextEncoder().encode(manifest)});
    const blob=buildZipBlob(entries);
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`restoretrack-photos-${today().replace(/-/g,'')}.zip`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(`✅ ${photos.length} photos exported`);
  }catch(e){
    console.warn('[RT] zip export error',e);
    showToast('⚠ Could not build ZIP');
  }
}

// ── EXPORT ─────────────────────────────────────────────────────────────────────
function exportCSV(){
  const rows=[['Date','Method','Category','Duration (min)','Notes']];
  logs.forEach(l=>{const cat=catFor(l.cat);rows.push([l.date,l.method,cat.label,l.dur,(l.notes||'').replace(/[,\r\n]+/g,' ')]);});
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
// Fires a small upward-outward burst of encouraging emojis.
// If originEl is provided, the burst originates near that element —
// so tapping 👊 on a specific card feels local and satisfying rather
// than generic-screen-confetti.
function showEncourageBurst(avatar,originEl){
  const pool=[avatar||'👊','💪','✨','🌱','⚡','🔥'];
  let baseX=50,baseY=50;
  if(originEl){
    const rect=originEl.getBoundingClientRect();
    baseX=((rect.left+rect.width/2)/window.innerWidth)*100;
    baseY=((rect.top+rect.height/2)/window.innerHeight)*100;
  }
  for(let i=0;i<7;i++)setTimeout(()=>{
    const el=document.createElement('div');
    el.textContent=pool[i%pool.length];
    const fs=16+Math.random()*20,dur=.8+Math.random()*.5;
    const x=baseX+(Math.random()-0.5)*30;
    const y=baseY+(Math.random()-0.5)*20;
    el.style.cssText=`position:fixed;font-size:${fs}px;left:${x}%;top:${y}%;pointer-events:none;z-index:500;animation:enc-burst ${dur}s ease forwards`;
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

// ── CI RING SVG ────────────────────────────────────────────────────────────────
function arcD(cx,cy,r,startDeg,endDeg){
  const toR=d=>d*Math.PI/180;
  const sx=cx+r*Math.cos(toR(startDeg)),sy=cy+r*Math.sin(toR(startDeg));
  const ex=cx+r*Math.cos(toR(endDeg)),ey=cy+r*Math.sin(toR(endDeg));
  const sweep=((endDeg-startDeg)%360+360)%360;
  const large=sweep>180?1:0;
  return`M${sx.toFixed(2)},${sy.toFixed(2)} A${r},${r} 0 ${large},1 ${ex.toFixed(2)},${ey.toFixed(2)}`;
}

// ── COACH MESSAGE ──────────────────────────────────────────────────────────────
// ── COACH BRAIN ────────────────────────────────────────────────────────────────
// A curated, growing knowledge library. Pattern-matched against user questions.
// To expand: bring user questions to Claude, add new entries, push update.

const COACH_BRAIN={

  // ── TENSION & GROWTH SCIENCE ──────────────────────────────────────────────
  tension:{
    keywords:['tension','how does','work','science','tissue','grow','biology','mechanism','skin expansion','mitosis'],
    response:(u)=>`The biological principle is sound: sustained mechanical stretch can prompt living skin to adapt and gain surface area. Tissue expansion is an established reconstructive technique, and mechanotransduction is a real cellular process.\n\nThe important limit is that there are no high-quality clinical trials that tell us exactly how non-surgical foreskin restoration compares to other methods, what the ideal daily routine is, or how quickly any individual will progress. Community timelines are personal reports, not a prediction for you.\n\nWhat we do know from your own data: you're currently at ${LEVELS[u.ci].ci}, you've logged ${u.sessions} sessions totalling ${Math.floor(u.minutes/60)} hours, and your 30-day average is ${fmtMin(u.avgDay)}/day.\n\nA safer way to use that data is to watch your own comfortable time under tension, skin condition, and photos over months. If you develop pain, numbness, coldness, persistent colour change, broken skin, or urinary symptoms, stop and seek medical advice.\n\nSources reviewed: PubMed PMID 36077018 (mechanical stretch and skin regeneration) and PMID 36518877 (external tissue expansion evidence and limitations).`
  },

  howLong:{
    keywords:['how long','timeline','years','months','when will','how much time','take','finish','complete','done','ci-10','fully restored'],
    response:(u)=>`This is the question every restorer wants answered, and the honest answer is: nobody can tell you with certainty, including me.\n\nThere is no validated hours-per-day target or deadline that can certify you as "on track." Community reports describe full restoration taking anywhere from 2 to 7+ years depending on starting point, daily time under tension, and individual biology. Those are personal accounts, not a prediction for you.\n\nWhat I can tell you is specific to you: you're currently at ${LEVELS[u.ci].ci}, you've logged ${u.sessions} sessions totalling ${Math.floor(u.minutes/60)} hours, and your 30-day average is ${fmtMin(u.avgDay)}/day.\n\nThe restorers who finish tend to be the ones who stopped asking "when" and started focusing on sustainable, comfortable daily practice. If you're concerned about tight erections, scarring, or persistent skin changes, that's a reason to speak with a clinician — not to increase tension.\n\nSources reviewed: BMJ 2024 rapid responses on foreskin restoration; Ozer & Timmermans (2022) systematic review noting the absence of peer-reviewed non-surgical protocols.`
  },

  ciLevels:{
    keywords:['ci level','ci-','ci0','ci1','ci2','ci3','ci4','ci5','ci6','ci7','ci8','ci9','ci10','what is ci','coverage index','halfway','progress','what level'],
    response:(u)=>`The Coverage Index (CI) is the standard scale restorers use to describe coverage, from CI-0 (starting point) to CI-10 (full restoration). It was created by Paul Sherriff as a practical tool, not a scientific instrument — its value is in tracking your own trend over time, not comparing yourself to others.\n\nYou're currently at ${LEVELS[u.ci].ci}.\n\nA useful companion scale is the Real Coverage Index (RCI), which describes the same levels in words rather than photos. The community wiki has both.\n\nOne important caveat: CI is typically assessed flaccid. Coverage erect often lags 2–3 levels behind, especially for men who are "growers." This is normal and doesn't mean your progress has stalled.\n\nUpdate your CI in the Progress tab when you notice consistent change — not day-to-day fluctuation.`
  },

  methods:{
    keywords:['method','manual','device','tape','t-tape','tugger','tlc','dtr','retaining','inflation','which method','best method','what should i use','packing','ric','restore in comfort'],
    response:(u)=>{
      const used=(u.methods||[]).length;
      return`There is no medically proven best method. Your stage mainly determines which methods you can apply without slipping, pinching, or excessive force — not which one is guaranteed to grow tissue faster.\n\nThe five broad approaches:\n\n✋ Manual methods (MM1–MM5) require no equipment and can be done anywhere. Good for beginners and for applying directed tension.\n\n⚙ Devices (DTR, TLC Tugger, HyperRestore, etc.) apply tension passively while you go about your day. Many restorers find devices are the easiest way to accumulate wear time.\n\n📐 Taping (T-tape, cross tape) creates a custom tension setup using medical tape. Popular for long wear times.\n\n💨 Inflation applies tension from the inside using air. Targets different tissue areas than external methods. Always cover the urethral opening before inflating.\n\n🔒 Retaining holds coverage without active tension — for dekeratinisation and protection between sessions. It is not a substitute for active tension.\n\nYou've used ${used} method${used!==1?'s':''} so far${used>0?': '+u.methods.slice(0,3).join(', '):''}. Choose the safest method you can use comfortably and consistently.\n\nStop active tension for pain, numbness, colour change, broken skin, or rash. A clinician can help if tight erections, scarring, or skin disease are part of the picture.`
    }
  },

  consistency:{
    keywords:['consistent','consistency','every day','daily','habit','routine','keep going','motivation','give up','quit','hard','difficult','struggle'],
    response:(u)=>`Consistency is the entire game in restoration. It's not about any single session — it's about the cumulative signal over months and years.\n\nHere's what your data says: ${u.streak>14?`You have a ${u.streak}-day streak — that's genuine consistency and it's working.`:u.streak>0?`You have a ${u.streak}-day current streak. Building on this is exactly the right focus.`:'Your streak has broken recently. That\'s normal — what matters is getting back.'}\n\nThe restorers who see the most progress tend to do one thing differently: they make restoration part of an existing habit. Put your device on when you shower. Do MM1 while watching TV. Wear T-tape during your commute. Attaching restoration to something you already do daily removes the decision entirely.\n\nYour 30-day average is ${fmtMin(u.avgDay)}/day. ${u.avgDay>=90?'That\'s excellent. Keep that foundation solid.':u.avgDay>=45?'That\'s a solid base. Finding 20 more minutes somewhere in your day would make a real difference.':'Even small increases compound over months. What\'s one existing habit you could attach restoration to?'}`
  },

  plateau:{
    keywords:['plateau','stuck','stall','no progress','not moving','same ci','months','not working','slow','nothing happening','frustrated'],
    response:(u)=>`Plateaus are one of the most common and frustrating parts of restoration — and almost every restorer experiences them.\n\nTissue growth doesn't appear to be linear for most people. Community reports describe cycles of visible growth and apparent plateaus — the reason for this isn't fully established, but it's a shared experience.\n\nSome restorers find that varying method or tension level seems to help. Change one variable at a time and give it weeks, not days, before judging.\n\nAt ${LEVELS[u.ci].ci} with ${Math.floor(u.minutes/60)} hours logged, ${u.minutes<3000?'you\'re still in the early phases where patience is the main tool.':'you have significant hours invested.'}\n\nOne more thing: dekeratinisation is happening even when CI doesn't change. The glans is softening and becoming more sensitive beneath the surface. Progress is often invisible before it becomes visible.`
  },

  dekeratinisation:{
    keywords:['dekeratinisation','dekeratinization','sensitive','sensitivity','glans','shiny','soft','moist','rough','dry','skin texture'],
    response:(u)=>`Dekeratinisation is one of the most significant — and least discussed — benefits of restoration, and it starts happening long before your CI level moves significantly.\n\nThe glans naturally has a mucosal surface that stays protected in an intact foreskin. After circumcision, constant exposure is associated with hardening of the surface and a keratinised layer forming. Many restorers describe this as reducing sensitivity.\n\nAs you restore coverage, the glans begins spending more time protected. The keratinised layer gradually sheds and the mucosal surface returns. This is why many restorers report significant sensitivity changes well before reaching their target CI level.\n\nAt ${LEVELS[u.ci].ci}, ${u.ci>=3?'you should be starting to notice some changes in glans texture and sensitivity, especially on days with good coverage.':'this process is beginning. Retaining (using a retainer to maintain coverage between sessions) accelerates dekeratinisation significantly even before your CI advances.'}\n\nSigns to look for: slightly shinier appearance, increased sensitivity, occasional slight moisture retention. These are all positive indicators.`
  },

  restDays:{
    keywords:['rest day','rest','recovery','break','day off','overdo','sore','irritated','take a break','too much','hurts','pain','uncomfortable'],
    response:(u)=>`Take a break from active tension when your skin is sore, raw, cracked, blistered, persistently red, swollen, unusually sensitive, or simply not recovering between wears. Continuing through those signs risks turning a small problem into an injury.\n\nThere is no research-backed universal schedule such as "one or two rest days per week" for non-surgical foreskin restoration. If your skin feels normal and your setup is comfortable, a planned break is a personal choice — not a failure, and not something you need to earn.\n\n${(u.restDays||[]).length>0?`You've marked ${u.restDays.length} rest day${u.restDays.length!==1?'s':''} in the app.`:'You haven\'t marked any rest days yet — that\'s fine if your skin is healthy.'}\n\nStop immediately for pain, numbness, coldness, persistent colour change, swelling, broken skin, or any new urinary symptom. For severe pain, a trapped or retracted foreskin, inability to urinate, spreading redness, fever, or an erection lasting more than four hours, seek urgent medical care.`
  },

  beginners:{
    keywords:['beginner','start','starting','new','first','where do i','how do i start','just started','just beginning','confused','what do i do','help','guide'],
    response:(u)=>`Welcome to the journey. Here's what I'd recommend focusing on as you're getting started:\n\n1. Start with manual methods first. MM1 and MM2 require no equipment, help you understand your anatomy, and can be done anywhere. Do them while watching TV or reading.\n\n2. Set a realistic daily goal. Many restorers start with 30–60 minutes. You can adjust based on comfort and skin condition — the goal is building a sustainable habit, not maximum output on day one.\n\n3. Update your CI level in the Progress tab. Even if you're at CI-0, setting it gives you a baseline and makes progress visible over time.\n\n4. Take a baseline photo now. In 6 months you'll be glad you did. Progress is nearly invisible day to day but dramatic across months.\n\n5. Be patient with the science. Tissue growth takes months of consistent work before it becomes visible. Many people quit right before they'd start seeing results.\n\nYou've logged ${u.sessions} session${u.sessions!==1?'s':''} so far. ${u.sessions===0?'Your first session is the most important one — even 10 minutes.':u.sessions<10?'Good start. Focus on building the daily habit before optimising anything else.':'You\'re building a real foundation. Keep it going.'}`
  },

  progress:{
    keywords:['progress','how am i doing','am i doing well','results','working','effective','am i on track','check in','update','feedback'],
    response:(u)=>{
      const hrs=Math.floor(u.minutes/60);
      const avgDay=u.avgDay;
      let assessment='';
      if(u.sessions===0)assessment='You haven\'t logged any sessions yet. Your journey starts with your first log.';
      else if(avgDay>=90)assessment=`Your ${fmtMin(avgDay)}/day average over the last 30 days is high. You're applying a lot of consistent time under tension.`;
      else if(avgDay>=60)assessment=`Your ${fmtMin(avgDay)}/day average represents a solid amount of time under tension. You're doing well.`;
      else if(avgDay>=30)assessment=`Your ${fmtMin(avgDay)}/day average is a decent base. Many restorers find that pushing toward 60+ minutes daily helps, though there's no validated target.`;
      else if(avgDay>0)assessment=`Your ${fmtMin(avgDay)}/day average is lower than what many restorers aim for. Small increases compound over time.`;
      else assessment='You haven\'t logged sessions in the past 30 days. Getting back on track is the priority.';
      return`Here's your honest progress snapshot:\n\n📊 ${u.sessions} sessions · ${hrs} hours total · ${char.streak}-day streak\n🎯 ${fmtMin(avgDay)}/day average (last 30 days)\n◑ Currently ${LEVELS[u.ci].ci}\n\n${assessment}\n\n${u.ci>0&&u.minutes>0?`At your current pace you're accumulating roughly ${Math.round(avgDay*30/60)} hours of tension per month. ${avgDay>=60?'That\'s a substantial amount.':'Increasing your daily average is one of the most impactful things you can do.'}`:''}`;
    }
  },

  motivation:{
    keywords:['motivat','inspired','inspire','keep going','worth it','give up','quit','not worth','why','purpose','reason','point','does it work','real'],
    response:(u)=>`Restoration works for many people. The underlying principle — tissue expansion — is well-established in reconstructive medicine, and thousands of restorers have reported success. The question isn't whether it works, it's whether you'll be consistent enough long enough.\n\nHere's something worth sitting with: many restorers who reach CI-8 or higher report spending several years getting there. That sounds daunting. But those years pass regardless. The question is whether you spend them working toward something meaningful or not.\n\nYou've already put in ${Math.floor(u.minutes/60)} hours across ${u.sessions} sessions. That's real. That's tissue that exists now that didn't exist when you started. It doesn't disappear.\n\n${u.streak>7?`Your ${u.streak}-day streak shows you have the consistency to do this. Don't underestimate that.`:u.sessions>20?'You\'ve built real history here. That matters.':'Every session is a deposit into an account that only grows.'}\n\nThe restorers who finish are not the ones with the most free time or the best genetics. They're the ones who decided to stop deciding and just do it every day.`
  },

  inflation:{
    keywords:['inflation','balloon','air','hyperrestore','priva','airforce','foreskinned air','inflate','inflat'],
    response:(u)=>`Inflation methods use air pressure inside the foreskin to apply tension from the inside out. This targets the inner foreskin specifically, which is the more sensitive mucosal tissue that can't be as easily reached by external tension methods.\n\nDevices like HyperRestore's balloon method, the Airforce Direct Air, Priva Air, and DIY balloon methods all work on this principle. The skin is held forward and air is introduced to create sustained outward tension.\n\nInflation is particularly effective for: inner foreskin development, even circular tension distribution, and passive wear time since once inflated it maintains itself.\n\nThe main considerations: start with low pressure and work up gradually, never push to discomfort, and limit sessions initially to 30–60 minutes until you understand how your tissue responds. Overinflation is the main risk — more pressure does not mean faster results.\n\n${(u.methods||[]).some(m=>m.toLowerCase().includes('air')||m.toLowerCase().includes('balloon')||m.toLowerCase().includes('priva'))?'You\'ve tried inflation methods — good to see variety in your approach.':'You haven\'t tried inflation yet. It\'s worth exploring as a complement to your current methods, especially for inner foreskin development.'}`
  },

  retaining:{
    keywords:['retain','retaining','retainer','cone','manhood','si retainer','stealth','coverage','protect','between sessions','dekeratini'],
    response:(u)=>`Retaining is different from active restoration — it's not primarily about tissue growth, it's about maintaining coverage to allow dekeratinisation and protecting the glans from constant exposure.\n\nA retainer (cone, ManHood, SI Retainer, etc.) holds your existing skin forward without active tension. This means the glans spends time covered and protected even when you're not actively restoring.\n\nThe reported benefits: many restorers describe dekeratinisation changes with consistent retaining, improved sensitivity, and psychological motivation from experiencing what fuller coverage feels like.\n\nRetaining is most effective at CI-3 and above when there's enough loose skin to actually maintain coverage. Below CI-3, retaining with a device can still help but the coverage is partial.\n\n${u.ci>=3?'At your current CI level, retaining between sessions is highly recommended. Even a few hours per day makes a meaningful difference to dekeratinisation.':'At your current stage, focus primarily on active restoration first. Retaining becomes increasingly beneficial as you gain more coverage.'}`
  },

  taping:{
    keywords:['tape','t-tape','tegaderm','cross tape','taping','transpore','canister','dtrt'],
    response:(u)=>`Taping is one of the most popular restoration methods for good reason — it's inexpensive, customisable, and allows long wear times throughout the day.\n\nT-Tape is the most widely used: medical tape (3M Transpore works well) applied to hold the foreskin forward with tension. The setup takes a few minutes but can then be worn for hours during normal activity.\n\nKey things to know:\n• The tape goes on clean, dry skin — oils or moisture reduce adhesion\n• Tension should be comfortable but noticeable — never painful\n• Start with 2–4 hour wear times and work up\n• Remove carefully (warm water helps) to avoid skin irritation\n• Shaving the base of the shaft helps with adhesion and removal\n• Some redness after removal is normal — raw irritation is not\n\n${(u.methods||[]).some(m=>m.toLowerCase().includes('tape'))?'You\'re already using taping methods — make sure your wear time is maximised. Many restorers get their best tension hours from tape.':'Taping might be worth trying. It has one of the highest wear-time potentials of any method and works well alongside device use.'}`
  },

  goals:{
    keywords:['goal','daily goal','target','set a goal','my goal','change goal','update goal','aim','recommended daily','enough per day'],
    response:(u)=>`Your current daily goal is ${fmtMin(u.goal)}. ${u.avgDay>=u.goal?'You\'ve been meeting or exceeding it — you can adjust it up if you want a bigger target.':u.avgDay>=u.goal*0.7?'You\'re close to your goal most days.':'You\'re currently averaging below your goal.'}\n\nThere is no scientifically validated hours-per-day target for non-surgical foreskin restoration. The numbers you see quoted in the community — 30 minutes, 60 minutes, 2–4 hours — are personal reports, not clinical guidance.\n\nWhat matters more than any specific number:\n• Comfortable tension you can sustain without skin injury\n• Consistency over months, not intensity in a single day\n• Attention to skin condition — stop if anything changes\n\nThe goal in this app exists to give you a personal benchmark. Set it to something realistic for your life, and adjust it as your routine changes. A lower goal you actually hit every day beats a high goal you miss.`
  },

  photos:{
    keywords:['photo','picture','progress photo','document','compare','before after','photo journal','take photo'],
    response:(u)=>`Progress photos are one of the most important and most neglected parts of restoration. Here's why they matter so much: restoration progress is nearly invisible on a day-to-day basis. You look the same today as yesterday. But compared to 6 months ago? The difference is often dramatic — and without photos, you'll never see it.\n\nYou currently have ${photos.length} photo${photos.length!==1?'s':''} logged. ${photos.length===0?'Take a baseline photo today. Even if you\'re at CI-0, a starting point is essential for tracking progress.':photos.length<5?'Good start. The most useful comparison is when you have photos across different CI levels and time periods.':'Good photo history. The side-by-side comparison feature in the Photos tab lets you compare any two photos directly.'}\n\nBest practices:\n• Same lighting, same position, same camera distance each time\n• Take photos both flaccid and erect to see CI changes accurately\n• Once a month is a good cadence — enough to see change without being obsessive\n• Note your CI level when adding a photo so you can track correlation`
  },

  sleep:{
    keywords:['sleep','overnight','night','sleeping','nocturnal','while sleeping','bed'],
    response:(u)=>`Overnight use is possible but requires care, and there is no research-backed protocol for it.\n\nWhat some restorers report using overnight: retaining only (O-ring, cone, or a medical-grade retainer) with no active tension; or T-tape at very low tension after extended experience.\n\nWhy caution matters: nocturnal erections create unpredictable tension. A setup that feels fine when awake can become uncomfortable or cause skin injury during an erection you can't consciously manage. Many experienced restorers describe overnight use as their highest-yield tension time — but also the time most likely to cause a setback if the setup is wrong for them.\n\nA safer way to build toward overnight use:\n• Start with retaining only (no active tension) for the first few weeks\n• If that's comfortable, try light tape tension\n• Only consider a low-tension device if tape overnight is comfortable\n• Avoid a device while sleeping unless its maker specifically says that use is appropriate\n\nStop immediately for pain, numbness, coldness, colour change, swelling, or any trouble urinating. A setup that is hard to remove is a reason not to proceed. Ask a clinician promptly about persistent pain, rash, swelling, discharge, or fever.`
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
    if(!res.ok){console.warn('[Coach] coach_data.json returned status', res.status);return;}
    const data=await res.json();
    if(Array.isArray(data)){
      coachExtended=data;
      console.log(`[Coach] Loaded ${coachExtended.length} extended entries`);
    } else {
      console.warn('[Coach] coach_data.json is not an array');
    }
  }catch(e){
    console.error('[Coach] coach_data.json failed to parse or load:', e.message);
  }
}
loadCoachData();

// ── COACH BRAIN MATCHER ────────────────────────────────────────────────────────
function coachBrainMatch(question){
  // Normalize: lowercase, strip punctuation, collapse whitespace
  const q=question.toLowerCase()
    .replace(/[?!.,;:"']/g,' ')
    .replace(/\s+/g,' ')
    .trim();

  // Build user context object
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

  // Score with specificity tiebreaker:
  // - Higher score wins.
  // - On exact tie, entry with FEWER total keywords wins (more focused).
  // - Extended entries supersede brain entries on exact tie with same keyword count.
  let bestScore=0,bestKeywordCount=Infinity,bestTopic=null,bestExtEntry=null;

  for(const[topic,data] of Object.entries(COACH_BRAIN)){
    let score=0;
    for(const kw of data.keywords){
      if(q.includes(kw))score+=kw.split(' ').length;
    }
    const isBetter=score>bestScore||(score===bestScore&&score>0&&data.keywords.length<bestKeywordCount);
    if(isBetter){
      bestScore=score;
      bestKeywordCount=data.keywords.length;
      bestTopic=topic;
      bestExtEntry=null;
    }
  }

  // Extended knowledge base — loaded from coach_data.json
  for(const entry of coachExtended){
    let score=0;
    for(const kw of entry.keywords){
      if(q.includes(kw))score+=kw.split(' ').length;
    }
    // Extended supersedes brain on equal score + equal specificity (cautious voice priority)
    const isBetter=score>bestScore||(score===bestScore&&score>0&&entry.keywords.length<=bestKeywordCount);
    if(isBetter){
      bestScore=score;
      bestKeywordCount=entry.keywords.length;
      bestExtEntry=entry;
      bestTopic=null;
    }
  }

  if(bestScore===0){
    return`I'm not sure I have a perfect answer for that specific question, ${char.name}. Try asking about methods, CI levels, consistency, how restoration works, rest days, or ask for a progress check-in.\n\nYou can also send feedback via the profile menu — specific questions you ask that I can't answer well help me get smarter over time.`;
  }

  if(bestExtEntry) return bestExtEntry.response;
  const data=COACH_BRAIN[bestTopic];
  return typeof data.response==='function'?data.response(u):data.response;
}

function todayInsight(){
  const hour=new Date().getHours();
  const tMin=todayMin();
  const tGoal=todayGoalMin();
  const goal=char.dailyGoalMin||120;
  const goalLeft=Math.max(0,goal-tGoal);
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;
  const tLogs=todayLogs();

  // Brand-new user — first-session nudge during the first week.
  if(char.sessions===0&&!tLogs.length&&!isRunning){
    const created=(profiles[0]&&profiles[0].createdAt)||today();
    const daysSince=Math.round((new Date(today())-new Date(created))/86400000);
    if(daysSince<=7){
      const firstMethod=(char.preferredMethods||[])[0];
      if(firstMethod){
        return{icon:'👋',msg:`Welcome. When you're ready, tap Start Session to log your first ${firstMethod} session.`};
      }
      return{icon:'👋',msg:'Welcome to RestoreTrack. Tap Start Session whenever you\'re ready — even a few minutes counts.'};
    }
  }

  // Never interrupt an active session
  if(isRunning)return null;

  // Streak about to break (evening, no session today)
  if(hour>=20&&tMin===0&&char.streak>=3)
    return{icon:'🔥',msg:`${char.streak}-day streak still intact today — a short session keeps it.`};

  // Goal just hit
  if(tGoal>=goal&&tGoal<goal+30)
    return{icon:'🎯',msg:`Goal reached — ${fmtMin(tGoal)} logged today.${char.streak>1?` ${char.streak}-day streak.`:''}`};

  // Close to goal (evening)
  if(goalLeft>0&&goalLeft<=30&&hour>=17)
    return{icon:'⏱',msg:`${fmtMin(goalLeft)} from today's goal. One short session closes it.`};

  // Today has multiple short sessions — nudge toward longer
  if(tLogs.length>=2){
    const avg=Math.round(tLogs.reduce((a,l)=>a+l.dur,0)/tLogs.length);
    if(avg<10)
      return{icon:'⏱',msg:`Today's average session is ${avg}m. Longer sessions reach your ${goal}m goal faster.`};
  }

  // Close to goal (any time)
  if(goalLeft>0&&goalLeft<=30&&tGoal>0)
    return{icon:'⏱',msg:`${fmtMin(goalLeft)} from today's goal.`};

  // Weekly trend
  if(char.sessions>=10){
    const now=Date.now();
    const last7=logs.filter(l=>{const d=(now-new Date(l.date+'T12:00:00'))/86400000;return d<=7;});
    const prev7=logs.filter(l=>{const d=(now-new Date(l.date+'T12:00:00'))/86400000;return d>7&&d<=14;});
    if(prev7.length>=3){
      const l7=last7.reduce((a,l)=>a+l.dur,0);
      const p7=prev7.reduce((a,l)=>a+l.dur,0);
      const diff=l7-p7;
      if(diff>=90)return{icon:'📈',msg:`${fmtDur(diff)} more time this week than last.`};
      if(diff<=-90)return{icon:'📉',msg:`${fmtDur(Math.abs(diff))} less this week than last.`};
    }
  }

  // Method rotation — a saved method hasn't been used in 14+ days
  if((char.methods||[]).length>=2){
    const methodLast={};
    logs.forEach(l=>{
      if(!l.method)return;
      const t=new Date(l.date+'T12:00:00').getTime();
      if(!methodLast[l.method]||t>methodLast[l.method])methodLast[l.method]=t;
    });
    const nowMs=Date.now();
    const stale=char.methods
      .map(m=>({m,days:Math.round((nowMs-(methodLast[m]||nowMs))/86400000)}))
      .filter(x=>x.days>=14&&x.days<365)
      .sort((a,b)=>b.days-a.days);
    if(stale.length)
      return{icon:'🔄',msg:`It's been ${stale[0].days} days since you used ${stale[0].m}.`};
  }

  // Photo nudge
  if(photos.length>0){
    const days=Math.round((Date.now()-new Date(photos[0].date+'T12:00:00'))/86400000);
    if(days>=45)return{icon:'📸',msg:`Last photo was ${days} days ago — a new one would track real change.`};
    if(days>=30)return{icon:'📸',msg:`${days} days since your last photo.`};
  } else if(char.sessions>=5){
    return{icon:'📸',msg:'No photos yet — a baseline today is worth having later.'};
  }

  // Time at current CI level
  if(char.ciHistory&&char.ciHistory.length){
    const atCI=char.ciHistory.filter(h=>h.ci===char.ciLevel).pop();
    if(atCI){
      const days=Math.round((Date.now()-new Date(atCI.date+'T12:00:00'))/86400000);
      if(days>=90)
        return{icon:'◑',msg:`${days} days at ${LEVELS[char.ciLevel].ci}. Long stretches are normal.`};
    }
  }

  // Day-of-week pattern
  if(char.sessions>=14){
    const last30=logs.filter(l=>(Date.now()-new Date(l.date+'T12:00:00'))/86400000<=30);
    const dowCount=[0,0,0,0,0,0,0];
    last30.forEach(l=>{dowCount[new Date(l.date+'T12:00:00').getDay()]++;});
    const todayDow=new Date().getDay();
    if(dowCount[todayDow]===0&&Math.max(...dowCount)>=3){
      const names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      return{icon:'📅',msg:`You haven't logged on a ${names[todayDow]} in 30 days.`};
    }
  }

  // Total hours milestone
  const totalH=Math.floor(char.minutes/60);
  if(totalH>0&&totalH%50===0)
    return{icon:'⏳',msg:`${totalH} hours logged. Quiet accumulation.`};

  // Rotating tips — useful, varied, changes daily
  const tips=[
    {icon:'💡',msg:'Tap Start Session for a live timer, or Log Past for a session already done.'},
    {icon:'📸',msg:'Take a baseline photo now — you\'ll be glad you have it months from now.'},
    {icon:'◑',msg:'Update your CI level in Progress when you notice consistent change, not day-to-day.'},
    {icon:'📊',msg:'Progress shows weekly totals, a calendar heatmap, and per-method breakdowns.'},
    {icon:'💬',msg:'Tap here to ask the Coach — methods, rest days, timelines, anything restoration.'},
    {icon:'🎯',msg:'Your daily goal is a personal target. Change it any time by tapping the number.'},
    {icon:'🔄',msg:'Different methods target different tissue. Using several can help development.'},
    {icon:'🛌',msg:'Sore, raw, or irritated skin? Rest a day — recovery is part of the process.'},
    {icon:'📈',msg:'Check the Progress tab monthly to compare progress photos side by side.'},
    {icon:'⏳',msg:'Every minute logged is real time under tension. Small sessions add up.'},
  ];
  const day=new Date().getDate();
  return tips[day%tips.length];
}

// ── RENDER ─────────────────────────────────────────────────────────────────────
function render(){
  if(showProfileScreen){renderProfileScreen();return;}
  const ci=char.ciLevel||0;
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;
  const isPaused=!!activeTimer&&!activeTimer.startedAt;
  document.getElementById('root').innerHTML=`<div class="app">
    <div class="hdr">
      <div style="display:flex;align-items:center;gap:6px;flex:0 0 auto;min-width:0">
        <span id="v-tap" onclick="adminTap()"
          style="font-family:var(--font-display);font-size:10.5px;font-weight:700;color:var(--accent);letter-spacing:2px;cursor:default;user-select:none;line-height:1;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">RESTORETRACK</span>
        <div style="width:1px;height:20px;background:var(--stat-border);flex-shrink:0"></div>
        ${isRunning
          ? `<div class="ci-pill hdr-session-pill" onclick="tab='today';render()" style="cursor:pointer;flex-shrink:0" title="Go to session"><span class="hdr-session-dot"></span><span id="hdr-session-time">${fmtLiveCompact(timerSecs)}</span></div>`
          : isPaused
            ? `<div class="ci-pill hdr-session-pill hdr-session-pill--paused" onclick="tab='today';render()" style="cursor:pointer;flex-shrink:0" title="Session paused"><span style="font-size:10px;line-height:1">⏸</span><span id="hdr-session-time">${fmtLiveCompact(timerSecs)}</span></div>`
            : `<div class="ci-pill" onclick="tab='journey';render()" style="cursor:pointer;flex-shrink:0" title="Go to Progress">${LEVELS[ci].ci}</div>`
        }
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-shrink:1;min-width:0;justify-content:flex-end">
        <button class="profile-btn" id="pbtn"
          style="flex-shrink:1;min-width:80px;display:flex;align-items:center;gap:6px;padding:2px 10px 2px 3px;overflow:hidden">
          ${identityAvatar(char.name,26)}
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1;text-align:left">${char.name}</span>
          <span style="flex-shrink:0">▾</span>
        </button>
      </div>
    </div>
    <div class="content" id="content"></div>
    <div class="nav">${renderNav()}</div>
  </div>`;
    document.getElementById('pbtn').onclick=()=>{showProfileScreen=true;render();};
  document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});
  const c=document.getElementById('content');
  if(tab==='today')c.innerHTML=renderToday();
  else if(tab==='journey')c.innerHTML=renderJourney();
  else if(tab==='photos'){
    if(char.photoLockEnabled&&!_photosUnlocked){
      c.innerHTML=renderPhotoLockScreen();
      attachPhotoLockEvents();
    } else {
      c.innerHTML=renderPhotos();
    }
  }
  else if(tab==='community'){
    // commTab persists within a session (module-level state). It resets to
    // 'live' on cold start — the Live tab is the freshest signal in the app
    // and the right default whenever the user reopens it. Do NOT re-read
    // from localStorage here: that would overwrite the user's in-session
    // switch the moment they leave and return to the Community tab.
    setLastSeen(commTab);
    if(commTab==='posts')fetchPosts(true);
    if(commTab==='activity'&&!commState.activityLoaded)fetchCommunityActivity();
    // Restart users listener if it was stopped when we left
    if(commState.ready&&!commState.unsubUsers)startCommunityListeners();
    // Always refresh our own presence when entering the community tab
    if(commState.ready)syncPresence();
    c.innerHTML=renderCommunity();
    attachCommunityEvents();
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
  const makeBtn=t=>`<button class="nav-btn${tab===t.id?' active':''}" data-tab="${t.id}">
      <span class="nav-icon" style="position:relative;display:inline-flex;align-items:center;justify-content:center">${t.icon}${running&&t.id==='today'?`<span style="position:absolute;top:-2px;right:-4px;width:6px;height:6px;border-radius:50%;background:var(--green);border:1px solid var(--bg-nav)"></span>`:''}</span>${t.lbl}
    </button>`;
  const items=[
    {id:'today',    icon:IC.today(),    lbl:'Home'},
    {id:'journey',  icon:IC.progress(), lbl:'Progress'},
    {id:'photos',   icon:IC.photos(),   lbl:'Photos'},
    {id:'community',icon:IC.community(),lbl:'Community'},
  ];
  return items.map(makeBtn).join('');
}

// (Weekly summary functions removed — dead code. Weekly Recap now lives in Progress → Activity.)

// (buildNextMilestone removed — dead code, not referenced anywhere.)

// ── TODAY ──────────────────────────────────────────────────────────────────────
function toggleTodayOptions(){
  todayOptionsExpanded=!todayOptionsExpanded;
  const c=document.getElementById('content');
  if(c&&tab==='today'){c.innerHTML=renderToday();attachEvents();}
}
function toggleTodaySessions(){
  todaySessionsExpanded=!todaySessionsExpanded;
  const c=document.getElementById('content');
  if(c&&tab==='today'){c.innerHTML=renderToday();attachEvents();}
}
// Returns up to `limit` distinct methods, ordered by most-recent use.
// Recency beats total time-on-task deliberately: when a user adopts a new
// method, they shouldn't have to grind through months of old sessions
// before it earns a slot in Quick Start. `logs` is already stored newest-
// first (see awardSession / rebuildCharFromLogs), so a single forward pass
// picks the freshest occurrence of each method and stops early.
function getRecentMethods(limit=3){
  const seen=new Set();
  const out=[];
  for(const log of logs){
    if(!log.method||!log.cat)continue;
    if(seen.has(log.method))continue;
    seen.add(log.method);
    out.push({method:log.method,cat:log.cat});
    if(out.length>=limit)break;
  }
  return out;
}

function renderToday(){
  const td=today(),tMin=todayMin(),tGoalMin=todayGoalMin(),goal=char.dailyGoalMin||120;
  const isRestToday=(char.restDays||[]).includes(td);
  const retainingOn=char.countRetainingInGoal!==false;
  const goalPct=Math.min(100,Math.round((tGoalMin/goal)*100));
  const tSess=todayLogs();
  const isRunning=!!activeTimer&&!!activeTimer.startedAt;
  const isPaused=!!activeTimer&&!activeTimer.startedAt;
    const insight=todayInsight();
  const stripContent=insight||{icon:'💬',msg:'Need guidance? Ask the Coach anything.'};
  const insightStrip=`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;margin-bottom:9px;display:flex;gap:10px;align-items:center">
  <span style="font-size:16px;flex-shrink:0">${stripContent.icon}</span>
  <div style="flex:1;min-width:0;font-size:12px;color:var(--text2);line-height:1.5">${stripContent.msg}</div>
  <button onclick="showCoachSheet()" style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--accent);font-weight:600;cursor:pointer;font-family:var(--font-body);flex-shrink:0;white-space:nowrap">Ask Coach</button>
</div>`;
  const timerBlock=isRunning?`<div class="card sess-active-card" style="border-color:var(--green-border);background:var(--green-bg);margin-bottom:9px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <div class="live-dot sess-live-dot"></div>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--green)">Session Active</div>
      <div style="font-size:10px;color:var(--text4);margin-top:1px">${activeTimer.method}</div>
      <div style="font-size:9px;color:var(--text5);margin-top:2px">${fmtWallStart(activeTimer.wallStart)}</div></div>
      <div style="font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--green)" id="mc-run-time-3">${fmtLive(timerSecs)}</div>
    </div>
    <div style="display:flex;gap:7px">
      <button id="pause-btn" class="btn-outline" style="margin:0;padding:10px;font-size:13px;flex:1;display:flex;align-items:center;justify-content:center;gap:5px">${IC.pause(14)} Pause</button>
      <button id="stop-btn" style="margin:0;padding:10px;font-size:13px;flex:1;background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);border-radius:10px;color:#c0504d;font-weight:600;cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;justify-content:center;gap:5px">${IC.stop(14)} Stop</button>
    </div>
    <button id="adjust-time-btn" class="btn-ghost" style="width:100%;margin-top:7px;padding:9px;font-size:12px">⏱ Adjust Time</button>
  </div>`:isPaused?`<div class="card sess-paused-card" style="border-color:var(--acc30);margin-bottom:9px">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="color:var(--accent);display:inline-flex;align-items:center">${IC.pause(14)}</span>
      <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--accent)">Session Paused</div>
      <div style="font-size:10px;color:var(--text4);margin-top:1px">${activeTimer.method} · ${fmtLive(timerSecs)}</div></div>
    </div>
    <div style="display:flex;gap:7px">
      <button id="resume-btn" class="btn-green" style="margin:0;padding:10px;font-size:13px;flex:1;display:flex;align-items:center;justify-content:center;gap:5px">${IC.play(14)} Resume</button>
      <button id="stop-btn" style="margin:0;padding:10px;font-size:13px;flex:1;background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);border-radius:10px;color:#c0504d;font-weight:600;cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;justify-content:center;gap:5px">${IC.stop(14)} Stop</button>
    </div>
    <button id="adjust-time-btn" class="btn-ghost" style="width:100%;margin-top:7px;padding:9px;font-size:12px">⏱ Adjust Time</button>
  </div>`:'';

  const buildSessRow=(l,{clickable=false}={})=>{
    const cat=catFor(l.cat);
    const cursor=clickable?'cursor:pointer;':'';
    const onClick=clickable?`onclick="toggleTodaySessions()"`:'';
    const chevron=clickable?`<div style="font-size:13px;color:var(--text4);align-self:center;flex-shrink:0;transition:transform .2s;transform:rotate(${todaySessionsExpanded?'180':'0'}deg)">▾</div>`:'';
    return`<div ${onClick} style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;padding:10px;margin-bottom:7px;${cursor}">
      <div style="width:34px;height:34px;border-radius:8px;background:${cat.color}18;border:1px solid ${cat.color}33;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">${cat.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.method}</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">${fmtMin(l.dur)}${l.notes?' · '+l.notes.slice(0,45):''}</div>
      </div>
      <div style="display:flex;gap:4px;margin-top:2px;flex-shrink:0">
        <button class="edit-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.edit(12)}</button>
        <button class="del-btn" data-id="${l.id}" style="display:flex;align-items:center">${IC.x(13)}</button>
      </div>
      ${chevron}
    </div>`;
  };

  const firstSess=tSess[0];
  const restSess=tSess.slice(1);
  const hasMore=restSess.length>0;
  const sessHtml=firstSess
    ?buildSessRow(firstSess,{clickable:hasMore})
      +(hasMore&&todaySessionsExpanded?restSess.map(l=>buildSessRow(l)).join(''):'')
    :'';

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
  // Quick Start mirrors what you've done lately — not lifetime totals.
  // Switching methods should surface the new one immediately, not after
  // months of accumulated time.
  const quickMethods=getRecentMethods(3);
  const quickLogBtn=quickMethods.length&&!activeTimer?`
    <div style="display:grid;grid-template-columns:repeat(${Math.min(quickMethods.length,3)},minmax(0,1fr));gap:6px;margin-bottom:7px">
      ${quickMethods.slice(0,3).map(entry=>`<button class="quick-start-btn" data-method="${htmlEsc(entry.method)}" data-cat="${htmlEsc(entry.cat)}" style="background:var(--bg-card);border:1px solid var(--acc30);border-radius:10px;padding:9px 8px;display:flex;align-items:center;gap:6px;cursor:pointer;text-align:left;transition:border-color .2s;min-width:0">
        <span style="font-size:15px;flex-shrink:0">${catFor(entry.cat).icon}</span>
        <div style="flex:1;min-width:0;overflow:hidden">
          <div style="font-size:11px;color:var(--text2);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${htmlEsc(entry.method)}</div>
        </div>
      </button>`).join('')}
    </div>`:'';
  return`
  ${insightStrip}
  <div class="card" style="margin-bottom:9px;position:relative;overflow:hidden">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px;min-width:0">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4);white-space:nowrap">Today's Goal</span>
        ${goalPct>=100?`<span style="font-size:9px;color:var(--green);background:var(--green-bg);border:1px solid var(--green-border);border-radius:10px;padding:2px 8px;font-weight:700;letter-spacing:.3px;white-space:nowrap">✓ MET</span>`:''}
      </div>
      <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
        <input class="goal-inp" id="goal-inp" type="number" min="5" max="1440" value="${goal}" style="width:54px">
        <span style="font-size:10px;color:var(--text5)">min</span>
      </div>
    </div>
    <div class="goal-bar" style="height:14px;border-radius:7px;overflow:hidden;position:relative">
      <div class="goal-fill ${goalPct>=100?'goal-fill-ok':'goal-fill-warn'}" style="width:${goalPct}%;height:100%;border-radius:7px;position:relative;overflow:hidden;transition:width .9s cubic-bezier(.22,.9,.3,1);${goalPct>=100?'animation:goalCelebrate 3s ease-in-out infinite':''}">
        <div class="goal-shimmer" style="position:absolute;top:0;left:0;width:70%;height:100%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.35) 50%,transparent 100%);animation:goalShimmer 3.2s ease-in-out infinite;pointer-events:none"></div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:9px">
      <span style="display:flex;align-items:baseline;gap:4px">
        <span data-live="goal-done" style="font-size:13px;font-weight:600;color:var(--text1);font-variant-numeric:tabular-nums">${fmtMin(tGoalMin)}</span>
        <span style="font-size:10px;color:var(--text4)">done</span>
      </span>
      <span data-live="goal-text" style="font-size:10px;color:${goalPct>=100?'var(--green)':'var(--text4)'};font-weight:${goalPct>=100?'600':'400'}">${goalPct>=100?'🎯 Goal reached!':fmtMin(Math.max(0,goal-tGoalMin))+' to go'}</span>
    </div>
  </div>
  ${timerBlock}
  ${quickLogBtn}
  ${!activeTimer?`<button id="start-session-btn" class="btn-gold" style="margin-bottom:7px">${IC.plus(14)} Start Session</button>`:''}
  ${(char.sessions>=1&&!isStandalone()&&!localStorage.getItem('rst-install-hint-seen'))?`<div style="background:var(--acc6);border:1px solid var(--acc30);border-radius:10px;padding:11px 12px;margin-bottom:7px;display:flex;gap:10px;align-items:center">
    <span style="font-size:17px;flex-shrink:0">📱</span>
    <div style="flex:1;min-width:0;font-size:11px;color:var(--text3);line-height:1.5">Install RestoreTrack to your Home Screen for the full app experience.</div>
    <button onclick="localStorage.setItem('rst-install-hint-seen','1');mountInstallSheet()" style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--accent);font-weight:600;cursor:pointer;font-family:var(--font-body);flex-shrink:0;white-space:nowrap">Show me</button>
    <button onclick="localStorage.setItem('rst-install-hint-seen','1');render()" title="Dismiss" style="background:none;border:none;color:var(--text5);font-size:14px;cursor:pointer;font-family:var(--font-body);padding:0 2px;line-height:1;flex-shrink:0">✕</button>
  </div>`:''}
  ${lastSessHtml}
  ${tSess.length?`
  <div class="sec-title" style="display:flex;align-items:center;justify-content:space-between">
    <span>Today's Sessions</span>
    <span style="font-size:9px;color:var(--text5);font-weight:400;text-transform:none;letter-spacing:0">${tSess.length} logged${tMin>0?' · '+fmtMin(tMin):''}</span>
  </div>
  ${sessHtml}`:''}
  <div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:12px;overflow:hidden;margin-top:18px;margin-bottom:12px">
    <button onclick="toggleTodayOptions()" style="width:100%;display:flex;align-items:center;gap:10px;padding:11px 12px;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)">
      <span style="font-size:14px;flex-shrink:0">⚙</span>
      <div style="flex:1;min-width:0;font-size:12px;font-weight:600;color:var(--text2)">Session Options</div>
      ${isRestToday?`<span style="font-size:9px;color:var(--accent);background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:2px 7px;flex-shrink:0;font-weight:600">🛌 Rest day</span>`:''}
      ${!retainingOn?`<span style="font-size:9px;color:#c0392b;background:rgba(192,57,43,.1);border:1px solid rgba(192,57,43,.3);border-radius:10px;padding:2px 7px;flex-shrink:0;font-weight:600">🔒 Retaining off</span>`:''}
      <span style="font-size:11px;color:var(--text5);flex-shrink:0;transform:rotate(${todayOptionsExpanded?'180':'0'}deg);transition:transform .2s">▾</span>
    </button>
    ${todayOptionsExpanded?`<div style="padding:0 12px 12px;border-top:1px solid var(--stat-border)">
      ${!activeTimer?`<button id="log-past-btn" class="btn-ghost" style="width:100%;margin:12px 0 4px;padding:9px;font-size:12px;display:flex;align-items:center;justify-content:center;gap:5px">${IC.edit(13)} Log a Past Session</button>`:''}
      <div onclick="markRestDay()" style="display:flex;align-items:center;gap:10px;padding:11px 0;cursor:pointer;border-top:1px solid var(--stat-border)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center">🛌</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1)">Rest Day</div>
          <div style="font-size:10px;color:var(--text4);margin-top:1px">${isRestToday?'Today marked as rest — streak protected':'Mark today as rest to protect your streak'}</div>
        </div>
        <div style="position:relative;width:38px;height:22px;flex-shrink:0">
          <div style="width:38px;height:22px;border-radius:11px;background:${isRestToday?'#22a85a':'var(--bg-stat)'};transition:background .25s;border:1px solid ${isRestToday?'rgba(34,168,90,.6)':'var(--stat-border)'}"></div>
          <div style="position:absolute;top:2px;left:${isRestToday?'18':'2'}px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:left .25s"></div>
        </div>
      </div>
      <div onclick="char.countRetainingInGoal=!char.countRetainingInGoal;saveChar();render()" style="display:flex;align-items:center;gap:10px;padding:11px 0;cursor:pointer;border-top:1px solid var(--stat-border)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center">🔒</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1)">Retaining counts toward goal</div>
          <div style="font-size:10px;color:var(--text4);margin-top:1px">${retainingOn?'Included in daily goal progress':'Excluded from daily goal progress'}</div>
        </div>
        <div style="position:relative;width:38px;height:22px;flex-shrink:0">
          <div style="width:38px;height:22px;border-radius:11px;background:${retainingOn?'#22a85a':'#c0392b'};transition:background .25s;border:1px solid ${retainingOn?'rgba(34,168,90,.6)':'rgba(192,57,43,.6)'}"></div>
          <div style="position:absolute;top:2px;left:${retainingOn?'18':'2'}px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:left .25s"></div>
        </div>
      </div>
    </div>`:''}
  </div>`;
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

function editTimelineNode(histIdx){
  const entry=(char.ciHistory||[])[histIdx];
  if(!entry)return;
  const ex=document.getElementById('timeline-edit-ov');if(ex)ex.remove();
  window._tlEditCI=entry.ci;
  const ciGrid=Array.from({length:10},(_,i)=>i+1).map(v=>{
    const isSel=v===entry.ci;
    return`<button onclick="window._tlEditCI=${v};document.querySelectorAll('#timeline-edit-ov .tlci-btn').forEach(b=>{const s=+b.dataset.v===${v};b.style.background=s?'var(--accent)':'var(--bg-stat)';b.style.borderColor=s?'var(--accent)':'var(--stat-border)';b.style.color=s?'var(--bg)':'var(--text3)';})"
      class="tlci-btn" data-v="${v}"
      style="padding:9px 2px;border-radius:8px;font-family:var(--font-display);font-size:11px;font-weight:700;cursor:pointer;text-align:center;background:${isSel?'var(--accent)':'var(--bg-stat)'};border:1px solid ${isSel?'var(--accent)':'var(--stat-border)'};color:${isSel?'var(--bg)':'var(--text3)'}">${v}</button>`;
  }).join('');
  const el=document.createElement('div');el.className='overlay';el.id='timeline-edit-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:5px">Edit Milestone</div>
    <div style="font-size:11px;color:var(--text3);line-height:1.7;margin-bottom:14px">Correct the CI level or date for this recorded milestone.</div>
    <div class="sec-title">CI Level Reached</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:16px">${ciGrid}</div>
    <div class="sec-title">Date Reached</div>
    <input type="date" id="tl-date-inp" value="${entry.date}" max="${today()}"
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 14px;color:var(--accent);font-size:15px;font-weight:700;width:100%;outline:none;font-family:var(--font-body);margin-bottom:16px">
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" onclick="document.getElementById('timeline-edit-ov').remove()" style="flex:0 0 76px">Cancel</button>
      <button onclick="confirmDialog('Delete milestone?','This entry will be removed from your CI history. This cannot be undone.','Delete',()=>{deleteTimelineNode(${histIdx})})"
        style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:11px 14px;font-size:13px;color:#a03232;cursor:pointer;font-family:var(--font-body)">🗑</button>
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
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:6px">Edit Start Date</div>
    <div style="font-size:11px;color:var(--text3);line-height:1.7;margin-bottom:14px">
      The date you began your restoration journey — used as the anchor for your entire CI timeline.
    </div>
    <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Start Date</div>
    <input type="date" id="sd-inp" value="${char.startDate||today()}" max="${today()}"
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 14px;color:var(--accent);font-size:15px;font-weight:700;width:100%;outline:none;font-family:var(--font-body);margin-bottom:16px">
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
// Builds the info strip HTML for the currently-selected milestone.
// Reads _gaugeChain (cached by renderMasterGauge) so it can be called from
// either the initial render or the toggle handler.
function buildMilestoneStrip(){
  if(_activeMilestoneIdx===null||!_gaugeChain||!_gaugeChain[_activeMilestoneIdx])return'';
  const m=_gaugeChain[_activeMilestoneIdx];
  const dateStr=m.date?new Date(m.date+'T12:00:00').toLocaleDateString('en',{weekday:'short',month:'long',day:'numeric',year:'numeric'}):'Unknown date';
  const nodeLabel=m.isStart&&_activeMilestoneIdx===0?'Journey Started':m.isCurrent?'Current Level':'Level Reached';
  const canEdit=(m.histIdx>=0)||!!m.isStart;
  const editFn=m.isStart?`editStartDate()`:`editTimelineNode(${m.histIdx})`;
  return`
      <div style="margin:12px 0 0;display:flex;align-items:center;gap:10px;background:var(--acc6);border:1px solid var(--acc30);border-radius:10px;padding:10px 14px;animation:fadeSlideUp .2s ease">
        <div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--accent);flex-shrink:0">CI-${m.ci}</div>
        <div style="width:1px;height:28px;background:var(--acc30);flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">${nodeLabel}</div>
          <div style="font-size:11px;color:var(--text2);font-weight:600">${dateStr}</div>
        </div>
        ${canEdit?`<button onclick="${editFn}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;padding:5px 10px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body);flex-shrink:0">✎ Edit</button>`:''}
        <button onclick="toggleMilestoneTooltip(${_activeMilestoneIdx})" style="background:none;border:none;font-size:16px;color:var(--text4);cursor:pointer;flex-shrink:0;line-height:1;padding:0 2px">×</button>
      </div>`;
}

function toggleMilestoneTooltip(idx){
  _activeMilestoneIdx=_activeMilestoneIdx===idx?null:idx;
  // Update only the strip container — no full-tab re-render, no SVG flash.
  const wrap=document.getElementById('milestone-strip-wrap');
  if(wrap)wrap.innerHTML=buildMilestoneStrip();
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
  _gaugeChain=chain;

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
        `<circle cx="${p.x}" cy="${p.y}" r="${dotR+5}" fill="transparent"/>`+
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
    `<text x="${CX}" y="${CY-16}" text-anchor="middle" font-family="Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="60" font-weight="900" fill="var(--accent)" style="filter:drop-shadow(0 0 20px var(--acc18))">${ci}</text>`+
    `<text x="${CX}" y="${CY+14}" text-anchor="middle" font-family="Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="13" font-weight="700" fill="var(--text3)">${LEVELS[ci].ci}</text>`+
    `<text x="${CX}" y="${CY+33}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="11" font-weight="600" fill="${isGoalReached?'var(--green)':'var(--text4)'}">${isGoalReached?'Goal Reached ✓':goalPct+'% to Goal'}</text>`;

  // ── Arc-end labels ──
  const sPos=angleXY(ciToAngle(startCI));
  const startDateFmt=startDate?new Date(startDate+'T12:00:00').toLocaleDateString('en',{month:'short',year:'numeric'}):'';
  const edgeSVG=
    `<text x="${sPos.x}" y="${(+sPos.y+20).toFixed(1)}" text-anchor="middle" font-family="Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="9" font-weight="700" fill="var(--text4)">CI-${startCI}</text>`+
    `<text x="${sPos.x}" y="${(+sPos.y+31).toFixed(1)}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="7.5" fill="var(--text5)">${startDateFmt}</text>`+
    `<text x="${gPos.x}" y="${(+gPos.y+20).toFixed(1)}" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" font-size="8" fill="${isGoalReached?'var(--green)':'var(--text5)'}">Goal CI-${ciGoal}</text>`;

  // ── Active milestone info strip — rendered into a stable container so the
  // toggle can update it in place without rebuilding the whole tab.
  const infoStrip=`<div id="milestone-strip-wrap">${buildMilestoneStrip()}</div>`;

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

function renderOverviewBody(){
  const ci=char.ciLevel||0;
  if(expandedCIRef.size===0)expandedCIRef.add(ci);
  const isOnboarding=!(char.ciHistory||[]).length&&char.sessions===0&&ci===0&&!char.ciSetupDone;

  const currentLevel=LEVELS[ci];
  const canonicalForCI=photos.find(p=>p.canonical&&p.ci===currentLevel.ci);
  const canonicalInline=canonicalForCI?`
    <div onclick="openPhotoViewer(photos.find(x=>x.id===${canonicalForCI.id}),null)" style="display:flex;gap:10px;align-items:center;margin-top:14px;padding:10px;background:var(--acc6);border:1px solid var(--acc18);border-radius:10px;cursor:pointer">
      <div style="width:52px;height:52px;border-radius:8px;overflow:hidden;border:1px solid var(--acc30);flex-shrink:0">
        <img src="${canonicalForCI.url}" style="width:100%;height:100%;object-fit:cover" alt="${canonicalForCI.ci}">
      </div>
      <div style="flex:1;min-width:0;text-align:left">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--accent);margin-bottom:3px">Your ${currentLevel.ci} Photo</div>
        <div style="font-size:11px;color:var(--text4)">${fmtDate(canonicalForCI.date)}</div>
      </div>
      <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
    </div>`:'';

  const heroCard=isOnboarding
    ?`<div class="card card-gold" style="padding:32px 20px 28px;text-align:center;margin-bottom:10px">
        <div style="font-size:52px;margin-bottom:16px;opacity:.45">◉</div>
        <div style="font-family:var(--font-display);font-size:17px;color:var(--accent);margin-bottom:10px;letter-spacing:1px">Begin Your Journey</div>
        <div style="font-size:12px;color:var(--text3);line-height:1.9;margin-bottom:20px">Set your starting and goal CI levels to<br>activate your personal progress gauge.</div>
        <button class="ci-set-btn" id="update-ci-btn" style="font-size:13px;padding:10px 28px">Set Your CI Levels</button>
      </div>`
    :`<div class="card card-gold" style="padding:20px 14px 18px;margin-bottom:10px">
        ${renderMasterGauge()}
        ${canonicalInline}
        <div style="text-align:center;margin-top:16px">
          <button class="ci-set-btn" id="update-ci-btn" style="font-size:12px;padding:7px 22px">✎ Update CI Level</button>
        </div>
      </div>`;

  // Cumulative line removed — its content was already present in the
  // gauge's stats cluster (hours) and lives properly in Activity (sessions)
  // and Home (streak when relevant). No unique information was lost.

  const refGuide=LEVELS.map((l,i)=>{
    const isActive=i===ci;
    const isExpanded=expandedCIRef.has(i);
    return`<div style="border-bottom:1px solid var(--stat-border);${i===LEVELS.length-1?'border-bottom:none':''}">
      <button onclick="toggleCIRef(${i})" style="width:100%;display:flex;align-items:center;gap:8px;padding:9px 0;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)">
        <div style="font-family:var(--font-display);font-size:11px;font-weight:700;color:${isActive?'var(--accent)':'var(--text4)'};width:36px;flex-shrink:0">${l.ci}</div>
        <div style="flex:1;font-size:11px;color:${isActive?'var(--text2)':'var(--text4)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${i===0?'Starting point — no loose skin present':l.soft?l.soft.slice(0,50)+(l.soft.length>50?'…':''):''}
        </div>
        ${isActive?`<span style="font-size:9px;background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:2px 7px;color:var(--accent);flex-shrink:0">YOU</span>`:''}
        <span style="font-size:11px;color:var(--text5);flex-shrink:0;display:inline-block;transform:rotate(${isExpanded?'180':'0'}deg);transition:transform .2s">▾</span>
      </button>
      ${isExpanded?`<div style="padding:0 0 10px 44px"><div style="font-size:11px;color:var(--text2);line-height:1.7">${ciDesc(l)}</div></div>`:''}
    </div>`;
  }).join('');

  const badgesEarned=char.achievements.length;
  const badgesTotal=ACHS.length;
  const badgesStrip=`<div class="card" style="margin-bottom:9px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="setProgressTab('badges')">
    <div style="font-size:24px;flex-shrink:0">🏅</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:12px;font-weight:600;color:var(--text1)">${badgesEarned} of ${badgesTotal} badges earned</div>
      <div style="font-size:10px;color:var(--text4);margin-top:2px">${badgesEarned===badgesTotal?'All badges unlocked 🎉':'Tap to see your achievements'}</div>
    </div>
    <span style="font-size:16px;color:var(--text4);flex-shrink:0">›</span>
  </div>`;

  return`<div class="journey-tab">
    ${heroCard}
    <div class="sec-title">CI Reference</div>
    <div class="card" style="padding:4px 12px">${refGuide}</div>
    ${badgesStrip}
  </div>`;
}

function renderJourney(){
  const subTab=_progressTab||'overview';
  const subTabBar=`<div style="display:flex;gap:4px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
    ${[['overview','Overview'],['activity','Activity'],['badges','Badges']].map(([id,label])=>`
      <button onclick="setProgressTab('${id}')" style="flex:1;padding:8px 4px;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;font-family:var(--font-body);transition:all .15s;
        background:${subTab===id?'var(--bg-card)':'transparent'};
        color:${subTab===id?'var(--accent)':'var(--text4)'};
        box-shadow:${subTab===id?'0 1px 4px rgba(0,0,0,.2)':'none'}">${label}</button>`).join('')}
  </div>`;
  if(subTab==='activity')return subTabBar+renderActivityBody();
  if(subTab==='badges')return subTabBar+renderBadgesBody();
  return subTabBar+renderOverviewBody();
}
function setProgressTab(t){
  if(_progressTab===t)return;
  _progressTab=t;
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}
function toggleCIRef(i){
  if(expandedCIRef.has(i))expandedCIRef.delete(i);
  else expandedCIRef.add(i);
  const c=document.getElementById('content');
  if(c&&tab==='journey'){c.innerHTML=renderJourney();attachEvents();}
}
// ── PHOTOS ─────────────────────────────────────────────────────────────────────
let compareA=null,compareB=null;
let _compareMode='side'; // 'side' | 'wipe' — persists for the session
let _wipePos=50; // wipe slider position (0-100)

function setPhotoView(m){
  if(_photoViewMode===m)return;
  _photoViewMode=m;
  _photoSelectMode=false;
  _photoSelectedIds=new Set();
  const c=document.getElementById('content');
  if(c&&tab==='photos'){c.innerHTML=renderPhotos();attachEvents();}
}
function renderCIFilmstrip(){
  const groups={};
  photos.forEach(p=>{
    const ci=p.ci||'CI-0';
    if(!groups[ci])groups[ci]=[];
    groups[ci].push(p);
  });
  Object.values(groups).forEach(arr=>arr.sort((a,b)=>b.date.localeCompare(a.date)));
  const currentIdx=char.ciLevel||0;
  return LEVELS.map((level,i)=>{
    const group=groups[level.ci]||[];
    const isCurrent=i===currentIdx;
    if(!group.length&&!isCurrent)return '';
    const ids=group.map(p=>p.id);
    const eraArg=`[${ids.join(',')}].map(id=>photos.find(x=>x.id===id)).filter(Boolean)`;
    return`<div style="background:var(--bg-card);border:1px solid ${isCurrent?'var(--acc30)':'var(--stat-border)'};border-radius:12px;padding:12px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:${group.length?'10':'0'}px">
        <div style="font-family:var(--font-display);font-size:13px;font-weight:700;color:${isCurrent?'var(--accent)':'var(--text2)'};min-width:44px">${level.ci}</div>
        ${isCurrent?`<span style="font-size:9px;background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:2px 7px;color:var(--accent);font-weight:600">YOU</span>`:''}
        <div style="flex:1;font-size:10px;color:var(--text5);text-align:right">${group.length?group.length+' photo'+(group.length!==1?'s':''):'—'}</div>
      </div>
      ${group.length?`<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;scrollbar-width:none">
        ${group.map(p=>{
          const isCanonical=!!p.canonical;
          return`<div style="flex:0 0 80px;position:relative">
            <div onclick="openPhotoViewer(photos.find(x=>x.id===${p.id}),${eraArg})" style="width:80px;height:80px;border-radius:8px;overflow:hidden;border:1.5px solid ${isCanonical?'var(--accent)':'var(--stat-border)'};cursor:pointer">
              <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
            </div>
            ${isCanonical?`<div style="position:absolute;top:-3px;right:-3px;background:var(--accent);border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--bg);border:2px solid var(--bg-card)">★</div>`:''}
            <div style="font-size:9px;color:var(--text5);text-align:center;margin-top:3px">${fmtDate(p.date)}</div>
          </div>`;
        }).join('')}
      </div>`:`<div style="font-size:10px;color:var(--text5);font-style:italic;padding:4px 0">No photos at this level yet</div>`}
    </div>`;
  }).filter(Boolean).join('');
}
function toggleCanonicalPhoto(id){
  const photo=photos.find(p=>p.id===id);
  if(!photo)return;
  const ci=photo.ci;
  const isOn=!!photo.canonical;
  photos=photos.map(p=>{
    if(p.id===id)return{...p,canonical:!isOn};
    if(!isOn&&p.canonical&&p.ci===ci)return{...p,canonical:false};
    return p;
  });
  savePhotos();
  showToast(isOn?'Removed':'★ Set as '+ci+' representative');
  const viewer=document.getElementById('photo-view');
  if(viewer){viewer.remove();openPhotoViewer(photos.find(x=>x.id===id),null);return;}
  render();
}
function renderPhotos(){
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  const months=groupPhotosByMonth(sorted);
  const totalKB=photosTotalKB(photos);
  const fmtKB=kb=>kb>=1024?`${(kb/1024).toFixed(1)} MB`:`${kb} KB`;
  const privacy=photoPrivacyMessage();

  const pinned=sorted.filter(p=>p.pinned);

  // ── Toolbar row (count · size · Manage as a quiet text link) ──
  const topBar=photos.length?`<div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px;padding:0 2px">
    <div style="font-size:11px;color:var(--text4)">${photos.length} photo${photos.length!==1?'s':''} · ${fmtKB(totalKB)}</div>
    <button onclick="mountStorageSheet()" style="background:none;border:none;padding:0;font-size:11px;color:var(--accent);cursor:pointer;font-family:var(--font-body);text-decoration:underline;text-underline-offset:3px;flex-shrink:0">Manage</button>
  </div>`:'';

  // ── Privacy disclaimer (dynamic) ──
  const disclaimer=`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;margin-bottom:10px;font-size:11px;color:var(--text4);line-height:1.7">
    ${privacy.icon} <strong style="color:var(--text3)">${privacy.strong}</strong> ${privacy.rest}
  </div>`;

  // ── Pinned strip ──
  const pinnedHtml=pinned.length?`
    <div class="sec-title" style="display:flex;align-items:center;justify-content:space-between">
      <span>⭐ Pinned</span>
      <span style="font-size:9px;color:var(--text5);font-weight:400;text-transform:none;letter-spacing:0">${pinned.length}</span>
    </div>
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:14px;-webkit-overflow-scrolling:touch;scrollbar-width:none">
      ${pinned.map(p=>`
        <div style="flex:0 0 100px;position:relative">
          <div data-photo-id="${p.id}" onclick="openPhotoViewer(photos.find(x=>x.id===${p.id}),null)" style="width:100px;height:100px;border-radius:10px;overflow:hidden;border:1.5px solid var(--acc30);cursor:pointer">
            <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
          </div>
          <div style="font-size:9px;color:var(--text4);text-align:center;margin-top:4px;line-height:1.3">
            <span style="font-family:var(--font-display);color:var(--accent);font-weight:700">${p.ci}</span>
            <span style="display:block;color:var(--text5)">${fmtDate(p.date)}</span>
          </div>
        </div>`).join('')}
    </div>`:'';

  // ── Month sections ──
  const monthSections=months.map(m=>{
    // Photos within this month are already sorted newest-first (see
    // groupPhotosByMonth). Passing the whole month as the viewer's era lets
    // the user swipe between photos of the same month — the viewer's swipe
    // direction matches the gallery's ordering.
    const monthEraArg=`[${m.photos.map(p=>p.id).join(',')}].map(id=>photos.find(x=>x.id===id)).filter(Boolean)`;
    const hero=m.photos[0];
    const rest=m.photos.slice(1);
    const heroId=hero.id;
    const isSelected=id=>_photoSelectMode&&_photoSelectedIds.has(id);
    const rowThumb=(p)=>{const sel=isSelected(p.id);return`
      <div data-photo-id="${p.id}" style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1.5px solid ${sel?'var(--accent)':'var(--stat-border)'};cursor:pointer"
        onclick="${_photoSelectMode?`togglePhotoSelect(${p.id})`:`openPhotoViewer(photos.find(x=>x.id===${p.id}),${monthEraArg})`}">
        <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
        ${_photoSelectMode?`<div style="position:absolute;top:5px;right:5px;width:18px;height:18px;border-radius:50%;border:2px solid ${sel?'var(--accent)':'rgba(255,255,255,.85)'};background:${sel?'var(--accent)':'rgba(0,0,0,.25)'};display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--bg);font-weight:700">${sel?'✓':''}</div>`:''}
      </div>`;};
    const heroSel=isSelected(heroId);
    return`<div style="margin-bottom:16px">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">${m.label}</div>
        <div style="font-size:10px;color:var(--text4)">${m.photos.length} photo${m.photos.length!==1?'s':''} · ${fmtKB(m.totalKB)}</div>
      </div>
      <div data-photo-id="${heroId}" style="position:relative;aspect-ratio:1.2;border-radius:12px;overflow:hidden;border:1.5px solid ${heroSel?'var(--accent)':'var(--stat-border)'};margin-bottom:8px;cursor:pointer"
        onclick="${_photoSelectMode?`togglePhotoSelect(${heroId})`:`openPhotoViewer(photos.find(x=>x.id===${heroId}),${monthEraArg})`}">
        <img src="${hero.url}" style="width:100%;height:100%;object-fit:cover" alt="${hero.ci}">
        <div style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,.6);border-radius:20px;padding:3px 9px;font-family:var(--font-display);font-size:11px;font-weight:700;color:var(--accent);backdrop-filter:blur(6px)">${hero.ci}</div>
        ${hero.pinned?`<div style="position:absolute;top:8px;right:8px;font-size:16px">⭐</div>`:''}
        ${_photoSelectMode?`<div style="position:absolute;bottom:8px;right:8px;width:22px;height:22px;border-radius:50%;border:2px solid ${heroSel?'var(--accent)':'rgba(255,255,255,.85)'};background:${heroSel?'var(--accent)':'rgba(0,0,0,.25)'};display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--bg);font-weight:700">${heroSel?'✓':''}</div>`:''}
        <div style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,.6);border-radius:20px;padding:3px 9px;font-size:10px;color:rgba(255,255,255,.85);backdrop-filter:blur(6px)">${fmtDate(hero.date)}</div>
      </div>
      ${rest.length?`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${rest.map(rowThumb).join('')}</div>`:''}
    </div>`;
  }).join('');

  // ── Select-mode action bar ──
  const selectBar=_photoSelectMode?`
    <div style="position:fixed;left:50%;transform:translateX(-50%);bottom:90px;background:var(--bg-sheet);border:1px solid var(--card-border);border-radius:14px;padding:10px 14px;box-shadow:0 8px 28px rgba(0,0,0,.55);display:flex;align-items:center;gap:10px;z-index:20;min-width:240px;max-width:calc(100% - 24px)">
      <div style="flex:1;font-size:12px;color:var(--text2);font-weight:600">${_photoSelectedIds.size} selected</div>
      <button onclick="exitPhotoSelect()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:7px 12px;font-size:12px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">Cancel</button>
      <button onclick="bulkDeleteSelectedPhotos()" ${_photoSelectedIds.size?'':'disabled'} style="background:rgba(200,50,50,.08);border:1px solid rgba(200,50,50,.3);border-radius:8px;padding:7px 12px;font-size:12px;color:#c0392b;cursor:${_photoSelectedIds.size?'pointer':'default'};font-family:var(--font-body);opacity:${_photoSelectedIds.size?1:.4}">Delete</button>
    </div>`:'';

  // ── Empty state ──
  if(!photos.length){
    return`${disclaimer}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <button class="btn-gold" id="open-photo-guide-btn">📷 Take Photo</button>
      <button class="btn-ghost" id="open-photo-library-btn" style="font-size:13px">🖼 Choose Existing</button>
    </div>
    <input type="file" id="photo-file" accept="image/*" capture="environment" style="display:none">
    <input type="file" id="photo-file-library" accept="image/*" multiple style="display:none">
    <div style="text-align:center;padding:40px 20px;color:var(--text5);font-size:12px;line-height:1.85">
      <div style="font-size:44px;margin-bottom:14px;opacity:.4">📸</div>
      <div style="font-size:14px;color:var(--text3);font-weight:600;margin-bottom:6px">No photos yet</div>
      <div>Take a baseline photo today — you'll be<br>glad you have it months from now.</div>
    </div>`;
  }

  // Nudge (if it triggers) lives as a quiet subline in the Timeline header
  // instead of a dedicated card. Same signal, no card-height cost.
  const nudgeDays=photos.length?Math.round((Date.now()-new Date(sorted[0].date+'T12:00:00'))/86400000):-1;

  const compareBtn=photos.length>=2
    ?`<button class="btn-ghost" id="open-compare-btn" style="width:100%;margin-bottom:8px;font-size:12px">⟷ Compare Two Photos</button>`
    :'';

  const viewToggle=`<div style="display:flex;gap:4px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
    <button onclick="setPhotoView('month')" style="flex:1;padding:8px 4px;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;font-family:var(--font-body);transition:all .15s;
      background:${_photoViewMode==='month'?'var(--bg-card)':'transparent'};
      color:${_photoViewMode==='month'?'var(--accent)':'var(--text4)'};
      box-shadow:${_photoViewMode==='month'?'0 1px 4px rgba(0,0,0,.2)':'none'}">By Month</button>
    <button onclick="setPhotoView('ci')" style="flex:1;padding:8px 4px;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;font-family:var(--font-body);transition:all .15s;
      background:${_photoViewMode==='ci'?'var(--bg-card)':'transparent'};
      color:${_photoViewMode==='ci'?'var(--accent)':'var(--text4)'};
      box-shadow:${_photoViewMode==='ci'?'0 1px 4px rgba(0,0,0,.2)':'none'}">By CI Level</button>
  </div>`;

  // The Timeline subline is one thing at a time. Priority: the nudge (if it
  // triggers — it's time-sensitive), then select-mode instruction, then the
  // long-press hint as the calm default.
  const timelineSubline=nudgeDays>=30
    ? `<span style="font-size:9px;color:var(--accent);font-weight:600;text-transform:none;letter-spacing:0">Last photo ${nudgeDays}d ago</span>`
    : _photoSelectMode
      ? `<span style="font-size:9px;color:var(--accent);font-weight:600;text-transform:none;letter-spacing:0">Tap photos to select</span>`
      : `<span style="font-size:9px;color:var(--text5);font-weight:400;text-transform:none;letter-spacing:0">Long-press a photo to select multiple</span>`;
  const timelineSection=_photoViewMode==='ci'
    ?`<div class="sec-title" style="display:flex;align-items:center;justify-content:space-between">
        <span>Filmstrip</span>
        <span style="font-size:9px;color:var(--text5);font-weight:400;text-transform:none;letter-spacing:0">Grouped by CI level</span>
      </div>${renderCIFilmstrip()}`
    :`<div class="sec-title" style="display:flex;align-items:center;justify-content:space-between">
        <span>Timeline</span>
        ${timelineSubline}
      </div>${monthSections}`;

  return`
  ${topBar}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
    <button class="btn-gold" id="open-photo-guide-btn">📷 Take Photo</button>
    <button class="btn-ghost" id="open-photo-library-btn" style="font-size:13px">🖼 Choose Existing</button>
  </div>
  ${compareBtn}
  <input type="file" id="photo-file" accept="image/*" capture="environment" style="display:none">
  <input type="file" id="photo-file-library" accept="image/*" multiple style="display:none">
  ${pinnedHtml}
  ${viewToggle}
  ${timelineSection}
  ${selectBar}`;
}

// ── PHOTOS LOCK — crypto + biometric helpers ─────────────────────────────────
function base64UrlEncode(buf){
  const bytes=new Uint8Array(buf);
  let str='';
  for(let i=0;i<bytes.length;i++)str+=String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function base64UrlDecode(str){
  const pad=str.length%4===0?'':'='.repeat(4-(str.length%4));
  const b64=(str+pad).replace(/-/g,'+').replace(/_/g,'/');
  const bin=atob(b64);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  return bytes.buffer;
}
function randomHex(n){
  const arr=new Uint8Array(n);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('');
}
// Deterministic PIN hash — works in every environment including iOS PWAs.
// We deliberately avoid crypto.subtle.digest here: iOS standalone PWAs have a
// documented bug where crypto.subtle is undefined or hangs indefinitely,
// which was freezing the PIN setup flow after the second PIN entry.
//
// A 4-digit PIN only has 10,000 possibilities, so cryptographic strength isn't
// meaningful — anyone with the salt + hash can brute-force it regardless of
// algorithm. This produces a stable, deterministic 64-char hex output that
// behaves identically across every device and browser.
async function hashPin(pin,salt){
  const str=salt+':'+pin;
  let out='';
  for(let round=0;round<8;round++){
    let h=2166136261>>>0;
    const rs=str+'|'+round+'|'+str.length;
    for(let i=0;i<rs.length;i++){
      h^=rs.charCodeAt(i);
      h=Math.imul(h,16777619)>>>0;
    }
    h^=h>>>16;h=Math.imul(h,2246822507)>>>0;
    h^=h>>>13;h=Math.imul(h,3266489909)>>>0;
    h^=h>>>16;
    out+=h.toString(16).padStart(8,'0');
  }
  return out;
}
function biometricAvailable(){
  return !!(window.PublicKeyCredential && navigator.credentials && window.isSecureContext);
}
async function registerBiometric(){
  if(!biometricAvailable())throw new Error('unsupported');
  // Ask the platform if a user-verifying platform authenticator exists.
  // This Promise can hang indefinitely in iOS PWAs — wrap with a timeout.
  if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable){
    const ok=await Promise.race([
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      new Promise(res=>setTimeout(()=>res(false),3000))
    ]);
    if(!ok)throw new Error('no-authenticator');
  }
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  const userId=crypto.getRandomValues(new Uint8Array(16));
  const cred=await navigator.credentials.create({
    publicKey:{
      challenge,
      rp:{name:'RestoreTrack'},
      user:{id:userId,name:(char.name||'restorer')+'@restoretrack',displayName:char.name||'Restorer'},
      pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],
      authenticatorSelection:{authenticatorAttachment:'platform',userVerification:'required',residentKey:'preferred'},
      timeout:60000,
      attestation:'none'
    }
  });
  return base64UrlEncode(cred.rawId);
}
async function unlockWithBiometric(){
  if(!biometricAvailable()||!char.photoLockCredentialId)throw new Error('unavailable');
  const challenge=crypto.getRandomValues(new Uint8Array(32));
  const credIdBytes=base64UrlDecode(char.photoLockCredentialId);
  // Race against a 30s timeout — iOS PWAs can hang on credentials.get()
  const assertion=await Promise.race([
    navigator.credentials.get({
      publicKey:{
        challenge,
        allowCredentials:[{id:credIdBytes,type:'public-key',transports:['internal']}],
        userVerification:'required',
        timeout:30000
      }
    }),
    new Promise((_,rej)=>setTimeout(()=>rej(new Error('biometric-timeout')),32000))
  ]);
  return !!assertion;
}

// ── PHOTOS LOCK — setup flow ─────────────────────────────────────────────────
// Tiny router: profile-initiated flows land back on Profile; onboarding-initiated
// flows (flagged via window._obPhotoLockPostSetup) return to Home instead.
function _profileFlowDone(){
  if(window._obPhotoLockPostSetup){
    window._obPhotoLockPostSetup=false;
    showProfileScreen=false;
    render();
  } else {
    renderProfileScreen();
  }
}

function mountPhotosLockSetup(){
  const ex=document.getElementById('plock-setup-ov');if(ex)ex.remove();
  let stage='enter'; // 'enter' | 'confirm'
  let firstPin='';
  let tmpPin='';
  const el=document.createElement('div');el.className='overlay';el.id='plock-setup-ov';
  el.innerHTML=`<div class="sheet" style="max-height:92vh;padding-bottom:24px">
    <div class="sheet-handle"></div>
    <div id="pls-body"></div>
  </div>`;
  document.getElementById('root').appendChild(el);
  // Backdrop tap routes through _profileFlowDone like the Skip/Enable paths —
  // otherwise window._obPhotoLockPostSetup can survive a dismissed sheet and
  // misfire on the NEXT Photos Lock flow, sending the user to Home.
  el.addEventListener('click',e=>{if(e.target===el){el.remove();_profileFlowDone();}});

  const renderBody=()=>{
    const body=document.getElementById('pls-body');
    if(!body)return;
    const title=stage==='enter'?'Create a PIN':'Confirm your PIN';
    const subtitle=stage==='enter'?'Choose a 4-digit PIN to lock the Photos tab.':'Enter the same PIN again to confirm.';
    const dots=Array.from({length:4},(_,i)=>{
      const filled=i<tmpPin.length;
      return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
    }).join('');
    const key=label=>`<button type="button" data-setup-pin="${label}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:21px;font-weight:700;color:var(--text1);cursor:pointer;user-select:none;-webkit-user-select:none">${label}</button>`;
    body.innerHTML=`
      <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);text-align:center;margin-bottom:6px">${title}</div>
      <div style="font-size:11px;color:var(--text4);text-align:center;line-height:1.6;margin-bottom:20px;max-width:280px;margin-left:auto;margin-right:auto">${subtitle}</div>
      <div id="setup-pin-dots" style="display:flex;gap:12px;justify-content:center;margin-bottom:24px">${dots}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;justify-items:center;margin-bottom:10px">
        ${key('1')}${key('2')}${key('3')}
        ${key('4')}${key('5')}${key('6')}
        ${key('7')}${key('8')}${key('9')}
        <div></div>
        ${key('0')}
        <button type="button" id="setup-pin-del" style="background:transparent;border:none;color:var(--text4);font-size:21px;cursor:pointer;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-body)">⌫</button>
      </div>
      <div id="setup-pin-error" style="font-size:11px;color:#c0392b;text-align:center;min-height:16px;margin-bottom:6px"></div>
      <button class="btn-ghost" id="setup-pin-cancel" style="width:100%;margin-top:4px">Cancel</button>
    `;
    body.querySelectorAll('[data-setup-pin]').forEach(btn=>{
      btn.onclick=()=>{
        if(tmpPin.length>=4)return;
        tmpPin+=btn.dataset.setupPin;
        if(navigator.vibrate)navigator.vibrate(10);
        updateSetupDots();
        if(tmpPin.length===4)setTimeout(advance,150);
      };
    });
    document.getElementById('setup-pin-del').onclick=()=>{tmpPin=tmpPin.slice(0,-1);updateSetupDots();};
    document.getElementById('setup-pin-cancel').onclick=()=>el.remove();
  };

  const updateSetupDots=()=>{
    const dots=document.getElementById('setup-pin-dots');
    if(!dots)return;
    dots.innerHTML=Array.from({length:4},(_,i)=>{
      const filled=i<tmpPin.length;
      return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
    }).join('');
  };

  const advance=async()=>{
    try{
      if(stage==='enter'){
        firstPin=tmpPin;
        tmpPin='';
        stage='confirm';
        renderBody();
        return;
      }
      if(tmpPin!==firstPin){
        tmpPin='';
        stage='enter';
        firstPin='';
        renderBody();
        const e2=document.getElementById('setup-pin-error');
        if(e2)e2.textContent='PINs did not match. Try again.';
        return;
      }
      // Commit
      const salt=randomHex(16);
      const hash=await hashPin(tmpPin,salt);
      char.photoLockSalt=salt;
      char.photoLockPinHash=hash;
      char.photoLockEnabled=true;
      saveChar();
      el.remove();
      showToast('🔒 Photos Lock enabled');
      // Offer biometric setup if available. offerBiometricSetup() is
      // synchronous — it shows a sheet and resolves through its own
      // Skip / Enable / backdrop handlers — so there's no await and no
      // race to run here. Previously this was wrapped in a Promise.race
      // against a 4s timeout; that guard was dead code because the call
      // returns undefined (already-resolved), not a promise that can hang.
      if(biometricAvailable()){
        offerBiometricSetup();
      } else {
        _profileFlowDone();
      }
    }catch(e){
      console.error('[RT] PIN setup error',e);
      const errEl=document.getElementById('setup-pin-error');
      if(errEl)errEl.textContent='Something went wrong — please try again';
      tmpPin='';
      if(stage==='confirm'){stage='enter';firstPin='';}
      updateSetupDots();
    }
  };

  renderBody();
}

function offerBiometricSetup(){
  const ex=document.getElementById('bio-setup-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='bio-setup-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:24px">
    <div class="sheet-handle"></div>
    <div style="text-align:center;padding:14px 8px 4px">
      <div style="font-size:38px;margin-bottom:12px">✨</div>
      <div style="font-family:var(--font-display);font-size:14px;color:var(--text1);margin-bottom:8px">Enable Biometric Unlock?</div>
      <div style="font-size:12px;color:var(--text4);line-height:1.7;margin-bottom:20px;max-width:280px;margin-left:auto;margin-right:auto">Use Face ID or fingerprint to unlock Photos instantly. Your PIN still works as a backup.</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn-ghost" id="bio-setup-skip" style="flex:1">Skip</button>
      <button class="btn-gold" id="bio-setup-go" style="flex:1">Enable</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el){el.remove();_profileFlowDone();}});
  document.getElementById('bio-setup-skip').onclick=()=>{el.remove();_profileFlowDone();};
  document.getElementById('bio-setup-go').onclick=async()=>{
    const btn=document.getElementById('bio-setup-go');
    if(btn){btn.disabled=true;btn.textContent='Setting up…';}
    try{
      const credId=await registerBiometric();
      char.photoLockCredentialId=credId;
      saveChar();
      el.remove();
      showToast('✨ Biometric unlock enabled');
      _profileFlowDone();
    }catch(e){
      console.warn('[RT] biometric setup failed',e);
      el.remove();
      showToast('⚠ Biometric setup not available on this device');
      _profileFlowDone();
    }
  };
}

function disablePhotosLock(){
  const ex=document.getElementById('plock-disable-ov');if(ex)ex.remove();
  let pin='';
  const el=document.createElement('div');el.className='overlay';el.id='plock-disable-ov';
  const renderBody=()=>{
    const dots=Array.from({length:4},(_,i)=>{
      const filled=i<pin.length;
      return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
    }).join('');
    const key=label=>`<button type="button" data-dis-pin="${label}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:21px;font-weight:700;color:var(--text1);cursor:pointer;user-select:none;-webkit-user-select:none">${label}</button>`;
    el.innerHTML=`<div class="sheet" style="max-height:92vh;padding-bottom:24px">
      <div class="sheet-handle"></div>
      <div style="font-family:var(--font-display);font-size:14px;color:var(--text1);text-align:center;margin-bottom:6px">Confirm your PIN</div>
      <div style="font-size:11px;color:var(--text4);text-align:center;line-height:1.6;margin-bottom:20px;max-width:280px;margin-left:auto;margin-right:auto">Enter your PIN to turn Photos Lock off.</div>
      <div id="dis-pin-dots" style="display:flex;gap:12px;justify-content:center;margin-bottom:24px">${dots}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;justify-items:center;margin-bottom:10px">
        ${key('1')}${key('2')}${key('3')}
        ${key('4')}${key('5')}${key('6')}
        ${key('7')}${key('8')}${key('9')}
        <div></div>
        ${key('0')}
        <button type="button" id="dis-pin-del" style="background:transparent;border:none;color:var(--text4);font-size:21px;cursor:pointer;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-body)">⌫</button>
      </div>
      <div id="dis-pin-error" style="font-size:11px;color:#c0392b;text-align:center;min-height:16px;margin-bottom:6px"></div>
      <button class="btn-ghost" id="dis-pin-cancel" style="width:100%;margin-top:4px">Cancel</button>
    </div>`;
    el.querySelectorAll('[data-dis-pin]').forEach(btn=>{
      btn.onclick=()=>{
        if(pin.length>=4)return;
        pin+=btn.dataset.disPin;
        if(navigator.vibrate)navigator.vibrate(10);
        updateDots();
        if(pin.length===4)setTimeout(verify,150);
      };
    });
    document.getElementById('dis-pin-del').onclick=()=>{pin=pin.slice(0,-1);updateDots();};
    document.getElementById('dis-pin-cancel').onclick=()=>el.remove();
  };
  const updateDots=()=>{
    const dots=document.getElementById('dis-pin-dots');
    if(!dots)return;
    dots.innerHTML=Array.from({length:4},(_,i)=>{
      const filled=i<pin.length;
      return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
    }).join('');
  };
  const verify=async()=>{
    try{
      const hash=await hashPin(pin,char.photoLockSalt);
      if(hash===char.photoLockPinHash){
        char.photoLockEnabled=false;
        char.photoLockPinHash='';
        char.photoLockSalt='';
        char.photoLockCredentialId='';
        _photosUnlocked=false;
        saveChar();
        el.remove();
        showToast('🔓 Photos Lock disabled');
        renderProfileScreen();
      }else{
        pin='';
        updateDots();
        const errEl=document.getElementById('dis-pin-error');
        if(errEl)errEl.textContent='Incorrect PIN';
      }
    }catch(e){
      console.error('[RT] PIN verify error',e);
      pin='';
      updateDots();
      const errEl=document.getElementById('dis-pin-error');
      if(errEl)errEl.textContent='Something went wrong — try again';
    }
  };
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
  renderBody();
}

// ── PHOTOS LOCK — reusable unlock gate ───────────────────────────────────────
// Returns a Promise that resolves true once unlocked (or if lock is off),
// false if the user cancels. Used to gate sensitive actions like Cloud Backup.
function requirePhotoUnlock(){
  return new Promise((resolve)=>{
    if(!char.photoLockEnabled||_photosUnlocked){resolve(true);return;}
    const ex=document.getElementById('unlock-gate-ov');if(ex)ex.remove();
    let pin='';
    const el=document.createElement('div');el.className='overlay';el.id='unlock-gate-ov';
    const updateDots=()=>{
      const dots=document.getElementById('gate-pin-dots');
      if(!dots)return;
      dots.innerHTML=Array.from({length:4},(_,i)=>{
        const filled=i<pin.length;
        return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
      }).join('');
    };
    const renderBody=()=>{
      const dots=Array.from({length:4},(_,i)=>{
        const filled=i<pin.length;
        return`<div style="width:16px;height:16px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
      }).join('');
      const key=label=>`<button type="button" data-gate-pin="${label}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:21px;font-weight:700;color:var(--text1);cursor:pointer;user-select:none;-webkit-user-select:none">${label}</button>`;
      el.innerHTML=`<div class="sheet" style="max-height:92vh;padding-bottom:24px">
        <div class="sheet-handle"></div>
        <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);text-align:center;margin-bottom:6px">🔒 Unlock to Continue</div>
        <div style="font-size:11px;color:var(--text4);text-align:center;line-height:1.6;margin-bottom:20px;max-width:280px;margin-left:auto;margin-right:auto">Enter your PIN to continue.</div>
        <div id="gate-pin-dots" style="display:flex;gap:12px;justify-content:center;margin-bottom:24px">${dots}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;justify-items:center;margin-bottom:10px">
          ${key('1')}${key('2')}${key('3')}
          ${key('4')}${key('5')}${key('6')}
          ${key('7')}${key('8')}${key('9')}
          <div></div>
          ${key('0')}
          <button type="button" id="gate-pin-del" style="background:transparent;border:none;color:var(--text4);font-size:21px;cursor:pointer;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-family:var(--font-body)">⌫</button>
        </div>
        <div id="gate-pin-error" style="font-size:11px;color:#c0392b;text-align:center;min-height:16px;margin-bottom:6px"></div>
        <button class="btn-ghost" id="gate-pin-cancel" style="width:100%;margin-top:4px">Cancel</button>
      </div>`;
      el.querySelectorAll('[data-gate-pin]').forEach(btn=>{
        btn.onclick=()=>{
          if(pin.length>=4)return;
          pin+=btn.dataset.gatePin;
          if(navigator.vibrate)navigator.vibrate(10);
          updateDots();
          if(pin.length===4)setTimeout(verify,150);
        };
      });
      document.getElementById('gate-pin-del').onclick=()=>{pin=pin.slice(0,-1);updateDots();};
      document.getElementById('gate-pin-cancel').onclick=()=>{el.remove();resolve(false);};
    };
    const verify=async()=>{
      try{
        const hash=await hashPin(pin,char.photoLockSalt);
        if(hash===char.photoLockPinHash){
          _photosUnlocked=true;
          el.remove();
          resolve(true);
        }else{
          pin='';
          updateDots();
          const errEl=document.getElementById('gate-pin-error');
          if(errEl)errEl.textContent='Incorrect PIN';
        }
      }catch(e){
        console.error('[RT] unlock gate error',e);
        pin='';
        updateDots();
        const errEl=document.getElementById('gate-pin-error');
        if(errEl)errEl.textContent='Something went wrong';
      }
    };
    document.getElementById('root').appendChild(el);
    renderBody();
  });
}

// ── PHOTOS LOCK SCREEN ────────────────────────────────────────────────────────
function renderPhotoLockScreen(){
  const hasBio=!!char.photoLockCredentialId&&biometricAvailable();
  const dots=Array.from({length:4},(_,i)=>{
    const filled=i<_pinBuf.length;
    return`<div style="width:14px;height:14px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
  }).join('');
  const key=label=>`<button type="button" data-pin="${label}" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:64px;height:64px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--text1);cursor:pointer;transition:all .1s;user-select:none;-webkit-user-select:none">${label}</button>`;
  return`<div style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 20px;text-align:center">
    <div style="font-size:48px;margin-bottom:16px;opacity:.7">🔒</div>
    <div style="font-family:var(--font-display);font-size:16px;color:var(--text1);margin-bottom:6px">Photos Locked</div>
    <div style="font-size:12px;color:var(--text4);line-height:1.7;max-width:280px;margin-bottom:26px">Enter your PIN to unlock. Photos stay locked until you close the app.</div>

    <div id="pin-dots" style="display:flex;gap:12px;margin-bottom:26px">${dots}</div>

    ${hasBio?`<button id="lock-bio-btn" type="button" style="display:flex;align-items:center;gap:8px;background:var(--acc12);border:1px solid var(--acc30);border-radius:12px;padding:11px 18px;color:var(--accent);font-family:var(--font-body);font-size:13px;font-weight:600;cursor:pointer;margin-bottom:20px">
      <span style="font-size:16px">✨</span> Unlock with biometrics
    </button>
    <div style="display:flex;align-items:center;gap:10px;width:100%;max-width:260px;margin-bottom:20px">
      <div style="flex:1;height:1px;background:var(--stat-border)"></div>
      <div style="font-size:10px;color:var(--text5);text-transform:uppercase;letter-spacing:1.2px">or</div>
      <div style="flex:1;height:1px;background:var(--stat-border)"></div>
    </div>`:''}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;justify-items:center;margin-bottom:6px">
      ${key('1')}${key('2')}${key('3')}
      ${key('4')}${key('5')}${key('6')}
      ${key('7')}${key('8')}${key('9')}
      <div></div>
      ${key('0')}
      <button type="button" id="pin-del" style="background:transparent;border:none;color:var(--text4);font-size:22px;cursor:pointer;width:64px;height:64px;display:flex;align-items:center;justify-content:center;font-family:var(--font-body)">⌫</button>
    </div>

    <div id="pin-error" style="font-size:11px;color:#c0392b;min-height:16px;margin-top:14px"></div>
  </div>`;
}
function updatePinDots(){
  const dots=document.getElementById('pin-dots');
  if(!dots)return;
  dots.innerHTML=Array.from({length:4},(_,i)=>{
    const filled=i<_pinBuf.length;
    return`<div style="width:14px;height:14px;border-radius:50%;background:${filled?'var(--accent)':'transparent'};border:2px solid ${filled?'var(--accent)':'var(--stat-border)'};transition:all .15s"></div>`;
  }).join('');
}
function attachPhotoLockEvents(){
  const c=document.getElementById('content');
  if(!c)return;
  _pinBuf='';
  c.querySelectorAll('[data-pin]').forEach(btn=>{
    btn.onclick=()=>{
      if(_pinBuf.length>=4)return;
      _pinBuf+=btn.dataset.pin;
      if(navigator.vibrate)navigator.vibrate(10);
      updatePinDots();
      if(_pinBuf.length===4)setTimeout(verifyPinEntry,120);
    };
  });
  document.getElementById('pin-del')?.addEventListener('click',()=>{
    _pinBuf=_pinBuf.slice(0,-1);
    updatePinDots();
  });
  document.getElementById('lock-bio-btn')?.addEventListener('click',async()=>{
    try{
      const ok=await unlockWithBiometric();
      if(ok){_photosUnlocked=true;_pinBuf='';render();}
    }catch(e){
      console.warn('[RT] biometric unlock failed',e);
      showToast('⚠ Biometric unlock failed — use your PIN');
    }
  });
}
async function verifyPinEntry(){
  const entered=_pinBuf;
  const errEl=document.getElementById('pin-error');
  try{
    const hash=await hashPin(entered,char.photoLockSalt);
    if(hash===char.photoLockPinHash){
      _photosUnlocked=true;
      _pinBuf='';
      if(navigator.vibrate)navigator.vibrate([30,20,30]);
      render();
    }else{
      _pinBuf='';
      updatePinDots();
      if(errEl)errEl.textContent='Incorrect PIN';
      if(navigator.vibrate)navigator.vibrate([60,40,60]);
    }
  }catch(e){
    console.warn('[RT] pin verify error',e);
    _pinBuf='';
    updatePinDots();
    if(errEl)errEl.textContent='Something went wrong';
  }
}

// ── PHOTO GHOST HELPER ────────────────────────────────────────────────────────
function getLatestPhotoForGhost(){
  if(!photos.length)return null;
  return [...photos].sort((a,b)=>b.date.localeCompare(a.date))[0];
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
      <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:4px">Progress Photo</div>
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

    const queueTotal=photoQueue.length;
    const queueIdx=queueTotal>0?photoQueue.findIndex(q=>q.data===pendingPhotoData):0;
    const isQueued=queueTotal>1;
    const isLast=!isQueued||queueIdx===queueTotal-1;
    const tagGhostPhoto=getLatestPhotoForGhost();

    const headerBtn='background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text3);font-size:15px;transition:all .15s;padding:0;flex-shrink:0';

    el.innerHTML=`<div class="sheet" style="max-height:94vh;display:flex;flex-direction:column;padding-bottom:18px">
      <div class="sheet-handle"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;flex-shrink:0">
        <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);flex-shrink:0">Tag Your Photo</div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
          ${isQueued?`<div style="font-size:10px;color:var(--text4);background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:4px 9px;white-space:nowrap">${queueIdx+1}/${queueTotal}</div>`:''}
          ${tagGhostPhoto?`<button type="button" id="tag-ghost-btn" title="Ghost overlay" style="${headerBtn}">👻</button>`:''}
          ${!isQueued?`<button type="button" id="tag-retake-btn" title="Retake" style="${headerBtn}">↺</button>`:''}
        </div>
      </div>

      ${isQueued?`<div style="height:4px;background:var(--bg-stat);border-radius:2px;overflow:hidden;margin-bottom:10px;flex-shrink:0">
        <div style="height:100%;background:var(--accent);border-radius:2px;width:${Math.round(((queueIdx+1)/queueTotal)*100)}%;transition:width .3s"></div>
      </div>`:''}

      <div style="flex:1;overflow-y:auto;padding-right:2px;min-height:0">

        <div style="position:relative;border-radius:12px;overflow:hidden;background:#000;margin-bottom:14px;aspect-ratio:1;max-height:44vh;display:flex;align-items:center;justify-content:center">
          <img src="${pendingPhotoData}" style="width:100%;height:100%;object-fit:contain;display:block" alt="Preview">
          ${tagGhostPhoto?`<img id="tag-ghost-img" src="${tagGhostPhoto.url}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:0;pointer-events:none;transition:opacity .25s" alt="">`:''}
        </div>

        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4);margin-bottom:8px">CI Level</div>
        <div id="tag-ci-grid" style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-bottom:10px">
          ${Array.from({length:11},(_,i)=>`<button type="button" data-ci="CI-${i}" onclick="pendingPhotoCI='CI-${i}';window._tagRefreshCI()" style="padding:10px 0;border-radius:8px;font-family:var(--font-display);font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;background:var(--bg-stat);border:1px solid var(--stat-border);color:var(--text3)">${i}</button>`).join('')}
        </div>
        <div id="tag-ci-desc" style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:10px;padding:10px 12px;font-size:11px;color:var(--text2);line-height:1.65;margin-bottom:14px;min-height:70px;max-height:90px;overflow-y:auto"></div>

        <div style="display:flex;gap:8px;margin-bottom:10px">
          <button type="button" id="tag-date-toggle" style="flex:1;text-align:left;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:11px 12px;cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;gap:8px;min-width:0">
            <span style="font-size:14px;flex-shrink:0">📅</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.8px;margin-bottom:1px">Date</div>
              <div id="tag-date-display" style="font-size:12px;font-weight:600;color:var(--text1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Today</div>
            </div>
          </button>
          <button type="button" id="tag-note-toggle" style="flex:1;text-align:left;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:11px 12px;cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;gap:8px;min-width:0">
            <span style="font-size:14px;flex-shrink:0">📝</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.8px;margin-bottom:1px">Note</div>
              <div id="tag-note-display" style="font-size:12px;font-weight:600;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Add note</div>
            </div>
          </button>
        </div>
        <div id="tag-date-editor" style="display:none;margin-bottom:10px">
          <input type="date" id="photo-date-inp" value="${today()}" max="${today()}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--accent);font-size:14px;font-weight:600;width:100%;outline:none;font-family:var(--font-body)">
        </div>
        <div id="tag-note-editor" style="display:none;margin-bottom:10px">
          <textarea id="photo-note-inp" placeholder="Method, how long in, anything relevant..." style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--text1);font-size:13px;width:100%;outline:none;font-family:var(--font-body);min-height:70px;resize:vertical"></textarea>
        </div>

      </div>

      <div style="display:flex;gap:8px;padding-top:14px;border-top:1px solid var(--stat-border);flex-shrink:0;margin-top:6px">
        <button class="btn-ghost" id="photo-cancel-queue" style="flex:0 0 84px">${isQueued?'Cancel all':'Cancel'}</button>
        <button class="btn-gold" id="photo-confirm-save" style="flex:1">${isLast?'✓ Save to Timeline':'✓ Save & Next'}</button>
      </div>
    </div>`;
    document.getElementById('root').appendChild(el);

    // ── CI grid refresher ──
    window._tagRefreshCI=()=>{
      document.querySelectorAll('#tag-ci-grid button').forEach(b=>{
        const sel=b.dataset.ci===pendingPhotoCI;
        b.style.background=sel?'var(--accent)':'var(--bg-stat)';
        b.style.borderColor=sel?'var(--accent)':'var(--stat-border)';
        b.style.color=sel?'var(--bg)':'var(--text3)';
      });
      const l=LEVELS.find(x=>x.ci===pendingPhotoCI);
      const desc=document.getElementById('tag-ci-desc');
      if(l&&desc){
        desc.innerHTML=`<div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:4px">${l.ci}</div><div style="color:var(--text3)">${ciDesc(l)}</div>`;
      }
    };
    window._tagRefreshCI();

    // ── Ghost toggle (header button) ──
    let _tagGhostOn=false;
    const _tagGhostBtn=document.getElementById('tag-ghost-btn');
    const _tagGhostImg=document.getElementById('tag-ghost-img');
    const _paintGhostBtn=()=>{
      if(!_tagGhostBtn)return;
      if(_tagGhostOn){
        _tagGhostBtn.style.background='var(--accent)';
        _tagGhostBtn.style.borderColor='var(--accent)';
        _tagGhostBtn.style.color='var(--bg)';
      }else{
        _tagGhostBtn.style.background='var(--bg-stat)';
        _tagGhostBtn.style.borderColor='var(--stat-border)';
        _tagGhostBtn.style.color='var(--text3)';
      }
    };
    if(_tagGhostImg&&char.ghostOverlay!==false&&!photoQueue.length){
      _tagGhostOn=true;
      _tagGhostImg.style.opacity='0.4';
      _paintGhostBtn();
    }
    if(_tagGhostBtn){
      _tagGhostBtn.onclick=()=>{
        _tagGhostOn=!_tagGhostOn;
        if(_tagGhostImg)_tagGhostImg.style.opacity=_tagGhostOn?'0.4':'0';
        _paintGhostBtn();
      };
    }

    // ── Date toggle ──
    const _dateToggle=document.getElementById('tag-date-toggle');
    const _dateEditor=document.getElementById('tag-date-editor');
    const _dateDisplay=document.getElementById('tag-date-display');
    const _dateInput=document.getElementById('photo-date-inp');
    _dateToggle.onclick=()=>{
      const open=_dateEditor.style.display==='none';
      _dateEditor.style.display=open?'block':'none';
      if(open&&_dateInput)_dateInput.focus();
    };
    _dateInput?.addEventListener('input',()=>{
      const v=_dateInput.value||today();
      _dateDisplay.textContent=v===today()?'Today':fmtDateLong(v);
      _dateDisplay.style.color=v===today()?'var(--text1)':'var(--accent)';
      _dateToggle.style.borderColor=v===today()?'var(--stat-border)':'var(--acc30)';
    });

    // ── Note toggle ──
    const _noteToggle=document.getElementById('tag-note-toggle');
    const _noteEditor=document.getElementById('tag-note-editor');
    const _noteDisplay=document.getElementById('tag-note-display');
    const _noteInput=document.getElementById('photo-note-inp');
    _noteToggle.onclick=()=>{
      const open=_noteEditor.style.display==='none';
      _noteEditor.style.display=open?'block':'none';
      if(open&&_noteInput)_noteInput.focus();
    };
    _noteInput?.addEventListener('input',()=>{
      const v=_noteInput.value.trim();
      _noteDisplay.textContent=v||'Add note';
      _noteDisplay.style.color=v?'var(--accent)':'var(--text3)';
      _noteToggle.style.borderColor=v?'var(--acc30)':'var(--stat-border)';
    });

    // ── Retake ──
    document.getElementById('tag-retake-btn')?.addEventListener('click',()=>{
      photoQueue=[];
      pendingPhotoData=null;
      pendingPhotoCI=null;
      photoGuideStep=1;
      el.remove();
      const input=document.getElementById('photo-file');
      if(input)input.click();
    });

    // ── Cancel ──
    document.getElementById('photo-cancel-queue').onclick=()=>{
      photoQueue=[];
      photoGuideStep=1;pendingPhotoData=null;pendingPhotoCI=null;
      el.remove();
      if(!isQueued)mountPhotoGuideSheet();
    };

    // ── Save ──
    document.getElementById('photo-confirm-save').onclick=async ()=>{
      const btn=document.getElementById('photo-confirm-save');
      if(btn){btn.disabled=true;btn.textContent='Saving…';}
      const note=document.getElementById('photo-note-inp')?.value||'';
      const dateVal=document.getElementById('photo-date-inp')?.value||today();
      if(!pendingPhotoData||!pendingPhotoCI){if(btn)btn.disabled=false;return;}

      const comp=await compressForPhoto(pendingPhotoData);

      if(isQueued&&!isLast){
        photoQueue[queueIdx].staged={ci:pendingPhotoCI,date:dateVal,url:comp,note,id:Date.now()};
        const nextIdx=queueIdx+1;
        pendingPhotoData=photoQueue[nextIdx].data;
        pendingPhotoCI=LEVELS[char.ciLevel||0].ci;
        el.remove();
        mountPhotoGuideSheet();
      } else {
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
function subtractDays(dateStr,days){
  const d=new Date(dateStr+'T12:00:00');
  d.setDate(d.getDate()-days);
  return localDateStr(d);
}
function findClosestPhoto(targetDate,list){
  const targetMs=new Date(targetDate+'T12:00:00').getTime();
  let best=null,bestDiff=Infinity;
  list.forEach(p=>{
    const pMs=new Date(p.date+'T12:00:00').getTime();
    const diff=Math.abs(pMs-targetMs);
    if(diff<bestDiff){bestDiff=diff;best=p;}
  });
  return best;
}
function buildCompareShortcuts(){
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  if(sorted.length<2)return[];
  const latest=sorted[0];
  const oldest=sorted[sorted.length-1];
  const spanDays=Math.round((new Date(latest.date+'T12:00:00')-new Date(oldest.date+'T12:00:00'))/86400000);
  const out=[];
  const seen=new Set([latest.id]);
  // Latest vs First
  out.push({id:'first',label:'Latest vs First',sub:`${fmtDate(oldest.date)} → ${fmtDate(latest.date)}`,latestId:latest.id,olderId:oldest.id});
  seen.add(oldest.id);
  // Latest vs ~1 month
  if(spanDays>=20){
    const cand=findClosestPhoto(subtractDays(latest.date,30),sorted.slice(1));
    if(cand&&!seen.has(cand.id)){
      out.push({id:'30d',label:'Latest vs ~1 month ago',sub:`${fmtDate(cand.date)} → ${fmtDate(latest.date)}`,latestId:latest.id,olderId:cand.id});
      seen.add(cand.id);
    }
  }
  // Latest vs ~3 months
  if(spanDays>=60){
    const cand=findClosestPhoto(subtractDays(latest.date,90),sorted.slice(1));
    if(cand&&!seen.has(cand.id)){
      out.push({id:'90d',label:'Latest vs ~3 months ago',sub:`${fmtDate(cand.date)} → ${fmtDate(latest.date)}`,latestId:latest.id,olderId:cand.id});
    }
  }
  return out;
}
function runCompareShortcut(latestId,olderId){
  const latest=photos.find(p=>p.id===latestId);
  const older=photos.find(p=>p.id===olderId);
  if(!latest||!older||latest.id===older.id)return;
  // older = Before (A), latest = After (B). openCompareViewer sorts anyway.
  compareA=older;compareB=latest;
  const ex=document.getElementById('compare-pick-ov');if(ex)ex.remove();
  openCompareViewer();
}
function compareClearA(){
  compareA=null;
  compareB=null;
  updateComparePickUI();
}
function openComparePicker(){
  const ex=document.getElementById('compare-pick-ov');if(ex)ex.remove();
  compareA=null;compareB=null;
  const sorted=[...photos].sort((a,b)=>b.date.localeCompare(a.date));
  const shortcuts=buildCompareShortcuts();
  const el=document.createElement('div');el.className='overlay';el.id='compare-pick-ov';

  const thumbs=sorted.map(p=>`
    <div id="cpt-${p.id}" onclick="comparePickTap(${p.id})"
      style="cursor:pointer;border-radius:8px;overflow:hidden;position:relative;border:2px solid transparent;transition:border-color .15s;aspect-ratio:1">
      <img src="${p.url}" style="width:100%;height:100%;object-fit:cover" alt="${p.ci}">
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);padding:3px 5px;font-size:9px;font-family:var(--font-display);color:#fff;text-align:center">${p.ci}<br><span style="font-size:8px;opacity:.8;font-family:var(--font-body)">${p.date}</span></div>
      <div id="cpt-badge-${p.id}" style="display:none;position:absolute;top:4px;right:4px;background:var(--accent);color:var(--bg);border-radius:50%;width:20px;height:20px;font-size:11px;font-weight:700;display:none;align-items:center;justify-content:center;font-family:var(--font-display)"></div>
    </div>`).join('');

  const shortcutsHtml=shortcuts.length?`
    <div id="compare-shortcuts" style="margin-bottom:12px;flex-shrink:0">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text5);margin-bottom:7px">Quick compare</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${shortcuts.map(s=>`
          <button onclick="runCompareShortcut(${s.latestId},${s.olderId})" style="display:flex;align-items:center;gap:10px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;cursor:pointer;text-align:left;font-family:var(--font-body);transition:border-color .15s">
            <span style="font-size:16px;flex-shrink:0">⚖</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:600;color:var(--text1)">${s.label}</div>
              <div style="font-size:10px;color:var(--text4);margin-top:1px">${s.sub}</div>
            </div>
            <span style="font-size:14px;color:var(--accent);flex-shrink:0">→</span>
          </button>`).join('')}
      </div>
      <div style="text-align:center;margin-top:10px;font-size:10px;color:var(--text5)">— or pick your own below —</div>
    </div>`:'';

  el.innerHTML=`<div class="sheet" style="max-height:88vh;display:flex;flex-direction:column">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:10px;flex-shrink:0">Compare Photos</div>
    <div id="compare-apreview" style="display:none;flex-shrink:0"></div>
    ${shortcutsHtml}
    <div style="font-size:11px;color:var(--text4);margin-bottom:10px;flex-shrink:0" id="compare-instr">Tap to select your <strong style="color:var(--text2)">first</strong> photo (Before)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;overflow-y:auto;flex:1;min-height:120px;padding:2px">${thumbs}</div>
    <div style="display:flex;gap:8px;margin-top:14px;flex-shrink:0">
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
    // Deselect A — clears B too since B was paired with it
    compareA=null;
    compareB=null;
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
    el.style.boxShadow=isA?'0 0 0 2px var(--acc30)':'none';
    if(badge){
      if(isA){badge.style.display='flex';badge.textContent='A';badge.style.background='var(--accent)';badge.style.color='var(--bg)';}
      else if(isB){badge.style.display='flex';badge.textContent='B';badge.style.background='#22a85a';badge.style.color='#fff';}
      else badge.style.display='none';
    }
  });

  // Persistent A preview + hide shortcuts once A is set
  const preview=document.getElementById('compare-apreview');
  const shortcuts=document.getElementById('compare-shortcuts');
  if(preview){
    if(compareA){
      preview.style.display='block';
      preview.innerHTML=`<div style="display:flex;align-items:center;gap:10px;background:var(--acc6);border:1px solid var(--acc30);border-radius:10px;padding:8px 10px;margin-bottom:10px">
        <div style="width:48px;height:48px;border-radius:8px;overflow:hidden;border:1.5px solid var(--accent);flex-shrink:0">
          <img src="${compareA.url}" style="width:100%;height:100%;object-fit:cover" alt="${compareA.ci}">
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:9px;color:var(--accent);text-transform:uppercase;letter-spacing:1px;font-weight:700">Before (A)</div>
          <div style="font-size:12px;font-weight:600;color:var(--text1);margin-top:2px">${compareA.ci} · ${fmtDate(compareA.date)}</div>
        </div>
        <button onclick="compareClearA()" title="Clear" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:26px;height:26px;cursor:pointer;color:var(--text3);font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0">✕</button>
      </div>`;
      if(shortcuts)shortcuts.style.display='none';
    } else {
      preview.style.display='none';
      if(shortcuts)shortcuts.style.display='block';
    }
  }

  const instr=document.getElementById('compare-instr');
  const goBtn=document.getElementById('compare-go-btn');
  if(!compareA&&!compareB&&instr)instr.innerHTML='Tap to select your <strong style="color:var(--text2)">first</strong> photo (Before)';
  else if(compareA&&!compareB&&instr)instr.innerHTML='Now tap the <strong style="color:var(--text2)">second</strong> photo (After)';
  else if(compareA&&compareB&&instr)instr.innerHTML='Ready — tap <strong style="color:var(--text2)">Compare</strong>';
  if(goBtn)goBtn.disabled=!(compareA&&compareB);
}

function openCompareViewer(){
  const ex=document.getElementById('compare-view-ov');if(ex)ex.remove();
  let a=compareA,b=compareB;
  // Sort so older = left by default
  if(a.date>b.date){const tmp=a;a=b;b=tmp;}
  _wipePos=50; // reset slider position for a fresh comparison

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
    const isWipe=_compareMode==='wipe';

    const viewerHtml=isWipe?`
      <div id="wipe-container" style="position:relative;width:100%;aspect-ratio:1;border-radius:12px;overflow:hidden;background:#000;touch-action:none;user-select:none;-webkit-user-select:none;cursor:ew-resize">
        <img src="${pB.url}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none" alt="${pB.ci}">
        <img id="wipe-fg" src="${pA.url}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;clip-path:inset(0 ${100-_wipePos}% 0 0)" alt="${pA.ci}">
        <div id="wipe-line" style="position:absolute;top:0;bottom:0;left:${_wipePos}%;width:2px;background:rgba(255,255,255,.95);box-shadow:0 0 10px rgba(0,0,0,.6);transform:translateX(-1px);pointer-events:none"></div>
        <div id="wipe-handle" style="position:absolute;top:50%;left:${_wipePos}%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.95);box-shadow:0 3px 14px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;color:#0D0B14;font-size:15px;font-weight:700;pointer-events:none">⇔</div>
        <div style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,.65);border-radius:20px;padding:4px 10px;font-family:var(--font-display);font-size:11px;font-weight:700;color:#fff;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:none">BEFORE · ${pA.ci}</div>
        <div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.65);border-radius:20px;padding:4px 10px;font-family:var(--font-display);font-size:11px;font-weight:700;color:#fff;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:none">AFTER · ${pB.ci}</div>
        <div style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,.55);border-radius:20px;padding:3px 9px;font-size:10px;color:rgba(255,255,255,.9);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:none">${fmtDate(pA.date)}</div>
        <div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,.55);border-radius:20px;padding:3px 9px;font-size:10px;color:rgba(255,255,255,.9);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);pointer-events:none">${fmtDate(pB.date)}</div>
      </div>
      <div style="font-size:10px;color:var(--text5);text-align:center;margin-top:8px">Drag the slider to reveal — left is Before, right is After</div>
      ${(pA.note||pB.note)?`<div style="display:flex;gap:10px;margin-top:8px;font-size:10px;color:var(--text4);line-height:1.5">
        ${pA.note?`<div style="flex:1;min-width:0"><span style="color:var(--text5)">Before:</span> ${htmlEsc(pA.note.slice(0,50))}</div>`:''}
        ${pB.note?`<div style="flex:1;min-width:0;text-align:right"><span style="color:var(--text5)">After:</span> ${htmlEsc(pB.note.slice(0,50))}</div>`:''}
      </div>`:''}
    `:`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div>
          <div style="background:var(--bg-stat);border-radius:10px;border:2px solid var(--acc30);overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:140px">
            <img src="${pA.url}" style="width:100%;height:auto;max-height:200px;object-fit:contain;display:block" alt="${pA.ci}">
          </div>
          <div style="text-align:center;margin-top:5px">
            <div style="font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--accent)">${pA.ci}</div>
            <div style="font-size:10px;color:var(--text4)">${fmtDate(pA.date)}</div>
            ${pA.note?`<div style="font-size:9px;color:var(--text5);font-style:italic;margin-top:2px">${pA.note.slice(0,30)}</div>`:''}
          </div>
        </div>
        <div>
          <div style="background:var(--bg-stat);border-radius:10px;border:2px solid var(--green-border,rgba(34,168,90,.4));overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:140px">
            <img src="${pB.url}" style="width:100%;height:auto;max-height:200px;object-fit:contain;display:block" alt="${pB.ci}">
          </div>
          <div style="text-align:center;margin-top:5px">
            <div style="font-family:var(--font-display);font-size:13px;font-weight:700;color:var(--accent)">${pB.ci}</div>
            <div style="font-size:10px;color:var(--text4)">${fmtDate(pB.date)}</div>
            ${pB.note?`<div style="font-size:9px;color:var(--text5);font-style:italic;margin-top:2px">${pB.note.slice(0,30)}</div>`:''}
          </div>
        </div>
      </div>
    `;

    el.querySelector('.compare-inner').innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 4px">
        <div style="font-family:var(--font-display);font-size:13px;color:var(--accent)">Progress Comparison</div>
        <button onclick="document.getElementById('compare-view-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:4px 12px;color:var(--text3);font-size:11px;cursor:pointer;font-family:var(--font-body)">Close</button>
      </div>

      <div style="display:flex;gap:4px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
        <button id="cmp-mode-side" style="flex:1;padding:7px 4px;border:none;border-radius:7px;cursor:pointer;font-size:11px;font-weight:600;font-family:var(--font-body);transition:all .15s;
          background:${!_compareMode||_compareMode==='side'?'var(--bg-card)':'transparent'};
          color:${!_compareMode||_compareMode==='side'?'var(--accent)':'var(--text4)'};
          box-shadow:${!_compareMode||_compareMode==='side'?'0 1px 4px rgba(0,0,0,.2)':'none'}">Side-by-side</button>
        <button id="cmp-mode-wipe" style="flex:1;padding:7px 4px;border:none;border-radius:7px;cursor:pointer;font-size:11px;font-weight:600;font-family:var(--font-body);transition:all .15s;
          background:${_compareMode==='wipe'?'var(--bg-card)':'transparent'};
          color:${_compareMode==='wipe'?'var(--accent)':'var(--text4)'};
          box-shadow:${_compareMode==='wipe'?'0 1px 4px rgba(0,0,0,.2)':'none'}">Wipe</button>
      </div>

      ${viewerHtml}

      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:10px 12px;display:flex;justify-content:space-around;text-align:center;margin:12px 0">
        <div><div style="font-size:11px;color:var(--text4)">Time span</div><div style="font-size:13px;font-weight:600;color:var(--text1);margin-top:2px">${span}</div></div>
        <div style="width:1px;background:var(--stat-border)"></div>
        <div><div style="font-size:11px;color:var(--text4)">CI change</div><div style="font-size:13px;font-weight:600;margin-top:2px">${ciNote}</div></div>
      </div>

      <button onclick="swapCompare()" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px;color:var(--text3);font-size:12px;cursor:pointer;font-family:var(--font-body)">⇄ Swap Before / After</button>`;

    // Mode toggle
    document.getElementById('cmp-mode-side').onclick=()=>{_compareMode='side';buildViewer(window._compareA,window._compareB);};
    document.getElementById('cmp-mode-wipe').onclick=()=>{_compareMode='wipe';buildViewer(window._compareA,window._compareB);};

    // Wipe drag handling (only in wipe mode)
    if(isWipe){
      const container=document.getElementById('wipe-container');
      const fg=document.getElementById('wipe-fg');
      const line=document.getElementById('wipe-line');
      const handle=document.getElementById('wipe-handle');
      if(container&&fg&&line&&handle){
        let dragging=false;
        const updateWipe=(clientX)=>{
          const rect=container.getBoundingClientRect();
          let pct=((clientX-rect.left)/rect.width)*100;
          pct=Math.max(0,Math.min(100,pct));
          _wipePos=pct;
          fg.style.clipPath=`inset(0 ${100-pct}% 0 0)`;
          line.style.left=pct+'%';
          handle.style.left=pct+'%';
        };
        container.addEventListener('pointerdown',e=>{
          dragging=true;
          try{container.setPointerCapture(e.pointerId);}catch{}
          updateWipe(e.clientX);
        });
        container.addEventListener('pointermove',e=>{
          if(!dragging)return;
          updateWipe(e.clientX);
        });
        const endDrag=e=>{
          dragging=false;
          try{container.releasePointerCapture(e.pointerId);}catch{}
        };
        container.addEventListener('pointerup',endDrag);
        container.addEventListener('pointercancel',endDrag);
      }
    }
  }

  const wrapper=document.createElement('div');
  wrapper.id='compare-view-ov';
  wrapper.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:200;display:flex;align-items:flex-end;justify-content:center;max-width:480px;margin:0 auto;';
  wrapper.innerHTML=`<div class="compare-inner" style="background:var(--bg-sheet);border:1px solid var(--card-border);border-radius:18px 18px 0 0;padding:18px 14px 28px;width:100%;max-height:92vh;overflow-y:auto"></div>`;
  document.getElementById('root').appendChild(wrapper);
  window._compareA=a;window._compareB=b;
  buildViewer(a,b);

  window.swapCompare=()=>{
    const tmp=window._compareA;window._compareA=window._compareB;window._compareB=tmp;
    buildViewer(window._compareA,window._compareB);
  };
}

// ── REPORTS ────────────────────────────────────────────────────────────────────
function refreshProgressIfActive(){
  const c=document.getElementById('content');
  if(c&&tab==='journey'&&_progressTab==='activity'){c.innerHTML=renderJourney();attachEvents();}
}
function repNavPrev(){
  const firstLog=logs.length?logs[logs.length-1].date.slice(0,7):'2020-01';
  const cur=`${_repYear}-${String(_repMonth+1).padStart(2,'0')}`;
  if(cur<=firstLog)return;
  _repMonth--;if(_repMonth<0){_repMonth=11;_repYear--;}
  refreshProgressIfActive();
}
function repNavNext(){
  const now=new Date();
  if(_repYear===now.getFullYear()&&_repMonth===now.getMonth())return;
  _repMonth++;if(_repMonth>11){_repMonth=0;_repYear++;}
  refreshProgressIfActive();
}
function setRepScope(s){
  if(_repScope===s)return;
  _repScope=s;
  _repCalExpanded=false;
  if(s==='month'){
    const now=new Date();
    _repYear=now.getFullYear();
    _repMonth=now.getMonth();
  }
  refreshProgressIfActive();
}
function toggleRepCal(){
  _repCalExpanded=!_repCalExpanded;
  refreshProgressIfActive();
}
function renderActivityBody(){
  const td=today();
  const scope=_repScope||'week';
  const liveMins=liveTimerTodayMins();

  // ── Scope toggle ──
  const scopeBar=`<div style="display:flex;gap:4px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
    ${[['week','This Week'],['month','Month'],['all','All Time']].map(([id,label])=>`
      <button onclick="setRepScope('${id}')" style="flex:1;padding:8px 4px;border:none;border-radius:7px;cursor:pointer;font-size:12px;font-weight:600;font-family:var(--font-body);transition:all .15s;
        background:${scope===id?'var(--bg-card)':'transparent'};
        color:${scope===id?'var(--accent)':'var(--text4)'};
        box-shadow:${scope===id?'0 1px 4px rgba(0,0,0,.2)':'none'}">${label}</button>`).join('')}
  </div>`;

  // ── Scope data ──
  let scopedLogs, barData, heroTitle, heroMins, comparisonLine, showCalendar=false, calendarMonthKey;

  if(scope==='week'){
    const wDays=thisWeekDays();
    const wSet=new Set(wDays);
    scopedLogs=logs.filter(l=>wSet.has(l.date));
    barData=wDays.map(d=>{
      const cm={};
      logs.filter(l=>l.date===d).forEach(l=>{if(l.cat)cm[l.cat]=(cm[l.cat]||0)+l.dur;});
      if(d===td&&activeTimer&&activeTimer.startedAt){
        const _dlm=liveTimerMinsForDate(d);
        if(_dlm>0){const lc=activeTimer.cat||'manual';cm[lc]=(cm[lc]||0)+_dlm;}
      }
      const total=Object.values(cm).reduce((a,b)=>a+b,0);
      return{label:dayLbl(d),total,isCurrent:d===td,segments:Object.entries(cm).map(([cid,mins])=>({cat:catFor(cid),mins}))};
    });
    const thisWeekMins=barData.reduce((a,b)=>a+b.total,0);
    heroTitle='This Week';
    heroMins=thisWeekMins;
    // Factual summary, no comparison. A multi-day T-tape session lands its
    // hours in whichever week the calendar line falls — comparing weeks
    // would report a routine change that didn't happen.
    const _weekActiveDays=new Set(logs.filter(l=>wSet.has(l.date)).map(l=>l.date)).size;
    const _weekParts=[];
    if(_weekActiveDays)_weekParts.push(`${_weekActiveDays} active day${_weekActiveDays!==1?'s':''}`);
    if(thisWeekMins)_weekParts.push(`${fmtDur(thisWeekMins)} under tension`);
    comparisonLine=_weekParts.length?_weekParts.join(' · '):'No sessions logged this week yet';
    showCalendar=false;
  } else if(scope==='month'){
    const monthKey=`${_repYear}-${String(_repMonth+1).padStart(2,'0')}`;
    scopedLogs=logs.filter(l=>l.date.slice(0,7)===monthKey);
    const daysInMonth=new Date(_repYear,_repMonth+1,0).getDate();
    barData=[];
    for(let start=1;start<=daysInMonth;start+=7){
      const end=Math.min(start+6,daysInMonth);
      const days=[];
      for(let d=start;d<=end;d++)days.push(`${monthKey}-${String(d).padStart(2,'0')}`);
      const dSet=new Set(days);
      const cm={};
      logs.filter(l=>dSet.has(l.date)).forEach(l=>{if(l.cat)cm[l.cat]=(cm[l.cat]||0)+l.dur;});
      if(dSet.has(td)&&activeTimer&&activeTimer.startedAt){
        const _dlm=liveTimerMinsForDate(td);
        if(_dlm>0){const lc=activeTimer.cat||'manual';cm[lc]=(cm[lc]||0)+_dlm;}
      }
      const total=Object.values(cm).reduce((a,b)=>a+b,0);
      barData.push({label:`${start}–${end}`,total,isCurrent:false,segments:Object.entries(cm).map(([cid,mins])=>({cat:catFor(cid),mins}))});
    }
    const thisMonthMins=scopedLogs.reduce((a,l)=>a+l.dur,0);
    const isCurrentMonth=(_repYear===new Date().getFullYear()&&_repMonth===new Date().getMonth());
    heroTitle=new Date(_repYear,_repMonth,1).toLocaleDateString('en',{month:'long',year:'numeric'});
    heroMins=thisMonthMins+(isCurrentMonth?liveMins:0);
    const _monthActiveDays=new Set(scopedLogs.map(l=>l.date)).size;
    const _monthParts=[];
    if(_monthActiveDays)_monthParts.push(`${_monthActiveDays} active day${_monthActiveDays!==1?'s':''}`);
    if(thisMonthMins)_monthParts.push(`${fmtDur(thisMonthMins)} under tension`);
    comparisonLine=_monthParts.length?_monthParts.join(' · '):'No sessions logged this month yet';
    showCalendar=true;
    calendarMonthKey=monthKey;
  } else {
    scopedLogs=logs;
    const now=new Date();
    barData=[];
    const firstLogDate=logs.length?logs[logs.length-1].date:'';
    let monthCount=12;
    if(firstLogDate){
      const f=new Date(firstLogDate+'T12:00:00');
      const diff=(now.getFullYear()-f.getFullYear())*12+(now.getMonth()-f.getMonth())+1;
      monthCount=Math.min(12,Math.max(1,diff));
    }
    for(let i=monthCount-1;i>=0;i--){
      const d=new Date(now.getFullYear(),now.getMonth()-i,1);
      const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      const cm={};
      logs.filter(l=>l.date.slice(0,7)===key).forEach(l=>{if(l.cat)cm[l.cat]=(cm[l.cat]||0)+l.dur;});
      const total=Object.values(cm).reduce((a,b)=>a+b,0);
      barData.push({label:d.toLocaleDateString('en',{month:'short'}),total,isCurrent:i===0,segments:Object.entries(cm).map(([cid,mins])=>({cat:catFor(cid),mins}))});
    }
    heroTitle='All Time';
    heroMins=logs.reduce((a,l)=>a+l.dur,0)+liveMins;
    // Count distinct active days, not log entries. A 72-hour T-tape session
    // is one entry but three days of real tension — session counts misread
    // long-wear work as low activity.
    const _allActiveDays=new Set(logs.map(l=>l.date)).size;
    const _startFmt=char.startDate
      ?new Date(char.startDate+'T12:00:00').toLocaleDateString('en',{month:'short',year:'numeric'})
      :'';
    comparisonLine=_allActiveDays
      ?`${_allActiveDays} active day${_allActiveDays!==1?'s':''}${_startFmt?` since ${_startFmt}`:''}`
      :'Your journey starts with the first session.';
    showCalendar=false;
  }

  // ── Hero card ──
  const heroCard=`<div class="card" style="margin-bottom:12px;padding:20px 16px;text-align:center">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin-bottom:8px">${heroTitle}</div>
    <div style="font-family:var(--font-display);font-size:36px;font-weight:900;color:var(--accent);line-height:1;margin-bottom:8px">${fmtDur(heroMins)}</div>
    <div style="font-size:11px;color:var(--text4)">${comparisonLine}</div>
  </div>`;

  // ── Bar chart ──
  const maxM=Math.max(...barData.map(w=>w.total),1);
  const bars=barData.map(({label,total,segments,isCurrent})=>{
    const totalH=total>0?Math.max(2,Math.round((total/maxM)*88)):0;
    let segs='';
    if(total>0){
      const sorted=[...segments].sort((a,b)=>b.mins-a.mins);
      let used=0;
      sorted.forEach(({cat,mins},idx)=>{
        const last=idx===sorted.length-1;
        const sh=last?(totalH-used):Math.max(1,Math.round((mins/total)*totalH));
        used+=sh;
        segs+=`<div style="height:${sh}px;background:${cat.color};width:100%;flex-shrink:0" title="${cat.label}: ${fmtDur(mins)}"></div>`;
      });
    }
    return`<div class="bar-col"><div class="bar-val">${total>0?fmtDur(total):''}</div><div style="display:flex;flex-direction:column-reverse;height:${totalH}px;width:100%;border-radius:3px 3px 0 0;overflow:hidden">${segs}</div><div class="bar-lbl" style="color:${isCurrent?'var(--accent)':'var(--text4)'}">${label}</div></div>`;
  }).join('');
  const barCard=`<div class="card" style="margin-bottom:12px">${barData.some(d=>d.total>0)?`<div class="bar-wrap">${bars}</div>`:`<div style="text-align:center;padding:26px 16px;color:var(--text5);font-size:12px;line-height:1.7"><div style="font-size:26px;margin-bottom:8px;opacity:.5">📊</div>No sessions in this period yet.<br><span style="font-size:10px;color:var(--text6)">Start a session to see your activity here.</span></div>`}</div>`;

  // ── Method Breakdown (scoped) ──
  const methodTotals={};
  scopedLogs.forEach(l=>{
    if(!l.method)return;
    if(!methodTotals[l.method])methodTotals[l.method]={mins:0,cat:l.cat};
    methodTotals[l.method].mins+=l.dur;
  });
  const liveInScope=(scope==='week')||(scope==='month'&&calendarMonthKey===td.slice(0,7))||(scope==='all');
  if(liveInScope&&activeTimer&&activeTimer.startedAt){
    const lm=activeTimer.method||'Session';
    const lc=activeTimer.cat||'manual';
    const lmins=liveTimerTodayMins();
    if(lmins>0){
      if(!methodTotals[lm])methodTotals[lm]={mins:0,cat:lc};
      methodTotals[lm].mins+=lmins;
    }
  }
  const usedMethods=Object.entries(methodTotals).sort((a,b)=>b[1].mins-a[1].mins);
  const totM=usedMethods.reduce((a,[,v])=>a+v.mins,0)||1;
  const methodBars=usedMethods.map(([method,{mins,cat}])=>{
    const c=catFor(cat);
    const p=Math.round((mins/totM)*100);
    const pLabel=(p===0&&mins>0)?'<1%':`${p}%`;
    return`<div style="margin-bottom:9px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
        <span style="color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;margin-right:8px">${method}</span>
        <span style="color:${c.color};flex-shrink:0">${fmtDur(mins)} · ${pLabel}</span>
      </div>
      <div style="height:7px;background:var(--bg-stat);border-radius:4px;overflow:hidden"><div style="height:100%;border-radius:4px;background:${c.color};width:${p}%;transition:width .6s"></div></div>
    </div>`;
  }).join('');
  const scopedMins=scopedLogs.reduce((a,l)=>a+l.dur,0);
  // Count distinct active days, not log entries — one 72-hour T-tape session
  // is a single entry but three days of real tension.
  const scopedDays=new Set(scopedLogs.map(l=>l.date)).size;
  const methodCard=`<div class="card" style="margin-bottom:12px">
    ${methodBars||`<div style="color:var(--text5);font-size:11px;text-align:center;padding:14px;line-height:1.7">No methods logged in this period.</div>`}
    ${usedMethods.length?`<div style="border-top:1px solid var(--stat-border);margin-top:6px;padding-top:6px;font-size:10px;color:var(--text5);text-align:right">${scopedDays} active day${scopedDays!==1?'s':''} · ${fmtDur(scopedMins)} total</div>`:''}
  </div>`;

  // ── Calendar (month scope only, collapsed by default) ──
  let calendarBlock='';
  if(showCalendar){
    const [yy,mm]=calendarMonthKey.split('-').map(Number);
    const year=yy, month=mm-1;
    const daysInM=new Date(year,month+1,0).getDate();
    const calDays=[];
    const firstDow=new Date(year,month,1).getDay();
    for(let i=0;i<firstDow;i++)calDays.push(null);
    for(let d=1;d<=daysInM;d++)calDays.push(`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
    const activeDays=new Set(logs.map(l=>l.date));
    if(activeTimer&&activeTimer.startedAt){
      const _sMs=activeTimer.wallStart||Date.now()-(timerSecs*1000);
      let _cur=new Date(_sMs);const _now=new Date();
      while(_cur<=_now){activeDays.add(localDateStr(_cur));_cur.setDate(_cur.getDate()+1);}
    }
    const goalDaysSet=new Set();
    const _retainingExcl=char.countRetainingInGoal===false;
    calDays.filter(Boolean).forEach(d=>{
      const _logM=logs.filter(l=>l.date===d&&(!_retainingExcl||l.cat!=='retaining')).reduce((a,l)=>a+l.dur,0);
      const _liveM=(!_retainingExcl||activeTimer?.cat!=='retaining')?liveTimerMinsForDate(d):0;
      if(_logM+_liveM>=(char.dailyGoalMin||120))goalDaysSet.add(d);
    });
    const restDaySet=new Set(char.restDays||[]);
    const dayMinsMap={};
    logs.filter(l=>l.date.slice(0,7)===calendarMonthKey).forEach(l=>{dayMinsMap[l.date]=(dayMinsMap[l.date]||0)+l.dur;});
    if(activeTimer&&activeTimer.startedAt){
      calDays.filter(Boolean).forEach(d=>{const _dlm=liveTimerMinsForDate(d);if(_dlm>0)dayMinsMap[d]=(dayMinsMap[d]||0)+_dlm;});
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
    const activeCount=calDays.filter(d=>d&&activeDays.has(d)).length;
    const nowD=new Date(),todayYear=nowD.getFullYear(),todayMonth=nowD.getMonth();
    const canGoNext=!(year===todayYear&&month===todayMonth);
    const firstLogDate=logs.length?logs[logs.length-1].date.slice(0,7):'2020-01';
    const canGoPrev=(`${year}-${String(month+1).padStart(2,'0')}`)>firstLogDate;
    const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthName=`${monthNames[month]} ${year}`;
    calendarBlock=`
      <div class="sec-title">Activity</div>
      <div class="card" style="margin-bottom:12px">
        <button onclick="toggleRepCal()" style="width:100%;display:flex;align-items:center;gap:10px;padding:0;background:none;border:none;cursor:pointer;font-family:var(--font-body);text-align:left">
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text1);margin-bottom:3px">${activeCount} of ${daysInM} days active</div>
            <div style="font-size:10px;color:var(--text4)">${monthName}</div>
          </div>
          <span style="font-size:11px;color:var(--text5);transform:rotate(${_repCalExpanded?'180':'0'}deg);transition:transform .2s">▾</span>
        </button>
        ${_repCalExpanded?`
          <div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 8px;padding-top:12px;border-top:1px solid var(--stat-border)">
            <button onclick="repNavPrev()" ${!canGoPrev?'disabled':''} style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:4px 10px;font-size:13px;color:${canGoPrev?'var(--text2)':'var(--text6)'};cursor:${canGoPrev?'pointer':'default'};font-family:var(--font-body);opacity:${canGoPrev?1:0.35}">‹</button>
            <span style="font-size:11px;font-weight:600;color:var(--text2)">${monthName}</span>
            <button onclick="repNavNext()" ${!canGoNext?'disabled':''} style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:4px 10px;font-size:13px;color:${canGoNext?'var(--text2)':'var(--text6)'};cursor:${canGoNext?'pointer':'default'};font-family:var(--font-body);opacity:${canGoNext?1:0.35}">›</button>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text5);margin-bottom:4px"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
          <div class="cal-grid">${calDots}</div>
          <div style="display:flex;gap:10px;margin-top:7px;font-size:9px;color:var(--text4);flex-wrap:wrap">
            <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:var(--acc45);vertical-align:middle;margin-right:3px"></span>Active</span>
            <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:rgba(34,168,90,.55);vertical-align:middle;margin-right:3px"></span>Goal met</span>
            <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:rgba(100,120,200,.4);vertical-align:middle;margin-right:3px"></span>Rest day</span>
            <span><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.6);border:1px solid var(--text4);vertical-align:middle;margin-right:3px"></span>Has note</span>
            <span><span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:transparent;border:1.5px solid var(--accent);vertical-align:middle;margin-right:3px"></span>Today</span>
          </div>
        `:''}
      </div>`;
  }

  // ── Session History (scoped) ──
  const histByMethod={};
  scopedLogs.forEach(l=>{
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
      const moreBtn=sess.length>PAGE?`<button onclick="(function(){var el=document.getElementById('${uid}-more');el.style.display='block';this.remove();})()" style="width:100%;padding:8px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body);margin-top:4px">Show all ${sess.length} sessions ▾</button><div id="${uid}-more" style="display:none">${renderRows(sess.slice(PAGE))}</div>`:'';
      return`<div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:10px;margin-bottom:7px;overflow:hidden">
        <button onclick="(function(){var d=document.getElementById('${uid}');d.style.display=d.style.display==='none'?'block':'none';})()"
          style="width:100%;display:flex;gap:10px;align-items:center;padding:10px;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)">
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
      ?`<div id="hist-rest" style="display:none">${_histSorted.slice(3).map(_buildHCard).join('')}</div><button onclick="document.getElementById('hist-rest').style.display='block';this.remove()" style="width:100%;padding:10px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;font-size:12px;color:var(--text3);cursor:pointer;font-family:var(--font-body);margin-bottom:7px">Show ${_histSorted.length-3} more method${_histSorted.length-3!==1?'s':''} ▾</button>`:'')
    :`<div class="empty">No sessions in this period.</div>`;

  return`${scopeBar}
  ${heroCard}
  ${barCard}
  <div class="sec-title">Method Breakdown</div>
  ${methodCard}
  ${calendarBlock}
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
        ${totalMins>0?`<div style="font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--accent)">${fmtDur(totalMins)}</div>`:''}
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
        ?`<button onclick="showDayNoteEditor('${dateStr}')" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">✏ Edit note</button>`
        :`<button onclick="showDayNoteEditor('${dateStr}')" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">📝 Add a note for this day</button>`
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
      if(tab==='journey'&&_progressTab==='activity'){const c=document.getElementById('content');if(c){c.innerHTML=renderJourney();attachEvents();}}
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
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:2px">Day Note</div>
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
      style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--text1);font-size:13px;width:100%;outline:none;resize:vertical;min-height:80px;font-family:var(--font-body);margin-bottom:14px">${existing?htmlEsc(existing.note):''}</textarea>
    <div style="display:flex;gap:8px">
      ${existing?`<button onclick="deleteDayNote('${dateStr}')" style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:#a03232;cursor:pointer;font-family:var(--font-body)">Delete</button>`:''}
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
  if(tab==='journey'&&_progressTab==='activity'){const c=document.getElementById('content');if(c){c.innerHTML=renderJourney();attachEvents();}}
}

function deleteDayNote(dateStr){
  if(!char.dayNotes)return;
  delete char.dayNotes[dateStr];
  saveChar();
  document.getElementById('note-editor-ov')?.remove();
  document.getElementById('day-detail-ov')?.remove(); 
  showToast('Note deleted');
  if(tab==='journey'&&_progressTab==='activity'){const c=document.getElementById('content');if(c){c.innerHTML=renderJourney();attachEvents();}}
}

let expandedBadgeGroups=new Set(['first']); // first-steps open by default
function toggleBadgeGroup(id){
  if(expandedBadgeGroups.has(id))expandedBadgeGroups.delete(id);
  else expandedBadgeGroups.add(id);
  // Re-render the Progress tab (badges sub-tab) content
  const c=document.getElementById('content');
  if(c&&tab==='journey'&&_progressTab==='badges'){c.innerHTML=renderJourney();attachEvents();}
}

function renderBadgesBody(){
  const unlocked=char.achievements.length;
  const pct=Math.round(unlocked/ACHS.length*100);

  // Group definitions — just ids and labels. Badge membership is derived from
  // each ACHS entry's own `g:` field, so adding a new badge only requires
  // adding it to ACHS (with a `g:` value) — the wall picks it up automatically.
  const groups=[
    {id:'first',  label:'🌱 First Steps'},
    {id:'sess',   label:'◉ Sessions'},
    {id:'time',   label:'⏱ Time'},
    {id:'streak', label:'🔥 Streaks'},
    {id:'goal',   label:'🎯 Daily Goal'},
    {id:'method', label:'🧪 Methods'},
    {id:'photo',  label:'📸 Photos'},
    {id:'ci',     label:'◑ CI Progress'},
  ];

  // Bucket each badge by its `g:` field. A badge with a missing or unknown
  // group lands in an auto-generated "Other" group and logs a warning, so
  // nothing silently disappears from the wall.
  const knownGroupIds=new Set(groups.map(g=>g.id));
  const grouped={};
  for(const a of ACHS){
    const gid=knownGroupIds.has(a.g)?a.g:'other';
    if(gid==='other'&&a.g!=='other'){
      console.warn(`[RT] Badge "${a.id}" has missing or unknown group "${a.g}" — placed in "Other".`);
    }
    (grouped[gid]=grouped[gid]||[]).push(a);
  }
  if(grouped.other&&grouped.other.length)groups.push({id:'other',label:'• Other'});

  const groupHtml=groups.map(g=>{
    const groupAchs=grouped[g.id]||[];
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
        style="width:100%;display:flex;align-items:center;gap:10px;padding:12px;background:none;border:none;cursor:pointer;font-family:var(--font-body);text-align:left">
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

  return`<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
    <div style="flex:1;height:7px;background:var(--bg-stat);border-radius:4px;overflow:hidden">
      <div style="height:100%;background:linear-gradient(90deg,var(--acc18),var(--accent));width:${pct}%;border-radius:4px;transition:width .6s"></div>
    </div>
    <div style="font-size:11px;color:var(--text4);flex-shrink:0">${unlocked} / ${ACHS.length}</div>
  </div>
  ${groupHtml}`;
}

// ── ONBOARDING (new user) ─────────────────────────────────────────────────────
// Four-step wizard: You → Journey → Methods → Ready.
// State lives on window._ob* so step navigation doesn't require a full re-render.
// Everything commits via createProfile() at the very end.
const OB_STEPS=4;

function renderOnboarding(){
  // Fresh state each time we enter onboarding
  window._obStep=1;
  window._obCurrent=null;
  window._obStartMode='same';
  window._obStart=null;
  window._obGoal=10;
  window._obDailyGoal=120;
  window._obName='';
  window._obMethods=new Set();
  window._obCustomMethods=new Set();

  document.getElementById('root').innerHTML=`<div class="pscreen" id="ob-screen">
    <div style="text-align:center;margin-bottom:20px;margin-top:4px">
      <div style="font-family:var(--font-display);font-size:24px;color:var(--accent);letter-spacing:3px;margin-bottom:6px">◉ RESTORETRACK</div>
      <div id="ob-step-dots" style="display:flex;gap:6px;justify-content:center;margin-top:12px"></div>
    </div>
    <div id="ob-step-body" style="width:100%"></div>
    <div id="ob-step-nav" style="width:100%;margin-top:14px"></div>
    <div style="width:100%;margin-top:24px;padding-top:16px;border-top:1px solid var(--stat-border);text-align:center">
      <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.7">Already have a profile from another device?</div>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn-ghost" id="ob-cloud-restore" style="padding:8px 14px;font-size:11px">☁ Restore from Cloud</button>
        <button class="btn-ghost" id="ob-import-backup" style="padding:8px 14px;font-size:11px">Import Backup File</button>
      </div>
      <div style="font-size:9px;color:var(--text6);margin-top:10px;line-height:1.6">Cloud restore requires the same Google account used when you backed up.</div>
      <input type="file" id="ob-restore-file" accept=".json" style="display:none">
    </div>
  </div>`;

  document.getElementById('ob-cloud-restore')?.addEventListener('click',onboardingCloudRestore);
  document.getElementById('ob-import-backup')?.addEventListener('click',()=>document.getElementById('ob-restore-file').click());
  document.getElementById('ob-restore-file')?.addEventListener('change',e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{importBackup(ev.target.result);};
    reader.readAsText(file);e.target.value='';
  });

  obRenderStep();
}

function obRenderDots(){
  const el=document.getElementById('ob-step-dots');
  if(!el)return;
  el.innerHTML=Array.from({length:OB_STEPS},(_,i)=>{
    const active=(i+1)===window._obStep;
    const done=(i+1)<window._obStep;
    return`<div style="width:${active?'20px':'8px'};height:8px;border-radius:4px;background:${active?'var(--accent)':done?'var(--acc45)':'var(--stat-border)'};transition:all .25s"></div>`;
  }).join('');
}

function obRenderNav(){
  const el=document.getElementById('ob-step-nav');
  if(!el)return;
  const step=window._obStep;
  const isFirst=step===1;
  const isLast=step===OB_STEPS;
  if(isFirst){
    el.innerHTML=`<button class="btn-gold" id="ob-next" style="width:100%;padding:14px;font-size:14px;letter-spacing:.5px">Continue</button>`;
  } else if(isLast){
    el.innerHTML=`<button class="btn-gold" id="ob-commit" style="width:100%;padding:14px;font-size:14px;letter-spacing:.5px;margin-bottom:8px">Enter RestoreTrack</button>
      <button class="btn-ghost" id="ob-back" style="width:100%;padding:11px;font-size:12px">← Back</button>`;
  } else {
    el.innerHTML=`<button class="btn-gold" id="ob-next" style="width:100%;padding:14px;font-size:14px;letter-spacing:.5px;margin-bottom:8px">Continue</button>
      <button class="btn-ghost" id="ob-back" style="width:100%;padding:11px;font-size:12px">← Back</button>`;
  }
  document.getElementById('ob-next')?.addEventListener('click',obNext);
  document.getElementById('ob-back')?.addEventListener('click',obBack);
  document.getElementById('ob-commit')?.addEventListener('click',obCommit);
}

function obNext(){
  if(window._obStep>=OB_STEPS)return;
  if(window._obStep===1){
    const name=(document.getElementById('ob-name')?.value||'').trim();
    if(!name){showToast('Please enter a name');return;}
    window._obName=name;
  }
  if(window._obStep===2){
    if(window._obCurrent===null){showToast('Pick your current CI level');return;}
  }
  window._obStep++;
  obRenderStep();
}

function obBack(){
  if(window._obStep<=1)return;
  window._obStep--;
  obRenderStep();
}

function obRenderStep(){
  obRenderDots();
  obRenderNav();
  const body=document.getElementById('ob-step-body');
  if(!body)return;
  if(window._obStep===1)body.innerHTML=obStepYou();
  else if(window._obStep===2)body.innerHTML=obStepJourney();
  else if(window._obStep===3)body.innerHTML=obStepMethods();
  else if(window._obStep===4)body.innerHTML=obStepReady();
  if(window._obStep===1)obWireYou();
  else if(window._obStep===2)obWireJourney();
  else if(window._obStep===3)obWireMethods();
}

// ── Step 1: You (name + theme) ──
function obStepYou(){
  const themeChips=THEMES.map(t=>`<div class="theme-chip${currentTheme===t.id?' sel':''}" data-tid="${t.id}" onclick="selectTheme('${t.id}')">
    <div class="theme-swatch" style="background:${t.bg}">
      <div style="display:flex;gap:3px"><div class="tdot" style="background:${t.accent}"></div><div class="tdot" style="background:${t.mid}"></div><div class="tdot" style="background:${t.text}"></div></div>
      <div class="theme-lbl" style="color:${t.text}">${t.name}</div>
    </div>
  </div>`).join('');

  return`<div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:22px;margin-bottom:12px">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:10px">Your Name</div>
    <input class="gold-inp" id="ob-name" placeholder="Display name" maxlength="20" value="${htmlEsc(window._obName||'')}" style="font-size:15px;margin-bottom:24px">

    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px">Choose Your Theme</div>
    <div style="font-size:11px;color:var(--text4);margin-bottom:12px;line-height:1.6">Pick the vibe that feels right — you can change this anytime.</div>
    <div class="theme-row" style="margin-bottom:0">${themeChips}</div>
  </div>`;
}

function obWireYou(){
  document.getElementById('ob-name')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();obNext();}
  });
}

// ── Step 2: Journey (CI + daily goal) ──
function obStepJourney(){
  const gridBtn=(val,selected,fn)=>
    `<button onclick="${fn}" style="padding:9px 0;border-radius:8px;font-family:var(--font-display);font-size:12px;font-weight:700;cursor:pointer;transition:all .15s;background:${selected?'var(--accent)':'var(--bg-stat)'};border:1px solid ${selected?'var(--accent)':'var(--stat-border)'};color:${selected?'var(--bg)':'var(--text3)'}">${val}</button>`;

  const currentGrid=Array.from({length:11},(_,i)=>gridBtn(i,i===window._obCurrent,`obSetCurrent(${i})`)).join('');
  const currentDesc=window._obCurrent===null
    ?'<span style="color:var(--text5)">Tap a level to see its description.</span>'
    :`<span style="color:var(--text1);font-weight:600">${LEVELS[window._obCurrent].ci}</span><br><span style="color:var(--text3)">${ciDesc(LEVELS[window._obCurrent])}</span>`;

  const showStart=window._obStartMode==='lower'&&window._obCurrent!==null&&window._obCurrent>0;
  const startGrid=showStart
    ?Array.from({length:window._obCurrent},(_,i)=>gridBtn(i,i===window._obStart,`obSetStart(${i})`)).join('')
    :'';
  const startBlock=window._obCurrent!==null&&window._obCurrent>0?`
    <div style="margin-bottom:18px">
      <div style="font-size:11px;color:var(--text2);font-weight:600;margin-bottom:8px">Did you start at a lower CI level?</div>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <button data-choice="same" class="ob-start-btn" style="flex:1;padding:9px;border-radius:8px;font-size:11px;cursor:pointer;background:${window._obStartMode==='same'?'var(--accent)':'var(--bg-stat)'};border:1px solid ${window._obStartMode==='same'?'var(--accent)':'var(--stat-border)'};color:${window._obStartMode==='same'?'var(--bg)':'var(--text3)'};font-family:var(--font-body);font-weight:600;transition:all .15s">No, I'm starting now</button>
        <button data-choice="lower" class="ob-start-btn" style="flex:1;padding:9px;border-radius:8px;font-size:11px;cursor:pointer;background:${window._obStartMode==='lower'?'var(--accent)':'var(--bg-stat)'};border:1px solid ${window._obStartMode==='lower'?'var(--accent)':'var(--stat-border)'};color:${window._obStartMode==='lower'?'var(--bg)':'var(--text3)'};font-family:var(--font-body);font-weight:600;transition:all .15s">Yes, I started lower</button>
      </div>
      ${showStart?`<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px">${startGrid}</div>`:''}
    </div>`:'';

  const showGoal=window._obCurrent!==null&&window._obCurrent<10;
  const minGoal=window._obCurrent!==null?window._obCurrent+1:1;
  const goalGrid=showGoal
    ?Array.from({length:11-minGoal},(_,i)=>gridBtn(minGoal+i,minGoal+i===window._obGoal,`obSetGoal(${minGoal+i})`)).join('')
    :'';
  const goalBlock=showGoal?`
    <div style="margin-bottom:18px">
      <div style="font-size:11px;color:var(--text2);font-weight:600;margin-bottom:8px">What's your goal?</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">${goalGrid}</div>
    </div>`:'';

  const presets=[30,60,90,120,180];
  const presetBtns=presets.map(v=>{
    const sel=window._obDailyGoal===v;
    return`<button data-ob-preset="${v}" onclick="obSetDailyGoal(${v})" style="padding:10px 0;border-radius:8px;font-family:var(--font-display);font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;background:${sel?'var(--accent)':'var(--bg-stat)'};border:1px solid ${sel?'var(--accent)':'var(--stat-border)'};color:${sel?'var(--bg)':'var(--text3)'}">${v}</button>`;
  }).join('');

  return`
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:22px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px">Your CI Journey</div>
      <div style="font-size:11px;color:var(--text4);margin-bottom:16px;line-height:1.65">The Coverage Index runs from CI-0 (no loose skin) to CI-10 (fully restored). You can adjust any of these later.</div>

      <div style="font-size:11px;color:var(--text2);font-weight:600;margin-bottom:8px">Where are you now?</div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-bottom:10px">${currentGrid}</div>
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px 12px;font-size:11px;color:var(--text3);line-height:1.6;min-height:70px;margin-bottom:16px">${currentDesc}</div>

      ${startBlock}
      ${goalBlock}

      <div style="font-size:11px;color:var(--text2);font-weight:600;margin-bottom:8px">Daily goal</div>
      <div style="font-size:10px;color:var(--text4);margin-bottom:10px;line-height:1.6">A personal target, not a prescription. Pick something you can hit most days — you can change it anytime.</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-bottom:8px">${presetBtns}</div>
      <div style="display:flex;align-items:center;gap:8px;justify-content:center">
        <span style="font-size:10px;color:var(--text5)">Custom:</span>
        <input type="number" id="ob-goal-input" min="5" max="1440" value="${window._obDailyGoal}" class="goal-inp" style="width:70px">
        <span style="font-size:10px;color:var(--text5)">minutes</span>
      </div>
    </div>`;
}

function obWireJourney(){
  document.querySelectorAll('.ob-start-btn').forEach(btn=>{
    btn.onclick=()=>{
      window._obStartMode=btn.dataset.choice;
      if(window._obStartMode==='same')window._obStart=null;
      obRenderStep();
    };
  });
  const inp=document.getElementById('ob-goal-input');
  if(inp){
    inp.addEventListener('input',()=>{
      const v=Math.max(5,Math.min(1440,parseInt(inp.value)||120));
      window._obDailyGoal=v;
      document.querySelectorAll('[data-ob-preset]').forEach(b=>{
        const num=parseInt(b.dataset.obPreset);
        const sel=num===v;
        b.style.background=sel?'var(--accent)':'var(--bg-stat)';
        b.style.borderColor=sel?'var(--accent)':'var(--stat-border)';
        b.style.color=sel?'var(--bg)':'var(--text3)';
      });
    });
  }
}

function obSetCurrent(val){
  const prev=window._obCurrent;
  window._obCurrent=val;
  if(prev!==val){
    if(window._obStart!==null&&window._obStart>=val)window._obStart=null;
    if(window._obGoal<=val)window._obGoal=Math.min(10,val+1);
  }
  if(val===0)window._obStartMode='same';
  obRenderStep();
}
function obSetStart(val){window._obStart=val;obRenderStep();}
function obSetGoal(val){window._obGoal=val;obRenderStep();}
function obSetDailyGoal(val){window._obDailyGoal=val;obRenderStep();}

// ── Step 3: Methods ──
function obStepMethods(){
  return`
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:22px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px">Your Methods <span style="color:var(--text5);font-weight:400;letter-spacing:0;text-transform:none">— optional</span></div>
      <div style="font-size:11px;color:var(--text4);margin-bottom:14px;line-height:1.65">Add the methods or devices you use or plan to use. This keeps the session screen focused — you can add more anytime.</div>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <input id="ob-method-input" class="gold-inp" placeholder="Type a method or device…" maxlength="40" list="ob-method-suggestions" autocomplete="off" style="flex:1;margin:0;font-size:12px;padding:9px 10px">
        <button type="button" id="ob-method-add" class="btn-outline" style="padding:0 14px;white-space:nowrap;font-size:12px">+ Add</button>
      </div>
      <datalist id="ob-method-suggestions"></datalist>
      <div id="ob-methods-list" style="display:flex;flex-wrap:wrap;gap:5px;min-height:48px;padding:10px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px"></div>
    </div>`;
}

function obWireMethods(){
  const knownCats=CATS.filter(c=>c.id!=='custom');
  const allKnown=knownCats.flatMap(c=>c.methods);

  const datalist=document.getElementById('ob-method-suggestions');
  if(datalist)datalist.innerHTML=allKnown.map(m=>`<option value="${htmlEsc(m)}">`).join('');

  const renderList=()=>{
    const list=document.getElementById('ob-methods-list');
    if(!list)return;
    if(!window._obMethods.size){
      list.innerHTML='<span style="font-size:11px;color:var(--text5);font-style:italic">Nothing added yet — you can add methods later.</span>';
      return;
    }
    list.innerHTML=Array.from(window._obMethods).map(m=>{
      const cat=knownCats.find(c=>c.methods.includes(m));
      const color=cat?cat.color:'#E879F9';
      const icon=cat?cat.icon:'🛠️';
      const esc=htmlEsc(m);
      const escAttr=esc.replace(/'/g,'&#39;');
      return`<span style="display:inline-flex;align-items:center;gap:5px;background:${color}22;border:1px solid ${color}55;border-radius:20px;padding:5px 9px;font-size:11px;color:${color};font-family:var(--font-body)">
        <span>${icon}</span><span>${esc}</span>
        <button type="button" onclick="obRemoveMethod('${escAttr}')" style="background:none;border:none;color:${color};cursor:pointer;font-size:12px;padding:0 0 0 2px;line-height:1;opacity:.7">✕</button>
      </span>`;
    }).join('');
  };
  renderList();

  const add=()=>{
    const inp=document.getElementById('ob-method-input');
    const raw=(inp?.value||'').trim();
    if(!raw)return;
    // Match against known methods case-insensitively — if we find one, we use
    // its canonical spelling so future session logging stays consistent. If not,
    // whatever they typed is saved as-is and flagged as a custom method.
    const match=allKnown.find(m=>m.toLowerCase()===raw.toLowerCase());
    if(match){
      if(!window._obMethods.has(match))window._obMethods.add(match);
    } else {
      if(!window._obMethods.has(raw)){
        window._obMethods.add(raw);
        window._obCustomMethods.add(raw);
      }
    }
    if(inp){inp.value='';inp.focus();}
    renderList();
  };

  document.getElementById('ob-method-add').onclick=add;
  document.getElementById('ob-method-input')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();add();}
  });

  window.obRemoveMethod=(name)=>{
    window._obMethods.delete(name);
    window._obCustomMethods.delete(name);
    renderList();
  };
}

// ── Step 4: Ready ──
function obStepReady(){
  const cur=window._obCurrent;
  const start=(window._obStartMode==='lower'&&window._obStart!==null)?window._obStart:cur;
  const goal=Math.max(window._obGoal,cur>=10?10:cur+1);
  const startLabel=start===cur?`Starting at ${LEVELS[cur].ci}`:`Started at ${LEVELS[start].ci} · now at ${LEVELS[cur].ci}`;
  const methodCount=window._obMethods.size;

  return`
    <div style="width:100%;background:var(--bg-card-gold);border:1px solid var(--card-border-gold);border-radius:14px;padding:22px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:14px">You're Set</div>
      <div style="font-size:15px;font-weight:700;color:var(--text1);margin-bottom:14px">Welcome, ${htmlEsc(window._obName||'Restorer')}.</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--stat-border)">
          <span style="font-size:11px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px">Journey</span>
          <span style="font-size:12px;color:var(--text1);font-weight:600">${startLabel}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--stat-border)">
          <span style="font-size:11px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px">Goal</span>
          <span style="font-size:12px;color:var(--accent);font-weight:600">${LEVELS[goal].ci}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--stat-border)">
          <span style="font-size:11px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px">Daily goal</span>
          <span style="font-size:12px;color:var(--text1);font-weight:600">${window._obDailyGoal} min</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0">
          <span style="font-size:11px;color:var(--text4);text-transform:uppercase;letter-spacing:.7px">Methods</span>
          <span style="font-size:12px;color:var(--text1);font-weight:600">${methodCount?`${methodCount} added`:'None yet'}</span>
        </div>
      </div>
    </div>

    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:20px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:14px">Good to Know</div>

      <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px">
        <span style="font-size:18px;flex-shrink:0;line-height:1">🔒</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:3px">Your data stays private</div>
          <div style="font-size:11px;color:var(--text4);line-height:1.6">Sessions, photos, and notes are stored on this device only. Cloud backup is optional and off by default.</div>
        </div>
      </div>

      <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px">
        <span style="font-size:18px;flex-shrink:0;line-height:1">💬</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:3px">A Coach is built in</div>
          <div style="font-size:11px;color:var(--text4);line-height:1.6">Tap <strong style="color:var(--text2)">Ask Coach</strong> on the Home tab to ask about methods, timelines, plateaus, or motivation — any time.</div>
        </div>
      </div>

      <div style="display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:18px;flex-shrink:0;line-height:1">📅</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text1);margin-bottom:3px">The timeline is not linear</div>
          <div style="font-size:11px;color:var(--text4);line-height:1.6">First visible changes usually appear around 3–6 months. Take a baseline photo soon — you'll thank yourself later.</div>
        </div>
      </div>
    </div>

    <div style="width:100%;background:var(--bg-card);border:1px solid var(--stat-border);border-radius:14px;padding:16px 18px;margin-bottom:12px">
      <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer">
        <input type="checkbox" id="ob-photolock" style="width:18px;height:18px;accent-color:var(--accent);cursor:pointer;flex-shrink:0;margin-top:2px">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1);margin-bottom:3px">🔒 Enable Photos Lock</div>
          <div style="font-size:11px;color:var(--text4);line-height:1.6">Optional 4-digit PIN that protects the Photos tab when the app opens. You can turn it on or off anytime from Profile → Photos Lock.</div>
        </div>
      </label>
    </div>

    <div style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:12px;padding:12px 16px;margin-bottom:8px">
      <div style="font-size:11px;color:var(--text4);line-height:1.75;text-align:center">
        RestoreTrack is a personal tracker, not medical advice.<br>See a clinician for medical concerns.
      </div>
    </div>`;
}

function obCommit(){
  const n=(window._obName||'').trim();
  if(!n){showToast('Please enter a name');window._obStep=1;obRenderStep();return;}
  if(window._obCurrent===null){showToast('Please pick your current CI level');window._obStep=2;obRenderStep();return;}
  const cur=window._obCurrent;
  const start=(window._obStartMode==='lower'&&window._obStart!==null)?window._obStart:cur;
  const goal=Math.max(window._obGoal,cur>=10?10:cur+1);
  const dg=Math.max(5,Math.min(1440,window._obDailyGoal||120));
  const wantPhotoLock=!!document.getElementById('ob-photolock')?.checked;
  createProfile(n,start,cur,goal,Array.from(window._obMethods),Array.from(window._obCustomMethods),dg);
  if(wantPhotoLock){
    // Flag so mountPhotosLockSetup knows to return to Home, not Profile.
    window._obPhotoLockPostSetup=true;
    setTimeout(()=>mountPhotosLockSetup(),500);
  } else {
    setTimeout(()=>showToast(`Welcome, ${n} 👋`),300);
  }
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
    renderOnboarding();
    return;
  }

  // ── SETTINGS PANEL (existing user) ─────────────────────────────────────────
  const joined=profiles[0]?.createdAt||today();
  const hoursLabel=char.minutes<60?`${char.minutes}m`:`${Math.floor(char.minutes/60)}h`;
  const _secLabel=(text)=>`<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text4);margin:20px 0 8px;padding-left:2px">${text}</div>`;
  document.getElementById('root').innerHTML=`<div class="pscreen">
    <div style="width:100%;position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:18px;min-height:32px">
      <button id="cancel-p" style="position:absolute;left:0;top:50%;transform:translateY(-50%);background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text3);padding:0;font-family:var(--font-body);font-size:16px;line-height:1">‹</button>
      <div style="font-family:var(--font-display);font-size:18px;color:var(--accent);letter-spacing:2px">◉ RESTORETRACK</div>
    </div>

    <!-- Hero card -->
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:14px;padding:18px;margin-bottom:4px">
      <div style="display:flex;align-items:center;gap:14px">
        ${identityAvatar(char.name,52)}
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:16px;color:var(--text1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${char.name}</div>
          <div style="font-size:11px;color:var(--text4);margin-top:3px">${LEVELS[char.ciLevel||0].ci} · ${char.sessions} session${char.sessions!==1?'s':''}</div>
          <div style="font-size:10px;color:var(--text5);margin-top:2px">Since ${fmtDate(joined)}</div>
        </div>
        <button onclick="showRenameInline()" title="Rename" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text4);flex-shrink:0;padding:0">${IC.edit(14)}</button>
      </div>
      <div id="rename-inline" style="display:none;margin-top:14px">
        <div style="display:flex;gap:7px">
          <input id="rename-val" class="gold-inp" style="flex:1;margin:0;font-size:13px;padding:8px 10px" maxlength="20" placeholder="New name..." value="${char.name}">
          <button onclick="saveRenameInline()" style="background:var(--accent);border:none;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;color:var(--bg);cursor:pointer;font-family:var(--font-body)">Save</button>
          <button onclick="document.getElementById('rename-inline').style.display='none'" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:8px 10px;font-size:12px;color:var(--text4);cursor:pointer;font-family:var(--font-body)">✕</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1px 1fr 1px 1fr;gap:0;margin-top:16px;padding-top:16px;border-top:1px solid var(--stat-border)">
        <div style="text-align:center;padding:2px 4px">
          <div style="font-family:var(--font-display);font-size:19px;font-weight:700;color:var(--text1);line-height:1">${hoursLabel}</div>
          <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.7px;margin-top:6px">Hours</div>
        </div>
        <div style="background:var(--stat-border)"></div>
        <div style="text-align:center;padding:2px 4px">
          <div style="font-family:var(--font-display);font-size:19px;font-weight:700;color:var(--accent);line-height:1">${char.achievements.length}<span style="font-size:13px;color:var(--text4);font-weight:600">/${ACHS.length}</span></div>
          <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.7px;margin-top:6px">Badges</div>
        </div>
        <div style="background:var(--stat-border)"></div>
        <div style="text-align:center;padding:2px 4px">
          <div style="font-family:var(--font-display);font-size:19px;font-weight:700;color:var(--text1);line-height:1">${photos.length}</div>
          <div style="font-size:9px;color:var(--text5);text-transform:uppercase;letter-spacing:.7px;margin-top:6px">Photos</div>
        </div>
      </div>
    </div>

    ${_secLabel('Appearance')}
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px;padding:16px">
      <div class="theme-row" style="margin-bottom:0">${chips}</div>
    </div>

    ${_secLabel('Privacy')}
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px;padding:16px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:16px;flex-shrink:0">🔒</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Photos Lock</div>
          <div style="font-size:10px;color:var(--text4);margin-top:2px">${char.photoLockEnabled?'On · Locked on app open':'Off · Tap below to enable'}</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:12px;line-height:1.6">
        ${char.photoLockEnabled?'Unlock with biometrics or your 4-digit PIN when the app opens.':'Protect your photos with biometrics or a 4-digit PIN.'}
      </div>
      ${char.photoLockEnabled?`
        ${biometricAvailable()?`<button id="plock-bio-btn" class="btn-outline" style="width:100%;padding:10px;font-size:12px;margin-bottom:8px">${char.photoLockCredentialId?'✓ Biometric enabled — tap to change':'✨ Enable biometric unlock'}</button>`:''}
        ${char.photoLockCredentialId?`<button id="plock-bio-remove-btn" style="background:none;border:none;color:var(--text5);font-size:11px;cursor:pointer;font-family:var(--font-body);padding:0;margin-bottom:10px;display:block;width:100%;text-align:center;text-decoration:underline;text-underline-offset:3px">Remove biometric unlock</button>`:''}
        <button id="plock-change-btn" class="btn-outline" style="width:100%;padding:10px;font-size:12px;margin-bottom:8px">Change PIN</button>
        <button id="plock-disable-btn" class="btn-ghost" style="width:100%;padding:10px;font-size:12px">Turn Off Photos Lock</button>
      `:`
        <button id="plock-enable-btn" class="btn-gold" style="width:100%;padding:11px;font-size:13px">Enable Photos Lock</button>
      `}
    </div>

    ${_secLabel('Backup & Data')}
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px">
      <div style="padding:14px 16px;border-bottom:1px solid var(--stat-border)">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">☁️</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text1)">Cloud backup</div>
            <div style="font-size:11px;color:${fbIsGoogle&&fbUID?'var(--green)':'var(--text4)'};margin-top:2px;display:flex;align-items:center;gap:5px">
              <span style="width:6px;height:6px;border-radius:50%;background:${fbIsGoogle&&fbUID?'var(--green)':'var(--text5)'};flex-shrink:0"></span>
              ${fbIsGoogle&&fbUID?`Connected as ${htmlEsc(fbUserEmail||'your Google account')}`:'Not connected'}
            </div>
          </div>
        </div>
        ${fbIsGoogle&&fbUID?`
          ${char.lastCloudBackup?`<div style="font-size:10px;color:var(--green);margin-top:10px">✓ Last backup: ${new Date(char.lastCloudBackup).toLocaleDateString()}</div>`:`<div style="font-size:10px;color:var(--text5);margin-top:10px">No backup yet — back up now.</div>`}
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn-gold" id="cloud-backup-btn" style="flex:1;padding:10px;font-size:12px">Back Up Now</button>
            <button class="btn-ghost" id="cloud-restore-btn" style="flex:1;padding:10px;font-size:12px">Restore</button>
          </div>
          <button onclick="signOutDevice()" style="background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:var(--font-body);padding:0;margin-top:10px;text-decoration:underline">Sign out of this device</button>
        `:`
          <div style="font-size:11px;color:var(--text4);margin-top:10px;line-height:1.65">
            Back up your sessions, photos, and progress to your Google account — restore on any device with the same account.
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:8px;line-height:1.6;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 11px">
            🔒 <strong style="color:var(--text2)">Private to you.</strong> Connecting also enables Community — use it or stay hidden. Your data is never shared.
          </div>
          <button class="btn-gold" onclick="tab='community';showProfileScreen=false;render()" style="width:100%;padding:11px;font-size:13px;margin-top:12px">Connect Google Account →</button>
        `}
      </div>

      <button id="backup-btn" style="width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;background:none;border:none;border-bottom:1px solid var(--stat-border);cursor:pointer;text-align:left;font-family:var(--font-body)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">⬇</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Export backup file</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">Save a full copy to this device</div>
        </div>
        <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
      </button>

      <button id="restore-btn" style="width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;background:none;border:none;border-bottom:1px solid var(--stat-border);cursor:pointer;text-align:left;font-family:var(--font-body)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">⬆</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Import backup file</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">Restore from a saved .json file</div>
        </div>
        <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
      </button>

      <button id="export-btn" style="width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">📊</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Export sessions (CSV)</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">Opens in Excel or Sheets · not a backup</div>
        </div>
        <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
      </button>

      <input type="file" id="restore-file" accept=".json" style="display:none">
    </div>
    <div style="font-size:10px;color:var(--text5);margin-top:8px;padding:0 4px;line-height:1.6">
      Your data lives on this device. Nothing is uploaded unless you set up Cloud Backup.
    </div>

    ${!isStandalone()?`${_secLabel('Get the App')}
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px">
      <button id="install-app-btn" style="width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">📱</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Install as App</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">Home Screen icon · full-screen · works offline</div>
        </div>
        <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
      </button>
    </div>`:''}

    ${_secLabel('Support')}
    <div style="width:100%;background:var(--bg-card);border:1px solid var(--card-border);border-radius:14px">
      <button id="feedback-btn" style="width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;background:none;border:none;border-bottom:1px solid var(--stat-border);cursor:pointer;text-align:left;font-family:var(--font-body)">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">✉</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text1)">Send feedback</div>
          <div style="font-size:11px;color:var(--text4);margin-top:2px">I read every message personally</div>
        </div>
        <span style="font-size:14px;color:var(--text5);flex-shrink:0">›</span>
      </button>
      <div style="display:flex;align-items:center;gap:12px;padding:14px 16px">
        <span style="font-size:16px;flex-shrink:0;width:20px;text-align:center;line-height:1">ℹ</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--text2)">RestoreTrack v2.6.1</div>
          <div style="font-size:10px;color:var(--text5);margin-top:2px">Personal tracker · Not medical advice</div>
        </div>
      </div>
    </div>

    <div style="width:100%;margin-top:20px;padding-top:20px;border-top:1px solid var(--stat-border);text-align:center">
      <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.6">This will permanently erase all your data, photos, and community presence.</div>
      <button onclick="confirmDeleteProfile()" style="background:none;border:1px solid rgba(200,50,50,.25);border-radius:8px;padding:9px 20px;font-size:12px;color:#a03232;cursor:pointer;font-family:var(--font-body)">Delete My Profile</button>
    </div>
  </div>`;

  document.getElementById('install-app-btn')?.addEventListener('click',mountInstallSheet);
  document.getElementById('feedback-btn')?.addEventListener('click',()=>{
    const version='v2.6.1';
    const subject=encodeURIComponent(`RestoreTrack ${version} Feedback`);
    const body=encodeURIComponent(`Hi,\n\nI'm using RestoreTrack ${version} and wanted to share:\n\n[Write your feedback, bug report, or suggestion here]\n\n---\nApp info: ${version} · CI-${char.ciLevel||0} · ${char.sessions} sessions`);
    window.location.href=`mailto:restoretrack@gmail.com?subject=${subject}&body=${body}`;
  });

  document.getElementById('cancel-p')?.addEventListener('click',()=>{showProfileScreen=false;render();});
  document.getElementById('plock-enable-btn')?.addEventListener('click',()=>{mountPhotosLockSetup();});
  document.getElementById('plock-disable-btn')?.addEventListener('click',()=>{disablePhotosLock();});
  document.getElementById('plock-change-btn')?.addEventListener('click',()=>{mountPhotosLockSetup();});
  document.getElementById('plock-bio-btn')?.addEventListener('click',async()=>{
    // Toggle / re-register biometric
    try{
      const credId=await registerBiometric();
      char.photoLockCredentialId=credId;
      saveChar();
      showToast('✨ Biometric unlock enabled');
      renderProfileScreen();
    }catch(e){
      console.warn('[RT] biometric register failed',e);
      showToast('⚠ Biometric setup not available');
    }
  });
  document.getElementById('plock-bio-remove-btn')?.addEventListener('click',()=>{
    // Clear only the biometric credential. The PIN stays — this just removes
    // the quick-unlock convenience so the user can re-register if Face ID
    // changes, or drop back to PIN-only without disabling Photos Lock entirely.
    char.photoLockCredentialId='';
    saveChar();
    showToast('✓ Biometric unlock removed');
    renderProfileScreen();
  });
  document.getElementById('backup-btn')?.addEventListener('click',exportBackup);
  document.getElementById('export-btn')?.addEventListener('click',exportCSV);
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
  // If Photos Lock is on and photos exist, require unlock before uploading.
  if (char.photoLockEnabled && !_photosUnlocked && photos.length) {
    const ok = await requirePhotoUnlock();
    if (!ok) return;
  }

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
      appVersion: 'v2.6.1'
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
      photoBatch.set(ref, { ci: p.ci, date: p.date, note: p.note || '', url, pinned: !!p.pinned, canonical: !!p.canonical });
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
// ── ONBOARDING CLOUD RESTORE (new device, existing account) ───────────────────
function onboardingCloudRestore(){
  _onboardingRestorePending=true;
  if(!db)initFirebase();
  const tryLogin=()=>{
    if(!fbAuth){setTimeout(tryLogin,300);return;}
    const provider=new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    fbAuth.signInWithPopup(provider).then(result=>{
      fbUID=result.user.uid;fbIsGoogle=true;
      restoreFromCloudOnboarding();
    }).catch(e=>{
      if(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment'){
        localStorage.setItem('rst-onboarding-restore-pending','1');
        fbAuth.signInWithRedirect(provider);
      } else {
        _onboardingRestorePending=false;
        if(e.code!=='auth/popup-closed-by-user')showToast('⚠ Sign-in failed. Try again.');
      }
    });
  };
  tryLogin();
}

async function restoreFromCloudOnboarding(){
  showToast('☁ Checking for a cloud backup…');
  try{
    const doc=await db.collection('user_backups').doc(fbUID).get();
    if(!doc.exists){
      _onboardingRestorePending=false;
      showToast('⚠ No cloud backup found for this Google account.');
      return;
    }
    const data=doc.data();
    const pid=data.pid||('p'+Date.now());
    S.set(`rst-${pid}-char`,data.char);
    S.set(`rst-${pid}-logs`,data.logs);
    S.set('rst-active-pid',pid);
    await ProfileDB.set(`rst-${pid}-char`,data.char);
    await ProfileDB.set(`rst-${pid}-logs`,data.logs);
    const restoredProfiles=[{id:pid,name:data.char?.name||'Restorer',createdAt:data.char?.createdAt||today()}];
    profiles=restoredProfiles;
    S.set('rst-profiles',restoredProfiles);
    await ProfileDB.set('rst-profiles',restoredProfiles);
    const photoSnap=await db.collection('user_backups').doc(fbUID).collection('photos').get();
    const restoredPhotos=photoSnap.docs.map(d=>({id:parseInt(d.id)||Date.now(),...d.data()})).sort((a,b)=>b.id-a.id);
    await PhotoDB.save(pid,restoredPhotos);
    showToast(`✅ Welcome back! Restored ${restoredPhotos.length} photos and your full history.`);
    setTimeout(async ()=>{
      await loadAll();
      showProfileScreen=false;tab='today';render();
      if(char.communityEnabled)startCommunityListeners();
      _onboardingRestorePending=false;
    },600);
  }catch(e){
    _onboardingRestorePending=false;
    console.warn('[RT] restoreFromCloudOnboarding error',e);
    showToast('⚠ Could not restore — check your connection and try again');
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
      style="padding:9px 2px;border-radius:8px;font-family:var(--font-display);font-size:11px;font-weight:700;cursor:${dis?'not-allowed':'pointer'};text-align:center;
      background:${isSel?'var(--accent)':'var(--bg-stat)'};
      border:1px solid ${isSel?'var(--accent)':'var(--stat-border)'};
      color:${isSel?'var(--bg)':'var(--text3)'};
      opacity:${dis?'0.22':'1'};transition:all .15s">${val}</button>`;
  }).join('');

  const el=document.createElement('div');el.className='overlay';el.id='ci-ov';
  el.innerHTML=`<div class="sheet" style="max-height:90vh">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);text-align:center;margin-bottom:4px">Set CI Levels</div>
    <div style="font-size:11px;color:var(--text4);text-align:center;margin-bottom:16px;line-height:1.6">Start, Current, and Goal define your journey arc.</div>

    <!-- Start CI -->
    <div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text4)">Start CI</div>
        <span style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:2px 10px;font-family:var(--font-display);font-size:11px;font-weight:700;color:var(--text3)">CI-${_editStartCI}</span>
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
        <span style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:2px 10px;font-family:var(--font-display);font-size:11px;font-weight:700;color:var(--accent)">CI-${_editCurrentCI}</span>
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
        <span style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:20px;padding:2px 10px;font-family:var(--font-display);font-size:11px;font-weight:700;color:var(--accent)">CI-${_editGoalCI}</span>
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
}
function beginSessionFrom(dateStr,timeStr){
  if(!sheetMethod||!sheetCat||!timeStr)return;
  const startMs=new Date(`${dateStr}T${timeStr}:00`).getTime();
  if(isNaN(startMs))return;
  const elapsedMs=Math.max(0,Date.now()-startMs);
  const elapsedSecs=Math.floor(elapsedMs/1000);
  activeTimer={startedAt:Date.now()-elapsedMs,wallStart:Date.now()-elapsedMs,method:sheetMethod,cat:sheetCat,notes:sheetNotes,elapsedOnPause:0,pauseIntervals:[],pausedAt:null};
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
  const preferred=char.preferredMethods||[];
  const showAll=!!window._sheetShowAll;

  // No preferred methods & not opted into browse-all → prompt to open editor
  if(!preferred.length && !showAll){
    const el=document.createElement('div');el.className='overlay';el.id='sov';
    el.innerHTML=`<div class="sheet" style="padding-bottom:24px">
      <div class="sheet-handle"></div>
      <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:8px">New Session</div>
      <div style="text-align:center;padding:16px 8px 6px">
        <div style="font-size:34px;margin-bottom:12px">🛠️</div>
        <div style="font-size:13px;color:var(--text1);font-weight:600;margin-bottom:8px">Add your methods first</div>
        <div style="font-size:11px;color:var(--text4);line-height:1.7;margin-bottom:18px">Pick the methods or devices you actually use — the session screen will only show what you choose.</div>
      </div>
      <button id="sov-add-methods" class="btn-gold" style="width:100%;margin-bottom:7px">+ Add Methods</button>
      <button id="sov-browse-all" class="btn-ghost" style="width:100%;margin-bottom:7px">Browse all methods anyway</button>
      <button id="sov-cancel-empty" class="btn-ghost" style="width:100%">Cancel</button>
    </div>`;
    document.getElementById('root').appendChild(el);
    document.getElementById('sov-add-methods').onclick=()=>{mountMethodEditor();};
    document.getElementById('sov-browse-all').onclick=()=>{window._sheetShowAll=true;refreshSheet();};
    document.getElementById('sov-cancel-empty').onclick=()=>{showSessionSheet=false;render();};
    return;
  }

  // Build the categories to display
  let visibleCats;
  if(showAll){
    // Browse-all is the built-in library. A user's own methods aren't part
    // of that library — they live in the normal view and the Manage methods
    // editor, and adding them here would just duplicate those paths.
    visibleCats=CATS.filter(c=>c.id!=='custom');
  } else {
    visibleCats=CATS.filter(c=>c.id!=='custom').map(c=>({
      ...c,
      methods:c.methods.filter(m=>preferred.includes(m))
    })).filter(c=>c.methods.length>0);
    // Only surface custom methods the user marked as preferred
    const preferredCustom=preferred.filter(m=>customMethods.includes(m));
    if(preferredCustom.length){
      const customCat=CATS.find(c=>c.id==='custom');
      visibleCats.push({...customCat,methods:preferredCustom});
    }
  }

  const cat=visibleCats.find(c=>c.id===sheetCat);

  // Preferred mode → flat grid (no category tabs).
  // Browse-all mode → keep category tabs + methods within selected category.
  // Consistent card treatment for both views. Category color is passed in as
  // a CSS variable so the selected state takes on the category's identity
  // rather than a generic accent.
  const buildMethodCard=(method,cat)=>{
    const sel=sheetMethod===method;
    const catColor=(cat&&cat.color)||'#888';
    const catBg=`${catColor}14`;
    return`<button type="button" class="method-card${sel?' selected':''}"
      style="--card-accent:${catColor};--card-accent-bg:${catBg}"
      onclick="sheetMethod=this.dataset.m;sheetCat=this.dataset.c;refreshSheet()"
      data-m="${htmlEsc(method)}"
      data-c="${cat.id}">
      <span class="method-icon" style="color:${catColor}">${(cat&&cat.icon)||'•'}</span>
      <span class="method-info">
        <span class="method-name">${method}</span>
        <span class="method-cat">${(cat&&cat.label)||''}</span>
      </span>
      <span class="method-check">✓</span>
    </button>`;
  };

  let methodPickerHtml;
  if(showAll){
    const catPills=visibleCats.map(c=>{
      const sel=sheetCat===c.id;
      const pillStyle=sel?`border-color:${c.color};color:${c.color};background:${c.color}14`:'';
      return`<div class="mcat-pill${sel?' active':''}"
        style="${pillStyle}"
        onclick="sheetCat='${c.id}';sheetMethod='';refreshSheet()">
        ${c.icon} ${c.label}
      </div>`;
    }).join('');
    const cards=cat?cat.methods.map(m=>buildMethodCard(m,cat)).join(''):'';
    const pickerInner=cat
      ?`<div class="meth-grid">${cards}</div>`
      :`<div style="text-align:center;padding:20px 16px;color:var(--text5);font-size:11px;line-height:1.7">
          <div style="font-size:22px;margin-bottom:6px;opacity:.4">↑</div>
          Pick a category above to see its methods.
        </div>`;
    methodPickerHtml=`<div class="mcat-row">${catPills}</div>${pickerInner}`;
  } else {
    const flat=[];
    visibleCats.forEach(c=>c.methods.forEach(m=>flat.push({method:m,cat:c})));
    if(flat.length){
      const cards=flat.map(({method,cat})=>buildMethodCard(method,cat)).join('');
      methodPickerHtml=`<div class="meth-grid">${cards}</div>`;
    } else {
      methodPickerHtml=`<div style="text-align:center;padding:24px 16px">
        <div style="font-size:28px;margin-bottom:8px;opacity:.5">🛠️</div>
        <div style="font-size:12px;color:var(--text3);font-weight:600;margin-bottom:4px">No methods added yet</div>
        <div style="font-size:11px;color:var(--text5);line-height:1.6">Tap <strong style="color:var(--text4)">Manage methods</strong> below to add your first one.</div>
      </div>`;
    }
  }

  const isTimer=logMode==='timer';

  // Quiet text-style secondary actions under the picker. The dashed buttons
  // these replace read as empty-state placeholders even when the grid above
  // was full. As plain links they stay available but recede.
  const _linkStyle='background:none;border:none;color:var(--text4);font-size:11px;cursor:pointer;font-family:var(--font-body);padding:4px 6px;display:inline-flex;align-items:center;gap:5px;transition:color .15s';
  const browseLink=preferred.length
    ? (showAll
        ? `<button onclick="window._sheetShowAll=false;refreshSheet()" style="${_linkStyle}"><span style="opacity:.7">←</span> Back to my methods</button>`
        : `<button onclick="window._sheetShowAll=true;refreshSheet()" style="${_linkStyle}"><span style="opacity:.7">⊕</span> Browse all methods</button>`)
    : '';
  const browseBtn=`<div style="display:flex;align-items:center;justify-content:center;gap:4px;margin-top:14px;margin-bottom:10px">
    ${browseLink}
    ${browseLink?`<span style="color:var(--stat-border);font-size:12px">·</span>`:''}
    <button onclick="mountMethodEditor()" style="${_linkStyle}"><span style="opacity:.7">✎</span> Manage methods</button>
  </div>`;

  const el=document.createElement('div');el.className='overlay';el.id='sov';
  el.innerHTML=`<div class="sheet">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:12px">${isTimer?'New Session':'Log a Past Session'}</div>
    <div class="sec-title" style="margin-top:4px">Method</div>
    ${methodPickerHtml}
    ${browseBtn}
    ${!isTimer?`<div class="sec-title" style="margin-top:10px">When did you start?</div>
    <div class="card" style="padding:14px">
      <div style="margin-bottom:12px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">Start</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input type="date" id="m-start-date" value="${manualStartDate||today()}" max="${today()}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:var(--font-body)">
          <input type="time" id="m-start" value="${manualStart}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:700;width:100%;outline:none;font-family:var(--font-display);text-align:center">
        </div>
      </div>
      <div id="end-col" style="${manualStillActive?'opacity:.35;pointer-events:none':''}margin-bottom:12px">
        <div style="font-size:10px;color:var(--text4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.8px">End</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <input type="date" id="m-end-date" value="${manualEndDate||today()}" max="${today()}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:var(--font-body)">
          <input type="time" id="m-end" value="${manualEnd}"
            style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:8px 8px;color:var(--accent);font-size:13px;font-weight:700;width:100%;outline:none;font-family:var(--font-display);text-align:center">
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
    ${isTimer?`<div style="text-align:center;margin-top:8px">
      <button id="s-backdate-toggle" style="background:none;border:none;color:var(--text4);font-size:11px;cursor:pointer;font-family:var(--font-body);padding:6px 8px;text-decoration:underline;text-underline-offset:3px;transition:color .15s">
        ${window._sheetBackdate?'Hide start time':'Already been going? Start from earlier →'}
      </button>
    </div>
    <div id="s-backdate-row" style="display:${window._sheetBackdate?'block':'none'};margin-top:8px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px">
      <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">Session start</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <input type="date" id="s-backdate-date" value="${window._sheetBackdate?.date||today()}" max="${today()}"
          style="background:var(--bg-card);border:1px solid var(--acc30);border-radius:8px;padding:8px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:var(--font-body)">
        <input type="time" id="s-backdate-time" value="${window._sheetBackdate?.time||''}"
          style="background:var(--bg-card);border:1px solid var(--acc30);border-radius:8px;padding:8px;color:var(--accent);font-size:14px;font-weight:700;width:100%;outline:none;font-family:var(--font-display);text-align:center">
      </div>
      <div style="font-size:10px;color:var(--text5);margin-top:8px;line-height:1.5">Session will start already counting from this time and keep running.</div>
    </div>`:''}
    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn-ghost" id="s-cancel" style="flex:0 0 76px">Cancel</button>
      <div style="flex:1">${isTimer
        ?`<button class="btn-green" id="s-start" style="margin:0">${IC.play(14)} ${window._sheetBackdate?'Start from earlier':'Start Timer'}</button>`
        :manualStillActive
          ?`<button class="btn-green" id="s-start-from" style="margin:0">${IC.play(14)} Start from here</button>`
          :`<button class="btn-gold" id="s-log">✓ Log Session</button>`
      }</div>
    </div>
    <div style="text-align:center;margin-top:14px;padding-bottom:4px">
      <button id="s-switch-mode" style="background:none;border:none;color:var(--text4);font-size:11px;font-family:var(--font-body);cursor:pointer;padding:6px 8px;text-decoration:underline;text-underline-offset:3px;transition:color .15s">
        ${isTimer?'or log a past session →':'or start a live session →'}
      </button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('s-switch-mode').onclick=()=>{
    // Same state transition the mode pills used to run — the only change is
    // what triggers it. Manual reset of manualStillActive when going back to
    // Timer so the green "Start from here" button never accidentally persists.
    if(logMode==='timer'){logMode='manual';}
    else{logMode='timer';manualStillActive=false;}
    refreshSheet();
  };
  document.getElementById('s-cancel').onclick=()=>{showSessionSheet=false;window._sheetShowAll=false;window._sheetBackdate=null;render();};
  document.getElementById('m-start-date')?.addEventListener('input',e=>{manualStartDate=e.target.value;updateManualPreview();});
  document.getElementById('m-start')?.addEventListener('input',e=>{manualStart=e.target.value;updateManualPreview();});
  document.getElementById('m-end-date')?.addEventListener('input',e=>{manualEndDate=e.target.value;updateManualPreview();});
  document.getElementById('m-end')?.addEventListener('input',e=>{manualEnd=e.target.value;updateManualPreview();});
  document.getElementById('m-still-active')?.addEventListener('change',e=>{
    manualStillActive=e.target.checked;
    refreshSheet();
    if(manualStillActive){
      setTimeout(()=>{document.getElementById('m-start')?.focus();},50);
    }
  });
  document.getElementById('s-start')?.addEventListener('click',()=>{
    if(!sheetCat){showToast('Please select a category above');return;}
    if(!sheetMethod){showToast('Please select a method');return;}
    if(window._sheetBackdate){
      const d=window._sheetBackdate.date||today();
      const t=window._sheetBackdate.time;
      if(!t){showToast('Pick a start time');return;}
      const ms=new Date(`${d}T${t}:00`).getTime();
      if(isNaN(ms)){showToast('Invalid start time');return;}
      if(ms>Date.now()){showToast('Start time must be in the past');return;}
      window._sheetBackdate=null;
      beginSessionFrom(d,t);
      return;
    }
    beginSession();
  });
  document.getElementById('s-backdate-toggle')?.addEventListener('click',()=>{
    if(window._sheetBackdate){
      window._sheetBackdate=null;
    } else {
      // Default: 30 minutes ago, rounded to the nearest half-hour boundary.
      const d=new Date(Date.now()-30*60*1000);
      const m=d.getMinutes()<30?0:30;
      const hh=String(d.getHours()).padStart(2,'0');
      const mm=String(m).padStart(2,'0');
      window._sheetBackdate={date:localDateStr(d),time:`${hh}:${mm}`};
    }
    refreshSheet();
  });
  document.getElementById('s-backdate-date')?.addEventListener('input',e=>{
    if(window._sheetBackdate)window._sheetBackdate.date=e.target.value;
  });
  document.getElementById('s-backdate-time')?.addEventListener('input',e=>{
    if(window._sheetBackdate)window._sheetBackdate.time=e.target.value;
  });
  document.getElementById('s-start-from')?.addEventListener('click',()=>{
    if(!sheetCat){showToast('Please select a category above');return;}
    if(!sheetMethod){showToast('Please select a method');return;}
    if(!manualStart){showToast('Please enter a start time above');return;}
    beginSessionFrom(manualStartDate||today(),manualStart);
  });
  document.getElementById('s-log')?.addEventListener('click',()=>{
    if(!sheetCat){showToast('Please select a category above');return;}
    if(!sheetMethod){showToast('Please select a method');return;}
    if(!manualStart||!manualEnd){showToast('Please enter start and end times');return;}
    const mins=calcManualMins();
    if(mins<=0){showToast('End time must be after start time');return;}
    const sd=manualStartDate||today(),ed=manualEndDate||today();
    const startMs=new Date(`${sd}T${manualStart}:00`).getTime();
    const endMs=new Date(`${ed}T${manualEnd}:00`).getTime();
    logManual(sheetMethod,sheetCat,mins,'',sd,startMs,endMs);
  });
}
function refreshSheet(){const el=document.getElementById('sov');if(el)el.remove();mountSheet();}

function mountAdjustTimeSheet(){
  const ex=document.getElementById('adjust-time-ov');if(ex)ex.remove();
  if(!activeTimer)return;

  // Adjust edits the START time only. Duration is derived as end − start,
  // where end is "now" for a running session or activeTimer.pausedAt for a
  // paused one. Editing here keeps the session running — ending a session
  // early is the Stop sheet's job (it has its own end-time picker).
  //
  // We deliberately preserve pauseIntervals rather than wiping them. That
  // keeps the multi-day splitter accurate: if a session had a mid-window
  // pause and the user shifts the start earlier, the pause still anchors to
  // its real timestamp and gets subtracted correctly.
  const _wallStart = activeTimer.wallStart || (Date.now() - timerSecs*1000);
  const _isRunning = !!activeTimer.startedAt;
  const _pauses = (activeTimer.pauseIntervals||[]).slice();
  let _adjStartMs = _wallStart;

  const _endRef = () => _isRunning ? Date.now() : (activeTimer.pausedAt || Date.now());

  const computeElapsed = () => {
    const probe = { wallStart: _adjStartMs, pauseIntervals: _pauses, pausedAt: null };
    // sessionActiveSecsBetween() already returns SECONDS — do not divide again.
    return sessionActiveSecsBetween(probe, _adjStartMs, _endRef());
  };
  const fmtPickDate = (ms) => localDateStr(new Date(ms));
  const fmtPickTime = (ms) => {
    const d = new Date(ms);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  const initialElapsed = computeElapsed();

  const el = document.createElement('div');el.className='overlay';el.id='adjust-time-ov';
  el.innerHTML = `<div class="sheet" style="padding-bottom:24px">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:4px">Adjust Session</div>
    <div style="font-size:11px;color:var(--text4);margin-bottom:16px;line-height:1.6">Change when this session started. Duration updates automatically.</div>

    <div class="sec-title" style="margin-top:0">Started at</div>
    <div style="display:flex;align-items:center;gap:6px;background:var(--bg-stat);border:1px solid var(--acc30);border-radius:10px;padding:4px 8px;margin-bottom:16px">
      <input type="date" id="adj-date" value="${fmtPickDate(_adjStartMs)}" max="${today()}"
        style="flex:1;min-width:0;background:transparent;border:none;padding:9px 4px;color:var(--accent);font-size:14px;font-weight:700;outline:none;font-family:var(--font-body);text-align:center">
      <span style="color:var(--text5);font-size:11px;flex-shrink:0;font-weight:500">at</span>
      <input type="time" id="adj-time" value="${fmtPickTime(_adjStartMs)}"
        style="flex:1;min-width:0;background:transparent;border:none;padding:9px 4px;color:var(--accent);font-size:14px;font-weight:700;outline:none;font-family:var(--font-display);text-align:center">
    </div>

    <div class="sec-title" style="margin-top:0">Adjust duration</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:16px">
      ${[['−1h',-60],['−15m',-15],['−5m',-5],['+5m',5],['+15m',15],['+1h',60]].map(([label,delta])=>`
        <button class="adj-nudge" data-delta="${delta}"
          style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:10px 4px;font-size:12px;font-weight:600;color:var(--text2);cursor:pointer;font-family:var(--font-body);transition:all .15s">${label}</button>
      `).join('')}
    </div>

    <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:12px 14px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
        <span style="font-size:11px;color:var(--text4)">Now</span>
        <span style="font-size:13px;color:var(--text3);font-variant-numeric:tabular-nums" id="adj-current">${fmtLive(timerSecs)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span style="font-size:11px;color:var(--text4)">After</span>
        <span style="font-size:15px;color:var(--accent);font-weight:700;font-variant-numeric:tabular-nums" id="adj-preview">${fmtLive(initialElapsed)}</span>
      </div>
    </div>

    <div style="display:flex;gap:8px">
      <button id="adj-cancel" class="btn-ghost" style="flex:0 0 96px">Cancel</button>
      <button id="adj-save" class="btn-gold" style="flex:1">✓ Apply</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);

  const _dateInp = document.getElementById('adj-date');
  const _timeInp = document.getElementById('adj-time');
  const _previewEl = document.getElementById('adj-preview');
  const _currentEl = document.getElementById('adj-current');

  const paintPicker = () => {
    _dateInp.value = fmtPickDate(_adjStartMs);
    _timeInp.value = fmtPickTime(_adjStartMs);
  };
  // Greys out −N buttons when their tap couldn't leave at least 60 seconds of
  // elapsed time (the Apply minimum). +N buttons are always enabled — they
  // only ever lengthen the session, which is always valid.
  const paintNudgeStates = (secs) => {
    if(secs === undefined) secs = computeElapsed();
    document.querySelectorAll('#adjust-time-ov .adj-nudge').forEach(btn=>{
      const delta = parseInt(btn.dataset.delta) || 0;
      if(delta >= 0) return;
      const disabled = secs < Math.abs(delta) * 60 + 60;
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.35' : '1';
      btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
    });
  };
  const paintPreview = () => {
    const secs = computeElapsed();
    _previewEl.textContent = fmtLive(secs);
    paintNudgeStates(secs);
  };
  const paintCurrent = () => { _currentEl.textContent = fmtLive(timerSecs); };

  // Reads the current <input type="date|time"> values and, if they form a
  // valid past timestamp, writes them into _adjStartMs and repaints. Safe to
  // call as often as we like — empty or future values just leave the last
  // valid _adjStartMs in place.
  const syncFromPicker = () => {
    const d = _dateInp.value;
    const t = _timeInp.value;
    if(d && t){
      const ms = new Date(`${d}T${t}:00`).getTime();
      if(!isNaN(ms) && ms <= Date.now()){
        _adjStartMs = ms;
      }
    }
    paintPreview();
  };
  // iOS Safari/PWA doesn't reliably fire `input` OR `change` on
  // <input type="date|time"> — sometimes not even on picker dismissal. So we
  // do BOTH: listen to the events for platforms that do fire them (instant
  // feedback), AND poll the picker values from the ticker below. If the
  // events fire, great. If they don't, the poll catches the change within a
  // second. Either way, _adjStartMs always reflects the current picker state.
  ['input','change'].forEach(evt=>{
    _dateInp.addEventListener(evt, syncFromPicker);
    _timeInp.addEventListener(evt, syncFromPicker);
  });

  // Live ticker: every second, re-read the picker, recompute, repaint. This
  // is the fallback that makes the sheet work even when the events never fire.
  const _tick = setInterval(()=>{ syncFromPicker(); paintCurrent(); }, 1000);
  // Paint the nudge-button disabled states immediately, so the sheet opens
  // with the correct buttons already greyed instead of a 1-second lag.
  paintPreview();

  document.querySelectorAll('#adjust-time-ov .adj-nudge').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const delta = parseInt(btn.dataset.delta) || 0;
      // delta is change in duration. Subtracting duration shifts the start
      // forward; adding duration shifts it back. Either way, wallStart is
      // the only thing that moves — duration follows.
      _adjStartMs -= delta * 60 * 1000;
      const now = Date.now();
      if(_adjStartMs > now) _adjStartMs = now; // clamp: start can't be future
      paintPicker();
      paintPreview();
      if(navigator.vibrate) navigator.vibrate(8);
    });
  });

    const close = () => { if(_tick) clearInterval(_tick); el.remove(); };
  document.getElementById('adj-cancel').onclick = close;
  el.addEventListener('click', e => { if(e.target === el) close(); });

  document.getElementById('adj-save').onclick = () => {
    // Read the picker values one last time before committing. This bypasses
    // any iOS event unreliability — even if no event has fired during the
    // whole sheet session, we now use the definitive current values.
    syncFromPicker();
    const newElapsed = computeElapsed();
    if(newElapsed < 60){ showToast('Session must be at least 1 minute'); return; }
    if(_tick) clearInterval(_tick);
    if(_isRunning){
      // Running — reset startedAt to a fictional "resumed at X" that makes
      // the ticking display continue from newElapsed. wallStart and
      // pauseIntervals are preserved so the splitter stays accurate.
      activeTimer = {
        ...activeTimer,
        wallStart: _adjStartMs,
        startedAt: Date.now() - newElapsed*1000,
        elapsedOnPause: 0,
        pausedAt: null
      };
      timerSecs = newElapsed;
      startInterval();
    } else {
      // Paused — rewrite the frozen elapsed. pausedAt stays put so the
      // session's pause window remains anchored where it actually happened.
      activeTimer = {
        ...activeTimer,
        wallStart: _adjStartMs,
        elapsedOnPause: newElapsed
      };
      timerSecs = newElapsed;
    }
    saveTimer(activeTimer);
    el.remove();
    showToast(`✓ Adjusted to ${fmtLive(newElapsed)}`);
    render();
  };
}

function mountMethodEditor(){
  const ex=document.getElementById('method-editor-ov');if(ex)ex.remove();
  const localSet=new Set(char.preferredMethods||[]);
  const knownCats=CATS.filter(c=>c.id!=='custom');
  const allKnown=knownCats.flatMap(c=>c.methods);
  const el=document.createElement('div');el.className='overlay';el.id='method-editor-ov';
  el.innerHTML=`<div class="sheet" style="padding-bottom:24px">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:4px">Your Methods</div>
    <div style="font-size:10px;color:var(--text4);margin-bottom:14px;line-height:1.6">Only these methods will appear when starting a session.</div>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <input id="me-inp" class="gold-inp" placeholder="Type a method or device…" maxlength="40" list="me-datalist" style="flex:1;margin:0;font-size:13px;padding:10px 11px">
      <button type="button" id="me-add" class="btn-outline" style="padding:0 14px;white-space:nowrap;font-size:12px">+ Add</button>
    </div>
    <datalist id="me-datalist">${allKnown.map(m=>`<option value="${htmlEsc(m)}">`).join('')}</datalist>
    <div id="me-list" style="display:flex;flex-wrap:wrap;gap:5px;min-height:44px;padding:10px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;margin-bottom:14px"></div>
    <div style="display:flex;gap:8px">
      <button id="me-cancel" class="btn-ghost" style="flex:0 0 96px">Cancel</button>
      <button id="me-save" class="btn-gold" style="flex:1">✓ Save Methods</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});

  const inp=document.getElementById('me-inp');
  const listEl=document.getElementById('me-list');

  const renderLocal=()=>{
    if(!localSet.size){
      listEl.innerHTML='<span style="font-size:11px;color:var(--text5);font-style:italic">No methods added yet — type above and tap Add.</span>';
      return;
    }
    listEl.innerHTML=Array.from(localSet).map(m=>{
      const cat=knownCats.find(c=>c.methods.includes(m));
      const color=cat?cat.color:'#E879F9';
      const icon=cat?cat.icon:'🛠️';
      const esc=htmlEsc(m);const escAttr=esc.replace(/'/g,'&#39;');
      return`<span style="display:inline-flex;align-items:center;gap:5px;background:${color}22;border:1px solid ${color}55;border-radius:20px;padding:5px 9px;font-size:11px;color:${color};font-family:var(--font-body)">
        <span>${icon}</span><span>${esc}</span>
        <button type="button" data-rm="${escAttr}" style="background:none;border:none;color:${color};cursor:pointer;font-size:12px;padding:0 0 0 2px;line-height:1;opacity:.7">✕</button>
      </span>`;
    }).join('');
    listEl.querySelectorAll('[data-rm]').forEach(b=>{
      b.onclick=()=>{localSet.delete(b.dataset.rm);renderLocal();};
    });
  };
  renderLocal();

  const handleAdd=()=>{
    const raw=(inp.value||'').trim();if(!raw)return;
    const match=allKnown.find(m=>m.toLowerCase()===raw.toLowerCase());
    const name=match||raw;
    if(!localSet.has(name))localSet.add(name);
    inp.value='';inp.focus();renderLocal();
  };
  document.getElementById('me-add').onclick=handleAdd;
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();handleAdd();}});

  document.getElementById('me-cancel').onclick=()=>el.remove();
  document.getElementById('me-save').onclick=()=>{
    char.preferredMethods=Array.from(localSet);
    const priorCustom=char.customMethods||[];
    const newCustom=char.preferredMethods.filter(m=>!allKnown.some(k=>k.toLowerCase()===m.toLowerCase()));
    const stillCustom=priorCustom.filter(m=>char.preferredMethods.includes(m));
    char.customMethods=Array.from(new Set([...newCustom,...stillCustom]));
    saveChar();
    el.remove();
    if(showSessionSheet)refreshSheet();
    showToast('✓ Methods saved');
  };
  inp.focus();
}

// ── STOP SHEET ─────────────────────────────────────────────────────────────────
function mountStopSheet(){
  const ex=document.getElementById('stop-ov');if(ex)ex.remove();
  if(!activeTimer)return;

  // End-time editing. Default is the stop moment (set by stopSession to
  // activeTimer.pausedAt). If the user edits it earlier — the classic
  // bedtime-forgot-to-stop case — the displayed elapsed shrinks live and
  // the session commits with the corrected duration.
  //
  // pauseIntervals are preserved. sessionActiveSecsBetween() correctly
  // subtracts only the pauses that overlap [wallStart, newEnd], so any
  // pause that happened outside the new window is silently excluded.
  const _wallStart = activeTimer.wallStart || (Date.now() - timerSecs*1000);
  const _originalEndMs = activeTimer.pausedAt || Date.now();
  const _pauses = (activeTimer.pauseIntervals||[]).slice();
  let _stopEndMs = _originalEndMs;

  const computeElapsed = () => {
    const probe = { wallStart: _wallStart, pauseIntervals: _pauses, pausedAt: null };
    // sessionActiveSecsBetween() already returns SECONDS — do not divide again.
    return sessionActiveSecsBetween(probe, _wallStart, _stopEndMs);
  };
  const fmtPickDate = (ms) => localDateStr(new Date(ms));
  const fmtPickTime = (ms) => {
    const d = new Date(ms);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  };

  const method = activeTimer.method || sheetMethod;
  const initialElapsed = computeElapsed();
  const initialMins = Math.max(1, Math.round(initialElapsed/60));
  const goalHit = todayMin() + initialMins >= char.dailyGoalMin;

  const el = document.createElement('div');el.className='overlay';el.id='stop-ov';
  el.innerHTML = `<div class="sheet">
    <div class="sheet-handle"></div>
    <div style="text-align:center;margin-bottom:14px">
      <div style="font-family:var(--font-display);font-size:12px;color:var(--text4);margin-bottom:6px">Session Complete</div>
      <div class="big-timer" id="stop-elapsed">${fmtLive(initialElapsed)}</div>
      <div style="font-size:12px;color:var(--text3);margin-top:4px">${method}</div>
      <div id="stop-adjusted-hint" style="display:none;font-size:10px;color:var(--accent);margin-top:6px;line-height:1.5"></div>
      <div style="margin-top:8px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <div class="xp-tag">Session #${char.sessions+1}</div>
        ${char.streak>1?`<div class="xp-tag">${char.streak}-day streak 🔥</div>`:''}
        <div class="xp-tag" id="stop-goal-tag" style="display:${goalHit?'':'none'};border-color:rgba(34,168,90,.4);color:var(--green)">🎯 Daily goal hit!</div>
      </div>
    </div>

    <div style="text-align:center;margin-bottom:14px">
      <button id="stop-adjust-toggle" style="background:none;border:none;color:var(--text4);font-size:11px;cursor:pointer;font-family:var(--font-body);padding:6px 8px;text-decoration:underline;text-underline-offset:3px;transition:color .15s">
        Wrong duration? Adjust end time →
      </button>
    </div>
    <div id="stop-end-editor" style="display:none;margin-bottom:14px">
      <div class="sec-title" style="margin-top:0">Ended at</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <input type="date" id="stop-end-date" value="${fmtPickDate(_stopEndMs)}" max="${today()}"
          style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px;color:var(--accent);font-size:13px;font-weight:600;width:100%;outline:none;font-family:var(--font-body)">
        <input type="time" id="stop-end-time" value="${fmtPickTime(_stopEndMs)}"
          style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px;color:var(--accent);font-size:14px;font-weight:700;width:100%;outline:none;font-family:var(--font-display);text-align:center">
      </div>
    </div>

    <div class="sec-title" style="margin-top:0">Notes (Optional)</div>
    <textarea id="stop-notes" placeholder="Comfort level, device tension, observations...">${sheetNotes}</textarea>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn-ghost" id="stop-resume">↺ Resume</button>
      <button class="btn-gold" id="stop-save" style="flex:1">✓ Save Session</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);

  const _dateInp = document.getElementById('stop-end-date');
  const _timeInp = document.getElementById('stop-end-time');
  const _elapsedEl = document.getElementById('stop-elapsed');
  const _hintEl = document.getElementById('stop-adjusted-hint');
  const _goalTag = document.getElementById('stop-goal-tag');

  // Reveal-on-tap: the end-time editor stays hidden until the user explicitly
  // asks for it. Most sessions end when the user taps Stop, so this is one
  // less field to scan past on the way to Save. When revealed, the toggle
  // text flips to "Hide end time" so the same control closes it back up.
  const _endEditor = document.getElementById('stop-end-editor');
  const _adjustToggle = document.getElementById('stop-adjust-toggle');
  _adjustToggle.onclick = () => {
    const open = _endEditor.style.display === 'none';
    _endEditor.style.display = open ? 'block' : 'none';
    _adjustToggle.textContent = open ? 'Hide end time ↑' : 'Wrong duration? Adjust end time →';
    if(open) _dateInp.focus();
  };

  const syncEnd = () => {
    const d = _dateInp.value;
    const t = _timeInp.value;
    if(!d || !t) return;
    const ms = new Date(`${d}T${t}:00`).getTime();
    if(isNaN(ms)) return;
    if(ms < _wallStart){
      _hintEl.style.display = 'block';
      _hintEl.style.color = '#c0392b';
      _hintEl.textContent = 'End time is before the session started';
      return;
    }
    if(ms > Date.now() + 60000){
      _hintEl.style.display = 'block';
      _hintEl.style.color = '#c0392b';
      _hintEl.textContent = 'End time can\'t be in the future';
      return;
    }
    _stopEndMs = ms;
    const secs = computeElapsed();
    _elapsedEl.textContent = fmtLive(secs);
    if(ms !== _originalEndMs){
      const diffMin = Math.round((ms - _originalEndMs)/60000);
      _hintEl.style.display = 'block';
      _hintEl.style.color = 'var(--accent)';
      _hintEl.textContent = diffMin < 0
        ? `Adjusted ${fmtDur(Math.abs(diffMin))} earlier`
        : `Adjusted ${fmtDur(diffMin)} later`;
    } else {
      _hintEl.style.display = 'none';
    }
    // Re-check the goal tag against the new elapsed
    if(_goalTag){
      const newMins = Math.max(1, Math.round(secs/60));
      _goalTag.style.display = (todayMin() + newMins >= char.dailyGoalMin) ? '' : 'none';
    }
  };
  // Same iOS quirk as the Adjust sheet — listen to both events.
  ['input','change'].forEach(evt=>{
    _dateInp.addEventListener(evt, syncEnd);
    _timeInp.addEventListener(evt, syncEnd);
  });

  document.getElementById('stop-resume').onclick = resumeSession;
  document.getElementById('stop-save').onclick = () => {
    if(_stopEndMs !== _originalEndMs){
      // Override the end. pausedAt becomes the new end so commitSession()
      // picks it up. pauseIntervals stay — sessionActiveSecsBetween will
      // silently exclude any that fall outside the new window.
      const newElapsed = Math.max(1, computeElapsed());
      timerSecs = newElapsed;
      activeTimer = {
        ...activeTimer,
        elapsedOnPause: newElapsed,
        pausedAt: _stopEndMs
      };
      saveTimer(activeTimer);
    }
    commitSession(document.getElementById('stop-notes')?.value||'');
  };
}

// ── EVENTS ─────────────────────────────────────────────────────────────────────
function attachPhotoLongPress(){
  if(tab!=='photos')return;
  document.querySelectorAll('[data-photo-id]').forEach(el=>{
    let timer=null;
    const start=()=>{timer=setTimeout(()=>{if(navigator.vibrate)navigator.vibrate(30);enterPhotoSelect(+el.dataset.photoId);},450);};
    const cancel=()=>{if(timer){clearTimeout(timer);timer=null;}};
    el.addEventListener('touchstart',start,{passive:true});
    el.addEventListener('touchend',cancel,{passive:true});
    el.addEventListener('touchmove',cancel,{passive:true});
    el.addEventListener('mousedown',start);
    el.addEventListener('mouseup',cancel);
    el.addEventListener('mouseleave',cancel);
  });
}
function attachEvents(){
  attachPhotoLongPress();
  document.querySelectorAll('.quick-start-btn').forEach(btn=>btn.addEventListener('click',function(){
    const method=this.dataset.method;
    const cat=this.dataset.cat;
    if(!method||!cat)return;
    sheetMethod=method;sheetCat=cat;sheetNotes='';
    beginSession();
  }));
  document.getElementById('start-session-btn')?.addEventListener('click',()=>{window._sheetShowAll=false;window._sheetBackdate=null;showSessionSheet=true;logMode='timer';sheetCat=null;sheetMethod='';sheetNotes='';render();});
  document.getElementById('log-past-btn')?.addEventListener('click',()=>{showSessionSheet=true;logMode='manual';sheetCat=null;sheetMethod='';sheetNotes='';manualStart='';manualEnd='';manualStartDate=today();manualEndDate=today();manualStillActive=false;window._sheetBackdate=null;render();});
  document.getElementById('pause-btn')?.addEventListener('click',pauseSession);
  document.getElementById('stop-btn')?.addEventListener('click',stopSession);
  document.getElementById('resume-btn')?.addEventListener('click',resumeSession);
  document.getElementById('adjust-time-btn')?.addEventListener('click',()=>mountAdjustTimeSheet());
  document.getElementById('goal-inp')?.addEventListener('change',e=>{char.dailyGoalMin=Math.max(5,Math.min(1440,+e.target.value||120));saveChar();render();});
  document.getElementById('export-btn')?.addEventListener('click',exportCSV);
  document.getElementById('update-ci-btn')?.addEventListener('click',()=>{showCISheet=true;render();});
  document.getElementById('update-ci-btn2')?.addEventListener('click',()=>{showCISheet=true;render();});
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
        logs=logs.filter(l=>l.id!==id);
        rebuildCharFromLogs();
        render();
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
function avatarCircle(emoji,size=38,border='var(--acc30)',bg='var(--acc12)',ring=null){
  // ring: null | {color, label?}. When provided, draws a subtle outer glow
  // in the ring color and (if label is set) a small corner badge. Colors
  // come from theme variables so every theme renders natively — the caller
  // passes 'var(--accent)', 'var(--green)', etc.
  const ringShadow=ring?.color
    ?`box-shadow:0 0 0 1.5px ${ring.color},0 0 8px ${ring.color};`
    :'';
  const badge=ring?.label
    ?`<span style="position:absolute;top:-4px;right:-4px;font-size:${Math.max(9,Math.round(size*0.32))}px;line-height:1;background:var(--bg-card);border-radius:50%;width:${Math.round(size*0.42)}px;height:${Math.round(size*0.42)}px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.5);z-index:1;pointer-events:none">${ring.label}</span>`
    :'';
  return`<span style="position:relative;display:inline-flex;flex-shrink:0">${badge}<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:2px solid ${border};display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.52)}px;flex-shrink:0;line-height:1;${ringShadow}">${emoji||'🌱'}</div></span>`;
}
// Decides which ring (if any) an avatar should carry, based on the member's
// current streak. Active-session state is already signaled by the green
// border + corner dot at the call sites — no additional ring needed there.
// Rarity tiers:
//   - 14+ days AND holding the community's top streak → gold ring + crown
//   - 30+ days → gold ring + fire
//   - 7+ days → subtle gold halo, no badge
function avatarRingFor(u){
  if(!u)return null;
  const streak=u.streak||0;
  if(streak<7)return null;
  const topStreak=commState.users.reduce((m,x)=>Math.max(m,x.streak||0),0);
  if(streak>=14&&streak===topStreak)return{color:'var(--accent)',label:'👑'};
  if(streak>=30)return{color:'var(--accent)',label:'🔥'};
  return{color:'var(--acc45)',label:null};
}
const FB_CFG={apiKey:"AIzaSyBsJCNIQmiB_zYB1EqZZLk-_gITTX8m-q8",authDomain:"restoretrack-76aae.firebaseapp.com",projectId:"restoretrack-76aae",storageBucket:"restoretrack-76aae.firebasestorage.app",messagingSenderId:"592305053944",appId:"1:592305053944:web:9bc6c3894f034c2017db0d"};
let db=null,fbAuth=null,fbUID=null,fbIsGoogle=false,fbUserEmail=null;
let _onboardingRestorePending=false; // true while a fresh-install "Restore from Cloud" sign-in is in flight
let commTab='live'; // resets to Live on every cold start; manual switches persist for the current session only
let commState={ready:false,loading:true,users:[],posts:[],activity:[],activityLoaded:false,activityLoading:false,conversations:[],unsubUsers:null,unsubPosts:null,unsubConversations:null,unsubBroadcast:null,authError:null,openReplies:new Set(),replies:{},broadcast:null,postsFetchCooldownUntil:0,postsFetchTimer:null};

function isCommunityBlocked(uid){return!!uid&&(char.communityBlockedUsers||[]).includes(uid);}
function conversationIdFor(uidA,uidB){return[uidA,uidB].sort().join('_');}
function updateCommunityNotificationBadge(){
  const hasUnread=commState.conversations.some(c=>(c.unreadBy||[]).includes(fbUID));
  const navComm=document.querySelector('[data-tab="community"] .nav-icon');
  if(!navComm)return;
  let badge=navComm.querySelector('.enc-badge');
  if(hasUnread&&!badge){
    badge=document.createElement('span');badge.className='enc-badge';
    badge.style.cssText='position:absolute;top:-2px;right:-4px;width:8px;height:8px;border-radius:50%;background:#e74c3c;border:1.5px solid var(--bg-nav)';
    navComm.appendChild(badge);
  }else if(!hasUnread&&badge)badge.remove();
}

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

let _authListenerAttached=false; // stops us stacking duplicate listeners on sign-out/sign-in cycles
function initFirebase(){
  try{
    if(!firebase.apps.length)firebase.initializeApp(FB_CFG);
    db=firebase.firestore();
    fbAuth=firebase.auth();
    if(_authListenerAttached)return; // already listening — reuse it, don't re-register
    _authListenerAttached=true;
    fbAuth.getRedirectResult().then(result=>{
      if(!result||!result.user)return;
      const onboardingPending=localStorage.getItem('rst-onboarding-restore-pending');
      const commPending=localStorage.getItem('rst-comm-pending');
      if(onboardingPending){
        localStorage.removeItem('rst-onboarding-restore-pending');
        fbUID=result.user.uid;fbIsGoogle=true;fbUserEmail=result.user.email||null;
        commState.ready=true;commState.authError=null;
        restoreFromCloudOnboarding();
        return;
      }
      if(commPending){
        localStorage.removeItem('rst-comm-pending');
        fbUID=result.user.uid;fbIsGoogle=true;fbUserEmail=result.user.email||null;
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
        fbUserEmail=isGoogle?(user.email||null):null;
        commState.ready=true;commState.authError=null;
        const onboardingPending=localStorage.getItem('rst-onboarding-restore-pending');
        const commPending=localStorage.getItem('rst-comm-pending');
        if(fbIsGoogle&&onboardingPending){
          localStorage.removeItem('rst-onboarding-restore-pending');
          restoreFromCloudOnboarding();
        } else if(fbIsGoogle&&commPending){
          localStorage.removeItem('rst-comm-pending');
          finaliseJoin();
        } else if(fbIsGoogle&&(char.communityEnabled||tab==='community')){
          startCommunityListeners();
        }
        flushCoachQueue();
        flushCoachFeedbackQueue();
      } else {
        fbUserEmail=null;
        if(localStorage.getItem('rst-comm-pending')||localStorage.getItem('rst-onboarding-restore-pending'))return;
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
    fbUID=result.user.uid;fbIsGoogle=true;fbUserEmail=result.user.email||null;
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
  if(commState.unsubConversations)commState.unsubConversations();
  if(commState.unsubBroadcast){commState.unsubBroadcast();commState.unsubBroadcast=null;}

  // ── Real-time: all members, ordered by most recent activity.
  // We used to filter to "active in last 7 days" — but that hid dormant
  // members entirely, making the community feel smaller than it is. Now
  // everyone is fetched, and the Members tab segments by recency instead.
  commState.unsubUsers=db.collection('community_users')
    .orderBy('lastSeen','desc').limit(60)
    .onSnapshot(snap=>{
      commState.users=snap.docs.map(d=>({uid:d.id,...d.data()})).filter(u=>u.visible!==false&&!u.banned&&!isCommunityBlocked(u.uid));
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
  if(commTab==='activity'&&!commState.activityLoaded)fetchCommunityActivity();

  commState.unsubConversations=db.collection('conversations')
    .where('participants','array-contains',fbUID).limit(30)
    .onSnapshot(snap=>{
      commState.conversations=snap.docs.map(doc=>({id:doc.id,...doc.data()})).filter(c=>{
        const other=(c.participants||[]).find(id=>id!==fbUID);
        return!isCommunityBlocked(other);
      }).sort((a,b)=>(b.updatedAt?.toMillis?b.updatedAt.toMillis():0)-(a.updatedAt?.toMillis?a.updatedAt.toMillis():0));
      updateCommunityNotificationBadge();
      if(tab==='community')refreshCommUI();
    },()=>{});

  loadCommunityPrivacy();

  // Broadcast listener — single doc, near-zero read cost
  commState.unsubBroadcast=db.collection('broadcast').doc('active').onSnapshot(snap=>{
    commState.broadcast=snap.exists?snap.data():null;
    if(tab==='community')refreshCommUI();
  },()=>{});

  if(char.communityEnabled&&char.communityDisplayName)syncPresence();

}

function fetchPosts(force=false){
  if(!db)return;
  const now=Date.now();
  const cooldown=30000; // 30 seconds between fetches
  if(!force&&now<commState.postsFetchCooldownUntil){
    // Silent no-op — the Refresh button renders the countdown inline.
    return;
  }
  commState.postsFetchCooldownUntil=now+cooldown;
  startPostsCooldownTimer();
  commState.postsLoading=true;
  refreshCommUI();
  db.collection('posts')
    .orderBy('ts','desc').limit(40)
    .get().then(snap=>{
      commState.posts=snap.docs.map(d=>({id:d.id,...d.data()})).filter(p=>!isCommunityBlocked(p.uid));
      commState.postsLoading=false;
      refreshCommUI();
    }).catch(()=>{commState.postsLoading=false;refreshCommUI();});
}

// Ticks the Refresh button label down while the cooldown is active.
// We update the button's label in place rather than re-rendering the
// whole tab every second — the render path already produces the correct
// disabled state, so the tick only needs to keep the countdown in sync.
function startPostsCooldownTimer(){
  if(commState.postsFetchTimer)return;
  const tick=()=>{
    const remaining=Math.ceil((commState.postsFetchCooldownUntil-Date.now())/1000);
    if(remaining<=0){
      clearInterval(commState.postsFetchTimer);
      commState.postsFetchTimer=null;
      if(tab==='community'&&commTab==='posts')refreshCommUI();
      return;
    }
    const btn=document.getElementById('comm-refresh-btn');
    if(btn){
      btn.disabled=true;
      btn.style.opacity='.5';
      btn.style.cursor='default';
      btn.innerHTML=`${IC.refresh(13)} ${remaining}s`;
    }
  };
  commState.postsFetchTimer=setInterval(tick,1000);
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
    acceptsMessages:char.communityMessagesEnabled!==false,
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
  // Time under tension is the meaningful "most used" signal for long-wear methods.
  const counts={};
  logs.forEach(l=>{if(l.method)counts[l.method]=(counts[l.method]||0)+(Number(l.dur)||0);});
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([m])=>m);
}

function loadCommunityPrivacy(){
  if(!db||!fbUID||!fbIsGoogle)return;
  db.collection('community_users').doc(fbUID).collection('private').doc('settings').get().then(doc=>{
    if(!doc.exists)return syncCommunityPrivacy();
    const settings=doc.data()||{};
    if(Array.isArray(settings.blockedUsers))char.communityBlockedUsers=settings.blockedUsers;
    if(settings.acceptsMessages!==undefined)char.communityMessagesEnabled=settings.acceptsMessages!==false;
    saveChar();syncCommunityPrivacy();
    // Apply a block list immediately, including to a listener that may already be running.
    commState.users=commState.users.filter(u=>!isCommunityBlocked(u.uid));
    commState.posts=commState.posts.filter(p=>!isCommunityBlocked(p.uid));
    updateCommunityNotificationBadge();
    if(tab==='community')refreshCommUI();
  }).catch(()=>{});
}

function syncCommunityPrivacy(){
  if(!db||!fbUID||!fbIsGoogle)return;
  const settings={
    acceptsMessages:char.communityMessagesEnabled!==false,
    blockedUsers:(char.communityBlockedUsers||[]).slice(0,200),
    updatedAt:firebase.firestore.FieldValue.serverTimestamp()
  };
  db.collection('community_users').doc(fbUID).collection('private').doc('settings').set(settings,{merge:true}).catch(()=>{});
  db.collection('community_users').doc(fbUID).set({acceptsMessages:settings.acceptsMessages},{merge:true}).catch(()=>{});
}

function setCommunityMessagesEnabled(enabled){
  char.communityMessagesEnabled=!!enabled;saveChar();syncCommunityPrivacy();
  showToast(enabled?'Private messages are on':'Private messages are off');
}

function blockCommunityUser(uid){
  if(!uid||uid===fbUID||isCommunityBlocked(uid))return;
  confirmDialog('Block this member?','They will disappear from your community view and will not be able to send you new private messages. Existing messages stay only on their devices.','Block',()=>{
    const member=commState.users.find(user=>user.uid===uid);
    char.communityBlockedUsers=[...(char.communityBlockedUsers||[]),uid];
    char.communityBlockedProfiles={...(char.communityBlockedProfiles||{}),[uid]:member?.name||'Blocked member'};
    saveChar();syncCommunityPrivacy();
    commState.users=commState.users.filter(u=>u.uid!==uid);
    commState.posts=commState.posts.filter(p=>p.uid!==uid);
    commState.conversations=commState.conversations.filter(c=>!(c.participants||[]).includes(uid));
    document.getElementById('user-profile-ov')?.remove();
    updateCommunityNotificationBadge();
    showToast('Member blocked');
    if(tab==='community')refreshCommUI();
  });
}

function unblockCommunityUser(uid){
  char.communityBlockedUsers=(char.communityBlockedUsers||[]).filter(id=>id!==uid);
  const profiles={...(char.communityBlockedProfiles||{})};delete profiles[uid];char.communityBlockedProfiles=profiles;
  saveChar();syncCommunityPrivacy();
  showToast('Member unblocked');
  if(tab==='community'){fetchPosts(true);refreshCommUI();}
}

function recordCommunityActivity(type,detail={}){
  if(!db||!fbUID||!fbIsGoogle||!char.communityEnabled)return;
  db.collection('community_activity').add({
    type,detail,uid:fbUID,name:char.communityDisplayName||'Restorer',avatar:char.communityAvatar||'🌱',
    ts:firebase.firestore.FieldValue.serverTimestamp()
  }).catch(()=>{});
}

function fetchCommunityActivity(){
  if(!db)return;
  commState.activityLoading=true;
  db.collection('community_activity').orderBy('ts','desc').limit(10).get().then(snap=>{
    commState.activity=snap.docs.map(doc=>({id:doc.id,...doc.data()})).filter(item=>!isCommunityBlocked(item.uid));
    commState.activityLoading=false;commState.activityLoaded=true;
    if(tab==='community')refreshCommUI();
  }).catch(()=>{commState.activityLoading=false;commState.activityLoaded=true;if(tab==='community')refreshCommUI();});
}

function leaveComm(){
  if(db&&fbUID&&fbIsGoogle)db.collection('community_users').doc(fbUID).update({visible:false}).catch(()=>{});
  char.communityEnabled=false;char.communityDisplayName='';saveChar();
  if(commState.unsubUsers)commState.unsubUsers();
  if(commState.unsubPosts)commState.unsubPosts();
  // (encouragement listener removed — future Activity reactions will use a new path)
  if(commState.unsubConversations)commState.unsubConversations();
  if(commState.unsubBroadcast)commState.unsubBroadcast();
  if(commState.postsFetchTimer)clearInterval(commState.postsFetchTimer);
  commState={ready:false,loading:true,users:[],posts:[],activity:[],activityLoaded:false,activityLoading:false,conversations:[],unsubUsers:null,unsubPosts:null,unsubConversations:null,unsubBroadcast:null,authError:null,openReplies:new Set(),replies:{},broadcast:null,postsFetchCooldownUntil:0,postsFetchTimer:null};
  // NOTE: This no longer signs you out of Google — that's now a separate,
  // explicit action (signOutDevice below). Leaving the community just hides
  // your presence/posts; staying signed in means Cloud Backup keeps working
  // and rejoining later is one tap instead of a full re-auth.
  const ex=document.getElementById('comm-settings-ov');if(ex)ex.remove();
  showToast('You\'ve left the community');
  render();
}

function signOutDevice(){
  confirmDialog(
    'Sign Out of This Device?',
    'This disconnects your Google account from this device only. Your community profile, cloud backup, and data on your other devices are completely untouched — sign back in anytime with the same account to pick up right where you left off.',
    'Sign Out',
    ()=>{
      if(fbAuth)fbAuth.signOut().catch(()=>{});
      if(commState.unsubUsers)commState.unsubUsers();
      if(commState.unsubPosts)commState.unsubPosts();
      // (encouragement listener removed — future Activity reactions will use a new path)
      if(commState.unsubConversations)commState.unsubConversations();
      if(commState.unsubBroadcast)commState.unsubBroadcast();
      if(commState.postsFetchTimer)clearInterval(commState.postsFetchTimer);
      commState={ready:false,loading:true,users:[],posts:[],activity:[],activityLoaded:false,activityLoading:false,conversations:[],unsubUsers:null,unsubPosts:null,unsubConversations:null,unsubBroadcast:null,authError:null,openReplies:new Set(),replies:{},broadcast:null,postsFetchCooldownUntil:0,postsFetchTimer:null};
      db=null;fbAuth=null;fbUID=null;fbIsGoogle=false;fbUserEmail=null;
      const ex=document.getElementById('comm-settings-ov');if(ex)ex.remove();
      showToast('✓ Signed out of this device');
      render();
      initFirebase(); // re-arm anonymous browsing so Community stays viewable
    }
  );
}

const _reactLocks=new Set();
let _postSubmitting=false;
function commPost(text,title){
  if(!db||!fbUID||!fbIsGoogle||!text.trim()){showToast('⚠ Sign in with Google to post');return;}
  if(_postSubmitting){showToast('⚠ Please wait, posting…');return;}
  _postSubmitting=true;
  const postData={
    title:title||'',text:text.trim().slice(0,1000),uid:fbUID,
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
  // Optimistic removal — take it out of the local cache and re-render
  // immediately, so the feed updates without waiting for Firestore. If the
  // server write fails, we restore the previous state and show an error.
  const prevPosts=commState.posts;
  commState.posts=commState.posts.filter(p=>p.id!==postId);
  refreshCommUI();
  db.collection('posts').doc(postId).delete()
    .then(()=>showToast('✓ Post deleted'))
    .catch(()=>{
      commState.posts=prevPosts;
      refreshCommUI();
      showToast('⚠ Could not delete post — try again');
    });
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
      commState.replies[postId]=snap.docs.map(d=>({id:d.id,...d.data()})).filter(reply=>!isCommunityBlocked(reply.uid));
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

function openConversation(uid){
  if(!db||!fbUID||!fbIsGoogle){showToast('Join the community to message members');return;}
  if(!uid||uid===fbUID)return;
  if(isCommunityBlocked(uid)){showToast('Unblock this member before messaging');return;}
  const known=commState.users.find(user=>user.uid===uid);
  const open=(user)=>{
    if(!user||user.acceptsMessages===false){showToast('This member has private messages turned off');return;}
    showConversationSheet(uid,user);
  };
  if(known)open(known);
  else db.collection('community_users').doc(uid).get().then(doc=>open(doc.exists?{uid,...doc.data()}:null)).catch(()=>showToast('Could not open this conversation'));
}

function showConversationSheet(otherUID,otherUser={}){
  const existing=document.getElementById('message-ov');if(existing)existing.remove();
  const cid=conversationIdFor(fbUID,otherUID);
  const displayName=otherUser.name||'Restorer';
  const el=document.createElement('div');el.className='overlay';el.id='message-ov';
  el.innerHTML=`<div class="sheet" style="height:min(78vh,620px);display:flex;flex-direction:column;padding-bottom:18px">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;gap:9px;margin-bottom:10px">
      ${avatarCircle(otherUser.avatar||'🌱',34,'var(--acc30)','var(--acc12)')}
      <div style="flex:1;min-width:0"><div style="font-family:var(--font-display);font-size:14px;color:var(--text1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${htmlEsc(displayName)}</div><div style="font-size:9px;color:var(--text5);margin-top:2px">Private conversation</div></div>
      <button id="message-delete-convo" title="Delete conversation" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:20px;padding:5px 10px;font-size:12px;color:#a03232;cursor:pointer;font-family:var(--font-body);flex-shrink:0">🗑</button>
      <button id="message-close" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">Close</button>
    </div>
    <div id="message-thread" style="flex:1;overflow-y:auto;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:9px;margin-bottom:9px"></div>
    <div id="message-emoji-panel" style="display:none;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:8px;margin-bottom:7px;max-height:150px;overflow-y:auto"></div>
    <div style="display:flex;gap:7px;align-items:flex-end">
      <textarea id="message-inp" maxlength="500" placeholder="Write a message…" rows="1"
        style="flex:1;background:var(--bg-stat);border:1px solid var(--acc30);border-radius:10px;padding:9px 12px;color:var(--text1);font-size:13px;outline:none;font-family:var(--font-body);resize:none;max-height:120px;overflow-y:auto;line-height:1.45;min-height:38px"></textarea>
      <button id="message-emoji-btn" title="Emoji" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:17px;padding:0;line-height:1;font-family:var(--font-body);transition:background .15s,border-color .15s">😊</button>
      <button id="message-send" class="btn-gold" style="width:auto;padding:0 14px;height:38px;flex-shrink:0">Send</button>
    </div>
  </div>`;
  document.getElementById('root').appendChild(el);
  const messageRef=db.collection('conversations').doc(cid).collection('messages');
  const unsubscribe=messageRef.orderBy('ts','asc').limit(100).onSnapshot(snap=>{
    const thread=document.getElementById('message-thread');if(!thread)return;
    const nowMs=Date.now();
    const messages=snap.docs.map(doc=>({id:doc.id,...doc.data()}))
      .filter(message=>!isCommunityBlocked(message.senderUID))
      // A message the server hasn't confirmed yet has no real timestamp —
      // treat it as "right now" so it sorts to the bottom, not the top.
      .sort((a,b)=>(a.ts?.toMillis?a.ts.toMillis():nowMs)-(b.ts?.toMillis?b.ts.toMillis():nowMs));
    thread.innerHTML=messages.length?messages.map(message=>{
      const mine=message.senderUID===fbUID;
      const stamp=message.ts?.toDate?message.ts.toDate().toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'Sending…';
      return`<div style="display:flex;justify-content:${mine?'flex-end':'flex-start'};align-items:flex-end;gap:4px;margin:5px 0">
        ${mine?`<button onclick="deleteMessage('${cid}','${message.id}')" title="Delete message" style="background:none;border:none;color:var(--text5);font-size:11px;cursor:pointer;padding:2px;flex-shrink:0">✕</button>`:''}
        <div style="max-width:82%;background:${mine?'var(--acc18)':'var(--bg-card)'};border:1px solid ${mine?'var(--acc30)':'var(--stat-border)'};border-radius:10px;padding:7px 9px"><div style="font-size:12px;color:var(--text2);line-height:1.45;white-space:pre-wrap;word-break:break-word">${htmlEsc(message.text||'')}</div><div style="font-size:8px;color:var(--text5);text-align:right;margin-top:3px">${stamp}</div></div>
      </div>`;
    }).join(''):`<div data-empty-state style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--text5);font-size:11px;line-height:1.6">No messages yet.<br>Say hello when you’re ready.</div>`;
    thread.scrollTop=thread.scrollHeight;
    markConversationRead(cid);
  },error=>{console.warn('[RT] message thread listener error',error?.code,error?.message);showToast('Could not load messages');});
  const close=()=>{unsubscribe();el.remove();};
  document.getElementById('message-close').onclick=close;
  document.getElementById('message-delete-convo').onclick=()=>deleteConversation(cid,close);
  el.addEventListener('click',event=>{if(event.target===el)close();});
  const send=()=>sendPrivateMessage(cid,otherUID,otherUser);
  document.getElementById('message-send').onclick=send;

  // ── Auto-growing textarea ──
  // Starts at one line and expands up to max-height (120px ≈ 5 lines), then
  // scrolls internally. The `height:auto` reset before reading scrollHeight
  // is what lets the box shrink back down when you delete text — without it,
  // scrollHeight would keep reporting the previous larger height.
  const _inp=document.getElementById('message-inp');
  const _growInput=()=>{
    _inp.style.height='auto';
    _inp.style.height=Math.min(_inp.scrollHeight,120)+'px';
  };
  _inp.addEventListener('input',_growInput);

  // ── Enter behaviour ──
  // Enter inserts a newline (default textarea behaviour). No keydown handler
  // is registered, so the browser's default stands. Send is deliberate —
  // tap the Send button. Chosen because multi-sentence messages are common
  // in this community, and Enter-to-send makes it too easy to ship a
  // half-written message.

  // ── Emoji panel ──
  // Curated set: encouragement, common chat reactions, and a few
  // context-relevant ones (rest day, photos, sessions, progress). 8 columns
  // keeps it compact within the sheet's 480px-max width.
  const EMOJI_SET=[
    '💪','🔥','✨','🌱','🎉','👊','🙌','👍',
    '❤️','😂','😊','😅','🤔','😍','😎','🥳',
    '🤝','🙏','👋','🤗','🛌','📸','⏱','📈',
    '🎯','🏅','⚡','💎','🌟','🍀','🚀','💯',
    '👏','🤞','😌','🤙','✌️','☀️','🌙','🌊'
  ];
  const _emojiPanel=document.getElementById('message-emoji-panel');
  const _emojiBtn=document.getElementById('message-emoji-btn');
  _emojiPanel.innerHTML=`<div style="display:grid;grid-template-columns:repeat(8,1fr);gap:2px">${
    EMOJI_SET.map(e=>`<button type="button" data-emoji="${e}" style="background:none;border:none;font-size:22px;cursor:pointer;padding:4px;border-radius:6px;line-height:1;transition:background .12s">${e}</button>`).join('')
  }</div>`;
  _emojiPanel.querySelectorAll('[data-emoji]').forEach(btn=>{
    btn.addEventListener('mouseenter',()=>btn.style.background='var(--bg-card)');
    btn.addEventListener('mouseleave',()=>btn.style.background='none');
    btn.onclick=()=>{
      const emoji=btn.dataset.emoji;
      // Insert at cursor position (or at end if there's no selection)
      const start=_inp.selectionStart??_inp.value.length;
      const end=_inp.selectionEnd??_inp.value.length;
      _inp.value=_inp.value.slice(0,start)+emoji+_inp.value.slice(end);
      const newPos=start+emoji.length;
      _inp.setSelectionRange(newPos,newPos);
      _inp.focus();
      _growInput();
      if(navigator.vibrate)navigator.vibrate(8);
    };
  });
  _emojiBtn.onclick=()=>{
    const open=_emojiPanel.style.display==='none';
    _emojiPanel.style.display=open?'block':'none';
    _emojiBtn.style.background=open?'var(--acc12)':'var(--bg-stat)';
    _emojiBtn.style.borderColor=open?'var(--acc30)':'var(--stat-border)';
  };

  _inp.focus();
}

function markConversationRead(conversationId){
  if(!db||!fbUID)return;
  db.collection('conversations').doc(conversationId).update({unreadBy:firebase.firestore.FieldValue.arrayRemove(fbUID)}).catch(()=>{});
}

function sendPrivateMessage(conversationId,otherUID,otherUser){
  const input=document.getElementById('message-inp');
  const text=input?.value.trim();if(!text||!db||!fbUID)return;
  input.value='';input.disabled=true;
  // Reset auto-grow height back to one line. Without this, the textarea
  // would keep the taller height it grew to while typing the previous
  // message.
  input.style.height='auto';
  db.collection('community_users').doc(otherUID).get().then(doc=>{
    if(!doc.exists||doc.data().acceptsMessages===false)throw new Error('disabled');
    const conversation=db.collection('conversations').doc(conversationId);
    const message=conversation.collection('messages').doc();
    const info={
      [fbUID]:{name:char.communityDisplayName||'Restorer',avatar:char.communityAvatar||'🌱'},
      [otherUID]:{name:otherUser.name||doc.data().name||'Restorer',avatar:otherUser.avatar||doc.data().avatar||'🌱'}
    };
    const batch=db.batch();
    batch.set(conversation,{participants:[fbUID,otherUID].sort(),participantInfo:info,updatedAt:firebase.firestore.FieldValue.serverTimestamp(),lastMessage:text.slice(0,500),lastSenderUID:fbUID,unreadBy:[otherUID]},{merge:true});
    batch.set(message,{senderUID:fbUID,text:text.slice(0,500),ts:firebase.firestore.FieldValue.serverTimestamp()});
    return batch.commit();
  }).then(()=>{if(input)input.disabled=false;}).catch(error=>{
    if(input)input.disabled=false;
    console.warn('[RT] sendPrivateMessage error',error?.code,error?.message);
    showToast(error?.message==='disabled'?'This member has private messages turned off':'⚠ Could not send message');
  });
}

function deleteMessage(cid,messageId){
  if(!db||!fbUID)return;
  confirmDialog(
    'Delete this message?',
    'This removes it for both people in the conversation. This cannot be undone.',
    'Delete',
    ()=>{
      db.collection('conversations').doc(cid).collection('messages').doc(messageId).delete()
        .catch(error=>{console.warn('[RT] deleteMessage error',error?.code,error?.message);showToast('⚠ Could not delete message');});
    }
  );
}

function deleteConversation(cid,onDone){
  if(!db||!fbUID)return;
  confirmDialog(
    'Delete this conversation?',
    'This permanently deletes the entire message history for both people. This cannot be undone.',
    'Delete Conversation',
    ()=>{
      const messagesRef=db.collection('conversations').doc(cid).collection('messages');
      const wipeNext=()=>messagesRef.limit(400).get().then(snap=>{
        if(snap.empty)return db.collection('conversations').doc(cid).delete();
        const batch=db.batch();
        snap.docs.forEach(doc=>batch.delete(doc.ref));
        return batch.commit().then(wipeNext);
      });
      wipeNext().then(()=>{
        commState.conversations=commState.conversations.filter(c=>c.id!==cid);
        showToast('✓ Conversation deleted');
        if(onDone)onDone();
      }).catch(error=>{
        console.warn('[RT] deleteConversation error',error?.code,error?.message);
        showToast('⚠ Could not delete conversation');
      });
    }
  );
}

function showMessagesInbox(){
  if(!fbIsGoogle){showToast('Join the community to use messages');return;}
  const existing=document.getElementById('inbox-ov');if(existing)existing.remove();
  const rows=commState.conversations.map(conversation=>{
    const otherUID=(conversation.participants||[]).find(id=>id!==fbUID);
    const info=conversation.participantInfo?.[otherUID]||{};
    const unread=(conversation.unreadBy||[]).includes(fbUID);
    const timestamp=conversation.updatedAt?.toDate?conversation.updatedAt.toDate().toLocaleDateString(undefined,{month:'short',day:'numeric'}):'';
    return`<div style="display:flex;align-items:center;gap:4px;padding:10px 0;border-bottom:1px solid var(--stat-border)">
      <button class="inbox-row" data-uid="${htmlEsc(otherUID)}" style="flex:1;min-width:0;text-align:left;display:flex;gap:9px;align-items:center;background:none;border:0;cursor:pointer;font-family:var(--font-body);padding:0">
        ${avatarCircle(info.avatar||'🌱',34,'var(--acc18)','var(--acc6)')}
        <div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:${unread?700:600};color:var(--text1)">${htmlEsc(info.name||'Restorer')}</div><div style="font-size:10px;color:var(--text4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">${htmlEsc(conversation.lastMessage||'')}</div></div>
        <div style="font-size:9px;color:${unread?'var(--accent)':'var(--text5)'};font-weight:${unread?700:400};flex-shrink:0">${unread?'New':timestamp}</div>
      </button>
      <button class="inbox-del" data-cid="${htmlEsc(conversation.id)}" title="Delete conversation" style="background:none;border:none;color:var(--text5);font-size:13px;cursor:pointer;padding:6px;flex-shrink:0">🗑</button>
    </div>`;
  }).join('');
  const el=document.createElement('div');el.className='overlay';el.id='inbox-ov';
  el.innerHTML=`<div class="sheet" style="max-height:78vh"><div class="sheet-handle"></div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px"><div style="font-family:var(--font-display);font-size:14px;color:var(--accent)">Messages</div><button id="inbox-close" class="btn-outline" style="padding:5px 11px;font-size:10px">Close</button></div><div style="font-size:10px;color:var(--text5);line-height:1.5;margin-bottom:8px">Private messages are opt-in. You control this in Community Settings.</div><div>${rows||'<div style="padding:24px 0;text-align:center;font-size:11px;color:var(--text5)">No conversations yet.</div>'}</div></div>`;
  document.getElementById('root').appendChild(el);
  document.getElementById('inbox-close').onclick=()=>el.remove();
  el.addEventListener('click',event=>{if(event.target===el)el.remove();});
  el.querySelectorAll('.inbox-row').forEach(button=>button.onclick=()=>{
    const uid=button.dataset.uid;const user=commState.users.find(item=>item.uid===uid)||{uid,...(commState.conversations.find(item=>item.id===conversationIdFor(fbUID,uid))?.participantInfo?.[uid]||{})};
    el.remove();showConversationSheet(uid,user);
  });
  el.querySelectorAll('.inbox-del').forEach(button=>button.onclick=(event)=>{
    event.stopPropagation();
    deleteConversation(button.dataset.cid,()=>showMessagesInbox());
  });
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
    return`<div style="text-align:center;padding:60px 20px">
      <div class="live-dot" style="display:inline-block;margin-bottom:14px"></div>
      <div style="font-size:12px;color:var(--text3);font-weight:600;margin-bottom:6px">Connecting to the community…</div>
      <div style="font-size:10px;color:var(--text5);line-height:1.6">First load can take a moment while we find who's online.</div>
    </div>`;
  }

  const isJoined=!!(char.communityEnabled&&char.communityDisplayName&&fbIsGoogle);
  const reacted=JSON.parse(localStorage.getItem('rst-reactions')||'{}');
  const now=Date.now();
  const running=!!activeTimer&&!!activeTimer.startedAt;


  // Active users = anyone whose `active` flag is true, full stop. No
  // lastSeen recency check. A session is real from the moment it starts
  // until the user ends it — even if their phone sleeps or the app gets
  // backgrounded. Members and Live tabs must agree on this rule, or the
  // same person appears in one "restoring now" section but not the other.
  const active=commState.users.filter(u=>u.active);
  // Count of members who've been around in the last 2 hours. Used only as a
  // warm hint inside the Live tab's empty state — Live itself is purely a
  // "who's in a session right now" view, with no secondary list competing
  // for the user's attention.
  const recentlyActiveCount=commState.users.filter(u=>{
    if(!u.lastSeen)return false;
    const ms=u.lastSeen.toMillis?u.lastSeen.toMillis():new Date(u.lastSeen).getTime();
    return(now-ms)<2*60*60*1000;
  }).length;
  const regularPosts=commState.posts.filter(p=>p.type!=='milestone');
  const unreadMessages=commState.conversations.filter(c=>(c.unreadBy||[]).includes(fbUID)).length;
  const memberCount=commState.users.length;
  // Sum of every member's synced totalHours. Members who've opted out of
  // sharing stats contribute 0 — their data isn't visible anywhere, so
  // it shouldn't be summed here either.
  const totalHoursRestored=commState.users.reduce((sum,u)=>sum+(u.totalHours||0),0);

  // ── Status bar (joined) or join banner ──
  const topBar=!isJoined
    ?`<div style="background:var(--bg-card-gold);border:1px solid var(--card-border-gold);border-radius:12px;padding:16px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--accent);margin-bottom:10px">
          <span style="font-size:19px;line-height:1">👋</span> Welcome to the Community
        </div>
        <div style="font-size:12px;color:var(--text3);line-height:1.75;margin-bottom:14px">
          Real people restoring right now. Browse freely — or <strong style="color:var(--text2)">join with Google</strong> to post, message, and appear on the Live tab. You can leave and rejoin anytime.
        </div>
        <button class="btn-gold" id="comm-join-btn" style="display:flex;align-items:center;justify-content:center;gap:7px;font-size:13px">
          <svg width="14" height="14" viewBox="0 0 24 24" style="flex-shrink:0"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.66h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Join as ${htmlEsc(char.name)}
        </button>
      </div>`
    :`<div style="background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:12px;margin-bottom:10px;overflow:hidden">
        <div style="padding:10px 14px;display:flex;align-items:center;gap:10px">
          <div style="position:relative;flex-shrink:0;cursor:pointer" onclick="showUserProfile('${fbUID||''}')">
            ${avatarCircle(char.communityAvatar||'🌱',36,'var(--acc30)','var(--acc12)')}
            ${running?`<div style="position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:var(--green);border:2px solid var(--bg-card)"></div>`:''}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px;color:var(--text1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${timeOfDayGreeting(char.communityDisplayName)}</div>
            <div style="font-size:10px;color:var(--text4);margin-top:1px">${LEVELS[char.ciLevel||0].ci} · ${running?'<span style="color:var(--green)">● Restoring now</span>':(char.communityVisible!==false?'● Visible':'○ Hidden')}</div>
          </div>
          <button onclick="showMessagesInbox()" style="position:relative;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:6px 10px;font-size:12px;color:var(--text3);cursor:pointer;font-family:var(--font-body);flex-shrink:0" title="Messages">💬${unreadMessages?`<span style="position:absolute;top:-5px;right:-5px;background:#e74c3c;color:#fff;border-radius:9px;min-width:15px;height:15px;font-size:8px;line-height:15px;font-weight:700">${unreadMessages}</span>`:''}</button>
          <button onclick="showCommSettings()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:6px 10px;font-size:12px;color:var(--text3);cursor:pointer;font-family:var(--font-body);flex-shrink:0">${IC.settings(14)}</button>
        </div>
        <div style="border-top:1px solid var(--stat-border);padding:9px 14px;display:flex;align-items:center;gap:8px;font-size:11px;color:var(--text4);flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="live-dot" style="flex-shrink:0"></span>
            <span style="color:var(--green);font-weight:700">${active.length}</span>
            <span>restoring now</span>
          </div>
          <span style="color:var(--text6);opacity:.5">·</span>
          <div><span style="color:var(--text2);font-weight:700">${memberCount}</span> member${memberCount!==1?'s':''}</div>
          ${totalHoursRestored>0?`<span style="color:var(--text6);opacity:.5">·</span>
          <div><span style="color:var(--accent);font-weight:700">${Number(totalHoursRestored).toLocaleString('en-US')}h</span> restored so far</div>`:''}
        </div>
      </div>`;

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
    {id:'activity',label:'⚡ Activity',badge:null},
    {id:'members',label:'👥 Members', badge:null},
  ];
  const tabBar=`<div style="display:flex;gap:5px;margin-bottom:12px;background:var(--bg-stat);border-radius:10px;padding:4px">
    ${tabs.map(t=>`
      <button onclick="commTab='${t.id}';setLastSeen('${t.id}');${t.id==='posts'?'fetchPosts(true);':t.id==='activity'?'fetchCommunityActivity();':''}refreshCommUI()" style="flex:1;padding:7px 4px;border:none;border-radius:7px;cursor:pointer;font-size:11px;font-weight:600;font-family:var(--font-body);transition:all .15s;position:relative;
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
    const activityHint=recentlyActiveCount>0
      ?`<div style="font-size:10px;color:var(--text5);margin-top:12px">${recentlyActiveCount} member${recentlyActiveCount!==1?'s were':' was'} around recently</div>`
      :'';
    const activeCards=active.length
      ?active.map(u=>buildUserCard(u,now,isJoined,'live')).join('')
      :`<div style="text-align:center;padding:32px 20px;background:var(--bg-stat);border-radius:12px">
          <div style="font-size:32px;margin-bottom:10px;opacity:.7">◉</div>
          <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:6px">No one restoring right now</div>
          <div style="font-size:11px;color:var(--text4);line-height:1.7;max-width:280px;margin:0 auto">${isJoined?'Be the first — start a session and you\'ll appear here.':'Join the community and start a session to appear here.'}</div>
          ${activityHint}
        </div>`;
    content=`
      <div style="font-size:13px;font-weight:700;color:var(--text1);margin-bottom:8px">${active.length>0?'Restoring Right Now':'Active Now'}</div>
      ${activeCards}`;
  }

  else if(commTab==='posts'){
    const feedCards=commState.postsLoading
      ?`<div style="text-align:center;padding:28px 16px;color:var(--text5);font-size:11px">
          <div class="live-dot" style="display:inline-block;margin-bottom:8px"></div><br>Loading posts...
        </div>`
      :regularPosts.length
        ?regularPosts.map(p=>buildPostCard(p,now,reacted,isJoined)).join('')
        :`<div style="text-align:center;padding:32px 20px;background:var(--bg-stat);border-radius:12px">
            <div style="font-size:32px;margin-bottom:10px;opacity:.7">💬</div>
            <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:6px">The community is quiet</div>
            <div style="font-size:11px;color:var(--text4);line-height:1.7;max-width:280px;margin:0 auto">${isJoined?'Share a question, a win, or an observation. Even a short post helps the next person feel less alone.':'Posts from members will appear here as they share updates.'}</div>
          </div>`;
    const _postCooldownRemaining=Math.max(0,Math.ceil((commState.postsFetchCooldownUntil-Date.now())/1000));
    content=`
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:13px;font-weight:700;color:var(--text1)">Community Posts</div>
        <div style="display:flex;gap:6px;align-items:center">
          ${isJoined?`<button id="comm-post-btn" style="background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:5px 12px;font-size:11px;font-weight:700;color:var(--accent);cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;gap:5px">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            New Post
          </button>`:''}
          ${_postCooldownRemaining>0
            ? `<button id="comm-refresh-btn" disabled style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--text4);cursor:default;font-family:var(--font-body);display:flex;align-items:center;gap:5px;opacity:.5">${IC.refresh(13)} ${_postCooldownRemaining}s</button>`
            : `<button id="comm-refresh-btn" onclick="fetchPosts();refreshCommUI()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body);display:flex;align-items:center;gap:5px">${IC.refresh(13)} Refresh</button>`
          }
        </div>
      </div>
      ${feedCards}`;
  }

  else if(commTab==='activity'){
    const buildActivityItem=(item)=>{
      const type=item.type;
      const uid=item.uid||'';
      const name=htmlEsc(item.name||'Restorer');
      const avatar=item.avatar||'🌱';
      const eventMs=item.ts?.toMillis?item.ts.toMillis():Date.now();
      const detail=item.detail||{};
      const nameHtml=`<strong onclick="event.stopPropagation();showUserProfile('${uid}')" style="color:var(--text1);cursor:pointer">${name}</strong>`;
      const nameDim=`<strong onclick="event.stopPropagation();showUserProfile('${uid}')" style="color:var(--text2);cursor:pointer">${name}</strong>`;

      // Hero cards — gold border, larger avatar, icon badge in the corner.
      if(type==='ci_reached'){
        const ci=Math.min(Number(detail.ci)||0,10);
        return`<div style="background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:12px;padding:12px;margin-bottom:7px;display:flex;gap:11px;align-items:center">
          <div onclick="event.stopPropagation();showUserProfile('${uid}')" style="position:relative;flex-shrink:0;cursor:pointer">
            ${avatarCircle(avatar,42,'var(--acc30)','var(--acc12)')}
            <div style="position:absolute;bottom:-2px;right:-2px;width:22px;height:22px;border-radius:50%;background:var(--bg-card);border:1.5px solid var(--acc30);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--accent)">◑</div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;color:var(--text3);line-height:1.4;margin-bottom:2px">${nameHtml}</div>
            <div style="font-size:14px;font-weight:700;color:var(--accent);line-height:1.35">Reached ${LEVELS[ci].ci}</div>
            <div style="font-size:9px;color:var(--text5);margin-top:3px">${timeAgo(eventMs)}</div>
          </div>
        </div>`;
      }
      if(type==='badge_unlocked'){
        const icon=detail.icon||'🏅';
        const title=htmlEsc(detail.title||'a milestone');
        return`<div style="background:var(--bg-card);border:1px solid var(--card-border-gold);border-radius:12px;padding:12px;margin-bottom:7px;display:flex;gap:11px;align-items:center">
          <div onclick="event.stopPropagation();showUserProfile('${uid}')" style="position:relative;flex-shrink:0;cursor:pointer">
            ${avatarCircle(avatar,42,'var(--acc30)','var(--acc12)')}
            <div style="position:absolute;bottom:-2px;right:-2px;width:22px;height:22px;border-radius:50%;background:var(--bg-card);border:1.5px solid var(--acc30);display:flex;align-items:center;justify-content:center;font-size:12px">${icon}</div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;color:var(--text3);line-height:1.4;margin-bottom:2px">${nameHtml}</div>
            <div style="font-size:13px;font-weight:700;color:var(--accent);line-height:1.35">${title} unlocked 🏅</div>
            <div style="font-size:9px;color:var(--text5);margin-top:3px">${timeAgo(eventMs)}</div>
          </div>
        </div>`;
      }

      // Pulse rows — a session just started. Small, dim, green dot.
      if(type==='session_started'){
        const method=htmlEsc(detail.method||'a session');
        return`<div style="display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--stat-border)">
          <div onclick="event.stopPropagation();showUserProfile('${uid}')" style="position:relative;flex-shrink:0;cursor:pointer">
            ${avatarCircle(avatar,28,'var(--green)','var(--green-bg)')}
            <div style="position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:50%;background:var(--green);border:2px solid var(--bg-card)"></div>
          </div>
          <div style="flex:1;min-width:0;font-size:11px;color:var(--text3);line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${nameDim} just started <strong style="color:var(--text1)">${method}</strong></div>
          <div style="font-size:9px;color:var(--text5);flex-shrink:0">${timeAgo(eventMs)}</div>
        </div>`;
      }

      // Standard rows — completed sessions, streak milestones.
      let description='recorded a restoration activity.';
      if(type==='session_completed'){
        const dur=fmtDur(Number(detail.duration)||0);
        const method=htmlEsc(detail.method||'a method');
        description=detail.first
          ?`logged their <strong style="color:var(--text1)">first session</strong> 🌱`
          :`finished <strong style="color:var(--text1)">${dur}</strong> with <strong style="color:var(--text1);font-weight:600">${method}</strong>`;
      } else if(type==='streak_milestone'){
        const days=Number(detail.days)||0;
        description=`hit a <strong style="color:#F59E0B">${days}-day streak</strong> 🔥`;
      }
      return`<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--stat-border)">
        <div onclick="event.stopPropagation();showUserProfile('${uid}')" style="flex-shrink:0;cursor:pointer">${avatarCircle(avatar,34,'var(--acc18)','var(--acc6)')}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;color:var(--text2);line-height:1.55">${nameHtml} ${description}</div>
          <div style="font-size:9px;color:var(--text5);margin-top:3px">${timeAgo(eventMs)}</div>
        </div>
      </div>`;
    };

    const activityBody=commState.activityLoading
      ?`<div style="text-align:center;padding:28px;color:var(--text5);font-size:11px"><div class="live-dot" style="display:inline-block;margin-bottom:8px"></div><br>Loading activity…</div>`
      :commState.activity.length
        ?commState.activity.map(buildActivityItem).join('')
        :`<div style="text-align:center;padding:24px 8px">
            <div style="font-size:30px;margin-bottom:10px;opacity:.6">⚡</div>
            <div style="font-size:12px;font-weight:600;color:var(--text2);margin-bottom:5px">No activity yet</div>
            <div style="font-size:11px;color:var(--text4);line-height:1.7">The feed starts with the first session.<br>Finish one and yours will be the latest entry here.</div>
          </div>`;
    // Ambient subline derived from the feed's own data. Uses only entries
    // already loaded — no new reads. Falls back gracefully when the feed is
    // empty or the load is still in flight.
    const activitySubline=(()=>{
      if(commState.activityLoading)return'Loading…';
      if(!commState.activity.length)return'No activity yet — be the first';
      const nowMs=Date.now();
      const recentCount=commState.activity.filter(item=>{
        const ms=item.ts?.toMillis?item.ts.toMillis():0;
        return ms>0&&(nowMs-ms)<3*60*60*1000;
      }).length;
      const hour=new Date().getHours();
      if(recentCount>=4)return'An active day in the community';
      if(hour<12&&recentCount===0)return'A quiet morning — be the first';
      if(hour>=18&&recentCount>0)return'Winding down after a good day';
      if(recentCount===0)return'Quiet today so far';
      return'What the community has been up to';
    })();
    content=`<div style="margin-bottom:8px"><div style="font-size:13px;font-weight:700;color:var(--text1)">Recent Activity</div><div style="font-size:10px;color:var(--text5);margin-top:2px">${activitySubline}</div></div><div class="card" style="padding:4px 12px">${activityBody}</div>`;
  }
  else if(commTab==='members'){
    const allMembers=commState.users;
    if(!allMembers.length){
      content=`<div style="text-align:center;padding:32px 20px;background:var(--bg-stat);border-radius:12px">
        <div style="font-size:32px;margin-bottom:10px;opacity:.7">👥</div>
        <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:6px">Be the first member</div>
        <div style="font-size:11px;color:var(--text4);line-height:1.7;max-width:280px;margin:0 auto">${isJoined?'Invite friends who restore — or watch this list grow as others join.':'Join the community to add yourself to the list.'}</div>
      </div>`;
    } else {
      // Bucket each member by last-seen recency. Users who have never been
      // seen (or 30+ days ago) land in the final "Community" segment with
      // no timestamp — the point is presence, not the number of days away.
      // Members currently in a session fold into "Active this week" so this
      // tab stays a pure roster — the Live tab is the one place to see who's
      // restoring right now.
      const bucketOf=(u)=>{
        if(u.active)return 'week';
        if(!u.lastSeen)return 'older';
        const ms=u.lastSeen.toMillis?u.lastSeen.toMillis():new Date(u.lastSeen).getTime();
        const days=(now-ms)/86400000;
        if(days<7)return 'week';
        if(days<30)return 'month';
        return 'older';
      };
      const segWeek=[],segMonth=[],segOlder=[];
      allMembers.forEach(u=>{
        const b=bucketOf(u);
        if(b==='week')segWeek.push(u);
        else if(b==='month')segMonth.push(u);
        else segOlder.push(u);
      });
      // Float active users to the top of "Active this week" so the live
      // signal still leads the section even without its own header.
      segWeek.sort((a,b)=>{
        if(a.active!==b.active)return a.active?-1:1;
        return 0;
      });
      // The roster is a single continuous list. Members with a recent
      // timestamp sit above a thin divider; everyone else sits below it.
      // The divider makes no claim about intent — it just separates "has a
      // timestamp" from "doesn't." The card content itself (e.g. "Active 4d
      // ago") carries the recency signal, so no section labels are needed.
      const hasRecent=segWeek.length||segMonth.length;
      const showDivider=hasRecent&&segOlder.length;
      content=`
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px">
          <div style="font-size:13px;font-weight:700;color:var(--text1)">Members</div>
          <div style="font-size:10px;color:var(--text5)">${allMembers.length} total</div>
        </div>
        ${segWeek.map(u=>buildUserCard(u,now,isJoined)).join('')}
        ${segMonth.map(u=>buildUserCard(u,now,isJoined,'member')).join('')}
        ${showDivider?`<div style="height:1px;background:var(--stat-border);margin:14px 0"></div>`:''}
        ${segOlder.map(u=>buildUserCard(u,now,isJoined,'dormant')).join('')}
      `;
    }
  }

  return`${topBar}${broadcastBanner}${tabBar}${content}`;
}

// Dismisses the one-time welcome banner. Removes the element immediately
// for a smooth feel; also stores the flag so subsequent renders skip it.
function dismissCommunityWelcome(){
  localStorage.setItem('rst-comm-welcome-seen','1');
  const el=document.getElementById('comm-welcome-banner');
  if(el)el.remove();
}

// mode: 'live' | 'member' | 'dormant'. Defaults based on activity.
//   live    — currently restoring: shows method + elapsed, green accent
//   member  — recently active: shows timeAgo, neutral accent
//   dormant — 30+ days inactive: no timestamp (avoids reading as "dead")
function buildUserCard(u,now,isJoined,mode){
  mode=mode||(u.active?'live':'member');
  const isMe=u.uid===fbUID;
  const ms=u.lastSeen?.toMillis?u.lastSeen.toMillis():0;
  let secondLine='';
  if(u.active){
    let elapsedStr='Active now';
    if(u.sessionStartedAt){
      const sessStartMs=u.sessionStartedAt.toMillis?u.sessionStartedAt.toMillis():new Date(u.sessionStartedAt).getTime();
      elapsedStr=fmtDur(Math.floor((now-sessStartMs)/60000));
    } else if(u.todayMins>0){
      elapsedStr=fmtDur(u.todayMins)+' today';
    }
    secondLine=`${u.method?`<span style="color:var(--text2)">${u.method}</span> · `:''}<span style="color:var(--green);font-weight:600">${elapsedStr}</span>`;
  } else if(mode==='dormant'){
    if(u.lastSeen){
      const ms=u.lastSeen.toMillis?u.lastSeen.toMillis():new Date(u.lastSeen).getTime();
      const mo=new Date(ms).toLocaleDateString('en',{month:'long'});
      secondLine=`<span style="color:var(--text5);font-style:italic">Last here in ${mo}</span>`;
    } else if(u.joinedAt){
      const ms=u.joinedAt.toMillis?u.joinedAt.toMillis():new Date(u.joinedAt).getTime();
      const mo=new Date(ms).toLocaleDateString('en',{month:'long'});
      secondLine=`<span style="color:var(--text5);font-style:italic">Joined ${mo}</span>`;
    } else {
      secondLine=`<span style="color:var(--text5);font-style:italic">Community member</span>`;
    }
  } else {
    const timeStr=ms>0?timeAgo(ms):'—';
    secondLine=`<span style="color:var(--text4)">Active ${timeStr}</span>`;
  }
  return`<div onclick="showUserProfile('${u.uid}')" style="background:var(--bg-card);border:1px solid ${u.active?'var(--green-border)':'var(--card-border)'};border-radius:12px;padding:12px;margin-bottom:7px;display:flex;gap:10px;align-items:center;cursor:pointer;transition:border-color .2s">
    <div style="position:relative;flex-shrink:0">
      ${avatarCircle(u.avatar||'🌱',38,u.active?'var(--green)':'var(--acc30)',u.active?'var(--green-bg)':'var(--acc12)',avatarRingFor(u))}
      ${u.active?`<div style="position:absolute;bottom:0;right:0;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid var(--bg-card)"></div>`:''}
    </div>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span style="font-weight:700;font-size:13px;color:var(--text1)">${u.name||'Restorer'}</span>
        <span style="font-family:var(--font-display);font-size:10px;color:var(--accent)">${LEVELS[Math.min(u.ci||0,10)].ci}</span>
        ${(u.streak||0)>2?`<span style="font-size:10px;color:#F59E0B">${u.streak}🔥</span>`:''}
        ${isMe?`<span style="font-size:9px;color:var(--text5)">· you</span>`:''}
      </div>
      <div style="font-size:10px;color:var(--text4);margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${secondLine}</div>
    </div>
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
                  <span style="font-family:var(--font-display);font-size:9px;color:var(--accent)">${LEVELS[Math.min(r.ci||0,10)].ci}</span>
                  <span style="font-size:9px;color:var(--text5);margin-left:auto">${rago}</span>
                </div>
                <div style="font-size:12px;color:var(--text2);line-height:1.6;white-space:pre-line">${htmlEsc(r.text||'')}</div>
              </div>
            </div>`;
          }).join('');

    const replyInput=isJoined
      ?`<div style="display:flex;gap:7px;align-items:center;padding-top:8px;border-top:1px solid var(--stat-border);margin-top:4px">
          ${avatarCircle(char.communityAvatar||'🌱',28,'var(--acc18)','var(--acc6)')}
          <input id="reply-inp-${p.id}" placeholder="Write a reply..." maxlength="200"
            style="flex:1;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:6px 12px;color:var(--text1);font-size:12px;outline:none;font-family:var(--font-body)"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();commReply('${p.id}');}">
          <button onclick="commReply('${p.id}')" style="background:var(--accent);border:none;border-radius:20px;padding:6px 12px;font-size:11px;font-weight:700;color:var(--bg);cursor:pointer;font-family:var(--font-body);flex-shrink:0">Send</button>
        </div>`
      :`<div style="font-size:10px;color:var(--text5);padding-top:8px;border-top:1px solid var(--stat-border);text-align:center">Join the community to reply</div>`;

    replySection=`<div style="padding:0 2px;margin-top:2px">${replyItems}${replyInput}</div>`;
  }

  return`<div style="background:var(--bg-card);border:1px solid ${isMilestone?'var(--card-border-gold)':'var(--card-border)'};border-radius:12px;padding:12px;margin-bottom:7px">
    <div style="display:flex;gap:9px;align-items:flex-start;margin-bottom:9px">
      <div ${!isMilestone?`onclick="event.stopPropagation();showUserProfile('${p.uid}')"`:''} style="width:38px;height:38px;border-radius:50%;background:${isMilestone?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isMilestone?'var(--acc30)':'var(--stat-border)'};display:flex;align-items:center;justify-content:center;font-size:${isMilestone?'18':'20'}px;flex-shrink:0;line-height:1;${!isMilestone?'cursor:pointer;':''}">${isMilestone?(p.mIcon||'🏅'):(p.avatar||'🌱')}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:4px">
          <span ${!isMilestone?`onclick="event.stopPropagation();showUserProfile('${p.uid}')"`:''} style="font-weight:600;font-size:12px;color:var(--text1);${!isMilestone?'cursor:pointer;':''}">${p.name||'Restorer'}</span>
          <span style="font-family:var(--font-display);font-size:9px;color:var(--accent)">${LEVELS[Math.min(p.ci||0,10)].ci}</span>
          <span style="font-size:9px;color:var(--text5);margin-left:auto">${ago}</span>
        </div>
        ${p.title?`<div style="font-size:13px;font-weight:700;color:var(--text1);margin-bottom:4px;line-height:1.4">${htmlEsc(p.title)}</div>`:''}
        ${isMilestone
          ?`<div style="font-size:12px;color:var(--text2)"><span style="color:var(--accent);font-weight:600">${htmlEsc(p.mTitle||p.text)}</span> unlocked 🎉</div>`
          :`<div style="font-size:12px;color:var(--text2);line-height:1.65;white-space:pre-line">${htmlEsc(p.text||'')}</div>`}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:6px;padding-top:8px;border-top:1px solid var(--stat-border);flex-wrap:wrap">
      ${reactions.map(({r,emoji,field})=>{
        const count=p[field]||0;
        const myPick=isJoined?reacted[p.id]:null;
        const myR=myPick===r;
        const dimmed=isJoined&&!!myPick&&!myR;
        return`<button onclick="${isJoined?`commReact('${p.id}','${r}')`:`showToast('Join the community to react')`}"
          style="background:${myR?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${myR?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:4px 10px;font-size:12px;cursor:pointer;color:${myR?'var(--accent)':isJoined?'var(--text4)':'var(--text5)'};display:inline-flex;align-items:center;gap:3px;font-family:var(--font-body);opacity:${!isJoined?'.55':dimmed?'.4':'1'};transition:opacity .15s">
          ${emoji}<span style="font-size:11px;font-weight:${myR?700:400}">${count||''}</span>
        </button>`;
      }).join('')}
      <button onclick="toggleReplies('${p.id}')"
        style="background:${isOpen?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${isOpen?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:4px 10px;font-size:11px;cursor:pointer;color:${isOpen?'var(--accent)':'var(--text4)'};display:inline-flex;align-items:center;gap:4px;font-family:var(--font-body)">
        💬 <span>${replyCount>0?replyCount:''} ${isOpen?'Hide':'Reply'}</span>
      </button>
      ${isMe
        ?`<button onclick="confirmDialog('Delete this post?','It will be permanently removed from the feed. This cannot be undone.','Delete',()=>deleteCommPost('${p.id}'))" style="margin-left:auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:6px;padding:4px 8px;font-size:11px;color:#a03232;cursor:pointer;font-family:var(--font-body);display:inline-flex;align-items:center;gap:4px" title="Delete post">${IC.trash(12)}</button>`
        :`<button onclick="reportPost('${p.id}')" style="margin-left:auto;background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:var(--font-body);display:inline-flex;align-items:center;gap:4px" title="Report this post">${IC.flag(12)} Report</button>`
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
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:12px">New Post</div>
    <input id="post-title" class="gold-inp" placeholder="Topic title (optional)..." maxlength="60" style="font-size:13px;margin-bottom:8px">
    <textarea id="post-text" placeholder="Share a win, a question, an observation..." maxlength="1000" style="min-height:120px;font-size:13px;margin-bottom:4px"></textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div style="font-size:10px;color:var(--text5)">Be real — honesty is appreciated over hype.</div>
      <div id="post-char" style="font-size:10px;color:var(--text5)">0 / 1000</div>
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
    if(cc){cc.textContent=`${n} / 1000`;cc.style.color=n>900?'#c0392b':'var(--text5)';}
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
  const canMessage=!isMe&&fbIsGoogle&&u.acceptsMessages!==false&&!isCommunityBlocked(uid);
  const ex=document.getElementById('user-profile-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='user-profile-ov';

  const joinedStr=u.joinedAt?.toDate?
    u.joinedAt.toDate().toLocaleDateString('en',{month:'long',year:'numeric'}):null;

  const methods=u.topMethods||[];
  const methodsHtml=methods.length?`
    <div style="margin-bottom:14px">
      <div style="font-size:10px;font-weight:700;color:var(--text4);margin-bottom:8px;text-transform:uppercase;letter-spacing:1.2px">Preferred Methods</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${methods.map((m,i)=>`<span style="background:${i===0?'var(--acc12)':'var(--bg-stat)'};border:1px solid ${i===0?'var(--acc30)':'var(--stat-border)'};border-radius:20px;padding:5px 12px;font-size:11px;color:${i===0?'var(--accent)':'var(--text3)'};font-weight:${i===0?'600':'400'}">${m}</span>`).join('')}
      </div>
    </div>`:'';

  // Milestones are collapsed by default — the count is the hook, the list
  // is opt-in. A wall of 44 badges reads as a spreadsheet, not achievements.
  const userAchs=u.achievements||[];
  const earnedBadges=ACHS.filter(a=>userAchs.includes(a.id));
  // Hero-tier badges (mid-to-high achievements, defined by HERO_BADGE_IDS)
  // float to the top of the list, so tapping in shows the person's strongest
  // achievements first. Sort is stable in modern browsers, so the original
  // ACHS order is preserved within each tier.
  const sortedBadges=[...earnedBadges].sort((a,b)=>{
    const ah=HERO_BADGE_IDS.has(a.id)?0:1;
    const bh=HERO_BADGE_IDS.has(b.id)?0:1;
    return ah-bh;
  });
  const milestonesHtml=earnedBadges.length?`
    <div style="margin-bottom:14px">
      <button onclick="toggleProfileBadges()" style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-body);text-align:left">
        <span style="font-size:16px;flex-shrink:0">🏅</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;color:var(--text1)">${earnedBadges.length} milestone${earnedBadges.length!==1?'s':''} unlocked</div>
          <div style="font-size:10px;color:var(--text4);margin-top:2px">Tap to see them all</div>
        </div>
        <span id="profile-badges-chevron" style="font-size:11px;color:var(--text5);flex-shrink:0;transform:rotate(0deg);transition:transform .2s">▾</span>
      </button>
      <div id="profile-badges-list" style="display:none;margin-top:8px;padding:10px 12px;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px">
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${sortedBadges.map(a=>{
            const isHero=HERO_BADGE_IDS.has(a.id);
            const pillStyle=isHero
              ?`background:var(--acc12);border:1px solid var(--acc30);border-radius:20px;padding:5px 12px;font-size:11.5px;color:var(--accent);font-weight:600;display:inline-flex;align-items:center;gap:4px;box-shadow:0 0 8px var(--acc12)`
              :`background:var(--acc6);border:1px solid var(--acc18);border-radius:20px;padding:4px 10px;font-size:11px;color:var(--accent);opacity:.8;display:inline-flex;align-items:center;gap:4px`;
            return`<span title="${a.title}" style="${pillStyle}">${a.icon} ${a.title}</span>`;
          }).join('')}
        </div>
      </div>
    </div>`:'';

  const statsHtml=u.shareStats!==false&&(u.sessions||u.totalHours)?`
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px">
      <div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 6px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${LEVELS[Math.min(u.ci||0,10)].ci}</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">CI Level</div>
      </div>
      ${u.sessions!=null?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 6px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${u.sessions}</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Sessions</div>
      </div>`:''}
      ${u.totalHours!=null?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 6px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:var(--text1)">${u.totalHours}h</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Hours</div>
      </div>`:''}
      ${(u.streak||0)>0?`<div style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:8px;padding:9px 6px;text-align:center">
        <div style="font-size:15px;font-weight:700;color:#F59E0B">${u.streak}🔥</div>
        <div style="font-size:8px;color:var(--text4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Streak</div>
      </div>`:''}
    </div>`:'';

  const statusLine=u.active
    ?`<span style="color:var(--green);font-weight:600">● Restoring now${u.method?` · ${u.method}`:''}</span>`
    :(joinedStr?`Member since ${joinedStr}`:'');

  el.innerHTML=`<div class="sheet" style="max-height:88vh;padding-bottom:24px">
    <div class="sheet-handle"></div>

    <!-- Hero: centered avatar + name + status -->
    <div style="text-align:center;margin-bottom:16px">
      <div style="display:inline-block;position:relative;margin-bottom:10px">
        ${avatarCircle(u.avatar||'🌱',64,u.active?'var(--green)':'var(--acc30)',u.active?'var(--green-bg)':'var(--acc12)',avatarRingFor(u))}
        ${u.active?`<div style="position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;background:var(--green);border:2.5px solid var(--bg-sheet)"></div>`:''}
      </div>
      <div style="font-family:var(--font-display);font-size:19px;font-weight:700;color:var(--text1);margin-bottom:4px">${u.name||'Restorer'}</div>
      <div style="font-size:11px;color:var(--text4)">${statusLine}</div>
      ${(()=>{
        const ring=avatarRingFor(u);
        if(!ring||!ring.label)return '';
        const caption=ring.label==='👑'?'Longest active streak in the community':ring.label==='🔥'?'30+ day streak':'';
        if(!caption)return '';
        return`<div style="margin-top:8px"><span style="display:inline-flex;align-items:center;gap:5px;background:var(--acc6);border:1px solid var(--acc30);border-radius:20px;padding:3px 10px;font-size:10px;color:var(--accent);font-weight:600">${ring.label} ${caption}</span></div>`;
      })()}
    </div>

    <!-- Action button: message only. Encourage was removed — see future Activity reactions. -->
    ${!isMe&&canMessage?`<div style="margin-bottom:16px">
      <button onclick="event.stopPropagation();document.getElementById('user-profile-ov').remove();openConversation('${u.uid}')" style="width:100%;background:var(--acc12);border:1px solid var(--acc30);border-radius:10px;padding:11px;font-size:13px;color:var(--accent);cursor:pointer;font-family:var(--font-body);font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px"><span style="font-size:15px">💬</span> Send Message</button>
    </div>`:''}

    ${u.bio?`<div style="font-size:12px;color:var(--text2);line-height:1.7;background:var(--bg-stat);border-radius:10px;padding:12px 14px;margin-bottom:14px;font-style:italic">"${htmlEsc(u.bio)}"</div>`:''}

    ${statsHtml}
    ${methodsHtml}
    ${milestonesHtml}

    ${!isMe?`<button onclick="blockCommunityUser('${u.uid}')" style="width:100%;background:transparent;border:1px solid rgba(200,50,50,.15);border-radius:9px;padding:9px;font-size:11px;color:#b85454;cursor:pointer;font-family:var(--font-body);margin-top:4px;opacity:.7">Block member</button>`:''}
    <button class="btn-ghost" onclick="document.getElementById('user-profile-ov').remove()" style="width:100%;margin-top:8px">Close</button>
  </div>`;
  document.getElementById('root').appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el)el.remove();});
}

// Expand/collapse the milestone list in the user profile sheet.
function toggleProfileBadges(){
  const list=document.getElementById('profile-badges-list');
  const chev=document.getElementById('profile-badges-chevron');
  if(!list)return;
  const isOpen=list.style.display==='block';
  list.style.display=isOpen?'none':'block';
  if(chev)chev.style.transform=isOpen?'rotate(0deg)':'rotate(180deg)';
}

function showCommSettings(){
  const ex=document.getElementById('comm-settings-ov');if(ex)ex.remove();
  const el=document.createElement('div');el.className='overlay';el.id='comm-settings-ov';
  const visible=char.communityVisible!==false;
  const shareStats=char.communityShareStats!==false;
  const messagesEnabled=char.communityMessagesEnabled!==false;
  const blockedRows=Object.entries(char.communityBlockedProfiles||{}).filter(([uid])=>(char.communityBlockedUsers||[]).includes(uid)).map(([uid,name])=>`
    <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--stat-border)"><div style="flex:1;min-width:0;font-size:11px;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${htmlEsc(name)}</div><button onclick="unblockCommunityUser('${uid}');showCommSettings()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:7px;padding:5px 8px;font-size:10px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">Unblock</button></div>`).join('');
  el.innerHTML=`<div class="sheet" style="max-height:88vh;padding-bottom:28px">
    <div class="sheet-handle"></div>
    <div style="font-family:var(--font-display);font-size:14px;color:var(--accent);margin-bottom:16px">Community Settings</div>

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
    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px 12px;background:var(--bg-stat);border-radius:10px;margin-bottom:7px">
      <input type="checkbox" id="comm-messages-toggle" ${messagesEnabled?'checked':''} style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer;flex-shrink:0">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text2)">Allow private messages</div>
        <div style="font-size:10px;color:var(--text4);margin-top:1px">Turn this off to stop all new incoming private messages.</div>
      </div>
    </label>
    ${(char.communityBlockedUsers||[]).length?`<div style="margin:12px 0 5px;font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px">Blocked members</div><div style="background:var(--bg-stat);border-radius:10px;padding:0 10px;margin-bottom:10px">${blockedRows||'<div style="padding:10px 0;font-size:10px;color:var(--text5)">Blocked members from an older version can be unblocked by their ID after contacting support.</div>'}</div>`:''}
    <button class="btn-ghost" id="comm-settings-done" style="width:100%;margin-bottom:8px">Done</button>

    <div style="border-top:1px solid var(--stat-border);margin-top:4px;padding-top:14px">
      <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">Account</div>

      <button onclick="signOutDevice()"
        style="width:100%;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:10px;padding:11px;font-size:13px;color:var(--text2);cursor:pointer;font-family:var(--font-body);margin-bottom:5px">
        🔓 Sign Out of This Device
      </button>
      <div style="font-size:9px;color:var(--text5);line-height:1.5;margin-bottom:14px">Disconnects your Google account on this device only. Nothing is deleted — not your data, your posts, or your cloud backup.</div>

      <button onclick="confirmDialog('Leave Community?','Your presence will be removed from the active list and you\\'ll stop appearing in posts and member lists. Your posts expire naturally after 14 days. You stay signed in, so rejoining later is one tap.','Leave',leaveComm)"
        style="width:100%;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:10px;padding:11px;font-size:13px;color:#a03232;cursor:pointer;font-family:var(--font-body)">
        Leave Community
      </button>
      <div style="font-size:9px;color:var(--text5);line-height:1.5;margin-top:6px">Turns off your community presence and posts. Doesn't sign you out or touch your cloud backup.</div>
    </div>
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
  document.getElementById('comm-messages-toggle').onchange=e=>setCommunityMessagesEnabled(e.target.checked);
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
        <div style="font-family:var(--font-display);font-size:14px;color:var(--accent)">Choose Avatar</div>
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

  const historyHtml=coachHistory.map((h,i)=>`
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:flex-end;margin-bottom:6px">
        <div style="background:var(--acc12);border:1px solid var(--acc30);border-radius:14px 14px 4px 14px;padding:8px 12px;font-size:12px;color:var(--accent);max-width:80%;line-height:1.5">${htmlEsc(h.q)}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="font-size:18px;flex-shrink:0">🧠</div>
        <div style="background:var(--bg-card);border:1px solid var(--stat-border);border-radius:4px 14px 14px 14px;padding:10px 12px;font-size:12px;color:var(--text2);line-height:1.7;white-space:pre-line;flex:1">${htmlEsc(h.a)}</div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:4px">
        ${h.flagged
          ?`<span style="font-size:10px;color:var(--text5);font-style:italic;padding:2px 6px">Thanks — feedback noted</span>`
          :`<button onclick="coachFlagAnswer(${i})" style="background:none;border:none;color:var(--text5);font-size:10px;cursor:pointer;font-family:var(--font-body);padding:2px 6px;opacity:.6;transition:opacity .15s" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='.6'">👎 Not helpful</button>`}
      </div>
    </div>`).join('');

  const suggestionsHtml=COACH_SUGGESTIONS.map(s=>
    `<button onclick="coachAsk('${s.q.replace(/'/g,"\\'")}')"
      style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:6px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body);white-space:nowrap;transition:all .15s"
      onmouseover="this.style.borderColor='var(--acc30)';this.style.color='var(--accent)'"
      onmouseout="this.style.borderColor='var(--stat-border)';this.style.color='var(--text3)'"
    >${s.label}</button>`
  ).join('');

  el.innerHTML=`<div class="sheet" style="max-height:90vh;display:flex;flex-direction:column;padding-bottom:0">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-shrink:0">
      <div style="font-size:24px">🧠</div>
      <div style="flex:1">
        <div style="font-family:var(--font-display);font-size:14px;color:var(--accent)">Coach</div>
        <div style="font-size:10px;color:var(--text5)">Ask me anything about your restoration</div>
      </div>
      <button onclick="document.getElementById('coach-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:5px 14px;font-size:12px;color:var(--text3);cursor:pointer;font-family:var(--font-body);flex-shrink:0">✕ Close</button>
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
          style="flex:1;background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:22px;padding:10px 16px;color:var(--text1);font-size:13px;outline:none;font-family:var(--font-body)"
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
  const answer=coachBrainMatch(question);
  const matched=!answer.startsWith("I'm not sure I have a perfect answer");
  coachHistory.push({q:question,a:answer,flagged:false});
  if(coachHistory.length>10)coachHistory.shift();
  captureCoachQuestion(question,matched);
  showCoachSheet();
}

// Records a thumbs-down on a specific Coach answer. The answer itself stays
// visible — the user may still find value in the rest of it, and removing it
// would feel punishing. Only the button state changes, and the Q+A pair is
// queued to Firestore so the admin Coach tab can surface it for review.
function coachFlagAnswer(idx){
  const entry=coachHistory[idx];
  if(!entry||entry.flagged)return;
  entry.flagged=true;
  enqueueCoachFeedback(entry.q,entry.a);
  flushCoachFeedbackQueue();
  if(navigator.vibrate)navigator.vibrate(15);
  showCoachSheet();
}

function enqueueCoachFeedback(question,answer){
  try{
    const q=JSON.parse(localStorage.getItem('rst-coach-feedback-queue')||'[]');
    q.push({
      q:question.trim().slice(0,200),
      a:answer.slice(0,2000),
      ci:char.ciLevel||0
    });
    if(q.length>50)q.splice(0,q.length-50);
    localStorage.setItem('rst-coach-feedback-queue',JSON.stringify(q));
  }catch{}
}

// Mirrors flushCoachQueue — sends queued thumbs-down feedback once Firebase
// auth has settled. Same pattern: clear the local queue first, so a page
// close mid-flush can't cause duplicate writes.
function flushCoachFeedbackQueue(){
  if(!db||!fbUID)return;
  let q;
  try{q=JSON.parse(localStorage.getItem('rst-coach-feedback-queue')||'[]');}catch{return;}
  if(!q.length)return;
  localStorage.removeItem('rst-coach-feedback-queue');
  q.forEach(item=>{
    db.collection('coach_feedback').add({
      q:item.q,
      a:item.a,
      ci:item.ci||0,
      ts:firebase.firestore.FieldValue.serverTimestamp()
    }).catch(()=>{});
  });
}

function captureCoachQuestion(question,matched){
  if(!question.trim())return;
  // Always queue first — this means a question is never lost, even if
  // Firebase isn't initialised yet (non-community user) or the write
  // fails mid-flight. flushCoachQueue() sends everything pending.
  enqueueCoachQuestion(question,matched);
  flushCoachQueue();
}

function enqueueCoachQuestion(question,matched){
  try{
    const q=JSON.parse(localStorage.getItem('rst-coach-queue')||'[]');
    q.push({
      q:question.trim().slice(0,200),
      ci:char.ciLevel||0,
      sessions:char.sessions||0,
      matched:matched!==false
    });
    // Keep the local queue bounded — old questions past 50 are dropped
    if(q.length>50)q.splice(0,q.length-50);
    localStorage.setItem('rst-coach-queue',JSON.stringify(q));
  }catch{}
}

function flushCoachQueue(){
  if(!db||!fbUID)return; // auth not settled yet — items stay queued
  let q;
  try{q=JSON.parse(localStorage.getItem('rst-coach-queue')||'[]');}catch{return;}
  if(!q.length)return;
  // Clear immediately so a page close mid-flush can't cause duplicate sends
  localStorage.removeItem('rst-coach-queue');
  q.forEach(item=>{
    db.collection('coach_questions').add({
      q:item.q,
      ci:item.ci||0,
      sessions:item.sessions||0,
      matched:item.matched!==false,
      ts:firebase.firestore.FieldValue.serverTimestamp()
    }).catch(()=>{}); // silent fail — non-critical, already dropped from queue
  });
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
        <div style="font-family:var(--font-display);font-size:15px;color:#e74c3c;letter-spacing:1px">⚙ Admin</div>
        <button onclick="document.getElementById('admin-ov').remove()" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:20px;padding:4px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">Close</button>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:14px;background:var(--bg-stat);border-radius:10px;padding:3px;overflow-x:auto;scrollbar-width:none">
        ${[['dashboard','📊','Stats'],['reports','🚩','Reports'],['users','👥','Users'],['broadcast','📣','Broadcast'],['coach','🧠','Coach']].map(([id,icon,label])=>`
        <button id="admin-tab-${id}" onclick="adminSwitchTab('${id}')"
          style="flex:1;min-width:52px;padding:6px 4px;border:none;border-radius:7px;cursor:pointer;font-size:10px;font-weight:600;font-family:var(--font-body);white-space:nowrap;transition:all .15s;
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
            <div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:${retentionPct>=50?'var(--green)':retentionPct>=25?'var(--accent)':'#e74c3c'}">${retentionPct}%</div>
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
                <div style="font-family:var(--font-display);font-size:9px;color:var(--accent);width:28px;flex-shrink:0">CI-${i}</div>
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
                <button onclick="adminDeletePost('${r.postId}','${d.id}')" style="background:rgba(200,50,50,.08);border:1px solid rgba(200,50,50,.25);border-radius:6px;padding:6px 12px;font-size:11px;color:#a03232;cursor:pointer;font-family:var(--font-body)">🗑 Delete Post</button>
                <button onclick="adminBanUID('${post.uid||''}','${d.id}')" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:6px;padding:6px 12px;font-size:11px;color:#a03232;cursor:pointer;font-family:var(--font-body)">⛔ Ban User</button>`:''}
                <button onclick="adminResolve('${d.id}')" style="background:var(--bg-stat);border:1px solid var(--stat-border);border-radius:6px;padding:6px 12px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--font-body)">✓ Dismiss</button>
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
          style="background:var(--bg-stat);border:1px solid var(--acc30);border-radius:8px;padding:10px 12px;color:var(--text1);font-size:12px;width:100%;outline:none;resize:vertical;min-height:90px;font-family:var(--font-body);margin-bottom:10px">${htmlEsc(current)}</textarea>
        <div style="display:flex;gap:8px">
          <button onclick="adminClearBroadcast()" style="flex:0 0 auto;background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:8px;padding:10px 16px;font-size:12px;color:#a03232;cursor:pointer;font-family:var(--font-body)">Clear</button>
          <button onclick="adminSaveBroadcast()" style="flex:1;background:linear-gradient(135deg,var(--acc18),var(--accent));border:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;color:var(--bg);cursor:pointer;font-family:var(--font-body)">📣 Publish</button>
        </div>
        ${current?`<div style="margin-top:12px;background:var(--acc6);border:1px solid var(--acc18);border-radius:8px;padding:10px 12px">
          <div style="font-size:9px;color:var(--accent);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px">Currently Live</div>
          <div style="font-size:11px;color:var(--text2)">${htmlEsc(current)}</div>
        </div>`:'<div style="margin-top:10px;font-size:10px;color:var(--text5)">No announcement currently set.</div>'}`;
    }).catch(()=>{if(content)content.innerHTML='<div style="font-size:11px;color:var(--text4)">Could not load broadcast data.</div>';});

  // ── COACH ──────────────────────────────────────────────────────────────
  } else if(_adminTab==='coach'){
    content.innerHTML='<div style="font-size:11px;color:var(--text4)">Loading coach questions…</div>';
    // Fetch questions and flagged feedback in parallel. Feedback is a newer
    // collection — if the read fails (rules not yet published, or collection
    // empty) we still want the questions view to render normally.
    Promise.all([
      db.collection('coach_questions').orderBy('ts','desc').limit(200).get(),
      db.collection('coach_feedback').orderBy('ts','desc').limit(100).get().catch(()=>null)
    ]).then(([snap,fbSnap])=>{
      if(!document.getElementById('admin-content'))return;

      // Build the flagged-feedback section. Renders above the question list.
      let feedbackHtml='';
      if(fbSnap&&!fbSnap.empty){
        const fbRows=fbSnap.docs.map(d=>{
          const x=d.data();
          const ts=x.ts?.toDate?x.ts.toDate().toLocaleDateString():'?';
          return`<div style="background:var(--bg-stat);border:1px solid rgba(200,50,50,.18);border-radius:8px;padding:10px 12px;margin-bottom:6px">
            <div style="font-size:11px;color:var(--text2);line-height:1.5;margin-bottom:5px"><strong style="color:var(--text1)">Q:</strong> ${htmlEsc(x.q||'')}</div>
            <div style="font-size:10px;color:var(--text3);line-height:1.55;padding-left:8px;border-left:2px solid var(--stat-border);white-space:pre-line;max-height:120px;overflow-y:auto">${htmlEsc((x.a||'').slice(0,500))}${(x.a||'').length>500?'…':''}</div>
            <div style="font-size:9px;color:var(--text5);text-align:right;margin-top:5px">${ts} · CI-${x.ci||0}</div>
          </div>`;
        }).join('');
        feedbackHtml=`<div style="font-size:10px;font-weight:700;color:#a03232;margin-bottom:7px;text-transform:uppercase;letter-spacing:.8px">👎 Flagged answers (${fbSnap.size})</div>${fbRows}<div style="height:14px"></div>`;
      }

      if(snap.empty){
        content.innerHTML=feedbackHtml+'<div style="font-size:11px;color:var(--green);text-align:center;padding:20px">✓ No questions yet.</div>';
        return;
      }
      // Aggregate by question text, tracking matched vs unmatched counts
      const qMap={};
      snap.docs.forEach(d=>{
        const data=d.data();
        const q=data.q||'';
        if(!qMap[q])qMap[q]={count:0,matchedCount:0,unmatchedCount:0,ci:[]};
        qMap[q].count++;
        // Old entries without the flag default to matched (assumed answered)
        if(data.matched===false)qMap[q].unmatchedCount++;
        else qMap[q].matchedCount++;
        qMap[q].ci.push(data.ci||0);
      });
      const allEntries=Object.entries(qMap);
      // Split: unmatched first (sorted by unmatched count), then matched
      const unmatchedEntries=allEntries.filter(([,v])=>v.unmatchedCount>0).sort((a,b)=>b[1].unmatchedCount-a[1].unmatchedCount);
      const matchedEntries=allEntries.filter(([,v])=>v.unmatchedCount===0).sort((a,b)=>b[1].count-a[1].count);
      window._coachSorted=unmatchedEntries; // email uses this — only the gaps
      const totalUnmatched=unmatchedEntries.reduce((a,[,v])=>a+v.unmatchedCount,0);
      const renderQ=([q,v],isUnmatched)=>{
        const avgCi=v.ci.length?Math.round(v.ci.reduce((a,b)=>a+b,0)/v.ci.length*10)/10:0;
        const displayCount=isUnmatched?v.unmatchedCount:v.count;
        return`<div style="background:var(--bg-stat);border:1px solid ${isUnmatched?'rgba(200,50,50,.2)':'var(--stat-border)'};border-radius:8px;padding:10px 12px;margin-bottom:6px;display:flex;align-items:flex-start;gap:8px">
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;color:var(--text2);line-height:1.5">${htmlEsc(q)}</div>
            <div style="font-size:9px;color:var(--text5);margin-top:3px">avg CI: ${avgCi}${isUnmatched&&v.matchedCount>0?` · also matched ${v.matchedCount}×`:''}</div>
          </div>
          ${displayCount>1?`<span style="background:${isUnmatched?'rgba(200,50,50,.1)':'var(--acc12)'};border:1px solid ${isUnmatched?'rgba(200,50,50,.3)':'var(--acc30)'};border-radius:10px;padding:2px 8px;font-size:10px;font-weight:700;color:${isUnmatched?'#a03232':'var(--accent)'};flex-shrink:0">×${displayCount}</span>`:''}
        </div>`;
      };
      content.innerHTML=feedbackHtml+`
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-size:10px;color:var(--text4);text-transform:uppercase;letter-spacing:.8px">${snap.size} captured · ${allEntries.length} unique</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
            <button onclick="adminDownloadCoachQuestions()" style="background:var(--acc6);border:1px solid var(--acc30);border-radius:6px;padding:4px 10px;font-size:10px;color:var(--accent);cursor:pointer;font-family:var(--font-body)">⬇ Download JSON</button>
            <button onclick="adminEmailCoachQuestions()" style="background:var(--acc6);border:1px solid var(--acc30);border-radius:6px;padding:4px 10px;font-size:10px;color:var(--accent);cursor:pointer;font-family:var(--font-body)">📧 Email unmatched</button>
            <button onclick="adminClearCoachQuestions()" style="background:rgba(200,50,50,.06);border:1px solid rgba(200,50,50,.2);border-radius:6px;padding:4px 10px;font-size:10px;color:#a03232;cursor:pointer;font-family:var(--font-body)">Clear all</button>
          </div>
        </div>
        <div style="font-size:10px;color:var(--text5);margin-bottom:10px;line-height:1.5;background:var(--acc6);border:1px solid var(--acc18);border-radius:8px;padding:8px 10px">
          💡 <strong style="color:var(--accent)">Email unmatched</strong> sends only the questions the Coach couldn't answer. Bring those to Claude with your coach_data.json to fill the gaps.
        </div>
        ${unmatchedEntries.length?`
          <div style="font-size:10px;font-weight:700;color:#a03232;margin-bottom:7px;text-transform:uppercase;letter-spacing:.8px">🚩 Unmatched (${unmatchedEntries.length} unique · ${totalUnmatched} total asks)</div>
          ${unmatchedEntries.map(e=>renderQ(e,true)).join('')}
        `:`<div style="background:var(--green-bg);border:1px solid var(--green-border);border-radius:8px;padding:12px;text-align:center;margin-bottom:14px"><div style="font-size:11px;color:var(--green);font-weight:600">✓ Every captured question was answered</div><div style="font-size:9px;color:var(--text4);margin-top:4px">No gaps to fill right now.</div></div>`}
        ${matchedEntries.length?`
          <div style="font-size:10px;font-weight:700;color:var(--text4);margin:14px 0 7px;text-transform:uppercase;letter-spacing:.8px">✓ Matched (${matchedEntries.length} unique)</div>
          ${matchedEntries.slice(0,20).map(e=>renderQ(e,false)).join('')}
          ${matchedEntries.length>20?`<div style="font-size:10px;color:var(--text5);text-align:center;padding:8px">+${matchedEntries.length-20} more matched questions not shown</div>`:''}
        `:''}`;
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
        ?`<button onclick="adminBanUID('${uid}',null)" style="flex:1;background:rgba(200,50,50,.08);border:1px solid rgba(200,50,50,.25);border-radius:6px;padding:7px;font-size:11px;color:#a03232;cursor:pointer;font-family:var(--font-body)">⛔ Ban</button>`
        :`<button onclick="adminUnbanUID('${uid}')" style="flex:1;background:rgba(34,168,90,.06);border:1px solid rgba(34,168,90,.25);border-radius:6px;padding:7px;font-size:11px;color:var(--green);cursor:pointer;font-family:var(--font-body)">✓ Unban</button>`
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
  if(!sorted.length){showToast('No unmatched questions to email');return;}
  const lines=sorted.map(([q,v])=>{
    const avgCi=v.ci.length?Math.round(v.ci.reduce((a,b)=>a+b,0)/v.ci.length*10)/10:0;
    return '• '+q+(v.unmatchedCount>1?' (x'+v.unmatchedCount+', avg CI-'+avgCi+')':' (avg CI-'+avgCi+')');
  }).join('\n');
  const total=sorted.reduce((a,[,v])=>a+v.unmatchedCount,0);
  const subject=encodeURIComponent("Unmatched Coach Questions");
  const body=encodeURIComponent(
    'UNMATCHED Coach Questions from RestoreTrack Users\n'+
    '(Questions the Coach could not answer)\n\n'+
    'Exported: '+new Date().toLocaleDateString()+'\n'+
    'Total: '+total+' asks across '+sorted.length+' unique questions\n\n'+
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

// Exports all captured questions (matched and unmatched) plus any flagged
// answers as a single JSON file. Two top-level keys so the payload can grow
// in the future without breaking anything that reads it.
async function adminDownloadCoachQuestions(){
  if(!db){showToast('Not connected');return;}
  showToast('⏳ Building export…');
  try{
    const [qsSnap,fbSnap]=await Promise.all([
      db.collection('coach_questions').orderBy('ts','desc').limit(500).get(),
      db.collection('coach_feedback').orderBy('ts','desc').limit(500).get().catch(()=>null)
    ]);
    const questions=qsSnap.docs.map(d=>{
      const x=d.data();
      return{
        q:x.q||'',
        matched:x.matched!==false,
        ci:x.ci||0,
        sessions:x.sessions||0,
        ts:x.ts?.toDate?x.ts.toDate().toISOString():null
      };
    });
    const feedback=fbSnap?fbSnap.docs.map(d=>{
      const x=d.data();
      return{
        q:x.q||'',
        a:x.a||'',
        ci:x.ci||0,
        ts:x.ts?.toDate?x.ts.toDate().toISOString():null
      };
    }):[];
    const payload={
      exportedAt:new Date().toISOString(),
      questionCount:questions.length,
      feedbackCount:feedback.length,
      questions,
      feedback
    };
    const json=JSON.stringify(payload,null,2);
    const blob=new Blob([json],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`restoretrack-coach-export-${today().replace(/-/g,'')}.json`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(`✅ Exported ${questions.length} questions · ${feedback.length} flagged`);
  }catch(e){
    console.warn('[RT] admin download coach questions error',e);
    showToast('⚠ Could not build export');
  }
}

// ── INIT ───────────────────────────────────────────────────────────────────────
function ensureAnimations(){
  if(document.getElementById('rt-animations'))return;
  const style=document.createElement('style');
  style.id='rt-animations';
  style.textContent=`
    /* Active state: a soft green glow pulses outward from the session
       card's edge, like a slow heartbeat. Not an alert — a pulse of
       "alive". The pulse stays subtle; the eye reads it as breathing,
       not blinking. */
    .sess-active-card {
      animation: rtHeartbeat 2.4s ease-in-out infinite;
    }
    @keyframes rtHeartbeat {
      0%, 100% { box-shadow: 0 0 0 0 rgba(34,168,90,0); }
      50%      { box-shadow: 0 0 0 10px rgba(34,168,90,.14); }
    }

    /* The live dot gets its own subtle glow so it feels like a running
       indicator rather than a static circle. */
    .sess-live-dot {
      box-shadow: 0 0 6px rgba(34,168,90,.55);
      animation: rtDotPulse 2.4s ease-in-out infinite;
    }
    @keyframes rtDotPulse {
      0%, 100% { box-shadow: 0 0 4px rgba(34,168,90,.45); }
      50%      { box-shadow: 0 0 10px rgba(34,168,90,.85); }
    }

    /* Respect the user's motion preference. Anyone who has reduced
       motion enabled gets the polished static state instead. */
    /* Paused state: slower, cooler gold pulse. Reads as "at rest but
       still present" rather than the green heartbeat of a running session. */
    .sess-paused-card {
      animation: rtPausedPulse 4s ease-in-out infinite;
    }
    @keyframes rtPausedPulse {
      0%, 100% { box-shadow: 0 0 0 0 var(--acc12); }
      50%      { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
    }

    /* Accessibility: if the user has reduced motion enabled at the OS
       level, we hold the button static — no comet, no breathe. The button
       remains fully usable; it just doesn't animate. */
    @media (prefers-reduced-motion: reduce) {
      .sess-active-card { animation: none; }
      .sess-live-dot { animation: none; }
      .sess-paused-card { animation: none; }
    }
    @keyframes goalShimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(150%); }
    }
    @keyframes goalCelebrate {
      0%, 100% { box-shadow: 0 0 0 0 transparent; }
      50%      { box-shadow: 0 0 14px 2px var(--acc30); }
    }

    /* Header session pill — replaces the CI pill while a session runs or is
       paused. Uses .ci-pill as the size/shape base, overrides only colors
       and the internal layout. One slot, three states. */
    .hdr-session-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: var(--green-bg);
      border-color: var(--green-border);
      color: var(--green);
      padding: 2px 9px;
      font-variant-numeric: tabular-nums;
    }
    .hdr-session-pill--paused {
      background: var(--acc12);
      border-color: var(--acc30);
      color: var(--accent);
    }
    .hdr-session-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--green);
      flex-shrink: 0;
      display: inline-block;
      animation: hdrDotPulse 2.4s ease-in-out infinite;
    }
    @keyframes hdrDotPulse {
      0%, 100% { box-shadow: 0 0 3px rgba(34,168,90,.4); }
      50%      { box-shadow: 0 0 8px rgba(34,168,90,.85); }
    }
    @media (prefers-reduced-motion: reduce) {
      .hdr-session-dot { animation: none; }
    }

    .nav { overflow: visible !important; }
  `;
  document.head.appendChild(style);
}
(async ()=>{
  ensureAnimations();
  await loadAll();
  render();
  // Always init Firebase — the coach question queue needs auth to flush,
  // and anonymous auth provides the baseline the Community tab expects.
  // Community listeners themselves only start for members or while the
  // Community tab is open (gated inside initFirebase's auth handler).
  initFirebase();
  // If a session is already running, sync presence once Firebase auth settles
  if(activeTimer&&activeTimer.startedAt){setTimeout(syncPresence,2500);}
})();
