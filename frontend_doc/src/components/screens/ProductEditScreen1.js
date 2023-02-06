// import React from 'react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'

import Loader from '../Loader'
import Message from '../Message'
import FormContainer from '../FormContainer'
import { listProductDetails } from '../actions/productActions'
import { useNavigate as useHistory  } from 'react-router-dom'
import { useParams } from 'react-router-dom';
// import { USER_UPDATE_RESET } from '../constants/userConstants'

function ProductEditScreen({match}) {
    const temp = useParams();
    const productId=temp.id;
    console.log('productId :',productId)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    // const [email, setEmail] = useState('')
    // const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    // dispatch(listProductDetails(productId))
    // productDetails
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product_new } = productDetails
    console.log('product_new :',product_new)
    let history = useHistory();
    // console.log('product.name :',product.name)

    // const userUpdate = useSelector(state => state.userUpdate)
    // const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (!product_new){
            // if (!product.name || product.id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                console.log("else")
                // setName(product.name)
                // setImage(product.image)
                // setDescription(product.description)
            }
        // }

    }, [ dispatch , product_new, productId, history])

    // [dispatch , product, productId, history]

    // successUpdate,

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(updateUser({ id: user.id, name, email, isAdmin }))
    }



  return (
    <div>
    <Link to='/admin/productlist'>
        Go Back
    </Link>



</div>

  )
}

export default ProductEditScreen
