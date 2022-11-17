import Product from "./Product"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { useQuery} from "react-query"
import {getProducts}  from "./useProductsApi"




const ProductsList = () => {
    useTitle('techProducts: Products List')

    const {
        isSuccess,
        isLoading,
        isError,
        error,
        data: products
    } = useQuery("products", getProducts)
    
    
    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        
        const tableContent = products?.length && products.map(product => <Product key={product._id} product={product}/>)

        content = (
            <table className="table table--products">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th product__status">Supplier</th>
                        {/* <th scope="col" className="table__th product__created">Created</th>
                        <th scope="col" className="table__th product__updated">Updated</th> */}
                        <th scope="col" className="table__th product__title">Title</th>
                        <th scope="col" className="table__th product__id">Desc</th>
                        <th scope="col" className="table__th product__edit">Price</th>
                        <th scope="col" className="table__th product__edit">Stock</th>
                        <th scope="col" className="table__th product__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ProductsList