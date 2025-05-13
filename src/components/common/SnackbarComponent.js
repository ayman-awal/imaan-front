import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const SnackbarComponent = ({ message, severity = "success", open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};




// export default function AutohideSnackbar() {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button onClick={handleClick}>Open Snackbar</Button>
//       <Snackbar
//         open={open}
//         autoHideDuration={5000}
//         onClose={handleClose}
//         message="This Snackbar will be dismissed in 5 seconds."
//       />
//     </div>
//   );
// }
// AutohideSnackbar
export default SnackbarComponent;
