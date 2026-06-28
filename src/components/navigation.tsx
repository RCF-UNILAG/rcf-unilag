"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";

import { MenuIcon, X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink";

// ---------------------------------------------------------------------------
// Scroll-aware nav config
//
// Add an entry for any route where the nav should start transparent and
// transition to solid on scroll.
//
//   Key:   route pathname   (e.g. "/" or "/about")
//   Value: scroll distance in px before the nav becomes solid.
//          Use the special string "100vh" to match the full viewport height.
//
// Routes NOT listed here always display a solid black background.
// ---------------------------------------------------------------------------
export const NAV_SCROLL_CONFIG: Record<
  string,
  number | "100vh" | (() => number)
> = {
  "/": "100vh",
  "/about": 40 * 16,
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useNavBackground() {
  const pathname = usePathname();
  const [threshold, setThreshold] = React.useState(0);

  const routeConfig = NAV_SCROLL_CONFIG[pathname];
  const isTransparentRoute = routeConfig !== undefined;

  React.useEffect(() => {
    if (!isTransparentRoute) return;

    const calculateThreshold = () => {
      let t = 0;
      if (typeof routeConfig === "function") {
        t = routeConfig();
      } else if (routeConfig === "100vh") {
        t = window.innerHeight;
      } else {
        t = routeConfig; // For hardcoded numbers
      }

      // Subtracting 100 as per your previous logic
      setThreshold(Math.max(t - 100, 0));
    };

    // Run on mount
    calculateThreshold();

    // Recalculate if the user rotates their phone or resizes the browser
    window.addEventListener("resize", calculateThreshold);
    return () => window.removeEventListener("resize", calculateThreshold);
  }, [pathname, isTransparentRoute, routeConfig]);

  return { isTransparentRoute, threshold };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Navigation() {
  const isMobile = useIsMobile();

  const { scrollY } = useScroll();
  const { isTransparentRoute, threshold } = useNavBackground();

  // 2. Define the "fade zone"
  // Let's start the fade 150px BEFORE the threshold,
  // and reach full opacity exactly AT the threshold.
  const fadeStart = Math.max(0, threshold - 64);
  const fadeEnd = threshold;

  // 3. Map the scroll position to the background colors
  const dynamicBackground = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    ["rgba(0,0,0,0)", "rgba(0,0,0,1)"],
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 px-4 z-998"
      style={{
        backgroundColor: isTransparentRoute
          ? dynamicBackground
          : "rgba(0,0,0,1)",
      }}
    >
      <div className="h-16 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="RCF UNILAG"
            width={48}
            height={48}
            loading="eager"
            className="rounded-full"
          />
        </Link>
        {!isMobile && (
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">
              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/about">Who are we?</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Who are we?</NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl">
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-xl bg-linear-to-b px-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:px-6 md:py-2"
                          href="/about"
                        >
                          <div className="text-lg font-medium">
                            Who are we?
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            The Chosen Generation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/about#our-story" title="Our story"></ListItem>
                    <ListItem
                      href="/about#executives"
                      title="The Executives"
                    ></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              {/* <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>Sermons</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">Recent sermons</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">Podcast</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/sermons">Sermons</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/*<NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Event</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">Upcoming events</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">Weekly schedule</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>*/}

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/give">Give</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/ql">Quick links</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <NavigationDialog />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Mobile sheet dialog
// ---------------------------------------------------------------------------
function NavigationDialog() {
  const [open, setOpen] = React.useState(false);
  const linkClassName =
    "font-display font-black tracking-tighter text-2xl md:text-4xl text-white md:text-white/80 hover:text-white data-[active=true]:text-primary data-[active=true]:hover:text-primary uppercase";
  const close = () => setOpen(false);

  return (
    <SheetPrimitive.Root data-slot="sheet" open={open} onOpenChange={setOpen}>
      <SheetPrimitive.Trigger data-slot="sheet-trigger">
        <MenuIcon className="text-white" />
      </SheetPrimitive.Trigger>
      <SheetPrimitive.Portal data-slot="sheet-portal">
        <SheetPrimitive.Overlay
          data-slot="sheet-overlay"
          className="fixed inset-0 z-999 isolate bg-black/90 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        />
        <SheetPrimitive.Content
          data-slot="sheet-content"
          className={cn(
            "fixed inset-0 z-[1000] gap-4 rounded-xl p-4 text-sm text-white duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          )}
        >
          <header className="flex h-16 items-center justify-between">
            <SheetPrimitive.Title className="font-display font-bold text-xl leading-none tracking-tighter text-center">
              RCF<br />UNILAG
            </SheetPrimitive.Title>
            <SheetPrimitive.Close>
              <X className="w-8 h-8" />
            </SheetPrimitive.Close>
          </header>

          <div data-slot="sheet-header" className="w-full md:max-w-5xl mx-auto flex h-[calc(100dvh-5rem)] flex-col justify-center gap-4 p-4">
            <nav className="flex flex-col gap-4">
              <NavLink href="/" className={linkClassName} onClick={close}>
                Home
              </NavLink>
              <NavLink href="/about" className={linkClassName} onClick={close}>
                Who are we?
              </NavLink>
              <div className="ml-4 flex flex-col gap-2">
                <NavLink href="/about#our-story" className={cn(linkClassName, "font-medium")} onClick={close}>
                  Our Story
                </NavLink>
                <NavLink href="/about#executives" className={cn(linkClassName, "font-medium")} onClick={close}>
                  The Executives
                </NavLink>
              </div>
              <NavLink
                href="/sermons"
                className={linkClassName}
                onClick={close}
              >
                Sermons
              </NavLink>
              <NavLink
                href="/give"
                className={linkClassName}
                onClick={close}
              >
                Give
              </NavLink>
              <NavLink href="/ql" className={linkClassName} onClick={close}>
                Links
              </NavLink>
            </nav>
          </div>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// Would be used later on for the desktop navigation links
// ---------------------------------------------------------------------------
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
