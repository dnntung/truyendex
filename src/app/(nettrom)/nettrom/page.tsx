"use client";

import FeaturedTitles from "@/components/nettrom/trang-chu/featured-titles";
import NewUpdates from "@/components/nettrom/trang-chu/new-updated-titles";
import ReadingHistory from "@/components/nettrom/trang-chu/reading-history";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import useAppStore from "@/stores/app.store";
import { useLayoutEffect } from "react";

export default function HomePage() {
  const appStore = useAppStore();

  useLayoutEffect(() => {
    appStore.setShowTopMenu(true);
  }, []);

  return (
    <div className="flex flex-col gap-[40px]">
      <FeaturedTitles />
      <div className="grid gap-[40px] lg:grid-cols-[2fr_1fr]">
        <div>
          <NewUpdates />
        </div>
        <div className="flex flex-col gap-[20px]">
          <ReadingHistory />
          <TopTitles />
        </div>
      </div>
    </div>
  );
}
