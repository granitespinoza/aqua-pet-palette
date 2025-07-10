
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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
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
				// Professional Brand Colors
				brand: {
					50: 'hsl(210, 40%, 98%)',
					100: 'hsl(210, 40%, 96%)',
					200: 'hsl(214, 32%, 91%)',
					300: 'hsl(213, 27%, 84%)',
					400: 'hsl(215, 20%, 65%)',
					500: 'hsl(215, 16%, 47%)',
					600: 'hsl(215, 19%, 35%)',
					700: 'hsl(215, 25%, 27%)',
					800: 'hsl(217, 33%, 17%)',
					900: 'hsl(222, 47%, 11%)',
					950: 'hsl(229, 84%, 5%)'
				},
				// Elegant Grays
				neutral: {
					0: 'hsl(0, 0%, 100%)',
					50: 'hsl(210, 20%, 98%)',
					100: 'hsl(220, 14%, 96%)',
					200: 'hsl(220, 13%, 91%)',
					300: 'hsl(216, 12%, 84%)',
					400: 'hsl(218, 11%, 65%)',
					500: 'hsl(220, 9%, 46%)',
					600: 'hsl(215, 14%, 34%)',
					700: 'hsl(217, 19%, 27%)',
					800: 'hsl(215, 28%, 17%)',
					900: 'hsl(221, 39%, 11%)',
					950: 'hsl(224, 71%, 4%)'
				},
				// Success Colors
				success: {
					50: 'hsl(138, 76%, 97%)',
					100: 'hsl(141, 84%, 93%)',
					200: 'hsl(141, 79%, 85%)',
					300: 'hsl(142, 77%, 73%)',
					400: 'hsl(142, 69%, 58%)',
					500: 'hsl(142, 71%, 45%)',
					600: 'hsl(142, 76%, 36%)',
					700: 'hsl(142, 72%, 29%)',
					800: 'hsl(143, 64%, 24%)',
					900: 'hsl(144, 61%, 20%)',
					950: 'hsl(146, 80%, 10%)'
				},
				// Warning Colors
				warning: {
					50: 'hsl(55, 92%, 95%)',
					100: 'hsl(55, 97%, 88%)',
					200: 'hsl(53, 98%, 77%)',
					300: 'hsl(50, 98%, 64%)',
					400: 'hsl(48, 96%, 53%)',
					500: 'hsl(45, 93%, 47%)',
					600: 'hsl(41, 96%, 40%)',
					700: 'hsl(35, 91%, 33%)',
					800: 'hsl(32, 81%, 29%)',
					900: 'hsl(28, 73%, 26%)',
					950: 'hsl(23, 83%, 14%)'
				},
				// Error Colors
				error: {
					50: 'hsl(0, 86%, 97%)',
					100: 'hsl(0, 93%, 94%)',
					200: 'hsl(0, 96%, 89%)',
					300: 'hsl(0, 94%, 82%)',
					400: 'hsl(0, 91%, 71%)',
					500: 'hsl(0, 84%, 60%)',
					600: 'hsl(0, 72%, 51%)',
					700: 'hsl(0, 74%, 42%)',
					800: 'hsl(0, 70%, 35%)',
					900: 'hsl(0, 63%, 31%)',
					950: 'hsl(0, 75%, 15%)'
				},
				// Tenant Specific Colors
				dogshop: {
					50: 'hsl(24, 100%, 97%)',
					100: 'hsl(24, 100%, 94%)',
					200: 'hsl(24, 100%, 87%)',
					300: 'hsl(25, 100%, 77%)',
					400: 'hsl(25, 95%, 64%)',
					500: 'hsl(25, 95%, 53%)',
					600: 'hsl(21, 90%, 48%)',
					700: 'hsl(17, 88%, 40%)',
					800: 'hsl(15, 79%, 34%)',
					900: 'hsl(15, 75%, 28%)',
					950: 'hsl(13, 81%, 14%)'
				},
				catshop: {
					50: 'hsl(316, 100%, 97%)',
					100: 'hsl(317, 100%, 94%)',
					200: 'hsl(316, 91%, 87%)',
					300: 'hsl(317, 90%, 77%)',
					400: 'hsl(317, 87%, 65%)',
					500: 'hsl(316, 78%, 52%)',
					600: 'hsl(316, 72%, 43%)',
					700: 'hsl(315, 70%, 36%)',
					800: 'hsl(315, 66%, 30%)',
					900: 'hsl(314, 62%, 26%)',
					950: 'hsl(316, 69%, 14%)'
				},
				vetshop: {
					50: 'hsl(213, 100%, 97%)',
					100: 'hsl(214, 95%, 93%)',
					200: 'hsl(213, 97%, 87%)',
					300: 'hsl(212, 96%, 78%)',
					400: 'hsl(213, 94%, 68%)',
					500: 'hsl(217, 91%, 60%)',
					600: 'hsl(221, 83%, 53%)',
					700: 'hsl(224, 76%, 48%)',
					800: 'hsl(226, 71%, 40%)',
					900: 'hsl(224, 64%, 33%)',
					950: 'hsl(226, 65%, 21%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'pulse-subtle': 'pulse-subtle 2s infinite',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'scale-in': 'scale-in 0.2s ease-out'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			boxShadow: {
				'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
				'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
				'large': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
				'glow': '0 0 24px rgba(59, 130, 246, 0.15)',
				'glow-sm': '0 0 12px rgba(59, 130, 246, 0.1)',
			},
			backdropBlur: {
				'xs': '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
