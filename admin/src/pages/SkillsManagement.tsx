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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const SkillsManagement = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    order: 0,
    is_active: true,
  });
  const [skillFormData, setSkillFormData] = useState({
    name: '',
    category: '',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesData, skillsData] = await Promise.all([
        adminApi.getSkillCategories(),
        adminApi.getSkills(),
      ]);
      setCategories(categoriesData.results || []);
      setSkills(skillsData.results || []);
    } catch (error) {
      console.error('Failed to load skills:', error);
      showToast('Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const openCategoryModal = (category?: any) => {
    if (category) {
      setSelectedCategory(category);
      setCategoryFormData({
        name: category.name || '',
        order: category.order || 0,
        is_active: category.is_active !== false,
      });
    } else {
      setSelectedCategory(null);
      setCategoryFormData({
        name: '',
        order: categories.length,
        is_active: true,
      });
    }
    setIsCategoryModalOpen(true);
  };

  const openSkillModal = (category: any, skill?: any) => {
    setSelectedCategory(category);
    if (skill) {
      setSelectedSkill(skill);
      setSkillFormData({
        name: skill.name || '',
        category: skill.category || category.id,
        order: skill.order || 0,
        is_active: skill.is_active !== false,
      });
    } else {
      setSelectedSkill(null);
      setSkillFormData({
        name: '',
        category: category.id,
        order: skills.filter(s => s.category === category.id).length,
        is_active: true,
      });
    }
    setIsSkillModalOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedCategory) {
        await adminApi.updateSkillCategory(selectedCategory.id, categoryFormData);
        showToast('Category updated successfully!', 'success');
      } else {
        await adminApi.createSkillCategory(categoryFormData);
        showToast('Category created successfully!', 'success');
      }
      setIsCategoryModalOpen(false);
      loadData();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedCategory ? 'update' : 'create'} category`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (selectedSkill) {
        await adminApi.updateSkill(selectedSkill.id, skillFormData);
        showToast('Skill updated successfully!', 'success');
      } else {
        await adminApi.createSkill(skillFormData);
        showToast('Skill created successfully!', 'success');
      }
      setIsSkillModalOpen(false);
      loadData();
    } catch (error: any) {
      showToast(error.response?.data?.detail || `Failed to ${selectedSkill ? 'update' : 'create'} skill`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    setDeleting(true);
    try {
      await adminApi.deleteSkillCategory(selectedCategory.id);
      showToast('Category deleted successfully', 'success');
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
      loadData();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete category', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteSkill = async (skill: any) => {
    try {
      await adminApi.deleteSkill(skill.id);
      showToast('Skill deleted successfully', 'success');
      loadData();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to delete skill', 'error');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const getSkillsForCategory = (categoryId: number) => {
    return skills.filter(s => s.category === categoryId);
  };

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
          Skills Management
        </Typography>
        <Button variant="contained" onClick={() => openCategoryModal()}>
          Add New Category
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
        {categories.length === 0 ? (
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
                  No Skill Categories Found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Add your first skill category.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          categories.map((category) => {
            const categorySkills = getSkillsForCategory(category.id);
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ marginBottom: '0.5rem', color: 'primary.main' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                      <strong>Order:</strong> {category.order}
                    </Typography>
                    <Box sx={{ marginTop: '1rem' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                        Skills ({categorySkills.length}):
                      </Typography>
                      {categorySkills.length > 0 ? (
                        <List dense sx={{ paddingLeft: '1.5rem' }}>
                          {categorySkills.map((skill: any) => (
                            <ListItem key={skill.id} sx={{ padding: '0.25rem 0', color: 'text.secondary' }}>
                              <ListItemText primary={skill.name} />
                              <Stack direction="row" spacing={0.5} sx={{ marginLeft: '0.5rem' }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => openSkillModal(category, skill)}
                                  sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDeleteSkill(skill)}
                                  sx={{ minWidth: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                >
                                  Delete
                                </Button>
                              </Stack>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.disabled', marginTop: '0.5rem' }}>
                          No skills in this category
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '1.5rem', paddingTop: 0, flexWrap: 'wrap', gap: 1 }}>
                    <Button size="small" variant="contained" onClick={() => openSkillModal(category)}>
                      Add Skill
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => openCategoryModal(category)}>
                      Edit Category
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete Category
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      <FormModal
        isOpen={isCategoryModalOpen}
        title={selectedCategory ? 'Edit Category' : 'Create Category'}
        onClose={() => setIsCategoryModalOpen(false)}
      >
        <form onSubmit={handleCategorySubmit}>
          <TextField
            fullWidth
            label="Name"
            value={categoryFormData.name}
            onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={categoryFormData.order}
            onChange={(e) => setCategoryFormData({ ...categoryFormData, order: parseInt(e.target.value) || 0 })}
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={categoryFormData.is_active}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, is_active: e.target.checked })}
              />
            }
            label="Active"
            sx={{ marginTop: '1rem' }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: '2rem' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setIsCategoryModalOpen(false)}
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
                'Save Category'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <FormModal
        isOpen={isSkillModalOpen}
        title={selectedSkill ? 'Edit Skill' : 'Add Skill'}
        onClose={() => setIsSkillModalOpen(false)}
      >
        <form onSubmit={handleSkillSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={skillFormData.name}
            onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={skillFormData.category}
              onChange={(e) => setSkillFormData({ ...skillFormData, category: e.target.value })}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={skillFormData.order}
            onChange={(e) => setSkillFormData({ ...skillFormData, order: parseInt(e.target.value) || 0 })}
            margin="normal"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skillFormData.is_active}
                onChange={(e) => setSkillFormData({ ...skillFormData, is_active: e.target.checked })}
              />
            }
            label="Active"
            sx={{ marginTop: '1rem' }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: '2rem' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setIsSkillModalOpen(false)}
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
                selectedSkill ? 'Update Skill' : 'Add Skill'
              )}
            </Button>
          </Stack>
        </form>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category? All skills in this category will also be deleted. This action cannot be undone."
        onConfirm={handleDeleteCategory}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCategory(null);
        }}
        confirmText="Delete"
        loading={deleting}
      />
    </Box>
  );
};

export default SkillsManagement;
