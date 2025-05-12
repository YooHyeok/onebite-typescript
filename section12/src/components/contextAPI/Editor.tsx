import React, { useState } from 'react';
import { TodoDispatchContext } from '../../app/contextAPI/App';

interface Props {
}

export default function Editor(props: Props) {
  const dispatch = React.useContext(TodoDispatchContext)
  const [text, setText] = useState<string>("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch?.onClickAdd(text);
    setText("") // 입력란 초기화
  }
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={onChangeInput}
      />
      <button onClick={onClickBtn}>추가</button>
    </>
  )
}