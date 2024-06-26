import { useState } from 'react';
import { ArrowDown, ArrowUp } from '../Icons/icons';
import { DropdownButtonProps } from '../../models/dropdown-button';

export const DropdownButton = ({ label, options, onOptionSelect }: DropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(<ArrowDown className="icon" />);

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  /* Set isOpen when click & Change Icon when dropdown is open */
  const handleChangeIcon = () => {
    setIsOpen(!isOpen);
    setIcon(isOpen ? <ArrowDown className="icon" /> : <ArrowUp className="icon" />);
  };

  /* Mapping array of options to render option in dropdown */
  const renderOptions = () => {
    return options.map(option => (
      <li className="dropdown--option" key={option} onClick={() => handleOptionSelect(option)}>
        {option}
      </li>
    ));
  };

  return (
    <div className="dropdown">
      <div className="dropdown--btn" onClick={handleChangeIcon}>
        {label}
        {icon}
      </div>
      {isOpen && <ul className="dropdown--content">{renderOptions()}</ul>}
    </div>
  );
};
