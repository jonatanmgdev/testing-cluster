import { RenderBuilderContent } from "@/components/builder";
import { builder } from "@builder.io/sdk";


// Replace with your Public API Key
builder.init('a56dc66d9a69447090a545c15106250e');

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const model = "page";
  const content = await builder.get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML

      cache: false,
    })
    // Convert the result to a promise
    .toPromise();


  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={model} />
    </>
  );
}