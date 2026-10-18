import { useState, useEffect, useMemo } from 'react'
import './App.css'

/* ------------------------------------------------------------------ */
/* 1. TRANSLATIONS (add a new language by adding another block)        */
/* ------------------------------------------------------------------ */
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
]

const T = {
  en: {
    tagline: 'From learning to livelihood',
    nav_home: 'Home', nav_discover: 'Discover', nav_learning: 'Learning',
    nav_skills: 'My Skills', nav_opps: 'Opportunities',
    nav_facilitator: 'Facilitator Dashboard', nav_progress: 'Progress',
    langLabel: 'Language',
    heroTitle: 'Welcome to KaushalSetu',
    heroText: 'Find your strengths, learn useful skills, build proof of your work, and discover scholarships, training and jobs.',
    discoverBtn: 'Discover My Strengths',
    voiceBtn: 'Voice input (demo)',
    voiceMsg: 'Voice input is not connected yet. This button is only a demo. Please type or tap your answers.',
    viewResults: 'View my recommendations',
    journeyTitle: 'Your journey',
    f1t: 'Discover', f1d: 'Answer simple questions to see career ideas.',
    f2t: 'Learn', f2d: 'Follow a 4-week plan with small tasks.',
    f3t: 'Prove Skills', f3d: 'Add a small project as proof of your work.',
    f4t: 'Find Opportunities', f4d: 'Browse sample scholarships, training and jobs.',
    f5t: 'Track Progress', f5d: 'See what you completed and what is next.',
    demoNote: 'This is a hackathon prototype. Recommendations and opportunities are sample data and must be verified.',
    qTitle: 'Discover My Strengths',
    stepOf: 'Step {n} of {total}',
    q1: 'What is your education level?',
    q2: 'What are you interested in? (choose one or more)',
    q3: 'What are your strengths? (choose one or more)',
    q4: 'In which language do you prefer to learn?',
    q5: 'Which district or place do you live in?',
    q6: 'What is your career goal?',
    e_1: 'Class 9–10', e_2: 'Class 11–12', e_3: 'Diploma', e_4: 'Graduation',
    i_technology: 'Technology', i_agriculture: 'Agriculture', i_healthcare: 'Healthcare',
    i_business: 'Business', i_design: 'Design', i_teaching: 'Teaching',
    i_trades: 'Skilled trades', i_other: 'Other',
    s_problem: 'Problem-solving', s_communication: 'Communication', s_creativity: 'Creativity',
    s_practical: 'Practical work', s_organisation: 'Organisation', s_helping: 'Helping people',
    g_job: 'Get a job', g_business: 'Start a business', g_study: 'Pursue further education', g_explore: 'Explore options',
    l_other: 'Other',
    districtPh: 'Type your district or village',
    selectPh: 'Select one',
    back: 'Back', next: 'Next', submit: 'Submit', backHome: 'Back to Home',
    errEdu: 'Please choose your education level.',
    errInt: 'Please choose at least one interest.',
    errStr: 'Please choose at least one strength.',
    errLang: 'Please choose a learning language.',
    errDist: 'Please type your district or place.',
    errGoal: 'Please choose your career goal.',
    errTitle: 'Please fix this:',
    resTitle: 'Your career ideas',
    resNote: 'These are initial suggestions from simple rules based on your answers. They are not an AI analysis. Please review them with your teacher or facilitator.',
    whyLabel: 'Why it may suit you', skillsLabel: 'Skills to learn', stepLabel: 'Suggested first step',
    viewPath: 'View learning path',
    whyMatch: 'Matches your choices', whyNone: 'A good option to explore.',
    noResults: 'No recommendations yet. Answer the questions first.',
    retake: 'Retake questionnaire',
    learnTitle: 'Learning path', chooseTitle: 'Choose a learning path',
    week: 'Week', progressLabel: 'Progress',
    projectTitle: 'Practical project',
    projectHint: 'Describe what you made or did (a few lines).',
    projectSubmit: 'Save as proof-of-work',
    projectSaved: 'Saved. Status: Awaiting facilitator verification.',
    projectEmpty: 'Please write a few words about your project.',
    backResults: 'Back to recommendations', choosePath: 'Choose another path',
    lesson: 'Lesson', tasks: 'Tasks', goDiscover: 'Take the questionnaire',
    skillsTitle: 'My Skills', skillsInProg: 'Skills in progress', tasksDone: 'tasks done',
    proofTitle: 'Proof-of-work', emptySkills: 'No skills yet. Start a learning path.',
    noProject: 'No project saved yet.',
    status_awaiting: 'Awaiting facilitator verification',
    status_reviewed: 'Reviewed by facilitator (demo)',
    status_improve: 'Needs improvement (demo)',
    skillsNote: 'This is not an official certificate. Only a facilitator can verify your work.',
    goToLearning: 'Go to learning',
    oppTitle: 'Opportunities',
    oppDemo: 'DEMO LIST: these are sample entries, not live listings. Verify every detail from official sources before applying.',
    search: 'Search opportunities', allTypes: 'All types', typeLabel: 'Type',
    savedOnly: 'Show saved only', save: 'Save', saved: 'Saved',
    viewInfo: 'How to check official information', hideInfo: 'Hide',
    eligibility: 'Eligibility', coverage: 'Where', deadline: 'Deadline', notVerified: 'Not verified',
    noOpps: 'No opportunities match. Try a different search.', resetFilters: 'Reset filters',
    oppHow: 'This is a demo entry. Ask your teacher or facilitator, check the official government or institution website, or visit your nearest district skill/employment office to confirm details before applying. No application is submitted from this app.',
    noLink: 'Official link: needs verification',
    type_scholarship: 'Scholarship', type_training: 'Skill training', type_apprenticeship: 'Apprenticeship',
    type_job: 'Internship / job', type_local: 'Local training',
    facTitle: 'Facilitator Dashboard',
    facNote: 'ILLUSTRATIVE DATA: sample students for demonstration only.',
    markReviewed: 'Mark as reviewed', needImprove: 'Needs improvement',
    yourSubs: 'Your projects (this device)', noSubs: 'You have not saved any project yet.',
    projectLabel: 'Project',
    progTitle: 'My Progress', completedTasks: 'Completed tasks', currentPath: 'Current path',
    none: 'None yet', savedOpps: 'Saved opportunities', awaitingProjects: 'Projects awaiting review',
    viewBtn: 'View',
    footer: 'KaushalSetu — hackathon prototype for Ada Lovelace Day. No backend, no real AI.',
    fit_strong: 'Strong match', fit_good: 'Good match', fit_explore: 'Worth exploring (limited match)',
    whyInterests: 'Interests that match: {list}.',
    whyNoInterest: 'None of your chosen interests match this path directly.',
    whyStrengths: 'Strengths that match: {list}.',
    whyNoStrength: 'None of your chosen strengths are listed for this path.',
    whyGoalMatch: 'Supports your goal: {goal}.',
    whyGoalExplore: 'You want to explore options. This path can lead to: {routes}.',
    whyGoalNone: 'This path is not mainly set up for your goal ({goal}), but you can still try it.',
    pathDirect: 'Education level ({level}): you can start this path now.',
    pathBridge: 'Education level ({level}): you can begin learning now. Jobs in this field may ask for more study or a short course, so check the requirements with your facilitator.',
    scoreTitle: 'Rule-based score (not AI)',
    scoreLine: 'Interests {i}/50 · Strengths {s}/30 · Goal {g}/15 · Education fit {e}/5 · Total {total}/100',
    rulesHow: 'How scoring works: interests up to 50 points, strengths 30, goal 15, education fit 5. Education fit only adds a small bonus and never removes a path.',
    basedOn: 'Your answers: {level} · {district} · preferred learning language: {language}',
    noDistrictData: 'This prototype has no district-wise listings. Please ask your facilitator for local options near you.',
    langLessonNote: 'Lesson text is currently in English only. Ask your facilitator for help or material in your preferred language.',
    langSwitchBtn: 'Use the app in {language}',
    otherInterestNote: 'You chose “Other” as an interest. The rules cannot match “Other” to a specific path, so it was not used in the scoring.',
    seeOpps: 'See sample opportunities: {type}',
    localStepCard: 'Local step ({district}): talk to someone from this list and ask what skills they look for: {who}.',
    lp_digital: 'a computer centre, internet café or village office',
    lp_web: 'a local shop or school club that may need a simple website',
    lp_agri: 'a farmer, a farmers’ group or an agriculture office nearby',
    lp_health: 'your nearest health centre or a community health worker',
    lp_biz: 'a shopkeeper or small business owner nearby',
    lp_design: 'a printing shop, signboard maker or event organiser',
    lp_teach: 'a school teacher or a local tuition class',
    lp_trades: 'a local electrician, workshop or solar installer',
  },
  hi: {
    tagline: 'सीखने से आजीविका तक',
    nav_home: 'होम', nav_discover: 'खोजें', nav_learning: 'सीखना',
    nav_skills: 'मेरे कौशल', nav_opps: 'अवसर',
    nav_facilitator: 'सुविधाकर्ता डैशबोर्ड', nav_progress: 'प्रगति',
    langLabel: 'भाषा',
    heroTitle: 'कौशलसेतु में आपका स्वागत है',
    heroText: 'अपनी ताकत पहचानें, उपयोगी कौशल सीखें, अपने काम का प्रमाण बनाएं और छात्रवृत्ति, प्रशिक्षण व नौकरियां खोजें।',
    discoverBtn: 'मेरी ताकत खोजें',
    voiceBtn: 'वॉइस इनपुट (डेमो)',
    voiceMsg: 'वॉइस इनपुट अभी जुड़ा नहीं है। यह बटन केवल डेमो है। कृपया टाइप करें या विकल्प चुनें।',
    viewResults: 'मेरे सुझाव देखें',
    journeyTitle: 'आपकी यात्रा',
    f1t: 'खोजें', f1d: 'सरल सवालों के जवाब देकर करियर के विचार देखें।',
    f2t: 'सीखें', f2d: 'छोटे कार्यों वाली 4-सप्ताह की योजना अपनाएं।',
    f3t: 'कौशल सिद्ध करें', f3d: 'अपने काम के प्रमाण के रूप में छोटा प्रोजेक्ट जोड़ें।',
    f4t: 'अवसर खोजें', f4d: 'नमूना छात्रवृत्तियां, प्रशिक्षण और नौकरियां देखें।',
    f5t: 'प्रगति देखें', f5d: 'देखें कि आपने क्या पूरा किया और आगे क्या है।',
    demoNote: 'यह हैकाथॉन का प्रोटोटाइप है। सुझाव और अवसर नमूना डेटा हैं और इनकी पुष्टि ज़रूरी है।',
    qTitle: 'मेरी ताकत खोजें',
    stepOf: 'चरण {n} / {total}',
    q1: 'आपकी शिक्षा का स्तर क्या है?',
    q2: 'आपकी रुचि किसमें है? (एक या अधिक चुनें)',
    q3: 'आपकी ताकत क्या हैं? (एक या अधिक चुनें)',
    q4: 'आप किस भाषा में सीखना पसंद करते हैं?',
    q5: 'आप किस जिले या स्थान में रहते हैं?',
    q6: 'आपका करियर लक्ष्य क्या है?',
    e_1: 'कक्षा 9–10', e_2: 'कक्षा 11–12', e_3: 'डिप्लोमा', e_4: 'स्नातक',
    i_technology: 'तकनीक', i_agriculture: 'कृषि', i_healthcare: 'स्वास्थ्य सेवा',
    i_business: 'व्यापार', i_design: 'डिज़ाइन', i_teaching: 'शिक्षण',
    i_trades: 'कुशल व्यवसाय', i_other: 'अन्य',
    s_problem: 'समस्या समाधान', s_communication: 'संवाद', s_creativity: 'रचनात्मकता',
    s_practical: 'व्यावहारिक काम', s_organisation: 'व्यवस्थित रहना', s_helping: 'लोगों की मदद',
    g_job: 'नौकरी पाना', g_business: 'व्यवसाय शुरू करना', g_study: 'आगे की पढ़ाई', g_explore: 'विकल्प तलाशना',
    l_other: 'अन्य',
    districtPh: 'अपना जिला या गांव लिखें',
    selectPh: 'एक चुनें',
    back: 'वापस', next: 'आगे', submit: 'जमा करें', backHome: 'होम पर वापस',
    errEdu: 'कृपया अपनी शिक्षा का स्तर चुनें।',
    errInt: 'कृपया कम से कम एक रुचि चुनें।',
    errStr: 'कृपया कम से कम एक ताकत चुनें।',
    errLang: 'कृपया सीखने की भाषा चुनें।',
    errDist: 'कृपया अपना जिला या स्थान लिखें।',
    errGoal: 'कृपया अपना करियर लक्ष्य चुनें।',
    errTitle: 'कृपया इसे ठीक करें:',
    resTitle: 'आपके करियर विचार',
    resNote: 'ये आपके उत्तरों पर आधारित सरल नियमों से बने शुरुआती सुझाव हैं। यह AI विश्लेषण नहीं है। कृपया अपने शिक्षक या सुविधाकर्ता के साथ इन्हें देखें।',
    whyLabel: 'यह आपके लिए क्यों उपयुक्त हो सकता है', skillsLabel: 'सीखने योग्य कौशल', stepLabel: 'सुझाया गया पहला कदम',
    viewPath: 'सीखने की योजना देखें',
    whyMatch: 'आपके चुनावों से मेल', whyNone: 'तलाशने के लिए अच्छा विकल्प।',
    noResults: 'अभी कोई सुझाव नहीं है। पहले सवालों के जवाब दें।',
    retake: 'प्रश्नावली दोबारा भरें',
    learnTitle: 'सीखने की योजना', chooseTitle: 'सीखने की योजना चुनें',
    week: 'सप्ताह', progressLabel: 'प्रगति',
    projectTitle: 'व्यावहारिक प्रोजेक्ट',
    projectHint: 'आपने क्या बनाया या किया, कुछ पंक्तियों में लिखें।',
    projectSubmit: 'कार्य-प्रमाण के रूप में सहेजें',
    projectSaved: 'सहेजा गया। स्थिति: सुविधाकर्ता के सत्यापन की प्रतीक्षा।',
    projectEmpty: 'कृपया अपने प्रोजेक्ट के बारे में कुछ लिखें।',
    backResults: 'सुझावों पर वापस', choosePath: 'दूसरी योजना चुनें',
    lesson: 'पाठ', tasks: 'कार्य', goDiscover: 'प्रश्नावली भरें',
    skillsTitle: 'मेरे कौशल', skillsInProg: 'सीखे जा रहे कौशल', tasksDone: 'कार्य पूरे',
    proofTitle: 'कार्य-प्रमाण', emptySkills: 'अभी कोई कौशल नहीं। कोई सीखने की योजना शुरू करें।',
    noProject: 'अभी कोई प्रोजेक्ट सहेजा नहीं गया।',
    status_awaiting: 'सुविधाकर्ता के सत्यापन की प्रतीक्षा',
    status_reviewed: 'सुविधाकर्ता द्वारा समीक्षित (डेमो)',
    status_improve: 'सुधार की ज़रूरत (डेमो)',
    skillsNote: 'यह कोई आधिकारिक प्रमाणपत्र नहीं है। केवल सुविधाकर्ता ही आपके काम का सत्यापन कर सकता है।',
    goToLearning: 'सीखने पर जाएं',
    oppTitle: 'अवसर',
    oppDemo: 'डेमो सूची: ये नमूना प्रविष्टियां हैं, लाइव सूची नहीं। आवेदन से पहले हर जानकारी आधिकारिक स्रोत से जांचें।',
    search: 'अवसर खोजें', allTypes: 'सभी प्रकार', typeLabel: 'प्रकार',
    savedOnly: 'केवल सहेजे हुए दिखाएं', save: 'सहेजें', saved: 'सहेजा गया',
    viewInfo: 'आधिकारिक जानकारी कैसे जांचें', hideInfo: 'छिपाएं',
    eligibility: 'पात्रता', coverage: 'कहां', deadline: 'अंतिम तिथि', notVerified: 'सत्यापित नहीं',
    noOpps: 'कोई अवसर नहीं मिला। दूसरी खोज आज़माएं।', resetFilters: 'फ़िल्टर हटाएं',
    oppHow: 'यह डेमो प्रविष्टि है। आवेदन से पहले अपने शिक्षक या सुविधाकर्ता से पूछें, आधिकारिक सरकारी या संस्था की वेबसाइट देखें, या नज़दीकी जिला कौशल/रोज़गार कार्यालय जाकर जानकारी की पुष्टि करें। इस ऐप से कोई आवेदन जमा नहीं होता।',
    noLink: 'आधिकारिक लिंक: सत्यापन आवश्यक',
    type_scholarship: 'छात्रवृत्ति', type_training: 'कौशल प्रशिक्षण', type_apprenticeship: 'अप्रेंटिसशिप',
    type_job: 'इंटर्नशिप / नौकरी', type_local: 'स्थानीय प्रशिक्षण',
    facTitle: 'सुविधाकर्ता डैशबोर्ड',
    facNote: 'उदाहरण डेटा: केवल प्रदर्शन के लिए नमूना छात्र।',
    markReviewed: 'समीक्षित करें', needImprove: 'सुधार की ज़रूरत',
    yourSubs: 'आपके प्रोजेक्ट (इस डिवाइस पर)', noSubs: 'आपने अभी कोई प्रोजेक्ट सहेजा नहीं है।',
    projectLabel: 'प्रोजेक्ट',
    progTitle: 'मेरी प्रगति', completedTasks: 'पूरे किए गए कार्य', currentPath: 'वर्तमान योजना',
    none: 'अभी कोई नहीं', savedOpps: 'सहेजे गए अवसर', awaitingProjects: 'समीक्षा की प्रतीक्षा में प्रोजेक्ट',
    viewBtn: 'देखें',
    footer: 'कौशलसेतु — एडा लवलेस दिवस के लिए हैकाथॉन प्रोटोटाइप। कोई बैकएंड नहीं, असली AI नहीं।',
    fit_strong: 'मज़बूत मेल', fit_good: 'अच्छा मेल', fit_explore: 'तलाशने योग्य (सीमित मेल)',
    whyInterests: 'मेल खाने वाली रुचियां: {list}।',
    whyNoInterest: 'आपकी चुनी हुई रुचियों में से कोई सीधे इस योजना से मेल नहीं खाती।',
    whyStrengths: 'मेल खाने वाली ताकत: {list}।',
    whyNoStrength: 'आपकी चुनी हुई ताकतों में से कोई इस योजना में सूचीबद्ध नहीं है।',
    whyGoalMatch: 'आपके लक्ष्य में सहायक: {goal}।',
    whyGoalExplore: 'आप विकल्प तलाश रहे हैं। यह योजना इन रास्तों तक ले जा सकती है: {routes}।',
    whyGoalNone: 'यह योजना मुख्य रूप से आपके लक्ष्य ({goal}) के लिए नहीं बनी है, फिर भी आप इसे आज़मा सकते हैं।',
    pathDirect: 'शिक्षा स्तर ({level}): आप यह योजना अभी शुरू कर सकते हैं।',
    pathBridge: 'शिक्षा स्तर ({level}): आप अभी सीखना शुरू कर सकते हैं। इस क्षेत्र की नौकरियों में अधिक पढ़ाई या छोटे कोर्स की ज़रूरत हो सकती है, इसलिए शर्तें अपने सुविधाकर्ता से जांचें।',
    scoreTitle: 'नियम-आधारित स्कोर (AI नहीं)',
    scoreLine: 'रुचि {i}/50 · ताकत {s}/30 · लक्ष्य {g}/15 · शिक्षा उपयुक्तता {e}/5 · कुल {total}/100',
    rulesHow: 'स्कोर कैसे बनता है: रुचियां अधिकतम 50 अंक, ताकत 30, लक्ष्य 15, शिक्षा उपयुक्तता 5। शिक्षा उपयुक्तता केवल छोटा बोनस जोड़ती है और किसी योजना को हटाती नहीं।',
    basedOn: 'आपके उत्तर: {level} · {district} · पसंदीदा सीखने की भाषा: {language}',
    noDistrictData: 'इस प्रोटोटाइप में जिला-वार सूची नहीं है। अपने नज़दीकी स्थानीय विकल्प अपने सुविधाकर्ता से पूछें।',
    langLessonNote: 'पाठ का पाठ्य अभी केवल अंग्रेज़ी में है। अपनी पसंदीदा भाषा में मदद या सामग्री के लिए अपने सुविधाकर्ता से पूछें।',
    langSwitchBtn: '{language} में ऐप इस्तेमाल करें',
    otherInterestNote: 'आपने रुचि में “अन्य” चुना। नियम “अन्य” को किसी विशेष योजना से नहीं जोड़ सकते, इसलिए स्कोर में इसका उपयोग नहीं हुआ।',
    seeOpps: 'नमूना अवसर देखें: {type}',
    localStepCard: 'स्थानीय कदम ({district}): इस सूची में से किसी से बात करें और पूछें कि उन्हें कौन-से कौशल चाहिए: {who}।',
    lp_digital: 'कंप्यूटर सेंटर, इंटरनेट कैफ़े या ग्राम कार्यालय',
    lp_web: 'कोई स्थानीय दुकान या स्कूल क्लब जिसे सरल वेबसाइट चाहिए',
    lp_agri: 'आसपास का कोई किसान, किसान समूह या कृषि कार्यालय',
    lp_health: 'नज़दीकी स्वास्थ्य केंद्र या सामुदायिक स्वास्थ्य कार्यकर्ता',
    lp_biz: 'आसपास का कोई दुकानदार या छोटा व्यवसायी',
    lp_design: 'कोई प्रिंटिंग की दुकान, साइनबोर्ड बनाने वाला या कार्यक्रम आयोजक',
    lp_teach: 'कोई स्कूल शिक्षक या स्थानीय ट्यूशन कक्षा',
    lp_trades: 'कोई स्थानीय इलेक्ट्रीशियन, वर्कशॉप या सोलर इंस्टॉलर',
  },
  mr: {
    tagline: 'शिकण्यापासून उपजीविकेपर्यंत',
    nav_home: 'मुख्यपृष्ठ', nav_discover: 'शोधा', nav_learning: 'शिकणे',
    nav_skills: 'माझी कौशल्ये', nav_opps: 'संधी',
    nav_facilitator: 'सुविधाकार डॅशबोर्ड', nav_progress: 'प्रगती',
    langLabel: 'भाषा',
    heroTitle: 'कौशलसेतूमध्ये आपले स्वागत आहे',
    heroText: 'आपली बलस्थाने ओळखा, उपयुक्त कौशल्ये शिका, आपल्या कामाचा पुरावा तयार करा आणि शिष्यवृत्ती, प्रशिक्षण व नोकऱ्या शोधा.',
    discoverBtn: 'माझी बलस्थाने शोधा',
    voiceBtn: 'व्हॉइस इनपुट (डेमो)',
    voiceMsg: 'व्हॉइस इनपुट अजून जोडलेले नाही. हे बटण फक्त डेमो आहे. कृपया टाइप करा किंवा पर्याय निवडा.',
    viewResults: 'माझ्या शिफारशी पहा',
    journeyTitle: 'तुमचा प्रवास',
    f1t: 'शोधा', f1d: 'सोप्या प्रश्नांची उत्तरे देऊन करिअरच्या कल्पना पहा.',
    f2t: 'शिका', f2d: 'लहान कामांची ४ आठवड्यांची योजना पाळा.',
    f3t: 'कौशल्य सिद्ध करा', f3d: 'आपल्या कामाचा पुरावा म्हणून छोटा प्रकल्प जोडा.',
    f4t: 'संधी शोधा', f4d: 'नमुना शिष्यवृत्ती, प्रशिक्षण आणि नोकऱ्या पहा.',
    f5t: 'प्रगती पहा', f5d: 'तुम्ही काय पूर्ण केले आणि पुढे काय आहे ते पहा.',
    demoNote: 'हा हॅकाथॉन प्रोटोटाइप आहे. शिफारशी आणि संधी नमुना माहिती आहे; त्यांची खात्री करणे आवश्यक आहे.',
    qTitle: 'माझी बलस्थाने शोधा',
    stepOf: 'पायरी {n} / {total}',
    q1: 'तुमचे शिक्षणाचे स्तर कोणते?',
    q2: 'तुम्हाला कशात रस आहे? (एक किंवा अधिक निवडा)',
    q3: 'तुमची बलस्थाने कोणती? (एक किंवा अधिक निवडा)',
    q4: 'तुम्हाला कोणत्या भाषेत शिकायला आवडते?',
    q5: 'तुम्ही कोणत्या जिल्ह्यात किंवा ठिकाणी राहता?',
    q6: 'तुमचे करिअर ध्येय काय आहे?',
    e_1: 'इयत्ता ९–१०', e_2: 'इयत्ता ११–१२', e_3: 'डिप्लोमा', e_4: 'पदवी',
    i_technology: 'तंत्रज्ञान', i_agriculture: 'शेती', i_healthcare: 'आरोग्यसेवा',
    i_business: 'व्यवसाय', i_design: 'डिझाइन', i_teaching: 'अध्यापन',
    i_trades: 'कुशल व्यवसाय', i_other: 'इतर',
    s_problem: 'समस्या सोडवणे', s_communication: 'संवाद', s_creativity: 'सर्जनशीलता',
    s_practical: 'प्रत्यक्ष काम', s_organisation: 'नियोजन व व्यवस्था', s_helping: 'लोकांना मदत',
    g_job: 'नोकरी मिळवणे', g_business: 'व्यवसाय सुरू करणे', g_study: 'पुढील शिक्षण', g_explore: 'पर्याय शोधणे',
    l_other: 'इतर',
    districtPh: 'तुमचा जिल्हा किंवा गाव लिहा',
    selectPh: 'एक निवडा',
    back: 'मागे', next: 'पुढे', submit: 'सादर करा', backHome: 'मुख्यपृष्ठावर परत',
    errEdu: 'कृपया तुमचे शिक्षणाचे स्तर निवडा.',
    errInt: 'कृपया किमान एक आवड निवडा.',
    errStr: 'कृपया किमान एक बलस्थान निवडा.',
    errLang: 'कृपया शिकण्याची भाषा निवडा.',
    errDist: 'कृपया तुमचा जिल्हा किंवा ठिकाण लिहा.',
    errGoal: 'कृपया तुमचे करिअर ध्येय निवडा.',
    errTitle: 'कृपया हे दुरुस्त करा:',
    resTitle: 'तुमच्या करिअर कल्पना',
    resNote: 'हे तुमच्या उत्तरांवर आधारित साध्या नियमांनी तयार केलेले सुरुवातीचे सुचवणे आहेत. हे AI विश्लेषण नाही. कृपया तुमच्या शिक्षकांसोबत किंवा सुविधाकारासोबत हे तपासा.',
    whyLabel: 'हे तुम्हाला का योग्य ठरू शकते', skillsLabel: 'शिकायची कौशल्ये', stepLabel: 'सुचवलेले पहिले पाऊल',
    viewPath: 'शिकण्याची योजना पहा',
    whyMatch: 'तुमच्या निवडींशी जुळणारे', whyNone: 'शोधून पाहण्यासाठी चांगला पर्याय.',
    noResults: 'अजून कोणत्याही शिफारशी नाहीत. आधी प्रश्नांची उत्तरे द्या.',
    retake: 'प्रश्नावली पुन्हा भरा',
    learnTitle: 'शिकण्याची योजना', chooseTitle: 'शिकण्याची योजना निवडा',
    week: 'आठवडा', progressLabel: 'प्रगती',
    projectTitle: 'प्रत्यक्ष प्रकल्प',
    projectHint: 'तुम्ही काय बनवले किंवा केले ते काही ओळींत लिहा.',
    projectSubmit: 'कामाचा पुरावा म्हणून जतन करा',
    projectSaved: 'जतन केले. स्थिती: सुविधाकाराच्या पडताळणीची प्रतीक्षा.',
    projectEmpty: 'कृपया तुमच्या प्रकल्पाबद्दल काही लिहा.',
    backResults: 'शिफारशींकडे परत', choosePath: 'दुसरी योजना निवडा',
    lesson: 'धडा', tasks: 'कामे', goDiscover: 'प्रश्नावली भरा',
    skillsTitle: 'माझी कौशल्ये', skillsInProg: 'शिकत असलेली कौशल्ये', tasksDone: 'कामे पूर्ण',
    proofTitle: 'कामाचा पुरावा', emptySkills: 'अजून कोणतीही कौशल्ये नाहीत. एखादी शिकण्याची योजना सुरू करा.',
    noProject: 'अजून कोणताही प्रकल्प जतन केलेला नाही.',
    status_awaiting: 'सुविधाकाराच्या पडताळणीची प्रतीक्षा',
    status_reviewed: 'सुविधाकाराने तपासले (डेमो)',
    status_improve: 'सुधारणा आवश्यक (डेमो)',
    skillsNote: 'हे अधिकृत प्रमाणपत्र नाही. फक्त सुविधाकारच तुमच्या कामाची पडताळणी करू शकतो.',
    goToLearning: 'शिकण्याकडे जा',
    oppTitle: 'संधी',
    oppDemo: 'डेमो यादी: या नमुना नोंदी आहेत, प्रत्यक्ष यादी नाही. अर्ज करण्यापूर्वी प्रत्येक माहिती अधिकृत स्रोतातून तपासा.',
    search: 'संधी शोधा', allTypes: 'सर्व प्रकार', typeLabel: 'प्रकार',
    savedOnly: 'फक्त जतन केलेले दाखवा', save: 'जतन करा', saved: 'जतन केले',
    viewInfo: 'अधिकृत माहिती कशी तपासावी', hideInfo: 'लपवा',
    eligibility: 'पात्रता', coverage: 'कुठे', deadline: 'अंतिम तारीख', notVerified: 'पडताळलेली नाही',
    noOpps: 'कोणतीही संधी सापडली नाही. वेगळा शोध वापरून पहा.', resetFilters: 'फिल्टर काढा',
    oppHow: 'ही डेमो नोंद आहे. अर्ज करण्यापूर्वी तुमच्या शिक्षकांना किंवा सुविधाकाराला विचारा, अधिकृत सरकारी किंवा संस्थेचे संकेतस्थळ तपासा, किंवा जवळच्या जिल्हा कौशल्य/रोजगार कार्यालयात जाऊन माहितीची खात्री करा. या अ‍ॅपमधून कोणताही अर्ज सादर होत नाही.',
    noLink: 'अधिकृत दुवा: पडताळणी आवश्यक',
    type_scholarship: 'शिष्यवृत्ती', type_training: 'कौशल्य प्रशिक्षण', type_apprenticeship: 'अप्रेंटिसशिप',
    type_job: 'इंटर्नशिप / नोकरी', type_local: 'स्थानिक प्रशिक्षण',
    facTitle: 'सुविधाकार डॅशबोर्ड',
    facNote: 'उदाहरणात्मक माहिती: फक्त प्रदर्शनासाठी नमुना विद्यार्थी.',
    markReviewed: 'तपासले म्हणून नोंदवा', needImprove: 'सुधारणा आवश्यक',
    yourSubs: 'तुमचे प्रकल्प (या उपकरणावर)', noSubs: 'तुम्ही अजून कोणताही प्रकल्प जतन केलेला नाही.',
    projectLabel: 'प्रकल्प',
    progTitle: 'माझी प्रगती', completedTasks: 'पूर्ण केलेली कामे', currentPath: 'सध्याची योजना',
    none: 'अजून नाही', savedOpps: 'जतन केलेल्या संधी', awaitingProjects: 'तपासणीची प्रतीक्षा असलेले प्रकल्प',
    viewBtn: 'पहा',
    footer: 'कौशलसेतू — एडा लव्हलेस दिनानिमित्त हॅकाथॉन प्रोटोटाइप. बॅकएंड नाही, खरे AI नाही.',
    fit_strong: 'मजबूत जुळणी', fit_good: 'चांगली जुळणी', fit_explore: 'शोधून पाहण्यासारखे (मर्यादित जुळणी)',
    whyInterests: 'जुळणाऱ्या आवडी: {list}.',
    whyNoInterest: 'तुम्ही निवडलेल्या आवडींपैकी कोणतीही या वाटेशी थेट जुळत नाही.',
    whyStrengths: 'जुळणारी बलस्थाने: {list}.',
    whyNoStrength: 'तुम्ही निवडलेल्या बलस्थानांपैकी कोणतेही या वाटेसाठी नोंदवलेले नाही.',
    whyGoalMatch: 'तुमच्या ध्येयाला पूरक: {goal}.',
    whyGoalExplore: 'तुम्ही पर्याय शोधत आहात. ही वाट इकडे नेऊ शकते: {routes}.',
    whyGoalNone: 'ही वाट प्रामुख्याने तुमच्या ध्येयासाठी ({goal}) नाही, तरीही तुम्ही ती करून पाहू शकता.',
    pathDirect: 'शिक्षणाचे स्तर ({level}): तुम्ही ही वाट आत्ताच सुरू करू शकता.',
    pathBridge: 'शिक्षणाचे स्तर ({level}): तुम्ही आत्ता शिकायला सुरुवात करू शकता. या क्षेत्रातील नोकऱ्यांसाठी अधिक शिक्षण किंवा छोटा अभ्यासक्रम लागू शकतो, म्हणून अटी सुविधाकारासोबत तपासा.',
    scoreTitle: 'नियम-आधारित गुण (AI नाही)',
    scoreLine: 'आवड {i}/50 · बलस्थाने {s}/30 · ध्येय {g}/15 · शिक्षण उपयुक्तता {e}/5 · एकूण {total}/100',
    rulesHow: 'गुण कसे दिले जातात: आवडी कमाल 50, बलस्थाने 30, ध्येय 15, शिक्षण उपयुक्तता 5. शिक्षण उपयुक्तता फक्त छोटा बोनस देते आणि कोणतीही वाट वगळत नाही.',
    basedOn: 'तुमची उत्तरे: {level} · {district} · पसंतीची शिकण्याची भाषा: {language}',
    noDistrictData: 'या प्रोटोटाइपमध्ये जिल्हानिहाय यादी नाही. तुमच्या जवळचे स्थानिक पर्याय सुविधाकाराला विचारा.',
    langLessonNote: 'धड्यांचा मजकूर सध्या फक्त इंग्रजीत आहे. तुमच्या पसंतीच्या भाषेत मदत किंवा साहित्यासाठी सुविधाकाराला विचारा.',
    langSwitchBtn: 'अ‍ॅप {language} मध्ये वापरा',
    otherInterestNote: 'तुम्ही आवडीमध्ये “इतर” निवडले. नियम “इतर” ला विशिष्ट वाटेशी जोडू शकत नाहीत, म्हणून गुण देताना ते वापरले गेले नाही.',
    seeOpps: 'नमुना संधी पहा: {type}',
    localStepCard: 'स्थानिक पाऊल ({district}): या यादीतील कोणाशी तरी बोला आणि त्यांना कोणती कौशल्ये हवी असतात ते विचारा: {who}.',
    lp_digital: 'संगणक केंद्र, इंटरनेट कॅफे किंवा ग्रामपंचायत कार्यालय',
    lp_web: 'साध्या वेबसाइटची गरज असू शकणारे स्थानिक दुकान किंवा शाळेचा क्लब',
    lp_agri: 'जवळचे शेतकरी, शेतकरी गट किंवा कृषी कार्यालय',
    lp_health: 'जवळचे आरोग्य केंद्र किंवा सामुदायिक आरोग्य कार्यकर्ता',
    lp_biz: 'जवळचा दुकानदार किंवा लघु व्यावसायिक',
    lp_design: 'प्रिंटिंग दुकान, फलक बनवणारा किंवा कार्यक्रम आयोजक',
    lp_teach: 'शाळेतील शिक्षक किंवा स्थानिक शिकवणी वर्ग',
    lp_trades: 'स्थानिक इलेक्ट्रिशियन, कार्यशाळा किंवा सोलर इन्स्टॉलर',
  },
}

