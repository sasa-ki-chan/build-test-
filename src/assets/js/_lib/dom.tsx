export const $ = (tagName: string) => {
  const elem = document.querySelector(tagName);
  if(!elem) {
    throw new Error(`"${tagName}" is not found.`);
  }
  else {
    return elem;
  }
}