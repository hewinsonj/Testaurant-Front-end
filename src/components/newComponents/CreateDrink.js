import React, { useState } from 'react'
import { createDrink } from '../../api/drink'
import AddDrinkForm from './AddDrinkForm'


const CreateDrink = (props) => {

    const { user, msgAlert, setOpen } = props
    
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
    const handleCreateDrink = (e) => {
        e.preventDefault()

        createDrink(user, drink)
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
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Drink Item Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <AddDrinkForm
            drink={ drink }
            handleChange={ handleChange }
            heading="Create a new Drink Item!"
            handleSubmit={ handleCreateDrink }
        />
    )
}

export default CreateDrink