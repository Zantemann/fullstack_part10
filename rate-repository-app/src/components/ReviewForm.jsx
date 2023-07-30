import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text'
import { GET_REPOSITORY } from '../graphql/queries'
import { CREATE_REVIEW } from '../graphql/mutations'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner\'s username is required'),
  repositoryName: yup.string().required('Repository\'s name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  text: yup.string(),
});

const ReviewForm = ({ repositoryId, onSubmit }) => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      await createReview({
        variables: {
          repositoryName: values.repositoryName,
          ownerName: values.ownerName,
          rating: parseInt(values.rating),
          text: values.text || null,
        },
        refetchQueries: [{ query: GET_REPOSITORY, variables: { repositoryId }, fetchPolicy: 'cache-and-network' }],
      });

      onSubmit();
    } catch (error) {
      console.log('Error creating review:', error);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
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
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Log in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;