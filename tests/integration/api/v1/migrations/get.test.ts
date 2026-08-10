import { beforeEach, describe, expect, it } from "vitest";
import migrations from "@/pages/api/v1/migrations";
import { cleanDatabase } from "../../utils/clean-database";
import { testClient } from "../../utils/test-client";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("GET to /api/v1/migrations should return http status code 200", async () => {
    const response = await testClient(migrations).get("/api/v1/migrations");
    expect(response.status).toEqual(200);

    const responseBody = response.body;
    expect(Array.isArray(responseBody)).toBeTruthy();
  });
});
