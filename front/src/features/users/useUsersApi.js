import { useQuery, useMutation } from "react-query"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"


const useUserApi = () => {

    const axiosPrivate = useAxiosPrivate();
    const getUsers = async () => {
        const response = await axiosPrivate.get('/users')
        return response?.data
    }
    const getUserById = async (id) => {
        return await axiosPrivate.get(`/users/${id}`)
    }
    const addUser = async (user) => {
        return await axiosPrivate.post("/users", user)
    }
    const updateUser = async (user) => {
        return await axiosPrivate.patch(`/users/${user.id}`, user)
    }
    const deleteUser = async (id) => {
        return await axiosPrivate.delete(`/users/${id}`, id)
    }
   const getUsersQuery = useQuery ("users", getUsers)
   
   const useGetUserByIdQuery = (id) => {
    const result = useQuery ({queryKey: ["users", id], queryFn: getUserById(id)})
         return result}
   const addNewUserMutation = useMutation(addUser)
   const updateUserMutation = useMutation(updateUser)
   const deleteUserMutation = useMutation(deleteUser)

   return [getUsersQuery, addNewUserMutation, updateUserMutation, deleteUserMutation, useGetUserByIdQuery ]

}

export default useUserApi

