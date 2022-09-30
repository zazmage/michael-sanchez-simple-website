import "../styles/inputBox.css";

const InputBox = () => {
  return (
    <div className="container">
      <button>GENERATE & COPY CAPTION</button>
      <button>{"<-"}</button>
      <textarea />
      <div>0/2200</div>
    </div>
  );
};

export default InputBox;
