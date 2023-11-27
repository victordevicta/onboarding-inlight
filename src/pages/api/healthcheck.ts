import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  server: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ server: "healthy" });
}
