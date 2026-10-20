from PIL import Image, ImageDraw, ImageFont
import numpy as np
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    p={'h':'Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf','hi':'Cormorant Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf','b':'Manrope/Manrope-VariableFont_wght.ttf'}[kind]
    f=ImageFont.truetype(G+p,size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
W,H=1080,1350
art=Image.open('15-dussehra-hands-art-AI.jpg').convert('RGB')
bg=tuple(int(v) for v in np.array(art)[5:60,700:760].reshape(-1,3).mean(0))
c=Image.new('RGB',(W,H),bg)
s=1080/1024*1.0
ah=1060; s=ah/1024; aw=int(768*s)
a=art.resize((aw,ah),Image.LANCZOS)
c.paste(a,(0,0))
# fade art bottom into bg
fade=Image.new('L',(aw,ah),255); fd=ImageDraw.Draw(fade)
for i in range(120):
    fd.line([(0,ah-120+i),(aw,ah-120+i)],fill=int(255*(1-i/120)))
c2=Image.new('RGB',(W,H),bg); c2.paste(a,(0,0),fade); c=c2
d=ImageDraw.Draw(c)
items=[(140,'VICTORY','Good over evil',(226,110,30)),
(262,'COURAGE','Aim with fire',(196,40,40)),
(352,'LIGHT','Lumière, the glow that guides',(176,128,30)),
(480,'PROSPERITY','The gold of Apta leaves',(222,90,70)),
(595,'PURITY','Rising above',(30,120,70)),
(700,'TRUTH','Veritas, truth that wins',(100,40,140)),
(862,'RENEWAL','Burn the old, begin anew',(130,30,40))]
tf=F('h',40,700); sf=F('hi',29,500)
TX=640
for y0,t,sub,col in items:
    y=int(y0*s)
    d.line([(int(400*s),y),(TX-20,y)],fill=(201,164,92),width=2)
    d.ellipse([TX-26,y-5,TX-16,y+5],fill=(201,164,92))
    d.text((TX,y-36),t,font=tf,fill=col)
    d.text((TX,y+6),sub,font=sf,fill=(107,98,89))
d.text((W-150,int(1000*s)),'AI artwork',font=F('b',16,500),fill=(150,140,128))
# bottom band
def ctext(y,t,f,fill,sp=0):
    w=sum(d.textlength(ch,font=f) for ch in t)+sp*(len(t)-1); x=(W-w)/2
    for ch in t: d.text((x,y),ch,font=f,fill=fill); x+=d.textlength(ch,font=f)+sp
d.line([(300,1062),(780,1062)],fill=(201,164,92),width=2)
ctext(1072,'HAPPY DUSSEHRA',F('h',70,700),(156,116,40),4)
ctext(1152,'SEVEN SYMBOLS. ONE VICTORY.',F('b',22,600),(42,42,42),5)
logo=Image.open('/workspace/lumiere-veritas/x/logo-knockout.png').convert('RGBA')
lh=120; lw=int(logo.width*lh/logo.height); logo=logo.resize((lw,lh),Image.LANCZOS)
c.paste(logo,((W-lw)//2,1192),logo)
ctext(1316,'www.lumiereveritasmedia.com',F('b',20,500),(107,98,89),1)
c.save('15-dussehra-hands-feed.jpg',quality=94)
import shutil; shutil.copy('15-dussehra-hands-feed.jpg','/workspace/share/')
