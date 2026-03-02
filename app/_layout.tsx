import { Stack } from 'expo-router';
import { createContext, useState } from 'react';

export const FontContext = createContext({ fontSize: 18, setFontSize: (s: number) => {} });

export default function RootLayout() {
  const [fontSize, setFontSize] = useState(18);

  return (
    <FontContext.Provider value={{ fontSize, setFontSize }}>
      {/* Slot yerine Stack kullanarak navigasyonu aktif ediyoruz */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#008ba3' },
          headerTintColor: '#fff',
        }}
      />
    </FontContext.Provider>
  );
}