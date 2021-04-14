import React from 'react';
import ElementContent from './ElementContent';

// Todo: Support dynamic element components 
const ElementalArea = ({ elementalArea }) => {
    return (
        elementalArea.elements.map(element => {
            return (
                <ElementContent key={element.id} element={element} />
            )
        })
    )
};

export default ElementalArea;