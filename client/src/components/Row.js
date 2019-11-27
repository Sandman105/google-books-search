import React from 'react';

//So we are making a Bootstrap row here, the default is going to be row

const Row = props => {
    return (
        <div className={props.helper ? `row ${props.helper}` : `row`}>
            {props.children}
        </div>
    );
};

export default Row;