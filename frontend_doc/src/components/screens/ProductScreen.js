// import React from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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
import {useDispatch , useSelector} from 'react-redux'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'
import { NavLink } from "react-router-dom";
import Header from '../headers/Header'
// import { navigate } from "@reach/router"
// import { Route, Routes, useNavigate } from 'react-router-dom';

// function ProductScreen() {
//     // const {id}  = useParams();
//     // const product = products.find((p)=>p.id == id)
//     // const [product,setProduct] = useState([])
//     // const params = useParams();
//     const dispatch = useDispatch()
//     const productDetails = useSelector(state=>state.productDetails)
//     const { id } = useParams();

//     const {loading , error , product}= productDetails
//     useEffect(()=> {
//     dispatch(listProductDetails(id))

//     },[dispatch])
    
//     // use effect triggered when component loads or gets updated
//     // useEffect(()=>
//     // {
      
//     //   async function fetchProduct()
//     //   {
//     //     // const {data} = await axios.get(`/api/product/${match.params.id}`)
//     //     const {data} = await axios.get(`/api/product/${params.id}`)
//     //     setProduct(data)
//     //     console.log("params",params)
//     //   }
//     //   fetchProduct()
//     // },[])

//     return (
//         <div >
//         <Link to='/'className='btn btn-light my-3'>Go Back</Link>
//         {loading ?
//                     <Loader />
//                     : error
//                         ? <Message variant='danger'>{error}</Message>
//                         : <Row>
//                         <Col md={6}>
//                             <Image src = {product.image} alt= {product.name} fluid></Image>
//                         </Col>
                
//                         <Col md={3}>
//                         <ListGroup variant="flush">
//                             <ListGroup.Item>
//                                 <h3>
//                                     {product.name}
//                                 </h3>
//                             </ListGroup.Item>
//                         </ListGroup>
//                         <ListGroup.Item>
//                         <Rating value = {product.rating} text = {`${product.numReviews} reviews`} color={'#f8e825'}/>
//                         </ListGroup.Item>
                
//                         {/* <ListGroup.Item>
//                             price: ${product.price}
//                         </ListGroup.Item> */}
                
//                         <ListGroup.Item>
//                             About Me : {product.description}
//                         </ListGroup.Item>
//                         </Col>
                
//                         <Col md={3}>
//                             <Card>
//                                 <ListGroup variant='flush'>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Price:</Col>
//                                             <Col>
//                                             <strong>${product.price}</strong>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
                                
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Status:</Col>
//                                             <Col>
//                                             {product.countInStock >0 ? 'In Stock' : 'Out of Stock'}
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                     <Button className = 'btn-block' disabled={product.countInStock==0} type='button'>Add to cart</Button>            
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </Card>
//                         </Col>
//                     </Row>
    
    
    
//         }
    
        
//     </div>
        
