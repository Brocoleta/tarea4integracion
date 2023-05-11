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
    const body = await req.json();
    let filter = "";
    Object.keys(body).forEach((key) => {
      if (["bank_origin", "bank_destiny"].includes(key))
        if (filter != "") filter += ` AND ${key} = '${body[key]}'`;
        else filter += ` WHERE ${key} = '${body[key]}'`;
      if (["publish_time"].includes(key)) {
        const fecha = new Date(body[key]);

        fecha.setHours(0, 0, 0, 0);

        // Obtener el final del día (23:59:59) de la fecha
        const fechaFin = new Date(fecha);
        fechaFin.setHours(23, 59, 59, 999);

        // Obtener los valores de fecha y hora en formato de cadena
        const fechaInicioStr = fecha.toISOString();
        const fechaFinStr = fechaFin.toISOString();
        if (filter != "")
          filter += ` AND publish_time >= TIMESTAMP WITH TIME ZONE '${fechaInicioStr}' AND publish_time <= TIMESTAMP WITH TIME ZONE '${fechaFinStr}'`;
        else
          filter += ` WHERE publish_time >= TIMESTAMP WITH TIME ZONE '${fechaInicioStr}' AND publish_time <= TIMESTAMP WITH TIME ZONE '${fechaFinStr}'`;
      }
    });

    try {
      // Run a query
      const query = `SELECT bank_origin, bank_destiny, 
      SUM(CASE WHEN type = '2200' AND bank_origin = bank_origin THEN mount ELSE 0 END) 
      - SUM(CASE WHEN type = '2200' AND bank_destiny = bank_origin THEN mount ELSE 0 END) 
      - SUM(CASE WHEN type = '2400' AND bank_origin = bank_origin THEN mount ELSE 0 END) 
      + SUM(CASE WHEN type = '2400' AND bank_destiny = bank_origin THEN mount ELSE 0 END) AS conciliacion 
    FROM transactions${filter} 
    GROUP BY bank_origin, bank_destiny;`;
      const result = await connection.queryObject(query);

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
