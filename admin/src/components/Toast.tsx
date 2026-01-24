import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{
          backgroundColor: type === 'success' ? 'success.main' : type === 'error' ? 'error.main' : 'info.main',
          border: '2px solid',
          borderColor: type === 'success' ? 'success.main' : type === 'error' ? 'error.main' : 'info.main',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

