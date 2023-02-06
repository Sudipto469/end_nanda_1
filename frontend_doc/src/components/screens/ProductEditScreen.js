// import React from 'react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import axios from 'axios';
import Loader from '../Loader'
import Message from '../Message'
import FormContainer from '../FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { useNavigate as useHistory  } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants';

function ProductEditScreen() {
    const dispatch = useDispatch()
    const productDetails = useSelector(state=>state.productDetails)
    // const [id, setID] = useState(2)
        // const { id } = useParams();
        // let id = 2
        const {loading , error , product}= productDetails
        console.log("product_test",product)

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const [uploading, setUploading] = useState(false)

        const temp = useParams();
    const productId=temp.id;
    console.log('productId :',productId)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    let history = useHistory();

        // useEffect(() => {

        //     dispatch(listProductDetails(productId))
    
        // }, [dispatch,product])

        useEffect(() => {

            // if (!product.name){
                if (successUpdate) {
                    dispatch({ type: PRODUCT_UPDATE_RESET })
                    history('/admin/productlist')
                } else {

                if (!product.name || product.id !== Number(productId)) {
                    dispatch(listProductDetails(productId))
                } else {
                    // console.log("else")
                    setName(product.name)
                    setImage(product.image)
                    setDescription(product.description)
                    console.log("else",product.image)
                }
            }
    
        }, [ dispatch , product, productId, history, successUpdate])

        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(updateProduct({
                id: productId,
                name,
                // price,
                image,
                // brand,
                // category,
                // countInStock,
                description
            }))
        }

        const uploadFileHandler = async (e) => {
            // console.log('uploading file')
            const file = e.target.files[0]
            const formData = new FormData()
    
            formData.append('image', file)
            formData.append('product_id', productId)
    
            setUploading(true)
    
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
    
                const { data } = await axios.post('/api/products/upload/', formData, config)
    
    
                setImage(data)
                setUploading(false)
    
            } catch (error) {
                setUploading(false)
            }
        }



  return (
    <div>


        <h1>Edit Doctors</h1>

        <Link to='/admin/productlist'>
        Go Back
    </Link>
    <FormContainer>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control

                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                {/* <Form.File></Form.File> */}

                                {/* <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.File> */}


                                <Form.Control
                                    type='file'
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                                {uploading && <Loader />}
                                
{/* <Form.Control></Form.Control> */}

                    </Form.Group>


                    <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                    </Form.Group>

                    {/* <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group> */}

                    {/* <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group> */}

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            )}

    </FormContainer >
      
    </div>
  )
}

export default ProductEditScreen
