import styles from "./Spinner.module.css";
import LoaderImage from "./loader.png";
import Image from "next/image";

export default function Spinner() {
  return (
    <div>
      <Image
        className={styles.pokeLoaderImage}
        src={LoaderImage}
        width={50}
        height={50}
        alt="loading..."
      />
    </div>
  );
}
