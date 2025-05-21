// lib/gtag.js
export const GA_MEASUREMENT_ID = 'G-BT5RS3V4NK'; // ضعي الـ ID الحقيقي هنا

export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
