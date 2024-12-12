import { transformToUndefined } from "@/utils/helpers";

describe("transformToUndefined", () => {
  it("should replace null values with undefined", () => {
    const data = { name: "John", age: null, city: "New York" };
    const result = transformToUndefined(data);
    expect(result).toEqual({ name: "John", age: undefined, city: "New York" });
  });

  it("should not modify the object if there are no null values", () => {
    const data = { name: "John", age: 30, city: "New York" };
    const result = transformToUndefined(data);
    expect(result).toEqual(data);
  });

  it("should return an empty object if the input is empty", () => {
    const data = {};
    const result = transformToUndefined(data);
    expect(result).toEqual({});
  });

  it("should handle objects with multiple null values", () => {
    const data = { name: null, age: null, city: null };
    const result = transformToUndefined(data);
    expect(result).toEqual({
      name: undefined,
      age: undefined,
      city: undefined,
    });
  });
});
