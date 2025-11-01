import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import AboutTemplate from "@/templates/About";

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY });
  const { aboutImage, aboutText, aboutTech } = data ?? {};

  console.log('data: ', data);
  return <AboutTemplate aboutImage={aboutImage} aboutText={aboutText} aboutTech={aboutTech} />;
}
