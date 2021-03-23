import os from "os";
import { flatDeep } from "./flatDeep";

export function getLocalIp(): string {
  return (
    flatDeep(Object.values(os.networkInterfaces()) || [], 5)
      .filter((item) => !item.internal && item.family === "IPv4")
      .find(Boolean).address || "127.0.0.1"
  );
}
