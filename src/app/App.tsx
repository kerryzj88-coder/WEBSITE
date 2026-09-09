import { useState, useEffect, useCallback, useMemo, useRef, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, Globe, ArrowRight, ChevronLeft, ChevronDown, ChevronUp, Search, History, Trash2, Minus,
  Cpu, Zap, Shield, Bot, Atom, Layers, TrendingUp,
  MapPin, Clock, Mail, Phone, Briefcase, ChevronRight, PlayCircle, FileDown,
  Building2, Users, Award, Flame, Thermometer, Droplets, Wind, Gauge, MessageCircle
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useProducts, useIndustries, useNews, usePartners, useCareers, useI18n } from "@/app/lib/api";
import logoLight from "@/imports/logo-light.png";
import logoDark from "@/imports/eb69792d593bd06f0064e043eb913b1b.png";
import logoEn from "@/imports/logo-dele-sun-en.png";
import materialsImg from "@/imports/materials-hero.png";
import aerospaceImg from "@/imports/Screenshot_2026-06-30_at_11.53.44.png";

const pickLogo = (dark: boolean, lang: Lang = "zh") => {
  if (lang !== "zh") return logoEn;
  return dark ? logoLight : logoDark;
};

const fireSiliconeImg = new URL("../../assets/耐火硅橡胶.jpg", import.meta.url).href;
const thermalSiliconeImg = new URL("../../assets/导热硅胶.jpg", import.meta.url).href;
const highTempSiliconeImg = new URL("../../assets/耐高温橡胶.jpg", import.meta.url).href;
const foamSiliconeImg = new URL("../../assets/发泡硅橡胶.jpg", import.meta.url).href;
const flameRetardantSiliconeImg = new URL("../../assets/阻燃硅橡胶.jpg", import.meta.url).href;
const oilResistantSiliconeImg = new URL("../../assets/耐油硅橡胶.jpg", import.meta.url).href;
const insulationSiliconeImg = new URL("../../assets/隔热硅橡胶.jpg", import.meta.url).href;
const insulationCoatingImg = new URL("../../assets/涂层.png", import.meta.url).href;
const insulationFoamCoatingImg = new URL("../../assets/隔热发泡涂层.jpg", import.meta.url).href;
const lowCompressionSiliconeImg = new URL("../../assets/低压变硅橡胶.jpg", import.meta.url).href;
const highStrengthSiliconeImg = new URL("../../assets/高强度硅橡胶.jpg", import.meta.url).href;
const heatAgentImg = new URL("../../assets/耐热剂.jpg", import.meta.url).href;
const labImg = new URL("../../assets/实验室.jpg", import.meta.url).href;
const rdPanoramaImg = labImg;
const fireSiliconeTds = new URL("../../TDS/防火硅橡胶.pdf", import.meta.url).href;
const highTempSiliconeTds = new URL("../../TDS/耐高温硅胶.pdf", import.meta.url).href;
const foamSiliconeTds = new URL("../../TDS/发泡硅橡胶.pdf", import.meta.url).href;
const flameRetardantSiliconeTds = new URL("../../TDS/阻燃硅橡胶.pdf", import.meta.url).href;
const oilResistantSiliconeTds = new URL("../../TDS/耐油硅橡胶.pdf", import.meta.url).href;
const lowCompressionSiliconeTds = new URL("../../TDS/低压变硅橡胶.pdf", import.meta.url).href;
const highStrengthSiliconeTds = new URL("../../TDS/高强度硅橡胶.pdf", import.meta.url).href;
const brandLogoAsset = new URL("../../assets/brand-logo.PNG", import.meta.url).href;
const cctvVideoUrl = new URL("../../央视视频/央视视频/央视视频.mp4", import.meta.url).href;
const cctvAudioUrl = new URL("../../央视视频/央视视频/央视视频.mp3", import.meta.url).href;
const cctvVideoPoster = labImg;
const cctvVideoHasVisualTrack = true;

const FALLBACK_HERO_SLIDE_VISUALS = {
  aerospace: "https://images.unsplash.com/photo-1517976384346-3136801d605d?w=1400&h=1800&fit=crop&auto=format&q=90",
  ev: "https://images.unsplash.com/photo-1708953609405-96cb857fc9f6?w=1400&h=1800&fit=crop&auto=format&q=90",
  semi: "https://images.unsplash.com/photo-1587845323226-bad89242c735?w=1400&h=1800&fit=crop&auto=format&q=90",
  nuclear: "https://images.unsplash.com/photo-1630142895963-6996ae6b3a5b?w=1400&h=1800&fit=crop&auto=format&q=90",
  rail: "https://images.unsplash.com/photo-1514337224818-9787cf717f2a?w=1400&h=1800&fit=crop&auto=format&q=90",
} as const;

const FALLBACK_DIVISION_VISUALS = {
  materials: "https://images.unsplash.com/photo-1581092160607-ee67df01f9da?w=800&h=600&fit=crop&auto=format",
  fire: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
} as const;

const FALLBACK_INDUSTRY_VISUALS = {
  newEnergy: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=90",
  energyStorage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1_MW_4_MWh_Turner_Energy_Storage_Project_in_Pullman%2C_WA.jpg/1280px-1_MW_4_MWh_Turner_Energy_Storage_Project_in_Pullman%2C_WA.jpg",
  nuclear: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Sequoyah_Nuclear_Power_Plant_cooling_towers.jpg",
  semiconductor: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop&auto=format&q=90",
  humanoid: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Nao_humanoid_robot.jpg/1280px-Nao_humanoid_robot.jpg",
  aerospace: aerospaceImg,
  lowAltitude: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=900&h=600&fit=crop&auto=format&q=90",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=600&fit=crop&auto=format&q=90",
  highSpeedRail: "https://images.unsplash.com/photo-1514337224818-9787cf717f2a?w=900&h=600&fit=crop&auto=format&q=90",
  fireSafety: "https://images.unsplash.com/photo-1758614424770-faf4fa6e8868?w=900&h=600&fit=crop&auto=format&q=90",
} as const;

const FALLBACK_NEWS_VISUALS = {
  media: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&h=700&fit=crop&auto=format&q=90",
  recap: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=700&fit=crop&auto=format&q=90",
  preview: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=700&fit=crop&auto=format&q=90",
} as const;
const expoGermanyImg = new URL("../../宣传图片/德国展会.png", import.meta.url).href;
const expoNetherlandsImg = new URL("../../宣传图片/荷兰展会.png", import.meta.url).href;
const expoNetherlandsImg2 = new URL("../../宣传图片/荷兰展会2.png", import.meta.url).href;
const expoNetherlandsImg3 = new URL("../../宣传图片/荷兰展会3.png", import.meta.url).href;
const daigoAuditImg = new URL("../../宣传图片/岱高领导审厂.png", import.meta.url).href;
const daigoAuditImg2 = new URL("../../宣传图片/岱高领导审厂2.png", import.meta.url).href;
const leoniVisitImg = new URL("../../宣传图片/莱尼德国总部领导.png", import.meta.url).href;
const leoniVisitImg2 = new URL("../../宣传图片/莱尼德国总部领导2.png", import.meta.url).href;
const nexansTechVisitImg = new URL("../../宣传图片/耐克森全球技术总监 Shara 博士、陶俊先生.png", import.meta.url).href;
const nexansQualityVisitImg = new URL("../../宣传图片/耐克森质量总监和产品总监.png", import.meta.url).href;

const PRODUCT_TDS_MAP = {
  "防火硅橡胶": fireSiliconeTds,
  "耐高温硅胶": highTempSiliconeTds,
  "发泡硅橡胶": foamSiliconeTds,
  "阻燃硅橡胶": flameRetardantSiliconeTds,
  "耐油硅橡胶": oilResistantSiliconeTds,
  "低压变硅橡胶": lowCompressionSiliconeTds,
  "高强度硅橡胶": highStrengthSiliconeTds,
} as const;

// ─── Product catalogue ────────────────────────────────────────────────────────

const FALLBACK_PRODUCT_DATA = [
  { name: "防火硅橡胶", nameEn: "Fire-Resistant Silicone Rubber", nameEs: "Caucho de Silicona Resistente al Fuego", nameFr: "Silicone résistant au feu", cat: "heat", Icon: Flame, color: "#C8102E",
    spec: "UL9540A | NFPA855 | 氧指数≥30% | 低烟无卤无毒", specEn: "UL9540A | NFPA855 | LOI ≥ 30% | Low smoke, halogen-free, non-toxic", specEs: "UL9540A | NFPA855 | Índice de oxígeno ≥30% | Bajo humo, sin halógenos y no tóxico", specFr: "UL9540A | NFPA855 | LOI ≥ 30 % | Faible fumée, sans halogène, non toxique", temp: "-55°C ~ +250°C",
    apps: ["储能", "新能源汽车", "电池", "数据中心", "航空航天", "核能", "防火电缆等"], appsEn: ["Cable protection", "Building fireproofing", "Rail transit", "Marine"], appsEs: ["Protección de cables", "Protección contra incendios", "Transporte ferroviario", "Marino"], appsFr: ["Protection de câbles", "Protection incendie des bâtiments", "Ferroviaire", "Marine"],
    desc: "防火硅橡胶具有硅橡胶的一般性能，当防火硅橡胶遇到火焰时，形成坚硬陶瓷体，阻止火焰、热量扩散，起到防火作用。该材料具有低烟无卤无毒等特性，可在-55度到250度条件下使用，广泛应用于储能、新能源汽车、电池、数据中心、航空航天、核能及防火电缆等防火场合。", descEn: "Special formulation delivers outstanding fire resistance—non-propagating in open flame with low smoke, widely used in cable protection and building fireproofing.", descEs: "Formulación especial con excelente resistencia al fuego, bajo humo y sin propagación de llama; se usa en protección de cables y construcción.", descFr: "Cette formulation spéciale offre une excellente résistance au feu. Elle ne propage pas la flamme, génère peu de fumée et s'emploie largement pour la protection des câbles et le compartimentage coupe-feu des bâtiments." },
  { name: "导热硅胶", nameEn: "Thermally Conductive Silicone", nameEs: "Silicona Conductora Térmica", nameFr: "Silicone thermoconducteur", cat: "thermal", Icon: Thermometer, color: "#1B7EC2",
    spec: "导热系数1.5~20W/(m·K) | 纳米导热填料", specEn: "Thermal conductivity 1.5–20 W/(m·K) | Nano thermal fillers", specEs: "Conductividad 1,5–20 W/(m·K) | Rellenos nano", specFr: "Conductivité thermique 1,5 à 20 W/(m·K) | Charges thermiques nano", temp: "-60°C ~ +250°C",
    apps: ["芯片散热", "电池热管理", "功率器件", "LED模组"], appsEn: ["Chip cooling", "Battery thermal management", "Power devices", "LED modules"], appsEs: ["Disipación de chips", "Gestión térmica de baterías", "Dispositivos de potencia", "Módulos LED"], appsFr: ["Refroidissement de puces", "Gestion thermique des batteries", "Composants de puissance", "Modules LED"],
    desc: "采用高导热纳米填料技术，兼顾优异导热性能与电气绝缘性，是新能源汽车和电子设备的核心热管理材料。", descEn: "Nano-filler technology balances high thermal conductivity and electrical insulation, making it a core thermal-management material for EVs and electronics.", descEs: "Tecnología de rellenos nano con alta conductividad y aislamiento eléctrico para gestión térmica en VE y electrónica.", descFr: "La technologie à charges nanométriques associe forte conductivité thermique et isolation électrique, ce qui en fait un matériau central pour la gestion thermique des véhicules électriques et de l'électronique." },
  { name: "耐高温硅胶", nameEn: "High-Temperature Silicone", nameEs: "Silicona de Alta Temperatura", nameFr: "Silicone haute température", cat: "heat", Icon: Zap, color: "#E8820C",
    spec: "连续耐温250°C | 瞬时耐温350°C | 抗老化", specEn: "Continuous 250°C | Peak 350°C | Anti-aging", specEs: "250°C continuo | 350°C pico | Antienvejecimiento", specFr: "250 °C en continu | 350 °C en pointe | Résistant au vieillissement", temp: "-60°C ~ +300°C",
    apps: ["工业密封", "烤箱密封件", "排气管密封", "航空航天"], appsEn: ["Industrial sealing", "Oven gaskets", "Exhaust sealing", "Aerospace"], appsEs: ["Sellado industrial", "Juntas de horno", "Sellado de escape", "Aeroespacial"], appsFr: ["Étanchéité industrielle", "Joints de fours", "Étanchéité de lignes d'échappement", "Aéronautique et spatial"],
    desc: "经高温稳定剂改性，在极端温度下保持优异物理性能，适用于工业及航空航天领域的高温密封与防护。", descEn: "Modified with high-temperature stabilizers to maintain excellent physical properties under extreme heat, suitable for high-temperature sealing and protection in industry and aerospace.", descEs: "Con estabilizadores de alta temperatura para mantener propiedades en calor extremo, ideal para sellado y protección en industria y aeroespacial.", descFr: "Formulé avec des stabilisants haute température, il conserve d'excellentes propriétés physiques sous forte chaleur et convient aux besoins d'étanchéité et de protection dans l'industrie comme dans l'aéronautique-spatial." },
  { name: "发泡硅橡胶", nameEn: "Foamed Silicone Rubber", nameEs: "Caucho de Silicona Espumado", nameFr: "Caoutchouc de silicone expansé", cat: "special", Icon: Layers, color: "#2E6B9E",
    spec: "密度0.25~0.85 g/cm³ | 压缩永久变形2%~15%", specEn: "Density 0.25–0.85 g/cm³ | Compression set 2–15%", specEs: "Densidad 0,25–0,85 g/cm³ | Deformación permanente por compresión 2–15%", specFr: "Densité 0,25 à 0,85 g/cm³ | Déformation permanente 2 à 15 %", temp: "-60°C ~ +200°C",
    apps: ["密封衬垫", "隔音减振", "电子防护", "医疗设备"], appsEn: ["Sealing gaskets", "Sound & vibration damping", "Electronics protection", "Medical devices"], appsEs: ["Juntas de sellado", "Aislamiento acústico y vibración", "Protección electrónica", "Dispositivos médicos"], appsFr: ["Joints d'étanchéité", "Isolation acoustique et antivibratoire", "Protection électronique", "Dispositifs médicaux"],
    desc: "精密发泡工艺制备，具有优异回弹性和隔音减振性能，可按客户需求定制密度和压缩率。", descEn: "Produced via precision foaming, offering excellent resilience and sound/vibration damping. Density and compression ratio can be customized.", descEs: "Fabricado mediante espumado de precisión, con gran resiliencia y amortiguación; densidad y compresión personalizables.", descFr: "Issu d'un procédé de moussage de précision, il offre une excellente résilience ainsi qu'un bon amortissement acoustique et vibratoire. La densité et le taux de compression peuvent être adaptés sur mesure." },
  { name: "阻燃硅橡胶", nameEn: "Flame-Retardant Silicone", nameEs: "Silicona Ignífuga", nameFr: "Silicone ignifuge", cat: "heat", Icon: Shield, color: "#C8102E",
    spec: "UL94 V-0 | 无卤无磷 | 低烟无毒", specEn: "UL94 V-0 | Halogen & phosphorus-free | Low smoke, non-toxic", specEs: "UL94 V-0 | Sin halógenos ni fósforo | Bajo humo y no tóxico", specFr: "UL94 V-0 | Sans halogène ni phosphore | Faible fumée, non toxique", temp: "-60°C ~ +250°C",
    apps: ["新能源电池包", "数据中心", "轨道交通", "电线电缆"], appsEn: ["EV battery packs", "Data centers", "Rail transit", "Wires & cables"], appsEs: ["Paquetes de baterías VE", "Centros de datos", "Transporte ferroviario", "Cables"], appsFr: ["Batteries de véhicules électriques", "Centres de données", "Transport ferroviaire", "Fils et câbles"],
    desc: "满足UL94 V-0阻燃等级，不含卤素和磷元素，燃烧时低烟无毒，是新能源汽车和轨道交通的安全首选。", descEn: "Meets UL94 V-0, free of halogens and phosphorus. Produces low smoke and low toxicity during combustion—ideal for EVs and rail transit safety.", descEs: "Cumple UL94 V-0, sin halógenos ni fósforo; bajo humo y toxicidad, recomendado para VE y transporte ferroviario.", descFr: "Conforme à UL94 V-0, sans halogène ni phosphore, ce matériau dégage peu de fumée et présente une faible toxicité en combustion. Il constitue un choix sûr pour les véhicules électriques et le ferroviaire." },
  { name: "耐油硅橡胶", nameEn: "Oil-Resistant Silicone", nameEs: "Silicona Resistente al Aceite", nameFr: "Silicone résistant aux huiles", cat: "special", Icon: Droplets, color: "#1B5E8E",
    spec: "耐油膨胀率 ≤ 30% | 耐醇类/烃类溶剂", specEn: "Oil swelling ≤ 30% | Resistant to alcohols & hydrocarbons", specEs: "Hinchamiento ≤ 30% | Resistente a alcoholes e hidrocarburos", specFr: "Gonflement dans l'huile ≤ 30 % | Résistant aux alcools et hydrocarbures", temp: "-60°C ~ +200°C",
    apps: ["汽车密封件", "机械密封", "化工管道", "液压系统"], appsEn: ["Automotive seals", "Mechanical seals", "Chemical pipelines", "Hydraulic systems"], appsEs: ["Sellos automotrices", "Sellos mecánicos", "Tuberías químicas", "Sistemas hidráulicos"], appsFr: ["Joints automobiles", "Étanchéité mécanique", "Canalisations chimiques", "Systèmes hydrauliques"],
    desc: "特殊配方改性，在润滑油、燃油及溶剂环境中保持尺寸稳定性，是汽车及工业密封领域的可靠选择。", descEn: "Specially modified to maintain dimensional stability in lubricants, fuels, and solvents—reliable for automotive and industrial sealing.", descEs: "Modificada para estabilidad dimensional en aceites, combustibles y solventes; solución confiable para sellado automotriz e industrial.", descFr: "Sa formulation spécifique lui permet de conserver sa stabilité dimensionnelle au contact des lubrifiants, carburants et solvants. C'est une solution fiable pour l'étanchéité automobile et industrielle." },
  { name: "隔热硅橡胶", nameEn: "Heat-Insulating Silicone", nameEs: "Silicona Aislante Térmica", nameFr: "Silicone isolant thermique", cat: "thermal", Icon: Wind, color: "#3D7DC8",
    spec: "导热系数 ≤ 0.4 W/(m·K) | 低导热高隔热", specEn: "Thermal conductivity ≤ 0.4 W/(m·K) | Low k, high insulation", specEs: "Conductividad ≤ 0,4 W/(m·K) | Bajo k, alto aislamiento", specFr: "Conductivité thermique ≤ 0,4 W/(m·K) | Faible conductivité, forte isolation", temp: "-60°C ~ +250°C",
    apps: ["电池模块隔热", "工业炉衬里", "管道保温", "建筑节能"], appsEn: ["Battery module insulation", "Industrial furnace lining", "Pipe insulation", "Building energy saving"], appsEs: ["Aislamiento de módulos", "Revestimiento de hornos", "Aislamiento de tuberías", "Eficiencia energética"], appsFr: ["Isolation de modules batterie", "Revêtement de fours industriels", "Isolation de tuyauteries", "Performance énergétique du bâtiment"],
    desc: "极低导热系数有效阻隔热量传导，在新能源电池热管理和工业保温领域发挥关键隔热作用。", descEn: "Ultra-low thermal conductivity blocks heat transfer and plays a key role in EV battery thermal safety and industrial insulation.", descEs: "Conductividad ultrabaja para bloquear la transferencia de calor, clave en baterías y aislamiento industrial.", descFr: "Sa très faible conductivité thermique limite efficacement les transferts de chaleur. Il joue un rôle clé dans la sécurité thermique des batteries et dans l'isolation industrielle." },
  { name: "低压变硅橡胶", nameEn: "Low Compression Set Silicone", nameEs: "Silicona de Baja Deformación Permanente", nameFr: "Silicone à faible déformation permanente", cat: "special", Icon: Gauge, color: "#1B2F5E",
    spec: "压缩永久变形 < 5%（175°C×22h×50%）", specEn: "Compression set < 5% (175°C × 22h × 50%)", specEs: "Deformación < 5% (175°C × 22h × 50%)", specFr: "Déformation permanente < 5 % (175°C × 22 h × 50 %)", temp: "-60°C ~ +230°C",
    apps: ["精密密封件", "医疗设备", "食品接触件", "半导体"], appsEn: ["Precision seals", "Medical devices", "Food-contact parts", "Semiconductors"], appsEs: ["Sellos de precisión", "Dispositivos médicos", "Piezas grado alimentario", "Semiconductores"], appsFr: ["Joints de précision", "Dispositifs médicaux", "Pièces au contact alimentaire", "Semi-conducteurs"],
    desc: "特殊硫化工艺处理，极低压缩永久变形率确保长期密封可靠性，符合食品级和医疗级标准。", descEn: "Special curing process delivers extremely low compression set for long-term sealing reliability, compliant with food- and medical-grade requirements.", descEs: "Curado especial con deformación permanente muy baja para sellado confiable, conforme a estándares alimentarios y médicos.", descFr: "Grâce à un procédé de vulcanisation spécifique, ce matériau présente une très faible déformation permanente et garantit une étanchéité durable, conforme aux exigences des secteurs alimentaire et médical." },
  { name: "高强度硅橡胶", nameEn: "High-Strength Silicone", nameEs: "Silicona de Alta Resistencia", nameFr: "Silicone haute résistance", cat: "special", Icon: Award, color: "#1B2F5E",
    spec: "拉伸强度12~13 MPa | 高撕裂强度", specEn: "Tensile strength 12–13 MPa | High tear strength", specEs: "Resistencia a tracción 12–13 MPa | Alta resistencia al desgarro", specFr: "Résistance à la traction 12 à 13 MPa | Forte résistance à la déchirure", temp: "-60°C ~ +250°C",
    apps: ["航空航天密封", "深海装备", "高压管道", "军工设备"], appsEn: ["Aerospace sealing", "Deep-sea equipment", "High-pressure pipelines", "Defense equipment"], appsEs: ["Sellado aeroespacial", "Equipos submarinos", "Tuberías de alta presión", "Defensa"], appsFr: ["Étanchéité aérospatiale", "Équipements sous-marins", "Conduites haute pression", "Équipements de défense"],
    desc: "纳米补强技术显著提升机械强度，在高压、振动及极端环境下保持结构完整性，满足航空航天及军工标准。", descEn: "Nano-reinforcement significantly improves mechanical strength, maintaining structural integrity under high pressure, vibration, and extreme environments for aerospace and defense standards.", descEs: "El refuerzo nano mejora la resistencia mecánica y mantiene integridad en presión, vibración y entornos extremos para aeroespacial y defensa.", descFr: "Le renfort nanométrique augmente nettement la résistance mécanique et préserve l'intégrité structurelle sous haute pression, vibrations et environnements extrêmes, conformément aux exigences de l'aérospatial et de la défense." },
  { name: "耐热剂", nameEn: "Heat Resistance Agent", nameEs: "Aditivo Mejorador de Resistencia al Calor", nameFr: "Additif d'amélioration de la résistance thermique", cat: "heat", Icon: Atom, color: "#8B2FC8",
    spec: "添加量1~5% | 耐热等级提升>50°C", specEn: "Dosage 1–5% | Heat rating + >50°C", specEs: "Dosificación 1–5% | Mejora >50°C", specFr: "Dosage 1 à 5 % | Gain de tenue thermique > 50°C", temp: "耐热性显著提升", tempEn: "Significant heat resistance improvement", tempEs: "Mejora notable de resistencia al calor", tempFr: "Amélioration nette de la tenue en température",
    apps: ["橡胶改性", "工程塑料", "耐热涂层", "电线电缆"], appsEn: ["Rubber modification", "Engineering plastics", "Heat-resistant coatings", "Wires & cables"], appsEs: ["Modificación de caucho", "Plásticos de ingeniería", "Recubrimientos resistentes al calor", "Cables"], appsFr: ["Modification des caoutchoucs", "Plastiques techniques", "Revêtements haute température", "Fils et câbles"],
    desc: "专为橡胶和塑料配方设计的功能添加剂，少量添加即可显著提升材料耐热性和抗老化性能。", descEn: "Functional additive for rubber and plastic formulations—small dosage significantly improves heat resistance and anti-aging performance.", descEs: "Aditivo funcional para caucho y plásticos; pequeñas dosis mejoran notablemente resistencia al calor y al envejecimiento.", descFr: "Additif fonctionnel conçu pour les formulations caoutchouc et plastique. À faible dosage, il améliore sensiblement la résistance à la chaleur et au vieillissement." },
  { name: "隔热涂层", nameEn: "Thermal Insulation Coating", nameEs: "Recubrimiento de Aislamiento Térmico", nameFr: "Revêtement d'isolation thermique", cat: "thermal", Icon: Wind, color: "#4A86D9",
    spec: "导热系数<0.12 W/(m·K) | 薄涂施工 | 耐候耐老化", specEn: "Thermal conductivity < 0.12 W/(m·K) | Thin-film application | Weather & aging resistant", specEs: "Conductividad <0,12 W/(m·K) | Aplicación en capa fina | Resistente a intemperie y envejecimiento", specFr: "Conductivité thermique < 0,12 W/(m·K) | Application en couche mince | Résistant aux intempéries et au vieillissement", temp: "-50°C ~ +220°C",
    apps: ["储能柜体外壁", "工业设备表面", "管道阀门保温", "建筑金属屋面"], appsEn: ["ESS cabinet outer walls", "Industrial equipment surfaces", "Pipe & valve insulation", "Metal roofing"], appsEs: ["Paredes externas de ESS", "Superficies de equipos", "Aislamiento de tuberías y válvulas", "Cubiertas metálicas"], appsFr: ["Parois extérieures d'armoires ESS", "Surfaces d'équipements industriels", "Isolation de tuyauteries et vannes", "Toitures métalliques"],
    desc: "面向设备与结构表面的功能型隔热涂层，兼顾薄层施工效率、长期耐候性与稳定隔热性能，可用于储能柜、管道和工业设备外壁热防护。", descEn: "A functional thermal insulation coating for equipment and structural surfaces, balancing thin-film application efficiency, long-term weather resistance, and stable thermal protection for ESS cabinets, pipelines, and industrial equipment.", descEs: "Recubrimiento funcional de aislamiento térmico para superficies de equipos y estructuras, con aplicación en capa fina, resistencia climática y protección térmica estable para ESS, tuberías y equipos industriales.", descFr: "Revêtement fonctionnel d'isolation thermique pour les surfaces d'équipements et de structures, il combine efficacité d'application en couche mince, tenue durable aux intempéries et protection thermique stable pour armoires ESS, tuyauteries et équipements industriels." },
  { name: "隔热发泡涂层", nameEn: "Foamed Thermal Insulation Coating", nameEs: "Recubrimiento Espumado de Aislamiento Térmico", nameFr: "Revêtement expansé d'isolation thermique", cat: "thermal", Icon: Layers, color: "#2E6B9E",
    spec: "发泡闭孔结构 | 轻量厚涂 | 隔热降噪", specEn: "Closed-cell foamed structure | Lightweight build coat | Thermal & acoustic insulation", specEs: "Estructura espumada de celda cerrada | Capa ligera de alto espesor | Aislamiento térmico y acústico", specFr: "Structure expansée à cellules fermées | Couche épaisse légère | Isolation thermique et acoustique", temp: "-50°C ~ +200°C",
    apps: ["储能舱内壁", "箱体防凝露", "机柜隔热降噪", "复杂曲面热防护"], appsEn: ["ESS enclosure inner walls", "Anti-condensation for housings", "Cabinet insulation & noise reduction", "Thermal protection on complex surfaces"], appsEs: ["Paredes internas de ESS", "Anticondensación en carcasas", "Aislamiento y reducción de ruido", "Protección térmica en superficies complejas"], appsFr: ["Parois internes de compartiments ESS", "Protection anticondensation des coffrets", "Isolation et réduction du bruit des armoires", "Protection thermique de surfaces complexes"],
    desc: "采用发泡隔热体系形成轻质闭孔涂层，在提升热阻的同时兼顾减振降噪与防凝露表现，适合储能舱体、设备箱体及复杂曲面的一体化热防护。", descEn: "Built on a foamed insulation system that forms a lightweight closed-cell coating, improving thermal resistance while adding vibration damping, noise reduction, and anti-condensation performance for ESS enclosures and complex equipment surfaces.", descEs: "Basado en un sistema espumado que forma un recubrimiento ligero de celdas cerradas, mejora la resistencia térmica y aporta amortiguación, reducción de ruido y control de condensación para recintos ESS y superficies complejas.", descFr: "Basé sur un système expansé formant un revêtement léger à cellules fermées, il améliore la résistance thermique tout en apportant amortissement vibratoire, réduction du bruit et maîtrise de la condensation pour les enceintes ESS et les surfaces complexes." },
];

// ─── Industry detail content ──────────────────────────────────────────────────

const FALLBACK_INDUSTRY_DETAIL_ZH = [
  { // 0 新能源汽车
    challenge: "电池组充放电产生大量热量，热失控风险高；高压电气系统对绝缘材料要求严苛；密封件须同时耐受电解液腐蚀与极端温度循环。",
    solution: "导热硅胶垫片（1.5~18 W/m·K）实现精确热管理；防火硅橡胶（UL94 V-0 & UL9540A）为电池包提供被动安全保护；耐高温硅橡胶200度硅橡胶确保高温线缆长效运行。",
    cases: "动力电池模组热管理垫片 · 高压线束绝缘保护套 · 电驱系统密封组件 · 充电接口防护结构",
    products: "导热硅胶垫片系列 · 防火阻燃硅橡胶泡棉 · 热失控防护防火密封材料 · 耐高温绝缘硅橡胶",
  },
  { // 1 储能
    challenge: "储能柜与电池舱内部热量累积明显，系统需要兼顾隔热、防火与长期户外稳定性；Pack 与柜体连接处要求高可靠密封与绝缘；项目交付中对一致性和防火阻燃认证要求更高。",
    solution: "隔热硅橡胶与导热材料组合控制温升路径；耐火硅橡胶与膨胀型防火阻燃材料构建舱级被动防火屏障；低压缩永久变形密封材料提升长期服役可靠性。",
    cases: "储能电池舱防火隔热层 · 液冷系统密封垫片 · Pack 箱体密封条 · 储能柜电缆贯穿防护",
    products: "隔热硅橡胶板材 · 耐火硅橡胶板材 · 阻燃硅橡胶密封条 · 低压变硅橡胶密封件",
  },
  { // 2 核能
    challenge: "核电站工况极苛刻，材料须承受γ射线辐照累积剂量≥10 MGy；工作温度-40°C~200°C；密封件须满足ASME NQA-1质量保证体系要求。",
    solution: "特种耐辐射硅橡胶经专有配方改性，辐照老化性能卓越；高压密封硅橡胶满足核电站一、二级密封要求；支持定制核级认证材料文件包。",
    cases: "反应堆舱室密封系统 · 电气贯穿密封组件 · 核辐射屏蔽弹性垫 · 应急柴油发电机进气密封",
    products: "耐辐射特种硅橡胶 · 核级密封板材 · 低压缩永久变形硅橡胶密封件",
  },
  { // 3 芯片与半导体
    challenge: "先进封装工艺对材料纯度、挥发性（VOC）和离子污染有极严苛要求；功率密度持续提升，芯片散热已成核心瓶颈；洁净室环境对低尘耐磨提出新挑战。",
    solution: "半导体级高纯硅橡胶满足MIL-SPEC纯度标准，VOC含量<50 ppm；超薄高导热界面材料（≥8 W/m·K）显著降低热阻；低尘耐磨配方适用于晶圆传输机器人。",
    cases: "芯片封装底填充保护 · 功率器件热界面材料 · 光刻机精密密封件 · 晶圆传输机器人关节密封",
    products: "半导体级高纯硅胶垫片 · 超薄导热硅橡胶 · 低VOC封装硅凝胶 · 洁净室用低尘密封件",
  },
  { // 4 具身智能机器人
    challenge: "机器人关节密封需耐百万次以上重复弯折；柔性执行器对硅橡胶拉伸强度与弹性恢复率要求极高；仿生皮肤传感器需超柔软且具备导电性能的复合材料。",
    solution: "高强度硅橡胶（抗拉强度≥12 MPa）满足关节密封疲劳寿命；发泡硅橡胶为机器人提供轻量化缓冲结构；导电硅橡胶复合材料实现柔性传感功能。",
    cases: "关节防尘密封圈 · 柔性气动人工肌肉 · 电子皮肤传感层 · 电缆护套与连接器密封",
    products: "高强度低压变硅橡胶 · 导电硅橡胶复合材料 · 超柔性发泡硅橡胶 · 耐磨关节密封件",
  },
  { // 5 航空航天
    challenge: "航天材料须通过-196°C深冷至+260°C高温循环测试；发射过程承受强烈振动与噪声；真空环境下材料出气量须满足ASTM E595标准（TML<1%，CVCM<0.1%）。",
    solution: "航天级硅橡胶耐温-60°C~+300°C，热稳定性卓越；低出气量配方满足航天器内部材料严苛标准；高强度密封件通过MIL-STD振动与冲击全项认证。",
    cases: "火箭发动机喷嘴密封 · 卫星热控涂层基材 · 航空发动机舱密封系统 · 机载电子设备防护封装",
    products: "航天级耐高温硅橡胶 · 低出气量硅橡胶 · 高强度阻燃硅橡胶板材 · 耐高温导热垫片",
  },
  { // 6 低空飞行
    challenge: "低空飞行器对轻量化、阻燃安全与环境适应性要求并存；电驱与航电系统在高低温、振动和湿热工况下需要长期稳定绝缘与密封；复杂舱体结构对材料成型与可靠装配提出更高要求。",
    solution: "轻量化发泡硅橡胶与高强度密封材料兼顾减重与防护；防火硅橡胶和导热界面材料支持电池与航电系统热安全；低出气、耐候密封方案满足复杂飞行工况下的长期服役要求。",
    cases: "eVTOL 电池包热防护 · 航电系统密封垫圈 · 机舱线束防护套 · 旋翼驱动模组减振密封",
    products: "轻量化发泡硅橡胶 · 防火硅橡胶板材 · 导热硅胶垫片 · 耐候密封硅橡胶",
  },
  { // 7 数据中心
    challenge: "高功率服务器与储能备电系统带来持续热积累；线缆与母线贯穿区域需要兼顾防火封堵、绝缘与可维护性；机柜长期运行对密封材料尺寸稳定性和低烟无毒提出更高要求。",
    solution: "导热与隔热材料协同优化机柜与电源系统热路径；防火封堵硅橡胶系统阻断火焰沿线缆通道蔓延；低压缩永久变形密封材料保障机柜门体与接口长期可靠密封。",
    cases: "机柜门体密封条 · 电缆贯穿防火封堵 · UPS/电池柜热防护垫片 · 冷却系统密封组件",
    products: "导热硅胶垫片 · 隔热硅橡胶板材 · 防火封堵硅橡胶块材 · 低压变硅橡胶密封件",
  },
  { // 8 高铁
    challenge: "高铁车辆运行环境伴随振动、温差与长期户外老化；车厢、电缆和贯穿部位材料需满足 EN 45545-2 等高等级防火低烟低毒要求；门窗与连接系统对密封件疲劳寿命和耐候性要求极高。",
    solution: "防火阻燃硅橡胶满足车内外关键部位的被动安全要求；耐高温与耐候密封材料保障车门、线缆与连接部位长期稳定；导热与减振材料帮助电子电气系统实现热管理与服役可靠性。",
    cases: "车厢门窗密封条 · 线束护套与贯穿密封 · 牵引系统热管理垫片 · 车载设备减振缓冲件",
    products: "防火阻燃硅橡胶板材 · 低烟无卤密封条 · 导热硅胶垫片 · 耐候减振发泡硅橡胶",
  },
];

