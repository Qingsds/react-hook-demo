import { TodoAction, TodoState } from './index';
import Item from './Item';
import { Dispatch } from 'react';

export default function TodoList({
    todos,
    dispatch,
}: {
    todos: TodoState[];
    dispatch: Dispatch<TodoAction>;
}) {
    return (
        <ul>
            {todos.map(todo => (
                <Item key={todo.id} todo={todo} dispatch={dispatch} />
            ))}
        </ul>
    );
}
