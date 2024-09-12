import { GET } from "./route";
import { NextRequest } from "next/server";
import prisma from "@/prisma/client";

// Mock Prisma client
jest.mock("@/prisma/client");

describe("GET /api/getMessagesByEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if history query parameter is missing", async () => {
    const mockRequest = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe("Invalid history");
  });

  it("should return 405 if the method is not GET", async () => {
    const mockRequest = {
      method: "POST", // Invalid method
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(405);
    expect(result.error).toBe("Method POST Not Allowed");
  });
});