// Returns a translate function. Falls back to English, then to the key itself.
const makeT = (lang) => (key) => (T[lang] && T[lang][key]) || T.en[key] || key

/* ------------------------------------------------------------------ */
/* 2. DATA                                                             */
/* ------------------------------------------------------------------ */
const EDU = ['1', '2', '3', '4']
const INTERESTS = ['technology', 'agriculture', 'healthcare', 'business', 'design', 'teaching', 'trades', 'other']
const STRENGTHS = ['problem', 'communication', 'creativity', 'practical', 'organisation', 'helping']
const GOALS = ['job', 'business', 'study', 'explore']
const OPP_TYPES = ['scholarship', 'training', 'apprenticeship', 'job', 'local']

const EMPTY_ANSWERS = { education: '', interests: [], strengths: [], learnLang: '', district: '', goal: '' }

// Career names are translated; descriptions and lessons are English-only in this version.
const CAREERS = [
  {
    id: 'digital',
    name: { en: 'Digital Services & Data Entry Operator', hi: 'डिजिटल सेवा व डेटा एंट्री ऑपरेटर', mr: 'डिजिटल सेवा व डेटा एंट्री ऑपरेटर' },
    interests: ['technology', 'business'], strengths: ['organisation', 'problem'], goals: ['job'],
    about: 'Helps villagers and offices with computers, forms and online services.',
    skills: ['Typing', 'Spreadsheets', 'Online forms', 'Internet safety'],
    first: 'Practise typing for 15 minutes every day and open a free spreadsheet app.',
    weeks: [
      { title: 'Computer basics', lesson: 'Learn the keyboard, the mouse and how to save files in folders.', tasks: ['Type one paragraph without looking at the keys', 'Create a folder and save a file in it'] },
      { title: 'Spreadsheets', lesson: 'A spreadsheet keeps numbers in rows and columns and can add them for you.', tasks: ['Make a table of 10 items with prices', 'Use the SUM formula to find the total'] },
      { title: 'Online services', lesson: 'Use official websites safely. Never share OTPs or passwords.', tasks: ['Write 5 internet safety rules', 'Practise a sample form (do not use real ID numbers)'] },
      { title: 'Accuracy and speed', lesson: 'Check your work twice. Accuracy matters more than speed.', tasks: ['Copy a one-page list with zero mistakes', 'Time yourself and note your improvement'] },
    ],
    project: 'Create a clean spreadsheet of shops in your village or items in your school, with totals.',
  },
  {
    id: 'web',
    name: { en: 'Junior Web Developer', hi: 'जूनियर वेब डेवलपर', mr: 'ज्युनियर वेब डेव्हलपर' },
    interests: ['technology', 'design'], strengths: ['problem', 'creativity'], goals: ['job', 'business'],
    about: 'Builds simple websites for shops, schools and local groups.',
    skills: ['HTML', 'CSS', 'Problem-solving', 'Basic design'],
    first: 'Open a free online code editor and write your name inside an HTML page.',
    weeks: [
      { title: 'HTML basics', lesson: 'HTML uses tags such as <h1> and <p> to build the structure of a page.', tasks: ['Write a page with a heading and 3 paragraphs', 'Add a list of your hobbies'] },
      { title: 'Style with CSS', lesson: 'CSS changes colours, sizes and layout.', tasks: ['Change the heading colour and size', 'Give the page a background colour'] },
      { title: 'Links and images', lesson: 'Links connect pages and images make them friendly.', tasks: ['Add a link to another page', 'Add one image with a text description'] },
      { title: 'Build and share', lesson: 'Combine everything into a small site.', tasks: ['Plan a 2-page website on paper', 'Build it and show it to your facilitator'] },
    ],
    project: 'Build a one-page website for a local shop or your school club.',
  },
  {
    id: 'agri',
    name: { en: 'Modern Farming & Agri-Entrepreneur', hi: 'आधुनिक खेती व कृषि-उद्यमी', mr: 'आधुनिक शेती व कृषी-उद्योजक' },
    interests: ['agriculture', 'business'], strengths: ['practical', 'organisation'], goals: ['business', 'job'],
    about: 'Uses better farming methods, records and market knowledge to improve farm income.',
    skills: ['Soil and water care', 'Crop planning', 'Record keeping', 'Market awareness'],
    first: 'Pick one crop grown near you and note its cost and selling price.',
    weeks: [
      { title: 'Soil and water', lesson: 'Healthy soil and careful use of water give better crops.', tasks: ['Observe soil in 2 places and describe it', 'Ask a farmer how water is managed'] },
      { title: 'Plan a crop', lesson: 'A plan lists seed, season, cost and expected harvest.', tasks: ['Write a plan for one crop', 'List the costs in a table'] },
      { title: 'Keep records', lesson: 'Writing income and expenses shows if you make a profit.', tasks: ['Make an income and expense notebook', 'Record 5 sample entries'] },
      { title: 'Reach the market', lesson: 'Knowing prices and buyers helps you sell well.', tasks: ['Note local market prices of 3 items', 'Write down who could buy your produce'] },
    ],
    project: 'Prepare a simple one-season plan for a crop with costs and expected profit.',
  },
  {
    id: 'health',
    name: { en: 'Community Health Helper', hi: 'सामुदायिक स्वास्थ्य सहायक', mr: 'सामुदायिक आरोग्य सहाय्यक' },
    interests: ['healthcare', 'teaching'], strengths: ['helping', 'communication'], goals: ['job', 'study'],
    about: 'Supports families with health awareness, hygiene and guidance to reach doctors.',
    skills: ['Hygiene awareness', 'First-aid awareness', 'Communication', 'Record keeping'],
    first: 'Find the emergency number and the nearest health centre for your area.',
    weeks: [
      { title: 'Hygiene and prevention', lesson: 'Handwashing, clean water and clean food prevent many illnesses.', tasks: ['Make a handwashing poster', 'Teach 3 hygiene tips to a family member'] },
      { title: 'First-aid awareness', lesson: 'Learn when to call for help. First aid does not replace a doctor.', tasks: ['Join an approved first-aid session with your facilitator', 'Write when to call emergency services'] },
      { title: 'Talking with care', lesson: 'Listen, speak kindly and keep personal health information private.', tasks: ['Practise a kind conversation with a friend', 'Write 3 privacy rules'] },
      { title: 'Health records', lesson: 'Simple records help track check-ups and vaccinations.', tasks: ['Make a sample health card (no real data)', 'List the nearest health facilities'] },
    ],
    project: 'Make a hygiene awareness poster and explain it to 5 people.',
  },
  {
    id: 'biz',
    name: { en: 'Small Business & Retail Entrepreneur', hi: 'छोटा व्यवसाय व खुदरा उद्यमी', mr: 'लघु व्यवसाय व किरकोळ उद्योजक' },
    interests: ['business'], strengths: ['communication', 'organisation'], goals: ['business', 'job'],
    about: 'Starts and runs a small shop or service that meets local needs.',
    skills: ['Costing and pricing', 'Talking to customers', 'Simple accounts', 'Marketing basics'],
    first: 'Pick one product people near you need and note who sells it now.',
    weeks: [
      { title: 'Find a need', lesson: 'A good business solves a problem people have.', tasks: ['Ask 5 people what they need locally', 'Choose one business idea'] },
      { title: 'Cost and price', lesson: 'Price = cost + your profit.', tasks: ['List all costs for one product', 'Set a price and calculate profit'] },
      { title: 'Talk to customers', lesson: 'Friendly and honest talk builds trust.', tasks: ['Write a 30-second pitch', 'Practise it with 2 people'] },
      { title: 'Keep accounts', lesson: 'Record every sale and every expense.', tasks: ['Make a daily sales sheet', 'Fill in 7 sample days'] },
    ],
    project: 'Write a one-page plan for a small business: product, cost, price and customers.',
  },
  {
    id: 'design',
    name: { en: 'Graphic & Content Designer', hi: 'ग्राफिक व कंटेंट डिज़ाइनर', mr: 'ग्राफिक व कंटेंट डिझायनर' },
    interests: ['design', 'technology'], strengths: ['creativity', 'communication'], goals: ['job', 'business'],
    about: 'Makes posters, social posts and visuals for shops, schools and events.',
    skills: ['Layout', 'Colour and fonts', 'Storytelling', 'Free design tools'],
    first: 'Sketch a poster for a school or village event on paper.',
    weeks: [
      { title: 'Look and observe', lesson: 'Notice colours, shapes and text in posters you see.', tasks: ['Collect 5 posters you like and note why', 'Sketch 3 layouts'] },
      { title: 'Colour and fonts', lesson: 'Use 2–3 colours and easy-to-read fonts.', tasks: ['Choose a palette of 3 colours', 'Write a heading in 2 font styles'] },
      { title: 'Tell a story', lesson: 'A good poster has one clear message.', tasks: ['Write your message in 10 words', 'Design the poster on paper'] },
      { title: 'Use a free tool', lesson: 'Free design apps let you make digital posters.', tasks: ['Recreate your poster in a free design app', 'Ask 3 people for feedback'] },
    ],
    project: 'Design a poster for a local event or school programme.',
  },
  {
    id: 'teach',
    name: { en: 'Tutor & Teaching Assistant', hi: 'ट्यूटर व शिक्षण सहायक', mr: 'ट्युटर व अध्यापन सहाय्यक' },
    interests: ['teaching'], strengths: ['communication', 'helping'], goals: ['job', 'study'],
    about: 'Helps younger students learn through clear explanations and activities.',
    skills: ['Explaining clearly', 'Lesson planning', 'Patience', 'Simple assessment'],
    first: 'Pick a topic you know well and explain it to a younger child.',
    weeks: [
      { title: 'Explain simply', lesson: 'Use short sentences and examples from daily life.', tasks: ['Explain one topic in 5 sentences', 'Give 2 daily-life examples'] },
      { title: 'Plan a lesson', lesson: 'A lesson has a goal, an activity and a check.', tasks: ['Write a 20-minute lesson plan', 'List the materials needed'] },
      { title: 'Activities and questions', lesson: 'Questions and games keep learners interested.', tasks: ['Create 5 questions', 'Design one simple game'] },
      { title: 'Check and encourage', lesson: 'Give kind feedback and track progress.', tasks: ['Make a simple progress sheet', 'Teach your lesson to 2 learners'] },
    ],
    project: 'Teach a 20-minute lesson to younger students and note what worked well.',
  },
  {
    id: 'trades',
    name: { en: 'Electrician / Solar Technician (Trainee)', hi: 'इलेक्ट्रीशियन / सोलर तकनीशियन (प्रशिक्षु)', mr: 'इलेक्ट्रिशियन / सोलर तंत्रज्ञ (प्रशिक्षणार्थी)' },
    interests: ['trades', 'technology'], strengths: ['practical', 'problem'], goals: ['job', 'business'],
    about: 'Installs and repairs basic electrical and solar equipment, always following safety rules.',
    skills: ['Safety rules', 'Reading simple circuits', 'Using tools', 'Finding faults'],
    first: 'Learn basic electrical safety rules. Never touch live wires.',
    weeks: [
      { title: 'Safety first', lesson: 'Electricity can be deadly. Always switch off and work only under supervision.', tasks: ['Write 5 electrical safety rules', 'Find safety signs at your school or village'] },
      { title: 'Simple circuits', lesson: 'A simple circuit needs a battery, wires and a bulb.', tasks: ['Draw a simple circuit', 'Build a torch-bulb circuit with a small battery, supervised'] },
      { title: 'Tools and parts', lesson: 'Know pliers, testers and switches and what each is for.', tasks: ['List 8 tools and their use', 'Visit a local electrician shop and observe'] },
      { title: 'Find faults', lesson: 'Troubleshooting means checking step by step.', tasks: ['Write a 5-step fault-finding checklist', 'Practise with a facilitator-approved kit'] },
    ],
    project: 'Make a low-voltage circuit model with a switch and write a safety checklist.',
  },
]

