import "../../global.css";
import { LayoutInterface } from "@/web/core/config";


export default function RootLayout({ children, params }: LayoutInterface) {
  return (
    <html
      lang={params.lang}
    >
        <body>{children}</body>
    </html>
  );
}
