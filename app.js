import axios from "axios";
import { config } from "dotenv";

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
ORDER BY rowid DESC 
LIMIT 30`,
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
