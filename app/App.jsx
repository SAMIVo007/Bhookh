import * as React from 'react';
import '../global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useAppState from './store/AppState';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import {
  backgroungColor,
  foregroundColor,
  primaryColor,
} from './constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favouraites"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const {isAuthenticated} = useAppState();

  return (
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
  );
}
