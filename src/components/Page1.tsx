import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (
    <Grid container spacing={5} textAlign={"center"}>
      <Grid item sm={12}>
        <Typography component={"h2"} variant={"h5"}>
          Page1
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Button component={Link} to={"/"}>
          Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default Page1;