// SAMPLE DATA ONLY. No real deadlines, eligibility or links are claimed.
const OPPS = [
  { id: 'o1', type: 'scholarship', title: 'Sample: Merit scholarship for rural students', eligibility: 'Example only: school students from rural areas. Verify the real criteria.', coverage: 'Coverage needs verification' },
  { id: 'o2', type: 'scholarship', title: 'Sample: Support for girls in higher education', eligibility: 'Example only: girls moving to college or diploma. Verify the real criteria.', coverage: 'Coverage needs verification' },
  { id: 'o3', type: 'training', title: 'Sample: Government short-term skill course', eligibility: 'Example only: youth looking for job-ready skills. Verify the real criteria.', coverage: 'Check your district skill office' },
  { id: 'o4', type: 'training', title: 'Sample: Basic digital literacy training', eligibility: 'Example only: beginners with no computer experience. Verify the real criteria.', coverage: 'Coverage needs verification' },
  { id: 'o5', type: 'apprenticeship', title: 'Sample: Apprenticeship with a local workshop', eligibility: 'Example only: Class 10 or above, interest in a trade. Verify the real criteria.', coverage: 'Nearby towns (to be verified)' },
  { id: 'o6', type: 'job', title: 'Sample: Entry-level data entry or support role', eligibility: 'Example only: Class 12 or graduate with basic computer skills. Verify the real criteria.', coverage: 'Coverage needs verification' },
  { id: 'o7', type: 'job', title: 'Sample: Internship with a local NGO', eligibility: 'Example only: students interested in community work. Verify the real criteria.', coverage: 'Check with local NGOs' },
  { id: 'o8', type: 'local', title: 'Sample: Local tailoring, farming or electrical workshop', eligibility: 'Example only: open to youth in your area. Ask your facilitator.', coverage: 'Your village or block (to be verified)' },
]

