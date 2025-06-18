import Intro from "@/components/Intro"

export const metadata = {
  title: 'msliwowski.net | WebDev, SEO, Security',
  description: 'Webdev, SEO, Security'
}

export default function IntroPage() {
  return (
    <main className="max-w-screen h-screen flex flex-col gap-2 justify-center font-mono bg-black">
      <Intro />
    </main>
  )
}
