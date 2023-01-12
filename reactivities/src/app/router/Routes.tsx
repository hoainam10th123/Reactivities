import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/notfound";
import TestErrors from '../../features/errors/testError';
import ProfilePage from "../../features/profiles/ProfilePage";
import ActivityDetails from '../../features/activities/details/ActivityDetail';
import ServerErrorView from '../../features/errors/ServerError';
import App from "../layout/App";
import HomePage from "../../features/home/homePage";
import PrivateWrapper from "../layout/PrivateRoute";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'create-activity', element: <PrivateWrapper><ActivityForm /></PrivateWrapper> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            { path: 'profile/:username', element: <ProfilePage /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'server-error', element: <ServerErrorView /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]

export const router = createBrowserRouter(routes);