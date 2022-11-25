import {
    Outlet,
    Link,
    useLoaderData,
    useParams
  } from "react-router-dom";
  import useAuth from "../../hooks/useAuth"
  
  /* other code */
  
  export default function ProfileRoot() {
    
    const  {id } = useAuth()
    console.log(id)
  
    return (
      <div id="container">
        <div id="sidebar">
          <h1>Profile</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`../${id}`}>Your Name</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"><Outlet/></div>
      </div>
    );
  }