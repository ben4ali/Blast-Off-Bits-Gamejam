import { Planning } from "./planning";

export interface Day {
  title: string;
  description: string;
  plannings: Planning[];
}
