import { describe, expect } from "vitest";
import { fetchListeningHistory, fetchTopListens } from "./app";
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

  describe("fetchTopListens()", () => {
    /* 
    when passed an array with a single nested array ---done
    when passed an array with multiple arrays inside it ----done
    when passed an empty array ---- done
    when passed an array with empty arrays inside ---- done
    when passed an array with missing ids 
    */
    test("when passed an empty array", async () => {
      const res = await fetchTopListens([]);
      expect(res).toEqual([]);
    });
    test("when passed an array with a single item", async () => {
      const input = [["439d28bae8a6e60dc46ee9a236185b84", 2]];
      const expectedOutput = [
        {
          name: "NO BYSTANDERS (feat. Juice WRLD & Sheck Wes)",
          itemId: "439d28bae8a6e60dc46ee9a236185b84",
          playCount: expect.any(Number),
          artistNames: ["Travis Scott"],
          artistIds: ["709386787e02a9fce90d96229386c4ec"],
          albumName: "ASTROWORLD",
          albumId: "1865d012137d3e6f0665f4a9a050b970",
          albumImageTag: "9681fbe4ca43d7873568953f49db7394",
        },
      ];

      const res = await fetchTopListens(input);

      expect(res).toEqual(expectedOutput);
    });
    test("when passed an array with mulultiple items", async () => {
      const input = [
        ["439d28bae8a6e60dc46ee9a236185b84", 5],
        ["8d924b018a9c9cb60431a20d18f3033b", 5],
        ["4ce290dc88a97a969e0c58d65422b1d5", 2],
      ];
      const expectedOutput = [
        {
          name: "NO BYSTANDERS (feat. Juice WRLD & Sheck Wes)",
          itemId: "439d28bae8a6e60dc46ee9a236185b84",
          playCount: expect.any(Number),
          artistNames: ["Travis Scott"],
          artistIds: ["709386787e02a9fce90d96229386c4ec"],
          albumName: "ASTROWORLD",
          albumId: "1865d012137d3e6f0665f4a9a050b970",
          albumImageTag: "9681fbe4ca43d7873568953f49db7394",
        },
        {
          name: "LVL",
          itemId: "8d924b018a9c9cb60431a20d18f3033b",
          playCount: expect.any(Number),
          artistNames: ["A$AP Rocky"],
          artistIds: ["fd0b05ff3e22749b9ebc6253056cdc0b"],
          albumName: "LONG.LIVE.A$AP",
          albumId: "34dcb9490baf15f7385c6e5727d0e575",
          albumImageTag: "485eeeb5a4547b8ddea7753932084dfd",
        },
        {
          name: "PMW (All I Really Need)",
          itemId: "4ce290dc88a97a969e0c58d65422b1d5",
          playCount: expect.any(Number),
          artistNames: ["A$AP Rocky"],
          artistIds: ["fd0b05ff3e22749b9ebc6253056cdc0b"],
          albumName: "LONG.LIVE.A$AP",
          albumId: "34dcb9490baf15f7385c6e5727d0e575",
          albumImageTag: "485eeeb5a4547b8ddea7753932084dfd",
        },
      ];

      const res = await fetchTopListens(input);
      expect(res).toEqual(expectedOutput);
    });
    test("when passed an array with empty array inside", async () => {
      const res = await fetchTopListens([[], [], [], []]);
      expect(res).toEqual([]);
    });
    test("when passed an array with ids that dont exist in the db or in wrong format", async () => {
      const res = await fetchTopListens([
        [1],
        ["null", 2],
        ["banana", 2],
        [],
        [{}, 2],
      ]);
      expect(res).toEqual({
        status: 400,
        message: "one or more keys not found/invalid",
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
