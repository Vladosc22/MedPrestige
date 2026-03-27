"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ST = (trigger, start = "top 82%") => ({
    trigger,
    start,
    toggleActions: "play none none none",
    once: true,
});

export default function ServiceDetailAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {

            // ── PRE-HIDE ────────────────────────────────────────────────
            gsap.set(".service-detail-content",   { opacity: 0, x: -56 });
            gsap.set(".service-detail-img-wrap",  { opacity: 0, x: 56  });
            gsap.set(".service-highlight-item",   { opacity: 0, y: 24  });
            gsap.set(".service-section-eyebrow",  { opacity: 0, y: 20  });
            gsap.set(".service-section-heading",  { opacity: 0, y: 28  });
            gsap.set(".service-procedure-card",   { opacity: 0, y: 40  });
            gsap.set(".doctor-card",              { opacity: 0, y: 48  });

            // ── INTRO ───────────────────────────────────────────────────
            gsap.to(".service-detail-content", {
                scrollTrigger: ST(".service-detail-intro", "top 80%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            });
            gsap.to(".service-detail-img-wrap", {
                scrollTrigger: ST(".service-detail-intro", "top 80%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            });
            gsap.to(".service-highlight-item", {
                scrollTrigger: ST(".service-highlights", "top 90%"),
                opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
            });

            // ── PROCEDURES ──────────────────────────────────────────────
            gsap.to(".service-section-eyebrow", {
                scrollTrigger: ST(".service-section", "top 84%"),
                opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".service-section-heading", {
                scrollTrigger: ST(".service-section", "top 84%"),
                opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".service-procedure-card", {
                scrollTrigger: ST(".service-procedures-grid", "top 88%"),
                opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power3.out",
            });

            // ── SPECIALISTS ─────────────────────────────────────────────
            gsap.to(".doctor-card", {
                scrollTrigger: ST(".service-doctors-grid", "top 90%"),
                opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
            });
        });

        const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, []);

    return null;
}
