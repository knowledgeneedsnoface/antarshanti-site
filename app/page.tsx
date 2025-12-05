// app/page.tsx
"use client";

import Image from "next/image";

const sections = {
  howItWorks: "#how-it-works",
  whatsInside: "#whats-inside",
  story: "#story",
  faq: "#faq",
  buy: "#buy",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-stone-100">
              {/* simple diya icon */}
              <span className="text-xs">🪔</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight">AntarShanti</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500">
                Daily Rituals for Inner Peace
              </span>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="/" className="hover:text-stone-600">
              Home
            </a>
            <a href={sections.howItWorks} className="hover:text-stone-600">
              How it works
            </a>
            <a href={sections.whatsInside} className="hover:text-stone-600">
              What&apos;s inside
            </a>
            <a href={sections.story} className="hover:text-stone-600">
              Our story
            </a>
            <a href={sections.faq} className="hover:text-stone-600">
              FAQ
            </a>
          </nav>

          <a
            href={sections.buy}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 shadow-sm hover:bg-stone-800"
          >
            Buy Now
          </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="border-b border-stone-200 bg-gradient-to-b from-stone-50 to-stone-100/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row md:items-center md:pt-16">
            {/* Text */}
            <div className="flex-1 space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Puja as Meditation • Eco-Friendly • Made in India
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl lg:text-[2.75rem]">
                10 minutes of puja.{" "}
                <span className="underline decoration-stone-300 underline-offset-4">
                  A whole day of inner peace.
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-stone-700 md:text-base">
                AntarShanti is a 30-day guided{" "}
                <strong className="font-semibold">puja-as-meditation</strong>{" "}
                kit. Each morning, you open one packet, follow a simple ritual,
                and give your mind a calm, screen-free reset using familiar
                Indian traditions.
              </p>

              <ul className="grid max-w-xl grid-cols-1 gap-2 text-sm text-stone-700 md:grid-cols-2">
                <li>• 30 days • 30 devtas • 30 mini-rituals</li>
                <li>• Structured as self-therapy for the mind</li>
                <li>• Eco-friendly, plastic-free, bamboo stand included</li>
                <li>• Designed & made in India</li>
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href={sections.buy}
                  className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50 shadow-sm hover:bg-stone-800"
                >
                  Start your 30-day journey
                </a>
                <a
                  href={sections.whatsInside}
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  See what&apos;s inside
                </a>
              </div>

              <p className="text-xs text-stone-500">
                Ships pan-India • Limited first batch • Ideal for self-use or
                gifting
              </p>
            </div>

            {/* Visual */}
            <div className="flex-1">
              <div className="relative mx-auto max-w-md rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm md:p-6">
                <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-100 to-stone-200 md:h-72">
                  {/* Placeholder – replace with real image later */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-stone-700">
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Product Preview
                    </span>
                    <p className="max-w-xs text-sm">
                      Replace this box with a product flatlay of the AntarShanti
                      kit: outer box, bamboo stand, daily packets & cards.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-stone-600 md:grid-cols-3">
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <p className="font-medium text-stone-800">
                      Puja as meditation
                    </p>
                    <p>Guided 10-minute rituals for inner peace.</p>
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <p className="font-medium text-stone-800">Self-therapy</p>
                    <p>Mantras, affirmations & reflection built-in.</p>
                  </div>
                  <div className="rounded-2xl bg-stone-100 p-3">
                    <p className="font-medium text-stone-800">Eco-friendly</p>
                    <p>Recycled kraft, bamboo stand, zero plastic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="border-b border-stone-200 bg-stone-50"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              How AntarShanti works in just 10 minutes
            </h2>
            <p className="mt-2 text-center text-sm text-stone-600 md:text-base">
              A simple, guided flow you can follow every morning — no prior
              puja knowledge required.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-4">
              <Step
                number="01"
                title="Pick today’s packet"
                text="Open the packet for Day 1, Day 2… all the way to Day 30 from your AntarShanti box."
              />
              <Step
                number="02"
                title="Set up your corner"
                text="Light the incense, place the day’s deity card on the bamboo stand, and keep the guide card in front of you."
              />
              <Step
                number="03"
                title="Follow the ritual"
                text="Chant the mantra, follow the 5 simple steps, sit in silence for a minute, and repeat the affirmation."
              />
              <Step
                number="04"
                title="Carry the calm"
                text="Let this short ritual reset your mental state and guide how you show up for the rest of the day."
              />
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section
          id="whats-inside"
          className="border-b border-stone-200 bg-stone-100/60"
        >
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              What&apos;s inside the AntarShanti box
            </h2>
            <p className="mt-2 text-center text-sm text-stone-600 md:text-base">
              Everything you need for a month of calm — in one eco-conscious
              kit.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm text-stone-700">
                <InsideItem
                  title="30 daily ritual packets"
                  text="Each day is dedicated to one devta, with a curated mini-puja set for a short, focused practice."
                />
                <InsideItem
                  title="30 mantra & mindfulness cards"
                  text="Every card includes a mantra, a 5-step guided ritual, a moment of silence, and a daily affirmation."
                />
                <InsideItem
                  title="1 bamboo deity stand"
                  text="A reusable, minimal stand to hold the day’s card — a gentle reminder to pause and breathe."
                />
                <InsideItem
                  title="Eco-friendly puja essentials"
                  text="Charcoal-free incense, cotton wicks, haldi-kumkum in paper sachets, and more — all chosen with care."
                />
                <InsideItem
                  title="Quick start guide"
                  text="A simple overview that shows you how to begin your 30-day AntarShanti journey."
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                  {/* Placeholder again – replace with styled product detail shot */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-stone-700">
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Inside the box
                    </span>
                    <p className="max-w-xs text-sm">
                      Show an overhead shot of the open AntarShanti box with
                      packets, bamboo stand and cards neatly arranged.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELF-THERAPY / MINDFULNESS */}
        <section className="border-b border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              Designed as self-therapy, rooted in tradition
            </h2>
            <p className="mt-2 text-center text-sm text-stone-600 md:text-base">
              AntarShanti uses simple puja steps as a structure for
              mind-calming, science-backed practices.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <TherapyCard
                title="Breath & mantra"
                text="Slow breathing and mantra repetition help your nervous system relax and your thoughts settle."
              />
              <TherapyCard
                title="Affirmations"
                text="Each day’s affirmation gently shifts your inner narrative towards hope, courage and calm."
              />
              <TherapyCard
                title="Sensory grounding"
                text="The light of the diya, the scent of incense and the feel of the card bring your awareness back to the present moment."
              />
            </div>

            <p className="mt-6 text-center text-sm text-stone-700">
              Think of AntarShanti as a 10-minute mental reset you can practice
              at home — offline, affordable, and deeply familiar.
            </p>
          </div>
        </section>

        {/* ECO SECTION */}
        <section className="border-b border-stone-200 bg-stone-100/70">
          <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              Good for your soul. Gentle on the planet.
            </h2>
            <p className="mt-2 text-center text-sm text-stone-600 md:text-base">
              AntarShanti is built as a conscious spiritual product, not just a
              disposable kit.
            </p>

            <div className="mt-8 grid gap-6 text-sm text-stone-700 md:grid-cols-2">
              <ul className="space-y-2">
                <li>• 100% recycled kraft paper outer box and packets</li>
                <li>• No plastic lamination, water-based inks only</li>
                <li>• Charcoal-free incense sticks</li>
              </ul>
              <ul className="space-y-2">
                <li>• Reusable bamboo deity stand</li>
                <li>• Compostable / reusable materials wherever possible</li>
                <li>• Designed to be repurposed, not thrown away</li>
              </ul>
            </div>

            <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-stone-500">
              True peace includes peace with nature.
            </p>
          </div>
        </section>

        {/* FOUNDER STORY */}
        <section id="story" className="border-b border-stone-200 bg-stone-50">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              Why AntarShanti exists
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="space-y-4 text-sm leading-relaxed text-stone-700 md:text-base">
                <p>
                  Our lives are getting faster, louder and more digital. We
                  scroll endlessly, juggle work and family, and often fall
                  asleep with our minds still buzzing.
                </p>
                <p>
                  At the same time, many of us have grown up seeing something
                  very simple: a 5–10 minute puja at home that quietly calms
                  everyone in the room.
                </p>
                <p>
                  AntarShanti was born from a single question:{" "}
                  <span className="font-medium">
                    what if we treat that small puja time as a daily meditation
                    ritual for inner peace?
                  </span>
                </p>
                <p>
                  This kit is designed to make that experience{" "}
                  <span className="font-medium">
                    guided, accessible and beautifully personal
                  </span>
                  — for anyone who wants to reconnect with themselves without
                  another app or screen.
                </p>
                <p className="text-stone-500">
                  AntarShanti is a bridge between ancient comfort and modern
                  mental wellbeing.
                </p>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-stone-100/70 p-4 text-sm text-stone-700">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Founder&apos;s note
                </p>
                <p className="mt-3">
                  &quot;I spent years building digital products and saw how easy
                  it is to lose ourselves in the noise. For me, a short daily
                  puja felt like meditation — familiar, grounding, and deeply
                  Indian.
                </p>
                <p className="mt-3">
                  AntarShanti is my attempt to offer that experience to others:
                  a calm, structured way to return to yourself each day.&quot;
                </p>
                <p className="mt-4 text-sm font-medium text-stone-800">
                  – Founder, AntarShanti
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BUY SECTION */}
        <section
          id="buy"
          className="border-b border-stone-200 bg-stone-900 text-stone-50"
        >
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                  AntarShanti – 30 Days • 30 Devtas Kit
                </h2>
                <p className="mt-3 text-sm text-stone-200 md:text-base">
                  A 30-day guided puja-as-meditation experience for inner peace,
                  designed as self-therapy using simple Indian rituals.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-stone-100/90">
                  <li>• 30 daily ritual packets with curated puja essentials</li>
                  <li>• 30 mantra + affirmation cards</li>
                  <li>• Reusable bamboo deity stand</li>
                  <li>• Eco-friendly, plastic-free packaging</li>
                  <li>• Perfect for personal practice or gifting</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-stone-700 bg-stone-800/60 p-5 text-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-300">
                  Pre-launch pricing
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">₹1,299</span>
                  <span className="text-xs line-through text-stone-400">
                    ₹1,699
                  </span>
                </div>
                <p className="mt-2 text-xs text-stone-300">
                  Inclusive of taxes. Shipping calculated at checkout.
                </p>

                <a
                  href="#"
                  className="mt-4 block rounded-full bg-stone-50 px-4 py-3 text-center text-sm font-medium text-stone-900 hover:bg-stone-100"
                >
                  Buy AntarShanti Kit
                </a>

                <p className="mt-3 text-[11px] text-stone-300">
                  You can integrate this button with your checkout provider
                  (Shopify, Razorpay, etc.). For now, it&apos;s just a
                  placeholder.
                </p>

                <p className="mt-4 text-xs text-stone-300">
                  • Ships pan-India within 3–5 working days  
                  • Limited first production batch  
                  • Ideal as a gift for loved ones who need a little more
                  calm
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-stone-50">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <h2 className="text-center text-xl font-semibold tracking-tight text-stone-900 md:text-2xl">
              Frequently asked questions
            </h2>

            <div className="mt-8 space-y-5 text-sm text-stone-800">
              <FAQ
                q="Is AntarShanti only for very religious people?"
                a="No. AntarShanti is designed for anyone seeking daily calm, regardless of how 'religious' they consider themselves. It uses simple puja steps as a familiar structure for meditation and self-therapy."
              />
              <FAQ
                q="How much time does each ritual take?"
                a="Around 10 minutes per day. You can always sit a little longer in silence if you want."
              />
              <FAQ
                q="Do I need prior knowledge of mantras or proper puja process?"
                a="Not at all. Each card guides you step-by-step in simple language. You can just follow along."
              />
              <FAQ
                q="Can I repeat the kit after 30 days?"
                a="Yes. You can reuse the bamboo stand and cards. In future, we plan to launch refill packs so you can continue your practice without buying a full box again."
              />
              <FAQ
                q="Is everything really eco-friendly?"
                a="We use recycled kraft paper, water-based inks, a bamboo stand, and avoid plastic wherever possible. Some packaging elements may still evolve as we keep improving our sustainability."
              />
              <FAQ
                q="Is this a replacement for therapy or medical help?"
                a="No. AntarShanti is a daily self-care and spiritual practice, not a medical or psychological treatment. If you’re struggling with your mental health, please reach out to a qualified professional."
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} AntarShanti™. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-stone-700">
              Instagram
            </a>
            <a href="#" className="hover:text-stone-700">
              Contact
            </a>
            <a href="#" className="hover:text-stone-700">
              Terms
            </a>
            <a href="#" className="hover:text-stone-700">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type SimpleProps = { title: string; text: string };
type StepProps = SimpleProps & { number: string };
type FAQProps = { q: string; a: string };

function Step({ number, title, text }: StepProps) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
        {number}
      </div>
      <div className="mt-2 text-sm font-semibold text-stone-900">{title}</div>
      <p className="mt-2 text-xs leading-relaxed text-stone-700 md:text-sm">
        {text}
      </p>
    </div>
  );
}

function InsideItem({ title, text }: SimpleProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-stone-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-stone-700 md:text-sm">
        {text}
      </p>
    </div>
  );
}

function TherapyCard({ title, text }: SimpleProps) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4 text-sm shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <p className="text-sm font-semibold text-stone-900">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-stone-700 md:text-sm">
        {text}
      </p>
    </div>
  );
}

function FAQ({ q, a }: FAQProps) {
  return (
    <details className="group rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-sm font-medium text-stone-900">{q}</span>
        <span className="text-xl leading-none text-stone-400 group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-xs leading-relaxed text-stone-700 md:text-sm">
        {a}
      </p>
    </details>
  );
}
