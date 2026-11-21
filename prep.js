// yan cümleden önce bilinmesi gerekenler (fiil çekimi, kelime sırası, zamanlar, cümle birleştirme)
// data.js ve explain.js'ten sonra yüklenmeli

const PREP = [
{
  id: 'fiil', topic: 'g1', prep: true, group: 'Hazırlık · Sıfırdan', title: 'Das Verb im Präsens', sub: 'Fiil nedir, nasıl çekimlenir? Şimdiki zaman',
  blocks: [
    {p: 'Yan cümlelerin bütün kuralı “çekimli fiil sona gider” cümlesine dayanıyor. Ama önce <b>çekimli fiilin ne olduğunu</b> bilmek gerekiyor. Bu ders tam olarak bunu anlatıyor. Biliyorsan alıştırmaları hızlıca çöz ve geç.'},
    {h: 'Mastar ve çekimli fiil'},
    {p: 'Sözlükte fiiller <b>mastar</b> (Infinitiv) hâlinde yazar ve neredeyse hepsi <b>-en</b> ile biter: <i lang="de">machen</i> (yapmak), <i lang="de">wohnen</i> (oturmak), <i lang="de">lernen</i> (öğrenmek). Sondaki -en’i atınca <b>kök</b> kalır: <i lang="de">mach-, wohn-, lern-</i>. Köke kişiye göre ek getirince fiil <b>çekimlenmiş</b> olur. Türkçedeki “yap-ıyor-um, yap-ıyor-sun” mantığının aynısı.'},
    {table: {head: ['Kişi', 'Ek', 'machen (yapmak)', 'arbeiten (çalışmak)', 'Türkçe'], rows: [
      ['ich (ben)', '-e', 'ich mach{e}', 'ich arbeit{e}', 'yapıyorum'],
      ['du (sen)', '-st', 'du mach{st}', 'du arbeit{est}', 'yapıyorsun'],
      ['er / sie / es (o)', '-t', 'er mach{t}', 'er arbeit{et}', 'yapıyor'],
      ['wir (biz)', '-en', 'wir mach{en}', 'wir arbeit{en}', 'yapıyoruz'],
      ['ihr (siz)', '-t', 'ihr mach{t}', 'ihr arbeit{et}', 'yapıyorsunuz'],
      ['sie / Sie (onlar / siz-nazik)', '-en', 'sie mach{en}', 'sie arbeit{en}', 'yapıyorlar']
    ]}},
    {tip: 'Kökü <b>-t</b> veya <b>-d</b> ile biten fiillerde (arbeiten, finden) araya söyleyiş kolaylığı için <b>e</b> girer: du arbeit<b>e</b>st, er find<b>e</b>t.'},
    {h: 'Üç önemli düzensiz fiil: sein, haben, werden'},
    {p: 'Bunlar hem tek başına hem de başka zamanları kurmak için yardımcı fiil olarak kullanılır. Ezberlemen gerekir, çünkü sonraki bütün derslerde karşına çıkacaklar.'},
    {table: {head: ['', 'sein (olmak)', 'haben (sahip olmak)', 'werden (olmak, -leşmek)'], rows: [
      ['ich', 'bin', 'habe', 'werde'],
      ['du', 'bist', 'hast', 'wirst'],
      ['er / sie / es', 'ist', 'hat', 'wird'],
      ['wir', 'sind', 'haben', 'werden'],
      ['ihr', 'seid', 'habt', 'werdet'],
      ['sie / Sie', 'sind', 'haben', 'werden']
    ]}},
    {h: 'Kök ünlüsü değişen fiiller'},
    {p: 'Bazı fiillerde yalnızca <b>du</b> ve <b>er/sie/es</b> biçiminde kökteki ünlü değişir. Diğer kişiler normaldir. Alıştırmalarda bunlar sık çıkar.'},
    {table: {head: ['Değişim', 'Mastar', 'du', 'er / sie / es'], rows: [
      ['e → i', 'essen (yemek)', 'isst', 'isst'],
      ['e → i', 'sprechen (konuşmak)', 'sprichst', 'spricht'],
      ['e → i', 'geben (vermek)', 'gibst', 'gibt'],
      ['e → ie', 'lesen (okumak)', 'liest', 'liest'],
      ['e → ie', 'sehen (görmek)', 'siehst', 'sieht'],
      ['a → ä', 'fahren (gitmek, sürmek)', 'fährst', 'fährt'],
      ['a → ä', 'schlafen (uyumak)', 'schläfst', 'schläft'],
      ['a → ä', 'halten (tutmak)', 'hältst', 'hält'],
      ['a → ä', 'laden (yüklemek)', 'lädst', 'lädt']
    ]}},
    {h: 'Präsens ne zaman kullanılır?'},
    {p: 'Präsens (şimdiki zaman) Almancada üç iş görür: (1) şu an olan: <i lang="de">Ich lerne gerade.</i> (2) genel, her zaman olan: <i lang="de">Ich trinke morgens Tee.</i> (3) <b>gelecek</b>, yanında zaman ifadesi varsa: <i lang="de">Morgen fahre ich nach Izmir.</i> Yani “yarın gideceğim” için Almanca çoğu zaman Präsens yeter.'},
    {h: 'Ayrılabilen fiiller'},
    {p: '<i lang="de">anrufen</i> (aramak), <i lang="de">aufstehen</i> (kalkmak), <i lang="de">einkaufen</i> (alışveriş yapmak) gibi fiillerin başında bir ön ek vardır. Ana cümlede bu ön ek kopar ve <b>cümlenin en sonuna</b> gider. Yan cümlede ise ikisi tekrar <b>birleşir</b> ve birlikte sona gider.'},
    {ex: [
      ['Ich ^rufe^ dich morgen ^an^.', 'Seni yarın ararım. → Ana cümle: ön ek “an” sonda.'],
      ['Er ^steht^ um 7 Uhr ^auf^.', 'Saat 7’de kalkar.'],
      ['…, wenn er um 7 Uhr {aufsteht}.', '… saat 7’de kalktığında. → Yan cümle: birleşik ve sonda.']
    ]},
    {h: 'Modal fiiller'},
    {p: '<i lang="de">können</i> (-ebilmek), <i lang="de">müssen</i> (zorunda olmak), <i lang="de">wollen</i> (istemek), <i lang="de">sollen</i> (-meli), <i lang="de">dürfen</i> (izinli olmak), <i lang="de">möchten</i> (istemek, kibar). Modal fiil çekimlenir, asıl fiil <b>mastar hâlinde en sona</b> gider. Dikkat: modal fiillerde <b>ich ve er aynıdır</b> ve ek almaz: <i lang="de">ich kann, er kann, du kannst</i>.'},
    {ex: [
      ['Ich ^kann^ heute nicht {kommen}.', 'Bugün gelemem. → kann çekimli, kommen mastar ve sonda.'],
      ['Wir ^müssen^ viel {lernen}.', 'Çok çalışmak zorundayız.']
    ]},
    {h: 'Dönüşlü fiiller (sich)'},
    {p: '<i lang="de">sich fühlen</i> (kendini hissetmek), <i lang="de">sich freuen</i> (sevinmek) gibi fiillerde <i lang="de">sich</i> kişiye göre değişir: <i lang="de">ich fühle mich, du fühlst dich, er/sie fühlt sich, wir fühlen uns, ihr fühlt euch, sie fühlen sich</i>.'},
    {ask: {q: 'Er ___ jeden Tag Zeitung. (lesen)', o: ['lest', 'liest', 'lesen'], a: 'liest', why: 'lesen kök ünlüsü değişen fiillerden: du ve er/sie/es’te e → ie. er için ek -t: liest.'}},
    {drills: ['g1a', 'g1b']}
  ]
},
{
  id: 'satz', topic: 'g2', prep: true, group: 'Hazırlık · Sıfırdan', title: 'Der Hauptsatz', sub: 'Ana cümlede kelime sırası: fiil neden hep 2. sırada?',
  blocks: [
    {p: 'Yan cümlede fiilin neden sona “kaydığını” anlamak için önce normal bir ana cümlede nerede durduğunu bilmek gerekir. Kural tek cümle: <b>ana cümlede çekimli fiil her zaman 2. sıradadır.</b>'},
    {h: 'Sıra kelime değil, kelime grubudur'},
    {p: '“2. sıra” ikinci kelime demek değildir, ikinci <b>parça</b> demektir. <i lang="de">Meine kleine Schwester</i> (küçük kız kardeşim) üç kelime ama tek parçadır. <i lang="de">Am Samstagabend</i> (cumartesi akşamı) da tek parça.'},
    {table: {head: ['1. sıra', '2. sıra (fiil)', 'Gerisi'], rows: [
      ['Ich', '^lerne^', 'heute Deutsch.'],
      ['Meine kleine Schwester', '^lernt^', 'heute Deutsch.'],
      ['Heute', '^lerne^', 'ich Deutsch.'],
      ['Am Samstagabend', '^sah^', 'er die Sportschau.']
    ]}},
    {tip: 'Özne her zaman başta olmak zorunda değil. Başa zaman veya yer ifadesi gelirse <b>fiil yine 2. sırada kalır</b> ve özne fiilin <b>arkasına</b> geçer: <i lang="de">Heute lerne ich</i>. “Heute ich lerne” yanlıştır.'},
    {h: 'Fiil çerçevesi: ikinci parça sona'},
    {p: 'Cümlede iki fiil parçası varsa çekimli olan 2. sırada, diğeri <b>en sonda</b> durur. Arada kalan her şey bu çerçevenin içindedir. Bu yapı Perfekt’te, modal fiillerde ve ayrılabilen fiillerde karşına çıkar.'},
    {ex: [
      ['Ich ^habe^ gestern Pizza {gegessen}.', 'Dün pizza yedim. → Perfekt: habe 2. sırada, gegessen sonda.'],
      ['Ich ^kann^ heute nicht {kommen}.', 'Bugün gelemem. → Modal fiil.'],
      ['Ich ^rufe^ dich morgen {an}.', 'Seni yarın ararım. → Ayrılabilen fiil.']
    ]},
    {h: 'Soru cümleleri'},
    {p: 'Soru kelimeli (W-) sorularda fiil yine 2. sıradadır: <i lang="de">Wann kommst du?</i> Evet/hayır sorularında fiil <b>1. sıraya</b> gelir: <i lang="de">Kommst du morgen?</i> Alıştırmalarda soru cümlesini cevaba çevirirken soru kelimesini atıp özneyi başa alırsın: <i lang="de">Wann verschloss man die Tore? → Man verschloss die Tore …</i>'},
    {h: 'Üç tür bağlayıcı kelime'},
    {p: 'Bu tablo, sonraki derslerdeki birçok alıştırmanın anahtarı. Bağlayıcı kelimeler kelime sırasını üç farklı şekilde etkiler:'},
    {table: {head: ['Tür', 'Örnekler', 'Fiil nerede?', 'Örnek'], rows: [
      ['Sırayı değiştirmeyenler', 'und, aber, oder, denn', 'Normal: özne + fiil', '…, denn ich ^bin^ krank.'],
      ['1. sırayı dolduranlar', 'deshalb, dann, dagegen, trotzdem', 'Hemen arkasında: fiil + özne', '…, deshalb ^bleibe^ ich zu Hause.'],
      ['Yan cümle bağlaçları', 'weil, wenn, als, dass, nachdem …', 'En sonda', '…, [weil] ich krank {bin}.']
    ]}},
    {h: 'Zamirler: ismi tekrar etmemek için'},
    {p: 'Almancada isimlerin cinsiyeti var ve zamir buna göre seçilir: <i lang="de">der Mann → er, die Wohnung → sie, das Kind → es</i>, çoğul → <i lang="de">sie</i>. Yani bir daire (die Wohnung) için “o” derken <b>sie</b> kullanılır. Alıştırmalarda ismin ikinci kez geçtiği yerde zamir kullanılır.'},
    {p: 'Birinin sözünü aktarırken (ich → er/sie) iyelik ve dönüşlü zamirler de değişir:'},
    {table: {head: ['Kendi sözü (ich)', 'Erkek için (er)', 'Kadın için (sie)'], rows: [
      ['ich', 'er', 'sie'],
      ['mich (beni)', 'sich (kendini)', 'sich'],
      ['mir (bana)', 'ihm (ona)', 'ihr (ona)'],
      ['mein / meine (benim)', 'sein / seine (onun)', 'ihr / ihre (onun)']
    ]}},
    {ask: {q: 'Hangisi doğru?', o: ['Morgen ich fahre nach Izmir.', 'Morgen fahre ich nach Izmir.', 'Morgen nach Izmir fahre ich.'], a: 'Morgen fahre ich nach Izmir.', why: 'Morgen 1. sırayı doldurdu, çekimli fiil fahre 2. sırada kalmalı. Özne ich fiilin arkasına geçer.'}},
    {drills: ['g2a', 'g2b']}
  ]
},
{
  id: 'zeit', topic: 'g3', prep: true, group: 'Hazırlık · Sıfırdan', title: 'Die Zeitformen', sub: 'Präteritum, Perfekt, Plusquamperfekt, Futur: en baştan',
  blocks: [
    {p: 'Yan cümle alıştırmalarında en çok takılınan yer: <b>hangi zamanı kullanacağım?</b> Bu derste Almancanın zamanlarını sıfırdan, Türkçe karşılıklarıyla öğreneceksin. Sonunda bir cümlenin zamanını görünce tanıyabilecek ve istediğin zamanda kurabileceksin.'},
    {h: 'Bütün zamanlar tek tabloda'},
    {table: {head: ['Zaman', 'Nasıl kurulur?', 'Örnek', 'Türkçe'], rows: [
      ['Präsens', 'kök + ek', 'ich ^mache^', 'yapıyorum / yaparım'],
      ['Präteritum', 'kök + te + ek (düzenli)', 'ich ^machte^', 'yaptım / yapıyordum'],
      ['Perfekt', 'haben/sein + Partizip II', 'ich ^habe^ {gemacht}', 'yaptım'],
      ['Plusquamperfekt', 'hatte/war + Partizip II', 'ich ^hatte^ {gemacht}', 'yapmıştım'],
      ['Futur I', 'werden + mastar', 'ich ^werde^ {machen}', 'yapacağım'],
      ['Futur II', 'werden + Partizip II + haben/sein', 'ich ^werde^ {gemacht haben}', 'yapmış olacağım']
    ]}},
    {h: 'Präteritum: düzenli fiiller'},
    {p: 'Köke <b>-te</b> eklenir, ardından kişi eki gelir. Dikkat: <b>ich ve er/sie/es aynıdır</b>, ikisi de ek almaz.'},
    {table: {head: ['Kişi', 'machen', 'wohnen', 'arbeiten'], rows: [
      ['ich', 'mach{te}', 'wohn{te}', 'arbeit{ete}'],
      ['du', 'mach{test}', 'wohn{test}', 'arbeit{etest}'],
      ['er / sie / es', 'mach{te}', 'wohn{te}', 'arbeit{ete}'],
      ['wir', 'mach{ten}', 'wohn{ten}', 'arbeit{eten}'],
      ['ihr', 'mach{tet}', 'wohn{tet}', 'arbeit{etet}'],
      ['sie / Sie', 'mach{ten}', 'wohn{ten}', 'arbeit{eten}']
    ]}},
    {h: 'Präteritum ve Partizip II: düzensiz fiiller'},
    {p: 'Düzensiz fiillerde -te eklenmez, <b>kökteki ünlü değişir</b>. Bunları ezberlemek gerekir. Aşağıdakiler alıştırmalarda en sık geçenler. Üçüncü sütun (Partizip II) Perfekt ve Plusquamperfekt için lazım.'},
    {table: {head: ['Mastar', 'Präteritum (er)', 'Partizip II', 'Türkçe'], rows: [
      ['sein', 'war', 'ist gewesen', 'olmak'],
      ['haben', 'hatte', 'hat gehabt', 'sahip olmak'],
      ['werden', 'wurde', 'ist geworden', 'olmak, -leşmek'],
      ['kommen', 'kam', 'ist gekommen', 'gelmek'],
      ['gehen', 'ging', 'ist gegangen', 'gitmek'],
      ['fahren', 'fuhr', 'ist gefahren', 'gitmek (araçla)'],
      ['bleiben', 'blieb', 'ist geblieben', 'kalmak'],
      ['essen', 'aß', 'hat gegessen', 'yemek'],
      ['finden', 'fand', 'hat gefunden', 'bulmak'],
      ['beginnen', 'begann', 'hat begonnen', 'başlamak'],
      ['schlafen', 'schlief', 'hat geschlafen', 'uyumak'],
      ['lesen', 'las', 'hat gelesen', 'okumak'],
      ['schreiben', 'schrieb', 'hat geschrieben', 'yazmak'],
      ['lassen', 'ließ', 'hat gelassen', 'bırakmak'],
      ['verschließen', 'verschloss', 'hat verschlossen', 'kilitlemek'],
      ['kennen', 'kannte', 'hat gekannt', 'tanımak'],
      ['bringen', 'brachte', 'hat gebracht', 'getirmek'],
      ['können / müssen', 'konnte / musste', 'hat gekonnt / gemusst', '-ebilmek / zorunda olmak']
    ]}},
    {h: 'Perfekt: haben/sein + Partizip II'},
    {p: 'Perfekt iki parçadır: <b>haben</b> veya <b>sein</b> çekimlenip 2. sıraya gelir, <b>Partizip II</b> en sona gider: <i lang="de">Ich habe Pizza gegessen.</i> Partizip II şöyle yapılır:'},
    {table: {head: ['Kural', 'Mastar', 'Partizip II'], rows: [
      ['Düzenli: ge- + kök + -t', 'machen, wohnen', 'gemacht, gewohnt'],
      ['Düzensiz: ge- + (değişmiş) kök + -en', 'essen, finden, schreiben', 'gegessen, gefunden, geschrieben'],
      ['Ayrılabilen: ön ek + ge + kök', 'aufräumen, anrufen, einsteigen', 'aufgeräumt, angerufen, eingestiegen'],
      ['-ieren ile bitenler ge- almaz', 'studieren, emigrieren', 'studiert, emigriert'],
      ['be-, ver-, er-, ent-, ge- ön ekliler ge- almaz', 'besuchen, verpassen, erfinden, beenden', 'besucht, verpasst, erfunden, beendet']
    ]}},
    {h: 'haben mi, sein mi?'},
    {p: 'Fiillerin çoğu <b>haben</b> alır. <b>sein</b> alanlar üç grup: (1) bir yerden bir yere <b>hareket</b>: gehen, kommen, fahren, landen, einsteigen, umziehen, emigrieren; (2) <b>durum değişikliği</b>: aufwachen, einschlafen, werden, sterben; (3) <b>sein</b> ve <b>bleiben</b>. Pratik test: fiil Akkusativ nesne alıyorsa (bir şeyi yemek, birini görmek, otobüsü kaçırmak) neredeyse her zaman haben.'},
    {ex: [
      ['Wir ^sind^ nach Berlin {gefahren}.', 'Berlin’e gittik. → hareket: sein'],
      ['Ich ^habe^ den Bus {verpasst}.', 'Otobüsü kaçırdım. → nesne var: haben'],
      ['Das Flugzeug ^ist^ {gelandet}.', 'Uçak indi. → hareket: sein']
    ]},
    {h: 'Präteritum mu, Perfekt mi?'},
    {p: 'Anlamları neredeyse aynıdır: ikisi de geçmişi anlatır. Fark <b>üslup</b>tadır: <b>Präteritum</b> yazılı dilde, hikâyelerde, haberlerde; <b>Perfekt</b> konuşmada kullanılır. sein, haben ve modal fiiller konuşmada da genelde Präteritum’dadır (war, hatte, konnte). Alıştırmalarda kural basit: <b>soru veya verilen cümle hangi zamandaysa cevabı da o zamanda yaz.</b>'},
    {h: 'Plusquamperfekt: geçmişten daha geçmiş'},
    {p: 'Geçmişteki iki olaydan <b>önce olanı</b> anlatır. Türkçedeki “-mişti”. Kuruluşu Perfekt gibidir, sadece haben/sein Präteritum’a geçer: <b>hatte / war + Partizip II</b>. nachdem dersinde çok lazım olacak.'},
    {barsInline: {ns: [8, 42], hs: [52, 88], cap: 'Er hatte gegessen (önce, Plusquamperfekt) → dann ging er spazieren (sonra, Präteritum).'}},
    {ex: [
      ['Er ^hatte^ schon {gegessen}, dann ging er spazieren.', 'Yemeğini çoktan yemişti, sonra yürüyüşe çıktı.'],
      ['Sie ^war^ schon {gegangen}, als ich kam.', 'Ben geldiğimde o çoktan gitmişti.']
    ]},
    {h: 'Futur I ve Futur II'},
    {p: '<b>Futur I</b> = werden + mastar (sonda): <i lang="de">Ich werde morgen arbeiten</i> (yarın çalışacağım). <b>Futur II</b> = werden + Partizip II + haben/sein: <i lang="de">Bis Montag werde ich die Arbeit beendet haben</i> (pazartesiye kadar işi bitirmiş olacağım). İkisi de tahmin bildirebilir.'},
    {h: 'Edilgen (Passiv): werden + Partizip II'},
    {p: 'İşi yapan değil, işin kendisi önemliyse edilgen kullanılır. Türkçedeki “-ıl, -ın” eki. <b>werden</b> çekimlenir, Partizip II sona gider.'},
    {table: {head: ['Zaman', 'Örnek', 'Türkçe'], rows: [
      ['Präsens', 'Der Brief ^wird^ {geschrieben}.', 'Mektup yazılıyor.'],
      ['Präteritum', 'Der Reißverschluss ^wurde^ {erfunden}.', 'Fermuar icat edildi.'],
      ['Plusquamperfekt', 'Schiller ^war^ {beerdigt worden}.', 'Schiller defnedilmişti.']
    ]}},
    {h: 'Bir cümlenin zamanını nasıl anlarım?'},
    {p: '(1) <b>Çekimli fiile bak</b>: war, hatte, ging, kam, -te ekli fiil → Präteritum. haben/sein + ge-…-t/-en → Perfekt. hatte/war + Partizip → Plusquamperfekt. werden + mastar → Futur. (2) <b>Zaman kelimelerine bak</b>: gestern (dün), letzte Woche (geçen hafta), früher (eskiden), 1835 → geçmiş. morgen (yarın), nächstes Jahr → gelecek. jetzt, heute, immer → şimdi.'},
    {tip: '“<i lang="de">Wann verschloss man früher die Stadttore?</i>” sorusunda çekimli fiil <b>verschloss</b>: verschließen’in Präteritum’u. Ayrıca “früher” (eskiden) var. Demek ki cevap da <b>Präteritum</b> olacak.'},
    {ask: {q: 'Nachdem er gegessen ___, ging er nach Hause.', o: ['hat', 'hatte', 'war'], a: 'hatte', why: 'Ana cümle Präteritum (ging). Yemek ondan önce olduğu için yan cümle Plusquamperfekt: hatte + Partizip. essen nesne alan bir fiil, haben ile çekimlenir → hatte.'}},
    {drills: ['g3a', 'g3b', 'g3c', 'g3d']}
  ]
},
{
  id: 'bau', topic: 'g4', prep: true, group: 'Hazırlık · Sıfırdan', title: 'Sätze verbinden', sub: 'Alıştırmalardaki cümleleri adım adım nasıl toparlarım?',
  blocks: [
    {p: 'Artık fiili çekimlemeyi, kelime sırasını ve zamanları biliyorsun. Bu son hazırlık dersinde hepsini birleştirip derslerdeki alıştırmaları nasıl çözeceğini <b>adım adım</b> göreceksin. Bu yöntemi bir kez oturttuğunda her alıştırmaya uygulayabilirsin.'},
    {h: 'Altı adımlı yöntem'},
    {table: {head: ['Adım', 'Kendine sor'], rows: [
      ['1. Anla', 'İki cümle ne diyor? Türkçeye çevir.'],
      ['2. Ayır', 'Hangisi ana olay, hangisi zamanı / sebebi / koşulu anlatıyor? İkincisi yan cümle olur.'],
      ['3. Bağlacı seç', 'Ne zaman? → wenn / als / während … Neden? → weil / da. Hangi koşulda? → wenn / falls.'],
      ['4. Zamanı belirle', 'Verilen cümle veya soru hangi zamanda? Yan cümle de genelde o zamanda (nachdem hariç).'],
      ['5. Yan cümleyi kur', 'Bağlaç + özne + … + çekimli fiil EN SONDA.'],
      ['6. Kontrol et', 'Virgül var mı? Yan cümle öndeyse ana cümle fiille mi başlıyor (fiil, virgül, fiil)?']
    ]}},
    {h: 'Tam çözüm: Stadttore sorusu'},
    {p: 'Soru: <i lang="de">Wann verschloss man früher die Stadttore? (es / abends dunkel werden)</i>'},
    {p: '<b>1. Anla.</b> “Eskiden şehir kapılarını ne zaman kilitlerlerdi?” Parantezde: <i lang="de">es</i> (hava), <i lang="de">abends</i> (akşamları), <i lang="de">dunkel werden</i> (kararmak). Yani cevap “akşam hava karardığında”.'},
    {p: '<b>2. Ana cümle.</b> Soruyu cevaba çevir: soru kelimesi <i lang="de">Wann</i> düşer, özne <i lang="de">man</i> başa gelir, fiil 2. sırada kalır: <i lang="de">Man verschloss früher die Stadttore.</i>'},
    {p: '<b>3. Zaman.</b> Sorudaki fiil <i lang="de">verschloss</i> Präteritum. Cevaptaki yan cümle de Präteritum olacak. Parantezdeki <i lang="de">dunkel werden</i> mastar hâlinde: önce Präsens’te cümle yap: <i lang="de">Es wird abends dunkel.</i> Sonra Präteritum’a çevir: werden → <b>wurde</b>: <i lang="de">Es wurde abends dunkel.</i>'},
    {p: '<b>4. Bağlaç.</b> Olay geçmişte ama “früher” (eskiden) ve “abends” (her akşam) diyor: <b>tekrarlanan</b> bir olay. Geçmişte tekrarlanan olay → <b>wenn</b> (als değil).'},
    {p: '<b>5. Yan cümle.</b> Bağlaç + özne + gerisi + çekimli fiil sonda: <i lang="de">wenn es abends dunkel <b>wurde</b></i>.'},
    {p: '<b>6. Birleştir ve kontrol et.</b>'},
    {ex: [
      ['Man ^verschloss^ früher die Stadttore, [wenn] es abends dunkel {wurde}.', 'Eskiden şehir kapıları akşam hava karardığında kilitlenirdi.'],
      ['[Wenn] es abends dunkel {wurde}, ^verschloss^ man früher die Stadttore.', 'Yan cümle önde: ortada fiil, virgül, fiil.']
    ]},
    {h: 'Parantezdeki ipuçlarını okumak'},
    {p: 'Parantezde fiil hep <b>mastar</b> hâlinde verilir; özneye ve zamana göre çekimlemek sana kalır. Bazen parantez zamanı da ele verir:'},
    {table: {head: ['Parantezde', 'Ne demek?', 'Yan cümlede'], rows: [
      ['abends dunkel werden', 'werden çekimlenecek', 'es abends dunkel {wurde}'],
      ['verfolgt werden', 'edilgen (zulme uğramak)', 'sie verfolgt {wurden}'],
      ['gelungen sein', 'Perfekt/Plusquam, sein ile', 'die Fahrt gelungen {war}'],
      ['umfahren haben', 'Perfekt/Plusquam, haben ile', 'Magellan Südamerika umfahren {hatte}'],
      ['sich aufhalten', 'dönüşlü + ayrılabilen', 'sie sich in den USA {aufhält}']
    ]}},
    {h: 'İsimden fiile: “vor dem Studium” → “bevor sie studierte”'},
    {p: 'Bazı alıştırmalar bir isim kalıbını yan cümleye çevirtir. Yöntem: (1) isimden fiili bul, (2) kimin yaptığını bul (özne; belli değilse <i lang="de">man</i>), (3) fiili çekimle ve sona koy.'},
    {table: {head: ['İsim kalıbı', 'Fiil', 'Yan cümle'], rows: [
      ['vor dem Studium', 'studieren', 'bevor sie {studierte}'],
      ['vor der Heirat', 'heiraten', 'bevor sie {heirateten}'],
      ['nach der Erfindung der Glühbirne', 'erfinden', 'nachdem Edison die Glühbirne erfunden {hatte}'],
      ['beim Speichern einer Datei', 'speichern', 'wenn man eine Datei {speichert}']
    ]}},
    {trap: 'İsim kalıbında nesne Genitiv’dedir (<i lang="de">einer Datei, der Glühbirne</i>). Fiile çevirince nesne <b>Akkusativ</b> olur: <i lang="de">eine Datei, die Glühbirne</i>.'},
    {h: 'Son kontrol listesi'},
    {tip: 'Her cevaptan önce dört soru: <b>(1)</b> Virgül var mı? <b>(2)</b> Yan cümlede çekimli fiil en sonda mı? <b>(3)</b> Zaman verilen cümleyle uyumlu mu? <b>(4)</b> Yan cümle öndeyse ana cümle fiille mi başlıyor?'},
    {drills: ['g4a', 'g4b']}
  ]
}
];

