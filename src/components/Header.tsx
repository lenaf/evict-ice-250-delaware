import Link from "next/link";

export function Header() {
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Resources", href: "/resources" },
    { title: "Know Your Rights", href: "/rights" },
    { title: "Get Help", href: "/help" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl text-base-content shadow-md border-b border-gray-200/20">
      <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="font-bold text-xl">
          Delaware Eviction Prevention
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
