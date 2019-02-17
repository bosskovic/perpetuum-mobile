---
slug:         "put-internet-paketa"
title:        "Pravo na privatnost je neotuđivo pravo - put internet paketa"
excerpt:      ""
description:  "Malo suvoparan i tehnički orijentisan tekst koji sam izdvojio iz članka 'Pravo na privatnost je neotuđivo pravo'
               i u kojem se pojašnjavaju čvorovi na putu koji paket pređe od ishodišta do odredišta i nazad, kao i načini
               na koje mogu biti ugroženi."
image:        "/etc/privatnost-kao-neotudjivo-pravo/img/guy.jpg"
animation:
  url: /assets/img/animated/cctv.gif
  width: 220
  height: 222

---

( -->  <a title="Pravo na privatnost je neotuđivo pravo" href="/etc/privatnost-kao-neotudjivo-pravo/">Pravo na privatnost je neotuđivo pravo</a> )

## Put internet paketa

Računarske mreže pružaju različite vidove komunikacije, među njima: elektronsku poštu, instant poruke i surfovanje na 
internetu i korišćenje web aplikacija. Ta komunikacija nije direktna (kao na primer kada dva sagovornika razgovaraju uživo)
već ima niz posrednika. Poruka od ishodišta do odredišta mora da prođe više čvorova, i svaki od njih potencijalno može 
biti kompromitovan:

čovek -> uređaj -> os -> app -> protocol -> router -> ISP -> ... -> server -> app(s)  

Primer nekoliko čestih scenaria:

- smart phone -> android -> facebook app -> click na link -> https -> ... -> facebook server -> ... ... -> facebook app
- pc -> windows -> ms outlook -> provera email-a -> pop3 -> ... -> mail server -> ... ... -> ms outlook

Pojašnjenje pojedinih "čvorova":

- **čovek** - nekad je najlakše doći do poverljivih ili osetljivih informacija lažno se predstavljajući (kao osoba/institucija 
od autoriteta ili kao neko za koga žrtva misli da ima pravo na pristup informacijama); taj metod psihološke manipulacije
se zove <a class="external" href="https://en.wikipedia.org/wiki/Social_engineering_(security)">social engineering</a>. 
Alternativni pristup je ponuditi korisniku platformu i motiv da sam učini dostupnim informacije o sebi, na primer putem
društvenih mreža.

- **uređaji** mogu biti računari, tableti, pametni telefoni... Uređaji ili neke njihove komponente mogu imati fabrički 
ugrađen <a class="external" href="https://en.wikipedia.org/wiki/Hardware_backdoor">hardware backdoor</a>, tj. kompujterski
kod koji se nalazi unutar čipova i tipično je izvan pristupa korisniku uključujući antivirusne programe. Taj kod se 
izvršava nezavisno od korisnika, može da ima pristup sadržaju računara, drugim komponentama kao što su kamera i mikrofon,
i mogu prikupljene podatke da šalju preko mreže.

- **operativni sistem** je skup programa i rutina odgovornih za kontrolu i upravljanje uređajima i računarskim komponentama.
Neki od najpoznatijih operativnih sistema su Windows, MacOs, FreeBSD i razne distribucije Linux-a (Ubuntu, Debian, Fedora...)
i svi imaju brojne verzije. Na mobilnim telefonima su najčešći Android i iOS. 
Operativni sistemi imaju različit pristup
bezbednosti, i potencijalne manjkavosti u implementaciji ili neotklonjene greške mogu da omoguće neovlašćen pristup 
računaru i njegovim resursima. Pored toga, moguće je da nepažnjom korisnika na računaru budu instalirani zloćudni programi
(spyware, malware) koji rade u pozadini bez znanja korisnika i mogu trećim licima dati pristup računaru i njegovom sadržaju.
Neki operativni sistemi su podložniji i pogodniji za širenje ovakvih zloćudnih programa. Prednost open source operativnih
sistema je što je pristup njihovom kodu dostupan svima, pa je stoga u njemu teško namerno sakriti neke zloćudne delove,
problemi u bezbednosti se brže uočavaju i brže rešavaju i otklanjaju.  

- **aplikacija** tj. program koji se koristi za komunikaciju je najčešće web browser, email client ili instant messenger.
Glavni "posao" te aplikacije je da preko mreže putem odgovarajućeg protokola pošalje zahtev (poruku). Kao i sve aplikacije,
i ove mogu sadržati namerne ili nenamerne propuste koji se mogu zloupotrebiti da bi se dobio neovlašćen pristup (na primer
kompletnoj istoriji posećenih stranica). Kao i kod operativnih sistema, po pravilu su open source aplikacije sa širokom 
bazom najbezbednije.

- **protokol** je sistem pravila koji omogućava komunikaciju ili slanje informacija između uređaja. Za različite namene
(www, elektronska pošta, deljenje fajlova...) koriste se različiti protokoli, a ono što je za svrhu ovog teksta bitno 
jeste da nisu svi protokoli jednako bezbedni. Na primer Hypertext Transfer Protocol (HTTP) koji je bio široko korišćen
na www-u (tj. "u web browserima") a i danas je pristuan, šalje podatke u čitljivom obliku. To znači da je sadržaj poruke
koja je presretnuta na bilo kojoj tački između ishodišta i odredišta potpuno čitljiv i dostupan. Unapređenje ovog protokola
došlo je u obliku HTTPS protokola, koji sve zahteve (poruke) šalje enkriptovane, pa čak i ako se presretnu, one su 
neupotrebljive svima osim onog kome su namenjene. 

