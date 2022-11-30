import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import Navbar from './Navbar'
import { StyledLayout } from '../../styles/styled-elements'

const Layout = () => {
    
    return (
    <StyledLayout>
        <Navbar/>
        <Outlet />
        
    </StyledLayout>
    )
    
}
export default Layout