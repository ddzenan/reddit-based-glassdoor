import { saveDocument } from "@/lib/firebaseClient/dataServices";
import { firestore } from "@/lib/firebaseClient/firebaseClient";
import { doc, collection, setDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  collection: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("@/lib/firebaseClient/firebaseClient", () => ({
  firestore: jest.fn(),
}));

describe("saveDocument", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCollectionPath = "users";
  const mockData = { id: "1", name: "John Doe", age: 30 };
  const mockDocId = "userId";
  const mockGeneratedId = "generatedId";

  it("should save a document with a provided ID", async () => {
    const mockDocRef = { id: mockDocId };
    (doc as jest.Mock).mockReturnValue(mockDocRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await saveDocument({
      collectionPath: mockCollectionPath,
      id: mockDocId,
      data: mockData,
    });

    expect(doc).toHaveBeenCalledWith(firestore, mockCollectionPath, mockDocId);
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, mockData, {
      merge: true,
    });
    expect(result).toBe(mockDocId);
  });

  it("should generate a new document ID if not provided", async () => {
    const mockCollectionRef = { id: mockGeneratedId };
    (collection as jest.Mock).mockReturnValue(mockCollectionRef);
    (doc as jest.Mock).mockReturnValue(mockCollectionRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await saveDocument({
      collectionPath: mockCollectionPath,
      data: mockData,
    });

    expect(collection).toHaveBeenCalledWith(firestore, mockCollectionPath);
    expect(doc).toHaveBeenCalledWith(
      firestore,
      mockCollectionPath,
      mockGeneratedId
    );
    expect(setDoc).toHaveBeenCalledWith(mockCollectionRef, mockData, {
      merge: true,
    });
    expect(result).toBe(mockGeneratedId);
  });

  it("should handle undefined values in data", async () => {
    const mockData = {
      id: "1",
      name: "Jane Doe",
      age: undefined,
    };

    const mockDocRef = { id: mockDocId };
    (collection as jest.Mock).mockReturnValue(mockDocRef);
    (doc as jest.Mock).mockReturnValue(mockDocRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    await saveDocument({
      collectionPath: mockCollectionPath,
      data: mockData,
    });

    expect(setDoc).toHaveBeenCalledWith(
      mockDocRef,
      expect.objectContaining({
        id: "1",
        name: "Jane Doe",
      }),
      { merge: true }
    );

    const call = (setDoc as jest.Mock).mock.calls[0];
    expect(call[1].age).toEqual(
      expect.objectContaining({
        _methodName: "deleteField",
      })
    );
  });

  it("should allow overwriting instead of merging", async () => {
    const mockDocRef = { id: mockDocId };
    (collection as jest.Mock).mockReturnValue(mockDocRef);
    (doc as jest.Mock).mockReturnValue(mockDocRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    await saveDocument({
      collectionPath: mockCollectionPath,
      data: mockData,
      merge: false,
    });

    expect(setDoc).toHaveBeenCalledWith(mockDocRef, mockData, { merge: false });
  });
});
