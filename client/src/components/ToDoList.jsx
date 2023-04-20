// Importing necessary modules and components
import React from "react";
import ToDoListItem from "./ToDoListItem.jsx";

// Defining the ToDoList functional React component that accepts props as parameter
export default function ToDoList(props) {
    // Sorting the to-do tasks array by ID and name
    const organizedToDoList = props.toDoTasks.sort(function(a, b) { 
        return a.id - b.id  ||  a.name.localeCompare(b.name);
    });

    const toDoListTasks = []; // Creating an empty array to store the to-do list items

    // Looping through each to-do task and adding them as ToDoListItem components to the toDoListTasks array
    organizedToDoList.forEach((task) => {
        toDoListTasks.push(
            <ToDoListItem 
            key={task.id} // Assigning a unique key to each to-do list item
            task={task} // Passing the to-do task as a prop to the ToDoListItem component
            getToDoTasks={props.getToDoTasks} // Passing the getToDoTasks method as a prop to the ToDoListItem component
            />
        );  
    })

    // Returning JSX code that displays the to-do list items as an unordered list
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "left" }}>
                {toDoListTasks}
            </ul>
        </div>
    );
}