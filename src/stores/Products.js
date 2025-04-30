import { defineStore } from 'pinia'

export const useProductsStore = defineStore('Products', {
    state(){
        return{
        Products: [
            {
                id: 1,
                title:{
                  "fa-IR":"سمفونی مردگان",
                  "en-US":"English Title1"
                } ,
                author: "عباس معروفی",
                price: 180000,
                description: "روایتی تلخ از سرنوشت یک خانواده در شهر اردبیل.",
                discount: 0,
                stock: 12,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'
              },
              {
                id: 2,
                title:{
                  "fa-IR":"چراغ‌ها را من خاموش می‌کنم",
                  "en-US":"English Title2"
                },
                author: "زویا پیرزاد",
                price: 150000,
                description: "نگاهی لطیف به زندگی یک زن خانه‌دار در دهه چهل.",
                discount: 15,
                stock: 8,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'
              },
              {
                id: 3,
                title:{
                  "fa-IR":"بوف کور",
                  "en-US":"English Title3"
                },
                author: "صادق هدایت",
                price: 130000,
                description: "رمانی سوررئال با فضایی تاریک و فلسفی.",
                discount: 10,
                stock: 20,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'
              },
              {
                id: 4,
                title:{
                  "fa-IR":"جهل نامه کوتاه به همسرم",
                  "en-US":"English Title4"
                },                
                author: "نادر ابراهیمی",
                price: 110000,
                description: "نامه‌هایی عاشقانه و عمیق از نادر به همسرش.",
                discount: 25,
                stock: 16,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 5,
                title:{
                  "fa-IR":"من و او",
                  "en-US":"English Title5"
                },                
                author: "رضا امیرخانی",
                price: 190000,
                description: "داستانی عاشقانه و معنوی با روایتی خاص.",
                discount: 30,
                stock: 10,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 6,
                title:{
                  "fa-IR":"کلیدر",
                  "en-US":"English Title6"
                },                
                author: "محمود دولت‌آبادی",
                price: 350000,
                description: "روایتی گسترده از زندگی روستایی در خراسان.",
                discount: 20,
                stock: 5,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              
              {
                id: 7,
                title:{
                  "fa-IR":"زوال کلنل",
                  "en-US":"English Title7"
                },                
                author: "محمود دولت‌آبادی",
                price: 200000,
                description: "روایتی سیاسی و تاریک از ایران بعد از انقلاب.",
                discount: 10,
                stock: 7,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 8,
                title:{
                  "fa-IR":"یک عاشقانه آرام",
                  "en-US":"English Title8"
                },                
                author: "نادر ابراهیمی",
                price: 125000,
                description: "کتابی لطیف و تأمل‌برانگیز در مورد عشق و زندگی.",
                discount: 18,
                stock: 13,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 9,
                title:{
                  "fa-IR":"قهوه سرد آقای نویسنده",
                  "en-US":"English Title9"
                },               
                author: "روزبه معین",
                price: 140000,
                description: "روایتی معاصر از دل‌تنگی‌ها و دغدغه‌های نویسنده‌ای جوان.",
                discount: 12,
                stock: 18,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 10,
                title:{
                  "fa-IR":"بی کتابی",
                  "en-US":"English Title10"
                },
                               
                author: "محمدرضا شرفی خبوشان",
                price: 170000,
                description: "داستانی تاریخی از دوران مشروطه با چاشنی کتاب‌دوستی.",
                discount: 22,
                stock: 11,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 11,
                title:{
                  "fa-IR":"ماجراهای ایران",
                  "en-US":"English Title11"
                },               
                 author: "رضا امیرخانی",
                price: 210000,
                description: "بررسی سبک زندگی و دغدغه‌های اجتماعی نسل امروز.",
                discount: 15,
                stock: 9,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 12,
                title:{
                  "fa-IR":"بار دیگر دوستت دارم",
                  "en-US":"English Title12"
                },               
                 author: "نادر ابراهیمی",
                price: 135000,
                description: "روایتی عاشقانه با نثری شاعرانه و ماندگار.",
                discount: 28,
                stock: 14,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 13,
                title:{
                  "fa-IR":"انسان در جستجوی معنا",
                  "en-US":"English Title13"
                },  
                author: "ویکتور فرانکل",
                price: 165000,
                description: "ترجمه‌ای موفق از اثری روانشناسانه و انگیزشی.",
                discount: 20,
                stock: 6,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'


              },
              {
                id: 14,
                title:{
                  "fa-IR":"تکه هایی از یک کل منسجم",
                  "en-US":"English Title14"
                },                
                author: "پریسا جهانگیری",
                price: 145000,
                description: "سفر درونی به سمت خودشناسی و خودسازی.",
                discount: 15,
                stock: 10,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
              {
                id: 15,
                title:{
                  "fa-IR":"جزء از کل",
                  "en-US":"English Title15"
                },                
                author: "استیو تولتز (ترجمه: پیمان خاکسار)",
                price: 250000,
                description: "رمانی خاص و فلسفی در قالب داستانی جذاب و طنزآلود.",
                discount: 18,
                stock: 4,
                image:'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg'

              },
          ],
    }
    }
    
})