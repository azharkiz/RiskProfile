const calculateRiskProfile = (answers) => {
    const score = answers.reduce((acc, answer) => acc + answer.value, 0);
  
    if (score < 0) return 'High Risk';
    if (score <= 5) return 'Medium Risk';
    return 'Low Risk';
  };
  
  export default calculateRiskProfile;
  