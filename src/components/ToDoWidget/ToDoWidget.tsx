import { IconPlusFilled } from "@tabler/icons-react"
import './ToDoWidget.css'

export const ToDoWidget = () => {
    return (
        <div className="todo-widget">
            <h5 className="create-new">Create new diary entry</h5>
            <div className="add-btn"><IconPlusFilled/></div>
        </div>
    )
}