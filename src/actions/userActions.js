import { SET_USER } from './types';
import { auth, provider } from '../firebase'

export const signIn = () => (dispatch) => {
    auth.signInWithPopup(provider)
        .then((result) => dispatch({
            type: SET_USER,
            user: result.user
        }))
        .catch((error) => alert(error.message));
}