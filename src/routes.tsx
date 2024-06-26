import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { SignUpPage } from './views/SignIn-LogIn/SignUpPage';
import { SignInPage } from './views/SignIn-LogIn/SignInPage';
import AppLayout from './AppLayout';
import { ExplorePage } from './views/explore/ExplorePage';
import { ArtPage } from './views/art-page/ArtPage';
import { UserPage } from './views/user-profile/UserPage';
import { LandingPage } from './views/landing-page/LandingPage';
import { GeneralSettings } from './views/user-profile/user-settings/GeneralSettings';
import { ProfileSettings } from './views/user-profile/user-settings/ProfileSettings';
import { UserSettings } from './views/user-profile/user-settings/UserSettings';
import { UserCollection } from './views/user-profile/UserCollection';
import { PasswordSettings } from './views/user-profile/user-settings/PasswordSettings';
import { SessionsSettings } from './views/user-profile/user-settings/SessionsSettings';
import { Home } from './views/home/home';
import { SearchPage } from './views/search/SearchPage';
import { BrandTypography } from './views/brand-guideline/BrandTypography';
import { BrandGuideline } from './views/brand-guideline/BrandGuideline';
import { BrandColor } from './views/brand-guideline/BrandColor';
import { SignUpNewUser } from './views/SignIn-LogIn/SignUpNewUser';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { TermsConditions } from './views/terms-policy/TermsConditions';
import { PrivacyPolicy } from './views/terms-policy/PrivacyPolicy';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/landing',
            element: <LandingPage />,
          },
          {
            path: '/search',
            element: <SearchPage />,
          },
          {
            path: '/explore',
            element: <ExplorePage />,
          },
          {
            path: '/art-piece/:artId',
            element: <ArtPage />,
          },
          {
            path: '/collection',
            element: <ProtectedRoute />,
            children: [
              {
                path: '/collection/:collectionId',
                element: <UserCollection />,
              },
            ],
          },
          {
            path: '/:username',
            element: <ProtectedRoute />,
            children: [
              {
                path: '',
                element: <UserPage />,
              },
              {
                path: '/:username/settings',
                element: <UserSettings />,
                children: [
                  {
                    path: '',
                    element: <Navigate to="general" />,
                  },
                  {
                    path: 'general',
                    element: <GeneralSettings />,
                  },
                  {
                    path: 'profile',
                    element: <ProfileSettings />,
                  },
                  {
                    path: 'password',
                    element: <PasswordSettings />,
                  },
                  {
                    path: 'sessions',
                    element: <SessionsSettings />,
                  },
                ],
              },
            ],
          },
          {
            path: '/terms-conditions',
            element: <TermsConditions />,
          },
          {
            path: '/privacy-policy',
            element: <PrivacyPolicy />,
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/new-user',
    element: <SignUpNewUser />,
  },
  {
    path: '/brand-guidelines',
    element: <BrandGuideline />,
    children: [
      {
        path: '',
        element: <Navigate to="typography" />,
      },
      {
        path: 'typography',
        element: <BrandTypography />,
      },
      {
        path: 'color',
        element: <BrandColor />,
      },
    ],
  },
]);
