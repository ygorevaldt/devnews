import { createServer } from "node:http";
import { NextApiHandler } from "next";
import supertest from "supertest";

export function testClient(handler: NextApiHandler) {
  const server = createServer((request, response) => {
    const nextResponse = response as any;
    nextResponse.status = (statusCode: number) => {
      response.statusCode = statusCode;
      return nextResponse;
    };
    nextResponse.json = (body: unknown) => {
      if (!response.getHeader("content-type")) {
        response.setHeader("content-type", "application/json; charset=utf-8");
      }
      response.end(JSON.stringify(body));
      return nextResponse;
    };

    Promise.resolve(handler(request as any, nextResponse)).catch(() => {
      if (!response.headersSent) {
        response.statusCode = 500;
      }

      if (!response.writableEnded) {
        response.end();
      }
    });
  });

  return supertest(server);
}
