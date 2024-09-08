"use client";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CourseType = {
  title: string;
  duration: number;
  _id: string;
};

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http().get(endpoints.dashbaord.courses);
        setCourses(res?.data);
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-0 max-w-2xl mx-auto space-y-3 mt-10">
      {courses?.map((course, i) => (
        <div
          key={course._id}
          className="px-4 py-3 bg-slate-800 flex items-center gap-5"
        >
          <p className="text-base md:text-lg text-white">
            {course.title} <span>{`(${course.duration} hours)`}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
