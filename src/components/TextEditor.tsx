import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import styled from "@emotion/styled";

const RichTextEditor = styled(
  "div",
  {}
)({
  boxSizing: "border-box",
  width: "100%",
  height: "200px",
  boxShadow: `0 3px 0px 0px inset #dc2743, 
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

const TextEditor = () => {
  const [value, setValue] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const maxCharacters = 3000;
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
    const formattedValue = value
      .replaceAll("<br>", "\n")
      .replaceAll("<p></p>", "\n")
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("\t", "    ")
      .split("\n")
      .filter((el) => el.trim().length !== 0)
      .join("\n")
      .split(" ")
      .filter((el) => el.trim().length !== 0)
      .join(" ")
      .split("\n")
      .map((el) => el.trim())
      .join("\n")
      .replaceAll("\n", "<br>");
    const blobInput = new Blob([formattedValue], { type: "text/html" });
    const clipboardItemInput = new ClipboardItem({ "text/html": blobInput });
    navigator.clipboard.write([clipboardItemInput]);
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
            variant={counter > maxCharacters ? "body1" : "body2"}
            color={counter > maxCharacters ? "red" : ""}
          >
            {counter}/{maxCharacters}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TextEditor;
