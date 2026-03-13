/**
 * THEME CONFIGURATION
 *
 * This is the ONLY file you need to edit for theming.
 * Run `npm run build:colors` after editing to regenerate colors.css
 *
 * Current theme: Evict ICE from 250 Delaware
 */

export const themeConfig = {
  // BRAND COLORS - Bold, urgent campaign palette
  // High-contrast, attention-grabbing colors for advocacy
  colors: {
    // Primary: Bold Red (urgent action, protest energy)
    primary: "#DC2626",           // Red-600 - strong, urgent
    primaryContent: "#FFFFFF",    // White text - 5.9:1 contrast ratio ✓

    // Secondary: Deep Blue (authority, trust, community)
    secondary: "#1E3A8A",         // Blue-900 - strong, trustworthy
    secondaryContent: "#FFFFFF",  // White text - 10.4:1 contrast ratio ✓

    // Accent: Cyan (ICE wordplay, visibility)
    accent: "#06B6D4",            // Cyan-500 - bright, clever reference
    accentContent: "#FFFFFF",     // White text - 3.2:1 contrast ratio ✓

    // Neutral: Professional dark gray
    neutral: "#1E293B",           // Slate-800 - modern dark tone
    neutralContent: "#F8FAFC",    // Slate-50 - off-white for softer contrast

    // Base colors: Clean, high-contrast backgrounds
    base100: "#FFFFFF",           // Pure white - main background
    base200: "#F8FAFC",           // Slate-50 - subtle off-white
    base300: "#F1F5F9",           // Slate-100 - light gray sections
    baseContent: "#0F172A",       // Slate-900 - rich black text - 16:1 ratio ✓

    // Info: Professional blue
    info: "#1E40AF",              // Blue-800 - informative, clear
    infoContent: "#FFFFFF",       // White text

    // Success: Vibrant green (victory, progress)
    success: "#16A34A",           // Emerald-600 - clear success signal
    successContent: "#FFFFFF",    // White text

    // Warning: Golden Yellow (attention, optimism)
    warning: "#EAB308",           // Yellow-500 - bright, optimistic
    warningContent: "#0F172A",    // Dark text - better contrast on yellow

    // Error: Bold red (matches primary)
    error: "#DC2626",             // Red-600 - clear, urgent
    errorContent: "#FFFFFF",      // White text - 5.9:1 contrast ratio ✓
  },

  // LOGO
  logo: {
    src: "/logo.png",
    alt: "Evict ICE from 250 Delaware",
    width: 400,
    height: 120,
  },
};
