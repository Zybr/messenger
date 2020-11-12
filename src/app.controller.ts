import { Controller, Get } from "@nestjs/common";
import * as fs from "fs";

@Controller()
export default class AppController {
  private readonly info: Record<string, string>;

  constructor() {
    const { version } = JSON.parse(
      fs.readFileSync("./package.json").toString()
    );
    this.info = { version };
  }

  @Get()
  getInfo(): Record<string, string> {
    return this.info;
  }
}
