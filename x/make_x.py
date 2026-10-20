from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, shutil
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    p={'h':'Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf','hi':'Cormorant Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf','b':'Manrope/Manrope-VariableFont_wght.ttf'}[kind]
    f=ImageFont.truetype(G+p,size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
CREAM='#FBF3E6';IVORY='#FFF8EE';CORAL='#EE5A4C';CH='#2A2A2A';MU='#6B6259';GR='#C9A45C';GT='#9C7428'
OUT='/workspace/lumiere-veritas/x/'
# ---- knock out white: soft mask + un-blend edge colours (no white fringe)
a=np.array(Image.open('/workspace/lumiere-veritas/public/brand/logo.png').convert('RGB')).astype(float)
dev=255-a.min(2)                       # distance from white
al=np.clip((dev-6)/34,0,1)
c=a.copy()
m=(al>0)&(al<1)
for k in range(3):
    ch=c[...,k]; ch[m]=np.clip((ch[m]-255*(1-al[m]))/al[m],0,255)
rgba=np.dstack([c,al*255]).astype(np.uint8)
LOGO=Image.fromarray(rgba,'RGBA'); LOGO=LOGO.crop(LOGO.getbbox())
LOGO.save(OUT+'logo-knockout.png')
def logo_h(h):
    return LOGO.resize((round(LOGO.width*h/LOGO.height),h),Image.LANCZOS)
def spaced(d,xy,t,f,fill,sp,anchor='l'):
    w=sum(d.textlength(ch,font=f) for ch in t)+sp*(len(t)-1)
    x,y=xy
    if anchor=='m': x-=w/2
    for ch in t:
        d.text((x,y),ch,font=f,fill=fill); x+=d.textlength(ch,font=f)+sp
    return w
def glow(W,H,base,cx,cy,r,col,strength):
    im=Image.new('RGB',(W,H),base)
    g=Image.new('L',(W,H),0); ImageDraw.Draw(g).ellipse([cx-r,cy-r,cx+r,cy+r],fill=int(255*strength))
    g=g.filter(ImageFilter.GaussianBlur(r/2.2))
    im.paste(Image.new('RGB',(W,H),col),(0,0),g); return im
def diamond(d,x,y,s,fill): d.polygon([(x,y-s),(x+s,y),(x,y+s),(x-s,y)],fill=fill)

SERV='PR · Media · Advertising · Influencer · Brand Films · Digital'
# ================= HEADER
def header(theme):
    W,H=1500,500
    dark=theme=='charcoal'
    bg=CH if dark else CREAM; txt=IVORY if dark else CH; acc2=GR if dark else CORAL
    sub='#CFC6B8' if dark else MU; gold_t=GR if dark else GT
    im=glow(W,H,bg,1265,250,330,'#34312D' if dark else IVORY,0.9)
    d=ImageDraw.Draw(im)
    # gold hairlines top/bottom + coral accent
    d.line([60,34,W-60,34],fill=GR,width=2); d.line([60,466,W-60,466],fill=GR,width=2)
    d.line([60,42,W-60,42],fill=GR,width=1)
    d.rectangle([W//2-60,30,W//2+60,38],fill=CORAL)
    # logo area (right)
    LX=1265
    if dark:
        R=178
        d.ellipse([LX-R-10,250-R-10,LX+R+10,250+R+10],outline=GR,width=2)
        d.ellipse([LX-R,250-R,LX+R,250+R],fill=IVORY)
        lg=logo_h(232)
    else:
        for rr,wd in [(194,2),(204,1)]:
            d.arc([LX-rr,250-rr,LX+rr,250+rr],188,352,fill=GR,width=wd)
        lg=logo_h(300)
    im.paste(lg,(LX-lg.width//2,250-lg.height//2),lg)
    # text column centred at CX
    CX=745
    k=F('b',19,700); spaced(d,(CX,102),'360° MEDIA · MARKETING · PR AGENCY',k,gold_t,4,'m')
    t1=F('h',76,700); t2=F('hi',76,700)
    d.text((CX,190),'We create visibility.',font=t1,fill=txt,anchor='ms')
    d.text((CX,268),'We build impact.',font=t2,fill=acc2,anchor='ms')
    # divider with diamond
    y=302; d.line([CX-150,y,CX-14,y],fill=GR,width=2); d.line([CX+14,y,CX+150,y],fill=GR,width=2); diamond(d,CX,y,6,CORAL)
    s=F('b',21,600); spaced(d,(CX,326),SERV,s,sub,1,'m')
    w=F('b',23,800); spaced(d,(CX,372),'WWW.LUMIEREVERITASMEDIA.COM',w,CORAL if not dark else GR,3,'m')
    p=OUT+f'x-header-{theme}.jpg'; im.save(p,quality=94); return im
hc=header('cream'); hk=header('charcoal')
hc.save(OUT+'x-header-1500x500.jpg',quality=94)
# ================= PROFILE
def profile():
    S=400; im=glow(S,S,CREAM,200,200,200,IVORY,1.0); d=ImageDraw.Draw(im)
    d.ellipse([10,10,390,390],outline=GR,width=3)
    al=np.array(LOGO.split()[3])>40; ys,xs=np.nonzero(al)
    cy0,cx0=LOGO.height/2,LOGO.width/2
    rmax=np.sqrt(((xs-cx0)**2+(ys-cy0)**2)).max()
    sc=168/rmax
    lg=LOGO.resize((round(LOGO.width*sc),round(LOGO.height*sc)),Image.LANCZOS)
    im.paste(lg,(200-lg.width//2,200-lg.height//2),lg)
    im.save(OUT+'x-profile-400x400.jpg',quality=95); return im
pf=profile()
# ================= PINNED 1600x900
def pinned():
    W,H=1600,900; im=glow(W,H,CREAM,1210,420,430,IVORY,1.0); d=ImageDraw.Draw(im)
    d.rectangle([0,0,W,12],fill=CORAL)
    d.rectangle([50,50,W-50,H-50],outline=GR,width=2); d.rectangle([60,60,W-60,H-60],outline=GR,width=1)
    M=130
    # Now on X pill
    pf_=F('b',26,800); tw=spaced(d,(0,-100),'NOW ON X',pf_,CORAL,5)
    d.rounded_rectangle([M,120,M+tw+60,176],radius=28,fill=CORAL); spaced(d,(M+30,132),'NOW ON X',pf_,'white',5)
    d.text((M,300),'We create visibility.',font=F('h',100,700),fill=CH,anchor='ls')
    d.text((M,405),'We build impact.',font=F('hi',100,700),fill=CORAL,anchor='ls')
    d.line([M,445,M+160,445],fill=GR,width=4)
    k=F('b',22,800); spaced(d,(M,478),'360° MEDIA · MARKETING · ADVERTISING · PR · CREATIVE',k,GT,3)
    items=['PR & Media Relations','Advertising','Influencer Marketing','Brand Films','Digital & Social','Creative & Branding']
    sf=F('b',30,600)
    for i,it in enumerate(items):
        x=M+(i%2)*400; y=545+(i//2)*54
        diamond(d,x+8,y+19,8,CORAL); d.text((x+32,y),it,font=sf,fill=CH)
    # CTA bar
    y=725; l=F('b',17,800); EM='lumiereveritasmediasolutions@gmail.com'; WEB='www.lumiereveritasmedia.com'
    vs=30
    while True:
        v=F('b',vs,700); e_w=d.textlength(EM,font=v); w_w=d.textlength(WEB,font=v)
        bw=36+e_w+70+w_w+40
        if bw<=1340-M or vs<=20: break
        vs-=1
    d.rounded_rectangle([M,y,M+bw,y+100],radius=24,fill=CH)
    spaced(d,(M+36,y+18),'EMAIL',l,GR,3); d.text((M+36,y+44),EM,font=v,fill=IVORY)
    sx=M+36+e_w+35; d.line([sx,y+22,sx,y+78],fill=GR,width=2)
    spaced(d,(sx+35,y+18),'WEBSITE',l,GR,3); d.text((sx+35,y+44),WEB,font=v,fill=IVORY)
    # logo right
    LX=1225
    for rr,wd in [(298,2),(310,1)]: d.arc([LX-rr,420-rr,LX+rr,420+rr],188,352,fill=GR,width=wd)
    lg=logo_h(420); im.paste(lg,(LX-lg.width//2,420-lg.height//2),lg)
    im.save(OUT+'x-pinned-1600x900.jpg',quality=94)
pinned()
# ================= PREVIEWS (desktop 600px column scaled x2.5)
def preview(h,theme):
    W=1500; im=Image.new('RGB',(W,820),'white'); im.paste(h,(0,0)); d=ImageDraw.Draw(im)
    D=335; x0,y0=40,500-D//2
    d.ellipse([x0-10,y0-10,x0+D+10,y0+D+10],fill='white')
    mask=Image.new('L',(D,D),0); ImageDraw.Draw(mask).ellipse([0,0,D-1,D-1],fill=255)
    im.paste(pf.resize((D,D),Image.LANCZOS),(x0,y0),mask)
    d.text((40,y0+D+30),'Lumiere Veritas Media Solutions',font=F('b',44,800),fill='#0F1419')
    d.text((40,y0+D+88),'Desktop mock-up · dashed box = approx. mobile visible band',font=F('b',26,500),fill='#536471')
    # mobile safe band
    for xx in range(0,W,24): d.line([xx,70,xx+12,70],fill='#1D9BF0',width=2); d.line([xx,430,xx+12,430],fill='#1D9BF0',width=2)
    im.save(OUT+f'x-preview-{theme}.jpg',quality=92)
preview(hc,'cream'); preview(hk,'charcoal')
for f in ['x-header-1500x500.jpg','x-header-cream.jpg','x-header-charcoal.jpg','x-profile-400x400.jpg','x-pinned-1600x900.jpg','x-preview-cream.jpg','x-preview-charcoal.jpg']:
    shutil.copy(OUT+f,'/workspace/share/'+f)
print('ok')
