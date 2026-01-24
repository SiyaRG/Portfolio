import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (file: File | null) => void;
  accept?: string;
}

const FileUpload = ({ label, value, onChange, accept = 'application/pdf,.doc,.docx' }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      // Extract filename from URL
      const urlParts = value.split('/');
      setFileName(urlParts[urlParts.length - 1]);
    } else {
      setFileName('');
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleRemove = () => {
    setFileName('');
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileUrl = () => {
    if (!value) return null;
    return value.startsWith('http') 
      ? value 
      : `http://localhost:8000${value.startsWith('/') ? value : '/' + value}`;
  };

  return (
    <Box sx={{ marginBottom: '1.5rem' }}>
      <Typography
        variant="body1"
        sx={{
          marginBottom: '0.5rem',
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload-input"
      />
      <label htmlFor="file-upload-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: 'none', marginBottom: '0.5rem' }}
        >
          Choose File
        </Button>
      </label>
      {(fileName || value) && (
        <Box
          sx={{
            marginTop: '0.5rem',
            padding: '0.75rem',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon color="primary" />
            {value ? (
              <Link
                href={getFileUrl() || '#'}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                {fileName || 'View Resume'}
              </Link>
            ) : (
              <Typography variant="body2">{fileName}</Typography>
            )}
          </Box>
          <IconButton
            onClick={handleRemove}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;