// ILLUSTRATIVE DATA ONLY
const DEMO_STUDENTS = [
  { id: 's1', name: 'Student A (sample)', cls: 'Class 10', path: 'digital', progress: 75, project: 'Village shop price sheet', status: 'awaiting' },
  { id: 's2', name: 'Student B (sample)', cls: 'Class 12', path: 'agri', progress: 50, project: 'One-season crop plan', status: 'awaiting' },
  { id: 's3', name: 'Student C (sample)', cls: 'Diploma', path: 'trades', progress: 25, project: 'Electrical safety checklist', status: 'reviewed' },
  { id: 's4', name: 'Student D (sample)', cls: 'Graduation', path: 'teach', progress: 100, project: '20-minute lesson plan', status: 'improve' },
]

// Education fit and a related sample-opportunity type for each career.
// fitLevels = levels where this path is a common direct starting point ('1' Class 9–10, '2' Class 11–12, '3' Diploma, '4' Graduation).
// These are editorial assumptions for a prototype, NOT official eligibility rules. Review them with an educator.
const CAREER_META = {
  digital: { fitLevels: ['2', '3', '4'], oppType: 'training' },
  web: { fitLevels: ['2', '3', '4'], oppType: 'job' },
  agri: { fitLevels: ['1', '2', '3', '4'], oppType: 'local' },
  health: { fitLevels: ['2', '3', '4'], oppType: 'training' },
  biz: { fitLevels: ['1', '2', '3', '4'], oppType: 'local' },
  design: { fitLevels: ['1', '2', '3', '4'], oppType: 'training' },
  teach: { fitLevels: ['2', '3', '4'], oppType: 'job' },
  trades: { fitLevels: ['1', '2', '3'], oppType: 'apprenticeship' },
}

