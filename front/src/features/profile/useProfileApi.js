import axios from "../../app/api/axios"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"


export const getProfileById = async ({id}) => {
    const response = await axios.get(`/profile/${id}`)
    return response.data
}
export const updateProfile = async (profile) => {
    return await axios.patch(`/profile/${profile.id}`, profile)
}
export const deleteProfile = ({id}) => {
    return axios.delete(`/profile/${id}`)
}

const useProfileApi = () => {
    const axiosPrivate = useAxiosPrivate();
    
    const getProfileById1 = async ({queryKey}) => {
        const id =queryKey[1]
        const response = await axiosPrivate.get(`/profile/${id}`)
        return response.data
    }
    const updateProfile1 = async (profile) => {
        return await axiosPrivate.patch(`/profile/${profile.id}`, profile)
    }
    const deleteProfile1 = ({id}) => {
        return axiosPrivate.delete(`/profile/${id}`)
    }


   return {getProfileById1, updateProfile1, deleteProfile1 }

}

export default useProfileApi