// export const BASE_URL = "/api";

export const BASE_URL = window.location.hostname === "localhost"  ? "http://localhost:3000" : "/api";
