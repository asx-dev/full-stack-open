const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad;
  const average = (totalVotes / 3).toFixed(2);
  const positiveFeedback = ((good * 100) / totalVotes).toFixed(2);

  if (totalVotes === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {totalVotes}</p>
      <p>Average: {average}</p>
      <p>Positive: {positiveFeedback > 0 ? positiveFeedback : 0} %</p>
    </>
  );
};

export default Statistics;
