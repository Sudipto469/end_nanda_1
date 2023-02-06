
import React,{useState,useEffect} from 'react'
// import products from '../products'
import {Row,Col} from 'react-bootstrap'
import Hospitals from '../Hospitals'
import Loader from '../Loader'
import Message from '../Message'
import {useDispatch,useSelector} from 'react-redux'
// import {listProducts} from '../actions/productActions'
import {listHospitals} from '../actions/hospitalActions'
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header_Hospital from '../headers/Header_Hospital'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { createBrowserHistory } from 'history';
// import axios from 'axios'
// listProducts

function HospitalScreen() {
  // let history = useNavigate()
  // const history = createBrowserHistory()
  // location = useLocation();
  const dispatch = useDispatch()
  const hospitalList = useSelector(state => state.hospiatlList)
  console.log("hospitalList")
  const {error,loading,hospitals} = hospitalList
  // const [products,setProducts] = useState([])
  // use effect triggered when component loads or gets updated
  // let keyword = history.location.search
  const [key] = useSearchParams();
  console.log("search",key.get("keyword"))
  const keyword = '?keyword='+key.get("keyword")
  console.log("modified search",keyword)
  // let keyword = location.search
  useEffect(()=>
  {
    dispatch(listHospitals(keyword))
    // async function fetchProducts()
    // {
    //   const {data} = await axios.get('/api/products/')
    //   setProducts(data)
    // }
    // fetchProducts()
  },[dispatch,keyword])
  // const products = []
  return (
    <div>
      <Header_Hospital/>
      {/* {!keyword } */}
      <h1>Hospitals</h1>
      {loading?<h3><Loader/></h3>
        :error ? <Message variant = 'danger'> {error} </Message>
        :
        <Row>
        {hospitals.map(
            hospital =>
            <Col key={hospital.id} sm={12} md={6} lg={4} xl={3}>
            <Hospitals hospital = {hospital}/>
            {/* <h3>{product.name}</h3> */}
            </Col>
        )}
      </Row>
    
    }

    </div>
  )
}

export default HospitalScreen