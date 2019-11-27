import React from 'react';

//The space between the backtick and col is the separator
//Still need some clarification on this, still a little foggy

const Column = ({ base = 12, sm, md, lg, xl, children }) => {
    let columnClassName = `col-${base}`;

    if (sm) {
        columnClassName = columnClassName.concat(` col-sm-${sm}`);
    }
    if (md) {
        columnClassName = columnClassName.concat(` col-md-${md}`);
    }
    if (lg) {
        columnClassName = columnClassName.concat(` col-ls-${lg}`);
    }
    if (xl) {
        columnClassName = columnClassName.concat(` col-xl-${xl}`);
    }

    return <div className={columnClassName}>{children}</div>

};

export default Column;