// hazırlık alıştırmaları
Object.assign(DRILLS, {
g1a: {topic: 'g1', title: 'Fiili çekimle', de: 'Wählen Sie die richtige Verbform.', tr: 'Parantezdeki fiilin doğru biçimini seç.',
  items: [
    P('Er ___ jeden Tag Deutsch. (lernen)', ['lerne', 'lernst', 'lernt'], 'lernt', 'Anlamı: O her gün Almanca öğreniyor. er/sie/es için kök + -t: lern + t = lernt. -e ich için, -st du için.'),
    P('Du ___ sehr schnell. (sprechen)', ['sprechst', 'sprichst', 'spricht'], 'sprichst', 'Anlamı: Çok hızlı konuşuyorsun. sprechen kök ünlüsü değişen fiil: du ve er/sie/es’te e → i. du eki -st: sprichst. spricht er/sie/es içindir.'),
    P('Sie (o, kadın) ___ morgen nach Berlin. (fahren)', ['fahrt', 'fährt', 'fahren'], 'fährt', 'Anlamı: O yarın Berlin’e gidiyor. fahren’de du ve er/sie/es’te a → ä olur: fährt. Ayrıca “morgen” ile Präsens gelecek anlamı taşıyor.'),
    P('Wir ___ heute sehr müde. (sein)', ['sind', 'seid', 'ist'], 'sind', 'Anlamı: Bugün çok yorgunuz. sein düzensiz: wir sind, ihr seid, er ist.'),
    P('Ihr ___ ein schönes Haus. (haben)', ['habt', 'hast', 'haben'], 'habt', 'Anlamı: Güzel bir eviniz var. haben: ihr habt, du hast, wir/sie haben.'),
    P('Ich ___ heute nicht kommen. (können)', ['kann', 'kannst', 'könne'], 'kann', 'Anlamı: Bugün gelemem. Modal fiillerde ich ve er aynıdır ve ek almaz: ich kann, er kann. kannst du içindir. Asıl fiil kommen mastar hâlinde en sonda.'),
    P('anrufen: Hangisi doğru?', ['Er anruft seine Mutter.', 'Er ruft seine Mutter an.', 'Er ruft an seine Mutter.'], 'Er ruft seine Mutter an.', 'Anlamı: Annesini arıyor. anrufen ayrılabilen fiildir: ana cümlede ruft 2. sırada, ön ek an cümlenin EN SONUNDA. Birleşik “anruft” yalnızca yan cümlede olur.'),
    P('sich fühlen: Maria ___ heute krank.', ['fühlt sich', 'fühlt mich', 'sich fühlt'], 'fühlt sich', 'Anlamı: Maria bugün kendini hasta hissediyor. Özne Maria (o) → dönüşlü zamir sich. mich ich içindir. Ana cümlede çekimli fiil önce, sich hemen arkasından gelir.')
  ]},
g1b: {topic: 'g1', title: 'Cümle kur (Präsens)', de: 'Bilden Sie Sätze im Präsens.', tr: 'Verilen parçalarla Präsens’te cümle kur. Fiili özneye göre çekimle.',
  model: 'ich / in Konya / wohnen → Ich wohne in Konya.',
  items: [
    W('du / gern Pizza / essen', 'Du isst gern Pizza.', 'Anlamı: Pizzayı seversin. essen’de du ve er’de e → i olur. Kök s ile bittiği için du eki sadece -t: du isst (er isst ile aynı). Fiil 2. sırada.'),
    W('er / jeden Morgen um 7 Uhr / aufstehen', 'Er steht jeden Morgen um 7 Uhr auf.', 'Anlamı: Her sabah saat 7’de kalkar. aufstehen ayrılabilen: steht 2. sırada, auf en sonda.'),
    W('wir / heute / arbeiten müssen', 'Wir müssen heute arbeiten.', 'Anlamı: Bugün çalışmak zorundayız. Çekimlenen modal fiil müssen 2. sırada, asıl fiil arbeiten mastar hâlinde en sonda.'),
    W('sie (o, kadın) / ein Buch / lesen', 'Sie liest ein Buch.', 'Anlamı: Bir kitap okuyor. lesen’de er/sie’de e → ie: liest.'),
    W('ihr / am Wochenende / nach Izmir / fahren', 'Ihr fahrt am Wochenende nach Izmir.', 'Anlamı: Hafta sonu İzmir’e gidiyorsunuz. a → ä değişimi yalnızca du ve er/sie/es’te olur; ihr için normal: ihr fahrt.')
  ]},
g2a: {topic: 'g2', title: 'Kelime sırası', de: 'Welcher Satz ist richtig?', tr: 'Doğru cümleyi veya boşluğa gelecek kelimeyi seç.',
  items: [
    P('Hangisi doğru?', ['Heute ich gehe ins Kino.', 'Heute gehe ich ins Kino.', 'Heute ins Kino gehe ich.'], 'Heute gehe ich ins Kino.', 'Anlamı: Bugün sinemaya gidiyorum. Heute 1. sırayı doldurdu; çekimli fiil gehe 2. sırada kalmalı, özne ich fiilin arkasına geçer.'),
    P('Hangisi doğru?', ['Ich habe gegessen gestern Pizza.', 'Ich habe gestern Pizza gegessen.', 'Ich gestern habe Pizza gegessen.'], 'Ich habe gestern Pizza gegessen.', 'Anlamı: Dün pizza yedim. Perfekt’te fiil çerçevesi: habe 2. sırada, Partizip gegessen en sonda; diğer her şey arada.'),
    P('Hangisi doğru?', ['Morgen ich kann nicht kommen.', 'Morgen kann ich nicht kommen.', 'Morgen kann ich kommen nicht.'], 'Morgen kann ich nicht kommen.', 'Anlamı: Yarın gelemem. kann 2. sırada, özne arkasında, mastar kommen en sonda. nicht mastarın önüne gelir.'),
    P('Er ist müde, ___ geht er früh ins Bett. (bu yüzden)', ['deshalb', 'weil', 'denn'], 'deshalb', 'Anlamı: Yorgun, bu yüzden erken yatıyor. Boşluktan sonra hemen fiil (geht) ve sonra özne geliyor; demek ki boşluğa 1. sırayı dolduran bir kelime gerekiyor: deshalb. weil olsaydı fiil sonda olurdu, denn olsaydı özne önce gelirdi (denn er geht).'),
    P('Ich bleibe zu Hause, ___ ich bin krank. (çünkü)', ['weil', 'denn', 'deshalb'], 'denn', 'Anlamı: Evde kalıyorum, çünkü hastayım. Boşluktan sonra normal sıra var: özne (ich) + fiil (bin). Sırayı değiştirmeyen bağlaç denn. weil olsaydı: weil ich krank bin (fiil sonda).'),
    P('Die Wohnung ist zu dunkel. → ___ ist zu dunkel.', ['Er', 'Sie', 'Es'], 'Sie', 'die Wohnung dişil (die) bir isim, bu yüzden zamiri sie. Türkçede hepsi “o”, ama Almancada ismin cinsiyetine bakılır: der → er, die → sie, das → es.'),
    P('Peter sagt: „Ich liebe meine Frau.“ → Peter liebt ___ Frau.', ['meine', 'seine', 'ihre'], 'seine', 'Peter’in sözünü aktarıyoruz. Peter erkek: ich → er, meine → seine (onun). ihre bir kadının iyeliği olurdu.')
  ]},
g2b: {topic: 'g2', title: 'Başka kelimeyle başlat', de: 'Beginnen Sie den Satz mit dem angegebenen Wort.', tr: 'Cümleyi verilen kelimeyle başlatıp yeniden yaz. Fiil 2. sırada kalmalı.',
  model: 'Ich gehe heute ins Kino. (Heute) → Heute gehe ich ins Kino.',
  items: [
    W('Wir fahren im Sommer nach Izmir. (Im Sommer)', 'Im Sommer fahren wir nach Izmir.', 'Anlamı: Yazın İzmir’e gidiyoruz. “Im Sommer” tek parça ve 1. sırada; fahren 2. sırada kalır, wir arkasına geçer.'),
    W('Er hat gestern lange gearbeitet. (Gestern)', 'Gestern hat er lange gearbeitet.', 'Anlamı: Dün uzun süre çalıştı. hat 2. sırada kalır, er arkasına geçer, Partizip gearbeitet yine en sonda.'),
    W('Sie kann leider nicht kommen. (Leider)', 'Leider kann sie nicht kommen.', 'Anlamı: Maalesef gelemiyor. Modal fiil kann 2. sırada, sie arkasında, kommen en sonda.'),
    W('Ich rufe dich morgen an. (Morgen)', 'Morgen rufe ich dich an.', 'Anlamı: Seni yarın ararım. rufe 2. sırada, ich arkasında, ayrılabilen ek an yine en sonda.'),
    W('Meine Schwester wohnt seit zwei Jahren in Berlin. (Seit zwei Jahren)', 'Seit zwei Jahren wohnt meine Schwester in Berlin.', 'Anlamı: Kız kardeşim iki yıldır Berlin’de oturuyor. “Meine Schwester” tek parça olarak fiilin arkasına geçer.')
  ]},
g3a: {topic: 'g3', title: 'Präteritum ve Partizip II', de: 'Wählen Sie die richtige Form.', tr: 'Parantezdeki fiilin doğru geçmiş zaman biçimini seç.',
  items: [
    P('Gestern ___ ich viel. (arbeiten, Präteritum)', ['arbeite', 'arbeitete', 'gearbeitet'], 'arbeitete', 'Anlamı: Dün çok çalıştım. Düzenli fiil: kök arbeit + (e)te. ich’te ek yok: arbeitete. arbeite Präsens, gearbeitet ise Partizip (haben olmadan tek başına kullanılmaz).'),
    P('Er ___ gestern spät nach Hause. (kommen, Präteritum)', ['kommte', 'kam', 'kamt'], 'kam', 'Anlamı: Dün eve geç geldi. kommen düzensiz: -te almaz, ünlü değişir: kam. er’de ek yok.'),
    P('Als ich ein Kind ___, wohnte ich in Ankara. (sein)', ['bin', 'war', 'wurde'], 'war', 'Anlamı: Çocukken Ankara’da oturuyordum. sein’ın Präteritum’u war. wurde werden’den gelir (“oldu, -leşti”).'),
    P('Ich habe heute einen Brief ___. (schreiben)', ['geschreibt', 'geschrieben', 'schrieb'], 'geschrieben', 'Anlamı: Bugün bir mektup yazdım. Perfekt: habe + Partizip II. schreiben düzensiz: ge- + schrieb + -en = geschrieben.'),
    P('Wir sind nach Berlin ___. (fahren)', ['gefahrt', 'gefahren', 'fuhren'], 'gefahren', 'Anlamı: Berlin’e gittik. fahren düzensiz: Partizip gefahren. Hareket fiili olduğu için sein ile (sind).'),
    P('Er hat sein Studium ___. (beenden)', ['gebeendet', 'beendet', 'beendeten'], 'beendet', 'Anlamı: Öğrenimini bitirdi. be- ön ekli fiiller ge- almaz: beendet.'),
    P('Sie hat Medizin ___. (studieren)', ['gestudiert', 'studiert', 'studierte'], 'studiert', 'Anlamı: Tıp okudu. -ieren ile biten fiiller ge- almaz: studiert.'),
    P('Ich habe ihn gestern ___. (anrufen)', ['angerufen', 'geanruft', 'anrufen'], 'angerufen', 'Anlamı: Onu dün aradım. Ayrılabilen fiilde ge- ön ek ile kök arasına girer: an + ge + rufen = angerufen.')
  ]},
g3b: {topic: 'g3', title: 'haben mi, sein mi?', de: 'haben oder sein?', tr: 'Boşluğa haben veya sein’ın doğru biçimini seç.',
  items: [
    P('Das Flugzeug ___ pünktlich gelandet.', ['hat', 'ist'], 'ist', 'Anlamı: Uçak zamanında indi. landen bir yerden bir yere hareket → sein.'),
    P('Ich ___ eine Pizza gegessen.', ['habe', 'bin'], 'habe', 'Anlamı: Bir pizza yedim. essen nesne alır (eine Pizza), hareket değil → haben.'),
    P('Wir ___ nach Deutschland umgezogen.', ['haben', 'sind'], 'sind', 'Anlamı: Almanya’ya taşındık. umziehen bir yerden başka yere hareket → sein.'),
    P('Sie ___ den Bus verpasst.', ['hat', 'ist'], 'hat', 'Anlamı: Otobüsü kaçırdı. Otobüs hareket ediyor ama özne değil; özne bir şeyi (den Bus) kaçırıyor → Akkusativ nesne var → haben.'),
    P('Er ___ den ganzen Tag zu Hause geblieben.', ['hat', 'ist'], 'ist', 'Anlamı: Bütün gün evde kaldı. bleiben hareket değil ama istisna: sein ve bleiben her zaman sein alır.'),
    P('Nachdem er gegessen ___, ging er spazieren.', ['hatte', 'war'], 'hatte', 'Anlamı: Yemek yedikten sonra yürüyüşe çıktı. Plusquamperfekt: hatte/war + Partizip. essen haben alır → hatte.'),
    P('Nachdem sie angekommen ___, rief sie ihre Mutter an.', ['hatte', 'war'], 'war', 'Anlamı: Vardıktan sonra annesini aradı. ankommen hareket fiili → sein → Plusquamperfekt’te war.')
  ]},
g3c: {topic: 'g3', title: 'Hangi zaman?', de: 'Welche Zeitform ist das?', tr: 'Cümlenin hangi zamanda olduğunu bul.',
  items: [
    P('Ich werde morgen arbeiten.', ['Präsens', 'Futur I', 'Perfekt'], 'Futur I', 'Anlamı: Yarın çalışacağım. werden (çekimli) + mastar (arbeiten) → Futur I.'),
    P('Er hatte schon gegessen.', ['Perfekt', 'Präteritum', 'Plusquamperfekt'], 'Plusquamperfekt', 'Anlamı: Çoktan yemişti. hatte (haben’in Präteritum’u) + Partizip II → Plusquamperfekt (“-mişti”).'),
    P('Wir haben Fußball gespielt.', ['Perfekt', 'Präteritum', 'Plusquamperfekt'], 'Perfekt', 'Anlamı: Futbol oynadık. haben Präsens’te (haben) + Partizip II (gespielt) → Perfekt.'),
    P('Sie wohnte damals in Berlin.', ['Präsens', 'Präteritum', 'Perfekt'], 'Präteritum', 'Anlamı: O zamanlar Berlin’de oturuyordu. wohn + te → tek parça, -te ekli → Präteritum.'),
    P('Der Reißverschluss wurde erfunden. Bu cümle …', ['etken, Präsens', 'edilgen, Präteritum', 'etken, Perfekt'], 'edilgen, Präteritum', 'Anlamı: Fermuar icat edildi. werden + Partizip II = edilgen. werden’in Präteritum’u wurde → edilgen Präteritum.'),
    P('Wann verschloss man früher die Stadttore? Cevap hangi zamanda olmalı?', ['Präsens', 'Präteritum', 'Futur I'], 'Präteritum', 'verschloss, verschließen’in Präteritum’u (düzensiz). “früher” de geçmişi gösteriyor. Soru hangi zamandaysa cevap da o zamanda olur → Präteritum.')
  ]},
g3d: {topic: 'g3', title: 'Zamanı değiştir', de: 'Setzen Sie die Sätze in die angegebene Zeitform.', tr: 'Cümleyi parantezdeki zamana çevir.',
  model: 'Ich wohne in Ankara. (Präteritum) → Ich wohnte in Ankara.',
  items: [
    W('Ich mache meine Hausaufgaben. (Präteritum)', 'Ich machte meine Hausaufgaben.', 'Anlamı: Ödevlerimi yaptım. Düzenli fiil: mach + te. ich’te ek yok.'),
    W('Er geht nach Hause. (Präteritum)', 'Er ging nach Hause.', 'Anlamı: Eve gitti. gehen düzensiz: Präteritum ging (-te almaz).'),
    W('Wir essen Pizza. (Perfekt)', 'Wir haben Pizza gegessen.', 'Anlamı: Pizza yedik. essen nesne alır → haben. haben 2. sırada çekimlenir (wir haben), Partizip gegessen en sona.'),
    W('Sie fährt nach Izmir. (Perfekt)', 'Sie ist nach Izmir gefahren.', 'Anlamı: İzmir’e gitti. fahren hareket fiili → sein: sie ist. Partizip gefahren en sonda.'),
    W('Ich räume das Zimmer auf. (Plusquamperfekt)', 'Ich hatte das Zimmer aufgeräumt.', 'Anlamı: Odayı toplamıştım. aufräumen haben alır → Plusquamperfekt’te hatte. Ayrılabilen fiilin Partizip’i: auf + ge + räumt = aufgeräumt.'),
    W('Es wird dunkel. (Präteritum)', 'Es wurde dunkel.', 'Anlamı: Hava karardı. werden’in Präteritum’u wurde. Stadttore alıştırmasındaki yan cümle tam olarak budur.')
  ]},
g4a: {topic: 'g4', title: 'Adım adım birleştir', de: 'Verbinden Sie die Sätze.', tr: 'Cümleleri verilen bağlaçla birleştir. Altı adımı uygula.',
  model: 'weil: Ich bleibe zu Hause. Ich bin krank. → Ich bleibe zu Hause, weil ich krank bin.',
  items: [
    W('wenn: Ich habe Zeit. Ich besuche dich. (Yan cümle önde)', 'Wenn ich Zeit habe, besuche ich dich.', 'Anlamı: Vaktim olursa seni ziyaret ederim. Koşul “vaktim olması” → yan cümle: Wenn ich Zeit habe (habe sonda). Yan cümle önde olduğu için ana cümle fiille başlar: besuche ich dich.'),
    W('als: Ich war zehn Jahre alt. Wir zogen nach Izmir. (Yan cümle önde)', 'Als ich zehn Jahre alt war, zogen wir nach Izmir.', 'Anlamı: On yaşındayken İzmir’e taşındık. İki cümle de Präteritum (war, zogen) ve bu hayatta bir kez oldu → als. war sona, ana cümle fiille başlar: zogen wir.'),
    W('Wann stehst du auf? (der Wecker / klingeln) — wenn ile, ich ile cevapla', ['Ich stehe auf, wenn der Wecker klingelt.', 'Wenn der Wecker klingelt, stehe ich auf.'], 'Anlamı: Ne zaman kalkıyorsun? Çalar saat çaldığında. Ana cümle: du sorusuna ich ile cevap → Ich stehe auf. Parantezden yan cümle: der Wecker klingelt → Präsens, her sabah tekrarlı → wenn. klingelt sona.'),
    W('Wann rief er dich an? (er / in Berlin / ankommen) — als ile, mich ile cevapla', ['Er rief mich an, als er in Berlin ankam.', 'Als er in Berlin ankam, rief er mich an.'], 'Anlamı: Seni ne zaman aradı? Berlin’e vardığında. Soru Präteritum (rief) → cevap da Präteritum. ankommen düzensiz: kam an → yan cümlede birleşir: ankam. Tek seferlik geçmiş olay → als. dich sorusuna mich ile cevap.'),
    W('Lena sagt: „Ich bin müde.“ → Lena geht nach Hause, weil …', 'Lena geht nach Hause, weil sie müde ist.', 'Anlamı: Lena eve gidiyor, çünkü yorgun. Sözü aktarırken ich → sie, bin → ist. Yan cümlede ist en sona.'),
    W('bevor: Vor dem Essen wasche ich mir die Hände. (essen, ich)', 'Bevor ich esse, wasche ich mir die Hände.', 'Anlamı: Yemekten önce ellerimi yıkarım. vor dem Essen → isimden fiil: essen. Özne ich: ich esse → yan cümlede sona. Yan cümle önde, ana cümle fiille başlar: wasche ich.')
  ]},
g4b: {topic: 'g4', title: 'Stadttore: hangi adım doğru?', de: 'Wann verschloss man früher die Stadttore? (es / abends dunkel werden)', tr: 'Örnek soruyu adım adım çöz: her adımda doğru seçeneği bul.',
  items: [
    P('1. Adım: Ana cümle hangisi?', ['Man verschloss früher die Stadttore.', 'Man verschließt früher die Stadttore.', 'Verschloss man früher die Stadttore.'], 'Man verschloss früher die Stadttore.', 'Soru kelimesi Wann düşer, özne man başa gelir, fiil 2. sırada ve sorudaki zamanda (Präteritum) kalır. verschließt Präsens olurdu; üçüncüsü soru sırası.'),
    P('2. Adım: Parantezden Präteritum’da cümle kur.', ['Es wird abends dunkel.', 'Es wurde abends dunkel.', 'Es dunkel wurde abends.'], 'Es wurde abends dunkel.', 'Sorunun zamanı Präteritum. werden’in Präteritum’u wurde. Ana cümle olarak fiil 2. sırada: Es wurde abends dunkel.'),
    P('3. Adım: Bağlaç hangisi?', ['wenn', 'als'], 'wenn', 'Olay geçmişte ama her akşam tekrarlanıyordu (früher, abends). Geçmişte tekrarlanan olay → wenn. als sadece tek seferlik geçmiş olay için.'),
    P('4. Adım: Yan cümlede doğru sıra?', ['wenn es wurde abends dunkel', 'wenn es abends dunkel wurde', 'wenn abends dunkel es wurde'], 'wenn es abends dunkel wurde', 'Yan cümle: bağlaç + özne + gerisi + çekimli fiil EN SONDA. Çekimli fiil wurde.'),
    P('5. Adım: Yan cümle öne alınırsa hangisi doğru?', ['Wenn es abends dunkel wurde, man verschloss früher die Stadttore.', 'Wenn es abends dunkel wurde, verschloss man früher die Stadttore.'], 'Wenn es abends dunkel wurde, verschloss man früher die Stadttore.', 'Yan cümle 1. sırayı doldurur; ana cümlenin fiili 2. sırada olmak için hemen virgülden sonra gelir: fiil, virgül, fiil (wurde, verschloss).')
  ]}
});

