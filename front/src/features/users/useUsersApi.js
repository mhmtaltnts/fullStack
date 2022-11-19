import useAxiosPrivate from "../../hooks/useAxiosPrivate"


const useUserApi = () => {
    const axiosPrivate = useAxiosPrivate();
    const getUsers = async () => {
        const response = await axiosPrivate.get('/users')
        return response?.data
    }
    const getUserById = async ({queryKey}) => {
        const id =queryKey[1]
        const response = await axiosPrivate.get(`/users/${id}`)
        return response.data
    }
    const addUser = async (user) => {
        return await axiosPrivate.post("/users", user)
    }
    const updateUser = async (user) => {
        return await axiosPrivate.patch("/users", user)
    }
    const deleteUser = (id) => {
        return axiosPrivate.delete("/users", {data: {id: id}})
    }


   return {getUsers, getUserById, addUser, updateUser, deleteUser }

}

export default useUserApi

