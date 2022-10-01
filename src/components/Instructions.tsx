import { Grid, Typography } from "@mui/material";

const Instructions = () => {
  return (
    <Grid>
      <Grid>
        <Typography variant="h5" component="h2">
          How to add line breaks to your Instagram captions
        </Typography>
      </Grid>

      <Grid></Grid>
      <ol>
        <Typography variant="body1" component="li">
          Write up your caption in Instagram with line breaks
        </Typography>
        <Typography variant="body1" component="li">
          Paste it in the text area above
        </Typography>
        <Typography variant="body1" component="li">
          Tap the "Generate & Copy Caption" Button
        </Typography>
        <Typography variant="body1" component="li">
          Paste it as your Instagram caption and post! 😎
        </Typography>
      </ol>
    </Grid>
  );
};

export default Instructions;
