"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Link from "next/link";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if ([name, email, password].some((value) => value.trim() === "")) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await http().post(endpoints.auth.signup, {
        name,
        email,
        password,
      });
      toast.success("Sign up successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignUp = () => {};

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onSubmit} className="space-y-2.5">
          <Input
            type="text"
            placeholder="Name"
            required
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            disabled={isLoading}
            onClick={() => handleProviderSignUp()}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
