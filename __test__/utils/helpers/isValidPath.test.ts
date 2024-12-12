import { isValidPath } from "@/utils/helpers";

describe("isValidPath", () => {
  it("should return true for a valid path without trailing slash", () => {
    const result = isValidPath("/home/user");
    expect(result).toBe(true);
  });

  it("should return true for a valid path with a trailing slash", () => {
    const result = isValidPath("/home/user/");
    expect(result).toBe(true);
  });

  it("should return false for a path that doesn't start with a slash", () => {
    const result = isValidPath("home/user");
    expect(result).toBe(false);
  });

  it("should return false for a path with consecutive slashes", () => {
    const result = isValidPath("/home//user");
    expect(result).toBe(false);
  });

  it("should return false for an empty path", () => {
    const result = isValidPath("");
    expect(result).toBe(false);
  });

  it("should return false for a path with invalid characters", () => {
    const result = isValidPath("/home/user$");
    expect(result).toBe(false);
  });
});
