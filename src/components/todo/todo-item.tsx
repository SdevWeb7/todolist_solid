import ToggleTodoCheckbox from "@/components/todo/toggle-todo-checkbox";
import DeleteTodoBtn from "@/components/todo/delete-todo-btn";


type TodoListProps = {
    todo: {
        id: string,
        content: string,
        completed: boolean
    }
}
export default function TodoItem({todo}: TodoListProps) {

    return <li
        className={'w-full flex justify-between items-center gap-2 rounded border p-2'}
        key={todo.id}>

        <ToggleTodoCheckbox todoId={todo.id} checked={todo.completed}/>

        <p className={'flex-1 text-center text-xl'}>{todo.content}</p>

        <DeleteTodoBtn todoId={todo.id}/>
    </li>

}
