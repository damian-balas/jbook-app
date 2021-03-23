import chalk from "chalk";
import { getLocalIp } from "../utils/getLocalIp";

export function logInfoAfterServe(filename: string, port: string) {
  console.log(
    chalk`
      Opened {green.bold ${filename}}. Navigate to:

      {green.bold http://localhost:${port}} or {green.bold http://${getLocalIp()}:${port}}
      
      to edit the file.
    `,
  );
}
