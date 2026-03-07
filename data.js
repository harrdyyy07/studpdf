const siteData = {
    firstyear: {
        title: "First Year (P & C Cycle)",
        schemes: [
            {
                name: "25 Scheme",
                slug: "25-scheme",
                cycles: [
                    { name: "Physics (P) Cycle", slug: "p-cycle", subjects: [] },
                    { name: "Chemistry (C) Cycle", slug: "c-cycle", subjects: [] }
                ]
            },
            {
                name: "22 Scheme",
                slug: "22-scheme",
                cycles: [
                    {
                        name: "Physics (P) Cycle",
                        slug: "p-cycle",
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
                    {
                        name: "Chemistry (C) Cycle",
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
                            { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/1LgmPpbI6THNmfL-hPTJQyc6mh9DYjZYT/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "#", type: "Notes", essential: true },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", size: "3.5 MB", date: "2024-01-20", link: "#", type: "Notes", essential: true }
                        ]
                    },
                    { name: "Digital Design & Computer Organization", code: "BCS302", credits: "4 CR", slug: "digital-design-and-computer-organization-ddco-bcs302-vtu-notes", modules: [] },
                    { name: "Operating Systems", code: "BCS303", credits: "4 CR", slug: "operating-systems-os-bcs303-vtu-notes", modules: [] },
                    { name: "Data Structures and Applications", code: "BCS304", credits: "4 CR", slug: "data-structures-and-applications-dsa-bcs304-vtu-notes", modules: [] },
                    { name: "Data Structures Lab", code: "BCSL305", credits: "1 CR", slug: "data-structures-lab-dsl-bcsl305-vtu-notes", modules: [] },
                    { name: "Object Oriented Programming with Java", code: "BCS306A", credits: "3 CR", slug: "object-oriented-programming-with-java-oopj-bcs306a-vtu-notes", modules: [] },
                    { name: "Object Oriented Programming with C++", code: "BCS306B", credits: "3 CR", slug: "object-oriented-programming-with-c-plus-plus-oopc-bcs306b-vtu-notes", modules: [] },
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [] },
                    { name: "Data analytics with Excel", code: "BCS358A", credits: "1 CR", slug: "data-analytics-with-excel-dawe-bcs358a-vtu-notes", modules: [] },
                    { name: "R Programming", code: "BCS358B", credits: "1 CR", slug: "r-programming-rp-bcs358b-vtu-notes", modules: [] },
                    { name: "Project Management with Git", code: "BCS358C", credits: "1 CR", slug: "project-management-with-git-pmwg-bcs358c-vtu-notes", modules: [] },
                    { name: "Data Visualization with Python", code: "BCS358D", credits: "1 CR", slug: "data-visualization-with-python-dvwp-bcs358d-vtu-notes", modules: [] }
                ]
            },
            {
                sem: 4,
                subjects: [
                    { name: "Analysis & Design of Algorithms", code: "BCS401", credits: "4 CR", slug: "analysis-and-design-of-algorithms-ada-bcs401-vtu-notes", modules: [] },
                    { name: "Microcontrollers", code: "BCS402", credits: "4 CR", slug: "microcontrollers-mc-bcs402-vtu-notes", modules: [] },
                    { name: "Database Management Systems", code: "BCS403", credits: "4 CR", slug: "database-management-systems-dbms-bcs403-vtu-notes", modules: [] },
                    { name: "ADA Lab Manual", code: "BCSL404", credits: "1 CR", slug: "ada-lab-manual-adal-bcsl404-vtu-notes", modules: [] },
                    { name: "Discrete Mathematical Structures", code: "BCS405A", credits: "3 CR", slug: "discrete-mathematical-structures-dms-bcs405a-vtu-notes", modules: [] },
                    { name: "Graph Theory", code: "BCS405B", credits: "3 CR", slug: "graph-theory-gt-bcs405b-vtu-notes", modules: [] },
                    { name: "Optimization Technique", code: "BCS405C", credits: "3 CR", slug: "optimization-technique-ot-bcs405c-vtu-notes", modules: [] },
                    { name: "Linear Algebra", code: "BCS405D", credits: "3 CR", slug: "linear-algebra-la-bcs405d-vtu-notes", modules: [] },
                    { name: "Biology For Computer Engineers", code: "BBOC407", credits: "3 CR", slug: "biology-for-computer-engineers-bce-bboc407-vtu-notes", modules: [] },
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
                    { name: "Software Engineering & Project Management", code: "BCS501", credits: "3 CR", slug: "software-engineering-and-project-management-sepm-bcs501-vtu-notes", modules: [] },
                    { name: "Computer Networks", code: "BCS502", credits: "4 CR", slug: "computer-networks-cn-bcs502-vtu-notes", modules: [] },
                    { name: "Theory of Computation", code: "BCS503", credits: "3 CR", slug: "theory-of-computation-toc-bcs503-vtu-notes", modules: [] },
                    { name: "Web Technology Lab", code: "BCSL504", credits: "1 CR", slug: "web-technology-lab-wtl-bcsl504-vtu-notes", modules: [] },
                    { name: "Computer Graphics", code: "BCS515A", credits: "3 CR", slug: "computer-graphics-cg-bcs515a-vtu-notes", modules: [] },
                    { name: "Artificial Intelligence", code: "BCS515B", credits: "3 CR", slug: "artificial-intelligence-ai-bcs515b-vtu-notes", modules: [] },
                    { name: "Unix System Programming", code: "BCS515C", credits: "3 CR", slug: "unix-system-programming-usp-bcs515c-vtu-notes", modules: [] },
                    { name: "Distributed Systems", code: "BCS515D", credits: "3 CR", slug: "distributed-systems-ds-bcs515d-vtu-notes", modules: [] },
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [] },
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
                            { id: 1, name: "Module 1: Handwritten Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/19aG_zj14r3KY3ZY8ioCW2ppiVNGYzVwR/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 1, name: "Module 1: Notes", desc: "Comprehensive notes for Module 1", size: "4.2 MB", date: "2024-01-15", link: "https://drive.google.com/file/d/1N1e9bwVmir5GJ89XObawHKyNPZv0X2Sc/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Handwritten Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "https://drive.google.com/file/d/1aCnYI5fv-4Zj6mlZEcxRD4gxlTCcGD8t/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 2, name: "Module 2: Notes", desc: "Comprehensive notes for Module 2", size: "3.8 MB", date: "2024-01-18", link: "https://drive.google.com/file/d/1hkzEZMOj_dDnkBVM5vVVYJCDlPXCGiOG/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 3, name: "Module 3: Notes", desc: "Comprehensive notes for Module 3", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1HS3Ai2j_lr16kqGl8_MH1e7GU06PuNDk/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 4, name: "Module 4: Handwritten Notes", desc: "Comprehensive notes for Module 4", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1uNRtCjF5AYSvTZczW8TJ9oF3QxNJKsAY/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 4, name: "Module 4: Notes", desc: "Comprehensive notes for Module 4", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1qYQ1-Y6w163iJf9x4k0d6R2iYQhdtQF5/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 5, name: "Module 5: Handwritten Notes", desc: "Comprehensive notes for Module 5", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1mq1FvxWmzmQeT-9MazGXUznJ8pWJJGnT/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1po9LsKraAOM-gBGGbpmLsAAd234WdiqE/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 5, name: "Module 5: Notes", desc: "Comprehensive notes for Module 5", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1i24ATSpPwiuiVynEgfSjW7bXTUmjKefS/view?usp=drive_link", type: "Notes", essential: true },
                            { id: 5, name: "Model question paper", desc: "Comprehensive notes for Module 5", size: "3.5 MB", date: "2024-01-20", link: "https://drive.google.com/file/d/1mSX-IisWcpGBJ_px13OlLMmNu0IUDD_u/view?usp=drive_link", type: "PYQP", essential: false }]
                    },
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
            },
            {
                sem: 6,
                subjects: [
                    { name: "Embedded System Design", code: "BEC601", credits: "3 CR", slug: "embedded-system-design-esd-bec601-vtu-notes", modules: [] },
                    { name: "VLSI Design and Testing", code: "BEC602", credits: "4 CR", slug: "vlsi-design-and-testing-vdt-bec602-vtu-notes", modules: [] },
                    { name: "VLSI Design and Testing Lab", code: "BECL606", credits: "1 CR", slug: "vlsi-design-and-testing-lab-vdtl-becl606-vtu-notes", modules: [] },
                    { name: "Indian Knowledge System", code: "BIKS609", credits: "1 CR", slug: "indian-knowledge-system-iks-biks609-vtu-notes", modules: [] },
                    { name: "Multimedia Communication", code: "BEC613A", credits: "3 CR", slug: "multimedia-communication-mc-bec613a-vtu-notes", modules: [] },
                    { name: "Computer and Data Security", code: "BEC613B", credits: "3 CR", slug: "computer-and-data-security-cds-bec613b-vtu-notes", modules: [] },
                    { name: "Digital Image Processing", code: "BEC613C", credits: "3 CR", slug: "digital-image-processing-dip-bec613c-vtu-notes", modules: [] },
                    { name: "FPGA System Design using Verilog", code: "BEC613D", credits: "3 CR", slug: "fpga-system-design-using-verilog-fsdv-bec613d-vtu-notes", modules: [] },
                    { name: "Digital System Design using Verilog", code: "BEC654A", credits: "3 CR", slug: "digital-system-design-using-verilog-dsdv-bec654a-vtu-notes", modules: [] },
                    { name: "Consumer Electronics", code: "BEC654B", credits: "3 CR", slug: "consumer-electronics-ce-bec654b-vtu-notes", modules: [] },
                    { name: "Electronic Communication Systems", code: "BEC654C", credits: "3 CR", slug: "electronic-communication-systems-ecs-bec654c-vtu-notes", modules: [] },
                    { name: "Basic VLSI Design", code: "BEC654D", credits: "3 CR", slug: "basic-vlsi-design-bvd-bec654d-vtu-notes", modules: [] },
                    { name: "Open Elective Subjects Mechanical Engg", code: "", credits: "3 CR", slug: "open-elective-subjects-mechanical-engg-oeme-vtu-notes", modules: [] },
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
                    { name: "Social Connect and Responsibility", code: "BSCK307", credits: "1 CR", slug: "social-connect-and-responsibility-scr-bsck307-vtu-notes", modules: [] },
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
                    { name: "Biology For Engineers", code: "BBOK407", credits: "3 CR", slug: "biology-for-engineers-bfe-bbok407-vtu-notes", modules: [] },
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
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [] },
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
                    { name: "Biology For Engineers", code: "BBOK407", credits: "3 CR", slug: "biology-for-engineers-bfe-bbok407-vtu-notes", modules: [] },
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
                    { name: "Research Methodology and IPR", code: "BRMK557", credits: "2 CR", slug: "research-methodology-and-ipr-rmipr-brmk557-vtu-notes", modules: [] },
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
    }
};
