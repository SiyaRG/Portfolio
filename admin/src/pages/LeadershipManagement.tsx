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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const LeadershipManagement = () => {
  const [leadership, setLeadership] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    is_active: true,
  });
  const [itemFormData, setItemFormData] = useState({
    text: '',
    order: 0,
  });

  useEffect(() => {
    loadLeadership();
  }, []);

  const loadLeadership = async () => {
    try {
      const data = await adminApi.getLeadership();
      if (data.results && data.results.length > 0) {
        setLeadership(data.results[0]);
        setFormData({
          title: data.results[0].title || '',
          period: data.results[0].period || '',
          is_active: data.results[0].is_active !== false,
        });
      }
    } catch (error) {
      console.error('Failed to load leadership:', error);
      showToast('Failed to load leadership', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const openItemModal = (item?: any) => {
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
        order: (leadership?.achievements?.length || 0),
      });
    }
    setIsItemModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (leadership) {
        await adminApi.updateLeadership(leadership.id, formData);
        showToast('Leadership updated successfully!', 'success');
      } else {
        await adminApi.createLeadership(formData);
        showToast('Leadership created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadLeadership();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${leadership ? 'update' : 'create'} leadership`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadership) return;
    setSaving(true);
    try {
      const itemData = {
        ...itemFormData,
        leadership: leadership.id,
      };
      if (selectedItem) {
        await adminApi.updateLeadershipAchievement(selectedItem.id, itemData);
        showToast('Achievement updated successfully!', 'success');
      } else {
        await adminApi.createLeadershipAchievement(itemData);
        showToast('Achievement added successfully!', 'success');
      }
      setIsItemModalOpen(false);
      loadLeadership();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedItem ? 'update' : 'create'} achievement`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!leadership) return;
    setDeleting(true);
    try {
      await adminApi.deleteLeadership(leadership.id);
      showToast('Leadership deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setLeadership(null);
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete leadership', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteItem = async (item: any) => {
    setDeletingItemId(item.id);
    try {
      await adminApi.deleteLeadershipAchievement(item.id);
      showToast('Achievement deleted successfully', 'success');
      loadLeadership();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete achievement', 'error');
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
          Leadership Management
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          {leadership ? 'Edit Leadership' : 'Create Leadership'}
        </Button>
      </Box>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {leadership ? (
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
              {leadership.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
              <strong>Period:</strong> {leadership.period}
            </Typography>
            {leadership.achievements && leadership.achievements.length > 0 && (
              <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  Achievements ({leadership.achievements.length}):
                </Typography>
                <List dense sx={{ paddingLeft: '1.5rem' }}>
                  {leadership.achievements.map((achievement: any) => (
                    <ListItem key={achievement.id} sx={{ padding: '0.25rem 0', color: 'text.secondary' }}>
                      <ListItemText primary={achievement.text} />
                      <Stack direction="row" spacing={0.5} sx={{ marginLeft: '0.5rem' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openItemModal(achievement)}
                          sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteItem(achievement)}
                          disabled={deletingItemId === achievement.id}
                          sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          {deletingItemId === achievement.id ? (
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
            <Button variant="contained" onClick={() => openItemModal()}>
              Add Achievement
            </Button>
            <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
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
              No Leadership Section Found
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1.5rem', color: 'text.secondary' }}>
              Create your leadership section to get started.
            </Typography>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Create Leadership Section
            </Button>
          </CardContent>
        </Card>
      )}

      <FormModal
        isOpen={isModalOpen}
        title={leadership ? 'Edit Leadership' : 'Create Leadership'}
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
            label="Period"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            placeholder="e.g., 2023 - 2024"
            required
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
                'Save Leadership'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <FormModal
        isOpen={isItemModalOpen}
        title={selectedItem ? 'Edit Achievement' : 'Add Achievement'}
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
                selectedItem ? 'Update Achievement' : 'Add Achievement'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Leadership"
        message="Are you sure you want to delete this leadership section? All associated achievements will also be deleted. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default LeadershipManagement;
