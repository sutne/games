import { Box, CssBaseline } from '@mui/material';
import { games } from 'assets/games';
import { RouteNotFound } from 'components/404';
import { NavBar } from 'components/NavBar';
import { AuthProvider, ThemeProvider } from 'components/providers';
import { ToastContainer } from 'components/toast/toast';
import { Main } from 'pages/main/Main';
import { Anonymous } from 'pages/profile/Anonymous';
import { ChangeEmail } from 'pages/profile/ChangeEmail';
import { ChangePassword } from 'pages/profile/ChangePassword';
import { CreateUser } from 'pages/profile/CreateUser';
import { DeleteAccount } from 'pages/profile/DeleteAccount';
import { Profile } from 'pages/profile/Profile';
import { SignIn } from 'pages/profile/SignIn';
import { Upgrade } from 'pages/profile/Upgrade';
import { Stats } from 'pages/stats/Stats';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

export function App() {
  // Load preferences from cookies and set theme accordingly
  const enabledGames = games.filter((game) => game.isAvailable);

  const classes = getClasses();
  return (
    <ThemeProvider>
      <>
        <AuthProvider>
          <Box sx={classes.content}>
            <Box sx={classes.wrapper}>
              <CssBaseline />
              <HashRouter>
                <NavBar />
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/stats' element={<Stats />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/profile/sign-in' element={<SignIn />} />
                  <Route path='/profile/create' element={<CreateUser />} />
                  <Route
                    path='/profile/change-email'
                    element={<ChangeEmail />}
                  />
                  <Route
                    path='/profile/change-password'
                    element={<ChangePassword />}
                  />
                  <Route path='/profile/anonymous' element={<Anonymous />} />
                  <Route path='/profile/upgrade' element={<Upgrade />} />
                  <Route path='/profile/delete' element={<DeleteAccount />} />
                  {enabledGames.map((game) => {
                    return (
                      <Route
                        key={game.name}
                        path={`/${game.name}`}
                        element={<game.element />}
                      />
                    );
                  })}
                  <Route path='/404' element={<RouteNotFound />} />
                  <Route path='*' element={<Navigate replace to='/404' />} />
                </Routes>
              </HashRouter>
            </Box>
          </Box>
        </AuthProvider>
        <ToastContainer />
      </>
    </ThemeProvider>
  );

  function getClasses() {
    return {
      content: {
        width: '100%',
        backgroundColor: 'background.default',
        color: 'text.primary',
        WebKitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        height: '100vh',
      },
      wrapper: {
        width: 'min(1024px, 100%)',
        height: '100%',
        margin: '0 auto',
        padding: '12px 24px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
      },
    };
  }
}
