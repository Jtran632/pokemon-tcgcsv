/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
interface ExtendedDataI {
  name: string;
  displayName: string;
  value: string;
}
interface CardI {
  productId: number;
  name: string;
  imageUrl: string;
  extendedData: ExtendedDataI[];
}
export default function DisplaySetCards({ data }: { data: Promise<object> }) {
  const setData: {
    results: CardI[];
  } = use(data) as {
    results: CardI[];
  };
  console.log(typeof setData);
  const [cards, setCards] = useState<CardI[]>([]);
  const [other, setOther] = useState<CardI[]>([]);
  const [curCard, setCurCard] = useState<CardI | null>(null);
  useEffect(() => {
    setCards(
      setData.results.filter(
        (pSet: CardI) => pSet.extendedData && pSet.extendedData.length > 3
      )
    );
    setOther(
      setData.results.filter(
        (pSet: CardI) => pSet.extendedData && pSet.extendedData.length <= 3
      )
    );
  }, [setData]);
  // useEffect(() => {
  //   console.log(cards.map((pSet: CardI) => pSet.extendedData[1].value));
  // }, [cards]);
  // useEffect(() => {
  //   console.log(curCard);
  // }, [curCard]);
  return (
    <div className="flex flex-col pt-10 w-full min-h-screen">
      <div className="flex justify-center items-center">
        <Link href="/" className="underline text-xl">
          Home
        </Link>
      </div>
      {curCard !== null && (
        <div className="fixed z-10 h-[56rem] w-[56rem] transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col border-4 w-full h-full bg-gradient-to-br from-slate-700 from-45% to-white rounded-2xl">
            <div className="flex justify-end p-1">
              <button
                className="p-1 rounded-md text-xs bg-white text-black font-mono font-semibold"
                onClick={() => setCurCard(null)}
              >
                Close
              </button>
            </div>
            <div className="flex w-full justify-center items-center px-54 pt-15">
              <div className="relative w-full h-full">
                <img
                  src={curCard?.imageUrl.replace(
                    "_200w.jpg",
                    "_in_1000x1000.jpg"
                  )}
                  alt={curCard?.name}
                  className="w-full rounded-[32px]"
                ></img>
                {/* <img
                  src={"https://i.gifer.com/68m.gif"}
                  className="absolute top-0  mix-blend-soft-light brightness rounded-[32px] w-full h-full pointer-events-none contrast-200"
                /> */}
                {/* <img
                  src={"https://i.gifer.com/IrF.gif"}
                  className="absolute top-0 mix-blend-color-dodge p-5 brightness-200 rounded-2xl blur-[2px]"
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${curCard == null ? "" : "hidden"}`}>
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:px-72 lg:px-40 gap-2 w-full px-0 text-[8px]">
            {cards.map((pSet: CardI, index) => (
              <div
                key={index}
                className=""
                onClick={() => {
                  if (curCard === null) {
                    setCurCard(pSet);
                    console.log(pSet.extendedData[1].value);
                  }
                }}
              >
                <div className="hidden sm:hidden xl:block">
                  <div className="flex justify-between px-1">
                    <div>{pSet.name}</div>
                    <div>{pSet.extendedData[1].value}</div>
                  </div>
                </div>
                <img
                  src={pSet.imageUrl.replace("_200w.jpg", "_in_1000x1000.jpg")}
                  alt={pSet.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg overflow-hidden scale-150";
                    e.currentTarget.className = "border border-red-300";
                  }}
                  className="contrast-110 brightness-100 rounded-xl w-full"
                />
              </div>
            ))}
          </div>
        )}
        {other.length > 0 && cards.length <= 0 && (
          <div className="grid grid-cols-6 gap-2">
            {other.map((pSet: CardI, index) => (
              <div key={index} className="">
                {/* <div>{pSet.name}</div> */}
                <img
                  src={pSet.imageUrl}
                  alt={pSet.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                    e.currentTarget.className =
                      "w-[200px] h-[200px] border-4 border-red-300";
                  }}
                  className={"w-[200px] h-[200px]"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
