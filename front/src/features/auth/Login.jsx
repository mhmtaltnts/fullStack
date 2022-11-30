import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setCredentials } from './authSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { useMutation} from 'react-query'
import useAuthApi from './useAuthApi'
import { ErrorMsg, Form, Label, Button, Input, Main, Section, Header, CheckBox  } from '../../styles/styled-elements'




const Login = () => {
    
    useTitle('Employee Login')
    
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const {signin} = useAuthApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const {mutate: login, isLoading, isError} = useMutation(signin, {
        
        onSuccess: (response) => {
            const {accessToken} = response.data
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            console.log("succces")
            navigate('/dash')

        },
        
        onError : (err) => {
            if (!err.response.status) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err?.message);                
            }
        }
    })

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        login({ email, password })
    }


    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    //const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#FFF"} />
    //if (isError) return <ErrorMsg ref={errRef} error={isError} aria-live="assertive">{errMsg}</ErrorMsg>

    

    const content = (
        <Section>
            <Header>
                <h1>Welcome</h1>
            </Header>
            <Main >
            <ErrorMsg ref={errRef} error={isError} aria-live="assertive">{errMsg}</ErrorMsg>
                <Form onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email:</Label>
                    <Input                        
                        type="text"
                        id="email"
                        name = "email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <Label htmlFor="password">Password:</Label>
                    <Input                        
                        type="password"
                        id="password"
                        name = "password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <Button>Sign In</Button>


                    <Label htmlFor="persist" className="form__persist">
                        <CheckBox
                            type="checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </Label>
                </Form>
            </Main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </Section>
    )

    return content
}
export default Login