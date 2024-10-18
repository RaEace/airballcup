/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    	fontSize: {
    		sm: '12px',
    		base: '1rem',
    		xl: '1.25rem',
    		'2xl': '1.563rem',
    		'3xl': '1.953rem',
    		'4xl': '2.441rem',
    		'5xl': '3.052rem'
    	},
    	extend: {
    		backgroundImage: {
    			cta: "url('/src/assets/photos/bg-img.png')",
    		},
    		animation: {
    			marquee: 'marquee 14s linear infinite',
    			marquee2: 'marquee2 14s linear infinite',
    			'float-left': 'float-left 5s ease-in-out infinite',
    			'float-right': 'float-right 5s ease-in-out infinite',
    			slideInRight: 'slideInRight 0.3s ease-in-out',
    			slideUp: 'slideUp 0.3s ease-in-out',
    			slideDown: 'slideDown 0.3s ease-in-out',
    			'collapsible-down': 'accordion-down 0.2s ease-out',
    			'collapsible-up': 'accordion-up 0.2s ease-out',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			marquee: {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-100%)'
    				}
    			},
    			marquee2: {
    				'0%': {
    					transform: 'translateX(100%)'
    				},
    				'100%': {
    					transform: 'translateX(0%)'
    				}
    			},
    			slideInRight: {
    				'0%': {
    					transform: 'translateX(100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateX(0)',
    					opacity: '1'
    				}
    			},
    			'float-left': {
    				'0%, 100%': {
    					transform: 'translate(0, 0)'
    				},
    				'50%': {
    					transform: 'translate(10px, -10px)'
    				}
    			},
    			'float-right': {
    				'0%, 100%': {
    					transform: 'translate(0, 0)'
    				},
    				'50%': {
    					transform: 'translate(-10px, -10px)'
    				}
    			},
    			slideUp: {
    				'0%': {
    					transform: 'translateY(100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			slideDown: {
    				'0%': {
    					transform: 'translateY(-100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			'collapsible-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-collapsible-content-height)'
    				}
    			},
    			'collapsible-up': {
    				from: {
    					height: 'var(--radix-collapsible-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
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
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		fontFamily: {
    			display: ["Thunder", "sans-serif"],
    			text: ["Obviously", "sans-serif"]
    		},
    		colors: {
    			gray: {
    				'25': '#FCFCFD',
    				'50': '#F9FAFB',
    				'100': '#F2F4F7',
    				'200': '#E4E7EC',
    				'300': '#D0D5DD',
    				'400': '#98A2B3',
    				'500': '#667085',
    				'600': '#475467',
    				'700': '#344054',
    				'800': '#1D2939',
    				'900': '#101828'
    			},
    			primary: {
    				'25': '#FFFFF4',
    				'50': '#FFFDE4',
    				'100': '#FDDFD1',
    				'200': '#FCB8A3',
    				'300': '#F78875',
    				'400': '#EF5B51',
    				'500': '#E51C21',
    				'600': '#C41428',
    				'700': '#A40E2C',
    				'800': '#84082C',
    				'900': '#6D052C'
    			},
    			secondary: {
    				'25': '#F7FCFF',
    				'50': '#EBF7FF',
    				'100': '#DAEFFD',
    				'200': '#B6DFDB',
    				'300': '#A5D3F7',
    				'400': '#8FC4F4',
    				'500': '#4587DC',
    				'600': '#32688D',
    				'700': '#224D9E',
    				'800': '#16367F',
    				'900': '#0D2569'
    			},
    			error: {
    				'25': '#FFF8FA',
    				'50': '#FEF3F2',
    				'100': '#FEE4E2',
    				'200': '#FECFDA',
    				'300': '#FDA29B',
    				'400': '#F97066',
    				'500': '#F04438',
    				'600': '#D92D20',
    				'700': '#B42318',
    				'800': '#912018',
    				'900': '#7A271A'
    			},
    			destructive: {
    				'25': '#FFF8FA',
    				'50': '#FEF3F2',
    				'100': '#FEE4E2',
    				'200': '#FECFDA',
    				'300': '#FDA29B',
    				'400': '#F97066',
    				'500': '#F04438',
    				'600': '#D92D20',
    				'700': '#B42318',
    				'800': '#912018',
    				'900': '#7A271A'
    			},
    			warning: {
    				'25': '#FFFCEF',
    				'50': '#FFF7EB',
    				'100': '#FECF07',
    				'200': '#FFE1A9',
    				'300': '#FEC84B',
    				'400': '#FDB022',
    				'500': '#F79009',
    				'600': '#DC6803',
    				'700': '#B54708',
    				'800': '#93370D',
    				'900': '#7A2E0E'
    			},
    			success: {
    				'25': '#F6FEF9',
    				'50': '#ECFDF3',
    				'100': '#D1FADF',
    				'200': '#A6F4C5',
    				'300': '#6CE9A6',
    				'400': '#32D583',
    				'500': '#12B76A',
    				'600': '#039855',
    				'700': '#027A48',
    				'800': '#05603A',
    				'900': '#054F31'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontSize: {
    			'display-l': ['131px', {lineHeight: '93%', letterSpacing: '0%'}],
    			'display-s': ['72px', {lineHeight: '90%', letterSpacing: '0%'}],
    			'title-l': ['52px', {lineHeight: '93%', letterSpacing: '0%'}],
    			'title-m': ['40px', {lineHeight: '93%', letterSpacing: '0%'}],
    			'title-s': ['28px', {lineHeight: '93%', letterSpacing: '0%'}],
    			'subtitle-l': ['24px', {lineHeight: '93%', letterSpacing: '0%'}],
    			'subtitle-m': ['16px', {lineHeight: '130%', letterSpacing: '0%'}],
    			'button-l': ['16px', {lineHeight: '120%', letterSpacing: '2%'}],
    			'button-m': ['14px', {lineHeight: '120%', letterSpacing: '2%'}],
    			'button-s': ['12px', {lineHeight: '120%', letterSpacing: '2%'}],
    			'text-m': ['12px', {lineHeight: '160%', letterSpacing: '1%'}],
    			'text-s': ['10px', {lineHeight: '160%', letterSpacing: '1%'}],
    			'tag-l': ['12px', {lineHeight: '120%', letterSpacing: '1%'}],
    			'tag-m': ['10px', {lineHeight: '120%', letterSpacing: '1%'}]
    		},
    		fontWeight: {
    			extrabold: '800',
    			bold: '700',
    			medium: '500',
    			light: '300'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};
