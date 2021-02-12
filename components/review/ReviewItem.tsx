import { Avatar, Comment } from "antd";
import { Review, User } from "types";

type ReviewItemProps = {
  review: Review;
  user?: User;
};

const ReviewItem = ({ review, user }: ReviewItemProps) => {
  return (
    <Comment
      author={user?.nickname}
      avatar={<Avatar size="small" src={user?.profileImg} />}
      content={review.desc}
    />
  );
};

export default ReviewItem;
