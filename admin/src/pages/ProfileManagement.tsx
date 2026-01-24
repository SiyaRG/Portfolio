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
  CircularProgress,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { adminApi } from '../services/api';
import { getMediaUrl } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';
import FileUpload from '../components/FileUpload';
import Toast from '../components/Toast';

const ProfileManagement = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    is_active: true,
    profile_image_file: null as File | null,
    resume_file: null as File | null,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await adminApi.getProfile();
      if (data.results && data.results.length > 0) {
        const prof = data.results[0];
        setProfile(prof);
        setFormData({
          name: prof.name || '',
          title: prof.title || '',
          description: prof.description || '',
          is_active: prof.is_active !== false,
          profile_image_file: null,
          resume_file: null,
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('is_active', formData.is_active.toString());
      
      if (formData.profile_image_file) {
        submitData.append('profile_image', formData.profile_image_file);
      }
      
      if (formData.resume_file) {
        submitData.append('resume', formData.resume_file);
      }

      if (profile) {
        await adminApi.updateProfile(profile.id, submitData);
        showToast('Profile updated successfully!', 'success');
      } else {
        await adminApi.createProfile(submitData);
        showToast('Profile created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadProfile();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${profile ? 'update' : 'create'} profile`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!profile) return;
    setDeleting(true);
    try {
      await adminApi.deleteProfile?.(profile.id);
      showToast('Profile deleted successfully', 'success');
      setProfile(null);
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete profile', 'error');
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
          Profile Management
        </Typography>
        {profile && (
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Edit Profile
          </Button>
        )}
      </Box>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {profile ? (
        <Card sx={{ maxWidth: '800px' }}>
          <CardContent>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '1rem', color: 'primary.main' }}>
              {profile.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Title:</strong> {profile.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              <strong>Description:</strong> {profile.description}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
              <strong>Status:</strong> {profile.is_active ? 'Active' : 'Inactive'}
            </Typography>
            {profile.profile_image && (
              <Box sx={{ marginTop: '1rem' }}>
                <Box
                  component="img"
                  src={getMediaUrl(profile.profile_image) || '#'}
                  alt="Profile"
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
            {profile.resume && (
              <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: '0.5rem', color: 'primary.main' }}>
                  Resume:
                </Typography>
                <Box
                  component="a"
                  href={getMediaUrl(profile.resume) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '0.5rem 1rem',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <DescriptionIcon />
                  View Resume
                </Box>
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
              No Profile Found
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: 'text.secondary' }}>
              Create your profile to get started.
            </Typography>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Create Profile
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isModalOpen}
        title={profile ? 'Edit Profile' : 'Create Profile'}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            multiline
            rows={5}
            margin="normal"
            variant="outlined"
          />
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
            value={profile?.profile_image}
            onChange={(file) => setFormData({ ...formData, profile_image_file: file })}
          />
          <FileUpload
            label="Resume (PDF or Document)"
            value={profile?.resume}
            onChange={(file) => setFormData({ ...formData, resume_file: file })}
            accept="application/pdf,.doc,.docx"
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
                'Save Profile'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Profile"
        message="Are you sure you want to delete this profile? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default ProfileManagement;
