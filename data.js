// içerik images/ klasöründeki 34 slayttan
// cümlelerde [bağlaç], {yan cümle fiili}, ^ana cümle fiili^ diye işaretli

const TOPICS = {
  wa: 'wenn / als',
  wh: 'während',
  sb: 'solange · bevor · ehe',
  na: 'nachdem · sobald · sowie',
  bi: 'bis',
  se: 'seit · seitdem',
  ka: 'weil · da · zumal',
  ko: 'wenn · falls'
};

// her konunun temel kuralı ve kendine soracağın soru, seviyesi düşük olanlar dahil
const RULES = {
  wa: {ask: 'Kendine sor: Olay geçmişte mi? Geçmişteyse bir kez mi oldu, yoksa tekrar tekrar mı?',
    rule: '<b>als</b> yalnızca bir durumda: olay <b>geçmişte</b> ve <b>bir kez</b> oldu (dün, 1963’te, çocukken). <b>wenn</b> geri kalan her durumda: şimdiki zaman, gelecek ve geçmişte <b>tekrarlanan</b> olaylar (immer, jedes Mal, früher oft). İkisi de yan cümle bağlacı: çekimli fiil cümlenin <b>en sonuna</b> gider. Türkçedeki “-dığında” ikisini de karşılar, o yüzden Türkçeye bakarak değil, zamana ve tekrara bakarak seç.'},
  wh: {ask: 'Kendine sor: İki eylem aynı anda mı oluyor, yoksa iki kişi birbirinin tersini mi yapıyor?',
    rule: '<b>während</b> iki anlama gelir. <b>temporal</b> (zaman): iki eylem <b>aynı anda</b> olur, Türkçesi “-iken”. <b>adversativ</b> (karşıtlık): iki kişi ya da şey <b>zıt</b>, Türkçesi “oysa, buna karşın”. Pratik test: cümleye “dagegen / aber” koyduğunda anlam bozulmuyorsa adversatiftir. Yan cümle bağlacı olduğu için fiil sonda. <b>dagegen</b> ise ana cümlede 1. sırayı doldurur, fiil hemen arkasından gelir: <i lang="de">dagegen ist sie</i>. <b>aber</b> sırayı değiştirmez: <i lang="de">aber sie ist</i>.'},
  sb: {ask: 'Kendine sor: Bir eylem diğerinden önce mi oluyor (bevor), yoksa ikisi aynı süre boyunca mı devam ediyor (solange)?',
    rule: '<b>bevor / ehe</b> = “-meden önce”: ana cümledeki eylem <b>önce</b> olur, yan cümledeki <b>sonra</b>. <i lang="de">Bevor ich schlafe, lese ich</i> → önce okurum, sonra uyurum. <b>solange</b> = “-dığı sürece”: iki eylem <b>aynı süre</b> boyunca devam eder ve <b>birlikte biter</b>. İkisinde de genelde iki cümle aynı zaman kipinde olur. İsimli kalıplar fiile döner: <i lang="de">vor dem Studium → bevor sie studierte</i>, <i lang="de">während des Essens → während er isst</i>.'},
  na: {ask: 'Kendine sor: Ana cümle hangi zamanda? Yan cümle ondan bir adım daha geçmişte olmalı.',
    rule: '<b>nachdem</b> = “-dikten sonra”. Yan cümledeki eylem <b>önce</b> bitmiştir, bu yüzden zaman kipi bir adım geriye kayar (Zeitenwechsel): ana cümle <b>Präsens</b> ise yan cümle <b>Perfekt</b> (hat gemacht); ana cümle <b>Präteritum</b> ise yan cümle <b>Plusquamperfekt</b> (hatte gemacht / war gegangen). Plusquamperfekt = <b>hatte/war + Partizip II</b>. Hareket ve durum değişikliği fiilleri (gehen, landen, ankommen, emigrieren) <b>war</b> alır, diğerleri <b>hatte</b>. <b>sobald / sowie</b> = “-ir -mez”: ikinci eylem hemen gelir.'},
  bi: {ask: 'Kendine sor: Bir eylem bir bitiş noktasına kadar mı sürüyor? O bitiş noktası bis’li cümle olur.',
    rule: '<b>bis</b> = “-e kadar”. Ana cümledeki eylem, yan cümledeki olay gerçekleşene <b>kadar</b> sürer; o olay bitiş noktasıdır. <i lang="de">Ich warte, bis du kommst</i> → sen gelene kadar beklerim. Genelde iki cümle aynı zaman kipinde. Sık kalıplar: <i lang="de">so lange …, bis</i> ve <i lang="de">Es dauert …, bis</i>. Futur I/II bis cümlesinde tahmin bildirir.'},
  se: {ask: 'Kendine sor: Olay geçmişte başlayıp hâlâ sürüyor mu (seit), yoksa bir noktada bitti mi (bis)?',
    rule: '<b>seit / seitdem</b> = “-den beri”: olay geçmişte başladı ve <b>şu an hâlâ sürüyor</b>. Bu yüzden Almancada genelde <b>Präsens</b> kullanılır, Türkçedeki gibi: <i lang="de">Seit 2 Jahren lerne ich Deutsch</i> = 2 yıldır Almanca öğreniyorum. Başlangıç noktası bitmiş bir olaysa yan cümle Perfekt olur: <i lang="de">Seit er aufgehört hat, ist er nervös</i>. Edat olarak <i lang="de">seit + Dativ</i> (seit 25 Jahren). <b>bis</b> ise bitiş noktasıdır: “-e kadar”.'},
  ka: {ask: 'Kendine sor: Bu cümle bir “Neden?” sorusuna cevap mı veriyor? Çekimli fiili bul ve en sona taşı.',
    rule: '<b>weil</b> = “çünkü, -dığı için”: Warum? sorusunun cevabı. <b>da</b> aynı anlam, daha çok yazılı dilde ve genelde cümle başında. <b>zumal</b> = “hele ki, üstelik”: ikinci, ek bir sebep ekler. Üçü de yan cümle bağlacıdır: <b>çekimli fiil en sona</b> gider, önüne virgül gelir. Birleşik zamanlarda yardımcı fiil en sonda: <i lang="de">weil er gekommen ist</i>, <i lang="de">weil er kommen kann</i>. Yan cümle öndeyse ana cümle <b>fiille başlar</b>: <i lang="de">Da es regnet, bleibe ich</i> (fiil, virgül, fiil). Birinin sözünü aktarırken zamirleri değiştir: ich → er/sie, mein → sein/ihr.'},
  ko: {ask: 'Kendine sor: Bu bir koşul mu (“-se/-sa”)? Fiili bul: wenn varsa sona, wenn yoksa başa gider.',
    rule: '<b>wenn</b> koşul bildirince “-se, -sa” demektir: <i lang="de">Wenn du Zeit hast, komm</i> = vaktin varsa gel. Fiil sona gider. <b>falls</b> aynı anlamdadır ama yalnızca koşul için kullanılır, zaman için değil. <b>wenn’siz koşul</b>: wenn’i sil, çekimli fiili <b>başa</b> al, virgülden sonra istersen <i lang="de">so</i> veya <i lang="de">dann</i> ekle: <i lang="de">Hast du Zeit, (so) komm</i>. <b>beim/zum + isim</b> kalıbını çevirirken isimden fiili çıkar, özne genelde <i lang="de">man</i>: <i lang="de">beim Lernen → wenn man lernt</i>.'}
};

