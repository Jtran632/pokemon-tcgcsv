
import DisplaySetCards from "@/app/components/DisplaySetCards";
import { Suspense } from "react";

export default async function SetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  async function fetchSet(id: string) {
    const res = await fetch(`https://tcgcsv.com/tcgplayer/3/${id}/products`);
    return res.json();
  }
  const setData = fetchSet(id);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplaySetCards data={setData} />
      </Suspense>
    </div>
  );
}
