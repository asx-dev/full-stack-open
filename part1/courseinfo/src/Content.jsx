import Part from "./Part";

const Content = ({ parts }) => {
  const items = parts.map((item) => {
    return <Part key={item.name} name={item.name} exercises={item.exercise} />;
  });
  return <>{items}</>;
};

export default Content;
