import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Checkbox,
  Stack,
  Chip,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';
import Toast from '../components/Toast';

const AboutManagement = () => {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    paragraph1: '',
    paragraph2: '',
    highlights: [] as string[],
    is_active: true,
    profile_image_file: null as File | null,
    profile_image_url: '',
  });
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const data = await adminApi.getAbout();
      if (data.results && data.results.length > 0) {
        const aboutData = data.results[0];
        setAbout(aboutData);
        setFormData({
          paragraph1: aboutData.paragraph1 || '',
          paragraph2: aboutData.paragraph2 || '',
          highlights: aboutData.highlights || [],
          is_active: aboutData.is_active !== false,
          profile_image_file: null,
          profile_image_url: '',
        });
      }
    } catch (error) {
      console.error('Failed to load about:', error);
      showToast('Failed to load about section', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()],
      });
      setHighlightInput('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const submitData = new FormData();
      submitData.append('paragraph1', formData.paragraph1);
      submitData.append('paragraph2', formData.paragraph2);
      // Send highlights as JSON string for JSONField
      submitData.append('highlights', JSON.stringify(formData.highlights));
      submitData.append('is_active', formData.is_active.toString());
      
      if (formData.profile_image_file) {
        submitData.append('profile_image', formData.profile_image_file);
      }

      if (about) {
        await adminApi.updateAbout(about.id, submitData);
        showToast('About section updated successfully!', 'success');
      } else {
        await adminApi.createAbout(submitData);
        showToast('About section created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadAbout();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${about ? 'update' : 'create'} about section`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!about) return;
    setDeleting(true);
    try {
      await adminApi.deleteAbout(about.id);
      showToast('About section deleted successfully', 'success');
      setAbout(null);
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete about section', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            marginBottom: 0,
            color: 'primary.main',
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 700,
            borderBottom: '2px solid',
            borderColor: 'primary.main',
            paddingBottom: '0.5rem',
          }}
        >
          About Management
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          {about ? 'Edit About' : 'Create About'}
        </Button>
      </Box>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {about ? (
        <Card sx={{ maxWidth: '800px' }}>
          <CardContent>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '1rem', color: 'primary.main' }}>
              About Section
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Paragraph 1:</strong> {about.paragraph1}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Paragraph 2:</strong> {about.paragraph2}
            </Typography>
            {about.highlights && about.highlights.length > 0 && (
              <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  Highlights:
                </Typography>
                <List sx={{ paddingLeft: '1.5rem' }}>
                  {about.highlights.map((h: string, i: number) => (
                    <ListItem key={i} sx={{ padding: '0.25rem 0', color: 'text.secondary' }}>
                      • {h}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {about.profile_image && (
              <Box sx={{ marginTop: '1rem' }}>
                <Box
                  component="img"
                  src={about.profile_image.startsWith('http') 
                    ? about.profile_image 
                    : `http://localhost:8000${about.profile_image.startsWith('/') ? about.profile_image : '/' + about.profile_image}`}
                  alt="About"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                  sx={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ padding: '1.5rem', paddingTop: 0 }}>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => setIsDeleteDialogOpen(true)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card
          sx={{
            textAlign: 'center',
            padding: '3rem',
            border: '2px dashed',
            borderColor: 'primary.main',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
              No About Section Found
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: 'text.secondary' }}>
              Create your about section to get started.
            </Typography>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Create About Section
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isModalOpen}
        title={about ? 'Edit About Section' : 'Create About Section'}
        onClose={() => setIsModalOpen(false)}
        size="large"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Paragraph"
            value={formData.paragraph1}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            required
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Second Paragraph"
            value={formData.paragraph2}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            required
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
              Highlights
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginBottom: '0.5rem' }}>
              <TextField
                fullWidth
                size="small"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHighlight();
                  }
                }}
                placeholder="Enter highlight and press Enter"
                variant="outlined"
              />
              <Button variant="outlined" onClick={addHighlight}>
                Add
              </Button>
            </Stack>
            {formData.highlights.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, padding: '0.5rem', border: '2px solid', borderColor: 'primary.main', borderRadius: '4px', minHeight: '50px' }}>
                {formData.highlights.map((highlight, index) => (
                  <Chip
                    key={index}
                    label={highlight}
                    onDelete={() => removeHighlight(index)}
                    deleteIcon={<DeleteIcon />}
                    color="primary"
                  />
                ))}
              </Box>
            )}
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            }
            label="Active"
            sx={{ marginTop: '1rem' }}
          />
          <ImageUpload
            label="Profile Image"
            value={about?.profile_image}
            onChange={(file) => setFormData({ ...formData, profile_image_file: file })}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: '2rem' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Saving...
                </Box>
              ) : (
                'Save About Section'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete About Section"
        message="Are you sure you want to delete this about section? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default AboutManagement;
