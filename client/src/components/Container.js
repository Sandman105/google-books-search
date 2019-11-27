import React from 'react';

//We can make this a fluid container is we just pass in the property, fluid.

const Container = props => {
    return (
        <div className={`container${props.fluid ? '-fluid' : ''}`}>
            {props.children}
        </div>
    );



};

export default Container;