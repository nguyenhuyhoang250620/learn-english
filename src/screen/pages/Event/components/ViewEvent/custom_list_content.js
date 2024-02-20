import React from 'react';


const CustomListContent = ({ firstElement, secondElement }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row',width:"100%",paddingTop:"30px"}}>
        <div style={{ flex: '1'}}>{firstElement}</div>
        <div style={{ flex: '2' }}>{secondElement}</div>
    </div>
  );
};

export default CustomListContent;
