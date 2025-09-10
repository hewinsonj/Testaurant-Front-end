import { Button, Icon } from "semantic-ui-react"
import { deleteEmployee } from "../../api/user"

const DeleteEmployeeButton = ({ user, employee, msgAlert, onDelete }) => {
  const handleDelete = () => {
    deleteEmployee(user, employee.id)
      .then(() => {
        msgAlert({
          heading: "Deleted",
          message: "Employee deleted successfully.",
          variant: "success",
        })
        onDelete()
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to delete employee: " + error.message,
          variant: "danger",
        })
      })
  }

  return (
    <Button color="red" fluid onClick={handleDelete}>
      <Icon name="trash" /> Delete Employee
    </Button>
  )
}

export default DeleteEmployeeButton