import * as React from 'react';
import '../global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useAppState from './store/AuthState';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import {
  backgroungColor,
  foregroundColor,
  primaryColor,
} from './constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable, View} from 'react-native';
import Favouraites from './pages/Favouraites';
import Search from './pages/Search';
import Profile from './pages/Profile';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarIconStyle: {
          flex: 1,
          width: '100%',
        },
        tabBarStyle: {height: 90, paddingBottom: 12},
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                backgroundColor: focused ? backgroungColor : 'transparent',
                borderRadius: 8,
                padding: 10,
              }}>
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={35}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favouraites"
        component={Favouraites}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                backgroundColor: focused ? backgroungColor : 'transparent',
                borderRadius: 8,
                padding: 10,
              }}>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={32}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                backgroundColor: focused ? backgroungColor : 'transparent',
                borderRadius: 8,
                padding: 14,
              }}>
              <Fontisto name="search" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                backgroundColor: focused ? backgroungColor : 'transparent',
                borderRadius: 8,
                padding: 10,
                paddingHorizontal: 14,
              }}>
              <Octicons name="person" size={30} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const {isAuthenticated} = useAppState();

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen
              name="Dashboard"
              component={HomeTabs}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
