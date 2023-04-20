// Importing necessary modules
import React from "react";
import { useState } from 'react'; 

// Defining the ToDoListItem functional React component that accepts props as parameter
export default function ToDoListItem(props) {
    // Setting the state of the checkbox to the completed state of the task
    const [boxCheck, setBoxCheck] = useState(props.task.completed); 

    // Function to handle changes in the checkbox state
    function handleCheckboxChange() {
        // Inverting the state of the checkbox
        setBoxCheck(!boxCheck);
        // Updating the task item with the new completed status
        updateTaskItem({
            to_do_list_id: props.task.id,
            name: props.task.name,
            completed: !boxCheck
        }); 
    }

    // Function to update the task item with the new completed status
    function updateTaskItem(checkedItem) { 
        const options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(checkedItem)
        }

        fetch('http://localhost:3000/api/edit_to_do_item', options)
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            props.getToDoTasks(); 
        })
        .catch((error) => {
            console.log(error); 
        })

    }

    // Returning JSX code that displays the to-do list item as a list item with a checkbox and label
    return(
        <li>
            <input 
            type="checkbox" 
            checked={boxCheck}
            onChange={() => {handleCheckboxChange();}} /> {/* Setting the onChange event to call the handleCheckboxChange function when the checkbox is  clicked*/} 
            <label id={props.id}>{props.task.name}</label>
        </li>
    )
}