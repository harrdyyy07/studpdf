import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { siteData } from '@/data/notesData';
import { blogPosts } from '@/data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vtuwise.in';
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Main Tools & Calculators
    {
      url: `${baseUrl}/student-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/student-tools/vtu-results`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cgpa-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sgpa-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/previous-year-question-papers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/student-tools/aptitude-test`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/student-tools/code-practice`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/student-tools/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/student-tools/resume-builder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/student-tools/typing-test`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Community & Service
    {
      url: `${baseUrl}/upload`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal & Policy
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/legal/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/legal/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Blog Index
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Blog Posts
  for (const post of blogPosts) {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Branch & Subject Notes
  for (const [branchKey, branchData] of Object.entries(siteData)) {
    // 1. Branch level (e.g., /cse)
    urls.push({
      url: `${baseUrl}/${branchKey}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // 2. Regular Semesters
    if (branchData.semesters) {
      for (const sem of branchData.semesters) {
        // Semester level (e.g., /cse/3)
        urls.push({
          url: `${baseUrl}/${branchKey}/${sem.sem}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });

        // Subject level (e.g., /cse/3/mathematics-for-computer-science-...)
        for (const subject of sem.subjects) {
          urls.push({
            url: `${baseUrl}/${branchKey}/${sem.sem}/${subject.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      }
    }

    // 3. First Year Schemes
    if (branchData.schemes) {
      for (const scheme of branchData.schemes) {
        // Scheme level (e.g., /firstyear/25-scheme)
        urls.push({
          url: `${baseUrl}/${branchKey}/${scheme.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
        
        for (const cycle of scheme.cycles) {
          // Cycle level (e.g., /firstyear/25-scheme/p-cycle)
          urls.push({
            url: `${baseUrl}/${branchKey}/${scheme.slug}/${cycle.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });

          for (const subject of cycle.subjects) {
            // Subject level (e.g., /firstyear/25-scheme/p-cycle/calculus-...)
            urls.push({
              url: `${baseUrl}/${branchKey}/${scheme.slug}/${cycle.slug}/${subject.slug}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        }
      }
    }
  }

  return urls;
}
