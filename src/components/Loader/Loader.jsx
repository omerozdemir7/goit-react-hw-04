import { InfinitySpin } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css.loaderContainer}>
        <InfinitySpin
          width="200"
          color="#4fa94d"
        />
        <p className={css.text}>Loading...</p>
      </div>
    </div>
  );
}