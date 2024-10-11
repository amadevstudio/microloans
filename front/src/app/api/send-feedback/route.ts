import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Все поля обязательны для заполнения' }, { status: 400 })
  }

  const telegramMessage = `
Новое сообщение с сайта:
Имя: ${name}
Email: ${email}
Сообщение: ${message}
  `.trim()

  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram configuration is missing')
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    })

    if (!response.ok) {
      throw new Error('Ошибка отправки сообщения в Telegram')
    }

    return NextResponse.json({ message: 'Сообщение успешно отправлено' })
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ error: 'Произошла ошибка при отправке сообщения' }, { status: 500 })
  }
}
