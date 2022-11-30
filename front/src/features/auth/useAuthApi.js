import axios from "axios"
import { useDispatch} from 'react-redux'
import { logOut, setCredentials } from './authSlice'





const authAxios = axios.create({
    baseURL: "http://localhost:9999"
})


const useAuthApi = () => {
    const dispatch = useDispatch()

    
    const signin = async (credentials) => {        
        return await authAxios.post("/auth", credentials)
        }
   
    const signout = async() => {
        try {
            const { data } = await authAxios.post("/auth/logout" )
            console.log(data);
            logOut()
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