const LESSONS = [
{
  id: 'nb', group: 'Temel', title: 'Was ist ein Nebensatz?', sub: 'Yan cümle nedir, nasıl kurulur?',
  scene: [
    {m: 'Ich komme heute nicht', mv: 1, a: 'Ich habe keine Zeit', c: 'weil', v: 1, tr: 'Vaktim olmadığı için bugün gelmiyorum.'},
    {m: 'Ich höre oft Musik', mv: 1, a: 'Ich fahre zur Arbeit', c: 'wenn', v: 1, tr: 'İşe giderken sık sık müzik dinlerim.'},
    {m: 'Wir warten hier', mv: 1, a: 'Der Kellner kommt endlich', c: 'bis', v: 2, tr: 'Garson nihayet gelene kadar burada bekliyoruz.'},
    {m: 'Ich bin sehr glücklich', mv: 1, a: 'Ich wohne in Konya', c: 'seit', v: 1, tr: 'Konya’da oturduğumdan beri çok mutluyum.'}
  ],
  blocks: [
    {p: 'Derse açılan ilk soru buydu: <i lang="de">Was ist ein Nebensatz?</i> Cevap kısa: tek başına duramayan, bir ana cümleye yaslanan cümle. Güzel haber şu ki Almancanın bu konudaki <b>tek büyük hilesi</b> var ve onu yukarıda Umut gösteriyor: bağlaç gelince çekimli fiil paketini toplayıp cümlenin sonuna taşınır.'},
    {p: 'Bu sayfadaki üç kuralı oturttuğunda, sonraki her derste yalnızca iki şey öğreneceksin: <b>bağlacın anlamı</b> ve <b>hangi zamanla kullanıldığı</b>.'},
    {rule: 'Ein Nebensatz ist ein Satz, der nicht allein stehen kann. Er hängt vom Hauptsatz ab und wird meistens durch eine Konjunktion eingeleitet. Das konjugierte Verb steht am Ende.', tr: 'Yan cümle tek başına duramayan cümledir. Ana cümleye bağlıdır ve çoğunlukla bir bağlaçla başlar. Çekimli fiil sonda durur.', note: 'Slaytta soru olarak geçiyor. Sınavda Almanca tanım istenirse bu cümleyi kullanabilirsin.'},
    {h: 'Kural 1: Çekimli fiil sona gider'},
    {p: 'Türkçede fiil zaten sondadır, bu yüzden bu kural sana yabancı değil. Ana cümlede ikinci sırada duran fiil, bağlaç gelince en sona kayar.'},
    {table: {head: ['Ana cümle', 'Yan cümle'], rows: [
      ['Ich ^habe^ keine Zeit.', '… [weil] ich keine Zeit {habe}.'],
      ['Er ^hat^ die Flasche ausgetrunken.', '… [sobald] er die Flasche ausgetrunken {hat}.'],
      ['Ich ^will^ mich entspannen.', '… [wenn] ich mich entspannen {will}.'],
      ['Der Kellner ^kommt^ endlich.', '… [bis] der Kellner endlich {kommt}.'],
      ['Sie ^ruft^ ihn ^an^.', '… [wenn] sie ihn {anruft}.']
    ]}},
    {p: 'Son satıra dikkat et: ayrılabilen fiil yan cümlede birleşir (<i lang="de">ruft … an → anruft</i>).'},
    {h: 'Kural 2: Virgül her zaman vardır'},
    {p: 'Ana cümle ile yan cümle arasına Almancada mutlaka virgül konur. Slaytlardaki tüm örneklerde bunu görürsün.'},
    {h: 'Kural 3: Yan cümle öndeyse ana cümle fiille başlar'},
    {ex: [
      ['Ich ^höre^ oft Musik, [wenn] ich zur Arbeit {fahre}.', 'İşe giderken sık sık müzik dinlerim.'],
      ['[Wenn] ich zur Arbeit {fahre}, ^höre^ ich oft Musik.', 'İşe giderken sık sık müzik dinlerim.']
    ]},
    {tip: 'Ezber: yan cümle öndeyse ortada <b>fiil, virgül, fiil</b> yan yana gelir: <i lang="de">… fahre, höre …</i>'},
    {ask: {q: 'Hangisi doğru?', o: ['Wenn ich habe Zeit, ich komme.', 'Wenn ich Zeit habe, ich komme.', 'Wenn ich Zeit habe, komme ich.'], a: 'Wenn ich Zeit habe, komme ich.', why: 'Anlamı: Vaktim olursa gelirim. İki kural birden: yan cümlede çekimli fiil en sona gider (Zeit habe), ve yan cümle öndeyse ana cümle fiille başlar, özne fiilden sonra gelir (komme ich). İlk seçenekte iki kural da, ikincide ikinci kural bozuk.'}},
    {h: 'Welche Nebensätze kennen Sie?'},
    {p: 'Slayttaki ikinci soru. Listenin tamamı aşağıda. Slaytların devamında bunlardan <b>üçü</b> kuralları ve alıştırmalarıyla işlendi; bu sitedeki dersler de tam olarak o üçünü kapsıyor.'},
    {table: {head: ['Slayttaki liste', 'Soru', 'Bu sitede'], rows: [
      ['Temporale Nebensätze', 'Wann? (Ne zaman?)', '<b>6 ders</b>'],
      ['Kausale Nebensätze', 'Warum? (Neden?)', '<b>1 ders</b>'],
      ['Konditionale Nebensätze', 'Unter welcher Bedingung? (Hangi koşulda?)', '<b>1 ders</b>'],
      ['Konsekutive Nebensätze', '', 'Slaytta yalnızca adı geçiyor'],
      ['Konzessive Nebensätze', '', 'Slaytta yalnızca adı geçiyor'],
      ['Modale Nebensätze', '', 'Slaytta yalnızca adı geçiyor'],
      ['Finalsätze', '', 'Slaytta yalnızca adı geçiyor'],
      ['Sinngerichtete Infinitivkonstruktionen', '', 'Slaytta yalnızca adı geçiyor'],
      ['Fragesätze als Nebensätze', '', 'Slaytta yalnızca adı geçiyor']
    ]}}
  ]
},
{
  id: 'wa', topic: 'wa', group: 'Temporale Nebensätze', title: 'wenn / als', sub: '“-dığında, -ınca”: en çok karıştırılan çift',
  bars: {ns: [15, 75], hs: [30, 85], cap: 'Aynı zaman dilimi: yan cümledeki olay sırasında ana cümledeki olay gerçekleşir.'},
  scene: [
    {m: 'Ich wohnte in Berlin', mv: 1, a: 'Ich war ein Kind', c: 'als', v: 1, tr: 'Çocukken Berlin’de oturuyordum. Geçmişte, tek bir dönem → als.'},
    {m: 'Ich höre oft Musik', mv: 1, a: 'Ich fahre zur Arbeit', c: 'wenn', v: 1, tr: 'İşe giderken sık sık müzik dinlerim. Şimdiki zaman, her seferinde → wenn.'},
    {m: 'Er rief mich an', mv: 1, a: 'Er war in Berlin', c: 'wenn', v: 1, tr: 'Berlin’e her gittiğinde beni arardı. Geçmiş ama tekrar eden olay → wenn.'}
  ],
  blocks: [
    {p: 'İkisi de Türkçeye “-dığında” diye çevrilir, o yüzden kulak seni yanıltır. Seçimi anlam değil, <b>iki evet/hayır sorusu</b> yapar: Geçmişte mi? Tek seferlik mi? İkisine de “evet” diyorsan <b>als</b>, diğer her durumda <b>wenn</b>.'},
    {table: {head: ['', 'Gegenwart (şimdi/gelecek)', 'Vergangenheit (geçmiş)'], rows: [
      ['einmalige temporale Handlung (tek sefer)', 'wenn', '<b>als</b>'],
      ['wiederholte temporale Handlung (tekrarlı)', 'wenn', 'wenn']
    ]}},
    {tip: 'Tablodan çıkan kural: <b>als yalnızca geçmişte ve tek seferlik</b> durumda gelir. Geri kalan her yerde wenn.'},
    {rule: 'Man gebraucht wenn im Präsens und Futur bei einmaligen Handlungen mit temporaler Aussage.', tr: 'Wenn, Präsens ve Futur’da, zaman bildiren tek seferlik eylemlerde kullanılır.'},
    {rule: 'Man benutzt wenn im Präsens und Vergangenheit bei wiederholten Handlungen und Vorgängen. Zur stärkeren Betonung kann jedes Mal oder immer vorangestellt werden.', tr: 'Wenn, Präsens ve geçmiş zamanda, tekrarlanan eylem ve olaylarda kullanılır. Daha güçlü vurgu için başına jedes Mal veya immer getirilebilir.'},
    {rule: 'Als steht in temporalen Nebensätzen bei einmaligen Handlungen, Vorgängen oder Zuständen der Vergangenheit.', tr: 'Als, zaman yan cümlelerinde geçmişteki tek seferlik eylem, olay veya durumlarda kullanılır.'},
    {h: 'Slayttaki örnekler'},
    {ex: [
      ['[Wenn] ich zur Arbeit {fahre}, ^höre^ ich oft Musik.', 'İşe giderken sık sık müzik dinlerim. → şimdi, tekrarlı'],
      ['[Als] ich ein Kind {war}, ^spielte^ ich viel draußen.', 'Çocukken çok dışarıda oynardım. → geçmişte tek bir dönem (Zustand)'],
      ['[Wenn] ich mich entspannen {will}, ^lese^ ich ein Buch.', 'Rahatlamak istediğimde kitap okurum.'],
      ['[Als] wir letztes Wochenende am See {waren}, ^haben^ wir ^gegrillt^.', 'Geçen hafta sonu göldeyken mangal yaptık. → geçmiş, tek sefer'],
      ['[Wenn] du Zeit {hast}, ^können^ wir zusammen ins Kino gehen.', 'Vaktin olduğunda birlikte sinemaya gidebiliriz.'],
      ['John F. Kennedy ^wurde^ ermordet, [als] er 1963 im offenen Auto durch die Stadt Dallas {fuhr}.', 'J. F. Kennedy, 1963’te Dallas’ta üstü açık arabayla geçerken öldürüldü.']
    ]},
    {trap: '“Çocukken” uzun bir dönem gibi görünse de tek bir dönemdir, bu yüzden <b>als</b>. Asıl ipucu: cümlede <i lang="de">immer, jedes Mal, oft, früher (her seferinde)</i> anlamı varsa geçmişte de <b>wenn</b>.'},
    {ask: {q: '___ ich gestern nach Hause kam, schlief mein Bruder schon.', o: ['Wenn', 'Als'], a: 'Als', why: 'Anlamı: Dün eve geldiğimde kardeşim çoktan uyuyordu. “gestern” (dün) olayın geçmişte ve bir kez olduğunu gösterir → als.'}},
    {ask: {q: 'Immer ___ ich meine Oma besuchte, backte sie einen Kuchen.', o: ['wenn', 'als'], a: 'wenn', why: 'Anlamı: Ne zaman büyükannemi ziyaret etsem kek yapardı. Cümle geçmişte ama “immer” (her zaman) olayın tekrar tekrar olduğunu gösterir. Geçmişte tekrarlanan olay → wenn.'}},
    {drills: ['wa1', 'wa2']}
  ]
},
{
  id: 'wh', topic: 'wh', group: 'Temporale Nebensätze', title: 'während', sub: 'İki anlam: “-iken” ve “oysa, -ken tam tersine”',
  bars: {ns: [15, 85], hs: [15, 85], cap: 'Gleichzeitigkeit: iki eylem aynı anda sürer. Zaman kipi iki cümlede de aynıdır.'},
  scene: [
    {m: 'Er las die Zeitung', mv: 1, a: 'Sie fuhr das Auto', c: 'während', v: 1, tr: 'Kadın arabayı sürerken adam gazete okudu. İki olay aynı anda.'},
    {m: 'Sie ist Vegetarierin', mv: 1, a: 'Er isst gern Fleisch', c: 'während', v: 1, tr: 'Adam et yemeyi severken kadın vejetaryen. Burada während = “oysa”, karşıtlık.'}
  ],
  blocks: [
    {p: 'İki yüzlü bir bağlaç: bazen saate bakar (“-iken”), bazen iki insanı karşılaştırır (“oysa”). Fiil her iki anlamda da sona gider; değişen yalnızca cümlenin ne anlattığı.'},
    {rule: 'Man gebraucht während im Nebensatz, wenn eine Handlung im Hauptsatz zur gleichen Zeit abläuft (Gleichzeitigkeit). Die Tempusformen im Haupt- und Nebensatz sind immer gleich.', tr: 'Ana cümledeki eylem aynı anda gerçekleşiyorsa yan cümlede während kullanılır (eşzamanlılık). Ana ve yan cümledeki zaman kipleri her zaman aynıdır.'},
    {rule: 'Während leiht einem Nebensatz auch eine adversative Bedeutung (Gegensätzlichkeit).', tr: 'Während, yan cümleye karşıtlık anlamı da kazandırır.'},
    {ex: [
      ['[Während] mein Vater am Schreibtisch {arbeitete}, ^bügelte^ meine Mutter seine Hemden.', 'Babam masasında çalışırken annem gömleklerini ütülüyordu. → temporal, ikisi de Präteritum'],
      ['Er ^hat^ in seiner Freizeit fleißig ^gelernt^, [während] seine Freunde ihre Zeit genossen {haben}.', 'Arkadaşları vakitlerinin tadını çıkarırken o boş zamanında çalışkanca ders çalıştı. → adversativ, ikisi de Perfekt']
    ]},
    {h: 'Temporal mı, adversativ mi?'},
    {p: 'Testi basit: cümlede <i lang="de">während</i> yerine <b>dagegen / aber</b> koy. Anlam bozulmuyor ve iki kişinin <b>zıt tercihleri veya alışkanlıkları</b> anlatılıyorsa adversatiftir. Aynı anda olan iki somut olaysa temporaldir.'},
    {table: {head: ['Während-Satz', 'dagegen ile', 'Anlam'], rows: [
      ['[Während] er sich über die Einladung nach Australien {freute}, ^brach^ sie in Tränen aus.', 'Er freute sich über die Einladung nach Australien, <b>dagegen</b> brach sie in Tränen aus.', 'Adversativ'],
      ['', 'Er freute sich …, <b>aber sie</b> / <b>sie aber</b> brach in Tränen aus.', 'Adversativ']
    ]}},
    {trap: '<b>dagegen</b> ana cümle bağlacıdır ve 1. sırayı doldurur, bu yüzden hemen fiil gelir: <i lang="de">dagegen brach sie</i>. <b>aber</b> ise sırayı değiştirmez: <i lang="de">aber sie brach</i>.'},
    {drills: ['wh1', 'wh2', 'wh3']}
  ]
},
{
  id: 'sb', topic: 'sb', group: 'Temporale Nebensätze', title: 'solange · bevor · ehe', sub: '“-dığı sürece” ve “-meden önce”',
  scene: [
    {m: 'Wir bleiben draußen', mv: 1, a: 'Es ist warm', c: 'solange', v: 1, tr: 'Hava sıcak olduğu sürece dışarıda kalıyoruz.'},
    {m: 'Du schließt das Fenster', mv: 1, a: 'Du verlässt das Haus', c: 'bevor', v: 1, tr: 'Evden çıkmadan önce pencereyi kapatıyorsun.'},
    {m: 'Er kauft ein Ticket', mv: 1, a: 'Er steigt in den Zug', c: 'ehe', v: 1, tr: 'Trene binmeden önce bilet alıyor.'}
  ],
  blocks: [
    {p: 'Bu derste üç bağlaç var ama aslında iki fikir: <b>solange</b> “o sürdükçe bu da sürer”, <b>bevor/ehe</b> ise “önce bu, sonra o”. İkisinde de iki cümle çoğunlukla aynı zaman kipinde kalır.'},
    {h: 'solange: “-dığı sürece, -dığı müddetçe”'},
    {barsInline: {ns: [15, 80], hs: [15, 80], cap: 'İki eylem birlikte başlar gibi sürer ve birlikte biter.'}},
    {rule: 'Solange gebraucht man bei gleichzeitig ablaufenden Handlungen, aber solange zeigt an, dass die Handlung des Hauptsatzes auch gleichzeitig mit der Handlung des Nebensatzes endet. Die Tempusformen im Haupt- und Nebensatz sind immer gleich.', tr: 'Solange aynı anda süren eylemlerde kullanılır, fakat ana cümlenin eyleminin yan cümlenin eylemiyle aynı anda bittiğini de gösterir. Ana ve yan cümlede zaman kipleri her zaman aynıdır.'},
    {ex: [['Ich ^glaube^ dir nicht, [solange] du dich so komisch {benimmst}.', 'Böyle tuhaf davrandığın sürece sana inanmıyorum.']]},
    {tip: 'Fark: <b>während</b> sadece “aynı anda” der. <b>solange</b> ek olarak “biri bitince öteki de biter” der.'},
    {h: 'bevor / ehe: “-meden önce”'},
    {barsInline: {hs: [10, 45], ns: [55, 90], cap: 'Ana cümledeki eylem ÖNCE olur. Yan cümledeki eylem SONRA.'}},
    {rule: 'Bevor und ehe werden in Nebensätzen benutzt, wenn die Handlungen des Hauptsatzes früher liegen als die Handlungen des Nebensatzes. Trotzdem wird im Deutschen im Allgemeinen im Haupt- und Nebensatz die gleiche Tempusform gebraucht.', tr: 'Bevor ve ehe, ana cümlenin eylemleri yan cümlenin eylemlerinden önce gerçekleşiyorsa kullanılır. Yine de Almancada genel olarak ana ve yan cümlede aynı zaman kipi kullanılır.'},
    {ex: [['[Ehe/Bevor] du das Haus {verlässt}, ^musst^ du deinen Papierkram erledigen.', 'Evden çıkmadan önce evrak işlerini halletmelisin.']]},
    {trap: 'Türkçede “-meden” olumsuz gibi görünür ama Almanca yan cümle olumlu kalır. <i lang="de">Bevor du das Haus verlässt</i> demek doğrudur, <i lang="de">nicht</i> eklenmez. Ayrıca <b>bevor = ehe</b>, anlam farkı yoktur.'},
    {h: 'İsimden yan cümleye'},
    {p: 'Sınavda sık çıkan dönüşüm: <i lang="de">vor + isim</i> → <i lang="de">bevor + fiil</i>; <i lang="de">während + isim (Genitiv)</i> → <i lang="de">während + fiil</i>.'},
    {table: {head: ['İsim hali', 'Yan cümle'], rows: [
      ['Vor den Semesterferien muss sie eine Klausur schreiben.', '[Bevor] die Semesterferien {beginnen}, ^muss^ sie eine Klausur schreiben.'],
      ['Während der S-Bahnfahrt zur Universität lernt sie englische Fachausdrücke.', '[Während] sie mit der S-Bahn zur Universität {fährt}, ^lernt^ sie englische Fachausdrücke.']
    ]}},
    {drills: ['sb1', 'sb2', 'sb3', 'sb4']}
  ]
},
{
  id: 'na', topic: 'na', group: 'Temporale Nebensätze', title: 'nachdem · sobald · sowie', sub: '“-dikten sonra” ve “-ir -mez”: tek zorunlu zaman değişimi',
  bars: {ns: [10, 45], hs: [55, 90], cap: 'Yan cümledeki eylem ÖNCE olur (Ungleichzeitigkeit). Bu yüzden zaman kipi değişir.'},
  scene: [
    {m: 'Er ging spazieren', mv: 1, a: 'Er hatte gegessen', c: 'nachdem', v: 1, tr: 'Yemek yedikten sonra yürüyüşe çıktı. Ana cümle Präteritum → yan cümle Plusquamperfekt.'},
    {m: 'Sie geht schlafen', mv: 1, a: 'Sie hat das Buch gelesen', c: 'nachdem', v: 1, tr: 'Kitabı okuduktan sonra uyumaya gidiyor. Ana cümle Präsens → yan cümle Perfekt.'},
    {m: 'Ich rufe dich an', mv: 1, a: 'Ich bin zu Hause', c: 'sobald', v: 1, tr: 'Eve varır varmaz seni ararım.'}
  ],
  blocks: [
    {p: 'Temporal derslerin “son bölüm canavarı” burası, çünkü zaman kipi <b>zorunlu olarak</b> değişiyor. İyi haber: değişimin tek bir formülü var ve aşağıdaki küçük tabloya sığıyor.'},
    {rule: 'In Nebensätzen mit nachdem und sobald liegen die Handlungen immer vor den Handlungen der Hauptsätze. Deswegen muss es einen Zeitenwechsel in solchen Sätzen geben (Ungleichzeitigkeit).', tr: 'Nachdem ve sobald’lı yan cümlelerde eylemler her zaman ana cümlenin eylemlerinden önce gelir. Bu yüzden bu cümlelerde zaman değişimi olmalıdır (eşzamansızlık).'},
    {table: {head: ['Nebensatz', '', 'Hauptsatz'], rows: [
      ['Perfekt', '→', 'Präsens'],
      ['Plusquamperfekt', '→', 'Präteritum']
    ]}},
    {tip: 'Ezber: yan cümle ana cümleden <b>bir adım daha eskide</b>. Fiil <b>hat/ist</b> ile ise ana cümle Präsens, <b>hatte/war</b> ile ise Präteritum.'},
    {ex: [
      ['[Nachdem] das Kind seine Hausaufgaben gemacht {hat}, ^darf^ es mit seinen Freunden spielen.', 'Çocuk ödevini yaptıktan sonra arkadaşlarıyla oynayabilir. → Perfekt → Präsens'],
      ['Du ^setzt^ dich erst an den Tisch, [nachdem] du dir deine Hände gewaschen {hast}.', 'Ellerini yıkadıktan sonra masaya oturursun. → Perfekt → Präsens'],
      ['[Nachdem] Doris das Buch ausgelesen {hatte}, ^legte^ sie sich schlafen.', 'Doris kitabı bitirdikten sonra uyumaya gitti. → Plusquamperfekt → Präteritum'],
      ['[Sobald] er die Flasche ausgetrunken {hat}, ^öffnet^ er gleich eine neue.', 'Şişeyi bitirir bitirmez hemen yenisini açar. → Perfekt → Präsens'],
      ['Ich ^kam^ nach Hause, [sobald] ich mit der Arbeit fertig geworden {war}.', 'İşi bitirir bitirmez eve geldim. → Plusquamperfekt → Präteritum'],
      ['[Sobald] ein Streit {ausbricht}, ^zieht^ er sich zurück.', 'Bir kavga çıkar çıkmaz geri çekilir. → aynı zaman, kural c'],
      ['[Nachdem] du deine Hausarbeit fertiggeschrieben {hast}, ^wirst^ du einen Urlaub machen können.', 'Ödevini yazıp bitirdikten sonra tatil yapabileceksin. → Perfekt → Futur']
    ]},
    {rule: 'Bei nachdem kann eine gewisse Zeitspanne zwischen den beiden Handlungen liegen; bei sobald folgt eine Handlung sofort auf die andere.', tr: 'Nachdem’de iki eylem arasında belirli bir süre olabilir; sobald’da bir eylem hemen ötekini izler.'},
    {rule: 'Man kann mit den Konjunktionen sobald oder sowie die gleiche Zeitform gebrauchen, wenn die Handlungen in beiden Sätzen (Nebensatz, Hauptsatz) zur gleichen Zeit stattfinden.', tr: 'İki cümledeki eylemler aynı anda oluyorsa sobald veya sowie ile aynı zaman kipi kullanılabilir.'},
    {ex: [['Meine Mutter ^bekommt^ große Angst, [sobald/sowie] sie eine Schildkröte {sieht}.', 'Annem bir kaplumbağa görür görmez çok korkar. → iki cümle de Präsens']]},
    {trap: '<b>nachdem</b> ile zaman değişimi zorunludur: <i lang="de">Nachdem ich esse, gehe ich</i> yanlıştır. <b>sobald/sowie</b> ise iki olay hemen hemen aynı anda ise aynı zamanı kabul eder.'},
    {ask: {q: 'Nachdem er gegessen ___, ging er spazieren.', o: ['hat', 'hatte', 'ist'], a: 'hatte', why: 'Anlamı: Yemek yedikten sonra yürüyüşe çıktı. Ana cümle Präteritum (ging) → yemek daha önce bittiği için yan cümle bir adım geride: Plusquamperfekt (hatte + Partizip). essen hareket fiili değil, haben ile çekimlenir → gegessen hatte.'}},
    {h: 'haben mi sein mi?'},
    {p: 'Hareket veya durum değişimi bildiren fiiller <b>sein</b> alır: <i lang="de">landen → gelandet waren, emigrieren → emigriert war, werden → geworden war, stürzen → gestürzt ist</i>. Edilgen: <i lang="de">beerdigt worden war</i>.'},
    {drills: ['na1', 'na2', 'na3', 'na4']}
  ]
},
{
  id: 'bi', topic: 'bi', group: 'Temporale Nebensätze', title: 'bis', sub: '“-e kadar, -ene dek”',
  bars: {hs: [10, 60], ns: [60, 90], cap: 'Ana cümledeki eylem, yan cümledeki olay gerçekleşene kadar sürer.'},
  scene: [
    {m: 'Wir warten hier', mv: 1, a: 'Sie kommt endlich', c: 'bis', v: 1, tr: 'O nihayet gelene kadar burada bekliyoruz.'},
    {m: 'Er arbeitete viel', mv: 1, a: 'Er hatte genug Geld gespart', c: 'bis', v: 1, tr: 'Yeterince para biriktirene kadar çok çalıştı.'}
  ],
  blocks: [
    {p: '<b>bis</b> bir bitiş çizgisi koyar: ana cümledeki iş, yan cümledeki olay gerçekleşene kadar sürer. Kuralı rahat: çoğunlukla aynı zaman. Sürpriz kısmı en sonda, Futur ile kurulan tahmin cümlelerinde.'},
    {rule: 'In Sätzen mit bis benutzt man meistens die gleiche Zeitform (Beispiele 1–4).', tr: 'Bis’li cümlelerde çoğunlukla aynı zaman kipi kullanılır.'},
    {ex: [
      ['Ich ^habe^ noch zwei Stunden, [bis] ich {weggehe}.', '1. Gitmeme daha iki saat var.'],
      ['Wie lange ^dauert^ es noch, [bis] das Spiel {anfängt}?', '2. Maçın başlamasına daha ne kadar var?'],
      ['Er ^wartet^ auf seine Freundin im Restaurant, [bis] sie {kommt}.', '3. Kız arkadaşı gelene kadar restoranda onu bekliyor.'],
      ['Sie ^war^ immer glücklich und lustig, [bis] sie {heiratete}.', '4. Evlenene kadar hep mutlu ve neşeliydi.'],
      ['Ich ^komme^ nicht vorbei, [bis] du mich {besuchst}.', 'Sen beni ziyaret edene kadar uğramam.']
    ]},
    {rule: 'Ein Zeitenwechsel ist auch möglich (Beispiele 5–7).', tr: 'Zaman değişimi de mümkündür.', note: 'Slaytta “Einen Zeitenchsel” yazıyor, bu bir yazım hatası. Doğrusu: ein Zeitenwechsel.'},
    {ex: [
      ['Der Mann ^arbeitet^ im Ausland, [bis] er genug Geld gespart {hat}.', '5. Adam yeterince para biriktirene kadar yurt dışında çalışıyor.'],
      ['[Bis] die Polizei zum Tatort {ankommt}, ^ist^ der Dieb ^weggelaufen^.', '6. Polis olay yerine varana kadar hırsız kaçmış olur.'],
      ['Das Kind ^hörte^ mit dem Weinen nicht ^auf^, [bis] seine Mutter ihm gekauft {hatte}, was es wollte.', 'Annesi istediğini alana kadar çocuk ağlamayı kesmedi.']
    ]},
    {rule: 'In Sätzen mit bis drücken Futur I und Futur II eine Vermutung aus (Beispiel 7).', tr: 'Bis’li cümlelerde Futur I ve Futur II bir tahmin bildirir.'},
    {ex: [
      ['[Bis] unser Sohn {heiratet}, ^werden^ wir in das neue Haus ^umgezogen sein^.', '7. Oğlumuz evlenene kadar yeni eve taşınmış olacağız (tahmin).'],
      ['Wir ^werden^ unsere Arbeiten ^erledigt haben^, [bis] mein Vater vom Urlaub {zurückkommt}.', 'Babam tatilden dönene kadar işlerimizi bitirmiş olacağız (tahmin).']
    ]},
    {tip: 'Futur II kalıbı: <b>werden + Partizip II + haben/sein</b>. <i lang="de">wir werden erledigt haben, wir werden umgezogen sein.</i>'},
    {drills: ['bi1']}
  ]
},
{
  id: 'se', topic: 'se', group: 'Temporale Nebensätze', title: 'seit / seitdem', sub: '“-den beri”: geçmişte başlar, şimdiye uzanır',
  bars: {ns: [10, 95], hs: [10, 95], arrow: true, cap: 'Eylem geçmişte başlar ve şu ana kadar sürer. seit = seitdem.'},
  scene: [
    {m: 'Ich bin sehr glücklich', mv: 1, a: 'Ich wohne in Konya', c: 'seit', v: 1, tr: 'Konya’da oturduğumdan beri çok mutluyum.'},
    {m: 'Sie hat Angst', mv: 1, a: 'Sie ist gestürzt', c: 'seitdem', v: 1, tr: 'Düştüğünden beri korkuyor.'}
  ],
  blocks: [
    {p: '<b>bis</b>’in tam tersi: o bir bitiş çizgisiydi, <b>seit</b> bir başlangıç çizgisi. Olay geçmişte başlar ve bugüne kadar uzanır. Türkçedeki “-den beri” ile birebir.'},
    {rule: 'Seit oder seitdem gebraucht man, wenn eine Handlung in der Vergangenheit beginnt und bis jetzt andauert.', tr: 'Seit veya seitdem, bir eylem geçmişte başlayıp şu ana kadar sürüyorsa kullanılır.'},
    {ex: [
      ['[Seit] ich in Hamburg {wohne}, ^habe^ ich Sehnsucht nach den Bergen.', 'Hamburg’da oturduğumdan beri dağları özlüyorum.'],
      ['[Seit] ich in Konya {wohne}, ^esse^ ich regelmäßig Etliekmek.', 'Konya’da oturduğumdan beri düzenli olarak etliekmek yiyorum.'],
      ['[Seitdem] die Studentin in München {lebte}, ^vermisste^ sie ihre Familie.', 'Öğrenci Münih’te yaşadığından beri ailesini özlüyordu.']
    ]},
    {rule: 'Bei parallelen Handlungen wird die gleiche Tempusform verwendet, aber wenn die Wirkung der Handlung bis in die Gegenwart andauert, benutzt man einen Zeitenwechsel.', tr: 'Paralel eylemlerde aynı zaman kipi kullanılır, fakat eylemin etkisi şimdiye kadar sürüyorsa zaman değişimi yapılır.'},
    {ex: [
      ['Sie ^hat^ ständig Schmerzen im Knie, [seit] sie beim Skifahren so schwer gestürzt {ist}.', 'Kayak yaparken o kadar kötü düştüğünden beri dizinde sürekli ağrı var. → Düşme bitti, etkisi sürüyor.'],
      ['[Seitdem] Eva Jonas zum ersten Mal gesehen {hat}, ^ist^ sie in ihn verliebt.', 'Eva, Jonas’ı ilk kez gördüğünden beri ona âşık.'],
      ['[Seitdem] die neuen Gesetze in Kraft getreten {sind}, ^herrscht^ Frieden in der Gesellschaft.', 'Yeni yasalar yürürlüğe girdiğinden beri toplumda barış hüküm sürüyor.'],
      ['Es ^gab^ weniger Unfälle, [seitdem] man das Verkehrsschild aufgestellt {hatte}.', 'Trafik levhası konduğundan beri daha az kaza oluyordu.']
    ]},
    {tip: 'Karar yolu: Yan cümledeki olay hâlâ sürüyor mu (<i lang="de">wohne, lebe</i>)? → aynı zaman. Olay bitti ama etkisi kaldı mı (<i lang="de">gestürzt ist, gesehen hat</i>)? → yan cümle bir adım daha eskide.'},
    {h: 'seit, bağlaç ve edat olarak'},
    {table: {head: ['Kullanım', 'Örnek', 'Sonrası'], rows: [
      ['Bağlaç', '[Seit] sie in Deutschland {lebt}, …', 'özne + … + fiil sonda'],
      ['Edat', 'Seit 25 Jahren lebt sie in Deutschland.', 'Dativ isim, yan cümle değil'],
      ['Zarf', '… seitdem arbeitet sie jede Woche drei Tage.', 'ana cümle, fiil 2. sırada']
    ]}},
    {trap: 'Almanca şimdiki zaman kullanır, Türkçedeki gibi geçmiş değil: <i lang="de">Seit 25 Jahren <b>lebt</b> sie in Deutschland</i>. “Lebte” dersen artık orada yaşamıyor anlamına gelir.'},
    {drills: ['se1']}
  ]
},
{
  id: 'ka', topic: 'ka', group: 'Kausale Nebensätze', title: 'weil · da · zumal', sub: 'Sebep bildiren üç bağlaç',
  scene: [
    {m: 'Ich komme heute nicht', mv: 1, a: 'Ich habe keine Zeit', c: 'weil', v: 1, tr: 'Vaktim olmadığı için bugün gelmiyorum.'},
    {m: 'Wir fuhren mit dem Bus', mv: 1, a: 'Die Züge verkehrten nicht', c: 'da', v: 2, tr: 'Trenler işlemediği için otobüsle gittik.'},
    {m: 'Ich bleibe zu Hause', mv: 1, a: 'Es regnet stark', c: 'zumal', v: 1, noflip: true, tr: 'Evde kalıyorum, üstelik yağmur da şiddetli yağıyor. zumal’lı yan cümle hep arkada durur, öne geçmez.'}
  ],
  blocks: [
    {p: 'Zaman bitti, sıra <b>Warum?</b> sorusunda. Üç bağlaç da “çünkü / -dığı için” der; aralarındaki fark yer ve üslup. Biri her yerde kullanılır, biri yazıda ve başta durur, biri de “üstelik” diye ikinci bir sebep ekler.'},
    {h: 'Slayttaki üç örnek'},
    {ex: [
      ['[Weil] man starke Schneefälle vorausgesagt {hatte}, ^wollten^ wir mit der Bahn fahren.', 'Yoğun kar yağışı beklendiği için trenle gitmek istedik.'],
      ['[Da] auch die Züge nicht {verkehrten}, ^konnten^ wir an der Konferenz nicht teilnehmen.', 'Trenler de çalışmadığı için konferansa katılamadık.'],
      ['Das ^bedauern^ wir sehr, [zumal] wir Sie gern wiedergesehen {hätten}.', 'Buna çok üzülüyoruz, üstelik sizi yeniden görmeyi çok isterdik.']
    ]},
    {h: 'weil'},
    {rule: 'Nebensätze mit weil geben den Grund an für die vorhergehende oder folgende Aussage im Beziehungssatz. Das Tempus richtet sich nach dem Sinn des Satzes. Auf die Frage warum? folgt oft eine Nebensatz-Antwort mit weil.', tr: 'Weil’li yan cümleler, bağlı olduğu cümledeki önceki veya sonraki ifadenin sebebini verir. Zaman kipi cümlenin anlamına göre belirlenir. Warum? sorusuna çoğu zaman weil’li bir yan cümleyle cevap verilir.'},
    {ex: [['Warum ^fährst^ du nicht mit uns? – [Weil] ich keine Zeit {habe}.', 'Neden bizimle gelmiyorsun? – Çünkü vaktim yok.'], ['Paul ^ist^ zum Arzt ^gegangen^, [weil] er Husten {hat}.', 'Paul öksürüğü olduğu için doktora gitti.']]},
    {h: 'da'},
    {rule: 'Die kausale Konjunktion da, gleichbedeutend mit weil, wird fast nur noch schriftlich gebraucht und steht meist am Anfang des Satzgefüges.', tr: 'Weil ile eş anlamlı olan da bağlacı neredeyse yalnızca yazılı dilde kullanılır ve çoğunlukla bileşik cümlenin başında durur.'},
    {ex: [['[Da] das Polareis immer schneller {schmilzt}, ^steigt^ der Meeresspiegel.', 'Kutup buzulları giderek hızlı eridiği için deniz seviyesi yükseliyor.']]},
    {h: 'zumal'},
    {rule: 'Der Nebensatz mit zumal gibt zu einem vorhergehenden Grund noch einen weiteren Grund an.', tr: 'Zumal’lı yan cümle, önceki bir sebebe ek olarak bir sebep daha verir.'},
    {ex: [
      ['[Weil] ich kein Geld {habe}, ^bleibe^ ich im Sommer zu Hause, [zumal] ich für meine Abschlussprüfung im Herbst lernen {muss}.', 'Param olmadığı için yazın evde kalıyorum, üstelik sonbahardaki bitirme sınavıma çalışmam gerekiyor.'],
      ['Ich ^habe^ kein Geld, deshalb ^bleibe^ ich im Sommer zu Hause, [zumal] ich für meine Abschlussprüfung im Herbst lernen {muss}.', 'Param yok, bu yüzden yazın evde kalıyorum, üstelik sınavıma çalışmam gerekiyor.'],
      ['[Wenn] du nur wenig Auto {fährst}, ^kannst^ du ein kleines Auto kaufen, [zumal] das weniger Benzin {verbraucht}.', 'Az araba kullanıyorsan küçük bir araba alabilirsin, üstelik o daha az benzin yakar.']
    ]},
    {table: {head: ['Bağlaç', 'Nerede?', 'Özelliği'], rows: [
      ['weil', 'Başta veya sonda', 'Konuşma ve yazı. Warum? sorusunun cevabı.'],
      ['da', 'Çoğunlukla başta', 'Neredeyse yalnızca yazılı dil.'],
      ['zumal', 'Sonda, başka bir sebepten sonra', 'İkinci, ek sebep verir. Tek başına ilk sebep olmaz.']
    ]}},
    {trap: 'Slaytta “bleibe ich Sommer zu Hause” yazıyor. Doğrusu <i lang="de">im Sommer</i>. Sınavda “im” yaz. Ayrıca <i lang="de">deshalb</i> yan cümle yapmaz: <i lang="de">deshalb bleibe ich</i>.'},
    {drills: ['ka1', 'ka2', 'ka3', 'ka4']}
  ]
},
{
  id: 'ko', topic: 'ko', group: 'Konditionale Nebensätze', title: 'wenn · falls', sub: '“-se, -sa” ve bağlaçsız koşul cümlesi',
  scene: [
    {m: 'Wir können zusammen essen', mv: 1, a: 'Du kommst früher', c: 'wenn', v: 1, tr: 'Daha erken gelirsen birlikte yemek yiyebiliriz.'},
    {m: 'Mein Sohn bekommt ein Fahrrad', mv: 2, a: 'Er besteht die Prüfung', c: 'falls', v: 1, tr: 'Oğlum sınavı geçerse bisiklet alacak.'},
    {m: 'Sie bekommen es bei uns', mv: 1, mkeep: true, a: 'Sie brauchen Briefpapier', v: 1, front: true, keep: true, tr: 'Mektup kâğıdına ihtiyacınız varsa bizden alabilirsiniz. Bağlaç yok, koşulu fiil kuruyor.'}
  ],
  blocks: [
    {p: 'Son durak: koşul. Umut’un burada iki numarası var. <b>wenn/falls</b> gelince fiili her zamanki gibi sona taşır; bağlaç <b>hiç gelmezse</b> fiili cümlenin en başına koyar. Sahnenin son cümlesine dikkat et.'},
    {h: 'Slayttaki örnekler'},
    {ex: [
      ['[Wenn] du früher {kommst}, ^können^ wir zusammen essen.', 'Daha erken gelirsen birlikte yemek yiyebiliriz.'],
      ['[Wenn] ich genug Geld {habe}, ^fahre^ ich nächstes Jahr nach Spanien.', 'Yeterince param olursa gelecek yıl İspanya’ya giderim.'],
      ['Ich ^verpasse^ meinen Termin, [wenn] der Bus nicht pünktlich {ist}.', 'Otobüs zamanında gelmezse randevumu kaçırırım.'],
      ['[Falls] mein Sohn seine Prüfungen mit guten Noten {besteht}, ^bekommt^ er ein Fahrrad als Geschenk.', 'Oğlum sınavlarını iyi notlarla geçerse hediye olarak bisiklet alacak.'],
      ['[Falls] du deine Schlüssel verloren {hast}, ^ruf^ den Hausmeister ^an^.', 'Anahtarlarını kaybettiysen kapıcıyı ara.'],
      ['Du ^wirst^ weiter mit der U-Bahn fahren müssen, [falls] du kein Stipendium {bekommst}.', 'Burs alamazsan metroyla gitmeye devam etmek zorunda kalacaksın.']
    ]},
    {rule: 'Konditionale Nebensätze werden meistens im Präsens gebraucht. Futur betont die Unsicherheit der Aussage.', tr: 'Koşul yan cümleleri çoğunlukla Präsens’te kullanılır. Futur, ifadenin belirsizliğini vurgular.'},
    {ex: [['Gisela ^nimmt^ an der Konferenz nicht ^teil^, [wenn] sie keine Finanzierung {findet}.', 'Gisela finansman bulamazsa konferansa katılmaz.']]},
    {rule: 'Bedingungssätze mit wenn oder falls zeigen an, dass eine Bedingung erfüllt sein muss, bevor die Handlung des Hauptsatzes erfüllt wird.', tr: 'Wenn veya falls’lı koşul cümleleri, ana cümlenin eylemi gerçekleşmeden önce bir koşulun yerine gelmesi gerektiğini gösterir.'},
    {rule: 'Falls kann nur bei eindeutig konditionalen Aussagen verwendet werden.', tr: 'Falls yalnızca açıkça koşul bildiren ifadelerde kullanılabilir.'},
    {ex: [['Ich ^kann^ nach Frankfurt fahren, [falls] der ICE rechtzeitig zur Verfügung {steht}.', 'ICE treni zamanında hazır olursa Frankfurt’a gidebilirim.']]},
    {trap: '<b>wenn</b> hem “-dığında” hem “-se” demektir. <b>falls</b> yalnızca “-se”. Yani <i lang="de">Immer wenn ich komme</i> doğru, <i lang="de">Immer falls ich komme</i> yanlış. <i lang="de">falls</i> koyabiliyorsan cümle koşuldur.'},
    {h: 'Bağlaçsız koşul: fiil başa gelir'},
    {rule: 'Bedingungssätze mit wenn oder falls können auch in Frageform gebraucht werden.', tr: 'Wenn veya falls’lı koşul cümleleri soru biçiminde de kurulabilir: bağlaç düşer, fiil başa gelir.'},
    {ex: [
      ['^Stehe^ ich morgens früh genug auf, (so) ^habe^ ich mehr Zeit zum Frühstücken.', 'Sabah yeterince erken kalkarsam kahvaltıya daha çok vaktim olur.'],
      ['^Schreibst^ du die Briefe fertig, (dann) ^darfst^ du mit deinen Freunden ins Kino gehen.', 'Mektupları bitirirsen arkadaşlarınla sinemaya gidebilirsin.'],
      ['^Brauchen^ Sie Briefpapier, (so) ^können^ Sie es direkt in Ihrer Postfiliale kaufen.', 'Mektup kâğıdına ihtiyacınız varsa doğrudan postanenizden alabilirsiniz.']
    ]},
    {tip: 'Dönüşüm üç adım: wenn’i sil → fiili başa al → virgülden sonra istersen <b>so</b> veya <b>dann</b> ekle. Slayt: <i lang="de">Statt so kann man auch dann verwenden; der Satz kann auch ohne so oder dann gebildet werden.</i>'},
    {h: 'beim + isim → wenn-Satz'},
    {table: {head: ['Beim + mastar', 'wenn-Satz'], rows: [
      ['Beim Schreiben eines Textes am Computer sollte man öfter zwischenspeichern.', '[Wenn] man einen Text am Computer {schreibt}, ^sollte^ man öfter zwischenspeichern.']
    ]}},
    {p: 'İsimleşmiş fiilden fiili geri çıkar, özne olarak genelde <i lang="de">man</i> kullan, Genitiv nesne Akkusativ olur: <i lang="de">eines Textes → einen Text</i>.'},
    {drills: ['ko1', 'ko2', 'ko3']}
  ]
}
];

