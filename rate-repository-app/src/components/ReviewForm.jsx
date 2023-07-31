import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text'
import theme from '../theme'
import { useNavigate } from "react-router-native";
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    padding: 15,
    backgroundColor: '#ffffff'
  },
  errorText: {
    color: 'red',
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
    paddingTop: 10
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  text: yup.string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [review] = useReview();
  const [error, setError] = useState('');

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const handleSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const data = await review({ repositoryName, ownerName, rating: parseInt(rating), text });

      if (data?.createReview?.repositoryId){
        navigate(`/${data.createReview.repositoryId}`)
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError('Unknown error occurred.');
      }
      setTimeout(() => {
        setError('');
      }, 5000);

    } catch (error) {
      console.log('Error creating review:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
            style={styles.input}
          />
          
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository Name"
            style={styles.input}
          />

          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            style={styles.input}
          />
          
          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Create a review</Text>
          </Pressable>
          {error &&
            <Text style={styles.error}>{error}</Text>
          }
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;