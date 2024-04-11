import { useState } from "react";
import "../../styles/index.scss"
import { ArrowDown } from "../Icons/icons";

interface DropdownButtonProps {
    label: string,
    options: string[],
    onOptionSelect: (option: string) => void; 
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOptionSelect = (option: string) => {
      onOptionSelect(option);
      setIsOpen(false);
    };
  
    /* Mapping array of options ti <li/>  */
    const renderOptions = () => {
      return options.map((option) => (
        <li className="dropdown--option" key={option} onClick={() => handleOptionSelect(option)}>
          {option}
        </li>
      ));
    };
  
    return (
      <div className="dropdown">
        <div className="dropdown--btn" onClick={() => setIsOpen(!isOpen)}>
          <i>
            {label}
          </i>
          <ArrowDown/>
        </div>
        {isOpen && (
          <ul className="dropdown--content">{renderOptions()}</ul>
        )}
      </div>
    );
  };