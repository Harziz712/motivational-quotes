// screens/FavoritesScreen.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '../context/ThemeContext';


export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme } = useThemeContext();

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavorites(JSON.parse(data));
    };

    loadFavorites();
  }, []);

  return (
  <ScrollView className={`flex-1 px-4 py-6 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
    <Text className={`text-2xl font-bold text-center mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
      Favorite Quotes
    </Text>
    {favorites.length === 0 ? (
        <Text className="text-center text-gray-500">No favorites yet.</Text>
      ) : (
        favorites.map((q, idx) => (
          <View
            key={idx}
            className="mb-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300"
          >
            <Text className="italic">{q}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
