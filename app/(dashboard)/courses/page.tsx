"use client";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useEffect, useState } from "react";

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http().get(endpoints.dashbaord.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, []);

  console.log(data);

  return <div>Courses</div>;
}
