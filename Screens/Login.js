import React from 'react';
import { View, TextInput, Text, Alert, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({ navigation }) => {
  const handleLogin = async (values) => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === values.email && userData.password === values.password) {
          await AsyncStorage.setItem('userEmail', values.email);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No user found, please sign up');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to log in');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="flex-1 justify-center bg-white p-6">
          <Text className="text-3xl font-bold mb-8 text-center text-blue-600">Login</Text>

          <TextInput
            className="border border-gray-300 p-4 rounded mb-4"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email ? <Text className="text-red-600 mb-3">{errors.email}</Text> : null}

          <TextInput
            className="border border-gray-300 p-4 rounded mb-4"
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password ? <Text className="text-red-600 mb-4">{errors.password}</Text> : null}

          <Pressable className="bg-blue-500 p-4 rounded mb-4" onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold">Login</Text>
          </Pressable>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-blue-600 text-center">Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Login;
