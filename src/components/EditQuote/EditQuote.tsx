import './EditQuote.css';
import { useState } from 'react';
import { useEditProfile } from '../../contexts/EditProfileContext';

export const EditQuote = ({
  onSave,
}: {
  onSave: (message: string, type: 'success' | 'error') => void;
}) => {
  const { saveQuote } = useEditProfile();
  const [quoteInput, setQuoteInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  const handleSave = async () => {
    if (quoteInput.trim() === '' && authorInput.trim() === '') {
      onSave('Please fill in at least one field.', 'error');
      return;
    }
    if (quoteInput.trim() !== '' && authorInput.trim() !== '') {
      try {
        await saveQuote(quoteInput, authorInput);
        onSave('Quote saved!', 'success');
      } catch {
        onSave('Error saving quote.', 'error');
      }
    }
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

        <button className="save-quote-button" onClick={handleSave}>
          Save Quote
        </button>
      </div>
    </div>
  );
};
