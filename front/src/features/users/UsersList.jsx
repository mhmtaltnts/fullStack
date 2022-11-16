import User from "./User";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import useUserApi from "./useUsersApi";

const UsersList = () => {
  useTitle("techNotes: Users List");
  //const axiosPrivate = useAxiosPrivate();
  /* const getUsers = async () => {
    const response = await axiosPrivate.get('/users')
    return response.data
} */
const [getUserQuery] = useUserApi()
const {
  isSuccess,
  isLoading,
  isError,
  error,
  data: users
} = getUserQuery

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
