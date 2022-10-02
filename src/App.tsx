import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const MainLayout = styled(
  "div",
  {}
)({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#dc2743",
        dark: "#df3852",
      },
      secondary: {
        main: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
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
