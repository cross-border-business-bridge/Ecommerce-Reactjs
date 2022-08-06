import {combineReducers} from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import department from './departmentReducer'
import product from './productReducer'
import comment from './commentReducer'
import variant from './variantsReducer'
import cart from './cartReducer'
import checkout from './checkoutReducer'
import filter from './filterReducer'

export default combineReducers({
    token,
    signin,
    department,
    product,
    comment,
    variant,
    cart,
    checkout,
    filter
})
