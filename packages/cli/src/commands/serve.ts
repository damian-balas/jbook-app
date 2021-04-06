import path from "path";
import { Command } from "commander";
import { serve } from "@dbalasnote/local-api";
import { logInfoAfterServe } from "../loggers/serve";

type Options = {
  port: string;
};

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: Options) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        Number(options.port),
        path.basename(filename),
        dir,
        !isProduction,
      );
      logInfoAfterServe(filename, options.port);
    } catch (error) {
      if (error.code === "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port.");
      } else {
        console.error(error.message);
      }
      process.exit(1);
    }
  });
