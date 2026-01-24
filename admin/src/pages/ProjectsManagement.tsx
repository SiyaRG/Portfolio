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
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    technologies: [] as string[],
    order: 0,
    is_active: true,
  });
  const [itemFormData, setItemFormData] = useState({
    text: '',
    order: 0,
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await adminApi.getProjects();
      setProjects(data.results || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const openCreateModal = () => {
    setSelectedProject(null);
    setFormData({
      title: '',
      technologies: [],
      order: projects.length,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setSelectedProject(project);
    setFormData({
      title: project.title || '',
      technologies: project.technologies || [],
      order: project.order || 0,
      is_active: project.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const openItemModal = (project: any, item?: any) => {
    setSelectedProject(project);
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
        order: (project.achievements?.length || 0),
      });
    }
    setIsItemModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedProject) {
        await adminApi.updateProject(selectedProject.id, formData);
        showToast('Project updated successfully!', 'success');
      } else {
        await adminApi.createProject(formData);
        showToast('Project created successfully!', 'success');
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedProject ? 'update' : 'create'} project`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProject) return;
    setSaving(true);
    try {
      const itemData = {
        ...itemFormData,
        project: selectedProject.id,
      };
      if (selectedItem) {
        await adminApi.updateProjectAchievement(selectedItem.id, itemData);
        showToast('Achievement updated successfully!', 'success');
      } else {
        await adminApi.createProjectAchievement(itemData);
        showToast('Achievement added successfully!', 'success');
      }
      setIsItemModalOpen(false);
      loadProjects();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedItem ? 'update' : 'create'} achievement`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    setDeleting(true);
    try {
      await adminApi.deleteProject(selectedProject.id);
      showToast('Project deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
      loadProjects();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete project', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteItem = async (_project: any, item: any) => {
    setDeletingItemId(item.id);
    try {
      await adminApi.deleteProjectAchievement(item.id);
      showToast('Achievement deleted successfully', 'success');
      loadProjects();
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
          Projects Management
        </Typography>
        <Button variant="contained" onClick={openCreateModal}>
          Add New Project
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
        {projects.length === 0 ? (
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
                  No Projects Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Add your first project.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          projects.map((project) => (
            <Grid size={12} key={project.id} sx={{ width: '100%', flexBasis: '100%', maxWidth: '100%' }}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                    <strong>Technologies:</strong> {(project.technologies || []).join(', ') || 'None'}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                    <strong>Order:</strong> {project.order}
                  </Typography>
                  {project.achievements && project.achievements.length > 0 && (
                    <Box sx={{ marginTop: '1rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                        Achievements ({project.achievements.length}):
                      </Typography>
                      <List dense sx={{ paddingLeft: '1.5rem' }}>
                        {project.achievements.map((achievement: any) => (
                          <ListItem key={achievement.id} sx={{ padding: '0.25rem 0', color: 'text.secondary' }}>
                            <ListItemText primary={achievement.text} />
                            <Stack direction="row" spacing={0.5} sx={{ marginLeft: '0.5rem' }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => openItemModal(project, achievement)}
                                sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteItem(project, achievement)}
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
                  <Button size="small" variant="contained" onClick={() => openItemModal(project)}>
                    Add Achievement
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => openEditModal(project)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setSelectedProject(project);
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
        title={selectedProject ? 'Edit Project' : 'Create Project'}
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
          <Box sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
              Technologies
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginBottom: '0.5rem' }}>
              <TextField
                fullWidth
                size="small"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                placeholder="Enter technology and press Enter"
                variant="outlined"
              />
              <Button variant="outlined" onClick={addTechnology}>
                Add
              </Button>
            </Stack>
            {formData.technologies.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, padding: '0.5rem', border: '2px solid', borderColor: 'primary.main', borderRadius: '4px', minHeight: '50px' }}>
                {formData.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    onDelete={() => removeTechnology(index)}
                    deleteIcon={<DeleteIcon />}
                    color="primary"
                  />
                ))}
              </Box>
            )}
          </Box>
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
                'Save Project'
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
        title="Delete Project"
        message="Are you sure you want to delete this project? All associated achievements will also be deleted. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedProject(null);
        }}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default ProjectsManagement;
