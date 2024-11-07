import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Follow } from "../entity/Follow";

export class FollowDAO {
  private readonly tableName = "tweeter-follows";
  private readonly followerHandleAttr = "follower_handle";
  private readonly followeeHandleAttr = "followee_handle";
  private readonly followerNameAttr = "follower_name";
  private readonly followeeNameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  /**
   * Records a new
   * @param followee The person being followed
   * @param follower The person following another
   */
  async putFollow(follow: Follow): Promise<PutCommandOutput> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        ...follow
      }
    });

    const response = await this.client.send(command);
    console.log(response);
    return response;
  }

  /** Get any follow relationship for a particular follower handle, or `null` if none exist. */
  async getSomeFollow(follower_handle: string): Promise<Follow|null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: follower_handle
      }
    });

    const response = await this.client.send(command);
    console.log(response);
    if (response.Item) {
      return response.Item as Follow;
    }
    return null;
  }

  /** Updates the names of the follower and followee, if it exists, given their handles are provided. */
  async updateFollow(withUpdatedFollowNames: Follow): Promise<void> {

  }

  /** Deletes the indicated "follow" relationship, if it exists. */
  async deleteFollow(followHandles: Pick<Follow, "followee_handle"|"follower_handle">): Promise<void> {

  }

}
