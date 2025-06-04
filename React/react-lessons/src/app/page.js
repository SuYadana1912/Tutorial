import Example23 from "../components/Example23"



export default function Home(){
  const todos = [
  {id: 1, text: "Task 1"},
  {id: 2, text: "Task 2"},
  ];

  return (
    <div>
       <Example23 todos={todos} />
    </div>

    );
}