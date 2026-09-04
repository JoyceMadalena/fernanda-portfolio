export function createHero() {
  return `
    <section
      id="inicio"
      class="relative h-[220vh] bg-[#f8f7fa] dark:bg-[#101014]"
    >

      <div
        id="hero-stage"
        class="fixed left-0 top-0 z-0 h-screen w-full"
      >

        <div
          id="hero-3d"
          class="pointer-events-none absolute inset-0"
        ></div>

        <div
          class="pointer-events-none relative z-10 mx-auto flex h-screen w-full max-w-[1440px] items-center px-8 md:px-12 lg:px-16"
        >

          <div class="w-full max-w-[900px] pt-8">

            <div class="mb-8 flex items-center gap-3">

              <span
                class="h-2 w-2 rounded-full bg-[#ff3fa4]"
              ></span>

              <span
                class="text-[10px] font-bold uppercase tracking-[0.28em] text-[#77747d] dark:text-[#aaa7b0]"
              >
                digital experiences
              </span>

            </div>

            <h1
              class="font-title max-w-[1000px] text-[clamp(4rem,8.5vw,9.5rem)] font-black uppercase leading-[0.8] tracking-[-0.08em] text-[#101014] dark:text-[#f8f7fa] md:max-w-[820px] lg:max-w-[900px] xl:max-w-[1000px]"
            >
              Fernanda<br />
              Ferreira<span class="text-[#ff3fa4]">.</span>
            </h1>

            <div
              class="mt-12 max-w-[390px] lg:max-w-[350px] xl:max-w-[390px]"
            >

              <p
                class="mb-5 bg-gradient-to-r from-[#3155ff] via-[#9b6cff] via-[40%] to-[#ff3fa4] bg-clip-text text-[11px] font-bold uppercase tracking-[0.28em] text-transparent"
              >
                Product Designer
              </p>

              <p
                class="max-w-[340px] text-[15px] leading-7 text-[#68656e] dark:text-[#aaa7b0] md:text-[16px] xl:max-w-[360px] xl:text-[17px]"
              >
                Design adds value faster than it adds cost. <br>
                (Thomas C. Gale)
              </p>

            </div>

            <div
              class="hero-scroll absolute bottom-14 left-8 flex items-center gap-4 md:left-12 lg:left-16"
            >

              <div
                class="relative h-20 w-px bg-black/15 dark:bg-white/15"
              >

                <span
                  class="scroll-dot absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-[#ff3fa4]"
                ></span>

              </div>

              <span
                class="text-[8px] font-bold uppercase tracking-[0.35em] text-[#101014] dark:text-[#f8f7fa]"
                style="writing-mode: vertical-rl;"
              >
                Scroll
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}

export function initHero() {
  const container = document.querySelector("#hero-3d");
  const heroStage = document.querySelector("#hero-stage");
  const workSection = document.querySelector("#work");

  if (!container) {
    return;
  }

  const loadScene = async () => {
    try {
      const { createHeroScene } = await import("../three/heroScene.js");

      createHeroScene(container);
    } catch (error) {
      console.error("Erro ao carregar a cena 3D:", error);
    }
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadScene, {
      timeout: 1200,
    });
  } else {
    setTimeout(loadScene, 300);
  }

  if (heroStage && workSection) {
    const workObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroStage.classList.add("hero-stage-hidden");
          } else {
            heroStage.classList.remove("hero-stage-hidden");
          }
        });
      },
      {
        threshold: 0.01,
      },
    );

    workObserver.observe(workSection);
  }
}
