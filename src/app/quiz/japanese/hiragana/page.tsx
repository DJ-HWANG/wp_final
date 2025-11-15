"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type KanaRow = {
  id: string;
  label: string;
  romaji: string[];
  characters: string[];
};

const kanaRows: KanaRow[] = [
  {
    id: "a",
    label: "あ行",
    romaji: ["a", "i", "u", "e", "o"],
    characters: ["あ", "い", "う", "え", "お"],
  },
  {
    id: "ka",
    label: "か行",
    romaji: ["ka", "ki", "ku", "ke", "ko"],
    characters: ["か", "き", "く", "け", "こ"],
  },
  {
    id: "sa",
    label: "さ行",
    romaji: ["sa", "shi", "su", "se", "so"],
    characters: ["さ", "し", "す", "せ", "そ"],
  },
  {
    id: "ta",
    label: "た行",
    romaji: ["ta", "chi", "tsu", "te", "to"],
    characters: ["た", "ち", "つ", "て", "と"],
  },
  {
    id: "na",
    label: "な行",
    romaji: ["na", "ni", "nu", "ne", "no"],
    characters: ["な", "に", "ぬ", "ね", "の"],
  },
  {
    id: "ha",
    label: "は行",
    romaji: ["ha", "hi", "fu", "he", "ho"],
    characters: ["は", "ひ", "ふ", "へ", "ほ"],
  },
  {
    id: "ma",
    label: "ま行",
    romaji: ["ma", "mi", "mu", "me", "mo"],
    characters: ["ま", "み", "む", "め", "も"],
  },
  {
    id: "ya",
    label: "や行",
    romaji: ["ya", "", "yu", "", "yo"],
    characters: ["や", "", "ゆ", "", "よ"],
  },
  {
    id: "ra",
    label: "ら行",
    romaji: ["ra", "ri", "ru", "re", "ro"],
    characters: ["ら", "り", "る", "れ", "ろ"],
  },
  {
    id: "wa-n",
    label: "わ行",
    romaji: ["wa", "", "n", "", "wo"],
    characters: ["わ", "", "ん", "", "を"],
  },
];

const questionTypes = [
  {
    id: "kana-to-romaji",
    label: "Kana → Romaji",
    description: "See kana, answer with romaji.",
  },
  {
    id: "romaji-to-kana",
    label: "Romaji → Kana",
    description: "See romaji, answer with kana.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "Mix of both directions.",
  },
];

const drillLengths = [5, 10, 15, 20, 30, 40, 50];
const choiceCounts = [2, 4, 6, 8, 10];

