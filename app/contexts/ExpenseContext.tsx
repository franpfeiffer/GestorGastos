import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  budget: number;
  updateBudget: (amount: number) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    loadExpenses();
    loadBudget();
  }, []);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const loadBudget = async () => {
    try {
      const storedBudget = await AsyncStorage.getItem('budget');
      if (storedBudget) {
        setBudget(parseFloat(storedBudget));
      }
    } catch (error) {
      console.error('Error loading budget:', error);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const removeExpense = async (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const updateExpense = async (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const updateBudget = async (amount: number) => {
    setBudget(amount);
    await AsyncStorage.setItem('budget', amount.toString());
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, updateExpense, budget, updateBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
