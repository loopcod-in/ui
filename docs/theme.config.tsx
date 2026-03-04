import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

export default {
  logo: <span className="font-bold text-xl">@loopcod/ui</span>,
  project: {
    link: "https://github.com/loopcod-in/ui",
  },
  chat: {
    link: "https://twitter.com/loopcod",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  docsRepositoryBase: "https://github.com/loopcod-in/ui/blob/main/docs",
  footer: {
    text: "MIT 2026 © Loopcod",
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – @loopcod/ui",
      };
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="SaaS-focused UI components for React" />
      <meta name="og:title" content="@loopcod/ui" />
    </>
  ),
  primaryHue: 222,
  navbar: {
    extraContent: (
      <a
        href="https://www.npmjs.com/package/@loopcod/ui"
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        npm
      </a>
    ),
  },
};
