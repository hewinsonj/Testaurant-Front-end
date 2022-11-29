import React, { useState } from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import { createDrink } from '../../api/drink'


const AddDrinkForm = (props) => {
    
    const { drink, handleChange, handleSubmit, heading } = props


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
                        placeholder='Name of Drink Item'
                        defaultValue= { drink.name }
                        value= { drink.name }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Input 
                        required 
                        name='ingredients'
                        id='ingredients'
                        label='Ingredients' 
                        placeholder='Ingredients'
                        defaultValue= { drink.ingredients}
                        value= { drink.ingredients}
                        onChange= { handleChange }
                    />
                <Form.Input 
                        required 
                        name='prep_instructs'
                        id='prep_instructs'
                        label='Prep Instructions' 
                        placeholder='Prep Instructions'
                        defaultValue= { drink.prep_instructs}
                        value= { drink.prep_instructs}
                        onChange= { handleChange }
                    />
                <Form.Input 
                    required 
                    name='garnishes'
                    id='garnishes'
                    label='Garnishes' 
                    placeholder='Garnishes'
                    defaultValue= { drink.garnishes}
                    value= { drink.garnishes}
                    onChange= { handleChange }
                />
                <Form.Input 
                        required 
                        name='glassware'
                        id='glassware'
                        label='Glassware' 
                        placeholder='Glassware'
                        defaultValue= { drink.glassware}
                        value= { drink.glassware}
                        onChange= { handleChange }
                    />
                <Form.Checkbox
                        required 
                        name='con_egg'
                        id='con_egg'
                        label='con_egg' 
                        defaultChecked= { drink.con_egg}
                        // value= { drink.con_egg}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_tree_nut'
                        id='con_tree_nut'
                        label='con_tree_nut' 
                        defaultChecked= { drink.con_tree_nut}
                        // value= { drink.con_tree_nut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_peanut'
                        id='con_peanut'
                        label='con_peanut' 
                        defaultChecked= { drink.con_peanut}
                        // value= { drink.con_peanut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_shellfish'
                        id='con_shellfish'
                        label='con_shellfish' 
                        defaultChecked= { drink.con_shellfish}
                        // value= { drink.con_shellfish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_soy'
                        id='con_soy'
                        label='con_soy' 
                        defaultChecked= { drink.con_soy}
                        // value= { drink.con_soy}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_fish'
                        id='con_fish'
                        label='con_fish' 
                        defaultChecked= { drink.con_fish}
                        // value= { drink.con_fish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_wheat'
                        id='con_wheat'
                        label='con_wheat' 
                        defaultChecked= { drink.con_wheat}
                        // value= { drink.con_wheat}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_sesame'
                        id='con_sesame'
                        label='con_sesame' 
                        defaultChecked= { drink.con_sesame}
                        // value= { drink.con_sesame}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_gluten'
                        id='con_gluten'
                        label='con_gluten' 
                        defaultChecked= { drink.con_gluten}
                        // value= { drink.con_gluten}
                        onChange= { handleChange }
                />
                <Form.Group inline>
                
                    
                </Form.Group>
                <Button type='submit' color='green'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AddDrinkForm