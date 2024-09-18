import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "./components/SignOutButton";
import React from "react";
import AddScreenButton from "./components/AddScreenButton";
import DeleteScreenButton from "./components/DeleteScreenButton";
import SettingButton from "./components/SettingButton";
import { ScreenContainer } from "./components/ScreenContainer";

interface IHomescreen {
  id?: number;
  title: string;
  url: string;
  target: string;
  icon?: string;
}

async function ScreenBox({ title, icon, url, target, id }: IHomescreen) {
  const session = await getServerSession();
  return (
    <ScreenContainer>
      <a href={url} target={target || "_blank"}>
        <i className={icon || "ti ti-hexagon"} style={{ fontSize: "80px" }} />
        <br />
        <strong>{title}</strong>
      </a>
      {session ? <DeleteScreenButton id={id || 0} /> : <></>}
    </ScreenContainer>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const optionData = await fetch(
    "http://localhost:3000/api/option?optionName=title",
    {
      cache: "no-store",
    }
  );
  const data = await optionData.json();

  return {
    title: data.optionValue,
  };
}

export default async function Home() {
  const homescreens = await prisma.homeScreen.findMany();
  const optionData = await fetch(
    "http://localhost:3000/api/option?optionName=title",
    {
      cache: "no-store",
    }
  );
  // let blogData = await fetch("https://api.vercel.app/blog/1");
  // let posts = await blogData.json();
  // let data = await fetch('https://api.vercel.app/blog')
  const data = await optionData.json();
  const title = data.optionValue;

  const session = await getServerSession();

  let right = null;
  let addHome = null;

  if (!session) {
    right = (
      <div className=" p-4">
        <div className="flex justify-end items-center">
          <Link
            href={"/api/auth/signin"}
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            登入
          </Link>
        </div>
      </div>
    );
  }

  if (session) {
    right = (
      <div className=" p-4">
        <div className="flex justify-end items-center gap-2">
          {/* Setting */}
          <SettingButton />
          <SignOutButton />
        </div>
      </div>
    );
    addHome = <AddScreenButton />;
  }

  return (
    <div className=" px-2">
      {right}
      <div className=" text-center mb-4">
        <h1 className=" text-4xl">{title}</h1>
      </div>
      <div id="home-screen">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {homescreens.map((homescreen) => (
            <ScreenBox
              key={homescreen.id}
              icon={homescreen.icon}
              title={homescreen.title}
              url={homescreen.url}
              target={homescreen.target}
              id={homescreen.id}
            />
          ))}
          {addHome}
        </div>
      </div>
    </div>
  );
}
