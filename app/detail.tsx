import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useContext } from 'react';
import { FontContext } from './_layout';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function Detail() {
  const { category, title } = useLocalSearchParams();
  const { fontSize } = useContext(FontContext);
  const [selectedContent, setSelectedContent] = useState<{q: string, a: string} | null>(null);

  // TÜM KATEGORİLERİN DETAYLI VERİSİ
  // TÜM KATEGORİLERİN GERÇEK VE DETAYLI VERİSİ
  const allData: any = {
    'genel': [
      { id: 'g1', q: 'Açık Kalp Ameliyatı Nedir?', a: 'Kalbin durdurularak, vücut fonksiyonlarının kalp-akciğer makinesine devredildiği ve kalbe müdahale edildiği cerrahi işlemdir.' },
      { id: 'g2', q: 'Hastanede yatış süreci nasıldır?', a: 'Ameliyattan 1 gün önce yatış yapılır. Ameliyat sonrası 1-2 gün yoğun bakım, 4-5 gün servis takibi ile toplamda yaklaşık 1 hafta sürer.' },
      { id: 'g3', q: 'Refakatçi gerekebilir mi?', a: 'Evet, özellikle servis aşamasında mobilizasyon (yürüme) desteği için bir yakınınızın olması önerilir.' }
    ],
    'oncesi': [
      { id: 'o1', q: 'Ameliyathane nasıl bir ortam?', a: 'Oldukça temiz (steril), serin ve birçok teknolojik cihazın bulunduğu, ekibin maske ve önlüklerle çalıştığı güvenli bir alandır.' },
      { id: 'o2', q: 'Ameliyatta uyuyacak mıyım?', a: 'Genel anestezi altında olacağınız için tamamen uyuyacaksınız. Ağrı veya işlemle ilgili hiçbir şey hissetmeyeceksiniz.' },
      { id: 'o3', q: 'Ameliyat ne kadar sürecek?', a: 'Yapılacak işleme (bypass, kapak vb.) göre değişmekle birlikte genellikle 3 ile 6 saat arasında tamamlanır.' },
      { id: 'o4', q: 'Vücut hazırlığı nasıl yapılır?', a: 'Ameliyat sabahı özel bir solüsyonla banyo yapmanız ve ameliyat bölgesindeki tüylerin temizlenmesi istenir.' }
    ],
    'ameliyathane': [
      { id: 'a1', q: 'Kalp-Akciğer Makinesi nedir?', a: 'Ameliyat sırasında kalbiniz durdurulduğunda, kanınızı temizleyip vücuda pompalayan hayati bir cihazdır.' },
      { id: 'a2', q: 'Göğüs kemiği nasıl açılır?', a: 'Göğüs kemiği (iman tahtası) özel bir aletle milimetrik olarak açılır ve ameliyat sonunda çelik tellerle tekrar birleştirilir.' }
    ],
    'yogunbakim': [
      { id: 'y1', q: 'Uyandığımda ağzımda tüp olacak mı?', a: 'Evet, ilk uyandığınızda solunum desteği için bir tüp olabilir. Nefes almanız düzene girince bu tüp hızlıca çıkarılacaktır.' },
      { id: 'y2', q: 'Drenler ne işe yarar?', a: 'Ameliyat bölgesinde biriken fazla kanın dışarı atılmasını sağlar. Genellikle 1-2 gün içinde çıkarılırlar.' },
      { id: 'y3', q: 'Susarsam su içebilir miyim?', a: 'Yoğun bakımda ilk saatlerde ağızdan sıvı verilmez, dudaklarınız ıslatılır. Doktor onayından sonra yavaş yavaş içebilirsiniz.' }
    ],
    'servis': [
      { id: 's1', q: 'Ne zaman yürümeye başlarım?', a: 'Yoğun bakımdan servise çıktıktan sonraki ilk saatlerde, hemşire eşliğinde ilk adımlarınızı atmanız istenir.' },
      { id: 's2', q: 'Solunum egzersizi neden önemli?', a: 'Akciğerlerinizin sönmesini engellemek ve balgam atmak için "Triflo" denilen aleti düzenli kullanmalısınız.' },
      { id: 's3', q: 'Beslenme nasıl olmalı?', a: 'Genellikle tuzsuz, az yağlı ve kalp dostu bir diyet programı uygulanır.' }
    ],
    'evde': [
      { id: 'e1', q: 'Yara bakımı nasıl yapılmalı?', a: 'Yaranızı temiz ve kuru tutun. Doktorunuz aksini söylemedikçe pansumanı ıslatmayın.' },
      { id: 'e2', q: 'Ağır kaldırabilir miyim?', a: 'İlk 2 ay göğüs kemiğinin kaynaması için 5 kg\'dan ağır yük kaldırmamanız ve yan yatmamanız gerekir.' },
      { id: 'e3', q: 'Cinsel yaşam ne zaman normale döner?', a: 'Genellikle 4-6 hafta sonra, kendinizi rahat hissettiğinizde başlayabilirsiniz.' }
    ],
    'medya': [
      { id: 'm1', q: 'Eğitim Videoları', a: 'Uygulamanın video bölümünden nefes egzersizi ve yürüme tekniklerini izleyebilirsiniz.' },
      { id: 'm2', q: 'Faydalı Kaynaklar', a: 'Türk Kardiyoloji Derneği ve Sağlık Bakanlığı hasta bilgilendirme broşürleri referans alınmıştır.' }
    ]
  };

  const items = allData[category as string] || [];

  if (selectedContent) {
    return (
      <View style={styles.scrollContainer}>
        <ScrollView>
          <Text style={[styles.qTitle, { fontSize: fontSize + 4 }]}>{selectedContent.q}</Text>
          <Text style={[styles.contentText, { fontSize: fontSize }]}>{selectedContent.a}</Text>
        </ScrollView>
        <View style={styles.footerRow}>
           <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedContent(null)}>
             <Text style={{color: 'white', fontWeight: 'bold'}}>Geri Dön</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.speakBtn} onPress={() => Speech.speak(selectedContent.a, {language: 'tr-TR'})}>
             <Ionicons name="volume-high" size={24} color="white" />
           </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.subCard} onPress={() => setSelectedContent(item)}>
            <Text style={styles.subText}>{item.q}</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b2ebf2', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#008ba3', textAlign: 'center', marginBottom: 25 },
  subCard: { backgroundColor: '#008ba3', padding: 18, borderRadius: 15, marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subText: { color: 'white', fontWeight: '600', fontSize: 14, flex: 1 },
  scrollContainer: { flex: 1, backgroundColor: '#fff', padding: 25 },
  qTitle: { color: '#008ba3', fontWeight: 'bold', marginBottom: 20 },
  contentText: { lineHeight: 30, color: '#444' },
  footerRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  backBtn: { flex: 1, backgroundColor: '#008ba3', padding: 15, borderRadius: 10, alignItems: 'center' },
  speakBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: 60, alignItems: 'center' }
});