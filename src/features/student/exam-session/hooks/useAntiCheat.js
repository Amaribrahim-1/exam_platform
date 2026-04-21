// import { useEffect, useRef, useCallback } from "react";

// /**
//  * useAntiCheat
//  * ─────────────────────────────────────────────────────────────────────────────
//  * Activates only when `examId` is truthy.
//  *
//  * @param {object}   options
//  * @param {string}   options.examId          - Active exam ID (null = disabled)
//  * @param {function} options.onViolation      - Called with (violationType, count)
//  * @param {number}   [options.maxViolations]  - Auto-submit after N violations (default 3)
//  * @param {function} [options.onAutoSubmit]   - Called when maxViolations exceeded
//  *
//  * Detections covered
//  * ──────────────────
//  * 1. Tab switch / window blur      → visibilitychange + window blur
//  * 2. DevTools open (size method)   → window resize threshold
//  * 3. DevTools open (timing method) → debugger timing attack (passive, low FP)
//  * 4. Right-click                   → contextmenu
//  * 5. Dangerous keyboard shortcuts  → F12, Ctrl+Shift+I/J/C/U, Ctrl+U, etc.
//  * 6. Split-screen / resize         → window resize with width change
//  * 7. New tab / navigation away     → beforeunload
//  * 8. Text selection (copy attempt) → selectstart + copy
//  */
// export function useAntiCheat({
//   examId,
//   onViolation,
//   maxViolations = 3,
//   onAutoSubmit,
// } = {}) {
//   const violationCountRef = useRef(0);
//   const lastWidthRef = useRef(window.innerWidth);
//   const devtoolsOpenRef = useRef(false);
//   const active = Boolean(examId);

//   // ── Central violation reporter ──────────────────────────────────────────────
//   const report = useCallback(
//     (type) => {
//       if (!active) return;
//       violationCountRef.current += 1;
//       const count = violationCountRef.current;
//       onViolation?.(type, count);
//       if (count >= maxViolations) {
//         onAutoSubmit?.();
//       }
//     },
//     [active, onViolation, maxViolations, onAutoSubmit],
//   );

//   useEffect(() => {
//     if (!active) return;

//     // ── 1. Tab switch / visibility change ────────────────────────────────────
//     const handleVisibilityChange = () => {
//       if (document.hidden) report("tab_switch");
//     };

//     // ── 2. Window blur (alt-tab, clicked outside, split-screen focus loss) ───
//     const handleWindowBlur = () => {
//       // document hidden covers tab switch; blur covers everything else
//       if (!document.hidden) report("window_blur");
//     };

//     // ── 3. DevTools size detection + split-screen ────────────────────────────
//     const DEVTOOLS_THRESHOLD = 160; // px – typical devtools panel minimum

//     const handleResize = () => {
//       const widthDiff = Math.abs(window.innerWidth - lastWidthRef.current);
//       const heightDiff = window.outerHeight - window.innerHeight - 90; // ~90 px for browser chrome

//       // Width shrank significantly → split-screen
//       if (widthDiff > 200) {
//         report("split_screen");
//       }

//       // Height diff blew up → devtools docked at bottom
//       if (heightDiff > DEVTOOLS_THRESHOLD && !devtoolsOpenRef.current) {
//         devtoolsOpenRef.current = true;
//         report("devtools_open");
//       } else if (heightDiff <= DEVTOOLS_THRESHOLD) {
//         devtoolsOpenRef.current = false;
//       }

//       // Width diff → devtools docked at side
//       const devtoolsWidthDiff = window.outerWidth - window.innerWidth;
//       if (devtoolsWidthDiff > DEVTOOLS_THRESHOLD && !devtoolsOpenRef.current) {
//         devtoolsOpenRef.current = true;
//         report("devtools_open");
//       }

//       lastWidthRef.current = window.innerWidth;
//     };

