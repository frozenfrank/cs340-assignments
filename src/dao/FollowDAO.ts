import {
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Follow } from "../entity/Follow";

export class FollowDAO {
  readonly tableName = "tweeter-follows";
  readonly followerHandleAttr = "follower_handle";
  readonly followeeHandleAttr = "followee_handle";
  readonly followerNameAttr = "follower_name";
  readonly followeeNameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  /**
   * Records a new
   * @param followee The person being followed
   * @param follower The person following another
   */
  async putFollow(follow: Follow): Promise<void> {
  }

  /** Get any follow relationship for a particular follower handle, or `null` if none exist. */
  async getSomeFollow(follower_handle: string): Promise<Follow|null> {
    return null;
  }

  /** Updates the names of the follower and followee, if it exists, given their handles are provided. */
  async updateFollow(withUpdatedFollowNames: Follow): Promise<void> {

  }

  /** Deletes the indicated "follow" relationship, if it exists. */
  async deleteFollow(followHandles: Pick<Follow, "followee_handle"|"follower_handle">): Promise<void> {

  }

}
