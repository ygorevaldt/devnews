import { beforeEach, describe, expect, it } from "vitest";
import migrations from "@/pages/api/v1/migrations";
import { cleanDatabase } from "../../utils/clean-database";
import { testClient } from "../../utils/test-client";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("POST to /api/v1/migrations should return http status code 200", async () => {
    const client = testClient(migrations);
    const response1 = await client.post("/api/v1/migrations");
    expect(response1.status).toEqual(201);

    const responseBody1 = response1.body;

    expect(Array.isArray(responseBody1)).toBeTruthy();
    expect(responseBody1.length).toBeGreaterThan(0);

    const response2 = await client.post("/api/v1/migrations");
    const responseBody2 = response2.body;

    expect(response2.status).toEqual(200);
    expect(responseBody2.length).toEqual(0);
  });
});