- **put od klijenta do servera** - poruka od korisnika do servera putuje preko mrežne kartice i lokalnog rutera (koji mogu 
biti kompromitovani na prethodno objašnjen način), čvorišta internet provajdera, više raznih (lokalnih ili regionalnih) među-čvorišta, pa sve do lokalne mreže
na kojoj se nalazi server (računar čije usluge korisnik traži). Poslata poruka može biti presretnuta na svakoj navedenoj
međustanici, a najugroženije su wi-fi mreže sa otvorenim pristupom. Slanje enkriptovanih poruka (na primer putem HTTPS 
protokola) daje sigurnost da je poruka čitljiva samo na odredištu, ali kod kompromitovanih mreža je problem to što su
podložne takozvanom <a class="external" href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">Man-in-the-middle 
attack-u</a>. Ukratko i uprošćeno, u pitanju je situacija kada se između ishodišta i odredišta umetne čvor koji se
ishodištu predstavlja kao odredište a odredištu kao ishodištu i zapravo funkcioniše kao pasivni ili aktivni posrednik, tj.
ili samo prosleđuje i beleži svu komunikaciju ili manipuliše (menja) poruke koje prenosi.

- **server** je računar na kom se nalazi aplikacija koja treba da obradi zahtev koji joj je poslat i da pripremi i pošalje
odgovor. Ovi računari pate od sličnih pretnji kao i korisnički računari: njima ima pristup administrativno osoblje koje 
može biti izmanipulisano da taj pristup daju nekome kome ne bi trebalo, korišćeni hardware može da ima ugrađene 
backdoor-ove, operativni sistem može da bude nebezbedan ili neažuriran.

- **serverska aplikacije** su programi koji se izvršavaju. Na primer, kada na server stigne korisnikov zahtev za pojedinu 
facebook stranicu, njega primi webserver koji ga prosledi php pretprocesoru koji ga interpretira, komunicira sa lokalnom
ili udaljenom bazom podataka, sastavlja odgovor i šalje ga nazad korisniku. Unutar odgovora može da se nalazi kod koji 
će se izvršiti unutar aplikacije na korisnikovom računaru. Svaki od ovih među-koraka može predstavljati slabu tačku u 
pogledu bezbednosti i dešavalo se na primer da procure sadržaji kompletnih baza, nezavisno od komunikacije na relaciji
korisnik-server.

( --> zanimljiv članak: <a class="external" href="https://labs.rs/sr/nevidljiva-infrastruktura-uzbudljiv-zivot-internet-paketa/">Nevidljiva infrastruktura: Uzbudljiv život internet paketa</a>)

Sve ovo zvuči kao mnogo paranoje ili zapleta iz krimi filmova. Evo zato jedan scenario sa razumno bezbednim 
okolnostima:

- vešt i svestan korisnik kojeg nije lako prevariti da sam ustupi osetljive podatke
- računar sa uređajima bez ugrađenih backdoor-ova
- bezbedan operativni sistem bez malware/spyware programa
- bezbedan i ažuran web browser
- enkriptovan protokol (https)
- enkriptovana mreža (znači nešto što nije open wi-fi)
- nekompromitovan internet provajder i svi među čvorovi
- odredišni server koji nije kompromitovan od strane trećih lica 

Ako unutar takvog konteksta otvorim web browser i prijavim se na facebook, facebook će naravno biti svestan komunikacije
koju sam inicirao; takođe, u svom odgovoru poslaće HTTP cookie, mali fajl koji će biti pohranjen na mom računaru. Ako dalje
posetim bilo koji sajt koji u sebi ima ugrađene facebook dugmiće, komentare i slično, unutar mog
browsera će se izvršiti kod koji će proveriti pomenuti cookie, prepoznati me kao facebook korisnika i kontaktirati 
facebook. Time će facebook biti obavešten o mom kretanju na delovima interneta koji imaju ugrađene facebook skriptove
(prema jednom <a class="external" href="https://labs.rs/sr/nevidljiva-infrastruktura-onlajn-pratioci/">istraživanju</a> 
iz juna 2015, od 50 najposećenijih sajtova u Srbiji, 46% je imalo u sebi ugrađene neke od Facebook-ovih cookie-a).

<p class="muted">Facebook je ovde dat samo kao primer i nije najgori. To mesto verovatno pripada Google-u sa njihovim pretraživačem, 
gmail-om, gmaps-o, android-om, youtube-om, google docs-om, drive-om, hangout-om, analytics-om adsens-om... Oni se ne ustručavaju,
a ni ne kriju (ko je čitao sitna slova pri kreiranju naloga) da o svojim korisnicima prikupljaju i čuvaju ogromne količine
podataka. To šta google zna o svakome od nas je - jezivo...</p>  

Ovo gore je jedan vrlo nesofisticiran primer, jedan od najprimitivnijih načina praćenja gde ja kao korisnik sam sebe 
identifikujem facebook-u i omogućim im da me prate. Napredniji način je prepoznavanje korisnika na osnovu meta podataka
koje šalje uz svaki zahtev.

***

### Izvori:

- <a class="external" href="https://en.wikipedia.org/wiki/Social_engineering_(security)">wikipedia: Social engineering</a>
- <a class="external" href="https://en.wikipedia.org/wiki/Hardware_backdoor">wikipedia: Hardware backdoor</a>
- <a class="external" href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">wikipedia: Man-in-the-middle attack</a>
- <a class="external" href="https://labs.rs/sr/istorija-pretrage-interneta/">lab.rs: Istorija pretrage interneta</a>


### Za dalje čitanje:
- <a class="external" href="https://labs.rs/sr/nevidljiva-infrastruktura-uzbudljiv-zivot-internet-paketa/">lab.rs: Nevidljiva infrastruktura: Uzbudljiv život internet paketa</a>
