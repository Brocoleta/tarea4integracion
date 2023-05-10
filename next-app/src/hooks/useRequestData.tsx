import axios from "axios";
import { useEffect, useState } from "react";

export const useRequestData = (params, url: string) => {
  const config = {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc25oZHV0b3hjYWZlcWV6anB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNjE0MDksImV4cCI6MTk5ODYzNzQwOX0.VWpmnQnv5JKBb62Svi8Q-QswSeuI-yHMZOYrWLUAdlA",
    },
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .post(
        "https://zqsnhdutoxcafeqezjpx.functions.supabase.co/" + url,
        params,
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("error");
      });
  }, []);

  return data;
};
