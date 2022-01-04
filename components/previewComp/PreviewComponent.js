import { useEffect, useState } from "react";
import { pokeApiSvc } from "../../services/pokeApi.service";
import Link from "next/link";
import Image from "next/image";

import Spinner from "../../components/spinner/Spinner";
import styles from "./PreviewComponent.module.css";

export default function PreviewCoponent({ pokeName }) {
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    pokeApiSvc.getPokeInfo({ pokeName }).then((data) => setPokeData(data));
  }, [pokeName]);

  if (!pokeData) return <Spinner />;

  return (
    <Link href={`pokemon/${pokeName}`} passHref>
      <div className={styles.PreviewComponent}>
        <div className={styles.NameContainer}>
          Nombre
          <br />
          {pokeData.name.toUpperCase()}
          <hr />
        </div>
        <div className={styles.PreviewImageContainer}>
          <Image
            alt={pokeData.name}
            src={pokeData.image}
            width={700}
            height={700}
            layout="intrinsic"
          />
        </div>
        <div className={styles.PreviewData}>
          id: {pokeData.id} <br />
          Altura: {pokeData.height}
          <br />
          Peso: {pokeData.weight} <br />
          Exp: {pokeData.experience} <br />
        </div>
      </div>
    </Link>
  );
}