// ders alıştırmaları
const P = (t, o, a, why) => ({k: 'pick', t, o, a, why});
const W = (q, a, why) => ({k: 'write', q, a: [].concat(a), why});
const F = (q, s) => ({k: 'free', q, s});

const DRILLS = {
wa1: {topic: 'wa', title: 'Übung 1: wenn oder als?', de: 'Beantworten Sie die Fragen nach folgendem Muster.', tr: 'Soruları örnekteki gibi cevaplayın. Önce bağlacı seç, sonra cümleyi yaz.',
  model: 'Wann wurde John F. Kennedy ermordet? (1963 / im offenen Auto durch die Stadt Dallas fahren) → John F. Kennedy wurde ermordet, als er 1963 im offenen Auto durch die Stadt Dallas fuhr.',
  items: [
    W('Wann verschloss man früher die Stadttore? (es / abends dunkel werden)', ['Man verschloss früher die Stadttore, wenn es abends dunkel wurde.', 'Früher verschloss man die Stadttore, wenn es abends dunkel wurde.', 'Wenn es abends dunkel wurde, verschloss man früher die Stadttore.'], 'früher = her akşam tekrarlanan olay → geçmişte de wenn.'),
    W('Wann schalten viele Deutsche abends den Fernseher ein? (um 20 Uhr / die Tagesschau beginnen)', ['Viele Deutsche schalten abends den Fernseher ein, wenn um 20 Uhr die Tagesschau beginnt.', 'Viele Deutsche schalten abends den Fernseher ein, wenn die Tagesschau um 20 Uhr beginnt.', 'Wenn um 20 Uhr die Tagesschau beginnt, schalten viele Deutsche abends den Fernseher ein.'], 'Şimdiki zaman, tekrarlı → wenn.'),
    W('Wann begann man in Deutschland mit dem Eisenbahnbau? (1835 / die erste Fahrt einer Dampflokomotive mit drei Wagen von Nürnberg nach Fürth / gelungen sein)', ['Man begann in Deutschland mit dem Eisenbahnbau, als 1835 die erste Fahrt einer Dampflokomotive mit drei Wagen von Nürnberg nach Fürth gelungen war.', 'Als 1835 die erste Fahrt einer Dampflokomotive mit drei Wagen von Nürnberg nach Fürth gelungen war, begann man in Deutschland mit dem Eisenbahnbau.'], '1835: geçmiş, tek sefer → als. “gelingen” sein alır: gelungen war.'),
    W('Wann fand Robert Koch den Tuberkelbazillus? (er / 39 Jahre alt sein)', ['Robert Koch fand den Tuberkelbazillus, als er 39 Jahre alt war.', 'Als Robert Koch 39 Jahre alt war, fand er den Tuberkelbazillus.'], 'Geçmiş, tek sefer → als.'),
    W('Wann erfuhren die Spanier, dass Kolumbus einen neuen Kontinent entdeckt hatte? (Magellan / zum ersten Mal Südamerika umfahren haben)', ['Die Spanier erfuhren, dass Kolumbus einen neuen Kontinent entdeckt hatte, als Magellan zum ersten Mal Südamerika umfahren hatte.', 'Als Magellan zum ersten Mal Südamerika umfahren hatte, erfuhren die Spanier, dass Kolumbus einen neuen Kontinent entdeckt hatte.'], 'Geçmiş, tek sefer → als. umfahren (etrafından dolaşmak) haben alır: umfahren hatte.'),
    W('Wann kommt in Deutschland kein Handwerker mehr? (man / am Freitagnachmittag / in der Werkstatt anrufen)', ['In Deutschland kommt kein Handwerker mehr, wenn man am Freitagnachmittag in der Werkstatt anruft.', 'Wenn man am Freitagnachmittag in der Werkstatt anruft, kommt in Deutschland kein Handwerker mehr.'], 'Şimdiki zaman → wenn. anrufen birleşir: anruft.'),
    W('Wann wanderten früher oft viele Menschen nach Amerika aus? (sie / in Europa / aus religiösen oder politischen Gründen / verfolgt werden)', ['Früher wanderten oft viele Menschen nach Amerika aus, wenn sie in Europa aus religiösen oder politischen Gründen verfolgt wurden.', 'Wenn sie in Europa aus religiösen oder politischen Gründen verfolgt wurden, wanderten früher oft viele Menschen nach Amerika aus.'], 'früher oft = tekrarlı → wenn. Edilgen Präteritum: verfolgt wurden.'),
    W('Wann musste sich die Bekleidungsindustrie auf der ganzen Welt neu orientieren? (der Reißverschluss / erfunden werden)', ['Die Bekleidungsindustrie musste sich auf der ganzen Welt neu orientieren, als der Reißverschluss erfunden wurde.', 'Als der Reißverschluss erfunden wurde, musste sich die Bekleidungsindustrie auf der ganzen Welt neu orientieren.'], 'Fermuar bir kez icat edildi → als.')
  ]},
wa2: {topic: 'wa', title: 'Bilden Sie drei Beispielsätze!', de: 'Bilden Sie drei Beispielsätze!', tr: 'Tablodaki kullanımlar için kendi cümleni yaz.',
  items: [
    F('Wenn, Gegenwart, tek sefer', 'Wenn ich morgen frei habe, besuche ich dich.'),
    F('Wenn, geçmiş, tekrarlı', 'Immer wenn wir in Konya waren, aßen wir Etliekmek.'),
    F('Als, geçmiş, tek sefer', 'Als ich gestern aufwachte, regnete es.')
  ]},
wh1: {topic: 'wh', title: 'Übung 4: temporal oder adversativ?', de: 'Welche Bedeutung hat während in den folgenden Sätzen: temporal oder adversativ?', tr: 'Sie und er: her cümlede während’in anlamını seç.',
  items: [
    P('Während sie das Auto fuhr, las er die Karte und sagte ihr, wohin sie fahren sollte.', ['temporal', 'adversativ'], 'temporal', 'Aynı anda olan iki eylem, karşıtlık yok.'),
    P('Während er im Urlaub gerne faulenzt, sieht sie sich gerne Kirchen und Museen an oder treibt Sport.', ['temporal', 'adversativ'], 'adversativ', 'Zıt tercihler.'),
    P('Während sie im Supermarkt Lebensmittel einkauft, wartet er ungeduldig auf dem Parkplatz im Wagen.', ['temporal', 'adversativ'], 'temporal', 'Aynı anda.'),
    P('Während er gern und viel Fleisch isst, ist sie eine strenge Vegetarierin.', ['temporal', 'adversativ'], 'adversativ', 'Zıt alışkanlık.'),
    P('Während er am Urlaubsort gerne Buchläden und Bibliotheken besucht, liebt sie das Schwimmen, Radfahren und Bergsteigen über alles.', ['temporal', 'adversativ'], 'adversativ', 'Zıt tercihler.'),
    P('Während sie am liebsten im Internet surft, informiert er sich vorwiegend durch Zeitungen und Zeitschriften.', ['temporal', 'adversativ'], 'adversativ', 'Zıt alışkanlık.'),
    P('Während er sich am Samstagabend die Sportschau ansah, holte sie die Kinder vom Training ab.', ['temporal', 'adversativ'], 'temporal', 'Belirli bir anda, aynı zamanda.'),
    P('Während er am Sonntagmorgen noch schlief, las sie Zeitung.', ['temporal', 'adversativ'], 'temporal', 'Aynı anda.'),
    P('Während er die Wochenenden gern allein mit ihr zu Hause verbringen möchte, trifft sie sich lieber mit Freunden und Bekannten.', ['temporal', 'adversativ'], 'adversativ', 'Zıt istekler.')
  ]},
wh2: {topic: 'wh', title: 'Übung 4: dagegen / aber', de: 'Formen Sie die Sätze um, die einen Gegensatz bezeichnen, indem Sie dagegen oder aber gebrauchen.', tr: 'Karşıtlık bildiren cümleleri dagegen veya aber ile yeniden yaz.',
  model: 'Während er sich über die Einladung nach Australien freute, brach sie in Tränen aus. → Er freute sich über die Einladung nach Australien, dagegen brach sie in Tränen aus.',
  items: [
    W('Während er im Urlaub gerne faulenzt, sieht sie sich gerne Kirchen und Museen an oder treibt Sport.', ['Er faulenzt im Urlaub gerne, dagegen sieht sie sich gerne Kirchen und Museen an oder treibt Sport.', 'Er faulenzt im Urlaub gerne, aber sie sieht sich gerne Kirchen und Museen an oder treibt Sport.', 'Er faulenzt im Urlaub gerne, sie aber sieht sich gerne Kirchen und Museen an oder treibt Sport.'], 'dagegen + fiil + özne.'),
    W('Während er gern und viel Fleisch isst, ist sie eine strenge Vegetarierin.', ['Er isst gern und viel Fleisch, dagegen ist sie eine strenge Vegetarierin.', 'Er isst gern und viel Fleisch, aber sie ist eine strenge Vegetarierin.', 'Er isst gern und viel Fleisch, sie aber ist eine strenge Vegetarierin.'], 'dagegen ist sie … / aber sie ist …'),
    W('Während er am Urlaubsort gerne Buchläden und Bibliotheken besucht, liebt sie das Schwimmen, Radfahren und Bergsteigen über alles.', ['Er besucht am Urlaubsort gerne Buchläden und Bibliotheken, dagegen liebt sie das Schwimmen, Radfahren und Bergsteigen über alles.', 'Er besucht am Urlaubsort gerne Buchläden und Bibliotheken, aber sie liebt das Schwimmen, Radfahren und Bergsteigen über alles.', 'Er besucht am Urlaubsort gerne Buchläden und Bibliotheken, sie aber liebt das Schwimmen, Radfahren und Bergsteigen über alles.'], 'Fiil 2. sıraya döner: besucht.'),
    W('Während sie am liebsten im Internet surft, informiert er sich vorwiegend durch Zeitungen und Zeitschriften.', ['Sie surft am liebsten im Internet, dagegen informiert er sich vorwiegend durch Zeitungen und Zeitschriften.', 'Sie surft am liebsten im Internet, aber er informiert sich vorwiegend durch Zeitungen und Zeitschriften.', 'Sie surft am liebsten im Internet, er aber informiert sich vorwiegend durch Zeitungen und Zeitschriften.'], 'dagegen informiert er sich …'),
    W('Während er die Wochenenden gern allein mit ihr zu Hause verbringen möchte, trifft sie sich lieber mit Freunden und Bekannten.', ['Er möchte die Wochenenden gern allein mit ihr zu Hause verbringen, dagegen trifft sie sich lieber mit Freunden und Bekannten.', 'Er möchte die Wochenenden gern allein mit ihr zu Hause verbringen, aber sie trifft sich lieber mit Freunden und Bekannten.', 'Er möchte die Wochenenden gern allein mit ihr zu Hause verbringen, sie aber trifft sich lieber mit Freunden und Bekannten.'], 'Modal fiil 2. sırada, mastar sonda.')
  ]},
wh3: {topic: 'wh', title: 'Bilden Sie für jede Bedeutung zwei Beispielsätze!', de: 'Bilden Sie für jede Bedeutung zwei Beispielsätze!', tr: 'Her anlam için iki cümle yaz.',
  items: [
    F('Temporal, 1. cümle', 'Während ich koche, höre ich Radio.'),
    F('Temporal, 2. cümle', 'Während die Kinder schliefen, räumten wir die Wohnung auf.'),
    F('Adversativ, 1. cümle', 'Während ich Tee liebe, trinkt mein Bruder nur Kaffee.'),
    F('Adversativ, 2. cümle', 'Während sie sehr fleißig ist, macht er kaum Hausaufgaben.')
  ]},
sb1: {topic: 'sb', title: 'Fülle die Lücken mit „solange“ oder „bevor“', de: 'Fülle die Lücken mit „solange“ oder „bevor“.', tr: 'Boşluklara solange veya bevor yaz.',
  items: [
    P('___ wir das Haus verlassen, kontrolliere ich alle Fenster.', ['Solange', 'Bevor'], 'Bevor', 'Önce pencereler, sonra çıkış.'),
    P('Du kannst das Auto fahren, ___ du den Führerschein hast.', ['solange', 'bevor'], 'solange', 'Ehliyet bitince sürüş de biter.'),
    P('___ du den Vertrag unterschreibst, solltest du ihn genau durchlesen.', ['Solange', 'Bevor'], 'Bevor', 'Önce okumak, sonra imza.'),
    P('Ich werde warten, ___ du deine Arbeit machst.', ['solange', 'bevor'], 'solange', 'Sen çalıştığın süre boyunca bekleyeceğim.'),
    P('___ der Sommer zu Ende geht, wollen wir noch einmal in den Urlaub fahren.', ['Solange', 'Bevor'], 'Bevor', 'Önce tatil, sonra yazın bitişi.'),
    P('___ es dunkel wird, müssen wir zurück zu Hause sein.', ['Solange', 'Bevor'], 'Bevor', 'Önce eve dönüş, sonra karanlık.')
  ]},
sb2: {topic: 'sb', title: 'Ergänzen Sie die Sätze', de: 'Ergänzen Sie die Sätze.', tr: 'Cümleleri tamamla. Birden çok doğru cevap var, sana yakın bir örnek veriyorum.',
  items: [
    F('Bevor du nach Hause kommst, …', 'Bevor du nach Hause kommst, kauf bitte Brot.'),
    F('…, solange es warm ist.', 'Wir sitzen im Garten, solange es warm ist.'),
    F('…, bevor sie zur Reise aufbricht.', 'Sie packt ihren Koffer, bevor sie zur Reise aufbricht.'),
    F('…, solange es nicht anfängt zu regnen.', 'Wir spielen draußen, solange es nicht anfängt zu regnen.'),
    F('Ehe das Spiel beginnt, …', 'Ehe das Spiel beginnt, kaufen wir etwas zu trinken.')
  ]},
sb3: {topic: 'sb', title: 'Bilden Sie jeweils zwei Sätze mit solange und bevor!', de: 'Bilden Sie jeweils zwei Sätze mit solange und bevor!', tr: 'Solange ve bevor ile ikişer cümle yaz.',
  items: [
    F('solange, 1. cümle', 'Solange du krank bist, bleibst du im Bett.'),
    F('solange, 2. cümle', 'Ich helfe dir, solange ich Zeit habe.'),
    F('bevor, 1. cümle', 'Bevor ich schlafe, lese ich ein Buch.'),
    F('bevor, 2. cümle', 'Wir frühstücken, bevor wir zur Uni fahren.')
  ]},
sb4: {topic: 'sb', title: 'Verwandeln: bevor oder während', de: 'Verwandeln Sie den schräg gedruckten Satzteil in einen Nebensatz mit bevor oder während.', tr: 'İtalik kısmı bevor veya während ile yan cümleye çevir.',
  model: 'Vor den Semesterferien muss sie eine Klausur schreiben. → Bevor die Semesterferien beginnen, muss sie eine Klausur schreiben.',
  items: [
    W('Während des Studiums arbeitet sie bereits an ihrer Doktorarbeit.', 'Während sie studiert, arbeitet sie bereits an ihrer Doktorarbeit.', 'das Studium → studieren.'),
    W('Sie hatte vor dem Studium eine Ausbildung zur Krankenschwester gemacht.', ['Sie hatte eine Ausbildung zur Krankenschwester gemacht, bevor sie studierte.', 'Bevor sie studierte, hatte sie eine Ausbildung zur Krankenschwester gemacht.'], 'Burada ana cümle Plusquamperfekt, çünkü daha önce olmuş.'),
    W('Vor ihrem Examen will sie für ein Semester in die USA gehen. (Examen machen)', 'Bevor sie ihr Examen macht, will sie für ein Semester in die USA gehen.', 'macht sona gider.'),
    W('Während ihres Aufenthalts in den USA kann sie bei ihrer Schwester wohnen. (sich aufhalten)', 'Während sie sich in den USA aufhält, kann sie bei ihrer Schwester wohnen.', 'Ayrılabilen fiil birleşir: aufhält.'),
    W('Ihren Mann kannte sie schon vor dem Studium.', ['Ihren Mann kannte sie schon, bevor sie studierte.', 'Bevor sie studierte, kannte sie ihren Mann schon.'], 'Präteritum: kannte / studierte.'),
    W('Vor ihrer Heirat wohnten sie in einem kleinen Apartment.', 'Bevor sie heirateten, wohnten sie in einem kleinen Apartment.', 'die Heirat → heiraten.'),
    W('Vor Verlassen der Universität will sie promovieren.', ['Bevor sie die Universität verlässt, will sie promovieren.'], 'verlassen, Akkusativ alır: die Universität.'),
    W('Während ihrer Arbeit fürs Examen findet sie wenig Zeit für ihre Familie.', 'Während sie fürs Examen arbeitet, findet sie wenig Zeit für ihre Familie.', 'die Arbeit → arbeiten.'),
    W('Vor Sonnenaufgang steht sie schon auf und setzt sich an ihren Schreibtisch.', 'Bevor die Sonne aufgeht, steht sie schon auf und setzt sich an ihren Schreibtisch.', 'der Sonnenaufgang → die Sonne geht auf → aufgeht.'),
    W('Während ihrer Vorbereitung auf die Prüfung muss ihr Mann für die Kinder sorgen. (sich vorbereiten)', 'Während sie sich auf die Prüfung vorbereitet, muss ihr Mann für die Kinder sorgen.', 'sich vorbereiten auf + Akk. Birleşik: vorbereitet.'),
    W('Vor ihrem Eintritt in das Berufsleben will sie ein Jahr Pause machen.', 'Bevor sie in das Berufsleben eintritt, will sie ein Jahr Pause machen.', 'der Eintritt → eintreten → eintritt.')
  ]},
na1: {topic: 'na', title: 'Übung 6: nachdem + Plusquamperfekt', de: 'Verwandeln Sie die schräg gedruckten Satzteile in Nebensätze mit nachdem. Bilden Sie die Nebensätze im Plusquamperfekt.', tr: '“Nach + isim” kısmını nachdem’li yan cümleye çevir, yan cümleyi Plusquamperfekt yap.',
  model: 'Nach der Entdeckung der Karibischen Inseln kehrte Kolumbus nach Europa zurück. → Nachdem Kolumbus die Karibischen Inseln entdeckt hatte, kehrte er nach Europa zurück.',
  items: [
    W('Nach der Erfindung der Glühbirne war Edison in ganz Amerika berühmt.', 'Nachdem Edison die Glühbirne erfunden hatte, war er in ganz Amerika berühmt.', 'die Erfindung → erfinden → erfunden hatte.'),
    W('Nach der Erforschung der Ursachen von Tuberkulose bekam Robert Koch den Nobelpreis.', 'Nachdem Robert Koch die Ursachen von Tuberkulose erforscht hatte, bekam er den Nobelpreis.', 'erforscht hatte.'),
    W('Nach der Veröffentlichung seiner Mozart-Biografie galt der Wissenschaftler als Experte für die Musik des 18. Jahrhunderts.', 'Nachdem der Wissenschaftler seine Mozart-Biografie veröffentlicht hatte, galt er als Experte für die Musik des 18. Jahrhunderts.', 'veröffentlicht hatte.'),
    W('Nach der Landung auf dem Mond waren Armstrong und seine Begleiter Nationalhelden.', 'Nachdem Armstrong und seine Begleiter auf dem Mond gelandet waren, waren sie Nationalhelden.', 'landen sein alır: gelandet waren.'),
    W('Nach seiner Emigration aus Deutschland lehrte Einstein als Professor an der Universität von Princeton.', 'Nachdem Einstein aus Deutschland emigriert war, lehrte er als Professor an der Universität von Princeton.', 'emigrieren sein alır: emigriert war.'),
    W('Nach der Beobachtung der Tierwelt auf den Galapagos-Inseln gewann Darwin wesentliche Erkenntnisse über die Evolution.', 'Nachdem Darwin die Tierwelt auf den Galapagos-Inseln beobachtet hatte, gewann er wesentliche Erkenntnisse über die Evolution.', 'beobachtet hatte.'),
    W('Nach der Beerdigung Friedrich Schillers (beerdigt worden sein) kümmerte sich niemand um das Grab des großen Dichters.', 'Nachdem Friedrich Schiller beerdigt worden war, kümmerte sich niemand um das Grab des großen Dichters.', 'Edilgen Plusquamperfekt: beerdigt worden war.')
  ]},
na2: {topic: 'na', title: 'Übung 4: Nachdem', de: 'Verbinden Sie die Sätze mit nachdem.', tr: 'İki cümleyi nachdem ile birleştir. “Anschließend, danach, dann, jetzt” düşer.',
  model: 'Max hatte die Hausaufgabe gemacht. Anschließend sah er fern. → Nachdem Max die Hausaufgabe gemacht hatte, sah er fern.',
  items: [
    W('Wir hatten dem Beamten unsere Pässe gezeigt. Anschließend durften wir weiterfahren.', 'Nachdem wir dem Beamten unsere Pässe gezeigt hatten, durften wir weiterfahren.', 'hatten sona.'),
    W('Ich hatte gegessen. Danach bestellte ich noch einen Kaffee.', 'Nachdem ich gegessen hatte, bestellte ich noch einen Kaffee.', 'Plusquamperfekt → Präteritum.'),
    W('Der Arzt hatte den Patienten untersucht. Anschließend sprach er mit ihm.', 'Nachdem der Arzt den Patienten untersucht hatte, sprach er mit ihm.', 'Plusquamperfekt → Präteritum.'),
    W('Lena hatte das Büro aufgeräumt. Dann aß sie zu Abend.', 'Nachdem Lena das Büro aufgeräumt hatte, aß sie zu Abend.', 'Plusquamperfekt → Präteritum.'),
    W('Klaus hat seine Arbeit beendet. Jetzt legt er die Akten in den Schrank.', 'Nachdem Klaus seine Arbeit beendet hat, legt er die Akten in den Schrank.', 'Perfekt → Präsens.'),
    W('Amira hatte die Preise verglichen. Dann kaufte sie den neuen Wagen.', 'Nachdem Amira die Preise verglichen hatte, kaufte sie den neuen Wagen.', 'Plusquamperfekt → Präteritum.'),
    W('Maria hat Pauls Telefonnummer gefunden. Jetzt ruft sie ihn an.', 'Nachdem Maria Pauls Telefonnummer gefunden hat, ruft sie ihn an.', 'Perfekt → Präsens.')
  ]},
na3: {topic: 'na', title: 'Ergänzen Sie mit „sobald“', de: 'Ergänzen Sie folgende Sätze mit der Konjunktion „sobald“!', tr: 'Parantezdeki Türkçeyi sobald’lı yan cümleye çevir.',
  items: [
    W('___ (Sen hazır olmaz), können wir ins Kino gehen.', 'Sobald du fertig bist, können wir ins Kino gehen.', 'Hazır: fertig.'),
    W('___ (O gelir gelmez), kann das Fest beginnen.', ['Sobald er kommt, kann das Fest beginnen.', 'Sobald sie kommt, kann das Fest beginnen.', 'Sobald er gekommen ist, kann das Fest beginnen.', 'Sobald sie gekommen ist, kann das Fest beginnen.'], 'Türkçe “o”, er ya da sie olabilir.'),
    W('___ (Yağmur durur durmaz), gehen wir spazieren.', ['Sobald der Regen aufhört, gehen wir spazieren.', 'Sobald es aufhört zu regnen, gehen wir spazieren.', 'Sobald der Regen aufgehört hat, gehen wir spazieren.', 'Sobald es aufgehört hat zu regnen, gehen wir spazieren.'], 'Ayrılabilen fiil birleşir: aufhört.'),
    W('___ (kitabı okumayı bitirir bitirmez), kannst du mir davon erzählen.', ['Sobald du das Buch ausgelesen hast, kannst du mir davon erzählen.', 'Sobald du das Buch zu Ende gelesen hast, kannst du mir davon erzählen.'], 'Önce okuma, sonra anlatma → Perfekt → Präsens.'),
    W('___ (hava kararır kararmaz), gehe ich nach Hause.', 'Sobald es dunkel wird, gehe ich nach Hause.', 'Hava kararmak: es wird dunkel.')
  ]},
na4: {topic: 'na', title: 'Alltägliche Routinen', de: 'Schreiben Sie Ihre alltäglichen Routinen mit den Konjunktionen Nachdem und Sobald!', tr: 'Günlük rutinlerini nachdem ve sobald ile yaz.',
  items: [
    F('Nachdem … (sabah)', 'Nachdem ich aufgestanden bin, trinke ich einen Tee.'),
    F('Nachdem … (akşam)', 'Nachdem ich gegessen habe, mache ich meine Hausaufgaben.'),
    F('Sobald … (eve gelince)', 'Sobald ich nach Hause komme, ziehe ich mich um.'),
    F('Sobald … (ders bitince)', 'Sobald der Unterricht zu Ende ist, gehe ich in die Mensa.')
  ]},
bi1: {topic: 'bi', title: 'Verbinden Sie die Sätze', de: 'Verbinden Sie die Sätze mit bis oder seit(dem).', tr: 'İki cümleyi birleştir. Slaytın yönergesi fotoğrafta görünmüyor, cümleler bis ve seit(dem) ile birleşiyor.',
  items: [
    W('Max nimmt dieses Medikament. Es geht ihm viel besser.', ['Seit Max dieses Medikament nimmt, geht es ihm viel besser.', 'Seitdem Max dieses Medikament nimmt, geht es ihm viel besser.', 'Max nimmt dieses Medikament, bis es ihm viel besser geht.'], 'Seit: ilacı alıyor ve iyi. Bis: iyileşene kadar alır. İkisi de dilbilgisi olarak doğru.'),
    W('Der Hund bellte so lange vor meiner Tür. Ich ließ ihn ins Zimmer.', 'Der Hund bellte so lange vor meiner Tür, bis ich ihn ins Zimmer ließ.', 'so lange …, bis kalıbı.'),
    W('Wir warteten fast eine halbe Stunde. Der Kellner kam endlich.', 'Wir warteten fast eine halbe Stunde, bis der Kellner endlich kam.', 'Aynı zaman: warteten / kam.'),
    W('Pavel hat mit dem Rauchen aufgehört. Er ist schrecklich nervös.', ['Seit Pavel mit dem Rauchen aufgehört hat, ist er schrecklich nervös.', 'Seitdem Pavel mit dem Rauchen aufgehört hat, ist er schrecklich nervös.'], 'Olay bitti, etkisi sürüyor → Perfekt + Präsens.'),
    W('Lisa lernt jeden Tag bis um 10.00 Uhr abends. Sie schreibt die Prüfung.', ['Bis Lisa die Prüfung schreibt, lernt sie jeden Tag bis um 10.00 Uhr abends.', 'Lisa lernt jeden Tag bis um 10.00 Uhr abends, bis sie die Prüfung schreibt.'], 'Sınav yapılana kadar her gün çalışıyor.'),
    W('Es dauert noch über eine Stunde. Der Zug kommt.', 'Es dauert noch über eine Stunde, bis der Zug kommt.', 'Es dauert …, bis kalıbı.')
  ]},
se1: {topic: 'se', title: 'Übung 7: bis oder seit? Ein Lebenslauf', de: 'bis oder seit? Setzen Sie die passende Konjunktion ein.', tr: 'Metindeki boşluklara uygun kelimeyi seç.',
  items: [
    P('___ sie vierzehn Jahre alt war, lebte sie in der Türkei.', ['Bis', 'Seit'], 'Bis', '14 yaşına kadar.'),
    P('___ 25 Jahren lebt sie nun schon in Deutschland.', ['Bis', 'Seit'], 'Seit', 'Hâlâ yaşıyor: şimdiki zaman.'),
    P('___ sie in Deutschland lebt, bemüht sie sich, die Sprache perfekt zu lernen,', ['Bis', 'Seit'], 'Seit', 'Şimdiye kadar sürüyor.'),
    P('doch ___ sie zur Kauffrau für den Einzelhandel ausgebildet war, hatte sie manchmal noch Schwierigkeiten.', ['bis', 'seit'], 'bis', 'Eğitim bitene kadar zorluk.'),
    P('___ sie ihre Abschlussprüfung bestanden hatte, arbeitete sie in einem Kaufhaus, doch sie war damit nicht zufrieden.', ['Bis', 'Seit'], 'Seit', 'Sınavı geçtikten sonra başlayıp süren durum.'),
    P('___ 1985 ist sie auch verheiratet.', ['Bis', 'Seit'], 'Seit', 'Hâlâ evli.'),
    P('___ 1986 arbeitete sie in der Lebensmittelabteilung des Kaufhauses, dann machte sie eine Umschulung und bewarb sich bei verschiedenen Banken.', ['Bis', 'Seit'], 'Bis', 'Geçmişte bitti: “dann” ile başka işe geçti.'),
    P('Schließlich fand sie eine Stelle und ___ 1988 ist sie nun bei einer Bank beschäftigt.', ['bis', 'seit'], 'seit', 'Şimdiki zaman: ist … beschäftigt.'),
    P('Diese Arbeit gefällt ihr gut. ___ ihr erstes Kind geboren wurde, hatte sie eine Vollzeitstelle; seitdem arbeitet sie jede Woche drei Tage,', ['Bis', 'Seit'], 'Bis', 'Doğuma kadar tam zamanlı, sonrası “seitdem”.'),
    P('und auch nach der Geburt des zweiten Kindes blieb sie berufstätig. ___ die Kinder selbstständig sind, will sie weiter in Teilzeit arbeiten.', ['Bis', 'Seit'], 'Bis', 'Gelecek: çocuklar büyüyene kadar.'),
    P('___ einigen Jahren hat die Familie sogar ein eigenes Haus in einem sehr schönen Wohngebiet.', ['Bis', 'Seit'], 'Seit', 'Şimdiki zaman: hat.')
  ]},
ka1: {topic: 'ka', title: 'Übung 1: Warum? – weil', de: 'Beantworten Sie die Fragen mit weil.', tr: 'Soruları ipucuyla ve weil ile cevapla.',
  model: 'Warum ist Paul zum Arzt gegangen? – Husten haben → Paul ist zum Arzt gegangen, weil er Husten hat.',
  items: [
    W('Warum sucht Thomas eine neue Arbeit? – zu wenig verdienen', 'Thomas sucht eine neue Arbeit, weil er zu wenig verdient.', 'verdient sona.'),
    W('Warum isst du keine Erdbeeren? – eine Allergie haben', 'Ich esse keine Erdbeeren, weil ich eine Allergie habe.', 'du sorusuna ich ile cevap.'),
    W('Warum ziehst du aus dieser Wohnung aus? – zu dunkel sein', 'Ich ziehe aus dieser Wohnung aus, weil sie zu dunkel ist.', 'die Wohnung → sie.'),
    W('Warum hast du die Blumen gekauft? – meine Freundin heute Geburtstag haben', 'Ich habe die Blumen gekauft, weil meine Freundin heute Geburtstag hat.', 'hat sona.'),
    W('Warum hatte Max einen Termin beim Augenarzt? – eine Brille brauchen', 'Max hatte einen Termin beim Augenarzt, weil er eine Brille brauchte.', 'Geçmiş: brauchte.'),
    W('Warum fährt Maria nicht in Urlaub? – sich krank fühlen', 'Maria fährt nicht in Urlaub, weil sie sich krank fühlt.', 'sich özneden hemen sonra.'),
    W('Warum hat Luis sich verspätet? – den Bus verpassen', 'Luis hat sich verspätet, weil er den Bus verpasst hat.', 'Perfekt: verpasst hat.'),
    W('Warum macht Jana die Fahrradtour nicht mit? – sich erkälten', ['Jana macht die Fahrradtour nicht mit, weil sie sich erkältet hat.', 'Jana macht die Fahrradtour nicht mit, weil sie erkältet ist.'], 'Soğuk algınlığı önce oldu → Perfekt.')
  ]},
ka2: {topic: 'ka', title: 'Übung 1 a): Auf der Feier', de: 'Eine Gruppe internationaler Studenten trifft sich abends auf einer Feier. Alle sind froh, aber jeder hat einen anderen Grund. Bilden Sie Sätze mit weil.', tr: 'Herkes partide mutlu, ama nedeni farklı. Weil ile cümle kur.',
  model: 'Alina: Ich habe meine Seminararbeit abgegeben. → Alina ist froh, weil sie ihre Seminararbeit abgegeben hat.',
  items: [
    W('Benjamin: Ich habe einen Physikprofessor aus den USA kennengelernt.', 'Benjamin ist froh, weil er einen Physikprofessor aus den USA kennengelernt hat.', 'ich → er, kennengelernt hat.'),
    W('Christiano: Hier kann ich mal richtig tanzen.', 'Christiano ist froh, weil er hier mal richtig tanzen kann.', 'Modal fiil en sonda.'),
    W('Danuta: Ich kann Zeit mit meinen Freunden verbringen.', 'Danuta ist froh, weil sie Zeit mit ihren Freunden verbringen kann.', 'meinen → ihren.'),
    W('Eosebio: Ich kann mich hier mal in meiner Muttersprache unterhalten.', 'Eosebio ist froh, weil er sich hier mal in seiner Muttersprache unterhalten kann.', 'meiner → seiner, mich → sich.'),
    W('Felicia: Ich muss nicht allein sein.', 'Felicia ist froh, weil sie nicht allein sein muss.', 'muss sona.'),
    W('Gerry: Ich kann hier meine Sorgen vergessen.', 'Gerry ist froh, weil er hier seine Sorgen vergessen kann.', 'meine → seine.'),
    W('Hakan: Ich bin so verliebt.', 'Hakan ist froh, weil er so verliebt ist.', 'ist sona.')
  ]},
ka3: {topic: 'ka', title: 'Übung 1 b): Zu spät im Kurs', de: 'Am nächsten Morgen kommen alle zu spät in den Kurs. Jeder hat eine andere Ausrede. Bilden Sie Sätze mit weil.', tr: 'Ertesi sabah herkes geç kalıyor. Weil ile bahanelerini yaz.',
  model: 'Alina: Die Busfahrer haben gestreikt. → Alina ist zu spät gekommen, weil die Busfahrer gestreikt haben.',
  items: [
    W('Benjamin: Ich musste die Kinder in den Kindergarten bringen.', 'Benjamin ist zu spät gekommen, weil er die Kinder in den Kindergarten bringen musste.', 'musste sona.'),
    W('Christiano: Ich bin im Stau stecken geblieben.', 'Christiano ist zu spät gekommen, weil er im Stau stecken geblieben ist.', 'ist sona.'),
    W('Danuta: Die Straßenbahn hatte Verspätung.', 'Danuta ist zu spät gekommen, weil die Straßenbahn Verspätung hatte.', 'hatte sona.'),
    W('Eosebio: Ich bin aus Versehen in den falschen Zug eingestiegen.', 'Eosebio ist zu spät gekommen, weil er aus Versehen in den falschen Zug eingestiegen ist.', 'eingestiegen ist.'),
    W('Felicia: Ich habe verschlafen.', 'Felicia ist zu spät gekommen, weil sie verschlafen hat.', 'verschlafen hat.'),
    W('Gerry: Mein Motorrad ist nicht angesprungen.', 'Gerry ist zu spät gekommen, weil sein Motorrad nicht angesprungen ist.', 'mein → sein.'),
    W('Hakan: Jemand hat mir mein Fahrrad aus dem Keller gestohlen.', ['Hakan ist zu spät gekommen, weil jemand ihm sein Fahrrad aus dem Keller gestohlen hat.', 'Hakan ist zu spät gekommen, weil ihm jemand sein Fahrrad aus dem Keller gestohlen hat.'], 'mir → ihm, mein → sein.')
  ]},
ka4: {topic: 'ka', title: 'Bilden Sie Sätze mit da', de: 'Bilden Sie Sätze nach folgendem Muster.', tr: 'Örnekteki gibi da ile birleştir.',
  model: 'Das Polareis schmilzt immer schneller. Der Meeresspiegel steigt. → Da das Polareis immer schneller schmilzt, steigt der Meeresspiegel.',
  items: [
    W('Der Meeresspiegel steigt. Viele Inseln sind gefährdet.', 'Da der Meeresspiegel steigt, sind viele Inseln gefährdet.', 'fiil, virgül, fiil.'),
    W('Viele Inseln liegen nur wenige Meter über dem Meeresspiegel. Sie könnten überschwemmt werden.', 'Da viele Inseln nur wenige Meter über dem Meeresspiegel liegen, könnten sie überschwemmt werden.', 'liegen sona.'),
    W('Viele Inseln könnten überschwemmt werden. Es muss endlich etwas getan werden.', 'Da viele Inseln überschwemmt werden könnten, muss endlich etwas getan werden.', 'könnten en sona. “es” düşer.'),
    W('Schutzmaßnahmen für die Bevölkerung sind notwendig. Die Verantwortlichen sollten handeln.', 'Da Schutzmaßnahmen für die Bevölkerung notwendig sind, sollten die Verantwortlichen handeln.', 'sind sona.'),
    W('Die Verantwortlichen handeln aber nicht. Katastrophen sind vorhersehbar.', 'Da die Verantwortlichen aber nicht handeln, sind Katastrophen vorhersehbar.', 'handeln sona.'),
    W('Man muss Unheil für viele Menschen befürchten. Die Weltgemeinschaft sollte sich um die Probleme kümmern.', 'Da man Unheil für viele Menschen befürchten muss, sollte sich die Weltgemeinschaft um die Probleme kümmern.', 'muss sona.')
  ]},
ko1: {topic: 'ko', title: 'Übung 1: Dienstleistungen der Post', de: 'Verbinden Sie die Sätze.', tr: 'Cümleleri wenn ile birleştir.',
  model: 'Sie brauchen Briefpapier? Sie können es direkt in Ihrer Postfiliale kaufen. → Wenn Sie Briefpapier brauchen, können Sie es direkt in Ihrer Postfiliale kaufen.',
  items: [
    W('Die Adresse stimmt nicht. Der Brief geht an den Absender zurück.', ['Wenn die Adresse nicht stimmt, geht der Brief an den Absender zurück.', 'Der Brief geht an den Absender zurück, wenn die Adresse nicht stimmt.'], 'nicht, fiilden önce.'),
    W('Sie schreiben eine Postkarte. Es ist billiger als ein Brief.', ['Wenn Sie eine Postkarte schreiben, ist es billiger als ein Brief.', 'Es ist billiger als ein Brief, wenn Sie eine Postkarte schreiben.'], 'schreiben sona.'),
    W('Ihr Brief enthält wichtige Dokumente. Sie schicken ihn am besten per Einschreiben.', ['Wenn Ihr Brief wichtige Dokumente enthält, schicken Sie ihn am besten per Einschreiben.', 'Sie schicken Ihren Brief am besten per Einschreiben, wenn er wichtige Dokumente enthält.'], 'enthält sona.'),
    W('Ihr Brief ist kleiner oder größer als normal. Er ist teurer.', ['Wenn Ihr Brief kleiner oder größer als normal ist, ist er teurer.', 'Ihr Brief ist teurer, wenn er kleiner oder größer als normal ist.'], 'ist, ist: fiil, virgül, fiil.'),
    W('Ihr Brief geht nach Südamerika. Er kostet mehr Porto als innerhalb Europas.', ['Wenn Ihr Brief nach Südamerika geht, kostet er mehr Porto als innerhalb Europas.', 'Ihr Brief kostet mehr Porto als innerhalb Europas, wenn er nach Südamerika geht.'], 'geht sona.'),
    W('Ein Päckchen enthält nur Bücher. Sie können es als Büchersendung billiger verschicken.', ['Wenn ein Päckchen nur Bücher enthält, können Sie es als Büchersendung billiger verschicken.', 'Sie können ein Päckchen als Büchersendung billiger verschicken, wenn es nur Bücher enthält.'], 'enthält sona.'),
    W('Eine Sendung wiegt mehr als 2 Kilo. Sie müssen eine Paketkarte ausfüllen.', ['Wenn eine Sendung mehr als 2 Kilo wiegt, müssen Sie eine Paketkarte ausfüllen.', 'Sie müssen eine Paketkarte ausfüllen, wenn eine Sendung mehr als 2 Kilo wiegt.'], 'wiegt sona.'),
    W('Sie haben ein Konto bei der Postbank. Sie können in allen Postfilialen in Deutschland gebührenfrei Geld abheben.', ['Wenn Sie ein Konto bei der Postbank haben, können Sie in allen Postfilialen in Deutschland gebührenfrei Geld abheben.', 'Sie können in allen Postfilialen in Deutschland gebührenfrei Geld abheben, wenn Sie ein Konto bei der Postbank haben.'], 'haben sona.')
  ]},
ko2: {topic: 'ko', title: 'Übung 2: Konditionalsätze ohne wenn', de: 'Bilden Sie Konditionalsätze ohne wenn. Verwenden Sie die Sätze der Übung 1.', tr: 'Bu kez wenn olmadan yaz: fiil başa. So/dann istersen ekle, kontrol ikisini de kabul eder.',
  model: 'Brauchen Sie Briefpapier, (so) können Sie es direkt in Ihrer Postfiliale kaufen.',
  items: [
    W('Die Adresse stimmt nicht. Der Brief geht an den Absender zurück.', 'Stimmt die Adresse nicht, (so) geht der Brief an den Absender zurück.', 'Fiil başa.'),
    W('Sie schreiben eine Postkarte. Es ist billiger als ein Brief.', 'Schreiben Sie eine Postkarte, (so) ist es billiger als ein Brief.', 'Fiil başa.'),
    W('Ihr Brief enthält wichtige Dokumente. Sie schicken ihn am besten per Einschreiben.', 'Enthält Ihr Brief wichtige Dokumente, (so) schicken Sie ihn am besten per Einschreiben.', 'Fiil başa.'),
    W('Ihr Brief ist kleiner oder größer als normal. Er ist teurer.', 'Ist Ihr Brief kleiner oder größer als normal, (so) ist er teurer.', 'Fiil başa.'),
    W('Ihr Brief geht nach Südamerika. Er kostet mehr Porto als innerhalb Europas.', 'Geht Ihr Brief nach Südamerika, (so) kostet er mehr Porto als innerhalb Europas.', 'Fiil başa.'),
    W('Ein Päckchen enthält nur Bücher. Sie können es als Büchersendung billiger verschicken.', 'Enthält ein Päckchen nur Bücher, (so) können Sie es als Büchersendung billiger verschicken.', 'Fiil başa.'),
    W('Eine Sendung wiegt mehr als 2 Kilo. Sie müssen eine Paketkarte ausfüllen.', 'Wiegt eine Sendung mehr als 2 Kilo, (so) müssen Sie eine Paketkarte ausfüllen.', 'Fiil başa.'),
    W('Sie haben ein Konto bei der Postbank. Sie können in allen Postfilialen in Deutschland gebührenfrei Geld abheben.', 'Haben Sie ein Konto bei der Postbank, (so) können Sie in allen Postfilialen in Deutschland gebührenfrei Geld abheben.', 'Fiil başa.')
  ]},
ko3: {topic: 'ko', title: 'Übung 3: Am Computer', de: 'Bilden Sie aus dem schräg gedruckten Satzteil einen wenn-Satz.', tr: 'Beim/zum + isim kısmını wenn’li yan cümleye çevir.',
  model: 'Beim Schreiben eines Textes am Computer sollte man öfter zwischenspeichern. → Wenn man einen Text am Computer schreibt, sollte man öfter zwischenspeichern.',
  items: [
    W('Auch beim Bestellen von Waren im Internet hat man ein Rückgaberecht.', ['Auch wenn man Waren im Internet bestellt, hat man ein Rückgaberecht.', 'Wenn man Waren im Internet bestellt, hat man auch ein Rückgaberecht.'], 'bestellen → bestellt.'),
    W('Beim Speichern einer Datei sollte man den richtigen Ordner benutzen.', 'Wenn man eine Datei speichert, sollte man den richtigen Ordner benutzen.', 'einer Datei → eine Datei.'),
    W('Im Büro sollte man zum Surfen im Internet die Genehmigung seines Chefs haben.', ['Wenn man im Büro im Internet surft, sollte man die Genehmigung seines Chefs haben.', 'Im Büro sollte man die Genehmigung seines Chefs haben, wenn man im Internet surft.', 'Wenn man im Büro im Internet surfen will, sollte man die Genehmigung seines Chefs haben.', 'Im Büro sollte man die Genehmigung seines Chefs haben, wenn man im Internet surfen will.'], 'zum Surfen → wenn man surft / surfen will.'),
    W('Beim Auftreten einer Störung kann man eine Hotline anrufen.', 'Wenn eine Störung auftritt, kann man eine Hotline anrufen.', 'Özne: eine Störung. auftritt birleşik.'),
    W('Beim Anrufen einer Hotline ist man oft sehr lange in der Warteschleife.', 'Wenn man eine Hotline anruft, ist man oft sehr lange in der Warteschleife.', 'anruft birleşik.'),
    W('Beim Suchen nach Informationen im Internet benutzt man Suchmaschinen.', 'Wenn man nach Informationen im Internet sucht, benutzt man Suchmaschinen.', 'suchen nach + Dativ.'),
    W('Beim Arbeiten unterwegs ist ein Notebook nützlich.', 'Wenn man unterwegs arbeitet, ist ein Notebook nützlich.', 'arbeitet sona.'),
    W('Beim Anschauen von digitalen Fotos am Computer kann man die Funktion „Diashow“ benutzen.', ['Wenn man digitale Fotos am Computer anschaut, kann man die Funktion „Diashow“ benutzen.', 'Wenn man sich digitale Fotos am Computer anschaut, kann man die Funktion „Diashow“ benutzen.'], 'von digitalen Fotos → digitale Fotos.'),
    W('Beim Herunterladen von Musik aus dem Internet sollte man das Urheberrecht beachten.', 'Wenn man Musik aus dem Internet herunterlädt, sollte man das Urheberrecht beachten.', 'herunterladen → herunterlädt (a → ä).'),
    W('Beim Kauf von Software muss man immer prüfen, ob sie für den eigenen Computer auch geeignet ist.', 'Wenn man Software kauft, muss man immer prüfen, ob sie für den eigenen Computer auch geeignet ist.', 'der Kauf → kaufen.'),
    W('Beim Eingeben seines Passworts muss man darauf achten, dass es niemand sieht.', 'Wenn man sein Passwort eingibt, muss man darauf achten, dass es niemand sieht.', 'eingeben → eingibt (e → i). seines → sein.')
  ]}
};

