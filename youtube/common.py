from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    p={'h':'Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf','hi':'Cormorant Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf','b':'Manrope/Manrope-VariableFont_wght.ttf'}[kind]
    f=ImageFont.truetype(G+p,size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
CREAM='#FBF3E6';IVORY='#FFF8EE';CORAL='#EE5A4C';CH='#2A2A2A';MU='#6B6259';GR='#C9A45C';GT='#9C7428'
LOGO=Image.open('/workspace/lumiere-veritas/x/logo-knockout.png')
def logo_h(h,src=None):
    s=src or LOGO; return s.resize((round(s.width*h/s.height),h),Image.LANCZOS)
def mark():
    m=LOGO.crop((0,0,LOGO.width,840)); return m.crop(m.getbbox())
def textw(d,t,f,sp=0): return sum(d.textlength(c,font=f) for c in t)+sp*(len(t)-1) if sp else d.textlength(t,font=f)
def spaced(d,xy,t,f,fill,sp,anchor='l'):
    w=textw(d,t,f,sp); x,y=xy
    if anchor=='m': x-=w/2
    if anchor=='r': x-=w
    for ch in t: d.text((x,y),ch,font=f,fill=fill); x+=d.textlength(ch,font=f)+sp
    return w
def glow(W,H,base,cx,cy,r,col,strength=1.0):
    im=Image.new('RGB',(W,H),base)
    g=Image.new('L',(W,H),0); ImageDraw.Draw(g).ellipse([cx-r,cy-r,cx+r,cy+r],fill=int(255*strength))
    g=g.filter(ImageFilter.GaussianBlur(r/2.2)); im.paste(Image.new('RGB',(W,H),col),(0,0),g); return im
def diamond(d,x,y,s,fill): d.polygon([(x,y-s),(x+s,y),(x,y+s),(x-s,y)],fill=fill)
def dashed_rect(d,box,fill,dash=16,gap=12,width=2):
    x0,y0,x1,y1=box
    for x in range(int(x0),int(x1),dash+gap):
        e=min(x+dash,x1); d.line([x,y0,e,y0],fill=fill,width=width); d.line([x,y1,e,y1],fill=fill,width=width)
    for y in range(int(y0),int(y1),dash+gap):
        e=min(y+dash,y1); d.line([x0,y,x0,e],fill=fill,width=width); d.line([x1,y,x1,e],fill=fill,width=width)
def dashed_circle(d,cx,cy,r,fill,n=48,width=2):
    for i in range(n):
        a0=360*i/n; d.arc([cx-r,cy-r,cx+r,cy+r],a0,a0+360/n*0.55,fill=fill,width=width)
