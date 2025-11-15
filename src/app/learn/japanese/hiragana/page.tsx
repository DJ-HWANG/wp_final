"use client";

import Link from "next/link";
import { useState } from "react";

type Vocab = {
  word: string;
  reading: string;
  meaning: string;
  icon?: string;
};

type Kana = {
  symbol: string;
  romaji: string;
  strokeCount: number;
  vocab: Vocab[];
};

const hiraganaSet: Kana[] = [
  {
    symbol: "あ",
    romaji: "a",
    strokeCount: 3,
    vocab: [
      { word: "あした", reading: "ashita", meaning: "tomorrow", icon: "🌤️" },
      { word: "あめ", reading: "ame", meaning: "rain", icon: "🌧️" },
    ],
  },
  {
    symbol: "い",
    romaji: "i",
    strokeCount: 2,
    vocab: [
      { word: "いぬ", reading: "inu", meaning: "dog", icon: "🐶" },
      { word: "いけ", reading: "ike", meaning: "pond" },
    ],
  },
  {
    symbol: "う",
    romaji: "u",
    strokeCount: 2,
    vocab: [
      { word: "うみ", reading: "umi", meaning: "sea", icon: "🌊" },
      { word: "うた", reading: "uta", meaning: "song" },
    ],
  },
  {
    symbol: "え",
    romaji: "e",
    strokeCount: 2,
    vocab: [
      { word: "えき", reading: "eki", meaning: "station" },
      { word: "えがお", reading: "egao", meaning: "smile" },
    ],
  },
  {
    symbol: "お",
    romaji: "o",
    strokeCount: 3,
    vocab: [
      { word: "おちゃ", reading: "ocha", meaning: "tea", icon: "🍵" },
      { word: "おかね", reading: "okane", meaning: "money" },
    ],
  },
  {
    symbol: "か",
    romaji: "ka",
    strokeCount: 3,
    vocab: [
      { word: "からて", reading: "karate", meaning: "karate" },
      { word: "かぜ", reading: "kaze", meaning: "wind", icon: "🍃" },
    ],
  },
  {
    symbol: "き",
    romaji: "ki",
    strokeCount: 4,
    vocab: [
      { word: "き", reading: "ki", meaning: "tree", icon: "🌳" },
      { word: "きっぷ", reading: "kippu", meaning: "ticket" },
    ],
  },
  {
    symbol: "く",
    romaji: "ku",
    strokeCount: 1,
    vocab: [
      { word: "くも", reading: "kumo", meaning: "cloud", icon: "☁️" },
      { word: "くつ", reading: "kutsu", meaning: "shoes" },
    ],
  },
  {
    symbol: "け",
    romaji: "ke",
    strokeCount: 3,
    vocab: [
      { word: "けむり", reading: "kemuri", meaning: "smoke" },
      { word: "けしき", reading: "keshiki", meaning: "scenery" },
    ],
  },
  {
    symbol: "こ",
    romaji: "ko",
    strokeCount: 2,
    vocab: [
      { word: "こども", reading: "kodomo", meaning: "child" },
      { word: "ことり", reading: "kotori", meaning: "little bird" },
    ],
  },
  {
    symbol: "さ",
    romaji: "sa",
    strokeCount: 3,
    vocab: [
      { word: "さくら", reading: "sakura", meaning: "cherry blossom", icon: "🌸" },
      { word: "さかな", reading: "sakana", meaning: "fish" },
    ],
  },
  {
    symbol: "し",
    romaji: "shi",
    strokeCount: 1,
    vocab: [
      { word: "しお", reading: "shio", meaning: "salt" },
      { word: "しま", reading: "shima", meaning: "island" },
    ],
  },
  {
    symbol: "す",
    romaji: "su",
    strokeCount: 2,
    vocab: [
      { word: "すいか", reading: "suika", meaning: "watermelon" },
      { word: "すな", reading: "suna", meaning: "sand" },
    ],
  },
  {
    symbol: "せ",
    romaji: "se",
    strokeCount: 3,
    vocab: [
      { word: "せかい", reading: "sekai", meaning: "world" },
      { word: "せんせい", reading: "sensei", meaning: "teacher" },
    ],
  },
  {
    symbol: "そ",
    romaji: "so",
    strokeCount: 2,
    vocab: [
      { word: "そら", reading: "sora", meaning: "sky" },
      { word: "そば", reading: "soba", meaning: "buckwheat noodles" },
    ],
  },
  {
    symbol: "た",
    romaji: "ta",
    strokeCount: 4,
    vocab: [
      { word: "たいよう", reading: "taiyou", meaning: "sun", icon: "☀️" },
      { word: "たまご", reading: "tamago", meaning: "egg" },
    ],
  },
  {
    symbol: "ち",
    romaji: "chi",
    strokeCount: 2,
    vocab: [
      { word: "ちず", reading: "chizu", meaning: "map" },
      { word: "ちから", reading: "chikara", meaning: "strength" },
    ],
  },
  {
    symbol: "つ",
    romaji: "tsu",
    strokeCount: 1,
    vocab: [
      { word: "つき", reading: "tsuki", meaning: "moon", icon: "🌙" },
      { word: "つめたい", reading: "tsumetai", meaning: "cold (touch)" },
    ],
  },
  {
    symbol: "て",
    romaji: "te",
    strokeCount: 1,
    vocab: [
      { word: "て", reading: "te", meaning: "hand" },
      { word: "てがみ", reading: "tegami", meaning: "letter" },
    ],
  },
  {
    symbol: "と",
    romaji: "to",
    strokeCount: 2,
    vocab: [
      { word: "とり", reading: "tori", meaning: "bird", icon: "🐦" },
      { word: "ともだち", reading: "tomodachi", meaning: "friend" },
    ],
  },
  {
    symbol: "な",
    romaji: "na",
    strokeCount: 4,
    vocab: [
      { word: "なつ", reading: "natsu", meaning: "summer" },
      { word: "なみ", reading: "nami", meaning: "wave" },
    ],
  },
  {
    symbol: "に",
    romaji: "ni",
    strokeCount: 3,
    vocab: [
      { word: "にほん", reading: "nihon", meaning: "Japan" },
      { word: "にく", reading: "niku", meaning: "meat" },
    ],
  },
  {
    symbol: "ぬ",
    romaji: "nu",
    strokeCount: 2,
    vocab: [
      { word: "ぬの", reading: "nuno", meaning: "cloth" },
      { word: "ぬりえ", reading: "nurie", meaning: "coloring book" },
    ],
  },
  {
    symbol: "ね",
    romaji: "ne",
    strokeCount: 2,
    vocab: [
      { word: "ねこ", reading: "neko", meaning: "cat", icon: "🐱" },
      { word: "ねつ", reading: "netsu", meaning: "fever" },
    ],
  },
  {
    symbol: "の",
    romaji: "no",
    strokeCount: 1,
    vocab: [
      { word: "のり", reading: "nori", meaning: "seaweed" },
      { word: "のはら", reading: "nohara", meaning: "field" },
    ],
  },
  {
    symbol: "は",
    romaji: "ha",
    strokeCount: 3,
    vocab: [
      { word: "はな", reading: "hana", meaning: "flower", icon: "🌺" },
      { word: "はこ", reading: "hako", meaning: "box" },
    ],
  },
  {
    symbol: "ひ",
    romaji: "hi",
    strokeCount: 1,
    vocab: [
      { word: "ひ", reading: "hi", meaning: "fire", icon: "🔥" },
      { word: "ひこうき", reading: "hikouki", meaning: "airplane" },
    ],
  },
  {
    symbol: "ふ",
    romaji: "fu",
    strokeCount: 4,
    vocab: [
      { word: "ふね", reading: "fune", meaning: "ship" },
      { word: "ふゆ", reading: "fuyu", meaning: "winter" },
    ],
  },
  {
    symbol: "へ",
    romaji: "he",
    strokeCount: 1,
    vocab: [
      { word: "へや", reading: "heya", meaning: "room" },
      { word: "へん", reading: "hen", meaning: "strange" },
    ],
  },
  {
    symbol: "ほ",
    romaji: "ho",
    strokeCount: 4,
    vocab: [
      { word: "ほし", reading: "hoshi", meaning: "star", icon: "⭐" },
      { word: "ほね", reading: "hone", meaning: "bone" },
    ],
  },
  {
    symbol: "ま",
    romaji: "ma",
    strokeCount: 3,
    vocab: [
      { word: "まつり", reading: "matsuri", meaning: "festival" },
      { word: "まくら", reading: "makura", meaning: "pillow" },
    ],
  },
  {
    symbol: "み",
    romaji: "mi",
    strokeCount: 2,
    vocab: [
      { word: "みず", reading: "mizu", meaning: "water" },
      { word: "みみ", reading: "mimi", meaning: "ear" },
    ],
  },
  {
    symbol: "む",
    romaji: "mu",
    strokeCount: 3,
    vocab: [
      { word: "むし", reading: "mushi", meaning: "insect" },
      { word: "むね", reading: "mune", meaning: "chest" },
    ],
  },
  {
    symbol: "め",
    romaji: "me",
    strokeCount: 2,
    vocab: [
      { word: "め", reading: "me", meaning: "eye" },
      { word: "めがね", reading: "megane", meaning: "glasses" },
    ],
  },
  {
    symbol: "も",
    romaji: "mo",
    strokeCount: 3,
    vocab: [
      { word: "もり", reading: "mori", meaning: "forest" },
      { word: "もも", reading: "momo", meaning: "peach" },
    ],
  },
  {
    symbol: "や",
    romaji: "ya",
    strokeCount: 3,
    vocab: [
      { word: "やま", reading: "yama", meaning: "mountain", icon: "⛰️" },
      { word: "やさい", reading: "yasai", meaning: "vegetable" },
    ],
  },
  {
    symbol: "ゆ",
    romaji: "yu",
    strokeCount: 2,
    vocab: [
      { word: "ゆき", reading: "yuki", meaning: "snow", icon: "❄️" },
      { word: "ゆめ", reading: "yume", meaning: "dream" },
    ],
  },
  {
    symbol: "よ",
    romaji: "yo",
    strokeCount: 2,
    vocab: [
      { word: "よる", reading: "yoru", meaning: "night" },
      { word: "ようふく", reading: "youfuku", meaning: "clothes" },
    ],
  },
  {
    symbol: "ら",
    romaji: "ra",
    strokeCount: 2,
    vocab: [
      { word: "らいねん", reading: "rainen", meaning: "next year" },
      { word: "らっぱ", reading: "rappa", meaning: "trumpet" },
    ],
  },
  {
    symbol: "り",
    romaji: "ri",
    strokeCount: 1,
    vocab: [
      { word: "りす", reading: "risu", meaning: "squirrel" },
      { word: "りんご", reading: "ringo", meaning: "apple", icon: "🍎" },
    ],
  },
  {
    symbol: "る",
    romaji: "ru",
    strokeCount: 2,
    vocab: [
      { word: "るす", reading: "rusu", meaning: "absence" },
      { word: "るい", reading: "rui", meaning: "category" },
    ],
  },
  {
    symbol: "れ",
    romaji: "re",
    strokeCount: 2,
    vocab: [
      { word: "れいぞうこ", reading: "reizouko", meaning: "refrigerator" },
      { word: "れんあい", reading: "renai", meaning: "romance" },
    ],
  },
  {
    symbol: "ろ",
    romaji: "ro",
    strokeCount: 1,
    vocab: [
      { word: "ろうそく", reading: "rousoku", meaning: "candle" },
      { word: "ろば", reading: "roba", meaning: "donkey" },
    ],
  },
  {
    symbol: "わ",
    romaji: "wa",
    strokeCount: 2,
    vocab: [
      { word: "わし", reading: "washi", meaning: "eagle" },
      { word: "わらい", reading: "warai", meaning: "laughter" },
    ],
  },
  {
    symbol: "を",
    romaji: "wo",
    strokeCount: 2,
    vocab: [
      { word: "をとこ", reading: "otoko", meaning: "man" },
      { word: "をんがく", reading: "ongaku", meaning: "music" },
    ],
  },
  {
    symbol: "ん",
    romaji: "n",
    strokeCount: 1,
    vocab: [
      { word: "んまい", reading: "nmai", meaning: "tasty (dialect)" },
      { word: "んい", reading: "n'i", meaning: "sound sample" },
    ],
  },
];

