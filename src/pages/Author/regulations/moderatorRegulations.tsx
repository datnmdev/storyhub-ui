import React from "react";

const ModeratorRegulations: React.FC = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "#333" }}>Quy định đối với Kiểm duyệt viên</h1>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>1. Trách nhiệm chính</h2>
                <p>
                    - Đọc và kiểm tra nội dung truyện được gửi lên bởi tác giả để đảm bảo tuân thủ các quy định của
                    website.
                </p>
                <p>
                    - Đảm bảo nội dung không vi phạm pháp luật, thuần phong mỹ tục hoặc các quy định nội bộ của website.
                </p>
                <p>- Phản hồi nhanh chóng với các yêu cầu từ tác giả về việc sửa đổi hoặc bổ sung nội dung.</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>2. Quy trình kiểm duyệt</h2>
                <p>- Kiểm tra nội dung về mặt hình thức (chính tả, ngữ pháp, định dạng).</p>
                <p>
                    - Đánh giá nội dung theo các tiêu chí: tính nguyên bản, phù hợp với đối tượng độc giả và không chứa
                    nội dung bị cấm.
                </p>
                <p>- Đưa ra nhận xét chi tiết nếu từ chối phát hành, nêu rõ lý do và đề xuất chỉnh sửa (nếu có).</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>3. Các loại nội dung bị cấm</h2>
                <ul>
                    <li>Nội dung kích động bạo lực, thù hận hoặc phân biệt đối xử.</li>
                    <li>Hình ảnh hoặc văn bản khiêu dâm, đồi trụy không phù hợp với quy định về phân loại độ tuổi.</li>
                    <li>Thông tin sai lệch, xuyên tạc, hoặc bôi nhọ cá nhân/tổ chức.</li>
                    <li>Chủ đề nhạy cảm như chính trị, tôn giáo gây tranh cãi hoặc vi phạm pháp luật.</li>
                </ul>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>4. Tiêu chí đánh giá</h2>
                <p>- Tính nguyên bản: Nội dung phải đảm bảo không đạo nhái, không vi phạm bản quyền.</p>
                <p>- Phù hợp với đối tượng: Nội dung cần đáp ứng yêu cầu về độ tuổi và sở thích của người đọc.</p>
                <p>
                    - Chất lượng: Truyện phải có cốt truyện rõ ràng, không mắc lỗi nghiêm trọng về chính tả hoặc ngữ
                    pháp.
                </p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>5. Quyền lợi và trách nhiệm</h2>
                <p>- Kiểm duyệt viên có quyền yêu cầu tác giả chỉnh sửa nội dung nếu không đáp ứng tiêu chí.</p>
                <p>
                    - Phối hợp với đội ngũ quản lý để xử lý các trường hợp tranh chấp hoặc khiếu nại từ tác giả hoặc độc
                    giả.
                </p>
                <p>- Bảo mật thông tin liên quan đến tác giả và nội dung chưa phát hành.</p>
            </section>
        </div>
    );
};

export default ModeratorRegulations;
