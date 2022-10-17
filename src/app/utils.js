export const isJsonString = (json = '') => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
