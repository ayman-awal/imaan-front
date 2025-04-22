import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabNavigation({ value, setValue, labels }) {

  const handleChange = (event, newValue) => {
    console.log("Tab clicked, new value:", newValue);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: "10px",
        py: 1,
        marginBottom: "15px",
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        {labels.map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{
              "&.Mui-selected": {
                color: "var(--primary-color)",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default TabNavigation;
