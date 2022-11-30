import { Link } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
                <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Dan D. Repairs<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Dan Davidson</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public