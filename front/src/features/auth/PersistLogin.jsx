import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
//import { useRefreshMutation } from "./authApiSlice";
import useRefreshToken from '../../hooks/useRefreshToken';

import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const refresh = useRefreshToken();

  //const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    //useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
        } catch (err) {
          console.error(err);
        }
        finally{
          effectRan.current && setIsLoading(false)
          console.log(token)
        }
      };

      !token && persist ? verifyRefreshToken() : setIsLoading(false);
      
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  return (
    <>
        {!persist
            ? <Outlet />
            : isLoading
                ? <PulseLoader/>
                : <Outlet />
        }
    </>
)
};
export default PersistLogin;
