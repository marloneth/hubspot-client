import { ChangeEvent, FormEvent, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

interface Props {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ placeholder = "Buscar ...", onSearch }: Props) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleClear = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <form className="flex h-10" onSubmit={handleSearchSubmit}>
      <div className="flex border-black border-2 rounded mr-2">
        <IoSearch className="mt-2.5 ml-2" />
        <input
          type="text"
          placeholder={placeholder}
          className="border-0 h-full outline-0 pl-2 w-96"
          value={searchText}
          onChange={handleInputChange}
        />
        {searchText ? (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 p-0 bg-transparent"
          >
            <IoClose />
          </button>
        ) : null}
      </div>
      <button type="submit" className="bg-orange-400">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
