"use client";

import { useState, useEffect, useRef } from "react";

export default function AozoraFloatingMenu({ invitation, onNavigate }) {
  const [activeMenuId, setActiveMenuId] = useState("opening");
  const [show, setShow] = useState(false);
  const observerRef = useRef(null);

  const menus = [
    {
      id: "opening",
      icon: "opening-fm",
      label: "Opening",
    },
    {
      id: "time",
      icon: "time-fm",
      label: "Time",
    },
    {
      id: "location",
      icon: "location-fm",
      label: "Location",
    },
    {
      id: "wish",
      icon: "wish-fm",
      label: "Wish",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const startObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const focusedEntry = entries.find((entry) => entry.isIntersecting);
          if (focusedEntry) {
            setActiveMenuId(focusedEntry.target.id);
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

  const handleMenuClick = (menu) => {
    setActiveMenuId(menu.id);
    onNavigate(menu.id);
  };

  return (
    <div 
      name="aozora-floating-menu" 
      className={show ? "show" : ""}
    >
      <div className="menus">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`menu ${activeMenuId === menu.id ? "active" : ""}`}
            onClick={() => handleMenuClick(menu)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`/themes/aozora/component/${menu.icon}${
                activeMenuId === menu.id ? "-active.svg" : ".svg"
              }`}
              alt={menu.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
