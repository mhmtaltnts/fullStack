import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { memo } from 'react'

const Product = ({product}) => {

    const navigate = useNavigate()

    if (product) {

        const handleEdit = () => navigate(`/dash/products/${product._id}`)
        

        return (
            <tr className="table__row">                
                
                <td className="table__cell product__title">{product.email}</td>
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