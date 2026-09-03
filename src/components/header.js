export function createHeader() {
  return `
    <header
      id="site-header"
      class="absolute left-0 top-0 z-[100] w-full bg-transparent px-8 py-7 md:px-12 lg:px-16"
    >

      <div class="flex w-full items-center justify-between">

        <a
          href="#inicio"
          aria-label="Fernanda Ferreira"
          class="leading-none"
        >
          <span
            class="font-oswald text-[30px] font-bold tracking-[-0.05em] dark:text-[#f8f7fa]"
          >
            FF
          </span><span class="text-[35px] text-[#ff3fa4]">.</span>
        </a>


        <nav class="hidden items-center gap-12 md:flex">

          <a
            href="#work"
            class="text-[11px] font-bold uppercase tracking-[0.22em] text-[#101014] transition-opacity hover:opacity-50 dark:text-[#f8f7fa]"
          >
            Work
          </a>

          <a
            href="#talk"
            class="text-[11px] font-bold uppercase tracking-[0.22em] text-[#101014] transition-opacity hover:opacity-50 dark:text-[#f8f7fa]"
          >
            Talk
          </a>


          <button
            type="button"
            id="theme-toggle"
            aria-label="Ativar modo noturno"
            aria-pressed="false"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-[#101014] transition-all duration-300 hover:scale-105 dark:border-white/20 dark:text-[#f8f7fa]"
          >
            <span
              id="theme-icon"
              class="text-[16px] leading-none"
            >
              ☾
            </span>
          </button>

        </nav>


        <div class="flex items-center gap-3 md:hidden">

          <button
            type="button"
            id="theme-toggle-mobile"
            aria-label="Ativar modo noturno"
            aria-pressed="false"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-[#101014] transition-all duration-300 hover:scale-105 dark:border-white/20 dark:text-[#f8f7fa]"
          >
            <span
              id="theme-icon-mobile"
              class="text-[15px] leading-none"
            >
              ☾
            </span>
          </button>


          <button
            type="button"
            id="mobile-menu-button"
            aria-label="Abrir menu"
            aria-expanded="false"
            class="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-black/15 dark:border-white/20"
          >
            <span
              class="h-px w-4 bg-[#101014] dark:bg-[#f8f7fa]"
            ></span>

            <span
              class="h-px w-4 bg-[#101014] dark:bg-[#f8f7fa]"
            ></span>
          </button>

        </div>

      </div>


      <div
        id="mobile-menu"
        class="pointer-events-none absolute right-8 top-20 w-52 translate-y-[-10px] rounded-2xl border border-black/10 bg-[#f8f7fa]/95 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-[#101014]/95 md:hidden"
      >

        <nav class="flex flex-col gap-5">

          <a
            href="#work"
            class="mobile-link text-[11px] font-bold uppercase tracking-[0.2em] text-[#101014] dark:text-[#f8f7fa]"
          >
            Work
          </a>

          <a
            href="#talk"
            class="mobile-link text-[11px] font-bold uppercase tracking-[0.2em] text-[#101014] dark:text-[#f8f7fa]"
          >
            Talk
          </a>

        </nav>

      </div>

    </header>
  `;
}

export function initHeader() {
  const button = document.querySelector("#mobile-menu-button");

  const menu = document.querySelector("#mobile-menu");

  const themeToggle = document.querySelector("#theme-toggle");

  const themeToggleMobile = document.querySelector("#theme-toggle-mobile");

  const themeIcon = document.querySelector("#theme-icon");

  const themeIconMobile = document.querySelector("#theme-icon-mobile");

  if (button && menu) {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));

      menu.classList.toggle("opacity-0", isOpen);

      menu.classList.toggle("pointer-events-none", isOpen);

      menu.classList.toggle("translate-y-[-10px]", isOpen);

      menu.classList.toggle("translate-y-0", !isOpen);
    });

    document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        button.setAttribute("aria-expanded", "false");

        menu.classList.add(
          "pointer-events-none",
          "opacity-0",
          "translate-y-[-10px]",
        );

        menu.classList.remove("translate-y-0");
      });
    });
  }

  const updateTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    const icon = isDark ? "☀" : "☾";

    if (themeIcon) {
      themeIcon.textContent = icon;
    }

    if (themeIconMobile) {
      themeIconMobile.textContent = icon;
    }

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar modo claro" : "Ativar modo noturno",
      );
    }

    if (themeToggleMobile) {
      themeToggleMobile.setAttribute("aria-pressed", String(isDark));

      themeToggleMobile.setAttribute(
        "aria-label",
        isDark ? "Ativar modo claro" : "Ativar modo noturno",
      );
    }
  };

  const savedTheme = localStorage.getItem("fernanda-theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }

  updateTheme();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("fernanda-theme", isDark ? "dark" : "light");

    updateTheme();
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
}
