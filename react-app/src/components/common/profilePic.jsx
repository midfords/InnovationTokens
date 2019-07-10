import React from "react";
import { Image } from "semantic-ui-react";

const getImgSource = id => {
  return `/avatars/avatar-${id}.svg`;
};

const ProfilePic = ({ id, ...rest }) => {
  return <Image src={getImgSource(id)} {...rest} />;
};

export default ProfilePic;
