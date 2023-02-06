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
    LAB_CREATE_REVIEW_RESET,

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


export const labListReducers = (state = {labs:[]},action)=>{
    switch(action.type)
    {
        case LAB_LIST_REQUEST :
            return {loading: true, labs:[]}

        case LAB_LIST_SUCCESS :
            return {loading: false, labs:action.payload}

        case LAB_LIST_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }
}

export const labDetailsReducers = (state = {lab:{reviews:[]}},action)=>{
    switch(action.type)
    {
        case LAB_DETAILS_REQUEST :
            // return {loading: true, ...state}
            return {loading: true, labs:[]}

        case LAB_DETAILS_SUCCESS :
            return {loading: false, lab:action.payload}

        case LAB_DETAILS_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

export const labDeleteReducers = (state = { },action)=>{
    switch(action.type)
    {
        case LAB_DELETE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case LAB_DELETE_SUCCESS :
            return {loading: false, success:true}

        case LAB_DELETE_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

export const labCreateReducers = (state = { },action)=>{
    switch(action.type)
    {
        case LAB_CREATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case LAB_CREATE_SUCCESS :
            return {loading: false, success:true, lab:action.payload}

        case LAB_CREATE_FAIL :
            return {loading: false, error:action.payload}

        case LAB_CREATE_RESET :
                return {}
        default:
            return state

    }

}

export const labUpdateReducers = (state = { lab:{}},action)=>{
    switch(action.type)
    {
        case LAB_UPDATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case LAB_UPDATE_SUCCESS :
            return {loading: false, success:true, lab:action.payload}

        case LAB_UPDATE_FAIL :
            return {loading: false, error:action.payload}

        case LAB_UPDATE_RESET :
                return {lab:{}}
        default:
            return state

    }

}