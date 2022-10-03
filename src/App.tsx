import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const MainLayout = styled(
  "div",
  {}
)({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
    },
    primary: {
      main: "#dc2743",
      dark: "#df3852",
    },
    secondary: {
      main: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <NavBar />
        <Outlet />
        <br />
        <br />
        <Footer />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
