---
slug:         "hranilica-za-ptice"
title:        "Hranilica za ptice"
excerpt:      "sa imporvizovanim videomonitoringom"
description:  "Štap, kanap, snop pruća, vredne ruke, pokidani USB kabel, kamera iz rashodovanog laptopa i voila: ptice iz komšiluka
               su dobile Velikog Brata."
image: "/etc/hranilica-za-ptice/img/senica.jpg"
videos: ["7vOyCt6Lj-M"]
tags:
  - videomonitoring
  - sam-svoj-majstor  
---

{% include component/youtube/img_full.html id="7vOyCt6Lj-M" %}

{% include component/img/vertical.html file_name="hranilica.jpg" %}
Komšijsko dvorište ispod terase je lepa zelena površina od nekoliko ari, u hladu velikog oraha i još većeg platana. 
Oivičeno je smrčama i ukrasnim žbunovima, prava mala oaza zelenila u sred urbanog betonskog pejsaža, i naravno, puna je ptica.

Da bi se malo zabavili a i pticama olakšali traženje hrane tokom zime, napravili smo im hranilicu i postavili je na terasi.

Okvir i bočni zidovi su od pruća, pod i zadnji zid od reslova lesonita a krov od oguljene kore drveta. Unutra je 
rasečena plastična flaša 0.33, fiksirana pod uglom, tako da se nivo semenki u "kadici" ispod sam dopunjuje.

{% include component/img/horizontal.html file_name="dozer.jpg" %}
Hranilica je već drugog dana nakon postavljana "otkrivena". Prve su počele da je obilaze velike senice, u početku vrlo
oprezno, uletele bi velikom brzinom, zgrabile semenku i jednako brzo pobegle na obližnji orah gde bi je onda na miru 
izgrickale. Ali nije prošlo ni dva dana i već su se odomaćile, šepurile bi se na ogradi, polako birale šta će uzeti i
ponekad tu ljuštile i jele.

Vrapci povremeno proleću, u par navrata su rasterivali senice koje su sitnije od njih, ali nisu još ukapirali da tu ima
nešto za jelo. Jednom je doletela i velika svraka, obeležila teritoriju na terasi i otišla. Već nekoliko dana jedan 
crvendać dolazi u izvidnicu, vrlo je nervozan i oprezan, zagleda iz daljine ali se još ni jednom nije poslužio.

{% include component/img/horizontal.html file_name="senica.jpg" %}
Sve je to vrlo veselo i zabavno, a unutar mog vidokruga sa radnog stola. Pokušao sam u više navrata da ih fotografišem 
ili snimim, ali sve se veoma brzo dešava, često bez najave. Pa umesto da gubim vreme vrebajući ih, a da ih pri tome još i 
uznemiravam, rešio sam da napravim improvizovani sistem za videomonitoring.

### Improvizovani sistem za videomonitoring 

Kupio sam preko interneta kameru od rashodovanog laptopa po ceni od dva bureka i od drugara sam dobio USB kabel koji je
ker izgrizao. Falio mi je još samo produžni USB kabel od 5 metara (oko 400 dinara).

{% include component/img/horizontal.html file_name="kamera.jpg" %}
Posle malo muke oko guljenja izolacije sa tananih parica koje idu sa kamere, oslobodio sam i pripremio svih 5: 2 za 
podatke, 2 za napajanje i 1 za uzemljenje. Rasekao sam USB kabel i očistio 4 parice: po 2 za podatke i napajanje i 
uzemljenje. Imao sam sreće pa sam za ovu konkretnu kameru našao shemu na internetu, inače bih morao malo da isprobavam.
Pored objektiva kamerice se nalazi narandžasti LED indikator koji sam morao nekako da eliminišem da ne bi zbunjivao ptice.
Umesto da tražim neko elegantnije rešenje, samo sam ga pokrio izolir trakom.

Razvukao sam produžni kabel i povezao na komp. U početku sam koristio VLC za snimanje:

{% include component/img/full.html file_name="vlc.jpg" %}

<ol>
<li>Media\Open Capture Device</li>
<li>Izbor kamere (pošto sam povezao na laptop koji već ima kameru, moram ručno da odaberem drugu kameru)</li>
<li>Save</li>
<li>Izbor formata, kompresije, rezolucije, itd...</li>
<li>Putanja</li>
<li>Start</li>
</ol>

Ali pošto sam suviše lenj da bih svaki čas ručno startovao kameru i posle obrađivao i premotavao dugačke snimke tražeći
segmente od par sekundi dok se ptice hrane, instalirao sam program koji snima samo kada detektuje kretanje. Ovo je 
uputstvo za ubuntu, ali ako se ne varam postoji verzija i za windows:

    sudo apt-get install motion
    cd ~
    mkdir .motion
    # pravi se kopija konfiguracionog fajla
    sudo cp /etc/motion/motion.conf ~/.motion/motion.conf  
    
    sudo nano ~/.motion/motion.conf
    
