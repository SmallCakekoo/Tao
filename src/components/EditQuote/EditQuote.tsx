import './EditQuote.css';
import { useState } from 'react';
import type { EditQuoteProps } from '../../types/ProfileProps';

export const EditQuote = ({
  setQuote,
  setAuthor,
  onSave,
}: EditQuoteProps & { onSave: (message: string, type: 'success' | 'error') => void }) => {
  const [quoteInput, setQuoteInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  const handleSave = () => {
    if (quoteInput.trim() === '' && authorInput.trim() === '') {
      onSave('Please fill in at least one field.', 'error');
      return;
    }
    if (quoteInput.trim() !== '') setQuote(quoteInput);
    if (authorInput.trim() !== '') setAuthor(authorInput);
    onSave('Quote saved!', 'success');
  };

  return (
    <div className="edit-quote">
      <div>
        <h3>Your Quote</h3>

        <div>
          <input
            type="text"
            placeholder="Edit your quote"
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
          />

          <input
            type="text"
            placeholder="Add an author, maybe you!"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
          />
        </div>

        <p>You will be able to read your quote as motivation inside of your agenda.</p>

        {/* 👇 botón local (opcional) */}
        <button className="save-quote-button" onClick={handleSave}>
          Save Quote
        </button>
      </div>
    </div>
  );
};
