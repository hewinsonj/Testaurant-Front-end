import React, { useState } from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import { createFood } from '../../api/food'
import AddFoodForm from './AddFoodForm'


const CreateFood = (props) => {

    const { heading, user, msgAlert, activeItem, setOpen, triggerRefresh, setNewFood} = props
    

    const defaultFood = {
        name: '',
        ingredients: '',
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
    const [food, setFood] = useState(defaultFood)

    const handleChange = (e , target) => {
        setFood(prevFood => {
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

            const updatedFood = { [updatedName]: updatedValue }

            return { ...prevFood, ...updatedFood}
        })
    }
    const handleCreateFood = (e) => {
        e.preventDefault()

        createFood(user, food)
            // .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Created Food Item',
                    variant: 'success'
                })
            })
            .then(() => {
                setOpen(false)
            })
            // .then(() => setNewFood(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Food Item Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <AddFoodForm
            // show={activityModalShow}
            food={ food }
            handleChange={ handleChange }
            heading="Create a new Food Item!"
            handleSubmit={ handleCreateFood }
            // handleClose={() => setActivityModalShow(false)}
        />
    )
}

export default CreateFood