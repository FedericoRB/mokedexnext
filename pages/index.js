import { useEffect, useState } from "react";
import { pokeApiSvc } from "../services/pokeApi.service";
import PreviewCoponent from "../components/previewComp/PreviewComponent";

import styles from "../styles/Home.module.css";
import Spinner from "../components/spinner/Spinner";

export default function Home() {
  const [pokes, setPokes] = useState(null);
  const [nextUrl, setNext] = useState(null);
  const [prevUrl, setPrev] = useState(null);
  const [filterValue, setFilter] = useState("");
  const [originalPokes, setOriginal] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5"
  );

  useEffect(() => {
    setPokes(null);
    pokeApiSvc
      .getPokePage(currentUrl)
      .then(({ results, next, previous }) => {
        setPokes(results);
        setOriginal(results);
        setNext(next);
        setPrev(previous);
      })
      .catch((err) => console.log(err));
  }, [currentUrl]);

  useEffect(() => {
    if (filterValue === "") {
      setPokes(originalPokes);
      return;
    }

    const pokeFiltered = originalPokes.filter((eachPoke) =>
      eachPoke.name.includes(filterValue)
    );

    if (pokeFiltered.length === 0) {
      setPokes(originalPokes);
      return;
    }

    setPokes(pokeFiltered);
  }, [filterValue]);

  if (!pokes) return <Spinner />;

  return (
    <>
      <div className={styles.Controls}>
        <div
          className={styles.PrevBtn}
          onClick={() => {
            prevUrl ? setCurrentUrl(prevUrl) : void 0;
          }}
        >
          ❮
        </div>
        <div className={styles.NextBtn} onClick={() => setCurrentUrl(nextUrl)}>
          ❯
        </div>
      </div>
      <div className={styles.FilterContainer}>
        <input
          className={styles.FilterInput}
          type="text"
          placeholder="Filtrar"
          onKeyUp={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className={styles.SliderContainer}>
        {pokes.map((eachPoke, index) => (
          <PreviewCoponent key={index} pokeName={eachPoke.name} />
        ))}
      </div>
    </>
  );
}
