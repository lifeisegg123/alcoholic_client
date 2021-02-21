import { useState } from "react";
import { Avatar, Button, Comment } from "antd";
import { Review } from "types";
import ReviewInput from "./ReviewInput";
import Link from "next/link";

type ReviewItemProps = {
  userId?: string;
  review: Review;
  editHandler: (reviewId: string) => (review: string) => Promise<any>;
  editLoading: boolean;
  deleteHandler: (reviewId: string) => () => Promise<any>;
};

const ReviewItem = ({
  userId,
  review,
  editHandler,
  editLoading,
  deleteHandler,
}: ReviewItemProps) => {
  const { user: reviewWriter } = review;
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditting = () => {
    setIsEditing(!isEditing);
  };
  const editSubmit = async (value: string) => {
    await editHandler(review.id as string)(value);
    setIsEditing(false);
  };
  return (
    <Comment
      author={reviewWriter!.nickname}
      avatar={
        <Link href={`/userProfile/${reviewWriter!.id}`}>
          <Avatar size="small">{reviewWriter!.nickname[0]}</Avatar>
        </Link>
      }
      content={
        isEditing ? (
          <ReviewInput
            isLoading={editLoading}
            isLoggedIn={userId ? true : false}
            initialValue={review.desc}
            submitHandler={editSubmit}
          />
        ) : (
          review.desc
        )
      }
      actions={[
        reviewWriter!.id === userId && (
          <Button onClick={toggleEditting}>
            {isEditing ? "취소" : "수정하기"}
          </Button>
        ),
        reviewWriter!.id === userId && (
          <Button danger onClick={deleteHandler(review.id!)}>
            삭제하기
          </Button>
        ),
      ]}
    />
  );
};

export default ReviewItem;
