"use client";

import { useEffect, useRef, useState } from "react";

const menus = [
  { id: "opening", icon: "opening-fm", label: "Opening" },
  { id: "time", icon: "time-fm", label: "Time" },
  { id: "location", icon: "location-fm", label: "Location" },
  { id: "wish", icon: "wish-fm", label: "Wish" },
];

export default function YonakaFloatingMenu({ onNavigate }) {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("opening");
  const observerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const startObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const focusedEntry = entries.find((entry) => entry.isIntersecting);
          if (focusedEntry) {
            setActiveId(focusedEntry.target.id);
          }
        },
        { threshold: 0.5 }
      );

      menus.forEach((menu) => {
        const section = document.getElementById(menu.id);
        if (section) observerRef.current.observe(section);
      });
    };

    const timer = setTimeout(startObserver, 2000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (menu) => {
    setActiveId(menu.id);
    onNavigate(menu.id);
  };

  return (
    <div name="yonaka-floating-menu" className={show ? "show" : ""}>
      <div className="menus">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`menu ${activeId === menu.id ? "active" : ""}`}
            onClick={() => handleClick(menu)}
          >
            <img
              src={`/themes/yonaka/component/${menu.icon}${activeId === menu.id ? "-active" : ""}.svg`}
              alt={menu.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
