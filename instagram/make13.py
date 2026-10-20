from PIL import Image, ImageDraw, ImageFont
G='/usr/share/fonts/truetype/sand-box/google/'
def F(kind,size,w):
    f=ImageFont.truetype(G+('Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf' if kind=='h' else 'Manrope/Manrope-VariableFont_wght.ttf'),size)
    try: f.set_variation_by_axes([w])
    except Exception: pass
    return f
CREAM='#FBF3E6';IVORY='#FFF8EE';CORAL='#EE5A4C';CH='#2A2A2A';MU='#6B6259';GR='#C9A45C';GT='#9C7428'
W,H=1080,1350;M=90
logo=Image.open('/workspace/lumiere-veritas/public/brand/logo.png').convert('RGBA')
def wrap(d,t,f,mw):
    out=[];cur=''
    for w in t.split():
        s=(cur+' '+w).strip()
        if d.textlength(s,font=f)<=mw: cur=s
        else: out.append(cur);cur=w
    out.append(cur);return out
def para(d,x,y,t,f,fill,mw,lh=1.25):
    for l in wrap(d,t,f,mw):
        d.text((x,y),l,font=f,fill=fill);y+=int(f.size*lh)
    return y
N=9
def base(n,kicker,title):
    im=Image.new('RGB',(W,H),CREAM);d=ImageDraw.Draw(im)
    d.rectangle([0,0,W,14],fill=CORAL)
    f=F('b',26,700);d.text((M,70),kicker,font=f,fill=GT)
    t=F('b',26,600);s=f'{n}/{N}';d.text((W-M-d.textlength(s,font=t),70),s,font=t,fill=MU)
    y=120
    if title:
        y=para(d,M,y,title,F('h',80,700),CH,W-2*M,1.08)+10
        d.rectangle([M,y,M+120,y+4],fill=GR);y+=44
    # footer
    lh=90;lg=logo.resize((int(logo.width*lh/logo.height),lh),Image.LANCZOS)
    im.paste(lg,(M,H-M-lh+10),lg)
    sf=F('b',20,500)
    d.line([M,H-M-lh-20,W-M,H-M-lh-20],fill=GR,width=2)
    for i,s in enumerate(['Source: NMC Guidelines on Ethical Advertising','For awareness, not legal advice']):
        d.text((W-M-d.textlength(s,font=sf),H-M-lh+18+i*32),s,font=sf,fill=MU)
    return im,d,y
def badge(d,x,y,txt,fill=CORAL,r=30):
    d.ellipse([x,y,x+2*r,y+2*r],fill=fill);f=F('b',30,800) if txt.isdigit() else ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',32)
    d.text((x+r,y+r),txt,font=f,fill='white',anchor='mm')
def rows(d,y,items,mark,fill=CORAL,hs=46,bs=34,gap=44):
    for h,b in items:
        badge(d,M,y,mark(items.index((h,b))),fill)
        yy=para(d,M+90,y+4,h,F('b',hs,700),CH,W-2*M-90,1.2)
        if b: yy=para(d,M+90,yy+4,b,F('b',bs,400),MU,W-2*M-90,1.3)
        y=yy+gap
    return y
out=[]
def save(im):
    p=f'/workspace/lumiere-veritas/instagram/13-nmc-doctors-{len(out)+1:02d}.jpg';im.save(p,quality=93);out.append(p)
