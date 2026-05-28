"use client";

import React from "react";
import Link from "next/link";
import { SourceLink } from "../SourceLink";

interface InstitutionCardProps {
  person: string;
  role: string;
  org: string;
  href?: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  person,
  role,
  org,
  href,
}) => (
  <div className="border-2 border-black p-4 hover:border-[#DC2626] transition-colors">
    <p className="font-black text-sm text-black">{person}</p>
    <p className="text-sm text-black/60">
      {role},{" "}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#DC2626] transition-colors"
        >
          {org}
        </a>
      ) : (
        org
      )}
    </p>
  </div>
);

export const WhoProfits: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="bg-black text-white px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/40 mb-3">
            <Link href="/facts" className="hover:text-white transition-colors">
              The Facts
            </Link>
          </p>
          <p className="text-sm uppercase tracking-wider text-[#DC2626] mb-2">
            Uniland &amp; the Montante family
          </p>
          <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
            Who Profits
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            The Montante family collects $2 million a year from ICE for housing
            operations at 250 Delaware. The lease is theirs to renew — or not.
          </p>
        </div>
      </section>

      {/* ========== NAV ========== */}
      <div className="bg-white border-b border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/what-happens-inside"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: What Happens Inside
          </Link>
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pays &rarr;
          </Link>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-14">
            <p>
              Carl Montante Sr. founded{" "}
              <SourceLink
                href="https://littlesis.org/news/buffalos-immigrant-detention-profiteers/"
                label="Uniland Development"
              />{" "}
              with his brother Thomas in 1974. He remains president and managing
              director, holding 82.99% ownership. Three of his children — Laura
              Zaepfel, Carl Montante Jr., and Michael Montante — are vice
              presidents.
            </p>
            <p>
              Uniland is headquartered in Amherst and is one of the largest
              commercial developers in the Buffalo region. Their federal lease
              at 250 Delaware pays them approximately{" "}
              <SourceLink
                href="https://www.usaspending.gov/award/CONT_IDV_GS02B23305_4740"
                label="$2 million per year"
              />{" "}
              from ICE — over{" "}
              <strong className="text-black">$11 million in total</strong> since
              2002. This makes them the{" "}
              <SourceLink
                href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                label="biggest local profiteer"
              />{" "}
              from immigration enforcement operations in the region.
            </p>
            <p>
              The ICE lease at 250 Delaware expires{" "}
              <strong className="text-[#DC2626]">March 31, 2027</strong>. The
              decision to renew is Uniland&apos;s alone. No government body can
              force them to keep it. The question is whether they will choose
              profit over people.
            </p>
          </div>

          {/* Power map */}
          <div className="border-2 border-black p-6 md:p-8 mb-14">
            <h2 className="font-black text-2xl md:text-3xl leading-tight mb-3">
              The power map
            </h2>
            <p className="text-base text-black/60 mb-6">
              The Montante family&apos;s connections across Buffalo&apos;s
              institutions — mapped by{" "}
              <SourceLink
                href="https://littlesis.org/oligrapher/11658"
                label="LittleSis"
              />
              .
            </p>
            <a
              href="https://littlesis.org/oligrapher/11658"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/power-map.svg"
                alt="Power map showing the Montante family's connections to Buffalo institutions including Canisius, D'Youville, Roswell Park, Buffalo Niagara Partnership, and ICE/CBP"
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Other landlords */}
          <div className="bg-black text-white p-6 md:p-8 mb-14">
            <h3 className="font-black text-lg md:text-xl text-[#DC2626] mb-3">
              They&apos;re not alone
            </h3>
            <p className="text-base leading-relaxed text-white/80">
              An{" "}
              <SourceLink
                href="https://investigativepost.org/2026/02/20/landlords-earn-millions-from-immigration-leases/"
                label="Investigative Post investigation"
              />{" "}
              found <strong className="text-[#FFD600]">14 locations</strong>{" "}
              across Buffalo and its suburbs leased to immigration agencies —
              generating over{" "}
              <strong className="text-[#FFD600]">$12 million annually</strong>{" "}
              for landlords including Larkin Development Group (Zemsky family),
              Ellicott Development (Paladino family), Boyd Waterson, and Iskalo
              Development.
            </p>
          </div>
        </div>
      </section>

      {/* ========== MONTANTE INFLUENCE INTRO ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Montante Influence
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70">
            <p>
              In addition to controlling and extracting value from a huge real
              estate portfolio across Western New York, the Montante family that
              owns Uniland Development and makes millions of dollars per year
              leasing space to ICE and CBP has governing seats at a number of
              local organizations and institutions. Members of the Montante
              family sit on boards of local private high schools and colleges,
              philanthropic organizations, elite clubs, religious institutions
              and business advocacy groups, giving the family profound influence
              over civil society in the Buffalo area.
            </p>
            <p>
              In 2025, Buffalo Business First named Michael Montante and Carl
              Montante Sr. respectively the{" "}
              <strong className="text-black">No. 27</strong> and{" "}
              <strong className="text-black">No. 139</strong>{" "}
              <SourceLink
                href="https://www.canisius.edu/news/canisius-alumni-among-most-influential-wny"
                label="most powerful people"
              />{" "}
              in Western New York.
            </p>
            <p>
              The Montante family&apos;s profiteering from the Trump
              administration&apos;s campaign of terror against migrants puts
              them at odds with many of the institutions to which they have
              relationships, particularly the Catholic church. In September
              2025, Pope Leo XIV{" "}
              <SourceLink
                href="https://www.theguardian.com/world/2025/nov/19/pope-leo-donald-trump-immigration-policy-us"
                label="denounced"
              />{" "}
              the Trump administration immigration crackdown from which the
              Montante family brings in more than $2 million every year as{" "}
              <strong className="text-[#DC2626]">&ldquo;inhuman&rdquo;</strong>.
            </p>
            <p>
              The Buffalo Niagara Partnership, where successive generations of
              Montante family members have held board seats, has made statements{" "}
              <SourceLink
                href="https://www.wkbw.com/news/local-news/buffalo/we-were-blindsided-buffalo-refugee-agencies-start-crisis-fund"
                label="embracing immigrants"
              />
              , particularly refugees, for their contributions to the local
              economy while ICE has coordinated targeted operations against
              refugees re-settled in Buffalo out of the Montante family&apos;s
              &ldquo;crown jewel&rdquo; building at 250 Delaware Ave.
            </p>
            <p>
              Thus far, neither their Catholic faith nor their ties to local
              organizations that support justice for migrants and refugees have
              convinced the Montante family to break their ties to ICE and CBP
              and the millions of dollars they make hosting their forces.
            </p>
            <p>
              Below, we detail some of the positions at local institutions held
              by several members of the Montante family, including Carl Montante
              Sr., the executive chairman of Uniland, and his children Michael
              Montante, the CEO of Uniland, Laura Zaepfel, the Vice President of
              Corporate Relations at Uniland, and Carl Montante Jr.,
              Uniland&apos;s Vice President of Marketing and Strategic
              Initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* ========== DIOCESE ========== */}
      <section className="bg-[#1E3A8A] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Diocese of Buffalo
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/80">
            <p>
              The Montante family has deep ties to the Buffalo Diocese of the
              Catholic church. Patriarch Carl Montante Sr. said he was a member
              of the Bishop&apos;s Council of the Laity, an{" "}
              <SourceLink
                href="https://web.archive.org/web/20220704130300/https://laydob.com/2019/10/05/silence-gives-consent-bishops-council-of-the-laity/"
                label="invitation-only"
              />{" "}
              diocesan organization that raises money for the church and gives
              advice directly to the bishop, for more than 25 years,{" "}
              <SourceLink
                href="https://buffalonews.com/news/local/prominent-local-catholics-demand-reforms-to-buffalo-diocese/article_bff424d9-0d0d-5ebc-b1c6-094ee3ee2740.html"
                label="implying"
              />{" "}
              that he stepped down from the organization due to the
              diocese&apos;s cover-up of sexual abuse by the clergy. According
              to a{" "}
              <SourceLink
                href="https://laydob.com/wp-content/uploads/2020/04/2019-bcl-with-notes.pdf"
                label="leaked list"
              />{" "}
              of members of the Bishop&apos;s Council of the Laity, Laura
              Zaepfel was still a member of that group in 2019.
            </p>
            <p>
              Carl Montante Sr. was a founding member of the{" "}
              <SourceLink
                href="https://movementtorestoretrust.org/leadership/"
                label="Movement to Restore Trust"
              />
              , an effort by prominent local Catholics to navigate the fallout
              from the church&apos;s sexual abuse scandal. Other central
              organizers of the Movement to Restore Trust include John Hurley,
              then the President of Canisius University, where the Montante
              family has had deep ties for generations as described below.
            </p>
            <p>
              Montante Sr. was awarded the Bishop&apos;s Medal by the Buffalo
              Diocese in 2009, according to his{" "}
              <SourceLink
                href="https://uniland.com/carl-j-montante/"
                label="biography"
              />{" "}
              on the Uniland website.
            </p>
            <p>
              According to Laura Zaepfel&apos;s{" "}
              <SourceLink
                href="https://uniland.com/laura-a-zaepfel/"
                label="Uniland biography"
              />
              , she is a former trustee of Catholic Charities, the
              diocese&apos;s philanthropic arm, and the former chair of Catholic
              Charities&apos; Eight-County Annual Appeal. Zaepfel is also a
              former trustee of the Foundation of the Roman Catholic Diocese of
              Buffalo, and a former chair of that foundation&apos;s Advancement
              Committee.
            </p>
          </div>
        </div>
      </section>

      {/* ========== EDUCATION ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Educational Institutions
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-10">
            <p>
              The Montante family&apos;s ties to the Catholic church extend to
              local private Catholic educational institutions, particularly
              Canisius High School, Canisius University, and D&apos;Youville
              University.
            </p>
          </div>

          {/* Canisius High School */}
          <div className="border-l-4 border-[#DC2626] pl-6 mb-10">
            <h3 className="font-black text-lg md:text-xl mb-3">
              Canisius High School
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-black/70">
              <p>
                Carl Montante Sr., Carl Montante Jr., and Michael Montante are
                all graduates of Canisius High School, and Michael Montante and
                Carl Sr. are both prior members of the Canisius High School
                board of trustees, according to their{" "}
                <SourceLink
                  href="https://uniland.com/leadership/"
                  label="profiles"
                />{" "}
                on the Uniland website. According to Carl Montante Sr.&apos;s{" "}
                <SourceLink
                  href="https://uniland.com/carl-j-montante/"
                  label="biography"
                />
                , he was awarded Canisius High School&apos;s Distinguished
                Service Award, and Montante is named in the school&apos;s{" "}
                <SourceLink
                  href="https://www.canisiushigh.org/alumni/alumni-awards/hall-of-honor"
                  label="Distinguished Alumni Hall of Honor"
                />
                .
              </p>
              <p>
                The{" "}
                <SourceLink
                  href="https://hhlarchitects.com/portfolio/canisius-high-school/"
                  label="Montante Academic Hall"
                />{" "}
                at Canisius High School is named for the family, and that
                building, along with the Bernard J. Kennedy &apos;49 Field House
                and the Madden Center for Global Learning, was{" "}
                <SourceLink
                  href="https://www.buffalorising.com/2023/09/canisius-high-schools-madden-center-for-global-learning-underway/"
                  label="built"
                />{" "}
                by Uniland Development.
              </p>
            </div>
          </div>

          {/* Canisius University */}
          <div className="border-l-4 border-[#DC2626] pl-6 mb-10">
            <h3 className="font-black text-lg md:text-xl mb-3">
              Canisius University
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-black/70">
              <p>
                Canisius University, formerly Canisius College, is the alma
                mater of Carl Montante Sr., Michael Montante, and Laura Zaepfel
                as well as Wendy Montante, the{" "}
                <SourceLink
                  href="https://www.canisius.edu/news/board-regents-appoints-seven-new-members"
                  label="spouse"
                />{" "}
                of Carl Montante Jr. Several members of the Montante family have
                had roles on the university&apos;s governing bodies. Carl
                Montante Sr. is a former chair of the Canisius University board
                of trustees, according to his professional biography on the
                Uniland website, and Laura Zaepfel is{" "}
                <SourceLink
                  href="https://www.canisius.edu/about/our-leadership/board-trustees?gad_source=1&gad_campaignid=21724437792&gbraid=0AAAAADOmK-XEOrVFvMe8LeUR2RZ5ogv-W&gclid=CjwKCAjw-8vPBhBbEiwAoA39Wg_zRShvGUaBEBCFTpL_Rfzg8Mtl5yOdaDzkXCqnYe7ZLD5lfEO3BxoCM-YQAvD_BwE"
                  label="currently named"
                />{" "}
                as a trustee emerita. Uniland CEO Michael Montante is a former
                Canisius University trustee and is currently a member of the{" "}
                <SourceLink
                  href="https://www.canisius.edu/academics/our-schools/richard-j-wehle-school-business/career-preparation-wehle/business-advisory"
                  label="Business Advisory Council"
                />{" "}
                to the university&apos;s Richard J. Wehle School of Business.
                Wendy Montante served as a member of the university&apos;s{" "}
                <SourceLink
                  href="https://www.canisius.edu/news/board-regents-appoints-seven-new-members"
                  label="board of regents"
                />{" "}
                starting in 2014.
              </p>
              <p>
                The family are{" "}
                <SourceLink
                  href="https://archive.naplesnews.com/community/part-time-islanders-give-51-million-to-new-york-college-ep-406724099-333251251.html/"
                  label="longtime donors"
                />{" "}
                to the university, and Laura Zaepfel received Canisius&apos;s{" "}
                <SourceLink
                  href="https://www.canisius.edu/alumni/connect/awards-honors/lasalle-medal"
                  label="LaSalle Medal"
                />{" "}
                in 2009 according to her Uniland{" "}
                <SourceLink
                  href="https://uniland.com/laura-a-zaepfel/"
                  label="biography"
                />{" "}
                and Michael Montante was{" "}
                <SourceLink
                  href="https://uniland.com/michael-montante-honored-canisius-college/"
                  label="awarded"
                />{" "}
                the Dr. Richard J. Shick award for his contributions to the
                business school.
              </p>
              <p>
                As at Canisius High School, the family has a building named for
                them at Canisius University: the Montante Cultural Center, an
                event space and auditorium where Canisius hosts its Arts
                Canisius event series, including an annual performance by the
                Buffalo Philharmonic Orchestra, as well as speakers and
                lecturers and other performance artists. Also as at Canisius
                High School, Uniland has built buildings at Canisius University,
                including the university&apos;s{" "}
                <SourceLink
                  href="https://uniland.com/canisius-science-hall/"
                  label="Science Hall"
                />{" "}
                and the{" "}
                <SourceLink
                  href="https://uniland.com/canisius-science-hall/"
                  label="Village Townhouses"
                />{" "}
                student housing development.
              </p>
            </div>
          </div>

          {/* D'Youville */}
          <div className="border-l-4 border-[#DC2626] pl-6">
            <h3 className="font-black text-lg md:text-xl mb-3">
              D&apos;Youville University
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-black/70">
              <p>
                Across town, Uniland executive chairman Carl Montante Sr. is a
                member of the{" "}
                <SourceLink
                  href="https://www.dyu.edu/about/leadership/presidents-council-board-trustees"
                  label="board of trustees"
                />{" "}
                of D&apos;Youville University, a private Catholic university on
                Buffalo&apos;s west side, and was awarded an honorary degree by
                the university in 2016. D&apos;Youville named its newly{" "}
                <SourceLink
                  href="https://web.archive.org/web/20211116030221/https://buffalonews.com/news/local/10-million-renovation-at-dyouville-to-include-state-of-the-art-library-and-classroom-building/article_20e62d82-6ded-5daf-b6ff-b354fe186517.html"
                  label="renovated"
                />{" "}
                Beaux Arts library building for the{" "}
                <SourceLink
                  href="https://buffaloah.com/a/porter/320/lib/lib.html"
                  label="Montante family"
                />{" "}
                in 1999.
              </p>
              <p>
                Currently, Uniland is developing a{" "}
                <SourceLink
                  href="https://uniland.com/dyouville-student-housing/"
                  label="student housing"
                />{" "}
                project for D&apos;Youville, and the university selected a Main
                Street property owned by Uniland to build its planned{" "}
                <SourceLink
                  href="https://www.dyu.edu/news/2025/06/16/dyouville-university-announces-planned-site-new-college-medicine"
                  label="medical school"
                />
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CULTURAL & CLUBS ========== */}
      <section className="bg-black text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Cultural Organizations &amp; Elite Social Clubs
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/80 mb-10">
            <p>
              According to his professional biography, Carl Montante Sr. is a
              past chairman of the Buffalo Philharmonic Orchestra, the symphony
              orchestra whose home auditorium is Kleinhans Music Hall on
              Buffalo&apos;s west side and which performs annually at the
              Montante Cultural Center at Canisius University. Carl Montante Sr.
              and his wife Carol Ann Montante have given at least two
              significant{" "}
              <SourceLink
                href="https://bpo.org/endowment/#1677614582156-00ea7e15-8dcc"
                label="donations"
              />{" "}
              to the BPO, totaling as much as $1.5 million. According to its{" "}
              <SourceLink
                href="https://uniland.com/community/"
                label="website"
              />
              , Uniland is the lead corporate sponsor of BPO&apos;s Diversity
              Council.
            </p>
            <p>
              Michael Montante is a former member of the board of directors of
              Frank Lloyd Wright&apos;s Martin House Corporation, the nonprofit
              organization that maintains and operates the Darwin D. Martin
              House, a former private residence and now-museum designed by the
              famed architect Frank Lloyd Wright in the Parkside neighborhood.
              Carl and Carol Montante have also made a testamentary gift to the
              Martin House through their fund at the Community Foundation for
              Greater Buffalo, according to a Martin House{" "}
              <SourceLink
                href="https://martinhouse.org/wp-content/uploads/2024/07/Martin-House-2023-Annual-Report.pdf"
                label="annual report"
              />
              .
            </p>
          </div>

          <div className="bg-white/10 p-6 md:p-8 mb-10">
            <h3 className="font-black text-lg md:text-xl text-[#DC2626] mb-3">
              The Buffalo Club
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-white/80">
              <p>
                Carl Montante Sr., Michael Montante, and Laura Zaepfel have all
                served on the board of directors of the Buffalo Club, an elite
                social club established in 1867 and{" "}
                <SourceLink
                  href="https://www.ourcityactionbuffalo.com/who-rules-buffalo"
                  label="whose membership list"
                />{" "}
                is a who&apos;s who of Western New York&apos;s richest and most
                powerful to this day.
              </p>
              <p>
                The Buffalo Club is so exclusive that it did not admit women or
                Black people as members until compelled to by a local law in
                1989. Laura Zaepfel was President of the Buffalo Club board{" "}
                <SourceLink
                  href="https://projects.propublica.org/nonprofits/organizations/160365760"
                  label="through 2023"
                />{" "}
                and Michael Montante was First Vice President of the Buffalo
                Club board as of 2024.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/80">
            <p>
              Both Carl Montante Sr. and his wife Carol have been board members
              at the{" "}
              <SourceLink
                href="https://projects.propublica.org/nonprofits/organizations/160368360"
                label="Buffalo Tennis & Squash Club"
              />
              , a private racket sports club in Buffalo&apos;s Elmwood Village
              neighborhood.
            </p>
          </div>
        </div>
      </section>

      {/* ========== BUSINESS GROUPS ========== */}
      <section className="bg-white text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Business Groups
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-10">
            <p>
              As one of the biggest real estate development firms in the region,
              Uniland and the Montante family are deeply intertwined with local
              business advocacy and lobbying groups.
            </p>
            <p>
              Uniland is a &ldquo;Director&apos;s Circle&rdquo; member of the{" "}
              <SourceLink
                href="https://www.thepartnership.org/major-investors/"
                label="Buffalo Niagara Partnership"
              />
              , the Western New York region&apos;s chamber of commerce and
              primary lobbying organization for the corporate community. The
              Buffalo Niagara Partnership represents the biggest business
              interests in the region and plays a key role in shaping the debate
              about the regional economy and dictating local policy priorities.
            </p>
            <p>
              Carl Montante Sr. is a former member of the Buffalo Niagara
              Partnership board of directors, according to his professional
              biography, and Michael Montante is a{" "}
              <SourceLink
                href="https://members.thepartnership.org/board-of-directors"
                label="current member"
              />{" "}
              of the board. Laura Zaepfel was named as a member of the
              partnership&apos;s government affairs committee in 2008, but the
              document naming her has since been removed from the partnership
              website and Carl Montante Jr. is a member of the Buffalo Niagara
              Partnership Development and Construction Industry Leader Forum,
              according to his{" "}
              <SourceLink
                href="https://uniland.com/carl-j-montante-jr/"
                label="professional biography"
              />
              .
            </p>
            <p>
              Carl Montante Sr. is a former board member, according to his{" "}
              <SourceLink
                href="https://uniland.com/carl-j-montante/"
                label="biography"
              />
              , and Carl Montante Jr. is a current board member of{" "}
              <SourceLink
                href="https://buffaloniagara.org/about-us/"
                label="Invest Buffalo Niagara"
              />
              , a business advocacy and economic development group.
            </p>
            <p>
              Carl Montante Jr. is currently a member of the{" "}
              <SourceLink
                href="https://amherst.org/board-2026/"
                label="board of directors"
              />{" "}
              of the Amherst Chamber of Commerce, and Laura Zaepfel has been a
              member of that group&apos;s board in the past.
            </p>
          </div>

          <div className="bg-black text-white p-6 md:p-8 mb-10">
            <h3 className="font-black text-lg md:text-xl text-[#DC2626] mb-3">
              NAIOP — Commercial Real Estate Lobby
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-white/80">
              <p>
                Several family members also have roles at the National
                Association of Industrial and Office Parks, a lobbying
                organization for commercial real estate developers. Michael
                Montante is currently a member of NAIOP&apos;s Diversified
                Property Development National Forum, according to his{" "}
                <SourceLink
                  href="https://www.naiop.org/about-us/bio-detail-page/?bio=e6cfc74e-7dd5-4633-813c-c9fe8db52acc"
                  label="biography"
                />{" "}
                on the NAIOP website, as well as a former member of NAIOP&apos;s
                corporate board.
              </p>
              <p>
                According to his{" "}
                <SourceLink
                  href="https://uniland.com/michael-j-montante/"
                  label="biography"
                />{" "}
                on the Uniland website, Michael Montante is also the former
                president of NAIOP&apos;s Upstate New York Chapter and a current
                member and past chair of NAIOP&apos;s Office Development II
                Forum. Carl Montante Jr. is a member of NAIOP&apos;s Urban
                Redevelopment Forum and Laura Zaepfel is also a NAIOP member
                according to their biographies on the{" "}
                <SourceLink
                  href="https://uniland.com/leadership/"
                  label="Uniland website"
                />
                . Uniland employee David Tytka is currently a{" "}
                <SourceLink
                  href="https://naiopupstateny.com/board"
                  label="board member"
                />{" "}
                of NAIOP&apos;s Upstate New York Chapter.
              </p>
            </div>
          </div>

          <div className="bg-black text-white p-6 md:p-8">
            <h3 className="font-black text-lg md:text-xl text-[#FFD600] mb-3">
              Public-Private Land Entities
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-white/80">
              <p>
                The family is also represented on the boards of public-private
                entities that deal with publicly owned land in the City of
                Buffalo. Michael Montante is a member of the boards of directors
                of{" "}
                <SourceLink
                  href="https://projects.propublica.org/nonprofits/organizations/20738159/202542829349301864/full"
                  label="Buffalo Civic Auto Ramps"
                />
                , a non-profit corporation controlled by Buffalo real estate
                interests that manages city-owned parking garages downtown, and{" "}
                <SourceLink
                  href="https://projects.propublica.org/nonprofits/organizations/262407464/202521289349202557/full"
                  label="Buffalo Lakeside Commerce Park Property Owners Association"
                />
                , a non-profit that shares an address and phone number with the
                Buffalo Urban Renewal Agency and whose name suggests it manages
                land in{" "}
                <SourceLink
                  href="https://www.buffalourbandevelopment.com/budc-projects-blcp"
                  label="Lakeside Commerce Park"
                />
                , an industrial park in South Buffalo owned by the Buffalo Urban
                Development Corporation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHARITIES ========== */}
      <section className="bg-[#FFD600] text-black px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl leading-tight mb-6">
            Charities
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/70 mb-10">
            <p>
              Members of the Montante family have sat on the boards of myriad
              philanthropic and charitable organizations in the Buffalo area.
            </p>
          </div>
          <div className="grid gap-4 mb-10">
            <InstitutionCard
              person="Michael Montante"
              role="Board member"
              org="Roswell Park Alliance Foundation"
              href="https://www.roswellpark.org/about-us/board-directors/alliance-foundation"
            />
            <InstitutionCard
              person="Michael Montante"
              role="Former board president (2016–2017)"
              org="Buffalo Renaissance Foundation"
              href="https://buffalorenaissance.org/board-of-directors/"
            />
            <InstitutionCard
              person="Laura Zaepfel"
              role="Board member"
              org="Thurman Thomas Family Foundation"
              href="https://www.thurmanthomasfamilyfoundation.org/#board"
            />
            <InstitutionCard
              person="Laura Zaepfel"
              role="Board member"
              org="African American Veterans Monument"
              href="https://projects.propublica.org/nonprofits/organizations/852599672"
            />
            <InstitutionCard
              person="Laura Zaepfel"
              role="Board member"
              org="Law Enforcement Foundation of Western New York"
              href="https://projects.propublica.org/nonprofits/organizations/161494420/202533099349100508/full"
            />
            <InstitutionCard
              person="Carl & Carol Montante"
              role="Fund holders"
              org="Community Foundation for Greater Buffalo"
              href="https://www.cfgb.org/wp-content/uploads/2019/11/Showpiece-Book-FINAL.pdf"
            />
          </div>
        </div>
      </section>

      {/* ========== LETTER CTA ========== */}
      <section className="bg-[#DC2626] text-white px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-4xl leading-[0.95] mb-4">
            They are embedded in every power center in the region.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto">
            The Montante family profits from ICE while sitting on the boards of
            institutions that claim to stand for justice. The ICE lease at 250
            Delaware expires March 31, 2027. The decision to renew is
            Uniland&apos;s alone.
          </p>
          <Link
            href="/letters/uniland"
            className="bg-white text-black font-black text-base uppercase tracking-wider px-10 py-5 border-2 border-white hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer inline-block"
          >
            Sign the letter &rarr;
          </Link>
        </div>
      </section>

      {/* ========== BOTTOM NAV ========== */}
      <div className="bg-white border-t border-black/10 px-6 md:px-10 py-4">
        <div className="max-w-3xl mx-auto flex justify-between text-sm">
          <Link
            href="/facts/what-happens-inside"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            &larr; Previous: What Happens Inside
          </Link>
          <Link
            href="/facts/who-pays"
            className="text-black/40 hover:text-[#DC2626] transition-colors"
          >
            Next: Who Pays &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
};
