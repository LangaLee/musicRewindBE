import axios from "axios";
import { config } from "dotenv";
config();

const instance = axios.create({
  baseURL: "http://192.168.4.102:8096",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `MediaBrowser Token=${process.env.Token}`,
  },
});

export async function fetchListeningHistory() {
  const res = await instance.post("/user_usage_stats/submit_custom_query", {
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

export async function fetchTopListens(ids) {
  try {
    const promises = ids.reduce((acc, cVal) => {
      if (typeof cVal[0] !== "string") return acc;
      acc.push(
        instance.get(
          `/items/${cVal[0]}?userId=2a7b9936-5dd8-4717-89d0-ee778dfc6a74`,
        ),
      );
      return acc;
    }, []);

    const res = await Promise.all(promises);
    return res.map(
      ({
        data: {
          Name,
          Id,
          UserData: { PlayCount },
          AlbumArtists,
          Album,
          AlbumId,
          AlbumPrimaryImageTag,
        },
      }) => {
        return {
          name: Name,
          itemId: Id,
          playCount: PlayCount,
          artistNames: AlbumArtists.map((artist) => artist.Name),
          artistIds: AlbumArtists.map((artist) => artist.Id),
          albumName: Album,
          albumId: AlbumId,
          albumImageTag: AlbumPrimaryImageTag,
        };
      },
    );
  } catch (error) {
    if (error.response.status === 400)
      return { status: 400, message: "one or more keys not found/invalid" };
  }
}
