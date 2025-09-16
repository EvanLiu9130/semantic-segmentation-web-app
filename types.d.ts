// This file provides type definitions for modules imported from a CDN.
// This tells TypeScript what the shape of the 'marked' module is,
// resolving the "Cannot find module" error.

declare module 'https://esm.sh/marked@^13.0.2' {
  /**
   * Options for the marked parser.
   */
  interface MarkedOptions {
    /**
     * Enable GFM line breaks.
     */
    breaks?: boolean;
    /**
     * Enable GitHub Flavored Markdown.
     */
    gfm?: boolean;
    [key: string]: any;
  }

  /**
   * Compiles a string of markdown to HTML.
   * @param markdownString A string of markdown.
   * @param options Hash of options.
   */
  export function parse(markdownString: string, options?: MarkedOptions): string;
}
