import React from 'react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-50 gap-12 flex flex-col justify-center items-center">
      {/* Not Found Image */}
      <Image
        src="/assets/images/not-found.png"
        height={315}
        width={610}
        quality={100}
        alt="not-found-image"
      />

      {/* Content */}
      <div className="flex flex-col gap-4 text-center">
        {/* Main Heading */}
        <h1 className="text-zinc-800 text-4xl font-inter font-semibold ">
          This page does not exist.
        </h1>

        {/* Decription */}
        <p className="text-zinc-400 text-xl font-inter">
          We couldn't find the page your are looking for, please make sure you are in the right
          path.
        </p>
      </div>
    </main>
  );
}
