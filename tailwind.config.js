module.exports = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#143953",
                        "secondary": "#CD406F",
                        "surface": "#f9f9ff",
                        "surface-dim": "#cbdbf8",
                        "surface-bright": "#f9f9ff",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f0f3ff",
                        "surface-container": "#e7eeff",
                        "surface-container-high": "#dee9ff",
                        "surface-container-highest": "#d5e3ff",
                        "on-surface": "#0c1c31",
                        "on-surface-variant": "#42474d",
                        "outline": "#73777e",
                        "outline-variant": "#c2c7ce",
                        "primary-container": "#143953",
                        "on-primary-container": "#ffffff",
                        "secondary-container": "#CD406F",
                        "on-secondary-container": "#ffffff",
                        "navy-50": "#EEF2F6",
                        "navy-100": "#DAE2EB",
                        "navy-200": "#B2C0D1",
                        "ink-700": "#122236",
                        "paper-50": "#F7F9FC",
                        "paper-100": "#EFF2F7"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.5rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "2xl": "1rem",
                        "3xl": "1.5rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "margin-page": "32px",
                        "space-10": "72px",
                        "space-12": "128px",
                        "space-1": "4px",
                        "space-2": "8px",
                        "space-6": "24px",
                        "gutter": "24px",
                        "space-8": "40px",
                        "space-4": "16px"
                    },
                    "fontFamily": {
                        "display-xl": ["Bricolage Grotesque", "sans-serif"],
                        "body-md": ["Bricolage Grotesque", "sans-serif"],
                        "label-eyebrow": ["Bricolage Grotesque", "sans-serif"],
                        "headline-h1-mobile": ["Bricolage Grotesque", "sans-serif"],
                        "lead": ["Bricolage Grotesque", "sans-serif"],
                        "headline-h1": ["Bricolage Grotesque", "sans-serif"],
                        "headline-h4": ["Bricolage Grotesque", "sans-serif"],
                        "headline-h3": ["Bricolage Grotesque", "sans-serif"],
                        "headline-h2": ["Bricolage Grotesque", "sans-serif"]
                    },
                    "fontSize": {
                        "display-xl": ["76px", { "lineHeight": "0.98", "letterSpacing": "-0.025em", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "1.45", "fontWeight": "400" }],
                        "label-eyebrow": ["12px", { "lineHeight": "1.45", "letterSpacing": "0.14em", "fontWeight": "700" }],
                        "headline-h1-mobile": ["40px", { "lineHeight": "1.1", "fontWeight": "700" }],
                        "lead": ["20px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "headline-h1": ["60px", { "lineHeight": "1.08", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-h4": ["24px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "headline-h3": ["30px", { "lineHeight": "1.08", "fontWeight": "600" }],
                        "headline-h2": ["42px", { "lineHeight": "1.1", "fontWeight": "600" }]
                    }
                }
            }
        ,
    content: [
        "./*.html",
        "./about/**/*.html",
        "./contact-us/**/*.html",
        "./locations/**/*.html",
        "./resources/**/*.html",
        "./services/**/*.html",
        "./js/**/*.js"
    ],
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/container-queries")
    ]
}
