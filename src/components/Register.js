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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
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
    const { firstName, lastName, email, password, dateOfBirth, gender } =
      formData;
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
      if (response.status == 201) {
        setFormSubmitted(true);
      }
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
      {formSubmitted && (
        <Box
          mt={3}
          p={2}
          borderRadius={2}
          bgcolor="#e0f7fa"
          border="1px solid #4dd0e1"
          textAlign="center"
        >
          <Typography variant="body1" gutterBottom>
            ✅ A verification email has been sent to{" "}
            <strong>{formData.email}</strong>.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please check your inbox and spam folder.
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ mt: 1, cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setVerifyEmail(true)} // or trigger a resend logic
          >
            Didn’t receive the email? Click here to resend.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Register;
