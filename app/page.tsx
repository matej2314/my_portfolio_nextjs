import Intro from "@/components/Intro"
import { generatePageMetadata } from "@/lib/generatePageMetadata"
import { kanit } from "@/fonts/kanit"

export async function generateMetadata() {

  return generatePageMetadata('page');
}

export default function IntroPage() {
  return (
    <main className={`max-w-screen h-screen flex flex-col gap-2 justify-center bg-black`}>
      <Intro />
    </main>
  )
}
