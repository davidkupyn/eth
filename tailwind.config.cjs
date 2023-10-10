import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config}*/
const config = {
	future: {
		hoverOnlyWhenSupported: true
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--color-primary))',
					focus: 'var(--color-primary-focus)',
					foreground: 'var(--color-primary-foreground)',
					...colors.zinc
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					focus: 'var(--color-accent-focus)',
					foreground: 'var(--color-accent-foreground)',
					...colors.amber
				},
				base: colors.zinc,
				background: 'hsl(var(--color-background))',
				foreground: 'hsl(var(--color-foreground))',
				card: {
					DEFAULT: 'hsl(var(--color-card))',
					foreground: 'hsl(var(--color-card-foreground))'
				},
				border: 'hsl(var(--border))',
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)'
				},
				popover: {
					DEFAULT: 'var(--color-popover)',
					foreground: 'var(--color-popover-foreground)',
					border: 'var(--color-popover-border)'
				},
				error: {
					DEFAULT: 'var(--color-error)',
					foreground: 'var(--color-error-foreground)',
					focus: 'var(--color-error-focus)',
					...colors.rose
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					foreground: 'var(--color-warning-foreground)',
					focus: 'var(--color-warning-focus)',
					...colors.amber
				},
				success: {
					DEFAULT: 'var(--color-success)',
					foreground: 'var(--color-success-foreground)',
					focus: 'var(--color-success-focus)',
					...colors.green
				},
				info: {
					DEFAULT: 'var(--color-info)',
					foreground: 'var(--color-info-foreground)',
					focus: 'var(--color-info-focus)',
					...colors.blue
				}
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 0.375rem)',
				DEFAULT: 'calc(var(--radius) - 0.25rem)',
				md: 'calc(var(--radius) - 0.125rem)',
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) + 0.25rem)',
				'2xl': 'calc(var(--radius) + 0.75rem)',
				'3xl': 'calc(var(--radius) + 1.0rem)'
			},
			fontFamily: {
				sans: ['Manrope', ...defaultTheme.fontFamily.sans],
				display: ['Manrope', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [forms]
};

module.exports = config;
