import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-extrabold text-xl mb-2">
              EVICT <span className="text-cyan-400">ICE!</span>
            </p>
            <p className="text-sm opacity-70">FROM 250 DELAWARE</p>
            <p className="mt-4 text-sm opacity-60 leading-relaxed">
              A community campaign to end ICE operations at 250 Delaware Avenue, Buffalo NY.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 opacity-70">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="#facts" className="hover:text-cyan-400 transition-colors">The Facts</Link></li>
              <li><Link href="#action" className="hover:text-cyan-400 transition-colors">Take Action</Link></li>
              <li><Link href="#involved" className="hover:text-cyan-400 transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 opacity-70">Stand With Us</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Join your neighbors in the fight to reclaim 250 Delaware for our community.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-50">
          <p>&copy; {new Date().getFullYear()} Evict ICE from 250 Delaware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
