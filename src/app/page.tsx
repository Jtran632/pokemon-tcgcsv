import Link from "next/link";
export default async function Home() {
  const pSets = await fetch("https://tcgcsv.com/tcgplayer/3/groups");
  const PData = await pSets.json();
  console.log(PData);
  interface ISets {
    groupId: number;
    name: string;
    abbreviation: string;
    publishedOn: string;
    isSupplemental: boolean;
  }
  const sets: ISets[] = PData.results;
  // const PromoSets = sets.filter(
  //   (i: any) =>
  //     i.abbreviation == "PR" ||
  //     (i.name.includes("Promo") && !i.name.includes("McDonald"))
  // );
  // const PopSets = sets
  //   .filter((i: any) => i.abbreviation == "POP")
  //   .sort((a: any, b: any) => a.name.localeCompare(b.name));
  // const McdSets = sets.filter((i: any) => i.name.includes("McDonald"));
  // const OtherSets = sets.filter(
  //   (i: any) =>
  //     (i.isSupplemental &&
  //       !i.name.includes("McDonald") &&
  //       !i.name.includes("Promo")) ||
  //     i.name.toLowerCase().includes("bundle") ||
  //     i.name.toLowerCase().includes("box") ||
  //     i.name.toLowerCase().includes("prize") ||
  //     i.name.toLowerCase().includes("collection") ||
  //     i.name.toLowerCase().includes("kit")
  // );
  // const sortedData = sets
  //   .filter(
  //     (i: any) =>
  //       !i.name.includes("McDonald") &&
  //       i.abbreviation !== "PR" &&
  //       i.abbreviation !== "POP" &&
  //       !i.isSupplemental &&
  //       !i.name.toLowerCase().includes("bundle") &&
  //       !i.name.toLowerCase().includes("box") &&
  //       !i.name.toLowerCase().includes("prize") &&
  //       !i.name.toLowerCase().includes("collection") &&
  //       !i.name.toLowerCase().includes("kit") &&
  //       !i.name.toLowerCase().includes("Promo")
  //   )
  //   .sort((a: ISets, b: ISets) => {
  //     return a.publishedOn.localeCompare(b.publishedOn);
  //   });
  const sortedData = sets.sort((a: ISets, b: ISets) => {
    return a.publishedOn.localeCompare(b.publishedOn);
  });
  return (
    <div className="flex flex-col min-h-screen py-2">
      <h1 className="text-4xl font-bold">TCG Player Sets</h1>
      <div className="grid grid-cols-8 grid-rows-flow gap-0.5 text-[10px]">
        {sortedData.map((pSet: any) => (
          <Link
            href={`/set/${pSet.groupId}`}
            key={pSet.groupId}
            className="flex border px-1"
          >
            <div className="flex flex-col">
              <p>{pSet.name}</p>
              <p>{pSet.abbreviation}</p>
              <div>
                {new Date(pSet.publishedOn)
                  .toLocaleString()
                  .slice(0, 10)
                  .replace(",", "")}
              </div>
            </div>
          </Link>
        ))}
        {/* <div>
          {PromoSets.map((pSet: any) => (
            <Link
              href={`/set/${pSet.groupId}`}
              key={pSet.groupId}
              className="flex border justify-between px-4"
            >
              <div className="flex gap-2">
                <p>{pSet.name}</p>
                <p>{pSet.abbreviation}</p>
              </div>
              <div>
                {new Date(pSet.publishedOn)
                  .toLocaleString()
                  .slice(0, 10)
                  .replace(",", "")}
              </div>
            </Link>
          ))}
        </div>
        <div>
          {PopSets.map((pSet: any) => (
            <Link
              href={`/set/${pSet.groupId}`}
              key={pSet.groupId}
              className="flex border justify-between px-4"
            >
              <div className="flex gap-2">
                <p>{pSet.name}</p>
                <p>{pSet.abbreviation}</p>
              </div>
              <div>
                {new Date(pSet.publishedOn)
                  .toLocaleString()
                  .slice(0, 10)
                  .replace(",", "")}
              </div>
            </Link>
          ))}
        </div>
        <div>
          {McdSets.map((pSet: any) => (
            <Link
              href={`/set/${pSet.groupId}`}
              key={pSet.groupId}
              className="flex border justify-between px-4"
            >
              <div className="flex gap-2">
                <p>{pSet.name}</p>
                <p>{pSet.abbreviation}</p>
              </div>
              <div>
                {new Date(pSet.publishedOn)
                  .toLocaleString()
                  .slice(0, 10)
                  .replace(",", "")}
              </div>
            </Link>
          ))}
        </div>
        <div>
          {OtherSets.map((pSet: any) => (
            <Link
              href={`/set/${pSet.groupId}`}
              key={pSet.groupId}
              className="flex border justify-between px-4"
            >
              <div className="flex gap-2">
                <p>{pSet.name}</p>
                <p>{pSet.abbreviation}</p>
              </div>
              <div>
                {new Date(pSet.publishedOn)
                  .toLocaleString()
                  .slice(0, 10)
                  .replace(",", "")}
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
}
