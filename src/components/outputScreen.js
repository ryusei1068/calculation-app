import React from 'react';

const OutputScreen = (props) => {
    return (
        <div>
            <div className="computation mb-3 d-flex align-items-center justify-content-end">
            <div>{props.answer}</div>
            </div>
            <div className="formula mb-3 d-flex align-items-center justify-content-end">
                <div>{props.formula}</div>
            </div>
        </div>
    )
}

export default OutputScreen;
