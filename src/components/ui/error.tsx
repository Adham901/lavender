import Image from 'next/image';
import React from 'react';

export default function error() {
  return (
    <main className="min-h-screen bg-zinc-50 gap-12 flex flex-col justify-center items-center">
      {/* server-down Image */}
      <Image
        src="/assets/images/server-down..png"
        height={300}
        width={300}
        quality={100}
        alt="shield-image"
      />

      {/* Content */}
      <div className="flex flex-col gap-4 text-center">
        {/* Main Heading */}
        <h1 className="text-zinc-800 font-semibold font-inter text-4xl">
          Oops, something went wrong!
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-xl font-inter">
          Something unexpected happened, please refresh the page or try again shortly.
        </p>
      </div>
    </main>
  );
}
