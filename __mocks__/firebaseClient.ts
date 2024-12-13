import { jest } from "@jest/globals";

const mockData = {
  name: "John Doe",
  age: 30,
  country: "USA",
};

const doc = jest.fn((firestore, collectionPath, documentId) => {
  return {
    id: documentId || "generatedId",
  };
});

const getDoc = jest.fn(() => ({
  exists: jest.fn().mockReturnValue(true),
  data: jest.fn().mockReturnValue(mockData),
}));

const setDoc = jest.fn((docRef, data, options) => {
  return Promise.resolve();
});

const deleteDoc = jest.fn(() => Promise.resolve());

const collection = jest.fn((firestore, path) => {
  return {
    path,
  };
});

const deleteField = jest.fn(() => undefined);

const where = jest.fn((fieldPath, opStr, value) => {
  return {
    fieldPath,
    opStr,
    value,
  };
});

const query = jest.fn((...args) => {
  return args;
});

const getDocs = jest.fn(() => ({
  empty: false,
  docs: [
    {
      data: jest.fn().mockReturnValue(mockData),
    },
  ],
}));

const FieldValue = {
  serverTimestamp: jest.fn().mockReturnValue("MOCK_TIME"),
  deleteField: deleteField,
};

module.exports = {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  deleteField,
  where,
  query,
  getDocs,
  FieldValue,
};
