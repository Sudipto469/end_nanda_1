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
import { listLabs,deleteLab,createLab } from '../actions/labActions';
import { useNavigate as useHistory  } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {LAB_CREATE_RESET} from  '../constants/labConstant';

function LabListScreen() {
    const dispatch = useDispatch()
    const labList = useSelector(state=>state.labList)
    const {loading , error , labs} = labList
    let history = useHistory()

    const labCreate = useSelector(state => state.labCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, lab: createdlab } = labCreate

    const labDelete = useSelector(state => state.labDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = labDelete
    console.log("labDelete",labDelete)

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

    dispatch({type : LAB_CREATE_RESET })

    if (! userInfo.isAdmin)
    {
        history('/login')
        // dispatch(listHospitals(keyword))
    }
        if (successCreate) {
            history(`/admin/lab/${createdlab.id}/edit`)
        } else {
            dispatch(listLabs(keyword))
        }

    }
    ,[dispatch, history, userInfo, successDelete, successCreate, createdlab, keyword])

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Lab?')) {
        dispatch(deleteLab(id))
        console.log('DELETE confirmed:', id)
    }
    console.log('DELETE :', id)
}


const createLabHandler = (product) => {
    dispatch(createLab())
    console.log('create lab :')
}


  return (
    <div>

<Row className='align-items-center'>
                <Col>
                    <h1>Labs</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createLabHandler}>
                        <i className='fas fa-plus'></i> Create Lab
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
                                    <th>LAB</th>
                                    <th>ADDRESS</th>
                                    {/* <th>RATING</th> */}
                                    {/* <th>ADMIN</th>
                                    <th></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {labs.map(lab => (
                                    <tr key={lab.id}>
                                        <td>{lab.id}</td>
                                        <td>{lab.lab_name}</td>
                                        <td>{lab.lab_address}</td>
                                        {/* <td>{lab.specialization}</td>
                                        <td>{lab.rating}</td> */}
                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            {/* console.log('${product.id}',${product.id}) */}
                                            <LinkContainer to={`/admin/lab/${lab.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(lab.id)}>
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

export default LabListScreen



