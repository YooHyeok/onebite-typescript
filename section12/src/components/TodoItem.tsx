interface Props {
  id: number;
  content: string;
}
export default function TodoItem({id, content}: Props) {
  return <div> 
    {id} 번: { content }
    <button>삭제</button>
  </div>
}