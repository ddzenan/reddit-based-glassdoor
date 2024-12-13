import { getDocument } from "@/lib/firebaseClient/dataServices";
import { firestore } from "@/lib/firebaseClient/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

describe("getDocument", () => {
  const mockDocumentPath = "testCollection/testDocument";
  const mockData = { name: "John Doe", age: 30, country: "USA" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the full document data if it exists and no selectFields are provided", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockData,
    });

    const result = await getDocument(mockDocumentPath);

    expect(doc).toHaveBeenCalledWith(firestore, mockDocumentPath);
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it("should return selected fields from the document data", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockData,
    });

    const result = await getDocument(mockDocumentPath, ["name", "country"]);

    expect(result).toEqual({ name: "John Doe", country: "USA" });
  });

  it("should return undefined if the document does not exist", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => null,
    });

    const result = await getDocument(mockDocumentPath);

    expect(result).toBeUndefined();
  });

  it("should return an empty object if selectFields do not match any data fields", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockData,
    });

    const result = await getDocument(mockDocumentPath, ["nonExistentField"]);

    expect(result).toEqual({});
  });
});
