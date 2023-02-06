
import React,{useState,useEffect} from 'react'
// import products from '../products'
import {Row,Col} from 'react-bootstrap'
import Labs from '../Labs'
import Loader from '../Loader'
import Message from '../Message'
import {useDispatch,useSelector} from 'react-redux'
// import {listProducts} from '../actions/productActions'
// import {listHospitals} from '../actions/hospitalActions'
import { listLabs } from '../actions/labActions'
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header_Lab from '../headers/Header_Lab'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { createBrowserHistory } from 'history';
// import axios from 'axios'
// listProducts

function LabScreen() {
  // let history = useNavigate()
  // const history = createBrowserHistory()
    //   labList
  // location = useLocation();
  const dispatch = useDispatch()
  const labList = useSelector(state => state.labList)
//   console.log("hospitalList",hospitalList)
  const {error,loading,labs} = labList
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
    dispatch(listLabs(keyword))
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
      <Header_Lab/>
      {/* {!keyword } */}
      <h1>Labs</h1>
      {loading?<h3><Loader/></h3>
        :error ? <Message variant = 'danger'> {error} </Message>
        :
        <Row>
        {labs.map(
            lab =>
            <Col key={lab.id} sm={12} md={6} lg={4} xl={3}>
            <Labs lab = {lab}/>
            {/* <h3>{product.name}</h3> */}
            </Col>
        )}
      </Row>
    
    }

    </div>
  )
}

export default LabScreen