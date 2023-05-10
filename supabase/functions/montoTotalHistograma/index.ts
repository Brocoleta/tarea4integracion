import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (req) => {
  try {
    const connection = await pool.connect();

    try {
      // Run a query
      const result = await connection.queryObject`SELECT 
        CASE 
          WHEN mount < 10000 THEN 0
          WHEN mount >= 10000 AND mount <= 49999 THEN 1
          WHEN mount >= 50000 AND mount <= 99999 THEN 2
          WHEN mount >= 100000 AND mount <= 499999 THEN 3
          WHEN mount >= 500000 AND mount <= 999999 THEN 4
          WHEN mount >= 1000000 AND mount <= 9999999 THEN 5
          ELSE 6
        END AS intervalo, 
        COUNT(*) AS total_mount 
      FROM transactions 
      GROUP BY intervalo;
      `;
      const body = JSON.stringify(
        result.rows,
        (key, value) => (typeof value === "bigint" ? value.toString() : value),
        2
      );
      return new Response(body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type",
          "Content-Type": "application/json",
        },
      });
    } finally {
      // Release the connection back into the pool
      connection.release();
    }
  } catch (err) {
    console.error(err);
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
