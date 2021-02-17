import { SET_USER, REMOVE_USER } from './types';
import { auth, provider } from '../firebase'

export const signIn = () => (dispatch) => {
    auth.signInWithPopup(provider)
        .then((result) => dispatch({
            type: SET_USER,
            user: result.user
        }))
        .catch((error) => alert(error.message));
}

export const logOut = () => (dispatch) => {
    auth.signOut()
        .then(result => dispatch({
            type: REMOVE_USER,
            user: null
        })).catch((error) => alert(error.message));
}