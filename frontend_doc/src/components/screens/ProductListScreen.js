// import React from 'react'
import React,{useState , useEffect} from 'react'
// import { Link} from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap";
import {Table , Form , Button , Row , Col } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { useSelector, useDispatch } from 'react-redux'
// import { listUsers,deleteUser } from '../actions/userActions';
import { listProducts,deleteProduct, createProduct } from '../actions/productActions';
import { useNavigate as useHistory  } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {PRODUCT_CREATE_RESET} from  '../constants/productConstants';

function ProductListScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {loading , error , products} = productList
    let history = useHistory()

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [key] = useSearchParams();
    console.log("search",key.get("keyword"))
    const keyword = '?keyword='+key.get("keyword")
    console.log("modified search",keyword)

    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete

    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin) {
    //         dispatch(listProducts(keyword)) 
    //     }else {
    //         history('/login')
    //     }

    // },[dispatch,history,userInfo,successDelete] )

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history('/login')
        }

        if (successCreate) {
            history(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

// , history, successDelete, userInfo]

const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch(deleteProduct(id))
    }
    console.log('DELETE :', id)
}


const createProductHandler = (product) => {
    dispatch(createProduct())
}


  return (
    <div>

<Row className='align-items-center'>
                <Col>
                    <h1>Doctors</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
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
                                    <th>NAME</th>
                                    <th>SPECIALIZATION</th>
                                    <th>RATING</th>
                                    {/* <th>ADMIN</th>
                                    <th></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.specialization}</td>
                                        <td>{product.rating}</td>
                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            {/* console.log('${product.id}',${product.id}) */}
                                            <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product.id)}>
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

export default ProductListScreen



