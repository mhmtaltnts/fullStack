
  import { useNavigate} from "react-router-dom";
  import { useResetPasswordMutation } from "./authApiSlice";
  import PulseLoader from "react-spinners/PulseLoader";
  import { useRef, useEffect, useState } from 'react';
  
  export default function ResetPasswordForm() {
    const userRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const errClass = errMsg ? "errmsg" : "offscreen"

    useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await resetPassword({email, password}).unwrap();          
          setEmail("");
          setPassword("")          
          navigate("/login");
        } catch (err) {
           if (!err.status) {
            setErrMsg("No Server Response");
          } else if (err.status === 400) {
            setErrMsg("Missing Email");
          } else if (err.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg(err.data?.message);
          }
          errRef.current.focus();}}
      
      let content

      if(isLoading) {
        content  = (<PulseLoader/>)
      }else {
        content = (<div>
        <div>
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
          <p lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </p>
          <div id="email" isRequired>
            <label>Email address</label>
            <input
              ref={userRef}
              onChange = {e => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div id="password" isRequired>
            <label>Password</label>
            <input 
                onChange = {e => setPassword(e.target.value)}
                type="password" />
          </div>
          <div >
            <button
            onClick={handleSubmit}
              >
              Submit
            </button>
          </div>
        </div>
      </div>)}
      

    return content;
  }