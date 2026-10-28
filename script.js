const amountDetails = {
  baby: {
    label: "Dos 6 meses até 3 anos",
    amount: "1/2 grão de arroz",
    description: "Use creme dental com flúor nessa quantidade. Depois, peça para a criança cuspir o excesso, sem enxaguar com água.",
    image: "assets/amount-baby.jpg",
    alt: "Ilustração da porção de creme dental de meio grão de arroz"
  },
  child: {
    label: "Dos 3 aos 6 anos",
    amount: "1 grão de arroz",
    description: "O quadro do PDF indica essa quantidade. Depois da escovação, a criança deve cuspir o excesso, sem enxaguar com água.",
    image: "assets/amount-child.jpg",
    alt: "Ilustração da porção de creme dental de um grão de arroz"
  },
  older: {
    label: "A partir dos 6 anos",
    amount: "1 grão de ervilha",
    description: "Use creme dental com flúor do tamanho de um grão de ervilha e mantenha o tubo fora do alcance das crianças.",
    image: "assets/amount-older.jpg",
    alt: "Ilustração da porção de creme dental de um grão de ervilha"
  },
  never: {
    label: "Uma porção pequena é suficiente",
    amount: "Nunca exagere",
    description: "O quadro ilustrado alerta para não colocar creme dental em excesso na escova.",
    image: "assets/amount-never.jpg",
    alt: "Ilustração do aviso para nunca exagerar na quantidade de creme dental"
  }
};

const amountButtons = document.querySelectorAll(".age-option");
const amountResult = document.querySelector(".amount-result");
const amountLabel = document.querySelector("#amount-label");
const amountValue = document.querySelector("#amount-value");
const amountDescription = document.querySelector("#amount-description");
const amountIllustration = document.querySelector("#amount-illustration");

amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const detail = amountDetails[button.dataset.amount];
    if (!detail) return;

    amountButtons.forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });

    amountLabel.textContent = detail.label;
    amountValue.textContent = detail.amount;
    amountDescription.textContent = detail.description;
    amountIllustration.src = detail.image;
    amountIllustration.alt = detail.alt;
    amountResult.classList.remove("is-changing");
    requestAnimationFrame(() => amountResult.classList.add("is-changing"));
  });
});

const traumaSteps = [
  {
    kicker: "Primeiro, respire",
    title: "Mantenha a calma",
    text: "A criança pode estar assustada ou com dor. Tranquilize-a: esse é o primeiro passo para conseguir avaliar melhor a situação."
  },
  {
    kicker: "Observe com cuidado",
    title: "Identifique o tipo de dente",
    text: "O dente de leite começa a ser trocado por volta dos 6 anos. O dente permanente aparece por volta dos 6 anos e permanece por toda a vida."
  },
  {
    kicker: "Atenção importante",
    title: "Nunca reimplante dente de leite",
    text: "Se um dente de leite sair por inteiro, não tente colocá-lo de volta: isso pode afetar o dente permanente que está se formando.",
    callout: "Nunca reimplante um dente de leite."
  },
  {
    kicker: "Se o permanente saiu por inteiro",
    title: "Cuide do dente e procure atendimento",
    text: "Pegue o dente pela coroa (parte branca), nunca pela raiz. Se estiver sujo, lave rapidamente com soro fisiológico ou água limpa, sem esfregar. O PDF orienta tentar reimplantá-lo com cuidado ou guardá-lo em leite, soro fisiológico ou na saliva da própria criança, dentro de um potinho. Procure imediatamente um dentista ou pronto-socorro — idealmente, em até 1 hora do trauma."
  },
  {
    kicker: "Se o dente quebrou",
    title: "Guarde o pedaço, se possível",
    text: "Procure o pedaço do dente e leve-o ao dentista. Mesmo pequenas fraturas devem ser avaliadas; pode haver risco de infecção."
  },
  {
    kicker: "Continue observando",
    title: "Fique atento aos sinais após o trauma",
    text: "Mesmo que o dente pareça bem, observe mudança de cor (ficar escuro), dor ao mastigar, inchaço ou secreção na gengiva e mobilidade persistente. Esses sinais devem ser avaliados por um dentista.",
    callout: "Leve sempre a criança ao dentista após qualquer trauma, mesmo sem dor ou sangramento."
  }
];

let currentStep = 0;
const stepCount = document.querySelector("#step-count");
const progressPercent = document.querySelector("#progress-percent");
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");
const stepNumber = document.querySelector("#step-number");
const stepKicker = document.querySelector("#step-kicker");
const stepTitle = document.querySelector("#step-title");
const stepText = document.querySelector("#step-text");
const stepCallout = document.querySelector("#step-callout");
const emergencyContent = document.querySelector(".emergency-content");
const previousButton = document.querySelector("#previous-step");
const nextButton = document.querySelector("#next-step");

function renderTraumaStep() {
  const step = traumaSteps[currentStep];
  const stepValue = currentStep + 1;
  const percent = Math.round((stepValue / traumaSteps.length) * 100);

  stepCount.textContent = `Passo ${stepValue} de ${traumaSteps.length}`;
  progressPercent.textContent = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", String(stepValue));
  progressFill.style.width = `${percent}%`;
  stepNumber.textContent = String(stepValue).padStart(2, "0");
  stepKicker.textContent = step.kicker;
  stepTitle.textContent = step.title;
  stepText.textContent = step.text;
  stepCallout.textContent = step.callout || "";
  stepCallout.hidden = !step.callout;
  previousButton.disabled = currentStep === 0;
  nextButton.innerHTML = currentStep === traumaSteps.length - 1
    ? "Recomeçar <span aria-hidden=\"true\">↻</span>"
    : "Próximo passo <span aria-hidden=\"true\">→</span>";

  emergencyContent.classList.remove("step-enter");
  requestAnimationFrame(() => emergencyContent.classList.add("step-enter"));
}

previousButton.addEventListener("click", () => {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderTraumaStep();
});

nextButton.addEventListener("click", () => {
  currentStep = currentStep === traumaSteps.length - 1 ? 0 : currentStep + 1;
  renderTraumaStep();
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.querySelector(".sr-only").textContent = isExpanded ? "Abrir menu" : "Fechar menu";
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Abrir menu";
    primaryNav.classList.remove("is-open");
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
