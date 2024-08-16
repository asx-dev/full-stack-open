const Total = ({ parts }) => {
  let totalOfExercises = parts.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue.exercises,
    0
  );
  return (
    <>
      <b>Number of exercises {totalOfExercises}</b>
    </>
  );
};

export default Total;
