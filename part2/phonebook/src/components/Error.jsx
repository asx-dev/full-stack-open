const Error = ({ message }) => {
  const style = {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  return <div style={style}>{message}</div>;
};

export default Error;
