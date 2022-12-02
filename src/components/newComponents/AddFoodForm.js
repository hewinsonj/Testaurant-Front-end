import React from 'react'
import {Button, Form, Container } from 'semantic-ui-react'

const AddFoodForm = (props) => {
    const { food, handleChange, handleSubmit, heading } = props
    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Group widths='equal'>
                    <Form.Input 
                        required 
                        name='name'
                        id='name'
                        label='Name' 
                        placeholder='Name of Food Item'
                        defaultValue= { food.name }
                        value= { food.name }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Input 
                        required 
                        name='ingredients'
                        id='ingredients'
                        label='Ingredients' 
                        placeholder='Ingredients'
                        defaultValue= { food.ingredients}
                        value= { food.ingredients}
                        onChange= { handleChange }
                    />
                <Form.Checkbox
                        required 
                        name='con_egg'
                        id='con_egg'
                        label='con_egg' 
                        defaultChecked= { food.con_egg}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_tree_nut'
                        id='con_tree_nut'
                        label='con_tree_nut' 
                        defaultChecked= { food.con_tree_nut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_peanut'
                        id='con_peanut'
                        label='con_peanut' 
                        defaultChecked= { food.con_peanut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_shellfish'
                        id='con_shellfish'
                        label='con_shellfish' 
                        defaultChecked= { food.con_shellfish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_soy'
                        id='con_soy'
                        label='con_soy' 
                        defaultChecked= { food.con_soy}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_fish'
                        id='con_fish'
                        label='con_fish' 
                        defaultChecked= { food.con_fish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_wheat'
                        id='con_wheat'
                        label='con_wheat' 
                        defaultChecked= { food.con_wheat}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_sesame'
                        id='con_sesame'
                        label='con_sesame' 
                        defaultChecked= { food.con_sesame}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_gluten'
                        id='con_gluten'
                        label='con_gluten' 
                        defaultChecked= { food.con_gluten}
                        onChange= { handleChange }
                />
                <Button type='submit' color='orange'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AddFoodForm