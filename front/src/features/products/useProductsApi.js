import { useQuery, useMutation} from "react-query"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const  useProductApi = () => {
    const axiosPrivate = useAxiosPrivate()
    const getProducts = async () => {
        const response = await axiosPrivate.get('/products')
        return response.data
    }
    const addProduct = async (product) => {
        return await axiosPrivate.post("/products", product)
      }
      const updateProduct = async (product) => {
        return await axiosPrivate.patch(`/products/${product.id}`, product)
       }
    const deleteProduct = async (id) => {
        return await axiosPrivate.delete(`/products/${id}`, id)
    }   

   const  getProductQuery = useQuery("products", getProducts) 
   const addNewProductMutation = useMutation(addProduct) 
   const updateProductMutation = useMutation(updateProduct)
   const deleteProductMutation = useMutation(deleteProduct)
    
   return [getProductQuery, addNewProductMutation, updateProductMutation, deleteProductMutation] 

}


export default useProductApi 