Object.assign(RULES, {
  g1: {ask: 'Kendine sor: Özne kim (ich, du, er…)? Fiil kök ünlüsü değişenlerden mi, ayrılabilen mi, modal mı?',
    rule: 'Çekim: kök + kişi eki (ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie -en). <b>sein, haben, werden</b> düzensizdir, ezberle. Bazı fiillerde yalnızca <b>du ve er</b>’de ünlü değişir (essen → isst, fahren → fährt, lesen → liest). <b>Ayrılabilen</b> fiilde ön ek ana cümlede sona gider (ruft … an). <b>Modal</b> fiilde ich = er (kann), asıl fiil mastar ve en sonda.'},
  g2: {ask: 'Kendine sor: Çekimli fiil hangisi? 2. sırada mı? İkinci fiil parçası en sonda mı?',
    rule: 'Ana cümlede <b>çekimli fiil 2. sırada</b>dır. Sıra = parça (Am Samstagabend tek parça). Başa başka bir parça gelirse özne fiilin <b>arkasına</b> geçer: <i lang="de">Heute gehe ich</i>. İkinci fiil parçası (Partizip, mastar, ayrılabilen ek) <b>en sona</b> gider. <b>und, aber, oder, denn</b> sırayı değiştirmez; <b>deshalb, dann, dagegen</b> 1. sırayı doldurur (fiil hemen arkasından); <b>weil, wenn, als…</b> fiili sona gönderir.'},
  g3: {ask: 'Kendine sor: Çekimli fiil ne? -te ekli mi, haben/sein + Partizip mi, hatte/war + Partizip mi, werden + mastar mı?',
    rule: '<b>Präteritum</b>: kök + te (machte) veya düzensiz ünlü değişimi (kam, ging, war). <b>Perfekt</b>: haben/sein + Partizip II (hat gemacht, ist gegangen). <b>Plusquamperfekt</b>: hatte/war + Partizip II, “-mişti”. <b>Futur I</b>: werden + mastar. Hareket ve durum değişikliği fiilleri ile sein/bleiben <b>sein</b> alır, diğerleri <b>haben</b>. <b>Edilgen</b>: werden + Partizip II (wurde erfunden). Soru hangi zamandaysa cevap da o zamanda.'},
  g4: {ask: 'Kendine sor: Ana olay hangisi, yan cümle hangisi? Zaman ne? Bağlaçtan sonra çekimli fiil en sonda mı?',
    rule: 'Altı adım: <b>1</b> anla (Türkçeye çevir), <b>2</b> ana cümle ile yan cümleyi ayır, <b>3</b> bağlacı seç, <b>4</b> zamanı belirle (verilen cümleyle aynı), <b>5</b> yan cümleyi kur: bağlaç + özne + … + çekimli fiil <b>en sonda</b>, <b>6</b> kontrol: virgül var mı, yan cümle öndeyse ana cümle fiille mi başlıyor (fiil, virgül, fiil)?'}
});

