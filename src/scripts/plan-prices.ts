const cards = [...document.querySelectorAll<HTMLElement>('[data-plan]')];
const status = document.querySelector<HTMLElement>('#signup-status')!;
const link = document.querySelector<HTMLAnchorElement>('#signup-link')!;
const money = (v:number) => '$' + (v % 100 ? (v/100).toFixed(2) : String(v/100));
type Row = {id:string; first:number; regular:number; renewal:number; endsAt:string|null};
function valid(p:Row) {
  return p && [p.first,p.regular,p.renewal].every(n=>Number.isSafeInteger(n) && n>0) &&
    p.first<=p.renewal && p.renewal<=p.regular && (p.endsAt===null || (Number.isFinite(Date.parse(p.endsAt)) && Date.parse(p.endsAt)>Date.now()));
}
const baseline = cards.map(card=>card.querySelector('[data-price]')!.textContent);
let reading=false;
async function refresh(){
  if(reading)return;
  reading=true;
  try {
    const res=await fetch('https://app.realestateintent.com/api/public/plan-prices',{credentials:'omit',signal:AbortSignal.timeout(8000)});
    if(!res.ok) throw Error();
    const data=await res.json();
    if(data.currency!=='USD'||typeof data.signupOpen!=='boolean'||!Array.isArray(data.plans)||data.plans.length!==cards.length) throw Error();
    const rows:Row[]=cards.map(card=>data.plans.find((p:Row)=>p?.id===card.dataset.plan));
    if(!rows.every(valid)) throw Error();
    cards.forEach((card,i)=>{
      const p=rows[i], sale=p.first<p.regular;
      card.querySelector('[data-price]')!.textContent=money(p.first);
      card.querySelector('[data-period]')!.textContent=p.first!==p.renewal?' first month':'/month';
      const deadline=p.endsAt ? new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short',timeZone:'America/New_York'}).format(new Date(p.endsAt))+' ET' : '';
      card.querySelector('[data-offer-note]')!.textContent=!sale?'':(p.first===p.renewal?'Normally '+money(p.regular)+'/month. Keep this rate while subscribed.':'Renews at '+money(p.renewal)+'/month.')+(deadline?' Sign up before '+deadline+'.':'');
    });
    status.textContent=data.signupOpen?'':'New signups aren’t open yet.';
    link.hidden=!data.signupOpen;
  } catch {
    link.hidden=true;
    cards.forEach((card,i)=>{card.querySelector('[data-price]')!.textContent=baseline[i];card.querySelector('[data-period]')!.textContent='/month · regular';card.querySelector('[data-offer-note]')!.textContent='';});
    status.textContent='Showing regular prices. Current offers and signup availability could not be verified.';
  } finally {reading=false;}
}
if(cards.length && status && link){
  void refresh();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
  setInterval(()=>{if(!document.hidden)void refresh();},60_000);
}
