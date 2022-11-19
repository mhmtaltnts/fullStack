import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
//import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";
//import useUsersApi from"./useUsersApi"
import { useQuery} from "react-query"
import useUserApi from "./useUsersApi";


const EditUser = () => {
  useTitle("techNotes: Edit User");
  
  const {getUserById} = useUserApi()  

  const { id } = useParams();

  const {data: user, isLoading, status} = useQuery ({queryKey: ["user", id],   
        queryFn:getUserById 
      } 
        )
       console.log(user)
       console.log(status)

  
 
  

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
