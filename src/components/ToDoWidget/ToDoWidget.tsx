import { IconPlusFilled } from "@tabler/icons-react"
import './ToDoWidget.css'

export const ToDoWidget = () => {
    return (
        <div className="todo-widget">
            <h5 className="create-new">You have no tasks yet</h5>
            <div className="add-btn"><IconPlusFilled/></div>
        </div>
    )
}