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
import { useEffect, useState } from "react";
import Link from "next/link";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";
import Cookie from "js-cookie";
import { FcGoogle } from "react-icons/fc";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user?.email) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if ([email, password].some((value) => value.trim() === "")) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await http().post(endpoints.auth.login, {
        email,
        password,
      });

      if (data) {
        Cookie.set("accessToken", data.accessToken, {
          expires: new Date(new Date().getTime() + data.accessTokenExpiry),
        });
        Cookie.set("refreshToken", data.refreshToken, {
          expires: new Date(new Date().getTime() + data.refreshTokenExpiry),
        });
        setUser({ name: data.name, email: data.email });
        toast.success("Logged in successfully!");
        router.replace("/courses");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints.auth.googleAuth}`,
      "_self"
    );
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onSubmit} className="space-y-2.5">
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
            placeholder="Password"
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
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
