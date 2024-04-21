export function Separator(text) {
  if (Array.isArray(text)) {
    const newTxt = text.map((txt) => {
      return txt.replace(/$/, ",");
    });
    return newTxt;
  }
}
