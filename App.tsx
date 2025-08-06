import React, { useState } from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import EmailInput from './EmailInput';

const validateEmail = (email: string) => {
  if (!email) return 'El correo no puede estar vacío.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Correo electrónico incorrecto';
  if (email.endsWith('.co')) return 'El dominio .co no está permitido';
  return null;
};

const App = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const handleLogin = () => {
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      alert(`Email válido: ${email}`);
    }
  };

  const handleEmailChange = text => {
    if (emailError) {
      setEmailError(null);
    }
    setEmail(text);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <EmailInput
          value={email}
          onChangeText={handleEmailChange}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={{ height: 20 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e9e9efff',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
});

export default App;
