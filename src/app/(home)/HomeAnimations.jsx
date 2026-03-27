"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Module-level flag — persists across React Strict Mode's fake unmount/remount
// so the hero only plays once per page load (not twice in dev)
let heroPlayed = false;

// ScrollTrigger config factory
const ST = (trigger, start = "top 82%") => ({
    trigger,
    start,
    toggleActions: "play none none none",
    once: true,
});

export default function HomeAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {

            // ── PRE-HIDE all scroll-animated elements via gsap.set() ──────
            // Pattern: set() hides immediately → to() reveals on scroll
            // This avoids the "visible → jump invisible → animate in" flash
            // that happens when immediateRender:false is used with from()

            gsap.set(".about-images .about-img-card",                                                  { opacity: 0, y: 60 });
            gsap.set([".about-eyebrow", ".about-title", ".about-description", ".about-feature-item", ".about-btn"], { opacity: 0, x: 48 });
            gsap.set([".services-eyebrow", ".services-title", ".services-subtitle"],                   { opacity: 0, y: 40 });
            gsap.set(".service-card",                                                                  { opacity: 0, y: 56 });
            gsap.set(".services-btn",                                                                  { opacity: 0, y: 24 });
            gsap.set(".support-groups__visual",                                                        { opacity: 0, x: -56 });
            gsap.set([".support-groups__eyebrow", ".support-groups__title", ".support-groups__text", ".support-groups__button"], { opacity: 0, x: 48 });
            gsap.set(".about-section-header > *",                                                      { opacity: 0, y: 40 });
            gsap.set(".doctor-card",                                                                   { opacity: 0, y: 56 });
            gsap.set(".left-block > *",                                                                { opacity: 0, x: -44 });
            gsap.set(".contact-card",                                                                  { opacity: 0, x: 44 });

            // ── HERO — plays once per session ─────────────────────────────
            if (!heroPlayed) {
                heroPlayed = true;
                gsap.timeline({ delay: 0.15 })
                    .from(".hero-badge",       { y: 28, autoAlpha: 0, duration: 0.6,  ease: "power3.out" })
                    .from(".hero-title",        { y: 48, autoAlpha: 0, duration: 0.8,  ease: "power3.out" }, "-=0.35")
                    .from(".hero-description",  { y: 30, autoAlpha: 0, duration: 0.65, ease: "power3.out" }, "-=0.45")
                    .from(".hero-ctas > *",     { y: 24, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" }, "-=0.4")
                    .from(".hero-stat",         { y: 20, autoAlpha: 0, duration: 0.5,  stagger: 0.09, ease: "power3.out" }, "-=0.3")
                    .from(".hero-float-rating", { x: -40, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, "-=0.25")
                    .from(".hero-float-avail",  { x: 40,  autoAlpha: 0, duration: 0.7, ease: "power3.out" }, "<");
            }

            // ── SCROLL ANIMATIONS — gsap.to() from pre-hidden state ───────

            // About — images
            gsap.to(".about-images .about-img-card", {
                scrollTrigger: ST(".about"),
                opacity: 1, y: 0, duration: 0.75, stagger: 0.14, ease: "power3.out",
            });
            // About — content
            gsap.to([".about-eyebrow", ".about-title", ".about-description", ".about-feature-item", ".about-btn"], {
                scrollTrigger: ST(".about-content"),
                opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            });

            // Services — header
            gsap.to([".services-eyebrow", ".services-title", ".services-subtitle"], {
                scrollTrigger: ST(".services-section"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });
            // Services — cards
            gsap.to(".service-card", {
                scrollTrigger: ST(".services-grid", "top 90%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
            });
            // Services — button
            gsap.to(".services-btn", {
                scrollTrigger: ST(".services-btn"),
                opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
            });

            // Support groups — visual
            gsap.to(".support-groups__visual", {
                scrollTrigger: ST(".support-groups", "top 78%"),
                opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            });
            // Support groups — content
            gsap.to([".support-groups__eyebrow", ".support-groups__title", ".support-groups__text", ".support-groups__button"], {
                scrollTrigger: ST(".support-groups__content", "top 82%"),
                opacity: 1, x: 0, duration: 0.7, stagger: 0.11, ease: "power3.out",
            });

            // Doctors — header
            gsap.to(".about-section-header > *", {
                scrollTrigger: ST(".about-team"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
            });
            // Doctors — cards
            gsap.to(".doctor-card", {
                scrollTrigger: ST(".doctors-grid", "top 90%"),
                opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out",
            });

            // Contact — left info
            gsap.to(".left-block > *", {
                scrollTrigger: ST(".two-color"),
                opacity: 1, x: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
            });
            // Contact — form card
            gsap.to(".contact-card", {
                scrollTrigger: ST(".two-color"),
                opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
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
