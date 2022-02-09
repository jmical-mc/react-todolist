import { useState, useReducer, useEffect } from 'react';
import ToDoItem from './../components/ToDoItem';
import NewToDoForm from './../components/NewToDoForm';
import styled from 'styled-components';
import * as ToDoItemApi from './../helpers/toDoItemApi';
import * as _ from 'ramda';

const Header = styled.h1`
    color: #fff;
`

const DestroyButton = styled.button`
    border-radius: 10px;
    background: red;
    padding: 5px;
    color: #fff;
    margin-bottom: 10px;
`

const initialState = {
    todos: {},
    todoIds: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.todo.id]: action.todo
                },
                todoIds: [...state.todoIds, action.todo.id]
            }     
        default:
            return state;
    }
}

export default function ToDoList() {
const [draft, setDraft] = useState('');
const [store, dispatch] = useReducer(reducer, initialState);

useEffect(async () => {
    const todos = await ToDoItemApi.getAll();

    todos.map(todo => {
        dispatch({type: 'ADD_TODO', todo})
    })
}, [])

const addToDo = () => {
    dispatch({type: 'ADD_TODO', todo: {id: 1, content: 'gfdgdf', done: false}})
    setDraft('');
}

    return (
    <div>
                 <Header>My Stuff</Header>
                 {store.todoIds.map(id => 
                 <ToDoItem 
                 id={id}
                  key={id}
                   text={store.todos[id].content} 
                   done={store.todos[id].done}
                  />
                 )}
                 <NewToDoForm 
                 onSubmit={addToDo}
                  onChange={(event) => setDraft(event.target.value)}
                   draft={draft} />
             </div>
)
}

// class ToDoList extends Component {
//     constructor(props){
//         super(props)
//         console.log('Hello from constructor')
//     }
    
//     componentDidMount = async () => {      
//         const tasks = await ToDoItemApi.getAll();
//         this.setState({tasks});
//     }

//     componentDidUpdate = () => {
//         console.log('component (ToDoList) updated')
//     }

//     static defaultProps = {
//         tasks: [],
//         title: 'My stuff'
//     }

//     state = {
//         tasks: this.props.tasks,
//         draft: ''
//     }

//     updateDraft = (event) => {
//         this.setState({ draft: event.target.value });
//     }

//     addToDo = async () => {
//         const { tasks, draft } = this.state;
//         const task = await ToDoItemApi.create({content: draft});
        
//         this.setState({ tasks: _.append(task, tasks), draft: '' });
//     }

//     removeAll = () => {
//         this.setState({tasks: []});
//     }

//     render() {
//         const { tasks, draft } = this.state;
//         const { title } = this.props;

//         return (
//         <div>
//             <Header>{title}</Header>
//             <DestroyButton onClick={this.removeAll}>Remove All</DestroyButton>
//             {tasks.map(task => <ToDoItem id={task.id} key={task.key} text={task.content} done={task.done} />)}
//             <NewToDoForm onSubmit={this.addToDo} onChange={this.updateDraft} draft={draft} />
//         </div>
//         )
//     }
// }

//export default ToDoList;