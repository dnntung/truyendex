"use client";

import ChapterPages from "./chapter-pages";
import ChapterControl from "./chapter-control";
import { useLayoutEffect } from "react";
import useAppStore from "@/stores/app.store";

export default function ChapterView() {
  const appStore = useAppStore();

  useLayoutEffect(() => {
    appStore.setShowTopMenu(false);
  }, []);

  return (
    <>
      <div className="">
        <ChapterControl />
      </div>
      <ChapterPages />
    </>
  );
}
