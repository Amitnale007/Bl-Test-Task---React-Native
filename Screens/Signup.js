import React from 'react';
import { View, TextInput, Text, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = ({ navigation }) => {
  const storeUserData = async (values) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(values));
      console.log(values)
      Alert.alert('Signup Success', 'You are now signed up!');
      navigation.navigate('Login'); 
    } catch (e) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => storeUserData(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="flex-1 justify-center bg-white p-6">
          <Text className="text-3xl font-bold mb-8 text-center text-blue-600">Sign Up</Text>

          <TextInput
            className="border border-gray-300 p-4 rounded mb-4"
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {errors.username && touched.username ? <Text className="text-red-600 mb-4">{errors.username}</Text> : null}

          <TextInput
            className="border border-gray-300 p-4 rounded mb-4"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email ? <Text className="text-red-600 mb-4">{errors.email}</Text> : null}

          <TextInput
            className="border border-gray-300 p-4 rounded mb-4"
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password ? <Text className="text-red-600 mb-4">{errors.password}</Text> : null}

          <Pressable className="bg-blue-500 p-4 rounded mt-4" onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold">Sign Up</Text>
          </Pressable>

          <Pressable className="mt-4" onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 text-center">Already have an account? Login</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default Signup;
