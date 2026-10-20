"""YouTube thumbnail templates (1280x720) for Lumiere Veritas.
Edit the THUMBS list (kicker / lines / sub / out) and run:  python3 make_thumbs.py
Headline lines: list of (text, colour_key); long lines auto-shrink to fit the left column.
Right side (x 780-1220) is left empty for a face/photo; bottom-right corner is kept clear for YouTube's timestamp."""
import shutil
from common import *
OUT='/workspace/lumiere-veritas/youtube/'
THUMBS=[
 dict(style='myth', out='thumb-shorts-myth.jpg', kicker='SHORTS · MYTH BUSTER',
      lines=[('PR MYTH','coral'),('vs FACT','ivory')], sub='Busting one PR myth at a time'),
 dict(style='explainer', out='thumb-explainer.jpg', kicker='EXPLAINER',
      lines=[('How PR','ink'),('Works in','ink'),('India','coral')], sub='A simple guide for brands'),
 dict(style='ad', out='thumb-ad-breakdown.jpg', kicker='BREAKDOWN · EP 01',
      lines=[('Ad of','ivory'),('the Week','ivory')], sub='What works, and why'),
]
STY={
 'myth':     dict(bg=CH, panel='#353330', kick=CORAL, sub='#D9CFC0', col={'coral':CORAL,'ivory':IVORY,'ink':IVORY}, font=('b',800), mark='#6E655A', rule=CORAL, logo_disc=IVORY),
 'explainer':dict(bg=CREAM, panel='#F3E7D3', kick=GT, sub=MU, col={'coral':CORAL,'ivory':CH,'ink':CH}, font=('h',700), mark='#C9B48C', rule=GR, logo_disc=None),
 'ad':       dict(bg=CORAL, panel='#E04E41', kick=IVORY, sub='#FFE9E2', col={'coral':CH,'ivory':IVORY,'ink':CH}, font=('b',800), mark='#F7A79E', rule=CH, logo_disc=IVORY),
}
W,H=1280,720; LEFT=70; COLW=640
def render(t):
    s=STY[t['style']]; im=Image.new('RGB',(W,H),s['bg']); d=ImageDraw.Draw(im)
    if t['style']=='explainer': im=glow(W,H,CREAM,1000,330,420,IVORY,1.0); d=ImageDraw.Draw(im)
    # photo / face area (right) - subtle marker only
    PX0,PY0,PX1,PY1=780,60,1220,590
    d.rounded_rectangle([PX0,PY0,PX1,PY1],radius=28,fill=s['panel'])
    dashed_rect(d,[PX0+14,PY0+14,PX1-14,PY1-14],s['mark'],dash=14,gap=12,width=2)
    d.text(((PX0+PX1)//2,(PY0+PY1)//2),'FACE / PHOTO',font=F('b',22,700),fill=s['mark'],anchor='mm')
    # logo top-left (on ivory disc for dark/coral bg so burgundy stays legible)
    lh=78
    if s['logo_disc']:
        d.rounded_rectangle([LEFT-14,40,LEFT+lh*1.12+14,40+lh+20],radius=18,fill=s['logo_disc'])
        lg=logo_h(lh); im.paste(lg,(LEFT,50),lg)
    else:
        lg=logo_h(lh+10); im.paste(lg,(LEFT,42),lg)
    # kicker
    ky=168; spaced(d,(LEFT,ky),t['kicker'],F('b',24,800),s['kick'],4)
    d.rectangle([LEFT,ky+42,LEFT+90,ky+48],fill=s['rule'])
    # headline: fit size
    kind,wt=s['font']; n=len(t['lines'])
    size=150 if n<=2 else 104
    if kind=='h': size=int(size*1.12)
    while True:
        f=F(kind,size,wt)
        if max(d.textlength(x,font=f) for x,_ in t['lines'])<=COLW or size<50: break
        size-=4
    lead=int(size*(0.98 if kind=='b' else 0.92)); y=ky+80+int(size*0.82)
    for txt,c in t['lines']:
        d.text((LEFT,y),txt,font=f,fill=s['col'][c],anchor='ls'); y+=lead
    d.text((LEFT,min(y-lead+62,672)),t['sub'],font=F('b',28,600),fill=s['sub'],anchor='ls')
    im.save(OUT+t['out'],quality=93); shutil.copy(OUT+t['out'],'/workspace/share/'); print(t['out'],size)
for t in THUMBS: render(t)
