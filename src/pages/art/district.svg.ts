import type { APIRoute } from "astro";

// Purpose-built illustrative model, not a map of matches or a source of geographic data.
export const GET: APIRoute = () => {
  const p=(x:number,y:number,z=0)=>[430+(x-y)*25,78+(x+y)*13-z].map(v=>v.toFixed(1)).join(",");
  const poly=(vertices:string[],fill:string,edge="none")=>'<polygon points="'+vertices.join(" ")+'" fill="'+fill+'" stroke="'+edge+'" stroke-width=".6"/>';
  const tile=(x:number,y:number,w:number,d:number,z:number,c:string)=>poly([p(x,y,z),p(x+w,y,z),p(x+w,y+d,z),p(x,y+d,z)],c);
  const noise=(x:number,y:number)=>{const v=Math.sin(x*128.19+y*75.77)*4934.17;return v-Math.floor(v)};
  let shapes="";
  const bottom=32,W=16,H=14;
  shapes+=poly([p(0,H),p(W,H),p(W,H,-bottom),p(0,H,-bottom)],"#5f726f")+poly([p(W,0),p(W,H),p(W,H,-bottom),p(W,0,-bottom)],"#354d54");
  for(const z of [-7,-11,-23])shapes+='<path d="M'+p(0,H,z)+' L'+p(W,H,z)+' '+p(W,0,z)+'" fill="none" stroke="#adc5b9" opacity=".55"/>';
  shapes+=tile(0,0,W,H,0,"#a8b8ad");
  const river=(x:number)=>5.2+1.25*Math.sin(x*.41)+x*.15;
  function ribbon(shift:number,width:number,clr:string){const v:string[]=[];for(let i=0;i<=64;i++){const x=i/4;v.push(p(x,river(x)+shift))}for(let i=64;i>=0;i--){const x=i/4;v.push(p(x,river(x)+shift+width))}return poly(v,clr)}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const n=noise(x,y); shapes+=tile(x+.08,y+.08,.84,.84,0,n>.73?"#bdc4ab":"#a5b6a4")}
  shapes+=ribbon(-.92,2.18,"#d0d6b7")+ribbon(-.74,1.85,"#568e98")+ribbon(-.47,1.31,"#427684")+ribbon(.52,.045,"#94bec1");
  for(const x of [2.3,9.3,14.2])shapes+=tile(x,river(x)-1.2,.26,2.8,3,"#e5dcbd");
  const palette=["#cdbd9f","#ede0c1","#cfa98f","#c5c7b6","#adbbb6"];
  for(let sum=0;sum<W+H;sum++)for(let x=0;x<W;x++){
    const y=sum-x;if(y<0||y>=H||Math.abs(y+.45-river(x+.45))<1.25)continue;
    const n=noise(x+.6,y+.1),u=x+.15,v=y+.14,w=.44+n*.25,d=.46+noise(y,x+.43)*.23;
    if(n<.14){for(let j=0;j<4;j++){const [a,b]=p(u+noise(j,x)*.65,v+noise(j,y)*.64,4).split(",");shapes+='<ellipse cx="'+a+'" cy="'+b+'" rx="5.2" ry="6" fill="'+(j%2?"#6d8e74":"#829e82")+'"/>'}continue}
    const tower=x>9&&y<4;const h=tower?14+n*63:4+n*6;
    shapes+=poly([p(u+w,v,0),p(u+w+.26,v+.15),p(u+w+.26,v+d+.18),p(u+.2,v+d+.18),p(u,v+d)],"#849786");
    shapes+=poly([p(u,v+d),p(u+w,v+d),p(u+w,v+d,h),p(u,v+d,h)],"#c8c3ac")+poly([p(u+w,v),p(u+w,v+d),p(u+w,v+d,h),p(u+w,v,h)],"#909c94");
    if(tower){shapes+=tile(u,v,w,d,h,"#e8e3c8");for(let z=5;z<h-2;z+=6){shapes+='<path d="M'+p(u+.09,v+d,z)+' L'+p(u+w-.06,v+d,z)+' '+p(u+w,v+.06,z)+'" stroke="#718988" stroke-width="1" fill="none"/>'}}
    else {const a=p(u,v,h),b=p(u+w,v,h),c=p(u+w,v+d,h),e=p(u,v+d,h),r=p(u,v+d/2,h+7),s=p(u+w,v+d/2,h+7);shapes+=poly([a,b,s,r],"#87948b")+poly([e,c,s,r],palette[Math.floor(n*palette.length)])+poly([b,c,s],"#b7b49d");
      shapes+=poly([p(u+.10,v+d,2),p(u+.21,v+d,2),p(u+.21,v+d,h-1),p(u+.10,v+d,h-1)],"#6d8480")
        +poly([p(u+w,v+.11,1),p(u+w,v+.26,1),p(u+w,v+.26,h-1),p(u+w,v+.11,h-1)],"#6c7d78");
      if(n>.42) shapes+=tile(u+.13,v+.25,.09,.11,h+6,"#e6dcc5")+poly([p(u+.13,v+.36,h+6),p(u+.22,v+.36,h+6),p(u+.22,v+.36,h+3),p(u+.13,v+.36,h+3)],"#916e61");
    }
  }
  return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="920" height="555" viewBox="33 16 856 507">'+shapes+'</svg>',{headers:{"Content-Type":"image/svg+xml"}});
};
