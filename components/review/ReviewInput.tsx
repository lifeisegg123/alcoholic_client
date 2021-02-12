import { css } from "@emotion/react";
import { Button, Input } from "antd";
import { useState } from "react";
import { flexRowCss } from "styles/display";

type ReviewInput = {};

const ReviewInput = ({}: ReviewInput) => {
  const [review, setReview] = useState("");
  const handleReviewChange = (event: any) => {
    const { target: value } = event;
    setReview(value);
    console.log(value);
  };
  const handleSubmitReview = () => {};
  return (
    <div css={wrapperCss}>
      <Input.TextArea
        css={inputCss}
        placeholder="댓글을 입력해주세요.(70자)"
        onChange={handleReviewChange}
        autoSize={{ minRows: 1, maxRows: 4 }}
        maxLength={70}
      />
      <Button type="primary" onClick={handleSubmitReview}>
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
