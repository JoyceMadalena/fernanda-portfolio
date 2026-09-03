export function createTalk() {
  return `
    <section
      id="talk"
      class="relative min-h-[900px] bg-transparent px-8 pb-20 pt-32 md:px-12 md:pb-24 md:pt-40 lg:px-16"
    >

      <div
        id="talk-3d"
        class="pointer-events-none absolute inset-0 z-10"
      ></div>

      <div
        class="relative z-30 mx-auto w-full max-w-[1440px]"
      >

        <div class="relative">

            <div class="say-hi-bubble pointer-events-none absolute right-[35%] top-0">
            <div
              class="group relative flex h-[108px] w-[108px] items-center justify-center rounded-full border border-white/80 bg-[radial-gradient(circle_at_32%_25%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_12%,rgba(255,63,164,0.16)_38%,rgba(155,108,255,0.12)_68%,rgba(248,247,250,0.8)_100%)] shadow-[inset_-8px_-10px_20px_rgba(155,108,255,0.10),inset_7px_7px_18px_rgba(255,255,255,0.95),0_12px_30px_rgba(40,30,60,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[inset_-10px_-12px_24px_rgba(155,108,255,0.14),inset_8px_8px_20px_rgba(255,255,255,1),0_18px_40px_rgba(255,63,164,0.16)]"
            >

              <span
                class="absolute left-[20px] top-[15px] h-[13px] w-[24px] rotate-[-25deg] rounded-full bg-white/70 blur-[4px] transition-all duration-500 group-hover:left-[18px] group-hover:top-[13px] group-hover:bg-white/90"
              ></span>

              <span
                class="relative z-10 text-[9px] font-bold uppercase tracking-[0.22em] text-[#101014]"
              >
                Say Hi!
              </span>

            </div>

          </div>


          <div
            class="grid min-h-[610px] items-center gap-16 md:grid-cols-[1fr_0.7fr] md:gap-16 lg:grid-cols-[1fr_0.7fr] lg:gap-24"
          >

            <div
              class="talk-parallax-content max-w-[650px]"
            >

              <div class="mb-6 flex items-center gap-3">

                <span
                  class="h-2 w-2 rounded-full bg-[#ff3fa4]"
                ></span>

                <span
                  class="text-[10px] font-bold uppercase tracking-[0.32em] text-[#77747d] dark:text-[#aaa7b0]"
                >
                  Let's Talk
                </span>

              </div>


              <h2
                class="font-title text-[clamp(6rem,12vw,11rem)] uppercase leading-[0.78] tracking-[-0.02em] text-[#101014] dark:text-[#f8f7fa]"
              >
                Talk<span class="text-[#ff3fa4]">.</span>
              </h2>


              <a
              href="https://www.linkedin.com/in/fernanda-eziquiel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="mt-10 flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-[#101014] transition-all duration-300 hover:scale-105 hover:text-[#ff3fa4] dark:border-white/20 dark:text-[#f8f7fa]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6.5 8.5H3.5V20h3V8.5ZM5 3C3.9 3 3 3.9 3 5s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 13.4c0-3.5-1.9-5.1-4.4-5.1-2 0-2.9 1.1-3.4 1.8V8.5h-3V20h3v-6.4c0-1.7.3-3.4 2.4-3.4 2 0 2 1.9 2 3.5V20h3v-6.6Z"
                />
              </svg>
            </a>
            </div>


            <div
              class="talk-parallax-image relative mx-auto w-full max-w-[390px] md:ml-auto md:mr-6 lg:mr-12"
            >

              <div
                class="relative aspect-[0.78/1] bg-white p-[10px] shadow-[0_25px_55px_rgba(0,0,0,0.10)]"
              >

                <img
                  src="/images/fernanda.jpg"
                  alt="Fernanda Ezequiel"
                  class="h-full w-full object-cover"
                />

              </div>

            </div>

          </div>

        </div>


        <footer
          class="mt-20 border-t border-black/10 pt-6 dark:border-white/10"
        >

          <div
            class="flex flex-col gap-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#77747d] dark:text-[#aaa7b0] md:flex-row md:items-center md:justify-between"
          >

            <span>
              © ${new Date().getFullYear()} Fernanda Ezequiel
            </span>

            <span>
              Product Designer
            </span>

          </div>

        </footer>

      </div>

    </section>
  `;
}

export function initTalk() {
  const section = document.querySelector("#talk");

  if (!section) {
    return;
  }

  const content = section.querySelector(".talk-parallax-content");

  const image = section.querySelector(".talk-parallax-image");

  if (!content || !image) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          content.classList.add("talk-enter");

          setTimeout(() => {
            image.classList.add("talk-enter");
          }, 120);

          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  observer.observe(section);
}
