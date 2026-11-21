// alıştırma açıklamaları. data.js'ten sonra yükleniyor, oradaki kısa notların yerine geçiyor

// her alıştırmanın başındaki adım adım çözüm
const HOW = {
wa1: ['Sorudaki olayın zamanına bak: geçmiş mi, şimdi mi?', 'Geçmişse sor: bir kez mi oldu (bir tarih, bir yaş), yoksa tekrar tekrar mı (früher, oft, immer)?', 'Geçmiş + bir kez → <b>als</b>. Diğer her durum → <b>wenn</b>.', 'Sorudaki ana cümleyi cevap olarak yaz (Wann verschloss man …? → Man verschloss …), virgül koy.', 'Parantezdeki kelimelerden yan cümleyi kur, fiili doğru zamanda çekimle ve <b>en sona</b> koy.'],
wa2: ['Bağlacı ve zamanı belirle (tablodaki satır).', 'Yan cümleyi yaz: bağlaç + özne + … + çekimli fiil en sonda.', 'Virgül koy.', 'Ana cümleyi fiille başlat: <i lang="de">Wenn ich frei habe, <b>besuche</b> ich dich.</i>'],
wh1: ['Cümleyi Türkçeye çevirmeye çalış.', 'İki eylem aynı anda mı oluyor (“-iken”)? → <b>temporal</b>.', 'İki kişi zıt şeyler mi seviyor/yapıyor (“oysa”)? → <b>adversativ</b>.', 'Emin değilsen “dagegen” testi yap: “Er …, dagegen sie …” anlamlı oluyorsa adversativ.'],
wh2: ['<b>während</b>’i sil; yan cümle artık normal bir ana cümle olur.', 'Sonda duran çekimli fiili <b>2. sıraya</b> geri al: <i lang="de">während er gerne faulenzt → Er faulenzt gerne</i>.', 'Virgül koy.', '<b>dagegen</b> kullanırsan: dagegen + fiil + özne (<i lang="de">dagegen sieht sie</i>). <b>aber</b> kullanırsan: aber + özne + fiil (<i lang="de">aber sie sieht</i>).'],
wh3: ['Temporal: aynı anda olan iki eylem düşün (yemek yaparken radyo dinlemek).', 'Adversativ: iki kişinin zıt tercihini düşün (ben çay severim, o kahve).', 'während + özne + … + fiil sonda, virgül, ana cümle fiille başlar.'],
sb1: ['Cümleyi Türkçeye çevir.', 'Bir eylem diğerinden önce mi oluyor? → <b>bevor</b> (“-meden önce”).', 'İki eylem aynı süre boyunca mı sürüyor ve birlikte mi bitiyor? → <b>solange</b> (“-dığı sürece”).', 'Boşluk cümle başındaysa büyük harfle başlayan seçeneği seç.'],
sb2: ['Verilen yarım cümlenin anlamını düşün (bevor = önce, solange = sürece).', 'Eksik kısım ana cümleyse ve yan cümle öndeyse ana cümle fiille başlar.', 'Eksik kısım öndeyse normal sırayla yaz: özne + fiil + …'],
sb3: ['bevor: “X yapmadan önce Y yaparım” diye bir cümle düşün.', 'solange: “X sürdüğü sürece Y” diye bir cümle düşün.', 'Yan cümlede fiil en sona, ardından virgül, ana cümle fiille başlar.'],
sb4: ['İtalik kısmı bul: <i lang="de">vor …</i> → bevor, <i lang="de">während …</i> → während.', 'İsimden fiil yap: <i lang="de">das Studium → studieren, die Heirat → heiraten</i>. Parantez varsa fiil oradadır.', 'Özneyi ana cümleden al (genelde sie).', 'Fiili özneye ve ana cümlenin zamanına göre çekimle, <b>en sona</b> koy. Ayrılabilen fiiller birleşir: <i lang="de">aufhält, aufgeht</i>.', 'Ana cümleden italik kısmı çıkar, kalanını yaz.'],
na1: ['<i lang="de">Nach der …</i> kısmını bul ve isimden fiil yap: <i lang="de">die Erfindung → erfinden</i>.', 'Kimin yaptığını bul (Edison, Koch…): bu, yan cümlenin öznesi olur.', 'Ana cümle Präteritum olduğu için yan cümle <b>Plusquamperfekt</b>: hatte/war + Partizip II, en sonda.', 'Hareket fiilleri (landen, emigrieren) <b>war</b>, diğerleri <b>hatte</b> alır.', 'Ana cümle fiille başlar; isim tekrarını önlemek için zamir kullan: <i lang="de">…, war <b>er</b> berühmt</i>.'],
na2: ['Önce olan cümleyi bul (ilk cümle) ve Nachdem ile başlat.', 'Yardımcı fiili (hatte/hat) <b>en sona</b> taşı.', '<i lang="de">Anschließend, danach, dann, jetzt</i> kelimelerini sil.', 'Virgülden sonra ana cümle fiille başlar: <i lang="de">…, sah er fern</i>.', 'Zamanı koru: Plusquamperfekt → Präteritum, Perfekt → Präsens.'],
na3: ['“-ir -mez” = <b>sobald</b>.', 'Türkçe parantezi Almancaya çevir: özne + fiil.', 'Fiili özneye göre çekimle ve en sona koy. Ayrılabilen fiil birleşir: <i lang="de">aufhört</i>.', 'Önce bitmesi gereken bir eylemse (kitabı bitirmek) Perfekt kullan.'],
na4: ['Günlük rutininden iki eylem seç: önce ne yapıyorsun, sonra ne?', 'Nachdem: önceki eylem Perfekt (<i lang="de">aufgestanden bin</i>), ana cümle Präsens.', 'Sobald: “-ir -mez”, genelde iki cümle de Präsens.'],
bi1: ['Cümleleri Türkçeye çevir ve aralarındaki ilişkiyi düşün.', 'Bir eylem, öteki olana <b>kadar</b> mı sürüyor? → <b>bis</b>; ikinci cümle bitiş noktasıdır.', 'Bir şey başladı ve o <b>zamandan beri</b> mi sürüyor? → <b>seit / seitdem</b>.', 'Yan cümlede çekimli fiil en sona gider; yan cümle öndeyse ana cümle fiille başlar.'],
se1: ['Her cümlede fiilin zamanına bak.', 'Fiil şimdiki zamanda ve olay hâlâ sürüyor mu? → <b>seit</b>.', 'Olay geçmişte bitmiş, bir sınır var mı (“dann”, başka işe geçti)? → <b>bis</b>.', 'Gelecekte bir bitiş noktası varsa da <b>bis</b>.'],
ka1: ['Sorudaki cümleyi cevap cümlesi olarak yaz (du sorusuna ich ile).', 'Virgül + <b>weil</b>.', 'İpucundaki özneyi bul, gerekirse zamirle değiştir (die Wohnung → sie).', 'Fiili çekimle ve <b>en sona</b> koy. Perfekt’te yardımcı fiil en sonda: <i lang="de">verpasst hat</i>.'],
ka2: ['Kalıp: <i lang="de">[İsim] ist froh, weil …</i>', 'Kişinin sözündeki ich’i er/sie yap; mein/meine → sein/ihr, mich → sich.', 'Çekimli fiili en sona taşı. Modal fiil varsa o en sonda: <i lang="de">tanzen kann</i>.'],
ka3: ['Kalıp: <i lang="de">[İsim] ist zu spät gekommen, weil …</i>', 'ich → er/sie, mein → sein/ihr, mir → ihm/ihr.', 'Çekimli fiil (hat, ist, musste, hatte) en sona gider.'],
ka4: ['İlk cümle sebeptir: <b>Da</b> ile başlat.', 'Çekimli fiili en sona taşı, virgül koy.', 'İkinci cümleyi <b>fiille</b> başlat, özne fiilden sonra gelir (fiil, virgül, fiil).', 'Sadece yer tutan <i lang="de">es</i> varsa düşer. Tekrar eden isim zamire döner (viele Inseln → sie).'],
ko1: ['Koşulu bildiren cümleyi bul (genelde ilk cümle).', '<b>Wenn</b> ile başlat, çekimli fiili <b>en sona</b> taşı. nicht fiilin hemen önünde kalır.', 'Virgül koy, ana cümleyi fiille başlat: <i lang="de">…, geht der Brief zurück</i>.'],
ko2: ['Alıştırma 1’deki wenn’li cümleyi düşün.', '<b>wenn</b>’i sil ve çekimli fiili cümlenin <b>en başına</b> al: <i lang="de">Stimmt die Adresse nicht, …</i>', 'Virgülden sonra istersen <i lang="de">so</i> veya <i lang="de">dann</i> ekle, ardından ana cümlenin fiili gelir.'],
ko3: ['<i lang="de">beim / zum + isim</i> kısmını bul.', 'İsimden fiil yap: <i lang="de">das Speichern → speichern, der Kauf → kaufen</i>.', 'Belirli bir kişi yoksa özne <b>man</b>. (Ama arıza gibi bir şey kendiliğinden “oluyorsa” özne o şeydir.)', 'Genitiv/von’lu nesne Akkusativ olur: <i lang="de">einer Datei → eine Datei, von Musik → Musik</i>.', 'Fiili çekimle ve sona koy; ayrılabilen fiil birleşir: <i lang="de">anruft, herunterlädt</i>.']
};

