export type Lang = "zh" | "en" | "es" | "fr";
export type PageKey = "home" | "about" | "materials" | "fire" | "industries" | "news" | "careers" | "contact";
export type ProductCategory = "heat" | "thermal" | "special";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  nameFr: string;
  cat: ProductCategory;
  icon: string;
  color: string;
  spec: string;
  specEn: string;
  specEs: string;
  specFr: string;
  temp: string;
  tempEn?: string;
  tempEs?: string;
  tempFr?: string;
  apps: string[];
  appsEn: string[];
  appsEs: string[];
  appsFr: string[];
  desc: string;
  descEn: string;
  descEs: string;
  descFr: string;
}

export interface IndustryDetail {
  challenge: string;
  solution: string;
  cases: string;
  products: string;
}

export interface Industry {
  id: string;
  icon: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  img: string;
  detail: Record<Lang, IndustryDetail>;
}

export interface NewsItem {
  id: string;
  date: Record<Lang, string>;
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  href: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Job {
  id: string;
  dept: Record<Lang, string>;
  title: Record<Lang, string>;
  location: Record<Lang, string>;
  type: Record<Lang, string>;
}

export type I18nKey = Lang;

export interface Office {
  city: Record<Lang, string>;
  addr: Record<Lang, string>;
  tel: string;
  role: Record<Lang, string>;
}

export interface TranslationsShape {
  zh: Record<string, any>;
  en: Record<string, any>;
  es: Record<string, any>;
  fr: Record<string, any>;
}

const logoPrysmian = new URL("../../../LOGO/optimized/PRYSMIAN.png", import.meta.url).href;
const logoNexans = new URL("../../../LOGO/optimized/NEXANS.png", import.meta.url).href;
const logoBaosheng = new URL("../../../LOGO/宝胜.png", import.meta.url).href;
const logoShangshang = new URL("../../../LOGO/optimized/上上电缆.png", import.meta.url).href;
const logoLeoni = new URL("../../../LOGO/delesun/LEONI.jpg", import.meta.url).href;
const logoMichelin = new URL("../../../LOGO/optimized/MICHELIN.png", import.meta.url).href;
const logoFuchs = new URL("../../../LOGO/optimized/福斯集团.png", import.meta.url).href;
const logoMeiji = new URL("../../../LOGO/optimized/MEIJI.png", import.meta.url).href;
const logoSandProfile = new URL("../../../LOGO/optimized/SAND PROFILE.png", import.meta.url).href;
const logoHrs = new URL("../../../LOGO/optimized/HRS.png", import.meta.url).href;
const logoKromberg = new URL("../../../LOGO/KROMBERG & SCHUBERT.jpg", import.meta.url).href;
const logoAngstPfister = new URL("../../../LOGO/optimized/ANGST+PFISTER.png", import.meta.url).href;
const logoNolato = new URL("../../../LOGO/optimized/NOLATO.png", import.meta.url).href;
const logoCoficab = new URL("../../../LOGO/optimized/COFICAB.png", import.meta.url).href;
const logoBellofram = new URL("../../../LOGO/optimized/BELLOFRAM ELASTOMERS.png", import.meta.url).href;

const HERO_SLIDE_VISUALS = {
  aerospace: "https://images.unsplash.com/photo-1517976384346-3136801d605d?w=1400&h=1800&fit=crop&auto=format&q=90",
  ev: "https://images.unsplash.com/photo-1708953609405-96cb857fc9f6?w=1400&h=1800&fit=crop&auto=format&q=90",
  semi: "https://images.unsplash.com/photo-1587845323226-bad89242c735?w=1400&h=1800&fit=crop&auto=format&q=90",
  nuclear: "https://images.unsplash.com/photo-1630142895963-6996ae6b3a5b?w=1400&h=1800&fit=crop&auto=format&q=90",
  rail: "https://images.unsplash.com/photo-1514337224818-9787cf717f2a?w=1400&h=1800&fit=crop&auto=format&q=90",
};

const DIVISION_VISUALS = {
  materials: "https://images.unsplash.com/photo-1581092160607-ee67df01f9da?w=800&h=600&fit=crop&auto=format",
  fire: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
};

const INDUSTRY_VISUALS = {
  newEnergy: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=90",
  energyStorage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1_MW_4_MWh_Turner_Energy_Storage_Project_in_Pullman%2C_WA.jpg/1280px-1_MW_4_MWh_Turner_Energy_Storage_Project_in_Pullman%2C_WA.jpg",
  nuclear: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sequoyah_Nuclear_Power_Plant_cooling_towers.jpg",
  semiconductor: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop&auto=format&q=90",
  humanoid: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Nao_humanoid_robot.jpg/1280px-Nao_humanoid_robot.jpg",
  aerospace: new URL("../../../imports/Screenshot_2026-06-30_at_11.53.44.png", import.meta.url).href,
  lowAltitude: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=900&h=600&fit=crop&auto=format&q=90",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=600&fit=crop&auto=format&q=90",
  highSpeedRail: "https://images.unsplash.com/photo-1514337224818-9787cf717f2a?w=900&h=600&fit=crop&auto=format&q=90",
  fireSafety: "https://images.unsplash.com/photo-1758614424770-faf4fa6e8868?w=900&h=600&fit=crop&auto=format&q=90",
};

const NEWS_VISUALS = {
  media: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=700&fit=crop&auto=format&q=90",
  recap: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=700&fit=crop&auto=format&q=90",
  preview: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=700&fit=crop&auto=format&q=90",
};

const PRODUCT_DATA_SEED: Product[] = [
  {
    id: "prod-1", name: "防火硅橡胶", nameEn: "Fire-Resistant Silicone Rubber", nameEs: "Caucho de Silicona Resistente al Fuego", nameFr: "Silicone résistant au feu",
    cat: "heat", icon: "Flame", color: "#C8102E",
    spec: "UL9540A | NFPA855 | 氧指数≥30% | 低烟无卤无毒", specEn: "UL9540A | NFPA855 | LOI ≥ 30% | Low smoke, halogen-free, non-toxic",
    specEs: "UL9540A | NFPA855 | Índice de oxígeno ≥30% | Bajo humo, sin halógenos y no tóxico", specFr: "UL9540A | NFPA855 | LOI ≥ 30 % | Faible fumée, sans halogène, non toxique",
    temp: "-55°C ~ +250°C",
    apps: ["储能", "新能源汽车", "电池", "数据中心", "航空航天", "核能", "防火电缆等"],
    appsEn: ["Cable protection", "Building fireproofing", "Rail transit", "Marine"],
    appsEs: ["Protección de cables", "Protección contra incendios", "Transporte ferroviario", "Marino"],
    appsFr: ["Protection de câbles", "Protection incendie des bâtiments", "Ferroviaire", "Marine"],
    desc: "防火硅橡胶具有硅橡胶的一般性能，当防火硅橡胶遇到火焰时，形成坚硬陶瓷体，阻止火焰、热量扩散，起到防火作用。该材料具有低烟无卤无毒等特性，可在-55度到250度条件下使用，广泛应用于储能、新能源汽车、电池、数据中心、航空航天、核能及防火电缆等防火场合。",
    descEn: "Special formulation delivers outstanding fire resistance—non-propagating in open flame with low smoke, widely used in cable protection and building fireproofing.",
    descEs: "Formulación especial con excelente resistencia al fuego, bajo humo y sin propagación de llama; se usa en protección de cables y construcción.",
    descFr: "Cette formulation spéciale offre une excellente résistance au feu. Elle ne propage pas la flamme, génère peu de fumée et s'emploie largement pour la protection des câbles et le compartimentage coupe-feu des bâtiments."
  },
  {
    id: "prod-2", name: "导热硅胶", nameEn: "Thermally Conductive Silicone", nameEs: "Silicona Conductora Térmica", nameFr: "Silicone thermoconducteur",
    cat: "thermal", icon: "Thermometer", color: "#1B7EC2",
    spec: "导热系数1.5~20W/(m·K) | 纳米导热填料", specEn: "Thermal conductivity 1.5–20 W/(m·K) | Nano thermal fillers",
    specEs: "Conductividad 1,5–20 W/(m·K) | Rellenos nano", specFr: "Conductivité thermique 1,5 à 20 W/(m·K) | Charges thermiques nano",
    temp: "-60°C ~ +250°C",
    apps: ["芯片散热", "电池热管理", "功率器件", "LED模组"],
    appsEn: ["Chip cooling", "Battery thermal management", "Power devices", "LED modules"],
    appsEs: ["Disipación de chips", "Gestión térmica de baterías", "Dispositivos de potencia", "Módulos LED"],
    appsFr: ["Refroidissement de puces", "Gestion thermique des batteries", "Composants de puissance", "Modules LED"],
    desc: "采用高导热纳米填料技术，兼顾优异导热性能与电气绝缘性，是新能源汽车和电子设备的核心热管理材料。",
    descEn: "Nano-filler technology balances high thermal conductivity and electrical insulation, making it a core thermal-management material for EVs and electronics.",
    descEs: "Tecnología de rellenos nano con alta conductividad y aislamiento eléctrico para gestión térmica en VE y electrónica.",
    descFr: "La technologie à charges nanométriques associe forte conductivité thermique et isolation électrique, ce qui en fait un matériau central pour la gestion thermique des véhicules électriques et de l'électronique."
  },
  {
    id: "prod-3", name: "耐高温硅胶", nameEn: "High-Temperature Silicone", nameEs: "Silicona de Alta Temperatura", nameFr: "Silicone haute température",
    cat: "heat", icon: "Zap", color: "#E8820C",
    spec: "连续耐温250°C | 瞬时耐温350°C | 抗老化", specEn: "Continuous 250°C | Peak 350°C | Anti-aging",
    specEs: "250°C continuo | 350°C pico | Antienvejecimiento", specFr: "250 °C en continu | 350 °C en pointe | Résistant au vieillissement",
    temp: "-60°C ~ +300°C",
    apps: ["工业密封", "烤箱密封件", "排气管密封", "航空航天"],
    appsEn: ["Industrial sealing", "Oven gaskets", "Exhaust sealing", "Aerospace"],
    appsEs: ["Sellado industrial", "Juntas de horno", "Sellado de escape", "Aeroespacial"],
    appsFr: ["Étanchéité industrielle", "Joints de fours", "Étanchéité de lignes d'échappement", "Aéronautique et spatial"],
    desc: "经高温稳定剂改性，在极端温度下保持优异物理性能，适用于工业及航空航天领域的高温密封与防护。",
    descEn: "Modified with high-temperature stabilizers to maintain excellent physical properties under extreme heat, suitable for high-temperature sealing and protection in industry and aerospace.",
    descEs: "Con estabilizadores de alta temperatura para mantener propiedades en calor extremo, ideal para sellado y protección en industria y aeroespacial.",
    descFr: "Formulé avec des stabilisants haute température, il conserve d'excellentes propriétés physiques sous forte chaleur et convient aux besoins d'étanchéité et de protection dans l'industrie comme dans l'aéronautique-spatial."
  },
  {
    id: "prod-4", name: "发泡硅橡胶", nameEn: "Foamed Silicone Rubber", nameEs: "Caucho de Silicona Espumado", nameFr: "Caoutchouc de silicone expansé",
    cat: "special", icon: "Layers", color: "#2E6B9E",
    spec: "密度0.25~0.85 g/cm³ | 压缩永久变形2%~15%", specEn: "Density 0.25–0.85 g/cm³ | Compression set 2–15%",
    specEs: "Densidad 0,25–0,85 g/cm³ | Deformación permanente por compresión 2–15%", specFr: "Densité 0,25 à 0,85 g/cm³ | Déformation permanente 2 à 15 %",
    temp: "-60°C ~ +200°C",
    apps: ["密封衬垫", "隔音减振", "电子防护", "医疗设备"],
    appsEn: ["Sealing gaskets", "Sound & vibration damping", "Electronics protection", "Medical devices"],
    appsEs: ["Juntas de sellado", "Aislamiento acústico y vibración", "Protección electrónica", "Dispositivos médicos"],
    appsFr: ["Joints d'étanchéité", "Isolation acoustique et antivibratoire", "Protection électronique", "Dispositifs médicaux"],
    desc: "精密发泡工艺制备，具有优异回弹性和隔音减振性能，可按客户需求定制密度和压缩率。",
    descEn: "Produced via precision foaming, offering excellent resilience and sound/vibration damping. Density and compression ratio can be customized.",
    descEs: "Fabricado mediante espumado de precisión, con gran resiliencia y amortiguación; densidad y compresión personalizables.",
    descFr: "Issu d'un procédé de moussage de précision, il offre une excellente résilience ainsi qu'un bon amortissement acoustique et vibratoire. La densité et le taux de compression peuvent être adaptés sur mesure."
  },
  {
    id: "prod-5", name: "阻燃硅橡胶", nameEn: "Flame-Retardant Silicone", nameEs: "Silicona Ignífuga", nameFr: "Silicone ignifuge",
    cat: "heat", icon: "Shield", color: "#C8102E",
    spec: "UL94 V-0 | 无卤无磷 | 低烟无毒", specEn: "UL94 V-0 | Halogen & phosphorus-free | Low smoke, non-toxic",
    specEs: "UL94 V-0 | Sin halógenos ni fósforo | Bajo humo y no tóxico", specFr: "UL94 V-0 | Sans halogène ni phosphore | Faible fumée, non toxique",
    temp: "-60°C ~ +250°C",
    apps: ["新能源电池包", "数据中心", "轨道交通", "电线电缆"],
    appsEn: ["EV battery packs", "Data centers", "Rail transit", "Wires & cables"],
    appsEs: ["Paquetes de baterías VE", "Centros de datos", "Transporte ferroviario", "Cables"],
    appsFr: ["Batteries de véhicules électriques", "Centres de données", "Transport ferroviaire", "Fils et câbles"],
    desc: "满足UL94 V-0阻燃等级，不含卤素和磷元素，燃烧时低烟无毒，是新能源汽车和轨道交通的安全首选。",
    descEn: "Meets UL94 V-0, free of halogens and phosphorus. Produces low smoke and low toxicity during combustion—ideal for EVs and rail transit safety.",
    descEs: "Cumple UL94 V-0, sin halógenos ni fósforo; bajo humo y toxicidad, recomendado para VE y transporte ferroviario.",
    descFr: "Conforme à UL94 V-0, sans halogène ni phosphore, ce matériau dégage peu de fumée et présente une faible toxicité en combustion. Il constitue un choix sûr pour les véhicules électriques et le ferroviaire."
  },
  {
    id: "prod-6", name: "耐油硅橡胶", nameEn: "Oil-Resistant Silicone", nameEs: "Silicona Resistente al Aceite", nameFr: "Silicone résistant aux huiles",
    cat: "special", icon: "Droplets", color: "#1B5E8E",
    spec: "耐油膨胀率 ≤ 30% | 耐醇类/烃类溶剂", specEn: "Oil swelling ≤ 30% | Resistant to alcohols & hydrocarbons",
    specEs: "Hinchamiento ≤ 30% | Resistente a alcoholes e hidrocarburos", specFr: "Gonflement dans l'huile ≤ 30 % | Résistant aux alcools et hydrocarbures",
    temp: "-60°C ~ +200°C",
    apps: ["汽车密封件", "机械密封", "化工管道", "液压系统"],
    appsEn: ["Automotive seals", "Mechanical seals", "Chemical pipelines", "Hydraulic systems"],
    appsEs: ["Sellos automotrices", "Sellos mecánicos", "Tuberías químicas", "Sistemas hidráulicos"],
    appsFr: ["Joints automobiles", "Étanchéité mécanique", "Canalisations chimiques", "Systèmes hydrauliques"],
    desc: "特殊配方改性，在润滑油、燃油及溶剂环境中保持尺寸稳定性，是汽车及工业密封领域的可靠选择。",
    descEn: "Specially modified to maintain dimensional stability in lubricants, fuels, and solvents—reliable for automotive and industrial sealing.",
    descEs: "Modificada para estabilidad dimensional en aceites, combustibles y solventes; solución confiable para sellado automotriz e industrial.",
    descFr: "Sa formulation spécifique lui permet de conserver sa stabilité dimensionnelle au contact des lubrifiants, carburants et solvants. C'est une solution fiable pour l'étanchéité automobile et industrielle."
  },
  {
    id: "prod-7", name: "隔热硅橡胶", nameEn: "Heat-Insulating Silicone", nameEs: "Silicona Aislante Térmica", nameFr: "Silicone isolant thermique",
    cat: "thermal", icon: "Wind", color: "#3D7DC8",
    spec: "导热系数 ≤ 0.4 W/(m·K) | 低导热高隔热", specEn: "Thermal conductivity ≤ 0.4 W/(m·K) | Low k, high insulation",
    specEs: "Conductividad ≤ 0,4 W/(m·K) | Bajo k, alto aislamiento", specFr: "Conductivité thermique ≤ 0,4 W/(m·K) | Faible conductivité, forte isolation",
    temp: "-60°C ~ +250°C",
    apps: ["电池模块隔热", "工业炉衬里", "管道保温", "建筑节能"],
    appsEn: ["Battery module insulation", "Industrial furnace lining", "Pipe insulation", "Building energy saving"],
    appsEs: ["Aislamiento de módulos", "Revestimiento de hornos", "Aislamiento de tuberías", "Eficiencia energética"],
    appsFr: ["Isolation de modules batterie", "Revêtement de fours industriels", "Isolation de tuyauteries", "Performance énergétique du bâtiment"],
    desc: "极低导热系数有效阻隔热量传导，在新能源电池热管理和工业保温领域发挥关键隔热作用。",
    descEn: "Ultra-low thermal conductivity blocks heat transfer and plays a key role in EV battery thermal safety and industrial insulation.",
    descEs: "Conductividad ultrabaja para bloquear la transferencia de calor, clave en baterías y aislamiento industrial.",
    descFr: "Sa très faible conductivité thermique limite efficacement les transferts de chaleur. Il joue un rôle clé dans la sécurité thermique des batteries et dans l'isolation industrielle."
  },
  {
    id: "prod-8", name: "低压变硅橡胶", nameEn: "Low Compression Set Silicone", nameEs: "Silicona de Baja Deformación Permanente", nameFr: "Silicone à faible déformation permanente",
    cat: "special", icon: "Gauge", color: "#1B2F5E",
    spec: "压缩永久变形 < 5%（175°C×22h×50%）", specEn: "Compression set < 5% (175°C × 22h × 50%)",
    specEs: "Deformación < 5% (175°C × 22h × 50%)", specFr: "Déformation permanente < 5 % (175°C × 22 h × 50 %)",
    temp: "-60°C ~ +230°C",
    apps: ["精密密封件", "医疗设备", "食品接触件", "半导体"],
    appsEn: ["Precision seals", "Medical devices", "Food-contact parts", "Semiconductors"],
    appsEs: ["Sellos de precisión", "Dispositivos médicos", "Piezas grado alimentario", "Semiconductores"],
    appsFr: ["Joints de précision", "Dispositifs médicaux", "Pièces au contact alimentaire", "Semi-conducteurs"],
    desc: "特殊硫化工艺处理，极低压缩永久变形率确保长期密封可靠性，符合食品级和医疗级标准。",
    descEn: "Special curing process delivers extremely low compression set for long-term sealing reliability, compliant with food- and medical-grade requirements.",
    descEs: "Curado especial con deformación permanente muy baja para sellado confiable, conforme a estándares alimentarios y médicos.",
    descFr: "Grâce à un procédé de vulcanisation spécifique, ce matériau présente une très faible déformation permanente et garantit une étanchéité durable, conforme aux exigences des secteurs alimentaire et médical."
  },
  {
    id: "prod-9", name: "高强度硅橡胶", nameEn: "High-Strength Silicone", nameEs: "Silicona de Alta Resistencia", nameFr: "Silicone haute résistance",
    cat: "special", icon: "Award", color: "#1B2F5E",
    spec: "拉伸强度12~13 MPa | 高撕裂强度", specEn: "Tensile strength 12–13 MPa | High tear strength",
    specEs: "Resistencia a tracción 12–13 MPa | Alta resistencia al desgarro", specFr: "Résistance à la traction 12 à 13 MPa | Forte résistance à la déchirure",
    temp: "-60°C ~ +250°C",
    apps: ["航空航天密封", "深海装备", "高压管道", "军工设备"],
    appsEn: ["Aerospace sealing", "Deep-sea equipment", "High-pressure pipelines", "Defense equipment"],
    appsEs: ["Sellado aeroespacial", "Equipos submarinos", "Tuberías de alta presión", "Defensa"],
    appsFr: ["Étanchéité aérospatiale", "Équipements sous-marins", "Conduites haute pression", "Équipements de défense"],
    desc: "纳米补强技术显著提升机械强度，在高压、振动及极端环境下保持结构完整性，满足航空航天及军工标准。",
    descEn: "Nano-reinforcement significantly improves mechanical strength, maintaining structural integrity under high pressure, vibration, and extreme environments for aerospace and defense standards.",
    descEs: "El refuerzo nano mejora la resistencia mecánica y mantiene integridad en presión, vibración y entornos extremos para aeroespacial y defensa.",
    descFr: "Le renfort nanométrique augmente nettement la résistance mécanique et préserve l'intégrité structurelle sous haute pression, vibrations et environnements extrêmes, conformément aux exigences de l'aérospatial et de la défense."
  },
  {
    id: "prod-10", name: "耐热剂", nameEn: "Heat Resistance Agent", nameEs: "Aditivo Mejorador de Resistencia al Calor", nameFr: "Additif d'amélioration de la résistance thermique",
    cat: "heat", icon: "Atom", color: "#8B2FC8",
    spec: "添加量1~5% | 耐热等级提升>50°C", specEn: "Dosage 1–5% | Heat rating + >50°C",
    specEs: "Dosificación 1–5% | Mejora >50°C", specFr: "Dosage 1 à 5 % | Gain de tenue thermique > 50°C",
    temp: "耐热性显著提升", tempEn: "Significant heat resistance improvement",
    tempEs: "Mejora notable de resistencia al calor", tempFr: "Amélioration nette de la tenue en température",
    apps: ["橡胶改性", "工程塑料", "耐热涂层", "电线电缆"],
    appsEn: ["Rubber modification", "Engineering plastics", "Heat-resistant coatings", "Wires & cables"],
    appsEs: ["Modificación de caucho", "Plásticos de ingeniería", "Recubrimientos resistentes al calor", "Cables"],
    appsFr: ["Modification des caoutchoucs", "Plastiques techniques", "Revêtements haute température", "Fils et câbles"],
    desc: "专为橡胶和塑料配方设计的功能添加剂，少量添加即可显著提升材料耐热性和抗老化性能。",
    descEn: "Functional additive for rubber and plastic formulations—small dosage significantly improves heat resistance and anti-aging performance.",
    descEs: "Aditivo funcional para caucho y plásticos; pequeñas dosis mejoran notablemente resistencia al calor y al envejecimiento.",
    descFr: "Additif fonctionnel conçu pour les formulations caoutchouc et plastique. À faible dosage, il améliore sensiblement la résistance à la chaleur et au vieillissement."
  },
  {
    id: "prod-11", name: "隔热涂层", nameEn: "Thermal Insulation Coating", nameEs: "Recubrimiento de Aislamiento Térmico", nameFr: "Revêtement d'isolation thermique",
    cat: "thermal", icon: "Wind", color: "#4A86D9",
    spec: "导热系数<0.12 W/(m·K) | 薄涂施工 | 耐候耐老化", specEn: "Thermal conductivity < 0.12 W/(m·K) | Thin-film application | Weather & aging resistant",
    specEs: "Conductividad <0,12 W/(m·K) | Aplicación en capa fina | Resistente a intemperie y envejecimiento", specFr: "Conductivité thermique < 0,12 W/(m·K) | Application en couche mince | Résistant aux intempéries et au vieillissement",
    temp: "-50°C ~ +220°C",
    apps: ["储能柜体外壁", "工业设备表面", "管道阀门保温", "建筑金属屋面"],
    appsEn: ["ESS cabinet outer walls", "Industrial equipment surfaces", "Pipe & valve insulation", "Metal roofing"],
    appsEs: ["Paredes externas de ESS", "Superficies de equipos", "Aislamiento de tuberías y válvulas", "Cubiertas metálicas"],
    appsFr: ["Parois extérieures d'armoires ESS", "Surfaces d'équipements industriels", "Isolation de tuyauteries et vannes", "Toitures métalliques"],
    desc: "面向设备与结构表面的功能型隔热涂层，兼顾薄层施工效率、长期耐候性与稳定隔热性能，可用于储能柜、管道和工业设备外壁热防护。",
    descEn: "A functional thermal insulation coating for equipment and structural surfaces, balancing thin-film application efficiency, long-term weather resistance, and stable thermal protection for ESS cabinets, pipelines, and industrial equipment.",
    descEs: "Recubrimiento funcional de aislamiento térmico para superficies de equipos y estructuras, con aplicación en capa fina, resistencia climática y protección térmica estable para ESS, tuberías y equipos industriales.",
    descFr: "Revêtement fonctionnel d'isolation thermique pour les surfaces d'équipements et de structures, il combine efficacité d'application en couche mince, tenue durable aux intempéries et protection thermique stable pour armoires ESS, tuyauteries et équipements industriels."
  },
  {
    id: "prod-12", name: "隔热发泡涂层", nameEn: "Foamed Thermal Insulation Coating", nameEs: "Recubrimiento Espumado de Aislamiento Térmico", nameFr: "Revêtement expansé d'isolation thermique",
    cat: "thermal", icon: "Layers", color: "#2E6B9E",
    spec: "发泡闭孔结构 | 轻量厚涂 | 隔热降噪", specEn: "Closed-cell foamed structure | Lightweight build coat | Thermal & acoustic insulation",
    specEs: "Estructura espumada de celda cerrada | Capa ligera de alto espesor | Aislamiento térmico y acústico", specFr: "Structure expansée à cellules fermées | Couche épaisse légère | Isolation thermique et acoustique",
    temp: "-50°C ~ +200°C",
    apps: ["储能舱内壁", "箱体防凝露", "机柜隔热降噪", "复杂曲面热防护"],
    appsEn: ["ESS enclosure inner walls", "Anti-condensation for housings", "Cabinet insulation & noise reduction", "Thermal protection on complex surfaces"],
    appsEs: ["Paredes internas de ESS", "Anticondensación en carcasas", "Aislamiento y reducción de ruido", "Protección térmica en superficies complejas"],
    appsFr: ["Parois internes de compartiments ESS", "Protection anticondensation des coffrets", "Isolation et réduction du bruit des armoires", "Protection thermique de surfaces complexes"],
    desc: "采用发泡隔热体系形成轻质闭孔涂层，在提升热阻的同时兼顾减振降噪与防凝露表现，适合储能舱体、设备箱体及复杂曲面的一体化热防护。",
    descEn: "Built on a foamed insulation system that forms a lightweight closed-cell coating, improving thermal resistance while adding vibration damping, noise reduction, and anti-condensation performance for ESS enclosures and complex equipment surfaces.",
    descEs: "Basado en un sistema espumado que forma un recubrimiento ligero de celdas cerradas, mejora la resistencia térmica y aporta amortiguación, reducción de ruido y control de condensación para recintos ESS y superficies complejas.",
    descFr: "Basé sur un système expansé formant un revêtement léger à cellules fermées, il améliore la résistance thermique tout en apportant amortissement vibratoire, réduction du bruit et maîtrise de la condensation pour les enceintes ESS et les surfaces complexes."
  }
];

const INDUSTRY_IDS = ["newEnergy", "energyStorage", "nuclear", "semiconductor", "humanoid", "aerospace", "lowAltitude", "dataCenter", "highSpeedRail"];
const INDUSTRY_ICONS = ["Zap", "Gauge", "Atom", "Cpu", "Bot", "Rocket", "Rocket", "Cpu", "Gauge"];
const INDUSTRY_IMG_KEYS: (keyof typeof INDUSTRY_VISUALS)[] = ["newEnergy", "energyStorage", "nuclear", "semiconductor", "humanoid", "aerospace", "lowAltitude", "dataCenter", "highSpeedRail"];

const INDUSTRY_DETAIL_ZH = [
  { challenge: "电池组充放电产生大量热量，热失控风险高；高压电气系统对绝缘材料要求严苛；密封件须同时耐受电解液腐蚀与极端温度循环。",
    solution: "导热硅胶垫片（1.5~18 W/m·K）实现精确热管理；防火硅橡胶（UL94 V-0 & UL9540A）为电池包提供被动安全保护；耐高温硅橡胶200度硅橡胶确保高温线缆长效运行。",
    cases: "动力电池模组热管理垫片 · 高压线束绝缘保护套 · 电驱系统密封组件 · 充电接口防护结构",
    products: "导热硅胶垫片系列 · 防火阻燃硅橡胶泡棉 · 热失控防护防火密封材料 · 耐高温绝缘硅橡胶" },
  { challenge: "储能柜与电池舱内部热量累积明显，系统需要兼顾隔热、防火与长期户外稳定性；Pack 与柜体连接处要求高可靠密封与绝缘；项目交付中对一致性和防火阻燃认证要求更高。",
    solution: "隔热硅橡胶与导热材料组合控制温升路径；耐火硅橡胶与膨胀型防火阻燃材料构建舱级被动防火屏障；低压缩永久变形密封材料提升长期服役可靠性。",
    cases: "储能电池舱防火隔热层 · 液冷系统密封垫片 · Pack 箱体密封条 · 储能柜电缆贯穿防护",
    products: "隔热硅橡胶板材 · 耐火硅橡胶板材 · 阻燃硅橡胶密封条 · 低压变硅橡胶密封件" },
  { challenge: "核电站工况极苛刻，材料须承受γ射线辐照累积剂量≥10 MGy；工作温度-40°C~200°C；密封件须满足ASME NQA-1质量保证体系要求。",
    solution: "特种耐辐射硅橡胶经专有配方改性，辐照老化性能卓越；高压密封硅橡胶满足核电站一、二级密封要求；支持定制核级认证材料文件包。",
    cases: "反应堆舱室密封系统 · 电气贯穿密封组件 · 核辐射屏蔽弹性垫 · 应急柴油发电机进气密封",
    products: "耐辐射特种硅橡胶 · 核级密封板材 · 低压缩永久变形硅橡胶密封件" },
  { challenge: "先进封装工艺对材料纯度、挥发性（VOC）和离子污染有极严苛要求；功率密度持续提升，芯片散热已成核心瓶颈；洁净室环境对低尘耐磨提出新挑战。",
    solution: "半导体级高纯硅橡胶满足MIL-SPEC纯度标准，VOC含量<50 ppm；超薄高导热界面材料（≥8 W/m·K）显著降低热阻；低尘耐磨配方适用于晶圆传输机器人。",
    cases: "芯片封装底填充保护 · 功率器件热界面材料 · 光刻机精密密封件 · 晶圆传输机器人关节密封",
    products: "半导体级高纯硅胶垫片 · 超薄导热硅橡胶 · 低VOC封装硅凝胶 · 洁净室用低尘密封件" },
  { challenge: "机器人关节密封需耐百万次以上重复弯折；柔性执行器对硅橡胶拉伸强度与弹性恢复率要求极高；仿生皮肤传感器需超柔软且具备导电性能的复合材料。",
    solution: "高强度硅橡胶（抗拉强度≥12 MPa）满足关节密封疲劳寿命；发泡硅橡胶为机器人提供轻量化缓冲结构；导电硅橡胶复合材料实现柔性传感功能。",
    cases: "关节防尘密封圈 · 柔性气动人工肌肉 · 电子皮肤传感层 · 电缆护套与连接器密封",
    products: "高强度低压变硅橡胶 · 导电硅橡胶复合材料 · 超柔性发泡硅橡胶 · 耐磨关节密封件" },
  { challenge: "航天材料须通过-196°C深冷至+260°C高温循环测试；发射过程承受强烈振动与噪声；真空环境下材料出气量须满足ASTM E595标准（TML<1%，CVCM<0.1%）。",
    solution: "航天级硅橡胶耐温-60°C~+300°C，热稳定性卓越；低出气量配方满足航天器内部材料严苛标准；高强度密封件通过MIL-STD振动与冲击全项认证。",
    cases: "火箭发动机喷嘴密封 · 卫星热控涂层基材 · 航空发动机舱密封系统 · 机载电子设备防护封装",
    products: "航天级耐高温硅橡胶 · 低出气量硅橡胶 · 高强度阻燃硅橡胶板材 · 耐高温导热垫片" },
  { challenge: "低空飞行器对轻量化、阻燃安全与环境适应性要求并存；电驱与航电系统在高低温、振动和湿热工况下需要长期稳定绝缘与密封；复杂舱体结构对材料成型与可靠装配提出更高要求。",
    solution: "轻量化发泡硅橡胶与高强度密封材料兼顾减重与防护；防火硅橡胶和导热界面材料支持电池与航电系统热安全；低出气、耐候密封方案满足复杂飞行工况下的长期服役要求。",
    cases: "eVTOL 电池包热防护 · 航电系统密封垫圈 · 机舱线束防护套 · 旋翼驱动模组减振密封",
    products: "轻量化发泡硅橡胶 · 防火硅橡胶板材 · 导热硅胶垫片 · 耐候密封硅橡胶" },
  { challenge: "高功率服务器与储能备电系统带来持续热积累；线缆与母线贯穿区域需要兼顾防火封堵、绝缘与可维护性；机柜长期运行对密封材料尺寸稳定性和低烟无毒提出更高要求。",
    solution: "导热与隔热材料协同优化机柜与电源系统热路径；防火封堵硅橡胶系统阻断火焰沿线缆通道蔓延；低压缩永久变形密封材料保障机柜门体与接口长期可靠密封。",
    cases: "机柜门体密封条 · 电缆贯穿防火封堵 · UPS/电池柜热防护垫片 · 冷却系统密封组件",
    products: "导热硅胶垫片 · 隔热硅橡胶板材 · 防火封堵硅橡胶块材 · 低压变硅橡胶密封件" },
  { challenge: "高铁车辆运行环境伴随振动、温差与长期户外老化；车厢、电缆和贯穿部位材料需满足 EN 45545-2 等高等级防火低烟低毒要求；门窗与连接系统对密封件疲劳寿命和耐候性要求极高。",
    solution: "防火阻燃硅橡胶满足车内外关键部位的被动安全要求；耐高温与耐候密封材料保障车门、线缆与连接部位长期稳定；导热与减振材料帮助电子电气系统实现热管理与服役可靠性。",
    cases: "车厢门窗密封条 · 线束护套与贯穿密封 · 牵引系统热管理垫片 · 车载设备减振缓冲件",
    products: "防火阻燃硅橡胶板材 · 低烟无卤密封条 · 导热硅胶垫片 · 耐候减振发泡硅橡胶" }
];

const INDUSTRY_DETAIL_EN = [
  { challenge: "Battery packs generate significant heat during charge/discharge, increasing thermal runaway risk. High-voltage electrical systems demand stringent insulation. Seals must withstand electrolyte corrosion and extreme thermal cycling.",
    solution: "Thermally conductive silicone pads (1.5-18 W/m·K) deliver precise thermal management. Fire-resistant silicone (UL94 V-0 & UL9540A) provides passive protection for battery packs. 200°C-rated high-temperature silicone rubber helps ensure long-term reliability in high-temperature cable applications.",
    cases: "Battery module thermal interface pads · HV harness insulation sleeves · E-drive sealing components · Charging interface protection structures",
    products: "Thermally conductive silicone pad series · Fire-resistant and flame-retardant silicone foam · Fire-sealing materials for thermal-runaway protection · High-temperature insulating silicone rubber" },
  { challenge: "Energy storage cabinets and battery enclosures accumulate substantial heat over time, so the system must balance thermal insulation, fire protection, and long-term outdoor durability. Pack-to-cabinet joints require highly reliable sealing and insulation. Project delivery also demands tighter consistency and stricter fire-resistance and flame-retardancy certification compliance.",
    solution: "Heat-insulating silicone combined with thermally conductive materials helps control temperature-rise paths. Fire-resistant silicone and intumescent fire-protection materials form passive cabinet-level fire barriers. Low-compression-set sealing materials improve long-term service reliability.",
    cases: "Fire and insulation layers for energy storage containers · Liquid-cooling system gaskets · Pack enclosure sealing strips · Cable penetration protection for ESS cabinets",
    products: "Heat-insulating silicone sheets · Fire-resistant silicone sheets · Flame-retardant sealing strips · Low compression set silicone seals" },
  { challenge: "Nuclear plant conditions are extremely demanding. Materials must withstand cumulative γ irradiation dose ≥10 MGy and operate from -40°C to 200°C. Seals must comply with the ASME NQA-1 quality assurance system.",
    solution: "Radiation-resistant specialty silicone rubber with proprietary formulation delivers excellent irradiation aging performance. High-pressure sealing silicone meets Class I/II sealing requirements. Full nuclear-grade documentation packages can be customized.",
    cases: "Reactor compartment sealing systems · Electrical penetration seals · Radiation-shielding elastomer pads · Emergency diesel generator intake seals",
    products: "Radiation-resistant specialty silicone · Nuclear-grade sealing sheets · Low compression set silicone seals" },
  { challenge: "Advanced packaging requires ultra-high purity, low VOC, and strict ion contamination control. Rising power density makes thermal management a core bottleneck. Cleanroom environments impose new demands for low particle shedding and wear resistance.",
    solution: "Semiconductor-grade high-purity silicone meets MIL-SPEC purity requirements with VOC < 50 ppm. Ultra-thin high-conductivity interface materials (≥8 W/m·K) reduce thermal resistance. Low-dust, wear-resistant formulations fit wafer handling robots.",
    cases: "Underfill protection for chip packaging · Thermal interface materials for power devices · Precision seals for lithography tools · Joint seals for wafer transfer robots",
    products: "Semiconductor-grade silicone pads · Ultra-thin thermal silicone · Low-VOC encapsulation silicone gel · Low-dust cleanroom seals" },
  { challenge: "Robot joint seals must survive millions of bending cycles. Flexible actuators require high tensile strength and elastic recovery. Bionic skin sensors need ultra-soft, conductive composite materials.",
    solution: "High-strength silicone rubber (tensile ≥12 MPa) supports long-life joint sealing. Foamed silicone rubber provides lightweight cushioning structures. Conductive silicone composites enable flexible sensing layers.",
    cases: "Dust-proof joint sealing rings · Pneumatic artificial muscles · E-skin sensing layers · Cable jackets and connector seals",
    products: "High-strength low compression set silicone · Conductive silicone composites · Ultra-soft foamed silicone · Wear-resistant joint seals" },
  { challenge: "Aerospace materials must pass cycling from -196°C cryogenic to +260°C. Launch introduces intense vibration and noise. In vacuum, outgassing must meet ASTM E595 (TML<1%, CVCM<0.1%).",
    solution: "Aerospace-grade silicone rubber operates from -60°C to +300°C with excellent thermal stability. Low-outgassing formulations meet stringent spacecraft interior standards. High-strength seals pass MIL-STD vibration and shock certification.",
    cases: "Rocket engine nozzle seals · Satellite thermal control coating substrates · Aircraft engine bay sealing systems · Protective potting for avionics",
    products: "Aerospace high-temperature silicone · Low-outgassing silicone rubber · High-strength flame-retardant silicone sheets · High-temperature thermal pads" },
  { challenge: "Low-altitude aircraft require a careful balance of lightweighting, fire safety, and environmental durability. Electric propulsion and avionics systems need stable insulation and sealing under temperature swings, vibration, and humidity. Complex cabin structures also demand precise forming and reliable assembly.",
    solution: "Lightweight foamed silicone rubber and high-strength sealing materials help reduce weight while maintaining protection. Fire-resistant silicone and thermal interface materials support battery and avionics thermal safety. Low-outgassing, weather-resistant sealing systems are built for long-term service in demanding flight conditions.",
    cases: "eVTOL battery pack thermal protection · Avionics sealing gaskets · Cabin harness protection sleeves · Rotor-drive module damping seals",
    products: "Lightweight foamed silicone rubber · Fire-resistant silicone sheets · Thermally conductive silicone pads · Weather-resistant sealing silicone" },
  { challenge: "High-power servers and backup energy systems generate continuous heat accumulation. Cable and busbar penetrations must balance fire stopping, insulation, and maintainability. Long-term cabinet operation also raises the bar for dimensional stability, low smoke, and low toxicity.",
    solution: "Thermal-interface and insulation materials work together to optimize heat paths in cabinets and power systems. Firestop silicone systems block flame spread along cable routes. Low compression set sealing materials help maintain long-term reliability at cabinet doors and interface locations.",
    cases: "Cabinet door sealing strips · Cable penetration fire stopping · UPS / battery cabinet thermal-protection pads · Cooling-system sealing components",
    products: "Thermally conductive silicone pads · Heat-insulating silicone sheets · Firestop silicone blocks · Low compression set silicone seals" },
  { challenge: "High-speed rail vehicles face vibration, temperature cycling, and long-term outdoor aging. Carriages, cables, and penetration areas must comply with EN 45545-2 and other high-level fire, low-smoke, and low-toxicity requirements. Doors, windows, and connection systems also demand excellent fatigue life and weather resistance from sealing materials.",
    solution: "Fire-resistant and flame-retardant silicone meets passive-safety requirements in critical interior and exterior rail applications. High-temperature and weather-resistant sealing materials help keep doors, cables, and connection points reliable over the long term. Thermal-management and damping materials further improve the durability of onboard electronic systems in service.",
    cases: "Carriage door and window sealing strips · Harness sleeves and penetration seals · Traction-system thermal pads · Onboard equipment damping buffers",
    products: "Fire-resistant and flame-retardant silicone sheets · Low-smoke halogen-free sealing strips · Thermally conductive silicone pads · Weather-resistant foamed silicone dampers" }
];

const INDUSTRY_DETAIL_ES = [
  { challenge: "Los paquetes de baterías generan una gran cantidad de calor durante la carga y descarga, con alto riesgo de fuga térmica; los sistemas eléctricos de alto voltaje exigen materiales aislantes muy rigurosos; y los sellos deben resistir tanto la corrosión del electrolito como los ciclos térmicos extremos.",
    solution: "Las almohadillas de silicona térmicamente conductiva (1,5-18 W/m·K) permiten una gestión térmica precisa. La silicona resistente al fuego (UL94 V-0 y UL9540A) aporta protección pasiva al paquete de baterías. La silicona de alta temperatura, con clasificación de 200°C, ayuda a garantizar la fiabilidad a largo plazo en aplicaciones de cableado para alta temperatura.",
    cases: "Almohadillas térmicas para módulos de batería · Manguitos aislantes para arneses de alto voltaje · Componentes de sellado del sistema de tracción eléctrica · Estructuras de protección para interfaces de carga",
    products: "Serie de almohadillas de silicona conductiva térmica · Espuma de silicona resistente al fuego e ignífuga · Materiales de sellado cortafuego para protección frente a la fuga térmica · Silicona aislante para alta temperatura" },
  { challenge: "En los gabinetes de almacenamiento energético y compartimentos de baterías se acumula una cantidad considerable de calor, por lo que el sistema debe equilibrar aislamiento térmico, protección contra incendios y estabilidad a largo plazo en exteriores. Las uniones entre el pack y el gabinete requieren sellado y aislamiento de alta fiabilidad. Además, la entrega del proyecto exige mayor consistencia y un cumplimiento más estricto de las certificaciones de resistencia al fuego e ignifugación.",
    solution: "La combinación de silicona aislante térmica y materiales conductivos ayuda a controlar la ruta de aumento de temperatura. La silicona resistente al fuego, junto con materiales intumescentes de protección contra incendios, forma barreras pasivas a nivel de gabinete. Los materiales de sellado de baja deformación permanente mejoran la fiabilidad de servicio a largo plazo.",
    cases: "Capas cortafuego y de aislamiento para compartimentos de baterías ESS · Juntas de sistemas de refrigeración líquida · Tiras de sellado para cajas de pack · Protección de penetraciones de cable en gabinetes ESS",
    products: "Láminas de silicona aislante térmica · Láminas de silicona resistente al fuego · Tiras de sellado ignífugas · Sellos de silicona de baja deformación permanente" },
  { challenge: "Las condiciones en una central nuclear son extremadamente exigentes. Los materiales deben soportar una dosis acumulada de irradiación γ ≥10 MGy y operar entre -40°C y 200°C. Los sellos deben cumplir con el sistema de aseguramiento de calidad ASME NQA-1.",
    solution: "La silicona especial resistente a la radiación, modificada con formulación propia, ofrece un excelente comportamiento frente al envejecimiento por irradiación. La silicona de sellado de alta presión cumple con los requisitos de sellado de clase I/II. También se pueden personalizar paquetes documentales completos de grado nuclear.",
    cases: "Sistemas de sellado en compartimentos de reactores · Sellos de penetración eléctrica · Almohadillas elastoméricas de blindaje radiológico · Sellos de admisión para generadores diésel de emergencia",
    products: "Silicona especial resistente a la radiación · Láminas de sellado de grado nuclear · Sellos de silicona de baja deformación permanente" },
  { challenge: "El encapsulado avanzado exige pureza ultraalta, bajo VOC y un control muy estricto de contaminación iónica. El aumento continuo de la densidad de potencia convierte la gestión térmica en un cuello de botella clave. Los entornos de sala limpia también exigen baja emisión de partículas y alta resistencia al desgaste.",
    solution: "La silicona de alta pureza para semiconductores cumple con requisitos de pureza MIL-SPEC y VOC < 50 ppm. Los materiales de interfaz térmica ultrafinos y de alta conductividad (≥8 W/m·K) reducen la resistencia térmica. Las formulaciones de bajo polvo y alta resistencia al desgaste son adecuadas para robots de manipulación de obleas.",
    cases: "Protección underfill para encapsulado de chips · Materiales de interfaz térmica para dispositivos de potencia · Sellos de precisión para equipos de litografía · Sellos articulares para robots de transferencia de obleas",
    products: "Almohadillas de silicona de grado semiconductor · Silicona térmica ultrafina · Gel de encapsulado de bajo VOC · Sellos de baja emisión de polvo para sala limpia" },
  { challenge: "Los sellos de articulaciones robóticas deben soportar millones de ciclos de flexión. Los actuadores flexibles requieren alta resistencia a la tracción y gran recuperación elástica. Los sensores de piel biónica necesitan materiales compuestos ultrasuaves y conductivos.",
    solution: "La silicona de alta resistencia (resistencia a la tracción ≥12 MPa) permite una larga vida útil en sellado de articulaciones. La silicona espumada aporta estructuras de amortiguación ligeras. Los compuestos de silicona conductiva hacen posible la detección flexible.",
    cases: "Anillos de sellado antipolvo para articulaciones · Músculos artificiales neumáticos flexibles · Capas sensoriales de piel electrónica · Sellado de fundas de cables y conectores",
    products: "Silicona de alta resistencia y baja deformación permanente · Compuestos de silicona conductiva · Silicona espumada ultrasuave · Sellos articulares resistentes al desgaste" },
  { challenge: "Los materiales aeroespaciales deben superar ciclos desde -196°C criogénicos hasta +260°C. El lanzamiento implica vibración y ruido intensos. En vacío, la desgasificación debe cumplir ASTM E595 (TML<1%, CVCM<0,1%).",
    solution: "La silicona de grado aeroespacial trabaja entre -60°C y +300°C con excelente estabilidad térmica. Las formulaciones de baja desgasificación cumplen los exigentes estándares de materiales internos de naves espaciales. Los sellos de alta resistencia superan certificaciones MIL-STD de vibración y choque.",
    cases: "Sellos de toberas de motores cohete · Sustratos para recubrimientos de control térmico satelital · Sistemas de sellado para compartimentos de motores aeronáuticos · Encapsulado protector para aviónica",
    products: "Silicona aeroespacial para alta temperatura · Silicona de baja desgasificación · Láminas de silicona ignífuga de alta resistencia · Almohadillas térmicas para alta temperatura" },
  { challenge: "Las aeronaves de baja altitud requieren equilibrar ligereza, seguridad contra incendios y durabilidad ambiental. Los sistemas de propulsión eléctrica y aviónica necesitan aislamiento y sellado estables bajo cambios de temperatura, vibración y humedad. Además, las estructuras complejas de cabina exigen conformado preciso y montaje fiable.",
    solution: "La silicona espumada ligera y los materiales de sellado de alta resistencia ayudan a reducir peso sin sacrificar protección. La silicona resistente al fuego y los materiales de interfaz térmica respaldan la seguridad térmica de baterías y aviónica. Las soluciones de sellado de baja desgasificación y resistencia climática están diseñadas para una larga vida útil en condiciones de vuelo complejas.",
    cases: "Protección térmica para paquetes de baterías eVTOL · Juntas de sellado para sistemas de aviónica · Manguitos de protección para arneses de cabina · Sellos amortiguadores para módulos de accionamiento de rotor",
    products: "Silicona espumada ligera · Láminas de silicona resistente al fuego · Almohadillas térmicas de silicona · Silicona de sellado resistente a la intemperie" },
  { challenge: "Los servidores de alta potencia y los sistemas de respaldo energético generan una acumulación continua de calor. Las penetraciones de cables y barras colectoras deben equilibrar sellado cortafuego, aislamiento y mantenibilidad. El funcionamiento prolongado de los gabinetes también exige mayor estabilidad dimensional, bajo humo y baja toxicidad.",
    solution: "Los materiales de interfaz térmica y aislamiento optimizan conjuntamente las rutas de calor en gabinetes y sistemas de potencia. Los sistemas de silicona cortafuego bloquean la propagación de la llama a lo largo de los tendidos de cable. Los materiales de sellado de baja deformación permanente ayudan a mantener la fiabilidad a largo plazo en puertas de gabinetes y puntos de interfaz.",
    cases: "Tiras de sellado para puertas de gabinetes · Sellado cortafuego para penetraciones de cable · Almohadillas de protección térmica para gabinetes UPS / baterías · Componentes de sellado para sistemas de refrigeración",
    products: "Almohadillas térmicas de silicona · Láminas de silicona aislante térmica · Bloques de silicona cortafuego · Sellos de silicona de baja deformación permanente" },
  { challenge: "Los vehículos ferroviarios de alta velocidad afrontan vibración, ciclos térmicos y envejecimiento prolongado en exteriores. Los coches, cables y zonas de penetración deben cumplir EN 45545-2 y otros requisitos estrictos de protección contra incendios, bajo humo y baja toxicidad. Los sistemas de puertas, ventanas y conexión también requieren gran vida a fatiga y resistencia climática de los materiales de sellado.",
    solution: "La silicona resistente al fuego e ignífuga responde a los requisitos de seguridad pasiva en aplicaciones ferroviarias críticas, tanto interiores como exteriores. Los materiales de sellado resistentes a altas temperaturas y a la intemperie ayudan a mantener la fiabilidad de puertas, cables y puntos de conexión a largo plazo. Los materiales de gestión térmica y amortiguación también mejoran la durabilidad de los sistemas electrónicos embarcados en servicio.",
    cases: "Tiras de sellado para puertas y ventanas de coches · Manguitos de arneses y sellos de penetración · Almohadillas térmicas para sistemas de tracción · Elementos amortiguadores para equipos embarcados",
    products: "Láminas de silicona resistente al fuego e ignífuga · Tiras de sellado de bajo humo y sin halógenos · Almohadillas térmicas de silicona · Silicona espumada amortiguadora y resistente a la intemperie" }
];

const INDUSTRY_DETAIL_FR = [
  { challenge: "Les packs batteries dégagent une quantité importante de chaleur lors de la charge et de la décharge, ce qui accroît le risque d'emballement thermique. Les systèmes électriques haute tension imposent des exigences d'isolation très strictes. Les joints doivent en outre résister à la corrosion de l'électrolyte et aux cycles thermiques extrêmes.",
    solution: "Des coussinets en silicone thermoconducteur (1,5 à 18 W/m·K) assurent une gestion thermique précise. Le silicone résistant au feu (UL94 V-0 et UL9540A) apporte une protection passive aux packs batteries. Un silicone haute température qualifié à 200°C contribue à la fiabilité de long terme des applications de câblage soumises à forte chaleur.",
    cases: "Coussinets thermiques pour modules batterie · Gaines isolantes pour faisceaux haute tension · Composants d'étanchéité pour chaîne de traction électrique · Protections d'interfaces de charge",
    products: "Gamme de coussinets en silicone thermoconducteur · Mousse silicone résistante au feu et ignifuge · Matériaux coupe-feu pour la protection contre l'emballement thermique · Silicone isolant haute température" },
  { challenge: "Les armoires de stockage d'énergie et les compartiments batteries accumulent une chaleur importante dans la durée. Le système doit donc concilier isolation thermique, protection incendie et tenue extérieure longue durée. Les interfaces entre pack et armoire exigent une étanchéité et une isolation hautement fiables. Les projets demandent également une meilleure constance qualité et une conformité plus stricte aux certifications feu et ignifugation.",
    solution: "L'association de silicone isolant thermique et de matériaux thermoconducteurs aide à maîtriser les chemins de montée en température. Le silicone résistant au feu et les matériaux intumescents de protection incendie créent des barrières passives à l'échelle de l'armoire. Les matériaux d'étanchéité à faible déformation permanente améliorent la fiabilité en service sur le long terme.",
    cases: "Couches coupe-feu et isolantes pour compartiments ESS · Joints pour systèmes de refroidissement liquide · Bandes d'étanchéité pour caissons de pack · Protection des traversées de câbles d'armoires ESS",
    products: "Plaques de silicone isolant thermique · Plaques de silicone résistant au feu · Bandes d'étanchéité ignifuges · Joints silicone à faible déformation permanente" },
  { challenge: "Les environnements nucléaires sont extrêmement exigeants. Les matériaux doivent supporter une dose cumulée d'irradiation γ ≥ 10 MGy et fonctionner entre -40°C et 200°C. Les joints doivent être conformes au système qualité ASME NQA-1.",
    solution: "Un silicone spécial résistant au rayonnement, formulé sur une base propriétaire, offre une excellente tenue au vieillissement sous irradiation. Les silicones d'étanchéité haute pression répondent aux exigences de classes I et II. Des dossiers documentaires de niveau nucléaire peuvent être fournis sur mesure.",
    cases: "Systèmes d'étanchéité pour compartiments réacteur · Joints de traversées électriques · Patins élastomères de blindage radiologique · Joints d'admission pour groupes diesel de secours",
    products: "Silicone spécial résistant au rayonnement · Plaques d'étanchéité de grade nucléaire · Joints silicone à faible déformation permanente" },
  { challenge: "Les procédés d'encapsulation avancée imposent une pureté très élevée, de faibles niveaux de VOC et un contrôle sévère de la contamination ionique. L'augmentation de la densité de puissance fait de la gestion thermique un goulot d'étranglement majeur. Les environnements de salle blanche exigent également une faible émission particulaire et une bonne résistance à l'usure.",
    solution: "Le silicone haute pureté de grade semi-conducteur répond aux critères de pureté MIL-SPEC avec VOC < 50 ppm. Des matériaux d'interface thermique ultrafins et hautement conducteurs (≥ 8 W/m·K) réduisent la résistance thermique. Des formulations peu poussiéreuses et résistantes à l'usure conviennent aux robots de manutention de wafers.",
    cases: "Protection underfill pour encapsulation de puces · Matériaux d'interface thermique pour composants de puissance · Joints de précision pour équipements de lithographie · Joints articulés pour robots de transfert de wafers",
    products: "Coussinets silicone de grade semi-conducteur · Silicone thermique ultrafin · Gel silicone d'encapsulation à faible VOC · Joints à faible émission particulaire pour salle blanche" },
  { challenge: "Les joints d'articulation des robots doivent résister à des millions de cycles de flexion. Les actionneurs souples demandent une forte résistance à la traction ainsi qu'un excellent retour élastique. Les peaux électroniques ont besoin de matériaux composites ultra-souples et conducteurs.",
    solution: "Le silicone haute résistance (résistance à la traction ≥ 12 MPa) répond aux exigences de durée de vie en fatigue des joints d'articulation. Le silicone expansé apporte des structures d'amortissement allégées. Les composites en silicone conducteur permettent la détection souple.",
    cases: "Joints antipoussière pour articulations · Muscles artificiels pneumatiques souples · Couches sensorielles de peau électronique · Étanchéité de gaines et connecteurs",
    products: "Silicone haute résistance à faible déformation permanente · Composites en silicone conducteur · Silicone expansé ultra-souple · Joints articulés résistants à l'usure" },
  { challenge: "Les matériaux aérospatiaux doivent résister à des cycles allant de -196°C en cryogénie à +260°C. Le lancement impose de fortes vibrations et un bruit intense. En environnement sous vide, le dégazage doit satisfaire à ASTM E595 (TML < 1 %, CVCM < 0,1 %).",
    solution: "Le silicone de grade aérospatial fonctionne entre -60°C et +300°C avec une excellente stabilité thermique. Les formulations à faible dégazage répondent aux exigences sévères des matériaux embarqués. Les joints haute résistance satisfont aux essais de vibration et de choc MIL-STD.",
    cases: "Joints de tuyères de moteurs-fusées · Substrats pour revêtements de contrôle thermique satellite · Systèmes d'étanchéité pour nacelles moteur aéronautiques · Encapsulation de protection pour avionique",
    products: "Silicone haute température de grade aérospatial · Silicone à faible dégazage · Plaques silicone ignifuges haute résistance · Coussinets thermiques haute température" },
  { challenge: "Les appareils de vol à basse altitude doivent concilier allègement, sécurité incendie et tenue environnementale. Les systèmes de propulsion électrique et d'avionique exigent une isolation et une étanchéité stables face aux variations thermiques, aux vibrations et à l'humidité. Les structures de cabine complexes imposent également un formage précis et un assemblage fiable.",
    solution: "Le silicone expansé allégé et les matériaux d'étanchéité haute résistance contribuent à réduire la masse tout en maintenant le niveau de protection. Le silicone résistant au feu et les matériaux d'interface thermique sécurisent les batteries et les systèmes avioniques sur le plan thermique. Les solutions d'étanchéité à faible dégazage et résistantes aux intempéries sont conçues pour une longue durée de service en conditions de vol complexes.",
    cases: "Protection thermique de packs batteries eVTOL · Joints d'étanchéité pour systèmes avioniques · Gaines de protection pour faisceaux cabine · Joints amortisseurs pour modules d'entraînement de rotor",
    products: "Silicone expansé allégé · Plaques de silicone résistant au feu · Coussinets en silicone thermoconducteur · Silicone d'étanchéité résistant aux intempéries" },
  { challenge: "Les serveurs de forte puissance et les systèmes d'alimentation de secours génèrent une accumulation continue de chaleur. Les traversées de câbles et de jeux de barres doivent concilier coupe-feu, isolation et maintenabilité. Le fonctionnement prolongé des armoires impose aussi une excellente stabilité dimensionnelle ainsi qu'un faible dégagement de fumée et de toxicité.",
    solution: "Les matériaux d'interface thermique et d'isolation optimisent ensemble les chemins thermiques dans les armoires et systèmes d'alimentation. Les systèmes coupe-feu en silicone bloquent la propagation des flammes le long des cheminements de câbles. Les matériaux d'étanchéité à faible déformation permanente garantissent la fiabilité à long terme au niveau des portes d'armoires et des interfaces.",
    cases: "Bandes d'étanchéité pour portes d'armoires · Coupe-feu pour traversées de câbles · Coussinets de protection thermique pour armoires UPS/batteries · Composants d'étanchéité pour systèmes de refroidissement",
    products: "Coussinets en silicone thermoconducteur · Plaques de silicone isolant thermique · Blocs silicone coupe-feu · Joints silicone à faible déformation permanente" },
  { challenge: "Les trains à grande vitesse subissent vibrations, variations thermiques et vieillissement extérieur prolongé. Les voitures, câbles et zones de traversée doivent répondre à EN 45545-2 ainsi qu'à d'autres exigences strictes en matière de feu, de fumées et de toxicité. Les systèmes de portes, fenêtres et liaisons requièrent également une excellente tenue à la fatigue et aux intempéries.",
    solution: "Le silicone résistant au feu et ignifuge répond aux exigences de sécurité passive dans les zones ferroviaires critiques, à l'intérieur comme à l'extérieur. Les matériaux d'étanchéité résistants à la chaleur et aux intempéries contribuent à la fiabilité durable des portes, câbles et points de connexion. Les matériaux de gestion thermique et d'amortissement améliorent en outre la durabilité des systèmes électroniques embarqués.",
    cases: "Bandes d'étanchéité pour portes et fenêtres de voitures · Gaines de faisceaux et joints de traversée · Coussinets thermiques pour systèmes de traction · Éléments amortisseurs pour équipements embarqués",
    products: "Plaques de silicone résistant au feu et ignifuge · Bandes d'étanchéité à faible fumée et sans halogène · Coussinets en silicone thermoconducteur · Silicone expansé amortissant et résistant aux intempéries" }
];

const INDUSTRIES_ZH = [
  { title: "新能源汽车", desc: "电池热管理、高压绝缘与系统密封材料，全面保障整车安全与续航可靠性。" },
  { title: "储能", desc: "面向储能电池舱与机柜的隔热、防火及密封系统，提升长期运行稳定性。" },
  { title: "核能", desc: "耐高温、抗辐射特种硅橡胶，满足核电站极端工况下的严苛技术要求。" },
  { title: "芯片与半导体", desc: "超纯封装硅胶与导热垫片，助力芯片高性能运行与高可靠性封装。" },
  { title: "具身智能机器人", desc: "柔性执行器、传感器封装与关节密封材料，为下一代机器人奠定物质基础。" },
  { title: "航空航天", desc: "航天级硅橡胶密封与绝热材料，通过极端温度、振动及真空环境的严苛验证。" },
  { title: "低空飞行", desc: "面向 eVTOL 与无人飞行器的轻量化、防火与密封材料方案，兼顾热安全、耐候与可靠装配。" },
  { title: "数据中心", desc: "覆盖服务器机柜、UPS 与线缆贯穿场景的导热、隔热与防火封堵系统，支撑高可靠连续运行。" },
  { title: "高铁", desc: "满足高铁车辆防火、低烟低毒与长期耐候要求的密封与热管理材料方案。" }
];

const INDUSTRIES_EN = [
  { title: "NEW ENERGY VEHICLES", desc: "Battery thermal management, high-voltage insulation, and sealing systems supporting safer, longer-range vehicles." },
  { title: "ENERGY STORAGE", desc: "Insulation, fire protection, and sealing systems for ESS cabinets and battery enclosures with long-term reliability." },
  { title: "NUCLEAR POWER", desc: "High-temperature, radiation-resistant specialty silicone meeting extreme nuclear plant demands." },
  { title: "CHIPS & SEMICONDUCTORS", desc: "Ultra-pure encapsulant silicone and thermal pads enabling high-performance chip operation." },
  { title: "HUMANOID ROBOTS", desc: "Flexible actuators, sensor encapsulation, and joint sealing — material foundation for next-gen robotics." },
  { title: "AEROSPACE", desc: "Aerospace-grade silicone sealing and insulation for extreme temperatures, vibration, and vacuum." },
  { title: "LOW-ALTITUDE FLIGHT", desc: "Lightweight fire-protection and sealing solutions for eVTOL aircraft and low-altitude platforms, balancing thermal safety, weather resistance, and reliable assembly." },
  { title: "DATA CENTERS", desc: "Thermal, insulation, and firestop systems for server cabinets, UPS units, and cable penetrations, supporting high-reliability continuous operation." },
  { title: "HIGH-SPEED RAIL", desc: "Sealing and thermal-management materials engineered for high-speed rail applications with strict fire safety, low-smoke, low-toxicity, and long-life durability requirements." }
];

const INDUSTRIES_ES = [
  { title: "Vehículos Eléctricos", desc: "Gestión térmica de baterías, aislamiento de alto voltaje y sellado para vehículos más seguros y eficientes." },
  { title: "Almacenamiento de Energía", desc: "Aislamiento, protección contra incendios y sellado para gabinetes ESS y compartimentos de baterías." },
  { title: "Energía Nuclear", desc: "Silicona especial resistente a altas temperaturas y radiación para centrales nucleares." },
  { title: "Chips y Semiconductores", desc: "Encapsulantes de silicona ultrapura y almohadillas térmicas para chips de alto rendimiento." },
  { title: "Robots Humanoides", desc: "Actuadores flexibles, encapsulación de sensores y sellado de juntas para robótica de nueva generación." },
  { title: "Aeroespacial", desc: "Sellado y aislamiento grado aeroespacial para temperaturas extremas y vacío." },
  { title: "Vuelo a Baja Altitud", desc: "Soluciones ligeras de protección contra incendios y sellado para eVTOL y plataformas de vuelo a baja altitud, con equilibrio entre seguridad térmica, resistencia climática y fiabilidad de ensamblaje." },
  { title: "Centros de Datos", desc: "Sistemas de conducción térmica, aislamiento y sellado cortafuego para gabinetes de servidores, UPS y penetraciones de cable, orientados a una operación continua de alta fiabilidad." },
  { title: "Tren de Alta Velocidad", desc: "Materiales de sellado y gestión térmica para aplicaciones ferroviarias de alta velocidad con exigencias estrictas de fuego, bajo humo, baja toxicidad y durabilidad a largo plazo." }
];

const INDUSTRIES_FR = [
  { title: "Véhicules à énergies nouvelles", desc: "Gestion thermique des batteries, isolation haute tension et systèmes d'étanchéité pour des véhicules plus sûrs et plus fiables." },
  { title: "Stockage d'énergie", desc: "Systèmes d'isolation, de protection incendie et d'étanchéité pour armoires ESS et compartiments batteries, avec une fiabilité durable." },
  { title: "Nucléaire", desc: "Silicones spéciaux résistants aux hautes températures et au rayonnement pour les environnements nucléaires les plus sévères." },
  { title: "Puces et semi-conducteurs", desc: "Silicones d'encapsulation ultrapurs et coussinets thermiques pour le fonctionnement haute performance des semi-conducteurs." },
  { title: "Robots humanoïdes", desc: "Actionneurs souples, encapsulation de capteurs et étanchéité des articulations : la base matérielle de la robotique de nouvelle génération." },
  { title: "Aéronautique et spatial", desc: "Matériaux silicone d'étanchéité et d'isolation de grade aérospatial pour les environnements de température extrême, de vibration et de vide." },
  { title: "Vol à basse altitude", desc: "Solutions légères de protection incendie et d'étanchéité pour les eVTOL et plateformes de vol à basse altitude, conciliant sécurité thermique, résistance climatique et fiabilité d'assemblage." },
  { title: "Centres de données", desc: "Systèmes de gestion thermique, d'isolation et de compartimentage coupe-feu pour armoires serveurs, UPS et traversées de câbles, conçus pour une exploitation continue à haute fiabilité." },
  { title: "Grande vitesse ferroviaire", desc: "Matériaux d'étanchéité et de gestion thermique destinés au ferroviaire à grande vitesse, avec fortes exigences en feu, fumées, toxicité et durabilité." }
];

const buildIndustries = (): Industry[] => {
  return INDUSTRY_IDS.map((id, idx) => ({
    id,
    icon: INDUSTRY_ICONS[idx],
    title: {
      zh: INDUSTRIES_ZH[idx].title,
      en: INDUSTRIES_EN[idx].title,
      es: INDUSTRIES_ES[idx].title,
      fr: INDUSTRIES_FR[idx].title,
    },
    desc: {
      zh: INDUSTRIES_ZH[idx].desc,
      en: INDUSTRIES_EN[idx].desc,
      es: INDUSTRIES_ES[idx].desc,
      fr: INDUSTRIES_FR[idx].desc,
    },
    img: INDUSTRY_VISUALS[INDUSTRY_IMG_KEYS[idx]],
    detail: {
      zh: INDUSTRY_DETAIL_ZH[idx],
      en: INDUSTRY_DETAIL_EN[idx],
      es: INDUSTRY_DETAIL_ES[idx],
      fr: INDUSTRY_DETAIL_FR[idx],
    },
  }));
};

const buildNews = (): NewsItem[] => ([
  {
    id: "news-1",
    date: { zh: "2026-06-11", en: "Jun 11, 2026", es: "11 jun. 2026", fr: "11 juin 2026" },
    tag: { zh: "媒体报道", en: "Media Coverage", es: "Cobertura de Medios", fr: "Presse" },
    title: {
      zh: "实力出圈！旭创耐火隔热新材料获上海电视台专题采访，定义行业新标准",
      en: "DELESUN FIRE-PROTECTION MATERIALS FEATURED BY SHANGHAI TV",
      es: "Los materiales ignífugos de DELESUN, destacados por la TV de Shanghái",
      fr: "Les matériaux coupe-feu DELESUN mis à l'honneur par la télévision de Shanghai"
    },
    desc: {
      zh: "旭创新材料受邀登陆上海东方财经频道《广特播报》，展示公司在防火隔热材料与 UL9540A 测试方面的硬核实力。",
      en: "DELESUN was featured on Shanghai Eastern Finance Channel to present its fire-resistant insulation materials and progress in the UL9540A thermal runaway fire propagation test.",
      es: "DELESUN fue invitada al canal financiero de Shanghái para presentar sus materiales de aislamiento contra incendios y su avance en la prueba UL9540A.",
      fr: "DELESUN a été invitée sur la chaîne financière de Shanghai pour présenter ses matériaux coupe-feu et isolants ainsi que ses avancées dans l'essai UL9540A d'emballement thermique."
    },
    href: "https://mp.weixin.qq.com/s/9JY3pczCNgKFRlp_qIMeNg",
    image: NEWS_VISUALS.media,
  },
  {
    id: "news-2",
    date: { zh: "2026-06-08", en: "Jun 8, 2026", es: "8 jun. 2026", fr: "8 juin 2026" },
    tag: { zh: "展会回顾", en: "Exhibition Recap", es: "Resumen de Feria", fr: "Retour salon" },
    title: {
      zh: "圆满落幕｜不负相遇，本次展会完美收官！",
      en: "SUCCESSFUL CLOSE: THANK YOU FOR MEETING DELESUN AT THE SHOW",
      es: "Cierre exitoso: gracias por visitar a DELESUN en la feria",
      fr: "Clôture réussie : merci d'avoir rencontré DELESUN sur le salon"
    },
    desc: {
      zh: "第十二届国际储能和电池（上海）大会暨展览会圆满落幕，旭创新材料集中展示电池密封、导热、防火等有机硅功能材料解决方案。",
      en: "At the SNEC ES+ exhibition, DELESUN presented silicone solutions for battery sealing, thermal management, and fire protection to partners from around the world.",
      es: "En SNEC ES+, DELESUN presentó soluciones de silicona para sellado de baterías, gestión térmica y protección contra incendios.",
      fr: "Lors du salon SNEC ES+, DELESUN a présenté à ses partenaires internationaux ses solutions silicone pour l'étanchéité batterie, la gestion thermique et la protection incendie."
    },
    href: "https://mp.weixin.qq.com/s/duqBa54zesHi6CP_sHCSag",
    image: NEWS_VISUALS.recap,
  },
  {
    id: "news-3",
    date: { zh: "2026-05-28", en: "May 28, 2026", es: "28 may. 2026", fr: "28 mai 2026" },
    tag: { zh: "展会预告", en: "Event Preview", es: "Avance de Evento", fr: "Annonce salon" },
    title: {
      zh: "聚力光储，共赴盛会 | SNEC 2026 我们在上海等您莅临",
      en: "POWERING PV AND ENERGY STORAGE: MEET DELESUN AT SNEC 2026 IN SHANGHAI",
      es: "Encuentre a DELESUN en SNEC 2026 en Shanghái",
      fr: "Photovoltaïque et stockage : retrouvez DELESUN au SNEC 2026 à Shanghai"
    },
    desc: {
      zh: "旭创新材料诚邀行业伙伴莅临 SNEC 2026 展位交流，聚焦全球热管控及防火安全方案在新能源与储能场景中的应用。",
      en: "DELESUN invites customers and partners to visit its booth at SNEC 2026 to explore fire safety and thermal management material solutions for energy applications.",
      es: "DELESUN invita a clientes y socios a visitar su stand en SNEC 2026 para conocer sus soluciones de seguridad contra incendios y control térmico.",
      fr: "DELESUN invite ses clients et partenaires à visiter son stand au SNEC 2026 pour découvrir ses solutions matériaux de sécurité incendie et de maîtrise thermique pour l'énergie."
    },
    href: "https://mp.weixin.qq.com/s/EjHYZEDj_XURW2sh_hZj1g",
    image: NEWS_VISUALS.preview,
  }
]);

const buildPartners = (): Partner[] => ([
  { id: "partner-1", name: "PRYSMIAN", logo: logoPrysmian },
  { id: "partner-2", name: "NEXANS", logo: logoNexans },
  { id: "partner-3", name: "宝胜", logo: logoBaosheng },
  { id: "partner-4", name: "上上电缆", logo: logoShangshang },
  { id: "partner-5", name: "LEONI", logo: logoLeoni },
  { id: "partner-6", name: "MICHELIN", logo: logoMichelin },
  { id: "partner-7", name: "福斯集团", logo: logoFuchs },
  { id: "partner-8", name: "MEIJI", logo: logoMeiji },
  { id: "partner-9", name: "SAND PROFILE", logo: logoSandProfile },
  { id: "partner-10", name: "HRS", logo: logoHrs },
  { id: "partner-11", name: "KROMBERG & SCHUBERT", logo: logoKromberg },
  { id: "partner-12", name: "ANGST+PFISTER", logo: logoAngstPfister },
  { id: "partner-13", name: "NOLATO", logo: logoNolato },
  { id: "partner-14", name: "COFICAB", logo: logoCoficab },
  { id: "partner-15", name: "BELLOFRAM ELASTOMERS", logo: logoBellofram },
]);

const buildJobs = (): Job[] => ([
  {
    id: "job-1",
    dept: { zh: "研发", en: "R&D", es: "I+D", fr: "R&D" },
    title: { zh: "高级有机硅材料研究员", en: "SENIOR SILICONE MATERIALS RESEARCHER", es: "Investigador Sénior de Materiales de Silicona", fr: "Chercheur senior en matériaux silicone" },
    location: { zh: "上海", en: "Shanghai", es: "Shanghái", fr: "Shanghai" },
    type: { zh: "全职", en: "Full-time", es: "Tiempo completo", fr: "Temps plein" },
  },
  {
    id: "job-2",
    dept: { zh: "销售", en: "Sales", es: "Ventas", fr: "Ventes" },
    title: { zh: "销售", en: "OVERSEAS REGIONAL SALES DIRECTOR", es: "Director Regional de Ventas Internacional", fr: "Directeur régional des ventes internationales" },
    location: { zh: "上海 / 远程", en: "Shanghai / Remote", es: "Shanghái / Remoto", fr: "Shanghai / Télétravail" },
    type: { zh: "全职", en: "Full-time", es: "Tiempo completo", fr: "Temps plein" },
  },
  {
    id: "job-3",
    dept: { zh: "工程", en: "Engineering", es: "Ingeniería", fr: "Ingénierie" },
    title: { zh: "热管理系统工程师", en: "THERMAL MANAGEMENT SYSTEMS ENGINEER", es: "Ingeniero de Gestión Térmica", fr: "Ingénieur systèmes de gestion thermique" },
    location: { zh: "上海", en: "Suzhou", es: "Suzhou", fr: "Suzhou" },
    type: { zh: "全职", en: "Full-time", es: "Tiempo completo", fr: "Temps plein" },
  },
  {
    id: "job-4",
    dept: { zh: "市场", en: "Marketing", es: "Marketing", fr: "Marketing" },
    title: { zh: "品牌与数字营销经理", en: "BRAND & DIGITAL MARKETING MANAGER", es: "Gerente de Marketing Digital", fr: "Responsable marque et marketing digital" },
    location: { zh: "上海", en: "Shanghai", es: "Shanghái", fr: "Shanghai" },
    type: { zh: "全职", en: "Full-time", es: "Tiempo completo", fr: "Temps plein" },
  }
]);

const cctvVideoUrlSeed = new URL("../../../央视视频/央视视频/央视视频.mp4", import.meta.url).href;

const buildI18n = (): TranslationsShape => ({
  zh: {
    companyFull: "旭创新材料（上海）有限公司",
    brand: "DELESUN",
    launch: { tagline: "高性能有机硅材料" },
    nav: { home: "首页", about: "公司简介", products: "产品中心", solutions: "解决方案", industries: "应用行业", news: "新闻动态", careers: "加入我们", contact: "联系我们" },
    search: {
      open: "搜索", placeholder: "搜索产品、行业、新闻和页面内容", empty: "输入关键词开始搜索",
      noResult: "未找到相关内容", historyTitle: "最近搜索", resultTitle: "搜索结果",
      clearAll: "清空记录", deleteOne: "删除记录", recordLabel: "历史",
      resultLabels: { page: "页面", product: "产品", industry: "行业", article: "新闻" },
    },
    hero: {
      badge: "全球领先有机硅材料解决方案提供商",
      title: "以材料科技\n驱动未来产业",
      sub: "为新能源安全保驾护航",
      desc: "旭创新材料以高性能有机硅材料为核心，深耕新能源汽车、航空航天、核能及先进制造领域，助力全球客户构建安全、高效的工业解决方案。",
      cta1: "探索解决方案", cta2: "了解我们",
      headline1: "高性能硅橡胶", headline2: "专注服务", counterLabel: "应用领域",
      slides: [
        { id: "aerospace", eyebrow: "AEROSPACE", label: "航空航天", desc: "为火箭发动机密封件、卫星热防护组件提供在极端温度与辐射环境下长期可靠的硅橡胶材料。", photo: HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NEW ENERGY VEHICLE", label: "新能源汽车", desc: "电池热管理、高压密封与电驱动系统的核心硅橡胶解决方案，助力新能源汽车安全高效运行。", photo: HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMICONDUCTOR", label: "半导体芯片", desc: "晶圆制造与封装测试全流程所需的高纯净低挥发硅橡胶材料，满足最严苛的洁净室标准。", photo: HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLEAR POWER", label: "核电装备", desc: "核电站密封防护与耐辐射硅橡胶材料，在极端辐射及高温高压工况下保障长达40年安全运行。", photo: HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "RAIL TRANSIT", label: "轨道交通", desc: "地铁、高铁阻燃密封系统全套解决方案，符合EN 45545-2国际防火与低烟无毒标准。", photo: HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "年行业经验" }, { value: "200+", label: "全球合作伙伴" },
      { value: "15+", label: "核心专利" }, { value: "30+", label: "服务国家" },
    ],
    divTitle: "两大核心业务",
    divSub: "以有机硅材料为技术基础，构建面向未来的专业业务体系",
    divisions: [
      { key: "materials", icon: "Layers", label: "材料", title: "高性能有机硅材料",
        desc: "专注硅橡胶材料研发与量产，覆盖特种硅橡胶、导热硅脂、硅凝胶等多品类，为极端工况提供最优材料解决方案。",
        tags: ["硅橡胶", "导热材料", "绝缘材料", "密封材料"], img: DIVISION_VISUALS.materials },
      { key: "fire", icon: "Flame", label: "防火安全与热管控", title: "防火安全与热管控解决方案",
        desc: "针对新能源电池热失控、高密度电子散热挑战，提供从材料到系统的一体化防火安全与热管理整体解决方案。",
        tags: ["热失控抑制", "主动热管理", "防火防护", "散热系统"], img: DIVISION_VISUALS.fire },
    ],
    indTitle: "应用行业", indSub: "旭创新材料有机硅产品广泛服务于全球前沿高科技领域",
    newsTitle: "公司动态", newsSub: "洞察前沿技术，聚焦行业趋势",
    readMore: "阅读更多", viewAll: "查看全部",
    partnersTitle: "合作伙伴", partnersSub: "与全球行业领先企业携手，共同推动材料科技创新与应用",
    careersTitle: "加入我们", careersSub: "与最优秀的人才共同开创有机硅材料的未来",
    applyNow: "立即申请",
    vision: "公司远景", visionText: "全球领先有机硅材料解决方案提供商",
    innovation: "创新理念", innovationText: "科技创造价值，品质成就未来",
    mission: "企业使命", missionText: "为新能源安全保驾护航",
    aboutFull: "旭创新材料是一家面向新能源与特种工业场景的有机硅材料解决方案提供商，专注新能源汽车、储能、核能、通信及高端制造领域，为全球客户提供定制化材料与稳定交付能力。",
    aboutPage: {
      hero: {
        eyebrow: "企业概览", lead: "新能源与特种工业场景有机硅材料解决方案提供商",
        summary: "聚焦新能源汽车、储能、核能、通信与高端制造，提供从材料研发到规模交付的一体化有机硅解决方案。",
        tags: ["25年行业经验", "上海制造基地", "15+核心专利", "全球业务布局"],
      },
      stats: [
        { value: "25+", label: "年技术积累" }, { value: "8000吨", label: "年生产能力" },
        { value: "15+", label: "授权专利" }, { value: "9", label: "大核心应用领域" },
      ],
      rd: {
        eyebrow: "研发实力", title: "二十余年技术积累\n引领行业创新",
        p1: "旭创新材料自成立以来，始终将技术创新作为核心驱动力，坚持持续加大研发投入，搭建起覆盖材料分子创新、性能验证测试、终端应用开发的一体化完整研发体系。公司具备成熟完善的产业转化与规模化落地能力，积累多项自主核心知识产权；同时积极推进产学研协同创新，与国内顶尖高等院校开展深度联合研发，持续突破新材料关键技术。",
        p2: "公司前瞻性布局全球化运营网络，面向全球市场提供高效本地化技术与商务服务：美国研发中心设立于宾夕法尼亚州滨州，欧洲服务中心落地法兰克福；国内在上海、常州、深圳布局研发与生产基地，材料整体年产能突破 8000 吨。依托全球化研发制造平台，旭创新材料可根据不同行业工况需求提供一站式定制化材料解决方案，为海内外客户持续交付高品质产品与全周期技术服务。",
      },
      milestones: {
        eyebrow: "成长路径", title: "发展历程",
        items: [
          { year: "2002", event: "公司在上海成立" },
          { year: "2012", event: "公司获得多项专利，完成硅橡胶全系列和橡胶产品布局" },
          { year: "2013", event: "产业落地绿色通道取得土地26.3亩建厂并成为上海的高新企业和专精特新企业" },
          { year: "2016", event: "成为法国耐克森集团、日本明治的全球合作伙伴" },
          { year: "2018", event: "成为日本广濑电机的合作伙伴" },
          { year: "2018", event: "与军工合作，并获拍央视专题《橡胶贵族》" },
          { year: "2025", event: "成为福斯集团，科菲凯博，科波凯博、科波苏特的全球合作伙伴" },
          { year: "2026", event: "耐火材料在全球储能唯最高6.25GWh通过美国UL9540A&NFPA855认证" },
        ],
      },
      certifications: {
        eyebrow: "认证体系", title: "资质认证",
        groups: [
          { label: "质量体系认证", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "产品认证", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "央视专题", title: "央视专题《橡胶贵族》",
        desc: "聚焦有机硅防火隔热材料应用与技术价值，点击左侧视频区域可弹窗观看央视专题内容。",
        placeholder: "央视专题视频", formats: "点击左侧视频区播放", action: "点击播放",
        modalNote: "视频已接入本地素材，可在弹窗中直接播放。", videoUrl: cctvVideoUrlSeed,
      },
    },
    materialsPage: {
      eyebrow: "产品矩阵", title: "产品中心",
      desc: "专注高性能硅橡胶材料研发与生产，为新能源汽车、航空航天、半导体等行业提供全面解决方案。",
      tabs: { all: "全部产品", heat: "耐温阻燃", thermal: "导热隔热", special: "特种功能" },
      kpiLabel: "关键参数", detailBack: "返回", quickListLabel: "产品总览",
      detailBadge: "产品详情", galleryTitle: "产品图片", galleryMainLabel: "产品主视觉",
      galleryThumbLabel: "应用细节", overviewTitle: "产品介绍", highlightsTitle: "核心亮点",
      applicationsTitle: "应用场景", downloadsTitle: "下载资料",
      downloadsDesc: "可按项目阶段提供产品数据表、应用指南与视频资料，支持后续接入真实 PDF 下载文件。",
      downloadsAction: "联系获取",
      downloads: [
        { title: "产品数据表", desc: "规格、物性与加工建议" },
        { title: "应用指南", desc: "场景选型与装配建议" },
        { title: "视频资料", desc: "产品介绍、测试与应用视频" },
      ],
      videoTitle: "产品视频",
      videoDesc: "此区域可替换为产品介绍视频、测试视频或客户应用视频，支持后续接入真实 MP4 或外部视频链接。",
      videoPlaceholder: "视频资料待上传", videoFormats: "支持 MP4 / YouTube / Vimeo",
      tdsAction: "下载 TDS", tdsDesc: "下载当前产品技术数据表",
      relatedTitle: "相关产品推荐", relatedAction: "查看产品",
      categoryLabel: "产品类别", tempLabel: "温度范围",
      formsTitle: "可供货形态", forms: ["片材", "型材", "模压件", "定制开发"],
      ctaTitle: "需要产品资料或视频样片？",
      ctaDesc: "可按项目提供产品数据表、样品测试与应用方案支持。",
      ctaButton: "联系获取资料",
      detailIntroTail: {
        heat: "适用于对耐温、阻燃和长期稳定性要求较高的工业防护场景。",
        thermal: "适用于电池热管理、功率器件散热与系统隔热等关键热管理场景。",
        special: "适用于密封、缓冲、耐介质与特殊功能定制要求较高的应用环境。",
      },
    },
    fireSafetyPage: {
      overviewEyebrow: "核心能力",
      overviewTitle: "围绕防火阻隔与热管控的系统能力",
      overviewLead: "从材料选型、结构导热，到隔热、防火防护与标准适配，形成面向航空航天、低空飞行器、储能、新能源汽车、高铁轨交、具身智能机器人、数据中心、电力与工业设备的系统化解决方案。",
      overviewCards: [
        { title: "导热", desc: "通过导热界面材料、导热垫片与结构导热设计，提升热量传递效率，适配电池系统、功率器件与高热流密度设备。" },
        { title: "隔热防护", desc: "针对高温结构、舱体与设备外壳提供稳定隔热方案，降低热扩散并保护周边关键部件。" },
        { title: "防火阻隔", desc: "通过阻燃、膨胀与陶瓷化材料构建被动防护层，延缓火焰与热量蔓延。" },
        { title: "密封与长期可靠", desc: "面向高低温、盐雾、油介质与长期压缩工况，保持系统密封稳定。" },
        { title: "标准适配支持", desc: "围绕 UL、NFPA、EN、IEC 与建筑防火规范，提供材料和应用配套支持。" },
      ],
      solutionsEyebrow: "解决方案", solutionsTitle: "应用场景解决方案",
      sections: {
        fire: { title: "防火安全", desc: "聚焦火焰阻隔、热失控延缓、贯穿封堵与高等级阻燃防护。" },
        thermal: { title: "热管控", desc: "聚焦热隔离、温升控制、高温保护与系统热路径优化。" },
      },
      kpiLabel: "方案要点",
      solutions: [
        { title: "电池热失控防护", tag: "新能源储能", desc: "采用防火硅橡胶，当温度超过阈值时材料迅速形成坚硬的隔热保护层，有效阻断热失控蔓延路径，为电池模组提供被动安全保护。",
          specs: ["耐火温度 ≥ 1200°C", "耐火时间 > 180分钟", "工作温度 -60°C~200°C", "低烟无卤无毒", "通过UL9540A认证"] },
        { title: "建筑防火密封系统", tag: "建筑工程", desc: "耐火硅橡胶密封条与防火膨胀填缝剂组合应用，满足建筑防火规范GB 50016要求，确保建筑贯穿孔与伸缩缝的耐火完整性。",
          specs: ["耐火温度 > 1200℃", "耐火时间 > 180 分钟", "烟密度（透光率） > 70%", "无卤无毒"] },
        { title: "轨道交通阻燃方案", tag: "轨道交通", desc: "专为地铁、高铁车厢设计的全系防火阻燃密封材料，通过EN 45545-2 HL3最高等级认证，在火灾工况下低烟、低毒，保障乘客疏散安全。",
          specs: ["通过 EN 45545-2 HL3", "CO释放量 < 600 ppm", "烟密度 < 210 (Ds)", "氧指数 LOI ⩾ 30%", "毒性指数 CITNLP 0.056"] },
        { title: "电缆贯穿防火封堵", tag: "数据中心 / 电力", desc: "专用防火硅橡胶封堵块与防火泥组合系统，用于数据中心、变电站及工业厂房电缆贯穿孔的防火封堵，阻止火焰沿电缆通道蔓延。",
          specs: ["耐火完整性 E120", "符合 IEC 60331", "自密封补偿结构", "安装便捷可维护"] },
        { title: "核电与船舶防火保护", tag: "核电 / 海工", desc: "满足核级耐火要求的特种硅橡胶密封件，耐辐照老化性能卓越；同时提供符合中国船级社（CCS）认证的船用防火密封系统。",
          specs: ["通过CCS认证", "耐辐照剂量 ≥10 MGy", "耐盐雾≥1000小时", "ASME NQA-1质保体系"] },
        { title: "隔热与耐高温保护", tag: "航空 / 工业", desc: "航空级隔热硅橡胶发泡材料，在飞机发动机舱、工业窑炉及高温管道外壁实现优异的热隔离效果，减少能耗并保护周边结构。",
          specs: ["导热系数 ≤0.07 W/m·K", "最高耐温 +300°C", "低出气量（ASTM E595）", "质轻 · 防水 · 耐震"] },
      ],
      standardsEyebrow: "标准与认证", standardsTitle: "标准适配与认证支持",
      standardsLead: "围绕标准、法规与关键测试方法，提供可落地的材料与系统支持。",
      standards: [
        { std: "GB 8624", scope: "建筑材料燃烧性能 A 级" },
        { std: "EN 45545-2 HL3", scope: "轨道交通防火最高等级" },
        { std: "IEC 60331", scope: "电缆耐火完整性" },
        { std: "UL94 V-0", scope: "垂直燃烧阻燃等级" },
        { std: "ASTM E595", scope: "航天低出气量要求" },
        { std: "CCS 船级社", scope: "船舶防火密封认证" },
      ],
    },
    industryDetailLabels: { challenge: "技术挑战", solution: "解决方案", cases: "典型应用场景", products: "核心产品" },
    newsDetail: {
      paras: [
        "旭创新材料始终坚持以科技驱动创新，持续加大研发投入，围绕有机硅材料核心技术平台，不断拓展产品边界，开发面向未来产业的高性能材料解决方案。",
        "未来，公司将继续深耕新能源、航空航天、半导体等关键领域，携手全球合作伙伴，共同推动材料技术创新，为构建更安全、更高效的能源与制造体系贡献力量。",
      ],
    },
    careersPage: {
      benefits: [
        { label: "极具竞争力的薪酬", desc: "业内领先薪酬体系 + 丰厚绩效奖金" },
        { label: "清晰的职业发展", desc: "完善晋升通道，管理与技术双轨发展" },
        { label: "优质团队文化", desc: "顶尖技术人才组成的开放、协作团队" },
      ],
      openPositions: "开放职位",
    },
    contactPage: {
      tagline: "我们期待与您的沟通与合作",
      contactTitle: "联系我们",
      mapCompany: "旭创新材料（上海）", mapDistrict: "上海市奉贤区柘林镇",
      mapAddressTitle: "导航地址", mapAddressDesc: "点击下方地图可在对应地图中直接打开地址与路线",
      mapActions: { amap: "高德地图", baidu: "百度地图", google: "Google Maps" },
      formTitle: "发送信息", placeholders: ["姓名", "公司名称", "联系邮箱", "电话"],
      messagePlaceholder: "请描述您的需求...", send: "发送消息",
      wechatTitle: "可直接扫码关注公众号或进入小程序获取更多信息", wechatSub: "",
      wechatCards: [
        { title: "公众号", desc: "旭创有机硅防火隔热材料", hint: "" },
        { title: "小程序", desc: "DELESUN 小程序", hint: "" },
      ],
      officesEyebrow: "办事处网络", officesTitle: "各地办事处",
      offices: [
        { city: "上海（总部）", addr: "奉贤区科工路539号", tel: "+86-21-57500371", role: "总部·研发·销售" },
        { city: "苏州（生产基地）", addr: "苏州市吴中经济开发区工业园路32号", tel: "+86 512 6598 8800", role: "生产·质检" },
        { city: "美国纽约（销售处）", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "销售处" },
      ],
    },
    footer: { navHeading: "导航", productsHeading: "产品", contactHeading: "联系我们" },
    learnMore: "深入了解", backHome: "返回首页",
    footerTagline: "科技创造价值，品质成就未来",
    address: "中国·上海市奉贤区科工路539号",
    email: "sale@delesungp.com", phone: "+86 021-5750-0371",
    copyright: "© 2026 旭创新材料（上海）有限公司. 保留所有权利.",
  },
  en: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "High-Performance Silicone Materials" },
    nav: { home: "HOME", about: "ABOUT", products: "PRODUCTS", solutions: "SOLUTIONS", industries: "APPLICATIONS", news: "NEWS", careers: "CAREERS", contact: "CONTACT" },
    search: {
      open: "Search", placeholder: "Search products, industries, news, and site content", empty: "Start typing to search",
      noResult: "No matching content found", historyTitle: "Recent Searches", resultTitle: "Results",
      clearAll: "Clear All", deleteOne: "Remove", recordLabel: "History",
      resultLabels: { page: "Page", product: "Product", industry: "Application", article: "News" },
    },
    hero: {
      badge: "Global provider of advanced silicone material solutions",
      title: "MATERIAL SCIENCE\nDRIVING TOMORROW",
      sub: "Safeguarding New Energy Security",
      desc: "DELESUN New Materials advances high-performance silicone materials for new energy vehicles, aerospace, nuclear power, and advanced manufacturing — building safe, efficient industrial solutions for global clients.",
      cta1: "Explore Solutions", cta2: "About Us",
      headline1: "High-Performance Silicone", headline2: "Dedicated Service", counterLabel: "Applications",
      slides: [
        { id: "aerospace", eyebrow: "AEROSPACE", label: "Aerospace", desc: "Long-life silicone materials for rocket engine seals and satellite thermal protection components under extreme temperature and radiation.", photo: HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NEW ENERGY VEHICLE", label: "New Energy Vehicles", desc: "Core silicone solutions for battery thermal management, high-voltage sealing, and electric drive systems—helping EVs run safely and efficiently.", photo: HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMICONDUCTOR", label: "Semiconductors", desc: "High-purity, low-volatility silicone materials for wafer manufacturing and packaging/testing—meeting the most demanding cleanroom standards.", photo: HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLEAR POWER", label: "Nuclear Power", desc: "Radiation-resistant silicone materials for nuclear sealing and protection, ensuring safe operation for up to 40 years under extreme radiation, high temperature, and pressure.", photo: HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "RAIL TRANSIT", label: "Rail Transit", desc: "Complete flame-retardant sealing solutions for metro and high-speed rail compliant with EN 45545-2 fire safety and low smoke/toxicity standards.", photo: HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "Years of Expertise" }, { value: "200+", label: "Global Partners" },
      { value: "15+", label: "Core Patents" }, { value: "30+", label: "Countries Served" },
    ],
    divTitle: "Two Core Business Lines",
    divSub: "Two future-facing professional divisions built on our silicone material technology platform",
    divisions: [
      { key: "materials", icon: "Layers", label: "Materials", title: "HIGH-PERFORMANCE SILICONE MATERIALS",
        desc: "R&D and mass production of silicone rubber materials — specialty rubber, thermal grease, silicone gels — delivering optimal solutions for critical applications in extreme conditions.",
        tags: ["Silicone Rubber", "Thermal Materials", "Insulation", "Sealing"], img: DIVISION_VISUALS.materials },
      { key: "fire", icon: "Flame", label: "Fire Safety & Thermal Control", title: "FIRE SAFETY & THERMAL MANAGEMENT SOLUTIONS",
        desc: "Integrated material-to-system solutions addressing thermal runaway in new energy batteries and heat dissipation in high-density electronics.",
        tags: ["Thermal Runaway Suppression", "Active Thermal Mgmt", "Fire Protection", "Heat Dissipation"], img: DIVISION_VISUALS.fire },
    ],
    indTitle: "APPLICATIONS", indSub: "DELESUN silicone products serve the world's most demanding high-technology sectors",
    newsTitle: "COMPANY NEWS", newsSub: "Frontier insights and industry trends",
    readMore: "Read More", viewAll: "View All",
    partnersTitle: "PARTNERS", partnersSub: "Collaborating with global industry leaders to co-drive material technology innovation",
    careersTitle: "JOIN US", careersSub: "Build the future of silicone materials with the best minds in the industry",
    applyNow: "Apply Now",
    vision: "Vision", visionText: "A Global Leader in Silicone Material Solutions",
    innovation: "Innovation", innovationText: "Technology Creates Value, Quality Shapes the Future",
    mission: "Mission", missionText: "Safeguarding New Energy Security",
    aboutFull: "DELESUN is a technology-driven enterprise focused on the R&D, manufacturing, and commercialization of high-performance silicone materials. With deep experience in new energy, specialty industrial, and advanced manufacturing applications, we provide tailored material solutions backed by stable global delivery capability.",
    aboutPage: {
      hero: {
        eyebrow: "ABOUT DELESUN", lead: "Silicone Material Solutions for New Energy and Specialty Industrial Applications",
        summary: "We support EVs, energy storage, nuclear power, communications, and advanced manufacturing with integrated silicone solutions spanning material development, application engineering, and scaled delivery.",
        tags: ["25 Years of Expertise", "Shanghai Manufacturing", "15+ Core Patents", "Global Business Footprint"],
      },
      stats: [
        { value: "25+", label: "Years of Technical Accumulation" }, { value: "8,000t", label: "Annual Capacity" },
        { value: "15+", label: "Granted Patents" }, { value: "9", label: "Core Application Sectors" },
      ],
      rd: {
        eyebrow: "R&D CAPABILITIES", title: "TWO DECADES OF TECHNICAL EXPERTISE\nPOWERING INDUSTRIAL INNOVATION",
        p1: "Since its founding, DELESUN has treated technological innovation as a core driver of long-term growth. The company continues to invest in R&D and has built an integrated system covering molecular material design, performance validation, and application development. It also brings mature industrialization and scale-up capabilities, supported by multiple core intellectual property assets and collaborative R&D programs with leading universities in China.",
        p2: "DELESUN has steadily expanded its global operating footprint to provide localized technical and commercial support. Its U.S. R&D center is based in Pennsylvania, and its European service center is located in Frankfurt. In China, the company operates R&D and manufacturing bases in Shanghai, Changzhou, and Shenzhen, with total annual capacity exceeding 8,000 tons. This global platform enables DELESUN to deliver customized material solutions and technical support throughout the full project cycle.",
      },
      milestones: {
        eyebrow: "MILESTONES", title: "MILESTONES",
        items: [
          { year: "2002", event: "Founded in Shanghai." },
          { year: "2012", event: "Secured multiple patents and established a full portfolio of silicone rubber and related rubber products." },
          { year: "2016", event: "Became a global partner of Nexans Group (France) and Meiji (Japan)." },
          { year: "2018", event: "Became a partner of Hirose Electric (Japan)." },
          { year: "2018", event: "Partnered with defense industry organizations and was featured in the CCTV documentary “Rubber Aristocracy”." },
          { year: "2025", event: "Became a global partner of Forvia Group, Coficab, and other leading enterprises." },
          { year: "2026", event: "Fire-resistant materials achieved certification for 6.25 GWh energy storage under UL9540A & NFPA855." },
        ],
      },
      certifications: {
        eyebrow: "CERTIFICATIONS", title: "CERTIFICATIONS",
        groups: [
          { label: "Quality System Certifications", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "Product Certifications", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "CCTV FEATURE", title: "CCTV FEATURE: RUBBER ARISTOCRACY",
        desc: "Focused on silicone fire protection and thermal insulation materials. Click the video area on the left to open the CCTV feature.",
        placeholder: "CCTV Feature Video", formats: "Click the left video area to play", action: "Play Video",
        modalNote: "The local video source is connected and can be played directly in the popup.", videoUrl: cctvVideoUrlSeed,
      },
    },
    materialsPage: {
      eyebrow: "PRODUCT CENTER", title: "PRODUCT CENTER",
      desc: "Focused on the R&D and manufacturing of high-performance silicone materials, delivering comprehensive solutions for EVs, aerospace, semiconductors, and more.",
      tabs: { all: "All Products", heat: "Heat & Flame", thermal: "Thermal Management", special: "Specialty" },
      kpiLabel: "Key Specs", detailBack: "Back to Products", quickListLabel: "Quick Product List",
      detailBadge: "Product Detail", galleryTitle: "Product Images", galleryMainLabel: "Main Product Visual",
      galleryThumbLabel: "Application Detail", overviewTitle: "Overview", highlightsTitle: "Key Highlights",
      applicationsTitle: "Applications", downloadsTitle: "Downloads",
      downloadsDesc: "Datasheets, application guides, and video assets can be provided by project stage, with real PDF downloads ready to be connected later.",
      downloadsAction: "Request File",
      downloads: [
        { title: "PRODUCT DATASHEET", desc: "Specifications, properties, and processing advice" },
        { title: "APPLICATION GUIDE", desc: "Scenario selection and assembly guidance" },
        { title: "VIDEO ASSETS", desc: "Product intro, testing, and application videos" },
      ],
      videoTitle: "Product Video",
      videoDesc: "This area can be replaced with a product introduction, testing footage, or customer application video. Real MP4 or external video links can be connected later.",
      videoPlaceholder: "Video Asset Pending", videoFormats: "Supports MP4 / YouTube / Vimeo",
      tdsAction: "Download TDS", tdsDesc: "Download the technical data sheet for this product",
      relatedTitle: "Related Products", relatedAction: "View Product",
      categoryLabel: "Category", tempLabel: "Temperature Range",
      formsTitle: "Supply Formats", forms: ["Sheets", "Profiles", "Molded Parts", "Custom Development"],
      ctaTitle: "Need datasheets or demo videos?",
      ctaDesc: "We can provide product datasheets, sample testing, and application support based on your project.",
      ctaButton: "Contact Sales",
      detailIntroTail: {
        heat: "Designed for industrial protection scenarios that require heat resistance, flame retardancy, and long-term stability.",
        thermal: "Built for battery thermal management, power-device cooling, and thermal insulation in critical systems.",
        special: "Suitable for demanding applications involving sealing, cushioning, media resistance, and customized functional performance.",
      },
    },
    fireSafetyPage: {
      overviewEyebrow: "CORE CAPABILITIES",
      overviewTitle: "SYSTEM CAPABILITIES FOR FIRE PROTECTION AND THERMAL MANAGEMENT",
      overviewLead: "From material selection and structural heat conduction to thermal insulation, fire protection, and standards alignment, DELESUN delivers integrated solutions for aerospace, low-altitude aircraft, energy storage, EVs, high-speed rail transit, embodied intelligent robots, data centers, power systems, and industrial equipment.",
      overviewCards: [
        { title: "HEAT CONDUCTION", desc: "Thermal interface materials, conductive pads, and structural heat-transfer design improve heat-flow efficiency for battery systems, power devices, and high-heat-density equipment." },
        { title: "THERMAL INSULATION", desc: "Stable insulation solutions for high-temperature structures, enclosures, and housings help limit heat transfer and protect surrounding critical components." },
        { title: "PASSIVE FIRE BARRIERS", desc: "Flame-retardant, intumescent, and ceramifiable materials help slow the spread of flame and heat." },
        { title: "SEALING RELIABILITY", desc: "Maintains stable sealing under heat, cold, salt spray, oil media, and long-term compression conditions." },
        { title: "STANDARDS ALIGNMENT", desc: "Application support oriented to UL, NFPA, EN, IEC, and building fire-safety requirements." },
      ],
      solutionsEyebrow: "SOLUTIONS", solutionsTitle: "APPLICATION SOLUTIONS",
      sections: {
        fire: { title: "FIRE PROTECTION", desc: "Focused on flame barriers, thermal-runaway delay, cable penetration sealing, and high-grade passive fire safety." },
        thermal: { title: "THERMAL MANAGEMENT", desc: "Focused on insulation, temperature-rise control, high-temperature protection, and optimized thermal paths." },
      },
      kpiLabel: "Solution Highlights",
      solutions: [
        { title: "BATTERY THERMAL RUNAWAY PROTECTION", tag: "Energy Storage", desc: "Fire-resistant silicone rapidly forms a rigid thermal-insulation barrier once the temperature exceeds a threshold, effectively blocking thermal-runaway propagation and providing passive safety for battery modules.",
          specs: ["Fire resistance temperature ≥ 1200°C", "Fire resistance time > 180 min", "Operating temperature -60°C to 200°C", "Low smoke, halogen-free, non-toxic", "UL9540A certified"] },
        { title: "BUILDING FIRE SEALING SYSTEM", tag: "Construction", desc: "Fire-resistant silicone sealing strips combined with intumescent firestop sealants meet GB 50016 requirements, ensuring fire integrity for penetrations and expansion joints.",
          specs: ["Fire resistance temperature > 1200°C", "Fire resistance time > 180 min", "Smoke density (light transmittance) > 70%", "Halogen-free and non-toxic"] },
        { title: "RAIL TRANSIT FLAME-RETARDANT SOLUTION", tag: "Rail Transit", desc: "A full series of fire-resistant and flame-retardant sealing materials designed for metro and high-speed rail cars, certified to EN 45545-2 HL3. Low smoke and low toxicity improve passenger evacuation safety in fire scenarios.",
          specs: ["EN 45545-2 HL3 certified", "CO release < 600 ppm", "Smoke density < 210 (Ds)", "LOI ⩾ 30%", "Toxicity index CITNLP 0.056"] },
        { title: "CABLE PENETRATION FIRE STOPPING", tag: "Data Center / Power", desc: "A combination system of dedicated silicone firestop blocks and firestop putty for cable penetrations in data centers, substations, and industrial plants, preventing flame spread along cable routes.",
          specs: ["Fire integrity E120", "IEC 60331 compliant", "Self-sealing compensation design", "Easy installation & maintenance"] },
        { title: "NUCLEAR & MARINE FIRE PROTECTION", tag: "Nuclear / Offshore", desc: "Specialty silicone seals meeting nuclear-grade fire resistance with excellent irradiation aging performance, plus marine fire sealing systems certified by CCS.",
          specs: ["CCS certified", "Irradiation dose ≥ 10 MGy", "Salt spray ≥ 1000 h", "ASME NQA-1 QA system"] },
        { title: "THERMAL INSULATION & HIGH-TEMPERATURE PROTECTION", tag: "Aviation / Industry", desc: "Aerospace-grade foamed insulating silicone provides superior thermal isolation for aircraft engine bays, industrial kilns, and high-temperature pipes, reducing energy consumption and protecting surrounding structures.",
          specs: ["Thermal conductivity ≤ 0.07 W/m·K", "Max temperature +300°C", "Low outgassing (ASTM E595)", "Lightweight · Water resistant · Vibration resistant"] },
      ],
      standardsEyebrow: "STANDARDS & CERTS", standardsTitle: "STANDARDS ALIGNMENT & CERTIFICATION SUPPORT",
      standardsLead: "Support aligned with key standards, regulations, and test methods—ready for deployment.",
      standards: [
        { std: "GB 8624", scope: "Building materials fire performance Class A" },
        { std: "EN 45545-2 HL3", scope: "Rail transit highest fire safety level" },
        { std: "IEC 60331", scope: "Cable fire integrity" },
        { std: "UL94 V-0", scope: "Vertical burning rating" },
        { std: "ASTM E595", scope: "Aerospace low outgassing requirement" },
        { std: "CCS", scope: "Marine fire sealing certification" },
      ],
    },
    industryDetailLabels: { challenge: "Technical Challenges", solution: "DELESUN Solution", cases: "Typical Use Cases", products: "Key Products" },
    newsDetail: {
      paras: [
        "DELESUN continues to drive innovation through sustained R&D investment, expanding product boundaries on our core silicone material technology platform to develop high-performance solutions for future industries.",
        "Looking ahead, we will further deepen our presence in new energy, aerospace, semiconductors, and other critical fields, working with global partners to advance material technology and contribute to safer, more efficient energy and manufacturing systems.",
      ],
    },
    careersPage: {
      benefits: [
        { label: "Competitive Compensation", desc: "Industry-leading salary package and performance incentives" },
        { label: "Clear Career Growth", desc: "Well-defined promotion paths with both management and technical tracks" },
        { label: "Collaborative Culture", desc: "An open, collaborative team composed of top-tier talent" },
      ],
      openPositions: "Open Positions",
    },
    contactPage: {
      tagline: "Our team is ready to discuss your application requirements and support your next project.",
      contactTitle: "CONTACT US",
      mapCompany: "DELESUN (Shanghai)", mapDistrict: "Zhelin Town, Fengxian District, Shanghai",
      mapAddressTitle: "Directions", mapAddressDesc: "Open the destination directly in Amap, Baidu Maps, or Google Maps.",
      mapActions: { amap: "Amap", baidu: "Baidu Maps", google: "Google Maps" },
      formTitle: "SEND US A MESSAGE", placeholders: ["Name", "Company", "Email", "Phone"],
      messagePlaceholder: "Tell us about your application, technical requirements, target certifications, and project timeline...",
      send: "Send Message",
      wechatTitle: "Scan to follow our official account or access the DELESUN mini program for more information", wechatSub: "",
      wechatCards: [
        { title: "OFFICIAL ACCOUNT", desc: "DELESUN updates and technical content", hint: "" },
        { title: "MINI PROGRAM", desc: "Quick access to DELESUN products and information", hint: "" },
      ],
      officesEyebrow: "OUR OFFICES", officesTitle: "OFFICES",
      offices: [
        { city: "Shanghai (HQ)", addr: "539 Kegong Rd, Fengxian District", tel: "+86-21-57500371", role: "HQ · R&D · Sales" },
        { city: "Suzhou (Manufacturing)", addr: "32 Industrial Park Rd, Wuzhong District", tel: "+86 512 6598 8800", role: "Manufacturing · QC" },
        { city: "New York, USA (Sales Office)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Sales Office" },
      ],
    },
    footer: { navHeading: "Navigation", productsHeading: "Products", contactHeading: "Contact Us" },
    learnMore: "Learn More", backHome: "Back to Home",
    footerTagline: "Technology Creates Value, Quality Shapes the Future",
    address: "No. 539 Kegong Road, Fengxian District, Shanghai, China",
    email: "sale@delesungp.com", phone: "+86 21-5750-0371",
    copyright: "© 2026 DELESUN New Materials (Shanghai) Co., Ltd. All rights reserved.",
  },
  es: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "Materiales de Silicona de Alto Rendimiento" },
    nav: { home: "Inicio", about: "Sobre Nosotros", products: "Productos", solutions: "Soluciones", industries: "Aplicaciones", news: "Noticias", careers: "Carreras", contact: "Contacto" },
    partnersTitle: "Socios", partnersSub: "Colaborando con líderes globales para impulsar la innovación en materiales",
    careersTitle: "Únase a Nosotros", careersSub: "Construya el futuro de los materiales de silicona con los mejores talentos",
    contactPage: {
      offices: [
        { city: "Shanghái (Sede)", addr: "539 Kegong Rd, Fengxian", tel: "+86-21-57500371", role: "Sede · I+D · Ventas" },
        { city: "Suzhou (Planta)", addr: "32 Industrial Park Rd, Wuzhong", tel: "+86 512 6598 8800", role: "Producción · QC" },
        { city: "Nueva York, EE. UU. (Oficina de ventas)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Oficina de ventas" },
      ],
    },
  },
  fr: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "Matériaux silicone haute performance" },
    nav: { home: "Accueil", about: "À propos", products: "Produits", solutions: "Solutions", industries: "Applications", news: "Actualités", careers: "Carrières", contact: "Contact" },
    partnersTitle: "Partenaires", partnersSub: "Nous collaborons avec des leaders industriels mondiaux pour faire progresser l'innovation matériaux",
    careersTitle: "Nous rejoindre", careersSub: "Construisez l'avenir des matériaux silicone avec les meilleurs talents du secteur",
    contactPage: {
      offices: [
        { city: "Shanghai (Siège)", addr: "539 Kegong Road, Fengxian", tel: "+86-21-57500371", role: "Siège · R&D · Ventes" },
        { city: "Suzhou (Production)", addr: "32 Industrial Park Rd, Wuzhong", tel: "+86 512 6598 8800", role: "Production · QC" },
        { city: "New York, USA (Bureau de vente)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Bureau de vente" },
      ],
    },
  },
});

export const seedData = {
  products: PRODUCT_DATA_SEED,
  industries: buildIndustries(),
  news: buildNews(),
  partners: buildPartners(),
  careers: buildJobs(),
  i18n: buildI18n(),
};
