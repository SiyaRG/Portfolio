import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'error.main',
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: '2px solid',
          borderColor: 'error.main',
          padding: '1.5rem',
        }}
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: '1.5rem' }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '1.5rem', gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Deleting...
            </Box>
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

