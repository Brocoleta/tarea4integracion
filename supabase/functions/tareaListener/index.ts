import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Get the connection string from the environment variable "SUPABASE_DB_URL"
const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true);

interface message {
  message: {
    data: string;
    messageId: string;
    message_id: string;
    publishTime: string;
    publish_time: string;
  };
  subscription: string;
}

serve(async (req) => {
  try {
    const body = await req.json();
    console.log(body);
    // Grab a connection from the pool
    const connection = await pool.connect();

    const message = body.message;

    const data = atob(message.data);
    const publishTime = message.publishTime;
    if (data.length == 64) {
      const type = Number(data.slice(0, 4));
      const id = Number(data.slice(4, 14));
      const bank_origin = Number(data.slice(14, 21));
      const account_origin = Number(data.slice(21, 31));
      const bank_destiny = Number(data.slice(31, 38));
      const account_destiny = Number(data.slice(38, 48));
      const mount = Number(data.slice(48, 64));

      try {
        // Run a query
        const result =
          await connection.queryObject`SELECT id FROM transactions`;
        const ids = result.rows.map((row) =>
          typeof row.id === "bigint" ? row.id.toString() : row.id
        );

        let exists = false;
        ids.forEach((element) => {
          if (element == id) exists = true;
        });

        if (!exists) {
          await connection.queryObject`INSERT INTO transactions(id, publish_time, type,  bank_origin, bank_destiny, account_origin,account_destiny,mount) VALUES (${id}, ${publishTime}, ${type}, ${bank_origin}, ${bank_destiny}, ${account_origin}, ${account_destiny}, ${mount}) RETURNING *`;

          return new Response("Se guardo el mensaje", {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "authorization, x-client-info, apikey, content-type",
              "Content-Type": "application/json",
            },
          });
        } else {
          return new Response("Mensaje ya enviado", {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "authorization, x-client-info, apikey, content-type",
              "Content-Type": "application/json",
            },
          });
        }
      } finally {
        // Release the connection back into the pool
        connection.release();
      }
    }
  } catch (err) {
    console.error(err);
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
