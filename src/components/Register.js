import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, dateOfBirth, gender } = formData;
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          gender,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              required
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <TextField
            required
            name="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            required
            name="password"
            label="New password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            required
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: new Date().toISOString().split("T")[0], // today
            }}
            fullWidth
            sx={{ mb: 2, cursor: "pointer" }}
          />

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
