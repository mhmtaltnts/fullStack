import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Public from "./components/Public.jsx";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import DashLayout from "./components/DashLayout.jsx";
import Welcome from "./features/auth/Welcome.jsx";
import ProductsList from "./features/products/ProductsList.jsx";
import UsersList from "./features/users/UsersList.jsx";
import EditUser from "./features/users/EditUser.jsx";
import NewUserForm from "./features/users/NewUserForm.jsx";
import EditProduct from "./features/products/EditProduct.jsx";
import NewProduct from "./features/products/NewProduct.jsx";
import Prefetch from "./features/auth/Prefetch.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";

import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

/* import ForgotPasswordForm from "./features/auth/ForgotPasswordForm.jsx";
import ResetPasswordForm from "./features/auth/ResetPasswordForm.jsx"; */

function App() {
  useTitle("Dan D. Repairs");
  return (      
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        {/* <Route path='forgot_password' element={<ForgotPasswordForm/>} />
        <Route path='reset_password/:id/:token' element={<ResetPasswordForm/>} /> */}
        <Route path='/auth/register' element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager, ROLES.Supplier]} />}
          >
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path='products'>
                  <Route index element={<ProductsList />} />
                  <Route path=':id' element={<EditProduct />} />
                  <Route path='new' element={<NewProduct />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>  
   
  );
}

export default App;
