import { describe, expect, it } from "vitest";
import status from "@/pages/api/v1/status";
import { testClient } from "../../utils/test-client";

describe("status", () => {
  it("GET to /api/v1/status should return http status code 200", async () => {
    const response = await testClient(status).get("/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = response.body;

    const updatedAtParsed = new Date(responseBody.updated_at).toISOString();

    expect(responseBody.updated_at).toEqual(updatedAtParsed);
    expect(responseBody.dependencies.database.version).toEqual("16.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  });
});
