const siteData = {
    firstyear: {
        title: "First Year (P & C Cycle)",
        semesters: [
            {
                sem: 1,
                subjects: [
                    {
                        name: "Mathematics For CSE",
                        code: "BMATS101",
                        credits: "4 CR",
                        slug: "mathematics-for-cse",
                        modules: [
                            { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/1LgmPpbI6THNmfL-hPTJQyc6mh9DYjZYT/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "#", type: "Notes", essential: true },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", size: "3.5 MB", date: "2024-01-20", link: "#", type: "Notes", essential: true }
                        ]
                    },
                    {
                        name: "Applied Physics For CSE",
                        code: "BPHYS102/202",
                        credits: "3 CR",
                        slug: "applied-physics",
                        modules: []
                    },
                    {
                        name: "Principle of Programming Using C",
                        code: "BPOP103/203",
                        credits: "4 CR",
                        slug: "programming-c",
                        modules: []
                    }
                ]
            },
            { sem: 2, subjects: [] }
        ]
    },
    cse: {
        title: "Computer Science & Engineering",
        semesters: [
            {
                sem: 3,
                subjects: [
                    { name: "Mathematics for Computer Science", code: "BCS301", credits: "4 CR", slug: "maths-for-cs", modules: [
                        { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/1LgmPpbI6THNmfL-hPTJQyc6mh9DYjZYT/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "#", type: "Notes", essential: true },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", size: "3.5 MB", date: "2024-01-20", link: "#", type: "Notes", essential: true }
                    ] },
                    { name: "Digital Design & Computer Organization", code: "BCS302", credits: "4 CR", slug: "ddco", modules: [] },
                    { name: "Operating Systems", code: "BCS303", credits: "4 CR", slug: "os", modules: [] },
                    { name: "Data Structures and Applications", code: "BCS304", credits: "4 CR", slug: "data-structures", modules: [] },
                    { name: "Data Structures Lab", code: "BCSL305", credits: "1 CR", slug: "ds-lab", modules: [] },
                    { name: "Object Oriented Programming with Java", code: "BCS306A", credits: "3 CR", slug: "java-programming", modules: [] },
                    { name: "Object Oriented Programming with C++", code: "BCS306B", credits: "3 CR", slug: "cpp-programming", modules: [] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "scr", modules: [] },
                    { name: "Data analytics with Excel", code: "BCS358A", credits: "1 CR", slug: "excel-analytics", modules: [] },
                    { name: "R Programming", code: "BCS358B", credits: "1 CR", slug: "r-programming", modules: [] },
                    { name: "Project Management with Git", code: "BCS358C", credits: "1 CR", slug: "git-management", modules: [] },
                    { name: "Data Visualization with Python", code: "BCS358D", credits: "1 CR", slug: "python-visualization", modules: [] }
                ]
            }
        ]
    },
    ece: { title: "Electronics & Communication", semesters: [] },
    eee: { title: "Electrical & Electronics", semesters: [] },
    mech: { title: "Mechanical Engineering", semesters: [] },
    civil: { title: "Civil Engineering", semesters: [] }
};
