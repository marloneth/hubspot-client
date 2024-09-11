import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar/SearchBar";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";

const handleOnSearch = jest.fn();

describe("SearchBar", () => {
  const newInputValue = "test";
  const defaultPlaceholder = "Buscar ...";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when placeholder is not set", () => {
    test("renders SearchBar with default placeholder", () => {
      // @ts-ignore
      render(<SearchBar onSearch={handleOnSearch} />);

      const searchInput = screen.getByPlaceholderText(defaultPlaceholder);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue("");
    });
  });

  describe("when placeholder is set", () => {
    const placeholderText = "Search Contacts";

    test("renders SearchBar with given placeholder", () => {
      render(
        // @ts-ignore
        <SearchBar onSearch={handleOnSearch} placeholder={placeholderText} />
      );

      const searchInput = screen.getByPlaceholderText(placeholderText);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue("");
    });
  });

  describe("when button is clicked", () => {
    test("triggers the onSearch method", () => {
      render(
        // @ts-ignore
        <SearchBar onSearch={handleOnSearch} />
      );

      const searchButton = screen.getByRole("button");
      fireEvent.click(searchButton);
      expect(handleOnSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe("when input is filled", () => {
    test("clear button should appear", () => {
      render(
        // @ts-ignore
        <SearchBar onSearch={handleOnSearch} />
      );

      expect(screen.getAllByRole("button")).toHaveLength(1);
      const searchInput = screen.getByPlaceholderText(defaultPlaceholder);
      fireEvent.change(searchInput, { target: { value: newInputValue } });
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });

  describe("when clear button is clicked", () => {
    test("clear button should appear", () => {
      render(
        // @ts-ignore
        <SearchBar onSearch={handleOnSearch} />
      );

      const searchInput = screen.getByPlaceholderText(defaultPlaceholder);
      fireEvent.change(searchInput, { target: { value: newInputValue } });
      expect(searchInput).toHaveValue(newInputValue);

      const [clearButton] = screen.getAllByRole("button");
      fireEvent.click(clearButton);
      expect(searchInput).toHaveValue("");
    });
  });
});
