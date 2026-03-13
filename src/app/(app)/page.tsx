export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Delaware Eviction Prevention</h1>
        <p className="text-xl mb-8">
          Resources and information to help Delaware residents facing eviction.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Emergency Resources</h2>
          <ul className="space-y-2">
            <li>• Emergency Rental Assistance</li>
            <li>• Legal Aid Services</li>
            <li>• Housing Counseling</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Know Your Rights</h2>
          <p>Understanding your rights as a tenant is crucial. Learn about eviction procedures, notice requirements, and your legal protections.</p>
        </section>
      </div>
    </main>
  );
}
