import { useState, useEffect } from 'react';
import { Text, View, Button, ActivityIndicator, Share } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>(); 

  const { theme , toggleTheme  } = useThemeContext();
  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://zenquotes.io/api/random');
      const quoteText = response.data[0]?.q;
      const author = response.data[0]?.a;
      setQuote(`"${quoteText}"\n\n- ${author}`);
    } catch (error) {
      setQuote('Failed to fetch quote.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: quote,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveToFavorites = async () => {
  try {
    const existing = await AsyncStorage.getItem('favorites');
    const favorites = existing ? JSON.parse(existing) : [];

    if (!favorites.includes(quote)) {
      favorites.push(quote);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Quote saved to favorites!');
    } else {
      alert('Quote is already in favorites.');
    }
  } catch (error) {
    console.log('Failed to save favorite:', error);
  }
};



  useEffect(() => {
    fetchQuote();
  }, []);

  return (
  <View className={`flex-1 justify-center px-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <TouchableOpacity
  onPress={toggleTheme}
  className={`flex-row items-center justify-center ${
    theme === 'light' ? 'bg-black' : 'bg-white'
  } py-3 px-4 rounded-lg mt-2`}
>
  <Ionicons
    name={theme === 'light' ? 'moon' : 'sunny'}
    size={20}
    color={theme === 'light' ? '#fff' : '#000'}
  />
  <Text
    className={`font-semibold ml-2 ${
      theme === 'light' ? 'text-white' : 'text-black'
    }`}
  >
    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
  </Text>
</TouchableOpacity>

   {loading ? (
  <ActivityIndicator size="large" color="#000" />
) : (
  <Animated.Text
    className={`text-xl italic mb-5 text-center ${theme === 'light' ? 'text-black' : 'text-white'}`}
    entering={FadeIn}
    exiting={FadeOut}
    layout={Layout}
  >
    {quote}
  </Animated.Text>
)}
<View className="mb-4">
  <TouchableOpacity
    onPress={fetchQuote}
    className="flex-row items-center justify-center bg-blue-600 py-3 px-4 rounded-lg"
  >
    <Ionicons name="refresh" size={20} color="#fff" className="mr-2" />
    <Text className="text-white font-semibold ml-2">New Quote</Text>
  </TouchableOpacity>
</View>

<View className="mb-4">
  <TouchableOpacity
    onPress={handleShare}
    className="flex-row items-center justify-center bg-green-600 py-3 px-4 rounded-lg"
  >
    <Ionicons name="share-social" size={20} color="#fff" />
    <Text className="text-white font-semibold ml-2">Share Quote</Text>
  </TouchableOpacity>
</View>

<TouchableOpacity
  onPress={saveToFavorites}
  className="flex-row items-center justify-center bg-yellow-500 py-3 px-4 rounded-lg mb-4"
>
  <Ionicons name="star" size={20} color="#fff" />
  <Text className="text-white font-semibold ml-2">Save to Favorites</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => navigation.navigate('Favorites')}
  className="flex-row items-center justify-center bg-purple-600 py-3 px-4 rounded-lg mt-2"
>
  <Ionicons name="heart" size={20} color="#fff" />
  <Text className="text-white font-semibold ml-2">View Favorites</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => navigation.navigate('About')}
  className="flex-row items-center justify-center bg-gray-700 py-3 px-4 rounded-lg"
>
  <Ionicons name="information-circle" size={20} color="#fff" />
  <Text className="text-white font-semibold ml-2">About</Text>
</TouchableOpacity>

    </View>
  );
}
