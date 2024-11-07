import { FollowDAO } from "./dao/FollowDAO";
import { Follow } from "./entity/Follow";

const followDao = new FollowDAO();

const defaultFollowerHandle = "@FredFlintstone";
const defaultFollowerName = "Fred Flintstone";
const defaultFolloweeHandle = "@ClintEastwood";
const defaultFolloweeName = "Clint Eastwood";

async function putItemsWithSameFollower() {
  for (let i = 1; i <= 25; ++i) {
    const follow: Follow = {
      follower_handle: defaultFollowerHandle,
      follower_name: defaultFollowerName,
      followee_handle: defaultFolloweeHandle + "-" + i,
      followee_name: defaultFolloweeName + " " + 1,
    };
    await followDao.putFollow(follow);
  }
  console.log("Put 25 of same follower");
}

async function putItemsWithSameFollowee() {
  for (let i = 1; i <= 25; ++i) {
    const follow: Follow = {
      follower_handle: defaultFollowerHandle + "-" + i,
      follower_name: defaultFollowerName + " " + i,
      followee_handle: defaultFolloweeHandle,
      followee_name: defaultFolloweeName,
    };
    await followDao.putFollow(follow);
  }
  console.log("Put 25 of same followee");
}

async function getFollow() {
  const follow = await followDao.getSomeFollow({
    followee_handle: defaultFolloweeHandle,
    follower_handle: defaultFollowerHandle,
  }, true);
  console.log("getFollow() => ", follow);
}

async function createDefaultFollow() {
  const defaultFollow: Follow = {
    follower_handle: defaultFollowerHandle,
    follower_name: defaultFollowerName,
    followee_handle: defaultFolloweeHandle,
    followee_name: defaultFolloweeName,
  };
  await followDao.putFollow(defaultFollow);
  console.log("createDefaultFollow()");
}

async function updateFollow() {
  const updateFollow: Follow = {
    follower_handle: defaultFollowerHandle,
    follower_name: "NEW: " + defaultFollowerName,
    followee_handle: defaultFolloweeHandle,
    followee_name: "NEW: " + defaultFolloweeName,
  };
  await followDao.updateFollow(updateFollow);
}

async function deleteFollow() {
  await followDao.deleteFollow({
    followee_handle: defaultFolloweeHandle,
    follower_handle: defaultFollowerHandle
  });
}

async function main() {
  await putItemsWithSameFollower();

  await putItemsWithSameFollowee();

  await getFollow();

  await createDefaultFollow();
  await updateFollow();

  await deleteFollow();
}

main();
