import Child from './Child';

export default function Parent() {
  const onClick = (text: string) => {
    console.log("Parent컴포넌트 onClick 호출 - text: ", text)
  }

  return (
    <div>
      <Child onClick={onClick}>
        {/* Children */}
        <div>Children</div>
      </Child>

    </div>
  );
}
