import React, { useState } from "react";
import { Star } from "lucide-react";

const ALL_REVIEWS = [
  {
    name: "Khanh Lưu Phát Anh",
    role: "Khách hàng",
    branch: "Quận 7, TP.HCM",
    text: "Màu ảnh siêu xinh, ảnh rõ nét, thik nhất là phòng máy bay nha, mình khá bất ngờ vì phòng overhead ảnh form nhỏ có 70k à... sẽ ghé lại nhiều ahh",
    rating: 5,
    avatar: "https://picsum.photos/seed/review1/100/100",
  },
  {
    name: "Khánh Đắc",
    role: "Khách hàng",
    branch: "Quận 7, TP.HCM",
    text: "Tiệm xịn nha, Tết có chương trình ưu đãi khi mang áo dài tới quán, quán rất dễ thương, nhân viên nhiệt tình. Sẽ đến vào lần sau 💯",
    rating: 5,
    avatar: "https://picsum.photos/seed/review2/100/100",
  },
  {
    name: "Nguyễn Xuân Quỳnh",
    role: "Sinh viên",
    branch: "Quận 7, TP.HCM",
    text: "Trải nghiệm siêu tuyệt vời, nhân viên hỗ trợ nhiệt tình và thân thiện. 10 điểm không có nhưng!",
    rating: 5,
    avatar: "https://picsum.photos/seed/review3/100/100",
  },
  {
    name: "Văn Thành",
    role: "Khách hàng",
    branch: "Quận 10, TP.HCM",
    text: "Very good 100đ nha. Nhân viên nhiệt tình, phòng chụp sạch sẽ.",
    rating: 5,
    avatar: "https://picsum.photos/seed/review4/100/100",
  },
  {
    name: "Mira Harrison",
    role: "Traveller",
    branch: "Quận 10, TP.HCM",
    text: "Great picture, the staff are so nice! Highly recommend for anyone visiting HCMC.",
    rating: 5,
    avatar: "https://picsum.photos/seed/review5/100/100",
  },
  {
    name: "Thúc Anh",
    role: "Khách hàng",
    branch: "Quận 10, TP.HCM",
    text: "Shop dễ thương, nhiều phụ kiện xinh xắn để chụp hình. Rất ưng ý!",
    rating: 5,
    avatar: "https://picsum.photos/seed/review6/100/100",
  },
  {
    name: "Minhhoi Nguyen",
    role: "Khách hàng",
    branch: "Cầu Giấy, Hà Nội",
    text: "Cute vãi luôn, chụp hình siêu đẹp, nhân viên thân thiện. Sẽ quay lại dài dài.",
    rating: 5,
    avatar: "https://picsum.photos/seed/review7/100/100",
  },
  {
    name: "Ky Chu",
    role: "Khách hàng",
    branch: "Cầu Giấy, Hà Nội",
    text: "Very good service and photo quality. Love the vibe here!",
    rating: 5,
    avatar: "https://picsum.photos/seed/review8/100/100",
  },
  {
    name: "Linh Khánh",
    role: "Học sinh",
    branch: "Cầu Giấy, Hà Nội",
    text: "I love Photo Palette 🥰🥰 Không gian decor xinh xỉu, chụp góc nào cũng đẹp.",
    rating: 5,
    avatar: "https://picsum.photos/seed/review9/100/100",
  },
  {
    name: "Kim Hương",
    role: "Khách hàng",
    branch: "Tân Phú, TP.HCM",
    text: "Nhân viên siêu tận tình, 10/10 <3 Có 4 phòng chụp khác nhau, nhiều phụ kiện, gương và dụng cụ. Rất đáng trải nghiệm! 💖",
    rating: 5,
    avatar: "https://picsum.photos/seed/review10/100/100",
  },
  {
    name: "Yeon-i",
    role: "Khách hàng",
    branch: "Tân Phú, TP.HCM",
    text: "Chi nhánh sạch sẽ, rộng rãi, nhiều phụ kiện, nhân viên dễ thương và màu ảnh cực xinh luôn các nàng ơi!",
    rating: 5,
    avatar: "https://picsum.photos/seed/review11/100/100",
  },
  {
    name: "Ý Huỳnh",
    role: "Khách hàng",
    branch: "Tân Phú, TP.HCM",
    text: "Palette nổi tiếng màu ảnh đẹp rồi không cần bàn cãi, mặt mộc chụp lên vẫn xinh. Tiệm đã tiếp thu feedback rất tốt hehe 🫦",
    rating: 5,
    avatar: "https://picsum.photos/seed/review12/100/100",
  },
];

const Testimonials: React.FC = () => {
  const [displayedReviews] = useState<typeof ALL_REVIEWS>(() => {
    // Randomly select 3 unique reviews
    const shuffled = [...ALL_REVIEWS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  return (
    <section id="testimonials" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
            Khách Hàng Nói Gì?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6 flex-grow">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-brand-100/50">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {review.name}
                  </h4>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      {review.role}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider mt-0.5">
                      {review.branch}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
