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
  let textCont = document.createElement("div");
  textCont.style.position = "fixed";
  textCont.style.top = "0";
  textCont.style.left = "0";
  textCont.style.width = "2em";
  textCont.style.height = "2em";
  textCont.style.padding = "0";
  textCont.style.border = "none";
  textCont.style.outline = "none";
  textCont.style.boxShadow = "none";
  textCont.style.background = "transparent";

  textCont.innerHTML = text;

  document.body.appendChild(textCont);
  const range = document.createRange();
  range.selectNode(textCont);
  window.getSelection()?.removeAllRanges();
  window.getSelection()?.addRange(range);
  document.execCommand("copy");
  window.getSelection()?.removeAllRanges();

  document.body.removeChild(textCont);
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
    toolbar: [["bold", "italic", "strike"]],
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
        .join("<br>");
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
