import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../src/Modules/ProfileScreen';
import { useFirebase } from '../src/services/context/FirebaseContext';

// Mock the auth module to return a function with signOut method
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: jest.fn(),
  });
});

jest.mock('../src/services/context/FirebaseContext', () => ({
  useFirebase: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('ProfileScreen', () => {
  beforeEach(() => {
    useFirebase.mockReturnValue({ user: { email: 'test@example.com' } });
  });

  it('renders correctly with user email', () => {
    const { getByText } = render(<ProfileScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Email: test@example.com')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });
});