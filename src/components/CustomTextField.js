import TextField from "@mui/material/TextField";
import React from "react";

const CustomTextField = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          height: "50px",
          "& input": {
            height: "100%",
            padding: "0 14px",
          },
          "& fieldset": {
            borderColor: "#d1d5db",
          },
          "&:hover fieldset": {
            borderColor: "#6366f1",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6366f1",
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#6b7280",
          "&.Mui-focused": {
            color: "#6366f1",
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
