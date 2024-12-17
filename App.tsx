import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import BoardListScreen from './src/screens/BoardListScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainHome" 
        component={MainScreen} 
        options={{ 
          headerShown: true,
          title: 'TOP 3 게시물',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#2196F3',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen} 
        options={{ 
          title: '게시물 상세',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#2196F3',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack.Navigator>
  );
};

const BoardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BoardHome" 
        component={BoardListScreen} 
        options={{ 
          headerShown: true,
          title: '게시물 목록',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#2196F3',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen} 
        options={{ 
          title: '게시물 상세',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#2196F3',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack.Navigator>
  );
};

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const theme = {
    dark: {
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      border: '#2D2D2D',
      primary: '#2196F3',
    },
    light: {
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#000000',
      border: '#E0E0E0',
      primary: '#2196F3',
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === '홈' ? 'home' : 'list';
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.light.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: currentTheme.card,
            borderTopColor: currentTheme.border,
          },
        })}
      >
        <Tab.Screen 
          name="홈" 
          component={MainStack}
          options={{ 
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="게시판 목록" 
          component={BoardStack}
          options={{ 
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;