const projects = [
  {
    slug: "a-place-to-eat",
    number: "01",
    category: "UX / UI DESIGN",
    title: "A Place to Eat",
    images: ["/images/aplace-to-eat-01.jpg"],
  },
  {
    slug: "a-lojinha",
    number: "02",
    category: "E-COMMERCE",
    title: "A LOJINHA",
    images: [
      "/images/a-lojinha-01.jpg",
      "/images/a-lojinha-02.jpg",
      "/images/a-lojinha-03.jpg",
      "/images/a-lojinha-04.jpg",
      "/images/a-lojinha-05.jpg",
      "/images/a-lojinha-06.jpg",
      "/images/a-lojinha-07.jpg",
    ],
  },
  {
    slug: "bikejump",
    number: "03",
    category: "UX / UI DESIGN",
    title: "BIKEJUMP",
    images: [
      "/images/bikeapp-01.jpg",
      "/images/bikeapp-02.jpg",
      "/images/bikeapp-03.jpg",
      "/images/bikeapp-04.jpg",
      "/images/bikeapp-05.jpg",
      "/images/bikeapp-06.jpg",
      "/images/bikeapp-07.jpg",
    ],
  },
  {
    slug: "prestons-mosque",
    number: "04",
    category: "IDENTIDADE VISUAL",
    title: "PRESTON'S MOSQUE",
    images: ["/images/preston-01.jpg", "/images/preston-02.jpg"],
  },
  {
    slug: "hortus-conclusus",
    number: "05",
    category: "BRANDING",
    title: "HORTUS CONCLUSUS",
    images: [
      "/images/hortus-conclusus-01.jpg",
      "/images/hortus-conclusus-02.jpg",
      "/images/hortus-conclusus-03.jpg",
      "/images/hortus-conclusus-04.jpg",
      "/images/hortus-conclusus-05.jpg",
      "/images/hortus-conclusus-06.jpg",
      "/images/hortus-conclusus-07.jpg",
    ],
  },
  {
    slug: "mimar",
    number: "06",
    category: "APP DESIGN",
    title: "MIMAR",
    images: ["/images/mimar-01.jpg", "/images/mimar-02.jpg"],
  },
  {
    slug: "hold-my-pawn",
    number: "07",
    category: "UX / UI DESIGN",
    title: "HOLD MY PAWN",
    images: ["/images/hold-my-pawn-01.jpg"],
  },
  {
    slug: "sos-frete",
    number: "08",
    category: "EXPERIÊNCIA DE MARCA",
    title: "SOS FRETE",
    images: ["/images/sos-frete-01.jpg"],
  },
  {
    slug: "where2go",
    number: "09",
    category: "APP DESIGN",
    title: "WHERE2GO",
    images: ["/images/where2go-01.jpg", "/images/where2go-02.jpg"],
  },
];

export function createWork() {
  return `
    <section
      id="work"
      class="relative bg-transparent px-8 pb-32 pt-32 md:px-12 md:pb-40 md:pt-40 lg:px-16"
    >

      <div class="relative z-10 mx-auto w-full max-w-[1440px]">

        <div class="mb-16">

          <div class="mb-6 flex items-center gap-3">

            <span class="h-2 w-2 rounded-full bg-[#ff3fa4]"></span>

            <span
              class="text-[10px] font-bold uppercase tracking-[0.32em] text-[#77747d] dark:text-[#aaa7b0]"
            >
              Selected Work
            </span>

          </div>

          <h2
            class="font-title text-[clamp(6rem,13vw,12rem)] uppercase leading-[0.78] tracking-[-0.02em] text-[#101014] dark:text-[#f8f7fa]"
          >
            Work<span class="text-[#ff3fa4]">.</span>
          </h2>

          <p
            class="mt-8 max-w-[520px] text-[15px] leading-7 text-[#68656e] dark:text-[#aaa7b0] md:text-[16px]"
          >
          </p>

        </div>


        <div class="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">

          ${projects
            .map(
              (project, index) => `
                <a
                  href="/projeto/${project.slug}"
                  class="work-card group block"
                  data-project-index="${index}"
                >

                  <div
                    class="relative aspect-[1.42/1] w-full overflow-hidden rounded-[7px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-transform duration-500 dark:bg-[#18181e] dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)] group-hover:-translate-y-1"
                  >

                    ${project.images
                      .map(
                        (image, imageIndex) => `
                          <img
                            src="${image}"
                            alt="${project.title}"
                            class="project-image absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                              imageIndex === 0 ? "opacity-100" : "opacity-0"
                            }"
                            data-image-index="${imageIndex}"
                          />
                        `,
                      )
                      .join("")}

                  </div>


                  <div class="mt-4 flex items-start justify-between gap-4">

                    <div class="min-w-0">

                      <p
                        class="mb-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#77747d] dark:text-[#aaa7b0]"
                      >
                        ${project.category}
                      </p>

                      <h3
                        class="font-title text-[24px] uppercase leading-[0.9] tracking-[-0.01em] text-[#101014] transition-colors duration-300 dark:text-[#f8f7fa] group-hover:text-[#ff3fa4]"
                      >
                        ${project.title}
                      </h3>

                    </div>


                    <span
                      class="shrink-0 pt-1 text-[8px] font-semibold tracking-[0.15em] text-[#99969e] dark:text-[#77747d]"
                    >
                      ${project.number}
                    </span>

                  </div>

                </a>
              `,
            )
            .join("")}

        </div>

      </div>

    </section>
  `;
}

export function initWork() {
  const cards = document.querySelectorAll(".work-card");

  if (!cards.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("work-card--visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  cards.forEach((card, cardIndex) => {
    const images = card.querySelectorAll(".project-image");

    if (images.length <= 1) {
      return;
    }

    let currentIndex = 0;

    setInterval(
      () => {
        images[currentIndex].classList.remove("opacity-100");
        images[currentIndex].classList.add("opacity-0");

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].classList.remove("opacity-0");
        images[currentIndex].classList.add("opacity-100");
      },
      3000 + cardIndex * 180,
    );
  });
}
