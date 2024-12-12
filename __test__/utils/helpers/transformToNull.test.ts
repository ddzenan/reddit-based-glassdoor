import { transformToNull } from "@/utils/helpers";

describe("transformToNull", () => {
  it("should replace undefined value with null", () => {
    const data = { name: "John", age: undefined };
    const keys = ["name", "age"];
    const result = transformToNull(data, keys);
    expect(result).toEqual({ name: "John", age: null });
  });

  it("should add missing keys and set their value to null", () => {
    const data = { name: "John" };
    const keys = ["name", "age", "city"];
    const result = transformToNull(data, keys);
    expect(result).toEqual({ name: "John", age: null, city: null });
  });

  it("should not change keys that are already defined and not undefined", () => {
    const data = { name: "John", age: 30 };
    const keys = ["name", "age"];
    const result = transformToNull(data, keys);
    expect(result).toEqual({ name: "John", age: 30 });
  });

  it("should only add keys that are missing and set them to null", () => {
    const data = { name: "John" };
    const keys = ["name", "city"];
    const result = transformToNull(data, keys);
    expect(result).toEqual({ name: "John", city: null });
  });

  it("should replace all undefined values in an object with null", () => {
    const data = { name: undefined, age: undefined };
    const keys = ["name", "age", "city"];
    const result = transformToNull(data, keys);
    expect(result).toEqual({ name: null, age: null, city: null });
  });
});
