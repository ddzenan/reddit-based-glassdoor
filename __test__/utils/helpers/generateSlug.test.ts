import { generateSlug } from "@/utils/helpers";

describe("generateSlug", () => {
  it("should generate a slug from a normal string", () => {
    const result = generateSlug("This is a test");
    expect(result).toBe("this-is-a-test");
  });

  it("should replace multiple spaces with a single hyphen", () => {
    const result = generateSlug("This  is   a    test");
    expect(result).toBe("this-is-a-test");
  });

  it("should ignore special characters with hyphens", () => {
    const result = generateSlug("This is a test!@#");
    expect(result).toBe("this-is-a-test");
  });

  it("should handle an empty string", () => {
    const result = generateSlug("");
    expect(result).toBe("");
  });

  it("should remove leading and trailing hyphens", () => {
    const result = generateSlug("   This is a test   ");
    expect(result).toBe("this-is-a-test");
  });
});
