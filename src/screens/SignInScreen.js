import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../redux/userSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography, InputText, ButtonText } from '../utils/typography';
import { COLORS } from '../utils/colors';
import CommonButton from '../components/CommonButton';

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateAndSubmit = async () => {
    const { email, password } = formData;
    const newErrors = {};
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const result = await dispatch(signinUser({ email: normalizedEmail, password }));
      if (!signinUser.fulfilled.match(result)) {
        setErrors({ password: result.payload || result.error.message });
      } else {
        navigation.replace('Tabs')
      }
    } catch (error) {
      console.error(' SignIn error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const renderInput = ({ label, placeholder, value, onChangeText, error, ...props }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, error && styles.textInputError]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const renderPasswordInput = ({ label, placeholder, value, onChangeText, showPassword, onTogglePassword, error }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.passwordContainer, error && styles.passwordContainerError]}>
        <TextInput
          style={styles.passwordInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={onTogglePassword}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Enter your details to login
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {errors.general && (
              <View style={styles.generalErrorContainer}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            {renderInput({
              label: 'Email',
              placeholder: 'eg. johnfrans@gmail.com',
              value: formData.email,
              onChangeText: (value) => handleInputChange('email', value),
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              error: errors.email,
            })}

            {renderPasswordInput({
              label: 'Password',
              placeholder: 'Enter your password',
              value: formData.password,
              onChangeText: (value) => handleInputChange('password', value),
              showPassword,
              onTogglePassword: () => setShowPassword(!showPassword),
              error: errors.password,
            })}

            <CommonButton
              title="Login"
              onPress={validateAndSubmit}
              disabled={loading}
              loading={loading}
            />

            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => navigation.replace('SignUp')}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <Text style={styles.signUpLink}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 32,
 
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    ...Typography.displaySmall,
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    ...InputText.label,
    color: COLORS.text,
  },
  textInput: {
    ...InputText.default,
    borderWidth: .5,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
    backgroundColor: '#F5F5F5',
  },
  textInputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  passwordContainerError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  passwordInput: {
    ...InputText.default,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
  },
  passwordToggle: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  errorText: {
    ...Typography.bodySmall,
    color: '#DC2626',
    marginTop: 4,
  },
  generalErrorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  generalErrorText: {
    ...Typography.bodyMedium,
    color: '#DC2626',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  loginButtonText: {
    ...ButtonText.medium,
    color: COLORS.white,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  signUpText: {
    ...Typography.bodyMedium,
    color: COLORS.textMuted,
  },
  signUpLink: {
    ...Typography.bodyMedium,
    color: COLORS.text,
    fontWeight: '600',
  },
});