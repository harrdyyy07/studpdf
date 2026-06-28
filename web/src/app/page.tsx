import HeroSlider from "@/components/HeroSlider";
import BranchCard from "@/components/BranchCard";
import HomeDisclaimer from "@/components/HomeDisclaimer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const branches = [
    {
      title: "First Year",
      slug: "firstyear",
      badge: "P & C Cycle",
      bg: "linear-gradient(135deg, #0f0c29 0%, #302b11 100%)",
      thumbText: "FIRST YEAR",
      secondaryText: "1 & 2 Sem"
    },
    {
      title: "CSE-ISE",
      slug: "cse",
      badge: "CSE-ISE",
      bg: "linear-gradient(135deg, #2b1055 0%, #7597de 100%)",
      thumbText: "CSE / ISE"
    },
    {
      title: "ECE",
      slug: "ece",
      badge: "ECE",
      bg: "linear-gradient(135deg, #1a1a2e 0%, #c0a080 100%)",
      thumbText: "ECE"
    },
    {
      title: "EEE",
      slug: "eee",
      badge: "EEE",
      bg: "linear-gradient(135deg, #0f2027 0%, #b0bac3 100%)",
      thumbText: "EEE"
    },
    {
      title: "Mechanical",
      slug: "mech",
      badge: "MECH",
      bg: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
      thumbText: "MECH"
    },
    {
      title: "Civil",
      slug: "civil",
      badge: "CIVIL",
      bg: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
      thumbText: "CIVIL"
    },
    {
      title: "AI & ML",
      slug: "aiml",
      badge: "AIML",
      bg: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
      thumbText: "AI / ML"
    }
  ];

  return (
    <>
      <h1 className="sr-only">VTU Notes, Previous Question Papers & Study Materials | vtuwise</h1>
      <HeroSlider />
      


      <section id="branches" className="branches">
        <div className="container">
          <h2 className="section-title">Select Your Branch</h2>
          <div className="branch-grid">
            {branches.map((branch) => (
              <BranchCard key={branch.slug} {...branch} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <HomeDisclaimer />
    </>
  );
}
