import Link from "next/link";

const modules = [
  {
    title: "Hiragana",
    reading: "ひらがな",
    lastStudied: "1 day ago",
    progress: 38,
    total: 105,
    learnPath: "/learn/japanese/hiragana",
    quizPath: "/quiz/japanese/hiragana",
    color: "from-rose-500 to-rose-400",
  },
  {
    title: "Katakana",
    reading: "カタカナ",
    lastStudied: "3 days ago",
    progress: 12,
    total: 105,
    learnPath: "/learn/japanese/katakana",
    quizPath: "/quiz/japanese/katakana",
    color: "from-slate-700 to-slate-800",
  },
  {
    title: "Kuzushiji",
    reading: "くずし字",
    lastStudied: "New",
    progress: 0,
    total: 90,
    learnPath: "/learn/japanese/kuzushiji",
    quizPath: "/quiz/japanese/kuzushiji",
    color: "from-amber-500 to-amber-400",
  },
];

export default function JapaneseLanguagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-12">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-rose-500 transition hover:text-rose-600"
          >
            ← Back to home
          </Link>
          <div className="text-right text-sm text-slate-400">
            <div className="text-xs uppercase tracking-[0.3em]">Language</div>
            <div className="text-base font-semibold text-slate-700">
              Japanese
            </div>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {modules.map((module) => {
            const completion = Math.round(
              (module.progress / module.total) * 100
            );
            return (
              <div
                key={module.title}
                className="rounded-[32px] border border-rose-100 bg-white/90 p-6 shadow-[0_25px_70px_-45px_rgba(244,114,182,0.8)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">
                      {module.title}{" "}
                      <span className="text-base text-slate-500">
                        [{module.reading}]
                      </span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
                      {module.lastStudied}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={module.learnPath}
                      className="rounded-2xl bg-rose-200/80 px-5 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                    >
                      Learn
                    </Link>
                    <Link
                      href={module.quizPath}
                      className="rounded-2xl bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-200/60"
                    >
                      Practice
                    </Link>
                    <Link
                      href={module.quizPath}
                      className="rounded-2xl bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-200/60"
                    >
                      Challenge
                    </Link>
                  </div>
                </div>
                <div className="mt-5 rounded-full bg-slate-100 p-1.5">
                  <div className="h-3 rounded-full bg-white">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-400">
                  <span>{module.progress}</span>
                  <span>{module.total}</span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

