export interface Module {
  id: number;
  name: string;
  desc: string;
  link: string;
  type: string;
}

export interface Subject {
  name: string;
  code: string;
  credits: string;
  slug: string;
  modules: Module[];
}

export interface Semester {
  sem: number;
  subjects: Subject[];
}

export interface Cycle {
  name: string;
  slug: string;
  subjects: Subject[];
}

export interface Scheme {
  name: string;
  slug: string;
  cycles: Cycle[];
}

export interface BranchData {
  title: string;
  semesters?: Semester[];
  schemes?: Scheme[];
}

export interface SiteData {
  [key: string]: BranchData;
}

export const siteData: SiteData = {
    firstyear: {
        title: "First Year",
        schemes: [
            {
                name: "25 Scheme",
                slug: "25-scheme",
                cycles: [
                    { name: "P-Cycle vtu notes (25 Scheme)", slug: "p-cycle", subjects: [
                         {
                                name: "Calculus and Linear Algebra: CSE Stream - 1BMATS101",
                                code: "1BMATS101",
                                credits: "4 CR",
                                slug: "calculus-and-linear-algebra-cse-stream-1bmats101-vtu-notes",
                                modules: [
                                    {
                                        id: 1,
                                        name: "Module-1: Calculus ",
                                        desc: "1bmats101 module 1 notes",
                                        link: "https://drive.google.com/file/d/1gIMrj7TtAZd7XBaolnLOfSSZepf0mKtO/view?usp=drive_link",
                                        type: "pdf"
                                    }
                                ]
                            },
                            {
                                name: "PYTHON PROGRAMMING  - 1BPLC105B/205B ",
                                code: "1BPLC105B/205B",
                                credits: "4 CR",
                                slug: "python-programming-1BPLC105B-205B-vtu-notes",
                                modules: [
                                    {
                                        id: 0,
                                        name: "PYTHON PROGRAMMING 1BPLC105B/205B syllabus",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B syllabus",
                                        link: "https://drive.google.com/file/d/1E8FUG_qppuTXR5FVAn7H4anBfGS6KFgv/view?usp=drive_link",
                                        type: "syllabus"
                                    },
                                    {
                                        id: 1,
                                        name: "Module-1",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B module 1 notes",
                                        link: "https://drive.google.com/file/d/1epECbODaSmR9gEHsws2j4eeLONHXzOLS/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 2,
                                        name: "Module-2",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B module 2 notes",
                                        link: "https://drive.google.com/file/d/1J9VlWGJq5veC4hJ8kSP1hJvl1zImBwmr/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 3,
                                        name: "Module-3",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B module 3 notes",
                                        link: "https://drive.google.com/file/d/14FRqf74zIgXAn5fNw2WGVgQ45U2CKiW5/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 4,
                                        name: "Module-4",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B module 4 notes",
                                        link: "https://drive.google.com/file/d/1MnA4EV2T39rRC_8svy82DghG7xkl3BAE/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 5,
                                        name: "Module-5",
                                        desc: "PYTHON PROGRAMMING 1BPLC105B/205B module 5 notes",
                                        link: "https://drive.google.com/file/d/1UcGLvryyeyeHNtzOumRFCmoVjs2gA0kh/view?usp=drive_link",
                                        type: "notes"
                                    }
                                ]
                            },
                            {
                                name: "Quantum Physics and Applications (CSE stream)",
                                code: "1BPHYS102/202 ",
                                credits: "4 CR",
                                slug: "quantum-physics-and-applications-1bphys102-202-vtu-notes",
                                modules: [
                                    {
                                        id: 0,
                                        name: "Quantum Physics and Applications (CSE stream) syllabus",
                                        desc: "Quantum Physics and Applications (CSE stream)-1bphys102/202 syllabus",
                                        link: "https://drive.google.com/file/d/1C6wFfbfhcCdVjYukXt8QQB9zdXmTORem/view?usp=drive_link",
                                        type: "syllabus"
                                    },
                                    {
                                        id: 1,
                                        name: "1bphys102/202 complete notes",
                                        desc: "complete notes for Quantum Physics and Applications (CSE stream)-1bphys102/202",
                                        link: "https://drive.google.com/file/d/1Zdh9Cs6YwfhL4wfT7rlcM3_cKGCauBLF/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 1,
                                        name: "Module-1 Quantum Mechanics",
                                        desc: "Quantum Physics and Applications (CSE stream)-1bphys102/202 module 1 notes",
                                        link: "https://drive.google.com/file/d/1OShYVacx96b7ej4puQ2hybp-7QQ6XSzG/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 2,
                                        name: "Module-2 Electrical Properties of Metals and Semiconductors",
                                        desc: "Quantum Physics and Applications (CSE stream)-1bphys102/202 module 2 notes",
                                        link: "https://drive.google.com/file/d/1_Nf_uYuqn2fr7IAfTf1dzIuVPPfIxUhW/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 3,
                                        name: "Module-3 Superconductivity",
                                        desc: "Quantum Physics and Applications (CSE stream)-1bphys102/202 module 3 notes",
                                        link: "https://drive.google.com/file/d/1o8ah9n27GWzTjhlphqnlYq_2o4kTsN2R/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 4,
                                        name: "Module-4 Photonics",
                                        desc: "Quantum Physics and Applications (CSE stream)-1bphys102/202 module 4 notes",
                                        link: "https://drive.google.com/file/d/1ufNjm04Vmx80rzR17xTOY1K9wgc3Hrnh/view?usp=drive_link",
                                        type: "notes"
                                    },
                                    {
                                        id: 5,
                                        name: "Module-5 Quantum Computing",
                                        desc: "",
                                        link: "",
                                        type: "notes"
                                    }
                                ]
                            },
                    ] },
                    { name: "C-Cycle vtu notes (25 Scheme)", slug: "c-cycle", subjects: [] }
                ]
            },
            {
                name: "22 Scheme",
                slug: "22-scheme",
                cycles: [
                    {
                        name: "P-Cycle vtu notes (22 Scheme)",
                        slug: "p-cycle",
                        subjects: [
                            {
                                name: "Mathematics-I for CSE",
                                code: "BMATS101",
                                credits: "4 CR",
                                slug: "mathematics-i-for-cse-bmats101",
                                modules: [{
                                        id: 1,
                                        name: "Module-1: Calculus ",
                                        desc: "bmats101 module 1 notes",
                                        link: "https://drive.google.com/file/d/1gIMrj7TtAZd7XBaolnLOfSSZepf0mKtO/view?usp=drive_link",
                                        type: "pdf"
                                    },
                                    {
                                        id: 2,
                                        name: "Module-2: Series Expansion and Multivariable Calculus ",
                                        desc: "bmats101 module 2 notes",
                                        link: "https://drive.google.com/file/d/10ma7Sd3fmY7MacqrfCO0KUS4bn4sDV1p/view?usp=drive_link",
                                        type: "pdf"
                                    },
                                    {
                                        id: 3,
                                        name: "Module-3:  Ordinary Differential Equations (ODEs) of First Order  ",
                                        desc: "bmats101 module 3 notes",
                                        link: "https://drive.google.com/file/d/1gh1rd0iVizvWSra7IZ_NikdUbxjteHmw/view?usp=drive_link",
                                        type: "pdf"
                                    },
                                    {
                                        id: 4,
                                        name: "Module-4:  Modular Arithmetic ",
                                        desc: "bmats101 module 4 notes",
                                        link: "https://drive.google.com/file/d/17h3VjhLq6OZ72OFrav-8s6EVEfriBjLO/view?usp=drive_link",
                                        type: "pdf"
                                    },
                                    {
                                        id: 5,
                                        name: "Module-5:  Linear Algebra   ",
                                        desc: "bmats101 module 5 notes",
                                        link: "https://drive.google.com/file/d/1nyNf7Q3tSoYfWu3ffy6ziwQwxkogeo8u/view?usp=drive_link",
                                        type: "pdf"
                                    }]
                            },
                            {
                                name: "Mathematics-II for CSE",
                                code: "BMATS201",
                                credits: "4 CR",
                                slug: "mathematics-ii-for-cse-bmats201",
                                modules: []
                            },
                            {
                                name: "Principles of Programming using C",
                                code: "BPOPS103",
                                credits: "4 CR",
                                slug: "principles-of-programming-using-c-bpops103",
                                modules: []
                            },
                            {
                                name: "Applied Physics for CSE",
                                code: "BPHYS102",
                                credits: "4 CR",
                                slug: "applied-physics-for-cse-bphys102",
                                modules: []
                            },
                            {
                                name: "Chemistry for CSE",
                                code: "BCHES202",
                                credits: "4 CR",
                                slug: "chemistry-for-cse-bches202",
                                modules: []
                            },
                            {
                                name: "Intro to Electrical Engineering",
                                code: "BESCK104B",
                                credits: "3 CR",
                                slug: "intro-to-electrical-engineering-besck104b",
                                modules: []
                            },
                            {
                                name: "Intro to Electronics & Communication",
                                code: "BESCK104C",
                                credits: "3 CR",
                                slug: "intro-to-electronics-communication-besck104c",
                                modules: []
                            },
                            {
                                name: "Intro to Python Programming",
                                code: "BPLCK105B",
                                credits: "3 CR",
                                slug: "intro-to-python-programming-bplck105b",
                                modules: []
                            },
                            {
                                name: "Intro to Cyber Security",
                                code: "BETCK105I",
                                credits: "3 CR",
                                slug: "intro-to-cyber-security-betck105i",
                                modules: []
                            },
                            {
                                name: "Innovation & Design Thinking",
                                code: "BIDTK258",
                                credits: "1 CR",
                                slug: "innovation-design-thinking-bidtk258",
                                modules: []
                            },
                            {
                                name: "Communicative English",
                                code: "BENGK206",
                                credits: "1 CR",
                                slug: "communicative-english-bengk206",
                                modules: []
                            },
                            {
                                name: "Indian Constitution",
                                code: "BICOK207",
                                credits: "1 CR",
                                slug: "indian-constitution-bicok207",
                                modules: []
                            },
                            {
                                name: "Professional Writing Skills in English",
                                code: "BPWSK106",
                                credits: "1 CR",
                                slug: "professional-writing-skills-in-english-bpwsk106",
                                modules: []
                            },
                            {
                                name: "Samskrutika Kannada",
                                code: "BKSKK107",
                                credits: "1 CR",
                                slug: "samskrutika-kannada-bkskk107",
                                modules: []
                            },
                            {
                                name: "Scientific Foundations for Health",
                                code: "BSFHK158",
                                credits: "1 CR",
                                slug: "scientific-foundations-for-health-bsfhk158",
                                modules: []
                            }
                        ]
                    },
                    {
                        name: "C-Cycle",
                        slug: "c-cycle",
                        subjects: []
                    }
                ]
            }
        ]
    },
    cse: {
        title: "Computer Science & Engineering",
        semesters: [
            {
                sem: 3,
                subjects: [
                    {
                        name: "Mathematics for Computer Science", code: "BCS301", credits: "4 CR", slug: "mathematics-for-computer-science-mcs-bcs301-vtu-notes", modules: [
                            { id: 1, name: "All Modules Notes", desc: "Comprehensive notes for All Modules", link: "https://drive.google.com/file/d/1Q4T-9zN-Ga3cmZV3yVnMNwiPZVMFmk7q/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 1: Handwritten Notes", desc: "Handwritten notes for Module 1", link: "https://drive.google.com/file/d/1fA4g7ONqA4ew8R0Pd7fvxcJe-mqeADeG/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 2: Handwritten Notes", desc: "Handwritten notes for Module 2", link: "https://drive.google.com/file/d/1bQz7WA8pM_6lYGlbf-c3PdI70cfmgxIK/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 3: Handwritten Notes", desc: "Handwritten notes for Module 3", link: "https://drive.google.com/file/d/1HLdUCguuucYpdfwXrq8Gifz1o-jFf3Id/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 4: Handwritten Notes", desc: "Handwritten notes for Module 4", link: "https://drive.google.com/file/d/1qPhVoeHmQp-5lqD5bBgJAl48AEzyLsgI/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 5: Handwritten Notes", desc: "Handwritten notes for Module 5", link: "https://drive.google.com/file/d/1c5UUnChePggLapdlnJrSZuUo6oJJhEho/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Dec/Jan 2024 Previous year question paper", desc: "Dec/Jan 2024 Previous year question paper", link: "https://drive.google.com/file/d/1wGMuFz7PX6wwW8djyeETdMwONtO64wAI/view?usp=drive_link", type: "PYQP" },
                            { id: 8, name: "Dec/Jan 2025 Previous year question paper", desc: "Dec/Jan 2025 Previous year question paper", link: "https://drive.google.com/file/d/1xaGa54Cm1sO0YE9tzcETc1m8PUy60gjK/view?usp=drive_link", type: "PYQP" },
                            { id: 9, name: "June/July 2025 Previous year question paper", desc: "June/July 2025 Previous year question paper", link: "https://drive.google.com/file/d/1t969zXpXeJjYkqoXcUcFZHUkAt6FtTew/view?usp=drive_link", type: "PYQP" },
                            { id: 10, name: "June/July 2025 supplementary question paper", desc: "June/July 2025 supplementary question paper", link: "https://drive.google.com/file/d/1HdjjgIAQeHb7iIPiL6MfDDCYHGgaP8rb/view?usp=drive_link", type: "PYQP" },
                            { id: 11, name: "Model question paper-1", desc: "Model question paper-1", link: "https://drive.google.com/file/d/1KfIp3GoNWjSyuwU_lmTVaxHK6rlXucLW/view?usp=drive_link", type: "MQP" },
                            { id: 12, name: "Model question paper-2", desc: "Model question paper-2", link: "https://drive.google.com/file/d/1oeC6ZdR42BM4fGig2WzoQiqmMM-pAvvN/view?usp=drive_link", type: "MQP" },
                            { id: 13, name: "Model question paper-2 Solution", desc: "Model question paper-2 Solution", link: "https://drive.google.com/file/d/1TPzmESpFlE-CKvbDOXo6yBUzGEl6HH9B/view?usp=drive_link", type: "MQP" },
                        ]
                    },
                    { name: "Digital Design & Computer Organization", code: "BCS302", credits: "4 CR", slug: "digital-design-and-computer-organization-ddco-bcs302-vtu-notes", modules: [
                        { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1NnQ9lT6t4kXI2Z16-gE1VnnDrOtzY40G/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1A3WjKCOVAnRlMVD8CfQCWCu1kBEWssGq/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1LFoSffBOFTTmF6yKhqK62msyoR7WDFDc/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1yikxmdK8xOoNGkNZvhKnUYp1Lg7R8rpw/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1aN-C4Pzdk5YZGBcYvO7AupxWmxm6xcHa/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Dec/Jan 2024 Scheme of Evaluation", desc: "Dec/Jan 2024 Scheme of Evaluation", link: "https://drive.google.com/file/d/1uGDJSB6NP2rT_VgCCjYT8N4Iic_wqNvm/view?usp=drive_link", type: "scheme" },
                        { id: 7, name: "June/July 2024 Scheme of Evaluation", desc: "June/July 2024 Scheme of Evaluation", link: "https://drive.google.com/file/d/1TjBjQeiOO1yYm_cEPtmkKV1_ifyCYmoV/view?usp=drive_link", type: "scheme" },
                        { id: 8, name: "Dec/Jan 2024 Scheme of Evaluation", desc: "Dec/Jan 2025 Previous year Question Paper", link: "https://drive.google.com/file/d/1F0VekAkiNSU2RHBV-R3DB8FqFWYick86/view?usp=drive_link", type: "PYQP" },
                        { id: 9, name: "June/July 2024 Supplementary Exam Question Paper", desc: "June/July 2024 Supplementary Exam Question Paper", link: "https://drive.google.com/file/d/1FChUBMTXqA3YVvJaL4Ll6Jqa4GFK11HY/view?usp=drive_link", type: "PYQP" },
                        { id: 10, name: "Model question paper-1 Solutions", desc: "Model question paper-1 Solutions", link: "https://drive.google.com/file/d/1tDhglDUMyrv-ozqEc28rnpAynJv4dIVt/view?usp=drive_link", type: "MQP" },
                        { id: 11, name: "Model question paper-2", desc: "Model question paper-2", link: "https://drive.google.com/file/d/1Xet_pdZT06JUUVDwhf-JWKtHrkmGUls6/view?usp=drive_link", type: "MQP" },
                        { id: 12, name: "Model question paper-3", desc: "Model question paper-3", link: "https://drive.google.com/file/d/1ha2QbSa--TtQ9sJ4wbzXodBdAC_zk9E1/view?usp=drive_link", type: "MQP" },


                    ]
                },
                    { name: "Operating Systems", code: "BCS303", credits: "4 CR", slug: "operating-systems-os-bcs303-vtu-notes", modules: [
                       { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1kvrfpZ3va0-1BDIwzy2nkwn_L_U-SE8T/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1GP0U2AnP3Z485DKko3U6jEzWp7sTAps0/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1Rf6_UKjFcA_wpmgizw--V8bXr6gVh0Uj/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1LOyMfqV9eQ7NHOe1hDd-em4LFBmEpdIu/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1QdoEepjndnqx89tIhTB6Zgz-VgUW2osb/view?usp=drive_link", type: "Notes" }  
                    ] },
                    { name: "Data Structures and Applications", code: "BCS304", credits: "4 CR", slug: "data-structures-and-applications-dsa-bcs304-vtu-notes", modules: [
                          { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1O-CkvuE_RDFIgHrlF6yM9CY4QHM2dW-I/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1v6qwhxqsLpItdpTmWDCX47f0X0Ew71dc/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/10md1V4iAMiAOtS6sW-URyvO_C1_EFudP/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/16Wpd_LgC9RqN3oZB48hJTnBfavK7brIC/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1UJFlJiP8CxEGrik4Tdm_6aKiErM68Z6b/view?usp=drive_link", type: "Notes" }
                    ] },
                    { name: "Data Structures Lab", code: "BCSL305", credits: "1 CR", slug: "data-structures-lab-dsl-bcsl305-vtu-notes", modules: [
                        { id: 1, name: "BCSL305 data structures lab manual", desc: "BCSL305 data structures lab manual", link: "https://drive.google.com/file/d/1fXO7vclc6c3zUQr9GJMoSrm3gjyr1yX0/view?usp=drive_link", type: "Lab Manual" },
                    ] },
                    { name: "Object Oriented Programming with Java", code: "BCS306A", credits: "3 CR", slug: "object-oriented-programming-with-java-oopj-bcs306a-vtu-notes", modules: [
                        { id: 1, name: "BCS306A complete notes", desc: "Complete notes for BCS306A", link: "https://drive.google.com/file/d/140IPS1GiFhVfrMByskDH-FZ9NeG0s_PA/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1oUrr9B5OB4VieF0o30S1cup_yGLlLBc7/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1EWkWOkaTq2D09Omoa1QhdAH898ZtvXsf/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1_GdcH0Tx7LnPE_gzceLh8i4YZpwp4NDr/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1Nr7Fwtp1xmo_Xl1D-nFfxmfH0AlquzFG/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Text book pdf for oopj bcs306A", desc: "Text book pdf for oopj bcs306A", link: "https://drive.google.com/file/d/1wdB4i2v2IeQTZdfBHDxtESnUEGRAzhqF/view?usp=drive_link", type: "Textbook" }
                    ] },
                    { name: "Object Oriented Programming with C++", code: "BCS306B", credits: "3 CR", slug: "object-oriented-programming-with-c-plus-plus-oopc-bcs306b-vtu-notes", modules: [] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [
                        { id: 1, name: "BSCK307 complete notes", desc: "Complete notes for BSCK307", link: "https://drive.google.com/file/d/1p-LiWAcbwBr7RI-Ovma2THmyoUlfK8RZ/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Data analytics with Excel", code: "BCS358A", credits: "1 CR", slug: "data-analytics-with-excel-dawe-bcs358a-vtu-notes", modules: [] },
                    { name: "R Programming", code: "BCS358B", credits: "1 CR", slug: "r-programming-rp-bcs358b-vtu-notes", modules: [] },
                    { name: "Project Management with Git", code: "BCS358C", credits: "1 CR", slug: "project-management-with-git-pmwg-bcs358c-vtu-notes", modules: [] },
                    { name: "Data Visualization with Python", code: "BCS358D", credits: "1 CR", slug: "data-visualization-with-python-dvwp-bcs358d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Analysis & Design of Algorithms", code: "BCS401", credits: "4 CR", slug: "analysis-and-design-of-algorithms-ada-bcs401-vtu-notes", modules: [
                        { id: 1, name: "BCS401 ada module-1 notes", desc: "BCS401 ada module-1 notes", link: "https://drive.google.com/file/d/1zCWG04FchYYkTQMZju3q_zkvyNmxNgj_/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "BCS401 ada module-2 notes", desc: "BCS401 ada module-2 notes", link: "https://drive.google.com/file/d/185NXHKcdYSdk-YvB-aN91S33NNfq-MEf/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "BCS401 ada module-3 notes", desc: "BCS401 ada module-3 notes", link: "https://drive.google.com/file/d/1PcBdnnlSvCI4GnKs5By5hC6OFMNV6ywL/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "BCS401 ada module-4 notes", desc: "BCS401 ada module-4 notes", link: "https://drive.google.com/file/d/1_40_UD0FO0HWdvXloIBfOw5sMFfgaSZt/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "BCS401 ada module-5 notes", desc: "BCS401 ada module-5 notes", link: "https://drive.google.com/file/d/1v5I4SpPDiT12odu2YqhCUlCFRmjZgeWo/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Microcontrollers", code: "BCS402", credits: "4 CR", slug: "microcontrollers-mc-bcs402-vtu-notes", modules: [
                        { id: 1, name: "BCS402 microcontrollers complete notes", desc: "BCS402 microcontrollers complete notes", link: "https://drive.google.com/file/d/1j875bVkySNX3pBBzOqhbqcNPdYmJaIlH/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Database Management Systems", code: "BCS403", credits: "4 CR", slug: "database-management-systems-dbms-bcs403-vtu-notes", modules: [] },
                    { name: "ADA Lab Manual", code: "BCSL404", credits: "1 CR", slug: "ada-lab-manual-adal-bcsl404-vtu-notes", modules: [
                        { id: 1, name: "BCSL404 ada lab manual", desc: "BCSL404 ada lab manual", link: "https://drive.google.com/file/d/1ep1apfO_U9OLONfdDu8H97ZdQGXHuRQE/view?usp=drive_link", type: "Lab Manual" },
                    ] },
                    { name: "Discrete Mathematical Structures", code: "BCS405A", credits: "3 CR", slug: "discrete-mathematical-structures-dms-bcs405a-vtu-notes", modules: [] },
                    { name: "Graph Theory", code: "BCS405B", credits: "3 CR", slug: "graph-theory-gt-bcs405b-vtu-notes", modules: [
                        { id: 1, name: "BCS405B graph theory complete notes", desc: "BCS405B graph theory complete notes", link: "https://drive.google.com/file/d/1Wj3xnWFjrqUPTiUL92iOHE5Q9l2PvjzV/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Optimization Technique", code: "BCS405C", credits: "3 CR", slug: "optimization-technique-ot-bcs405c-vtu-notes", modules: [] },
                    { name: "Linear Algebra", code: "BCS405D", credits: "3 CR", slug: "linear-algebra-la-bcs405d-vtu-notes", modules: [] },
                    { name: "Biology For Computer Engineers", code: "BBOC407", credits: "3 CR", slug: "biology-for-computer-engineers-bce-bboc407-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Introduction to Biology (notes-1)", desc: "BBOC407 Module-1 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/10QbZqN8HiRyy7V-FjYcRz_ByAZnJOLF1/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Introduction to Biology (notes-2)", desc: "BBOC407 Module-1 Notes by SVIT", link: "https://drive.google.com/file/d/10n_XykmgSqGkcoeMs8ID_H9vyzbpMD8J/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Biomolecules and Their Application (notes-1)", desc: "BBOC407 Module-2 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1yMT6xwiFPfp2DykcWRCHMgs4YqUKtwWu/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 2: Biomolecules and Their Application (notes-2)", desc: "BBOC407 Module-2 Notes by SVIT", link: "https://drive.google.com/file/d/1oVjwS5gc96_V9cbiSRsfB5AooYqGVmv9/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 3: Human Organ Systems and Bio Design (notes-1)", desc: "BBOC407 Module-3 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/17xIU7ouxr49T6Jh0e8ooorYHG7EBHCyV/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Module 3: Human Organ Systems and Bio Design (notes-2)", desc: "BBOC407 Module-3 Notes by SVIT", link: "https://drive.google.com/file/d/14VujeZybDMdawC4_s5b-B6WsvNILcy1e/view?usp=drive_link", type: "Notes" },
                        { id: 7, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-1)", desc: "BBOC407 Module-4 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1neqKOvQ0JG6h_ILTst2PiTsJmHecMXtO/view?usp=drive_link", type: "Notes" },
                        { id: 8, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-2)", desc: "BBOC407 Module-4 Notes by SVIT", link: "https://drive.google.com/file/d/1e81Ew-svatK4-Bo87i0N9v42tz2GbQ0P/view?usp=drive_link", type: "Notes" },
                        { id: 9, name: "Module 5: Trends in bioengineering (notes-1)", desc: "BBOC407 Module-5 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/12fcJyfZwsEDQt16kOS_XY6CIfCF-owhh/view?usp=drive_link", type: "Notes" },
                        { id: 10, name: "Module 5: Trends in bioengineering (notes-2)", desc: "BBOC407 Module-5 Notes by SVIT", link: "https://drive.google.com/file/d/1tDH7DjIKKzcvs6Vd7qnWK-2Lb9pa9wcj/view?usp=drive_link", type: "Notes" },
                        { id: 11, name: "bboc407 QUESTION BANK", desc: "bboc407 QUESTION BANK", link: "https://drive.google.com/file/d/12pDGS24Y3vuPQs6tk5GpHztaMxYZtZhf/view?usp=drive_linkn", type: "question bank" },
                    ] },
                    { name: "Universal Human Values", code: "BUHK408", credits: "1 CR", slug: "universal-human-values-uhv-buhk408-vtu-notes", modules: [] },
                    { name: "Green IT and Sustainability", code: "BCS456A", credits: "1 CR", slug: "green-it-and-sustainability-gits-bcs456a-vtu-notes", modules: [] },
                    { name: "Capacity Planning for IT", code: "BCS456B", credits: "1 CR", slug: "capacity-planning-for-it-cpit-bcs456b-vtu-notes", modules: [] },
                    { name: "UI UX", code: "BCS456C", credits: "1 CR", slug: "ui-ux-uiux-bcs456c-vtu-notes", modules: [] },
                    { name: "Technical Writing using LaTex", code: "BCSL456D", credits: "1 CR", slug: "technical-writing-using-latex-twul-bcsl456d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 5,
                subjects: [
                    { name: "Software Engineering & Project Management", code: "BCS501", credits: "3 CR", slug: "software-engineering-and-project-management-sepm-bcs501-vtu-notes", modules: [
                        { id: 1, name: "BCS501 software engineering and project management complete notes", desc: "BCS501 complete notes by ATMECE", link: "https://drive.google.com/file/d/1kweLU0xAVGQoAR0p6dgP4PWoAk7tXLQ1/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Notes", desc: "bec501 notes for Module 1 by SVIT", link: "https://drive.google.com/file/d/1FJhWuB8vUIatEpb0LTTKTwohzN0LzG1u/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Notes", desc: "bec501 notes for Module 2 by SVIT", link: "https://drive.google.com/file/d/1hAe5kBJTAazGCmuX0OYk2IVb5eKXTjUg/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 3: Notes", desc: "bec501 notes for Module 3 by SVIT", link: "https://drive.google.com/file/d/1p3IjC6-Um1f_ADdeNytvOtcZC5Yh3Ycn/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 4: Notes", desc: "bec501 notes for Module 4 by SVIT", link: "https://drive.google.com/file/d/1VW4ADUOsQ8ueb-uI6Df1evz13qOc3Uob/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Module 5: Notes", desc: "bec501 notes for Module 5 by SVIT", link: "https://drive.google.com/file/d/1_JIqxXqqhI6_Pp7rX4xvLDG2EtmGMd04/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Computer Networks", code: "BCS502", credits: "4 CR", slug: "computer-networks-cn-bcs502-vtu-notes", modules: [] },
                    { name: "Theory of Computation", code: "BCS503", credits: "3 CR", slug: "theory-of-computation-toc-bcs503-vtu-notes", modules: [] },
                    { name: "Web Technology Lab", code: "BCSL504", credits: "1 CR", slug: "web-technology-lab-wtl-bcsl504-vtu-notes", modules: [] },
                    { name: "Computer Graphics", code: "BCS515A", credits: "3 CR", slug: "computer-graphics-cg-bcs515a-vtu-notes", modules: [] },
                    { name: "Artificial Intelligence", code: "BCS515B", credits: "3 CR", slug: "artificial-intelligence-ai-bcs515b-vtu-notes", modules: [] },
                    { name: "Unix System Programming", code: "BCS515C", credits: "3 CR", slug: "unix-system-programming-usp-bcs515c-vtu-notes", modules: [] },
                    { name: "Distributed Systems", code: "BCS515D", credits: "3 CR", slug: "distributed-systems-ds-bcs515d-vtu-notes", modules: [] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [
                        { id: 1, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by Dr. Shantha Kumari K AJIET, Mangalore", link: "https://drive.google.com/file/d/1m6U0KPFjF-SKFEZ7GrG_lzWpEeIAX7kz/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by ATMECE, Mysuru", link: "https://drive.google.com/file/d/1652-Bv4HJ-vhaYN3I7ptpPyDjMdvdGmc/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "RM&IPR brmk557 Textbook pdf", desc: "Textbook pdf for RM&IPR brmk557", link: "https://drive.google.com/file/d/1xuZPGNAiFpSIuXoa4VNaRjgol8Ew5s97/view?usp=drive_link", type: "textbook" },
                        { id: 4, name: "Dec/Jan 2025 question paper Scheme of Evaluation", desc: "Dec/Jan 2025 question paper Scheme of Evaluation", link: "https://drive.google.com/file/d/1wGMuFz7PX6wwW8djyeETdMwONtO64wAI/view?usp=drive_link", type: "Scheme of Evaluation" },
                        { id: 5, name: "PYQP & MQP", desc: "Previous year question paper & Model question paper", link: "https://drive.google.com/file/d/1Tk1MlqDUbOnEXalQQbyXm_2AeBkxVvD9/view?usp=drive_link", type: "PYQP & MQP" },
                    ] },
                    { name: "Environmental Studies", code: "BESK508", credits: "1 CR", slug: "environmental-studies-es-besk508-vtu-notes", modules: [] },
                    { name: "Data Visualization Lab", code: "BAIL504", credits: "1 CR", slug: "data-visualization-lab-dvl-bail504-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 6,
                subjects: [
                    { name: "Cloud Computing (Open Stack/Google)", code: "BCS601", credits: "3 CR", slug: "cloud-computing-cc-bcs601-vtu-notes", modules: [] },
                    { name: "Machine Learning", code: "BCS602", credits: "4 CR", slug: "machine-learning-ml-bcs602-vtu-notes", modules: [] },
                    { name: "Machine Learning Lab", code: "BCSL606", credits: "1 CR", slug: "machine-learning-lab-mll-bcsl606-vtu-notes", modules: [] },
                    { name: "Indian Knowledge System", code: "BIKS609", credits: "1 CR", slug: "indian-knowledge-system-iks-biks609-vtu-notes", modules: [] },
                    { name: "Full Stack Development", code: "BIS601", credits: "3 CR", slug: "full-stack-development-fsd-bis601-vtu-notes", modules: [] },
                    { name: "Blockchain Technology", code: "BCS613A", credits: "3 CR", slug: "blockchain-technology-bt-bcs613a-vtu-notes", modules: [] },
                    { name: "Computer Vision", code: "BCS613B", credits: "3 CR", slug: "computer-vision-cv-bcs613b-vtu-notes", modules: [] },
                    { name: "Compiler Design", code: "BCS613C", credits: "3 CR", slug: "compiler-design-cd-bcs613c-vtu-notes", modules: [] },
                    { name: "Advanced Java", code: "BCS613D", credits: "3 CR", slug: "advanced-java-aj-bcs613d-vtu-notes", modules: [] },
                    { name: "Introduction to Data Structures", code: "BCS654A", credits: "3 CR", slug: "introduction-to-data-structures-ids-bcs654a-vtu-notes", modules: [] },
                    { name: "Fundamentals of Operating Systems", code: "BCS654B", credits: "3 CR", slug: "fundamentals-of-operating-systems-fos-bcs654b-vtu-notes", modules: [] },
                    { name: "Mobile Application Development", code: "BIS654C", credits: "3 CR", slug: "mobile-application-development-mad-bis654c-vtu-notes", modules: [] },
                    { name: "Introduction to Artificial Intelligence", code: "BAI654D", credits: "3 CR", slug: "introduction-to-artificial-intelligence-iai-bai654d-vtu-notes", modules: [] },
                    { name: "Open Elective Subjects Mechanical Engg", code: "", credits: "3 CR", slug: "open-elective-subjects-mechanical-engg-oeme-vtu-notes", modules: [] },
                    { name: "Tosca - Automated Software testing", code: "BISL657A", credits: "1 CR", slug: "tosca-automated-software-testing-tast-bisl657a-vtu-notes", modules: [] },
                    { name: "React", code: "BCSL657B", credits: "1 CR", slug: "react-react-bcsl657b-vtu-notes", modules: [] },
                    { name: "Generative AI", code: "BAIL657C", credits: "1 CR", slug: "generative-ai-gai-bail657c-vtu-notes", modules: [] },
                    { name: "Devops", code: "BCSL657D", credits: "1 CR", slug: "devops-devops-bcsl657d-vtu-notes", modules: [] }
                ]
            }
        ]
    },
    ece: {
        title: "Electronics & Communication",
        semesters: [
            {
                sem: 3,
                subjects: [
                    {
                        name: "Digital System Design using Verilog", code: "BEC302", credits: "4 CR", slug: "digital-system-design-using-verilog-dsdv-bec302-vtu-notes", modules: [
                            { id: 1, name: "Module 1: Handwritten Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/19aG_zj14r3KY3ZY8ioCW2ppiVNGYzVwR/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1N1e9bwVmir5GJ89XObawHKyNPZv0X2Sc/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 2: Handwritten Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1aCnYI5fv-4Zj6mlZEcxRD4gxlTCcGD8t/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1hkzEZMOj_dDnkBVM5vVVYJCDlPXCGiOG/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1HS3Ai2j_lr16kqGl8_MH1e7GU06PuNDk/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 4: Handwritten Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1uNRtCjF5AYSvTZczW8TJ9oF3QxNJKsAY/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1qYQ1-Y6w163iJf9x4k0d6R2iYQhdtQF5/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 5: Handwritten Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1mq1FvxWmzmQeT-9MazGXUznJ8pWJJGnT/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1po9LsKraAOM-gBGGbpmLsAAd234WdiqE/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1i24ATSpPwiuiVynEgfSjW7bXTUmjKefS/view?usp=drive_link", type: "Notes" },
                            { id: 11, name: "Model question paper", desc: "Combined model question paper for dsdv", link: "https://drive.google.com/file/d/1mSX-IisWcpGBJ_px13OlLMmNu0IUDD_u/view?usp=drive_link", type: "MQP" }]
                    },
                    { name: "Electronic Principles and Circuits", code: "BEC303", credits: "4 CR", slug: "electronic-principles-and-circuits-epc-bec303-vtu-notes", modules: [
                            { id: 1, name: "All Module Notes", desc: "Comprehensive notes for all modules", link: "https://drive.google.com/file/d/1LgmPpbI6THNmfL-hPTJQyc6mh9DYjZYT/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1tnK7lAQh6fGckFap3kGFpo8boGryaegQ/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 1: Handwritten Notes(Part-1) ", desc: "Comprehensive notes for Module 1(Part-1)", link: "https://drive.google.com/file/d/1m1jll1QOtVwMKyIekKkRMxaWcWTHN0wc/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 1: Handwritten Notes(Part-2)", desc: "Comprehensive notes for Module 1(Part-2)", link: "https://drive.google.com/file/d/1L_4SzFnFV5_bjxnFutrGVSj1A8P2KY6P/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 2: Handwritten Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1L_4SzFnFV5_bjxnFutrGVSj1A8P2KY6P/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1f6EeOp3RKqTtybqvy-H_zvJbNqWErslH/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/19C3DSBKHaV-5CSP7MHzMdl1TpLcnOvvK/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1QEerEjtkv9MMzGM8hjnlL4EektOS8E5Q/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 5: Question bank theory", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1QrUe-2CQ1cgFJsVGeOFvij7IpQi0ISgi/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Previous Question Papers: Jan/Feb 2024", desc: "Previous Question Papers: Jan/Feb 2024", link: "https://drive.google.com/file/d/1QrUe-2CQ1cgFJsVGeOFvij7IpQi0ISgi/view?usp=drive_link", type: "PYQP" },
                            { id: 11, name: "Lab Manual", desc: "Lab Manual", link: "https://drive.google.com/file/d/1yppkBTHsJnHhFa4mMv6B78g2LJR_2OOD/view?usp=drive_link", type: "Lab Manual" }
                    ] },
                    { name: "Network Analysis", code: "BEC304", credits: "4 CR", slug: "network-analysis-na-bec304-vtu-notes", modules: [
                        { id: 1, name: "All Module Notes", desc: "Comprehensive notes for all modules", link: "https://drive.google.com/file/d/1oCVt-ylIZKNMemjhdOrq64MPA-Fz8FdT/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1Ug8dLS6GYhozuzrWqwzk5xDn8goxHQqi/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1AzMrh820Zr7kkw-8ljOXttiNCbVAI0zj/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1PIya4OoxJKxuwOKhOdcvuDVhELBnUC_U/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1FmBgUyRfO4-oS9hdXzCfLE2xEFdalU3Q/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "NA Previous Question Papers", desc: "NA Previous Question Papers", link: "https://drive.google.com/file/d/1UWY4uVAZEyNIbbZQe1kMhjOl-_dDV2tK/view?usp=drive_link", type: "PYQP" },
                        { id: 7, name: "youtube links for solved question paper", desc: "youtube links for solved question paper", link: "https://drive.google.com/file/d/1aEvSuFmzH7VGzp-NjQoLI4qO-of2mpP3/view?usp=drive_link", type: "youtube links" }
                    ] },
                    { name: "Electronic Devices", code: "BEC306A", credits: "3 CR", slug: "electronic-devices-ed-bec306a-vtu-notes", modules: [] },
                    { name: "Sensors and Instrumentation", code: "BEC306B", credits: "3 CR", slug: "sensors-and-instrumentation-si-bec306b-vtu-notes", modules: [
                        { id: 1, name: "Sensors and Instrumentation Notes-1", desc: "Sensors and Instrumentation Notes-1", link: "https://drive.google.com/file/d/1-Yl5r3ppJLvl2GUQYbANrPqiR4-28eJh/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Sensors and Instrumentation Notes-2", desc: "Sensors and Instrumentation Notes-2", link: "https://drive.google.com/file/d/1qQl90NMK-eh8v9G7uCBfqp6VXEt2uq1O/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Sensors and Instrumentation Notes-3", desc: "Sensors and Instrumentation Notes-3", link: "https://drive.google.com/file/d/1Rq_UjDp2hv4gzBEAY2_ccWQnohCux-8y/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Sensors and Instrumentation Solved Question Papers", desc: "Sensors and Instrumentation Solved Question Papers", link: "https://drive.google.com/file/d/1WRZ8Ijvvg-5s0_r8MZTB2II3xyEauaca/view?usp=drive_link", type: "Solved PYQP" }
                    ] },
                    { name: "Computer Organization and Architecture", code: "BEC306C", credits: "3 CR", slug: "computer-organization-and-architecture-coa-bec306c-vtu-notes", modules: [] },
                    { name: "Applied Numerical Methods for EC Engineers", code: "BEC306D", credits: "3 CR", slug: "applied-numerical-methods-for-ec-engineers-anme-bec306d-vtu-notes", modules: [] },
                    { name: "LabVIEW Programming", code: "BEC358A", credits: "1 CR", slug: "labview-programming-lp-bec358a-vtu-notes", modules: [] },
                    { name: "MATLAB Programming", code: "BEC358B", credits: "1 CR", slug: "matlab-programming-mp-bec358b-vtu-notes", modules: [] },
                    { name: "C++ Basics", code: "BEC358C", credits: "1 CR", slug: "c-plus-plus-basics-cpp-bec358c-vtu-notes", modules: [] },
                    { name: "IOT for Smart Infrastructure", code: "BEC358D", credits: "1 CR", slug: "iot-for-smart-infrastructure-iot-bec358d-vtu-notes", modules: [] },
                    { name: "Analog and Digital Systems Design Lab", code: "BECL305", credits: "1 CR", slug: "analog-and-digital-systems-design-lab-adsdl-becl305-vtu-notes", modules: [] },
                    { name: "AV Mathematics-III for EC Engineering", code: "BMATEC301", credits: "4 CR", slug: "av-mathematics-iii-for-ec-engineering-m3-bmatec301-vtu-notes", modules: [
                            { id: 1, name: "Module 1: Handwritten Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1kaz3h_Lmbb6OyDETufigEEhBAu8e8z_z/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 2: Handwritten Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1baJVLK9PCc7BQI9E_RS6tOyczr59pkTk/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 3: Handwritten Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1IAHpQ-QPu1UEtkU2SAXTMsVarZvidOX_/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 4: Handwritten Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1dhhOhZPFZsPRbON10lgUc14GYyw5CeXt/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 5: Handwritten Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1wyR-4fsZU1IlUXbN_a-tPC-MQZFENntJ/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Model question paper-1", desc: "model question paper-1 for bmatec301", link: "https://drive.google.com/file/d/1GzbE5H9DOPzCH6RES_dDuBQp8bKAxAbv/view?usp=drive_link", type: "MQP" },
                            { id: 7, name: "Model question paper-2", desc: "model question paper-2 for bmatec301", link: "https://drive.google.com/file/d/1QbkLtdjAvfVNuzuCfkiBYgQM5FszHa-X/view?usp=drive_link", type: "MQP" },
                             { id: 8, name: "Handbook(formula book)", desc: "Handbook (formula book) for bmatec301 22 scheme", link: "https://drive.google.com/file/d/1RK5AdtpFsofS9k-Im56cTM61UgyJVLJ2/view?usp=drive_link", type: "Handbook" }
                    ] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [
                         { id: 1, name: "BSCK307 complete notes", desc: "Complete notes for BSCK307", link: "https://drive.google.com/file/d/1p-LiWAcbwBr7RI-Ovma2THmyoUlfK8RZ/view?usp=drive_link", type: "Notes" },
                    ] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Biology For Engineers", code: "BBOK407", credits: "1 CR", slug: "biology-for-engineers-be-bbok407-vtu-notes", modules: [
                        { id: 1, name: "Module 1: Introduction to Biology (notes-1)", desc: "BBOK407 Module-1 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/10QbZqN8HiRyy7V-FjYcRz_ByAZnJOLF1/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Introduction to Biology (notes-2)", desc: "BBOK407 Module-1 Notes by SVIT", link: "https://drive.google.com/file/d/10n_XykmgSqGkcoeMs8ID_H9vyzbpMD8J/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Biomolecules and Their Application (notes-1)", desc: "BBOK407 Module-2 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1yMT6xwiFPfp2DykcWRCHMgs4YqUKtwWu/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 2: Biomolecules and Their Application (notes-2)", desc: "BBOK407 Module-2 Notes by SVIT", link: "https://drive.google.com/file/d/1oVjwS5gc96_V9cbiSRsfB5AooYqGVmv9/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 3: Human Organ Systems and Bio Design (notes-1)", desc: "BBOK407 Module-3 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/17xIU7ouxr49T6Jh0e8ooorYHG7EBHCyV/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Module 3: Human Organ Systems and Bio Design (notes-2)", desc: "BBOK407 Module-3 Notes by SVIT", link: "https://drive.google.com/file/d/14VujeZybDMdawC4_s5b-B6WsvNILcy1e/view?usp=drive_link", type: "Notes" },
                        { id: 7, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-1)", desc: "BBOK407 Module-4 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1neqKOvQ0JG6h_ILTst2PiTsJmHecMXtO/view?usp=drive_link", type: "Notes" },
                        { id: 8, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-2)", desc: "BBOK407 Module-4 Notes by SVIT", link: "https://drive.google.com/file/d/1e81Ew-svatK4-Bo87i0N9v42tz2GbQ0P/view?usp=drive_link", type: "Notes" },
                        { id: 9, name: "Module 5: Trends in bioengineering (notes-1)", desc: "BBOK407 Module-5 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/12fcJyfZwsEDQt16kOS_XY6CIfCF-owhh/view?usp=drive_link", type: "Notes" },
                        { id: 10, name: "Module 5: Trends in bioengineering (notes-2)", desc: "BBOK407 Module-5 Notes by SVIT", link: "https://drive.google.com/file/d/1tDH7DjIKKzcvs6Vd7qnWK-2Lb9pa9wcj/view?usp=drive_link", type: "Notes" },
                        { id: 11, name: "bbok407 QUESTION BANK", desc: "bbok407 QUESTION BANK", link: "https://drive.google.com/file/d/12pDGS24Y3vuPQs6tk5GpHztaMxYZtZhf/view?usp=drive_linkn", type: "question bank" },
                    ] },
                    { name: "Electromagnetics Theory", code: "BEC401", credits: "3 CR", slug: "electromagnetics-theory-et-bec401-vtu-notes", modules: [
                        { id: 1, name: "BEC401 electromagnetics theory complete notes", desc: "BEC401 electromagnetics theory complete notes", link: "https://drive.google.com/file/d/1N-Iaa2YzaAhDk0aRuoliQvfZV7CcPhP_/view?usp=drive_link", type: "Notes" },
                         { id: 2, name: "Module 1: Handwritten Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/167hNdXEvJQi6hp7DxJtL5kC37fsCEePb/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/1bo8Bh2o0jwBX5uOUUGr_NndO0u-cHsiM/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/1ImjSwzEC0yTsL_0K73CsRnVfDdJdcNjt/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/18Mvn9DCH-AWM4L0YA36Tswed_V_ERKIi/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/16cGfkHZPEvgWjwW1Zg3AYOWIkyCJGo7_/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/1bNKJ5bwMDuk5NSrP8KYZ1vL-AFAGXiYP/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "engineering electromagnetics 9th ed 9nbsped compressed pdf", desc: "engineering electromagnetics 9th ed 9nbsped compressed pdf", link: "https://drive.google.com/file/d/1Uzwcq4ux5RswFGfjxhqtMxaJm8ueAIHo/view?usp=drive_link", type: "Textbook" },
                             { id: 9, name: "Model question paper-1", desc: "model question paper-1 for bmatec301", link: "https://drive.google.com/file/d/1WCDzaO4KrpEu3k-UqmmKUtWeh-5kAnVa/view?usp=drive_link", type: "MQP" },
                    ] },
                    { name: "Principles of Communication Systems", code: "BEC402", credits: "4 CR", slug: "principles-of-communication-systems-pcs-bec402-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Handwritten Notes", desc: "Handwritten notes for Module 1", link: "https://drive.google.com/file/d/127n8KdZ660BVISzr_htVjKLVuu0CUU05/view?usp=drive_link", type: "Notes" },
                         { id: 2, name: "Module 2: Handwritten Notes", desc: "Handwritten notes for Module 2", link: "https://drive.google.com/file/d/14Q40fg0qGBat5PP-DlqcysgQmUFwBTQS/view?usp=drive_link", type: "Notes" },
                         { id: 3, name: "Module 3: Handwritten Notes", desc: "Handwritten notes for Module 3", link: "https://drive.google.com/file/d/1-COeSmPcV3UpCJzkc1OrpgMU3LCc2A5S/view?usp=drive_link", type: "Notes" },
                         { id: 4, name: "Module 4: Handwritten Notes", desc: "Handwritten notes for Module 4", link: "https://drive.google.com/file/d/1C9A8saTc7nGnHkG89ObgvbeST4OXIT2h/view?usp=drive_link", type: "Notes" },
                         { id: 5, name: "Module 5: Handwritten Notes", desc: "Handwritten notes for Module 5", link: "https://drive.google.com/file/d/1DSfC0eKEFbT56aHNS22Uw5u8CSSrGcta/view?usp=drive_link", type: "Notes" },
                         { id: 6, name: "Module 5: Notes Part-1", desc: "Comprehensive notes for Module 5 Part-1", link: "https://drive.google.com/file/d/1Zr7NMQgbmTvBbfnJjbvZURS5VRCdOuQg/view?usp=drive_link", type: "Notes" },
                         { id: 7, name: "Module 5: Notes Part-2", desc: "Comprehensive notes for Module 5 Part-2", link: "https://drive.google.com/file/d/1xgPFPKuUhXGggBjy2oR6T3YEBjg2L1is/view?usp=drive_link", type: "Notes" },
                         { id: 8, name: "Principles of Electronic Communication Systems (Textbook) 4th Edition", desc: "Principles of Electronic Communication Systems (Textbook) 4th Edition Author(Louis E. Frenzel jr.)", link: "https://drive.google.com/file/d/1Jo3KECXw65eVwMzxeHH-8eaXdPjYIGdH/view?usp=drive_link", type: "Textbook" },
                    ] },
                    { name: "Control Systems", code: "BEC403", credits: "4 CR", slug: "control-systems-cs-bec403-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for bec403 Module 1", link: "https://drive.google.com/file/d/1eGrwcDBcptxz8fu2dGNiVF4p5jvgLjiu/view?usp=drive_link", type: "Notes" },
                          { id: 2, name: "Module 1: Introduction to Control Systems (handwritten) ", desc: "bec403 Module 1 Notes by SVIT", link: "https://drive.google.com/file/d/1ktoOlcM-v4CERC7h77vBWUVW4VerQ0uJ/view?usp=drive_link", type: "Notes" },
                          { id: 3, name: "Module 1: Notes", desc: "Notes for bec403 Module 1 by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/10qv6xx5tLN8WacHeNYRcl25O-9G16hwy/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Block diagrams and signal flow graphs (handwritten)", desc: "bec403 Module 2 Notes by SVIT", link: "https://drive.google.com/file/d/1Ky1Wi8HOVRngofsL9KlWHwQc-Q1dkJM2/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 2: Notes", desc: "Notes for bec403 Module 2 by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1l4i7Fr-HFhKJ-dKexHD4jhV2md46BhEq/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 3: Time Response of feedback control systems (handwritten)", desc: "bec403 Module 3 Notes by SVIT", link: "https://drive.google.com/file/d/1ZU6B_rzWhP3M0Q2YQl_E1QQTjKJxDVpg/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 3: Notes", desc: "Notes for bec403 Module 3 by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1Bcc7rDB3bCvJnwLRfKr6czKcaJiLirIP/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 3: Notes (Handwritten)", desc: "Handwritten notes for bec403 Module 3", link: "https://drive.google.com/file/d/1buG6hJySWjiy_bHhrxfffQBeetuxr-Lt/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 4: Stability analysis, Introduction to Root-Locus Techniques (handwritten)", desc: "bec403 Module 4 Notes by SVIT", link: "https://drive.google.com/file/d/1J_QlI23D7JixjDrduBrWzWLWxbeRFAEx/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 4: Notes", desc: "Notes for bec403 Module 4 by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1e2aKJenIeB30MnJA2aI3VzliTSMmmu1k/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Module 5: Frequency domain analysis and stability, State Variable Analysis (handwritten)", desc: "bec403 Module 5 Notes by SVIT", link: "https://drive.google.com/file/d/1lHj4ro0hhYzQTWuh73A8l4avxxkqSIUa/view?usp=drive_link", type: "Notes" },
                            { id: 11, name: "Module 5: Notes", desc: "Notes for bec403 Module 5 by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/18TIdd2XK00tJcoErMhXI2Fv4C2B93SoC/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Microcontrollers", code: "BEC405A", credits: "3 CR", slug: "microcontrollers-mc-bec405a-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", link: "https://drive.google.com/file/d/17bpwFBKOeSHJJP_pFAQefAVxFTnQcFI3/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", link: "https://drive.google.com/file/d/179we-uphzwfwnwZH-FbluJ6xxSKsnLI0/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1F0fLYvvlievS9e6mfoOEx_AOfWqRlrVy/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1oTFt74XC4LMRcS8jhkpy1xd0fxhgwE7y/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", link: "https://drive.google.com/file/d/12qK4nfneygBpIT8ms5lADLQ3TWbkX_kw/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Model question paper-1", desc: "model question paper-1 for bec405a", link: "https://drive.google.com/file/d/1qGfNmEBPhQxg_AiPeKJMGfM8_eCWKvK9/view?usp=drive_link", type: "MQP" },
                            { id: 7, name: "Model question paper-2", desc: "model question paper-2 for bec405a", link: "https://drive.google.com/file/d/19N1nQkrufWiI8RDzYbThLUxT-P287n1-/view?usp=drive_link", type: "MQP" }
                    ] },
                    { name: "Industrial Electronics", code: "BEC405B", credits: "3 CR", slug: "industrial-electronics-ie-bec405b-vtu-notes", modules: [] },
                    { name: "Operating Systems", code: "BEC405C", credits: "3 CR", slug: "operating-systems-os-bec405c-vtu-notes", modules: [] },
                    { name: "Data Structures using C", code: "BEC405D", credits: "3 CR", slug: "data-structures-using-c-dsc-bec405d-vtu-notes", modules: [] },
                    { name: "Microcontroller Lab", code: "BEC456A", credits: "1 CR", slug: "microcontroller-lab-mcl-bec456a-vtu-notes", modules: [] },
                    { name: "Programmable Logic Controllers", code: "BEC456B", credits: "1 CR", slug: "programmable-logic-controllers-plc-bec456b-vtu-notes", modules: [] },
                    { name: "Octave Programming", code: "BEC456C", credits: "1 CR", slug: "octave-programming-op-bec456c-vtu-notes", modules: [] },
                    { name: "Data Structures Lab using C", code: "BEC456D", credits: "1 CR", slug: "data-structures-lab-using-c-dslc-bec456d-vtu-notes", modules: [] },
                    { name: "Communication Lab", code: "BECL404", credits: "1 CR", slug: "communication-lab-cl-becl404-vtu-notes", modules: [] },
                    { name: "Universal Human Values", code: "BUHK408", credits: "1 CR", slug: "universal-human-values-uhv-buhk408-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 5,
                subjects: [
                    { name: "Technological Innovation and Management Entrepreneurship", code: "BEC501", credits: "3 CR", slug: "technological-innovation-and-management-entrepreneurship-time-bec501-vtu-notes", modules: [] },
                    { name: "Digital Signal Processing", code: "BEC502", credits: "4 CR", slug: "digital-signal-processing-dsp-bec502-vtu-notes", modules: [] },
                    { name: "Digital Communication", code: "BEC503", credits: "3 CR", slug: "digital-communication-dc-bec503-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Handwritten Notes-1", desc: "Handwritten notes for Module 1 Notes-1", link: "https://drive.google.com/file/d/1MiHXJLH_OeBXTM42CU6zAmNsYYul3giv/view?usp=drive_link", type: "Notes" },
                         { id: 2, name: "Module 1: Handwritten Notes-2", desc: "Handwritten notes for Module 1 Notes-2", link: "https://drive.google.com/file/d/1qN_qBCPmdpB_WlEFFVGeTFEWOjrrhtuv/view?usp=drive_link", type: "Notes" },
                         { id: 3, name: "Module 2: Handwritten Notes-1", desc: "Handwritten notes for Module 2 Notes-1", link: "https://drive.google.com/file/d/19RAWpWUVEoIf2AFvyIw7sv1Jk-Zm9bGh/view?usp=drive_link", type: "Notes" },
                         { id: 4, name: "Module 2: Handwritten Notes-2", desc: "Handwritten notes for Module 2 Notes-2", link: "https://drive.google.com/file/d/1ZJcWPEn_ZHQZkSbBfifhjKWaBAfsYfpB/view?usp=drive_link", type: "Notes" },
                         { id: 5, name: "Module 2: Handwritten Notes-3", desc: "Handwritten notes for Module 2 Notes-3", link: "https://drive.google.com/file/d/1gfm05jkUIOCmZm47M9whjSRyOX-QMtlm/view?usp=drive_link", type: "Notes" },
                         { id: 6, name: "Module 3: Handwritten Notes", desc: "Handwritten notes for Module 3", link: "https://drive.google.com/file/d/1-COeSmPcV3UpCJzkc1OrpgMU3LCc2A5S/view?usp=drive_link", type: "Notes" },
                         { id: 7, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", link: "https://drive.google.com/file/d/1nxETU5uNyIK7buQJQpSEt0ekPxMp4CPD/view?usp=drive_link", type: "Notes" },
                         { id: 8, name: "Module 4: Handwritten Notes", desc: "Handwritten notes for Module 4", link: "https://drive.google.com/file/d/1Lv0eRLcMw-r0juc8jYeNgCzBaZE0YkN5/view?usp=drive_link", type: "Notes" },
                         { id: 9, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", link: "https://drive.google.com/file/d/1MJ_McxcBZDwJVGQ5J7z25v8gU067a-tE/view?usp=drive_link", type: "Notes" },
                         { id: 10, name: "Module 5: Handwritten Notes", desc: "Handwritten notes for Module 5", link: "https://drive.google.com/file/d/1BzQDIYlesxSpc0FR8M6VIVV_6nemWxN2/view?usp=drive_link", type: "Notes" },
                         { id: 11, name: "Scheme of Evaluation for dec/jan 2025 qp", desc: "Scheme of Evaluation for dec/jan 2025 qp", link: "https://drive.google.com/file/d/1LY6Nga938RXP7eVzIcjx1moEGp3uLGsN/view?usp=drive_link", type: "Scheme of Evaluation" },
                    ] },
                    { name: "Digital Communication Lab", code: "BECL504", credits: "1 CR", slug: "digital-communication-lab-dcl-becl504-vtu-notes", modules: [
                        { id: 1, name: "Digital Communication Lab", desc: "Digital Communication Lab", link: "https://drive.google.com/file/d/1bed2xpW73St1pQD3rMqr7DB8PRaaPSZB/view?usp=drive_link", type: "Lab Manual" },
                    ] },
                    { name: "Intelligent Systems and Machine Learning Algorithms", code: "BEC515A", credits: "3 CR", slug: "intelligent-systems-and-machine-learning-algorithms-ismla-bec515a-vtu-notes", modules: [] },
                    { name: "Digital Switching and Finite Automata Theory", code: "BEC515B", credits: "3 CR", slug: "digital-switching-and-finite-automata-theory-dsfat-bec515b-vtu-notes", modules: [] },
                    { name: "Data Structure using C++", code: "BEC515C", credits: "3 CR", slug: "data-structure-using-c-plus-plus-dscpp-bec515c-vtu-notes", modules: [] },
                    { name: "Satellite and Optical Communication", code: "BEC515D", credits: "3 CR", slug: "satellite-and-optical-communication-soc-bec515d-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Notes", desc: "Satellite Orbits and Trajectories (Module 1)", link: "https://drive.google.com/file/d/1hfOJr-1-fNCsfC8dEKytPZSbHYaNCs1N/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "Module 2: Notes", desc: "Satellite Subsystems (Module 2)", link: "https://drive.google.com/file/d/1HjPaMCq2v3DnWfFNj4wKh46PlFETrlBR/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "Module 2: Notes", desc: " Earth Station (Module 2)", link: "https://drive.google.com/file/d/1LS3mWlfb_ma5gyMBJOD59gpQcjlC2u7M/view?usp=drive_link", type: "Notes" },
                            { id: 4, name: "Module 3: Notes", desc: "Communication Satellites (Module 3)", link: "https://drive.google.com/file/d/189smA7QyiZiu1xA0mws7idXR89C0iNxf/view?usp=drive_link", type: "Notes" },
                            { id: 5, name: "Module 4: Notes", desc: "Optical Fiber Structures (Module 4)", link: "https://drive.google.com/file/d/1Eh81kPB9OxkLsaGlvAs3FWsjPbNQWFmm/view?usp=drive_link", type: "Notes" },
                            { id: 6, name: "Module 5: Notes", desc: "Optical Sources and Detectors (Module 5)", link: "https://drive.google.com/file/d/1ye-s4eM2IYisablM05Bwjy9Id09_gfVv/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 5: Notes", desc: "Wavelength Division Multiplexing (WDM) Concepts (Module 5)", link: "https://drive.google.com/file/d/1DpdORkaJeA1INAG-MczBUmrtKmMi_3zh/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Previous Year Question Paper", desc: "Previous Year Question Paper", link: "https://drive.google.com/file/d/1bfFG8Uu0drZqd3070RJukI286Y2lG0po/view?usp=drive_link", type: "PYQP" },
                            { id: 9, name: "Model Question Paper", desc: "Model Question Paper", link: "https://drive.google.com/file/d/1FZHe1ZWdpYjmM1WPzQK-n1YEob3CypWj/view?usp=drive_link", type: "MQP" },
                            { id: 10, name: "Scheme of Evaluation for dec/jan 2025 qp", desc: "Scheme of Evaluation for dec/jan 2025 qp", link: "https://drive.google.com/file/d/1cUIFoMiLk37-BRQBB4wO3qKqWCUx2Z1Y/view?usp=drive_link", type: "Scheme of Evaluation" },
                            { id: 11, name: "Model Question Paper Solution", desc: "Model Question Paper Solution", link: "https://drive.google.com/file/d/1K_6OeefR8yiPbnJGS6cpEQsHYX_0iyVg/view?usp=drive_link", type: "MQP" },
                    ] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [
                            { id: 1, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by Dr. Shantha Kumari K AJIET, Mangalore", link: "https://drive.google.com/file/d/1m6U0KPFjF-SKFEZ7GrG_lzWpEeIAX7kz/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by ATMECE, Mysuru", link: "https://drive.google.com/file/d/1652-Bv4HJ-vhaYN3I7ptpPyDjMdvdGmc/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "RM&IPR brmk557 Textbook pdf", desc: "Textbook pdf for RM&IPR brmk557", link: "https://drive.google.com/file/d/1xuZPGNAiFpSIuXoa4VNaRjgol8Ew5s97/view?usp=drive_link", type: "textbook" },
                            { id: 4, name: "Dec/Jan 2025 question paper Scheme of Evaluation", desc: "Dec/Jan 2025 question paper Scheme of Evaluation", link: "https://drive.google.com/file/d/1wGMuFz7PX6wwW8djyeETdMwONtO64wAI/view?usp=drive_link", type: "Scheme of Evaluation" },
                            { id: 5, name: "PYQP & MQP", desc: "Previous year question paper & Model question paper", link: "https://drive.google.com/file/d/1Tk1MlqDUbOnEXalQQbyXm_2AeBkxVvD9/view?usp=drive_link", type: "PYQP & MQP" },
                            { id: 6, name: "Module 1: Notes", desc: "Notes for Module 1 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1oDCFunacrTWH2itSz-hUeAy2sGsSNDUh/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 2: Notes", desc: "Notes for Module 2 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/10ip6yTP22Mm1asXjPhfDzl3N5TMhu40-/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 3: Notes", desc: "Notes for Module 3 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/116h8OALGr6Bov6pDYtwD5DVEDAXzC8xo/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 4: Notes", desc: "Notes for Module 4 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/117ZDYOIqOXBXtfNc9LQSZjCH1yIf226q/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Module 5: Notes", desc: "Notes for Module 5 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1WScqBzQelRuJbQinkMUS4PhJE4dXgBDo/view?usp=drive_link", type: "Notes" },
                    ] },   
                    { name: "Environmental Studies", code: "BESK508", credits: "1 CR", slug: "environmental-studies-es-besk508-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 6,
                subjects: [
                    { name: "Embedded System Design", code: "BEC601", credits: "3 CR", slug: "embedded-system-design-esd-bec601-vtu-notes", modules: [
                        { id: 1, name: "Text book 1 ( ARM System Developers Guide)", desc: "Andrew N Sloss, Dominic System and Chris Wright,” ARM System Developers Guide”, Elsevier", link: "https://drive.google.com/file/d/1W-ykIgFSm2Me-p_IqF5CJ6g4BchQzf6v/view?usp=drive_link", type: "Textbook" },
                        { id: 2, name: "Text book 2 (Introduction to Embedded Systems)", desc: "“Introduction to Embedded Systems”, Shibu Kizhakke Vallathia", link: "https://drive.google.com/file/d/1svibhPSaxEesiNpmPIthf24G9pFAk1C4/view?usp=drive_link", type: "Textbook" },
                        { id: 3, name: "Module-1 notes-1 for BEC601 (Embedded System Design)", desc: "Module-1 notes-1 for BEC601 (Embedded System Design)", link: "https://drive.google.com/file/d/1NmsG86PHLbri4H8ifBZoalO65FXUPguq/view?usp=drive_link", type: "notes" },
                        { id: 3, name: "Module-1 notes-2 for BEC601 (Embedded System Design)", desc: "Module-1 notes-2 for BEC601 (Embedded System Design) by AMTECE Mysuru", link: "https://drive.google.com/file/d/1YsQDhYu24NxqHWkZyUSRURtZi3k3BTC9/view?usp=drive_link", type: "notes" },
                        { id: 4, name: "Module-2 notes-1 for BEC601 (Embedded System Design)", desc: "Module-2 notes-1 for BEC601 (Embedded System Design) by AMTECE Mysuru", link: "https://drive.google.com/file/d/1ghdywl1_TJKXrENMjnsPu4sYAgvZlbzg/view?usp=drive_link", type: "notes" },
                        { id: 4, name: "Module-2 notes-2 for BEC601 (Embedded System Design)", desc: "Module-2 notes-2 for BEC601 (Embedded System Design)", link: "https://drive.google.com/file/d/1vZtGbcWoxfd0UCOZ805Qx4HG4NH_5R_M/view?usp=drive_link", type: "notes" },
                        { id: 5, name: "Module-3 notes for BEC601 (Embedded System Design)", desc: "Module-3 notes for BEC601 (Embedded System Design) by AMTECE Mysuru", link: "https://drive.google.com/file/d/1QabyTmpVGnAHBNLiD_WfAlqvrTE5GIzY/view?usp=drive_link", type: "notes" },
                        { id: 6, name: "Module-4 notes for BEC601 (Embedded System Design)", desc: "Module-4 notes for BEC601 (Embedded System Design)", link: "https://drive.google.com/file/d/1EGiqSHXWF--txpeV5swkON1GIxYpoW51/view?usp=drive_link", type: "notes" },
                        { id: 7, name: "Module-5 notes for BEC601 (Embedded System Design)", desc: "Module-5 notes for BEC601 (Embedded System Design)", link: "https://drive.google.com/file/d/18nNUQ5UhfR4Wx-dptO1Dz98JBxCzzgdf/view?usp=drive_link", type: "notes" },
                    ] },
                    { name: "VLSI Design and Testing", code: "BEC602", credits: "4 CR", slug: "vlsi-design-and-testing-vdt-bec602-vtu-notes", modules: [
                        { id: 1, name: "VLSI Module-1 notes-1", desc: "VLSI Module-1 notes by Rajesh Kumar Kaushal, Asst. Prof., ECE, Dr T.T.I.T., K.G.F", link: "https://drive.google.com/file/d/1e-CuLRMsmfIm2q1DO6Vi4kJaHHL9vP2_/view?usp=drive_link", type: "notes" },
                        { id: 2, name: "VLSI Module-1 Handwritten notes", desc: "VLSI Module-1 notes", link: "https://drive.google.com/file/d/18TBlXAvDsQfVH22cvIMwSQR74IpKeax6/view?usp=drive_link", type: "notes" },
                        { id: 3, name: "VLSI Module-1 Handwritten notes", desc: "VLSI Module-1 notes", link: "https://drive.google.com/file/d/1o7k50U6FHjGR3Bcl7BNbHa78g1AsvKgn/view?usp=drive_link", type: "notes" },
                        { id: 4, name: "VLSI Module-2 notes", desc: "VLSI Module-2 notes by Rajesh Kumar Kaushal, Asst. Prof., ECE, Dr T.T.I.T., K.G.F", link: "https://drive.google.com/file/d/1eJZxvzhkHDD1SR-rRowFg18LkuQdsern/view?usp=drive_link", type: "notes" },
                        { id: 6, name: "VLSI Module-3 notes", desc: "VLSI Module-3 notes by Rajesh Kumar Kaushal, Asst. Prof., ECE, Dr T.T.I.T., K.G.F", link: "https://drive.google.com/file/d/1jq21ckbqxoNUQH7hhhkIQptNavL2Gfiy/view?usp=drive_link", type: "notes" },
                        { id: 5, name: "VLSI Module-3 Handwritten notes", desc: "VLSI Module-3 notes", link: "https://drive.google.com/file/d/1mkcBmy3t-NW_U6TaYKpw23W18Snj2Q2B/view?usp=drive_link", type: "notes" },
                        { id: 5, name: "VLSI Module-2 Printed notes", desc: "VLSI Module-2 Printed notes", link: "https://drive.google.com/file/d/1xnGHCtB5CAigchiUySGODS4aRHefFP5s/view?usp=drive_link", type: "notes" },
                        { id: 7, name: "VLSI Module-4 notes", desc: "VLSI Module-4 notes by Rajesh Kumar Kaushal, Asst. Prof., ECE, Dr T.T.I.T., K.G.F", link: "https://drive.google.com/file/d/1Bt6BCREpoW_asfUvbuD6aFGmxaimviTJ/view?usp=drive_link", type: "notes" },
                        { id: 8, name: "VLSI Module-5 notes", desc: "VLSI Module-5 notes by Rajesh Kumar Kaushal, Asst. Prof., ECE, Dr T.T.I.T., K.G.F", link: "https://drive.google.com/file/d/1fVssBSxBZ64uAh2puPA825FOLPz2tNuF/view?usp=drive_link", type: "notes" },
                        { id: 9, name: "VLSI Solved model question paper", desc: "VLSI Solved model question paper", link: "https://drive.google.com/file/d/1dRfHqHrxM5Fug3uMbFN30PRcp29NKTmK/view?usp=drive_link", type: "solved mqp" },
                    ] },
                    { name: "VLSI Design and Testing Lab", code: "BECL606", credits: "1 CR", slug: "vlsi-design-and-testing-lab-vdtl-becl606-vtu-lab-manual", modules: [
                        { id: 1, name: "VLSI Design and Testing Lab Manual", desc: "VLSI Design and Testing Lab Manual by SJC Institute of Technology, Chickballapur", link: "https://drive.google.com/file/d/1GE7yNse9F3raZ8qUNdkaGQGa6PSABS_w/view?usp=drive_link", type: "lab-manual" },
                    ] },
                    { name: "Indian Knowledge System", code: "BIKS609", credits: "1 CR", slug: "indian-knowledge-system-iks-biks609-vtu-notes", modules: [] },
                    { name: "Multimedia Communication", code: "BEC613A", credits: "3 CR", slug: "multimedia-communication-mmc-bec613a-vtu-notes", modules: [
                        { id: 1, name: "Module-1  Notes-1  ( Multimedia Communication)", desc: "Multimedia Communication Module-1 Notes-1", link: "https://drive.google.com/file/d/1xxPrTUneyuNOQW7DGSxYhezj0ovJQ_J6/view?usp=drive_link", type: "notes" },
                        { id: 2, name: "Module-1  Notes-2 ( Multimedia Communication)", desc: "Multimedia Communication Module-1 Notes-2", link: "https://drive.google.com/file/d/1KTy1r_BzHRdbV1vVRay-wNpNM9V5VwUs/view?usp=drive_link", type: "notes" },
                        { id: 3, name: "Module-2  Notes-1 (Multimedia Communication)", desc: "Multimedia Communication Module-2 Notes-1", link: "https://drive.google.com/file/d/1qlixhZHPWIW_pjlPaoR_7g5MuHvpZwc-/view?usp=drive_link", type: "notes" },
                        { id: 4, name: "Module-2  Notes-2 ( Multimedia Communication)", desc: "Multimedia Communication Module-2 Notes-2", link: "https://drive.google.com/file/d/1bIW7JbO97F-utbidYpMSnrq-0RkyX7oR/view?usp=drive_link", type: "notes" },
                        { id: 5, name: "Module-2  Notes-3 ( Multimedia Communication)", desc: "Multimedia Communication Module-2 Notes-3", link: "https://drive.google.com/file/d/1s42CMESvvq4OUCub8N3syQShpF0spFkS/view?usp=drive_link", type: "notes" },
                        { id: 6, name: "Module-3 Notes ( Multimedia Communication)", desc: "Multimedia Communication Module-3 Notes", link: "https://drive.google.com/file/d/1QkZu2DvV6OLkUTxMaFzTHA-VHqZlTJmY/view?usp=drive_link", type: "notes" },
                        { id: 7, name: "Module-4 Notes ( Multimedia Communication)", desc: "Multimedia Communication Module-4 Notes", link: "https://drive.google.com/file/d/1-f7ZifRFrcSno7VUUfHoW3KipzCGFJdF/view?usp=drive_link", type: "notes" },
                        { id: 8, name: "Module-5 Notes ( Multimedia Communication)", desc: "Multimedia Communication Module-5 Notes", link: "https://drive.google.com/file/d/1C670v6bq_zqucwDyVhU5xI3ee4jLIg6a/view?usp=drive_link", type: "notes" },
                        { id: 9, name: "MMC Module wise Question Bank", desc: "Multimedia Communication Module wise Question Bank", link: "https://drive.google.com/file/d/1NengaXAMThwqg7iLyKbn2QDPh1ZxKyV-/view?usp=drive_link", type: "question bank" },
                        { id: 10, name: "MMC Solved Model Question Papers", desc: "Multimedia Communication Solved Model Question Papers", link: "https://drive.google.com/file/d/18sUeIHdOf6V9KxIySVREyv0bXuuY7Ufb/view?usp=drive_link", type: "solved MQP" },
                    ] },
                     { name: "Integrated Waste Management for a Smart City", code: "BCV654C", credits: "3 CR", slug: "integrated-waste-management-for-a-smart-city-iwmsc-bcv654c-vtu-notes", modules: [
                        { id: 1, name: "Module-1 Notes-1 Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-1 Notes", link: "https://drive.google.com/file/d/1-w7Y5pGlifiKP3TeHG63kYE_E8sr4xMD/view?usp=drive_link", type: "notes" },
                        { id: 2, name: "Module-1 Notes-2 Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-1 Notes", link: "https://drive.google.com/file/d/1EkHq7AxThmr62eYxwP0rb3vl-DbUPyD9/view?usp=drive_link", type: "notes" },
                        { id: 3, name: "Module-2 Notes Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-2 Notes", link: "https://drive.google.com/file/d/1bm5mOD5EUTjSrUhbPKlXBihOtrdfg00H/view?usp=drive_link", type: "notes" },
                        { id: 4, name: "Module-3 Notes Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-3 Notes", link: "https://drive.google.com/file/d/1sJ94FygXJKpESIlIzZ18ic5kRCOxSPhX/view?usp=drive_link", type: "notes" },
                        { id: 5, name: "Module-4 Notes Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-4 Notes", link: "https://drive.google.com/file/d/1FNy4igSIz-2Jc42T2tYq9cF2Gg7acpvk/view?usp=drive_link", type: "notes" },
                        { id: 6, name: "Module-5 Notes Integrated Waste Management for a Smart City-bcv654c", desc: "Integrated Waste Management for a Smart City Module-5 Notes", link: "https://drive.google.com/file/d/1BOvYV2X4Y5RwOpOMLiS-mqjx1kCgpQ-v/view?usp=drive_link", type: "notes" }
                     ] },
                    { name: "Computer and Data Security", code: "BEC613B", credits: "3 CR", slug: "computer-and-data-security-cds-bec613b-vtu-notes", modules: [] },
                    { name: "Digital Image Processing", code: "BEC613C", credits: "3 CR", slug: "digital-image-processing-dip-bec613c-vtu-notes", modules: [] },
                    { name: "FPGA System Design using Verilog", code: "BEC613D", credits: "3 CR", slug: "fpga-system-design-using-verilog-fsdv-bec613d-vtu-notes", modules: [] },
                    { name: "Digital System Design using Verilog", code: "BEC654A", credits: "3 CR", slug: "digital-system-design-using-verilog-dsdv-bec654a-vtu-notes", modules: [] },
                    { name: "Consumer Electronics", code: "BEC654B", credits: "3 CR", slug: "consumer-electronics-ce-bec654b-vtu-notes", modules: [] },
                    { name: "Electronic Communication Systems", code: "BEC654C", credits: "3 CR", slug: "electronic-communication-systems-ecs-bec654c-vtu-notes", modules: [] },
                    { name: "Basic VLSI Design", code: "BEC654D", credits: "3 CR", slug: "basic-vlsi-design-bvd-bec654d-vtu-notes", modules: [] },
                    { name: "FPGA System Design using Verilog Lab", code: "BECL657A", credits: "1 CR", slug: "fpga-system-design-using-verilog-lab-fsdvl-becl657a-vtu-notes", modules: [] },
                    { name: "System Modelling using Simulink", code: "BECL657B", credits: "1 CR", slug: "system-modelling-using-simulink-sms-becl657b-vtu-notes", modules: [] },
                    { name: "IoT Laboratory", code: "BECL657C", credits: "1 CR", slug: "iot-laboratory-il-becl657c-vtu-notes", modules: [] },
                    { name: "Python Programming for Machine Learning Applications", code: "BECL657D", credits: "1 CR", slug: "python-programming-for-machine-learning-applications-ppmla-becl657d-vtu-notes", modules: [] }
                ]
            }
        ]
    },
    eee: {
        title: "Electrical & Electronics",
        semesters: [
            {
                sem: 3,
                subjects: [
                    { name: "Engineering Mathematics for EEE", code: "BEE301", credits: "4 CR", slug: "engineering-mathematics-for-eee-em-bee301-vtu-notes", modules: [] },
                    { name: "Electric Circuit Analysis", code: "BEE302", credits: "4 CR", slug: "electric-circuit-analysis-eca-bee302-vtu-notes", modules: [] },
                    { name: "Analog Electronic Circuits", code: "BEE303", credits: "4 CR", slug: "analog-electronic-circuits-aec-bee303-vtu-notes", modules: [] },
                    { name: "Transformers and Generators", code: "BEE304", credits: "4 CR", slug: "transformers-and-generators-tg-bee304-vtu-notes", modules: [] },
                    { name: "Transformers and Generators Lab", code: "BEEL305", credits: "1 CR", slug: "transformers-and-generators-lab-tgl-beel305-vtu-notes", modules: [] },
                    { name: "Digital Logic Circuits", code: "BEE306A", credits: "3 CR", slug: "digital-logic-circuits-dlc-bee306a-vtu-notes", modules: [] },
                    { name: "Electrical Measurements and Instrumentation", code: "BEE306B", credits: "3 CR", slug: "electrical-measurements-and-instrumentation-emi-bee306b-vtu-notes", modules: [] },
                    { name: "Electromagnetic Field Theory", code: "BEE306C", credits: "3 CR", slug: "electromagnetic-field-theory-eft-bee306c-vtu-notes", modules: [] },
                    { name: "Physics of Electronic Devices", code: "BEE306D", credits: "3 CR", slug: "physics-of-electronic-devices-ped-bee306d-vtu-notes", modules: [] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [
                         { id: 1, name: "BSCK307 complete notes", desc: "Complete notes for BSCK307", link: "https://drive.google.com/file/d/1p-LiWAcbwBr7RI-Ovma2THmyoUlfK8RZ/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "SCI LAB/MATLAB for Transformers and Generators", code: "BEEL358A", credits: "1 CR", slug: "sci-lab-matlab-for-transformers-and-generators-slmtg-beel358a-vtu-notes", modules: [] },
                    { name: "555 IC Laboratory", code: "BEEL358B", credits: "1 CR", slug: "555-ic-laboratory-555ic-beel358b-vtu-notes", modules: [] },
                    { name: "Circuit Laboratory using P Spice", code: "BEEL358C", credits: "1 CR", slug: "circuit-laboratory-using-p-spice-clups-beel358c-vtu-notes", modules: [] },
                    { name: "Electrical Hardware Laboratory", code: "BEEL358D", credits: "1 CR", slug: "electrical-hardware-laboratory-ehl-beel358d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Electric Motors", code: "BEE401", credits: "4 CR", slug: "electric-motors-em-bee401-vtu-notes", modules: [] },
                    { name: "Transmission and Distribution", code: "BEE402", credits: "4 CR", slug: "transmission-and-distribution-td-bee402-vtu-notes", modules: [] },
                    { name: "Microcontrollers", code: "BEE403", credits: "4 CR", slug: "microcontrollers-mc-bee403-vtu-notes", modules: [] },
                    { name: "Electric Motors Lab", code: "BEEL404", credits: "1 CR", slug: "electric-motors-lab-eml-beel404-vtu-notes", modules: [] },
                    { name: "Electrical Power Generation and Economics", code: "BEE405A", credits: "3 CR", slug: "electrical-power-generation-and-economics-epge-bee405a-vtu-notes", modules: [] },
                    { name: "Op-Amp and LIC", code: "BEE405B", credits: "3 CR", slug: "op-amp-and-lic-oal-bee405b-vtu-notes", modules: [] },
                    { name: "Engineering Materials", code: "BEE405C", credits: "3 CR", slug: "engineering-materials-em-bee405c-vtu-notes", modules: [] },
                    { name: "Object Oriented Programming", code: "BEE405D", credits: "3 CR", slug: "object-oriented-programming-oop-bee405d-vtu-notes", modules: [] },
                    { name: "Biology For Engineers", code: "BBOK407", credits: "3 CR", slug: "biology-for-engineers-bfe-bbok407-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Introduction to Biology (notes-1)", desc: "BBOK407 Module-1 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/10QbZqN8HiRyy7V-FjYcRz_ByAZnJOLF1/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Introduction to Biology (notes-2)", desc: "BBOK407 Module-1 Notes by SVIT", link: "https://drive.google.com/file/d/10n_XykmgSqGkcoeMs8ID_H9vyzbpMD8J/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Biomolecules and Their Application (notes-1)", desc: "BBOK407 Module-2 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1yMT6xwiFPfp2DykcWRCHMgs4YqUKtwWu/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 2: Biomolecules and Their Application (notes-2)", desc: "BBOK407 Module-2 Notes by SVIT", link: "https://drive.google.com/file/d/1oVjwS5gc96_V9cbiSRsfB5AooYqGVmv9/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 3: Human Organ Systems and Bio Design (notes-1)", desc: "BBOK407 Module-3 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/17xIU7ouxr49T6Jh0e8ooorYHG7EBHCyV/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Module 3: Human Organ Systems and Bio Design (notes-2)", desc: "BBOK407 Module-3 Notes by SVIT", link: "https://drive.google.com/file/d/14VujeZybDMdawC4_s5b-B6WsvNILcy1e/view?usp=drive_link", type: "Notes" },
                        { id: 7, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-1)", desc: "BBOK407 Module-4 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1neqKOvQ0JG6h_ILTst2PiTsJmHecMXtO/view?usp=drive_link", type: "Notes" },
                        { id: 8, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-2)", desc: "BBOK407 Module-4 Notes by SVIT", link: "https://drive.google.com/file/d/1e81Ew-svatK4-Bo87i0N9v42tz2GbQ0P/view?usp=drive_link", type: "Notes" },
                        { id: 9, name: "Module 5: Trends in bioengineering (notes-1)", desc: "BBOK407 Module-5 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/12fcJyfZwsEDQt16kOS_XY6CIfCF-owhh/view?usp=drive_link", type: "Notes" },
                        { id: 10, name: "Module 5: Trends in bioengineering (notes-2)", desc: "BBOK407 Module-5 Notes by SVIT", link: "https://drive.google.com/file/d/1tDH7DjIKKzcvs6Vd7qnWK-2Lb9pa9wcj/view?usp=drive_link", type: "Notes" },
                        { id: 11, name: "bbok407 QUESTION BANK", desc: "bbok407 QUESTION BANK", link: "https://drive.google.com/file/d/12pDGS24Y3vuPQs6tk5GpHztaMxYZtZhf/view?usp=drive_linkn", type: "question bank" },
                    ] },
                    { name: "Universal Human Values", code: "BUHK408", credits: "1 CR", slug: "universal-human-values-uhv-buhk408-vtu-notes", modules: [] },
                    { name: "Basics of VHDL Lab", code: "BEEL456A", credits: "1 CR", slug: "basics-of-vhdl-lab-bvl-beel456a-vtu-notes", modules: [] },
                    { name: "Sci Lab / MATLAB for Electrical and Electronic Measurements", code: "BEEL456B", credits: "1 CR", slug: "sci-lab-matlab-for-electrical-and-electronic-measurements-slme-beel456b-vtu-notes", modules: [] },
                    { name: "PCB Design Laboratory", code: "BEEL456C", credits: "1 CR", slug: "pcb-design-laboratory-pdl-beel456c-vtu-notes", modules: [] },
                    { name: "Aurdino & Rasberry PI Based Projects", code: "BEEL456D", credits: "1 CR", slug: "aurdino-and-rasberry-pi-based-projects-arpbp-beel456d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 5,
                subjects: [
                    { name: "Engineering Management and Entrepreneurship", code: "BEE501", credits: "4 CR", slug: "engineering-management-and-entrepreneurship-eme-bee501-vtu-notes", modules: [] },
                    { name: "Signals & DSP", code: "BEE502", credits: "4 CR", slug: "signals-and-dsp-sdsp-bee502-vtu-notes", modules: [] },
                    { name: "Power Electronics", code: "BEE503", credits: "4 CR", slug: "power-electronics-pe-bee503-vtu-notes", modules: [] },
                    { name: "Power Electronics Lab", code: "BEEL504", credits: "1 CR", slug: "power-electronics-lab-pel-beel504-vtu-notes", modules: [] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [
                            { id: 1, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by Dr. Shantha Kumari K AJIET, Mangalore", link: "https://drive.google.com/file/d/1m6U0KPFjF-SKFEZ7GrG_lzWpEeIAX7kz/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by ATMECE, Mysuru", link: "https://drive.google.com/file/d/1652-Bv4HJ-vhaYN3I7ptpPyDjMdvdGmc/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "RM&IPR brmk557 Textbook pdf", desc: "Textbook pdf for RM&IPR brmk557", link: "https://drive.google.com/file/d/1xuZPGNAiFpSIuXoa4VNaRjgol8Ew5s97/view?usp=drive_link", type: "textbook" },
                            { id: 4, name: "Dec/Jan 2025 question paper Scheme of Evaluation", desc: "Dec/Jan 2025 question paper Scheme of Evaluation", link: "https://drive.google.com/file/d/1wGMuFz7PX6wwW8djyeETdMwONtO64wAI/view?usp=drive_link", type: "Scheme of Evaluation" },
                            { id: 5, name: "PYQP & MQP", desc: "Previous year question paper & Model question paper", link: "https://drive.google.com/file/d/1Tk1MlqDUbOnEXalQQbyXm_2AeBkxVvD9/view?usp=drive_link", type: "PYQP & MQP" },
                            { id: 6, name: "Module 1: Notes", desc: "Notes for Module 1 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1oDCFunacrTWH2itSz-hUeAy2sGsSNDUh/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 2: Notes", desc: "Notes for Module 2 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/10ip6yTP22Mm1asXjPhfDzl3N5TMhu40-/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 3: Notes", desc: "Notes for Module 3 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/116h8OALGr6Bov6pDYtwD5DVEDAXzC8xo/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 4: Notes", desc: "Notes for Module 4 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/117ZDYOIqOXBXtfNc9LQSZjCH1yIf226q/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Module 5: Notes", desc: "Notes for Module 5 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1WScqBzQelRuJbQinkMUS4PhJE4dXgBDo/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Environmental Studies", code: "BESK508", credits: "1 CR", slug: "environmental-studies-es-besk508-vtu-notes", modules: [] },
                    { name: "High Voltage Engineering", code: "BEE515A", credits: "3 CR", slug: "high-voltage-engineering-hve-bee515a-vtu-notes", modules: [] },
                    { name: "Power Electronics for Renewable Energy Systems", code: "BEE515B", credits: "3 CR", slug: "power-electronics-for-renewable-energy-systems-peres-bee515b-vtu-notes", modules: [] },
                    { name: "Electric Vehicle Fundamentals", code: "BEE515C", credits: "3 CR", slug: "electric-vehicle-fundamentals-evf-bee515c-vtu-notes", modules: [] },
                    { name: "Fundamentals of VLSI Design", code: "BEE515D", credits: "3 CR", slug: "fundamentals-of-vlsi-design-fvd-bee515d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 6,
                subjects: [
                    { name: "Power System Analysis - I", code: "BEE601", credits: "4 CR", slug: "power-system-analysis-i-psa1-bee601-vtu-notes", modules: [] },
                    { name: "Control Systems", code: "BEE602", credits: "4 CR", slug: "control-systems-cs-bee602-vtu-notes", modules: [] },
                    { name: "Control System Lab", code: "BEEL606", credits: "1 CR", slug: "control-system-lab-csl-beel606-vtu-notes", modules: [] },
                    { name: "Indian Knowledge System", code: "BIKS609", credits: "1 CR", slug: "indian-knowledge-system-iks-biks609-vtu-notes", modules: [] },
                    { name: "Medium Voltage Substation Design", code: "BEE613A", credits: "3 CR", slug: "medium-voltage-substation-design-mvsd-bee613a-vtu-notes", modules: [] },
                    { name: "Embedded System Design", code: "BEE613B", credits: "3 CR", slug: "embedded-system-design-esd-bee613b-vtu-notes", modules: [] },
                    { name: "FACTS and HVDC Transmission", code: "BEE613C", credits: "3 CR", slug: "facts-and-hvdc-transmission-fht-bee613c-vtu-notes", modules: [] },
                    { name: "Electric Motor and Drive Systems for Electric Vehicles", code: "BEE613D", credits: "3 CR", slug: "electric-motor-and-drive-systems-for-electric-vehicles-emdsev-bee613d-vtu-notes", modules: [] },
                    { name: "Utilization of Electrical Power", code: "BEE654A", credits: "3 CR", slug: "utilization-of-electrical-power-uep-bee654a-vtu-notes", modules: [] },
                    { name: "Technologies of Renewable Energy Sources", code: "BEE654B", credits: "3 CR", slug: "technologies-of-renewable-energy-sources-tres-bee654b-vtu-notes", modules: [] },
                    { name: "Industrial Servo Control Systems", code: "BEE654C", credits: "3 CR", slug: "industrial-servo-control-systems-iscs-bee654c-vtu-notes", modules: [] },
                    { name: "Semiconductor Devices", code: "BEE654D", credits: "3 CR", slug: "semiconductor-devices-sd-bee654d-vtu-notes", modules: [] },
                    { name: "Open Elective Subjects Mechanical Engg", code: "", credits: "3 CR", slug: "open-elective-subjects-mechanical-engg-oeme-vtu-notes", modules: [] },
                    { name: "Energy Management in Electric Vehicles", code: "BEE657A", credits: "3 CR", slug: "energy-management-in-electric-vehicles-emev-bee657a-vtu-notes", modules: [] },
                    { name: "Simulation of Control of Power Electronics Circuits", code: "BEEL657B", credits: "1 CR", slug: "simulation-of-control-of-power-electronics-circuits-scpec-beel657b-vtu-notes", modules: [] },
                    { name: "Energy Audit Project", code: "BEEL657C", credits: "1 CR", slug: "energy-audit-project-eap-beel657c-vtu-notes", modules: [] },
                    { name: "Project on Renewable Energy Sources", code: "BEEL657D", credits: "1 CR", slug: "project-on-renewable-energy-sources-pres-beel657d-vtu-notes", modules: [] }
                ]
            }
        ]
    },
    mech: { title: "Mechanical Engineering", semesters: [] },
    civil: {
        title: "Civil Engineering",
        semesters: [
            {
                sem: 3,
                subjects: [
                    { name: "Strength of Materials", code: "BCV301", credits: "4 CR", slug: "strength-of-materials-som-bcv301-vtu-notes", modules: [] },
                    { name: "Engineering Survey", code: "BCV302", credits: "4 CR", slug: "engineering-survey-es-bcv302-vtu-notes", modules: [] },
                    { name: "Engineering Geology", code: "BCV303", credits: "4 CR", slug: "engineering-geology-eg-bcv303-vtu-notes", modules: [] },
                    { name: "Water Supply and Waste water Engineering", code: "BCV304", credits: "4 CR", slug: "water-supply-and-waste-water-engineering-wswwe-bcv304-vtu-notes", modules: [] },
                    { name: "Computer Aided Building Planning and Drawing", code: "BCV305", credits: "1 CR", slug: "computer-aided-building-planning-and-drawing-cabpd-bcv305-vtu-notes", modules: [] },
                    { name: "Rural, Urban Planning and Architecture", code: "BCV306A", credits: "3 CR", slug: "rural-urban-planning-and-architecture-rupa-bcv306a-vtu-notes", modules: [] },
                    { name: "Geospatial Techniques in Practice", code: "BCV306B", credits: "3 CR", slug: "geospatial-techniques-in-practice-gtp-bcv306b-vtu-notes", modules: [] },
                    { name: "Sustainable Design Concept for Building Services", code: "BCV306C", credits: "3 CR", slug: "sustainable-design-concept-for-building-services-sdcbs-bcv306c-vtu-notes", modules: [] },
                    { name: "Fire Safety in Buildings", code: "BCV306D", credits: "3 CR", slug: "fire-safety-in-buildings-fsb-bcv306d-vtu-notes", modules: [] },
                    { name: "Data analytics with Excel", code: "BCVL358A", credits: "1 CR", slug: "data-analytics-with-excel-dawe-bcvl358a-vtu-notes", modules: [] },
                    { name: "Smart Urban Infrastructure", code: "BCV358B", credits: "1 CR", slug: "smart-urban-infrastructure-sui-bcv358b-vtu-notes", modules: [] },
                    { name: "Problem Solving with Python", code: "BCVL358C", credits: "1 CR", slug: "problem-solving-with-python-psp-bcvl358c-vtu-notes", modules: [] },
                    { name: "Personality Development for Civil Engineers", code: "BCV358D", credits: "1 CR", slug: "personality-development-for-civil-engineers-pdce-bcv358d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Analysis of Structures", code: "BCV401", credits: "4 CR", slug: "analysis-of-structures-aos-bcv401-vtu-notes", modules: [] },
                    { name: "Fluid Mechanics and Hydraulics", code: "BCV402", credits: "4 CR", slug: "fluid-mechanics-and-hydraulics-fmh-bcv402-vtu-notes", modules: [] },
                    { name: "Transportation Engineering", code: "BCV403", credits: "4 CR", slug: "transportation-engineering-te-bcv403-vtu-notes", modules: [] },
                    { name: "Building Materials Testing Lab", code: "BCVL404", credits: "1 CR", slug: "building-materials-testing-lab-bmtl-bcvl404-vtu-notes", modules: [] },
                    { name: "Finance for Professionals", code: "BCV405A", credits: "3 CR", slug: "finance-for-professionals-ffp-bcv405a-vtu-notes", modules: [] },
                    { name: "Construction Equipment, Plants and Machinery", code: "BCV405B", credits: "3 CR", slug: "construction-equipment-plants-and-machinery-cepm-bcv405b-vtu-notes", modules: [] },
                    { name: "Concreting Techniques & Practices", code: "BCV405C", credits: "3 CR", slug: "concreting-techniques-and-practices-ctp-bcv405c-vtu-notes", modules: [] },
                    { name: "Watershed Management", code: "BCV405D", credits: "3 CR", slug: "watershed-management-wm-bcv405d-vtu-notes", modules: [] },
                    { name: "Biology For Engineers", code: "BBOK407", credits: "3 CR", slug: "biology-for-engineers-bfe-bbok407-vtu-notes", modules: [
                         { id: 1, name: "Module 1: Introduction to Biology (notes-1)", desc: "BBOK407 Module-1 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/10QbZqN8HiRyy7V-FjYcRz_ByAZnJOLF1/view?usp=drive_link", type: "Notes" },
                        { id: 2, name: "Module 1: Introduction to Biology (notes-2)", desc: "BBOK407 Module-1 Notes by SVIT", link: "https://drive.google.com/file/d/10n_XykmgSqGkcoeMs8ID_H9vyzbpMD8J/view?usp=drive_link", type: "Notes" },
                        { id: 3, name: "Module 2: Biomolecules and Their Application (notes-1)", desc: "BBOK407 Module-2 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1yMT6xwiFPfp2DykcWRCHMgs4YqUKtwWu/view?usp=drive_link", type: "Notes" },
                        { id: 4, name: "Module 2: Biomolecules and Their Application (notes-2)", desc: "BBOK407 Module-2 Notes by SVIT", link: "https://drive.google.com/file/d/1oVjwS5gc96_V9cbiSRsfB5AooYqGVmv9/view?usp=drive_link", type: "Notes" },
                        { id: 5, name: "Module 3: Human Organ Systems and Bio Design (notes-1)", desc: "BBOK407 Module-3 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/17xIU7ouxr49T6Jh0e8ooorYHG7EBHCyV/view?usp=drive_link", type: "Notes" },
                        { id: 6, name: "Module 3: Human Organ Systems and Bio Design (notes-2)", desc: "BBOK407 Module-3 Notes by SVIT", link: "https://drive.google.com/file/d/14VujeZybDMdawC4_s5b-B6WsvNILcy1e/view?usp=drive_link", type: "Notes" },
                        { id: 7, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-1)", desc: "BBOK407 Module-4 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/1neqKOvQ0JG6h_ILTst2PiTsJmHecMXtO/view?usp=drive_link", type: "Notes" },
                        { id: 8, name: "Module 4: Nature-Bio Inspired Materials and Mechanisms. (notes-2)", desc: "BBOK407 Module-4 Notes by SVIT", link: "https://drive.google.com/file/d/1e81Ew-svatK4-Bo87i0N9v42tz2GbQ0P/view?usp=drive_link", type: "Notes" },
                        { id: 9, name: "Module 5: Trends in bioengineering (notes-1)", desc: "BBOK407 Module-5 Notes by RV Institute of Technology and Management", link: "https://drive.google.com/file/d/12fcJyfZwsEDQt16kOS_XY6CIfCF-owhh/view?usp=drive_link", type: "Notes" },
                        { id: 10, name: "Module 5: Trends in bioengineering (notes-2)", desc: "BBOK407 Module-5 Notes by SVIT", link: "https://drive.google.com/file/d/1tDH7DjIKKzcvs6Vd7qnWK-2Lb9pa9wcj/view?usp=drive_link", type: "Notes" },
                        { id: 11, name: "bbok407 QUESTION BANK", desc: "bbok407 QUESTION BANK", link: "https://drive.google.com/file/d/12pDGS24Y3vuPQs6tk5GpHztaMxYZtZhf/view?usp=drive_linkn", type: "question bank" },
                    ] },
                    { name: "Universal Human Values", code: "BUHK408", credits: "1 CR", slug: "universal-human-values-uhv-buhk408-vtu-notes", modules: [] },
                    { name: "Building Information Modelling in Civil Engineering", code: "BCVL456A", credits: "1 CR", slug: "building-information-modelling-in-civil-engineering-bimce-bcvl456a-vtu-notes", modules: [] },
                    { name: "GIS with Quantum GIS", code: "BCV456B", credits: "1 CR", slug: "gis-with-quantum-gis-gqg-bcv456b-vtu-notes", modules: [] },
                    { name: "Electronic Waste Management", code: "BCV456C", credits: "1 CR", slug: "electronic-waste-management-ewm-bcv456c-vtu-notes", modules: [] },
                    { name: "Technical Writing Skills", code: "BCV456D", credits: "1 CR", slug: "technical-writing-skills-tws-bcv456d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 5,
                subjects: [
                    { name: "Construction Management and Entrepreneurship", code: "BCV501", credits: "3 CR", slug: "construction-management-and-entrepreneurship-cme-bcv501-vtu-notes", modules: [] },
                    { name: "Geotechnical Engineering", code: "BCV502", credits: "4 CR", slug: "geotechnical-engineering-ge-bcv502-vtu-notes", modules: [] },
                    { name: "Concrete Technology", code: "BCV503", credits: "3 CR", slug: "concrete-technology-ct-bcv503-vtu-notes", modules: [] },
                    { name: "Environmental Engineering Lab", code: "BCVL504", credits: "1 CR", slug: "environmental-engineering-lab-eel-bcvl504-vtu-notes", modules: [] },
                    { name: "Numerical Methods in Civil Engineering", code: "BCV515A", credits: "3 CR", slug: "numerical-methods-in-civil-engineering-nmce-bcv515a-vtu-notes", modules: [] },
                    { name: "Occupational Safety and Health Monitoring", code: "BCV515B", credits: "3 CR", slug: "occupational-safety-and-health-monitoring-oshm-bcv515b-vtu-notes", modules: [] },
                    { name: "Solid Waste Management", code: "BCV515C", credits: "3 CR", slug: "solid-waste-management-swm-bcv515c-vtu-notes", modules: [] },
                    { name: "Remote Sensing and GIS", code: "BCV515D", credits: "3 CR", slug: "remote-sensing-and-gis-rsg-bcv515d-vtu-notes", modules: [] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [
                        { id: 1, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by Dr. Shantha Kumari K AJIET, Mangalore", link: "https://drive.google.com/file/d/1m6U0KPFjF-SKFEZ7GrG_lzWpEeIAX7kz/view?usp=drive_link", type: "Notes" },
                            { id: 2, name: "RM&IPR brmk557 Complete notes", desc: "Complete notes for RM&IPR brmk557 by ATMECE, Mysuru", link: "https://drive.google.com/file/d/1652-Bv4HJ-vhaYN3I7ptpPyDjMdvdGmc/view?usp=drive_link", type: "Notes" },
                            { id: 3, name: "RM&IPR brmk557 Textbook pdf", desc: "Textbook pdf for RM&IPR brmk557", link: "https://drive.google.com/file/d/1xuZPGNAiFpSIuXoa4VNaRjgol8Ew5s97/view?usp=drive_link", type: "textbook" },
                            { id: 4, name: "Dec/Jan 2025 question paper Scheme of Evaluation", desc: "Dec/Jan 2025 question paper Scheme of Evaluation", link: "https://drive.google.com/file/d/1wGMuFz7PX6wwW8djyeETdMwONtO64wAI/view?usp=drive_link", type: "Scheme of Evaluation" },
                            { id: 5, name: "PYQP & MQP", desc: "Previous year question paper & Model question paper", link: "https://drive.google.com/file/d/1Tk1MlqDUbOnEXalQQbyXm_2AeBkxVvD9/view?usp=drive_link", type: "PYQP & MQP" },
                            { id: 6, name: "Module 1: Notes", desc: "Notes for Module 1 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1oDCFunacrTWH2itSz-hUeAy2sGsSNDUh/view?usp=drive_link", type: "Notes" },
                            { id: 7, name: "Module 2: Notes", desc: "Notes for Module 2 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/10ip6yTP22Mm1asXjPhfDzl3N5TMhu40-/view?usp=drive_link", type: "Notes" },
                            { id: 8, name: "Module 3: Notes", desc: "Notes for Module 3 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/116h8OALGr6Bov6pDYtwD5DVEDAXzC8xo/view?usp=drive_link", type: "Notes" },
                            { id: 9, name: "Module 4: Notes", desc: "Notes for Module 4 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/117ZDYOIqOXBXtfNc9LQSZjCH1yIf226q/view?usp=drive_link", type: "Notes" },
                            { id: 10, name: "Module 5: Notes", desc: "Notes for Module 5 by Dr. Suresha V, Professor, Dept. of E&C. K V G C E, Sullia", link: "https://drive.google.com/file/d/1WScqBzQelRuJbQinkMUS4PhJE4dXgBDo/view?usp=drive_link", type: "Notes" },
                    ] },
                    { name: "Environmental Studies", code: "BESK508", credits: "1 CR", slug: "environmental-studies-es-besk508-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 6,
                subjects: [
                    { name: "Design of RCC Structures", code: "BCV601", credits: "4 CR", slug: "design-of-rcc-structures-drs-bcv601-vtu-notes", modules: [] },
                    { name: "Irrigation Engineering and Hydraulic Structures", code: "BCV602", credits: "4 CR", slug: "irrigation-engineering-and-hydraulic-structures-iehs-bcv602-vtu-notes", modules: [] },
                    { name: "Software Application Lab", code: "BCVL606", credits: "1 CR", slug: "software-application-lab-sal-bcvl606-vtu-notes", modules: [] },
                    { name: "Indian Knowledge System", code: "BIKS609", credits: "1 CR", slug: "indian-knowledge-system-iks-biks609-vtu-notes", modules: [] },
                    { name: "Design of Bridges", code: "BCV613A", credits: "3 CR", slug: "design-of-bridges-db-bcv613a-vtu-notes", modules: [] },
                    { name: "Design of formwork and scaffolding", code: "BCV613B", credits: "3 CR", slug: "design-of-formwork-and-scaffolding-dfs-bcv613b-vtu-notes", modules: [] },
                    { name: "Applied Geotechnical Engineering", code: "BCV613C", credits: "3 CR", slug: "applied-geotechnical-engineering-age-bcv613c-vtu-notes", modules: [] },
                    { name: "Design and Construction of Highway Pavements", code: "BCV613D", credits: "3 CR", slug: "design-and-construction-of-highway-pavements-dchp-bcv613d-vtu-notes", modules: [] },
                    { name: "Water Conservation and Rainwater Harvesting", code: "BCV654A", credits: "3 CR", slug: "water-conservation-and-rainwater-harvesting-wcrh-bcv654a-vtu-notes", modules: [] },
                    { name: "Geographic Information Systems", code: "BCV654B", credits: "3 CR", slug: "geographic-information-systems-gis-bcv654b-vtu-notes", modules: [] },
                    { name: "Integrated Waste Management for a Smart City", code: "BCV654C", credits: "3 CR", slug: "integrated-waste-management-for-a-smart-city-iwmsc-bcv654c-vtu-notes", modules: [] },
                    { name: "Sustainable Development Goals", code: "BCV654D", credits: "3 CR", slug: "sustainable-development-goals-sdg-bcv654d-vtu-notes", modules: [] },
                    { name: "Open Elective Subjects Mechanical Engg", code: "", credits: "3 CR", slug: "open-elective-subjects-mechanical-engg-oeme-vtu-notes", modules: [] },
                    { name: "Building Information Modelling - Advanced", code: "BCV657A", credits: "1 CR", slug: "building-information-modelling-advanced-bima-bcv657a-vtu-notes", modules: [] },
                    { name: "Structural Health Monitoring Using Sensors", code: "BCV657B", credits: "1 CR", slug: "structural-health-monitoring-using-sensors-shms-bcv657b-vtu-notes", modules: [] },
                    { name: "Data Analytics for Civil Engineers", code: "BCV657C", credits: "1 CR", slug: "data-analytics-for-civil-engineers-dace-bcv657c-vtu-notes", modules: [] },
                    { name: "Quality Control and Quality Assurance", code: "BCV657D", credits: "1 CR", slug: "quality-control-and-quality-assurance-qcqa-bcv657d-vtu-notes", modules: [] }
                ]
            }
        ]
    },
    aiml: {
        title: "Artificial Intelligence & Machine Learning",
        semesters: []
    }
};
;