import { GET } from "./route"; // Adjust path if necessary
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";

// Mocking bcrypt globally
jest.mock("bcryptjs");

describe("Users API Route", () => {
  beforeEach(() => {
    jest.spyOn(prisma.user, "findMany").mockClear(); // Clear mocks before each test
  });

  // GET endpoint test
  describe("GET /api/users", () => {
    it("should return a list of users", async () => {
      const now = new Date();
      const mockUsers: User[] = [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          hashedPassword: "hashed_password_123",
          registeredAt: now,
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@example.com",
          hashedPassword: "hashed_password_456",
          registeredAt: now,
        },
      ];

      // Mocking prisma.user.findMany to return mock data
      jest.spyOn(prisma.user, "findMany").mockResolvedValue(mockUsers);

      const request = new NextRequest(new URL("http://localhost/api/users"));
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);

      // Ensure the dates are the same by converting to ISO strings
      expect(json).toEqual(
        mockUsers.map((user) => ({
          ...user,
          registeredAt: user.registeredAt.toISOString(),
        })),
      );
    });
  });
});
