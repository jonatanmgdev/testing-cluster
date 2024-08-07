import { tv } from "tailwind-variants";

export const baseButton = tv({
  base: "relative font-text font-semibold whitespace-nowrap outline-none inline-flex select-none cursor-pointer disabled:bg-neutral-light disabled:border-neutral-light disabled:text-neutral-medium disabled:cursor-default",
  variants: {
    size: {
      xs: "text-xs py-1 px-2",
      md: "text-sm py-2 px-4",
      lg: "text-base py-3 px-6",
      xl: "text-lg py-4 px-8",
      xxl: "text-xl py-5 px-10",
      square_xs: "text-xs h-4 w-4 p-1",
      square_sm: "text-sm h-6 w-6 p-1",
      square_md: "text-base h-8 w-8 p-1",
      square_lg: "text-lg h-10 w-10 p-1",
      square_xl: "text-xl h-12 w-12 p-1",
    },
    vPadding: {
      xs: "py-[4px]",
      sm: "py-[8px]",
      md: "py-[12px]",
      lg: "py-[16px]",
    },
    vSpace: {
      xs: "my-1",
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
    },
    HSpace: {
      xs: "mx-1",
      sm: "mx-2",
      md: "mx-4",
      lg: "mx-6",
    },
    align: {
      center: "mx-auto",
      right: "ml-auto",
      left: "mr-auto",
      top: "mb-auto",
      bottom: "mt-auto",
    },
    rounded: {
      none: "rounded-none",
      xs: "rounded-[2px]",
      sm: "rounded-[4px]",
      normal: "rounded-[8px]",
      lg: "rounded-[12px]",
      full: "rounded-full",
    },
    behavior: {
      block: "w-full",
    },
  },
});

export const solidButton = tv({
  extend: baseButton,
  variants: {
    color: {
      primary: "bg-primary-dark border-2 border-primary-dark hover:bg-primary-deep hover:border-primary-deep text-gray-100",
      secondary: "bg-secondary-dark border-2 border-secondary-dark hover:bg-secondary-deep hover:border-secondary-deep text-gray-100",
      accent: "bg-accent-dark border-2 border-accent-dark hover:bg-accent-deep hover:border-accent-deep text-gray-100",
      neutral: "bg-neutral-light border-2 border-neutral-light hover:bg-neutral-medium hover:border-neutral-medium text-neutral-deep",
      white: "bg-white border-2 border-white hover:bg-gray-100 hover:border-gray-100 text-accent-dark",
      black: "bg-black border-2 border-black hover:bg-gray-700 hover:border-gray-700 text-gray-100",
      gray: "bg-white border-2 border-white hover:bg-neutral-light hover:border-neutral-light text-neutral-dark",
    },
  },
});

export const outlineButton = tv({
  extend: baseButton,
  variants: {
    color: {
      primary: "bg-white hover:bg-gray-100 border-2 border-primary-dark text-neutral-deep",
      secondary: "bg-white hover:bg-gray-100 border-2 border-secondary-dark text-neutral-deep",
      accent: "bg-white hover:bg-gray-100 border-2 border-accent-dark shadow-none text-neutral-deep",
      neutral: "bg-neutral-light hover:bg-gray-100 border-2 border-neutral-dark text-neutral-deep",
      white: "bg-white hover:bg-gray-100 border-2 border-neutral-medium text-neutral-deep",
      black: "bg-white hover:bg-neutral-medium border-2 border-neutral-deep text-neutral-deep",
      gray: "bg-neutral-light hover:bg-neutral-medium border-2 border-neutral-deep text-neutral-deep",
    },
  },
});
