import './EditQuote.css'
import { useState } from "react";
import type { EditQuoteProps } from '../../types/ProfileProps';

export const EditQuote = ({ setQuote, setAuthor }: EditQuoteProps) => {

    const [quoteInput, setQuoteInput] = useState("");
    const [authorInput, setAuthorInput] = useState("");

    const handleSave = () => {
        if (quoteInput.trim() !== "") {
            setQuote(quoteInput);
        }
        if (authorInput.trim() !== "") {
            setAuthor(authorInput);
        }
    };

    return(
        <div className="edit-quote">
            <div>
                <h3>Your Quote</h3>

                <div>
                    <input 
                        type="text" 
                        placeholder='Edit your quote'
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder='Add an author, maybe you!'
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                    />
                </div>

                <p>You will be able to read your quote as motivation inside of your agenda.</p>

                {/* 👇 botón local (opcional) */}
                <button onClick={handleSave}>Save Quote</button>
            </div>
        </div>
    )
}