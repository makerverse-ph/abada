const DEFAULT_GA_MEASUREMENT_ID = 'G-036PVEWZS5';

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeAnalytics() {
  const measurementId =
    import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;

  if (
    !import.meta.env.PROD ||
    window.location.hostname !== 'stratsearch.org' ||
    !/^G-[A-Z0-9]+$/.test(measurementId) ||
    document.querySelector(`script[data-ga-measurement-id="${measurementId}"]`)
  ) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.gaMeasurementId = measurementId;
  document.head.appendChild(script);
}
