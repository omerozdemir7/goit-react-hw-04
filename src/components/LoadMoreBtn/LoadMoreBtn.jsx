import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
}
