import React from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable = (props) => {

const deleteWorkout = (workout) => {
    
    fetch(`http://localhost:3001/log/delete/${workout.id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(() => props.fetchWorkouts())
}


const workoutMapper = () => {
    return props.workouts.map((workout, index) => {
        return(
            <tr key={index}>
                <th scope="row">{workout.id}</th>
                <td>{workout.results}</td>
                <td>{workout.description}</td>
                <td>{workout.definitions}</td>
                <td>
                <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
                <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                </td>
            </tr>
        ) 
        })
}


    return(
        <>
        <h3>Workout History</h3>
        <hr/>
        <Table striped>
            <thread>
                <tr>
                    <th>#</th>
                    <th>Results</th>
                    <th>Description</th>
                    <th>Definitions</th>
                 </tr>
            </thread>
            <tbody>
            {workoutMapper()}
            </tbody>
        </Table>
        </>
    )
    }

export default WorkoutTable;