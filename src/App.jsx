import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import {
  MapPin, CloudRain, X, BookOpen, Building, DollarSign,
  CheckCircle2, AlertTriangle, ShieldAlert, ThermometerSun, Snowflake, Cloud,
  ShieldCheck, Briefcase, GraduationCap as Career, Coffee, Bus, Home, BookCheck, Users, LineChart,
  Utensils, ShoppingCart, Info, Wind
} from 'lucide-react';

// ข้อมูลอัปเดตโครงสร้างใหม่ คำนวณค่าครองชีพแบบ Base on Cooking 100%
const universitiesData = [
  {
    id: 'belfast',
    name: "Queen's University Belfast",
    courseCategory: "Food Safety",
    rent: 580,
    living: 280, // Cook 160 + Transport 45 + Misc 75
    weatherVibe: "ฝนตกบ่อย ลมแรง ฤดูหนาวไม่หนาวจัด",
    cityVibe: "เมืองขนาดกลาง ผู้คนเป็นมิตรมาก สงบ ปลอดภัย ค่าครองชีพถูก",
    details: {
      cost: {
        shared: { price: "£360 / เดือน (£90/สัปดาห์)", desc: "มักเป็นบ้านแถวย่าน Holylands หรือ Stranmillis ต้องจ่ายบิลแยกต่างหาก" },
        ensuite: { price: "£580 / เดือน (£145/สัปดาห์)", desc: "หอในของมหาลัย (Elms BT1/BT2) ถือว่าคุ้มค่ามากและรวมบิลค่าน้ำไฟเน็ตแล้ว" },
        studio: { price: "£800 / เดือน (£200/สัปดาห์)", desc: "ได้ความเป็นส่วนตัวสูง มีครัวและห้องน้ำในตัว เหมาะสำหรับคนชอบความเงียบ" },
        food: {
          cooking: {
            price: "£160 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£1.7)",
            desc: "การซื้อของสดที่ Lidl, Asda หรือ Tesco สาขาใหญ่ รวมถึง St George's Market ทำอาหารทานเองทุกมื้อจะประหยัดเงินได้สูงสุด"
          },
          eatingOut: {
            price: "£1,170 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£13)",
            desc: "หากทานร้านอาหารหรือซื้อของกินสำเร็จรูปทุกมื้อ ค่าใช้จ่ายจะพุ่งสูงมาก (มื้อเที่ยงแบบประหยัด £5 + มื้อเย็นร้านอาหาร £15-£20)"
          }
        },
        transport: "£45 / เดือน (เมืองมีขนาดกะทัดรัด นักศึกษาส่วนใหญ่ใช้วิธีเดินเป็นหลัก หรือนั่งรถบัส Translink ที่มีตั๋วราคานักศึกษา)"
      },
      weather: {
        overview: "ได้รับอิทธิพลจากทะเล (Oceanic climate) อากาศค่อนข้างแปรปรวนในหนึ่งวันอาจเจอทั้งฝน แดด และลม",
        spring: "มี.ค.-พ.ค. (5-14°C): อากาศเริ่มอุ่นขึ้น ดอกไม้เริ่มบาน แต่ยังต้องพกร่มและใส่เสื้อแจ็คเก็ตกันลมเสมอ",
        summer: "มิ.ย.-ส.ค. (11-19°C): เป็นช่วงที่อากาศดีที่สุด อุ่นสบาย ไม่ร้อนจัด แดดออกเยอะ กลางวันยาวนานถึง 4-5 ทุ่ม",
        autumn: "ก.ย.-พ.ย. (7-14°C): ใบไม้เปลี่ยนสีสวยงาม แต่ลมจะเริ่มแรงขึ้นมากและมีฝนตกชุก เตรียมเสื้อกันฝนแบบมีฮู้ดให้พร้อม",
        winter: "ธ.ค.-ก.พ. (2-8°C): มืดเร็วมาก (ประมาณ 4 โมงเย็น) หนาวชื้น หิมะตกน้อยมากแต่น้ำค้างแข็ง (Frost) พบบ่อย"
      },
      study: {
        focus: "เน้น Food Integrity (ความซื่อสัตย์ในห่วงโซ่อาหาร) และการตรวจสอบย้อนกลับ (Traceability) มีสถาบัน Institute for Global Food Security (IGFS) เป็นผู้นำ",
        support: "อาจารย์เข้าถึงง่าย (Open-door policy) เป็นกันเอง การสอนใช้ระบบผสมผสานระหว่างบรรยาย การลงมือทำแล็บ และการถกเถียง (Discussion)",
        prep: "ควรเตรียมทบทวน Food Microbiology, ระบบ HACCP และเคมีวิเคราะห์ สำเนียงท้องถิ่น (Northern Irish accent) ในช่วง 1-2 เดือนแรกอาจฟังยาก",
        stress: "ความเครียดอยู่ในระดับปานกลางค่อนไปทางสูงในช่วงที่ต้องทำวิจัยในแล็บ (Dissertation)",
        links: "เชื่อมโยงกับ Food Standards Agency (FSA) และเครือข่ายอุตสาหกรรมเกษตร/อาหารของไอร์แลนด์เหนืออย่างแนบแน่น"
      },
      safety: {
        campus: "ความปลอดภัยระดับสูงมาก มีระบบรักษาความปลอดภัย 24 ชม. ทั้งแคมปัสและหอพักของมหาวิทยาลัย แสงสว่างเพียงพอ",
        city: "เป็นหนึ่งในเมืองหลวงที่ปลอดภัยที่สุดใน UK อาชญากรรมรุนแรง (Violent crime) ต่ำมาก ผู้คนพร้อมช่วยเหลือ",
        risks: "ย่านนักศึกษาเช่น Holylands มักมีเสียงดังจากปาร์ตี้ช่วงสุดสัปดาห์ โจรขโมยจักรยานมีบ้างประปราย ควรใช้สายล็อกแบบ U-lock"
      },
      work: {
        retail: "หางานตามร้านอาหาร ร้านกาแฟ แบรนด์เสื้อผ้าในใจกลางเมือง (Victoria Square) ได้ค่อนข้างง่าย โดยเฉพาะช่วงเทศกาล",
        uni: "มี Student Union ที่แข็งแกร่ง จ้างนักศึกษาทำงานพาร์ทไทม์เยอะ เช่น Student Ambassador, พนักงานเสิร์ฟในอีเวนต์ จ่ายเรทดีและจัดเวลาเรียนง่าย"
      },
      career: {
        uk: "ไอร์แลนด์เหนือเป็นฐานการผลิตอุตสาหกรรมอาหารขนาดใหญ่ มีโอกาสได้งานด้าน QA/QC, Food Technologist ค่อนข้างสูง",
        thailand: "โปรไฟล์ตรงความต้องการของบริษัทอาหารยักษ์ใหญ่ (เช่น CPF, Betagro, Thai Union) หรือเหมาะสำหรับการสอบเข้ารับราชการใน อย."
      }
    }
  },
  {
    id: 'birmingham',
    name: "University of Birmingham",
    courseCategory: "Food Safety",
    rent: 760,
    living: 320, // Cook 180 + Transport 60 + Misc 80
    weatherVibe: "อากาศเย็น เปลี่ยนแปลงบ่อย ห่างไกลทะเล",
    cityVibe: "เมืองใหญ่อันดับ 2 คึกคัก หลากหลายวัฒนธรรม",
    details: {
      cost: {
        shared: { price: "£500 / เดือน (£125/สัปดาห์)", desc: "แถวย่าน Selly Oak ที่นักศึกษานิยมอยู่ ต้องเผื่อเงินสำหรับจ่ายค่าแก๊สและฮีตเตอร์หน้าหนาวที่แพงขึ้น" },
        ensuite: { price: "£760 / เดือน (£190/สัปดาห์)", desc: "หอเอกชนใจกลางเมือง หรือแถวแคมปัส Edgbaston สะดวก ปลอดภัย รวมบิลครบ" },
        studio: { price: "£1,000 / เดือน (£250/สัปดาห์)", desc: "ราคาสูงขึ้นตามความเป็นเมืองใหญ่ สิ่งอำนวยความสะดวกครบครัน" },
        food: {
          cooking: {
            price: "£180 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£2.0)",
            desc: "ทำกินเองประหยัดมาก มีตลาดสด Bullring และซูเปอร์เอเชียขนาดใหญ่ ซื้อผักและเนื้อสัตว์มาตุนทำกินเองได้สบาย"
          },
          eatingOut: {
            price: "£1,530 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£17)",
            desc: "หากทานร้านอาหารทุกมื้อ เนื่องจากมีตัวเลือกอาหารนานาชาติเยอะ ราคาเฉลี่ยมื้อหลักคือ £15-£25 ค่าใช้จ่ายจะสูงมาก"
          }
        },
        transport: "£60 / เดือน (ระบบขนส่งดีเยี่ยม มีสถานีรถไฟ University ในแคมปัส นั่งเข้าเมืองเพียงไม่กี่นาที และรถบัสครอบคลุม)"
      },
      weather: {
        overview: "อากาศแบบภาคกลางตอนใน (Inland) ไม่มีลมทะเลพัดผ่าน อุณหภูมิเปลี่ยนแปลงบ่อยและอาจรู้สึกอบอ้าวกว่าเมืองอื่นเล็กน้อยในหน้าร้อน",
        spring: "มี.ค.-พ.ค. (4-13°C): อากาศอุ่นขึ้นช้าๆ ลมแรงปานกลาง มีฝนสลับแดด",
        summer: "มิ.ย.-ส.ค. (12-21°C): อุ่นถึงร้อนในบางวัน แดดดีมาก เหมาะกับการทำกิจกรรมกลางแจ้ง",
        autumn: "ก.ย.-พ.ย. (7-14°C): มืดเร็วขึ้น ฝนตกบ่อย ใบไม้เปลี่ยนสีตามแคมปัสสวยงามมาก",
        winter: "ธ.ค.-ก.พ. (1-7°C): หนาวเย็นยะเยือก อาจมีหิมะตกบางปี 1-2 ครั้ง แต่ส่วนใหญ่เป็นน้ำแข็งเกาะถนน"
      },
      study: {
        focus: "มองภาพรวมระบบห่วงโซ่อุปทาน (Farm to Fork) เน้นระบบจัดการความปลอดภัย, พิษวิทยาในอาหาร (Food Toxicology) และความยั่งยืน",
        support: "เป็นมหาวิทยาลัยชั้นนำกลุ่ม Russell Group คลาสเรียนมีนักศึกษาหลากหลายชาติพันธุ์สูง คลาสอาจใหญ่ทำให้ต้องตื่นตัวเสมอ",
        prep: "ควรเตรียมความรู้เรื่อง Risk Management ในอุตสาหกรรมอาหาร สำเนียงถิ่น (Brummie) มีเอกลักษณ์ แต่อาจารย์มักใช้สำเนียงกลาง (RP)",
        stress: "ความเครียดค่อนข้างสูงจากการแข่งขันในคลาส การตัดเกรดเข้มงวด และปริมาณงานที่ต้องอ่านเปเปอร์เยอะ",
        links: "มหาลัยมีคอนเนคชั่นกับบริษัทยา อาหาร และ FMCG ขนาดใหญ่ในพื้นที่ Midlands"
      },
      safety: {
        campus: "แคมปัสหลัก Edgbaston กว้างใหญ่ ร่มรื่น และมีระบบดูแลความปลอดภัยที่เข้มงวดมาก",
        city: "เป็นเมืองใหญ่ (Big City) ต้องระมัดระวังตัว ย่านที่มีคนพลุกพล่านอาจมีคนจรจัดและการล้วงกระเป๋า",
        risks: "ย่าน Selly Oak ซึ่งเป็นดงนักศึกษา มีอัตราการงัดแงะบ้านเช่า (Burglaries) สูงช่วงปิดเทอม หากเช่าบ้านต้องตรวจระบบล็อกให้ดี"
      },
      work: {
        retail: "โอกาสหางานพาร์ทไทม์สูงมาก ทั้งในย่านช้อปปิ้ง ร้านอาหารไทยที่มีจำนวนมาก และธุรกิจบริการต่างๆ",
        uni: "Guild of Students (สโมสรนักศึกษา) แอคทีฟมาก มีแพลตฟอร์มหางานภายในรองรับงานธุรการและอีเวนต์"
      },
      career: {
        uk: "เมืองศูนย์กลาง Supply chain การคมนาคม หางานด้าน Logistics, Quality Control, Regulatory Affairs ได้กว้างขวาง",
        thailand: "เหมาะกับสายงาน R&D ผู้ควบคุมคุณภาพ หรือผู้จัดการโรงงานในนิคมอุตสาหกรรมขนาดใหญ่"
      }
    }
  },
  {
    id: 'leeds',
    name: "University of Leeds",
    courseCategory: "Public Health / One Health",
    rent: 680,
    living: 300, // Cook 175 + Transport 50 + Misc 75
    weatherVibe: "หนาวและลมแรง ฤดูหนาวทารุณเล็กน้อย",
    cityVibe: "เมืองแห่งนักศึกษา สถาปัตยกรรมสวยงาม คาเฟ่เยอะ",
    details: {
      cost: {
        shared: { price: "£460 / เดือน (£115/สัปดาห์)", desc: "ย่าน Hyde Park หรือ Headingley เป็นบ้านอิฐแดงคลาสสิก มักต้องรวมกลุ่มเพื่อนไปเช่าเหมาหลัง" },
        ensuite: { price: "£680 / เดือน (£170/สัปดาห์)", desc: "หอพักเอกชนแถวหน้ามอมีเยอะมาก แข่งขันกันทำโปรโมชั่นบ่อย รวมค่าน้ำไฟเน็ต" },
        studio: { price: "£920 / เดือน (£230/สัปดาห์)", desc: "มีความเป็นส่วนตัวสูง เหมาะสำหรับคนที่ต้องการความสงบในการเขียนงานวิจัย" },
        food: {
          cooking: {
            price: "£175 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£1.9)",
            desc: "หากทำกินเอง 100% ตลาด Kirkgate Market คือสวรรค์แห่งการประหยัด ซื้อผักผลไม้และเนื้อสัตว์ได้ในราคาถูกมากๆ"
          },
          eatingOut: {
            price: "£1,350 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£15)",
            desc: "หากฝากท้องไว้กับร้านอาหารทุกมื้อ จะเปลืองเงินมหาศาล เนื่องจากคาเฟ่และร้านอาหารในลีดส์มักจะมีราคาบวกค่าบรรยากาศร้าน"
          }
        },
        transport: "£50 / เดือน (แคมปัสอยู่ติดใจกลางเมือง เดินทางเท้าเป็นหลัก ประหยัดค่าเดินทางได้มาก หากอยู่ไกลก็นั่งบัส)"
      },
      weather: {
        overview: "ตั้งอยู่ทางตอนเหนือ (Yorkshire) อากาศค่อนข้างหนาวกว่าภาคกลาง ลมแรงมาก มักเจอพายุฝนฤดูหนาว",
        spring: "มี.ค.-พ.ค. (4-13°C): อุ่นขึ้นช้าๆ มีฝนประปราย ลมยังคงเย็นเยียบ",
        summer: "มิ.ย.-ส.ค. (12-20°C): อากาศดีที่สุด เหมาะกับการนั่งจิบกาแฟหรือทำกิจกรรมในสวน",
        autumn: "ก.ย.-พ.ย. (7-14°C): ใบไม้ร่วงสวยงาม แต่ลมจะเริ่มกรรโชกแรงและมืดเร็ว",
        winter: "ธ.ค.-ก.พ. (1-6°C): หนาวจัด ลมพัดทะลุเสื้อผ้า (Wind chill รุนแรง) อาจมีหิมะตกบ้างประปราย ต้องมีเสื้อโค้ทกันลมหนาๆ"
      },
      study: {
        focus: "โดดเด่นมากด้าน Health Data, Epidemiology และ Health Policy มีสถาบันนานาชาติที่มีชื่อเสียง",
        support: "สังคมนักศึกษาเข้มแข็งมาก อาจารย์ให้คำปรึกษาใกล้ชิดและมีระบบ Personal Tutor ที่ดี",
        prep: "ควรปรับพื้นฐานด้านระบาดวิทยา (Epidemiology) และสถิติขั้นต้น สำเนียง Yorkshire ฟังดูอบอุ่นเป็นเอกลักษณ์",
        stress: "สมดุล (Work-life balance) ดีเยี่ยม เรียนหนัก แต่มีสถานที่ให้แฮงเอาท์เยอะ ทำให้ไม่รู้สึกเครียดจนเกินไป",
        links: "ลีดส์เป็นศูนย์กลางดิจิทัลเฮลธ์ของยุโรป และเป็นที่ตั้งศูนย์บัญชาการบางส่วนของ NHS"
      },
      safety: {
        campus: "แคมปัสปลอดภัย เป็นสัดส่วนชัดเจน (Campus university) เดินเชื่อมต่อกันได้หมด",
        city: "ใจกลางเมืองค่อนข้างปลอดภัย แสงสว่างเพียงพอ แต่ช่วงศุกร์เสาร์คนเมาเยอะ",
        risks: "ย่าน Hyde Park และ Headingley ซึ่งนักศึกษาอยู่เยอะ อาจเปลี่ยวตอนกลางคืน มีปัญหาเรื่องความปลอดภัยทางเดินเท้า"
      },
      work: {
        retail: "เป็นเมืองช้อปปิ้งหลักของภาคเหนือ หางานด้าน Hospitality, ร้านชานม, คาเฟ่ ได้ง่าย",
        uni: "Joblink ของ Union ครอบคลุมมาก จัดหางานพาร์ทไทม์ภายในแคมปัสให้อย่างเป็นระบบ"
      },
      career: {
        uk: "โอกาสทำงานใน NHS หรือบริษัทด้าน Health Informatics / Data Analyst สูงมาก",
        thailand: "เป็นโปรไฟล์ที่แข็งแกร่งสำหรับกระทรวงสาธารณสุข, สสส., หรือนักวิจัยนโยบายด้านสุขภาพ"
      }
    }
  },
  {
    id: 'glasgow',
    name: "University of Glasgow",
    courseCategory: "Public Health / One Health",
    rent: 780,
    living: 330, // Cook 185 + Transport 65 + Misc 80
    weatherVibe: "ฝนตกชุก มืดเร็ว หนาวเย็น",
    cityVibe: "ศิลปะเด่น สถาปัตยกรรมอลังการ ผู้คนมีอารมณ์ขัน",
    details: {
      cost: {
        shared: { price: "£540 / เดือน (£135/สัปดาห์)", desc: "ที่พักในสก็อตแลนด์กฎหมายคุ้มครองผู้เช่าดี แต่หาบ้านยาก การแชร์บ้านจึงประหยัดที่สุด" },
        ensuite: { price: "£780 / เดือน (£195/สัปดาห์)", desc: "หอเอกชนย่าน West End ราคาจะสูงกว่าย่านอื่น แต่เดินไปเรียนง่ายที่สุด" },
        studio: { price: "£1,080 / เดือน (£270/สัปดาห์)", desc: "ราคาสูงเพราะดีมานด์เยอะ เหมาะสำหรับผู้มีงบประมาณยืดหยุ่น" },
        food: {
          cooking: {
            price: "£185 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£2.0)",
            desc: "หากซื้อมาทำเองทุกมื้อ ถือว่าอยู่ในเกณฑ์ปกติ วัตถุดิบสดหาซื้อง่ายตามซูเปอร์ทั่วไป โซนสก็อตแลนด์จะมีของพื้นเมืองขายเยอะ"
          },
          eatingOut: {
            price: "£1,440 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£16)",
            desc: "หากขี้เกียจทำอาหารและทานร้านทุกมื้อ กระเป๋าฉีกแน่นอน ร้านอาหารและคาเฟ่เก๋ๆ ใน West End เยอะและมีราคาสูง"
          }
        },
        transport: "£65 / เดือน (ใช้รถไฟใต้ดิน 'Clockwork Orange' ที่วิ่งวนเป็นวงกลม สะดวก ครอบคลุมจุดสำคัญ)"
      },
      weather: {
        overview: "ฝนตกเยอะที่สุดในบรรดาเมืองทั้งหมด (เปียกตลอดเวลา) อากาศชื้น ท้องฟ้ามักเป็นสีเทา",
        spring: "มี.ค.-พ.ค. (4-12°C): อากาศยังคงชื้นและเย็นจัด ต้องใส่เลเยอร์เยอะๆ",
        summer: "มิ.ย.-ส.ค. (10-18°C): เย็นสบาย วันไหนแดดออกคนจะรีบมานอนอาบแดดทันที",
        autumn: "ก.ย.-พ.ย. (6-12°C): ฝนตกชุกต่อเนื่อง ลมแรงปานกลาง",
        winter: "ธ.ค.-ก.พ. (1-6°C): หนาวชื้น และมืดเร็วมาก (บ่ายสามครึ่งก็เริ่มมืด) ต้องระวังภาวะหดหู่ตามฤดูกาล (SAD)"
      },
      study: {
        focus: "บุกเบิกและมีชื่อเสียงระดับโลกด้าน One Health มีสถาบัน Boyd Orr Centre โดดเด่นด้านโรคติดต่อระหว่างสัตว์และคน",
        support: "สำเนียงสก็อตติช (Glaswegian) อาจฟังยากมากๆ แต่อาจารย์และเพื่อนร่วมคลาสพร้อมช่วยเหลือเสมอ",
        prep: "ศึกษาความเชื่อมโยงของสุขภาพสัตว์ มนุษย์ และสิ่งแวดล้อม เน้นเรื่องแบคทีเรีย ไวรัสวิทยา และภูมิอากาศ",
        stress: "ความเครียดหลักมาจากความเข้มข้นของเนื้อหาวิจัย และการรับมือกับสภาพอากาศหน้าหนาว",
        links: "ทำงานใกล้ชิดกับเครือข่ายสัตวแพทย์ สวนสัตว์ และ Animal and Plant Health Agency (APHA)"
      },
      safety: {
        campus: "แคมปัสอยู่ในย่าน West End (ย่านผู้ดีเก่า) ปลอดภัย สวยงาม มีความเป็นชุมชนวิชาการสูง",
        city: "สโลแกน 'People Make Glasgow' ไม่เกินจริง คนที่นี่เป็นมิตรที่สุด",
        risks: "หลีกเลี่ยงการเดินคนเดียวในย่าน East End และใจกลางเมืองในคืนวันศุกร์เสาร์ที่มีคนดื่มแอลกอฮอล์จัด"
      },
      work: {
        retail: "ย่าน West End มีคาเฟ่อินดี้ ผับ งานบริการหาไม่ยาก แต่ต้องแข่งกับนักศึกษาท้องถิ่น",
        uni: "มีตำแหน่งผู้ช่วยวิจัย (RA) แบบพาร์ทไทม์ หรือทำงานในห้องสมุด/สิ่งอำนวยความสะดวกของสถาบันวิจัย"
      },
      career: {
        uk: "เติบโตในสายนักวิจัยระบาดวิทยา หรือนักวิทยาศาสตร์ในหน่วยงานรัฐ",
        thailand: "ทำงานในกรมปศุสัตว์ กรมควบคุมโรค หรือองค์กรระหว่างประเทศระดับภูมิภาค"
      }
    }
  },
  {
    id: 'edinburgh',
    name: "The University of Edinburgh",
    courseCategory: "Public Health / One Health",
    rent: 980,
    living: 360, // Cook 200 + Transport 70 + Misc 90
    weatherVibe: "หนาวจัด ลมแรงสุดๆ",
    cityVibe: "เมืองมรดกโลก สวยงามทุกมุม นักท่องเที่ยวมหาศาล",
    details: {
      cost: {
        shared: { price: "£660 / เดือน (£165/สัปดาห์)", desc: "การหาบ้านเช่าที่นี่คือสงคราม ดีมานด์สูงกว่าซัพพลายมาก แม้แต่ห้องแชร์ก็ราคาแพง" },
        ensuite: { price: "£980 / เดือน (£245/สัปดาห์)", desc: "หอพักราคาดุเดือดมาก บางคนต้องยอมอยู่ไกลมอและเสียค่ารถบัสเข้ามาเพื่อประหยัด" },
        studio: { price: "£1,400 / เดือน (£350/สัปดาห์)", desc: "ราคาเทียบเท่าการอยู่ในกรุงลอนดอน" },
        food: {
          cooking: {
            price: "£200 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£2.2)",
            desc: "ทำกินเอง 100% คือทางรอดเดียวในเมืองนี้ ซูเปอร์มาร์เก็ตเอเชียมีครบแต่อาจจะบวกราคาเพิ่มเล็กน้อยเมื่อเทียบกับเมืองอื่น"
          },
          eatingOut: {
            price: "£1,800 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£20)",
            desc: "หากไม่ทำกับข้าวเลย การทานร้านอาหารทุกมื้อในเมืองมรดกโลกที่มีนักท่องเที่ยวพลุกพล่านจะแพงมาก (มี Service charge สูง)"
          }
        },
        transport: "£70 / เดือน (รถบัส Lothian ดีเยี่ยม แต่เมืองเป็นเนินเขาชันและปูด้วยหินกรวด เดินเหนื่อยมาก)"
      },
      weather: {
        overview: "หนาวและลมแรงมาก (Wind chill effect) ทำให้ความรู้สึกจริง (Feels like) หนาวกว่าอุณหภูมิจริงเสมอ",
        spring: "มี.ค.-พ.ค. (3-11°C): หนาวยาวนาน อุ่นขึ้นแบบชัดเจนช่วงปลายพฤษภาคม",
        summer: "มิ.ย.-ส.ค. (10-18°C): เย็นสบาย แดดออกดึกถึง 4-5 ทุ่ม ท้องฟ้าสวยงามมาก",
        autumn: "ก.ย.-พ.ย. (5-12°C): ลมกรรโชกแรง ฝนตกปรายๆ แต่อากาศเย็นสดชื่น",
        winter: "ธ.ค.-ก.พ. (-1-5°C): หนาวจัด ลมบาดผิว หิมะตกบ่อยกว่าเมืองอื่นในลิสต์ ต้องใส่ลองจอห์นและเสื้อโค้ทแบบกันลม"
      },
      study: {
        focus: "ระดับโลกของจริง มี Roslin Institute (ผู้โคลนนิ่งแกะดอลลี่) โดดเด่นด้านพันธุศาสตร์ ภาวะดื้อยา และ Global Health Policy",
        support: "บรรยากาศวิชาการสูงมาก (Academic rigor) อาจกดดัน แหล่งข้อมูลและ Facilities ทันสมัยที่สุด",
        prep: "เตรียมความพร้อมด้านระเบียบวิธีวิจัย (Research Methodology) การคิดเชิงระบบ และสถิติระดับสูง",
        stress: "ความเครียดระดับสูงมาก ทั้งจากความคาดหวังของสถาบัน และแรงกดดันจากค่าใช้จ่ายรายวันที่สูง",
        links: "เชื่อมโยงกับ WHO, OIE และองค์กรสาธารณสุขระดับนานาชาติ"
      },
      safety: {
        campus: "ปลอดภัยมาก แคมปัสและตึกเรียนกระจายอยู่กลางเมือง มีแสงสว่างตลอดคืน",
        city: "เป็นเมืองหลวงที่ถือว่าปลอดภัยที่สุดแห่งหนึ่งใน UK",
        risks: "ระวังแก๊งล้วงกระเป๋าในช่วงเทศกาล (เช่น Fringe Festival เดือน ส.ค.) นอกนั้นเป็นปัญหาจักรยานหาย"
      },
      work: {
        retail: "เมืองท่องเที่ยว หางานตามโรงแรม ร้านอาหาร ร้านขายของที่ระลึก ได้ตลอดปีและรับคนตลอด",
        uni: "การแข่งขันทำพาร์ทไทม์ในมหาวิทยาลัยสูงมาก แต่มหาวิทยาลัยมีกองทุนและงานผู้ช่วยวิจัยให้สมัครเยอะ"
      },
      career: {
        uk: "โปรไฟล์เอดินเบอระทรงพลังมาก หางานเป็นนักวิจัยระดับโลก หรือสาย Global Health Policy ได้เปรียบ",
        thailand: "อาจารย์มหาวิทยาลัยชั้นนำ, นักวิจัยระดับชาติ, นักกำหนดนโยบาย (Policy Maker)"
      }
    }
  },
  {
    id: 'liverpool',
    name: "University of Liverpool",
    courseCategory: "Public Health / One Health",
    rent: 620,
    living: 280, // Cook 160 + Transport 50 + Misc 70
    weatherVibe: "ลมแรงจากทะเล ฝนตกประปราย",
    cityVibe: "เมืองฟุตบอลและดนตรีคลาสสิก ผู้คนมีสีสัน",
    details: {
      cost: {
        shared: { price: "£420 / เดือน (£105/สัปดาห์)", desc: "ย่าน Smithdown Road บ้านแชร์ราคาถูกมาก การอยู่ร่วมกับเพื่อนจะเซฟเงินได้มหาศาล" },
        ensuite: { price: "£620 / เดือน (£155/สัปดาห์)", desc: "มีหอพักรอบๆ แคมปัสในราคาที่จับต้องได้สบายๆ เงินงบ 1,500/เดือน เอาอยู่แน่นอน" },
        studio: { price: "£840 / เดือน (£210/สัปดาห์)", desc: "สตูดิโอยังถือว่าราคาเป็นมิตรเมื่อเทียบกับเมืองอื่นๆ" },
        food: {
          cooking: {
            price: "£160 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£1.8)",
            desc: "การทำอาหารทานเอง 100% ประหยัดเงินได้สุดๆ ตลาดสดและซูเปอร์ราคาถูกมีกระจายทั่วเมือง"
          },
          eatingOut: {
            price: "£1,260 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£14)",
            desc: "หากทานร้านอาหารทุกมื้อ (เช้าคาเฟ่ เที่ยงร้านแซนวิช เย็นร้านอาหาร) เงินจะหมดไปกับการกินล้วนๆ แม้ว่าเมืองนี้ของกินจะราคาถูกกว่าลอนดอนก็ตาม"
          }
        },
        transport: "£50 / เดือน (รถไฟใต้ดิน Merseyrail และบัส สะดวกและถูก แคมปัสเดินง่าย)"
      },
      weather: {
        overview: "เมืองท่าติดชายฝั่งตะวันตก อากาศเย็นและลมทะเลพัดผ่านตลอดปี",
        spring: "มี.ค.-พ.ค. (5-13°C): อุ่นขึ้นปานกลาง ลมทะเลยังคงแรง",
        summer: "มิ.ย.-ส.ค. (12-19°C): อุ่นสบาย ไม่ร้อนจัด วันไหนแดดดีเหมาะแก่การไปนั่งเล่นแถวท่าเรือ",
        autumn: "ก.ย.-พ.ย. (7-13°C): ฝนตกชุก ลมแรง พกร่มมักจะพัง ต้องใส่เสื้อกันฝน",
        winter: "ธ.ค.-ก.พ. (2-7°C): หนาวลม ทะลวงกระดูก ความชื้นจากทะเลทำให้รู้สึกหนาวขึ้น หิมะตกประปราย"
      },
      study: {
        focus: "มีสายสัมพันธ์ลึกซึ้งกับสถาบันเวชศาสตร์เขตร้อน (LSTM) โดดเด่นด้านโรคเขตร้อน โรคระบาด และพยาธิวิทยา",
        support: "คนลิเวอร์พูล (Scousers) เฟรนด์ลี่มาก สำเนียง Scouse อาจฟังยากมากในช่วงแรก ต้องอาศัยการปรับตัว",
        prep: "ทบทวนเรื่องการควบคุมการระบาด (Outbreak response) ระบาดวิทยา และปรสิตวิทยา คณะแพทย์/สัตวแพทย์คอนเนคชั่นแน่น",
        stress: "ปานกลาง บรรยากาศเมืองคึกคักช่วยลดความเครียดได้เยอะ การอยู่เมืองนี้จะไม่ค่อยเครียดเรื่องเงิน",
        links: "ทำงานร่วมกับหน่วยงานควบคุมโรค เครือข่ายวิจัยโรคเมืองร้อนระดับโลก"
      },
      safety: {
        campus: "แคมปัสอยู่ในเมือง รวมกันเป็นก้อนเดียว เดินเชื่อมถึงกันหมดและปลอดภัย",
        city: "กลางคืนมีความพลุกพล่านของผับบาร์และแฟนบอลสูงมาก ต้องระวังคนเมา",
        risks: "ย่านหอนอกยอดฮิตอย่าง Smithdown Road เคยมีประวัติเรื่องโจรงัดบ้าน ควรพักหอพัก หรือเช่าบ้านที่มีระบบความปลอดภัยดีๆ"
      },
      work: {
        retail: "เมืองแห่งการสังสรรค์ (Nightlife capital) มีงานบริการในผับบาร์ ร้านอาหาร เปิดรับตลอดเวลา",
        uni: "Guild of Students แอคทีฟมาก มีงานอีเวนต์ คอนเสิร์ตให้ทำเพียบ"
      },
      career: {
        uk: "เติบโตในสายผู้เชี่ยวชาญด้านโรคติดต่อ Infection Control ในโรงพยาบาล",
        thailand: "ตรงสเปกมากสำหรับกรมควบคุมโรค, คณะเวชศาสตร์เขตร้อน, นักวิจัยโรคอุบัติใหม่"
      }
    }
  },
  {
    id: 'bristol',
    name: "University of Bristol",
    courseCategory: "Public Health / One Health",
    rent: 920,
    living: 350, // Cook 200 + Transport 65 + Misc 85
    weatherVibe: "อุ่นกว่าเมืองทางเหนือ แดดออกบ่อย",
    cityVibe: "เมืองสีเขียว ฮิปสเตอร์ อาร์ตตัวแม่ เนินเขาชัน",
    details: {
      cost: {
        shared: { price: "£600 / เดือน (£150/สัปดาห์)", desc: "การแข่งขันหาบ้านสูงมาก มักจะอยู่ย่าน Clifton หรือ Redland การแชร์บ้านก็ยังถือว่าราคาสูง" },
        ensuite: { price: "£920 / เดือน (£230/สัปดาห์)", desc: "ค่าเช่าแพงเป็นอันดับต้นๆ ของประเทศ (เป็นรองแค่ลอนดอน/เอดินเบอระ)" },
        studio: { price: "£1,200 / เดือน (£300/สัปดาห์)", desc: "ราคาสูงปรี๊ด เหมาะกับคนที่มีงบประมาณส่วนตัวหนาจริงๆ" },
        food: {
          cooking: {
            price: "£200 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£2.2)",
            desc: "ต้องทำกินเอง 100% ถึงจะคุมงบ £1,500 ให้อยู่ได้ (ถ้าซื้อแต่ของออร์แกนิกตามสไตล์เมืองนี้ งบอาจจะบานปลายได้)"
          },
          eatingOut: {
            price: "£1,620 / เดือน",
            note: "(3 มื้อ/วัน, มื้อละ ~£18)",
            desc: "หากทานร้านอาหารและคาเฟ่อินดี้ทุกมื้อ (ซึ่งเมืองนี้ของกินอร่อยเยอะมาก) ค่าใช้จ่ายจะพุ่งกระฉูดทันที"
          }
        },
        transport: "£65 / เดือน (เมืองเป็นเนินชันมาก มักต้องนั่งบัส หรือใช้ E-scooter ส่วนการปั่นจักรยานต้องใช้แรงเยอะมาก)"
      },
      weather: {
        overview: "อยู่ทางตะวันตกเฉียงใต้ อากาศดีและอุ่นกว่าเมืองทางเหนืออย่างเห็นได้ชัด ได้รับแสงแดดมากกว่า",
        spring: "มี.ค.-พ.ค. (5-14°C): อากาศโปร่ง ดอกไม้สวยงามตามสวนต่างๆ",
        summer: "มิ.ย.-ส.ค. (13-22°C): อบอุ่น มีคลื่นความร้อนบ้าง เป็นช่วงเทศกาลบอลลูนนานาชาติ อากาศดีมาก",
        autumn: "ก.ย.-พ.ย. (8-15°C): ฝนตกชุกปานกลาง ใบไม้เปลี่ยนสีสวยมาก แต่อากาศยังไม่หนาวจัด",
        winter: "ธ.ค.-ก.พ. (3-8°C): หนาวแต่ไม่จัดทะลุกระดูกแบบทางเหนือ โอกาสเจอหิมะน้อยมาก มักเป็นสายฝนแฉะๆ"
      },
      study: {
        focus: "จุดเด่นคือ สวัสดิภาพสัตว์ (Animal Welfare) และนโยบายสาธารณสุขเชิงสิ่งแวดล้อม คณะสัตวแพทย์โด่งดัง",
        support: "บริสตอลเป็นเมืองแห่งการตื่นรู้ (Progressive & Liberal) อาจารย์เปิดกว้าง ถกเถียงประเด็นละเอียดอ่อนได้อย่างเสรี",
        prep: "เตรียมความพร้อมด้านจริยธรรมสัตว์ (Animal Ethics) กฎหมายสิ่งแวดล้อม การประเมินผลเน้นความลึกซึ้งของการอภิปราย",
        stress: "สูงจากคุณภาพวิชาการที่เข้มข้น และเพื่อนร่วมคลาสที่เก่ง แต่บรรยากาศเมืองช่วยฮีลใจและสร้างบาลานซ์ได้ดี",
        links: "ใกล้ชิดกับหน่วยงานรัฐอย่าง Defra, สถาบันวิจัยสัตว์, และ NGOs ด้านสิ่งแวดล้อม"
      },
      safety: {
        campus: "ตึกเรียนกระจัดกระจายตามตัวเมือง (City campus) มักแทรกตัวอยู่กับย่านชุมชน แต่เป็นย่านที่ปลอดภัย",
        city: "เป็นหนึ่งในเมืองใหญ่ที่ให้ความรู้สึกปลอดภัยที่สุด เป็นมิตรกับคนเอเชียและผู้มีความหลากหลายทางเพศ",
        risks: "อัตราการขโมยจักรยานสูงมากที่สุดแห่งหนึ่ง หากพักย่านใกล้ Stokes Croft (ย่านสตรีทอาร์ต) อาจเจอคนไร้บ้านยามดึกบ้าง"
      },
      work: {
        retail: "มีร้านกาแฟอิสระ ร้านขายแผ่นเสียง เยอะมาก แต่การคัดเลือกพนักงานจะเน้นคนที่สื่อสารเก่งและเข้าใจ Vibe ของร้าน",
        uni: "มีงานในมหาวิทยาลัย เช่น ผู้ช่วยจัดอีเวนต์ หรือวิจัย แต่อาจไม่เยอะเท่าเมืองที่มีแคมปัสปิดขนาดใหญ่"
      },
      career: {
        uk: "โอกาสทำงานใน NGOs ด้านสิ่งแวดล้อม, หน่วยงานรัฐด้านสวัสดิภาพสัตว์, หรือที่ปรึกษาอิสระ",
        thailand: "องค์กรคุ้มครองสัตว์, ที่ปรึกษาด้านนโยบายสิ่งแวดล้อมและความยั่งยืน (ESG), นักวิชาการ"
      }
    }
  }
];

