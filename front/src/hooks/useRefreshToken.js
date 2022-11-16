import axios from '../app/api/axios';
//import useAuth from './useAuth';
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from 'react-redux';

const useRefreshToken = () => {
    //const { setAuth } = useAuth();
    const dispatch = useDispatch()

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        const accessToken = response?.data?.accessToken;
        console.log(accessToken)
        dispatch(setCredentials({ accessToken }))
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;