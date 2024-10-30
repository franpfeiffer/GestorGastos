import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useExpenses } from '../contexts/ExpenseContext';

const BudgetScreen = () => {
  const { budget, updateBudget } = useExpenses();
  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleUpdateBudget = () => {
    const updatedBudget = parseFloat(newBudget);
    if (!isNaN(updatedBudget) && updatedBudget >= 0) {
      updateBudget(updatedBudget);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presupuesto</Text>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetTitle}>Presupuesto actual</Text>
        <Text style={styles.budgetAmount}>${budget.toFixed(2)}</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.updateTitle}>Actualizar presupuesto</Text>
        <TextInput
          style={styles.input}
          value={newBudget}
          onChangeText={setNewBudget}
          keyboardType="numeric"
          placeholder="Nuevo presupuesto"
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateBudget}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',

    color: '#333',
  },
  updateContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#FF69B4',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BudgetScreen;
