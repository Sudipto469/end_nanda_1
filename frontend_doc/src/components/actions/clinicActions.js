import {
    CLINIC_LIST_REQUEST,
    CLINIC_LIST_SUCCESS,
    CLINIC_LIST_FAIL,

    CLINIC_DETAILS_REQUEST,
    CLINIC_DETAILS_SUCCESS,
    CLINIC_DETAILS_FAIL,

    CLINIC_CREATE_REVIEW_REQUEST,
    CLINIC_CREATE_REVIEW_SUCCESS,
    CLINIC_CREATE_REVIEW_FAIL,
    // PRODUCT_CREATE_REVIEW_RESET

    CLINIC_DELETE_REQUEST,
    CLINIC_DELETE_SUCCESS,
    CLINIC_DELETE_FAIL,

    CLINIC_CREATE_REQUEST ,
    CLINIC_CREATE_SUCCESS ,
    CLINIC_CREATE_FAIL ,
    CLINIC_CREATE_RESET ,

CLINIC_UPDATE_REQUEST ,
CLINIC_UPDATE_SUCCESS ,
CLINIC_UPDATE_FAIL ,
CLINIC_UPDATE_RESET ,

} from '../constants/clinicConstant'
import axios from 'axios'

export const listClinics = (keyword='') => async (dispatch) =>
{
    try{
        // console.log("in hospital action")
        dispatch({type:CLINIC_LIST_REQUEST})
        const { data } = await axios.get(`/api/clinics${keyword}`)
        
        // const { data } = await axios.get(`/api/clinics/`)
        // const { data } = await axios.get(`/api/products${keyword}`)
        
        dispatch({
                type : CLINIC_LIST_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: CLINIC_LIST_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}



export const listClinicDetails = (id) => async (dispatch) =>
{
    try{
        // console.log("calling",id)
        dispatch({type: CLINIC_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/clinic/${id}`)
        //const {data} = await axios.get(`/api/product/${params.id}`)
        // console.log("data",data)
        dispatch({
                type : CLINIC_DETAILS_SUCCESS,
                payload : data
            })
    }
    catch(error){
        dispatch(
            {
                type: CLINIC_DETAILS_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,


            }
        )
    }
}


export const deleteClinic = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLINIC_DELETE_REQUEST
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
            `/api/clinic/delete/${id}/`,
            config
        )

        dispatch({
            type: CLINIC_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: CLINIC_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createClinic = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLINIC_CREATE_REQUEST
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
            `/api/clinics/create/`,
            {},
            config
        )

        dispatch({
            type: CLINIC_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CLINIC_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateClinic = (clinic) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLINIC_UPDATE_REQUEST
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
            `/api/clinics/update/${clinic.id}/`,
            clinic,
            config,
        )

        dispatch({
            type: CLINIC_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:CLINIC_DETAILS_SUCCESS,
        payload:data,
                })


    } catch (error) {
        dispatch({
            type: CLINIC_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}