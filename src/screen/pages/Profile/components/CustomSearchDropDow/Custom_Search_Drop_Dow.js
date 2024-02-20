import React, { useState, useRef, useEffect } from 'react'; 
import styles from "./style.module.scss";
 
function CustomSearch() { 
    const options = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape', 'Honeydew']; 
    const [isOpen, setIsOpen] = useState(false); 
    const [selectedOption, setSelectedOption] = useState(''); 
    const [searchTerm, setSearchTerm] = useState(''); 
   
    const dropdownRef = useRef(null); 
   
    const handleSelectOption = (option) => { 
      setSelectedOption(option); 
      setIsOpen(false); 
    }; 
   
    const handleSearch = (event) => { 
      setSearchTerm(event.target.value); 
    }; 
   
    const filteredOptions = options.filter((option) => 
      option.toLowerCase().includes(searchTerm.toLowerCase()) 
    ); 
   
    const handleClickOutside = (event) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { 
        setIsOpen(false); 
      } 
    }; 
   
    useEffect(() => { 
      document.addEventListener('mousedown', handleClickOutside); 
      return () => { 
        document.removeEventListener('mousedown', handleClickOutside); 
      }; 
    }, []); 
   
    const toggleDropdown = () => { 
      setIsOpen(!isOpen); 
    }; 
   
    return ( 
      <div className={styles.dropdown_select} onClick={toggleDropdown}> 
        <div className={`${styles.dropdown} ${isOpen ? 'open' : ''}`} ref={dropdownRef} > 
        {selectedOption || ''} 
          {isOpen && ( 
            <div className={styles.dropdown_menu}> 
              <div className={styles.search_bar}> 
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm} 
                  onChange={handleSearch} 
                /> 
              </div> 
              <ul className={styles.dropdown_content}> 
                {filteredOptions.map((option, index) => ( 
                  <li key={index} onClick={() => handleSelectOption(option)}> 
                    {option} 
                  </li> 
                ))} 
              </ul> 
            </div> 
          )} 
        </div> 
      </div> 
    ); 
  } 
   
  export default CustomSearch;