// Maximum points per part. The translated text "rulesHow" and "scoreLine" show these same numbers.
const WEIGHTS = { interest: 50, strength: 30, goal: 15, level: 5 }
const ROUTE_COUNT = GOALS.length - 1 // GOALS includes 'explore', which is not a real route

const NAV = [
  ['home', 'nav_home'], ['discover', 'nav_discover'], ['learning', 'nav_learning'],
  ['skills', 'nav_skills'], ['opps', 'nav_opps'], ['facilitator', 'nav_facilitator'], ['progress', 'nav_progress'],
]

const ICONS = {
  discover: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  learn: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM8 7h7',
  prove: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3l-5.2 2.8 1-5.8L3.5 9.2l5.9-.9z',
  opps: 'M3 8h18v11H3zM9 8V5h6v3M3 13h18',
  track: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
}

/* ------------------------------------------------------------------ */
/* 3. HELPERS                                                          */
/* ------------------------------------------------------------------ */
const careerName = (c, lang) => c.name[lang] || c.name.en
const taskIds = (c) => c.weeks.flatMap((w, wi) => w.tasks.map((_, ti) => `${c.id}-${wi}-${ti}`))
const doneCount = (c, completed) => taskIds(c).filter((id) => completed[id]).length
const percent = (c, completed) => Math.round((doneCount(c, completed) / taskIds(c).length) * 100)

// A path counts as "started" if it is the current path, has a done task, or has a saved project.
const getStarted = (completed, projects, activeId) =>
  CAREERS.filter((c) => c.id === activeId || doneCount(c, completed) > 0 || projects[c.id])

// Replaces {name} placeholders in a translated string.
const fill = (text, values) => text.replace(/\{(\w+)\}/g, (m, k) => (k in values ? values[k] : m))

// Share of a career's own profile that the learner matches. The first-listed tag counts double.
function matchFraction(careerList, picked) {
  let earned = 0
  let total = 0
  careerList.forEach((item, i) => {
    const w = i === 0 ? 2 : 1
    total += w
    if (picked.includes(item)) earned += w
  })
  return total ? earned / total : 0
}

// Transparent rule-based scoring out of 100 (see WEIGHTS). Not AI.
function recommend(a) {
  const interests = a.interests || []
  const strengths = a.strengths || []

  const scored = CAREERS.map((c, index) => {
    const meta = CAREER_META[c.id] || { fitLevels: [] }
    const im = c.interests.filter((x) => interests.includes(x))
    const sm = c.strengths.filter((x) => strengths.includes(x))

    let goalMatch = 'none'
    let goalFraction = 0
    if (a.goal === 'explore') {
      // No career lists 'explore', so paths that support more routes score a little higher.
      goalMatch = 'explore'
      goalFraction = Math.min(c.goals.length / ROUTE_COUNT, 1)
    } else if (c.goals.includes(a.goal)) {
      goalMatch = 'match'
      goalFraction = 1
    }

    const levelFit = meta.fitLevels.includes(a.education)
    const parts = {
      i: Math.round(matchFraction(c.interests, interests) * WEIGHTS.interest),
      s: Math.round(matchFraction(c.strengths, strengths) * WEIGHTS.strength),
      g: Math.round(goalFraction * WEIGHTS.goal),
      e: levelFit ? WEIGHTS.level : 0,
    }
    const total = parts.i + parts.s + parts.g + parts.e
    const level = total >= 65 ? 'strong' : total >= 40 ? 'good' : 'explore'

    return { id: c.id, index, im, sm, goalMatch, levelFit, parts, total, level, routes: c.goals.length }
  })

  // Tie-breaks: total, interests, strengths, goal, number of routes, then list order.
  scored.sort(
    (x, y) =>
      y.total - x.total ||
      y.parts.i - x.parts.i ||
      y.parts.s - x.parts.s ||
      y.parts.g - x.parts.g ||
      y.routes - x.routes ||
      x.index - y.index
  )
  return scored.slice(0, 3)
}

