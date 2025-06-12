import type { GatsbyNode, PluginOptions } from "gatsby";
import { sourceNodes as sourceNodesImpl } from "./src/source-nodes";

interface LeadCMSPluginOptions extends PluginOptions {
  leadCMSUrl: string;
  language?: string;
  targetDir: string;
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  args,
  options: LeadCMSPluginOptions
) => {
  return sourceNodesImpl(args, options);
};
