import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const dashboardCards = [
    { path: '/profile', title: 'Profile', description: 'Manage your profile information' },
    { path: '/about', title: 'About', description: 'Edit about section content' },
    { path: '/experience', title: 'Experience', description: 'Manage work experience entries' },
    { path: '/projects', title: 'Projects', description: 'Manage project portfolio' },
    { path: '/skills', title: 'Skills', description: 'Manage skills and categories' },
    { path: '/education', title: 'Education', description: 'Manage education entries' },
    { path: '/leadership', title: 'Leadership', description: 'Manage leadership section' },
    { path: '/contact', title: 'Contact', description: 'Manage contact information' },
  ];

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Typography
        variant="h1"
        sx={{
          marginBottom: '1rem',
          color: 'primary.main',
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: 700,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          paddingBottom: '0.5rem',
        }}
      >
        Dashboard
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          marginBottom: '2rem',
          fontSize: '1.1rem',
        }}
      >
        Welcome to the Portfolio CMS. Manage your portfolio content from the navigation menu.
      </Typography>
      <Box
        sx={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {dashboardCards.map((card) => (
          <Card
            key={card.path}
            component={Link}
            to={card.path}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              width: '100%',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(14, 110, 85, 0.3)',
              },
            }}
          >
              <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    marginBottom: '0.75rem',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

