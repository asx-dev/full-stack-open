const Success = ({ message }) => {
  const style = {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  return <div style={style}>{message}</div>;
};

export default Success;