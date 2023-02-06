import {createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productListReducers ,
     productDetailsReducers,
     productReviewCreateReducers,
     productDeleteReducers,
     productCreateReducers,
     productUpdateReducers } 
     from './components/reducers/productReducers';

import {hospitalListReducers,
    hospitalDetailsReducers,
    hospitalDeleteReducers,
     hospitalCreateReducers
    ,hospitalUpdateReducers} from './components/reducers/hospitalReducers'
import { labListReducers,
    labDetailsReducers,
    labDeleteReducers,
    labCreateReducers,
    labUpdateReducers } from './components/reducers/labReducers';
import { clinicListReducers,
    clinicDetailsReducers,
    clinicDeleteReducers, 
    clinicCreateReducers,
    clinicUpdateReducers} from './components/reducers/clinicReducers';
// import { clinicDetailsReducers } from './components/reducers/clinicReducers';
// import {listClinics}
import {composeWithDevTools} from 'redux-devtools-extension';
// import {userLoginReducers , userRegisterReducers , userDetailsReducers , userUpdateProfileReducers} from './reducers/userReducers'
import {userLoginReducers ,
     userRegisterReducers ,
      userDetailsReducers ,
       userUpdateProfileReducers,
    userListReducers,
    userDeleteReducer,
    userUpdateReducer} 
       from './components/reducers/userReducers'
// import { productListReducers , productDetailsReducers} from './reducers/productReducers'
// const reducer = combineReducers({
//     productList: productListReducers,
//     productDetails : productDetailsReducers,
// })

// const initialState = {}

// const middleware = [thunk]
const reducer = combineReducers({
    productList: productListReducers,
    productDetails : productDetailsReducers,
    productDelete : productDeleteReducers,
    productCreate : productCreateReducers,
    userLogin : userLoginReducers,
    userRegister : userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile : userUpdateProfileReducers,
    userList : userListReducers,
    userDelete : userDeleteReducer,
    productReviewCreate : productReviewCreateReducers,
    hospiatlList : hospitalListReducers,
    hospitalDetails : hospitalDetailsReducers,
    hospitalDelete: hospitalDeleteReducers,
    labList: labListReducers,
    labDetails:labDetailsReducers,
    labDelete:labDeleteReducers,
    clinicList: clinicListReducers,
    productUpdate: productUpdateReducers,
    userUpdate: userUpdateReducer,
    clinicDetails:clinicDetailsReducers,
    clinicDelete : clinicDeleteReducers,
    hospitalCreate: hospitalCreateReducers,
    labCreate: labCreateReducers,
    clinicCreate: clinicCreateReducers,
    hospitalUpdate:hospitalUpdateReducers,
    clinicUpdate:clinicUpdateReducers,
    labUpdate:labUpdateReducers,

})
// clinicDetailsReducers

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store