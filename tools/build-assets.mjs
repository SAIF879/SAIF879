// Original vector compositions. No packages, fonts, APIs, or build step at render time.
// Run: node tools/build-assets.mjs
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../assets/',import.meta.url);
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const text=(x,y,size,value,color,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${escape(value)}</text>`;
const palette=`<style>:root{--paper:#f4f1e9;--ink:#242b36;--name:#244ce2;--muted:#505c70;--baby:#eeedf6}@media(prefers-color-scheme:dark){:root{--paper:#19212e;--ink:#f1eee5;--name:#9fb3ff;--muted:#c0c9d8;--baby:#29273e}}</style>`;
const wrap=(w,h,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-label="${escape(title)}" font-family="Arial,Helvetica,sans-serif"><title>${escape(title)}</title>${palette}${body}</svg>\n`;
const imageData={};for(const name of ['baby-live','baby-wellness','supervision'])imageData[name]=(await readFile(new URL('source/'+name+'.webp',root))).toString('base64');
const image=(name,x,y,w,h,extra='')=>`<image href="data:image/webp;base64,${imageData[name]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMin meet" ${extra}/>`;
const cat=(x,y,scale,color)=>`<g transform="translate(${x} ${y}) scale(${scale})" stroke="${color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M0 25V2L13 12Q27 5 41 12L54 2V25Q54 47 27 47Q0 47 0 25Z"/><path d="M14 25l5 2m16 0 5-2M24 33l3 3 3-3M27 36v5M-9 26l16 3m-15 5 15-2m38-3 16-3m-16 6 15 2"/></g>`;
function phones(x,y,scale){return `<g transform="translate(${x} ${y}) scale(${scale})"><g transform="rotate(12 65 90)"><rect width="117" height="174" rx="23" fill="#d75436"/><rect x="13" y="14" width="91" height="145" rx="12" stroke="#fff5e9" stroke-width="2"/><path d="M40 23h36M48 149h20M25 90h14l10-20 13 40 12-20h18" stroke="#fff5e9" stroke-width="3" stroke-linecap="round"/></g><g transform="translate(88 35) rotate(-9 65 90)"><rect width="117" height="174" rx="23" fill="#244ce2"/><path d="M40 14h36M48 157h20" stroke="#fff5e9" stroke-width="3" stroke-linecap="round"/>${cat(31,65,1,'#fff5e9')}</g><path d="M52 192q0 30 35 30h28" stroke="#d75436" stroke-width="2" stroke-dasharray="3 6"/><circle cx="120" cy="222" r="4" fill="#d75436"/></g>`;}
 const p={paper:'var(--paper)',ink:'var(--ink)',name:'var(--name)',muted:'var(--muted)',baby:'var(--baby)'};
 for(const mobile of [false,true]){
  const suffix=mobile?'mobile':'desktop',w=mobile?600:960,h=mobile?350:280;
  let c=`<rect width="${w}" height="${h}" rx="16" fill="${p.paper}"/>`;
  c+=text(32,mobile?48:42,mobile?30:16,mobile?'ANDROID / MULTIPLATFORM':'ANDROID / MULTIPLATFORM ENGINEER',p.muted,`letter-spacing="${mobile?1:2}"`);
  c+=text(27,mobile?193:181,mobile?157:168,'saif.',p.name,'font-weight="800" letter-spacing="-10"');
  c+=text(35,mobile?264:226,mobile?31:27,'Shared UI. Live video. Real devices.',p.ink);
  c+=text(35,mobile?316:261,mobile?30:15,mobile?'KOTLIN / JAVA / SARCASM':'KOTLIN / JAVA / A LITTLE SARCASM',p.muted,'letter-spacing="1"');
  c+=mobile?phones(418,98,.61):phones(700,30,1.05);
  await writeFile(new URL(`intro-${suffix}.svg`,root),wrap(w,h,'Saif Ahmed — Android, multiplatform, and real-time apps.',c));
  const bw=mobile?600:960,bh=mobile?620:410;
  let b=`<rect width="${bw}" height="${bh}" rx="14" fill="${p.baby}"/>`;
  if(mobile){
   b+=text(30,50,34,'01 / ANDROID + iOS',p.muted,'letter-spacing="1"');
   b+=text(28,119,53,'Baby’s Day In',p.ink,'font-weight="700" letter-spacing="-1"');
   b+=text(30,164,28,'Two phones. One baby monitor.',p.muted);
   b+=image('baby-live',34,208,250,584);
   b+=image('baby-wellness',320,258,246,550);
  }else{
   b+=text(32,49,16,'01 / MOBILE · BIPOLAR FACTORY',p.muted,'letter-spacing="1.5"');
   b+=text(30,133,54,'Baby’s',p.ink,'font-weight="700" letter-spacing="-1"');
   b+=text(30,195,54,'Day In',p.ink,'font-weight="700" letter-spacing="-1"');
   b+=text(33,269,24,'Two phones.',p.muted)+text(33,304,24,'One baby monitor.',p.muted);
   b+=text(33,376,16,'ANDROID + iOS',p.muted,'letter-spacing="2"');
   b+=image('baby-live',438,28,197,460)+image('baby-wellness',686,74,194,440);
  }
  await writeFile(new URL(`baby-${suffix}.svg`,root),wrap(bw,bh,'Baby’s Day In. Public product screenshots of the live monitor and wellness screens.',b));
  const sh=mobile?400:325;
  let s=`<rect width="${w}" height="${sh}" rx="14" fill="#12212b"/>`;
  s+=text(30,mobile?50:43,mobile?34:16,mobile?'02 / DESKTOP + VIDEO':'02 / DESKTOP + VIDEO · BIPOLAR FACTORY','#b8cfda','letter-spacing="1"');
  s+=text(28,mobile?119:102,mobile?53:42,'Supervision','#eef4f7','font-weight="700" letter-spacing="-1"');
  if(mobile){s+=image('supervision',-113,153,828,518);}else{s+=`<svg x="30" y="132" width="900" height="193" viewBox="500 140 1500 420" preserveAspectRatio="xMidYMin slice">${image('supervision',0,0,2000,1250)}</svg>`;}
  await writeFile(new URL(`supervision-${suffix}.svg`,root),wrap(w,sh,'Supervision. Public product screenshot showing its multi-camera live view.',s));
 }
console.log('Built six self-contained SVGs (three compositions × two sizes, with internal color-scheme styles).');
