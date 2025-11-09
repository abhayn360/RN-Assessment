import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/userSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography, InputText, ButtonText } from '../utils/typography';
import { COLORS } from '../utils/colors';
import CommonButton from '../components/CommonButton';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    const { firstName, lastName, email, password } = formData;
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    
    const userData = { 
      fullName, 
      email: email.trim().toLowerCase(), 
      password 
    };
    
    
    try {
      const result = await dispatch(signupUser(userData));
      if (!signupUser.fulfilled.match(result)) {
        Alert.alert('Sign Up Failed', result.payload || result.error.message);
      } else {
        navigation.replace('SignIn')
      }
    } catch (error) {
      Alert.alert('Sign Up Failed', 'An error occurred. Please try again.');
    }
  };

  const renderInput = ({ label, placeholder, value, onChangeText, error, ...props }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, error ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );

  const renderPasswordInput = ({ label, placeholder, value, onChangeText, showPassword, onTogglePassword, error }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.passwordContainer, error ? styles.inputError : null]}>
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up Account</Text>
            <Text style={styles.subtitle}>
              Enter your personal data to create your account.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                {renderInput({
                  label: 'First Name',
                  placeholder: 'eg. John',
                  value: formData.firstName,
                  onChangeText: (value) => handleInputChange('firstName', value),
                  autoCapitalize: 'words',
                  error: errors.firstName,
                })}
              </View>
              <View style={styles.nameField}>
                {renderInput({
                  label: 'Last Name',
                  placeholder: 'eg. Francisco',
                  value: formData.lastName,
                  onChangeText: (value) => handleInputChange('lastName', value),
                  autoCapitalize: 'words',
                  error: errors.lastName,
                })}
              </View>
            </View>

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
            {!errors.password &&
                        <Text style={styles.passwordHint}>Must be at least 8 characters.</Text>

            }

            {renderPasswordInput({
              label: 'Confirm Password',
              placeholder: 'Confirm password',
              value: formData.confirmPassword,
              onChangeText: (value) => handleInputChange('confirmPassword', value),
              showPassword: showConfirmPassword,
              onTogglePassword: () => setShowConfirmPassword(!showConfirmPassword),
              error: errors.confirmPassword,
            })}

            <CommonButton
              title="Sign Up"
              onPress={handleSignUp}
              disabled={loading}
              loading={loading}
            />

            <TouchableOpacity
              style={styles.logInContainer}
              onPress={() => navigation.replace('SignIn')}
              activeOpacity={0.7}
            >
              <Text style={styles.logInText}>
                Already have an account?{' '}
                <Text style={styles.logInLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    ...Typography.captionSmall,
    color: '#DC2626',
    marginTop: 4,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderColor: COLORS.border,
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
    textShadowColor: 'transparent',
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: COLORS.textMuted,
    textAlign: 'center',
    textShadowColor: 'transparent',
  },
  form: {
    gap: 20,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    ...InputText.label,
    color: COLORS.text,
    textShadowColor: 'transparent',
  },
  textInput: {
    ...InputText.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.text,
    borderWidth: .5,
    borderColor: COLORS.border,
     backgroundColor:'#F5F5F5' ,
    textShadowColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor:'#F5F5F5' ,
  },
  passwordInput: {
    ...InputText.default,
    flex: 1,
    borderWidth: .5,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: COLORS.text,
    textShadowColor: 'transparent',
  },
  passwordToggle: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  passwordHint: {
    ...Typography.captionSmall,
    color: COLORS.textMuted,
    marginTop: -16,
    marginBottom: 4,
    textShadowColor: 'transparent',
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  signUpButtonText: {
    ...ButtonText.medium,
    color: COLORS.white,
  },
  logInContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  logInText: {
    ...Typography.bodyMedium,
    color: COLORS.textMuted,
    textShadowColor: 'transparent',
  },
  logInLink: {
    ...Typography.bodyMedium,
    color: COLORS.text,
    fontWeight: '600',
    textShadowColor: 'transparent',
  },
});