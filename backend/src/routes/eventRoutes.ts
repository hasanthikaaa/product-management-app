import express, { Router } from "express";
import { Request, Response } from "express";

export const createEventRouter = (clients: Response[]) => {
  console.log("createEventRouter", clients);
  const router = Router();

  router.get("/events", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    req.on("close", () => {
      const index = clients.indexOf(res);
      if (index !== -1) clients.splice(index, 1);
    });
  });

  return router;
};
