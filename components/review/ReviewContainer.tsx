import styled from "@emotion/styled";
import { Card, List, message } from "antd";
import { horizontalMarginAuto } from "styles/display";
import { Review } from "types";
import ReviewInput from "./ReviewInput";
import ReviewItem from "./ReviewItem";
import { addReviewApi, deleteReviewApi, updateReviewApi } from "api/review";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "hooks/useUser";

type ReviewContainerProps = {
  reviews: Review[];
  alcoholId: string;
  alcoholName: string;
};

const ReviewContainer = ({
  reviews,
  alcoholId,
  alcoholName,
}: ReviewContainerProps) => {
  const queryClient = useQueryClient();
  const [user, isLoggedIn] = useUser();

  const addReviewMutation = useMutation(addReviewApi);
  const submitReview = async (review: string) => {
    try {
      await addReviewMutation.mutateAsync({ desc: review, alcoholId });
      queryClient.fetchQuery(["alcohol", "detail", alcoholName]);
      message.success("리뷰가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };

  const updateReviewMutation = useMutation(updateReviewApi);
  const updateReview = (id: string) => async (desc: string) => {
    try {
      await updateReviewMutation.mutateAsync({ id, desc });
      queryClient.fetchQuery(["alcohol", "detail", alcoholId]);
      message.success("리뷰가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };

  const deleteReviewMutation = useMutation(deleteReviewApi);
  const deleteReview = (id: string) => async () => {
    try {
      await deleteReviewMutation.mutateAsync({ id });
      queryClient.fetchQuery(["alcohol", "detail", alcoholId]);
      message.success("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };
  return (
    <Wrapper>
      <Card>
        <List
          header={`${reviews.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(item) => (
            <li>
              <ReviewItem
                userId={isLoggedIn && user.id}
                review={item}
                editHandler={updateReview}
                editLoading={updateReviewMutation.isLoading}
                deleteHandler={deleteReview}
              />
            </li>
          )}
        />
        <ReviewInput
          isLoggedIn={isLoggedIn}
          isLoading={addReviewMutation.isLoading}
          submitHandler={submitReview}
        />
      </Card>
    </Wrapper>
  );
};

export default ReviewContainer;

const Wrapper = styled.div`
  ${horizontalMarginAuto}
`;
