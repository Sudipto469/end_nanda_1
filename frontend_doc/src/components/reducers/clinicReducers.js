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
    CLINIC_CREATE_REVIEW_RESET,

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

export const clinicListReducers = (state = {clinics:[]},action)=>{
    switch(action.type)
    {
        case CLINIC_LIST_REQUEST :
            return {loading: true, clinics:[]}

        case CLINIC_LIST_SUCCESS :
            return {loading: false, clinics:action.payload}

        case CLINIC_LIST_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }
}
// changd
// export const clinicDetailsReducers = (state = {clinics:{reviews:[]}},action)=>{
    // export const hospitalDetailsReducers = (state = {hospital:{hospital:[]}},action)=>{
    export const clinicDetailsReducers = (state = {clinic:{clinic:[]}},action)=>{
    switch(action.type)
    {
        case CLINIC_DETAILS_REQUEST :
            return {loading: true, ...state}
            // return {loading: true, clinics:[]}

        case CLINIC_DETAILS_SUCCESS :
            return {loading: false, clinic:action.payload}

        case CLINIC_DETAILS_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

export const clinicDeleteReducers = (state = { },action)=>{
    switch(action.type)
    {
        case CLINIC_DELETE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case CLINIC_DELETE_SUCCESS :
            return {loading: false, success:true}

        case CLINIC_DELETE_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

export const clinicCreateReducers = (state = { },action)=>{
    switch(action.type)
    {
        case CLINIC_CREATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case CLINIC_CREATE_SUCCESS :
            return {loading: false, success:true, clinic:action.payload}

        case CLINIC_CREATE_FAIL :
            return {loading: false, error:action.payload}

        case CLINIC_CREATE_RESET :
                return {}
        default:
            return state

    }

}

export const clinicUpdateReducers = (state = { clinic:{}},action)=>{
    switch(action.type)
    {
        case CLINIC_UPDATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case CLINIC_UPDATE_SUCCESS :
            return {loading: false, success:true, clinic:action.payload}

        case CLINIC_UPDATE_FAIL :
            return {loading: false, error:action.payload}

        case CLINIC_UPDATE_RESET :
                return {clinic:{}}
        default:
            return state

    }

}