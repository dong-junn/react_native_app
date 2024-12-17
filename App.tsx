import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import PostCreateScreen from './src/screens/PostCreateScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === '홈') {
              iconName = 'home';
            } else if (route.name === '로그인') {
              iconName = 'user';
            } else if (route.name === '게시물 등록') {
              iconName = 'plus-square';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="홈" component={MainScreen} />
        <Tab.Screen name="로그인" component={LoginScreen} />
        <Tab.Screen name="게시물 등록" component={PostCreateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;