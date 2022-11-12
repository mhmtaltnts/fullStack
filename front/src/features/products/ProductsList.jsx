import { useGetProductsQuery } from "./productsApiSlice"
import Product from "./Product"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const ProductsList = () => {
    useTitle('techProducts: Products List')

    const { id, isManager, isAdmin } = useAuth()

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery('productsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = products
        //console.log(entities)

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(productId => entities[productId].supplierId === id)
        }

        const tableContent = ids?.length && filteredIds.map(productId => <Product key={productId} productId={productId}/>)

        content = (
            <table className="table table--products">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th product__status">Supplier</th>
                        <th scope="col" className="table__th product__created">Created</th>
                        <th scope="col" className="table__th product__updated">Updated</th>
                        <th scope="col" className="table__th product__title">Title</th>
                        <th scope="col" className="table__th product__id">Owner</th>
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