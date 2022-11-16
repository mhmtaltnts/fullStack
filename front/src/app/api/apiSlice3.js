import { createApi } from '@reduxjs/toolkit/query'
//import { setCredentials } from "../../features/auth/authSlice";
import axios from 'axios'
//import {store} from "../store"


const axiosBaseQuery = async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: 'http://localhost:9999' + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }



/* const axiosBaseQuery =
  async ({ baseUrl } = { baseUrl: 'http://localhost:9999/' }) =>
  async ({ url, method, data, params }) => {
    
    axios.interceptors.request.use(        
        config => {
            const token = store.getState().auth.token
            if(token){
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
               }
            }
            return config;
        }, (error) => Promise.reject(error)
    );
    
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
 */

/* 
const axiosBaseQueryWithReauth = async () =>{
    
    let result = await axiosBaseQuery.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await axiosBaseQuery("/auth/refresh");
                store.dispatch(setCredentials({ newAccessToken }));
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(prevRequest);
            }
            return Promise.reject(error);
        }
    );
 
      return result;
}; */


export const apiSlice = createApi({
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Producs", "User"],
    endpoints: (builder) => ({}),
  });