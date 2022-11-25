import Layout from "./Layouts/Main/Layout.jsx";
import Public from "./pages/Public.jsx";
import DashLayout from "./Layouts/Dashboard/DashLayout.jsx";
import Welcome from "./pages/Welcome.jsx";

import PersistLogin from "./features/auth/PersistLogin.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import {UsersRoutes} from "./features/users/UsersRoutes"
import {ProductsRoutes} from "./features/products/ProductsRoutes"
import {AuthRoutes} from "./features/auth/AuthRoutes"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ROLES } from "./config/roles";
import { ProfileRoutes } from "./features/profile/profileRoutes.js";
import ProfileLayout from "./Layouts/Profile/ProfileLayout"


/* import ForgotPasswordForm from "./features/auth/ForgotPasswordForm.jsx";
import ResetPasswordForm from "./features/auth/ResetPasswordForm.jsx"; */
export const router = createBrowserRouter(
  createRoutesFromElements(    
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        {AuthRoutes}
        <Route index element={<Public />} />        
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>    
       
          
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager, ROLES.Supplier, ROLES.Customer]} />} >            
              
              {ProfileRoutes}                          
          </Route>
          </Route> 
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager, ROLES.Supplier]} />} >            
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />} >
                  { UsersRoutes}
                </Route>
                { ProductsRoutes}
              </Route>
                {ProfileRoutes}
              {/* End Dash */}
            
          </Route>
        
        {/* End Protected Routes */}     
    </Route>));


