import ls from "localstorage-slim";
import { ReadonlyURLSearchParams } from "next/navigation";

export const undefEmptyString = (str: string) => {
  return str === "" ? undefined : str;
};

export const getIdFromUrlAndLocalStorage = (
  search: ReadonlyURLSearchParams | null
) => {
  let urlId;
  let localId;
  localId = ls.get<string>("userId") || "";
  localId = localId?.length === 24 ? localId : "";

  if (search) {
    urlId = search.get("id") || "";
    urlId = urlId?.length === 24 ? urlId : "";
  }

  return urlId || localId || "";
};
