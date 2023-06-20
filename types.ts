import { Construct } from "constructs";

export interface Config {
  environment: string;
  region?: string;
}

export interface Stack {
  stack: Construct;
  config: Config;
}

