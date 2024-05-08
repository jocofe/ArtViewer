import classNames from "classnames";
import { FilterTagProps } from "../../models/filter-tag";

export const FilterTag =  ({
    className = "",
    type = "",
    children,
    onClick

}: FilterTagProps) => {

    const filterClass = classNames ({
        filter: true,
        [className]: className,
        [`filter--${type}`]: type,
    });

    return (
        <button
        className={filterClass}
        onClick={onClick}
        >
            {children}
        </button>
    )
};