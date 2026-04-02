import type { IntentionBtnProps } from "../../../types/IntentionBtnProps"
import './IntentionBtn.css'

export const IntentionButton = ({content, prompt, selectPrompt, isSelected}: IntentionBtnProps) => {

    return(
        <button className={`int-button ${isSelected ? 'selected' : ''}`} 
        onClick={() => selectPrompt(prompt)}>{content}</button>
    )
}