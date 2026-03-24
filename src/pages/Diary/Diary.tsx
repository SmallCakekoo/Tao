import './Diary.css'
import { IconChevronUp } from '@tabler/icons-react'
import { IconChevronDown } from '@tabler/icons-react'
import { IconMail, IconCamera } from '@tabler/icons-react'

import { Date } from '../../components/Diary/Date/Date'
import { Intention } from '../../components/Diary/Intention/Intention'
import { Polaroid } from '../../components/Diary/Polaroid/Polaroid'

export const Diary = () => {
    return(
        <div className="diary">

            <aside className='side'>
            <IconChevronUp/>
            <div className='dates'>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            </div>
            <IconChevronDown/>
            </aside>

            <div className='notebook'>
                <div className='page1'>
                    <div className='date-day'>
                        <h5>Saturday</h5>
                        <p>Mar 15, 2026</p>
                    </div>
                    <Intention></Intention>
                    <textarea name="entry1" id="entry1" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                    </textarea>
                </div>
                <div className='page2'>
                    <textarea name="entry2" id="entry2" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                    </textarea>
                    <Polaroid/>
                </div>
            </div>
            <aside className='options'>
                <div className='blue-circle'>
                <IconMail size={32}/>
                </div>
                <div className='blue-circle'>
                <IconCamera size={32}/>
                </div>
            </aside>
        </div>
    )
}