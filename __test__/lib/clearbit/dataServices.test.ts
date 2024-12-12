import { fetchClearbitLogo } from "@/lib/clearbit/dataServices";

global.fetch = jest.fn();

const BASE_URL = "https://logo.clearbit.com";

const mockWebsite = "https://example.com";
const mockHostname = "example.com";
const expectedLogoUrl = `${BASE_URL}/${mockHostname}`;

describe("fetchClearbitLogo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the logo URL if the response is successful", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    const result = await fetchClearbitLogo(mockWebsite);

    expect(fetch).toHaveBeenCalledWith(expectedLogoUrl);
    expect(result).toBe(expectedLogoUrl);
  });

  it("should return null if the response is not successful", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await fetchClearbitLogo(mockWebsite);

    expect(fetch).toHaveBeenCalledWith(expectedLogoUrl);
    expect(result).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchClearbitLogo(mockWebsite);

    expect(fetch).toHaveBeenCalledWith(expectedLogoUrl);
    expect(result).toBeNull();
  });

  it("should return null if no website is provided", async () => {
    const result = await fetchClearbitLogo("");

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("should handle invalid URLs gracefully", async () => {
    const invalidWebsite = "not-a-valid-url";

    const result = await fetchClearbitLogo(invalidWebsite);

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
