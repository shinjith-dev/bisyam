"use client";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

const ChatsTitle = () => (
  <Typography variant="h4" fontWeight={500}>
    Chats
  </Typography>
);

const ChatTitle = () => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
    <IconButton size="small">
      <Avatar sx={{ height: 44, width: 44 }} />
    </IconButton>

    <div>
      <Typography variant="h5" lineHeight={1} color="text.primary">
        julie Sheff
      </Typography>
      <Typography variant="caption" lineHeight={1}>
        Active now
      </Typography>
    </div>
  </Box>
);

const titles = [
  {
    path: "/",
    component: <ChatsTitle />,
  },
  {
    path: "/chats/",
    component: <ChatTitle />,
  },
];

const NavDesc = () => {
  const pathname = usePathname();

  const page = titles.find((title) => title.path === pathname);

  if (Boolean(page)) return page?.component;

  const pageStartsWith = titles.find((title) =>
    pathname.startsWith(title.path),
  );

  if (Boolean(pageStartsWith)) return pageStartsWith?.component;

  return (
    <Typography variant="h4" fontWeight={500}>
      Bisyam
    </Typography>
  );
};

export default NavDesc;
