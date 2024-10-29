import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import BudgetScreen from './screens/BudgetScreen';

import StatsScreen from './screens/StatsScreen';
import AnotherScreen from './screens/AnotherScreen'; // Ejemplo de otra pantalla
import { ExpenseProvider } from './contexts/ExpenseContext';

const Tab = createBottomTabNavigator();

type IconName = 
  | 'home'
  | 'home-outline'
  | 'cash'
  | 'cash-outline'
  | 'wallet'
  | 'wallet-outline'
  | 'bar-chart'
  | 'bar-chart-outline'
  | 'alert';


export default function App() {
  return (
    <ExpenseProvider>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: IconName;

              if (route.name === 'Inicio') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Gastos') {
                iconName = focused ? 'cash' : 'cash-outline';
              } else if (route.name === 'Presupuesto') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              } else if (route.name === 'Estadísticas') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              } else {
                iconName = 'alert'; // Valor predeterminado
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF69B4',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} options={{ independent: true }} />
          <Tab.Screen name="Gastos" component={ExpensesScreen} options={{ independent: true }} />
          <Tab.Screen name="Presupuesto" component={BudgetScreen} options={{ independent: true }} />
          <Tab.Screen name="Estadísticas" component={StatsScreen} options={{ independent: true }} />
        </Tab.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}

