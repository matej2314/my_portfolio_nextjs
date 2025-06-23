import Intro from "@/components/Intro"
import { generatePageMetadata } from "@/lib/generatePageMetadata"

export async function generateMetadata() {

  return generatePageMetadata('page');
}

export default function IntroPage() {
  return (
    <main className="max-w-screen h-screen flex flex-col gap-2 justify-center font-mono bg-black">
      <Intro />
    </main>
  )
}
