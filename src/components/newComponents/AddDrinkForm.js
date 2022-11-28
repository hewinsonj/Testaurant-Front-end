import React, { useState } from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import { createDrink } from '../../api/drink'


const AddDrinkForm = (props) => {

    const { heading, user, msgAlert, activeItem, setOpen, triggerRefresh, setNewDrink} = props
    

    const defaultDrink = {
        name: '',
        ingredients: '',
        prep_instructs: '',
        garnishes: '',
        glassware: '',
        con_egg: false,
        con_tree_nut: false,
        con_peanut: false,
        con_shellfish: false,
        con_soy: false,
        con_fish: false,
        con_wheat: false,
        con_sesame: false,
        con_gluten: false,
        
    }
    const [drink, setDrink] = useState(defaultDrink)

    const handleChange = (e , target) => {
        setDrink(prevDrink => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }

            //handle the checkbox
            if (updatedName === 'con_peanut' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_peanut' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_egg' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_egg' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_tree_nut' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_tree_nut' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_shellfish' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_shellfish' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_soy' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_soy' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_fish' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_fish' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_wheat' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_wheat' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_sesame' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_sesame' && !target.checked) {
                updatedValue = false
            }
            if (updatedName === 'con_gluten' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'con_gluten' && !target.checked) {
                updatedValue = false
            }

            const updatedDrink = { [updatedName]: updatedValue }

            return { ...prevDrink, ...updatedDrink}
        })
    }
    console.log('this is the drink', drink)
    const handleCreateDrink = (e) => {
        e.preventDefault()

        createDrink(user, drink)
            // .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Drink Item',
                    variant: 'success'
                })
            })
            .then(() => {
                setOpen(false)
            })
            // .then(() => setNewDrink(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Drink Item Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleCreateDrink }>
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
                        defaultValue= { drink.con_egg}
                        value= { drink.con_egg}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_tree_nut'
                        id='con_tree_nut'
                        label='con_tree_nut' 
                        defaultValue= { drink.con_tree_nut}
                        value= { drink.con_tree_nut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_peanut'
                        id='con_peanut'
                        label='con_peanut' 
                        defaultValue= { drink.con_peanut}
                        value= { drink.con_peanut}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_shellfish'
                        id='con_shellfish'
                        label='con_shellfish' 
                        defaultValue= { drink.con_shellfish}
                        value= { drink.con_shellfish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_soy'
                        id='con_soy'
                        label='con_soy' 
                        defaultValue= { drink.con_soy}
                        value= { drink.con_soy}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_fish'
                        id='con_fish'
                        label='con_fish' 
                        defaultValue= { drink.con_fish}
                        value= { drink.con_fish}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_wheat'
                        id='con_wheat'
                        label='con_wheat' 
                        defaultValue= { drink.con_wheat}
                        value= { drink.con_wheat}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_sesame'
                        id='con_sesame'
                        label='con_sesame' 
                        defaultValue= { drink.con_sesame}
                        value= { drink.con_sesame}
                        onChange= { handleChange }
                />
                <Form.Checkbox
                        required 
                        name='con_gluten'
                        id='con_gluten'
                        label='con_gluten' 
                        defaultValue= { drink.con_gluten}
                        value= { drink.con_gluten}
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