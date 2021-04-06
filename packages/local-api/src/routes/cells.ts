import prettier from "prettier";
import parser from "prettier/parser-babel";
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
      const formattedResult = prettier
        .format(result, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");
      const linesArray = formattedResult.split(/\r?\n/);

      const blocks: any[] = [];
      let codeBlock = "";

      linesArray.forEach((line) => {
        if (line === "// [CELL END]") {
          codeBlock += line;
          blocks.push(codeBlock);
          codeBlock = "";
        } else {
          codeBlock += line + "\n";
        }
      });

      const codeOnlyBlocks = blocks.map((codeWithComment) => {
        const startBlockMatch = codeWithComment.match(
          /^\/\* (code|text)-.* (\*\/)+?/gm,
        );

        const isCode = startBlockMatch[0].includes("code");
        const id: string = startBlockMatch[0].match(/^\/\*.*-(\w+).*\*\/$/m)[1];
        console.log({ codeWithComment });
        let content = codeWithComment
          .replace(startBlockMatch, "")
          .slice(0, -13);
        console.log({ content });

        if (isCode) {
          content = prettier
            .format(content, {
              parser: "babel",
              plugins: [parser],
              useTabs: false,
              semi: true,
              singleQuote: true,
            })
            .replace(/\n$/, "");
        } else {
          content = content.slice(0, -1).substring(2).replace(/^\/\//gm, "");
          console.log({ content2: content });
        }

        return {
          id,
          type: isCode ? "code" : "text",
          content,
        };
      });

      return response.status(200).json(codeOnlyBlocks);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        return response.status(200).json([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (request, response) => {
    const { cells }: { cells: Cell[] } = request.body;

    let fileContent = "";

    cells.forEach((cell) => {
      const cellContentBlock = [];
      cellContentBlock.push("\n");
      cellContentBlock.push(`/* ${cell.type}-${cell.id} */`);

      if (cell.type === "code") {
        cellContentBlock.push(cell.content);
      } else {
        cellContentBlock.push(
          `${cell.content
            .split(/\r?\n/)
            .map((line) => `//${line}`)
            .join("\n")}`,
        );
      }

      cellContentBlock.push("// [CELL END]");

      fileContent += cellContentBlock.join("\n");
    });

    await fs.writeFile(fullPath, fileContent, "utf-8");

    response.status(200).json({ status: "OK" });
  });

  return router;
};
