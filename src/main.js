import "./style.css";

import { createHeader, initHeader } from "./components/header.js";
import { createHero, initHero } from "./components/hero.js";
import { createWork, initWork } from "./components/work.js";
import { createTalk, initTalk } from "./components/talk.js";

import { createTalkScene } from "./three/talkScene.js";

import { projects } from "./data/projects.js";
import { createProjectPage } from "./pages/project.js";

const app = document.querySelector("#app");

const path = window.location.pathname;

const projectMatch = path.match(/^\/projeto\/([^/]+)\/?$/);

if (projectMatch) {
  const slug = projectMatch[1];

  const project = projects.find((item) => item.slug === slug);

  app.innerHTML = createProjectPage(project);
} else {
  document.body.insertAdjacentHTML("afterbegin", createHeader());

  app.innerHTML = `
    ${createHero()}

    <div
      id="work-talk"
      class="relative overflow-hidden bg-[#f8f7fa] dark:bg-[#101014]"
    >

      <div
        class="pointer-events-none absolute -right-[15%] top-[8%] z-0 h-[600px] w-[600px] rounded-full bg-[#ff3fa4]/[0.06] blur-[150px]"
      ></div>

      <div
        class="pointer-events-none absolute -left-[12%] top-[32%] z-0 h-[560px] w-[560px] rounded-full bg-[#3155ff]/[0.045] blur-[150px]"
      ></div>

      <div
        class="pointer-events-none absolute -right-[10%] top-[58%] z-0 h-[620px] w-[620px] rounded-full bg-[#9b6cff]/[0.045] blur-[160px]"
      ></div>

      <div
        class="pointer-events-none absolute bottom-[-8%] left-[8%] z-0 h-[580px] w-[580px] rounded-full bg-[#ff3fa4]/[0.045] blur-[160px]"
      ></div>

      <div class="relative z-10">
        ${createWork()}
        ${createTalk()}
      </div>

    </div>
  `;

  initHeader();
  initHero();
  initWork();
  initTalk();

  const talk3D = document.querySelector("#talk-3d");

  if (talk3D) {
    createTalkScene(talk3D);
  }
}
