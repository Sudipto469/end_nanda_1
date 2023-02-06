import React,{useState,useEffect} from 'react'
// import products from '../products'
import {Row,Col} from 'react-bootstrap'
//import Product from '../components/Product'
import Product from '../Product'
import axios from 'axios'


function HomeScreen() {
  const [products,setProducts] = useState([])
  // use effect triggered when component loads or gets updated
  useEffect(()=>
  {
    
    async function fetchProducts()
    {
      const {data} = await axios.get('/api/products/sort/')
      setProducts(data)
    }
    fetchProducts()
  },[])
  return (
    <div>
      <h1>Latest products</h1>
      <Row>
        {products.map(
            product =>
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product = {product}/>
            {/* <h3>{product.name}</h3> */}
            </Col>
        )}
      </Row>
    </div>
  )
}

export default HomeScreen
