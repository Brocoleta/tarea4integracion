import { useEffect, useState } from "react";

export const useRequestData = (filters, url: string) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] != "") {
        params[key] = filters[key];
      }
    });

    fetch("https://zqsnhdutoxcafeqezjpx.functions.supabase.co/" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
      },
      body: JSON.stringify(params),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setData(data);
    });
  }, [filters]);

  return data;
};
