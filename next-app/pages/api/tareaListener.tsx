import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const config = {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc25oZHV0b3hjYWZlcWV6anB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNjE0MDksImV4cCI6MTk5ODYzNzQwOX0.VWpmnQnv5JKBb62Svi8Q-QswSeuI-yHMZOYrWLUAdlA",
    },
  };

  await axios
    .post(
      "https://zqsnhdutoxcafeqezjpx.functions.supabase.co/tareaListener",
      req.body,
      config
    )
    .then((response) => {
      res.send(response.status);
    });
}
