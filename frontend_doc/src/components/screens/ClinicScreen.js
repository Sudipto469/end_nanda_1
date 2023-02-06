
import React,{useState,useEffect} from 'react'
// import products from '../products'
import {Row,Col} from 'react-bootstrap'
import Clinics from '../Clinics'
import Loader from '../Loader'
import Message from '../Message'
import {useDispatch,useSelector} from 'react-redux'
// import {listProducts} from '../actions/productActions'
// import {listHospitals} from '../actions/hospitalActions'
import { listClinics } from '../actions/clinicActions'
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header_Clinic from '../headers/Header_Clinic'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { createBrowserHistory } from 'history';
// import axios from 'axios'
// listProducts

function ClinicScreen() {
  // let history = useNavigate()
  // const history = createBrowserHistory()
  // location = useLocation();
  const dispatch = useDispatch()
  const clinicList = useSelector(state => state.clinicList)
  console.log("hospitalList")
  const {error,loading,clinics} = clinicList
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
    dispatch(listClinics(keyword))
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
      <Header_Clinic/>
      {/* {!keyword } */}
      <h1>Clinics</h1>
      {loading?<h3><Loader/></h3>
        :error ? <Message variant = 'danger'> {error} </Message>
        :
        <Row>
        {clinics.map(
            clinic =>
            <Col key={clinic.id} sm={12} md={6} lg={4} xl={3}>
            <Clinics clinic = {clinic}/>
            {/* <h3>{product.name}</h3> */}
            </Col>
        )}
      </Row>
    
    }

    </div>
  )
}

export default ClinicScreen