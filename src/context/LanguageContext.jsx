import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  en: {
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_hangul: "Hangul Alphabet",
    nav_vocab: "Vocabulary",
    nav_grammar: "Grammar",
    nav_quiz: "Quiz",
    nav_start: "Start Learning",
    
    home_title1: "Master Korean with",
    home_title2: "Elegance & Ease",
    home_subtitle: "An interactive, beautiful, and engaging way to learn Hangul, vocabulary, and grammar. Start your journey today.",
    home_btn_start: "Start with Alphabet",
    home_btn_explore: "Explore Courses",
    home_path_title: "Your Learning Path",
    
    home_feat1_title: "Hangul Alphabet",
    home_feat1_desc: "Master the Korean alphabet with interactive pronunciation and stroke order guides.",
    home_feat2_title: "Smart Vocabulary",
    home_feat2_desc: "Learn new words effectively with our spaced repetition flashcard system.",
    home_feat3_title: "Essential Grammar",
    home_feat3_desc: "Understand the core sentence structure and particles with visual color-coding.",
    
    dash_welcome: "Welcome back, Learner!",
    dash_progress_title: "Your Progress",
    dash_words_mastered: "Words Mastered",
    dash_daily_goal: "to your daily goal! Keep it up!",
    dash_reset: "Reset Progress",
    dash_confirm_reset: "Are you sure you want to reset your progress?",
    
    vocab_title: "Vocabulary Practice",
    vocab_know: "Know",
    vocab_dont_know: "Don't Know",
    
    hangul_title: "Hangul Alphabet",
    hangul_all: "All",
    hangul_consonants: "Consonants",
    hangul_vowels: "Vowels",
    hangul_basic: "Basic",
    hangul_advanced: "Advanced",
    
    loading: "Loading...",

    auth_login: "Login",
    auth_logout: "Logout",
    auth_signup: "Sign Up",
    auth_welcome: "Welcome Back",
    auth_create: "Create Account",
    auth_no_account: "Don't have an account? ",
    auth_has_account: "Already have an account? ",
    auth_signup_here: "Sign up here",
    auth_login_here: "Login here",
    auth_username: "Username",
    auth_password: "Password",

    admin_title: "Vocabulary Manager",
    admin_add_word: "Add New Word",
    admin_korean: "Korean Word",
    admin_translation: "Translation",
    admin_romanization: "Romanization (Optional)",
    admin_btn_add: "Add to Vocabulary",
    admin_current_list: "Current Vocabulary",
    admin_confirm_delete: "Delete this word?",

    quiz_question_of: "Question",
    quiz_of: "of",
    quiz_score: "Score:",
    quiz_meaning: "What is the meaning of",
    quiz_next: "Next Question",
    quiz_show_results: "Show Results",
    quiz_complete: "Quiz Complete!",
    quiz_scored: "You scored",
    quiz_out_of: "out of",
    quiz_restart: "Generate New Quiz",
    quiz_need_more: "Please add at least 4 words in the Admin Panel to unlock the dynamic quiz!",
    quiz_loading: "Loading quiz...",
    vocab_no_words: "No vocabulary available. Please add some in the Admin panel.",

    grammar_title: "Basic Korean Grammar",
    grammar_subtitle: "Master the foundational concepts of the Korean language.",
    grammar_sov_title: "Sentence Structure: SOV",
    grammar_en_svo: "English (SVO)",
    grammar_zh_svo: "Chinese (SVO)",
    grammar_ko_sov: "Korean (SOV)",
    grammar_subject: "Subject",
    grammar_object: "Object",
    grammar_verb: "Verb",
    grammar_particles_title: "Basic Particles",
    grammar_particles_desc: "Korean uses particles attached to the end of nouns to indicate their role in the sentence. They are the essential building blocks for making sentences.",
    grammar_topic_particle: "Topic Particle",
    grammar_topic_desc: "Used to mark the main topic of the sentence. Often translates to \"As for...\".",
    grammar_subj_particle: "Subject Particle",
    grammar_subj_desc: "Marks the grammatical subject of the sentence, placing focus on 'who' or 'what'.",
    grammar_obj_particle: "Object Particle",
    grammar_obj_desc: "Attached to the noun that is receiving the action of the verb.",
    grammar_cons_ending: "Consonant ending:",
    grammar_vowel_ending: "Vowel ending:",

    grammar_honorifics_title: "Politeness Levels (Honorifics)",
    grammar_honorifics_desc: "Korean culture highly values respect. The verb ending you choose depends entirely on your relationship with the listener. There are three main speech levels you must know:",
    grammar_informal: "Informal (반말)",
    grammar_informal_desc: "Used with close friends, younger people, or children. Drop the '요'.",
    grammar_informal_ex: "안녕 (Hello) / 먹어 (Eat)",
    grammar_polite: "Polite (해요체)",
    grammar_polite_desc: "The standard everyday politeness level. Used with strangers, older people, or colleagues. Ends in '요'.",
    grammar_polite_ex: "안녕하세요 (Hello) / 먹어요 (Eat)",
    grammar_formal: "Formal (하십시오체)",
    grammar_formal_desc: "Highly formal situations, news broadcasts, military, or business presentations. Ends in 'ㅂ니다/습니다'.",
    grammar_formal_ex: "안녕하십니까 (Hello) / 먹습니다 (Eat)"
  },
  zh: {
    nav_home: "首页",
    nav_dashboard: "仪表盘",
    nav_hangul: "韩语字母表",
    nav_vocab: "词汇卡片",
    nav_grammar: "基础语法",
    nav_quiz: "随堂测验",
    nav_start: "开始学习",
    
    home_title1: "优雅轻松地",
    home_title2: "精通韩语",
    home_subtitle: "通过互动、美观、引人入胜的方式学习韩文字母、词汇和语法。今天就开始你的旅程吧。",
    home_btn_start: "从字母表开始",
    home_btn_explore: "探索课程",
    home_path_title: "你的学习路径",
    
    home_feat1_title: "韩语字母表",
    home_feat1_desc: "通过互动的发音和笔顺指南，掌握韩语基础字母。",
    home_feat2_title: "智能词汇闪卡",
    home_feat2_desc: "使用我们的间隔重复记忆卡片系统高效学习新单词。",
    home_feat3_title: "核心基础语法",
    home_feat3_desc: "通过视觉颜色编码，快速理解核心句子结构和助词。",
    
    dash_welcome: "欢迎回来，学习者！",
    dash_progress_title: "你的学习进度",
    dash_words_mastered: "已掌握词汇",
    dash_daily_goal: "距离每日目标！继续保持！",
    dash_reset: "重置进度",
    dash_confirm_reset: "你确定要重置所有学习进度吗？",
    
    vocab_title: "词汇练习",
    vocab_know: "认识",
    vocab_dont_know: "不认识",
    
    hangul_title: "韩语字母表",
    hangul_all: "全部",
    hangul_consonants: "辅音",
    hangul_vowels: "元音",
    hangul_basic: "基础音",
    hangul_advanced: "进阶音",
    
    loading: "加载中...",

    auth_login: "登录",
    auth_logout: "退出登录",
    auth_signup: "注册",
    auth_welcome: "欢迎回来",
    auth_create: "创建账号",
    auth_no_account: "还没有账号？",
    auth_has_account: "已经有账号了？",
    auth_signup_here: "点击这里注册",
    auth_login_here: "点击这里登录",
    auth_username: "用户名",
    auth_password: "密码",

    admin_title: "词汇管理后台",
    admin_add_word: "添加新词汇",
    admin_korean: "韩语单词",
    admin_translation: "释义",
    admin_romanization: "罗马音 (可选)",
    admin_btn_add: "添加到词库",
    admin_current_list: "当前词汇列表",
    admin_confirm_delete: "确定要删除这个词汇吗？",

    quiz_question_of: "题目",
    quiz_of: "/",
    quiz_score: "得分:",
    quiz_meaning: "请问这个词的意思是什么:",
    quiz_next: "下一题",
    quiz_show_results: "查看结果",
    quiz_complete: "测验完成！",
    quiz_scored: "你的得分是",
    quiz_out_of: "/",
    quiz_restart: "生成新的测验",
    quiz_need_more: "请至少在管理后台添加 4 个单词以解锁动态测验功能！",
    quiz_loading: "正在生成测验...",
    vocab_no_words: "暂无词汇。请在管理后台添加。",

    grammar_title: "基础韩语语法",
    grammar_subtitle: "掌握韩语语言的基础核心概念。",
    grammar_sov_title: "句子结构：SOV",
    grammar_en_svo: "英语 (SVO)",
    grammar_zh_svo: "中文 (SVO)",
    grammar_ko_sov: "韩语 (SOV)",
    grammar_subject: "主语",
    grammar_object: "宾语",
    grammar_verb: "谓语",
    grammar_particles_title: "基础助词",
    grammar_particles_desc: "韩语在名词末尾附加助词来表示其在句子中的作用。它们是造句的基本语法模块。",
    grammar_topic_particle: "主题助词",
    grammar_topic_desc: "用于标记句子的主要主题。通常可以理解为“至于...”。",
    grammar_subj_particle: "主语助词",
    grammar_subj_desc: "标记句子的语法主语，将重点放在“谁”或“什么”上。",
    grammar_obj_particle: "宾语助词",
    grammar_obj_desc: "附加在接受动词动作的名词上（即动作的承受者）。",
    grammar_cons_ending: "辅音结尾：",
    grammar_vowel_ending: "元音结尾：",

    grammar_honorifics_title: "敬语与礼貌等级 (Honorifics)",
    grammar_honorifics_desc: "韩国文化高度重视长幼尊卑。您选择的动词词尾完全取决于您与听者的关系。这里有三个您必须了解的主要讲话等级：",
    grammar_informal: "非敬语/半语 (반말)",
    grammar_informal_desc: "用于亲密的朋友、年轻人或儿童之间。直接去掉句尾的 '요'。",
    grammar_informal_ex: "안녕 (你好) / 먹어 (吃)",
    grammar_polite: "敬语 (해요体)",
    grammar_polite_desc: "最标准的日常敬语。用于陌生人、长辈或同事之间。以 '요' 结尾。",
    grammar_polite_ex: "안녕하세요 (你好) / 먹어요 (吃)",
    grammar_formal: "极度敬语 (하십시오体)",
    grammar_formal_desc: "用于高度正式的场合、新闻广播、军队或商业演示中。以 'ㅂ니다/습니다' 结尾。",
    grammar_formal_ex: "안녕하십니까 (你好) / 먹습니다 (吃)"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
