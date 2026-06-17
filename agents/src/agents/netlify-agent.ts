import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";

const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
if (!NETLIFY_TOKEN) {
  throw new Error("NETLIFY_TOKEN is required in .env");
}

// The prompt to run — customize or accept from CLI args
const prompt =
  process.argv[2] ?? "List all my Netlify sites and their deploy statuses.";

console.log(`\nRunning Netlify agent: "${prompt}"\n`);

for await (const message of query({
  prompt,
  options: {
    model: "claude-opus-4-6",
    mcpServers: {
      netlify: {
        command: "npx",
        args: ["-y", "@netlify/mcp-server@latest"],
        env: {
          NETLIFY_TOKEN,
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
