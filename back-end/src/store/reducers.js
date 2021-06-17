import { combineReducers } from 'redux'

import auth from "../modules/auth/store/reducer"
import categories from "../modules/categories/store/reducer"
import products from "../modules/products/store/reducer"

export default combineReducers({ auth, categories, products })
