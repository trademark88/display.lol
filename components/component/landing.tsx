"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Landing() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username) {
      router.push(`/auth/register?username=${username}`);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 ml-16">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Everything you want, right here.
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Display.lol is your go-to for modern, feature-rich biolinks and fast, secure file hosting. Everything you need — right here.
                    </p>
                  </div>
                  <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="font-medium">Display.me/</label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="username"
                      className="flex-1 max-w-lg w-44 rounded-2xl focus:outline-none"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button type="submit" className="rounded-2xl">Claim</Button>
                  </form>
                </div>
                <img
                  src="/img/displaylol.jpeg"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted rounded-2xl">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New function</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">More efficiency. More innovation.</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Display.lol is a platform that provides modern and feature-rich bio links, as well as secure file hosting services.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <img
                  src="/img/displaylol2.jpeg"
                  width="550"
                  height="310"
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last z-"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Free to use</h3>
                        <p className="text-muted-foreground">
                          Yes, Display.lol is completely free to use. However, we also offer a Premium package with exclusive features.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Present yourself</h3>
                        <p className="text-muted-foreground">
                          With Display.lol, you can connect all your social media links in one place, making it easier to share your online presence with others.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Easy to use</h3>
                        <p className="text-muted-foreground">
                          Setting up your Display.lol profile is quick and easy. Simply create an account and start customizing your profile immediately.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Are we safe?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Absolutely. We've earned the trust of over 140,000 users who rely on us to manage their online presence securely.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                <Link
                  href="#"
                  className="rounded-2xl inline-flex h-10 items-center justify-center  bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center  rounded-2xl border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  More
                </Link>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Present yourself via social media
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up easily and completely free of charge to start building your profile. It only takes a few minutes and is completely safe!
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                  <label htmlFor="username" className="font-medium">Display.me/</label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="username"
                    className="flex-1 max-w-lg w-44 rounded-2xl focus:outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button type="submit" className="rounded-2xl">Claim</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Sign up to be notified when we launch.{" "}
                  <Link href="#" className="underline underline-offset-2" prefetch={false}>
                    Terms of Use
                  </Link>
                </p>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="inline-block rounded-2xl bg-muted px-3 py-1 text-sm">Feature</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">Free services</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Display.lol offers a range of free services, including biolinks and file hosting. Customize your profile with ease and showcase your online presence.
                  </p>
                  <ul className="grid gap-6 pt-8 md:gap-8">
                    <li className="inline-flex items-center space-x-2">
                      <MountainIcon className="h-10 w-10 flex-none" />
                      <span className="font-medium">User-friendly interface</span>
                    </li>
                    <li className="inline-flex items-center space-x-2">
                      <MountainIcon className="h-10 w-10 flex-none" />
                      <span className="font-medium">Secure hosting</span>
                    </li>
                    <li className="inline-flex items-center space-x-2">
                      <MountainIcon className="h-10 w-10 flex-none" />
                      <span className="font-medium">Customizable profiles</span>
                    </li>
                  </ul>
                </div>
                <img
                  src="/img/displaylol3.jpeg"
                  width="550"
                  height="450"
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">&copy; 2024 Display.lol GmbH Inc. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Use
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Data protection
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
