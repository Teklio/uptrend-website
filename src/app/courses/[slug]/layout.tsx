import type { Metadata } from "next";
import { getCourse } from "@/services/course.service";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const course = await getCourse(slug);
    return {
      title: course.name,
      description:
        course.description ||
        `${course.name} — Instructor: ${course.mentorName ?? "UPtrend"}. Total Fee: ₹${course.price.toLocaleString("en-IN")}.`,
      openGraph: {
        title: `${course.name} | UPtrend Financial Academy`,
        description: course.description ?? undefined,
        images: course.primaryImageUrl ? [{ url: course.primaryImageUrl, width: 1200, height: 630, alt: course.name }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${course.name} | UPtrend`,
        description: course.description ?? undefined,
      },
    };
  } catch {
    return {
      title: "Course Details",
      description: "Explore institutional market trading programs with UPtrend Financial Academy.",
    };
  }
}

export default function CourseDetailLayout({ children }: Props) {
  return <>{children}</>;
}
