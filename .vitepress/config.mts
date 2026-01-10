import { defineConfig, UserConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const vitePressOptions: UserConfig = {
  srcDir: "site",

  title: "Studenti Marconi",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Social", link: "/social.md" },
      { text: "Chi Siamo", link: "/about.md" },
      //{ text: "Wiki", link: "/wiki" },
      { text: "MarconiCraft", link: "/marconicraft" },
      { text: "Mappa", link: "https://map.studentimarconi.org" },
      { text: "Apps", link: "https://apps.marconivr.it" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/StudentiMarconi/StudentiMarconi.github.io",
      },
      { icon: "signal", link: "https://example.com" },
      { icon: "discord", link: "https://example.com" },
      { icon: "telegram", link: "https://example.com" },
      { icon: "whatsapp", link: "https://example.com" },
    ],
    footer: {
      message: "For All Time. Always.",
    },

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Cerca",
                buttonAriaLabel: "Cerca",
              },
              modal: {
                displayDetails: "Mostra dettagli",
                resetButtonTitle: "Resetta",
                backButtonTitle: "Indietro",
                noResultsText: "Nessun risultato per",
                footer: {
                  selectText: "per selezionare",
                  selectKeyAriaLabel: "invio",
                  navigateText: "per navigare",
                  navigateUpKeyAriaLabel: "su",
                  navigateDownKeyAriaLabel: "giù",
                  closeText: "per chiudere",
                  closeKeyAriaLabel: "esc",
                },
              },
            },
          },
        },
      },
    },

    lastUpdated: { text: "Ultimo aggiornamento" },

    outline: {
      label: "In questa pagina",
    },

    docFooter: {
      prev: "Pagina precedente",
      next: "Pagina successiva",
    },

    darkModeSwitchLabel: "Tema",
    darkModeSwitchTitle: "Cambia in tema scuro",
    lightModeSwitchTitle: "Cambia in tema chiaro",
    returnToTopLabel: "Torna all'inizio",
    skipToContent: "Vai al contenuto",
  },
};

const vitePressSidebarOptions = [
  {
    documentRootPath: "site",
    scanStartPath: "wiki",
    resolvePath: "/wiki/",
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    collapsed: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
  {
    documentRootPath: "site",
    scanStartPath: "marconicraft",
    resolvePath: "/marconicraft/",
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    collapsed: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
];

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
);
