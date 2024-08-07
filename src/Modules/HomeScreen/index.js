import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useFirebase } from '../../services/context/FirebaseContext';
import calculateRiskProfile from '../../services/controller/riskAssessment';

const HomeScreen = ({ navigation }) => {
  const { user } = useFirebase();
  const [answers, setAnswers] = useState([]);
  const [riskProfile, setRiskProfile] = useState(null);

  // Define questions with their associated values
  const questions = [
    { question: 'Do you have a stable job?', value: 5 },
    { question: 'Do you have any debts?', value: -5 },
    { question: 'Do you save regularly?', value: 5 },
  ];

  // Function to handle answering questions
  const handleAnswer = useCallback((value) => {
    setAnswers((prevAnswers) => [...prevAnswers, { value }]);
  }, []);

  // Function to calculate risk profile based on answers
  const handleCalculateRisk = useCallback(() => {
    const profile = calculateRiskProfile(answers);
    setRiskProfile(profile);
  }, [answers]);

  return (
    <View style={styles.container}>
      <Text style={styles.header} testID="welcomeText">
        Welcome, {user?.email}
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questions.map((q, index) => (
          <View key={index} style={styles.question} testID={`question_${index}`}>
            <Text style={styles.questionStyle} testID={`questionText_${index}`}>
              {q.question}
            </Text>
            <View style={styles.btnContainer}>
              <View style={{margin: 2}}>
              <Button
                title="Yes"
                onPress={() => handleAnswer(q.value)}
                testID={`answerYes_${index}`}
              />
              </View>
              <View style={{margin: 2}}>
              <Button
                title="No"
                onPress={() => handleAnswer(0)}
                testID={`answerNo_${index}`}
              />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Button
        title="Calculate Risk Profile"
        onPress={handleCalculateRisk}
        testID="calculateRiskButton"
      />
      {riskProfile && (
        <Text style={styles.result} testID="riskProfileText">
          Your Risk Profile: {riskProfile}
        </Text>
      )}
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
        testID="profileButton"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  question: {
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
  questionStyle: {
    fontSize: 16,
    marginBottom: 10,
  },
  btnContainer: {

    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeScreen;
