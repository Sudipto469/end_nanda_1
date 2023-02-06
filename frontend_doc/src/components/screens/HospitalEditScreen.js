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
import { listHospitalDetails, updateHospital } from '../actions/hospitalActions'
import { useNavigate as useHistory  } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import {HOSPITAL_UPDATE_RESET} from '../constants/hospitalConstant';

function HospitalEditScreen() {
    const dispatch = useDispatch()
    const hospitalDetails = useSelector(state=>state.hospitalDetails)

        const {loading , error , hospital}= hospitalDetails
        console.log("product_test",hospital)

    const hospitalUpdate = useSelector(state => state.hospitalUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = hospitalUpdate
    const [uploading, setUploading] = useState(false)

        const temp = useParams();
        const hospitalId=temp.id;
        console.log('productId :',hospitalId)

        const [hospital_name, setName] = useState('')
        const [image, setImage] = useState('')
        const [hospital_address, setAddress] = useState('')
        let history = useHistory();
 
        useEffect(() => {

            if (successUpdate) {
                dispatch({ type: HOSPITAL_UPDATE_RESET })
                history('/admin/hospitalList')
            } else {
            if (!hospital||!hospital.hospital_name || hospital.id !== Number(hospitalId)) {
                dispatch(listHospitalDetails(hospitalId))
            } else {
                // console.log("else")
                setName(hospital.hospital_name)
                setImage(hospital.image)
                setAddress(hospital.hospital_address)
                console.log("else",hospital.image)
            }
        }}, [ dispatch , hospital,history, hospitalId,successUpdate])
        
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
            dispatch(updateHospital({
                id: hospitalId,
                hospital_name,
                // price,
                image,
                // brand,
                // category,
                // countInStock,
                hospital_address
            }))
        }


        const uploadFileHandler = async (e) => {
            // console.log('uploading file')
            const file = e.target.files[0]
            const formData = new FormData()
    
            formData.append('image', file)
            formData.append('hospital_id', hospitalId)
    
            setUploading(true)
    
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
    
                const { data } = await axios.post('/api/hospitals/upload/', formData, config)
    
    
                setImage(data)
                setUploading(false)
    
            } catch (error) {
                setUploading(false)
            }
        }

  return (
    <div>


        <h1>Edit Hospital</h1>

        <Link to='/admin/hospitalList'>
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
                            value={hospital_name}
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
                                    value={hospital_address}
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

export default HospitalEditScreen
