import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AppAPIRespose<ResponseMessage>>
) {
  switch (_req.method) {
    case "GET": {
      return res
        .status(500)
        .json({ data: { message: "No longer available for requests" } });
    }
    default: {
      return res
        .status(400)
        .json({ data: { message: `Couldn't handle request` } });
    }
  }
}
