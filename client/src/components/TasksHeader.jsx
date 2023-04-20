// Importing necessary modules
import React from "react"; 

// Defining the TasksHeader functional React component that accepts props as parameter
export default function TasksHeader(props) {
    // Returning JSX code that displays the number of tasks and the title of the to-do list
    return(
        <div style={ {textAlign: 'center'} }>
            <h3>{props.toDoTasks.length} Tasks</h3> 
            <h1>To Do List</h1> 
        </div>
    )
}