import shutil
from common import *
OUT='/workspace/lumiere-veritas/youtube/'
SERV='PR · Media · Advertising · Influencer · Brand Films · Digital'
# ===== BANNER 2560x1440, safe 1546x423
W,H=2560,1440; SX0,SY0=(W-1546)//2,(H-423)//2; SX1,SY1=SX0+1546,SY0+423
im=glow(W,H,CREAM,W//2,H//2,900,IVORY,0.95); d=ImageDraw.Draw(im)
# decorative TV-area accents
for y,w in [(120,2),(132,1),(H-132,1),(H-120,2)]: d.line([160,y,W-160,y],fill=GR,width=w)
d.rectangle([W//2-110,112,W//2+110,124],fill=CORAL)
for r,w in [(980,2),(1010,1)]: d.arc([W//2-r,H//2-r,W//2+r,H//2+r],200,340,fill=GR,width=w); d.arc([W//2-r,H//2-r,W//2+r,H//2+r],20,160,fill=GR,width=w)
diamond(d,W//2,H-126,9,CORAL)
# band accent lines framing the desktop strip (outside safe height edges)
for y in (SY0-40,SY1+40):
    d.line([60,y,SX0-80,y],fill=GR,width=2); d.line([SX1+80,y,W-60,y],fill=GR,width=2)
diamond(d,SX0-60,SY0-40,7,CORAL);diamond(d,SX1+60,SY0-40,7,CORAL);diamond(d,SX0-60,SY1+40,7,GR);diamond(d,SX1+60,SY1+40,7,GR)
# content inside safe area
LX=SX0+40; lg=logo_h(355); ly=SY0+(423-355)//2; im.paste(lg,(LX,ly),lg)
sepx=LX+lg.width+55; d.line([sepx,SY0+50,sepx,SY1-50],fill=GR,width=2)
CX=(sepx+SX1)//2+10
spaced(d,(CX,SY0+38),'360° MEDIA · MARKETING · PR AGENCY',F('b',24,700),GT,5,'m')
d.text((CX,SY0+165),'We create visibility.',font=F('h',96,700),fill=CH,anchor='ms')
d.text((CX,SY0+262),'We build impact.',font=F('hi',96,700),fill=CORAL,anchor='ms')
y=SY0+298; d.line([CX-170,y,CX-16,y],fill=GR,width=2); d.line([CX+16,y,CX+170,y],fill=GR,width=2); diamond(d,CX,y,7,CORAL)
spaced(d,(CX,SY0+322),SERV,F('b',27,600),MU,1,'m')
spaced(d,(CX,SY0+366),'WWW.LUMIEREVERITASMEDIA.COM',F('b',28,800),CORAL,4,'m')
im.save(OUT+'yt-banner-2560x1440.jpg',quality=93); banner=im
# preview
pv=banner.copy(); d=ImageDraw.Draw(pv)
crops=[('TV: full 2560x1440',(0,0,W-1,H-1),'#7A7A7A'),('Desktop max 2560x423',(0,SY0,W-1,SY1),'#1D9BF0'),('Tablet 1855x423',((W-1855)//2,SY0,(W+1855)//2,SY1),'#8E44AD'),('Mobile / safe area 1546x423',(SX0,SY0,SX1,SY1),'#E0245E')]
for i,(lab,b,c) in enumerate(crops):
    d.rectangle(b,outline=c,width=5 if i==3 else 3)
    f=F('b',30,700); tx=b[0]+14; ty=(b[1]+14) if i==0 else (b[1]-44-i*0)
    if i==1: tx,ty=20,SY0+10
    if i==2: tx,ty=(W-1855)//2+14,SY1+10
    if i==3: tx,ty=SX0+14,SY1+52
    d.rectangle([tx-6,ty-4,tx+textw(d,lab,f)+6,ty+38],fill='white'); d.text((tx,ty),lab,font=f,fill=c)
pv.resize((1280,720),Image.LANCZOS).save(OUT+'yt-banner-preview.jpg',quality=92)
# ===== PROFILE 800
S=800; im=glow(S,S,CREAM,400,400,400,IVORY,1.0); d=ImageDraw.Draw(im)
d.ellipse([22,22,778,778],outline=GR,width=5)
al=np.array(LOGO.split()[3])>40; ys,xs=np.nonzero(al)
rmax=np.sqrt((xs-LOGO.width/2)**2+(ys-LOGO.height/2)**2).max(); sc=336/rmax
lg=LOGO.resize((round(LOGO.width*sc),round(LOGO.height*sc)),Image.LANCZOS)
im.paste(lg,(400-lg.width//2,400-lg.height//2),lg); im.save(OUT+'yt-profile-800x800.jpg',quality=95)
# ===== WATERMARK 150 transparent (logo mark only, cropped from the exact logo)
m=mark(); wm=Image.new('RGBA',(150,150),(0,0,0,0)); sc=140/max(m.size)
mm=m.resize((round(m.width*sc),round(m.height*sc)),Image.LANCZOS); wm.paste(mm,((150-mm.width)//2,(150-mm.height)//2),mm)
wm.save(OUT+'yt-watermark-150x150.png')
# ===== END SCREEN 1920x1080
W,H=1920,1080; im=glow(W,H,CREAM,W//2,560,760,IVORY,0.9); d=ImageDraw.Draw(im)
d.rectangle([0,0,W,10],fill=CORAL)
d.line([90,60,W-90,60],fill=GR,width=2); d.line([90,1020,W-90,1020],fill=GR,width=2)
lg=logo_h(110); im.paste(lg,(W//2-lg.width//2,95),lg)
fa,fb=F('h',72,700),F('hi',72,700); t1,t2='We create visibility.  ','We build impact.'
w1,w2=d.textlength(t1,font=fa),d.textlength(t2,font=fb); x0=W//2-(w1+w2)/2
d.text((x0,300),t1,font=fa,fill=CH,anchor='ls'); d.text((x0+w1,300),t2,font=fb,fill=CORAL,anchor='ls')
# elements: subscribe circle (left), two video slots
cr=150; ccx,ccy=295,600
dashed_circle(d,ccx,ccy,cr,GR,width=3)
d.text((ccx,ccy+cr+50),'SUBSCRIBE',font=F('b',24,800),fill=GT,anchor='mm')
VW,VH=580,326
for i,x in enumerate([640,1300-20]):
    x=555+i*(VW+60); y=600-VH//2
    d.rounded_rectangle([x,y,x+VW,y+VH],radius=14,fill='#F3E7D3')
    dashed_rect(d,[x,y,x+VW,y+VH],GR,width=2)
    d.text((x+VW//2,y+VH+46),['WATCH NEXT','MORE FROM US'][i],font=F('b',24,800),fill=GT,anchor='mm')
spaced(d,(W//2,925),'WWW.LUMIEREVERITASMEDIA.COM',F('b',30,800),CORAL,4,'m')
d.text((W//2,985),'PR · Media · Advertising · Influencer · Brand Films · Digital',font=F('b',22,600),fill=MU,anchor='ms')
im.save(OUT+'yt-trailer-endscreen-1920x1080.jpg',quality=93)
for f in ['yt-banner-2560x1440.jpg','yt-banner-preview.jpg','yt-profile-800x800.jpg','yt-watermark-150x150.png','yt-trailer-endscreen-1920x1080.jpg']: shutil.copy(OUT+f,'/workspace/share/')
print('ok')
