/**
 * Internationalization utilities for Easy Production
 * Supports English (default) and Russian languages
 */

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      portfolio: "Portfolio",
      contact: "Contact"
    },
    
    // Page titles
    titles: {
      home: "easy. production",
      portfolio: "Portfolio - Easy Production",
      contact: "Contact Us - Easy Production"
    },
    
    // Homepage content
    home: {
      title: "easy. production",
      description: "Professional video production in Kyrgyzstan with international standards"
    },
    
    // Team section
    team: {
      title: "OUR TEAM",
      subtitle: "Meet the creative minds behind every project",
      mainTitle: "Meet Our Creative Team",
      mainSubtitle: "The talented individuals behind every successful production"
    },
    
    // Target segments
    segments: {
      title: "WHO WE WORK WITH",
      subtitle: "From startups to international brands, we create visual stories that resonate"
    },
    
    // Portfolio
    portfolio: {
      title: "Recent Work",
      viewFull: "View full portfolio",
      backToPortfolio: "← Back to Portfolio"
    },
    
    // Contact
    contact: {
      title: "TELL US ABOUT YOUR PROJECT",
      subtitle: "Share your vision with us. The more details you provide, the better we can understand your needs and create something extraordinary together.",
      form: {
        name: "Your name",
        email: "Email address",
        phone: "Phone number",
        company: "Company",
        projectType: "Project type",
        budget: "Budget range (USD)",
        timeline: "Project timeline",
        message: "Project details",
        submit: "SEND PROJECT DETAILS",
        sending: "SENDING...",
        note: "We'll get back to you within 24 hours with a detailed proposal."
      },
      projectTypes: {
        commercial: "Commercial/Advertisement",
        corporate: "Corporate Video",
        socialMedia: "Social Media Content",
        product: "Product Photography/Video",
        event: "Event Coverage",
        brand: "Brand Story/Documentary",
        other: "Other"
      },
      budgetRanges: {
        under1k: "Under $1,000",
        "1k-5k": "$1,000 - $5,000",
        "5k-10k": "$5,000 - $10,000",
        "10k-25k": "$10,000 - $25,000",
        "25k-plus": "$25,000+",
        discuss: "Let's discuss"
      },
      timelines: {
        asap: "ASAP",
        "1-week": "Within 1 week",
        "2-weeks": "Within 2 weeks",
        "1-month": "Within 1 month",
        "2-months": "Within 2 months",
        flexible: "I'm flexible"
      }
    },
    
    // Target Segments
    segments: {
      title: "WHO WE WORK WITH",
      subtitle: "From startups to international brands, we create visual stories that resonate",
      mainTitle: "From First Idea to Final Cut",
      mainSubtitle: "Concepts, crews, landscapes, pixels — we cover the full spectrum. Whether you need a local fixer in Kyrgyzstan or a world-class VFX pipeline, we're your behind-the-scenes team.",
      creativeAgency: {
        title: "Creative <br/> agency",
        description: "We develop original concepts for commercials, documentaries, and brand films that connect with audiences. From the first idea to the final script, our creative team works closely with clients to shape powerful narratives and striking visual approaches. We specialize in building concepts that are bold, clear, and production-ready — with a strong focus on storytelling, mood, and message. Whether you're launching a new product or telling your brand's story, we help turn vision into concept — and concept into action."
      },
      cgi: {
        title: "CGI",
        description: "We create high-end VFX, 3D animation, and motion design for global clients — working fully remotely with tight coordination and attention to detail. From realistic visual effects to stylized graphic elements, we adapt our style to each project's needs. Our portfolio includes collaborations with top brands, creative agencies, and film directors. Whether you need subtle enhancements or full-on CGI environments, our team delivers with technical precision and creative flair — always on time and on brief."
      },
      serviceProduction: {
        title: "Service <br/> Production",
        description: "From scouting breathtaking locations to assembling a professional local crew, we handle every step of the process. Need equipment, casting, permits, or logistics? We've got it covered. Whether you're shooting a commercial, documentary, or branded content — we make it seamless."
      },
      postProduction: {
        title: "Post-production",
        description: "We handle the entire post-production process — from editing, color grading, and sound design to advanced VFX and final mastering. Our team works with international clients across time zones, ensuring fast, clear communication and consistent results. Whether it's a commercial, branded content, or narrative piece, we take your raw footage and deliver a polished, broadcast-ready product. You can trust us to meet deadlines without compromising quality — every frame, every time."
      }
    },

    // Exceptional Value / Service Production
    exceptional: {
      title: "Service Production in Kyrgyzstan",
      summer: {
        title: "Summer — Issyk-Kul, Lakes, Beaches",
        description: "Kyrgyzstan offers an incredible variety of landscapes — mountains, lakes, canyons, steppes, and cities. Filming is possible year-round, with all four seasons accessible just a few hours from the capital."
      },
      winter: {
        title: "Winter — Mountains, Skiing, Snowy Landscapes",
        description: "We provide full-cycle service production. The client sends us a director's treatment or concept — we calculate the budget, scout locations, assemble the crew, organize casting, and provide technical support."
      },
      autumn: {
        title: "Autumn — Forests, Horses, Warm Colors",
        description: "If you're a brand or company, we can handle the entire production cycle — starting from pre-production. We'll develop a creative concept tailored to your product, prepare the script, storyboards, and visual references. During production, we provide full-service support with the option for clients or agencies to stay connected remotely — ensuring you're always involved and informed. The final stage is post-production: editing, motion design, sound design, and creating an original music composition crafted specifically for your video."
      },
      valueProposition: {
        title: "Value Proposition",
        description: "Producing in Dubai or Europe can cost you 3–5× more — and not always with better results. In Kyrgyzstan, you get cinematic landscapes, professional crews, and full-service production — without the inflated budgets.",
        cta: "➡️ Want a comparison? Just ask — we'll show you the difference."
      },
      button: "Get Your Custom Quote",
      portfolioTitle: "Our Recent Work"
    },

    // Showreel
    showreel: {
      watchYoutube: "Watch on YouTube",
      tagline: "Your shoot in Kyrgyzstan — locations, crew, and post-production all in one"
    },

    // Feel Watch Trust
    feelWatchTrust: {
      we: "WE",
      makeIt: "MAKE IT",
      easy: "EASY",
      description: "Shoot in Kyrgyzstan with full production support — from stunning locations and local crew to remote motion design and VFX",
      contactButton: "Contact Us"
    },

    // Everywhere
    everywhere: {
      title: "Everywhere",
      onsite: {
        title: "Onsite in Kyrgyzstan",
        description: "Experience world-class production in the heart of Central Asia. Our fully-equipped studios and local expertise deliver premium results at unbeatable costs, surrounded by breathtaking mountain landscapes."
      },
      remote: {
        title: "Remote",
        description: "Collaborate seamlessly from anywhere in the world. Our remote production services include real-time direction, post-production, and creative consultation—bringing our expertise directly to your project."
      },
      flyUsIn: {
        title: "Fly Us In",
        description: "Need our team on location? We travel worldwide with our portable production setup, bringing Kyrgyzstan's cost-effective excellence to your doorstep for international shoots and collaborations."
      }
    },

    // Common
    common: {
      loading: "Loading...",
      error: "Error loading content",
      refresh: "Please refresh if this persists"
    }
  },
  
  ru: {
    // Navigation
    nav: {
      portfolio: "Портфолио",
      contact: "Контакты"
    },
    
    // Page titles
    titles: {
      home: "easy. production",
      portfolio: "Портфолио - Easy Production",
      contact: "Связаться с нами - Easy Production"
    },
    
    // Homepage content
    home: {
      title: "easy. production",
      description: "Профессиональное видеопроизводство в Кыргызстане с международными стандартами"
    },
    
    // Team section
    team: {
      title: "НАША КОМАНДА",
      subtitle: "Познакомьтесь с творческими умами за каждым проектом",
      mainTitle: "Познакомьтесь с нашей творческой командой",
      mainSubtitle: "Талантливые люди, стоящие за каждым успешным производством"
    },
    
    // Target segments
    segments: {
      title: "С КЕМ МЫ РАБОТАЕМ",
      subtitle: "От стартапов до международных брендов, мы создаем визуальные истории, которые находят отклик"
    },
    
    // Portfolio
    portfolio: {
      title: "Недавние работы",
      viewFull: "Смотреть полное портфолио",
      backToPortfolio: "← Назад к портфолио"
    },
    
    // Contact
    contact: {
      title: "РАССКАЖИТЕ НАМ О ВАШЕМ ПРОЕКТЕ",
      subtitle: "Поделитесь своим видением с нами. Чем больше деталей вы предоставите, тем лучше мы сможем понять ваши потребности и создать что-то выдающееся вместе.",
      form: {
        name: "Ваше имя",
        email: "Адрес электронной почты",
        phone: "Номер телефона",
        company: "Компания",
        projectType: "Тип проекта",
        budget: "Бюджет (USD)",
        timeline: "Сроки проекта",
        message: "Детали проекта",
        submit: "ОТПРАВИТЬ ДЕТАЛИ ПРОЕКТА",
        sending: "ОТПРАВКА...",
        note: "Мы свяжемся с вами в течение 24 часов с подробным предложением."
      },
      projectTypes: {
        commercial: "Реклама/Коммерческое видео",
        corporate: "Корпоративное видео",
        socialMedia: "Контент для соцсетей",
        product: "Фото/Видео продукта",
        event: "Освещение мероприятий",
        brand: "Брендовая история/Документальное",
        other: "Другое"
      },
      budgetRanges: {
        under1k: "Менее $1,000",
        "1k-5k": "$1,000 - $5,000",
        "5k-10k": "$5,000 - $10,000",
        "10k-25k": "$10,000 - $25,000",
        "25k-plus": "$25,000+",
        discuss: "Обсудим"
      },
      timelines: {
        asap: "Как можно скорее",
        "1-week": "В течение 1 недели",
        "2-weeks": "В течение 2 недель",
        "1-month": "В течение 1 месяца",
        "2-months": "В течение 2 месяцев",
        flexible: "Я гибок в сроках"
      }
    },
    
    // Target Segments
    segments: {
      title: "С КЕМ МЫ РАБОТАЕМ",
      subtitle: "От стартапов до международных брендов, мы создаем визуальные истории, которые находят отклик",
      mainTitle: "От первой идеи<br>до финального кадра",
      mainSubtitle: "Концепции, команды, пейзажи, пиксели — мы покрываем весь спектр. Нужен ли вам местный координатор в Кыргызстане или мирового класса VFX-пайплайн, мы — ваша команда за кадром.",
      creativeAgency: {
        title: "Креативное <br/> агентство",
        description: "Мы создаём оригинальные концепции для рекламы, документального кино и брендовых фильмов, которые действительно находят отклик у зрителей.Наша креативная команда работает с вами на всех этапах — от первой идеи до финального сценария, чтобы построить яркий визуальный стиль и сильный сюжет.Мы специализируемся на смелых, чётких и готовых к производству идеях, уделяя особое внимание истории, настроению и посланию. Запускаете новый продукт или рассказываете о бренде? Мы помогаем превратить видение в концепцию — а концепцию в действие."
      },
      cgi: {
        title: "CGI",
        description: "Мы создаём высококлассную VFX-графику, 3D-анимацию и моушн-дизайн для клиентов по всему миру — работая удалённо, с чёткой координацией и вниманием к деталям. От реалистичных визуальных эффектов до стилизованных графических решений — мы подбираем визуальный язык под каждую задачу. В нашем портфолио — проекты с ведущими брендами, креативными агентствами и режиссёрами. Нужны ли вам деликатные доработки или полноценные CGI-миры — мы обеспечим техническую точность и творческий подход. Всегда в срок. Всегда по задаче."
      },
      serviceProduction: {
        title: "Сервисное <br/> производство",
        description: "От подбора впечатляющих локаций до формирования профессиональной локальной команды — мы берём на себя весь процесс. Нужна техника, кастинг, разрешения или логистика? Всё под контролем. Снимаете рекламу, документальный фильм или бренд-контент? Мы обеспечим комфортную и чёткую работу на каждом этапе."
      },
      postProduction: {
        title: "Пост-продакшн",
        description: "Мы полностью берём на себя пост-продакшн — от монтажа, цветокоррекции и звукового дизайна до сложной графики и финального мастеринга. Работаем с международными клиентами по всему миру, обеспечивая быструю и понятную коммуникацию и стабильное качество. Реклама, бренд-видео или художественный проект — мы превращаем исходный материал в готовый продукт для эфира. Чёткие сроки без компромиссов по качеству — кадр за кадром."
      }
    },

    // Exceptional Value / Service Production
    exceptional: {
      title: "Сервис-продакшн в Кыргызстане",
      summer: {
        title: "Лето — Иссык-Куль, озера, пляжи",
        description: "Кыргызстан предлагает удивительное разнообразие ландшафтов — горы, озёра, каньоны, степи и города. Съёмки возможны круглый год: все четыре сезона доступны всего в нескольких часах от столицы."
      },
      winter: {
        title: "Зима — горы, лыжи, снежные пейзажи",
        description: "Мы обеспечиваем полный цикл сервисного продакшна. Вы присылаете нам режиссёрский тритмент или концепт — мы рассчитываем бюджет, подбираем локации, формируем съёмочную команду, организуем кастинг и обеспечиваем техническую поддержку."
      },
      autumn: {
        title: "Осень — леса, лошади, теплые цвета",
        description: "Если вы представляете бренд или компанию, мы можем взять на себя весь цикл производства — начиная с препродакшна. Мы разрабатываем креативную концепцию под ваш продукт, подготавливаем сценарий, сториборды и визуальные референсы. На этапе съёмок обеспечиваем полное сопровождение — с возможностью удалённого подключения клиента или агентства. Вы всегда в курсе и вовлечены в процесс. Финальный этап — пост-продакшн: монтаж, моушн-дизайн, звуковое оформление и оригинальная музыка, созданная специально для вашего видео."
      },
      valueProposition: {
        title: "Ценностное предложение",
        description: "Производство в Дубае или Европе может стоить вам в 3–5 раз больше — и не всегда с лучшими результатами. В Кыргызстане вы получаете кинематографичные пейзажи, профессиональные команды и полноценное производство — без завышенных бюджетов.",
        cta: "➡️ Хотите сравнение? Просто спросите — мы покажем вам разницу."
      },
      button: "Получить индивидуальное предложение",
      portfolioTitle: "Наши недавние работы"
    },

    // Showreel
    showreel: {
      watchYoutube: "Смотреть на YouTube",
      tagline: "Полный цикл съёмок в Кыргызстане — от локаций и съёмочной группы до пост-продакшна"
    },

    // Feel Watch Trust
    feelWatchTrust: {
      we: "МЫ",
      makeIt: "ДЕЛАЕМ ЭТО",
      easy: "ЛЕГКО",
      description: "Снимайте в Кыргызстане с полной производственной поддержкой — от потрясающих локаций и местной команды до удаленного моушн-дизайна и VFX",
      contactButton: "Связаться с нами"
    },

    // Everywhere
    everywhere: {
      title: "Везде",
      onsite: {
        title: "На месте в Кыргызстане",
        description: "Испытайте производство мирового класса в сердце Центральной Азии. Наши полностью оборудованные студии и местная экспертиза обеспечивают премиальные результаты по непревзойденной стоимости, в окружении захватывающих горных пейзажей."
      },
      remote: {
        title: "Удаленно",
        description: "Сотрудничайте беспроблемно из любой точки мира. Наши удаленные производственные услуги включают режиссуру в реальном времени, пост-продакшн и креативную консультацию — принося нашу экспертизу прямо к вашему проекту."
      },
      flyUsIn: {
        title: "Привезите нас",
        description: "Нужна наша команда на локации? Мы путешествуем по всему миру с нашей портативной производственной установкой, принося экономичное превосходство Кыргызстана к вашему порогу для международных съемок и сотрудничества."
      }
    },

    // Common
    common: {
      loading: "Загрузка...",
      error: "Ошибка загрузки контента",
      refresh: "Пожалуйста, обновите страницу, если проблема не исчезнет"
    }
  }
};

/**
 * Get translation for a key path
 * @param {string} locale - Language code (en, ru)
 * @param {string} keyPath - Dot-separated path to translation key (e.g., 'nav.portfolio')
 * @param {string} fallback - Fallback text if translation not found
 * @returns {string} Translated text
 */
export function t(locale, keyPath, fallback = keyPath) {
  const keys = keyPath.split('.');
  let value = translations[locale] || translations.en;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  
  return value || fallback;
}

/**
 * Get locale from URL pathname
 * @param {string} pathname - URL pathname
 * @returns {string} Locale code
 */
export function getLocaleFromUrl(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  
  return locale === 'ru' ? 'ru' : 'en';
}

/**
 * Get localized URL path
 * @param {string} path - Original path
 * @param {string} locale - Target locale
 * @returns {string} Localized path
 */
export function getLocalizedPath(path, locale) {
  if (locale === 'en') {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

/**
 * Get all supported locales
 * @returns {Array} Array of locale objects
 */
export function getLocales() {
  return [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];
}

export { translations }; 