// deneme sınavı havuzu, dersteki cümleler tekrar etmesin diye hepsi yeni
const M = (t, q, o, a, why) => ({t, k: 'pick', q, o, a, why});
const R = (t, q, a, why) => ({t, k: 'write', q, a: [].concat(a), why});
const POOL = [
M('wa', '___ Mozart fünf Jahre alt war, komponierte er seine ersten Stücke.', ['Wenn', 'Als'], 'Als', 'Geçmiş, tek bir dönem.'),
M('wa', 'Jedes Mal, ___ es regnete, blieben wir zu Hause.', ['wenn', 'als'], 'wenn', 'jedes Mal = tekrarlı.'),
M('wa', '___ du morgen kommst, zeige ich dir die Fotos.', ['Wenn', 'Als'], 'Wenn', 'Gelecek, tek sefer → wenn.'),
M('wa', '___ ich letzte Woche in Berlin war, traf ich meinen Lehrer.', ['Wenn', 'Als'], 'Als', 'letzte Woche: tek sefer, geçmiş.'),
M('wa', 'Welche Regel ist richtig? Als steht bei …', ['wiederholten Handlungen im Präsens', 'einmaligen Handlungen der Vergangenheit', 'einmaligen Handlungen im Futur'], 'einmaligen Handlungen der Vergangenheit', 'Als: yalnızca geçmiş ve tek sefer.'),
M('wa', 'Tablo: wiederholte temporale Handlung + Vergangenheit = ?', ['wenn', 'als'], 'wenn', 'Tekrarlı ise geçmişte de wenn.'),
M('wh', 'Während er kochte, ___ sie den Tisch.', ['deckt', 'deckte', 'hat gedeckt'], 'deckte', 'Während: iki cümlede aynı zaman kipi.'),
M('wh', 'Während Anna immer Tee trinkt, trinkt Ben nur Kaffee. Bedeutung?', ['temporal', 'adversativ'], 'adversativ', 'Zıt alışkanlıklar.'),
M('wh', 'Während ich dusche, klingelt das Telefon. Bedeutung?', ['temporal', 'adversativ'], 'temporal', 'Aynı anda.'),
M('wh', 'Was bedeutet „Gleichzeitigkeit“?', ['Zwei Handlungen laufen zur gleichen Zeit ab.', 'Eine Handlung liegt vor der anderen.', 'Zwei Handlungen stehen im Gegensatz.'], 'Zwei Handlungen laufen zur gleichen Zeit ab.', 'Gleichzeitigkeit: eşzamanlılık.'),
M('wh', 'Er liebt das Meer, ___ sie die Berge liebt. (Gegensatz, Nebensatz)', ['dagegen', 'während', 'aber'], 'während', 'Fiil sonda (liebt) → bağlaç gerekir: während.'),
M('sb', 'Ich bleibe bei dir, ___ du mich brauchst.', ['solange', 'bevor'], 'solange', 'Sen ihtiyaç duyduğun süre boyunca.'),
M('sb', '___ ich ins Bett gehe, putze ich mir die Zähne.', ['Solange', 'Bevor'], 'Bevor', 'Önce dişler.'),
M('sb', '„Solange“ zeigt an, dass die Handlung des Hauptsatzes …', ['vor dem Nebensatz liegt', 'gleichzeitig mit dem Nebensatz endet', 'nach dem Nebensatz beginnt'], 'gleichzeitig mit dem Nebensatz endet', 'Slayt kuralı.'),
M('sb', 'Welche Konjunktion ist gleichbedeutend mit bevor?', ['ehe', 'seit', 'sobald'], 'ehe', 'bevor = ehe.'),
M('sb', 'Bevor er ging, ___ er die Tür ab.', ['schließt', 'schloss', 'hat geschlossen'], 'schloss', 'Bevor: aynı zaman kipi.'),
M('na', 'Nachdem wir angekommen ___, riefen wir unsere Eltern an.', ['sind', 'waren', 'hatten'], 'waren', 'Präteritum → Plusquamperfekt. ankommen sein alır.'),
M('na', 'Nachdem sie die E-Mail geschrieben hat, ___ sie den Computer aus.', ['schaltet', 'schaltete', 'hat geschaltet'], 'schaltet', 'Perfekt → Präsens.'),
M('na', 'Nachdem er das Examen bestanden hatte, ___ er eine Reise.', ['macht', 'machte', 'hat gemacht'], 'machte', 'Plusquamperfekt → Präteritum.'),
M('na', 'Welcher Unterschied ist richtig?', ['Bei nachdem folgt die Handlung sofort, bei sobald liegt eine Zeitspanne dazwischen.', 'Bei nachdem kann eine Zeitspanne dazwischen liegen, bei sobald folgt die Handlung sofort.', 'Es gibt keinen Unterschied.'], 'Bei nachdem kann eine Zeitspanne dazwischen liegen, bei sobald folgt die Handlung sofort.', 'Slayt kuralı b.'),
M('na', '___ er die Schildkröte sieht, läuft er weg. (hemen, aynı anda)', ['Sowie', 'Nachdem', 'Bevor'], 'Sowie', 'sobald/sowie aynı kiple kullanılır.'),
M('na', 'Was ist „Ungleichzeitigkeit“?', ['Die Handlung des Nebensatzes liegt vor der Handlung des Hauptsatzes.', 'Beide Handlungen enden gleichzeitig.', 'Beide Sätze stehen im Präsens.'], 'Die Handlung des Nebensatzes liegt vor der Handlung des Hauptsatzes.', 'Bu yüzden Zeitenwechsel gerekir.'),
M('bi', 'Warte hier, ___ ich zurückkomme.', ['bis', 'seit', 'nachdem'], 'bis', 'Dönene kadar.'),
M('bi', 'Es dauert noch lange, ___ der Bus kommt.', ['bis', 'seit', 'als'], 'bis', 'Es dauert …, bis.'),
M('bi', 'In Sätzen mit bis drücken Futur I und Futur II … aus.', ['einen Gegensatz', 'eine Vermutung', 'einen Grund'], 'eine Vermutung', 'Slayt kuralı c.'),
M('bi', 'Bis du kommst, ___ ich die Arbeit beendet haben.', ['werde', 'habe', 'hatte'], 'werde', 'Futur II: werde … beendet haben.'),
M('se', '___ er in Berlin wohnt, ist er glücklicher.', ['Bis', 'Seit', 'Bevor'], 'Seit', 'Şimdiye uzanıyor.'),
M('se', '___ zwei Jahren lerne ich Deutsch.', ['Seit', 'Bis', 'Vor'], 'Seit', 'Hâlâ öğreniyorum: seit + Präsens.'),
M('se', 'Seitdem ich Sport mache, ___ ich mich besser.', ['fühle', 'fühlte', 'gefühlt habe'], 'fühle', 'Paralel eylem: aynı kip.'),
M('se', 'Seit oder seitdem gebraucht man, wenn eine Handlung …', ['in der Vergangenheit beginnt und bis jetzt andauert', 'in der Zukunft beginnt', 'sofort endet'], 'in der Vergangenheit beginnt und bis jetzt andauert', 'Slayt kuralı.'),
M('se', 'Seit sie umgezogen ___, hat sie viele neue Freunde.', ['hat', 'ist', 'war'], 'ist', 'umziehen sein alır, Perfekt + Präsens.'),
M('ka', 'Warum kommst du nicht mit? – ___ ich krank bin.', ['Weil', 'Da', 'Zumal'], 'Weil', 'Warum? cevabı: weil.'),
M('ka', 'Die Konjunktion da wird …', ['fast nur noch schriftlich gebraucht', 'nur mündlich gebraucht', 'nur im Futur gebraucht'], 'fast nur noch schriftlich gebraucht', 'Slayt kuralı.'),
M('ka', 'Der Nebensatz mit zumal …', ['gibt das Ziel an', 'gibt noch einen weiteren Grund an', 'gibt eine Bedingung an'], 'gibt noch einen weiteren Grund an', 'Ek sebep.'),
M('ka', 'Welcher Satz ist richtig?', ['Ich bleibe zu Hause, weil ich bin müde.', 'Ich bleibe zu Hause, weil ich müde bin.', 'Ich bleibe zu Hause weil ich müde bin.'], 'Ich bleibe zu Hause, weil ich müde bin.', 'Fiil sonda ve virgül var.'),
M('ka', 'Ich kaufe das Auto nicht, weil es zu teuer ist, ___ ich gerade kein Geld habe.', ['zumal', 'falls', 'bevor'], 'zumal', 'İkinci sebep.'),
M('ko', 'Konditionale Nebensätze werden meistens im … gebraucht.', ['Präsens', 'Präteritum', 'Plusquamperfekt'], 'Präsens', 'Slayt kuralı a.'),
M('ko', 'Futur im Konditionalsatz betont …', ['die Unsicherheit der Aussage', 'eine Wiederholung', 'einen Grund'], 'die Unsicherheit der Aussage', 'Slayt kuralı a.'),
M('ko', '___ du Zeit, (so) komm bitte vorbei.', ['Hast', 'Wenn', 'Falls'], 'Hast', 'Bağlaçsız koşul: fiil başta.'),
M('ko', 'Kommst du früher, ___ können wir zusammen essen.', ['dann', 'als', 'weil'], 'dann', 'so veya dann.'),
M('ko', 'Immer ___ ich nach Hause komme, koche ich zuerst Tee.', ['wenn', 'falls'], 'wenn', 'Zaman ve tekrar: falls olmaz.'),
M('ko', 'Falls kann nur bei … verwendet werden.', ['eindeutig konditionalen Aussagen', 'temporalen Aussagen', 'kausalen Aussagen'], 'eindeutig konditionalen Aussagen', 'Slayt kuralı c.'),
R('wa', 'wenn/als: Ich war zehn Jahre alt. Wir zogen nach Ankara. (Yan cümle önde)', 'Als ich zehn Jahre alt war, zogen wir nach Ankara.', 'Tek sefer, geçmiş.'),
R('wh', 'Während des Essens telefoniert er. (während + fiil, essen)', 'Während er isst, telefoniert er.', 'essen → isst.'),
R('sb', 'Vor der Abfahrt kauft sie eine Fahrkarte. (abfahren, sie)', 'Bevor sie abfährt, kauft sie eine Fahrkarte.', 'abfahren → abfährt.'),
R('na', 'Nach dem Essen ging er spazieren. (nachdem, er)', 'Nachdem er gegessen hatte, ging er spazieren.', 'Plusquamperfekt → Präteritum.'),
R('na', 'Er hat geduscht. Jetzt frühstückt er. (nachdem)', 'Nachdem er geduscht hat, frühstückt er.', 'Perfekt → Präsens.'),
R('bi', 'Ich warte hier. Du kommst. (bis)', 'Ich warte hier, bis du kommst.', 'Aynı kip.'),
R('se', 'Sie wohnt in Konya. Sie ist sehr glücklich. (seit, yan cümle önde)', ['Seit sie in Konya wohnt, ist sie sehr glücklich.', 'Seitdem sie in Konya wohnt, ist sie sehr glücklich.'], 'Paralel eylem.'),
R('ka', 'Warum lernst du so viel? – die Prüfung schwer sein (weil, ich lerne …)', 'Ich lerne so viel, weil die Prüfung schwer ist.', 'ist sona.'),
R('ka', 'Es regnet stark. Das Spiel fällt aus. (da, yan cümle önde)', 'Da es stark regnet, fällt das Spiel aus.', 'regnet sona, fiil-virgül-fiil.'),
R('ko', 'Wenn du müde bist, kannst du schlafen. (wenn’siz yaz, so kullanma)', 'Bist du müde, kannst du schlafen.', 'Fiil başa.'),
R('ko', 'Beim Lernen hört sie Musik. (wenn, sie)', 'Wenn sie lernt, hört sie Musik.', 'lernen → lernt.')
];

