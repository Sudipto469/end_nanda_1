import {createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productListReducers ,
     productDetailsReducers,
     productReviewCreateReducers } 
     from './components/reducers/productReducers';
import {composeWithDevTools} from 'redux-devtools-extension';
// import {userLoginReducers , userRegisterReducers , userDetailsReducers , userUpdateProfileReducers} from './reducers/userReducers'
import {userLoginReducers ,
     userRegisterReducers ,
      userDetailsReducers ,
       userUpdateProfileReducers} 
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
    userLogin : userLoginReducers,
    userRegister : userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile : userUpdateProfileReducers,
    productReviewCreate : productReviewCreateReducers,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store