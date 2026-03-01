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
                    {
                        name: "Mathematics for Computer Science", code: "BCS301", credits: "4 CR", slug: "maths-for-cs", modules: [
                            { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/1LgmPpbI6THNmfL-hPTJQyc6mh9DYjZYT/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "#", type: "Notes", essential: true },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", size: "3.5 MB", date: "2024-01-20", link: "#", type: "Notes", essential: true }
                        ]
                    },
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
    ece: {
        title: "Electronics & Communication",
        semesters: [
            {
                sem: 3,
                subjects: [
                    { name: "Digital System Design using Verilog", code: "BEC302", credits: "4 CR", slug: "digital-system-design-using-verilog-dsdv-bec302-vtu-notes", modules: [] },
                    { name: "Electronic Principles and Circuits", code: "BEC303", credits: "4 CR", slug: "electronic-principles-and-circuits-epc-bec303-vtu-notes", modules: [] },
                    { name: "Network Analysis", code: "BEC304", credits: "4 CR", slug: "network-analysis-na-bec304-vtu-notes", modules: [] },
                    { name: "Electronic Devices", code: "BEC306A", credits: "3 CR", slug: "electronic-devices-ed-bec306a-vtu-notes", modules: [] },
                    { name: "Sensors and Instrumentation", code: "BEC306B", credits: "3 CR", slug: "sensors-and-instrumentation-si-bec306b-vtu-notes", modules: [] },
                    { name: "Computer Organization and Architecture", code: "BEC306C", credits: "3 CR", slug: "computer-organization-and-architecture-coa-bec306c-vtu-notes", modules: [] },
                    { name: "Applied Numerical Methods for EC Engineers", code: "BEC306D", credits: "3 CR", slug: "applied-numerical-methods-for-ec-engineers-anme-bec306d-vtu-notes", modules: [] },
                    { name: "LabVIEW Programming", code: "BEC358A", credits: "1 CR", slug: "labview-programming-lp-bec358a-vtu-notes", modules: [] },
                    { name: "MATLAB Programming", code: "BEC358B", credits: "1 CR", slug: "matlab-programming-mp-bec358b-vtu-notes", modules: [] },
                    { name: "C++ Basics", code: "BEC358C", credits: "1 CR", slug: "c-plus-plus-basics-cpp-bec358c-vtu-notes", modules: [] },
                    { name: "IOT for Smart Infrastructure", code: "BEC358D", credits: "1 CR", slug: "iot-for-smart-infrastructure-iot-bec358d-vtu-notes", modules: [] },
                    { name: "Analog and Digital Systems Design Lab", code: "BECL305", credits: "1 CR", slug: "analog-and-digital-systems-design-lab-adsdl-becl305-vtu-notes", modules: [] },
                    { name: "AV Mathematics-III for EC Engineering", code: "BMATEC301", credits: "4 CR", slug: "av-mathematics-iii-for-ec-engineering-m3-bmatec301-vtu-notes", modules: [] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Biology For Engineers", code: "BBOK407", credits: "1 CR", slug: "biology-for-engineers-be-bbok407-vtu-notes", modules: [] },
                    { name: "Electromagnetics Theory", code: "BEC401", credits: "3 CR", slug: "electromagnetics-theory-et-bec401-vtu-notes", modules: [] },
                    { name: "Principles of Communication Systems", code: "BEC402", credits: "4 CR", slug: "principles-of-communication-systems-pcs-bec402-vtu-notes", modules: [] },
                    { name: "Control Systems", code: "BEC403", credits: "4 CR", slug: "control-systems-cs-bec403-vtu-notes", modules: [] },
                    { name: "Microcontrollers", code: "BEC405A", credits: "3 CR", slug: "microcontrollers-mc-bec405a-vtu-notes", modules: [] },
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
                    { name: "Digital Communication", code: "BEC503", credits: "3 CR", slug: "digital-communication-dc-bec503-vtu-notes", modules: [] },
                    { name: "Digital Communication Lab", code: "BECL504", credits: "1 CR", slug: "digital-communication-lab-dcl-becl504-vtu-notes", modules: [] },
                    { name: "Intelligent Systems and Machine Learning Algorithms", code: "BEC515A", credits: "3 CR", slug: "intelligent-systems-and-machine-learning-algorithms-ismla-bec515a-vtu-notes", modules: [] },
                    { name: "Digital Switching and Finite Automata Theory", code: "BEC515B", credits: "3 CR", slug: "digital-switching-and-finite-automata-theory-dsfat-bec515b-vtu-notes", modules: [] },
                    { name: "Data Structure using C++", code: "BEC515C", credits: "3 CR", slug: "data-structure-using-c-plus-plus-dscpp-bec515c-vtu-notes", modules: [] },
                    { name: "Satellite and Optical Communication", code: "BEC515D", credits: "3 CR", slug: "satellite-and-optical-communication-soc-bec515d-vtu-notes", modules: [] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [] },
                    { name: "Environmental Studies", code: "BESK508", credits: "1 CR", slug: "environmental-studies-es-besk508-vtu-notes", modules: [] }
                ]
            }
        ]
    },
    eee: { title: "Electrical & Electronics", semesters: [] },
    mech: { title: "Mechanical Engineering", semesters: [] },
    civil: { title: "Civil Engineering", semesters: [] }
};
