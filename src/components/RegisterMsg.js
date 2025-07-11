import React from 'react'

function RegisterMsg() {
  return (
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
  )
}

export default RegisterMsg