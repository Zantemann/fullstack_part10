import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<SignInForm onSubmit={onSubmit} />);

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      fireEvent.changeText(usernameInput, 'moikku');
      fireEvent.changeText(passwordInput, '12345');

      const submitButton = getByText('Log in');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'moikku', password: '12345'
        })
      });
    });
  });
});