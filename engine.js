(function(root){
const roster=[
{name:'Lucas',role:'CHAOS DUELIST',color:'#befb58',hp:180,atk:16,speed:76,range:46,cd:6,skill:'Forkidy Fork',desc:'Dash to a rival and strike twice.',kind:'dash',hat:0},
{name:'Cynthia',role:'FROST MAGE',color:'#83d8ff',hp:145,atk:13,speed:58,range:145,cd:7,skill:'Freeze Frame',desc:'Ice blast damages and stuns nearby rivals.',kind:'frost',hat:1},
{name:'Junyi',role:'QUICK STRIKER',color:'#ffcc72',hp:155,atk:12,speed:100,range:44,cd:5,skill:'Triple Trouble',desc:'Three rapid hits on one unlucky rival.',kind:'triple',hat:2},
{name:'Mr. Eppley',role:'ARENA PROFESSOR',color:'#b5a1ff',hp:175,atk:14,speed:55,range:130,cd:8,skill:'Pop Quiz',desc:'A question shockwave hits every rival.',kind:'quiz',hat:3},
{name:'Bro Council',role:'SHIELD CAPTAIN',color:'#ff9b84',hp:225,atk:11,speed:48,range:48,cd:8,skill:'Motion Approved',desc:'Gain a shield and stun your closest rival.',kind:'shield',hat:4},
{name:'Fork Goblin',role:'TRAP MAKER',color:'#9effbb',hp:155,atk:12,speed:75,range:105,cd:6,skill:'Fork Mine',desc:'Leave an explosive fork trap behind.',kind:'trap',hat:5},
{name:'Pixel Phantom',role:'ELUSIVE ASSASSIN',color:'#ee9fff',hp:135,atk:17,speed:91,range:45,cd:7,skill:'Ghost Step',desc:'Teleport behind a rival; briefly evade hits.',kind:'ghost',hat:6},
{name:'Keyboard Knight',role:'HEAVY BRUISER',color:'#ffc36e',hp:240,atk:19,speed:42,range:55,cd:9,skill:'CAPS LOCK',desc:'Wide keyboard slam launches nearby rivals.',kind:'slam',hat:7},
{name:'Pigeon King',role:'SKY BOMBER',color:'#a8c8ff',hp:145,atk:12,speed:65,range:170,cd:7,skill:'Air Mail',desc:'Three falling projectiles hunt your rival.',kind:'bomb',hat:8},
{name:'Doctor Cokking',role:'SELF HEALER',color:'#7cf3df',hp:170,atk:11,speed:62,range:110,cd:8,skill:'Suspicious Soup',desc:'Restore health and poison your rival.',kind:'heal',hat:9},
{name:'Sock Samurai',role:'COUNTER FIGHTER',color:'#ff8faf',hp:185,atk:15,speed:72,range:48,cd:7,skill:'Laundry Revenge',desc:'Reflect damage for two seconds.',kind:'reflect',hat:10},
{name:'Solar Gremlin',role:'FIRE CASTER',color:'#ffb85c',hp:150,atk:14,speed:62,range:150,cd:8,skill:'Pocket Sun',desc:'Create a burning zone under your rival.',kind:'fire',hat:11}
];
function random(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t^=t+Math.imul(t^t>>>7,61|t);return ((t^t>>>14)>>>0)/4294967296;};}
class Battle{
constructor(ids,seed=1337){if(ids.length<2||new Set(ids).size!==ids.length||ids.some(i=>!roster[i]))throw Error('Choose at least two distinct fighters.');this.rng=random(seed);this.time=0;this.done=false;this.winner=null;this.events=[];this.effects=[];this.projectiles=[];this.zones=[];this.fighters=ids.map((id,i)=>{const a=i/ids.length*Math.PI*2;return {...roster[id],id,x:500+Math.cos(a)*260,y:290+Math.sin(a)*175,health:roster[id].hp,shield:0,skillLeft:1.6+this.rng()*2,attackLeft:this.rng(),stun:0,evade:0,reflect:0,poison:0,kills:0,damage:0,face:1,lastHit:null};});}
log(text,color){this.events.push({time:this.time,text,color});}
fx(type,x,y,color,text){this.effects.push({type,x,y,color,text,life:type==='text'?1.1:.55,max:type==='text'?1.1:.55});}
hit(a,b,amount,reflected=false){if(b.health<=0||b.evade>0)return;let damage=Math.max(1,Math.round(amount*(this.time>45?1+(this.time-45)/15:1)));if(b.reflect>0&&!reflected){this.hit(b,a,damage*.65,true);damage=Math.round(damage*.35);}let absorbed=Math.min(b.shield,damage);b.shield-=absorbed;damage-=absorbed;b.health=Math.max(0,b.health-damage);a.damage+=damage;b.lastHit=a.id;this.fx('text',b.x,b.y-40,damage?'#fff':'#95caff',damage?'-'+damage:'BLOCK');if(b.health===0){a.kills++;this.log(a.name+' knocked out '+b.name,'#ff968e');this.fx('ring',b.x,b.y,b.color);}}
shoot(a,b,amount,color,speed=320){this.projectiles.push({x:a.x,y:a.y-16,target:b.id,owner:a.id,amount,color,speed,life:3});}
skill(a,b){this.log(a.name+' · '+a.skill,a.color);this.fx('text',a.x,a.y-62,a.color,a.skill);const near=(r)=>this.fighters.filter(f=>f!==a&&f.health>0&&Math.hypot(f.x-a.x,f.y-a.y)<r);switch(a.kind){
case'dash':{let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;a.x=b.x-dx/d*33;a.y=b.y-dy/d*33;this.hit(a,b,22);this.hit(a,b,22);this.fx('slash',b.x,b.y,a.color);break;}
case'frost':this.shoot(a,b,27,a.color);for(const f of this.fighters.filter(f=>f!==a&&f.health>0&&Math.hypot(f.x-b.x,f.y-b.y)<115)){f.stun=1.4;this.hit(a,f,14);this.fx('ring',f.x,f.y,a.color);}break;
case'triple':for(let i=0;i<3;i++)this.shoot(a,b,15,a.color,420+i*60);break;
case'quiz':for(const f of this.fighters.filter(f=>f!==a&&f.health>0)){this.shoot(a,f,16,a.color,230);f.stun=Math.max(f.stun,.4);}this.fx('ring',a.x,a.y,a.color);break;
case'shield':a.shield=55;b.stun=1.5;this.shoot(a,b,18,a.color);break;
case'trap':this.zones.push({kind:'trap',x:a.x,y:a.y,owner:a.id,life:10,radius:65,color:a.color});break;
case'ghost':a.x=Math.max(45,Math.min(955,b.x-b.face*38));a.y=b.y;a.evade=1.5;this.hit(a,b,36);this.fx('ring',a.x,a.y,a.color);break;
case'slam':for(const f of near(135)){this.hit(a,f,40);f.stun=1;let d=Math.hypot(f.x-a.x,f.y-a.y)||1;f.x=Math.max(40,Math.min(960,f.x+(f.x-a.x)/d*65));f.y=Math.max(65,Math.min(535,f.y+(f.y-a.y)/d*65));}this.fx('ring',a.x,a.y,a.color);break;
case'bomb':for(let i=0;i<3;i++)this.projectiles.push({x:b.x-70+i*70,y:30,target:b.id,owner:a.id,amount:16,color:a.color,speed:220+i*40,life:4});break;
case'heal':a.health=Math.min(a.hp,a.health+38);b.poison=4;b.poisonOwner=a.id;this.fx('text',a.x,a.y-20,'#7cf3df','+38');break;
case'reflect':a.reflect=2.2;break;
case'fire':this.zones.push({kind:'fire',x:b.x,y:b.y,owner:a.id,life:4,radius:85,color:a.color,tick:0});break;}}
step(dt){if(this.done)return;dt=Math.min(.05,dt);this.time+=dt;for(const e of this.effects)e.life-=dt;this.effects=this.effects.filter(e=>e.life>0);for(const a of this.fighters){if(a.health<=0)continue;for(const k of ['stun','evade','reflect'])a[k]=Math.max(0,a[k]-dt);if(a.poison>0){a.poison-=dt;let owner=this.fighters.find(f=>f.id===a.poisonOwner);if(owner&&Math.floor(this.time*3)!==Math.floor((this.time-dt)*3))this.hit(owner,a,3);}if(a.health<=0||a.stun>0)continue;const enemies=this.fighters.filter(b=>b!==a&&b.health>0);if(!enemies.length)break;enemies.sort((b,c)=>Math.hypot(b.x-a.x,b.y-a.y)-Math.hypot(c.x-a.x,c.y-a.y));const b=enemies[0];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;a.face=dx>=0?1:-1;a.skillLeft-=dt;a.attackLeft-=dt;if(a.skillLeft<=0){this.skill(a,b);a.skillLeft=a.cd;}if(d>a.range*.8){a.x+=dx/d*a.speed*dt;a.y+=dy/d*a.speed*dt;}else if(d<30){a.x-=dx/d*15*dt;a.y-=dy/d*15*dt;}if(d<=a.range&&a.attackLeft<=0){a.attackLeft=.85+this.rng()*.2;if(a.range>80)this.shoot(a,b,a.atk,a.color);else{this.hit(a,b,a.atk);this.fx('slash',b.x,b.y,a.color);}}a.x=Math.max(40,Math.min(960,a.x));a.y=Math.max(65,Math.min(535,a.y));}
for(const p of this.projectiles){p.life-=dt;const b=this.fighters.find(f=>f.id===p.target),a=this.fighters.find(f=>f.id===p.owner);if(!b||b.health<=0){p.life=0;continue;}let dx=b.x-p.x,dy=b.y-15-p.y,d=Math.hypot(dx,dy);if(d<p.speed*dt+10){this.hit(a,b,p.amount);p.life=0;this.fx('spark',b.x,b.y,p.color);}else{p.x+=dx/d*p.speed*dt;p.y+=dy/d*p.speed*dt;}}this.projectiles=this.projectiles.filter(p=>p.life>0);
for(const z of this.zones){z.life-=dt;const a=this.fighters.find(f=>f.id===z.owner);const victims=this.fighters.filter(f=>f.id!==z.owner&&f.health>0&&Math.hypot(f.x-z.x,f.y-z.y)<z.radius);if(z.kind==='trap'&&victims.length){for(const b of victims)this.hit(a,b,34);z.life=0;this.fx('ring',z.x,z.y,z.color);}if(z.kind==='fire'){z.tick-=dt;if(z.tick<=0){for(const b of victims)this.hit(a,b,7);z.tick=.5;}}}this.zones=this.zones.filter(z=>z.life>0);const alive=this.fighters.filter(f=>f.health>0);if(alive.length<=1){this.done=true;this.winner=alive[0]||null;this.log(this.winner?this.winner.name+' wins the brawl!':'Double knockout. No survivors.','#befb58');}}
}
root.Brawl={roster,Battle};if(typeof module!=='undefined')module.exports=root.Brawl;
})(typeof window!=='undefined'?window:globalThis);
