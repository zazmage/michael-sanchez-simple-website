import { TextField } from "@mui/material";
import React, { ChangeEvent, useState, useEffect } from "react";
import "../styles/inputBox.css";

const InputBox = () => {
  const [value, setValue] =
    useState<string>(`I have an extensive amount of       resources on the ground in FL if anyone you know needs help.
    
    
        These are trusted partners, clients, and emergency management groups.
    
    
    I've been on calls all morning and have several more.
    
    
    DM is best way to contact me.`);
  const [counter, setCounter] = useState<number>(0);
  const [newValue, setNewValue] = useState<string>("");

  useEffect(() => {
    setCounter(value.length);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
    setCounter(target.value.length);
  };

  const handleGenerate = () => {
    const formatValue = value
      .split("\n")
      .filter((el) => el.trim().length !== 0)
      .join("\n")
      .split(" ")
      .filter((el) => el.trim().length !== 0)
      .join(" ")
      .split("\n")
      .map((el) => el.trim())
      .join("\n");
    setNewValue(formatValue);
  };

  return (
    <div className="container">
      <div className="button-cont">
        <button onClick={handleGenerate}>GENERATE & COPY CAPTION</button>
        <button>{"<-"}</button>
      </div>
      <TextField
        id="outlined-multiline-flexible"
        label="Paste your caption here..."
        multiline
        minRows={7}
        maxRows={10}
        value={value}
        onChange={handleChange}
      />
      <div>{counter}/2200</div>
      <h4>This is just for thesting</h4>
      <TextField
        id="outlined-multiline-flexible"
        label="Paste your caption here..."
        multiline
        maxRows={4}
        value={newValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputBox;
