import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import NotificationButton from "./NotificationButton";
import AccountButton from "./AccountButton";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  backgroundColor: "black",
}));

const LoggedInHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            EDAS
          </Typography>
          <NotificationButton />
          <AccountButton />
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default LoggedInHeader;
