import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useExpenses } from '../../contexts/ExpenseContext';

export default function BudgetScreen() {
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
      <Text style={styles.title}>Presupuesto Mensual</Text>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetLabel}>Presupuesto actual:</Text>
        <Text style={styles.budgetAmount}>${budget.toFixed(2)}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newBudget}
          onChangeText={setNewBudget}
          keyboardType="numeric"
          placeholder="Nuevo presupuesto"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateBudget}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  budgetLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#FF69B4',
    padding:  10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
