"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [ isOpen, setIsOpen ] = useState(false)

  const NavItems = () => (
    <>
      <Link href="/" className={`hover:underline ${pathname === '/' ? 'font-bold' : ''}`}
            onClick={() => setIsOpen(false)}>Главная</Link>
      <Link href="/about" className={`hover:underline ${pathname === '/about' ? 'font-bold' : ''}`}
            onClick={() => setIsOpen(false)}>О нас</Link>
      <Link href="/contact" className={`hover:underline ${pathname === '/contact' ? 'font-bold' : ''}`}
            onClick={() => setIsOpen(false)}>Контакты</Link>
    </>
  )

  return (
    // <header className="border-b">
    <header className="container mx-auto px-4 py-4">
      <div className="flex flex-wrap justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold text-project-primary">Микрозаймы</h1>
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <NavItems/>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <MoonIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">Переключить тему</span>
          </Button>
        </nav>
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mr-2"
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <MoonIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">Переключить тему</span>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-[1.2rem] w-[1.2rem]"/>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems/>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <p>Небольшие займы для больших идей</p>
    </header>
  )
}
