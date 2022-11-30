import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { NavLink} from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import {Nav, Ul, Li, Icon, Button, LogoImage} from "../../styles/styled-elements"
import { FaRegSun, FaMoon } from "react-icons/fa";
import logo from '../../img/logo192.png'
     
const Logo = () => {
    return (
          <LogoImage src={logo} alt='Logo'/>
    )
  }

const ThemeButton = ({onClick}) => {
    const {isDark} = useTheme()
    return (
        <Button onClick={onClick}>{isDark ? <FaRegSun/> : <FaMoon/>  } </Button>
    )
}

const Navbar = () => {
    const {setDark} = useTheme()
    const [icon, setIcon] = useState(true)
    const handleClick = () => setIcon(!icon)
    
  return (
    <>
    <Nav clicked>
        <Logo/>
        
            <Ul icon={icon}>                
                <Li><NavLink to="/login">Login</NavLink></Li>
                <ThemeButton onClick={() => setDark(prev => !prev)}></ThemeButton>
            </Ul>
        
        <Icon onClick={handleClick} >
            {icon ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} /> }
        </Icon>
    </Nav>
    </>
  )
}

export default Navbar