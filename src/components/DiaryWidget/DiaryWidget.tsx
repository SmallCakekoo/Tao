import { IconPlusFilled } from "@tabler/icons-react"
import './DiaryWidget.css'

export const DiaryWidget = () => {
    return (
        <div className="diary-widget">
            <h5 className="create-new">Create new diary entry</h5>
            <div className="add-btn"><IconPlusFilled/></div>
        </div>
    )
}