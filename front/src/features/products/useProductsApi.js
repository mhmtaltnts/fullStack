import axios from "axios"


const productApi = axios.create({
    baseURL: "http://localhost:9999"
})

export const addProduct = async (product) => {
    return await productApi.post("/products", product)
}


export const getProducts = async () => {
    const response = await productApi.get('/products')
    return response.data
    
}

export const getProductById = async (id) => {
    const response = await productApi.get(`/products/${id}`)
    return response.data
}

    
export const updateProduct = async (product) => {
    return await productApi.patch(`/products/${product.id}`, product)
    }

export const deleteProduct = async (id) => {
    return await productApi.delete(`/products/${id}`, id)
}