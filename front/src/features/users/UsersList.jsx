import User from "./User";
import useTitle from "../../hooks/useTitle";
import { useQuery} from "react-query"
import PulseLoader from "react-spinners/PulseLoader";
import useUsersApi  from "./useUsersApi";


const UsersList = () => {
  useTitle("techNotes: Users List");
  const {getUsers} = useUsersApi()
const {
  isSuccess,
  isLoading,
  isError,
  error,
  data: users
} = useQuery("users", getUsers)

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
     const tableContent =
      users?.length && users.map((user) => <User key={user._id} user={user} />);

    content = (
      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th user__username'>
              Email
            </th>
            <th scope='col' className='table__th user__roles'>
              Roles
            </th>
            <th scope='col' className='table__th user__edit'>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
