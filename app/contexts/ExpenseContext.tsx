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
  userName: string;
  updateUserName: (name: string) => void;
  isFirstLaunch: boolean;
  setIsFirstLaunch: (value: boolean) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(0);
  const [userName, setUserName] = useState('');
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const storedBudget = await AsyncStorage.getItem('budget');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedIsFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

      if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
      if (storedBudget) setBudget(parseFloat(storedBudget));
      if (storedUserName) setUserName(storedUserName);
      if (storedIsFirstLaunch) setIsFirstLaunch(JSON.parse(storedIsFirstLaunch));
    } catch (error) {
      console.error('Error loading data:', error);
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

  const updateUserName = async (name: string) => {
    setUserName(name);
    await AsyncStorage.setItem('userName', name);
  };

  const setIsFirstLaunchAndSave = async (value: boolean) => {
    setIsFirstLaunch(value);
    await AsyncStorage.setItem('isFirstLaunch', JSON.stringify(value));
  };

  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        addExpense, 
        removeExpense, 
        updateExpense, 
        budget, 
        updateBudget,
        userName,
        updateUserName,
        isFirstLaunch,
        setIsFirstLaunch: setIsFirstLaunchAndSave
      }}
    >
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