// Saves state in localStorage when possible; works fine without it.
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage not available: ignore */
    }
  }, [key, value])
  return [value, setValue]
}

/* ------------------------------------------------------------------ */
/* 4. STYLES (self-contained, prefixed with ks- to avoid clashes)      */
/* ------------------------------------------------------------------ */
const KS_CSS = `
.ks-root{width:100%;min-height:100vh;background:linear-gradient(180deg,#eaf6fb 0%,#ffffff 60%);color:var(--ink-900,#10292b);text-align:left;font-size:1rem;line-height:1.5}
.ks-root *{box-sizing:border-box}
.ks-wrap{max-width:1100px;margin:0 auto;padding:16px}
.ks-top{background:var(--white,#fff);border-bottom:1px solid #cfe5e7;box-shadow:var(--shadow-md,0 2px 8px rgba(0,0,0,.08))}
.ks-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.ks-between{justify-content:space-between}
.ks-center{justify-content:center}
.ks-brand{display:flex;align-items:center;gap:12px}
.ks-brand h1{margin:0;font-size:1.5rem;color:var(--teal-700,#0f766e)}
.ks-brand p{margin:0;font-size:.9rem}
.ks-lang{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.ks-nav{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.ks-btn,.ks-pill{font:inherit;min-height:48px;padding:10px 18px;border-radius:12px;border:2px solid var(--teal-700,#0f766e);background:var(--teal-700,#0f766e);color:#fff;font-weight:600;cursor:pointer}
.ks-btn.alt,.ks-pill{background:#fff;color:var(--teal-700,#0f766e)}
.ks-btn.warn{background:#fff;border-color:#b45309;color:#92400e}
.ks-pill{padding:8px 14px;border-radius:999px}
.ks-pill[aria-pressed="true"],.ks-pill[aria-current="page"]{background:var(--teal-700,#0f766e);color:#fff}
.ks-btn:hover,.ks-pill:hover{filter:brightness(.94)}
.ks-btn[disabled]{opacity:.5;cursor:not-allowed}
.ks-btn:focus-visible,.ks-pill:focus-visible,.ks-input:focus-visible,.ks-choice:focus-within{outline:3px solid #f59e0b;outline-offset:2px}
.ks-card{background:var(--white,#fff);border:1px solid #cfe5e7;border-radius:16px;padding:20px;box-shadow:var(--shadow-md,0 4px 12px rgba(0,0,0,.08))}
.ks-card h3{margin:8px 0;color:var(--teal-700,#0f766e)}
.ks-grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.ks-stack>*+*{margin-top:16px}
.ks-hero{background:var(--teal-100,#ccfbf1);border-radius:20px;padding:32px 20px;text-align:center}
.ks-hero h2{margin:0 0 8px;font-size:clamp(1.6rem,5vw,2.4rem);color:var(--teal-700,#0f766e)}
.ks-title{margin:0 0 8px;color:var(--teal-700,#0f766e);font-size:1.6rem}
.ks-chip{display:inline-block;padding:4px 12px;border-radius:999px;background:var(--teal-100,#ccfbf1);color:#134e4a;font-size:.9rem;margin:0 6px 6px 0}
.ks-track{height:14px;border-radius:999px;background:#d9ecee;overflow:hidden}
.ks-fill{height:100%;background:var(--teal-700,#0f766e);transition:width .3s}
.ks-input{width:100%;min-height:48px;padding:10px 12px;font:inherit;border:2px solid #9fcfd1;border-radius:12px;background:#fff;color:inherit}
textarea.ks-input{min-height:110px}
.ks-note{background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:10px 14px;font-size:.95rem;margin:0}
.ks-error{background:#fef3f2;border:1px solid #fda29b;color:#b42318;border-radius:12px;padding:10px 14px;margin:0}
.ks-ok{background:#ecfdf3;border:1px solid #6ce9a6;color:#05603a;border-radius:12px;padding:10px 14px;margin:0}
.ks-badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:.85rem;font-weight:600;background:#fef3c7;color:#92400e}
.ks-badge.reviewed{background:#dcfce7;color:#166534}
.ks-badge.improve{background:#fee2e2;color:#991b1b}
.ks-choice{display:flex;align-items:center;gap:10px;min-height:48px;padding:8px 14px;border:2px solid #cfe5e7;border-radius:12px;background:#fff;cursor:pointer}
.ks-choice.on{border-color:var(--teal-700,#0f766e);background:#e6f6f5}
.ks-choice input{width:22px;height:22px;flex:none;accent-color:var(--teal-700,#0f766e)}
.ks-icon{color:var(--teal-700,#0f766e)}
.ks-big{font-size:2rem;font-weight:700;color:var(--teal-700,#0f766e);margin:0}
.ks-footer{text-align:center;padding:24px 16px;font-size:.9rem}
.ks-label{display:block;font-weight:600;margin-bottom:6px}
@media (max-width:600px){.ks-btn{width:100%}.ks-brand h1{font-size:1.25rem}}
`