# 1 cover
im,d,y=base(1,'FOR DOCTORS · NMC UPDATE','')
y=230;y=para(d,M,y,'Doctors:',F('h',110,700),CORAL,W-2*M,1.0)
y=para(d,M,y,'new NMC advertising rules.',F('h',110,700),CH,W-2*M,1.0)+30
d.rectangle([M,y,M+140,y+5],fill=GR);y+=50
y=para(d,M,y,'Are your posts compliant?',F('h',72,600),GT,W-2*M,1.1)+30
y=para(d,M,y,'NMC Guidelines on Ethical Advertising, effective 6 Oct 2026',F('b',32,500),MU,W-2*M)
d.rounded_rectangle([W-M-260,H-380,W-M,H-300],radius=40,fill=CORAL)
d.text((W-M-130,H-340),'Swipe  →',font=F('b',34,700),fill='white',anchor='mm');save(im)
# 2
im,d,y=base(2,'THE BIG IDEA','Educate the public, never solicit')
def card(y,head,col,mark,items,h):
    d.rounded_rectangle([M,y,W-M,y+h],radius=24,fill=IVORY,outline=GR,width=2)
    d.rounded_rectangle([M,y,W-M,y+70],radius=24,fill=col);d.rectangle([M,y+40,W-M,y+70],fill=col)
    d.text((M+30,y+35),mark,font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',32),fill='white',anchor='lm');d.text((M+80,y+35),head,font=F('b',34,800),fill='white',anchor='lm');yy=y+95
    for it in items:
        d.text((M+30,yy),'•',font=F('b',30,700),fill=col)
        yy=para(d,M+60,yy,it,F('b',35,500),CH,W-2*M-90,1.25)+12
    return y+h+30
y=card(y,'EDUCATE · Allowed',CH,'✓',['Talks and lectures on disease and public health','Case studies in reputed medical journals','Factual announcements (new address, new practice)'],400)
card(y,'SOLICIT · Prohibited',CORAL,'×',['Testimonials, influencers, celebrities','"Best doctor", "100% success", guarantees','Your photo or paid rankings to attract patients'],340);save(im)
# 3
im,d,y=base(3,'PROHIBITED','Six things you can no longer do')
rows(d,y,[('Testimonials & endorsements','By patients, celebrities, influencers or staff'),('Superlatives & guarantees','"Best doctor", "No.1", success rates, "guaranteed cure"'),('Your photograph','Not allowed for self-promotion or solicitation'),('Paid rankings & fake reviews','On any healthcare platform'),('Endorsing products','Drugs, devices, health or commercial products in ads'),('AI-made promotions','Misleading AI content counts as advertising')],lambda i:'×',hs=40,bs=31,gap=26);save(im)
# 4
im,d,y=base(4,'PERMITTED','What you may still do')
rows(d,y,[('Publish research','Case studies in reputed medical journals'),('Teach the public','Lectures and talks on public health and diseases'),('Announce practice changes','Starting, changing type or address, temporary absence, resuming, succeeding a practice'),('List factual details','Hospital doctor directory: name, qualification, specialty, registration, availability')],lambda i:'✓',fill=CH);save(im)
# 5
im,d,y=base(5,'PRACTICAL','Anatomy of a compliant post')
rows(d,y,[('Name & qualifications','Visible on every electronic post'),('Registration status & number','State or National Medical Register'),('Educational content only','No claims, offers or guarantees'),('Patients not identifiable','Crop, blur or black out where disclosure is legal')],lambda i:str(i+1));save(im)
# 6
im,d,y=base(6,'HOSPITAL DOCTORS','If you work in a hospital')
y=card(y,'Hospital may show',CH,'✓',['Name, contacts, departments','Diagnostic and emergency services','Accreditation status, facilities, fees','Doctor directory: name, qualification, specialty, registration, availability'],440)
card(y,'Hospital must not',CORAL,'×',['Your photo on letterhead or signboard','Paid ranking of doctors on platforms','Promotional posts without doctor details','Claims, testimonials or "best" labels'],400);save(im)
# 7
im,d,y=base(7,'ACCOUNTABILITY','You answer for what others post')
for i,(a,b,c) in enumerate([('You','Doctor or hospital',CORAL),('Agency / influencer','Any intermediary',IVORY),('Public post','Same rules apply',IVORY)]):
    d.rounded_rectangle([M,y,W-M,y+130],radius=24,fill=c,outline=GR,width=2)
    tc='white' if c==CORAL else CH
    d.text((M+40,y+30),a,font=F('h',52,700),fill=tc);d.text((M+40,y+88),b,font=F('b',26,500),fill='white' if c==CORAL else MU)
    y+=130
    if i<2: d.text((W//2,y+30),'↓',font=F('b',44,700),fill=GT,anchor='mm');y+=60
y+=40;d.rounded_rectangle([M,y,W-M,y+200],radius=24,fill=CH)
d.text((M+40,y+30),'Penalty:',font=F('h',52,700),fill=CORAL)
para(d,M+40,y+95,'suspension or removal from the medical register.',F('h',42,600),'white',W-2*M-80,1.1);save(im)
# 8
im,d,y=base(8,'TAKEAWAY','Before you post, ask four questions')
y=rows(d,y,[(q,'') for q in ['Is the purpose to educate, not to attract patients?','Is it free of testimonials, superlatives and guarantees?','Is my name, qualification and registration number shown?','Is every patient unidentifiable, and every product claim absent?']],lambda i:str(i+1),hs=42,gap=40)
d.text((M,y+10),'Any “no” means: do not publish.',font=F('h',56,700),fill=CORAL);save(im)
# 9
im,d,y=base(9,'LUMIERE VERITAS','')
y=250;y=para(d,M,y,'Need compliant medical marketing?',F('h',96,700),CH,W-2*M,1.05)+20
y=para(d,M,y,'We can help.',F('h',96,700),CORAL,W-2*M)+20
d.rectangle([M,y,M+140,y+5],fill=GR);y+=50
y=para(d,M,y,'Communicate ethically. Be seen professionally.',F('b',32,500),MU,W-2*M)+40
d.rounded_rectangle([M,y,W-M,y+250],radius=28,fill=CORAL)
d.text((M+40,y+35),'WHATSAPP',font=F('b',24,800),fill='white');d.text((M+40,y+65),'+91 98920 27604',font=F('b',44,700),fill='white')
d.text((M+40,y+140),'WEBSITE',font=F('b',24,800),fill='white');d.text((M+40,y+170),'lumiereveritasmedia.com',font=F('b',44,700),fill='white');save(im)
import shutil
for p in out: shutil.copy(p,'/workspace/share/')
print(out)
