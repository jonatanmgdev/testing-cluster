import { FC } from "react";
import Link from "next/link";

interface CommonSuccessScreenProps {
  linkText: string;
  additionalContent?: JSX.Element;
  linkClasses?: string;
  href: string;
}

/**
 * Renders a success screen with a message and a link.
 *
 * @param {CommonSuccessScreenProps} props - The props object containing the following properties:
 *   - linkText: The text to display on the link.
 *   - additionalContent: Additional content to display below the message.
 *   - linkClasses: The CSS classes to apply to the link.
 *   - href: The URL to navigate to when the link is clicked.
 * @return {JSX.Element} The rendered success screen.
 */
export const CommonSuccessScreen: FC<CommonSuccessScreenProps> = ({
  linkText,
  additionalContent,
  linkClasses,
  href,
}): JSX.Element => {
  return (
    <div className="flex flex-col justify-center text-center gap-8">
      <h3 className="font-eufoniem">¡Formulario enviado con éxito!</h3>
      <p>Te contactaremos con la mayor brevedad posible.</p>
      <div className="flex justify-center">
        {/* <Link href={href} className={linkClasses}>
          {linkText}
        </Link> */}
      </div>
      {additionalContent}
    </div>
  );
};
