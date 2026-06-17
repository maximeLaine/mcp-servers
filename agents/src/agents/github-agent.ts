import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is required in .env");
}

const prompt =
  process.argv[2] ?? "List my 5 most recently updated GitHub repositories.";

console.log(`\nRunning GitHub agent: "${prompt}"\n`);

for await (const message of query({
  prompt,
  options: {
    model: "claude-opus-4-6",
    mcpServers: {
      github: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-github@latest"],
        env: {
          GITHUB_PERSONAL_ACCESS_TOKEN: GITHUB_TOKEN,
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
