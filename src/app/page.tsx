import Link from "next/link";

export default function Home() {
  const floatingCharacters = [
    { glyph: "あ", top: "12%", left: "18%", color: "text-rose-300" },
    { glyph: "サ", top: "26%", left: "68%", color: "text-indigo-300" },
    { glyph: "も", top: "68%", left: "22%", color: "text-slate-300" },
    { glyph: "ん", top: "42%", left: "82%", color: "text-rose-200" },
    { glyph: "テ", top: "78%", left: "58%", color: "text-sky-300" },
    { glyph: "ね", top: "18%", left: "84%", color: "text-slate-200" },
    { glyph: "き", top: "60%", left: "8%", color: "text-rose-200" },
    { glyph: "ち", top: "36%", left: "6%", color: "text-indigo-200" },
    { glyph: "つ", top: "82%", left: "78%", color: "text-slate-200" },
  ];

  const languageTracks = [
    {
      title: "English",
      slug: "english",
      learnProgress: 45,
      quizProgress: 30,
    },
    {
      title: "Japanese",
      slug: "japanese",
      learnProgress: 60,
      quizProgress: 40,
    },
    {
      title: "ZhuYin",
      slug: "zhuyin",
      learnProgress: 25,
      quizProgress: 10,
    },
    {
      title: "Cyrillic",
      slug: "cyrillic",
      learnProgress: 15,
      quizProgress: 5,
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,246,255,0.8),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(255,228,230,0.7),transparent_55%)]" />

      {floatingCharacters.map((item, index) => (
        <span
          key={`${item.glyph}-${index}`}
          className={`floating-kana absolute text-5xl font-semibold opacity-60 ${item.color}`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${index * 2}s`,
            animationDuration: `${14 + (index % 4) * 2}s`,
          }}
        >
          {item.glyph}
        </span>
      ))}

      <header className="relative z-10 border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 font-semibold text-white shadow-sm">
              か
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-900">
                kanamastery
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Learn Scripts
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="#play" className="transition-colors hover:text-slate-900">
              Play
            </Link>
            <Link href="#learn" className="transition-colors hover:text-slate-900">
              Learn
            </Link>
            <Link href="#how" className="transition-colors hover:text-slate-900">
              How It Works
            </Link>
            <Link href="#about" className="transition-colors hover:text-slate-900">
              About
            </Link>
            <Link href="#blog" className="transition-colors hover:text-slate-900">
              Blog
            </Link>
            <Link
              href="#leaderboard"
              className="transition-colors hover:text-slate-900"
            >
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              className="hidden rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 md:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25M18.364 5.636l-1.59 1.59M21 12h-2.25M18.364 18.364l-1.59-1.59M12 18.75V21M7.227 16.773l-1.59 1.59M5.25 12H3M7.227 7.227l-1.59-1.59M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
                />
              </svg>
            </button>
            <Link
              href="/sign-in"
              className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-900 md:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-grow flex-col px-6 pt-16 pb-24">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center md:items-start md:text-left">
          <span className="rounded-full border border-rose-100 bg-white px-4 py-1 text-sm font-semibold text-rose-500 shadow-sm">
            Master Japanese Kana & More
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Hiragana & Katakana Quiz Games
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Master Japanese Kana with interactive quiz games! From beginner to
            advanced difficulty levels and word recognition games, learning
            Hiragana and Katakana has never been easier.
          </p>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-stretch">
            <Link
              href="/learn"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 md:w-auto"
            >
              Start Learning
              <span className="text-xl" aria-hidden>
                🎓
              </span>
            </Link>
            <Link
              href="/play"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-600 md:w-auto"
            >
              Play Quiz Games
              <span className="text-xl" aria-hidden>
                🎮
              </span>
            </Link>
          </div>
          <Link
            href="#how"
            className="text-base font-semibold text-slate-500 transition hover:text-slate-800"
          >
            How it works
          </Link>
        </section>

        <section
          id="learn"
          className="mt-28 flex w-full flex-col gap-8 text-center md:mt-32"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
              Choose Your Script
            </span>
            <h2 className="text-3xl font-semibold text-slate-900">
              Continue your learning pathway
            </h2>
            <p className="max-w-2xl text-base text-slate-500">
              Track your learning and quiz progress for each script. Jump back in
              where you left off or explore a new alphabet.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[1100px]">
            <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden h-44 w-14 -translate-y-1/2 rounded-full bg-gradient-to-r from-white to-transparent sm:block" />
            <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden h-44 w-14 -translate-y-1/2 rounded-full bg-gradient-to-l from-white to-transparent sm:block" />
            <div className="rounded-[32px] border border-rose-200/60 bg-white/80 p-4 shadow-[0_25px_90px_-60px_rgba(244,114,182,0.8)] backdrop-blur">
              <div className="language-window mx-auto max-w-[940px] overflow-hidden">
                <div
                  className="language-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto px-14 pb-5 pt-3"
                  aria-label="Available language tracks"
                >
                  {languageTracks.map((track) => (
                    <Link
                      key={track.slug}
                      href={`/languages/${track.slug}`}
                      className="group relative flex w-72 flex-none snap-center flex-col rounded-3xl border border-rose-100 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(244,114,182,0.8)] transition hover:-translate-y-1 hover:border-rose-200"
                    >
                      <div className="mx-auto -mt-10 w-fit rounded-md bg-rose-300 px-10 py-2 text-xl font-semibold text-rose-900 shadow">
                        {track.title}
                      </div>
                      <div className="mt-8 flex flex-col gap-6 border border-slate-200 px-4 py-6 text-left text-sm text-slate-600">
                        <div className="flex flex-col gap-2">
                          <span className="text-center text-base font-medium text-slate-800">
                            Learn
                          </span>
                          <div className="h-0.5 w-full bg-slate-300" />
                          <div className="text-center text-xs uppercase tracking-[0.3em] text-slate-400">
                            Quiz
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="text-xs font-semibold text-slate-500">
                            Learn Progress
                          </div>
                          <div className="h-2 rounded-full bg-rose-100">
                            <div
                              className="h-full rounded-full bg-rose-400 transition-all"
                              style={{ width: `${track.learnProgress}%` }}
                            />
                          </div>
                          <div className="text-xs font-semibold text-slate-500">
                            Quiz Progress
                          </div>
                          <div className="h-2 rounded-full bg-rose-100">
                            <div
                              className="h-full rounded-full bg-rose-500 transition-all"
                              style={{ width: `${track.quizProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
