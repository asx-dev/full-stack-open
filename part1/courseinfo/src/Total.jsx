const Total = ({ parts }) => {
  let totalOfExercises = 0;
  parts.map((item) => {
    totalOfExercises += item.exercise;
  });
  return <>Number of exercises {totalOfExercises}</>;
};

export default Total;
