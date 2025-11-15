"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Word = { kana: string; romaji: string };

type QuizQuestion = {
  id: string;
  type: "kana-to-romaji" | "romaji-to-kana";
  prompt: string;
  choices: Word[];
  correctIndex: number;
};

const baseRowVocabulary: Record<string, Word[]> = {
  a: [
    { kana: "あさ", romaji: "asa" },
    { kana: "あめ", romaji: "ame" },
    { kana: "あき", romaji: "aki" },
    { kana: "あお", romaji: "ao" },
    { kana: "あい", romaji: "ai" },
  ],
  ka: [
    { kana: "からて", romaji: "karate" },
    { kana: "かぜ", romaji: "kaze" },
    { kana: "かさ", romaji: "kasa" },
    { kana: "かみ", romaji: "kami" },
    { kana: "かわ", romaji: "kawa" },
  ],
  sa: [
    { kana: "さかな", romaji: "sakana" },
    { kana: "さくら", romaji: "sakura" },
    { kana: "さけ", romaji: "sake" },
    { kana: "さとう", romaji: "sato" },
    { kana: "ささ", romaji: "sasa" },
  ],
  ta: [
    { kana: "たいよう", romaji: "taiyou" },
    { kana: "たまご", romaji: "tamago" },
    { kana: "たこ", romaji: "tako" },
    { kana: "たに", romaji: "tani" },
    { kana: "たけ", romaji: "take" },
  ],
  na: [
    { kana: "なつ", romaji: "natsu" },
    { kana: "なみ", romaji: "nami" },
    { kana: "なべ", romaji: "nabe" },
    { kana: "なわ", romaji: "nawa" },
    { kana: "なお", romaji: "nao" },
  ],
  ha: [
    { kana: "はな", romaji: "hana" },
    { kana: "はこ", romaji: "hako" },
    { kana: "はし", romaji: "hashi" },
    { kana: "はる", romaji: "haru" },
    { kana: "はやし", romaji: "hayashi" },
  ],
  ma: [
    { kana: "まつり", romaji: "matsuri" },
    { kana: "まくら", romaji: "makura" },
    { kana: "まめ", romaji: "mame" },
    { kana: "まち", romaji: "machi" },
    { kana: "まど", romaji: "mado" },
  ],
  ya: [
    { kana: "やま", romaji: "yama" },
    { kana: "やさい", romaji: "yasai" },
    { kana: "やすみ", romaji: "yasumi" },
    { kana: "やく", romaji: "yaku" },
    { kana: "やど", romaji: "yado" },
  ],
  ra: [
    { kana: "らいねん", romaji: "rainen" },
    { kana: "らっぱ", romaji: "rappa" },
    { kana: "らく", romaji: "raku" },
    { kana: "らくだ", romaji: "rakuda" },
    { kana: "らん", romaji: "ran" },
  ],
  wa: [
    { kana: "わし", romaji: "washi" },
    { kana: "わらい", romaji: "warai" },
    { kana: "わさび", romaji: "wasabi" },
    { kana: "わに", romaji: "wani" },
    { kana: "わた", romaji: "wata" },
  ],
  n: [
    { kana: "ほん", romaji: "hon" },
    { kana: "おんがく", romaji: "ongaku" },
    { kana: "さんぽ", romaji: "sanpo" },
    { kana: "きんこ", romaji: "kinko" },
    { kana: "ぺん", romaji: "pen" },
  ],
};

const rowVocabulary: Record<string, Word[]> = {
  ...baseRowVocabulary,
  "wa-n": [...(baseRowVocabulary.wa ?? []), ...(baseRowVocabulary.n ?? [])],
};

const allWords = Object.values(rowVocabulary).flat();

function shuffleArray<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestions(
  pool: Word[],
  questionType: "kana-to-romaji" | "romaji-to-kana" | "hybrid",
  length: number,
  choiceCount: number
): QuizQuestion[] {
  if (!pool.length) return [];
  const questions: QuizQuestion[] = [];
  const safeLength = Math.max(1, length);
  const safeChoiceCount = Math.max(2, choiceCount);

  for (let i = 0; i < safeLength; i += 1) {
    const actualType =
      questionType === "hybrid"
        ? Math.random() > 0.5
          ? "kana-to-romaji"
          : "romaji-to-kana"
        : questionType;
    const correctWord = pool[Math.floor(Math.random() * pool.length)];
    const distractors = shuffleArray(pool.filter((word) => word !== correctWord)).slice(
      0,
      Math.max(safeChoiceCount - 1, 0)
    );
    const filledChoices =
      distractors.length + 1 < safeChoiceCount
        ? [
            correctWord,
            ...distractors,
            ...shuffleArray(pool).slice(0, safeChoiceCount - (distractors.length + 1)),
          ]
        : [correctWord, ...distractors];
    const choices = shuffleArray(filledChoices).slice(0, safeChoiceCount);
    const correctIndex = choices.findIndex(
      (word) => word.kana === correctWord.kana && word.romaji === correctWord.romaji
    );

    questions.push({
      id: `${i}-${correctWord.kana}-${actualType}-${Math.random().toString(36).slice(2, 7)}`,
      type: actualType,
      prompt: actualType === "kana-to-romaji" ? correctWord.kana : correctWord.romaji,
      choices,
      correctIndex: correctIndex === -1 ? 0 : correctIndex,
    });
  }

  return questions;
}

