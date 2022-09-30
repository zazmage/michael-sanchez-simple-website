import React from "react";
import Footer from "./components/Footer";
import InputBox from "./components/InputBox";
import Instructions from "./components/Instructions";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <h1>Instagram Line Break</h1>
      <p>Use this tool to add clean line breaks to your instagram captions</p>
      <InputBox />
      <Instructions />
      <Footer />
    </div>
  );
}

export default App;
