import { deleteDocument } from "@/lib/firebaseClient/dataServices";
import { firestore } from "@/lib/firebaseClient/firebaseClient";
import { doc, deleteDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("deleteDocument", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call doc and deleteDoc with the correct arguments", async () => {
    const mockDocPath = "collectionName/docId";

    const mockDocumentRef = { id: "docId" };
    (doc as jest.Mock).mockReturnValue(mockDocumentRef);

    await deleteDocument(mockDocPath);

    expect(doc).toHaveBeenCalledWith(firestore, mockDocPath);
    expect(deleteDoc).toHaveBeenCalledWith(mockDocumentRef);

    expect(doc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});
