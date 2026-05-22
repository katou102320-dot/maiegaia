(function () {
  "use strict";

  const LINE_URL = "https://lin.ee/zU1YB6E";

  const pages = {
    "/": "page-home",
    "/terms": "page-terms",
    "/privacy": "page-privacy",
    "/apply": "page-apply",
  };

  function getRoute() {
    const hash = window.location.hash.slice(1) || "/";
    return hash.startsWith("/") ? hash : "/" + hash;
  }

  function navigate(route) {
    window.location.hash = route === "/" ? "" : route;
  }

  function showPage(route) {
    const pageId = pages[route] || pages["/"];
    document.querySelectorAll(".page-view").forEach((el) => {
      el.classList.toggle("is-active", el.id === pageId);
    });
    window.scrollTo(0, 0);

    const floatingCta = document.getElementById("floating-cta");
    if (floatingCta) {
      floatingCta.style.display = route === "/" ? "" : "none";
    }

    if (route === "/apply") {
      const formView = document.getElementById("apply-form-view");
      const successView = document.getElementById("apply-success-view");
      const form = document.getElementById("apply-form");
      if (formView && successView) {
        formView.classList.remove("hidden");
        successView.classList.add("hidden");
        if (form) form.reset();
      }
    }
  }

  function initRouter() {
    const update = () => showPage(getRoute());
    window.addEventListener("hashchange", update);
    update();
  }

  function initNavLinks() {
    document.querySelectorAll("[data-route]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const route = el.getAttribute("data-route");
        if (route && !route.startsWith("#")) {
          e.preventDefault();
          navigate(route);
        }
      });
    });

    document.querySelectorAll('a[href^="#/"]').forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(el.getAttribute("href").slice(1));
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach((el) => {
      const href = el.getAttribute("href");
      if (href && href.startsWith("#") && !href.startsWith("#/") && href.length > 1) {
        el.addEventListener("click", () => {
          if (getRoute() !== "/") {
            navigate("/");
            setTimeout(() => {
              const target = document.querySelector(href);
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        });
      }
    });
  }

  function initExternalLinks() {
    document.querySelectorAll("[data-line]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.open(LINE_URL, "_blank", "noopener,noreferrer");
      });
    });
  }

  function initApplyRoute() {
    document.querySelectorAll("[data-route='/apply']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("/apply");
      });
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const trigger = item.querySelector(".faq-item__trigger");
      if (!trigger) return;
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("is-open"));
        if (!isOpen) item.classList.add("is-open");
      });
    });
  }

  function initFloatingCta() {
    const cta = document.getElementById("floating-cta");
    if (!cta) return;

    const onScroll = () => {
      cta.classList.toggle("is-visible", window.scrollY > 800);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initApplyForm() {
    const form = document.getElementById("apply-form");
    const formView = document.getElementById("apply-form-view");
    const successView = document.getElementById("apply-success-view");
    if (!form || !formView || !successView) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      console.log("Form submitted:", data);

      formView.classList.add("hidden");
      successView.classList.remove("hidden");

      setTimeout(() => navigate("/"), 3000);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initRouter();
    initNavLinks();
    initExternalLinks();
    initApplyRoute();
    initFaq();
    initFloatingCta();
    initApplyForm();
  });
})();
