import React, { useState } from 'react'; 
import styles from "./style.module.scss";
const FilterAI = ({filterRef}) => { 
    const [selectedOption, setSelectedOption] = useState('All'); 
    const [isOpen, setIsOpen] = useState(false); 

    const onChangeEventType = (value) => {
      filterRef.current.event_type = value;
    };

   

    const handleCheckboxChange = (option) => {
      switch (option) {
        case 'All':
          onChangeEventType('ANPR&event_type=HUMAN')
          break;
        case 'Face Recognition':
          onChangeEventType('HUMAN')
          break;
        case 'Vehicle Recognition':
          onChangeEventType('ANPR')
          break;
        default:
          onChangeEventType('HUMAN')
          break;
      }
      const isSelected = selectedOption.includes(option);
  
      if (isSelected) {
        setSelectedOption(selectedOption.filter((item) => item !== option));
      } else {
        setSelectedOption([...selectedOption, option]);
      }
    };
  
   
    const toggleDropdown = () => { 
      setIsOpen(!isOpen); 
    }; 
   
    return ( 
      <div className={`${styles.dropdown} ${isOpen ? `${styles.open}` : ''}`}> 
        <div className={styles.select_box} onClick={toggleDropdown}> 
          <span className={styles.title}>{selectedOption ? selectedOption : 'ALL'}</span> 
          <div className={`${styles.arrow} ${isOpen ? `${styles.open}` : ''}`}>&#9662;</div> 
        </div> 
   
        {isOpen && ( 
          <div className={styles.options}> 
            <div> 
              <input 
                className={styles.input}
                type="checkbox" 
                checked={selectedOption.includes('All')} 
                onChange={() => handleCheckboxChange('All')} 
              /> 
              <span className={styles.title}>All</span> 
            </div> 
            <div> 
              <input 
                className={styles.input}
                type="checkbox" 
                checked={selectedOption.includes('Face Recognition')} 
                onChange={() => handleCheckboxChange('Face Recognition')} 
              /> 
              <span className={styles.title}>Face Recognition</span>
            </div> 
            <div> 
              <input
                className={styles.input}
                type="checkbox" 
                checked={selectedOption.includes('Vehicle Recognition')} 
                onChange={() => handleCheckboxChange('Vehicle Recognition')} 
              /> 
              <span className={styles.title}>Vehicle Recognition</span>
            </div> 
            <div> 
              <input
                className={styles.input}
                type="checkbox" 
                checked={selectedOption.includes('Face & Vehicle - Access control')} 
                onChange={() => handleCheckboxChange('Face & Vehicle - Access control')} 
              /> 
              <span className={styles.title}>Face & Vehicle - Access control</span> 
            </div> 
            <div> 
              <input
                className={styles.input}
                type="checkbox" 
                checked={selectedOption.includes('Crowd Detection')} 
                onChange={() => handleCheckboxChange('Crowd Detection')} 
              /> 
              <span className={styles.title}>Crowd Detection </span>
            </div> 
          </div> 
          
        )} 
      </div> 
    ); 
  }; 
   
  export default FilterAI;