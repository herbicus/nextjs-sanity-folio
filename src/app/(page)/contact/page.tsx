import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import ContactTemplate from "@/templates/Contact";

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: CONTACT_QUERY });
  const { contactInfo, contactImage } = data ?? {};
  return <ContactTemplate contactInfo={contactInfo} contactImage={contactImage} />;
}
