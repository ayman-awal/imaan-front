import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemIcon from '@mui/material/ListItemIcon';
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const options = [
  { icon: <LockOutlineIcon />, text: "Unpublish" },
  { icon: <DeleteOutlineIcon />, text: "Delete" },
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
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

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
            key={option}
            selected={option === "Pyxis"}
            onClick={(e) => {
              e.stopPropagation();
              console.log(option);
              handleClose();
            }}
          >
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
