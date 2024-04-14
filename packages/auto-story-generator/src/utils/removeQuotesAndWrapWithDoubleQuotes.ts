/**
 * Remove single and double quotes from the string and wrap the string with double quotes.
 * @param str - string
 * @returns string
 */
export function removeQuotesAndWrapWithDoubleQuotes(str: string): string {
  const quoteRemovedStr = str.replace(/"/g, '').replace(/'/g, '')
  return quoteRemovedStr
}
