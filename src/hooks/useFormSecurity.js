import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for form security: clears form inputs on tab switch
 * and after a period of inactivity.
 *
 * @param {Object} options
 * @param {Function} options.onClear - Callback to clear all form fields
 * @param {boolean}  options.active  - Whether the hook should be active (e.g. modal is open)
 * @param {number}   [options.inactivityTimeout=180000] - Inactivity timeout in ms (default: 3 min)
 */
export const useFormSecurity = ({
  onClear,
  active = true,
  inactivityTimeout = 3 * 60 * 1000, // 3 minutes
}) => {
  const timerRef = useRef(null);
  const wasHiddenRef = useRef(false);
  const showMessageRef = useRef(null);

  // Show inactivity toast
  const showInactivityMessage = useCallback(() => {
    // Remove any existing toast
    if (showMessageRef.current) {
      showMessageRef.current.remove();
      showMessageRef.current = null;
    }

    const toast = document.createElement("div");
    toast.className = "form-security-toast";
    toast.innerHTML = `
      <div style="
        position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
        background: linear-gradient(135deg, #f97316, #dc2626);
        color: white; padding: 14px 28px; border-radius: 12px;
        font-size: 14px; font-weight: 500; z-index: 99999;
        box-shadow: 0 8px 32px rgba(249,115,22,0.35);
        animation: slideDown 0.4s ease-out;
        display: flex; align-items: center; gap: 10px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Session expired due to inactivity. Please refill the form.
      </div>
    `;

    // Add animation keyframes if not already present
    if (!document.getElementById("form-security-styles")) {
      const style = document.createElement("style");
      style.id = "form-security-styles";
      style.textContent = `
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    showMessageRef.current = toast;

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.transition = "opacity 0.3s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }
      if (showMessageRef.current === toast) showMessageRef.current = null;
    }, 4000);
  }, []);

  // Reset inactivity timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onClear();
      showInactivityMessage();
    }, inactivityTimeout);
  }, [onClear, inactivityTimeout, showInactivityMessage]);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // --- Visibility change: clear on return ---
    const handleVisibility = () => {
      if (document.hidden) {
        wasHiddenRef.current = true;
      } else if (wasHiddenRef.current) {
        wasHiddenRef.current = false;
        onClear();
      }
    };

    // --- Inactivity detection ---
    const activityEvents = ["keydown", "mousedown", "touchstart", "scroll"];

    const handleActivity = () => resetTimer();

    document.addEventListener("visibilitychange", handleVisibility);
    activityEvents.forEach((evt) =>
      document.addEventListener(evt, handleActivity, { passive: true }),
    );

    // Start the inactivity timer
    resetTimer();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      activityEvents.forEach((evt) =>
        document.removeEventListener(evt, handleActivity),
      );
      if (timerRef.current) clearTimeout(timerRef.current);
      if (showMessageRef.current) {
        showMessageRef.current.remove();
        showMessageRef.current = null;
      }
    };
  }, [active, onClear, resetTimer]);
};
