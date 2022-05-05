import { Dispatch, useState } from "react";
import { TodoAction } from "./index";
import { Button } from "antd";

export default function SearchPanel({ dispatch }: { dispatch: Dispatch<TodoAction> }) {
    const [text, setText] = useState<string>();

    const handleClick = () => {
        const state = {
            id: Date.now(),
            text: text || '',
            createTime: Date.now(),
            done: false
        }
        dispatch({ type: "ADD", payload: state })
        setText('')
    }

    return (
        <div>
            <input
                type={'text'}
                value={text || ''}
                placeholder={'请输入要添加的内容'}
                onChange={e => setText(e.target.value)}
                required={true}
            />
            <Button onClick={handleClick}>
                add
            </Button>
        </div>
    )
}