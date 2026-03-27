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

export default function DoctorProfileAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {

            // ── PRE-HIDE ────────────────────────────────────────────────
            gsap.set(".doctor-sidebar",  { opacity: 0, x: -52 });
            gsap.set(".doctor-section",  { opacity: 0, y: 44 });

            // ── SIDEBAR ─────────────────────────────────────────────────
            gsap.to(".doctor-sidebar", {
                scrollTrigger: ST(".doctor-profile__container", "top 80%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            });

            // ── CONTENT SECTIONS ────────────────────────────────────────
            gsap.to(".doctor-section", {
                scrollTrigger: ST(".doctor-content", "top 85%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
            });

            // ── SKILL TAGS ──────────────────────────────────────────────
            gsap.set(".doctor-skill-tag", { opacity: 0, y: 16 });
            gsap.to(".doctor-skill-tag", {
                scrollTrigger: ST(".doctor-skills-section", "top 88%"),
                opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out",
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
