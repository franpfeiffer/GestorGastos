import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useExpenses } from '../contexts/ExpenseContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ExpensesScreen = () => {

  const { expenses, addExpense, removeExpense, updateExpense } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    if (description && amount && category) {
      const newExpense = {
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
      };
      addExpense(newExpense);
      setDescription('');
      setAmount('');
      setCategory('');

      setModalVisible(false);
    }
  };


  const handleEditExpense = () => {
    if (description && amount && category && editingExpense) {
      const updatedExpense = {
        ...editingExpense,

        description,
        amount: parseFloat(amount),
        category,
      };
      updateExpense(updatedExpense);
      setEditingExpense(null);
      setDescription('');

      setAmount('');
      setCategory('');
      setModalVisible(false);
    }
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Gastos</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Agregar Gasto</Text>
      </TouchableOpacity>
      <FlatList

        data={expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.expenseItem} onPress={() => openEditModal(item)}>
            <View>
              <Text style={styles.expenseDescription}>{item.description}</Text>

              <Text style={styles.expenseCategory}>{item.category}</Text>
              <Text style={styles.expenseDate}>
                {format(new Date(item.date), 'dd MMM yyyy', { locale: es })}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>-${item.amount.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingExpense ? 'Editar Gasto' : 'Agregar Gasto'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={description}

              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}

              placeholder="Monto"
              value={amount}

              onChangeText={setAmount}
              keyboardType="numeric"

            />
            <TextInput
              style={styles.input}
              placeholder="Categoría"

              value={category}
              onChangeText={setCategory}
            />
            <TouchableOpacity

              style={styles.submitButton}
              onPress={editingExpense ? handleEditExpense : handleAddExpense}
            >
              <Text style={styles.submitButtonText}>

                {editingExpense ? 'Actualizar' : 'Agregar'}
              </Text>

            </TouchableOpacity>
            {editingExpense && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  removeExpense(editingExpense.id);
                  setModalVisible(false);
                  setEditingExpense(null);

                }}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            )}

            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {

                setModalVisible(false);
                setEditingExpense(null);
                setDescription('');
                setAmount('');
                setCategory('');

              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addButton: {

    backgroundColor: '#FF69B4',

    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {

    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  expenseDescription: {
    fontSize: 16,
    color: '#333',
  },
  expenseCategory: {
    fontSize: 14,
    color: '#666',
  },
  expenseDate: {
    fontSize: 12,
    color: '#888',
  },
  expenseAmount: {
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
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,

    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF69B4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4136',
    padding: 10,
    borderRadius: 5,

    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExpensesScreen;
