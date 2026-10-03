"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const server = new mcp_js_1.McpServer({
    name: "my-test-server",
    version: "1.0.0",
});
server.tool("get_test_data", "Returns sample login test data", {}, async () => {
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify({
                    username: "testuser",
                    password: "Test@123",
                }),
            },
        ],
    };
});
const transport = new stdio_js_1.StdioServerTransport();
async function main() {
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Failed to connect server:", error);
    process.exitCode = 1;
});