// soru başına uzun açıklamalar
const WHY = {
wa1: [
  'Anlamı: Eskiden şehir kapıları akşam hava karardığında kapatılırdı. “früher” geçmiş ama bu her akşam tekrarlanan bir olay, tek seferlik değil. Geçmişte tekrarlanan olay wenn alır. Yan cümlede fiil Präteritum olur ve en sona gider: wenn es abends dunkel wurde.',
  'Anlamı: Birçok Alman akşam saat 20’de haberler başladığında televizyonu açar. Cümle şimdiki zamanda ve her akşam tekrarlanıyor → wenn. Şimdiki zamanda als hiç kullanılmaz. beginnt en sona gider.',
  'Anlamı: 1835’te ilk buharlı lokomotif yolculuğu başarılı olduğunda Almanya’da demiryolu yapımına başlandı. 1835 tek bir tarih, olay bir kez oldu → als. Başarı demiryolu yapımından önce gerçekleştiği için Plusquamperfekt: gelingen “sein” ile çekimlenir → gelungen war (en sonda).',
  'Anlamı: Robert Koch tüberküloz basilini 39 yaşındayken buldu. 39 yaşında olmak hayatta bir kez olan geçmiş bir durum → als. sein’ın Präteritum’u war, yan cümlede en sona gider.',
  'Anlamı: İspanyollar, Kolomb’un yeni bir kıta keşfettiğini Macellan Güney Amerika’yı ilk kez dolaştığında öğrendi. “zum ersten Mal” (ilk kez) = tek sefer, geçmiş → als. Dolaşma öğrenmeden önce bittiği için Plusquamperfekt: umfahren “haben” alır → umfahren hatte.',
  'Anlamı: Almanya’da cuma öğleden sonra atölyeyi ararsan artık hiçbir usta gelmez. Şimdiki zaman, genel bir durum → wenn. anrufen ayrılabilen fiildir (man ruft an), yan cümlede parçalar birleşip sona gider: wenn man … anruft.',
  'Anlamı: Eskiden birçok insan Avrupa’da dini ya da siyasi nedenlerle zulme uğradığında Amerika’ya göç ederdi. “früher oft” = geçmişte sık sık, yani tekrarlı → wenn. Edilgen (pasif) Präteritum: wurden + Partizip → verfolgt wurden.',
  'Anlamı: Fermuar icat edildiğinde tüm dünyada giyim sanayisi kendini yeniden düzenlemek zorunda kaldı. Fermuar bir kez, geçmişte icat edildi → als. Edilgen Präteritum: erfunden wurde (wurde en sonda).'
],
wh1: [
  'Anlamı: Kadın arabayı sürerken adam haritayı okuyup ona nereye gideceğini söyledi. İki eylem aynı anda oluyor ve birbirine zıt değil, tersine birlikte çalışıyorlar → temporal (“-iken”).',
  'Anlamı: Adam tatilde tembellik etmeyi severken (oysa) kadın kilise ve müze gezmeyi ya da spor yapmayı sever. Mesele zaman değil, iki kişinin zıt tercihleri → adversativ. Test: “Er faulenzt gerne, dagegen sieht sie …” anlam bozulmuyor.',
  'Anlamı: Kadın süpermarkette alışveriş yaparken adam otoparkta arabada sabırsızca bekliyor. İki eylem aynı zaman diliminde oluyor, zıt tercih anlatılmıyor → temporal.',
  'Anlamı: Adam çok ve severek et yerken (oysa) kadın katı bir vejetaryen. Bu iki kişinin zıt beslenme alışkanlığı, aynı anda olan iki eylem değil → adversativ.',
  'Anlamı: Adam tatil yerinde kitapçı ve kütüphane gezmeyi severken (oysa) kadın yüzmeyi, bisikleti ve dağcılığı her şeyden çok sever. Zıt ilgi alanları → adversativ.',
  'Anlamı: Kadın en çok internette gezinirken (oysa) adam daha çok gazete ve dergilerden bilgi alır. Bilgi alma alışkanlıkları zıt → adversativ.',
  'Anlamı: Adam cumartesi akşamı spor programını izlerken kadın çocukları antrenmandan aldı. “am Samstagabend” belirli bir an; iki eylem aynı anda oldu → temporal.',
  'Anlamı: Adam pazar sabahı hâlâ uyurken kadın gazete okudu. “noch schlief” (hâlâ uyuyordu) aynı anı gösteriyor → temporal.',
  'Anlamı: Adam hafta sonlarını onunla evde baş başa geçirmek isterken (oysa) kadın arkadaşlarıyla buluşmayı tercih ediyor. Zıt istekler → adversativ.'
],
wh2: [
  'Anlamı: Adam tatilde tembellik etmeyi sever, buna karşın kadın kilise ve müze gezer ya da spor yapar. Adım adım: während’i sil, ilk cümlede fiili 2. sıraya geri al (Er faulenzt …). Virgülden sonra dagegen 1. sırayı doldurur, bu yüzden fiil hemen arkasından, özne ondan sonra gelir: dagegen sieht sie. aber kullanırsan sıra normal kalır: aber sie sieht.',
  'Anlamı: Adam çok et yer, buna karşın kadın katı bir vejetaryen. während düşünce isst sondan 2. sıraya döner: Er isst gern und viel Fleisch. dagegen + fiil + özne: dagegen ist sie …; aber ile: aber sie ist …',
  'Anlamı: Adam tatil yerinde kitapçı ve kütüphane gezer, buna karşın kadın yüzmeyi, bisikleti ve dağcılığı çok sever. Yan cümlede sonda olan besucht, ana cümle olunca 2. sıraya geçer: Er besucht … İkinci kısım: dagegen liebt sie …',
  'Anlamı: Kadın en çok internette gezinir, buna karşın adam daha çok gazetelerden bilgi alır. Dönüşlü fiilde sich, fiil ve özneden sonra kalır: dagegen informiert er sich …',
  'Anlamı: Adam hafta sonunu onunla evde geçirmek ister, buna karşın kadın arkadaşlarıyla buluşmayı tercih eder. Modal fiilli cümle ana cümle olunca modal fiil (möchte) 2. sıraya, mastar (verbringen) en sona gider: Er möchte … verbringen.'
],
sb1: [
  'Anlamı: Evden çıkmadan önce bütün pencereleri kontrol ederim. Sıra belli: önce pencereler, sonra evden çıkış. Bir eylem diğerinden önce oluyorsa bevor (“-meden önce”).',
  'Anlamı: Ehliyetin olduğu sürece arabayı kullanabilirsin. Araba kullanma ehliyet süresi boyunca devam eder ve ehliyet bitince o da biter → solange (“-dığı sürece”).',
  'Anlamı: Sözleşmeyi imzalamadan önce onu dikkatlice okumalısın. Önce okuma, sonra imza → bevor.',
  'Anlamı: Sen işini yaptığın sürece bekleyeceğim. Bekleme, senin çalıştığın süre boyunca devam ediyor ve onunla birlikte bitiyor → solange.',
  'Anlamı: Yaz bitmeden önce bir kez daha tatile gitmek istiyoruz. Önce tatil, sonra yazın bitişi → bevor.',
  'Anlamı: Hava kararmadan önce evde olmalıyız. Önce eve dönüş, sonra karanlık → bevor. solange olsaydı “karanlık olduğu sürece evde olmalıyız” gibi tuhaf bir anlam çıkardı.'
],
sb4: [
  'Anlamı: Üniversite okurken doktora tezi üzerinde çalışıyor bile. “während des Studiums” bir isim kalıbı. İsimden fiil yap: das Studium → studieren. Özne ana cümleden: sie. Fiil çekimlenip sona gider: während sie studiert.',
  'Anlamı: Üniversiteden önce hemşirelik eğitimi almıştı. vor dem Studium → bevor sie studierte. Ana cümle Plusquamperfekt (hatte … gemacht), çünkü bu olay öğrenimden önce olmuştu; yan cümle Präteritum: studierte.',
  'Anlamı: Sınavından önce bir dönem ABD’ye gitmek istiyor. Parantezdeki ipucu: Examen machen. vor ihrem Examen → bevor sie ihr Examen macht. ihrem (Dativ) → ihr (Akkusativ), çünkü machen Akkusativ nesne alır. macht en sonda.',
  'Anlamı: ABD’de kaldığı süre boyunca kız kardeşinin yanında kalabilir. İpucu: sich aufhalten (kalmak). auf|halten ayrılabilen fiildir; yan cümlede parçalar birleşir ve sona gider. Özne tekil sie olduğu için halten → hält (a → ä): während sie sich … aufhält.',
  'Anlamı: Kocasını üniversiteden önce de tanıyordu. vor dem Studium → bevor sie studierte. Ana cümle Präteritum (kannte), yan cümle de Präteritum: studierte.',
  'Anlamı: Evlenmeden önce küçük bir dairede oturuyorlardı. die Heirat (evlilik) → heiraten (evlenmek). Özne sie burada “onlar” (çoğul, ana cümlede wohnten) → heirateten.',
  'Anlamı: Üniversiteden ayrılmadan önce doktora yapmak istiyor. Verlassen der Universität → sie verlässt die Universität. verlassen Akkusativ alır: die Universität. Tekil sie ile verlassen → verlässt (a → ä).',
  'Anlamı: Sınav için çalışırken ailesine pek zaman bulamıyor. die Arbeit → arbeiten. während ihrer Arbeit fürs Examen → während sie fürs Examen arbeitet (arbeitet sonda).',
  'Anlamı: Güneş doğmadan önce kalkıp masasına oturur. der Sonnenaufgang (gün doğumu) iki parçadır: die Sonne + aufgehen. Özne die Sonne olur; ayrılabilen fiil birleşir ve sona gider: bevor die Sonne aufgeht.',
  'Anlamı: Sınava hazırlanırken çocuklara kocası bakmak zorunda. İpucu: sich vorbereiten auf + Akkusativ. während sie sich auf die Prüfung vorbereitet: sich özneden hemen sonra, vorbereitet birleşik ve sonda.',
  'Anlamı: İş hayatına atılmadan önce bir yıl ara vermek istiyor. der Eintritt → eintreten (girmek). Tekil sie ile treten → tritt (e → i). Yan cümlede birleşik ve sonda: bevor sie in das Berufsleben eintritt.'
],
na1: [
  'Anlamı: Edison ampulü icat ettikten sonra bütün Amerika’da ünlüydü. Adım adım: die Erfindung → erfinden. Ana cümle Präteritum (war) → yan cümle Plusquamperfekt. erfinden haben alır → erfunden hatte. Edison yan cümleye geçer, ana cümlede er olur.',
  'Anlamı: Robert Koch tüberkülozun nedenlerini araştırdıktan sonra Nobel ödülünü aldı. die Erforschung → erforschen → erforscht. Ana cümle Präteritum (bekam) → yan cümle Plusquamperfekt: erforscht hatte. “der Ursachen” (Genitiv) nesne olunca “die Ursachen” (Akkusativ) olur.',
  'Anlamı: Bilim insanı Mozart biyografisini yayımladıktan sonra 18. yüzyıl müziği uzmanı sayıldı. die Veröffentlichung → veröffentlichen → veröffentlicht hatte. seiner (Genitiv) → seine (Akkusativ).',
  'Anlamı: Armstrong ve arkadaşları Ay’a indikten sonra ulusal kahramandılar. die Landung → landen. landen bir yer değiştirme (hareket) fiili olduğu için sein alır; özne çoğul: gelandet waren.',
  'Anlamı: Einstein Almanya’dan göç ettikten sonra Princeton’da profesör olarak ders verdi. die Emigration → emigrieren. Göç etmek bir yerden başka yere hareket → sein alır: emigriert war.',
  'Anlamı: Darwin Galapagos’ta hayvanları gözlemledikten sonra evrim hakkında önemli bilgiler edindi. die Beobachtung → beobachten → beobachtet hatte (hareket fiili değil, haben alır).',
  'Anlamı: Friedrich Schiller defnedildikten sonra kimse büyük şairin mezarıyla ilgilenmedi. Schiller kendisi gömmüyor, gömülüyor: edilgen (pasif). Edilgen Plusquamperfekt = Partizip + worden + war: beerdigt worden war.'
],
na2: [
  'Anlamı: Memura pasaportlarımızı gösterdikten sonra yola devam edebildik. “Anschließend” düşer. İlk cümle nachdem’li yan cümle olur, hatten en sona gider. Yan cümle öndeyse ana cümle fiille başlar: durften wir. Plusquamperfekt (hatten gezeigt) → Präteritum (durften).',
  'Anlamı: Yemek yedikten sonra bir de kahve ısmarladım. “Danach” düşer. nachdem ich gegessen hatte (hatte sonda), ana cümle fiille başlar: bestellte ich. Plusquamperfekt → Präteritum.',
  'Anlamı: Doktor hastayı muayene ettikten sonra onunla konuştu. “Anschließend” düşer. Nachdem der Arzt … untersucht hatte; ana cümlede der Arzt tekrar edilmez, er olur: sprach er mit ihm.',
  'Anlamı: Lena ofisi topladıktan sonra akşam yemeğini yedi. “Dann” düşer. aufgeräumt hatte sonda; ana cümle fiille başlar: aß sie.',
  'Anlamı: Klaus işini bitirdi, şimdi dosyaları dolaba koyuyor. Bu kez ilk cümle Perfekt (hat beendet), ikinci Präsens (legt). Bu eşleşme korunur: Nachdem Klaus … beendet hat, legt er … “Jetzt” düşer.',
  'Anlamı: Amira fiyatları karşılaştırdıktan sonra yeni arabayı aldı. “Dann” düşer. verglichen hatte sonda, ana cümle kaufte sie ile başlar.',
  'Anlamı: Maria Paul’ün telefon numarasını buldu, şimdi onu arıyor. Perfekt (hat gefunden) → Präsens. Ana cümle fiille başlar ve anrufen ana cümlede ayrılır: ruft sie ihn an.'
],
na3: [
  'Anlamı: Sen hazır olur olmaz sinemaya gidebiliriz. “-ir -mez” = sobald. Hazır = fertig, olmak = sein → du bist. Yan cümlede fiil sona: sobald du fertig bist.',
  'Anlamı: O gelir gelmez kutlama başlayabilir. Türkçedeki “o” erkek mi kadın mı belli değil, er de sie de doğru. kommt sona gider. Geliş önce tamamlanıyorsa Perfekt de olur: sobald er gekommen ist.',
  'Anlamı: Yağmur durur durmaz yürüyüşe çıkarız. Durmak = aufhören (ayrılabilen). Ana cümlede “Der Regen hört auf”, yan cümlede birleşir ve sona gider: sobald der Regen aufhört.',
  'Anlamı: Kitabı okumayı bitirir bitirmez bana anlatabilirsin. Okuma, anlatmadan önce bitmiş olmalı → Perfekt: ausgelesen hast / zu Ende gelesen hast. Ana cümle Präsens (kannst) → yan cümle Perfekt.',
  'Anlamı: Hava kararır kararmaz eve giderim. “Hava kararmak” Almancada es ile kurulur: es wird dunkel. Yan cümlede wird sona: sobald es dunkel wird.'
],
bi1: [
  'Anlamı: Max bu ilacı aldığından beri çok daha iyi. İlaç almak geçmişte başladı ve hâlâ sürüyor → seit/seitdem, iki cümle de Präsens. Yan cümle önde olduğu için ana cümle fiille başlar: geht es ihm. bis ile de kurulabilir: “iyileşene kadar alıyor”.',
  'Anlamı: Köpek, ben onu odaya alana kadar kapımın önünde öyle uzun havladı. so lange …, bis = “… olana kadar öyle uzun”. Havlama, onu içeri alınca bitti; bitiş noktası bis’li cümle. ließ (lassen’ın geçmişi) en sona gider.',
  'Anlamı: Garson sonunda gelene kadar neredeyse yarım saat bekledik. Bekleme garsonun gelişiyle bitti → bis. İki cümle de Präteritum: warteten / kam.',
  'Anlamı: Pavel sigarayı bıraktığından beri çok sinirli. Bırakma bir kez oldu ve bitti (Perfekt: aufgehört hat), ama etkisi (sinirlilik) hâlâ sürüyor (Präsens: ist). Bu yüzden seit + Perfekt, ana cümle Präsens.',
  'Anlamı: Lisa sınava girene kadar her gün akşam 10’a kadar çalışıyor. Çalışma sınava kadar sürüyor → bis. Sınav bitiş noktasıdır.',
  'Anlamı: Tren gelene kadar daha bir saatten fazla var. Es dauert …, bis = “… olana kadar … sürer”. Sık kullanılan sabit kalıp; kommt en sona gider.'
],
se1: [
  'Anlamı: On dört yaşına kadar Türkiye’de yaşadı. Fiil geçmişte (lebte) ve olay bitmiş: 14 yaşında Türkiye’den ayrıldı. Bir bitiş noktası var → bis.',
  'Anlamı: 25 yıldır Almanya’da yaşıyor. Fiil şimdiki zamanda (lebt) ve “nun schon” olayın hâlâ sürdüğünü gösterir → seit (+ Dativ: 25 Jahren).',
  'Anlamı: Almanya’da yaşadığından beri dili mükemmel öğrenmeye çalışıyor. İki fiil de Präsens (lebt, bemüht sich) ve ikisi hâlâ sürüyor → seit.',
  'Anlamı: ama perakende satış eğitimini bitirene kadar bazen hâlâ zorluk çekiyordu. Zorluklar eğitim bitince bitti → bitiş noktası → bis.',
  'Anlamı: Bitirme sınavını geçtiğinden beri bir mağazada çalışıyordu. Sınavı geçmek başlangıç noktası; çalışma o andan itibaren sürdü → seit. Hikâye geçmişte anlatıldığı için Plusquamperfekt + Präteritum.',
  'Anlamı: 1985’ten beri evli. Fiil şimdiki zaman (ist verheiratet), hâlâ evli → seit.',
  'Anlamı: 1986’ya kadar gıda bölümünde çalıştı, sonra meslek değiştirdi. “dann” (sonra) işin bittiğini gösterir; fiil geçmişte (arbeitete) → bis.',
  'Anlamı: 1988’den beri bir bankada çalışıyor. Fiil şimdiki zamanda (ist beschäftigt), hâlâ orada → seit.',
  'Anlamı: İlk çocuğu doğana kadar tam zamanlı çalıştı; o zamandan beri haftada üç gün çalışıyor. Tam zamanlı iş doğumla bitti → bis. Arkasındaki “seitdem” yeni durumu başlatıyor.',
  'Anlamı: Çocuklar kendi başlarına yetene kadar yarı zamanlı çalışmaya devam etmek istiyor. Gelecekte bir bitiş noktası (çocukların büyümesi) → bis.',
  'Anlamı: Birkaç yıldır ailenin güzel bir semtte kendi evi bile var. Fiil şimdiki zaman (hat), durum sürüyor → seit + Dativ (einigen Jahren).'
],
ka1: [
  'Anlamı: Thomas neden yeni iş arıyor? Çünkü çok az kazanıyor. Adım adım: soruyu cevap cümlesine çevir (Thomas sucht eine neue Arbeit), virgül + weil, ipucundaki fiili özneye göre çekimle (er verdient) ve en sona koy.',
  'Anlamı: Neden çilek yemiyorsun? Çünkü alerjim var. Soru du ile sorulduysa cevap ich ile verilir: Ich esse …, weil ich eine Allergie habe. habe en sonda.',
  'Anlamı: Neden bu daireden taşınıyorsun? Çünkü çok karanlık. Karanlık olan die Wohnung; dişil olduğu için zamiri sie: weil sie zu dunkel ist.',
  'Anlamı: Çiçekleri neden aldın? Çünkü kız arkadaşımın bugün doğum günü. Özne meine Freundin, fiil hat en sona: weil meine Freundin heute Geburtstag hat.',
  'Anlamı: Max’in neden göz doktorunda randevusu vardı? Çünkü gözlüğe ihtiyacı vardı. Soru geçmişte (hatte), cevap da geçmiş: brauchte, en sonda.',
  'Anlamı: Maria neden tatile gitmiyor? Çünkü kendini hasta hissediyor. Dönüşlü fiil sich fühlen: yan cümlede sich özneden hemen sonra, fiil en sonda: weil sie sich krank fühlt.',
  'Anlamı: Luis neden geç kaldı? Çünkü otobüsü kaçırdı. Kaçırma geç kalmadan önce oldu → Perfekt. Yan cümlede yardımcı fiil hat en sona, Partizip hemen önüne: weil er den Bus verpasst hat.',
  'Anlamı: Jana neden bisiklet turuna katılmıyor? Çünkü soğuk algınlığına yakalandı. Hastalanma daha önce oldu → Perfekt: weil sie sich erkältet hat. “weil sie erkältet ist” (soğuk algınlığı var) da doğru.'
],
ka2: [
  'Anlamı: Benjamin mutlu, çünkü ABD’den bir fizik profesörüyle tanıştı. Başkasının sözünü aktarıyoruz: ich → er. Perfekt’te yardımcı fiil sona: weil er … kennengelernt hat.',
  'Anlamı: Christiano mutlu, çünkü burada doyasıya dans edebiliyor. Modal fiilli yan cümlede sıra: mastar (tanzen) + modal fiil (kann) en sonda: weil er hier mal richtig tanzen kann.',
  'Anlamı: Danuta mutlu, çünkü arkadaşlarıyla vakit geçirebiliyor. ich → sie ve iyelik de değişir: meinen Freunden → ihren Freunden (onun arkadaşları). verbringen kann en sonda.',
  'Anlamı: Eosebio mutlu, çünkü burada ana diliyle sohbet edebiliyor. Üç şey değişir: ich → er, mich → sich, meiner → seiner. Sıra: weil er sich hier … unterhalten kann.',
  'Anlamı: Felicia mutlu, çünkü yalnız kalmak zorunda değil. ich → sie. Modal fiil muss en sona, mastar sein hemen önüne: weil sie nicht allein sein muss.',
  'Anlamı: Gerry mutlu, çünkü burada dertlerini unutabiliyor. meine Sorgen → seine Sorgen (erkek için sein). vergessen kann en sonda.',
  'Anlamı: Hakan mutlu, çünkü çok âşık. ich bin → er ist, ist en sona: weil er so verliebt ist.'
],
ka3: [
  'Anlamı: Benjamin geç geldi, çünkü çocukları anaokuluna götürmek zorundaydı. Modal fiil geçmişte: musste, yan cümlede en sona: weil er die Kinder … bringen musste.',
  'Anlamı: Christiano geç geldi, çünkü trafiğe takıldı. Perfekt cümle (ich bin … stecken geblieben) → yan cümlede ist en sona: weil er im Stau stecken geblieben ist.',
  'Anlamı: Danuta geç geldi, çünkü tramvay rötar yaptı. Özne die Straßenbahn, fiil hatte en sona: weil die Straßenbahn Verspätung hatte.',
  'Anlamı: Eosebio geç geldi, çünkü yanlışlıkla yanlış trene bindi. einsteigen hareket fiili → sein alır: eingestiegen ist, ist en sonda.',
  'Anlamı: Felicia geç geldi, çünkü uyuyakaldı. verschlafen = uyuyakalmak. Perfekt: sie hat verschlafen → weil sie verschlafen hat.',
  'Anlamı: Gerry geç geldi, çünkü motosikleti çalışmadı. mein Motorrad → sein Motorrad (Gerry erkek). anspringen (motorun çalışması) sein alır: angesprungen ist.',
  'Anlamı: Hakan geç geldi, çünkü biri bodrumdan bisikletini çaldı. mir → ihm (ona), mein → sein. gestohlen hat en sonda. “ihm jemand” ya da “jemand ihm” sırası ikisi de doğru.'
],
ka4: [
  'Anlamı: Deniz seviyesi yükseldiği için birçok ada tehlikede. İlk cümle sebep → Da ile başlar, fiil (steigt) sona gider. Virgül. Yan cümle önde olduğu için ana cümle fiille başlar: sind viele Inseln … (fiil, virgül, fiil).',
  'Anlamı: Birçok ada deniz seviyesinin sadece birkaç metre üstünde olduğu için sular altında kalabilir. liegen sona; ana cümle könnten ile başlar ve viele Inseln tekrar edilmez, sie olur.',
  'Anlamı: Birçok ada sular altında kalabileceği için nihayet bir şeyler yapılmalı. Yan cümlede üç fiil var: überschwemmt werden könnten; çekimli olan könnten en sona. “Es muss …” cümlesindeki es sadece 1. sırayı doldurmak içindi; fiil başa gelince gereksiz kalır ve düşer: muss endlich etwas getan werden.',
  'Anlamı: Halk için koruma önlemleri gerekli olduğundan sorumlular harekete geçmeli. sind sona; ana cümle sollten ile başlar, özne ondan sonra: sollten die Verantwortlichen handeln.',
  'Anlamı: Sorumlular harekete geçmediği için felaketler öngörülebilir. handeln sona; ana cümle sind ile başlar: sind Katastrophen vorhersehbar.',
  'Anlamı: Birçok insan için felaketten korkmak gerektiğinden dünya toplumu sorunlarla ilgilenmeli. befürchten muss sonda; ana cümle sollte ile başlar, sich fiilden hemen sonra: sollte sich die Weltgemeinschaft …'
],
ko1: [
  'Anlamı: Adres doğru değilse mektup gönderene geri döner. Koşulu bildiren ilk cümle wenn ile başlar. Çekimli fiil (stimmt) en sona gider, nicht hemen önünde kalır: wenn die Adresse nicht stimmt. Ana cümle fiille başlar: geht der Brief … zurück.',
  'Anlamı: Kartpostal yazarsanız mektuptan daha ucuz olur. schreiben sona: wenn Sie eine Postkarte schreiben; ana cümle ist ile başlar: ist es billiger.',
  'Anlamı: Mektubunuz önemli belgeler içeriyorsa en iyisi taahhütlü gönderin. enthält sona; ana cümle schicken Sie ile başlar.',
  'Anlamı: Mektubunuz normalden küçük ya da büyükse daha pahalıdır. İki ist yan yana gelir: biri yan cümlenin sonunda, biri ana cümlenin başında. Bu doğru ve tipik: fiil, virgül, fiil.',
  'Anlamı: Mektubunuz Güney Amerika’ya gidiyorsa Avrupa içinden daha fazla posta ücreti tutar. geht sona; ana cümle kostet er ile devam eder.',
  'Anlamı: Bir paket sadece kitap içeriyorsa onu kitap gönderisi olarak daha ucuza yollayabilirsiniz. enthält sona; ana cümlede modal fiil başta, mastar sonda: können Sie es … verschicken.',
  'Anlamı: Bir gönderi 2 kilodan ağırsa paket formu doldurmalısınız. wiegt sona; ana cümle: müssen Sie … ausfüllen.',
  'Anlamı: Postbank’ta hesabınız varsa Almanya’daki tüm postanelerden ücretsiz para çekebilirsiniz. haben sona; ana cümle können Sie ile başlar, abheben en sonda.'
],
ko2: [
  'wenn’siz koşul: wenn’i sil ve çekimli fiili (stimmt) en başa al. Soru cümlesine benzer ama anlamı “-se”: Stimmt die Adresse nicht, … Virgülden sonra ana cümle yine fiille başlar; istersen önüne so/dann koy: (so) geht der Brief zurück.',
  'Wenn Sie eine Postkarte schreiben → wenn düşer, schreiben başa geçer: Schreiben Sie eine Postkarte, (so) ist es billiger als ein Brief. Fiilin başta olması “kartpostal yazarsanız” anlamını taşır.',
  'Çekimli fiil enthält başa geçer: Enthält Ihr Brief wichtige Dokumente, (so) schicken Sie ihn am besten per Einschreiben. Bağlaç olmadığı için koşulu fiilin yeri gösterir.',
  'Ist Ihr Brief kleiner oder größer als normal, (so) ist er teurer. İlk ist başta (koşul), ikinci ist virgülden sonra ana cümlenin fiili.',
  'Geht Ihr Brief nach Südamerika, (so) kostet er mehr Porto als innerhalb Europas. wenn’li cümlede sonda olan geht başa taşındı.',
  'Enthält ein Päckchen nur Bücher, (so) können Sie es als Büchersendung billiger verschicken. Ana cümlede modal fiil können virgülden hemen sonra, mastar en sonda.',
  'Wiegt eine Sendung mehr als 2 Kilo, (so) müssen Sie eine Paketkarte ausfüllen. Çekimli fiil wiegt başa geldi.',
  'Haben Sie ein Konto bei der Postbank, (so) können Sie … gebührenfrei Geld abheben. “Haben Sie …?” soru gibi görünür; arkasından gelen virgül ve ana cümle bunun bir koşul olduğunu gösterir.'
],
ko3: [
  'Anlamı: İnternetten mal sipariş ettiğinde de iade hakkın var. beim Bestellen (sipariş ederken) → fiil: bestellen. Belirli bir kişi yok → özne man. von Waren → nesne: Waren. Fiil çekimlenip sona: wenn man Waren im Internet bestellt.',
  'Anlamı: Bir dosyayı kaydederken doğru klasörü kullanmalı. das Speichern → speichern → man speichert. einer Datei (Genitiv) nesne olunca eine Datei (Akkusativ) olur.',
  'Anlamı: Ofiste internette gezinmek için şefin iznine sahip olmalı. zum Surfen (gezinmek için) → wenn man im Internet surft ya da surfen will; surft/will en sona.',
  'Anlamı: Bir arıza çıktığında yardım hattını arayabilirsin. Dikkat: arızayı yapan bir kişi yok, arızanın kendisi “ortaya çıkıyor”, yani özne man değil eine Störung. auftreten → tritt auf → yan cümlede birleşir: wenn eine Störung auftritt.',
  'Anlamı: Bir yardım hattını aradığında çoğu zaman uzun süre bekleme hattında kalırsın. anrufen ayrılabilen → yan cümlede birleşip sona: wenn man eine Hotline anruft. einer Hotline → eine Hotline (Akkusativ).',
  'Anlamı: İnternette bilgi ararken arama motorları kullanılır. suchen nach + Dativ kalıbı aynen kalır: nach Informationen. sucht en sona.',
  'Anlamı: Yolda çalışırken dizüstü bilgisayar işe yarar. das Arbeiten → arbeiten → wenn man unterwegs arbeitet (arbeitet sonda).',
  'Anlamı: Bilgisayarda dijital fotoğraflara bakarken “Diashow” işlevini kullanabilirsin. von digitalen Fotos (Dativ) → digitale Fotos (Akkusativ nesne). anschauen birleşik ve sonda: anschaut.',
  'Anlamı: İnternetten müzik indirirken telif hakkına dikkat etmeli. herunterladen ayrılabilen; tekil öznede laden → lädt (a → ä). Yan cümlede birleşir: wenn man Musik … herunterlädt.',
  'Anlamı: Yazılım alırken her zaman kendi bilgisayarına uygun olup olmadığını kontrol etmelisin. der Kauf → kaufen → man kauft. “von Software” → Software.',
  'Anlamı: Şifreni girerken kimsenin görmemesine dikkat etmelisin. eingeben → tekil öznede geben → gibt (e → i) → eingibt. seines Passworts (Genitiv) → sein Passwort (Akkusativ).'
]
};

