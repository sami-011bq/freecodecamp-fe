import { Button } from "@/components/ui/button";
import {
  FaAmazon,
  FaApple,
  FaGoogle,
  FaMicrosoft,
  FaSpotify,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="px-4 md:px-0 max-w-2xl mx-auto my-20">
      <p className="text-gray-300 text-4xl leading-[54px] antialiased mb-8">
        Learn to code.
        <br />
        Build projects.
        <br />
        Earn certifications.
        <br />
        All for free.
      </p>
      <p className="text-gray-300 text-lg antialiased mb-5">
        More than 100,000 freeCodeCamp.org graduates have gotten jobs at tech
        companies including:
      </p>
      <div className="flex items-center gap-8 mb-5">
        <FaApple className="text-5xl text-[#D0D0D5]" />
        <FaGoogle className="text-4xl text-[#D0D0D5]" />
        <FaMicrosoft className="text-4xl text-[#D0D0D5]" />
        <FaSpotify className="text-4xl text-[#D0D0D5]" />
        <FaAmazon className="text-4xl text-[#D0D0D5]" />
      </div>
      <Button className="bg-orange-400 text-black hover:bg-orange-300">
        Get Started
      </Button>
    </div>
  );
}
