// import React from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, Form} from 'react-bootstrap'
import React,{useState,useEffect} from 'react'
import Rating from '../.././Rating'
import Loader from '../Loader'
import Message from '../Message'
// import products from '../products'
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import products from '../../Products';
import axios from 'axios'
import { listProductDetails , createProductReview  } from '../actions/productActions'
// import {listHospitalDetails} from '../actions/hospitalActions'
import { listClinicDetails } from '../actions/clinicActions'
import {useDispatch , useSelector} from 'react-redux'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Header_Clinic from '../headers/Header_Clinic'



    function DetailClinic ({match}) {
        // const [qty, setQty] = useState(1)
        // const [rating, setRating] = useState(0) 
        // const [comment, setComment] = useState('') clinicDetails
        const dispatch = useDispatch()
    
        const clinicDetails = useSelector(state=>state.clinicDetails)
        const { id } = useParams();
        const {loading , error , clinic}= clinicDetails
        const userLogin = useSelector(state=>state.userLogin)
        const { userInfo } = userLogin
    
        // const productReviewCreate = useSelector(state=>state.productReviewCreate)
        // const { 
        //     loading:loadingProductReview ,
        //     error:errorProductReview ,
        //     success: successProductReview,
        //      } = productReviewCreate
    
        // useEffect(()=> {
        // dispatch(listProductDetails(id))
        // },[])
    
        useEffect(() => {
            // if (successProductReview) {
            //     setRating(0)
            //     setComment('')
            //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            // }
    
            dispatch(listClinicDetails(id))
    
        }, [dispatch, match])
        // [dispatch, match, successProductReview]
    
        // const submitHandler = (e) => {
        //     e.preventDefault()
        //     dispatch(createProductReview(
        //         id, {
        //         rating,
        //         comment
        //     }
        //     ))
        // }
    
    
      return (
        <div >
            <Header_Clinic/>
        <Link to='/'className='btn btn-light my-3'>Home</Link>
        {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : <div>
                        <Row>
                        <Col md={6}>
                            <Image src = {clinic.image} alt= {clinic.clinic_name} fluid></Image>
                        </Col>
                
                        <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    {clinic.clinic_name}
                                </h3>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                        {/* <Rating value = {product.rating} text = {`${product.numReviews} reviews`} color={'#f8e825'}/> */}
                        </ListGroup.Item>
                
                        {/* <ListGroup.Item>
                            price: ${product.price}
                        </ListGroup.Item> */}
                
                        <ListGroup.Item>
                            Address :{clinic.clinic_address}
                        </ListGroup.Item>
                        </Col>
                    </Row>
                    </div>
    
        }
    
                        <Col md={9}>
                            <h4>Doctors</h4>
                                {clinic.clinicfees && clinic.clinicfees.map(hp =>
                                (
                                    <div key = {hp.ClinicFee_id}>

                                <Card>
                                <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col md = {3}>
                                            <Card>
                                            <Link to = {`/product/${hp.id}`}>
                                    {hp.name}
                                    </Link>
                                    </Card>
                                    </Col>

                                    <Col md = {5}>
                                    {hp.specialization}
                                    </Col>

                                    <Col md = {2}>
                                    ₹{hp.fees}
                                    </Col>

                                    </Row></ListGroup.Item></ListGroup>
                                    {/* </NavLink> */}
                                
                                    </Card.Body>
                                    </Card>

                                    </div>
                                )
                                )} 
                    </Col>


        
    </div>
        
      )
    }
    
    export default DetailClinic;