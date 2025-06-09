// screens/FavoritesScreen.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavorites(JSON.parse(data));
    };

    loadFavorites();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-bold mb-4 text-center">Favorite Quotes</Text>
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
