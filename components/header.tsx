import Image from "next/image";
import { Input } from "./ui/input";
import Logo from "@/assets/images/logo.svg";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2">
      <Input
        type="search"
        placeholder="Search 10,700+ tutorials"
        className="hidden md:block w-72 bg-gray-900 text-white"
      />
      <Image src={Logo} alt="logo" className="w-36 md:w-40 h-10" />
      <div className="flex gap-3">
        <Button variant="outline" className="bg-transparent text-white">
          Menu
        </Button>
        <Button
          asChild
          className="bg-orange-400 text-black hover:bg-orange-300"
        >
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
