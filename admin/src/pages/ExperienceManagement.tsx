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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: false,
    order: 0,
    is_active: true,
  });
  const [itemFormData, setItemFormData] = useState({
    text: '',
    order: 0,
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await adminApi.getExperiences();
      setExperiences(data.results || []);
    } catch (error) {
      console.error('Failed to load experiences:', error);
      showToast('Failed to load experiences', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const openCreateModal = () => {
    setSelectedExperience(null);
    setFormData({
      title: '',
      company: '',
      start_date: '',
      end_date: '',
      is_current: false,
      order: experiences.length,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: any) => {
    setSelectedExperience(exp);
    setFormData({
      title: exp.title || '',
      company: exp.company || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current || false,
      order: exp.order || 0,
      is_active: exp.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const openItemModal = (exp: any, item?: any) => {
    setSelectedExperience(exp);
    if (item) {
      setSelectedItem(item);
      setItemFormData({
        text: item.text || '',
        order: item.order || 0,
      });
    } else {
      setSelectedItem(null);
      setItemFormData({
        text: '',
        order: (exp.items?.length || 0),
      });
    }
    setIsItemModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedExperience) {
        await adminApi.updateExperience(selectedExperience.id, formData);
        showToast('Experience updated successfully!', 'success');
      } else {
        await adminApi.createExperience(formData);
        showToast('Experience created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadExperiences();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedExperience ? 'update' : 'create'} experience`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedExperience) return;
    setSaving(true);
    try {
      const itemData = {
        ...itemFormData,
        experience: selectedExperience.id,
      };
      if (selectedItem) {
        await adminApi.updateExperienceItem(selectedItem.id, itemData);
        showToast('Experience item updated successfully!', 'success');
      } else {
        await adminApi.createExperienceItem(itemData);
        showToast('Experience item added successfully!', 'success');
      }
      setIsItemModalOpen(false);
      loadExperiences();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedItem ? 'update' : 'create'} item`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedExperience) return;
    setDeleting(true);
    try {
      await adminApi.deleteExperience(selectedExperience.id);
      showToast('Experience deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedExperience(null);
      loadExperiences();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete experience', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteItem = async (_exp: any, item: any) => {
    setDeletingItemId(item.id);
    try {
      await adminApi.deleteExperienceItem(item.id);
      showToast('Experience item deleted successfully', 'success');
      loadExperiences();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete item', 'error');
    } finally {
      setDeletingItemId(null);
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
          Experience Management
        </Typography>
        <Button variant="contained" onClick={openCreateModal}>
          Add New Experience
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
        {experiences.length === 0 ? (
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
                  No Experiences Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Add your first work experience entry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          experiences.map((exp) => (
            <Grid size={12} key={exp.id} sx={{ width: '100%', flexBasis: '100%', maxWidth: '100%' }}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Company:</strong> {exp.company || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Period:</strong> {exp.start_date} {exp.end_date ? `-- ${exp.end_date}` : exp.is_current ? '-- Present' : ''}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                    <strong>Order:</strong> {exp.order}
                  </Typography>
                  {exp.items && exp.items.length > 0 && (
                    <Box sx={{ marginTop: '1rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                        Items ({exp.items.length}):
                      </Typography>
                      <List dense sx={{ paddingLeft: '1.5rem' }}>
                        {exp.items.map((item: any) => (
                          <ListItem key={item.id} sx={{ padding: '0.25rem 0', color: 'text.secondary' }}>
                            <ListItemText primary={item.text} />
                            <Stack direction="row" spacing={0.5} sx={{ marginLeft: '0.5rem' }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => openItemModal(exp, item)}
                                sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteItem(exp, item)}
                                disabled={deletingItemId === item.id}
                                sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                {deletingItemId === item.id ? (
                                  <CircularProgress size={14} color="inherit" />
                                ) : (
                                  'Delete'
                                )}
                              </Button>
                            </Stack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ padding: '1.5rem', paddingTop: 0, flexWrap: 'wrap', gap: 1 }}>
                  <Button size="small" variant="contained" onClick={() => openItemModal(exp)}>
                    Add Item
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => openEditModal(exp)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setSelectedExperience(exp);
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
        title={selectedExperience ? 'Edit Experience' : 'Create Experience'}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
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
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Start Date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            placeholder="e.g., August 2025"
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="End Date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            placeholder="e.g., Present or December 2024"
            disabled={formData.is_current}
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_current}
                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: e.target.checked ? '' : formData.end_date })}
              />
            }
            label="Current Position"
            sx={{ marginTop: '1rem' }}
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
                'Save Experience'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <FormModal
        isOpen={isItemModalOpen}
        title={selectedItem ? 'Edit Experience Item' : 'Add Experience Item'}
        onClose={() => setIsItemModalOpen(false)}
      >
        <form onSubmit={handleItemSubmit}>
          <TextField
            fullWidth
            label="Text"
            value={itemFormData.text}
            onChange={(e) => setItemFormData({ ...itemFormData, text: e.target.value })}
            required
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={itemFormData.order}
            onChange={(e) => setItemFormData({ ...itemFormData, order: parseInt(e.target.value) || 0 })}
            margin="normal"
            variant="outlined"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: '2rem' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setIsItemModalOpen(false)}
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
                selectedItem ? 'Update Item' : 'Add Item'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? All associated items will also be deleted. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedExperience(null);
        }}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default ExperienceManagement;
