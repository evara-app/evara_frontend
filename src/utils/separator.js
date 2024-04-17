export function Separator(text) {
  if (Array.isArray(text)) {
    const newTxt = text.map((txt) => {
      const replaceText = txt.replaceAll("_", " ");
      return replaceText.replace(/$/, ",");
    });
    return newTxt;
  }
  return text;
}
