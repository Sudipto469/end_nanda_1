import {
    HOSPITAL_LIST_REQUEST,
    HOSPITAL_LIST_SUCCESS,
    HOSPITAL_LIST_FAIL,

    HOSPITAL_DETAILS_REQUEST,
    HOSPITAL_DETAILS_SUCCESS,
    HOSPITAL_DETAILS_FAIL,

    HOSPITAL_CREATE_REVIEW_REQUEST,
    HOSPITAL_CREATE_REVIEW_SUCCESS,
    HOSPITAL_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    HOSPITAL_DELETE_REQUEST,
    HOSPITAL_DELETE_SUCCESS,
    HOSPITAL_DELETE_FAIL,

    HOSPITAL_CREATE_REQUEST, 
    HOSPITAL_CREATE_SUCCESS ,
    HOSPITAL_CREATE_FAIL ,
    HOSPITAL_CREATE_RESET ,

    HOSPITAL_UPDATE_REQUEST ,
    HOSPITAL_UPDATE_SUCCESS ,
    HOSPITAL_UPDATE_FAIL ,
    HOSPITAL_UPDATE_RESET ,

} from '../constants/hospitalConstant'
import axios from 'axios'

export const listHospitals = (keyword='') => async (dispatch) =>
{
    try{
        console.log("in hospital action")
        dispatch({type:HOSPITAL_LIST_REQUEST})
        // const { data } = await axios.get(`/api/hospitals/`)
        const { data } = await axios.get(`/api/hospitals${keyword}`)
        
        dispatch({
                type : HOSPITAL_LIST_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: HOSPITAL_LIST_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}



export const listHospitalDetails = (id) => async (dispatch) =>
{
    try{
        // console.log("calling",id)
        dispatch({type: HOSPITAL_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/hospital/${id}`)
        //const {data} = await axios.get(`/api/product/${params.id}`)
        // console.log("data",data)
        dispatch({
                type : HOSPITAL_DETAILS_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: HOSPITAL_DETAILS_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}


export const deleteHospital = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOSPITAL_DELETE_REQUEST
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
            `/api/hospital/delete/${id}/`,
            config
        )

        dispatch({
            type: HOSPITAL_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: HOSPITAL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createHospital = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOSPITAL_CREATE_REQUEST
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
            `/api/hospitals/create/`,
            {},
            config
        )

        dispatch({
            type: HOSPITAL_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: HOSPITAL_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateHospital = (hospital) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOSPITAL_UPDATE_REQUEST
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
            `/api/hospitals/update/${hospital.id}/`,
            hospital,
            config
        )

        dispatch({
            type: HOSPITAL_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:HOSPITAL_DETAILS_SUCCESS,
        payload:data
                })


    } catch (error) {
        dispatch({
            type: HOSPITAL_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}