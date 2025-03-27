/**
 * Helper functions to toggle classes on an element based on scroll interactions.
 *
 * Functionality:
 * 1. Toggles a class on an element when another element goes out of view.
 * 2. Optionally, applies a fade effect when the target element intersects with a specific trigger (e.g., footer).
 *
 * Usage:
 *
 * **Basic Toggle Behavior**
 * - Add `data-observer-watch` to the element you want to track (the one going out of view).
 * - Add `data-observer-toggle` to the element where the class should be toggled.
 * - Set `data-observer-class="your-class"` on the toggle element to specify the class name to toggle.
 *
 * **Fade Effect (Optional)**
 * - Add `data-observer-fade` to enable the fade effect.
 * - Add `data-observer-fade-class="your-fade-class"` on the toggle element to specify the class to apply when fading.
 * - Add `data-observer-fade-trigger="your-trigger-selector"` to specify the element that triggers the fade (e.g., footer).
 *
 * The function automatically stops running inside the Shopify Theme Editor (`Shopify.designMode`).
 */

document.addEventListener('DOMContentLoaded', function () {
  if (Shopify.designMode) {
    return;
  }

  function helperToggleClassOnScroll(targetElement, toggleElement, className) {
    let lastY = targetElement.getBoundingClientRect().top;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentY = entry.boundingClientRect.top;
          const scrollingDown = currentY < lastY;

          if (!entry.isIntersecting && scrollingDown) {
            toggleElement.classList.add(className);
          } else if (entry.isIntersecting) {
            toggleElement.classList.remove(className);
          }

          lastY = currentY;
        });
      },
      { threshold: 0 }
    );

    observer.observe(targetElement);
  }

  function helperToggleFadeClassOnScroll(fadeTriggerElement, toggleElement, fadeClass) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            toggleElement.classList.add(fadeClass);
          } else {
            toggleElement.classList.remove(fadeClass);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(fadeTriggerElement);
  }

  const trackedElement = document.querySelector('[data-observer-watch]');
  const toggledElement = document.querySelector('[data-observer-toggle]');

  if (trackedElement && toggledElement) {
    const toggleClass = toggledElement.getAttribute('data-observer-class') || '';
    helperToggleClassOnScroll(trackedElement, toggledElement, toggleClass);
  }

  const fadeTriggerElement = document.querySelector('[data-observer-fade-trigger]');
  const fadeClass = toggledElement?.getAttribute('data-observer-fade-class');

  if (toggledElement && fadeTriggerElement && toggledElement.hasAttribute('data-observer-fade') && fadeClass) {
    helperToggleFadeClassOnScroll(fadeTriggerElement, toggledElement, fadeClass);
  }
});
