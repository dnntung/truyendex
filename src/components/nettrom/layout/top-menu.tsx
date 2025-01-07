"use client";

import useAppStore from "@/stores/app.store";
import { Alert } from "../Alert";
import MainNav from "./main-nav-2";

export const TopMenu = () => {
  const appStore = useAppStore();

  if (!appStore.showTopMenu) {
    return null;
  }

  return (
    <nav
      className="main-nav hidden-xs bg-muted pt-[40px] text-foreground"
      id="mainNav"
    >
      <div className="inner">
        <div className="container">
          <div className="py-4">
            <Alert
              title="TruyenDex chỉ xây dựng giao diện tiếng Việt, toàn bộ dữ liệu
          thuộc về MangaDex."
              classNames={{
                alert: "rounded-t-none mb-1 shadow-xl",
              }}
            />
            <MainNav />
          </div>
        </div>
      </div>
    </nav>
  );
};
