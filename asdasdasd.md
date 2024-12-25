
=============Article================
GET /api/v1/articles  Barcha maqolalarni chaqirish mumkin.
GET /api/v1/articles/id Faqat bitta maqolani olish mumkin.
POST /api/v1/articles-add Maqola yaratish.
Delete /api/v1/delete/articles/id Maqolani o'chirish.

Maqola Markdown formatda yuklanishi kerak bazaga markdown formatda saqlanishi kerak
Maqola yaratish uchun Article = Model{
    id,
    name,
    image,
    article:Markdown format,
    time,
}

===================Texnologiya=====================
GET /api/v1/techno-get barcha ma'lumotlarni olish
POST /api/v1/techno-post Ma'lumotlarni qo'shish
PUT  /api/v1/techno-put  Ma'lumotlarni yangilash update

Texnologiya = Model {
  id,
  name,
  logo: .svg format qabul qilishi kerak faqat
}

====================Conact=================

GET /api/v1/get/conact/
GET /api/v1/get/conact/all
POST /api/v1/send/contact/

Conact = Model{
    name,
    email: not unique!,
    messege,
}

