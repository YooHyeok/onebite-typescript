import { useState } from 'react';

interface Props {
  onClickAdd: (text: string) => void
}

export default function Editor(props: Props) {
  const [text, setText] = useState<string>("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClickAdd(text);
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