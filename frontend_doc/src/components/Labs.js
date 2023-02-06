import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import Rating from '../Rating'

function Labs({lab}) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to = {`./lab/${lab.id}`}>
      <Card.Img src={lab.image} width={100} height={200}/>
      </Link>

    <Card.Body>
    <Link to = {`./lab/${lab.id}`}>
      <Card.Title as="div">
        <strong>{lab.lab_name}</strong>
      </Card.Title>
    </Link>
    </Card.Body>

    <Card.Text as="div">
        <div className='my-3'></div>
        {/* <strong>{product.specialization}</strong> */}
    </Card.Text>

    <Card.Text as="div">
        <div className='my-3'></div>
        {/* {product.rating} from {product.numReviews} reviews  */}
        {/* <Rating value = {product.rating} text = {`${product.numReviews} reviews`} color={'#f8e825'}/> */}
    </Card.Text>

</Card>
  )
}

export default Labs