type QuizConfig = {
  rows: string[];
  type: "kana-to-romaji" | "romaji-to-kana" | "hybrid";
  length: number;
  choices: number;
};

type QuizBodyProps = {
  config: QuizConfig;
  wordPool: Word[];
  onRetry: () => void;
};

function QuizBody({ config, wordPool, onRetry }: QuizBodyProps) {
  const [questions] = useState<QuizQuestion[]>(() =>
    generateQuestions(wordPool, config.type, config.length, config.choices)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleChoice = (choiceIndex: number) => {
    if (isFinished || isAnswered || !currentQuestion) return;
    setSelectedChoice(choiceIndex);
    setIsAnswered(true);
    if (choiceIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setIsAnswered(false);
    }
  };

  const gridColumns =
    config.choices >= 8 ? "repeat(4, minmax(0, 1fr))" : config.choices >= 6 ? "repeat(3, 1fr)" : "repeat(2, 1fr)";

  if (!questions.length) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-white/80 p-8 text-center shadow">
        <p className="text-lg font-semibold text-rose-600">Not enough vocabulary selected.</p>
        <p className="mt-2 text-sm text-slate-500">Try enabling more rows so we can build a quiz.</p>
        <Link
          href="/quiz/japanese/hiragana"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2 text-white transition hover:bg-rose-600"
        >
          Back to setup
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href="/quiz/japanese/hiragana"
          className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/90 px-4 py-2 text-sm font-semibold text-rose-600 shadow hover:border-rose-200 hover:text-rose-700"
        >
          <span aria-hidden>←</span> Setup
        </Link>
        <div className="text-right text-sm text-slate-400">
          <div className="text-xs uppercase tracking-[0.3em]">Hiragana Quiz</div>
          <div className="text-base font-semibold text-slate-700">
            {isFinished ? "Results" : `Question ${currentIndex + 1} / ${questions.length}`}
          </div>
        </div>
      </div>

      {!isFinished && currentQuestion ? (
        <section className="rounded-[32px] border border-rose-100 bg-white/90 p-6 shadow">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {currentQuestion.type === "kana-to-romaji" ? "Kana → Romaji" : "Romaji → Kana"}
              </span>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-8 py-6 text-center text-4xl font-semibold text-slate-900 shadow-inner">
                {currentQuestion.prompt}
              </div>
            </div>
            <div className="text-sm text-slate-500">
              <p>Choices per question: {config.choices}</p>
              <p>Remaining: {questions.length - currentIndex - Number(isAnswered ? 0 : 1)}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4" style={{ gridTemplateColumns: gridColumns }}>
            {currentQuestion.choices.map((choice, index) => {
              const isCorrect = index === currentQuestion.correctIndex;
              const isSelectedChoice = selectedChoice === index;
              const showResult = isAnswered;
              const wrongSelection = showResult && isSelectedChoice && !isCorrect;
              const correctSelection = showResult && isCorrect;
              return (
                <button
                  key={`${currentQuestion.id}-${choice.kana}-${index}`}
                  type="button"
                  disabled={showResult}
                  onClick={() => handleChoice(index)}
                  className={`flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center text-2xl font-semibold transition ${
                    correctSelection
                      ? "border-green-500 bg-green-50 text-green-700"
                      : wrongSelection
                        ? "border-rose-400 bg-rose-50 text-rose-600"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                  } disabled:cursor-not-allowed`}
                >
                  <span>
                    {currentQuestion.type === "kana-to-romaji" ? choice.romaji : choice.kana}
                  </span>
                  {showResult && (
                    <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {currentQuestion.type === "kana-to-romaji" ? choice.kana : choice.romaji}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isAnswered}
              className="rounded-full bg-rose-500 px-6 py-2 text-base font-semibold text-white shadow transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {currentIndex === questions.length - 1 ? "See results" : "Next question"}
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-[32px] border border-rose-100 bg-white/90 p-8 text-center shadow">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quiz complete</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            {score} / {questions.length}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Accuracy {Math.round((score / questions.length) * 100)}%
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onRetry}
              className="rounded-full border border-rose-200 px-5 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300"
            >
              Try another set
            </button>
            <Link
              href="/quiz/japanese/hiragana"
              className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-rose-600"
            >
              Adjust settings
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default function HiraganaQuizSessionPage() {
  const searchParams = useSearchParams();

  const config = useMemo(() => {
    const rows = searchParams.get("rows")?.split(",").filter(Boolean) ?? [];
    return {
      rows,
      type: (searchParams.get("type") as "kana-to-romaji" | "romaji-to-kana" | "hybrid") ??
        "kana-to-romaji",
      length: Number(searchParams.get("length") ?? 10),
      choices: Number(searchParams.get("choices") ?? 4),
    };
  }, [searchParams]);

  const wordPool = useMemo(() => {
    const scoped = config.rows.length
      ? config.rows.flatMap((row) => rowVocabulary[row] ?? [])
      : allWords;
    return scoped.length ? scoped : allWords;
  }, [config.rows]);

  const [version, setVersion] = useState(0);
  const quizKey = `${config.rows.sort().join("-")}::${config.type}::${config.length}::${config.choices}::${version}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white px-6 py-10 text-slate-900">
      <div key={quizKey} className="mx-auto flex max-w-5xl flex-col gap-8">
        <QuizBody config={config} wordPool={wordPool} onRetry={() => setVersion((prev) => prev + 1)} />
      </div>
    </div>
  );
}

