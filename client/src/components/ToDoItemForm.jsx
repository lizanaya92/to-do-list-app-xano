// Importing necessary modules
import React from "react";

// Defining the ToDoItemForm functional React component that accepts props as parameter
export default function ToDoItemForm(props) {
    // Returning JSX code that displays a form to add a new to-do task
    return(
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={props.onFormSubmit}>
                <input 
                type="text"
                value={props.textInput} // Setting the value of the input field to the current textInput state
                onChange={(e) => props.onInputChange(e) } /> { /* Setting the onChange event to call the onInputChange function when the input value changes*/ }
                {' '}
                <button>Add Task</button>
            </form>
        </div>
    )
}
