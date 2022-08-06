
import React from "react";
import styles from './stylesheets/comments.module.sass'
import ListGroup from 'react-bootstrap/ListGroup';
import Empty from "../../components/common/Empty";

const Comments = (props) => {
    const {
        comments,
        productId,
        getComments
    } = props

    // request comments per product
    React.useEffect(() => {
        getComments(productId)
    }, [])

    if(comments?.length === 0) {
        return (
            <Empty
                msg={'No comments yet'}
            />
        )
    }

    const items = comments.map((comment, index) => {
        return (
            <ListGroup.Item key={index}>{comment.comment}</ListGroup.Item>
        )
    })

    return (
        <ListGroup className={'comments'}>
            {items}
        </ListGroup>
    )
}

export default Comments
