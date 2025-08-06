import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

const COLORS = {
  background: '#141534',
  error: '#B44B4B',
  errorBackground: '#B44B4B1A',
  primaryDark: '#2F305A',
  textLight: '#FFFFFF',
  textMuted: '#A0A0B0',
};

const EmailInput = ({
  value,
  onChangeText,
  onBlur: customOnBlur,
  label = 'Correo electrónico',
  placeholder = 'Escribe tu correo electrónico',
  error,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (customOnBlur) {
      customOnBlur();
    }
  };

  const hasValue = value.length > 0;
  const hasError = Boolean(error);
  const showPillLayout = isFocused || hasValue || hasError;

  const containerStyle = [
    styles.container,
    showPillLayout && styles.pillContainer,
    hasError && styles.pillErrorContainer,
    !showPillLayout && styles.idleContainer,
  ];

  const labelText = hasError ? error : label;
  const labelStyle = [styles.label, hasError && styles.labelError];
  const inputTextColor = hasError ? COLORS.error : COLORS.textLight;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => inputRef.current?.focus()}
      activeOpacity={1}
    >
      {showPillLayout ? (
        <>
          <View style={styles.textWrapper}>
            <Text style={labelStyle}>{labelText}</Text>
            <TextInput
              ref={inputRef}
              style={[styles.textInput, { color: inputTextColor }]}
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor={COLORS.textMuted}
              {...textInputProps}
            />
          </View>
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          ref={inputRef}
          style={styles.idleTextInput}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          {...textInputProps}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  idleContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 16,
    borderColor: 'transparent',
  },
  idleTextInput: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: COLORS.textLight,
  },
  pillContainer: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'transparent',
  },
  pillErrorContainer: {
    backgroundColor: COLORS.errorBackground,
    borderColor: COLORS.error,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  labelError: {
    color: COLORS.error,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: COLORS.textLight,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
  },
});

export default EmailInput;
