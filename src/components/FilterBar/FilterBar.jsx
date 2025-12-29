import css from "./FilterBar.module.css";

const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'patterns', label: 'Desenler' },
];

export default function FilterBar({ activeFilter, onSelectFilter }) {
  return (
    <div className={css.filterContainer}>
      <div className={css.filterList}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`${css.filterItem} ${activeFilter === filter.id ? css.active : ''}`}
            onClick={() => onSelectFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
