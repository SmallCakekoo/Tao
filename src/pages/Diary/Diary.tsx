import './Diary.css'
import { IconChevronUp } from '@tabler/icons-react'
import { IconChevronDown } from '@tabler/icons-react'

import { Date } from '../../components/Diary/Date/Date'
import { Intention } from '../../components/Diary/Intention/Intention'
import { Polaroid } from '../../components/Diary/Polaroid/Polaroid'

import { useState, useEffect } from 'react';
import { DiaryButtons } from '../../components/Diary/DiaryButtons/DiaryButtons'
import { Camera } from '../../components/Diary/Camera/Camera'
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar'


export const Diary = () => {

const [showCamera, setShowCamera] = useState<boolean>(false);
const [savedImage, setSavedImage] = useState<string | null>(null);
// Temporary, to check if image changes in local storage
const [capturedImage, setCapturedImage] = useState<string | null>(null);

// Check if there is an image inside local storage (Temporary)
useEffect(() => {
  const image = localStorage.getItem("capturedPhoto");
  if (image) {
    setSavedImage(image);
  }
}, []);

const setCamera = (): void => {
    setShowCamera(true)
}

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
        <>
        <HomeNavbar></HomeNavbar>

        <div className="diary">
            {showCamera && (
            <Camera onClose={() => setShowCamera(false)} onCapture={(img) => setCapturedImage(img)}/>
            )}
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
                        {isMobile && <DiaryButtons setCamera={setCamera}/>}
                        <textarea name="entry1" id="entry1" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                        </textarea>
                    </div>
                    <div className='page2'>
                        <textarea name="entry2" id="entry2" className='text-entry' placeholder='Feel free to journal your current thoughts or follow the prompt based on your needs'>
                        </textarea>
                          {capturedImage && (
                                <Polaroid src={capturedImage} />
                            )}
                    </div>
                </div>
                </div>
            <aside className='options'>
                {!isMobile && <DiaryButtons setCamera={setCamera}/>}
            </aside>

        </div>
        </>
    )
}