import { createClient } from "@libsql/client";
import fs from "fs/promises";

// CONFIG: Update these
const TURSO_DATABASE_URL = "libsql://ssdb-mayank1784.aws-ap-south-1.turso.io"; // example: 'libsql://your-db.turso.io'
const TURSO_AUTH_TOKEN =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDU3NDQ0NTEsImlkIjoiNDFmOTllZWEtZmY2Mi00YWExLTgzNjUtMTRiMTA3ZmU5YTQyIiwicmlkIjoiYzE1ZWQ3NTYtODc5Ny00MWNkLTk4N2EtZDhmYjIxNGU1ZjhjIn0.Z4sJ6JpXdeX7dFi3Yh3hHEg9UR7lRVc4wRPhMbeJQpTNbQyAGBdpOyUKlsY3KOX3eYZNbKfrsTWCcW6ZatAvDQ";
const SQL_FILE_PATH = "/Users/mayankjain/Downloads/asd.sql";

// Create Turso client
const client = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

// Function to run SQL statements with a delay
async function executeSqlFile() {
  try {
    // Read file
    const sqlFileContent = await fs.readFile(SQL_FILE_PATH, "utf8");

    // Split into individual statements
    const statements = sqlFileContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0); // remove empty strings

    console.log(`Found ${statements.length} SQL statements.`);

    for (const [index, statement] of statements.entries()) {
      console.log(`Executing statement ${index + 1}:`, statement);

      try {
        const result = await client.execute(statement);
        console.log(`✅ Statement ${index + 1} executed successfully.`);
      } catch (err) {
        console.error(
          `❌ Error executing statement ${index + 1}:`,
          err.message
        );
      }

      // Wait for 1 second between each
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log("🎉 All statements executed.");
  } catch (error) {
    console.error("Failed to execute SQL file:", error);
  }
}

executeSqlFile();