export default function HiraganaLearnPage() {
  const [selected, setSelected] = useState<Kana>(hiraganaSet[0]);

  const kanaBySymbol = hiraganaSet.reduce<Record<string, Kana>>(
    (acc, kana) => {
      acc[kana.symbol] = kana;
      return acc;
    },
    {}
  );

  const chartOrder: Array<Array<string | null>> = [
    ["あ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["や", null, "ゆ", null, "よ"],
    ["ら", "り", "る", "れ", "ろ"],
    ["わ", null, null, null, "を"],
    ["ん", null, null, null, null],
  ];

  const chartRows: Array<Array<Kana | null>> = chartOrder.map((row) =>
    row.map((symbol) => (symbol ? kanaBySymbol[symbol] ?? null : null))
  );

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-4 min-h-0">
        <Link
          href="/languages/japanese"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-white/90 px-4 py-2 text-sm font-semibold text-rose-600 shadow hover:border-rose-200 hover:text-rose-700"
        >
          <span aria-hidden>←</span> Back
        </Link>
        <div className="grid flex-1 min-h-0 gap-8 rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-2xl backdrop-blur-md md:grid-cols-[minmax(0,_1fr)_minmax(320px,_380px)]">
          <div className="flex min-h-0 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-wide text-rose-600">
              Hiragana chart
            </h1>
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              清音46
            </span>
          </div>
            <div className="grid flex-1 min-h-0 grid-cols-5 gap-3 overflow-y-auto pr-3">
            {chartRows.flatMap((row, rowIndex) =>
              row.map((kana, colIndex) => {
                if (!kana) {
                  return (
                    <div
                      key={`placeholder-${rowIndex}-${colIndex}`}
                      className="rounded-xl border border-dashed border-rose-50 bg-transparent"
                    />
                  );
                }
                const isActive = kana.symbol === selected.symbol;
                return (
                  <button
                    key={kana.symbol}
                    type="button"
                    className={`flex h-28 flex-col justify-between rounded-xl border border-rose-100 bg-rose-500/5 p-3 text-left transition hover:bg-rose-500/10 ${
                      isActive ? "ring-2 ring-rose-400" : ""
                    }`}
                    onClick={() => setSelected(kana)}
                  >
                    <div className="flex justify-end text-xs font-semibold uppercase text-slate-400">
                      <span>{kana.romaji}</span>
                    </div>
                    <span className="text-4xl font-bold text-rose-600">
                      {kana.symbol}
                    </span>
                  </button>
                );
              })
            )}
          </div>
          </div>

          <div className="flex min-h-0 flex-col rounded-3xl border border-rose-100 bg-white p-6 text-slate-900 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-bold text-rose-600">
                {selected.symbol}
              </span>
              <span className="text-lg font-semibold text-slate-600">
                {selected.romaji}
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Stroke count {selected.strokeCount}
              </span>
            </div>
            <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
              {selected.vocab.map((entry) => (
                <div
                  key={entry.word}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xl font-semibold text-slate-900">
                        {entry.word}
                      </div>
                      <div className="text-sm font-medium text-slate-500">
                        {entry.reading}
                      </div>
                    </div>
                    {entry.icon ? (
                      <span className="text-xl" aria-hidden>
                        {entry.icon}
                      </span>
                    ) : null}
                  </div>
                  <div className="text-sm text-slate-600">{entry.meaning}</div>
                </div>
              ))}
              {selected.vocab.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
                  Add your own vocabulary for {selected.symbol}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

