import './search-box.styles.css';
import { ChangeEvent, ChangeEventHandler } from 'react';

interface IChangeHandlerProps {
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ISearchBoxProps extends IChangeHandlerProps {
    className: string;
    placeholder?: string;
}

const SearchBox = ({className, placeholder, onChangeHandler}: ISearchBoxProps) => (
        <input className={`search-box ${className}`} type='search' placeholder={placeholder} 
            onChange={onChangeHandler} />
    );

export default SearchBox;