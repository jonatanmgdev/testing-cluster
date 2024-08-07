"use client";
import { forwardRef, useMemo } from "react";
import { type VariantProps } from "tailwind-variants";
import { TbLoader } from "react-icons/tb";
import { outlineButton, solidButton } from "./CommonButtonStyles";

// define all the button attributes
type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

// define the ref type
type Ref = HTMLButtonElement;

export type commonButtonStyles = VariantProps<typeof solidButton | typeof outlineButton>;

// extend the base button attributes
interface ButtonProps extends BaseButtonAttributes {
  isLoading?: boolean;
  disabled?: boolean;
  buttonAlign?: "center" | "right" | "left";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  buttonStyle?: commonButtonStyles;
  className?: string;
  buttonVariant?: "solid" | "outline" | "ghost";
  textClassName?: string;
}

export const CommonButton = forwardRef<Ref, ButtonProps>((props, ref) => {
  // destructure neccesary props
  const {
    type,
    children,
    buttonStyle,
    buttonAlign,
    buttonVariant = "solid",
    disabled = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    textClassName,
    ...rest
  } = props;

  let alignButton;

  switch (buttonAlign) {
    case "center":
      alignButton = "justify-center";
      break;
    case "right":
      alignButton = "justify-end";
      break;
    case "left":
      alignButton = "justify-start";
      break;
    default:
      alignButton = "justify-center";
      break;
  }

  // determine icon placement
  const { newIcon: icon, iconPlacement } = useMemo(() => {
    let newIcon = rightIcon || leftIcon;

    if (isLoading) {
      newIcon = <TbLoader className="animate-spin" size={25} />;
    }

    return {
      newIcon,
      iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, leftIcon, rightIcon]);

  const renderButtonVariant = () => {
    if (buttonVariant === "solid") {
      return solidButton({ ...buttonStyle, className });
    }
    if (buttonVariant === "outline") {
      return outlineButton({ ...buttonStyle, className });
    }
  };

  return (
    <button
      className={renderButtonVariant()}
      {...rest}
      type={type ? "submit" : "button"}
      ref={ref}
      disabled={disabled || isLoading}
    >
      <div className={`flex w-full h-full items-center ${alignButton}`}>
      {/** render icon before */}
      {icon && iconPlacement === "left" ? (
        <span className={`inline-flex shrink-0 justify-start ${icon ? "pr-2" : ""} ${children && !isLoading}`}>{icon}</span>
      ) : null}

      {/** hide button text during loading state */}
      {!isLoading && children}

      {/** render icon after */}
      {icon && iconPlacement === "right" ? (
        <span className={`inline-flex shrink-0 justify-end ${icon ? "pl-2" : ""} ${textClassName ? textClassName : ""} ${children && !isLoading}`}>{icon}</span>
      ) : null}
      </div>

    </button>
  );
});

// set displayName
CommonButton.displayName = "CommonButton";
