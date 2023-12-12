import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./Page/DefaultLayout";
import GuestLayout from "./Page/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Input from "./views/inputs";
import Team from "./views/accounts";
import Reports from "./views/reports";
import Inventory from "./views/inventory";
import Form from "./views/form";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Inventory/>
      },
      {
        path: '/users',
        element: <Input/>
      },      
      {
        path: '/inventory',
        element: <Input/>
      },      
      {
        path: '/reports',
        element: <Reports/>
      },      
      {
        path: '/form',
        element: <Users/>
      },     
      {
        path: '/team',
        element: <Team/>
      },        
      {
        path: '/users/new',
        // element: <UserForm key="userCreate" />
        element: <Form/>
      },
      {
        path: '/users/:id',
        // element: <UserForm key="userUpdate" />
        element:<Form key="userUpdate"/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;