const FALLBACK_INDUSTRY_DETAIL_EN = [
  { // 0 New Energy Vehicles
    challenge: "Battery packs generate significant heat during charge/discharge, increasing thermal runaway risk. High-voltage electrical systems demand stringent insulation. Seals must withstand electrolyte corrosion and extreme thermal cycling.",
    solution: "Thermally conductive silicone pads (1.5-18 W/m·K) deliver precise thermal management. Fire-resistant silicone (UL94 V-0 & UL9540A) provides passive protection for battery packs. 200°C-rated high-temperature silicone rubber helps ensure long-term reliability in high-temperature cable applications.",
    cases: "Battery module thermal interface pads · HV harness insulation sleeves · E-drive sealing components · Charging interface protection structures",
    products: "Thermally conductive silicone pad series · Fire-resistant and flame-retardant silicone foam · Fire-sealing materials for thermal-runaway protection · High-temperature insulating silicone rubber",
  },
  { // 1 Energy Storage
    challenge: "Energy storage cabinets and battery enclosures accumulate substantial heat over time, so the system must balance thermal insulation, fire protection, and long-term outdoor durability. Pack-to-cabinet joints require highly reliable sealing and insulation. Project delivery also demands tighter consistency and stricter fire-resistance and flame-retardancy certification compliance.",
    solution: "Heat-insulating silicone combined with thermally conductive materials helps control temperature-rise paths. Fire-resistant silicone and intumescent fire-protection materials form passive cabinet-level fire barriers. Low-compression-set sealing materials improve long-term service reliability.",
    cases: "Fire and insulation layers for energy storage containers · Liquid-cooling system gaskets · Pack enclosure sealing strips · Cable penetration protection for ESS cabinets",
    products: "Heat-insulating silicone sheets · Fire-resistant silicone sheets · Flame-retardant sealing strips · Low compression set silicone seals",
  },
  { // 2 Nuclear Power
    challenge: "Nuclear plant conditions are extremely demanding. Materials must withstand cumulative γ irradiation dose ≥10 MGy and operate from -40°C to 200°C. Seals must comply with the ASME NQA-1 quality assurance system.",
    solution: "Radiation-resistant specialty silicone rubber with proprietary formulation delivers excellent irradiation aging performance. High-pressure sealing silicone meets Class I/II sealing requirements. Full nuclear-grade documentation packages can be customized.",
    cases: "Reactor compartment sealing systems · Electrical penetration seals · Radiation-shielding elastomer pads · Emergency diesel generator intake seals",
    products: "Radiation-resistant specialty silicone · Nuclear-grade sealing sheets · Low compression set silicone seals",
  },
  { // 3 Chips & Semiconductors
    challenge: "Advanced packaging requires ultra-high purity, low VOC, and strict ion contamination control. Rising power density makes thermal management a core bottleneck. Cleanroom environments impose new demands for low particle shedding and wear resistance.",
    solution: "Semiconductor-grade high-purity silicone meets MIL-SPEC purity requirements with VOC < 50 ppm. Ultra-thin high-conductivity interface materials (≥8 W/m·K) reduce thermal resistance. Low-dust, wear-resistant formulations fit wafer handling robots.",
    cases: "Underfill protection for chip packaging · Thermal interface materials for power devices · Precision seals for lithography tools · Joint seals for wafer transfer robots",
    products: "Semiconductor-grade silicone pads · Ultra-thin thermal silicone · Low-VOC encapsulation silicone gel · Low-dust cleanroom seals",
  },
  { // 4 Humanoid Robots
    challenge: "Robot joint seals must survive millions of bending cycles. Flexible actuators require high tensile strength and elastic recovery. Bionic skin sensors need ultra-soft, conductive composite materials.",
    solution: "High-strength silicone rubber (tensile ≥12 MPa) supports long-life joint sealing. Foamed silicone rubber provides lightweight cushioning structures. Conductive silicone composites enable flexible sensing layers.",
    cases: "Dust-proof joint sealing rings · Pneumatic artificial muscles · E-skin sensing layers · Cable jackets and connector seals",
    products: "High-strength low compression set silicone · Conductive silicone composites · Ultra-soft foamed silicone · Wear-resistant joint seals",
  },
  { // 5 Aerospace
    challenge: "Aerospace materials must pass cycling from -196°C cryogenic to +260°C. Launch introduces intense vibration and noise. In vacuum, outgassing must meet ASTM E595 (TML<1%, CVCM<0.1%).",
    solution: "Aerospace-grade silicone rubber operates from -60°C to +300°C with excellent thermal stability. Low-outgassing formulations meet stringent spacecraft interior standards. High-strength seals pass MIL-STD vibration and shock certification.",
    cases: "Rocket engine nozzle seals · Satellite thermal control coating substrates · Aircraft engine bay sealing systems · Protective potting for avionics",
    products: "Aerospace high-temperature silicone · Low-outgassing silicone rubber · High-strength flame-retardant silicone sheets · High-temperature thermal pads",
  },
  { // 6 Low-Altitude Flight
    challenge: "Low-altitude aircraft require a careful balance of lightweighting, fire safety, and environmental durability. Electric propulsion and avionics systems need stable insulation and sealing under temperature swings, vibration, and humidity. Complex cabin structures also demand precise forming and reliable assembly.",
    solution: "Lightweight foamed silicone rubber and high-strength sealing materials help reduce weight while maintaining protection. Fire-resistant silicone and thermal interface materials support battery and avionics thermal safety. Low-outgassing, weather-resistant sealing systems are built for long-term service in demanding flight conditions.",
    cases: "eVTOL battery pack thermal protection · Avionics sealing gaskets · Cabin harness protection sleeves · Rotor-drive module damping seals",
    products: "Lightweight foamed silicone rubber · Fire-resistant silicone sheets · Thermally conductive silicone pads · Weather-resistant sealing silicone",
  },
  { // 7 Data Centers
    challenge: "High-power servers and backup energy systems generate continuous heat accumulation. Cable and busbar penetrations must balance fire stopping, insulation, and maintainability. Long-term cabinet operation also raises the bar for dimensional stability, low smoke, and low toxicity.",
    solution: "Thermal-interface and insulation materials work together to optimize heat paths in cabinets and power systems. Firestop silicone systems block flame spread along cable routes. Low compression set sealing materials help maintain long-term reliability at cabinet doors and interface locations.",
    cases: "Cabinet door sealing strips · Cable penetration fire stopping · UPS / battery cabinet thermal-protection pads · Cooling-system sealing components",
    products: "Thermally conductive silicone pads · Heat-insulating silicone sheets · Firestop silicone blocks · Low compression set silicone seals",
  },
  { // 8 High-Speed Rail
    challenge: "High-speed rail vehicles face vibration, temperature cycling, and long-term outdoor aging. Carriages, cables, and penetration areas must comply with EN 45545-2 and other high-level fire, low-smoke, and low-toxicity requirements. Doors, windows, and connection systems also demand excellent fatigue life and weather resistance from sealing materials.",
    solution: "Fire-resistant and flame-retardant silicone meets passive-safety requirements in critical interior and exterior rail applications. High-temperature and weather-resistant sealing materials help keep doors, cables, and connection points reliable over the long term. Thermal-management and damping materials further improve the durability of onboard electronic systems in service.",
    cases: "Carriage door and window sealing strips · Harness sleeves and penetration seals · Traction-system thermal pads · Onboard equipment damping buffers",
    products: "Fire-resistant and flame-retardant silicone sheets · Low-smoke halogen-free sealing strips · Thermally conductive silicone pads · Weather-resistant foamed silicone dampers",
  },
];

const FALLBACK_INDUSTRY_DETAIL_ES = [
  { // 0 Vehículos Eléctricos
    challenge: "Los paquetes de baterías generan una gran cantidad de calor durante la carga y descarga, con alto riesgo de fuga térmica; los sistemas eléctricos de alto voltaje exigen materiales aislantes muy rigurosos; y los sellos deben resistir tanto la corrosión del electrolito como los ciclos térmicos extremos.",
    solution: "Las almohadillas de silicona térmicamente conductiva (1,5-18 W/m·K) permiten una gestión térmica precisa. La silicona resistente al fuego (UL94 V-0 y UL9540A) aporta protección pasiva al paquete de baterías. La silicona de alta temperatura, con clasificación de 200°C, ayuda a garantizar la fiabilidad a largo plazo en aplicaciones de cableado para alta temperatura.",
    cases: "Almohadillas térmicas para módulos de batería · Manguitos aislantes para arneses de alto voltaje · Componentes de sellado del sistema de tracción eléctrica · Estructuras de protección para interfaces de carga",
    products: "Serie de almohadillas de silicona conductiva térmica · Espuma de silicona resistente al fuego e ignífuga · Materiales de sellado cortafuego para protección frente a la fuga térmica · Silicona aislante para alta temperatura",
  },
  { // 1 Almacenamiento de Energía
    challenge: "En los gabinetes de almacenamiento energético y compartimentos de baterías se acumula una cantidad considerable de calor, por lo que el sistema debe equilibrar aislamiento térmico, protección contra incendios y estabilidad a largo plazo en exteriores. Las uniones entre el pack y el gabinete requieren sellado y aislamiento de alta fiabilidad. Además, la entrega del proyecto exige mayor consistencia y un cumplimiento más estricto de las certificaciones de resistencia al fuego e ignifugación.",
    solution: "La combinación de silicona aislante térmica y materiales conductivos ayuda a controlar la ruta de aumento de temperatura. La silicona resistente al fuego, junto con materiales intumescentes de protección contra incendios, forma barreras pasivas a nivel de gabinete. Los materiales de sellado de baja deformación permanente mejoran la fiabilidad de servicio a largo plazo.",
    cases: "Capas cortafuego y de aislamiento para compartimentos de baterías ESS · Juntas de sistemas de refrigeración líquida · Tiras de sellado para cajas de pack · Protección de penetraciones de cable en gabinetes ESS",
    products: "Láminas de silicona aislante térmica · Láminas de silicona resistente al fuego · Tiras de sellado ignífugas · Sellos de silicona de baja deformación permanente",
  },
  { // 2 Energía Nuclear
    challenge: "Las condiciones en una central nuclear son extremadamente exigentes. Los materiales deben soportar una dosis acumulada de irradiación γ ≥10 MGy y operar entre -40°C y 200°C. Los sellos deben cumplir con el sistema de aseguramiento de calidad ASME NQA-1.",
    solution: "La silicona especial resistente a la radiación, modificada con formulación propia, ofrece un excelente comportamiento frente al envejecimiento por irradiación. La silicona de sellado de alta presión cumple con los requisitos de sellado de clase I/II. También se pueden personalizar paquetes documentales completos de grado nuclear.",
    cases: "Sistemas de sellado en compartimentos de reactores · Sellos de penetración eléctrica · Almohadillas elastoméricas de blindaje radiológico · Sellos de admisión para generadores diésel de emergencia",
    products: "Silicona especial resistente a la radiación · Láminas de sellado de grado nuclear · Sellos de silicona de baja deformación permanente",
  },
  { // 3 Chips y Semiconductores
    challenge: "El encapsulado avanzado exige pureza ultraalta, bajo VOC y un control muy estricto de contaminación iónica. El aumento continuo de la densidad de potencia convierte la gestión térmica en un cuello de botella clave. Los entornos de sala limpia también exigen baja emisión de partículas y alta resistencia al desgaste.",
    solution: "La silicona de alta pureza para semiconductores cumple con requisitos de pureza MIL-SPEC y VOC < 50 ppm. Los materiales de interfaz térmica ultrafinos y de alta conductividad (≥8 W/m·K) reducen la resistencia térmica. Las formulaciones de bajo polvo y alta resistencia al desgaste son adecuadas para robots de manipulación de obleas.",
    cases: "Protección underfill para encapsulado de chips · Materiales de interfaz térmica para dispositivos de potencia · Sellos de precisión para equipos de litografía · Sellos articulares para robots de transferencia de obleas",
    products: "Almohadillas de silicona de grado semiconductor · Silicona térmica ultrafina · Gel de encapsulado de bajo VOC · Sellos de baja emisión de polvo para sala limpia",
  },
  { // 4 Robots Humanoides
    challenge: "Los sellos de articulaciones robóticas deben soportar millones de ciclos de flexión. Los actuadores flexibles requieren alta resistencia a la tracción y gran recuperación elástica. Los sensores de piel biónica necesitan materiales compuestos ultrasuaves y conductivos.",
    solution: "La silicona de alta resistencia (resistencia a la tracción ≥12 MPa) permite una larga vida útil en sellado de articulaciones. La silicona espumada aporta estructuras de amortiguación ligeras. Los compuestos de silicona conductiva hacen posible la detección flexible.",
    cases: "Anillos de sellado antipolvo para articulaciones · Músculos artificiales neumáticos flexibles · Capas sensoriales de piel electrónica · Sellado de fundas de cables y conectores",
    products: "Silicona de alta resistencia y baja deformación permanente · Compuestos de silicona conductiva · Silicona espumada ultrasuave · Sellos articulares resistentes al desgaste",
  },
  { // 5 Aeroespacial
    challenge: "Los materiales aeroespaciales deben superar ciclos desde -196°C criogénicos hasta +260°C. El lanzamiento implica vibración y ruido intensos. En vacío, la desgasificación debe cumplir ASTM E595 (TML<1%, CVCM<0,1%).",
    solution: "La silicona de grado aeroespacial trabaja entre -60°C y +300°C con excelente estabilidad térmica. Las formulaciones de baja desgasificación cumplen los exigentes estándares de materiales internos de naves espaciales. Los sellos de alta resistencia superan certificaciones MIL-STD de vibración y choque.",
    cases: "Sellos de toberas de motores cohete · Sustratos para recubrimientos de control térmico satelital · Sistemas de sellado para compartimentos de motores aeronáuticos · Encapsulado protector para aviónica",
    products: "Silicona aeroespacial para alta temperatura · Silicona de baja desgasificación · Láminas de silicona ignífuga de alta resistencia · Almohadillas térmicas para alta temperatura",
  },
  { // 6 Vuelo a Baja Altitud
    challenge: "Las aeronaves de baja altitud requieren equilibrar ligereza, seguridad contra incendios y durabilidad ambiental. Los sistemas de propulsión eléctrica y aviónica necesitan aislamiento y sellado estables bajo cambios de temperatura, vibración y humedad. Además, las estructuras complejas de cabina exigen conformado preciso y montaje fiable.",
    solution: "La silicona espumada ligera y los materiales de sellado de alta resistencia ayudan a reducir peso sin sacrificar protección. La silicona resistente al fuego y los materiales de interfaz térmica respaldan la seguridad térmica de baterías y aviónica. Las soluciones de sellado de baja desgasificación y resistencia climática están diseñadas para una larga vida útil en condiciones de vuelo complejas.",
    cases: "Protección térmica para paquetes de baterías eVTOL · Juntas de sellado para sistemas de aviónica · Manguitos de protección para arneses de cabina · Sellos amortiguadores para módulos de accionamiento de rotor",
    products: "Silicona espumada ligera · Láminas de silicona resistente al fuego · Almohadillas térmicas de silicona · Silicona de sellado resistente a la intemperie",
  },
  { // 7 Centros de Datos
    challenge: "Los servidores de alta potencia y los sistemas de respaldo energético generan una acumulación continua de calor. Las penetraciones de cables y barras colectoras deben equilibrar sellado cortafuego, aislamiento y mantenibilidad. El funcionamiento prolongado de los gabinetes también exige mayor estabilidad dimensional, bajo humo y baja toxicidad.",
    solution: "Los materiales de interfaz térmica y aislamiento optimizan conjuntamente las rutas de calor en gabinetes y sistemas de potencia. Los sistemas de silicona cortafuego bloquean la propagación de la llama a lo largo de los tendidos de cable. Los materiales de sellado de baja deformación permanente ayudan a mantener la fiabilidad a largo plazo en puertas de gabinetes y puntos de interfaz.",
    cases: "Tiras de sellado para puertas de gabinetes · Sellado cortafuego para penetraciones de cable · Almohadillas de protección térmica para gabinetes UPS / baterías · Componentes de sellado para sistemas de refrigeración",
    products: "Almohadillas térmicas de silicona · Láminas de silicona aislante térmica · Bloques de silicona cortafuego · Sellos de silicona de baja deformación permanente",
  },
  { // 8 Tren de Alta Velocidad
    challenge: "Los vehículos ferroviarios de alta velocidad afrontan vibración, ciclos térmicos y envejecimiento prolongado en exteriores. Los coches, cables y zonas de penetración deben cumplir EN 45545-2 y otros requisitos estrictos de protección contra incendios, bajo humo y baja toxicidad. Los sistemas de puertas, ventanas y conexión también requieren gran vida a fatiga y resistencia climática de los materiales de sellado.",
    solution: "La silicona resistente al fuego e ignífuga responde a los requisitos de seguridad pasiva en aplicaciones ferroviarias críticas, tanto interiores como exteriores. Los materiales de sellado resistentes a altas temperaturas y a la intemperie ayudan a mantener la fiabilidad de puertas, cables y puntos de conexión a largo plazo. Los materiales de gestión térmica y amortiguación también mejoran la durabilidad de los sistemas electrónicos embarcados en servicio.",
    cases: "Tiras de sellado para puertas y ventanas de coches · Manguitos de arneses y sellos de penetración · Almohadillas térmicas para sistemas de tracción · Elementos amortiguadores para equipos embarcados",
    products: "Láminas de silicona resistente al fuego e ignífuga · Tiras de sellado de bajo humo y sin halógenos · Almohadillas térmicas de silicona · Silicona espumada amortiguadora y resistente a la intemperie",
  },
];

