import { useEffect, useState } from "react";
import { pokeApiSvc } from "../../services/pokeApi.service";
import styles from "./SkillDesc.module.css";

export default function SkillDesc({ skillUrl, lang }) {
  const [skillName, setName] = useState(null);
  const [skillDesc, setDesc] = useState(null);

  useEffect(() => {
    pokeApiSvc
      .getAbilityDesc({ skillUrl, lang })
      .then(({ skillName, skillDesc }) => {
        setName(skillName ? skillName : null);
        setDesc(skillDesc ? skillDesc : null);
      })
      .catch((error) => console.log(error));
  }, [skillUrl, lang]);

  return (
    <div className={styles.AbilityContainer}>
      <div className={styles.AbilityName}>{skillName}</div>
      <div className={styles.AbilityDesc}>{skillDesc}</div>
    </div>
  );
}
