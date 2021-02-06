import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';


const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definitions, setDefinitions]= useState('');
    const [results, setResults] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/log/create', {
            method: 'POST',
            body: JSON.stringify({log: {description: description, definitions: definitions, results: results}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => res.json())
        .then((logData) => {
            console.log(logData);
            setDescription('');
            setDefinitions('');
            setResults('');
            props.fetchWorkouts();
        })
    }


return(
   <>
   <h3>Log a Workout</h3>
   <Form onSubmit={handleSubmit} >
       <FormGroup>
           <Label htmlFor="description"/>
           <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
       </FormGroup>
       <FormGroup>
           <Label htmlFor="definitions"/>
           <Input type="select" name="definitions" value={definitions} onChange={(e) => setDefinitions(e.target.value)}>
               <option value="Time">Time</option>
               <option value="Weight">Weight</option>
               <option value="Distance">Distance</option>
           </Input>
       </FormGroup>
       <FormGroup>
           <Label htmlFor="results"/>
           <Input name="results" value={results} onChange={(e) => setResults(e.target.value)}/>
       </FormGroup>
       <Button type="submit">Click to Submit</Button>
   </Form>
   </>
)
}

export default WorkoutCreate;
