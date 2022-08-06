import {connect} from 'react-redux'
import {getComments} from '../../redux/action/commentAction'
import Comments from "./Comments";

const mapStoreToProps = state => ({
    comments: state.comment.allComments,
})

const mapDispatchToProps = {
    getComments,
}

// productId
export default connect(mapStoreToProps, mapDispatchToProps)(Comments)
