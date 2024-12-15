import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Props for the `SearchBar` component.
 *
 * @property {boolean} isLoading - Indicates whether a search operation is in progress.
 * @property {string} searchQuery - The current search query entered by the user.
 * @property {(query: string) => void} setSearchQuery - Function to update the search query.
 * @property {() => void} onSearch - Function to execute the search operation.
 */
type SearchBarProps = {
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
};

/**
 * A React component that renders a search bar with an input field and a button.
 * Users can type in the input field and trigger a search operation.
 *
 * @param {SearchBarProps} props - The properties for the component, including loading state, query, and action handlers.
 * @returns A JSX element containing the search bar with input and button elements.
 */
export default function SearchBar({
  isLoading,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchBarProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onSearch();
  }
  return (
    <div className="flex space-x-2">
      <Input
        data-cy="search-bar-by-name"
        placeholder="Search company by name"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        data-cy="search-by-name-button"
        onClick={onSearch}
        disabled={isLoading}
        className="text-normal"
      >
        Search
      </Button>
    </div>
  );
}
