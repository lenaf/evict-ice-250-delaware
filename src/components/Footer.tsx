import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Evict ICE from 250 Delaware
        </p>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-wider">
          <Link href="#facts" className="text-white/40 hover:text-[#FFD600] transition-colors">The Facts</Link>
          <Link href="#join" className="text-white/40 hover:text-[#FFD600] transition-colors">Join Us</Link>
        </nav>
      </div>
    </footer>
  );
}
