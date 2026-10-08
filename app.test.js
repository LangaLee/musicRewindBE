import { describe, expect } from "vitest";
import { fetchListeningHistory } from "./app";
import { countPlays, topListens } from "./utils";

describe("", () => {
  describe("fetchListionHistory()", () => {
    test("returns an array with all the necessary keys", async () => {
      const items = await fetchListeningHistory();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).greaterThan(0);
      items.forEach((item) => {
        expect(typeof item.dateCreated).toBe("string");
        expect(typeof item.userId).toBe("string");
        expect(typeof item.itemId).toBe("string");
        expect(item.itemType).toBe("Audio");
        expect(typeof item.itemName).toBe("string");
        expect(typeof item.playbackMethod).toBe("string");
        expect(typeof item.clientName).toBe("string");
        expect(typeof item.clientType).toBe("string");
        expect(typeof item.playbackDuration).toBe("number");
      });
    });
  });

  describe("countPlays", () => {
    test("when passed an array of a single item", () => {
      const plays = [
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song1",
          itemType: "Audio",
          itemName: "Liars/Justin",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 300,
        },
      ];

      const expectedResult = { song1: 1 };
      expect(countPlays(plays)).toEqual(expectedResult);
    });

    test("when passed an array of multiple items", () => {
      const plays = [
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song1",
          itemType: "Audio",
          itemName: "Liars/Justin",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 300,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song3",
          itemType: "Audio",
          itemName: "Power",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 330,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song8",
          itemType: "Audio",
          itemName: "Lights",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 200,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song9",
          itemType: "Audio",
          itemName: "Monster",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 340,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song3",
          itemType: "Audio",
          itemName: "Power",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 330,
        },
      ];

      const expectedResult = {
        song1: 1,
        song9: 1,
        song3: 2,
        song8: 1,
      };
      expect(countPlays(plays)).toEqual(expectedResult);
    });

    test("when passed an array with items that have 0 playDuration", () => {
      const plays = [
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song1",
          itemType: "Audio",
          itemName: "Liars/Justin",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 300,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song3",
          itemType: "Audio",
          itemName: "Power",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 0,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song8",
          itemType: "Audio",
          itemName: "Lights",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 200,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song9",
          itemType: "Audio",
          itemName: "Monster",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 340,
        },
        {
          dateCreated: "date ...",
          userId: "lee01",
          itemId: "song3",
          itemType: "Audio",
          itemName: "Power",
          playbackMethod: "Vinyl",
          clientName: "Audio Technika",
          clientType: "LP player",
          playbackDuration: 0,
        },
      ];

      const expectedResult = {
        song1: 1,
        song9: 1,
        song8: 1,
      };

      expect(countPlays(plays)).toEqual(expectedResult);
    });
  });

  describe("topListens", () => {
    test("when passed an object with a single play", () => {
      const plays = { song1: 1 };
      expect(topListens(plays)).toEqual([["song1", 1]]);
    });
    test("when passed an object with multiple plays returns them ordered by playcount desc", () => {
      const plays = { song1: 2, song3: 4, song4: 3, song5: 8 };
      const expectedResult = [
        ["song5", 8],
        ["song3", 4],
        ["song4", 3],
        ["song1", 2],
      ];
      expect(topListens(plays)).toEqual(expectedResult);
    });
    test("when passed an object with x amount of key/values return n number of items in the array (n being the number passed in to the function as second argument) ", () => {
      const plays = {
        song1: 1,
        song2: 3,
        song3: 1,
        song4: 1,
        song5: 8,
        song6: 8,
        song7: 2,
        song9: 5,
      };
      const expectedResult = [
        ["song5", 8],
        ["song6", 8],
        ["song9", 5],
        ["song2", 3],
      ];
      expect(topListens(plays, 4)).toEqual(expectedResult);
    });
    test("when a second argument is not passed defaults to returning 5 items in the array", () => {
      const plays = {
        song1: 1,
        song2: 3,
        song3: 1,
        song4: 1,
        song5: 8,
        song6: 8,
        song7: 2,
        song9: 5,
      };
      const expectedResult = [
        ["song5", 8],
        ["song6", 8],
        ["song9", 5],
        ["song2", 3],
        ["song7", 2],
      ];
      expect(topListens(plays)).toEqual(expectedResult);
    });
  });
});
