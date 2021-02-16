import { css } from "@emotion/react";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { flexRowCss } from "styles/display";

type ReviewInput = {
  isLoading: boolean;
  isLoggedIn: boolean;
  submitHandler: (review: string) => Promise<any>;
  initialValue?: string;
};

const ReviewInput = ({
  isLoading,
  isLoggedIn,
  submitHandler,
  initialValue,
}: ReviewInput) => {
  const [review, setReview] = useState(initialValue || "");

  const handleReviewChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setReview(value);
  };
  const handleSubmitReview = async () => {
    if (review.length <= 0) {
      return message.error("값을 입력해주세요.");
    }
    submitHandler(review);
  };
  return (
    <div css={wrapperCss}>
      <Input.TextArea
        css={inputCss}
        placeholder={
          isLoggedIn
            ? "댓글을 입력해주세요.(70자)"
            : "로그인 후 댓글입력이 가능합니다."
        }
        value={review}
        onChange={handleReviewChange}
        autoSize={{ minRows: 1, maxRows: 4 }}
        maxLength={70}
        disabled={!isLoggedIn}
      />
      <Button
        disabled={!isLoggedIn}
        type="primary"
        onClick={handleSubmitReview}
        loading={isLoading}
      >
        등록
      </Button>
    </div>
  );
};

export default ReviewInput;

const wrapperCss = css`
  ${flexRowCss};
  justify-content: space-between;
`;

const inputCss = css`
  width: 90%;
`;
