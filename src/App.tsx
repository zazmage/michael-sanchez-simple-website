import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import styled from "@emotion/styled";

const MainLayout = styled(
  "div",
  {}
)({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

function App() {
  return (
    <MainLayout>
      <NavBar />
      <Outlet />
      <br />
      <Footer />
    </MainLayout>
  );
}

export default App;
