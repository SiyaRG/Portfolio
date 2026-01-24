import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const FormModal = ({ isOpen, title, onClose, children, size = 'medium' }: FormModalProps) => {
  const maxWidth = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          padding: '1.5rem',
        }}
      >
        <Box component="span" sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
          {title}
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(14, 110, 85, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>{children}</DialogContent>
    </Dialog>
  );
};

export default FormModal;

