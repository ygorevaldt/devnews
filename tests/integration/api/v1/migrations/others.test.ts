import { beforeEach, describe, expect, it } from "vitest";
import migrations from "@/pages/api/v1/migrations";
import status from "@/pages/api/v1/status";
import { cleanDatabase } from "../../utils/clean-database";
import { testClient } from "../../utils/test-client";

describe("migrations", () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  it("DELETE to /api/v1/migrations should return http status code 504", async () => {
    const response = await testClient(migrations).delete("/api/v1/migrations");
    expect(response.status).toEqual(405);
  });

  it("PUT to /api/v1/migrations should return http status code 504", async () => {
    const response = await testClient(migrations).put("/api/v1/migrations");
    expect(response.status).toEqual(405);
  });

  it("PUT to /api/v1/migrations should not create db connections without closing them afterwards", async () => {
    const client = testClient(migrations);
    const putRequest = async () => await client.put("/api/v1/migrations");
    const deleteRequest = async () => await client.delete("/api/v1/migrations");

    await Promise.all([putRequest, deleteRequest]);

    const apiStatusResponse = await testClient(status).get("/api/v1/status");
    expect(apiStatusResponse.status).toEqual(200);

    const apiStatusResponseJson = apiStatusResponse.body;
    expect(
      apiStatusResponseJson.dependencies.database.opened_connections,
    ).toEqual(1);
  });
});
