import InputBox from "./InputBox";
import Instructions from "./Instructions";

const Home = () => {
  return (
    <div className="main-content">
      <h1>Instagram Line Break</h1>
      <p>Use this tool to add clean line breaks to your instagram captions</p>
      <InputBox />
      <Instructions />
    </div>
  );
};

export default Home;
