import { TodoAction, TodoState } from "./index";
import { Button, Typography } from "antd";
import { Dispatch } from "react";

export default function Item({
    todo,
    dispatch,
}: {
    todo: TodoState
    dispatch: Dispatch<TodoAction>
}) {
    const handleDoneClick = () => {
        dispatch({ type: 'DONE', payload: { id: todo.id, done: !todo.done } })
    }
    const handleDeleteClick = () => {
        dispatch({ type: 'DELETE', payload: { id: todo.id } })
    }
    return (
        <li onClick={handleDoneClick} style={{ cursor: 'pointer' }}>
            <Typography.Paragraph delete={todo.done}>
                <span>{todo.text} ===</span>
                <span>{new Date(todo.createTime).toString()}</span>
            </Typography.Paragraph>
            <Button type={'primary'} onClick={handleDeleteClick}>
                delete
            </Button>
        </li>
    )
}