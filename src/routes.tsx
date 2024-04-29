import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { SignUpPage } from "./views/SignIn-LogIn/SignUpPage";
import { SignInPage } from "./views/SignIn-LogIn/SignInPage";
import AppLayout from "./AppLayout";
import { ExplorePage } from "./views/explore/ExplorePage";
import { ArtPage } from "./views/art-page/ArtPage";
import { ArtDetailPage } from "./views/art-detail/ArtDetailPage";
import { UserPage } from "./views/user-profile/UserPage";
import { LandingPage } from "./views/landing-page/LandingPage";
import { GeneralSettings } from "./views/user-profile/user-settings/GeneralSettings";
import { ProfileSettings } from "./views/user-profile/user-settings/ProfileSettings";
import { UserSettings } from "./views/user-profile/user-settings/UserSettings";
import { UserCollection } from "./views/user-profile/UserCollection";
import { PasswordSettings } from "./views/user-profile/user-settings/PasswordSettings";
import { SessionsSettings } from "./views/user-profile/user-settings/SessionsSettings";
import { DesignSystem } from "./views/design-system/DesignSystem";
import { Home } from "./views/home/home";
import { SearchPage } from "./views/search/SearchPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/landing",
            element: <LandingPage />,
          },
          {
            path: "/search",
            element: <SearchPage/>,
          },
          {
            path: "/search/*",
            element: <SearchPage />,
          },
          {
            path: "/explore",
            element: <ExplorePage />,
          },
          {
            path: "/art-piece/:artId",
            element: <ArtPage />,
          },
          {
            path: "/art-detail",
            element: <ArtDetailPage />,
          },
          {
            path: "/user-profile",
            element: <UserPage />,
            children: [
              {
                path: "/user-profile/collectionname",
                element: <UserCollection />,
              },
              {
                path: "/user-profile/settings",
                element: <UserSettings />,
                children: [
                  {
                    path: "/user-profile/settings/general",
                    element: <GeneralSettings />,
                  },
                  {
                    path: "/user-profile/settings/profile",
                    element: <ProfileSettings />,
                  },
                  {
                    path: "/user-profile/settings/password",
                    element: <PasswordSettings />,
                  },
                  {
                    path: "/user-profile/settings/sessions",
                    element: <SessionsSettings />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/design-system",
    element: <DesignSystem />,
  },
]);
