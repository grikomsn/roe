import { get } from "@vercel/edge-config";
import { StatusCodes } from "http-status-codes";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  try {
    const slug = new URL(req.url).searchParams.get("slug") || defaultRedirect();
    const url = (await get(slug)) || notFound();
    if (typeof url !== "string") notFound();
    return Response.redirect(url, StatusCodes.TEMPORARY_REDIRECT);
  } catch (error) {
    if (error instanceof Response) return error;
    return new Response(null, { status: 500 });
  }
}

function notFound(): never {
  throw new Response(null, { status: 404 });
}

function defaultRedirect(): never {
  if (!process.env.DEFAULT_REDIRECT) {
    notFound();
  }
  throw Response.redirect(
    process.env.DEFAULT_REDIRECT,
    StatusCodes.PERMANENT_REDIRECT
  );
}
