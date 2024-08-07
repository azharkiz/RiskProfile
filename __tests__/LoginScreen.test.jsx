import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../src/Modules/LoginScreen';
import auth from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth', () => {
  const mockAuth = {
    signInWithEmailAndPassword: jest.fn(),
  };
  return () => mockAuth; // Return the mock object as a function to mimic default export
});

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={{ navigate: jest.fn() }} />
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('handles login successfully', async () => {
    const navigateMock = jest.fn();
    const mockSignInWithEmailAndPassword = auth().signInWithEmailAndPassword;
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({});

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={{ navigate: navigateMock }} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    await act(async () => {
      fireEvent.press(getByText('Login'));
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(navigateMock).toHaveBeenCalledWith('Home');
  });

  it('displays an error on login failure', async () => {
    const errorMessage = 'Invalid email or password';
    const mockSignInWithEmailAndPassword = auth().signInWithEmailAndPassword;
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={{ navigate: jest.fn() }} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');

    await act(async () => {
      fireEvent.press(getByText('Login'));
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'wrongpassword'
    );
  });

  it('navigates to signup screen', () => {
    const navigateMock = jest.fn();

    const { getByText } = render(
      <LoginScreen navigation={{ navigate: navigateMock }} />
    );

    fireEvent.press(getByText("Don't have an account? Sign Up"));

    expect(navigateMock).toHaveBeenCalledWith('Signup');
  });
});