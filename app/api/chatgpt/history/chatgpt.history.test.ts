import { GET } from "./route"; // Adjust path if necessary
import prisma from "@/prisma/client"; // Mock Prisma client
import { NextRequest, NextResponse } from "next/server";

jest.mock("@/prisma/client", () => ({
  user: {
    findUnique: jest.fn(),
  },
  history: {
    findMany: jest.fn(),
  },
}));

describe("GET /api/history", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email is missing", async () => {
    const mockRequest = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe("Invalid email");
  });

  it("should return 404 if user is not found", async () => {
    const mockRequest = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams({ email: "test@example.com" }),
      },
    } as unknown as NextRequest;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(404);
    expect(result.error).toBe("User not found");
  });

  it("should return 200 with histories when email is valid", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    const mockHistories = [{ id: 1, name: "History 1", userId: 1 }];

    const mockRequest = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams({ email: "test@example.com" }),
      },
    } as unknown as NextRequest;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockUser);
    (prisma.history.findMany as jest.Mock).mockResolvedValueOnce(mockHistories);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.histories).toEqual(mockHistories);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
    expect(prisma.history.findMany).toHaveBeenCalledWith({
      where: { userId: mockUser.id },
      include: { user: true },
    });
  });

  it("should return 500 if there is an error", async () => {
    const mockRequest = {
      method: "GET",
      nextUrl: {
        searchParams: new URLSearchParams({ email: "test@example.com" }),
      },
    } as unknown as NextRequest;

    (prisma.user.findUnique as jest.Mock).mockRejectedValueOnce(
      new Error("Database error"),
    );

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.error).toBe("Error fetching histories");
  });
});
