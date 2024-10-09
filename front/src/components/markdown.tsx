import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function Markdown({
  markdownString,
}: {
  markdownString: string | undefined | null;
}) {
  if (markdownString === null || markdownString === undefined) return null;

  return (
    <div
      dangerouslySetInnerHTML={(() => ({
        // @ts-ignore
        __html: DOMPurify.sanitize(marked(markdownString)),
      }))()}
    />
  );
}
