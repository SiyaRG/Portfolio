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
  Grid,
  CircularProgress,
} from '@mui/material';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const EducationManagement = () => {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    start_period: '',
    end_period: '',
    is_current: false,
    note: '',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const data = await adminApi.getEducation();
      setEducation(data.results || []);
    } catch (error) {
      console.error('Failed to load education:', error);
      showToast('Failed to load education', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const openCreateModal = () => {
    setSelectedEducation(null);
    setFormData({
      degree: '',
      institution: '',
      location: '',
      start_period: '',
      end_period: '',
      is_current: false,
      note: '',
      order: education.length,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu: any) => {
    setSelectedEducation(edu);
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      location: edu.location || '',
      start_period: edu.start_period || '',
      end_period: edu.end_period || '',
      is_current: edu.is_current || false,
      note: edu.note || '',
      order: edu.order || 0,
      is_active: edu.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedEducation) {
        await adminApi.updateEducation(selectedEducation.id, formData);
        showToast('Education updated successfully!', 'success');
      } else {
        await adminApi.createEducation(formData);
        showToast('Education created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadEducation();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedEducation ? 'update' : 'create'} education`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEducation) return;
    setDeleting(true);
    try {
      await adminApi.deleteEducation(selectedEducation.id);
      showToast('Education deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedEducation(null);
      loadEducation();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete education', 'error');
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
          Education Management
        </Typography>
        <Button variant="contained" onClick={openCreateModal}>
          Add New Education
        </Button>
      </Box>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
        {education.length === 0 ? (
          <Grid size={12}>
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
                  No Education Entries Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Add your first education entry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          education.map((edu) => (
            <Grid size={12} key={edu.id} sx={{ width: '100%', flexBasis: '100%', maxWidth: '100%' }}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Institution:</strong> {edu.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Location:</strong> {edu.location}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Period:</strong> {edu.start_period} {edu.end_period ? `-- ${edu.end_period}` : edu.is_current ? '-- Present' : ''}
                  </Typography>
                  {edu.note && (
                    <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                      <strong>Note:</strong> {edu.note}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                    <strong>Order:</strong> {edu.order}
                  </Typography>
                </CardContent>
                <CardActions sx={{ padding: '1.5rem', paddingTop: 0, flexWrap: 'wrap', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => openEditModal(edu)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setSelectedEducation(edu);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <FormModal
        isOpen={isModalOpen}
        title={selectedEducation ? 'Edit Education' : 'Create Education'}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Degree"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Start Period"
            value={formData.start_period}
            onChange={(e) => setFormData({ ...formData, start_period: e.target.value })}
            placeholder="e.g., 2022"
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="End Period"
            value={formData.end_period}
            onChange={(e) => setFormData({ ...formData, end_period: e.target.value })}
            placeholder="e.g., 2025 or Present"
            disabled={formData.is_current}
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_current}
                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_period: e.target.checked ? '' : formData.end_period })}
              />
            }
            label="Currently Enrolled"
            sx={{ marginTop: '1rem' }}
          />
          <TextField
            fullWidth
            label="Note"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            multiline
            rows={2}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
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
                'Save Education'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Education"
        message="Are you sure you want to delete this education entry? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedEducation(null);
        }}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default EducationManagement;