//     // ── 4. DevTools timing attack (passive — high accuracy, near-zero FP) ───
//     //    The debugger statement takes ~100 ms when DevTools is open, <1 ms otherwise.
//     let timingTimer;
//     const checkDevToolsTiming = () => {
//       const start = performance.now();
//       // eslint-disable-next-line no-debugger
//       debugger; // intentional — pauses only when DevTools is open
//       const elapsed = performance.now() - start;
//       if (elapsed > 100 && !devtoolsOpenRef.current) {
//         devtoolsOpenRef.current = true;
//         report("devtools_open");
//       } else if (elapsed <= 100) {
//         devtoolsOpenRef.current = false;
//       }
//       timingTimer = setTimeout(checkDevToolsTiming, 2000);
//     };
//     timingTimer = setTimeout(checkDevToolsTiming, 2000);

//     // ── 5. Right-click ───────────────────────────────────────────────────────
//     const handleContextMenu = (e) => {
//       e.preventDefault();
//       report("right_click");
//     };

//     // ── 6. Dangerous keyboard shortcuts ─────────────────────────────────────
//     const BLOCKED_KEYS = new Set([
//       "F12",
//       "F5", // refresh
//       "F11", // fullscreen toggle
//     ]);

//     const handleKeyDown = (e) => {
//       const ctrl = e.ctrlKey || e.metaKey;
//       const shift = e.shiftKey;
//       const key = e.key;

//       // Block F12, F5, etc.
//       if (BLOCKED_KEYS.has(key)) {
//         e.preventDefault();
//         if (key === "F12") report("devtools_shortcut");
//         return;
//       }

//       // Ctrl+Shift+I / J / C  → DevTools
//       if (ctrl && shift && ["i", "I", "j", "J", "c", "C"].includes(key)) {
//         e.preventDefault();
//         report("devtools_shortcut");
//         return;
//       }

//       // Ctrl+U → view source
//       if (ctrl && key.toLowerCase() === "u") {
//         e.preventDefault();
//         report("view_source");
//         return;
//       }

//       // Ctrl+S → save page
//       if (ctrl && key.toLowerCase() === "s") {
//         e.preventDefault();
//         return;
//       }

//       // Ctrl+P → print (could reveal questions)
//       if (ctrl && key.toLowerCase() === "p") {
//         e.preventDefault();
//         return;
//       }

//       // Ctrl+Tab / Ctrl+W → tab navigation / close
//       if (ctrl && (key === "Tab" || key.toLowerCase() === "w")) {
//         e.preventDefault();
//         if (key === "Tab") report("tab_switch_shortcut");
//         return;
//       }

//       // Alt+Tab — can't fully block, but we catch it via blur
//       // Win key — can't block at browser level
//     };

//     // ── 7. Navigation away / new tab ────────────────────────────────────────
//     const handleBeforeUnload = (e) => {
//       report("navigation_away");
//       e.preventDefault();
//       e.returnValue = ""; // shows browser's "Leave page?" dialog
//       return "";
//     };

//     // ── 8. Text selection & copy ─────────────────────────────────────────────
//     const handleSelectStart = (e) => {
//       e.preventDefault();
//     };

//     const handleCopy = (e) => {
//       e.preventDefault();
//       report("copy_attempt");
//     };

//     // ── Register all listeners ───────────────────────────────────────────────
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     window.addEventListener("blur", handleWindowBlur);
//     window.addEventListener("resize", handleResize);
//     document.addEventListener("contextmenu", handleContextMenu);
//     document.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     document.addEventListener("selectstart", handleSelectStart);
//     document.addEventListener("copy", handleCopy);

//     // Snapshot initial width
//     lastWidthRef.current = window.innerWidth;

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       window.removeEventListener("blur", handleWindowBlur);
//       window.removeEventListener("resize", handleResize);
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("selectstart", handleSelectStart);
//       document.removeEventListener("copy", handleCopy);
//       clearTimeout(timingTimer);
//       devtoolsOpenRef.current = false;
//       violationCountRef.current = 0;
//     };
//   }, [active, report]);

//   return {
//     // eslint-disable-next-line react-hooks/refs
//     violationCount: violationCountRef.current,
//   };
// }

import { useEffect, useRef, useCallback } from "react";
import { useBlocker } from "react-router-dom";

