import { fetchListeningHistory } from "./app";

describe("", () => {
  test("returns an array with all the necessary keys", async () => {
    const items = await fetchListeningHistory();
    expect(Array.isArray(items)).toBe(true);
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
