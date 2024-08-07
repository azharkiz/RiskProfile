import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignupScreen from '../src/Modules/SignupScreen';

// Mock the Firebase auth module
jest.mock('@react-native-firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock the Alert module
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('SignupScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen navigation={{ navigate: jest.fn() }} />
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Already have an account? Log In')).toBeTruthy();
  });

  it('navigates to login screen', () => {
    const navigateMock = jest.fn();

    const { getByText } = render(<SignupScreen navigation={{ navigate: navigateMock }} />);

    fireEvent.press(getByText('Already have an account? Log In'));

    expect(navigateMock).toHaveBeenCalledWith('Login');
  });
});
