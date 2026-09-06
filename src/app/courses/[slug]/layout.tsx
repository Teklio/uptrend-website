import type { Metadata } from "next";
import { COURSES_DATA } from "@/data/courses";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Details",
      description: "Explore institutional market trading programs with UPtrend Financial Academy.",
    };
  }

  return {
    title: `${course.title}`,
    description: `${course.shortDescription} Instructor: ${course.instructor}. Language: ${course.language}. Total Fee: ₹${course.price.toLocaleString("en-IN")}.`,
    openGraph: {
      title: `${course.title} | UPtrend Financial Academy`,
      description: course.shortDescription,
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | UPtrend`,
      description: course.shortDescription,
    },
  };
}

export default function CourseDetailLayout({ children }: Props) {
  return <>{children}</>;
}
