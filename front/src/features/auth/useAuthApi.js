import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from './authSlice'
import jwtDecode from "jwt-decode";




const authAxios = axios.create({
    baseURL: "http://localhost:9999"
})


const useAuthApi = () => {
    const dispatch = useDispatch()

    
    const signin = async (credentials) => {        
        const response = await authAxios.post("/auth", credentials)
        const { accessToken } = response.data;
        dispatch(setCredentials({ accessToken }));
        let isManager = false;
        let isAdmin = false;
        let status = "Customer";

        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const { id, email, roles } = decoded.UserInfo;

            isManager = roles.includes("Manager");
            isAdmin = roles.includes("Admin");

            if (isManager) status = "Manager";
            if (isAdmin) status = "Admin";

            return {id, email, roles, status, isManager, isAdmin };
        }

        return { id: "", email: "", roles: [], isManager, isAdmin, status };
        }
        
               
    

    const signout = async() => {
        try {
            const { data } = await authAxios.post("/auth/logout" )
            console.log(data);
            dispatch(logOut());
          } catch (err) {
            console.log(err);
          }    
    }


    const register = async(credentials) => {
        return await authAxios.post("/auth/register" , credentials)
    }

    const forgetPassword = async(data) => {
        return await authAxios.post("/auth/forgot_password" , data)
    }
  
    const resetPassword = async(data) => {
        return await authAxios.post("/auth/reset_password/:id/:token" , data)
    }

    const refresh = async() => {
        
        try {
            const response = await authAxios.get("/auth/refresh" )
            const { accessToken } = response.data;
            dispatch(setCredentials({ accessToken }));
          } catch (err) {
            console.log(err);
          }
       
    }

    return {signin, signout, register, forgetPassword, resetPassword, refresh }

}

export default useAuthApi