import { searchDocumentsByField } from "@/lib/firebaseClient/dataServices";
import { firestore } from "@/lib/firebaseClient/firebaseClient";
import { collection, where, query, getDocs } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  collection: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
}));

describe("searchDocumentsByField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCollectionPath = "users";
  const mockField = "age";
  const mockValue = 30;
  const mockData = [{ id: "1", name: "John Doe", age: 30 }];

  it("should fetch documents matching the specified field and value", async () => {
    const mockSnapshot = {
      empty: false,
      docs: mockData.map((doc) => ({
        data: jest.fn().mockReturnValue(doc),
      })),
    };

    (collection as jest.Mock).mockReturnValue("mockCollectionRef");
    (where as jest.Mock).mockReturnValue("mockWhereConstraint");
    (query as jest.Mock).mockReturnValue("mockQueryRef");
    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await searchDocumentsByField(
      mockCollectionPath,
      mockField,
      mockValue
    );

    expect(collection).toHaveBeenCalledWith(firestore, mockCollectionPath);
    expect(where).toHaveBeenCalledWith(mockField, "==", mockValue);
    expect(query).toHaveBeenCalledWith(
      "mockCollectionRef",
      "mockWhereConstraint"
    );
    expect(getDocs).toHaveBeenCalledWith("mockQueryRef");

    expect(result).toEqual(mockData);
  });

  it("should return an empty array if no documents match the query", async () => {
    (getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] });

    const result = await searchDocumentsByField(
      mockCollectionPath,
      mockField,
      mockValue
    );

    expect(result).toEqual([]);
  });

  it("should return only the selected fields if selectFields is provided", async () => {
    const selectFields = ["name"];

    const mockSnapshot = {
      empty: false,
      docs: mockData.map((doc) => ({
        data: jest.fn().mockReturnValue(doc),
      })),
    };

    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await searchDocumentsByField(
      mockCollectionPath,
      mockField,
      mockValue,
      selectFields
    );

    expect(result).toEqual([{ name: "John Doe" }]);
  });
});
