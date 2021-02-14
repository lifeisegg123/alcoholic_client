import { Avatar, Comment } from "antd";
import { Review } from "types";

type ReviewItemProps = {
  review: Review;
};

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { user } = review;
  return (
    <Comment
      author={user?.nickname}
      avatar={<Avatar size="small" src={user?.profileImg} />}
      content={review.desc}
    />
  );
};

export default ReviewItem;
