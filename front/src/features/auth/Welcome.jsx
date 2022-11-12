import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { email, isManager, isAdmin } = useAuth();

  useTitle(`Market : ${email}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className='welcome'>
      <p>{today}</p>

      <h1>Welcome {email}!</h1>

      <p>
        <Link to='/dash/products'>View Products</Link>
      </p>

      <p>
        <Link to='/dash/products/new'>Add New Product</Link>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <Link to='/dash/users'>View User Settings</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to='/dash/users/new'>Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
