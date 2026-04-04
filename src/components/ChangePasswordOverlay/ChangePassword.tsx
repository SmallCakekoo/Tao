import { createPortal } from "react-dom";
import "./ChangePassword.css";

type Props = {
    onClose: () => void;
};

export const ChangePassword = ({ onClose }: Props) => {
    return createPortal(
        <div className="change-password-overlay" onClick={onClose}>
            <div className="change-password-modal" onClick={(e) => e.stopPropagation()}>
                <p>Current Password</p>
                <input type="password" placeholder="Current Password" />

                <p>New Password</p>
                <p className="password-requeriments">Must have at least 6 characters</p>
                <input type="password" placeholder="New Password" />
                <div className="change-password-buttons">
                    <button className="password-update-button" onClick={onClose}>Update</button>
                    <button className="password-cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>,
        document.body
    );
};