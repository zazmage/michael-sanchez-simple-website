import { Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Typography
      component="footer"
      variant="body1"
      textAlign="center"
      sx={{ marginTop: "auto" }}
    >
      Copyright © {year} Instagram Line Break. All rights reserved.
    </Typography>
  );
};

export default Footer;
