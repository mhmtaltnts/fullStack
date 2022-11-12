import NewProductForm from './NewProductForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import useAuth from "../../hooks/useAuth"

const NewProduct = () => {
    useTitle('techProducts: New Product')

    const { id } = useAuth()
    

    if (!id?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewProductForm userId={id} />

    return content
}
export default NewProduct