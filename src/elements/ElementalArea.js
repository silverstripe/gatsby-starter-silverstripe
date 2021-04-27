import React from 'react';
import ElementContent from './ElementContent';

// Todo: Support dynamic element components 
const ElementalArea = ({ elements }) => {
    return (
        elements.map(element => {
            return (
                <div key={element.id}>
                    <h3>{element.__typename}</h3>
                    <ElementContent element={element} />
                </div>
                
            )
        })
    )
};

export default ElementalArea;