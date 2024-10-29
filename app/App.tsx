import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import BudgetScreen from './screens/BudgetScreen';
import StatsScreen from './screens/StatsScreen';
import { ExpenseProvider } from './contexts/ExpenseContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Gastos') {
                iconName = focused ? 'cash' : 'cash-outline';
              } else if (route.name === 'Presupuesto') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              } else if (route.name === 'Estadísticas') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF69B4',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Gastos" component={ExpensesScreen} />
          <Tab.Screen name="Presupuesto" component={BudgetScreen} />
          <Tab.Screen name="Estadísticas" component={StatsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}
