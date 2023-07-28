import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import theme from '../theme'

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
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
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