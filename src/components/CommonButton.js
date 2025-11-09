import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';
import { ButtonText } from '../utils/typography';

export default function CommonButton({ 
  title, 
  onPress, 
  style, 
  disabled, 
  loading,
  textStyle
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {loading ? `${title}...` : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  buttonText: {
    ...ButtonText.medium,
    color: COLORS.white,
  },
});