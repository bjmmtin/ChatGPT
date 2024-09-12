import { mockDeep } from "jest-mock-extended";
import prisma from "@/prisma/client";
import { POST } from "./route";
import { NextRequest } from "next/server";

// Mock Prisma client
jest.mock("@/prisma/client", () => mockDeep<typeof prisma>());

describe("POST /api/register", () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    // Clear mocks between tests
    jest.clearAllMocks();
  });

  it("should return 400 if validation fails", async () => {
    const invalidBody = JSON.stringify({
      name: "",
      email: "invalid-email",
      password: "123",
    });

    mockRequest = new NextRequest("http://localhost", {
      method: "POST",
      body: invalidBody,
    });

    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
  });

  it("should return 400 if user already exists", async () => {
    const validBody = {
      name: "John Doe",
      email: "john@example.com",
      password: "12345678",
    };

    mockRequest = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    // Mock existing user
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      hashedPassword: "hashed-password",
    });

    const response = await POST(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe("User with this email already exists");
  });

  it("should create a new user and return 201", async () => {
    const validBody = {
      name: "John Doe",
      email: "john@example.com",
      password: "12345678",
    };

    mockRequest = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    // Mock no existing user
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

    // Mock Prisma user creation
    (prisma.user.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      hashedPassword: "hashed-password",
    });

    const response = await POST(mockRequest);
    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result.email).toBe("john@example.com");
  });
});
