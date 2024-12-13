import React from "react";

const AuthorRegulations: React.FC = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "#333" }}>Quy định đối với Tác giả</h1>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>1. Quyền sở hữu và bản quyền</h2>
                <p>
                    - Tác giả phải đảm bảo rằng truyện là sáng tác của chính mình hoặc đã được sự cho phép của tác giả
                    gốc.
                </p>
                <p>
                    - Nội dung không được vi phạm bản quyền, đạo nhái hoặc sử dụng nội dung của bên thứ ba mà không có
                    sự đồng ý.
                </p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>2. Nội dung truyện</h2>
                <p>
                    - Nội dung không vi phạm pháp luật, không chứa yếu tố kích động bạo lực, phân biệt đối xử, hoặc xúc
                    phạm danh dự cá nhân hay tổ chức.
                </p>
                <p>- Các yếu tố 18+ hoặc nhạy cảm cần được ghi rõ để người đọc biết trước.</p>
                <p>
                    - Không được đăng tải nội dung liên quan đến chính trị, tôn giáo gây tranh cãi hoặc các nội dung bị
                    cấm khác theo quy định pháp luật.
                </p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>3. Định dạng và chất lượng</h2>
                <p>- Tác giả cần tuân thủ các quy chuẩn về định dạng văn bản mà website yêu cầu.</p>
                <p>- Truyện cần đảm bảo chất lượng, không có lỗi chính tả hoặc lỗi ngữ pháp nghiêm trọng.</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>4. Kiểm duyệt truyện</h2>
                <p>- Mọi truyện trước khi phát hành sẽ được kiểm duyệt bởi đội ngũ kiểm duyệt viên của website.</p>
                <p>
                    - Thời gian kiểm duyệt có thể kéo dài từ 1-3 ngày làm việc tùy theo độ dài và nội dung của truyện.
                </p>
                <p>- Tác giả cần đảm bảo phản hồi kịp thời nếu có yêu cầu chỉnh sửa từ phía kiểm duyệt viên.</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>5. Nội dung không phù hợp</h2>
                <p>- Các nội dung bị cấm bao gồm nhưng không giới hạn:</p>
                <ul>
                    <li>Hình ảnh hoặc ngôn từ kích động bạo lực, thù hận.</li>
                    <li>Nội dung chứa yếu tố phân biệt chủng tộc, giới tính, hoặc bất kỳ hình thức kỳ thị nào.</li>
                    <li>Truyện có nội dung khiêu dâm, đồi trụy không tuân theo các quy định về phân loại độ tuổi.</li>
                    <li>Thông tin sai sự thật, lừa đảo hoặc bôi nhọ cá nhân, tổ chức.</li>
                </ul>
                <p>
                    - Các truyện vi phạm sẽ bị từ chối phát hành, và nếu cần thiết, tài khoản tác giả có thể bị đình
                    chỉ.
                </p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>6. Chính sách chia sẻ doanh thu (nếu có)</h2>
                <p>
                    - Nếu truyện đạt lượng người đọc nhất định, tác giả có thể nhận được chia sẻ doanh thu từ website.
                </p>
                <p>- Tỷ lệ doanh thu sẽ được thông báo cụ thể trong thỏa thuận hợp tác.</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>7. Trách nhiệm của tác giả</h2>
                <p>- Tác giả chịu trách nhiệm hoàn toàn về nội dung truyện do mình phát hành.</p>
                <p>- Phối hợp với website để xử lý khiếu nại nếu có vấn đề phát sinh.</p>
            </section>

            <section>
                <h2 style={{ color: "#555", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>8. Quyền của website</h2>
                <p>- Website có quyền chỉnh sửa hoặc từ chối phát hành nếu truyện không đáp ứng các tiêu chí.</p>
                <p>- Trong trường hợp vi phạm, website có quyền gỡ bỏ nội dung mà không cần thông báo trước.</p>
            </section>
        </div>
    );
};

export default AuthorRegulations;
