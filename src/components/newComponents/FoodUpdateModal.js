import React, { useState } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { updateFood } from '../../api/food'
import AddFoodForm from './AddFoodForm'

const FoodUpdateModal = (props) => {

    const {user, msgAlert, triggerRefresh} = props
    
    const [food, setFood] = useState(props.food)
    const [open, setOpen] = useState(false)

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

    const handleUpdateFood = (e) => {
        e.preventDefault()

        //close form if no change was made
        if (food == props.food) {
            setOpen(false)
        } else {
        updateFood(user, food, props.food.id)
            .then(() => {
                setOpen(false)
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Food',
                    variant: 'success'
                })
            })
            .catch((error) => {
                setOpen(false)
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Food Failure' + error,
                    variant: 'danger'
                })
            })
        }
    }

    return (
        <Modal
            onClose={() => {
                setOpen(false)
                setFood(props.food)
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button color='black' onClick={()=>setFood(props.food)}>Update Food</Button>
            }
        >
            <Modal.Content>
                <AddFoodForm 
                    user={user} 
                    msgAlert={msgAlert}  
                    food={food}
                    handleChange={handleChange}
                    handleSubmit={handleUpdateFood}
                    heading='Update Your Food'
                />
            </Modal.Content>
      </Modal>
    )
}

export default FoodUpdateModal

