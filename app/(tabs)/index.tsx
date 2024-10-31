import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useExpenses } from '../../contexts/ExpenseContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HomeScreen() {
  const { expenses, budget, userName, updateUserName } = useExpenses();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = budget - totalExpenses;

  const recentTransactions = expenses.slice(0, 5).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleUpdateName = () => {
    if (newName.trim()) {
      updateUserName(newName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido/a, {userName}!</Text>
        <TouchableOpacity onPress={() => setIsEditingName(true)}>
          <Text style={styles.editName}>Editar nombre</Text>
        </TouchableOpacity>
      </View>
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
              <Text style={styles.transactionAmount}>
                -${item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
      <Modal
        visible={isEditingName}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar nombre</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Ingresa tu nuevo nombre"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditingName(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  editName: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#FF69B4',
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
    color: '#FF4136',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF69B4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFB6C1',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

