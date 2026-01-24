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
  Link,
} from '@mui/material';
import { adminApi } from '../services/api';
import { getMediaUrl } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';
import Toast from '../components/Toast';

const ContactManagement = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    url: '',
    icon: '',
    icon_file: null as File | null,
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await adminApi.getContactInfo();
      setContacts(data.results || []);
    } catch (error) {
      console.error('Failed to load contacts:', error);
      showToast('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const openCreateModal = () => {
    setSelectedContact(null);
    setFormData({
      label: '',
      value: '',
      url: '',
      icon: '',
      icon_file: null,
      order: contacts.length,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (contact: any) => {
    setSelectedContact(contact);
    setFormData({
      label: contact.label || '',
      value: contact.value || '',
      url: contact.url || '',
      icon: contact.icon || '',
      icon_file: null,
      order: contact.order || 0,
      is_active: contact.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const submitData = new FormData();
      submitData.append('label', formData.label);
      submitData.append('value', formData.value);
      submitData.append('url', formData.url || '');
      submitData.append('order', formData.order.toString());
      submitData.append('is_active', formData.is_active.toString());
      
      // Only append icon if a file is selected (ImageField only accepts file uploads)
      if (formData.icon_file) {
        submitData.append('icon', formData.icon_file);
      }

      if (selectedContact) {
        await adminApi.updateContactInfo(selectedContact.id, submitData);
        showToast('Contact updated successfully!', 'success');
      } else {
        await adminApi.createContactInfo(submitData);
        showToast('Contact created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadContacts();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedContact ? 'update' : 'create'} contact`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;
    setDeleting(true);
    try {
      await adminApi.deleteContactInfo(selectedContact.id);
      showToast('Contact deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
      loadContacts();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete contact', 'error');
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
          Contact Management
        </Typography>
        <Button variant="contained" onClick={openCreateModal}>
          Add New Contact
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
        {contacts.length === 0 ? (
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
                  No Contact Entries Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Add your first contact entry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          contacts.map((contact) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contact.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
                    {contact.label}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Value:</strong> {contact.value}
                  </Typography>
                  {contact.url && (
                    <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                      <strong>URL:</strong>{' '}
                      <Link href={contact.url} target="_blank" rel="noopener noreferrer" color="primary">
                        {contact.url}
                      </Link>
                    </Typography>
                  )}
                  {contact.icon && (
                    <Box sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                      <Typography variant="body2" sx={{ marginBottom: '0.5rem', fontWeight: 600 }}>
                        Icon:
                      </Typography>
                      <Box
                        component="img"
                        src={getMediaUrl(contact.icon) || '#'}
                        alt="Icon"
                        onError={(e: any) => {
                          e.target.style.display = 'none';
                        }}
                        sx={{
                          maxWidth: '64px',
                          maxHeight: '64px',
                          borderRadius: '4px',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  )}
                  <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                    <strong>Order:</strong> {contact.order}
                  </Typography>
                </CardContent>
                <CardActions sx={{ padding: '1.5rem', paddingTop: 0, flexWrap: 'wrap', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={() => openEditModal(contact)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setSelectedContact(contact);
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
        title={selectedContact ? 'Edit Contact' : 'Create Contact'}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="URL"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://..."
            margin="normal"
            variant="outlined"
          />
          <ImageUpload
            label="Icon"
            value={formData.icon}
            onChange={(file, url) => {
              if (file) {
                setFormData({ ...formData, icon_file: file, icon: '' });
              } else if (url) {
                setFormData({ ...formData, icon: url, icon_file: null });
              } else {
                setFormData({ ...formData, icon: '', icon_file: null });
              }
            }}
            accept="image/*"
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
                'Save Contact'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Contact"
        message="Are you sure you want to delete this contact entry? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedContact(null);
        }}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default ContactManagement;
