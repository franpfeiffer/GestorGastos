import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useExpenses } from '../contexts/ExpenseContext';
import { PieChart, BarChart } from 'react-native-chart-kit';

const StatsScreen = () => {
  const { expenses, budget } = useExpenses();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = budget - totalExpenses;


  const categoryTotals = expenses.reduce((acc, expense) => {

    if (!acc[expense.category]) {

      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([category, total], index) => ({
    name: category,
    amount: total,
    color: `hsl(${index * 40}, 70%, 50%)`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const barChartData = {

    labels: ['Presupuesto', 'Gastos', 'Balance'],

    datasets: [
      {
        data: [budget, totalExpenses, balance],
      },
    ],
  };

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Presupuesto</Text>
          <Text style={styles.summaryAmount}>${budget.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gastos Totales</Text>
          <Text style={styles.summaryAmount}>${totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={[styles.summaryAmount, { color: balance >= 0 ? 'green' : 'red' }]}>
            ${balance.toFixed(2)}
          </Text>
        </View>
      </View>
      <Text style={styles.chartTitle}>Distribución de Gastos por Categoría</Text>
      <PieChart
        data={pieChartData}
        width={Dimensions.get('window').width - 40}

        height={220}
        chartConfig={{
          backgroundColor: '#FFF',

          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <Text style={styles.chartTitle}>Resumen Financiero</Text>
      <BarChart
        data={barChartData}
        width={Dimensions.get('window').width - 40}
        height={220}

        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#FF69B4',

          backgroundGradientFrom: '#FF69B4',
          backgroundGradientTo: '#FFB6C1',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{

          marginVertical: 8,
          borderRadius: 16,
        }}

      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',

    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default StatsScreen;
