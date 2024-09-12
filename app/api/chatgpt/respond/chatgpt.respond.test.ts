import { POST } from "./route";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import prisma from "@/prisma/client";

// Mocking the OpenAI and Prisma clients
jest.mock("openai", () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  }));
});

jest.mock("@/prisma/client", () => ({
  message: {
    create: jest.fn(),
  },
}));

describe("POST /api/chatgpt", () => {
  const mockOpenAI = new OpenAI({
    apiKey: "fake-api-key",
  });

  const mockRequest = (body: object): NextRequest => {
    return {
      method: "POST", // Ensuring the method is POST
      json: jest.fn().mockResolvedValue(body),
    } as unknown as NextRequest;
  };

  it("should return 400 for missing message or userEmail", async () => {
    const req = mockRequest({ userEmail: "user@test.com" }); // Missing 'message'

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Invalid input");
  });

  it("should handle OpenAI API failure and return 500", async () => {
    // Simulating an OpenAI API failure
    (mockOpenAI.chat.completions.create as jest.Mock).mockRejectedValueOnce(
      new Error("OpenAI API error"),
    );

    const req = mockRequest({
      message: "User message",
      userEmail: "user@test.com",
      history: 1,
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toContain("Failed to generate response from OpenAI");
  });
});
