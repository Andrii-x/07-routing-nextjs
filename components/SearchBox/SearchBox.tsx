import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className={css.searchLabel}>
      <span className={css.searchIcon} aria-hidden="true">⌕</span>
      <input
        className={css.search}
        type="search"
        placeholder="Search notes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search notes"
      />
    </label>
  );
}
