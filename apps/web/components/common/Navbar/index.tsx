"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SidePanel from "../SidePanel";
import NavDesc from "./NavDesc";

function Navbar() {
  const [haveBg, setHaveBg] = useState<boolean>();
  const [menu, setMenu] = useState<boolean>(false);
  //   const { user } = useUser();
  const isChat = false;

  useEffect(() => {
    if (menu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [menu]);

  useEffect(() => {
    if (window && window.scrollY > 50) setHaveBg(true);

    const checkPosition = () => {
      if (window.scrollY > 50) setHaveBg(true);
      else setHaveBg(false);
    };
    window.addEventListener("scroll", checkPosition);

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  const toggleMenu = () => setMenu((prev) => !prev);

  return (
    <>
      <Box
        component="nav"
        position="sticky"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 2,
          backgroundColor: "primary.200",
          zIndex: 999,
        }}
      >
        <IconButton
          onClick={() => setMenu(true)}
          color="secondary"
          sx={{ ml: -4 }}
        >
          <MenuIcon />
        </IconButton>

        <NavDesc />
      </Box>

      <SidePanel
        isOpen={menu}
        close={() => setMenu(false)}
        open={() => setMenu(true)}
      />
    </>
  );
}

export default Navbar;
