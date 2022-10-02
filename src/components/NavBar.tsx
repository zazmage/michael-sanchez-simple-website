import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { name: "Home", url: "/" },
    { name: "Page 1", url: "page1" },
    { name: "Page 2", url: "page2" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar component="nav">
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Instagram Line Break
          </Typography>
          <Box>
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  variant="outlined"
                  to={item.url}
                  sx={{
                    marginLeft: "5px",
                    color: "#df3852",
                    borderColor: "#df3852",
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
