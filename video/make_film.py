import subprocess, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
V='/workspace/lumiere-veritas/video/'; S=V+'src/'; B=V+'build/'
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    p={'h':'Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf','hi':'Cormorant Garamond/CormorantGaramond-Italic-VariableFont_wght.ttf','b':'Manrope/Manrope-VariableFont_wght.ttf'}[kind]
    f=ImageFont.truetype(G+p,size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
CREAM='#FBF3E6';IVORY=(255,248,238);CORAL='#EE5A4C';GR=(201,164,92);GT='#9C7428';CH='#2A2A2A';MU='#6B6259'
LOGO=Image.open('/workspace/lumiere-veritas/x/logo-knockout.png')
def run(c): 
    r=subprocess.run(c,shell=True,capture_output=True,text=True)
    if r.returncode: print(r.stderr[-3000:]); sys.exit(1)
def sp_w(d,t,f,sp): return sum(d.textlength(c,font=f) for c in t)+sp*(len(t)-1)
def overlay(W,H,lines,path,cy,band=False):
    """lines: list of (text, font, fill, letterspacing). Centered block at cy, soft shadow."""
    txt=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(txt)
    hs=[int(f.size*1.18) for _,f,_,_ in lines]; y=cy-sum(hs)//2
    for (t,f,fill,sp),h in zip(lines,hs):
        while sp_w(d,t,f,sp)>W*0.84: f=f.font_variant(size=f.size-2)
        x=(W-sp_w(d,t,f,sp))/2
        for c in t: d.text((x,y),c,font=f,fill=fill); x+=d.textlength(c,font=f)+sp
        y+=h
    a=txt.split()[3]; sh=Image.new('RGBA',(W,H),(0,0,0,0)); sh.putalpha(a.filter(ImageFilter.GaussianBlur(16)).point(lambda v:min(255,int(v*1.0))))
    base=Image.new('RGBA',(W,H),(0,0,0,0))
    if band:
        m=Image.new('L',(W,H),0); top=cy-sum(hs)//2
        ImageDraw.Draw(m).rectangle([0,top-70,W,top+sum(hs)+70],fill=165); m=m.filter(ImageFilter.GaussianBlur(55))
        base=Image.new('RGBA',(W,H),(10,8,6,255)); base.putalpha(m)
    out=Image.alpha_composite(base,sh); out=Image.alpha_composite(out,sh); out=Image.alpha_composite(out,txt); out.save(path)
def label(W,H,path,vert):
    im=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(im); f=F('b',22 if not vert else 26,600)
    t='AI CONCEPT FILM'; w=sp_w(d,t,f,3); x=W-60-w; y=50 if not vert else 150
    if vert: x=60
    xx=x
    for c in t: d.text((xx,y),c,font=f,fill=(255,248,238,150)); xx+=d.textlength(c,font=f)+3
    im.save(path)
def endcard(W,H,path,vert):
    im=Image.new('RGB',(W,H),CREAM); g=Image.new('L',(W,H),0); ImageDraw.Draw(g).ellipse([W/2-W*0.45,H/2-H*0.4,W/2+W*0.45,H/2+H*0.4],fill=230)
    im.paste(Image.new('RGB',(W,H),'#FFF8EE'),(0,0),g.filter(ImageFilter.GaussianBlur(W/8))); d=ImageDraw.Draw(im)
    m=70
    d.line([m,m,W-m,m],fill=GR,width=2); d.line([m,H-m,W-m,H-m],fill=GR,width=2)
    d.rectangle([W//2-70,m-5,W//2+70,m+5],fill=CORAL)
    lh=int(H*0.42) if not vert else 560
    lg=LOGO.resize((round(LOGO.width*lh/LOGO.height),lh),Image.LANCZOS)
    cy=H*0.42 if not vert else H*0.40
    im.paste(lg,(W//2-lg.width//2,int(cy-lh/2)),lg)
    y=int(cy+lh/2)+(60 if not vert else 70)
    f1=F('h',58 if not vert else 64,700); f2=F('hi',58 if not vert else 64,700)
    if not vert:
        t1,t2='We create visibility.  ','We build impact.'; w1,w2=d.textlength(t1,font=f1),d.textlength(t2,font=f2); x=W/2-(w1+w2)/2
        d.text((x,y),t1,font=f1,fill=CH); d.text((x+w1,y),t2,font=f2,fill=CORAL); y+=100
    else:
        d.text((W/2,y),'We create visibility.',font=f1,fill=CH,anchor='mt'); d.text((W/2,y+82),'We build impact.',font=f2,fill=CORAL,anchor='mt'); y+=190
    d.line([W/2-120,y,W/2-14,y],fill=GR,width=2); d.line([W/2+14,y,W/2+120,y],fill=GR,width=2)
    d.polygon([(W/2,y-7),(W/2+7,y),(W/2,y+7),(W/2-7,y)],fill=CORAL)
    f=F('b',34 if not vert else 38,800); t='WWW.LUMIEREVERITASMEDIA.COM'; w=sp_w(d,t,f,4); x=(W-w)/2
    for c in t: d.text((x,y+34),c,font=f,fill=CORAL); x+=d.textlength(c,font=f)+4
    im.save(path)

SEG=[ # clip, duration, overlay lines
 ('lv-s1-dark',4.6,[('Every brand has a story.',F('h',100,600),IVORY,0)]),
 ('lv-s2-press',4.6,[('We put it in the light.',F('hi',100,600),IVORY,0)]),
 ('BILL',3.6,[('PR  ·  MEDIA  ·  ADVERTISING',F('b',46,700),IVORY,6)]),
 ('lv-s4-phone',3.6,[('INFLUENCER  ·  DIGITAL',F('b',46,700),IVORY,6)]),
 ('lv-s5-filmset',3.6,[('BRAND FILMS',F('b',46,700),IVORY,8)]),
 ('lv-s6-gold',4.6,[('We create visibility.',F('h',104,600),IVORY,0),('We build impact.',F('hi',104,600),(246,226,182),0)]),
]
XF=0.6; END=5.2
def build(asp):
    vert=asp=='9x16'; W,H=(1080,1920) if vert else (1920,1080)
    label(W,H,B+f'label-{asp}.png',vert)
    endcard(W,H,B+f'endcard-{asp}.png',vert)
    parts=[]
    for i,(clip,dur,lines) in enumerate(SEG):
        if clip=='BILL': clip='lv-s3b-billboard' if not vert else 'lv-s3-billboard'
        if clip=='lv-s5-filmset' and vert: clip='lv-s5b-filmset'  # 9:16 regen without clapperboard
        src=S+f'{clip}-{asp}.mp4'
        cy=(H*0.5 if i in (0,1,5) else H*0.84) if not vert else (H*0.46 if i in (0,1,5) else H*0.72)
        if vert and i in (0,1):  # put text where frames are darker
            cy=H*0.30 if i==1 else H*0.62
        ov=B+f'ov{i}-{asp}.png'; overlay(W,H,lines,ov,int(cy),band=i in (0,2,3,4,5))
        out=B+f'seg{i}-{asp}.mp4'; t_in=(XF+0.15) if i>0 else 0.7
        fin=f"fade=t=in:st={t_in}:d=0.4:alpha=1,fade=t=out:st={dur-XF-0.45}:d=0.4:alpha=1"
        run(f"ffmpeg -v error -y -i {src} -loop 1 -t {dur} -i {ov} -loop 1 -t {dur} -i {B}label-{asp}.png -filter_complex "
            f"\"[0:v]trim=0:{dur},setpts=PTS-STARTPTS,fps=30,scale={W}:{H}:flags=lanczos,eq=contrast=1.04:saturation=1.05,format=yuv420p[v];"
            f"[1:v]format=rgba,{fin}[t];[v][t]overlay=0:0:format=auto[vt];[vt][2:v]overlay=0:0[o]\" -map [o] -t {dur} -c:v libx264 -crf 17 -preset medium -pix_fmt yuv420p {out}")
        parts.append((out,dur))
    # end card with slow zoom + fade
    ec=B+f'seg-end-{asp}.mp4'; n=int(END*30)
    run(f"ffmpeg -v error -y -loop 1 -i {B}endcard-{asp}.png -filter_complex \"[0:v]scale={W*2}:{H*2},zoompan=z='1+0.04*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={n}:s={W}x{H}:fps=30,fade=t=out:st={END-0.6}:d=0.6,format=yuv420p[o]\" -map [o] -frames:v {n} -c:v libx264 -crf 17 -pix_fmt yuv420p {ec}")
    parts.append((ec,END))
    # xfade chain
    inputs=' '.join(f'-i {p}' for p,_ in parts); fc=[]; prev='[0:v]'; off=0
    for k in range(1,len(parts)):
        off+=parts[k-1][1]-XF; tr='fade' if k!=len(parts)-1 else 'fadewhite'
        fc.append(f"{prev}[{k}:v]xfade=transition={tr}:duration={XF}:offset={off:.3f}[x{k}]"); prev=f'[x{k}]'
    total=sum(d for _,d in parts)-XF*(len(parts)-1)
    run(f"ffmpeg -v error -y {inputs} -i {B}music.wav -filter_complex \"{';'.join(fc)};[{len(parts)}:a]atrim=0:{total:.3f},afade=t=out:st={total-2:.3f}:d=2[a]\" -map {prev} -map [a] "
        f"-c:v libx264 -crf 18 -preset slow -profile:v high -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -movflags +faststart {V}lv-concept-film-{asp}.mp4")
    print(asp,'total',round(total,2))
    return total
def music(T=30):
    # original ambient pad: dark A-minor chord -> brighter A-major-add9 when the light arrives (~4.3s)
    def chord(fr): return '+'.join(f"0.10*sin(2*PI*{f}*t)*(0.75+0.25*sin(2*PI*{0.11+i*0.07:.2f}*t))" for i,f in enumerate(fr))
    c1=chord([110,164.81,220,261.63,329.63]); c2=chord([110,164.81,220,277.18,329.63,493.88])
    expr=f"(({c1})*(1-min(1,max(0,(t-3.6)/1.6)))+({c2})*min(1,max(0,(t-3.6)/1.6)))*min(1,t/2.5)"
    run(f"ffmpeg -v error -y -f lavfi -i \"aevalsrc='{expr}':s=48000:d={T}\" -f lavfi -i \"anoisesrc=color=pink:amplitude=0.02:d={T}:r=48000\" "
        f"-filter_complex \"[1:a]lowpass=f=900,volume=0.6[n];[0:a][n]amix=inputs=2:normalize=0,lowpass=f=2400,aecho=0.8:0.85:120|260|430:0.35|0.25|0.18,"
        f"volume=0.9,alimiter=limit=0.8,pan=stereo|c0=c0|c1=c0,aformat=sample_rates=48000\" {B}music.wav")
music()
for a in (sys.argv[1:] or ['16x9','9x16']): build(a)
