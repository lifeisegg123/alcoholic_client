import styled from "@emotion/styled";
import { Card, List } from "antd";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { Review } from "types";
import ReviewInput from "./ReviewInput";
import ReviewItem from "./ReviewItem";

type ReviewContainerProps = {
  reviews: Review[];
};

const ReviewContainer = ({ reviews }: ReviewContainerProps) => {
  return (
    <Wrapper>
      <Card>
        <List
          header={`${reviews.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(item) => (
            <li>
              <ReviewItem review={item} />
            </li>
          )}
        />
        <ReviewInput />
      </Card>
    </Wrapper>
  );
};

export default ReviewContainer;

const Wrapper = styled.div`
  ${horizontalMarginAuto}
  ${desktopCss({
    width: "70%",
  })}
`;
