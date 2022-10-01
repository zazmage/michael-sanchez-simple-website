import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../styles/inputBox.css";

const InputBox = () => {
  const [value, setValue] = useState<string>("");
  // If you wish to use the output for something in the future
  // const [newValue, setNewValue] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const maxCharacters = 3000;

  useEffect(() => {
    setCounter(value.length);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
    setCounter(target.value.length);
  };

  const handleGenerate = () => {
    const formattedValue = value
      .split("\n")
      .filter((el) => el.trim().length !== 0)
      .join("\n")
      .split(" ")
      .filter((el) => el.trim().length !== 0)
      .join(" ")
      .split("\n")
      .map((el) => el.trim())
      .join("\n");
    // setNewValue(formattedValue);
    navigator.clipboard.writeText(formattedValue);
  };

  const handleDelete = () => setValue("");

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={10}>
          <Button fullWidth variant="contained" onClick={handleGenerate}>
            GENERATE & COPY CAPTION
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth color="secondary" onClick={handleDelete}>
            <BackspaceIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Paste your caption here..."
            multiline
            minRows={7}
            maxRows={15}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"div"}
            textAlign="center"
            variant={counter > maxCharacters ? "body1" : "body2"}
            color={counter > maxCharacters ? "red" : ""}
          >
            {counter}/{maxCharacters}
          </Typography>
        </Grid>
      </Grid>
      {/* TESTING */}
      {/* <Grid item xs={12}>
        <Typography variant="h6" component="h6">
          This box is just for testing
        </Typography>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Paste your caption here..."
          multiline
          maxRows={4}
          value={newValue}
        />
      </Grid> */}
    </Grid>
  );
};

export default InputBox;
