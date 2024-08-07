import React from 'react';
import { render, fireEvent,} from '@testing-library/react-native';
import HomeScreen from '../src/Modules/HomeScreen';

jest.mock('../src/services/context/FirebaseContext', () => ({
  useFirebase: () => ({ user: { email: 'test@example.com' } }),
}));

jest.mock('../src/services/controller/riskAssessment', () => {
  return jest.fn((answers) => {
    const score = answers.reduce((acc, answer) => acc + answer.value, 0);
    if (score < 0) return 'High Risk';
    if (score <= 5) return 'Medium Risk';
    return 'Low Risk';
  });
});

describe('HomeScreen', () => {
  it('renders correctly with initial state', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Welcome, test@example.com')).toBeTruthy();
    expect(getByText('Do you have a stable job?')).toBeTruthy();
    expect(getByText('Do you have any debts?')).toBeTruthy();
    expect(getByText('Do you save regularly?')).toBeTruthy();
    expect(getByText('Calculate Risk Profile')).toBeTruthy();
  });

  it('handles answering questions and calculates risk profile', () => {
    const { getByTestId, queryByText } = render(<HomeScreen />);

    // Answer the questions using testID
    fireEvent.press(getByTestId('answerYes_0')); 
    fireEvent.press(getByTestId('answerNo_1'));  
    fireEvent.press(getByTestId('answerYes_2')); 

    // Calculate the risk profile
    fireEvent.press(getByTestId('calculateRiskButton'));

    // Verify the calculated risk profile
    expect(queryByText('Your Risk Profile: Low Risk')).toBeTruthy();
  });

  it('handles navigation to profile screen', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(<HomeScreen navigation={{ navigate: navigateMock }} />);

    fireEvent.press(getByTestId('profileButton'));

    expect(navigateMock).toHaveBeenCalledWith('Profile');
  });
});
