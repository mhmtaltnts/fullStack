import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useNavigate} from "react-router-dom";
  import { useSendEmailMutation } from "./authApiSlice";
  import PulseLoader from "react-spinners/PulseLoader";
  import { useState} from 'react';
  
  
  export default function ForgotPasswordForm(){
    const [email, setEmail] = useState("")
    const color = useColorModeValue('gray.50', 'gray.800')
    /* const [errMsg, setErrMsg] = useState("");
    const errRef = useRef();  */ 
  const navigate = useNavigate();

  
    const [sendingEmail, { isLoading }] = useSendEmailMutation();
    
    /* useEffect(() => {
      setErrMsg("");
    }, [email]); */

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await sendingEmail({email}).unwrap();
        
        setEmail("");
        
        navigate("/login");
      } catch (err) {
        /* if (!err.status) {
          setErrMsg("No Server Response");
        } else if (err.status === 400) {
          setErrMsg("Missing Email");
        } else if (err.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg(err.data?.message);
        }
        errRef.current.focus(); */
      }
    };

    if (isLoading) return <PulseLoader color={"#FFF"} />;

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={color}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={color}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          {/* <Text ref={errRef} aria-live='assertive'>
          {errMsg}
        </Text> */}
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={color}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              onChange = {e => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }