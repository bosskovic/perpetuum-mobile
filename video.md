---
layout: videos
image: /assets/img/todorov_do.jpg
title: perpetuum mobile
excerpt:     "stalno u pokretu"
animation:
  url: /assets/img/animated/kamera.gif
  width: 250
  height: 199
videos:
  -
    youtube: 5JgSp68aV-o
    title: Klizanje
    date: januar 2019.
    description: ""
  -
    youtube: W6Uzn9GindU
    title: Divčibare
    date: januar 2019.
    description: ""
  -
    youtube: J-quwba8AVI
    title: Venac
    date: 10. novembar 2018.
    description: ""
  -
    youtube: VPn1wTd8Pw8
    title: Gospodar vatre
    date: 6. novembar 2018.
    description: "Vuk je dobio na poklon kresivo i kremen, pa smo morali da ga isprobamo prvom prilikom koju smo imali."
  -
    youtube: 7DBE14k0gH8
    title: Stražilovo
    date: 2018-10-28
    description: Fruška gora
  -
    youtube: V6aU4srzZ_c
    title: Tancoš
    date: 2018-10-27
    description: Fruška gora
  -
    youtube: bktS_UWTLVo
    title: Mauntinbajkovita Beljanica
    date: 2018-10-20
    description: vožnja
  -
    youtube: AewTNo2VeNc
    title: Popovica i Letenka
    date: 2018-10-13
    description: Fruška gora
  -
    youtube: NYnPFKzzrIk
    title: Vampiri i vodenice povlenske podgorine
    date: 2018-10-06
    description: vožnja
  -
    youtube: E3n6ZNcE88w
    title: U srcu stare imperije
    date: 2018-09-28
    desctiption: Beč sa klincima
  -
    youtube: QyR9HzwTrOE
    title: Dumbovo, Kobila, Beli majdan (jesen)
    date: 2018-09-23
    description: Fruška gora
  -
    youtube: 02KVCGkdZ8s
    title: Krug oko Orlovca
    date: 2018-09-15
    description: Fruška gora
  -
    youtube: j7LKcn-Zt6s
    title: Ammouliani 2018.
    date: 2018-07-16
    description: Letovanje
  -
    youtube: hv1JKmzCqvI
    title: Palić 2018
    date: 2018-07-17
    description: Izlet do Palića
  -
    youtube: jKtUmUfRgzM
    title: Ispod Petrovaradinske tvrđave
    date: 2018-06-09
    description: Kroz podzemlje tvrđave
  -
    youtube: 0wa1u-Onipw
    title: Šetnja do izvora reke Gradac
    date: 2018-05-05
    description: Šetnja do izvora reke Gradac
  -
    youtube: PJ3nDAyKDrQ
    title: Rođendanska 2018
    date: 2018-05-03
    description: Rođendanska 2018
  -
    youtube: 4U7kGR8nttU
    title: Dumbovo, Kobila, Beli majdan (proleće)
    date: 2018-04-21
    description: ""
  -
    youtube: rFKa709lO5M
    title: Tradicionalna vožnja do Begečke jame (2018)
    date: 2018-04-15
    description: Tradicionalna vožnja do Begečke jame (2018)
  -
    youtube: 67QYRiGR2KE
    title: Laza, Murga i Babaroga
    date: 2018-04-08
    description: Laza, Murga i Babaroga
  -
    youtube: ky3BoqEp3A0
    title: Noćna šetnja za prvo veče proleća
    date: 2018-03-20
    description: Orlovo bojište
  -
    youtube: casy0CIi0Ic
    title: Zimske majstorije
    date: 2018-03-03
    description: FG, Brankovac
  -
    youtube: ZUCw8MEK5u0
    title: Snežni Medvednik
    date: 2018-02-24
    description: Medvednik
  -
    youtube: mEsfFW0-MNE
    title: Bratsko mini-zimovanje
    date: 2018-02-10
    description: ""
  -
    youtube: BZF88saWp98
    title: Sunca sin
    date: 2017-10-01
    description: On samo trči, trči, trči...
  -
    youtube: pdBeAVaQ-ug
    title: Vuk gorski i morski 2017
    date: 2017-10-01
    description: Jesenovanje
  -
    youtube: CV1TkqEIUUA
    title: Boka, avgust 2016.
    date: 2016-08-06
    description: ""
  -
    youtube: _6R3_oEIABw
    title: Vuk gorski i morski 2015
    date: 2015-08-01
    description: ""

---

{% for video in page.videos %}
  {% include layout/video_cell.html video=video %}
{% endfor %}

