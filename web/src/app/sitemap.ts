import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { siteData } from '@/data/notesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vtuwise.in';
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
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
    }
  ];

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
        // Scheme level (e.g., /first-year/2022-scheme)
        urls.push({
          url: `${baseUrl}/${branchKey}/${scheme.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
        
        for (const cycle of scheme.cycles) {
          // Cycle level (e.g., /first-year/2022-scheme/physics-cycle)
          urls.push({
            url: `${baseUrl}/${branchKey}/${scheme.slug}/${cycle.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });

          for (const subject of cycle.subjects) {
            // Subject level (e.g., /first-year/2022-scheme/physics-cycle/applied-physics-...)
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
