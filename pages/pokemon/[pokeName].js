import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { pokeApiSvc } from "../../services/pokeApi.service";
import SkillDesc from "../../components/skills/SkillDesc";
import Image from "next/image";

import styles from "./pokeInfo.module.css";
import Spinner from "../../components/spinner/Spinner";

export default function PokeInfo() {
  const [pokeDetails, setDetails] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const router = useRouter();
  const pokeName = router.query.pokeName;

  useEffect(() => {
    setDetails(null);
    pokeApiSvc.getPokeDetails({ pokeName }).then((data) => setDetails(data));
  }, [pokeName]);

  if (!pokeDetails) return <Spinner />;

  return (
    <>
      <div className={styles.LangContainer}>
        <select
          value={selectedLang}
          className={styles.LangSelect}
          onChange={(e) => {
            setSelectedLang(e.target.value);
          }}
        >
          <option value="en">En</option>
          <option value="es">Es</option>
          <option value="de">De</option>
        </select>
      </div>
      <div className={styles.InfoContainer}>
        <div className={styles.ImageContainer}>
          <Image
            alt={pokeName}
            src={pokeDetails.pokeImage}
            width={700}
            height={700}
            layout="intrinsic"
          />

          <div className={styles.PokeNameOverlay}>
            {pokeDetails.name.toUpperCase()}
          </div>
        </div>
        <div className={styles.DataContainer}>
          {pokeDetails.abilities.map((eachAbility, i) => (
            <SkillDesc
              skillUrl={eachAbility.ability.url}
              lang={selectedLang}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
