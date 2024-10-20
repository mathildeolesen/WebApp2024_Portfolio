import type { z } from "zod";

import { projectSchema } from "../helpers/schema";


/*
export type Project = {

  id: string, // UUID er en streng
  title: string,
  tags: string[],
  description: string,
  createdAt: Date,
};
*/


export const actions = {
  add: "add",
  remove: "remove",
};

export type Action = (typeof actions)[keyof typeof actions];

export type Project = z.infer<typeof projectSchema>;