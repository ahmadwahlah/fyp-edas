import React from "react";

import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

export default function NotificationButton({}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = [
    {
      id: 1,
      text: "Notification 1 ",
    },
    {
      id: 2,
      text: "Notification 2 ",
    },
    {
      id: 3,
      text: "Notification 3 ",
    },
  ];

  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton color="inherit" onClick={handleBadgeClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem>
                <ListItemText primary={notification.text} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </>
  );
}
