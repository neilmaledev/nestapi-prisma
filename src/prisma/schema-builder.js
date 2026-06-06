import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const modelsDir = path.join(__dirname, "models");
const outputFile = path.join(__dirname, "schema.prisma");

// Header for the final schema
const header = `datasource db {
  provider = "mysql"
}

generator client {
  provider = "prisma-client-js"
}
`;

// Read all model files
const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith(".prisma"));
const models = modelFiles
  .map(f => fs.readFileSync(path.join(modelsDir, f), "utf-8"))
  .join("\n\n");

// Write combined schema
fs.writeFileSync(outputFile, header + "\n" + models);

console.log("[schema-builder]: schema.prisma generated successfully!");