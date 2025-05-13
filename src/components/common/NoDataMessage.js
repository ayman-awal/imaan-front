import React from "react";
import { Typography } from "@mui/material";

const NoDataMessage = ({ message = "No data available", sx = {} }) => {
  return (
    <Typography
      align="center"
      sx={{
        marginTop: "50px",
        color: "#555",
        fontSize: "22px",
        fontWeight: 700,
        ...sx,
      }}
    >
      {message}
    </Typography>
  );
};

export default NoDataMessage;
