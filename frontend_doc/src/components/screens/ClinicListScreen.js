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
import { listClinics,deleteClinic,createClinic } from '../actions/clinicActions';
import { useNavigate as useHistory  } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {CLINIC_CREATE_RESET} from  '../constants/clinicConstant';

function ClinicListScreen() {
    const dispatch = useDispatch()
    const clinicList = useSelector(state=>state.clinicList)
    const {loading , error , clinics} = clinicList
    let history = useHistory()

    const clinicCreate = useSelector(state => state.clinicCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, clinic: createdClinic } = clinicCreate

    const clinicDelete = useSelector(state => state.clinicDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = clinicDelete

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

// useEffect(()=>
//     {
//     if (userInfo && userInfo.isAdmin)
//     {
//         dispatch(listClinics(keyword))
//     }
//     else{
//         history('/login')
//     }

//     }
//     ,[dispatch,history,userInfo,clinicDelete])

useEffect(()=>
    {

    dispatch({type : CLINIC_CREATE_RESET })

    if (! userInfo.isAdmin)
    {
        history('/login')
        // dispatch(listHospitals(keyword))
    }
        if (successCreate) {
            history(`/admin/clinic/${createdClinic.id}/edit`)
        } else {
            dispatch(listClinics(keyword))
        }

    }
    ,[dispatch, history, userInfo, successDelete, successCreate, createdClinic, keyword])

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Clinic?')) {
        dispatch(deleteClinic(id))
        console.log('DELETE confirmed:', id)
    }
    console.log('DELETE :', id)
}


const createClinicHandler = (product) => {
    dispatch(createClinic())
    console.log('create lab :')
}


  return (
    <div>

<Row className='align-items-center'>
                <Col>
                    <h1>Clinics</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createClinicHandler}>
                        <i className='fas fa-plus'></i> Create Clinics
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
                                    <th>CLINIC</th>
                                    <th>ADDRESS</th>
                                    {/* <th>RATING</th> */}
                                    {/* <th>ADMIN</th>
                                    <th></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {clinics.map(clinic => (
                                    <tr key={clinic.id}>
                                        <td>{clinic.id}</td>
                                        <td>{clinic.clinic_name}</td>
                                        <td>{clinic.clinic_address}</td>
                                        {/* <td>{lab.specialization}</td>
                                        <td>{lab.rating}</td> */}
                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            {/* console.log('${product.id}',${product.id}) */}
                                            <LinkContainer to={`/admin/clinic/${clinic.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(clinic.id)}>
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

export default ClinicListScreen



