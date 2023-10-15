import { Box, Typography } from "@mui/material";
import React from "react";
import Chats from "./Chats";

type Props = {};

const ChatList = (props: Props) => {
  return (
    <Box
      sx={{
        bgcolor: { xs: "transparent", md: "primary.300" },
        borderRadius: 4,
        width:  { xs: "100%", md: "400px" },
        height: { xs: "calc(100vh - 76px)", md: "calc(100vh - 64px)" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={500}
        sx={{ mx: 3, my: 2, display: { xs: "none", md: "block" } }}
      >
        Chats
      </Typography>

      <Box
        sx={{
          borderRadius: 5,
          bgcolor: "primary.400",
          height: "2.5rem",
          mx: 3,
          display: { xs: "none", md: "block" },
        }}
      />

      <Chats />
    </Box>
  );
};

export default ChatList;
