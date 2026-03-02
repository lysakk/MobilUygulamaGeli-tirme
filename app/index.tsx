import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function Home() {
  const router = useRouter();

  const menuItems = [
    { id: '1', title: 'GENEL BİLGİLER', slug: 'genel' },
    { id: '2', title: 'AMELİYAT ÖNCESİ DÖNEM', slug: 'oncesi' },
    { id: '3', title: 'AMELİYATHANE DÖNEMİ', slug: 'ameliyathane' },
    { id: '4', title: 'AMELİYAT SONRASI YOĞUN BAKIM', slug: 'yogunbakim' },
    { id: '5', title: 'AMELİYAT SONRASI SERVİS BAKIMI', slug: 'servis' },
    { id: '6', title: 'AMELİYAT SONRASI EVDE BAKIM', slug: 'evde' },
    { id: '7', title: 'VİDEOLAR VE KAYNAKLAR', slug: 'medya' },
    { id: 'settings', title: 'YAZI BOYUTU AYARLARI', isSettings: true },
  ];

  const speak = (text: string) => {
    Speech.speak(text, { language: 'tr-TR' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={() => item.isSettings ? router.push('/settings') : router.push({ pathname: '/detail', params: { category: item.slug, title: item.title } })}
            >
              <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.audioButton} onPress={() => speak(item.title)}>
              <Ionicons name="volume-medium-outline" size={24} color="#008ba3" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b2ebf2', padding: 15 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  mainButton: { flex: 1, backgroundColor: '#00BCD4', padding: 20, borderRadius: 30, elevation: 3 },
  audioButton: { backgroundColor: 'white', width: 55, height: 55, borderRadius: 28, marginLeft: 10, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }
});