import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
                <Button key={item.name} component={Link} to={item.url}>
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
