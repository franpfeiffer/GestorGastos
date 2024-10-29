import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useExpenses } from '../contexts/ExpenseContext';

const InitialSetupScreen = ({ navigation }) => {
  const { updateUserName, setIsFirstLaunch } = useExpenses();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      updateUserName(name.trim());
      setIsFirstLaunch(false);
      navigation.replace('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenida a tu app de gastos</Text>
      <Text style={styles.subtitle}>¿Cómo te llamas?</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FF69B4',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InitialSetupScreen;
