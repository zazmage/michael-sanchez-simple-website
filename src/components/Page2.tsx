import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page2 = () => {
  return (
    <Grid container spacing={5} textAlign={"center"}>
      <Grid item xs={12}>
        <Typography component={"h2"} variant={"h5"}>
          Page2
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={"/"}>
          Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default Page2;
