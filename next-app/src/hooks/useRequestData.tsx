import { useEffect, useState } from "react";

export const useRequestData = (filters, url: string) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc25oZHV0b3hjYWZlcWV6anB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNjE0MDksImV4cCI6MTk5ODYzNzQwOX0.VWpmnQnv5JKBb62Svi8Q-QswSeuI-yHMZOYrWLUAdlA";
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
        Authorization: `Bearer ${token}`,
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
