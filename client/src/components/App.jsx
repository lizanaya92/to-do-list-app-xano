// Importing necessary modules and components
import React from 'react'; 
import TasksHeader from './TasksHeader.jsx';
import ToDoItemForm from './ToDoItemForm.jsx';
import ToDoList from './ToDoList.jsx';

// Defining the App class React component that extends React.Component
class App extends React.Component {
    // Constructor method is used to set up the initial state of the object
    constructor(props) {
        super(props); 
        this.state = {
            toDoTasks: [], // Array to hold the to-do tasks
            textInput: '' // Text input field
        }

        // Binding 'this' keyword to the component instance for these methods
        this.getToDoTasks = this.getToDoTasks.bind(this); 
        this.addToDoTask = this.addToDoTask.bind(this); 
        this.onInputChange = this.onInputChange.bind(this); 
        this.onFormSubmit = this.onFormSubmit.bind(this); 
        this.clearForm = this.clearForm.bind(this);
    }

    // componentDidMount method is called after the component is mounted
    componentDidMount() {
        this.getToDoTasks(); // Calling getToDoTasks method to fetch to-do tasks
    }

    // getToDoTasks method is used to fetch to-do tasks from the server
    getToDoTasks = async () => {
        fetch('http://localhost:3000/api/to_do_list')
        .then((response) => {
            return response.json() // Converting JSON data into JavaScript object
        })
        .then((data) => {
            this.setState({
                toDoTasks: data.results // Updating state with fetched to-do tasks
            }) 
        })
        .catch((error) => {
            console.log(error); // Logging any errors in fetching to-do tasks
        })
    }

    // addToDoTask method is used to add a new to-do task to the server
    addToDoTask(newTask) {
        const data = {
            name: newTask // Creating data object with the name of new task
        }; 

        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data) // Converting data object into JSON string
        }; 

        fetch('http://localhost:3000/api/create_to_do_item', options)
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            this.getToDoTasks(); // Updating state with fetched to-do tasks
        })
        .catch((error) => {
            console.log(error); // Logging any errors in adding new to-do task
        })
    }

    // onInputChange method is used to update the text input field when the user types
    onInputChange(event) {
        this.setState({
            textInput: event.target.value // Updating the text input field with the user's input
        }); 
    }

    // onFormSubmit method is used to add the new to-do task when the user submits the form
    onFormSubmit() {
        this.addToDoTask(this.state.textInput); // Adding new to-do task to the server
        this.clearForm(); // Clearing the text input field
    }

    // clearForm method is used to clear the text input field
    clearForm() {
        this.setState({
            textInput: '' // Updating the text input field to an empty string
        });
    }

    // render method is used to render the JSX code onto the screen
    render() {
        return(
            <React.Fragment>
                <TasksHeader toDoTasks={this.state.toDoTasks} />
                <ToDoItemForm 
                textInput={this.state.textInput}
                onInputChange={this.onInputChange}
                onFormSubmit={this.onFormSubmit} />
                <ToDoList 
                toDoTasks={this.state.toDoTasks}
                getToDoTasks={this.getToDoTasks} />
                
            </React.Fragment>
        )
    }
}

export default App; 