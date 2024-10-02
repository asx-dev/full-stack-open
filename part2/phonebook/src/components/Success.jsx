export const Success = ({ message }) => {
  const style = {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  if (!message) return null;

  setTimeout(() => {
    message = null;
  }, 5000);

  return <div style={style}>{message}</div>;
};

export default Success;
