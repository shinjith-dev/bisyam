import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

type Props = {
  selected: boolean;
};

const Chat = ({ selected }: Props) => {
  return (
    <ListItemButton
      sx={{
        px: 3,
        "&.Mui-selected": {
          bgcolor: "rgba(36,35,41,0.7)",
          borderLeft: 5,
          borderColor: "primary.100",
          transition: "all 0.2s ease-out",
          "&:hover": { bgcolor: "primary.200" },
        },
      }}
      selected={selected}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary="Shinjith"
        secondary="Coudn't find you in your Car, where were you?"
      />
    </ListItemButton>
  );
};

export default Chat;
