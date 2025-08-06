import React, { useState } from 'react';
import { SafeAreaView, View, Button, StyleSheet, Alert } from 'react-native';
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
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <EmailInput
          value={email}
          onChangeText={handleEmailChange}
          onBlur={handleEmailBlur}
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
    backgroundColor: '#f6f6f6ff',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
});

export default App;
