import React from 'react';

var val = document.getElementById('root').clientHeight;
const hv = toString(100 - val) + 'vh';

const Spacer = ({gap}) => {
    return(<div style={{height:gap}}></div>)
}

export default Spacer;