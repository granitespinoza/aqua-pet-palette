
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(183, 100%, 94%)', // #E0FEFE
					foreground: 'hsl(0, 0%, 0%)' // Negro
				},
				secondary: {
					DEFAULT: 'hsl(235, 55%, 85%)', // #C7CEEA
					foreground: 'hsl(0, 0%, 0%)' // Negro
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 96%)',
					foreground: 'hsl(0, 0%, 0%)' // Negro
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Nueva paleta personalizada
				'pastel-cyan': {
					DEFAULT: 'hsl(183, 100%, 94%)', // #E0FEFE
					bright: 'hsl(183, 100%, 94%)',
					glow: 'hsla(183, 100%, 94%, 0.3)'
				},
				'pastel-blue': {
					DEFAULT: 'hsl(235, 55%, 85%)', // #C7CEEA
					bright: 'hsl(235, 55%, 85%)',
					glow: 'hsla(235, 55%, 85%, 0.3)'
				},
				'pastel-peach': {
					DEFAULT: 'hsl(27, 100%, 88%)', // #FFDAC1
					bright: 'hsl(27, 100%, 88%)',
					glow: 'hsla(27, 100%, 88%, 0.3)'
				},
				'pastel-pink': {
					DEFAULT: 'hsl(352, 100%, 81%)', // #FF9AA2
					bright: 'hsl(352, 100%, 81%)',
					glow: 'hsla(352, 100%, 81%, 0.3)'
				},
				'pastel-yellow': {
					DEFAULT: 'hsl(60, 100%, 93%)', // #FFFFD8
					bright: 'hsl(60, 100%, 93%)',
					glow: 'hsla(60, 100%, 93%, 0.3)'
				},
				'pastel-green': {
					DEFAULT: 'hsl(162, 63%, 83%)', // #B5EAD7
					bright: 'hsl(162, 63%, 83%)',
					glow: 'hsla(162, 63%, 83%, 0.3)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'watercolor-flow': {
					'0%': { 
						backgroundPosition: '0% 50%',
						filter: 'blur(0px)'
					},
					'25%': { 
						backgroundPosition: '25% 25%',
						filter: 'blur(1px)'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						filter: 'blur(0px)'
					},
					'75%': { 
						backgroundPosition: '75% 75%',
						filter: 'blur(1px)'
					},
					'100%': { 
						backgroundPosition: '0% 50%',
						filter: 'blur(0px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'watercolor-flow': 'watercolor-flow 20s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
