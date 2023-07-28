import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme'

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style];
  return <NativeTextInput style={[textInputStyle, error && styles.errorInput]} {...props} />;
};

export default TextInput;