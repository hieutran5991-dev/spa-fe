import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ThanksContent from "@/components/ThanksContent";
import Layout from "@/components/layout/Layout";
import { getListSpa } from "@/api/common";
import "@/css/booking.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("thanks");

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ThanksPage() {
  const spaLocations = await getListSpa();

  return (
    <Layout className="thank-container" spaLocations={spaLocations?.data || []}>
      <ThanksContent />
    </Layout>
  );
}
