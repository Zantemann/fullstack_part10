import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
//import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signIn" element={<SignIn />} exact />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;