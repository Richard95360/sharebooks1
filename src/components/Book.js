
import React from 'react';
import bookImg from '../media/book.png'

const Book = ({title, category,lender,askDate,closeDate}) => {

  const   displaydate = (dateStr) => {
        const newDate = new Date(dateStr);
        return newDate.toLocaleDateString("fr-FR")
    }

    return (
        <>
        
        <div className="book">
                <div className="book-image">
                    <img src={bookImg} alt="Book" />
                </div>
                <div>Titre : {title}</div>
                <div>Catégorie: {category}</div>
                {lender &&  <div>Prêteur: {lender}</div>}
                {askDate && <div>Date demande: {displaydate(askDate)}</div>}
                {closeDate && <div>Date cloture: {displaydate(closeDate)}</div>}
            </div>
        
        </>
    );
};

export default Book; 