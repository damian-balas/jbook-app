import chalk from "chalk";
import { getLocalIp } from "../utils/getLocalIp";

export function logInfoAfterServe(filename: string, port: string) {
  console.log(
    chalk`
{yellow.bold ${filename}} - To edit the file, please navigate to:

    Local:              {green.bold http://localhost:${port}} 
    On Your Network:    {green.bold http://${getLocalIp()}:${port}}
    `,
  );
}
