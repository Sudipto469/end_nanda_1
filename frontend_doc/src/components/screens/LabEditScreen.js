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
import { listLabDetails, updateLab } from '../actions/labActions'
import { useNavigate as useHistory  } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import {LAB_UPDATE_RESET} from '../constants/labConstant';

function LabEditScreen() {
    const dispatch = useDispatch()
    const labDetails = useSelector(state=>state.labDetails)

        const {loading , error , lab}= labDetails
        console.log("product_test",lab)

    const labUpdate = useSelector(state => state.labUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = labUpdate
    const [uploading, setUploading] = useState(false)

        const temp = useParams();
        const labId=temp.id;
        console.log('productId :',labId)

        const [lab_name, setName] = useState('')
        const [image, setImage] = useState('')
        const [lab_address, setAddress] = useState('')
        let history = useHistory();
 
        useEffect(() => {

            if (successUpdate) {
                dispatch({ type: LAB_UPDATE_RESET })
                history('/admin/labList')
            } else {
            if (!lab||!lab.lab_name || lab.id !== Number(labId)) {
                dispatch(listLabDetails(labId))
            } else {
                // console.log("else")
                setName(lab.lab_name)
                setImage(lab.image)
                setAddress(lab.lab_address)
            }
        }}, [ dispatch , lab,history, labId,successUpdate])
        
        // --------------
        // useEffect(() => {

        //     // if (!product.name){
        //         if (successUpdate) {
        //             dispatch({ type: PRODUCT_UPDATE_RESET })
        //             history('/admin/productlist')
        //         } else {

        //         if (!product.name || product.id !== Number(productId)) {
        //             dispatch(listProductDetails(productId))
        //         } else {
        //             // console.log("else")
        //             setName(product.name)
        //             setImage(product.image)
        //             setDescription(product.description)
        //         }
        //     }
    
        // }, [ dispatch , product, productId, history, successUpdate])

        // ---------------
        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(updateLab({
                id: labId,
                lab_name,
                // price,
                image,
                // brand,
                // category,
                // countInStock,
                lab_address
            }))
        }


        const uploadFileHandler = async (e) => {
            // console.log('uploading file')
            const file = e.target.files[0]
            const formData = new FormData()
    
            formData.append('image', file)
            formData.append('lab_id', labId)
    
            setUploading(true)
    
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
    
                const { data } = await axios.post('/api/labs/upload/', formData, config)
    
    
                setImage(data)
                setUploading(false)
    
            } catch (error) {
                setUploading(false)
            }
        }
    
    

  return (
    <div>


        <h1>Edit LAB</h1>

        <Link to='/admin/labList'>
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
                            value={lab_name}
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


                    <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={lab_address}
                                    onChange={(e) => setAddress(e.target.value)}
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

export default LabEditScreen
