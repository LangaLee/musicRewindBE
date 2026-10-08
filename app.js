import axios from "axios";
import { config } from "dotenv";
import { countPlays } from "./utils";
config();

const instance = axios.create({
  baseURL: "http://192.168.4.102:8096/user_usage_stats/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `MediaBrowser Token=${process.env.Token}`,
  },
});

export async function fetchListeningHistory() {
  const res = await instance.post("submit_custom_query", {
    CustomQueryString: `SELECT *
FROM PlaybackActivity 
WHERE ItemType = 'Audio'
ORDER BY rowid DESC `,
  });

  return res.data.results.map(
    ([
      dateCreated,
      userId,
      itemId,
      itemType,
      itemName,
      playbackMethod,
      clientName,
      clientType,
      playbackDuration,
    ]) => {
      return {
        dateCreated,
        userId,
        itemId,
        itemType,
        itemName,
        playbackMethod,
        clientName,
        clientType,
        playbackDuration: Number(playbackDuration),
      };
    },
  );
}
