"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      router.push("/");
      return;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {/* <p className="text-gray-300">Loading...</p> */}
      </div>
    );
  }

  return children;
}
