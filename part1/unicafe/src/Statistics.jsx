import StatisticLine from "./StatisticLine";

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
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={totalVotes} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positiveFeedback + " %"} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
