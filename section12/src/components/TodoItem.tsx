// import { Todo } from '../types';

interface Props extends Todo{
  // extra: string; // 추가적인 새로운 props 요소를 받을 수 있음.
  onClickDelete: (id: number) => void;
}
export default function TodoItem({id, content, onClickDelete}: Props) {

  const onClickButton = () => {
    onClickDelete(id);
  }

  return <div> 
    {id} 번: { content }
    <button onClick={onClickButton}>삭제</button>
  </div>
}