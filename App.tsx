import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;