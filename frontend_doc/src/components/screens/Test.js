import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card, Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React,{useState,useEffect} from 'react'
import Rating from '../../Rating'
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


function Test() {
    const dispatch = useDispatch()
    const productDetails = useSelector(state=>state.productDetails)
    const [id, setID] = useState(2)
        // const { id } = useParams();
        // let id = 2
        const {loading , error , product}= productDetails
        console.log("product_test",product)

        useEffect(() => {

            dispatch(listProductDetails(id))
    
        }, [dispatch,product])

  return (
    <div>
      
    </div>
  )
}

export default Test
