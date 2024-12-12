import { truncateText } from "@/utils/helpers";

describe("truncateText", () => {
  it("should return the original text if its length is less than or equal to maxLength", () => {
    const text = "Short text.";
    const maxLength = 20;
    const result = truncateText(text, maxLength);
    expect(result).toBe(text);
  });

  it('should truncate the text and append "..." if its length exceeds maxLength', () => {
    const text = "This is a very long sentence.";
    const maxLength = 10;
    const result = truncateText(text, maxLength);
    expect(result).toBe("This is a ...");
  });
});
