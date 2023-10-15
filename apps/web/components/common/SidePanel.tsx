import { pacifico } from "@/utils/fonts";
import {
  Avatar,
  Box,
  IconButton,
  List,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Chat from "@/icons/Chat";
import ListItemButton from "@/atoms/ListItemButton";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import Chats from "./Chats";
import People from "./People";

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

type TMenus = "chats" | "people";

const sections = { chats: <Chats />, people: <People /> };

const SidePanel = ({ isOpen, open, close }: Props) => {
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={close}
        onOpen={open}
        PaperProps={{
          sx: {
            bgcolor: "primary.200",
            py: 3,
            px: 2,
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            minWidth: "250px",
            height: "100%",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          <Typography
            variant="h4"
            className={pacifico.className}
            color="#fafafa"
          >
            Bisyam
          </Typography>

          <IconButton color="secondary" size="small" onClick={close}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <List sx={{ my: 1 }}>
            <ListItemButton
              text="Chats"
              icon={<ForumRoundedIcon fontSize="small" />}
              fontSize="20px"
            />
            <ListItemButton
              icon={<PeopleRoundedIcon fontSize="small" />}
              text="People"
              fontSize="20px"
            />
          </List>

          <List>
            <ListItemButton
              text="Github"
              icon={<GitHubIcon fontSize="small" />}
              fontSize="18px"
            />
            <ListItemButton
              icon={<Avatar sx={{ width: 24, height: 24 }} />}
              text="Account"
              fontSize="18px"
            />
          </List>
        </Box>
      </SwipeableDrawer>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          bgcolor: "primary.200",
          py: 4,
          px: 1,
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          flexDirection: "column",
          height: "100vh",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <Typography
          sx={{ px: 2 }}
          variant="h4"
          className={pacifico.className}
          color="#fafafa"
        >
          Bi
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <List sx={{ my: 1 }}>
            <ListItemButton
              icon={
                <ForumRoundedIcon
                  fontSize="inherit"
                  sx={{ color: "#fafafa" }}
                />
              }
              fontSize="24px"
              selected
            />
            <ListItemButton
              icon={
                <PeopleRoundedIcon
                  fontSize="inherit"
                  sx={{ color: "#fafafa" }}
                />
              }
              fontSize="24px"
            />
          </List>

          <List sx={{ color: "#fafafa" }}>
            <ListItemButton
              icon={<GitHubIcon fontSize="inherit" />}
              fontSize="20px"
            />
            <ListItemButton
              icon={<Avatar sx={{ width: 28, height: 28 }} />}
              fontSize="20px"
            />
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SidePanel;
