// === Select elements ===
const buttons = document.querySelectorAll(".buttons button");
const parts = document.querySelectorAll(".part");
const brainContainer = document.querySelector(".brain-container");
const infoBox = document.querySelector(".info-box");

// === Brain part data ===
const brainInfo = {
  HPP: {
    title: "HPP — Human Perceptual Processor",
    text: "Processes sensory input (visual and auditory). Responsible for perception of shapes, lines, and immediate environment."
  },
  HCP: {
    title: "HCP — Human Cognitive Processor",
    text: "Performs reasoning, planning, problem-solving, and decision-making functions."
  },
  HMP: {
    title: "HMP — Human Motor Processor",
    text: "Translates thought into physical movement by coordinating muscles."
  },
  STM: {
    title: "STM — Short Term Memory",
    text: "Temporarily stores information for short periods during active tasks."
  },
  SM: {
    title: "SM — Sensory Memory",
    text: "Briefly holds sensory impressions before further cognitive processing."
  },
  LTM: {
    title: "LTM — Long Term Memory",
    text: "Stores experiences, skills, and knowledge for extended periods."
  },
  PS: {
    title: "PS — Problem Solving / Perceptual Store",
    text: "Integrates sensory input for reasoning and complex thought."
  }
};

// === Restore last active brain part from localStorage ===
window.addEventListener("load", () => {
  const savedPart = localStorage.getItem("activePart");
  if (savedPart) activatePart(savedPart);
});

// === Button click event ===
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    activatePart(target);
    localStorage.setItem("activePart", target);
  });
});

// === Hover events for brain parts ===
parts.forEach((part) => {
  part.addEventListener("mouseenter", () => {
    const id = part.id;
    showInfo(id); // Show info when hovered
    part.classList.add("hovered");
  });

  part.addEventListener("mouseleave", () => {
    const savedPart = localStorage.getItem("activePart");
    part.classList.remove("hovered");
    if (savedPart) showInfo(savedPart); // Return to saved info
    else clearInfo(); // Clear if nothing saved
  });

  // === Optional: click also selects that part ===
  part.addEventListener("click", () => {
    const id = part.id;
    activatePart(id);
    localStorage.setItem("activePart", id);
  });
});

// === Highlight and show info for selected part ===
function activatePart(id) {
  parts.forEach((p) => p.classList.remove("active"));
  buttons.forEach((b) => b.classList.remove("active"));

  const part = document.getElementById(id);
  const btn = document.querySelector(`button[data-target="${id}"]`);
  if (part) part.classList.add("active");
  if (btn) btn.classList.add("active");
  showInfo(id);
}

// === Show info text ===
function showInfo(id) {
  if (brainInfo[id]) {
    infoBox.innerHTML = `
      <h3>${brainInfo[id].title}</h3>
      <p>${brainInfo[id].text}</p>
    `;
  }
}

// === Clear info text (default view) ===
function clearInfo() {
  infoBox.innerHTML = `
    <h3>Hover or click on a part of the brain</h3>
    <p>Details will appear here.</p>
  `;
}

// === Click outside to clear highlights and info ===
document.addEventListener("click", (e) => {
  if (
    !brainContainer.contains(e.target) &&
    !document.querySelector(".buttons").contains(e.target)
  ) {
    clearAll();
  }
});

// === Clear everything (no selection) ===
function clearAll() {
  parts.forEach((p) => p.classList.remove("active"));
  buttons.forEach((b) => b.classList.remove("active"));
  localStorage.removeItem("activePart");
  clearInfo();
}
