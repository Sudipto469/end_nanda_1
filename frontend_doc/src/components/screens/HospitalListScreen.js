// import React from 'react'
import React,{useState , useEffect} from 'react'
// import { Link} from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap";
import {Table , Form , Button , Row , Col } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { useSelector, useDispatch } from 'react-redux'
// import { listUsers,deleteUser } from '../actions/userActions';
// import { listProducts,deleteProduct, createProduct } from '../actions/productActions';
import { listHospitals, deleteHospital , createHospital} from '../actions/hospitalActions';
import { useNavigate as useHistory  } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {HOSPITAL_CREATE_RESET} from  '../constants/hospitalConstant';

function HospitalListScreen() {
    const dispatch = useDispatch()
    const hospiatlList = useSelector(state=>state.hospiatlList)
    const {loading , error , hospitals} = hospiatlList
    let history = useHistory()

    const hospitalCreate = useSelector(state => state.hospitalCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, hospital: createdHospital } = hospitalCreate

    const hospitalDelete = useSelector(state => state.hospitalDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = hospitalDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [key] = useSearchParams();
    console.log("search",key.get("keyword"))
    const keyword = '?keyword='+key.get("keyword")
    console.log("modified search",keyword)
    // ------------------

    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete

    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin) {
    //         dispatch(listProducts(keyword)) 
    //     }else {
    //         history('/login')
    //     }

    // },[dispatch,history,userInfo,successDelete] )

    // useEffect(() => {
    //     dispatch({ type: PRODUCT_CREATE_RESET })

    //     if (!userInfo.isAdmin) {
    //         history('/login')
    //     }

    //     if (successCreate) {
    //         history(`/admin/product/${createdProduct.id}/edit`)
    //     } else {
    //         dispatch(listProducts(keyword))
    //     }

    // }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

// , history, successDelete, userInfo]

useEffect(()=>
    {

    dispatch({type : HOSPITAL_CREATE_RESET })

    if (! userInfo.isAdmin)
    {
        history('/login')
        // dispatch(listHospitals(keyword))
    }
        if (successCreate) {
            history(`/admin/hospital/${createdHospital.id}/edit`)
        } else {
            dispatch(listHospitals(keyword))
        }

    }
    ,[dispatch, history, userInfo, successDelete, successCreate, createdHospital, keyword])

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Hospital?')) {
        dispatch(deleteHospital(id))
        console.log('DELETE confirmed:', id)
    }
    console.log('DELETE :', id)
}


const createHospitalHandler = (product) => {
    dispatch(createHospital())
    console.log('create lab :')
}


  return (
    <div>

<Row className='align-items-center'>
                <Col>
                    <h1>Hospitals</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createHospitalHandler}>
                        <i className='fas fa-plus'></i> Create Hospital
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


             {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>} 

            {/* <h1>Users</h1> */}
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>HOSPITAL</th>
                                    <th>ADDRESS</th>
                                    {/* <th>RATING</th> */}
                                    {/* <th>ADMIN</th>
                                    <th></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {hospitals.map(hospital => (
                                    <tr key={hospital.id}>
                                        <td>{hospital.id}</td>
                                        <td>{hospital.hospital_name}</td>
                                        <td>{hospital.hospital_address}</td>
                                        {/* <td>{lab.specialization}</td>
                                        <td>{lab.rating}</td> */}
                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            {/* console.log('${product.id}',${product.id}) */}
                                            <LinkContainer to={`/admin/hospital/${hospital.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(hospital.id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
    </div>
  )
}

export default HospitalListScreen



