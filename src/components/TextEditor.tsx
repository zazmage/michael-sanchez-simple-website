import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import styled from "@emotion/styled";

const RichTextEditor = styled(
  "div",
  {}
)({
  boxSizing: "border-box",
  width: "100%",
  height: "200px",
  boxShadow: `0 4px 0px 0px inset #dc2743, 
    4px 0 0px 0px inset #dc2743, 
    -4px 0 0px 0px inset #dc2743`,
  div: {
    borderBottom: "3px solid #dc2743",
    borderLeft: "3px solid #dc2743",
    borderRight: "3px solid #dc2743",
    borderTop: "none",
    fontSize: "16px",
  },
});

interface State extends SnackbarOrigin {
  open: boolean;
}

function copyTextToClipboard(text: string) {
  let textArea = document.createElement("textarea");

  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = "0";

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

const TextEditor = () => {
  const [value, setValue] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const maxCharacters = 2200;
  const modules = {
    toolbar: [["bold", "italic"]],
  };
  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
        setPlainText(
          quillRef.current.firstChild.innerHTML.replaceAll(/<[^>]*>?/gm, "")
        );
      });
    }
  }, [quill, quillRef]);

  useEffect(() => setCounter(plainText.length), [plainText]);

  const handleGenerate = () => {
    if (counter < maxCharacters) {
      const formattedValue = value
        .replaceAll("<br>", "\n")
        .replaceAll("<p></p>", "\n")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "\n")
        .replaceAll("\t", " ")
        .split("\n")
        .filter((el) => el.trim().length !== 0)
        .join("\n")
        .split(" ")
        .filter((el) => el.trim().length !== 0)
        .join(" ")
        .split("\n")
        .map((el) => el.trim())
        .join("\n")
        .replaceAll(/<[^>]*>?/gm, "");
      copyTextToClipboard(formattedValue);
    }
    setState({
      open: true,
      vertical: "bottom",
      horizontal: "center",
    });
  };

  const handleDelete = () => {
    quillRef.current.firstChild.innerHTML = "";
    setValue("");
  };

  return (
    <Grid container spacing={3} mb={5}>
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
        <Grid item xs={12} mb={6}>
          <RichTextEditor>
            <div ref={quillRef} />
          </RichTextEditor>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"div"}
            textAlign="center"
            variant="body1"
            color={counter > maxCharacters ? "red" : ""}
          >
            {counter}/{maxCharacters}
          </Typography>
          {counter > maxCharacters && (
            <Typography textAlign="center" color="red">
              Character limit reached
            </Typography>
          )}
          <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={
              counter > maxCharacters
                ? "Character limit reached!"
                : "Copied to clipboard!"
            }
            key={vertical + horizontal}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TextEditor;
