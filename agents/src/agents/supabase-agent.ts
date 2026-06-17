import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";

const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
if (!SUPABASE_ACCESS_TOKEN) {
  throw new Error("SUPABASE_ACCESS_TOKEN is required in .env");
}

// Optional: pin to a specific project to avoid accidental cross-project ops
const projectArgs = process.env.SUPABASE_PROJECT_ID
  ? ["--project-id", process.env.SUPABASE_PROJECT_ID]
  : [];

const prompt =
  process.argv[2] ?? "List all my Supabase projects and their regions.";

console.log(`\nRunning Supabase agent: "${prompt}"\n`);

for await (const message of query({
  prompt,
  options: {
    model: "claude-opus-4-6",
    mcpServers: {
      supabase: {
        command: "npx",
        args: ["-y", "@supabase/mcp-server-supabase@latest", ...projectArgs],
        env: {
          SUPABASE_ACCESS_TOKEN,
        },
      },
    },
  },
})) {
  if ("result" in message) {
    console.log("\n--- Result ---");
    console.log(message.result);
  }
}