/* ------------------------------------------------------------------ */
/* 5. SMALL SHARED COMPONENTS                                          */
/* ------------------------------------------------------------------ */
function Logo() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#0f766e" />
      <path d="M6 32 Q24 10 42 32" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M6 34h36M14 26v8M24 20v14M34 26v8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Icon({ name, size = 32 }) {
  return (
    <svg className="ks-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  )
}

function ProgressBar({ value, label }) {
  return (
    <div>
      <div className="ks-row ks-between">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="ks-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="ks-fill" style={{ width: value + '%' }} />
      </div>
    </div>
  )
}

function Choice({ type, name, checked, onChange, label }) {
  return (
    <label className={'ks-choice' + (checked ? ' on' : '')}>
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

function Header({ lang, setLang, page, go, t }) {
  const current = page === 'results' ? 'discover' : page
  return (
    <header className="ks-top">
      <div className="ks-wrap">
        <div className="ks-row ks-between">
          <div className="ks-brand">
            <Logo />
            <div>
              <h1>KaushalSetu</h1>
              <p>{t('tagline')}</p>
            </div>
          </div>
          <div className="ks-lang" role="group" aria-label={t('langLabel')}>
            {LANGS.map((l) => (
              <button key={l.code} type="button" className="ks-pill" aria-pressed={lang === l.code} onClick={() => setLang(l.code)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <nav className="ks-nav" aria-label="Main">
          {NAV.map(([id, key]) => (
            <button key={id} type="button" className="ks-pill" aria-current={current === id ? 'page' : undefined} onClick={() => go(id)}>
              {t(key)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* 6. SCREENS                                                          */
/* ------------------------------------------------------------------ */
function Home({ t, onDiscover, hasResults, onResults }) {
  const [showVoice, setShowVoice] = useState(false)
  const features = [['discover', 'f1'], ['learn', 'f2'], ['prove', 'f3'], ['opps', 'f4'], ['track', 'f5']]
  return (
    <div className="ks-stack">
      <section className="ks-hero">
        <h2>{t('heroTitle')}</h2>
        <p>{t('heroText')}</p>
        <div className="ks-row ks-center">
          <button type="button" className="ks-btn" onClick={onDiscover}>{t('discoverBtn')}</button>
          <button type="button" className="ks-btn alt" onClick={() => setShowVoice(true)}>
            <span className="ks-row ks-center" style={{ gap: 8, flexWrap: 'nowrap' }}>
              <Icon name="mic" size={20} /> {t('voiceBtn')}
            </span>
          </button>
          {hasResults && <button type="button" className="ks-btn alt" onClick={onResults}>{t('viewResults')}</button>}
        </div>
        {showVoice && <p className="ks-note" role="status" style={{ marginTop: 16 }}>{t('voiceMsg')}</p>}
      </section>

      <section>
        <h2 className="ks-title">{t('journeyTitle')}</h2>
        <div className="ks-grid">
          {features.map(([icon, k], i) => (
            <article key={k} className="ks-card">
              <Icon name={icon} />
              <h3>{i + 1}. {t(k + 't')}</h3>
              <p>{t(k + 'd')}</p>
            </article>
          ))}
        </div>
      </section>
      <p className="ks-note" role="note">{t('demoNote')}</p>
    </div>
  )
}

function Discover({ t, initial, onSubmit, onHome }) {
  const total = 6
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ ...EMPTY_ANSWERS, ...initial })
  const [error, setError] = useState('')

  const validators = [
    (f) => (f.education ? '' : 'errEdu'),
    (f) => (f.interests.length ? '' : 'errInt'),
    (f) => (f.strengths.length ? '' : 'errStr'),
    (f) => (f.learnLang ? '' : 'errLang'),
    (f) => (f.district.trim() ? '' : 'errDist'),
    (f) => (f.goal ? '' : 'errGoal'),
  ]

  const setField = (field, value) => { setForm((f) => ({ ...f, [field]: value })); setError('') }
  const toggle = (field, value) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((x) => x !== value) : [...f[field], value],
    }))
    setError('')
  }

  const goNext = () => {
    const e = validators[step](form)
    if (e) { setError(e); return }
    setError('')
    setStep((s) => Math.min(s + 1, total - 1))
  }

  const handleForm = (ev) => {
    ev.preventDefault()
    if (step < total - 1) { goNext(); return }
    for (let i = 0; i < total; i += 1) {
      const e = validators[i](form)
      if (e) { setStep(i); setError(e); return }
    }
    onSubmit({ ...form, district: form.district.trim() })
  }

  let body = null
  if (step === 0) {
    body = EDU.map((v) => (
      <Choice key={v} type="radio" name="education" checked={form.education === v} onChange={() => setField('education', v)} label={t('e_' + v)} />
    ))
  } else if (step === 1) {
    body = INTERESTS.map((v) => (
      <Choice key={v} type="checkbox" name="interests" checked={form.interests.includes(v)} onChange={() => toggle('interests', v)} label={t('i_' + v)} />
    ))
  } else if (step === 2) {
    body = STRENGTHS.map((v) => (
      <Choice key={v} type="checkbox" name="strengths" checked={form.strengths.includes(v)} onChange={() => toggle('strengths', v)} label={t('s_' + v)} />
    ))
  } else if (step === 3) {
    body = (
      <select className="ks-input" aria-label={t('q4')} value={form.learnLang} onChange={(e) => setField('learnLang', e.target.value)}>
        <option value="">{t('selectPh')}</option>
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        <option value="other">{t('l_other')}</option>
      </select>
    )
  } else if (step === 4) {
    body = (
      <input className="ks-input" type="text" aria-label={t('q5')} placeholder={t('districtPh')}
        value={form.district} onChange={(e) => setField('district', e.target.value)} autoComplete="off" />
    )
  } else {
    body = GOALS.map((v) => (
      <Choice key={v} type="radio" name="goal" checked={form.goal === v} onChange={() => setField('goal', v)} label={t('g_' + v)} />
    ))
  }

  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('qTitle')}</h2>
      <ProgressBar value={Math.round(((step + 1) / total) * 100)} label={t('stepOf').replace('{n}', step + 1).replace('{total}', total)} />
      <form className="ks-card ks-stack" onSubmit={handleForm} noValidate>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="ks-title" style={{ fontSize: '1.2rem', padding: 0 }}>{t('q' + (step + 1))}</legend>
          <div className="ks-stack" style={{ marginTop: 12 }}>{body}</div>
        </fieldset>
        {error && <p className="ks-error" role="alert">{t('errTitle')} {t(error)}</p>}
        <div className="ks-row">
          {step > 0 && <button type="button" className="ks-btn alt" onClick={() => { setError(''); setStep((s) => s - 1) }}>{t('back')}</button>}
          {step < total - 1
            ? <button type="submit" className="ks-btn">{t('next')}</button>
            : <button type="submit" className="ks-btn">{t('submit')}</button>}
          <button type="button" className="ks-btn alt" onClick={onHome}>{t('backHome')}</button>
        </div>
      </form>
    </div>
  )
}

function Results({ t, lang, results, answers, onView, onRetake, onDiscover, onLang, onOpps }) {
  if (!results.length) {
    return (
      <div className="ks-card ks-stack">
        <h2 className="ks-title">{t('resTitle')}</h2>
        <p>{t('noResults')}</p>
        <button type="button" className="ks-btn" onClick={onDiscover}>{t('goDiscover')}</button>
      </div>
    )
  }

  const learnLang = answers.learnLang
  const learnLangInfo = LANGS.find((l) => l.code === learnLang)
  const languageLabel = learnLangInfo ? learnLangInfo.label : t('l_other')
  const canSwitchLang = Boolean(learnLangInfo) && learnLang !== lang
  const levelLabel = t('e_' + answers.education)
  const goalLabel = t('g_' + answers.goal)
  const district = (answers.district || '').trim()
  const hasOther = (answers.interests || []).includes('other')

  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('resTitle')}</h2>
      <p className="ks-note" role="note">{t('resNote')}</p>

      <div className="ks-card ks-stack">
        <p style={{ margin: 0 }}>
          <strong>{fill(t('basedOn'), { level: levelLabel, district, language: languageLabel })}</strong>
        </p>
        {district && <p style={{ margin: 0 }}>{t('noDistrictData')}</p>}
        {learnLang !== 'en' && <p style={{ margin: 0 }}>{t('langLessonNote')}</p>}
        {canSwitchLang && (
          <div>
            <button type="button" className="ks-btn alt" onClick={() => onLang(learnLang)}>
              {fill(t('langSwitchBtn'), { language: languageLabel })}
            </button>
          </div>
        )}
        {hasOther && <p className="ks-note" style={{ margin: 0 }}>{t('otherInterestNote')}</p>}
        <p className="ks-note" style={{ margin: 0 }}>{t('rulesHow')}</p>
      </div>

      <div className="ks-grid">
        {results.map((r) => {
          const c = CAREERS.find((x) => x.id === r.id)
          if (!c) return null
          const meta = CAREER_META[c.id] || { oppType: 'training' }

          let goalText
          if (r.goalMatch === 'match') {
            goalText = fill(t('whyGoalMatch'), { goal: goalLabel })
          } else if (r.goalMatch === 'explore') {
            goalText = fill(t('whyGoalExplore'), { routes: c.goals.map((g) => t('g_' + g)).join(', ') })
          } else {
            goalText = fill(t('whyGoalNone'), { goal: goalLabel })
          }

          const reasons = [
            {
              key: 'interests',
              text: r.im.length
                ? fill(t('whyInterests'), { list: r.im.map((k) => t('i_' + k)).join(', ') })
                : t('whyNoInterest'),
            },
            {
              key: 'strengths',
              text: r.sm.length
                ? fill(t('whyStrengths'), { list: r.sm.map((k) => t('s_' + k)).join(', ') })
                : t('whyNoStrength'),
            },
            { key: 'goal', text: goalText },
            { key: 'path', text: fill(t(r.levelFit ? 'pathDirect' : 'pathBridge'), { level: levelLabel }) },
          ]

          const scoreText = fill(t('scoreLine'), {
            i: r.parts.i, s: r.parts.s, g: r.parts.g, e: r.parts.e, total: r.total,
          })

          return (
            <article key={c.id} className="ks-card ks-stack">
              <div>
                <span className={'ks-badge' + (r.level === 'strong' ? ' reviewed' : '')}>{t('fit_' + r.level)}</span>
                <h3>{careerName(c, lang)}</h3>
              </div>
              <div>
                <strong>{t('whyLabel')}:</strong>
                <p style={{ margin: '6px 0' }}>{c.about}</p>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {reasons.map((x) => <li key={x.key}>{x.text}</li>)}
                </ul>
              </div>
              <details>
                <summary style={{ cursor: 'pointer', padding: '8px 0' }}>{t('scoreTitle')}</summary>
                <p style={{ margin: '6px 0 0' }}>{scoreText}</p>
              </details>
              <div>
                <strong>{t('skillsLabel')}:</strong>
                <div style={{ marginTop: 6 }}>{c.skills.map((s) => <span key={s} className="ks-chip">{s}</span>)}</div>
              </div>
              <p style={{ margin: 0 }}><strong>{t('stepLabel')}:</strong> {c.first}</p>
              {district && (
                <p style={{ margin: 0 }}>
                  {fill(t('localStepCard'), { district, who: t('lp_' + c.id) })}
                </p>
              )}
              <div className="ks-row">
                <button type="button" className="ks-btn" onClick={() => onView(c.id)}>{t('viewPath')}</button>
                <button type="button" className="ks-btn alt" onClick={() => onOpps(meta.oppType)}>
                  {fill(t('seeOpps'), { type: t('type_' + meta.oppType) })}
                </button>
              </div>
            </article>
          )
        })}
      </div>
      <button type="button" className="ks-btn alt" onClick={onRetake}>{t('retake')}</button>
    </div>
  )
}

function ProjectBox({ t, project, onSave }) {
  const [text, setText] = useState(project ? project.text : '')
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const save = () => {
    if (!text.trim()) { setIsError(true); setMsg(t('projectEmpty')); return }
    onSave(text.trim())
    setIsError(false)
    setMsg(t('projectSaved'))
  }
  return (
    <div className="ks-stack">
      <label className="ks-label" htmlFor="ks-project">{t('projectHint')}</label>
      <textarea id="ks-project" className="ks-input" value={text} onChange={(e) => { setText(e.target.value); setMsg('') }} />
      <button type="button" className="ks-btn" onClick={save}>{t('projectSubmit')}</button>
      {msg && <p className={isError ? 'ks-error' : 'ks-ok'} role="status">{msg}</p>}
    </div>
  )
}

function Learning({ t, lang, career, completed, onToggle, projects, onSaveProject, onOpen, onBackResults, onChooseOther }) {
  if (!career) {
    return (
      <div className="ks-stack">
        <h2 className="ks-title">{t('chooseTitle')}</h2>
        <div className="ks-grid">
          {CAREERS.map((c) => (
            <article key={c.id} className="ks-card">
              <h3>{careerName(c, lang)}</h3>
              <p>{c.about}</p>
              <ProgressBar value={percent(c, completed)} label={t('progressLabel')} />
              <p><button type="button" className="ks-btn" onClick={() => onOpen(c.id)}>{t('viewPath')}</button></p>
            </article>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('learnTitle')}: {careerName(career, lang)}</h2>
      <div className="ks-card"><ProgressBar value={percent(career, completed)} label={t('progressLabel')} /></div>
      <div className="ks-grid">
        {career.weeks.map((w, wi) => (
          <article key={w.title} className="ks-card">
            <h3>{t('week')} {wi + 1}: {w.title}</h3>
            <p><strong>{t('lesson')}:</strong> {w.lesson}</p>
            <p><strong>{t('tasks')}:</strong></p>
            <div className="ks-stack">
              {w.tasks.map((task, ti) => {
                const id = `${career.id}-${wi}-${ti}`
                return <Choice key={id} type="checkbox" name={id} checked={!!completed[id]} onChange={() => onToggle(id)} label={task} />
              })}
            </div>
          </article>
        ))}
      </div>
      <section className="ks-card ks-stack">
        <h3>{t('projectTitle')}</h3>
        <p>{career.project}</p>
        <ProjectBox key={career.id} t={t} project={projects[career.id]} onSave={(text) => onSaveProject(career.id, text)} />
      </section>
      <div className="ks-row">
        <button type="button" className="ks-btn alt" onClick={onBackResults}>{t('backResults')}</button>
        <button type="button" className="ks-btn alt" onClick={onChooseOther}>{t('choosePath')}</button>
      </div>
    </div>
  )
}

function Skills({ t, lang, completed, projects, activeId, onLearning }) {
  const started = getStarted(completed, projects, activeId)
  if (!started.length) {
    return (
      <div className="ks-card ks-stack">
        <h2 className="ks-title">{t('skillsTitle')}</h2>
        <p>{t('emptySkills')}</p>
        <button type="button" className="ks-btn" onClick={onLearning}>{t('goToLearning')}</button>
      </div>
    )
  }
  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('skillsTitle')}</h2>
      <p className="ks-note" role="note">{t('skillsNote')}</p>
      <div className="ks-grid">
        {started.map((c) => {
          const done = []
          c.weeks.forEach((w, wi) => w.tasks.forEach((task, ti) => { if (completed[`${c.id}-${wi}-${ti}`]) done.push(task) }))
          const p = projects[c.id]
          return (
            <article key={c.id} className="ks-card ks-stack">
              <h3>{careerName(c, lang)}</h3>
              <div>
                <strong>{t('skillsInProg')}:</strong><br />
                {c.skills.map((s) => <span key={s} className="ks-chip">{s}</span>)}
              </div>
              <p><strong>{done.length} / {taskIds(c).length}</strong> {t('tasksDone')}</p>
              {done.length > 0 && <ul>{done.map((d) => <li key={d}>{d}</li>)}</ul>}
              <div>
                <strong>{t('proofTitle')}:</strong>
                {p ? (
                  <div className="ks-stack">
                    <p style={{ margin: '8px 0 0' }}>{p.text}</p>
                    <span className={'ks-badge ' + p.status}>{t('status_' + p.status)}</span>
                  </div>
                ) : <p style={{ margin: '8px 0 0' }}>{t('noProject')}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Opportunities({ t, saved, onToggleSave, initialType = 'all' }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState(OPP_TYPES.includes(initialType) ? initialType : 'all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [openId, setOpenId] = useState(null)

  const q = query.trim().toLowerCase()
  const list = OPPS.filter((o) => {
    if (type !== 'all' && o.type !== type) return false
    if (savedOnly && !saved.includes(o.id)) return false
    if (!q) return true
    return `${o.title} ${o.eligibility} ${o.coverage} ${t('type_' + o.type)}`.toLowerCase().includes(q)
  })
  const reset = () => { setQuery(''); setType('all'); setSavedOnly(false) }

  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('oppTitle')}</h2>
      <p className="ks-note" role="note">{t('oppDemo')}</p>
      <div className="ks-card ks-grid">
        <div>
          <label className="ks-label" htmlFor="ks-search">{t('search')}</label>
          <input id="ks-search" className="ks-input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <label className="ks-label" htmlFor="ks-type">{t('typeLabel')}</label>
          <select id="ks-type" className="ks-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">{t('allTypes')}</option>
            {OPP_TYPES.map((o) => <option key={o} value={o}>{t('type_' + o)}</option>)}
          </select>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <Choice type="checkbox" name="savedOnly" checked={savedOnly} onChange={() => setSavedOnly((v) => !v)} label={t('savedOnly')} />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="ks-card ks-stack">
          <p>{t('noOpps')}</p>
          <button type="button" className="ks-btn" onClick={reset}>{t('resetFilters')}</button>
        </div>
      ) : (
        <div className="ks-grid">
          {list.map((o) => {
            const isSaved = saved.includes(o.id)
            const isOpen = openId === o.id
            return (
              <article key={o.id} className="ks-card ks-stack">
                <span className="ks-chip">{t('type_' + o.type)}</span>
                <h3 style={{ margin: 0 }}>{o.title}</h3>
                <p style={{ margin: 0 }}><strong>{t('eligibility')}:</strong> {o.eligibility}</p>
                <p style={{ margin: 0 }}><strong>{t('coverage')}:</strong> {o.coverage}</p>
                <p style={{ margin: 0 }}><strong>{t('deadline')}:</strong> {t('notVerified')}</p>
                <div className="ks-row">
                  <button type="button" className="ks-btn alt" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : o.id)}>
                    {isOpen ? t('hideInfo') : t('viewInfo')}
                  </button>
                  <button type="button" className="ks-btn" aria-pressed={isSaved} onClick={() => onToggleSave(o.id)}>
                    {isSaved ? t('saved') : t('save')}
                  </button>
                </div>
                {isOpen && (
                  <div className="ks-stack">
                    <p className="ks-note">{t('oppHow')}</p>
                    <p className="ks-note">{t('noLink')}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Facilitator({ t, lang, students, onStudentStatus, projects, onProjectStatus }) {
  const mine = Object.entries(projects)
  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('facTitle')}</h2>
      <p className="ks-note" role="note">{t('facNote')}</p>
      <div className="ks-grid">
        {students.map((s) => {
          const c = CAREERS.find((x) => x.id === s.path)
          return (
            <article key={s.id} className="ks-card ks-stack">
              <h3 style={{ margin: 0 }}>{s.name}</h3>
              <p style={{ margin: 0 }}>{s.cls}{c ? ` · ${careerName(c, lang)}` : ''}</p>
              <ProgressBar value={s.progress} label={t('progressLabel')} />
              <p style={{ margin: 0 }}><strong>{t('projectLabel')}:</strong> {s.project}</p>
              <span className={'ks-badge ' + s.status}>{t('status_' + s.status)}</span>
              <div className="ks-row">
                <button type="button" className="ks-btn" onClick={() => onStudentStatus(s.id, 'reviewed')}>{t('markReviewed')}</button>
                <button type="button" className="ks-btn warn" onClick={() => onStudentStatus(s.id, 'improve')}>{t('needImprove')}</button>
              </div>
            </article>
          )
        })}
      </div>

      <h2 className="ks-title">{t('yourSubs')}</h2>
      {mine.length === 0 ? (
        <p className="ks-card">{t('noSubs')}</p>
      ) : (
        <div className="ks-grid">
          {mine.map(([cid, p]) => {
            const c = CAREERS.find((x) => x.id === cid)
            return (
              <article key={cid} className="ks-card ks-stack">
                <h3 style={{ margin: 0 }}>{c ? careerName(c, lang) : cid}</h3>
                <p style={{ margin: 0 }}>{p.text}</p>
                <span className={'ks-badge ' + p.status}>{t('status_' + p.status)}</span>
                <div className="ks-row">
                  <button type="button" className="ks-btn" onClick={() => onProjectStatus(cid, 'reviewed')}>{t('markReviewed')}</button>
                  <button type="button" className="ks-btn warn" onClick={() => onProjectStatus(cid, 'improve')}>{t('needImprove')}</button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Progress({ t, lang, completed, projects, activeId, saved, go }) {
  const started = getStarted(completed, projects, activeId)
  const active = CAREERS.find((c) => c.id === activeId)
  const totalDone = Object.keys(completed).length
  const skillSet = []
  started.forEach((c) => c.skills.forEach((s) => { if (!skillSet.includes(s)) skillSet.push(s) }))
  const awaiting = Object.values(projects).filter((p) => p.status === 'awaiting').length

  return (
    <div className="ks-stack">
      <h2 className="ks-title">{t('progTitle')}</h2>
      <div className="ks-grid">
        <article className="ks-card">
          <h3>{t('completedTasks')}</h3>
          <p className="ks-big">{totalDone}</p>
        </article>
        <article className="ks-card ks-stack">
          <h3 style={{ margin: 0 }}>{t('currentPath')}</h3>
          {active ? (
            <>
              <p style={{ margin: 0 }}><strong>{careerName(active, lang)}</strong></p>
              <ProgressBar value={percent(active, completed)} label={t('progressLabel')} />
              <button type="button" className="ks-btn alt" onClick={() => go('learning')}>{t('goToLearning')}</button>
            </>
          ) : (
            <>
              <p style={{ margin: 0 }}>{t('none')}</p>
              <button type="button" className="ks-btn" onClick={() => go('learning')}>{t('goToLearning')}</button>
            </>
          )}
        </article>
        <article className="ks-card">
          <h3>{t('skillsInProg')}</h3>
          {skillSet.length ? skillSet.map((s) => <span key={s} className="ks-chip">{s}</span>) : <p>{t('none')}</p>}
        </article>
        <article className="ks-card ks-stack">
          <h3 style={{ margin: 0 }}>{t('savedOpps')}</h3>
          <p className="ks-big">{saved.length}</p>
          <button type="button" className="ks-btn alt" onClick={() => go('opps')}>{t('viewBtn')}</button>
        </article>
        <article className="ks-card ks-stack">
          <h3 style={{ margin: 0 }}>{t('awaitingProjects')}</h3>
          <p className="ks-big">{awaiting}</p>
          <button type="button" className="ks-btn alt" onClick={() => go('skills')}>{t('viewBtn')}</button>
        </article>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 7. MAIN APP                                                         */
/* ------------------------------------------------------------------ */
export default function App() {
  const [storedLang, setLang] = usePersistentState('ks_lang', 'en')
  const lang = T[storedLang] ? storedLang : 'en'
  const [page, setPage] = useState('home')
  const [answers, setAnswers] = usePersistentState('ks_answers', EMPTY_ANSWERS)
  const [activeId, setActiveId] = usePersistentState('ks_active', null)
  const [completed, setCompleted] = usePersistentState('ks_completed', {})
  const [projects, setProjects] = usePersistentState('ks_projects', {})
  const [saved, setSaved] = usePersistentState('ks_saved', [])
  const [students, setStudents] = useState(DEMO_STUDENTS)
  const [oppType, setOppType] = useState('all')

  const t = useMemo(() => makeT(lang), [lang])

  // Recommendations are always calculated from the saved answers, so they never go stale.
  const results = useMemo(() => (answers && answers.education ? recommend(answers) : []), [answers])

  const go = (p) => { setOppType('all'); setPage(p); window.scrollTo(0, 0) }
  const openOpps = (type) => { setOppType(type); setPage('opps'); window.scrollTo(0, 0) }

  const handleSubmitAnswers = (a) => {
    setAnswers(a)
    go('results')
  }
  const openPath = (id) => { setActiveId(id); go('learning') }
  const toggleTask = (id) => {
    setCompleted((c) => {
      const next = { ...c }
      if (next[id]) delete next[id]
      else next[id] = true
      return next
    })
  }
  const saveProject = (careerId, text) => setProjects((p) => ({ ...p, [careerId]: { text, status: 'awaiting' } }))
  const setProjectStatus = (careerId, status) => setProjects((p) => (p[careerId] ? { ...p, [careerId]: { ...p[careerId], status } } : p))
  const toggleSave = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const setStudentStatus = (id, status) => setStudents((list) => list.map((s) => (s.id === id ? { ...s, status } : s)))

  const activeCareer = CAREERS.find((c) => c.id === activeId) || null

  return (
    <div className="ks-root" lang={lang}>
      <style>{KS_CSS}</style>
      <Header lang={lang} setLang={setLang} page={page} go={go} t={t} />
      <main className="ks-wrap">
        {page === 'home' && (
          <Home t={t} onDiscover={() => go('discover')} hasResults={results.length > 0} onResults={() => go('results')} />
        )}
        {page === 'discover' && (
          <Discover t={t} initial={answers} onSubmit={handleSubmitAnswers} onHome={() => go('home')} />
        )}
        {page === 'results' && (
          <Results
            t={t} lang={lang} results={results} answers={answers}
            onView={openPath} onRetake={() => go('discover')} onDiscover={() => go('discover')}
            onLang={setLang} onOpps={openOpps}
          />
        )}
        {page === 'learning' && (
          <Learning
            t={t} lang={lang} career={activeCareer} completed={completed} onToggle={toggleTask}
            projects={projects} onSaveProject={saveProject} onOpen={openPath}
            onBackResults={() => go(results.length ? 'results' : 'discover')}
            onChooseOther={() => setActiveId(null)}
          />
        )}
        {page === 'skills' && (
          <Skills t={t} lang={lang} completed={completed} projects={projects} activeId={activeId} onLearning={() => go('learning')} />
        )}
        {page === 'opps' && <Opportunities t={t} saved={saved} onToggleSave={toggleSave} initialType={oppType} />}
        {page === 'facilitator' && (
          <Facilitator
            t={t} lang={lang} students={students} onStudentStatus={setStudentStatus}
            projects={projects} onProjectStatus={setProjectStatus}
          />
        )}
        {page === 'progress' && (
          <Progress t={t} lang={lang} completed={completed} projects={projects} activeId={activeId} saved={saved} go={go} />
        )}
      </main>
      <footer className="ks-footer">{t('footer')}</footer>
    </div>
  )
}