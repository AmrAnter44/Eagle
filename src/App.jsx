import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './comp/Home';
import Layout from './Layout';
import Coaches from './comp/Coaches';
import Trans from './comp/Trans';
import Classes from './comp/Classes';
import Men from './comp/Map/Men';
import Ladies from './comp/Map/Ladies';
import Cardio from './comp/Map/Cardio';
import Weight from './comp/Map/Weight';
import Free from './comp/Map/Free';
import Machines from './comp/Map/Machines';
import Map from './comp/Map';
import Bar from './comp/Map/Bar';
import BranchHome from './comp/BranchHome';
import BranchPage from './comp/BranchPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  let router = createBrowserRouter([
    // ==================== الصفحة الرئيسية - اختيار الفرع ====================
    {
      path: "/",
      element: <BranchHome />,
    },

    // ==================== صفحات الفروع ====================
    {
      path: "/:branchSlug",
      element: <Layout />,
      children: [
        { index: true, element: <BranchPage /> },
        { path: "coaches", element: <Coaches /> },
        { path: "transformations", element: <Trans /> },
        { path: "classes", element: <Classes /> },
        { path: "map", element: <Map /> },
        { path: "Men", element: <Men /> },
        { path: "Ladies", element: <Ladies /> },
        { path: "Cardio", element: <Cardio /> },
        { path: "Free", element: <Free /> },
        { path: "Weight", element: <Weight /> },
        { path: "Machines", element: <Machines /> },
        { path: "bar", element: <Bar /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
