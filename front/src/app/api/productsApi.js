import axios from "axios"

const productsApi = axios.create({
    baseURL : "http://localhost:9999/products"
})

export const getProducts = async () => {
    const response = await productsApi.get()
    return response.data
}

export const addProduct = async (product) => {
    return productsApi.post("/", product)
}

export const updateProduct = async (product) => {
    return productsApi.patch(`/${product.id}`, product)
}

export const deleteProduct = async (id) => {
    return productsApi.patch(`/${id}`, id)
}

export default productsApi