import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'expenses') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'budget') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'stats') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Gastos',
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Presupuesto',
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estadísticas',
        }}
      />
    </Tabs>
  );
}
