import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetProductsQuery } from './productsApiSlice'
import { memo } from 'react'

const Product = ({ productId}) => {

    const { product } = useGetProductsQuery("productsList", {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        }),
    })

    //console.log(product.email)

    const navigate = useNavigate()

    if (product) {
        const created = new Date(product.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(product.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/products/${productId}`)

        return (
            <tr className="table__row">                
                <td className="table__cell product__email">{product.email}</td>
                <td className="table__cell product__title">{product.title}</td>
                <td className="table__cell product__created">{product.desc}</td>
                <td className="table__cell product__updated">{product.price}</td>
                <td className="table__cell product__created">{product.stockCount}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedProduct = memo(Product)

export default memoizedProduct