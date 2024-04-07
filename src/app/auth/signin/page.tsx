import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center bg-primary-c50 px-10 py-8 sm:px-20 md:px-30 lg:px-50">
      <div className="h-full w-full rounded-2xl bg-white shadow-default">
        <div className="flex h-full w-full flex-wrap items-center">
          {/* <div className="hidden w-full xl:block xl:w-1/2"> */}
          <div className=" relative hidden h-full w-full xl:block xl:w-1/2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/background/background-sign-in.png"
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="relative rounded-bl-2xl rounded-tl-2xl"
              />
              <div className="absolute inset-0 flex flex-col gap-1 bg-transparent px-7 py-5">
                <div className="text-4xl font-bold text-white">HANDMADE</div>
                <div className="text-lg font-semibold text-white">
                  Nơi dừng chân của mọi gian hàng!
                </div>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-1/2">hello cac ban</div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
