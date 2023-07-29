import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import theme from '../theme'
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    padding: 15,
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 5
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: theme.colors.error,
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate()
  const [error, setError] = useState(false);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });

      if(data.authenticate) {
        navigate('/');
      } else {
        setError(true);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <>
        <FormikTextInput 
          name="username"
          placeholder="Username"
          autoCapitalize="none"
          style={styles.input}
        />
        <FormikTextInput name="password"
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        {error && 
        <Text style={styles.error}>Invalid username or password</Text>}
         <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Log in</Text>
          </Pressable>
        </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;