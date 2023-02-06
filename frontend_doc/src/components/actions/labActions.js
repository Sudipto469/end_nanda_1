import {
    LAB_LIST_REQUEST,
    LAB_LIST_SUCCESS,
    LAB_LIST_FAIL,

    LAB_DETAILS_REQUEST,
    LAB_DETAILS_SUCCESS,
    LAB_DETAILS_FAIL,

    LAB_CREATE_REVIEW_REQUEST,
    LAB_CREATE_REVIEW_SUCCESS,
    LAB_CREATE_REVIEW_FAIL,
    // PRODUCT_CREATE_REVIEW_RESET

    LAB_DELETE_REQUEST,
    LAB_DELETE_SUCCESS,
    LAB_DELETE_FAIL,

    LAB_CREATE_REQUEST ,
    LAB_CREATE_SUCCESS ,
    LAB_CREATE_FAIL ,
    LAB_CREATE_RESET ,

    LAB_UPDATE_REQUEST ,
    LAB_UPDATE_SUCCESS ,
    LAB_UPDATE_FAIL ,
    LAB_UPDATE_RESET ,

} from '../constants/labConstant'
import axios from 'axios'

export const listLabs = (keyword='') => async (dispatch) =>
{
    try{
        // console.log("in hospital action")
        dispatch({type:LAB_LIST_REQUEST})
        // const { data } = await axios.get(`/api/labs/`)
        const { data } = await axios.get(`/api/labs${keyword}`)
        // const { data } = await axios.get(`/api/products${keyword}`)
        
        dispatch({
                type : LAB_LIST_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: LAB_LIST_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}


export const listLabDetails = (id) => async (dispatch) =>
{
    try{
        // console.log("calling",id)
        dispatch({type: LAB_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/lab/${id}`)
        //const {data} = await axios.get(`/api/product/${params.id}`)
        // console.log("data",data)
        dispatch({
                type : LAB_DETAILS_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: LAB_DETAILS_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}

export const deleteLab = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LAB_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/labs/delete/${id}/`,
            config
        )

        dispatch({
            type: LAB_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: LAB_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createLab = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LAB_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/labs/create/`,
            {},
            config
        )

        dispatch({
            type: LAB_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: LAB_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateLab = (lab) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LAB_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/labs/update/${lab.id}/`,
            lab,
            config
        )

        dispatch({
            type: LAB_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:LAB_DETAILS_SUCCESS,
        payload:data
                })


    } catch (error) {
        dispatch({
            type: LAB_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}