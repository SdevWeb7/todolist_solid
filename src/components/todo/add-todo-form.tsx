import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";



export default function AddTodoForm() {

    return <form className={'flex max-w-sm mx-auto'}>

        <Input
            placeholder={'Ajouter une tâche'}
            type="text"/>

        <Button type={"submit"}>Ajouter</Button>
    </form>
}
