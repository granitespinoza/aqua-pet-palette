
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
					foreground: 'hsl(0, 0%, 9%)' // Texto negro intenso
				},
				secondary: {
					DEFAULT: 'hsl(235, 55%, 85%)', // #C7CEEA
					foreground: 'hsl(0, 0%, 9%)' // Texto negro intenso
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 98%)',
					foreground: 'hsl(0, 0%, 9%)' // Texto negro intenso
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
				// Paleta personalizada con colores más vibrantes
				'pastel-cyan': {
					DEFAULT: 'hsl(183, 100%, 94%)', // #E0FEFE
					bright: 'hsl(183, 100%, 85%)',
					dark: 'hsl(183, 100%, 75%)',
					glow: 'hsla(183, 100%, 94%, 0.8)'
				},
				'pastel-blue': {
					DEFAULT: 'hsl(235, 55%, 85%)', // #C7CEEA
					bright: 'hsl(235, 65%, 75%)',
					dark: 'hsl(235, 55%, 65%)',
					glow: 'hsla(235, 55%, 85%, 0.8)'
				},
				'pastel-peach': {
					DEFAULT: 'hsl(27, 100%, 88%)', // #FFDAC1
					bright: 'hsl(27, 100%, 78%)',
					dark: 'hsl(27, 100%, 68%)',
					glow: 'hsla(27, 100%, 88%, 0.8)'
				},
				'pastel-pink': {
					DEFAULT: 'hsl(352, 100%, 81%)', // #FF9AA2
					bright: 'hsl(352, 100%, 71%)',
					dark: 'hsl(352, 100%, 61%)',
					glow: 'hsla(352, 100%, 81%, 0.8)'
				},
				'pastel-yellow': {
					DEFAULT: 'hsl(60, 100%, 93%)', // #FFFFD8
					bright: 'hsl(60, 100%, 83%)',
					dark: 'hsl(60, 100%, 73%)',
					glow: 'hsla(60, 100%, 93%, 0.8)'
				},
				'pastel-green': {
					DEFAULT: 'hsl(162, 63%, 83%)', // #B5EAD7
					bright: 'hsl(162, 73%, 73%)',
					dark: 'hsl(162, 63%, 63%)',
					glow: 'hsla(162, 63%, 83%, 0.8)'
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
						transform: 'translateY(30px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'watercolor-flow': {
					'0%': { 
						backgroundPosition: '0% 50%',
						filter: 'hue-rotate(0deg) brightness(1.1)'
					},
					'25%': { 
						backgroundPosition: '25% 25%',
						filter: 'hue-rotate(5deg) brightness(1.2)'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						filter: 'hue-rotate(0deg) brightness(1.1)'
					},
					'75%': { 
						backgroundPosition: '75% 75%',
						filter: 'hue-rotate(-5deg) brightness(1.15)'
					},
					'100%': { 
						backgroundPosition: '0% 50%',
						filter: 'hue-rotate(0deg) brightness(1.1)'
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg) scale(1)' 
					},
					'33%': { 
						transform: 'translateY(-20px) rotate(2deg) scale(1.02)' 
					},
					'66%': { 
						transform: 'translateY(10px) rotate(-1deg) scale(0.98)' 
					}
				},
				'bounce-gentle': {
					'0%, 100%': { 
						transform: 'translateY(0px) scale(1)' 
					},
					'50%': { 
						transform: 'translateY(-12px) scale(1.05)' 
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% center'
					},
					'100%': {
						backgroundPosition: '200% center'
					}
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 30px rgba(224, 254, 254, 0.6), 0 0 60px rgba(199, 206, 234, 0.4)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 50px rgba(255, 218, 193, 0.8), 0 0 100px rgba(255, 154, 162, 0.6)',
						transform: 'scale(1.02)'
					}
				},
				'rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s cubic-bezier(0.4, 0, 0.2, 1)',
				'watercolor-flow': 'watercolor-flow 25s ease-in-out infinite',
				'float': 'float 8s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 4s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
				'rotate': 'rotate 4s linear infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			fontWeight: {
				'extra-bold': '800',
				'ultra-bold': '900',
			},
			backdropBlur: {
				'xs': '2px',
				'4xl': '72px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
