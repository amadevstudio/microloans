"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalQuery } from "@/app/_queries/gql/graphql";

export default function Header({ global }: { global: GlobalQuery["global"] }) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    const handleResize = () => setInnerHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  function headerShouldBeHidden() {
    return hideHeader && innerHeight < 900;
  }

  const NavItems = () => (
    <>
      <Link
        href="/"
        className={`hover:text-primary transition-colors ${pathname === "/" ? "font-bold text-primary" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        Главная
      </Link>
      <Link
        href="/about"
        className={`hover:text-primary transition-colors ${pathname === "/about" ? "font-bold text-primary" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        О нас
      </Link>
      <Link
        href="/contact"
        className={`hover:text-primary transition-colors ${pathname === "/contact" ? "font-bold text-primary" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        Контакты
      </Link>
    </>
  );

  return (
    <header
      className={`border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      } ${headerShouldBeHidden() ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span
            className={`font-bold text-primary transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"}`}
          >
            {global?.siteName}
          </span>
          <span
            className={`text-muted-foreground transition-all duration-300 ${scrolled ? "text-xs" : "text-sm"}`}
          >
            {global?.motto}
          </span>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <NavItems />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4"
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
          </Button>
        </nav>
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
