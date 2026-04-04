import "./EditProfileForm.css"
import { useState } from "react";
import type { EditProfileFormProps } from "../../types/ProfileProps";
import { ChangePassword } from "../ChangePasswordOverlay/ChangePassword";

export const EditProfileForm = ({ setUserName }: EditProfileFormProps) => {

    const [nameInput, setNameInput] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleSave = () => {
        if (nameInput.trim() !== "") {
            setUserName(nameInput);
        }
    };

    return(
        <>
            {showChangePassword && (
                <ChangePassword onClose={() => setShowChangePassword(false)} />
            )}

            <div className="editProfile-form-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    
                    <p>Edit Name</p>
                    <input 
                        type="text" 
                        placeholder="Edit Name" 
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)} 
                    />

                    <p>Edit Email</p>
                    <input type="email" placeholder="Edit Email" />

                    <button type="button" onClick={() => setShowChangePassword(true)}>
                        Change Password
                    </button>
                </form>

                <div className="editProfile-buttons-container">
                    <button className="cancel-button">Cancel</button>
                    <button className="save-button" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </>
    )
}