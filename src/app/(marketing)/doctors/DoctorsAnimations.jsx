"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ST = (trigger, start = "top 88%") => ({
    trigger,
    start,
    toggleActions: "play none none none",
    once: true,
});

export default function DoctorsAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            gsap.set(".doctor-card", { opacity: 0, y: 48 });

            gsap.to(".doctor-card", {
                scrollTrigger: ST(".doctors-grid"),
                opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
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
