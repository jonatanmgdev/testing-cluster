export function objectContainsKeyword(object : any, keywords : string[]) {
  if (typeof object === 'object' && object !== null && Array.isArray(keywords) && keywords.length > 0) {
    return keywords.some(keyword => keyword in object);
  }
  return false;
}