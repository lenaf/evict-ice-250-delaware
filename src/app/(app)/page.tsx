import { CountdownTimer } from "@/components/CountdownTimer";

export default function Home() {
  return (
    <main className="min-h-screen pt-[72px]">
      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-black text-white px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-extrabold text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight">
            EVICT <span className="text-cyan-400">ICE!</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold mt-2 tracking-wide">
            FROM 250 DELAWARE
          </p>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed opacity-90">
            Uniland leases 250 Delaware to DHS for New York State ICE
            operations. We are Buffalonians organizing to convince them not to
            renew.
          </p>
        </div>
      </section>

      {/* ========== RED STAT BANNER ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-12 py-8">
        <div className="container mx-auto max-w-5xl">
          <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
            7,258 NEIGHBORS WERE TAKEN FROM OUR COMMUNITIES IN 2025
          </p>
        </div>
      </section>

      {/* ========== BLUE SECTION ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            WHEN A WALL AWAY
            <br />
            FEELS LIKE A WORLD AWAY.
          </h2>
          <h3 className="text-xl md:text-2xl font-bold mt-6 text-cyan-300">
            YOU KNOW YOU&apos;RE AT 250 DELAWARE
          </h3>
          <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
            <div className="text-lg leading-relaxed opacity-90 space-y-4">
              <p>
                On the first floor, there’s a fine dining restaurant, and across
                the lobby is the entrance to a luxury hotel. People come and go
                from the building every day without realizing that just a few
                floors above them, on the seventh floor, ICE is deciding the
                fate of our neighbors—whether they will be allowed to remain in
                the city they call home or face indefinite detention and
                deportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== YELLOW "1 YEAR" SECTION ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            WE HAVE 1 YEAR
            <br />
            TO CHANGE THAT.
          </h2>
        </div>
      </section>

      {/* ========== THE FACTS SECTION ========== */}
      <section
        id="facts"
        className="bg-[#F1F5F9] text-black px-6 md:px-12 py-16 md:py-24 scroll-mt-20"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
            THE FACTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-extrabold uppercase mb-4 text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-3">
                Buffalo DHS Operations
              </h3>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>
                  Downtown Buffalo's 250 Delaware Avenue houses four ICE offices
                  that control operations, detention management, reporting,
                  logistics, and administration for all of New York State
                  outside of NYC.
                </li>
                <li>
                  Every ICE action in Western New York, Central New York, the
                  Finger Lakes, Southern Tier, North Country, Mohawk Valley,
                  Capital Region, and Mid-Hudson—all of it—is coordinated from
                  250 Delaware.
                </li>
              </ul>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-extrabold uppercase mb-4 text-[#DC2626] border-b-2 border-[#DC2626] pb-3">
                Who Owns 250 Delaware
              </h3>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>
                  Uniland Development (the Montante family) owns the building
                  and Delaware North (the Jacobs family) is the anchor tenant.
                  In 2013, the Erie County Industrial Development Agency
                  approved $9.6 million in property and sales tax breaks for
                  this project—public money that subsidized a building now
                  profiting from ICE operations.
                </li>
                <li>
                  Today, Uniland collects $2 million per year from ICE’s lease,
                  while taxpayers continue to subsidize the building through
                  generous tax abatement that cost Buffalo and Erie County
                  $791,000 in 2024 alone.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RED TAX DOLLARS SECTION ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            OUR TAX DOLLARS ARE
            <br />
            HELPING LANDLORDS PROFIT
            <br />
            FROM MASS DEPORTATIONS.
          </h2>
        </div>
      </section>

      {/* ========== COUNTDOWN / TAKE BACK BUFFALO SECTION ========== */}
      <section
        id="action"
        className="bg-[#FFD600] text-black px-6 md:px-12 py-16 md:py-24 scroll-mt-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Countdown Widget */}
            <div className="bg-black text-white rounded-xl p-8 flex flex-col items-center justify-center min-h-[280px]">
              <p className="text-sm uppercase tracking-widest mb-4 opacity-70">
                ICE Lease Expires In
              </p>
              <CountdownTimer targetDate="2027-03-31T00:00:00" />
              <p className="text-sm uppercase tracking-widest mt-4 opacity-70">
                March 2027
              </p>
            </div>
            {/* Take Back Buffalo */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                TIME TO TAKE
                <br />
                BACK BUFFALO
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ========== JUST GETTING STARTED SECTION ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-12 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
            WE ARE JUST GETTING STARTED.
          </h2>
          <div className="flex justify-center">
            <p className="text-2xl md:text-3xl font-extrabold">
              EVICT <span className="text-[#DC2626]">ICE!</span>
              <span className="block text-sm font-bold tracking-widest mt-1">
                FROM 250 DELAWARE
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
