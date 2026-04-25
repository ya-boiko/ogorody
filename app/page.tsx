import { Hero } from "@/components/hero/Hero";
import { Pillars } from "@/components/pillars/Pillars";
import { DayTimeline } from "@/components/day/DayTimeline";
import { PlacesMosaic } from "@/components/places/PlacesMosaic";
import { Care } from "@/components/care/Care";
import { Watch } from "@/components/watch/Watch";
import { Community } from "@/components/community/Community";
import { Harvest } from "@/components/harvest/Harvest";
import { PlotsPreview } from "@/components/plots-preview/PlotsPreview";
import { FinalCta } from "@/components/final/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <DayTimeline />
      <PlacesMosaic />
      <Care />
      <Watch />
      <Community />
      <Harvest />
      <PlotsPreview />
      <FinalCta />
    </>
  );
}
