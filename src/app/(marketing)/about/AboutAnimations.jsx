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

export default function AboutAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {

            // ── PRE-HIDE ────────────────────────────────────────────────
            gsap.set(".about-who-visual",                    { opacity: 0, x: -64 });
            gsap.set(".about-who-content > *",               { opacity: 0, x: 56 });
            gsap.set(".about-impact-content > *",            { opacity: 0, x: -56 });
            gsap.set(".about-impact-visual",                 { opacity: 0, x: 64 });
            gsap.set(".about-stat-item",                     { opacity: 0, y: 44 });
            gsap.set(".about-team .about-section-header > *",    { opacity: 0, y: 40 });
            gsap.set(".doctor-card",                         { opacity: 0, y: 56 });
            gsap.set(".about-reasons .about-section-header > *", { opacity: 0, y: 40 });
            gsap.set(".about-reason-card",                   { opacity: 0, y: 56 });

            // ── WHO WE ARE ──────────────────────────────────────────────
            gsap.to(".about-who-visual", {
                scrollTrigger: ST(".about-who", "top 80%"),
                opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            });
            gsap.to(".about-who-content > *", {
                scrollTrigger: ST(".about-who-content", "top 82%"),
                opacity: 1, x: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
            });

            // ── OUR IMPACT ──────────────────────────────────────────────
            gsap.to(".about-impact-content > *", {
                scrollTrigger: ST(".about-impact-content", "top 82%"),
                opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".about-impact-visual", {
                scrollTrigger: ST(".about-impact", "top 78%"),
                opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            });

            // ── STATS ───────────────────────────────────────────────────
            gsap.to(".about-stat-item", {
                scrollTrigger: ST(".about-stats", "top 82%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });

            // ── TEAM ────────────────────────────────────────────────────
            gsap.to(".about-team .about-section-header > *", {
                scrollTrigger: ST(".about-team", "top 82%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".doctor-card", {
                scrollTrigger: ST(".doctors-grid", "top 90%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out",
            });

            // ── WHY MEDPRESTIGE ─────────────────────────────────────────
            gsap.to(".about-reasons .about-section-header > *", {
                scrollTrigger: ST(".about-reasons", "top 82%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });
            gsap.to(".about-reason-card", {
                scrollTrigger: ST(".about-reasons-grid", "top 90%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
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