Podešavanje je relativno jednostavno, ima mnogo opcija i najčešće će podrazumevane biti sasvim ok. Ja sam izmenio samo ove:

    # ipak ne želim da mi se snimanje automatski uključuje svaki put kada se sistem podigne, 
    # jer spoljna kamera nije uvek povezana:
    deamon off
    videodevice /dev/video1
    # nisam rotirao, ali ovo može biti zgodno ako se kamera postavi naopako ili pod uglom:
    rotate 0
    width 1280
    height 1024
    framerate 25
    # smanjio sam prag (potreban minimum izmenjenih piksela), za svaki slučaj:
    threshold 500
    pre_capture 5
    post_capture 50
    # želim samo video, ne i slike:
    output_pictures off
    ffmpeg_video_codec mp4
    ffmpeg_duplicate_frames false
    target_dir /media/m/markohdd/Videos/hranilica/
    
Ovaj program je pogodan i za neka ozbiljnija gnezda i praćenje sa više kamera...

***

### Dopuna, maj 2019.

Počev od februara kada sam postavio hranilicu, jedan par senica ju je redovno posećivao, uglavnom 4-5 puta dnevno. Vrapci
i crvendaći su sletali u blizini, ali nisu uzimali zrnevlje iz hranilice. A onda je krajem aprila i u maju nastupio 
hladniji, kišni period koji je trajao nekoliko nedelja. To je donelo velike neprilike pticama, jer su im mladunci postali
već dovoljno veliki da mogu da lete (i mnogo jedu) ali su i dalje zavisni od roditelja, a zbog lošeg vremena, bilo im je 
otežano da hvataju insekte i nalaze druge izvore hrane.

Tako je moja hranilica postala stecište okolnih ptica. Prvo su redovni posetioci postali par senica i njihova dva loptasta
mladunca. Sletali bi zajedno u hranilicu, na ogradu ili na krov hranilice, dve, tri, nekad i četiri ptice u isto vreme.
Zabavno je bilo posmatrati mladunce kako galame, pijuču, trepere krilima i dosađuju odraslim pticama dok ove ne bi oljuštile
zrno suncokreta i ubacile kroz mali kljun u rupu bez dna.

Zatim su počeli da dolaze i vrapci. Prvo odrasli, vrlo stidljivo, izbegavali su hranilicu, već su sa poda terase skupljali 
zrnevlje koje su senice rasipale iz hranilice. Ali kako su ružno vreme (a pretpostavljam i nestašica hrane) potrajali,
i vrapci su se osmelili, dolazilo je po nekoliko odraslih ptica i najmanje 3-4 mladunca, gurali se na podu, ulazili i trpali
se istovremeno u hranilicu. Ponašanje malih vrabaca je veoma slično malim senicama, način kako trepere krilima, zijaju, 
skakuću za odraslom pticom i pijuču (mada zov je skroz drugačiji) dok ne dobiju hranu.

Počeli su i sukobi. Senice, iako malobrojnije, krupnije su bar 20% od vrabaca, i ovi ih respektuju i izbegavaju. Bilo je
zanimljivo pratiti dinamiku između odraslih i juvenilnih ptica dve vrste koja je postajala sve učestalija kako je rasla
njihova zavisnost od ovog izvora hrane. Tokom dana, gotovo u svakom trenutku je bar jedna ptica bila na terasi, a u nekim
trenucima ih je bilo i 10-12.

Takođe sam uživao i da posmatram letačku veštinu ovih malih ptica, kako skaču sa 2-3 zamaha krila sa oraha ili jele u 
dvorištu naizgled direktno prema meni, i u mestu se zaustave na ogradi. Ili kada krene interspicijska "borba", njihovo 
poletanje u stranu, sinhrono letenje, vazdušne borbe. Neretko bi se čuo i tup udarac kada bi neka od ptica lupnula u vrata od terasa.

Oštar kontrast toj letačkoj veštini bila je trapavost mladih ptica, još loptastih i paperjastih, koje često nisu uspevale
ni mirno da stoje na ogradi bez stalne pomoći i korekcije krilima. Njihovo "doskakivanje" sa oraha na terasu nije delovalo
ni blizu tako sigurno i samouvereno.

***

Za dva sata posla oko pravljenja kućice, čija je osnovna ideja bila da malo zabavim Vuka i oko kilogram suncokreta, za
uzvrat sam dobio priliku da svakodnevno izbliza pratim neke interesantne momente, inače skrivene i nevidljive negde u 
krošnjama, a i verovatno sam dosta doprineo da se spasi ovogodišnje leglo jednog para senica i nekoliko parova vrabaca...