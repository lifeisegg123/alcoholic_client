import styled from "@emotion/styled";
import { Card, List } from "antd";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { Review } from "types";
import ReviewInput from "./ReviewInput";
import ReviewItem from "./ReviewItem";

type ReviewContainerProps = {
  reviews: Review[];
  alcoholId: string;
};

const ReviewContainer = ({ reviews, alcoholId }: ReviewContainerProps) => {
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
        <ReviewInput alcoholId={alcoholId} />
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
