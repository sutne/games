import * as Icons from '@mui/icons-material';
import { Button, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { IconButton } from 'components/interactive';
import { useAuth } from 'components/providers/AuthProvider';
import { useTheme } from 'components/providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  const { swapTheme, themeIsDark } = useTheme();
  const { user } = useAuth();

  const classes = getClasses();
  return (
    <Box sx={classes.navbar}>
      <Toolbar>
        <IconButton icon={<Icons.Home />} onClick={() => navigate('/')} />

        {user.isSignedIn ? (
          <IconButton
            icon={<Icons.EmojiEvents />}
            onClick={() => navigate('/stats')}
          />
        ) : (
          <></>
        )}
        <Box sx={{ flex: '1' }} />
        {user.isSignedIn ? (
          <Button
            sx={{ color: 'text.secondary', textTransform: 'none' }}
            size='large'
            endIcon={<Icons.AccountCircle />}
            onClick={() => navigate('/profile')}
          >
            {user.username ?? 'Anonymous'}
          </Button>
        ) : (
          <IconButton
            icon={<Icons.AccountCircleOutlined />}
            onClick={() => navigate('/profile')}
          />
        )}
        <IconButton
          icon={themeIsDark ? <Icons.LightbulbOutlined /> : <Icons.Lightbulb />}
          onClick={swapTheme}
        />
      </Toolbar>
    </Box>
  );

  function getClasses() {
    return {
      navbar: {
        margin: '0 auto',
        marginBottom: '16px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 5,
      },
    };
  }
}
