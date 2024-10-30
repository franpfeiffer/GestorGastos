import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useExpenses } from '../contexts/ExpenseContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const HomeScreen = () => {
  const { expenses, budget } = useExpenses();
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = budget - totalExpenses;
  const recentTransactions = expenses.slice(0, 5).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a!</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Balance actual</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetTitle}>Presupuesto mensual</Text>
        <Text style={styles.budgetAmount}>${budget.toFixed(2)}</Text>
      </View>
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Transacciones recientes</Text>
        <FlatList
          data={recentTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionDate}>
                  {format(new Date(item.date), 'dd MMM yyyy', { locale: es })}
                </Text>
              </View>
              <Text style={[styles.transactionAmount, { color: '#FF4136' }]}>
                -${item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
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
  balanceContainer: {
    backgroundColor: '#FF69B4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  budgetContainer: {
    backgroundColor: '#FFB6C1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  budgetTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  transactionsContainer: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
