import { FollowDAO } from "./dao/FollowDAO";
import { DataPage } from "./entity/DataPage";
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
  console.log("updateDefaultFollow()");
}

async function deleteDefaultFollow() {
  await followDao.deleteFollow({
    followee_handle: defaultFolloweeHandle,
    follower_handle: defaultFollowerHandle
  });
  console.log("deleteDefaultFollow()");
}

function delay(ms: number) {
  // https://stackoverflow.com/a/37764963/2844859
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async function demonstrateWriteCapabilities() {
  console.log("\nWriting items with same follower:");
  await putItemsWithSameFollower();

  const secDelay = 7;
  console.error(`Delaying for ${secDelay} seconds`);
  await delay(secDelay*1000);

  console.log("\nWriting items with same followee:");
  await putItemsWithSameFollowee();
}

async function demonstrateCrudOperations() {
  console.log("\nDemonstrating CRUD operations:");
  await getFollow(); // Status Update!
  await createDefaultFollow();
  await getFollow(); // Status Update!
  await updateFollow();
  await getFollow(); // Status Update!
  await deleteDefaultFollow();
  await getFollow(); // Status Update!
}

async function performPagedQueryDemonstration(itemName: string, getPage: (lastFollow?: Follow) => Promise<DataPage<Follow>>) {
  console.log(`\nDemonstrating paged query operations (${itemName})`);

  let page: DataPage<Follow> | undefined;
  let lastItem: Follow | undefined;
  let countReceived: number;
  let totalReceived = 0;
  do {
    lastItem = page?.values[page.values.length-1];
    page = await getPage(lastItem);

    countReceived = page.values.length;
    totalReceived += countReceived;

    console.log(`Received page of ${itemName} with ${countReceived} items`);
    page.values.forEach(follow => console.log(`  ${JSON.stringify(follow)}`));
  } while (page.hasMorePages && countReceived);

  console.log(`Received ${totalReceived} total ${itemName}`);
}

async function demonstratePagedQueryOperations() {
  const PAGE_SIZE = 5;
  await performPagedQueryDemonstration(
    "FOLLOWEES",
    lastItem => followDao.getPageOfFollowees(defaultFollowerHandle, PAGE_SIZE, lastItem?.followee_handle));
  await performPagedQueryDemonstration(
    "FOLLOWERS",
    lastItem => followDao.getPageOfFollowers(defaultFolloweeHandle, PAGE_SIZE, lastItem?.follower_handle));
}

async function main() {
  // await demonstrateWriteCapabilities();
  // await demonstrateCrudOperations();
  await demonstratePagedQueryOperations();
}

main();
