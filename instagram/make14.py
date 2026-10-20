# Usage: python3 make14.py [art_path]  (art: 1024x1024 AI gold line art, default 14-dussehra-art-AI.jpg)
import sys, shutil, numpy as np
from PIL import Image, ImageDraw, ImageFont
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    p={'h':'Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf','hi':'Cormorant Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf','b':'Manrope/Manrope-VariableFont_wght.ttf'}[kind]
    f=ImageFont.truetype(G+p,size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
GOLD=(232,200,130); GR='#C9A45C'; SOFT=(214,196,160); MUT=(150,138,118)
SRC=sys.argv[1] if len(sys.argv)>1 else '14-dussehra-art-AI.jpg'
art=Image.open(SRC).convert('RGB').resize((1024,1024),Image.LANCZOS)
LOGO=Image.open('/workspace/lumiere-veritas/x/logo-knockout.png')
def spaced(d,cx,y,t,f,fill,sp):
    w=sum(d.textlength(c,font=f) for c in t)+sp*(len(t)-1); x=cx-w/2
    for c in t: d.text((x,y),c,font=f,fill=fill); x+=d.textlength(c,font=f)+sp
def fade(im,y0,y1):
    a=np.array(im).astype(float); r=np.arange(a.shape[0]); m=np.ones(len(r))
    m[r>=y1]=0; s=(r>y0)&(r<y1); m[s]=1-(r[s]-y0)/(y1-y0)
    return Image.fromarray((a*(m[:,None,None]**1.4)).astype(np.uint8))
def make(W,H,art_y,cut,fy0,fy1,ty,path):
    im=Image.new('RGB',(W,H),'black')
    s=art.crop((0,0,1024,cut)); s=s.resize((1080,round(cut*1080/1024)),Image.LANCZOS)
    im.paste(fade(s,fy0,fy1),(0,art_y)); d=ImageDraw.Draw(im); cx=W//2
    d.text((W-40,art_y+fy0-20),'AI artwork',font=F('b',18,500),fill=MUT,anchor='rs')
    spaced(d,cx,ty,'SHUBH VIJAYADASHAMI',F('b',24,600),GR,7)
    d.text((cx,ty+128),'Happy Dussehra',font=F('h',112,600),fill=GOLD,anchor='ms')
    d.text((cx,ty+184),'May truth and light always win.',font=F('hi',40,500),fill=SOFT,anchor='ms')
    y=ty+214; d.line([cx-110,y,cx+110,y],fill=(110,92,60),width=1)
    d.text((cx,y+44),'Lumiere Veritas — where truth meets light',font=F('hi',28,500),fill=GR,anchor='ms')
    lh=124; lg=LOGO.resize((round(LOGO.width*lh/LOGO.height),lh),Image.LANCZOS)
    im.paste(lg,(cx-lg.width//2,y+68),lg)
    spaced(d,cx,y+68+lh+18,'www.lumiereveritasmedia.com',F('b',24,500),SOFT,2)
    im.save(path,quality=94); shutil.copy(path,'/workspace/share/'); print(path)
# feed: art src rows 0-900 -> 0..~949, shifted up 50 (top of src is empty black)
make(1080,1350,-50,900,760,900,840,'14-dussehra-feed.jpg')
# story: art at y=160, text block 1090..~1545; top/bottom 250 kept clear of key content
make(1080,1920,160,900,760,900,1090,'14-dussehra-story.jpg')
