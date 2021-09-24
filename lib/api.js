export const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed ${res.status}`);
  }
  const data = await res.json();
  return data;
};
