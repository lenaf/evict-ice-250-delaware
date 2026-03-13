import Link from "next/link";

export function Footer() {
  const orgName = "Delaware Eviction Prevention";
  const tagline = "Providing resources and support for Delaware residents facing eviction";

  const footerLinks = [
    { title: "Home", slug: "" },
    { title: "Resources", slug: "resources" },
    { title: "Know Your Rights", slug: "rights" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{orgName}</h3>
            <p className="opacity-80">{tagline}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 opacity-80">
              {footerLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${link.slug}`} className="hover:text-accent transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Emergency Help</h3>
            <p className="opacity-80 mb-4">If you need immediate assistance, call 211 for Delaware resources</p>
          </div>
        </div>

        <div className="border-t border-neutral-content/20 mt-8 pt-8 text-center opacity-70">
          <p>&copy; {new Date().getFullYear()} {orgName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
