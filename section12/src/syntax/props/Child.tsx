import { ReactElement } from 'react';

interface Props {
  onClick: (text: string) => void;
  children: ReactElement
}

export default function Child({ onClick, children }: Props) {
  const onClickBtn = () => {
    onClick("Child");
  }
  return (
    <>
      <button onClick={onClickBtn}>Parent onClick 호출</button>
      <div> {children} </div>
    </>
  )
}