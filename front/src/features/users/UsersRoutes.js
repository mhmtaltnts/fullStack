import {
    Route,
  } from "react-router-dom";

import UsersList from "./UsersList/UsersList.jsx";
import EditUser from "./EditUser/EditUser.jsx";
import NewUserForm from "./NewUserForm.jsx";


export const UsersRoutes = (<Route path='users'>
    <Route index element={<UsersList />} />
    <Route path=':id' element={<EditUser />} />
    <Route path='new' element={<NewUserForm />} />
</Route>)

