const tailwindConfig = require("../../.././../../tailwind.config");

/**
 * Removes the "px" suffix from a string representing a number in pixels and returns the parsed integer value.
 *
 * @param {string} str - The string representing the number in pixels.
 * @return {number} The parsed integer value of the string.
 */
const removePxAndParseInt = (str: string): number =>
  parseInt(str.replace("px", ""), 10);

export enum screenSizes {
  XS = removePxAndParseInt(tailwindConfig.theme.extend.container.screens.xs),
  SM = removePxAndParseInt(tailwindConfig.theme.extend.container.screens.sm),
  MD = removePxAndParseInt(tailwindConfig.theme.extend.container.screens.md),
  LG = removePxAndParseInt(tailwindConfig.theme.extend.container.screens.lg),
  XL = removePxAndParseInt(tailwindConfig.theme.extend.container.screens.xl),
  "2XL" = removePxAndParseInt(
    tailwindConfig.theme.extend.container.screens["2xl"]
  ),
  "3XL" = removePxAndParseInt(
    tailwindConfig.theme.extend.container.screens["3xl"]
  ),
  "4XL" = removePxAndParseInt(
    tailwindConfig.theme.extend.container.screens["4xl"]
  ),
}
