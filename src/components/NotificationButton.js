// import React from "react";
// import {
//   Badge,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Popover,
//   Typography,
//   Divider,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useState } from "react";
// import { format } from "date-fns";

// function Notification({ heading, body, timestamp }) {
//   return (
//     <>
//       <ListItem alignItems="flex-start">
//         <ListItemText
//           primary={
//             <Typography component="span" variant="subtitle1" fontWeight="bold">
//               {heading}
//             </Typography>
//           }
//           secondary={
//             <>
//               <Typography component="span" variant="body2" color="text.primary">
//                 {body}
//               </Typography>
//               <br />
//               <Typography
//                 component="span"
//                 variant="caption"
//                 color="text.secondary"
//               >
//                 {format(timestamp, "yyyy-MM-dd HH:mm")}
//               </Typography>
//             </>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//     </>
//   );
// }

// export default function NotificationButton({}) {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const notifications = [
//     // Add more notifications here as needed
//     {
//       id: 1,
//       heading: "Leave Form",
//       body: "Approved by Advisor",
//       timestamp: new Date(2023, 3, 8, 10, 30),
//     },
//     {
//       id: 2,
//       heading: "Leave Form",
//       body: "Forwarded to Advisor",
//       timestamp: new Date(2023, 3, 8, 9, 15),
//     },
//     {
//       id: 3,
//       heading: "Leave Form",
//       body: "Approved by Advisor",
//       timestamp: new Date(2023, 3, 7, 14, 45),
//     },
//     {
//       id: 4,
//       heading: "Leave Form",
//       body: "Approved by Advisor",
//       timestamp: new Date(2023, 3, 8, 10, 30),
//     },
//     {
//       id: 5,
//       heading: "Leave Form",
//       body: "Forwarded to Advisor",
//       timestamp: new Date(2023, 3, 8, 9, 15),
//     },
//     {
//       id: 6,
//       heading: "Leave Form",
//       body: "Approved by Advisor",
//       timestamp: new Date(2023, 3, 7, 14, 45),
//     },
//   ];

//   const handleBadgeClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleBadgeClick}>
//         <Badge badgeContent={notifications.length} color="error">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>

//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handlePopoverClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <List
//           sx={{
//             maxHeight: "calc(3 * 72px)",
//             width: "100%",
//             maxWidth: 360,
//             overflow: "auto",
//             bgcolor: "background.paper",
//           }}
//         >
//           {notifications.map((notification) => (
//             <Notification
//               key={notification.id}
//               heading={notification.heading}
//               body={notification.body}
//               timestamp={notification.timestamp}
//             />
//           ))}
//         </List>
//       </Popover>
//     </>
//   );
// }
