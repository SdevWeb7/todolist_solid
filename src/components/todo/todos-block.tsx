
export default async function TodosBlock({currentTitle}: {currentTitle: string | null}) {




    return <div className={'flex-1'}>

        {currentTitle && <h2 className={'text-center text-3xl'}>Todolist : {currentTitle}</h2>}

        {!currentTitle && <p className={'text-center text-xl my-16'}>Veuillez sélectionner une todolist</p>}

    </div>;
}
