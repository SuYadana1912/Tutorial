"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import TodoListPage from "./todo-list/todo-list";



export default function Home() {
  return (
    <div>
      {/* <Typography component="h1">Welcome to Next.js with MUI!</Typography>
      <Button variant="contained" color="primary">Click Me</Button>
      <Button variant="outlined" color="secondary">Outlined Button</Button>
      <Button variant="text" color="primary">Text Button</Button>
      <MUIBox/>
      <MUIContainer/>
      <MUIGrid/>
      <MUIStack/>
      <MUISx/> */}
      <ContactForm/>
      {/* <TodoListPage/> */}
    </div>
  );
}
   