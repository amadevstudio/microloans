import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: [ "class" ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
				'project-primary': 'var(--project-color-primary)', // Используйте в классе: bg-primary для фона, text-primary для текста
				// Используйте его для заголовков, кнопок и важных элементов. Этот цвет вызывает доверие и ассоциируется с надежностью.
				'project-secondary': 'var(--project-color-secondary)', // Используйте в классе: bg-secondary для фона, text-secondary для текста
				// Подходит для акцентов, таких как кнопки "Получить займ" или "Узнать больше". Он символизирует рост и финансовое благополучие.
				'project-background': 'var(--project-color-background)', // Используйте в классе: bg-background для фона
				// Используйте его для фона, чтобы создать чистый и современный вид, который не отвлекает от основного контента.
				'project-text': 'var(--project-color-text)', // Используйте в классе: text-text для цвета текста
				// Этот цвет хорошо читается на светлом фоне и создает ощущение серьезности и профессионализма.
				'project-accent': 'var(--project-color-accent)', // Используйте в классе: bg-accent для фона, text-accent для текста
				// Используйте его для выделения специальных предложений или акций. Он может побудить к действию, но не должен доминировать.
				'project-link': 'var(--project-color-link)', // Используйте в классе: text-link для цвета ссылок
				// Более темный оттенок синего для ссылок, чтобы они выделялись, но оставались в рамках общей цветовой схемы.

				primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        background: 'hsl(var(--background))',
        text: 'var(--color-text)',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        link: 'var(--color-link)',
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
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [ require("tailwindcss-animate") ],
};
export default config;
