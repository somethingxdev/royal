import type { EmblaCarouselType, EmblaPluginType } from "embla-carousel";

export interface ScaleCarouselOptions {
  /** Scale for the active (center) slide */
  activeScale?: number;
  /** Scale for adjacent slides (distance = 1) */
  adjacentScale?: number;
  /** Scale for far slides (distance >= 2) */
  farScale?: number;
  /** Transition duration in seconds */
  transitionDuration?: number;
  /** Selector for slide elements within slideNodes */
  scaleTargetSelector?: string;
}

export function ScaleCarousel(options: ScaleCarouselOptions = {}): EmblaPluginType {
  const {
    activeScale = 1.15,
    adjacentScale = 0.95,
    farScale = 0.85,
    transitionDuration = 0.3,
    scaleTargetSelector,
  } = options;

  let emblaApi: EmblaCarouselType;

  function updateScales() {
    if (!emblaApi) return;

    const slides = emblaApi.slideNodes();
    const rootNode = emblaApi.rootNode();
    if (!rootNode) return;

    const containerRect = rootNode.getBoundingClientRect();
    const viewportCenter = containerRect.width / 2;

    slides.forEach((slide) => {
      const slideEl = slide as HTMLElement;
      const targetEl = scaleTargetSelector
        ? (slideEl.querySelector(scaleTargetSelector) as HTMLElement)
        : slideEl;

      if (!targetEl) return;

      const slideRect = slideEl.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2 - containerRect.left;
      const distanceFromCenter = Math.abs(slideCenter - viewportCenter) / containerRect.width;

      let scale: number;
      if (distanceFromCenter < 0.1) {
        scale = activeScale;
      } else if (distanceFromCenter < 0.3) {
        const t = (distanceFromCenter - 0.1) / 0.2;
        scale = activeScale - (activeScale - adjacentScale) * t;
      } else {
        const t = Math.min((distanceFromCenter - 0.3) / 0.3, 1);
        scale = adjacentScale - (adjacentScale - farScale) * t;
      }

      targetEl.style.transition = `transform ${transitionDuration}s ease-out`;
      targetEl.style.transform = `scale(${scale})`;
    });
  }

  const plugin = {
    name: "scaleCarousel",
    options: options as unknown as EmblaPluginType["options"],
    init: (api: EmblaCarouselType) => {
      emblaApi = api;
      updateScales();

      emblaApi.on("scroll", updateScales);
      emblaApi.on("select", updateScales);
      emblaApi.on("reInit", updateScales);
      emblaApi.on("resize", updateScales);
    },
    destroy: () => {
      if (emblaApi) {
        emblaApi.off("scroll", updateScales);
        emblaApi.off("select", updateScales);
        emblaApi.off("reInit", updateScales);
        emblaApi.off("resize", updateScales);
      }
    },
  };

  return plugin as EmblaPluginType;
}
