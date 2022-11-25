import {
    Route,
  } from "react-router-dom";

  import Profile, {useLoader as profileLoader} from "./Profile.jsx";
  import EditProfile, {useAction as profileAction} from "./EditProfile.jsx";
  import ProfileRoot from "./ProfileRoot"
  


export const ProfileRoutes = (
    <Route path='profile' element={<Profile/>}>
        <Route path=':id' loader={profileLoader} element={<Profile/>} />
        <Route path=':id/edit' loader={profileLoader} action={profileAction} element={<EditProfile />} />
    </Route>
)

export const ProfileRoute = {children: [
    {
      path: "profile/:id",
      element: <Profile/>,
      loader: profileLoader,
    },
    {
      path: "profile/:id/edit",
      element: <EditProfile />,
      loader: profileLoader,
      action: profileAction
    },
  ],}