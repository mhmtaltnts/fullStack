import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {useQuery, useMutation, useQueryClient} from "react-query"
import { addProduct, getProducts } from "../../app/api/productsApi"
//import { useAddNewProductMutation } from "./productsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
//import axios from "axios"
//import ImageUploading from 'react-images-uploading';

const NewProductForm = ({ userId }) => {

    /* const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation() */

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [tax, setTax] = useState(0)
    const [stockCount, setStockCount] = useState(0)
    const [files, setFiles] = useState([]);

    const queryClient = useQueryClient()

    const {
        isLoading, 
        isError,
        error,
        data: products
    } = useQuery("products", getProducts, {
        select: data => data.sort((a,b) => b.id - a.id)
    })

    const {isSuccess, mutate}
         = useMutation(addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        
        } 
    })
    

    
    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setDesc('')
            setFiles()
            setCategory("")
            setPrice(0)
            setTax(0)
            setStockCount(0)
            navigate('/dash/products')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    
    const onCategoryChanged = e => setCategory(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onTaxChanged = e => setTax(e.target.value)
    const onStockCountChanged = e => setStockCount(e.target.value)
    const onFileChanged = (e) => { 
        const files = []
        for(let i=0; i <  e.target.files.length; i++ ){
            console.log(e.target.files.length)
            files.push(e.target.files[i])            
        }        
        setFiles(files) };
    
    const canSave = [title, desc, tax, price, files, category, stockCount].every(Boolean) && !isLoading

    const onSaveProductClicked = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("userId", userId)
        data.append("title", title)
        data.append("desc", desc)
        data.append("category", category)
        data.append("price", price)
        data.append("tax", tax)
        data.append("stockCount", stockCount)
        for(let i = 0; i< files.length; i++){
            data.append("files", files[i], files[i].name)
        }
        
        if (canSave) {
            //await addNewProduct(data)
            await mutate(data)
            /* axios.post("http://localhost:9999/products", data).then(res => console.log(res)).catch(err => console.log(err)) */

        }
        console.log(data)
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescClass = !desc ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveProductClicked} >
                <div className="form__title-row">
                    <h2>New Product</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <div className="form__body">
                    <div className="form__data">
                        <label className="form__label" htmlFor="title">
                            Title:</label>
                        <input
                            className={`form__input ${validTitleClass}`}
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />
                        
                        <label className="form__label" htmlFor="category">
                            Category:</label>
                        <input
                            className={`form__input ${validTitleClass}`}
                            id="category"
                            name="category"
                            type="text"
                            value={category}
                            onChange={onCategoryChanged}
                        />
                        

                        <label className="form__label" htmlFor="desc">
                            Description:</label>
                        <textarea
                            className={`form__input form__input--desc ${validDescClass}`}
                            id="desc"
                            name="desc"
                            type ="text"
                            value={desc}
                            onChange={onDescChanged}
                        />

                        <label className= "form__label" htmlFor="price">
                            Price:</label>
                        <input
                        className={`form__input ${validTitleClass}`}
                            id="price"
                            name="price"
                            type="number"
                            value={price}
                            onChange={onPriceChanged}               
                        
                        />
                        <label className= "form__label" htmlFor="tax">
                            Tax:</label>
                        <input
                        className={`form__input ${validTitleClass}`}
                            id="tax"
                            name="tax"
                            type="number"
                            value={tax}
                            onChange={onTaxChanged}               
                        
                        />
                        <label className= "form__label" htmlFor="stockCount">
                            Stock Count:</label>
                        <input
                        className={`form__input ${validTitleClass}`}
                            id="stockCount"
                            name="stockCount"
                            type="number"
                            value={stockCount}
                            onChange={onStockCountChanged}               
                        
                        />
                    </div>
                    <div className="form__file">

                        <label className="form__label" htmlFor="files">
                            İmages:</label>
                        <input
                            className={`form__input ${validTitleClass}`}
                            multiple
                            id="files"
                            name="files"
                            type="file"
                            onChange={onFileChanged}
                        />
                    </div>
                </div>

            </form>
        </>
    )

    return content
}

export default NewProductForm