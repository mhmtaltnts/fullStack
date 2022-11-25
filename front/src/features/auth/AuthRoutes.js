import {
    Route,
  } from "react-router-dom";

import Login from "./Login.jsx";
import Register from "./Register.jsx";




export const AuthRoutes = (<Route >
    <Route path='login' element={<Login />} />
    {/* <Route path='forgot_password' element={<ForgotPasswordForm/>} />
    <Route path='reset_password/:id/:token' element={<ResetPasswordForm/>} /> */}
    <Route path='/auth/register' element={<Register />} />
</Route>
)