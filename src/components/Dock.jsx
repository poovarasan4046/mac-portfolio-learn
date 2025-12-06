import { useRef } from "react"
import { Tooltip } from "react-tooltip";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Dock = () => {

    const dockRef = useRef(null);

    const toggleApp = (app) => {
        // TODO: Implement the Open Window Functionality
    }

    useGSAP(() => {
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left: dockLeft } = dock.getBoundingClientRect();

            icons.forEach(icon => {
                const { left: iconLeft, width: w } = icon.getBoundingClientRect();
                const center = iconLeft - dockLeft + w / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2.5) / 20000);
                const scale = 1 + 0.5 * intensity;

                gsap.to(icon, {
                    duration: 0.25,
                    ease: "power1.out",
                    scale: scale,
                    y: -20 * intensity,
                });
            });
        }

        const handleMouseMove = (e) => {
            const { left: dockLeft } = dock.getBoundingClientRect();
            const mouseX = e.clientX - dockLeft;
            animateIcons(mouseX);
        }

        const resetIcons = () => {
            icons.forEach(icon => {
                gsap.to(icon, {
                    duration: 0.3,
                    ease: "power1.out",
                    scale: 1,
                    y: 0,
                });
            });
        }

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }

    }, [])

  return (
    <section id="dock">
        <div ref={dockRef} className="dock-container">
            {
                dockApps.map(({ id, name, icon, canOpen }, index) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({id,canOpen})}
                        >
                            <img src={`images/${icon}`} alt={name} loading="lazy" className={ canOpen ? "" : "opacity-60" } />
                        </button>
                    </div>
                ))
            }

            <Tooltip id="dock-tooltip" place="top" className="tooltip" />
        </div>

    </section>
  )
}
