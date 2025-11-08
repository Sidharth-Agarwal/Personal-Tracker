import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ConsultingDetail from './pages/ConsultingDetail';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'project/:projectId',
        element: <ProjectDetail />,
      },
      {
        path: 'consulting/:consultingId',
        element: <ConsultingDetail />,
      },
    ],
  },
]);

export default router;