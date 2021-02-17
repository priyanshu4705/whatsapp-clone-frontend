import { SET_USER } from '../actions/types'

const initialState = {
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default userReducer;