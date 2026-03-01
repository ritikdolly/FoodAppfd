import { AboutHero } from "../../components/about/AboutHero";
import { OurStory } from "../../components/about/OurStory";
import { MeetOwner } from "../../components/about/MeetOwner";
import { LocationContact } from "../../components/about/LocationContact";
import { WhyChooseUs } from "../../components/about/WhyChooseUs";
import { DeveloperSection } from "../../components/about/DeveloperSection";
import { AboutCta } from "../../components/about/AboutCta";

export const AboutPage = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <OurStory />
      <MeetOwner />
      <LocationContact />
      <WhyChooseUs />
      <DeveloperSection />
      <AboutCta />
    </div>
  );
};
