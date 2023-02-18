import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  backgroundColor: "black",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          EDAS
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
