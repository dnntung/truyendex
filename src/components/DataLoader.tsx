"use client";

import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";

import { MangadexApi } from "@/api";
import { Button } from "./nettrom/Button";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: any;
}) => {
  const refresh = useCallback(() => {
    if (typeof window !== "undefined") window.location.reload();
  }, []);

  if (props.isLoading) {
    return (
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 py-10 text-center text-sm text-muted-foreground">
        <Loader2 className="h-[40px] w-[40px] animate-spin" />
        <span>{props.loadingText || "Đang tải..."}</span>
      </div>
    );
  }

  if (props.error) {
    console.error(props.error);
    let errorMessage;
    const error = props.error;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof MangadexApi.Utils.MangaDexError) {
      errorMessage = error.response?.data?.message || error.message;
    } else errorMessage = "Không xác định";
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center text-sm text-muted-foreground">
        <div>
          <p className="mb-2 text-2xl">( ༎ຶ⌑༎ຶ )</p>
          <span>Đã có lỗi xảy ra: {errorMessage}</span>
        </div>
        <Button
          className="px-4 py-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => refresh()
          }
        >
          Tải lại toàn bộ trang
        </Button>
      </div>
    );
  }

  return props.children;
};
