import './Diary.css'
import { IconChevronUp } from '@tabler/icons-react'
import { IconChevronDown } from '@tabler/icons-react'

import { Date } from '../../components/Diary/Date/Date'
import { Intention } from '../../components/Diary/Intention/Intention'
import { Polaroid } from '../../components/Diary/Polaroid/Polaroid'

import { useState, useEffect } from 'react';
import { BigButtons, SmallButtons } from '../../components/Diary/DiaryButtons/DiaryButtons'


export const Diary = () => {

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const width = useWindowWidth();
const isMobile = width <= 768; 

    return(
        <div className="diary">

            <aside className='side'>
            <IconChevronUp className='arrow up'/>
            <div className='dates'>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            <Date></Date>
            </div>
            <IconChevronDown className='arrow down'/>
            </aside>

                <div className="notebook-wrapper">

                <div className='notebook'>
                    <div className='page1'>
                        <div className='date-day'>
                            <h5>Saturday</h5>
                            <p>Mar 15, 2026</p>
                        </div>
                        <Intention></Intention>
                        {isMobile && <SmallButtons/>}
                        <textarea name="entry1" id="entry1" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                        </textarea>
                    </div>
                    <div className='page2'>
                        <textarea name="entry2" id="entry2" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                        </textarea>
                        <Polaroid/>
                    </div>
                </div>
                </div>
            <aside className='options'>
                {!isMobile && <BigButtons/>}
            </aside>
        </div>
    )
}