export default function App() {
  const [filter, setFilter] = useState('All');
  const [selectedUni, setSelectedUni] = useState(null);
  const [activeTab, setActiveTab] = useState('cost');

  const processedData = useMemo(() => {
    return universitiesData.map(uni => {
      const totalCost = uni.rent + uni.living;
      let costColor = "#22c55e"; // Green (< 1300)
      let status = "ประหยัด (เงินเหลือเที่ยว)";

      if (totalCost > 1500) {
        costColor = "#ef4444"; // Red
        status = "เกินงบ (ต้องรัดเข็มขัด)";
      } else if (totalCost >= 1300) {
        costColor = "#eab308"; // Yellow
        status = "ปริ่มงบ (พอดีตัว)";
      }

      return { ...uni, totalCost, costColor, status };
    });
  }, []);

  const filteredData = useMemo(() => {
    if (filter === 'All') return processedData;
    return processedData.filter(uni => uni.courseCategory === filter);
  }, [filter, processedData]);

  const getStatusIcon = (status) => {
    if (status.includes('ประหยัด')) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status.includes('ปริ่มงบ')) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <ShieldAlert className="w-5 h-5 text-red-500" />;
  };

  const tabStyles = (tabName) => `
    flex items-center gap-2 px-5 py-3.5 font-medium text-sm transition-all border-b-2 whitespace-nowrap
    ${activeTab === tabName
      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
  `;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-4 py-1.5 rounded-bl-xl font-medium tracking-wide">
            ข้อมูลประเมินล่าสุด: ปีการศึกษา 2025/2026
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Career className="w-9 h-9 text-indigo-600" />
              UK Master's Comparison Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-sm md:text-base max-w-2xl">
              วิเคราะห์ข้อมูลเชิงลึก 6 มิติ (ค่าครองชีพอิงจากการทำอาหารเอง 100%, สภาพอากาศ, การเรียน, ความปลอดภัย, พาร์ทไทม์, อาชีพ) เพื่อช่วยตัดสินใจบนงบประมาณ £1,500/เดือน
            </p>
          </div>

          <div className="flex flex-wrap bg-slate-100/80 p-1.5 rounded-xl self-start md:self-auto shrink-0">
            {['All', 'Food Safety', 'Public Health / One Health'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filter === category
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {category === 'All' ? 'ดูทุกหลักสูตร' : category}
              </button>
            ))}
          </div>
        </header>

        {/* Grid Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((uni) => (
              <div
                key={uni.id}
                onClick={() => {
                  setSelectedUni(uni);
                  setActiveTab('cost');
                }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-4 flex justify-between items-start">
                  <span className="text-[10px] font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full uppercase">
                    {uni.courseCategory}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors">
                  {uni.name}
                </h3>

                <div className="space-y-3 mb-6 flex-grow text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <CloudRain className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                    <span className="line-clamp-2 leading-relaxed">{uni.weatherVibe}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-2 leading-relaxed">{uni.cityVibe}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">เฉลี่ยรวม/เดือน</p>
                    <p className="text-2xl font-black text-slate-800">£{uni.totalCost}</p>
                    <p className="text-[10px] text-slate-400 mt-1">(ที่พัก En-suite + ทำอาหาร 100% + เดินทาง)</p>
                  </div>
                  <div className={`flex flex-col items-center px-3 py-1.5 rounded-lg border
                    ${uni.totalCost <= 1300 ? 'bg-green-50 border-green-200 text-green-700' :
                      uni.totalCost <= 1500 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-red-50 border-red-200 text-red-700'}`}
                  >
                    {getStatusIcon(uni.status)}
                  </div>
                </div>
                <div className="mt-4 bg-slate-50 text-slate-500 text-xs text-center py-2 rounded-lg font-medium group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  คลิกดูข้อมูลเจาะลึก 6 มิติ
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Chart Section */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <LineChart className="w-7 h-7 text-emerald-500" />
              กราฟเปรียบเทียบค่าใช้จ่าย (คำนวณฐานจากการทำอาหารเองทุกมื้อ)
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              คำนวณจาก: ค่าเช่าห้องพักประเภท En-suite โดยเฉลี่ย + ค่าอาหารทำเอง 100% + การเดินทางและจิปาถะ <strong className="text-slate-700">เปรียบเทียบกับงบประมาณ £1,500/เดือน</strong>
            </p>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={90}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `£${value}`}
                />
                <RechartsTooltip
                  cursor={{fill: '#f8fafc'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-5 rounded-xl shadow-2xl border border-slate-100">
                          <p className="font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">{data.name}</p>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-600 flex justify-between gap-6">
                              <span><Home className="w-4 h-4 inline mr-1 text-indigo-400"/>ค่าที่พัก (En-suite):</span>
                              <span className="font-bold text-slate-800">£{data.rent}</span>
                            </p>
                            <p className="text-sm text-slate-600 flex justify-between gap-6">
                              <span><Utensils className="w-4 h-4 inline mr-1 text-orange-400"/>ค่ากิน(ทำเอง)+เดินทาง:</span>
                              <span className="font-bold text-slate-800">£{data.living}</span>
                            </p>
                            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between gap-6 items-center">
                              <span className="font-bold text-slate-900">รวมขั้นต่ำต่อเดือน:</span>
                              <span className="font-black text-lg" style={{color: data.costColor}}>£{data.totalCost}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={1500} label={{ position: 'top', value: 'เส้นงบประมาณ £1,500', fill: '#ef4444', fontSize: 13, fontWeight: 800 }} stroke="#ef4444" strokeWidth={3} strokeDasharray="6 6" />
                <Bar dataKey="totalCost" radius={[8, 8, 0, 0]} maxBarSize={60}>
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.costColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8 flex-wrap bg-slate-50 p-5 rounded-xl border border-slate-100">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-700"><div className="w-4 h-4 rounded-full bg-green-500 shadow-sm border border-green-600"></div> ประหยัด (&lt; £1,300)</div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-700"><div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm border border-yellow-500"></div> พอดีงบ (£1,300 - £1,500)</div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-700"><div className="w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-600"></div> เกินงบ (&gt; £1,500)</div>
          </div>
        </section>

        {/* Modal Overlay */}
        {selectedUni && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6">
            <div
              className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl transform transition-all overflow-hidden border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 md:px-8 md:pt-8 bg-white shrink-0 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 border border-indigo-100">
                      {selectedUni.courseCategory}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {selectedUni.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedUni(null)}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 hover:text-red-500 rounded-full transition-colors text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Scrollable Tabs */}
                <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
                  <button onClick={() => setActiveTab('cost')} className={tabStyles('cost')}><DollarSign className="w-4 h-4" /> ค่าครองชีพ</button>
                  <button onClick={() => setActiveTab('weather')} className={tabStyles('weather')}><ThermometerSun className="w-4 h-4" /> สภาพอากาศ</button>
                  <button onClick={() => setActiveTab('study')} className={tabStyles('study')}><BookCheck className="w-4 h-4" /> การเรียน</button>
                  <button onClick={() => setActiveTab('safety')} className={tabStyles('safety')}><ShieldCheck className="w-4 h-4" /> ความปลอดภัย</button>
                  <button onClick={() => setActiveTab('work')} className={tabStyles('work')}><Coffee className="w-4 h-4" /> งานพาร์ทไทม์</button>
                  <button onClick={() => setActiveTab('career')} className={tabStyles('career')}><Career className="w-4 h-4" /> โอกาสอาชีพ</button>
                </div>
              </div>

              {/* Modal Content Area */}
              <div className="p-6 md:p-8 overflow-y-auto bg-slate-50/50 flex-grow relative">

                {/* TAB 1: COST */}
                {activeTab === 'cost' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Accommodation Box */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                        <Home className="w-6 h-6 text-indigo-500" /> ค่าเช่าที่พัก (Accommodation)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                          <div className="font-bold text-slate-800 mb-1 text-lg">บ้านแชร์ (Shared/HMO)</div>
                          <div className="text-sm text-slate-500 mb-4 font-medium">ห้องนอนส่วนตัว, แชร์ครัว+น้ำ</div>
                          <div className="text-xl font-black text-emerald-600 mb-3">{selectedUni.details.cost.shared.price}</div>
                          <div className="text-sm text-slate-600 leading-relaxed mt-auto pt-3 border-t border-slate-200">
                            {selectedUni.details.cost.shared.desc}
                          </div>
                        </div>
                        <div className="bg-indigo-50/50 p-5 rounded-xl border-2 border-indigo-100 flex flex-col h-full relative hover:shadow-md transition-shadow">
                          <div className="absolute -top-3.5 -right-2 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wide shadow-sm">แนะนำ</div>
                          <div className="font-bold text-indigo-900 mb-1 text-lg">หอพัก (En-suite)</div>
                          <div className="text-sm text-indigo-700/80 mb-4 font-medium">ห้องน้ำส่วนตัว, แชร์ครัวกลาง</div>
                          <div className="text-xl font-black text-indigo-700 mb-3">{selectedUni.details.cost.ensuite.price}</div>
                          <div className="text-sm text-slate-700 leading-relaxed mt-auto pt-3 border-t border-indigo-100">
                            {selectedUni.details.cost.ensuite.desc}
                          </div>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                          <div className="font-bold text-slate-800 mb-1 text-lg">สตูดิโอ (Studio)</div>
                          <div className="text-sm text-slate-500 mb-4 font-medium">ส่วนตัว 100%, ครัว+น้ำในห้อง</div>
                          <div className="text-xl font-black text-slate-700 mb-3">{selectedUni.details.cost.studio.price}</div>
                          <div className="text-sm text-slate-600 leading-relaxed mt-auto pt-3 border-t border-slate-200">
                            {selectedUni.details.cost.studio.desc}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Food Grid */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                        <Utensils className="w-6 h-6 text-orange-500" /> เปรียบเทียบค่าอาหาร (ทำเอง 100% VS ร้านอาหาร 100%)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cooking */}
                        <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100 flex flex-col h-full relative">
                          <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded font-bold">ใช้คำนวณยอดรวม</div>
                          <h4 className="font-bold text-orange-900 flex items-center gap-2 mb-2 text-lg">
                            <ShoppingCart className="w-5 h-5"/> ทำอาหารกินเองทุกมื้อ
                          </h4>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-black text-orange-700">{selectedUni.details.cost.food.cooking.price}</span>
                            <span className="text-sm font-semibold text-orange-600/80">{selectedUni.details.cost.food.cooking.note}</span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed border-t border-orange-200/50 pt-3 mt-auto">
                            {selectedUni.details.cost.food.cooking.desc}
                          </p>
                        </div>

                        {/* Eating Out */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full opacity-90">
                          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2 text-lg">
                            <Coffee className="w-5 h-5"/> ทานร้านอาหารทุกมื้อ
                          </h4>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-black text-slate-700">{selectedUni.details.cost.food.eatingOut.price}</span>
                            <span className="text-sm font-semibold text-slate-500">{selectedUni.details.cost.food.eatingOut.note}</span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-3 mt-auto">
                            {selectedUni.details.cost.food.eatingOut.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Transport Detail */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                        <Bus className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">ค่าเดินทางในเมือง</h4>
                        <p className="text-slate-700 text-sm leading-relaxed">{selectedUni.details.cost.transport}</p>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: WEATHER */}
                {activeTab === 'weather' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-blue-600 text-white p-5 md:p-6 rounded-2xl shadow-md flex items-start gap-4">
                      <Wind className="w-8 h-8 shrink-0 mt-1 opacity-90" />
                      <div>
                        <h3 className="font-extrabold text-lg mb-1">ภาพรวมสภาพอากาศ</h3>
                        <p className="text-blue-50 leading-relaxed font-medium">{selectedUni.details.weather.overview}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                        <h4 className="font-extrabold text-emerald-600 flex items-center gap-2 mb-3 text-lg border-b border-slate-50 pb-2">
                          <span className="text-2xl">🌱</span> ฤดูใบไม้ผลิ (Spring)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedUni.details.weather.spring}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 transition-colors">
                        <h4 className="font-extrabold text-orange-500 flex items-center gap-2 mb-3 text-lg border-b border-slate-50 pb-2">
                          <ThermometerSun className="w-6 h-6" /> ฤดูร้อน (Summer)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedUni.details.weather.summer}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
                        <h4 className="font-extrabold text-amber-600 flex items-center gap-2 mb-3 text-lg border-b border-slate-50 pb-2">
                          <Cloud className="w-6 h-6" /> ฤดูใบไม้ร่วง (Autumn)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedUni.details.weather.autumn}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-cyan-300 transition-colors">
                        <h4 className="font-extrabold text-cyan-600 flex items-center gap-2 mb-3 text-lg border-b border-slate-50 pb-2">
                          <Snowflake className="w-6 h-6" /> ฤดูหนาว (Winter)
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedUni.details.weather.winter}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: STUDY */}
                {activeTab === 'study' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                      <h3 className="font-extrabold text-2xl text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                        <BookOpen className="w-7 h-7 text-indigo-600" /> เจาะลึกหลักสูตรและการเตรียมตัวเรียน
                      </h3>
                      <ul className="space-y-6">
                        <li className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                            <span className="text-indigo-600 font-bold">1</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block mb-2 text-lg">จุดเน้นของคณะ (Course Focus)</strong>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-4 rounded-xl">{selectedUni.details.study.focus}</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                            <span className="text-indigo-600 font-bold">2</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block mb-2 text-lg">บรรยากาศและอาจารย์ (Support & Vibe)</strong>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-4 rounded-xl">{selectedUni.details.study.support}</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                            <span className="text-indigo-600 font-bold">3</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block mb-2 text-lg">การเตรียมตัวก่อนไป (Preparation)</strong>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-4 rounded-xl">{selectedUni.details.study.prep}</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-md">
                        <h4 className="font-extrabold mb-3 flex items-center gap-2 text-lg">
                          <Users className="w-5 h-5 text-indigo-300" /> เครือข่าย (Networking)
                        </h4>
                        <p className="text-indigo-100 text-sm leading-relaxed">{selectedUni.details.study.links}</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl shadow-sm">
                        <h4 className="font-extrabold text-orange-900 mb-3 flex items-center gap-2 text-lg">
                          <AlertTriangle className="w-5 h-5 text-orange-600" /> ระดับความเครียด
                        </h4>
                        <p className="text-orange-800 text-sm leading-relaxed">{selectedUni.details.study.stress}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: SAFETY */}
                {activeTab === 'safety' && (
                  <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100">
                        <ShieldCheck className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 mb-2 text-xl">ความปลอดภัยในแคมปัส</h3>
                        <p className="text-slate-600 leading-relaxed">{selectedUni.details.safety.campus}</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                        <MapPin className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 mb-2 text-xl">บรรยากาศเมืองและผู้คน</h3>
                        <p className="text-slate-600 leading-relaxed">{selectedUni.details.safety.city}</p>
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 md:p-8 rounded-2xl border-l-4 border-red-500 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-red-900 mb-2 text-xl">จุดเสี่ยงและอาชญากรรมที่ต้องระวัง</h3>
                        <p className="text-red-800 leading-relaxed font-medium">{selectedUni.details.safety.risks}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: WORK */}
                {activeTab === 'work' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mb-6">
                        <Coffee className="w-7 h-7 text-amber-600" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 mb-4 text-xl">งานร้านอาหาร/บริการ (Retail)</h3>
                      <p className="text-slate-600 leading-relaxed flex-grow">{selectedUni.details.work.retail}</p>
                      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium">
                        <Info className="w-4 h-4 inline mr-2 text-slate-400" />
                        วีซ่านักศึกษาทำได้สูงสุด 20 ชม./สัปดาห์ (ช่วงเปิดเทอม)
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                        <Building className="w-7 h-7 text-indigo-600" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 mb-4 text-xl">งานในมหาวิทยาลัย (Campus Jobs)</h3>
                      <p className="text-slate-600 leading-relaxed flex-grow">{selectedUni.details.work.uni}</p>
                      <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-sm text-indigo-800 font-medium">
                        <Info className="w-4 h-4 inline mr-2 text-indigo-400" />
                        มักจะให้ค่าตอบแทน (เรทชั่วโมง) ดีกว่างานข้างนอก และยืดหยุ่นเวลาเรียน
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: CAREER */}
                {activeTab === 'career' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Briefcase className="w-32 h-32" />
                      </div>
                      <h3 className="font-extrabold mb-3 flex items-center gap-3 text-2xl relative z-10">
                        <Briefcase className="w-7 h-7 text-indigo-300" /> โอกาสต่อยอดหลังเรียนจบ
                      </h3>
                      <p className="text-indigo-100 text-sm md:text-base mb-8 relative z-10 max-w-3xl leading-relaxed">
                        คุณจะได้รับสิทธิ์ <strong>Graduate Route Visa</strong> ทำให้อยู่หางานต่อใน UK ได้ 2 ปีเต็มหลังเรียนจบ นี่คือเส้นทางอาชีพยอดฮิตของศิษย์เก่าจากที่นี่:
                      </p>

                      <div className="space-y-6 relative z-10">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                          <h4 className="font-extrabold text-white flex items-center gap-3 mb-3 text-lg">
                            <span className="text-2xl">🇬🇧</span> การทำงานในสหราชอาณาจักร (UK)
                          </h4>
                          <p className="text-indigo-50 leading-relaxed">{selectedUni.details.career.uk}</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                          <h4 className="font-extrabold text-white flex items-center gap-3 mb-3 text-lg">
                            <span className="text-2xl">🇹🇭</span> การกลับมาต่อยอดในไทย (Thailand)
                          </h4>
                          <p className="text-indigo-50 leading-relaxed">{selectedUni.details.career.thailand}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-6 border-t border-slate-200 bg-white shrink-0 flex justify-end rounded-b-2xl">
                 <button
                    onClick={() => setSelectedUni(null)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors focus:ring-4 focus:ring-slate-200 w-full md:w-auto shadow-sm"
                  >
                    ปิดหน้าต่าง
                  </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
