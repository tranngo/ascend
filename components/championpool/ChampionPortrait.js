import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const ChampionPortrait = ({ championId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json"
      )
      .then((res) => {
        if (res.data.data) {
          setChampions(res.data.data);
          setIsLoading(false);
        }
      });
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <div>
      <Image
        src={
          "http://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/" +
          championId +
          ".png"
        }
        alt={championId}
        height="100%"
        width="100%"
      />
      <p className="text-xs truncate">{champions[championId].name}</p>
    </div>
  );
};

export default ChampionPortrait;
