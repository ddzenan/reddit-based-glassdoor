import { prepareDataForFirestore } from "@/lib/firebaseClient/dataServices";
import { deleteField } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  deleteField: jest.fn(() => ({ _methodName: "deleteField" })),
}));

describe("prepareDataForFirestore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should replace undefined values with deleteField", () => {
    const inputData = {
      name: "John",
      age: undefined,
      country: "USA",
    };

    const result = prepareDataForFirestore(inputData);

    expect(result).toEqual({
      name: "John",
      age: { _methodName: "deleteField" },
      country: "USA",
    });
    expect(deleteField).toHaveBeenCalledTimes(1);
  });

  it("should return an object with no changes if no undefined values are present", () => {
    const inputData = {
      name: "John",
      age: 30,
      country: "USA",
    };

    const result = prepareDataForFirestore(inputData);

    expect(result).toEqual(inputData);
    expect(deleteField).not.toHaveBeenCalled();
  });

  it("should return an empty object if input data is an empty object", () => {
    const inputData = {};

    const result = prepareDataForFirestore(inputData);

    expect(result).toEqual({});
    expect(deleteField).not.toHaveBeenCalled();
  });
});
