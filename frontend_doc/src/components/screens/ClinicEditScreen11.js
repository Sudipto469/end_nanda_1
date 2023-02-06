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
import { listClinicDetails, updateClinic } from '../actions/clinicActions'
import { useNavigate as useHistory  } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import {CLINIC_UPDATE_RESET} from '../constants/clinicConstant';

function ClinicEditScreen() {
    const dispatch = useDispatch()
    const clinicDetails = useSelector(state=>state.clinicDetails)

        const {loading , error , clinic}= clinicDetails
        console.log("product_test ",clinic)

    // const clinicUpdate = useSelector(state => state.clinicUpdate)
    // const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = clinicUpdate
    // const [uploading, setUploading] = useState(false)

        const temp = useParams();
        const clinicId=temp.id;
        console.log('productId :',clinicId)

        const [clinic_name, setName] = useState('')
        const [clinic_image, setImage] = useState('')
        const [clinic_address, setAddress] = useState('')
        let history = useHistory();
 
        useEffect(() => {

            // if (successUpdate) {
            //     dispatch({ type: CLINIC_UPDATE_RESET })
            //     history('/admin/clinicList')
            // } else {
            if (!clinic||!clinic.clinic_name || clinic.id !== Number(clinicId)) {
                dispatch(listClinicDetails(clinicId))
            } else {
                console.log("else")
                // setName(clinic.clinic_name)
                // setImage(clinic.clinic_image)
                // setAddress(clinic.clinic_address)
            // }
        }}, [ dispatch , clinic,history, clinicId])
        
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
            // dispatch(updateClinic({
            //     id: clinicId,
            //     clinic_name,
            //     // price,
            //     clinic_image,
            //     // brand,
            //     // category,
            //     // countInStock,
            //     clinic_address
            // }))
        }


        const uploadFileHandler = async (e) => {
            console.log("upload file")
        }

  return (
    <div>


        <h1>Edit Clinic</h1>

        <Link to='/admin/clinicList'>
        Go Back
    </Link>
    <FormContainer>

        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control

                            type='name'
                            placeholder='Enter name'
                            value={clinic_name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={clinic_image}
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
                                {/* {uploading && <Loader />} */}
                                
{/* <Form.Control></Form.Control> */}

                    </Form.Group>


                    <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={clinic_address}
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

export default ClinicEditScreen