// kartlar
const CARDS = [
['Bağlaç', 'wenn', '-dığında (Gegenwart; geçmişte tekrarlı) / -se, -sa'],
['Bağlaç', 'als', '-dığında: yalnızca geçmişte tek sefer'],
['Bağlaç', 'während', '-iken (temporal) / oysa, -ken (adversativ)'],
['Bağlaç', 'solange', '-dığı sürece; ikisi birlikte biter'],
['Bağlaç', 'bevor / ehe', '-meden önce; ana cümle önce olur, kip aynı'],
['Bağlaç', 'nachdem', '-dikten sonra; Perfekt → Präsens, Plusquamperfekt → Präteritum'],
['Bağlaç', 'sobald / sowie', '-ir -mez; hemen ardından; aynı anda ise aynı kip'],
['Bağlaç', 'bis', '-e kadar; çoğunlukla aynı kip, Futur = tahmin'],
['Bağlaç', 'seit / seitdem', '-den beri; geçmişte başlar, şimdiye sürer'],
['Bağlaç', 'weil', 'çünkü, -dığı için; Warum? cevabı'],
['Bağlaç', 'da', '-dığı için; yazılı dil, genelde başta'],
['Bağlaç', 'zumal', 'üstelik, hele ki; ek ikinci sebep'],
['Bağlaç', 'falls', '-se, -sa; yalnızca açık koşul'],
['Terim', 'der Hauptsatz', 'ana cümle'],
['Terim', 'der Nebensatz', 'yan cümle'],
['Terim', 'das Satzgefüge', 'bileşik cümle (ana + yan)'],
['Terim', 'der Beziehungssatz', 'bağlı olduğu cümle'],
['Terim', 'die Konjunktion', 'bağlaç'],
['Terim', 'die Handlung', 'eylem'],
['Terim', 'der Vorgang', 'olay, süreç'],
['Terim', 'der Zustand', 'durum'],
['Terim', 'einmalig', 'tek seferlik'],
['Terim', 'wiederholt', 'tekrarlı'],
['Terim', 'die Gegenwart', 'şimdiki zaman, günümüz'],
['Terim', 'die Vergangenheit', 'geçmiş zaman'],
['Terim', 'die Gleichzeitigkeit', 'eşzamanlılık'],
['Terim', 'die Ungleichzeitigkeit', 'eşzamansızlık'],
['Terim', 'der Zeitenwechsel', 'zaman (kipi) değişimi'],
['Terim', 'die Tempusform / Zeitform', 'zaman kipi'],
['Terim', 'adversativ', 'karşıtlık bildiren'],
['Terim', 'die Gegensätzlichkeit', 'karşıtlık'],
['Terim', 'die Bedingung', 'koşul'],
['Terim', 'die Vermutung', 'tahmin, varsayım'],
['Terim', 'die Unsicherheit', 'belirsizlik'],
['Terim', 'die Aussage', 'ifade, önerme'],
['Terim', 'der Grund', 'sebep'],
['Terim', 'die Betonung / betonen', 'vurgu / vurgulamak'],
['Terim', 'schräg gedruckt', 'italik yazılmış'],
['Tahta', 'sich vorstellen', 'kendini tanıtmak; hayal etmek'],
['Tahta', 'die Vorstellung', 'tanıtım; hayal, fikir'],
['Tahta', 'die Erklärung', 'açıklama'],
['Tahta', 'umfangreich', 'kapsamlı'],
['Tahta', 'gebrauchen / verwenden', 'kullanmak'],
['Tahta', 'erwähnen', 'değinmek, söz etmek'],
['Tahta', 'umformen', 'dönüştürmek, başka biçimde yazmak'],
['Tahta', 'sich freuen auf / über', '-i dört gözle beklemek / -e sevinmek'],
['Kelime', 'die Stadttore verschließen', 'şehir kapılarını kilitlemek'],
['Kelime', 'verfolgt werden', 'zulme uğramak, takip edilmek'],
['Kelime', 'auswandern', 'göç etmek (dışarı)'],
['Kelime', 'der Reißverschluss', 'fermuar'],
['Kelime', 'bügeln', 'ütülemek'],
['Kelime', 'faulenzen', 'tembellik etmek'],
['Kelime', 'in Tränen ausbrechen', 'gözyaşlarına boğulmak'],
['Kelime', 'ungeduldig', 'sabırsız'],
['Kelime', 'sich benehmen', 'davranmak'],
['Kelime', 'der Papierkram', 'evrak işi'],
['Kelime', 'die Klausur', 'yazılı sınav'],
['Kelime', 'die Ausbildung', 'mesleki eğitim'],
['Kelime', 'promovieren', 'doktora yapmak'],
['Kelime', 'sich zurückziehen', 'geri çekilmek'],
['Kelime', 'die Glühbirne', 'ampul'],
['Kelime', 'die Erkenntnis', 'bilgi, kavrayış'],
['Kelime', 'beerdigen', 'gömmek, defnetmek'],
['Kelime', 'der Tatort', 'olay yeri'],
['Kelime', 'die Sehnsucht', 'özlem'],
['Kelime', 'in Kraft treten', 'yürürlüğe girmek'],
['Kelime', 'das Verkehrsschild', 'trafik levhası'],
['Kelime', 'voraussagen', 'önceden söylemek, tahmin etmek'],
['Kelime', 'verkehren', 'işlemek (ulaşım aracı)'],
['Kelime', 'bedauern', 'üzülmek, esef etmek'],
['Kelime', 'der Stau', 'trafik sıkışıklığı'],
['Kelime', 'aus Versehen', 'yanlışlıkla'],
['Kelime', 'die Ausrede', 'bahane'],
['Kelime', 'schmelzen', 'erimek'],
['Kelime', 'der Meeresspiegel', 'deniz seviyesi'],
['Kelime', 'überschwemmen', 'su basmak'],
['Kelime', 'gefährdet', 'tehlike altında'],
['Kelime', 'befürchten', 'korkmak, endişe etmek'],
['Kelime', 'der Absender', 'gönderen'],
['Kelime', 'per Einschreiben', 'taahhütlü'],
['Kelime', 'gebührenfrei', 'ücretsiz'],
['Kelime', 'das Stipendium', 'burs'],
['Kelime', 'das Rückgaberecht', 'iade hakkı'],
['Kelime', 'die Genehmigung', 'izin, onay'],
['Kelime', 'die Warteschleife', 'bekleme hattı'],
['Kelime', 'das Urheberrecht', 'telif hakkı'],
['Kelime', 'der Lebenslauf', 'özgeçmiş'],
['Kelime', 'die Umschulung', 'meslek değiştirme eğitimi'],
['Kelime', 'die Vollzeitstelle / Teilzeit', 'tam zamanlı iş / yarı zamanlı']
];

