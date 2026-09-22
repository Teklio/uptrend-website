import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrendfinacademy.com";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/v1";

async function fetchCourseData(slug: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${apiUrl}/courses/${slug}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Return null if API is not available
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseData(slug);

  if (course) {
    const title = `${course.name} | UPtrend Trading Academy`;
    const description =
      course.description ||
      `Enroll in ${course.name} at UPtrend Trading Academy Perinthalmanna. Master institutional Smart Money Concepts (SMC), order flow, and risk management with live mentorship.`;
    const image = course.primaryImageUrl || `${siteUrl}/course-swing-trading.jpg`;

    return {
      title,
      description,
      keywords: [
        course.name,
        "uptrend trading academy",
        "trading academy perinthalmanna",
        "Uptrend Trading academy perinthalmanna",
        "Uptrendfinacademy",
        "uptrendacademy",
        "stock market course perinthalmanna",
        "smc trading course kerala",
        `${course.name} malayalam`,
        "nikhil mathew course",
      ],
      alternates: {
        canonical: `${siteUrl}/courses/${slug}`,
      },
      openGraph: {
        type: "website",
        locale: "en_IN",
        url: `${siteUrl}/courses/${slug}`,
        title,
        description,
        siteName: "UPtrend Financial Academy",
        images: [{ url: image, alt: course.name }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  }

  return {
    title: "Trading Course Details | UPtrend Trading Academy Perinthalmanna",
    description:
      "Master institutional trading strategies, SMC order flow, and capital preservation protocols at UPtrend Trading Academy Perinthalmanna.",
    alternates: {
      canonical: `${siteUrl}/courses/${slug}`,
    },
  };
}

export default async function CourseDetailLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const course = await fetchCourseData(slug);

  const courseJsonLd = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.name,
        description: course.description || course.name,
        provider: {
          "@type": "EducationalOrganization",
          name: "UPtrend Financial Academy",
          sameAs: siteUrl,
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "INR",
          category: "Paid",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/courses/${slug}`,
        },
      }
    : null;

  return (
    <>
      {courseJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
