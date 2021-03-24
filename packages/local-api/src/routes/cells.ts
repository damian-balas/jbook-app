import express from "express";
import fs from "fs/promises";
import path from "path";

type Cell = {
  id: string;
  content: string;
  type: "text" | "code";
};

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (request, response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      response.status(200).json(JSON.parse(result));
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        response.status(200).json([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (request, response) => {
    const { cells }: { cells: Cell[] } = request.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    response.status(200).json({ status: "OK" });
  });

  return router;
};