Object.assign(HOW, {
  g1a: ['Önce özneyi bul: ich, du, er/sie/es, wir, ihr, sie.', 'Fiilin kökünü bul (mastardan -en’i at).', 'Kişi ekini getir. Fiil düzensizse (sein, haben) veya du/er’de ünlüsü değişiyorsa ona dikkat et.'],
  g1b: ['Özneyi başa yaz.', 'Fiili özneye göre çekimle ve 2. sıraya koy.', 'Modal fiil varsa o çekimlenir, asıl fiil mastar hâlinde en sona gider.', 'Ayrılabilen fiilde ön ek en sona gider.'],
  g2a: ['Her seçenekte çekimli fiili bul.', '2. sırada mı? (Sıra = parça, kelime değil.)', 'İkinci fiil parçası (Partizip, mastar) en sonda mı?', 'Boşluklu sorularda boşluktan sonra ne geldiğine bak: fiil mi, özne mi?'],
  g2b: ['Verilen kelimeyi başa yaz (1. sıra).', 'Çekimli fiili hemen arkasına koy (2. sıra).', 'Özneyi fiilin arkasına al, gerisini aynı sırayla yaz.'],
  g3a: ['Parantezdeki zamana bak: Präteritum mu, Perfekt (Partizip) mi?', 'Fiil düzenli mi (-te alır) yoksa düzensiz mi (ünlüsü değişir)?', 'Partizip için: ön ek var mı (be-, ver-, ayrılabilen), -ieren ile mi bitiyor?'],
  g3b: ['Fiil bir yerden bir yere hareket mi, durum değişikliği mi? → sein.', 'sein veya bleiben mi? → sein.', 'Bir nesne alıyor mu (bir şeyi yemek, kaçırmak)? → haben.', 'Plusquamperfekt’te aynı seçim: hatte veya war.'],
  g3c: ['Çekimli fiili bul.', '-te ekli veya düzensiz geçmiş biçim → Präteritum.', 'haben/sein (Präsens) + Partizip → Perfekt; hatte/war + Partizip → Plusquamperfekt.', 'werden + mastar → Futur; werden + Partizip → edilgen.'],
  g3d: ['Hedef zamanın kuralını hatırla (tablo).', 'Perfekt/Plusquamperfekt için haben mı sein mı, karar ver.', 'Çekimli parçayı 2. sıraya, Partizip’i en sona koy.'],
  g4a: ['Cümleleri Türkçeye çevir.', 'Bağlacın geleceği cümleyi (zaman/sebep/koşul) bul.', 'Zamanı koru, yan cümlede çekimli fiili en sona taşı.', 'Yan cümle öndeyse ana cümleyi fiille başlat.', 'Söz aktarılıyorsa ich → er/sie, mein → sein/ihr.'],
  g4b: ['Her adımda sadece o adımın sorusunu düşün.', 'Önceki adımın cevabını bir sonrakinde kullan.']
});

LESSONS.unshift(...PREP);
