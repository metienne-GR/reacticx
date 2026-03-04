import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import HeaderProSmall from "@/components/landing/header-mobile";
import Link from "next/link";

export const baseOptions = <T extends Partial<BaseLayoutProps>>(
  option?: T,
): BaseLayoutProps => ({
  nav: {
    title: (
      <div className="flex items-center">
        <Image
          alt="Reactix Logo"
          className="ml-3 mr-3 dark:hidden"
          height={20}
          width={20}
          src="/static/deps/dark_logo.png"
        />
        <Image
          alt="Reactix Logo"
          className="hidden dark:block"
          height={60}
          width={50}
          src="/static/deps/white_glow.png"
        />
        <span className="hidden md:inline-flex items-center font-bold text-lg tracking-tight text-black dark:text-white">
          Reactix
        </span>
      </div>
    ),
  },

  links: [
    {
      type: "custom",
      children: <HeaderProSmall />,
    },

    {
      type: "custom",
      children: (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3">
          {/* Social Icons Row */}
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            {/* Discord Icon */}
            <Link
              href="https://discord.gg/bvEpjhKgar"
              className="flex h-9 w-9 items-center justify-center rounded-md
                         text-zinc-700 hover:text-zinc-900
                         dark:text-zinc-300 dark:hover:text-white
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M20.317 4.369a19.8 19.8 0 0 0-4.885-1.515.07.07 0 0 0-.074.035c-.211.375-.444.864-.608 1.249a18.3 18.3 0 0 0-5.487 0 12 12 0 0 0-.616-1.249.07.07 0 0 0-.074-.035a19.8 19.8 0 0 0-4.885 1.515.06.06 0 0 0-.032.027C.533 9.045-.32 13.58.099 18.058a.08.08 0 0 0 .031.054a19.9 19.9 0 0 0 5.993 3.042.07.07 0 0 0 .079-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 0 0-.031-.095a13 13 0 0 1-1.872-.9a.07.07 0 0 1-.006-.118c.126-.094.252-.192.371-.291a.07.07 0 0 1 .074-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .074.01c.119.099.245.197.371.291a.07.07 0 0 1-.006.118c-.598.347-1.226.652-1.872.9a.07.07 0 0 0-.031.095c.36.699.765 1.364 1.226 1.994a.07.07 0 0 0 .079.027a19.9 19.9 0 0 0 5.993-3.042a.08.08 0 0 0 .031-.054c.5-5.177-.838-9.673-3.548-13.661a.06.06 0 0 0-.032-.027ZM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419s.955-2.419 2.156-2.419c1.21 0 2.175 1.103 2.156 2.419c0 1.334-.955 2.419-2.156 2.419Zm7.975 0c-1.183 0-2.156-1.085-2.156-2.419s.955-2.419 2.156-2.419c1.21 0 2.175 1.103 2.156 2.419c0 1.334-.946 2.419-2.156 2.419Z" />
              </svg>
            </Link>
            {/* X / Twitter */}
            <Link
              href="https://x.com/rit3zh"
              className="flex h-9 w-9 items-center justify-center rounded-md
                         text-zinc-700 hover:text-zinc-900
                         dark:text-zinc-300 dark:hover:text-white
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Z" />
              </svg>
            </Link>
            {/* GitHub */}
            <Link
              href="https://github.com/rit3zh"
              className="flex h-9 w-9 items-center justify-center rounded-md
                         text-zinc-700 hover:text-zinc-900
                         dark:text-zinc-300 dark:hover:text-white
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.1c-3.34.73-4.04-1.61-4.04-1.61c-.55-1.4-1.34-1.77-1.34-1.77c-1.1-.75.08-.74.08-.74c1.22.09 1.86 1.25 1.86 1.25c1.08 1.86 2.84 1.32 3.54 1.01c.11-.79.42-1.32.76-1.62c-2.66-.3-5.47-1.33-5.47-5.93c0-1.31.47-2.38 1.24-3.22c-.12-.3-.54-1.52.12-3.17c0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23c.66 1.65.24 2.87.12 3.17c.77.84 1.24 1.91 1.24 3.22c0 4.61-2.81 5.62-5.49 5.92c.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
            </Link>
            {/* Buy Me a Coffee */}
            <Link
              href="https://www.buymeacoffee.com/rit3zh"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md
           text-zinc-700 hover:text-zinc-900
           dark:text-zinc-300 dark:hover:text-white
           hover:bg-zinc-100 dark:hover:bg-zinc-800
           transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="m20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379c-.197-.069-.42-.098-.57-.241c-.152-.143-.196-.366-.231-.572c-.065-.378-.125-.756-.192-1.133c-.057-.325-.102-.69-.25-.987c-.195-.4-.597-.634-.996-.788a6 6 0 0 0-.626-.194c-1-.263-2.05-.36-3.077-.416a26 26 0 0 0-3.7.062c-.915.083-1.88.184-2.75.5c-.318.116-.646.256-.888.501c-.297.302-.393.77-.177 1.146c.154.267.415.456.692.58c.36.162.737.284 1.123.366c1.075.238 2.189.331 3.287.37q1.829.074 3.65-.118q.449-.05.896-.119c.352-.054.578-.513.474-.834c-.124-.383-.457-.531-.834-.473c-.466.074-.96.108-1.382.146q-1.767.12-3.536.006a22 22 0 0 1-1.157-.107c-.086-.01-.18-.025-.258-.036q-.364-.055-.724-.13c-.111-.027-.111-.185 0-.212h.005q.416-.09.838-.147h.002c.131-.009.263-.032.394-.048a25 25 0 0 1 3.426-.12q1.011.029 2.017.144l.228.031q.4.06.798.145c.392.085.895.113 1.07.542c.055.137.08.288.111.431l.319 1.484a.237.237 0 0 1-.199.284h-.003l-.112.015a37 37 0 0 1-4.743.295a37 37 0 0 1-4.699-.304c-.14-.017-.293-.042-.417-.06c-.326-.048-.649-.108-.973-.161c-.393-.065-.768-.032-1.123.161c-.29.16-.527.404-.675.701c-.154.316-.199.66-.267 1c-.069.34-.176.707-.135 1.056c.087.753.613 1.365 1.37 1.502a39.7 39.7 0 0 0 11.343.376a.483.483 0 0 1 .535.53l-.071.697l-1.018 9.907c-.041.41-.047.832-.125 1.237c-.122.637-.553 1.028-1.182 1.171q-.868.197-1.756.205c-.656.004-1.31-.025-1.966-.022c-.699.004-1.556-.06-2.095-.58c-.475-.458-.54-1.174-.605-1.793l-.731-7.013l-.322-3.094c-.037-.351-.286-.695-.678-.678c-.336.015-.718.3-.678.679l.228 2.185l.949 9.112c.147 1.344 1.174 2.068 2.446 2.272c.742.12 1.503.144 2.257.156c.966.016 1.942.053 2.892-.122c1.408-.258 2.465-1.198 2.616-2.657l1.024-9.995l.215-2.087a.48.48 0 0 1 .39-.426c.402-.078.787-.212 1.074-.518c.455-.488.546-1.124.385-1.766z" />
              </svg>
            </Link>
          </div>
        </div>
      ),
    },
  ],
});
