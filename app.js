const KEY_NAME='gc_name',KEY_IBAN='gc_iban',KEY_BIC='gc_bic';
let currentQR=null;

document.addEventListener('DOMContentLoaded',()=>{
  loadSettingsIntoForm();updateBanner();wireReasonCounter();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'activated' && navigator.serviceWorker.controller) {
            window.location.reload();
          }
        });
      });
    }).catch(()=>{});
  }
});

function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
}

function wireReasonCounter(){const i=document.getElementById('inp-reason'),c=document.getElementById('reason-count');i.addEventListener('input',()=>{const l=i.value.length;c.textContent=l;c.parentElement.className='char-counter'+(l>130?(l>=140?' over':' warn'):'');});}
function updateBanner(){document.getElementById('banner-setup').style.display=localStorage.getItem(KEY_IBAN)&&localStorage.getItem(KEY_NAME)?'none':'flex';}
function loadSettingsIntoForm(){document.getElementById('set-name').value=localStorage.getItem(KEY_NAME)||'';document.getElementById('set-iban').value=localStorage.getItem(KEY_IBAN)||'';document.getElementById('set-bic').value=localStorage.getItem(KEY_BIC)||'';}

function saveSettings(){
  const rawName=document.getElementById('set-name').value.trim(),iban=document.getElementById('set-iban').value.trim().toUpperCase().replace(/\s/g,''),bic=document.getElementById('set-bic').value.trim().toUpperCase().replace(/\s/g,'');
  const name=sanitizeSepa(rawName);
  let v=true;
  if(!name||name.length>70){showError('err-set-name','set-name');v=false;}else hideError('err-set-name','set-name');
  if(!/^[A-Z]{2}[A-Z0-9]{13,32}$/.test(iban)){showError('err-set-iban','set-iban');v=false;}else hideError('err-set-iban','set-iban');
  if(bic&&!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic)){showError('err-set-bic','set-bic');v=false;}else hideError('err-set-bic','set-bic');
  if(!v)return;
  if(name!==rawName){document.getElementById('set-name').value=name;showToast('Name adjusted for SEPA compatibility');}
  localStorage.setItem(KEY_NAME,name);localStorage.setItem(KEY_IBAN,iban);
  bic?localStorage.setItem(KEY_BIC,bic):localStorage.removeItem(KEY_BIC);
  updateBanner();showView('transfer');
}

function clearSettings(){if(!confirm('Clear all stored beneficiary data?'))return;localStorage.removeItem(KEY_NAME);localStorage.removeItem(KEY_IBAN);localStorage.removeItem(KEY_BIC);loadSettingsIntoForm();updateBanner();}

function sanitizeSepa(str){
  const map={'ä':'ae','ö':'oe','ü':'ue','Ä':'Ae','Ö':'Oe','Ü':'Ue','ß':'ss','é':'e','è':'e','ê':'e','ë':'e','á':'a','à':'a','â':'a','ó':'o','ò':'o','ô':'o','ú':'u','ù':'u','û':'u','í':'i','ì':'i','î':'i','ñ':'n','ç':'c','&':'+','€':'EUR'};
  let r=str;
  for(const[k,v]of Object.entries(map))r=r.split(k).join(v);
  return r.replace(/[^a-zA-Z0-9 /\-?:()\.,'+]/g,'');
}

function showToast(msg){
  const el=document.createElement('div');el.className='toast';el.textContent=msg;
  document.body.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('visible'));
  setTimeout(()=>{el.classList.remove('visible');setTimeout(()=>el.remove(),300);},3000);
}

function buildGiroCode({bic,name,iban,amount,reason}){return['BCD','002','1','SCT',bic||'',name.trim().slice(0,70),iban.trim().toUpperCase(),amount?'EUR'+parseFloat(amount).toFixed(2):'','','',reason.trim().slice(0,140),''].join('\n');}

function generate(){
  const ar=document.getElementById('inp-amount').value,rawR=document.getElementById('inp-reason').value.trim(),r=sanitizeSepa(rawR);
  const n=localStorage.getItem(KEY_NAME),ib=localStorage.getItem(KEY_IBAN),bi=localStorage.getItem(KEY_BIC)||'';
  if(!n||!ib){showView('settings');return;}
  let v=true;const a=parseFloat(ar);
  if(!ar||isNaN(a)||a<=0||a>999999999.99){showError('err-amount','inp-amount');v=false;}
  else if(!/^\d+(\.\d{1,2})?$/.test(ar.trim())){showError('err-amount','inp-amount');v=false;}
  else hideError('err-amount','inp-amount');
  if(r.length>140){document.getElementById('err-reason').textContent=r!==rawR?'After replacing special characters (e.g. ä\u2009\u2192\u2009ae), the reference exceeds 140 characters. Please shorten it.':'Maximum 140 characters.';showError('err-reason','inp-reason');v=false;}else hideError('err-reason','inp-reason');
  if(!v){if(r!==rawR){document.getElementById('inp-reason').value=r;const c=document.getElementById('reason-count');c.textContent=r.length;c.parentElement.className='char-counter'+(r.length>130?(r.length>=140?' over':' warn'):'');}return;}
  if(r!==rawR){document.getElementById('inp-reason').value=r;const c=document.getElementById('reason-count');c.textContent=r.length;c.parentElement.className='char-counter'+(r.length>130?(r.length>=140?' over':' warn'):'');showToast('Reference adjusted for SEPA compatibility');}
  const p=buildGiroCode({bic:bi,name:n,iban:ib,amount:ar,reason:r});
  if(new TextEncoder().encode(p).length>331){showError('err-reason','inp-reason');document.getElementById('err-reason').textContent='Payload exceeds 331-byte EPC limit. Shorten the reference.';return;}
  const c=document.getElementById('qrcode');c.innerHTML='';
  currentQR=new QRCode(c,{text:p,width:256,height:256,correctLevel:QRCode.CorrectLevel.M});
  document.getElementById('sum-name').textContent=n;document.getElementById('sum-iban').textContent=formatIBAN(ib);
  document.getElementById('sum-bic').textContent=bi||'\u2014';document.getElementById('sum-amount').textContent='EUR '+parseFloat(ar).toFixed(2);
  document.getElementById('sum-reason').textContent=r||'\u2014';
  document.getElementById('step-form').classList.remove('active');document.getElementById('step-qr').classList.add('active');
}

function resetForm(){document.getElementById('inp-amount').value='';document.getElementById('inp-reason').value='';document.getElementById('reason-count').textContent='0';document.getElementById('qrcode').innerHTML='';currentQR=null;document.getElementById('step-qr').classList.remove('active');document.getElementById('step-form').classList.add('active');}
function showError(e,i){document.getElementById(e).classList.add('visible');document.getElementById(i).classList.add('error');}
function hideError(e,i){document.getElementById(e).classList.remove('visible');document.getElementById(i).classList.remove('error');}
function formatIBAN(s){return s.replace(/(.{4})/g,'$1 ').trim();}
