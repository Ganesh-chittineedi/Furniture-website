tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        serif: ['"Playfair Display"', 'serif'],
                    },
                    colors: {
                        brandAmber: '#D97706',
                        brandGold: '#F59E0B',
                        woodTeak: '#8B4513',
                        woodDark: '#2C180C',
                        warmBg: '#FAF7F2',
                        cardBg: '#FFFFFF',
                        borderSand: '#E5DEC9',
                        textMain: '#1F2937',
                        textMuted: '#6B7280',
                    },
                    keyframes: {
                        marquee: {
                            '0%': { transform: 'translateX(0%)' },
                            '100%': { transform: 'translateX(-50%)' },
                        },
                        floatItem: {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-8px) rotate(3deg)' },
                        },
                        pulseGlow: {
                            '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
                            '50%': { opacity: '1', transform: 'scale(1.05)' },
                        },
                        shimmer: {
                            '0%': { backgroundPosition: '-200% 0' },
                            '100%': { backgroundPosition: '200% 0' }
                        },
                        bounceSlow: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-5px)' }
                        }
                    },
                    animation: {
                        marquee: 'marquee 25s linear infinite',
                        floatItem: 'floatItem 3.5s ease-in-out infinite',
                        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
                        shimmer: 'shimmer 3s linear infinite',
                        bounceSlow: 'bounceSlow 2s ease-in-out infinite',
                    }
                }
            }
        }
