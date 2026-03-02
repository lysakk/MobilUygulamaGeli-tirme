import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { FontContext } from './_layout';

export default function Settings() {
  const { fontSize, setFontSize } = useContext(FontContext);

  const sizes = [
    { label: 'KÜÇÜK', value: 14 },
    { label: 'ORTA', value: 18 },
    { label: 'BÜYÜK', value: 24 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Okuma Boyutunu Seçin</Text>
      {sizes.map((s) => (
        <TouchableOpacity 
          key={s.value}
          style={[styles.option, fontSize === s.value && styles.selected]}
          onPress={() => setFontSize(s.value)}
        >
          <Text style={[styles.optionText, fontSize === s.value && {color: 'white'}]}>{s.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, color: '#008ba3' },
  option: { width: '100%', padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0', marginVertical: 10, alignItems: 'center' },
  selected: { backgroundColor: '#4CAF50' },
  optionText: { fontWeight: 'bold' }
});