// sık sorulanlar
const FAQ = [
['wenn mi als mi? Nasıl karar veririm?', 'Geçmiş ve tek seferlik ise als. Geri kalan her durumda wenn (şimdi, gelecek, geçmişte tekrarlı).', 'wa'],
['Als ich ein Kind war neden als? Çocukluk uzun bir süre.', 'Çocukluk geçmişte kalmış tek bir dönemdir. Slayttaki kural “Zuständen der Vergangenheit” der. Tek dönem, tek durum: als.', 'wa'],
['“früher” olan cümlede neden wenn kullanılıyor?', 'Stadttore örneğinde her akşam tekrarlanan bir olay var. Tekrarlı olay geçmişte de wenn alır.', 'wa'],
['während ve solange arasındaki fark ne?', 'İkisi de aynı anda süren eylemlerdir. Solange ek olarak “biri bitince öteki de biter” der. Während’in ayrıca karşıtlık anlamı vardır.', 'sb'],
['während ne zaman adversativ?', 'İki kişinin veya şeyin zıt tercihlerini, alışkanlıklarını anlatıyorsa. Yerine dagegen/aber koyabiliyorsan adversatiftir.', 'wh'],
['dagegen ile aber kelime sırası nasıl?', 'dagegen 1. sırayı doldurur: dagegen ist sie. aber sırayı etkilemez: aber sie ist veya sie aber ist.', 'wh'],
['Bevor ile ana cümlede neden aynı zaman kullanılıyor?', 'Ana cümle önce olsa bile Almanca genel olarak iki cümlede aynı kipi kullanır. Slayt: “im Allgemeinen … die gleiche Tempusform”.', 'sb'],
['bevor ile ehe arasında fark var mı?', 'Anlam olarak yok. Slaytta birlikte verilir.', 'sb'],
['nachdem’den sonra hangi zaman gelir?', 'Yan cümle bir adım daha eskide: Perfekt → Präsens, Plusquamperfekt → Präteritum.', 'na'],
['nachdem ile sobald farkı ne?', 'Nachdem’de arada süre olabilir. Sobald’da ikinci eylem hemen gelir.', 'na'],
['sobald ile sowie aynı mı?', 'İki eylem aynı anda oluyorsa ikisi de aynı kiple kullanılır. Örnek: Meine Mutter bekommt große Angst, sobald/sowie sie eine Schildkröte sieht.', 'na'],
['Plusquamperfekt nasıl yapılır?', 'hatte/war + Partizip II. Örnek: gemacht hatte, gelandet war. Edilgen: beerdigt worden war.', 'na'],
['Zeitenwechsel ne demek?', 'İki cümlede farklı zaman kipi kullanılması. nachdem/sobald’da zorunlu, seit ve bis’te duruma göre.', 'na'],
['bis ile hangi zaman gelir?', 'Çoğunlukla aynı zaman. Zaman değişimi de mümkün. Futur I ve II tahmin bildirir.', 'bi'],
['Futur II nasıl kurulur?', 'werden + Partizip II + haben/sein. Örnek: Wir werden unsere Arbeiten erledigt haben.', 'bi'],
['seit ile seitdem farkı nedir?', 'Bağlaç olarak ikisi de aynı. seit + Dativ (seit 25 Jahren) edat olarak da kullanılır. seitdem tek başına zarf olur.', 'se'],
['seit’ten sonra neden şimdiki zaman?', 'Olay hâlâ sürdüğü için. Seit 25 Jahren lebt sie in Deutschland: hâlâ yaşıyor.', 'se'],
['seit ile bis’i metinde nasıl ayırırım?', 'Fiil şimdiki zamanda ve olay sürüyorsa seit. Bir bitiş noktası varsa (dann, sonra başka iş) bis.', 'se'],
['weil, da, zumal arasındaki fark ne?', 'weil genel sebep, da yazılı dil ve çoğunlukla başta, zumal ikinci ek sebep.', 'ka'],
['weil’den sonra fiil neden sonda?', 'weil bir yan cümle bağlacıdır ve tüm yan cümle bağlaçlarında çekimli fiil sona gider.', 'nb'],
['deshalb ile weil arasındaki fark?', 'weil yan cümle yapar, fiil sonda. deshalb ana cümlede 1. sırada durur, fiil hemen arkasından gelir: deshalb bleibe ich.', 'ka'],
['falls ile wenn farkı?', 'wenn hem zaman hem koşuldur. falls yalnızca koşuldur.', 'ko'],
['wenn’siz koşul cümlesi nasıl yapılır?', 'wenn’i sil, fiili başa al, virgülden sonra istersen so veya dann ekle: Brauchen Sie Briefpapier, (so) können Sie es kaufen.', 'ko'],
['Beim + isim nasıl wenn’e çevrilir?', 'İsimden fiili çıkar, genelde özne man, Genitiv nesne Akkusativ olur: Beim Speichern einer Datei → Wenn man eine Datei speichert.', 'ko'],
['Ayrılabilen fiil yan cümlede ne olur?', 'Birleşir: Er ruft an → …, wenn er anruft.', 'nb'],
['Slaytlarda yazım hatası var mı?', 'Birkaç tane: Zeitenchsel (Zeitenwechsel), Nebensäzten (Nebensätzen), Hauptsaztes (Hauptsatzes), Verganegheit (Vergangenheit), paralellen (parallelen), Haupsatzes (Hauptsatzes), bleibe ich Sommer (im Sommer). Bu sitede doğruları yazıldı.', 'nb']
];
