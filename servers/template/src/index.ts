import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "template",
  version: "1.0.0",
});

// Exemple de tool
server.tool(
  "hello",
  "Dit bonjour",
  { name: z.string().describe("Prénom") },
  async ({ name }) => ({
    content: [{ type: "text", text: `Bonjour, ${name} !` }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
