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

export default function ContactAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {

            // ── PRE-HIDE ────────────────────────────────────────────────
            gsap.set(".info-card",        { opacity: 0, y: 52 });
            gsap.set(".map-header > *",   { opacity: 0, y: 40 });
            gsap.set(".map-frame-wrap",   { opacity: 0, y: 32 });
            gsap.set(".clinic-info",      { opacity: 0, x: -56 });
            gsap.set(".book-form-wrap",   { opacity: 0, x: 56 });

            // ── INFO CARDS ──────────────────────────────────────────────
            gsap.to(".info-card", {
                scrollTrigger: ST(".contact-info-container", "top 88%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
            });

            // ── MAP ─────────────────────────────────────────────────────
            gsap.to(".map-header > *", {
                scrollTrigger: ST(".map-header"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".map-frame-wrap", {
                scrollTrigger: ST(".map-section", "top 78%"),
                opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            });

            // ── BOOK SECTION ────────────────────────────────────────────
            gsap.to(".clinic-info", {
                scrollTrigger: ST(".book-section", "top 80%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            });
            gsap.to(".book-form-wrap", {
                scrollTrigger: ST(".book-section", "top 80%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
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
