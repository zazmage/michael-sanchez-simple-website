import { Container, Typography } from "@mui/material";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import Instructions from "./Instructions";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" textAlign="center" mb={2}>
        Line Break
      </Typography>
      <Typography variant="subtitle1" component="p" textAlign="center" mb={2}>
        Use this tool to add clean line breaks to your instagram captions
      </Typography>
      <InputBox />
      <Instructions />
      <DropDown />
    </Container>
  );
};

export default Home;
