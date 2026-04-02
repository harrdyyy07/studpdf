export interface CalcSubject {
    code: string;
    name: string;
    credits: number;
}

export interface SchemeData {
    [branch: string]: {
        [semester: number]: CalcSubject[];
    };
}

export const calculatorData: { [scheme: string]: SchemeData } = {
    "2022 Scheme": {
        CSE: {
            1: [
                {code: "BMATS101", name: "Mathematics-I for CSE Stream", credits: 4},
                {code: "BPHYS102", name: "Applied Physics / Chemistry for CSE Stream", credits: 4},
                {code: "BPOPS103", name: "Programming in C / Engineering Drawing", credits: 3},
                {code: "BESCK104x", name: "Engineering Science Course-I", credits: 3},
                {code: "BETCK105x", name: "Emerging Tech / Programming Language-I", credits: 3},
                {code: "BENGK106", name: "Communicative English / Professional Writing Skills", credits: 1},
                {code: "BKSKK107", name: "Kannada / Constitution of India", credits: 1},
                {code: "BIDTK158", name: "Innovation and Design Thinking / Health", credits: 1},
                {code: "BNSK359", name: "NSS / Physical Education / Yoga", credits: 0}
            ],
            2: [
                {code: "BMATS201", name: "Mathematics-II for CSE Stream", credits: 4},
                {code: "BCHES202", name: "Applied Chemistry / Physics for CSE Stream", credits: 4},
                {code: "BCEDK203", name: "Engineering Drawing / Programming in C", credits: 3},
                {code: "BESCK204x", name: "Engineering Science Course-II", credits: 3},
                {code: "BPLCK205x", name: "Programming Language-II / Emerging Tech-II", credits: 3},
                {code: "BENGK206", name: "English / Professional Writing Skills", credits: 1},
                {code: "BKSKK207", name: "Kannada / Constitution", credits: 1},
                {code: "BSFHK258", name: "Health Foundations / Innovation and Design Thinking", credits: 1}
            ],
            3: [
                {code: "BCS301", name: "Mathematics for Computer Science", credits: 4},
                {code: "BCS302", name: "Digital Design and Computer Organization", credits: 4},
                {code: "BCS303", name: "Operating Systems", credits: 4},
                {code: "BCS304", name: "Data Structures and Applications", credits: 3},
                {code: "BCSL305", name: "Data Structures Lab", credits: 1},
                {code: "BCS306x", name: "ESC/ETC/PLC (Java, C++ etc.)", credits: 3},
                {code: "BSCK307", name: "Social Connect and Responsibility", credits: 1},
                {code: "BCS358x", name: "AEC/SEC-III (Excel, R, Git, Data Viz)", credits: 1},
                {code: "BNSK359", name: "NSS / Physical Education / Yoga", credits: 0}
            ],
            4: [
                {code: "BCS401", name: "Analysis and Design of Algorithms", credits: 4},
                {code: "BCS402", name: "Microcontrollers", credits: 4},
                {code: "BCS403", name: "Database Management Systems", credits: 4},
                {code: "BCSL404", name: "ADA Lab", credits: 1},
                {code: "BCS405x", name: "ESC/ETC/PLC (Discrete Math, Graph Theory)", credits: 3},
                {code: "BCS456x", name: "AEC/SEC-IV (Green IT, UI/UX, LATEX)", credits: 1},
                {code: "BBOC407", name: "Biology for Computer Engineers", credits: 2},
                {code: "BUHK408", name: "Universal Human Values", credits: 1},
                {code: "BNSK459", name: "NSS / PE / Yoga", credits: 0},
                {code: "BSCK407", name: "Environmental Studies", credits: 1},
                {code: "BCS458x", name: "R Programming", credits: 1}
            ],
            5: [
                {code: "BCS501", name: "Software Engineering and Project Management", credits: 4},
                {code: "BCS502", name: "Computer Networks", credits: 4},
                {code: "BCS503", name: "Theory of Computation", credits: 4},
                {code: "BCSL504", name: "Web Technology Lab", credits: 1},
                {code: "BCS515x", name: "Professional Elective-I (CG, AI, Unix, Distributed Systems)", credits: 3},
                {code: "BCS586", name: "Mini Project", credits: 2},
                {code: "BRMK557", name: "Research Methodology and IPR", credits: 3},
                {code: "BCS508", name: "Environmental Studies and E-Waste Mgmt", credits: 1},
                {code: "BNSK559", name: "NSS / PE / Yoga", credits: 0}
            ],
            6: [
                {code: "BCS601", name: "Cloud Computing (OpenStack/Google)", credits: 4},
                {code: "BCS602", name: "Machine Learning", credits: 4},
                {code: "BCS613x", name: "Professional Elective-II (Blockchain, CV, Compiler, Adv. Java)", credits: 3},
                {code: "BCS654x", name: "Open Elective-I (DS, OS, AI, Mobile App Dev)", credits: 3},
                {code: "BCS685", name: "Project Phase-I", credits: 2},
                {code: "BCSL606", name: "Machine Learning Lab", credits: 1},
                {code: "BCS657x", name: "AEC/SEC-V (React, DevOps, Tosca, Generative AI)", credits: 1},
                {code: "BNSK658", name: "NSS / PE / Yoga", credits: 0},
                {code: "BIKS609", name: "Indian Knowledge System", credits: 0}
            ],
            7: [
                {code: "BCS701", name: "Internet of Things", credits: 4},
                {code: "BCS702", name: "Parallel Computing", credits: 4},
                {code: "BCS703", name: "Cryptography and Network Security", credits: 4},
                {code: "BCS714x", name: "Professional Elective-III (DL, NLP, Big Data, Social Network Analysis)", credits: 3},
                {code: "BCS755x", name: "Open Elective-II (DBMS, Algorithms, SE)", credits: 3},
                {code: "BCS786", name: "Major Project Phase-II", credits: 6}
            ],
            8: [
                {code: "BCS801x", name: "Professional Elective-IV (Online via NPTEL)", credits: 3},
                {code: "BCS802x", name: "Open Elective-III (Online via NPTEL)", credits: 3},
                {code: "BCS803", name: "Internship (Industry/Research/Rural - 14-20 weeks)", credits: 10}
            ]
        },
        AIML: {
            1: [{code: "BMATS101", name: "Mathematics-I for CSE Stream", credits: 4}, {code: "BPHYS102", name: "Applied Physics for CSE Stream", credits: 4}, {code: "BPOPS103", name: "Principles of Programming Using C", credits: 3}, {code: "BESCK104x", name: "Engineering Science Course-I", credits: 3}, {code: "BETCK105x", name: "Emerging Technology Course-I", credits: 3}, {code: "BENGK106", name: "Communicative English", credits: 1}, {code: "BKSKK107", name: "Kannada OR Indian Constitution", credits: 1}, {code: "BIDTK158", name: "Innovation and Design Thinking", credits: 1}],
            2: [{code: "BMATS201", name: "Mathematics-II for CSE Stream", credits: 4}, {code: "BCHES202", name: "Applied Chemistry for CSE Stream", credits: 4}, {code: "BCEDK203", name: "Computer-Aided Engineering Drawing", credits: 3}, {code: "BESCK204x", name: "Engineering Science Course-II", credits: 3}, {code: "BPLCK205x", name: "Programming Language Course-II", credits: 3}, {code: "BPWSK206", name: "Professional Writing Skills in English", credits: 1}, {code: "BICOK207", name: "Indian Constitution", credits: 1}, {code: "BSFHK258", name: "Scientific Foundations of Health", credits: 1}],
            3: [{code: "BCS301", name: "Mathematics for Computer Science", credits: 4}, {code: "BCS302", name: "Digital Design and Computer Organization", credits: 4}, {code: "BCS303", name: "Operating Systems", credits: 4}, {code: "BCS304", name: "Data Structures and Applications", credits: 3}, {code: "BCSL305", name: "Data Structures Lab", credits: 1}, {code: "BCS306x", name: "ESC/ETC/PLC (Elective)", credits: 3}, {code: "BSCK307", name: "Social Connect and Responsibility", credits: 1}, {code: "BXX358x", name: "AEC/SEC-III", credits: 1}, {code: "BNSK359", name: "NSS/Physical Education/Yoga", credits: 0}],
            4: [{code: "BCS401", name: "Analysis and Design of Algorithms", credits: 3}, {code: "BAI402", name: "Artificial Intelligence", credits: 4}, {code: "BCS403", name: "Database Management Systems", credits: 4}, {code: "BCSL404", name: "ADA Lab", credits: 1}, {code: "BCS405x", name: "ESC/ETC/PLC (Elective)", credits: 3}, {code: "BDS456x", name: "AEC/SEC-IV", credits: 1}, {code: "BBOK407", name: "Biology for Engineers", credits: 2}, {code: "BUHK408", name: "Universal Human Values", credits: 1}, {code: "BNSK459", name: "NSS/Physical Education/Yoga", credits: 0}],
            5: [{code: "BCS501", name: "Software Engineering and Project Management", credits: 4}, {code: "BCS502", name: "Computer Networks", credits: 4}, {code: "BCS503", name: "Theory of Computation", credits: 4}, {code: "BAIL504", name: "Data Visualization Lab", credits: 1}, {code: "BXX515x", name: "Professional Elective-I", credits: 3}, {code: "BAI586", name: "Mini Project", credits: 2}, {code: "BRMK557", name: "Research Methodology and IPR", credits: 3}, {code: "BCS508", name: "Environmental Studies and E-Waste Management", credits: 1}, {code: "BNSK559", name: "NSS/Physical Education/Yoga", credits: 0}],
            6: [{code: "BAI601", name: "Natural Language Processing", credits: 4}, {code: "BAI602", name: "Machine Learning-I", credits: 4}, {code: "BXX613x", name: "Professional Elective-II", credits: 3}, {code: "BXX654x", name: "Open Elective-I", credits: 3}, {code: "BAI685", name: "Project Phase-I", credits: 2}, {code: "BAIL606", name: "Machine Learning Lab", credits: 1}, {code: "BXX657x", name: "AEC/SEC-V", credits: 1}, {code: "BNSK658", name: "NSS/Physical Education/Yoga", credits: 0}, {code: "BIKS609", name: "Indian Knowledge System", credits: 0}],
            7: [{code: "BAI701", name: "Deep Learning and Reinforcement Learning", credits: 4}, {code: "BAI702", name: "Machine Learning-II", credits: 4}, {code: "BAD703", name: "Data Security and Privacy", credits: 4}, {code: "BAI714x", name: "Professional Elective-III", credits: 3}, {code: "BAI755x", name: "Open Elective-II", credits: 3}, {code: "BAI786", name: "Major Project Phase-II", credits: 6}],
            8: [{code: "BAI801x", name: "Professional Elective (Online-NPTEL)", credits: 3}, {code: "BAI802x", name: "Open Elective (Online-NPTEL)", credits: 3}, {code: "BAI803", name: "Internship (Industry/Research)", credits: 10}]
        },
        ECE: {
            1: [{code: "BMATS101", name: "Mathematics-I (CSE Stream)", credits: 4}, {code: "BPHYS102", name: "Applied Physics (CSE Stream)", credits: 4}, {code: "BPOPS103", name: "Principles of Programming using C", credits: 3}, {code: "BESCK104x", name: "Engineering Science Course-I (Choose one)", credits: 3}, {code: "BETCK105x", name: "Emerging Tech-I / Programming Lang-I", credits: 3}, {code: "BENGK106", name: "Communicative English / Prof. Writing Skills", credits: 1}, {code: "BKSKK107", name: "Kannada / Constitution", credits: 1}, {code: "BIDTK158", name: "Innovation and Design Thinking / Health Science", credits: 1}],
            2: [{code: "BMATS201", name: "Mathematics-II (CSE Stream)", credits: 4}, {code: "BCHES202", name: "Applied Chemistry (CSE Stream)", credits: 4}, {code: "BCEDK203", name: "Computer-Aided Engineering Drawing", credits: 3}, {code: "BESCK204x", name: "Engineering Science Course-II (Choose one)", credits: 3}, {code: "BPLCK205x", name: "Programming Lang-II / Emerging Tech-II", credits: 3}, {code: "BPWSK206", name: "Prof. Writing Skills / Communicative English", credits: 1}, {code: "BICOK207", name: "Constitution / Kannada", credits: 1}, {code: "BSFHK258", name: "Health Science / Innovation and Design Thinking", credits: 1}],
            3: [{code: "BMATEC301", name: "Mathematics-III for EC", credits: 3}, {code: "BEC302", name: "Digital System Design using Verilog", credits: 4}, {code: "BEC303", name: "Electronic Principles and Circuits", credits: 4}, {code: "BEC304", name: "Network Analysis", credits: 3}, {code: "BECL305", name: "Analog and Digital Systems Design Lab", credits: 1}, {code: "BEC306x", name: "ESC/ETC/PLC (Electronics Devices / Sensors / COA / Applied Numerical)", credits: 3}, {code: "BSCK307", name: "Social Connect & Responsibility", credits: 1}, {code: "BEC358x", name: "AEC/SEC \u2013 III (LabVIEW, MATLAB, C++, IoT, etc.)", credits: 1}, {code: "BNSK359", name: "NSS / Physical Education / Yoga (Mandatory, Non-credit)", credits: 0}],
            4: [{code: "BEC401", name: "Electromagnetics Theory", credits: 3}, {code: "BEC402", name: "Principles of Communication Systems", credits: 4}, {code: "BEC403", name: "Control Systems", credits: 4}, {code: "BECL404", name: "Communication Lab", credits: 1}, {code: "BEC405x", name: "ESC/ETC/PLC (Microcontrollers / OS / Industrial Electronics / DS in C)", credits: 3}, {code: "BEC456x", name: "AEC/SEC \u2013 IV (MC Lab / PLC / Octave / DS Lab in C)", credits: 1}, {code: "BBOK407", name: "Biology for Engineers", credits: 3}, {code: "BUHK408", name: "Universal Human Values", credits: 1}, {code: "BNSK459", name: "NSS / Physical Education / Yoga (Mandatory, Non-credit)", credits: 0}],
            5: [{code: "BEC501", name: "Technological Innovation & Management Entrepreneurship", credits: 3}, {code: "BEC502", name: "Digital Signal Processing", credits: 4}, {code: "BEC503", name: "Digital Communication", credits: 4}, {code: "BECL504", name: "Digital Communication Lab", credits: 1}, {code: "BEC515x", name: "Professional Elective \u2013 I", credits: 3}, {code: "BEC586", name: "Mini Project", credits: 2}, {code: "BRMK557", name: "Research Methodology & IPR", credits: 3}, {code: "BESK508", name: "Environmental Studies (Mandatory)", credits: 2}, {code: "BNSK559", name: "NSS / Physical Education / Yoga (Mandatory, Non-credit)", credits: 0}],
            6: [{code: "BEC601", name: "Embedded System Design", credits: 4}, {code: "BEC602", name: "VLSI Design and Testing", credits: 4}, {code: "BEC613x", name: "Professional Elective \u2013 II", credits: 3}, {code: "BEC654x", name: "Open Elective \u2013 I", credits: 3}, {code: "BEC685", name: "Major Project Phase \u2013 I", credits: 2}, {code: "BECL606", name: "VLSI Design & Testing Lab", credits: 1}, {code: "BEC657x", name: "AEC/SEC \u2013 V (FPGA / IoT / Simulink / Python for ML)", credits: 1}, {code: "BNSK658", name: "NSS / Physical Education / Yoga (Mandatory, Non-credit)", credits: 0}, {code: "BIKS609", name: "Indian Knowledge System (Mandatory, Non-credit)", credits: 0}],
            7: [{code: "BEC701", name: "Microwave Engineering and Antenna Theory", credits: 4}, {code: "BEC702", name: "Computer Networks & Protocols", credits: 4}, {code: "BEC703", name: "Wireless Communication Systems", credits: 4}, {code: "BEC714x", name: "Professional Elective \u2013 III", credits: 3}, {code: "BEC755x", name: "Open Elective \u2013 II", credits: 3}, {code: "BEC786", name: "Major Project Phase \u2013 II", credits: 6}],
            8: [{code: "BEC801x", name: "Professional Elective \u2013 IV (Online)", credits: 3}, {code: "BEC802x", name: "Open Elective \u2013 III (Online)", credits: 3}, {code: "BEC803", name: "Internship (Industry / Research) (14\u201320 weeks)", credits: 10}]
        },
        EEE: {
            1: [{code: "BMATS101", name: "Mathematics-I (CSE Stream)", credits: 4}, {code: "BPHYS102", name: "Applied Physics (CSE Stream)", credits: 4}, {code: "BPOPS103", name: "Principles of Programming using C", credits: 3}, {code: "BESCK104x", name: "Engineering Science Course-I (Choose one)", credits: 3}, {code: "BETCK105x", name: "Emerging Tech-I / Programming Lang-I", credits: 3}, {code: "BENGK106", name: "Communicative English / Prof. Writing Skills", credits: 1}, {code: "BKSKK107", name: "Kannada / Constitution", credits: 1}, {code: "BIDTK158", name: "Innovation and Design Thinking / Health Science", credits: 1}],
            2: [{code: "BMATS201", name: "Mathematics-II (CSE Stream)", credits: 4}, {code: "BCHES202", name: "Applied Chemistry (CSE Stream)", credits: 4}, {code: "BCEDK203", name: "Computer-Aided Engineering Drawing", credits: 3}, {code: "BESCK204x", name: "Engineering Science Course-II (Choose one)", credits: 3}, {code: "BPLCK205x", name: "Programming Lang-II / Emerging Tech-II", credits: 3}, {code: "BPWSK206", name: "Prof. Writing Skills / Communicative English", credits: 1}, {code: "BICOK207", name: "Constitution / Kannada", credits: 1}, {code: "BSFHK258", name: "Health Science / Innovation and Design Thinking", credits: 1}],
            3: [{code: "BEE301", name: "Engineering Mathematics for EEE", credits: 3}, {code: "BEE302", name: "Electric Circuit Analysis (IPCC)", credits: 4}, {code: "BEE303", name: "Analog Electronic Circuits (IPCC)", credits: 4}, {code: "BEE304", name: "Transformers and Generators", credits: 3}, {code: "BEEL305", name: "Transformers and Generators Lab", credits: 1}, {code: "BEE306x", name: "ESC / ETC / PLC (Elective)", credits: 3}, {code: "BSCK307", name: "Social Connect and Responsibility (UHV)", credits: 1}, {code: "BEEx358x", name: "Ability / Skill Enhancement Course \u2013 III", credits: 1}, {code: "BNSK359", name: "NSS / PE / Yoga (MC)", credits: 0}],
            4: [{code: "BEE401", name: "Electric Motors", credits: 3}, {code: "BEE402", name: "Transmission and Distribution", credits: 4}, {code: "BEE403", name: "Microcontrollers (IPCC)", credits: 4}, {code: "BEEL404", name: "Electric Motors Lab", credits: 1}, {code: "BEE405x", name: "ESC / ETC / PLC (Elective)", credits: 3}, {code: "BEEx456x", name: "Ability / Skill Enhancement Course \u2013 IV", credits: 1}, {code: "BBOK407", name: "Biology for Engineers", credits: 3}, {code: "BUHK408", name: "Universal Human Values", credits: 1}, {code: "BNSK459", name: "NSS / PE / Yoga (MC)", credits: 0}],
            5: [{code: "BEE501", name: "Engineering Management & Entrepreneurship", credits: 3}, {code: "BEE502", name: "Signals & DSP (IPCC)", credits: 4}, {code: "BEE503", name: "Power Electronics", credits: 4}, {code: "BEEL504", name: "Power Electronics Lab", credits: 1}, {code: "BEE515x", name: "Professional Elective \u2013 I", credits: 3}, {code: "BEE586", name: "Mini Project", credits: 2}, {code: "BRMK557", name: "Research Methodology & IPR (AEC)", credits: 3}, {code: "BESK508", name: "Environmental Studies (MC)", credits: 2}, {code: "BNSK559", name: "NSS / PE / Yoga (MC)", credits: 0}],
            6: [{code: "BEE601", name: "Power System Analysis \u2013 I (IPCC)", credits: 4}, {code: "BEE602", name: "Control Systems", credits: 4}, {code: "BEE613x", name: "Professional Elective \u2013 II", credits: 3}, {code: "BEE654x", name: "Open Elective \u2013 I", credits: 3}, {code: "BEE685", name: "Project Phase \u2013 I", credits: 2}, {code: "BEEL606", name: "Control Systems Lab", credits: 1}, {code: "BEE657x", name: "Ability / Skill Development Course \u2013 V", credits: 1}, {code: "BNSK658", name: "NSS / PE / Yoga (MC)", credits: 0}, {code: "BIKS609", name: "Indian Knowledge System (MC)", credits: 0}],
            7: [{code: "BEE701", name: "Switchgear and Protection (IPCC)", credits: 4}, {code: "BEE702", name: "Industrial Drives and Applications", credits: 4}, {code: "BEE703", name: "Power System Analysis \u2013 II (IPCC)", credits: 4}, {code: "BEE714x", name: "Professional Elective \u2013 III", credits: 3}, {code: "BEE755x", name: "Open Elective \u2013 II", credits: 3}, {code: "BEE786", name: "Major Project Phase \u2013 II", credits: 6}],
            8: [{code: "BEE801x", name: "Professional Elective \u2013 IV (Online)", credits: 3}, {code: "BEE802x", name: "Open Elective \u2013 III (Online)", credits: 3}, {code: "BEE803", name: "Internship (Industry / Research, 14\u201320 wks)", credits: 10}]
        },
        CIVIL: {
            1: [{code: "BMATC101", name: "Mathematics-I for Civil Engg Stream", credits: 4}, {code: "BPHYC102", name: "Applied Physics for Civil Engg Stream", credits: 4}, {code: "BCIVC103", name: "Engineering Mechanics", credits: 3}, {code: "BESCK104x", name: "Engineering Science Course-I (choose one)", credits: 3}, {code: "BETCK105x", name: "Emerging Technology Course-I OR Programming Language Course-I", credits: 3}, {code: "BENGK106", name: "Communicative English OR Professional Writing Skills", credits: 1}, {code: "BKSKK107", name: "Kannada / Indian Constitution", credits: 1}, {code: "BIDTK158", name: "Innovation and Design Thinking OR Health", credits: 1}],
            2: [{code: "BMATC201", name: "Mathematics-II for Civil Engg Stream", credits: 4}, {code: "BCHEC202", name: "Applied Chemistry for Civil Engg Stream", credits: 4}, {code: "BCEDK203", name: "Computer-Aided Engineering Drawing", credits: 3}, {code: "BESCK204x", name: "Engineering Science Course-II (choose one)", credits: 3}, {code: "BPLCK205x", name: "Programming Language Course-II OR Emerging Technology Course-II", credits: 3}, {code: "BPWSK206", name: "Professional Writing Skills OR Communicative English", credits: 1}, {code: "BICOK207", name: "Indian Constitution / Kannada", credits: 1}, {code: "BSFHK258", name: "Health OR Innovation and Design Thinking", credits: 1}],
            3: [{code: "BCV301", name: "Strength of Materials", credits: 3}, {code: "BCV302", name: "Engineering Survey", credits: 4}, {code: "BCV303", name: "Engineering Geology", credits: 4}, {code: "BCV304", name: "Water Supply and Waste Water Engineering", credits: 3}, {code: "BCV305", name: "Computer Aided Building Planning & Drawing", credits: 1}, {code: "BCV306x", name: "ESC/ETC/PLC (Elective)", credits: 3}, {code: "BSCK307", name: "Social Connect and Responsibility", credits: 1}, {code: "BCV358x", name: "Ability/Skill Enhancement Course \u2013 III", credits: 1}, {code: "BNSK359", name: "NSS / Physical Education / Yoga", credits: 0}],
            4: [{code: "BCV401", name: "Analysis of Structures", credits: 3}, {code: "BCV402", name: "Fluid Mechanics & Hydraulics", credits: 4}, {code: "BCV403", name: "Transportation Engineering", credits: 4}, {code: "BCVL404", name: "Building Materials Testing Lab", credits: 1}, {code: "BCV405x", name: "ESC/ETC/PLC (Elective)", credits: 3}, {code: "BCV456x", name: "Ability/Skill Enhancement Course \u2013 IV", credits: 1}, {code: "BBOK407", name: "Biology for Engineers", credits: 3}, {code: "BUHK408", name: "Universal Human Values", credits: 1}, {code: "BNSK459", name: "NSS / Physical Education / Yoga", credits: 0}],
            5: [{code: "BCV501", name: "Construction Management & Entrepreneurship", credits: 3}, {code: "BCV502", name: "Geotechnical Engineering", credits: 4}, {code: "BCV503", name: "Concrete Technology", credits: 4}, {code: "BCV504", name: "Environmental Engineering Lab", credits: 1}, {code: "BCV515x", name: "Professional Elective I", credits: 3}, {code: "BCV586", name: "Mini Project / Extensive Survey Project", credits: 2}, {code: "BRMK557", name: "Research Methodology & IPR", credits: 3}, {code: "BESK508", name: "Environmental Studies", credits: 2}, {code: "BNSK559", name: "NSS / Physical Education / Yoga", credits: 0}],
            6: [{code: "BCV601", name: "Design of RCC Structures", credits: 4}, {code: "BCV602", name: "Irrigation Engineering & Hydraulic Structures", credits: 4}, {code: "BCV613x", name: "Professional Elective II", credits: 3}, {code: "BCV654x", name: "Open Elective I", credits: 3}, {code: "BCV685", name: "Major Project Phase \u2013 I", credits: 2}, {code: "BCVL606", name: "Software Application Lab", credits: 1}, {code: "BCV657x", name: "Ability/Skill Enhancement Course \u2013 V", credits: 1}, {code: "BNSK658", name: "NSS / Physical Education / Yoga", credits: 0}, {code: "BIKS609", name: "Indian Knowledge System", credits: 0}],
            7: [{code: "BCV701", name: "Design of Steel Structures", credits: 4}, {code: "BCV702", name: "Estimation & Contract Management", credits: 4}, {code: "BCV703", name: "Prestressed Concrete", credits: 4}, {code: "BCV714x", name: "Professional Elective III", credits: 3}, {code: "BCV755x", name: "Open Elective II", credits: 3}, {code: "BCV786", name: "Major Project Phase \u2013 II", credits: 6}],
            8: [{code: "BCV801x", name: "Professional Elective (Online)", credits: 3}, {code: "BCV802x", name: "Open Elective (Online)", credits: 3}, {code: "BCV803", name: "Internship (Industry/Research)", credits: 10}]
        },
        MECH: {
            1: [{code: "BMATM101", name: "Mathematics-I for Mechanical Engg Stream", credits: 4}, {code: "BPHYM102", name: "Applied Physics for Mechanical Engg Stream", credits: 4}, {code: "BEMEM103", name: "Elements of Mechanical Engineering", credits: 3}, {code: "BESCK104x", name: "Engineering Science Course-I (choose one)", credits: 3}, {code: "BETCK105x", name: "Emerging Technology Course-I / Programming Language Course-I", credits: 3}, {code: "BENGK106", name: "Communicative English / Professional Writing Skills", credits: 1}, {code: "BKSKK107", name: "Kannada / Indian Constitution", credits: 1}, {code: "BIDTK158", name: "Innovation and Design Thinking / Health", credits: 1}],
            2: [{code: "BMATM201", name: "Mathematics-II for Mechanical Engg Stream", credits: 4}, {code: "BCHEM202", name: "Applied Chemistry for Mechanical Engg Stream", credits: 4}, {code: "BCEDK203", name: "Computer-Aided Engineering Drawing", credits: 3}, {code: "BESCK204x", name: "Engineering Science Course-II (choose one)", credits: 3}, {code: "BETCK205x", name: "Emerging Technology Course-II / Programming Language Course-II", credits: 3}, {code: "BPWSK206", name: "Professional Writing Skills / Communicative English", credits: 1}, {code: "BICOK207", name: "Indian Constitution / Kannada", credits: 1}, {code: "BSFHK258", name: "Health / Innovation and Design Thinking", credits: 1}],
            3: [{code: "BME301", name: "Mechanics of Materials", credits: 3}, {code: "BME302", name: "Manufacturing Process", credits: 4}, {code: "BME303", name: "Material Science and Engineering", credits: 4}, {code: "BME304", name: "Basic Thermodynamics", credits: 3}, {code: "BME305", name: "Introduction to Modelling and Design for Manufacturing (Lab)", credits: 1}, {code: "BME306x", name: "ESC / ETC / PLC (Elective)", credits: 3}, {code: "BSCK307", name: "Social Connect and Responsibility", credits: 1}, {code: "BME358x", name: "Ability / Skill Enhancement Course \u2013 III", credits: 1}, {code: "BNSK359", name: "NSS / Physical Education / Yoga", credits: 0}],
            4: [{code: "BME401", name: "Applied Thermodynamics", credits: 3}, {code: "BME402", name: "Machining Science & Metrology", credits: 4}, {code: "BME403", name: "Fluid Mechanics", credits: 4}, {code: "BME404", name: "Mechanical Measurements and Metrology Lab", credits: 1}, {code: "BME405x", name: "ESC / ETC / PLC (Elective)", credits: 3}, {code: "BME456x", name: "Ability / Skill Enhancement Course \u2013 IV", credits: 1}, {code: "BBOK407", name: "Biology for Engineers", credits: 3}, {code: "BUHK408", name: "Universal Human Values", credits: 1}, {code: "BNSK459", name: "NSS / Physical Education / Yoga", credits: 0}],
            5: [{code: "BME501", name: "Industrial Management & Entrepreneurship", credits: 3}, {code: "BME502", name: "Turbo Machines", credits: 4}, {code: "BME503", name: "Theory of Machines", credits: 4}, {code: "BME504", name: "CNC Programming and 3D Printing Lab", credits: 1}, {code: "BME515x", name: "Professional Elective \u2013 I", credits: 3}, {code: "BME586", name: "Mini Project", credits: 2}, {code: "BRMK557", name: "Research Methodology & IPR", credits: 3}, {code: "BESK508", name: "Environmental Studies", credits: 2}, {code: "BNSK559", name: "NSS / Physical Education / Yoga", credits: 0}],
            6: [{code: "BME601", name: "Heat Transfer", credits: 4}, {code: "BME602", name: "Machine Design", credits: 4}, {code: "BME613x", name: "Professional Elective \u2013 II", credits: 3}, {code: "BME654x", name: "Open Elective \u2013 I", credits: 3}, {code: "BME685", name: "Major Project Phase \u2013 I", credits: 2}, {code: "BMEL606", name: "Design Lab", credits: 1}, {code: "BME657x", name: "Ability / Skill Enhancement Course \u2013 V", credits: 1}, {code: "BNSK658", name: "NSS / Physical Education / Yoga", credits: 0}, {code: "BIKS609", name: "Indian Knowledge System", credits: 0}],
            7: [{code: "BME701", name: "Finite Element Methods", credits: 4}, {code: "BME702", name: "Hydraulics and Pneumatics", credits: 4}, {code: "BME703", name: "Control Engineering", credits: 4}, {code: "BME714x", name: "Professional Elective \u2013 III", credits: 3}, {code: "BME755x", name: "Open Elective \u2013 II", credits: 3}, {code: "BME786", name: "Major Project Phase \u2013 II", credits: 6}],
            8: [{code: "BME801x", name: "Professional Elective \u2013 IV (Online)", credits: 3}, {code: "BME802x", name: "Open Elective \u2013 III (Online)", credits: 3}, {code: "BME803", name: "Internship (Industry / Research, 14\u201320 weeks)", credits: 10}]
        }
    }
};
