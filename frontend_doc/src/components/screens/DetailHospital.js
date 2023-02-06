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
import {listHospitalDetails} from '../actions/hospitalActions'
import {useDispatch , useSelector} from 'react-redux'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import Header_Hospital from '../headers/Header_Hospital'



    function DetailHospital ({match}) {
        // const [qty, setQty] = useState(1)
        // const [rating, setRating] = useState(0) 
        // const [comment, setComment] = useState('')
        const dispatch = useDispatch()
    
        const hospitalDetails = useSelector(state=>state.hospitalDetails)
        const { id } = useParams();
        const {loading , error , hospital}= hospitalDetails
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
    
            dispatch(listHospitalDetails(id))
    
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
            <Header_Hospital/>
        <Link to='/'className='btn btn-light my-3'>Go Back</Link>
        {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : <div>
                        <Row>
                        <Col md={6}>
                            <Image src = {hospital.image} alt= {hospital.hospital_name} fluid></Image>
                        </Col>
                
                        <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    {hospital.hospital_name}
                                </h3>
                            </ListGroup.Item>
                        </ListGroup>
                
                        <ListGroup.Item>
                            Address :{hospital.hospital_address}
                        </ListGroup.Item>
                        </Col>
                    </Row>


                    <Col md={9}>
                            <h4>Doctors</h4>
                                {hospital.hospitalfees && hospital.hospitalfees.map(hp =>
                                (
                                    <div key = {hp.HospitalFee_id}>

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
    
    
    
        }
    
        
    </div>
        
      )
    }
    
    export default DetailHospital;