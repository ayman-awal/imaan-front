import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function GutterlessList({ selectedTab, setSelectedTab, tabs }) {
  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: "5px",
      }}
    >
      {tabs.map((text, index) => (
        <ListItem
          key={index}
          button
          onClick={() => setSelectedTab(text)}
          selected={selectedTab === text}
          sx={{
            px: 2,
            py: 1.5,
            cursor: "pointer",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
            ...(selectedTab === text && {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              fontWeight: 600,
            }),
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body1" fontWeight={500}>
                {text}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
