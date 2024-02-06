
import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInterface {
    placeholder: string;
    outPut: (value: ChangeEvent<HTMLInputElement>) => void;
    enter?: () => void;
}

/**
 *  Search component for search game
 * @param placeholder:string
 * @param outPut: (value: string) => void
 * @param enter?: () => void
 * @returns  JSX.Element
 */
const Search = ({ placeholder, outPut, enter }: SearchInterface) => {

    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        outPut(e);
    }

    return (
        <div className="search" >
            <input type="search" placeholder={placeholder}
                value={search}
                className="search_input"
                onChange={
                    (e) => handleChange(e)
                }
                onKeyDown={
                    (e) => {
                        if (e.key === "Enter") {
                            enter && enter()
                        }
                    }
                }
            />
            <FaSearch
                className="search_icon"
                onClick={
                    () => {
                        enter && enter()
                    }
                }
                width={20}
                height={20}
            />
        </div>
    );

};

export default Search;
export type { SearchInterface };