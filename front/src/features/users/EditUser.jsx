import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
//import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";
//import useUsersApi from"./useUsersApi"
import { useQuery} from "react-query"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const EditUser = () => {
  useTitle("techNotes: Edit User");
  const axiosPrivate = useAxiosPrivate();

  

  const { id } = useParams();
  
  const getUserById = async (id) => {
    return await axiosPrivate.get(`/users/${id}`)
}


  const {data: user, isLoading, status} = useQuery ({queryKey: ["user", id], 
  
        queryFn: async () => {
           const response=  await getUserById(id)
            return response.data
          }  
      }      
        )
       console.log(user)
       console.log(status)

  
 
  

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
