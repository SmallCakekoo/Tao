import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate} from 'react-router-dom';
import './BackButton.css'

export const BackButton = () => {

    const navigate = useNavigate();


    return(
        <div className='back'>
            <IconArrowLeft/>
            <p onClick={() => navigate(-1)}>Back</p>
        </div>
    )
}