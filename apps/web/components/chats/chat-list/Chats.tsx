import { List } from "@mui/material";
import React from "react";
import Chat from "./Chat";

type Props = {};

const Chats = (props: Props) => {
  return (
    <List disablePadding sx={{ mt: 2, overflowY: "auto", flexGrow: 1 }}>
      {[...new Array(10)].map((chat, index) => (
        <Chat selected={index === 0} />
      ))}
    </List>
  );
};

export default Chats;