export function useAntiCheat({
  examId,
  onViolation,
  maxViolations = 3,
  onAutoSubmit,
} = {}) {
  const violationCountRef = useRef(0);
  const lastWidthRef = useRef(window.innerWidth);
  const devtoolsOpenRef = useRef(false);
  const active = Boolean(examId);

  const report = useCallback(
    (type) => {
      if (!active) return;
      violationCountRef.current += 1;
      const count = violationCountRef.current;
      onViolation?.(type, count);
      if (count >= maxViolations) onAutoSubmit?.();
    },
    [active, onViolation, maxViolations, onAutoSubmit],
  );

  // ── 9. React Router blocker ───────────────────────────────────────────────
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      active && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state !== "blocked") return;
    const confirmed = window.confirm(
      "⚠️ Leaving this page will be considered cheating and your exam will be auto-submitted. Are you sure?",
    );
    if (confirmed) {
      report("navigation_away");
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker, report, onAutoSubmit]);

  // ── 1-8. Event listeners ──────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return;

    const DEVTOOLS_THRESHOLD = 160;

    const handleVisibilityChange = () => {
      if (document.hidden) report("tab_switch");
    };

    const handleWindowBlur = () => {
      if (!document.hidden) report("window_blur");
    };

    const handleResize = () => {
      const widthDiff = Math.abs(window.innerWidth - lastWidthRef.current);
      const heightDiff = window.outerHeight - window.innerHeight - 90;
      const devtoolsWidthDiff = window.outerWidth - window.innerWidth;

      if (widthDiff > 200) report("split_screen");

      if (heightDiff > DEVTOOLS_THRESHOLD && !devtoolsOpenRef.current) {
        devtoolsOpenRef.current = true;
        report("devtools_open");
      } else if (heightDiff <= DEVTOOLS_THRESHOLD) {
        devtoolsOpenRef.current = false;
      }

      if (devtoolsWidthDiff > DEVTOOLS_THRESHOLD && !devtoolsOpenRef.current) {
        devtoolsOpenRef.current = true;
        report("devtools_open");
      }

      lastWidthRef.current = window.innerWidth;
    };

    let timingTimer;
    const checkDevToolsTiming = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const elapsed = performance.now() - start;
      if (elapsed > 100 && !devtoolsOpenRef.current) {
        devtoolsOpenRef.current = true;
        report("devtools_open");
      } else if (elapsed <= 100) {
        devtoolsOpenRef.current = false;
      }
      timingTimer = setTimeout(checkDevToolsTiming, 2000);
    };
    timingTimer = setTimeout(checkDevToolsTiming, 2000);

    const handleContextMenu = (e) => {
      e.preventDefault();
      report("right_click");
    };

    const BLOCKED_KEYS = new Set(["F12", "F5", "F11"]);
    const handleKeyDown = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const key = e.key;

      if (BLOCKED_KEYS.has(key)) {
        e.preventDefault();
        if (key === "F12") report("devtools_shortcut");
        return;
      }
      if (ctrl && shift && ["i", "I", "j", "J", "c", "C"].includes(key)) {
        e.preventDefault();
        report("devtools_shortcut");
        return;
      }
      if (ctrl && ["u", "s", "p"].includes(key.toLowerCase())) {
        e.preventDefault();
        if (key.toLowerCase() === "u") report("view_source");
        return;
      }
      if (ctrl && (key === "Tab" || key.toLowerCase() === "w")) {
        e.preventDefault();
        if (key === "Tab") report("tab_switch_shortcut");
        return;
      }
    };

    const handleBeforeUnload = (e) => {
      report("navigation_away");
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    const handleSelectStart = (e) => e.preventDefault();

    const handleCopy = (e) => {
      e.preventDefault();
      report("copy_attempt");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("resize", handleResize);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("copy", handleCopy);
    lastWidthRef.current = window.innerWidth;

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("copy", handleCopy);
      clearTimeout(timingTimer);
      devtoolsOpenRef.current = false;
      violationCountRef.current = 0;
    };
  }, [active, report]);

  // eslint-disable-next-line react-hooks/refs
  return { violationCount: violationCountRef.current };
}
