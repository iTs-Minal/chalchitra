"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";


export function NavbarSection() {
  const navItems = [
    {
      name: "Movies",
      link: "/home/movies",
    },
    {
      name: "Top ImDB",
      link: "/home/topimdb",
    },
    {
      name: "TV Shows",
      link: "/home/tvshows",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center top-1 gap-4">
            <SignedOut>
              <SignInButton>
                <NavbarButton variant="secondary">Sign In</NavbarButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
              />
            </SignedIn>
 
              <NavbarButton href="/home">Get Started</NavbarButton>

          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              
                <SignedOut>
                  <SignInButton>
                    <NavbarButton variant="secondary" href="/sign-in">Sign In</NavbarButton>
                  </SignInButton>
                </SignedOut> 
              
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "shadow-xl",
                      userPreviewMainIdentifier: "font-semibold",
                    },
                  }}
                />
              </SignedIn>
              
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                  href="/home"
                >
                  Get Started
                </NavbarButton>
              
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
