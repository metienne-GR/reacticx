import { source } from "#/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  PageLastUpdate,
} from "fumadocs-ui/page";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import { TOCItemType } from "fumadocs-core/toc";
import { CopyMarkdownButton } from "@/components/copy-markdown-button";
import {
  PreviewClient,
  PreviewComment,
} from "@/components/docs/preview-client";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { ComponentSource } from "@/components/docs/component-source";
import { ExampleComponentSource } from "@/components/docs/example-component-source";
import { AutoTypeTable } from "@/components/docs/auto-type";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug) as any;
  const lastModifiedTime = page?.data.lastModified;
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      footer={{ enabled: false }}
      tableOfContent={{
        enabled: true,
        style: "clerk",
        single: true,
      }}
      toc={page.data.toc as TOCItemType[]}
    >
      <DocsTitle className="ml-8 font-semibold text-4xl tracking-tighter mb-0">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="ml-8 text-xl tracking-tighter mb-0">
        {page.data.description}
      </DocsDescription>

      {lastModifiedTime && (
        <div className="ml-8">
          <PageLastUpdate date={lastModifiedTime} />
        </div>
      )}

      <div className="ml-8 flex items-center gap-4 mt-0">
        <EditOnGitHub
          className="border-0 text-black dark:text-white [&_svg]:text-black dark:[&_svg]:text-white"
          href={`https://github.com/rit3zh/reacticx/tree/main/docs/content/docs/${params.slug ? `${params.slug.join("/")}.mdx` : "index.mdx"}`}
        />
        <CopyMarkdownButton
          markdownUrl={`/llms.mdx/${params.slug ? params.slug.join("/") : ""}`}
        />
      </div>
      <DocsBody className="ml-8">
        <MDX
          components={{
            ...defaultMdxComponents,
            ...TabsComponents,
            a: createRelativeLink(source, page) as any,
            PreviewClient,
            PreviewComment,
            ComponentSource,
            ExampleComponentSource,
            AutoTypeTable,
            Steps,
            Step,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
