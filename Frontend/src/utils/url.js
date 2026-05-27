export const getAssetUrl = (urlPath) => {
  if (!urlPath) return "";
  if (urlPath.startsWith("http")) return urlPath;

  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
  const root = apiBase.replace(/\/api\/v1\/?$/, "");
  return `${root}${urlPath}`;
};
