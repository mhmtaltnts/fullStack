import { useState, useEffect } from "react"
import { useUpdateProductMutation, useDeleteProductMutation } from "../productsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../../hooks/useAuth"

const EditProductForm = ({ product, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProductMutation()

    const [deleteProduct, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProductMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(product.title)
    const [desc, setDesc] = useState(product.desc)
    const [completed, setCompleted] = useState(product.completed)
    const [userId, setUserId] = useState(product.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setDesc('')
            setUserId('')
            navigate('/dash/products')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, desc, userId].every(Boolean) && !isLoading

    const onSaveProductClicked = async (e) => {
        if (canSave) {
            await updateProduct({ id: product.id, user: userId, title, desc, })
        }
    }

    const onDeleteProductClicked = async () => {
        await deleteProduct({ id: product.id })
    }

    const created = new Date(product.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(product.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.email}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescClass = !desc ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteProductClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Product #{product.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveProductClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="product-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="product-title"
                    name="title"
                    type="desc"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="product-desc">
                    Desc:</label>
                <descarea
                    className={`form__input form__input--desc ${validDescClass}`}
                    id="product-desc"
                    name="desc"
                    value={desc}
                    onChange={onDescChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="product-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="product-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="product-email">
                            ASSIGNED TO:</label>
                        <select
                            id="product-email"
                            name="email"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditProductForm