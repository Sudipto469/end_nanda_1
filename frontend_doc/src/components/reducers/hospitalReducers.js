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
    HOSPITAL_CREATE_REVIEW_RESET,

    HOSPITAL_DELETE_REQUEST,
    HOSPITAL_DELETE_SUCCESS,
    HOSPITAL_DELETE_FAIL,

HOSPITAL_CREATE_REQUEST,
HOSPITAL_CREATE_SUCCESS,
HOSPITAL_CREATE_FAIL,
HOSPITAL_CREATE_RESET,

HOSPITAL_UPDATE_REQUEST ,
HOSPITAL_UPDATE_SUCCESS ,
HOSPITAL_UPDATE_FAIL ,
HOSPITAL_UPDATE_RESET ,

} from '../constants/hospitalConstant'

export const hospitalListReducers = (state = {hospitals:[]},action)=>{
    switch(action.type)
    {
        case HOSPITAL_LIST_REQUEST :
            return {loading: true, hospitals:[]}

        case HOSPITAL_LIST_SUCCESS :
            return {loading: false, hospitals:action.payload}

        case HOSPITAL_LIST_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }
}

export const hospitalDetailsReducers = (state = {hospital:{hospital:[]}},action)=>{
    switch(action.type)
    {
        case HOSPITAL_DETAILS_REQUEST :
            // return {loading: true, ...state}
            return {loading: true, hospitals:[]}

        case HOSPITAL_DETAILS_SUCCESS :
            return {loading: false, hospital:action.payload}

        case HOSPITAL_DETAILS_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

// export const hospitalReviewCreateReducers = (state = { },action)=>{
//     switch(action.type)
//     {
//         case HOSPITAL_CREATE_REVIEW_REQUEST :
//             return {loading: true}

//         case HOSPITAL_CREATE_REVIEW_SUCCESS :
//             return {loading: false, success: true}

//         case HOSPITAL_CREATE_REVIEW_RESET :
//             return { }

//         default:
//             return state

//     }

// }

export const hospitalDeleteReducers = (state = { },action)=>{
    switch(action.type)
    {
        case HOSPITAL_DELETE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case HOSPITAL_DELETE_SUCCESS :
            return {loading: false, success:true}

        case HOSPITAL_DELETE_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state

    }

}

export const hospitalCreateReducers = (state = { },action)=>{
    switch(action.type)
    {
        case HOSPITAL_CREATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case HOSPITAL_CREATE_SUCCESS :
            return {loading: false, success:true, hospital:action.payload}

        case HOSPITAL_CREATE_FAIL :
            return {loading: false, error:action.payload}

        case HOSPITAL_CREATE_RESET :
                return {}
        default:
            return state

    }

}


export const hospitalUpdateReducers = (state = { hospital:{}},action)=>{
    switch(action.type)
    {
        case HOSPITAL_UPDATE_REQUEST :
            // return {loading: true, ...state}
            return {loading: true}

        case HOSPITAL_UPDATE_SUCCESS :
            return {loading: false, success:true, hospital:action.payload}

        case HOSPITAL_UPDATE_FAIL :
            return {loading: false, error:action.payload}

        case HOSPITAL_UPDATE_RESET :
                return {hospital:{}}
        default:
            return state

    }

}