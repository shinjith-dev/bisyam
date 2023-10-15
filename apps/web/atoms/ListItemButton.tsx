import React, { ReactNode } from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton as MuiListItemButton,
  SxProps,
} from "@mui/material";

type Props = {
  icon?: ReactNode;
  text?: string | boolean;
  divider?: boolean;
  selected?: boolean;
  fontSize?: string;
  onClick?: () => void;
};

const ListItemButton = ({
  icon,
  text,
  divider = false,
  selected = false,
  fontSize = "16px",
  onClick,
}: Props) => {
  return (
    <>
      <MuiListItemButton
        disableGutters
        sx={{
          gap: 1,
          color: selected ? "text.primary" : "text.secondary",
          fontSize,
          px: 2,
          borderRadius: 7,
          justifyContent: text ? "start" : "center",
        }}
        onClick={onClick}
      >
        {icon && (
          <ListItemIcon
            sx={{ minWidth: "auto", color: "inherit", fontSize: "inherit" }}
          >
            {icon}
          </ListItemIcon>
        )}
        {text && (
          <ListItemText
            sx={{ fontWeight: 500 }}
            primaryTypographyProps={{ fontSize: "inherit" }}
          >
            {text}
          </ListItemText>
        )}
      </MuiListItemButton>
      {divider && <Divider variant="middle" />}
    </>
  );
};

export default ListItemButton;
