import React, { useState } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { updateDrink } from '../../api/drink'
import AddDrinkForm from './AddDrinkForm'

const DrinkUpdateModal = (props) => {

    const {user, msgAlert, triggerRefresh} = props
    
    const [drink, setDrink] = useState(props.drink)
    const [open, setOpen] = useState(false)

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

    const handleUpdateDrink = (e) => {
        e.preventDefault()

        //close form if no change was made
        if (drink == props.drink) {
            setOpen(false)
        } else {
        updateDrink(user, drink, props.drink.id)
            .then(() => {
                setOpen(false)
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Drink',
                    variant: 'success'
                })
            })
            .catch((error) => {
                setOpen(false)
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Drink Failure' + error,
                    variant: 'danger'
                })
            })
        }
    }

    return (
        <Modal
            onClose={() => {
                setOpen(false)
                setDrink(props.drink)
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button color='black' onClick={()=>setDrink(props.drink)}>Update Drink</Button>
            }
        >
            <Modal.Content>
                <AddDrinkForm 
                    user={user} 
                    msgAlert={msgAlert}  
                    drink={drink}
                    handleChange={handleChange}
                    handleSubmit={handleUpdateDrink}
                    heading='Update Your Drink'
                />
            </Modal.Content>
      </Modal>
    )
}

export default DrinkUpdateModal

