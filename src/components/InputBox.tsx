import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../styles/inputBox.css";

const InputBox = () => {
  const [value, setValue] =
    useState<string>(`I have an extensive amount of       resources on the ground in FL if anyone you know needs help.
    
    
        These are trusted partners, clients, and emergency management groups.
    
    
    I've been on calls all morning and have several more.
    
    
    DM is best way to contact me.`);
  const [counter, setCounter] = useState<number>(0);
  const [newValue, setNewValue] = useState<string>("");
  const maxCharacters = 100;

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

  const handleDelete = () => setValue("");

  return (
    <Grid container spacing={3}>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={10}>
          <Button fullWidth variant="contained" onClick={handleGenerate}>
            GENERATE & COPY CAPTION
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            <BackspaceIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container item sm={12}>
        <Grid item sm={12}>
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
        <Grid item sm={12}>
          <Typography component={"div"} textAlign="center">
            {counter}/{maxCharacters}
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={12}>
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
      </Grid>
    </Grid>
  );
};

export default InputBox;