//       )
//     }
    
    // export default ProductScreen;

    function ProductScreen ({match}) {
        const [qty, setQty] = useState(1)
        const [rating, setRating] = useState(0) 
        const [comment, setComment] = useState('')
        const dispatch = useDispatch()
    
        const productDetails = useSelector(state=>state.productDetails)
        const { id } = useParams();
        const {loading , error , product}= productDetails
        console.log("product_screen :",product)
        const userLogin = useSelector(state=>state.userLogin)
        const { userInfo } = userLogin
    
        const productReviewCreate = useSelector(state=>state.productReviewCreate)
        const { 
            loading:loadingProductReview ,
            error:errorProductReview ,
            success: successProductReview,
             } = productReviewCreate
    
        // useEffect(()=> {
        // dispatch(listProductDetails(id))
        // },[])

        // const navigate = useNavigate()
        useEffect(() => {
            if (successProductReview) {
                setRating(0)
                setComment('')
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            }
    
            dispatch(listProductDetails(id))
    
        }, [dispatch, match, successProductReview])
    
        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(createProductReview(
                id, {
                rating,
                comment
            }
            ))
        }
    
    
      return (
        <div >
            <Header/>
        <Link to='/'className='btn btn-light my-3'>Go Back</Link>
        {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : <div>
                        <Row>
                        <Col md={6}>
                            <Image src = {product.image} alt= {product.name} fluid></Image>
                        </Col>
                
                        <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    {product.name}
                                </h3>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                        <Rating value = {product.rating} text = {`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>
                
                        {/* <ListGroup.Item>
                            price: ${product.price}
                        </ListGroup.Item> */}
                
                        <ListGroup.Item>
                            About Me:{product.description}
                        </ListGroup.Item>
                        </Col>
                
                        {/* <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Registration Year:</Col>
                                            <Col>
                                            <strong>{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                            {product.countInStock >0 ? 'In Stock' : 'Active'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                    <Button className = 'btn-block' disabled={product.countInStock==0} type='button'>Visit</Button>            
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col> */}
                    </Row>
                    
                    <Row>

                    </Row>
                    <Col md={9}>
                            <h4>Hospitals</h4>
                                {product.hospitalfees && product.hospitalfees.map(hospital =>
                                (
                                    <div key = {hospital.id}>

                                <Card>
                                <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col md = {3}>
                                            <Card>
                                            <Link to = {`/hospitals/hospital/${hospital.hospital_id}`}>
                                    {hospital.hospital_name}
                                    </Link>
                                    </Card>
                                    </Col>

                                    <Col md = {5}>
                                    {hospital.hospital_address}
                                    </Col>

                                    <Col md = {2}>
                                    ₹{hospital.fees}
                                    </Col>

                                    </Row></ListGroup.Item></ListGroup>
                                    {/* </NavLink> */}
                                
                                    </Card.Body>
                                    </Card>

                                    </div>
                                )
                                )} 
                    </Col>


                    <Col md={9}>
                            <h4>Labs</h4>
                                {product.labfees && product.labfees.map(lab =>
                                (
                                    <div key = {lab.id}>

                                <Card>
                                <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col md = {3}>
                                            <Card>
                                            <Link to = {`/labs/lab/${lab.lab_id}`}>
                                    {lab.lab_name}
                                    </Link>
                                    </Card>
                                    </Col>

                                    <Col md = {5}>
                                    {lab.lab_address}
                                    </Col>

                                    <Col md = {2}>
                                    ₹{lab.fees}
                                    </Col>

                                    </Row></ListGroup.Item></ListGroup>
                                    {/* </NavLink> */}
                                
                                    </Card.Body>
                                    </Card>

                                    </div>
                                )
                                )} 
                    </Col>
                    

                    <Col md={9}>
                            <h4>Clinics</h4>
                                {product.clinicfees && product.clinicfees.map(clinic =>
                                (
                                    <div key = {clinic.id}>

                                <Card>
                                <Card.Body>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item >
                                        <Row>
                                            <Col md = {3}>
                                            <Card>
                                            <Link to = {`/clinics/clinic/${clinic.clinic_id}`}>
                                    {clinic.clinic_name}
                                    </Link>
                                    </Card>
                                    </Col>

                                    <Col md = {5}>
                                    {clinic.clinic_address}
                                    </Col>

                                    <Col md = {2}>
                                    ₹{clinic.fees}
                                    </Col>

                                    </Row></ListGroup.Item></ListGroup>
                                    {/* </NavLink> */}
                                
                                    </Card.Body>
                                    </Card>

                                    </div>
                                )
                                )} 
                    </Col>




                   
                    <Row>
    
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {
                                product.reviews.lenght == 0
                                && 
                                <Message variant='info'>No Reviews</Message>
            
                            }
    
                            <ListGroup variant='flush'>
                                            {product.reviews.map((review) => (
                                                <ListGroup.Item key={review.id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color='#f8e825' />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
    
                                            <ListGroup.Item>
                                            <h4> write a review </h4>
    
                                            {loadingProductReview && <Loader />}
                                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
    
    
    
    
                                            {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
    
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Review</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
    
                                                        <Button
                                                            disabled={loadingProductReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >
                                                            Submit
                                                        </Button>
    
                                                    </Form>
                                                ) : (
                                                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                    )}                                    
                                            </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
    
    
    
                    </div>
    
    
    
        }
    
        
    </div>
        
      )
    }
    
    export default ProductScreen;