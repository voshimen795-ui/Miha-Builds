import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import SystemPage from "@/components/system-page";
import { content, SYSTEM_SLUGS, type SystemSlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SYSTEM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const it = content.sr.systems.items[slug as SystemSlug];
  if (!it) return {};
  return {
    title: `${it.name} · Miha Builds`,
    description: `${it.problem} ${it.result}.`,
    alternates: { canonical: `/sistemi/${slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!SYSTEM_SLUGS.includes(slug as SystemSlug)) notFound();
  return (
    <>
      <Nav />
      <main>
        <SystemPage slug={slug as SystemSlug} />
      </main>
    </>
  );
}
