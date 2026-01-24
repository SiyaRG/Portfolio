import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getMediaUrl } from '../utils/api';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (file: File | null, url?: string) => void;
  accept?: string;
}

const ImageUpload = ({ label, value, onChange, accept = 'image/*' }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [imageUrl, setImageUrl] = useState('');
  const [useUrl, setUseUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with value prop changes (but don't override local file selections)
  useEffect(() => {
    // Only update from value prop if we don't have a local file selected
    const hasLocalFile = (fileInputRef.current?.files?.length ?? 0) > 0;
    const isDataUrl = preview?.startsWith('data:');
    
    if (value && !hasLocalFile && !isDataUrl) {
      // If value is a full URL (starts with http), use it directly
      // Otherwise, it might be a relative path that needs the base URL
      const imageUrl = value.startsWith('http') || value.startsWith('data:') 
        ? value 
        : getMediaUrl(value) || value;
      setPreview(imageUrl);
    } else if (!value && !hasLocalFile && !isDataUrl) {
      // Clear preview when value is explicitly null/undefined and no local file
      setPreview(null);
      setImageUrl('');
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    if (url) {
      setPreview(url);
      onChange(null, url);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setImageUrl('');
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      <Stack direction="row" spacing={1} sx={{ marginBottom: '0.5rem' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setUseUrl(!useUrl)}
          sx={{ textTransform: 'none' }}
        >
          {useUrl ? 'Upload File' : 'Use URL'}
        </Button>
      </Stack>
      {useUrl ? (
        <TextField
          fullWidth
          type="url"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      ) : (
        <Box sx={{ marginTop: '0.5rem' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Choose File
            </Button>
          </label>
        </Box>
      )}
      {preview && (
        <Box
          sx={{
            marginTop: '1rem',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '4px',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          />
          <IconButton
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark',
                transform: 'scale(1.1)',
              },
            }}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;

