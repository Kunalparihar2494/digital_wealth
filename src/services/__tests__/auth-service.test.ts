/* eslint-disable import/first */
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("react-native", () => ({
  Platform: { OS: "ios" },
}));

import { AuthService } from "@/src/services/auth-service";

describe("AuthService", () => {
  it("should check if token is expired", async () => {
    const result = await AuthService.isTokenExpired();
    expect(typeof result).toBe("boolean");
  });

  it("should have storeTokens method", () => {
    expect(typeof AuthService.storeTokens).toBe("function");
  });

  it("should have logout method", () => {
    expect(typeof AuthService.logout).toBe("function");
  });
});
