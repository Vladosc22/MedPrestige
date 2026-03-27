"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesListAnimations() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            // Animate each row with direction-aware slide:
            // normal rows → visual from left, content from right
            // reverse rows → visual from right, content from left
            gsap.utils.toArray(".service-row").forEach((row) => {
                const visual  = row.querySelector(".service-row-visual");
                const content = row.querySelector(".service-row-content");
                const isRev   = row.classList.contains("service-row--reverse");

                gsap.set(visual,  { opacity: 0, x: isRev ?  64 : -64 });
                gsap.set(content, { opacity: 0, x: isRev ? -64 :  64 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 82%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                });

                tl.to(visual,  { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" })
                  .to(content, { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }, "-=0.55");
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
