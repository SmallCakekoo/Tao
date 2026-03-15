import { Day } from "./Day/Day"
import './Weekly.css'

export const Weekly = () => {
    return(
        <>
        <p className="overview">This week's overview</p>

        <div className="week">
        <div className="days">
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
            <Day></Day>
        </div>
        </div>
        </>
    )
}