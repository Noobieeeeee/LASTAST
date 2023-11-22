import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.jsx'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from './context/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Dashboard from './Dashboard.jsx';
// import './index.css';
// import { RouterProvider } from "react-router-dom";
// import router from "./router.jsx";
// import { ContextProvider } from './context/ContextProvider.jsx';
// import { ColorModeProvider } from '../../theme.js'; // Import the ColorModeProvider

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ColorModeProvider>
//       <ContextProvider>
//         <RouterProvider router={router} />
//       </ContextProvider>
//     </ColorModeProvider>
//   </React.StrictMode>
// );