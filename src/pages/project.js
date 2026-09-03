import { projects } from "../data/projects.js";

export function createProjectPage(project) {
  if (!project) {
    return `
      <main class="min-h-screen bg-[#f8f7fa]">

        <header
          class="absolute left-0 top-0 z-[100] w-full bg-transparent px-8 py-7 md:px-12 lg:px-16"
        >
          <div class="flex w-full items-center justify-between">

            <a
              href="/"
              aria-label="Fernanda Ferreira"
              class="leading-none"
            >
              <span class="font-oswald text-[30px] font-bold tracking-[-0.05em]">
                FF
              </span><span class="text-[35px] text-[#ff3fa4]">.</span>
            </a>

            <a
              href="/#work"
              class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d] transition-transform duration-300 hover:-translate-x-1"
            >
              ← Back to Work
            </a>

          </div>
        </header>


        <section class="px-8 pb-20 pt-8 md:px-12 lg:px-16">

          <div class="mx-auto max-w-[1440px]">

            <div class="flex min-h-[70vh] items-center">

              <div>

                <p
                  class="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d]"
                >
                  Page not found
                </p>

                <h1
                  class="font-title text-[clamp(6rem,12vw,12rem)] uppercase leading-[0.78] tracking-[-0.02em]"
                >
                  404<span class="text-[#ff3fa4]">.</span>
                </h1>

                <a
                  href="/#work"
                  class="mt-10 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d]"
                >
                  ← Back to Work
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>
    `;
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return `
    <main class="min-h-screen bg-[#f8f7fa]">

      <header
        class="absolute left-0 top-0 z-[100] w-full bg-transparent px-8 py-7 md:px-12 lg:px-16"
      >

        <div class="flex w-full items-center justify-between">

          <a
            href="/"
            aria-label="Fernanda Ferreira"
            class="leading-none"
          >
            <span class="font-oswald text-[30px] font-bold tracking-[-0.05em]">
              FF
            </span><span class="text-[35px] text-[#ff3fa4]">.</span>
          </a>


          <a
            href="/#work"
            class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d] transition-transform duration-300 hover:-translate-x-1"
          >
            ← Back to Work
          </a>

        </div>

      </header>


      <section class="px-8 pb-20 pt-8 md:px-12 lg:px-16">

        <div class="mx-auto max-w-[1440px]">


          <div
            class="grid min-h-[720px] items-center gap-16 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
          >


            <div>

              <div class="mb-7 flex items-center gap-3">

                <span class="h-2 w-2 rounded-full bg-[#ff3fa4]"></span>

                <span
                  class="text-[10px] font-bold uppercase tracking-[0.32em] text-[#77747d]"
                >
                  ${project.category}
                </span>

              </div>


              <div
                class="mb-7 text-[10px] font-bold tracking-[0.2em] text-[#99969e]"
              >
                ${project.number} / 09
              </div>


              <h1
                class="font-title max-w-[700px] text-[clamp(6rem,10vw,12rem)] uppercase leading-[0.76] tracking-[-0.02em]"
              >
                ${project.title}<span class="text-[#ff3fa4]">.</span>
              </h1>


              <p
                class="mt-10 max-w-[430px] text-[15px] leading-8 text-[#68656e] md:text-[16px]"
              >
                ${project.description}
              </p>

            </div>


            <div>

              <div
                class="overflow-hidden rounded-[7px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
              >

                <img
                  src="${project.images[0]}"
                  alt="${project.title}"
                  class="block h-auto w-full"
                />

              </div>

            </div>


          </div>

        </div>

      </section>


      <section
        class="px-8 pb-32 md:px-12 lg:px-16"
      >

        <div class="mx-auto max-w-[1200px]">

          <div
            class="grid gap-16 md:grid-cols-[0.4fr_1fr] md:gap-24"
          >

            <div>

              <p
                class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d]"
              >
                Project Overview
              </p>

            </div>


            <div>

              <h2
                class="font-title text-[clamp(4rem,7vw,7rem)] uppercase leading-[0.8] tracking-[-0.02em]"
              >
                The<br />
                Project<span class="text-[#ff3fa4]">.</span>
              </h2>


              <p
                class="mt-10 max-w-[650px] text-[15px] leading-8 text-[#68656e] md:text-[17px]"
              >
                ${project.description}
              </p>

            </div>

          </div>

        </div>

      </section>


      ${
        project.images.length > 1
          ? `
            <section
              class="px-8 pb-32 md:px-12 lg:px-16"
            >

              <div class="mx-auto max-w-[1100px]">

                <div
                  class="grid grid-cols-1 items-center justify-items-center gap-10 sm:grid-cols-2"
                >

                  ${project.images
                    .slice(1)
                    .map(
                      (image, index) => `
                        <div
                          class="flex w-fit max-w-full items-center justify-center bg-white p-[10px] shadow-[0_25px_55px_rgba(0,0,0,0.10)]"
                        >

                          <img
                            src="${image}"
                            alt="${project.title} — ${index + 2}"
                            class="block h-auto max-h-[650px] max-w-full w-auto object-contain"
                          />

                        </div>
                      `,
                    )
                    .join("")}

                </div>

              </div>

            </section>
          `
          : ""
      }


      <section
        class="px-8 pb-24 pt-20 md:px-12 lg:px-16"
      >

        <div class="mx-auto max-w-[1440px]">

          <div class="border-t border-black/10 pt-10">

            <div
              class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            >

              <div>

                <p
                  class="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d]"
                >
                  Next Project
                </p>


                <a
                  href="/projeto/${nextProject.slug}"
                  class="group block"
                >

                  <h2
                    class="font-title text-[clamp(4rem,8vw,8rem)] uppercase leading-[0.78] tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-3"
                  >
                    ${nextProject.title}<span class="text-[#ff3fa4]">.</span>
                  </h2>

                </a>

              </div>


              <a
                href="/#work"
                class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#77747d]"
              >
                All Work
              </a>

            </div>

          </div>


          <footer class="mt-20 border-t border-black/10 pt-6">

            <div
              class="flex flex-col gap-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#77747d] md:flex-row md:items-center md:justify-between"
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

    </main>
  `;
}
