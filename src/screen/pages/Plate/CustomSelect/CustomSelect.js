import React, { useState } from 'react';

const options = [
  { value: 'option1', label: 'Option 1', image: 'path/to/image1.jpg' },
  { value: 'option2', label: 'Option 2', image: 'path/to/image2.jpg' },
  // Thêm các mục khác tương tự
];

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="custom-select">
      <div className="selected-option">
        {selectedOption && (
          <>
            <img src={selectedOption.image} alt={selectedOption.label} className="option-image" />
            <span className="option-label">{selectedOption.label}</span>
          </>
        )}
      </div>
      <ul className="options-list">
        {options.map((option) => (
          <li
            key={option.value}
            className={`option ${selectedOption?.value === option.value ? 'selected' : ''}`}
            onClick={() => handleOptionChange(option)}
          >
            <img src={option.image} alt={option.label} className="option-image" />
            <span className="option-label">{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;