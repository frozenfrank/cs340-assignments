import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandOutput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Follow } from "../entity/Follow";

type FollowHandles = Pick<Follow, "followee_handle" | "follower_handle">;

export class FollowDAO {
  private readonly tableName = "tweeter-follows";
  private readonly followerHandleAttr = "follower_handle";
  private readonly followeeHandleAttr = "followee_handle";
  private readonly followerNameAttr = "follower_name";
  private readonly followeeNameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient({region: 'us-west-2'}));

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
    // console.log("putFollow()", response);
    return response;
  }

  /** Get a particular follow relationship, or `null` if it doesn't exist. */
  async getSomeFollow(followHandles: FollowHandles, consistentRead = false): Promise<Follow|null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(followHandles),
      ConsistentRead: consistentRead,
    });

    const response = await this.client.send(command);
    console.log("getSomeFollow()", response);
    if (response.Item) {
      return response.Item as Follow;
    }
    return null;
  }

  /** Updates the names of the follower and followee, if it exists, given their handles are provided. */
  async updateFollow(withUpdatedFollowNames: Follow): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(withUpdatedFollowNames),
      UpdateExpression: `set ${this.followeeNameAttr} = :fee, ${this.followerNameAttr} = :fer`,
      ExpressionAttributeValues: {
        ":fee": withUpdatedFollowNames.followee_name,
        ":fer": withUpdatedFollowNames.follower_name,
      },
      ReturnValues: "NONE",
    });

    const response = await this.client.send(command);
    console.log("updateFollow()", response);
  }

  /** Deletes the indicated "follow" relationship, if it exists. */
  async deleteFollow(followHandles: FollowHandles): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: this.generateFollowKey(followHandles),
      ReturnValues: "NONE",
    });

    const response = await this.client.send(command);
    console.log("deleteFollow()", response);
  }

  private generateFollowKey(followHandles: FollowHandles): Record<string, any> {
    return {
      [this.followerHandleAttr]: followHandles.follower_handle,
      [this.followeeHandleAttr]: followHandles.followee_handle,
    };
  }

}