const POOL_WHY = [
  'Anlamı: Mozart beş yaşındayken ilk eserlerini besteledi. Beş yaşında olmak geçmişte tek bir dönem → als.',
  'Anlamı: Her yağmur yağdığında evde kalırdık. “Jedes Mal” (her seferinde) tekrar bildirir; geçmişte tekrarlanan olay → wenn.',
  'Anlamı: Yarın gelirsen sana fotoğrafları gösteririm. Gelecek zaman; als yalnızca geçmişte kullanılır → wenn.',
  'Anlamı: Geçen hafta Berlin’deyken öğretmenime rastladım. “letzte Woche” geçmiş ve tek seferlik → als.',
  'als hangi durumda kullanılır? Geçmişteki tek seferlik eylemlerde (einmalige Handlungen der Vergangenheit). Şimdiki zamanda ve gelecekte her zaman wenn kullanılır.',
  'Geçmişte tekrarlanan eylem (wiederholt + Vergangenheit) → wenn. als sadece geçmişte tek seferlik eylemler içindir.',
  'Anlamı: O yemek pişirirken kadın sofrayı kurdu. während’li cümle Präteritum (kochte) → aynı anda olan ana cümle de Präteritum: deckte.',
  'Anlamı: Anna hep çay içerken (oysa) Ben sadece kahve içer. İki kişinin zıt alışkanlığı → adversativ.',
  'Anlamı: Ben duş alırken telefon çalıyor. İki olay aynı anda → temporal.',
  'Gleichzeitigkeit = eşzamanlılık: iki eylem aynı zamanda gerçekleşir. Önce/sonra ilişkisi Ungleichzeitigkeit, karşıtlık ise Gegensatz’dır.',
  'Anlamı: O denizi sever, oysa kadın dağları sever. Boşluktan sonraki cümlede fiil (liebt) sonda; bu ancak bir yan cümle bağlacından sonra olur → während. dagegen ve aber’den sonra fiil sonda olmazdı (dagegen liebt sie / aber sie liebt).',
  'Anlamı: Bana ihtiyacın olduğu sürece yanında kalırım. Kalma, ihtiyaç süresince devam eder ve onunla biter → solange.',
  'Anlamı: Yatmadan önce dişlerimi fırçalarım. Önce dişler, sonra yatak → bevor.',
  'solange’de iki eylem aynı süre boyunca devam eder ve birlikte biter: ana cümlenin eylemi yan cümleninkiyle aynı anda sona erer.',
  'bevor ile ehe aynı anlama gelir: “-meden önce”. seit “-den beri”, sobald “-ir -mez” demektir.',
  'Anlamı: Gitmeden önce kapıyı kilitledi. bevor’lu cümlede genelde iki cümle aynı zaman kipinde: ging (Präteritum) → schloss (abschließen’in Präteritum’u, ab sonda).',
  'Anlamı: Vardıktan sonra ailemizi aradık. Ana cümle Präteritum (riefen an) → yan cümle Plusquamperfekt. ankommen hareket fiili, sein alır → angekommen waren.',
  'Anlamı: E-postayı yazdıktan sonra bilgisayarı kapatır. Yan cümle Perfekt (geschrieben hat) → ana cümle Präsens: schaltet (… aus).',
  'Anlamı: Sınavı geçtikten sonra bir seyahat yaptı. Yan cümle Plusquamperfekt (bestanden hatte) → ana cümle Präteritum: machte.',
  'nachdem’de iki eylem arasında zaman geçebilir (yemekten bir saat sonra). sobald’da ikinci eylem hemen, ilk eylemin ardından gelir (“-ir -mez”).',
  'Anlamı: Kaplumbağayı görür görmez kaçar. “hemen, aynı anda” ipucu sowie/sobald’ı gösterir. İki eylem aynı anda olduğu için iki cümle de aynı kipte (sieht / läuft).',
  'Ungleichzeitigkeit = eşzamansızlık: yan cümledeki eylem ana cümledekinden önce olur. Bu yüzden nachdem’de zaman kipi değişir (Zeitenwechsel).',
  'Anlamı: Ben dönene kadar burada bekle. Bekleme benim dönüşümle biter → bis (“-e kadar”).',
  'Anlamı: Otobüs gelene kadar daha çok var. Sabit kalıp: Es dauert …, bis.',
  'bis’li cümlelerde Futur I ve Futur II bir tahmin (Vermutung) bildirir: “… muhtemelen bitirmiş olacağım”.',
  'Anlamı: Sen gelene kadar işi bitirmiş olacağım. Futur II = werden + Partizip II + haben/sein: werde … beendet haben.',
  'Anlamı: Berlin’de oturduğundan beri daha mutlu. Berlin’de oturmak geçmişte başladı ve hâlâ sürüyor → seit, Präsens.',
  'Anlamı: İki yıldır Almanca öğreniyorum. Öğrenme hâlâ sürüyor → seit + Dativ (zwei Jahren) + Präsens. “Vor zwei Jahren” = iki yıl önce; şimdiki zamanla uyuşmaz.',
  'Anlamı: Spor yaptığımdan beri kendimi daha iyi hissediyorum. İki durum birlikte sürüyor (paralel) → iki cümle de Präsens: fühle.',
  'seit/seitdem: eylem geçmişte başlar ve şimdiye kadar sürer. Bu yüzden genelde Präsens ile kullanılır.',
  'Anlamı: Taşındığından beri birçok yeni arkadaşı var. Taşınma bir kez oldu ve bitti → Perfekt. umziehen hareket fiili, sein alır: umgezogen ist.',
  'Anlamı: Neden gelmiyorsun? – Çünkü hastayım. Warum? sorusuna konuşmada verilen tipik cevap weil’dir. da daha çok yazılı dil, zumal ise ek ikinci sebep içindir.',
  'da bağlacı bugün neredeyse yalnızca yazılı dilde kullanılır; konuşmada weil tercih edilir.',
  'zumal yeni ve ek bir sebep ekler (“hele ki, üstelik”). Amaç ya da koşul bildirmez.',
  'weil yan cümle bağlacı: çekimli fiil (bin) en sona gider ve weil’den önce virgül gelir. İlk seçenekte fiil 2. sırada kalmış, üçüncüde virgül eksik.',
  'Anlamı: Arabayı almıyorum, çünkü çok pahalı, hele ki şu an param da yok. İlk sebep weil ile verilmiş; ikinci, ek sebep zumal ile eklenir.',
  'Koşul yan cümleleri çoğunlukla Präsens ile kurulur: Wenn du kommst, … Gelecek anlamı bile Präsens ile verilir.',
  'Koşul cümlesinde Futur kullanılırsa ifadenin belirsizliği (Unsicherheit) vurgulanır.',
  'Anlamı: Vaktin varsa uğra. Boşluktan sonra fiil değil özne (du) geliyor; demek ki koşul fiille başlıyor. wenn’siz koşulda çekimli fiil başa gelir → Hast. Wenn/Falls olsaydı fiil sonda olmalıydı (Wenn du Zeit hast).',
  'Anlamı: Erken gelirsen birlikte yemek yiyebiliriz. wenn’siz koşuldan sonra ana cümle so veya dann ile başlayabilir: dann können wir …',
  'Anlamı: Ne zaman eve gelsem önce çay demlerim. “Immer” tekrar ve zaman bildirir; falls yalnızca koşul içindir, zaman için kullanılmaz → wenn.',
  'falls yalnızca açıkça koşul bildiren ifadelerde kullanılabilir; zaman (temporal) ya da sebep (kausal) bildirmez.',
  'Anlamı: On yaşındayken Ankara’ya taşındık. On yaşında olmak geçmişte tek dönem → als. Yan cümle önde: Als ich zehn Jahre alt war (war sonda), ana cümle fiille başlar: zogen wir.',
  'Anlamı: Yemek yerken telefonla konuşuyor. während des Essens → fiil: essen. Özne er; essen düzensizdir: er isst (e → i). isst sona, ana cümle fiille başlar: telefoniert er.',
  'Anlamı: Yola çıkmadan önce bilet alıyor. vor der Abfahrt → abfahren. Tekil sie: fährt (a → ä); ayrılabilen fiil yan cümlede birleşir: bevor sie abfährt.',
  'Anlamı: Yemekten sonra yürüyüşe çıktı. nach dem Essen → nachdem er gegessen hatte. Ana cümle Präteritum (ging) → yan cümle Plusquamperfekt (gegessen hatte).',
  'Anlamı: Duş aldı, şimdi kahvaltı yapıyor. Perfekt (hat geduscht) → Präsens (frühstückt). “Jetzt” düşer, hat sona: Nachdem er geduscht hat, frühstückt er.',
  'Anlamı: Sen gelene kadar burada bekliyorum. Bekleme, gelişinle biter → bis. İki cümle de Präsens; kommst en sonda.',
  'Anlamı: Konya’da oturduğundan beri çok mutlu. İki durum birlikte sürüyor → seit + Präsens. Yan cümle önde: Seit sie in Konya wohnt, ist sie …',
  'Anlamı: Neden bu kadar çok çalışıyorsun? Çünkü sınav zor. Ich lerne so viel, weil die Prüfung schwer ist (ist en sonda).',
  'Anlamı: Çok yağmur yağdığı için maç iptal oluyor. Da es stark regnet (regnet sona), virgül, ana cümle fiille başlar: fällt das Spiel aus (ausfallen ana cümlede ayrılır).',
  'Anlamı: Yorgunsan uyuyabilirsin. wenn düşer, çekimli fiil bist başa gelir: Bist du müde, … Ana cümle yine fiille başlar: kannst du schlafen.',
  'Anlamı: Ders çalışırken müzik dinler. beim Lernen → wenn + fiil: lernen. Özne sie: wenn sie lernt (sonda), hört sie Musik.'
];

Object.entries(WHY).forEach(([id, a]) => a.forEach((w, i) => { if (DRILLS[id] && DRILLS[id].items[i]) DRILLS[id].items[i].why = w; }));
POOL_WHY.forEach((w, i) => { if (POOL[i]) POOL[i].why = w; });
