# وكالة تشويش - TASH Agency

<div align="center">

![TASH Agency](https://img.shields.io/badge/TASH-Agency-1a3a5c?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

🌐 **[momentoman.com](https://momentoman.com)**

</div>

---

## 📌 نبذة عن المشروع

**وكالة تشويش (TASH)** هي وكالة تسويق رقمي متخصصة في مساعدة المتاجر الإلكترونية في سلطنة عُمان على تحقيق مبيعات بالملايين شهرياً.

---

## ✨ المميزات

- 🎨 تصميم عصري وجذاب
- 📱 متجاوب مع جميع الأجهزة (Responsive Design)
- 🌐 دعم كامل للغة العربية (RTL)
- ⚡ أداء سريع ومحسّن
- 🎭 رسوم متحركة سلسة باستخدام AOS
- 📞 نموذج تواصل متكامل
- 🔒 شهادة SSL مجانية (HTTPS)
- 🐳 يعمل على Docker

---

## 🛠️ التقنيات المستخدمة

| التقنية | الوصف |
|---------|-------|
| **HTML5** | هيكلة الصفحة |
| **CSS3** | التنسيق والتصميم |
| **JavaScript** | التفاعلية والديناميكية |
| **Font Awesome** | الأيقونات |
| **Google Fonts (Tajawal)** | الخط العربي |
| **AOS Library** | الرسوم المتحركة |
| **Docker** | حاويات التشغيل |
| **Nginx** | خادم الويب |
| **Let's Encrypt** | شهادة SSL |

---

## 📂 هيكل المشروع

```
said/
├── index.html          # الصفحة الرئيسية
├── styles.css          # ملف التنسيقات
├── script.js           # ملف JavaScript
├── Dockerfile          # إعدادات Docker
├── docker-compose.yml  # إعدادات Docker Compose
├── nginx.conf          # إعدادات خادم Nginx
├── .dockerignore       # ملفات يتجاهلها Docker
└── README.md           # ملف التوثيق
```

---

## 🚀 التشغيل المحلي

### الطريقة 1: فتح الملف مباشرة
```bash
# افتح ملف index.html في المتصفح
```

### الطريقة 2: باستخدام Docker
```bash
git clone https://github.com/saraa47258-cmd/said.git
cd said
docker-compose up -d --build
```
ثم افتح: http://localhost

---

## 🖥️ النشر على VPS (السيرفر)

### 1️⃣ أول مرة - تثبيت المشروع

```bash
# الاتصال بالسيرفر
ssh root@YOUR_SERVER_IP

# إنشاء مجلد المشروع
mkdir -p /srv/said
cd /srv/said

# تحميل المشروع من GitHub
git clone https://github.com/saraa47258-cmd/said.git .

# بناء وتشغيل الموقع
docker-compose up -d --build
```

### 2️⃣ تحديث الموقع (بعد أي تعديل)

```bash
cd /srv/said              # الدخول لمجلد المشروع
git pull                  # تحميل آخر التحديثات من GitHub
docker-compose down       # إيقاف الموقع الحالي
docker-compose up -d --build   # إعادة بناء وتشغيل الموقع
```

---

## 📋 شرح الأوامر

### أوامر Git

| الأمر | الشرح |
|-------|-------|
| `git clone <url>` | تحميل المشروع لأول مرة |
| `git pull` | تحميل آخر التحديثات من GitHub |
| `git add .` | إضافة جميع الملفات المعدلة |
| `git commit -m "message"` | حفظ التعديلات مع رسالة |
| `git push` | رفع التعديلات إلى GitHub |

### أوامر Docker

| الأمر | الشرح |
|-------|-------|
| `docker-compose up -d` | تشغيل الموقع في الخلفية |
| `docker-compose up -d --build` | بناء وتشغيل الموقع (بعد التحديث) |
| `docker-compose down` | إيقاف الموقع |
| `docker-compose restart` | إعادة تشغيل الموقع |
| `docker-compose logs -f` | عرض سجلات الموقع |
| `docker ps` | عرض الحاويات العاملة |

### أوامر SSL (شهادة HTTPS)

```bash
# إيقاف Docker مؤقتاً
docker-compose down

# الحصول على شهادة SSL
certbot certonly --standalone -d momentoman.com -d www.momentoman.com

# إعادة تشغيل الموقع
docker-compose up -d
```

---

## 🔄 خطوات التحديث الكاملة

### على جهازك المحلي (بعد التعديل):
```bash
git add .                           # إضافة الملفات
git commit -m "وصف التعديل"         # حفظ التعديلات
git push                            # رفع إلى GitHub
```

### على السيرفر VPS:
```bash
cd /srv/said                        # الدخول للمجلد
git pull                            # تحميل التحديثات
docker-compose down                 # إيقاف الموقع
docker-compose up -d --build        # إعادة البناء والتشغيل
```

---

## 🔧 حل المشاكل الشائعة

### المنفذ 80 محجوز
```bash
# معرفة ما يستخدم المنفذ
sudo lsof -i :80

# إيقاف nginx إذا كان يعمل
sudo systemctl stop nginx
```

### الموقع لا يعمل
```bash
# التحقق من حالة Docker
docker ps

# عرض السجلات للبحث عن الأخطاء
docker-compose logs -f
```

### تجديد شهادة SSL
```bash
docker-compose down
certbot renew
docker-compose up -d
```

---

## 🌐 إعدادات DNS

لربط الدومين بالسيرفر، أضف هذه السجلات في لوحة تحكم الدومين:

| النوع | الاسم | القيمة |
|-------|-------|--------|
| A | @ | `IP_السيرفر` |
| CNAME | www | `momentoman.com` |

---

## 📧 التواصل

للتواصل مع وكالة تشويش، يمكنك زيارة الموقع والتواصل معنا عبر نموذج الاتصال.

🌐 **الموقع:** [momentoman.com](https://momentoman.com)

---

<div align="center">

**صنع بـ ❤️ في سلطنة عُمان**

© 2026 وكالة تشويش - TASH Agency

</div>
