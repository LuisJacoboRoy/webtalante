(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      }
    });
  }

  document.querySelectorAll("[data-order-form]").forEach((form) => {
    const originField = form.querySelector("[name='origin']");
    const weightSelect = form.querySelector("[name='weight']");
    const priceOutput = form.querySelector("[data-price-output]");
    const orderLink = form.querySelector("[data-order-link]");
    const paymentLink = form.querySelector("[data-payment-link]");

    if (!weightSelect || !priceOutput || !orderLink) {
      return;
    }

    const updateOrder = () => {
      const selectedWeight = weightSelect.options[weightSelect.selectedIndex];
      const price = Number(selectedWeight.dataset.price);
      const origin = originField instanceof HTMLSelectElement
        ? originField.options[originField.selectedIndex].textContent.trim()
        : originField?.value || form.dataset.origin || "Café Talante";
      const weight = selectedWeight.textContent.trim();
      const amount = new Intl.NumberFormat("es-MX").format(price);

      priceOutput.textContent = `$${amount} MXN`;
      orderLink.href = `https://wa.me/529514099288?text=${encodeURIComponent(
        `Hola, me interesa el Café Talante ${origin} en presentación de ${weight} (precio publicado: $${amount} MXN). ¿Me confirman disponibilidad y opciones de entrega?`
      )}`;
      orderLink.setAttribute(
        "aria-label",
        `Consultar por WhatsApp ${origin}, ${weight}, precio publicado $${amount} MXN`
      );

      if (paymentLink) {
        paymentLink.hidden = weightSelect.value !== form.dataset.paymentWeight;
      }
    };

    weightSelect.addEventListener("change", updateOrder);
    if (originField instanceof HTMLSelectElement) {
      originField.addEventListener("change", updateOrder);
    }
    updateOrder();
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion && revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal-ready");
      observer.observe(item);
    });
  }
})();