const FALLBACK_INDUSTRY_DETAIL_FR = [
  { // 0 Véhicules à énergies nouvelles
    challenge: "Les packs batteries dégagent une quantité importante de chaleur lors de la charge et de la décharge, ce qui accroît le risque d'emballement thermique. Les systèmes électriques haute tension imposent des exigences d'isolation très strictes. Les joints doivent en outre résister à la corrosion de l'électrolyte et aux cycles thermiques extrêmes.",
    solution: "Des coussinets en silicone thermoconducteur (1,5 à 18 W/m·K) assurent une gestion thermique précise. Le silicone résistant au feu (UL94 V-0 et UL9540A) apporte une protection passive aux packs batteries. Un silicone haute température qualifié à 200°C contribue à la fiabilité de long terme des applications de câblage soumises à forte chaleur.",
    cases: "Coussinets thermiques pour modules batterie · Gaines isolantes pour faisceaux haute tension · Composants d'étanchéité pour chaîne de traction électrique · Protections d'interfaces de charge",
    products: "Gamme de coussinets en silicone thermoconducteur · Mousse silicone résistante au feu et ignifuge · Matériaux coupe-feu pour la protection contre l'emballement thermique · Silicone isolant haute température",
  },
  { // 1 Stockage d'énergie
    challenge: "Les armoires de stockage d'énergie et les compartiments batteries accumulent une chaleur importante dans la durée. Le système doit donc concilier isolation thermique, protection incendie et tenue extérieure longue durée. Les interfaces entre pack et armoire exigent une étanchéité et une isolation hautement fiables. Les projets demandent également une meilleure constance qualité et une conformité plus stricte aux certifications feu et ignifugation.",
    solution: "L'association de silicone isolant thermique et de matériaux thermoconducteurs aide à maîtriser les chemins de montée en température. Le silicone résistant au feu et les matériaux intumescents de protection incendie créent des barrières passives à l'échelle de l'armoire. Les matériaux d'étanchéité à faible déformation permanente améliorent la fiabilité en service sur le long terme.",
    cases: "Couches coupe-feu et isolantes pour compartiments ESS · Joints pour systèmes de refroidissement liquide · Bandes d'étanchéité pour caissons de pack · Protection des traversées de câbles d'armoires ESS",
    products: "Plaques de silicone isolant thermique · Plaques de silicone résistant au feu · Bandes d'étanchéité ignifuges · Joints silicone à faible déformation permanente",
  },
  { // 2 Nucléaire
    challenge: "Les environnements nucléaires sont extrêmement exigeants. Les matériaux doivent supporter une dose cumulée d'irradiation γ ≥ 10 MGy et fonctionner entre -40°C et 200°C. Les joints doivent être conformes au système qualité ASME NQA-1.",
    solution: "Un silicone spécial résistant au rayonnement, formulé sur une base propriétaire, offre une excellente tenue au vieillissement sous irradiation. Les silicones d'étanchéité haute pression répondent aux exigences de classes I et II. Des dossiers documentaires de niveau nucléaire peuvent être fournis sur mesure.",
    cases: "Systèmes d'étanchéité pour compartiments réacteur · Joints de traversées électriques · Patins élastomères de blindage radiologique · Joints d'admission pour groupes diesel de secours",
    products: "Silicone spécial résistant au rayonnement · Plaques d'étanchéité de grade nucléaire · Joints silicone à faible déformation permanente",
  },
  { // 3 Puces et semi-conducteurs
    challenge: "Les procédés d'encapsulation avancée imposent une pureté très élevée, de faibles niveaux de VOC et un contrôle sévère de la contamination ionique. L'augmentation de la densité de puissance fait de la gestion thermique un goulot d'étranglement majeur. Les environnements de salle blanche exigent également une faible émission particulaire et une bonne résistance à l'usure.",
    solution: "Le silicone haute pureté de grade semi-conducteur répond aux critères de pureté MIL-SPEC avec VOC < 50 ppm. Des matériaux d'interface thermique ultrafins et hautement conducteurs (≥ 8 W/m·K) réduisent la résistance thermique. Des formulations peu poussiéreuses et résistantes à l'usure conviennent aux robots de manutention de wafers.",
    cases: "Protection underfill pour encapsulation de puces · Matériaux d'interface thermique pour composants de puissance · Joints de précision pour équipements de lithographie · Joints articulés pour robots de transfert de wafers",
    products: "Coussinets silicone de grade semi-conducteur · Silicone thermique ultrafin · Gel silicone d'encapsulation à faible VOC · Joints à faible émission particulaire pour salle blanche",
  },
  { // 4 Robots humanoïdes
    challenge: "Les joints d'articulation des robots doivent résister à des millions de cycles de flexion. Les actionneurs souples demandent une forte résistance à la traction ainsi qu'un excellent retour élastique. Les peaux électroniques ont besoin de matériaux composites ultra-souples et conducteurs.",
    solution: "Le silicone haute résistance (résistance à la traction ≥ 12 MPa) répond aux exigences de durée de vie en fatigue des joints d'articulation. Le silicone expansé apporte des structures d'amortissement allégées. Les composites en silicone conducteur permettent la détection souple.",
    cases: "Joints antipoussière pour articulations · Muscles artificiels pneumatiques souples · Couches sensorielles de peau électronique · Étanchéité de gaines et connecteurs",
    products: "Silicone haute résistance à faible déformation permanente · Composites en silicone conducteur · Silicone expansé ultra-souple · Joints articulés résistants à l'usure",
  },
  { // 5 Aéronautique et spatial
    challenge: "Les matériaux aérospatiaux doivent résister à des cycles allant de -196°C en cryogénie à +260°C. Le lancement impose de fortes vibrations et un bruit intense. En environnement sous vide, le dégazage doit satisfaire à ASTM E595 (TML < 1 %, CVCM < 0,1 %).",
    solution: "Le silicone de grade aérospatial fonctionne entre -60°C et +300°C avec une excellente stabilité thermique. Les formulations à faible dégazage répondent aux exigences sévères des matériaux embarqués. Les joints haute résistance satisfont aux essais de vibration et de choc MIL-STD.",
    cases: "Joints de tuyères de moteurs-fusées · Substrats pour revêtements de contrôle thermique satellite · Systèmes d'étanchéité pour nacelles moteur aéronautiques · Encapsulation de protection pour avionique",
    products: "Silicone haute température de grade aérospatial · Silicone à faible dégazage · Plaques silicone ignifuges haute résistance · Coussinets thermiques haute température",
  },
  { // 6 Vol à basse altitude
    challenge: "Les appareils de vol à basse altitude doivent concilier allègement, sécurité incendie et tenue environnementale. Les systèmes de propulsion électrique et d'avionique exigent une isolation et une étanchéité stables face aux variations thermiques, aux vibrations et à l'humidité. Les structures de cabine complexes imposent également un formage précis et un assemblage fiable.",
    solution: "Le silicone expansé allégé et les matériaux d'étanchéité haute résistance contribuent à réduire la masse tout en maintenant le niveau de protection. Le silicone résistant au feu et les matériaux d'interface thermique sécurisent les batteries et les systèmes avioniques sur le plan thermique. Les solutions d'étanchéité à faible dégazage et résistantes aux intempéries sont conçues pour une longue durée de service en conditions de vol complexes.",
    cases: "Protection thermique de packs batteries eVTOL · Joints d'étanchéité pour systèmes avioniques · Gaines de protection pour faisceaux cabine · Joints amortisseurs pour modules d'entraînement de rotor",
    products: "Silicone expansé allégé · Plaques de silicone résistant au feu · Coussinets en silicone thermoconducteur · Silicone d'étanchéité résistant aux intempéries",
  },
  { // 7 Centres de données
    challenge: "Les serveurs de forte puissance et les systèmes d'alimentation de secours génèrent une accumulation continue de chaleur. Les traversées de câbles et de jeux de barres doivent concilier coupe-feu, isolation et maintenabilité. Le fonctionnement prolongé des armoires impose aussi une excellente stabilité dimensionnelle ainsi qu'un faible dégagement de fumée et de toxicité.",
    solution: "Les matériaux d'interface thermique et d'isolation optimisent ensemble les chemins thermiques dans les armoires et systèmes d'alimentation. Les systèmes coupe-feu en silicone bloquent la propagation des flammes le long des cheminements de câbles. Les matériaux d'étanchéité à faible déformation permanente garantissent la fiabilité à long terme au niveau des portes d'armoires et des interfaces.",
    cases: "Bandes d'étanchéité pour portes d'armoires · Coupe-feu pour traversées de câbles · Coussinets de protection thermique pour armoires UPS/batteries · Composants d'étanchéité pour systèmes de refroidissement",
    products: "Coussinets en silicone thermoconducteur · Plaques de silicone isolant thermique · Blocs silicone coupe-feu · Joints silicone à faible déformation permanente",
  },
  { // 8 Grande vitesse ferroviaire
    challenge: "Les trains à grande vitesse subissent vibrations, variations thermiques et vieillissement extérieur prolongé. Les voitures, câbles et zones de traversée doivent répondre à EN 45545-2 ainsi qu'à d'autres exigences strictes en matière de feu, de fumées et de toxicité. Les systèmes de portes, fenêtres et liaisons requièrent également une excellente tenue à la fatigue et aux intempéries.",
    solution: "Le silicone résistant au feu et ignifuge répond aux exigences de sécurité passive dans les zones ferroviaires critiques, à l'intérieur comme à l'extérieur. Les matériaux d'étanchéité résistants à la chaleur et aux intempéries contribuent à la fiabilité durable des portes, câbles et points de connexion. Les matériaux de gestion thermique et d'amortissement améliorent en outre la durabilité des systèmes électroniques embarqués.",
    cases: "Bandes d'étanchéité pour portes et fenêtres de voitures · Gaines de faisceaux et joints de traversée · Coussinets thermiques pour systèmes de traction · Éléments amortisseurs pour équipements embarqués",
    products: "Plaques de silicone résistant au feu et ignifuge · Bandes d'étanchéité à faible fumée et sans halogène · Coussinets en silicone thermoconducteur · Silicone expansé amortissant et résistant aux intempéries",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = "zh" | "en" | "es" | "fr";
type PageKey = "home" | "about" | "materials" | "fire" | "industries" | "news" | "careers" | "contact";

interface NavState {
  page: PageKey;
  industryIdx?: number | null;
  articleIdx?: number | null;
  productIdx?: number | null;
  materialsListPage?: number | null;
}

type SearchResultType = "page" | "product" | "industry" | "article";

interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  keywords: string;
  navigateTo: NavState;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const FALLBACK_TRANSLATIONS = {
  zh: {
    companyFull: "旭创新材料（上海）有限公司",
    brand: "DELESUN",
    launch: { tagline: "高性能有机硅材料" },
    nav: { home: "首页", about: "公司简介", products: "产品中心", solutions: "解决方案", industries: "应用行业", news: "新闻动态", careers: "加入我们", contact: "联系我们" },
    search: {
      open: "搜索",
      placeholder: "搜索产品、行业、新闻和页面内容",
      empty: "输入关键词开始搜索",
      noResult: "未找到相关内容",
      historyTitle: "最近搜索",
      resultTitle: "搜索结果",
      clearAll: "清空记录",
      deleteOne: "删除记录",
      recordLabel: "历史",
      resultLabels: { page: "页面", product: "产品", industry: "行业", article: "新闻" },
    },
    hero: {
      badge: "全球领先有机硅材料解决方案提供商",
      title: "以材料科技\n驱动未来产业",
      sub: "为新能源安全保驾护航",
      desc: "旭创新材料以高性能有机硅材料为核心，深耕新能源汽车、航空航天、核能及先进制造领域，助力全球客户构建安全、高效的工业解决方案。",
      cta1: "探索解决方案",
      cta2: "了解我们",
      headline1: "高性能硅橡胶",
      headline2: "专注服务",
      counterLabel: "应用领域",
      slides: [
        { id: "aerospace", eyebrow: "AEROSPACE", label: "航空航天", desc: "为火箭发动机密封件、卫星热防护组件提供在极端温度与辐射环境下长期可靠的硅橡胶材料。", photo: FALLBACK_HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NEW ENERGY VEHICLE", label: "新能源汽车", desc: "电池热管理、高压密封与电驱动系统的核心硅橡胶解决方案，助力新能源汽车安全高效运行。", photo: FALLBACK_HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMICONDUCTOR", label: "半导体芯片", desc: "晶圆制造与封装测试全流程所需的高纯净低挥发硅橡胶材料，满足最严苛的洁净室标准。", photo: FALLBACK_HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLEAR POWER", label: "核电装备", desc: "核电站密封防护与耐辐射硅橡胶材料，在极端辐射及高温高压工况下保障长达40年安全运行。", photo: FALLBACK_HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "RAIL TRANSIT", label: "轨道交通", desc: "地铁、高铁阻燃密封系统全套解决方案，符合EN 45545-2国际防火与低烟无毒标准。", photo: FALLBACK_HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "年行业经验" },
      { value: "200+", label: "全球合作伙伴" },
      { value: "15+", label: "核心专利" },
      { value: "30+", label: "服务国家" },
    ],
    divTitle: "两大核心业务",
    divSub: "以有机硅材料为技术基础，构建面向未来的专业业务体系",
    divisions: [
      {
        key: "materials" as PageKey,
        icon: "Layers",
        label: "材料",
        title: "高性能有机硅材料",
        desc: "专注硅橡胶材料研发与量产，覆盖特种硅橡胶、导热硅脂、硅凝胶等多品类，为极端工况提供最优材料解决方案。",
        tags: ["硅橡胶", "导热材料", "绝缘材料", "密封材料"],
        img: FALLBACK_DIVISION_VISUALS.materials,
      },
      {
        key: "fire" as PageKey,
        icon: "Flame",
        label: "防火安全与热管控",
        title: "防火安全与热管控解决方案",
        desc: "针对新能源电池热失控、高密度电子散热挑战，提供从材料到系统的一体化防火安全与热管理整体解决方案。",
        tags: ["热失控抑制", "主动热管理", "防火防护", "散热系统"],
        img: FALLBACK_DIVISION_VISUALS.fire,
      },
    ],
    indTitle: "应用行业",
    indSub: "旭创新材料有机硅产品广泛服务于全球前沿高科技领域",
    industries: [
      { icon: "Zap", title: "新能源汽车", desc: "电池热管理、高压绝缘与系统密封材料，全面保障整车安全与续航可靠性。", img: FALLBACK_INDUSTRY_VISUALS.newEnergy },
      { icon: "Gauge", title: "储能", desc: "面向储能电池舱与机柜的隔热、防火及密封系统，提升长期运行稳定性。", img: FALLBACK_INDUSTRY_VISUALS.energyStorage },
      { icon: "Atom", title: "核能", desc: "耐高温、抗辐射特种硅橡胶，满足核电站极端工况下的严苛技术要求。", img: FALLBACK_INDUSTRY_VISUALS.nuclear },
      { icon: "Cpu", title: "芯片与半导体", desc: "超纯封装硅胶与导热垫片，助力芯片高性能运行与高可靠性封装。", img: FALLBACK_INDUSTRY_VISUALS.semiconductor },
      { icon: "Bot", title: "具身智能机器人", desc: "柔性执行器、传感器封装与关节密封材料，为下一代机器人奠定物质基础。", img: FALLBACK_INDUSTRY_VISUALS.humanoid },
      { icon: "Rocket", title: "航空航天", desc: "航天级硅橡胶密封与绝热材料，通过极端温度、振动及真空环境的严苛验证。", img: FALLBACK_INDUSTRY_VISUALS.aerospace },
      { icon: "Rocket", title: "低空飞行", desc: "面向 eVTOL 与无人飞行器的轻量化、防火与密封材料方案，兼顾热安全、耐候与可靠装配。", img: FALLBACK_INDUSTRY_VISUALS.lowAltitude },
      { icon: "Cpu", title: "数据中心", desc: "覆盖服务器机柜、UPS 与线缆贯穿场景的导热、隔热与防火封堵系统，支撑高可靠连续运行。", img: FALLBACK_INDUSTRY_VISUALS.dataCenter },
      { icon: "Gauge", title: "高铁", desc: "满足高铁车辆防火、低烟低毒与长期耐候要求的密封与热管理材料方案。", img: FALLBACK_INDUSTRY_VISUALS.highSpeedRail },
    ],
    newsTitle: "公司动态",
    newsSub: "洞察前沿技术，聚焦行业趋势",
    readMore: "阅读更多",
    viewAll: "查看全部",
    articles: [
      { date: "2026-06-11", tag: "媒体报道", title: "实力出圈！旭创耐火隔热新材料获上海电视台专题采访，定义行业新标准", desc: "旭创新材料受邀登陆上海东方财经频道《广特播报》，展示公司在防火隔热材料与 UL9540A 测试方面的硬核实力。", href: "https://mp.weixin.qq.com/s/9JY3pczCNgKFRlp_qIMeNg", image: FALLBACK_NEWS_VISUALS.media },
      { date: "2026-06-08", tag: "展会回顾", title: "圆满落幕｜不负相遇，本次展会完美收官！", desc: "第十二届国际储能和电池（上海）大会暨展览会圆满落幕，旭创新材料集中展示电池密封、导热、防火等有机硅功能材料解决方案。", href: "https://mp.weixin.qq.com/s/duqBa54zesHi6CP_sHCSag", image: FALLBACK_NEWS_VISUALS.recap },
      { date: "2026-05-28", tag: "展会预告", title: "聚力光储，共赴盛会 | SNEC 2026 我们在上海等您莅临", desc: "旭创新材料诚邀行业伙伴莅临 SNEC 2026 展位交流，聚焦全球热管控及防火安全方案在新能源与储能场景中的应用。", href: "https://mp.weixin.qq.com/s/EjHYZEDj_XURW2sh_hZj1g", image: FALLBACK_NEWS_VISUALS.preview },
    ],
    partnersTitle: "合作伙伴",
    partnersSub: "与全球行业领先企业携手，共同推动材料科技创新与应用",
    careersTitle: "加入我们",
    careersSub: "与最优秀的人才共同开创有机硅材料的未来",
    applyNow: "立即申请",
    jobs: [
      { dept: "研发", title: "高级有机硅材料研究员", location: "上海", type: "全职" },
      { dept: "销售", title: "销售", location: "上海 / 远程", type: "全职" },
      { dept: "工程", title: "热管理系统工程师", location: "上海", type: "全职" },
      { dept: "市场", title: "品牌与数字营销经理", location: "上海", type: "全职" },
    ],
    vision: "公司远景",
    visionText: "全球领先有机硅材料解决方案提供商",
    innovation: "创新理念",
    innovationText: "科技创造价值，品质成就未来",
    mission: "企业使命",
    missionText: "为新能源安全保驾护航",
    aboutFull: "旭创新材料是一家面向新能源与特种工业场景的有机硅材料解决方案提供商，专注新能源汽车、储能、核能、通信及高端制造领域，为全球客户提供定制化材料与稳定交付能力。",
    aboutPage: {
      hero: {
        eyebrow: "企业概览",
        lead: "新能源与特种工业场景有机硅材料解决方案提供商",
        summary: "聚焦新能源汽车、储能、核能、通信与高端制造，提供从材料研发到规模交付的一体化有机硅解决方案。",
        tags: ["25年行业经验", "上海制造基地", "15+核心专利", "全球业务布局"],
      },
      stats: [
        { value: "25+", label: "年技术积累" },
        { value: "8000吨", label: "年生产能力" },
        { value: "15+", label: "授权专利" },
        { value: "9", label: "大核心应用领域" },
      ],
      rd: {
        eyebrow: "研发实力",
        title: "二十余年技术积累\n引领行业创新",
        p1: "旭创新材料自成立以来，始终将技术创新作为核心驱动力，坚持持续加大研发投入，搭建起覆盖材料分子创新、性能验证测试、终端应用开发的一体化完整研发体系。公司具备成熟完善的产业转化与规模化落地能力，积累多项自主核心知识产权；同时积极推进产学研协同创新，与国内顶尖高等院校开展深度联合研发，持续突破新材料关键技术。",
        p2: "公司前瞻性布局全球化运营网络，面向全球市场提供高效本地化技术与商务服务：美国研发中心设立于宾夕法尼亚州滨州，欧洲服务中心落地法兰克福；国内在上海、常州、深圳布局研发与生产基地，材料整体年产能突破 8000 吨。依托全球化研发制造平台，旭创新材料可根据不同行业工况需求提供一站式定制化材料解决方案，为海内外客户持续交付高品质产品与全周期技术服务。",
      },
      milestones: {
        eyebrow: "成长路径",
        title: "发展历程",
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
        eyebrow: "认证体系",
        title: "资质认证",
        groups: [
          { label: "质量体系认证", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "产品认证", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "央视专题",
        title: "央视专题《橡胶贵族》",
        desc: "聚焦有机硅防火隔热材料应用与技术价值，点击左侧视频区域可弹窗观看央视专题内容。",
        placeholder: "央视专题视频",
        formats: "点击左侧视频区播放",
        action: "点击播放",
        modalNote: "视频已接入本地素材，可在弹窗中直接播放。",
        videoUrl: cctvVideoUrl,
      },
    },
    materialsPage: {
      eyebrow: "产品矩阵",
      title: "产品中心",
      desc: "专注高性能硅橡胶材料研发与生产，为新能源汽车、航空航天、半导体等行业提供全面解决方案。",
      tabs: { all: "全部产品", heat: "耐温阻燃", thermal: "导热隔热", special: "特种功能" },
      kpiLabel: "关键参数",
      detailBack: "返回",
      quickListLabel: "产品总览",
      detailBadge: "产品详情",
      galleryTitle: "产品图片",
      galleryMainLabel: "产品主视觉",
      galleryThumbLabel: "应用细节",
      overviewTitle: "产品介绍",
      highlightsTitle: "核心亮点",
      applicationsTitle: "应用场景",
      downloadsTitle: "下载资料",
      downloadsDesc: "可按项目阶段提供产品数据表、应用指南与视频资料，支持后续接入真实 PDF 下载文件。",
      downloadsAction: "联系获取",
      downloads: [
        { title: "产品数据表", desc: "规格、物性与加工建议" },
        { title: "应用指南", desc: "场景选型与装配建议" },
        { title: "视频资料", desc: "产品介绍、测试与应用视频" },
      ],
      videoTitle: "产品视频",
      videoDesc: "此区域可替换为产品介绍视频、测试视频或客户应用视频，支持后续接入真实 MP4 或外部视频链接。",
      videoPlaceholder: "视频资料待上传",
      videoFormats: "支持 MP4 / YouTube / Vimeo",
      tdsAction: "下载 TDS",
      tdsDesc: "下载当前产品技术数据表",
      relatedTitle: "相关产品推荐",
      relatedAction: "查看产品",
      categoryLabel: "产品类别",
      tempLabel: "温度范围",
      formsTitle: "可供货形态",
      forms: ["片材", "型材", "模压件", "定制开发"],
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
      solutionsEyebrow: "解决方案",
      solutionsTitle: "应用场景解决方案",
      sections: {
        fire: { title: "防火安全", desc: "聚焦火焰阻隔、热失控延缓、贯穿封堵与高等级阻燃防护。" },
        thermal: { title: "热管控", desc: "聚焦热隔离、温升控制、高温保护与系统热路径优化。" },
      },
      kpiLabel: "方案要点",
      solutions: [
        { title: "电池热失控防护", tag: "新能源储能", desc: "采用防火硅橡胶，当温度超过阈值时材料迅速形成坚硬的隔热保护层，有效阻断热失控蔓延路径，为电池模组提供被动安全保护。", specs: ["耐火温度 ≥ 1200°C", "耐火时间 > 180分钟", "工作温度 -60°C~200°C", "低烟无卤无毒", "通过UL9540A认证"] },
        { title: "建筑防火密封系统", tag: "建筑工程", desc: "耐火硅橡胶密封条与防火膨胀填缝剂组合应用，满足建筑防火规范GB 50016要求，确保建筑贯穿孔与伸缩缝的耐火完整性。", specs: ["耐火温度 > 1200℃", "耐火时间 > 180 分钟", "烟密度（透光率） > 70%", "无卤无毒"] },
        { title: "轨道交通阻燃方案", tag: "轨道交通", desc: "专为地铁、高铁车厢设计的全系防火阻燃密封材料，通过EN 45545-2 HL3最高等级认证，在火灾工况下低烟、低毒，保障乘客疏散安全。", specs: ["通过 EN 45545-2 HL3", "CO释放量 < 600 ppm", "烟密度 < 210 (Ds)", "氧指数 LOI ⩾ 30%", "毒性指数 CITNLP 0.056"] },
        { title: "电缆贯穿防火封堵", tag: "数据中心 / 电力", desc: "专用防火硅橡胶封堵块与防火泥组合系统，用于数据中心、变电站及工业厂房电缆贯穿孔的防火封堵，阻止火焰沿电缆通道蔓延。", specs: ["耐火完整性 E120", "符合 IEC 60331", "自密封补偿结构", "安装便捷可维护"] },
        { title: "核电与船舶防火保护", tag: "核电 / 海工", desc: "满足核级耐火要求的特种硅橡胶密封件，耐辐照老化性能卓越；同时提供符合中国船级社（CCS）认证的船用防火密封系统。", specs: ["通过CCS认证", "耐辐照剂量 ≥10 MGy", "耐盐雾≥1000小时", "ASME NQA-1质保体系"] },
        { title: "隔热与耐高温保护", tag: "航空 / 工业", desc: "航空级隔热硅橡胶发泡材料，在飞机发动机舱、工业窑炉及高温管道外壁实现优异的热隔离效果，减少能耗并保护周边结构。", specs: ["导热系数 ≤0.07 W/m·K", "最高耐温 +300°C", "低出气量（ASTM E595）", "质轻 · 防水 · 耐震"] },
      ],
      standardsEyebrow: "标准与认证",
      standardsTitle: "标准适配与认证支持",
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
    industryDetail: FALLBACK_INDUSTRY_DETAIL_ZH,
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
      mapCompany: "旭创新材料（上海）",
      mapDistrict: "上海市奉贤区柘林镇",
      mapAddressTitle: "导航地址",
      mapAddressDesc: "点击下方地图可在对应地图中直接打开地址与路线",
      mapActions: { amap: "高德地图", baidu: "百度地图", google: "Google Maps" },
      formTitle: "发送信息",
      placeholders: ["姓名", "公司名称", "联系邮箱", "电话"],
      messagePlaceholder: "请描述您的需求...",
      send: "发送消息",
      wechatTitle: "可直接扫码关注公众号或进入小程序获取更多信息",
      wechatSub: "",
      wechatCards: [
        { title: "公众号", desc: "旭创有机硅防火隔热材料", hint: "" },
        { title: "小程序", desc: "DELESUN 小程序", hint: "" },
      ],
      officesEyebrow: "办事处网络",
      officesTitle: "各地办事处",
      offices: [
        { city: "上海（总部）", addr: "奉贤区科工路539号", tel: "+86-21-57500371", role: "总部·研发·销售" },
        { city: "苏州（生产基地）", addr: "苏州市吴中经济开发区工业园路32号", tel: "+86 512 6598 8800", role: "生产·质检" },
        { city: "美国纽约（销售处）", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "销售处" },
      ],
    },
    footer: { navHeading: "导航", productsHeading: "产品", contactHeading: "联系我们" },
    learnMore: "深入了解",
    backHome: "返回首页",
    footerTagline: "科技创造价值，品质成就未来",
    address: "中国·上海市奉贤区科工路539号",
    email: "sale@delesungp.com",
    phone: "+86 021-5750-0371",
    copyright: "© 2026 旭创新材料（上海）有限公司. 保留所有权利.",
  },
  en: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "High-Performance Silicone Materials" },
    nav: { home: "HOME", about: "ABOUT", products: "PRODUCTS", solutions: "SOLUTIONS", industries: "APPLICATIONS", news: "NEWS", careers: "CAREERS", contact: "CONTACT" },
    search: {
      open: "Search",
      placeholder: "Search products, industries, news, and site content",
      empty: "Start typing to search",
      noResult: "No matching content found",
      historyTitle: "Recent Searches",
      resultTitle: "Results",
      clearAll: "Clear All",
      deleteOne: "Remove",
      recordLabel: "History",
      resultLabels: { page: "Page", product: "Product", industry: "Application", article: "News" },
    },
    hero: {
      badge: "Global provider of advanced silicone material solutions",
      title: "MATERIAL SCIENCE\nDRIVING TOMORROW",
      sub: "Safeguarding New Energy Security",
      desc: "DELESUN New Materials advances high-performance silicone materials for new energy vehicles, aerospace, nuclear power, and advanced manufacturing — building safe, efficient industrial solutions for global clients.",
      cta1: "Explore Solutions",
      cta2: "About Us",
      headline1: "High-Performance Silicone",
      headline2: "Dedicated Service",
      counterLabel: "Applications",
      slides: [
        { id: "aerospace", eyebrow: "AEROSPACE", label: "Aerospace", desc: "Long-life silicone materials for rocket engine seals and satellite thermal protection components under extreme temperature and radiation.", photo: FALLBACK_HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NEW ENERGY VEHICLE", label: "New Energy Vehicles", desc: "Core silicone solutions for battery thermal management, high-voltage sealing, and electric drive systems—helping EVs run safely and efficiently.", photo: FALLBACK_HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMICONDUCTOR", label: "Semiconductors", desc: "High-purity, low-volatility silicone materials for wafer manufacturing and packaging/testing—meeting the most demanding cleanroom standards.", photo: FALLBACK_HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLEAR POWER", label: "Nuclear Power", desc: "Radiation-resistant silicone materials for nuclear sealing and protection, ensuring safe operation for up to 40 years under extreme radiation, high temperature, and pressure.", photo: FALLBACK_HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "RAIL TRANSIT", label: "Rail Transit", desc: "Complete flame-retardant sealing solutions for metro and high-speed rail compliant with EN 45545-2 fire safety and low smoke/toxicity standards.", photo: FALLBACK_HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "Years of Expertise" },
      { value: "200+", label: "Global Partners" },
      { value: "15+", label: "Core Patents" },
      { value: "30+", label: "Countries Served" },
    ],
    divTitle: "Two Core Business Lines",
    divSub: "Two future-facing professional divisions built on our silicone material technology platform",
    divisions: [
      {
        key: "materials" as PageKey,
        icon: "Layers",
        label: "Materials",
        title: "HIGH-PERFORMANCE SILICONE MATERIALS",
        desc: "R&D and mass production of silicone rubber materials — specialty rubber, thermal grease, silicone gels — delivering optimal solutions for critical applications in extreme conditions.",
        tags: ["Silicone Rubber", "Thermal Materials", "Insulation", "Sealing"],
        img: FALLBACK_DIVISION_VISUALS.materials,
      },
      {
        key: "fire" as PageKey,
        icon: "Flame",
        label: "Fire Safety & Thermal Control",
        title: "FIRE SAFETY & THERMAL MANAGEMENT SOLUTIONS",
        desc: "Integrated material-to-system solutions addressing thermal runaway in new energy batteries and heat dissipation in high-density electronics.",
        tags: ["Thermal Runaway Suppression", "Active Thermal Mgmt", "Fire Protection", "Heat Dissipation"],
        img: FALLBACK_DIVISION_VISUALS.fire,
      },
    ],
    indTitle: "APPLICATIONS",
    indSub: "DELESUN silicone products serve the world's most demanding high-technology sectors",
    industries: [
      { icon: "Zap", title: "NEW ENERGY VEHICLES", desc: "Battery thermal management, high-voltage insulation, and sealing systems supporting safer, longer-range vehicles.", img: FALLBACK_INDUSTRY_VISUALS.newEnergy },
      { icon: "Gauge", title: "ENERGY STORAGE", desc: "Insulation, fire protection, and sealing systems for ESS cabinets and battery enclosures with long-term reliability.", img: FALLBACK_INDUSTRY_VISUALS.energyStorage },
      { icon: "Atom", title: "NUCLEAR POWER", desc: "High-temperature, radiation-resistant specialty silicone meeting extreme nuclear plant demands.", img: FALLBACK_INDUSTRY_VISUALS.nuclear },
      { icon: "Cpu", title: "CHIPS & SEMICONDUCTORS", desc: "Ultra-pure encapsulant silicone and thermal pads enabling high-performance chip operation.", img: FALLBACK_INDUSTRY_VISUALS.semiconductor },
      { icon: "Bot", title: "HUMANOID ROBOTS", desc: "Flexible actuators, sensor encapsulation, and joint sealing — material foundation for next-gen robotics.", img: FALLBACK_INDUSTRY_VISUALS.humanoid },
      { icon: "Rocket", title: "AEROSPACE", desc: "Aerospace-grade silicone sealing and insulation for extreme temperatures, vibration, and vacuum.", img: FALLBACK_INDUSTRY_VISUALS.aerospace },
      { icon: "Rocket", title: "LOW-ALTITUDE FLIGHT", desc: "Lightweight fire-protection and sealing solutions for eVTOL aircraft and low-altitude platforms, balancing thermal safety, weather resistance, and reliable assembly.", img: FALLBACK_INDUSTRY_VISUALS.lowAltitude },
      { icon: "Cpu", title: "DATA CENTERS", desc: "Thermal, insulation, and firestop systems for server cabinets, UPS units, and cable penetrations, supporting high-reliability continuous operation.", img: FALLBACK_INDUSTRY_VISUALS.dataCenter },
      { icon: "Gauge", title: "HIGH-SPEED RAIL", desc: "Sealing and thermal-management materials engineered for high-speed rail applications with strict fire safety, low-smoke, low-toxicity, and long-life durability requirements.", img: FALLBACK_INDUSTRY_VISUALS.highSpeedRail },
    ],
    newsTitle: "COMPANY NEWS",
    newsSub: "Frontier insights and industry trends",
    readMore: "Read More",
    viewAll: "View All",
    articles: [
      { date: "Jun 11, 2026", tag: "Media Coverage", title: "DELESUN FIRE-PROTECTION MATERIALS FEATURED BY SHANGHAI TV", desc: "DELESUN was featured on Shanghai Eastern Finance Channel to present its fire-resistant insulation materials and progress in the UL9540A thermal runaway fire propagation test.", href: "https://mp.weixin.qq.com/s/9JY3pczCNgKFRlp_qIMeNg", image: FALLBACK_NEWS_VISUALS.media },
      { date: "Jun 8, 2026", tag: "Exhibition Recap", title: "SUCCESSFUL CLOSE: THANK YOU FOR MEETING DELESUN AT THE SHOW", desc: "At the SNEC ES+ exhibition, DELESUN presented silicone solutions for battery sealing, thermal management, and fire protection to partners from around the world.", href: "https://mp.weixin.qq.com/s/duqBa54zesHi6CP_sHCSag", image: FALLBACK_NEWS_VISUALS.recap },
      { date: "May 28, 2026", tag: "Event Preview", title: "POWERING PV AND ENERGY STORAGE: MEET DELESUN AT SNEC 2026 IN SHANGHAI", desc: "DELESUN invites customers and partners to visit its booth at SNEC 2026 to explore fire safety and thermal management material solutions for energy applications.", href: "https://mp.weixin.qq.com/s/EjHYZEDj_XURW2sh_hZj1g", image: FALLBACK_NEWS_VISUALS.preview },
    ],
    partnersTitle: "PARTNERS",
    partnersSub: "Collaborating with global industry leaders to co-drive material technology innovation",
    careersTitle: "JOIN US",
    careersSub: "Build the future of silicone materials with the best minds in the industry",
    applyNow: "Apply Now",
    jobs: [
      { dept: "R&D", title: "SENIOR SILICONE MATERIALS RESEARCHER", location: "Shanghai", type: "Full-time" },
      { dept: "Sales", title: "OVERSEAS REGIONAL SALES DIRECTOR", location: "Shanghai / Remote", type: "Full-time" },
      { dept: "Engineering", title: "THERMAL MANAGEMENT SYSTEMS ENGINEER", location: "Suzhou", type: "Full-time" },
      { dept: "Marketing", title: "BRAND & DIGITAL MARKETING MANAGER", location: "Shanghai", type: "Full-time" },
    ],
    vision: "Vision",
    visionText: "A Global Leader in Silicone Material Solutions",
    innovation: "Innovation",
    innovationText: "Technology Creates Value, Quality Shapes the Future",
    mission: "Mission",
    missionText: "Safeguarding New Energy Security",
    aboutFull: "DELESUN is a technology-driven enterprise focused on the R&D, manufacturing, and commercialization of high-performance silicone materials. With deep experience in new energy, specialty industrial, and advanced manufacturing applications, we provide tailored material solutions backed by stable global delivery capability.",
    aboutPage: {
      hero: {
        eyebrow: "ABOUT DELESUN",
        lead: "Silicone Material Solutions for New Energy and Specialty Industrial Applications",
        summary: "We support EVs, energy storage, nuclear power, communications, and advanced manufacturing with integrated silicone solutions spanning material development, application engineering, and scaled delivery.",
        tags: ["25 Years of Expertise", "Shanghai Manufacturing", "15+ Core Patents", "Global Business Footprint"],
      },
      stats: [
        { value: "25+", label: "Years of Technical Accumulation" },
        { value: "8,000t", label: "Annual Capacity" },
        { value: "15+", label: "Granted Patents" },
        { value: "9", label: "Core Application Sectors" },
      ],
      rd: {
        eyebrow: "R&D CAPABILITIES",
        title: "TWO DECADES OF TECHNICAL EXPERTISE\nPOWERING INDUSTRIAL INNOVATION",
        p1: "Since its founding, DELESUN has treated technological innovation as a core driver of long-term growth. The company continues to invest in R&D and has built an integrated system covering molecular material design, performance validation, and application development. It also brings mature industrialization and scale-up capabilities, supported by multiple core intellectual property assets and collaborative R&D programs with leading universities in China.",
        p2: "DELESUN has steadily expanded its global operating footprint to provide localized technical and commercial support. Its U.S. R&D center is based in Pennsylvania, and its European service center is located in Frankfurt. In China, the company operates R&D and manufacturing bases in Shanghai, Changzhou, and Shenzhen, with total annual capacity exceeding 8,000 tons. This global platform enables DELESUN to deliver customized material solutions and technical support throughout the full project cycle.",
      },
      milestones: {
        eyebrow: "MILESTONES",
        title: "MILESTONES",
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
        eyebrow: "CERTIFICATIONS",
        title: "CERTIFICATIONS",
        groups: [
          { label: "Quality System Certifications", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "Product Certifications", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "CCTV FEATURE",
        title: "CCTV FEATURE: RUBBER ARISTOCRACY",
        desc: "Focused on silicone fire protection and thermal insulation materials. Click the video area on the left to open the CCTV feature.",
        placeholder: "CCTV Feature Video",
        formats: "Click the left video area to play",
        action: "Play Video",
        modalNote: "The local video source is connected and can be played directly in the popup.",
        videoUrl: cctvVideoUrl,
      },
    },
    materialsPage: {
      eyebrow: "PRODUCT CENTER",
      title: "PRODUCT CENTER",
      desc: "Focused on the R&D and manufacturing of high-performance silicone materials, delivering comprehensive solutions for EVs, aerospace, semiconductors, and more.",
      tabs: { all: "All Products", heat: "Heat & Flame", thermal: "Thermal Management", special: "Specialty" },
      kpiLabel: "Key Specs",
      detailBack: "Back to Products",
      quickListLabel: "Quick Product List",
      detailBadge: "Product Detail",
      galleryTitle: "Product Images",
      galleryMainLabel: "Main Product Visual",
      galleryThumbLabel: "Application Detail",
      overviewTitle: "Overview",
      highlightsTitle: "Key Highlights",
      applicationsTitle: "Applications",
      downloadsTitle: "Downloads",
      downloadsDesc: "Datasheets, application guides, and video assets can be provided by project stage, with real PDF downloads ready to be connected later.",
      downloadsAction: "Request File",
      downloads: [
        { title: "PRODUCT DATASHEET", desc: "Specifications, properties, and processing advice" },
        { title: "APPLICATION GUIDE", desc: "Scenario selection and assembly guidance" },
        { title: "VIDEO ASSETS", desc: "Product intro, testing, and application videos" },
      ],
      videoTitle: "Product Video",
      videoDesc: "This area can be replaced with a product introduction, testing footage, or customer application video. Real MP4 or external video links can be connected later.",
      videoPlaceholder: "Video Asset Pending",
      videoFormats: "Supports MP4 / YouTube / Vimeo",
      tdsAction: "Download TDS",
      tdsDesc: "Download the technical data sheet for this product",
      relatedTitle: "Related Products",
      relatedAction: "View Product",
      categoryLabel: "Category",
      tempLabel: "Temperature Range",
      formsTitle: "Supply Formats",
      forms: ["Sheets", "Profiles", "Molded Parts", "Custom Development"],
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
      solutionsEyebrow: "SOLUTIONS",
      solutionsTitle: "APPLICATION SOLUTIONS",
      sections: {
        fire: { title: "FIRE PROTECTION", desc: "Focused on flame barriers, thermal-runaway delay, cable penetration sealing, and high-grade passive fire safety." },
        thermal: { title: "THERMAL MANAGEMENT", desc: "Focused on insulation, temperature-rise control, high-temperature protection, and optimized thermal paths." },
      },
      kpiLabel: "Solution Highlights",
      solutions: [
        { title: "BATTERY THERMAL RUNAWAY PROTECTION", tag: "Energy Storage", desc: "Fire-resistant silicone rapidly forms a rigid thermal-insulation barrier once the temperature exceeds a threshold, effectively blocking thermal-runaway propagation and providing passive safety for battery modules.", specs: ["Fire resistance temperature ≥ 1200°C", "Fire resistance time > 180 min", "Operating temperature -60°C to 200°C", "Low smoke, halogen-free, non-toxic", "UL9540A certified"] },
        { title: "BUILDING FIRE SEALING SYSTEM", tag: "Construction", desc: "Fire-resistant silicone sealing strips combined with intumescent firestop sealants meet GB 50016 requirements, ensuring fire integrity for penetrations and expansion joints.", specs: ["Fire resistance temperature > 1200°C", "Fire resistance time > 180 min", "Smoke density (light transmittance) > 70%", "Halogen-free and non-toxic"] },
        { title: "RAIL TRANSIT FLAME-RETARDANT SOLUTION", tag: "Rail Transit", desc: "A full series of fire-resistant and flame-retardant sealing materials designed for metro and high-speed rail cars, certified to EN 45545-2 HL3. Low smoke and low toxicity improve passenger evacuation safety in fire scenarios.", specs: ["EN 45545-2 HL3 certified", "CO release < 600 ppm", "Smoke density < 210 (Ds)", "LOI ⩾ 30%", "Toxicity index CITNLP 0.056"] },
        { title: "CABLE PENETRATION FIRE STOPPING", tag: "Data Center / Power", desc: "A combination system of dedicated silicone firestop blocks and firestop putty for cable penetrations in data centers, substations, and industrial plants, preventing flame spread along cable routes.", specs: ["Fire integrity E120", "IEC 60331 compliant", "Self-sealing compensation design", "Easy installation & maintenance"] },
        { title: "NUCLEAR & MARINE FIRE PROTECTION", tag: "Nuclear / Offshore", desc: "Specialty silicone seals meeting nuclear-grade fire resistance with excellent irradiation aging performance, plus marine fire sealing systems certified by CCS.", specs: ["CCS certified", "Irradiation dose ≥ 10 MGy", "Salt spray ≥ 1000 h", "ASME NQA-1 QA system"] },
        { title: "THERMAL INSULATION & HIGH-TEMPERATURE PROTECTION", tag: "Aviation / Industry", desc: "Aerospace-grade foamed insulating silicone provides superior thermal isolation for aircraft engine bays, industrial kilns, and high-temperature pipes, reducing energy consumption and protecting surrounding structures.", specs: ["Thermal conductivity ≤ 0.07 W/m·K", "Max temperature +300°C", "Low outgassing (ASTM E595)", "Lightweight · Water resistant · Vibration resistant"] },
      ],
      standardsEyebrow: "STANDARDS & CERTS",
      standardsTitle: "STANDARDS ALIGNMENT & CERTIFICATION SUPPORT",
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
    industryDetail: FALLBACK_INDUSTRY_DETAIL_EN,
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
      mapCompany: "DELESUN (Shanghai)",
      mapDistrict: "Zhelin Town, Fengxian District, Shanghai",
      mapAddressTitle: "Directions",
      mapAddressDesc: "Open the destination directly in Amap, Baidu Maps, or Google Maps.",
      mapActions: { amap: "Amap", baidu: "Baidu Maps", google: "Google Maps" },
      formTitle: "SEND US A MESSAGE",
      placeholders: ["Name", "Company", "Email", "Phone"],
      messagePlaceholder: "Tell us about your application, technical requirements, target certifications, and project timeline...",
      send: "Send Message",
      wechatTitle: "Scan to follow our official account or access the DELESUN mini program for more information",
      wechatSub: "",
      wechatCards: [
        { title: "OFFICIAL ACCOUNT", desc: "DELESUN updates and technical content", hint: "" },
        { title: "MINI PROGRAM", desc: "Quick access to DELESUN products and information", hint: "" },
      ],
      officesEyebrow: "OUR OFFICES",
      officesTitle: "OFFICES",
      offices: [
        { city: "Shanghai (HQ)", addr: "539 Kegong Rd, Fengxian District", tel: "+86-21-57500371", role: "HQ · R&D · Sales" },
        { city: "Suzhou (Manufacturing)", addr: "32 Industrial Park Rd, Wuzhong District", tel: "+86 512 6598 8800", role: "Manufacturing · QC" },
        { city: "New York, USA (Sales Office)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Sales Office" },
      ],
    },
    footer: { navHeading: "Navigation", productsHeading: "Products", contactHeading: "Contact Us" },
    learnMore: "Learn More",
    backHome: "Back to Home",
    footerTagline: "Technology Creates Value, Quality Shapes the Future",
    address: "No. 539 Kegong Road, Fengxian District, Shanghai, China",
    email: "sale@delesungp.com",
    phone: "+86 21-5750-0371",
    copyright: "© 2026 DELESUN New Materials (Shanghai) Co., Ltd. All rights reserved.",
  },
  es: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "Materiales de Silicona de Alto Rendimiento" },
    nav: { home: "Inicio", about: "Sobre Nosotros", products: "Productos", solutions: "Soluciones", industries: "Aplicaciones", news: "Noticias", careers: "Carreras", contact: "Contacto" },
    search: {
      open: "Buscar",
      placeholder: "Buscar productos, industrias, noticias y contenido del sitio",
      empty: "Escriba para buscar",
      noResult: "No se encontraron resultados",
      historyTitle: "Búsquedas Recientes",
      resultTitle: "Resultados",
      clearAll: "Borrar Todo",
      deleteOne: "Eliminar",
      recordLabel: "Historial",
      resultLabels: { page: "Página", product: "Producto", industry: "Aplicación", article: "Noticia" },
    },
    hero: {
      badge: "Soluciones avanzadas en materiales de silicona para industrias de alta exigencia",
      title: "Ciencia de materiales\npara la industria del mañana",
      sub: "Seguridad para la nueva energía, fiabilidad para la industria",
      desc: "DELESUN desarrolla y fabrica materiales de silicona de alto rendimiento para nuevas energías, aeroespacial, energía nuclear y manufactura avanzada, con un enfoque en seguridad, estabilidad y aplicación industrial.",
      cta1: "Explorar Soluciones",
      cta2: "Sobre Nosotros",
      headline1: "Silicona de Alto Rendimiento",
      headline2: "Servicio Especializado",
      counterLabel: "Aplicaciones",
      slides: [
        { id: "aerospace", eyebrow: "AEROSPACE", label: "Aeroespacial", desc: "Materiales de silicona de larga vida útil para sellos de motores de cohetes y componentes de protección térmica de satélites en condiciones extremas.", photo: FALLBACK_HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NEW ENERGY VEHICLE", label: "Vehículos Eléctricos", desc: "Soluciones de silicona para gestión térmica de baterías, sellado de alto voltaje y sistemas de tracción eléctrica para una operación segura y eficiente.", photo: FALLBACK_HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMICONDUCTOR", label: "Semiconductores", desc: "Silicona de alta pureza y baja volatilidad para fabricación de obleas y procesos de encapsulado/pruebas, cumpliendo estándares de sala limpia.", photo: FALLBACK_HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLEAR POWER", label: "Energía Nuclear", desc: "Materiales de silicona resistentes a radiación para sellado y protección en entornos de alta temperatura y presión durante décadas.", photo: FALLBACK_HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "RAIL TRANSIT", label: "Transporte Ferroviario", desc: "Soluciones completas de sellado ignífugo para metro y tren de alta velocidad conforme a EN 45545-2 y requisitos de bajo humo y baja toxicidad.", photo: FALLBACK_HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "Años de Experiencia" },
      { value: "200+", label: "Socios Globales" },
      { value: "15+", label: "Patentes Clave" },
      { value: "30+", label: "Países" },
    ],
    divTitle: "Dos Líneas de Negocio Principales",
    divSub: "Dos divisiones orientadas al futuro sustentadas en nuestra plataforma tecnológica de silicona",
    divisions: [
      {
        key: "materials" as PageKey,
        icon: "Layers",
        label: "Materiales",
        title: "Materiales de Silicona de Alto Rendimiento",
        desc: "I+D y producción masiva de caucho de silicona, grasa térmica y geles para aplicaciones críticas en condiciones extremas.",
        tags: ["Caucho de Silicona", "Materiales Térmicos", "Aislamiento", "Sellado"],
        img: FALLBACK_DIVISION_VISUALS.materials,
      },
      {
        key: "fire" as PageKey,
        icon: "Flame",
        label: "Seguridad contra Incendios",
        title: "Soluciones de Seguridad contra Incendios y Control Térmico",
        desc: "Soluciones integradas para el escape térmico en baterías y la disipación de calor en electrónica de alta densidad.",
        tags: ["Supresión Fuga Térmica", "Gestión Térmica Activa", "Protección Incendios", "Disipación Calor"],
        img: FALLBACK_DIVISION_VISUALS.fire,
      },
    ],
    indTitle: "Aplicaciones",
    indSub: "Los productos de silicona DELESUN sirven a los sectores más exigentes del mundo",
    industries: [
      { icon: "Zap", title: "Vehículos Eléctricos", desc: "Gestión térmica de baterías, aislamiento de alto voltaje y sellado para vehículos más seguros y eficientes.", img: FALLBACK_INDUSTRY_VISUALS.newEnergy },
      { icon: "Gauge", title: "Almacenamiento de Energía", desc: "Aislamiento, protección contra incendios y sellado para gabinetes ESS y compartimentos de baterías.", img: FALLBACK_INDUSTRY_VISUALS.energyStorage },
      { icon: "Atom", title: "Energía Nuclear", desc: "Silicona especial resistente a altas temperaturas y radiación para centrales nucleares.", img: FALLBACK_INDUSTRY_VISUALS.nuclear },
      { icon: "Cpu", title: "Chips y Semiconductores", desc: "Encapsulantes de silicona ultrapura y almohadillas térmicas para chips de alto rendimiento.", img: FALLBACK_INDUSTRY_VISUALS.semiconductor },
      { icon: "Bot", title: "Robots Humanoides", desc: "Actuadores flexibles, encapsulación de sensores y sellado de juntas para robótica de nueva generación.", img: FALLBACK_INDUSTRY_VISUALS.humanoid },
      { icon: "Rocket", title: "Aeroespacial", desc: "Sellado y aislamiento grado aeroespacial para temperaturas extremas y vacío.", img: FALLBACK_INDUSTRY_VISUALS.aerospace },
      { icon: "Rocket", title: "Vuelo a Baja Altitud", desc: "Soluciones ligeras de protección contra incendios y sellado para eVTOL y plataformas de vuelo a baja altitud, con equilibrio entre seguridad térmica, resistencia climática y fiabilidad de ensamblaje.", img: FALLBACK_INDUSTRY_VISUALS.lowAltitude },
      { icon: "Cpu", title: "Centros de Datos", desc: "Sistemas de conducción térmica, aislamiento y sellado cortafuego para gabinetes de servidores, UPS y penetraciones de cable, orientados a una operación continua de alta fiabilidad.", img: FALLBACK_INDUSTRY_VISUALS.dataCenter },
      { icon: "Gauge", title: "Tren de Alta Velocidad", desc: "Materiales de sellado y gestión térmica para aplicaciones ferroviarias de alta velocidad con exigencias estrictas de fuego, bajo humo, baja toxicidad y durabilidad a largo plazo.", img: FALLBACK_INDUSTRY_VISUALS.highSpeedRail },
    ],
    newsTitle: "Noticias",
    newsSub: "Perspectivas de vanguardia y tendencias del sector",
    readMore: "Leer más",
    viewAll: "Ver todo",
    articles: [
      { date: "11 jun. 2026", tag: "Cobertura de Medios", title: "Los materiales ignífugos de DELESUN, destacados por la TV de Shanghái", desc: "DELESUN fue invitada al canal financiero de Shanghái para presentar sus materiales de aislamiento contra incendios y su avance en la prueba UL9540A.", href: "https://mp.weixin.qq.com/s/9JY3pczCNgKFRlp_qIMeNg", image: FALLBACK_NEWS_VISUALS.media },
      { date: "8 jun. 2026", tag: "Resumen de Feria", title: "Cierre exitoso: gracias por visitar a DELESUN en la feria", desc: "En SNEC ES+, DELESUN presentó soluciones de silicona para sellado de baterías, gestión térmica y protección contra incendios.", href: "https://mp.weixin.qq.com/s/duqBa54zesHi6CP_sHCSag", image: FALLBACK_NEWS_VISUALS.recap },
      { date: "28 may. 2026", tag: "Avance de Evento", title: "Encuentre a DELESUN en SNEC 2026 en Shanghái", desc: "DELESUN invita a clientes y socios a visitar su stand en SNEC 2026 para conocer sus soluciones de seguridad contra incendios y control térmico.", href: "https://mp.weixin.qq.com/s/EjHYZEDj_XURW2sh_hZj1g", image: FALLBACK_NEWS_VISUALS.preview },
    ],
    partnersTitle: "Socios",
    partnersSub: "Colaborando con líderes globales para impulsar la innovación en materiales",
    careersTitle: "Únase a Nosotros",
    careersSub: "Construya el futuro de los materiales de silicona con los mejores talentos",
    applyNow: "Aplicar Ahora",
    jobs: [
      { dept: "I+D", title: "Investigador Sénior de Materiales de Silicona", location: "Shanghái", type: "Tiempo completo" },
      { dept: "Ventas", title: "Director Regional de Ventas Internacional", location: "Shanghái / Remoto", type: "Tiempo completo" },
      { dept: "Ingeniería", title: "Ingeniero de Gestión Térmica", location: "Suzhou", type: "Tiempo completo" },
      { dept: "Marketing", title: "Gerente de Marketing Digital", location: "Shanghái", type: "Tiempo completo" },
    ],
    vision: "Visión",
    visionText: "Proveedor Líder Global de Soluciones en Materiales de Silicona",
    innovation: "Innovación",
    innovationText: "La Tecnología Crea Valor, la Calidad Construye el Futuro",
    mission: "Misión",
    missionText: "Proteger la Seguridad de las Nuevas Energías",
    aboutFull: "DELESUN es una empresa tecnológica especializada en la I+D, la industrialización y el suministro de materiales de silicona de alto rendimiento para escenarios de nueva energía, industria especializada y manufactura avanzada.",
    aboutPage: {
      hero: {
        eyebrow: "SOBRE NOSOTROS",
        lead: "Una plataforma de materiales e industrialización al servicio de aplicaciones de alta exigencia",
        summary: "Atendemos vehículos eléctricos, almacenamiento de energía, energía nuclear, comunicaciones y manufactura avanzada con soluciones integradas de silicona, desde el desarrollo del material hasta la entrega a escala.",
        tags: ["25 años de experiencia", "Manufactura en Shanghái", "15+ patentes clave", "Cobertura global"],
      },
      stats: [
        { value: "25+", label: "Años de Acumulación Técnica" },
        { value: "8.000t", label: "Capacidad Anual" },
        { value: "15+", label: "Patentes Otorgadas" },
        { value: "9", label: "Sectores Clave" },
      ],
      rd: {
        eyebrow: "I+D E INDUSTRIALIZACIÓN",
        title: "Más de dos décadas de experiencia técnica\nimpulsando la innovación industrial",
        p1: "Desde su fundación, DELESUN ha situado la innovación tecnológica en el centro de su desarrollo, manteniendo una inversión continua en I+D y construyendo un sistema integral que abarca la innovación molecular de materiales, la validación de prestaciones y el desarrollo de aplicaciones finales. La empresa cuenta con capacidades maduras de industrialización y escalado, ha acumulado múltiples activos propios de propiedad intelectual clave y, al mismo tiempo, impulsa activamente la colaboración entre industria, universidad e investigación mediante proyectos conjuntos con universidades líderes de China para seguir avanzando en tecnologías críticas de nuevos materiales.",
        p2: "DELESUN ha desplegado de forma proactiva una red global de operaciones para ofrecer soporte técnico y comercial localizado y eficiente a clientes de todo el mundo: su centro de I+D en Estados Unidos se encuentra en Pensilvania y su centro de servicio europeo está ubicado en Fráncfort. En China, la empresa cuenta con bases de I+D y producción en Shanghái, Changzhou y Shenzhen, con una capacidad total anual de materiales superior a 8.000 toneladas. Apoyándose en esta plataforma global de I+D y manufactura, DELESUN ofrece soluciones de materiales personalizadas e integrales para distintas condiciones de operación, entregando productos de alta calidad y servicios técnicos de ciclo completo a clientes nacionales e internacionales.",
      },
      milestones: {
        eyebrow: "HITOS",
        title: "Hitos",
        items: [
          { year: "2002", event: "Fundación en Shanghái." },
          { year: "2012", event: "Obtención de múltiples patentes y consolidación de una cartera integral de productos de caucho de silicona y otros productos de caucho." },
          { year: "2016", event: "Se convirtió en socio global de Nexans (Francia) y Meiji (Japón)." },
          { year: "2018", event: "Se convirtió en socio de Hirose Electric (Japón)." },
          { year: "2018", event: "Cooperación con organizaciones del sector de defensa y aparición en el documental de CCTV «Rubber Aristocracy»." },
          { year: "2025", event: "Alianzas globales con grupos líderes del sector." },
          { year: "2026", event: "Certificación UL9540A & NFPA855 para materiales ignífugos en almacenamiento energético." },
        ],
      },
      certifications: {
        eyebrow: "CERTIFICACIONES",
        title: "Certificaciones",
        groups: [
          { label: "Certificaciones del Sistema", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "Certificaciones de Producto", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "ESPECIAL CCTV",
        title: "Especial CCTV: Rubber Aristocracy",
        desc: "Presenta las aplicaciones y el valor técnico de los materiales de silicona ignífugos y de aislamiento térmico. Haga clic en el área izquierda para reproducirlo.",
        placeholder: "Video especial CCTV",
        formats: "Haga clic en la zona izquierda para reproducir",
        action: "Reproducir",
        modalNote: "La fuente local del video ya está conectada y puede reproducirse directamente en la ventana emergente.",
        videoUrl: cctvVideoUrl,
      },
    },
    materialsPage: {
      eyebrow: "CENTRO DE PRODUCTOS",
      title: "Centro de Productos",
      desc: "Enfocados en I+D y fabricación de silicona de alto rendimiento para VE, aeroespacial, semiconductores y más.",
      tabs: { all: "Todos", heat: "Calor e Ignífugo", thermal: "Gestión Térmica", special: "Especiales" },
      kpiLabel: "Parámetros Clave",
      detailBack: "Volver a Productos",
      quickListLabel: "Lista Rápida de Productos",
      detailBadge: "Detalle del Producto",
      galleryTitle: "Imágenes del Producto",
      galleryMainLabel: "Visual Principal",
      galleryThumbLabel: "Detalle de Aplicación",
      overviewTitle: "Introducción",
      highlightsTitle: "Puntos Clave",
      applicationsTitle: "Aplicaciones",
      downloadsTitle: "Descargas",
      downloadsDesc: "Se pueden proporcionar fichas técnicas, guías de aplicación y materiales de video según la etapa del proyecto, y luego conectarlos a PDF reales.",
      downloadsAction: "Solicitar Archivo",
      downloads: [
        { title: "Ficha Técnica", desc: "Especificaciones, propiedades y proceso" },
        { title: "Guía de Aplicación", desc: "Selección de escenarios y montaje" },
        { title: "Materiales de Video", desc: "Videos de producto, pruebas y aplicaciones" },
      ],
      videoTitle: "Video del Producto",
      videoDesc: "Esta área puede sustituirse por un video de presentación, pruebas o aplicaciones del cliente. Más adelante puede conectarse a MP4 o enlaces externos.",
      videoPlaceholder: "Video pendiente de carga",
      videoFormats: "Compatible con MP4 / YouTube / Vimeo",
      tdsAction: "Descargar TDS",
      tdsDesc: "Descargar la ficha técnica de este producto",
      relatedTitle: "Productos Relacionados",
      relatedAction: "Ver Producto",
      categoryLabel: "Categoría",
      tempLabel: "Rango de Temperatura",
      formsTitle: "Formatos de Suministro",
      forms: ["Láminas", "Perfiles", "Piezas Moldeadas", "Desarrollo Personalizado"],
      ctaTitle: "¿Necesita fichas técnicas o videos de muestra?",
      ctaDesc: "Podemos proporcionar fichas técnicas, pruebas de muestra y soporte de aplicación según su proyecto.",
      ctaButton: "Contactar Ventas",
      detailIntroTail: {
        heat: "Diseñado para escenarios industriales que requieren resistencia al calor, retardancia a la llama y estabilidad a largo plazo.",
        thermal: "Adecuado para gestión térmica de baterías, disipación en dispositivos de potencia y aislamiento térmico de sistemas críticos.",
        special: "Ideal para aplicaciones exigentes en sellado, amortiguación, resistencia a medios y funciones personalizadas.",
      },
    },
    fireSafetyPage: {
      overviewEyebrow: "CAPACIDADES CLAVE",
      overviewTitle: "Capacidades integradas para protección contra incendios y gestión térmica",
      overviewLead: "Desde la selección de materiales y la conducción térmica estructural hasta el aislamiento térmico, la protección contra incendios y la adaptación normativa, DELESUN ofrece soluciones integradas para aeroespacial, aeronaves de baja altitud, almacenamiento de energía, vehículos eléctricos, trenes de alta velocidad, robots con inteligencia incorporada, centros de datos, sistemas eléctricos y equipos industriales.",
      overviewCards: [
        { title: "Conducción Térmica", desc: "Los materiales de interfaz térmica, las almohadillas conductoras y el diseño estructural de conducción térmica mejoran la eficiencia de transferencia de calor en baterías, dispositivos de potencia y equipos de alta densidad térmica." },
        { title: "Aislamiento Térmico", desc: "Soluciones estables de aislamiento para estructuras de alta temperatura, compartimentos y carcasas que ayudan a limitar la transferencia de calor y proteger componentes críticos cercanos." },
        { title: "Barreras Pasivas al Fuego", desc: "Materiales ignífugos, intumescentes y ceramizables ayudan a frenar la propagación de la llama y el calor." },
        { title: "Confiabilidad de Sellado", desc: "Mantiene un sellado estable frente a calor, frío, niebla salina, aceites y compresión prolongada." },
        { title: "Adaptación Normativa", desc: "Soporte orientado a requisitos UL, NFPA, EN, IEC y normas de seguridad contra incendios en edificios." },
      ],
      solutionsEyebrow: "SOLUCIONES",
      solutionsTitle: "Soluciones por Aplicación",
      sections: {
        fire: { title: "Protección contra Incendios", desc: "Enfocado en barreras de llama, retraso de fuga térmica, sellado de penetraciones y protección pasiva de alto nivel." },
        thermal: { title: "Gestión Térmica", desc: "Enfocado en aislamiento, control del aumento de temperatura, protección a alta temperatura y optimización de rutas térmicas." },
      },
      kpiLabel: "Puntos Clave",
      solutions: [
        { title: "Protección contra Fuga Térmica", tag: "Almacenamiento", desc: "La silicona resistente al fuego forma rápidamente una barrera rígida de aislamiento térmico cuando la temperatura supera un umbral, frenando eficazmente la propagación de la fuga térmica y aportando protección pasiva al módulo de batería.", specs: ["Temperatura de resistencia al fuego ≥ 1200°C", "Tiempo de resistencia al fuego > 180 min", "Temperatura de trabajo de -60°C a 200°C", "Bajo humo, sin halógenos y no tóxico", "Certificación UL9540A"] },
        { title: "Sellado Cortafuego en Edificios", tag: "Construcción", desc: "Sistema de sellado cortafuego con tiras de silicona y selladores intumescentes para penetraciones y juntas.", specs: ["Temperatura de resistencia al fuego > 1200°C", "Tiempo de resistencia al fuego > 180 min", "Densidad de humo (transmitancia de luz) > 70%", "Sin halógenos y no tóxico"] },
        { title: "Solución Ignífuga Ferroviaria", tag: "Ferroviario", desc: "Materiales de sellado resistentes al fuego e ignífugos para vagones de metro y trenes de alta velocidad, certificados según EN 45545-2 HL3, con bajo humo y baja toxicidad.", specs: ["EN 45545-2 HL3", "CO < 600 ppm", "Densidad de humo < 210 (Ds)", "LOI ⩾ 30%", "Índice de toxicidad CITNLP 0.056"] },
        { title: "Sellado Cortafuego para Cables", tag: "Centro de datos / Energía", desc: "Bloques cortafuego y masilla para penetraciones de cables, evitando propagación de llama.", specs: ["E120", "IEC 60331", "Autocompensación", "Fácil mantenimiento"] },
        { title: "Protección Nuclear y Marina", tag: "Nuclear / Offshore", desc: "Sellos de silicona con requisitos nucleares y sistemas marinos certificados por CCS.", specs: ["CCS", "≥ 10 MGy", "≥ 1000 h niebla salina", "ASME NQA-1"] },
        { title: "Aislamiento y Alta Temperatura", tag: "Aviación / Industria", desc: "Silicona espumada aislante para compartimentos de motor, hornos y tuberías de alta temperatura.", specs: ["≤ 0,07 W/m·K", "+300°C", "ASTM E595", "Ligero · Resistente al agua · Resistente a vibración"] },
      ],
      standardsEyebrow: "NORMAS Y CERTIFICACIONES",
      standardsTitle: "Adaptación Normativa y Soporte de Certificación",
      standardsLead: "Soporte alineado con estándares, normativas y métodos de prueba clave—listo para desplegar.",
      standards: [
        { std: "GB 8624", scope: "Materiales de construcción Clase A" },
        { std: "EN 45545-2 HL3", scope: "Máximo nivel ferroviario" },
        { std: "IEC 60331", scope: "Integridad al fuego de cables" },
        { std: "UL94 V-0", scope: "Clasificación de combustión vertical" },
        { std: "ASTM E595", scope: "Baja desgasificación" },
        { std: "CCS", scope: "Certificación marina" },
      ],
    },
    industryDetailLabels: { challenge: "Desafíos Técnicos", solution: "Solución DELESUN", cases: "Casos Típicos", products: "Productos Clave" },
    industryDetail: FALLBACK_INDUSTRY_DETAIL_ES,
    newsDetail: {
      paras: [
        "DELESUN impulsa la innovación con inversión continua en I+D y el desarrollo de soluciones avanzadas basadas en nuestra plataforma tecnológica de silicona.",
        "En el futuro, profundizaremos en nuevas energías, aeroespacial y semiconductores junto con socios globales para construir sistemas más seguros y eficientes.",
      ],
    },
    careersPage: {
      benefits: [
        { label: "Compensación Competitiva", desc: "Paquete salarial líder y bonos por desempeño" },
        { label: "Crecimiento Profesional", desc: "Rutas de promoción claras con vías técnica y de gestión" },
        { label: "Cultura Colaborativa", desc: "Equipo abierto y colaborativo con talento de primer nivel" },
      ],
      openPositions: "Vacantes",
    },
    contactPage: {
      tagline: "Nuestro equipo está listo para analizar su necesidad y acompañar el desarrollo de su proyecto.",
      contactTitle: "Hablemos de su proyecto",
      mapCompany: "DELESUN (Shanghái)",
      mapDistrict: "Zhelin, Fengxian, Shanghái",
      mapAddressTitle: "Cómo llegar",
      mapAddressDesc: "Abra el destino directamente en Amap, Baidu Maps o Google Maps.",
      mapActions: { amap: "Amap", baidu: "Baidu Maps", google: "Google Maps" },
      formTitle: "Describa su necesidad",
      placeholders: ["Nombre", "Empresa", "Correo electrónico", "Teléfono"],
      messagePlaceholder: "Indique su aplicación, los requisitos técnicos, las certificaciones objetivo y el calendario previsto...",
      send: "Enviar",
      wechatTitle: "Escanee para seguir la cuenta oficial o acceder al mini programa de DELESUN",
      wechatSub: "",
      wechatCards: [
        { title: "Cuenta Oficial", desc: "Actualidad y contenidos técnicos de DELESUN", hint: "" },
        { title: "Mini Programa", desc: "Acceso rápido a productos e información de DELESUN", hint: "" },
      ],
      officesEyebrow: "NUESTRAS OFICINAS",
      officesTitle: "Oficinas",
      offices: [
        { city: "Shanghái (Sede)", addr: "539 Kegong Rd, Fengxian", tel: "+86-21-57500371", role: "Sede · I+D · Ventas" },
        { city: "Suzhou (Planta)", addr: "32 Industrial Park Rd, Wuzhong", tel: "+86 512 6598 8800", role: "Producción · QC" },
          { city: "Nueva York, EE. UU. (Oficina de ventas)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Oficina de ventas" },
      ],
    },
    footer: { navHeading: "Navegación", productsHeading: "Productos", contactHeading: "Contáctenos" },
    learnMore: "Saber más",
    backHome: "Volver al inicio",
    footerTagline: "La Tecnología Crea Valor, la Calidad Construye el Futuro",
    address: "No. 539, Kegong Road, distrito de Fengxian, Shanghái, China",
    email: "sale@delesungp.com",
    phone: "+86 21-5750-0371",
    copyright: "© 2026 DELESUN Nuevos Materiales (Shanghai). Todos los derechos reservados.",
  },
  fr: {
    companyFull: "DELESUN New Materials (Shanghai) Co., Ltd.",
    brand: "DELESUN",
    launch: { tagline: "Matériaux silicone haute performance" },
    nav: { home: "Accueil", about: "À propos", products: "Produits", solutions: "Solutions", industries: "Applications", news: "Actualités", careers: "Carrières", contact: "Contact" },
    search: {
      open: "Recherche",
      placeholder: "Rechercher des produits, applications, actualités ou contenus du site",
      empty: "Commencez à saisir pour lancer une recherche",
      noResult: "Aucun contenu correspondant",
      historyTitle: "Recherches récentes",
      resultTitle: "Résultats",
      clearAll: "Tout effacer",
      deleteOne: "Supprimer",
      recordLabel: "Historique",
      resultLabels: { page: "Page", product: "Produit", industry: "Application", article: "Actualité" },
    },
    hero: {
      badge: "Solutions silicone haute performance pour les industries de pointe",
      title: "Des matériaux silicone\npensés pour les industries critiques",
      sub: "Sécuriser l'énergie, fiabiliser l'industrie",
      desc: "DELESUN conçoit, développe et industrialise des matériaux silicone destinés aux applications les plus exigeantes, des nouvelles énergies à l'aérospatial, en passant par le nucléaire et la fabrication avancée.",
      cta1: "Découvrir nos solutions",
      cta2: "Découvrir DELESUN",
      headline1: "Performance matériau",
      headline2: "Accompagnement applicatif",
      counterLabel: "Secteurs",
      slides: [
        { id: "aerospace", eyebrow: "AÉRONAUTIQUE & SPATIAL", label: "Aéronautique et spatial", desc: "Des matériaux silicone conçus pour l'étanchéité, l'isolation et la tenue à l'environnement dans des conditions extrêmes de température, de vibration et de rayonnement.", photo: FALLBACK_HERO_SLIDE_VISUALS.aerospace },
        { id: "ev", eyebrow: "NOUVELLES ÉNERGIES", label: "Véhicules à énergies nouvelles", desc: "Des solutions silicone pour la gestion thermique des batteries, l'isolation haute tension et la protection passive contre le feu, au service d'une mobilité plus sûre et plus fiable.", photo: FALLBACK_HERO_SLIDE_VISUALS.ev },
        { id: "semi", eyebrow: "SEMI-CONDUCTEURS", label: "Semi-conducteurs", desc: "Des matériaux silicone de haute pureté, à faible dégazage et à performances thermiques maîtrisées, adaptés aux environnements de fabrication les plus sensibles.", photo: FALLBACK_HERO_SLIDE_VISUALS.semi },
        { id: "nuclear", eyebrow: "NUCLÉAIRE", label: "Nucléaire", desc: "Des solutions silicone résistantes au rayonnement, à la chaleur et au vieillissement, destinées aux fonctions d'étanchéité et de protection dans les environnements nucléaires sévères.", photo: FALLBACK_HERO_SLIDE_VISUALS.nuclear },
        { id: "rail", eyebrow: "FERROVIAIRE", label: "Ferroviaire", desc: "Des systèmes d'étanchéité et de protection incendie conformes aux exigences ferroviaires en matière de sécurité au feu, de faible fumée et de faible toxicité.", photo: FALLBACK_HERO_SLIDE_VISUALS.rail },
      ],
    },
    stats: [
      { value: "25+", label: "Ans d'expérience" },
      { value: "200+", label: "Partenaires mondiaux" },
      { value: "15+", label: "Brevets clés" },
      { value: "30+", label: "Pays servis" },
    ],
    divTitle: "Deux pôles d'activité majeurs",
    divSub: "Deux activités tournées vers l'avenir, construites sur notre plateforme technologique silicone",
    divisions: [
      {
        key: "materials" as PageKey,
        icon: "Layers",
        label: "Matériaux",
        title: "Matériaux silicone hautes performances",
        desc: "R&D et production à grande échelle de caoutchoucs silicone, graisses thermiques et gels silicone pour répondre aux applications critiques en conditions extrêmes.",
        tags: ["Caoutchouc silicone", "Matériaux thermiques", "Isolation", "Étanchéité"],
        img: FALLBACK_DIVISION_VISUALS.materials,
      },
      {
        key: "fire" as PageKey,
        icon: "Flame",
        label: "Sécurité incendie et maîtrise thermique",
        title: "Solutions de sécurité incendie et de maîtrise thermique",
        desc: "Des solutions intégrées, du matériau jusqu'au système, pour l'emballement thermique des batteries et la dissipation des équipements électroniques à forte densité de puissance.",
        tags: ["Maîtrise de l'emballement thermique", "Gestion thermique", "Protection incendie", "Dissipation thermique"],
        img: FALLBACK_DIVISION_VISUALS.fire,
      },
    ],
    indTitle: "Applications",
    indSub: "Les produits silicone DELESUN accompagnent les secteurs technologiques les plus exigeants au monde",
    industries: [
      { icon: "Zap", title: "Véhicules à énergies nouvelles", desc: "Gestion thermique des batteries, isolation haute tension et systèmes d'étanchéité pour des véhicules plus sûrs et plus fiables.", img: FALLBACK_INDUSTRY_VISUALS.newEnergy },
      { icon: "Gauge", title: "Stockage d'énergie", desc: "Systèmes d'isolation, de protection incendie et d'étanchéité pour armoires ESS et compartiments batteries, avec une fiabilité durable.", img: FALLBACK_INDUSTRY_VISUALS.energyStorage },
      { icon: "Atom", title: "Nucléaire", desc: "Silicones spéciaux résistants aux hautes températures et au rayonnement pour les environnements nucléaires les plus sévères.", img: FALLBACK_INDUSTRY_VISUALS.nuclear },
      { icon: "Cpu", title: "Puces et semi-conducteurs", desc: "Silicones d'encapsulation ultrapurs et coussinets thermiques pour le fonctionnement haute performance des semi-conducteurs.", img: FALLBACK_INDUSTRY_VISUALS.semiconductor },
      { icon: "Bot", title: "Robots humanoïdes", desc: "Actionneurs souples, encapsulation de capteurs et étanchéité des articulations : la base matérielle de la robotique de nouvelle génération.", img: FALLBACK_INDUSTRY_VISUALS.humanoid },
      { icon: "Rocket", title: "Aéronautique et spatial", desc: "Matériaux silicone d'étanchéité et d'isolation de grade aérospatial pour les environnements de température extrême, de vibration et de vide.", img: FALLBACK_INDUSTRY_VISUALS.aerospace },
      { icon: "Rocket", title: "Vol à basse altitude", desc: "Solutions légères de protection incendie et d'étanchéité pour les eVTOL et plateformes de vol à basse altitude, conciliant sécurité thermique, résistance climatique et fiabilité d'assemblage.", img: FALLBACK_INDUSTRY_VISUALS.lowAltitude },
      { icon: "Cpu", title: "Centres de données", desc: "Systèmes de gestion thermique, d'isolation et de compartimentage coupe-feu pour armoires serveurs, UPS et traversées de câbles, conçus pour une exploitation continue à haute fiabilité.", img: FALLBACK_INDUSTRY_VISUALS.dataCenter },
      { icon: "Gauge", title: "Grande vitesse ferroviaire", desc: "Matériaux d'étanchéité et de gestion thermique destinés au ferroviaire à grande vitesse, avec fortes exigences en feu, fumées, toxicité et durabilité.", img: FALLBACK_INDUSTRY_VISUALS.highSpeedRail },
    ],
    newsTitle: "Actualités de l'entreprise",
    newsSub: "Veille technologique et tendances du secteur",
    readMore: "Lire la suite",
    viewAll: "Voir tout",
    articles: [
      { date: "11 juin 2026", tag: "Presse", title: "Les matériaux coupe-feu DELESUN mis à l'honneur par la télévision de Shanghai", desc: "DELESUN a été invitée sur la chaîne financière de Shanghai pour présenter ses matériaux coupe-feu et isolants ainsi que ses avancées dans l'essai UL9540A d'emballement thermique.", href: "https://mp.weixin.qq.com/s/9JY3pczCNgKFRlp_qIMeNg", image: FALLBACK_NEWS_VISUALS.media },
      { date: "8 juin 2026", tag: "Retour salon", title: "Clôture réussie : merci d'avoir rencontré DELESUN sur le salon", desc: "Lors du salon SNEC ES+, DELESUN a présenté à ses partenaires internationaux ses solutions silicone pour l'étanchéité batterie, la gestion thermique et la protection incendie.", href: "https://mp.weixin.qq.com/s/duqBa54zesHi6CP_sHCSag", image: FALLBACK_NEWS_VISUALS.recap },
      { date: "28 mai 2026", tag: "Annonce salon", title: "Photovoltaïque et stockage : retrouvez DELESUN au SNEC 2026 à Shanghai", desc: "DELESUN invite ses clients et partenaires à visiter son stand au SNEC 2026 pour découvrir ses solutions matériaux de sécurité incendie et de maîtrise thermique pour l'énergie.", href: "https://mp.weixin.qq.com/s/EjHYZEDj_XURW2sh_hZj1g", image: FALLBACK_NEWS_VISUALS.preview },
    ],
    partnersTitle: "Partenaires",
    partnersSub: "Nous collaborons avec des leaders industriels mondiaux pour faire progresser l'innovation matériaux",
    careersTitle: "Nous rejoindre",
    careersSub: "Construisez l'avenir des matériaux silicone avec les meilleurs talents du secteur",
    applyNow: "Postuler",
    jobs: [
      { dept: "R&D", title: "Chercheur senior en matériaux silicone", location: "Shanghai", type: "Temps plein" },
      { dept: "Ventes", title: "Directeur régional des ventes internationales", location: "Shanghai / Télétravail", type: "Temps plein" },
      { dept: "Ingénierie", title: "Ingénieur systèmes de gestion thermique", location: "Suzhou", type: "Temps plein" },
      { dept: "Marketing", title: "Responsable marque et marketing digital", location: "Shanghai", type: "Temps plein" },
    ],
    vision: "Vision",
    visionText: "Devenir une référence mondiale des solutions en matériaux silicone",
    innovation: "Innovation",
    innovationText: "La technologie crée de la valeur, la qualité construit l'avenir",
    mission: "Mission",
    missionText: "Sécuriser les nouvelles énergies",
    aboutFull: "DELESUN développe, industrialise et fournit des matériaux silicone haute performance pour les nouvelles énergies, les environnements industriels complexes et la fabrication avancée, avec une capacité de livraison stable à l'échelle internationale.",
    aboutPage: {
      hero: {
        eyebrow: "À propos",
        lead: "Une plateforme matériaux et industrielle au service des applications les plus exigeantes",
        summary: "DELESUN accompagne les secteurs des nouvelles énergies, du stockage, du nucléaire, des communications et de la fabrication avancée avec des solutions silicone intégrées, de la formulation des matériaux jusqu'à la mise en production industrielle.",
        tags: ["25 ans d'expérience industrielle", "Base de fabrication à Shanghai", "15+ brevets clés", "Présence internationale"],
      },
      stats: [
        { value: "25+", label: "Ans d'accumulation technique" },
        { value: "8 000 t", label: "Capacité annuelle" },
        { value: "15+", label: "Brevets délivrés" },
        { value: "9", label: "Secteurs d'application clés" },
      ],
      rd: {
        eyebrow: "R&D et industrialisation",
        title: "Plus de vingt ans d'expertise technique\nau service de l'innovation industrielle",
        p1: "Depuis sa création, DELESUN fait de l'innovation technologique un levier de croissance structurant. L'entreprise investit de manière continue en R&D et s'appuie sur une organisation intégrée couvrant la conception moléculaire, la validation des performances et le développement d'applications. Elle dispose également de capacités solides d'industrialisation et de montée en cadence, adossées à plusieurs brevets clés et à des coopérations de recherche menées avec des universités chinoises de premier plan.",
        p2: "DELESUN a progressivement construit une présence internationale afin d'apporter un accompagnement technique et commercial de proximité. Son centre de R&D aux États-Unis est implanté en Pennsylvanie et son centre de services européen à Francfort. En Chine, ses bases de R&D et de production sont réparties entre Shanghai, Changzhou et Shenzhen, pour une capacité annuelle globale supérieure à 8 000 tonnes. Cette plateforme mondiale permet à DELESUN de proposer des solutions matériaux sur mesure et un support technique tout au long du cycle projet.",
      },
      milestones: {
        eyebrow: "Parcours de croissance",
        title: "Étapes clés",
        items: [
          { year: "2002", event: "Création de l'entreprise à Shanghai." },
          { year: "2012", event: "Obtention de plusieurs brevets et structuration d'une offre complète en caoutchouc silicone et produits associés." },
          { year: "2016", event: "DELESUN devient partenaire mondial de Nexans (France) et de Meiji (Japon)." },
          { year: "2018", event: "DELESUN devient partenaire de Hirose Electric (Japon)." },
          { year: "2018", event: "Coopération avec l'industrie de défense et participation au documentaire CCTV « Rubber Aristocracy »." },
          { year: "2025", event: "DELESUN devient partenaire mondial de groupes tels que Forvia et Coficab." },
          { year: "2026", event: "Les matériaux résistants au feu obtiennent la certification UL9540A & NFPA855 pour 6,25 GWh de stockage d'énergie." },
        ],
      },
      certifications: {
        eyebrow: "Système de certification",
        title: "Certifications",
        groups: [
          { label: "Certifications système", items: ["IATF16949", "ISO9001", "ISO14000", "ISO18000"] },
          { label: "Certifications produit", items: ["UL94V0", "UL9540A", "NFPA855", "REACH", "EN 45545", "EN 50382"] },
        ],
      },
      featuredVideo: {
        eyebrow: "Reportage CCTV",
        title: "Reportage CCTV : « Rubber Aristocracy »",
        desc: "Un focus sur les applications et la valeur technique des matériaux silicone coupe-feu et isolants. Cliquez sur la zone vidéo à gauche pour lancer le reportage.",
        placeholder: "Vidéo du reportage CCTV",
        formats: "Cliquez sur la zone vidéo de gauche pour lancer la lecture",
        action: "Lire la vidéo",
        modalNote: "La source vidéo locale est déjà connectée et peut être lue directement dans la fenêtre.",
        videoUrl: cctvVideoUrl,
      },
    },
    materialsPage: {
      eyebrow: "Gamme de produits",
      title: "Centre produits",
      desc: "Nous développons et produisons des matériaux silicone hautes performances pour fournir des solutions complètes aux secteurs des véhicules à énergies nouvelles, de l'aérospatial, des semi-conducteurs et au-delà.",
      tabs: { all: "Tous les produits", heat: "Résistance thermique et feu", thermal: "Gestion thermique", special: "Fonctions spéciales" },
      kpiLabel: "Spécifications clés",
      detailBack: "Retour",
      quickListLabel: "Vue d'ensemble des produits",
      detailBadge: "Détail produit",
      galleryTitle: "Visuels produit",
      galleryMainLabel: "Visuel principal",
      galleryThumbLabel: "Détail d'application",
      overviewTitle: "Présentation",
      highlightsTitle: "Points forts",
      applicationsTitle: "Applications",
      downloadsTitle: "Téléchargements",
      downloadsDesc: "Des fiches techniques, guides d'application et contenus vidéo peuvent être fournis selon l'avancement du projet, avec possibilité d'ajouter ensuite de vrais téléchargements PDF.",
      downloadsAction: "Demander le document",
      downloads: [
        { title: "Fiche technique produit", desc: "Spécifications, propriétés et conseils de mise en oeuvre" },
        { title: "Guide d'application", desc: "Aide au choix et recommandations d'assemblage" },
        { title: "Ressources vidéo", desc: "Présentation produit, essais et cas d'application" },
      ],
      videoTitle: "Vidéo produit",
      videoDesc: "Cette zone peut accueillir une vidéo de présentation, d'essai ou d'application client. De véritables fichiers MP4 ou liens vidéo externes pourront être connectés ultérieurement.",
      videoPlaceholder: "Vidéo en attente de mise en ligne",
      videoFormats: "Compatible MP4 / YouTube / Vimeo",
      tdsAction: "Télécharger la TDS",
      tdsDesc: "Télécharger la fiche technique du produit",
      relatedTitle: "Produits associés",
      relatedAction: "Voir le produit",
      categoryLabel: "Catégorie",
      tempLabel: "Plage de température",
      formsTitle: "Formats disponibles",
      forms: ["Feuilles", "Profilés", "Pièces moulées", "Développement sur mesure"],
      ctaTitle: "Besoin d'une fiche technique ou d'une vidéo d'essai ?",
      ctaDesc: "Nous pouvons fournir fiches techniques, essais d'échantillons et support d'application selon votre projet.",
      ctaButton: "Contacter l'équipe",
      detailIntroTail: {
        heat: "Convient aux scénarios de protection industrielle exigeant résistance thermique, tenue au feu et stabilité dans la durée.",
        thermal: "Conçu pour la gestion thermique des batteries, le refroidissement des composants de puissance et l'isolation thermique des systèmes critiques.",
        special: "Adapté aux applications exigeantes en étanchéité, amortissement, résistance aux fluides et performances fonctionnelles sur mesure.",
      },
    },
    fireSafetyPage: {
      overviewEyebrow: "Capacités clés",
      overviewTitle: "Capacités système pour la protection incendie et la maîtrise thermique",
      overviewLead: "Du choix des matériaux et de la conduction thermique structurelle à l'isolation thermique, à la protection incendie et à l'alignement normatif, DELESUN propose des solutions intégrées pour l'aérospatial, le vol à basse altitude, le stockage d'énergie, les véhicules à énergies nouvelles, la grande vitesse ferroviaire, les robots humanoïdes, les centres de données, les systèmes électriques et les équipements industriels.",
      overviewCards: [
        { title: "Conduction thermique", desc: "Les matériaux d'interface thermique, coussinets conducteurs et conceptions de transfert thermique structurel améliorent l'efficacité de circulation de la chaleur dans les batteries, composants de puissance et équipements à forte densité thermique." },
        { title: "Isolation thermique", desc: "Des solutions d'isolation stables pour structures haute température, compartiments et enveloppes limitent les transferts de chaleur et protègent les composants périphériques critiques." },
        { title: "Barrières passives au feu", desc: "Les matériaux ignifuges, intumescents et céramisables aident à ralentir la propagation des flammes et de la chaleur." },
        { title: "Fiabilité d'étanchéité", desc: "Maintien d'une étanchéité stable en conditions de chaleur, de froid, de brouillard salin, de fluides huileux et de compression prolongée." },
        { title: "Support normatif", desc: "Accompagnement orienté UL, NFPA, EN, IEC et exigences de sécurité incendie du bâtiment." },
      ],
      solutionsEyebrow: "Solutions",
      solutionsTitle: "Solutions par application",
      sections: {
        fire: { title: "Protection incendie", desc: "Centrée sur les barrières aux flammes, le retard à l'emballement thermique, le calfeutrement des traversées et la protection passive de haut niveau." },
        thermal: { title: "Maîtrise thermique", desc: "Centrée sur l'isolation, le contrôle de l'échauffement, la protection haute température et l'optimisation des chemins thermiques." },
      },
      kpiLabel: "Points clés",
      solutions: [
        { title: "Protection contre l'emballement thermique des batteries", tag: "Stockage d'énergie", desc: "Le silicone résistant au feu forme rapidement une barrière rigide d'isolation thermique lorsque la température dépasse un seuil, ce qui bloque efficacement la propagation de l'emballement thermique et apporte une protection passive aux modules batterie.", specs: ["Température de résistance au feu ≥ 1200°C", "Temps de résistance au feu > 180 min", "Température de service -60°C à 200°C", "Faible fumée, sans halogène, non toxique", "Certification UL9540A"] },
        { title: "Système d'étanchéité coupe-feu pour le bâtiment", tag: "Construction", desc: "L'association de bandes silicone résistantes au feu et de mastics intumescents répond aux exigences de GB 50016 pour garantir l'intégrité au feu des traversées et joints de dilatation.", specs: ["Température de résistance au feu > 1200°C", "Temps de résistance au feu > 180 min", "Densité de fumée (transmission lumineuse) > 70 %", "Sans halogène et non toxique"] },
        { title: "Solution ignifuge pour le ferroviaire", tag: "Transport ferroviaire", desc: "Une gamme complète de matériaux d'étanchéité résistants au feu et ignifuges pour métros et trains à grande vitesse, certifiée EN 45545-2 HL3. Faible fumée et faible toxicité améliorent la sécurité d'évacuation en cas d'incendie.", specs: ["Conforme EN 45545-2 HL3", "Émission de CO < 600 ppm", "Densité de fumée < 210 (Ds)", "Indice d'oxygène LOI ⩾ 30 %", "Indice de toxicité CITNLP 0.056"] },
        { title: "Calfeutrement coupe-feu des traversées de câbles", tag: "Centre de données / Énergie", desc: "Un système combinant blocs coupe-feu en silicone et mastic coupe-feu pour les traversées de câbles dans les centres de données, postes électriques et sites industriels, afin d'empêcher la propagation des flammes par les cheminements de câbles.", specs: ["Intégrité au feu E120", "Conforme IEC 60331", "Structure auto-compensante d'étanchéité", "Installation simple et maintenance aisée"] },
        { title: "Protection incendie nucléaire et marine", tag: "Nucléaire / Offshore", desc: "Des joints silicone spéciaux répondant aux exigences de résistance au feu du secteur nucléaire et présentant une excellente tenue au vieillissement sous irradiation, ainsi que des systèmes d'étanchéité coupe-feu pour applications marines certifiés CCS.", specs: ["Certification CCS", "Dose d'irradiation ≥ 10 MGy", "Résistance au brouillard salin ≥ 1000 h", "Système qualité ASME NQA-1"] },
        { title: "Isolation thermique et protection haute température", tag: "Aviation / Industrie", desc: "Le silicone expansé isolant de grade aérospatial offre une excellente isolation thermique pour les nacelles moteurs, fours industriels et tuyauteries à haute température, réduisant les pertes d'énergie tout en protégeant les structures environnantes.", specs: ["Conductivité thermique ≤ 0,07 W/m·K", "Température max. +300°C", "Faible dégazage (ASTM E595)", "Léger · Hydrofuge · Résistant aux vibrations"] },
      ],
      standardsEyebrow: "Normes et certifications",
      standardsTitle: "Alignement normatif et support certification",
      standardsLead: "Un accompagnement concret autour des normes, réglementations et méthodes d'essai clés.",
      standards: [
        { std: "GB 8624", scope: "Classe A de réaction au feu des matériaux de construction" },
        { std: "EN 45545-2 HL3", scope: "Niveau le plus élevé de sécurité incendie pour le ferroviaire" },
        { std: "IEC 60331", scope: "Intégrité au feu des câbles" },
        { std: "UL94 V-0", scope: "Classement de combustion verticale" },
        { std: "ASTM E595", scope: "Exigence aérospatiale de faible dégazage" },
        { std: "CCS", scope: "Certification marine d'étanchéité coupe-feu" },
      ],
    },
    industryDetailLabels: { challenge: "Défis techniques", solution: "Solution DELESUN", cases: "Cas d'application typiques", products: "Produits clés" },
    industryDetail: FALLBACK_INDUSTRY_DETAIL_FR,
    newsDetail: {
      paras: [
        "DELESUN continue de faire progresser l'innovation grâce à un investissement soutenu en R&D, en élargissant les frontières de ses produits autour de sa plateforme technologique silicone pour développer des solutions hautes performances adaptées aux industries du futur.",
        "À l'avenir, l'entreprise poursuivra son développement dans les nouvelles énergies, l'aérospatial, les semi-conducteurs et d'autres secteurs stratégiques, en coopération avec des partenaires mondiaux, afin de contribuer à des systèmes énergétiques et industriels plus sûrs et plus efficaces.",
      ],
    },
    careersPage: {
      benefits: [
        { label: "Rémunération attractive", desc: "Un package compétitif sur le marché complété par des primes de performance" },
        { label: "Évolution de carrière lisible", desc: "Des parcours de progression clairs, en filières management comme technique" },
        { label: "Culture collaborative", desc: "Une équipe ouverte et coopérative réunissant des talents de haut niveau" },
      ],
      openPositions: "Postes ouverts",
    },
    contactPage: {
      tagline: "Nos équipes sont à votre écoute pour étudier votre besoin et construire une coopération durable.",
      contactTitle: "Parlons de votre projet",
      mapCompany: "DELESUN (Shanghai)",
      mapDistrict: "Bourg de Zhelin, district de Fengxian, Shanghai",
      mapAddressTitle: "Adresse de navigation",
      mapAddressDesc: "Ouvrez directement la destination et l'itinéraire dans Amap, Baidu Maps ou Google Maps.",
      mapActions: { amap: "Amap", baidu: "Baidu Maps", google: "Google Maps" },
      formTitle: "Décrivez votre besoin",
      placeholders: ["Nom", "Entreprise", "E-mail professionnel", "Téléphone"],
      messagePlaceholder: "Précisez votre application, les contraintes techniques, les certifications visées et le calendrier souhaité...",
      send: "Envoyer",
      wechatTitle: "Scannez pour suivre notre compte officiel ou accéder au mini-programme DELESUN",
      wechatSub: "",
      wechatCards: [
        { title: "Compte officiel", desc: "Actualités et contenus techniques DELESUN", hint: "" },
        { title: "Mini-programme", desc: "Accès rapide aux produits et informations DELESUN", hint: "" },
      ],
      officesEyebrow: "Réseau de bureaux",
      officesTitle: "Nos bureaux",
      offices: [
        { city: "Shanghai (siège)", addr: "539 Kegong Rd, district de Fengxian", tel: "+86-21-57500371", role: "Siège · R&D · Ventes" },
        { city: "Suzhou (site industriel)", addr: "32 Industrial Park Rd, district de Wuzhong", tel: "+86 512 6598 8800", role: "Production · Qualité" },
        { city: "New York, États-Unis (bureau commercial)", addr: "100 CHURCH ST 8TH FLOOR, NEW YORK, NY, UNITED STATES, 10007", tel: "+1 917-855-3758", role: "Bureau commercial" },
      ],
    },
    footer: { navHeading: "Navigation", productsHeading: "Produits", contactHeading: "Nous contacter" },
    learnMore: "En savoir plus",
    backHome: "Retour à l'accueil",
    footerTagline: "La technologie crée de la valeur, la qualité construit l'avenir",
    address: "539 Kegong Road, district de Fengxian, Shanghai, Chine",
    email: "sale@delesungp.com",
    phone: "+86 21-5750-0371",
    copyright: "© 2026 DELESUN New Materials (Shanghai) Co., Ltd. Tous droits réservés.",
  },
} as const;

type Dict = (typeof FALLBACK_TRANSLATIONS)[Lang];

const CUSTOMER_SERVICE = {
  zh: {
    button: "在线客服",
    title: "在线客服",
    subtitle: "产品咨询、认证测试与样品申请",
    status: "当前可快速响应",
    welcome: "您好，欢迎咨询旭创新材料。您可以先选择常见问题，或直接发送需求。",
    prompts: [
      { label: "产品选型", reply: "请告诉我们应用场景、耐温要求、阻燃等级和厚度需求，我们可快速推荐对应材料。" },
      { label: "认证测试", reply: "可咨询 UL9540A、UL94 V-0、REACH、EN 45545 等相关测试与认证支持。" },
      { label: "样品申请", reply: "发送您的公司名称、应用方向和样品规格后，我们可安排样品对接。" },
    ],
    actions: { phone: "电话咨询", email: "邮件咨询", contact: "联系页面" },
    placeholder: "请输入您的需求，例如：储能项目防火隔热板材选型",
    send: "发送咨询",
    empty: "请先输入咨询内容。",
    ack: "已为您准备邮件咨询入口，您也可以直接电话联系，或进入联系我们页面继续沟通。",
    mailSubject: "官网在线客服咨询",
  },
  en: {
    button: "Support",
    title: "Online Support",
    subtitle: "Product consultation, certifications, and samples",
    status: "Fast response available",
    welcome: "Welcome to DELESUN. Choose a common topic or send us your request directly.",
    prompts: [
      { label: "Product Match", reply: "Please share the application, temperature range, fire rating, and thickness requirement so we can recommend the right material." },
      { label: "Certifications", reply: "We can support inquiries related to UL9540A, UL94 V-0, REACH, EN 45545, and other testing requirements." },
      { label: "Sample Request", reply: "Send your company name, application details, and sample specifications, and we will coordinate sample support." },
    ],
    actions: { phone: "Call", email: "Email", contact: "Contact Page" },
    placeholder: "Type your request, e.g. fire-resistant sheet for ESS cabinet",
    send: "Send",
    empty: "Please enter your message first.",
    ack: "The email consultation entry is ready for you. You can also call us directly or open the contact page for follow-up.",
    mailSubject: "Website Support Inquiry",
  },
  es: {
    button: "Soporte",
    title: "Atención en Línea",
    subtitle: "Consulta de productos, certificaciones y muestras",
    status: "Respuesta rápida disponible",
    welcome: "Bienvenido a DELESUN. Puede elegir una consulta frecuente o enviarnos su necesidad directamente.",
    prompts: [
      { label: "Selección de Producto", reply: "Indíquenos la aplicación, la temperatura, el nivel ignífugo y el espesor requerido para recomendar el material adecuado." },
      { label: "Certificaciones", reply: "Podemos ayudar con consultas sobre UL9540A, UL94 V-0, REACH, EN 45545 y otros requisitos de ensayo." },
      { label: "Solicitud de Muestra", reply: "Envíenos el nombre de su empresa, la aplicación y la especificación de la muestra para coordinar el soporte." },
    ],
    actions: { phone: "Llamar", email: "Correo", contact: "Página de Contacto" },
    placeholder: "Escriba su necesidad, por ejemplo: láminas ignífugas para un gabinete ESS",
    send: "Enviar",
    empty: "Escriba primero su consulta.",
    ack: "La consulta por correo ya está lista. También puede llamarnos o abrir la página de contacto para continuar.",
    mailSubject: "Consulta desde el sitio web",
  },
  fr: {
    button: "Support",
    title: "Support en ligne",
    subtitle: "Conseil produit, certifications et échantillons",
    status: "Réponse rapide disponible",
    welcome: "Bienvenue chez DELESUN. Vous pouvez choisir un sujet fréquent ou nous envoyer directement votre demande.",
    prompts: [
      { label: "Choix produit", reply: "Merci de nous indiquer l'application, la plage de température, le niveau de résistance au feu et l'épaisseur souhaitée afin que nous puissions recommander le matériau adapté." },
      { label: "Certifications", reply: "Nous pouvons vous accompagner sur les sujets UL9540A, UL94 V-0, REACH, EN 45545 et autres exigences d'essais ou de certification." },
      { label: "Demande d'échantillon", reply: "Envoyez le nom de votre société, le contexte d'application et les spécifications de l'échantillon, et nous organiserons le support correspondant." },
    ],
    actions: { phone: "Appeler", email: "E-mail", contact: "Page contact" },
    placeholder: "Décrivez votre besoin, par ex. : plaque coupe-feu pour armoire ESS",
    send: "Envoyer",
    empty: "Merci de saisir votre message.",
    ack: "L'entrée de contact par e-mail est prête. Vous pouvez aussi nous appeler directement ou ouvrir la page contact pour poursuivre l'échange.",
    mailSubject: "Demande envoyée depuis le site web",
  },
} as const;

function applyRuntimeSecurityHardening() {
  try {
    window.name = "";
  } catch {}

  if (window.top && window.top !== window.self) {
    try {
      window.top.location.href = window.location.href;
    } catch {
      document.documentElement.style.display = "none";
    }
  }

  document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((link) => {
    const rel = new Set((link.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", Array.from(rel).join(" "));
  });
}

// ─── Static data ──────────────────────────────────────────────────────────────

const FALLBACK_PARTNER_LOGO_BY_NAME: Record<string, string> = {
  PRYSMIAN: new URL("../../LOGO/optimized/PRYSMIAN.png", import.meta.url).href,
  NEXANS: new URL("../../LOGO/optimized/NEXANS.png", import.meta.url).href,
  宝胜: new URL("../../LOGO/宝胜.png", import.meta.url).href,
  上上电缆: new URL("../../LOGO/optimized/上上电缆.png", import.meta.url).href,
  LEONI: new URL("../../LOGO/delesun/LEONI.jpg", import.meta.url).href,
  MICHELIN: new URL("../../LOGO/optimized/MICHELIN.png", import.meta.url).href,
  福斯集团: new URL("../../LOGO/optimized/福斯集团.png", import.meta.url).href,
  MEIJI: new URL("../../LOGO/optimized/MEIJI.png", import.meta.url).href,
  "SAND PROFILE": new URL("../../LOGO/optimized/SAND PROFILE.png", import.meta.url).href,
  HRS: new URL("../../LOGO/optimized/HRS.png", import.meta.url).href,
  "KROMBERG & SCHUBERT": new URL("../../LOGO/KROMBERG & SCHUBERT.jpg", import.meta.url).href,
  "ANGST+PFISTER": new URL("../../LOGO/optimized/ANGST+PFISTER.png", import.meta.url).href,
  NOLATO: new URL("../../LOGO/optimized/NOLATO.png", import.meta.url).href,
  COFICAB: new URL("../../LOGO/optimized/COFICAB.png", import.meta.url).href,
  "BELLOFRAM ELASTOMERS": new URL("../../LOGO/optimized/BELLOFRAM ELASTOMERS.png", import.meta.url).href,
};

const FALLBACK_PARTNERS = [
  { name: "PRYSMIAN", domain: "prysmian.com" },
  { name: "NEXANS", domain: "nexans.com" },
  { name: "宝胜", domain: "baoshengcable.com" },
  { name: "上上电缆", domain: "shangshang.com" },
  { name: "LEONI", domain: "leoni.com" },
  { name: "MICHELIN", domain: "michelin.com" },
  { name: "福斯集团", domain: "forcegroup.cn" },
  { name: "MEIJI", domain: "meiji.com" },
  { name: "SAND PROFILE", domain: "sandprofile.com" },
  { name: "HRS", domain: "hirose.com" },
  { name: "KROMBERG & SCHUBERT", domain: "kroschu.com" },
  { name: "ANGST+PFISTER", domain: "angst-pfister.com" },
  { name: "NOLATO", domain: "nolato.com" },
  { name: "COFICAB", domain: "coficab.com" },
  { name: "BELLOFRAM ELASTOMERS", domain: "belloframelastomers.com" },
].map((item) => ({
  ...item,
  logo: FALLBACK_PARTNER_LOGO_BY_NAME[item.name] ?? brandLogoAsset,
}));

const WECHAT_QR_PATHS = [
  new URL("../../微信服务/公众号.jpg", import.meta.url).href,
  new URL("../../微信服务/小程序.png", import.meta.url).href,
] as const;

const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Zap, Atom, Cpu, Bot, Rocket: ({ className, size }) => (
    <svg viewBox="0 0 24 24" width={size ?? 24} height={size ?? 24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Shield,
  Gauge,
  Layers,
  Flame,
  TrendingUp,
};

type ProductItem = (typeof FALLBACK_PRODUCT_DATA)[number];

const PRODUCT_DATA = FALLBACK_PRODUCT_DATA;
const HERO_SLIDE_VISUALS = FALLBACK_HERO_SLIDE_VISUALS;
const DIVISION_VISUALS = FALLBACK_DIVISION_VISUALS;
const INDUSTRY_VISUALS = FALLBACK_INDUSTRY_VISUALS;
const NEWS_VISUALS = FALLBACK_NEWS_VISUALS;
const INDUSTRY_DETAIL_ZH = FALLBACK_INDUSTRY_DETAIL_ZH;
const INDUSTRY_DETAIL_EN = FALLBACK_INDUSTRY_DETAIL_EN;
const INDUSTRY_DETAIL_ES = FALLBACK_INDUSTRY_DETAIL_ES;
const INDUSTRY_DETAIL_FR = FALLBACK_INDUSTRY_DETAIL_FR;
const PARTNERS = FALLBACK_PARTNERS ?? [];

const TRANSLATIONS = FALLBACK_TRANSLATIONS as Record<Lang, any>;
const T = TRANSLATIONS;

let products: ProductItem[] = FALLBACK_PRODUCT_DATA;
let articles: any[] = [];
let partnersList: any[] = PARTNERS;
let openings: any[] = [];
let translations: Record<Lang, any> = TRANSLATIONS;
let industryDetails = {
  zh: INDUSTRY_DETAIL_ZH,
  en: INDUSTRY_DETAIL_EN,
  es: INDUSTRY_DETAIL_ES,
  fr: INDUSTRY_DETAIL_FR,
};
let t: any = TRANSLATIONS.zh;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v) && Object.prototype.toString.call(v) === "[object Object]";

const deepMerge = <B, P>(base: B, patch: P): B & P => {
  if (patch === undefined || patch === null) return base as B & P;
  if (Array.isArray(patch)) return patch as unknown as B & P;
  if (!isPlainObject(patch) || !isPlainObject(base)) return patch as unknown as B & P;
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(patch)) {
    const pv = (patch as Record<string, unknown>)[key];
    const bv = (base as unknown as Record<string, unknown>)[key];
    result[key] = isPlainObject(pv) && isPlainObject(bv) ? deepMerge(bv, pv) : pv;
  }
  return result as B & P;
};

const PRODUCT_VISUALS = {
  "防火硅橡胶": fireSiliconeImg,
  "导热硅胶": thermalSiliconeImg,
  "耐高温硅胶": highTempSiliconeImg,
  "发泡硅橡胶": foamSiliconeImg,
  "阻燃硅橡胶": flameRetardantSiliconeImg,
  "耐油硅橡胶": oilResistantSiliconeImg,
  "隔热硅橡胶": insulationSiliconeImg,
  "隔热涂层": insulationCoatingImg,
  "隔热发泡涂层": insulationFoamCoatingImg,
  "低压变硅橡胶": lowCompressionSiliconeImg,
  "高强度硅橡胶": highStrengthSiliconeImg,
  "耐热剂": heatAgentImg,
} as const;

const getProductVisual = (product: ProductItem) =>
  PRODUCT_VISUALS[product.name as keyof typeof PRODUCT_VISUALS] ?? materialsImg;

const isCoatingVisual = (product: { name: string }) => product.name === "隔热涂层";

const getProductVisualFit = (product: { name: string }) =>
  isCoatingVisual(product) ? "contain" : "cover";

const getProductVisualFrameClass = (product: { name: string }) =>
  isCoatingVisual(product) ? "bg-white" : "bg-[#F5F7FB]";

const getProductVisualImgClass = (product: { name: string }, withHoverZoom: boolean) => {
  const fit = getProductVisualFit(product);
  if (fit === "contain") return "w-full h-full object-contain";
  return `w-full h-full object-cover${withHoverZoom ? " group-hover:scale-105 transition-transform duration-500" : ""}`;
};

const MAP_NAV_ADDRESS: Record<Lang, string> = {
  zh: "中国·上海市奉贤区科工路539号",
  en: "No. 539 Kegong Road, Fengxian District, Shanghai, China",
  es: "No. 539, Kegong Road, distrito de Fengxian, Shanghái, China",
  fr: "539 Kegong Road, district de Fengxian, Shanghai, Chine",
};
const MAP_NAV_LINKS = {
  amap: `https://uri.amap.com/search?keyword=${encodeURIComponent(MAP_NAV_ADDRESS.zh)}&src=DELESUN&callnative=1`,
  baidu: `https://map.baidu.com/search/${encodeURIComponent(MAP_NAV_ADDRESS.zh)}`,
  google: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_NAV_ADDRESS.zh)}&travelmode=driving`,
} as const;

const SEARCH_HISTORY_KEY = "ds_search_history_v1";

function buildSearchIndex(t: Dict, lang: Lang, products: ProductItem[], articles: any[]): SearchResultItem[] {
  const pageItems: SearchResultItem[] = [
    {
      id: "page-home",
      type: "page",
      title: t.nav.home,
      subtitle: t.hero.desc,
      keywords: [t.nav.home, t.hero.title, t.hero.sub, t.hero.desc].join(" "),
      navigateTo: { page: "home" },
    },
    {
      id: "page-about",
      type: "page",
      title: t.nav.about,
      subtitle: t.aboutFull,
      keywords: [t.nav.about, t.aboutFull, t.aboutPage.hero.lead, t.aboutPage.hero.summary].join(" "),
      navigateTo: { page: "about" },
    },
    {
      id: "page-products",
      type: "page",
      title: t.nav.products,
      subtitle: t.materialsPage.desc,
      keywords: [t.nav.products, t.materialsPage.title, t.materialsPage.desc].join(" "),
      navigateTo: { page: "materials" },
    },
    {
      id: "page-fire",
      type: "page",
      title: t.nav.solutions,
      subtitle: t.divisions[1].desc,
      keywords: [t.nav.solutions, t.divisions[1].title, t.divisions[1].desc, t.fireSafetyPage.solutionsTitle].join(" "),
      navigateTo: { page: "fire" },
    },
    {
      id: "page-industries",
      type: "page",
      title: t.nav.industries,
      subtitle: t.indSub,
      keywords: [t.nav.industries, t.indTitle, t.indSub].join(" "),
      navigateTo: { page: "industries" },
    },
    {
      id: "page-news",
      type: "page",
      title: t.nav.news,
      subtitle: t.newsSub,
      keywords: [t.nav.news, t.newsTitle, t.newsSub].join(" "),
      navigateTo: { page: "news" },
    },
    {
      id: "page-careers",
      type: "page",
      title: t.nav.careers,
      subtitle: t.careersSub,
      keywords: [t.nav.careers, t.careersTitle, t.careersSub].join(" "),
      navigateTo: { page: "careers" },
    },
    {
      id: "page-contact",
      type: "page",
      title: t.nav.contact,
      subtitle: t.contactPage.tagline,
      keywords: [t.nav.contact, t.contactPage.contactTitle, t.contactPage.tagline, t.address, t.email, t.phone].join(" "),
      navigateTo: { page: "contact" },
    },
  ];

  const productItems: SearchResultItem[] = products.map((p, idx) => {
    const name = lang === "zh" ? p.name : lang === "en" ? p.nameEn : lang === "es" ? p.nameEs : p.nameFr;
    const desc = lang === "zh" ? p.desc : lang === "en" ? p.descEn : lang === "es" ? p.descEs : p.descFr;
    return {
      id: `product-${idx}`,
      type: "product",
      title: name,
      subtitle: desc,
      keywords: [
        p.name,
        p.nameEn,
        p.nameEs,
        p.nameFr,
        p.desc,
        p.descEn,
        p.descEs,
        p.descFr,
        p.spec,
        p.specEn,
        p.specEs,
        p.specFr,
        ...p.apps,
        ...p.appsEn,
        ...p.appsEs,
        ...p.appsFr,
      ].join(" "),
      navigateTo: { page: "materials", productIdx: idx },
    };
  });

  const industryItems: SearchResultItem[] = t.industries.map((ind: Dict["industries"][number], idx: number) => ({
    id: `industry-${idx}`,
    type: "industry" as const,
    title: ind.title,
    subtitle: ind.desc,
    keywords: [ind.title, ind.desc, t.indTitle, t.indSub].join(" "),
    navigateTo: { page: "industries" as const, industryIdx: idx },
  }));

  const articleItems: SearchResultItem[] = articles.map((article: Dict["articles"][number], idx: number) => ({
    id: `article-${idx}`,
    type: "article" as const,
    title: article.title,
    subtitle: article.desc,
    keywords: [article.title, article.tag, article.desc, article.date].join(" "),
    navigateTo: { page: "news" as const, articleIdx: idx },
  }));

  return [...pageItems, ...productItems, ...industryItems, ...articleItems];
}

// ─── Launch Intro ─────────────────────────────────────────────────────────────

function LaunchIntro({ onComplete, companyFull, tagline, lang }: { onComplete: () => void; companyFull: string; tagline: string; lang: Lang }) {
  // 0=hidden | 1=content in | 2=fade out
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(onComplete, 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
      animate={{ opacity: phase >= 2 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 16 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <img
          src={pickLogo(false, lang)}
          alt="DELESUN"
          style={{ height: 72, width: "auto", objectFit: "contain" }}
        />
        <div className="w-12 h-[2px] bg-[#C8102E] rounded-full mt-6 mb-5" />
        <div className="text-sm text-gray-400 tracking-[0.22em]" style={MF}>
          {companyFull}
        </div>
        <div className="text-[11px] text-gray-300 tracking-[0.3em] uppercase mt-2" style={MF}>
          {tagline}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Fonts / style utils ──────────────────────────────────────────────────────

const HF = { fontFamily: "'Rajdhani', 'Noto Sans SC', sans-serif" };
const BF = { fontFamily: "'DM Sans', 'Noto Sans SC', sans-serif" };
const MF = { fontFamily: "'JetBrains Mono', monospace" };

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  lang, setLang, nav, searchCopy, searchIndex, onNavigate, currentPage,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  nav: Dict["nav"];
  searchCopy: Dict["search"];
  searchIndex: SearchResultItem[];
  onNavigate: (p: NavState) => void;
  currentPage: PageKey;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    let frameId = 0;
    const updateScrolled = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
      frameId = 0;
    };
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateScrolled);
    };
    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const links: { label: string; page: PageKey }[] = [
    { label: nav.home, page: "home" },
    { label: nav.about, page: "about" },
    { label: nav.products, page: "materials" },
    { label: nav.solutions, page: "fire" },
    { label: nav.industries, page: "industries" },
    { label: nav.news, page: "news" },
    { label: nav.careers, page: "careers" },
  ];

  const LANGS: Lang[] = ["zh", "en", "es", "fr"];
  const LANG_LABEL: Record<Lang, string> = { zh: "中文", en: "EN", es: "ES", fr: "FR" };
  const navbarLayout: Record<Lang, {
    shellGap: string;
    leftGap: string;
    navGap: string;
    rightGap: string;
    searchButton: string;
    langButton: string;
    contactButton: string;
  }> = {
    zh: {
      shellGap: "gap-4 lg:gap-5",
      leftGap: "gap-10 lg:gap-13 xl:gap-[64px]",
      navGap: "flex-1 justify-between gap-6 max-w-[740px] 2xl:max-w-[820px] pr-2",
      rightGap: "gap-3 md:gap-4 xl:gap-5",
      searchButton: "min-w-[132px] px-5",
      langButton: "min-w-[88px] px-4",
      contactButton: "hidden xl:flex min-w-[132px] px-5",
    },
    en: {
      shellGap: "gap-4 lg:gap-5",
      leftGap: "gap-9 lg:gap-12 xl:gap-[58px]",
      navGap: "flex-1 justify-between gap-6 max-w-[780px] 2xl:max-w-[860px] pr-2",
      rightGap: "gap-3 md:gap-3.5 xl:gap-4",
      searchButton: "min-w-[124px] px-4",
      langButton: "min-w-[84px] px-3.5",
      contactButton: "hidden xl:flex min-w-[128px] px-5",
    },
    es: {
      shellGap: "gap-3 lg:gap-4",
      leftGap: "gap-8 lg:gap-10 xl:gap-[52px]",
      navGap: "flex-1 justify-between gap-4 max-w-[860px] 2xl:max-w-[940px] pr-1",
      rightGap: "gap-2.5 md:gap-3 xl:gap-3.5",
      searchButton: "min-w-[118px] px-4",
      langButton: "min-w-[80px] px-3",
      contactButton: "hidden xl:flex min-w-[120px] px-4.5",
    },
    fr: {
      shellGap: "gap-3 lg:gap-4",
      leftGap: "gap-8 lg:gap-10 xl:gap-[52px]",
      navGap: "flex-1 justify-between gap-4 max-w-[840px] 2xl:max-w-[920px] pr-1",
      rightGap: "gap-2.5 md:gap-3 xl:gap-3.5",
      searchButton: "min-w-[126px] px-4",
      langButton: "min-w-[80px] px-3",
      contactButton: "hidden xl:flex min-w-[116px] px-4.5",
    },
  };
  const layout = navbarLayout[lang];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
      setHistory(raw ? JSON.parse(raw) : []);
    } catch {
      setHistory([]);
    }
  }, []);

  const persistHistory = useCallback((items: string[]) => {
    setHistory(items);
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, []);

  const saveSearchRecord = useCallback((keyword: string) => {
    const clean = keyword.trim();
    if (!clean) return;
    const next = [clean, ...history.filter((item) => item !== clean)].slice(0, 8);
    persistHistory(next);
  }, [history, persistHistory]);

  const removeHistory = useCallback((keyword: string) => {
    persistHistory(history.filter((item) => item !== keyword));
  }, [history, persistHistory]);

  const clearHistory = useCallback(() => {
    persistHistory([]);
  }, [persistHistory]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchIndex
      .filter((item) => `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery, searchIndex]);

  const openWithHistoryKeyword = useCallback((keyword: string) => {
    setQuery(keyword);
  }, []);

  const handleSearchNavigate = useCallback((item: SearchResultItem, keyword?: string) => {
    saveSearchRecord(keyword ?? item.title);
    onNavigate(item.navigateTo);
    setSearchOpen(false);
    setQuery("");
  }, [onNavigate, saveSearchRecord]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/94 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,31,61,0.08)] border-b border-black/6"
          : "bg-white/76 backdrop-blur-md border-b border-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className={`flex items-center justify-between ${layout.shellGap}`} style={{ height: 76 }}>
          <div className={`flex min-w-0 flex-1 items-center ${layout.leftGap}`}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center w-[128px]">
              <ImageWithFallback src={pickLogo(false, lang)} alt="DELESUN" className="h-10 w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
            </div>

            {/* Desktop nav */}
            <div className={`hidden xl:flex min-w-0 items-center ${layout.navGap}`}>
              {links.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => onNavigate({ page, industryIdx: null, articleIdx: null })}
                  className={`text-sm font-medium tracking-[0.03em] transition-colors duration-200 relative group whitespace-nowrap ${
                    currentPage === page ? "text-[#C8102E]" : "text-gray-600 hover:text-[#1B2F5E]"
                  }`}
                  style={BF}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#C8102E] transition-all duration-300 ${currentPage === page ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={`flex flex-shrink-0 items-center ${layout.rightGap}`}>
            <div className="relative hidden xl:block flex-shrink-0">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className={`flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/8 bg-white/80 text-sm text-gray-500 hover:text-[#1B2F5E] hover:border-[#1B2F5E]/15 transition-colors ${layout.searchButton}`}
                style={BF}
              >
                <Search size={14} />
                <span>{searchCopy.open}</span>
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-3 w-[420px] rounded-2xl border border-black/8 bg-white shadow-[0_24px_60px_rgba(15,31,61,0.16)] overflow-hidden">
                  <div className="p-4 border-b border-black/6">
                    <div className="flex items-center gap-3 rounded-xl border border-black/8 bg-[#F8FAFF] px-4 py-3">
                      <Search size={16} className="text-gray-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={searchCopy.placeholder}
                        className="w-full bg-transparent outline-none text-sm text-[#1B2F5E] placeholder:text-gray-400"
                        style={BF}
                      />
                    </div>
                  </div>

                  {!normalizedQuery && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-400 uppercase tracking-[0.22em]" style={MF}>{searchCopy.historyTitle}</div>
                        {history.length > 0 && (
                          <button onClick={clearHistory} className="text-xs text-[#C8102E] hover:text-[#A80D25]" style={MF}>
                            {searchCopy.clearAll}
                          </button>
                        )}
                      </div>
                      {history.length === 0 ? (
                        <div className="text-sm text-gray-400 py-6">{searchCopy.empty}</div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {history.map((item) => (
                            <div key={item} className="flex items-center justify-between gap-3 rounded-xl border border-black/6 px-4 py-3 hover:border-[#1B2F5E]/15 transition-colors">
                              <button onClick={() => openWithHistoryKeyword(item)} className="flex items-center gap-3 min-w-0 text-left flex-1">
                                <History size={14} className="text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-[#1B2F5E] truncate">{item}</span>
                              </button>
                              <button onClick={() => removeHistory(item)} className="text-gray-400 hover:text-[#C8102E] transition-colors" title={searchCopy.deleteOne}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {normalizedQuery && (
                    <div className="p-4">
                      <div className="text-xs text-gray-400 uppercase tracking-[0.22em] mb-3" style={MF}>{searchCopy.resultTitle}</div>
                      {results.length === 0 ? (
                        <div className="text-sm text-gray-400 py-6">{searchCopy.noResult}</div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {results.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSearchNavigate(item, query)}
                              className="text-left rounded-xl border border-black/6 px-4 py-3 hover:border-[#1B2F5E]/15 hover:bg-[#F8FAFF] transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B2F5E]/8 text-[#1B2F5E]" style={MF}>
                                  {searchCopy.resultLabels[item.type]}
                                </span>
                              </div>
                              <div className="text-sm font-semibold text-[#1B2F5E] mb-1" style={HF}>{item.title}</div>
                              <div className="text-xs text-gray-500 line-clamp-2">{item.subtitle}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={`flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent text-sm text-gray-500 transition-colors hover:bg-[#1B2F5E]/5 hover:text-[#1B2F5E] hover:border-[#1B2F5E]/8 ${layout.langButton}`}
              >
                <Globe size={14} />
                <span style={MF} className="text-xs tracking-wider leading-none">{LANG_LABEL[lang]}</span>
                <ChevronDown size={11} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-black/8 rounded-xl shadow-xl overflow-hidden z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        lang === l ? "text-[#C8102E] bg-red-50/60 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                      style={MF}
                    >
                      {LANG_LABEL[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => onNavigate({ page: "contact", industryIdx: null, articleIdx: null })}
              className={`h-12 flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1B2F5E] text-sm font-semibold text-white transition-all shadow-[0_10px_24px_rgba(27,47,94,0.14)] hover:bg-[#0F1F3D] ${layout.contactButton}`}
              style={HF}
            >
              {nav.contact}
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen((v) => !v)} className="xl:hidden p-2 text-gray-600">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white border-t border-black/5 px-6 pb-6 pt-4 shadow-lg">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-black/8 bg-[#F8FAFF] text-sm text-gray-600 mb-4"
          >
            <Search size={14} />
            {searchCopy.open}
          </button>
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate({ page, industryIdx: null, articleIdx: null }); setMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-[#C8102E] border-b border-black/5 last:border-0 text-sm"
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => { onNavigate({ page: "contact", industryIdx: null, articleIdx: null }); setMenuOpen(false); }}
            className="mt-4 flex w-full items-center justify-center rounded-full bg-[#1B2F5E] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(27,47,94,0.14)]"
            style={HF}
          >
            {nav.contact}
          </button>

          {searchOpen && (
            <div className="mt-4 rounded-xl border border-black/8 bg-white overflow-hidden">
              <div className="p-4 border-b border-black/6">
                <div className="flex items-center gap-3 rounded-xl border border-black/8 bg-[#F8FAFF] px-4 py-3">
                  <Search size={16} className="text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchCopy.placeholder}
                    className="w-full bg-transparent outline-none text-sm text-[#1B2F5E] placeholder:text-gray-400"
                    style={BF}
                  />
                </div>
              </div>
              <div className="p-4">
                {!normalizedQuery && history.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {history.map((item) => (
                      <button
                        key={item}
                        onClick={() => openWithHistoryKeyword(item)}
                        className="px-3 py-1.5 rounded-full text-xs border border-black/8 text-gray-500 bg-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
                {normalizedQuery && (
                  <div className="flex flex-col gap-2">
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { handleSearchNavigate(item, query); setMenuOpen(false); }}
                        className="text-left rounded-xl border border-black/6 px-4 py-3 hover:border-[#1B2F5E]/15"
                      >
                        <div className="text-sm font-semibold text-[#1B2F5E]" style={HF}>{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
                      </button>
                    ))}
                    {results.length === 0 && <div className="text-sm text-gray-400">{searchCopy.noResult}</div>}
                  </div>
                )}
                {!normalizedQuery && history.length === 0 && <div className="text-sm text-gray-400">{searchCopy.empty}</div>}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// ─── PageShell ────────────────────────────────────────────────────────────────

function PageShell({ children, onBack, backLabel }: { children: React.ReactNode; onBack: () => void; backLabel: string }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C8102E] transition-colors group" style={MF}>
          <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="tracking-wider uppercase text-xs">{backLabel}</span>
        </button>
      </div>
      {children}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ t, lang, onNavigate, partnersList, articles }: { t: Dict; lang: Lang; onNavigate: (s: NavState) => void; partnersList: any[]; articles: any[] }) {
  const go = (page: PageKey) => onNavigate({ page, industryIdx: null, articleIdx: null });
  const homeIndustryDescClass = {
    zh: "text-[15px] text-[#6C788A] leading-[1.85] mb-5 min-h-[84px] line-clamp-3",
    en: "text-[15px] text-[#6C788A] leading-[1.9] mb-5 min-h-[104px] line-clamp-4",
    es: "text-[15px] text-[#6C788A] leading-[1.92] mb-5 min-h-[120px] line-clamp-4",
    fr: "text-[15px] text-[#6C788A] leading-[1.92] mb-5 min-h-[120px] line-clamp-4",
  } as const;

  const HERO_SLIDES = t.hero.slides;

  const [active, setActive] = useState(0);
  const INTERVAL = 4000;

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % HERO_SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <div>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F7F9FC] overflow-hidden" style={{ paddingTop: 76, minHeight: "100vh" }}>
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 76px)" }}>

          {/* LEFT: Text content */}
          <div className="relative z-10 flex flex-col justify-center px-8 lg:px-14 xl:px-18 py-14 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] border-r border-black/5"
            style={{ flex: "0 0 50%", maxWidth: "50%" }}>

            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle, rgba(27,47,94,0.05) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }} />

            <div className="relative max-w-[620px] ml-auto mr-auto lg:mr-0">
              {/* Industry label — rotates */}
              <AnimatePresence mode="wait">
                <motion.div key={slide.id + "_en"}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3 mb-7">
                  <span className="w-8 h-px bg-[#C8102E]" />
                  <span className="text-xs tracking-[0.28em] text-[#C8102E] font-semibold" style={MF}>{slide.eyebrow}</span>
                </motion.div>
              </AnimatePresence>

              {/* Static first line */}
              <h1 style={{ ...HF, lineHeight: 0.92 }}>
                <span className="block font-black text-[#1B2F5E] mb-1.5" style={{ fontSize: "clamp(42px, 4.5vw, 72px)" }}>
                  {t.hero.headline1}
                </span>
                <span className="block font-black text-[#1B2F5E] mb-2.5" style={{ fontSize: "clamp(42px, 4.5vw, 72px)" }}>
                  {t.hero.headline2}
                </span>
                {/* Animated industry name */}
                <AnimatePresence mode="wait">
                  <motion.span key={slide.id}
                    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="block font-black text-[#C8102E]"
                    style={{ fontSize: "clamp(42px, 4.5vw, 72px)" }}>
                    {slide.label}
                  </motion.span>
                </AnimatePresence>
              </h1>

              {/* Animated description */}
              <AnimatePresence mode="wait">
                <motion.p key={slide.id + "_desc"}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[#6C788A] leading-[1.9] mt-8 mb-10 max-w-2xl" style={{ fontSize: 16 }}>
                  {slide.desc}
                </motion.p>
              </AnimatePresence>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => go("materials")}
                  className="flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A80D25] text-white font-bold text-sm rounded-full transition-all shadow-[0_12px_26px_rgba(200,16,46,0.16)] hover:-translate-y-0.5"
                  style={HF}>
                  {t.hero.cta1} <ArrowRight size={16} />
                </button>
                <button onClick={() => go("about")}
                  className="flex items-center gap-2 px-7 py-3.5 border border-[#1B2F5E]/16 bg-white text-[#1B2F5E] font-bold text-sm rounded-full hover:border-[#1B2F5E]/35 hover:bg-[#1B2F5E]/4 transition-all shadow-[0_8px_20px_rgba(27,47,94,0.04)]"
                  style={HF}>
                  {t.hero.cta2}
                </button>
              </div>

              {/* Industry dots navigator */}
              <div className="flex items-center gap-3">
                {HERO_SLIDES.map((s: Dict["hero"]["slides"][number], i: number) => (
                  <button key={s.id} onClick={() => setActive(i)}
                    className="transition-all duration-300 rounded-full bg-[#1B2F5E]"
                    style={{ opacity: i === active ? 1 : 0.2, height: 6, width: i === active ? 28 : 6 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Crossfading industry photo */}
          <div className="relative flex-1 overflow-hidden" style={{ minHeight: "520px" }}>
            <AnimatePresence>
              {HERO_SLIDES.map((s: Dict["hero"]["slides"][number], i: number) => i === active && (
                <motion.img key={s.id} src={s.photo} alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              ))}
            </AnimatePresence>

            {/* Left-edge blend */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to right, #F8FAFF 0%, rgba(248,250,255,0.72) 16%, transparent 38%)"
            }} />

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
              <motion.div className="h-full bg-white/70"
                key={active}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            </div>

          </div>

        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-black/6 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {t.stats.map((s: Dict["stats"][number], i: number) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="h-full rounded-[24px] border border-[#1B2F5E]/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] px-6 py-7 lg:px-8 lg:py-8 text-center shadow-[0_14px_34px_rgba(27,47,94,0.05)]">
                  <div className="text-4xl lg:text-5xl font-black text-[#1B2F5E] leading-none mb-3" style={HF}>{s.value}</div>
                  <div className="w-8 h-0.5 bg-[#C8102E] mx-auto mb-3" />
                  <div className="text-sm text-gray-500 tracking-[0.08em]" style={BF}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DIVISIONS (full-width alternating) ══════════════════════════════ */}
      {t.divisions.map((div: Dict["divisions"][number], i: number) => {
        const imgSrc = div.key === "materials"
          ? materialsImg
          : "https://images.unsplash.com/photo-1632733711679-529326f6db12?w=1200&h=900&fit=crop&auto=format&q=90";
        const isEven = i % 2 === 0;
        return (
          <section key={div.key} className="border-t border-black/5 overflow-hidden bg-white">
            <div className={`grid lg:grid-cols-2 min-h-[600px]`}>
              {/* Image panel */}
              <div className={`relative overflow-hidden min-h-[360px] lg:min-h-0 ${!isEven ? "lg:order-2" : ""}`}>
                <img src={imgSrc} alt={div.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{
                  background: isEven
                    ? "linear-gradient(to right, rgba(27,47,94,0.12) 0%, transparent 60%)"
                    : "linear-gradient(to left, rgba(27,47,94,0.12) 0%, transparent 60%)"
                }} />
              </div>

              {/* Content panel */}
              <div className={`flex flex-col justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] px-10 lg:px-16 xl:px-24 py-16 ${!isEven ? "lg:order-1" : ""}`}>
                <FadeIn>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-px bg-[#C8102E]" />
                    <span className="text-xs text-[#C8102E] tracking-[0.3em] uppercase" style={MF}>{div.label}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1B2F5E] mb-6 leading-[1.08]" style={HF}>{div.title}</h2>
                  <p className="text-[#6C788A] text-lg leading-[1.9] mb-9 max-w-lg">{div.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {div.tags.map((tag: string) => (
                      <span key={tag} className="px-4 py-1.5 text-sm rounded-full border border-[#1B2F5E]/12 bg-white text-[#1B2F5E]/80 hover:border-[#1B2F5E]/26 transition-colors shadow-[0_6px_16px_rgba(27,47,94,0.03)]">{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => onNavigate({ page: div.key, industryIdx: null, articleIdx: null })}
                    className="inline-flex items-center gap-2 text-[#C8102E] font-bold text-base group self-start px-5 py-3 rounded-full border border-[#C8102E]/16 bg-white hover:bg-[#C8102E]/[0.03] transition-colors" style={HF}
                  >
                    {t.learnMore} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* ══ INDUSTRIES ══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.indTitle}</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t.indSub}</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.industries.map((ind: Dict["industries"][number], i: number) => {
              const Icon = ICONS[ind.icon] ?? Zap;
              return (
                <FadeIn key={ind.title} delay={i * 0.06}>
                  <div
                    onClick={() => onNavigate({ page: "industries", industryIdx: i, articleIdx: null })}
                    className="group bg-white rounded-[24px] overflow-hidden border border-[#1B2F5E]/8 hover:border-[#C8102E]/18 hover:shadow-[0_18px_42px_rgba(15,31,61,0.08)] transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={ind.img}
                        alt={ind.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2.5 text-white">
                          <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-bold" style={HF}>{ind.title}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className={homeIndustryDescClass[lang]}>{ind.desc}</p>
                      <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1" style={MF}>
                        {t.learnMore} <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ NEWS ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-14">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1B2F5E]" style={HF}>{t.newsTitle}</h2>
              </div>
              <button onClick={() => go("news")}
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:gap-3 transition-all" style={HF}>
                {t.viewAll} <ArrowRight size={16} />
              </button>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-7">
            {/* Featured article */}
            <FadeIn>
              <a
                href={articles[0].href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl overflow-hidden border border-black/6 hover:border-[#C8102E]/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-60 lg:h-[270px] relative overflow-hidden">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#C8102E] text-white text-xs font-semibold rounded-full">{articles[0].tag}</span>
                </div>
                <div className="flex-1 p-6 lg:p-7">
                  <p className="text-xs text-gray-400 mb-2.5 flex items-center gap-1.5" style={MF}><Clock size={11} /> {articles[0].date}</p>
                  <h3 className="text-[22px] lg:text-[24px] font-black text-[#1B2F5E] mb-3 leading-[1.35] line-clamp-3 group-hover:text-[#C8102E] transition-colors" style={HF}>{articles[0].title}</h3>
                  <p className="text-[14px] text-gray-500 leading-7 line-clamp-3 min-h-[84px]">{articles[0].desc}</p>
                  <div className="flex items-center gap-1.5 mt-5 text-sm font-bold text-[#C8102E]" style={HF}>
                    {t.readMore} <ArrowRight size={14} />
                  </div>
                </div>
              </a>
            </FadeIn>

            {/* Smaller articles */}
            <div className="flex flex-col gap-6">
              {articles.slice(1).map((a, i) => (
                <FadeIn key={a.title} delay={i * 0.1}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl overflow-hidden border border-black/6 hover:border-[#C8102E]/20 hover:shadow-lg transition-all duration-300 min-h-[228px]"
                  >
                    <div className="flex h-full gap-0">
                      <div className="w-40 md:w-44 flex-shrink-0 overflow-hidden">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-1 flex-col justify-between">
                        <div>
                          <span className="text-xs text-[#C8102E] font-semibold" style={MF}>{a.tag}</span>
                          <h3 className="text-lg font-bold text-[#1B2F5E] mt-2 mb-3 leading-[1.45] line-clamp-3 group-hover:text-[#C8102E] transition-colors" style={HF}>{a.title}</h3>
                          <p className="text-sm text-gray-500 leading-7 line-clamp-3 min-h-[84px]">{a.desc}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-4" style={MF}>{a.date}</p>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTNERS ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FAFF] border-t border-black/5">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-3" style={HF}>{t.partnersTitle}</h2>
              <div className="w-12 h-0.5 bg-[#C8102E] mx-auto mb-4" />
              <p className="text-[#6C788A] max-w-xl mx-auto leading-[1.8]">{t.partnersSub}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4 md:gap-x-6 md:gap-y-5">
              {partnersList.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center px-1 py-1"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="block w-[220px] h-[117px] max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const next = target.nextElementSibling as HTMLSpanElement | null;
                      if (next) next.style.display = "inline";
                    }}
                  />
                  <div className="px-4 py-6 hidden">
                    <span
                      className="hidden text-sm font-bold text-[#1B2F5E] tracking-[0.04em] text-center"
                      style={HF}
                    >
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ CAREERS CTA ══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-black/5">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(27,47,94,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px", opacity: 0.4,
        }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="rounded-[32px] border border-[#1B2F5E]/8 bg-[linear-gradient(180deg,rgba(248,250,255,0.95)_0%,#FFFFFF_100%)] shadow-[0_24px_56px_rgba(15,31,61,0.07)] px-8 py-14 md:px-16 md:py-16 text-center">
              <h2 className="text-5xl md:text-7xl font-black text-[#1B2F5E] mb-6 leading-[1.02]" style={HF}>{t.careersTitle}</h2>
              <p className="text-xl text-[#6C788A] mb-12 max-w-xl mx-auto leading-[1.85]">{t.careersSub}</p>
              <button onClick={() => go("careers")}
                className="inline-flex items-center gap-3 px-12 py-5 bg-[#1B2F5E] hover:bg-[#0F1F3D] text-white font-black text-lg rounded-full transition-all hover:shadow-2xl hover:shadow-[#1B2F5E]/20 hover:-translate-y-1"
                style={HF}>
                {t.careersTitle} <ArrowRight size={22} />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

// ─── About Page ────────────────────────────────────────────────────────────────


// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({ t, onBack }: { t: Dict; onBack: () => void }) {
  const pillars = [
    { label: t.vision, text: t.visionText, icon: TrendingUp },
    { label: t.innovation, text: t.innovationText, icon: Award },
    { label: t.mission, text: t.missionText, icon: Shield },
  ];

  const stats = t.aboutPage.stats;
  const milestones = t.aboutPage.milestones.items;
  const certGroups = t.aboutPage.certifications.groups;
  const rdSecondaryEyebrow = t.nav.home === "首页"
    ? "全球布局"
    : t.nav.home === "HOME"
      ? "GLOBAL FOOTPRINT"
      : t.nav.home === "Inicio"
        ? "PRESENCIA GLOBAL"
        : "PRÉSENCE MONDIALE";
  const [videoOpen, setVideoOpen] = useState(false);
  const featuredVideo = t.aboutPage.featuredVideo;

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      {/* Hero band */}
      <div className="relative bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] border-b border-black/6 py-20 lg:py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(27,47,94,0.045) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }} />
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#D7DDE8]" />
              <span className="text-[11px] text-[#C8102E] tracking-[0.34em] uppercase font-semibold" style={MF}>
                {t.aboutPage.hero.eyebrow}
              </span>
              <span className="w-12 h-px bg-[#D7DDE8]" />
            </div>
            <h1 className="text-[34px] md:text-[52px] lg:text-[60px] font-black text-[#1B2F5E] leading-[1.08] tracking-[-0.03em] max-w-4xl mx-auto" style={HF}>{t.companyFull}</h1>
            <div className="w-14 h-0.5 bg-[#C8102E] mx-auto mt-8 mb-7" />
            <p className="text-[15px] md:text-[18px] font-semibold text-[#405581] max-w-3xl mx-auto leading-[1.8]" style={BF}>
              {t.aboutPage.hero.lead}
            </p>
            <p className="text-[14px] md:text-[16px] text-[#7B8798] max-w-3xl mx-auto leading-[1.95] mt-5" style={BF}>
              {t.aboutPage.hero.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-10 max-w-4xl mx-auto">
              {t.aboutPage.hero.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center justify-center min-w-[132px] px-5 py-2.5 rounded-full border border-[#1B2F5E]/10 bg-white text-[#1B2F5E]/78 text-sm font-medium shadow-[0_8px_20px_rgba(27,47,94,0.04)]" style={BF}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="bg-[#F8FAFF] border-b border-black/6 py-14 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 text-center">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[24px] border border-[#1B2F5E]/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] px-5 py-6 lg:px-7 lg:py-7 shadow-[0_14px_34px_rgba(27,47,94,0.05)]"
            >
              <div className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-2 leading-none" style={HF}>{s.value}</div>
              <div className="w-8 h-0.5 bg-[#C8102E] mx-auto mb-3" />
              <div className="text-xs md:text-sm text-gray-500 tracking-[0.06em]" style={BF}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-10 py-20">
        {/* Vision / Mission / Innovation pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p) => (
            <div key={p.label} className="rounded-[24px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] border border-[#1B2F5E]/8 p-8 shadow-[0_16px_36px_rgba(27,47,94,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#C8102E]/8">
                  <p.icon size={20} className="text-[#C8102E]" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C8102E]" style={MF}>{p.label}</span>
              </div>
              <p className="text-[#1B2F5E] font-semibold text-lg leading-[1.7]" style={HF}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Photo + text */}
        <div className="mb-20">
          <div className="relative rounded-[32px] overflow-hidden border border-[#1B2F5E]/8 shadow-[0_22px_50px_rgba(27,47,94,0.08)] min-h-[340px] lg:min-h-[440px]">
            <img
              src={rdPanoramaImg}
              alt="R&D center interior"
              className="absolute inset-0 w-full h-full object-cover object-[center_24%] contrast-[1.04] saturate-[1.03]"
              onError={(e) => {
                e.currentTarget.src = labImg;
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.01)_0%,rgba(15,23,42,0.12)_42%,rgba(15,23,42,0.44)_100%)]" />
            <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8 lg:p-10">
              <div className="max-w-2xl rounded-[28px] border border-white/20 bg-[rgba(255,255,255,0.12)] backdrop-blur-[2px] px-6 py-5 md:px-7 md:py-6 shadow-[0_18px_36px_rgba(15,23,42,0.14)]">
                <div className="text-[10px] md:text-[11px] text-white/70 tracking-[0.28em] uppercase font-semibold mb-3" style={MF}>
                  {t.aboutPage.rd.eyebrow}
                </div>
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-black text-white leading-[1.08]" style={HF}>
                  {t.aboutPage.rd.title.split("\n").map((line, idx) => (<span key={idx} className="block">{line}</span>))}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 mt-6">
            <div className="rounded-[28px] border border-[#1B2F5E]/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-7 md:p-8 shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-[#C8102E]" />
                <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-medium" style={MF}>{t.aboutPage.rd.eyebrow}</span>
              </div>
              <p className="text-[15px] md:text-base text-[#6C788A] leading-[1.95]">{t.aboutPage.rd.p1}</p>
            </div>

            <div className="rounded-[28px] border border-[#1B2F5E]/8 bg-white p-7 md:p-8 shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-[#1B2F5E]/18" />
                <span className="text-xs text-[#1B2F5E]/60 tracking-[0.25em] uppercase font-medium" style={MF}>
                  {rdSecondaryEyebrow}
                </span>
              </div>
              <p className="text-[15px] md:text-base text-[#6C788A] leading-[1.95]">{t.aboutPage.rd.p2}</p>
            </div>
          </div>
        </div>

        {/* Milestones / Timeline */}
        <div className="mb-20 rounded-[28px] border border-[#1B2F5E]/8 bg-white p-8 md:p-10 shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#C8102E]" />
            <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-medium" style={MF}>{t.aboutPage.milestones.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-[#1B2F5E] mb-10" style={HF}>{t.aboutPage.milestones.title}</h2>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-black/8" />
            <div className="flex flex-col gap-0">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start group">
                  <div className="w-[72px] flex-shrink-0 text-right pr-5 pt-4">
                    <span className="text-sm font-black text-[#C8102E]" style={HF}>{m.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 pt-4">
                    <div className="w-3 h-3 rounded-full border-2 border-[#C8102E] bg-white relative z-10" />
                  </div>
                  <div className="flex-1 pb-8 pt-3">
                    <p className="text-sm text-[#6C788A] leading-[1.9]">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="rounded-[28px] border border-[#1B2F5E]/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-8 md:p-10 shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#C8102E]" />
            <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-medium" style={MF}>{t.aboutPage.certifications.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-[#1B2F5E] mb-8" style={HF}>{t.aboutPage.certifications.title}</h2>
          <div className="space-y-6">
            {certGroups.map((group) => (
              <div key={group.label}>
                <div className="text-sm font-bold text-[#1B2F5E] mb-3" style={HF}>{group.label}</div>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#1B2F5E]/10 shadow-[0_10px_24px_rgba(27,47,94,0.04)]">
                      <Award size={14} className="text-[#C8102E]" />
                      <span className="text-sm font-semibold text-[#1B2F5E]" style={HF}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full rounded-[28px] overflow-hidden border border-[#1B2F5E]/8 bg-white shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[280px] bg-[linear-gradient(135deg,#17305D_0%,#264A8A_56%,#EEF3FB_160%)]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  opacity: 0.18,
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.04)_0%,rgba(8,15,30,0.18)_100%)]" />
              <div className="relative h-full flex flex-col items-start justify-end p-8 md:p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-sm text-white/88 text-[11px] tracking-[0.22em] uppercase border border-white/16 mb-5" style={MF}>
                  <span className="w-4 h-px bg-white/70" />
                  {featuredVideo.eyebrow}
                </span>
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/18 flex items-center justify-center mb-6">
                  <PlayCircle size={30} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight" style={HF}>{featuredVideo.title}</h3>
                <div className="text-sm text-white/72" style={MF}>{featuredVideo.formats}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="p-8 md:p-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] text-left group hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F7FF_100%)] transition-colors"
            >
              <div className="text-sm font-bold text-[#1B2F5E] mb-4" style={HF}>{featuredVideo.title}</div>
              <p className="text-[#6C788A] leading-[1.9] mb-8">{featuredVideo.desc}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8102E] text-white text-sm font-bold shadow-[0_12px_24px_rgba(200,16,46,0.18)] group-hover:bg-[#A80D25] transition-colors" style={HF}>
                <PlayCircle size={16} />
                {featuredVideo.action}
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-[rgba(8,15,30,0.72)] backdrop-blur-sm px-4 py-8 flex items-center justify-center"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-5xl rounded-[30px] overflow-hidden border border-white/12 bg-white shadow-[0_30px_80px_rgba(8,15,30,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-black/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)]">
                <div>
                  <div className="text-[11px] tracking-[0.24em] uppercase text-[#C8102E] mb-2" style={MF}>{featuredVideo.eyebrow}</div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1B2F5E]" style={HF}>{featuredVideo.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  className="w-10 h-10 rounded-full border border-black/8 bg-white text-[#1B2F5E] hover:text-[#C8102E] hover:border-[#C8102E]/20 transition-colors flex items-center justify-center"
                  aria-label={featuredVideo.title}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 md:p-8 bg-[#F8FAFF]">
                <div className="rounded-[28px] overflow-hidden border border-[#1B2F5E]/8 bg-[#102548]">
                  {featuredVideo.videoUrl && cctvVideoHasVisualTrack ? (
                    <video
                      src={featuredVideo.videoUrl}
                      poster={cctvVideoPoster}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full aspect-video bg-black"
                    />
                  ) : cctvAudioUrl ? (
                    <div className="bg-[#0F2143]">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={cctvVideoPoster} alt={featuredVideo.title} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.16)_0%,rgba(8,15,30,0.46)_100%)]" />
                        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                          <div className="w-20 h-20 rounded-full bg-white/12 border border-white/18 flex items-center justify-center mb-6">
                            <PlayCircle size={38} className="text-white" />
                          </div>
                          <div className="text-2xl md:text-3xl font-black text-white mb-3" style={HF}>{featuredVideo.title}</div>
                          <div className="text-sm md:text-base text-white/78 max-w-2xl leading-8">{featuredVideo.desc}</div>
                        </div>
                      </div>
                      <div className="border-t border-white/10 bg-white/95 p-4 md:p-5">
                        <audio src={cctvAudioUrl} controls autoPlay preload="metadata" className="w-full" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-[linear-gradient(135deg,#17305D_0%,#264A8A_100%)]">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                          opacity: 0.5,
                        }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(8,15,30,0.22)_100%)]" />
                      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 rounded-full bg-white/12 border border-white/18 flex items-center justify-center mb-6">
                          <PlayCircle size={38} className="text-white" />
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-white mb-3" style={HF}>{featuredVideo.placeholder}</div>
                        <div className="text-sm md:text-base text-white/72 max-w-2xl leading-8">{featuredVideo.modalNote}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

// ─── Materials Page ───────────────────────────────────────────────────────────

function MaterialsPage({ t, lang, products, selectedProductIdx, currentListPage, onNavigate, onBack, onOpenProductDetail, onBackToProductList }: {
  products: ProductItem[];
  t: Dict;
  lang: Lang;
  selectedProductIdx: number | null;
  currentListPage: number;
  onNavigate: (s: NavState) => void;
  onBack: () => void;
  onOpenProductDetail: (productIdx: number) => void;
  onBackToProductList: () => void;
}) {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showAllApps, setShowAllApps] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const materialsLayout = {
    zh: {
      detailCols: "lg:grid-cols-[0.9fr_1.1fr] gap-8",
      detailImageAspect: "aspect-[16/12]",
      detailTitle: "text-3xl md:text-4xl",
      detailIntro: "text-lg leading-8 max-w-3xl",
      detailMetaCols: "sm:grid-cols-2",
      detailActions: "flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-5",
      detailContentCols: "lg:grid-cols-[1fr_0.42fr] gap-8",
      appChipWrap: "gap-2",
      appChip: "px-3 py-1.5 text-xs",
      relatedSectionClass: "space-y-6 lg:sticky lg:top-16",
      relatedListClass: "space-y-3",
      relatedCardClass: "w-full text-left rounded-2xl border border-black/8 bg-white p-4 hover:border-[#1B2F5E]/25 hover:shadow-md transition-all",
      relatedCardInner: "flex items-center gap-4",
      relatedThumb: "w-20 h-16",
      relatedName: "text-sm truncate",
      relatedSpec: "text-xs leading-5",
      quickFilterPadding: "min-h-[88px]",
      quickFilterWrap: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      searchFieldMax: "md:max-w-[420px]",
      listDescWidth: "max-w-3xl",
      listGrid: "sm:grid-cols-2 lg:grid-cols-3",
      listCardPadding: "p-7",
      listTitle: "text-xl min-h-[64px] leading-[1.4] line-clamp-2",
      listDesc: "text-sm leading-7 line-clamp-4 min-h-[112px]",
      listKpiBody: "text-xs",
      listKpiMinH: "min-h-[92px]",
      industryDesc: "text-[15px] text-[#6C788A] leading-[1.85] mb-5 min-h-[84px] line-clamp-3",
    },
    en: {
      detailCols: "xl:grid-cols-[0.84fr_1.16fr] gap-8 xl:gap-12",
      detailImageAspect: "aspect-[16/11]",
      detailTitle: "text-[28px] md:text-[34px] xl:text-[40px]",
      detailIntro: "text-[16px] md:text-[17px] leading-[1.9] max-w-[72ch]",
      detailMetaCols: "md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
      detailActions: "grid sm:grid-cols-2 2xl:grid-cols-3 gap-3 mt-6",
      detailContentCols: "grid-cols-1 gap-8",
      appChipWrap: "gap-2.5",
      appChip: "px-3.5 py-2 text-[13px] leading-5",
      relatedSectionClass: "space-y-6",
      relatedListClass: "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
      relatedCardClass: "w-full text-left rounded-[24px] border border-black/8 bg-white p-5 hover:border-[#1B2F5E]/25 hover:shadow-md transition-all",
      relatedCardInner: "flex flex-col items-start gap-4",
      relatedThumb: "w-full h-32",
      relatedName: "text-[15px] leading-6 line-clamp-2",
      relatedSpec: "text-[13px] leading-5 line-clamp-3",
      quickFilterPadding: "min-h-[96px]",
      quickFilterWrap: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
      searchFieldMax: "md:max-w-[460px]",
      listDescWidth: "max-w-[60ch]",
      listGrid: "sm:grid-cols-2 lg:grid-cols-3",
      listCardPadding: "p-7",
      listTitle: "text-[21px] min-h-[78px] leading-[1.35] line-clamp-3",
      listDesc: "text-[14px] leading-7 line-clamp-4 min-h-[124px]",
      listKpiBody: "text-[12px] leading-6",
      listKpiMinH: "min-h-[104px]",
      industryDesc: "text-[15px] text-[#6C788A] leading-[1.9] mb-5 min-h-[104px] line-clamp-4",
    },
    es: {
      detailCols: "xl:grid-cols-[0.8fr_1.2fr] gap-8 xl:gap-14",
      detailImageAspect: "aspect-[16/10.8]",
      detailTitle: "text-[27px] md:text-[33px] xl:text-[38px]",
      detailIntro: "text-[16px] md:text-[17px] leading-[1.95] max-w-[76ch]",
      detailMetaCols: "lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]",
      detailActions: "grid sm:grid-cols-2 gap-3 mt-6",
      detailContentCols: "grid-cols-1 gap-8",
      appChipWrap: "gap-2.5",
      appChip: "px-3.5 py-2 text-[13px] leading-5",
      relatedSectionClass: "space-y-6",
      relatedListClass: "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
      relatedCardClass: "w-full text-left rounded-[24px] border border-black/8 bg-white p-5 hover:border-[#1B2F5E]/25 hover:shadow-md transition-all",
      relatedCardInner: "flex flex-col items-start gap-4",
      relatedThumb: "w-full h-32",
      relatedName: "text-[15px] leading-6 line-clamp-2",
      relatedSpec: "text-[13px] leading-5 line-clamp-3",
      quickFilterPadding: "min-h-[96px]",
      quickFilterWrap: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
      searchFieldMax: "md:max-w-[520px]",
      listDescWidth: "max-w-[68ch]",
      listGrid: "sm:grid-cols-2 2xl:grid-cols-3",
      listCardPadding: "p-7 xl:p-8",
      listTitle: "text-[20px] min-h-[88px] leading-[1.38] line-clamp-3",
      listDesc: "text-[14px] leading-7 line-clamp-5 min-h-[148px]",
      listKpiBody: "text-[12px] leading-6",
      listKpiMinH: "min-h-[116px]",
      industryDesc: "text-[15px] text-[#6C788A] leading-[1.92] mb-5 min-h-[120px] line-clamp-4",
    },
    fr: {
      detailCols: "xl:grid-cols-[0.8fr_1.2fr] gap-8 xl:gap-14",
      detailImageAspect: "aspect-[16/10.8]",
      detailTitle: "text-[27px] md:text-[33px] xl:text-[38px]",
      detailIntro: "text-[16px] md:text-[17px] leading-[1.95] max-w-[76ch]",
      detailMetaCols: "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
      detailActions: "grid sm:grid-cols-2 gap-3 mt-6",
      detailContentCols: "grid-cols-1 gap-8",
      appChipWrap: "gap-2.5",
      appChip: "px-3.5 py-2 text-[13px] leading-5",
      relatedSectionClass: "space-y-6",
      relatedListClass: "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
      relatedCardClass: "w-full text-left rounded-[24px] border border-black/8 bg-white p-5 hover:border-[#1B2F5E]/25 hover:shadow-md transition-all",
      relatedCardInner: "flex flex-col items-start gap-4",
      relatedThumb: "w-full h-32",
      relatedName: "text-[15px] leading-6 line-clamp-2",
      relatedSpec: "text-[13px] leading-5 line-clamp-3",
      quickFilterPadding: "min-h-[96px]",
      quickFilterWrap: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
      searchFieldMax: "md:max-w-[540px]",
      listDescWidth: "max-w-[70ch]",
      listGrid: "sm:grid-cols-2 2xl:grid-cols-3",
      listCardPadding: "p-7 xl:p-8",
      listTitle: "text-[20px] min-h-[88px] leading-[1.38] line-clamp-3",
      listDesc: "text-[14px] leading-7 line-clamp-5 min-h-[148px]",
      listKpiBody: "text-[12px] leading-6",
      listKpiMinH: "min-h-[116px]",
      industryDesc: "text-[15px] text-[#6C788A] leading-[1.92] mb-5 min-h-[120px] line-clamp-4",
    },
  } as const;
  const layout = materialsLayout[lang];

  function pick<T>(zh: T, en: T, es: T, fr: T) {
    return lang === "zh" ? zh : lang === "en" ? en : lang === "es" ? es : fr;
  }

  const getListVisualAspectClass = (product: ProductItem) => {
    const title = pick(product.name, product.nameEn, product.nameEs, product.nameFr);
    const description = pick(product.desc, product.descEn, product.descEs, product.descFr);
    const score = title.length * 1.6 + description.length * 0.18;
    const mediumThreshold = lang === "zh" ? 46 : 120;
    const longThreshold = lang === "zh" ? 78 : 175;
    const isZh = lang === "zh";
    if (score >= longThreshold) return isZh ? "aspect-[16/10]" : "aspect-[3/2]";
    if (score >= mediumThreshold) return isZh ? "aspect-[3/2]" : "aspect-[4/3]";
    return isZh ? "aspect-[4/3]" : "aspect-[5/4]";
  };

  useEffect(() => {
    setShowAllHighlights(false);
    setShowAllApps(false);
  }, [selectedProductIdx]);

  const normalizedProductQuery = productQuery.trim().toLowerCase();
  const visible = products.filter((product) => {
    if (!normalizedProductQuery) return true;
    const searchPool = [
      product.name,
      product.nameEn,
      product.nameEs,
      product.nameFr,
      product.desc,
      product.descEn,
      product.descEs,
      product.descFr,
      product.spec,
      product.specEn,
      product.specEs,
      product.specFr,
      ...product.apps,
      ...product.appsEn,
      ...product.appsEs,
      ...product.appsFr,
    ].join(" ").toLowerCase();
    return searchPool.includes(normalizedProductQuery);
  });
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(visible.length / itemsPerPage));
  const effectiveCurrentListPage = normalizedProductQuery ? 1 : currentListPage;
  const activeListPage = Math.min(Math.max(effectiveCurrentListPage, 1), totalPages);
  const pagedProducts = visible.slice((activeListPage - 1) * itemsPerPage, activeListPage * itemsPerPage);

  if (selectedProductIdx !== null && products[selectedProductIdx]) {
    const p = products[selectedProductIdx];
    const isZhDetail = lang === "zh";
    const detailIntroTail = t.materialsPage.detailIntroTail as Record<ProductItem["cat"], string>;
    const name = pick(p.name, p.nameEn, p.nameEs, p.nameFr);
    const desc = pick(p.desc, p.descEn, p.descEs, p.descFr);
    const spec = pick(p.spec, p.specEn, p.specEs, p.specFr);
    const temp = pick(p.temp, p.tempEn ?? p.temp, p.tempEs ?? p.temp, p.tempFr ?? p.tempEn ?? p.temp);
    const apps = pick(p.apps, p.appsEn, p.appsEs, p.appsFr);
    const highlights = spec.split("|").map(item => item.trim()).filter(Boolean);
    const intro = `${desc} ${detailIntroTail[p.cat]}`;
    const productVisual = getProductVisual(p);
    const related = products.filter((item) => item.cat === p.cat && item.name !== p.name).slice(0, 3);
    const visibleHighlights = showAllHighlights ? highlights : highlights.slice(0, 8);
    const visibleApps = showAllApps ? apps : apps.slice(0, 10);
    const showHighlightsToggle = highlights.length > 8;
    const showAppsToggle = apps.length > 10;
    const prevProduct = selectedProductIdx > 0 ? products[selectedProductIdx - 1] : null;
    const nextProduct = selectedProductIdx < products.length - 1 ? products[selectedProductIdx + 1] : null;
    const productTdsUrl = PRODUCT_TDS_MAP[p.name as keyof typeof PRODUCT_TDS_MAP] ?? null;
    const prevLabel = lang === "zh" ? "上一项" : lang === "en" ? "Previous" : lang === "es" ? "Anterior" : "Précédent";
    const nextLabel = lang === "zh" ? "下一项" : lang === "en" ? "Next" : lang === "es" ? "Siguiente" : "Suivant";
    const contactCtaLabel = lang === "zh" ? "联系我们" : t.materialsPage.downloadsAction;
    const forms = p.name === "防火硅橡胶"
      ? pick(["材料", "片材", "定制开发"], ["Material", "Sheets", "Custom Development"], ["Material", "Láminas", "Desarrollo Personalizado"], ["Matériau", "Feuilles", "Développement sur mesure"])
      : t.materialsPage.forms;
    const productDetailActions = (
      <div className="rounded-[24px] border border-black/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] p-3 sm:p-4 shadow-[0_14px_34px_rgba(27,47,94,0.04)]">
        <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 ${productTdsUrl ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          <button
            type="button"
            onClick={() => prevProduct && onOpenProductDetail(selectedProductIdx - 1)}
            disabled={!prevProduct}
            className={`inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 py-3 text-left transition-colors ${prevProduct ? "hover:border-[#C8102E]/20 hover:text-[#C8102E]" : "cursor-default opacity-45"}`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <ChevronLeft size={18} className="flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-gray-400 tracking-[0.12em] uppercase" style={MF}>{prevLabel}</div>
                <div className="text-[12px] font-bold text-[#1B2F5E] line-clamp-1" style={HF}>
                  {prevProduct ? pick(prevProduct.name, prevProduct.nameEn, prevProduct.nameEs, prevProduct.nameFr) : "—"}
                </div>
              </div>
            </div>
          </button>

          {productTdsUrl && (
            <a
              href={productTdsUrl}
              download={`${p.name}-TDS.pdf`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-bold text-[#1B2F5E] transition-colors hover:border-[#C8102E]/20 hover:text-[#C8102E]"
              style={HF}
              title={t.materialsPage.tdsDesc}
            >
              <FileDown size={18} />
              {t.materialsPage.tdsAction}
            </a>
          )}

          <button
            type="button"
            onClick={() => nextProduct && onOpenProductDetail(selectedProductIdx + 1)}
            disabled={!nextProduct}
            className={`inline-flex min-h-[54px] w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 py-3 text-left transition-colors ${nextProduct ? "hover:border-[#C8102E]/20 hover:text-[#C8102E]" : "cursor-default opacity-45"}`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <ChevronRight size={18} className="flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-gray-400 tracking-[0.12em] uppercase" style={MF}>{nextLabel}</div>
                <div className="text-[12px] font-bold text-[#1B2F5E] line-clamp-1" style={HF}>
                  {nextProduct ? pick(nextProduct.name, nextProduct.nameEn, nextProduct.nameEs, nextProduct.nameFr) : "—"}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );

    return (
      <PageShell
        onBack={onBackToProductList}
        backLabel={t.materialsPage.detailBack}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-12">
          <div className="relative">
            <div className={`grid items-start ${layout.detailCols} lg:pb-[104px]`}>
              <div>
                <div className={`rounded-3xl overflow-hidden border border-black/8 ${getProductVisualFrameClass(p)}`}>
                  <div className={`${layout.detailImageAspect} ${getProductVisualFit(p) === "contain" ? "p-8 md:p-10" : ""}`}>
                    <ImageWithFallback src={productVisual} alt={name} className={getProductVisualImgClass(p, false)} />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <div className="text-xs text-[#C8102E] tracking-[0.24em] uppercase font-medium mb-3" style={MF}>{t.materialsPage.detailBadge}</div>
                <h1 className={`${layout.detailTitle} font-black text-[#1B2F5E] mb-4 leading-[1.12]`} style={HF}>{name}</h1>
                <div className="w-10 h-0.5 bg-[#C8102E] mb-6" />
                <p className={`${layout.detailIntro} text-gray-600 mb-6`}>{intro}</p>

                <div className={`grid gap-4 ${layout.detailMetaCols}`}>
                  <div className="rounded-2xl bg-white border border-black/8 p-5">
                    <div className="text-[10px] text-gray-400 uppercase tracking-[0.24em] mb-2" style={MF}>{t.materialsPage.categoryLabel}</div>
                    <div className={`${isZhDetail ? "text-sm" : "text-[15px] leading-7"} font-bold text-[#1B2F5E]`} style={HF}>{name}</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-black/8 p-5">
                    <div className="text-[10px] text-gray-400 uppercase tracking-[0.24em] mb-2" style={MF}>{t.materialsPage.tempLabel}</div>
                    <div className={`${isZhDetail ? "text-sm" : "text-[15px] leading-7"} font-bold text-[#1B2F5E]`} style={HF}>{temp}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate({ page: "contact" })}
                  className="mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A80D25]"
                  style={HF}
                >
                  {contactCtaLabel}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0">
              {productDetailActions}
            </div>
          </div>

          <div className={`grid mt-8 items-start ${layout.detailContentCols}`}>
            <div className="space-y-8">
              <section className="rounded-3xl bg-white border border-black/8 overflow-hidden">
                <div className="p-8 border-b border-black/6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px bg-[#C8102E]" />
                    <span className="text-xs text-[#C8102E] tracking-[0.24em] uppercase font-medium" style={MF}>{t.materialsPage.highlightsTitle}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                    {visibleHighlights.map((item) => (
                      <div key={item} className="flex items-start gap-3 py-2 border-b border-black/6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mt-2 flex-shrink-0" />
                        <div className="text-sm font-semibold text-[#1B2F5E] leading-7" style={HF}>{item}</div>
                      </div>
                    ))}
                  </div>
                  {showHighlightsToggle && (
                    <button
                      type="button"
                      onClick={() => setShowAllHighlights(v => !v)}
                      className="mt-5 text-sm font-semibold text-[#C8102E] hover:text-[#A80D25] transition-colors"
                      style={HF}
                    >
                      {showAllHighlights ? (lang === "zh" ? "收起" : lang === "en" ? "Collapse" : lang === "es" ? "Contraer" : "Réduire") : (lang === "zh" ? "查看全部" : lang === "en" ? "View All" : lang === "es" ? "Ver Todo" : "Voir tout")}
                    </button>
                  )}
                </div>

                <div className="p-8 border-b border-black/6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px bg-[#C8102E]" />
                    <span className="text-xs text-[#C8102E] tracking-[0.24em] uppercase font-medium" style={MF}>{t.materialsPage.applicationsTitle}</span>
                  </div>
                  <div className={`flex flex-wrap ${layout.appChipWrap}`}>
                    {visibleApps.map((app) => (
                      <span key={app} className={`rounded-full border border-black/8 bg-white text-[#1B2F5E] ${layout.appChip}`}>
                        {app}
                      </span>
                    ))}
                  </div>
                  {showAppsToggle && (
                    <button
                      type="button"
                      onClick={() => setShowAllApps(v => !v)}
                      className="mt-5 text-sm font-semibold text-[#C8102E] hover:text-[#A80D25] transition-colors"
                      style={HF}
                    >
                      {showAllApps ? (lang === "zh" ? "收起" : lang === "en" ? "Collapse" : lang === "es" ? "Contraer" : "Réduire") : (lang === "zh" ? "查看更多" : lang === "en" ? "Show More" : lang === "es" ? "Ver Más" : "Voir plus")}
                    </button>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-6 h-px bg-[#C8102E]" />
                    <span className="text-xs text-[#C8102E] tracking-[0.24em] uppercase font-medium" style={MF}>{t.materialsPage.formsTitle}</span>
                  </div>
                  <div className={`flex flex-wrap ${layout.appChipWrap}`}>
                    {forms.map((form: string) => (
                      <span key={form} className={`rounded-full border border-black/8 bg-white text-gray-600 ${layout.appChip}`}>
                        {form}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className={layout.relatedSectionClass}>
              <section className="rounded-3xl bg-white border border-black/8 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-6 h-px bg-[#C8102E]" />
                  <span className="text-xs text-[#C8102E] tracking-[0.24em] uppercase font-medium" style={MF}>{t.materialsPage.relatedTitle}</span>
                </div>
                <div className={layout.relatedListClass}>
                  {related.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => onOpenProductDetail(products.indexOf(item))}
                      className={layout.relatedCardClass}
                    >
                      <div className={layout.relatedCardInner}>
                        <div className={`${layout.relatedThumb} rounded-xl overflow-hidden border border-black/6 bg-[#F5F7FB] flex-shrink-0`}>
                          <div className={`w-full h-full ${getProductVisualFrameClass(item)}`}>
                            <ImageWithFallback src={getProductVisual(item)} alt={pick(item.name, item.nameEn, item.nameEs, item.nameFr)} className={getProductVisualImgClass(item, false)} />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold text-[#1B2F5E] mb-1 ${layout.relatedName}`} style={HF}>{pick(item.name, item.nameEn, item.nameEs, item.nameFr)}</div>
                          <div className={`text-gray-500 ${layout.relatedSpec}`}>{pick(item.spec, item.specEn, item.specEs, item.specFr)}</div>
                        </div>
                        <ChevronRight size={16} className="text-[#C8102E] flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      {/* Page header */}
      <div className="bg-white border-b border-black/6 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.materialsPage.title}</h1>
          <div className="w-10 h-0.5 bg-[#C8102E] mx-auto mb-5" />
          <p className={`text-gray-500 text-lg mx-auto ${layout.listDescWidth}`}>{t.materialsPage.desc}</p>

          <div className="mt-8 rounded-[28px] border border-black/8 bg-[#F8FAFF] p-4 md:p-5 text-left shadow-[0_12px_30px_rgba(27,47,94,0.05)]">
            <div className="rounded-[24px] border border-[#1B2F5E]/8 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(27,47,94,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <div className="w-full">
                  <div className="grid min-h-[56px] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-full border border-black/10 bg-white px-5 shadow-[0_12px_28px_rgba(27,47,94,0.06)]">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F6FC] text-[#1B2F5E]/70">
                      <Search size={16} />
                    </span>
                    <input
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                      placeholder={lang === "zh" ? "搜索产品名称、参数或应用场景" : lang === "en" ? "Search by product, spec, or application" : lang === "es" ? "Busque por producto, parámetro o aplicación" : "Rechercher par produit, spécification ou application"}
                      className="h-10 min-w-0 w-full border-0 bg-transparent text-sm leading-5 text-[#1B2F5E] outline-none placeholder:text-gray-400"
                      style={BF}
                    />
                    <div className="flex items-center gap-2">
                      {productQuery && (
                        <button
                          type="button"
                          onClick={() => setProductQuery("")}
                          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F3F5FA] text-gray-500 hover:bg-[#FFF3F5] hover:text-[#C8102E] transition-colors"
                          aria-label={lang === "zh" ? "清空搜索" : lang === "en" ? "Clear search" : lang === "es" ? "Borrar búsqueda" : "Effacer la recherche"}
                        >
                          <X size={16} />
                        </button>
                      )}
                      <div className="inline-flex whitespace-nowrap rounded-full bg-[#F6F8FD] px-3 py-1.5 text-xs font-medium text-[#1B2F5E]/55" style={MF}>
                        {lang === "zh"
                          ? `共 ${visible.length} 个产品`
                          : lang === "en"
                            ? `${visible.length} products`
                            : lang === "es"
                              ? `${visible.length} productos`
                              : `${visible.length} produits`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Product grid */}
        {pagedProducts.length > 0 ? (
          <div className={`grid gap-6 ${layout.listGrid}`}>
            {pagedProducts.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.04} className="h-full">
                <div
                  onClick={() => onOpenProductDetail(products.indexOf(p))}
                  className={`group h-full rounded-2xl bg-white border border-black/7 hover:border-[#1B2F5E]/25 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col ${layout.listCardPadding}`}
                >
                  <div className={`rounded-2xl overflow-hidden border border-black/6 ${getProductVisualFrameClass(p)} mb-5`}>
                    <div className={`${getListVisualAspectClass(p)} overflow-hidden`}>
                      <div className={`${getProductVisualFit(p) === "contain" ? (lang === "zh" ? "p-4 sm:p-5" : "p-3 sm:p-4") : ""} w-full h-full`}>
                        <ImageWithFallback src={getProductVisual(p)} alt={pick(p.name, p.nameEn, p.nameEs, p.nameFr)} className={getProductVisualImgClass(p, true)} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mb-5">
                    <span className="text-xs font-bold text-gray-300 mt-1" style={MF}>
                      {String(products.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`font-black text-[#1B2F5E] mb-4 ${layout.listTitle}`} style={HF}>{pick(p.name, p.nameEn, p.nameEs, p.nameFr)}</h3>

                  <div className="w-8 h-0.5 mb-4 rounded-full" style={{ background: p.color }} />

                  <p className={`text-gray-500 mb-5 ${layout.listDesc}`}>{pick(p.desc, p.descEn, p.descEs, p.descFr)}</p>

                  <div className={`bg-[#F7F9FF] rounded-lg px-4 py-3 mb-4 ${layout.listKpiMinH}`}>
                    <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider" style={MF}>{t.materialsPage.kpiLabel}</div>
                    <div className={`text-[#1B2F5E] font-medium ${layout.listKpiBody}`} style={MF}>{pick(p.spec, p.specEn, p.specEs, p.specFr)}</div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <Thermometer size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-500" style={MF}>{pick(p.temp, p.tempEn ?? p.temp, p.tempEs ?? p.temp, p.tempFr ?? p.tempEn ?? p.temp)}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-black/6 flex items-center justify-end">
                    <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1" style={MF}>
                      {t.learnMore} <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-black/8 bg-[#F8FAFF] px-6 py-12 text-center">
            <div className="text-xl font-black text-[#1B2F5E] mb-3" style={HF}>
              {lang === "zh" ? "暂未找到匹配产品" : lang === "en" ? "No Matching Products" : lang === "es" ? "No se encontraron productos" : "Aucun produit correspondant"}
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-7">
              {lang === "zh"
                ? "可以尝试更换产品名称、关键参数，或清空搜索后重新浏览全部产品。"
                : lang === "en"
                  ? "Try another product name or spec keyword, or clear the search to browse all products again."
                  : lang === "es"
                    ? "Pruebe con otro nombre o parámetro, o borre la búsqueda para ver todos los productos otra vez."
                    : "Essayez un autre nom de produit ou un autre mot-clé technique, ou effacez la recherche pour retrouver l'ensemble des produits."}
            </p>
            <button
              type="button"
              onClick={() => setProductQuery("")}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#C8102E]/15 bg-white px-5 py-2.5 text-sm font-bold text-[#C8102E] hover:border-[#C8102E]/30 hover:bg-[#FFF7F8] transition-colors"
              style={HF}
            >
              {lang === "zh" ? "清空搜索" : lang === "en" ? "Clear Search" : lang === "es" ? "Borrar búsqueda" : "Effacer la recherche"}
            </button>
          </div>
        )}

        {totalPages > 1 && pagedProducts.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
              const active = pageNum === activeListPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onNavigate({ page: "materials", productIdx: null, materialsListPage: pageNum })}
                  className={`min-w-11 h-11 rounded-full border text-sm font-bold transition-all ${
                    active
                      ? "border-[#C8102E] bg-[#C8102E] text-white shadow-[0_10px_24px_rgba(200,16,46,0.18)]"
                      : "border-black/8 bg-white text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E]"
                  }`}
                  style={HF}
                  aria-label={`${t.materialsPage.title} ${pageNum}`}
                  aria-current={active ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}

// ─── Fire Safety Page ─────────────────────────────────────────────────────────

function FireSafetyPage({ t, onBack }: { t: Dict; onBack: () => void }) {
  const icons = [Flame, Building2, Zap, Shield, Thermometer, Wind];
  const solutions = t.fireSafetyPage.solutions.map((s: Dict["fireSafetyPage"]["solutions"][number], i: number) => ({ ...s, icon: icons[i] ?? Flame }));
  const standards = t.fireSafetyPage.standards;
  const overviewIcons = [Zap, Wind, Shield, Gauge, Award];
  const overviewCards = t.fireSafetyPage.overviewCards.map((item: Dict["fireSafetyPage"]["overviewCards"][number], idx: number) => ({ ...item, icon: overviewIcons[idx] ?? Shield }));
  const renderSpecText = (sp: string) => {
    if (!sp.includes("CITNLP")) return sp;

    const [before, after] = sp.split("CITNLP");
    return (
      <>
        {before}
        <span className="inline-flex items-baseline font-serif italic text-[1.05em]">
          <span>CIT</span>
          <sub className="text-[0.72em] leading-none -ml-[0.02em]">NLP</sub>
        </span>
        {after}
      </>
    );
  };
  const solutionSections = [
    { key: "fire", data: t.fireSafetyPage.sections.fire, items: solutions.slice(0, 4) },
    { key: "thermal", data: t.fireSafetyPage.sections.thermal, items: solutions.slice(4) },
  ] as const;
  const [activeSection, setActiveSection] = useState<"fire" | "thermal">("fire");

  const jumpToSection = (key: "fire" | "thermal") => {
    setActiveSection(key);
    const el = document.getElementById(`solutions-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      <section className="relative overflow-hidden bg-[#F7F9FC] border-b border-black/6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(27,47,94,0.045) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -top-28 -right-28 w-[560px] h-[560px] rounded-full bg-[#C8102E]/7 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-36 -left-36 w-[620px] h-[620px] rounded-full bg-[#1B2F5E]/6 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl font-black text-[#1B2F5E] leading-[1.05]" style={HF}>{t.divisions[1].title}</h1>
              <p className="mt-6 text-base md:text-lg text-[#6C788A] leading-[1.9] max-w-2xl">{t.divisions[1].desc}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => jumpToSection("fire")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    activeSection === "fire"
                      ? "border-[#C8102E]/25 bg-[#FFF7F8] text-[#C8102E]"
                      : "border-black/10 bg-white text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E]"
                  }`}
                  style={HF}
                >
                  <Shield size={16} className={activeSection === "fire" ? "text-[#C8102E]" : "text-gray-400"} />
                  {solutionSections[0].data.title}
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${activeSection === "fire" ? "bg-[#C8102E]/10 text-[#C8102E]" : "bg-black/5 text-gray-500"}`} style={MF}>
                    {solutionSections[0].items.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => jumpToSection("thermal")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    activeSection === "thermal"
                      ? "border-[#C8102E]/25 bg-[#FFF7F8] text-[#C8102E]"
                      : "border-black/10 bg-white text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E]"
                  }`}
                  style={HF}
                >
                  <Thermometer size={16} className={activeSection === "thermal" ? "text-[#C8102E]" : "text-gray-400"} />
                  {solutionSections[1].data.title}
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${activeSection === "thermal" ? "bg-[#C8102E]/10 text-[#C8102E]" : "bg-black/5 text-gray-500"}`} style={MF}>
                    {solutionSections[1].items.length}
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[32px] border border-black/10 bg-white overflow-hidden shadow-[0_28px_80px_rgba(15,23,42,0.10)]">
                <div className="aspect-[4/3] bg-[#E8EDF5] overflow-hidden">
                  <img src={FALLBACK_INDUSTRY_VISUALS.fireSafety} alt={t.divisions[1].title} className="w-full h-full object-cover object-center opacity-85" />
                </div>
                <div className="p-7">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3" style={MF}>{t.fireSafetyPage.overviewEyebrow}</div>
                  <div className="text-lg font-black text-[#1B2F5E]" style={HF}>{t.fireSafetyPage.overviewTitle}</div>
                  <p className="mt-3 text-sm text-gray-500 leading-7">{t.fireSafetyPage.overviewLead}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="rounded-[36px] border border-black/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] overflow-hidden p-8 md:p-10 mb-16 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(200,16,46,0.06) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              opacity: 0.35,
            }}
          />
          <div className="relative">
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {overviewCards.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[22px] border border-black/8 bg-white/80 backdrop-blur p-6 hover:border-[#C8102E]/22 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#C8102E]/9 flex items-center justify-center">
                      <item.icon size={20} className="text-[#C8102E]" />
                    </div>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-gray-300 font-semibold" style={MF}>
                      {t.fireSafetyPage.solutionsEyebrow}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-black text-[#1B2F5E] mb-2 leading-7" style={HF}>{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px bg-[#C8102E]" />
          <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-semibold" style={MF}>{t.fireSafetyPage.solutionsEyebrow}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1B2F5E] leading-[1.1]" style={HF}>{t.fireSafetyPage.solutionsTitle}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {solutionSections.map((section) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => jumpToSection(section.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-[#C8102E]/25 bg-[#FFF7F8] text-[#C8102E]"
                      : "border-black/10 bg-white text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E]"
                  }`}
                  style={HF}
                >
                  <span>{section.data.title}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-[#C8102E]/10 text-[#C8102E]" : "bg-black/5 text-gray-500"}`} style={MF}>
                    {section.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-10 mb-20">
          {solutionSections.map((section) => (
            <section key={section.key} id={`solutions-${section.key}`} className="scroll-mt-10">
              <div className="rounded-[34px] border border-black/8 bg-white overflow-hidden">
                <div className="px-8 pt-8 pb-7 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] border-b border-black/6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-black text-[#1B2F5E] mb-3" style={HF}>{section.data.title}</h3>
                      <p className="text-sm md:text-base text-[#6C788A] leading-8 max-w-3xl">{section.data.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start">
                      <span className="text-[10px] tracking-[0.28em] uppercase text-gray-400 font-semibold" style={MF}>{t.fireSafetyPage.kpiLabel}</span>
                      <span className="h-px w-10 bg-black/10" />
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/5 text-gray-600" style={MF}>
                        {section.items.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-6">
                  {section.items.map((s) => (
                    <div
                      key={s.title}
                      className="group rounded-[26px] bg-white border border-black/8 p-7 hover:border-[#C8102E]/22 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-[#C8102E]/9 flex items-center justify-center">
                          <s.icon size={20} className="text-[#C8102E]" />
                        </div>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F0F4FB] text-[#1B2F5E]" style={MF}>{s.tag}</span>
                      </div>
                      <h4 className="font-black text-[#1B2F5E] text-lg leading-8 mb-3" style={HF}>{s.title}</h4>
                      <p className="text-sm text-gray-500 leading-7 mb-5">{s.desc}</p>
                      <div className="border-t border-black/6 pt-4">
                        <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider" style={MF}>{t.fireSafetyPage.kpiLabel}</div>
                        <ul className="grid gap-2">
                          {s.specs.map((sp: string) => (
                            <li key={sp} className="flex items-start gap-2 text-xs text-gray-600 leading-6">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0 mt-2" />
                              <span>{renderSpecText(sp)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="bg-[#F8FAFF] rounded-[34px] border border-black/8 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C8102E]" />
            <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-semibold" style={MF}>{t.fireSafetyPage.standardsEyebrow}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#1B2F5E] leading-[1.15]" style={HF}>{t.fireSafetyPage.standardsTitle}</h2>
            <div className="text-xs text-gray-400 max-w-md leading-6" style={MF}>{t.fireSafetyPage.standardsLead}</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {standards.map((s: Dict["fireSafetyPage"]["standards"][number]) => (
              <div key={s.std} className="flex items-center gap-4 bg-white rounded-2xl border border-black/8 px-5 py-4 hover:border-[#C8102E]/18 hover:shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E]/9 flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-[#C8102E]" />
                </div>
                <div className="min-w-0">
                  <div className="font-black text-[#1B2F5E] text-sm mb-1" style={HF}>{s.std}</div>
                  <div className="text-xs text-gray-500 leading-6">{s.scope}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

// ─── Industries Page ──────────────────────────────────────────────────────────

function IndustriesPage({ t, industryDetail, selectedIdx, onBack, onBackToIndustryList, onOpenIndustryDetail }: {
  t: Dict;
  industryDetail: any;
  selectedIdx: number | null;
  onBack: () => void;
  onBackToIndustryList: () => void;
  onOpenIndustryDetail: (industryIdx: number) => void;
}) {
  if (selectedIdx !== null) {
    const ind = t.industries[selectedIdx];
    const Icon = ICONS[ind.icon] ?? Zap;
    return (
      <PageShell onBack={onBackToIndustryList} backLabel={t.nav.industries}>
        <div className="h-72 relative overflow-hidden">
          <img src={ind.img} alt={ind.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(27,47,94,0.9) 0%, rgba(27,47,94,0.4) 60%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 px-5 lg:px-10 pb-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                <Icon size={16} />{t.indTitle}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white" style={HF}>{ind.title}</h1>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">{ind.desc}</p>
          {industryDetail[selectedIdx] && (() => {
            const d = industryDetail[selectedIdx];
            const cards = [
              { label: t.industryDetailLabels.challenge, text: d.challenge, color: "#C8102E", n: "01" },
              { label: t.industryDetailLabels.solution, text: d.solution, color: "#1B2F5E", n: "02" },
              { label: t.industryDetailLabels.cases, text: d.cases, color: "#1B7EC2", n: "03" },
              { label: t.industryDetailLabels.products, text: d.products, color: "#2E8B57", n: "04" },
            ];
            return (
              <div className="grid md:grid-cols-2 gap-6">
                {cards.map((c) => (
                  <div key={c.label} className="rounded-xl bg-white border border-black/8 p-7 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold tracking-widest" style={{ ...MF, color: c.color + "80" }}>{c.n}</span>
                      <div className="flex-1 h-px" style={{ background: c.color + "20" }} />
                    </div>
                    <h3 className="font-black text-[#1B2F5E] mb-3 text-lg" style={HF}>
                      {c.label}
                    </h3>
                    <p className="text-sm text-gray-600 leading-[1.9]">{c.text}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      <div className="bg-white border-b border-black/6 py-16 px-6 lg:px-12 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.indTitle}</h1>
        <div className="w-10 h-0.5 bg-[#C8102E] mx-auto mb-5" />
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">{t.indSub}</p>
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.industries.map((ind, i) => {
            const Icon = ICONS[ind.icon] ?? Zap;
            return (
              <div
                key={ind.title}
                onClick={() => onOpenIndustryDetail(i)}
                className="group h-full min-h-[360px] rounded-xl border border-black/8 bg-white overflow-hidden hover:border-[#C8102E]/30 hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={ind.img} alt={ind.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                    <Icon size={18} />
                    <span className="text-sm font-bold" style={HF}>{ind.title}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 line-clamp-3 min-h-[72px] mb-3 leading-7">{ind.desc}</p>
                  <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1" style={MF}>
                    {t.learnMore} <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

// ─── News Page ────────────────────────────────────────────────────────────────

function NewsPage({ t, lang, articles, selectedIdx, onBack }: {
  t: Dict;
  lang: Lang;
  articles: any[];
  selectedIdx: number | null;
  onBack: () => void;
}) {
  const archiveCopy = lang === "zh"
    ? {
        title: "企业动态",
        companyLabel: "相关公司",
        tags: { visit: "客户来访", audit: "客户审厂", expo: "国际展会" },
        series: (n: string) => `组图 ${n}`,
      }
    : lang === "en"
      ? {
          title: "Client Visits & Event Archive",
          sub: "Photo-led presentation with automatic playback across different exchange scenes.",
          note: "Some images come from earlier archives. Numeric suffixes only distinguish photos within the same set.",
          companyLabel: "Company",
          tags: { visit: "Client Visit", audit: "Factory Audit", expo: "Trade Fair" },
          series: (n: string) => `Set ${n}`,
          playingLabel: "Auto Playing",
          reelHint: "Auto playback, tap to switch",
        }
      : lang === "es"
        ? {
            title: "Archivo de visitas y ferias",
            sub: "Presentacion centrada en fotos, con reproduccion automatica entre distintas escenas de intercambio.",
            note: "Parte del material procede de archivos anteriores. Los numeros solo distinguen fotos del mismo grupo.",
            companyLabel: "Empresa",
            tags: { visit: "Visita de cliente", audit: "Auditoría", expo: "Feria" },
            series: (n: string) => `Serie ${n}`,
            playingLabel: "Reproduccion automatica",
            reelHint: "Reproduccion automatica, toque para cambiar",
          }
        : {
            title: "Archives visites & salons",
            sub: "Presentation orientee photo avec lecture automatique des differentes scenes d'echange.",
            note: "Certaines images proviennent d'archives plus anciennes. Les chiffres servent seulement a distinguer les photos d'une meme serie.",
            companyLabel: "Entreprise",
            tags: { visit: "Visite client", audit: "Audit usine", expo: "Salon" },
            series: (n: string) => `Serie ${n}`,
            playingLabel: "Lecture automatique",
            reelHint: "Lecture automatique, appuyez pour changer",
          };

  const archiveItems = [
    {
      image: nexansTechVisitImg,
      tag: archiveCopy.tags.visit,
      company: "Nexans",
      title: lang === "zh" ? "全球技术交流来访" : lang === "en" ? "Global technical delegation visit" : lang === "es" ? "Visita del equipo tecnico global" : "Visite de la delegation technique mondiale",
      desc: lang === "zh" ? "Shara 博士与团队到访交流材料应用与合作方向。" : lang === "en" ? "Dr. Shara and team visited for technical exchange on material applications and collaboration." : lang === "es" ? "La Dra. Shara y su equipo visitaron la empresa para intercambiar ideas sobre aplicaciones y cooperacion." : "La delegation de la Dre Shara est venue echanger sur les applications materiaux et la cooperation.",
    },
    {
      image: nexansQualityVisitImg,
      tag: archiveCopy.tags.visit,
      company: "Nexans",
      title: lang === "zh" ? "质量与产品团队来访" : lang === "en" ? "Quality and product leaders on site" : lang === "es" ? "Visita del equipo de calidad y producto" : "Visite des responsables qualite et produit",
      desc: lang === "zh" ? "围绕质量体系与产品协同展开面对面沟通。" : lang === "en" ? "Face-to-face discussion focused on quality systems and product coordination." : lang === "es" ? "Intercambio presencial centrado en el sistema de calidad y la coordinacion de producto." : "Echange sur site autour du systeme qualite et de la coordination produit.",
    },
    {
      image: daigoAuditImg,
      tag: archiveCopy.tags.audit,
      company: "岱高 / Daigo",
      title: lang === "zh" ? "领导审厂记录" : lang === "en" ? "Management factory audit" : lang === "es" ? "Registro de auditoria directiva" : "Audit usine par la direction",
      desc: lang === "zh" ? `${archiveCopy.series("01")} · 现场查看生产与品控流程。` : lang === "en" ? `${archiveCopy.series("01")} · On-site review of production and quality-control procedures.` : lang === "es" ? `${archiveCopy.series("01")} · Revision in situ de produccion y control de calidad.` : `${archiveCopy.series("01")} · Revue sur site des procedes de production et du controle qualite.`,
    },
    {
      image: daigoAuditImg2,
      tag: archiveCopy.tags.audit,
      company: "岱高 / Daigo",
      title: lang === "zh" ? "领导审厂记录" : lang === "en" ? "Management factory audit" : lang === "es" ? "Registro de auditoria directiva" : "Audit usine par la direction",
      desc: lang === "zh" ? `${archiveCopy.series("02")} · 对关键工序和现场管理进行交流。` : lang === "en" ? `${archiveCopy.series("02")} · Discussion around key processes and site management.` : lang === "es" ? `${archiveCopy.series("02")} · Intercambio sobre procesos clave y gestion del sitio.` : `${archiveCopy.series("02")} · Echange autour des procedes cles et de la gestion de site.`,
    },
    {
      image: leoniVisitImg,
      tag: archiveCopy.tags.visit,
      company: "LEONI",
      title: lang === "zh" ? "德国总部领导来访" : lang === "en" ? "Headquarters delegation visit" : lang === "es" ? "Visita de la direccion de la sede alemana" : "Visite de la direction du siege allemand",
      desc: lang === "zh" ? `${archiveCopy.series("01")} · 围绕项目合作与供应能力进行交流。` : lang === "en" ? `${archiveCopy.series("01")} · Discussion on project collaboration and supply capability.` : lang === "es" ? `${archiveCopy.series("01")} · Intercambio sobre colaboracion de proyectos y capacidad de suministro.` : `${archiveCopy.series("01")} · Echange sur la cooperation projet et la capacite de fourniture.`,
    },
    {
      image: leoniVisitImg2,
      tag: archiveCopy.tags.visit,
      company: "LEONI",
      title: lang === "zh" ? "德国总部领导来访" : lang === "en" ? "Headquarters delegation visit" : lang === "es" ? "Visita de la direccion de la sede alemana" : "Visite de la direction du siege allemand",
      desc: lang === "zh" ? `${archiveCopy.series("02")} · 对接后续合作细节与现场安排。` : lang === "en" ? `${archiveCopy.series("02")} · Follow-up on cooperation details and on-site planning.` : lang === "es" ? `${archiveCopy.series("02")} · Seguimiento de detalles de cooperacion y coordinacion in situ.` : `${archiveCopy.series("02")} · Suivi des details de cooperation et de l'organisation sur site.`,
    },
    {
      image: expoGermanyImg,
      tag: archiveCopy.tags.expo,
      company: lang === "zh" ? "德国展会" : lang === "en" ? "Germany" : lang === "es" ? "Alemania" : "Allemagne",
      title: lang === "zh" ? "海外展会交流现场" : lang === "en" ? "Overseas exhibition exchange" : lang === "es" ? "Intercambio en feria internacional" : "Echanges lors d'un salon international",
      desc: lang === "zh" ? "德国展会现场留影，记录客户沟通与品牌展示。" : lang === "en" ? "Archive photo from a Germany trade fair, capturing customer conversations and brand presentation." : lang === "es" ? "Foto de archivo de una feria en Alemania con intercambios con clientes y presentacion de marca." : "Photo d'archive d'un salon en Allemagne illustrant les echanges clients et la presentation de la marque.",
    },
    {
      image: expoNetherlandsImg,
      tag: archiveCopy.tags.expo,
      company: lang === "zh" ? "荷兰展会" : lang === "en" ? "Netherlands" : lang === "es" ? "Paises Bajos" : "Pays-Bas",
      title: lang === "zh" ? "国际展会交流档案" : lang === "en" ? "International fair archive" : lang === "es" ? "Archivo de feria internacional" : "Archive salon international",
      desc: lang === "zh" ? `${archiveCopy.series("01")} · 记录海外市场交流与客户接待。` : lang === "en" ? `${archiveCopy.series("01")} · Overseas market exchange and visitor reception.` : lang === "es" ? `${archiveCopy.series("01")} · Intercambio con el mercado exterior y recepcion de clientes.` : `${archiveCopy.series("01")} · Echanges sur les marches internationaux et accueil des visiteurs.`,
    },
    {
      image: expoNetherlandsImg2,
      tag: archiveCopy.tags.expo,
      company: lang === "zh" ? "荷兰展会" : lang === "en" ? "Netherlands" : lang === "es" ? "Paises Bajos" : "Pays-Bas",
      title: lang === "zh" ? "国际展会交流档案" : lang === "en" ? "International fair archive" : lang === "es" ? "Archivo de feria internacional" : "Archive salon international",
      desc: lang === "zh" ? `${archiveCopy.series("02")} · 不同阶段的展位展示与洽谈场景。` : lang === "en" ? `${archiveCopy.series("02")} · Booth presentation and discussions from another moment of the event.` : lang === "es" ? `${archiveCopy.series("02")} · Escenas adicionales del stand y las conversaciones durante la feria.` : `${archiveCopy.series("02")} · Autre moment du salon montrant le stand et les echanges.`,
    },
    {
      image: expoNetherlandsImg3,
      tag: archiveCopy.tags.expo,
      company: lang === "zh" ? "荷兰展会" : lang === "en" ? "Netherlands" : lang === "es" ? "Paises Bajos" : "Pays-Bas",
      title: lang === "zh" ? "国际展会交流档案" : lang === "en" ? "International fair archive" : lang === "es" ? "Archivo de feria internacional" : "Archive salon international",
      desc: lang === "zh" ? `${archiveCopy.series("03")} · 保留历年国际客户沟通的现场记录。` : lang === "en" ? `${archiveCopy.series("03")} · Preserved on-site record of international customer conversations.` : lang === "es" ? `${archiveCopy.series("03")} · Registro historico de conversaciones con clientes internacionales.` : `${archiveCopy.series("03")} · Trace d'archives des echanges avec les clients internationaux.`,
    },
  ];
  const archiveDisplayItems = [
    ...archiveItems.filter((item) => item.company === "LEONI"),
    ...archiveItems.filter((item) => item.tag === archiveCopy.tags.visit && item.company !== "LEONI"),
    ...archiveItems.filter((item) => item.tag === archiveCopy.tags.audit),
    ...archiveItems.filter((item) => item.tag === archiveCopy.tags.expo),
  ];
  const [archiveActiveIdx, setArchiveActiveIdx] = useState(0);
  const activeArchiveItem = archiveDisplayItems[archiveActiveIdx] ?? archiveDisplayItems[0];
  const archivePrevIdx = archiveDisplayItems.length ? (archiveActiveIdx - 1 + archiveDisplayItems.length) % archiveDisplayItems.length : 0;
  const archiveNextIdx = archiveDisplayItems.length ? (archiveActiveIdx + 1) % archiveDisplayItems.length : 0;
  const prevArchiveItem = archiveDisplayItems[archivePrevIdx] ?? activeArchiveItem;
  const nextArchiveItem = archiveDisplayItems[archiveNextIdx] ?? activeArchiveItem;

  useEffect(() => {
    setArchiveActiveIdx(0);
  }, [lang]);

  useEffect(() => {
    if (selectedIdx !== null || archiveDisplayItems.length <= 1) return;
    const timer = window.setInterval(() => {
      setArchiveActiveIdx((current) => (current + 1) % archiveDisplayItems.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [archiveDisplayItems.length, selectedIdx]);

  if (selectedIdx !== null) {
    const a = articles[selectedIdx];
    return (
      <PageShell onBack={onBack} backLabel={t.backHome}>
        <div className="max-w-3xl mx-auto px-5 lg:px-0 py-20">
          <div className="mb-6">
            <span className="px-3 py-1 text-xs rounded-full bg-[#C8102E] text-white font-medium">{a.tag}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2F5E] mb-4 leading-snug" style={HF}>{a.title}</h1>
          <p className="text-sm text-gray-400 mb-8 flex items-center gap-1" style={MF}><Clock size={13} /> {a.date}</p>
          <div className="rounded-xl overflow-hidden mb-10">
            <img
              src={a.image}
              alt={a.title}
              className="w-full h-64 object-cover"
            />
          </div>
          <p className="text-gray-600 text-base leading-relaxed mb-5">{a.desc}</p>
          <a
            href={a.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C8102E] text-white font-bold hover:bg-[#A80D25] transition-colors mb-8"
            style={HF}
          >
            {t.readMore}
            <ArrowRight size={16} />
          </a>
          {t.newsDetail.paras.map((p, idx) => (
            <p key={idx} className={`text-gray-600 text-base leading-relaxed ${idx === t.newsDetail.paras.length - 1 ? "" : "mb-5"}`}>
              {p}
            </p>
          ))}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      <div className="bg-white border-b border-black/6 py-16 px-6 lg:px-12 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.newsTitle}</h1>
        <div className="w-10 h-0.5 bg-[#C8102E] mx-auto mb-5" />
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">{t.newsSub}</p>
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-black/8 bg-white overflow-hidden hover:border-[#C8102E]/25 hover:shadow-lg transition-all"
            >
              <div className="h-44 overflow-hidden bg-[#F0F4FB] relative">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 left-4">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-[#C8102E] text-white font-medium">{a.tag}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1" style={MF}><Clock size={11} /> {a.date}</p>
                <h3 className="text-base font-bold text-[#1B2F5E] mb-2 group-hover:text-[#C8102E] transition-colors leading-snug" style={HF}>{a.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{a.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-[#C8102E]" style={HF}>
                  {t.readMore} <ArrowRight size={13} />
                </div>
              </div>
            </a>
          ))}
        </div>

        <section className="mt-16 overflow-hidden rounded-[32px] border border-black/8 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)] py-6 md:py-8 lg:py-10 shadow-[0_18px_40px_rgba(27,47,94,0.05)]">
          <div className="px-6 md:px-8 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-[#1B2F5E]" style={HF}>{archiveCopy.title}</h2>
              </div>
            </div>
          </div>

          <div className="mt-5 px-6 md:px-8 lg:px-10">
            <div className="mx-auto max-w-[980px]">
              <div className="relative rounded-[28px] border border-black/8 bg-white px-4 py-5 md:px-6 md:py-6 shadow-[0_18px_42px_rgba(27,47,94,0.06)]">
                <div className="relative flex items-center justify-center overflow-hidden">
                  {prevArchiveItem && archiveDisplayItems.length > 1 && (
                    <div className="absolute left-0 top-1/2 hidden w-[20%] -translate-y-1/2 md:block">
                      <div className="aspect-[4/5] overflow-hidden rounded-[22px] border border-black/6 bg-[#EAF0F8] opacity-45 shadow-[0_12px_28px_rgba(27,47,94,0.08)]">
                        <ImageWithFallback
                          src={prevArchiveItem.image}
                          alt={`${prevArchiveItem.company} ${prevArchiveItem.title}`}
                          className="h-full w-full object-cover [filter:contrast(1.04)_saturate(1.03)_brightness(1.01)]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 w-full max-w-[720px]">
                    <div className="relative overflow-hidden rounded-[24px] border border-black/8 bg-[#EAF0F8] shadow-[0_20px_46px_rgba(27,47,94,0.1)]">
                      <div className="relative aspect-[16/10] md:aspect-[16/8]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${archiveActiveIdx}-${activeArchiveItem?.title ?? "archive"}`}
                            initial={{ opacity: 0.3, scale: 1.015 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.18, scale: 0.995 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="absolute inset-0"
                          >
                            {activeArchiveItem && (
                              <>
                                <ImageWithFallback
                                  src={activeArchiveItem.image}
                                  alt={`${activeArchiveItem.company} ${activeArchiveItem.title}`}
                                  className="h-full w-full object-cover [filter:contrast(1.05)_saturate(1.04)_brightness(1.015)]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.04)_22%,rgba(8,15,30,0.42)_100%)]" />
                                <div className="absolute left-4 top-4 md:left-5 md:top-5">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold text-white ${
                                      activeArchiveItem.tag === archiveCopy.tags.expo ? "bg-[#C8102E]" : activeArchiveItem.tag === archiveCopy.tags.visit ? "bg-[#1B2F5E]" : "bg-[#425A8B]"
                                    }`}
                                    style={MF}
                                  >
                                    {activeArchiveItem.tag}
                                  </span>
                                </div>
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {activeArchiveItem && (
                      <div className="mt-4 px-1 text-center">
                        <div className="text-sm font-bold text-[#1B2F5E] mb-1" style={HF}>{activeArchiveItem.company}</div>
                        <h3 className="text-lg md:text-[22px] font-black text-[#1B2F5E] leading-[1.3]" style={HF}>{activeArchiveItem.title}</h3>
                      </div>
                    )}
                  </div>

                  {nextArchiveItem && archiveDisplayItems.length > 1 && (
                    <div className="absolute right-0 top-1/2 hidden w-[20%] -translate-y-1/2 md:block">
                      <div className="aspect-[4/5] overflow-hidden rounded-[22px] border border-black/6 bg-[#EAF0F8] opacity-45 shadow-[0_12px_28px_rgba(27,47,94,0.08)]">
                        <ImageWithFallback
                          src={nextArchiveItem.image}
                          alt={`${nextArchiveItem.company} ${nextArchiveItem.title}`}
                          className="h-full w-full object-cover [filter:contrast(1.04)_saturate(1.03)_brightness(1.01)]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mx-auto mt-5 max-w-[720px]">
                  <div className="flex items-center gap-2">
                    {archiveDisplayItems.map((item, idx) => {
                      const active = idx === archiveActiveIdx;
                      return (
                        <button
                          key={`${item.company}-${item.title}-${idx}`}
                          type="button"
                          onClick={() => setArchiveActiveIdx(idx)}
                          aria-label={`${item.company} ${item.title}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            active ? "flex-[1.8] bg-[#C8102E]" : "flex-1 bg-[#D7DFEC] hover:bg-[#AEBBD0]"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </PageShell>
  );
}

// ─── Careers Page ─────────────────────────────────────────────────────────────

function CareersPage({ t, openings, onBack }: { t: Dict; openings: any[]; onBack: () => void }) {
  const benefitIcons = [Award, TrendingUp, Users];
  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      <div className="bg-white border-b border-black/6 py-16 px-6 lg:px-12 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.careersTitle}</h1>
        <div className="w-10 h-0.5 bg-[#C8102E] mx-auto mb-5" />
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">{t.careersSub}</p>
      </div>
      <div className="max-w-5xl mx-auto px-5 lg:px-10 py-16">
        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {t.careersPage.benefits.map((b, idx) => {
            const Icon = benefitIcons[idx] ?? Award;
            return (
            <div key={b.label} className="rounded-xl bg-white border border-black/8 p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/8 flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-[#C8102E]" />
              </div>
              <h3 className="font-bold text-[#1B2F5E] mb-1.5" style={HF}>{b.label}</h3>
              <p className="text-sm text-gray-500">{b.desc}</p>
            </div>
            );
          })}
        </div>

        {/* Job listings */}
        <h2 className="text-2xl font-bold text-[#1B2F5E] mb-6" style={HF}>{t.careersPage.openPositions}</h2>
        <div className="flex flex-col gap-3">
          {openings.map((job) => (
            <div
              key={job.title}
              className="group flex flex-wrap items-center gap-4 rounded-xl border border-black/8 bg-white px-6 py-5 hover:border-[#C8102E]/30 hover:shadow-md transition-all"
            >
              <span className="flex-shrink-0 px-3 py-1 text-xs rounded-full border border-[#C8102E]/30 text-[#C8102E] bg-[#C8102E]/5 font-medium">
                {job.dept}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1B2F5E] group-hover:text-[#C8102E] transition-colors" style={HF}>{job.title}</p>
              </div>
              <div className="flex items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={13} />{job.type}</span>
              </div>
              <button className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2 bg-[#C8102E] text-white rounded text-sm font-semibold hover:bg-[#A80D25] transition-colors" style={HF}>
                {t.applyNow} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage({ t, lang, onBack }: { t: Dict; lang: Lang; onBack: () => void }) {
  const mapAddress = MAP_NAV_ADDRESS[lang];
  const mapLinks = [
    { label: t.contactPage.mapActions.amap, href: MAP_NAV_LINKS.amap },
    { label: t.contactPage.mapActions.baidu, href: MAP_NAV_LINKS.baidu },
    { label: t.contactPage.mapActions.google, href: MAP_NAV_LINKS.google },
  ];
  const wechatIcons = [Users, Layers];
  const wechatSub = t.contactPage.wechatSub;
  const showWechatSub = typeof wechatSub === "string" && wechatSub.trim().length > 0;

  return (
    <PageShell onBack={onBack} backLabel={t.backHome}>
      <div className="bg-white border-b border-black/6 py-16 px-6 lg:px-12 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-[#1B2F5E] mb-4" style={HF}>{t.nav.contact}</h1>
        <div className="w-10 h-0.5 bg-[#C8102E] mx-auto mb-5" />
        <p className="text-gray-500 text-lg max-w-3xl mx-auto">{t.contactPage.tagline}</p>
      </div>
      <div className="max-w-5xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#1B2F5E] mb-6" style={HF}>{t.contactPage.contactTitle}</h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: MapPin, label: t.address },
                { icon: Mail, label: t.email },
                { icon: Phone, label: t.phone },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C8102E]/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#C8102E]" />
                  </div>
                  <span className="text-gray-600">{label}</span>
                </div>
              ))}
            </div>
            {/* Static map visual */}
            <div className="mt-10 rounded-xl overflow-hidden border border-black/8 bg-white">
              <div className="h-52 relative bg-[#E8EDF5]">
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`h${i}`} className="absolute left-0 right-0 border-t border-[#C8D0E0]/60"
                    style={{ top: `${(i + 1) * (100 / 7)}%` }} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-[#C8D0E0]/60"
                    style={{ left: `${(i + 1) * (100 / 9)}%` }} />
                ))}
                {/* Road lines */}
                <div className="absolute" style={{ top: "44%", left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.7)" }} />
                <div className="absolute" style={{ left: "55%", top: 0, bottom: 0, width: 6, background: "rgba(255,255,255,0.7)" }} />
                {/* Pin */}
                <div className="absolute" style={{ top: "36%", left: "52%" }}>
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#C8102E] flex items-center justify-center shadow-lg">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="w-0.5 h-3 bg-[#C8102E]" />
                    <div className="w-1.5 h-0.5 rounded-full bg-[#C8102E]/50" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md border border-black/8">
                  <div className="text-xs font-bold text-[#1B2F5E]" style={HF}>{t.contactPage.mapCompany}</div>
                  <div className="text-[10px] text-gray-400" style={MF}>{t.contactPage.mapDistrict}</div>
                </div>
                {/* Scale bar */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                  <div className="w-8 h-0.5 bg-gray-400" />
                  <span className="text-[9px] text-gray-400" style={MF}>500m</span>
                </div>
              </div>
              <div className="border-t border-black/8 p-5 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFF_100%)]">
                <div className="text-[11px] tracking-[0.24em] uppercase text-[#C8102E] mb-2" style={MF}>{t.contactPage.mapAddressTitle}</div>
                <div className="text-sm font-bold text-[#1B2F5E] mb-1" style={HF}>{mapAddress}</div>
                <p className="text-xs text-gray-500 leading-6 mb-4">{t.contactPage.mapAddressDesc}</p>
                <div className="flex flex-wrap gap-3">
                  {mapLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/8 bg-white text-sm font-semibold text-[#1B2F5E] hover:border-[#1B2F5E]/20 hover:text-[#C8102E] hover:shadow-sm transition-all"
                      style={HF}
                    >
                      {item.label}
                      <ArrowRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-black/8 bg-white p-8">
            <h2 className="text-xl font-bold text-[#1B2F5E] mb-6" style={HF}>{t.contactPage.formTitle}</h2>
            <div className="flex flex-col gap-4">
              {t.contactPage.placeholders.map((ph) => (
                <input
                  key={ph}
                  placeholder={ph}
                  className="w-full px-4 py-3 rounded-lg border border-black/10 text-sm outline-none focus:border-[#C8102E]/40 bg-[#F8FAFF] transition-colors"
                  style={BF}
                />
              ))}
              <textarea
                placeholder={t.contactPage.messagePlaceholder}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-black/10 text-sm outline-none focus:border-[#C8102E]/40 bg-[#F8FAFF] resize-none transition-colors"
                style={BF}
              />
              <button className="w-full py-3.5 bg-[#C8102E] hover:bg-[#A80D25] text-white font-bold rounded transition-colors flex items-center justify-center gap-2" style={HF}>
                {t.contactPage.send} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-black/8">
          <div className="text-center mb-10">
            <h2 className={`text-2xl md:text-3xl font-black text-[#1B2F5E] max-w-3xl mx-auto leading-snug ${showWechatSub ? "mb-3" : "mb-0"}`} style={HF}>{t.contactPage.wechatTitle}</h2>
            {showWechatSub && <p className="text-gray-500 max-w-2xl mx-auto">{wechatSub}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-[560px] mx-auto">
            {t.contactPage.wechatCards.map((item, idx) => {
              const Icon = wechatIcons[idx] ?? Users;
              const qrPath = WECHAT_QR_PATHS[idx];
              return (
                <div key={item.title} className="rounded-none border border-black/8 bg-white p-6 text-center">
                  <div className="w-[132px] h-[132px] mx-auto rounded-none bg-white border border-[#DCE4EF] overflow-hidden flex items-center justify-center shadow-[0_10px_26px_rgba(27,47,94,0.05)] mb-5">
                    <img
                      src={qrPath}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const next = target.nextElementSibling as HTMLDivElement | null;
                        if (next) next.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F8FC_100%)]">
                      <Icon size={26} className="text-[#C8102E]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2F5E] mb-2" style={HF}>{item.title}</h3>
                  <p className="text-sm font-semibold text-[#1B2F5E]" style={HF}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Offices */}
        <div className="mt-16 pt-16 border-t border-black/8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#C8102E]" />
            <span className="text-xs text-[#C8102E] tracking-[0.25em] uppercase font-medium" style={MF}>{t.contactPage.officesEyebrow}</span>
          </div>
          <h2 className="text-2xl font-black text-[#1B2F5E] mb-8" style={HF}>{t.contactPage.officesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.contactPage.offices.map((o) => (
              <div key={o.city} className="rounded-xl bg-[#F8FAFF] border border-black/8 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={15} className="text-[#C8102E]" />
                  <span className="font-black text-[#1B2F5E] text-sm" style={HF}>{o.city}</span>
                </div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#C8102E]/8 text-[#C8102E] mb-3 font-medium" style={MF}>{o.role}</span>
                <p className="text-xs text-gray-500 mb-2 flex items-start gap-1.5"><MapPin size={11} className="flex-shrink-0 mt-0.5" />{o.addr}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5"><Phone size={11} />{o.tel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function CustomerServiceWidget({
  lang,
  phone,
  email,
  onNavigate,
}: {
  lang: Lang;
  phone: string;
  email: string;
  onNavigate: (s: NavState) => void;
}) {
  const copy = CUSTOMER_SERVICE[lang];
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(760);
  const [draft, setDraft] = useState("");
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    { role: "assistant", text: copy.welcome },
  ]);

  useEffect(() => {
    setMessages([{ role: "assistant", text: copy.welcome }]);
    setDraft("");
    setShowProductPicker(false);
  }, [copy.welcome]);

  useEffect(() => {
    let frameId = 0;
    const updateViewportHeight = () => {
      const nextHeight = Math.round(window.visualViewport?.height ?? window.innerHeight);
      setViewportHeight((prev) => (prev === nextHeight ? prev : nextHeight));
      frameId = 0;
    };
    const scheduleViewportUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateViewportHeight);
    };
    updateViewportHeight();
    window.addEventListener("resize", scheduleViewportUpdate);
    window.visualViewport?.addEventListener("resize", scheduleViewportUpdate);
    window.visualViewport?.addEventListener("scroll", scheduleViewportUpdate);
    return () => {
      window.removeEventListener("resize", scheduleViewportUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleViewportUpdate);
      window.visualViewport?.removeEventListener("scroll", scheduleViewportUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "0px";
    textarea.style.height = `${Math.max(88, Math.min(textarea.scrollHeight, 168))}px`;
  }, [draft, open, minimized]);

  const openContactPage = () => {
    onNavigate({ page: "contact", industryIdx: null, articleIdx: null, productIdx: null });
    setOpen(false);
  };

  const askPrompt = (label: string, reply: string) => {
    const isProductSelection = label === copy.prompts[0]?.label;
    setShowProductPicker(isProductSelection);
    setMessages((prev) => [...prev, { role: "user", text: label }, { role: "assistant", text: reply }]);
  };

  const productPickerTitle = lang === "zh"
    ? "请选择具体产品"
    : lang === "en"
      ? "Choose a Product"
      : lang === "es"
        ? "Seleccione un Producto"
        : "Choisir un produit";
  const productPickerNote = lang === "zh"
    ? "点击产品名称后，会自动带入下方输入框，方便继续补充需求。"
    : lang === "en"
      ? "Click a product name to place it into the input box for further editing."
      : lang === "es"
        ? "Haga clic en un producto para colocarlo en el cuadro de entrada y seguir editando."
        : "Cliquez sur un produit pour l'insérer dans le champ de saisie et poursuivre votre demande.";
  const productPickerAck = lang === "zh"
    ? "已将产品带入输入框，您可继续补充厚度、温度、应用场景等要求。"
    : lang === "en"
      ? "The product has been inserted into the input box. You can continue with thickness, temperature, or application requirements."
      : lang === "es"
        ? "El producto ya se agregó al cuadro de entrada. Puede continuar con espesor, temperatura o requisitos de aplicación."
        : "Le produit a été inséré dans le champ. Vous pouvez maintenant préciser l'épaisseur, la température ou le contexte d'application.";
  const openProductFromChat = (productIdx: number) => {
    const product = products[productIdx];
    const productName = lang === "zh" ? product.name : lang === "en" ? product.nameEn : lang === "es" ? product.nameEs : product.nameFr;
    setMessages((prev) => [...prev, { role: "user", text: productName }, { role: "assistant", text: productPickerAck }]);
    setShowProductPicker(false);
    setDraft((prev) => {
      const template = lang === "zh"
        ? `产品：${productName}\n需求：`
        : lang === "en"
          ? `Product: ${productName}\nRequirements: `
          : lang === "es"
            ? `Producto: ${productName}\nRequisitos: `
            : `Produit : ${productName}\nBesoin : `;
      return prev.trim() ? `${prev.trim()}\n${template}` : template;
    });
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      const len = textareaRef.current?.value.length ?? 0;
      textareaRef.current?.setSelectionRange(len, len);
    });
  };

  const sendDraft = () => {
    const content = draft.trim();
    if (!content) {
      setMessages((prev) => [...prev, { role: "assistant", text: copy.empty }]);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: content }, { role: "assistant", text: copy.ack }]);
    setDraft("");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(content)}`;
  };

  const handleDraftKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendDraft();
    }
  };

  const quickActions = [
    { label: copy.actions.phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    { label: copy.actions.email, href: `mailto:${email}` },
  ];
  const latestAssistantMessage = [...messages].reverse().find((message) => message.role === "assistant")?.text ?? copy.welcome;
  const recentUserMessage = [...messages].reverse().find((message) => message.role === "user")?.text;
  const chatPanelMaxHeight = Math.max(360, Math.min(viewportHeight - 72, 560));
  const minimizedHint = lang === "zh"
    ? "聊天已最小化，可随时继续沟通"
    : lang === "en"
      ? "Chat minimized, continue anytime"
      : lang === "es"
        ? "Chat minimizado, puede continuar en cualquier momento"
        : "Conversation réduite, vous pouvez reprendre à tout moment";
  const reopenLabel = lang === "zh" ? "继续沟通" : lang === "en" ? "Resume Chat" : lang === "es" ? "Continuar" : "Reprendre";
  const handleLauncherClick = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setMinimized(false);
  };

  return (
    <div
      className="fixed right-2 md:right-4 z-[80]"
      style={{ bottom: "max(10px, calc(env(safe-area-inset-bottom, 0px) + 10px))" }}
    >
      <AnimatePresence>
        {open && minimized && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-2.5 w-[264px] max-w-[calc(100vw-0.75rem)] rounded-[20px] border border-[#1B2F5E]/10 bg-white px-3.5 py-3 shadow-[0_16px_42px_rgba(27,47,94,0.12)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8102E]/10 text-[#C8102E] flex-shrink-0">
                <MessageCircle size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-[#1B2F5E]" style={HF}>{copy.title}</div>
                <div className="text-xs text-gray-500 truncate">{minimizedHint}</div>
              </div>
              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="inline-flex items-center justify-center rounded-full border border-black/8 bg-[#F8FAFF] px-3 py-1.5 text-xs font-semibold text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E] transition-colors"
                style={HF}
              >
                {reopenLabel}
              </button>
            </div>
          </motion.div>
        )}

        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-2.5 flex w-[348px] max-w-[calc(100vw-0.75rem)] flex-col rounded-[22px] border border-[#1B2F5E]/10 bg-white shadow-[0_20px_56px_rgba(27,47,94,0.14)] overflow-hidden"
            style={{ maxHeight: `${chatPanelMaxHeight}px` }}
          >
            <div className="px-4 py-3.5 bg-[linear-gradient(135deg,#18305F_0%,#24457E_100%)] text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-9 h-9 rounded-full bg-white/12 border border-white/15 flex items-center justify-center">
                      <MessageCircle size={17} />
                    </span>
                    <div>
                      <h3 className="text-base font-black leading-none mb-1" style={HF}>{copy.title}</h3>
                      <p className="text-xs text-white/72" style={MF}>{copy.status}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-white/78 mt-2.5 leading-5 max-w-[220px]">{copy.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMinimized(true)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/16 flex items-center justify-center transition-colors"
                    aria-label={lang === "zh" ? "最小化聊天框" : lang === "en" ? "Minimize chat" : lang === "es" ? "Minimizar chat" : "Réduire la fenêtre"}
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/16 flex items-center justify-center transition-colors"
                    aria-label={copy.button}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-3.5 bg-[linear-gradient(180deg,#F8FAFF_0%,#FFFFFF_100%)]">
              <div className="rounded-[18px] border border-[#1B2F5E]/8 bg-white px-3.5 py-3.5 mb-3">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#C8102E] mb-3" style={MF}>
                  <Shield size={12} />
                  {copy.title}
                </div>
                <p className="text-sm leading-6 text-[#66758A]">{latestAssistantMessage}</p>
                {recentUserMessage && (
                  <div className="mt-3 rounded-2xl bg-[#F4F7FC] px-3 py-2.5 text-xs text-[#1B2F5E]" style={MF}>
                    {recentUserMessage}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 mb-3">
                {copy.prompts.slice(0, 2).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => askPrompt(item.label, item.reply)}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#1B2F5E]/8 bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-[#1B2F5E] hover:border-[#C8102E]/25 hover:text-[#C8102E] transition-colors"
                    style={HF}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={15} className="flex-shrink-0" />
                  </button>
                ))}
              </div>

              {showProductPicker && (
                <div className="mb-3 rounded-[18px] border border-[#1B2F5E]/8 bg-white p-3">
                  <div className="text-[11px] tracking-[0.18em] uppercase text-[#C8102E] mb-2" style={MF}>{productPickerTitle}</div>
                  <p className="text-xs text-gray-500 leading-5 mb-3">{productPickerNote}</p>
                  <div className="flex flex-wrap gap-2">
                    {products.map((product, idx) => (
                      <button
                        key={product.name}
                        type="button"
                        onClick={() => openProductFromChat(idx)}
                        className="rounded-full border border-[#1B2F5E]/8 bg-[#F8FAFF] px-3 py-1.5 text-xs font-semibold text-[#1B2F5E] hover:border-[#C8102E]/20 hover:text-[#C8102E] transition-colors"
                        style={HF}
                      >
                        {lang === "zh" ? product.name : lang === "en" ? product.nameEn : lang === "es" ? product.nameEs : product.nameFr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center justify-center px-3 py-2.5 rounded-2xl border border-[#1B2F5E]/8 bg-white text-xs font-semibold text-[#1B2F5E] hover:border-[#C8102E]/25 hover:text-[#C8102E] transition-colors"
                    style={HF}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="rounded-[18px] border border-[#1B2F5E]/8 bg-white p-3">
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleDraftKeyDown}
                  rows={4}
                  placeholder={copy.placeholder}
                  className="w-full min-h-[88px] resize-none bg-transparent px-1 py-1 text-sm leading-6 outline-none placeholder:text-[#A3ADBA]"
                  style={BF}
                />
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-black/6 pt-3">
                  <div>
                    <button
                      onClick={openContactPage}
                      className="text-xs font-semibold text-[#1B2F5E] hover:text-[#C8102E] transition-colors"
                      style={HF}
                    >
                      {copy.actions.contact}
                    </button>
                    <div className="mt-1 text-[11px] text-gray-400">
                      {lang === "zh" ? "回车发送，Shift + Enter 换行" : lang === "en" ? "Enter to send, Shift + Enter for newline" : lang === "es" ? "Enter para enviar, Shift + Enter para salto de línea" : "Entrée pour envoyer, Maj + Entrée pour un saut de ligne"}
                    </div>
                  </div>
                  <button
                    onClick={sendDraft}
                    className="inline-flex items-center justify-center px-3.5 py-2 rounded-full bg-[#C8102E] hover:bg-[#A80D25] text-white text-xs font-bold transition-colors"
                    style={HF}
                  >
                    {copy.send}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleLauncherClick}
        className="ml-auto inline-flex items-center gap-2.5 rounded-full bg-[#C8102E] hover:bg-[#A80D25] text-white shadow-[0_14px_34px_rgba(200,16,46,0.22)] px-3.5 py-2.5 transition-all"
        style={HF}
      >
        <span className="w-9 h-9 rounded-full bg-white/14 flex items-center justify-center">
          <MessageCircle size={18} />
        </span>
        <span className="text-sm font-bold pr-1">{copy.button}</span>
      </button>
    </div>
  );
}


// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ t, lang, onNavigate }: { t: Dict; lang: Lang; onNavigate: (s: NavState) => void }) {
  const go = (page: PageKey) => onNavigate({ page, industryIdx: null, articleIdx: null });
  const goProduct = (productIdx: number) => onNavigate({ page: "materials", industryIdx: null, articleIdx: null, productIdx });
  const pick = <T,>(zh: T, en: T, es: T, fr: T) => (lang === "zh" ? zh : lang === "en" ? en : lang === "es" ? es : fr);
  const footerLayout = {
    zh: {
      grid: "grid grid-cols-1 md:grid-cols-[1.15fr_0.8fr_0.98fr_1fr] gap-10 lg:gap-12 mb-12 items-start",
      productColumn: "md:-ml-4",
      productList: "grid grid-cols-2 gap-x-3 gap-y-2.5 max-w-[236px]",
    },
    en: {
      grid: "grid grid-cols-1 md:grid-cols-[1.08fr_0.72fr_1.16fr_1fr] gap-10 lg:gap-12 mb-12 items-start",
      productColumn: "",
      productList: "grid grid-cols-1 gap-y-2.5 max-w-[320px]",
    },
    es: {
      grid: "grid grid-cols-1 md:grid-cols-[1.08fr_0.72fr_1.24fr_1fr] gap-10 lg:gap-12 mb-12 items-start",
      productColumn: "",
      productList: "grid grid-cols-1 gap-y-2.5 max-w-[360px]",
    },
    fr: {
      grid: "grid grid-cols-1 md:grid-cols-[1.08fr_0.72fr_1.26fr_1fr] gap-10 lg:gap-12 mb-12 items-start",
      productColumn: "",
      productList: "grid grid-cols-1 gap-y-2.5 max-w-[360px]",
    },
  } as const;
  const footerUi = footerLayout[lang];
  return (
    <footer className="bg-[#F8FAFF] border-t border-black/8">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-8">
        <div className={footerUi.grid}>
          <div className="md:pr-2 text-center">
            <p className="text-[18px] font-bold text-[#5F6F8F] leading-relaxed mb-2" style={HF}>{t.companyFull}</p>
            <p className="text-[15px] text-gray-400 leading-7 max-w-[280px] mx-auto">{t.footerTagline}</p>
            <div className="mt-8 flex items-start justify-center gap-6">
              {t.contactPage.wechatCards.map((item, idx) => {
                const qrPath = WECHAT_QR_PATHS[idx];
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-[108px] h-[108px] mx-auto rounded-none bg-white border border-[#DCE4EF] overflow-hidden flex items-center justify-center shadow-[0_8px_20px_rgba(27,47,94,0.04)]">
                      <img
                        src={qrPath}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-3 text-[13px] font-bold text-[#5F6F8F] leading-5 text-center" style={HF}>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#1B2F5E] mb-5" style={HF}>{t.footer.navHeading}</h4>
            <ul className="flex flex-col gap-3.5">
              {([
                { page: "about" as PageKey, label: t.nav.about },
                { page: "materials" as PageKey, label: t.nav.products },
                { page: "fire" as PageKey, label: t.nav.solutions },
                { page: "industries" as PageKey, label: t.nav.industries },
                { page: "news" as PageKey, label: t.nav.news },
                { page: "careers" as PageKey, label: t.nav.careers },
              ]).map(({ page, label }) => (
                <li key={page}>
                  <button onClick={() => go(page)} className="text-[15px] font-semibold text-[#6B7892] hover:text-[#1B2F5E] transition-colors" style={HF}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={footerUi.productColumn}>
            <h4 className="text-[18px] font-bold text-[#1B2F5E] mb-5" style={HF}>{t.nav.products}</h4>
            <ul className={footerUi.productList}>
              {products.map((item, idx) => (
                <li key={item.name}>
                  <button onClick={() => goProduct(idx)} className="text-[15px] font-normal text-[#6B7892] hover:text-[#1B2F5E] transition-colors text-left leading-6" style={HF}>
                    {pick(item.name, item.nameEn, item.nameEs, item.nameFr)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] font-bold text-[#1B2F5E] mb-5" style={HF}>{t.footer.contactHeading}</h4>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: MapPin, text: t.address },
                { Icon: Mail, text: t.email },
                { Icon: Phone, text: t.phone },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[15px] text-[#6B7892] leading-7">
                  <Icon size={14} className="text-[#C8102E] flex-shrink-0 mt-1" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">{t.copyright}</p>
          <div className="flex gap-4">
            {(["zh", "en", "es", "fr"] as Lang[]).map((l) => (
              <span key={l} className="text-xs text-gray-400 cursor-pointer hover:text-[#1B2F5E] transition-colors" style={MF}>{l.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App (Router) ─────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>("zh");
  const [navState, setNavState] = useState<NavState>({ page: "home", industryIdx: null, articleIdx: null, productIdx: null, materialsListPage: 1 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const materialsListScrollRef = useRef(0);
  const materialsListPageRef = useRef(1);
  const industriesListScrollRef = useRef(0);
  const restoreMaterialsListScrollRef = useRef(false);
  const restoreIndustriesListScrollRef = useRef(false);
  const skipNextScrollResetRef = useRef(false);
  const [introComplete, setIntroComplete] = useState(() => {
    try { return sessionStorage.getItem("ds_intro") === "1"; } catch { return false; }
  });

  const { data: apiProducts } = useProducts();
  const { data: apiIndustries } = useIndustries();
  const { data: apiNews } = useNews();
  const { data: apiPartners } = usePartners();
  const { data: apiCareers } = useCareers();
  const { data: apiI18n } = useI18n();

  const products = useMemo(
    () => FALLBACK_PRODUCT_DATA,
    []
  );

  const translations = useMemo<Record<Lang, any>>(() => {
    if (!apiI18n) return FALLBACK_TRANSLATIONS as any;
    return (["zh", "en", "es", "fr"] as Lang[]).reduce((acc, lg) => {
      (acc as any)[lg] = deepMerge((FALLBACK_TRANSLATIONS as any)[lg], (apiI18n as any)[lg]);
      return acc;
    }, {} as any);
  }, [apiI18n]);

  const t = translations[lang];

  const industryDetails = useMemo(() => {
    const fallback = {
      zh: FALLBACK_INDUSTRY_DETAIL_ZH,
      en: FALLBACK_INDUSTRY_DETAIL_EN,
      es: FALLBACK_INDUSTRY_DETAIL_ES,
      fr: FALLBACK_INDUSTRY_DETAIL_FR,
    };
    if (!apiIndustries || !apiIndustries.length) return fallback;
    const zh: any = {}, en: any = {}, es: any = {}, fr: any = {};
    apiIndustries.forEach((it: any) => {
      const key = it.id || it.cat;
      if (!key) return;
      zh[key] = it.detail?.zh ?? fallback.zh[key as keyof typeof fallback.zh];
      en[key] = it.detail?.en ?? fallback.en[key as keyof typeof fallback.en];
      es[key] = it.detail?.es ?? fallback.es[key as keyof typeof fallback.es];
      fr[key] = it.detail?.fr ?? fallback.fr[key as keyof typeof fallback.fr];
    });
    return {
      zh: { ...fallback.zh, ...zh },
      en: { ...fallback.en, ...en },
      es: { ...fallback.es, ...es },
      fr: { ...fallback.fr, ...fr },
    };
  }, [apiIndustries]);

  const articles = useMemo(() => {
    const base: any[] =
      apiNews && apiNews.length
        ? apiNews.map((n: any) => ({
            date: n.date?.[lang] ?? (Object.values(n.date || {})[0] as any),
            tag: n.tag?.[lang] ?? "",
            title: n.title?.[lang] ?? "",
            desc: n.desc?.[lang] ?? "",
            image: n.image ?? "",
            href: n.href ?? "",
            _raw: n,
          }))
        : (t.articles ?? []);
    const need = 3 - base.length;
    return need > 0 ? [...base, ...(t.articles?.slice?.(0, need) ?? [])] : base.slice(0, 3);
  }, [apiNews, lang, t]);

  const partnersList = useMemo(
    () => FALLBACK_PARTNERS,
    []
  );

  const openings = useMemo(
    () =>
      apiCareers && apiCareers.length
        ? apiCareers.map((j: any) => ({
            dept: j.dept?.[lang] ?? "",
            title: j.title?.[lang] ?? "",
            location: j.location?.[lang] ?? "",
            type: j.type?.[lang] ?? "",
            _raw: j,
          }))
        : (t.jobs ?? []),
    [apiCareers, lang, t]
  );

  const searchIndex = useMemo(() => buildSearchIndex(t, lang, products, articles), [t, lang, products, articles]);
  const backToTopLabel = lang === "zh" ? "回到顶部" : lang === "en" ? "Back to top" : lang === "es" ? "Volver arriba" : "Retour en haut";

  const handleIntroComplete = useCallback(() => {
    try { sessionStorage.setItem("ds_intro", "1"); } catch { /* ignore */ }
    setIntroComplete(true);
  }, []);

  const navigate = useCallback((s: NavState) => {
    setShowBackToTop(false);
    setNavState({
      page: s.page,
      industryIdx: s.industryIdx ?? null,
      articleIdx: s.articleIdx ?? null,
      productIdx: s.productIdx ?? null,
      materialsListPage: s.materialsListPage ?? (s.page === "materials" && (s.productIdx ?? null) === null ? 1 : null),
    });
    if (skipNextScrollResetRef.current) {
      skipNextScrollResetRef.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: s.page === "about" ? "auto" : "smooth" });
  }, []);

  const goHome = useCallback(() => navigate({ page: "home", industryIdx: null, articleIdx: null, productIdx: null }), [navigate]);
  const openMaterialDetail = useCallback((productIdx: number) => {
    if (navState.page === "materials" && navState.productIdx === null) {
      materialsListScrollRef.current = window.scrollY;
      materialsListPageRef.current = navState.materialsListPage ?? 1;
    }
    navigate({ page: "materials", industryIdx: null, articleIdx: null, productIdx, materialsListPage: navState.materialsListPage ?? materialsListPageRef.current });
  }, [navigate, navState.materialsListPage, navState.page, navState.productIdx]);
  const backToMaterialsList = useCallback(() => {
    restoreMaterialsListScrollRef.current = true;
    skipNextScrollResetRef.current = true;
    navigate({ page: "materials", industryIdx: null, articleIdx: null, productIdx: null, materialsListPage: navState.materialsListPage ?? materialsListPageRef.current });
  }, [navigate, navState.materialsListPage]);
  const openIndustryDetail = useCallback((industryIdx: number) => {
    if (navState.page === "industries" && navState.industryIdx === null) {
      industriesListScrollRef.current = window.scrollY;
    }
    navigate({ page: "industries", industryIdx, articleIdx: null, productIdx: null });
  }, [navigate, navState.industryIdx, navState.page]);
  const backToIndustriesList = useCallback(() => {
    restoreIndustriesListScrollRef.current = true;
    skipNextScrollResetRef.current = true;
    navigate({ page: "industries", industryIdx: null, articleIdx: null, productIdx: null });
  }, [navigate]);

  useEffect(() => {
    applyRuntimeSecurityHardening();
  }, [lang, navState.page]);

  useEffect(() => {
    if (navState.page !== "materials" || navState.productIdx !== null || !restoreMaterialsListScrollRef.current) return;
    restoreMaterialsListScrollRef.current = false;
    requestAnimationFrame(() => {
      window.scrollTo({ top: materialsListScrollRef.current, behavior: "auto" });
    });
  }, [navState.page, navState.productIdx]);

  useEffect(() => {
    if (navState.page !== "industries" || navState.industryIdx !== null || !restoreIndustriesListScrollRef.current) return;
    restoreIndustriesListScrollRef.current = false;
    requestAnimationFrame(() => {
      window.scrollTo({ top: industriesListScrollRef.current, behavior: "auto" });
    });
  }, [navState.industryIdx, navState.page]);

  useEffect(() => {
    let frameId = 0;
    const updateBackToTop = () => {
      const next = window.scrollY > 260;
      setShowBackToTop((prev) => (prev === next ? prev : next));
      frameId = 0;
    };
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateBackToTop);
    };
    updateBackToTop();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderPage = () => {
    const { page, industryIdx = null, articleIdx = null } = navState;
    switch (page) {
      case "home":
        return (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <HomePage t={t} lang={lang} onNavigate={navigate} partnersList={partnersList} articles={articles} />
          </motion.div>
        );
      case "about":
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <AboutPage t={t} onBack={goHome} />
          </motion.div>
        );
      case "materials":
        return <MaterialsPage key={`materials-${navState.productIdx ?? "list"}-${navState.materialsListPage ?? 1}`} t={t} lang={lang} products={products} selectedProductIdx={navState.productIdx ?? null} currentListPage={navState.materialsListPage ?? 1} onNavigate={navigate} onBack={goHome} onOpenProductDetail={openMaterialDetail} onBackToProductList={backToMaterialsList} />;
      case "fire":
        return <FireSafetyPage key="fire" t={t} onBack={goHome} />;
      case "industries":
        return <IndustriesPage key={`industries-${industryIdx ?? "list"}`} t={t} industryDetail={industryDetails[lang]} selectedIdx={industryIdx} onBack={goHome} onBackToIndustryList={backToIndustriesList} onOpenIndustryDetail={openIndustryDetail} />;
      case "news":
        return <NewsPage key="news" t={t} lang={lang} articles={articles} selectedIdx={articleIdx} onBack={goHome} />;
      case "careers":
        return <CareersPage key="careers" t={t} openings={openings} onBack={goHome} />;
      case "contact":
        return <ContactPage key="contact" t={t} lang={lang} onBack={goHome} />;
      default:
        return null;
    }
  };

  return (
    <div style={BF} className="min-h-screen bg-white text-foreground">
      {!introComplete && <LaunchIntro onComplete={handleIntroComplete} companyFull={t.companyFull} tagline={t.launch.tagline} lang={lang} />}

      <div
        style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.6s ease" }}
        className="min-h-screen flex flex-col"
      >
        <Navbar
          lang={lang}
          setLang={setLang}
          nav={t.nav}
          searchCopy={t.search}
          searchIndex={searchIndex}
          onNavigate={navigate}
          currentPage={navState.page}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>

        {navState.page === "home" && <Footer t={t} lang={lang} onNavigate={navigate} />}
        {navState.page !== "home" && (
          <footer className="bg-[#F8FAFF] border-t border-black/8 text-center py-5">
            <p className="text-xs text-gray-400">{t.copyright}</p>
          </footer>
        )}

        <AnimatePresence>
          {introComplete && showBackToTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label={backToTopLabel}
              title={backToTopLabel}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="fixed right-4 bottom-24 md:right-6 md:bottom-28 z-[75] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1B2F5E]/10 bg-white text-[#1B2F5E] shadow-[0_16px_36px_rgba(27,47,94,0.14)] hover:-translate-y-0.5 hover:border-[#C8102E]/18 hover:text-[#C8102E] transition-all"
            >
              <ChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <CustomerServiceWidget lang={lang} phone={t.phone} email={t.email} onNavigate={navigate} />
      </div>
    </div>
  );
}
