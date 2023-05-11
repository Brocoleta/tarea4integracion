import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
      status: 200,
    });
  }
  try {
    const connection = await pool.connect();

    try {
      // Run a query
      const bank_destiny_query = `SELECT DISTINCT bank_destiny FROM transactions`;
      const bank_destiny = await connection.queryObject(bank_destiny_query);

      const bank_destiny_body = bank_destiny.rows.map(function (value) {
        return value["bank_destiny"].toString();
      });
      const bank_origin_query = `SELECT DISTINCT bank_origin FROM transactions`;
      const bank_origin = await connection.queryObject(bank_origin_query);
      const bank_origin_body = bank_origin.rows.map(function (value) {
        return value["bank_origin"].toString();
      });

      return new Response(
        JSON.stringify({
          bank_origin: bank_origin_body,
          bank_destiny: bank_destiny_body,
        }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "authorization, x-client-info, apikey, content-type",
            "Content-Type": "application/json",
          },
        }
      );
    } finally {
      // Release the connection back into the pool
      connection.release();
    }
  } catch (err) {
    console.error(err);
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
