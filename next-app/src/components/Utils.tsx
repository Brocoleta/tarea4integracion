import axios from "axios";

export const requestSender = async (data, url: string) => {
  const config = {
    headers: { Authorization: "Bearer " + process.env.TOKEN },
  };

  return axios
    .post(
      "https://zqsnhdutoxcafeqezjpx.functions.supabase.co/" + url,
      data,
      config
    )
    .then((response) => {
      return console.log(response.data);
    })
    .catch((error) => {
      return console.error(error);
    });
};
