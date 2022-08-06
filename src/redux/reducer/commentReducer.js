import {
  // fetch all comments
  GET_COMMMENTS_BEGIN,
  GET_COMMMENTS_SUCCESS,
  GET_COMMMENTS_FAIL,

  // post comment
  POST_COMMMENT_BEGIN,
  POST_COMMMENT_SUCCESS,
  POST_COMMMENT_FAIL,

} from '../action/commentAction'

const initialState = {
  allComments: [],
  comment: null,
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
      // fetch all comments
    case GET_COMMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_COMMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allComments: action.payload.data.comments
      }
    case GET_COMMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }

      // post comment
    case POST_COMMMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case POST_COMMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allComments: [...initialState.allComments, action.payload.data.comment]
      }
    case POST_COMMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }

    default:
      return state
  }
}