export default function HiraganaQuizSetupPage() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>(
    kanaRows.map((row) => row.id)
  );
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(
    questionTypes[0].id
  );
  const [hoveredQuestionType, setHoveredQuestionType] = useState<string | null>(
    null
  );
  const [selectedDrillLength, setSelectedDrillLength] = useState<number>(10);
  const [hoveredDrillLength, setHoveredDrillLength] = useState<number | null>(
    null
  );
  const [selectedChoiceCount, setSelectedChoiceCount] = useState<number>(4);
  const [hoveredChoiceCount, setHoveredChoiceCount] = useState<number | null>(
    null
  );

  const allSelected = useMemo(
    () => selectedRows.length === kanaRows.length,
    [selectedRows]
  );

  const toggleRow = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === kanaRows.length ? [] : kanaRows.map((row) => row.id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex items-center justify-between">
          <Link
            href="/languages/japanese"
            className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/90 px-4 py-2 text-sm font-semibold text-rose-600 shadow hover:border-rose-200 hover:text-rose-700"
          >
            <span aria-hidden>←</span> Back
          </Link>
          <div className="text-right text-sm text-slate-400">
            <div className="text-xs uppercase tracking-[0.3em]">Quiz Scope</div>
            <div className="text-base font-semibold text-slate-700">
              Hiragana Practice
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <section className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-rose-600">
                Select Kana Rows
              </h2>
              <button
                type="button"
                onMouseEnter={() => setHoveredRow("all")}
                onMouseLeave={() =>
                  setHoveredRow((prev) => (prev === "all" ? null : prev))
                }
                onClick={toggleAll}
                className={`rounded-full border px-4 py-1 text-sm font-semibold transition ${
                  hoveredRow === "all"
                    ? "border-rose-400 text-rose-500"
                    : "border-slate-200 text-slate-500"
                }`}
              >
                {allSelected ? "Clear all" : "Select all"}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {kanaRows.map((row) => {
                const isHovered = hoveredRow === row.id;
                const isSelected = selectedRows.includes(row.id);
                return (
                  <button
                    key={row.id}
                    type="button"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() =>
                      setHoveredRow((prev) => (prev === row.id ? null : prev))
                    }
                    onClick={() => toggleRow(row.id)}
                    className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-rose-500 bg-rose-500/10 shadow-[0_15px_40px_-25px_rgba(244,63,94,0.8)]"
                        : isHovered
                        ? "border-rose-300 bg-white"
                        : "border-slate-200 bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-rose-500">
                      <span>{row.label}</span>
                      <span>{row.romaji.filter(Boolean).join(" / ")}</span>
                    </div>
                    <div className="mt-3 flex gap-2 text-2xl font-bold text-slate-800">
                      {row.characters.map((char, index) => (
                        <span
                          key={`${row.id}-${index}`}
                          className="min-w-[1.5rem] text-center"
                        >
                          {char || "·"}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-6 rounded-3xl border border-rose-100 bg-white/80 p-6 shadow">
            <div>
              <h2 className="text-lg font-semibold text-rose-600">
                Question Mode
              </h2>
              <p className="text-sm text-slate-500">
                Hover to preview, click to confirm. Selection is independent of
                hover state.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {questionTypes.map((type) => {
                const isHovered = hoveredQuestionType === type.id;
                const isSelected = selectedQuestionType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onMouseEnter={() => setHoveredQuestionType(type.id)}
                    onMouseLeave={() =>
                      setHoveredQuestionType((prev) =>
                        prev === type.id ? null : prev
                      )
                    }
                    onClick={() => setSelectedQuestionType(type.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-rose-500 bg-rose-500/10"
                        : isHovered
                        ? "border-rose-300 bg-white"
                        : "border-slate-200 bg-white/80"
                    }`}
                  >
                    <div className="text-base font-semibold text-slate-800">
                      {type.label}
                    </div>
                    <p className="text-sm text-slate-500">{type.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Drill Length
                </h3>
                <div className="flex flex-wrap gap-2">
                  {drillLengths.map((length) => {
                    const isHovered = hoveredDrillLength === length;
                    const isSelected = selectedDrillLength === length;
                    return (
                      <button
                        key={length}
                        type="button"
                        onMouseEnter={() => setHoveredDrillLength(length)}
                        onMouseLeave={() =>
                          setHoveredDrillLength((prev) =>
                            prev === length ? null : prev
                          )
                        }
                        onClick={() => setSelectedDrillLength(length)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : isHovered
                            ? "bg-rose-100 text-rose-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {length}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Number of Choices
                </h3>
                <div className="flex flex-wrap gap-2">
                  {choiceCounts.map((count) => {
                    const isHovered = hoveredChoiceCount === count;
                    const isSelected = selectedChoiceCount === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        onMouseEnter={() => setHoveredChoiceCount(count)}
                        onMouseLeave={() =>
                          setHoveredChoiceCount((prev) =>
                            prev === count ? null : prev
                          )
                        }
                        onClick={() => setSelectedChoiceCount(count)}
                        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : isHovered
                            ? "bg-rose-100 text-rose-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={selectedRows.length === 0}
              onClick={() => {
                if (!selectedRows.length) return;
                const params = new URLSearchParams({
                  rows: selectedRows.join(","),
                  type: selectedQuestionType,
                  length: String(selectedDrillLength),
                  choices: String(selectedChoiceCount),
                });
                router.push(
                  `/quiz/japanese/hiragana/session?${params.toString()}`
                );
              }}
              className="mt-auto rounded-full bg-rose-500 px-6 py-3 text-center text-base font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Start Quiz
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
