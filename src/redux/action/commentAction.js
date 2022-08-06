/**
 * user comment
 */
import serverCall from '../../modules/serverCall'
import util from "../../util";

export const getComments = productId => dispatch => {
    if(!productId) {
        dispatch({
            type: GET_COMMMENTS_FAIL,
            payload: {error: 'No parameter for productId'}
        })

        return
    }

    dispatch({
        type: GET_COMMMENTS_BEGIN,
    })

    return serverCall({
        method: 'GET',
        // url: `/comments?${util.joinParams({productId})}`
        url: `/comments/${productId}`
    })
        .then(res => {
            dispatch({
                type: GET_COMMMENTS_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_COMMMENTS_FAIL,
                payload: {error}
            })
            return error
        })
}

export const postComment = (
    {
        user,
        productId,
        comment
    }
) => {
    return dispatch => {
        dispatch({
            type: POST_COMMMENT_BEGIN,
        })

        // TODO
        return serverCall({
            method: 'POST',
            url: `/comments`,
            data: {
                user,
                productId,
                comment
            }
        })
            .then(res => {
                dispatch({
                    type: POST_COMMMENT_SUCCESS,
                    payload: res
                })
                return res
            })
            .catch(error => {
                dispatch({
                    type: POST_COMMMENT_FAIL,
                    payload: {error}
                })
                return error
            })
    }
}

export const GET_COMMMENTS_BEGIN = 'GET_COMMMENTS_BEGIN'
export const GET_COMMMENTS_SUCCESS = 'GET_COMMMENTS_SUCCESS'
export const GET_COMMMENTS_FAIL = 'GET_COMMMENTS_FAIL'

export const POST_COMMMENT_BEGIN = 'POST_COMMMENT_BEGIN'
export const POST_COMMMENT_SUCCESS = 'POST_COMMMENT_SUCCESS'
export const POST_COMMMENT_FAIL = 'POST_COMMMENT_FAIL'
