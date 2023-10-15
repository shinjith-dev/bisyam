import ChatList from "@/components/chats/chat-list";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: "primary.100",
          flexGrow: 1,
          display: "flex",
          p: { xs: 0, md: 4 },
          pl: { md: 13 },
        }}
      >
        <ChatList />
      </Box>
    </>
  );
}
