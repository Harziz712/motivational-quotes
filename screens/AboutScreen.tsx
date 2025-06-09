// screens/AboutScreen.tsx
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">About This App</Text>
      <Text className="text-base text-center">
        This motivational quote app was built using React Native, Expo, and TypeScript.
        It fetches real quotes from ZenQuotes API and lets you share inspiration with the world.
      </Text>
    </View>
  );
}
