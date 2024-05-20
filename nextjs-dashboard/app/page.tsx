'use client' 

import { useAuth } from '@/app/hooks/useAuth';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  const { user } = useAuth();
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col p-6 bg-gray-100">
      <div className={`flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52`}>
        <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
          Compute-Share
        </p>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white shadow-lg px-6 py-10 md:px-20">
          <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Compute-Share.</strong> The ultimate platform to rent CPU/GPU space for your compute-heavy tasks. 
            Whether you're a hobbyist, entrepreneur, or academic, we offer flexible and affordable solutions for your computing needs. 
            Only pay for the time and memory you use.
          </p>
          {user ? (
            <Link
              href="/console"
              className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
            >
              <span>Go to Console</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log In</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          )}
        </div>
        {/* <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div> */}
      </div>
    </main>
  );
}
