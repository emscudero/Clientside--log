import React, {useState} from 'react';
import {
    Button, 
    Form,
    FormGroup,
    Label,
    Input, 
    Modal,
    ModalHeader,
    ModalBody} from 'reactstrap';


const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definitions);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.results);
    const workoutUpdate = (e, workout) => {

        e.preventDefault();
        fetch(`http://localhost:3001/log/update/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {description: editDesc, definitions: editDef, results: editRes}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Update a Workout</ModalHeader>
            <ModalBody>
            <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label htmlFor="results">Edit Results:</Label>
                        <Input name="results" value={editRes} onChange={(e) =>setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definitions">Edit Definitions:</Label>
                        <Input type="select" name="definitions" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option></option>
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update the workout!</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;
