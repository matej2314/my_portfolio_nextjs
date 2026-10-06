import { getLocale, getTranslations } from "next-intl/server";

import { getCvHref } from "@/lib/utils/getCvHref";
import { defaultData } from "@/lib/defaultData";

import HeroTitle from "./components/HeroTitle";
import HomeSubHeader from "./components/HomeSubHeader";
import HeroCtas from "./components/HeroCtas";
import HeroScrollHint from "./components/HeroScrollHint";
import HeroEyebrow from "./components/HeroEyebrow";
import HeroMetaRail from "./components/HeroMetaRail";

export default async function BaseSection() {
  const t = await getTranslations("homePage");
  const locale = await getLocale();
  const { cvHref, cvFileName } = getCvHref(locale);
  const stack = defaultData.baseSectionSubHeader.content.join(" · ");
  const availableForWork = defaultData.baseSectionSubHeader.availableForWork;
  return (
    <section
      id="baseSection"
      tabIndex={-1}
      className="relative z-[1] flex min-h-0 w-full flex-1 flex-col justify-center"
    >
      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-12 px-5 pb-16 pt-20 xl:grid-cols-12 xl:gap-10 xl:px-10 xl:pb-20 xl:pt-28">
        <div className="flex flex-col items-start xl:col-span-7">
          {availableForWork && <HeroEyebrow label={t("baseSection.eyebrow")} />}
          <div className="mt-5 xl:mt-5">
            <HeroTitle title={t("baseSection.title")} />
          </div>
          <div className="mt-5">
            <HomeSubHeader />
          </div>
          <p className="mt-5 max-w-[58ch] text-pretty text-base leading-relaxed text-ink-1 xl:text-lg xl:leading-[1.65]">
            {t("baseSection.baseDescription")}
          </p>
          <HeroCtas cvHref={cvHref} cvFileName={cvFileName} />
        </div>

        <div className="xl:col-span-5 xl:flex xl:justify-end">
          <HeroMetaRail
            location={t("baseSection.metaLocation")}
            stack={stack}
            year={t("baseSection.metaYear")}
          />
        </div>
      </div>

      <HeroScrollHint />
    </section>
  );
}
