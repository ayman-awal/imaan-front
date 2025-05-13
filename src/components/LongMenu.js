import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Menu";
import Menu from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemIcon from '@mui/material/ListItemIcon';
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const options = [
  { id: 1, icon: <LockOutlineIcon />, text: "Unpublish" },
  { id: 2, icon: <DeleteOutlineIcon />, text: "Delete" },
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    if (anchorEl && anchorEl === event.currentTarget) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleOptionClick = (event) => {
    event.stopPropagation();
    console.log(event.target.key);
    handleClose();
  }

  return (
    <Container>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            selected={option === "Pyxis"}
            onClick={handleOptionClick}
          >
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}
